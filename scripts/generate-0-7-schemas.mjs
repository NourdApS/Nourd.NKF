// Generates the seven NKF 0.7 JSON Schemas from the accepted 0.6 base
// schemas by applying exactly the 0.6-to-0.7 authority delta: coordinate
// rebinding plus the digest-bound baseline, version-delta, promotion
// reconciliation, identity-succession, operational-dependency, and
// provenance-attachment additions. The generator derives structure from the
// accepted authority pair; it supplies no meaning of its own.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = Object.freeze({
  nkf_version: "0.7",
  markdown_path: "knowledge/specifications/nkf-0.7.md",
  markdown_digest: { algorithm: "sha-256", value: "MARKDOWN_DIGEST_PLACEHOLDER" },
  executable_path: "contracts/nkf/0.7/nkf.yaml",
  executable_digest: { algorithm: "sha-256", value: "EXECUTABLE_DIGEST_PLACEHOLDER" },
});

const baseRoot = path.join(root, "contracts/nkf/0.6/schemas");
const schemaRoot = path.join(root, "contracts/nkf/0.7/schemas");
const ref = (name) => ({ $ref: `#/$defs/${name}` });
const digestRef = ref("digest");
const object = (required, properties, extra = {}) => ({
  type: "object",
  additionalProperties: false,
  required,
  properties,
  ...extra,
});

const COORDINATE_REPLACEMENTS = [
  ["urn:nkf:0.6:schema:", "urn:nkf:0.7:schema:"],
  ["nkf.freshness-policy.0.6", "nkf.freshness-policy.0.7"],
  ["knowledge/specifications/nkf-0.6-revision-3.md", "knowledge/specifications/nkf-0.7.md"],
  ["contracts/nkf/0.6/revision-3/nkf.yaml", "contracts/nkf/0.7/nkf.yaml"],
  ["contracts/nkf/0.6/freshness-policy.yaml", "contracts/nkf/0.7/freshness-policy.yaml"],
  ["contracts/nkf/0.6/schemas/", "contracts/nkf/0.7/schemas/"],
];

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
    if (result === "0.6" && keyPath.at(-2) === "nkf_version") result = "0.7";
    return result;
  }
  return value;
}

async function readBase(name) {
  const schema = JSON.parse(await readFile(path.join(baseRoot, name), "utf8"));
  const rebound = rebind(schema);
  rebound["x-nkf-source"] = source;
  if (rebound.title) rebound.title = rebound.title.replace("NKF 0.6", "NKF 0.7");
  return rebound;
}

const identitySuccession = object(["predecessor_id", "graph_revision", "recorded_by"], {
  predecessor_id: { type: "string", minLength: 1 },
  graph_revision: digestRef,
  recorded_by: { type: "string", minLength: 1 },
});
const operationalDependency = (bindingKey, bindingSchema) => ({
  type: "array",
  minItems: 1,
  items: object(["kind", bindingKey], {
    kind: { enum: ["release-version", "recommendation", "installed-pin"] },
    [bindingKey]: bindingSchema,
  }),
});
const judgmentProvenance = {
  oneOf: [
    object(["performed"], { performed: { const: true } }),
    object(["carried"], {
      carried: object(["performed_in_graph_revision", "performing_reviewer"], {
        performed_in_graph_revision: digestRef,
        performing_reviewer: object(["kind", "id"], {
          kind: { enum: ["human", "agent"] },
          id: { type: "string", minLength: 1 },
        }),
      }),
    }),
  ],
};

async function bundleSchema() {
  const schema = await readBase("bundle.schema.json");
  const nonRecord = schema.$defs.nonRecord;
  nonRecord.properties.kind.enum = [...nonRecord.properties.kind.enum.filter((k) => k !== "other"), "provenance-attachment", "other"];
  nonRecord.properties.selection = { const: "recursive-regular-files" };
  nonRecord.properties.digest = digestRef;
  const notDocument = nonRecord.allOf.find((entry) => entry

?.if?.properties?.kind?.enum?.includes?.("generated"));
  notDocument.if.properties.kind.enum = ["generated", "redirect", "provenance-attachment"];
  nonRecord.allOf.push({
    if: { properties: { kind: { not: { const: "provenance-attachment" } } }, required: ["kind"] },
    then: { not: { anyOf: [{ required: ["selection"] }, { required: ["digest"] }] } },
  });
  const document = schema.$defs.document;
  document.properties.identity_succession = identitySuccession;
  document.properties.operational_dependencies = operationalDependency("source_heading", ref("headingReference"));
  return schema;
}

async function recordSchema() {
  const schema = await readBase("record.schema.json");
  schema.$defs.identitySuccession = identitySuccession;
  schema.properties.identity_succession = ref("identitySuccession");
  schema.properties.operational_dependencies = operationalDependency("source_section", { type: "string", minLength: 1 });
  return schema;
}

async function graphBaselineSchema() {
  const schema = await readBase("graph-baseline.schema.json");
  const inlineDigest = structuredClone(schema.properties.graph_revision);
  const inlineNode = structuredClone(schema.properties.node_revisions.items.properties.node);
  const inlineProvenance = structuredClone(judgmentProvenance);
  inlineProvenance.oneOf[1].properties.carried.properties.performed_in_graph_revision = structuredClone(inlineDigest);
  schema.required.splice(schema.required.indexOf("node_revisions"), 0, "version_delta");
  schema.required.splice(schema.required.indexOf("confirmation"), 0, "promotion_reconciliation");
  schema.properties.version_delta = object(["contract", "digest"], {
    contract: { const: "nkf.version-delta" },
    digest: structuredClone(inlineDigest),
  });
  schema.properties.promotion_reconciliation = {
    type: "array",
    items: object(["node", "coordinate", "written_at_graph_revision", "state"], {
      node: structuredClone(inlineNode),
      coordinate: { enum: ["release-version", "recommendation", "installed-pin"] },
      written_at_graph_revision: structuredClone(inlineDigest),
      state: { enum: ["pending", "resolved"] },
    }),
  };
  const applicability = schema.properties.applicability_coverage.items;
  applicability.required.push("revision", "basis_digest", "provenance");
  applicability.properties.revision = structuredClone(inlineDigest);
  applicability.properties.basis_digest = structuredClone(inlineDigest);
  applicability.properties.provenance = structuredClone(inlineProvenance);
  const classificationTarget = schema.properties.decision_classifications.items;
  classificationTarget.required.push("decision_digest", "basis_digest", "provenance");
  classificationTarget.properties.decision_digest = structuredClone(inlineDigest);
  classificationTarget.properties.basis_digest = structuredClone(inlineDigest);
  classificationTarget.properties.provenance = structuredClone(inlineProvenance);
  const confirmation = schema.properties.confirmation;
  confirmation.properties.claim = { enum: ["semantically-reviewed-whole-root", "semantically-reviewed-delta"] };
  const nodeSet = { type: "array", items: structuredClone(inlineNode) };
  confirmation.properties.computed_closure = nodeSet;
  confirmation.properties.performed_set = structuredClone(nodeSet);
  confirmation.allOf = [
    {
      if: { properties: { claim: { const: "semantically-reviewed-delta" } }, required: ["claim"] },
      then: { required: ["computed_closure", "performed_set"] },
      else: { not: { anyOf: [{ required: ["computed_closure"] }, { required: ["performed_set"] }] } },
    },
  ];
  return schema;
}

async function freshnessReceiptSchema() {
  return readBase("freshness-receipt.schema.json");
}

async function freshnessPolicySchema() {
  return readBase("freshness-policy.schema.json");
}

async function validationResultSchema() {
  return readBase("validation-result.schema.json");
}

async function releaseManifestSchema() {
  const schema = await readBase("release-manifest.schema.json");
  schema.required.splice(schema.required.indexOf("schemas"), 0, "version_delta");
  schema.properties.version_delta = ref("versionDelta");
  schema.$defs.versionDelta = object(["contract", "path", "digest"], {
    contract: { const: "nkf.version-delta" },
    path: { const: "contracts/nkf/0.7/version-delta.yaml" },
    digest: digestRef,
  });
  return schema;
}

const generators = {
  "bundle.schema.json": bundleSchema,
  "record.schema.json": recordSchema,
  "graph-baseline.schema.json": graphBaselineSchema,
  "freshness-receipt.schema.json": freshnessReceiptSchema,
  "freshness-policy.schema.json": freshnessPolicySchema,
  "validation-result.schema.json": validationResultSchema,
  "release-manifest.schema.json": releaseManifestSchema,
};

await mkdir(schemaRoot, { recursive: true });
for (const [name, generate] of Object.entries(generators)) {
  const schema = await generate();
  await writeFile(path.join(schemaRoot, name), `${JSON.stringify(schema, null, 2)}\n`);
  console.log(`generated ${name}`);
}
