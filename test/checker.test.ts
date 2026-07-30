import { readFile, rename, symlink, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import { sha256 } from "../src/checker/util.js";
import { copyValidFixture, options } from "./helpers.js";

async function mutateRecord(
  project: string,
  mutate: (record: Record<string, any>) => void,
): Promise<void> {
  const file = path.join(project, ".nourd/knowledge/records/product.yaml");
  const record = YAML.parse(await readFile(file, "utf8"));
  mutate(record);
  await writeFile(file, YAML.stringify(record), "utf8");
}

async function acceptProductRecord(project: string): Promise<void> {
  const sourceFile = path.join(project, "knowledge/product.md");
  const source = (await readFile(sourceFile, "utf8")).replace(
    "record_status: draft",
    "record_status: accepted",
  );
  await writeFile(sourceFile, source, "utf8");
  await mutateRecord(project, (record) => {
    record.governance.status = "accepted";
    record.governance.accepted_at = "2026-07-30";
    record.source.digest.value = sha256(Buffer.from(source, "utf8"));
  });
}

describe("bundle-aware checker", () => {
  it("passes the canonical minimal fixture without claiming acceptance", async () => {
    const project = await copyValidFixture();
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics).toEqual([]);
    expect(result.records).toEqual([
      expect.objectContaining({
        record_id: "product",
        conformance: "passed",
        acceptance_binding: "not-applicable",
        governing_use: "not-ready",
      }),
    ]);
    expect(result.contract_artifacts.core.executable.binding).toBe("verified");
  });

  it("fails an exact source digest mismatch", async () => {
    const project = await copyValidFixture();
    await writeFile(path.join(project, "knowledge/product.md"), "\nChanged.\n", { flag: "a" });
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).toContain(
      "record.source.digest-mismatch",
    );
  });

  it("enforces Title Case after the source digest and section mapping agree", async () => {
    const project = await copyValidFixture();
    const sourceFile = path.join(project, "knowledge/product.md");
    const source = (await readFile(sourceFile, "utf8")).replace(
      "## Product Definition",
      "## Product definition",
    );
    await writeFile(sourceFile, source, "utf8");
    await mutateRecord(project, (record) => {
      record.source.digest.value = sha256(Buffer.from(source, "utf8"));
      record.sections[0].heading_path = ["Product definition"];
    });
    const result = await validateProject(options(project));
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).toContain(
      "section.heading.case-invalid",
    );
  });

  it("keeps a contained symlink readable but reports its portability warning", async () => {
    const project = await copyValidFixture();
    const source = path.join(project, "knowledge/product.md");
    const target = path.join(project, "knowledge/product-source.txt");
    await rename(source, target);
    await symlink("product-source.txt", source);
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).toContain(
      "path.symlink.discouraged",
    );
  });

  it("fails a required extension that cannot resolve through an artifact resolver", async () => {
    const project = await copyValidFixture();
    const bundleFile = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundleFile, "utf8"));
    bundle.extension_contracts = [{
      id: "com.example.feature",
      specification: { locator: "urn:example:spec", digest: { algorithm: "sha-256", value: "a".repeat(64) } },
      executable: { locator: "urn:example:contract", digest: { algorithm: "sha-256", value: "b".repeat(64) } },
    }];
    bundle.extensions = [{ contract: "com.example.feature", requirement: "required", payload: {} }];
    await writeFile(bundleFile, YAML.stringify(bundle), "utf8");
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).toContain(
      "extension.required.contract-unresolved",
    );
  });

  it("separates verified acceptance from conformance and declared status", async () => {
    const project = await copyValidFixture();
    await acceptProductRecord(project);
    const result = await validateProject(
      options(project, {
        request: {
          level: "full-bundle",
          record_id: null,
          acceptance_binding: "requested",
        },
        authorityResolver: {
          verify: async () => "verified",
        },
      }),
    );
    expect(result.conformance).toBe("passed");
    expect(result.records[0]).toMatchObject({
      acceptance_binding: "verified",
      governing_use: "ready",
    });
    expect(result.governing_use).toBe("ready");
  });

  it("reports an authority resolver failure as unavailable without changing conformance", async () => {
    const project = await copyValidFixture();
    await acceptProductRecord(project);
    const result = await validateProject(
      options(project, {
        request: {
          level: "full-bundle",
          record_id: null,
          acceptance_binding: "requested",
        },
        authorityResolver: {
          verify: async () => {
            throw new Error("resolver unavailable");
          },
        },
      }),
    );
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rule_id: "authority.binding.unavailable",
          blocking: "none",
        }),
      ]),
    );
    expect(result.records[0]).toMatchObject({
      acceptance_binding: "not-verified",
      governing_use: "not-evaluated",
    });
  });

  it("blocks governing use when authoritative acceptance is contradicted", async () => {
    const project = await copyValidFixture();
    await acceptProductRecord(project);
    const result = await validateProject(
      options(project, {
        request: {
          level: "full-bundle",
          record_id: null,
          acceptance_binding: "requested",
        },
        authorityResolver: {
          verify: async () => "contradicted",
        },
      }),
    );
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rule_id: "authority.binding.contradicted",
          blocking: "governing-use",
        }),
      ]),
    );
    expect(result.records[0]).toMatchObject({
      acceptance_binding: "contradicted",
      governing_use: "not-ready",
    });
  });

  it("keeps a Product-scoped Decision outside the structural part-of hierarchy", async () => {
    const project = await copyValidFixture();
    const source = [
      "---",
      "id: decision",
      "type: decision",
      'title: "Example Decision"',
      'summary: "Records the example Product decision used by the checker fixture."',
      "created_at: 2026-07-30T07:53:41Z",
      "record_lifecycle: living",
      "record_status: draft",
      "task: TEST-001",
      "---",
      "",
      "# Example Decision",
      "",
      "## Decision",
      "",
      "The Product uses the confirmed option within the stated scope.",
      "",
    ].join("\n");
    await writeFile(path.join(project, "knowledge/decision.md"), source, "utf8");
    await writeFile(
      path.join(project, ".nourd/knowledge/records/decision.yaml"),
      YAML.stringify({
        contract: "nkf.record",
        id: "decision",
        type: "decision",
        body_contract: "nkf.decision",
        title: "Example Decision",
        source: {
          path: "decision.md",
          digest: { algorithm: "sha-256", value: sha256(Buffer.from(source, "utf8")) },
        },
        governance: {
          lifecycle: "living",
          status: "draft",
          authority: ["human-product-owner"],
        },
        scope: { root: "product" },
        sections: [{
          id: "decision",
          heading_path: ["Decision"],
          occurrence: 1,
          authority: "proposal",
          role: "governing",
          responsibilities: [
            "context-and-problem",
            "decision",
            "scope-and-applicability",
            "rationale",
            "alternatives-considered",
            "consequences-and-trade-offs",
          ],
        }],
        relationships: [],
      }),
      "utf8",
    );

    const result = await validateProject(options(project));
    expect(result.conformance).toBe("passed");
    expect(result.records.map((record) => record.record_id)).toEqual(["decision", "product"]);
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).not.toContain(
      "hierarchy.root-unreachable",
    );
  });

  it("fails contract validation with a stable diagnostic for an unresolved target", async () => {
    const project = await copyValidFixture();
    const result = await validateProject(
      options(project, {
        request: {
          level: "contract",
          record_id: "missing-record",
          acceptance_binding: "not-requested",
        },
      }),
    );
    expect(result.conformance).toBe("failed");
    expect(result.records).toEqual([]);
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rule_id: "request.record.unresolved",
          phase: "bundle-graph",
          record_id: "missing-record",
        }),
      ]),
    );
    expect(result.phases.find((phase) => phase.id === "record-contract")?.state).toBe(
      "not-evaluated",
    );
  });

  it("fails invalid Markdown UTF-8 with a stable source diagnostic", async () => {
    const project = await copyValidFixture();
    const bytes = Buffer.from([0x23, 0x20, 0xc3, 0x28, 0x0a]);
    await writeFile(path.join(project, "knowledge/product.md"), bytes);
    await mutateRecord(project, (record) => {
      record.source.digest.value = sha256(bytes);
    });
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rule_id: "markdown.utf8.invalid",
          phase: "source",
          artifact: "knowledge/product.md",
          record_id: "product",
        }),
      ]),
    );
  });

  it("fails malformed Markdown front matter with a stable source diagnostic", async () => {
    const project = await copyValidFixture();
    const bytes = Buffer.from(
      "---\ncreated_at: [\n---\n# Product\n\n## Purpose\n\nA product.\n",
      "utf8",
    );
    await writeFile(path.join(project, "knowledge/product.md"), bytes);
    await mutateRecord(project, (record) => {
      record.source.digest.value = sha256(bytes);
    });
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rule_id: "markdown.frontmatter.invalid",
          phase: "source",
          artifact: "knowledge/product.md",
          record_id: "product",
        }),
      ]),
    );
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).not.toContain(
      "record.h1-count.invalid",
    );
  });

  it("requires governed frontmatter on Markdown non-records", async () => {
    const project = await copyValidFixture();
    await writeFile(
      path.join(project, "knowledge/README.md"),
      "# Navigation\n\nThe frontmatter is missing.\n",
      "utf8",
    );
    const result = await validateProject(options(project));
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rule_id: "markdown.frontmatter.required",
          artifact: "knowledge/README.md",
        }),
      ]),
    );
  });

  it("fails unsupported keys and record identity mismatches", async () => {
    const project = await copyValidFixture();
    const sourceFile = path.join(project, "knowledge/product.md");
    const source = (await readFile(sourceFile, "utf8"))
      .replace("id: product", "id: wrong")
      .replace("summary:", "unexpected: true\nsummary:");
    await writeFile(sourceFile, source, "utf8");
    await mutateRecord(project, (record) => {
      record.source.digest.value = sha256(Buffer.from(source, "utf8"));
    });
    const result = await validateProject(options(project));
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).toEqual(
      expect.arrayContaining([
        "markdown.frontmatter.key.unsupported",
        "markdown.frontmatter.record-mismatch",
      ]),
    );
  });

  it("validates required keys, scalar shape, UTC creation time, title equality, and H1 count", async () => {
    const missing = await copyValidFixture();
    const missingFile = path.join(missing, "knowledge/README.md");
    await writeFile(
      missingFile,
      (await readFile(missingFile, "utf8")).replace(
        'summary: "Provides navigation to the governed Example Product knowledge."\n',
        "",
      ),
      "utf8",
    );
    expect(
      (await validateProject(options(missing))).diagnostics.map((diagnostic) => diagnostic.rule_id),
    ).toContain("markdown.frontmatter.key.missing");

    const invalid = await copyValidFixture();
    const invalidFile = path.join(invalid, "knowledge/README.md");
    await writeFile(
      invalidFile,
      (await readFile(invalidFile, "utf8"))
        .replace('title: Navigation', 'title: "Wrong Navigation"')
        .replace(
          'summary: "Provides navigation to the governed Example Product knowledge."',
          'summary: " invalid orientation "',
        )
        .replace("2026-07-30T07:53:41Z", "2026-02-30T07:53:41Z"),
      "utf8",
    );
    const invalidRules = (await validateProject(options(invalid))).diagnostics.map(
      (diagnostic) => diagnostic.rule_id,
    );
    expect(invalidRules).toEqual(
      expect.arrayContaining([
        "markdown.frontmatter.value.invalid",
        "markdown.frontmatter.created-at.invalid",
        "markdown.frontmatter.title-mismatch",
      ]),
    );

    const h1 = await copyValidFixture();
    const h1File = path.join(h1, "knowledge/README.md");
    await writeFile(
      h1File,
      `${await readFile(h1File, "utf8")}\n# Second Navigation\n`,
      "utf8",
    );
    expect(
      (await validateProject(options(h1))).diagnostics.map((diagnostic) => diagnostic.rule_id),
    ).toContain("markdown.h1-count.invalid");
  });

  it("validates Task, Design, and Realization lifecycle frontmatter", async () => {
    const task = await copyValidFixture();
    const taskFile = path.join(task, "knowledge/task.md");
    await writeFile(
      taskFile,
      (await readFile(taskFile, "utf8")).replace("task_status: active", "task_status: unknown"),
      "utf8",
    );
    expect(
      (await validateProject(options(task))).diagnostics.map((diagnostic) => diagnostic.rule_id),
    ).toContain("markdown.frontmatter.task.invalid");

    const design = await copyValidFixture();
    const designSourceFile = path.join(design, "knowledge/product.md");
    const designSource = (await readFile(designSourceFile, "utf8"))
      .replace("type: product", "type: design")
      .replace(
        "record_status: draft",
        "record_status: draft\ntask: TEST-001\ndesign_disposition: adopted",
      );
    await writeFile(designSourceFile, designSource, "utf8");
    await mutateRecord(design, (record) => {
      record.type = "design";
      record.body_contract = "nkf.design";
      record.source.digest.value = sha256(Buffer.from(designSource, "utf8"));
    });
    expect(
      (await validateProject(options(design))).diagnostics.map((diagnostic) => diagnostic.rule_id),
    ).toContain("markdown.frontmatter.design.invalid");

    const realization = await copyValidFixture();
    const realizationSourceFile = path.join(realization, "knowledge/product.md");
    const realizationSource = (await readFile(realizationSourceFile, "utf8"))
      .replace("type: product", "type: realization")
      .replace(
        "record_status: draft",
        "record_status: draft\ntask: TEST-001\nconfirmation_status: confirmed",
      );
    await writeFile(realizationSourceFile, realizationSource, "utf8");
    await mutateRecord(realization, (record) => {
      record.type = "realization";
      record.body_contract = "nkf.realization";
      record.source.digest.value = sha256(Buffer.from(realizationSource, "utf8"));
    });
    expect(
      (await validateProject(options(realization))).diagnostics.map(
        (diagnostic) => diagnostic.rule_id,
      ),
    ).toContain("markdown.frontmatter.confirmation.invalid");
  });

  it("fails unresolved Task provenance", async () => {
    const project = await copyValidFixture();
    const source = [
      "---",
      "id: decision",
      "type: decision",
      'title: "Unresolved Task Decision"',
      'summary: "Records a Decision with deliberately unresolved Task provenance."',
      "created_at: 2026-07-30T07:53:41Z",
      "record_lifecycle: living",
      "record_status: draft",
      "task: MISSING-001",
      "---",
      "",
      "# Unresolved Task Decision",
      "",
      "## Decision",
      "",
      "The Decision exists only as a negative fixture.",
      "",
    ].join("\n");
    await writeFile(path.join(project, "knowledge/decision.md"), source, "utf8");
    await writeFile(
      path.join(project, ".nourd/knowledge/records/decision.yaml"),
      YAML.stringify({
        contract: "nkf.record",
        id: "decision",
        type: "decision",
        body_contract: "nkf.decision",
        title: "Unresolved Task Decision",
        source: {
          path: "decision.md",
          digest: { algorithm: "sha-256", value: sha256(Buffer.from(source, "utf8")) },
        },
        governance: {
          lifecycle: "living",
          status: "draft",
          authority: ["human-product-owner"],
        },
        scope: { root: "product" },
        sections: [{
          id: "decision",
          heading_path: ["Decision"],
          occurrence: 1,
          authority: "proposal",
          role: "governing",
          responsibilities: [
            "context-and-problem",
            "decision",
            "scope-and-applicability",
            "rationale",
            "alternatives-considered",
            "consequences-and-trade-offs",
          ],
        }],
        relationships: [],
      }),
      "utf8",
    );
    const result = await validateProject(options(project));
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).toContain(
      "markdown.frontmatter.reference.unresolved",
    );
  });

  it("preserves explicit Evidence non-records without requiring orientation fields", async () => {
    const project = await copyValidFixture();
    await writeFile(
      path.join(project, "knowledge/evidence.md"),
      "# Preserved Evidence\n\nExact historical bytes.\n",
      "utf8",
    );
    const bundleFile = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundleFile, "utf8"));
    bundle.non_records.push({ path: "evidence.md", kind: "evidence" });
    await writeFile(bundleFile, YAML.stringify(bundle), "utf8");
    const result = await validateProject(options(project));
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics).toEqual([]);
  });

  it("still enforces safe envelope syntax when an Evidence non-record starts with frontmatter", async () => {
    const project = await copyValidFixture();
    await writeFile(
      path.join(project, "knowledge/README.md"),
      "---\ntitle: Unclosed Evidence\n# Preserved Evidence\n",
      "utf8",
    );
    const bundleFile = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundleFile, "utf8"));
    bundle.non_records[0].kind = "evidence";
    await writeFile(bundleFile, YAML.stringify(bundle), "utf8");
    const result = await validateProject(options(project));
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rule_id: "markdown.frontmatter.invalid",
          artifact: "knowledge/README.md",
        }),
      ]),
    );
  });

  it("exempts an explicitly classified Evidence record from orientation fields", async () => {
    const project = await copyValidFixture();
    const sourceFile = path.join(project, "knowledge/product.md");
    const sourceWithEnvelope = await readFile(sourceFile, "utf8");
    const closing = sourceWithEnvelope.indexOf("\n---\n", 4);
    const source = sourceWithEnvelope.slice(closing + 5).replace(/^\n/, "");
    await writeFile(sourceFile, source, "utf8");
    await mutateRecord(project, (record) => {
      record.type = "evidence";
      record.body_contract = "nkf.evidence";
      record.source.digest.value = sha256(Buffer.from(source, "utf8"));
    });
    const result = await validateProject(options(project));
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).not.toContain(
      "markdown.frontmatter.required",
    );
  });

  it("rejects duplicate Task identities across explicit Task non-records", async () => {
    const project = await copyValidFixture();
    const source = [
      "---",
      'title: "Duplicate Task"',
      'summary: "Duplicates the fixture Task identity for a negative reference-graph check."',
      "created_at: 2026-07-30T07:53:41Z",
      "task_id: TEST-001",
      "task_status: active",
      "---",
      "",
      "# Duplicate Task",
      "",
      "Negative fixture.",
      "",
    ].join("\n");
    await writeFile(path.join(project, "knowledge/duplicate-task.md"), source, "utf8");
    const bundleFile = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundleFile, "utf8"));
    bundle.non_records.push({ path: "duplicate-task.md", kind: "task" });
    await writeFile(bundleFile, YAML.stringify(bundle), "utf8");
    const result = await validateProject(options(project));
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).toContain(
      "markdown.frontmatter.task.invalid",
    );
  });

  it("never reports a failing full bundle with no record results as ready", async () => {
    const project = await copyValidFixture();
    await unlink(path.join(project, ".nourd/knowledge/records/product.yaml"));
    const bundleFile = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundleFile, "utf8"));
    bundle.non_records.push({ path: "product.md", kind: "evidence" });
    await writeFile(bundleFile, YAML.stringify(bundle), "utf8");

    const result = await validateProject(options(project));
    expect(result.conformance).toBe("failed");
    expect(result.records).toEqual([]);
    expect(result.governing_use).toBe("not-ready");
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).toEqual(
      expect.arrayContaining(["bundle.root.missing", "bundle.root.invalid"]),
    );
  });
});
