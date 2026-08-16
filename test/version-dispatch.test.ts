import { cp, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import YAML from "yaml";
import { createHash } from "node:crypto";
import { validateProject } from "../src/checker/checker.js";
import { options, repositoryRoot, validFixture } from "./helpers.js";

const sha256 = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
const taskPath = "knowledge/tasks/active/task.md";

async function copyFixture(): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-0-7-dispatch-"));
  const project = path.join(parent, "project");
  await cp(validFixture, project, { recursive: true });
  return project;
}

async function edit(project: string, relative: string, change: (text: string) => string): Promise<void> {
  const file = path.join(project, relative);
  await writeFile(file, change(await readFile(file, "utf8")));
}

async function repinTask(project: string): Promise<void> {
  const bytes = await readFile(path.join(project, taskPath));
  const bundleFile = path.join(project, ".nourd/knowledge/bundle.yaml");
  const bundle = YAML.parse(await readFile(bundleFile, "utf8"));
  const entry = bundle.non_records.find((item: Record<string, any>) => item.kind === "task");
  entry.document.digest.value = sha256(bytes);
  await writeFile(bundleFile, YAML.stringify(bundle), "utf8");
}

function ruleIds(diagnostics: { rule_id: string }[]): string[] {
  return [...new Set(diagnostics.map((diagnostic) => diagnostic.rule_id))];
}

describe("NKF 0.7 version dispatch", () => {
  it("validates the complete native 0.7 fixture", async () => {
    const project = await copyFixture();
    const result = await validateProject(options(project));
    expect(result.nkf_version).toBe("0.7");
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics).toEqual([]);
  });

  it("fails closed for an unsupported declared version", async () => {
    const project = await copyFixture();
    await edit(project, ".nourd/knowledge/bundle.yaml", (text) =>
      text.replace('nkf_version: "0.7"', 'nkf_version: "9.9"'),
    );
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(ruleIds(result.diagnostics)).toContain("contract-set.unavailable");
  });

  it("fails closed for an out-of-window predecessor version", async () => {
    // Live support covers the current version plus one predecessor; older
    // repositories migrate through their own immutable published archives.
    const project = await copyFixture();
    await edit(project, ".nourd/knowledge/bundle.yaml", (text) =>
      text.replace('nkf_version: "0.7"', 'nkf_version: "0.2"'),
    );
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(ruleIds(result.diagnostics)).toContain("contract-set.unavailable");
  });

  it("requires the gate section on 0.7 tasks", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) => text.split("\n## Decision Applicability")[0] ?? text);
    await repinTask(project);
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("task.applicability.missing");
  });

  it("blocks completion with an unexcepted unsupported capability", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) =>
      text.replace("| proven | data-validity | none |", "| unsupported | none | none |"),
    );
    await repinTask(project);
    const bundleFile = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundleFile, "utf8"));
    const entry = bundle.non_records.find((item: Record<string, any>) => item.kind === "task");
    entry.document.state.value = "completed";
    await writeFile(bundleFile, YAML.stringify(bundle), "utf8");
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
  });

  it("requires the frontmatter title to equal the heading", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) => text.replace('title: "', 'title: "Changed '));
    await repinTask(project);
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("markdown.frontmatter.title-mismatch");
  });

  it("rejects restated identity bullets outside Evidence", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) => `${text}\n- **Task:** TEST-001\n`);
    await repinTask(project);
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("markdown.body.identity-duplication");
  });

  it("requires same-bundle references to be deep links", async () => {
    const project = await copyFixture();
    await edit(project, "knowledge/product.md", (text) => `${text}\nSee also plain TEST-001 mentioned here.\n`);
    const bytes = await readFile(path.join(project, "knowledge/product.md"));
    const declarationFile = path.join(project, ".nourd/knowledge/records/product.yaml");
    const declaration = YAML.parse(await readFile(declarationFile, "utf8"));
    declaration.source.digest.value = sha256(bytes);
    await writeFile(declarationFile, YAML.stringify(declaration), "utf8");
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("markdown.reference.deep-link.required");
  });

  it("accepts matching guidance markers and rejects mismatched ones", async () => {
    const matching = await copyFixture();
    await (await import("node:fs/promises")).mkdir(path.join(matching, "integrations/ai"), { recursive: true });
    await writeFile(
      path.join(matching, "integrations/ai/nkf-authoring-protocol.md"),
      "# NKF Authoring Protocol\n\nNKF Version: 0.7\n",
      "utf8",
    );
    const matchingResult = await validateProject(options(matching));
    expect(ruleIds(matchingResult.diagnostics)).not.toContain("guidance.version.mismatch");

    const mismatched = await copyFixture();
    await (await import("node:fs/promises")).mkdir(path.join(mismatched, "integrations/ai"), { recursive: true });
    await writeFile(
      path.join(mismatched, "integrations/ai/nkf-authoring-protocol.md"),
      "# NKF Authoring Protocol\n\nNKF Version: 0.4\n",
      "utf8",
    );
    const mismatchedResult = await validateProject(options(mismatched));
    expect(ruleIds(mismatchedResult.diagnostics)).toContain("guidance.version.mismatch");
  });

  it("resolves and rejects related_tasks orientation references", async () => {
    const project = await copyFixture();
    const bundleFile = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundleFile, "utf8"));
    const entry = bundle.non_records.find((item: Record<string, any>) => item.kind === "task");
    entry.document.related_tasks = ["MISSING-TASK"];
    await writeFile(bundleFile, YAML.stringify(bundle), "utf8");
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("markdown.frontmatter.reference.unresolved");
  });
});
