import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { VERSION_BINDINGS } from "../src/checker/bindings.js";
import { loadContracts } from "../src/checker/contracts.js";
import { RuleEmitter } from "../src/checker/diagnostics.js";
import { PHASES, type Diagnostic } from "../src/checker/types.js";
import { uniqueDiagnostics } from "../src/checker/util.js";
import { contractRoot, repositoryRoot } from "./helpers.js";

describe("stable native diagnostic implementation", () => {
  it("binds every accepted rule to exact registry metadata", async () => {
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.7"], "0.7");
    const registry = loaded.executable.diagnostics.rules as Record<
      string,
      Pick<Diagnostic, "severity" | "blocking" | "phase">
    >;
    expect(Object.keys(registry)).toHaveLength(213);

    const emitter = new RuleEmitter(loaded.executable);
    for (const id of Object.keys(registry)) {
      emitter.emit(id, "Test message");
    }
    expect(emitter.diagnostics).toHaveLength(213);
    for (const diagnostic of emitter.diagnostics) {
      expect(diagnostic).toMatchObject({
        rule_id: diagnostic.rule_id,
        ...registry[diagnostic.rule_id],
      });
    }
  });

  it("has an implementation reference for every accepted rule identity", async () => {
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.7"], "0.7");
    const registry = Object.keys(
      loaded.executable.diagnostics.rules as Record<string, unknown>,
    );
    const sourceDirectory = path.join(repositoryRoot, "src/checker");
    const source = (
      await Promise.all(
        (await readdir(sourceDirectory))
          .filter((file) => file.endsWith(".ts"))
          .map((file) => readFile(path.join(sourceDirectory, file), "utf8")),
      )
    ).join("\n");
    const missing = registry.filter(
      (id) => !source.includes(`"${id}"`) && !source.includes(`\`${id}\``),
    );
    expect(missing).toEqual([]);
  });

  it("has a fixture assertion reference for every accepted rule identity", async () => {
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.7"], "0.7");
    const registry = Object.keys(
      loaded.executable.diagnostics.rules as Record<string, unknown>,
    );
    const testDirectory = path.join(repositoryRoot, "test");
    const source = (
      await Promise.all(
        (await readdir(testDirectory))
          .filter(
            (file) =>
              file.endsWith(".test.ts") &&
              file !== "authority.test.ts" &&
              file !== "diagnostics.test.ts",
          )
          .map((file) => readFile(path.join(testDirectory, file), "utf8")),
      )
    ).join("\n");
    const missing = registry.filter((id) => !source.includes(id));
    expect(missing).toEqual([]);
  });

  it("deduplicates complete identities and applies the accepted sort order", () => {
    const diagnostics: Diagnostic[] = [
      {
        rule_id: "second",
        severity: "error",
        blocking: "conformance",
        phase: "source",
        message: "Second wording",
        artifact: "b.md",
      },
      {
        rule_id: "first",
        severity: "error",
        blocking: "conformance",
        phase: "project",
        message: "First wording",
      },
      {
        rule_id: "second",
        severity: "error",
        blocking: "conformance",
        phase: "source",
        message: "Duplicate identity with different non-contract wording",
        artifact: "b.md",
      },
      {
        rule_id: "alpha",
        severity: "warning",
        blocking: "none",
        phase: "source",
        message: "Alpha",
        artifact: "a.md",
      },
    ];
    expect(uniqueDiagnostics(diagnostics, PHASES).map((item) => item.rule_id)).toEqual([
      "first",
      "alpha",
      "second",
    ]);
  });
});
