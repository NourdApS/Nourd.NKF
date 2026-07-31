import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

export const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

export async function buildAdopter(outputPath) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await build({
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
    },
    banner: {
      js: "#!/usr/bin/env node\nimport { createRequire as __createRequire } from \"node:module\";\nconst require = __createRequire(import.meta.url);",
    },
  });
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  await buildAdopter(
    path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs"),
  );
}
