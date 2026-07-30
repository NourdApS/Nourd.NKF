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
    await mutateRecord(project, (record) => {
      record.governance.status = "accepted";
      record.governance.accepted_at = "2026-07-30";
    });
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
    await mutateRecord(project, (record) => {
      record.governance.status = "accepted";
      record.governance.accepted_at = "2026-07-30";
    });
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
    await mutateRecord(project, (record) => {
      record.governance.status = "accepted";
      record.governance.accepted_at = "2026-07-30";
    });
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

  it("never reports a failing full bundle with no record results as ready", async () => {
    const project = await copyValidFixture();
    await unlink(path.join(project, ".nourd/knowledge/records/product.yaml"));
    const bundleFile = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundleFile, "utf8"));
    bundle.non_records.push({ path: "product.md", kind: "other", reason: "Test input" });
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
