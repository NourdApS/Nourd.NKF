import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  lstat,
  readFile,
  readdir,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { repositoryRoot } from "./build-public-docs.mjs";

export const PUBLIC_FILES = Object.freeze([
  ".agents/skills/nkf-onboarding/SKILL.md",
  ".claude/skills/nkf-onboarding/SKILL.md",
  "README.md",
  "concepts/authority-and-lifecycle.md",
  "concepts/topology.md",
  "examples/product/README.md",
  "examples/product/project/.nourd/knowledge/bundle.yaml",
  "examples/product/project/.nourd/knowledge/records/product.yaml",
  "examples/product/project/knowledge/README.md",
  "examples/product/project/knowledge/product.md",
  "examples/product/project/knowledge/task.md",
  "examples/technology/README.md",
  "examples/technology/project/.nourd/knowledge/bundle.yaml",
  "examples/technology/project/.nourd/knowledge/records/realization.yaml",
  "examples/technology/project/.nourd/knowledge/records/specification.yaml",
  "examples/technology/project/.nourd/knowledge/records/technology.yaml",
  "examples/technology/project/knowledge/realization.md",
  "examples/technology/project/knowledge/specification.md",
  "examples/technology/project/knowledge/task.md",
  "examples/technology/project/knowledge/technology.md",
  "examples/technology/project/src/example.ts",
  "guides/adopt-and-validate.md",
  "guides/initial-onboarding.md",
  "guides/update-and-recover.md",
  "reference/nkf-0.1.md",
  "tools/nourd-nkf-adopt.mjs",
  "tools/nkf-onboarding-protocol.md",
]);

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function listFiles(root) {
  const files = [];
  const visit = async (directory, prefix = "") => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const relative = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
      const absolute = path.join(directory, entry.name);
      const stat = await lstat(absolute);
      if (stat.isSymbolicLink()) {
        throw new Error(`Public documentation contains a symbolic link: ${relative}`);
      }
      if (stat.isDirectory()) await visit(absolute, relative);
      else if (stat.isFile()) files.push(relative);
      else throw new Error(`Unsupported public documentation entry: ${relative}`);
    }
  };
  await visit(root);
  return files.sort();
}

function requireSubjects(combined) {
  const subjects = [
    "what nkf is",
    "why nkf exists",
    "nkf topology",
    "task",
    "design",
    "decision",
    "specification",
    "realization",
    "validation",
    "acceptance",
    "design adopted",
    "confirmed realization",
    "conformant",
    "nkf verified",
    "governing use ready",
    "product example",
    "technology example",
    "ai",
    "continuous integration",
    "update",
    "recover",
    "pre-stable",
    "internal",
    "initial onboarding",
    "brownfield",
    "rollback",
  ];
  const lower = combined.toLowerCase();
  for (const subject of subjects) {
    if (!lower.includes(subject)) {
      throw new Error(`Public documentation omits required subject: ${subject}`);
    }
  }
  if ((combined.match(/```mermaid/g) ?? []).length < 5) {
    throw new Error("Public documentation must contain at least five Mermaid diagrams.");
  }
}

function verifyRelativeLinks(files, publishedPaths) {
  const fileSet = new Set(publishedPaths);
  for (const [relative, text] of files) {
    if (relative === "reference/nkf-0.1.md") {
      continue;
    }
    for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (
        target.startsWith("http://") ||
        target.startsWith("https://") ||
        target.startsWith("#")
      ) {
        continue;
      }
      const normalized = path.posix.normalize(
        path.posix.join(path.posix.dirname(relative), target.split("#")[0]),
      );
      if (!fileSet.has(normalized)) {
        throw new Error(`Broken public documentation link from ${relative}: ${target}`);
      }
    }
  }
}

function verifyExamples(root) {
  const checker = path.join(root, "dist/nourd-nkf-checker.mjs");
  for (const kind of ["product", "technology"]) {
    const project = path.join(root, "public-docs", "examples", kind, "project");
    const result = spawnSync(
      process.execPath,
      [
        checker,
        "--project",
        project,
        "--level",
        "full-bundle",
        "--runner",
        "nkf-public-documentation",
        "--no-persist",
      ],
      { encoding: "utf8" },
    );
    if (result.status !== 0) {
      throw new Error(
        `The complete public ${kind} example does not conform.\n${result.stdout}\n${result.stderr}`,
      );
    }
    const report = JSON.parse(result.stdout);
    if (report.conformance !== "passed") {
      throw new Error(`The complete public ${kind} example did not pass.`);
    }
  }
}

export async function verifyPublicDocs(root = repositoryRoot) {
  const docsRoot = path.join(root, "public-docs");
  const actual = await listFiles(docsRoot);
  if (JSON.stringify(actual) !== JSON.stringify([...PUBLIC_FILES].sort())) {
    throw new Error(
      `Public documentation files differ from the allowlist: ${actual.join(", ")}`,
    );
  }
  const specification = await readFile(
    path.join(root, "knowledge/specifications/nkf-0.1.md"),
  );
  const mirror = await readFile(path.join(docsRoot, "reference/nkf-0.1.md"));
  if (!mirror.equals(specification)) {
    throw new Error("The public normative Markdown mirror differs from authority.");
  }
  const adopter = await readFile(path.join(root, "dist/nourd-nkf-adopt.mjs"));
  const publicAdopter = await readFile(
    path.join(docsRoot, "tools/nourd-nkf-adopt.mjs"),
  );
  if (!publicAdopter.equals(adopter)) {
    throw new Error("The public adopter differs from the deterministic build.");
  }
  const onboardingProtocol = await readFile(
    path.join(root, "integrations/onboarding/nkf-onboarding-protocol.md"),
  );
  const publicOnboardingProtocol = await readFile(
    path.join(docsRoot, "tools/nkf-onboarding-protocol.md"),
  );
  if (!publicOnboardingProtocol.equals(onboardingProtocol)) {
    throw new Error("The public onboarding protocol differs from its governed source.");
  }
  const onboardingSkill = await readFile(
    path.join(root, ".agents/skills/nkf-onboarding/SKILL.md"),
  );
  for (const directory of [".agents", ".claude"]) {
    const publishedSkill = await readFile(
      path.join(docsRoot, directory, "skills/nkf-onboarding/SKILL.md"),
    );
    if (!publishedSkill.equals(onboardingSkill)) {
      throw new Error(`The public ${directory} onboarding skill differs.`);
    }
  }
  const markdown = new Map();
  for (const relative of actual.filter((entry) => entry.endsWith(".md"))) {
    markdown.set(
      relative,
      await readFile(path.join(docsRoot, ...relative.split("/")), "utf8"),
    );
  }
  const combined = [...markdown.values()].join("\n");
  const explanatoryCombined = [...markdown]
    .filter(([relative]) => relative !== "reference/nkf-0.1.md")
    .map(([, text]) => text)
    .join("\n");
  requireSubjects(explanatoryCombined);
  verifyRelativeLinks(markdown, actual);
  const publicSafeCombined = (
    await Promise.all(
      actual
        .filter((relative) => relative !== "reference/nkf-0.1.md")
        .map((relative) =>
          readFile(path.join(docsRoot, ...relative.split("/")), "utf8"),
        ),
    )
  ).join("\n");
  for (const forbidden of [
    "/Users/",
    "/home/",
    "file://",
    "knowledge/evidence/",
    "knowledge/tasks/",
    "ghp_",
    "github_pat_",
  ]) {
    if (publicSafeCombined.includes(forbidden)) {
      throw new Error(`Public documentation contains forbidden material: ${forbidden}`);
    }
  }
  verifyExamples(root);
  return {
    contract: "nkf.public-documentation-verification",
    status: "passed",
    files: actual.length,
    examples: 2,
    markdown_sha256: sha256(specification),
    adopter_sha256: sha256(adopter),
    mermaid_diagrams: (combined.match(/```mermaid/g) ?? []).length,
  };
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  const result = await verifyPublicDocs();
  process.stdout.write(`${JSON.stringify(result)}\n`);
}
