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
    path.join(repositoryRoot, "knowledge/specifications/nkf-0.1.md"),
    path.join(root, "knowledge/specifications/nkf-0.1.md"),
    { recursive: true },
  );
  await cp(
    path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs"),
    path.join(root, "dist/nourd-nkf-adopt.mjs"),
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
      files: 9,
    });
    expect(result.mermaid_diagrams).toBeGreaterThanOrEqual(5);
  });

  it("rejects mirror drift, unexpected files, and private local paths", async () => {
    const mirrorDrift = await copyProjection();
    await writeFile(
      path.join(mirrorDrift, "public-docs/reference/nkf-0.1.md"),
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
  });
});
