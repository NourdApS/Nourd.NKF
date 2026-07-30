import * as commonmark from "commonmark";
import whiteSpaceCodePoints from "@unicode/unicode-17.0.0/Binary_Property/White_Space/code-points.js";
import type { ProtectedRange } from "./titlecase.js";

const whitespace = new Set(whiteSpaceCodePoints);

export interface Heading {
  level: number;
  text: string;
  protectedRanges: ProtectedRange[];
  path: string[];
  occurrence: number;
}

export interface MarkdownModel {
  headings: Heading[];
  h1: Heading[];
  sections: Heading[];
  subordinateBeforeSection: boolean;
}

interface Segment {
  text: string;
  protected: boolean;
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
  const parser = new commonmark.Parser();
  const document = parser.parse(text);
  const headings: Heading[] = [];
  const occurrence = new Map<string, number>();
  let currentH2: string | null = null;
  let hasMappedSection = false;
  let subordinateBeforeSection = false;

  const walker = document.walker();
  let event: { node: any; entering: boolean } | null;
  while ((event = walker.next()) !== null) {
    const node = event.node;
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
    headings.push({ level, text: derived.text, protectedRanges: derived.protectedRanges, path, occurrence: count });
  }

  return {
    headings,
    h1: headings.filter((heading) => heading.level === 1),
    sections: headings.filter((heading) => heading.level === 2 || heading.level === 3),
    subordinateBeforeSection,
  };
}
