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
import * as commonmark from "commonmark";
import neutralProtocol from "../../distribution/nkf/0.7/integrations/ai/nkf-authoring-protocol.md";
import portableSkill from "../../distribution/nkf/0.7/.agents/skills/nkf-authoring/SKILL.md";
import onboardingProtocol from "../../distribution/nkf/0.7/integrations/onboarding/nkf-onboarding-protocol.md";
import onboardingSkill from "../../distribution/nkf/0.7/.agents/skills/nkf-onboarding/SKILL.md";
import rootAdapter from "../../distribution/nkf/0.7/host-adapters/AGENTS.adapter.md";
import importAdapter from "../../distribution/nkf/0.7/host-adapters/CLAUDE.adapter.md";
import copilotAdapter from "../../distribution/nkf/0.7/host-adapters/copilot-instructions.adapter.md";
import freshnessPolicy0_6 from "../../contracts/nkf/0.6/freshness-policy.yaml";
import predecessorContract0_6 from "nkf:predecessor-0.6";
import neutralProtocol0_4 from "../../distribution/nkf/0.4/integrations/ai/nkf-authoring-protocol.md";
import portableSkill0_4 from "../../distribution/nkf/0.4/.agents/skills/nkf-authoring/SKILL.md";
import onboardingProtocol0_4 from "../../distribution/nkf/0.4/integrations/onboarding/nkf-onboarding-protocol.md";
import onboardingSkill0_4 from "../../distribution/nkf/0.4/.agents/skills/nkf-onboarding/SKILL.md";
import neutralProtocol0_5 from "../../distribution/nkf/0.5/integrations/ai/nkf-authoring-protocol.md";
import portableSkill0_5 from "../../distribution/nkf/0.5/.agents/skills/nkf-authoring/SKILL.md";
import onboardingProtocol0_5 from "../../distribution/nkf/0.5/integrations/onboarding/nkf-onboarding-protocol.md";
import onboardingSkill0_5 from "../../distribution/nkf/0.5/.agents/skills/nkf-onboarding/SKILL.md";
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
// Out-of-window predecessors migrate through their own immutable published
// archives; the 0.7 adopter carries no live legacy migration.
const STEPPING_STONE_0_6 = Object.freeze({
  repository: "NourdApS/Nourd.NKF",
  nkf_version: "0.6",
  archive_sha256: "b0822199c1ddb4ea9de14e4c005edf77b44f9c60a6005689505ab00436dd4c95",
});
function migrateProjectTo0_5() {
  fail(
    "This repository declares an out-of-window NKF version. Migrate through the exact stepping-stone release first: "
    + `${STEPPING_STONE_0_6.repository} NKF ${STEPPING_STONE_0_6.nkf_version} archive sha256 ${STEPPING_STONE_0_6.archive_sha256}.`,
  );
}
import {
  convertBaselineShape0_7,
  sealBaseline0_7,
  writeReviewTemplate0_7,
} from "../freshness/seal-baseline-0-7.mjs";
import {
  sealBaseline0_5,
  sealBaselineModern,
  writeReviewTemplate0_5,
  writeReviewTemplateModern,
} from "../freshness/seal-baseline-0-5.mjs";
import {
  gateFreePredecessorTasks,
  validateRetrospectiveGateReview0_5,
  writePredecessorGateReviewTemplate0_5,
} from "../freshness/retrospective-gates-0-5.mjs";

const CURRENT_NKF_VERSION = "0.7";
const MODERN_NKF_VERSIONS = new Set(["0.5", "0.6", "0.7"]);
const RELATIONSHIP_TYPES = new Set([
  "part-of", "defines", "governs", "applies-to", "depends-on", "extends",
  "supersedes", "rationale-for", "realizes", "evidences", "references",
  "flows-to", "transitions-to", "observes",
]);
const CURRENT_REPOSITORY = "NourdApS/Nourd.NKF";
const LEGACY_REPOSITORY = "kaveh6202/Nourd.NKF";
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
const PRODUCER_PROMOTION_INPUT_PATH =
  "knowledge/evidence/release/nkf-0.6-revision-3-producer-promotion.yaml";
const PRODUCER_PROMOTION_INPUT_SHA256 =
  "d9f2f36e81a380f0862619093ddfdb45da0352d108e0a525104a4b399007a043";
const PRODUCER_ACCEPTING_DECISION_PATH =
  "knowledge/decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md";
const PRODUCER_ACCEPTING_DECISION_SHA256 =
  "1f50640755184fe1fd117295ffb5056d55e2a23c78d2f8b3ab56533df5e72ac6";
const PRODUCER_HISTORICAL_DECLARATION_PATH =
  ".nourd/knowledge/records/adr-0122.yaml";
const PRODUCER_HISTORICAL_DECLARATION_SHA256 =
  "dac8ccfe377138d45c5720eeb4d3f0fbdc2b2504224eb50a6a85888c44aaf3b9";
const PRODUCER_HISTORICAL_SOURCE_PATH =
  "knowledge/decisions/0122-accept-the-nkf-0-6-authority-set.md";
const PRODUCER_HISTORICAL_SOURCE_SHA256 =
  "d81ba0ca97e5229c26fa7aca9a67c34a757c59ca32b67b2892e5a4785b995547";
const PRODUCER_PROMOTION_STAGES = new Set([
  "prepublication-candidate-bound-adopt-into-isolated-exact-producer-copy",
  "postpublication-ordinary-public-self-adopt-by-exact-live-producer",
]);
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
    : nkfVersion === "0.5"
      ? {
          neutralProtocol: neutralProtocol0_5,
          portableSkill: portableSkill0_5,
          onboardingProtocol: onboardingProtocol0_5,
          onboardingSkill: onboardingSkill0_5,
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

function utf16Compare(left, right) {
  const length = Math.min(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    const difference = left.charCodeAt(index) - right.charCodeAt(index);
    if (difference !== 0) return difference;
  }
  return left.length - right.length;
}

function jcs(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail("JCS cannot encode a non-finite number.");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`;
  if (typeof value === "object") {
    return `{${Object.keys(value).sort(utf16Compare).map((key) => `${JSON.stringify(key)}:${jcs(value[key])}`).join(",")}}`;
  }
  fail(`JCS cannot encode ${typeof value}.`);
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
    "review",
    "record",
    "adopt",
  ].includes(result.command)) {
    fail(
      `Usage: nourd-nkf-adopt.mjs --project <path> [--plan <sealed-plan>] [--recommendation <catalog>] [--archive <archive>|--github-repository ${CURRENT_REPOSITORY}] [--accept-breaking <authority>]`,
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
      "promotion-input",
      "promotion-stage",
      "accepting-decision",
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
  } else if (["repin", "linkify"].includes(result.command)) {
    allowed = new Set(["project", "checker"]);
  } else if (result.command === "review") {
    allowed = new Set(["project", "checker", "scaffold", "stage"]);
  } else if (result.command === "record") {
    allowed = new Set(["project", "scaffold", "source"]);
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
      !["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"].includes(entry.from_nkf_version) ||
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
        `https://github.com/${CURRENT_REPOSITORY}/releases/tag/${tag}`;
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
        `https://github.com/${CURRENT_REPOSITORY}/releases/download/${tag}/${assetName}`) ||
    !/^[0-9a-f]{40}$/.test(value.source_commit ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.checker_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.adopter_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.authority.markdown_sha256 ?? "") ||
    !/^[0-9a-f]{64}$/.test(value.authority.executable_sha256 ?? "") ||
    JSON.stringify(value.supported_root_profiles) !==
      JSON.stringify(["nkf.profile.product", "nkf.profile.technology"]) ||
    // The live support window is the current version plus one predecessor;
    // out-of-window repositories migrate through published stepping-stone
    // releases instead of a declared compatibility rule.
    compatibility.size !== 2 ||
    compatibility.get("0.6")?.classification !== "breaking" ||
    compatibility.get("0.6")?.migration_required !== true ||
    compatibility.get("0.7")?.classification !== "non-breaking" ||
    compatibility.get("0.7")?.migration_required !== false
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
          `repos/${CURRENT_REPOSITORY}/contents/release/recommended.json`,
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
        `Unable to resolve the governed recommended release from ${CURRENT_REPOSITORY}${detail ? `: ${detail}` : "."}`,
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
    bundle = YAML.parse(bundleBytes.toString("utf8"), {
      schema: "core",
      strict: true,
      uniqueKeys: true,
    });
  } catch (error) {
    fail(`The NKF bundle is invalid YAML: ${error.message}`);
  }
  if (!["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"].includes(bundle?.nkf_version) || bundle?.contract !== "nkf.bundle") {
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
  if (repository !== CURRENT_REPOSITORY) {
    fail(`--github-repository must be ${CURRENT_REPOSITORY}.`);
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

function replaceYamlScalars(text, mutations, label) {
  const document = YAML.parseDocument(text, {
    schema: "core",
    strict: true,
    uniqueKeys: true,
    keepSourceTokens: true,
  });
  if (document.errors.length > 0) {
    fail(`${label} is not strict YAML: ${document.errors[0].message}`);
  }
  const patches = mutations.map(({ field, value }) => {
    let node = document.contents;
    for (const segment of field) {
      if (node?.anchor !== undefined || node?.tag !== undefined || YAML.isAlias(node)) {
        fail(`${label} has an anchored, tagged, or aliased mutation path at ${field.join(".")}.`);
      }
      if (YAML.isMap(node)) {
        if (node.items.some((pair) => YAML.isScalar(pair.key) && pair.key.value === "<<")) {
          fail(`${label} has a merged mutation path at ${field.join(".")}.`);
        }
        const matches = node.items.filter(
          (pair) => YAML.isScalar(pair.key) && pair.key.value === segment,
        );
        if (matches.length !== 1) fail(`${label} has no unique scalar at ${field.join(".")}.`);
        node = matches[0].value;
      } else if (YAML.isSeq(node) && Number.isInteger(segment) && segment >= 0 && segment < node.items.length) {
        node = node.items[segment];
      } else {
        fail(`${label} has no unique scalar at ${field.join(".")}.`);
      }
    }
    if (
      !YAML.isScalar(node) || node.anchor !== undefined || node.tag !== undefined ||
      !Array.isArray(node.range) || node.range.length < 2
    ) {
      fail(`${label} has no unique scalar at ${field.join(".")}.`);
    }
    return { start: node.range[0], end: node.range[1], value: JSON.stringify(value), field };
  }).sort((left, right) => right.start - left.start);
  for (let index = 0; index < patches.length - 1; index += 1) {
    if (patches[index].start < patches[index + 1].end) {
      fail(`${label} scalar ranges overlap.`);
    }
  }
  let updated = text;
  for (const patch of patches) {
    updated = `${updated.slice(0, patch.start)}${patch.value}${updated.slice(patch.end)}`;
  }
  const reparsed = YAML.parseDocument(updated, {
    schema: "core",
    strict: true,
    uniqueKeys: true,
  });
  if (reparsed.errors.length > 0) fail(`${label} scalar replacement produced invalid YAML.`);
  for (const mutation of mutations) {
    if (reparsed.getIn(mutation.field) !== mutation.value) {
      fail(`${label} scalar replacement failed at ${mutation.field.join(".")}.`);
    }
  }
  return updated;
}

function removeTopLevelYamlField(text, field, label) {
  const document = YAML.parseDocument(text, {
    schema: "core",
    strict: true,
    uniqueKeys: true,
    keepSourceTokens: true,
  });
  if (document.errors.length > 0 || !YAML.isMap(document.contents)) {
    fail(`${label} is not a strict YAML mapping.`);
  }
  const matches = document.contents.items
    .map((pair, index) => ({ pair, index }))
    .filter(({ pair }) => YAML.isScalar(pair.key) && pair.key.value === field);
  if (matches.length !== 1) fail(`${label} does not contain exactly one ${field} field.`);
  const [{ pair, index }] = matches;
  const next = document.contents.items[index + 1];
  if (!Array.isArray(pair.key.range)) fail(`${label} cannot locate ${field}.`);
  const start = pair.key.range[0];
  const end = next === undefined
    ? text.length
    : Array.isArray(next.key?.range)
      ? next.key.range[0]
      : fail(`${label} cannot locate the field after ${field}.`);
  if (start !== 0 && text[start - 1] !== "\n") {
    fail(`${label} ${field} is not a top-level line.`);
  }
  const updated = `${text.slice(0, start)}${text.slice(end)}`;
  const reparsed = YAML.parseDocument(updated, {
    schema: "core",
    strict: true,
    uniqueKeys: true,
  });
  if (reparsed.errors.length > 0 || reparsed.has(field)) {
    fail(`${label} structural removal failed for ${field}.`);
  }
  return updated;
}

function removeYamlFieldAtPath(text, parentPath, field, label) {
  const document = YAML.parseDocument(text, {
    schema: "core",
    strict: true,
    uniqueKeys: true,
    keepSourceTokens: true,
  });
  if (document.errors.length > 0) fail(`${label} is not strict YAML.`);
  const parent = document.getIn(parentPath, true);
  if (!YAML.isMap(parent)) fail(`${label} has no mapping at ${parentPath.join(".")}.`);
  const matches = parent.items
    .map((pair, index) => ({ pair, index }))
    .filter(({ pair }) => YAML.isScalar(pair.key) && pair.key.value === field);
  if (matches.length !== 1) fail(`${label} does not contain exactly one ${[...parentPath, field].join(".")} field.`);
  const [{ pair, index }] = matches;
  if (!Array.isArray(pair.key.range) || !Array.isArray(pair.value?.range)) {
    fail(`${label} cannot locate ${[...parentPath, field].join(".")}.`);
  }
  const lineStart = text.lastIndexOf("\n", pair.key.range[0] - 1) + 1;
  const next = parent.items[index + 1];
  let end;
  if (next !== undefined) {
    if (!Array.isArray(next.key?.range)) fail(`${label} cannot locate the field after ${field}.`);
    end = text.lastIndexOf("\n", next.key.range[0] - 1) + 1;
  } else {
    end = pair.value.range[1];
  }
  const updated = `${text.slice(0, lineStart)}${text.slice(end)}`;
  const reparsed = YAML.parseDocument(updated, { schema: "core", strict: true, uniqueKeys: true });
  if (reparsed.errors.length > 0 || reparsed.getIn([...parentPath, field]) !== undefined) {
    fail(`${label} structural removal failed for ${[...parentPath, field].join(".")}.`);
  }
  return updated;
}

function requireNativeRecordEnvelope(sourceBytes, declaration, label) {
  const text = sourceBytes.toString("utf8");
  if (!text.startsWith("---\n")) fail(`${label} has no native frontmatter envelope.`);
  const close = text.indexOf("\n---\n", 4);
  if (close === -1) fail(`${label} has no closed native frontmatter envelope.`);
  const frontmatter = YAML.parse(text.slice(4, close), {
    schema: "core",
    strict: true,
    uniqueKeys: true,
  });
  requireExactKeys(frontmatter, ["title", "summary", "created_at", "id", "type"], `${label} frontmatter`);
  if (
    frontmatter.id !== declaration.id ||
    frontmatter.type !== declaration.type ||
    frontmatter.title !== declaration.title
  ) {
    fail(`${label} native frontmatter does not match its declaration identity.`);
  }
}

function requireNativeDocumentEnvelope(sourceBytes, label) {
  const text = sourceBytes.toString("utf8");
  if (!text.startsWith("---\n")) fail(`${label} has no native frontmatter envelope.`);
  const close = text.indexOf("\n---\n", 4);
  if (close === -1) fail(`${label} has no closed native frontmatter envelope.`);
  const frontmatter = YAML.parse(text.slice(4, close), {
    schema: "core",
    strict: true,
    uniqueKeys: true,
  });
  requireExactKeys(frontmatter, ["title", "summary", "created_at"], `${label} frontmatter`);
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

function updatePreparedStagedArtifactBindings(stagedBundleBytes, files) {
  const staged = YAML.parse(stagedBundleBytes.toString("utf8"));
  if (!Array.isArray(staged.governed_artifacts)) return stagedBundleBytes;

  for (const artifact of staged.governed_artifacts) {
    if (typeof artifact?.path !== "string" || !files.has(artifact.path)) continue;
    const relative = safeRelative(artifact.path, "Governed artifact path");
    if (
      artifact?.digest?.algorithm !== "sha-256" ||
      !/^[0-9a-f]{64}$/.test(artifact?.digest?.value ?? "")
    ) {
      fail(`The prepared governed artifact binding is invalid: ${relative}`);
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
      repository: CURRENT_REPOSITORY,
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
      pin?.repository !== LEGACY_REPOSITORY ||
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
    !["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"].includes(pin?.nkf_version) ||
    (["0.6", "0.7"].includes(pin?.nkf_version)
      ? pin?.repository !== CURRENT_REPOSITORY
      : ![LEGACY_REPOSITORY, CURRENT_REPOSITORY].includes(pin?.repository)) ||
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
  const packageBytesValue = await readRegularInside(projectRoot, "package.json", false);
  const packageManifest = packageBytesValue === null
    ? null
    : parseStrictJson(packageBytesValue);
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
    ["0.2", "0.3", "0.4", "0.5", "0.6", "0.7"].includes(verification.manifest.nkf_version) &&
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
  for (const [relative, encoded] of Object.entries(predecessorContract0_6)) {
    const target = path.join(root, ...relative.split("/"));
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(encoded, "base64"));
  }
  const bytes = verification.entries.get("dist/nourd-nkf-checker.mjs");
  if (!Buffer.isBuffer(bytes) || digest(bytes) !== verification.checker_sha256) {
    fail("The verified NKF 0.5 archive does not carry its manifest-bound checker.");
  }
  return path.join(root, "dist/nourd-nkf-checker.mjs");
}

async function require0_5Readiness(projectRoot, verification, checkerPath = null) {
  const argumentsValue = [
    "--project", projectRoot,
    "--level", "full-bundle",
    "--purpose", "whole-root-readiness",
    "--require-readiness",
    "--runner", "nourd-nkf-adopter",
    "--no-persist",
  ];
  const invocation = checkerPath === null
    ? await invokeVerifiedChecker(verification, argumentsValue)
    : spawnSync(process.execPath, [checkerPath, ...argumentsValue], { encoding: "utf8" });
  if (invocation.status !== 0) {
    fail(`The staged NKF 0.5 candidate did not pass whole-root readiness: ${invocation.stderr || invocation.stdout}`);
  }
  const report = parseStrictJson(Buffer.from(invocation.stdout, "utf8"));
  if (report.conformance !== "passed" || report.readiness?.state !== "ready") {
    fail("The staged NKF 0.5 candidate is not conformant and ready against its reviewed baseline.");
  }
  return report;
}

async function requireModernReadiness(projectRoot, verification, version) {
  const invocation = await invokeVerifiedChecker(verification, [
    "--project", projectRoot,
    "--level", "full-bundle",
    "--purpose", "whole-root-readiness",
    "--require-readiness",
    "--runner", "nourd-nkf-adopter",
    "--no-persist",
  ]);
  const report = parseStrictJson(Buffer.from(invocation.stdout, "utf8"));
  if (
    report.nkf_version !== version ||
    report.conformance !== "passed" ||
    report.readiness?.state !== "ready"
  ) {
    fail(`The staged NKF ${version} project is not conformant and ready against its reviewed baseline.`);
  }
  return report;
}

function normalizedFreshnessPolicy(policy) {
  const normalized = structuredClone(policy);
  delete normalized.nkf_version;
  delete normalized.id;
  return normalized;
}

function graphRevision(baseline, version, policyId, policyDigest) {
  return digest(Buffer.from(jcs({
    contract: "nkf.graph-revision",
    nkf_version: version,
    bundle: baseline.bundle,
    profile: baseline.profile,
    nodes: baseline.node_revisions,
    edges: baseline.authored_edges,
    external_dependencies: baseline.external_dependencies,
    authority_inputs: baseline.authority_inputs,
    policy: { id: policyId, sha256: policyDigest },
  }), "utf8"));
}

async function stage0_5To0_6CarryForward(
  projectRoot,
  bundle,
  predecessorVerification,
  successorVerification,
  files,
  preparedCandidateReady = false,
) {
  const oldPolicyId = "nkf.freshness-policy.0.5";
  const newPolicyId = "nkf.freshness-policy.0.6";
  const oldPolicyDigest = "5789b935e8df4fa39462846481f3302d072c722fa106da5d136952cb9c993cdd";
  const newPolicyDigest = "a870dc037364776b927e93705655d3f4572407c65852c4e5a258aa7d5bafe4a4";
  const bundleText = (
    files.get(".nourd/knowledge/bundle.yaml") ??
    await readRegularInside(projectRoot, ".nourd/knowledge/bundle.yaml")
  ).toString("utf8");
  const candidateBundle = YAML.parse(bundleText);
  if (
    (predecessorVerification !== null &&
      predecessorVerification.manifest.nkf_version !== "0.5") ||
    (predecessorVerification === null && !preparedCandidateReady) ||
    successorVerification.manifest.nkf_version !== "0.6" ||
    candidateBundle.nkf_version !== "0.5" ||
    candidateBundle.knowledge_graph?.policy !== oldPolicyId
  ) {
    fail("The non-breaking carry-forward requires an exact native NKF 0.5 predecessor and NKF 0.6 successor.");
  }
  const predecessorReport = predecessorVerification === null
    ? null
    : await requireModernReadiness(projectRoot, predecessorVerification, "0.5");
  const baselineRelative = safeRelative(
    String(candidateBundle.knowledge_graph?.baseline ?? ""),
    "Freshness baseline path",
  );
  if (baselineRelative !== ".nourd/knowledge/freshness/baseline.yaml") {
    fail("The native 0.5 baseline path differs from the exact supported carry-forward path.");
  }
  const baselineText = (
    files.get(baselineRelative) ?? await readRegularInside(projectRoot, baselineRelative)
  ).toString("utf8");
  const baseline = YAML.parse(baselineText);
  const oldPolicyBytes = predecessorVerification === null
    ? Buffer.from(freshnessPolicy0_6, "utf8")
    : predecessorVerification.entries.get("contracts/nkf/0.6/freshness-policy.yaml");
  const newPolicyBytes = successorVerification.entries.get("contracts/nkf/0.6/freshness-policy.yaml");
  if (
    !Buffer.isBuffer(oldPolicyBytes) || digest(oldPolicyBytes) !== oldPolicyDigest ||
    !Buffer.isBuffer(newPolicyBytes) || digest(newPolicyBytes) !== newPolicyDigest
  ) {
    fail("The predecessor or successor freshness policy does not match its accepted digest.");
  }
  const oldPolicy = YAML.parse(oldPolicyBytes.toString("utf8"));
  const newPolicy = YAML.parse(newPolicyBytes.toString("utf8"));
  if (jcs(normalizedFreshnessPolicy(oldPolicy)) !== jcs(normalizedFreshnessPolicy(newPolicy))) {
    fail("The 0.5 and 0.6 freshness policies differ beyond their version and identity coordinates.");
  }
  if (
    baseline?.contract !== "nkf.graph-baseline" ||
    baseline?.nkf_version !== "0.5" ||
    baseline?.policy?.id !== oldPolicyId ||
    baseline?.policy?.digest?.value !== oldPolicyDigest
  ) {
    fail("The predecessor baseline is not an exact native NKF 0.5 baseline.");
  }
  const predecessorRevision = graphRevision(baseline, "0.5", oldPolicyId, oldPolicyDigest);
  if (
    baseline.graph_revision?.value !== predecessorRevision ||
    (predecessorReport !== null &&
      predecessorReport.readiness?.candidate_graph_revision?.value !== predecessorRevision)
  ) {
    fail("Automatic NKF 0.6 update requires a current exact NKF 0.5 reviewed baseline.");
  }
  const successorRevision = graphRevision(baseline, "0.6", newPolicyId, newPolicyDigest);
  files.set(
    ".nourd/knowledge/bundle.yaml",
    Buffer.from(replaceYamlScalars(bundleText, [
      { field: ["nkf_version"], value: "0.6" },
      { field: ["knowledge_graph", "policy"], value: newPolicyId },
    ], ".nourd/knowledge/bundle.yaml"), "utf8"),
  );
  files.set(
    baselineRelative,
    Buffer.from(replaceYamlScalars(baselineText, [
      { field: ["nkf_version"], value: "0.6" },
      { field: ["graph_revision", "value"], value: successorRevision },
      { field: ["policy", "id"], value: newPolicyId },
      { field: ["policy", "digest", "value"], value: newPolicyDigest },
    ], baselineRelative), "utf8"),
  );
  return { predecessorRevision, successorRevision };
}

async function stageProducerPromotionBaseline(projectRoot, files) {
  const baselinePath = ".nourd/knowledge/freshness/baseline.yaml";
  const baselineText = (await readRegularInside(projectRoot, baselinePath)).toString("utf8");
  const baseline = YAML.parse(baselineText, {
    schema: "core",
    strict: true,
    uniqueKeys: true,
  });
  const oldPolicyId = "nkf.freshness-policy.0.5";
  const oldPolicyDigest = "5789b935e8df4fa39462846481f3302d072c722fa106da5d136952cb9c993cdd";
  const newPolicyId = "nkf.freshness-policy.0.6";
  const newPolicyDigest = "a870dc037364776b927e93705655d3f4572407c65852c4e5a258aa7d5bafe4a4";
  if (
    baseline?.contract !== "nkf.graph-baseline" ||
    baseline?.nkf_version !== "0.5" ||
    baseline?.policy?.id !== oldPolicyId ||
    baseline?.policy?.digest?.value !== oldPolicyDigest ||
    baseline?.graph_revision?.value !==
      graphRevision(baseline, "0.5", oldPolicyId, oldPolicyDigest)
  ) {
    fail("Producer promotion requires one internally consistent native NKF 0.5 predecessor baseline.");
  }
  const successorRevision = graphRevision(
    baseline,
    "0.6",
    newPolicyId,
    newPolicyDigest,
  );
  files.set(
    baselinePath,
    Buffer.from(replaceYamlScalars(baselineText, [
      { field: ["nkf_version"], value: "0.6" },
      { field: ["graph_revision", "value"], value: successorRevision },
      { field: ["policy", "id"], value: newPolicyId },
      { field: ["policy", "digest", "value"], value: newPolicyDigest },
    ], baselinePath), "utf8"),
  );
}

async function isExactProducer(projectRoot, bundle) {
  const packageBytes = await readRegularInside(projectRoot, "package.json", false);
  const packageManifest = packageBytes === null ? null : parseStrictJson(packageBytes);
  return (
    bundle.id === "nourd-knowledge-format" &&
    bundle.root?.record === "nkf" &&
    bundle.root?.profile === "nkf.profile.technology" &&
    packageManifest?.repository?.url ===
      "git+https://github.com/NourdApS/Nourd.NKF.git"
  );
}

async function requireProducerPromotionInput(projectRoot, options, bundle) {
  const requested = ["promotion-input", "promotion-stage", "accepting-decision"]
    .some((name) => options[name] !== undefined);
  const candidateEntry = (bundle.non_records ?? []).filter(
    (entry) => entry?.path === "specifications/nkf-0.6-revision-3.md" &&
      entry?.kind === "evidence" && entry?.document !== undefined,
  );
  const producerIdentity = await isExactProducer(projectRoot, bundle);

  if (!requested && (!producerIdentity || candidateEntry.length === 0)) return null;
  if (!producerIdentity) {
    fail("Producer promotion is forbidden outside the exact NourdApS/Nourd.NKF producer.");
  }
  if (candidateEntry.length !== 1) {
    fail("Producer promotion requires exactly one candidate Evidence representation of NKF 0.6.");
  }
  if (
    options["promotion-input"] === undefined ||
    options["promotion-stage"] === undefined ||
    options["accepting-decision"] === undefined ||
    options.review === undefined
  ) {
    fail("Producer promotion requires --promotion-input, --accepting-decision, --promotion-stage, and --review.");
  }
  if (!PRODUCER_PROMOTION_STAGES.has(options["promotion-stage"])) {
    fail("The producer promotion stage is not one of the two accepted stages.");
  }
  const requireCanonicalInput = async (option, relative, expectedDigest, label) => {
    const supplied = await realpath(path.resolve(option)).catch(() => null);
    const canonical = await realpath(
      path.resolve(projectRoot, ...relative.split("/")),
    ).catch(() => null);
    if (supplied !== canonical) fail(`${label} must use its exact canonical project path.`);
    const bytes = await readRegularInside(projectRoot, relative);
    if (digest(bytes) !== expectedDigest) fail(`${label} differs from its accepted exact bytes.`);
    return bytes;
  };
  const inputBytes = await requireCanonicalInput(
    options["promotion-input"],
    PRODUCER_PROMOTION_INPUT_PATH,
    PRODUCER_PROMOTION_INPUT_SHA256,
    "Producer promotion input",
  );
  const decisionBytes = await requireCanonicalInput(
    options["accepting-decision"],
    PRODUCER_ACCEPTING_DECISION_PATH,
    PRODUCER_ACCEPTING_DECISION_SHA256,
    "Producer accepting Decision",
  );
  const input = YAML.parse(inputBytes.toString("utf8"), {
    schema: "core",
    strict: true,
    uniqueKeys: true,
  });
  requireExactKeys(input, [
    "contract", "nkf_version", "repository", "task", "specification",
    "executable", "freshness_policy", "declaration_path", "record_declaration",
    "historical_containment",
  ], "Producer promotion input");
  if (
    input.contract !== "nkf.producer-candidate-promotion" ||
    input.nkf_version !== "0.6" ||
    input.repository !== CURRENT_REPOSITORY ||
    input.task !== "NKF-027" ||
    input.declaration_path !== ".nourd/knowledge/records/nkf-0.6-specification-revision-3.yaml"
  ) {
    fail("The producer promotion input has the wrong contract identity or destination.");
  }
  for (const [key, expectedPath] of [
    ["specification", "knowledge/specifications/nkf-0.6-revision-3.md"],
    ["executable", "contracts/nkf/0.6/revision-3/nkf.yaml"],
    ["freshness_policy", "contracts/nkf/0.6/freshness-policy.yaml"],
  ]) {
    const binding = input[key];
    requireExactKeys(binding, ["path", "digest"], `Promotion ${key} binding`);
    if (
      binding.path !== expectedPath ||
      binding.digest?.algorithm !== "sha-256" ||
      digest(await readRegularInside(projectRoot, expectedPath)) !== binding.digest?.value
    ) {
      fail(`The producer promotion ${key} binding does not resolve exactly.`);
    }
  }
  if (!decisionBytes.toString("utf8").includes(PRODUCER_PROMOTION_INPUT_SHA256)) {
    fail("The accepting Decision does not bind the exact producer-promotion input digest.");
  }
  const expectedContainment = expectedProducerHistoricalContainment();
  if (jcs(input.historical_containment) !== jcs(expectedContainment)) {
    fail("The producer promotion historical containment is not the exact accepted two-occurrence input.");
  }
  const historicalSource = await readRegularInside(projectRoot, PRODUCER_HISTORICAL_SOURCE_PATH);
  const historicalDeclaration = await readRegularInside(projectRoot, PRODUCER_HISTORICAL_DECLARATION_PATH);
  if (
    digest(historicalSource) !== PRODUCER_HISTORICAL_SOURCE_SHA256 ||
    digest(historicalDeclaration) !== PRODUCER_HISTORICAL_DECLARATION_SHA256
  ) {
    fail("The exact ADR 0122 source or predecessor declaration differs from the accepted historical containment.");
  }
  const decisionDeclaration = YAML.parse(
    (await readRegularInside(projectRoot, ".nourd/knowledge/records/adr-0125.yaml")).toString("utf8"),
    { schema: "core", strict: true, uniqueKeys: true },
  );
  if (
    decisionDeclaration.id !== "adr-0125" ||
    decisionDeclaration.type !== "decision" ||
    decisionDeclaration.governance?.lifecycle !== "immutable" ||
    decisionDeclaration.governance?.status !== "accepted" ||
    decisionDeclaration.source?.digest?.value !== PRODUCER_ACCEPTING_DECISION_SHA256 ||
    JSON.stringify(decisionDeclaration.governance?.authority) !==
      JSON.stringify(input.record_declaration?.governance?.authority)
  ) {
    fail("The exact accepting Decision does not authorize the supplied native declaration.");
  }
  const recordsDirectory = path.join(projectRoot, ".nourd/knowledge/records");
  for (const name of (await readdir(recordsDirectory)).filter((item) => item.endsWith(".yaml"))) {
    const declaration = YAML.parse(await readFile(path.join(recordsDirectory, name), "utf8"), {
      schema: "core", strict: true, uniqueKeys: true,
    });
    if (
      declaration.id === "nkf-0.6-specification-revision-3" ||
      declaration.source?.path === "specifications/nkf-0.6-revision-3.md"
    ) {
      fail("The native NKF 0.6 Specification declaration already exists or collides.");
    }
  }
  if (await readRegularInside(projectRoot, input.declaration_path, false) !== null) {
    fail("The exact producer-promotion declaration destination already exists.");
  }
  return { input, inputBytes, candidateEntry: candidateEntry[0], stage: options["promotion-stage"] };
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
  const workingSeed = new Map(seedFiles);
  workingSeed.set(PROTOCOL_PATH, Buffer.from(neutralProtocol0_5, "utf8"));
  for (const skillPath of SKILL_PATHS) {
    workingSeed.set(skillPath, Buffer.from(portableSkill0_5, "utf8"));
  }
  workingSeed.set(
    ONBOARDING_PROTOCOL_PATH,
    Buffer.from(onboardingProtocol0_5, "utf8"),
  );
  for (const skillPath of ONBOARDING_SKILL_PATHS) {
    workingSeed.set(skillPath, Buffer.from(onboardingSkill0_5, "utf8"));
  }
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
    await ensureWritableParents(candidate, workingSeed.keys());
    for (const relative of seedRemovals) {
      const target = path.join(candidate, ...safeRelative(relative, "Candidate removed path").split("/"));
      const stat = await lstat(target).catch(() => null);
      if (stat === null || !stat.isFile() || stat.isSymbolicLink()) {
        fail(`The legacy migration removal is not one regular project file: ${relative}`);
      }
      await unlink(target);
    }
    for (const [relative, bytes] of workingSeed) {
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
          workingSeed,
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
    await require0_5Readiness(candidate, verification, checker);
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

function expectedProducerHistoricalContainment() {
  return {
    path: "decisions/0122-accept-the-nkf-0-6-authority-set.md",
    kind: "evidence",
    document: {
      id: "document-cddf78f71eac865b267a0b88c15600cf61383285d6d3b2558ff2e07d7bceda95",
      stable_path: "decisions/0122-accept-the-nkf-0-6-authority-set.md",
      digest: { algorithm: "sha-256", value: PRODUCER_HISTORICAL_SOURCE_SHA256 },
      relationships: [],
      historical_acceptance_attempt_lock: {
        record_id: "adr-0122",
        record_declaration: {
          path: PRODUCER_HISTORICAL_DECLARATION_PATH,
          digest: { algorithm: "sha-256", value: PRODUCER_HISTORICAL_DECLARATION_SHA256 },
        },
        source: {
          path: PRODUCER_HISTORICAL_SOURCE_PATH,
          digest: { algorithm: "sha-256", value: PRODUCER_HISTORICAL_SOURCE_SHA256 },
        },
        violations: [
          { diagnostic: "markdown.reference.deep-link.required", section: "scope-and-applicability", token: "NKF-027", occurrence: 1 },
          { diagnostic: "markdown.reference.deep-link.required", section: "alternatives-considered", token: "ADR 0121", occurrence: 1 },
        ],
        historical_effect: "accepted-history-not-current-release-authority",
        correction_decision: "adr-0125",
      },
    },
  };
}

async function requireProducer0_6TerminalState(projectRoot) {
  const { bundle } = await requireBundle(projectRoot);
  const producer =
    bundle.nkf_version === "0.6" &&
    await isExactProducer(projectRoot, bundle);
  if (!producer) return;
  const expectedContainment = expectedProducerHistoricalContainment();
  const candidateEvidence = (bundle.non_records ?? []).filter(
    (entry) => entry?.path === "specifications/nkf-0.6-revision-3.md",
  );
  const historical = (bundle.non_records ?? []).filter(
    (entry) => entry?.path === expectedContainment.path,
  );
  if (candidateEvidence.length !== 0 || historical.length !== 1 ||
      jcs(historical[0]) !== jcs(expectedContainment)) {
    fail("The native NKF 0.6 producer does not carry the exact terminal Evidence containment state.");
  }
  if (await readRegularInside(projectRoot, PRODUCER_HISTORICAL_DECLARATION_PATH, false) !== null) {
    fail("The native NKF 0.6 producer still carries the superseded ADR 0122 record declaration.");
  }
  const promotion = YAML.parse(
    (await readRegularInside(projectRoot, PRODUCER_PROMOTION_INPUT_PATH)).toString("utf8"),
    { schema: "core", strict: true, uniqueKeys: true },
  );
  const nativeDeclaration = YAML.parse(
    (await readRegularInside(projectRoot, promotion.declaration_path)).toString("utf8"),
    { schema: "core", strict: true, uniqueKeys: true },
  );
  if (jcs(nativeDeclaration) !== jcs(promotion.record_declaration)) {
    fail("The native NKF 0.6 producer Specification declaration differs from the exact accepted promotion input.");
  }
  const acceptingDecision = YAML.parse(
    (await readRegularInside(projectRoot, ".nourd/knowledge/records/adr-0125.yaml")).toString("utf8"),
    { schema: "core", strict: true, uniqueKeys: true },
  );
  if (acceptingDecision.source?.digest?.value !== PRODUCER_ACCEPTING_DECISION_SHA256) {
    fail("The native NKF 0.6 producer no longer binds the exact accepting Decision.");
  }
  const decisionIndex = (await readRegularInside(projectRoot, "knowledge/decisions/README.md")).toString("utf8");
  if (
    decisionIndex.includes("[ADR 0122: Accept The NKF 0.6 Authority Set]") ||
    !decisionIndex.includes("ADR 0122 is retained as non-record historical Evidence")
  ) {
    fail("The native NKF 0.6 producer Decision navigation is not in the exact historical terminal state.");
  }
}

async function verifyInstalled0_6Ready(projectRoot) {
  const installed = await verifyInstalled(projectRoot, true);
  const readiness = await requireModernReadiness(
    projectRoot,
    installed.verification,
    "0.6",
  );
  await requireProducer0_6TerminalState(projectRoot);
  return { ...installed, readiness };
}

async function verifyInstalled0_7Ready(projectRoot) {
  const installed = await verifyInstalled(projectRoot, true);
  const readiness = await requireModernReadiness(
    projectRoot,
    installed.verification,
    "0.7",
  );
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
  const predecessorInstallation = priorBytes === null
    ? null
    : await verifyPredecessorInstallation(projectRoot, priorBytes);
  const archiveBytes = await acquireArchive(options, expectedSha256);
  const verification = verifyReleaseArchive(archiveBytes, expectedSha256);
  const versionUpgrade =
    allowNonBreakingVersionUpgrade &&
    bundle.nkf_version === "0.5" &&
    verification.manifest.nkf_version === "0.6";
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
    let preparedCandidateReady = false;
    if (predecessorInstallation === null) {
      const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-0-5-predecessor-"));
      try {
        const checker = await verified0_5Checker(temporary, verification);
        await require0_5Readiness(projectRoot, verification, checker);
        preparedCandidateReady = true;
      } finally {
        await rm(temporary, { recursive: true, force: true });
      }
    }
    await stage0_5To0_6CarryForward(
      projectRoot,
      bundle,
      predecessorInstallation?.verification ?? null,
      verification,
      files,
      preparedCandidateReady,
    );
    await stageVerifiedHostRegistryMigration(projectRoot, files);
    const bundlePath = ".nourd/knowledge/bundle.yaml";
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
      if (
        bundle.nkf_version === "0.6" &&
        await isExactProducer(projectRoot, bundle)
      ) {
        await verifyInstalled0_6Ready(projectRoot);
      } else {
        await verifyInstalled(projectRoot, true);
      }
      return { state: "no-update", project: projectRoot, pin: prior };
    }
  }
  const verifier = versionUpgrade
    ? async (candidateRoot) => {
        const installed = await verifyInstalled(candidateRoot, true);
        const readiness = await requireModernReadiness(candidateRoot, installed.verification, "0.6");
        return { ...installed, readiness };
      }
    : null;
  await validateCompleteCandidate(projectRoot, files, [], verifier);
  const installed = await writeTransaction(
    projectRoot,
    files,
    () => verifier === null ? verifyInstalled(projectRoot, true) : verifier(projectRoot),
  );
  return {
    state: priorBytes === null ? "installed" : "updated",
    project: projectRoot,
    pin: installed.pin,
    ...(versionUpgrade
      ? {
          compatibility: {
            from_nkf_version: "0.5",
            to_nkf_version: "0.6",
            classification: "non-breaking",
            repository_owner_approval: "not-required",
            readiness: installed.readiness?.readiness?.state ?? "ready",
          },
        }
      : {}),
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
    !["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"].includes(value?.nkf_version) ||
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
  const candidate = await prepare0_7Candidate(
    projectRoot,
    files,
    options.review,
    verification,
  );
  for (const [relative, bytes] of integration) {
    candidate.files.set(relative, bytes);
  }
  const bundlePath = ".nourd/knowledge/bundle.yaml";
  candidate.files.set(
    bundlePath,
    updatePreparedStagedArtifactBindings(candidate.files.get(bundlePath), candidate.files),
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
  await validateCompleteCandidate(projectRoot, candidate.files, [], verifyInstalled0_7Ready);
  const installed = await writeTransaction(
    projectRoot,
    candidate.files,
    () => {
      if (process.env.NKF_ONBOARDING_TEST_FAIL_AFTER_WRITE === "1") {
        fail("Injected onboarding transaction failure.");
      }
      return verifyInstalled0_7Ready(projectRoot);
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
    const value = YAML.parse(await readFile(declarationPath, "utf8"), {
      schema: "core",
      strict: true,
      uniqueKeys: true,
    });
    if (
      value === null || typeof value !== "object" || Array.isArray(value) ||
      typeof value.id !== "string" || value.id === "" ||
      typeof value.source?.path !== "string" || value.source.path === ""
    ) {
      fail(`Governed declaration .nourd/knowledge/records/${entry.name} has no exact record identity and source path.`);
    }
    if (records.has(value.id)) fail(`Duplicate governed record identity: ${value.id}`);
    if (!Array.isArray(value.sections)) {
      fail(`Governed declaration ${value.id} has no exact section array.`);
    }
    const sections = new Set();
    for (const section of value.sections) {
      if (typeof section?.id !== "string" || section.id === "" || sections.has(section.id)) {
        fail(`Governed declaration ${value.id} has an invalid or duplicate section identity.`);
      }
      sections.add(section.id);
    }
    const relationships = value.relationships === undefined ? [] : value.relationships;
    const entityRelationships = value.entity_relationships === undefined ? [] : value.entity_relationships;
    const entitiesValue = value.entities === undefined ? [] : value.entities;
    if (!Array.isArray(relationships) || !Array.isArray(entityRelationships) || !Array.isArray(entitiesValue)) {
      fail(`Governed declaration ${value.id} has a non-array relationship or entity field.`);
    }
    const entities = new Set();
    for (const entity of entitiesValue) {
      if (typeof entity?.id !== "string" || entity.id === "" || entities.has(entity.id)) {
        fail(`Governed declaration ${value.id} has an invalid or duplicate entity identity.`);
      }
      entities.add(entity.id);
    }
    records.set(value.id, {
      sourcePath: value.source.path,
      declarationFile: `.nourd/knowledge/records/${entry.name}`,
      type: value.type,
      lifecycle: value.governance?.lifecycle,
      status: value.governance?.status,
      sections,
      entities,
      relationships,
      entityRelationships,
    });
    const adr = /^adr-(\d{4})$/.exec(value.id);
    if (adr && value.governance?.status === "accepted") {
      if (decisionsByNumber.has(adr[1])) fail(`Duplicate accepted Decision number: ADR ${adr[1]}`);
      decisionsByNumber.set(adr[1], value.source.path);
    }
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
      fail(`Governed Task source is unreadable: ${item.path}`);
    }
    const lines = text.split("\n");
    const close = lines[0] === "---" ? lines.indexOf("---", 1) : -1;
    const frontmatterTaskId = close > 0 ? lines.slice(1, close).find((line) => line.startsWith("task_id:"))?.slice(8).trim() : undefined;
    const taskId = MODERN_NKF_VERSIONS.has(bundle.nkf_version) && typeof item.document?.id === "string"
      ? item.document.id
      : frontmatterTaskId;
    if (typeof taskId !== "string" || taskId === "") {
      fail(`Governed Task ${item.path} has no exact Task identity.`);
    }
    if (tasks.has(taskId)) fail(`Duplicate governed Task identity: ${taskId}`);
    tasks.set(taskId, item.path);
    taskEntries.push({ taskId, path: item.path });
    taskDeclarations.set(taskId, item);
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

async function planRepinGoverned(projectRoot, sourceOverrides = new Map()) {
  const context = await loadGovernedContext(projectRoot);
  const files = new Map();
  let repinnedRecords = 0;
  for (const [, record] of context.records) {
    const declarationAbsolute = path.join(projectRoot, ...record.declarationFile.split("/"));
    const projectSourcePath = `${context.knowledgeRoot}/${record.sourcePath}`;
    const sourceAbsolute = path.join(projectRoot, ...projectSourcePath.split("/"));
    let sourceBytes;
    try {
      sourceBytes = sourceOverrides.get(projectSourcePath) ?? await readFile(sourceAbsolute);
    } catch {
      continue;
    }
    const observed = digest(sourceBytes);
    const declarationText = await readFile(declarationAbsolute, "utf8");
    const declaration = YAML.parse(declarationText);
    if (declaration?.source?.digest?.algorithm !== "sha-256") {
      fail(`Governed record ${record.declarationFile} has no SHA-256 source binding.`);
    }
    let updated = declarationText;
    if (declaration.source.digest.value !== observed) {
      if (declaration.legacy_lock !== undefined) {
        if (!["0.6", "0.7"].includes(context.bundle.nkf_version)) {
          fail(`Legacy-locked record ${record.declarationFile} cannot change before native NKF 0.6 adoption.`);
        }
        requireNativeRecordEnvelope(sourceBytes, declaration, record.declarationFile);
        updated = removeTopLevelYamlField(updated, "legacy_lock", record.declarationFile);
      }
      updated = replaceYamlScalars(
        updated,
        [{ field: ["source", "digest", "value"], value: observed }],
        record.declarationFile,
      );
    }
    if (updated !== declarationText) {
      files.set(record.declarationFile, Buffer.from(updated, "utf8"));
      repinnedRecords += 1;
    }
  }
  const bundlePath = path.join(projectRoot, ".nourd/knowledge/bundle.yaml");
  let bundleText = await readFile(bundlePath, "utf8");
  let repinnedArtifacts = 0;
  const artifactMutations = [];
  for (const [index, artifact] of (context.bundle.governed_artifacts ?? []).entries()) {
    if (typeof artifact?.path !== "string" || artifact?.digest?.algorithm !== "sha-256") continue;
    let bytes;
    try {
      bytes = sourceOverrides.get(artifact.path) ?? await readFile(path.join(projectRoot, ...artifact.path.split("/")));
    } catch {
      continue;
    }
    const observed = digest(bytes);
    if (observed !== artifact.digest.value) {
      artifactMutations.push({ field: ["governed_artifacts", index, "digest", "value"], value: observed });
      repinnedArtifacts += 1;
    }
  }
  let repinnedDocuments = 0;
  if (MODERN_NKF_VERSIONS.has(context.bundle.nkf_version)) {
    const documentMutations = [];
    const legacyRemovals = [];
    for (const [index, item] of (context.bundle.non_records ?? []).entries()) {
      if (item?.document?.digest?.algorithm !== "sha-256" || typeof item.path !== "string") continue;
      let bytes;
      try {
        const projectDocumentPath = `${context.knowledgeRoot}/${item.path}`;
        bytes = sourceOverrides.get(projectDocumentPath) ?? await readFile(path.join(projectRoot, ...projectDocumentPath.split("/")));
      } catch {
        continue;
      }
      const observed = digest(bytes);
      if (item.document.digest.value !== observed) {
        if (item.document.legacy_lock !== undefined) {
          if (!["0.6", "0.7"].includes(context.bundle.nkf_version)) {
            fail(`Legacy-locked document ${item.path} cannot change before native NKF 0.6 adoption.`);
          }
          if (item.kind !== "evidence") requireNativeDocumentEnvelope(bytes, item.path);
          legacyRemovals.push(["non_records", index, "document"]);
        }
        documentMutations.push({ field: ["non_records", index, "document", "digest", "value"], value: observed });
        repinnedDocuments += 1;
      }
    }
    for (const parentPath of legacyRemovals.sort((left, right) => Number(right[1]) - Number(left[1]))) {
      bundleText = removeYamlFieldAtPath(bundleText, parentPath, "legacy_lock", ".nourd/knowledge/bundle.yaml");
    }
    if (documentMutations.length > 0) {
      bundleText = replaceYamlScalars(bundleText, documentMutations, ".nourd/knowledge/bundle.yaml");
    }
  }
  if (artifactMutations.length > 0) {
    bundleText = replaceYamlScalars(bundleText, artifactMutations, ".nourd/knowledge/bundle.yaml");
  }
  if (repinnedArtifacts > 0 || repinnedDocuments > 0) {
    files.set(".nourd/knowledge/bundle.yaml", Buffer.from(bundleText, "utf8"));
  }
  return {
    files,
    state: "repinned",
    records: repinnedRecords,
    documents: repinnedDocuments,
    artifacts: repinnedArtifacts,
  };
}

async function authoringVerifier(projectRoot, options) {
  const pinPresent = (await readRegularInside(projectRoot, PIN_PATH, false)) !== null;
  if (pinPresent) return (root) => verifyInstalled(root, true);
  if (typeof options?.checker === "string") {
    return externalCheckerVerifier(path.resolve(options.checker));
  }
  fail("Authoring validation requires an installed release pin or an explicit --checker.");
}

async function repinGoverned(projectRoot, options = {}) {
  const plan = await planRepinGoverned(projectRoot);
  const verifier = await authoringVerifier(projectRoot, options);
  if (plan.files.size > 0) {
    await validateCompleteCandidate(projectRoot, plan.files, [], verifier);
    await writeTransaction(
      projectRoot,
      plan.files,
      () => verifier(projectRoot),
    );
  } else {
    await verifier(projectRoot);
  }
  return {
    state: plan.state,
    records: plan.records,
    documents: plan.documents,
    artifacts: plan.artifacts,
  };
}

async function exportReferences(projectRoot) {
  const context = await loadGovernedContext(projectRoot);
  const documents = new Map();
  const relationships = [];
  const nonempty = (value, label) => {
    if (typeof value !== "string" || value === "") fail(`${label} must be one non-empty string.`);
    return value;
  };
  const entityReference = (value, label) => {
    requireExactKeys(value, ["record", "entity"], label);
    const recordId = nonempty(value.record, `${label} record`);
    const entityId = nonempty(value.entity, `${label} entity`);
    if (!context.records.get(recordId)?.entities.has(entityId)) {
      fail(`${label} does not resolve to one exact same-bundle entity.`);
    }
    return { record: recordId, entity: entityId };
  };
  for (const item of context.bundle.non_records ?? []) {
    const document = item?.document;
    if (document === undefined) continue;
    if (
      typeof item?.path !== "string" || item.path === "" ||
      typeof document?.id !== "string" || document.id === ""
    ) {
      fail("A represented document has no exact identity and source path.");
    }
    if (documents.has(document.id)) fail(`Duplicate governed document identity: ${document.id}`);
    if (document.relationships !== undefined && !Array.isArray(document.relationships)) {
      fail(`Governed document ${document.id} has a non-array relationship field.`);
    }
    documents.set(document.id, item.path);
  }
  const nodeReference = (value, label) => {
    if (value?.kind === "record") {
      requireExactKeys(value, ["kind", "id"], label);
      if (!context.records.has(value.id)) fail(`${label} does not resolve to one exact record.`);
    } else if (value?.kind === "document") {
      requireExactKeys(value, ["kind", "id"], label);
      if (!documents.has(value.id)) fail(`${label} does not resolve to one exact document.`);
    } else if (value?.kind === "entity") {
      requireExactKeys(value, ["kind", "record", "entity"], label);
      entityReference({ record: value.record, entity: value.entity }, label);
    } else {
      fail(`${label} has an unsupported node-reference kind.`);
    }
    return structuredClone(value);
  };
  for (const [id, record] of context.records) {
    for (const [index, relationship] of record.relationships.entries()) {
      const label = `Record ${id} relationship ${index}`;
      requireExactKeys(relationship, ["type", "target", "source_section"], label);
      if (!RELATIONSHIP_TYPES.has(relationship.type)) fail(`${label} has an unsupported relationship type.`);
      if (!context.records.has(relationship.target)) fail(`${label} target does not resolve to one exact record.`);
      if (!record.sections.has(relationship.source_section)) fail(`${label} source section does not resolve exactly.`);
      const source = { kind: "record", id };
      relationships.push({
        source,
        relationship: relationship.type,
        target: { kind: "record", id: relationship.target },
        source_binding: { kind: "section", node: source, section: relationship.source_section },
      });
    }
    for (const [index, relationship] of record.entityRelationships.entries()) {
      const label = `Record ${id} entity relationship ${index}`;
      requireExactKeys(relationship, ["type", "source", "target", "source_section"], label);
      if (!RELATIONSHIP_TYPES.has(relationship.type)) fail(`${label} has an unsupported relationship type.`);
      if (!record.sections.has(relationship.source_section)) fail(`${label} source section does not resolve exactly.`);
      const source = { kind: "entity", ...entityReference(relationship.source, `${label} source`) };
      const target = { kind: "entity", ...entityReference(relationship.target, `${label} target`) };
      relationships.push({
        source,
        relationship: relationship.type,
        target,
        source_binding: { kind: "section", node: source, section: relationship.source_section },
      });
    }
  }
  for (const item of context.bundle.non_records ?? []) {
    const document = item?.document;
    if (document === undefined) continue;
    for (const [index, relationship] of (document.relationships ?? []).entries()) {
      const label = `Document ${document.id} relationship ${index}`;
      requireExactKeys(relationship, ["type", "target", "source_heading"], label);
      if (!RELATIONSHIP_TYPES.has(relationship.type)) fail(`${label} has an unsupported relationship type.`);
      requireExactKeys(relationship.source_heading, ["heading_path", "occurrence"], `${label} source heading`);
      if (
        !Array.isArray(relationship.source_heading.heading_path) ||
        relationship.source_heading.heading_path.length === 0 ||
        relationship.source_heading.heading_path.some((heading) => typeof heading !== "string" || heading === "") ||
        !Number.isInteger(relationship.source_heading.occurrence) || relationship.source_heading.occurrence < 1
      ) {
        fail(`${label} has an invalid source heading.`);
      }
      const source = { kind: "document", id: document.id };
      relationships.push({
        source,
        relationship: relationship.type,
        target: nodeReference(relationship.target, `${label} target`),
        source_binding: { kind: "heading", node: source, heading: structuredClone(relationship.source_heading) },
      });
    }
  }
  relationships.sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right), "en"));
  return {
    state: "exported",
    knowledge_root: context.knowledgeRoot,
    records: Object.fromEntries([...context.records].map(([id, record]) => [id, record.sourcePath])),
    documents: Object.fromEntries([...documents].sort(([left], [right]) => left.localeCompare(right, "en"))),
    decisions: Object.fromEntries(context.decisionsByNumber),
    tasks: Object.fromEntries(context.tasks),
    relationships,
  };
}

async function exportVersionedSet(projectRoot) {
  const { bundle } = await requireBundle(projectRoot);
  const declared = bundle.nkf_version;
  const releaseSet = ["0.3", "0.4", "0.5", "0.6", "0.7"].includes(declared)
    ? await readReleaseSet(projectRoot, declared)
    : undefined;
  if (releaseSet !== undefined) {
    return {
      state: "enumerated",
      nkf_version: declared,
      members: structuredClone(releaseSet.members),
    };
  }
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

async function linkifyProject(projectRoot, options = {}) {
  const context = await loadGovernedContext(projectRoot);
  const markdownFiles = await knowledgeMarkdownFiles(projectRoot, context.knowledgeRoot, context.bundle);
  const staged = new Map();
  const recordsBySource = new Map(
    [...context.records.values()].map((record) => [record.sourcePath, record]),
  );
  let changed = 0;
  for (const relative of markdownFiles) {
    const absolute = path.join(projectRoot, context.knowledgeRoot, ...relative.split("/"));
    const original = await readFile(absolute, "utf8");
    const result = linkifyText(original, context, relative);
    if (result.changed) {
      const record = recordsBySource.get(relative);
      if (record?.lifecycle === "immutable") {
        fail(`Linkify cannot change immutable governed source ${relative}.`);
      }
      staged.set(`${context.knowledgeRoot}/${relative}`, Buffer.from(result.text, "utf8"));
      changed += 1;
    }
  }
  const repin = await planRepinGoverned(projectRoot, staged);
  for (const [relative, bytes] of repin.files) staged.set(relative, bytes);
  const verifier = await authoringVerifier(projectRoot, options);
  if (staged.size > 0) {
    await validateCompleteCandidate(projectRoot, staged, [], verifier);
    await writeTransaction(
      projectRoot,
      staged,
      () => verifier(projectRoot),
    );
  } else {
    await verifier(projectRoot);
  }
  return {
    state: "linkified",
    files: markdownFiles.length,
    changed,
    repinned_records: repin.records,
    repinned_documents: repin.documents,
  };
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
      task_status: MODERN_NKF_VERSIONS.has(context.bundle.nkf_version)
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
  if (currentStatus === "cancelled" && transition !== "cancelled") {
    fail("cancelled is terminal; later work on the subject is a new Task.");
  }
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

  const selectedIndex = (context.bundle.non_records ?? []).findIndex(
    (item) => item?.kind === "task" && item?.document?.id === options.task,
  );
  const selected = context.bundle.non_records?.[selectedIndex];
  if (selected === undefined) fail(`The native NKF 0.5 Task declaration is unavailable: ${options.task}`);
  const priorTaskStatus = selected.document?.state?.value;
  if (!["active", "deferred", "completed", "cancelled"].includes(priorTaskStatus)) {
    fail(`The native Task ${options.task} has no supported declared state.`);
  }
  if (priorTaskStatus === "cancelled" && transition !== "cancelled") {
    fail("cancelled is terminal; later work on the subject is a new Task.");
  }
  if (transition === "cancelled" && priorTaskStatus === "completed") {
    fail("A completed Task is never cancelled; reversing delivered work is a later Task.");
  }
  if (priorTaskStatus === transition) {
    const verifier = await authoringVerifier(projectRoot, options);
    await verifier(projectRoot);
    return {
      state: "current",
      task: options.task,
      prior_task_status: priorTaskStatus,
      task_status: transition,
      generated_navigation: 0,
      changed_subjects: [],
    };
  }
  // The guidance-visible git orchestration: plan before mutation so a dirty
  // tree refuses the act, and report every later git step truthfully.
  const git = await taskGit(projectRoot);
  const gitPlan = await gitTransitionPlan(git, projectRoot, transition, options.task);
  const originalBundleText = await readFile(path.join(projectRoot, ".nourd/knowledge/bundle.yaml"), "utf8");
  const updatedBundleText = replaceYamlScalars(
    originalBundleText,
    [{ field: ["non_records", selectedIndex, "document", "state", "value"], value: transition }],
    ".nourd/knowledge/bundle.yaml",
  );
  const bundle = YAML.parse(updatedBundleText, { schema: "core", strict: true, uniqueKeys: true });
  const files = new Map();
  files.set(".nourd/knowledge/bundle.yaml", Buffer.from(updatedBundleText, "utf8"));
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
  await writeTransaction(effectiveRoot, files, () => (verifier ?? ((root) => verifyInstalled(root, true)))(effectiveRoot));
  const resultHeading0_5 = transition === "completed" ? "## Completion Result" : transition === "cancelled" ? "## Cancellation Result" : null;
  const prBody =
    transition === "active"
      ? `Deterministic activation of ${options.task}. This draft accompanies the Task's whole life; its conclusion marks it ready, and merging is the repository's human review act.`
      : resultHeading0_5 !== null && original.includes(resultHeading0_5)
        ? `Deterministic ${transition === "cancelled" ? "cancellation" : "close"} of ${options.task}. The merge is the repository's human review act.\n\n${original.split(`\n${resultHeading0_5}\n`)[1]?.split("\n## ")[0]?.trim() ?? ""}`
        : `Deterministic ${transition === "deferred" ? "deferral" : "transition"} of ${options.task}. The merge is the repository's human review act.`;
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
    prior_task_status: priorTaskStatus,
    task_status: transition,
    generated_navigation: states.length,
    changed_subjects: [...files.keys()].sort((left, right) => left.localeCompare(right, "en")),
    git: gitReport,
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
  if (!MODERN_NKF_VERSIONS.has(context.bundle.nkf_version) && statusMatch === null) fail("The task has no task_status line.");
  if (MODERN_NKF_VERSIONS.has(context.bundle.nkf_version)) {
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
    const repinned = replaceYamlScalars(
      declarationText,
      [{ field: ["source", "digest", "value"], value: digest(staged) }],
      record.declarationFile,
    );
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


// The one deliberate 0.6-to-0.7 stable-path neutralization. Every Task,
// Design, and Realization source under a lifecycle, disposition, or currency
// directory moves exactly once to its neutral items/ location, links and
// declarations are rewritten mechanically, and the emptied legacy index
// files leave the tree. Immutable record meaning never changes.
const NEUTRALIZATION_SOURCES = Object.freeze([
  { prefix: "tasks/active/", destination: "tasks/items/" },
  { prefix: "tasks/completed/", destination: "tasks/items/" },
  { prefix: "tasks/deferred/", destination: "tasks/items/" },
  { prefix: "tasks/cancelled/", destination: "tasks/items/" },
  { prefix: "designs/active/", destination: "designs/items/" },
  { prefix: "designs/adopted/", destination: "designs/items/" },
  { prefix: "designs/rejected/", destination: "designs/items/" },
  { prefix: "designs/superseded/", destination: "designs/items/" },
  { prefix: "designs/withdrawn/", destination: "designs/items/" },
  { prefix: "realizations/current/", destination: "realizations/items/" },
]);

async function neutralizeStatePaths(candidate, knowledgeRoot) {
  const knowledgeAbsolute = path.join(candidate, ...knowledgeRoot.split("/"));
  // Predecessor-only locks bind exact source bytes; locked sources are moved
  // without any rewrite so the locks remain byte-exact.
  const lockedSources = new Set();
  {
    const lockedRecordsDirectory = path.join(candidate, ".nourd/knowledge/records");
    for (const name of (await readdir(lockedRecordsDirectory).catch(() => []))
      .filter((item) => item.endsWith(".yaml"))) {
      const declaration = YAML.parse(
        await readFile(path.join(lockedRecordsDirectory, name), "utf8"),
        { schema: "core", strict: true, uniqueKeys: true },
      );
      if (
        declaration?.legacy_lock !== undefined ||
        declaration?.accepted_bootstrap_lock !== undefined ||
        declaration?.prepublication_supersession_lock !== undefined
      ) {
        if (typeof declaration?.source?.path === "string") lockedSources.add(declaration.source.path);
      }
    }
    const lockedBundle = YAML.parse(
      await readFile(path.join(candidate, ".nourd/knowledge/bundle.yaml"), "utf8"),
      { schema: "core", strict: true, uniqueKeys: true },
    );
    for (const entry of lockedBundle.non_records ?? []) {
      if (
        entry?.document?.legacy_lock !== undefined ||
        entry?.document?.historical_acceptance_attempt_lock !== undefined
      ) {
        if (typeof entry.path === "string") lockedSources.add(entry.path);
      }
    }
  }
  const markdownFiles = [];
  const walk = async (directory, prefix = "") => {
    for (const entry of (await readdir(directory, { withFileTypes: true }))) {
      const relative = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) await walk(absolute, relative);
      else if (entry.isFile() && entry.name.endsWith(".md")) markdownFiles.push(relative);
    }
  };
  await walk(knowledgeAbsolute);
  const moves = new Map();
  const removals = [];
  for (const relative of markdownFiles) {
    const rule = NEUTRALIZATION_SOURCES.find((entry) => relative.startsWith(entry.prefix));
    if (rule === undefined) continue;
    const name = relative.slice(rule.prefix.length);
    if (name.includes("/")) fail(`The stable-path neutralization does not support nested legacy sources: ${relative}`);
    if (name === "README.md") {
      removals.push(relative);
      continue;
    }
    const destination = `${rule.destination}${name}`;
    if (moves.has(destination) || markdownFiles.includes(destination)) {
      fail(`The stable-path neutralization destination collides: ${destination}`);
    }
    moves.set(relative, destination);
  }
  const movedTo = new Map([...moves.entries()].map(([from, to]) => [from, to]));
  const rewrittenPaths = new Set();
  // Move sources, rebasing their own outbound links.
  for (const [from, to] of moves) {
    const source = path.join(knowledgeAbsolute, ...from.split("/"));
    const target = path.join(knowledgeAbsolute, ...to.split("/"));
    await mkdir(path.dirname(target), { recursive: true });
    const text = (await readFile(source, "utf8"));
    const rebased = lockedSources.has(from) ? text : rewriteOutboundLinks(text, from, to);
    if (rebased !== text) rewrittenPaths.add(to);
    await writeFile(target, rebased);
    await unlink(source);
  }
  // Remove the emptied legacy index files.
  for (const relative of removals) {
    await unlink(path.join(knowledgeAbsolute, ...relative.split("/"))).catch(() => {});
  }
  // Rewrite inbound links across every remaining Markdown file, and drop
  // whole list lines that pointed at a removed legacy index.
  const remaining = [];
  await walk(knowledgeAbsolute).catch(() => {});
  const rewalk = async (directory, prefix = "") => {
    for (const entry of (await readdir(directory, { withFileTypes: true }))) {
      const relative = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) await rewalk(absolute, relative);
      else if (entry.isFile() && entry.name.endsWith(".md")) remaining.push(relative);
    }
  };
  await rewalk(knowledgeAbsolute);
  const removedSet = new Set(removals);
  const lockedCurrent = new Set(
    [...lockedSources].map((locked) => movedTo.get(locked) ?? locked),
  );
  for (const relative of remaining) {
    if (lockedCurrent.has(relative)) continue;
    const file = path.join(knowledgeAbsolute, ...relative.split("/"));
    const directory = relative.split("/").slice(0, -1);
    let fenced = false;
    let changed = false;
    const lines = (await readFile(file, "utf8")).split("\n").map((line) => {
      if (line.trim().startsWith("```")) { fenced = !fenced; return line; }
      if (fenced) return line;
      let dropLine = false;
      const rewritten = line.replace(/\]\(([^()\s]+)\)/g, (whole, destination) => {
        if (/^[a-z][a-z0-9+.-]*:/i.test(destination) || destination.startsWith("#")) return whole;
        const [target, fragment] = destination.split("#");
        if (target === undefined || target === "") return whole;
        const segments = [...directory];
        for (const part of target.split("/")) {
          if (part === "" || part === ".") continue;
          if (part === "..") { if (segments.length === 0) return whole; segments.pop(); continue; }
          segments.push(part);
        }
        const resolved = segments.join("/");
        if (removedSet.has(resolved)) { dropLine = true; return whole; }
        const moved = movedTo.get(resolved);
        if (moved === undefined) return whole;
        changed = true;
        return `](${relativeLink(relative, moved)}${fragment === undefined ? "" : `#${fragment}`})`;
      });
      if (dropLine) { changed = true; return null; }
      return rewritten;
    }).filter((line) => line !== null);
    if (changed) {
      await writeFile(file, lines.join("\n"));
      rewrittenPaths.add(relative);
    }
  }
  // Regenerate the realizations map: the removed lifecycle index carried the
  // supporting-Realization links that neutral topology requires on the map.
  const realizationsIndex = "realizations/README.md";
  const movedRealizations = [...moves.values()].filter((destination) =>
    destination.startsWith("realizations/items/"));
  if (movedRealizations.length > 0) {
    const indexFile = path.join(knowledgeAbsolute, ...realizationsIndex.split("/"));
    const indexStat = await lstat(indexFile).catch(() => null);
    if (indexStat !== null && indexStat.isFile()) {
      let indexText = await readFile(indexFile, "utf8");
      const appended = [];
      for (const destination of movedRealizations) {
        const link = destination.slice("realizations/".length);
        if (indexText.includes(`](${link})`)) continue;
        const movedText = await readFile(path.join(knowledgeAbsolute, ...destination.split("/")), "utf8");
        const title = /^#\s+(.+)$/m.exec(movedText)?.[1] ?? path.basename(destination, ".md");
        appended.push(`- [${title}](${link})`);
      }
      if (appended.length > 0) {
        if (!indexText.endsWith("\n")) indexText += "\n";
        indexText += `\n## Migrated Supporting Realizations\n\n${appended.join("\n")}\n`;
        await writeFile(indexFile, indexText);
        rewrittenPaths.add(realizationsIndex);
      }
    }
  }
  // Update record declarations and non-record document paths, and rebind the
  // digests of sources whose links were rewritten mechanically above.
  const rebindDigest = async (relative) =>
    digest(await readFile(path.join(knowledgeAbsolute, ...relative.split("/"))));
  const recordsDirectory = path.join(candidate, ".nourd/knowledge/records");
  for (const name of (await readdir(recordsDirectory)).filter((item) => item.endsWith(".yaml"))) {
    const file = path.join(recordsDirectory, name);
    const record = YAML.parse(await readFile(file, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
    const moved = movedTo.get(record.source?.path);
    const currentPath = moved ?? record.source?.path;
    const rebound = typeof currentPath === "string" && rewrittenPaths.has(currentPath);
    if (moved === undefined && !rebound) continue;
    if (moved !== undefined) {
      record.source.path = moved;
      record.source.stable_path = moved;
    }
    if (rebound) record.source.digest.value = await rebindDigest(currentPath);
    await writeFile(file, YAML.stringify(record, { lineWidth: 0, aliasDuplicateObjects: false }));
  }
  const bundlePath = path.join(candidate, ".nourd/knowledge/bundle.yaml");
  const bundle = YAML.parse(await readFile(bundlePath, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
  bundle.non_records = (bundle.non_records ?? []).filter((entry) => !removedSet.has(entry.path));
  for (const entry of bundle.non_records) {
    const moved = movedTo.get(entry.path);
    if (moved !== undefined) {
      entry.path = moved;
      if (entry.document !== undefined) entry.document.stable_path = moved;
    }
    if (entry.document?.digest?.value !== undefined && rewrittenPaths.has(entry.path)) {
      entry.document.digest.value = await rebindDigest(entry.path);
    }
  }
  await writeFile(bundlePath, YAML.stringify(bundle, { lineWidth: 0, aliasDuplicateObjects: false }));
  return { moves: moves.size, removed: removals.length };
}

// The one accepted identity succession this revision declares: the producer's
// consolidated current-system Realization receives its version-free
// identifier. Consumers declare no succession.
const ACCEPTED_SUCCESSIONS_0_7 = Object.freeze([
  Object.freeze({ predecessor: "nkf-0.1-native-realization", successor: "nkf-current-system" }),
]);

async function applyAcceptedSuccessions0_7(candidate, knowledgeRoot) {
  const recordsDirectory = path.join(candidate, ".nourd/knowledge/records");
  const baselineBytes = await readFile(
    path.join(candidate, ".nourd/knowledge/freshness/baseline.yaml"),
  ).catch(() => null);
  const predecessorGraphRevision = baselineBytes === null
    ? null
    : YAML.parse(baselineBytes.toString("utf8"), { schema: "core", strict: true, uniqueKeys: true })
        ?.graph_revision?.value;
  let applied = 0;
  for (const succession of ACCEPTED_SUCCESSIONS_0_7) {
    const predecessorFile = path.join(recordsDirectory, `${succession.predecessor}.yaml`);
    const stat = await lstat(predecessorFile).catch(() => null);
    if (stat === null || !stat.isFile()) continue;
    if (typeof predecessorGraphRevision !== "string") {
      fail("The accepted identity succession requires the predecessor reviewed baseline graph revision.");
    }
    const declaration = YAML.parse(await readFile(predecessorFile, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
    declaration.id = succession.successor;
    declaration.identity_succession = {
      predecessor_id: succession.predecessor,
      graph_revision: { algorithm: "sha-256", value: predecessorGraphRevision },
      recorded_by: "repository-owner",
    };
    // The living source keeps its stable path; only its identity line follows.
    const sourceRelative = declaration.source?.path;
    if (typeof sourceRelative === "string") {
      const sourceFile = path.join(candidate, ...knowledgeRoot.split("/"), ...sourceRelative.split("/"));
      const sourceText = await readFile(sourceFile, "utf8");
      const renamed = sourceText.replace(`\nid: ${succession.predecessor}\n`, `\nid: ${succession.successor}\n`);
      if (renamed === sourceText) fail("The succession source does not declare the exact predecessor identity.");
      await writeFile(sourceFile, renamed);
      declaration.source.digest.value = digest(Buffer.from(renamed, "utf8"));
    }
    await writeFile(
      path.join(recordsDirectory, `${succession.successor}.yaml`),
      YAML.stringify(declaration, { lineWidth: 0, aliasDuplicateObjects: false }),
    );
    await unlink(predecessorFile);
    // Rewrite exact identity references in the bundle and sibling declarations.
    const bundleFile = path.join(candidate, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundleFile, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
    for (const artifact of bundle.governed_artifacts ?? []) {
      if (artifact.record === succession.predecessor) artifact.record = succession.successor;
    }
    await writeFile(bundleFile, YAML.stringify(bundle, { lineWidth: 0, aliasDuplicateObjects: false }));
    for (const name of (await readdir(recordsDirectory)).filter((item) => item.endsWith(".yaml"))) {
      const file = path.join(recordsDirectory, name);
      const sibling = YAML.parse(await readFile(file, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
      let changed = false;
      for (const relationship of sibling.relationships ?? []) {
        if (relationship.target === succession.predecessor) { relationship.target = succession.successor; changed = true; }
      }
      for (const binding of sibling.bindings ?? []) {
        if (binding.realization === succession.predecessor) { binding.realization = succession.successor; changed = true; }
      }
      if (changed) await writeFile(file, YAML.stringify(sibling, { lineWidth: 0, aliasDuplicateObjects: false }));
    }
    applied += 1;
  }
  return applied;
}

// The migration classifies every undeclared non-Markdown regular file under
// the knowledge root as an inert provenance attachment, exactly once.
async function classifyProvenanceAttachments0_7(candidate, knowledgeRoot) {
  const knowledgeAbsolute = path.join(candidate, ...knowledgeRoot.split("/"));
  const regulars = [];
  const walk = async (directory, prefix = "") => {
    for (const entry of (await readdir(directory, { withFileTypes: true }))) {
      const relative = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) await walk(path.join(directory, entry.name), relative);
      else if (entry.isFile() && !entry.name.endsWith(".md")) regulars.push(relative);
    }
  };
  await walk(knowledgeAbsolute);
  const bundleFile = path.join(candidate, ".nourd/knowledge/bundle.yaml");
  const bundle = YAML.parse(await readFile(bundleFile, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
  const declared = new Set((bundle.non_records ?? []).map((entry) => entry.path));
  const recordsDirectory = path.join(candidate, ".nourd/knowledge/records");
  for (const name of (await readdir(recordsDirectory).catch(() => [])).filter((item) => item.endsWith(".yaml"))) {
    const declaration = YAML.parse(await readFile(path.join(recordsDirectory, name), "utf8"), { schema: "core", strict: true, uniqueKeys: true });
    if (typeof declaration?.source?.path === "string") declared.add(declaration.source.path);
  }
  let classified = 0;
  for (const relative of regulars.sort((left, right) => left.localeCompare(right, "en"))) {
    if (declared.has(relative)) continue;
    bundle.non_records = bundle.non_records ?? [];
    bundle.non_records.push({
      path: relative,
      kind: "provenance-attachment",
      digest: { algorithm: "sha-256", value: digest(await readFile(path.join(knowledgeAbsolute, ...relative.split("/")))) },
    });
    classified += 1;
  }
  if (classified > 0) {
    await writeFile(bundleFile, YAML.stringify(bundle, { lineWidth: 0, aliasDuplicateObjects: false }));
  }
  return classified;
}

async function prepare0_7Candidate(projectRoot, seedFiles, reviewPath, verification, seedRemovals = []) {
  if (reviewPath === undefined) {
    throw new OnboardingError(
      "NKF-ADOPT-REVIEW-PATH-REQUIRED",
      "The NKF 0.7 migration requires --review with a writable path for the exact semantic graph review.",
      { next_action: "rerun-adopt-with-review-path" },
    );
  }
  const review = path.resolve(reviewPath);
  const reviewStat = await lstat(review).catch(() => null);
  if (reviewStat !== null && (!reviewStat.isFile() || reviewStat.isSymbolicLink())) {
    fail("--review must identify one regular semantic graph review file or one absent file to create as a review template.");
  }
  const versionDeltaBytes = verification.entries.get("contracts/nkf/0.7/version-delta.yaml");
  if (!Buffer.isBuffer(versionDeltaBytes)) fail("The verified NKF 0.7 archive omits the accepted version-delta declaration.");
  const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-0-7-adopt-"));
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
    const workingSeed = new Map(seedFiles);
    workingSeed.set(PROTOCOL_PATH, Buffer.from(neutralProtocol, "utf8"));
    for (const skillPath of SKILL_PATHS) workingSeed.set(skillPath, Buffer.from(portableSkill, "utf8"));
    workingSeed.set(ONBOARDING_PROTOCOL_PATH, Buffer.from(onboardingProtocol, "utf8"));
    for (const skillPath of ONBOARDING_SKILL_PATHS) workingSeed.set(skillPath, Buffer.from(onboardingSkill, "utf8"));
    await ensureWritableParents(candidate, workingSeed.keys());
    for (const relative of seedRemovals) {
      const target = path.join(candidate, ...safeRelative(relative, "Candidate removed path").split("/"));
      const stat = await lstat(target).catch(() => null);
      if (stat === null || !stat.isFile() || stat.isSymbolicLink()) {
        fail(`The migration removal is not one regular project file: ${relative}`);
      }
      await unlink(target);
    }
    for (const [relative, bytes] of workingSeed) {
      const target = path.join(candidate, ...safeRelative(relative, "Candidate seed path").split("/"));
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, bytes);
    }
    const bundlePath = path.join(candidate, ".nourd/knowledge/bundle.yaml");
    {
      // Rebind governed-artifact digests for the exact seeded integration
      // files so the pre-review candidate validates its own staged bytes.
      const seededBundle = YAML.parse(await readFile(bundlePath, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
      let seededChanged = false;
      for (const artifact of seededBundle.governed_artifacts ?? []) {
        if (typeof artifact?.path !== "string" || artifact?.digest?.algorithm !== "sha-256") continue;
        const seeded = workingSeed.get(artifact.path);
        if (seeded === undefined || artifact.digest.value === digest(seeded)) continue;
        artifact.digest.value = digest(seeded);
        seededChanged = true;
      }
      if (seededChanged) {
        await writeFile(bundlePath, YAML.stringify(seededBundle, { lineWidth: 0, aliasDuplicateObjects: false }));
      }
    }
    const bundle = YAML.parse(await readFile(bundlePath, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
    const knowledgeRoot = bundle.knowledge_root;
    const onboarding = bundle.nkf_version === "0.7";
    const neutralization = onboarding
      ? { moves: 0, removed: 0 }
      : await neutralizeStatePaths(candidate, knowledgeRoot);
    if (!onboarding) {
      await applyAcceptedSuccessions0_7(candidate, knowledgeRoot);
      await classifyProvenanceAttachments0_7(candidate, knowledgeRoot);
    }
    if (!onboarding) {
      const migratedBundle = YAML.parse(await readFile(bundlePath, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
      migratedBundle.nkf_version = "0.7";
      if (migratedBundle.knowledge_graph?.policy !== undefined) {
        migratedBundle.knowledge_graph.policy = "nkf.freshness-policy.0.7";
      }
      await writeFile(bundlePath, YAML.stringify(migratedBundle, { lineWidth: 0, aliasDuplicateObjects: false }));
      const policyBytes = verification.entries.get("contracts/nkf/0.7/freshness-policy.yaml");
      if (!Buffer.isBuffer(policyBytes)) fail("The verified NKF 0.7 archive omits the accepted evaluation policy.");
      await convertBaselineShape0_7({
        projectRoot: candidate,
        versionDeltaDigest: digest(versionDeltaBytes),
        policyDigest: digest(policyBytes),
      });
    }
    const reviewStage = onboarding ? "whole-root" : "delta";
    const checker = await verified0_5Checker(temporary, verification);
    if (reviewStat === null) {
      const template = await writeReviewTemplate0_7({ projectRoot: candidate, checker, reviewPath: review, stage: reviewStage });
      throw new OnboardingError(
        "NKF-ADOPT-SEMANTIC-REVIEW-REQUIRED",
        "Adopt created the exact migration review with carried judgments prefilled and stopped before project mutation. A named reviewer must complete the computed required set and rerun the same Adopt command.",
        {
          review_template: template.path,
          review_stage: template.stage,
          carried: template.carried,
          required_fresh: template.fresh,
          next_action: "complete-review-and-rerun-adopt",
        },
      );
    }
    const baseline = await sealBaseline0_7({
      projectRoot: candidate,
      checker,
      reviewPath: review,
      versionDeltaDigest: digest(versionDeltaBytes),
    });
    await requireModernReadiness(candidate, verification, "0.7");
    const before = await regularFileInventory(projectRoot);
    const after = await regularFileInventory(candidate);
    const files = new Map();
    const removedPaths = [];
    for (const [relative, bytes] of after) {
      const current = before.get(relative);
      if (current === undefined || !current.equals(bytes)) files.set(relative, bytes);
    }
    for (const relative of before.keys()) {
      if (!after.has(relative)) removedPaths.push(relative);
    }
    removedPaths.sort((left, right) => left.localeCompare(right, "en"));
    return { files, removedPaths, neutralization, baseline };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

async function migrateToCurrent(options, prepared = undefined) {
  const input = prepared ?? await resolveMigrationInput(options);
  const { projectRoot, bundle, archiveBytes, verification } = input;
  if (["0.1", "0.2", "0.3", "0.4", "0.5"].includes(bundle.nkf_version)) {
    fail(
      "This repository declares an out-of-window NKF version. Migrate through the exact stepping-stone release first: "
      + `${STEPPING_STONE_0_6.repository} NKF ${STEPPING_STONE_0_6.nkf_version} archive sha256 ${STEPPING_STONE_0_6.archive_sha256}.`,
    );
  }
  if (bundle.nkf_version !== "0.6") {
    fail("migrate requires a project that declares the supported NKF 0.6 predecessor.");
  }
  if (verification.manifest.nkf_version !== CURRENT_NKF_VERSION) {
    fail(`migrate requires an NKF ${CURRENT_NKF_VERSION} release archive.`);
  }
  const targetIntegration = await targetFiles(
    projectRoot,
    archiveBytes,
    verification,
    bundle.root?.profile ?? "nkf.profile.product",
  );
  const seedFiles = new Map(targetIntegration);
  await stageVerifiedHostRegistryMigration(projectRoot, seedFiles);
  const candidate = await prepare0_7Candidate(
    projectRoot,
    seedFiles,
    options.review,
    verification,
  );
  for (const [relative, bytes] of targetIntegration) {
    candidate.files.set(relative, bytes);
  }
  const bundlePath = ".nourd/knowledge/bundle.yaml";
  candidate.files.set(
    bundlePath,
    updatePreparedStagedArtifactBindings(candidate.files.get(bundlePath), candidate.files),
  );
  await validateCompleteCandidate(
    projectRoot,
    candidate.files,
    candidate.removedPaths,
    verifyInstalled0_7Ready,
  );
  const installed = await writeTransaction(
    projectRoot,
    candidate.files,
    () => verifyInstalled0_7Ready(projectRoot),
    candidate.removedPaths,
  );
  return {
    state: "migrated",
    nkf_version: CURRENT_NKF_VERSION,
    predecessor_version: "0.6",
    neutralized_paths: candidate.neutralization.moves,
    removed_legacy_indexes: candidate.neutralization.removed,
    baseline: candidate.baseline,
    validation: {
      conformance: installed.report?.conformance ?? "passed",
      readiness: installed.readiness?.readiness?.state ?? "ready",
    },
  };
}


// Deterministic scaffolds: structure only, never a judgment.
async function scaffoldReview(projectRoot, options) {
  if (typeof options.scaffold !== "string") fail("review requires --scaffold with a writable review path.");
  if (typeof options.checker !== "string") fail("review --scaffold requires --checker with the verified checker path.");
  const stage = options.stage ?? "delta";
  if (!["delta", "whole-root"].includes(stage)) fail("--stage must be delta or whole-root.");
  const out = await writeReviewTemplate0_7({
    projectRoot,
    checker: path.resolve(options.checker),
    reviewPath: path.resolve(options.scaffold),
    stage,
  });
  return { state: "scaffolded", ...out };
}

async function scaffoldRecord(projectRoot, options) {
  if (typeof options.scaffold !== "string") fail("record requires --scaffold with a writable declaration path.");
  if (typeof options.source !== "string") fail("record --scaffold requires --source with one knowledge-relative Markdown path.");
  const { bundle } = await requireBundle(projectRoot);
  const relative = safeRelative(options.source, "Record source path");
  const bytes = await readRegularInside(projectRoot, `${bundle.knowledge_root}/${relative}`);
  let text = bytes.toString("utf8");
  // The optional front-matter envelope is not CommonMark content.
  if (text.startsWith("---\n")) {
    const close = text.indexOf("\n---\n", 4);
    if (close >= 0) text = text.slice(close + 5);
  }
  const headings = [];
  {
    const parser = new commonmark.Parser();
    const walker = parser.parse(text).walker();
    let event = walker.next();
    while (event !== null) {
      if (event.entering && event.node.type === "heading" && event.node.level <= 3) {
        let inner = event.node.walker();
        let innerEvent = inner.next();
        let headingText = "";
        while (innerEvent !== null) {
          if (innerEvent.entering && (innerEvent.node.type === "text" || innerEvent.node.type === "code")) {
            headingText += innerEvent.node.literal ?? "";
          }
          innerEvent = inner.next();
        }
        headings.push({ level: event.node.level, text: headingText });
      }
      event = walker.next();
    }
  }
  const occurrences = new Map();
  const sections = [];
  const trail = [];
  for (const heading of headings) {
    trail.length = Math.max(0, heading.level - 1);
    trail[heading.level - 1] = heading.text;
    if (heading.level === 1) continue;
    const headingPath = trail.slice(1, heading.level).filter((item) => item !== undefined);
    const key = JSON.stringify(headingPath);
    const occurrence = (occurrences.get(key) ?? 0) + 1;
    occurrences.set(key, occurrence);
    const slug = heading.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    sections.push({
      id: slug === "" ? "SECTION_ID_REQUIRED" : slug,
      heading_path: headingPath,
      occurrence,
      authority: "SEMANTIC_VALUE_REQUIRED",
      role: "SEMANTIC_VALUE_REQUIRED",
    });
  }
  const declaration = {
    contract: "nkf.record",
    id: "RECORD_ID_REQUIRED",
    type: "SEMANTIC_VALUE_REQUIRED",
    body_contract: "SEMANTIC_VALUE_REQUIRED",
    title: headings.find((heading) => heading.level === 1)?.text ?? "TITLE_REQUIRED",
    source: {
      path: relative,
      stable_path: relative,
      digest: { algorithm: "sha-256", value: digest(bytes) },
    },
    governance: {
      lifecycle: "SEMANTIC_VALUE_REQUIRED",
      status: "SEMANTIC_VALUE_REQUIRED",
      authority: ["SEMANTIC_VALUE_REQUIRED"],
    },
    scope: { root: bundle.root.record },
    sections,
    relationships: [],
  };
  const target = path.resolve(options.scaffold);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, YAML.stringify(declaration, { lineWidth: 0, aliasDuplicateObjects: false }));
  return { state: "scaffolded", path: target, source: relative, sections: sections.length };
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

async function promoteProducerTo0_6(
  projectRoot,
  bundle,
  options,
  releaseOptions,
  catalog,
  promotion,
) {
  if (bundle.nkf_version !== "0.5") {
    fail("Producer promotion requires the exact NKF producer still declaring NKF 0.5.");
  }
  const prepublication = promotion.stage ===
    "prepublication-candidate-bound-adopt-into-isolated-exact-producer-copy";
  if (prepublication !== (options["candidate-binding"] !== undefined)) {
    fail("The producer promotion stage does not match candidate versus published release selection.");
  }
  const archiveBytes = await acquireArchive(releaseOptions, catalog.archive.sha256);
  const verification = verifyReleaseArchive(archiveBytes, catalog.archive.sha256);
  if (verification.manifest.nkf_version !== "0.6") {
    fail("Producer promotion requires one exact NKF 0.6 release candidate or published archive.");
  }
  const targetIntegration = await targetFiles(
    projectRoot,
    archiveBytes,
    verification,
    "nkf.profile.technology",
  );
  const authoringPlan = await planRepinGoverned(projectRoot);
  const files = new Map(authoringPlan.files);
  for (const [relative, bytes] of targetIntegration) files.set(relative, bytes);
  await stageVerifiedHostRegistryMigration(projectRoot, files);

  const decisionIndexPath = "knowledge/decisions/README.md";
  const decisionIndexBytes = await readRegularInside(projectRoot, decisionIndexPath);
  const decisionLink =
    "- [ADR 0122: Accept The NKF 0.6 Authority Set](0122-accept-the-nkf-0-6-authority-set.md)";
  const historicalEvidenceEntry =
    "- ADR 0122 is retained as non-record historical Evidence because its exact\n" +
    "  acceptance attempt failed the inherited deep-link conformance rule.";
  const decisionIndexText = decisionIndexBytes.toString("utf8");
  if (
    decisionIndexText.split(decisionLink).length !== 2 ||
    decisionIndexText.includes(historicalEvidenceEntry)
  ) {
    fail("Producer promotion requires exactly one current ADR 0122 Decision index entry.");
  }
  files.set(
    decisionIndexPath,
    Buffer.from(decisionIndexText.replace(decisionLink, historicalEvidenceEntry), "utf8"),
  );

  const bundlePath = ".nourd/knowledge/bundle.yaml";
  const originalBundleBytes = await readRegularInside(projectRoot, bundlePath);
  const promotedBundle = YAML.parse(
    (files.get(bundlePath) ?? originalBundleBytes).toString("utf8"), {
    schema: "core", strict: true, uniqueKeys: true,
    },
  );
  promotedBundle.nkf_version = "0.6";
  promotedBundle.knowledge_graph.policy = "nkf.freshness-policy.0.6";
  const originalNonRecords = promotedBundle.non_records ?? [];
  promotedBundle.non_records = originalNonRecords.filter(
    (entry) => entry?.path !== "specifications/nkf-0.6-revision-3.md",
  );
  if (promotedBundle.non_records.length !== originalNonRecords.length - 1) {
    fail("Producer promotion did not remove exactly one candidate Evidence representation.");
  }
  if (promotedBundle.non_records.some(
    (entry) => entry?.document?.historical_acceptance_attempt_lock !== undefined,
  )) {
    fail("Producer promotion found a pre-existing historical acceptance containment.");
  }
  promotedBundle.non_records.push(promotion.input.historical_containment);
  files.set(bundlePath, serializeYaml(promotedBundle));
  files.set(
    promotion.input.declaration_path,
    serializeYaml(promotion.input.record_declaration),
  );
  await stageProducerPromotionBaseline(projectRoot, files);
  files.set(
    bundlePath,
    updatePreparedStagedArtifactBindings(files.get(bundlePath), files),
  );

  const review = path.resolve(options.review);
  const reviewStat = await lstat(review).catch(() => null);
  if (reviewStat !== null && (!reviewStat.isFile() || reviewStat.isSymbolicLink())) {
    fail("--review must identify one regular semantic graph review file or one absent file to create as a review template.");
  }
  const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-0-6-producer-promotion-"));
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
    for (const [relative, bytes] of files) {
      const target = path.join(candidate, ...safeRelative(relative, "Promotion target").split("/"));
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, bytes);
    }
    const historicalDeclaration = path.join(
      candidate,
      ...PRODUCER_HISTORICAL_DECLARATION_PATH.split("/"),
    );
    const historicalStat = await lstat(historicalDeclaration).catch(() => null);
    if (historicalStat === null || !historicalStat.isFile() || historicalStat.isSymbolicLink()) {
      fail("Producer promotion cannot remove the exact ADR 0122 predecessor declaration.");
    }
    await unlink(historicalDeclaration);
    const checker = await verified0_5Checker(temporary, verification);
    if (reviewStat === null) {
      const template = await writeReviewTemplateModern({
        projectRoot: candidate,
        checker,
        reviewPath: review,
        nkfVersion: "0.6",
        preferredSpecificationId: "nkf-0.6-specification-revision-3",
      });
      throw new OnboardingError(
        "NKF-ADOPT-PRODUCER-PROMOTION-REVIEW-REQUIRED",
        "Adopt created the exact post-promotion whole-root review template and stopped before producer mutation.",
        {
          review_template: template.path,
          candidate_nodes: template.nodes,
          accepted_decisions: template.decisions,
          promotion_stage: promotion.stage,
          next_action: "complete-review-and-rerun-producer-adopt",
        },
      );
    }
    const baseline = await sealBaselineModern({
      projectRoot: candidate,
      checker,
      reviewPath: review,
      nkfVersion: "0.6",
    });
    await requireModernReadiness(candidate, verification, "0.6");
    const before = await regularFileInventory(projectRoot);
    const after = await regularFileInventory(candidate);
    const transactionFiles = new Map();
    for (const [relative, bytes] of after) {
      const current = before.get(relative);
      if (current === undefined || !current.equals(bytes)) {
        transactionFiles.set(relative, bytes);
      }
    }
    const removedPaths = [PRODUCER_HISTORICAL_DECLARATION_PATH];
    for (const relative of before.keys()) {
      if (!after.has(relative)) {
        if (!removedPaths.includes(relative)) {
          fail(`Producer promotion attempted to remove a project source file: ${relative}`);
        }
      }
    }
    if (
      !after.get("knowledge/specifications/nkf-0.6-revision-3.md")?.equals(
        before.get("knowledge/specifications/nkf-0.6-revision-3.md"),
      )
    ) {
      fail("Producer promotion changed the accepted NKF 0.6 Markdown bytes.");
    }
    await validateCompleteCandidate(
      projectRoot,
      transactionFiles,
      removedPaths,
      verifyInstalled0_6Ready,
    );
    const installed = await writeTransaction(
      projectRoot,
      transactionFiles,
      () => verifyInstalled0_6Ready(projectRoot),
      removedPaths,
    );
    return {
      state: "updated",
      stage: promotion.stage,
      removed_evidence_document: promotion.candidateEntry.document.id,
      created_declaration: promotion.input.declaration_path,
      graph_revision: baseline.graph_revision,
      baseline,
      changed_subjects: [...transactionFiles.keys()].sort((left, right) =>
        left.localeCompare(right, "en")),
    };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
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
    releaseOptions["github-repository"] = CURRENT_REPOSITORY;
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
  const promotion = await requireProducerPromotionInput(projectRoot, options, bundle);
  if (promotion !== null) {
    const result = await promoteProducerTo0_6(
      projectRoot,
      bundle,
      options,
      releaseOptions,
      catalog,
      promotion,
    );
    return adoptResult("updated", projectRoot, catalog, {
      from_nkf_version: "0.5",
      classification: "non-breaking",
      migration_required: false,
      summary: "The exact NKF producer promotion applies the accepted native 0.6 declaration and separately reviewed graph.",
    }, result);
  }
  const rule = compatibility.get(bundle.nkf_version);
  if (rule === undefined) {
    const outOfWindow = ["0.1", "0.2", "0.3", "0.4", "0.5"].includes(bundle.nkf_version);
    throw new OnboardingError(
      "NKF-ADOPT-UNSUPPORTED-PREDECESSOR",
      outOfWindow
        ? "This repository declares an out-of-window NKF version. Migrate through the exact stepping-stone release first: "
          + `${STEPPING_STONE_0_6.repository} NKF ${STEPPING_STONE_0_6.nkf_version} archive sha256 ${STEPPING_STONE_0_6.archive_sha256}.`
        : `The recommended release does not declare compatibility from NKF ${bundle.nkf_version}.`,
      {
        from_nkf_version: bundle.nkf_version,
        target_nkf_version: catalog.nkf_version,
        target_archive_sha256: catalog.archive.sha256,
        ...(outOfWindow
          ? {
              stepping_stone: {
                repository: STEPPING_STONE_0_6.repository,
                nkf_version: STEPPING_STONE_0_6.nkf_version,
                archive_sha256: STEPPING_STONE_0_6.archive_sha256,
              },
            }
          : {}),
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
  if (command === "repin") return repinGoverned(await requireProjectRoot(options.project), options);
  if (command === "refs") return exportReferences(await requireProjectRoot(options.project));
  if (command === "linkify") return linkifyProject(await requireProjectRoot(options.project), options);
  if (command === "set") return exportVersionedSet(await requireProjectRoot(options.project));
  if (command === "task") return options.to === undefined ? taskPendingView(options) : transitionTask(options);
  if (command === "review") return scaffoldReview(await requireProjectRoot(options.project), options);
  if (command === "record") return scaffoldRecord(await requireProjectRoot(options.project), options);
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
