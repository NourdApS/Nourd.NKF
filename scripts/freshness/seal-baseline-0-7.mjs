// NKF 0.7 through 0.81 digest-bound review and seal.
//
// Carry-forward is computed here from digest identity alone; the reviewer
// receives carried judgments prefilled with provenance and performs only the
// computed required set. The seal refuses a delta claim whose performed set
// does not contain the recomputed closure, and, from NKF 0.81, a delta claim
// whose recorded closure differs from the closure recomputed with the
// evaluation policy's impact propagation. This module also powers the
// adopter's `review --scaffold` operation and the deterministic
// Task-transition conclusion seal.
import { spawnSync } from "node:child_process";
import { lstat, mkdir, readFile, readdir, realpath, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import * as commonmark from "commonmark";
import YAML from "yaml";

const RELATIONSHIPS = [
  "part-of", "defines", "governs", "applies-to", "depends-on", "extends", "supersedes",
  "rationale-for", "realizes", "evidences", "references", "flows-to", "transitions-to", "observes",
];
const PURPOSES = ["change-impact", "whole-root-readiness", "consequential-use"];

function fail(message) { throw new Error(message); }
const sha256Hex = (bytes) => createHash("sha256").update(bytes).digest("hex");

function jcs(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail("JCS cannot encode a non-finite number.");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`;
  if (typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${jcs(value[key])}`).join(",")}}`;
  }
  fail(`JCS cannot encode ${typeof value}.`);
}

function exactObject(value, keys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be one mapping.`);
  const observed = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (JSON.stringify(observed) !== JSON.stringify(expected)) {
    fail(`${label} must contain exactly: ${expected.join(", ")} (observed: ${observed.join(", ")}).`);
  }
}

function inside(root, target) {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function safeDirectory(root, segments, createMissing) {
  let current = root;
  for (const segment of segments) {
    current = path.join(current, segment);
    let direct = await lstat(current).catch(() => null);
    if (direct === null) {
      if (!createMissing) return null;
      await mkdir(current, { mode: 0o700 });
      direct = await lstat(current);
    }
    if (direct.isSymbolicLink() || !direct.isDirectory()) fail(`Freshness seal path is not a direct directory: ${segments.join("/")}`);
    if (!inside(root, await realpath(current))) fail(`Freshness seal path escapes the project: ${segments.join("/")}`);
  }
  return current;
}

function firstHeading(bytes) {
  const parsed = new commonmark.Parser().parse(bytes.toString("utf8"));
  const walker = parsed.walker();
  let event = walker.next();
  while (event !== null) {
    if (event.entering && event.node.type === "heading") {
      let text = "";
      const inner = event.node.walker();
      let innerEvent = inner.next();
      while (innerEvent !== null) {
        if (innerEvent.entering && (innerEvent.node.type === "text" || innerEvent.node.type === "code")) text += innerEvent.node.literal ?? "";
        innerEvent = inner.next();
      }
      return text;
    }
    event = walker.next();
  }
  return null;
}

async function declarations(project) {
  const root = path.join(project, ".nourd/knowledge/records");
  const records = [];
  for (const name of (await readdir(root)).filter((item) => item.endsWith(".yaml")).sort()) {
    records.push(YAML.parse(await readFile(path.join(root, name), "utf8"), { schema: "core", strict: true, uniqueKeys: true }));
  }
  return records;
}

function normalizedEdges(bundle, records) {
  const edges = [];
  for (const record of records) {
    const recordNode = { kind: "record", id: record.id };
    for (const relationship of record.relationships ?? []) {
      edges.push({
        source: recordNode,
        relationship: relationship.type,
        target: { kind: "record", id: relationship.target },
        source_binding: { kind: "section", node: recordNode, section: relationship.source_section },
      });
    }
    for (const relationship of record.entity_relationships ?? []) {
      const source = { kind: "entity", record: relationship.source.record, entity: relationship.source.entity };
      edges.push({
        source,
        relationship: relationship.type,
        target: { kind: "entity", record: relationship.target.record, entity: relationship.target.entity },
        source_binding: { kind: "section", node: source, section: relationship.source_section },
      });
    }
  }
  for (const nonRecord of bundle.non_records ?? []) {
    if (nonRecord.document === undefined) continue;
    const source = { kind: "document", id: nonRecord.document.id };
    for (const relationship of nonRecord.document.relationships ?? []) {
      edges.push({
        source,
        relationship: relationship.type,
        target: relationship.target,
        source_binding: { kind: "heading", node: source, heading: relationship.source_heading },
      });
    }
  }
  return edges.sort((left, right) => jcs(left).localeCompare(jcs(right), "en"));
}

function normalizedProjectionValue(value, keyPath = []) {
  if (Array.isArray(value)) {
    const projected = value.map((item) => normalizedProjectionValue(item, keyPath));
    const preserve =
      keyPath.at(-1) === "sections" ||
      keyPath.at(-1) === "heading_path" ||
      (keyPath.at(-2) === "provenance" && keyPath.at(-1) === "sources");
    return preserve ? projected : [...projected].sort((left, right) => (jcs(left) < jcs(right) ? -1 : 1));
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, member]) => [key, normalizedProjectionValue(member, [...keyPath, key])]));
  }
  return value;
}

const nodeKey07 = (node) => jcs(node);
const decisionDeclarationDigest = (declaration) =>
  sha256Hex(Buffer.from(jcs(normalizedProjectionValue(declaration)), "utf8"));

// Versions whose reviewed baseline is digest-bound. Registration is
// deliberate: an unregistered version fails closed here rather than sealing
// under another version's rules.
const SEAL_VERSIONS = new Set(["0.7", "0.71", "0.8", "0.81"]);
// Versions whose deterministic Task conclusion is seal-completing.
const CONCLUSION_SEAL_VERSIONS = new Set(["0.71", "0.8", "0.81"]);
// Versions whose delta-review closure includes the evaluation policy's impact
// propagation (ADR 0139). Tooling published under 0.7 through 0.8 recorded
// closures without that term; their bundles keep exactly that behaviour, and
// the first delta review under 0.81 computes the propagated closure.
const PROPAGATED_CLOSURE_VERSIONS = new Set(["0.81"]);

async function projectSealVersion(project) {
  const bundle = YAML.parse(await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"), { schema: "core", strict: true, uniqueKeys: true });
  if (!SEAL_VERSIONS.has(bundle?.nkf_version)) {
    fail(`The digest-bound review and seal support exactly ${[...SEAL_VERSIONS].join(", ")}; the bundle declares ${bundle?.nkf_version}.`);
  }
  return { bundle, nkfVersion: bundle.nkf_version };
}

async function candidateGraph07(project, checkerPath, expectedVersion) {
  const run = spawnSync(process.execPath, [checkerPath, "--project", project, "--level", "full-bundle", "--no-persist"], { encoding: "utf8" });
  if (run.status !== 0) fail(`The pre-review candidate does not conform: ${run.stderr || run.stdout}`);
  const result = JSON.parse(run.stdout);
  if (result.nkf_version !== expectedVersion || result.conformance !== "passed" || result.knowledge_graph?.policy?.binding !== "verified") {
    fail(`The checker did not produce a conformant, policy-bound NKF ${expectedVersion} candidate graph.`);
  }
  return result;
}

function priorJudgments(predecessorBaseline) {
  const revisions = new Map();
  for (const entry of predecessorBaseline?.node_revisions ?? []) {
    revisions.set(nodeKey07(entry.node), entry.revision?.value);
  }
  const nodes = new Map();
  for (const entry of predecessorBaseline?.applicability_coverage ?? []) {
    if (entry.purpose === "change-impact") nodes.set(nodeKey07(entry.node), entry);
  }
  const decisions = new Map();
  for (const entry of predecessorBaseline?.decision_classifications ?? []) {
    decisions.set(`${entry.decision} ${entry.purpose}`, entry);
  }
  return { nodes, decisions, revisions };
}

// A 0.6-shaped predecessor judgment carries no per-judgment revision; the
// predecessor's digested node revision is its exact judged revision.
function priorRevision(prior, entry, node) {
  return entry?.revision?.value ?? prior.revisions.get(nodeKey07(node));
}

function carriedProvenance(priorEntry, predecessorBaseline) {
  if (priorEntry.provenance?.carried !== undefined) return { carried: priorEntry.provenance.carried };
  return {
    carried: {
      performed_in_graph_revision: predecessorBaseline.graph_revision,
      performing_reviewer: predecessorBaseline.confirmation.reviewer,
    },
  };
}

// The policy-declared judgment dependency function: a judgment kind carries
// across a version delta only when every rule in its closed list is
// classified identical. Within one version the lists are trivially identical.
function carryAllowedByKind(versionDelta, policy) {
  if (versionDelta === null || versionDelta === undefined) {
    return { node_applicability: true, relationship_review: true, decision_classification: true };
  }
  const rules = versionDelta.rules ?? {};
  const declared = policy?.judgment_dependencies ?? {};
  const allIdentical = (list) =>
    (list ?? []).every((rule) => rules[rule]?.classification === "identical");
  return {
    node_applicability: allIdentical(declared.node_applicability),
    relationship_review: allIdentical(declared.relationship_review),
    decision_classification: allIdentical(declared.decision_classification),
  };
}

// The accepted evaluation policy and version-delta declaration the closure is
// computed against. They are read from the verified distribution root the
// checker runs from — the same contract tree the checker itself binds — and
// fail closed unless their digests equal the digest the checker reported for
// the policy and the digest the baseline binds for the version delta.
async function acceptedClosureContracts(checkerPath, nkfVersion, result, versionDeltaDigest, supplied) {
  const contractRoot = path.resolve(path.dirname(checkerPath), "..", "contracts", "nkf", nkfVersion);
  const load = async (name, expectedDigest, label) => {
    const bytes = await readFile(path.join(contractRoot, name)).catch(() => null);
    if (bytes === null) fail(`The verified distribution omits the accepted NKF ${nkfVersion} ${label}; the delta closure cannot be computed.`);
    if (expectedDigest !== undefined && expectedDigest !== null && sha256Hex(bytes) !== expectedDigest) {
      fail(`The distributed NKF ${nkfVersion} ${label} does not carry the exact bound digest; the delta closure cannot be computed.`);
    }
    return YAML.parse(bytes.toString("utf8"), { schema: "core", strict: true, uniqueKeys: true });
  };
  const policy = supplied.policy ?? await load("freshness-policy.yaml", result.knowledge_graph?.policy?.digest?.value, "evaluation policy");
  const versionDelta = supplied.versionDelta ?? await load("version-delta.yaml", versionDeltaDigest, "version-delta declaration");
  if (policy?.contract !== "nkf.freshness-policy" || policy?.nkf_version !== nkfVersion || !Array.isArray(policy.mappings)) {
    fail(`The evaluation policy is not the accepted NKF ${nkfVersion} policy.`);
  }
  if (versionDelta?.contract !== "nkf.version-delta" || versionDelta?.rules === undefined) {
    fail("The version-delta declaration is not an accepted nkf.version-delta declaration.");
  }
  return { policy, versionDelta };
}

// The NKF 0.81 computed required-review closure (Delta Review Claim And
// Computed Closure): seeds ∪ propagation, where
//   seeds = every candidate node whose revision differs from the predecessor
//           node_revisions entry or that is absent from it; every judgment
//           whose basis digest differs from the predecessor judgment's (or
//           that has no predecessor judgment); every judgment depending on a
//           rule classified semantically-new in the accepted version delta,
//           dependency meaning membership in the policy's judgment_dependencies
//           list for that judgment kind; every Decision classification whose
//           Decision declaration digest differs or whose Decision is new; and
//           every pending promotion-reconciliation subject;
//   propagation = the fixpoint over the authored candidate edges under the
//           policy mappings of class hard or review (context and historical
//           mappings do not propagate; the purposes filter is ignored):
//           source in set and propagation source-to-target or both adds the
//           target; target in set and propagation target-to-source or both
//           adds the source.
// The result is restricted to the candidate node universe and returned in
// candidate node order. It is a pure function of the candidate graph, the
// predecessor baseline, the policy, the version delta, and the judgment basis
// digests, so the seal and the validating checker recompute the same set.
function deltaClosure0_81({ result, edges, predecessorBaseline, policy, versionDelta, basisDigestByNode, acceptedDecisions, decisionDigestById }) {
  const prior = priorJudgments(predecessorBaseline);
  const universe = result.nodes.map((entry) => nodeKey07(entry.node));
  const universeSet = new Set(universe);
  const closure = new Set();
  const semanticallyNew = new Set(
    Object.entries(versionDelta.rules ?? {})
      .filter(([, rule]) => rule?.classification === "semantically-new")
      .map(([rule]) => rule),
  );
  const dependsOnNew = (list) => (list ?? []).some((rule) => semanticallyNew.has(rule));
  const declared = policy.judgment_dependencies ?? {};
  for (const entry of result.nodes) {
    const key = nodeKey07(entry.node);
    if (prior.revisions.get(key) !== entry.revision.value) { closure.add(key); continue; }
    const priorEntry = prior.nodes.get(key);
    if (priorEntry === undefined) { closure.add(key); continue; }
    const priorBasis = priorEntry.basis_digest?.value ?? priorRevision(prior, priorEntry, entry.node);
    if (basisDigestByNode.get(key) !== priorBasis) { closure.add(key); continue; }
    if (dependsOnNew(declared.node_applicability)) closure.add(key);
  }
  for (const decision of acceptedDecisions) {
    const key = nodeKey07({ kind: "record", id: decision });
    const digest = decisionDigestById.get(decision);
    for (const purpose of PURPOSES) {
      const priorEntry = prior.decisions.get(`${decision} ${purpose}`);
      if (priorEntry === undefined || priorEntry.decision_digest?.value !== digest || dependsOnNew(declared.decision_classification)) {
        closure.add(key);
      }
    }
  }
  for (const entry of predecessorBaseline?.promotion_reconciliation ?? []) {
    if (entry.state === "pending") closure.add(nodeKey07(entry.node));
  }
  const mappings = new Map(policy.mappings.map((mapping) => [mapping.relationship, mapping]));
  let changed = true;
  while (changed) {
    changed = false;
    for (const edge of edges) {
      const mapping = mappings.get(edge.relationship);
      if (mapping === undefined || !["hard", "review"].includes(mapping.class)) continue;
      const source = nodeKey07(edge.source);
      const target = nodeKey07(edge.target);
      if (closure.has(source) && ["source-to-target", "both"].includes(mapping.propagation) && !closure.has(target)) {
        closure.add(target);
        changed = true;
      }
      if (closure.has(target) && ["target-to-source", "both"].includes(mapping.propagation) && !closure.has(source)) {
        closure.add(source);
        changed = true;
      }
    }
  }
  return universe.filter((key) => closure.has(key) && universeSet.has(key));
}

export async function writeReviewTemplate0_7({ projectRoot, checker, reviewPath, stage = "delta", versionDelta = null, policy = null }) {
  const project = await realpath(path.resolve(projectRoot));
  const checkerPath = path.resolve(checker);
  const target = path.resolve(reviewPath);
  const { bundle, nkfVersion } = await projectSealVersion(project);
  const result = await candidateGraph07(project, checkerPath, nkfVersion);
  const records = await declarations(project);
  const recordsById = new Map(records.map((record) => [record.id, record]));
  const documentsById = new Map(
    (bundle.non_records ?? []).filter((entry) => entry.document !== undefined).map((entry) => [entry.document.id, entry]),
  );
  const baselinePath = path.join(project, ".nourd/knowledge/freshness/baseline.yaml");
  const predecessorBytes = await readFile(baselinePath).catch(() => null);
  const predecessorBaseline = stage === "delta" && predecessorBytes !== null
    ? YAML.parse(predecessorBytes.toString("utf8"), { schema: "core", strict: true, uniqueKeys: true })
    : null;
  if (stage === "delta" && predecessorBaseline === null) {
    fail("A delta review requires the predecessor reviewed baseline; whole-root review is the recovery path.");
  }
  const prior = priorJudgments(predecessorBaseline);
  const propagated = stage === "delta" && PROPAGATED_CLOSURE_VERSIONS.has(nkfVersion);
  const closureContracts = propagated
    ? await acceptedClosureContracts(checkerPath, nkfVersion, result, predecessorBaseline?.version_delta?.digest?.value, { versionDelta, policy })
    : null;
  const carryByKind = carryAllowedByKind(
    propagated ? closureContracts.versionDelta : versionDelta,
    propagated ? closureContracts.policy : policy,
  );
  const basisFor = async (node) => {
    if (node.kind === "record" || node.kind === "entity") {
      const record = recordsById.get(node.kind === "record" ? node.id : node.record);
      return { node, source: { section: record?.sections?.[0]?.id ?? "REVIEW_SECTION_REQUIRED" } };
    }
    const declaration = documentsById.get(node.id);
    const bytes = declaration === undefined
      ? null
      : await readFile(path.join(project, bundle.knowledge_root, ...declaration.path.split("/"))).catch(() => null);
    const heading = bytes === null ? null : firstHeading(bytes);
    if (heading === null) {
      const root = recordsById.get(bundle.root.record);
      return { node: { kind: "record", id: bundle.root.record }, source: { section: root?.sections?.[0]?.id ?? "REVIEW_SECTION_REQUIRED" } };
    }
    return { node, source: { heading: { heading_path: [heading], occurrence: 1 } } };
  };
  const nodes = [];
  let carried = 0;
  const fresh = [];
  for (const entry of result.nodes) {
    const priorEntry = prior.nodes.get(nodeKey07(entry.node));
    const carriable = predecessorBaseline !== null
      && carryByKind.node_applicability
      && priorEntry !== undefined
      && priorRevision(prior, priorEntry, entry.node) === entry.revision.value;
    if (carriable) {
      carried += 1;
      nodes.push({
        node: entry.node,
        state: priorEntry.state,
        role: priorEntry.role,
        basis: priorEntry.basis,
        revision: entry.revision,
        basis_digest: priorEntry.basis_digest ?? entry.revision,
        provenance: carriedProvenance(priorEntry, predecessorBaseline),
      });
      continue;
    }
    fresh.push(entry.node);
    nodes.push({
      node: entry.node,
      state: "REVIEW_REQUIRED",
      role: "REVIEW_REQUIRED",
      basis: await basisFor(entry.node),
      revision: entry.revision,
      basis_digest: entry.revision,
      provenance: { performed: true },
    });
  }
  const currentRevisionByNode = new Map(result.nodes.map((entry) => [nodeKey07(entry.node), entry.revision.value]));
  const acceptedDecisions = records
    .filter((record) => record.type === "decision" && record.governance?.status === "accepted")
    .map((record) => record.id)
    .sort();
  const classifications = [];
  for (const decision of acceptedDecisions) {
    const digest = { algorithm: "sha-256", value: decisionDeclarationDigest(recordsById.get(decision)) };
    for (const purpose of PURPOSES) {
      const priorEntry = prior.decisions.get(`${decision} ${purpose}`);
      const priorNodeEntry = prior.nodes.get(nodeKey07({ kind: "record", id: decision }));
      const nodeRevisionUnchanged = priorNodeEntry !== undefined
        && priorRevision(prior, priorNodeEntry, { kind: "record", id: decision })
          === currentRevisionByNode.get(nodeKey07({ kind: "record", id: decision }));
      const carriable = predecessorBaseline !== null
        && carryByKind.decision_classification
        && priorEntry !== undefined
        && (priorEntry.decision_digest?.value === digest.value || nodeRevisionUnchanged);
      if (carriable) {
        classifications.push({
          decision,
          purpose,
          classification: priorEntry.classification,
          basis: priorEntry.basis,
          decision_digest: digest,
          basis_digest: priorEntry.basis_digest ?? digest,
          provenance: carriedProvenance(priorEntry, predecessorBaseline),
        });
        continue;
      }
      classifications.push({
        decision,
        purpose,
        classification: "REVIEW_REQUIRED",
        basis: { node: { kind: "record", id: decision }, source: { section: recordsById.get(decision)?.sections?.[0]?.id ?? "REVIEW_SECTION_REQUIRED" } },
        decision_digest: digest,
        basis_digest: digest,
        provenance: { performed: true },
      });
    }
  }
  const pendingReconciliation = (predecessorBaseline?.promotion_reconciliation ?? [])
    .filter((entry) => entry.state === "pending")
    .map((entry) => entry.node);
  let closureKeys = new Set([...fresh, ...pendingReconciliation].map(nodeKey07));
  if (propagated) {
    closureKeys = new Set(deltaClosure0_81({
      result,
      edges: normalizedEdges(bundle, records),
      predecessorBaseline,
      policy: closureContracts.policy,
      versionDelta: closureContracts.versionDelta,
      basisDigestByNode: new Map(nodes.map((entry) => [nodeKey07(entry.node), entry.basis_digest?.value])),
      acceptedDecisions,
      decisionDigestById: new Map(acceptedDecisions.map((decision) => [decision, decisionDeclarationDigest(recordsById.get(decision))])),
    }));
    // Every closure node is performed, including one reached by propagation
    // whose own revision is unchanged: it keeps its exact prior basis and
    // basis digest — the cited basis content is unchanged — and loses its
    // carried judgment values, which the reviewer performs afresh.
    for (const entry of nodes) {
      if (!closureKeys.has(nodeKey07(entry.node)) || entry.provenance?.carried === undefined) continue;
      carried -= 1;
      entry.state = "REVIEW_REQUIRED";
      entry.role = "REVIEW_REQUIRED";
      entry.provenance = { performed: true };
    }
  }
  const computedClosure = result.nodes.map((entry) => entry.node).filter((node) => closureKeys.has(nodeKey07(node)));
  const relationships = predecessorBaseline !== null && carryByKind.relationship_review
    ? predecessorBaseline.relationship_coverage
    : RELATIONSHIPS.map((relationship) => ({
        relationship,
        state: "REVIEW_REQUIRED",
        basis: {
          node: { kind: "record", id: bundle.root.record },
          source: { section: recordsById.get(bundle.root.record)?.sections?.[0]?.id ?? "REVIEW_SECTION_REQUIRED" },
        },
      }));
  const review = {
    contract: "nkf.semantic-review-input",
    nkf_version: nkfVersion,
    stage,
    reviewer: { kind: "agent", id: "REVIEWER_ID_REQUIRED" },
    reviewed_at: "REVIEWED_AT_UTC_MILLISECOND_REQUIRED",
    claim: stage === "delta" ? "semantically-reviewed-delta" : "semantically-reviewed-whole-root",
    disputed: false,
    ...(stage === "delta" ? { computed_closure: computedClosure } : {}),
    nodes,
    relationships,
    decision_classifications: classifications,
    observations: [{
      id: "review-observation",
      subject: result.nodes[0].node,
      basis: nodes[0].basis,
      finding: "REVIEW_FINDING_REQUIRED",
    }],
    limitations: ["REVIEW_LIMITATION_REQUIRED"],
  };
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, YAML.stringify(review, { lineWidth: 0, aliasDuplicateObjects: false }));
  return { path: target, stage, nodes: nodes.length, carried, fresh: computedClosure.length, decisions: acceptedDecisions.length };
}

export async function sealBaseline0_7({ projectRoot, checker, reviewPath, versionDeltaDigest, versionDelta = null, policy = null }) {
  const project = await realpath(path.resolve(projectRoot));
  const checkerPath = path.resolve(checker);
  const { bundle, nkfVersion } = await projectSealVersion(project);
  const review = YAML.parse(await readFile(path.resolve(reviewPath), "utf8"), { schema: "core", strict: true, uniqueKeys: true });
  const expected = [
    "contract", "nkf_version", "stage", "reviewer", "reviewed_at", "claim", "disputed",
    "nodes", "relationships", "decision_classifications", "observations", "limitations",
    ...(review.stage === "delta" ? ["computed_closure"] : []),
  ];
  exactObject(review, expected, "review");
  // The template's placeholders are not a review. A reviewer id, finding, or
  // limitation left at its sentinel, or a node or classification still marked
  // REVIEW_REQUIRED, is refused by name rather than sealed into the baseline
  // as the work of a reviewer called REVIEWER_ID_REQUIRED.
  const placeholders = [];
  if (review.reviewer?.id === "REVIEWER_ID_REQUIRED") placeholders.push("reviewer.id");
  if (review.reviewed_at === "REVIEWED_AT_UTC_MILLISECOND_REQUIRED") placeholders.push("reviewed_at");
  for (const [index, entry] of (Array.isArray(review.nodes) ? review.nodes : []).entries()) {
    if (entry?.state === "REVIEW_REQUIRED" || entry?.role === "REVIEW_REQUIRED") placeholders.push(`nodes[${index}]`);
  }
  for (const [index, entry] of (Array.isArray(review.relationships) ? review.relationships : []).entries()) {
    if (entry?.state === "REVIEW_REQUIRED") placeholders.push(`relationships[${index}]`);
  }
  for (const [index, entry] of (Array.isArray(review.decision_classifications) ? review.decision_classifications : []).entries()) {
    if (entry?.classification === "REVIEW_REQUIRED") placeholders.push(`decision_classifications[${index}]`);
  }
  for (const [index, entry] of (Array.isArray(review.observations) ? review.observations : []).entries()) {
    if (entry?.finding === "REVIEW_FINDING_REQUIRED") placeholders.push(`observations[${index}].finding`);
  }
  for (const [index, entry] of (Array.isArray(review.limitations) ? review.limitations : []).entries()) {
    if (entry === "REVIEW_LIMITATION_REQUIRED") placeholders.push(`limitations[${index}]`);
  }
  if (placeholders.length > 0) {
    fail(`The review still carries the template's placeholders at ${placeholders.slice(0, 8).join(", ")}${placeholders.length > 8 ? ` and ${placeholders.length - 8} more` : ""}; a named reviewer must complete it before it can seal.`);
  }
  const deltaStage = review.stage === "delta";
  if (
    review.contract !== "nkf.semantic-review-input" || review.nkf_version !== nkfVersion ||
    (deltaStage ? review.claim !== "semantically-reviewed-delta" : review.stage !== "whole-root" || review.claim !== "semantically-reviewed-whole-root") ||
    review.disputed !== false
  ) fail("The completed review has the wrong contract, version, stage, claim, or dispute state.");
  const result = await candidateGraph07(project, checkerPath, nkfVersion);
  const records = await declarations(project);
  const recordsById = new Map(records.map((record) => [record.id, record]));
  const revisionByNode = new Map(result.nodes.map((entry) => [nodeKey07(entry.node), entry.revision.value]));
  const expectedNodes = result.nodes.map((entry) => nodeKey07(entry.node)).sort();
  const reviewNodes = review.nodes.map((entry) => nodeKey07(entry.node)).sort();
  if (JSON.stringify(expectedNodes) !== JSON.stringify(reviewNodes)) fail("Review node coverage must equal the exact candidate graph universe.");
  const baselinePath = path.join(project, ".nourd/knowledge/freshness/baseline.yaml");
  const predecessorBytes = await readFile(baselinePath).catch(() => null);
  const predecessorBaseline = predecessorBytes === null
    ? null
    : YAML.parse(predecessorBytes.toString("utf8"), { schema: "core", strict: true, uniqueKeys: true });
  const prior = priorJudgments(predecessorBaseline);
  const performedNodes = new Set();
  for (const [index, entry] of review.nodes.entries()) {
    if (entry.revision?.value !== revisionByNode.get(nodeKey07(entry.node))) {
      fail(`Review node ${index} does not bind the exact candidate node revision.`);
    }
    if (entry.provenance?.performed === true) {
      performedNodes.add(nodeKey07(entry.node));
      continue;
    }
    const priorEntry = prior.nodes.get(nodeKey07(entry.node));
    const carriable = predecessorBaseline !== null
      && entry.provenance?.carried !== undefined
      && priorEntry !== undefined
      && priorRevision(prior, priorEntry, entry.node) === entry.revision?.value
      && jcs({ state: priorEntry.state, role: priorEntry.role, basis: priorEntry.basis })
        === jcs({ state: entry.state, role: entry.role, basis: entry.basis });
    if (!carriable) fail(`Review node ${index} carries a judgment whose carry preconditions do not hold.`);
  }
  for (const [index, entry] of review.decision_classifications.entries()) {
    const declared = recordsById.get(entry.decision);
    const digest = declared === undefined ? null : decisionDeclarationDigest(declared);
    if (entry.decision_digest?.value !== digest) {
      fail(`Review Decision classification ${index} does not bind the exact Decision declaration digest.`);
    }
    if (entry.provenance?.performed === true) continue;
    const priorEntry = prior.decisions.get(`${entry.decision} ${entry.purpose}`);
    const priorNodeEntry = prior.nodes.get(nodeKey07({ kind: "record", id: entry.decision }));
    const nodeRevisionUnchanged = priorNodeEntry !== undefined
      && priorRevision(prior, priorNodeEntry, { kind: "record", id: entry.decision })
        === revisionByNode.get(nodeKey07({ kind: "record", id: entry.decision }));
    const carriable = predecessorBaseline !== null
      && priorEntry !== undefined
      && (priorEntry.decision_digest?.value === entry.decision_digest?.value || nodeRevisionUnchanged)
      && priorEntry.classification === entry.classification;
    if (!carriable) fail(`Review Decision classification ${index} carries a judgment whose carry preconditions do not hold.`);
  }
  const pendingReconciliation = (predecessorBaseline?.promotion_reconciliation ?? []).filter((entry) => entry.state === "pending");
  if (deltaStage) {
    let closure;
    if (PROPAGATED_CLOSURE_VERSIONS.has(nkfVersion)) {
      if (predecessorBaseline === null) {
        fail("A delta claim requires the predecessor reviewed baseline; whole-root review is the recovery path.");
      }
      const contracts = await acceptedClosureContracts(checkerPath, nkfVersion, result, versionDeltaDigest, { versionDelta, policy });
      const acceptedDecisions = records
        .filter((record) => record.type === "decision" && record.governance?.status === "accepted")
        .map((record) => record.id)
        .sort();
      closure = new Set(deltaClosure0_81({
        result,
        edges: normalizedEdges(bundle, records),
        predecessorBaseline,
        policy: contracts.policy,
        versionDelta: contracts.versionDelta,
        basisDigestByNode: new Map(review.nodes.map((entry) => [nodeKey07(entry.node), entry.basis_digest?.value])),
        acceptedDecisions,
        decisionDigestById: new Map(acceptedDecisions.map((decision) => [decision, decisionDeclarationDigest(recordsById.get(decision))])),
      }));
    } else {
      closure = new Set();
      for (const entry of review.nodes) {
        const priorEntry = prior.nodes.get(nodeKey07(entry.node));
        const carriable = predecessorBaseline !== null
          && priorEntry !== undefined
          && priorRevision(prior, priorEntry, entry.node) === entry.revision?.value;
        if (!carriable) closure.add(nodeKey07(entry.node));
      }
      for (const entry of pendingReconciliation) closure.add(nodeKey07(entry.node));
    }
    const declaredClosure = new Set((review.computed_closure ?? []).map(nodeKey07));
    if (jcs([...closure].sort()) !== jcs([...declaredClosure].sort())) {
      const missing = [...closure].filter((key) => !declaredClosure.has(key)).sort();
      const extra = [...declaredClosure].filter((key) => !closure.has(key)).sort();
      fail(
        "The delta claim does not record the exact recomputed required-review closure."
        + (missing.length > 0 ? ` Missing subjects: ${missing.join(", ")}.` : "")
        + (extra.length > 0 ? ` Subjects not in the recomputed closure: ${extra.join(", ")}.` : ""),
      );
    }
    for (const key of closure) {
      if (!performedNodes.has(key)) fail("The delta claim performed set does not contain the computed closure.");
    }
  }
  const reconciliation = (predecessorBaseline?.promotion_reconciliation ?? []).map((entry) => ({
    ...entry,
    state: entry.state === "pending" && performedNodes.has(nodeKey07(entry.node)) ? "resolved" : entry.state,
  }));
  const baseline = {
    contract: "nkf.graph-baseline",
    nkf_version: nkfVersion,
    bundle: bundle.id,
    profile: bundle.root.profile,
    graph_revision: result.knowledge_graph.summary?.candidate_graph_revision ?? result.knowledge_graph.candidate_graph_revision,
    policy: { id: result.knowledge_graph.policy.identity, digest: result.knowledge_graph.policy.digest },
    version_delta: { contract: "nkf.version-delta", digest: { algorithm: "sha-256", value: versionDeltaDigest } },
    node_revisions: result.nodes.map((entry) => ({ node: entry.node, revision: entry.revision })),
    authored_edges: normalizedEdges(bundle, records),
    external_dependencies: bundle.external_dependencies ?? [],
    authority_inputs: bundle.authority_inputs ?? [],
    relationship_coverage: review.relationships,
    applicability_coverage: review.nodes.flatMap((entry) => PURPOSES.map((purpose) => ({
      node: entry.node,
      purpose,
      state: entry.state,
      role: entry.role,
      basis: entry.basis,
      revision: entry.revision,
      basis_digest: entry.basis_digest,
      provenance: entry.provenance,
    }))),
    decision_classifications: review.decision_classifications,
    promotion_reconciliation: reconciliation,
    confirmation: {
      reviewer: review.reviewer,
      reviewed_at: review.reviewed_at,
      claim: review.claim,
      ...(deltaStage
        ? {
            computed_closure: review.computed_closure,
            performed_set: review.nodes
              .filter((entry) => entry.provenance?.performed === true)
              .map((entry) => entry.node),
          }
        : {}),
      observations: review.observations,
      limitations: review.limitations,
      disputed: false,
    },
  };
  await safeDirectory(project, [".nourd", "knowledge"], false);
  await safeDirectory(project, [".nourd", "knowledge", "freshness"], true);
  const bytes = Buffer.from(YAML.stringify(baseline, { lineWidth: 0, aliasDuplicateObjects: false }), "utf8");
  await writeFile(baselinePath, bytes);
  return {
    state: "sealed",
    stage: review.stage,
    graph_revision: baseline.graph_revision.value,
    nodes: result.nodes.length,
    performed: performedNodes.size,
    reviewer: review.reviewer,
    reviewed_at: review.reviewed_at,
  };
}

// Mechanical baseline shape conversion. It rewrites structure only: every
// predecessor judgment keeps or gains carried provenance naming the exact
// performing graph revision and reviewer, and the baseline rebinds the
// successor policy and accepted version-delta declaration. It changes no
// judgment value; the following review and seal compute real carry-forward
// against the candidate. The default target keeps the exact 0.6-to-0.7 mode;
// the 0.71 target converts a confirmed 0.7 baseline to the digest-bound
// 0.71 contract.
// Each successor whose baseline conversion is a pure rebind: the declaration
// shape is unchanged, so the conversion rebinds the version coordinate, the
// policy, and the version delta, and marks every judgment carried. Registering
// the pair is deliberate — an unregistered target fails closed rather than
// silently converting under predecessor rules.
const REBIND_CONVERSIONS = new Map([
  ["0.71", "0.7"],
  ["0.8", "0.71"],
  ["0.81", "0.8"],
]);

export async function convertBaselineShape0_7({ projectRoot, versionDeltaDigest, policyDigest, targetVersion = "0.7" }) {
  const project = await realpath(path.resolve(projectRoot));
  const baselinePath = path.join(project, ".nourd/knowledge/freshness/baseline.yaml");
  const baseline = YAML.parse(await readFile(baselinePath, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
  if (REBIND_CONVERSIONS.has(targetVersion)) {
    const predecessor = REBIND_CONVERSIONS.get(targetVersion);
    if (baseline.nkf_version === targetVersion) return { state: `already-${targetVersion}` };
    if (baseline.nkf_version !== predecessor) {
      fail(`Baseline conversion to NKF ${targetVersion} supports exactly the confirmed NKF ${predecessor} predecessor.`);
    }
    const carried = {
      carried: {
        performed_in_graph_revision: baseline.graph_revision,
        performing_reviewer: baseline.confirmation.reviewer,
      },
    };
    for (const entry of baseline.applicability_coverage ?? []) {
      entry.provenance = entry.provenance?.carried !== undefined
        ? { carried: structuredClone(entry.provenance.carried) }
        : structuredClone(carried);
    }
    for (const entry of baseline.decision_classifications ?? []) {
      entry.provenance = entry.provenance?.carried !== undefined
        ? { carried: structuredClone(entry.provenance.carried) }
        : structuredClone(carried);
    }
    baseline.nkf_version = targetVersion;
    baseline.policy = { id: `nkf.freshness-policy.${targetVersion}`, digest: { algorithm: "sha-256", value: policyDigest } };
    baseline.version_delta = { contract: "nkf.version-delta", digest: { algorithm: "sha-256", value: versionDeltaDigest } };
    await writeFile(baselinePath, YAML.stringify(baseline, { lineWidth: 0, aliasDuplicateObjects: false }));
    return { state: "converted", judgments: (baseline.applicability_coverage ?? []).length };
  }
  if (targetVersion !== "0.7") fail("Baseline shape conversion supports exactly the registered NKF 0.7, 0.71, 0.8, and 0.81 targets.");
  if (baseline.nkf_version === "0.7") return { state: "already-0.7" };
  if (baseline.nkf_version !== "0.6") fail("Baseline shape conversion supports exactly the NKF 0.6 predecessor.");
  const revisions = new Map(
    (baseline.node_revisions ?? []).map((entry) => [nodeKey07(entry.node), entry.revision]),
  );
  const carried = {
    carried: {
      performed_in_graph_revision: baseline.graph_revision,
      performing_reviewer: baseline.confirmation.reviewer,
    },
  };
  for (const entry of baseline.applicability_coverage ?? []) {
    const revision = revisions.get(nodeKey07(entry.node));
    if (revision === undefined) fail(`The predecessor baseline judges an unrevisioned node: ${nodeKey07(entry.node)}`);
    entry.revision = revision;
    entry.basis_digest = revision;
    entry.provenance = structuredClone(carried);
  }
  for (const entry of baseline.decision_classifications ?? []) {
    const revision = revisions.get(nodeKey07({ kind: "record", id: entry.decision }));
    if (revision === undefined) fail(`The predecessor baseline classifies an unrevisioned Decision: ${entry.decision}`);
    entry.decision_digest = revision;
    entry.basis_digest = revision;
    entry.provenance = structuredClone(carried);
  }
  baseline.nkf_version = "0.7";
  baseline.policy = { id: "nkf.freshness-policy.0.7", digest: { algorithm: "sha-256", value: policyDigest } };
  baseline.version_delta = { contract: "nkf.version-delta", digest: { algorithm: "sha-256", value: versionDeltaDigest } };
  baseline.promotion_reconciliation = [];
  await writeFile(baselinePath, YAML.stringify(baseline, { lineWidth: 0, aliasDuplicateObjects: false }));
  return { state: "converted", judgments: (baseline.applicability_coverage ?? []).length };
}

// The deterministic Task-transition conclusion seal (NKF 0.71). The
// transition already staged its declared state change; this seal recomputes
// the exact candidate graph, refuses any graph delta beyond the closed
// transition vocabulary, carries every judgment with exact performing
// provenance, marks the transitioned Task node's judgments with the exact
// transition, and confirms the successor baseline with the literal
// `mechanically-concluded` claim. It performs zero judgments and supplies no
// semantic review.
export async function sealConclusion0_71({ projectRoot, checker, task, fromState, toState }) {
  const project = await realpath(path.resolve(projectRoot));
  const checkerPath = path.resolve(checker);
  const { bundle, nkfVersion } = await projectSealVersion(project);
  if (!CONCLUSION_SEAL_VERSIONS.has(nkfVersion)) {
    fail(`The mechanical Task-transition conclusion seal supports exactly ${[...CONCLUSION_SEAL_VERSIONS].join(", ")}; the ordinary review-and-seal path covers every other version.`);
  }
  const baselinePath = path.join(project, ".nourd/knowledge/freshness/baseline.yaml");
  const predecessorBytes = await readFile(baselinePath).catch(() => null);
  if (predecessorBytes === null) {
    fail("The mechanical Task-transition conclusion requires the confirmed predecessor reviewed baseline; the ordinary review-and-seal path is the recovery.");
  }
  const predecessorBaseline = YAML.parse(predecessorBytes.toString("utf8"), { schema: "core", strict: true, uniqueKeys: true });
  if (predecessorBaseline?.contract !== "nkf.graph-baseline" || predecessorBaseline?.nkf_version !== nkfVersion) {
    fail(`The mechanical Task-transition conclusion requires a confirmed native NKF ${nkfVersion} predecessor baseline; the ordinary review-and-seal path is the recovery.`);
  }
  const records = await declarations(project);
  const result = await candidateGraph07(project, checkerPath, nkfVersion);
  const taskNode = { kind: "document", id: task };
  const taskKey = nodeKey07(taskNode);
  const priorRevisions = new Map(
    (predecessorBaseline.node_revisions ?? []).map((entry) => [nodeKey07(entry.node), entry.revision?.value]),
  );
  const candidateRevisions = new Map(result.nodes.map((entry) => [nodeKey07(entry.node), entry.revision.value]));
  const excess = [];
  for (const [key, revision] of candidateRevisions) {
    if (!priorRevisions.has(key)) excess.push(`added node ${key}`);
    else if (priorRevisions.get(key) !== revision && key !== taskKey) excess.push(`changed node ${key}`);
  }
  for (const key of priorRevisions.keys()) {
    if (!candidateRevisions.has(key)) excess.push(`removed node ${key}`);
  }
  if (!candidateRevisions.has(taskKey)) excess.push(`missing transitioned Task node ${taskKey}`);
  const candidateEdges = normalizedEdges(bundle, records);
  if (jcs(candidateEdges) !== jcs(predecessorBaseline.authored_edges ?? [])) excess.push("changed authored edges");
  if (jcs(bundle.external_dependencies ?? []) !== jcs(predecessorBaseline.external_dependencies ?? [])) {
    excess.push("changed external dependencies");
  }
  if (jcs(bundle.authority_inputs ?? []) !== jcs(predecessorBaseline.authority_inputs ?? [])) {
    excess.push("changed authority inputs");
  }
  if (excess.length > 0) {
    fail(
      "The mechanical Task-transition conclusion refuses a graph delta beyond the closed transition vocabulary: "
      + excess.sort((left, right) => left.localeCompare(right, "en")).join(", ")
      + ". Complete an ordinary whole-root or delta semantic review and seal instead.",
    );
  }
  const transition = { task, from_state: fromState, to_state: toState };
  const applicability = (predecessorBaseline.applicability_coverage ?? []).map((entry) => {
    const key = nodeKey07(entry.node);
    const revision = { algorithm: "sha-256", value: candidateRevisions.get(key) };
    return {
      ...structuredClone(entry),
      revision,
      provenance: {
        ...carriedProvenance(entry, predecessorBaseline),
        ...(key === taskKey ? { transition: structuredClone(transition) } : {}),
      },
    };
  });
  const taskJudgment = (predecessorBaseline.applicability_coverage ?? []).find(
    (entry) => nodeKey07(entry.node) === taskKey,
  );
  if (taskJudgment === undefined) {
    fail("The predecessor baseline carries no judgment for the transitioned Task node; the ordinary review-and-seal path is the recovery.");
  }
  const classifications = (predecessorBaseline.decision_classifications ?? []).map((entry) => ({
    ...structuredClone(entry),
    provenance: carriedProvenance(entry, predecessorBaseline),
  }));
  const baseline = {
    contract: "nkf.graph-baseline",
    nkf_version: nkfVersion,
    bundle: bundle.id,
    profile: bundle.root.profile,
    graph_revision: result.knowledge_graph.summary?.candidate_graph_revision ?? result.knowledge_graph.candidate_graph_revision,
    policy: { id: result.knowledge_graph.policy.identity, digest: result.knowledge_graph.policy.digest },
    version_delta: structuredClone(predecessorBaseline.version_delta),
    node_revisions: result.nodes.map((entry) => ({ node: entry.node, revision: entry.revision })),
    authored_edges: candidateEdges,
    external_dependencies: bundle.external_dependencies ?? [],
    authority_inputs: bundle.authority_inputs ?? [],
    relationship_coverage: structuredClone(predecessorBaseline.relationship_coverage ?? []),
    applicability_coverage: applicability,
    decision_classifications: classifications,
    promotion_reconciliation: structuredClone(predecessorBaseline.promotion_reconciliation ?? []),
    confirmation: {
      reviewer: { kind: "agent", id: "task-transition-operator" },
      reviewed_at: new Date().toISOString(),
      claim: "mechanically-concluded",
      transition: {
        ...structuredClone(transition),
        predecessor_graph_revision: structuredClone(predecessorBaseline.graph_revision),
      },
      observations: [{
        id: "transition-conclusion-observation",
        subject: taskNode,
        basis: structuredClone(taskJudgment.basis),
        finding: `The deterministic Task transition ${task} ${fromState} -> ${toState} concluded mechanically: every judgment carried, zero judgments performed.`,
      }],
      limitations: [
        `This is a mechanical conclusion of the ${task} ${fromState}-to-${toState} transition carrying every prior judgment with zero fresh semantic review; any semantic doubt requires the ordinary whole-root or delta semantic review and seal.`,
      ],
      disputed: false,
    },
  };
  await safeDirectory(project, [".nourd", "knowledge"], false);
  await safeDirectory(project, [".nourd", "knowledge", "freshness"], true);
  const bytes = Buffer.from(YAML.stringify(baseline, { lineWidth: 0, aliasDuplicateObjects: false }), "utf8");
  await writeFile(baselinePath, bytes);
  const sealed = await candidateGraph07(project, checkerPath, nkfVersion);
  const sealedRevision = sealed.knowledge_graph.summary?.candidate_graph_revision ?? sealed.knowledge_graph.candidate_graph_revision;
  if (sealedRevision?.value !== baseline.graph_revision.value) {
    fail("The sealed conclusion baseline does not bind the exact candidate graph revision.");
  }
  return {
    state: "concluded",
    claim: "mechanically-concluded",
    task,
    from_state: fromState,
    to_state: toState,
    graph_revision: baseline.graph_revision.value,
    predecessor_graph_revision: predecessorBaseline.graph_revision.value,
    carried: applicability.length,
    performed: 0,
    reviewer: baseline.confirmation.reviewer,
    reviewed_at: baseline.confirmation.reviewed_at,
  };
}
