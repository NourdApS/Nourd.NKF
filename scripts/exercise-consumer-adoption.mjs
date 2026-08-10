import { execFileSync, spawnSync } from "node:child_process";
import {
  appendFile,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const archivePath = path.resolve(process.argv[2] ?? "");
const expectedSha256 = process.argv[3];
if (!/^[0-9a-f]{64}$/.test(expectedSha256 ?? "")) {
  throw new Error(
    "Usage: node scripts/exercise-consumer-adoption.mjs <archive> <full-sha256>",
  );
}

const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-consumer-exercise-"));
const project = path.join(parent, "consumer");
await cp(path.join(repositoryRoot, "fixtures/valid/minimal-0-2"), project, {
  recursive: true,
});
execFileSync("git", ["init", "-b", "master"], {
  cwd: project,
  stdio: "ignore",
});

function runFor(projectRoot, command, extra = [], expected = 0) {
  const result = spawnSync(
    process.execPath,
    [
      path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs"),
      command,
      "--project",
      projectRoot,
      ...extra,
    ],
    { encoding: "utf8" },
  );
  if (result.status === expected) return result;
  if (expected !== 0 && result.status !== 0) return result;
  throw new Error(
    `${command} returned ${result.status}.\n${result.stdout}\n${result.stderr}`,
  );
}

function runAdoptFor(projectRoot, extra = [], expected = 0) {
  const result = spawnSync(
    process.execPath,
    [
      path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs"),
      "--project",
      projectRoot,
      "--recommendation",
      path.join(repositoryRoot, "release/recommended.json"),
      ...extra,
    ],
    { encoding: "utf8" },
  );
  if (result.status === expected) return result;
  if (expected !== 0 && result.status !== 0) return result;
  throw new Error(
    `Adopt returned ${result.status}.\n${result.stdout}\n${result.stderr}`,
  );
}

const runAdopt = (extra = [], expected = 0) =>
  runAdoptFor(project, extra, expected);

const releaseArguments = [
  "--archive",
  archivePath,
];

async function exerciseInitialOnboarding(profile, withDocument) {
  const root = path.join(parent, `initial-${profile}`);
  const workspace = path.join(parent, `workspace-${profile}`);
  await mkdir(root);
  execFileSync("git", ["init", "-b", "master"], {
    cwd: root,
    stdio: "ignore",
  });
  if (withDocument) {
    const source = path.join(root, "knowledge", "notes", "overview.md");
    await mkdir(path.dirname(source), { recursive: true });
    await writeFile(
      source,
      [
        "---",
        `title: ${profile === "product" ? "Product" : "Technology"} Overview`,
        'summary: "Provides early project navigation without accepted lifecycle meaning."',
        "created_at: 2026-07-31T11:00:00Z",
        "---",
        "",
        `# ${profile === "product" ? "Product" : "Technology"} Overview`,
        "",
        "This early note remains project-owned.",
        "",
      ].join("\n"),
    );
  }
  const technology = profile === "technology";
  const inspected = JSON.parse(
    runFor(root, "inspect", [
      "--output",
      workspace,
      "--profile",
      profile,
      "--root-id",
      technology ? "exercise-technology" : "exercise-product",
      "--root-title",
      technology ? "Exercise Technology" : "Exercise Product",
      "--task-id",
      technology ? "EXERCISE-TECH-001" : "EXERCISE-001",
      "--created-at",
      "2026-07-31T11:00:00Z",
    ]).stdout,
  );
  const planPath = path.join(workspace, "plan.yaml");
  const plan = YAML.parse(await readFile(planPath, "utf8"));
  plan.assessment = withDocument
    ? {
        category: "tiny-knowledge-no-source-or-configuration",
        assessed_by: "exercise-agent",
        assessed_at: "2026-07-31T11:01:00Z",
        recommendation: "recommended",
        summary: "The complete exercise repository contains one tiny knowledge document.",
        evidence: [{
          subject: "knowledge/notes/overview.md",
          classification: "knowledge",
          finding: "The document was reviewed completely.",
        }],
        confirmation: {
          status: "confirmed",
          authority: "human-product-owner",
          confirmed_at: "2026-07-31T11:02:00Z",
          override: false,
          rationale: "The exercise authority confirms Category 2 for the exact snapshot.",
        },
      }
    : {
        category: "empty-repository",
        assessed_by: "exercise-agent",
        assessed_at: "2026-07-31T11:01:00Z",
        recommendation: "recommended",
        summary: "The complete exercise repository is effectively empty.",
        evidence: [],
        confirmation: { status: "not-required" },
      };
  if (withDocument) {
    for (const document of plan.documents) {
      document.representation = {
        kind: "non_record",
        non_record_kind: "navigation",
      };
    }
  }
  await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
  const sealed = JSON.parse(
    runFor(root, "seal", ["--plan", path.join(workspace, "plan.yaml")]).stdout,
  );
  const onboarded = JSON.parse(
    runAdoptFor(root, [
      "--plan",
      path.join(workspace, "plan.yaml"),
      ...releaseArguments,
    ]).stdout,
  );
  execFileSync("npm", ["ci", "--ignore-scripts"], {
    cwd: root,
    stdio: "ignore",
  });
  execFileSync("npm", ["run", "nkf:check"], {
    cwd: root,
    stdio: "ignore",
  });
  const repeated = JSON.parse(runAdoptFor(root, releaseArguments).stdout);
  return {
    mechanically_ready: inspected.mechanically_ready,
    sealed: sealed.state,
    onboarded: onboarded.state,
    conformance: onboarded.operation.validation.conformance,
    governing_use: onboarded.operation.validation.governing_use,
    package_command: "passed",
    checked: repeated.state,
    repeated: repeated.state,
  };
}

const initialProduct = await exerciseInitialOnboarding("product", false);
const initialTechnology = await exerciseInitialOnboarding("technology", true);
const installed = JSON.parse(runAdopt(releaseArguments).stdout);
const checked = JSON.parse(runAdopt(releaseArguments).stdout);
const noUpdate = checked;

const pinPath = path.join(project, ".nourd/nkf-release.json");
const pinBytes = await readFile(pinPath);
const pin = JSON.parse(pinBytes.toString("utf8"));
const installedArchivePath = path.join(
  project,
  ...pin.archive.project_path.split("/"),
);
const installedArchive = await readFile(installedArchivePath);
const alteredArchive = Buffer.from(installedArchive);
alteredArchive[700] = alteredArchive[700] ^ 1;
await writeFile(installedArchivePath, alteredArchive);
const archiveTamper = runAdopt(releaseArguments, 1);
await writeFile(installedArchivePath, installedArchive);

pin.checker_sha256 = "0".repeat(64);
await writeFile(pinPath, `${JSON.stringify(pin, null, 2)}\n`);
const pinTamper = runAdopt(releaseArguments, 1);
await writeFile(pinPath, pinBytes);

const adapterPath = path.join(project, ".github/copilot-instructions.md");
const adapter = await readFile(adapterPath);
const alteredAdapter = adapter
  .toString("utf8")
  .replace("read and follow", "ignore");
if (alteredAdapter === adapter.toString("utf8")) {
  throw new Error("The installed adapter does not contain its expected text.");
}
await writeFile(adapterPath, alteredAdapter);
const integrationTamper = runAdopt(releaseArguments, 1);
await writeFile(adapterPath, adapter);

const knowledgePath = path.join(project, "knowledge/product.md");
const knowledge = await readFile(knowledgePath);
await appendFile(knowledgePath, "\nTampered.\n");
const knowledgeTamper = runAdopt(releaseArguments, 1);
await writeFile(knowledgePath, knowledge);

process.stdout.write(
  `${JSON.stringify(
    {
      contract: "nkf.consumer-adoption-exercise",
      state: "passed",
      release_sha256: expectedSha256,
      install_state: installed.state,
      check_state: checked.state,
      no_update_state: noUpdate.state,
      archive_tamper_rejected: archiveTamper.status !== 0,
      pin_tamper_rejected: pinTamper.status !== 0,
      integration_tamper_rejected: integrationTamper.status !== 0,
      knowledge_tamper_rejected: knowledgeTamper.status !== 0,
      initial_product: initialProduct,
      initial_technology: initialTechnology,
      project_kind: "isolated-synthetic-product",
    },
    null,
    2,
  )}\n`,
);
