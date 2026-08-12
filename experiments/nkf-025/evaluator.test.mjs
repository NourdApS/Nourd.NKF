import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  buildNkfGraph,
  canonicalize,
  evaluate,
  lifecycleProjection,
  loadYaml,
  virtualFrontmatter,
} from "./evaluator.mjs";

const experimentRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(experimentRoot, "../..");
const policy = await loadYaml(path.join(experimentRoot, "policy.yaml"));
const product = await loadYaml(path.join(experimentRoot, "fixtures", "product.yaml"));
const technology = await loadYaml(path.join(experimentRoot, "fixtures", "technology.yaml"));

function clone(value) {
  return structuredClone(value);
}

function contextFor(graph, purpose = "change-impact", additions = {}) {
  return { profile: graph.profile, purpose, ...additions };
}

function decisionClassifications(graph, classification = "compatible") {
  return graph.nodes
    .filter((node) => node.kind === "decision" && node.governance?.status === "accepted")
    .map((node) => ({ node: node.id, classification, basis: `fixture-${classification}` }));
}

function reviewAll(graph, purpose, changesByNode = new Map()) {
  return graph.nodes.map((node) => ({
    node: node.id,
    node_revision: node.revision,
    purpose,
    reviewed_changes: [...(changesByNode.get(node.id) ?? [])].sort(),
    reviewer: "fixture-semantic-reviewer",
  }));
}

function reviewClosure(graph, receipt, purpose) {
  const roots = new Map(
    Object.entries(receipt.changes.reason_paths).map(([nodeId, paths]) => [
      nodeId,
      new Set(paths.map((reasonPath) => reasonPath[0])),
    ]),
  );
  return reviewAll(graph, purpose, roots);
}

function nodeResult(receipt, nodeId) {
  return receipt.nodes.find((node) => node.id === nodeId);
}

test("Product Decision changes conservatively reach the Design and Realization with reason paths", () => {
  const candidate = clone(product);
  candidate.nodes.find((node) => node.id === "decision-access").revision = "decision-access-v2";
  const context = contextFor(candidate);
  const first = evaluate({ baseline: product, candidate, policy, context });
  assert.deepEqual(first.changes.mandatory_closure, ["decision-access", "design-access", "realization-current"]);
  assert.equal(nodeResult(first, "realization-current").freshness, "stale");
  assert.deepEqual(first.changes.reason_paths["realization-current"][0], [
    "decision-access",
    "realizes:realization-current->decision-access",
    "realization-current",
  ]);

  const reviewed = evaluate({
    baseline: product,
    candidate,
    policy,
    context,
    reviews: reviewClosure(candidate, first, context.purpose),
  });
  assert.equal(reviewed.readiness, "ready");
});

test("Technology Specification changes reach its Realization without pulling a contextual root", () => {
  const candidate = clone(technology);
  candidate.nodes.find((node) => node.id === "specification").revision = "specification-v2";
  const context = contextFor(candidate);
  const receipt = evaluate({ baseline: technology, candidate, policy, context });
  assert.deepEqual(receipt.changes.mandatory_closure, ["realization-current", "specification"]);
  assert.ok(!receipt.changes.mandatory_closure.includes("technology"));
});

test("whole-root readiness requires reusable revision-bound reviews and every accepted Decision classification", () => {
  const context = contextFor(product, "whole-root-readiness", {
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(product),
  });
  const ready = evaluate({
    baseline: product,
    candidate: product,
    policy,
    context,
    reviews: reviewAll(product, context.purpose),
  });
  assert.equal(ready.readiness, "ready");

  const missing = evaluate({ baseline: product, candidate: product, policy, context, reviews: [] });
  assert.equal(missing.readiness, "blocked");
  assert.equal(nodeResult(missing, "product").freshness, "unknown");

  const unclassified = evaluate({
    baseline: product,
    candidate: product,
    policy,
    context: { ...context, decision_classifications: [] },
    reviews: reviewAll(product, context.purpose),
  });
  assert.equal(nodeResult(unclassified, "decision-access").freshness, "unknown");
});

test("an applicable Decision conflict blocks readiness without pretending conformance failed", () => {
  const context = contextFor(product, "consequential-use", {
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(product, "conflicts"),
  });
  const receipt = evaluate({
    baseline: product,
    candidate: product,
    policy,
    context,
    reviews: reviewAll(product, context.purpose),
  });
  const decision = nodeResult(receipt, "decision-access");
  assert.equal(decision.freshness, "invalidated");
  assert.equal(decision.conformance, "passed");
  assert.equal(receipt.readiness, "blocked");
});

test("a missing required edge yields unknown and never shrinks silently", () => {
  const candidate = clone(product);
  candidate.edges = candidate.edges.filter((edge) => edge.type !== "realizes");
  const context = contextFor(candidate, "whole-root-readiness", {
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(candidate),
  });
  const receipt = evaluate({
    baseline: product,
    candidate,
    policy,
    context,
    reviews: reviewAll(candidate, context.purpose),
  });
  assert.equal(nodeResult(receipt, "realization-current").freshness, "unknown");
  assert.ok(
    nodeResult(receipt, "realization-current").reasons.some((reason) => reason.code === "required-relationship-missing"),
  );
  assert.equal(receipt.readiness, "blocked");
});

test("a forbidden impact cycle is explicit, cycle safe, and blocking", () => {
  const candidate = clone(technology);
  candidate.edges.push({
    source: "decision-portability",
    target: "realization-current",
    type: "depends-on",
    source_section: "dependencies",
  });
  const context = contextFor(candidate, "whole-root-readiness", {
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(candidate),
  });
  const receipt = evaluate({
    baseline: technology,
    candidate,
    policy,
    context,
    reviews: reviewAll(candidate, context.purpose),
  });
  assert.deepEqual(receipt.cycles, ["decision-portability", "realization-current"]);
  assert.equal(nodeResult(receipt, "decision-portability").freshness, "unknown");
});

test("relationship endpoint constraints and duplicate authored facts fail closed", () => {
  const candidate = clone(product);
  candidate.edges.push({
    source: "product",
    target: "design-access",
    type: "evidences",
    source_section: "product-map",
  });
  candidate.edges.push(clone(candidate.edges[0]));
  const receipt = evaluate({ baseline: product, candidate, policy, context: contextFor(candidate) });
  assert.ok(receipt.blockers.some((blocker) => blocker.code === "relationship-source-kind-invalid"));
  assert.ok(receipt.blockers.some((blocker) => blocker.code === "relationship-duplicate"));
  assert.equal(receipt.readiness, "blocked");
});

test("broken exact artifact binding changes its owning Realization and blocks", () => {
  const candidate = clone(technology);
  candidate.artifacts[0].observed_revision = "runtime-tampered";
  const context = contextFor(candidate);
  const receipt = evaluate({ baseline: technology, candidate, policy, context });
  const realization = nodeResult(receipt, "realization-current");
  assert.deepEqual(receipt.changes.initial_nodes, ["realization-current"]);
  assert.deepEqual(receipt.changes.artifacts, ["technology-runtime"]);
  assert.ok(realization.reasons.some((reason) => reason.code === "exact-binding-mismatch"));
  assert.notEqual(realization.freshness, "current");
});

test("unobserved external state is unknown; mismatched observed state is stale", () => {
  const candidate = clone(product);
  candidate.nodes.find((node) => node.id === "evidence-customer-study").external_dependencies = [
    { id: "research-register", required_revision: "study-v1" },
  ];
  const context = contextFor(candidate, "whole-root-readiness", {
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(candidate),
  });
  const reviews = reviewAll(candidate, context.purpose);
  const unknown = evaluate({ baseline: product, candidate, policy, context, reviews });
  assert.equal(nodeResult(unknown, "evidence-customer-study").freshness, "unknown");
  const stale = evaluate({
    baseline: product,
    candidate,
    policy,
    context,
    reviews,
    observations: { external: { "research-register": { revision: "study-v2" } } },
  });
  assert.equal(nodeResult(stale, "evidence-customer-study").freshness, "stale");
});

test("expiry and invalidation use explicit observations and retain deterministic precedence", () => {
  const candidate = clone(product);
  const evidence = candidate.nodes.find((node) => node.id === "evidence-customer-study");
  evidence.freshness = { expires_at: "2026-08-01T00:00:00Z", invalidated_by_events: ["study-retracted"] };
  const context = contextFor(candidate, "whole-root-readiness", {
    evaluation_time: "2026-08-12T00:00:00Z",
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(candidate),
  });
  const receipt = evaluate({
    baseline: product,
    candidate,
    policy,
    context,
    reviews: reviewAll(candidate, context.purpose),
    observations: { events: ["study-retracted"] },
  });
  const result = nodeResult(receipt, evidence.id);
  assert.equal(result.freshness, "invalidated");
  assert.ok(result.reasons.some((reason) => reason.code === "expiry-boundary-passed"));
  assert.ok(result.reasons.some((reason) => reason.code === "invalidation-event-observed"));
});

test("superseded history stays in the full graph and returns for historical reproduction", () => {
  const candidate = clone(product);
  const predecessor = candidate.nodes.find((node) => node.id === "decision-access");
  predecessor.governance.status = "superseded";
  predecessor.revision = "decision-access-v2-superseded";
  candidate.nodes.push({
    ...clone(predecessor),
    id: "decision-access-successor",
    revision: "decision-access-successor-v1",
    governance: { status: "accepted" },
  });
  candidate.edges.push({
    source: "decision-access-successor",
    target: "decision-access",
    type: "supersedes",
    source_section: "decision",
  });
  candidate.candidate_universe.node_ids.push("decision-access-successor");
  candidate.candidate_universe.node_ids.sort();

  const normalContext = contextFor(candidate, "whole-root-readiness", {
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(candidate),
  });
  const normal = evaluate({
    baseline: product,
    candidate,
    policy,
    context: normalContext,
    reviews: reviewAll(candidate, normalContext.purpose),
  });
  assert.ok(normal.projections.full.includes("decision-access"));
  assert.ok(!normal.projections.applicable.includes("decision-access"));

  const historicalContext = contextFor(candidate, "historical-reproduction", {
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(candidate),
  });
  const historical = evaluate({
    baseline: product,
    candidate,
    policy,
    context: historicalContext,
    reviews: reviewAll(candidate, historicalContext.purpose),
  });
  assert.ok(historical.projections.applicable.includes("decision-access"));
});

test("receipts reproduce deterministically and change when a bound input changes", () => {
  const context = contextFor(product, "historical-reproduction", {
    evaluation_time: "2026-08-12T12:00:00Z",
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(product),
  });
  const reviews = reviewAll(product, context.purpose);
  const first = evaluate({ baseline: product, candidate: product, policy, context, reviews });
  const second = evaluate({ baseline: product, candidate: product, policy, context, reviews });
  assert.equal(canonicalize(first), canonicalize(second));
  assert.equal(first.evaluation_id, second.evaluation_id);
  const changed = evaluate({
    baseline: product,
    candidate: product,
    policy,
    context: { ...context, evaluation_time: "2026-08-12T12:00:01Z" },
    reviews,
  });
  assert.notEqual(changed.evaluation_id, first.evaluation_id);
});

test("permuting set-like graph sequences does not change the deterministic receipt", () => {
  const context = contextFor(product, "whole-root-readiness", {
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(product),
  });
  const reviews = reviewAll(product, context.purpose);
  const first = evaluate({ baseline: product, candidate: product, policy, context, reviews });
  const permuted = clone(product);
  permuted.nodes.reverse();
  permuted.edges.reverse();
  permuted.artifacts.reverse();
  permuted.candidate_universe.node_ids.reverse();
  const second = evaluate({ baseline: permuted, candidate: permuted, policy, context, reviews: [...reviews].reverse() });
  assert.equal(second.evaluation_id, first.evaluation_id);
  assert.equal(canonicalize(second), canonicalize(first));
});

test("lifecycle navigation and virtual frontmatter are derived without moving or rewriting meaning", () => {
  const candidate = clone(product);
  const design = candidate.nodes.find((node) => node.id === "design-access");
  design.source_path = "designs/access.md";
  const activeProjection = lifecycleProjection(candidate);
  design.governance.status = "superseded";
  design.revision = "design-access-v2-superseded";
  const supersededProjection = lifecycleProjection(candidate);
  assert.equal(design.source_path, "designs/access.md");
  assert.notEqual(activeProjection.projection_id, supersededProjection.projection_id);

  const beforeEvaluation = canonicalize(candidate);
  const context = contextFor(candidate, "historical-reproduction");
  const first = evaluate({ baseline: product, candidate, policy, context });
  const projected = virtualFrontmatter(candidate, first, "design-access");
  assert.equal(projected.read_only, true);
  assert.equal(projected.declared_lifecycle, "superseded");
  assert.equal(canonicalize(candidate), beforeEvaluation);
});

test("NKF baseline represents every record, non-record, and artifact without promoting documents", async () => {
  const graph = await buildNkfGraph(projectRoot);
  assert.ok(graph.nodes.length > 250);
  assert.equal(graph.candidate_universe.node_ids.length, graph.nodes.length);
  assert.equal(graph.candidate_universe.completeness, "unconfirmed");
  assert.equal(graph.experiment.non_record_measurements.independently_evaluable, true);
  assert.equal(graph.experiment.non_record_measurements.authority_mutation, false);
  assert.ok(graph.nodes.some((node) => node.id.startsWith("document:tasks/active/NKF-025")));
  assert.ok(graph.artifacts.length > 150);

  const receipt = evaluate({
    baseline: graph,
    candidate: graph,
    policy,
    context: contextFor(graph),
  });
  assert.equal(receipt.readiness, "blocked");
  assert.ok(receipt.blockers.some((blocker) => blocker.code === "candidate-universe-unconfirmed"));
  assert.equal(receipt.projections.full.length, graph.nodes.length);
});

test("NKF whole-root readiness can reuse exact reviews while covering every accepted Decision", async () => {
  const graph = await buildNkfGraph(projectRoot, { completeness: "confirmed" });
  const context = contextFor(graph, "whole-root-readiness", {
    decision_coverage: "all-applicable",
    decision_classifications: decisionClassifications(graph),
  });
  const receipt = evaluate({
    baseline: graph,
    candidate: graph,
    policy,
    context,
    reviews: reviewAll(graph, context.purpose),
  });
  assert.equal(receipt.readiness, "ready");
  assert.equal(receipt.projections.applicable.length, receipt.projections.current.length);
  assert.equal(
    receipt.nodes.filter((node) => node.decision_classification === "compatible").length,
    decisionClassifications(graph).length,
  );
});

test("the current sparse NKF graph misses a Task impact until a reviewed baseline declares the edge", async () => {
  const sparseCandidate = await buildNkfGraph(projectRoot);
  const sparseBaseline = clone(sparseCandidate);
  const designId = "design-nkf-025-freshness-and-deterministic-knowledge-graph";
  const taskId = "document:tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md";
  sparseBaseline.nodes.find((node) => node.id === designId).revision = "pre-design-revision";
  const sparse = evaluate({
    baseline: sparseBaseline,
    candidate: sparseCandidate,
    policy,
    context: contextFor(sparseCandidate),
  });
  assert.ok(!sparse.changes.mandatory_closure.includes(taskId));
  assert.equal(sparse.readiness, "blocked");

  const baselinedCandidate = clone(sparseCandidate);
  baselinedCandidate.candidate_universe.completeness = "confirmed";
  baselinedCandidate.edges.push({
    source: taskId,
    target: designId,
    type: "depends-on",
    source_section: "execution-plan",
  });
  baselinedCandidate.nodes.find((node) => node.id === taskId).relationship_expectations = [
    { type: "depends-on", target: designId },
  ];
  const baselinedBaseline = clone(baselinedCandidate);
  baselinedBaseline.nodes.find((node) => node.id === designId).revision = "pre-design-revision";
  const baselined = evaluate({
    baseline: baselinedBaseline,
    candidate: baselinedCandidate,
    policy,
    context: contextFor(baselinedCandidate),
  });
  assert.deepEqual(baselined.changes.mandatory_closure, [designId, taskId]);
  assert.ok(baselined.changes.reason_paths[taskId].some((reasonPath) => reasonPath[0] === designId));
});

test("non-record alternatives expose either incomplete freshness or an authority mutation", async () => {
  const contextOnly = await buildNkfGraph(projectRoot, { nonRecordStrategy: "context-only" });
  assert.equal(contextOnly.candidate_universe.completeness, "unconfirmed");
  const contextReceipt = evaluate({
    baseline: contextOnly,
    candidate: contextOnly,
    policy,
    context: contextFor(contextOnly),
  });
  assert.equal(contextReceipt.readiness, "blocked");
  assert.ok(contextReceipt.blockers.some((blocker) => blocker.code === "candidate-universe-unconfirmed"));

  const promoted = await buildNkfGraph(projectRoot, { nonRecordStrategy: "promote-to-records" });
  assert.equal(promoted.experiment.non_record_measurements.authority_mutation, true);
});
