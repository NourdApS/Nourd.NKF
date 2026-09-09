import { execFileSync, spawnSync } from "node:child_process";
import { chmod, cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  parseStrictJson,
  sha256,
  verifyReleaseArchive,
} from "./release/core.mjs";
import { evaluateReleaseSourceProvenance } from "./release/source-provenance.mjs";

function fail(message) {
  throw new Error(message);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    ...options,
  });
  if (result.status !== 0) {
    fail(`${command} ${args.join(" ")} failed:\n${result.stderr || result.stdout}`);
  }
  return result;
}

const values = process.argv.slice(2);
if (
  values.length < 4 ||
  values[2] !== "--source-root" ||
  (values.length !== 4 && (values.length !== 6 || values[4] !== "--review"))
) {
  fail(
    "Usage: node scripts/exercise-release-candidate.mjs <archive> <sha256> --source-root <repository> [--review <semantic-review>]",
  );
}
const archivePath = path.resolve(values[0]);
const expectedSha256 = values[1];
const sourceRoot = path.resolve(values[3]);
const reviewPath = values[5] === undefined ? undefined : path.resolve(values[5]);
const archiveBytes = await readFile(archivePath);
const verification = verifyReleaseArchive(archiveBytes, expectedSha256, {
  sourceRoot,
});
const nkfVersion = verification.manifest.nkf_version;
if (!["0.4", "0.5", "0.6", "0.7", "0.71", "0.8", "0.81"].includes(nkfVersion)) {
  fail("The exact-candidate exercise requires an NKF 0.4, 0.5, 0.6, 0.7, 0.71, 0.8, or 0.81 archive.");
}
if (["0.5", "0.6", "0.7", "0.71", "0.8", "0.81"].includes(nkfVersion) && reviewPath === undefined) {
  fail(`The NKF ${nkfVersion} exact-candidate exercise requires --review with one external semantic-review path.`);
}
if (nkfVersion === "0.4" && reviewPath !== undefined) {
  fail("The NKF 0.4 exact-candidate exercise does not accept --review.");
}
const source = await evaluateReleaseSourceProvenance(sourceRoot, verification);

const temporary = await mkdtemp(path.join(os.tmpdir(), `nkf-${nkfVersion}-candidate-exercise-`));
try {
  const project = path.join(temporary, "project");
  run("git", ["clone", "--no-hardlinks", "--local", sourceRoot, project]);
  run("git", ["checkout", "--detach", verification.release_commit], { cwd: project });
  if (
    execFileSync("git", ["status", "--porcelain"], {
      cwd: project,
      encoding: "utf8",
    }) !== ""
  ) {
    fail("The fresh candidate clone is not clean.");
  }
  run("npm", ["ci", "--ignore-scripts"], { cwd: project });
  // The NKF 0.8 accepted integration adds the three deterministic guidance
  // verifiers to the producer host chain. The chain is declared by the project
  // and recorded by the adopter, never invented by it, so adopting 0.8 means
  // the producer declares the 0.8 chain first. The isolated copy applies that
  // exact declaration here, which is the same edit the separate producer
  // adoption Task performs on the live producer. package.json is producer
  // configuration, not a release-set member: no candidate byte changes.
  if (["0.8", "0.81"].includes(nkfVersion)) {
    const manifestPath = path.join(project, "package.json");
    const manifestText = await readFile(manifestPath, "utf8");
    const producerManifest = JSON.parse(manifestText);
    const chain = "npm run verify:agent-guidance && npm run verify:onboarding-guidance && npm run verify:guidance-generation && npm run verify:version-labels && npm run verify:guidance-review && npm run verify:links && npm run check && npm run validate:self";
    producerManifest.nkf.integration.host_script = chain;
    producerManifest.scripts["nkf:check:host"] = chain;
    producerManifest.scripts["verify:guidance-generation"] = nkfVersion === "0.8"
      ? "node scripts/generate-guidance.mjs --project . --version 0.8 --check"
      : "node scripts/generate-guidance.mjs --project . --check";
    producerManifest.scripts["verify:version-labels"] = "node scripts/verify-version-labels.mjs --project .";
    producerManifest.scripts["verify:guidance-review"] = "node scripts/verify-guidance-review.mjs --project .";
    await writeFile(manifestPath, `${JSON.stringify(producerManifest, null, 2)}\n`);
  }
  run("npm", ["run", "build"], { cwd: project });
  const preAdoptChecker = await readFile(
    path.join(project, verification.manifest.checker.path),
  );
  if (sha256(preAdoptChecker) !== verification.checker_sha256) {
    fail("The fresh exercise clone did not materialize the manifest-bound checker.");
  }

  const localArchive = path.join(temporary, verification.asset_name);
  await writeFile(localArchive, archiveBytes, { flag: "wx" });
  const adopterBytes = verification.entries.get("dist/nourd-nkf-adopt.mjs");
  if (!Buffer.isBuffer(adopterBytes)) fail("The candidate archive omits its adopter.");
  const adopter = path.join(temporary, "nourd-nkf-adopt.mjs");
  await writeFile(adopter, adopterBytes, { flag: "wx", mode: 0o755 });
  await chmod(adopter, 0o755);

  const manifest = verification.manifest;
  const compatibility = nkfVersion === "0.81"
    ? [
        {
          from_nkf_version: "0.8",
          classification: "non-breaking",
          migration_required: false,
          summary: "NKF 0.8 upgrades to NKF 0.81 through the ordinary update with the mechanical contract rebind and the digest-bound delta carry.",
        },
        {
          from_nkf_version: "0.81",
          classification: "non-breaking",
          migration_required: false,
          summary: "NKF 0.81 refreshes the exact release and integration.",
        },
      ]
    : nkfVersion === "0.8"
    ? [
        {
          from_nkf_version: "0.71",
          classification: "non-breaking",
          migration_required: false,
          summary: "NKF 0.71 upgrades to NKF 0.8 through the ordinary update with the mechanical contract rebind and the digest-bound delta carry.",
        },
        {
          from_nkf_version: "0.8",
          classification: "non-breaking",
          migration_required: false,
          summary: "NKF 0.8 refreshes the exact release and integration.",
        },
      ]
    : nkfVersion === "0.71"
    ? [
        {
          from_nkf_version: "0.7",
          classification: "non-breaking",
          migration_required: false,
          summary: "NKF 0.7 upgrades to NKF 0.71 through the ordinary update with the mechanical contract rebind and the digest-bound delta carry.",
        },
        {
          from_nkf_version: "0.71",
          classification: "non-breaking",
          migration_required: false,
          summary: "NKF 0.71 refreshes the exact release and integration.",
        },
      ]
    : nkfVersion === "0.7"
    ? [
        {
          from_nkf_version: "0.6",
          classification: "breaking",
          migration_required: true,
          summary: "NKF 0.6 requires explicit repository-owner approval for the governed breaking migration to NKF 0.7.",
        },
        {
          from_nkf_version: "0.7",
          classification: "non-breaking",
          migration_required: false,
          summary: "NKF 0.7 refreshes the exact release and integration.",
        },
      ]
    : nkfVersion === "0.6"
    ? ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6"].map((from) => ({
        from_nkf_version: from,
        classification: ["0.5", "0.6"].includes(from) ? "non-breaking" : "breaking",
        migration_required: !["0.5", "0.6"].includes(from),
        summary: from === "0.6"
          ? "NKF 0.6 refreshes the exact release and integration without semantic migration."
          : from === "0.5"
            ? "NKF 0.5 advances non-breakingly to NKF 0.6 only under the accepted exact policy and baseline-carry-forward preconditions."
            : `NKF ${from} requires explicit repository-owner approval for the governed breaking migration to NKF 0.6.`,
      }))
    : nkfVersion === "0.5"
    ? ["0.1", "0.2", "0.3", "0.4", "0.5"].map((from) => ({
        from_nkf_version: from,
        classification: from === "0.5" ? "non-breaking" : "breaking",
        migration_required: from !== "0.5",
        summary: from === "0.5"
          ? "NKF 0.5 refreshes the exact release and integration without semantic migration."
          : `NKF ${from} requires explicit repository-owner approval for the governed breaking migration to NKF 0.5.`,
      }))
    : [
        {
          from_nkf_version: "0.1",
          classification: "breaking",
          migration_required: true,
          summary: "NKF 0.1 requires explicit approved migration to NKF 0.4.",
        },
        {
          from_nkf_version: "0.2",
          classification: "breaking",
          migration_required: true,
          summary: "NKF 0.2 requires explicit approved migration to NKF 0.4.",
        },
        {
          from_nkf_version: "0.3",
          classification: "non-breaking",
          migration_required: false,
          summary: "NKF 0.3 advances non-breakingly to NKF 0.4 without knowledge migration.",
        },
        {
          from_nkf_version: "0.4",
          classification: "non-breaking",
          migration_required: false,
          summary: "NKF 0.4 refreshes the exact release and integration.",
        },
      ];
  const catalog = {
    contract: "nkf.release-candidate-binding",
    nkf_version: nkfVersion,
    state: "candidate",
    channel: "internal-exact-candidate",
    archive: {
      sha256: verification.archive_sha256,
      asset_name: verification.asset_name,
      tag: verification.tag,
      size: archiveBytes.length,
      url: null,
    },
    source_commit: verification.release_commit,
    checker_sha256: verification.checker_sha256,
    adopter_sha256: sha256(adopterBytes),
    authority: {
      markdown_sha256: manifest.authority.markdown.digest.value,
      executable_sha256: manifest.authority.executable.digest.value,
    },
    supported_root_profiles: [
      "nkf.profile.product",
      "nkf.profile.technology",
    ],
    compatibility,
    release: {
      prerelease: true,
      published_at: null,
      url: null,
      visibility: "unpublished",
    },
  };
  const catalogPath = path.join(temporary, "candidate-binding.json");
  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, {
    flag: "wx",
  });
  const producerPrepromotionRoot = path.join(temporary, "producer-prepromotion");
  if (["0.6", "0.7", "0.71", "0.8", "0.81"].includes(nkfVersion)) {
    await cp(project, producerPrepromotionRoot, {
      recursive: true,
      filter(sourcePath) {
        const relative = path.relative(project, sourcePath);
        if (relative === "") return true;
        const first = relative.split(path.sep)[0] ?? "";
        return ![".git", "node_modules"].includes(first) &&
          !first.startsWith(".nkf-transaction-");
      },
    });
  }
  const commonArguments = [
    adopter,
    "--project",
    project,
    "--recommendation",
    catalogPath,
    "--archive",
    localArchive,
    "--candidate-binding",
    verification.archive_sha256,
  ];
  const firstArguments = [
    ...commonArguments,
    ...(nkfVersion === "0.81"
      ? [
          "--promotion-input", path.join(project, "knowledge/evidence/release/nkf-0.81-producer-promotion.yaml"),
          "--accepting-decision", path.join(project, "knowledge/decisions/0143-bind-the-predecessor-repair-promotion.md"),
          "--promotion-stage", "prepublication-candidate-bound-adopt-into-isolated-exact-producer-copy",
          "--review", reviewPath,
        ]
      : nkfVersion === "0.8"
      ? [
          "--promotion-input", path.join(project, "knowledge/evidence/release/nkf-0.8-producer-promotion.yaml"),
          "--accepting-decision", path.join(project, "knowledge/decisions/0134-accept-the-nkf-0-8-authority-set.md"),
          "--promotion-stage", "prepublication-candidate-bound-adopt-into-isolated-exact-producer-copy",
          "--review", reviewPath,
        ]
      : nkfVersion === "0.71"
      ? [
          "--promotion-input", path.join(project, "knowledge/evidence/release/nkf-0.71-producer-promotion.yaml"),
          "--accepting-decision", path.join(project, "knowledge/decisions/0131-accept-the-nkf-0-71-authority-set.md"),
          "--promotion-stage", "prepublication-candidate-bound-adopt-into-isolated-exact-producer-copy",
          "--review", reviewPath,
        ]
      : nkfVersion === "0.7"
      ? [
          "--promotion-input", path.join(project, "knowledge/evidence/release/nkf-0.7-producer-promotion.yaml"),
          "--accepting-decision", path.join(project, "knowledge/decisions/0128-accept-the-revised-nkf-0-7-authority-set.md"),
          "--promotion-stage", "prepublication-candidate-bound-adopt-into-isolated-exact-producer-copy",
          "--review", reviewPath,
          "--accept-breaking", "repository-owner",
        ]
      : nkfVersion === "0.6"
      ? [
          "--promotion-input", path.join(project, "knowledge/evidence/release/nkf-0.6-revision-3-producer-promotion.yaml"),
          "--accepting-decision", path.join(project, "knowledge/decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md"),
          "--promotion-stage", "prepublication-candidate-bound-adopt-into-isolated-exact-producer-copy",
          "--review", reviewPath,
        ]
      : nkfVersion === "0.5"
      ? ["--accept-breaking", "repository-owner", "--review", reviewPath]
      : []),
  ];
  const first = run(process.execPath, firstArguments);
  const firstResult = parseStrictJson(Buffer.from(first.stdout, "utf8"));
  const expectedFirstState = nkfVersion === "0.5" ? "migrated" : "updated";
  if (firstResult.state !== expectedFirstState) {
    fail(`First candidate Adopt returned ${firstResult.state}, not ${expectedFirstState}.`);
  }
  if (nkfVersion === "0.4" &&
    execFileSync("git", ["status", "--porcelain", "--", "knowledge"], {
      cwd: project,
      encoding: "utf8",
    }) !== ""
  ) {
    fail("Non-breaking candidate self-adoption changed producer knowledge bytes.");
  }

  // The two protocol roots nothing installs are emitted at the version the
  // repository has adopted. Adopting NKF 0.8 changes that version, so the
  // roots are restamped from the same version-neutral source before the gate
  // — which the gate then verifies byte-for-byte. This is a producer step of
  // adopting the version, not a candidate change: no release-set member moves.
  if (["0.8", "0.81"].includes(nkfVersion)) {
    run(process.execPath, [
      path.join(project, "scripts/generate-guidance.mjs"),
      "--project", project, "--version", nkfVersion, "--stamp", "adopted",
    ]);
    // The release-stamp members are candidate bytes and are never rewritten
    // here; prove they already match their derivation instead.
    run(process.execPath, [
      path.join(project, "scripts/generate-guidance.mjs"),
      "--project", project, "--version", nkfVersion, "--check",
    ]);
  }
  const producerGate = run("npm", ["run", "nkf:check"], {
    cwd: project,
    env: {
      ...process.env,
      ...(["0.6", "0.7", "0.71", "0.8", "0.81"].includes(nkfVersion)
        ? { NKF_PRODUCER_PREPROMOTION_ROOT: producerPrepromotionRoot }
        : {}),
    },
  });
  const rebuiltChecker = await readFile(
    path.join(project, verification.manifest.checker.path),
  );
  if (sha256(rebuiltChecker) !== verification.checker_sha256) {
    fail("The self-adopted producer gate did not rebuild the manifest-bound checker.");
  }
  const second = run(process.execPath, commonArguments);
  const secondResult = parseStrictJson(Buffer.from(second.stdout, "utf8"));
  if (secondResult.state !== "current") {
    fail(`Second candidate Adopt returned ${secondResult.state}, not current.`);
  }
  const pin = parseStrictJson(
    await readFile(path.join(project, ".nourd/nkf-release.json")),
  );
  if (
    pin.archive.sha256 !== verification.archive_sha256 ||
    pin.integration?.mode !== "host-superset"
  ) {
    fail("Candidate self-adoption did not preserve the exact archive and host-superset mode.");
  }

  process.stdout.write(
    `${JSON.stringify({
      contract: "nkf.release-candidate-exercise",
      nkf_version: nkfVersion,
      state: "passed",
      archive_sha256: verification.archive_sha256,
      release_commit: verification.release_commit,
      first_adopt: firstResult.state,
      second_adopt: secondResult.state,
      integration_mode: pin.integration.mode,
      producer_gate: producerGate.status === 0 ? "passed" : "failed",
      source_members_reproduced: source.members_reproduced,
    }, null, 2)}\n`,
  );
} finally {
  await rm(temporary, { recursive: true, force: true });
}
