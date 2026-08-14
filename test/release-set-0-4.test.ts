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
  releaseClassesForVersion,
  reproduceReleaseMembers,
} = releaseSetTooling;

async function releaseFixture(nkfVersion = "0.5") {
  const releaseSet = await readReleaseSet(repositoryRoot, nkfVersion);
  const memberEntries = releaseEntriesForVersion(nkfVersion, releaseSet);
  const entries = await readReleaseEntries(repositoryRoot, memberEntries);
  const manifest = constructReleaseManifest({
    releaseCommit: "a".repeat(40),
    entries,
    nkfVersion,
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
      new Set(releaseClassesForVersion("0.5")),
    );
    expect(new Set(releaseSet.members.map((member: any) => member.class))).toEqual(
      new Set(releaseClassesForVersion("0.5")),
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
  }, 30_000);

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
    ).rejects.toThrow(/coverage union|missing or symbolic/);
  });
});

describe("NKF 0.6 sole release-set realization", () => {
  it("reproduces and verifies the exact deterministic 0.6 membership", async () => {
    const releaseSet = await readReleaseSet(repositoryRoot, "0.6");
    await expect(reproduceReleaseMembers(repositoryRoot, releaseSet)).resolves.toEqual(
      releaseSet.members,
    );
    expect(new Set(releaseSet.coverage.map((selector: any) => selector.class))).toEqual(
      new Set(releaseClassesForVersion("0.6")),
    );
    expect(new Set(releaseSet.members.map((member: any) => member.class))).toEqual(
      new Set(releaseClassesForVersion("0.6")),
    );
    expect(releaseSet.members).toHaveLength(185);

    const first = await releaseFixture("0.6");
    const second = await releaseFixture("0.6");
    expect(first.archive).toEqual(second.archive);
    expect(first.manifest.nkf_version).toBe("0.6");
    expect(first.manifest.files).toHaveLength(184);
    const verified = verifyReleaseArchive(first.archive, sha256(first.archive));
    expect(verified.manifest).toEqual(first.manifest);
    expect(verified.release_entries).toEqual(first.memberEntries);
  }, 20_000);

  it("rejects manifest-consistent incomplete third-party notices", async () => {
    const fixture = await releaseFixture("0.6");
    const entries = new Map(fixture.entries);
    const notice = (entries.get("THIRD_PARTY_NOTICES.md") as Buffer).toString("utf8");
    const firstSection = notice.indexOf("\n## `");
    const secondSection = notice.indexOf("\n## `", firstSection + 1);
    const thirdSection = notice.indexOf("\n## `", secondSection + 1);
    const changedNotice = Buffer.from(
      `${notice.slice(0, secondSection)}${notice.slice(thirdSection)}`,
      "utf8",
    );
    entries.set("THIRD_PARTY_NOTICES.md", changedNotice);
    const manifest = structuredClone(fixture.manifest);
    const changedDigest = sha256(changedNotice);
    manifest.licensing.third_party_notices.digest.value = changedDigest;
    manifest.files.find((file: any) => file.path === "THIRD_PARTY_NOTICES.md").digest.value = changedDigest;
    entries.set("release-manifest.json", serializeReleaseManifest(manifest));
    const archive = createUstar(entries, fixture.memberEntries);
    expect(() => verifyReleaseArchive(archive, sha256(archive))).toThrow(/notice coverage/i);

    const bodyEntries = new Map(fixture.entries);
    const changedBody = Buffer.from(
      (fixture.entries.get("THIRD_PARTY_NOTICES.md") as Buffer).toString("utf8")
        .replace("Permission is hereby granted", "Permission text was removed"),
      "utf8",
    );
    bodyEntries.set("THIRD_PARTY_NOTICES.md", changedBody);
    const bodyManifest = structuredClone(fixture.manifest);
    const bodyDigest = sha256(changedBody);
    bodyManifest.licensing.third_party_notices.digest.value = bodyDigest;
    bodyManifest.files.find((file: any) => file.path === "THIRD_PARTY_NOTICES.md").digest.value = bodyDigest;
    bodyEntries.set("release-manifest.json", serializeReleaseManifest(bodyManifest));
    const bodyArchive = createUstar(bodyEntries, fixture.memberEntries);
    expect(() => verifyReleaseArchive(bodyArchive, sha256(bodyArchive))).toThrow(/exact reviewed/i);
  }, 20_000);
});
