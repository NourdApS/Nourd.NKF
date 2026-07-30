import { describe, expect, it } from "vitest";
import { parseNativeYaml } from "../src/checker/yaml.js";

function rules(source: string): string[] {
  return parseNativeYaml(Buffer.from(source, "utf8"), "candidate.yaml").diagnostics.map(
    (diagnostic) => diagnostic.rule_id,
  );
}

describe("native YAML parse boundary", () => {
  it("accepts one JSON-compatible mapping document", () => {
    expect(parseNativeYaml(Buffer.from("key: value\n", "utf8"), "candidate.yaml")).toMatchObject({
      value: { key: "value" },
      diagnostics: [],
    });
  });

  it("rejects duplicate keys, aliases, anchors, merge keys, and multiple documents", () => {
    expect(rules("key: one\nkey: two\n")).toContain("yaml.key.duplicate");
    expect(rules("base: &base { key: value }\ncopy: *base\n")).toEqual(
      expect.arrayContaining(["yaml.anchor.unsupported", "yaml.alias.unsupported"]),
    );
    expect(rules("base: &base { key: value }\ncopy:\n  <<: *base\n")).toEqual(
      expect.arrayContaining(["yaml.merge-key.unsupported", "yaml.anchor.unsupported", "yaml.alias.unsupported"]),
    );
    expect(rules("---\na: b\n---\nc: d\n")).toContain("yaml.document-count.invalid");
  });

  it("rejects invalid UTF-8 without copying its bytes", () => {
    const result = parseNativeYaml(Uint8Array.from([0xc3, 0x28]), "candidate.yaml");
    expect(result.value).toBeNull();
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0]?.rule_id).toBe("yaml.utf8.invalid");
  });

  it("rejects non-mapping roots and non-string mapping keys", () => {
    expect(rules("- one\n- two\n")).toContain("yaml.root.invalid");
    expect(rules("1: value\n")).toContain("yaml.key.non-string");
  });

  it("rejects custom tags and standard tagged values outside the JSON data model", () => {
    expect(rules("value: !custom text\n")).toContain("yaml.tag.unsupported");
    expect(rules("value: !!timestamp 2026-07-30\n")).toContain(
      "yaml.value.non-json",
    );
  });

  it("reports otherwise invalid YAML through the stable parse rule", () => {
    expect(rules("key: [\n")).toContain("yaml.parse.invalid");
  });
});
