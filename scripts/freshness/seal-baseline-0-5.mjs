import { spawnSync } from "node:child_process";
import { cp, lstat, mkdir, mkdtemp, readFile, readdir, realpath, rename, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import * as commonmark from "commonmark";
import YAML from "yaml";

const RELATIONSHIPS = [
  "part-of", "defines", "governs", "applies-to", "depends-on", "extends", "supersedes",
  "rationale-for", "realizes", "evidences", "references", "flows-to", "transitions-to", "observes",
];
const PURPOSES = ["change-impact", "whole-root-readiness", "consequential-use"];

function fail(message) { throw new Error(message); }
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
    if (direct.isSymbolicLink() || !direct.isDirectory()) {
      fail(`Freshness seal path is not a direct directory: ${segments.join("/")}`);
    }
    if (!inside(root, await realpath(current))) {
      fail(`Freshness seal path escapes the project: ${segments.join("/")}`);
    }
  }
  return current;
}
function exactObject(value, keys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be one mapping.`);
  const observed = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (JSON.stringify(observed) !== JSON.stringify(expected)) fail(`${label} has unsupported or missing fields.`);
}
function jcs(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string" || typeof value === "number") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${jcs(value[key])}`).join(",")}}`;
}
const key = (node) => jcs(node);

function firstHeading(bytes) {
  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    const heading = text.split(/\r?\n/u).find((line) => line.startsWith("# "))?.slice(2).trim();
    return heading === undefined || heading === "" ? null : heading;
  } catch {
    return null;
  }
}

function markdownHeadingKeys(bytes) {
  const parser = new commonmark.Parser();
  const document = parser.parse(bytes.toString("utf8"));
  const occurrence = new Map();
  const keys = new Set();
  let currentH2 = null;
  const walker = document.walker();
  let event;
  while ((event = walker.next()) !== null) {
    const node = event.node;
    if (!event.entering || node.type !== "heading" || node.parent?.type !== "document") continue;
    const level = Number(node.level);
    if (level < 1 || level > 3) continue;
    const inlineText = (value) => {
      if (value.type === "text" || value.type === "code") return value.literal ?? "";
      if (value.type === "softbreak" || value.type === "linebreak") return " ";
      let result = "";
      for (let child = value.firstChild; child !== null; child = child.next) {
        result += inlineText(child);
      }
      return result;
    };
    let text = inlineText(node);
    text = text.replace(/\s+/gu, " ").trim();
    let headingPath;
    if (level === 1) headingPath = [text];
    else if (level === 2) {
      currentH2 = text;
      headingPath = [text];
    } else headingPath = currentH2 === null ? [text] : [currentH2, text];
    const pathKey = JSON.stringify(headingPath);
    const count = (occurrence.get(pathKey) ?? 0) + 1;
    occurrence.set(pathKey, count);
    keys.add(`${pathKey}\u0000${count}`);
  }
  return keys;
}

async function declarations(project, bundle) {
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

export async function writeReviewTemplateModern({
  projectRoot,
  checker,
  reviewPath,
  nkfVersion,
  preferredSpecificationId,
  retrospectiveGateReview = undefined,
}) {
  const project = await realpath(path.resolve(projectRoot));
  const checkerPath = path.resolve(checker);
  const target = path.resolve(reviewPath);
  const run = spawnSync(process.execPath, [checkerPath, "--project", project, "--level", "full-bundle", "--no-persist"], { encoding: "utf8" });
  if (run.status !== 0) fail(`The pre-review candidate does not conform: ${run.stderr || run.stdout}`);
  const result = JSON.parse(run.stdout);
  if (result.nkf_version !== nkfVersion || result.conformance !== "passed" || result.knowledge_graph?.policy?.binding !== "verified") {
    fail(`The checker did not produce a conformant, policy-bound NKF ${nkfVersion} candidate graph.`);
  }
  const bundle = YAML.parse(await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"), { schema: "core", strict: true, uniqueKeys: true });
  const records = await declarations(project, bundle);
  const recordsById = new Map(records.map((record) => [record.id, record]));
  const documentsById = new Map(
    (bundle.non_records ?? [])
      .filter((entry) => entry.document !== undefined)
      .map((entry) => [entry.document.id, entry]),
  );
  const governingBasis = (preferredSection) => {
    const preferred = recordsById.get(preferredSpecificationId);
    const preferredMatch = preferred?.sections?.find((section) => section.id === preferredSection);
    if (preferredMatch !== undefined) {
      return {
        node: { kind: "record", id: preferred.id },
        source: { section: preferredMatch.id },
      };
    }
    const root = recordsById.get(bundle.root.record);
    return {
      node: { kind: "record", id: bundle.root.record },
      source: { section: root?.sections?.[0]?.id ?? "REVIEW_SECTION_REQUIRED" },
    };
  };
  const basisFor = async (node) => {
    if (node.kind === "record" || node.kind === "entity") {
      const recordId = node.kind === "record" ? node.id : node.record;
      const record = recordsById.get(recordId);
      return {
        node,
        source: { section: record?.sections?.[0]?.id ?? "REVIEW_SECTION_REQUIRED" },
      };
    }
    const declaration = documentsById.get(node.id);
    const bytes = declaration === undefined
      ? null
      : await readFile(path.join(project, bundle.knowledge_root, ...declaration.path.split("/")));
    const heading = bytes === null ? null : firstHeading(bytes);
    if (heading === null) {
      // A represented non-Markdown evidence file is still a document node, but
      // it cannot supply a CommonMark heading. Give the reviewer a resolvable
      // governing basis to assess or replace instead of an impossible marker.
      return governingBasis("conformance");
    }
    return {
      node,
      source: {
        heading: {
          heading_path: [heading],
          occurrence: 1,
        },
      },
    };
  };
  const nodes = [];
  for (const entry of result.nodes) {
    nodes.push({
      node: entry.node,
      state: "REVIEW_REQUIRED",
      role: "REVIEW_REQUIRED",
      basis: await basisFor(entry.node),
    });
  }
  const fallbackBasis = governingBasis("relationships");
  const acceptedDecisions = records
    .filter((record) => record.type === "decision" && record.governance?.status === "accepted")
    .map((record) => record.id)
    .sort();
  const review = {
    contract: "nkf.semantic-review-input",
    nkf_version: nkfVersion,
    stage: "whole-root",
    reviewer: { kind: "agent", id: "REVIEWER_ID_REQUIRED" },
    reviewed_at: "REVIEWED_AT_UTC_MILLISECOND_REQUIRED",
    claim: "semantically-reviewed-whole-root",
    disputed: false,
    ...(retrospectiveGateReview === undefined ? {} : { retrospective_gate_review: retrospectiveGateReview }),
    nodes,
    relationships: RELATIONSHIPS.map((relationship) => ({
      relationship,
      state: "REVIEW_REQUIRED",
      basis: fallbackBasis,
    })),
    decision_classifications: acceptedDecisions.flatMap((decision) => PURPOSES.map((purpose) => ({
      decision,
      purpose,
      classification: "REVIEW_REQUIRED",
      basis: {
        node: { kind: "record", id: decision },
        source: { section: recordsById.get(decision)?.sections?.[0]?.id ?? "REVIEW_SECTION_REQUIRED" },
      },
    }))),
    observations: [{
      id: "whole-root-review-observation",
      subject: result.nodes[0].node,
      basis: fallbackBasis,
      finding: "REVIEW_FINDING_REQUIRED",
    }],
    limitations: ["REVIEW_LIMITATION_REQUIRED"],
  };
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, YAML.stringify(review, { lineWidth: 0, aliasDuplicateObjects: false }));
  return { path: target, nodes: nodes.length, decisions: acceptedDecisions.length, stage: "whole-root" };
}

export function writeReviewTemplate0_5(values) {
  return writeReviewTemplateModern({
    ...values,
    nkfVersion: "0.5",
    preferredSpecificationId: "nkf-0.5-specification-revision-2",
  });
}

export async function sealBaselineModern({
  projectRoot,
  checker,
  reviewPath,
  nkfVersion,
}) {
  const project = await realpath(path.resolve(projectRoot));
  const checkerPath = path.resolve(checker);
  const review = YAML.parse(await readFile(reviewPath, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
  const expected = [
    "contract", "nkf_version", "stage", "reviewer", "reviewed_at", "claim", "disputed",
    "nodes", "relationships", "decision_classifications", "observations", "limitations",
    ...(review.retrospective_gate_review === undefined ? [] : ["retrospective_gate_review"]),
  ];
  exactObject(review, expected, "review");
  if (
    review.contract !== "nkf.semantic-review-input" || review.nkf_version !== nkfVersion ||
    review.stage !== "whole-root" || review.claim !== "semantically-reviewed-whole-root" ||
    review.disputed !== false
  ) fail("The completed whole-root review has the wrong contract, version, stage, claim, or dispute state.");
  const run = spawnSync(process.execPath, [checkerPath, "--project", project, "--level", "full-bundle", "--no-persist"], { encoding: "utf8" });
  if (run.status !== 0) fail(`The pre-baseline candidate does not conform: ${run.stderr || run.stdout}`);
  const result = JSON.parse(run.stdout);
  if (result.nkf_version !== nkfVersion || result.conformance !== "passed" || result.knowledge_graph?.policy?.binding !== "verified") {
    fail(`The checker did not produce a conformant, policy-bound NKF ${nkfVersion} candidate graph.`);
  }
  const bundle = YAML.parse(await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"), { schema: "core", strict: true, uniqueKeys: true });
  const records = await declarations(project, bundle);
  const recordsById = new Map(records.map((record) => [record.id, record]));
  const documentsById = new Map(
    (bundle.non_records ?? [])
      .filter((entry) => entry?.document?.id !== undefined)
      .map((entry) => [entry.document.id, entry]),
  );
  const documentHeadingKeys = new Map();
  for (const [id, entry] of documentsById) {
    const bytes = await readFile(path.join(project, bundle.knowledge_root, ...entry.path.split("/")));
    documentHeadingKeys.set(id, markdownHeadingKeys(bytes));
  }
  const requireBasis = (basis, label) => {
    if (basis === null || typeof basis !== "object" || Array.isArray(basis)) fail(`${label} has no review basis.`);
    exactObject(basis, ["node", "source"], `${label} basis`);
    const node = basis.node;
    if (node?.kind === "record") {
      exactObject(basis.source, ["section"], `${label} record basis source`);
      const record = recordsById.get(node.id);
      if (record === undefined || typeof basis.source?.section !== "string" ||
          (record.sections ?? []).filter((section) => section.id === basis.source.section).length !== 1) {
        fail(`${label} basis does not resolve to one exact record section.`);
      }
      return;
    }
    if (node?.kind === "entity") {
      exactObject(basis.source, ["section"], `${label} entity basis source`);
      const record = recordsById.get(node.record);
      if (record === undefined ||
          (record.entities ?? []).filter((entity) => entity.id === node.entity).length !== 1 ||
          typeof basis.source?.section !== "string" ||
          (record.sections ?? []).filter((section) => section.id === basis.source.section).length !== 1) {
        fail(`${label} basis does not resolve to one exact entity and record section.`);
      }
      return;
    }
    if (node?.kind === "document") {
      exactObject(basis.source, ["heading"], `${label} document basis source`);
      const heading = basis.source?.heading;
      exactObject(heading, ["heading_path", "occurrence"], `${label} document heading basis`);
      const headingKey = `${JSON.stringify(heading?.heading_path)}\u0000${heading?.occurrence}`;
      if (documentsById.get(node.id) === undefined || !documentHeadingKeys.get(node.id)?.has(headingKey)) {
        fail(`${label} basis does not resolve to one exact document heading.`);
      }
      return;
    }
    fail(`${label} basis node does not resolve in the exact candidate graph.`);
  };
  for (const [index, entry] of review.nodes.entries()) requireBasis(entry.basis, `Review node ${index}`);
  for (const [index, entry] of review.relationships.entries()) requireBasis(entry.basis, `Review relationship ${index}`);
  for (const [index, entry] of review.decision_classifications.entries()) requireBasis(entry.basis, `Review Decision classification ${index}`);
  for (const [index, entry] of review.observations.entries()) requireBasis(entry.basis, `Review observation ${index}`);
  const expectedNodes = result.nodes.map((entry) => key(entry.node)).sort();
  const reviewNodes = review.nodes.map((entry) => key(entry.node)).sort();
  if (JSON.stringify(expectedNodes) !== JSON.stringify(reviewNodes)) fail("Review node coverage must equal the exact candidate graph universe.");
  if (new Set(reviewNodes).size !== reviewNodes.length) fail("Review node identities must be unique.");
  const relationships = review.relationships.map((entry) => entry.relationship);
  if (JSON.stringify(relationships) !== JSON.stringify(RELATIONSHIPS)) fail("Review relationship coverage must use the exact frozen vocabulary order.");
  const authoredEdges = normalizedEdges(bundle, records);
  const authoredRelationshipTypes = new Set(authoredEdges.map((edge) => edge.relationship));
  for (const entry of review.relationships) {
    if (entry.state === "inapplicable" && authoredRelationshipTypes.has(entry.relationship)) {
      fail(`Relationship ${entry.relationship} cannot be inapplicable because the candidate graph contains an authored edge of that type.`);
    }
  }
  const acceptedDecisions = records.filter((record) => record.type === "decision" && record.governance?.status === "accepted").map((record) => record.id).sort();
  const expectedClassifications = acceptedDecisions.flatMap((decision) => PURPOSES.map((purpose) => `${decision}\u0000${purpose}`));
  const classifications = review.decision_classifications.map((entry) => `${entry.decision}\u0000${entry.purpose}`).sort();
  if (JSON.stringify(classifications) !== JSON.stringify(expectedClassifications.sort())) fail("Decision classification coverage must equal every accepted Decision and non-historical purpose.");
  const applicability = review.nodes.flatMap((entry) => PURPOSES.map((purpose) => ({
    node: entry.node,
    purpose,
    state: entry.state,
    role: entry.role,
    basis: entry.basis,
  })));
  const baseline = {
    contract: "nkf.graph-baseline",
    nkf_version: nkfVersion,
    bundle: bundle.id,
    profile: bundle.root.profile,
    graph_revision: result.knowledge_graph.candidate_graph_revision,
    policy: { id: result.knowledge_graph.policy.identity, digest: result.knowledge_graph.policy.digest },
    node_revisions: result.nodes.map((entry) => ({ node: entry.node, revision: entry.revision })),
    authored_edges: authoredEdges,
    external_dependencies: bundle.external_dependencies ?? [],
    authority_inputs: bundle.authority_inputs ?? [],
    relationship_coverage: review.relationships,
    applicability_coverage: applicability,
    decision_classifications: review.decision_classifications,
    confirmation: {
      reviewer: review.reviewer,
      reviewed_at: review.reviewed_at,
      claim: "semantically-reviewed-whole-root",
      observations: review.observations,
      limitations: review.limitations,
      disputed: false,
    },
  };
  await safeDirectory(project, [".nourd", "knowledge"], false);
  const freshnessDirectory = await safeDirectory(
    project,
    [".nourd", "knowledge", "freshness"],
    false,
  );
  const target = path.join(project, ".nourd/knowledge/freshness/baseline.yaml");
  const baselineBytes = Buffer.from(
    YAML.stringify(baseline, { lineWidth: 0, aliasDuplicateObjects: false }),
    "utf8",
  );
  const targetStat = freshnessDirectory === null ? null : await lstat(target).catch(() => null);
  if (targetStat?.isSymbolicLink()) fail("The reviewed baseline target must not be a symbolic link.");
  const existing = targetStat === null ? null : await readFile(target);
  const resultShape = {
    graph_revision: baseline.graph_revision.value,
    nodes: result.nodes.length,
    reviewer: review.reviewer,
    reviewed_at: review.reviewed_at,
  };
  if (existing?.equals(baselineBytes)) {
    return { state: "current", ...resultShape };
  }

  const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-baseline-seal-"));
  const candidate = path.join(temporary, "project");
  try {
    await cp(project, candidate, {
      recursive: true,
      filter(source) {
        const relative = path.relative(project, source);
        if (relative === "") return true;
        const first = relative.split(path.sep)[0];
        return first !== ".git" && first !== "node_modules" && !first.startsWith(".nkf-transaction-");
      },
    });
    const candidateTarget = path.join(candidate, ".nourd/knowledge/freshness/baseline.yaml");
    await mkdir(path.dirname(candidateTarget), { recursive: true });
    await writeFile(candidateTarget, baselineBytes);
    const candidateRun = spawnSync(
      process.execPath,
      [
        checkerPath,
        "--project", candidate,
        "--level", "full-bundle",
        "--purpose", "whole-root-readiness",
        "--require-readiness",
        "--no-persist",
      ],
      { encoding: "utf8" },
    );
    if (candidateRun.status !== 0) {
      fail(`The reviewed baseline candidate does not conform: ${candidateRun.stderr || candidateRun.stdout}`);
    }
    const candidateResult = JSON.parse(candidateRun.stdout);
    if (
      candidateResult.conformance !== "passed" ||
      candidateResult.readiness?.state !== "ready" ||
      candidateResult.knowledge_graph?.candidate_graph_revision?.value !== baseline.graph_revision.value
    ) {
      fail("The reviewed baseline candidate did not produce the exact conformant ready graph revision.");
    }
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }

  await safeDirectory(project, [".nourd", "knowledge", "freshness"], true);
  const staged = `${target}.nkf-seal-${process.pid}`;
  try {
    await writeFile(staged, baselineBytes, { flag: "wx" });
    await rename(staged, target);
  } catch (error) {
    await rm(staged, { force: true });
    throw error;
  }
  return { state: "sealed", ...resultShape };
}

export function sealBaseline0_5(values) {
  return sealBaselineModern({ ...values, nkfVersion: "0.5" });
}
