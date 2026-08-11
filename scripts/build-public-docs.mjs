import { cp, copyFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

export async function buildPublicDocs(root = repositoryRoot) {
  const docsRoot = path.join(root, "public-docs");
  await mkdir(path.join(docsRoot, "reference"), { recursive: true });
  await mkdir(path.join(docsRoot, "tools"), { recursive: true });
  await mkdir(path.join(docsRoot, ".agents/skills/nkf-onboarding"), { recursive: true });
  await mkdir(path.join(docsRoot, ".claude/skills/nkf-onboarding"), { recursive: true });
  await copyFile(
    path.join(root, "knowledge/specifications/nkf-0.2.md"),
    path.join(docsRoot, "reference/nkf-0.2.md"),
  );
  await copyFile(
    path.join(root, "knowledge/specifications/nkf-0.3.md"),
    path.join(docsRoot, "reference/nkf-0.3.md"),
  );
  await copyFile(
    path.join(root, "dist/nourd-nkf-adopt.mjs"),
    path.join(docsRoot, "tools/nourd-nkf-adopt.mjs"),
  );
  await copyFile(
    path.join(root, "distribution/nkf/0.3/integrations/onboarding/nkf-onboarding-protocol.md"),
    path.join(docsRoot, "tools/nkf-onboarding-protocol.md"),
  );
  for (const directory of [".agents", ".claude"]) {
    await copyFile(
      path.join(root, `distribution/nkf/0.3/${directory}/skills/nkf-onboarding/SKILL.md`),
      path.join(docsRoot, `${directory}/skills/nkf-onboarding/SKILL.md`),
    );
  }
  for (const kind of ["product", "technology"]) {
    const fixture = kind === "product" ? "minimal-0-3" : "technology-0-3";
    const target = path.join(docsRoot, "examples", kind, "project");
    await rm(target, { recursive: true, force: true });
    await cp(path.join(root, "fixtures", "valid", fixture), target, {
      recursive: true,
    });
  }
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  await buildPublicDocs();
}
