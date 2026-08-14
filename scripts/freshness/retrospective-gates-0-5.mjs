import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const digest = (value) => ({ algorithm: "sha-256", value });

function fail(message) { throw new Error(message); }

function exactObject(value, keys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be one mapping.`);
  if (JSON.stringify(Object.keys(value).sort()) !== JSON.stringify([...keys].sort())) {
    fail(`${label} has unsupported or missing fields.`);
  }
}

function safeRelative(value, label) {
  if (
    typeof value !== "string" || value === "" || value.trim() !== value ||
    path.isAbsolute(value) || value.includes("\\") ||
    value.split("/").some((part) => part === "" || part === "." || part === "..")
  ) fail(`${label} must be a safe project-relative path.`);
  return value;
}

function frontmatter(text, label) {
  const lines = text.split(/\r?\n/u);
  if (lines[0] !== "---") return {};
  const end = lines.indexOf("---", 1);
  if (end < 0) fail(`${label} has unclosed frontmatter.`);
  const result = YAML.parse(lines.slice(1, end).join("\n"), { schema: "core", strict: true, uniqueKeys: true });
  if (result === null || typeof result !== "object" || Array.isArray(result)) fail(`${label} frontmatter must be one mapping.`);
  return result;
}

export function hasDecisionApplicabilityGate(text) {
  return text.split(/\r?\n/u).some((line) => line === "## Decision Applicability");
}

export async function gateFreePredecessorTasks(projectRoot) {
  const root = path.resolve(projectRoot);
  const bundle = YAML.parse(
    await readFile(path.join(root, ".nourd/knowledge/bundle.yaml"), "utf8"),
    { schema: "core", strict: true, uniqueKeys: true },
  );
  if (bundle?.contract !== "nkf.bundle" || !["0.1", "0.2", "0.3", "0.4"].includes(bundle?.nkf_version)) {
    fail("Retrospective Task-gate review requires one supported 0.1-0.4 predecessor bundle.");
  }
  const knowledgeRoot = safeRelative(bundle.knowledge_root, "Knowledge root");
  const tasks = [];
  for (const item of bundle.non_records ?? []) {
    if (item?.kind !== "task") continue;
    const relative = safeRelative(item.path, "Task path");
    const bytes = await readFile(path.join(root, ...knowledgeRoot.split("/"), ...relative.split("/")));
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    if (hasDecisionApplicabilityGate(text)) continue;
    const metadata = frontmatter(text, relative);
    if (typeof metadata.task_id !== "string" || metadata.task_id === "") {
      fail(`${relative} has no stable Task ID for retrospective gate review.`);
    }
    tasks.push({
      id: metadata.task_id,
      path: relative,
      predecessor_version: bundle.nkf_version,
      predecessor_source_digest: digest(sha256(bytes)),
      bytes,
    });
  }
  tasks.sort((left, right) => left.id.localeCompare(right.id, "en"));
  if (new Set(tasks.map((task) => task.id)).size !== tasks.length) fail("Gate-free predecessor Task IDs must be unique.");
  return { bundle, knowledgeRoot, tasks };
}

export async function writePredecessorGateReviewTemplate0_5({ projectRoot, reviewPath }) {
  const observed = await gateFreePredecessorTasks(projectRoot);
  if (observed.tasks.length === 0) return null;
  const review = {
    contract: "nkf.semantic-review-input",
    nkf_version: "0.5",
    stage: "predecessor-gates",
    retrospective_gate_review: {
      reviewer: { kind: "agent", id: "REVIEWER_ID_REQUIRED" },
      reviewed_at: "REVIEWED_AT_UTC_MILLISECOND_REQUIRED",
      gates: observed.tasks.map((task) => ({
        task: task.id,
        predecessor_source_digest: task.predecessor_source_digest,
        gate_markdown: [
          "## Decision Applicability",
          "",
          "### Applicable Decisions",
          "",
          "REVIEW_APPLICABLE_DECISIONS_REQUIRED",
          "",
          "### Mandatory Capabilities",
          "",
          "REVIEW_MANDATORY_CAPABILITIES_REQUIRED",
          "",
          `This gate was added retrospectively during the NKF ${task.predecessor_version}-to-0.5 migration; no`,
          "historical extraction is implied.",
          "",
        ].join("\n"),
      })),
    },
  };
  const target = path.resolve(reviewPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, YAML.stringify(review, { lineWidth: 0, aliasDuplicateObjects: false }));
  return { path: target, tasks: observed.tasks.length, stage: "predecessor-gates" };
}

function validTimestamp(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:(?:[0-5]\d|60)\.\d{3}Z$/u.test(value) && !Number.isNaN(Date.parse(value));
}

function validateGateMarkdown(value, predecessorVersion, taskId) {
  if (typeof value !== "string" || !value.endsWith("\n")) fail(`Retrospective gate for ${taskId} must end with one LF.`);
  if (value.includes("\r")) fail(`Retrospective gate for ${taskId} must use LF line endings.`);
  if (!value.startsWith("## Decision Applicability\n")) fail(`Retrospective gate for ${taskId} must begin with the exact Decision Applicability heading.`);
  if (value.split("\n").filter((line) => line === "## Decision Applicability").length !== 1) {
    fail(`Retrospective gate for ${taskId} must contain exactly one Decision Applicability heading.`);
  }
  if (
    value.includes("REVIEW_") ||
    !value.includes("\n### Applicable Decisions\n\n") ||
    !value.includes("\n### Mandatory Capabilities\n\n")
  ) fail(`Retrospective gate for ${taskId} is incomplete or lacks the two required subsections.`);
  const disclosure = `This gate was added retrospectively during the NKF ${predecessorVersion}-to-0.5 migration; no\nhistorical extraction is implied.\n`;
  if (!value.endsWith(disclosure)) fail(`Retrospective gate for ${taskId} must end with the exact no-historical-extraction disclosure.`);
}

export async function validateRetrospectiveGateReview0_5({ projectRoot, review }) {
  exactObject(review, ["contract", "nkf_version", "stage", "retrospective_gate_review"], "Predecessor-gates review");
  if (review.contract !== "nkf.semantic-review-input" || review.nkf_version !== "0.5" || review.stage !== "predecessor-gates") {
    fail("The retrospective gate input has the wrong contract, version, or stage.");
  }
  const value = review.retrospective_gate_review;
  exactObject(value, ["reviewer", "reviewed_at", "gates"], "Retrospective gate review");
  exactObject(value.reviewer, ["kind", "id"], "Retrospective gate reviewer");
  if (!["human", "agent"].includes(value.reviewer.kind) || typeof value.reviewer.id !== "string" || value.reviewer.id === "" || value.reviewer.id.includes("REQUIRED")) {
    fail("The retrospective gate reviewer must be one completed human or agent identity.");
  }
  if (!validTimestamp(value.reviewed_at) || value.reviewed_at.includes("REQUIRED")) fail("The retrospective gate review requires one exact completed review instant.");
  if (!Array.isArray(value.gates) || value.gates.length === 0) fail("The retrospective gate review requires a non-empty gates array.");

  const observed = await gateFreePredecessorTasks(projectRoot);
  const expected = observed.tasks.map((task) => task.id);
  const actual = value.gates.map((gate) => gate?.task);
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail("Retrospective gates must cover every and only gate-free predecessor Task in exact Task-ID order.");
  const byId = new Map(observed.tasks.map((task) => [task.id, task]));
  const gates = new Map();
  for (const gate of value.gates) {
    exactObject(gate, ["task", "predecessor_source_digest", "gate_markdown"], `Retrospective gate ${gate?.task ?? "unknown"}`);
    const task = byId.get(gate.task);
    if (task === undefined) fail(`Retrospective gate Task ${gate.task} is not one exact gate-free predecessor Task.`);
    exactObject(gate.predecessor_source_digest, ["algorithm", "value"], `Predecessor digest ${gate.task}`);
    if (gate.predecessor_source_digest.algorithm !== "sha-256" || gate.predecessor_source_digest.value !== task.predecessor_source_digest.value) {
      fail(`Retrospective gate ${gate.task} does not bind the exact predecessor source bytes.`);
    }
    validateGateMarkdown(gate.gate_markdown, task.predecessor_version, task.id);
    gates.set(task.id, {
      ...task,
      gate_markdown: gate.gate_markdown,
      gate_bytes: Buffer.from(gate.gate_markdown, "utf8"),
      reviewer: structuredClone(value.reviewer),
      reviewed_at: value.reviewed_at,
    });
  }
  return { review: structuredClone(value), tasks: observed.tasks, gates };
}
