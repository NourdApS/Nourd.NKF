#!/usr/bin/env node
// Emits versioned guidance from the version-neutral source.
//
// Every version's tree is generated from scratch: the source plus the target's
// version. No emitted tree is ever read as an input, so nothing can be carried
// forward from a predecessor. That carry-forward is exactly how NKF 0.71
// shipped a description saying "prepare its NKF 0.7 candidate" while its own
// marker declared 0.71 — the cut copied the 0.7 tree and changed one line.
//
//   generate-guidance.mjs --project . --version 0.8            writes the tree
//   generate-guidance.mjs --project . --version 0.8 --check     verifies bytes
//   generate-guidance.mjs --project . --version 0.8 --stamp adopted
//                                                  writes one emission class
//
// --check regenerates into memory and compares against the committed bytes, so
// a hand edit to an emitted tree fails immediately instead of a release later.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const SOURCE_ROOT = "guidance-source";
const PLACEHOLDER = /\{\{nkf_version\}\}/g;
// A region emitted only into targets carrying the named stamp. The in-repo
// copy of a protocol carries provenance deep links into knowledge/decisions/
// that the shipped copy must not: a consumer has no decisions tree, so the
// link would be dead on arrival. One source, two truthful emissions.
// A region whose version literals are deliberately historical — an
// out-of-window range, a named predecessor archive. Marking it is an explicit
// authoring act, so the neutrality check still catches every accidental one.
const LITERAL_REGION = /<!-- nkf:literal -->[\s\S]*?<!-- nkf:end -->/g;
const PREDECESSOR = /\{\{nkf_predecessor\}\}/g;
const ONLY_REGION = /[ \t]*<!-- nkf:only (adopted|release) -->\n([\s\S]*?)[ \t]*<!-- nkf:end -->\n/g;
// Any bare version coordinate, in either the dot form used in prose and code
// or the hyphenated form used in file and fixture names. The first version of
// this guard matched only "NKF x.y" and "x.y-to-x.y" and let a bare `0.71`
// through in a sentence with no prefix; the second matched the dot form only
// and would have let `minimal-0-71` through. Both narrower forms were found by
// audit, not by this guard. A deliberately historical literal is declared, not
// unprefixed.
// The hyphenated alternative takes a single-digit major so an ISO date such
// as 2026-07-30 is not read as a version coordinate.
const VERSION_LITERAL = /(?<![0-9.])\d+\.\d+(?![0-9.])|(?<![0-9.])\d-\d+(?![0-9])/;

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

async function sourceFiles(root, relative = "") {
  const absolute = path.join(root, relative);
  const entries = await readdir(absolute, { withFileTypes: true });
  const collected = [];
  for (const entry of entries) {
    const child = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) collected.push(...(await sourceFiles(root, child)));
    else if (entry.isFile() && entry.name.endsWith(".md")) collected.push(child);
  }
  return collected;
}

// The source may not contain a literal version. This is the check that ends
// the defect class: a version cannot go stale in a file that is not allowed
// to state one.
async function verifySourceIsVersionNeutral(projectRoot) {
  const root = path.join(projectRoot, SOURCE_ROOT);
  const findings = [];
  for (const relative of await sourceFiles(root)) {
    const raw = await readFile(path.join(root, relative), "utf8");
    // Blank declared-literal regions rather than dropping them, so reported
    // line numbers still match the file.
    const text = raw.replace(LITERAL_REGION, (block) => block.replace(/[^\n]/g, " "));
    for (const [index, line] of text.split("\n").entries()) {
      const hit = VERSION_LITERAL.exec(line);
      if (hit !== null) {
        findings.push(`${SOURCE_ROOT}/${relative}:${index + 1}: literal "${hit[0]}" — use {{nkf_version}}.`);
      }
    }
  }
  return findings;
}

// Publication permanently freezes a release set. Generation writes new
// versions; it may never rewrite a published one.
async function frozenVersions(root) {
  const raw = await readFile(path.join(root, "release/recommended.json"), "utf8").catch(() => null);
  if (raw === null) return new Set();
  let published;
  try { published = JSON.parse(raw).nkf_version; } catch { return new Set(); }
  if (typeof published !== "string") return new Set();
  const entries = await readdir(path.join(root, "distribution/nkf"), { withFileTypes: true }).catch(() => []);
  const rank = (v) => { const [a, b] = v.split("."); return [Number(a), b]; };
  const [pMajor, pMinor] = rank(published);
  const frozen = new Set();
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const [major, minor] = rank(entry.name);
    if (major < pMajor || (major === pMajor && minor <= pMinor)) frozen.add(entry.name);
  }
  return frozen;
}

// The predecessor is stamp-dependent and derivable, so it is never passed in
// and cannot be passed in wrongly. An adopted emission documents the live
// window of the version this repository runs, whose predecessor is the
// non-self entry in the recommendation's compatibility list. A release
// emission supersedes the currently published version.
async function resolvePredecessors(root, releaseVersion) {
  const raw = await readFile(path.join(root, "release/recommended.json"), "utf8").catch(() => null);
  if (raw === null) return { adopted: null, release: null };
  let recommended;
  try { recommended = JSON.parse(raw); } catch { return { adopted: null, release: null }; }
  const published = recommended.nkf_version;
  const inWindow = (recommended.compatibility ?? [])
    .map((entry) => entry.from_nkf_version)
    .filter((version) => version !== published);
  const priorToPublished = inWindow[inWindow.length - 1] ?? null;
  // Re-emitting the published version is a faithfulness check, not a new cut:
  // its predecessor is the one below it, not itself.
  return {
    adopted: priorToPublished,
    release: releaseVersion === published ? priorToPublished : (published ?? null),
  };
}

export async function generateGuidance({ projectRoot, releaseVersion, check, stamp }) {
  const root = path.resolve(projectRoot);
  const findings = await verifySourceIsVersionNeutral(root);
  if (findings.length > 0) {
    for (const finding of findings) process.stderr.write(`${finding}\n`);
    fail(`The guidance source must contain no literal NKF version; found ${findings.length}.`);
  }

  const bundle = YAML.parse(await readFile(path.join(root, ".nourd/knowledge/bundle.yaml"), "utf8"));
  const adoptedVersion = bundle?.nkf_version;
  if (typeof adoptedVersion !== "string") fail("The bundle declares no nkf_version.");

  const manifest = YAML.parse(await readFile(path.join(root, SOURCE_ROOT, "manifest.yaml"), "utf8"));
  if (manifest?.contract !== "nkf.guidance-source") fail("Unsupported guidance source manifest contract.");

  const frozen = await frozenVersions(root);
  const predecessors = await resolvePredecessors(root, releaseVersion);
  const written = [];
  const mismatched = [];
  for (const member of manifest.members ?? []) {
    const source = await readFile(path.join(root, SOURCE_ROOT, member.source), "utf8");
    for (const target of member.targets ?? []) {
      // A stamp filter narrows the write to one emission class. Writing every
      // target would silently repair a shipped member that differs from its
      // derivation, which is exactly the divergence --check exists to report.
      if (stamp !== undefined && target.stamp !== stamp) continue;
      const version = target.stamp === "adopted" ? adoptedVersion : releaseVersion;
      if (typeof version !== "string" || version === "") {
        fail(`Target ${target.path} needs a ${target.stamp} version; pass --version for release targets.`);
      }
      const relative = target.path.replace("{version}", version);
      if (!check && target.stamp === "release" && frozen.has(version)) {
        fail(`Refusing to write into the published NKF ${version} tree; publication freezes it permanently.`);
      }
      const emitted = source
        .replace(ONLY_REGION, (_match, stamp, body) => (stamp === target.stamp ? body : ""))
        .replace(LITERAL_REGION, (block) => block.replace(/<!-- nkf:(literal|end) -->\n?/g, ""))
        .replace(PLACEHOLDER, version)
        .replace(PREDECESSOR, predecessors[target.stamp] ?? "");
      const absolute = path.join(root, relative);
      if (check) {
        const existing = await readFile(absolute, "utf8").catch(() => null);
        if (existing !== emitted) mismatched.push(relative);
      } else {
        await mkdir(path.dirname(absolute), { recursive: true });
        await writeFile(absolute, emitted);
        written.push(relative);
      }
    }
  }

  if (check) {
    if (mismatched.length > 0) {
      for (const relative of mismatched) {
        process.stderr.write(`${relative}: committed bytes differ from the generated output.\n`);
      }
      fail(`${mismatched.length} emitted file(s) do not match the guidance source. Regenerate rather than editing an emitted tree.`);
    }
    process.stdout.write("Every emitted guidance file matches the generated output.\n");
    return true;
  }
  process.stdout.write(`${JSON.stringify({ contract: "nkf.guidance-generation", adopted: adoptedVersion, release: releaseVersion ?? null, written }, null, 2)}\n`);
  return true;
}

// Resolve both sides to a real path before comparing. On macOS a temporary
// directory is reached through a symlink, so the raw argv path and the module
// URL disagree and the guard silently skips the whole script with exit 0 — a
// no-op that reads as success. The NKF 0.8 candidate exercise hit exactly
// that: a generation step appeared to run and changed nothing.
function invokedDirectlyAs(moduleUrl) {
  const entry = process.argv[1];
  if (entry === undefined) return false;
  const real = (value) => { try { return realpathSync(value); } catch { return path.resolve(value); } };
  return real(entry) === real(fileURLToPath(moduleUrl));
}

const invokedDirectly =
  invokedDirectlyAs(import.meta.url);
if (invokedDirectly) {
  const argv = process.argv;
  const read = (flag) => {
    const index = argv.indexOf(flag);
    return index === -1 ? undefined : argv[index + 1];
  };
  const stamp = read("--stamp");
  if (stamp !== undefined && !["adopted", "release"].includes(stamp)) {
    fail("--stamp must be adopted or release.");
  }
  await generateGuidance({
    projectRoot: read("--project") ?? ".",
    releaseVersion: read("--version"),
    check: argv.includes("--check"),
    stamp,
  });
}
