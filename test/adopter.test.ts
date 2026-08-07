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
import { build } from "esbuild";
// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
const {
  RELEASE_ENTRIES,
  constructReleaseManifest,
  createUstar,
  serializeReleaseManifest,
  sha256,
  releaseEntriesForVersion,
} = release;
import {
  repositoryRoot,
  validFixture,
  validTechnologyFixture,
} from "./helpers.js";

const adopter = path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs");
let archivePath: string;
let archiveSha256: string;
let predecessorAdopter: string;
let predecessorArchivePath: string;
let predecessorArchiveSha256: string;
let predecessor13Adopter: string;
let predecessor13ArchivePath: string;
let predecessor13ArchiveSha256: string;
let repairAdopter: string;
let repairArchivePath: string;
let repairArchiveSha256: string;

const validFixture0_2 = validFixture;
const validTechnologyFixture0_2 = validTechnologyFixture;

async function createProject(fixture = validFixture0_2) {
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
  return runWith(adopter, command, project, extra, env);
}

function runWith(
  executable: string,
  command: string,
  project: string,
  extra: string[] = [],
  env: NodeJS.ProcessEnv = {},
) {
  return spawnSync(
    process.execPath,
    [executable, command, "--project", project, ...extra],
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
  plan.assessment = {
    category: "tiny-knowledge-no-source-or-configuration",
    assessed_by: "test-agent",
    assessed_at: "2026-07-31T11:01:00Z",
    recommendation: "recommended",
    summary: "The complete test repository contains only the reviewed tiny knowledge set.",
    evidence: [{
      subject: "knowledge/",
      classification: "knowledge",
      finding: "Every Markdown file was read by the test assessment.",
    }],
    confirmation: {
      status: "confirmed",
      authority: "human-product-owner",
      confirmed_at: "2026-07-31T11:02:00Z",
      override: false,
      rationale: "The test authority confirms Category 2 for this exact snapshot.",
    },
  };
  for (const document of plan.documents) {
    document.representation = {
      kind: "non_record",
      non_record_kind: "navigation",
    };
  }
  await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
}

async function resolveEmptyAssessment(workspace: string) {
  const planPath = path.join(workspace, "plan.yaml");
  const plan = YAML.parse(await readFile(planPath, "utf8"));
  plan.assessment = {
    category: "empty-repository",
    assessed_by: "test-agent",
    assessed_at: "2026-07-31T11:01:00Z",
    recommendation: "recommended",
    summary: "The complete test repository is effectively empty.",
    evidence: [],
    confirmation: { status: "not-required" },
  };
  await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
}

function proposalSection(
  id: string,
  heading: string,
  role: string,
  responsibility = id,
) {
  return {
    id,
    heading_path: [heading],
    occurrence: 1,
    authority: "proposal",
    role,
    responsibilities: [responsibility],
  };
}

function draftDeclaration(options: {
  id: string;
  type: "product" | "specification";
  title: string;
  root: string;
  sections: ReturnType<typeof proposalSection>[];
}) {
  return {
    contract: "nkf.record",
    id: options.id,
    type: options.type,
    body_contract: `nkf.${options.type}`,
    title: options.title,
    governance: {
      lifecycle: "living",
      status: "draft",
      authority: ["human-product-owner"],
    },
    scope: { root: options.root },
    sections: options.sections,
    relationships: [],
  };
}

async function resolveCategory2Override(workspace: string, subject: string) {
  const planPath = path.join(workspace, "plan.yaml");
  const plan = YAML.parse(await readFile(planPath, "utf8"));
  plan.assessment = {
    category: "tiny-knowledge-no-source-or-configuration",
    assessed_by: "test-agent",
    assessed_at: "2026-07-31T11:01:00Z",
    recommendation: "not-recommended",
    summary: "The complete test repository contains material inconsistent with Category 2.",
    evidence: [{
      subject,
      classification: "configuration",
      finding: "The agent reports this material instead of classifying the repository automatically.",
    }],
    confirmation: {
      status: "confirmed",
      authority: "human-product-owner",
      confirmed_at: "2026-07-31T11:02:00Z",
      override: true,
      rationale: "The test authority deliberately directs Category 2 despite the agent recommendation.",
    },
  };
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

async function buildPredecessorRelease(
  predecessorCommit: string,
  expectedAdopterSha256: string | null,
) {
  const predecessorRoot = await mkdtemp(path.join(os.tmpdir(), "nkf-predecessor-source-"));
  const archivedSource = spawnSync("git", ["archive", predecessorCommit], {
    cwd: repositoryRoot,
    encoding: null,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (archivedSource.status !== 0 || archivedSource.stdout === null) {
    throw new Error(archivedSource.stderr?.toString() || "Cannot read predecessor source.");
  }
  const extracted = spawnSync("tar", ["-x", "-C", predecessorRoot], {
    input: archivedSource.stdout,
    encoding: null,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (extracted.status !== 0) throw new Error(extracted.stderr?.toString() || "Cannot extract predecessor source.");

  const adopterPath = path.join(predecessorRoot, "dist/nourd-nkf-adopt.mjs");
  const predecessorChecker = path.join(predecessorRoot, "dist/nourd-nkf-checker.mjs");
  const predecessorModules = path.join(predecessorRoot, "node_modules");
  await mkdir(predecessorModules);
  for (const dependency of [
    "ajv-formats",
    "ajv",
    "commonmark",
    "yaml",
    "fast-deep-equal",
    "fast-uri",
    "json-schema-traverse",
    "require-from-string",
    "entities",
    "mdurl",
    "minimist",
  ]) {
    await cp(
      path.join(repositoryRoot, "node_modules", dependency),
      path.join(predecessorModules, dependency),
      { recursive: true },
    );
  }
  await mkdir(path.join(predecessorModules, "@unicode"));
  await cp(
    path.join(repositoryRoot, "node_modules/@unicode/unicode-17.0.0"),
    path.join(predecessorModules, "@unicode/unicode-17.0.0"),
    { recursive: true },
  );
  await build({
    absWorkingDir: predecessorRoot,
    entryPoints: [path.join(predecessorRoot, "scripts/adoption/nourd-nkf-adopt.mjs")],
    outfile: adopterPath,
    bundle: true,
    platform: "node",
    target: "node22",
    format: "esm",
    legalComments: "none",
    charset: "utf8",
    sourcemap: false,
    minify: false,
    loader: { ".md": "text" },
    banner: {
      js: '#!/usr/bin/env node\nimport { createRequire as __createRequire } from "node:module";\nconst require = __createRequire(import.meta.url);',
    },
  });
  await build({
    absWorkingDir: predecessorRoot,
    entryPoints: [path.join(predecessorRoot, "src/cli.ts")],
    outfile: predecessorChecker,
    bundle: true,
    platform: "node",
    target: "node22",
    format: "esm",
    legalComments: "none",
    sourcemap: false,
    minify: false,
    packages: "bundle",
    banner: {
      js: '#!/usr/bin/env node\nimport { createRequire as __nkfCreateRequire } from "node:module";\nconst require = __nkfCreateRequire(import.meta.url);',
    },
  });
  if (expectedAdopterSha256 !== null) {
    expect(sha256(await readFile(adopterPath))).toBe(expectedAdopterSha256);
  }

  const predecessorEntries = new Map<string, Buffer>();
  for (const entry of releaseEntriesForVersion("0.1")) {
    if (entry.path === "release-manifest.json") continue;
    predecessorEntries.set(entry.path, await readFile(path.join(predecessorRoot, entry.path)));
  }
  const predecessorDecisionPath = "knowledge/decisions/0065-confirm-current-release-bound-checker.md";
  const predecessorManifest = constructReleaseManifest({
    releaseCommit: predecessorCommit,
    checkerConfirmation: {
      decision: "ADR-0065",
      path: predecessorDecisionPath,
      bytes: await readFile(path.join(predecessorRoot, predecessorDecisionPath)),
      checkerSourceCommit: "57b3410dfccd8ff4f5c7b7995a32cab18c32e7fc",
    },
    entries: predecessorEntries,
    nkfVersion: "0.1",
  });
  predecessorEntries.set("release-manifest.json", serializeReleaseManifest(predecessorManifest));
  const predecessorArchive = createUstar(predecessorEntries, releaseEntriesForVersion("0.1"));
  const archiveSha256 = sha256(predecessorArchive);
  const archivePath = path.join(predecessorRoot, `nourd-nkf-sha256-${archiveSha256}.tar`);
  await writeFile(archivePath, predecessorArchive);
  return { adopterPath, archivePath, archiveSha256 };
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

  const predecessorCommit = "53ae5217f68731d953f3bf616a578adeb033bb03";
  const predecessorRoot = await mkdtemp(path.join(os.tmpdir(), "nkf-predecessor-source-"));
  const archivedSource = spawnSync("git", ["archive", predecessorCommit], {
    cwd: repositoryRoot,
    encoding: null,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (archivedSource.status !== 0 || archivedSource.stdout === null) {
    throw new Error(archivedSource.stderr?.toString() || "Cannot read predecessor source.");
  }
  const extracted = spawnSync("tar", ["-x", "-C", predecessorRoot], {
    input: archivedSource.stdout,
    encoding: null,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (extracted.status !== 0) throw new Error(extracted.stderr?.toString() || "Cannot extract predecessor source.");
  predecessorAdopter = path.join(predecessorRoot, "dist/nourd-nkf-adopt.mjs");
  const predecessorChecker = path.join(predecessorRoot, "dist/nourd-nkf-checker.mjs");
  const predecessorModules = path.join(predecessorRoot, "node_modules");
  await mkdir(predecessorModules);
  for (const dependency of [
    "ajv-formats",
    "ajv",
    "commonmark",
    "yaml",
    "fast-deep-equal",
    "fast-uri",
    "json-schema-traverse",
    "require-from-string",
    "entities",
    "mdurl",
    "minimist",
  ]) {
    await cp(
      path.join(repositoryRoot, "node_modules", dependency),
      path.join(predecessorModules, dependency),
      { recursive: true },
    );
  }
  await mkdir(path.join(predecessorModules, "@unicode"));
  await cp(
    path.join(repositoryRoot, "node_modules/@unicode/unicode-17.0.0"),
    path.join(predecessorModules, "@unicode/unicode-17.0.0"),
    { recursive: true },
  );
  await build({
    absWorkingDir: predecessorRoot,
    entryPoints: [path.join(predecessorRoot, "scripts/adoption/nourd-nkf-adopt.mjs")],
    outfile: predecessorAdopter,
    bundle: true,
    platform: "node",
    target: "node22",
    format: "esm",
    legalComments: "none",
    charset: "utf8",
    sourcemap: false,
    minify: false,
    loader: { ".md": "text" },
    banner: {
      js: '#!/usr/bin/env node\nimport { createRequire as __createRequire } from "node:module";\nconst require = __createRequire(import.meta.url);',
    },
  });
  await build({
    absWorkingDir: predecessorRoot,
    entryPoints: [path.join(predecessorRoot, "src/cli.ts")],
    outfile: predecessorChecker,
    bundle: true,
    platform: "node",
    target: "node22",
    format: "esm",
    legalComments: "none",
    sourcemap: false,
    minify: false,
    packages: "bundle",
    banner: {
      js: '#!/usr/bin/env node\nimport { createRequire as __nkfCreateRequire } from "node:module";\nconst require = __nkfCreateRequire(import.meta.url);',
    },
  });
  expect(sha256(await readFile(predecessorAdopter))).toBe(
    "c33766982d3354a01558bf1f0903314eb98537e38c50585c9cd94c7c24aae387",
  );
  const predecessorEntries = new Map<string, Buffer>();
  for (const entry of releaseEntriesForVersion("0.1")) {
    if (entry.path === "release-manifest.json") continue;
    predecessorEntries.set(entry.path, await readFile(path.join(predecessorRoot, entry.path)));
  }
  const predecessorDecisionPath = "knowledge/decisions/0065-confirm-current-release-bound-checker.md";
  const predecessorManifest = constructReleaseManifest({
    releaseCommit: predecessorCommit,
    checkerConfirmation: {
      decision: "ADR-0065",
      path: predecessorDecisionPath,
      bytes: await readFile(path.join(predecessorRoot, predecessorDecisionPath)),
      checkerSourceCommit: "57b3410dfccd8ff4f5c7b7995a32cab18c32e7fc",
    },
    entries: predecessorEntries,
    nkfVersion: "0.1",
  });
  predecessorEntries.set("release-manifest.json", serializeReleaseManifest(predecessorManifest));
  const predecessorArchive = createUstar(predecessorEntries, releaseEntriesForVersion("0.1"));
  predecessorArchiveSha256 = sha256(predecessorArchive);
  predecessorArchivePath = path.join(predecessorRoot, `nourd-nkf-sha256-${predecessorArchiveSha256}.tar`);
  await writeFile(predecessorArchivePath, predecessorArchive);

  const predecessor13 = await buildPredecessorRelease(
    "b50493ddb42c87ed426eeb3bb11d3568652d8130",
    "7533a029053beaccd8f6fec939c2198c5909fd8b5a37a4ba9b5bc0c205bbc7c8",
  );
  predecessor13Adopter = predecessor13.adopterPath;
  predecessor13ArchivePath = predecessor13.archivePath;
  predecessor13ArchiveSha256 = predecessor13.archiveSha256;

  const lastZeroOne = await buildPredecessorRelease(
    "aca9bade923b529fb3e60f781c6dcfcbdb46e001",
    null,
  );
  repairAdopter = lastZeroOne.adopterPath;
  repairArchivePath = lastZeroOne.archivePath;
  repairArchiveSha256 = lastZeroOne.archiveSha256;
}, 60_000);

describe("NKF consumer adopter", () => {
  it("onboards empty Product and Technology repositories without native assembly", async () => {
    for (const profile of ["product", "technology"] as const) {
      const { project, workspace } = await createEmptyProject();
      const inspected = inspect(project, workspace, profile);
      expect(inspected.status, inspected.stderr).toBe(0);
      expect(JSON.parse(inspected.stdout)).toMatchObject({
        mechanically_ready: true,
        state: "workspace-created",
      });
      await resolveEmptyAssessment(workspace);
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
        onboarding_assessment: {
          category: "empty-repository",
          recommendation: "recommended",
          confirmation: "not-required",
          mechanically_proven: false,
        },
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

  it("keeps .nourd at the project root while onboarding a safe non-default knowledge root", async () => {
    const { project, workspace } = await createEmptyProject();
    expect(inspect(project, workspace, "product", "docs/knowledge").status).toBe(0);
    await resolveEmptyAssessment(workspace);
    expect(seal(project, workspace).status).toBe(0);
    const result = onboard(project, workspace);
    expect(result.status, result.stderr).toBe(0);
    const bundle = YAML.parse(
      await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"),
    );
    expect(bundle.knowledge_root).toBe("docs/knowledge");
    expect((await lstat(path.join(project, ".nourd"))).isDirectory()).toBe(true);
    expect((await lstat(path.join(project, "docs/knowledge/README.md"))).isFile()).toBe(true);
    await expect(lstat(path.join(project, "knowledge"))).rejects.toMatchObject({
      code: "ENOENT",
    });
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

  it("preserves unresolved flat Task and Design material without inferring lifecycle state", async () => {
    const { project, workspace } = await createEmptyProject();
    const earlyTaskPath = path.join(project, "knowledge/early-task.md");
    const earlyDesignPath = path.join(project, "knowledge/early-design.md");
    await mkdir(path.dirname(earlyTaskPath), { recursive: true });
    const earlyTask = Buffer.from([
      "---",
      "title: Possible Task",
      'summary: "Preserves early Task-like material without assigning lifecycle state."',
      "created_at: 2026-07-31T10:00:00Z",
      "---",
      "",
      "# Possible Task",
      "",
      "Status has not been established.",
      "",
    ].join("\n"));
    const earlyDesign = Buffer.from([
      "---",
      "title: Possible Design",
      'summary: "Preserves early Design-like material without assigning disposition."',
      "created_at: 2026-07-31T10:00:00Z",
      "---",
      "",
      "# Possible Design",
      "",
      "Disposition has not been established.",
      "",
    ].join("\n"));
    await writeFile(earlyTaskPath, earlyTask);
    await writeFile(earlyDesignPath, earlyDesign);
    expect(inspect(project, workspace).status).toBe(0);
    const planPath = path.join(workspace, "plan.yaml");
    const plan = YAML.parse(await readFile(planPath, "utf8"));
    plan.assessment = {
      category: "tiny-knowledge-no-source-or-configuration",
      assessed_by: "test-agent",
      assessed_at: "2026-07-31T11:01:00Z",
      recommendation: "recommended",
      summary: "The repository contains two unresolved early knowledge documents.",
      evidence: [{
        subject: "knowledge/",
        classification: "knowledge",
        finding: "Both documents were read and neither has established lifecycle metadata.",
      }],
      confirmation: {
        status: "confirmed",
        authority: "human-product-owner",
        confirmed_at: "2026-07-31T11:02:00Z",
        override: false,
        rationale: "The authority confirms Category 2 without assigning lifecycle meaning.",
      },
    };
    for (const document of plan.documents) {
      document.representation = {
        kind: "non_record",
        non_record_kind: "other",
        reason: "Lifecycle type and state remain unresolved during initial onboarding.",
      };
    }
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    expect(seal(project, workspace).status).toBe(0);
    const result = onboard(project, workspace);
    expect(result.status, result.stderr).toBe(0);
    expect(await readFile(earlyTaskPath)).toEqual(earlyTask);
    expect(await readFile(earlyDesignPath)).toEqual(earlyDesign);
    await expect(lstat(path.join(project, "knowledge/tasks/active/early-task.md"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    await expect(lstat(path.join(project, "knowledge/designs/active/early-design.md"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    const bundle = YAML.parse(
      await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"),
    );
    expect(bundle.non_records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "early-task.md", kind: "other" }),
        expect.objectContaining({ path: "early-design.md", kind: "other" }),
      ]),
    );
  });

  it("uses an explicitly selected existing Draft Product root without generating a duplicate", async () => {
    const { project, workspace } = await createEmptyProject();
    const source = path.join(project, "knowledge/overview.md");
    await mkdir(path.dirname(source), { recursive: true });
    const original = Buffer.from([
      "---",
      "id: example-product",
      "type: product",
      "title: Example Product",
      'summary: "Provides the existing Draft Product orientation selected during onboarding."',
      "created_at: 2026-07-31T10:00:00Z",
      "record_lifecycle: living",
      "record_status: draft",
      "---",
      "",
      "# Example Product",
      "",
      "## Product Definition",
      "",
      "Example Product is the deliberately selected Draft Product root.",
      "",
      "## Purpose",
      "",
      "The purpose remains unresolved.",
      "",
      "## Vision",
      "",
      "The vision remains unresolved.",
      "",
      "## People Served",
      "",
      "The people served remain unresolved.",
      "",
      "## Needs And Outcomes",
      "",
      "Needs and outcomes remain unresolved.",
      "",
      "## Boundaries",
      "",
      "External systems retain their own authority.",
      "",
      "## Product Map",
      "",
      "The NKF map will provide the navigable topology.",
      "",
    ].join("\n"));
    await writeFile(source, original);
    expect(inspect(project, workspace).status).toBe(0);
    const planPath = path.join(workspace, "plan.yaml");
    const plan = YAML.parse(await readFile(planPath, "utf8"));
    plan.assessment = {
      category: "tiny-knowledge-no-source-or-configuration",
      assessed_by: "test-agent",
      assessed_at: "2026-07-31T11:01:00Z",
      recommendation: "recommended",
      summary: "The complete repository contains one safe Draft Product root.",
      evidence: [{
        subject: "knowledge/overview.md",
        classification: "knowledge",
        finding: "The document was read completely and is safe to retain as the Draft root.",
      }],
      confirmation: {
        status: "confirmed",
        authority: "human-product-owner",
        confirmed_at: "2026-07-31T11:02:00Z",
        override: false,
        rationale: "The authority confirms Category 2 for this exact snapshot.",
      },
    };
    plan.scaffold.root_record = "overview.md";
    plan.documents[0].representation = {
      kind: "record",
      declaration: draftDeclaration({
        id: "example-product",
        type: "product",
        title: "Example Product",
        root: "example-product",
        sections: [
          proposalSection("product-definition", "Product Definition", "governing"),
          proposalSection("purpose", "Purpose", "governing"),
          proposalSection("vision", "Vision", "governing"),
          proposalSection("people-served", "People Served", "boundary"),
          proposalSection("needs-and-outcomes", "Needs And Outcomes", "governing"),
          proposalSection("boundaries", "Boundaries", "boundary"),
          proposalSection("product-map", "Product Map", "catalogue"),
        ],
      }),
    };
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    expect(seal(project, workspace).status).toBe(0);
    const result = onboard(project, workspace);
    expect(result.status, result.stderr).toBe(0);
    expect(await readFile(source)).toEqual(original);
    await expect(lstat(path.join(project, "knowledge/product.md"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    const rootDeclaration = YAML.parse(
      await readFile(
        path.join(project, ".nourd/knowledge/records/example-product.yaml"),
        "utf8",
      ),
    );
    expect(rootDeclaration.source.path).toBe("overview.md");
    expect(rootDeclaration.source.digest.value).toBe(sha256(original));
  });

  it("uses an explicitly selected existing Draft Technology Specification without generating a duplicate", async () => {
    const { project, workspace } = await createEmptyProject();
    const source = path.join(project, "knowledge/specifications/technology-contract.md");
    await mkdir(path.dirname(source), { recursive: true });
    const original = Buffer.from([
      "---",
      "id: example-technology-contract",
      "type: specification",
      "title: Example Technology Contract",
      'summary: "Provides the existing Draft Technology Specification selected during onboarding."',
      "created_at: 2026-07-31T10:00:00Z",
      "record_lifecycle: living",
      "record_status: draft",
      "task: EXAMPLE-TECH-001",
      "---",
      "",
      "# Example Technology Contract",
      "",
      "## Specification Definition",
      "",
      "This Draft reserves the initial Technology contract boundary.",
      "",
      "## Authority And Normative Status",
      "",
      "No normative meaning is accepted by this Draft.",
      "",
      "## Scope And Applicability",
      "",
      "Scope and applicability remain unresolved.",
      "",
      "## Model Vocabulary And Semantics",
      "",
      "Vocabulary and semantics remain unresolved.",
      "",
      "## Requirements Constraints And Interfaces",
      "",
      "Requirements, constraints, and interfaces remain unresolved.",
      "",
      "## Validation And Conformance",
      "",
      "Validation cannot accept this Draft.",
      "",
      "## Versioning Compatibility And Migration",
      "",
      "Compatibility and migration remain unresolved.",
      "",
      "## Security Authority And Operational Boundaries",
      "",
      "External authority and operational state remain outside this Draft.",
      "",
      "## Unresolved And Deferred Matters",
      "",
      "All substantive contract meaning remains unresolved.",
      "",
    ].join("\n"));
    await writeFile(source, original);
    expect(inspect(project, workspace, "technology").status).toBe(0);
    const planPath = path.join(workspace, "plan.yaml");
    const plan = YAML.parse(await readFile(planPath, "utf8"));
    plan.assessment = {
      category: "tiny-knowledge-no-source-or-configuration",
      assessed_by: "test-agent",
      assessed_at: "2026-07-31T11:01:00Z",
      recommendation: "recommended",
      summary: "The complete repository contains one safe Draft Technology Specification.",
      evidence: [{
        subject: "knowledge/specifications/technology-contract.md",
        classification: "knowledge",
        finding: "The document was read completely and is safe to retain as the Draft Specification.",
      }],
      confirmation: {
        status: "confirmed",
        authority: "human-product-owner",
        confirmed_at: "2026-07-31T11:02:00Z",
        override: false,
        rationale: "The authority confirms Category 2 for this exact snapshot.",
      },
    };
    plan.scaffold.initial_specification = "specifications/technology-contract.md";
    plan.documents[0].representation = {
      kind: "record",
      declaration: draftDeclaration({
        id: "example-technology-contract",
        type: "specification",
        title: "Example Technology Contract",
        root: "example-technology",
        sections: [
          proposalSection("specification-definition", "Specification Definition", "definition"),
          proposalSection("authority-and-normative-status", "Authority And Normative Status", "governing"),
          proposalSection("scope-and-applicability", "Scope And Applicability", "applicability"),
          proposalSection("model-vocabulary-and-semantics", "Model Vocabulary And Semantics", "definition"),
          proposalSection("requirements-constraints-and-interfaces", "Requirements Constraints And Interfaces", "governing"),
          proposalSection("validation-and-conformance", "Validation And Conformance", "validation"),
          proposalSection("versioning-compatibility-and-migration", "Versioning Compatibility And Migration", "evolution"),
          proposalSection("security-authority-and-operational-boundaries", "Security Authority And Operational Boundaries", "boundary"),
          {
            ...proposalSection(
              "unresolved-and-deferred-matters",
              "Unresolved And Deferred Matters",
              "unresolved",
            ),
            authority: "unresolved",
          },
        ],
      }),
    };
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    expect(seal(project, workspace).status).toBe(0);
    const result = onboard(project, workspace);
    expect(result.status, result.stderr).toBe(0);
    expect(await readFile(source)).toEqual(original);
    await expect(
      lstat(path.join(project, "knowledge/specifications/initial-specification.md")),
    ).rejects.toMatchObject({ code: "ENOENT" });
    const specificationDeclaration = YAML.parse(
      await readFile(
        path.join(project, ".nourd/knowledge/records/example-technology-contract.yaml"),
        "utf8",
      ),
    );
    expect(specificationDeclaration.source.path).toBe(
      "specifications/technology-contract.md",
    );
    expect(specificationDeclaration.source.digest.value).toBe(sha256(original));
  });

  it("reuses an existing canonical map and never allocates README-2.md", async () => {
    const { project, workspace } = await createEmptyProject();
    const map = path.join(project, "knowledge/README.md");
    await mkdir(path.dirname(map), { recursive: true });
    const original = [
      "---",
      "title: Early Knowledge",
      'summary: "Preserves project-owned orientation during NKF onboarding."',
      "created_at: 2026-07-31T11:00:00Z",
      "---",
      "",
      "# Early Knowledge",
      "",
      "Project-owned orientation remains outside the managed block.",
      "",
    ].join("\n");
    await writeFile(map, original);
    expect(inspect(project, workspace).status).toBe(0);
    await resolveAllAsNavigation(workspace);
    expect(seal(project, workspace).status).toBe(0);
    const result = onboard(project, workspace);
    expect(result.status, result.stderr).toBe(0);
    const reconciled = await readFile(map, "utf8");
    expect(reconciled.startsWith(original)).toBe(true);
    expect(reconciled).toContain("<!-- nkf-navigation:start -->");
    expect(reconciled).toContain("## NKF Navigation");
    await expect(lstat(path.join(project, "knowledge/README-2.md"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    expect(JSON.parse(result.stdout).paths.changed).toContain("knowledge/README.md");
  });

  it("applies an explicitly sealed frontmatter envelope without changing existing map body bytes", async () => {
    const { project, workspace } = await createEmptyProject();
    const map = path.join(project, "knowledge/README.md");
    await mkdir(path.dirname(map), { recursive: true });
    const originalBody = Buffer.from(
      "# Early Knowledge\n\nProject-owned orientation remains byte-exact.\n",
      "utf8",
    );
    await writeFile(map, originalBody);
    expect(inspect(project, workspace).status).toBe(0);
    await resolveAllAsNavigation(workspace);
    const envelope = Buffer.from([
      "---",
      "title: Early Knowledge",
      'summary: "Preserves the existing canonical map while adding the required source envelope."',
      "created_at: 2026-07-31T11:00:00Z",
      "---",
      "",
    ].join("\n"));
    const candidate = path.join(workspace, "candidate/README.md");
    await writeFile(candidate, Buffer.concat([envelope, originalBody]));
    expect(seal(project, workspace).status).toBe(0);
    const result = onboard(project, workspace);
    expect(result.status, result.stderr).toBe(0);
    const installed = await readFile(map);
    expect(installed.subarray(0, envelope.length + originalBody.length)).toEqual(
      Buffer.concat([envelope, originalBody]),
    );
    expect(installed.toString("utf8")).toContain("<!-- nkf-navigation:start -->");
    expect(JSON.parse(result.stdout).paths.changed).toContain("knowledge/README.md");
  });

  it("reconciles partial topology and rejects an ambiguous canonical map before mutation", async () => {
    const partial = await createEmptyProject();
    const partialIndex = path.join(partial.project, "knowledge/tasks/README.md");
    await mkdir(path.dirname(partialIndex), { recursive: true });
    const originalIndex = [
      "---",
      "title: Early Tasks",
      'summary: "Preserves early Task navigation during NKF onboarding."',
      "created_at: 2026-07-31T11:00:00Z",
      "---",
      "",
      "# Early Tasks",
      "",
      "Project-owned Task guidance remains intact.",
      "",
    ].join("\n");
    await writeFile(partialIndex, originalIndex);
    expect(inspect(partial.project, partial.workspace).status).toBe(0);
    await resolveAllAsNavigation(partial.workspace);
    expect(seal(partial.project, partial.workspace).status).toBe(0);
    const partialResult = onboard(partial.project, partial.workspace);
    expect(partialResult.status, partialResult.stderr).toBe(0);
    const reconciledIndex = await readFile(partialIndex, "utf8");
    expect(reconciledIndex.startsWith(originalIndex)).toBe(true);
    expect(reconciledIndex).toContain("(active/README.md)");
    expect(reconciledIndex).toContain("(deferred/README.md)");
    expect(reconciledIndex).toContain("(completed/README.md)");

    const ambiguous = await createEmptyProject();
    const ambiguousMap = path.join(ambiguous.project, "knowledge/README.md");
    await mkdir(path.dirname(ambiguousMap), { recursive: true });
    await writeFile(
      ambiguousMap,
      [
        "---",
        "title: Ambiguous Knowledge",
        'summary: "Contains ambiguous managed navigation markers."',
        "created_at: 2026-07-31T11:00:00Z",
        "---",
        "",
        "# Ambiguous Knowledge",
        "",
        "<!-- nkf-navigation:start -->",
        "<!-- nkf-navigation:start -->",
        "<!-- nkf-navigation:end -->",
        "",
      ].join("\n"),
    );
    expect(inspect(ambiguous.project, ambiguous.workspace).status).toBe(0);
    await resolveAllAsNavigation(ambiguous.workspace);
    expect(seal(ambiguous.project, ambiguous.workspace).status).toBe(0);
    const before = await snapshotTree(ambiguous.project);
    const ambiguousResult = onboard(ambiguous.project, ambiguous.workspace);
    expect(ambiguousResult.status).toBe(1);
    expect(ambiguousResult.stderr).toContain("NKF-ONBOARDING-PATH-CONFLICT");
    expectTreeEqual(await snapshotTree(ambiguous.project), before);
  });

  it("repairs trusted predecessor topology with drift protection, rollback, and idempotence", async () => {
    const { project, workspace } = await createEmptyProject();
    const map = path.join(project, "knowledge/README.md");
    await mkdir(path.dirname(map), { recursive: true });
    const original = [
      "---",
      "title: Early Knowledge",
      'summary: "Preserves the consumer-owned canonical map during predecessor onboarding."',
      "created_at: 2026-07-31T11:00:00Z",
      "---",
      "",
      "# Early Knowledge",
      "",
      "Consumer-owned orientation.",
      "",
    ].join("\n");
    await writeFile(map, original);
    const predecessorInspect = runWith(predecessorAdopter, "inspect", project, [
      "--output", workspace,
      "--profile", "product",
      "--root-id", "example-product",
      "--root-title", "Example Product",
      "--task-id", "EXAMPLE-001",
      "--created-at", "2026-07-31T11:00:00Z",
      "--knowledge-root", "knowledge",
    ]);
    expect(predecessorInspect.status, predecessorInspect.stderr).toBe(0);
    await resolveAllAsNavigation(workspace);
    const predecessorSeal = runWith(predecessorAdopter, "seal", project, [
      "--plan", path.join(workspace, "plan.yaml"),
    ]);
    expect(predecessorSeal.status, predecessorSeal.stderr).toBe(0);
    const predecessorOnboard = runWith(predecessorAdopter, "onboard", project, [
      "--plan", path.join(workspace, "plan.yaml"),
      "--archive", predecessorArchivePath,
      "--sha256", predecessorArchiveSha256,
    ]);
    expect(predecessorOnboard.status, predecessorOnboard.stderr).toBe(0);
    const competing = path.join(project, "knowledge/README-2.md");
    const predecessorMap = await readFile(competing);

    const crossVersion = run("repair-topology", project, [
      "--archive", archivePath,
      "--sha256", archiveSha256,
    ]);
    expect(crossVersion.status).toBe(1);
    expect(crossVersion.stderr).toContain("version migration is a separate deliberate adoption");

    const onboardingReceiptPath = path.join(project, ".nourd/onboarding-receipt.json");
    const onboardingReceiptBytes = await readFile(onboardingReceiptPath);
    const mismatchedReceipt = JSON.parse(onboardingReceiptBytes.toString("utf8"));
    mismatchedReceipt.profile = "nkf.profile.technology";
    await writeFile(onboardingReceiptPath, `${JSON.stringify(mismatchedReceipt, null, 2)}\n`);
    const mismatched = runWith(repairAdopter, "repair-topology", project, [
      "--archive", repairArchivePath,
      "--sha256", repairArchiveSha256,
    ]);
    expect(mismatched.status).toBe(1);
    expect(mismatched.stderr).toContain(
      "The predecessor onboarding receipt does not match the installed bundle and release pin",
    );
    await writeFile(onboardingReceiptPath, onboardingReceiptBytes);

    await appendFile(competing, "\nConsumer drift.\n");
    const drifted = runWith(repairAdopter, "repair-topology", project, [
      "--archive", repairArchivePath,
      "--sha256", repairArchiveSha256,
    ]);
    expect(drifted.status).toBe(1);
    expect(drifted.stderr).toContain("NKF-TOPOLOGY-REPAIR-DRIFT");
    await expect(lstat(path.join(project, ".nourd/topology-repair-receipt.json"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    await writeFile(competing, predecessorMap);

    const beforeRollback = await snapshotTree(project);
    const rolledBack = runWith(
      repairAdopter,
      "repair-topology",
      project,
      ["--archive", repairArchivePath, "--sha256", repairArchiveSha256],
      { NKF_TOPOLOGY_REPAIR_TEST_FAIL_AFTER_WRITE: "1" },
    );
    expect(rolledBack.status).toBe(1);
    expect(rolledBack.stderr).toContain("Injected topology-repair transaction failure");
    expectTreeEqual(await snapshotTree(project), beforeRollback);

    const repairStartedAt = Math.floor(Date.now() / 1000) * 1000;
    const repaired = runWith(repairAdopter, "repair-topology", project, [
      "--archive", repairArchivePath,
      "--sha256", repairArchiveSha256,
    ]);
    expect(repaired.status, repaired.stderr).toBe(0);
    const result = JSON.parse(repaired.stdout);
    expect(result.state).toBe("repaired");
    expect(result.receipt.removed_paths).toContain("knowledge/README-2.md");
    await expect(lstat(competing)).rejects.toMatchObject({ code: "ENOENT" });
    const reconciled = await readFile(map, "utf8");
    expect(reconciled.startsWith(original)).toBe(true);
    expect(reconciled).toContain("<!-- nkf-navigation:start -->");
    for (const required of [
      "tasks/README.md",
      "tasks/active/README.md",
      "tasks/deferred/README.md",
      "tasks/completed/README.md",
      "designs/README.md",
      "designs/active/README.md",
      "designs/adopted/README.md",
      "designs/rejected/README.md",
      "designs/superseded/README.md",
      "designs/withdrawn/README.md",
      "decisions/README.md",
      "specifications/README.md",
      "realizations/README.md",
      "realizations/current/README.md",
      "evidence/README.md",
    ]) {
      expect((await lstat(path.join(project, "knowledge", ...required.split("/")))).isFile()).toBe(true);
    }
    const generatedIndex = await readFile(
      path.join(project, "knowledge/tasks/deferred/README.md"),
      "utf8",
    );
    const generatedCreatedAt = generatedIndex.match(/^created_at: (.+)$/mu)?.[1];
    expect(generatedCreatedAt).toBeDefined();
    expect(new Date(generatedCreatedAt ?? "").getTime()).toBeGreaterThanOrEqual(
      repairStartedAt,
    );
    expect(new Date(generatedCreatedAt ?? "").getTime()).toBeLessThanOrEqual(Date.now());
    const repeat = runWith(repairAdopter, "repair-topology", project, [
      "--archive", repairArchivePath,
      "--sha256", repairArchiveSha256,
    ]);
    expect(repeat.status, repeat.stderr).toBe(0);
    expect(JSON.parse(repeat.stdout).state).toBe("no-update");

    const repairReceiptPath = path.join(project, ".nourd/topology-repair-receipt.json");
    const repairReceipt = JSON.parse(await readFile(repairReceiptPath, "utf8"));
    repairReceipt.successor_release.checker_sha256 = "0".repeat(64);
    await writeFile(repairReceiptPath, `${JSON.stringify(repairReceipt, null, 2)}\n`);
    const tamperedReceipt = runWith(repairAdopter, "repair-topology", project, [
      "--archive", repairArchivePath,
      "--sha256", repairArchiveSha256,
    ]);
    expect(tamperedReceipt.status).toBe(1);
    expect(tamperedReceipt.stderr).toContain(
      "The topology-repair receipt does not match the installed successor release",
    );
  }, 15_000);

  it("repairs the exact NKF-013 predecessor receipt without inventing assessment state", async () => {
    const { project, workspace } = await createEmptyProject();
    const map = path.join(project, "knowledge/README.md");
    await mkdir(path.dirname(map), { recursive: true });
    await writeFile(
      map,
      [
        "---",
        "title: Early Knowledge",
        'summary: "Preserves the consumer-owned canonical map during predecessor onboarding."',
        "created_at: 2026-07-31T11:00:00Z",
        "---",
        "",
        "# Early Knowledge",
        "",
        "Consumer-owned orientation.",
        "",
      ].join("\n"),
    );
    const predecessorInspect = runWith(predecessor13Adopter, "inspect", project, [
      "--output", workspace,
      "--profile", "product",
      "--root-id", "example-product",
      "--root-title", "Example Product",
      "--task-id", "EXAMPLE-001",
      "--created-at", "2026-07-31T11:00:00Z",
      "--knowledge-root", "knowledge",
    ]);
    expect(predecessorInspect.status, predecessorInspect.stderr).toBe(0);
    const planPath = path.join(workspace, "plan.yaml");
    const predecessorPlan = YAML.parse(await readFile(planPath, "utf8"));
    expect(predecessorPlan.assessment).toBeUndefined();
    for (const document of predecessorPlan.documents) {
      document.representation = { kind: "non_record", non_record_kind: "navigation" };
    }
    await writeFile(planPath, YAML.stringify(predecessorPlan, { lineWidth: 0 }));
    const predecessorSeal = runWith(predecessor13Adopter, "seal", project, [
      "--plan", planPath,
    ]);
    expect(predecessorSeal.status, predecessorSeal.stderr).toBe(0);
    const predecessorOnboard = runWith(predecessor13Adopter, "onboard", project, [
      "--plan", planPath,
      "--archive", predecessor13ArchivePath,
      "--sha256", predecessor13ArchiveSha256,
    ]);
    expect(predecessorOnboard.status, predecessorOnboard.stderr).toBe(0);
    const predecessorReceipt = JSON.parse(
      await readFile(path.join(project, ".nourd/onboarding-receipt.json"), "utf8"),
    );
    expect(predecessorReceipt.assessment).toBeUndefined();

    const repaired = runWith(repairAdopter, "repair-topology", project, [
      "--archive", repairArchivePath,
      "--sha256", repairArchiveSha256,
    ]);
    expect(repaired.status, repaired.stderr).toBe(0);
    const result = JSON.parse(repaired.stdout);
    expect(result).toMatchObject({
      state: "repaired",
      receipt: { predecessor_release: { task: "NKF-013" } },
      validation: { conformance: "passed" },
    });
    await expect(lstat(path.join(project, "knowledge/README-2.md"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    expect(await readFile(map, "utf8")).toContain("<!-- nkf-navigation:start -->");
  }, 15_000);

  it("requires Category 2 confirmation and preserves negative agent recommendations", async () => {
    const { project, workspace } = await createEmptyProject();
    await mkdir(path.join(project, "knowledge"));
    await writeFile(path.join(project, "knowledge", "note.md"), "# Note\n\nEarly knowledge.\n");
    expect(inspect(project, workspace).status).toBe(0);
    const planPath = path.join(workspace, "plan.yaml");
    const plan = YAML.parse(await readFile(planPath, "utf8"));
    plan.documents[0].representation = {
      kind: "non_record",
      non_record_kind: "navigation",
    };
    plan.assessment = {
      category: "tiny-knowledge-no-source-or-configuration",
      assessed_by: "test-agent",
      assessed_at: "2026-07-31T11:01:00Z",
      recommendation: "recommended",
      summary: "The agent recommends Category 2 for the complete test repository.",
      evidence: [{
        subject: "knowledge/note.md",
        classification: "knowledge",
        finding: "The document was read completely.",
      }],
      confirmation: { status: "unresolved" },
    };
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    const missing = seal(project, workspace);
    expect(missing.status).toBe(1);
    expect(missing.stderr).toContain("assessment.confirmation keys");

    plan.assessment.recommendation = "not-recommended";
    plan.assessment.confirmation = {
      status: "confirmed",
      authority: "human-product-owner",
      confirmed_at: "2026-07-31T11:02:00Z",
      override: false,
      rationale: "The authority reviewed the agent's negative recommendation.",
    };
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    const notOverridden = seal(project, workspace);
    expect(notOverridden.status).toBe(1);
    expect(notOverridden.stderr).toContain("requires an explicit human override");

    plan.assessment.confirmation.override = true;
    plan.assessment.confirmation.rationale =
      "The authority deliberately directs Category 2 despite the agent recommendation.";
    const evidence = plan.assessment.evidence;
    plan.assessment.evidence = [];
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    const evidenceMissing = seal(project, workspace);
    expect(evidenceMissing.status).toBe(1);
    expect(evidenceMissing.stderr).toContain("must include evidence");

    plan.assessment.evidence = evidence;
    plan.assessment.confirmation.authority = "different-authority";
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    const wrongAuthority = seal(project, workspace);
    expect(wrongAuthority.status).toBe(1);
    expect(wrongAuthority.stderr).toContain("must match the declared project authority");

    plan.assessment.confirmation.authority = "human-product-owner";
    plan.assessment.confirmation.confirmed_at = "2026-07-31T11:00:00Z";
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    const predatesAssessment = seal(project, workspace);
    expect(predatesAssessment.status).toBe(1);
    expect(predatesAssessment.stderr).toContain("cannot predate the agent assessment");

    plan.assessment.confirmation.confirmed_at = "2026-07-31T11:02:00Z";
    await writeFile(planPath, YAML.stringify(plan, { lineWidth: 0 }));
    expect(seal(project, workspace).status).toBe(0);
    const sealed = YAML.parse(await readFile(planPath, "utf8"));
    expect(sealed.assessment.recommendation).toBe("not-recommended");
    expect(sealed.assessment.confirmation.override).toBe(true);
  });

  it("applies only exact sealed candidate edits", async () => {
    const { project, workspace } = await createEmptyProject();
    const source = path.join(project, "knowledge", "notes.md");
    await mkdir(path.dirname(source), { recursive: true });
    await writeFile(source, "# Notes\n\nEarly notes.\n");
    expect(inspect(project, workspace).status).toBe(0);
    const planPath = path.join(workspace, "plan.yaml");
    const plan = YAML.parse(await readFile(planPath, "utf8"));
    plan.assessment = {
      category: "tiny-knowledge-no-source-or-configuration",
      assessed_by: "test-agent",
      assessed_at: "2026-07-31T11:01:00Z",
      recommendation: "recommended",
      summary: "The complete test repository contains one tiny knowledge document.",
      evidence: [{
        subject: "knowledge/notes.md",
        classification: "knowledge",
        finding: "The document was read completely.",
      }],
      confirmation: {
        status: "confirmed",
        authority: "human-product-owner",
        confirmed_at: "2026-07-31T11:02:00Z",
        override: false,
        rationale: "The authority confirms Category 2.",
      },
    };
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

  it("keeps semantic assessment agent-led and fails closed for unresolved or unsafe inputs", async () => {
    const unresolved = await createEmptyProject();
    await mkdir(path.join(unresolved.project, "knowledge"));
    await writeFile(path.join(unresolved.project, "knowledge", "note.md"), "# Note\n");
    expect(inspect(unresolved.project, unresolved.workspace).status).toBe(0);
    const assessmentResult = seal(unresolved.project, unresolved.workspace);
    expect(assessmentResult.status).toBe(1);
    expect(assessmentResult.stderr).toContain("NKF-ONBOARDING-ASSESSMENT-UNRESOLVED");
    const unresolvedPlanPath = path.join(unresolved.workspace, "plan.yaml");
    const unresolvedPlan = YAML.parse(await readFile(unresolvedPlanPath, "utf8"));
    unresolvedPlan.assessment = {
      category: "tiny-knowledge-no-source-or-configuration",
      assessed_by: "test-agent",
      assessed_at: "2026-07-31T11:01:00Z",
      recommendation: "recommended",
      summary: "The agent recommends Category 2 for the complete test snapshot.",
      evidence: [{
        subject: "knowledge/note.md",
        classification: "knowledge",
        finding: "The one document was read completely.",
      }],
      confirmation: {
        status: "confirmed",
        authority: "human-product-owner",
        confirmed_at: "2026-07-31T11:02:00Z",
        override: false,
        rationale: "The test authority confirms Category 2.",
      },
    };
    await writeFile(unresolvedPlanPath, YAML.stringify(unresolvedPlan, { lineWidth: 0 }));
    const representationResult = seal(unresolved.project, unresolved.workspace);
    expect(representationResult.status).toBe(1);
    expect(representationResult.stderr).toContain("NKF-ONBOARDING-PLAN-UNRESOLVED");

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
      mechanically_ready: true,
      state: "workspace-created",
      markdown_files: 21,
    });
    expect(oversizedResult.stdout).not.toContain("NKF-ONBOARDING-DEFER-NKF-014");

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
    expect(JSON.parse(matureResult.stdout).mechanically_ready).toBe(true);
    expect(matureResult.stdout).not.toContain("NKF-ONBOARDING-DEFER-NKF-014");

    const linked = await createEmptyProject();
    await mkdir(path.join(linked.project, "knowledge"));
    await writeFile(path.join(linked.parent, "outside.md"), "# Outside\n");
    await symlink(
      path.join(linked.parent, "outside.md"),
      path.join(linked.project, "knowledge", "linked.md"),
    );
    const linkedResult = inspect(linked.project, linked.workspace);
    expect(JSON.parse(linkedResult.stdout).mechanically_ready).toBe(false);
    expect(JSON.parse(linkedResult.stdout).state).toBe("blocked");
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
    expect(JSON.parse(linkedRootResult.stdout).mechanically_ready).toBe(false);
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
    await resolveAllAsNavigation(duplicate.workspace);
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
    await resolveAllAsNavigation(escaping.workspace);
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
    await resolveCategory2Override(workspace, "package.json");
    expect(seal(project, workspace).status).toBe(0);
    await appendFile(path.join(project, "src/index.ts"), "export const changed = true;\n");
    const sourceDrifted = onboard(project, workspace);
    expect(sourceDrifted.status).toBe(1);
    expect(sourceDrifted.stderr).toContain("NKF-ONBOARDING-INSPECTION-DRIFT");
    await writeFile(path.join(project, "src/index.ts"), sourceBytes);
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
    await resolveCategory2Override(workspace, ".github/workflows/nkf-contracts.yml");
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
    const project = await createProject(validTechnologyFixture0_2);
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
