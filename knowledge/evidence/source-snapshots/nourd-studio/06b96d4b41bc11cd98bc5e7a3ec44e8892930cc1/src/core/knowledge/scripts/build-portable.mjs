import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cpSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { build } from "esbuild";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputRoot = path.join(packageRoot, "dist", "portable");
const contractsSource = path.join(packageRoot, "contracts", "nkf", "0.1");
const contractsTarget = path.join(outputRoot, "contracts", "nkf", "0.1");
const entrypoint = path.join(outputRoot, "nkf-checker.mjs");

function sha256(file) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(outputRoot, { recursive: true });

await build({
  entryPoints: [path.join(packageRoot, "src", "cli.ts")],
  outfile: entrypoint,
  platform: "node",
  target: "node22",
  format: "esm",
  bundle: true,
  sourcemap: false,
  minify: false,
  legalComments: "none",
  banner: {
    js: 'import { createRequire } from "node:module"; const require = createRequire(import.meta.url);',
  },
});

mkdirSync(path.dirname(contractsTarget), { recursive: true });
cpSync(contractsSource, contractsTarget, { recursive: true });

const packageManifest = JSON.parse(
  readFileSync(path.join(packageRoot, "package.json"), "utf8"),
);
const contractSet = JSON.parse(
  readFileSync(path.join(contractsSource, "contract-set.json"), "utf8"),
);
const sourceRevision = execFileSync("git", ["rev-parse", "HEAD"], {
  cwd: packageRoot,
  encoding: "utf8",
}).trim();
const files = {
  "nkf-checker.mjs": sha256(entrypoint),
  "contracts/nkf/0.1/bundle.schema.json": sha256(
    path.join(contractsTarget, "bundle.schema.json"),
  ),
  "contracts/nkf/0.1/record.schema.json": sha256(
    path.join(contractsTarget, "record.schema.json"),
  ),
  "contracts/nkf/0.1/contract-set.json": sha256(
    path.join(contractsTarget, "contract-set.json"),
  ),
};
const artifact = {
  contract: "nourd.nkf.checker-artifact/v1",
  name: packageManifest.name,
  version: packageManifest.version,
  source_repository: "https://github.com/kaveh6202/Nourd.Studio.git",
  source_revision: sourceRevision,
  nkf_version: contractSet.nkf_version,
  specification_digest: contractSet.specification.source_digest,
  specification_authority: contractSet.specification.authority_state,
  entrypoint: "nkf-checker.mjs",
  files,
};
writeFileSync(
  path.join(outputRoot, "artifact.json"),
  `${JSON.stringify(artifact, null, 2)}\n`,
  "utf8",
);

process.stdout.write(
  `Built ${packageManifest.name}@${packageManifest.version} from ${sourceRevision} at ${outputRoot}\n`,
);
