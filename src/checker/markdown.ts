import * as commonmark from "commonmark";
import whiteSpaceCodePoints from "@unicode/unicode-17.0.0/Binary_Property/White_Space/code-points.js";
import {
  isAlias,
  isMap,
  isPair,
  isScalar,
  isSeq,
  parseAllDocuments,
  type Node,
} from "yaml";
import type { ProtectedRange } from "./titlecase.js";

const whitespace = new Set(whiteSpaceCodePoints);

export interface Heading {
  level: number;
  line: number;
  text: string;
  protectedRanges: ProtectedRange[];
  path: string[];
  occurrence: number;
}

export interface MarkdownModel {
  body: string;
  frontMatter: Record<string, unknown> | null;
  frontMatterPresent: boolean;
  frontMatterError: "invalid" | "unclosed" | null;
  headings: Heading[];
  h1: Heading[];
  sections: Heading[];
  links: string[];
  subordinateBeforeSection: boolean;
}

interface Segment {
  text: string;
  protected: boolean;
}

interface SourceLine {
  content: string;
  next: number;
}

function sourceLine(text: string, start: number): SourceLine {
  let cursor = start;
  while (cursor < text.length && text[cursor] !== "\n" && text[cursor] !== "\r") {
    cursor += 1;
  }
  if (cursor === text.length) return { content: text.slice(start), next: text.length };
  const next =
    text[cursor] === "\r" && text[cursor + 1] === "\n"
      ? cursor + 2
      : cursor + 1;
  return { content: text.slice(start, cursor), next };
}

function inspectYamlNode(
  node: Node | null | undefined,
  state: { forbidden: boolean; nonStringKey: boolean },
): void {
  if (node === null || node === undefined) return;
  if ("anchor" in node && typeof node.anchor === "string") state.forbidden = true;
  if (isAlias(node)) {
    state.forbidden = true;
    return;
  }
  if (
    "tag" in node &&
    typeof node.tag === "string" &&
    !node.tag.startsWith("tag:yaml.org,2002:")
  ) {
    state.forbidden = true;
  }
  if (isMap(node)) {
    for (const item of node.items) {
      if (!isPair(item)) continue;
      if (!isScalar(item.key) || typeof item.key.value !== "string") {
        state.nonStringKey = true;
      }
      if (isScalar(item.key) && item.key.value === "<<") state.forbidden = true;
      inspectYamlNode(item.key as Node, state);
      inspectYamlNode(item.value as Node | null, state);
    }
  } else if (isSeq(node)) {
    for (const item of node.items) inspectYamlNode(item as Node | null, state);
  }
}

function isJsonValue(value: unknown, seen = new Set<object>()): boolean {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return true;
  }
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  if (Array.isArray(value)) return value.every((item) => isJsonValue(item, seen));
  if (Object.getPrototypeOf(value) !== Object.prototype) return false;
  return Object.entries(value as Record<string, unknown>).every(
    ([key, item]) => typeof key === "string" && isJsonValue(item, seen),
  );
}

function parseFrontMatter(text: string): {
  body: string;
  value: Record<string, unknown> | null;
  present: boolean;
  error: "invalid" | "unclosed" | null;
} {
  const opening = sourceLine(text, 0);
  if (opening.content !== "---") {
    return { body: text, value: null, present: false, error: null };
  }

  let cursor = opening.next;
  let closingStart: number | null = null;
  let bodyStart = text.length;
  while (cursor < text.length) {
    const line = sourceLine(text, cursor);
    if (line.content === "---") {
      closingStart = cursor;
      bodyStart = line.next;
      break;
    }
    if (line.next === cursor) break;
    cursor = line.next;
  }
  if (closingStart === null) {
    return { body: "", value: null, present: true, error: "unclosed" };
  }

  const frontMatterText = text.slice(opening.next, closingStart);
  if (frontMatterText.trim() === "") {
    return { body: text.slice(bodyStart), value: null, present: true, error: "invalid" };
  }

  try {
    const documents = parseAllDocuments(frontMatterText, {
      schema: "core",
      strict: true,
      uniqueKeys: true,
      prettyErrors: false,
    });
    if (documents.length !== 1) {
      return { body: text.slice(bodyStart), value: null, present: true, error: "invalid" };
    }
    const document = documents[0];
    if (
      document === undefined ||
      document.errors.length !== 0 ||
      !isMap(document.contents)
    ) {
      return { body: text.slice(bodyStart), value: null, present: true, error: "invalid" };
    }
    const state = { forbidden: false, nonStringKey: false };
    inspectYamlNode(document.contents as Node, state);
    if (state.forbidden || state.nonStringKey) {
      return { body: text.slice(bodyStart), value: null, present: true, error: "invalid" };
    }
    const raw = document.toJS({ mapAsMap: false, maxAliasCount: 0 });
    if (
      !isJsonValue(raw) ||
      raw === null ||
      Array.isArray(raw) ||
      Object.keys(raw as Record<string, unknown>).length === 0
    ) {
      return { body: text.slice(bodyStart), value: null, present: true, error: "invalid" };
    }
    return {
      body: text.slice(bodyStart),
      value: raw as Record<string, unknown>,
      present: true,
      error: null,
    };
  } catch {
    return { body: text.slice(bodyStart), value: null, present: true, error: "invalid" };
  }
}

function inlineSegments(node: any): Segment[] {
  const result: Segment[] = [];
  for (let child = node.firstChild; child !== null; child = child.next) {
    if (child.type === "text") result.push({ text: child.literal ?? "", protected: false });
    else if (child.type === "code") result.push({ text: child.literal ?? "", protected: true });
    else if (child.type === "softbreak" || child.type === "linebreak") {
      result.push({ text: " ", protected: false });
    } else if (child.type !== "html_inline") {
      result.push(...inlineSegments(child));
    }
  }
  return result;
}

function comparison(node: any): { text: string; protectedRanges: ProtectedRange[] } {
  const output: Array<{ value: string; protected: boolean }> = [];
  let inWhitespace = false;
  let whitespaceProtected = false;
  for (const segment of inlineSegments(node)) {
    for (const character of segment.text) {
      const codePoint = character.codePointAt(0);
      if (codePoint !== undefined && whitespace.has(codePoint)) {
        inWhitespace = true;
        whitespaceProtected ||= segment.protected;
        continue;
      }
      if (inWhitespace && output.length > 0) {
        output.push({ value: " ", protected: whitespaceProtected });
      }
      inWhitespace = false;
      whitespaceProtected = false;
      output.push({ value: character, protected: segment.protected });
    }
  }
  while (output[0]?.value === " ") output.shift();
  while (output.at(-1)?.value === " ") output.pop();

  let text = "";
  const protectedRanges: ProtectedRange[] = [];
  let active: ProtectedRange | null = null;
  for (const item of output) {
    const start = text.length;
    text += item.value;
    if (item.protected) {
      if (active === null) {
        active = { start, end: text.length };
        protectedRanges.push(active);
      } else {
        active.end = text.length;
      }
    } else {
      active = null;
    }
  }
  return { text, protectedRanges };
}

const IDENTITY_BULLET_LABELS = new Set([
  "task",
  "status",
  "owner",
  "decision authority",
  "design disposition",
  "repository",
  "related tasks",
  "version",
  "adopting decision",
  "proposal authority effect",
  "proposal evidence",
  "implementation evidence",
]);

export interface ReferenceMaps {
  decisionsByNumber: ReadonlyMap<string, string>;
  recordIdToPath: ReadonlyMap<string, string>;
  taskIdToPath: ReadonlyMap<string, string>;
  /** Identifiers that became live through an identity succession. */
  successionSuccessorIds?: ReadonlySet<string>;
  selfPath: string;
}

export interface ReferenceViolation {
  token: string;
  line: number;
  reason: "unlinked" | "mistargeted";
}

function normalizeRelative(fromPath: string, destination: string): string | null {
  if (/^[a-z][a-z0-9+.-]*:/i.test(destination) || destination.startsWith("#")) return null;
  const base = fromPath.split("/").slice(0, -1);
  const target = destination.split("#")[0] ?? "";
  if (target === "") return null;
  const segments = [...base];
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

// The closed legacy stable-path mapping of the 0.7 neutralization. A source
// carrying a predecessor-only lock keeps its exact bytes, so its historical
// links resolve through this mapping instead of being rewritten.
const LEGACY_STABLE_PATH_PREFIXES: readonly (readonly [string, string])[] = [
  ["tasks/active/", "tasks/items/"],
  ["tasks/completed/", "tasks/items/"],
  ["tasks/deferred/", "tasks/items/"],
  ["tasks/cancelled/", "tasks/items/"],
  ["designs/active/", "designs/items/"],
  ["designs/adopted/", "designs/items/"],
  ["designs/rejected/", "designs/items/"],
  ["designs/superseded/", "designs/items/"],
  ["designs/withdrawn/", "designs/items/"],
  ["realizations/current/", "realizations/items/"],
];

function legacyStablePathResolution(resolved: string): string {
  for (const [prefix, destination] of LEGACY_STABLE_PATH_PREFIXES) {
    if (resolved.startsWith(prefix)) return `${destination}${resolved.slice(prefix.length)}`;
  }
  return resolved;
}

export function findUnlinkedReferences(body: string, maps: ReferenceMaps, historical = false, immutableSource = false): ReferenceViolation[] {
  const parser = new commonmark.Parser();
  const document = parser.parse(body);
  const violations: ReferenceViolation[] = [];
  const walker = document.walker();
  let event: { node: any; entering: boolean } | null;
  const lineOf = (node: any): number => {
    for (let current = node; current !== null; current = current.parent) {
      const sourcepos = current.sourcepos as [[number, number]] | undefined;
      if (sourcepos !== undefined) return sourcepos[0][0];
    }
    return 0;
  };
  const underneath = (node: any, type: string): boolean => {
    for (let current = node.parent; current !== null; current = current.parent) {
      if (current.type === type) return true;
    }
    return false;
  };
  const targetFor = (token: string): string | undefined => {
    const adr = /^ADR (\d{4})$/.exec(token);
    if (adr?.[1] !== undefined) return maps.decisionsByNumber.get(adr[1]);
    return maps.recordIdToPath.get(token) ?? maps.taskIdToPath.get(token);
  };
  const linkText = (link: any): string => {
    let text = "";
    const inner = link.walker();
    let innerEvent: { node: any; entering: boolean } | null;
    while ((innerEvent = inner.next()) !== null) {
      const node = innerEvent.node;
      if (!innerEvent.entering) continue;
      if (node.type === "text" || node.type === "code") text += node.literal ?? "";
    }
    return text.trim();
  };
  while ((event = walker.next()) !== null) {
    const node = event.node;
    if (!event.entering) continue;
    if (node.type === "link") {
      const text = linkText(node);
      const target = targetFor(text);
      if (target !== undefined && target !== maps.selfPath) {
        const resolved = normalizeRelative(maps.selfPath, String(node.destination ?? ""));
        const historicallyResolved = historical && resolved !== null &&
          legacyStablePathResolution(resolved) === target;
        if (resolved !== target && !historicallyResolved) {
          violations.push({ token: text, line: lineOf(node), reason: "mistargeted" });
        }
      }
      continue;
    }
    if (node.type !== "text" && node.type !== "code") continue;
    if (underneath(node, "link") || underneath(node, "heading")) continue;
    const literal = String(node.literal ?? "");
    if (node.type === "code") {
      const target = targetFor(literal.trim());
      const successionExempt = immutableSource &&
        (maps.successionSuccessorIds?.has(literal.trim()) ?? false);
      if (target !== undefined && target !== maps.selfPath && !successionExempt) {
        violations.push({ token: literal.trim(), line: lineOf(node), reason: "unlinked" });
      }
      continue;
    }
    for (const match of literal.matchAll(/\bADR (\d{4})\b/g)) {
      const target = maps.decisionsByNumber.get(match[1] ?? "");
      if (target !== undefined && target !== maps.selfPath) {
        violations.push({ token: `ADR ${match[1]}`, line: lineOf(node), reason: "unlinked" });
      }
    }
    for (const match of literal.matchAll(/\b([A-Z][A-Z0-9]*-\d+)\b/g)) {
      const token = match[1] ?? "";
      const target = maps.taskIdToPath.get(token);
      if (target !== undefined && target !== maps.selfPath) {
        violations.push({ token, line: lineOf(node), reason: "unlinked" });
      }
    }
  }
  return violations;
}

export function findIdentityBulletLabels(body: string): { label: string; line: number }[] {
  const parser = new commonmark.Parser();
  const document = parser.parse(body);
  const found: { label: string; line: number }[] = [];
  const walker = document.walker();
  let event: { node: any; entering: boolean } | null;
  while ((event = walker.next()) !== null) {
    const node = event.node;
    if (!event.entering || node.type !== "item") continue;
    if (node.parent?.type !== "list" || node.parent?.parent?.type !== "document") continue;
    const paragraph = node.firstChild;
    if (paragraph?.type !== "paragraph") continue;
    const strong = paragraph.firstChild;
    if (strong?.type !== "strong") continue;
    let text = "";
    for (let child = strong.firstChild; child !== null; child = child.next) {
      if (child.type === "text" || child.type === "code") text += child.literal ?? "";
    }
    const label = text.trim().replace(/:$/, "").trim().toLowerCase();
    if (IDENTITY_BULLET_LABELS.has(label)) {
      const sourcepos = (node as { sourcepos?: [[number, number], [number, number]] }).sourcepos;
      found.push({ label: text.trim().replace(/:$/, ""), line: sourcepos?.[0]?.[0] ?? 0 });
    }
  }
  return found;
}

export function parseMarkdown(text: string): MarkdownModel {
  const envelope = parseFrontMatter(text);
  const parser = new commonmark.Parser();
  const document = parser.parse(envelope.body);
  const headings: Heading[] = [];
  const links: string[] = [];
  const occurrence = new Map<string, number>();
  let currentH2: string | null = null;
  let hasMappedSection = false;
  let subordinateBeforeSection = false;

  const walker = document.walker();
  let event: { node: any; entering: boolean } | null;
  while ((event = walker.next()) !== null) {
    const node = event.node;
    if (event.entering && node.type === "link" && typeof node.destination === "string") {
      links.push(node.destination);
    }
    if (!event.entering || node.type !== "heading" || node.parent?.type !== "document") continue;
    const level = Number(node.level);
    if (level >= 4 && level <= 6 && !hasMappedSection) subordinateBeforeSection = true;
    if (level < 1 || level > 3) continue;
    const derived = comparison(node);
    let path: string[];
    if (level === 1) path = [derived.text];
    else if (level === 2) {
      currentH2 = derived.text;
      hasMappedSection = true;
      path = [derived.text];
    } else {
      path = currentH2 === null ? [derived.text] : [currentH2, derived.text];
      hasMappedSection = true;
    }
    const key = JSON.stringify(path);
    const count = (occurrence.get(key) ?? 0) + 1;
    occurrence.set(key, count);
    const sourcepos = (node as { sourcepos?: [[number, number], [number, number]] }).sourcepos;
    const line = sourcepos === undefined ? 0 : sourcepos[0][0];
    headings.push({ level, line, text: derived.text, protectedRanges: derived.protectedRanges, path, occurrence: count });
  }

  return {
    body: envelope.body,
    frontMatter: envelope.value,
    frontMatterPresent: envelope.present,
    frontMatterError: envelope.error,
    headings,
    h1: headings.filter((heading) => heading.level === 1),
    sections: headings.filter((heading) => heading.level === 2 || heading.level === 3),
    links,
    subordinateBeforeSection,
  };
}
