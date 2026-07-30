import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
const {
  RELEASE_ENTRIES,
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

async function releaseFixture() {
  const entries = new Map<string, Buffer>();
  for (const entry of RELEASE_ENTRIES) {
    if (entry.path === "release-manifest.json") continue;
    entries.set(entry.path, Buffer.from(`fixture:${entry.path}\n`, "utf8"));
  }
  const schema = await readFile(
    path.join(
      repositoryRoot,
      "contracts/nkf/0.1/schemas/release-manifest.schema.json",
    ),
  );
  entries.set(
    "contracts/nkf/0.1/schemas/release-manifest.schema.json",
    schema,
  );
  const manifest = constructReleaseManifest({
    releaseCommit: "a".repeat(40),
    checkerConfirmation: {
      decision: "ADR-0047",
      path: "knowledge/decisions/0047-confirm-release-bound-checker-realization.md",
      bytes: Buffer.from("# ADR 0047\n", "utf8"),
      checkerSourceCommit: "b".repeat(40),
    },
    entries,
  });
  validateReleaseManifest(manifest, schema);
  entries.set("release-manifest.json", serializeReleaseManifest(manifest));
  const archive = createUstar(entries);
  return { archive, entries, manifest };
}

describe("NKF release tooling", () => {
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
    const firstSize = entries.get(RELEASE_ENTRIES[0]!.path)!.length;
    corruptedPadding[512 + firstSize] = 1;
    expect(() => inspectUstar(corruptedPadding)).toThrow(/content padding/);

    const noncanonical = new Map(entries);
    const manifest = parseStrictJson(noncanonical.get("release-manifest.json")!);
    noncanonical.set(
      "release-manifest.json",
      Buffer.from(JSON.stringify(manifest), "utf8"),
    );
    const noncanonicalArchive = createUstar(noncanonical);
    expect(() =>
      verifyReleaseArchive(noncanonicalArchive, sha256(noncanonicalArchive)),
    ).toThrow(/canonical contract order and format/);

    const mismatchedDecision = new Map(entries);
    const mismatchedManifest = parseStrictJson(
      mismatchedDecision.get("release-manifest.json")!,
    );
    mismatchedManifest.source.checker_confirmation.decision = "ADR-0048";
    mismatchedDecision.set(
      "release-manifest.json",
      serializeReleaseManifest(mismatchedManifest),
    );
    const mismatchedArchive = createUstar(mismatchedDecision);
    expect(() =>
      verifyReleaseArchive(mismatchedArchive, sha256(mismatchedArchive)),
    ).toThrow(/Decision ID and path prefix/);
  });
});
