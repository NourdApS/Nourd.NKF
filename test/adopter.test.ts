import { spawnSync } from "node:child_process";
import {
  appendFile,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  symlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import YAML from "yaml";
// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
const {
  RELEASE_ENTRIES,
  constructReleaseManifest,
  createUstar,
  serializeReleaseManifest,
  sha256,
} = release;
import {
  repositoryRoot,
  validFixture,
  validTechnologyFixture,
} from "./helpers.js";

const adopter = path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs");
let archivePath: string;
let archiveSha256: string;

async function createProject(fixture = validFixture) {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-adopter-test-"));
  const project = path.join(parent, "project");
  await cp(fixture, project, { recursive: true });
  return project;
}

function run(
  command: string,
  project: string,
  extra: string[] = [],
  env: NodeJS.ProcessEnv = {},
) {
  return spawnSync(
    process.execPath,
    [adopter, command, "--project", project, ...extra],
    { encoding: "utf8", env: { ...process.env, ...env } },
  );
}

async function createEmptyProject() {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-onboarding-test-"));
  const project = path.join(parent, "project");
  await mkdir(project);
  return { parent, project, workspace: path.join(parent, "workspace") };
}

function inspect(
  project: string,
  workspace: string,
  profile: "product" | "technology" = "product",
  knowledgeRoot = "knowledge",
) {
  const technology = profile === "technology";
  return run("inspect", project, [
    "--output",
    workspace,
    "--profile",
    profile,
    "--root-id",
    technology ? "example-technology" : "example-product",
    "--root-title",
    technology ? "Example Technology" : "Example Product",
    "--task-id",
    technology ? "EXAMPLE-TECH-001" : "EXAMPLE-001",
    "--created-at",
    "2026-07-31T11:00:00Z",
    "--knowledge-root",
    knowledgeRoot,
  ]);
}

function seal(project: string, workspace: string) {
  return run("seal", project, ["--plan", path.join(workspace, "plan.yaml")]);
}

function onboard(
  project: string,
  workspace: string,
  env: NodeJS.ProcessEnv = {},
) {
  return run(
    "onboard",
    project,
    [
      "--plan",
      path.join(workspace, "plan.yaml"),
      "--archive",
      archivePath,
      "--sha256",
      archiveSha256,
    ],
    env,
  );
}

async function resolveAllAsNavigation(workspace: string) {
  const planPath = path.join(workspace, "plan.yaml");
  const plan = YAML.parse(await readFile(planPath, "utf8"));
  for (const document of plan.documents) {
    document.representation = {
      kind: "non_record",
      non_record_kind: "navigation",
    };
  }
  await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
}

async function snapshotTree(root: string) {
  const result = new Map<string, Buffer>();
  const visit = async (directory: string, prefix = "") => {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const relative = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(absolute, relative);
      else if (entry.isFile()) result.set(relative, await readFile(absolute));
      else result.set(relative, Buffer.from(`kind:${(await lstat(absolute)).mode}`));
    }
  };
  await visit(root);
  return result;
}

function expectTreeEqual(actual: Map<string, Buffer>, expected: Map<string, Buffer>) {
  expect([...actual.keys()]).toEqual([...expected.keys()]);
  for (const [key, bytes] of expected) expect(actual.get(key)).toEqual(bytes);
}

beforeAll(async () => {
  const entries = new Map<string, Buffer>();
  for (const entry of RELEASE_ENTRIES) {
    if (entry.path === "release-manifest.json") continue;
    entries.set(
      entry.path,
      await readFile(path.join(repositoryRoot, entry.path)),
    );
  }
  const manifest = constructReleaseManifest({
    releaseCommit: "a".repeat(40),
    checkerConfirmation: {
      decision: "ADR-0065",
      path: "knowledge/decisions/0065-confirm-current-release-bound-checker.md",
      bytes: Buffer.from("# ADR 0065\n", "utf8"),
      checkerSourceCommit: "b".repeat(40),
    },
    entries,
  });
  entries.set("release-manifest.json", serializeReleaseManifest(manifest));
  const archive = createUstar(entries);
  archiveSha256 = sha256(archive);
  const directory = await mkdtemp(path.join(os.tmpdir(), "nkf-adopter-release-"));
  archivePath = path.join(
    directory,
    `nourd-nkf-sha256-${archiveSha256}.tar`,
  );
  await writeFile(archivePath, archive);
});

describe("NKF consumer adopter", () => {
  it("onboards empty Product and Technology repositories without native assembly", async () => {
    for (const profile of ["product", "technology"] as const) {
      const { project, workspace } = await createEmptyProject();
      const inspected = inspect(project, workspace, profile);
      expect(inspected.status, inspected.stderr).toBe(0);
      expect(JSON.parse(inspected.stdout)).toMatchObject({
        eligible: true,
        state: "workspace-created",
      });
      expect(seal(project, workspace).status).toBe(0);

      const result = onboard(project, workspace);
      expect(result.status, result.stderr).toBe(0);
      const report = JSON.parse(result.stdout);
      expect(report).toMatchObject({
        state: "onboarded",
        meaning: {
          root_status: "draft",
          classification_status: "resolved",
          substantive_meaning: "contains-unresolved",
          realization_confirmation: "unconfirmed",
        },
        validation: { conformance: "passed", governing_use: "not-ready" },
      });
      expect(
        await readFile(path.join(project, "package-lock.json"), "utf8"),
      ).toContain('"lockfileVersion": 3');
      expect(
        await readFile(path.join(project, ".github/workflows/nkf-contracts.yml"), "utf8"),
      ).toContain("run: npm run nkf:check");
      if (profile === "technology") {
        expect(
          await readFile(
            path.join(project, "knowledge/specifications/initial-specification.md"),
            "utf8",
          ),
        ).toContain("All substantive Technology contract meaning remains unresolved");
      }

      const repeat = onboard(project, workspace);
      expect(repeat.status, repeat.stderr).toBe(0);
      expect(JSON.parse(repeat.stdout).state).toBe("no-update");
    }
  });

  it("preserves and explicitly represents nested small-document corpora for both profiles", async () => {
    for (const profile of ["product", "technology"] as const) {
      const { project, workspace } = await createEmptyProject();
      const nested = path.join(project, "knowledge", "notes", "overview.md");
      await mkdir(path.dirname(nested), { recursive: true });
      const original = Buffer.from(
        [
          "---",
          "title: Project Overview",
          'summary: "Provides early navigation without accepted lifecycle meaning."',
          "created_at: 2026-07-31T11:00:00Z",
          "---",
          "",
          "# Project Overview",
          "",
          "This early note remains project-owned.",
          "",
        ].join("\n"),
      );
      await writeFile(nested, original);
      expect(inspect(project, workspace, profile).status).toBe(0);
      await resolveAllAsNavigation(workspace);
      expect(seal(project, workspace).status).toBe(0);
      const result = onboard(project, workspace);
      expect(result.status, result.stderr).toBe(0);
      expect(await readFile(nested)).toEqual(original);
      expect(JSON.parse(result.stdout).paths.preserved).toContain(
        "knowledge/notes/overview.md",
      );
      const bundle = YAML.parse(
        await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"),
      );
      expect(bundle.non_records).toContainEqual({
        path: "notes/overview.md",
        kind: "navigation",
      });
    }
  });

  it("applies only exact sealed candidate edits", async () => {
    const { project, workspace } = await createEmptyProject();
    const source = path.join(project, "knowledge", "notes.md");
    await mkdir(path.dirname(source), { recursive: true });
    await writeFile(source, "# Notes\n\nEarly notes.\n");
    expect(inspect(project, workspace).status).toBe(0);
    const planPath = path.join(workspace, "plan.yaml");
    const plan = YAML.parse(await readFile(planPath, "utf8"));
    plan.documents[0].representation = {
      kind: "non_record",
      non_record_kind: "navigation",
    };
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    const candidate = path.join(workspace, "candidate", "notes.md");
    const revised = [
      "---",
      "title: Notes",
      'summary: "Provides early project navigation."',
      "created_at: 2026-07-31T11:00:00Z",
      "---",
      "",
      "# Notes",
      "",
      "Early notes.",
      "",
    ].join("\n");
    await writeFile(candidate, revised);

    const unsealed = onboard(project, workspace);
    expect(unsealed.status).toBe(1);
    expect(unsealed.stderr).toContain("NKF-ONBOARDING-CANDIDATE-DRIFT");
    expect(await readFile(source, "utf8")).toBe("# Notes\n\nEarly notes.\n");

    expect(seal(project, workspace).status).toBe(0);
    const applied = onboard(project, workspace);
    expect(applied.status, applied.stderr).toBe(0);
    expect(await readFile(source, "utf8")).toBe(revised);
    expect(JSON.parse(applied.stdout).paths.changed).toContain("knowledge/notes.md");
  });

  it("fails closed for unresolved, oversized, mature, and symlinked inputs", async () => {
    const unresolved = await createEmptyProject();
    await mkdir(path.join(unresolved.project, "knowledge"));
    await writeFile(path.join(unresolved.project, "knowledge", "note.md"), "# Note\n");
    expect(inspect(unresolved.project, unresolved.workspace).status).toBe(0);
    expect(seal(unresolved.project, unresolved.workspace).status).toBe(0);
    const before = await snapshotTree(unresolved.project);
    const unresolvedResult = onboard(unresolved.project, unresolved.workspace);
    expect(unresolvedResult.status).toBe(1);
    expect(unresolvedResult.stderr).toContain("NKF-ONBOARDING-PLAN-UNRESOLVED");
    expectTreeEqual(await snapshotTree(unresolved.project), before);

    const oversized = await createEmptyProject();
    await mkdir(path.join(oversized.project, "knowledge"));
    for (let index = 0; index < 21; index += 1) {
      await writeFile(
        path.join(oversized.project, "knowledge", `note-${index}.md`),
        `# Note ${index}\n`,
      );
    }
    const oversizedResult = inspect(oversized.project, oversized.workspace);
    expect(oversizedResult.status).toBe(0);
    expect(JSON.parse(oversizedResult.stdout)).toMatchObject({
      eligible: false,
      state: "deferred",
    });
    expect(oversizedResult.stdout).toContain("NKF-ONBOARDING-DEFER-NKF-014");

    const mature = await createEmptyProject();
    await mkdir(path.join(mature.project, "knowledge"));
    await writeFile(
      path.join(mature.project, "knowledge", "decision.md"),
      [
        "---",
        "id: existing-decision",
        "type: decision",
        "title: Existing Decision",
        'summary: "Records established project history."',
        "created_at: 2026-07-31T11:00:00Z",
        "record_lifecycle: immutable",
        "record_status: accepted",
        "task: EXISTING-001",
        "---",
        "",
        "# Existing Decision",
        "",
      ].join("\r\n"),
    );
    const matureResult = inspect(mature.project, mature.workspace);
    expect(JSON.parse(matureResult.stdout).eligible).toBe(false);
    expect(matureResult.stdout).toContain("NKF-ONBOARDING-DEFER-NKF-014");

    const linked = await createEmptyProject();
    await mkdir(path.join(linked.project, "knowledge"));
    await writeFile(path.join(linked.parent, "outside.md"), "# Outside\n");
    await symlink(
      path.join(linked.parent, "outside.md"),
      path.join(linked.project, "knowledge", "linked.md"),
    );
    const linkedResult = inspect(linked.project, linked.workspace);
    expect(JSON.parse(linkedResult.stdout).eligible).toBe(false);
    expect(linkedResult.stdout).toContain("NKF-ONBOARDING-SYMLINK-PROHIBITED");

    const linkedRoot = await createEmptyProject();
    const outsideRoot = path.join(linkedRoot.parent, "outside-root");
    await mkdir(path.join(outsideRoot, "knowledge"), { recursive: true });
    await writeFile(
      path.join(outsideRoot, "knowledge", "note.md"),
      "# Outside Root\n",
    );
    await symlink(outsideRoot, path.join(linkedRoot.project, "docs"));
    const linkedRootResult = inspect(
      linkedRoot.project,
      linkedRoot.workspace,
      "product",
      "docs/knowledge",
    );
    expect(JSON.parse(linkedRootResult.stdout).eligible).toBe(false);
    expect(linkedRootResult.stdout).toContain(
      "NKF-ONBOARDING-SYMLINK-PROHIBITED",
    );
  });

  it("rejects duplicate and escaping plan paths before project mutation", async () => {
    const duplicate = await createEmptyProject();
    await mkdir(path.join(duplicate.project, "knowledge"));
    await writeFile(
      path.join(duplicate.project, "knowledge", "note.md"),
      "# Note\n",
    );
    await writeFile(
      path.join(duplicate.project, "knowledge", "note-two.md"),
      "# Note Two\n",
    );
    expect(inspect(duplicate.project, duplicate.workspace).status).toBe(0);
    const duplicatePlanPath = path.join(duplicate.workspace, "plan.yaml");
    const duplicatePlan = YAML.parse(
      await readFile(duplicatePlanPath, "utf8"),
    );
    duplicatePlan.documents[0].representation = {
      kind: "non_record",
      non_record_kind: "navigation",
    };
    duplicatePlan.documents[1] = structuredClone(duplicatePlan.documents[0]);
    await writeFile(
      duplicatePlanPath,
      YAML.stringify(duplicatePlan, { lineWidth: 0 }),
    );
    const duplicateBefore = await snapshotTree(duplicate.project);
    const duplicateResult = onboard(duplicate.project, duplicate.workspace);
    expect(duplicateResult.status).toBe(1);
    expect(duplicateResult.stderr).toContain("Duplicate document path");
    expectTreeEqual(await snapshotTree(duplicate.project), duplicateBefore);

    const escaping = await createEmptyProject();
    await mkdir(path.join(escaping.project, "knowledge"));
    await writeFile(
      path.join(escaping.project, "knowledge", "note.md"),
      "# Note\n",
    );
    expect(inspect(escaping.project, escaping.workspace).status).toBe(0);
    const escapingPlanPath = path.join(escaping.workspace, "plan.yaml");
    const escapingPlan = YAML.parse(await readFile(escapingPlanPath, "utf8"));
    escapingPlan.documents[0].representation = {
      kind: "non_record",
      non_record_kind: "navigation",
    };
    escapingPlan.documents[0].candidate_path = "candidate/../outside.md";
    await writeFile(
      escapingPlanPath,
      YAML.stringify(escapingPlan, { lineWidth: 0 }),
    );
    const escapingBefore = await snapshotTree(escaping.project);
    const escapingResult = onboard(escaping.project, escaping.workspace);
    expect(escapingResult.status).toBe(1);
    expect(escapingResult.stderr).toContain("NKF-ONBOARDING-PATH-INVALID");
    expectTreeEqual(await snapshotTree(escaping.project), escapingBefore);
  });

  it("preserves existing project conventions and rolls back a handled post-write failure", async () => {
    const { project, workspace } = await createEmptyProject();
    await writeFile(
      path.join(project, "package.json"),
      `${JSON.stringify({
        name: "existing-project",
        private: true,
        scripts: { test: "node --test" },
      }, null, 2)}\n`,
    );
    await writeFile(path.join(project, "AGENTS.md"), "# Existing Instructions\n");
    const sourceBytes = Buffer.from("export const value = 1;\n");
    await mkdir(path.join(project, "src"));
    await writeFile(path.join(project, "src", "index.ts"), sourceBytes);
    const inspected = inspect(project, workspace);
    expect(inspected.status).toBe(0);
    expect(JSON.parse(inspected.stdout)).toMatchObject({
      package_scripts: ["test"],
      git: { repository: false, default_branch: "master" },
      project_surfaces: expect.arrayContaining([
        expect.objectContaining({ path: "AGENTS.md", policy: "merge" }),
        expect.objectContaining({ path: "package.json", policy: "merge" }),
      ]),
    });
    expect(seal(project, workspace).status).toBe(0);
    const originalInstructions = await readFile(path.join(project, "AGENTS.md"));
    await appendFile(path.join(project, "AGENTS.md"), "\nChanged after inspection.\n");
    const drifted = onboard(project, workspace);
    expect(drifted.status).toBe(1);
    expect(drifted.stderr).toContain("NKF-ONBOARDING-INSPECTION-DRIFT");
    await writeFile(path.join(project, "AGENTS.md"), originalInstructions);
    const before = await snapshotTree(project);
    const failed = onboard(project, workspace, {
      NKF_ONBOARDING_TEST_FAIL_AFTER_WRITE: "1",
    });
    expect(failed.status).toBe(1);
    expect(failed.stderr).toContain("Injected onboarding transaction failure");
    expectTreeEqual(await snapshotTree(project), before);

    const result = onboard(project, workspace);
    expect(result.status, result.stderr).toBe(0);
    const manifest = JSON.parse(await readFile(path.join(project, "package.json"), "utf8"));
    expect(manifest.scripts.test).toBe("node --test");
    expect(manifest.scripts["nkf:check"]).toContain("nourd-nkf-adopt.mjs check");
    const instructions = await readFile(path.join(project, "AGENTS.md"), "utf8");
    expect(instructions).toContain("# Existing Instructions");
    expect(instructions).toContain("nkf-authoring-adapter:start");
    expect(await readFile(path.join(project, "src", "index.ts"))).toEqual(
      sourceBytes,
    );
  });

  it("rejects an existing owned workflow before project mutation", async () => {
    const { project, workspace } = await createEmptyProject();
    const workflow = path.join(project, ".github/workflows/nkf-contracts.yml");
    await mkdir(path.dirname(workflow), { recursive: true });
    await writeFile(workflow, "name: Existing Workflow\n");
    const inspected = inspect(project, workspace);
    expect(inspected.status).toBe(0);
    expect(JSON.parse(inspected.stdout).project_surfaces).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ".github/workflows/nkf-contracts.yml",
          policy: "exclusive",
        }),
      ]),
    );
    expect(seal(project, workspace).status).toBe(0);
    const before = await snapshotTree(project);
    const result = onboard(project, workspace);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("would overwrite an existing owned path");
    expectTreeEqual(await snapshotTree(project), before);
  });

  it("installs and validates an already structured Product repository", async () => {
    const project = await createProject();
    const installed = run("install", project, [
      "--archive",
      archivePath,
      "--sha256",
      archiveSha256,
    ]);
    expect(installed.status, installed.stderr).toBe(0);
    expect(JSON.parse(installed.stdout).state).toBe("installed");

    const pin = JSON.parse(
      await readFile(path.join(project, ".nourd/nkf-release.json"), "utf8"),
    );
    expect(pin.archive.sha256).toBe(archiveSha256);
    expect(pin.root_profile).toBe("nkf.profile.product");
    expect(
      await readFile(
        path.join(project, ".agents/skills/nkf-authoring/SKILL.md"),
      ),
    ).toEqual(
      await readFile(
        path.join(project, ".claude/skills/nkf-authoring/SKILL.md"),
      ),
    );
    expect(
      await readFile(
        path.join(project, ".github/workflows/nkf-contracts.yml"),
        "utf8",
      ),
    ).toContain("run: npm run nkf:check");

    const check = run("check", project);
    expect(check.status, check.stderr).toBe(0);
    expect(JSON.parse(check.stdout).state).toBe("passed");

    const noUpdate = run("install", project, [
      "--archive",
      archivePath,
      "--sha256",
      archiveSha256,
    ]);
    expect(noUpdate.status, noUpdate.stderr).toBe(0);
    expect(JSON.parse(noUpdate.stdout).state).toBe("no-update");
  });

  it("installs the same pinned experience for a Technology repository", async () => {
    const project = await createProject(validTechnologyFixture);
    const result = run("install", project, [
      "--archive",
      archivePath,
      "--sha256",
      archiveSha256,
    ]);
    expect(result.status, result.stderr).toBe(0);
    expect(
      JSON.parse(
        await readFile(path.join(project, ".nourd/nkf-release.json"), "utf8"),
      ).root_profile,
    ).toBe("nkf.profile.technology");
  });

  it("fails closed on release, pin, integration, and knowledge tampering", async () => {
    const project = await createProject();
    expect(
      run("install", project, [
        "--archive",
        archivePath,
        "--sha256",
        archiveSha256,
      ]).status,
    ).toBe(0);

    const archive = await readFile(archivePath);
    const corruptedPath = path.join(path.dirname(project), "corrupted.tar");
    const corrupted = Buffer.from(archive);
    corrupted[700] = corrupted[700]! ^ 1;
    await writeFile(corruptedPath, corrupted);
    const fresh = await createProject();
    expect(
      run("install", fresh, [
        "--archive",
        corruptedPath,
        "--sha256",
        archiveSha256,
      ]).status,
    ).not.toBe(0);

    const pinPath = path.join(project, ".nourd/nkf-release.json");
    const pinOriginal = await readFile(pinPath);
    const pin = JSON.parse(pinOriginal.toString("utf8"));
    pin.checker_sha256 = "0".repeat(64);
    await writeFile(pinPath, `${JSON.stringify(pin, null, 2)}\n`);
    expect(run("status", project).status).not.toBe(0);
    await writeFile(pinPath, pinOriginal);

    const skillPath = path.join(
      project,
      ".agents/skills/nkf-authoring/SKILL.md",
    );
    const skillOriginal = await readFile(skillPath);
    await appendFile(skillPath, "\nchanged\n");
    expect(run("status", project).status).not.toBe(0);
    await writeFile(skillPath, skillOriginal);

    await appendFile(path.join(project, "knowledge/product.md"), "\nChanged.\n");
    expect(run("check", project).status).not.toBe(0);
  });

  it("preserves conflicting consumer-owned integration paths", async () => {
    const project = await createProject();
    const workflowPath = path.join(
      project,
      ".github/workflows/nkf-contracts.yml",
    );
    await mkdir(path.dirname(workflowPath), { recursive: true });
    await writeFile(workflowPath, "name: Existing Workflow\n");
    const before = await readFile(workflowPath);
    const result = run("install", project, [
      "--archive",
      archivePath,
      "--sha256",
      archiveSha256,
    ]);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("would overwrite an existing owned path");
    expect(await readFile(workflowPath)).toEqual(before);
  });
});
