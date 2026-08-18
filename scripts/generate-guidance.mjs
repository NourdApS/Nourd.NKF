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
//
// --check regenerates into memory and compares against the committed bytes, so
// a hand edit to an emitted tree fails immediately instead of a release later.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const SOURCE_ROOT = "guidance-source";
const PLACEHOLDER = /\{\{nkf_version\}\}/g;
const VERSION_LITERAL = /\bNKF (?:Version: )?\d+\.\d+/;

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
    const text = await readFile(path.join(root, relative), "utf8");
    for (const [index, line] of text.split("\n").entries()) {
      const hit = VERSION_LITERAL.exec(line);
      if (hit !== null) {
        findings.push(`${SOURCE_ROOT}/${relative}:${index + 1}: literal "${hit[0]}" — use {{nkf_version}}.`);
      }
    }
  }
  return findings;
}

export async function generateGuidance({ projectRoot, releaseVersion, check }) {
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

  const written = [];
  const mismatched = [];
  for (const member of manifest.members ?? []) {
    const source = await readFile(path.join(root, SOURCE_ROOT, member.source), "utf8");
    for (const target of member.targets ?? []) {
      const version = target.stamp === "adopted" ? adoptedVersion : releaseVersion;
      if (typeof version !== "string" || version === "") {
        fail(`Target ${target.path} needs a ${target.stamp} version; pass --version for release targets.`);
      }
      const relative = target.path.replace("{version}", version);
      const emitted = source.replace(PLACEHOLDER, version);
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

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (invokedDirectly) {
  const argv = process.argv;
  const read = (flag) => {
    const index = argv.indexOf(flag);
    return index === -1 ? undefined : argv[index + 1];
  };
  await generateGuidance({
    projectRoot: read("--project") ?? ".",
    releaseVersion: read("--version"),
    check: argv.includes("--check"),
  });
}
