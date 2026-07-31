import { execFileSync, spawnSync } from "node:child_process";
import {
  appendFile,
  cp,
  mkdtemp,
  readFile,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

function run(command, extra = [], expected = 0) {
  const result = spawnSync(
    process.execPath,
    [
      path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs"),
      command,
      "--project",
      project,
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

const releaseArguments = [
  "--archive",
  archivePath,
  "--sha256",
  expectedSha256,
];
const installed = JSON.parse(run("install", releaseArguments).stdout);
const checked = JSON.parse(run("check").stdout);
const noUpdate = JSON.parse(run("install", releaseArguments).stdout);

const skillPath = path.join(
  project,
  ".agents/skills/nkf-authoring/SKILL.md",
);
const skill = await readFile(skillPath);
await appendFile(skillPath, "\nTampered.\n");
const integrationTamper = run("status", [], 1);
await writeFile(skillPath, skill);

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
      integration_tamper_rejected: integrationTamper.status !== 0,
      knowledge_tamper_rejected: knowledgeTamper.status !== 0,
      project_kind: "isolated-synthetic-product",
    },
    null,
    2,
  )}\n`,
);
