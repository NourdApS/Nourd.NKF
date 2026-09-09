import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

export const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

export function adopterBuildOptions(outputPath) {
  return {
    entryPoints: [
      path.join(repositoryRoot, "scripts/adoption/nourd-nkf-adopt.mjs"),
    ],
    outfile: outputPath,
    bundle: true,
    platform: "node",
    target: "node22",
    format: "esm",
    legalComments: "none",
    charset: "utf8",
    sourcemap: false,
    minify: false,
    loader: {
      ".md": "text",
      ".yaml": "text",
    },
    plugins: [{
      name: "embedded-nkf-contracts",
      setup(context) {
        // Two exact embeddings, both read from the working tree at build:
        // the complete in-window predecessor contract (NKF 0.8) the adopter
        // needs to run the predecessor checker, and the accepted NKF 0.81
        // recommended-release Schema the adopter validates every catalog
        // against before trusting a single field of it.
        context.onResolve(
          { filter: /^nkf:(predecessor-0\.8|recommended-release-schema)$/ },
          (argumentsValue) => ({
            path: argumentsValue.path,
            namespace: "nkf-embedded-contract",
          }),
        );
        context.onLoad(
          { filter: /.*/, namespace: "nkf-embedded-contract" },
          async (argumentsValue) => {
            const paths = argumentsValue.path === "nkf:recommended-release-schema"
              ? ["contracts/nkf/0.81/schemas/recommended-release.schema.json"]
              : [
                  "knowledge/specifications/nkf-0.8.md",
                  "contracts/nkf/0.8/nkf.yaml",
                  "contracts/nkf/0.8/freshness-policy.yaml",
                  "contracts/nkf/0.8/version-delta.yaml",
                  "contracts/nkf/0.8/schemas/bundle.schema.json",
                  "contracts/nkf/0.8/schemas/record.schema.json",
                  "contracts/nkf/0.8/schemas/graph-baseline.schema.json",
                  "contracts/nkf/0.8/schemas/freshness-receipt.schema.json",
                  "contracts/nkf/0.8/schemas/freshness-policy.schema.json",
                  "contracts/nkf/0.8/schemas/validation-result.schema.json",
                  "contracts/nkf/0.8/schemas/release-manifest.schema.json",
                ];
            const entries = Object.fromEntries(
              await Promise.all(paths.map(async (relative) => [
                relative,
                (await readFile(path.join(repositoryRoot, relative))).toString("base64"),
              ])),
            );
            return {
              contents: `export default ${JSON.stringify(entries)};`,
              loader: "js",
            };
          },
        );
      },
    }],
    banner: {
      js: "#!/usr/bin/env node\nimport { createRequire as __createRequire } from \"node:module\";\nconst require = __createRequire(import.meta.url);",
    },
  };
}

export async function buildAdopter(outputPath) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await build(adopterBuildOptions(outputPath));
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  await buildAdopter(
    path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs"),
  );
}
