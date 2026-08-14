import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

const GRAPH_CONTRACT = "nkf.graph-experiment/0";
const POLICY_CONTRACT = "nkf.graph-evaluation-policy-experiment/0";
const RECEIPT_CONTRACT = "nkf.graph-evaluation-receipt-experiment/0";
const PURPOSES = new Set([
  "change-impact",
  "whole-root-readiness",
  "consequential-use",
  "historical-reproduction",
]);
const DECISION_CLASSIFICATIONS = new Set([
  "compatible",
  "extends",
  "supersedes",
  "conflicts",
  "not-applicable",
]);
const PARTICIPATION_ROLES = new Set(["context", "evidences", "execution", "governs", "proposes", "realizes"]);
const CONFORMANCE_RESULTS = new Set(["failed", "not-evaluated", "passed"]);
const DISPLAY_PRECEDENCE = ["invalidated", "expired", "stale", "unknown"];

export function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalize(entry)).join(",")}]`;
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`)
    .join(",")}}`;
}

export function sha256(value) {
  const bytes = Buffer.isBuffer(value) ? value : Buffer.from(String(value), "utf8");
  return createHash("sha256").update(bytes).digest("hex");
}

export function digestObject(value) {
  return sha256(canonicalize(value));
}

const EVALUATOR_SOURCE_SHA256 = sha256(readFileSync(fileURLToPath(import.meta.url)));
export const evaluatorSourceSha256 = EVALUATOR_SOURCE_SHA256;

function fail(message) {
  throw new Error(message);
}

function assertObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be a mapping`);
}

function assertString(value, label) {
  if (typeof value !== "string" || value.length === 0) fail(`${label} must be a non-empty string`);
}

function assertStringArray(value, label) {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string" || entry.length === 0)) {
    fail(`${label} must be a sequence of non-empty strings`);
  }
}

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function normalizedGraphForDigest(graph) {
  return {
    ...graph,
    candidate_universe: {
      ...graph.candidate_universe,
      node_ids: sortedUnique(graph.candidate_universe.node_ids),
    },
    nodes: [...graph.nodes].sort((left, right) => left.id.localeCompare(right.id)),
    edges: [...graph.edges].sort((left, right) => canonicalize(left).localeCompare(canonicalize(right))),
    artifacts: [...(graph.artifacts ?? [])].sort((left, right) => left.id.localeCompare(right.id)),
  };
}

function parseYamlStrict(source, label) {
  const document = YAML.parseDocument(source, {
    merge: false,
    prettyErrors: true,
    strict: true,
    uniqueKeys: true,
  });
  if (document.errors.length > 0) {
    fail(`${label}: ${document.errors.map((error) => error.message).join("; ")}`);
  }
  const value = document.toJS({ maxAliasCount: 0 });
  assertObject(value, label);
  return value;
}

export async function loadYaml(filePath) {
  return parseYamlStrict(await readFile(filePath, "utf8"), filePath);
}

function indexById(entries, label) {
  if (!Array.isArray(entries)) fail(`${label} must be a sequence`);
  const result = new Map();
  for (const entry of entries) {
    assertObject(entry, `${label} entry`);
    if (typeof entry.id !== "string" || entry.id.length === 0) fail(`${label} entry requires an id`);
    if (result.has(entry.id)) fail(`${label} contains duplicate id ${entry.id}`);
    result.set(entry.id, entry);
  }
  return result;
}

function validateGraph(graph, label) {
  assertObject(graph, label);
  if (graph.contract !== GRAPH_CONTRACT) fail(`${label} uses unsupported contract ${String(graph.contract)}`);
  if (typeof graph.bundle_id !== "string" || typeof graph.profile !== "string") {
    fail(`${label} requires bundle_id and profile`);
  }
  const nodes = indexById(graph.nodes, `${label}.nodes`);
  const artifacts = indexById(graph.artifacts ?? [], `${label}.artifacts`);
  if (!Array.isArray(graph.edges)) fail(`${label}.edges must be a sequence`);
  assertObject(graph.candidate_universe, `${label}.candidate_universe`);
  assertStringArray(graph.candidate_universe.node_ids, `${label}.candidate_universe.node_ids`);
  if (new Set(graph.candidate_universe.node_ids).size !== graph.candidate_universe.node_ids.length) {
    fail(`${label}.candidate_universe.node_ids contains a duplicate`);
  }
  if (!new Set(["confirmed", "unconfirmed"]).has(graph.candidate_universe.completeness)) {
    fail(`${label}.candidate_universe.completeness is unsupported`);
  }
  for (const node of nodes.values()) {
    assertString(node.kind, `${label}.nodes.${node.id}.kind`);
    assertString(node.revision, `${label}.nodes.${node.id}.revision`);
    if (node.role !== undefined && !PARTICIPATION_ROLES.has(node.role)) {
      fail(`${label}.nodes.${node.id}.role is unsupported`);
    }
    if (node.conformance !== undefined && !CONFORMANCE_RESULTS.has(node.conformance)) {
      fail(`${label}.nodes.${node.id}.conformance is unsupported`);
    }
    if (node.authority !== undefined) {
      assertObject(node.authority, `${label}.nodes.${node.id}.authority`);
      if (typeof node.authority.eligible !== "boolean") {
        fail(`${label}.nodes.${node.id}.authority.eligible must be boolean`);
      }
      assertString(node.authority.binding, `${label}.nodes.${node.id}.authority.binding`);
    }
    if (node.governance !== undefined) {
      assertObject(node.governance, `${label}.nodes.${node.id}.governance`);
      assertString(node.governance.status, `${label}.nodes.${node.id}.governance.status`);
    }
    if (node.applicability !== undefined) {
      assertObject(node.applicability, `${label}.nodes.${node.id}.applicability`);
      assertStringArray(node.applicability.profiles ?? ["*"], `${label}.nodes.${node.id}.applicability.profiles`);
      assertStringArray(node.applicability.purposes ?? ["*"], `${label}.nodes.${node.id}.applicability.purposes`);
      if ((node.applicability.profiles ?? ["*"]).some((profile) => profile !== "*" && profile !== graph.profile)) {
        fail(`${label}.nodes.${node.id}.applicability.profiles contains an unsupported profile`);
      }
      if ((node.applicability.purposes ?? ["*"]).some((purpose) => purpose !== "*" && !PURPOSES.has(purpose))) {
        fail(`${label}.nodes.${node.id}.applicability.purposes contains an unsupported purpose`);
      }
      if (
        node.applicability.include_historical !== undefined &&
        typeof node.applicability.include_historical !== "boolean"
      ) {
        fail(`${label}.nodes.${node.id}.applicability.include_historical must be boolean`);
      }
    }
    for (const [index, expectation] of (node.relationship_expectations ?? []).entries()) {
      assertObject(expectation, `${label}.nodes.${node.id}.relationship_expectations[${index}]`);
      assertString(expectation.type, `${label}.nodes.${node.id}.relationship_expectations[${index}].type`);
      if (expectation.target !== undefined) {
        assertString(expectation.target, `${label}.nodes.${node.id}.relationship_expectations[${index}].target`);
      }
    }
    for (const [index, dependency] of (node.external_dependencies ?? []).entries()) {
      assertObject(dependency, `${label}.nodes.${node.id}.external_dependencies[${index}]`);
      assertString(dependency.id, `${label}.nodes.${node.id}.external_dependencies[${index}].id`);
      if (dependency.required_revision !== undefined) {
        assertString(dependency.required_revision, `${label}.nodes.${node.id}.external_dependencies[${index}].required_revision`);
      }
    }
    if (node.freshness !== undefined) {
      assertObject(node.freshness, `${label}.nodes.${node.id}.freshness`);
      if (node.freshness.expires_at !== undefined) {
        assertString(node.freshness.expires_at, `${label}.nodes.${node.id}.freshness.expires_at`);
      }
      assertStringArray(
        node.freshness.invalidated_by_events ?? [],
        `${label}.nodes.${node.id}.freshness.invalidated_by_events`,
      );
    }
  }
  for (const [index, edge] of graph.edges.entries()) {
    assertObject(edge, `${label}.edges[${index}]`);
    for (const field of ["source", "target", "type", "source_section"]) {
      assertString(edge[field], `${label}.edges[${index}].${field}`);
    }
  }
  for (const artifact of artifacts.values()) {
    assertString(artifact.owner_record, `${label}.artifacts.${artifact.id}.owner_record`);
    assertString(artifact.expected_revision, `${label}.artifacts.${artifact.id}.expected_revision`);
    assertString(artifact.observed_revision, `${label}.artifacts.${artifact.id}.observed_revision`);
    if (!nodes.has(artifact.owner_record)) {
      fail(`${label}.artifacts.${artifact.id} refers to unknown owner ${artifact.owner_record}`);
    }
  }
  return { nodes, artifacts };
}

function validatePolicy(policy) {
  assertObject(policy, "policy");
  if (policy.contract !== POLICY_CONTRACT) fail(`policy uses unsupported contract ${String(policy.contract)}`);
  if (typeof policy.id !== "string" || typeof policy.version !== "string") fail("policy requires id and version");
  assertObject(policy.relationships, "policy.relationships");
  for (const [relationship, behavior] of Object.entries(policy.relationships)) {
    assertObject(behavior, `policy.relationships.${relationship}`);
    if (!new Set(["hard", "review", "context", "historical"]).has(behavior.impact)) {
      fail(`policy relationship ${relationship} has unsupported impact ${String(behavior.impact)}`);
    }
    if (!new Set(["reverse", "forward", "both", "none"]).has(behavior.propagation)) {
      fail(`policy relationship ${relationship} has unsupported propagation ${String(behavior.propagation)}`);
    }
    if (!new Set(["allow", "forbid"]).has(behavior.cycles)) {
      fail(`policy relationship ${relationship} has unsupported cycle rule ${String(behavior.cycles)}`);
    }
    if (new Set(["hard", "review"]).has(behavior.impact) && behavior.propagation === "none") {
      fail(`policy relationship ${relationship} disables its mandatory impact propagation`);
    }
    if (new Set(["context", "historical"]).has(behavior.impact) && behavior.propagation !== "none") {
      fail(`policy relationship ${relationship} propagates a non-mandatory impact class`);
    }
    if (behavior.propagation === "both" && behavior.cycles === "forbid") {
      fail(`policy relationship ${relationship} makes every bidirectional propagation a forbidden cycle`);
    }
    assertStringArray(behavior.allowed_source_kinds, `policy.relationships.${relationship}.allowed_source_kinds`);
    assertStringArray(behavior.allowed_target_kinds, `policy.relationships.${relationship}.allowed_target_kinds`);
  }
}

function nodeIsApplicable(node, context) {
  const applicability = node.applicability ?? {};
  const profiles = applicability.profiles ?? ["*"];
  const purposes = applicability.purposes ?? ["*"];
  if (!profiles.includes("*") && !profiles.includes(context.profile)) return false;
  if (!purposes.includes("*") && !purposes.includes(context.purpose)) return false;
  const historical = new Set(["superseded", "rejected", "withdrawn", "cancelled"]);
  return !(
    historical.has(node.governance?.status) &&
    context.purpose !== "historical-reproduction" &&
    applicability.include_historical !== true
  );
}

function propagationTargets(edge, changedNodeId, behavior) {
  if (!new Set(["hard", "review"]).has(behavior.impact)) return [];
  switch (behavior.propagation) {
    case "reverse":
      return edge.target === changedNodeId ? [edge.source] : [];
    case "forward":
      return edge.source === changedNodeId ? [edge.target] : [];
    case "both":
      return edge.source === changedNodeId
        ? [edge.target]
        : edge.target === changedNodeId
          ? [edge.source]
          : [];
    case "none":
      return [];
    default:
      fail(`relationship ${edge.type} has unsupported propagation ${String(behavior.propagation)}`);
  }
}

function cycleMembers(adjacency) {
  const visiting = new Set();
  const visited = new Set();
  const stack = [];
  const members = new Set();
  function visit(nodeId) {
    if (visiting.has(nodeId)) {
      const start = stack.lastIndexOf(nodeId);
      for (const member of stack.slice(start)) members.add(member);
      return;
    }
    if (visited.has(nodeId)) return;
    visiting.add(nodeId);
    stack.push(nodeId);
    for (const target of adjacency.get(nodeId) ?? []) visit(target);
    stack.pop();
    visiting.delete(nodeId);
    visited.add(nodeId);
  }
  for (const nodeId of adjacency.keys()) visit(nodeId);
  return members;
}

function reviewCovers(review, node, context, requiredChanges, policyDigest) {
  if (
    !review ||
    review.node_revision !== node.revision ||
    review.purpose !== context.purpose ||
    review.evaluator_sha256 !== EVALUATOR_SOURCE_SHA256 ||
    review.policy_sha256 !== policyDigest ||
    typeof review.reviewer !== "string" ||
    review.reviewer.length === 0
  ) return false;
  const reviewedChanges = new Set(review.reviewed_changes ?? []);
  return [...requiredChanges].every((change) => reviewedChanges.has(change));
}

function addReason(reasonMap, nodeId, reason) {
  const existing = reasonMap.get(nodeId) ?? [];
  existing.push(reason);
  reasonMap.set(nodeId, existing);
}

function normalizeReasons(reasons) {
  return reasons
    .map((reason) => ({ ...reason }))
    .sort((left, right) => canonicalize(left).localeCompare(canonicalize(right)));
}

export function evaluate({ baseline, candidate, policy, context, reviews = [], observations = {} }) {
  const baselineIndex = validateGraph(baseline, "baseline");
  const candidateIndex = validateGraph(candidate, "candidate");
  validatePolicy(policy);
  assertObject(context, "context");
  if (!PURPOSES.has(context.purpose)) fail(`unsupported purpose ${String(context.purpose)}`);
  if (context.decision_coverage !== undefined && context.decision_coverage !== "all-applicable") {
    fail(`unsupported Decision coverage ${String(context.decision_coverage)}`);
  }
  if (context.profile !== candidate.profile || baseline.profile !== candidate.profile) {
    fail("context, baseline, and candidate profile must match");
  }
  if (baseline.bundle_id !== candidate.bundle_id) fail("baseline and candidate bundle must match");
  assertObject(observations, "observations");
  assertStringArray(observations.events ?? [], "observations.events");
  assertObject(observations.external ?? {}, "observations.external");
  for (const [identity, observation] of Object.entries(observations.external ?? {})) {
    assertString(identity, "external observation identity");
    assertObject(observation, `observations.external.${identity}`);
    assertString(observation.revision, `observations.external.${identity}.revision`);
  }

  const policyDigest = digestObject(policy);
  const candidateNodes = candidateIndex.nodes;
  const applicable = new Set(
    [...candidateNodes.values()].filter((node) => nodeIsApplicable(node, context)).map((node) => node.id),
  );
  const unknownReasons = new Map();
  const structuralBlockers = [];
  const decisionBlockers = [];
  const useBlockers = [];

  const declaredUniverse = sortedUnique(candidate.candidate_universe.node_ids);
  const actualUniverse = sortedUnique(candidateNodes.keys());
  if (canonicalize(declaredUniverse) !== canonicalize(actualUniverse)) {
    structuralBlockers.push({ code: "candidate-universe-mismatch" });
    for (const nodeId of applicable) addReason(unknownReasons, nodeId, { code: "candidate-universe-mismatch" });
  }
  if (candidate.candidate_universe.completeness !== "confirmed") {
    structuralBlockers.push({ code: "candidate-universe-unconfirmed" });
    for (const nodeId of applicable) addReason(unknownReasons, nodeId, { code: "candidate-universe-unconfirmed" });
  }

  const policyEdges = [];
  const forbiddenCycleAdjacency = new Map();
  const edgeIdentities = new Set();
  for (const [index, edge] of candidate.edges.entries()) {
    assertObject(edge, `candidate.edges[${index}]`);
    const edgeReference = digestObject(edge).slice(0, 16);
    if (![edge.source, edge.target, edge.type, edge.source_section].every((value) => typeof value === "string" && value.length > 0)) {
      structuralBlockers.push({ code: "edge-incomplete", edge: edgeReference });
      for (const endpoint of [edge.source, edge.target]) {
        if (typeof endpoint === "string" && candidateNodes.has(endpoint)) {
          addReason(unknownReasons, endpoint, { code: "edge-incomplete", edge: edgeReference });
        }
      }
      continue;
    }
    if (!candidateNodes.has(edge.source) || !candidateNodes.has(edge.target)) {
      structuralBlockers.push({ code: "edge-endpoint-missing", edge: edgeReference });
      const existing = candidateNodes.has(edge.source) ? edge.source : candidateNodes.has(edge.target) ? edge.target : null;
      if (existing) addReason(unknownReasons, existing, { code: "edge-endpoint-missing", edge: edgeReference });
      continue;
    }
    const edgeIdentity = canonicalize({ source: edge.source, target: edge.target, type: edge.type });
    if (edgeIdentities.has(edgeIdentity)) {
      structuralBlockers.push({ code: "relationship-duplicate", edge: edgeReference });
      addReason(unknownReasons, edge.source, { code: "relationship-duplicate", edge: edgeReference });
      continue;
    }
    edgeIdentities.add(edgeIdentity);
    const behavior = policy.relationships[edge.type];
    if (!behavior) {
      structuralBlockers.push({ code: "relationship-policy-missing", relationship: edge.type });
      addReason(unknownReasons, edge.source, { code: "relationship-policy-missing", relationship: edge.type });
      addReason(unknownReasons, edge.target, { code: "relationship-policy-missing", relationship: edge.type });
      continue;
    }
    const sourceKind = candidateNodes.get(edge.source).kind;
    const targetKind = candidateNodes.get(edge.target).kind;
    if (
      Array.isArray(behavior.allowed_source_kinds) &&
      !behavior.allowed_source_kinds.includes("*") &&
      !behavior.allowed_source_kinds.includes(sourceKind)
    ) {
      structuralBlockers.push({ code: "relationship-source-kind-invalid", edge: edgeReference, kind: sourceKind });
      addReason(unknownReasons, edge.source, { code: "relationship-source-kind-invalid", relationship: edge.type });
      continue;
    }
    if (
      Array.isArray(behavior.allowed_target_kinds) &&
      !behavior.allowed_target_kinds.includes("*") &&
      !behavior.allowed_target_kinds.includes(targetKind)
    ) {
      structuralBlockers.push({ code: "relationship-target-kind-invalid", edge: edgeReference, kind: targetKind });
      addReason(unknownReasons, edge.source, { code: "relationship-target-kind-invalid", relationship: edge.type });
      continue;
    }
    policyEdges.push({ edge, behavior });
    if (behavior.cycles === "forbid" && new Set(["hard", "review"]).has(behavior.impact)) {
      const source = behavior.propagation === "reverse" ? edge.target : edge.source;
      const target = behavior.propagation === "reverse" ? edge.source : edge.target;
      const targets = forbiddenCycleAdjacency.get(source) ?? [];
      targets.push(target);
      forbiddenCycleAdjacency.set(source, targets);
      if (behavior.propagation === "both") {
        const inverseTargets = forbiddenCycleAdjacency.get(target) ?? [];
        inverseTargets.push(source);
        forbiddenCycleAdjacency.set(target, inverseTargets);
      }
    }
  }
  policyEdges.sort((left, right) => canonicalize(left.edge).localeCompare(canonicalize(right.edge)));

  const cycles = sortedUnique(cycleMembers(forbiddenCycleAdjacency));
  for (const nodeId of cycles) addReason(unknownReasons, nodeId, { code: "forbidden-impact-cycle" });

  for (const node of candidateNodes.values()) {
    for (const expectation of node.relationship_expectations ?? []) {
      const matches = candidate.edges.filter(
        (edge) => edge.source === node.id && edge.type === expectation.type &&
          (expectation.target === undefined || edge.target === expectation.target),
      );
      if (matches.length === 0) {
        addReason(unknownReasons, node.id, {
          code: "required-relationship-missing",
          relationship: expectation.type,
          ...(expectation.target ? { target: expectation.target } : {}),
        });
      }
    }
  }

  const initialChanges = new Set();
  for (const node of candidateNodes.values()) {
    if (baselineIndex.nodes.get(node.id)?.revision !== node.revision) initialChanges.add(node.id);
  }
  for (const nodeId of baselineIndex.nodes.keys()) {
    if (!candidateNodes.has(nodeId)) structuralBlockers.push({ code: "baseline-node-removed", node: nodeId });
  }

  const relationshipChanges = [];
  const baselineEdges = new Map(baseline.edges.map((edge) => [canonicalize(edge), edge]));
  const candidateEdges = new Map(candidate.edges.map((edge) => [canonicalize(edge), edge]));
  for (const [identity, edge] of candidateEdges) {
    if (baselineEdges.has(identity)) continue;
    relationshipChanges.push({ change: "added", source: edge.source, target: edge.target, type: edge.type });
    if (candidateNodes.has(edge.source)) initialChanges.add(edge.source);
  }
  for (const [identity, edge] of baselineEdges) {
    if (candidateEdges.has(identity)) continue;
    relationshipChanges.push({ change: "removed", source: edge.source, target: edge.target, type: edge.type });
    if (candidateNodes.has(edge.source)) initialChanges.add(edge.source);
  }

  const artifactChanges = [];
  for (const artifact of candidateIndex.artifacts.values()) {
    const baselineArtifact = baselineIndex.artifacts.get(artifact.id);
    const artifactMappingChanged = baselineArtifact !== undefined && (
      baselineArtifact.owner_record !== artifact.owner_record ||
      baselineArtifact.expected_revision !== artifact.expected_revision
    );
    if (baselineArtifact?.observed_revision !== artifact.observed_revision || artifactMappingChanged) {
      artifactChanges.push(artifact.id);
      if (candidateNodes.has(artifact.owner_record)) {
        initialChanges.add(artifact.owner_record);
      } else {
        structuralBlockers.push({ code: "changed-artifact-owner-missing", artifact: artifact.id });
      }
      if (artifactMappingChanged && candidateNodes.has(baselineArtifact.owner_record)) {
        initialChanges.add(baselineArtifact.owner_record);
      }
    }
    if (artifact.expected_revision !== artifact.observed_revision) {
      if (candidateNodes.has(artifact.owner_record)) {
        addReason(unknownReasons, artifact.owner_record, { code: "exact-binding-mismatch", artifact: artifact.id });
      } else {
        structuralBlockers.push({ code: "artifact-binding-owner-missing", artifact: artifact.id });
      }
    }
  }
  for (const artifact of baselineIndex.artifacts.values()) {
    if (candidateIndex.artifacts.has(artifact.id)) continue;
    artifactChanges.push(artifact.id);
    structuralBlockers.push({ code: "baseline-artifact-removed", artifact: artifact.id });
    if (candidateNodes.has(artifact.owner_record)) {
      initialChanges.add(artifact.owner_record);
      addReason(unknownReasons, artifact.owner_record, { code: "baseline-artifact-removed", artifact: artifact.id });
    }
  }

  const reasonPaths = new Map();
  const rootsByNode = new Map();
  for (const root of sortedUnique(initialChanges)) {
    const queue = [{ node: root, path: [root] }];
    const visited = new Set();
    while (queue.length > 0) {
      const current = queue.shift();
      if (visited.has(current.node)) continue;
      visited.add(current.node);
      const roots = rootsByNode.get(current.node) ?? new Set();
      roots.add(root);
      rootsByNode.set(current.node, roots);
      const paths = reasonPaths.get(current.node) ?? [];
      paths.push(current.path);
      reasonPaths.set(current.node, paths);
      for (const { edge, behavior } of policyEdges) {
        for (const target of propagationTargets(edge, current.node, behavior)) {
          queue.push({ node: target, path: [...current.path, `${edge.type}:${edge.source}->${edge.target}`, target] });
        }
      }
    }
  }

  const reviewIndex = new Map();
  for (const review of reviews) {
    assertObject(review, "review");
    assertString(review.node, "review.node");
    assertString(review.node_revision, `review.${review.node}.node_revision`);
    assertString(review.purpose, `review.${review.node}.purpose`);
    assertString(review.reviewer, `review.${review.node}.reviewer`);
    assertString(review.evaluator_sha256, `review.${review.node}.evaluator_sha256`);
    assertString(review.policy_sha256, `review.${review.node}.policy_sha256`);
    assertStringArray(review.reviewed_changes ?? [], `review.${review.node}.reviewed_changes`);
    if (!candidateNodes.has(review.node)) fail(`review refers to unknown node ${review.node}`);
    if (reviewIndex.has(review.node)) fail(`reviews contain duplicate node ${String(review.node)}`);
    reviewIndex.set(review.node, review);
  }
  const classifications = new Map();
  for (const classification of context.decision_classifications ?? []) {
    assertObject(classification, "decision classification");
    assertString(classification.node, "decision classification.node");
    assertString(classification.basis, `decision classification.${classification.node}.basis`);
    if (!DECISION_CLASSIFICATIONS.has(classification.classification)) {
      fail(`unsupported Decision classification ${String(classification.classification)}`);
    }
    if (classifications.has(classification.node)) fail(`duplicate Decision classification ${String(classification.node)}`);
    if (!candidateNodes.has(classification.node)) fail(`Decision classification refers to unknown node ${classification.node}`);
    if (candidateNodes.get(classification.node).kind !== "decision") {
      fail(`Decision classification refers to non-Decision node ${classification.node}`);
    }
    classifications.set(classification.node, classification);
  }

  const nodeResults = [];
  for (const nodeId of sortedUnique(applicable)) {
    const node = candidateNodes.get(nodeId);
    const reasons = [...(unknownReasons.get(nodeId) ?? [])];
    const statuses = new Set();
    for (const event of node.freshness?.invalidated_by_events ?? []) {
      if ((observations.events ?? []).includes(event)) {
        statuses.add("invalidated");
        reasons.push({ code: "invalidation-event-observed", event });
      }
    }
    if (node.freshness?.expires_at !== undefined) {
      if (typeof context.evaluation_time !== "string") {
        statuses.add("unknown");
        reasons.push({ code: "evaluation-time-required" });
      } else {
        const evaluationTime = Date.parse(context.evaluation_time);
        const expiryTime = Date.parse(node.freshness.expires_at);
        if (!Number.isFinite(evaluationTime) || !Number.isFinite(expiryTime)) {
          statuses.add("unknown");
          reasons.push({ code: "expiry-input-invalid" });
        } else if (evaluationTime > expiryTime) {
          statuses.add("expired");
          reasons.push({ code: "expiry-boundary-passed", expires_at: node.freshness.expires_at });
        }
      }
    }
    for (const dependency of node.external_dependencies ?? []) {
      const observation = observations.external?.[dependency.id];
      if (!observation) {
        statuses.add("unknown");
        reasons.push({ code: "external-observation-missing", dependency: dependency.id });
      } else if (dependency.required_revision !== undefined && observation.revision !== dependency.required_revision) {
        statuses.add("stale");
        reasons.push({
          code: "external-revision-mismatch",
          dependency: dependency.id,
          expected: dependency.required_revision,
          observed: observation.revision,
        });
      }
    }
    if ((unknownReasons.get(nodeId) ?? []).length > 0) statuses.add("unknown");

    const requiredChanges = rootsByNode.get(nodeId) ?? new Set();
    const review = reviewIndex.get(nodeId);
    const reviewIsCurrent = reviewCovers(review, node, context, requiredChanges, policyDigest);
    const reviewRequired = requiredChanges.size > 0 || context.purpose !== "change-impact";
    if (!reviewIsCurrent) {
      if (requiredChanges.size > 0) {
        statuses.add("stale");
        reasons.push({ code: "semantic-review-outdated", changed_nodes: sortedUnique(requiredChanges) });
      } else if (context.purpose !== "change-impact") {
        statuses.add("unknown");
        reasons.push({ code: "semantic-review-missing" });
      }
    }

    let decisionClassification = null;
    if (node.kind === "decision" && node.governance?.status === "accepted") {
      const classification = classifications.get(nodeId);
      const classificationRequired =
        context.decision_coverage === "all-applicable" ||
        (context.purpose === "change-impact" && rootsByNode.has(nodeId)) ||
        context.purpose === "whole-root-readiness" ||
        context.purpose === "consequential-use";
      if (classificationRequired && !classification) {
        statuses.add("unknown");
        reasons.push({ code: "decision-classification-missing" });
      } else if (classification) {
        decisionClassification = classification.classification;
        if (classification.classification === "conflicts") {
          reasons.push({ code: "applicable-decision-conflict", basis: classification.basis });
          decisionBlockers.push({ code: "applicable-decision-conflict", node: nodeId, basis: classification.basis });
        }
      }
    }

    const freshness = DISPLAY_PRECEDENCE.find((status) => statuses.has(status)) ?? "current";
    if (
      new Set(["whole-root-readiness", "consequential-use"]).has(context.purpose) &&
      (node.conformance ?? "not-evaluated") !== "passed"
    ) {
      useBlockers.push({ code: "conformance-not-passed", node: nodeId, state: node.conformance ?? "not-evaluated" });
    }
    if (
      context.purpose === "consequential-use" &&
      (node.role ?? "context") === "governs" &&
      node.authority?.eligible === true &&
      node.authority?.binding !== "verified"
    ) {
      useBlockers.push({ code: "governing-authority-not-verified", node: nodeId, state: node.authority?.binding ?? "not-evaluated" });
    }
    nodeResults.push({
      id: nodeId,
      revision: node.revision,
      applicability: "applicable",
      participation_role: node.role ?? "context",
      authority: { eligible: node.authority?.eligible === true, binding: node.authority?.binding ?? "not-evaluated" },
      freshness,
      conformance: node.conformance ?? "not-evaluated",
      semantic_review: {
        binding: reviewIsCurrent ? "current" : reviewRequired ? (review ? "outdated" : "missing") : "not-required",
        reviewer: review?.reviewer ?? null,
        reviewed_changes: sortedUnique(review?.reviewed_changes ?? []),
      },
      decision_classification: decisionClassification,
      reasons: normalizeReasons(reasons),
    });
  }

  const closure = sortedUnique([...rootsByNode.keys()].filter((nodeId) => applicable.has(nodeId)));
  const current = nodeResults.filter((result) => result.freshness === "current").map((result) => result.id);
  const noncurrent = nodeResults.filter((result) => result.freshness !== "current");
  const output = {
    contract: RECEIPT_CONTRACT,
    evaluator: { id: "nkf-025-disposable-evaluator", version: "0", sha256: EVALUATOR_SOURCE_SHA256 },
    policy: { id: policy.id, version: policy.version, sha256: policyDigest },
    context: {
      bundle_id: candidate.bundle_id,
      profile: context.profile,
      purpose: context.purpose,
      evaluation_time: context.evaluation_time ?? null,
      baseline_revision: digestObject(normalizedGraphForDigest(baseline)),
      candidate_revision: digestObject(normalizedGraphForDigest(candidate)),
      candidate_universe_sha256: digestObject(declaredUniverse),
      evaluation_context_sha256: digestObject({
        ...context,
        decision_classifications: [...(context.decision_classifications ?? [])].sort((left, right) =>
          canonicalize(left).localeCompare(canonicalize(right))),
      }),
      observations_sha256: digestObject(observations),
      semantic_reviews_sha256: digestObject(
        [...reviews].sort((left, right) => canonicalize(left).localeCompare(canonicalize(right))),
      ),
    },
    projections: { full: sortedUnique(candidateNodes.keys()), applicable: sortedUnique(applicable), current: sortedUnique(current) },
    changes: {
      initial_nodes: sortedUnique(initialChanges),
      artifacts: sortedUnique(artifactChanges),
      relationships: relationshipChanges.sort((left, right) => canonicalize(left).localeCompare(canonicalize(right))),
      mandatory_closure: closure,
      reason_paths: Object.fromEntries(
        [...reasonPaths.entries()]
          .filter(([nodeId]) => applicable.has(nodeId))
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([nodeId, paths]) => [nodeId, paths.sort((left, right) => canonicalize(left).localeCompare(canonicalize(right)))]),
      ),
    },
    nodes: nodeResults,
    cycles,
    blockers: [...structuralBlockers, ...decisionBlockers, ...useBlockers].sort((left, right) =>
      canonicalize(left).localeCompare(canonicalize(right))),
    readiness: noncurrent.length === 0 && structuralBlockers.length === 0 && decisionBlockers.length === 0 && useBlockers.length === 0
      ? "ready"
      : "blocked",
  };
  return { ...output, evaluation_id: digestObject(output) };
}

export function lifecycleProjection(graph) {
  validateGraph(graph, "graph");
  const groups = {};
  for (const node of graph.nodes) {
    const status = node.governance?.status ?? "unknown";
    const entries = groups[status] ?? [];
    entries.push({ id: node.id, source_path: node.source_path ?? null });
    groups[status] = entries;
  }
  for (const entries of Object.values(groups)) entries.sort((left, right) => left.id.localeCompare(right.id));
  const projection = Object.fromEntries(Object.entries(groups).sort(([left], [right]) => left.localeCompare(right)));
  return { groups: projection, projection_id: digestObject(projection) };
}

export function virtualFrontmatter(graph, receipt, nodeId) {
  validateGraph(graph, "graph");
  assertObject(receipt, "receipt");
  if (receipt.contract !== RECEIPT_CONTRACT) fail("receipt uses unsupported contract");
  const { evaluation_id: evaluationId, ...receiptBody } = receipt;
  if (typeof evaluationId !== "string" || evaluationId !== digestObject(receiptBody)) {
    fail("receipt evaluation identity does not match its content");
  }
  if (receipt.context?.candidate_revision !== digestObject(normalizedGraphForDigest(graph))) {
    fail("receipt does not bind the supplied graph revision");
  }
  if (!Array.isArray(receipt.nodes)) fail("receipt nodes must be a sequence");
  const node = graph.nodes.find((entry) => entry.id === nodeId);
  const result = receipt.nodes.find((entry) => entry.id === nodeId);
  if (!node || !result) fail(`node ${nodeId} is unavailable in graph or receipt`);
  return {
    node_id: nodeId,
    declared_lifecycle: node.governance?.status ?? "unknown",
    computed_freshness: result.freshness,
    evaluation_id: receipt.evaluation_id,
    read_only: true,
  };
}

function roleForRecordType(type) {
  return {
    decision: "governs",
    design: "proposes",
    realization: "realizes",
    evidence: "evidences",
    specification: "governs",
    product: "governs",
    technology: "governs",
  }[type] ?? "context";
}

function frontmatter(markdown) {
  if (!markdown.startsWith("---\n")) return {};
  const end = markdown.indexOf("\n---\n", 4);
  if (end < 0) return {};
  return parseYamlStrict(markdown.slice(4, end), "Markdown frontmatter");
}

export async function buildNkfGraph(
  projectRoot,
  { nonRecordStrategy = "stable-document-nodes", completeness = "unconfirmed" } = {},
) {
  if (!new Set(["confirmed", "unconfirmed"]).has(completeness)) {
    fail(`unsupported baseline completeness ${String(completeness)}`);
  }
  const declarationRoot = path.join(projectRoot, ".nourd", "knowledge");
  const bundlePath = path.join(declarationRoot, "bundle.yaml");
  const bundleBytes = await readFile(bundlePath);
  const bundle = parseYamlStrict(bundleBytes.toString("utf8"), bundlePath);
  const knowledgeRoot = path.join(projectRoot, bundle.knowledge_root);
  const recordRoot = path.join(declarationRoot, "records");
  const recordFiles = (await readdir(recordRoot)).filter((entry) => entry.endsWith(".yaml")).sort();
  const nodes = [];
  const edges = [];

  for (const file of recordFiles) {
    const declarationPath = path.join(recordRoot, file);
    const declarationBytes = await readFile(declarationPath);
    const declaration = parseYamlStrict(declarationBytes.toString("utf8"), declarationPath);
    const markdownBytes = await readFile(path.join(knowledgeRoot, declaration.source.path));
    nodes.push({
      id: declaration.id,
      kind: declaration.type,
      revision: sha256(Buffer.concat([markdownBytes, Buffer.from("\n---nkf-declaration---\n"), declarationBytes])),
      source_path: declaration.source.path,
      role: roleForRecordType(declaration.type),
      governance: declaration.governance,
      authority: { eligible: declaration.governance?.status === "accepted", binding: "not-evaluated" },
      applicability: { profiles: [bundle.root.profile], purposes: ["*"] },
      conformance: "passed",
    });
    for (const relationship of declaration.relationships ?? []) {
      edges.push({
        source: declaration.id,
        target: relationship.target,
        type: relationship.type,
        source_section: relationship.source_section,
      });
    }
  }

  const nonRecordMeasurements = {
    strategy: nonRecordStrategy,
    count: (bundle.non_records ?? []).length,
    authority_mutation: false,
    independently_evaluable: false,
  };
  if (nonRecordStrategy === "stable-document-nodes" || nonRecordStrategy === "promote-to-records") {
    for (const entry of bundle.non_records ?? []) {
      const bytes = await readFile(path.join(knowledgeRoot, entry.path));
      const metadata = entry.path.endsWith(".md") ? frontmatter(bytes.toString("utf8")) : {};
      nodes.push({
        id: `document:${entry.path}`,
        kind: nonRecordStrategy === "promote-to-records" ? "record" : "document",
        revision: sha256(Buffer.concat([bytes, Buffer.from(canonicalize({ path: entry.path, kind: entry.kind }))])),
        source_path: entry.path,
        role: entry.kind === "task" ? "execution" : entry.kind === "evidence" ? "evidences" : "context",
        governance: { status: metadata.task_status ?? metadata.record_status ?? "declared" },
        authority: { eligible: false, binding: "not-applicable" },
        applicability: { profiles: [bundle.root.profile], purposes: ["*"] },
        conformance: "passed",
      });
    }
    nonRecordMeasurements.independently_evaluable = true;
    nonRecordMeasurements.authority_mutation = nonRecordStrategy === "promote-to-records";
  }

  const artifacts = [];
  for (const artifact of bundle.governed_artifacts ?? []) {
    const bytes = await readFile(path.join(projectRoot, artifact.path));
    artifacts.push({
      id: artifact.id,
      owner_record: artifact.record,
      expected_revision: artifact.digest.value,
      observed_revision: sha256(bytes),
      source_path: artifact.path,
    });
  }

  const nodeIds = nodes.map((node) => node.id).sort();
  return {
    contract: GRAPH_CONTRACT,
    bundle_id: bundle.id,
    profile: bundle.root.profile,
    candidate_universe: {
      node_ids: nodeIds,
      completeness: nonRecordStrategy === "context-only" ? "unconfirmed" : completeness,
    },
    nodes: nodes.sort((left, right) => left.id.localeCompare(right.id)),
    edges: edges.sort((left, right) => canonicalize(left).localeCompare(canonicalize(right))),
    artifacts: artifacts.sort((left, right) => left.id.localeCompare(right.id)),
    experiment: {
      declaration_revision: sha256(bundleBytes),
      completeness_assertion: completeness,
      non_record_measurements: nonRecordMeasurements,
    },
  };
}

export const contracts = Object.freeze({ graph: GRAPH_CONTRACT, policy: POLICY_CONTRACT, receipt: RECEIPT_CONTRACT });
