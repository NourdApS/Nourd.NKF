import { cp, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { repositoryRoot } from "./helpers.js";

// @ts-expect-error Repository release tooling is directly executable ESM.
const release = await import("../scripts/release/core.mjs");
// @ts-expect-error Repository release-set tooling is directly executable ESM.
const releaseSetTooling = await import("../scripts/release/release-set.mjs");
const {
  constructReleaseManifest,
  createUstar,
  readReleaseEntries,
  releaseEntriesForVersion,
  serializeReleaseManifest,
  sha256,
  verifyReleaseArchive,
} = release;
const {
  parseReleaseSet,
  readReleaseSet,
  RELEASE_CLASSES,
  reproduceReleaseMembers,
} = releaseSetTooling;

async function releaseFixture() {
  const releaseSet = await readReleaseSet(repositoryRoot, "0.5");
  const memberEntries = releaseEntriesForVersion("0.5", releaseSet);
  const entries = await readReleaseEntries(repositoryRoot, memberEntries);
  const manifest = constructReleaseManifest({
    releaseCommit: "a".repeat(40),
    entries,
    nkfVersion: "0.5",
    releaseSet,
  });
  entries.set("release-manifest.json", serializeReleaseManifest(manifest));
  const archive = createUstar(entries, memberEntries);
  return { archive, entries, manifest, memberEntries, releaseSet };
}

describe("NKF 0.5 sole release-set realization", () => {
  it("reproduces every required class and the exact complete membership", async () => {
    const releaseSet = await readReleaseSet(repositoryRoot, "0.5");
    await expect(reproduceReleaseMembers(repositoryRoot, releaseSet)).resolves.toEqual(
      releaseSet.members,
    );
    expect(new Set(releaseSet.coverage.map((selector: any) => selector.class))).toEqual(
      new Set(RELEASE_CLASSES),
    );
    expect(new Set(releaseSet.members.map((member: any) => member.class))).toEqual(
      new Set(RELEASE_CLASSES),
    );
    expect(releaseSet.members).toHaveLength(181);
    expect(releaseSet.members).toContainEqual({
      path: "release-manifest.json",
      class: "release-manifest",
      mode: "0644",
    });
    for (const member of releaseSet.members) {
      expect(member.mode).toBe(
        member.path === "dist/nourd-nkf-checker.mjs" ? "0755" : "0644",
      );
    }
  });

  it("constructs and verifies one manifest binding every pre-manifest member", async () => {
    const first = await releaseFixture();
    const second = await releaseFixture();
    expect(first.archive).toEqual(second.archive);
    expect(first.manifest.source).toEqual({
      repository: "https://github.com/kaveh6202/Nourd.NKF.git",
      release_commit: "a".repeat(40),
    });
    expect(first.manifest.files).toHaveLength(first.releaseSet.members.length - 1);
    expect(first.manifest.files.map((file: any) => file.path)).toEqual(
      first.releaseSet.members
        .filter((member: any) => member.path !== "release-manifest.json")
        .map((member: any) => member.path),
    );
    const verified = verifyReleaseArchive(first.archive, sha256(first.archive));
    expect(verified.manifest).toEqual(first.manifest);
    expect(verified.release_entries).toEqual(first.memberEntries);
  }, 15_000);

  it("rejects release-set, manifest-file, archive-mode, and source-coverage drift", async () => {
    const fixture = await releaseFixture();
    const releaseSetBytes = fixture.entries.get("contracts/nkf/0.5/release-set.yaml")!;
    const releaseSetText = releaseSetBytes.toString("utf8");
    expect(() =>
      parseReleaseSet(
        Buffer.from(
          releaseSetText.replace(
            "mode: \"0755\"",
            "mode: \"0644\"",
          ),
        ),
      ),
    ).toThrow(/invalid mode/);

    const manifest = structuredClone(fixture.manifest);
    manifest.files[0].mode = "0755";
    const changedEntries = new Map(fixture.entries);
    changedEntries.set("release-manifest.json", serializeReleaseManifest(manifest));
    const changedArchive = createUstar(changedEntries, fixture.memberEntries);
    expect(() => verifyReleaseArchive(changedArchive, sha256(changedArchive))).toThrow();

    const wrongModes = fixture.memberEntries.map((member: any) => ({ ...member }));
    wrongModes[0].mode = 0o755;
    const wrongModeArchive = createUstar(fixture.entries, wrongModes);
    expect(() => verifyReleaseArchive(wrongModeArchive, sha256(wrongModeArchive))).toThrow(
      /mode|release set/i,
    );

    const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-release-set-drift-"));
    await cp(repositoryRoot, temporary, {
      recursive: true,
      filter(source) {
        const relative = path.relative(repositoryRoot, source);
        return relative === "" || ![".git", "node_modules"].includes(relative.split(path.sep)[0]!);
      },
    });
    await rm(path.join(temporary, "public-docs/guides/update-and-recover.md"));
    await expect(
      reproduceReleaseMembers(temporary, fixture.releaseSet),
    ).rejects.toThrow(/coverage union/);
  });
});
