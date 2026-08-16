// Freezes the NKF 0.7 authority digests in dependency order: the exact
// specification digest is bound into the executable companion, the schemas
// are regenerated so their x-nkf-source binds both authority digests, and
// the checker version bindings receive the exact resulting file digests.
// Rerun after any authority byte change; it is idempotent for unchanged
// bytes and performs no semantic act.
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const digest = async (relative) =>
  createHash("sha256").update(await readFile(path.join(root, relative))).digest("hex");

// 1. Bind the exact specification digest inside the executable companion.
const markdownDigest = await digest("knowledge/specifications/nkf-0.7.md");
const yamlPath = path.join(root, "contracts/nkf/0.7/nkf.yaml");
let yaml = await readFile(yamlPath, "utf8");
yaml = yaml.replace(/(markdown_digest:\n    algorithm: sha-256\n    value: )\S+/, `$1${markdownDigest}`);
await writeFile(yamlPath, yaml);

// 2. Regenerate the schemas so x-nkf-source binds both exact digests.
execFileSync(process.execPath, [path.join(root, "scripts/generate-0-7-schemas.mjs")], { stdio: "ignore" });

// 3. Rewrite the 0.7 checker bindings with the exact resulting digests.
const executableDigest = await digest("contracts/nkf/0.7/nkf.yaml");
const policyDigest = await digest("contracts/nkf/0.7/freshness-policy.yaml");
const versionDeltaDigest = await digest("contracts/nkf/0.7/version-delta.yaml");
const schemaIdentities = [
  ["bundle", "bundle.schema.json"],
  ["record", "record.schema.json"],
  ["graph-baseline", "graph-baseline.schema.json"],
  ["freshness-receipt", "freshness-receipt.schema.json"],
  ["freshness-policy", "freshness-policy.schema.json"],
  ["validation-result", "validation-result.schema.json"],
];
const schemaLines = [];
for (const [identity, file] of schemaIdentities) {
  schemaLines.push(`      { identity: "urn:nkf:0.7:schema:${identity}", file: "${file}", sha256: "${await digest(`contracts/nkf/0.7/schemas/${file}`)}" },`);
}
const block = `  "0.7": {
    specification: {
      path: "knowledge/specifications/nkf-0.7.md",
      sha256: "${markdownDigest}",
    },
    executable: {
      path: "contracts/nkf/0.7/nkf.yaml",
      sha256: "${executableDigest}",
    },
    freshnessPolicy: {
      path: "contracts/nkf/0.7/freshness-policy.yaml",
      sha256: "${policyDigest}",
    },
    versionDelta: {
      path: "contracts/nkf/0.7/version-delta.yaml",
      sha256: "${versionDeltaDigest}",
    },
    schemas: [
${schemaLines.join("\n")}
    ],
  },`;
const bindingsPath = path.join(root, "src/checker/bindings.ts");
let bindings = await readFile(bindingsPath, "utf8");
const marker = /  "0\.7": \{[\s\S]*?\n  \},\n/;
if (marker.test(bindings)) bindings = bindings.replace(marker, `${block}\n`);
else bindings = bindings.replace(/\n\} as const satisfies/, `\n${block}\n} as const satisfies`);
await writeFile(bindingsPath, bindings);
console.log(JSON.stringify({ state: "bound", markdown: markdownDigest, executable: executableDigest, policy: policyDigest, version_delta: versionDeltaDigest }));
