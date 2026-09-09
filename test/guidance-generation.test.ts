import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const generator = path.join(repositoryRoot, "scripts/generate-guidance.mjs");
const created: string[] = [];

afterEach(async () => {
  while (created.length > 0) {
    const directory = created.pop();
    if (directory) await rm(directory, { recursive: true, force: true });
  }
});

function generate(project: string, version: string, check = false) {
  const args = [generator, "--project", project, "--version", version];
  if (check) args.push("--check");
  return spawnSync(process.execPath, args, { encoding: "utf8" });
}

async function project(sourceBody: string, adopted = "0.71"): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "nkf-guidance-gen-"));
  created.push(root);
  await mkdir(path.join(root, ".nourd/knowledge"), { recursive: true });
  await writeFile(path.join(root, ".nourd/knowledge/bundle.yaml"), `nkf_version: "${adopted}"\n`);
  await mkdir(path.join(root, "guidance-source/skills/nkf-onboarding"), { recursive: true });
  await writeFile(path.join(root, "guidance-source/skills/nkf-onboarding/SKILL.md"), sourceBody);
  await writeFile(
    path.join(root, "guidance-source/manifest.yaml"),
    [
      "contract: nkf.guidance-source",
      "version: 1",
      "members:",
      "  - source: skills/nkf-onboarding/SKILL.md",
      "    targets:",
      '      - { path: ".claude/skills/nkf-onboarding/SKILL.md", stamp: adopted }',
      '      - { path: "distribution/nkf/{version}/.claude/skills/nkf-onboarding/SKILL.md", stamp: release }',
      "",
    ].join("\n"),
  );
  return root;
}

const NEUTRAL_SOURCE = `---\nname: nkf-onboarding\ndescription: prepare its NKF {{nkf_version}} candidate\n---\n\n# NKF Onboarding\n\nNKF Version: {{nkf_version}}\n\nBody.\n`;

describe("guidance generation", () => {
  it("stamps each target with its own version from one source", async () => {
    const root = await project(NEUTRAL_SOURCE, "0.71");
    expect(generate(root, "0.8").status).toBe(0);
    const adopted = await readFile(path.join(root, ".claude/skills/nkf-onboarding/SKILL.md"), "utf8");
    const release = await readFile(
      path.join(root, "distribution/nkf/0.8/.claude/skills/nkf-onboarding/SKILL.md"),
      "utf8",
    );
    expect(adopted).toContain("NKF Version: 0.71");
    expect(release).toContain("NKF Version: 0.8");
  });

  it("resolves the version in prose, not only in the marker", async () => {
    // The NKF 0.71 defect lived in the description. A generator that stamps
    // only the marker line reproduces it exactly.
    const root = await project(NEUTRAL_SOURCE, "0.71");
    expect(generate(root, "0.8").status).toBe(0);
    const release = await readFile(
      path.join(root, "distribution/nkf/0.8/.claude/skills/nkf-onboarding/SKILL.md"),
      "utf8",
    );
    expect(release).toContain("prepare its NKF 0.8 candidate");
    expect(release).not.toContain("0.71");
  });

  it("is byte-reproducible", async () => {
    const root = await project(NEUTRAL_SOURCE, "0.71");
    expect(generate(root, "0.8").status).toBe(0);
    const first = await readFile(path.join(root, "distribution/nkf/0.8/.claude/skills/nkf-onboarding/SKILL.md"), "utf8");
    expect(generate(root, "0.8").status).toBe(0);
    const second = await readFile(path.join(root, "distribution/nkf/0.8/.claude/skills/nkf-onboarding/SKILL.md"), "utf8");
    expect(second).toBe(first);
    expect(generate(root, "0.8", true).status).toBe(0);
  });

  it("fails when an emitted tree is edited by hand", async () => {
    const root = await project(NEUTRAL_SOURCE, "0.71");
    expect(generate(root, "0.8").status).toBe(0);
    const emitted = path.join(root, "distribution/nkf/0.8/.claude/skills/nkf-onboarding/SKILL.md");
    await writeFile(emitted, (await readFile(emitted, "utf8")) + "hand edit\n");
    expect(generate(root, "0.8", true).status).not.toBe(0);
  });

  it("emits a version-gated region only at or above its coordinate, and the guard ignores the marker", async () => {
    // A rule introduced by one version needs a sentence that is true in that
    // version's tree and absent from an earlier adopted root. The marker's own
    // coordinate is syntax, not a stale literal.
    const gated = `${NEUTRAL_SOURCE}\n<!-- nkf:since 0.81 -->\nThe checker recomputes the closure.\n<!-- nkf:end -->\nAfter.\n`;
    const root = await project(gated, "0.8");
    expect(generate(root, "0.81").status).toBe(0);
    const adopted = await readFile(path.join(root, ".claude/skills/nkf-onboarding/SKILL.md"), "utf8");
    const release = await readFile(path.join(root, "distribution/nkf/0.81/.claude/skills/nkf-onboarding/SKILL.md"), "utf8");
    expect(release).toContain("The checker recomputes the closure.\nAfter.");
    expect(adopted).not.toContain("recomputes");
    expect(adopted).toContain("Body.\n\nAfter.");
    expect(release).not.toContain("nkf:since");
    const older = await project(gated.replace("nkf:since 0.81", "nkf:since 0.9"), "0.8");
    expect(generate(older, "0.81").status).toBe(0);
    expect(await readFile(path.join(older, "distribution/nkf/0.81/.claude/skills/nkf-onboarding/SKILL.md"), "utf8")).not.toContain("recomputes");
  });

  it("does not re-derive a published release tree in --check, and refuses to write into it", async () => {
    // Publication freezes the 0.8 tree at the bytes its guidance review
    // recorded. The source keeps evolving for the next version, so comparing
    // the frozen tree to the later source would report the wrong divergence:
    // --check skips the frozen members, says so, and still refuses a write.
    const root = await project(NEUTRAL_SOURCE, "0.71");
    expect(generate(root, "0.8").status).toBe(0);
    await mkdir(path.join(root, "release"), { recursive: true });
    await writeFile(path.join(root, "release/recommended.json"), JSON.stringify({ nkf_version: "0.8" }));
    await writeFile(
      path.join(root, "guidance-source/skills/nkf-onboarding/SKILL.md"),
      `${NEUTRAL_SOURCE}\nA sentence authored for the next version.\n`,
    );
    const checked = generate(root, "0.8", true);
    expect(checked.status).not.toBe(0);
    expect(checked.stderr).toContain(".claude/skills/nkf-onboarding/SKILL.md");
    expect(checked.stderr).not.toContain("distribution/nkf/0.8/");
    // Re-emit the adopted root only; the frozen release member is then the one
    // remaining divergence, and it is skipped rather than reported.
    expect(spawnSync(process.execPath, [generator, "--project", root, "--stamp", "adopted"], { encoding: "utf8" }).status).toBe(0);
    const skipped = generate(root, "0.8", true);
    expect(skipped.status).toBe(0);
    expect(skipped.stdout).toContain("1 member(s) of the published NKF 0.8 tree are frozen by publication");
    const write = generate(root, "0.8");
    expect(write.status).not.toBe(0);
    expect(write.stderr).toContain("Refusing to write into the published NKF 0.8 tree");
  });

  it("fails when a literal version is typed into the source", async () => {
    const root = await project(NEUTRAL_SOURCE.replace("NKF Version: {{nkf_version}}", "NKF Version: 0.8"), "0.71");
    const result = generate(root, "0.8");
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("use {{nkf_version}}");
  });

  it("runs when reached through a symlinked path", async () => {
    // The direct-invocation guard compared the raw argv path against the
    // module URL's real path. A macOS temporary directory is reached through a
    // symlink, so the two disagreed and the script exited 0 having done
    // nothing — a no-op that reads as success. The NKF 0.8 candidate exercise
    // hit exactly that: a generation step appeared to run and changed nothing.
    const root = await project(NEUTRAL_SOURCE, "0.71");
    const linked = path.join(path.dirname(root), `${path.basename(root)}-link`);
    await symlink(root, linked, "dir");
    created.push(linked);
    const result = spawnSync(
      process.execPath,
      [generator, "--project", linked, "--version", "0.8"],
      { encoding: "utf8" },
    );
    expect(result.status, result.stderr).toBe(0);
    const emitted = await readFile(
      path.join(root, "distribution/nkf/0.8/.claude/skills/nkf-onboarding/SKILL.md"),
      "utf8",
    );
    expect(emitted).toContain("NKF Version: 0.8");
  });

  it("fails on a hyphenated coordinate, as in a fixture path", async () => {
    // The guard matched the dot form only, so `minimal-0-71` would have been
    // emitted verbatim into every later version. The same blind spot hid two
    // surfaces from the version-surface inventory across three passes.
    const root = await project(`${NEUTRAL_SOURCE}\nSee fixtures/valid/minimal-0-71 for the shape.\n`, "0.71");
    const result = generate(root, "0.8");
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('literal "0-71"');
  });

  it("fails on a bare version literal carrying no NKF prefix", async () => {
    // The narrower pattern only caught "NKF x.y" and "x.y-to-x.y". A sentence
    // reading "rebind to the 0.71 set" passed the guard and emitted a stale
    // 0.71 into the 0.8 tree, where the NKF 0.8 whole-set review found it.
    const root = await project(`${NEUTRAL_SOURCE}\nRebind to the 0.71 set.\n`, "0.71");
    const result = generate(root, "0.8");
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('literal "0.71"');
  });
});
