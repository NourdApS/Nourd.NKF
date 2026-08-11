import { execFileSync, spawnSync } from "node:child_process";
import { chmod, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
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
if (values.length < 4 || values[2] !== "--source-root") {
  fail(
    "Usage: node scripts/exercise-release-candidate.mjs <archive> <sha256> --source-root <repository>",
  );
}
const archivePath = path.resolve(values[0]);
const expectedSha256 = values[1];
const sourceRoot = path.resolve(values[3]);
const archiveBytes = await readFile(archivePath);
const verification = verifyReleaseArchive(archiveBytes, expectedSha256, {
  sourceRoot,
});
if (verification.manifest.nkf_version !== "0.4") {
  fail("The exact-candidate exercise requires an NKF 0.4 archive.");
}
const source = await evaluateReleaseSourceProvenance(sourceRoot, verification);

const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-0-4-candidate-exercise-"));
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
  const catalog = {
    contract: "nkf.release-candidate-binding",
    nkf_version: "0.4",
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
    compatibility: [
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
    ],
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
  const baseArguments = [
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
  const first = run(
    process.execPath,
    [...baseArguments, "--accept-breaking", "repository-owner"],
  );
  const firstResult = parseStrictJson(Buffer.from(first.stdout, "utf8"));
  if (firstResult.state !== "migrated") {
    fail(`First candidate Adopt returned ${firstResult.state}, not migrated.`);
  }

  const producerGate = run("npm", ["run", "nkf:check"], { cwd: project });
  const rebuiltChecker = await readFile(
    path.join(project, verification.manifest.checker.path),
  );
  if (sha256(rebuiltChecker) !== verification.checker_sha256) {
    fail("The self-adopted producer gate did not rebuild the manifest-bound checker.");
  }
  const second = run(process.execPath, baseArguments);
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
      nkf_version: "0.4",
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
