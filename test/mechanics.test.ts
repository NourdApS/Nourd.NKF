import { cp, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { repositoryRoot } from "./helpers.js";

// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
const {
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
    const check = spawnSync(process.execPath, [checker, "--project", project, "--level", "full-bundle", "--no-persist"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    expect(JSON.parse(check.stdout).conformance).toBe("passed");
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
  });
});
