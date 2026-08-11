import { createHash } from "node:crypto";
import {
  lstat,
  readFile,
  readdir,
  realpath,
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import YAML from "yaml";

const registryPath = "integrations/ai/agent-hosts.yaml";
const canonicalCommand = "npm run nkf:check";
const protocolPath = "integrations/ai/nkf-authoring-protocol.md";
const checkoutAction =
  "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1";
const setupNodeAction =
  "actions/setup-node@820762786026740c76f36085b0efc47a31fe5020";
const agentBlockStart = "<!-- nkf-authoring-adapter:start -->";
const agentBlockEnd = "<!-- nkf-authoring-adapter:end -->";
const expectedAgentBlock = `${agentBlockStart}
# NKF Authoring Adapter

For every NKF-governed knowledge operation, read and follow
[\`integrations/ai/nkf-authoring-protocol.md\`](integrations/ai/nkf-authoring-protocol.md)
before editing governed files.

Use \`npm run nkf:check\` as the only supported authoring-handoff validation
command. Report acceptance, Realization confirmation, conformance, local Git
state, and remote enforcement state as separate facts.
${agentBlockEnd}`;
const expectedBootstrapAdapter = `# NKF Authoring Adapter

For every NKF-governed knowledge operation, read and follow
\`integrations/ai/nkf-authoring-protocol.md\` before editing governed files.

Use \`npm run nkf:check\` as the only supported authoring-handoff validation
command. Keep acceptance, Realization confirmation, conformance, local Git
state, and remote enforcement state separate.
`;
const expectedSkill0_2 = `---
name: nkf-authoring
description: Author, change, classify, migrate, audit, or validate NKF-governed knowledge in an adopted repository. Use for any operation affecting a knowledge root, .nourd declarations, NKF lifecycle records, governed artifacts, contract bindings, or NKF validation.
---

# NKF Authoring

NKF Version: 0.2

From the project root, read and follow
\`integrations/ai/nkf-authoring-protocol.md\` before editing governed knowledge.

Maintain each affected Task's Decision Applicability section before Git-backed
work: extract the applicable accepted decisions with their conditions,
negative findings, and unknowns, classify mandatory capabilities as proven,
unsupported, or unknown, and re-extract when the renderer, provider, platform,
data format, architecture, harness, or a mandatory requirement changes.

Keep orientation identity in frontmatter only; the closed identity labels
are rejected as top-level body bullets in every non-Evidence document, the
frontmatter title must equal the H1 exactly, and every same-bundle document
reference must be a deep link to the referenced document's source path.

Transition Tasks deliberately: before activating one, semantically resolve
and confirm every requirement and open uncertainty — the Human Product Owner
confirms, or the agent confirms under an explicitly recorded delegation;
before closing one, verify every acceptance criterion is done, tested, and
confirmed the same way; before cancelling one, confirm the decision not to
deliver and record the rationale. Only then run the deterministic \`task\`
transition, which enforces only the machine-checkable parts and performs
the Git transition mechanics: activation creates the \`task/<task_id>\`
branch and its working tree from the clean, up-to-date default branch and
opens the draft merge request; conclusion — close, defer, or cancel —
commits, pushes, marks the request ready, and releases the working tree. A
Task branch merges only concluded, and merging stays the human review act.

Perform governed mechanics through the internal deterministic adopter commands —
\`task\`, \`repin\`, \`linkify\`, \`refs\`, \`set\`, and \`migrate\` — supplying only the
prose; never hand-edit what a command performs. Public consumer adoption uses
the subcommand-free Adopt operation.

Run \`npm run nkf:check\` after one coherent governed change and before handoff.
Treat the protocol as derived procedure and accepted NKF Specifications as the
authority for format meaning.
`;
const rootKeys = [
  "adapters",
  "canonical_command",
  "contract",
  "neutral_protocol",
  "skills",
  "surfaces",
  "unknown_surface_policy",
  "version",
  "workflow",
];
const instructionBasenames = new Set(["AGENTS.md", "CLAUDE.md", "GEMINI.md"]);
const ignoredInstructionDiscoveryRoots = new Set([".git", "dist", "node_modules"]);

function fail(message) {
  throw new Error(message);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function exactKeys(value, allowed, label) {
  if (!isRecord(value)) {
    fail(`${label} must be a mapping.`);
  }
  const actual = Object.keys(value).sort();
  const expected = [...allowed].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(`${label} keys must be exactly: ${expected.join(", ")}.`);
  }
}

function array(value, label) {
  if (!Array.isArray(value)) {
    fail(`${label} must be an array.`);
  }
  return value;
}

function nonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim() !== value || value === "") {
    fail(`${label} must be a non-empty trimmed string.`);
  }
  return value;
}

function safeRelativePath(value, label) {
  const relative = nonEmptyString(value, label);
  if (
    path.isAbsolute(relative) ||
    relative.includes("\\") ||
    relative.split("/").some((segment) => segment === "" || segment === "." || segment === "..")
  ) {
    fail(`${label} must be a safe project-relative path using slash separators.`);
  }
  return relative;
}

function inside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function readRegularProjectFile(projectRoot, relativePath, label) {
  const relative = safeRelativePath(relativePath, label);
  const segments = relative.split("/");
  const absolute = path.resolve(projectRoot, ...segments);
  if (!inside(projectRoot, absolute)) {
    fail(`${label} escapes the project root.`);
  }
  let current = projectRoot;
  for (const [index, segment] of segments.entries()) {
    current = path.join(current, segment);
    const component = await lstat(current).catch(() => null);
    if (component === null) {
      fail(`${label} is missing: ${relative}.`);
    }
    if (component.isSymbolicLink()) {
      fail(`${label} must not contain a symbolic link: ${relative}.`);
    }
    if (index < segments.length - 1 && !component.isDirectory()) {
      fail(`${label} has a non-directory path component: ${relative}.`);
    }
  }
  const stat = await lstat(absolute);
  if (!stat.isFile()) {
    fail(`${label} must resolve to a regular file: ${relative}.`);
  }
  const resolved = await realpath(absolute);
  if (!inside(projectRoot, resolved)) {
    fail(`${label} resolves outside the project root.`);
  }
  return readFile(absolute);
}

function uniqueStrings(value, label) {
  const values = array(value, label).map((entry, index) =>
    nonEmptyString(entry, `${label}[${index}]`),
  );
  if (new Set(values).size !== values.length) {
    fail(`${label} must contain unique values.`);
  }
  return values;
}

function parseSkill(text) {
  const match = /^---\n([\s\S]*?)\n---\n\n([\s\S]+)$/.exec(text);
  if (match === null) {
    fail("The portable skill must contain YAML frontmatter and a CommonMark body.");
  }
  const frontmatter = YAML.parse(match[1]);
  exactKeys(frontmatter, ["description", "name"], "skill frontmatter");
  if (frontmatter.name !== "nkf-authoring") {
    fail("The portable skill name must be nkf-authoring.");
  }
  nonEmptyString(frontmatter.description, "skill description");
}

function requireDigest(value, label) {
  const digest = nonEmptyString(value, label);
  if (!/^[0-9a-f]{64}$/.test(digest)) {
    fail(`${label} must be a lowercase SHA-256 value.`);
  }
  return digest;
}

function isInstructionCandidate(relative) {
  const segments = relative.split("/");
  const basename = segments.at(-1);
  if (instructionBasenames.has(basename)) {
    return true;
  }
  if (
    relative === ".cursorrules" ||
    relative === ".windsurfrules" ||
    relative === ".github/copilot-instructions.md"
  ) {
    return true;
  }
  if (relative.startsWith(".github/instructions/") && relative.endsWith(".instructions.md")) {
    return true;
  }
  if (relative.startsWith(".claude/rules/") && relative.endsWith(".md")) {
    return true;
  }
  if (
    relative.startsWith(".cursor/rules/") &&
    (relative.endsWith(".md") || relative.endsWith(".mdc"))
  ) {
    return true;
  }
  return relative.startsWith(".windsurf/rules/") && relative.endsWith(".md");
}

async function discoverInstructionCandidates(projectRoot) {
  const candidates = [];
  const visit = async (directory, relativeDirectory = "") => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const relative = relativeDirectory === "" ? entry.name : `${relativeDirectory}/${entry.name}`;
      const rootSegment = relative.split("/", 1)[0];
      if (ignoredInstructionDiscoveryRoots.has(rootSegment)) {
        continue;
      }
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(absolute, relative);
      } else if (
        (entry.isFile() || entry.isSymbolicLink()) &&
        isInstructionCandidate(relative)
      ) {
        candidates.push(relative);
      }
    }
  };
  await visit(projectRoot);
  return candidates.sort();
}

function verifyNoImportCycle(adapterById) {
  const visited = new Set();
  const active = new Set();
  const visit = (id) => {
    if (active.has(id)) {
      fail(`Adapter import graph contains a cycle at ${id}.`);
    }
    if (visited.has(id)) {
      return;
    }
    active.add(id);
    const adapter = adapterById.get(id);
    for (const target of adapter.imports) {
      if (!adapterById.has(target)) {
        fail(`Adapter ${id} imports unknown adapter ${target}.`);
      }
      visit(target);
    }
    active.delete(id);
    visited.add(id);
  };
  for (const id of adapterById.keys()) {
    visit(id);
  }
}

function reachesProtocol(id, adapterById, seen = new Set()) {
  if (seen.has(id)) {
    return false;
  }
  seen.add(id);
  const adapter = adapterById.get(id);
  if (adapter.mode === "bounded-root" || adapter.mode === "exact-bootstrap") {
    return true;
  }
  return adapter.imports.some((target) => reachesProtocol(target, adapterById, seen));
}

function validateWorkflow(workflow, registry) {
  if (!isRecord(workflow) || workflow.name !== "NKF Contracts") {
    fail("The workflow name must be NKF Contracts.");
  }
  exactKeys(workflow, ["jobs", "name", "on", "permissions"], "workflow");
  if ("pull_request_target" in workflow) {
    fail("The workflow must not use pull_request_target.");
  }
  const triggers = workflow.on;
  if (!isRecord(triggers) || !isRecord(triggers.pull_request) || !isRecord(triggers.push)) {
    fail("The workflow must run for pull requests and pushes.");
  }
  for (const trigger of ["pull_request", "push"]) {
    exactKeys(triggers[trigger], ["branches"], `workflow.on.${trigger}`);
    if (JSON.stringify(triggers[trigger].branches) !== JSON.stringify(["master"])) {
      fail(`workflow.on.${trigger}.branches must contain only master.`);
    }
  }
  exactKeys(workflow.permissions, ["contents"], "workflow.permissions");
  if (workflow.permissions.contents !== "read") {
    fail("The workflow must receive read-only repository contents permission.");
  }
  if (!isRecord(workflow.jobs) || Object.keys(workflow.jobs).length !== 1) {
    fail("The workflow must contain exactly one job.");
  }
  const job = workflow.jobs.validate;
  if (!isRecord(job) || job.name !== registry.workflow.required_job) {
    fail("The workflow must contain the required Validate job.");
  }
  exactKeys(job, ["name", "runs-on", "steps", "timeout-minutes"], "workflow.jobs.validate");
  if (job["runs-on"] !== "ubuntu-latest" || job["timeout-minutes"] !== 15) {
    fail("The Validate job runner or timeout does not match the reviewed workflow.");
  }
  const steps = array(job.steps, "workflow jobs.validate.steps");
  if (steps.length !== 4 || steps.some((step) => !isRecord(step))) {
    fail("The Validate job must contain exactly the four reviewed steps.");
  }
  exactKeys(steps[0], ["name", "uses", "with"], "workflow checkout step");
  exactKeys(steps[1], ["name", "uses", "with"], "workflow setup step");
  exactKeys(steps[2], ["name", "run"], "workflow install step");
  exactKeys(steps[3], ["name", "run"], "workflow validation step");
  if (
    steps[0].name !== "Check Out Exact Commit" ||
    steps[0].uses !== checkoutAction ||
    JSON.stringify(steps[0].with) !==
      JSON.stringify({ "persist-credentials": false, "fetch-depth": 0 })
  ) {
    fail("The workflow checkout step must use the exact reviewed Action and settings.");
  }
  if (
    steps[1].name !== "Set Up Node.js" ||
    steps[1].uses !== setupNodeAction ||
    JSON.stringify(steps[1].with) !== JSON.stringify({ "node-version": "22", cache: "npm" })
  ) {
    fail("The workflow setup step must use the exact reviewed Action and settings.");
  }
  if (
    steps[2].name !== "Install Locked Dependencies" ||
    steps[2].run !== "npm ci" ||
    steps[3].name !== "Validate NKF Contracts" ||
    steps[3].run !== canonicalCommand
  ) {
    fail("The workflow must install locked dependencies and run only the canonical project command.");
  }
}

export async function verifyAgentGuidance(projectRootInput) {
  const projectRoot = await realpath(path.resolve(projectRootInput));
  const bundle = YAML.parse(
    await readFile(path.join(projectRoot, ".nourd/knowledge/bundle.yaml"), "utf8"),
  );
  if (!["0.2", "0.3"].includes(bundle?.nkf_version)) {
    fail("The producer guidance verifier requires an NKF 0.2 or 0.3 bundle.");
  }
  const expectedSkill = expectedSkill0_2.replace(
    "NKF Version: 0.2",
    `NKF Version: ${bundle.nkf_version}`,
  );
  const registryBytes = await readRegularProjectFile(projectRoot, registryPath, "registry path");
  const registry = YAML.parse(registryBytes.toString("utf8"));
  exactKeys(registry, rootKeys, "registry");
  if (registry.contract !== "nkf.agent-guidance-registry" || registry.version !== 1) {
    fail("The registry contract identity or version is unsupported.");
  }
  if (registry.canonical_command !== canonicalCommand) {
    fail(`The registry canonical command must be ${canonicalCommand}.`);
  }

  exactKeys(registry.neutral_protocol, ["path", "sha256"], "neutral_protocol");
  if (registry.neutral_protocol.path !== protocolPath) {
    fail(`The neutral protocol path must be ${protocolPath}.`);
  }
  const protocolBytes = await readRegularProjectFile(
    projectRoot,
    registry.neutral_protocol.path,
    "neutral protocol path",
  );
  if (sha256(protocolBytes) !== requireDigest(registry.neutral_protocol.sha256, "neutral protocol digest")) {
    fail("The neutral protocol digest does not match its exact bytes.");
  }
  const protocol = protocolBytes.toString("utf8");
  if (!protocol.includes(canonicalCommand)) {
    fail("The neutral protocol does not name the canonical project command.");
  }
  for (const vendorTerm of ["Anthropic", "Claude", "Codex", "Copilot", "Cursor", "Gemini", "OpenAI", "Windsurf"]) {
    if (protocol.toLocaleLowerCase("en-US").includes(vendorTerm.toLocaleLowerCase("en-US"))) {
      fail(`The neutral protocol contains vendor-specific term: ${vendorTerm}.`);
    }
  }

  const adapters = array(registry.adapters, "adapters");
  const adapterById = new Map();
  const adapterPaths = new Set();
  for (const [index, adapter] of adapters.entries()) {
    exactKeys(adapter, ["id", "imports", "mode", "path", "sha256"], `adapters[${index}]`);
    const id = nonEmptyString(adapter.id, `adapters[${index}].id`);
    if (adapterById.has(id)) {
      fail(`Duplicate adapter id: ${id}.`);
    }
    const relative = safeRelativePath(adapter.path, `adapters[${index}].path`);
    if (adapterPaths.has(relative)) {
      fail(`Duplicate adapter path: ${relative}.`);
    }
    adapterPaths.add(relative);
    adapter.imports = uniqueStrings(adapter.imports, `adapters[${index}].imports`);
    if (!["bounded-root", "exact-bootstrap", "exact-import"].includes(adapter.mode)) {
      fail(`Unsupported adapter mode: ${adapter.mode}.`);
    }
    const bytes = await readRegularProjectFile(projectRoot, relative, `adapter ${id}`);
    if (sha256(bytes) !== requireDigest(adapter.sha256, `adapter ${id} digest`)) {
      fail(`Adapter digest mismatch: ${id}.`);
    }
    const text = bytes.toString("utf8");
    if (adapter.mode === "bounded-root") {
      if (
        text.split(agentBlockStart).length !== 2 ||
        text.split(agentBlockEnd).length !== 2 ||
        !text.includes(expectedAgentBlock)
      ) {
        fail(`Adapter ${id} does not contain the exact bounded NKF adapter.`);
      }
      if (adapter.imports.length !== 0) {
        fail(`Bounded root adapter ${id} must not import another adapter.`);
      }
    } else if (adapter.mode === "exact-import") {
      if (
        adapter.imports.length !== 1 ||
        text !== `@${adapters.find((candidate) => candidate.id === adapter.imports[0])?.path ?? ""}\n`
      ) {
        fail(`Adapter ${id} must contain exactly one registered import.`);
      }
    } else if (text !== expectedBootstrapAdapter || adapter.imports.length !== 0) {
      fail(`Adapter ${id} must equal the exact bootstrap adapter.`);
    }
    adapterById.set(id, adapter);
  }
  verifyNoImportCycle(adapterById);
  for (const id of adapterById.keys()) {
    if (!reachesProtocol(id, adapterById)) {
      fail(`Adapter ${id} does not ultimately direct the host to the neutral protocol.`);
    }
  }
  const discovered = await discoverInstructionCandidates(projectRoot);
  if (JSON.stringify(discovered) !== JSON.stringify([...adapterPaths].sort())) {
    fail("The discovered instruction-adapter paths do not match the registry.");
  }

  exactKeys(registry.skills, ["name", "representations", "sha256"], "skills");
  if (registry.skills.name !== "nkf-authoring") {
    fail("The registry skill name must be nkf-authoring.");
  }
  const skillPaths = uniqueStrings(registry.skills.representations, "skills.representations");
  if (
    JSON.stringify(skillPaths) !==
    JSON.stringify([
      ".agents/skills/nkf-authoring/SKILL.md",
      ".claude/skills/nkf-authoring/SKILL.md",
    ])
  ) {
    fail("The portable skill representations must use the accepted discovery paths.");
  }
  const skillDigest = requireDigest(registry.skills.sha256, "skills.sha256");
  let firstSkill = null;
  for (const relative of skillPaths) {
    const bytes = await readRegularProjectFile(projectRoot, relative, `skill representation ${relative}`);
    if (sha256(bytes) !== skillDigest) {
      fail(`Skill digest mismatch: ${relative}.`);
    }
    if (firstSkill !== null && !bytes.equals(firstSkill)) {
      fail("The portable skill representations are not byte-identical.");
    }
    firstSkill = bytes;
  }
  const skillText = firstSkill.toString("utf8");
  if (skillText !== expectedSkill) {
    fail("The portable skill does not equal the accepted cross-host bootstrap.");
  }
  parseSkill(skillText);

  const surfaces = array(registry.surfaces, "surfaces");
  const surfaceIds = new Set();
  for (const [index, surface] of surfaces.entries()) {
    exactKeys(
      surface,
      ["adapters", "coverage", "evidence", "id", "product", "provider", "skill", "surface"],
      `surfaces[${index}]`,
    );
    const id = nonEmptyString(surface.id, `surfaces[${index}].id`);
    if (surfaceIds.has(id)) {
      fail(`Duplicate surface id: ${id}.`);
    }
    surfaceIds.add(id);
    for (const field of ["product", "provider", "surface"]) {
      nonEmptyString(surface[field], `surfaces[${index}].${field}`);
    }
    if (!["manual-bootstrap", "not-verified", "verified-adapter", "verified-native"].includes(surface.coverage)) {
      fail(`Unsupported coverage state for surface ${id}.`);
    }
    const references = uniqueStrings(surface.adapters, `surfaces[${index}].adapters`);
    for (const adapterId of references) {
      if (!adapterById.has(adapterId)) {
        fail(`Surface ${id} references unknown adapter ${adapterId}.`);
      }
    }
    if (surface.coverage.startsWith("verified") && references.length === 0) {
      fail(`Verified surface ${id} must reference at least one adapter.`);
    }
    if (surface.skill !== null && surface.skill !== registry.skills.name) {
      fail(`Surface ${id} references an unknown skill.`);
    }
    exactKeys(surface.evidence, ["reviewed_at", "urls"], `surfaces[${index}].evidence`);
    const evidenceUrls = uniqueStrings(surface.evidence.urls, `surfaces[${index}].evidence.urls`);
    if (evidenceUrls.length === 0) {
      fail(`Surface ${id} must cite at least one official capability source.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(String(surface.evidence.reviewed_at))) {
      fail(`Surface ${id} evidence must have a UTC timestamp.`);
    }
  }

  exactKeys(
    registry.unknown_surface_policy,
    ["bootstrap_protocol", "coverage", "output_gate"],
    "unknown_surface_policy",
  );
  if (
    registry.unknown_surface_policy.coverage !== "not-verified" ||
    registry.unknown_surface_policy.bootstrap_protocol !== protocolPath ||
    registry.unknown_surface_policy.output_gate !== canonicalCommand
  ) {
    fail("The unknown-surface policy must fail closed and retain the universal output gate.");
  }

  exactKeys(registry.workflow, ["path", "required_job", "sha256"], "workflow");
  if (
    registry.workflow.path !== ".github/workflows/nkf-contracts.yml" ||
    registry.workflow.required_job !== "Validate"
  ) {
    fail("The registry workflow identity is unsupported.");
  }
  const workflowBytes = await readRegularProjectFile(projectRoot, registry.workflow.path, "workflow path");
  if (sha256(workflowBytes) !== requireDigest(registry.workflow.sha256, "workflow digest")) {
    fail("The workflow digest does not match its exact bytes.");
  }
  validateWorkflow(YAML.parse(workflowBytes.toString("utf8")), registry);

  const packageBytes = await readRegularProjectFile(projectRoot, "package.json", "package manifest");
  const packageManifest = JSON.parse(packageBytes.toString("utf8"));
  const producerCheck = "npm run verify:agent-guidance && npm run verify:onboarding-guidance && npm run verify:links && npm run check && npm run validate:self";
  const installedHostChain = "npm run nkf:check:pinned && npm run nkf:check:host";
  const hostSupersetInstalled = packageManifest.scripts?.["nkf:check"] === installedHostChain;
  const expectedScripts = {
    build: "node scripts/build.mjs && node scripts/build-adopter.mjs && node scripts/build-public-docs.mjs",
    check: "npm run typecheck && npm run build && npm run test && npm run verify:build && npm run verify:adopter && npm run verify:public-docs",
    "nkf:check": hostSupersetInstalled ? installedHostChain : producerCheck,
    test: "vitest run",
    typecheck: "tsc --noEmit",
    "validate:self": "node dist/nourd-nkf-checker.mjs --project . --level full-bundle",
    "verify:agent-guidance": "node scripts/verify-agent-guidance.mjs --project .",
    "verify:adopter": "node scripts/verify-adopter.mjs",
    "verify:build": "node scripts/verify-build.mjs",
    "verify:links": "node scripts/verify-links.mjs --project .",
    "verify:onboarding-guidance": "node scripts/verify-onboarding-guidance.mjs --project .",
    "verify:public-docs": "node scripts/verify-public-docs.mjs",
    "verify:recommended-release": "node scripts/verify-recommended-release.mjs",
  };
  if (hostSupersetInstalled) {
    expectedScripts["nkf:check:pinned"] =
      "node .nourd/tools/nkf/nourd-nkf-adopt.mjs check --project .";
    expectedScripts["nkf:check:host"] = producerCheck;
    if (
      packageManifest?.nkf?.integration?.mode !== "host-superset" ||
      packageManifest.nkf.integration.host_script !== producerCheck
    ) {
      fail("package.json host-superset declaration does not preserve the accepted producer check.");
    }
  }
  for (const [name, command] of Object.entries(expectedScripts)) {
    if (packageManifest.scripts?.[name] !== command) {
      fail(`package.json script ${name} does not match the accepted command.`);
    }
  }
  const prohibitedLifecycleScripts = [
    "install",
    "postinstall",
    "postprepare",
    "preinstall",
    "prepare",
    "preprepare",
    "prepublish",
    ...Object.keys(expectedScripts).flatMap((name) => [`pre${name}`, `post${name}`]),
  ];
  for (const name of prohibitedLifecycleScripts) {
    if (name in (packageManifest.scripts ?? {})) {
      fail(`package.json lifecycle script ${name} may not wrap the accepted validation path.`);
    }
  }

  return {
    adapters: adapters.length,
    contract: "nkf.agent-guidance-verification",
    skill_representations: skillPaths.length,
    surfaces: surfaces.length,
    status: "passed",
  };
}

function parseArguments(argv) {
  let project = process.cwd();
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--project" && argv[index + 1] !== undefined) {
      project = argv[index + 1];
      index += 1;
    } else {
      fail(`Unknown or incomplete argument: ${argv[index] ?? ""}.`);
    }
  }
  return { project };
}

if (process.argv[1] !== undefined && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  try {
    const result = await verifyAgentGuidance(parseArguments(process.argv.slice(2)).project);
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`verify-agent-guidance: ${message}\n`);
    process.exitCode = 1;
  }
}
