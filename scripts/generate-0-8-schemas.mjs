// Generates the seven NKF 0.8 JSON Schemas from the accepted 0.71 base
// schemas by applying exactly the 0.71-to-0.8 authority delta.
//
// That delta is coordinate rebinding alone. NKF 0.8 adds one registry rule,
// `guidance.self-description.version-mismatch`, and the Schemas do not
// enumerate rule identifiers, so no schema shape changes. Stating that here
// is the point of a per-version generator: the file records which delta this
// version's Schemas actually carry, rather than pretending every version's
// derivation is the same operation.
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
  nkf_version: "0.8",
  markdown_path: "knowledge/specifications/nkf-0.8.md",
  markdown_digest: { algorithm: "sha-256", value: await sha256("knowledge/specifications/nkf-0.8.md") },
  executable_path: "contracts/nkf/0.8/nkf.yaml",
  executable_digest: { algorithm: "sha-256", value: await sha256("contracts/nkf/0.8/nkf.yaml") },
});

const baseRoot = path.join(root, "contracts/nkf/0.71/schemas");
const schemaRoot = path.join(root, "contracts/nkf/0.8/schemas");

// Delimiter-terminated pairs replace by exact substring. The freshness-policy
// identity has no trailing delimiter, so it is anchored separately; unlike the
// 0.7-to-0.71 step the source coordinate is not a prefix of the target, but
// the anchored form is kept because it is what makes the replacement
// idempotent rather than because of that accident.
const COORDINATE_REPLACEMENTS = [
  ["urn:nkf:0.71:schema:", "urn:nkf:0.8:schema:"],
  ["knowledge/specifications/nkf-0.71.md", "knowledge/specifications/nkf-0.8.md"],
  ["contracts/nkf/0.71/nkf.yaml", "contracts/nkf/0.8/nkf.yaml"],
  ["contracts/nkf/0.71/freshness-policy.yaml", "contracts/nkf/0.8/freshness-policy.yaml"],
  ["contracts/nkf/0.71/version-delta.yaml", "contracts/nkf/0.8/version-delta.yaml"],
  ["contracts/nkf/0.71/schemas/", "contracts/nkf/0.8/schemas/"],
];
const POLICY_IDENTITY = /nkf\.freshness-policy\.0\.71(?![0-9])/gu;

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
    result = result.replace(POLICY_IDENTITY, "nkf.freshness-policy.0.8");
    if (result === "0.71" && keyPath.at(-2) === "nkf_version") result = "0.8";
    return result;
  }
  return value;
}

async function readBase(name) {
  const schema = JSON.parse(await readFile(path.join(baseRoot, name), "utf8"));
  const rebound = rebind(schema);
  rebound["x-nkf-source"] = source;
  if (rebound.title) rebound.title = rebound.title.replace(/NKF 0\.71(?![0-9])/gu, "NKF 0.8");
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
};

await mkdir(schemaRoot, { recursive: true });
for (const [name, generate] of Object.entries(generators)) {
  const schema = await generate(name);
  await writeFile(path.join(schemaRoot, name), `${JSON.stringify(schema, null, 2)}\n`);
  console.log(`generated ${name}`);
}
