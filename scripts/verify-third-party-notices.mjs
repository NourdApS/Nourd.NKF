import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { adopterBuildOptions } from "./build-adopter.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function packageName(input) {
  const normalized = input.replaceAll("\\", "/");
  const marker = "/node_modules/";
  const start = normalized.includes(marker)
    ? normalized.indexOf(marker) + marker.length
    : normalized.startsWith("node_modules/")
      ? "node_modules/".length
      : -1;
  if (start === -1) return null;
  const parts = normalized.slice(start).split("/");
  return parts[0]?.startsWith("@") ? `${parts[0]}/${parts[1]}` : parts[0] ?? null;
}

function packages(metafile) {
  return [...new Set(Object.keys(metafile.inputs).map(packageName).filter(Boolean))]
    .sort((left, right) => left.localeCompare(right, "en"));
}

async function packageVersions(names) {
  return Object.fromEntries(await Promise.all(names.map(async (name) => {
    const manifest = JSON.parse(await readFile(path.join(repositoryRoot, "node_modules", ...name.split("/"), "package.json"), "utf8"));
    return [name, manifest.version];
  })));
}

const checker = await build({
  banner: {
    js: "#!/usr/bin/env node\nimport { createRequire as __nkfCreateRequire } from \"node:module\";\nconst require = __nkfCreateRequire(import.meta.url);",
  },
  bundle: true,
  entryPoints: [path.join(repositoryRoot, "src/cli.ts")],
  format: "esm",
  legalComments: "none",
  minify: false,
  outfile: path.join(repositoryRoot, "dist/.notice-checker.mjs"),
  packages: "bundle",
  platform: "node",
  sourcemap: false,
  target: "node22",
  write: false,
  metafile: true,
});
const adopter = await build({
  ...adopterBuildOptions(path.join(repositoryRoot, "dist/.notice-adopter.mjs")),
  write: false,
  metafile: true,
});

const checkerPackages = packages(checker.metafile);
const adopterPackages = packages(adopter.metafile);
const union = [...new Set([...checkerPackages, ...adopterPackages])]
  .sort((left, right) => left.localeCompare(right, "en"));
if (checkerPackages.length !== 10 || adopterPackages.length !== 9) {
  throw new Error(`Unexpected bundled dependency graph sizes: checker=${checkerPackages.length}, adopter=${adopterPackages.length}.`);
}

const notice = await readFile(path.join(repositoryRoot, "THIRD_PARTY_NOTICES.md"), "utf8");
const declared = [...notice.matchAll(/^## `([^`]+)` ([^\n]+)$/gmu)].map((match) => ({
  name: match[1],
  version: match[2],
}));
const declaredNames = declared.map((entry) => entry.name).sort((left, right) => left.localeCompare(right, "en"));
if (JSON.stringify(declaredNames) !== JSON.stringify(union)) {
  throw new Error(`Third-party notice package coverage differs from the exact bundle graph: expected ${union.join(", ")}; observed ${declaredNames.join(", ")}.`);
}
const versions = await packageVersions(union);
for (const entry of declared) {
  if (versions[entry.name] !== entry.version) {
    throw new Error(`Third-party notice version mismatch for ${entry.name}: expected ${versions[entry.name]}, observed ${entry.version}.`);
  }
}

process.stdout.write(`${JSON.stringify({
  state: "verified",
  checker_packages: checkerPackages,
  adopter_packages: adopterPackages,
  noticed_packages: declaredNames,
})}\n`);
