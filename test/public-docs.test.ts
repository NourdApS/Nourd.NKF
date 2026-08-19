import { existsSync } from "node:fs";
import { cp, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { repositoryRoot } from "./helpers.js";

// @ts-expect-error Repository public-documentation tooling is directly executable ESM.
import { verifyPublicDocs } from "../scripts/verify-public-docs.mjs";
// @ts-expect-error Repository release tooling is directly executable ESM.
import { regenerateReleaseMembers } from "../scripts/release/release-set.mjs";

// The complete 0.8 source surface the release-set coverage enumerates. A
// staged copy carries all of it so the copy's release set can be regenerated
// and the projection verified against its own exact enumeration.
const PROJECTION_SOURCES = [
  "LICENSE",
  "NOTICE",
  "THIRD_PARTY_NOTICES.md",
  "contracts/nkf/0.8",
  "dist/nourd-nkf-adopt.mjs",
  "dist/nourd-nkf-checker.mjs",
  "distribution/nkf/0.8",
  "fixtures/valid/minimal-0-8",
  "fixtures/valid/technology-0-8",
  "knowledge/specifications/nkf-0.8.md",
  "public-docs",
];

async function copyProjection() {
  const root = await mkdtemp(path.join(os.tmpdir(), "nkf-public-docs-test-"));
  for (const relative of PROJECTION_SOURCES) {
    await cp(
      path.join(repositoryRoot, relative),
      path.join(root, relative),
      { recursive: true },
    );
  }
  await regenerateReleaseMembers(root);
  return root;
}

describe("NKF public documentation", () => {
  it("teaches exactly NKF 0.8", async () => {
    const docsRoot = path.join(repositoryRoot, "public-docs");
    const references = await readdir(path.join(docsRoot, "reference"));
    expect(references).toEqual(["nkf-0.8.md"]);
    const readme = await readFile(path.join(docsRoot, "README.md"), "utf8");
    expect(readme).toContain("NKF 0.8 is pre-stable");
    expect(readme).toContain("reference/nkf-0.8.md");
    expect(readme).not.toMatch(/reference\/nkf-0\.[2-7]\.md/);
    for (const kind of ["product", "technology"]) {
      const bundle = await readFile(
        path.join(docsRoot, "examples", kind, "project/.nourd/knowledge/bundle.yaml"),
        "utf8",
      );
      expect(bundle).toContain('nkf_version: "0.8"');
      expect(
        existsSync(path.join(docsRoot, "examples", kind, "project/knowledge/tasks/items/task.md")),
      ).toBe(true);
      expect(
        existsSync(path.join(docsRoot, "examples", kind, "project/knowledge/tasks/active")),
      ).toBe(false);
      expect(
        existsSync(path.join(docsRoot, "examples", kind, "project/knowledge/realizations/current")),
      ).toBe(false);
    }
  });

  it("verifies the complete projection against its regenerated release-set enumeration", async () => {
    const root = await copyProjection();
    const result = await verifyPublicDocs(root);
    expect(result).toMatchObject({
      contract: "nkf.public-documentation-verification",
      status: "passed",
      files: 62,
      examples: 2,
    });
    expect(result.mermaid_diagrams).toBeGreaterThanOrEqual(5);
  });

  it("verifies the allowlisted complete public projection in the repository", async () => {
    const result = await verifyPublicDocs(repositoryRoot);
    expect(result).toMatchObject({
      contract: "nkf.public-documentation-verification",
      status: "passed",
      files: 62,
      examples: 2,
    });
    expect(result.mermaid_diagrams).toBeGreaterThanOrEqual(5);
  });

  it("rejects mirror drift, unexpected files, and private local paths", async () => {
    const mirrorDrift = await copyProjection();
    await writeFile(
      path.join(mirrorDrift, "public-docs/reference/nkf-0.8.md"),
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
