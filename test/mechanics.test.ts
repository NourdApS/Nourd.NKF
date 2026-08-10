import { cp, lstat, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { repositoryRoot } from "./helpers.js";

// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
const {
  FIXTURE_FILES,
  HOST_ADAPTER_FILES,
  PUBLIC_DOCUMENTATION_FILES,
  RELEASE_ENTRIES,
  constructReleaseManifest,
  createUstar,
  readReleaseEntries,
  serializeReleaseManifest,
  sha256,
} = release;

const adopter = path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs");
const checker = path.join(repositoryRoot, "dist/nourd-nkf-checker.mjs");
let archivePath: string;
let archiveSha256: string;

function run(command: string, project: string, extra: string[] = []) {
  const result = spawnSync(process.execPath, [adopter, command, "--project", project, ...extra], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return { ...result, json: result.stdout ? JSON.parse(result.stdout) : null };
}

async function copyFixture(): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-mechanics-"));
  const project = path.join(parent, "project");
  await cp(path.join(repositoryRoot, "fixtures/valid/minimal-0-2"), project, { recursive: true });
  return project;
}

async function gitFixture() {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-git-mechanics-"));
  const project = path.join(parent, "project");
  await cp(path.join(repositoryRoot, "fixtures/valid/technology-0-2"), project, { recursive: true });
  const taskId = "TEST-TECH-001";
  const g = (args: string[]) => spawnSync("git", ["-C", project, ...args], { encoding: "utf8" });
  const generatedPath = path.join(project, "dist/generated-adopter.mjs");
  const generatedBytes = Buffer.from("export const generated = true;\n", "utf8");
  await mkdir(path.dirname(generatedPath), { recursive: true });
  await writeFile(generatedPath, generatedBytes);
  await writeFile(path.join(project, ".gitignore"), "dist/\n");
  const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
  await writeFile(
    bundlePath,
    `${await readFile(bundlePath, "utf8")}  - id: generated-adopter\n    kind: build-tool\n    path: dist/generated-adopter.mjs\n    digest:\n      algorithm: sha-256\n      value: ${sha256(generatedBytes)}\n    record: realization\n    source_section: durable-mapping\n`,
  );
  g(["init", "-b", "master"]);
  g(["config", "user.email", "fixture@example.com"]);
  g(["config", "user.name", "Fixture"]);
  g(["add", "-A"]);
  g(["commit", "-m", "init"]);
  const bare = path.join(project, "..", "origin.git");
  spawnSync("git", ["init", "--bare", "-b", "master", bare], { encoding: "utf8" });
  g(["remote", "add", "origin", bare]);
  g(["push", "-u", "origin", "master"]);
  g(["remote", "set-head", "origin", "master"]);
  return { project, taskId, g, bare };
}

beforeAll(async () => {
  const entries = await readReleaseEntries(repositoryRoot);
  const manifest = constructReleaseManifest({
    releaseCommit: "a".repeat(40),
    checkerConfirmation: {
      decision: "ADR-0093",
      path: "knowledge/decisions/0093-bind-the-adopted-0-2-release-checker.md",
      bytes: Buffer.from("# ADR 0093\n", "utf8"),
      checkerSourceCommit: "b".repeat(40),
    },
    entries,
  });
  entries.set("release-manifest.json", serializeReleaseManifest(manifest));
  const archive = createUstar(entries);
  archiveSha256 = sha256(archive);
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-mechanics-release-"));
  archivePath = path.join(parent, `nourd-nkf-sha256-${archiveSha256}.tar`);
  await writeFile(archivePath, archive);
});

describe("deterministic governed mechanics", () => {
  it("exports the reference maps", async () => {
    const project = await copyFixture();
    const result = run("refs", project);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.tasks["TEST-001"]).toBe("tasks/active/task.md");
  });

  it("enumerates the versioned set with digests and stamps", async () => {
    const result = run("set", repositoryRoot);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.state).toBe("enumerated");
    expect(result.json.nkf_version).toBe("0.2");
    const expectedPaths = RELEASE_ENTRIES
      .filter((entry: { path: string }) => entry.path !== "release-manifest.json")
      .map((entry: { path: string }) => entry.path);
    expect(result.json.members.map((member: { path: string }) => member.path)).toEqual(
      expectedPaths,
    );
    expect(result.json.members).toHaveLength(132);
    for (const member of result.json.members) {
      expect(member.present, member.path).toBe(true);
      expect(member.sha256).toMatch(/^[0-9a-f]{64}$/);
    }
    expect(expectedPaths).toContain("dist/nourd-nkf-adopt.mjs");
    expect(
      expectedPaths.filter((member: string) => HOST_ADAPTER_FILES.includes(member)),
    ).toHaveLength(HOST_ADAPTER_FILES.length);
    expect(
      expectedPaths.filter((member: string) => FIXTURE_FILES.includes(member)),
    ).toHaveLength(FIXTURE_FILES.length);
    expect(
      expectedPaths.filter((member: string) => member.startsWith("public-docs/")),
    ).toHaveLength(PUBLIC_DOCUMENTATION_FILES.length);
    const guidance = result.json.members.filter(
      (member: { path: string }) =>
        (member.path.startsWith("integrations/") && member.path.endsWith(".md")) ||
        (!member.path.startsWith("public-docs/") && member.path.endsWith("SKILL.md")),
    );
    expect(guidance).toHaveLength(8);
    for (const member of guidance) {
      expect(member.nkf_version_stamp, member.path).toBe("0.2");
    }
  });

  it("re-pins record digests after an edit", async () => {
    const project = await copyFixture();
    const doc = path.join(project, "knowledge/product.md");
    await writeFile(doc, `${await readFile(doc, "utf8")}\nAppended sentence.\n`);
    const result = run("repin", project);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.records).toBe(1);
    const check = spawnSync(process.execPath, [checker, "--project", project, "--level", "full-bundle", "--no-persist"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    expect(JSON.parse(check.stdout).conformance).toBe("passed");
  });

  it("linkifies same-bundle references idempotently", async () => {
    const project = await copyFixture();
    const map = path.join(project, "knowledge/README.md");
    await writeFile(map, `${(await readFile(map, "utf8")).trimEnd()}\n\nSee TEST-001 for the active work.\n`);
    const first = run("linkify", project);
    expect(first.status, first.stderr).toBe(0);
    expect(first.json.changed).toBe(1);
    expect(await readFile(map, "utf8")).toContain("[TEST-001](tasks/active/task.md)");
    const second = run("linkify", project);
    expect(second.json.changed).toBe(0);
  });

  it("closes a task through the verified transaction and rewrites links", async () => {
    const project = await copyFixture();
    const parentIndexPath = path.join(project, "knowledge/tasks/README.md");
    await writeFile(
      parentIndexPath,
      `${(await readFile(parentIndexPath, "utf8")).trimEnd()}\n\n## Active\n\n- [Fixture Task](active/task.md)\n\n## Deferred\n\n## Completed\n\n## Cancelled\n`,
    );
    const resultFile = path.join(project, "..", "result.md");
    await writeFile(resultFile, "The fixture work completed with all criteria satisfied.\n");
    const result = run("task", project, ["--task", "TEST-001", "--to", "close", "--result-file", resultFile, "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.task_status).toBe("completed");
    const moved = await readFile(path.join(project, "knowledge/tasks/completed/task.md"), "utf8");
    expect(moved).toContain("task_status: completed");
    expect(moved).toContain("## Completion Result");
    const activeIndex = await readFile(path.join(project, "knowledge/tasks/active/README.md"), "utf8");
    expect(activeIndex).not.toContain("task.md");
    const completedIndex = await readFile(path.join(project, "knowledge/tasks/completed/README.md"), "utf8");
    expect(completedIndex).toContain("(task.md)");
    const parentIndex = await readFile(parentIndexPath, "utf8");
    expect(parentIndex.split("## Active")[1]?.split("## Deferred")[0]).not.toContain("task.md");
    expect(parentIndex.split("## Completed")[1]?.split("## Cancelled")[0]).toContain("(completed/task.md)");
    const check = spawnSync(process.execPath, [checker, "--project", project, "--level", "full-bundle", "--no-persist"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    expect(JSON.parse(check.stdout).conformance).toBe("passed");
  });

  it("rebases the moved task's own outbound links", async () => {
    const project = await copyFixture();
    const task = path.join(project, "knowledge/tasks/active/task.md");
    await writeFile(task, (await readFile(task, "utf8")).replace(
      "\n## Decision Applicability\n",
      "\nSee the [active index](README.md) for peers.\n\n## Decision Applicability\n",
    ));
    run("repin", project);
    const resultFile = path.join(project, "..", "outbound-result.md");
    await writeFile(resultFile, "Completed with outbound links rebased.\n");
    const result = run("task", project, ["--task", "TEST-001", "--to", "close", "--result-file", resultFile, "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    const moved = await readFile(path.join(project, "knowledge/tasks/completed/task.md"), "utf8");
    expect(moved).toContain("](../active/README.md)");
    expect(moved).not.toContain("](README.md)");
  });

  it("blocks closing when the gate carries unexcepted findings", async () => {
    const project = await copyFixture();
    const task = path.join(project, "knowledge/tasks/active/task.md");
    await writeFile(task, (await readFile(task, "utf8")).replace(
      "No mandatory capability is implicated by this Task.",
      "| Capability | Finding | Verification | Exception |\n| --- | --- | --- | --- |\n| Custom terrain | unsupported | none | none |",
    ));
    run("repin", project);
    const result = run("task", project, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("gate blocks completion");
    expect(await readFile(path.join(project, "knowledge/tasks/active/task.md"), "utf8")).toContain("task_status: active");
  });

  it("defers and reactivates a task", async () => {
    const project = await copyFixture();
    const deferred = run("task", project, ["--task", "TEST-001", "--to", "defer", "--checker", checker]);
    expect(deferred.status, deferred.stderr).toBe(0);
    const activated = run("task", project, ["--task", "TEST-001", "--to", "activate", "--checker", checker]);
    expect(activated.status, activated.stderr).toBe(0);
    expect(await readFile(path.join(project, "knowledge/tasks/active/task.md"), "utf8")).toContain("task_status: active");
  });

  it("cancels a task with a recorded rationale and no completion gate", async () => {
    const project = await copyFixture();
    const task = path.join(project, "knowledge/tasks/active/task.md");
    await writeFile(task, (await readFile(task, "utf8")).replace(
      "No mandatory capability is implicated by this Task.",
      "| Capability | Finding | Verification | Exception |\n| --- | --- | --- | --- |\n| Custom terrain | unsupported | none | none |",
    ));
    run("repin", project);
    const noRationale = run("task", project, ["--task", "TEST-001", "--to", "cancel", "--checker", checker]);
    expect(noRationale.status).toBe(1);
    expect(noRationale.stderr).toContain("cancellation rationale");
    const resultFile = path.join(project, "..", "cancel-result.md");
    await writeFile(resultFile, "Cancelled: the capability is unsupported and the work will not be done.\n");
    const result = run("task", project, ["--task", "TEST-001", "--to", "cancel", "--result-file", resultFile, "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    const moved = await readFile(path.join(project, "knowledge/tasks/cancelled/task.md"), "utf8");
    expect(moved).toContain("task_status: cancelled");
    expect(moved).toContain("## Cancellation Result");
    const terminal = run("task", project, ["--task", "TEST-001", "--to", "activate", "--checker", checker]);
    expect(terminal.status).toBe(1);
    expect(terminal.stderr).toContain("terminal");
  });

  it("refuses a git transition on a dirty work tree", async () => {
    const { project, taskId } = await gitFixture();
    await writeFile(path.join(project, "dirty.txt"), "x\n");
    const result = run("task", project, ["--task", taskId, "--to", "defer", "--checker", checker]);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("work tree must be clean");
  });

  it("defers on a task branch, commits, pushes, and restores the default branch", async () => {
    const { project, taskId, g, bare } = await gitFixture();
    const result = run("task", project, ["--task", taskId, "--to", "defer", "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.git.branch).toBe(`task/${taskId}`);
    expect(result.json.git.pushed).toBe(true);
    expect(result.json.git.pull_request).toBe("unsupported-remote");
    expect(result.json.git.restored_branch).toBe("master");
    expect(g(["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim()).toBe("master");
    expect(g(["status", "--porcelain"]).stdout.trim()).toBe("");
    const remoteBranches = spawnSync("git", ["--git-dir", bare, "branch"], { encoding: "utf8" }).stdout;
    expect(remoteBranches).toContain(`task/${taskId}`);
  });

  it("activates into a task worktree and closes from it, releasing the worktree", async () => {
    const { project, taskId, g } = await gitFixture();
    const deferred = run("task", project, ["--task", taskId, "--to", "defer", "--checker", checker]);
    expect(deferred.status, deferred.stderr).toBe(0);
    g(["merge", "--ff-only", `task/${taskId}`]);
    g(["push", "origin", "master"]);
    g(["branch", "-D", `task/${taskId}`]);
    g(["push", "origin", "--delete", `task/${taskId}`]);
    const activated = run("task", project, ["--task", taskId, "--to", "activate", "--checker", checker]);
    expect(activated.status, activated.stderr).toBe(0);
    expect(activated.json.git.mode).toBe("worktree");
    const worktree = activated.json.git.worktree as string;
    expect(worktree).toContain(`project-worktrees/${taskId}`);
    expect(activated.json.git.state).toBe("draft-opened");
    expect(activated.json.git.pushed).toBe(true);
    expect(activated.json.git.pull_request).toBe("unsupported-remote");
    expect(activated.json.git.materialized_artifacts).toEqual(["dist/generated-adopter.mjs"]);
    expect(g(["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim()).toBe("master");
    expect(await readFile(path.join(worktree, "dist/generated-adopter.mjs"), "utf8")).toBe(
      "export const generated = true;\n",
    );
    expect(await readFile(path.join(worktree, "knowledge/tasks/active/task.md"), "utf8")).toContain("task_status: active");
    expect(await readFile(path.join(project, "knowledge/tasks/deferred/task.md"), "utf8")).toContain("task_status: deferred");

    const resultFile = path.join(project, "..", "worktree-close-result.md");
    await writeFile(resultFile, "Completed inside the task worktree.\n");
    const closed = run("task", worktree, ["--task", taskId, "--to", "close", "--result-file", resultFile, "--checker", checker]);
    expect(closed.status, closed.stderr).toBe(0);
    expect(closed.json.git.mode).toBe("worktree-resident");
    expect(closed.json.git.state).toBe("conclusion-proposed");
    expect(closed.json.git.pushed).toBe(true);
    expect(closed.json.git.worktree_state).toBe("removed");
    expect(await lstat(worktree).catch(() => null)).toBeNull();
    expect(g(["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim()).toBe("master");
  });

  it("reports an incomplete git step on a successful transition instead of failing", async () => {
    const { project, taskId, g } = await gitFixture();
    g(["remote", "set-url", "origin", path.join(project, "..", "missing-origin.git")]);
    const result = run("task", project, ["--task", taskId, "--to", "defer", "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.state).toBe("transitioned");
    expect(result.json.git.state).toBe("incomplete");
    expect(result.json.git.commit).toMatch(/^[0-9a-f]{40}$/);
    expect(result.json.git.pushed).toBe(false);
    expect(result.json.git.git_error).toContain("git");
    expect(await readFile(path.join(project, "knowledge/tasks/deferred/task.md"), "utf8")).toContain("task_status: deferred");
  });

  it("migrates a declared 0.1 project to 0.2 through the archive", async () => {
    const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-migrate-"));
    const project = path.join(parent, "project");
    const archived = spawnSync("git", ["archive", "b748402", "fixtures/valid/minimal"], { cwd: repositoryRoot, encoding: null, maxBuffer: 64 * 1024 * 1024 });
    expect(archived.status).toBe(0);
    const extract = spawnSync("tar", ["-x", "-C", parent], { input: archived.stdout, encoding: null });
    expect(extract.status).toBe(0);
    await cp(path.join(parent, "fixtures/valid/minimal"), project, { recursive: true });
    const result = run("migrate", project, ["--archive", archivePath, "--sha256", archiveSha256]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.state).toBe("migrated");
    expect(result.json.tasks_gated).toBe(1);
    expect(result.json.validation.conformance).toBe("passed");
    const bundle = await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8");
    expect(bundle).toContain('nkf_version: "0.2"');
    expect(bundle).toContain("tasks/cancelled/README.md");
    expect(await readFile(path.join(project, "knowledge/tasks/cancelled/README.md"), "utf8")).toContain("# Cancelled Tasks");
    expect(await readFile(path.join(project, "knowledge/tasks/README.md"), "utf8")).toContain("(cancelled/README.md)");
  });
});
