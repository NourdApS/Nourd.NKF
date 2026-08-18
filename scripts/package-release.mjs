import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  constructReleaseManifest,
  createUstar,
  invokeVerifiedChecker,
  readReleaseEntries,
  releaseEntriesForVersion,
  serializeReleaseManifest,
  sha256,
  validateReleaseManifest,
  verifyReleaseArchive,
} from "./release/core.mjs";
import { ACCEPTED_0_71_ARTIFACT_DIGESTS } from "./release/config.mjs";
import {
  readReleaseSet,
  reproduceReleaseMembers,
} from "./release/release-set.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.resolve(
  process.argv[2] ?? path.join(repositoryRoot, "release"),
);

function git(...argumentsValue) {
  return execFileSync("git", argumentsValue, {
    cwd: repositoryRoot,
    encoding: "utf8",
  }).trim();
}

function run(command, argumentsValue) {
  execFileSync(command, argumentsValue, {
    cwd: repositoryRoot,
    stdio: "inherit",
  });
}

if (Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10) < 22) {
  throw new Error("NKF release packaging requires Node 22 or later.");
}
if (git("rev-parse", "--show-toplevel") !== repositoryRoot) {
  throw new Error("Release packaging is running from the wrong Git repository.");
}
if (![
  "https://github.com/NourdApS/Nourd.NKF.git",
  "https://github.com/kaveh6202/Nourd.NKF.git",
].includes(git("remote", "get-url", "origin"))) {
  throw new Error("Release packaging found the wrong origin remote.");
}
if (git("status", "--porcelain") !== "") {
  throw new Error("Release packaging requires a clean source tree.");
}
const releaseCommit = git("rev-parse", "HEAD");

run("npm", ["run", "check"]);
run("npm", ["run", "build"]);
const checkerFirst = await readFile(
  path.join(repositoryRoot, "dist/nourd-nkf-checker.mjs"),
);
run("npm", ["run", "build"]);
const checkerSecond = await readFile(
  path.join(repositoryRoot, "dist/nourd-nkf-checker.mjs"),
);
if (!checkerFirst.equals(checkerSecond)) {
  throw new Error("Two checker builds did not produce identical bytes.");
}
const releaseSet = await readReleaseSet(repositoryRoot);
await reproduceReleaseMembers(repositoryRoot, releaseSet);
const memberEntries = releaseEntriesForVersion("0.71", releaseSet);
const entries = await readReleaseEntries(repositoryRoot, memberEntries);
entries.set("dist/nourd-nkf-checker.mjs", checkerSecond);
for (const [artifactPath, expected] of Object.entries(
  ACCEPTED_0_71_ARTIFACT_DIGESTS,
)) {
  if (sha256(entries.get(artifactPath)) !== expected) {
    throw new Error(`Accepted release artifact digest mismatch: ${artifactPath}`);
  }
}

if (
  git("rev-parse", "HEAD") !== releaseCommit ||
  git("status", "--porcelain") !== ""
) {
  throw new Error("Release source changed during packaging.");
}
const manifest = constructReleaseManifest({
  releaseCommit,
  entries,
  nkfVersion: "0.71",
  releaseSet,
});
const manifestBytes = serializeReleaseManifest(manifest);
validateReleaseManifest(
  manifest,
  entries.get(
    "contracts/nkf/0.71/schemas/release-manifest.schema.json",
  ),
);
entries.set("release-manifest.json", manifestBytes);

const archiveFirst = createUstar(entries, memberEntries);
const archiveSecond = createUstar(entries, memberEntries);
if (!archiveFirst.equals(archiveSecond)) {
  throw new Error("Two release archives did not produce identical bytes.");
}
const archiveSha256 = sha256(archiveSecond);
const verification = verifyReleaseArchive(archiveSecond, archiveSha256, {
  sourceRoot: repositoryRoot,
});
await invokeVerifiedChecker(verification, [
  "--project",
  path.join(repositoryRoot, "fixtures/valid/minimal-0-71"),
  "--level",
  "full-bundle",
  "--runner",
  "nourd-nkf-release-verification",
  "--purpose",
  "whole-root-readiness",
  "--require-readiness",
  "--no-persist",
]);

await mkdir(outputDirectory, { recursive: true });
const assetPath = path.join(outputDirectory, verification.asset_name);
await writeFile(assetPath, archiveSecond, { flag: "wx" });
process.stdout.write(
  `${JSON.stringify(
    {
      asset_path: assetPath,
      archive_sha256: archiveSha256,
      tag: verification.tag,
      release_commit: releaseCommit,
      checker_sha256: verification.checker_sha256,
    },
    null,
    2,
  )}\n`,
);
