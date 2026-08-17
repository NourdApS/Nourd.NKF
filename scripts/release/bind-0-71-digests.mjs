// Binds the exact 0.71 authority digests into the executable companion:
// the accepted Markdown, evaluation-policy, and version-delta digests replace
// their placeholders (or stale values) in contracts/nkf/0.71/nkf.yaml.
// Rerun after any authority edit; regenerating the 0.71 schemas afterwards is
// part of the freeze order. The script binds bytes; it accepts nothing.
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sha256 = async (relative) =>
  createHash("sha256").update(await readFile(path.join(root, relative))).digest("hex");

const markdown = await sha256("knowledge/specifications/nkf-0.71.md");
const policy = await sha256("contracts/nkf/0.71/freshness-policy.yaml");
const delta = await sha256("contracts/nkf/0.71/version-delta.yaml");

const executablePath = path.join(root, "contracts/nkf/0.71/nkf.yaml");
let text = await readFile(executablePath, "utf8");

const bind = (label, value) => {
  // Each digest lives on the value line directly after its labelled key and
  // algorithm line inside the top-level authority block; the anchored match
  // replaces exactly one 64-hex or placeholder token.
  const pattern = new RegExp(
    `(  ${label}:\\n    algorithm: sha-256\\n    value: )([0-9a-f]{64}|PLACEHOLDER[A-Z-]*)`,
    "u",
  );
  if (!pattern.test(text)) throw new Error(`authority digest anchor not found: ${label}`);
  text = text.replace(pattern, `$1${value}`);
};

bind("markdown_digest", markdown);
bind("freshness_policy_digest", policy);
bind("version_delta_digest", delta);

await writeFile(executablePath, text);
console.log(JSON.stringify({ state: "bound", markdown, policy, delta }, null, 2));
