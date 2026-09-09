import { cp, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import YAML from "yaml";
import { createHash } from "node:crypto";
import { validateProject } from "../src/checker/checker.js";
import { options, validFixture, validTechnologyFixture } from "./helpers.js";

const sha256 = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
const taskPath = "knowledge/tasks/items/task.md";

async function copyFixture(): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-0-81-dispatch-"));
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

describe("NKF 0.81 version dispatch", () => {
  it("validates the complete native 0.81 fixture", async () => {
    const project = await copyFixture();
    const result = await validateProject(options(project));
    expect(result.nkf_version).toBe("0.81");
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics).toEqual([]);
  });

  it("fails closed for an unsupported declared version", async () => {
    const project = await copyFixture();
    await edit(project, ".nourd/knowledge/bundle.yaml", (text) =>
      text.replace('nkf_version: "0.81"', 'nkf_version: "9.9"'),
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
      text.replace('nkf_version: "0.81"', 'nkf_version: "0.2"'),
    );
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(ruleIds(result.diagnostics)).toContain("contract-set.unavailable");
  });

  it("fails closed for a 0.6 declaration now that 0.6 left the window", async () => {
    // The 0.6 contract set was removed from the working tree, and the checker
    // registers exactly the {0.8, 0.81} window; 0.6 must fail closed as
    // unsupported.
    const project = await copyFixture();
    await edit(project, ".nourd/knowledge/bundle.yaml", (text) =>
      text.replace('nkf_version: "0.81"', 'nkf_version: "0.6"'),
    );
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(ruleIds(result.diagnostics)).toContain("contract-set.unavailable");
  });

  it("requires the gate section on 0.81 tasks", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) => text.split("\n## Decision Applicability")[0] ?? text);
    await repinTask(project);
    const result = await validateProject(options(project));
    expect(ruleIds(result.diagnostics)).toContain("task.applicability.missing");
  });

  it("blocks completion with an unexcepted unsupported capability", async () => {
    const project = await copyFixture();
    await edit(project, taskPath, (text) =>
      text.replace(
        "No mandatory capability is implicated by this Task.",
        [
          "| Capability | Finding | Verification | Exception |",
          "| --- | --- | --- | --- |",
          "| Custom terrain | unsupported | none | none |",
        ].join("\n"),
      ).replace(
        "\n## Decision Applicability\n",
        "\n## Completion Result\n\nCompletion attempted despite the unexcepted finding.\n\n## Decision Applicability\n",
      ),
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
      "# NKF Authoring Protocol\n\nNKF Version: 0.81\n",
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

  it("checks a guidance file's frontmatter self-description against the version it serves", async () => {
    // The exact NKF 0.71 defect: a description directing an agent to prepare a
    // predecessor's candidate under a marker declaring the current version.
    // It shipped inside the published archive because nothing checked prose.
    const stale = await copyFixture();
    await mkdir(path.join(stale, ".claude/skills/nkf-onboarding"), { recursive: true });
    await writeFile(
      path.join(stale, ".claude/skills/nkf-onboarding/SKILL.md"),
      "---\nname: nkf-onboarding\ndescription: prepare its NKF 0.7 candidate\n---\n\n# NKF Onboarding\n\nNKF Version: 0.81\n",
      "utf8",
    );
    const staleResult = await validateProject(options(stale));
    expect(ruleIds(staleResult.diagnostics)).toContain("guidance.self-description.version-mismatch");

    // A predecessor named in the body is deliberate — window tables and
    // stepping-stone chains do it — and the rule is silent there.
    const truthful = await copyFixture();
    await mkdir(path.join(truthful, ".claude/skills/nkf-onboarding"), { recursive: true });
    await writeFile(
      path.join(truthful, ".claude/skills/nkf-onboarding/SKILL.md"),
      "---\nname: nkf-onboarding\ndescription: prepare its NKF 0.81 candidate\n---\n\n# NKF Onboarding\n\nNKF Version: 0.81\n\nA NKF 0.8 repository steps through its published archive.\n",
      "utf8",
    );
    const truthfulResult = await validateProject(options(truthful));
    expect(ruleIds(truthfulResult.diagnostics)).not.toContain("guidance.self-description.version-mismatch");
  });

  it("recomputes a 0.81 delta claim closure with impact propagation", async () => {
    // The Technology fixture authors realization --realizes--> specification
    // and the policy propagates `realizes` target-to-source, so a changed
    // specification reaches the realization. A recorded closure that omits
    // the reached node is the exact 0.7-through-0.8 tooling defect ADR 0139
    // repairs: 0.81 recomputes the closure and refuses, naming the subject.
    const specification = { kind: "record", id: "specification" };
    const realization = { kind: "record", id: "realization" };
    const readiness = { purpose: "whole-root-readiness" as const, require_readiness: false };
    const sealDelta = async (project: string, closure: Record<string, string>[]) => {
      const file = path.join(project, ".nourd/knowledge/freshness/baseline.yaml");
      const baseline = YAML.parse(await readFile(file, "utf8"));
      baseline.confirmation.claim = "semantically-reviewed-delta";
      baseline.confirmation.computed_closure = closure;
      baseline.confirmation.performed_set = [specification, realization];
      for (const entry of baseline.applicability_coverage) {
        const performed = entry.node.kind === "record" && ["specification", "realization"].includes(entry.node.id);
        entry.provenance = performed
          ? { performed: true }
          : {
              carried: {
                performed_in_graph_revision: { algorithm: "sha-256", value: baseline.graph_revision.value },
                performing_reviewer: { kind: "agent", id: "fixture-reviewer" },
              },
            };
      }
      await writeFile(file, YAML.stringify(baseline, { lineWidth: 0, aliasDuplicateObjects: false }));
    };

    const omitted = path.join(await mkdtemp(path.join(os.tmpdir(), "nkf-0-81-closure-")), "project");
    await cp(validTechnologyFixture, omitted, { recursive: true });
    await sealDelta(omitted, [specification]);
    const omittedResult = await validateProject(options(omitted, {
      request: { level: "full-bundle", record_id: null, acceptance_binding: "not-requested", ...readiness },
    }));
    expect(omittedResult.conformance).toBe("failed");
    expect(ruleIds(omittedResult.diagnostics)).toContain("freshness.claim.computed-closure-not-reproduced");
    expect(omittedResult.diagnostics.find((item) => item.rule_id === "freshness.claim.computed-closure-not-reproduced")?.message)
      .toContain('"id":"realization"');

    const reproduced = path.join(await mkdtemp(path.join(os.tmpdir(), "nkf-0-81-closure-")), "project");
    await cp(validTechnologyFixture, reproduced, { recursive: true });
    await sealDelta(reproduced, [specification, realization]);
    const reproducedResult = await validateProject(options(reproduced, {
      request: { level: "full-bundle", record_id: null, acceptance_binding: "not-requested", ...readiness },
    }));
    expect(reproducedResult.conformance).toBe("passed");
    expect(ruleIds(reproducedResult.diagnostics)).not.toContain("freshness.claim.computed-closure-not-reproduced");
    expect((reproducedResult.readiness as { state?: string } | undefined)?.state).toBe("ready");
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
