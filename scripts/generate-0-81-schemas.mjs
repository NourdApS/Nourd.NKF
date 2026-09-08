// Generates the eight NKF 0.81 JSON Schemas: seven rebound from the accepted
// 0.8 base schemas by the 0.8-to-0.81 coordinate delta, plus the new
// recommended-release schema derived from the 0.81 executable companion.
//
// The 0.8-to-0.81 rule delta adds one registry rule,
// `freshness.claim.computed-closure-not-reproduced`, which the Schemas do not
// enumerate; the seven rebound Schemas therefore change only their
// coordinates. The eighth Schema is new: the recommended-release catalog
// becomes an accepted contract in 0.81 and its closed shape is stated here.
//
// The generator derives structure from the accepted authority pair; it
// supplies no meaning of its own.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sha256 = async (relative) =>
  createHash("sha256").update(await readFile(path.join(root, relative))).digest("hex");
// The embedded digests bind the exact authority bytes present at generation
// time; regenerating after any authority edit is part of the freeze order.
const source = Object.freeze({
  nkf_version: "0.81",
  markdown_path: "knowledge/specifications/nkf-0.81.md",
  markdown_digest: { algorithm: "sha-256", value: await sha256("knowledge/specifications/nkf-0.81.md") },
  executable_path: "contracts/nkf/0.81/nkf.yaml",
  executable_digest: { algorithm: "sha-256", value: await sha256("contracts/nkf/0.81/nkf.yaml") },
});

const baseRoot = path.join(root, "contracts/nkf/0.8/schemas");
const schemaRoot = path.join(root, "contracts/nkf/0.81/schemas");

// Delimiter-terminated pairs replace by exact substring. The freshness-policy
// identity has no trailing delimiter, so it is anchored separately; unlike the
// 0.7-to-0.8 step the source coordinate is not a prefix of the target, but
// the anchored form is kept because it is what makes the replacement
// idempotent rather than because of that accident.
const COORDINATE_REPLACEMENTS = [
  ["urn:nkf:0.8:schema:", "urn:nkf:0.81:schema:"],
  ["knowledge/specifications/nkf-0.8.md", "knowledge/specifications/nkf-0.81.md"],
  ["contracts/nkf/0.8/nkf.yaml", "contracts/nkf/0.81/nkf.yaml"],
  ["contracts/nkf/0.8/freshness-policy.yaml", "contracts/nkf/0.81/freshness-policy.yaml"],
  ["contracts/nkf/0.8/version-delta.yaml", "contracts/nkf/0.81/version-delta.yaml"],
  ["contracts/nkf/0.8/schemas/", "contracts/nkf/0.81/schemas/"],
];
const POLICY_IDENTITY = /nkf\.freshness-policy\.0\.8(?![0-9])/gu;

function rebind(value, keyPath = []) {
  if (Array.isArray(value)) return value.map((item) => rebind(item, keyPath));
  if (value !== null && typeof value === "object") {
    const out = {};
    for (const [key, entry] of Object.entries(value)) out[key] = rebind(entry, [...keyPath, key]);
    return out;
  }
  if (typeof value === "string") {
    let result = value;
    for (const [from, to] of COORDINATE_REPLACEMENTS) result = result.split(from).join(to);
    result = result.replace(POLICY_IDENTITY, "nkf.freshness-policy.0.81");
    if (result === "0.8" && keyPath.at(-2) === "nkf_version") result = "0.81";
    return result;
  }
  return value;
}

async function readBase(name) {
  const schema = JSON.parse(await readFile(path.join(baseRoot, name), "utf8"));
  const rebound = rebind(schema);
  rebound["x-nkf-source"] = source;
  if (rebound.title) rebound.title = rebound.title.replace(/NKF 0\.8(?![0-9])/gu, "NKF 0.81");
  return rebound;
}

const generators = {
  "bundle.schema.json": (name) => readBase(name),
  "record.schema.json": (name) => readBase(name),
  "graph-baseline.schema.json": (name) => readBase(name),
  "freshness-receipt.schema.json": (name) => readBase(name),
  "freshness-policy.schema.json": (name) => readBase(name),
  "validation-result.schema.json": (name) => readBase(name),
  "release-manifest.schema.json": (name) => readBase(name),
  // New in 0.81: the recommended-release catalog becomes an accepted contract.
  // Derived from release_distribution.recommended_release in the 0.81
  // executable companion; the channel vocabulary is closed there.
  "recommended-release.schema.json": () => recommendedReleaseSchema(),
};

const SHA256 = { type: "string", pattern: "^[0-9a-f]{64}$" };
const COMMIT = { type: "string", pattern: "^[0-9a-f]{40}$" };
function recommendedReleaseSchema() {
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "urn:nkf:0.81:schema:recommended-release",
    title: "NKF 0.81 Recommended Release Catalog",
    description: "The closed nkf.recommended-release catalog published at release/recommended.json on the governing repository's default branch. It is the selection channel, not a trust anchor; the archive digest and installed pin remain the trust anchors.",
    "x-nkf-source": source,
    type: "object",
    additionalProperties: false,
    required: ["contract", "nkf_version", "state", "channel", "compatibility", "archive", "source_commit", "checker_sha256", "authority", "adopter_sha256", "release", "supported_root_profiles"],
    properties: {
      contract: { const: "nkf.recommended-release" },
      nkf_version: { type: "string", pattern: "^0\\.[0-9]+$" },
      state: { enum: ["recommended", "candidate"] },
      channel: { enum: ["internal-exact-candidate", "internal-private-github-prerelease", "public-github-prerelease", "public-github-release"] },
      compatibility: {
        type: "array", minItems: 1,
        items: {
          type: "object", additionalProperties: false,
          required: ["from_nkf_version", "classification", "migration_required", "summary"],
          properties: {
            from_nkf_version: { type: "string", pattern: "^0\\.[0-9]+$" },
            classification: { enum: ["non-breaking", "breaking"] },
            migration_required: { type: "boolean" },
            summary: { type: "string", minLength: 1 },
          },
        },
      },
      archive: {
        type: "object", additionalProperties: false,
        required: ["sha256", "asset_name", "tag", "size", "url"],
        properties: {
          sha256: SHA256,
          asset_name: { type: "string", pattern: "^nourd-nkf-sha256-[0-9a-f]{64}\\.tar$" },
          tag: { type: "string", pattern: "^release-sha256-[0-9a-f]{64}$" },
          size: { type: "integer", minimum: 1 },
          url: { type: ["string", "null"], pattern: "^https://github\\.com/[A-Za-z0-9._-]+/[A-Za-z0-9._-]+/releases/download/release-sha256-[0-9a-f]{64}/nourd-nkf-sha256-[0-9a-f]{64}\\.tar$" },
        },
      },
      source_commit: COMMIT,
      checker_sha256: SHA256,
      authority: {
        type: "object", additionalProperties: false,
        required: ["markdown_sha256", "executable_sha256"],
        properties: { markdown_sha256: SHA256, executable_sha256: SHA256 },
      },
      adopter_sha256: SHA256,
      release: {
        type: "object", additionalProperties: false,
        required: ["url", "published_at", "prerelease", "visibility"],
        properties: {
          url: { type: ["string", "null"], pattern: "^https://github\\.com/[A-Za-z0-9._-]+/[A-Za-z0-9._-]+/releases/tag/release-sha256-[0-9a-f]{64}$" },
          published_at: { type: ["string", "null"], pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$" },
          prerelease: { type: "boolean" },
          visibility: { enum: ["unpublished", "private", "public"] },
        },
      },
      supported_root_profiles: { const: ["nkf.profile.product", "nkf.profile.technology"] },
    },
    allOf: [
      { if: { properties: { channel: { const: "internal-exact-candidate" } } }, then: { properties: { release: { properties: { visibility: { const: "unpublished" }, prerelease: { const: true } } }, archive: { properties: { url: { type: "null" } } } } } },
      { if: { properties: { channel: { const: "internal-private-github-prerelease" } } }, then: { properties: { release: { properties: { visibility: { const: "private" }, prerelease: { const: true } } }, nkf_version: { enum: ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.71", "0.8"] } } } },
      { if: { properties: { channel: { const: "public-github-prerelease" } } }, then: { properties: { release: { properties: { visibility: { const: "public" }, prerelease: { const: true } } } } } },
      { if: { properties: { channel: { const: "public-github-release" } } }, then: { properties: { release: { properties: { visibility: { const: "public" }, prerelease: { const: false } } } } } },
    ],
  };
}

await mkdir(schemaRoot, { recursive: true });
for (const [name, generate] of Object.entries(generators)) {
  const schema = await generate(name);
  await writeFile(path.join(schemaRoot, name), `${JSON.stringify(schema, null, 2)}\n`);
  console.log(`generated ${name}`);
}
