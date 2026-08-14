import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildNkfGraph, digestObject, evaluate, loadYaml } from "./evaluator.mjs";

const experimentRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(experimentRoot, "../..");
const policy = await loadYaml(path.join(experimentRoot, "policy.yaml"));
const oracles = await loadYaml(path.join(experimentRoot, "oracles.yaml"));
const product = await loadYaml(path.join(experimentRoot, "fixtures", "product.yaml"));
const technology = await loadYaml(path.join(experimentRoot, "fixtures", "technology.yaml"));

function clone(value) {
  return structuredClone(value);
}

function sorted(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function comparison(computed, expected) {
  const computedSet = new Set(computed);
  const expectedSet = new Set(expected);
  return {
    computed: sorted(computed),
    oracle: sorted(expected),
    false_positives: sorted([...computedSet].filter((value) => !expectedSet.has(value))),
    false_negatives: sorted([...expectedSet].filter((value) => !computedSet.has(value))),
  };
}

function context(graph) {
  return {
    profile: graph.profile,
    purpose: "change-impact",
    decision_classifications: graph.nodes
      .filter((node) => node.kind === "decision" && node.governance?.status === "accepted")
      .map((node) => ({ node: node.id, classification: "compatible", basis: "whole-root-semantic-oracle" })),
  };
}

function mutateRevision(graph, nodeId, revision) {
  const candidate = clone(graph);
  const node = candidate.nodes.find((entry) => entry.id === nodeId);
  if (!node) throw new Error(`missing fixture node ${nodeId}`);
  node.revision = revision;
  return candidate;
}

function assertOracle(result, label) {
  if (result.false_positives.length > 0 || result.false_negatives.length > 0) {
    throw new Error(`${label} does not match the semantic oracle`);
  }
}

const productCandidate = mutateRevision(product, "decision-access", "decision-access-v2");
const productReceipt = evaluate({ baseline: product, candidate: productCandidate, policy, context: context(productCandidate) });
const productComparison = comparison(
  productReceipt.changes.mandatory_closure,
  oracles.scenarios["product-decision-change"].whole_root_review,
);
assertOracle(productComparison, "Product closure");

const technologyCandidate = mutateRevision(technology, "specification", "specification-v2");
const technologyReceipt = evaluate({
  baseline: technology,
  candidate: technologyCandidate,
  policy,
  context: context(technologyCandidate),
});
const technologyComparison = comparison(
  technologyReceipt.changes.mandatory_closure,
  oracles.scenarios["technology-specification-change"].whole_root_review,
);
assertOracle(technologyComparison, "Technology closure");

const nkfCandidate = await buildNkfGraph(projectRoot);
const nkfBaseline = clone(nkfCandidate);
const designId = "design-nkf-025-freshness-and-deterministic-knowledge-graph";
const taskId = "document:tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md";
nkfBaseline.nodes.find((node) => node.id === designId).revision = "pre-design-revision";
const sparseReceipt = evaluate({ baseline: nkfBaseline, candidate: nkfCandidate, policy, context: context(nkfCandidate) });
const nkfOracle = oracles.scenarios["nkf-draft-design-change"].whole_root_review;
const sparseComparison = comparison(sparseReceipt.changes.mandatory_closure, nkfOracle);

const baselinedCandidate = clone(nkfCandidate);
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
const baselinedReceipt = evaluate({
  baseline: baselinedBaseline,
  candidate: baselinedCandidate,
  policy,
  context: context(baselinedCandidate),
});
const baselinedComparison = comparison(baselinedReceipt.changes.mandatory_closure, nkfOracle);
assertOracle(baselinedComparison, "Baselined NKF closure");

const recordCount = nkfCandidate.nodes.filter((node) => node.kind !== "document").length;
const documentCount = nkfCandidate.nodes.filter((node) => node.kind === "document").length;
const relationCounts = Object.fromEntries(
  Object.entries(
    nkfCandidate.edges.reduce((counts, edge) => {
      counts[edge.type] = (counts[edge.type] ?? 0) + 1;
      return counts;
    }, {}),
  ).sort(([left], [right]) => left.localeCompare(right)),
);
const allSourcePaths = sorted(nkfCandidate.nodes.map((node) => node.source_path).filter(Boolean));
const targetedPaths = sorted(
  baselinedComparison.computed
    .map((nodeId) => nkfCandidate.nodes.find((node) => node.id === nodeId)?.source_path)
    .filter(Boolean),
);
async function byteCost(paths) {
  let bytes = 0;
  for (const sourcePath of paths) bytes += (await readFile(path.join(projectRoot, "knowledge", sourcePath))).byteLength;
  return { subjects: paths.length, bytes, approximate_tokens_at_four_bytes: Math.ceil(bytes / 4) };
}
const fullCost = await byteCost(allSourcePaths);
const targetedCost = await byteCost(targetedPaths);

const contextOnly = await buildNkfGraph(projectRoot, { nonRecordStrategy: "context-only" });
const promoted = await buildNkfGraph(projectRoot, { nonRecordStrategy: "promote-to-records" });

const report = {
  contract: "nkf.graph-experiment-measurements/0",
  policy: { id: policy.id, version: policy.version, sha256: digestObject(policy) },
  controlled_comparisons: {
    product: {
      candidate_subjects: product.nodes.length,
      review_subjects: productComparison.computed.length,
      ...productComparison,
    },
    technology: {
      candidate_subjects: technology.nodes.length,
      review_subjects: technologyComparison.computed.length,
      ...technologyComparison,
    },
  },
  nkf_baseline: {
    records: recordCount,
    document_nodes: documentCount,
    artifacts: nkfCandidate.artifacts.length,
    relationships: nkfCandidate.edges.length,
    relationship_types: relationCounts,
    existing_completeness: nkfCandidate.candidate_universe.completeness,
    sparse_comparison: sparseComparison,
    sparse_readiness: sparseReceipt.readiness,
    sparse_blockers: sparseReceipt.blockers,
    reviewed_baseline_simulation: baselinedComparison,
    review_cost: {
      full_whole_root: fullCost,
      targeted: targetedCost,
      subject_reduction_percent: Number((100 * (1 - targetedCost.subjects / fullCost.subjects)).toFixed(2)),
      byte_reduction_percent: Number((100 * (1 - targetedCost.bytes / fullCost.bytes)).toFixed(2)),
    },
  },
  non_record_strategies: {
    stable_document_nodes: nkfCandidate.experiment.non_record_measurements,
    context_only: {
      ...contextOnly.experiment.non_record_measurements,
      completeness: contextOnly.candidate_universe.completeness,
    },
    promote_to_records: promoted.experiment.non_record_measurements,
  },
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
