import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
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
import neutralProtocol from "../../distribution/nkf/0.5/integrations/ai/nkf-authoring-protocol.md";
import portableSkill from "../../distribution/nkf/0.5/.agents/skills/nkf-authoring/SKILL.md";
import onboardingProtocol from "../../distribution/nkf/0.5/integrations/onboarding/nkf-onboarding-protocol.md";
import onboardingSkill from "../../distribution/nkf/0.5/.agents/skills/nkf-onboarding/SKILL.md";
import rootAdapter from "../../distribution/nkf/0.5/host-adapters/AGENTS.adapter.md";
import importAdapter from "../../distribution/nkf/0.5/host-adapters/CLAUDE.adapter.md";
import copilotAdapter from "../../distribution/nkf/0.5/host-adapters/copilot-instructions.adapter.md";
import neutralProtocol0_4 from "../../distribution/nkf/0.4/integrations/ai/nkf-authoring-protocol.md";
import portableSkill0_4 from "../../distribution/nkf/0.4/.agents/skills/nkf-authoring/SKILL.md";
import onboardingProtocol0_4 from "../../distribution/nkf/0.4/integrations/onboarding/nkf-onboarding-protocol.md";
import onboardingSkill0_4 from "../../distribution/nkf/0.4/.agents/skills/nkf-onboarding/SKILL.md";
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
  releaseEntriesForVersion,
  sha256,
  verifyReleaseArchive,
} from "../release/core.mjs";
import { readReleaseSet } from "../release/release-set.mjs";
import { migrateProjectTo0_5 } from "../migration/0-5-core.mjs";
import { sealBaseline0_5, writeReviewTemplate0_5 } from "../freshness/seal-baseline-0-5.mjs";
import {
  gateFreePredecessorTasks,
  validateRetrospectiveGateReview0_5,
  writePredecessorGateReviewTemplate0_5,
} from "../freshness/retrospective-gates-0-5.mjs";

const CURRENT_NKF_VERSION = "0.5";
const INTEGRATION_REVISION = 3;
const PIN_PATH = ".nourd/nkf-release.json";
const ADOPTER_PATH = ".nourd/tools/nkf/nourd-nkf-adopt.mjs";
const RELEASE_DIRECTORY = ".nourd/tools/nkf/releases";
const ONBOARDING_RECEIPT_PATH = ".nourd/onboarding-receipt.json";
const TOPOLOGY_REPAIR_RECEIPT_PATH = ".nourd/topology-repair-receipt.json";
const PROTOCOL_PATH = "integrations/ai/nkf-authoring-protocol.md";
const ONBOARDING_PROTOCOL_PATH = "integrations/onboarding/nkf-onboarding-protocol.md";
const REGISTRY_PATH = "integrations/ai/nkf-consumer-integration.yaml";
const VERIFIER_PATH = "scripts/verify-nkf-integration.mjs";
const WORKFLOW_PATH = ".github/workflows/nkf-contracts.yml";
const LOCK_PATH = "package-lock.json";
const SKILL_PATHS = [
  ".agents/skills/nkf-authoring/SKILL.md",
  ".claude/skills/nkf-authoring/SKILL.md",
];
const ONBOARDING_SKILL_PATHS = [
  ".agents/skills/nkf-onboarding/SKILL.md",
  ".claude/skills/nkf-onboarding/SKILL.md",
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
const PINNED_SCRIPT_NAME = "nkf:check:pinned";
const HOST_SCRIPT_NAME = "nkf:check:host";
const HOST_CHAIN = `npm run ${PINNED_SCRIPT_NAME} && npm run ${HOST_SCRIPT_NAME}`;
const BLOCK_START = "<!-- nkf-authoring-adapter:start -->";
const BLOCK_END = "<!-- nkf-authoring-adapter:end -->";
const ROOT_BLOCK = rootAdapter.trimEnd();
const IMPORT_BLOCK = importAdapter.trimEnd();
const COPILOT_BLOCK = copilotAdapter.trimEnd();
const EXACT_ROOT_IMPORT = Buffer.from("@AGENTS.md\n", "utf8");
const EXACT_COPILOT_BOOTSTRAP = Buffer.from(`# NKF Authoring Adapter

For every NKF-governed knowledge operation, read and follow
\`integrations/ai/nkf-authoring-protocol.md\` before editing governed files.

Use \`npm run nkf:check\` as the only supported authoring-handoff validation
command. Keep acceptance, Realization confirmation, conformance, local Git
state, and remote enforcement state separate.
`, "utf8");

function guidanceForVersion(nkfVersion) {
  return nkfVersion === "0.4"
    ? {
        neutralProtocol: neutralProtocol0_4,
        portableSkill: portableSkill0_4,
        onboardingProtocol: onboardingProtocol0_4,
        onboardingSkill: onboardingSkill0_4,
      }
    : { neutralProtocol, portableSkill, onboardingProtocol, onboardingSkill };
}
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
  const publicAdopt = values.length === 0 || values[0]?.startsWith("--");
  const result = { command: publicAdopt ? "adopt" : values[0], options: {} };
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
    "task",
    "repin",
    "refs",
    "linkify",
    "set",
    "migrate",
    "adopt",
  ].includes(result.command)) {
    fail(
      "Usage: nourd-nkf-adopt.mjs --project <path> [--plan <sealed-plan>] [--recommendation <catalog>] [--archive <archive>|--github-repository kaveh6202/Nourd.NKF] [--accept-breaking <authority>]",
    );
  }
  for (let index = publicAdopt ? 0 : 1; index < values.length; index += 2) {
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
  if (result.command === "adopt") {
    allowed = new Set([
      "accept-breaking",
      "archive",
      "candidate-binding",
      "github-repository",
      "plan",
      "project",
      "review",
      "recommendation",
      "sha256",
    ]);
  } else if (result.command === "inspect") {
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
      "review",
      "sha256",
    ]);
  } else if (["install", "update", "repair-topology", "migrate"].includes(result.command)) {
    allowed = new Set(["archive", "github-repository", "project", "review", "sha256"]);
  } else if (result.command === "task") {
    allowed = new Set(["project", "task", "to", "result-file", "checker"]);
  } else {
    allowed = new Set(["project"]);
  }
  for (const name of Object.keys(result.options)) {
    if (!allowed.has(name)) fail(`Unknown argument: --${name}`);
  }
  return result;
}

function requireRecommendedRelease(value, candidateBinding = undefined) {
  requireExactKeys(
    value,
    [
      "adopter_sha256",
      "archive",
      "authority",
      "channel",
      "compatibility",
      "contract",
      "nkf_version",
      "release",
      "source_commit",
      "state",
      "supported_root_profiles",
      "checker_sha256",
    ],
    "Recommended release",
  );
  requireExactKeys(
    value.archive,
    ["asset_name", "sha256", "size", "tag", "url"],
    "Recommended archive",
  );
  requireExactKeys(
    value.authority,
    ["executable_sha256", "markdown_sha256"],
    "Recommended authority",
  );
  requireExactKeys(
    value.release,
    ["prerelease", "published_at", "url", "visibility"],
    "Recommended publication",
  );
  if (!Array.isArray(value.compatibility) || value.compatibility.length === 0) {
    fail("Recommended release compatibility must be a non-empty array.");
  }
  const compatibility = new Map();
  for (const [index, entry] of value.compatibility.entries()) {
    requireExactKeys(
      entry,
      ["classification", "from_nkf_version", "migration_required", "summary"],
      `Recommended compatibility[${index}]`,
    );
    if (
      !["0.1", "0.2", "0.3", "0.4", "0.5"].includes(entry.from_nkf_version) ||
      !["breaking", "non-breaking"].includes(entry.classification) ||
      typeof entry.migration_required !== "boolean" ||
      typeof entry.summary !== "string" ||
      entry.summary.trim() !== entry.summary ||
      entry.summary === "" ||
      compatibility.has(entry.from_nkf_version)
    ) {
      fail("Recommended release compatibility is invalid or ambiguous.");
    }
    if (
      (entry.classification === "breaking") !== entry.migration_required
    ) {
      fail("Recommended release compatibility classification and migration requirement differ.");
    }
    compatibility.set(entry.from_nkf_version, entry);
  }
  const archiveSha256 = value.archive.sha256;
  const { assetName, tag } = releaseIdentity(archiveSha256);
  const candidate = candidateBinding !== undefined;
  if (candidate && candidateBinding !== archiveSha256) {
    fail("The internal candidate binding differs from the selected archive digest.");
  }
  const releaseStateValid = candidate
    ? value.contract === "nkf.release-candidate-binding" &&
      value.state === "candidate" &&
      value.channel === "internal-exact-candidate" &&
      value.release.prerelease === true &&
      value.release.published_at === null &&
      value.release.url === null &&
      value.release.visibility === "unpublished"
    : value.contract === "nkf.recommended-release" &&
      value.state === "recommended" &&
      value.channel === "internal-private-github-prerelease" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value.release.published_at ?? "") &&
      value.release.prerelease === true &&
      value.release.visibility === "private" &&
      value.release.url ===
        `https://github.com/kaveh6202/Nourd.NKF/releases/tag/${tag}`;
  if (
    !releaseStateValid ||
    value.nkf_version !== CURRENT_NKF_VERSION ||
    !/^[0-9a-f]{64}$/.test(archiveSha256 ?? "") ||
    value.archive.asset_name !== assetName ||
    value.archive.tag !== tag ||
    !Number.isSafeInteger(value.archive.size) ||
    value.archive.size <= 0 ||
    (candidate
      ? value.archive.url !== null
      : value.archive.url !==
        `https://github.com/kaveh6202/Nourd.NKF/releases/download/${tag}/${assetName}`) ||
    !/^[0-9a-f]{40}$/.test(value.source_commit ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.checker_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.adopter_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.authority.markdown_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.authority.executable_sha256 ?? "") ||
    JSON.stringify(value.supported_root_profiles) !==
      JSON.stringify(["nkf.profile.product", "nkf.profile.technology"]) ||
    compatibility.get("0.1")?.classification !== "breaking" ||
    compatibility.get("0.1")?.migration_required !== true ||
    compatibility.get("0.2")?.classification !== "breaking" ||
    compatibility.get("0.2")?.migration_required !== true ||
    compatibility.get("0.3")?.classification !== "breaking" ||
    compatibility.get("0.3")?.migration_required !== true ||
    compatibility.get("0.4")?.classification !== "breaking" ||
    compatibility.get("0.4")?.migration_required !== true ||
    compatibility.get("0.5")?.classification !== "non-breaking" ||
    compatibility.get("0.5")?.migration_required !== false
  ) {
    fail("The recommended release catalog is invalid or inconsistent.");
  }
  return { catalog: value, compatibility };
}

async function resolveRecommendedRelease(options) {
  if (
    options["candidate-binding"] !== undefined &&
    (!/^[0-9a-f]{64}$/.test(options["candidate-binding"]) ||
      options.recommendation === undefined ||
      options.archive === undefined ||
      options["github-repository"] !== undefined)
  ) {
    fail(
      "Internal candidate binding requires one full digest, local candidate catalog, and local archive.",
    );
  }
  let bytes;
  if (options.recommendation !== undefined) {
    const recommendationPath = path.resolve(options.recommendation);
    const stat = await lstat(recommendationPath).catch(() => null);
    if (stat === null || !stat.isFile() || stat.isSymbolicLink()) {
      fail("--recommendation must identify a regular recommended-release catalog.");
    }
    bytes = await readFile(recommendationPath);
  } else {
    let encoded;
    try {
      encoded = execFileSync(
        "gh",
        [
          "api",
          "repos/kaveh6202/Nourd.NKF/contents/release/recommended.json",
          "--method",
          "GET",
          "-f",
          "ref=master",
          "--jq",
          ".content",
        ],
        { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
      );
    } catch (error) {
      const detail = error?.stderr?.toString().trim();
      fail(
        `Unable to resolve the governed recommended release from kaveh6202/Nourd.NKF${detail ? `: ${detail}` : "."}`,
      );
    }
    bytes = Buffer.from(encoded.replace(/\s/g, ""), "base64");
  }
  return requireRecommendedRelease(
    parseStrictJson(bytes),
    options["candidate-binding"],
  );
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
  if (!["0.1", "0.2", "0.3", "0.4", "0.5"].includes(bundle?.nkf_version) || bundle?.contract !== "nkf.bundle") {
    fail("The project must already declare a supported NKF bundle.");
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

function requireHostWorkflow(bytes) {
  let value;
  try {
    value = YAML.parse(bytes.toString("utf8"));
  } catch (error) {
    fail(`The declared host workflow is invalid YAML: ${error.message}`);
  }
  const jobs = value?.jobs;
  if (jobs === null || typeof jobs !== "object" || Array.isArray(jobs)) {
    fail("The declared host workflow has no jobs mapping.");
  }
  const steps = Object.values(jobs).flatMap((job) =>
    Array.isArray(job?.steps) ? job.steps : []);
  if (!steps.some((step) => step?.run === "npm run nkf:check")) {
    fail("The declared host workflow does not invoke the canonical NKF command exactly.");
  }
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

function integrationRegistry(files, branch, integration, exactAdapterModes = new Map()) {
  const exact = (relative) => ({
    path: relative,
    sha256: digest(files.get(relative)),
  });
  const adapter = (relative, block) => {
    const exactMode = exactAdapterModes.get(relative);
    if (exactMode === "exact-import") {
      return {
          path: relative,
          mode: "exact-import",
          target: "AGENTS.md",
          sha256: digest(EXACT_ROOT_IMPORT),
      };
    }
    if (exactMode === "exact-bootstrap") {
      return {
        path: relative,
        mode: "exact-bootstrap",
        sha256: digest(EXACT_COPILOT_BOOTSTRAP),
      };
    }
    return {
      path: relative,
      mode: "bounded-block",
      block_sha256: digest(Buffer.from(block)),
    };
  };
  return {
    contract: "nkf.consumer-integration",
    version: INTEGRATION_REVISION,
    canonical_command: "npm run nkf:check",
    mode: integration.mode,
    scripts: integration.scripts,
    protocol: exact(PROTOCOL_PATH),
    skills: SKILL_PATHS.map(exact),
    onboarding_protocol: exact(ONBOARDING_PROTOCOL_PATH),
    onboarding_skills: ONBOARDING_SKILL_PATHS.map(exact),
    adapters: [
      adapter("AGENTS.md", ROOT_BLOCK),
      adapter("CLAUDE.md", IMPORT_BLOCK),
      adapter("GEMINI.md", IMPORT_BLOCK),
      adapter(".github/copilot-instructions.md", COPILOT_BLOCK),
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

async function stageVerifiedHostRegistryMigration(projectRoot, files) {
  const registryPath = "integrations/ai/agent-hosts.yaml";
  const registryBytes = await readRegularInside(projectRoot, registryPath, false);
  if (registryBytes === null) return;

  let registry;
  try {
    registry = YAML.parse(registryBytes.toString("utf8"));
  } catch (error) {
    fail(`The existing agent-guidance registry is invalid YAML: ${error.message}`);
  }
  if (registry?.contract !== "nkf.agent-guidance-registry" || registry?.version !== 1) {
    return;
  }

  let changed = false;
  const updateExact = async (binding, label) => {
    if (binding === null || typeof binding !== "object" || Array.isArray(binding)) {
      fail(`${label} must be an exact path and digest binding.`);
    }
    const relative = safeRelative(binding.path, `${label} path`);
    const staged = files.get(relative);
    if (staged === undefined) return;
    if (!/^[0-9a-f]{64}$/.test(binding.sha256 ?? "")) {
      fail(`${label} has an invalid SHA-256 binding.`);
    }
    const current = await readRegularInside(projectRoot, relative);
    if (digest(current) !== binding.sha256) {
      fail(`${label} has drifted from its pre-migration digest binding.`);
    }
    binding.sha256 = digest(staged);
    changed = true;
  };

  await updateExact(registry.neutral_protocol, "Neutral authoring protocol");
  if (!Array.isArray(registry.adapters)) {
    fail("The agent-guidance registry adapters must be an array.");
  }
  for (const [index, adapter] of registry.adapters.entries()) {
    await updateExact(adapter, `Agent adapter ${index}`);
  }

  if (
    registry.skills === null ||
    typeof registry.skills !== "object" ||
    Array.isArray(registry.skills) ||
    !Array.isArray(registry.skills.representations) ||
    !/^[0-9a-f]{64}$/.test(registry.skills.sha256 ?? "")
  ) {
    fail("The agent-guidance registry skill binding is invalid.");
  }
  const stagedSkillDigests = new Set();
  let stagedSkill = false;
  for (const [index, value] of registry.skills.representations.entries()) {
    const relative = safeRelative(value, `Skill representation ${index}`);
    const current = await readRegularInside(projectRoot, relative);
    if (digest(current) !== registry.skills.sha256) {
      fail(`Skill representation ${relative} has drifted from its pre-migration digest binding.`);
    }
    const staged = files.get(relative);
    if (staged !== undefined) {
      stagedSkill = true;
      stagedSkillDigests.add(digest(staged));
    }
  }
  if (stagedSkill) {
    if (stagedSkillDigests.size !== 1) {
      fail("The staged portable authoring skill representations are not byte-identical.");
    }
    registry.skills.sha256 = [...stagedSkillDigests][0];
    changed = true;
  }

  if (changed) files.set(registryPath, serializeYaml(registry));
}

async function updateVerifiedStagedArtifactBindings(
  projectRoot,
  originalBundleBytes,
  stagedBundleBytes,
  files,
) {
  const original = YAML.parse(originalBundleBytes.toString("utf8"));
  const staged = YAML.parse(stagedBundleBytes.toString("utf8"));
  const originalArtifacts = new Map(
    (original.governed_artifacts ?? []).map((artifact) => [artifact?.path, artifact]),
  );
  if (!Array.isArray(staged.governed_artifacts)) return stagedBundleBytes;

  for (const artifact of staged.governed_artifacts) {
    if (typeof artifact?.path !== "string" || !files.has(artifact.path)) continue;
    const relative = safeRelative(artifact.path, "Governed artifact path");
    const predecessor = originalArtifacts.get(relative);
    if (
      predecessor?.digest?.algorithm !== "sha-256" ||
      !/^[0-9a-f]{64}$/.test(predecessor?.digest?.value ?? "") ||
      artifact?.digest?.algorithm !== "sha-256" ||
      artifact?.digest?.value !== predecessor.digest.value
    ) {
      fail(`The governed artifact binding changed before migration: ${relative}`);
    }
    const current = await readRegularInside(projectRoot, relative);
    if (digest(current) !== predecessor.digest.value) {
      fail(`The governed artifact has drifted before migration: ${relative}`);
    }
    artifact.digest.value = digest(files.get(relative));
  }
  return serializeYaml(staged);
}

function packageBytes(existingBytes, projectRoot) {
  let manifest;
  if (existingBytes === null) {
    manifest = {
      name: path.basename(projectRoot).toLowerCase().replace(/[^a-z0-9-]+/g, "-") || "nkf-project",
      private: true,
      scripts: {},
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
  }
  const scripts = { ...(manifest.scripts ?? {}) };
  const declaration = manifest.nkf?.integration;
  let integration;
  if (declaration === undefined) {
    const current = scripts["nkf:check"];
    if (current !== undefined && current !== CHECK_COMMAND) {
      fail(
        "package.json already defines nkf:check; declare an exact NKF host-superset integration before adoption.",
      );
    }
    scripts["nkf:check"] = CHECK_COMMAND;
    integration = {
      mode: "default",
      scripts: {
        canonical: CHECK_COMMAND,
        pinned: null,
        host: null,
      },
    };
  } else {
    requireExactKeys(declaration, ["host_script", "mode"], "NKF integration declaration");
    const hostScript = declaration.host_script;
    if (
      declaration.mode !== "host-superset" ||
      typeof hostScript !== "string" ||
      hostScript.trim() !== hostScript ||
      hostScript === "" ||
      hostScript === CHECK_COMMAND ||
      hostScript === HOST_CHAIN ||
      hostScript.includes(PINNED_SCRIPT_NAME) ||
      hostScript.includes(HOST_SCRIPT_NAME)
    ) {
      fail("The NKF host-superset declaration is invalid or recursive.");
    }
    if (![hostScript, HOST_CHAIN].includes(scripts["nkf:check"])) {
      fail("The declared host script does not match the exact pre-adoption nkf:check command.");
    }
    if (
      scripts[PINNED_SCRIPT_NAME] !== undefined &&
      scripts[PINNED_SCRIPT_NAME] !== CHECK_COMMAND
    ) {
      fail("The existing pinned NKF check script conflicts with the declared integration.");
    }
    if (
      scripts[HOST_SCRIPT_NAME] !== undefined &&
      scripts[HOST_SCRIPT_NAME] !== hostScript
    ) {
      fail("The existing host NKF check script conflicts with the declared integration.");
    }
    scripts["nkf:check"] = HOST_CHAIN;
    scripts[PINNED_SCRIPT_NAME] = CHECK_COMMAND;
    scripts[HOST_SCRIPT_NAME] = hostScript;
    integration = {
      mode: "host-superset",
      scripts: {
        canonical: HOST_CHAIN,
        pinned: CHECK_COMMAND,
        host: hostScript,
      },
    };
  }
  manifest.scripts = scripts;
  return { bytes: serializeJson(manifest), integration };
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
  const archivedAdopter = verification.entries.get("dist/nourd-nkf-adopt.mjs");
  if (!Buffer.isBuffer(archivedAdopter) || !archivedAdopter.equals(adopterBytes)) {
    fail("The executing adopter differs from the adopter carried by the target release archive.");
  }
  const { assetName, tag } = releaseIdentity(verification.archive_sha256);
  const archivePath = `${RELEASE_DIRECTORY}/${assetName}`;
  const packageResult = packageBytes(
    await readRegularInside(projectRoot, "package.json", false),
    projectRoot,
  );

  files.set(archivePath, Buffer.from(archiveBytes));
  files.set(ADOPTER_PATH, adopterBytes);
  const guidance = guidanceForVersion(verification.manifest.nkf_version);
  files.set(PROTOCOL_PATH, Buffer.from(guidance.neutralProtocol, "utf8"));
  for (const skillPath of SKILL_PATHS) {
    files.set(skillPath, Buffer.from(guidance.portableSkill, "utf8"));
  }
  files.set(ONBOARDING_PROTOCOL_PATH, Buffer.from(guidance.onboardingProtocol, "utf8"));
  for (const skillPath of ONBOARDING_SKILL_PATHS) {
    files.set(skillPath, Buffer.from(guidance.onboardingSkill, "utf8"));
  }
  files.set(VERIFIER_PATH, Buffer.from(VERIFIER_SOURCE, "utf8"));
  if (packageResult.integration.mode === "host-superset") {
    const hostWorkflow = await readRegularInside(projectRoot, WORKFLOW_PATH, false);
    if (hostWorkflow === null) {
      files.set(WORKFLOW_PATH, Buffer.from(workflow(branch), "utf8"));
    } else {
      requireHostWorkflow(hostWorkflow);
      files.set(WORKFLOW_PATH, hostWorkflow);
    }
  } else {
    files.set(WORKFLOW_PATH, Buffer.from(workflow(branch), "utf8"));
  }

  const exactAdapterModes = new Map();
  for (const [relative, block] of [
    ["AGENTS.md", ROOT_BLOCK],
    ["CLAUDE.md", IMPORT_BLOCK],
    ["GEMINI.md", IMPORT_BLOCK],
    [".github/copilot-instructions.md", COPILOT_BLOCK],
  ]) {
    const existing = await readRegularInside(projectRoot, relative, false);
    if (
      (relative === "CLAUDE.md" || relative === "GEMINI.md") &&
      existing?.equals(EXACT_ROOT_IMPORT)
    ) {
      files.set(relative, existing);
      exactAdapterModes.set(relative, "exact-import");
    } else if (
      relative === ".github/copilot-instructions.md" &&
      existing?.equals(EXACT_COPILOT_BOOTSTRAP)
    ) {
      files.set(relative, existing);
      exactAdapterModes.set(relative, "exact-bootstrap");
    } else {
      files.set(relative, mergeBlock(existing, block, relative));
    }
  }

  const manifestBytes = packageResult.bytes;
  files.set("package.json", manifestBytes);
  if ((await readRegularInside(projectRoot, LOCK_PATH, false)) === null) {
    files.set(LOCK_PATH, packageLockBytes(manifestBytes));
  }
  const registry = integrationRegistry(
    files,
    branch,
    packageResult.integration,
    exactAdapterModes,
  );
  files.set(REGISTRY_PATH, serializeYaml(registry));
  files.set(
    PIN_PATH,
    serializeJson({
      contract: "nkf.consumer-release-pin",
      nkf_version: verification.manifest.nkf_version,
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
      integration: packageResult.integration,
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
  const legacy = pin?.integration_revision === 1 && pin?.integration === undefined;
  exactKeys(
    pin,
    legacy ? [
      "adopter",
      "archive",
      "checker_sha256",
      "contract",
      "integration_revision",
      "nkf_version",
      "repository",
      "root_profile",
      "source_commit",
    ] : [
      "adopter",
      "archive",
      "checker_sha256",
      "contract",
      "integration",
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
  if (legacy) {
    if (
      pin?.contract !== "nkf.consumer-release-pin" ||
      !["0.1", "0.2"].includes(pin?.nkf_version) ||
      pin?.repository !== "kaveh6202/Nourd.NKF" ||
      !/^[0-9a-f]{64}$/.test(pin?.archive?.sha256 ?? "") ||
      pin?.archive?.asset_name !== `nourd-nkf-sha256-${pin?.archive?.sha256}.tar` ||
      pin?.archive?.tag !== `release-sha256-${pin?.archive?.sha256}` ||
      !/^[0-9a-f]{40}$/.test(pin?.source_commit ?? "") ||
      !/^[0-9a-f]{64}$/.test(pin?.checker_sha256 ?? "") ||
      !/^[0-9a-f]{64}$/.test(pin?.adopter?.sha256 ?? "") ||
      pin?.adopter?.path !== ADOPTER_PATH ||
      !ROOT_PROFILES.has(pin?.root_profile)
    ) {
      fail("The installed legacy NKF release pin is invalid or unsupported.");
    }
    const legacyArchivePath = safeRelative(pin.archive.project_path, "Pinned archive path");
    if (legacyArchivePath !== `${RELEASE_DIRECTORY}/${pin.archive.asset_name}`) {
      fail("The pinned archive path does not match its content identity.");
    }
    return pin;
  }
  exactKeys(pin.integration, ["mode", "scripts"], "Pinned integration");
  exactKeys(
    pin.integration.scripts,
    ["canonical", "host", "pinned"],
    "Pinned integration scripts",
  );
  const defaultIntegration =
    pin.integration.mode === "default" &&
    pin.integration.scripts.canonical === CHECK_COMMAND &&
    pin.integration.scripts.pinned === null &&
    pin.integration.scripts.host === null;
  const hostIntegration =
    pin.integration.mode === "host-superset" &&
    pin.integration.scripts.canonical === HOST_CHAIN &&
    pin.integration.scripts.pinned === CHECK_COMMAND &&
    typeof pin.integration.scripts.host === "string" &&
    pin.integration.scripts.host !== "" &&
    !pin.integration.scripts.host.includes(PINNED_SCRIPT_NAME) &&
    !pin.integration.scripts.host.includes(HOST_SCRIPT_NAME);
  if (
    pin?.contract !== "nkf.consumer-release-pin" ||
    !["0.1", "0.2", "0.3", "0.4", "0.5"].includes(pin?.nkf_version) ||
    pin?.repository !== "kaveh6202/Nourd.NKF" ||
    !/^[0-9a-f]{64}$/.test(pin?.archive?.sha256 ?? "") ||
    pin?.archive?.asset_name !==
      `nourd-nkf-sha256-${pin?.archive?.sha256}.tar` ||
    pin?.archive?.tag !== `release-sha256-${pin?.archive?.sha256}` ||
    !/^[0-9a-f]{40}$/.test(pin?.source_commit ?? "") ||
    !/^[0-9a-f]{64}$/.test(pin?.checker_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(pin?.adopter?.sha256 ?? "") ||
    pin?.adopter?.path !== ADOPTER_PATH ||
    (pin?.nkf_version === CURRENT_NKF_VERSION
      ? pin?.integration_revision !== INTEGRATION_REVISION
      : ![2, INTEGRATION_REVISION].includes(pin?.integration_revision)) ||
    (!defaultIntegration && !hostIntegration) ||
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
  const guidance = guidanceForVersion(pin.nkf_version);
  const adopter = await readRegularInside(projectRoot, ADOPTER_PATH);
  if (digest(adopter) !== pin.adopter.sha256) {
    fail("The installed adopter differs from its immutable pin.");
  }
  const protocol = await readRegularInside(projectRoot, PROTOCOL_PATH);
  if (protocol.toString("utf8") !== guidance.neutralProtocol) {
    fail("The installed neutral authoring protocol differs.");
  }
  for (const skillPath of SKILL_PATHS) {
    const skill = await readRegularInside(projectRoot, skillPath);
    if (skill.toString("utf8") !== guidance.portableSkill) {
      fail(`The installed portable skill differs: ${skillPath}`);
    }
  }
  const installedOnboardingProtocol = await readRegularInside(
    projectRoot,
    ONBOARDING_PROTOCOL_PATH,
  );
  if (installedOnboardingProtocol.toString("utf8") !== guidance.onboardingProtocol) {
    fail("The installed onboarding protocol differs.");
  }
  for (const skillPath of ONBOARDING_SKILL_PATHS) {
    const skill = await readRegularInside(projectRoot, skillPath);
    if (skill.toString("utf8") !== guidance.onboardingSkill) {
      fail(`The installed onboarding skill differs: ${skillPath}`);
    }
  }
  const verifier = await readRegularInside(projectRoot, VERIFIER_PATH);
  if (verifier.toString("utf8") !== VERIFIER_SOURCE) {
    fail("The installed integration verifier differs.");
  }
  const registryBytes = await readRegularInside(projectRoot, REGISTRY_PATH);
  const registry = YAML.parse(registryBytes.toString("utf8"));
  if (
    registry?.contract !== "nkf.consumer-integration" ||
    registry?.version !== INTEGRATION_REVISION ||
    registry?.canonical_command !== "npm run nkf:check" ||
    registry?.mode !== pin.integration.mode ||
    JSON.stringify(registry?.scripts) !== JSON.stringify(pin.integration.scripts)
  ) {
    fail("The installed integration registry is invalid.");
  }
  const exactAdapterModes = new Map();
  const adapterByPath = new Map(
    Array.isArray(registry.adapters)
      ? registry.adapters.map((adapter) => [adapter?.path, adapter])
      : [],
  );
  verifyBlock(await readRegularInside(projectRoot, "AGENTS.md"), ROOT_BLOCK, "AGENTS.md");
  for (const relative of ["CLAUDE.md", "GEMINI.md"]) {
    const adapter = adapterByPath.get(relative);
    const bytes = await readRegularInside(projectRoot, relative);
    if (adapter?.mode === "exact-import") {
      if (!bytes.equals(EXACT_ROOT_IMPORT)) {
        fail(`The installed exact root import differs in ${relative}.`);
      }
      exactAdapterModes.set(relative, "exact-import");
    } else {
      verifyBlock(bytes, IMPORT_BLOCK, relative);
    }
  }
  const copilotPath = ".github/copilot-instructions.md";
  const copilotBytes = await readRegularInside(projectRoot, copilotPath);
  if (adapterByPath.get(copilotPath)?.mode === "exact-bootstrap") {
    if (!copilotBytes.equals(EXACT_COPILOT_BOOTSTRAP)) {
      fail("The installed exact Copilot bootstrap differs.");
    }
    exactAdapterModes.set(copilotPath, "exact-bootstrap");
  } else {
    verifyBlock(copilotBytes, COPILOT_BLOCK, copilotPath);
  }
  const workflowBytes = await readRegularInside(projectRoot, WORKFLOW_PATH);
  if (
    typeof registry.workflow?.branch !== "string" ||
    digest(workflowBytes) !== registry.workflow.sha256
  ) {
    fail("The installed NKF workflow differs from the registry.");
  }
  if (pin.integration.mode === "default") {
    if (workflowBytes.toString("utf8") !== workflow(registry.workflow.branch)) {
      fail("The installed default NKF workflow differs from its canonical form.");
    }
  } else {
    requireHostWorkflow(workflowBytes);
  }
  const exactFiles = new Map([
    [PROTOCOL_PATH, protocol],
    [SKILL_PATHS[0], Buffer.from(guidance.portableSkill, "utf8")],
    [SKILL_PATHS[1], Buffer.from(guidance.portableSkill, "utf8")],
    [ONBOARDING_PROTOCOL_PATH, installedOnboardingProtocol],
    [ONBOARDING_SKILL_PATHS[0], Buffer.from(guidance.onboardingSkill, "utf8")],
    [ONBOARDING_SKILL_PATHS[1], Buffer.from(guidance.onboardingSkill, "utf8")],
    [VERIFIER_PATH, verifier],
    [WORKFLOW_PATH, workflowBytes],
  ]);
  const expectedRegistry = serializeYaml(
    integrationRegistry(
      exactFiles,
      registry.workflow.branch,
      pin.integration,
      exactAdapterModes,
    ),
  );
  if (!registryBytes.equals(expectedRegistry)) {
    fail("The installed integration registry differs from its canonical form.");
  }
  const packageManifest = parseStrictJson(
    await readRegularInside(projectRoot, "package.json"),
  );
  if (
    packageManifest?.scripts?.["nkf:check"] !== pin.integration.scripts.canonical ||
    (pin.integration.mode === "default" &&
      (packageManifest.scripts[PINNED_SCRIPT_NAME] !== undefined ||
        packageManifest.scripts[HOST_SCRIPT_NAME] !== undefined)) ||
    (pin.integration.mode === "host-superset" &&
      (packageManifest.scripts[PINNED_SCRIPT_NAME] !== pin.integration.scripts.pinned ||
        packageManifest.scripts[HOST_SCRIPT_NAME] !== pin.integration.scripts.host ||
        packageManifest?.nkf?.integration?.mode !== "host-superset" ||
        packageManifest?.nkf?.integration?.host_script !== pin.integration.scripts.host))
  ) {
    fail("The project NKF script chain differs from the exact installed integration.");
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
  if (pin.nkf_version !== bundle.nkf_version) {
    fail("The installed release pin NKF version differs from the current bundle.");
  }
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
    verification.manifest.nkf_version !== pin.nkf_version ||
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

async function verifyPredecessorInstallation(projectRoot, priorBytes) {
  const pin = requirePinShape(parseStrictJson(priorBytes));
  const archiveBytes = await readRegularInside(
    projectRoot,
    pin.archive.project_path,
  );
  const verification = verifyReleaseArchive(archiveBytes, pin.archive.sha256);
  if (
    verification.manifest.nkf_version !== pin.nkf_version ||
    verification.release_commit !== pin.source_commit ||
    verification.checker_sha256 !== pin.checker_sha256
  ) {
    fail("The predecessor release archive differs from its installed pin.");
  }
  const adopterBytes = await readRegularInside(projectRoot, pin.adopter.path);
  if (digest(adopterBytes) !== pin.adopter.sha256) {
    fail("The predecessor adopter differs from its installed pin.");
  }
  const archivedAdopter = verification.entries.get("dist/nourd-nkf-adopt.mjs");
  if (
    ["0.2", "0.3", "0.4", "0.5"].includes(verification.manifest.nkf_version) &&
    (!Buffer.isBuffer(archivedAdopter) || digest(archivedAdopter) !== pin.adopter.sha256)
  ) {
    fail("The predecessor adopter is not bound by its release archive.");
  }
  const result = spawnSync(
    process.execPath,
    [path.join(projectRoot, ...pin.adopter.path.split("/")), "integration-check", "--project", projectRoot],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    fail(
      `The predecessor installation did not validate with its pinned adopter: ${result.stderr || result.stdout}`,
    );
  }
  return { pin, verification };
}

async function validateCompleteCandidate(projectRoot, files, removedPaths = [], verifier = null) {
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
    return await (verifier ?? ((root) => verifyInstalled(root, true)))(candidate);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

async function regularFileInventory(root) {
  const inventory = new Map();
  async function walk(directory, prefix = "") {
    for (const entry of (await readdir(directory, { withFileTypes: true })).sort((left, right) => left.name.localeCompare(right.name, "en"))) {
      if (prefix === "" && [".git", "node_modules"].includes(entry.name)) continue;
      if (prefix === "" && entry.name.startsWith(".nkf-transaction-")) continue;
      const relative = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) await walk(absolute, relative);
      else if (entry.isFile()) inventory.set(relative, await readFile(absolute));
    }
  }
  await walk(root);
  return inventory;
}

async function verified0_5Checker(temporary, verification) {
  const root = path.join(temporary, "nourd-nkf");
  for (const entry of verification.release_entries) {
    const bytes = verification.entries.get(entry.path);
    if (!Buffer.isBuffer(bytes)) fail(`The verified archive omits ${entry.path}.`);
    const target = path.join(root, ...entry.path.split("/"));
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, bytes);
  }
  const bytes = verification.entries.get("dist/nourd-nkf-checker.mjs");
  if (!Buffer.isBuffer(bytes) || digest(bytes) !== verification.checker_sha256) {
    fail("The verified NKF 0.5 archive does not carry its manifest-bound checker.");
  }
  return path.join(root, "dist/nourd-nkf-checker.mjs");
}

async function require0_5Readiness(projectRoot, verification) {
  const invocation = await invokeVerifiedChecker(verification, [
    "--project", projectRoot,
    "--level", "full-bundle",
    "--purpose", "whole-root-readiness",
    "--require-readiness",
    "--runner", "nourd-nkf-adopter",
    "--no-persist",
  ]);
  const report = parseStrictJson(Buffer.from(invocation.stdout, "utf8"));
  if (report.conformance !== "passed" || report.readiness?.state !== "ready") {
    fail("The staged NKF 0.5 candidate is not conformant and ready against its reviewed baseline.");
  }
  return report;
}

async function prepare0_5Candidate(
  projectRoot,
  seedFiles,
  reviewPath,
  verification,
  originalBundleBytes = null,
  seedRemovals = [],
) {
  if (reviewPath === undefined) {
    throw new OnboardingError(
      "NKF-ADOPT-REVIEW-PATH-REQUIRED",
      "NKF 0.5 onboarding and migration require --review with a writable path for the exact semantic graph review.",
      { next_action: "rerun-adopt-with-review-path" },
    );
  }
  const review = path.resolve(reviewPath);
  const reviewStat = await lstat(review).catch(() => null);
  if (reviewStat !== null && (!reviewStat.isFile() || reviewStat.isSymbolicLink())) {
    fail("--review must identify one regular semantic graph review file or one absent file to create as a review template.");
  }
  const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-0-5-adopt-"));
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
    await ensureWritableParents(candidate, seedFiles.keys());
    for (const relative of seedRemovals) {
      const target = path.join(candidate, ...safeRelative(relative, "Candidate removed path").split("/"));
      const stat = await lstat(target).catch(() => null);
      if (stat === null || !stat.isFile() || stat.isSymbolicLink()) {
        fail(`The legacy migration removal is not one regular project file: ${relative}`);
      }
      await unlink(target);
    }
    for (const [relative, bytes] of seedFiles) {
      const target = path.join(candidate, ...safeRelative(relative, "Candidate seed path").split("/"));
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, bytes);
    }
    const gateFree = await gateFreePredecessorTasks(candidate);
    let retrospective = null;
    let transitionFromGateReview = false;
    if (gateFree.tasks.length > 0) {
      if (reviewStat === null) {
        const template = await writePredecessorGateReviewTemplate0_5({ projectRoot: candidate, reviewPath: review });
        throw new OnboardingError(
          "NKF-ADOPT-RETROSPECTIVE-GATE-REVIEW-REQUIRED",
          "Adopt created the exact predecessor Task-gate review template and stopped before project mutation. Complete every gate and rerun the same Adopt command.",
          {
            review_template: template.path,
            candidate_tasks: template.tasks,
            review_stage: template.stage,
            next_action: "complete-retrospective-gates-and-rerun-adopt",
          },
        );
      }
      const supplied = YAML.parse(await readFile(review, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
      const gateInput = supplied?.stage === "predecessor-gates"
        ? supplied
        : supplied?.stage === "whole-root" && supplied.retrospective_gate_review !== undefined
          ? {
              contract: supplied.contract,
              nkf_version: supplied.nkf_version,
              stage: "predecessor-gates",
              retrospective_gate_review: supplied.retrospective_gate_review,
            }
          : null;
      if (gateInput === null) fail("A gate-free predecessor requires the preserved predecessor-gates review before whole-root review.");
      retrospective = await validateRetrospectiveGateReview0_5({ projectRoot: candidate, review: gateInput });
      transitionFromGateReview = supplied.stage === "predecessor-gates";
      for (const gate of retrospective.gates.values()) {
        const relative = `${gateFree.knowledgeRoot}/${gate.path}`;
        const target = path.join(candidate, ...relative.split("/"));
        const current = await readFile(target);
        if (!current.equals(gate.bytes)) fail(`The predecessor Task changed during retrospective review: ${gate.id}`);
        await writeFile(target, Buffer.concat([current, Buffer.from("\n\n", "utf8"), gate.gate_bytes]));
      }
    }
    const migration = await migrateProjectTo0_5(candidate, { retrospectiveGates: retrospective?.gates });
    const bundlePath = ".nourd/knowledge/bundle.yaml";
    if (originalBundleBytes !== null) {
      const candidateBundleBytes = await readRegularInside(candidate, bundlePath);
      await writeFile(
        path.join(candidate, ...bundlePath.split("/")),
        await updateVerifiedStagedArtifactBindings(
          projectRoot,
          originalBundleBytes,
          candidateBundleBytes,
          seedFiles,
        ),
      );
    }
    const checker = await verified0_5Checker(temporary, verification);
    if (reviewStat === null || transitionFromGateReview) {
      const template = await writeReviewTemplate0_5({
        projectRoot: candidate,
        checker,
        reviewPath: review,
        retrospectiveGateReview: retrospective?.review,
      });
      throw new OnboardingError(
        "NKF-ADOPT-SEMANTIC-REVIEW-REQUIRED",
        "Adopt created an exact candidate review template and stopped before project mutation. A human or agent must complete the review and rerun the same Adopt command.",
        {
          review_template: template.path,
          candidate_nodes: template.nodes,
          accepted_decisions: template.decisions,
          review_stage: template.stage,
          next_action: "complete-review-and-rerun-adopt",
        },
      );
    }
    const baseline = await sealBaseline0_5({ projectRoot: candidate, checker, reviewPath: review });
    await require0_5Readiness(candidate, verification);
    const before = await regularFileInventory(projectRoot);
    const after = await regularFileInventory(candidate);
    const files = new Map();
    const removedPaths = [];
    for (const [relative, bytes] of after) {
      const current = before.get(relative);
      if (current === undefined || !current.equals(bytes)) files.set(relative, bytes);
    }
    for (const relative of before.keys()) {
      if (!after.has(relative)) {
        if (!seedRemovals.includes(relative)) {
          fail(`The NKF 0.5 migration attempted to remove a project file: ${relative}`);
        }
        removedPaths.push(relative);
      }
    }
    removedPaths.sort((left, right) => left.localeCompare(right, "en"));
    return { files, removedPaths, migration, baseline };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

async function verifyInstalled0_5Ready(projectRoot) {
  const installed = await verifyInstalled(projectRoot, true);
  const readiness = await require0_5Readiness(projectRoot, installed.verification);
  return { ...installed, readiness };
}

async function installOrUpdate(command, options, allowNonBreakingVersionUpgrade = false) {
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
    await verifyPredecessorInstallation(projectRoot, priorBytes);
  }
  const archiveBytes = await acquireArchive(options, expectedSha256);
  const verification = verifyReleaseArchive(archiveBytes, expectedSha256);
  const versionUpgrade = false;
  if (verification.manifest.nkf_version !== bundle.nkf_version && !versionUpgrade) {
    fail("Install or update requires a same-version release; use Adopt for migration.");
  }
  const files = await targetFiles(
    projectRoot,
    archiveBytes,
    verification,
    bundle.root.profile,
  );
  if (versionUpgrade) {
    await stageVerifiedHostRegistryMigration(projectRoot, files);
  }
  if (versionUpgrade) {
    const bundlePath = ".nourd/knowledge/bundle.yaml";
    const originalBundleBytes = await readRegularInside(projectRoot, bundlePath);
    const nextBundle = YAML.parse(originalBundleBytes.toString("utf8"));
    nextBundle.nkf_version = verification.manifest.nkf_version;
    files.set(bundlePath, serializeYaml(nextBundle));
    files.set(
      bundlePath,
      await updateVerifiedStagedArtifactBindings(
        projectRoot,
        originalBundleBytes,
        files.get(bundlePath),
        files,
      ),
    );
  }
  if (priorBytes === null) {
    for (const relative of [
      ADOPTER_PATH,
      PROTOCOL_PATH,
      ...SKILL_PATHS,
      ONBOARDING_PROTOCOL_PATH,
      ...ONBOARDING_SKILL_PATHS,
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
      prior.integration_revision === nextPin.integration_revision &&
      !versionUpgrade
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
    nkf_version: CURRENT_NKF_VERSION,
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
    !["0.1", "0.2", "0.3", "0.4", "0.5"].includes(value?.nkf_version) ||
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
    !["0.1", "0.2"].includes(value?.nkf_version) ||
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
    nkf_version: CURRENT_NKF_VERSION,
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
    ONBOARDING_PROTOCOL_PATH,
    ...ONBOARDING_SKILL_PATHS,
    REGISTRY_PATH,
    VERIFIER_PATH,
    WORKFLOW_PATH,
  ]) {
    const current = await readRegularInside(projectRoot, relative, false);
    if (current !== null && !current.equals(files.get(relative))) {
      fail(`Onboarding would overwrite an existing owned path: ${relative}`);
    }
  }
  const receipt = {
    contract: "nkf.onboarding-receipt",
    nkf_version: CURRENT_NKF_VERSION,
    plan_sha256: knowledge.plan_sha256,
    inspection_sha256: knowledge.inspection.snapshot_sha256,
    profile: knowledge.plan.project.profile,
    knowledge_root: knowledge.plan.inspection.knowledge_root,
    assessment: knowledge.plan.assessment,
    created_paths: [],
    changed_paths: [],
    preserved_paths: knowledge.preserved_documents,
  };
  files.set(ONBOARDING_RECEIPT_PATH, serializeOnboardingReceipt(receipt));
  const candidate = await prepare0_5Candidate(
    projectRoot,
    files,
    options.review,
    verification,
  );
  const createdPaths = [];
  const changedPaths = [];
  for (const [relative, bytes] of candidate.files) {
    const current = await readRegularInside(projectRoot, relative, false);
    if (current === null) createdPaths.push(relative);
    else if (!current.equals(bytes)) changedPaths.push(relative);
  }
  if (!createdPaths.includes(ONBOARDING_RECEIPT_PATH)) createdPaths.push(ONBOARDING_RECEIPT_PATH);
  createdPaths.sort((left, right) => left.localeCompare(right, "en"));
  changedPaths.sort((left, right) => left.localeCompare(right, "en"));
  receipt.created_paths = createdPaths;
  receipt.changed_paths = changedPaths;
  candidate.files.set(ONBOARDING_RECEIPT_PATH, serializeOnboardingReceipt(receipt));
  await validateCompleteCandidate(projectRoot, candidate.files, [], verifyInstalled0_5Ready);
  const installed = await writeTransaction(
    projectRoot,
    candidate.files,
    () => {
      if (process.env.NKF_ONBOARDING_TEST_FAIL_AFTER_WRITE === "1") {
        fail("Injected onboarding transaction failure.");
      }
      return verifyInstalled0_5Ready(projectRoot);
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
    !["0.1", "0.2"].includes(value?.nkf_version) ||
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
      nkf_version: "0.2",
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
  if (successorVerification.manifest.nkf_version !== predecessorBundle.nkf_version) {
    fail(
      `The successor release serves NKF ${successorVerification.manifest.nkf_version} but the project declares NKF ${predecessorBundle.nkf_version}; version migration is a separate deliberate adoption.`,
    );
  }
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
    nkf_version: "0.2",
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
    nkf_version: "0.2",
    state: "repaired",
    project: projectRoot,
    receipt: repairReceipt,
    validation: {
      conformance: installed.report?.conformance ?? "passed",
      governing_use: installed.report?.governing_use ?? "not-ready",
    },
  };
}


// --- Deterministic governed mechanics (ADR 0096) ---

const IDENTITY_GATE_HEADER = "| Capability | Finding | Verification | Exception |";

async function loadGovernedContext(projectRoot) {
  const { bundle, knowledgeRoot } = await requireBundle(projectRoot);
  const recordsDir = path.join(projectRoot, ".nourd/knowledge/records");
  const records = new Map();
  const decisionsByNumber = new Map();
  for (const entry of (await readdir(recordsDir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.name.endsWith(".yaml")) continue;
    const declarationPath = path.join(recordsDir, entry.name);
    const value = YAML.parse(await readFile(declarationPath, "utf8"));
    if (typeof value?.id !== "string" || typeof value?.source?.path !== "string") continue;
    records.set(value.id, {
      sourcePath: value.source.path,
      declarationFile: `.nourd/knowledge/records/${entry.name}`,
      type: value.type,
      status: value.governance?.status,
    });
    const adr = /^adr-(\d{4})$/.exec(value.id);
    if (adr && value.governance?.status === "accepted") decisionsByNumber.set(adr[1], value.source.path);
  }
  const tasks = new Map();
  const taskEntries = [];
  const taskDeclarations = new Map();
  for (const item of bundle.non_records ?? []) {
    if (item?.kind !== "task" || typeof item?.path !== "string") continue;
    const absolute = path.join(projectRoot, knowledgeRoot, ...item.path.split("/"));
    let text;
    try {
      text = await readFile(absolute, "utf8");
    } catch {
      continue;
    }
    const lines = text.split("\n");
    const close = lines[0] === "---" ? lines.indexOf("---", 1) : -1;
    const frontmatterTaskId = close > 0 ? lines.slice(1, close).find((line) => line.startsWith("task_id:"))?.slice(8).trim() : undefined;
    const taskId = bundle.nkf_version === "0.5" && typeof item.document?.id === "string"
      ? item.document.id
      : frontmatterTaskId;
    if (taskId) {
      tasks.set(taskId, item.path);
      taskEntries.push({ taskId, path: item.path });
      taskDeclarations.set(taskId, item);
    }
  }
  return { bundle, knowledgeRoot, records, decisionsByNumber, tasks, taskEntries, taskDeclarations };
}

function relativeLink(fromRelative, toRelative) {
  const fromDirectory = fromRelative.split("/").slice(0, -1);
  const target = toRelative.split("/");
  let common = 0;
  while (common < fromDirectory.length && common < target.length - 1 && fromDirectory[common] === target[common]) common += 1;
  const up = fromDirectory.length - common;
  return [...Array(up).fill(".."), ...target.slice(common)].join("/") || target[target.length - 1];
}

function linkifyText(text, maps, selfRelative) {
  const lines = text.split("\n");
  const close = lines[0] === "---" ? lines.indexOf("---", 1) : 0;
  let inFence = false;
  let changed = false;
  const targetFor = (token) => {
    const adr = /^ADR (\d{4})$/.exec(token);
    if (adr) return maps.decisionsByNumber.get(adr[1]);
    return maps.records.get(token)?.sourcePath !== undefined
      ? maps.records.get(token).sourcePath
      : maps.tasks.get(token);
  };
  for (let index = close + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence || line.startsWith("#")) continue;
    const parts = line.split(/(\[[^\]]*\]\([^)]*\)|`[^`]+`)/g);
    for (let position = 0; position < parts.length; position += 1) {
      const part = parts[position];
      if (position % 2 === 1) {
        if (part.startsWith("`") && part.endsWith("`")) {
          const token = part.slice(1, -1);
          const target = targetFor(token);
          if (target !== undefined && target !== selfRelative) {
            parts[position] = `[${part}](${relativeLink(selfRelative, target)})`;
            changed = true;
          }
        }
        continue;
      }
      parts[position] = part
        .replace(/\bADR (\d{4})\b/g, (whole, number) => {
          const target = maps.decisionsByNumber.get(number);
          if (target === undefined || target === selfRelative) return whole;
          changed = true;
          return `[ADR ${number}](${relativeLink(selfRelative, target)})`;
        })
        .replace(/\b([A-Z][A-Z0-9]*-\d+)\b/g, (whole, token) => {
          const target = maps.tasks.get(token);
          if (target === undefined || target === selfRelative) return whole;
          changed = true;
          return `[${token}](${relativeLink(selfRelative, target)})`;
        });
    }
    lines[index] = parts.join("");
  }
  return { text: lines.join("\n"), changed };
}

async function knowledgeMarkdownFiles(projectRoot, knowledgeRoot, bundle) {
  const evidence = new Set(
    (bundle.non_records ?? []).filter((item) => item?.kind === "evidence").map((item) => item.path),
  );
  const results = [];
  async function walk(relative) {
    const absolute = path.join(projectRoot, knowledgeRoot, ...relative.split("/").filter(Boolean));
    for (const entry of await readdir(absolute, { withFileTypes: true })) {
      const childRelative = relative === "" ? entry.name : `${relative}/${entry.name}`;
      if (entry.isDirectory()) {
        if (childRelative === "evidence" || childRelative.startsWith("evidence/")) continue;
        await walk(childRelative);
      } else if (entry.name.endsWith(".md") && !evidence.has(childRelative)) {
        results.push(childRelative);
      }
    }
  }
  await walk("");
  return results.sort();
}

async function repinGoverned(projectRoot) {
  const context = await loadGovernedContext(projectRoot);
  let repinnedRecords = 0;
  for (const [, record] of context.records) {
    const declarationAbsolute = path.join(projectRoot, ...record.declarationFile.split("/"));
    const sourceAbsolute = path.join(projectRoot, context.knowledgeRoot, ...record.sourcePath.split("/"));
    let sourceBytes;
    try {
      sourceBytes = await readFile(sourceAbsolute);
    } catch {
      continue;
    }
    const observed = digest(sourceBytes);
    const declarationText = await readFile(declarationAbsolute, "utf8");
    const updated = declarationText.replace(/(\n  path: [^\n]+\n  digest:\n    algorithm: sha-256\n    value: )[0-9a-f]{64}/, `$1${observed}`);
    if (updated !== declarationText) {
      await writeFile(declarationAbsolute, updated);
      repinnedRecords += 1;
    }
  }
  const bundlePath = path.join(projectRoot, ".nourd/knowledge/bundle.yaml");
  let bundleText = await readFile(bundlePath, "utf8");
  let repinnedArtifacts = 0;
  const artifactPattern = /(    path: ([^\n]+)\n    digest:\n      algorithm: sha-256\n      value: )([0-9a-f]{64})/g;
  const replacements = [];
  for (const match of bundleText.matchAll(artifactPattern)) {
    let bytes;
    try {
      bytes = await readFile(path.join(projectRoot, ...match[2].split("/")));
    } catch {
      continue;
    }
    const observed = digest(bytes);
    if (observed !== match[3]) replacements.push([match[0], `${match[1]}${observed}`]);
  }
  for (const [from, to] of replacements) {
    bundleText = bundleText.replace(from, to);
    repinnedArtifacts += 1;
  }
  let repinnedDocuments = 0;
  if (context.bundle.nkf_version === "0.5") {
    const bundleValue = YAML.parse(bundleText);
    for (const item of bundleValue.non_records ?? []) {
      if (item?.document?.digest?.algorithm !== "sha-256" || typeof item.path !== "string") continue;
      let bytes;
      try {
        bytes = await readFile(path.join(projectRoot, context.knowledgeRoot, ...item.path.split("/")));
      } catch {
        continue;
      }
      const observed = digest(bytes);
      if (item.document.digest.value !== observed) {
        item.document.digest.value = observed;
        repinnedDocuments += 1;
      }
    }
    if (repinnedDocuments > 0) bundleText = serializeYaml(bundleValue).toString("utf8");
  }
  if (repinnedArtifacts > 0 || repinnedDocuments > 0) await writeFile(bundlePath, bundleText);
  return {
    state: "repinned",
    records: repinnedRecords,
    documents: repinnedDocuments,
    artifacts: repinnedArtifacts,
  };
}

async function exportReferences(projectRoot) {
  const context = await loadGovernedContext(projectRoot);
  return {
    state: "exported",
    knowledge_root: context.knowledgeRoot,
    records: Object.fromEntries([...context.records].map(([id, record]) => [id, record.sourcePath])),
    decisions: Object.fromEntries(context.decisionsByNumber),
    tasks: Object.fromEntries(context.tasks),
  };
}

async function exportVersionedSet(projectRoot) {
  const bundleBytes = await readRegularInside(projectRoot, ".nourd/knowledge/bundle.yaml", false);
  const versionMatch = bundleBytes === null
    ? null
    : /^nkf_version: "([^"]+)"$/m.exec(bundleBytes.toString("utf8"));
  const declared = versionMatch?.[1] ?? "0.2";
  const releaseSet = ["0.3", "0.4", "0.5"].includes(declared)
    ? await readReleaseSet(projectRoot, declared)
    : undefined;
  const members = [];
  for (const entry of releaseEntriesForVersion(declared, releaseSet)) {
    if (entry.path === "release-manifest.json") continue;
    let bytes = null;
    try {
      bytes = await readFile(path.join(projectRoot, ...entry.path.split("/")));
    } catch {
      bytes = null;
    }
    const stamp = bytes === null ? null : /^NKF Version: (.+)$/m.exec(bytes.toString("utf8"));
    members.push({
      path: entry.path,
      present: bytes !== null,
      sha256: bytes === null ? null : sha256(bytes),
      nkf_version_stamp: stamp === null ? null : stamp[1],
    });
  }
  return { state: "enumerated", nkf_version: declared, members };
}

async function linkifyProject(projectRoot) {
  const context = await loadGovernedContext(projectRoot);
  const files = await knowledgeMarkdownFiles(projectRoot, context.knowledgeRoot, context.bundle);
  let changed = 0;
  for (const relative of files) {
    const absolute = path.join(projectRoot, context.knowledgeRoot, ...relative.split("/"));
    const original = await readFile(absolute, "utf8");
    const result = linkifyText(original, context, relative);
    if (result.changed) {
      await writeFile(absolute, result.text);
      changed += 1;
    }
  }
  const repin = await repinGoverned(projectRoot);
  return { state: "linkified", files: files.length, changed, repinned_records: repin.records };
}

function externalCheckerVerifier(checkerPath) {
  return (root) => {
    const invocation = spawnSync(process.execPath, [checkerPath, "--project", root, "--level", "full-bundle", "--no-persist"], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    const report = invocation.stdout === "" ? null : JSON.parse(invocation.stdout);
    if (report?.conformance !== "passed") {
      fail(`External checker validation failed: ${invocation.stderr || invocation.stdout || "no output"}`);
    }
    return { report };
  };
}

function rewriteOutboundLinks(text, fromRelative, toRelative) {
  const fromDirectory = fromRelative.split("/").slice(0, -1);
  let fenced = false;
  return text
    .split("\n")
    .map((line) => {
      if (line.trim().startsWith("```")) {
        fenced = !fenced;
        return line;
      }
      if (fenced) return line;
      return line.replace(/\]\(([^()\s]+)\)/g, (whole, destination) => {
        if (/^[a-z][a-z0-9+.-]*:/i.test(destination) || destination.startsWith("#")) return whole;
        const [target, fragment] = destination.split("#");
        if (target === undefined || target === "") return whole;
        const segments = [...fromDirectory];
        for (const part of target.split("/")) {
          if (part === "" || part === ".") continue;
          if (part === "..") {
            if (segments.length === 0) return whole;
            segments.pop();
            continue;
          }
          segments.push(part);
        }
        const rebased = relativeLink(toRelative, segments.join("/"));
        return `](${rebased}${fragment === undefined ? "" : `#${fragment}`})`;
      });
    })
    .join("\n");
}

function gateBlocksCompletion(text) {
  const lines = text.split("\n");
  const headerIndex = lines.findIndex((line) => line.trim() === IDENTITY_GATE_HEADER);
  if (headerIndex === -1) return [];
  const blocked = [];
  for (let index = headerIndex + 2; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith("|")) break;
    const cells = line.split("|").map((cell) => cell.trim()).filter((cell, at, all) => at > 0 && at < all.length - 1);
    if (cells.length !== 4) continue;
    if ((cells[1] === "unsupported" || cells[1] === "unknown") && cells[3] === "none") blocked.push(cells[0]);
  }
  return blocked;
}

function moveTaskInParentIndex(text, fileName, h1, targetState) {
  const stateHeading = {
    active: "Active",
    deferred: "Deferred",
    completed: "Completed",
    cancelled: "Cancelled",
  }[targetState];
  const escapedFile = fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const taskLine = new RegExp(
    `^- \\[[^\\]]+\\]\\((?:active|deferred|completed|cancelled)/${escapedFile}\\)$`,
  );
  const lines = text.split("\n").filter((line) => !taskLine.test(line));
  const headingIndex = lines.findIndex((line) => line === `## ${stateHeading}`);
  if (headingIndex === -1) return lines.join("\n");
  let insertion = lines.findIndex(
    (line, index) => index > headingIndex && line.startsWith("## "),
  );
  if (insertion === -1) insertion = lines.length;
  while (insertion > headingIndex + 1 && lines[insertion - 1] === "") {
    lines.splice(insertion - 1, 1);
    insertion -= 1;
  }
  lines.splice(insertion, 0, `- [${h1}](${targetState}/${fileName})`, "");
  return lines.join("\n").replace(/\n{3,}/g, "\n\n");
}

async function taskGit(projectRoot) {
  const run = (...argumentsValue) =>
    execFileSync("git", ["-C", projectRoot, ...argumentsValue], { encoding: "utf8" }).trim();
  const optional = (...argumentsValue) => {
    try {
      return run(...argumentsValue);
    } catch {
      return null;
    }
  };
  const toplevel = optional("rev-parse", "--show-toplevel");
  if (toplevel === null) return null;
  if (await realpath(toplevel) !== await realpath(projectRoot)) {
    fail("The project root must be the Git repository root for a task transition.");
  }
  return { run, optional };
}

function taskWorktreePath(projectRoot, taskId) {
  return path.join(
    path.dirname(projectRoot),
    `${path.basename(projectRoot)}-worktrees`,
    taskId,
  );
}

async function materializeMissingWorktreeArtifacts(sourceRoot, worktreeRoot, bundle) {
  const copied = [];
  for (const artifact of bundle?.governed_artifacts ?? []) {
    if (typeof artifact?.path !== "string") continue;
    const relative = safeRelative(artifact.path, "Governed artifact path");
    const target = path.join(worktreeRoot, ...relative.split("/"));
    if ((await lstat(target).catch(() => null)) !== null) continue;
    const bytes = await readRegularInside(sourceRoot, relative);
    if (
      artifact?.digest?.algorithm !== "sha-256" ||
      artifact?.digest?.value !== digest(bytes)
    ) {
      fail(`The governed artifact cannot be materialized with its declared digest: ${relative}`);
    }
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, bytes, { flag: "wx" });
    copied.push(relative);
  }
  return copied;
}

async function gitTransitionPlan(git, projectRoot, transition, taskId) {
  if (git === null) return { state: "not-a-repository" };
  if (git.run("status", "--porcelain") !== "") {
    fail("The work tree must be clean before a task transition.");
  }
  const branch = `task/${taskId}`;
  const currentBranch = git.run("rev-parse", "--abbrev-ref", "HEAD");
  const originUrl = git.optional("remote", "get-url", "origin");
  const originHead = git.optional("symbolic-ref", "--short", "refs/remotes/origin/HEAD");
  const defaultBranch = originHead === null ? currentBranch : originHead.replace(/^origin\//, "");
  if (transition === "active") {
    if (currentBranch !== defaultBranch) {
      fail(`Activation starts from the default branch ${defaultBranch}, not ${currentBranch}.`);
    }
    if (originUrl !== null) {
      git.run("fetch", "origin", defaultBranch);
      if (git.run("rev-parse", "HEAD") !== git.run("rev-parse", `origin/${defaultBranch}`)) {
        fail(`The local ${defaultBranch} is not up to date with origin/${defaultBranch}.`);
      }
    }
    if (git.optional("rev-parse", "--verify", "--quiet", branch) !== null) {
      fail(`The task branch already exists: ${branch}`);
    }
    const worktree = taskWorktreePath(projectRoot, taskId);
    if ((await lstat(worktree).catch(() => null)) !== null) {
      fail(`The task working tree already exists: ${worktree}`);
    }
    return {
      state: "planned",
      branch,
      mode: "worktree",
      worktree,
      origin_url: originUrl,
      default_branch: defaultBranch,
    };
  }
  const isLinkedWorktree =
    git.optional("rev-parse", "--git-dir") !== git.optional("rev-parse", "--git-common-dir");
  if (currentBranch === branch) {
    return {
      state: "planned",
      branch,
      mode: isLinkedWorktree ? "worktree-resident" : "in-place",
      create: false,
      origin_url: originUrl,
      default_branch: defaultBranch,
    };
  }
  if (git.optional("rev-parse", "--verify", "--quiet", branch) !== null) {
    const registered = git
      .run("worktree", "list", "--porcelain")
      .includes(`branch refs/heads/${branch}`);
    fail(
      registered
        ? `Run the transition from the task's working tree for ${branch}.`
        : `Switch to the existing task branch first: ${branch}`,
    );
  }
  return {
    state: "planned",
    branch,
    mode: "in-place",
    create: true,
    origin_url: originUrl,
    default_branch: defaultBranch,
  };
}

function gitCompleteTransition(effectiveRoot, plan, transition, taskId, prBody) {
  if (plan.state !== "planned") return { state: "not-a-repository" };
  const run = (...argumentsValue) =>
    execFileSync("git", ["-C", effectiveRoot, ...argumentsValue], { encoding: "utf8" }).trim();
  const action = { completed: "close", deferred: "defer", active: "activate", cancelled: "cancel" }[transition];
  const report = {
    state: "committed",
    branch: plan.branch,
    mode: plan.mode,
    worktree: plan.mode === "worktree" ? plan.worktree : plan.mode === "worktree-resident" ? effectiveRoot : null,
    commit: null,
    pushed: false,
    pull_request: null,
  };
  try {
    run("add", "-A");
    run("commit", "-m", `task: ${action} ${taskId}`);
    report.commit = run("rev-parse", "HEAD");
    if (transition === "active") {
      if (plan.origin_url === null) {
        report.pull_request = "no-origin-remote";
        return report;
      }
      run("push", "-u", "origin", plan.branch);
      report.pushed = true;
      if (plan.origin_url.includes("github.com")) {
        const created = spawnSync(
          "gh",
          ["pr", "create", "--draft", "--title", `task: activate ${taskId}`, "--body", prBody, "--head", plan.branch],
          { cwd: effectiveRoot, encoding: "utf8" },
        );
        report.pull_request =
          created.status === 0
            ? created.stdout.trim()
            : `not-created: ${(created.stderr || created.stdout || "gh unavailable").split("\n")[0]}`;
      } else {
        report.pull_request = "unsupported-remote";
      }
      report.state = "draft-opened";
      return report;
    }
    if (plan.origin_url === null) {
      report.pull_request = "no-origin-remote";
      return report;
    }
    run("push", "-u", "origin", plan.branch);
    report.pushed = true;
    if (plan.origin_url.includes("github.com")) {
      const created = spawnSync(
        "gh",
        ["pr", "create", "--title", `task: ${action} ${taskId}`, "--body", prBody, "--head", plan.branch],
        { cwd: effectiveRoot, encoding: "utf8" },
      );
      if (created.status === 0) {
        report.pull_request = created.stdout.trim();
      } else {
        const viewed = spawnSync(
          "gh",
          ["pr", "view", plan.branch, "--json", "url", "--jq", ".url"],
          { cwd: effectiveRoot, encoding: "utf8" },
        );
        report.pull_request =
          viewed.status === 0
            ? viewed.stdout.trim()
            : `not-created: ${(created.stderr || created.stdout || "gh unavailable").split("\n")[0]}`;
      }
      const readied = spawnSync("gh", ["pr", "ready", plan.branch], { cwd: effectiveRoot, encoding: "utf8" });
      report.pull_request_state = readied.status === 0 ? "ready" : "not-ready";
    } else {
      report.pull_request = "unsupported-remote";
    }
    report.state = "conclusion-proposed";
    if (plan.mode === "worktree-resident") {
      try {
        const commonDir = run("rev-parse", "--path-format=absolute", "--git-common-dir");
        const mainRoot = path.dirname(commonDir);
        execFileSync("git", ["-C", mainRoot, "worktree", "remove", effectiveRoot], { encoding: "utf8" });
        report.worktree_state = "removed";
      } catch {
        report.worktree_state = "remove-pending";
      }
    } else if (plan.mode === "in-place" && plan.create === true) {
      run("checkout", plan.default_branch);
      report.restored_branch = plan.default_branch;
    }
    return report;
  } catch (error) {
    report.state = "incomplete";
    report.git_error = (error instanceof Error ? error.message : String(error))
      .split("\n")
      .find((line) => line.trim() !== "") ?? "A Git step failed after the applied transition.";
    return report;
  }
}

async function taskPendingView(options) {
  const projectRoot = await requireProjectRoot(options.project);
  const context = await loadGovernedContext(projectRoot);
  const git = await taskGit(projectRoot);
  const tasks = [];
  for (const [taskId, relative] of [...context.tasks].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    const text = await readFile(
      path.join(projectRoot, context.knowledgeRoot, ...relative.split("/")),
      "utf8",
    );
    const entry = {
      task: taskId,
      task_status: context.bundle.nkf_version === "0.5"
        ? context.taskDeclarations.get(taskId)?.document?.state?.value ?? null
        : text.match(/^task_status: (\w+)$/m)?.[1] ?? null,
      path: relative,
      branch: null,
      pull_request: null,
    };
    if (git !== null) {
      const branch = `task/${taskId}`;
      const local = git.optional("rev-parse", "--verify", "--quiet", branch) !== null;
      const remote = git.optional("rev-parse", "--verify", "--quiet", `origin/${branch}`) !== null;
      if (local || remote) {
        entry.branch = { name: branch, local, remote };
        const viewed = spawnSync(
          "gh",
          ["pr", "view", branch, "--json", "state,isDraft,url"],
          { cwd: projectRoot, encoding: "utf8" },
        );
        if (viewed.status === 0) {
          try {
            const pullRequest = JSON.parse(viewed.stdout);
            entry.pull_request = { url: pullRequest.url, state: pullRequest.state, draft: pullRequest.isDraft };
          } catch {
            entry.pull_request = "unreadable";
          }
        } else {
          entry.pull_request = "none-or-unavailable";
        }
      }
    }
    tasks.push(entry);
  }
  return {
    state: "pending-view",
    git: git === null ? "not-a-repository" : "inspected",
    tasks,
  };
}

function generatedTaskStateIndex(state, items, indexPath) {
  const title = `${state[0].toUpperCase()}${state.slice(1)} Tasks`;
  const body = items.length === 0
    ? "No applicable item is currently represented."
    : items
        .map((item) => `- [${item.document.id}](${relativeLink(indexPath, item.path)})`)
        .join("\n");
  return `# ${title}\n\n${body}\n`;
}

async function transitionTask0_5(projectRoot, context, options, transition, original, currentRelative) {
  const task = context.taskDeclarations.get(options.task);
  if (task?.document?.state?.vocabulary !== "task-status") {
    fail(`The native NKF 0.5 Task has no task-status declaration: ${options.task}`);
  }
  const currentStatus = task.document.state.value;
  if (currentStatus === transition) fail(`The task already has task_status ${transition}.`);
  if (currentStatus === "cancelled") fail("cancelled is terminal; later work on the subject is a new Task.");
  if (transition === "cancelled" && currentStatus === "completed") {
    fail("A completed Task is never cancelled; reversing delivered work is a later Task.");
  }
  if (transition === "completed") {
    const blockers = gateBlocksCompletion(original);
    if (blockers.length > 0) fail(`The gate blocks completion: unexcepted findings for ${blockers.join(", ")}.`);
  }
  const resultHeading = transition === "completed" ? "## Completion Result" : transition === "cancelled" ? "## Cancellation Result" : null;
  if (resultHeading !== null && !original.includes(resultHeading)) {
    fail(`${transition === "completed" ? "close" : "cancel"} requires the canonical Task source to already contain ${resultHeading}.`);
  }
  if (typeof options["result-file"] === "string") {
    fail("Native NKF 0.5 task transitions do not accept --result-file; author the reviewed Result in the stable Task source before transition.");
  }

  const bundle = structuredClone(context.bundle);
  const selected = (bundle.non_records ?? []).find(
    (item) => item?.kind === "task" && item?.document?.id === options.task,
  );
  if (selected === undefined) fail(`The native NKF 0.5 Task declaration is unavailable: ${options.task}`);
  selected.document.state = { ...selected.document.state, value: transition };
  const files = new Map();
  files.set(".nourd/knowledge/bundle.yaml", serializeYaml(bundle));
  const states = ["active", "deferred", "completed", "cancelled"];
  for (const state of states) {
    const indexPath = `tasks/by-state/${state}.md`;
    const items = (bundle.non_records ?? [])
      .filter((item) => item?.kind === "task" && item?.document?.state?.value === state)
      .sort((left, right) => String(left.path).localeCompare(String(right.path), "en"));
    files.set(`${context.knowledgeRoot}/${indexPath}`, Buffer.from(generatedTaskStateIndex(state, items, indexPath), "utf8"));
  }
  const pinPresent = (await readRegularInside(projectRoot, PIN_PATH, false)) !== null;
  const verifier = pinPresent
    ? null
    : typeof options.checker === "string"
      ? externalCheckerVerifier(path.resolve(options.checker))
      : fail("task requires an installed release pin or an explicit --checker.");
  await validateCompleteCandidate(projectRoot, files, [], verifier);

  await writeTransaction(projectRoot, files, () => (verifier ?? ((root) => verifyInstalled(root, true)))(projectRoot));
  return {
    state: "transitioned",
    task: options.task,
    from: currentRelative,
    to: currentRelative,
    task_status: transition,
    documents_rewritten: 0,
    generated_navigation: states.length,
    git: { state: "project-owned" },
  };
}

async function transitionTask(options) {
  const projectRoot = await requireProjectRoot(options.project);
  const transition = { close: "completed", defer: "deferred", activate: "active", cancel: "cancelled" }[options.to ?? ""];
  if (transition === undefined) fail("task requires --to close|defer|activate|cancel, or no --to for the pending view.");
  if (typeof options.task !== "string" || options.task === "") fail("task requires --task <task_id>.");
  const context = await loadGovernedContext(projectRoot);
  const currentRelative = context.tasks.get(options.task);
  if (currentRelative === undefined) fail(`Unknown task_id: ${options.task}`);
  const currentAbsolute = path.join(projectRoot, context.knowledgeRoot, ...currentRelative.split("/"));
  const original = await readFile(currentAbsolute, "utf8");
  const statusMatch = original.match(/^task_status: (\w+)$/m);
  if (context.bundle.nkf_version !== "0.5" && statusMatch === null) fail("The task has no task_status line.");
  if (context.bundle.nkf_version === "0.5") {
    return transitionTask0_5(projectRoot, context, options, transition, original, currentRelative);
  }
  const git = await taskGit(projectRoot);
  const gitPlan = await gitTransitionPlan(git, projectRoot, transition, options.task);
  if (statusMatch[1] === transition) fail(`The task already has task_status ${transition}.`);
  if (statusMatch[1] === "cancelled") {
    fail("cancelled is terminal; later work on the subject is a new Task.");
  }
  if (transition === "cancelled" && statusMatch[1] === "completed") {
    fail("A completed Task is never cancelled; reversing delivered work is a later Task.");
  }
  if (transition === "cancelled" && typeof options["result-file"] !== "string") {
    fail("cancel requires --result-file with the cancellation rationale.");
  }
  if (transition === "completed") {
    const blockers = gateBlocksCompletion(original);
    if (blockers.length > 0) {
      fail(`The gate blocks completion: unexcepted findings for ${blockers.join(", ")}.`);
    }
  }
  const fileName = currentRelative.split("/").pop();
  const targetRelative = `tasks/${transition === "active" ? "active" : transition}/${fileName}`;
  let updated = rewriteOutboundLinks(
    original.replace(/^task_status: \w+$/m, `task_status: ${transition}`),
    currentRelative,
    targetRelative,
  );
  const resultHeading =
    transition === "completed" ? "## Completion Result" : transition === "cancelled" ? "## Cancellation Result" : null;
  if (resultHeading !== null && typeof options["result-file"] === "string") {
    const result = (await readFile(options["result-file"], "utf8")).trim();
    if (!updated.includes(resultHeading)) {
      updated = updated.replace("\n## Decision Applicability\n", `\n${resultHeading}\n\n${result}\n\n## Decision Applicability\n`);
    }
  }
  const files = new Map();
  const removedPaths = [`${context.knowledgeRoot}/${currentRelative}`];
  files.set(`${context.knowledgeRoot}/${targetRelative}`, Buffer.from(updated, "utf8"));

  const bundlePath = ".nourd/knowledge/bundle.yaml";
  const bundleText = await readFile(path.join(projectRoot, bundlePath), "utf8");
  files.set(bundlePath, Buffer.from(bundleText.replace(`path: ${currentRelative}`, `path: ${targetRelative}`), "utf8"));

  const h1 = updated.split("\n").find((line) => line.startsWith("# "))?.slice(2).trim() ?? options.task;
  const markdown = await knowledgeMarkdownFiles(projectRoot, context.knowledgeRoot, context.bundle);
  let linksRewritten = 0;
  const sourceDirectory = currentRelative.split("/").slice(0, -1).join("/");
  const targetDirectory = targetRelative.split("/").slice(0, -1).join("/");
  for (const relative of markdown) {
    if (relative === currentRelative) continue;
    const absolute = path.join(projectRoot, context.knowledgeRoot, ...relative.split("/"));
    let text = await readFile(absolute, "utf8");
    const before = text;
    const directory = relative.split("/").slice(0, -1).join("/");
    const isSourceIndex = directory === sourceDirectory && relative.endsWith("README.md");
    const isTargetIndex = directory === targetDirectory && relative.endsWith("README.md");
    if (isSourceIndex) {
      text = text
        .split("\n")
        .filter((line) => !line.includes(`](${fileName})`))
        .join("\n")
        .replace(/\n{3,}/g, "\n\n");
    } else {
      const oldLink = relativeLink(relative, currentRelative);
      const newLink = relativeLink(relative, targetRelative);
      text = text.split(`](${oldLink})`).join(`](${newLink})`);
    }
    if (relative === "tasks/README.md") {
      text = moveTaskInParentIndex(text, fileName, h1, transition);
    }
    if (isTargetIndex && !text.includes(`](${fileName})`)) {
      text = `${text.trimEnd()}\n- [${h1}](${fileName})\n`;
    }
    if (text !== before) {
      files.set(`${context.knowledgeRoot}/${relative}`, Buffer.from(text, "utf8"));
      linksRewritten += 1;
    }
  }
  for (const [, record] of context.records) {
    const changedPath = `${context.knowledgeRoot}/${record.sourcePath}`;
    const staged = files.get(changedPath);
    if (staged === undefined) continue;
    const declarationText = await readFile(path.join(projectRoot, ...record.declarationFile.split("/")), "utf8");
    const repinned = declarationText.replace(/(\n  path: [^\n]+\n  digest:\n    algorithm: sha-256\n    value: )[0-9a-f]{64}/, `$1${digest(staged)}`);
    files.set(record.declarationFile, Buffer.from(repinned, "utf8"));
  }
  const pinPresent = (await readRegularInside(projectRoot, PIN_PATH, false)) !== null;
  const verifier = pinPresent
    ? null
    : typeof options.checker === "string"
      ? externalCheckerVerifier(path.resolve(options.checker))
      : fail("task requires an installed release pin or an explicit --checker.");
  await validateCompleteCandidate(projectRoot, files, removedPaths, verifier);
  let effectiveRoot = projectRoot;
  let materializedArtifacts = [];
  if (git !== null && gitPlan.state === "planned") {
    if (gitPlan.mode === "worktree") {
      await mkdir(path.dirname(gitPlan.worktree), { recursive: true });
      git.run("worktree", "add", "-b", gitPlan.branch, gitPlan.worktree);
      effectiveRoot = gitPlan.worktree;
      materializedArtifacts = await materializeMissingWorktreeArtifacts(
        projectRoot,
        effectiveRoot,
        context.bundle,
      );
    } else if (gitPlan.mode === "in-place" && gitPlan.create) {
      git.run("checkout", "-b", gitPlan.branch);
    }
  }
  await writeTransaction(
    effectiveRoot,
    files,
    () => (verifier ?? ((root) => verifyInstalled(root, true)))(effectiveRoot),
    removedPaths,
  );
  const prBody =
    transition === "active"
      ? `Deterministic activation of ${options.task}. This draft accompanies the Task's whole life; its conclusion marks it ready, and merging is the repository's human review act.`
      : resultHeading !== null && updated.includes(resultHeading)
        ? `Deterministic ${transition === "cancelled" ? "cancellation" : "close"} of ${options.task}. The merge is the repository's human review act.\n\n${updated.split(`\n${resultHeading}\n`)[1]?.split("\n## ")[0]?.trim() ?? ""}`
        : `Deterministic deferral of ${options.task}. The merge is the repository's human review act.`;
  const gitReport =
    git === null || gitPlan.state !== "planned"
      ? { state: "not-a-repository" }
      : gitCompleteTransition(effectiveRoot, gitPlan, transition, options.task, prBody);
  if (materializedArtifacts.length > 0) {
    gitReport.materialized_artifacts = materializedArtifacts;
  }
  return {
    state: "transitioned",
    task: options.task,
    from: currentRelative,
    to: targetRelative,
    task_status: transition,
    documents_rewritten: linksRewritten,
    git: gitReport,
  };
}

async function resolveMigrationInput(options) {
  const projectRoot = await requireProjectRoot(options.project);
  const { bundle, knowledgeRoot } = await requireBundle(projectRoot);
  const predecessorPinBytes = await readRegularInside(projectRoot, PIN_PATH, false);
  if (predecessorPinBytes !== null) {
    await verifyPredecessorInstallation(projectRoot, predecessorPinBytes);
  }
  const expectedSha256 = requireSha256(options.sha256);
  const archiveBytes = await acquireArchive(options, expectedSha256);
  const verification = verifyReleaseArchive(archiveBytes, expectedSha256);
  return { projectRoot, bundle, knowledgeRoot, archiveBytes, verification };
}

async function migrateLegacyTo0_4(options, prepared = undefined) {
  const input = prepared ?? await resolveMigrationInput(options);
  const { projectRoot, bundle, knowledgeRoot, archiveBytes, verification } = input;
  if (!["0.1", "0.2"].includes(bundle.nkf_version)) {
    fail("migrate requires a project that declares NKF 0.1 or NKF 0.2.");
  }
  const predecessorVersion = bundle.nkf_version;
  if (verification.manifest.nkf_version !== "0.4") {
    fail("migrate requires an NKF 0.4 release archive.");
  }

  const files = new Map();
  let removedPaths = [];
  const topologyPaths = [
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
  ];
  const topologyIncomplete = (
    await Promise.all(
      topologyPaths.map((relative) =>
        readRegularInside(projectRoot, `${knowledgeRoot}/${relative}`, false)),
    )
  ).some((bytes) => bytes === null);
  if (topologyIncomplete) {
    const receipt = requirePredecessorOnboardingReceipt(
      parseStrictJson(
        await readRegularInside(projectRoot, ONBOARDING_RECEIPT_PATH),
      ),
    );
    const topology = await buildPortableTopologyRepair(projectRoot, receipt);
    for (const [relative, bytes] of topology.files) files.set(relative, bytes);
    removedPaths = [...topology.removals];
  }
  const bundlePath = ".nourd/knowledge/bundle.yaml";
  const bundleValue = YAML.parse(
    files.get(bundlePath)?.toString("utf8") ??
      (await readFile(path.join(projectRoot, bundlePath), "utf8")),
  );
  bundleValue.nkf_version = "0.4";
  if (!Array.isArray(bundleValue.non_records)) bundleValue.non_records = [];
  if (!bundleValue.non_records.some((item) => item?.path === "tasks/cancelled/README.md")) {
    bundleValue.non_records.push({
      path: "tasks/cancelled/README.md",
      kind: "navigation",
    });
    bundleValue.non_records.sort((left, right) => left.path.localeCompare(right.path));
  }
  files.set(bundlePath, serializeYaml(bundleValue));

  const retroGate = [
    "",
    "## Decision Applicability",
    "",
    "### Applicable Decisions",
    "",
    "No accepted decision applies to this Task.",
    "",
    "### Mandatory Capabilities",
    "",
    "No mandatory capability is implicated by this Task.",
    "",
    `This gate was added retrospectively during the NKF ${predecessorVersion}-to-0.4 migration; no`,
    "historical extraction is implied.",
    "",
  ].join("\n");
  const context = await loadGovernedContext(projectRoot);
  let gated = 0;
  for (const { path: taskRelative } of context.taskEntries) {
    const absolute = path.join(projectRoot, knowledgeRoot, ...taskRelative.split("/"));
    const text = await readFile(absolute, "utf8");
    if (!text.includes("## Decision Applicability")) {
      files.set(`${knowledgeRoot}/${taskRelative}`, Buffer.from(`${text.trimEnd()}\n${retroGate}`, "utf8"));
      gated += 1;
    }
  }
  const cancelledIndexRelative = "tasks/cancelled/README.md";
  if (
    files.get(`${knowledgeRoot}/${cancelledIndexRelative}`) === undefined &&
    (await lstat(path.join(projectRoot, knowledgeRoot, "tasks", "cancelled", "README.md")).catch(() => null)) === null
  ) {
    const stamp = `${new Date().toISOString().slice(0, 19)}Z`;
    files.set(
      `${knowledgeRoot}/${cancelledIndexRelative}`,
      Buffer.from(
        `---\ntitle: Cancelled Tasks\nsummary: "Indexes Tasks concluded without delivery."\ncreated_at: ${stamp}\n---\n\n# Cancelled Tasks\n`,
        "utf8",
      ),
    );
    const tasksIndexAbsolute = path.join(projectRoot, knowledgeRoot, "tasks", "README.md");
    const tasksIndex =
      files.get(`${knowledgeRoot}/tasks/README.md`)?.toString("utf8") ??
      (await readFile(tasksIndexAbsolute, "utf8"));
    const completedLine = "- [Completed Tasks](completed/README.md)\n";
    const updatedTasksIndex = tasksIndex.includes(completedLine)
      ? tasksIndex.replace(completedLine, `${completedLine}- [Cancelled Tasks](cancelled/README.md)\n`)
      : `${tasksIndex.trimEnd()}\n- [Cancelled Tasks](cancelled/README.md)\n`;
    files.set(`${knowledgeRoot}/tasks/README.md`, Buffer.from(updatedTasksIndex, "utf8"));
  }
  const markdown = await knowledgeMarkdownFiles(projectRoot, knowledgeRoot, context.bundle);
  let linkified = 0;
  for (const relative of markdown) {
    const key = `${knowledgeRoot}/${relative}`;
    const current = files.get(key)?.toString("utf8") ?? (await readFile(path.join(projectRoot, knowledgeRoot, ...relative.split("/")), "utf8"));
    const result = linkifyText(current, context, relative);
    if (result.changed || files.has(key)) {
      files.set(key, Buffer.from(result.text, "utf8"));
      if (result.changed) linkified += 1;
    }
  }
  for (const [, record] of context.records) {
    const key = `${knowledgeRoot}/${record.sourcePath}`;
    const staged = files.get(key);
    if (staged === undefined) continue;
    const declarationText = await readFile(path.join(projectRoot, ...record.declarationFile.split("/")), "utf8");
    files.set(record.declarationFile, Buffer.from(declarationText.replace(/(\n  path: [^\n]+\n  digest:\n    algorithm: sha-256\n    value: )[0-9a-f]{64}/, `$1${digest(staged)}`), "utf8"));
  }
  const integration = await targetFiles(projectRoot, archiveBytes, verification, bundle.root?.profile ?? "nkf.profile.product");
  for (const [relative, bytes] of integration) files.set(relative, bytes);
  await stageVerifiedHostRegistryMigration(projectRoot, files);
  const originalBundleBytes = await readRegularInside(projectRoot, bundlePath);
  files.set(
    bundlePath,
    await updateVerifiedStagedArtifactBindings(
      projectRoot,
      originalBundleBytes,
      files.get(bundlePath),
      files,
    ),
  );
  await validateCompleteCandidate(projectRoot, files, removedPaths);
  const installed = await writeTransaction(
    projectRoot,
    files,
    () => verifyInstalled(projectRoot, true),
    removedPaths,
  );
  return {
    state: "migrated",
    nkf_version: "0.4",
    tasks_gated: gated,
    documents_linkified: linkified,
    validation: {
      conformance: installed.report?.conformance ?? "passed",
    },
  };
}

async function migrateToCurrent(options, prepared = undefined) {
  const input = prepared ?? await resolveMigrationInput(options);
  const { projectRoot, bundle, knowledgeRoot, archiveBytes, verification } = input;
  if (!["0.1", "0.2", "0.3", "0.4"].includes(bundle.nkf_version)) {
    fail("migrate requires a project that declares a supported NKF 0.1 through 0.4 predecessor.");
  }
  const predecessorVersion = bundle.nkf_version;
  if (verification.manifest.nkf_version !== CURRENT_NKF_VERSION) {
    fail(`migrate requires an NKF ${CURRENT_NKF_VERSION} release archive.`);
  }

  const seedFiles = await targetFiles(
    projectRoot,
    archiveBytes,
    verification,
    bundle.root?.profile ?? "nkf.profile.product",
  );
  await stageVerifiedHostRegistryMigration(projectRoot, seedFiles);
  const seedRemovals = [];
  if (["0.1", "0.2"].includes(predecessorVersion)) {
    const requiredTopology = [
      "tasks/README.md", "tasks/active/README.md", "tasks/deferred/README.md",
      "tasks/completed/README.md", "tasks/cancelled/README.md", "designs/README.md",
      "designs/active/README.md", "designs/adopted/README.md", "designs/rejected/README.md",
      "designs/superseded/README.md", "designs/withdrawn/README.md", "decisions/README.md",
      "specifications/README.md", "realizations/README.md", "realizations/current/README.md",
      "evidence/README.md",
    ];
    const incomplete = (
      await Promise.all(requiredTopology.map((relative) =>
        readRegularInside(projectRoot, `${knowledgeRoot}/${relative}`, false)))
    ).some((bytes) => bytes === null);
    if (incomplete) {
      const receipt = requirePredecessorOnboardingReceipt(
        parseStrictJson(await readRegularInside(projectRoot, ONBOARDING_RECEIPT_PATH)),
      );
      const topology = await buildPortableTopologyRepair(projectRoot, receipt);
      for (const [relative, bytes] of topology.files) seedFiles.set(relative, bytes);
      seedRemovals.push(...topology.removals);
    }
  }
  const originalBundleBytes = await readRegularInside(projectRoot, ".nourd/knowledge/bundle.yaml");
  const candidate = await prepare0_5Candidate(
    projectRoot,
    seedFiles,
    options.review,
    verification,
    originalBundleBytes,
    seedRemovals,
  );
  await validateCompleteCandidate(
    projectRoot,
    candidate.files,
    candidate.removedPaths,
    verifyInstalled0_5Ready,
  );
  const installed = await writeTransaction(
    projectRoot,
    candidate.files,
    () => verifyInstalled0_5Ready(projectRoot),
    candidate.removedPaths,
  );
  return {
    state: "migrated",
    nkf_version: CURRENT_NKF_VERSION,
    predecessor_version: predecessorVersion,
    records_migrated: candidate.migration.records,
    documents_migrated: candidate.migration.documents,
    baseline: candidate.baseline,
    validation: {
      conformance: installed.report?.conformance ?? "passed",
      readiness: installed.readiness?.readiness?.state ?? "ready",
    },
  };
}

async function migrateByArchive(options) {
  const input = await resolveMigrationInput(options);
  if (input.verification.manifest.nkf_version === "0.4") {
    return migrateLegacyTo0_4(options, input);
  }
  return migrateToCurrent(options, input);
}

function adoptResult(state, projectRoot, catalog, compatibility, operation) {
  return {
    contract: "nkf.adopt-result",
    nkf_version: CURRENT_NKF_VERSION,
    state,
    project: projectRoot,
    target: {
      nkf_version: catalog.nkf_version,
      archive_sha256: catalog.archive.sha256,
      source_commit: catalog.source_commit,
      checker_sha256: catalog.checker_sha256,
      adopter_sha256: catalog.adopter_sha256,
    },
    compatibility,
    operation,
  };
}

async function adopt(options) {
  if (options.project === undefined) fail("adopt requires --project.");
  const projectRoot = await requireProjectRoot(options.project);
  const { catalog, compatibility } = await resolveRecommendedRelease(options);
  const executableSha256 = digest(await currentExecutableBytes());
  if (executableSha256 !== catalog.adopter_sha256) {
    fail(
      "The executing adopter differs from the exact selected release binding.",
    );
  }
  if (
    options.sha256 !== undefined &&
    requireSha256(options.sha256) !== catalog.archive.sha256
  ) {
    fail("--sha256 differs from the exact selected release binding.");
  }
  const releaseOptions = {
    ...options,
    sha256: catalog.archive.sha256,
  };
  delete releaseOptions.recommendation;
  delete releaseOptions["accept-breaking"];
  if (
    releaseOptions.archive === undefined &&
    releaseOptions["github-repository"] === undefined
  ) {
    releaseOptions["github-repository"] = "kaveh6202/Nourd.NKF";
  }

  const nourdPath = path.join(projectRoot, ".nourd");
  const nourdStat = await lstat(nourdPath).catch(() => null);
  if (nourdStat === null) {
    if (options["accept-breaking"] !== undefined) {
      fail("--accept-breaking does not apply to initial adoption.");
    }
    if (options.plan === undefined) {
      throw new OnboardingError(
        "NKF-ADOPT-PLAN-REQUIRED",
        "Initial adoption requires a reviewed and sealed onboarding plan before mutation.",
        {
          target_nkf_version: catalog.nkf_version,
          target_archive_sha256: catalog.archive.sha256,
          next_action: "prepare-and-seal-onboarding-plan",
        },
      );
    }
    const result = await onboard(releaseOptions);
    return adoptResult(
      result.state === "no-update" ? "current" : "onboarded",
      projectRoot,
      catalog,
      null,
      result,
    );
  }
  if (!nourdStat.isDirectory() || nourdStat.isSymbolicLink()) {
    fail(".nourd must be a non-symbolic-link directory.");
  }
  if (options.plan !== undefined) {
    fail("--plan applies only to initial adoption.");
  }

  const { bundle } = await requireBundle(projectRoot);
  const rule = compatibility.get(bundle.nkf_version);
  if (rule === undefined) {
    throw new OnboardingError(
      "NKF-ADOPT-UNSUPPORTED-PREDECESSOR",
      `The recommended release does not declare compatibility from NKF ${bundle.nkf_version}.`,
      {
        from_nkf_version: bundle.nkf_version,
        target_nkf_version: catalog.nkf_version,
        target_archive_sha256: catalog.archive.sha256,
      },
    );
  }
  const compatibilityResult = {
    from_nkf_version: rule.from_nkf_version,
    classification: rule.classification,
    migration_required: rule.migration_required,
    summary: rule.summary,
  };
  if (rule.classification === "breaking") {
    if (options["accept-breaking"] !== "repository-owner") {
      throw new OnboardingError(
        "NKF-ADOPT-BREAKING-APPROVAL-REQUIRED",
        `Adopting NKF ${catalog.nkf_version} from ${bundle.nkf_version} is breaking and requires explicit repository-owner approval before mutation.`,
        {
          ...compatibilityResult,
          target_nkf_version: catalog.nkf_version,
          target_archive_sha256: catalog.archive.sha256,
          required_argument: "--accept-breaking repository-owner",
        },
      );
    }
    const result = await migrateToCurrent(releaseOptions);
    return adoptResult(
      "migrated",
      projectRoot,
      catalog,
      { ...compatibilityResult, approved_by: "repository-owner" },
      result,
    );
  }
  if (options["accept-breaking"] !== undefined) {
    fail("--accept-breaking is invalid for a non-breaking adoption.");
  }
  const pinPresent = (await readRegularInside(projectRoot, PIN_PATH, false)) !== null;
  const result = await installOrUpdate(
    pinPresent ? "update" : "install",
    releaseOptions,
    bundle.nkf_version !== catalog.nkf_version,
  );
  return adoptResult(
    result.state === "no-update" ? "current" : "updated",
    projectRoot,
    catalog,
    compatibilityResult,
    result,
  );
}

async function main() {
  const { command, options } = parseArguments(process.argv.slice(2));
  if (command === "adopt") return adopt(options);
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
  if (command === "repin") return repinGoverned(await requireProjectRoot(options.project));
  if (command === "refs") return exportReferences(await requireProjectRoot(options.project));
  if (command === "linkify") return linkifyProject(await requireProjectRoot(options.project));
  if (command === "set") return exportVersionedSet(await requireProjectRoot(options.project));
  if (command === "task") return options.to === undefined ? taskPendingView(options) : transitionTask(options);
  if (command === "migrate") return migrateByArchive(options);
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
    nkf_version: CURRENT_NKF_VERSION,
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
