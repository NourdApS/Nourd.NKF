import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  invokeVerifiedChecker,
  verifyReleaseArchive,
} from "./release/core.mjs";
import { evaluateReleaseSourceProvenance } from "./release/source-provenance.mjs";

function usage() {
  return [
    "Usage: node scripts/verify-release.mjs <archive> <expected-sha256> [options]",
    "",
    "Options:",
    "  --source-root <path>   Verify Git source provenance",
    "  --project <path>       Invoke the verified checker on a project",
  ].join("\n");
}

const values = process.argv.slice(2);
if (values.includes("--help") || values.length < 2) {
  process.stdout.write(`${usage()}\n`);
  process.exit(values.includes("--help") ? 0 : 2);
}
const archivePath = path.resolve(values[0]);
const expectedSha256 = values[1];
let sourceRoot;
let project;
for (let index = 2; index < values.length; index += 1) {
  const value = values[index];
  const next = values[index + 1];
  if (value === "--source-root" && next !== undefined) {
    sourceRoot = path.resolve(next);
    index += 1;
  } else if (value === "--project" && next !== undefined) {
    project = path.resolve(next);
    index += 1;
  } else {
    throw new Error(`Unknown or incomplete argument: ${value ?? ""}`);
  }
}

const verification = verifyReleaseArchive(
  await readFile(archivePath),
  expectedSha256,
  sourceRoot === undefined ? {} : { sourceRoot },
);
const source = sourceRoot === undefined
  ? undefined
  : await evaluateReleaseSourceProvenance(sourceRoot, verification);
let checker;
if (project !== undefined) {
  checker = await invokeVerifiedChecker(verification, [
    "--project",
    project,
    "--level",
    "full-bundle",
    "--runner",
    "nourd-nkf-release-verification",
    "--no-persist",
  ]);
}
process.stdout.write(
  `${JSON.stringify(
    {
      archive_sha256: verification.archive_sha256,
      asset_name: verification.asset_name,
      tag: verification.tag,
      release_commit: verification.release_commit,
      checker_sha256: verification.checker_sha256,
      source_reproduced: source !== undefined,
      source_members_reproduced: source?.members_reproduced ?? 0,
      checker_invoked: checker !== undefined,
    },
    null,
    2,
  )}\n`,
);
