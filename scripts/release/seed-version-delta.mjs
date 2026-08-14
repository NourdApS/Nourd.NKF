// Deterministic version-delta seed: diffs two executable-companion rule
// registries and emits a complete nkf.version-delta skeleton. The seed
// classifies a rule `identical` only when its registry entry is byte-equal in
// both versions, and `semantically-new` when it exists in exactly one
// registry. The named reviewer then judges every non-identical classification;
// the seed supplies no semantic judgment beyond registry-entry equality, and
// the reviewer may lower any seeded `identical` to `semantically-new` but
// never invents `identical`.
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const usage = "Usage: node scripts/release/seed-version-delta.mjs <predecessor-nkf.yaml> <current-nkf.yaml> <output-version-delta.yaml>";
const [predecessorPath, currentPath, outputPath] = process.argv.slice(2);
if (!predecessorPath || !currentPath || !outputPath) {
  console.error(usage);
  process.exit(1);
}

function loadRegistry(file) {
  const bytes = readFileSync(file);
  const doc = YAML.parse(bytes.toString("utf8"), { schema: "core", strict: true, uniqueKeys: true });
  const rules = doc?.enforcement?.rules ?? doc?.rules;
  const registry = rules ?? doc?.diagnostics?.rules;
  if (registry === undefined || registry === null || typeof registry !== "object") {
    throw new Error(`No rule registry found in ${file}`);
  }
  const entries = new Map();
  for (const [id, value] of Object.entries(registry)) {
    entries.set(id, JSON.stringify(value));
  }
  return { entries, digest: createHash("sha256").update(bytes).digest("hex"), doc };
}

const predecessor = loadRegistry(predecessorPath);
const current = loadRegistry(currentPath);
const currentVersion = current.doc.nkf_version;
const predecessorVersion = predecessor.doc.nkf_version;

const ids = [...new Set([...predecessor.entries.keys(), ...current.entries.keys()])].sort();
const rules = {};
let identical = 0, added = 0, removed = 0, changed = 0;
for (const id of ids) {
  const before = predecessor.entries.get(id);
  const after = current.entries.get(id);
  if (before !== undefined && after !== undefined) {
    if (before === after) { rules[id] = { classification: "identical" }; identical += 1; }
    else { rules[id] = { classification: "semantically-new" }; changed += 1; }
  } else if (after !== undefined) {
    rules[id] = { classification: "semantically-new" }; added += 1;
  } else {
    rules[id] = { classification: "semantically-new" }; removed += 1;
  }
}

const declaration = {
  contract: "nkf.version-delta",
  nkf_version: currentVersion,
  predecessor_version: predecessorVersion,
  predecessor_executable_digest: { algorithm: "sha-256", value: predecessor.digest },
  rules,
};
writeFileSync(path.resolve(outputPath), YAML.stringify(declaration, { lineWidth: 0, aliasDuplicateObjects: false }));
console.log(JSON.stringify({ state: "seeded", total: ids.length, identical, registry_changed: changed, added, removed }));
