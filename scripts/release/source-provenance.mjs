import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  readReleaseEntries,
  releaseEntriesForVersion,
  sha256,
} from "./core.mjs";
import {
  readReleaseSet,
  reproduceReleaseMembers,
} from "./release-set.mjs";

function fail(message) {
  throw new Error(message);
}

function run(command, argumentsValue, options = {}) {
  const result = spawnSync(command, argumentsValue, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    ...options,
  });
  if (result.status !== 0) {
    fail(`${command} ${argumentsValue.join(" ")} failed:\n${result.stderr || result.stdout}`);
  }
  return result;
}

export async function evaluateReleaseSourceProvenance(sourceRoot, verification) {
  if (!["0.3", "0.4", "0.5", "0.6", "0.7", "0.71"].includes(verification.manifest.nkf_version)) {
    fail("Exact source-provenance reproduction requires a complete release-set version.");
  }
  const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-release-source-"));
  try {
    const checkout = path.join(temporary, "source");
    run("git", ["clone", "--no-hardlinks", "--local", sourceRoot, checkout]);
    run("git", ["checkout", "--detach", verification.release_commit], { cwd: checkout });
    run("npm", ["ci", "--ignore-scripts"], { cwd: checkout });

    run("npm", ["run", "build"], { cwd: checkout });
    const checkerFirst = await readFile(
      path.join(checkout, verification.manifest.checker.path),
    );
    run("npm", ["run", "build"], { cwd: checkout });
    const checkerSecond = await readFile(
      path.join(checkout, verification.manifest.checker.path),
    );
    if (
      !checkerFirst.equals(checkerSecond) ||
      sha256(checkerSecond) !== verification.checker_sha256
    ) {
      fail("The release commit does not reproducibly yield the manifest-bound checker.");
    }

    const releaseSet = await readReleaseSet(
      checkout,
      verification.manifest.nkf_version,
    );
    await reproduceReleaseMembers(checkout, releaseSet);
    const sourceMembers = releaseEntriesForVersion(
      verification.manifest.nkf_version,
      releaseSet,
    );
    if (JSON.stringify(sourceMembers) !== JSON.stringify(verification.release_entries)) {
      fail("The release commit does not reproduce the archived release-set enumeration.");
    }
    const sourceEntries = await readReleaseEntries(checkout, sourceMembers);
    for (const [relative, bytes] of sourceEntries) {
      const archived = verification.entries.get(relative);
      if (!Buffer.isBuffer(archived) || !archived.equals(bytes)) {
        fail(`The release commit does not reproduce archived member bytes: ${relative}`);
      }
    }
    if (
      run("git", ["status", "--porcelain"], { cwd: checkout }).stdout !== ""
    ) {
      fail("Deterministic source reproduction changed tracked release source bytes.");
    }
    return {
      release_commit: verification.release_commit,
      checker_sha256: verification.checker_sha256,
      members_reproduced: sourceEntries.size,
    };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}
