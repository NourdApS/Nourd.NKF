import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const verifier = path.join(repositoryRoot, "scripts/verify-version-labels.mjs");
const created: string[] = [];

function verify(project: string) {
  return spawnSync(process.execPath, [verifier, "--project", project], {
    encoding: "utf8",
  });
}

afterEach(async () => {
  while (created.length > 0) {
    const directory = created.pop();
    if (directory) await rm(directory, { recursive: true, force: true });
  }
});

async function project(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "nkf-version-labels-"));
  created.push(root);
  await mkdir(path.join(root, "release"), { recursive: true });
  await writeFile(
    path.join(root, "release/recommended.json"),
    JSON.stringify({ nkf_version: "0.71" }),
  );
  return root;
}

async function skill(root: string, relative: string, description: string, declared: string) {
  const full = path.join(root, relative);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(
    full,
    `---\nname: nkf-onboarding\ndescription: ${description}\n---\n\n# NKF Onboarding\n\nNKF Version: ${declared}\n\nBody.\n`,
  );
}

describe("guidance version labels", () => {
  it("fails a description whose version literal disagrees with the file's declared version", async () => {
    const root = await project();
    // The exact NKF 0.71 defect: the marker was updated to 0.71 by the cut,
    // the description kept the predecessor's version, and it shipped.
    await skill(root, ".claude/skills/nkf-onboarding/SKILL.md", "prepare its NKF 0.7 candidate", "0.71");
    expect(verify(root).status).not.toBe(0);
  });

  it("passes when the description states the file's own declared version", async () => {
    const root = await project();
    await skill(root, ".claude/skills/nkf-onboarding/SKILL.md", "prepare its NKF 0.71 candidate", "0.71");
    expect(verify(root).status).toBe(0);
  });

  it("ignores predecessor versions named in the body rather than the description", async () => {
    const root = await project();
    const full = path.join(root, "integrations/adoption/nkf-adoption-protocol.md");
    await mkdir(path.dirname(full), { recursive: true });
    await writeFile(
      full,
      `---\nname: adoption\ndescription: Adopt the recommended release.\n---\n\n# Adoption\n\nNKF Version: 0.71\n\nAn adopted NKF 0.7 repository receives the non-breaking upgrade, and a\nrepository declaring NKF 0.6 steps through the published NKF 0.7 archive.\n`,
    );
    expect(verify(root).status).toBe(0);
  });

  it("exempts a frozen published distribution tree it cannot lawfully correct", async () => {
    const root = await project();
    // Publication permanently freezes these bytes; a stale label inside one is
    // correctable only in a successor version, never in place.
    await skill(
      root,
      "distribution/nkf/0.71/.claude/skills/nkf-onboarding/SKILL.md",
      "prepare its NKF 0.7 candidate",
      "0.71",
    );
    expect(verify(root).status).toBe(0);
  });

  it("checks a distribution tree above the published version, which is still being cut", async () => {
    const root = await project();
    await skill(
      root,
      "distribution/nkf/0.8/.claude/skills/nkf-onboarding/SKILL.md",
      "prepare its NKF 0.71 candidate",
      "0.8",
    );
    expect(verify(root).status).not.toBe(0);
  });
});
