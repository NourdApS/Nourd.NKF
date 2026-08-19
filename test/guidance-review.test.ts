import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const verifier = path.join(repositoryRoot, "scripts/verify-guidance-review.mjs");
const created: string[] = [];

afterEach(async () => {
  while (created.length > 0) {
    const directory = created.pop();
    if (directory) await rm(directory, { recursive: true, force: true });
  }
});

function verify(project: string) {
  return spawnSync(process.execPath, [verifier, "--project", project], { encoding: "utf8" });
}

const MEMBERS: { path: string; class: string }[] = [
  { path: "distribution/nkf/0.8/integrations/ai/nkf-authoring-protocol.md", class: "authoring-protocol" },
  { path: "distribution/nkf/0.8/integrations/adoption/nkf-adoption-protocol.md", class: "adoption-protocol" },
  { path: "distribution/nkf/0.8/.claude/skills/nkf-authoring/SKILL.md", class: "portable-skill" },
  { path: "distribution/nkf/0.8/.agents/skills/nkf-authoring/SKILL.md", class: "portable-skill" },
  { path: "distribution/nkf/0.8/host-adapters/AGENTS.adapter.md", class: "host-adapter-instruction" },
];
const PATHS = MEMBERS.map((member) => member.path);
// A non-guidance member: enumerated in the set, but carrying no authored
// guidance prose, so step four's full re-reading does not reach it.
const NON_GUIDANCE = { path: "dist/nourd-nkf-checker.mjs", class: "checker" };

const digest = (member: string) => createHash("sha256").update(memberBytes(member)).digest("hex");
const wrongDigest = (seed: number) => seed.toString(16).repeat(64).slice(0, 64);
const memberBytes = (member: string) => `bytes of ${member}\n`;
const bare = (member: string) => `- \`${member}\``;
const row = (member: string) => `| \`${member}\` | \`${digest(member)}\` |`;
const review = (body: string) => `# Review\n\n## Reviewed Members\n\n${body}\n`;

async function project(reviewBody: string, published = "0.71"): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "nkf-guidance-review-"));
  created.push(root);
  await mkdir(path.join(root, "release"), { recursive: true });
  await writeFile(path.join(root, "release/recommended.json"), JSON.stringify({ nkf_version: published }));
  await mkdir(path.join(root, "contracts/nkf/0.8"), { recursive: true });
  await writeFile(
    path.join(root, "contracts/nkf/0.8/release-set.yaml"),
    [
      "contract: nkf.release-set",
      'nkf_version: "0.8"',
      "members:",
      ...[...MEMBERS, NON_GUIDANCE].flatMap((member) => [
        `  - path: ${member.path}`,
        `    class: ${member.class}`,
        '    mode: "0644"',
      ]),
      "",
    ].join("\n"),
  );
  for (const member of [...MEMBERS, NON_GUIDANCE]) {
    await mkdir(path.join(root, path.dirname(member.path)), { recursive: true });
    await writeFile(path.join(root, member.path), memberBytes(member.path));
  }
  await mkdir(path.join(root, "knowledge/evidence/release"), { recursive: true });
  await writeFile(path.join(root, "knowledge/evidence/release/nkf-035-nkf-0-8-guidance-review.md"), reviewBody);
  return root;
}

describe("pre-cut guidance review", () => {
  it("fails a review that narrates changes without enumerating members", async () => {
    // This is the shape of the NKF 0.71 review: a per-file narrative plus a
    // marker-line completeness claim, naming no member.
    const result = verify(
      await project(
        "# Review\n\nThe adoption protocol was rewritten for the accepted window.\nEvery guidance file declares the exact marker.\n",
      ),
    );
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("does not name guidance member");
  });

  it("passes a review that enumerates every member with its reviewed digest", async () => {
    expect(verify(await project(review(PATHS.map(row).join("\n")))).status).toBe(0);
  });

  it("does not accept a basename in place of the member path", async () => {
    // All four portable skills are named SKILL.md. Matching on basename let
    // one skill's digest satisfy another, so the recorded digest proved only
    // that some skill had been read, not which one.
    const body = PATHS.map((member) => `| \`${member.slice(member.lastIndexOf("/") + 1)}\` | \`${digest(member)}\` |`).join("\n");
    expect(verify(await project(review(body))).status).not.toBe(0);
  });

  it("does not let one colliding basename's digest satisfy another member", async () => {
    const [first, second] = PATHS.filter((member) => member.endsWith("SKILL.md"));
    const body = PATHS.map((member) =>
      `| \`${member}\` | \`${digest(member === second && first !== undefined ? first : member)}\` |`,
    ).join("\n");
    const result = verify(await project(review(body)));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("records the wrong digest for");
  });

  it("fails a partial enumeration", async () => {
    const result = verify(await project(review(PATHS.slice(0, 2).map(row).join("\n"))));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("names 2 of 5 guidance members");
  });

  it("fails a review that names every member but records no reviewed digest", async () => {
    // ADR 0097 requires the member list AND the reviewed digests. A bare list
    // proves enumeration and nothing about which bytes were actually read.
    const result = verify(await project(review(PATHS.map(bare).join("\n"))));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("without a reviewed digest beside it");
    expect(result.stderr).toContain("records no reviewed digest for 5 of 5");
  });

  it("does not accept digests recorded away from the member they belong to", async () => {
    const body = [
      ...PATHS.map(bare),
      "",
      "## Digests",
      "",
      ...PATHS.map((member) => `- \`${digest(member)}\``),
    ].join("\n");
    expect(verify(await project(review(body))).status).not.toBe(0);
  });

  it("requires only the guidance classes, not every enumerated member", async () => {
    // The checker binary is a release member and is enumerated, but it carries
    // no authored guidance prose, so step four's full re-reading excludes it.
    const result = verify(await project(review(PATHS.map(row).join("\n"))));
    expect(result.status).toBe(0);
    expect(result.stderr).not.toContain(NON_GUIDANCE.path);
  });

  it("fails a recorded digest that is not the reviewed member's bytes", async () => {
    // A 64-hex token beside the member proved only that something was written
    // there. A transcription error, or a digest carried from an earlier
    // revision of the same member, recorded the wrong bytes and passed.
    const body = PATHS.map((member, index) => `| \`${member}\` | \`${wrongDigest(index + 1)}\` |`).join("\n");
    const result = verify(await project(review(body)));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("records the wrong digest for");
  });

  it("fails when an unpublished versioned set has no review at all", async () => {
    // The check passed with zero reviewed before: a release that omitted the
    // review, or misnamed it, satisfied it by absence.
    const root = await project(review(PATHS.map(row).join("\n")));
    await rm(path.join(root, "knowledge/evidence/release/nkf-035-nkf-0-8-guidance-review.md"));
    const result = verify(root);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("no pre-cut guidance review");
  });

  it("exempts a review for an already-published version", async () => {
    // Evidence keeps its historical bytes and is never rewritten to satisfy a
    // later rule, so a published version's review can never be made compliant.
    expect(verify(await project("# Review\n\nNarrative only.\n", "0.8")).status).toBe(0);
  });
});
