import {
  mkdir,
  lstat,
  readFile,
  rename,
  symlink,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import {
  ProjectNotInitializedError,
  validateProject,
} from "../src/checker/checker.js";
import { sha256 } from "../src/checker/util.js";
import { copyValidFixture, options } from "./helpers.js";

async function readBundle(project: string): Promise<Record<string, any>> {
  return YAML.parse(
    await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"),
  );
}

async function writeBundle(
  project: string,
  bundle: Record<string, any>,
): Promise<void> {
  await writeFile(
    path.join(project, ".nourd/knowledge/bundle.yaml"),
    YAML.stringify(bundle),
    "utf8",
  );
}

async function readRecord(project: string): Promise<Record<string, any>> {
  return YAML.parse(
    await readFile(
      path.join(project, ".nourd/knowledge/records/product.yaml"),
      "utf8",
    ),
  );
}

async function writeRecord(
  project: string,
  record: Record<string, any>,
  file = "product.yaml",
): Promise<void> {
  await writeFile(
    path.join(project, ".nourd/knowledge/records", file),
    YAML.stringify(record),
    "utf8",
  );
}

async function writeSource(
  project: string,
  source: string,
  mutateRecord: (record: Record<string, any>) => void = () => undefined,
): Promise<void> {
  await writeFile(path.join(project, "knowledge/product.md"), source, "utf8");
  const record = await readRecord(project);
  record.source.digest.value = sha256(Buffer.from(source, "utf8"));
  mutateRecord(record);
  await writeRecord(project, record);
}

async function rules(project: string): Promise<string[]> {
  return (await validateProject(options(project))).diagnostics.map(
    (diagnostic) => diagnostic.rule_id,
  );
}

describe("project and representation boundary", () => {
  it("fails before validation when project-root .nourd is absent without creating it", async () => {
    const project = await copyValidFixture();
    await rename(path.join(project, ".nourd"), path.join(project, ".nourd-away"));

    await expect(
      validateProject(options(project, { persist: true })),
    ).rejects.toBeInstanceOf(ProjectNotInitializedError);
    await expect(lstat(path.join(project, ".nourd"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    await expect(
      lstat(path.join(project, ".nourd-away/validation-result.json")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("fails before validation when project-root .nourd is not a directory", async () => {
    const project = await copyValidFixture();
    await rename(path.join(project, ".nourd"), path.join(project, ".nourd-away"));
    await writeFile(path.join(project, ".nourd"), "not a directory", "utf8");

    await expect(validateProject(options(project))).rejects.toMatchObject({
      name: "ProjectNotInitializedError",
      code: "NKF_PROJECT_NOT_INITIALIZED",
    });
  });

  it("fails before validation when project-root .nourd resolves outside the project", async () => {
    const project = await copyValidFixture();
    const outside = path.join(path.dirname(project), "outside-nourd");
    await rename(path.join(project, ".nourd"), outside);
    await symlink(outside, path.join(project, ".nourd"));

    await expect(validateProject(options(project))).rejects.toBeInstanceOf(
      ProjectNotInitializedError,
    );
    await expect(
      lstat(path.join(outside, "validation-result.json")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("allows a contained .nourd symlink and applies the project warning", async () => {
    const project = await copyValidFixture();
    await rename(path.join(project, ".nourd"), path.join(project, "nourd-control"));
    await symlink("nourd-control", path.join(project, ".nourd"));

    const result = await validateProject(options(project));
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rule_id: "path.symlink.discouraged",
          artifact: ".nourd",
        }),
      ]),
    );
  });

  it("reports a missing manifest and leaves later phases unevaluated", async () => {
    const project = await copyValidFixture();
    await unlink(path.join(project, ".nourd/knowledge/bundle.yaml"));
    const result = await validateProject(options(project));
    expect(result.diagnostics.map((diagnostic) => diagnostic.rule_id)).toContain(
      "bundle.manifest.missing",
    );
    expect(result.phases.find((phase) => phase.id === "project")?.state).toBe(
      "not-evaluated",
    );
  });

  it("reports missing and invalid declaration directories", async () => {
    const missingProject = await copyValidFixture();
    await rename(
      path.join(missingProject, ".nourd/knowledge/records"),
      path.join(missingProject, ".nourd/knowledge/records-away"),
    );
    expect(await rules(missingProject)).toContain(
      "project.records-directory.missing",
    );

    const invalidProject = await copyValidFixture();
    await rename(
      path.join(invalidProject, ".nourd/knowledge/records"),
      path.join(invalidProject, ".nourd/knowledge/records-away"),
    );
    await writeFile(
      path.join(invalidProject, ".nourd/knowledge/records"),
      "not a directory",
      "utf8",
    );
    expect(await rules(invalidProject)).toContain(
      "project.records-directory.invalid",
    );
  });

  it("fails closed on invalid local bundle and record schema shapes", async () => {
    const bundleProject = await copyValidFixture();
    const bundle = await readBundle(bundleProject);
    bundle.unknown = true;
    await writeBundle(bundleProject, bundle);
    expect(await rules(bundleProject)).toContain("schema.bundle.invalid");

    const recordProject = await copyValidFixture();
    const record = await readRecord(recordProject);
    record.unknown = true;
    await writeRecord(recordProject, record);
    expect(await rules(recordProject)).toContain("schema.record.invalid");
  });

  it("reports invalid, missing, outside-project, and inside-.nourd knowledge roots", async () => {
    const invalidProject = await copyValidFixture();
    const invalidBundle = await readBundle(invalidProject);
    invalidBundle.knowledge_root = "../knowledge";
    await writeBundle(invalidProject, invalidBundle);
    expect(await rules(invalidProject)).toContain("knowledge.root.invalid");

    const missingProject = await copyValidFixture();
    const missingBundle = await readBundle(missingProject);
    missingBundle.knowledge_root = "missing";
    await writeBundle(missingProject, missingBundle);
    expect(await rules(missingProject)).toContain("knowledge.root.missing");

    const outsideProject = await copyValidFixture();
    const outsideRoot = path.resolve(outsideProject, "../outside-knowledge");
    await mkdir(outsideRoot);
    await rename(
      path.join(outsideProject, "knowledge/product.md"),
      path.join(outsideRoot, "product.md"),
    );
    await rename(
      path.join(outsideProject, "knowledge/README.md"),
      path.join(outsideRoot, "README.md"),
    );
    await rename(
      path.join(outsideProject, "knowledge"),
      path.join(outsideProject, "knowledge-original"),
    );
    await symlink("../outside-knowledge", path.join(outsideProject, "knowledge"));
    expect(await rules(outsideProject)).toEqual(
      expect.arrayContaining([
        "knowledge.root.outside-project",
        "path.outside-root",
        "path.symlink.invalid",
      ]),
    );

    const insideProject = await copyValidFixture();
    const insideBundle = await readBundle(insideProject);
    insideBundle.knowledge_root = ".nourd/knowledge";
    await writeBundle(insideProject, insideBundle);
    expect(await rules(insideProject)).toContain("knowledge.root.inside-nourd");
  });

  it("checks unsafe, discouraged, and wrong-kind represented paths", async () => {
    const escapingProject = await copyValidFixture();
    await writeFile(
      path.resolve(escapingProject, "outside.md"),
      "# Outside\n",
      "utf8",
    );
    await symlink(
      "../outside.md",
      path.join(escapingProject, "knowledge/escape.md"),
    );
    const escapingBundle = await readBundle(escapingProject);
    escapingBundle.non_records.push({ path: "escape.md", kind: "navigation" });
    await writeBundle(escapingProject, escapingBundle);
    expect(await rules(escapingProject)).toEqual(
      expect.arrayContaining(["path.outside-root", "path.symlink.invalid"]),
    );

    const containedProject = await copyValidFixture();
    await rename(
      path.join(containedProject, "knowledge/README.md"),
      path.join(containedProject, "knowledge/NAVIGATION.md"),
    );
    await symlink("NAVIGATION.md", path.join(containedProject, "knowledge/README.md"));
    expect(await rules(containedProject)).toContain("path.symlink.discouraged");

    const wrongKindProject = await copyValidFixture();
    await mkdir(path.join(wrongKindProject, "knowledge/directory.md"));
    const wrongKindBundle = await readBundle(wrongKindProject);
    wrongKindBundle.non_records.push({
      path: "directory.md",
      kind: "navigation",
    });
    await writeBundle(wrongKindProject, wrongKindBundle);
    expect(await rules(wrongKindProject)).toContain("path.file-kind.invalid");
  });

  it("checks declaration entries, identity uniqueness, and filename convention", async () => {
    const nonYamlProject = await copyValidFixture();
    await writeFile(
      path.join(nonYamlProject, ".nourd/knowledge/records/note.txt"),
      "not yaml",
      "utf8",
    );
    expect(await rules(nonYamlProject)).toContain("record.declaration.non-yaml");

    const duplicateProject = await copyValidFixture();
    const duplicateRecord = await readRecord(duplicateProject);
    await writeRecord(duplicateProject, duplicateRecord, "duplicate.yaml");
    expect(await rules(duplicateProject)).toEqual(
      expect.arrayContaining([
        "record.id.duplicate",
        "knowledge.markdown.unrepresented",
      ]),
    );

    const filenameProject = await copyValidFixture();
    await rename(
      path.join(filenameProject, ".nourd/knowledge/records/product.yaml"),
      path.join(filenameProject, ".nourd/knowledge/records/other.yaml"),
    );
    expect(await rules(filenameProject)).toContain(
      "record.filename.nonconventional",
    );
  });

  it("checks source path validity, suffix, existence, and uniqueness", async () => {
    const invalidProject = await copyValidFixture();
    const invalidRecord = await readRecord(invalidProject);
    invalidRecord.source.path = "../product.md";
    await writeRecord(invalidProject, invalidRecord);
    expect(await rules(invalidProject)).toContain("path.invalid");

    const nonMarkdownProject = await copyValidFixture();
    const nonMarkdownRecord = await readRecord(nonMarkdownProject);
    nonMarkdownRecord.source.path = "product.txt";
    await writeRecord(nonMarkdownProject, nonMarkdownRecord);
    expect(await rules(nonMarkdownProject)).toEqual(
      expect.arrayContaining([
        "record.source.non-markdown",
        "record.source.missing",
      ]),
    );

    const duplicateProject = await copyValidFixture();
    const duplicateRecord = await readRecord(duplicateProject);
    duplicateRecord.id = "other";
    await writeRecord(duplicateProject, duplicateRecord, "other.yaml");
    expect(await rules(duplicateProject)).toEqual(
      expect.arrayContaining([
        "record.source.duplicate",
        "knowledge.markdown.multiple-representations",
      ]),
    );
  });

  it("checks complete Markdown and non-record representation", async () => {
    const unrepresentedProject = await copyValidFixture();
    await writeFile(
      path.join(unrepresentedProject, "knowledge/extra.md"),
      "# Extra\n",
      "utf8",
    );
    expect(await rules(unrepresentedProject)).toContain(
      "knowledge.markdown.unrepresented",
    );

    const missingProject = await copyValidFixture();
    const missingBundle = await readBundle(missingProject);
    missingBundle.non_records.push({
      path: "missing.md",
      kind: "navigation",
    });
    await writeBundle(missingProject, missingBundle);
    expect(await rules(missingProject)).toContain("non-record.missing");

    const duplicateProject = await copyValidFixture();
    const duplicateBundle = await readBundle(duplicateProject);
    duplicateBundle.non_records.push({
      path: "README.md",
      kind: "other",
      reason: "A second classification",
    });
    await writeBundle(duplicateProject, duplicateBundle);
    expect(await rules(duplicateProject)).toEqual(
      expect.arrayContaining([
        "non-record.duplicate",
        "knowledge.markdown.multiple-representations",
      ]),
    );

    const conflictProject = await copyValidFixture();
    const conflictBundle = await readBundle(conflictProject);
    conflictBundle.non_records.push({
      path: "product.md",
      kind: "other",
      reason: "Conflicting classification",
    });
    await writeBundle(conflictProject, conflictBundle);
    expect(await rules(conflictProject)).toEqual(
      expect.arrayContaining([
        "non-record.conflict",
        "knowledge.markdown.multiple-representations",
      ]),
    );
  });

  it("rejects a project canonical term that conflicts with NKF", async () => {
    const project = await copyValidFixture();
    const bundle = await readBundle(project);
    bundle.canonical_terms = ["Nkf"];
    await writeBundle(project, bundle);
    expect(await rules(project)).toContain("canonical-term.core-conflict");
  });
});

describe("Markdown source boundary", () => {
  it("checks H1 count, title equality, and Title Case", async () => {
    const countProject = await copyValidFixture();
    const countSource = await readFile(
      path.join(countProject, "knowledge/product.md"),
      "utf8",
    );
    await writeSource(countProject, `${countSource}\n# Second Title\n`);
    expect(await rules(countProject)).toContain("record.h1-count.invalid");

    const mismatchProject = await copyValidFixture();
    const mismatchSource = (
      await readFile(path.join(mismatchProject, "knowledge/product.md"), "utf8")
    ).replace("# Example Product", "# Different Product");
    await writeSource(mismatchProject, mismatchSource);
    expect(await rules(mismatchProject)).toContain("record.title.mismatch");

    const caseProject = await copyValidFixture();
    const caseSource = (
      await readFile(path.join(caseProject, "knowledge/product.md"), "utf8")
    ).replace("# Example Product", "# Example product");
    await writeSource(caseProject, caseSource, (record) => {
      record.title = "Example product";
    });
    expect(await rules(caseProject)).toContain("record.title.case-invalid");
  });

  it("checks section resolution, duplicate mapping, and complete coverage", async () => {
    const unresolvedProject = await copyValidFixture();
    const unresolvedRecord = await readRecord(unresolvedProject);
    unresolvedRecord.sections[0].heading_path = ["Missing"];
    await writeRecord(unresolvedProject, unresolvedRecord);
    expect(await rules(unresolvedProject)).toContain("section.heading.unresolved");

    const duplicateProject = await copyValidFixture();
    const duplicateRecord = await readRecord(duplicateProject);
    duplicateRecord.sections.push({
      id: "duplicate-map",
      heading_path: ["Product Definition"],
      occurrence: 1,
      authority: "proposal",
      role: "content",
    });
    await writeRecord(duplicateProject, duplicateRecord);
    expect(await rules(duplicateProject)).toContain(
      "section.heading.duplicate-mapping",
    );

    const unrepresentedProject = await copyValidFixture();
    const source = await readFile(
      path.join(unrepresentedProject, "knowledge/product.md"),
      "utf8",
    );
    await writeSource(
      unrepresentedProject,
      `${source}\n## Additional Context\n\nAdditional meaning.\n`,
    );
    expect(await rules(unrepresentedProject)).toContain(
      "section.heading.unrepresented",
    );
  });

  it("checks section hierarchy and Title Case", async () => {
    const hierarchyProject = await copyValidFixture();
    const hierarchySource = await readFile(
      path.join(hierarchyProject, "knowledge/product.md"),
      "utf8",
    );
    await writeSource(
      hierarchyProject,
      hierarchySource.replace(
        "## Product Definition",
        "#### Premature Detail\n\nDetail.\n\n## Product Definition",
      ),
    );
    expect(await rules(hierarchyProject)).toContain(
      "section.heading.hierarchy-invalid",
    );

    const caseProject = await copyValidFixture();
    const caseSource = (
      await readFile(path.join(caseProject, "knowledge/product.md"), "utf8")
    ).replace("## Product Definition", "## Product definition");
    await writeSource(caseProject, caseSource, (record) => {
      record.sections[0].heading_path = ["Product definition"];
    });
    expect(await rules(caseProject)).toContain("section.heading.case-invalid");
  });

  it("blocks a high-confidence secret pattern in governed Markdown", async () => {
    const project = await copyValidFixture();
    const source = await readFile(
      path.join(project, "knowledge/product.md"),
      "utf8",
    );
    await writeSource(
      project,
      `${source}\nToken: ghp_${"A".repeat(36)}\n`,
    );
    expect(await rules(project)).toContain("security.secret-pattern");
  });
});
