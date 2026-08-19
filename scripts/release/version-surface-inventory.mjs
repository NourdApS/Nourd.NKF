#!/usr/bin/env node
// Enumerates every mutable tooling, test, workflow, and root-configuration
// surface carrying an NKF version coordinate, and reports which register the
// current one. It is the script that produces the counts recorded in
// knowledge/evidence/audits/nkf-033-nkf-0-8-version-surface-inventory.md, kept
// as a script because those counts were restated wrongly in three successive
// revisions of that document while being typed by hand.
//
//   node scripts/release/version-surface-inventory.mjs [--version 0.8]
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const NKF = new Set(["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.71", "0.8"]);
const ROOT_FILES = new Set([
  "package.json", "tsconfig.json", "vitest.config.ts",
  "AGENTS.md", "CLAUDE.md", "GEMINI.md", "README.md",
]);
// Two forms with different terminators. A dot form must not be part of a longer
// version such as 0.31.2, so a following dot ends the match. In a hyphenated
// name a following dot is the extension separator, as in seal-baseline-0-5.mjs.
// Conflating the two hid surfaces from three consecutive passes.
const DOT = /(?<![0-9.])0\.\d+(?![0-9.])/g;
const HYPHEN = /(?<![0-9.])0-\d+(?![0-9])/g;

const current = (() => {
  const index = process.argv.indexOf("--version");
  return index === -1 ? "0.8" : process.argv[index + 1];
})();

const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" }).split("\n").filter(Boolean);
const surfaces = tracked.filter((file) =>
  file.startsWith("scripts/") || file.startsWith("src/") ||
  file.startsWith("test/") || file.startsWith(".github/") || ROOT_FILES.has(file));

const rows = [];
for (const file of surfaces.sort()) {
  let text;
  try { text = readFileSync(file, "utf8"); } catch { continue; }
  const found = new Set();
  for (const hit of text.matchAll(DOT)) if (NKF.has(hit[0])) found.add(hit[0]);
  for (const hit of text.matchAll(HYPHEN)) {
    const value = hit[0].replace("-", ".");
    if (NKF.has(value)) found.add(value);
  }
  if (found.size === 0) continue;
  const versions = [...found].sort((left, right) => {
    const [lm, ln] = left.split("."); const [rm, rn] = right.split(".");
    return Number(lm) - Number(rm) || ln.localeCompare(rn);
  });
  rows.push({ path: file, versions, registers_current: found.has(current) });
}

const registering = rows.filter((row) => row.registers_current);
process.stdout.write(`${JSON.stringify({
  contract: "nkf.version-surface-inventory",
  current,
  surfaces: rows.length,
  registering_current: registering.length,
  version_specific: rows.length - registering.length,
  rows,
}, null, 2)}\n`);
