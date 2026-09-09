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
import { readReleaseSet } from "./release/release-set.mjs";

const REFERENCE_FILES = [
  "reference/nkf-0.81.md",
];

function publicFilesFromReleaseSet(releaseSet) {
  return releaseSet.members
    .filter((member) => [
      "product-public-example",
      "technology-public-example",
      "public-documentation",
    ].includes(member.class))
    .map((member) => member.path.slice("public-docs/".length));
}

export const PUBLIC_FILES = publicFilesFromReleaseSet(
  await readReleaseSet(repositoryRoot),
);

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
    "support window",
    "stepping-stone",
    "reviewed baseline",
    "delta review",
    "mechanically-concluded",
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
    if (REFERENCE_FILES.includes(relative)) {
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
        "--purpose",
        "whole-root-readiness",
        "--require-readiness",
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
    if (report.conformance !== "passed" || report.readiness?.state !== "ready") {
      throw new Error(`The complete public ${kind} example did not pass with reviewed readiness.`);
    }
    if ((report.diagnostics ?? []).length !== 0) {
      throw new Error(`The complete public ${kind} example did not validate with zero diagnostics.`);
    }
  }
}

export async function verifyPublicDocs(root = repositoryRoot) {
  const docsRoot = path.join(root, "public-docs");
  const allowlist = publicFilesFromReleaseSet(await readReleaseSet(root));
  const actual = await listFiles(docsRoot);
  if (JSON.stringify(actual) !== JSON.stringify([...allowlist].sort())) {
    throw new Error(
      `Public documentation files differ from the allowlist: ${actual.join(", ")}`,
    );
  }
  const specification = await readFile(
    path.join(root, "knowledge/specifications/nkf-0.81.md"),
  );
  const mirror = await readFile(
    path.join(docsRoot, "reference/nkf-0.81.md"),
  );
  if (!mirror.equals(specification)) {
    throw new Error("The public NKF 0.81 Markdown mirror differs from authority.");
  }
  const adopter = await readFile(path.join(root, "dist/nourd-nkf-adopt.mjs"));
  const publicAdopter = await readFile(
    path.join(docsRoot, "tools/nourd-nkf-adopt.mjs"),
  );
  if (!publicAdopter.equals(adopter)) {
    throw new Error("The public adopter differs from the deterministic build.");
  }
  const onboardingProtocol = await readFile(
    path.join(root, "distribution/nkf/0.81/integrations/onboarding/nkf-onboarding-protocol.md"),
  );
  const publicOnboardingProtocol = await readFile(
    path.join(docsRoot, "tools/nkf-onboarding-protocol.md"),
  );
  if (!publicOnboardingProtocol.equals(onboardingProtocol)) {
    throw new Error("The public onboarding protocol differs from its governed source.");
  }
  for (const directory of [".agents", ".claude"]) {
    const onboardingSkill = await readFile(
      path.join(root, `distribution/nkf/0.81/${directory}/skills/nkf-onboarding/SKILL.md`),
    );
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
    .filter(([relative]) => !REFERENCE_FILES.includes(relative))
    .map(([, text]) => text)
    .join("\n");
  requireSubjects(explanatoryCombined);
  verifyRelativeLinks(markdown, actual);
  const publicSafeCombined = (
    await Promise.all(
      actual
        .filter((relative) => !REFERENCE_FILES.includes(relative))
        .map((relative) =>
          readFile(path.join(docsRoot, ...relative.split("/")), "utf8"),
        ),
    )
  ).join("\n");
  for (const forbidden of [
    "/Users/",
    "/home/",
    "file://",
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
