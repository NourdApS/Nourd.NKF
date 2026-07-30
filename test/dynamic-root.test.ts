import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import { sha256 } from "../src/checker/util.js";
import { copyValidFixture, copyValidTechnologyFixture, options } from "./helpers.js";

async function readBundle(project: string): Promise<Record<string, any>> {
  return YAML.parse(await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"));
}

async function writeBundle(project: string, bundle: Record<string, any>): Promise<void> {
  await writeFile(path.join(project, ".nourd/knowledge/bundle.yaml"), YAML.stringify(bundle), "utf8");
}

async function rules(project: string): Promise<string[]> {
  return (await validateProject(options(project))).diagnostics.map((diagnostic) => diagnostic.rule_id);
}

describe("dynamic Product and Technology roots", () => {
  it("validates a Technology bundle and includes governed artifact bytes in its snapshot", async () => {
    const project = await copyValidTechnologyFixture();
    const first = await validateProject(options(project));
    expect(first.conformance).toBe("passed");
    expect(first.profile).toEqual({
      identity: "nkf.profile.technology",
      binding: "verified",
    });
    await writeFile(path.join(project, "src/example.ts"), "export const value = 2;\n", "utf8");
    const second = await validateProject(options(project));
    expect(second.validated_snapshot.value).not.toBe(first.validated_snapshot.value);
    expect(second.diagnostics.map((diagnostic) => diagnostic.rule_id)).toContain(
      "artifact.digest-mismatch",
    );
  });

  it("fails closed for unknown and non-selectable Common profile identities", async () => {
    const unknown = await copyValidFixture();
    const unknownBundle = await readBundle(unknown);
    unknownBundle.root.profile = "nkf.profile.unknown";
    await writeBundle(unknown, unknownBundle);
    expect(await rules(unknown)).toContain("profile.unsupported");

    const common = await copyValidFixture();
    const commonBundle = await readBundle(common);
    commonBundle.root.profile = "nkf.common";
    await writeBundle(common, commonBundle);
    expect(await rules(common)).toContain("profile.common.not-selectable");
  });

  it("rejects profile-incompatible records and a Technology bundle without a Specification", async () => {
    const incompatible = await copyValidTechnologyFixture();
    const specificationFile = path.join(
      incompatible,
      ".nourd/knowledge/records/specification.yaml",
    );
    const specification = YAML.parse(await readFile(specificationFile, "utf8"));
    specification.type = "product";
    specification.body_contract = "nkf.product";
    const specificationSourceFile = path.join(incompatible, "knowledge/specification.md");
    const specificationSource = (await readFile(specificationSourceFile, "utf8"))
      .replace("type: specification", "type: product")
      .replace("task: TEST-TECH-001\n", "");
    await writeFile(specificationSourceFile, specificationSource, "utf8");
    specification.source.digest.value = sha256(Buffer.from(specificationSource, "utf8"));
    await writeFile(specificationFile, YAML.stringify(specification), "utf8");
    expect(await rules(incompatible)).toContain("profile.record.unsupported");

    const missing = await copyValidTechnologyFixture();
    await unlink(path.join(missing, ".nourd/knowledge/records/specification.yaml"));
    const missingBundle = await readBundle(missing);
    missingBundle.non_records.push({ path: "specification.md", kind: "other", reason: "Negative profile fixture" });
    const missingSourceFile = path.join(missing, "knowledge/specification.md");
    const missingSource = (await readFile(missingSourceFile, "utf8"))
      .replace(/^id:.*\n/m, "")
      .replace(/^type:.*\n/m, "")
      .replace(/^record_lifecycle:.*\n/m, "")
      .replace(/^record_status:.*\n/m, "")
      .replace(/^task:.*\n/m, "");
    await writeFile(missingSourceFile, missingSource, "utf8");
    await writeBundle(missing, missingBundle);
    expect(await rules(missing)).toContain("profile.specification.missing");
  });

  it("checks governed artifact identity and path uniqueness", async () => {
    const project = await copyValidTechnologyFixture();
    const bundle = await readBundle(project);
    bundle.governed_artifacts.push(JSON.parse(JSON.stringify(bundle.governed_artifacts[0])));
    await writeBundle(project, bundle);
    expect(await rules(project)).toEqual(
      expect.arrayContaining(["artifact.id.duplicate", "artifact.path.duplicate"]),
    );
  });

  it("checks governed artifact path safety, existence, and file kind", async () => {
    const invalid = await copyValidTechnologyFixture();
    const invalidBundle = await readBundle(invalid);
    invalidBundle.governed_artifacts[0].path = "../outside.ts";
    await writeBundle(invalid, invalidBundle);
    expect(await rules(invalid)).toContain("artifact.path.invalid");

    const missing = await copyValidTechnologyFixture();
    const missingBundle = await readBundle(missing);
    missingBundle.governed_artifacts[0].path = "src/missing.ts";
    await writeBundle(missing, missingBundle);
    expect(await rules(missing)).toContain("artifact.missing");

    const wrongKind = await copyValidTechnologyFixture();
    const wrongKindBundle = await readBundle(wrongKind);
    wrongKindBundle.governed_artifacts[0].path = "src";
    await writeBundle(wrongKind, wrongKindBundle);
    expect(await rules(wrongKind)).toContain("artifact.file-kind.invalid");
  });

  it("forbids governed artifacts in a Product bundle", async () => {
    const product = await copyValidFixture();
    const bundle = await readBundle(product);
    bundle.governed_artifacts = [{
      id: "product-source",
      kind: "checker-source",
      path: "knowledge/product.md",
      digest: { algorithm: "sha-256", value: "c3cbc0a72d0c730e27488a1137261f3f41d907b3cd1a0aa9b2a9c1e4ebe7e286" },
      record: "product",
      source_section: "product-definition",
    }];
    await writeBundle(product, bundle);
    expect(await rules(product)).toContain("artifact.profile.unsupported");
  });

  it("binds each governed artifact to a Realization and exact source section", async () => {
    const unresolved = await copyValidTechnologyFixture();
    const unresolvedBundle = await readBundle(unresolved);
    unresolvedBundle.governed_artifacts[0].record = "missing";
    await writeBundle(unresolved, unresolvedBundle);
    expect(await rules(unresolved)).toContain("artifact.record.unresolved");

    const invalid = await copyValidTechnologyFixture();
    const invalidBundle = await readBundle(invalid);
    invalidBundle.governed_artifacts[0].record = "technology";
    invalidBundle.governed_artifacts[0].source_section = "technology-map";
    await writeBundle(invalid, invalidBundle);
    expect(await rules(invalid)).toContain("artifact.record.invalid");

    const section = await copyValidTechnologyFixture();
    const sectionBundle = await readBundle(section);
    sectionBundle.governed_artifacts[0].source_section = "missing";
    await writeBundle(section, sectionBundle);
    expect(await rules(section)).toContain("artifact.section.unresolved");
  });

  it("requires accepted Specifications to be immutable", async () => {
    const project = await copyValidTechnologyFixture();
    const specificationFile = path.join(
      project,
      ".nourd/knowledge/records/specification.yaml",
    );
    const specification = YAML.parse(await readFile(specificationFile, "utf8"));
    specification.governance.lifecycle = "living";
    const sourceFile = path.join(project, "knowledge/specification.md");
    const source = (await readFile(sourceFile, "utf8")).replace(
      "record_lifecycle: immutable",
      "record_lifecycle: living",
    );
    await writeFile(sourceFile, source, "utf8");
    specification.source.digest.value = sha256(Buffer.from(source, "utf8"));
    await writeFile(specificationFile, YAML.stringify(specification), "utf8");
    expect(await rules(project)).toContain("governance.specification.lifecycle");
  });
});
