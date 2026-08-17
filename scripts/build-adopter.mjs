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
      name: "embedded-nkf-0.6-contract",
      setup(context) {
        context.onResolve(
          { filter: /^nkf:predecessor-0\.6$/ },
          (argumentsValue) => ({
            path: argumentsValue.path,
            namespace: "nkf-embedded-contract",
          }),
        );
        context.onLoad(
          { filter: /.*/, namespace: "nkf-embedded-contract" },
          async () => {
            const paths = [
              "knowledge/specifications/nkf-0.6-revision-3.md",
              "contracts/nkf/0.6/revision-3/nkf.yaml",
              "contracts/nkf/0.6/freshness-policy.yaml",
              "contracts/nkf/0.6/schemas/bundle.schema.json",
              "contracts/nkf/0.6/schemas/record.schema.json",
              "contracts/nkf/0.6/schemas/graph-baseline.schema.json",
              "contracts/nkf/0.6/schemas/freshness-receipt.schema.json",
              "contracts/nkf/0.6/schemas/freshness-policy.schema.json",
              "contracts/nkf/0.6/schemas/validation-result.schema.json",
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
