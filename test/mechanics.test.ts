import { cp, lstat, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import YAML from "yaml";
import { repositoryRoot } from "./helpers.js";

// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
const { sha256, releaseEntriesForVersion } = release;
// @ts-expect-error Repository release-set tooling is directly executable ESM.
const releaseSetTooling = await import("../scripts/release/release-set.mjs");
const { readReleaseSet } = releaseSetTooling;

const adopter = path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs");
const checker = path.join(repositoryRoot, "dist/nourd-nkf-checker.mjs");

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
  await cp(path.join(repositoryRoot, "fixtures/valid/minimal-0-7"), project, { recursive: true });
  return project;
}

async function copyFixture0_6(): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-mechanics-0-6-"));
  const project = path.join(parent, "project");
  await cp(path.join(repositoryRoot, "fixtures/valid/technology-0-6"), project, { recursive: true });
  return project;
}

// Authors the transition-result section the native transition requires in the
// stable Task source, then re-pins the represented document digest.
async function authorTaskResult(project: string, heading: string, body: string) {
  const source = path.join(project, "knowledge/tasks/active/task.md");
  await writeFile(source, (await readFile(source, "utf8")).replace(
    "\n## Decision Applicability\n",
    `\n${heading}\n\n${body}\n\n## Decision Applicability\n`,
  ));
  const repin = run("repin", project, ["--checker", checker]);
  expect(repin.status, repin.stderr).toBe(0);
}

async function taskState(project: string): Promise<string> {
  const bundle = YAML.parse(
    await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"),
  );
  const task = bundle.non_records.find((item: any) => item.kind === "task");
  return task.document.state.value;
}

describe("deterministic governed mechanics", () => {
  it("exports the reference maps", async () => {
    const project = await copyFixture();
    const productDeclarationPath = path.join(project, ".nourd/knowledge/records/product.yaml");
    const productDeclaration = YAML.parse(await readFile(productDeclarationPath, "utf8"));
    productDeclaration.entities = [
      { id: "source-entity", kind: "concept", defining_section: "product-definition" },
      { id: "target-entity", kind: "concept", defining_section: "product-definition" },
    ];
    productDeclaration.entity_relationships = [{
      type: "depends-on",
      source: { record: "product", entity: "source-entity" },
      target: { record: "product", entity: "target-entity" },
      source_section: "product-definition",
    }];
    await writeFile(productDeclarationPath, YAML.stringify(productDeclaration, { lineWidth: 0 }));
    const result = run("refs", project);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.state).toBe("exported");
    expect(result.json.records.product).toBe("product.md");
    expect(result.json.documents["TEST-001"]).toBe("tasks/active/task.md");
    expect(result.json.tasks["TEST-001"]).toBe("tasks/active/task.md");
    expect(result.json.relationships).toEqual([{
      source: { kind: "entity", record: "product", entity: "source-entity" },
      relationship: "depends-on",
      target: { kind: "entity", record: "product", entity: "target-entity" },
      source_binding: {
        kind: "section",
        node: { kind: "entity", record: "product", entity: "source-entity" },
        section: "product-definition",
      },
    }]);
  });

  it("fails closed instead of collapsing duplicate represented document identities", async () => {
    const project = await copyFixture();
    const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundlePath, "utf8"));
    const represented = bundle.non_records.find((item: any) => item.document?.id !== undefined);
    bundle.non_records.push(structuredClone(represented));
    await writeFile(bundlePath, YAML.stringify(bundle, { lineWidth: 0 }));
    const result = run("refs", project);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(`Duplicate governed document identity: ${represented.document.id}`);
  });

  it("fails closed instead of omitting malformed authored relationships", async () => {
    const nonArrayProject = await copyFixture();
    const nonArrayPath = path.join(nonArrayProject, ".nourd/knowledge/records/product.yaml");
    const nonArray = YAML.parse(await readFile(nonArrayPath, "utf8"));
    nonArray.relationships = {};
    await writeFile(nonArrayPath, YAML.stringify(nonArray, { lineWidth: 0 }));
    const omitted = run("refs", nonArrayProject);
    expect(omitted.status).toBe(1);
    expect(omitted.stderr).toContain("non-array relationship or entity field");

    const malformedProject = await copyFixture();
    const malformedPath = path.join(malformedProject, ".nourd/knowledge/records/product.yaml");
    const malformed = YAML.parse(await readFile(malformedPath, "utf8"));
    malformed.relationships = [{ type: "depends-on", source_section: "product-definition" }];
    await writeFile(malformedPath, YAML.stringify(malformed, { lineWidth: 0 }));
    const invalid = run("refs", malformedProject);
    expect(invalid.status).toBe(1);
    expect(invalid.stderr).toContain("unsupported fields");
  });

  it("exports the exact accepted release-set membership", async () => {
    const result = run("set", repositoryRoot);
    const bundle = await readFile(
      path.join(repositoryRoot, ".nourd/knowledge/bundle.yaml"),
      "utf8",
    );
    const declared = /^nkf_version: "([^"]+)"$/m.exec(bundle)?.[1] ?? "0.6";
    const releaseSet = await readReleaseSet(repositoryRoot, declared);
    const expectedEntries = releaseEntriesForVersion(declared, releaseSet);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.state).toBe("enumerated");
    expect(result.json.nkf_version).toBe(declared);
    const expectedPaths = expectedEntries.map((entry: { path: string }) => entry.path);
    expect(result.json.members.map((member: { path: string }) => member.path)).toEqual(
      expectedPaths,
    );
    expect(result.json.members).toEqual(releaseSet.members);
    const classPaths = (classes: string[]) =>
      releaseSet.members
        .filter((member: { class: string }) => classes.includes(member.class))
        .map((member: { path: string }) => member.path);
    expect(expectedPaths).toContain("dist/nourd-nkf-adopt.mjs");
    for (const classes of [
      ["host-adapter-instruction"],
      ["product-fixture", "technology-fixture"],
      ["public-documentation"],
    ]) {
      const expected = classPaths(classes);
      expect(expected.length).toBeGreaterThan(0);
      expect(
        expectedPaths.filter((member: string) => expected.includes(member)),
      ).toHaveLength(expected.length);
    }
    const guidancePaths = classPaths([
      "authoring-protocol",
      "onboarding-protocol",
      "release-protocol",
      "adoption-protocol",
      "portable-skill",
    ]);
    const guidance = result.json.members.filter((member: { path: string }) =>
      guidancePaths.includes(member.path),
    );
    expect(guidance).toHaveLength(guidancePaths.length);
    for (const member of guidance) expect(member.mode, member.path).toBe("0644");

    const representationProject = path.join(
      await mkdtemp(path.join(os.tmpdir(), "nkf-set-representation-")),
      "project",
    );
    await mkdir(path.join(representationProject, ".nourd/knowledge"), { recursive: true });
    await mkdir(path.join(representationProject, "knowledge"), { recursive: true });
    await mkdir(path.join(representationProject, "contracts/nkf/0.7"), { recursive: true });
    await writeFile(
      path.join(representationProject, ".nourd/knowledge/bundle.yaml"),
      [
        "contract: nkf.bundle",
        "root:",
        "  profile: nkf.profile.technology",
        "  record: representation-fixture",
        "knowledge_root: knowledge",
        "nkf_version: '0.7'",
        "id: representation-fixture",
        "non_records: []",
        "",
      ].join("\n"),
    );
    await cp(
      path.join(repositoryRoot, "contracts/nkf/0.7/release-set.yaml"),
      path.join(representationProject, "contracts/nkf/0.7/release-set.yaml"),
    );
    const representedSet = run("set", representationProject);
    expect(representedSet.status, representedSet.stderr).toBe(0);
    expect(representedSet.json).toMatchObject({ state: "enumerated", nkf_version: "0.7" });
    expect(representedSet.json.members).toHaveLength(185);
  });

  it("re-pins record digests after an edit", async () => {
    const project = await copyFixture();
    const doc = path.join(project, "knowledge/product.md");
    await writeFile(doc, `${await readFile(doc, "utf8")}\nAppended sentence.\n`);
    const result = run("repin", project, ["--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.records).toBe(1);
    const check = spawnSync(process.execPath, [checker, "--project", project, "--level", "full-bundle", "--no-persist"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    expect(JSON.parse(check.stdout).conformance).toBe("passed");
  });

  it("re-pins a governed artifact independent of sibling order without rewriting other bundle bytes", async () => {
    const project = await copyFixture0_6();
    const artifactPath = path.join(project, "src/example.ts");
    const changedArtifact = Buffer.from("export const value = 2;\n", "utf8");
    await writeFile(artifactPath, changedArtifact);
    const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
    const original = await readFile(bundlePath, "utf8");
    const priorDigest = YAML.parse(original).governed_artifacts[0].digest.value;
    const reordered = original.replace(
      "    path: src/example.ts\n    digest:\n      algorithm: sha-256\n      value:",
      "    # preserved artifact sibling comment\n    digest:\n      algorithm: sha-256\n      value:",
    ).replace(
      "    record: realization",
      "    path: src/example.ts\n    record: realization",
    );
    expect(reordered).not.toBe(original);
    await writeFile(bundlePath, reordered);
    const result = run("repin", project, ["--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.artifacts).toBe(1);
    expect(await readFile(bundlePath, "utf8")).toBe(
      reordered.replace(priorDigest, `"${sha256(changedArtifact)}"`),
    );
  });

  it("rejects anchored, tagged, aliased, and merged scalar mutation targets before writing", async () => {
    for (const representation of ["anchored", "tagged", "aliased", "merged"] as const) {
      const project = await copyFixture0_6();
      const artifactPath = path.join(project, "src/example.ts");
      await writeFile(artifactPath, "export const value = 3;\n");
      const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
      const original = await readFile(bundlePath, "utf8");
      const priorDigest = YAML.parse(original).governed_artifacts[0].digest.value;
      let unsupported = original;
      if (representation === "anchored") {
        unsupported = original.replace(`value: ${priorDigest}`, `value: &bound ${priorDigest}`);
      } else if (representation === "tagged") {
        unsupported = original.replace(`value: ${priorDigest}`, `value: !!str ${priorDigest}`);
      } else if (representation === "aliased") {
        unsupported = original
          .replace("algorithm: sha-256", "algorithm: &bound sha-256")
          .replace(`value: ${priorDigest}`, "value: *bound");
      } else {
        unsupported = original.replace(
          `    digest:\n      algorithm: sha-256\n      value: ${priorDigest}`,
          `    digest:\n      <<: &inherited-digest\n        algorithm: sha-256\n        value: ${priorDigest}\n      algorithm: sha-256\n      value: ${priorDigest}`,
        );
      }
      expect(unsupported, representation).not.toBe(original);
      await writeFile(bundlePath, unsupported);
      const result = run("repin", project, ["--checker", checker]);
      expect(result.status, `${representation}: ${result.stderr}`).toBe(1);
      expect(result.stderr).toMatch(/anchored|tagged|aliased|merged|unique scalar/i);
      expect(await readFile(bundlePath, "utf8")).toBe(unsupported);
    }
  });

  it("converts one changed legacy-locked Task document to its native envelope transactionally", async () => {
    const project = await copyFixture0_6();
    const sourcePath = path.join(project, "knowledge/tasks/active/task.md");
    const originalSource = await readFile(sourcePath, "utf8");
    const nativeSource = originalSource
      .replace(/^task_id: .*\n/m, "")
      .replace(/^task_status: .*\n/m, "")
      .replace("\n## Decision Applicability\n", "\nNative 0.6 Task edit.\n\n## Decision Applicability\n");
    await writeFile(sourcePath, nativeSource);
    const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
    const originalBundle = await readFile(bundlePath, "utf8");
    const commentedBundle = originalBundle.replace(
      "      legacy_lock:\n",
      "      # preserved Task sibling comment\n      legacy_lock:\n",
    );
    await writeFile(bundlePath, commentedBundle);
    const result = run("repin", project, ["--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.documents).toBe(1);
    const repinnedText = await readFile(bundlePath, "utf8");
    const repinned = YAML.parse(repinnedText);
    const task = repinned.non_records.find((item: any) => item.kind === "task");
    expect(task.document.legacy_lock).toBeUndefined();
    expect(task.document.digest.value).toBe(sha256(Buffer.from(nativeSource, "utf8")));
    expect(repinnedText).toContain("# preserved Task sibling comment");
    const repeated = run("repin", project, ["--checker", checker]);
    expect(repeated.status, repeated.stderr).toBe(0);
    expect(repeated.json).toMatchObject({ records: 0, documents: 0, artifacts: 0 });
    expect(await readFile(bundlePath, "utf8")).toBe(repinnedText);
  });

  it("linkifies same-bundle references idempotently", async () => {
    const project = await copyFixture();
    const map = path.join(project, "knowledge/README.md");
    await writeFile(map, `${(await readFile(map, "utf8")).trimEnd()}\n\nSee TEST-001 for the active work.\n`);
    const first = run("linkify", project, ["--checker", checker]);
    expect(first.status, first.stderr).toBe(0);
    expect(first.json.changed).toBe(1);
    expect(await readFile(map, "utf8")).toContain("[TEST-001](tasks/active/task.md)");
    const second = run("linkify", project, ["--checker", checker]);
    expect(second.json.changed).toBe(0);
  });

  it("linkifies and natively re-pins a represented legacy Task document", async () => {
    const project = await copyFixture0_6();
    const taskPath = path.join(project, "knowledge/tasks/active/task.md");
    const nativeTask = (await readFile(taskPath, "utf8"))
      .replace(/^task_id: .*\n/m, "")
      .replace(/^task_status: .*\n/m, "")
      .replace(
        "\n## Decision Applicability\n",
        "\nSee `realization` for the realized system.\n\n## Decision Applicability\n",
      );
    await writeFile(taskPath, nativeTask);
    const first = run("linkify", project, ["--checker", checker]);
    expect(first.status, first.stderr).toBe(0);
    expect(first.json).toMatchObject({ changed: 1, repinned_documents: 1 });
    expect(await readFile(taskPath, "utf8")).toContain(
      "See [`realization`](../../realizations/current-system.md) for the realized system.",
    );
    const bundle = YAML.parse(
      await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"),
    );
    const task = bundle.non_records.find((item: any) => item.kind === "task");
    expect(task.document.legacy_lock).toBeUndefined();
    expect(task.document.digest.value).toBe(sha256(await readFile(taskPath)));
    const second = run("linkify", project, ["--checker", checker]);
    expect(second.status, second.stderr).toBe(0);
    expect(second.json).toMatchObject({ changed: 0, repinned_documents: 0 });
  });

  it("transitions a native Task through YAML state without moving or rewriting its source", async () => {
    const project = await copyFixture();
    await authorTaskResult(
      project,
      "## Completion Result",
      "The fixture work completed with all criteria satisfied.",
    );
    const source = path.join(project, "knowledge/tasks/active/task.md");
    const sourceBytes = await readFile(source);
    const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");

    const result = run("task", project, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json).toMatchObject({
      state: "transitioned",
      task: "TEST-001",
      prior_task_status: "active",
      task_status: "completed",
      generated_navigation: 4,
    });
    expect(result.json.changed_subjects).toEqual([
      ".nourd/knowledge/bundle.yaml",
      "knowledge/tasks/by-state/active.md",
      "knowledge/tasks/by-state/cancelled.md",
      "knowledge/tasks/by-state/completed.md",
      "knowledge/tasks/by-state/deferred.md",
    ]);
    expect(await readFile(source)).toEqual(sourceBytes);
    await expect(lstat(path.join(project, "knowledge/tasks/completed/task.md"))).rejects.toThrow();
    expect(await taskState(project)).toBe("completed");
    expect(await readFile(path.join(project, "knowledge/tasks/by-state/active.md"), "utf8")).not.toContain("TEST-001");
    expect(await readFile(path.join(project, "knowledge/tasks/by-state/completed.md"), "utf8")).toContain("[TEST-001](../active/task.md)");
    void bundlePath;

    const current = run("task", project, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(current.status, current.stderr).toBe(0);
    expect(current.json).toEqual({
      state: "current",
      task: "TEST-001",
      prior_task_status: "completed",
      task_status: "completed",
      generated_navigation: 0,
      changed_subjects: [],
    });
  });

  it("requires the authored Completion Result and rejects --result-file", async () => {
    const missingResult = await copyFixture();
    const blocked = run("task", missingResult, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(blocked.status).toBe(1);
    expect(blocked.stderr).toContain("## Completion Result");

    const rejectedFlag = await copyFixture();
    await authorTaskResult(
      rejectedFlag,
      "## Completion Result",
      "The fixture work completed with all criteria satisfied.",
    );
    const resultFile = path.join(rejectedFlag, "..", "result.md");
    await writeFile(resultFile, "External result text.\n");
    const rejected = run("task", rejectedFlag, [
      "--task", "TEST-001", "--to", "close", "--result-file", resultFile, "--checker", checker,
    ]);
    expect(rejected.status).toBe(1);
    expect(rejected.stderr).toContain("do not accept --result-file");
  });

  it("blocks closing when the gate carries unexcepted findings", async () => {
    const project = await copyFixture();
    const task = path.join(project, "knowledge/tasks/active/task.md");
    await writeFile(task, (await readFile(task, "utf8")).replace(
      "No mandatory capability is implicated by this Task.",
      [
        "| Capability | Finding | Verification | Exception |",
        "| --- | --- | --- | --- |",
        "| Custom terrain | unsupported | none | none |",
      ].join("\n"),
    ).replace(
      "\n## Decision Applicability\n",
      "\n## Completion Result\n\nCompletion attempted despite the unexcepted finding.\n\n## Decision Applicability\n",
    ));
    run("repin", project, ["--checker", checker]);
    const result = run("task", project, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("gate blocks completion");
    expect(await taskState(project)).toBe("active");
  });

  it("defers and reactivates a task", async () => {
    const project = await copyFixture();
    const deferred = run("task", project, ["--task", "TEST-001", "--to", "defer", "--checker", checker]);
    expect(deferred.status, deferred.stderr).toBe(0);
    expect(await taskState(project)).toBe("deferred");
    const activated = run("task", project, ["--task", "TEST-001", "--to", "activate", "--checker", checker]);
    expect(activated.status, activated.stderr).toBe(0);
    expect(await taskState(project)).toBe("active");
  });

  it("cancels a task with a recorded rationale and no completion gate", async () => {
    const project = await copyFixture();
    const task = path.join(project, "knowledge/tasks/active/task.md");
    await writeFile(task, (await readFile(task, "utf8")).replace(
      "No mandatory capability is implicated by this Task.",
      [
        "| Capability | Finding | Verification | Exception |",
        "| --- | --- | --- | --- |",
        "| Custom terrain | unsupported | none | none |",
      ].join("\n"),
    ));
    run("repin", project, ["--checker", checker]);
    const noRationale = run("task", project, ["--task", "TEST-001", "--to", "cancel", "--checker", checker]);
    expect(noRationale.status).toBe(1);
    expect(noRationale.stderr).toContain("## Cancellation Result");
    await authorTaskResult(
      project,
      "## Cancellation Result",
      "Cancelled: the capability is unsupported and the work will not be done.",
    );
    const result = run("task", project, ["--task", "TEST-001", "--to", "cancel", "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(await taskState(project)).toBe("cancelled");
    const terminal = run("task", project, ["--task", "TEST-001", "--to", "activate", "--checker", checker]);
    expect(terminal.status).toBe(1);
    expect(terminal.stderr).toContain("terminal");
  });
});
