import { rm } from "node:fs/promises";
import { build } from "esbuild";

await rm(new URL("../dist/", import.meta.url), {
  force: true,
  recursive: true,
});

await build({
  banner: {
    js: "#!/usr/bin/env node\nimport { createRequire as __nkfCreateRequire } from \"node:module\";\nconst require = __nkfCreateRequire(import.meta.url);",
  },
  bundle: true,
  entryPoints: [new URL("../src/cli.ts", import.meta.url).pathname],
  format: "esm",
  legalComments: "none",
  minify: false,
  outfile: new URL(
    "../dist/nourd-nkf-checker.mjs",
    import.meta.url,
  ).pathname,
  packages: "bundle",
  platform: "node",
  sourcemap: false,
  target: "node22",
});
