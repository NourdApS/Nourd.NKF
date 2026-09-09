import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { VERSION_BINDINGS } from "../src/checker/bindings.js";

const CORE_BINDINGS = VERSION_BINDINGS["0.81"];
import { parseMarkdown } from "../src/checker/markdown.js";
import {
  protectedCanonicalRanges,
  toUnicode17TitleCase,
} from "../src/checker/titlecase.js";
import { sha256 } from "../src/checker/util.js";
import { parseNativeYaml } from "../src/checker/yaml.js";
import { repositoryRoot } from "./helpers.js";

const specificationPath = path.join(repositoryRoot, CORE_BINDINGS.specification.path);
const executablePath = path.join(repositoryRoot, CORE_BINDINGS.executable.path);
const schemaRoot = path.join(repositoryRoot, "contracts/nkf/0.81/schemas");
const acceptedBindings = VERSION_BINDINGS["0.8"];
const acceptedSchemaRoot = path.join(repositoryRoot, "contracts/nkf/0.8/schemas");

function markdownRules(source: string): Map<string, "error" | "warning"> {
  const rules = new Map<string, "error" | "warning">();
  for (const line of source.split("\n")) {
    const match = line.match(/^\| `([^`]+)` \| (error|warning)(?: \||$)/);
    if (match?.[1] !== undefined && match[2] !== undefined) {
      rules.set(match[1], match[2] as "error" | "warning");
    }
  }
  return rules;
}

describe("canonical NKF authority realization", () => {
  it("keeps the accepted 0.8 predecessor authority pair bound to ADR 0134", async () => {
    const [specification, executable, acceptanceDecision] =
      await Promise.all([
        readFile(path.join(repositoryRoot, acceptedBindings.specification.path)),
        readFile(path.join(repositoryRoot, acceptedBindings.executable.path)),
        readFile(
          path.join(
            repositoryRoot,
            "knowledge/decisions/0134-accept-the-nkf-0-8-authority-set.md",
          ),
          "utf8",
        ),
      ]);
    expect(sha256(specification)).toBe(acceptedBindings.specification.sha256);
    expect(sha256(executable)).toBe(acceptedBindings.executable.sha256);
    expect(acceptanceDecision).toContain(acceptedBindings.specification.sha256);
    expect(acceptanceDecision).toContain(acceptedBindings.executable.sha256);
  });

  it("keeps the accepted 0.8 predecessor schemas bound to their confirmed digests", async () => {
    for (const schema of acceptedBindings.schemas) {
      const canonical = await readFile(path.join(acceptedSchemaRoot, schema.file));
      expect(sha256(canonical)).toBe(schema.sha256);
    }
  });

  it("keeps the current 0.81 authority pair bound to ADR 0143", async () => {
    const [specification, executable, acceptanceDecision] = await Promise.all([
      readFile(specificationPath),
      readFile(executablePath),
      readFile(
        path.join(
          repositoryRoot,
          "knowledge/decisions/0143-bind-the-predecessor-repair-promotion.md",
        ),
        "utf8",
      ),
    ]);
    expect(sha256(specification)).toBe(CORE_BINDINGS.specification.sha256);
    expect(sha256(executable)).toBe(CORE_BINDINGS.executable.sha256);
    expect(acceptanceDecision).toContain(CORE_BINDINGS.specification.sha256);
    expect(acceptanceDecision).toContain(CORE_BINDINGS.executable.sha256);
  });

  it("keeps all derived schemas bound to their confirmed exact digests", async () => {
    for (const schema of CORE_BINDINGS.schemas) {
      const canonical = await readFile(path.join(schemaRoot, schema.file));
      expect(sha256(canonical)).toBe(schema.sha256);
    }
  });

  it("keeps strict executable parsing, Markdown binding, and 217-rule severity parity", async () => {
    const [specificationBytes, executableBytes] = await Promise.all([
      readFile(specificationPath),
      readFile(executablePath),
    ]);
    const parsed = parseNativeYaml(executableBytes, CORE_BINDINGS.executable.path);
    expect(parsed.diagnostics).toEqual([]);
    expect(parsed.value).not.toBeNull();
    expect(parsed.value?.authority.markdown_digest.value).toBe(
      CORE_BINDINGS.specification.sha256,
    );

    const executableRules = new Map(
      Object.entries(
        parsed.value?.diagnostics.rules as Record<
          string,
          { severity: "error" | "warning" }
        >,
      ).map(([id, rule]) => [id, rule.severity]),
    );
    const specificationRules = markdownRules(specificationBytes.toString("utf8"));
    expect(executableRules.size).toBe(217);
    expect(specificationRules).toEqual(executableRules);
  });

  it("keeps every participating canonical heading in Unicode 17 Title Case", async () => {
    const specification = await readFile(specificationPath, "utf8");
    const headings = parseMarkdown(specification).headings;
    expect(headings).toHaveLength(70);
    for (const heading of headings) {
      const ranges = protectedCanonicalRanges(
        heading.text,
        ["NKF"],
        heading.protectedRanges,
      );
      expect(toUnicode17TitleCase(heading.text, ranges)).toBe(heading.text);
    }
  });

  it("keeps every schema bound to the current exact authority pair", async () => {
    for (const schema of CORE_BINDINGS.schemas) {
      const value = JSON.parse(
        await readFile(path.join(schemaRoot, schema.file), "utf8"),
      );
      expect(value.$id).toBe(schema.identity);
      expect(value["x-nkf-source"]).toMatchObject({
        nkf_version: "0.81",
        markdown_digest: {
          algorithm: "sha-256",
          value: CORE_BINDINGS.specification.sha256,
        },
        executable_digest: {
          algorithm: "sha-256",
          value: CORE_BINDINGS.executable.sha256,
        },
      });
    }
  });
});
