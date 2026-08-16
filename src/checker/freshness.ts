import type { RuleEmitter } from "./diagnostics.js";
import type { MarkdownModel } from "./markdown.js";
import type { Observation } from "./project.js";
import type { RecordUnit } from "./semantic.js";
import type { ArtifactBinding, Diagnostic, ValidationRequest } from "./types.js";
import { asObject, jcs, sha256, utf16Compare, values } from "./util.js";

type NodeReference =
  | { kind: "record"; id: string }
  | { kind: "document"; id: string }
  | { kind: "entity"; record: string; entity: string };

interface DocumentUnit {
  index: number;
  declaration: Record<string, any>;
  observation: Observation;
  markdown?: MarkdownModel;
}

interface DigestValue {
  algorithm: "sha-256";
  value: string;
}

interface NodeRevision {
  node: NodeReference;
  revision: DigestValue;
}

interface NormalizedEdge {
  source: NodeReference;
  relationship: string;
  target: NodeReference;
  source_binding: Record<string, unknown>;
}

export interface KnowledgeGraphResult {
  summary: {
    policy: {
      identity: "nkf.freshness-policy.0.5" | "nkf.freshness-policy.0.6" | "nkf.freshness-policy.0.7";
      digest: DigestValue;
      binding: "verified" | "unavailable" | "mismatched";
    };
    candidate_graph_revision: DigestValue;
    baseline_graph_revision: DigestValue | null;
    baseline_state: "confirmed" | "missing" | "outdated" | "disputed" | "ambiguous" | "unsupported" | "not-evaluated";
    node_count: number;
    authored_edge_count: number;
    projection_counts: { full: number; applicable: number; current: number };
  };
  nodes: Array<{
    node: NodeReference;
    revision: DigestValue;
    applicability: "applicable" | "not-applicable" | "unknown";
    participation_role: "governs" | "proposes" | "realizes" | "evidences" | "context" | "history" | null;
    authority_eligibility: "eligible" | "ineligible" | "unknown";
    authority_binding: "verified" | "not-verified" | "contradicted" | "not-applicable";
    freshness: Array<{ result: "current" | "stale" | "expired" | "invalidated" | "unknown"; reasons: string[] }>;
    conformance: "passed" | "failed" | "not-evaluated";
    impact_selected: boolean;
    reason_paths: unknown[];
  }>;
  readiness: {
    purpose: ValidationRequest["purpose"];
    state: "ready" | "not-ready" | "not-evaluated";
    baseline_graph_revision: DigestValue | null;
    candidate_graph_revision: DigestValue | null;
    blocking_nodes: NodeReference[];
    blocking_rules: string[];
  };
  receipt: {
    context: Record<string, unknown>;
    result: Record<string, unknown>;
  } | null;
}

const digest = (value: string): DigestValue => ({ algorithm: "sha-256", value });
const nodeKey = (node: NodeReference): string => jcs(node);
const sortedByJcs = <T>(items: T[]): T[] =>
  [...items].sort((left, right) => utf16Compare(jcs(left), jcs(right)));

function normalizedProjection(value: unknown, path: string[] = []): unknown {
  if (Array.isArray(value)) {
    const projected = value.map((item) => normalizedProjection(item, path));
    const preserve =
      path.at(-1) === "sections" ||
      path.at(-1) === "heading_path" ||
      (path.at(-2) === "provenance" && path.at(-1) === "sources");
    return preserve ? projected : sortedByJcs(projected);
  }
  const object = asObject(value);
  if (object === null) return value;
  return Object.fromEntries(
    Object.entries(object).map(([key, member]) => [key, normalizedProjection(member, [...path, key])]),
  );
}

const RECORD_PROJECTION_FIELDS = [
  "type", "body_contract", "title", "governance", "scope", "sections", "relationships",
  "provenance", "external_authorities", "entities", "entity_relationships", "bindings", "task",
  "design_disposition", "design_decisions", "superseded_by", "withdrawal_source",
  "proposal_authority_effect", "proposal_evidence", "implementation_evidence",
  "confirmation_status", "confirmation_decisions", "unconfirmed_scope", "freshness", "extensions",
] as const;

const DOCUMENT_PROJECTION_FIELDS = [
  "kind", "state", "relationships", "freshness", "owner", "decision_authority", "related_tasks",
] as const;

function projection(source: Record<string, any>, fields: readonly string[]): Record<string, unknown> {
  return Object.fromEntries(
    fields.filter((field) => Object.prototype.hasOwnProperty.call(source, field))
      .map((field) => [field, normalizedProjection(source[field], [field])]),
  );
}

function asNodeReference(value: unknown): NodeReference | null {
  const object = asObject(value);
  if (object?.kind === "record" && typeof object.id === "string") return { kind: "record", id: object.id };
  if (object?.kind === "document" && typeof object.id === "string") return { kind: "document", id: object.id };
  if (object?.kind === "entity" && typeof object.record === "string" && typeof object.entity === "string") {
    return { kind: "entity", record: object.record, entity: object.entity };
  }
  return null;
}

function sectionAuthority(record: RecordUnit, sectionId: unknown): string | null {
  return values<Record<string, any>>(record.declaration.sections)
    .find((section) => section.id === sectionId)?.authority ?? null;
}

function relationshipCycle(edges: NormalizedEdge[], relationship: string): boolean {
  const adjacency = new Map<string, string[]>();
  for (const edge of edges.filter((candidate) => candidate.relationship === relationship)) {
    const source = nodeKey(edge.source);
    const target = nodeKey(edge.target);
    const targets = adjacency.get(source) ?? [];
    targets.push(target);
    adjacency.set(source, targets);
  }
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (node: string): boolean => {
    if (visiting.has(node)) return true;
    if (visited.has(node)) return false;
    visiting.add(node);
    if ((adjacency.get(node) ?? []).some(visit)) return true;
    visiting.delete(node);
    visited.add(node);
    return false;
  };
  return [...adjacency.keys()].some(visit);
}

function validateDocument(
  unit: DocumentUnit,
  emitter: RuleEmitter,
  knownNodeKeys: Set<string>,
): void {
  const nonRecord = unit.declaration;
  const document = asObject(nonRecord.document);
  if (document === null) return;
  const id = String(document.id);
  const node = { kind: "document", id } as const;
  if (document.stable_path !== nonRecord.path) {
    emitter.emit("knowledge.path.stability.invalid", "The document stable path must equal its enclosing canonical non-record path.", {
      artifact: ".nourd/knowledge/bundle.yaml", node_id: nodeKey(node), instance_pointer: `/non_records/${unit.index}/document/stable_path`,
    });
  }
  if (unit.observation.bytes !== null && document.digest?.value !== sha256(unit.observation.bytes)) {
    emitter.emit("document.digest-mismatch", "The document digest does not bind the exact represented Markdown bytes.", {
      artifact: unit.observation.entry.path, node_id: nodeKey(node),
    });
  }
  if (nonRecord.kind === "task") {
    if (document.state?.vocabulary !== "task-status" || !["active", "deferred", "completed", "cancelled"].includes(String(document.state?.value))) {
      emitter.emit("document.state.invalid", "A Task document requires one valid task-status state declaration.", {
        artifact: ".nourd/knowledge/bundle.yaml", node_id: nodeKey(node), instance_pointer: `/non_records/${unit.index}/document/state`,
      });
    }
    const lock = asObject(document.legacy_lock);
    if (lock !== null && (
      lock.predecessor_state?.task_id !== id ||
      lock.initial_declaration_state?.document_state?.value !== lock.predecessor_state?.task_status
    )) {
      emitter.emit("document.state.invalid", "The legacy-locked Task identity or state does not equal its document declaration.", {
        artifact: unit.observation.entry.path, node_id: nodeKey(node),
      });
    }
  } else if (["evidence", "navigation", "other"].includes(String(nonRecord.kind)) && document.state !== undefined) {
    emitter.emit("document.state.invalid", "This document kind cannot declare Task lifecycle state.", {
      artifact: ".nourd/knowledge/bundle.yaml", node_id: nodeKey(node), instance_pointer: `/non_records/${unit.index}/document/state`,
    });
  }
  values<Record<string, any>>(document.relationships).forEach((relationship, index) => {
    const target = asNodeReference(relationship.target);
    if (target === null || !knownNodeKeys.has(nodeKey(target))) {
      emitter.emit("graph.node.unresolved", "The document relationship target does not resolve exactly once.", {
        artifact: ".nourd/knowledge/bundle.yaml", node_id: nodeKey(node), instance_pointer: `/non_records/${unit.index}/document/relationships/${index}/target`,
      });
    }
    const heading = asObject(relationship.source_heading);
    const resolved = unit.markdown?.sections.filter((candidate) =>
      jcs(candidate.path) === jcs(heading?.heading_path) && candidate.occurrence === heading?.occurrence,
    ).length ?? 0;
    if (resolved !== 1) {
      emitter.emit("graph.relationship.section-unresolved", "The document relationship heading does not resolve exactly once.", {
        artifact: unit.observation.entry.path, node_id: nodeKey(node), instance_pointer: `/non_records/${unit.index}/document/relationships/${index}/source_heading`,
      });
    }
  });
}

function completenessState(
  baseline: Record<string, any>,
  nodeRevisions: NodeRevision[],
  edges: NormalizedEdge[],
  relationships: string[],
  decisions: string[],
): "confirmed" | "ambiguous" | "unsupported" {
  const nodeEntries = values<Record<string, any>>(baseline.node_revisions);
  const nodeKeys = nodeEntries.map((entry) => nodeKey(entry.node as NodeReference));
  if (new Set(nodeKeys).size !== nodeKeys.length) return "ambiguous";
  if (jcs(sortedByJcs(nodeEntries)) !== jcs(sortedByJcs(nodeRevisions))) return "unsupported";
  if (jcs(sortedByJcs(values(baseline.authored_edges))) !== jcs(sortedByJcs(edges))) return "unsupported";
  const coverage = values<Record<string, any>>(baseline.relationship_coverage).map((entry) => entry.relationship);
  if (new Set(coverage).size !== relationships.length || relationships.some((item) => !coverage.includes(item))) return "unsupported";
  const applicability = values<Record<string, any>>(baseline.applicability_coverage);
  const purposes = ["change-impact", "whole-root-readiness", "consequential-use"];
  const expectedApplicability = nodeRevisions.length * purposes.length;
  const applicabilityKeys = applicability.map((entry) => `${nodeKey(entry.node as NodeReference)}\u0000${entry.purpose}`);
  if (applicability.length !== expectedApplicability || new Set(applicabilityKeys).size !== expectedApplicability) return "unsupported";
  const classifications = values<Record<string, any>>(baseline.decision_classifications);
  const classificationKeys = classifications.map((entry) => `${entry.decision}\u0000${entry.purpose}`);
  if (classifications.length !== decisions.length * purposes.length || new Set(classificationKeys).size !== classifications.length) return "unsupported";
  if (baseline.confirmation?.disputed !== false) return "ambiguous";
  return "confirmed";
}

function changedNodeKeys(
  request: ValidationRequest,
  baseline: Record<string, any> | null,
  candidate: NodeRevision[],
  bundle: Record<string, any>,
): Set<string> {
  const selected = new Set<string>();
  const baselineNodes = new Map(values<Record<string, any>>(baseline?.node_revisions).map((entry) => [nodeKey(entry.node as NodeReference), entry.revision?.value]));
  for (const entry of candidate) {
    if (baselineNodes.get(nodeKey(entry.node)) !== entry.revision.value) selected.add(nodeKey(entry.node));
    baselineNodes.delete(nodeKey(entry.node));
  }
  for (const key of baselineNodes.keys()) selected.add(key);
  for (const changed of values<Record<string, any>>(request.changed_inputs)) {
    const direct = asNodeReference(changed.node);
    if (changed.kind === "node" && direct !== null) selected.add(nodeKey(direct));
    const edge = asObject(changed.edge);
    if (changed.kind === "authored-edge" && edge !== null) {
      const source = asNodeReference(edge.source);
      const target = asNodeReference(edge.target);
      if (source !== null) selected.add(nodeKey(source));
      if (target !== null) selected.add(nodeKey(target));
    }
    if (changed.kind === "governed-artifact") {
      const artifact = values<Record<string, any>>(bundle.governed_artifacts).find((item) => item.id === changed.id);
      if (typeof artifact?.record === "string") selected.add(nodeKey({ kind: "record", id: artifact.record }));
    }
    if (changed.kind === "external-dependency") {
      const dependency = values<Record<string, any>>(bundle.external_dependencies).find((item) => item.id === changed.id);
      const dependent = asNodeReference(dependency?.dependent);
      if (dependent !== null) selected.add(nodeKey(dependent));
    }
    if (changed.kind === "authority-input") {
      const authority = values<Record<string, any>>(bundle.authority_inputs).find((item) => item.id === changed.id);
      const subject = asNodeReference(authority?.subject);
      if (subject !== null) selected.add(nodeKey(subject));
    }
  }
  return selected;
}

function expandImpact(
  initial: Set<string>,
  edges: NormalizedEdge[],
  policy: Record<string, any>,
  purpose: string,
): Set<string> {
  const result = new Set(initial);
  const mappings = new Map(values<Record<string, any>>(policy.mappings).map((entry) => [entry.relationship, entry]));
  let changed = true;
  while (changed) {
    changed = false;
    for (const edge of edges) {
      const mapping = mappings.get(edge.relationship);
      if (mapping === undefined || !values<string>(mapping.purposes).includes(purpose) || mapping.class === "context") continue;
      const source = nodeKey(edge.source);
      const target = nodeKey(edge.target);
      const add = (key: string) => { if (!result.has(key)) { result.add(key); changed = true; } };
      if ((mapping.propagation === "source-to-target" || mapping.propagation === "both") && result.has(source)) add(target);
      if ((mapping.propagation === "target-to-source" || mapping.propagation === "both") && result.has(target)) add(source);
    }
  }
  return result;
}

function initialChangeSeeds(
  request: ValidationRequest,
  baseline: Record<string, any> | null,
  candidate: NodeRevision[],
  bundle: Record<string, any>,
): Array<{ input: Record<string, unknown>; node: NodeReference }> {
  const seeds: Array<{ input: Record<string, unknown>; node: NodeReference }> = [];
  const add = (input: Record<string, unknown>, node: NodeReference | null) => {
    if (node !== null) seeds.push({ input, node });
  };
  const baselineNodes = new Map(
    values<Record<string, any>>(baseline?.node_revisions)
      .map((entry) => [nodeKey(entry.node as NodeReference), entry.revision?.value]),
  );
  for (const entry of candidate) {
    if (baselineNodes.get(nodeKey(entry.node)) !== entry.revision.value) {
      add({ kind: "node", node: entry.node }, entry.node);
    }
    baselineNodes.delete(nodeKey(entry.node));
  }
  for (const key of baselineNodes.keys()) {
    const parsed = JSON.parse(key) as NodeReference;
    add({ kind: "node", node: parsed }, parsed);
  }
  for (const changed of values<Record<string, any>>(request.changed_inputs)) {
    if (changed.kind === "node") add(changed, asNodeReference(changed.node));
    const edge = asObject(changed.edge);
    if (changed.kind === "authored-edge" && edge !== null) {
      add(changed, asNodeReference(edge.source));
      add(changed, asNodeReference(edge.target));
    }
    if (changed.kind === "governed-artifact") {
      const artifact = values<Record<string, any>>(bundle.governed_artifacts).find((item) => item.id === changed.id);
      add(changed, typeof artifact?.record === "string" ? { kind: "record", id: artifact.record } : null);
    }
    if (changed.kind === "external-dependency" || changed.kind === "external-observation") {
      const dependency = values<Record<string, any>>(bundle.external_dependencies).find((item) =>
        item.id === changed.id || item.observability?.observation_id === changed.id,
      );
      add(changed, asNodeReference(dependency?.dependent));
    }
    if (changed.kind === "authority-input" || changed.kind === "authority-observation") {
      const authority = values<Record<string, any>>(bundle.authority_inputs).find((item) =>
        item.id === changed.id || item.observation_id === changed.id,
      );
      add(changed, asNodeReference(authority?.subject));
    }
  }
  const unique = new Map<string, { input: Record<string, unknown>; node: NodeReference }>();
  for (const seed of seeds) unique.set(`${jcs(seed.input)}\u0000${nodeKey(seed.node)}`, seed);
  return [...unique.values()].sort((left, right) => utf16Compare(
    `${jcs(left.input)}\u0000${nodeKey(left.node)}`,
    `${jcs(right.input)}\u0000${nodeKey(right.node)}`,
  ));
}

function reasonPaths(
  request: ValidationRequest,
  baseline: Record<string, any> | null,
  candidate: NodeRevision[],
  bundle: Record<string, any>,
  edges: NormalizedEdge[],
  policy: Record<string, any>,
  purpose: string,
  selected: Set<string>,
): Array<Record<string, unknown>> {
  const mappings = new Map(values<Record<string, any>>(policy.mappings).map((entry) => [entry.relationship, entry]));
  const adjacency = new Map<string, Array<{ next: NodeReference; relationship: string }>>();
  const add = (from: NodeReference, next: NodeReference, relationship: string) => {
    const list = adjacency.get(nodeKey(from)) ?? [];
    list.push({ next, relationship });
    adjacency.set(nodeKey(from), list);
  };
  for (const edge of edges) {
    const mapping = mappings.get(edge.relationship);
    if (mapping === undefined || !values<string>(mapping.purposes).includes(purpose) || mapping.class === "context") continue;
    if (mapping.propagation === "source-to-target" || mapping.propagation === "both") add(edge.source, edge.target, edge.relationship);
    if (mapping.propagation === "target-to-source" || mapping.propagation === "both") add(edge.target, edge.source, edge.relationship);
  }
  for (const list of adjacency.values()) {
    list.sort((left, right) => utf16Compare(`${nodeKey(left.next)}\u0000${left.relationship}`, `${nodeKey(right.next)}\u0000${right.relationship}`));
  }
  const best = new Map<string, Record<string, unknown>>();
  for (const seed of initialChangeSeeds(request, baseline, candidate, bundle)) {
    const queue: Array<{ node: NodeReference; nodes: NodeReference[]; relationships: string[] }> = [
      { node: seed.node, nodes: [seed.node], relationships: [] },
    ];
    const distance = new Map<string, number>([[nodeKey(seed.node), 0]]);
    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentKey = nodeKey(current.node);
      if (selected.has(currentKey)) {
        const entry = {
          initial_change: seed.input,
          target: current.node,
          nodes: current.nodes,
          relationships: current.relationships,
        };
        const key = `${jcs(seed.input)}\u0000${currentKey}`;
        const prior = best.get(key);
        if (prior === undefined || current.relationships.length < values(prior.relationships).length ||
          (current.relationships.length === values(prior.relationships).length && utf16Compare(jcs(entry), jcs(prior)) < 0)) {
          best.set(key, entry);
        }
      }
      for (const step of adjacency.get(currentKey) ?? []) {
        const nextKey = nodeKey(step.next);
        const nextDistance = current.relationships.length + 1;
        if ((distance.get(nextKey) ?? Number.POSITIVE_INFINITY) < nextDistance) continue;
        distance.set(nextKey, nextDistance);
        queue.push({
          node: step.next,
          nodes: [...current.nodes, step.next],
          relationships: [...current.relationships, step.relationship],
        });
      }
    }
  }
  return [...best.values()].sort((left, right) => {
    const length = values(left.relationships).length - values(right.relationships).length;
    return length === 0 ? utf16Compare(jcs(left), jcs(right)) : length;
  });
}

function detectedCycles(edges: NormalizedEdge[]): Array<Record<string, unknown>> {
  const adjacency = new Map<string, Array<{ node: NodeReference; relationship: string }>>();
  const nodes = new Map<string, NodeReference>();
  for (const edge of edges) {
    nodes.set(nodeKey(edge.source), edge.source);
    nodes.set(nodeKey(edge.target), edge.target);
    const list = adjacency.get(nodeKey(edge.source)) ?? [];
    list.push({ node: edge.target, relationship: edge.relationship });
    adjacency.set(nodeKey(edge.source), list);
  }
  const cycles = new Map<string, Record<string, unknown>>();
  const orderedKeys = [...nodes.keys()].sort(utf16Compare);
  for (const start of orderedKeys) {
    const visit = (current: string, pathNodes: NodeReference[], relationships: string[], seen: Set<string>) => {
      for (const step of adjacency.get(current) ?? []) {
        const next = nodeKey(step.node);
        if (next === start && pathNodes.length >= 2) {
          const cycleNodes = [...pathNodes];
          const cycleRelationships = [...relationships, step.relationship];
          const rotations = cycleNodes.map((_, index) => ({
            nodes: [...cycleNodes.slice(index), ...cycleNodes.slice(0, index)],
            relationships: [...cycleRelationships.slice(index), ...cycleRelationships.slice(0, index)],
          }));
          rotations.sort((left, right) => utf16Compare(jcs(left), jcs(right)));
          const canonical = rotations[0]!;
          cycles.set(jcs(canonical), canonical);
        } else if (!seen.has(next) && pathNodes.length < nodes.size) {
          visit(next, [...pathNodes, step.node], [...relationships, step.relationship], new Set([...seen, next]));
        }
      }
    };
    visit(start, [nodes.get(start)!], [], new Set([start]));
  }
  return [...cycles.values()].sort((left, right) => utf16Compare(jcs(left), jcs(right)));
}

function verifyDigestBoundBaseline(
  baseline: Record<string, any>,
  nodeRevisions: NodeRevision[],
  recordById: Map<string, RecordUnit>,
  emitter: RuleEmitter,
  versionDeltaDigest: string | null,
  bundle: Record<string, any>,
): "confirmed" | "outdated" | "unsupported" {
  const artifact = String(bundle.knowledge_graph?.baseline);
  // The accepted version-delta declaration is digest-bound into the baseline.
  if (versionDeltaDigest === null || baseline.version_delta?.digest?.value !== versionDeltaDigest) {
    emitter.emit("version-delta.binding-mismatch", "The baseline does not bind the exact accepted version-delta declaration.", { artifact });
    return "unsupported";
  }
  const revisionByNode = new Map(nodeRevisions.map((entry) => [nodeKey(entry.node), entry.revision.value]));
  let stale = false;
  const verifyProvenance = (entry: Record<string, any>, label: string): boolean => {
    const provenance = asObject(entry.provenance);
    const performed = provenance?.performed === true && provenance.carried === undefined;
    const carried = asObject(provenance?.carried);
    const carriedValid = carried !== null
      && typeof carried.performed_in_graph_revision?.value === "string"
      && typeof carried.performing_reviewer?.id === "string";
    if (!performed && !carriedValid) {
      emitter.emit("freshness.baseline.provenance-invalid", `A ${label} judgment carries no valid performed or carried provenance.`, { artifact });
      return false;
    }
    return true;
  };
  for (const entry of values<Record<string, any>>(baseline.applicability_coverage)) {
    if (!verifyProvenance(entry, "node applicability")) return "unsupported";
    const current = revisionByNode.get(nodeKey(entry.node as NodeReference));
    if (entry.revision?.value !== current) stale = true;
  }
  for (const entry of values<Record<string, any>>(baseline.decision_classifications)) {
    if (!verifyProvenance(entry, "Decision classification")) return "unsupported";
    const record = recordById.get(String(entry.decision));
    const declared = record === null || record === undefined ? undefined : sha256(Buffer.from(jcs(normalizedProjection(record.declaration)), "utf8"));
    if (entry.decision_digest?.value !== declared) stale = true;
  }
  if (stale) {
    emitter.emit("freshness.baseline.judgment-digest-mismatch", "A baseline judgment binds a node revision or Decision digest that no longer matches the candidate.", { artifact });
    return "outdated";
  }
  const confirmation = asObject(baseline.confirmation) ?? {};
  if (confirmation.claim === "semantically-reviewed-delta") {
    const performedSet = new Set(values<NodeReference>(confirmation.performed_set).map(nodeKey));
    const closure = values<NodeReference>(confirmation.computed_closure).map(nodeKey);
    const markedPerformed = new Set(
      values<Record<string, any>>(baseline.applicability_coverage)
        .filter((entry) => asObject(entry.provenance)?.performed === true)
        .map((entry) => nodeKey(entry.node as NodeReference)),
    );
    for (const key of performedSet) {
      if (!markedPerformed.has(key)) {
        emitter.emit("freshness.claim.computed-closure-mismatch", "The delta claim performed set disagrees with the judgment provenance markers.", { artifact });
        return "unsupported";
      }
    }
    const missing = closure.filter((key) => !performedSet.has(key));
    if (missing.length > 0) {
      emitter.emit("freshness.claim.delta-closure-not-contained", `The delta claim performed set does not contain the computed closure: ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? ", …" : ""}.`, { artifact });
      return "unsupported";
    }
  }
  const pending = values<Record<string, any>>(baseline.promotion_reconciliation).filter((entry) => entry.state === "pending");
  for (const entry of pending) {
    emitter.emit("freshness.reconciliation.pending", `A promotion-reconciliation entry is pending for ${nodeKey(entry.node as NodeReference)}.`, { artifact });
  }
  return "confirmed";
}

export function evaluateKnowledgeGraph(args: {
  nkfVersion: "0.5" | "0.6" | "0.7";
  bundle: Record<string, any>;
  records: RecordUnit[];
  documents: DocumentUnit[];
  executable: Record<string, any>;
  policy: Record<string, any> | null;
  policyBinding: ArtifactBinding | undefined;
  baseline: Record<string, any> | null;
  baselinePresent: boolean;
  request: ValidationRequest;
  diagnostics: Diagnostic[];
  emitter: RuleEmitter;
  selectedReceipt?: Record<string, any> | null;
  versionDeltaDigest?: string | null;
}): KnowledgeGraphResult {
  const { nkfVersion, bundle, records, documents, executable, policy, policyBinding, baseline, request, diagnostics, emitter } = args;
  const policyId = `nkf.freshness-policy.${nkfVersion}` as const;
  const policyDigest = policyBinding?.expected_sha256 ?? "0".repeat(64);
  const policyState = policyBinding?.binding === "verified" && policy !== null
    ? "verified" as const
    : policyBinding?.binding === "mismatched" ? "mismatched" as const : "unavailable" as const;
  if (policyState === "unavailable") emitter.emit("graph.policy.unavailable", `The immutable NKF ${nkfVersion} freshness policy is unavailable.`);
  if (policyState === "mismatched") emitter.emit("graph.policy.binding-mismatch", "The freshness policy does not match its accepted digest.");

  const nodeRevisions: NodeRevision[] = [];
  const nodeKeys = new Set<string>();
  const recordById = new Map<string, RecordUnit>();
  for (const record of records) {
    const id = String(record.declaration.id);
    recordById.set(id, record);
    if (record.declaration.source?.stable_path !== record.declaration.source?.path) {
      emitter.emit("knowledge.path.stability.invalid", "A record stable path must equal its canonical source path.", {
        artifact: record.artifact, record_id: id, instance_pointer: "/source/stable_path",
      });
    }
    const node: NodeReference = { kind: "record", id };
    const input = { kind: "record", id, source_sha256: record.sourceDigest ?? "", declaration: projection(record.declaration, RECORD_PROJECTION_FIELDS) };
    nodeRevisions.push({ node, revision: digest(sha256(Buffer.from(jcs(input), "utf8"))) });
    nodeKeys.add(nodeKey(node));
  }
  for (const unit of documents) {
    const document = asObject(unit.declaration.document);
    if (document === null) continue;
    const node: NodeReference = { kind: "document", id: String(document.id) };
    if (nodeKeys.has(nodeKey(node))) emitter.emit("document.id.duplicate", "A document node ID collides with another record or document node.", { node_id: nodeKey(node) });
    nodeKeys.add(nodeKey(node));
    const input = { kind: "document", id: document.id, source_sha256: unit.observation.entry.content_sha256 ?? "", declaration: projection({ kind: unit.declaration.kind, ...document }, DOCUMENT_PROJECTION_FIELDS) };
    nodeRevisions.push({ node, revision: digest(sha256(Buffer.from(jcs(input), "utf8"))) });
  }
  for (const record of records) {
    const recordRevision = nodeRevisions.find((entry) => nodeKey(entry.node) === nodeKey({ kind: "record", id: String(record.declaration.id) }))?.revision.value ?? "";
    for (const entity of values<Record<string, any>>(record.declaration.entities)) {
      const node: NodeReference = { kind: "entity", record: String(record.declaration.id), entity: String(entity.id) };
      if (nodeKeys.has(nodeKey(node))) emitter.emit("graph.node.duplicate", "A graph node identity is duplicated.", { node_id: nodeKey(node) });
      nodeKeys.add(nodeKey(node));
      const input = { kind: "entity", record: record.declaration.id, entity: entity.id, record_revision: recordRevision, declaration: normalizedProjection(entity) };
      nodeRevisions.push({ node, revision: digest(sha256(Buffer.from(jcs(input), "utf8"))) });
    }
  }
  nodeRevisions.sort((left, right) => utf16Compare(nodeKey(left.node), nodeKey(right.node)));
  for (const document of documents) validateDocument(document, emitter, nodeKeys);

  const edges: NormalizedEdge[] = [];
  const edgeSources = new Map<string, { authority: string | null; record?: RecordUnit; documentKind?: string }>();
  for (const record of records) {
    const source: NodeReference = { kind: "record", id: String(record.declaration.id) };
    for (const relationship of values<Record<string, any>>(record.declaration.relationships)) {
      const edge: NormalizedEdge = {
        source, relationship: String(relationship.type), target: { kind: "record", id: String(relationship.target) },
        source_binding: { kind: "section", node: source, section: relationship.source_section },
      };
      edges.push(edge);
      edgeSources.set(jcs(edge), { authority: sectionAuthority(record, relationship.source_section), record });
    }
    for (const relationship of values<Record<string, any>>(record.declaration.entity_relationships)) {
      const source: NodeReference = { kind: "entity", record: String(relationship.source?.record), entity: String(relationship.source?.entity) };
      const target: NodeReference = { kind: "entity", record: String(relationship.target?.record), entity: String(relationship.target?.entity) };
      const edge: NormalizedEdge = { source, relationship: String(relationship.type), target, source_binding: { kind: "section", node: source, section: relationship.source_section } };
      edges.push(edge);
      edgeSources.set(jcs(edge), { authority: sectionAuthority(record, relationship.source_section), record });
    }
  }
  for (const unit of documents) {
    const document = asObject(unit.declaration.document);
    if (document === null) continue;
    const source: NodeReference = { kind: "document", id: String(document.id) };
    for (const relationship of values<Record<string, any>>(document.relationships)) {
      const target = asNodeReference(relationship.target);
      if (target === null) continue;
      const edge: NormalizedEdge = { source, relationship: String(relationship.type), target, source_binding: { kind: "heading", node: source, heading: relationship.source_heading } };
      edges.push(edge);
      edgeSources.set(jcs(edge), { authority: "document-meaning", documentKind: String(unit.declaration.kind) });
    }
  }
  edges.sort((left, right) => utf16Compare(jcs(left), jcs(right)));
  const seenEdges = new Set<string>();
  for (const edge of edges) {
    const key = jcs(edge);
    if (seenEdges.has(key)) emitter.emit("graph.relationship.duplicate", "An exact normalized authored graph edge is duplicated.", { node_id: nodeKey(edge.source) });
    seenEdges.add(key);
    if (!nodeKeys.has(nodeKey(edge.source)) || !nodeKeys.has(nodeKey(edge.target))) {
      emitter.emit("graph.node.unresolved", "A normalized authored graph edge endpoint does not resolve.", { node_id: nodeKey(edge.source) });
    }
    if (nodeKey(edge.source) === nodeKey(edge.target)) emitter.emit("graph.relationship.endpoint-invalid", "This authored relationship forbids a self edge.", { node_id: nodeKey(edge.source) });
    const vocabulary = executable.vocabularies?.graph_relationship_types?.[edge.relationship];
    const sourceInfo = edgeSources.get(key);
    if (vocabulary === undefined) {
      emitter.emit("graph.relationship.policy-unsupported", `The graph relationship has no immutable NKF ${nkfVersion} vocabulary and policy entry.`, { node_id: nodeKey(edge.source) });
      continue;
    }
    if (!values<string>(vocabulary.source_kinds).includes(edge.source.kind) || !values<string>(vocabulary.target_kinds).includes(edge.target.kind)) {
      emitter.emit("graph.relationship.endpoint-invalid", "The relationship endpoint kinds violate the frozen vocabulary.", { node_id: nodeKey(edge.source) });
    }
    if (vocabulary.same_kind_required === true && edge.source.kind !== edge.target.kind) {
      emitter.emit("graph.relationship.endpoint-invalid", "The relationship requires source and target to use the same node kind.", { node_id: nodeKey(edge.source) });
    }
    const allowedAuthorities = values<string>(vocabulary.source_authorities);
    if (!allowedAuthorities.includes(String(sourceInfo?.authority))) {
      emitter.emit("graph.relationship.authority-invalid", "The relationship source authority is not permitted by the frozen vocabulary.", { node_id: nodeKey(edge.source) });
    }
    if (edge.relationship === "governs" && sourceInfo?.record?.declaration.governance?.status !== "accepted") {
      emitter.emit("graph.relationship.authority-invalid", "Only an accepted record section may author a governs edge.", { node_id: nodeKey(edge.source) });
    }
    if (edge.relationship === "evidences" && sourceInfo?.record?.declaration.body_contract !== "nkf.evidence" && sourceInfo?.documentKind !== "evidence") {
      emitter.emit("graph.relationship.authority-invalid", "Only Evidence meaning may author an evidences edge.", { node_id: nodeKey(edge.source) });
    }
    const reverse = { ...edge, source: edge.target, target: edge.source };
    if (seenEdges.has(jcs(reverse))) emitter.emit("graph.relationship.inverse-authored", "An inverse of the same authored relationship fact is also authored.", { node_id: nodeKey(edge.source) });
  }
  for (const [relationship, entry] of Object.entries<Record<string, any>>(executable.vocabularies?.graph_relationship_types ?? {})) {
    if (entry.cycles === "forbidden" && relationshipCycle(edges, relationship)) {
      emitter.emit("graph.relationship.cycle-invalid", `The ${relationship} relationship graph contains a forbidden cycle.`);
    }
  }

  const graphInput = {
    contract: "nkf.graph-revision", nkf_version: nkfVersion, bundle: bundle.id,
    profile: bundle.root?.profile, nodes: nodeRevisions, edges,
    external_dependencies: sortedByJcs(values(bundle.external_dependencies)),
    authority_inputs: sortedByJcs(values(bundle.authority_inputs)),
    policy: { id: policyId, sha256: policyDigest },
  };
  const candidateRevision = digest(sha256(Buffer.from(jcs(graphInput), "utf8")));
  let baselineState: KnowledgeGraphResult["summary"]["baseline_state"] = request.purpose === null || request.purpose === undefined ? "not-evaluated" : "missing";
  const baselineRevision = baseline?.graph_revision?.value === undefined ? null : digest(String(baseline.graph_revision.value));
  const relationshipNames = Object.keys(executable.vocabularies?.graph_relationship_types ?? {});
  const decisions = records.filter((record) => record.declaration.type === "decision" && record.declaration.governance?.status === "accepted").map((record) => String(record.declaration.id));
  if (request.purpose !== null && request.purpose !== undefined && baseline !== null) {
    const internalInput = { ...graphInput, nodes: values(baseline.node_revisions), edges: values(baseline.authored_edges), external_dependencies: values(baseline.external_dependencies), authority_inputs: values(baseline.authority_inputs) };
    const declaredInternalRevision = sha256(Buffer.from(jcs(internalInput), "utf8"));
    if (declaredInternalRevision !== baseline.graph_revision?.value) {
      emitter.emit("graph.revision.mismatch", "The baseline graph revision does not equal its own exact bound graph inputs.", { artifact: String(bundle.knowledge_graph?.baseline) });
      baselineState = "unsupported";
    } else if (baseline.policy?.id !== policyId || baseline.policy?.digest?.value !== policyDigest || baseline.bundle !== bundle.id || baseline.profile !== bundle.root?.profile) {
      baselineState = "outdated";
    } else {
      baselineState = completenessState(baseline, nodeRevisions, edges, relationshipNames, decisions);
      if (baselineState === "confirmed" && baseline.graph_revision?.value !== candidateRevision.value) baselineState = "outdated";
      if (baseline.confirmation?.disputed === true) baselineState = "disputed";
      if (nkfVersion === "0.7" && baselineState === "confirmed") {
        baselineState = verifyDigestBoundBaseline(baseline, nodeRevisions, recordById, emitter, args.versionDeltaDigest ?? null, bundle);
      }
    }
  }

  const baselineRule: Partial<Record<typeof baselineState, string>> = {
    missing: "freshness.baseline.missing", outdated: "freshness.baseline.outdated", disputed: "freshness.baseline.disputed",
    ambiguous: "freshness.baseline.ambiguous", unsupported: "freshness.baseline.unsupported",
  };
  if (request.purpose !== null && request.purpose !== undefined) {
    if (!args.baselinePresent) baselineState = "missing";
    const rule = baselineRule[baselineState];
    if (rule !== undefined) emitter.emit(rule, `The reviewed graph baseline is ${baselineState}.`, { artifact: String(bundle.knowledge_graph?.baseline) });
  }

  const eligibility = new Map<string, Record<string, any>>();
  if (baseline !== null && request.purpose !== null && request.purpose !== undefined && request.purpose !== "historical-reproduction") {
    for (const entry of values<Record<string, any>>(baseline.applicability_coverage)) {
      if (entry.purpose === request.purpose) eligibility.set(nodeKey(entry.node as NodeReference), entry);
    }
  }
  let selected = new Set<string>();
  if (request.purpose === "whole-root-readiness") {
    selected = new Set([...eligibility].filter(([, entry]) => entry.state === "eligible").map(([key]) => key));
  } else if (request.purpose === "change-impact") {
    selected = expandImpact(changedNodeKeys(request, baseline, nodeRevisions, bundle), edges, policy ?? {}, request.purpose);
  } else if (request.purpose === "consequential-use") {
    selected = expandImpact(new Set(values<NodeReference>(request.targets).map(nodeKey)), edges, policy ?? {}, request.purpose);
  } else if (request.purpose === "historical-reproduction") {
    selected = new Set(values<NodeReference>(args.selectedReceipt?.context?.candidate_universe).map(nodeKey));
  }

  const computedReasonPaths = request.purpose === "change-impact"
    ? reasonPaths(request, baseline, nodeRevisions, bundle, edges, policy ?? {}, request.purpose, selected)
    : [];

  const observationBlockers = new Map<string, string[]>();
  const observations = new Map(values<Record<string, any>>(request.observations).map((item) => [String(item.id), item]));
  for (const dependency of values<Record<string, any>>(bundle.external_dependencies)) {
    const dependent = asNodeReference(dependency.dependent);
    if (dependent === null || (request.purpose !== "whole-root-readiness" && !selected.has(nodeKey(dependent)))) continue;
    const observation = observations.get(String(dependency.observability?.observation_id));
    if (
      observation?.kind !== "external" ||
      observation.subject !== dependency.observability?.observation_id ||
      observation.observed_revision !== dependency.revision?.exact
    ) {
      const key = nodeKey(dependent);
      observationBlockers.set(key, [...(observationBlockers.get(key) ?? []), `external-observation-${dependency.id}`]);
      emitter.emit("freshness.observation.missing", "A required external dependency observation is absent or does not bind its exact declared revision.", { node_id: key });
    }
  }
  for (const authority of values<Record<string, any>>(bundle.authority_inputs)) {
    const subject = asNodeReference(authority.subject);
    if (subject === null || (request.purpose !== "whole-root-readiness" && !selected.has(nodeKey(subject)))) continue;
    const observation = observations.get(String(authority.observation_id));
    if (
      observation?.kind !== "authority" ||
      observation.subject !== authority.observation_id ||
      observation.observed_revision !== authority.expected_revision
    ) {
      const key = nodeKey(subject);
      observationBlockers.set(key, [...(observationBlockers.get(key) ?? []), `authority-observation-${authority.id}`]);
      emitter.emit("freshness.observation.missing", "A required authority observation is absent or does not bind its exact declared revision.", { node_id: key });
    }
  }

  if (baseline !== null && request.purpose !== null && request.purpose !== undefined && request.purpose !== "historical-reproduction") {
    for (const classification of values<Record<string, any>>(baseline.decision_classifications)) {
      if (classification.purpose !== request.purpose || classification.classification !== "conflicts") continue;
      const decisionKey = nodeKey({ kind: "record", id: String(classification.decision) });
      if (request.purpose === "whole-root-readiness" || selected.has(decisionKey)) {
        emitter.emit("freshness.decision.conflict", "An applicable accepted Decision remains semantically classified as conflicting.", { node_id: decisionKey, record_id: String(classification.decision) });
        observationBlockers.set(decisionKey, [...(observationBlockers.get(decisionKey) ?? []), "decision-conflict"]);
      }
    }
  }

  const baselineNodes = new Map(values<Record<string, any>>(baseline?.node_revisions).map((entry) => [nodeKey(entry.node as NodeReference), entry.revision?.value]));
  const nodeResults: KnowledgeGraphResult["nodes"] = [];
  const blockingRules = new Set<string>();
  if (
    nkfVersion === "0.7" &&
    baseline !== null &&
    request.purpose !== null && request.purpose !== undefined && request.purpose !== "historical-reproduction" &&
    values<Record<string, any>>(baseline.promotion_reconciliation).some((entry) => entry.state === "pending")
  ) {
    blockingRules.add("freshness.reconciliation.pending");
  }
  const blockingNodeKeys = new Set<string>();
  for (const entry of nodeRevisions) {
    const key = nodeKey(entry.node);
    const coverage = eligibility.get(key);
    const applicability = request.purpose === null || request.purpose === undefined
      ? "unknown" as const
      : request.purpose === "historical-reproduction"
        ? selected.has(key) ? "applicable" as const : "not-applicable" as const
      : coverage === undefined
        ? "unknown" as const
      : coverage.state !== "eligible"
        ? "not-applicable" as const
        : request.purpose === "whole-root-readiness" || selected.has(key)
          ? "applicable" as const
          : "not-applicable" as const;
    const reasons = new Map<"stale" | "expired" | "invalidated" | "unknown", string[]>();
    if (applicability === "applicable") {
      if (baselineState !== "confirmed") reasons.set("unknown", [`baseline-${baselineState}`]);
      else if (baselineNodes.get(key) !== entry.revision.value) reasons.set("stale", ["node-revision-changed"]);
      let declaration: Record<string, any> | null | undefined;
      if (entry.node.kind === "record") declaration = recordById.get(entry.node.id)?.declaration;
      else if (entry.node.kind === "document") {
        const documentId = entry.node.id;
        declaration = asObject(documents.find((unit) => asObject(unit.declaration.document)?.id === documentId)?.declaration.document);
      } else {
        const entityId = entry.node.entity;
        declaration = asObject(recordById.get(entry.node.record)?.declaration.entities?.find((entity: any) => entity.id === entityId));
      }
      const expiresAt = declaration?.freshness?.expires_at;
      if (typeof expiresAt === "string") {
        if (request.evaluation_time === null || request.evaluation_time === undefined) reasons.set("unknown", [...(reasons.get("unknown") ?? []), "evaluation-time-missing"]);
        else if (new Date(String(request.evaluation_time)).getTime() > new Date(expiresAt).getTime()) reasons.set("expired", ["declared-expiry-passed"]);
      }
      const missingObservations = observationBlockers.get(key);
      if (missingObservations !== undefined) reasons.set("unknown", [...(reasons.get("unknown") ?? []), ...missingObservations]);
      const conformanceBlock = diagnostics.some((diagnostic) => diagnostic.blocking === "conformance" && (diagnostic.node_id === key || (entry.node.kind === "record" && diagnostic.record_id === entry.node.id)));
      if (conformanceBlock) reasons.set("invalidated", ["exact-binding-or-conformance-mismatch"]);
      if (selected.has(key) && reasons.size === 0 && baselineState === "confirmed") {
        // Current is emitted below.
      }
    }
    const freshness: KnowledgeGraphResult["nodes"][number]["freshness"] = applicability === "not-applicable" ? [] : reasons.size === 0 && applicability === "applicable"
      ? [{ result: "current" as const, reasons: ["exact-revision-and-review-current"] }]
      : [...reasons.entries()].map(([result, resultReasons]) => ({ result, reasons: [...new Set(resultReasons)].sort(utf16Compare) }));
    if (applicability === "unknown" && freshness.length === 0) freshness.push({ result: "unknown", reasons: ["applicability-not-evaluated"] });
    if (selected.has(key) && freshness.some((item) => item.result !== "current")) {
      blockingNodeKeys.add(key);
      blockingRules.add("freshness.result.noncurrent");
      emitter.emit("freshness.result.noncurrent", "An applicable selected node is not current for the exact evaluation context.", { node_id: key });
    }
    nodeResults.push({
      node: entry.node, revision: entry.revision, applicability,
      participation_role: coverage?.role ?? null,
      authority_eligibility: coverage === undefined ? "unknown" : coverage.state === "eligible" ? "eligible" : "ineligible",
      authority_binding: entry.node.kind === "record" && recordById.get(entry.node.id)?.declaration.governance?.status === "accepted" ? "not-verified" : "not-applicable",
      freshness,
      conformance: diagnostics.some((diagnostic) => diagnostic.blocking === "conformance" && (diagnostic.node_id === key || (entry.node.kind === "record" && diagnostic.record_id === entry.node.id))) ? "failed" : "passed",
      impact_selected: selected.has(key),
      reason_paths: computedReasonPaths.filter((path) => nodeKey(path.target as NodeReference) === key),
    });
  }
  let historicalReady = false;
  if (request.purpose === "historical-reproduction") {
    const receipt = args.selectedReceipt;
    const currentUniverse = nodeRevisions.map((entry) => entry.node);
    const receiptUniverse = values<NodeReference>(receipt?.context?.candidate_universe);
    historicalReady = receipt !== null && receipt !== undefined &&
      receipt.id === request.historical_receipt &&
      receipt.context?.candidate_graph_revision?.value === candidateRevision.value &&
      receipt.context?.policy?.id === policyId &&
      receipt.context?.policy?.digest?.value === policyDigest &&
      jcs(sortedByJcs(receiptUniverse)) === jcs(sortedByJcs(currentUniverse));
    if (!historicalReady) {
      blockingRules.add("freshness.receipt.binding-mismatch");
      emitter.emit("freshness.receipt.binding-mismatch", "The selected historical receipt does not reproduce against the exact current inputs, policy, and node universe.");
    }
  } else if (request.purpose !== null && request.purpose !== undefined && baselineState !== "confirmed") {
    blockingRules.add(baselineRule[baselineState] ?? "freshness.baseline.coverage-incomplete");
  }
  const currentCount = nodeResults.filter((node) => node.applicability === "applicable" && node.freshness.length === 1 && node.freshness[0]?.result === "current").length;
  const applicableCount = nodeResults.filter((node) => node.applicability === "applicable").length;
  const readinessState = request.purpose === null || request.purpose === undefined
    ? "not-evaluated" as const
    : request.purpose === "historical-reproduction"
      ? historicalReady && blockingRules.size === 0 ? "ready" as const : "not-ready" as const
    : baselineState === "confirmed" && blockingRules.size === 0
      ? "ready" as const : "not-ready" as const;
  const readiness = {
    purpose: request.purpose ?? null, state: readinessState, baseline_graph_revision: baselineRevision,
    candidate_graph_revision: candidateRevision,
    blocking_nodes: nodeResults.filter((node) => blockingNodeKeys.has(nodeKey(node.node))).map((node) => node.node),
    blocking_rules: [...blockingRules].sort(utf16Compare),
  };
  const receiptContext = request.purpose === null || request.purpose === undefined ? null : {
    bundle: bundle.id,
    profile: bundle.root?.profile,
    baseline_graph_revision: baselineRevision,
    candidate_graph_revision: candidateRevision,
    evaluator: { id: "nourd-nkf-checker", digest: { algorithm: "sha-256", value: "0".repeat(64) } },
    policy: { id: policyId, digest: digest(policyDigest) },
    purpose: request.purpose,
    candidate_universe: nodeRevisions.map((entry) => entry.node),
    changed_inputs: sortedByJcs(values<Record<string, unknown>>(request.changed_inputs)),
    targets: sortedByJcs(values<NodeReference>(request.targets)),
    observations: values<Record<string, unknown>>(request.observations).sort((left, right) => utf16Compare(String(left.id), String(right.id))),
    baseline_state: request.purpose === "historical-reproduction" ? "not-evaluated" : baselineState,
    ...(request.evaluation_time === null || request.evaluation_time === undefined ? {} : { evaluation_time: request.evaluation_time }),
    ...(request.historical_receipt === null || request.historical_receipt === undefined ? {} : { historical_receipt: request.historical_receipt }),
  };
  const receiptResult = receiptContext === null ? null : {
    projections: {
      full: nodeResults.map((entry) => entry.node),
      applicable: nodeResults.filter((entry) => entry.applicability === "applicable").map((entry) => entry.node),
      current: nodeResults.filter((entry) => entry.applicability === "applicable" && entry.freshness.length === 1 && entry.freshness[0]?.result === "current").map((entry) => entry.node),
    },
    nodes: nodeResults,
    impact: { selected: nodeResults.filter((entry) => entry.impact_selected).map((entry) => entry.node), reason_paths: computedReasonPaths },
    cycles: detectedCycles(edges),
    decision_classifications: values<Record<string, unknown>>(baseline?.decision_classifications)
      .filter((entry) => entry.purpose === request.purpose),
    reviews: values<Record<string, unknown>>(baseline?.confirmation?.observations),
    unknowns: [...new Map(emitter.diagnostics
      .filter((diagnostic) => diagnostic.blocking === "readiness")
      .map((diagnostic) => {
        const entry = { rule: diagnostic.rule_id, subject: diagnostic.artifact ?? diagnostic.record_id ?? diagnostic.node_id ?? "project", ...(diagnostic.node_id === undefined ? {} : { node: JSON.parse(diagnostic.node_id) }) };
        return [jcs(entry), entry];
      })).values()].sort((left, right) => utf16Compare(jcs(left), jcs(right))),
    readiness,
  };
  return {
    summary: {
      policy: { identity: policyId, digest: digest(policyDigest), binding: policyState },
      candidate_graph_revision: candidateRevision, baseline_graph_revision: baselineRevision, baseline_state: baselineState,
      node_count: nodeRevisions.length, authored_edge_count: edges.length,
      projection_counts: { full: nodeRevisions.length, applicable: applicableCount, current: currentCount },
    },
    nodes: nodeResults,
    readiness,
    receipt: receiptContext === null || receiptResult === null ? null : { context: receiptContext, result: receiptResult },
  };
}
