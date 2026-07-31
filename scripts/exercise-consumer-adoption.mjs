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
      project_kind: "isolated-synthetic-product",
    },
    null,
    2,
  )}\n`,
);
