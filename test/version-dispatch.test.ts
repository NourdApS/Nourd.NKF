import { cp, mkdir, mkdtemp, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import { options, repositoryRoot } from "./helpers.js";

const fixture = path.join(repositoryRoot, "fixtures/valid/minimal-0-2");
const taskPath = "knowledge/tasks/active/task.md";

async function copyFixture(): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-0-2-test-"));
  const project = path.join(parent, "project");
  await cp(fixture, project, { recursive: true });
  return project;
}

async function edit(project: string, relative: string, change: (text: string) => string): Promise<void> {
  const file = path.join(project, relative);
  await writeFile(file, change(await readFile(file, "utf8")));
}

function ruleIds(diagnostics: { rule_id: string }[]): string[] {
  return [...new Set(diagnostics.map((diagnostic) => diagnostic.rule_id))];
}

describe("NKF 0.2 version dispatch", () => {
  it("validates the complete 0.2 fixture through the 0.1 contract root", async () => {
    const project = await copyFixture();
    const result = await validateProject(options(project));
    expect(result.nkf_version).toBe("0.2");
    expect(result.diagnostics).toEqual([]);
    expect(result.conformance).toBe("passed");
  });

  it("fails closed for an unsupported declared version", async () => {
    const project = await copyFixture();
    await edit(project, ".nourd/knowledge/bundle.yaml", (text) =>
      text.replace('nkf_version: "0.2"', 'nkf_version: "0.3"'),
    );
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(ruleIds(result.diagnostics)).toContain("contract-set.unavailable");
  });

  it("requires the gate section on 0.2 tasks", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) => text.split("\n## Decision Applicability")[0] ?? text);
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("task.applicability.missing");
  });

  it("blocks completion with an unexcepted unsupported capability", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) =>
      text
        .replace("task_status: active", "task_status: completed")
        .replace(
          "No mandatory capability is implicated by this Task.",
          "| Capability | Finding | Verification | Exception |\n| --- | --- | --- | --- |\n| Custom terrain | unsupported | none | none |",
        ),
    );
    await rename(
      path.join(project, taskPath),
      path.join(project, "knowledge/tasks/completed/task.md"),
    );
    await edit(project, ".nourd/knowledge/bundle.yaml", (text) =>
      text.replace("tasks/active/task.md", "tasks/completed/task.md"),
    );
    await edit(project, "knowledge/tasks/active/README.md", (text) =>
      text.replace("- [Fixture Task](task.md)\n", ""),
    );
    await edit(project, "knowledge/tasks/completed/README.md", (text) =>
      `${text.trimEnd()}\n\n- [Fixture Task](task.md)\n`,
    );
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("task.applicability.completion.blocked");
  });

  it("rejects a frontmatter title key on 0.2 documents", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) =>
      text.replace("summary:", 'title: "TEST-001: Maintain Example Product Knowledge"\nsummary:'),
    );
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("markdown.frontmatter.key.unsupported");
  });

  it("accepts matching guidance markers and rejects mismatched ones", async () => {
    const project = await copyFixture();
    const guidance = path.join(project, ".claude/skills/nkf-authoring");
    await mkdir(guidance, { recursive: true });
    await writeFile(path.join(guidance, "SKILL.md"), "# NKF Authoring\n\nNKF Version: 0.2\n");
    const matching = await validateProject(options(project));
    expect(matching.diagnostics).toEqual([]);
    await writeFile(path.join(guidance, "SKILL.md"), "# NKF Authoring\n\nNKF Version: 0.1\n");
    const mismatched = await validateProject(options(project));
    expect(ruleIds(mismatched.diagnostics)).toContain("guidance.version.mismatch");
  });

  it("resolves and rejects related_tasks orientation references", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) =>
      text.replace("task_status: active", 'task_status: active\nowner: "Example ApS"\nrelated_tasks:\n  - TEST-404'),
    );
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("markdown.frontmatter.reference.unresolved");
  });
});
