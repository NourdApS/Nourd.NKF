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
await cp(path.join(repositoryRoot, "fixtures/valid/minimal"), project, {
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

const run = (command, extra = [], expected = 0) =>
  runFor(project, command, extra, expected);

const releaseArguments = [
  "--archive",
  archivePath,
  "--sha256",
  expectedSha256,
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
  if (withDocument) {
    const planPath = path.join(workspace, "plan.yaml");
    const plan = YAML.parse(await readFile(planPath, "utf8"));
    for (const document of plan.documents) {
      document.representation = {
        kind: "non_record",
        non_record_kind: "navigation",
      };
    }
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
  }
  const sealed = JSON.parse(
    runFor(root, "seal", ["--plan", path.join(workspace, "plan.yaml")]).stdout,
  );
  const onboarded = JSON.parse(
    runFor(root, "onboard", [
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
  const checked = JSON.parse(runFor(root, "check").stdout);
  const repeated = JSON.parse(
    runFor(root, "onboard", [
      "--plan",
      path.join(workspace, "plan.yaml"),
      ...releaseArguments,
    ]).stdout,
  );
  return {
    eligible: inspected.eligible,
    sealed: sealed.state,
    onboarded: onboarded.state,
    conformance: onboarded.validation.conformance,
    governing_use: onboarded.validation.governing_use,
    package_command: "passed",
    checked: checked.state,
    repeated: repeated.state,
  };
}

const initialProduct = await exerciseInitialOnboarding("product", false);
const initialTechnology = await exerciseInitialOnboarding("technology", true);
const installed = JSON.parse(run("install", releaseArguments).stdout);
const checked = JSON.parse(run("check").stdout);
const noUpdate = JSON.parse(run("install", releaseArguments).stdout);

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
const archiveTamper = run("status", [], 1);
await writeFile(installedArchivePath, installedArchive);

pin.checker_sha256 = "0".repeat(64);
await writeFile(pinPath, `${JSON.stringify(pin, null, 2)}\n`);
const pinTamper = run("status", [], 1);
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
const integrationTamper = run("status", [], 1);
await writeFile(adapterPath, adapter);

const knowledgePath = path.join(project, "knowledge/product.md");
const knowledge = await readFile(knowledgePath);
await appendFile(knowledgePath, "\nTampered.\n");
const knowledgeTamper = run("check", [], 1);
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
