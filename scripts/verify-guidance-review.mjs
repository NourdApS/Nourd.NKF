#!/usr/bin/env node
// Verifies that a pre-cut guidance review enumerates the versioned set.
//
// ADR 0097 widened release-protocol step four from the version's rule diff to
// every member of the versioned set, each read in full, "with the enumerated
// member list and reviewed digests recorded for the independent audit", and
// added the `set` command so coverage starts from the machine list rather than
// recollection.
//
// Nothing enforced it. The NKF 0.71 review recorded a per-file narrative and a
// marker check instead, naming none of the twelve guidance members, and the
// audit passed it because step six still named the superseded rule-diff
// standard. A stale label shipped inside the published archive as a result.
//
// This check starts from the same machine list ADR 0097 prescribes: every
// guidance member of the reviewed version's release set must be named in the
// review.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const REVIEW_DIRECTORY = "knowledge/evidence/release";
const REVIEW_NAME = /-nkf-0-(\d+)-guidance-review\.md$/;
const GUIDANCE_MEMBER = /^\s*-?\s*path:\s*(distribution\/nkf\/[^/]+\/(?:integrations|\.claude|\.agents|host-adapters)\/.*\.md)\s*$/gm;

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

export async function verifyGuidanceReview(projectRootInput) {
  const root = path.resolve(projectRootInput);
  const published = await publishedVersion(root);
  const entries = await readdir(path.join(root, REVIEW_DIRECTORY)).catch(() => []);

  let checked = 0;
  let skipped = 0;
  let failed = false;

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

    const members = [...new Set([...setText.matchAll(GUIDANCE_MEMBER)].map((hit) => hit[1]))];
    if (members.length === 0) {
      fail(`${entry}: the release set declares no guidance members.`);
      failed = true;
      continue;
    }

    const reviewText = await readFile(path.join(root, REVIEW_DIRECTORY, entry), "utf8");
    const missing = members.filter((member) => {
      const basename = member.slice(member.lastIndexOf("/") + 1);
      return !reviewText.includes(member) && !reviewText.includes(basename);
    });

    checked += 1;
    if (missing.length > 0) {
      for (const member of missing) fail(`${entry}: does not name guidance member ${member}.`);
      fail(
        `${entry}: names ${members.length - missing.length} of ${members.length} guidance members. Step four requires the enumerated member list, taken from the adopter's set command, not a narrative of what changed.`,
      );
      failed = true;
    }
  }

  if (failed) return false;
  process.stdout.write(
    `Verified ${checked} guidance review(s) against the release-set member list; skipped ${skipped} for published versions.\n`,
  );
  return true;
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (invokedDirectly) {
  const index = process.argv.indexOf("--project");
  const ok = await verifyGuidanceReview(index === -1 ? "." : process.argv[index + 1]);
  if (!ok) process.exit(1);
}
