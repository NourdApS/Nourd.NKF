#!/usr/bin/env node
// Verifies that a version literal appearing in a guidance file's own
// frontmatter description states the NKF version that file serves.
//
// The body may legitimately name predecessor versions: compatibility prose,
// window tables, and stepping-stone chains all reference earlier versions on
// purpose. A file's own description describes that file, so a version literal
// there is a self-description and must be true.
//
// This is the position that carried the NKF 0.71 defect: the onboarding
// skill's description directed an agent to "prepare its NKF 0.7 candidate"
// while its marker declared 0.71, and it shipped inside the published archive
// because no check covered frontmatter prose.
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const MARKER = /^NKF Version: (\d+\.\d+)$/m;
const BUNDLE_VERSION = /^nkf_version:\s*"?(\d+\.\d+)"?\s*$/m;
const DISTRIBUTION_TREE = /^distribution\/nkf\/([^/]+)\//;
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;
const DESCRIPTION = /^description:[ \t]*(.*(?:\n[ \t]+.*)*)$/m;
const VERSION_LITERAL = /\bNKF (\d+\.\d+)\b/g;

const ROOTS = [
  "integrations",
  ".claude/skills",
  ".agents/skills",
  "distribution",
  "public-docs",
];

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile() && entry.name.endsWith(".md")) yield full;
  }
}

function versionRank(value) {
  // "0.7" and "0.71" are distinct releases, not 0.7 vs 0.70: rank by the
  // exact published ordering rather than numeric coercion.
  const [major, minor] = value.split(".");
  return [Number(major), minor];
}

// A distribution tree at or below the published recommended version is frozen
// history: publication permanently freezes every complete-set member, so a
// stale label inside one is immutable and correctable only in a successor.
// Checking it would demand an edit the release contract forbids.
async function frozenDistributionVersions(root) {
  const frozen = new Set();
  const recommendedPath = path.join(root, "release/recommended.json");
  const raw = await readFile(recommendedPath, "utf8").catch(() => null);
  if (raw === null) return frozen;
  let published;
  try {
    published = JSON.parse(raw).nkf_version;
  } catch {
    return frozen;
  }
  if (typeof published !== "string") return frozen;
  const base = path.join(root, "distribution/nkf");
  const entries = await readdir(base, { withFileTypes: true }).catch(() => []);
  const [publishedMajor, publishedMinor] = versionRank(published);
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const [major, minor] = versionRank(entry.name);
    if (major < publishedMajor) frozen.add(entry.name);
    else if (major === publishedMajor && minor <= publishedMinor) frozen.add(entry.name);
  }
  return frozen;
}

// A file whose bytes are exactly those of a frozen published release member
// is itself frozen. Two cases reach here, and neither can be corrected in
// place: generated documentation output rebuilt from the frozen tree, and the
// producer's own installed guidance, whose bytes the release pin mandates —
// correcting it is rejected with "the installed onboarding skill differs".
// Both are correctable only by cutting and adopting a successor version.
// The comparison is exact, so a copy that diverges on its own is still caught.
async function matchesFrozenMember(root, relative, frozen, text) {
  const candidates = [relative];
  if (relative.startsWith("public-docs/")) candidates.push(relative.slice("public-docs/".length));
  for (const version of frozen) {
    for (const candidate of candidates) {
      const source = path.join(root, "distribution/nkf", version, candidate);
      const sourceText = await readFile(source, "utf8").catch(() => null);
      if (sourceText !== null && sourceText === text) return true;
    }
  }
  return false;
}

// The version a guidance file serves, in the order the contract makes it
// knowable: a file shipped inside a versioned distribution tree serves that
// tree's version; otherwise its own marker declares it; otherwise it is an
// installed file and the bundle's declared version governs, which is what
// `must_equal_bundle` means. Only a file with no resolvable served version is
// skipped, and that is reported rather than silent.
function servedVersion(relative, text, bundleVersion) {
  const tree = DISTRIBUTION_TREE.exec(relative);
  if (tree !== null) return tree[1];
  const marker = MARKER.exec(text);
  if (marker !== null) return marker[1];
  return bundleVersion;
}

export async function verifyVersionLabels(projectRootInput) {
  const root = path.resolve(projectRootInput);
  const frozen = await frozenDistributionVersions(root);
  const bundleText = await readFile(
    path.join(root, ".nourd/knowledge/bundle.yaml"),
    "utf8",
  ).catch(() => null);
  const bundleVersion = bundleText === null ? null : (BUNDLE_VERSION.exec(bundleText)?.[1] ?? null);
  let checked = 0;
  let skipped = 0;
  const findings = [];

  for (const relativeRoot of ROOTS) {
    const base = path.join(root, relativeRoot);
    if (!(await stat(base).catch(() => null))) continue;
    for await (const file of walk(base)) {
      const relativeEarly = path.relative(root, file);
      const distributionTree = /^distribution\/nkf\/([^/]+)\//.exec(relativeEarly);
      if (distributionTree !== null && frozen.has(distributionTree[1])) {
        skipped += 1;
        continue;
      }
      const text = await readFile(file, "utf8");
      if (await matchesFrozenMember(root, relativeEarly, frozen, text)) {
        skipped += 1;
        continue;
      }
      const declared = servedVersion(relativeEarly, text, bundleVersion);
      if (declared === null) continue;

      const frontmatter = FRONTMATTER.exec(text);
      if (frontmatter === null) continue;
      const description = DESCRIPTION.exec(frontmatter[1]);
      if (description === null) continue;

      checked += 1;
      const relative = path.relative(root, file);
      for (const hit of description[1].matchAll(VERSION_LITERAL)) {
        if (hit[1] !== declared) {
          findings.push(
            `${relative}: description states "NKF ${hit[1]}" but the file serves NKF ${declared}.`,
          );
        }
      }
    }
  }

  if (findings.length > 0) {
    for (const finding of findings) fail(finding);
    fail(
      `Stale version label in ${findings.length} guidance description(s). A description describes its own file, so its version literal must equal the version that file serves.`,
    );
    return false;
  }
  process.stdout.write(
    `Verified ${checked} guidance description(s); every version literal states the version its file serves. Skipped ${skipped} file(s) frozen by publication.\n`,
  );
  return true;
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (invokedDirectly) {
  const index = process.argv.indexOf("--project");
  const project = index === -1 ? "." : process.argv[index + 1];
  if (!project) {
    fail("verify-version-labels requires --project <path>.");
    process.exit(1);
  }
  const ok = await verifyVersionLabels(project);
  if (!ok) process.exit(1);
}
