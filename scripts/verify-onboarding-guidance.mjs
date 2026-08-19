import { createHash } from "node:crypto";
import { lstat, readFile, realpath } from "node:fs/promises";
import { realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import YAML from "yaml";

const PROTOCOL = "integrations/onboarding/nkf-onboarding-protocol.md";
const SKILLS = [
  ".agents/skills/nkf-onboarding/SKILL.md",
  ".claude/skills/nkf-onboarding/SKILL.md",
];

function fail(message) {
  throw new Error(message);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function inside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function readRegular(root, relative) {
  const segments = relative.split("/");
  let cursor = root;
  for (const segment of segments) {
    cursor = path.join(cursor, segment);
    const stat = await lstat(cursor).catch(() => null);
    if (stat === null || stat.isSymbolicLink()) {
      fail(`Onboarding guidance path is missing or symbolic: ${relative}`);
    }
  }
  const stat = await lstat(cursor);
  if (!stat.isFile() || !inside(root, await realpath(cursor))) {
    fail(`Onboarding guidance path is not a contained regular file: ${relative}`);
  }
  return readFile(cursor);
}

function parseSkill(text) {
  const match = /^---\n([\s\S]*?)\n---\n\n([\s\S]+)$/.exec(text);
  if (match === null) fail("The onboarding skill must contain frontmatter and a body.");
  const frontmatter = YAML.parse(match[1], { uniqueKeys: true });
  if (
    Object.keys(frontmatter).sort().join(",") !== "description,name" ||
    frontmatter.name !== "nkf-onboarding" ||
    typeof frontmatter.description !== "string" ||
    frontmatter.description.trim() !== frontmatter.description
  ) {
    fail("The onboarding skill frontmatter is invalid.");
  }
  if (
    !match[2].includes(PROTOCOL) ||
    !match[2].includes("Category 1") ||
    !match[2].includes("Category 2") ||
    !match[2].includes("NKF-014")
  ) {
    fail("The onboarding skill does not hand off to the complete protocol or deferral boundary.");
  }
}

export async function verifyOnboardingGuidance(projectRootInput) {
  const root = await realpath(path.resolve(projectRootInput));
  const protocolBytes = await readRegular(root, PROTOCOL);
  const skillBytes = await Promise.all(SKILLS.map((relative) => readRegular(root, relative)));
  if (!skillBytes[0].equals(skillBytes[1])) {
    fail("The onboarding skill representations differ.");
  }
  const protocol = protocolBytes.toString("utf8");
  const normalizedProtocol = protocol.replace(/\s+/g, " ");
  for (const required of [
    "complete repository",
    "Category 2",
    "human confirmation",
    "inspect",
    "candidate workspace",
    "complete portable topology",
    "README-2.md",
    "mechanical",
    "seal",
    "Adopt",
    "NKF-014",
    "topology repair",
    "accept",
    "confirm",
    "full-bundle",
  ]) {
    if (!normalizedProtocol.toLocaleLowerCase("en-US").includes(required.toLocaleLowerCase("en-US"))) {
      fail(`The onboarding protocol omits required subject: ${required}`);
    }
  }
  for (const prohibited of [
    "at most twenty Markdown files",
    "256 KiB",
    "64 KiB",
    "eligible inspection",
  ]) {
    if (protocol.toLocaleLowerCase("en-US").includes(prohibited.toLocaleLowerCase("en-US"))) {
      fail(`The onboarding protocol retains deterministic semantic eligibility text: ${prohibited}`);
    }
  }
  for (const vendor of ["Anthropic", "Claude", "Codex", "Copilot", "Gemini", "OpenAI"]) {
    if (protocol.toLocaleLowerCase("en-US").includes(vendor.toLocaleLowerCase("en-US"))) {
      fail(`The onboarding protocol contains vendor-specific term: ${vendor}`);
    }
  }
  parseSkill(skillBytes[0].toString("utf8"));
  return {
    contract: "nkf.onboarding-guidance-verification",
    status: "passed",
    protocol_sha256: sha256(protocolBytes),
    skill_sha256: sha256(skillBytes[0]),
    skill_representations: SKILLS.length,
  };
}

// Resolve both sides to a real path before comparing. On macOS a temporary
// directory is reached through a symlink, so the raw argv path and the module
// URL disagree and the guard silently skips the whole script with exit 0 — a
// no-op that reads as success.
function invokedDirectlyAs(moduleUrl) {
  const entry = process.argv[1];
  if (entry === undefined) return false;
  const real = (value) => { try { return realpathSync(value); } catch { return path.resolve(value); } };
  return real(entry) === real(fileURLToPath(moduleUrl));
}

if (invokedDirectlyAs(import.meta.url)) {
  const projectIndex = process.argv.indexOf("--project");
  const project = projectIndex === -1 ? "." : process.argv[projectIndex + 1];
  try {
    process.stdout.write(`${JSON.stringify(await verifyOnboardingGuidance(project))}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
