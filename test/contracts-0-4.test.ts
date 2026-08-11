import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { VERSION_BINDINGS } from "../src/checker/bindings.js";
import { loadContracts } from "../src/checker/contracts.js";
import { validateProject } from "../src/checker/index.js";
import { options, repositoryRoot } from "./helpers.js";

const contractRoot = path.join(repositoryRoot, "contracts/nkf/0.4");

describe("accepted NKF 0.4 authority and derived checker realization", () => {
  it("binds the exact ADR 0113 authority pair and all three project Schemas", async () => {
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.4"], "0.4");
    expect(loaded.diagnostics).toEqual([]);
    expect(loaded.executable.nkf_version).toBe("0.4");
    expect(VERSION_BINDINGS["0.4"]).toMatchObject({
      specification: {
        path: "knowledge/specifications/nkf-0.4.md",
        sha256: "7298d1a55dcd74d4cc96368648aadbd6a70b5cf4c62d2a1c7f528e7c9181bab1",
      },
      executable: {
        path: "contracts/nkf/0.4/nkf.yaml",
        sha256: "a84fcc1e99567b6716e3281efedbbc87c978ffa465cd4cb5d8cac1d46ad0d217",
      },
    });
    const decision = await readFile(
      path.join(repositoryRoot, "knowledge/decisions/0113-accept-the-nkf-0-4-authority-pair.md"),
      "utf8",
    );
    expect(decision).toContain(VERSION_BINDINGS["0.4"].specification.sha256);
    expect(decision).toContain(VERSION_BINDINGS["0.4"].executable.sha256);
  });

  it("dispatches both complete 0.4 Root Profile fixtures and fails closed for 0.5", async () => {
    for (const fixture of ["minimal-0-4", "technology-0-4"]) {
      const result = await validateProject(
        options(path.join(repositoryRoot, "fixtures/valid", fixture)),
      );
      expect(result.nkf_version).toBe("0.4");
      expect(result.conformance).toBe("passed");
      expect(result.diagnostics).toEqual([]);
    }

    const unsupported = await loadContracts(
      path.join(repositoryRoot, "contracts/nkf/0.5"),
      {
        specification: { path: "knowledge/specifications/nkf-0.5.md", sha256: "0".repeat(64) },
        executable: { path: "contracts/nkf/0.5/nkf.yaml", sha256: "0".repeat(64) },
        schemas: [],
      },
      "0.5",
    );
    expect(unsupported.diagnostics.map((diagnostic) => diagnostic.rule_id)).toContain(
      "contract-set.unavailable",
    );
  });
});
