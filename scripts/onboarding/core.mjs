import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import * as commonmark from "commonmark";
import YAML from "yaml";

const ROOT_PROFILES = new Map([
  ["product", "nkf.profile.product"],
  ["technology", "nkf.profile.technology"],
  ["nkf.profile.product", "nkf.profile.product"],
  ["nkf.profile.technology", "nkf.profile.technology"],
]);
const NON_RECORD_KINDS = new Set([
  "navigation",
  "task",
  "evidence",
  "generated",
  "redirect",
  "other",
]);
const ONBOARDING_CATEGORIES = new Set([
  "empty-repository",
  "tiny-knowledge-no-source-or-configuration",
]);
const ASSESSMENT_RECOMMENDATIONS = new Set([
  "recommended",
  "not-recommended",
  "indeterminate",
]);
const ASSESSMENT_CLASSIFICATIONS = new Set([
  "knowledge",
  "source",
  "configuration",
  "incidental",
  "unresolved",
]);
const PROJECT_SURFACES = [
  { path: ".agents/skills/nkf-authoring/SKILL.md", policy: "exclusive" },
  { path: ".claude/skills/nkf-authoring/SKILL.md", policy: "exclusive" },
  { path: ".github/copilot-instructions.md", policy: "merge" },
  { path: ".github/workflows/nkf-contracts.yml", policy: "exclusive" },
  { path: "AGENTS.md", policy: "merge" },
  { path: "CLAUDE.md", policy: "merge" },
  { path: "GEMINI.md", policy: "merge" },
  { path: "integrations/ai/nkf-authoring-protocol.md", policy: "exclusive" },
  { path: "integrations/ai/nkf-consumer-integration.yaml", policy: "exclusive" },
  { path: "package-lock.json", policy: "preserve" },
  { path: "package.json", policy: "merge" },
  { path: "scripts/verify-nkf-integration.mjs", policy: "exclusive" },
];
const REQUIRED_TOPOLOGY_NON_RECORDS = [
  { path: "README.md", kind: "navigation", title: "Knowledge" },
  { path: "tasks/README.md", kind: "navigation", title: "Tasks" },
  { path: "tasks/by-state/active.md", kind: "generated", title: "Active Tasks" },
  { path: "tasks/by-state/deferred.md", kind: "generated", title: "Deferred Tasks" },
  { path: "tasks/by-state/completed.md", kind: "generated", title: "Completed Tasks" },
  { path: "tasks/by-state/cancelled.md", kind: "generated", title: "Cancelled Tasks" },
  { path: "designs/README.md", kind: "navigation", title: "Designs" },
  { path: "designs/by-disposition/active.md", kind: "generated", title: "Active Designs" },
  { path: "designs/by-disposition/adopted.md", kind: "generated", title: "Adopted Designs" },
  { path: "designs/by-disposition/rejected.md", kind: "generated", title: "Rejected Designs" },
  { path: "designs/by-disposition/superseded.md", kind: "generated", title: "Superseded Designs" },
  { path: "designs/by-disposition/withdrawn.md", kind: "generated", title: "Withdrawn Designs" },
  { path: "decisions/README.md", kind: "navigation", title: "Decisions" },
  { path: "specifications/README.md", kind: "navigation", title: "Specifications" },
  { path: "realizations/README.md", kind: "navigation", title: "Realizations" },
  { path: "evidence/README.md", kind: "evidence", title: "Evidence" },
];

export class OnboardingError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = "OnboardingError";
    this.code = code;
    this.details = details;
  }
}

function fail(code, message, details) {
  throw new OnboardingError(code, message, details);
}

export function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireObject(value, label) {
  if (!isObject(value)) fail("NKF-ONBOARDING-PLAN-INVALID", `${label} must be a mapping.`);
  return value;
}

function requireExactKeys(value, allowed, label) {
  requireObject(value, label);
  const actual = Object.keys(value).sort();
  const expected = [...allowed].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(
      "NKF-ONBOARDING-PLAN-INVALID",
      `${label} keys must be exactly: ${expected.join(", ")}.`,
    );
  }
}

function requireString(value, label) {
  if (typeof value !== "string" || value === "" || value.trim() !== value) {
    fail("NKF-ONBOARDING-PLAN-INVALID", `${label} must be a non-empty trimmed string.`);
  }
  return value;
}

function requireBoolean(value, label) {
  if (typeof value !== "boolean") {
    fail("NKF-ONBOARDING-PLAN-INVALID", `${label} must be a boolean.`);
  }
  return value;
}

function safeRelative(value, label) {
  const result = requireString(value, label);
  if (
    path.isAbsolute(result) ||
    path.win32.isAbsolute(result) ||
    result.includes("\\") ||
    result.split("/").some((part) => part === "" || part === "." || part === "..")
  ) {
    fail("NKF-ONBOARDING-PATH-INVALID", `${label} must be a safe relative path.`);
  }
  return result;
}

function requireIdentifier(value, label) {
  const result = requireString(value, label);
  if (!/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/.test(result)) {
    fail(
      "NKF-ONBOARDING-PLAN-INVALID",
      `${label} must be a lowercase NKF identifier.`,
    );
  }
  return result;
}

function requireSha256(value, label) {
  const result = requireString(value, label);
  if (!/^[0-9a-f]{64}$/.test(result)) {
    fail("NKF-ONBOARDING-PLAN-INVALID", `${label} must be a lowercase SHA-256 value.`);
  }
  return result;
}

function requireUtcInstant(value, label) {
  const result = requireString(value, label);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(result)) {
    fail(
      "NKF-ONBOARDING-PLAN-INVALID",
      `${label} must be an RFC 3339 UTC instant with whole seconds.`,
    );
  }
  const date = new Date(result);
  if (Number.isNaN(date.getTime()) || date.toISOString().replace(".000Z", "Z") !== result) {
    fail("NKF-ONBOARDING-PLAN-INVALID", `${label} is not a real calendar instant.`);
  }
  return result;
}

function currentUtcInstant() {
  return new Date().toISOString().replace(/\.\d{3}Z$/u, "Z");
}

function inside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function utf16Compare(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function serializeYaml(value) {
  return Buffer.from(YAML.stringify(value, { lineWidth: 0 }), "utf8");
}

function serializeJson(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function parseYaml(bytes, label) {
  const document = YAML.parseDocument(bytes.toString("utf8"), { uniqueKeys: true });
  if (document.errors.length > 0) {
    fail(
      "NKF-ONBOARDING-PLAN-INVALID",
      `${label} is invalid YAML: ${document.errors[0].message}`,
    );
  }
  return document.toJS();
}

async function resolveProjectRoot(value) {
  const root = path.resolve(value);
  const stat = await lstat(root).catch(() => null);
  if (stat === null || !stat.isDirectory() || stat.isSymbolicLink()) {
    fail(
      "NKF-ONBOARDING-PROJECT-INVALID",
      "The project root must be an existing non-symbolic-link directory.",
    );
  }
  return realpath(root);
}

async function readRegularNoLinks(root, relative, required = true) {
  const safe = safeRelative(relative, "Path");
  const absolute = path.resolve(root, ...safe.split("/"));
  if (!inside(root, absolute)) fail("NKF-ONBOARDING-PATH-INVALID", `Path escapes: ${safe}`);
  let cursor = root;
  for (const [index, part] of safe.split("/").entries()) {
    cursor = path.join(cursor, part);
    const stat = await lstat(cursor).catch(() => null);
    if (stat === null) {
      if (required) fail("NKF-ONBOARDING-PATH-MISSING", `Required path is missing: ${safe}`);
      return null;
    }
    if (stat.isSymbolicLink()) {
      fail("NKF-ONBOARDING-SYMLINK-PROHIBITED", `Symbolic links are prohibited: ${safe}`);
    }
    if (index < safe.split("/").length - 1 && !stat.isDirectory()) {
      fail("NKF-ONBOARDING-PATH-INVALID", `A path component is not a directory: ${safe}`);
    }
  }
  const stat = await lstat(absolute);
  if (!stat.isFile()) fail("NKF-ONBOARDING-PATH-INVALID", `Path is not a regular file: ${safe}`);
  return readFile(absolute);
}

async function markdownInventory(projectRoot, knowledgeRoot) {
  let absoluteRoot = projectRoot;
  for (const part of knowledgeRoot.split("/")) {
    absoluteRoot = path.join(absoluteRoot, part);
    const stat = await lstat(absoluteRoot).catch(() => null);
    if (stat === null) return { documents: [], diagnostics: [] };
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      return {
        documents: [],
        diagnostics: [{
          code: stat.isSymbolicLink()
            ? "NKF-ONBOARDING-SYMLINK-PROHIBITED"
            : "NKF-ONBOARDING-KNOWLEDGE-ROOT-INVALID",
          path: knowledgeRoot,
          message: "Every knowledge-root path component must be a regular project-contained directory.",
        }],
      };
    }
  }
  const documents = [];
  const diagnostics = [];
  const visit = async (directory, prefix = "") => {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => utf16Compare(left.name, right.name));
    for (const entry of entries) {
      const relative = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
      const absolute = path.join(directory, entry.name);
      const direct = await lstat(absolute);
      if (direct.isSymbolicLink()) {
        diagnostics.push({
          code: "NKF-ONBOARDING-SYMLINK-PROHIBITED",
          path: relative,
          message: "Symbolic links are prohibited inside the onboarding knowledge root.",
        });
        continue;
      }
      if (direct.isDirectory()) {
        await visit(absolute, relative);
        continue;
      }
      if (!direct.isFile() || !relative.endsWith(".md")) continue;
      const bytes = await readFile(absolute);
      try {
        new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      } catch {
        diagnostics.push({
          code: "NKF-ONBOARDING-MARKDOWN-UTF8",
          path: relative,
          message: "Markdown onboarding inputs must be valid UTF-8.",
        });
        continue;
      }
      documents.push({ path: relative, bytes: bytes.length, sha256: sha256(bytes) });
    }
  };
  await visit(absoluteRoot);
  return { documents, diagnostics };
}

// The closed volatile-metadata registry (NKF 0.81, Volatile Metadata
// Registry): exactly these basenames, at any depth, and only as regular
// files. A registered entry is still captured in the manifest — classified
// `volatile` so the participating reviewer sees it — but its bytes and its
// presence are excluded from the snapshot digest the sealed plan binds, so
// preflight tolerates it appearing, changing, or disappearing. No glob, no
// project-declared addition, no content inspection, no `.gitignore`
// authority, and never a deletion. A symbolic link, directory, or special
// entry with a registered basename is not volatile and keeps fail-closed
// drift protection.
const VOLATILE_METADATA_BASENAMES = new Set([".DS_Store", "Thumbs.db", "desktop.ini"]);

function isVolatileEntry(entry) {
  return entry.classification === "volatile";
}

async function projectEntryInventory(projectRoot) {
  const entries = [];
  const diagnostics = [];
  let regularFiles = 0;
  let regularFileBytes = 0;
  const visit = async (directory, prefix = "") => {
    const children = await readdir(directory, { withFileTypes: true });
    children.sort((left, right) => utf16Compare(left.name, right.name));
    for (const child of children) {
      if (prefix === "" && child.name === ".git") continue;
      const relative = prefix === "" ? child.name : `${prefix}/${child.name}`;
      const absolute = path.join(directory, child.name);
      const direct = await lstat(absolute);
      if (direct.isSymbolicLink()) {
        diagnostics.push({
          code: "NKF-ONBOARDING-SYMLINK-PROHIBITED",
          path: relative,
          message: "Symbolic links are prohibited in the initial onboarding project snapshot.",
        });
        entries.push({ path: relative, kind: "symbolic-link" });
        continue;
      }
      if (direct.isDirectory()) {
        entries.push({ path: relative, kind: "directory" });
        await visit(absolute, relative);
        continue;
      }
      if (direct.isFile()) {
        const bytes = await readFile(absolute);
        regularFiles += 1;
        regularFileBytes += bytes.length;
        entries.push({
          path: relative,
          kind: "file",
          bytes: bytes.length,
          sha256: sha256(bytes),
          ...(VOLATILE_METADATA_BASENAMES.has(child.name) ? { classification: "volatile" } : {}),
        });
        continue;
      }
      diagnostics.push({
        code: "NKF-ONBOARDING-SPECIAL-FILE-PROHIBITED",
        path: relative,
        message: "Special filesystem entries are prohibited in the initial onboarding project snapshot.",
      });
      entries.push({ path: relative, kind: "special" });
    }
  };
  await visit(projectRoot);
  return { entries, diagnostics, regularFiles, regularFileBytes };
}

function gitState(projectRoot) {
  let topLevel;
  try {
    topLevel = execFileSync("git", ["-C", projectRoot, "rev-parse", "--show-toplevel"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return {
      repository: false,
      project_is_repository_root: null,
      default_branch: "master",
    };
  }
  let branch = "master";
  try {
    const observed = execFileSync(
      "git",
      ["-C", projectRoot, "symbolic-ref", "--short", "HEAD"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (/^[A-Za-z0-9._/-]+$/.test(observed) && !observed.includes("..")) {
      branch = observed;
    }
  } catch {
    // Detached or otherwise unresolved branches receive the adopter fallback.
  }
  return {
    repository: true,
    project_is_repository_root: path.resolve(topLevel) === projectRoot,
    default_branch: branch,
  };
}

async function workflowSurfacePaths(projectRoot) {
  let workflowRoot = projectRoot;
  for (const part of [".github", "workflows"]) {
    workflowRoot = path.join(workflowRoot, part);
    const stat = await lstat(workflowRoot).catch(() => null);
    if (stat === null) return [];
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      fail(
        stat.isSymbolicLink()
          ? "NKF-ONBOARDING-SYMLINK-PROHIBITED"
          : "NKF-ONBOARDING-PATH-INVALID",
        ".github/workflows and its parent must be regular directories when they exist.",
      );
    }
  }
  const result = [];
  for (const entry of await readdir(workflowRoot, { withFileTypes: true })) {
    if (!entry.isFile() || !/\.ya?ml$/i.test(entry.name)) continue;
    const relative = `.github/workflows/${entry.name}`;
    if (!PROJECT_SURFACES.some((surface) => surface.path === relative)) {
      result.push({ path: relative, policy: "preserve" });
    }
  }
  return result;
}

async function projectSurfaceInventory(projectRoot) {
  const definitions = [...PROJECT_SURFACES, ...(await workflowSurfacePaths(projectRoot))]
    .sort((left, right) => utf16Compare(left.path, right.path));
  const surfaces = [];
  const diagnostics = [];
  let packageScripts = [];
  for (const definition of definitions) {
    const bytes = await readRegularNoLinks(projectRoot, definition.path, false);
    if (bytes === null) {
      surfaces.push({ ...definition, state: "absent" });
      continue;
    }
    surfaces.push({
      ...definition,
      state: "file",
      bytes: bytes.length,
      sha256: sha256(bytes),
    });
    if (definition.path === "package.json") {
      try {
        const manifest = JSON.parse(bytes.toString("utf8"));
        if (!isObject(manifest) || (manifest.scripts !== undefined && !isObject(manifest.scripts))) {
          throw new Error("package.json or its scripts field is not an object");
        }
        packageScripts = Object.keys(manifest.scripts ?? {}).sort(utf16Compare);
      } catch (error) {
        diagnostics.push({
          code: "NKF-ONBOARDING-PACKAGE-INVALID",
          path: "package.json",
          message: `The existing package manifest cannot be integrated: ${error.message}.`,
        });
      }
    }
  }
  return { surfaces, packageScripts, diagnostics };
}

function snapshotDigest(knowledgeRoot, documents, projectEntries, projectSurfaces, git) {
  // Volatile operating-system metadata is listed for the reviewer but bound
  // by neither its bytes nor its presence.
  return sha256(Buffer.from(JSON.stringify({
    knowledge_root: knowledgeRoot,
    documents,
    project_entries: projectEntries.filter((entry) => !isVolatileEntry(entry)),
    project_surfaces: projectSurfaces,
    git,
  }), "utf8"));
}

export async function inspectOnboardingProject(projectRootInput, knowledgeRootInput = "knowledge") {
  const projectRoot = await resolveProjectRoot(projectRootInput);
  const knowledgeRoot = safeRelative(knowledgeRootInput, "knowledge_root");
  if (knowledgeRoot === ".nourd" || knowledgeRoot.startsWith(".nourd/")) {
    fail(
      "NKF-ONBOARDING-KNOWLEDGE-ROOT-INVALID",
      "The knowledge root cannot be inside the project-root .nourd directory.",
    );
  }
  const diagnostics = [];
  const nourd = await lstat(path.join(projectRoot, ".nourd")).catch(() => null);
  if (nourd !== null) {
    diagnostics.push({
      code: "NKF-ONBOARDING-ALREADY-ADOPTED",
      path: ".nourd",
      message: "The project already contains .nourd; use authoring or an explicit migration workflow.",
    });
  }
  const inventory = await markdownInventory(projectRoot, knowledgeRoot);
  diagnostics.push(...inventory.diagnostics);
  const projectEntries = await projectEntryInventory(projectRoot);
  diagnostics.push(...projectEntries.diagnostics);
  const projectState = await projectSurfaceInventory(projectRoot);
  diagnostics.push(...projectState.diagnostics);
  const observedGit = gitState(projectRoot);
  if (observedGit.repository && !observedGit.project_is_repository_root) {
    diagnostics.push({
      code: "NKF-ONBOARDING-GIT-ROOT-MISMATCH",
      message: "The selected project must be the Git repository root when it is inside a Git worktree.",
    });
  }
  const totalBytes = inventory.documents.reduce((sum, item) => sum + item.bytes, 0);
  const snapshotSha256 = snapshotDigest(
    knowledgeRoot,
    inventory.documents,
    projectEntries.entries,
    projectState.surfaces,
    observedGit,
  );
  return {
    contract: "nkf.onboarding-inspection",
    nkf_version: "0.81",
    mechanically_ready: diagnostics.length === 0,
    knowledge_root: knowledgeRoot,
    observed: {
      project_entries: projectEntries.entries.length,
      regular_files: projectEntries.regularFiles,
      regular_file_bytes: projectEntries.regularFileBytes,
      markdown_files: inventory.documents.length,
      markdown_total_bytes: totalBytes,
    },
    documents: inventory.documents,
    project_entries: projectEntries.entries,
    project_surfaces: projectState.surfaces,
    package_scripts: projectState.packageScripts,
    git: observedGit,
    snapshot_sha256: snapshotSha256,
    diagnostics,
  };
}

function profile(value) {
  const resolved = ROOT_PROFILES.get(value);
  if (resolved === undefined) {
    fail(
      "NKF-ONBOARDING-PROFILE-INVALID",
      "Profile must be product, technology, nkf.profile.product, or nkf.profile.technology.",
    );
  }
  return resolved;
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function unusedPath(preferred, occupied) {
  if (!occupied.has(preferred)) return preferred;
  const extension = path.posix.extname(preferred);
  const base = preferred.slice(0, -extension.length);
  for (let index = 2; index < 1000; index += 1) {
    const candidate = `${base}-${index}${extension}`;
    if (!occupied.has(candidate)) return candidate;
  }
  fail("NKF-ONBOARDING-PATH-INVALID", `No available scaffold path for ${preferred}.`);
}

export async function createOnboardingWorkspace(options) {
  const projectRoot = await resolveProjectRoot(options.projectRoot);
  const inspection = await inspectOnboardingProject(projectRoot, options.knowledgeRoot);
  const outputRoot = path.resolve(options.outputRoot);
  if (inside(projectRoot, outputRoot)) {
    fail(
      "NKF-ONBOARDING-WORKSPACE-INVALID",
      "The onboarding workspace must be outside the project so inspection does not mutate it.",
    );
  }
  const outputStat = await lstat(outputRoot).catch(() => null);
  if (outputStat !== null) {
    if (!outputStat.isDirectory() || (await readdir(outputRoot)).length > 0) {
      fail(
        "NKF-ONBOARDING-WORKSPACE-INVALID",
        "The onboarding workspace output must not exist or must be an empty directory.",
      );
    }
  }
  await mkdir(outputRoot, { recursive: true });
  await writeFile(path.join(outputRoot, "inspection.json"), serializeJson(inspection), { flag: "wx" });
  if (!inspection.mechanically_ready) {
    return { inspection, plan: null, workspace: outputRoot };
  }

  const rootProfile = profile(options.profile);
  const rootId = requireIdentifier(options.rootId, "root_id");
  const rootTitle = requireString(options.rootTitle, "root_title");
  const taskId = requireString(options.taskId, "task_id");
  if (slug(taskId) === "") {
    fail("NKF-ONBOARDING-PLAN-INVALID", "task_id must contain at least one letter or number.");
  }
  const authority = requireIdentifier(options.authority ?? "human-product-owner", "authority");
  const createdAt = requireUtcInstant(options.createdAt, "created_at");
  const occupied = new Set(inspection.documents.map((item) => item.path));
  const kind = rootProfile === "nkf.profile.product" ? "product" : "technology";
  const mapPath = "README.md";
  const rootPath = unusedPath(`${kind}.md`, occupied);
  occupied.add(rootPath);
  const realizationPath = "realizations/current-system.md";
  if (occupied.has(realizationPath)) {
    fail(
      "NKF-ONBOARDING-PATH-CONFLICT",
      "Initial onboarding cannot replace an existing consolidated current-system path; resolve its meaning before onboarding.",
    );
  }
  occupied.add(realizationPath);
  const taskPath = unusedPath(`tasks/items/${slug(taskId)}-onboard-nkf.md`, occupied);
  occupied.add(taskPath);
  const specificationPath = kind === "technology"
    ? unusedPath("specifications/initial-specification.md", occupied)
    : null;

  for (const document of inspection.documents) {
    const source = path.join(projectRoot, ...inspection.knowledge_root.split("/"), ...document.path.split("/"));
    const target = path.join(outputRoot, "candidate", ...document.path.split("/"));
    await mkdir(path.dirname(target), { recursive: true });
    const sourceBytes = await readFile(source);
    const candidateBytes = document.path.endsWith(".md")
      ? ensureEnvelopeTitle(sourceBytes)
      : sourceBytes;
    await writeFile(target, candidateBytes, { flag: "wx" });
  }
  const plan = {
    contract: "nkf.onboarding-plan",
    nkf_version: "0.81",
    inspection: {
      knowledge_root: inspection.knowledge_root,
      snapshot_sha256: inspection.snapshot_sha256,
    },
    assessment: {
      category: "unresolved",
      assessed_by: null,
      assessed_at: null,
      recommendation: "unresolved",
      summary: "",
      evidence: [],
      confirmation: { status: "unresolved" },
    },
    project: {
      profile: rootProfile,
      root: { id: rootId, title: rootTitle },
      task: { id: taskId, title: `${taskId}: Onboard ${rootTitle} To NKF` },
      authority,
      created_at: createdAt,
      canonical_terms: [],
    },
    scaffold: {
      knowledge_map: mapPath,
      root_record: rootPath,
      current_system_realization: realizationPath,
      onboarding_task: taskPath,
      initial_specification: specificationPath,
    },
    documents: inspection.documents.map((document) => ({
      path: document.path,
      original_sha256: document.sha256,
      candidate_path: `candidate/${document.path}`,
      candidate_sha256: document.sha256,
      representation: { kind: "unresolved" },
    })),
  };
  await writeFile(path.join(outputRoot, "plan.yaml"), serializeYaml(plan), { flag: "wx" });
  return { inspection, plan, workspace: outputRoot };
}

async function readPlan(planPathInput) {
  const planPath = path.resolve(planPathInput);
  const stat = await lstat(planPath).catch(() => null);
  if (stat === null || !stat.isFile() || stat.isSymbolicLink()) {
    fail("NKF-ONBOARDING-PLAN-INVALID", "The onboarding plan must be a regular file.");
  }
  const bytes = await readFile(planPath);
  return { planPath, workspaceRoot: path.dirname(planPath), bytes, plan: parseYaml(bytes, "Plan") };
}

function validatePlanEnvelope(plan) {
  requireExactKeys(
    plan,
    ["contract", "nkf_version", "inspection", "assessment", "project", "scaffold", "documents"],
    "plan",
  );
  if (plan.contract !== "nkf.onboarding-plan" || plan.nkf_version !== "0.81") {
    fail("NKF-ONBOARDING-PLAN-INVALID", "The plan must be an NKF 0.4 onboarding plan.");
  }
  requireExactKeys(plan.inspection, ["knowledge_root", "snapshot_sha256"], "inspection");
  safeRelative(plan.inspection.knowledge_root, "inspection.knowledge_root");
  requireSha256(plan.inspection.snapshot_sha256, "inspection.snapshot_sha256");
  requireExactKeys(
    plan.assessment,
    ["category", "assessed_by", "assessed_at", "recommendation", "summary", "evidence", "confirmation"],
    "assessment",
  );
  if (!Array.isArray(plan.assessment.evidence)) {
    fail("NKF-ONBOARDING-PLAN-INVALID", "assessment.evidence must be an array.");
  }
  requireObject(plan.assessment.confirmation, "assessment.confirmation");
  requireExactKeys(
    plan.project,
    ["profile", "root", "task", "authority", "created_at", "canonical_terms"],
    "project",
  );
  plan.project.profile = profile(plan.project.profile);
  requireExactKeys(plan.project.root, ["id", "title"], "project.root");
  requireIdentifier(plan.project.root.id, "project.root.id");
  requireString(plan.project.root.title, "project.root.title");
  requireExactKeys(plan.project.task, ["id", "title"], "project.task");
  requireString(plan.project.task.id, "project.task.id");
  requireString(plan.project.task.title, "project.task.title");
  requireIdentifier(plan.project.authority, "project.authority");
  requireUtcInstant(plan.project.created_at, "project.created_at");
  if (!Array.isArray(plan.project.canonical_terms)) {
    fail("NKF-ONBOARDING-PLAN-INVALID", "project.canonical_terms must be an array.");
  }
  for (const [index, term] of plan.project.canonical_terms.entries()) {
    requireString(term, `project.canonical_terms[${index}]`);
  }
  if (new Set(plan.project.canonical_terms).size !== plan.project.canonical_terms.length) {
    fail("NKF-ONBOARDING-PLAN-INVALID", "project.canonical_terms must be unique.");
  }
  requireExactKeys(
    plan.scaffold,
    ["knowledge_map", "root_record", "current_system_realization", "onboarding_task", "initial_specification"],
    "scaffold",
  );
  for (const field of [
    "knowledge_map",
    "root_record",
    "current_system_realization",
    "onboarding_task",
  ]) safeRelative(plan.scaffold[field], `scaffold.${field}`);
  if (plan.project.profile === "nkf.profile.technology") {
    safeRelative(plan.scaffold.initial_specification, "scaffold.initial_specification");
  } else if (plan.scaffold.initial_specification !== null) {
    fail(
      "NKF-ONBOARDING-PLAN-INVALID",
      "Product onboarding must set scaffold.initial_specification to null.",
    );
  }
  if (!Array.isArray(plan.documents)) {
    fail("NKF-ONBOARDING-PLAN-INVALID", "documents must be an array.");
  }
}

function validateResolvedAssessment(assessment, inspection, projectAuthority) {
  if (!ONBOARDING_CATEGORIES.has(assessment.category)) {
    fail(
      "NKF-ONBOARDING-ASSESSMENT-UNRESOLVED",
      "The agent-led assessment must select Empty Repository or Tiny Knowledge With No Source Or Configuration.",
    );
  }
  requireIdentifier(assessment.assessed_by, "assessment.assessed_by");
  requireUtcInstant(assessment.assessed_at, "assessment.assessed_at");
  if (!ASSESSMENT_RECOMMENDATIONS.has(assessment.recommendation)) {
    fail(
      "NKF-ONBOARDING-ASSESSMENT-UNRESOLVED",
      "assessment.recommendation must be recommended, not-recommended, or indeterminate.",
    );
  }
  requireString(assessment.summary, "assessment.summary");
  for (const [index, entry] of assessment.evidence.entries()) {
    requireExactKeys(entry, ["subject", "classification", "finding"], `assessment.evidence[${index}]`);
    requireString(entry.subject, `assessment.evidence[${index}].subject`);
    if (!ASSESSMENT_CLASSIFICATIONS.has(entry.classification)) {
      fail(
        "NKF-ONBOARDING-PLAN-INVALID",
        `assessment.evidence[${index}].classification is unsupported.`,
      );
    }
    requireString(entry.finding, `assessment.evidence[${index}].finding`);
  }
  if (
    assessment.evidence.length === 0 &&
    (assessment.category !== "empty-repository" ||
      inspection.project_entries.some((entry) => !isVolatileEntry(entry)))
  ) {
    fail(
      "NKF-ONBOARDING-ASSESSMENT-UNRESOLVED",
      "The assessment must include evidence for a non-empty project snapshot.",
    );
  }
  if (assessment.category === "empty-repository") {
    if (assessment.recommendation !== "recommended") {
      fail(
        "NKF-ONBOARDING-ASSESSMENT-UNRESOLVED",
        "Empty Repository may proceed automatically only with a recommended agent assessment.",
      );
    }
    requireExactKeys(assessment.confirmation, ["status"], "assessment.confirmation");
    if (assessment.confirmation.status !== "not-required") {
      fail(
        "NKF-ONBOARDING-CONFIRMATION-REQUIRED",
        "Empty Repository must use confirmation status not-required.",
      );
    }
    return;
  }
  requireExactKeys(
    assessment.confirmation,
    ["status", "authority", "confirmed_at", "override", "rationale"],
    "assessment.confirmation",
  );
  if (assessment.confirmation.status !== "confirmed") {
    fail(
      "NKF-ONBOARDING-CONFIRMATION-REQUIRED",
      "Tiny Knowledge With No Source Or Configuration requires explicit human confirmation.",
    );
  }
  requireIdentifier(assessment.confirmation.authority, "assessment.confirmation.authority");
  if (assessment.confirmation.authority !== projectAuthority) {
    fail(
      "NKF-ONBOARDING-CONFIRMATION-REQUIRED",
      "Category 2 confirmation authority must match the declared project authority.",
    );
  }
  const confirmedAt = requireUtcInstant(
    assessment.confirmation.confirmed_at,
    "assessment.confirmation.confirmed_at",
  );
  if (new Date(confirmedAt).getTime() < new Date(assessment.assessed_at).getTime()) {
    fail(
      "NKF-ONBOARDING-CONFIRMATION-REQUIRED",
      "Category 2 confirmation cannot predate the agent assessment.",
    );
  }
  const override = requireBoolean(assessment.confirmation.override, "assessment.confirmation.override");
  requireString(assessment.confirmation.rationale, "assessment.confirmation.rationale");
  if (assessment.recommendation === "recommended" && override) {
    fail(
      "NKF-ONBOARDING-PLAN-INVALID",
      "A recommended Category 2 assessment must not be marked as an override.",
    );
  }
  if (assessment.recommendation !== "recommended" && !override) {
    fail(
      "NKF-ONBOARDING-CONFIRMATION-REQUIRED",
      "A negative or indeterminate Category 2 assessment requires an explicit human override.",
    );
  }
}

export async function sealOnboardingPlan(projectRootInput, planPathInput) {
  const projectRoot = await resolveProjectRoot(projectRootInput);
  const loaded = await readPlan(planPathInput);
  validatePlanEnvelope(loaded.plan);
  validateOnboardingTopologyPlan(loaded.plan);
  const inspection = await inspectOnboardingProject(projectRoot, loaded.plan.inspection.knowledge_root);
  if (!inspection.mechanically_ready || inspection.snapshot_sha256 !== loaded.plan.inspection.snapshot_sha256) {
    fail(
      "NKF-ONBOARDING-INSPECTION-DRIFT",
      "The project no longer matches the mechanical snapshot bound by the plan.",
      { diagnostics: inspection.diagnostics },
    );
  }
  validateResolvedAssessment(loaded.plan.assessment, inspection, loaded.plan.project.authority);
  for (const [index, item] of loaded.plan.documents.entries()) {
    requireObject(item, `documents[${index}]`);
    safeRelative(item.candidate_path, `documents[${index}].candidate_path`);
    const bytes = await readRegularNoLinks(loaded.workspaceRoot, item.candidate_path);
    item.candidate_sha256 = sha256(bytes);
  }
  const sealed = serializeYaml(loaded.plan);
  await validateLoadedPlan(projectRoot, { ...loaded, bytes: sealed }, inspection);
  await writeFile(loaded.planPath, sealed);
  return {
    contract: "nkf.onboarding-plan-seal-result",
    nkf_version: "0.81",
    state: "sealed",
    plan_sha256: sha256(sealed),
    documents: loaded.plan.documents.length,
  };
}

function section(id, heading, role, responsibility = id) {
  return {
    id,
    heading_path: [heading],
    occurrence: 1,
    authority: "proposal",
    role,
    responsibilities: [responsibility],
  };
}

function frontmatter(values) {
  return `---\n${YAML.stringify(values, { lineWidth: 0 }).trimEnd()}\n---\n\n`;
}

function rootScaffold(plan, kind) {
  const { id, title } = plan.project.root;
  const common = {
    id,
    type: kind,
    title,
    summary: `Provides the initial Draft ${kind === "product" ? "Product" : "Technology"} orientation for ${title} without inventing accepted meaning.`,
    created_at: plan.project.created_at,
  };
  if (kind === "product") {
    const headings = [
      ["Product Definition", `${title} is the selected Draft Product knowledge root. Its accepted definition remains unresolved.`],
      ["Purpose", "The Product purpose remains unresolved until Product authority supplies and accepts it."],
      ["Vision", "The Product vision remains unresolved until Product authority supplies and accepts it."],
      ["People Served", "The people served remain unresolved until Product authority identifies them."],
      ["Needs And Outcomes", "Needs and intended outcomes remain unresolved and are not inferred from source code or filenames."],
      ["Boundaries", "External systems retain authority for their own data, permissions, and operations."],
      ["Product Map", "The knowledge map and current-system Realization provide the initial navigable context."],
    ];
    return Buffer.from(`${frontmatter(common)}# ${title}\n\n${headings.map(([heading, body]) => `## ${heading}\n\n${body}\n`).join("\n")}`, "utf8");
  }
  const headings = [
    ["Technology Definition", `${title} is the selected Draft Technology knowledge root. Its accepted definition remains unresolved.`],
    ["Purpose And Problem", "The reusable technical problem and purpose remain unresolved until Technology authority supplies them."],
    ["Consumers And Use Contexts", "Consumers and use contexts remain unresolved and are not inferred from repository contents."],
    ["Capabilities And Contracts", "The initial Draft Specification makes the required contract boundary visible without accepting it."],
    ["Scope Authority And Boundaries", "The Technology owns only meaning deliberately accepted by its authority and does not own consumer meaning or live operational state."],
    ["Technology Map", "The knowledge map, Draft Specification, and current-system Realization provide the initial navigable context."],
    ["Versioning Compatibility And Migration", "Compatibility and migration policy remain unresolved until accepted Technology meaning exists."],
    ["Distribution Support And Security", "Distribution, support, and security obligations remain unresolved and no secret is introduced by this scaffold."],
    ["Evolution And Retirement", "Evolution and retirement require later governed Tasks, Designs, Decisions, Specifications, Realizations, and Validation as applicable."],
  ];
  return Buffer.from(`${frontmatter(common)}# ${title}\n\n${headings.map(([heading, body]) => `## ${heading}\n\n${body}\n`).join("\n")}`, "utf8");
}

function realizationScaffold(plan) {
  const title = `${plan.project.root.title} Current System`;
  const values = {
    id: `${plan.project.root.id}-current-system`,
    type: "realization",
    title,
    summary: `Provides the initial unconfirmed current-system view for ${plan.project.root.title} without reconstructing implementation from source.`,
    created_at: plan.project.created_at,
  };
  const sections = [
    ["Realization Identity And Kind", `This is the initial consolidated current-system Realization for ${plan.project.root.title}.`],
    ["Governed Meaning Realized", "Onboarding did not establish accepted meaning or an accepted implementation mapping."],
    ["Durable Mapping", "No implementation artifact is bound by this initial scaffold. Existing source files, if any, were not interpreted."],
    ["Responsibilities And Ownership Boundaries", "Project authority owns semantic acceptance. The onboarder owns only deterministic scaffold and integration mechanics."],
    ["Interfaces Dependencies Locators And Resolution", "The knowledge map links this Realization to the Draft root and onboarding Task."],
    ["External Authority And Operational State Boundaries", "External systems and live operational state remain outside this Realization."],
    ["Compatibility Verification And Recovery", "The pinned checker verifies the candidate snapshot. Validation does not confirm this Realization."],
  ];
  return Buffer.from(`${frontmatter(values)}# ${title}\n\n${sections.map(([heading, body]) => `## ${heading}\n\n${body}\n`).join("\n")}`, "utf8");
}

function specificationScaffold(plan) {
  const title = `${plan.project.root.title} Initial Specification`;
  const values = {
    id: `${plan.project.root.id}-initial-specification`,
    type: "specification",
    title,
    summary: `Makes the required Draft Specification boundary visible for ${plan.project.root.title} without inventing accepted normative meaning.`,
    created_at: plan.project.created_at,
  };
  const sections = [
    ["Specification Definition", "This Draft reserves the initial Technology Specification boundary. No normative contract is accepted by this scaffold."],
    ["Authority And Normative Status", "The Specification remains Draft and cannot govern consumers until the owning authority accepts an exact revision."],
    ["Scope And Applicability", "Scope and applicability remain unresolved."],
    ["Model Vocabulary And Semantics", "Vocabulary and semantics remain unresolved."],
    ["Requirements Constraints And Interfaces", "Requirements, constraints, and interfaces remain unresolved."],
    ["Validation And Conformance", "The checker validates structural conformance only and cannot accept this Draft."],
    ["Versioning Compatibility And Migration", "Versioning, compatibility, and migration remain unresolved."],
    ["Security Authority And Operational Boundaries", "No secret, external authority, or live operational state is defined here."],
    ["Unresolved And Deferred Matters", "All substantive Technology contract meaning remains unresolved for later governed work."],
  ];
  return Buffer.from(`${frontmatter(values)}# ${title}\n\n${sections.map(([heading, body]) => `## ${heading}\n\n${body}\n`).join("\n")}`, "utf8");
}

function taskScaffold(plan) {
  const values = {
    title: plan.project.task.title,
    summary: `Tracks project-authority review and completion of the initial NKF onboarding candidate for ${plan.project.root.title}.`,
    created_at: plan.project.created_at,
  };
  return Buffer.from(`${frontmatter(values)}# ${plan.project.task.title}\n\nThis Task owns review of the Draft root, unresolved meaning, current-system\nRealization, and the exact candidate produced by onboarding.\n\n## Acceptance Criteria\n\n- Project authority reviews every Draft and unresolved statement.\n- Later accepted meaning follows the governed NKF lifecycle.\n- Validation remains separate from acceptance and Realization confirmation.\n\n## Decision Applicability\n\n### Applicable Decisions\n\nNo accepted decision applies to this Task.\n\n### Mandatory Capabilities\n\nNo mandatory capability is implicated by this Task.\n`, "utf8");
}

function topologyLink(from, target, label) {
  const destination = path.posix.relative(path.posix.dirname(from), target) || path.posix.basename(target);
  return `- [${label}](${destination})`;
}

function navigationBlock(plan) {
  const links = [
    topologyLink("README.md", plan.scaffold.root_record, "Draft Root"),
    topologyLink("README.md", "tasks/README.md", "Tasks"),
    topologyLink("README.md", "designs/README.md", "Designs"),
    topologyLink("README.md", "decisions/README.md", "Decisions"),
    topologyLink("README.md", "specifications/README.md", "Specifications"),
    topologyLink("README.md", "realizations/README.md", "Realizations"),
    topologyLink("README.md", "realizations/current-system.md", "Current System"),
    topologyLink("README.md", "evidence/README.md", "Evidence"),
    topologyLink("README.md", plan.scaffold.onboarding_task, "Active Onboarding Task"),
  ];
  if (plan.scaffold.initial_specification !== null) {
    links.push(topologyLink("README.md", plan.scaffold.initial_specification, "Initial Draft Specification"));
  }
  return `<!-- nkf-navigation:start -->\n## NKF Navigation\n\n${links.join("\n")}\n<!-- nkf-navigation:end -->`;
}

function validateOnboardingTopologyPlan(plan) {
  if (
    plan.scaffold.knowledge_map !== "README.md" ||
    plan.scaffold.current_system_realization !== "realizations/current-system.md" ||
    !plan.scaffold.onboarding_task.startsWith("tasks/items/")
  ) {
    fail("NKF-ONBOARDING-PLAN-INVALID", "The plan does not select the required portable topology paths.");
  }
  const blockTargets = markdownLinkTargets("README.md", Buffer.from(navigationBlock(plan), "utf8"));
  for (const target of [
    plan.scaffold.onboarding_task,
    ...(plan.scaffold.initial_specification === null ? [] : [plan.scaffold.initial_specification]),
  ]) {
    if (blockTargets.filter((candidate) => candidate === target).length !== 1) {
      fail("NKF-ONBOARDING-PLAN-INVALID", `The generated onboarding map target is invalid: ${target}.`);
    }
  }
}

function countLiteralLines(text, literal) {
  return text.split(/\r?\n/).filter((line) => line === literal).length;
}

function reconcileNavigationMap(existingBytes, block) {
  const existing = existingBytes.toString("utf8");
  const startLine = "<!-- nkf-navigation:start -->";
  const endLine = "<!-- nkf-navigation:end -->";
  const startCount = countLiteralLines(existing, startLine);
  const endCount = countLiteralLines(existing, endLine);
  if (startCount > 1 || endCount > 1 || startCount !== endCount) {
    fail("NKF-ONBOARDING-PATH-CONFLICT", "README.md contains ambiguous NKF navigation markers.");
  }
  if (startCount === 0) {
    const separator = existing === "" || existing.endsWith("\n\n") ? "" : existing.endsWith("\n") ? "\n" : "\n\n";
    return Buffer.from(`${existing}${separator}${block}\n`, "utf8");
  }
  const startPattern = new RegExp(`(^|\\r?\\n)${startLine.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\r?\\n`);
  const startMatch = startPattern.exec(existing);
  const endPattern = new RegExp(`(^|\\r?\\n)${endLine.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=\\r?\\n|$)`);
  const endMatch = endPattern.exec(existing);
  if (startMatch === null || endMatch === null || endMatch.index <= startMatch.index) {
    fail("NKF-ONBOARDING-PATH-CONFLICT", "README.md contains reversed or nested NKF navigation markers.");
  }
  const prefixEnd = startMatch.index + startMatch[1].length;
  const suffixStart = endMatch.index + endMatch[1].length + endLine.length;
  return Buffer.from(`${existing.slice(0, prefixEnd)}${block}${existing.slice(suffixStart)}`, "utf8");
}

function mapScaffold(plan) {
  const title = `${plan.project.root.title} Knowledge`;
  const values = {
    title,
    summary: `Provides navigation to the initial governed knowledge for ${plan.project.root.title}.`,
    created_at: plan.project.created_at,
  };
  return Buffer.from(`${frontmatter(values)}# ${title}\n\nBegin with the current-system Realization, then follow Draft or preserved\nknowledge only as its declared authority permits.\n\n${navigationBlock(plan)}\n`, "utf8");
}

function predecessorFrontmatter(values) {
  return `---\n${YAML.stringify(values, { lineWidth: 0 }).trimEnd()}\n---\n\n`;
}

function predecessorMapScaffold(plan, existingPaths) {
  const title = `${plan.project.root.title} Knowledge`;
  const values = {
    title,
    summary: `Provides navigation to the initial governed knowledge for ${plan.project.root.title}.`,
    created_at: plan.project.created_at,
  };
  const links = [
    [plan.scaffold.root_record, "Draft Root"],
    [plan.scaffold.current_system_realization, "Current System Realization"],
    [plan.scaffold.onboarding_task, "Onboarding Task"],
  ];
  if (plan.scaffold.initial_specification !== null) {
    links.splice(1, 0, [plan.scaffold.initial_specification, "Initial Draft Specification"]);
  }
  for (const existing of existingPaths) links.push([existing, `Preserved ${existing}`]);
  return Buffer.from(`${predecessorFrontmatter(values)}# ${title}\n\nBegin with the current-system Realization, then follow Draft or preserved\nknowledge only as its declared authority permits.\n\n## Knowledge Map\n\n${links.map(([target, label]) => topologyLink(plan.scaffold.knowledge_map, target, label)).join("\n")}\n`, "utf8");
}

function markdownLinkTargets(sourcePath, bytes) {
  const parser = new commonmark.Parser();
  const walker = parser.parse(bytes.toString("utf8")).walker();
  const targets = [];
  let event;
  while ((event = walker.next()) !== null) {
    if (!event.entering || event.node.type !== "link") continue;
    const destination = event.node.destination;
    if (
      typeof destination !== "string" ||
      destination === "" ||
      path.posix.isAbsolute(destination) ||
      destination.startsWith("//") ||
      /^[A-Za-z][A-Za-z0-9+.-]*:/.test(destination) ||
      /[?#%\\]/.test(destination)
    ) continue;
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), destination));
    if (resolved === ".." || resolved.startsWith("../") || path.posix.isAbsolute(resolved)) continue;
    targets.push(resolved.endsWith("/") ? resolved.slice(0, -1) : resolved);
  }
  return targets;
}

function reconcileIndex(existingBytes, indexPath, expectedTargets) {
  const links = markdownLinkTargets(indexPath, existingBytes);
  const missing = [];
  for (const target of expectedTargets) {
    const observed = links.filter((candidate) => candidate === target).length;
    if (observed > 1) {
      fail("NKF-ONBOARDING-PATH-CONFLICT", `${indexPath} links ${target} more than once.`);
    }
    if (observed === 0) missing.push(target);
  }
  if (missing.length === 0) return existingBytes;
  const existing = existingBytes.toString("utf8");
  const separator = existing === "" || existing.endsWith("\n\n") ? "" : existing.endsWith("\n") ? "\n" : "\n\n";
  const additions = missing.map((target) => topologyLink(indexPath, target, path.posix.basename(target) === "README.md" ? path.posix.basename(path.posix.dirname(target)) || "Knowledge" : path.posix.basename(target, ".md")));
  return Buffer.from(`${existing}${separator}## NKF Index\n\n${additions.join("\n")}\n`, "utf8");
}

function indexScaffold(plan, definition, expectedTargets) {
  const values = {
    title: definition.title,
    summary: `Provides the required NKF navigation index for ${definition.title}.`,
    created_at: plan.project.created_at,
  };
  const body = expectedTargets.length === 0
    ? "No applicable item is currently represented."
    : expectedTargets.map((target) => topologyLink(definition.path, target, path.posix.basename(target) === "README.md" ? path.posix.basename(path.posix.dirname(target)) || "Knowledge" : path.posix.basename(target, ".md"))).join("\n");
  return Buffer.from(`${frontmatter(values)}# ${definition.title}\n\n${body}\n`, "utf8");
}

function ensureEnvelopeTitle(bytes) {
  const text = bytes.toString("utf8");
  const lines = text.split("\n");
  if (lines[0] !== "---") return bytes;
  const end = lines.indexOf("---", 1);
  if (end < 0) return bytes;
  const h1 = lines.slice(end + 1).find((line) => line.startsWith("# "));
  if (h1 === undefined) return bytes;
  const title = h1.slice(2).trim();
  const serialized = YAML.stringify({ title }, { lineWidth: 0 }).trimEnd();
  const index = lines.findIndex((line, at) => at > 0 && at < end && /^title:/.test(line));
  if (index === -1) {
    lines.splice(1, 0, serialized);
    return Buffer.from(lines.join("\n"), "utf8");
  }
  const current = lines[index];
  if (current === serialized) return bytes;
  lines[index] = serialized;
  return Buffer.from(lines.join("\n"), "utf8");
}

function sourceFrontmatter(bytes, sourcePath) {
  const text = bytes.toString("utf8");
  const lines = text.split(/\r?\n/);
  if (lines[0] !== "---") return null;
  const end = lines.indexOf("---", 1);
  if (end < 0) return null;
  try {
    const value = YAML.parse(lines.slice(1, end).join("\n"));
    return isObject(value) ? value : null;
  } catch {
    fail("NKF-ONBOARDING-PLAN-INVALID", `Cannot parse frontmatter needed for topology: ${sourcePath}.`);
  }
}

function topologyIndexTargets(declarations, nonRecords, sourceBytes) {
  const uniqueSorted = (values) => [...new Set(values)].sort(utf16Compare);
  const tasksByStatus = { active: [], deferred: [], completed: [], cancelled: [] };
  for (const item of nonRecords.filter((entry) => entry.kind === "task")) {
    const status = item.document?.state?.value;
    if (Object.hasOwn(tasksByStatus, status)) tasksByStatus[status].push(item.path);
  }
  const designsByDisposition = { active: [], adopted: [], rejected: [], superseded: [], withdrawn: [] };
  for (const declaration of declarations.filter((item) => item.type === "design")) {
    const sourcePath = declaration.source?.path;
    const bytes = typeof sourcePath === "string" ? sourceBytes(sourcePath) : undefined;
    const disposition = declaration.design_disposition
      ?? (bytes === undefined ? undefined : sourceFrontmatter(bytes, sourcePath)?.design_disposition);
    if (Object.hasOwn(designsByDisposition, disposition)) designsByDisposition[disposition].push(sourcePath);
  }
  const evidenceAreas = [];
  const evidencePaths = [
    ...declarations.filter((item) => item.type === "evidence").map((item) => item.source?.path),
    ...nonRecords.filter((item) => item.kind === "evidence").map((item) => item.path),
  ];
  for (const candidate of evidencePaths) {
    if (typeof candidate !== "string" || !candidate.startsWith("evidence/")) continue;
    const segments = candidate.split("/");
    if (segments.length > 2) evidenceAreas.push(`evidence/${segments[1]}`);
  }
  return new Map([
    ["tasks/README.md", ["tasks/by-state/active.md", "tasks/by-state/deferred.md", "tasks/by-state/completed.md", "tasks/by-state/cancelled.md"]],
    ["tasks/by-state/active.md", uniqueSorted(tasksByStatus.active)],
    ["tasks/by-state/deferred.md", uniqueSorted(tasksByStatus.deferred)],
    ["tasks/by-state/completed.md", uniqueSorted(tasksByStatus.completed)],
    ["tasks/by-state/cancelled.md", uniqueSorted(tasksByStatus.cancelled)],
    ["designs/README.md", ["designs/by-disposition/active.md", "designs/by-disposition/adopted.md", "designs/by-disposition/rejected.md", "designs/by-disposition/superseded.md", "designs/by-disposition/withdrawn.md"]],
    ["designs/by-disposition/active.md", uniqueSorted(designsByDisposition.active)],
    ["designs/by-disposition/adopted.md", uniqueSorted(designsByDisposition.adopted)],
    ["designs/by-disposition/rejected.md", uniqueSorted(designsByDisposition.rejected)],
    ["designs/by-disposition/superseded.md", uniqueSorted(designsByDisposition.superseded)],
    ["designs/by-disposition/withdrawn.md", uniqueSorted(designsByDisposition.withdrawn)],
    ["decisions/README.md", uniqueSorted(declarations.filter((item) => item.type === "decision").map((item) => item.source.path))],
    ["specifications/README.md", uniqueSorted(declarations.filter((item) => item.type === "specification").map((item) => item.source.path))],
    ["realizations/README.md", uniqueSorted(["realizations/current-system.md", ...declarations.filter((item) => item.type === "realization" && item.source.path.startsWith("realizations/items/")).map((item) => item.source.path)])],
    ["evidence/README.md", uniqueSorted(evidenceAreas)],
  ]);
}

function generatedDeclaration({ id, type, title, sourcePath, sourceBytes, authority, sections, relationships = [], extra = {} }) {
  return {
    ...extra,
    contract: "nkf.record",
    id,
    type,
    body_contract: `nkf.${type}`,
    title,
    source: {
      path: sourcePath,
      stable_path: sourcePath,
      digest: { algorithm: "sha-256", value: sha256(sourceBytes) },
    },
    governance: { lifecycle: "living", status: "draft", authority: [authority] },
    scope: { root: null },
    sections,
    relationships,
  };
}

function productSections() {
  return [
    section("product-definition", "Product Definition", "governing"),
    section("purpose", "Purpose", "governing"),
    section("vision", "Vision", "governing"),
    section("people-served", "People Served", "boundary"),
    section("needs-and-outcomes", "Needs And Outcomes", "governing"),
    section("boundaries", "Boundaries", "boundary"),
    section("product-map", "Product Map", "catalogue"),
  ];
}

function technologySections() {
  return [
    section("technology-definition", "Technology Definition", "definition"),
    section("purpose-and-problem", "Purpose And Problem", "context"),
    section("consumers-and-use-contexts", "Consumers And Use Contexts", "actor"),
    section("capabilities-and-contracts", "Capabilities And Contracts", "catalogue"),
    section("scope-authority-and-boundaries", "Scope Authority And Boundaries", "boundary"),
    section("technology-map", "Technology Map", "catalogue"),
    section("versioning-compatibility-and-migration", "Versioning Compatibility And Migration", "evolution"),
    section("distribution-support-and-security", "Distribution Support And Security", "obligation"),
    section("evolution-and-retirement", "Evolution And Retirement", "evolution"),
  ];
}

function realizationSections() {
  return [
    section("realization-identity-and-kind", "Realization Identity And Kind", "identity"),
    section("governed-meaning-realized", "Governed Meaning Realized", "mapping"),
    section("durable-mapping", "Durable Mapping", "mapping"),
    section("responsibilities-and-ownership-boundaries", "Responsibilities And Ownership Boundaries", "responsibility"),
    section("interfaces-dependencies-locators-and-resolution", "Interfaces Dependencies Locators And Resolution", "interface"),
    section("external-authority-and-operational-state-boundaries", "External Authority And Operational State Boundaries", "boundary"),
    section("compatibility-verification-and-recovery", "Compatibility Verification And Recovery", "recovery"),
  ];
}

function specificationSections() {
  const sections = [
    section("specification-definition", "Specification Definition", "definition"),
    section("authority-and-normative-status", "Authority And Normative Status", "governing"),
    section("scope-and-applicability", "Scope And Applicability", "applicability"),
    section("model-vocabulary-and-semantics", "Model Vocabulary And Semantics", "definition"),
    section("requirements-constraints-and-interfaces", "Requirements Constraints And Interfaces", "governing"),
    section("validation-and-conformance", "Validation And Conformance", "validation"),
    section("versioning-compatibility-and-migration", "Versioning Compatibility And Migration", "evolution"),
    section("security-authority-and-operational-boundaries", "Security Authority And Operational Boundaries", "boundary"),
    section("unresolved-and-deferred-matters", "Unresolved And Deferred Matters", "unresolved"),
  ];
  sections.at(-1).authority = "unresolved";
  return sections;
}

async function validateLoadedPlan(projectRoot, loaded, observedInspection = null) {
  validatePlanEnvelope(loaded.plan);
  validateOnboardingTopologyPlan(loaded.plan);
  const inspection = observedInspection
    ?? await inspectOnboardingProject(projectRoot, loaded.plan.inspection.knowledge_root);
  if (!inspection.mechanically_ready || inspection.snapshot_sha256 !== loaded.plan.inspection.snapshot_sha256) {
    fail(
      "NKF-ONBOARDING-INSPECTION-DRIFT",
      "The project no longer matches the mechanical snapshot bound by the plan.",
      { diagnostics: inspection.diagnostics },
    );
  }
  validateResolvedAssessment(loaded.plan.assessment, inspection, loaded.plan.project.authority);
  const observed = new Map(inspection.documents.map((item) => [item.path, item]));
  if (loaded.plan.documents.length !== observed.size) {
    fail("NKF-ONBOARDING-PLAN-INCOMPLETE", "The plan must represent every inspected Markdown file exactly once.");
  }
  const seenPaths = new Set();
  const existingRootSelected = observed.has(loaded.plan.scaffold.root_record);
  const existingSpecificationSelected =
    loaded.plan.scaffold.initial_specification !== null &&
    observed.has(loaded.plan.scaffold.initial_specification);
  const seenRecordIds = new Set([
    ...(existingRootSelected ? [] : [loaded.plan.project.root.id]),
    `${loaded.plan.project.root.id}-current-system`,
    ...(loaded.plan.project.profile === "nkf.profile.technology" && !existingSpecificationSelected
      ? [`${loaded.plan.project.root.id}-initial-specification`]
      : []),
  ]);
  const candidateDocuments = [];
  const nonRecords = [];
  const declarations = [];
  for (const [index, item] of loaded.plan.documents.entries()) {
    requireExactKeys(
      item,
      ["path", "original_sha256", "candidate_path", "candidate_sha256", "representation"],
      `documents[${index}]`,
    );
    const documentPath = safeRelative(item.path, `documents[${index}].path`);
    if (seenPaths.has(documentPath)) {
      fail("NKF-ONBOARDING-PLAN-INCOMPLETE", `Duplicate document path: ${documentPath}`);
    }
    seenPaths.add(documentPath);
    const source = observed.get(documentPath);
    if (source === undefined || source.sha256 !== requireSha256(item.original_sha256, `documents[${index}].original_sha256`)) {
      fail("NKF-ONBOARDING-INSPECTION-DRIFT", `Original document binding differs: ${documentPath}`);
    }
    const candidatePath = safeRelative(item.candidate_path, `documents[${index}].candidate_path`);
    if (!candidatePath.startsWith("candidate/")) {
      fail("NKF-ONBOARDING-WORKSPACE-INVALID", "Candidate paths must be under candidate/ in the workspace.");
    }
    const bytes = await readRegularNoLinks(loaded.workspaceRoot, candidatePath);
    if (sha256(bytes) !== requireSha256(item.candidate_sha256, `documents[${index}].candidate_sha256`)) {
      fail(
        "NKF-ONBOARDING-CANDIDATE-DRIFT",
        `Candidate bytes differ from the sealed plan: ${documentPath}. Run seal after editing.`,
      );
    }
    requireObject(item.representation, `documents[${index}].representation`);
    if (item.representation.kind === "unresolved") {
      fail("NKF-ONBOARDING-PLAN-UNRESOLVED", `Document representation remains unresolved: ${documentPath}`);
    }
    if (item.representation.kind === "non_record") {
      const allowed = item.representation.non_record_kind === "other"
        ? ["kind", "non_record_kind", "reason"]
        : ["kind", "non_record_kind"];
      requireExactKeys(item.representation, allowed, `documents[${index}].representation`);
      if (!NON_RECORD_KINDS.has(item.representation.non_record_kind)) {
        fail("NKF-ONBOARDING-PLAN-INVALID", `Unsupported non-record kind: ${item.representation.non_record_kind}`);
      }
      const entry = { path: documentPath, kind: item.representation.non_record_kind };
      if (entry.kind === "other") entry.reason = requireString(item.representation.reason, "non-record reason");
      nonRecords.push(entry);
    } else if (item.representation.kind === "record") {
      requireExactKeys(item.representation, ["kind", "declaration"], `documents[${index}].representation`);
      const declaration = structuredClone(requireObject(item.representation.declaration, "record declaration"));
      if (declaration.source !== undefined) {
        fail("NKF-ONBOARDING-PLAN-INVALID", "Plan record declarations must omit generated source bindings.");
      }
      if (declaration.contract !== "nkf.record") {
        fail("NKF-ONBOARDING-PLAN-INVALID", "Plan record declarations must use contract nkf.record.");
      }
      if (declaration.governance?.status !== "draft") {
        fail(
          "NKF-ONBOARDING-AUTHORITY-UNSUPPORTED",
          "Initial onboarding record declarations must remain Draft; acceptance requires a later governed authority act.",
        );
      }
      requireIdentifier(declaration.id, "record declaration id");
      if (seenRecordIds.has(declaration.id)) {
        fail("NKF-ONBOARDING-PLAN-INVALID", `Duplicate record id: ${declaration.id}`);
      }
      seenRecordIds.add(declaration.id);
      declaration.source = {
        path: documentPath,
        stable_path: documentPath,
        digest: { algorithm: "sha-256", value: sha256(bytes) },
      };
      declarations.push(declaration);
    } else {
      fail("NKF-ONBOARDING-PLAN-INVALID", `Unsupported representation kind for ${documentPath}.`);
    }
    candidateDocuments.push({
      path: documentPath,
      bytes,
      original_sha256: source.sha256,
      changed: source.sha256 !== sha256(bytes),
    });
  }
  if (seenPaths.size !== observed.size || [...observed.keys()].some((entry) => !seenPaths.has(entry))) {
    fail("NKF-ONBOARDING-PLAN-INCOMPLETE", "The plan does not cover the complete inspected Markdown set.");
  }
  if (existingRootSelected) {
    const selected = declarations.filter(
      (declaration) => declaration.source?.path === loaded.plan.scaffold.root_record,
    );
    const rootType = loaded.plan.project.profile === "nkf.profile.product" ? "product" : "technology";
    if (
      selected.length !== 1 ||
      selected[0].id !== loaded.plan.project.root.id ||
      selected[0].type !== rootType ||
      selected[0].body_contract !== `nkf.${rootType}` ||
      selected[0].title !== loaded.plan.project.root.title
    ) {
      fail(
        "NKF-ONBOARDING-PATH-CONFLICT",
        "An existing selected root path must be represented by the matching Draft root record.",
      );
    }
  }
  if (existingSpecificationSelected) {
    const selected = declarations.filter(
      (declaration) => declaration.source?.path === loaded.plan.scaffold.initial_specification,
    );
    if (
      selected.length !== 1 ||
      selected[0].type !== "specification" ||
      selected[0].body_contract !== "nkf.specification"
    ) {
      fail(
        "NKF-ONBOARDING-PATH-CONFLICT",
        "An existing selected Technology Specification path must be represented by one Draft Specification record.",
      );
    }
  }
  return { ...loaded, inspection, candidateDocuments, nonRecords, declarations };
}

async function validateAndLoadPlan(projectRoot, planPathInput) {
  return validateLoadedPlan(projectRoot, await readPlan(planPathInput));
}

export async function buildOnboardingKnowledge(projectRootInput, planPathInput) {
  const projectRoot = await resolveProjectRoot(projectRootInput);
  const loaded = await validateAndLoadPlan(projectRoot, planPathInput);
  const plan = loaded.plan;
  const knowledgeRoot = plan.inspection.knowledge_root;
  const kind = plan.project.profile === "nkf.profile.product" ? "product" : "technology";
  const candidateByPath = new Map(loaded.candidateDocuments.map((item) => [item.path, item]));
  const declaredNonRecordByPath = new Map(loaded.nonRecords.map((item) => [item.path, item]));
  const selectedRootDeclaration = loaded.declarations.find(
    (item) => item.source?.path === plan.scaffold.root_record,
  );
  const selectedSpecificationDeclaration = plan.scaffold.initial_specification === null
    ? undefined
    : loaded.declarations.find((item) => item.source?.path === plan.scaffold.initial_specification);
  for (const definition of REQUIRED_TOPOLOGY_NON_RECORDS) {
    if (!candidateByPath.has(definition.path)) continue;
    const declaration = declaredNonRecordByPath.get(definition.path);
    if (declaration?.kind !== definition.kind) {
      fail(
        "NKF-ONBOARDING-PATH-CONFLICT",
        `Existing required path ${definition.path} must be resolved as the ${definition.kind} non-record.`,
      );
    }
  }
  const generatedPaths = [
    ...(candidateByPath.has(plan.scaffold.root_record) ? [] : [plan.scaffold.root_record]),
    plan.scaffold.current_system_realization,
    plan.scaffold.onboarding_task,
    ...(plan.scaffold.initial_specification === null || candidateByPath.has(plan.scaffold.initial_specification)
      ? []
      : [plan.scaffold.initial_specification]),
    ...REQUIRED_TOPOLOGY_NON_RECORDS
      .map((item) => item.path)
      .filter((candidate) => !candidateByPath.has(candidate)),
  ];
  const allPaths = [...loaded.candidateDocuments.map((item) => item.path), ...generatedPaths];
  if (new Set(allPaths).size !== allPaths.length) {
    fail("NKF-ONBOARDING-PATH-CONFLICT", "A scaffold path conflicts with an existing Markdown path.");
  }
  const files = new Map();
  for (const item of loaded.candidateDocuments) {
    files.set(`${knowledgeRoot}/${item.path}`, item.bytes);
  }
  const rootBytes = candidateByPath.get(plan.scaffold.root_record)?.bytes ?? rootScaffold(plan, kind);
  const realizationBytes = realizationScaffold(plan);
  const taskBytes = taskScaffold(plan);
  const existingMap = candidateByPath.get(plan.scaffold.knowledge_map)?.bytes;
  const mapBytes = existingMap === undefined
    ? mapScaffold(plan)
    : reconcileNavigationMap(existingMap, navigationBlock(plan));
  files.set(`${knowledgeRoot}/${plan.scaffold.root_record}`, rootBytes);
  files.set(`${knowledgeRoot}/${plan.scaffold.current_system_realization}`, realizationBytes);
  files.set(`${knowledgeRoot}/${plan.scaffold.onboarding_task}`, taskBytes);
  files.set(`${knowledgeRoot}/${plan.scaffold.knowledge_map}`, mapBytes);
  let specificationBytes = null;
  if (plan.scaffold.initial_specification !== null) {
    specificationBytes = candidateByPath.get(plan.scaffold.initial_specification)?.bytes
      ?? specificationScaffold(plan);
    files.set(`${knowledgeRoot}/${plan.scaffold.initial_specification}`, specificationBytes);
  }

  const rootDeclaration = selectedRootDeclaration === undefined
    ? generatedDeclaration({
      id: plan.project.root.id,
      type: kind,
      title: plan.project.root.title,
      sourcePath: plan.scaffold.root_record,
      sourceBytes: rootBytes,
      authority: plan.project.authority,
      sections: kind === "product" ? productSections() : technologySections(),
    })
    : structuredClone(selectedRootDeclaration);
  rootDeclaration.scope.root = plan.project.root.id;
  const realizationId = `${plan.project.root.id}-current-system`;
  const realizationDeclaration = generatedDeclaration({
    extra: { confirmation_status: "unconfirmed", task: plan.project.task.id },
    id: realizationId,
    type: "realization",
    title: `${plan.project.root.title} Current System`,
    sourcePath: plan.scaffold.current_system_realization,
    sourceBytes: realizationBytes,
    authority: plan.project.authority,
    sections: realizationSections(),
  });
  realizationDeclaration.scope.root = plan.project.root.id;
  const retainedDeclarations = loaded.declarations.filter(
    (item) =>
      item.source?.path !== plan.scaffold.root_record &&
      item.source?.path !== plan.scaffold.initial_specification,
  );
  const declarations = [rootDeclaration, realizationDeclaration, ...retainedDeclarations];
  if (specificationBytes !== null) {
    const specificationDeclaration = selectedSpecificationDeclaration === undefined
      ? generatedDeclaration({
        extra: { task: plan.project.task.id },
        id: `${plan.project.root.id}-initial-specification`,
        type: "specification",
        title: `${plan.project.root.title} Initial Specification`,
        sourcePath: plan.scaffold.initial_specification,
        sourceBytes: specificationBytes,
        authority: plan.project.authority,
        sections: specificationSections(),
      })
      : structuredClone(selectedSpecificationDeclaration);
    specificationDeclaration.scope.root = plan.project.root.id;
    declarations.splice(1, 0, specificationDeclaration);
  }
  for (const declaration of loaded.declarations) {
    if (declaration.scope?.root !== plan.project.root.id) {
      fail(
        "NKF-ONBOARDING-PLAN-INVALID",
        `Record ${declaration.id} must scope to root ${plan.project.root.id}.`,
      );
    }
  }
  for (const declaration of declarations) {
    files.set(
      `.nourd/knowledge/records/${declaration.id}.yaml`,
      serializeYaml(declaration),
    );
  }
  const nonRecordByPath = new Map();
  const addNonRecord = (entry) => {
    const prior = nonRecordByPath.get(entry.path);
    if (prior !== undefined && JSON.stringify(prior) !== JSON.stringify(entry)) {
      fail("NKF-ONBOARDING-PATH-CONFLICT", `Conflicting non-record declarations for ${entry.path}.`);
    }
    nonRecordByPath.set(entry.path, entry);
  };
  for (const item of loaded.nonRecords) addNonRecord(item);
  for (const definition of REQUIRED_TOPOLOGY_NON_RECORDS) {
    addNonRecord({ path: definition.path, kind: definition.kind });
  }
  addNonRecord({ path: plan.scaffold.onboarding_task, kind: "task" });
  const nonRecords = [...nonRecordByPath.values()].sort((left, right) => utf16Compare(left.path, right.path));

  const sourceBytes = (sourcePath) => files.get(`${knowledgeRoot}/${sourcePath}`);
  for (const entry of nonRecords) {
    if (entry.kind !== "task") continue;
    const bytes = sourceBytes(entry.path);
    if (bytes === undefined) fail("NKF-ONBOARDING-PLAN-INCOMPLETE", `Represented Task has no candidate bytes: ${entry.path}`);
    entry.document = {
      id: entry.path === plan.scaffold.onboarding_task
        ? plan.project.task.id
        : `document-${sha256(Buffer.from(`${plan.project.root.id}\u0000${entry.path}`, "utf8"))}`,
      stable_path: entry.path,
      digest: { algorithm: "sha-256", value: sha256(bytes) },
      state: { vocabulary: "task-status", value: "active" },
      relationships: [],
    };
  }
  const indexTargets = topologyIndexTargets(declarations, nonRecords, sourceBytes);
  for (const definition of REQUIRED_TOPOLOGY_NON_RECORDS) {
    if (definition.path === "README.md") continue;
    const expectedTargets = indexTargets.get(definition.path) ?? [];
    const existing = candidateByPath.get(definition.path)?.bytes;
    files.set(
      `${knowledgeRoot}/${definition.path}`,
      existing === undefined
        ? indexScaffold(plan, definition, expectedTargets)
        : reconcileIndex(existing, definition.path, expectedTargets),
    );
  }
  for (const entry of nonRecords) {
    if (entry.kind !== "evidence" || entry.document !== undefined) continue;
    const bytes = sourceBytes(entry.path);
    if (bytes === undefined) fail("NKF-ONBOARDING-PLAN-INCOMPLETE", `Represented Evidence has no candidate bytes: ${entry.path}`);
    entry.document = {
      id: `document-${sha256(Buffer.from(`${plan.project.root.id}\u0000${entry.path}`, "utf8"))}`,
      stable_path: entry.path,
      digest: { algorithm: "sha-256", value: sha256(bytes) },
      relationships: [],
    };
  }
  const bundle = {
    nkf_version: "0.81",
    contract: "nkf.bundle",
    id: plan.project.root.id,
    root: { record: plan.project.root.id, profile: plan.project.profile },
    knowledge_root: knowledgeRoot,
    knowledge_graph: {
      baseline: ".nourd/knowledge/freshness/baseline.yaml",
      policy: "nkf.freshness-policy.0.81",
    },
    non_records: nonRecords,
  };
  if (plan.project.canonical_terms.length > 0) {
    bundle.canonical_terms = plan.project.canonical_terms;
  }
  files.set(".nourd/knowledge/bundle.yaml", serializeYaml(bundle));
  return {
    files,
    plan,
    plan_sha256: sha256(loaded.bytes),
    inspection: loaded.inspection,
    changed_documents: loaded.candidateDocuments
      .filter((item) => sha256(sourceBytes(item.path)) !== item.original_sha256)
      .map((item) => `${knowledgeRoot}/${item.path}`),
    preserved_documents: loaded.candidateDocuments
      .filter((item) => sha256(sourceBytes(item.path)) === item.original_sha256)
      .map((item) => `${knowledgeRoot}/${item.path}`),
    generated_records: declarations.map((item) => item.id),
  };
}

export async function buildPortableTopologyRepair(projectRootInput, receipt) {
  const projectRoot = await resolveProjectRoot(projectRootInput);
  if (!Array.isArray(receipt?.created_paths) || !Array.isArray(receipt?.changed_paths) || !Array.isArray(receipt?.preserved_paths)) {
    fail("NKF-TOPOLOGY-REPAIR-RECEIPT-INVALID", "The predecessor onboarding receipt does not identify exact path sets.");
  }
  const bundle = parseYaml(
    await readRegularNoLinks(projectRoot, ".nourd/knowledge/bundle.yaml"),
    "Bundle",
  );
  if (bundle?.contract !== "nkf.bundle" || bundle?.nkf_version !== "0.1") {
    fail("NKF-TOPOLOGY-REPAIR-RECEIPT-INVALID", "Topology repair requires an adopted NKF 0.1 bundle.");
  }
  const knowledgeRoot = safeRelative(bundle.knowledge_root, "bundle.knowledge_root");
  const recordsDirectory = path.join(projectRoot, ".nourd/knowledge/records");
  const recordEntries = await readdir(recordsDirectory, { withFileTypes: true });
  const declarations = [];
  for (const entry of recordEntries.sort((left, right) => utf16Compare(left.name, right.name))) {
    if (!entry.isFile() || entry.isSymbolicLink() || !entry.name.endsWith(".yaml")) {
      fail("NKF-TOPOLOGY-REPAIR-AMBIGUOUS", "Topology repair requires regular YAML record declarations only.");
    }
    declarations.push(parseYaml(await readRegularNoLinks(projectRoot, `.nourd/knowledge/records/${entry.name}`), entry.name));
  }
  const rootDeclaration = declarations.find((item) => item.id === bundle.root?.record);
  if (rootDeclaration === undefined || typeof rootDeclaration.source?.path !== "string") {
    fail("NKF-TOPOLOGY-REPAIR-AMBIGUOUS", "The predecessor root declaration cannot be resolved.");
  }
  const currentDeclaration = declarations.find((item) => item.source?.path === "realizations/current-system.md");
  if (currentDeclaration?.type !== "realization" || currentDeclaration?.body_contract !== "nkf.realization") {
    fail("NKF-TOPOLOGY-REPAIR-AMBIGUOUS", "The predecessor does not have the canonical consolidated current-system Realization.");
  }
  const oldNonRecords = Array.isArray(bundle.non_records) ? bundle.non_records : [];
  const created = new Set(receipt.created_paths);
  const generatedTaskPaths = oldNonRecords
    .filter((item) => item.kind === "task" && created.has(`${knowledgeRoot}/${item.path}`))
    .map((item) => item.path);
  if (generatedTaskPaths.length !== 1) {
    fail("NKF-TOPOLOGY-REPAIR-RECEIPT-INVALID", "The receipt does not identify exactly one generated onboarding Task.");
  }
  const generatedSpecification = declarations.find(
    (item) => item.type === "specification" && created.has(`${knowledgeRoot}/${item.source?.path}`),
  );
  if (bundle.root?.profile === "nkf.profile.technology" && generatedSpecification === undefined) {
    fail("NKF-TOPOLOGY-REPAIR-RECEIPT-INVALID", "The Technology receipt does not identify its generated Specification.");
  }
  const generatedMapPaths = receipt.created_paths
    .filter((item) => item.startsWith(`${knowledgeRoot}/`))
    .map((item) => item.slice(knowledgeRoot.length + 1))
    .filter((item) => /^README(?:-[0-9]+)?\.md$/.test(item));
  if (generatedMapPaths.length !== 1) {
    fail("NKF-TOPOLOGY-REPAIR-RECEIPT-INVALID", "The receipt does not identify exactly one predecessor-generated knowledge map.");
  }
  const predecessorMapPath = generatedMapPaths[0];
  const rootBytes = await readRegularNoLinks(projectRoot, `${knowledgeRoot}/${rootDeclaration.source.path}`);
  const rootFrontmatter = sourceFrontmatter(rootBytes, rootDeclaration.source.path);
  const createdAt = requireUtcInstant(rootFrontmatter?.created_at, "root created_at");
  const repairCreatedAt = currentUtcInstant();
  const pseudoPlan = {
    project: { root: { title: rootDeclaration.title }, created_at: createdAt },
    scaffold: {
      knowledge_map: predecessorMapPath,
      root_record: rootDeclaration.source.path,
      current_system_realization: currentDeclaration.source.path,
      onboarding_task: generatedTaskPaths[0],
      initial_specification: generatedSpecification?.source?.path ?? null,
    },
  };
  const predecessorDocuments = [...receipt.changed_paths, ...receipt.preserved_paths]
    .filter((item) => item.startsWith(`${knowledgeRoot}/`) && item.endsWith(".md"))
    .map((item) => item.slice(knowledgeRoot.length + 1))
    .sort(utf16Compare);
  const removals = [];
  if (predecessorMapPath !== "README.md") {
    if (!/^README-[0-9]+\.md$/.test(predecessorMapPath)) {
      fail("NKF-TOPOLOGY-REPAIR-AMBIGUOUS", "The competing predecessor map path is unsupported.");
    }
    const observed = await readRegularNoLinks(projectRoot, `${knowledgeRoot}/${predecessorMapPath}`);
    const expected = predecessorMapScaffold(pseudoPlan, predecessorDocuments);
    if (!observed.equals(expected)) {
      fail("NKF-TOPOLOGY-REPAIR-DRIFT", "The predecessor-generated competing map has drifted or contains consumer-authored content.");
    }
    removals.push(`${knowledgeRoot}/${predecessorMapPath}`);
  }

  const nonRecordByPath = new Map();
  for (const item of oldNonRecords) {
    if (item.path === predecessorMapPath && predecessorMapPath !== "README.md") continue;
    nonRecordByPath.set(item.path, item);
  }
  for (const definition of REQUIRED_TOPOLOGY_NON_RECORDS) {
    const prior = nonRecordByPath.get(definition.path);
    if (prior !== undefined && prior.kind !== definition.kind) {
      fail("NKF-TOPOLOGY-REPAIR-AMBIGUOUS", `Required path ${definition.path} has incompatible predecessor meaning.`);
    }
    nonRecordByPath.set(definition.path, { path: definition.path, kind: definition.kind });
  }
  const nonRecords = [...nonRecordByPath.values()].sort((left, right) => utf16Compare(left.path, right.path));
  const knowledgeBytes = new Map();
  const representedPaths = new Set([
    ...declarations.map((item) => item.source?.path).filter((item) => typeof item === "string"),
    ...nonRecords.map((item) => item.path),
  ]);
  for (const sourcePath of representedPaths) {
    const bytes = await readRegularNoLinks(projectRoot, `${knowledgeRoot}/${sourcePath}`, false);
    if (bytes !== null) knowledgeBytes.set(sourcePath, bytes);
  }
  let canonicalMap = knowledgeBytes.get("README.md");
  if (canonicalMap === undefined) {
    fail("NKF-TOPOLOGY-REPAIR-AMBIGUOUS", "The predecessor does not provide a safe canonical README.md to reconcile.");
  }
  if (
    predecessorMapPath === "README.md" &&
    created.has(`${knowledgeRoot}/README.md`)
  ) {
    const expected = predecessorMapScaffold(pseudoPlan, predecessorDocuments);
    if (!canonicalMap.equals(expected)) {
      fail(
        "NKF-TOPOLOGY-REPAIR-DRIFT",
        "The predecessor-generated canonical map has drifted or contains consumer-authored content.",
      );
    }
    const preserved = predecessorDocuments.length === 0
      ? ""
      : `\n## Preserved Knowledge\n\n${predecessorDocuments
          .map((target) => topologyLink("README.md", target, `Preserved ${target}`))
          .join("\n")}\n`;
    canonicalMap = Buffer.concat([
      mapScaffold(pseudoPlan),
      Buffer.from(preserved, "utf8"),
    ]);
    knowledgeBytes.set("README.md", canonicalMap);
  }
  const files = new Map();
  const reconciledMap = reconcileNavigationMap(canonicalMap, navigationBlock({ scaffold: { ...pseudoPlan.scaffold, knowledge_map: "README.md" } }));
  files.set(`${knowledgeRoot}/README.md`, reconciledMap);
  knowledgeBytes.set("README.md", reconciledMap);
  const sourceBytes = (sourcePath) => knowledgeBytes.get(sourcePath);
  const indexTargets = topologyIndexTargets(declarations, nonRecords, sourceBytes);
  const scaffoldPlan = { project: { created_at: repairCreatedAt } };
  for (const definition of REQUIRED_TOPOLOGY_NON_RECORDS) {
    if (definition.path === "README.md") continue;
    const expectedTargets = indexTargets.get(definition.path) ?? [];
    const existing = knowledgeBytes.get(definition.path);
    const next = existing === undefined
      ? indexScaffold(scaffoldPlan, definition, expectedTargets)
      : reconcileIndex(existing, definition.path, expectedTargets);
    files.set(`${knowledgeRoot}/${definition.path}`, next);
    knowledgeBytes.set(definition.path, next);
  }
  bundle.non_records = nonRecords;
  files.set(".nourd/knowledge/bundle.yaml", serializeYaml(bundle));
  return {
    files,
    removals,
    knowledge_root: knowledgeRoot,
    predecessor_map: predecessorMapPath,
    preserved_paths: [...representedPaths]
      .map((item) => `${knowledgeRoot}/${item}`)
      .filter((item) => !files.has(item) && !removals.includes(item))
      .sort(utf16Compare),
  };
}

export function serializeOnboardingReceipt(value) {
  return serializeJson(value);
}
