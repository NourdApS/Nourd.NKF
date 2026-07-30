import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseMarkdown } from "../src/checker/markdown.js";
import {
  protectedCanonicalRanges,
  toUnicode17TitleCase,
} from "../src/checker/titlecase.js";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const knowledgeRoot = path.join(repositoryRoot, "knowledge");
const canonicalTerms = [
  "ADR", "AI", "API", "CI", "CLI", "CommonMark", "GVI", "H1", "H2", "H3",
  "JCS", "JSON", "NKF", "NKP", "Node.js", "OKF", "RFC", "SDK", "SHA-256",
  "TypeScript", "UI", "URI", "URL", "UTF-8", "UUID", "YAML",
];

async function markdownFiles(directory: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await markdownFiles(absolute));
    else if (entry.name.endsWith(".md")) result.push(absolute);
  }
  return result;
}

function isRecordSource(file: string): boolean {
  const relative = path.relative(knowledgeRoot, file).split(path.sep).join("/");
  return (
    relative === "nkf.md" ||
    relative === "specifications/nkf-0.1.md" ||
    relative === "realizations/nkf-0.1-native-realization.md" ||
    relative === "evidence/nkf-003-source-reconciliation.md" ||
    /^decisions\/[0-9]{4}-.+\.md$/.test(relative) ||
    (/^designs\/.+\.md$/.test(relative) && relative !== "designs/README.md")
  );
}

function titleCaseHeading(markers: string, text: string): string {
  const model = parseMarkdown(`${markers} ${text}\n`);
  const heading = markers === "#" ? model.h1[0] : model.sections[0];
  if (heading === undefined) return text;
  const protectedRanges = protectedCanonicalRanges(
    heading.text,
    canonicalTerms,
    heading.protectedRanges,
  );
  return toUnicode17TitleCase(heading.text, protectedRanges);
}

for (const file of (await markdownFiles(knowledgeRoot)).filter(isRecordSource)) {
  const original = await readFile(file, "utf8");
  const lines = original.split("\n");
  let fence: "`" | "~" | null = null;
  const rewritten = lines.map((line) => {
    const fenceMatch = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fenceMatch !== null) {
      const marker = fenceMatch[1]?.[0];
      if (fence === null && (marker === "`" || marker === "~")) fence = marker;
      else if (marker === fence) fence = null;
      return line;
    }
    if (fence !== null) return line;
    const match = line.match(/^(#{1,3})[ \t]+(.+?)(?:[ \t]+#+[ \t]*)?$/);
    if (match === null) return line;
    const markers = match[1] ?? "";
    const text = match[2] ?? "";
    return `${markers} ${titleCaseHeading(markers, text)}`;
  }).join("\n");
  if (rewritten !== original) await writeFile(file, rewritten, "utf8");
}
