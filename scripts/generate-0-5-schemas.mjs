import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = Object.freeze({
  nkf_version: "0.5",
  markdown_path: "knowledge/specifications/nkf-0.5-revision-2.md",
  markdown_digest: {
    algorithm: "sha-256",
    value: "0f3b7c085eba4fa92655e20916fccb7013169b5560dd50c241fb4726df31287c",
  },
  executable_path: "contracts/nkf/0.5/revision-2/nkf.yaml",
  executable_digest: {
    algorithm: "sha-256",
    value: "2743102a4bddf9a26253fba3982f00bf9c688c819891815221e3ea4ee67c5290",
  },
});

const schemaRoot = path.join(root, "contracts/nkf/0.5/schemas");
const baseRoot = path.join(root, "contracts/nkf/0.4/schemas");
const clone = (value) => structuredClone(value);
const ref = (name) => ({ $ref: `#/$defs/${name}` });
const object = (required, properties, extra = {}) => ({
  type: "object",
  additionalProperties: false,
  required,
  properties,
  ...extra,
});
const nullable = (schema) => ({ oneOf: [schema, { type: "null" }] });
const identifier = { type: "string", minLength: 1 };
const sha256 = { type: "string", pattern: "^[0-9a-f]{64}$" };
const digest = object(["algorithm", "value"], {
  algorithm: { const: "sha-256" },
  value: sha256,
});
const timestamp = {
  type: "string",
  format: "date-time",
  pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:(?:[0-5][0-9]|60)\\.[0-9]{3}Z$",
};
const nodeReference = {
  oneOf: [
    object(["kind", "id"], { kind: { const: "record" }, id: identifier }),
    object(["kind", "id"], { kind: { const: "document" }, id: identifier }),
    object(["kind", "record", "entity"], {
      kind: { const: "entity" },
      record: identifier,
      entity: identifier,
    }),
  ],
};
const headingReference = object(["heading_path", "occurrence"], {
  heading_path: { type: "array", minItems: 1, items: { type: "string", minLength: 1 } },
  occurrence: { type: "integer", minimum: 1 },
});
const sourceBinding = {
  oneOf: [
    object(["kind", "node", "section"], {
      kind: { const: "section" }, node: nodeReference, section: identifier,
    }),
    object(["kind", "node", "heading"], {
      kind: { const: "heading" }, node: nodeReference, heading: headingReference,
    }),
  ],
};
const freshnessDeclaration = object([], {
  expires_at: timestamp,
  invalidation_triggers: {
    type: "array",
    minItems: 1,
    items: object(["id", "kind", "subject", "source_binding"], {
      id: identifier,
      kind: { enum: ["source-changed", "artifact-changed", "external-observation", "authority-observation", "manual"] },
      subject: identifier,
      source_binding: sourceBinding,
    }),
  },
}, { minProperties: 1 });
const externalDependency = object(
  ["id", "authority", "dependent", "relationship", "source_binding", "source", "revision", "observability"],
  {
    id: identifier,
    authority: identifier,
    dependent: nodeReference,
    relationship: { const: "depends-on" },
    source_binding: sourceBinding,
    source: object([], { repository: identifier, bundle: identifier }, { minProperties: 1 }),
    revision: object(["exact"], { exact: identifier }),
    observability: object(["observation_id"], { observation_id: identifier }),
  },
);
const authorityInput = object(
  ["id", "authority", "subject", "source_binding", "expected_revision", "observation_id"],
  {
    id: identifier,
    authority: identifier,
    subject: nodeReference,
    source_binding: sourceBinding,
    expected_revision: identifier,
    observation_id: identifier,
  },
);
const governance = object(["lifecycle", "status", "authority"], {
  lifecycle: { enum: ["living", "immutable"] },
  status: { enum: ["draft", "accepted", "superseded", "retired"] },
  authority: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
  accepted_at: { type: "string", format: "date" },
});
const legacyStateFields = {
  record_lifecycle: { enum: ["living", "immutable"] },
  record_status: { enum: ["draft", "accepted", "superseded", "retired"] },
  decision_authority: identifier,
  task: identifier,
  design_disposition: { enum: ["active", "adopted", "rejected", "superseded", "withdrawn"] },
  design_decisions: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
  superseded_by: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
  withdrawal_source: object(["kind", "id"], { kind: { enum: ["task", "record"] }, id: identifier }),
  proposal_authority_effect: identifier,
  proposal_evidence: identifier,
  implementation_evidence: identifier,
  confirmation_status: { enum: ["unconfirmed", "partially-confirmed", "confirmed"] },
  confirmation_decisions: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
  unconfirmed_scope: identifier,
  task_id: identifier,
  task_status: { enum: ["active", "deferred", "completed", "cancelled"] },
  owner: identifier,
  related_tasks: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
};
const documentState = object(["vocabulary", "value"], {
  vocabulary: { const: "task-status" },
  value: { enum: ["active", "deferred", "completed", "cancelled"] },
  basis: {
    type: "array",
    minItems: 1,
    uniqueItems: true,
    items: {
      oneOf: [
        object(["kind", "id"], { kind: { const: "task-document" }, id: identifier }),
        object(["kind", "id"], { kind: { const: "record" }, id: identifier }),
      ],
    },
  },
});
const legacyLock = object(
  ["predecessor_version", "source_digest", "predecessor_state", "initial_declaration_state"],
  {
    predecessor_version: { enum: ["0.1", "0.2", "0.3", "0.4"] },
    source_digest: digest,
    predecessor_state: object([], legacyStateFields, {
      minProperties: 1,
    }),
    initial_declaration_state: object([], {
      governance,
      task: identifier,
      design_disposition: legacyStateFields.design_disposition,
      design_decisions: legacyStateFields.design_decisions,
      superseded_by: legacyStateFields.superseded_by,
      withdrawal_source: legacyStateFields.withdrawal_source,
      proposal_authority_effect: identifier,
      proposal_evidence: identifier,
      implementation_evidence: identifier,
      confirmation_status: legacyStateFields.confirmation_status,
      confirmation_decisions: legacyStateFields.confirmation_decisions,
      unconfirmed_scope: identifier,
      document_state: documentState,
      owner: identifier,
      decision_authority: identifier,
      related_tasks: legacyStateFields.related_tasks,
    }, { minProperties: 1 }),
    authority_mapping: object(["source_value", "authority_ids", "approved_by"], {
      source_value: identifier,
      authority_ids: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
      approved_by: { const: "repository-owner" },
    }),
    source_transformation: object(
      ["kind", "predecessor_source_digest", "appended_gate_digest", "reviewer", "reviewed_at"],
      {
        kind: { const: "retrospective-task-gate" },
        predecessor_source_digest: digest,
        appended_gate_digest: digest,
        reviewer: object(["kind", "id"], { kind: { enum: ["human", "agent"] }, id: identifier }),
        reviewed_at: timestamp,
      },
    ),
  },
);

function envelope(id, title, properties, required, defs = {}) {
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: id,
    title,
    "x-nkf-source": source,
    type: "object",
    additionalProperties: false,
    required,
    properties,
    $defs: defs,
  };
}

async function readBase(name) {
  return JSON.parse(await readFile(path.join(baseRoot, name), "utf8"));
}

async function bundleSchema() {
  const schema = await readBase("bundle.schema.json");
  schema.$id = "urn:nkf:0.5:schema:bundle";
  schema.title = "NKF 0.5 bundle";
  schema["x-nkf-source"] = source;
  schema.required.push("knowledge_graph");
  schema.properties.nkf_version = { const: "0.5" };
  schema.properties.knowledge_graph = ref("knowledgeGraph");
  schema.properties.external_dependencies = { type: "array", minItems: 1, items: ref("externalDependency") };
  schema.properties.authority_inputs = { type: "array", minItems: 1, items: ref("authorityInput") };
  schema.$defs.nodeReference = nodeReference;
  schema.$defs.headingReference = headingReference;
  schema.$defs.sourceBinding = sourceBinding;
  schema.$defs.freshnessDeclaration = freshnessDeclaration;
  schema.$defs.documentState = documentState;
  schema.$defs.legacyLock = legacyLock;
  schema.$defs.documentRelationship = object(["type", "target", "source_heading"], {
    type: { enum: ["part-of", "defines", "governs", "applies-to", "depends-on", "extends", "supersedes", "rationale-for", "realizes", "evidences", "references", "flows-to", "transitions-to", "observes"] },
    target: nodeReference,
    source_heading: headingReference,
  });
  schema.$defs.document = object(["id", "stable_path", "digest", "relationships"], {
    id: identifier,
    stable_path: { type: "string", minLength: 1 },
    digest,
    state: documentState,
    relationships: { type: "array", items: ref("documentRelationship") },
    freshness: freshnessDeclaration,
    owner: identifier,
    decision_authority: identifier,
    related_tasks: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
    legacy_lock: legacyLock,
  });
  schema.$defs.nonRecord = object(["path", "kind"], {
    path: { type: "string", minLength: 1 },
    kind: { enum: ["navigation", "task", "evidence", "generated", "redirect", "other"] },
    reason: identifier,
    document: ref("document"),
  }, {
    allOf: [
      { if: { properties: { kind: { const: "other" } }, required: ["kind"] }, then: { properties: { reason: identifier }, required: ["reason"] } },
      { if: { properties: { kind: { enum: ["task", "evidence"] } }, required: ["kind"] }, then: { properties: { document: ref("document") }, required: ["document"] } },
      { if: { properties: { kind: { enum: ["generated", "redirect"] } }, required: ["kind"] }, then: { not: { required: ["document"] } } },
      { if: { properties: { kind: { const: "task" } }, required: ["kind"] }, then: { properties: { document: { allOf: [ref("document"), { type: "object", properties: { state: documentState }, required: ["state"] }] } } } },
      { if: { properties: { kind: { enum: ["evidence", "navigation", "other"] } }, required: ["kind"] }, then: { properties: { document: { allOf: [ref("document"), { type: "object", not: { anyOf: ["state", "owner", "decision_authority", "related_tasks"].map((field) => ({ type: "object", properties: { [field]: {} }, required: [field] })) } }] } } } },
    ],
  });
  schema.$defs.externalDependency = externalDependency;
  schema.$defs.authorityInput = authorityInput;
  schema.$defs.knowledgeGraph = object(["policy", "baseline"], {
    policy: { const: "nkf.freshness-policy.0.5" },
    baseline: { const: ".nourd/knowledge/freshness/baseline.yaml" },
  });
  return schema;
}

async function recordSchema() {
  const schema = await readBase("record.schema.json");
  schema.$id = "urn:nkf:0.5:schema:record";
  schema.title = "NKF 0.5 record";
  schema["x-nkf-source"] = source;
  schema.$defs.source.required.splice(1, 0, "stable_path");
  schema.$defs.source.properties.stable_path = { type: "string", minLength: 1 };
  schema.$defs.legacyLock = legacyLock;
  schema.$defs.freshnessDeclaration = freshnessDeclaration;
  schema.$defs.acceptedBootstrapLock = object(
    ["predecessor_version", "source_digest", "accepting_decision", "predecessor_state", "current_state"],
    {
      predecessor_version: { const: "0.4" },
      source_digest: digest,
      accepting_decision: object(["id", "digest"], { id: identifier, digest }),
      predecessor_state: object(["record_lifecycle", "record_status", "decision_authority", "task"], {
        record_lifecycle: { const: "living" },
        record_status: { const: "draft" },
        decision_authority: identifier,
        task: { const: "NKF-026" },
      }),
      current_state: object(["lifecycle", "status"], {
        lifecycle: { const: "immutable" },
        status: { const: "accepted" },
      }),
    },
  );
  schema.$defs.prepublicationSupersessionLock = object(
    ["source", "accepted_executable", "acceptance_decision", "correction_decision", "current_state", "superseded_by"],
    {
      source: object(["id", "path", "digest"], {
        id: { const: "nkf-0.5-specification" },
        path: { const: "knowledge/specifications/nkf-0.5.md" },
        digest: { const: { algorithm: "sha-256", value: "d93e8da4e3abeb7d047d15351f2003d2d242596790fb7db94be994b7e88499dc" } },
      }),
      accepted_executable: object(["path", "digest"], {
        path: { const: "contracts/nkf/0.5/nkf.yaml" },
        digest: { const: { algorithm: "sha-256", value: "73d9cf683a799729fba6fb64e59aefef0477601827f8f0045aec7d95955d3fd2" } },
      }),
      acceptance_decision: object(["id", "digest"], {
        id: { const: "adr-0116" },
        digest: { const: { algorithm: "sha-256", value: "777ecabcbab3c106f2889661125a923ce0f331a759a4bd2b6b0d18e7ed542ee8" } },
      }),
      correction_decision: object(["id", "digest"], { id: identifier, digest }),
      current_state: object(["lifecycle", "status"], {
        lifecycle: { const: "immutable" },
        status: { const: "superseded" },
      }),
      superseded_by: {
        type: "array",
        prefixItems: [{ const: "nkf-0.5-specification-revision-2" }],
        items: false,
        minItems: 1,
        maxItems: 1,
      },
    },
  );
  Object.assign(schema.properties, {
    task: identifier,
    design_disposition: { enum: ["active", "adopted", "rejected", "superseded", "withdrawn"] },
    design_decisions: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
    superseded_by: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
    withdrawal_source: object(["kind", "id"], { kind: { enum: ["task", "record"] }, id: identifier }),
    proposal_authority_effect: identifier,
    proposal_evidence: identifier,
    implementation_evidence: identifier,
    confirmation_status: { enum: ["unconfirmed", "partially-confirmed", "confirmed"] },
    confirmation_decisions: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
    unconfirmed_scope: identifier,
    freshness: ref("freshnessDeclaration"),
    legacy_lock: ref("legacyLock"),
    accepted_bootstrap_lock: ref("acceptedBootstrapLock"),
    prepublication_supersession_lock: ref("prepublicationSupersessionLock"),
  });
  schema.allOf = [
    {
      if: { properties: { type: { enum: ["design", "decision", "specification", "realization"] } }, required: ["type"] },
      then: { properties: { task: identifier }, required: ["task"] },
    },
    {
      if: { properties: { type: { const: "design" } }, required: ["type"] },
      then: { properties: { design_disposition: schema.properties.design_disposition }, required: ["design_disposition"] },
    },
    {
      if: { properties: { type: { const: "realization" } }, required: ["type"] },
      then: { properties: { confirmation_status: schema.properties.confirmation_status }, required: ["confirmation_status"] },
    },
    {
      if: { properties: { id: { const: "nkf-0.5-specification-revision-2" } }, required: ["id"] },
      then: {
        required: ["accepted_bootstrap_lock"],
        properties: {
          type: { const: "specification" },
          accepted_bootstrap_lock: ref("acceptedBootstrapLock"),
          governance: object(["lifecycle", "status", "authority"], {
            lifecycle: { const: "immutable" },
            status: { const: "accepted" },
            authority: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
            accepted_at: { type: "string", format: "date" },
          }),
        },
      },
    },
    {
      if: { properties: { id: { const: "nkf-0.5-specification" } }, required: ["id"] },
      then: {
        required: ["prepublication_supersession_lock", "superseded_by"],
        properties: {
          type: { const: "specification" },
          prepublication_supersession_lock: ref("prepublicationSupersessionLock"),
          superseded_by: {
            type: "array",
            prefixItems: [{ const: "nkf-0.5-specification-revision-2" }],
            items: false,
            minItems: 1,
            maxItems: 1,
          },
          governance: object(["lifecycle", "status", "authority"], {
            lifecycle: { const: "immutable" },
            status: { const: "superseded" },
            authority: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
            accepted_at: { type: "string", format: "date" },
          }),
        },
      },
    },
  ];
  return schema;
}

const reviewBasis = object(["node", "source"], {
  node: nodeReference,
  source: {
    oneOf: [
      object(["section"], { section: identifier }),
      object(["heading"], { heading: headingReference }),
    ],
  },
});
const nodeRevision = object(["node", "revision"], { node: nodeReference, revision: digest });
const normalizedEdge = object(["source", "relationship", "target", "source_binding"], {
  source: nodeReference,
  relationship: { enum: ["part-of", "defines", "governs", "applies-to", "depends-on", "extends", "supersedes", "rationale-for", "realizes", "evidences", "references", "flows-to", "transitions-to", "observes"] },
  target: nodeReference,
  source_binding: sourceBinding,
});
const reviewObservation = object(["id", "subject", "basis", "finding"], {
  id: identifier, subject: nodeReference, basis: reviewBasis, finding: identifier,
});
const decisionClassification = object(["decision", "purpose", "classification", "basis"], {
  decision: identifier,
  purpose: { enum: ["change-impact", "whole-root-readiness", "consequential-use"] },
  classification: { enum: ["compatible", "extends", "supersedes", "conflicts", "not-applicable"] },
  basis: reviewBasis,
});

function baselineSchema() {
  return envelope(
    "urn:nkf:0.5:schema:graph-baseline",
    "NKF 0.5 graph baseline",
    {
      contract: { const: "nkf.graph-baseline" },
      nkf_version: { const: "0.5" },
      bundle: identifier,
      profile: { enum: ["nkf.profile.product", "nkf.profile.technology"] },
      graph_revision: digest,
      policy: object(["id", "digest"], { id: { const: "nkf.freshness-policy.0.5" }, digest }),
      node_revisions: { type: "array", minItems: 1, items: nodeRevision },
      authored_edges: { type: "array", items: normalizedEdge },
      external_dependencies: { type: "array", items: externalDependency },
      authority_inputs: { type: "array", items: authorityInput },
      relationship_coverage: {
        type: "array", minItems: 1,
        items: object(["relationship", "state", "basis"], {
          relationship: normalizedEdge.properties.relationship,
          state: { enum: ["reviewed", "inapplicable"] },
          basis: reviewBasis,
        }),
      },
      applicability_coverage: {
        type: "array", minItems: 1,
        items: object(["node", "purpose", "state", "role", "basis"], {
          node: nodeReference,
          purpose: { enum: ["change-impact", "whole-root-readiness", "consequential-use"] },
          state: { enum: ["eligible", "inapplicable"] },
          role: { enum: ["governs", "proposes", "realizes", "evidences", "context", "history"] },
          basis: reviewBasis,
        }),
      },
      decision_classifications: { type: "array", items: decisionClassification },
      confirmation: object(["reviewer", "reviewed_at", "claim", "observations", "limitations", "disputed"], {
        reviewer: object(["kind", "id"], { kind: { enum: ["human", "agent"] }, id: identifier }),
        reviewed_at: timestamp,
        claim: { const: "semantically-reviewed-whole-root" },
        observations: { type: "array", minItems: 1, items: reviewObservation },
        limitations: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
        disputed: { type: "boolean" },
      }),
    },
    ["contract", "nkf_version", "bundle", "profile", "graph_revision", "policy", "node_revisions", "authored_edges", "external_dependencies", "authority_inputs", "relationship_coverage", "applicability_coverage", "decision_classifications", "confirmation"],
  );
}

const changedInput = {
  oneOf: [
    object(["kind", "node"], { kind: { const: "node" }, node: nodeReference }),
    ...["governed-artifact", "external-dependency", "authority-input", "external-observation", "authority-observation"].map((kind) =>
      object(["kind", "id"], { kind: { const: kind }, id: identifier })),
    object(["kind", "edge"], { kind: { const: "authored-edge" }, edge: normalizedEdge }),
  ],
};
const observation = object(["id", "kind", "subject", "observed_revision", "observed_at"], {
  id: identifier,
  kind: { enum: ["external", "authority"] },
  subject: identifier,
  observed_revision: identifier,
  observed_at: timestamp,
});
const reasonPath = object(["initial_change", "target", "nodes", "relationships"], {
  initial_change: changedInput,
  target: nodeReference,
  nodes: { type: "array", minItems: 1, items: nodeReference },
  relationships: { type: "array", items: normalizedEdge.properties.relationship },
});
const freshnessResult = object(["result", "reasons"], {
  result: { enum: ["current", "stale", "expired", "invalidated", "unknown"] },
  reasons: { type: "array", minItems: 1, uniqueItems: true, items: identifier },
});
const nodeResult = object(["node", "revision", "applicability", "participation_role", "authority_eligibility", "authority_binding", "freshness", "conformance", "impact_selected", "reason_paths"], {
  node: nodeReference,
  revision: digest,
  applicability: { enum: ["applicable", "not-applicable", "unknown"] },
  participation_role: nullable({ enum: ["governs", "proposes", "realizes", "evidences", "context", "history"] }),
  authority_eligibility: { enum: ["eligible", "ineligible", "unknown"] },
  authority_binding: { enum: ["verified", "not-verified", "contradicted", "not-applicable"] },
  freshness: { type: "array", uniqueItems: true, items: freshnessResult },
  conformance: { enum: ["passed", "failed", "not-evaluated"] },
  impact_selected: { type: "boolean" },
  reason_paths: { type: "array", items: reasonPath },
});
const readinessResult = object(["purpose", "state", "baseline_graph_revision", "candidate_graph_revision", "blocking_nodes", "blocking_rules"], {
  purpose: nullable({ enum: ["change-impact", "whole-root-readiness", "consequential-use", "historical-reproduction"] }),
  state: { enum: ["ready", "not-ready", "not-evaluated"] },
  baseline_graph_revision: nullable(digest),
  candidate_graph_revision: nullable(digest),
  blocking_nodes: { type: "array", uniqueItems: true, items: nodeReference },
  blocking_rules: { type: "array", uniqueItems: true, items: identifier },
});
const evaluationContext = object(["bundle", "profile", "baseline_graph_revision", "candidate_graph_revision", "evaluator", "policy", "purpose", "candidate_universe", "changed_inputs", "targets", "observations", "baseline_state"], {
  bundle: identifier,
  profile: { enum: ["nkf.profile.product", "nkf.profile.technology"] },
  baseline_graph_revision: nullable(digest),
  candidate_graph_revision: digest,
  evaluator: object(["id", "digest"], { id: identifier, digest }),
  policy: object(["id", "digest"], { id: { const: "nkf.freshness-policy.0.5" }, digest }),
  purpose: { enum: ["change-impact", "whole-root-readiness", "consequential-use", "historical-reproduction"] },
  candidate_universe: { type: "array", minItems: 1, uniqueItems: true, items: nodeReference },
  changed_inputs: { type: "array", uniqueItems: true, items: changedInput },
  targets: { type: "array", uniqueItems: true, items: nodeReference },
  observations: { type: "array", items: observation },
  baseline_state: { enum: ["confirmed", "missing", "outdated", "disputed", "ambiguous", "unsupported", "not-evaluated"] },
  evaluation_time: timestamp,
  historical_receipt: { type: "string", pattern: "^freshness-[0-9a-f]{64}$" },
});
const evaluationResult = object(["projections", "nodes", "impact", "cycles", "decision_classifications", "reviews", "unknowns", "readiness"], {
  projections: object(["full", "applicable", "current"], {
    full: { type: "array", uniqueItems: true, items: nodeReference },
    applicable: { type: "array", uniqueItems: true, items: nodeReference },
    current: { type: "array", uniqueItems: true, items: nodeReference },
  }),
  nodes: { type: "array", items: nodeResult },
  impact: object(["selected", "reason_paths"], {
    selected: { type: "array", uniqueItems: true, items: nodeReference },
    reason_paths: { type: "array", items: reasonPath },
  }),
  cycles: { type: "array", items: { type: "object" } },
  decision_classifications: { type: "array", items: decisionClassification },
  reviews: { type: "array", items: reviewObservation },
  unknowns: { type: "array", items: object(["rule", "subject"], { rule: identifier, subject: identifier, node: nodeReference }) },
  readiness: readinessResult,
});

function receiptSchema() {
  return envelope(
    "urn:nkf:0.5:schema:freshness-receipt",
    "NKF 0.5 freshness receipt",
    {
      contract: { const: "nkf.freshness-receipt" },
      nkf_version: { const: "0.5" },
      id: { type: "string", pattern: "^freshness-[0-9a-f]{64}$" },
      context: evaluationContext,
      result: evaluationResult,
    },
    ["contract", "nkf_version", "id", "context", "result"],
  );
}

function policySchema() {
  const mapping = object(["relationship", "source_kinds", "target_kinds", "propagation", "class", "purposes"], {
    relationship: normalizedEdge.properties.relationship,
    source_kinds: { type: "array", minItems: 1, uniqueItems: true, items: { enum: ["record", "document", "entity"] } },
    target_kinds: { type: "array", minItems: 1, uniqueItems: true, items: { enum: ["record", "document", "entity"] } },
    propagation: { enum: ["source-to-target", "target-to-source", "both", "none"] },
    class: { enum: ["review", "context"] },
    purposes: { type: "array", minItems: 1, uniqueItems: true, items: { enum: ["change-impact", "whole-root-readiness", "consequential-use", "historical-reproduction"] } },
  });
  return envelope(
    "urn:nkf:0.5:schema:freshness-policy",
    "NKF 0.5 freshness policy",
    {
      contract: { const: "nkf.freshness-policy" },
      nkf_version: { const: "0.5" },
      id: { const: "nkf.freshness-policy.0.5" },
      classes: { type: "array", prefixItems: ["hard", "review", "context", "historical"].map((value) => ({ const: value })), items: false, minItems: 4, maxItems: 4 },
      purposes: { type: "array", prefixItems: ["change-impact", "whole-root-readiness", "consequential-use", "historical-reproduction"].map((value) => ({ const: value })), items: false, minItems: 4, maxItems: 4 },
      hard_events: { type: "array", uniqueItems: true, items: { enum: ["exact-revision-binding-mismatch", "governed-artifact-binding-mismatch"] } },
      mappings: { type: "array", minItems: 14, maxItems: 14, items: mapping },
      historical_projection: object(["includes_all_authored_relationships", "impact_expansion"], {
        includes_all_authored_relationships: { const: true }, impact_expansion: { const: false },
      }),
      unknown_mapping: { const: "fail-closed" },
      repository_overrides: { const: "forbidden" },
      implementation_heuristics: { const: "forbidden" },
    },
    ["contract", "nkf_version", "id", "classes", "purposes", "mappings"],
  );
}

async function validationResultSchema() {
  const schema = await readBase("validation-result.schema.json");
  schema.$id = "urn:nkf:0.5:schema:validation-result";
  schema.title = "NKF 0.5 validation result";
  schema["x-nkf-source"] = source;
  schema.properties.nkf_version = { const: "0.5" };
  schema.required.splice(schema.required.indexOf("records"), 0, "knowledge_graph", "nodes");
  schema.required.splice(schema.required.indexOf("governing_use"), 0, "readiness");
  schema.properties.knowledge_graph = ref("knowledgeGraph");
  schema.properties.nodes = { type: "array", items: ref("nodeResult") };
  schema.properties.readiness = ref("readinessResult");
  schema.$defs.nodeReference = nodeReference;
  schema.$defs.digest = digest;
  schema.$defs.changedInput = changedInput;
  schema.$defs.observation = observation;
  schema.$defs.reasonPath = reasonPath;
  schema.$defs.nodeResult = nodeResult;
  schema.$defs.readinessResult = readinessResult;
  schema.$defs.knowledgeGraph = object(["policy", "candidate_graph_revision", "baseline_graph_revision", "baseline_state", "node_count", "authored_edge_count", "projection_counts"], {
    policy: object(["identity", "digest", "binding"], {
      identity: { const: "nkf.freshness-policy.0.5" }, digest, binding: { enum: ["verified", "unavailable", "mismatched"] },
    }),
    candidate_graph_revision: nullable(digest),
    baseline_graph_revision: nullable(digest),
    baseline_state: { enum: ["confirmed", "missing", "outdated", "disputed", "ambiguous", "unsupported", "not-evaluated"] },
    node_count: { type: "integer", minimum: 0 },
    authored_edge_count: { type: "integer", minimum: 0 },
    projection_counts: object(["full", "applicable", "current"], {
      full: { type: "integer", minimum: 0 }, applicable: { type: "integer", minimum: 0 }, current: { type: "integer", minimum: 0 },
    }),
  });
  Object.assign(schema.$defs.request.properties, {
    purpose: nullable({ enum: ["change-impact", "whole-root-readiness", "consequential-use", "historical-reproduction"] }),
    require_readiness: { type: "boolean" },
    changed_inputs: { type: "array", uniqueItems: true, items: changedInput },
    targets: { type: "array", uniqueItems: true, items: nodeReference },
    observations: { type: "array", items: observation },
    evaluation_time: nullable(timestamp),
    historical_receipt: nullable({ type: "string", pattern: "^freshness-[0-9a-f]{64}$" }),
  });
  schema.$defs.request.required.push("purpose", "require_readiness", "changed_inputs", "targets", "observations", "evaluation_time", "historical_receipt");
  const phaseNames = ["contracts", "parse", "schema", "project", "source", "extension-resolution", "bundle-graph", "knowledge-graph", "record-contract", "freshness", "security", "authority-binding", "result"];
  for (const key of Object.keys(schema.$defs)) {
    if (key.startsWith("phase") && key !== "phase" && key !== "phaseState" && key !== "phases") delete schema.$defs[key];
  }
  for (const name of phaseNames) {
    const key = `phase${name.split("-").map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join("")}`;
    schema.$defs[key] = { allOf: [ref("phase"), { type: "object", properties: { id: { const: name } } }] };
  }
  schema.$defs.phases = {
    type: "array",
    prefixItems: phaseNames.map((name) => ref(`phase${name.split("-").map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join("")}`)),
    items: false,
    minItems: phaseNames.length,
    maxItems: phaseNames.length,
  };
  schema.$defs.coreArtifacts.required.splice(2, 0, "freshness_policy");
  schema.$defs.coreArtifacts.properties.freshness_policy = ref("artifactBinding");
  const identities = ["bundle", "record", "graph-baseline", "freshness-receipt", "freshness-policy", "validation-result"];
  for (const key of Object.keys(schema.$defs)) {
    if (/^schema(?:Bundle|Record|ValidationResult)Binding$/.test(key)) delete schema.$defs[key];
  }
  const bindingRefs = [];
  for (const identity of identities) {
    const key = `schema${identity.split("-").map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join("")}Binding`;
    schema.$defs[key] = { allOf: [ref("schemaBinding"), { type: "object", properties: { identity: { const: `urn:nkf:0.5:schema:${identity}` } } }] };
    bindingRefs.push(ref(key));
  }
  schema.$defs.coreArtifacts.properties.schemas = {
    type: "array", prefixItems: bindingRefs, items: false, minItems: bindingRefs.length, maxItems: bindingRefs.length,
  };
  schema.$defs.diagnostic.properties.node_id = identifier;
  schema.$defs.diagnostic.properties.blocking.enum = ["conformance", "readiness", "governing-use", "none"];
  schema.$defs.diagnostic.properties.phase.enum = phaseNames;
  return schema;
}

async function releaseManifestSchema() {
  const schema = await readBase("release-manifest.schema.json");
  schema.$id = "urn:nkf:0.5:schema:release-manifest";
  schema.title = "NKF 0.5 release manifest";
  schema["x-nkf-source"] = source;
  schema.properties.nkf_version = { const: "0.5" };
  schema.required.splice(schema.required.indexOf("schemas"), 0, "freshness_policy");
  schema.properties.freshness_policy = ref("freshnessPolicy");
  schema.$defs.markdownArtifact.allOf[1].properties.path.const = "knowledge/specifications/nkf-0.5-revision-2.md";
  schema.$defs.executableArtifact.allOf[1].properties.path.const = "contracts/nkf/0.5/revision-2/nkf.yaml";
  schema.$defs.freshnessPolicy = object(["identity", "path", "digest"], {
    identity: { const: "nkf.freshness-policy.0.5" },
    path: { const: "contracts/nkf/0.5/freshness-policy.yaml" },
    digest: ref("digest"),
  });
  const identities = ["bundle", "record", "graph-baseline", "freshness-receipt", "freshness-policy", "release-manifest", "validation-result"];
  const names = [];
  for (const identity of identities) {
    const key = `${identity.split("-").map((part, index) => index === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`).join("")}Schema`;
    schema.$defs[key] = {
      allOf: [ref("schemaArtifact"), {
        type: "object",
        properties: {
          identity: { const: `urn:nkf:0.5:schema:${identity}` },
          path: { const: `contracts/nkf/0.5/schemas/${identity}.schema.json` },
        },
      }],
    };
    names.push(ref(key));
  }
  schema.$defs.schemas = { type: "array", minItems: names.length, maxItems: names.length, prefixItems: names, items: false };
  return schema;
}

const outputs = new Map([
  ["bundle.schema.json", await bundleSchema()],
  ["record.schema.json", await recordSchema()],
  ["graph-baseline.schema.json", baselineSchema()],
  ["freshness-receipt.schema.json", receiptSchema()],
  ["freshness-policy.schema.json", policySchema()],
  ["release-manifest.schema.json", await releaseManifestSchema()],
  ["validation-result.schema.json", await validationResultSchema()],
]);

await mkdir(schemaRoot, { recursive: true });
for (const [name, value] of outputs) {
  await writeFile(path.join(schemaRoot, name), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
