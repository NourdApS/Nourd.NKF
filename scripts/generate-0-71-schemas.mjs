// Generates the seven NKF 0.71 JSON Schemas from the accepted 0.7 base
// schemas by applying exactly the 0.7-to-0.71 authority delta: coordinate
// rebinding plus the mechanically-concluded confirmation claim, its
// transition binding, and the conclusion-carry provenance transition. The
// generator derives structure from the accepted authority pair; it supplies
// no meaning of its own.
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
  nkf_version: "0.71",
  markdown_path: "knowledge/specifications/nkf-0.71.md",
  markdown_digest: { algorithm: "sha-256", value: await sha256("knowledge/specifications/nkf-0.71.md") },
  executable_path: "contracts/nkf/0.71/nkf.yaml",
  executable_digest: { algorithm: "sha-256", value: await sha256("contracts/nkf/0.71/nkf.yaml") },
});

const baseRoot = path.join(root, "contracts/nkf/0.7/schemas");
const schemaRoot = path.join(root, "contracts/nkf/0.71/schemas");
const object = (required, properties, extra = {}) => ({
  type: "object",
  additionalProperties: false,
  required,
  properties,
  ...extra,
});

// Delimiter-terminated pairs replace by exact substring. The freshness-policy
// identity has no trailing delimiter and the 0.71 target contains the 0.7
// source as a prefix, so it is replaced only when NOT followed by another
// digit — the anchored form is required for idempotence.
const COORDINATE_REPLACEMENTS = [
  ["urn:nkf:0.7:schema:", "urn:nkf:0.71:schema:"],
  ["knowledge/specifications/nkf-0.7.md", "knowledge/specifications/nkf-0.71.md"],
  ["contracts/nkf/0.7/nkf.yaml", "contracts/nkf/0.71/nkf.yaml"],
  ["contracts/nkf/0.7/freshness-policy.yaml", "contracts/nkf/0.71/freshness-policy.yaml"],
  ["contracts/nkf/0.7/version-delta.yaml", "contracts/nkf/0.71/version-delta.yaml"],
  ["contracts/nkf/0.7/schemas/", "contracts/nkf/0.71/schemas/"],
];
const POLICY_IDENTITY = /nkf\.freshness-policy\.0\.7(?![0-9])/gu;

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
    result = result.replace(POLICY_IDENTITY, "nkf.freshness-policy.0.71");
    if (result === "0.7" && keyPath.at(-2) === "nkf_version") result = "0.71";
    return result;
  }
  return value;
}

async function readBase(name) {
  const schema = JSON.parse(await readFile(path.join(baseRoot, name), "utf8"));
  const rebound = rebind(schema);
  rebound["x-nkf-source"] = source;
  if (rebound.title) rebound.title = rebound.title.replace(/NKF 0\.7(?![0-9])/gu, "NKF 0.71");
  return rebound;
}

const transitionStates = { enum: ["active", "deferred", "completed", "cancelled"] };

async function graphBaselineSchema() {
  const schema = await readBase("graph-baseline.schema.json");
  const inlineDigest = structuredClone(schema.properties.graph_revision);
  const confirmation = schema.properties.confirmation;
  confirmation.properties.claim = {
    enum: ["semantically-reviewed-whole-root", "semantically-reviewed-delta", "mechanically-concluded"],
  };
  confirmation.properties.transition = object(
    ["task", "from_state", "to_state", "predecessor_graph_revision"],
    {
      task: { type: "string", minLength: 1 },
      from_state: structuredClone(transitionStates),
      to_state: structuredClone(transitionStates),
      predecessor_graph_revision: structuredClone(inlineDigest),
    },
  );
  confirmation.allOf.push({
    if: { properties: { claim: { const: "mechanically-concluded" } }, required: ["claim"] },
    // ajv strictRequired demands the required property be defined in the
    // same subschema, mirroring the delta-claim entry's inline pattern.
    then: {
      properties: { transition: structuredClone(confirmation.properties.transition) },
      required: ["transition"],
    },
    else: { not: { required: ["transition"] } },
  });
  // Conclusion-carried judgments additionally bind the exact transition.
  const carriedBranches = [
    schema.properties.applicability_coverage.items.properties.provenance,
    schema.properties.decision_classifications.items.properties.provenance,
  ];
  for (const provenance of carriedBranches) {
    const carried = provenance.oneOf.find((branch) => branch.required?.includes("carried"));
    carried.properties.transition = object(["task", "from_state", "to_state"], {
      task: { type: "string", minLength: 1 },
      from_state: structuredClone(transitionStates),
      to_state: structuredClone(transitionStates),
    });
  }
  return schema;
}

const generators = {
  "bundle.schema.json": (name) => readBase(name),
  "record.schema.json": (name) => readBase(name),
  "graph-baseline.schema.json": () => graphBaselineSchema(),
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
