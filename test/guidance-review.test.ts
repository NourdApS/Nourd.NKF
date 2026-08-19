import { spawnSync } from "node:child_process";
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

const MEMBERS = [
  "distribution/nkf/0.8/integrations/ai/nkf-authoring-protocol.md",
  "distribution/nkf/0.8/integrations/adoption/nkf-adoption-protocol.md",
  "distribution/nkf/0.8/.claude/skills/nkf-authoring/SKILL.md",
  "distribution/nkf/0.8/host-adapters/AGENTS.adapter.md",
];

async function project(reviewBody: string, published = "0.71"): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "nkf-guidance-review-"));
  created.push(root);
  await mkdir(path.join(root, "release"), { recursive: true });
  await writeFile(path.join(root, "release/recommended.json"), JSON.stringify({ nkf_version: published }));
  await mkdir(path.join(root, "contracts/nkf/0.8"), { recursive: true });
  await writeFile(
    path.join(root, "contracts/nkf/0.8/release-set.yaml"),
    ["members:", ...MEMBERS.map((member) => `  - path: ${member}`), ""].join("\n"),
  );
  await mkdir(path.join(root, "knowledge/evidence/release"), { recursive: true });
  await writeFile(path.join(root, "knowledge/evidence/release/nkf-035-nkf-0-8-guidance-review.md"), reviewBody);
  return root;
}

describe("pre-cut guidance review", () => {
  it("fails a review that narrates changes without enumerating members", async () => {
    // This is the shape of the NKF 0.71 review: a per-file narrative plus a
    // marker-line completeness claim, naming no member.
    const root = await project(
      "# Review\n\nThe adoption protocol was rewritten for the accepted window.\nEvery guidance file declares the exact marker.\n",
    );
    const result = verify(root);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("does not name guidance member");
  });

  it("passes a review that enumerates every member", async () => {
    const root = await project(`# Review\n\n## Reviewed Members\n\n${MEMBERS.map((m) => `- \`${m}\``).join("\n")}\n`);
    expect(verify(root).status).toBe(0);
  });

  it("accepts basenames, as the NKF 0.7 review used for adapter twins", async () => {
    const body = MEMBERS.map((m) => `- \`${m.slice(m.lastIndexOf("/") + 1)}\``).join("\n");
    const root = await project(`# Review\n\n## Reviewed Members\n\n${body}\n`);
    expect(verify(root).status).toBe(0);
  });

  it("fails a partial enumeration", async () => {
    const body = MEMBERS.slice(0, 2).map((m) => `- \`${m}\``).join("\n");
    const root = await project(`# Review\n\n## Reviewed Members\n\n${body}\n`);
    const result = verify(root);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("names 2 of 4 guidance members");
  });

  it("exempts a review for an already-published version", async () => {
    // Evidence keeps its historical bytes and is never rewritten to satisfy a
    // later rule, so a published version's review can never be made compliant.
    const root = await project("# Review\n\nNarrative only.\n", "0.8");
    expect(verify(root).status).toBe(0);
  });
});
