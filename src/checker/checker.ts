import { randomUUID } from "node:crypto";
import {
  lstat,
  readFile,
  readdir,
  realpath,
  rename,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { validateDecisionApplicabilityGate } from "./applicability.js";
import { bindingsForVersion } from "./bindings.js";
import { loadContracts } from "./contracts.js";
import { RuleEmitter } from "./diagnostics.js";
import { validateExtensions } from "./extensions.js";
import { parseMarkdown, type MarkdownModel } from "./markdown.js";
import {
  discoverMarkdown,
  observationDiagnostics,
  SnapshotCollector,
  validKnowledgePath,
  validProjectPath,
  validKnowledgeRootLexical,
  type Observation,
} from "./project.js";
import {
  attachCoreVocabularies,
  validateGraph,
  validateRecordContracts,
  type RecordUnit,
} from "./semantic.js";
import { containsNativeSecret } from "./security.js";
import { validatePortableTopology } from "./topology.js";
import {
  defaultCaseless,
  protectedCanonicalRanges,
  toUnicode17TitleCase,
} from "./titlecase.js";
import {
  PHASES,
  type Diagnostic,
  type Phase,
  type PhaseState,
  type ValidateOptions,
  type ValidationResult,
} from "./types.js";
import {
  asObject,
  escapePointer,
  fixedUtc,
  isWithin,
  sha256,
  snapshot,
  uniqueDiagnostics,
  utf16Compare,
  values,
} from "./util.js";
import { parseNativeYaml } from "./yaml.js";

interface ParsedRecord {
  artifact: string;
  bytes: Buffer;
  value: Record<string, any> | null;
  schemaValid: boolean;
  declarationDigest: string;
  observation: Observation;
  markdown?: MarkdownModel;
  sourceObservation?: Observation;
  sourceValid: boolean;
}

interface ParsedNonRecord {
  index: number;
  declaration: Record<string, any>;
  observation: Observation;
  markdown?: MarkdownModel;
}

export class ProjectNotInitializedError extends Error {
  readonly code = "NKF_PROJECT_NOT_INITIALIZED";

  constructor() {
    super(
      "The candidate project root is not safely initialized for native NKF validation: .nourd must already resolve to an in-project directory.",
    );
    this.name = "ProjectNotInitializedError";
  }
}

async function assertNourdInvocationPrecondition(projectRoot: string): Promise<void> {
  const nourd = path.join(projectRoot, ".nourd");
  try {
    await lstat(nourd);
    const resolved = await realpath(nourd);
    const finalStats = await stat(nourd);
    if (!finalStats.isDirectory() || !isWithin(projectRoot, resolved)) {
      throw new ProjectNotInitializedError();
    }
  } catch (error) {
    if (error instanceof ProjectNotInitializedError) throw error;
    throw new ProjectNotInitializedError();
  }
}

function validateRequest(options: ValidateOptions): void {
  const { request } = options;
  if (!["structural", "contract", "full-bundle"].includes(request.level)) {
    throw new TypeError("Unsupported conformance level.");
  }
  if (request.level === "contract" && (request.record_id === null || request.record_id === "")) {
    throw new TypeError("Contract validation requires one record ID.");
  }
  if (request.level !== "contract" && request.record_id !== null) {
    throw new TypeError("Only contract validation accepts a record ID.");
  }
  if (request.level === "structural" && request.acceptance_binding !== "not-requested") {
    throw new TypeError("Structural validation cannot request acceptance binding.");
  }
}

function phaseHasError(diagnostics: Diagnostic[], phase: Phase): boolean {
  return diagnostics.some((diagnostic) => diagnostic.phase === phase && diagnostic.severity === "error");
}

function schemaMessage(error: any): string {
  const keyword = typeof error?.keyword === "string" ? error.keyword : "constraint";
  return `The declaration violates a local JSON Schema ${keyword} constraint.`;
}

function symlinkDiagnostics(
  emitter: RuleEmitter,
  observation: Observation,
  expectedKind: "regular-file" | "directory",
  knowledgePath: boolean,
  recordId?: string,
): void {
  if (
    observation.entry.resolution === "outside-project" ||
    (knowledgePath && observation.entry.resolution === "outside-knowledge-root")
  ) {
    emitter.emit("path.outside-root", "The resolved path escapes its allowed root.", {
      artifact: observation.entry.path,
      ...(recordId === undefined ? {} : { record_id: recordId }),
    });
  }
  for (const diagnostic of observationDiagnostics(observation, expectedKind, knowledgePath, recordId)) {
    emitter.emit(diagnostic.rule_id, diagnostic.message, {
      ...(diagnostic.artifact === undefined ? {} : { artifact: diagnostic.artifact }),
      ...(diagnostic.record_id === undefined ? {} : { record_id: diagnostic.record_id }),
    });
  }
}

function securityScan(
  emitter: RuleEmitter,
  artifacts: Array<{ artifact: string; bytes: Buffer | null }>,
): void {
  const seen = new Set<string>();
  for (const item of artifacts) {
    if (item.bytes === null || seen.has(item.artifact)) continue;
    seen.add(item.artifact);
    if (containsNativeSecret(item.bytes)) {
      emitter.emit("security.secret-pattern", "The artifact matches a prohibited native secret pattern.", {
        artifact: item.artifact,
      });
    }
  }
}

const COMMON_FRONTMATTER_KEYS = ["title", "summary", "created_at"] as const;
const COMMON_FRONTMATTER_KEYS_0_2 = ["summary", "created_at"] as const;
const TASK_ORIENTATION_KEYS_0_2 = ["owner", "decision_authority", "related_tasks"] as const;
function commonFrontMatterKeysFor(nkfVersion: "0.1" | "0.2"): readonly string[] {
  return nkfVersion === "0.2" ? COMMON_FRONTMATTER_KEYS_0_2 : COMMON_FRONTMATTER_KEYS;
}
const RECORD_FRONTMATTER_KEYS = ["id", "type", "record_lifecycle", "record_status"] as const;
const LIFECYCLE_RECORD_TYPES = new Set(["design", "decision", "specification", "realization"]);
const DESIGN_FRONTMATTER_KEYS = [
  "design_disposition",
  "design_decisions",
  "superseded_by",
  "withdrawal_source",
] as const;
const REALIZATION_FRONTMATTER_KEYS = [
  "confirmation_status",
  "confirmation_decisions",
  "unconfirmed_scope",
] as const;
const TASK_FRONTMATTER_KEYS = ["task_id", "task_status"] as const;

function hasOwn(value: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function orientationString(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value === value.trim() &&
    !value.includes("\n") &&
    !value.includes("\r")
  );
}

function exactUtcSecond(value: unknown): value is string {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)
  ) {
    return false;
  }
  const parsed = new Date(value);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString() === `${value.slice(0, -1)}.000Z`
  );
}

function uniqueOrientationStrings(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(orientationString) &&
    new Set(value).size === value.length
  );
}

function frontMatterContext(
  artifact: string,
  recordId?: string,
  key?: string,
): {
  artifact: string;
  record_id?: string;
  instance_pointer?: string;
} {
  return {
    artifact,
    ...(recordId === undefined ? {} : { record_id: recordId }),
    ...(key === undefined ? {} : { instance_pointer: `/frontmatter/${escapePointer(key)}` }),
  };
}

function requiredFrontMatterKeys(
  frontMatter: Record<string, unknown>,
  keys: readonly string[],
  artifact: string,
  emitter: RuleEmitter,
  recordId?: string,
): void {
  for (const key of keys) {
    if (!hasOwn(frontMatter, key)) {
      emitter.emit(
        "markdown.frontmatter.key.missing",
        `The governed frontmatter is missing the required ${key} key.`,
        frontMatterContext(artifact, recordId, key),
      );
    }
  }
}

function rejectUnsupportedFrontMatterKeys(
  frontMatter: Record<string, unknown>,
  allowed: Set<string>,
  artifact: string,
  emitter: RuleEmitter,
  recordId?: string,
): void {
  for (const key of Object.keys(frontMatter)) {
    if (!allowed.has(key)) {
      emitter.emit(
        "markdown.frontmatter.key.unsupported",
        "The frontmatter key is not allocated to this native document class.",
        frontMatterContext(artifact, recordId, key),
      );
    }
  }
}

function commonFrontMatterChecks(
  model: MarkdownModel,
  artifact: string,
  emitter: RuleEmitter,
  recordId?: string,
  nkfVersion: "0.1" | "0.2" = "0.1",
): Record<string, unknown> | null {
  if (!model.frontMatterPresent || model.frontMatter === null) {
    emitter.emit(
      "markdown.frontmatter.required",
      "A represented non-Evidence Markdown document requires governed frontmatter.",
      frontMatterContext(artifact, recordId),
    );
    return null;
  }
  const frontMatter = model.frontMatter;
  requiredFrontMatterKeys(frontMatter, commonFrontMatterKeysFor(nkfVersion), artifact, emitter, recordId);

  const shapeCheckedKeys = nkfVersion === "0.2" ? (["summary"] as const) : (["title", "summary"] as const);
  for (const key of shapeCheckedKeys) {
    if (hasOwn(frontMatter, key) && !orientationString(frontMatter[key])) {
      emitter.emit(
        "markdown.frontmatter.value.invalid",
        `The ${key} value must be a non-empty, trimmed, single-line string.`,
        frontMatterContext(artifact, recordId, key),
      );
    }
  }
  if (hasOwn(frontMatter, "created_at") && !exactUtcSecond(frontMatter.created_at)) {
    emitter.emit(
      "markdown.frontmatter.created-at.invalid",
      "created_at must be a real UTC instant serialized exactly as YYYY-MM-DDTHH:mm:ssZ.",
      frontMatterContext(artifact, recordId, "created_at"),
    );
  }

  if (model.h1.length !== 1) {
    emitter.emit(
      recordId === undefined ? "markdown.h1-count.invalid" : "record.h1-count.invalid",
      "A represented non-Evidence Markdown document must have exactly one top-level H1.",
      frontMatterContext(artifact, recordId),
    );
  } else if (
    nkfVersion === "0.1" &&
    orientationString(frontMatter.title) &&
    frontMatter.title !== model.h1[0]?.text
  ) {
    emitter.emit(
      "markdown.frontmatter.title-mismatch",
      "The frontmatter title does not equal the Markdown H1.",
      frontMatterContext(artifact, recordId, "title"),
    );
  }
  return frontMatter;
}

function recordFrontMatterChecks(
  record: ParsedRecord,
  model: MarkdownModel,
  emitter: RuleEmitter,
  nkfVersion: "0.1" | "0.2" = "0.1",
): void {
  const declaration = record.value;
  if (declaration === null || declaration.type === "evidence") return;
  const recordId = String(declaration.id);
  const artifact = record.sourceObservation?.entry.path ?? record.artifact;
  const frontMatter = commonFrontMatterChecks(model, artifact, emitter, recordId, nkfVersion);
  if (frontMatter === null) return;

  requiredFrontMatterKeys(frontMatter, RECORD_FRONTMATTER_KEYS, artifact, emitter, recordId);
  const type = String(declaration.type);
  if (LIFECYCLE_RECORD_TYPES.has(type)) {
    requiredFrontMatterKeys(frontMatter, ["task"], artifact, emitter, recordId);
  }
  if (type === "design") {
    requiredFrontMatterKeys(frontMatter, ["design_disposition"], artifact, emitter, recordId);
  }
  if (type === "realization") {
    requiredFrontMatterKeys(frontMatter, ["confirmation_status"], artifact, emitter, recordId);
  }

  const allowed = new Set<string>([...commonFrontMatterKeysFor(nkfVersion), ...RECORD_FRONTMATTER_KEYS]);
  if (LIFECYCLE_RECORD_TYPES.has(type)) allowed.add("task");
  if (type === "design") DESIGN_FRONTMATTER_KEYS.forEach((key) => allowed.add(key));
  if (type === "realization") REALIZATION_FRONTMATTER_KEYS.forEach((key) => allowed.add(key));
  rejectUnsupportedFrontMatterKeys(frontMatter, allowed, artifact, emitter, recordId);

  const expected: Record<string, unknown> = {
    id: declaration.id,
    type: declaration.type,
    record_lifecycle: declaration.governance?.lifecycle,
    record_status: declaration.governance?.status,
    ...(nkfVersion === "0.2" ? {} : { title: declaration.title }),
  };
  for (const [key, value] of Object.entries(expected)) {
    if (hasOwn(frontMatter, key) && frontMatter[key] !== value) {
      emitter.emit(
        "markdown.frontmatter.record-mismatch",
        "The frontmatter record identity or declared-governance value does not equal the declaration.",
        frontMatterContext(artifact, recordId, key),
      );
    }
  }

  if (
    LIFECYCLE_RECORD_TYPES.has(type) &&
    hasOwn(frontMatter, "task") &&
    !orientationString(frontMatter.task)
  ) {
    emitter.emit(
      "markdown.frontmatter.value.invalid",
      "task must be one non-empty, trimmed, single-line Task identifier.",
      frontMatterContext(artifact, recordId, "task"),
    );
  }

  if (type === "design") {
    const disposition = frontMatter.design_disposition;
    const supported = new Set(["active", "adopted", "rejected", "superseded", "withdrawn"]);
    if (!supported.has(String(disposition))) {
      emitter.emit(
        "markdown.frontmatter.design.invalid",
        "The Design disposition is unsupported.",
        frontMatterContext(artifact, recordId, "design_disposition"),
      );
    } else {
      const requires = (key: string) => {
        if (!hasOwn(frontMatter, key)) {
          emitter.emit(
            "markdown.frontmatter.design.invalid",
            `The Design disposition requires ${key}.`,
            frontMatterContext(artifact, recordId, key),
          );
        }
      };
      const forbids = (key: string) => {
        if (hasOwn(frontMatter, key)) {
          emitter.emit(
            "markdown.frontmatter.design.invalid",
            `The Design disposition forbids ${key}.`,
            frontMatterContext(artifact, recordId, key),
          );
        }
      };
      if (disposition === "active") {
        ["design_decisions", "superseded_by", "withdrawal_source"].forEach(forbids);
      } else if (disposition === "adopted" || disposition === "rejected") {
        requires("design_decisions");
        ["superseded_by", "withdrawal_source"].forEach(forbids);
      } else if (disposition === "superseded") {
        requires("superseded_by");
        forbids("withdrawal_source");
      } else if (disposition === "withdrawn") {
        requires("withdrawal_source");
        ["design_decisions", "superseded_by"].forEach(forbids);
      }
    }
    for (const key of ["design_decisions", "superseded_by"] as const) {
      if (hasOwn(frontMatter, key) && !uniqueOrientationStrings(frontMatter[key])) {
        emitter.emit(
          "markdown.frontmatter.design.invalid",
          `${key} must be a non-empty unique list of exact record IDs.`,
          frontMatterContext(artifact, recordId, key),
        );
      }
    }
    if (hasOwn(frontMatter, "withdrawal_source")) {
      const source = asObject(frontMatter.withdrawal_source);
      if (
        source === null ||
        Object.keys(source).some((key) => !["kind", "id"].includes(key)) ||
        !["task", "record"].includes(String(source.kind)) ||
        !orientationString(source.id)
      ) {
        emitter.emit(
          "markdown.frontmatter.design.invalid",
          "withdrawal_source must be a closed {kind: task | record, id} mapping.",
          frontMatterContext(artifact, recordId, "withdrawal_source"),
        );
      }
    }
  }

  if (type === "realization") {
    const confirmation = frontMatter.confirmation_status;
    if (!["unconfirmed", "partially-confirmed", "confirmed"].includes(String(confirmation))) {
      emitter.emit(
        "markdown.frontmatter.confirmation.invalid",
        "The Realization confirmation status is unsupported.",
        frontMatterContext(artifact, recordId, "confirmation_status"),
      );
    } else {
      const hasDecisions = hasOwn(frontMatter, "confirmation_decisions");
      const hasScope = hasOwn(frontMatter, "unconfirmed_scope");
      if (
        (confirmation === "confirmed" && (!hasDecisions || hasScope)) ||
        (confirmation === "unconfirmed" && (hasDecisions || hasScope)) ||
        (confirmation === "partially-confirmed" && (!hasDecisions || !hasScope))
      ) {
        emitter.emit(
          "markdown.frontmatter.confirmation.invalid",
          "The Realization confirmation provenance does not match confirmation_status.",
          frontMatterContext(artifact, recordId, "confirmation_status"),
        );
      }
    }
    if (
      hasOwn(frontMatter, "confirmation_decisions") &&
      !uniqueOrientationStrings(frontMatter.confirmation_decisions)
    ) {
      emitter.emit(
        "markdown.frontmatter.confirmation.invalid",
        "confirmation_decisions must be a non-empty unique list of exact Decision record IDs.",
        frontMatterContext(artifact, recordId, "confirmation_decisions"),
      );
    }
    if (
      hasOwn(frontMatter, "unconfirmed_scope") &&
      !orientationString(frontMatter.unconfirmed_scope)
    ) {
      emitter.emit(
        "markdown.frontmatter.confirmation.invalid",
        "unconfirmed_scope must be a non-empty, trimmed, single-line string.",
        frontMatterContext(artifact, recordId, "unconfirmed_scope"),
      );
    }
  }
}

function sourceChecks(
  record: ParsedRecord,
  projectTerms: string[],
  emitter: RuleEmitter,
  nkfVersion: "0.1" | "0.2" = "0.1",
): void {
  const declaration = record.value;
  if (declaration === null || record.sourceObservation?.bytes === null || record.sourceObservation?.bytes === undefined) {
    return;
  }
  const recordId = String(declaration.id);
  let markdownText: string;
  try {
    markdownText = new TextDecoder("utf-8", { fatal: true }).decode(record.sourceObservation.bytes);
  } catch {
    emitter.emit("markdown.utf8.invalid", "The Markdown source is not valid UTF-8.", {
      artifact: record.sourceObservation.entry.path,
      record_id: recordId,
    });
    return;
  }
  const model = parseMarkdown(markdownText);
  record.markdown = model;
  if (model.frontMatterError !== null) {
    emitter.emit(
      "markdown.frontmatter.invalid",
      "The Markdown front-matter envelope is unsafe, malformed, or unclosed.",
      {
        artifact: record.sourceObservation.entry.path,
        record_id: recordId,
      },
    );
    return;
  }
  recordFrontMatterChecks(record, model, emitter, nkfVersion);
  const h1 = model.h1[0];
  if (h1 !== undefined && declaration.title !== h1.text) {
    emitter.emit("record.title.mismatch", "The declaration title does not equal the Markdown H1.", {
      artifact: record.artifact,
      record_id: recordId,
      instance_pointer: "/title",
    });
  }
  const terms = ["NKF", ...projectTerms];
  if (h1 !== undefined) {
    const protectedRanges = protectedCanonicalRanges(h1.text, terms, h1.protectedRanges);
    if (toUnicode17TitleCase(h1.text, protectedRanges) !== h1.text) {
      emitter.emit("record.title.case-invalid", "The Markdown H1 is not Unicode 17 Title Case.", {
        artifact: record.artifact,
        record_id: recordId,
      });
    }
  }
  if (model.subordinateBeforeSection || model.sections.some((heading) => heading.level === 3 && heading.path.length !== 2)) {
    emitter.emit("section.heading.hierarchy-invalid", "A participating subordinate heading appears before an H2 section.", {
      artifact: record.artifact,
      record_id: recordId,
    });
  }

  for (const heading of model.sections) {
    const protectedRanges = protectedCanonicalRanges(heading.text, terms, heading.protectedRanges);
    if (toUnicode17TitleCase(heading.text, protectedRanges) !== heading.text) {
      emitter.emit("section.heading.case-invalid", "A semantic Markdown heading is not Unicode 17 Title Case.", {
        artifact: record.artifact,
        record_id: recordId,
      });
    }
  }

  const headingsByKey = new Map<string, typeof model.sections>();
  for (const heading of model.sections) {
    const key = `${JSON.stringify(heading.path)}#${heading.occurrence}`;
    const list = headingsByKey.get(key) ?? [];
    list.push(heading);
    headingsByKey.set(key, list);
  }
  const mapped = new Map<string, number[]>();
  values<Record<string, any>>(declaration.sections).forEach((section, index) => {
    const key = `${JSON.stringify(section.heading_path)}#${section.occurrence}`;
    const matches = headingsByKey.get(key) ?? [];
    if (matches.length !== 1) {
      emitter.emit("section.heading.unresolved", "The declared section heading does not resolve exactly once.", {
        artifact: record.artifact,
        record_id: recordId,
        instance_pointer: `/sections/${index}/heading_path`,
        source_section: section.id,
      });
    } else {
      const indexes = mapped.get(key) ?? [];
      indexes.push(index);
      mapped.set(key, indexes);
    }
  });
  for (const [key, indexes] of mapped) {
    if (indexes.length > 1) {
      for (const index of indexes.slice(1)) {
        const section = values<Record<string, any>>(declaration.sections)[index];
        emitter.emit("section.heading.duplicate-mapping", "Two declarations map the same Markdown heading.", {
          artifact: record.artifact,
          record_id: recordId,
          instance_pointer: `/sections/${index}/heading_path`,
          ...(section?.id === undefined ? {} : { source_section: section.id }),
        });
      }
    }
    headingsByKey.delete(key);
  }
  for (const [key] of headingsByKey) {
    emitter.emit("section.heading.unrepresented", "A semantic Markdown heading has no section declaration.", {
      artifact: record.artifact,
      record_id: recordId,
      instance_pointer: `/sections/${escapePointer(key)}`,
    });
  }
}

function nonRecordSourceChecks(
  nonRecord: ParsedNonRecord,
  emitter: RuleEmitter,
  nkfVersion: "0.1" | "0.2" = "0.1",
  acceptedDecisionIds: ReadonlySet<string> = new Set(),
): void {
  const artifact = nonRecord.observation.entry.path;
  const bytes = nonRecord.observation.bytes;
  if (bytes === null) return;
  let markdownText: string;
  try {
    markdownText = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    emitter.emit("markdown.utf8.invalid", "The Markdown source is not valid UTF-8.", {
      artifact,
    });
    return;
  }
  const model = parseMarkdown(markdownText);
  nonRecord.markdown = model;
  if (model.frontMatterError !== null) {
    emitter.emit(
      "markdown.frontmatter.invalid",
      "The Markdown front-matter envelope is unsafe, malformed, or unclosed.",
      { artifact },
    );
    return;
  }
  if (nonRecord.declaration.kind === "evidence") return;

  const frontMatter = commonFrontMatterChecks(model, artifact, emitter, undefined, nkfVersion);
  if (frontMatter === null) return;
  const allowed = new Set<string>(commonFrontMatterKeysFor(nkfVersion));
  if (nonRecord.declaration.kind === "task") {
    TASK_FRONTMATTER_KEYS.forEach((key) => allowed.add(key));
    if (nkfVersion === "0.2") {
      TASK_ORIENTATION_KEYS_0_2.forEach((key) => allowed.add(key));
      for (const key of ["owner", "decision_authority"] as const) {
        if (hasOwn(frontMatter, key) && !orientationString(frontMatter[key])) {
          emitter.emit(
            "markdown.frontmatter.value.invalid",
            `The ${key} value must be a non-empty, trimmed, single-line string.`,
            frontMatterContext(artifact, undefined, key),
          );
        }
      }
      if (hasOwn(frontMatter, "related_tasks")) {
        const related = frontMatter.related_tasks;
        const items = Array.isArray(related) ? related : null;
        const ownTaskId = typeof frontMatter.task_id === "string" ? frontMatter.task_id : null;
        if (
          items === null ||
          items.length === 0 ||
          items.some((item) => !orientationString(item)) ||
          new Set(items).size !== items.length ||
          (ownTaskId !== null && items.includes(ownTaskId))
        ) {
          emitter.emit(
            "markdown.frontmatter.value.invalid",
            "related_tasks must be a non-empty, duplicate-free sequence of other Task identifiers.",
            frontMatterContext(artifact, undefined, "related_tasks"),
          );
        }
      }
    }
    requiredFrontMatterKeys(frontMatter, TASK_FRONTMATTER_KEYS, artifact, emitter);
    if (hasOwn(frontMatter, "task_id") && !orientationString(frontMatter.task_id)) {
      emitter.emit(
        "markdown.frontmatter.task.invalid",
        "task_id must be a non-empty, trimmed, single-line string.",
        frontMatterContext(artifact, undefined, "task_id"),
      );
    }
    if (
      hasOwn(frontMatter, "task_status") &&
      !["active", "deferred", "completed"].includes(String(frontMatter.task_status))
    ) {
      emitter.emit(
        "markdown.frontmatter.task.invalid",
        "task_status must be active, deferred, or completed.",
        frontMatterContext(artifact, undefined, "task_status"),
      );
    }
    if (nkfVersion === "0.2") {
      validateDecisionApplicabilityGate({
        artifact,
        model,
        taskStatus: typeof frontMatter.task_status === "string" ? frontMatter.task_status : null,
        acceptedDecisionIds,
        emitter,
      });
    }
  }
  rejectUnsupportedFrontMatterKeys(frontMatter, allowed, artifact, emitter);
}

async function guidanceVersionChecks(
  executable: Record<string, any>,
  nkfVersion: string,
  collector: SnapshotCollector,
  emitter: RuleEmitter,
): Promise<void> {
  const contract = executable.guidance_versioning as Record<string, any> | undefined;
  if (contract === undefined) return;
  const prefix = typeof contract.marker_line_prefix === "string" ? contract.marker_line_prefix : "NKF Version: ";
  const paths = Array.isArray(contract.checked_paths) ? contract.checked_paths : [];
  for (const candidate of paths) {
    if (typeof candidate !== "string") continue;
    const observation = await collector.observe(candidate, { content: true });
    if (observation === undefined || observation.entry.final_kind !== "regular-file" || observation.bytes === null) {
      continue;
    }
    let text: string;
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(observation.bytes);
    } catch {
      emitter.emit(
        "guidance.version.mismatch",
        "The installed guidance file must decode as UTF-8 and declare its NKF version marker.",
        { artifact: candidate },
      );
      continue;
    }
    const marker = text
      .split("\n")
      .map((line) => (line.endsWith("\r") ? line.slice(0, -1) : line))
      .find((line) => line.startsWith(prefix));
    const declared = marker?.slice(prefix.length).trim();
    if (declared !== nkfVersion) {
      emitter.emit(
        "guidance.version.mismatch",
        declared === undefined
          ? "The installed guidance file does not declare the required NKF version marker."
          : `The installed guidance declares NKF ${declared} but the bundle declares NKF ${nkfVersion}.`,
        { artifact: candidate },
      );
    }
  }
}

function frontMatterReferenceChecks(
  records: ParsedRecord[],
  nonRecords: ParsedNonRecord[],
  emitter: RuleEmitter,
  nkfVersion: "0.1" | "0.2" = "0.1",
): void {
  const taskGroups = new Map<string, ParsedNonRecord[]>();
  for (const nonRecord of nonRecords) {
    if (nonRecord.declaration.kind !== "task") continue;
    const taskId = nonRecord.markdown?.frontMatter?.task_id;
    if (!orientationString(taskId)) continue;
    const group = taskGroups.get(taskId) ?? [];
    group.push(nonRecord);
    taskGroups.set(taskId, group);
  }
  for (const [taskId, group] of taskGroups) {
    if (group.length <= 1) continue;
    for (const nonRecord of group) {
      emitter.emit(
        "markdown.frontmatter.task.invalid",
        `The Task identity ${taskId} is duplicated.`,
        frontMatterContext(nonRecord.observation.entry.path, undefined, "task_id"),
      );
    }
  }

  if (nkfVersion === "0.2") {
    for (const nonRecord of nonRecords) {
      if (nonRecord.declaration.kind !== "task") continue;
      const frontMatter = nonRecord.markdown?.frontMatter;
      const related = frontMatter?.related_tasks;
      if (!Array.isArray(related)) continue;
      const ownTaskId = typeof frontMatter?.task_id === "string" ? frontMatter.task_id : null;
      for (const target of related) {
        if (!orientationString(target) || target === ownTaskId) continue;
        if ((taskGroups.get(target)?.length ?? 0) !== 1) {
          emitter.emit(
            "markdown.frontmatter.reference.unresolved",
            `The related_tasks reference ${target} does not resolve exactly once to another same-bundle Task.`,
            frontMatterContext(nonRecord.observation.entry.path, undefined, "related_tasks"),
          );
        }
      }
    }
  }

  const recordsById = new Map<string, ParsedRecord>();
  for (const record of records) {
    if (record.value !== null) recordsById.set(String(record.value.id), record);
  }
  const taskResolves = (id: string) => (taskGroups.get(id)?.length ?? 0) === 1;
  const recordResolves = (id: string, type?: string) => {
    const target = recordsById.get(id);
    return target !== undefined && (type === undefined || target.value?.type === type);
  };

  const unresolved = (record: ParsedRecord, key: string, value: string, expected: string) => {
    const recordId = String(record.value?.id);
    emitter.emit(
      "markdown.frontmatter.reference.unresolved",
      `The ${key} reference ${value} does not resolve exactly once to ${expected}.`,
      frontMatterContext(
        record.sourceObservation?.entry.path ?? record.artifact,
        recordId,
        key,
      ),
    );
  };

  for (const record of records) {
    const declaration = record.value;
    const frontMatter = record.markdown?.frontMatter;
    if (declaration === null || declaration.type === "evidence" || frontMatter === null || frontMatter === undefined) {
      continue;
    }
    const type = String(declaration.type);
    if (LIFECYCLE_RECORD_TYPES.has(type) && orientationString(frontMatter.task)) {
      if (!taskResolves(frontMatter.task)) {
        unresolved(record, "task", frontMatter.task, "one Task non-record");
      }
    }
    if (type === "design") {
      if (uniqueOrientationStrings(frontMatter.design_decisions)) {
        for (const id of frontMatter.design_decisions) {
          if (!recordResolves(id, "decision")) {
            unresolved(record, "design_decisions", id, "one Decision record");
          }
        }
      }
      if (uniqueOrientationStrings(frontMatter.superseded_by)) {
        for (const id of frontMatter.superseded_by) {
          if (!recordResolves(id)) {
            unresolved(record, "superseded_by", id, "one record");
          }
        }
      }
      const withdrawal = asObject(frontMatter.withdrawal_source);
      if (
        withdrawal !== null &&
        ["task", "record"].includes(String(withdrawal.kind)) &&
        orientationString(withdrawal.id)
      ) {
        const resolved =
          withdrawal.kind === "task"
            ? taskResolves(withdrawal.id)
            : recordResolves(withdrawal.id);
        if (!resolved) {
          unresolved(
            record,
            "withdrawal_source",
            withdrawal.id,
            withdrawal.kind === "task" ? "one Task non-record" : "one record",
          );
        }
      }
    }
    if (
      type === "realization" &&
      uniqueOrientationStrings(frontMatter.confirmation_decisions)
    ) {
      for (const id of frontMatter.confirmation_decisions) {
        if (!recordResolves(id, "decision")) {
          unresolved(record, "confirmation_decisions", id, "one Decision record");
        }
      }
    }
  }
}

async function persistResult(projectRoot: string, result: ValidationResult): Promise<void> {
  const directory = path.join(projectRoot, ".nourd");
  const temporary = path.join(directory, `.validation-result.${result.execution.id}.tmp`);
  const target = path.join(directory, "validation-result.json");
  const bytes = `${JSON.stringify(result, null, 2)}\n`;
  await writeFile(temporary, bytes, { encoding: "utf8", mode: 0o600, flag: "wx" });
  try {
    await rename(temporary, target);
  } catch (error) {
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

async function peekBundleNkfVersion(projectRoot: string): Promise<string | null> {
  try {
    const bytes = await readFile(path.join(projectRoot, ".nourd", "knowledge", "bundle.yaml"));
    const parsed = parseNativeYaml(bytes, ".nourd/knowledge/bundle.yaml");
    const version = (parsed.value as Record<string, unknown> | null)?.["nkf_version"];
    return typeof version === "string" ? version : null;
  } catch {
    return null;
  }
}

export async function validateProject(options: ValidateOptions): Promise<ValidationResult> {
  validateRequest(options);
  const projectRoot = await realpath(path.resolve(options.projectRoot));
  await assertNourdInvocationPrecondition(projectRoot);
  const started = (options.now ?? (() => new Date()))();
  const executionId = (options.executionId ?? randomUUID)().toLowerCase();
  const declaredVersion = await peekBundleNkfVersion(projectRoot);
  const nkfVersion = declaredVersion ?? "0.1";
  const requestedContractRoot = path.resolve(options.contractRoot);
  const requestedBase = path.basename(requestedContractRoot);
  const versionContractRoot =
    requestedBase !== nkfVersion && bindingsForVersion(requestedBase) !== undefined
      ? path.join(path.dirname(requestedContractRoot), nkfVersion)
      : requestedContractRoot;
  const loaded = await loadContracts(versionContractRoot, bindingsForVersion(nkfVersion), nkfVersion);
  const resultVersion: "0.1" | "0.2" =
    bindingsForVersion(nkfVersion) === undefined ? "0.1" : (nkfVersion as "0.1" | "0.2");
  const emitter = new RuleEmitter(loaded.executable);
  const diagnostics: Diagnostic[] = [...loaded.diagnostics];
  const evaluated = new Set<Phase>(["contracts"]);
  const collector = new SnapshotCollector(projectRoot);
  const phasePassed = (phase: Phase) =>
    evaluated.has(phase) && !phaseHasError([...diagnostics, ...emitter.diagnostics], phase);
  const fixedObservations = await Promise.all([
    collector.observe(".nourd"),
    collector.observe(".nourd/knowledge"),
    collector.observe(".nourd/knowledge/records"),
    collector.observe(".nourd/knowledge/bundle.yaml", { content: true }),
  ]);
  const [nourdObservation, knowledgeControlObservation, recordsDirectoryObservation, bundleObservation] =
    fixedObservations;
  if (
    nourdObservation === undefined ||
    knowledgeControlObservation === undefined ||
    recordsDirectoryObservation === undefined ||
    bundleObservation === undefined
  ) {
    throw new Error("Failed to observe the fixed NKF project structure.");
  }

  let bundle: Record<string, any> | null = null;
  const parsedRecords: ParsedRecord[] = [];
  const parsedNonRecords: ParsedNonRecord[] = [];
  if (phasePassed("contracts")) {
    evaluated.add("parse");
    if (bundleObservation.bytes === null) {
      emitter.emit("bundle.manifest.missing", "The fixed NKF bundle manifest is missing.", {
        artifact: ".nourd/knowledge/bundle.yaml",
      });
    } else {
      const parsed = parseNativeYaml(bundleObservation.bytes, ".nourd/knowledge/bundle.yaml");
      bundle = parsed.value;
      diagnostics.push(...parsed.diagnostics);
    }

    if (recordsDirectoryObservation.entry.final_kind === "directory") {
      let entries = await readdir(recordsDirectoryObservation.absolute, { withFileTypes: true });
      entries = entries.sort((left, right) => utf16Compare(left.name, right.name));
      for (const entry of entries) {
        const artifact = `.nourd/knowledge/records/${entry.name}`;
        const observation = await collector.observe(artifact, { content: entry.name.endsWith(".yaml") });
        if (!entry.name.endsWith(".yaml")) {
          emitter.emit("record.declaration.non-yaml", "Every direct declaration-directory entry must be a .yaml file.", {
            artifact,
          });
          continue;
        }
        if (observation.entry.final_kind !== "regular-file" || observation.bytes === null) continue;
        const parsed = parseNativeYaml(observation.bytes, artifact);
        diagnostics.push(...parsed.diagnostics);
        parsedRecords.push({
          artifact,
          bytes: observation.bytes,
          value: parsed.value,
          schemaValid: false,
          declarationDigest: sha256(observation.bytes),
          observation,
          sourceValid: false,
        });
      }
    }
  }

  if (phasePassed("parse")) {
    evaluated.add("schema");
    if (bundle !== null && !loaded.validators.bundle(bundle)) {
      for (const error of loaded.validators.bundleErrors() ?? []) {
        const ajvError = error as any;
        emitter.emit("schema.bundle.invalid", schemaMessage(ajvError), {
          artifact: ".nourd/knowledge/bundle.yaml",
          instance_pointer: `${ajvError.instancePath || ""}/${ajvError.keyword}`,
        });
      }
    }
    for (const record of parsedRecords) {
      if (record.value === null) continue;
      record.schemaValid = loaded.validators.record(record.value);
      if (!record.schemaValid) {
        for (const error of loaded.validators.recordErrors() ?? []) {
          const ajvError = error as any;
          emitter.emit("schema.record.invalid", schemaMessage(ajvError), {
            artifact: record.artifact,
            ...(typeof record.value.id === "string" ? { record_id: record.value.id } : {}),
            instance_pointer: `${ajvError.instancePath || ""}/${ajvError.keyword}`,
          });
        }
      }
    }
  }

  let markdownDiscovery: Awaited<ReturnType<typeof discoverMarkdown>> | null = null;
  const uniqueRecords: ParsedRecord[] = [];
  const projectTerms: string[] = [];
  let knowledgeRootAbsolute: string | null = null;
  if (phasePassed("schema") && bundle !== null) {
    evaluated.add("project");
    if (nourdObservation.entry.final_kind !== "directory") emitter.emit("path.file-kind.invalid", ".nourd must be a directory.", { artifact: ".nourd" });
    if (recordsDirectoryObservation.entry.direct_kind === "missing") emitter.emit("project.records-directory.missing", "The declaration directory is missing.", { artifact: ".nourd/knowledge/records" });
    else if (recordsDirectoryObservation.entry.final_kind !== "directory") emitter.emit("project.records-directory.invalid", "The declaration path is not a directory.", { artifact: ".nourd/knowledge/records" });
    symlinkDiagnostics(emitter, nourdObservation, "directory", false);
    symlinkDiagnostics(emitter, knowledgeControlObservation, "directory", false);
    symlinkDiagnostics(emitter, recordsDirectoryObservation, "directory", false);
    symlinkDiagnostics(emitter, bundleObservation, "regular-file", false);
    for (const record of parsedRecords) symlinkDiagnostics(emitter, record.observation, "regular-file", false);

    if (!validKnowledgeRootLexical(bundle.knowledge_root)) {
      emitter.emit("knowledge.root.invalid", "knowledge_root is not a valid project-relative directory path.", {
        artifact: ".nourd/knowledge/bundle.yaml",
        instance_pointer: "/knowledge_root",
      });
    } else {
      const rootRelative = bundle.knowledge_root;
      const rootObservation = await collector.observe(rootRelative);
      knowledgeRootAbsolute = path.resolve(projectRoot, rootRelative);
      if (rootObservation.entry.direct_kind === "missing") {
        emitter.emit("knowledge.root.missing", "The configured knowledge_root is missing.", {
          artifact: rootRelative,
        });
      } else {
        symlinkDiagnostics(emitter, rootObservation, "directory", false);
        if (rootObservation.resolvedAbsolute !== null && !isWithin(projectRoot, rootObservation.resolvedAbsolute)) {
          emitter.emit("knowledge.root.outside-project", "knowledge_root resolves outside the project.", {
            artifact: rootRelative,
          });
        }
        const resolvedNourd = nourdObservation.resolvedAbsolute;
        if (
          rootObservation.resolvedAbsolute !== null &&
          resolvedNourd !== null &&
          isWithin(resolvedNourd, rootObservation.resolvedAbsolute)
        ) {
          emitter.emit("knowledge.root.inside-nourd", "knowledge_root must remain outside .nourd.", {
            artifact: rootRelative,
          });
        }
      }
      if (rootObservation.entry.final_kind === "directory") {
        markdownDiscovery = await discoverMarkdown(projectRoot, rootRelative, collector);
      }
    }

    projectTerms.push(...values<string>(bundle.canonical_terms));
    const coreFold = defaultCaseless("NKF");
    bundle.canonical_terms?.forEach((term: string, index: number) => {
      if (defaultCaseless(term) === coreFold) {
        emitter.emit("canonical-term.core-conflict", "A project canonical term conflicts with the NKF-owned term.", {
          artifact: ".nourd/knowledge/bundle.yaml",
          instance_pointer: `/canonical_terms/${index}`,
        });
      }
    });

    const governedArtifacts = values<Record<string, any>>(bundle.governed_artifacts);
    if (governedArtifacts.length > 0 && bundle.root?.profile !== "nkf.profile.technology") {
      emitter.emit("artifact.profile.unsupported", "Only the Technology Profile may declare governed artifacts.", {
        artifact: ".nourd/knowledge/bundle.yaml",
        instance_pointer: "/governed_artifacts",
      });
    }
    const artifactIds = new Map<string, number>();
    const artifactPaths = new Map<string, number>();
    const artifactPhysicalPaths = new Map<string, number>();
    for (const [index, artifact] of governedArtifacts.entries()) {
      const id = String(artifact.id);
      const artifactPath = artifact.path;
      if (artifactIds.has(id)) {
        emitter.emit("artifact.id.duplicate", "A governed artifact ID is duplicated.", {
          artifact: ".nourd/knowledge/bundle.yaml",
          instance_pointer: `/governed_artifacts/${index}/id`,
        });
      } else {
        artifactIds.set(id, index);
      }
      if (!validProjectPath(artifactPath)) {
        emitter.emit("artifact.path.invalid", "The governed artifact path is not a safe project-relative path outside .nourd.", {
          artifact: ".nourd/knowledge/bundle.yaml",
          instance_pointer: `/governed_artifacts/${index}/path`,
        });
        continue;
      }
      if (artifactPaths.has(artifactPath)) {
        emitter.emit("artifact.path.duplicate", "A governed artifact path is declared more than once.", {
          artifact: artifactPath,
          instance_pointer: `/governed_artifacts/${index}/path`,
        });
      } else {
        artifactPaths.set(artifactPath, index);
      }
      const observation = await collector.observe(artifactPath, { content: true });
      symlinkDiagnostics(emitter, observation, "regular-file", false);
      if (observation.entry.direct_kind === "missing" || observation.entry.final_kind === null) {
        emitter.emit("artifact.missing", "The governed artifact file is missing.", {
          artifact: artifactPath,
          instance_pointer: `/governed_artifacts/${index}/path`,
        });
        continue;
      }
      if (observation.entry.final_kind !== "regular-file") {
        emitter.emit("artifact.file-kind.invalid", "The governed artifact must resolve to a regular file.", {
          artifact: artifactPath,
          instance_pointer: `/governed_artifacts/${index}/path`,
        });
        continue;
      }
      if (observation.resolvedAbsolute !== null) {
        if (artifactPhysicalPaths.has(observation.resolvedAbsolute)) {
          emitter.emit("artifact.path.duplicate", "Two governed artifact paths resolve to the same physical file.", {
            artifact: artifactPath,
            instance_pointer: `/governed_artifacts/${index}/path`,
          });
        } else {
          artifactPhysicalPaths.set(observation.resolvedAbsolute, index);
        }
      }
      if (observation.bytes !== null && sha256(observation.bytes) !== artifact.digest?.value) {
        emitter.emit("artifact.digest-mismatch", "The governed artifact bytes do not match the declared digest.", {
          artifact: artifactPath,
          instance_pointer: `/governed_artifacts/${index}/digest/value`,
        });
      }
    }

    const groupsById = new Map<string, ParsedRecord[]>();
    for (const record of parsedRecords.filter((candidate) => candidate.value !== null && candidate.schemaValid)) {
      const id = String(record.value?.id);
      const group = groupsById.get(id) ?? [];
      group.push(record);
      groupsById.set(id, group);
      if (path.posix.basename(record.artifact) !== `${id}.yaml`) {
        emitter.emit("record.filename.nonconventional", "The declaration filename does not follow <record-id>.yaml.", {
          artifact: record.artifact,
          record_id: id,
        });
      }
    }
    for (const [id, group] of groupsById) {
      if (group.length === 1) {
        const only = group[0];
        if (only !== undefined) uniqueRecords.push(only);
      } else {
        for (const record of group) {
          emitter.emit("record.id.duplicate", "A record ID is duplicated and therefore ambiguous.", {
            artifact: record.artifact,
            record_id: id,
            instance_pointer: "/id",
          });
        }
      }
    }

    const represented = new Map<string, Array<"record" | "non-record">>();
    const physicalSources = new Map<string, string>();
    const lexicalSources = new Map<string, string>();
    if (knowledgeRootAbsolute !== null) {
      for (const record of uniqueRecords) {
        const declaration = record.value;
        if (declaration === null) continue;
        const id = String(declaration.id);
        const sourcePath = declaration.source?.path;
        if (!validKnowledgePath(sourcePath)) {
          emitter.emit("path.invalid", "The record source path is not a valid knowledge-relative path.", {
            artifact: record.artifact,
            record_id: id,
            instance_pointer: "/source/path",
          });
          continue;
        }
        if (!sourcePath.endsWith(".md")) {
          emitter.emit("record.source.non-markdown", "A record source must have the .md suffix.", {
            artifact: record.artifact,
            record_id: id,
            instance_pointer: "/source/path",
          });
        }
        const logical = path.posix.join(String(bundle.knowledge_root), sourcePath);
        const priorLexicalOwner = lexicalSources.get(sourcePath);
        if (priorLexicalOwner !== undefined) {
          emitter.emit("record.source.duplicate", "Two records declare the same Markdown source path.", {
            artifact: logical,
            record_id: id,
          });
        } else {
          lexicalSources.set(sourcePath, id);
        }
        const observation =
          markdownDiscovery?.observations.get(sourcePath) ??
          (await collector.observe(logical, { content: true, knowledgeRoot: knowledgeRootAbsolute }));
        record.sourceObservation = observation;
        symlinkDiagnostics(emitter, observation, "regular-file", true, id);
        if (observation.entry.direct_kind === "missing" || observation.entry.final_kind === null) {
          emitter.emit("record.source.missing", "The declared Markdown source is missing.", {
            artifact: logical,
            record_id: id,
          });
        }
        if (observation.resolvedAbsolute !== null) {
          const previous = physicalSources.get(observation.resolvedAbsolute);
          if (previous !== undefined) {
            emitter.emit("record.source.duplicate", "Two records resolve to the same physical Markdown source.", {
              artifact: logical,
              record_id: id,
            });
          } else {
            physicalSources.set(observation.resolvedAbsolute, id);
          }
        }
        const representations = represented.get(sourcePath) ?? [];
        representations.push("record");
        represented.set(sourcePath, representations);
      }

      const nonRecordPhysical = new Map<string, number>();
      const nonRecordLexical = new Map<string, number>();
      for (const [index, nonRecord] of values<Record<string, any>>(bundle.non_records).entries()) {
        const nonRecordPath = nonRecord.path;
        if (!validKnowledgePath(nonRecordPath)) {
          emitter.emit("path.invalid", "The non-record path is not a valid knowledge-relative path.", {
            artifact: ".nourd/knowledge/bundle.yaml",
            instance_pointer: `/non_records/${index}/path`,
          });
          continue;
        }
        const logical = path.posix.join(String(bundle.knowledge_root), nonRecordPath);
        if (nonRecordLexical.has(nonRecordPath)) {
          emitter.emit("non-record.duplicate", "A non-record path is declared more than once.", {
            artifact: logical,
            instance_pointer: `/non_records/${index}/path`,
          });
        } else {
          nonRecordLexical.set(nonRecordPath, index);
        }
        const observation = await collector.observe(logical, {
          content: nonRecordPath.endsWith(".md"),
          knowledgeRoot: knowledgeRootAbsolute,
        });
        parsedNonRecords.push({
          index,
          declaration: nonRecord,
          observation,
        });
        symlinkDiagnostics(emitter, observation, "regular-file", true);
        if (observation.entry.direct_kind === "missing" || observation.entry.final_kind === null) {
          emitter.emit("non-record.missing", "The declared non-record file is missing.", {
            artifact: logical,
            instance_pointer: `/non_records/${index}/path`,
          });
        }
        if (observation.resolvedAbsolute !== null) {
          if (nonRecordPhysical.has(observation.resolvedAbsolute)) {
            emitter.emit("non-record.duplicate", "Two non-record declarations resolve to the same physical file.", {
              artifact: logical,
              instance_pointer: `/non_records/${index}/path`,
            });
          } else {
            nonRecordPhysical.set(observation.resolvedAbsolute, index);
          }
          if (physicalSources.has(observation.resolvedAbsolute)) {
            emitter.emit("non-record.conflict", "A non-record conflicts with a record source.", {
              artifact: logical,
              instance_pointer: `/non_records/${index}/path`,
            });
          }
        }
        const representations = represented.get(nonRecordPath) ?? [];
        representations.push("non-record");
        represented.set(nonRecordPath, representations);
      }

      for (const markdownPath of markdownDiscovery?.paths ?? []) {
        const representations = represented.get(markdownPath) ?? [];
        if (representations.length === 0) {
          emitter.emit("knowledge.markdown.unrepresented", "A Markdown file has no record or non-record representation.", {
            artifact: path.posix.join(String(bundle.knowledge_root), markdownPath),
          });
        } else if (representations.length > 1) {
          emitter.emit("knowledge.markdown.multiple-representations", "A Markdown file has multiple representations.", {
            artifact: path.posix.join(String(bundle.knowledge_root), markdownPath),
          });
        }
      }
      for (const [declaredPath, representations] of represented) {
        if (representations.length > 1 && !(markdownDiscovery?.paths.includes(declaredPath) ?? false)) {
          emitter.emit("knowledge.markdown.multiple-representations", "A declared knowledge path has multiple representations.", {
            artifact: path.posix.join(String(bundle.knowledge_root), declaredPath),
          });
        }
      }
    }
    if (knowledgeRootAbsolute !== null) {
      validatePortableTopology({
        bundle,
        records: uniqueRecords,
        nonRecords: parsedNonRecords,
        executable: loaded.executable,
        knowledgeRoot: String(bundle.knowledge_root),
        emitter,
      });
      if (resultVersion === "0.2") {
        await guidanceVersionChecks(loaded.executable, resultVersion, collector, emitter);
      }
    }
  }

  if (phasePassed("project")) {
    evaluated.add("source");
    for (const record of uniqueRecords) {
      if (record.value === null || record.sourceObservation?.bytes === null || record.sourceObservation?.bytes === undefined) continue;
      const expected = record.value.source?.digest?.value;
      const observed = sha256(record.sourceObservation.bytes);
      if (expected !== observed) {
        emitter.emit("record.source.digest-mismatch", "The Markdown bytes do not match the declared source digest.", {
          artifact: record.sourceObservation.entry.path,
          record_id: String(record.value.id),
          instance_pointer: "/source/digest/value",
        });
      }
      sourceChecks(record, projectTerms, emitter, resultVersion);
    }
    const acceptedDecisionIds = new Set<string>();
    for (const record of uniqueRecords) {
      const declaration = record.value as Record<string, any> | null;
      if (
        declaration?.type === "decision" &&
        declaration?.governance?.status === "accepted" &&
        typeof declaration?.id === "string"
      ) {
        acceptedDecisionIds.add(declaration.id);
      }
    }
    for (const nonRecord of parsedNonRecords) {
      if (
        nonRecord.declaration.path.endsWith(".md") &&
        nonRecord.observation.bytes !== null
      ) {
        nonRecordSourceChecks(nonRecord, emitter, resultVersion, acceptedDecisionIds);
      }
    }
    frontMatterReferenceChecks(uniqueRecords, parsedNonRecords, emitter, resultVersion);
    for (const record of uniqueRecords) {
      record.sourceValid = !emitter.diagnostics.some(
        (diagnostic) =>
          diagnostic.record_id === record.value?.id &&
          diagnostic.phase === "source" &&
          diagnostic.severity === "error",
      );
    }
  }

  const recordUnits: RecordUnit[] = uniqueRecords
    .filter((record): record is ParsedRecord & { value: Record<string, any> } => record.value !== null)
    .map((record) => ({
      artifact: record.artifact,
      declaration: record.value,
      declarationDigest: record.declarationDigest,
      sourceDigest: record.sourceObservation?.entry.content_sha256 ?? null,
      sourceValid: record.sourceValid,
    }));
  attachCoreVocabularies(recordUnits, loaded.executable);
  const requestedScope = new Set<string>(
    options.request.level === "contract"
      ? recordUnits
          .filter((record) => record.declaration.id === options.request.record_id)
          .map((record) => String(record.declaration.id))
      : recordUnits.map((record) => String(record.declaration.id)),
  );
  if (phasePassed("source")) {
    evaluated.add("extension-resolution");
    await validateExtensions(
      bundle ?? {},
      recordUnits,
      requestedScope,
      loaded.executable,
      options.extensionResolver,
      emitter,
      loaded.artifacts,
      resultVersion,
    );
  }
  if (phasePassed("extension-resolution")) {
    evaluated.add("bundle-graph");
    validateGraph(bundle ?? {}, recordUnits, loaded.executable, emitter);
    if (options.request.level === "contract" && requestedScope.size !== 1) {
      emitter.emit(
        "request.record.unresolved",
        "The requested record does not resolve to exactly one uniquely identified governed record.",
        { record_id: String(options.request.record_id) },
      );
    }
  }
  if (
    options.request.level !== "structural" &&
    phasePassed("bundle-graph")
  ) {
    evaluated.add("record-contract");
    validateRecordContracts(recordUnits, requestedScope, bundle ?? {}, loaded.executable, emitter);
  }

  if (phasePassed("project")) {
    evaluated.add("security");
    securityScan(emitter, [
      { artifact: ".nourd/knowledge/bundle.yaml", bytes: bundleObservation.bytes },
      ...parsedRecords.map((record) => ({ artifact: record.artifact, bytes: record.bytes })),
      ...[...(markdownDiscovery?.observations.entries() ?? [])].map(([relative, observation]) => ({
        artifact: path.posix.join(String(bundle?.knowledge_root ?? ""), relative),
        bytes: observation.bytes,
      })),
    ]);
  }

  const acceptanceOutcomes = new Map<string, "verified" | "contradicted" | "unavailable">();
  if (options.request.acceptance_binding === "requested" && phasePassed("bundle-graph")) {
    evaluated.add("authority-binding");
    for (const record of recordUnits.filter((unit) => requestedScope.has(String(unit.declaration.id)))) {
      const id = String(record.declaration.id);
      if (record.declaration.governance?.status !== "accepted") continue;
      let outcome: "verified" | "contradicted" | "unavailable" = "unavailable";
      if (options.authorityResolver !== undefined) {
        try {
          outcome = await options.authorityResolver.verify({
            recordId: id,
            declaration: record.declaration,
            declarationDigest: record.declarationDigest,
            sourceDigest: record.sourceDigest ?? "",
          });
        } catch {
          outcome = "unavailable";
        }
      }
      acceptanceOutcomes.set(id, outcome);
      if (outcome === "unavailable") {
        emitter.emit("authority.binding.unavailable", "Acceptance binding could not be verified.", {
          artifact: record.artifact,
          record_id: id,
        });
      } else if (outcome === "contradicted") {
        emitter.emit("authority.binding.contradicted", "Authoritative acceptance evidence contradicts the declaration.", {
          artifact: record.artifact,
          record_id: id,
        });
      }
    }
  }

  diagnostics.push(...emitter.diagnostics);
  const sortedDiagnostics = uniqueDiagnostics(diagnostics, PHASES);
  const requiredPhases: Phase[] = [
    "contracts",
    "parse",
    "schema",
    "project",
    "source",
    "extension-resolution",
    "bundle-graph",
    ...(options.request.level === "structural" ? [] : ["record-contract" as const]),
    "security",
  ];
  const state = (phase: Phase): PhaseState => {
    if (phase === "result") return "passed";
    if (!evaluated.has(phase)) return "not-evaluated";
    return phaseHasError(sortedDiagnostics, phase) ? "failed" : "passed";
  };
  const conformance = requiredPhases.every((phase) => state(phase) === "passed")
    ? "passed" as const
    : "failed" as const;

  const recordScope =
    options.request.level === "contract"
      ? recordUnits.filter((record) => record.declaration.id === options.request.record_id)
      : recordUnits;
  const recordResults: ValidationResult["records"] = recordScope
    .sort((left, right) => utf16Compare(String(left.declaration.id), String(right.declaration.id)))
    .map((record) => {
      const id = String(record.declaration.id);
      const relevantErrors = sortedDiagnostics.filter(
        (diagnostic) =>
          diagnostic.blocking === "conformance" &&
          diagnostic.severity === "error" &&
          (diagnostic.record_id === undefined || diagnostic.record_id === id),
      );
      const recordConformance =
        requiredPhases.some((phase) => state(phase) === "not-evaluated")
          ? "not-evaluated" as const
          : relevantErrors.length > 0
            ? "failed" as const
            : "passed" as const;
      const governance = asObject(record.declaration.governance);
      const status = governance?.status;
      const outcome = acceptanceOutcomes.get(id);
      const acceptanceBinding =
        !["accepted"].includes(String(status))
          ? "not-applicable" as const
          : outcome === "verified"
            ? "verified" as const
            : outcome === "contradicted"
              ? "contradicted" as const
              : "not-verified" as const;
      const governingBlocker = sortedDiagnostics.some(
        (diagnostic) =>
          diagnostic.blocking === "governing-use" &&
          (diagnostic.record_id === undefined || diagnostic.record_id === id),
      );
      const governingUse =
        status !== "accepted"
          ? "not-ready" as const
          : acceptanceBinding === "contradicted" || recordConformance === "failed" || governingBlocker
            ? "not-ready" as const
            : acceptanceBinding !== "verified" || recordConformance === "not-evaluated"
              ? "not-evaluated" as const
              : "ready" as const;
      return {
        record_id: id,
        declared_governance: governance,
        conformance: recordConformance,
        acceptance_binding: acceptanceBinding,
        governing_use: governingUse,
      };
    });
  const governingUse =
    options.request.level === "structural"
      ? "not-evaluated" as const
      : options.request.level === "contract"
        ? recordResults[0]?.governing_use ?? "not-ready"
        : conformance === "failed" || recordResults.some((record) => record.governing_use === "not-ready")
          ? "not-ready" as const
          : recordResults.some((record) => record.governing_use === "not-evaluated")
            ? "not-evaluated" as const
            : "ready" as const;

  const checkerBytes = await readFile(options.checkerArtifact);
  const observedCompletion = (options.now ?? (() => new Date()))();
  const completed = observedCompletion < started ? started : observedCompletion;
  const result: ValidationResult = {
    contract: "nkf.validation-result",
    nkf_version: resultVersion,
    execution: {
      id: executionId,
      runner: options.runner ?? "nourd-nkf-cli",
      started_at: fixedUtc(started),
      completed_at: fixedUtc(completed),
    },
    checker: {
      identity: options.checkerIdentity ?? "nourd-nkf-checker",
      digest: { algorithm: "sha-256", value: sha256(checkerBytes) },
    },
    contract_artifacts: loaded.artifacts,
    request: options.request,
    bundle_id: typeof bundle?.id === "string" ? bundle.id : null,
    profile:
      typeof bundle?.root?.profile !== "string"
        ? { identity: null, binding: "not-evaluated" }
        : loaded.executable.root_profiles?.selectable?.[bundle.root.profile] !== undefined
          ? { identity: bundle.root.profile, binding: "verified" }
          : { identity: bundle.root.profile, binding: "unsupported" },
    validated_snapshot: snapshot(collector.values(), resultVersion),
    phases: PHASES.map((id) => ({ id, state: state(id) })),
    conformance,
    records: recordResults,
    governing_use: governingUse,
    diagnostics: sortedDiagnostics,
  };
  if (!loaded.validators.result(result)) {
    throw new Error(
      `The checker could not construct a schema-valid validation result: ${JSON.stringify(loaded.validators.resultErrors())}`,
    );
  }
  if (
    options.request.level === "full-bundle" &&
    options.persist !== false
  ) {
    await persistResult(projectRoot, result);
  }
  return result;
}
