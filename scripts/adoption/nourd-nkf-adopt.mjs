import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  rmdir,
  unlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import neutralProtocol from "../../integrations/ai/nkf-authoring-protocol.md";
import portableSkill from "../../.agents/skills/nkf-authoring/SKILL.md";
import {
  buildOnboardingKnowledge,
  buildPortableTopologyRepair,
  createOnboardingWorkspace,
  OnboardingError,
  sealOnboardingPlan,
  serializeOnboardingReceipt,
} from "../onboarding/core.mjs";
import {
  invokeVerifiedChecker,
  parseStrictJson,
  sha256,
  verifyReleaseArchive,
} from "../release/core.mjs";

const INTEGRATION_REVISION = 1;
const PIN_PATH = ".nourd/nkf-release.json";
const ADOPTER_PATH = ".nourd/tools/nkf/nourd-nkf-adopt.mjs";
const RELEASE_DIRECTORY = ".nourd/tools/nkf/releases";
const ONBOARDING_RECEIPT_PATH = ".nourd/onboarding-receipt.json";
const TOPOLOGY_REPAIR_RECEIPT_PATH = ".nourd/topology-repair-receipt.json";
const PROTOCOL_PATH = "integrations/ai/nkf-authoring-protocol.md";
const REGISTRY_PATH = "integrations/ai/nkf-consumer-integration.yaml";
const VERIFIER_PATH = "scripts/verify-nkf-integration.mjs";
const WORKFLOW_PATH = ".github/workflows/nkf-contracts.yml";
const LOCK_PATH = "package-lock.json";
const SKILL_PATHS = [
  ".agents/skills/nkf-authoring/SKILL.md",
  ".claude/skills/nkf-authoring/SKILL.md",
];
const ROOT_PROFILES = new Set([
  "nkf.profile.product",
  "nkf.profile.technology",
]);
const ELIGIBLE_TOPOLOGY_PREDECESSORS = new Map([
  ["7533a029053beaccd8f6fec939c2198c5909fd8b5a37a4ba9b5bc0c205bbc7c8", "NKF-013"],
  ["c33766982d3354a01558bf1f0903314eb98537e38c50585c9cd94c7c24aae387", "NKF-015"],
]);
const CHECK_COMMAND =
  "node .nourd/tools/nkf/nourd-nkf-adopt.mjs check --project .";
const BLOCK_START = "<!-- nkf-authoring-adapter:start -->";
const BLOCK_END = "<!-- nkf-authoring-adapter:end -->";
const ROOT_BLOCK = `${BLOCK_START}
# NKF Authoring Adapter

For every NKF-governed knowledge operation, read and follow
[\`integrations/ai/nkf-authoring-protocol.md\`](integrations/ai/nkf-authoring-protocol.md)
before editing governed files.

Use \`npm run nkf:check\` as the only supported authoring-handoff validation
command. Report acceptance, Realization confirmation, conformance, local Git
state, and remote enforcement state as separate facts.
${BLOCK_END}`;
const IMPORT_BLOCK = `${BLOCK_START}
@AGENTS.md
${BLOCK_END}`;
const COPILOT_BLOCK = `${BLOCK_START}
# NKF Authoring Adapter

For NKF-governed knowledge work, read and follow
\`integrations/ai/nkf-authoring-protocol.md\`. Use \`npm run nkf:check\`
before handoff and keep acceptance, confirmation, conformance, Git state, and
remote enforcement state separate.
${BLOCK_END}`;
const VERIFIER_SOURCE = `import { spawnSync } from "node:child_process";
import path from "node:path";

const project = path.resolve(process.argv[2] ?? ".");
const result = spawnSync(
  process.execPath,
  [
    path.join(project, ".nourd/tools/nkf/nourd-nkf-adopt.mjs"),
    "integration-check",
    "--project",
    project,
  ],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
`;

function fail(message) {
  throw new Error(message);
}

function digest(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function inside(root, candidate) {
  const relative = path.relative(root, candidate);
  return (
    relative === "" ||
    (!relative.startsWith("..") && !path.isAbsolute(relative))
  );
}

function safeRelative(value, label) {
  if (
    typeof value !== "string" ||
    value === "" ||
    value.trim() !== value ||
    path.isAbsolute(value) ||
    value.includes("\\") ||
    value
      .split("/")
      .some((part) => part === "" || part === "." || part === "..")
  ) {
    fail(`${label} must be a safe project-relative path.`);
  }
  return value;
}

function requireExactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an object.`);
  }
  if (
    JSON.stringify(Object.keys(value).sort()) !==
    JSON.stringify([...expected].sort())
  ) {
    fail(`${label} contains unsupported fields.`);
  }
}

function requireReceiptPaths(value, label) {
  if (!Array.isArray(value)) fail(`${label} must be an array.`);
  const paths = value.map((item, index) =>
    safeRelative(item, `${label}[${index}]`));
  if (new Set(paths).size !== paths.length) {
    fail(`${label} must not contain duplicate paths.`);
  }
  return paths;
}

function requireDisjointReceiptPaths(groups, label) {
  const owner = new Map();
  for (const [name, paths] of Object.entries(groups)) {
    for (const item of paths) {
      const prior = owner.get(item);
      if (prior !== undefined) {
        fail(`${label} path ${item} appears in both ${prior} and ${name}.`);
      }
      owner.set(item, name);
    }
  }
}

function parseArguments(values) {
  const result = { command: values[0], options: {} };
  if (![
    "inspect",
    "seal",
    "onboard",
    "repair-topology",
    "install",
    "update",
    "check",
    "status",
    "integration-check",
  ].includes(result.command)) {
    fail(
      "Usage: nourd-nkf-adopt.mjs <inspect|seal|onboard|repair-topology|install|update|check|status|integration-check> [options]",
    );
  }
  for (let index = 1; index < values.length; index += 2) {
    const key = values[index];
    const value = values[index + 1];
    if (!key?.startsWith("--") || value === undefined) {
      fail(`Unknown or incomplete argument: ${key ?? ""}`);
    }
    const name = key.slice(2);
    if (Object.hasOwn(result.options, name)) {
      fail(`Duplicate argument: ${key}`);
    }
    result.options[name] = value;
  }
  let allowed;
  if (result.command === "inspect") {
    allowed = new Set([
      "authority",
      "created-at",
      "knowledge-root",
      "output",
      "profile",
      "project",
      "root-id",
      "root-title",
      "task-id",
    ]);
  } else if (result.command === "seal") {
    allowed = new Set(["plan", "project"]);
  } else if (result.command === "onboard") {
    allowed = new Set([
      "archive",
      "github-repository",
      "plan",
      "project",
      "sha256",
    ]);
  } else if (["install", "update", "repair-topology"].includes(result.command)) {
    allowed = new Set(["archive", "github-repository", "project", "sha256"]);
  } else {
    allowed = new Set(["project"]);
  }
  for (const name of Object.keys(result.options)) {
    if (!allowed.has(name)) fail(`Unknown argument: --${name}`);
  }
  return result;
}

async function requireProjectRoot(value) {
  const root = path.resolve(value ?? ".");
  const rootStat = await lstat(root).catch(() => null);
  if (rootStat === null || !rootStat.isDirectory() || rootStat.isSymbolicLink()) {
    fail("The project root must be an existing non-symbolic-link directory.");
  }
  const resolved = await realpath(root);
  return resolved;
}

async function readRegularInside(root, relative, required = true) {
  const normalized = safeRelative(relative, "Path");
  const absolute = path.resolve(root, ...normalized.split("/"));
  if (!inside(root, absolute)) fail(`Path escapes the project: ${relative}`);
  const parts = normalized.split("/");
  let current = root;
  for (const [index, part] of parts.entries()) {
    current = path.join(current, part);
    const stat = await lstat(current).catch(() => null);
    if (stat === null) {
      if (required) fail(`Required file is missing: ${relative}`);
      return null;
    }
    if (stat.isSymbolicLink()) {
      fail(`Symbolic links are prohibited in adoption paths: ${relative}`);
    }
    if (index < parts.length - 1 && !stat.isDirectory()) {
      fail(`A path component is not a directory: ${relative}`);
    }
  }
  const stat = await lstat(absolute);
  if (!stat.isFile()) fail(`Path is not a regular file: ${relative}`);
  return readFile(absolute);
}

async function requireBundle(projectRoot) {
  const bundleBytes = await readRegularInside(
    projectRoot,
    ".nourd/knowledge/bundle.yaml",
  );
  let bundle;
  try {
    bundle = YAML.parse(bundleBytes.toString("utf8"));
  } catch (error) {
    fail(`The NKF bundle is invalid YAML: ${error.message}`);
  }
  if (bundle?.nkf_version !== "0.1" || bundle?.contract !== "nkf.bundle") {
    fail("The project must already declare an NKF 0.1 bundle.");
  }
  if (!ROOT_PROFILES.has(bundle?.root?.profile)) {
    fail("The bundle must select the Product or Technology Root Profile.");
  }
  const knowledgeRoot = safeRelative(
    bundle.knowledge_root,
    "bundle knowledge_root",
  );
  const knowledgeAbsolute = path.resolve(
    projectRoot,
    ...knowledgeRoot.split("/"),
  );
  if (!inside(projectRoot, knowledgeAbsolute)) {
    fail("The configured knowledge root escapes the project.");
  }
  const knowledgeStat = await lstat(knowledgeAbsolute).catch(() => null);
  if (
    knowledgeStat === null ||
    !knowledgeStat.isDirectory() ||
    knowledgeStat.isSymbolicLink()
  ) {
    fail("The configured knowledge root must be a project-contained directory.");
  }
  return { bundle, knowledgeRoot };
}

function requireSha256(value) {
  if (!/^[0-9a-f]{64}$/.test(value ?? "")) {
    fail("--sha256 must be a full lowercase SHA-256 value.");
  }
  return value;
}

function releaseIdentity(archiveSha256) {
  return {
    assetName: `nourd-nkf-sha256-${archiveSha256}.tar`,
    tag: `release-sha256-${archiveSha256}`,
  };
}

async function acquireArchive(options, expectedSha256) {
  const hasArchive = options.archive !== undefined;
  const hasRepository = options["github-repository"] !== undefined;
  if (hasArchive === hasRepository) {
    fail("Supply exactly one of --archive or --github-repository.");
  }
  if (hasArchive) {
    return readFile(path.resolve(options.archive));
  }
  const repository = options["github-repository"];
  if (repository !== "kaveh6202/Nourd.NKF") {
    fail("--github-repository must be kaveh6202/Nourd.NKF.");
  }
  const { assetName, tag } = releaseIdentity(expectedSha256);
  const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-download-"));
  try {
    execFileSync(
      "gh",
      [
        "release",
        "download",
        tag,
        "--repo",
        repository,
        "--pattern",
        assetName,
        "--dir",
        temporary,
      ],
      { stdio: "inherit" },
    );
    return readFile(path.join(temporary, assetName));
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

function mergeBlock(existingBytes, block, relativePath) {
  if (existingBytes === null) return Buffer.from(`${block}\n`, "utf8");
  const existing = existingBytes.toString("utf8");
  const start = existing.indexOf(BLOCK_START);
  const end = existing.indexOf(BLOCK_END);
  if ((start === -1) !== (end === -1)) {
    fail(`Malformed NKF adapter markers in ${relativePath}.`);
  }
  if (start !== -1) {
    if (
      existing.indexOf(BLOCK_START, start + BLOCK_START.length) !== -1 ||
      existing.indexOf(BLOCK_END, end + BLOCK_END.length) !== -1 ||
      end < start
    ) {
      fail(`Conflicting NKF adapter markers in ${relativePath}.`);
    }
    return Buffer.from(
      `${existing.slice(0, start)}${block}${existing.slice(
        end + BLOCK_END.length,
      )}`,
      "utf8",
    );
  }
  const separator = existing === "" || existing.endsWith("\n\n") ? "" : existing.endsWith("\n") ? "\n" : "\n\n";
  return Buffer.from(`${existing}${separator}${block}\n`, "utf8");
}

function verifyBlock(bytes, block, relativePath) {
  const text = bytes.toString("utf8");
  const start = text.indexOf(BLOCK_START);
  const end = text.indexOf(BLOCK_END);
  if (start === -1 || end === -1 || end < start) {
    fail(`The NKF adapter block is missing from ${relativePath}.`);
  }
  const observed = text.slice(start, end + BLOCK_END.length);
  if (observed !== block) {
    fail(`The NKF adapter block differs in ${relativePath}.`);
  }
}

function workflow(branch) {
  return `name: NKF Contracts

on:
  pull_request:
    branches:
      - ${branch}
  push:
    branches:
      - ${branch}

permissions:
  contents: read

jobs:
  validate:
    name: Validate
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Check Out Exact Commit
        uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false
      - name: Set Up Node.js
        uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
        with:
          node-version: "22"
      - name: Validate NKF Contracts
        run: npm run nkf:check
`;
}

function defaultBranch(projectRoot) {
  try {
    const value = execFileSync(
      "git",
      ["-C", projectRoot, "symbolic-ref", "--short", "HEAD"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (/^[A-Za-z0-9._/-]+$/.test(value) && !value.includes("..")) return value;
  } catch {
    // A non-Git project receives the conventional default.
  }
  return "master";
}

function integrationRegistry(files, branch) {
  const exact = (relative) => ({
    path: relative,
    sha256: digest(files.get(relative)),
  });
  return {
    contract: "nkf.consumer-integration",
    version: INTEGRATION_REVISION,
    canonical_command: "npm run nkf:check",
    protocol: exact(PROTOCOL_PATH),
    skills: SKILL_PATHS.map(exact),
    adapters: [
      { path: "AGENTS.md", block_sha256: digest(Buffer.from(ROOT_BLOCK)) },
      { path: "CLAUDE.md", block_sha256: digest(Buffer.from(IMPORT_BLOCK)) },
      { path: "GEMINI.md", block_sha256: digest(Buffer.from(IMPORT_BLOCK)) },
      {
        path: ".github/copilot-instructions.md",
        block_sha256: digest(Buffer.from(COPILOT_BLOCK)),
      },
    ],
    verifier: exact(VERIFIER_PATH),
    workflow: { ...exact(WORKFLOW_PATH), branch },
  };
}

function serializeYaml(value) {
  return Buffer.from(YAML.stringify(value, { lineWidth: 0 }), "utf8");
}

function serializeJson(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function packageBytes(existingBytes, projectRoot) {
  let manifest;
  if (existingBytes === null) {
    manifest = {
      name: path.basename(projectRoot).toLowerCase().replace(/[^a-z0-9-]+/g, "-") || "nkf-project",
      private: true,
      scripts: { "nkf:check": CHECK_COMMAND },
    };
  } else {
    manifest = parseStrictJson(existingBytes);
    if (manifest === null || typeof manifest !== "object" || Array.isArray(manifest)) {
      fail("package.json must contain a JSON object.");
    }
    if (
      manifest.scripts !== undefined &&
      (manifest.scripts === null ||
        typeof manifest.scripts !== "object" ||
        Array.isArray(manifest.scripts))
    ) {
      fail("package.json scripts must be an object.");
    }
    const current = manifest.scripts?.["nkf:check"];
    if (current !== undefined && current !== CHECK_COMMAND) {
      fail("package.json already defines an incompatible nkf:check command.");
    }
    manifest.scripts = { ...(manifest.scripts ?? {}), "nkf:check": CHECK_COMMAND };
  }
  return serializeJson(manifest);
}

function packageLockBytes(packageManifestBytes) {
  const manifest = parseStrictJson(packageManifestBytes);
  for (const field of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
    if (manifest[field] !== undefined && Object.keys(manifest[field]).length > 0) {
      fail(
        "A project with package dependencies must supply its own committed package-lock.json before NKF integration.",
      );
    }
  }
  return serializeJson({
    name: manifest.name,
    lockfileVersion: 3,
    requires: true,
    packages: {
      "": {
        name: manifest.name,
        private: manifest.private === true,
      },
    },
  });
}

async function currentExecutableBytes() {
  const candidate = path.resolve(fileURLToPath(import.meta.url));
  return readFile(candidate);
}

async function targetFiles(projectRoot, archiveBytes, verification, rootProfile) {
  const files = new Map();
  const branch = defaultBranch(projectRoot);
  const adopterBytes = await currentExecutableBytes();
  const { assetName, tag } = releaseIdentity(verification.archive_sha256);
  const archivePath = `${RELEASE_DIRECTORY}/${assetName}`;

  files.set(archivePath, Buffer.from(archiveBytes));
  files.set(ADOPTER_PATH, adopterBytes);
  files.set(PROTOCOL_PATH, Buffer.from(neutralProtocol, "utf8"));
  for (const skillPath of SKILL_PATHS) {
    files.set(skillPath, Buffer.from(portableSkill, "utf8"));
  }
  files.set(VERIFIER_PATH, Buffer.from(VERIFIER_SOURCE, "utf8"));
  files.set(WORKFLOW_PATH, Buffer.from(workflow(branch), "utf8"));

  for (const [relative, block] of [
    ["AGENTS.md", ROOT_BLOCK],
    ["CLAUDE.md", IMPORT_BLOCK],
    ["GEMINI.md", IMPORT_BLOCK],
    [".github/copilot-instructions.md", COPILOT_BLOCK],
  ]) {
    files.set(
      relative,
      mergeBlock(await readRegularInside(projectRoot, relative, false), block, relative),
    );
  }

  const manifestBytes = packageBytes(
    await readRegularInside(projectRoot, "package.json", false),
    projectRoot,
  );
  files.set("package.json", manifestBytes);
  if ((await readRegularInside(projectRoot, LOCK_PATH, false)) === null) {
    files.set(LOCK_PATH, packageLockBytes(manifestBytes));
  }
  const registry = integrationRegistry(files, branch);
  files.set(REGISTRY_PATH, serializeYaml(registry));
  files.set(
    PIN_PATH,
    serializeJson({
      contract: "nkf.consumer-release-pin",
      nkf_version: "0.1",
      repository: "kaveh6202/Nourd.NKF",
      archive: {
        sha256: verification.archive_sha256,
        tag,
        asset_name: assetName,
        project_path: archivePath,
      },
      source_commit: verification.release_commit,
      checker_sha256: verification.checker_sha256,
      adopter: {
        path: ADOPTER_PATH,
        sha256: digest(adopterBytes),
      },
      integration_revision: INTEGRATION_REVISION,
      root_profile: rootProfile,
    }),
  );
  return files;
}

async function ensureWritableParents(projectRoot, relativePaths) {
  for (const relative of relativePaths) {
    const parts = relative.split("/").slice(0, -1);
    let current = projectRoot;
    for (const part of parts) {
      current = path.join(current, part);
      const stat = await lstat(current).catch(() => null);
      if (stat?.isSymbolicLink()) {
        fail(`A target directory is a symbolic link: ${relative}`);
      }
      if (stat !== null && !stat.isDirectory()) {
        fail(`A target path component is not a directory: ${relative}`);
      }
    }
  }
}

async function writeTransaction(projectRoot, files, verifyAfterWrite, removedPaths = []) {
  await ensureWritableParents(projectRoot, [...files.keys(), ...removedPaths]);
  for (const relative of removedPaths) {
    if (files.has(relative)) fail(`A transaction path cannot be written and removed: ${relative}`);
  }
  const staging = await mkdtemp(
    path.join(projectRoot, ".nkf-transaction-"),
  );
  const originals = new Map();
  const replaced = [];
  const createdDirectories = new Set();
  const ensureTargetDirectory = async (directory) => {
    const missing = [];
    let cursor = directory;
    while (inside(projectRoot, cursor) && cursor !== projectRoot) {
      const stat = await lstat(cursor).catch(() => null);
      if (stat !== null) break;
      missing.push(cursor);
      cursor = path.dirname(cursor);
    }
    await mkdir(directory, { recursive: true });
    for (const item of missing) createdDirectories.add(item);
  };
  try {
    for (const [relative, bytes] of files) {
      const staged = path.join(staging, ...relative.split("/"));
      await mkdir(path.dirname(staged), { recursive: true });
      await writeFile(staged, bytes, { flag: "wx" });
      originals.set(relative, await readRegularInside(projectRoot, relative, false));
    }
    for (const relative of removedPaths) {
      const original = await readRegularInside(projectRoot, relative, true);
      originals.set(relative, original);
    }
    for (const [relative] of files) {
      const target = path.join(projectRoot, ...relative.split("/"));
      const staged = path.join(staging, ...relative.split("/"));
      await ensureTargetDirectory(path.dirname(target));
      const current = await lstat(target).catch(() => null);
      if (current?.isSymbolicLink() || (current !== null && !current.isFile())) {
        fail(`Adoption target is not a regular file: ${relative}`);
      }
      replaced.push(relative);
      if (current !== null) await unlink(target);
      await rename(staged, target);
    }
    for (const relative of removedPaths) {
      const target = path.join(projectRoot, ...relative.split("/"));
      replaced.push(relative);
      await unlink(target);
    }
    return await verifyAfterWrite();
  } catch (error) {
    for (const relative of replaced.reverse()) {
      const target = path.join(projectRoot, ...relative.split("/"));
      const original = originals.get(relative);
      await rm(target, { force: true });
      if (original !== null) {
        await mkdir(path.dirname(target), { recursive: true });
        await writeFile(target, original);
      }
    }
    for (const directory of [...createdDirectories].sort(
      (left, right) => right.split(path.sep).length - left.split(path.sep).length,
    )) {
      await rmdir(directory).catch(() => undefined);
    }
    throw error;
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

function requirePinShape(pin) {
  const exactKeys = (value, expected, label) => {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      fail(`${label} must be an object.`);
    }
    if (
      JSON.stringify(Object.keys(value).sort()) !==
      JSON.stringify([...expected].sort())
    ) {
      fail(`${label} contains unsupported fields.`);
    }
  };
  exactKeys(
    pin,
    [
      "adopter",
      "archive",
      "checker_sha256",
      "contract",
      "integration_revision",
      "nkf_version",
      "repository",
      "root_profile",
      "source_commit",
    ],
    "Consumer release pin",
  );
  exactKeys(pin.archive, ["asset_name", "project_path", "sha256", "tag"], "Pinned archive");
  exactKeys(pin.adopter, ["path", "sha256"], "Pinned adopter");
  if (
    pin?.contract !== "nkf.consumer-release-pin" ||
    pin?.nkf_version !== "0.1" ||
    pin?.repository !== "kaveh6202/Nourd.NKF" ||
    !/^[0-9a-f]{64}$/.test(pin?.archive?.sha256 ?? "") ||
    pin?.archive?.asset_name !==
      `nourd-nkf-sha256-${pin?.archive?.sha256}.tar` ||
    pin?.archive?.tag !== `release-sha256-${pin?.archive?.sha256}` ||
    !/^[0-9a-f]{40}$/.test(pin?.source_commit ?? "") ||
    !/^[0-9a-f]{64}$/.test(pin?.checker_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(pin?.adopter?.sha256 ?? "") ||
    pin?.adopter?.path !== ADOPTER_PATH ||
    pin?.integration_revision !== INTEGRATION_REVISION ||
    !ROOT_PROFILES.has(pin?.root_profile)
  ) {
    fail("The installed NKF release pin is invalid or unsupported.");
  }
  const archivePath = safeRelative(
    pin.archive.project_path,
    "Pinned archive path",
  );
  if (archivePath !== `${RELEASE_DIRECTORY}/${pin.archive.asset_name}`) {
    fail("The pinned archive path does not match its content identity.");
  }
  return pin;
}

async function verifyIntegration(projectRoot, pin) {
  const adopter = await readRegularInside(projectRoot, ADOPTER_PATH);
  if (digest(adopter) !== pin.adopter.sha256) {
    fail("The installed adopter differs from its immutable pin.");
  }
  const protocol = await readRegularInside(projectRoot, PROTOCOL_PATH);
  if (protocol.toString("utf8") !== neutralProtocol) {
    fail("The installed neutral authoring protocol differs.");
  }
  for (const skillPath of SKILL_PATHS) {
    const skill = await readRegularInside(projectRoot, skillPath);
    if (skill.toString("utf8") !== portableSkill) {
      fail(`The installed portable skill differs: ${skillPath}`);
    }
  }
  verifyBlock(await readRegularInside(projectRoot, "AGENTS.md"), ROOT_BLOCK, "AGENTS.md");
  verifyBlock(await readRegularInside(projectRoot, "CLAUDE.md"), IMPORT_BLOCK, "CLAUDE.md");
  verifyBlock(await readRegularInside(projectRoot, "GEMINI.md"), IMPORT_BLOCK, "GEMINI.md");
  verifyBlock(
    await readRegularInside(projectRoot, ".github/copilot-instructions.md"),
    COPILOT_BLOCK,
    ".github/copilot-instructions.md",
  );
  const verifier = await readRegularInside(projectRoot, VERIFIER_PATH);
  if (verifier.toString("utf8") !== VERIFIER_SOURCE) {
    fail("The installed integration verifier differs.");
  }
  const registryBytes = await readRegularInside(projectRoot, REGISTRY_PATH);
  const registry = YAML.parse(registryBytes.toString("utf8"));
  if (
    registry?.contract !== "nkf.consumer-integration" ||
    registry?.version !== INTEGRATION_REVISION ||
    registry?.canonical_command !== "npm run nkf:check"
  ) {
    fail("The installed integration registry is invalid.");
  }
  const workflowBytes = await readRegularInside(projectRoot, WORKFLOW_PATH);
  if (
    typeof registry.workflow?.branch !== "string" ||
    workflowBytes.toString("utf8") !== workflow(registry.workflow.branch) ||
    digest(workflowBytes) !== registry.workflow.sha256
  ) {
    fail("The installed NKF workflow differs from the registry.");
  }
  const exactFiles = new Map([
    [PROTOCOL_PATH, protocol],
    [SKILL_PATHS[0], Buffer.from(portableSkill, "utf8")],
    [SKILL_PATHS[1], Buffer.from(portableSkill, "utf8")],
    [VERIFIER_PATH, verifier],
    [WORKFLOW_PATH, workflowBytes],
  ]);
  const expectedRegistry = serializeYaml(
    integrationRegistry(exactFiles, registry.workflow.branch),
  );
  if (!registryBytes.equals(expectedRegistry)) {
    fail("The installed integration registry differs from its canonical form.");
  }
  const packageManifest = parseStrictJson(
    await readRegularInside(projectRoot, "package.json"),
  );
  if (packageManifest?.scripts?.["nkf:check"] !== CHECK_COMMAND) {
    fail("The project nkf:check command differs from the installed contract.");
  }
  const packageLock = parseStrictJson(
    await readRegularInside(projectRoot, LOCK_PATH),
  );
  if (
    ![2, 3].includes(packageLock?.lockfileVersion) ||
    packageLock?.packages === null ||
    typeof packageLock?.packages !== "object" ||
    Array.isArray(packageLock?.packages)
  ) {
    fail("The project package-lock.json cannot support the installed exact-commit workflow.");
  }
  return registry;
}

async function verifyInstalled(projectRoot, runChecker) {
  const { bundle } = await requireBundle(projectRoot);
  const pin = requirePinShape(
    parseStrictJson(await readRegularInside(projectRoot, PIN_PATH)),
  );
  if (pin.root_profile !== bundle.root.profile) {
    fail("The installed Root Profile pin differs from the current bundle.");
  }
  await verifyIntegration(projectRoot, pin);
  const archiveBytes = await readRegularInside(
    projectRoot,
    pin.archive.project_path,
  );
  const verification = verifyReleaseArchive(archiveBytes, pin.archive.sha256);
  if (
    verification.release_commit !== pin.source_commit ||
    verification.checker_sha256 !== pin.checker_sha256
  ) {
    fail("The verified release manifest differs from the installed pin.");
  }
  let report = null;
  if (runChecker) {
    const invocation = await invokeVerifiedChecker(verification, [
      "--project",
      projectRoot,
      "--level",
      "full-bundle",
      "--runner",
      "nourd-nkf-consumer",
    ]);
    report = parseStrictJson(Buffer.from(invocation.stdout, "utf8"));
  }
  return { pin, verification, report };
}

async function validateCompleteCandidate(projectRoot, files, removedPaths = []) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-candidate-"));
  const candidate = path.join(temporary, "project");
  try {
    await cp(projectRoot, candidate, {
      recursive: true,
      filter(source) {
        const relative = path.relative(projectRoot, source);
        if (relative === "") return true;
        const first = relative.split(path.sep)[0];
        return first !== ".git" && first !== "node_modules" && !first.startsWith(".nkf-transaction-");
      },
    });
    await ensureWritableParents(candidate, files.keys());
    for (const relative of removedPaths) {
      const target = path.join(candidate, ...safeRelative(relative, "Removed candidate path").split("/"));
      const current = await lstat(target).catch(() => null);
      if (current === null || !current.isFile() || current.isSymbolicLink()) {
        fail(`Removed candidate path is not a regular file: ${relative}`);
      }
      await unlink(target);
    }
    for (const [relative, bytes] of files) {
      const target = path.join(candidate, ...relative.split("/"));
      const current = await lstat(target).catch(() => null);
      if (current?.isSymbolicLink() || (current !== null && !current.isFile())) {
        fail(`Candidate target is not a regular file: ${relative}`);
      }
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, bytes);
    }
    return await verifyInstalled(candidate, true);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

async function installOrUpdate(command, options) {
  if (Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10) < 22) {
    fail("NKF adoption requires Node.js 22 or later.");
  }
  const projectRoot = await requireProjectRoot(options.project);
  const { bundle } = await requireBundle(projectRoot);
  const expectedSha256 = requireSha256(options.sha256);
  const priorBytes = await readRegularInside(projectRoot, PIN_PATH, false);
  if (command === "update" && priorBytes === null) {
    fail("Update requires an existing NKF consumer release pin.");
  }
  if (priorBytes !== null) {
    await verifyInstalled(projectRoot, false);
  }
  const archiveBytes = await acquireArchive(options, expectedSha256);
  const verification = verifyReleaseArchive(archiveBytes, expectedSha256);
  const files = await targetFiles(
    projectRoot,
    archiveBytes,
    verification,
    bundle.root.profile,
  );
  if (priorBytes === null) {
    for (const relative of [
      ADOPTER_PATH,
      PROTOCOL_PATH,
      ...SKILL_PATHS,
      REGISTRY_PATH,
      VERIFIER_PATH,
      WORKFLOW_PATH,
    ]) {
      const current = await readRegularInside(projectRoot, relative, false);
      if (current !== null && !current.equals(files.get(relative))) {
        fail(`Installation would overwrite an existing owned path: ${relative}`);
      }
    }
  }
  const nextPin = parseStrictJson(files.get(PIN_PATH));
  if (priorBytes !== null) {
    const prior = requirePinShape(parseStrictJson(priorBytes));
    if (
      prior.archive.sha256 === nextPin.archive.sha256 &&
      prior.adopter.sha256 === nextPin.adopter.sha256 &&
      prior.integration_revision === nextPin.integration_revision
    ) {
      await verifyInstalled(projectRoot, true);
      return { state: "no-update", project: projectRoot, pin: prior };
    }
  }
  await validateCompleteCandidate(projectRoot, files);
  const installed = await writeTransaction(
    projectRoot,
    files,
    () => verifyInstalled(projectRoot, true),
  );
  return {
    state: priorBytes === null ? "installed" : "updated",
    project: projectRoot,
    pin: installed.pin,
  };
}

async function inspectForOnboarding(options) {
  for (const required of [
    "created-at",
    "output",
    "profile",
    "project",
    "root-id",
    "root-title",
    "task-id",
  ]) {
    if (options[required] === undefined) fail(`inspect requires --${required}.`);
  }
  const result = await createOnboardingWorkspace({
    projectRoot: options.project,
    knowledgeRoot: options["knowledge-root"] ?? "knowledge",
    outputRoot: options.output,
    profile: options.profile,
    rootId: options["root-id"],
    rootTitle: options["root-title"],
    taskId: options["task-id"],
    authority: options.authority ?? "human-product-owner",
    createdAt: options["created-at"],
  });
  return {
    contract: "nkf.onboarding-inspect-result",
    nkf_version: "0.1",
    state: result.inspection.mechanically_ready ? "workspace-created" : "blocked",
    mechanically_ready: result.inspection.mechanically_ready,
    workspace: result.workspace,
    inspection_sha256: result.inspection.snapshot_sha256,
    project_entries: result.inspection.observed.project_entries,
    regular_files: result.inspection.observed.regular_files,
    markdown_files: result.inspection.observed.markdown_files,
    project_surfaces: result.inspection.project_surfaces.filter(
      (surface) => surface.state === "file",
    ),
    package_scripts: result.inspection.package_scripts,
    git: result.inspection.git,
    diagnostics: result.inspection.diagnostics,
  };
}

function requireOnboardingReceipt(value) {
  requireExactKeys(
    value,
    [
      "assessment",
      "changed_paths",
      "contract",
      "created_paths",
      "inspection_sha256",
      "knowledge_root",
      "nkf_version",
      "plan_sha256",
      "preserved_paths",
      "profile",
    ],
    "Onboarding receipt",
  );
  if (
    value?.contract !== "nkf.onboarding-receipt" ||
    value?.nkf_version !== "0.1" ||
    !/^[0-9a-f]{64}$/.test(value?.plan_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value?.inspection_sha256 ?? "") ||
    !ROOT_PROFILES.has(value?.profile) ||
    typeof value?.knowledge_root !== "string" ||
    typeof value?.assessment !== "object" ||
    !["empty-repository", "tiny-knowledge-no-source-or-configuration"].includes(
      value?.assessment?.category,
    ) ||
    !["recommended", "not-recommended", "indeterminate"].includes(
      value?.assessment?.recommendation,
    ) ||
    !Array.isArray(value?.created_paths) ||
    !Array.isArray(value?.changed_paths) ||
    !Array.isArray(value?.preserved_paths)
  ) {
    fail("The installed onboarding receipt is invalid.");
  }
  value.knowledge_root = safeRelative(value.knowledge_root, "Onboarding receipt knowledge_root");
  value.created_paths = requireReceiptPaths(value.created_paths, "Onboarding receipt created_paths");
  value.changed_paths = requireReceiptPaths(value.changed_paths, "Onboarding receipt changed_paths");
  value.preserved_paths = requireReceiptPaths(value.preserved_paths, "Onboarding receipt preserved_paths");
  requireDisjointReceiptPaths(
    {
      created_paths: value.created_paths,
      changed_paths: value.changed_paths,
      preserved_paths: value.preserved_paths,
    },
    "Onboarding receipt",
  );
  return value;
}

function requirePredecessorOnboardingReceipt(value) {
  requireExactKeys(
    value,
    [
      ...(value?.assessment === undefined ? [] : ["assessment"]),
      "changed_paths",
      "contract",
      "created_paths",
      "inspection_sha256",
      "knowledge_root",
      "nkf_version",
      "plan_sha256",
      "preserved_paths",
      "profile",
    ],
    "Predecessor onboarding receipt",
  );
  if (
    value?.contract !== "nkf.onboarding-receipt" ||
    value?.nkf_version !== "0.1" ||
    !/^[0-9a-f]{64}$/.test(value?.plan_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value?.inspection_sha256 ?? "") ||
    !ROOT_PROFILES.has(value?.profile) ||
    typeof value?.knowledge_root !== "string" ||
    !Array.isArray(value?.created_paths) ||
    !Array.isArray(value?.changed_paths) ||
    !Array.isArray(value?.preserved_paths)
  ) {
    fail("The predecessor onboarding receipt is invalid.");
  }
  if (value.assessment !== undefined) return requireOnboardingReceipt(value);
  value.knowledge_root = safeRelative(value.knowledge_root, "Predecessor receipt knowledge_root");
  value.created_paths = requireReceiptPaths(value.created_paths, "Predecessor receipt created_paths");
  value.changed_paths = requireReceiptPaths(value.changed_paths, "Predecessor receipt changed_paths");
  value.preserved_paths = requireReceiptPaths(value.preserved_paths, "Predecessor receipt preserved_paths");
  requireDisjointReceiptPaths(
    {
      created_paths: value.created_paths,
      changed_paths: value.changed_paths,
      preserved_paths: value.preserved_paths,
    },
    "Predecessor onboarding receipt",
  );
  return value;
}

function onboardingResult(state, projectRoot, receipt, installed, knowledge = null) {
  return {
    contract: "nkf.onboarding-result",
    nkf_version: "0.1",
    state,
    project: projectRoot,
    profile: receipt.profile,
    knowledge_root: receipt.knowledge_root,
    paths: {
      created: receipt.created_paths,
      changed: receipt.changed_paths,
      preserved: receipt.preserved_paths,
    },
    meaning: {
      root_status: "draft",
      classification_status: "resolved",
      substantive_meaning: "contains-unresolved",
      realization_confirmation: "unconfirmed",
    },
    onboarding_assessment: {
      category: receipt.assessment.category,
      recommendation: receipt.assessment.recommendation,
      confirmation: receipt.assessment.confirmation.status,
      mechanically_proven: false,
    },
    validation: {
      conformance: installed.report?.conformance ?? "passed",
      governing_use: installed.report?.governing_use ?? "not-ready",
    },
    release: {
      archive_sha256: installed.pin.archive.sha256,
      source_commit: installed.pin.source_commit,
      checker_sha256: installed.pin.checker_sha256,
      adopter_sha256: installed.pin.adopter.sha256,
    },
    non_claims: [
      "project-meaning-not-accepted",
      "repository-category-not-mechanically-proven",
      "realization-not-confirmed",
      "git-state-not-inspected",
      "remote-enforcement-not-inspected",
    ],
  };
}

async function onboard(options) {
  if (Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10) < 22) {
    fail("NKF onboarding requires Node.js 22 or later.");
  }
  for (const required of ["plan", "project", "sha256"]) {
    if (options[required] === undefined) fail(`onboard requires --${required}.`);
  }
  const projectRoot = await requireProjectRoot(options.project);
  const planPath = path.resolve(options.plan);
  const planStat = await lstat(planPath).catch(() => null);
  if (planStat === null || !planStat.isFile() || planStat.isSymbolicLink()) {
    fail("--plan must identify a regular onboarding plan file.");
  }
  const planBytes = await readFile(planPath);
  const planSha256 = digest(planBytes);
  const priorReceiptBytes = await readRegularInside(
    projectRoot,
    ONBOARDING_RECEIPT_PATH,
    false,
  );
  if (priorReceiptBytes !== null) {
    const receipt = requireOnboardingReceipt(parseStrictJson(priorReceiptBytes));
    if (receipt.plan_sha256 !== planSha256) {
      fail(
        "The project was onboarded with a different plan; use governed authoring or a deliberate migration workflow.",
      );
    }
    const installed = await verifyInstalled(projectRoot, true);
    return onboardingResult("no-update", projectRoot, receipt, installed);
  }
  const existingNourd = await lstat(path.join(projectRoot, ".nourd")).catch(() => null);
  if (existingNourd !== null) {
    fail("Initial onboarding requires a project without .nourd.");
  }
  const expectedSha256 = requireSha256(options.sha256);
  const archiveBytes = await acquireArchive(options, expectedSha256);
  const verification = verifyReleaseArchive(archiveBytes, expectedSha256);
  const knowledge = await buildOnboardingKnowledge(projectRoot, planPath);
  const integration = await targetFiles(
    projectRoot,
    archiveBytes,
    verification,
    knowledge.plan.project.profile,
  );
  const files = new Map(knowledge.files);
  for (const [relative, bytes] of integration) {
    if (files.has(relative)) fail(`Generated onboarding targets conflict: ${relative}`);
    files.set(relative, bytes);
  }
  for (const relative of [
    ADOPTER_PATH,
    PROTOCOL_PATH,
    ...SKILL_PATHS,
    REGISTRY_PATH,
    VERIFIER_PATH,
    WORKFLOW_PATH,
  ]) {
    const current = await readRegularInside(projectRoot, relative, false);
    if (current !== null && !current.equals(files.get(relative))) {
      fail(`Onboarding would overwrite an existing owned path: ${relative}`);
    }
  }
  const createdPaths = [];
  const changedPaths = [];
  for (const [relative, bytes] of files) {
    const current = await readRegularInside(projectRoot, relative, false);
    if (current === null) createdPaths.push(relative);
    else if (!current.equals(bytes)) changedPaths.push(relative);
  }
  createdPaths.push(ONBOARDING_RECEIPT_PATH);
  createdPaths.sort();
  changedPaths.sort();
  const receipt = {
    contract: "nkf.onboarding-receipt",
    nkf_version: "0.1",
    plan_sha256: knowledge.plan_sha256,
    inspection_sha256: knowledge.inspection.snapshot_sha256,
    profile: knowledge.plan.project.profile,
    knowledge_root: knowledge.plan.inspection.knowledge_root,
    assessment: knowledge.plan.assessment,
    created_paths: createdPaths,
    changed_paths: changedPaths,
    preserved_paths: knowledge.preserved_documents,
  };
  files.set(ONBOARDING_RECEIPT_PATH, serializeOnboardingReceipt(receipt));
  await validateCompleteCandidate(projectRoot, files);
  const installed = await writeTransaction(
    projectRoot,
    files,
    () => {
      if (process.env.NKF_ONBOARDING_TEST_FAIL_AFTER_WRITE === "1") {
        fail("Injected onboarding transaction failure.");
      }
      return verifyInstalled(projectRoot, true);
    },
  );
  return onboardingResult("onboarded", projectRoot, receipt, installed, knowledge);
}

function requireTopologyRepairReceipt(value) {
  requireExactKeys(
    value,
    [
      "candidate_sha256",
      "changed_paths",
      "contract",
      "created_paths",
      "nkf_version",
      "predecessor_release",
      "preserved_paths",
      "removed_paths",
      "successor_release",
    ],
    "Topology-repair receipt",
  );
  if (
    value?.contract !== "nkf.topology-repair-receipt" ||
    value?.nkf_version !== "0.1" ||
    typeof value?.predecessor_release !== "object" ||
    typeof value?.successor_release !== "object" ||
    !/^[0-9a-f]{64}$/.test(value?.candidate_sha256 ?? "") ||
    !Array.isArray(value?.created_paths) ||
    !Array.isArray(value?.changed_paths) ||
    !Array.isArray(value?.removed_paths) ||
    !Array.isArray(value?.preserved_paths)
  ) {
    fail("The installed topology-repair receipt is invalid.");
  }
  requireExactKeys(
    value.predecessor_release,
    ["adopter_sha256", "archive_sha256", "source_commit", "task"],
    "Topology-repair predecessor release",
  );
  requireExactKeys(
    value.successor_release,
    ["adopter_sha256", "archive_sha256", "checker_sha256", "source_commit"],
    "Topology-repair successor release",
  );
  if (
    !["NKF-013", "NKF-015"].includes(value.predecessor_release.task) ||
    !/^[0-9a-f]{64}$/.test(value.predecessor_release.archive_sha256 ?? "") ||
    !/^[0-9a-f]{40}$/.test(value.predecessor_release.source_commit ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.predecessor_release.adopter_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.successor_release.archive_sha256 ?? "") ||
    !/^[0-9a-f]{40}$/.test(value.successor_release.source_commit ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.successor_release.checker_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.successor_release.adopter_sha256 ?? "")
  ) {
    fail("The installed topology-repair release lineage is invalid.");
  }
  value.created_paths = requireReceiptPaths(value.created_paths, "Topology-repair created_paths");
  value.changed_paths = requireReceiptPaths(value.changed_paths, "Topology-repair changed_paths");
  value.removed_paths = requireReceiptPaths(value.removed_paths, "Topology-repair removed_paths");
  value.preserved_paths = requireReceiptPaths(value.preserved_paths, "Topology-repair preserved_paths");
  requireDisjointReceiptPaths(
    {
      created_paths: value.created_paths,
      changed_paths: value.changed_paths,
      removed_paths: value.removed_paths,
      preserved_paths: value.preserved_paths,
    },
    "Topology-repair receipt",
  );
  return value;
}

function repairCandidateSha256(files, removals) {
  const entries = [
    ...[...files].map(([relative, bytes]) => ({ path: relative, sha256: digest(bytes), operation: "write" })),
    ...removals.map((relative) => ({ path: relative, sha256: null, operation: "remove" })),
  ].sort((left, right) => left.path.localeCompare(right.path));
  return digest(Buffer.from(`${JSON.stringify(entries)}\n`, "utf8"));
}

async function repairTopology(options) {
  if (Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10) < 22) {
    fail("NKF topology repair requires Node.js 22 or later.");
  }
  for (const required of ["project", "sha256"]) {
    if (options[required] === undefined) fail(`repair-topology requires --${required}.`);
  }
  const projectRoot = await requireProjectRoot(options.project);
  const priorRepairBytes = await readRegularInside(projectRoot, TOPOLOGY_REPAIR_RECEIPT_PATH, false);
  if (priorRepairBytes !== null) {
    const receipt = requireTopologyRepairReceipt(parseStrictJson(priorRepairBytes));
    const installed = await verifyInstalled(projectRoot, true);
    if (
      receipt.successor_release.archive_sha256 !== installed.pin.archive.sha256 ||
      receipt.successor_release.source_commit !== installed.pin.source_commit ||
      receipt.successor_release.checker_sha256 !== installed.pin.checker_sha256 ||
      receipt.successor_release.adopter_sha256 !== installed.pin.adopter.sha256
    ) {
      fail("The topology-repair receipt does not match the installed successor release.");
    }
    return {
      contract: "nkf.topology-repair-result",
      nkf_version: "0.1",
      state: "no-update",
      project: projectRoot,
      receipt,
    };
  }
  const onboardingReceipt = requirePredecessorOnboardingReceipt(
    parseStrictJson(await readRegularInside(projectRoot, ONBOARDING_RECEIPT_PATH)),
  );
  const predecessorPin = requirePinShape(
    parseStrictJson(await readRegularInside(projectRoot, PIN_PATH)),
  );
  const { bundle: predecessorBundle, knowledgeRoot: predecessorKnowledgeRoot } =
    await requireBundle(projectRoot);
  if (
    onboardingReceipt.profile !== predecessorPin.root_profile ||
    onboardingReceipt.profile !== predecessorBundle.root.profile ||
    onboardingReceipt.knowledge_root !== predecessorKnowledgeRoot
  ) {
    fail("The predecessor onboarding receipt does not match the installed bundle and release pin.");
  }
  const predecessorTask = ELIGIBLE_TOPOLOGY_PREDECESSORS.get(predecessorPin.adopter.sha256);
  if (predecessorTask === undefined) {
    fail("Topology repair is limited to trusted NKF-013 or NKF-015 onboarding predecessors.");
  }
  const predecessorAdopter = await readRegularInside(projectRoot, ADOPTER_PATH);
  if (digest(predecessorAdopter) !== predecessorPin.adopter.sha256) {
    fail("The predecessor adopter bytes do not match their trusted receipt lineage.");
  }
  const predecessorArchive = await readRegularInside(projectRoot, predecessorPin.archive.project_path);
  const predecessorVerification = verifyReleaseArchive(predecessorArchive, predecessorPin.archive.sha256);
  if (
    predecessorVerification.release_commit !== predecessorPin.source_commit ||
    predecessorVerification.checker_sha256 !== predecessorPin.checker_sha256
  ) {
    fail("The predecessor release archive differs from its installed pin.");
  }
  const predecessorInvocation = await invokeVerifiedChecker(predecessorVerification, [
    "--project",
    projectRoot,
    "--level",
    "full-bundle",
    "--runner",
    "nourd-nkf-topology-predecessor",
    "--no-persist",
  ]);
  const predecessorReport = parseStrictJson(Buffer.from(predecessorInvocation.stdout, "utf8"));
  if (predecessorReport.conformance !== "passed") {
    fail("The predecessor snapshot is not conformant under its pinned checker.");
  }

  const expectedSha256 = requireSha256(options.sha256);
  const successorArchive = await acquireArchive(options, expectedSha256);
  const successorVerification = verifyReleaseArchive(successorArchive, expectedSha256);
  const topology = await buildPortableTopologyRepair(projectRoot, onboardingReceipt);
  const integration = await targetFiles(
    projectRoot,
    successorArchive,
    successorVerification,
    predecessorPin.root_profile,
  );
  const files = new Map(topology.files);
  for (const [relative, bytes] of integration) files.set(relative, bytes);
  const createdPaths = [];
  const changedPaths = [];
  for (const [relative, bytes] of files) {
    const current = await readRegularInside(projectRoot, relative, false);
    if (current === null) createdPaths.push(relative);
    else if (!current.equals(bytes)) changedPaths.push(relative);
  }
  createdPaths.push(TOPOLOGY_REPAIR_RECEIPT_PATH);
  createdPaths.sort();
  changedPaths.sort();
  const removedPaths = [...topology.removals].sort();
  const repairReceipt = {
    contract: "nkf.topology-repair-receipt",
    nkf_version: "0.1",
    predecessor_release: {
      task: predecessorTask,
      archive_sha256: predecessorPin.archive.sha256,
      source_commit: predecessorPin.source_commit,
      adopter_sha256: predecessorPin.adopter.sha256,
    },
    successor_release: {
      archive_sha256: successorVerification.archive_sha256,
      source_commit: successorVerification.release_commit,
      checker_sha256: successorVerification.checker_sha256,
      adopter_sha256: digest(await currentExecutableBytes()),
    },
    candidate_sha256: repairCandidateSha256(files, removedPaths),
    created_paths: createdPaths,
    changed_paths: changedPaths,
    removed_paths: removedPaths,
    preserved_paths: topology.preserved_paths,
  };
  files.set(TOPOLOGY_REPAIR_RECEIPT_PATH, serializeOnboardingReceipt(repairReceipt));
  await validateCompleteCandidate(projectRoot, files, removedPaths);
  const installed = await writeTransaction(
    projectRoot,
    files,
    () => {
      if (process.env.NKF_TOPOLOGY_REPAIR_TEST_FAIL_AFTER_WRITE === "1") {
        fail("Injected topology-repair transaction failure.");
      }
      return verifyInstalled(projectRoot, true);
    },
    removedPaths,
  );
  return {
    contract: "nkf.topology-repair-result",
    nkf_version: "0.1",
    state: "repaired",
    project: projectRoot,
    receipt: repairReceipt,
    validation: {
      conformance: installed.report?.conformance ?? "passed",
      governing_use: installed.report?.governing_use ?? "not-ready",
    },
  };
}

async function main() {
  const { command, options } = parseArguments(process.argv.slice(2));
  if (command === "inspect") return inspectForOnboarding(options);
  if (command === "seal") {
    if (options.project === undefined || options.plan === undefined) {
      fail("seal requires --project and --plan.");
    }
    return sealOnboardingPlan(options.project, options.plan);
  }
  if (command === "onboard") return onboard(options);
  if (command === "repair-topology") return repairTopology(options);
  if (command === "install" || command === "update") {
    return installOrUpdate(command, options);
  }
  const projectRoot = await requireProjectRoot(options.project);
  const installed = await verifyInstalled(projectRoot, command === "check");
  return {
    state: command === "check" ? "passed" : "current",
    project: projectRoot,
    archive_sha256: installed.pin.archive.sha256,
    release_commit: installed.pin.source_commit,
    checker_sha256: installed.pin.checker_sha256,
    integration_revision: installed.pin.integration_revision,
  };
}

try {
  process.stdout.write(`${JSON.stringify(await main(), null, 2)}\n`);
} catch (error) {
  const structured = {
    contract: "nkf.adopter-error",
    nkf_version: "0.1",
    state: "failed",
    diagnostics: [
      {
        code: error instanceof OnboardingError ? error.code : "NKF-ADOPTER-FAILED",
        message: error instanceof Error ? error.message : String(error),
        ...(error instanceof OnboardingError ? error.details : {}),
      },
    ],
  };
  process.stderr.write(`${JSON.stringify(structured, null, 2)}\n`);
  process.exitCode = 1;
}
