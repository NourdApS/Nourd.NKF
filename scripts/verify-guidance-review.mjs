#!/usr/bin/env node
// Verifies that a pre-cut guidance review enumerates the versioned set's
// guidance members and records a reviewed digest for each.
//
// ADR 0097 widened release-protocol step four from the version's rule diff to
// every member of the versioned set, "with the enumerated member list and
// reviewed digests recorded for the independent audit", and added the `set`
// command so coverage starts from the machine list rather than recollection.
//
// Nothing enforced it. The NKF 0.71 review recorded a per-file narrative and a
// marker check instead, naming none of the twelve guidance members, and the
// audit passed it because step six still named the superseded rule-diff
// standard. A stale label shipped inside the published archive as a result.
//
// This check starts from the same machine list ADR 0097 prescribes, selecting
// members by their declared release-set class rather than by path shape: the
// classes that carry authored guidance prose are exactly the ones step four
// requires re-read in full. Every such member must be named in the review and
// must carry a reviewed digest beside its name.
//
// What this cannot do is judge the review. It establishes that the reviewer
// covered the whole set and recorded what they read; whether they read it
// against the current rule set remains a human claim, which is why the
// independent audit still verifies the review rather than trusting this exit
// code.
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const REVIEW_DIRECTORY = "knowledge/evidence/release";
const REVIEW_NAME = /-nkf-0-(\d+)-guidance-review\.md$/;
// The release-set classes whose members carry authored guidance prose.
const GUIDANCE_CLASSES = new Set([
  "authoring-protocol",
  "onboarding-protocol",
  "release-protocol",
  "adoption-protocol",
  "portable-skill",
  "host-adapter-instruction",
]);
const DIGEST = /\b[0-9a-f]{64}\b/g;
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

function fail(message) {
  process.stderr.write(`${message}\n`);
}

function rank(value) {
  const [major, minor] = value.split(".");
  return [Number(major), minor];
}

// A review for an already-published version is history: its bytes are Evidence
// and are never rewritten to satisfy a later rule. Only the version being cut
// can still be reviewed properly.
async function publishedVersion(root) {
  const raw = await readFile(path.join(root, "release/recommended.json"), "utf8").catch(() => null);
  if (raw === null) return null;
  try { return JSON.parse(raw).nkf_version ?? null; } catch { return null; }
}

function guidanceMembers(setText) {
  const declaration = YAML.parse(setText);
  const members = Array.isArray(declaration?.members) ? declaration.members : [];
  const selected = members
    .filter((entry) => typeof entry?.path === "string" && GUIDANCE_CLASSES.has(entry.class))
    .map((entry) => entry.path);
  return [...new Set(selected)];
}

export async function verifyGuidanceReview(projectRootInput) {
  const root = path.resolve(projectRootInput);
  const published = await publishedVersion(root);
  const entries = await readdir(path.join(root, REVIEW_DIRECTORY)).catch(() => []);

  let checked = 0;
  let skipped = 0;
  let failed = false;
  const reviewed = new Set();

  for (const entry of entries) {
    const match = REVIEW_NAME.exec(entry);
    if (match === null) continue;
    const version = `0.${match[1]}`;

    if (published !== null) {
      const [major, minor] = rank(version);
      const [pMajor, pMinor] = rank(published);
      if (major < pMajor || (major === pMajor && minor <= pMinor)) {
        skipped += 1;
        continue;
      }
    }

    const setPath = path.join(root, `contracts/nkf/${version}/release-set.yaml`);
    const setText = await readFile(setPath, "utf8").catch(() => null);
    if (setText === null) {
      fail(`${entry}: no release set at contracts/nkf/${version}/release-set.yaml to enumerate.`);
      failed = true;
      continue;
    }

    let members;
    try {
      members = guidanceMembers(setText);
    } catch (error) {
      fail(`${entry}: contracts/nkf/${version}/release-set.yaml does not parse: ${error instanceof Error ? error.message : String(error)}`);
      failed = true;
      continue;
    }
    if (members.length === 0) {
      fail(`${entry}: the release set declares no guidance members.`);
      failed = true;
      continue;
    }

    const reviewLines = (await readFile(path.join(root, REVIEW_DIRECTORY, entry), "utf8")).split("\n");
    const missing = [];
    const undigested = [];
    const wrongDigest = [];
    for (const member of members) {
      const basename = member.slice(member.lastIndexOf("/") + 1);
      const naming = reviewLines.filter((line) => line.includes(member) || line.includes(basename));
      if (naming.length === 0) { missing.push(member); continue; }
      // The digest is recorded beside the member it belongs to, so a review
      // cannot satisfy this by listing digests somewhere else on the page.
      const recorded = new Set(naming.flatMap((line) => [...line.matchAll(DIGEST)].map((hit) => hit[0])));
      if (recorded.size === 0) { undigested.push(member); continue; }
      // And the recorded digest must be the member's actual digest. Checking
      // only that some 64-hex token is present makes the digests decorative:
      // a transcription error, or a digest carried from an earlier revision
      // of the same member, would pass while recording the wrong bytes.
      const bytes = await readFile(path.join(root, member)).catch(() => null);
      if (bytes === null) { wrongDigest.push([member, "member is absent"]); continue; }
      const actual = sha256(bytes);
      if (!recorded.has(actual)) wrongDigest.push([member, `recorded ${[...recorded].join(", ")}, actual ${actual}`]);
    }

    checked += 1;
    reviewed.add(version);
    if (missing.length > 0 || undigested.length > 0 || wrongDigest.length > 0) {
      for (const member of missing) fail(`${entry}: does not name guidance member ${member}.`);
      for (const member of undigested) fail(`${entry}: names ${member} without a reviewed digest beside it.`);
      for (const [member, detail] of wrongDigest) fail(`${entry}: records the wrong digest for ${member} — ${detail}.`);
      if (wrongDigest.length > 0) {
        fail(`${entry}: ${wrongDigest.length} recorded digest(s) do not equal the reviewed member's bytes. A recorded digest names exactly what was read.`);
      }
      if (missing.length > 0) {
        fail(
          `${entry}: names ${members.length - missing.length} of ${members.length} guidance members. Step four requires the enumerated member list, taken from the adopter's set command, not a narrative of what changed.`,
        );
      }
      if (undigested.length > 0) {
        fail(
          `${entry}: records no reviewed digest for ${undigested.length} of ${members.length} guidance members. Step four requires the digest of each member as reviewed.`,
        );
      }
      failed = true;
    }
  }

  // A version with a release set that has not been published is a version
  // being cut, and step four requires its review before the cut. Absence is
  // the failure the NKF 0.71 review would have been caught by, so absence
  // fails rather than passing with nothing checked.
  for (const version of await readdir(path.join(root, "contracts/nkf")).catch(() => [])) {
    if (reviewed.has(version)) continue;
    if (published !== null) {
      const [major, minor] = rank(version);
      const [pMajor, pMinor] = rank(published);
      if (major < pMajor || (major === pMajor && minor <= pMinor)) continue;
    }
    const setText = await readFile(path.join(root, `contracts/nkf/${version}/release-set.yaml`), "utf8").catch(() => null);
    if (setText === null) continue;
    fail(
      `contracts/nkf/${version}/release-set.yaml declares an unpublished versioned set with no pre-cut guidance review at ${REVIEW_DIRECTORY}/*-nkf-${version.replace(".", "-")}-guidance-review.md.`,
    );
    failed = true;
  }

  if (failed) return false;
  process.stdout.write(
    `Verified ${checked} guidance review(s) against the release-set guidance members and their reviewed digests; skipped ${skipped} for published versions.\n`,
  );
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
  const index = process.argv.indexOf("--project");
  const ok = await verifyGuidanceReview(index === -1 ? "." : process.argv[index + 1]);
  if (!ok) process.exit(1);
}
