import type { RuleEmitter } from "./diagnostics.js";
import type { MarkdownModel } from "./markdown.js";

const GATE_SECTION = "Decision Applicability";
const DECISIONS_SUBSECTION = "Applicable Decisions";
const CAPABILITIES_SUBSECTION = "Mandatory Capabilities";
const NO_DECISIONS_SENTENCE = "No accepted decision applies to this Task.";
const NO_CAPABILITIES_SENTENCE = "No mandatory capability is implicated by this Task.";
const DECISIONS_HEADER = ["Reference", "Kind", "Carried Constraint"];
const CAPABILITIES_HEADER = ["Capability", "Finding", "Verification", "Exception"];
const CAPABILITY_FINDINGS = new Set(["proven", "unsupported", "unknown"]);
const VERIFICATION_LEVELS = new Set([
  "data-validity",
  "adapter-compatibility",
  "runtime-behaviour",
  "human-experience",
  "production-suitability",
]);

export interface GateInput {
  artifact: string;
  model: MarkdownModel;
  taskStatus: string | null;
  acceptedDecisionIds: ReadonlySet<string>;
  acceptedDecisionPaths: ReadonlyMap<string, string>;
  selfPath: string;
  emitter: RuleEmitter;
}

interface GateTable {
  header: string[];
  rows: string[][];
}

function normalizedSentence(lines: string[]): string {
  return lines.join(" ").replace(/\s+/g, " ").trim();
}

function splitUnescapedPipes(line: string): { cells: string[]; escapedPipe: boolean } {
  const segments: string[] = [];
  let current = "";
  let escapedPipe = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === "\\" && line[index + 1] === "|") {
      escapedPipe = true;
      current += "\\|";
      index += 1;
      continue;
    }
    if (character === "|") {
      segments.push(current);
      current = "";
      continue;
    }
    current += character;
  }
  segments.push(current);
  if (segments.length > 0 && segments[0]?.trim() === "") segments.shift();
  if (segments.length > 0 && segments[segments.length - 1]?.trim() === "") segments.pop();
  return { cells: segments.map((cell) => cell.trim()), escapedPipe };
}

function isDelimiterLine(line: string): boolean {
  return /^\|[\s|:-]*$/.test(line.trim()) && line.includes("-");
}

function referenceCellLink(cell: string): { identifier: string; destination: string } | null {
  const match = /^\[`([^`]+)`\]\(([^()\s]+)\)$/.exec(cell);
  if (match === null || match[1] === undefined || match[2] === undefined) return null;
  return { identifier: match[1], destination: match[2] };
}

function resolveRelative(fromPath: string, destination: string): string | null {
  if (/^[a-z][a-z0-9+.-]*:/i.test(destination) || destination.startsWith("#")) return null;
  const segments = fromPath.split("/").slice(0, -1);
  const target = destination.split("#")[0] ?? "";
  if (target === "") return null;
  for (const part of target.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (segments.length === 0) return null;
      segments.pop();
      continue;
    }
    segments.push(part);
  }
  return segments.join("/");
}

function resolvedGateReference(
  cell: string,
  gate: GateInput,
): "resolved" | "unresolved" {
  const link = referenceCellLink(cell);
  if (link === null) return "unresolved";
  const declaredPath = gate.acceptedDecisionPaths.get(link.identifier);
  if (declaredPath === undefined) return "unresolved";
  return resolveRelative(gate.selfPath, link.destination) === declaredPath
    ? "resolved"
    : "unresolved";
}

export function validateDecisionApplicabilityGate(input: GateInput): void {
  const { artifact, model, taskStatus, emitter } = input;
  const context = { artifact };
  const gateHeadings = model.headings.filter(
    (heading) => heading.level === 2 && heading.text === GATE_SECTION,
  );
  if (gateHeadings.length === 0) {
    emitter.emit(
      "task.applicability.missing",
      "Every Task non-record must contain exactly one Decision Applicability section.",
      context,
    );
    return;
  }
  const gateHeading = gateHeadings[0];
  if (gateHeadings.length > 1 || gateHeading === undefined) {
    emitter.emit(
      "task.applicability.structure.invalid",
      "The Task must contain exactly one Decision Applicability section.",
      context,
    );
    return;
  }

  const lines = model.body.split("\n").map((line) => (line.endsWith("\r") ? line.slice(0, -1) : line));
  const sectionEnd =
    model.headings.find((heading) => heading.level <= 2 && heading.line > gateHeading.line)?.line ??
    lines.length + 1;
  const subsections = model.headings.filter(
    (heading) => heading.level === 3 && heading.line > gateHeading.line && heading.line < sectionEnd,
  );
  if (
    subsections.length !== 2 ||
    subsections[0]?.text !== DECISIONS_SUBSECTION ||
    subsections[1]?.text !== CAPABILITIES_SUBSECTION
  ) {
    emitter.emit(
      "task.applicability.structure.invalid",
      "The Decision Applicability section must contain exactly the Applicable Decisions and Mandatory Capabilities subsections in order.",
      context,
    );
    return;
  }

  const [decisionsHeading, capabilitiesHeading] = subsections;
  if (decisionsHeading === undefined || capabilitiesHeading === undefined) return;
  const decisionsBlock = firstBlock(lines, decisionsHeading.line, capabilitiesHeading.line - 1);
  const capabilitiesBlock = firstBlock(lines, capabilitiesHeading.line, sectionEnd - 1);

  validateDecisionsSubsection(decisionsBlock, input);
  validateCapabilitiesSubsection(capabilitiesBlock, input, taskStatus);

  function firstBlock(source: string[], headingLine: number, lastLine: number): string[] {
    const block: string[] = [];
    for (let index = headingLine; index < Math.min(lastLine, source.length); index += 1) {
      const line = source[index] ?? "";
      if (line.trim() === "") {
        if (block.length > 0) break;
        continue;
      }
      block.push(line);
    }
    return block;
  }

  function parseGateTable(block: string[], expectedHeader: string[]): GateTable | null {
    if (block.length < 3 || !block.every((line) => line.startsWith("|"))) return null;
    const headerLine = block[0];
    const delimiterLine = block[1];
    if (headerLine === undefined || delimiterLine === undefined || !isDelimiterLine(delimiterLine)) {
      return null;
    }
    const header = splitUnescapedPipes(headerLine);
    if (header.escapedPipe || header.cells.length !== expectedHeader.length) return null;
    if (header.cells.some((cell, index) => cell !== expectedHeader[index])) return null;
    const rows: string[][] = [];
    for (const dataLine of block.slice(2)) {
      const parsed = splitUnescapedPipes(dataLine);
      if (
        parsed.escapedPipe ||
        parsed.cells.length !== expectedHeader.length ||
        parsed.cells.some((cell) => cell === "")
      ) {
        return null;
      }
      rows.push(parsed.cells);
    }
    return { header: header.cells, rows };
  }

  function validateDecisionsSubsection(block: string[], gate: GateInput): void {
    if (normalizedSentence(block) === NO_DECISIONS_SENTENCE) return;
    const table = parseGateTable(block, DECISIONS_HEADER);
    if (table === null) {
      gate.emitter.emit(
        "task.applicability.structure.invalid",
        "The first Applicable Decisions block must be the canonical no-decision sentence or one gate table with the exact Reference, Kind, and Carried Constraint header.",
        context,
      );
      return;
    }
    for (const row of table.rows) {
      const reference = row[0] ?? "";
      const kind = row[1] ?? "";
      if (kind !== "record" && kind !== "external") {
        gate.emitter.emit(
          "task.applicability.value.unsupported",
          "An Applicable Decisions Kind must be exactly record or external.",
          context,
        );
        continue;
      }
      if (kind !== "record") continue;
      if (resolvedGateReference(reference, gate) !== "resolved") {
        gate.emitter.emit(
          "task.applicability.reference.unresolved",
          "A record-kind Reference must be one link whose text is a backtick-delimited identifier resolving to an accepted same-bundle Decision record and whose destination is that record's source path.",
          context,
        );
      }
    }
  }

  function validateCapabilitiesSubsection(
    block: string[],
    gate: GateInput,
    status: string | null,
  ): void {
    if (normalizedSentence(block) === NO_CAPABILITIES_SENTENCE) return;
    const table = parseGateTable(block, CAPABILITIES_HEADER);
    if (table === null) {
      gate.emitter.emit(
        "task.applicability.structure.invalid",
        "The first Mandatory Capabilities block must be the canonical no-capability sentence or one gate table with the exact Capability, Finding, Verification, and Exception header.",
        context,
      );
      return;
    }
    for (const row of table.rows) {
      const finding = row[1] ?? "";
      const verification = row[2] ?? "";
      const exception = row[3] ?? "";
      if (!CAPABILITY_FINDINGS.has(finding)) {
        gate.emitter.emit(
          "task.applicability.value.unsupported",
          "A Mandatory Capabilities Finding must be exactly proven, unsupported, or unknown.",
          context,
        );
        continue;
      }
      if (finding === "proven" && !VERIFICATION_LEVELS.has(verification)) {
        gate.emitter.emit(
          "task.applicability.value.unsupported",
          "A proven capability must name exactly one verification-level vocabulary value.",
          context,
        );
      }
      if (finding !== "proven" && verification !== "none") {
        gate.emitter.emit(
          "task.applicability.value.unsupported",
          "An unsupported or unknown capability must declare Verification exactly none.",
          context,
        );
      }
      if (/^\[`[^`]+`\]\(/.test(exception) && resolvedGateReference(exception, gate) !== "resolved") {
        gate.emitter.emit(
          "task.applicability.reference.unresolved",
          "A link Exception must resolve to an accepted same-bundle Decision record with the record's source path as destination.",
          context,
        );
      }
      if (
        status === "completed" &&
        (finding === "unsupported" || finding === "unknown") &&
        exception === "none"
      ) {
        gate.emitter.emit(
          "task.applicability.completion.blocked",
          "A completed Task may not carry an unexcepted unsupported or unknown mandatory capability.",
          context,
        );
      }
    }
  }
}
