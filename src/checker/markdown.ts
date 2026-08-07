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
