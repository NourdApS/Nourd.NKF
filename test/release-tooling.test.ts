import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
const {
  constructReleaseManifest,
  createUstar,
  inspectUstar,
  parseStrictJson,
  serializeReleaseManifest,
  sha256,
  validateReleaseManifest,
  verifyReleaseArchive,
} = release;
import { repositoryRoot } from "./helpers.js";

// The 0.7 fixture archive uses the exact real release-set members from the
// working tree, so manifest bindings, licensing digests, and third-party
// coverage verify against genuine bytes.
// @ts-expect-error Repository release tooling is a directly executable ESM module.
const releaseSetModule = await import("../scripts/release/release-set.mjs");
const releaseSet = await releaseSetModule.readReleaseSet(repositoryRoot, "0.7");

function fixtureMemberEntries() {
  return releaseSet.members.map((member: { path: string; mode: string }) => ({
    path: member.path,
    mode: Number.parseInt(member.mode, 8),
  }));
}

async function releaseFixture() {
  const entries = new Map<string, Buffer>();
  for (const member of releaseSet.members) {
    if (member.path === "release-manifest.json") continue;
    entries.set(member.path, await readFile(path.join(repositoryRoot, member.path)));
  }
  const schema = entries.get("contracts/nkf/0.7/schemas/release-manifest.schema.json")!;
  const manifest = constructReleaseManifest({
    releaseCommit: "a".repeat(40),
    entries,
    nkfVersion: "0.7",
    releaseSet,
  });
  validateReleaseManifest(manifest, schema);
  entries.set("release-manifest.json", serializeReleaseManifest(manifest));
  const archive = createUstar(entries, fixtureMemberEntries());
  return { archive, entries, manifest };
}

describe("NKF release tooling", () => {
  it("defines the exact complete 0.7 archive membership", () => {
    const paths = releaseSet.members.map((entry: { path: string }) => entry.path);
    expect(paths).toHaveLength(165);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("release-manifest.json");
    expect(paths).toContain("dist/nourd-nkf-adopt.mjs");
    expect(paths).toContain("contracts/nkf/0.7/version-delta.yaml");
    expect(paths).toContain("LICENSE");
    expect(paths).toContain("NOTICE");
    expect(paths).toContain("THIRD_PARTY_NOTICES.md");
    for (const entry of paths) {
      expect(Buffer.byteLength(`nourd-nkf/${entry}`, "ascii"), entry).toBeLessThanOrEqual(100);
    }
  });

  it("strictly parses JSON and rejects duplicate keys and non-JSON syntax", () => {
    expect(parseStrictJson(Buffer.from("{\"value\":1}"))).toEqual({ value: 1 });
    expect(() =>
      parseStrictJson(Buffer.from("{\"value\":1,\"value\":2}")),
    ).toThrow(/Duplicate JSON object key/);
    expect(() => parseStrictJson(Buffer.from("{\"value\":NaN}"))).toThrow();
    expect(() =>
      parseStrictJson(Buffer.from("\ufeff{\"value\":1}", "utf8")),
    ).toThrow(/byte-order mark/);
  });

  it("constructs canonical manifest bytes and reproducible exact USTAR bytes", async () => {
    const first = await releaseFixture();
    const second = await releaseFixture();
    expect(first.archive).toEqual(second.archive);
    expect(inspectUstar(first.archive)).toEqual(first.entries);
    const archiveDigest = sha256(first.archive);
    const verified = verifyReleaseArchive(first.archive, archiveDigest);
    expect(verified.manifest).toEqual(first.manifest);
    expect(verified.asset_name).toBe(
      `nourd-nkf-sha256-${archiveDigest}.tar`,
    );
    expect(verified.tag).toBe(`release-sha256-${archiveDigest}`);
  });

  it("fails closed when a complete-set member is unavailable", async () => {
    const { entries } = await releaseFixture();
    entries.delete("dist/nourd-nkf-adopt.mjs");
    expect(() => createUstar(entries, fixtureMemberEntries())).toThrow(
      /Required release artifact is unavailable: dist\/nourd-nkf-adopt\.mjs/,
    );
  });

  it("fails before manifest trust on an incorrect independent archive pin", async () => {
    const { archive } = await releaseFixture();
    expect(() => verifyReleaseArchive(archive, "0".repeat(64))).toThrow(
      /independent consumer pin/,
    );
  });

  it("rejects unsafe or noncanonical USTAR bytes", async () => {
    const { archive } = await releaseFixture();
    const mutations: Array<(bytes: Buffer) => Buffer> = [
      (bytes) => {
        bytes[0] = 0x2f;
        return bytes;
      },
      (bytes) => {
        bytes[100] = 0x37;
        return bytes;
      },
      (bytes) => {
        bytes[108] = 0x31;
        return bytes;
      },
      (bytes) => {
        bytes[136] = 0x31;
        return bytes;
      },
      (bytes) => {
        bytes[156] = 0x32;
        return bytes;
      },
      (bytes) => {
        bytes[157] = 0x78;
        return bytes;
      },
      (bytes) => {
        bytes[257] = 0x78;
        return bytes;
      },
      (bytes) => {
        bytes[263] = 0x31;
        return bytes;
      },
      (bytes) => {
        bytes[265] = 0x78;
        return bytes;
      },
      (bytes) => {
        bytes[329] = 0x31;
        return bytes;
      },
      (bytes) => {
        bytes[345] = 0x78;
        return bytes;
      },
      (bytes) => {
        bytes[500] = 0x78;
        return bytes;
      },
      (bytes) => {
        bytes[148] = 0x37;
        return bytes;
      },
      (bytes) => Buffer.concat([bytes, Buffer.alloc(512)]),
      (bytes) => bytes.subarray(0, bytes.length - 512),
    ];
    expect(mutations).toHaveLength(15);
    for (const mutate of mutations) {
      const corrupted = mutate(Buffer.from(archive));
      expect(() => inspectUstar(corrupted)).toThrow();
    }
  });

  it("rejects content-padding and manifest-canonicalization changes", async () => {
    const { archive, entries } = await releaseFixture();
    const corruptedPadding = Buffer.from(archive);
    const firstSize = entries.get(releaseSet.members[0]!.path)!.length;
    corruptedPadding[512 + firstSize] = 1;
    expect(() => inspectUstar(corruptedPadding)).toThrow(/content padding/);

    const noncanonical = new Map(entries);
    const manifest = parseStrictJson(noncanonical.get("release-manifest.json")!);
    noncanonical.set(
      "release-manifest.json",
      Buffer.from(JSON.stringify(manifest), "utf8"),
    );
    const noncanonicalArchive = createUstar(noncanonical, fixtureMemberEntries());
    expect(() =>
      verifyReleaseArchive(noncanonicalArchive, sha256(noncanonicalArchive)),
    ).toThrow(/canonical contract order and format/);

    const rebound = new Map(entries);
    const reboundManifest = parseStrictJson(rebound.get("release-manifest.json")!);
    reboundManifest.version_delta.digest.value = "0".repeat(64);
    rebound.set("release-manifest.json", serializeReleaseManifest(reboundManifest));
    const reboundArchive = createUstar(rebound, fixtureMemberEntries());
    expect(() => verifyReleaseArchive(reboundArchive, sha256(reboundArchive))).toThrow();
  });
});
