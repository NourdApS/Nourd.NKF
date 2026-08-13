import { cp, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error Repository public-documentation tooling is directly executable ESM.
const publicDocs = await import("../scripts/verify-public-docs.mjs");
const { verifyPublicDocs } = publicDocs;
import { repositoryRoot } from "./helpers.js";

async function copyProjection() {
  const root = await mkdtemp(path.join(os.tmpdir(), "nkf-public-docs-test-"));
  await cp(
    path.join(repositoryRoot, "public-docs"),
    path.join(root, "public-docs"),
    { recursive: true },
  );
  await cp(
    path.join(repositoryRoot, "knowledge/specifications/nkf-0.2.md"),
    path.join(root, "knowledge/specifications/nkf-0.2.md"),
    { recursive: true },
  );
  await cp(
    path.join(repositoryRoot, "knowledge/specifications/nkf-0.3.md"),
    path.join(root, "knowledge/specifications/nkf-0.3.md"),
    { recursive: true },
  );
  await cp(
    path.join(repositoryRoot, "knowledge/specifications/nkf-0.4.md"),
    path.join(root, "knowledge/specifications/nkf-0.4.md"),
    { recursive: true },
  );
  await cp(
    path.join(repositoryRoot, "knowledge/specifications/nkf-0.5-revision-2.md"),
    path.join(root, "knowledge/specifications/nkf-0.5-revision-2.md"),
    { recursive: true },
  );
  await cp(
    path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs"),
    path.join(root, "dist/nourd-nkf-adopt.mjs"),
    { recursive: true },
  );
  await cp(
    path.join(repositoryRoot, "dist/nourd-nkf-checker.mjs"),
    path.join(root, "dist/nourd-nkf-checker.mjs"),
    { recursive: true },
  );
  await cp(
    path.join(repositoryRoot, "contracts/nkf/0.5"),
    path.join(root, "contracts/nkf/0.5"),
    { recursive: true },
  );
  await cp(
    path.join(repositoryRoot, "distribution/nkf/0.5"),
    path.join(root, "distribution/nkf/0.5"),
    { recursive: true },
  );
  return root;
}

describe("NKF public documentation", () => {
  it("verifies the allowlisted complete public projection", async () => {
    const result = await verifyPublicDocs(repositoryRoot);
    expect(result).toMatchObject({
      contract: "nkf.public-documentation-verification",
      status: "passed",
      files: 85,
      examples: 2,
    });
    expect(result.mermaid_diagrams).toBeGreaterThanOrEqual(5);
  });

  it("rejects mirror drift, unexpected files, and private local paths", async () => {
    const mirrorDrift = await copyProjection();
    await writeFile(
      path.join(mirrorDrift, "public-docs/reference/nkf-0.4.md"),
      "# Changed\n",
    );
    await expect(verifyPublicDocs(mirrorDrift)).rejects.toThrow(
      /mirror differs/,
    );

    const unexpected = await copyProjection();
    await writeFile(path.join(unexpected, "public-docs/private.md"), "# Private\n");
    await expect(verifyPublicDocs(unexpected)).rejects.toThrow(/allowlist/);

    const localPath = await copyProjection();
    await writeFile(
      path.join(localPath, "public-docs/guides/update-and-recover.md"),
      "# Update And Recover\n\n/Users/example/private\n",
    );
    await expect(verifyPublicDocs(localPath)).rejects.toThrow(
      /forbidden material/,
    );

    const nonMarkdownSecret = await copyProjection();
    await writeFile(
      path.join(
        nonMarkdownSecret,
        "public-docs/examples/technology/project/src/example.ts",
      ),
      'export const token = "github_pat_not-public";\n',
    );
    await expect(verifyPublicDocs(nonMarkdownSecret)).rejects.toThrow(
      /forbidden material/,
    );
  });
});
