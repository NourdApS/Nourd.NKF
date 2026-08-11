import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { VERSION_BINDINGS } from "../src/checker/bindings.js";
import { loadContracts } from "../src/checker/contracts.js";
import { validateProject } from "../src/checker/index.js";
import { options, repositoryRoot } from "./helpers.js";

const contractRoot = path.join(repositoryRoot, "contracts/nkf/0.3");

describe("accepted NKF 0.3 authority and derived checker realization", () => {
  it("binds the exact ADR 0110 authority pair and all three project Schemas", async () => {
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.3"], "0.3");
    expect(loaded.diagnostics).toEqual([]);
    expect(loaded.executable.nkf_version).toBe("0.3");
    expect(VERSION_BINDINGS["0.3"]).toMatchObject({
      specification: {
        path: "knowledge/specifications/nkf-0.3.md",
        sha256: "0094bedce5485901c3ab6fb542e3d2785e961991cf7cc6f24e9aa3462498436e",
      },
      executable: {
        path: "contracts/nkf/0.3/nkf.yaml",
        sha256: "e988a596e741d48611a5f77a9236e9d539f9a7475a76f07768bc273a8bf4d27f",
      },
    });
    const decision = await readFile(
      path.join(repositoryRoot, "knowledge/decisions/0110-accept-the-nkf-0-3-authority-pair.md"),
      "utf8",
    );
    expect(decision).toContain(VERSION_BINDINGS["0.3"].specification.sha256);
    expect(decision).toContain(VERSION_BINDINGS["0.3"].executable.sha256);
  });

  it("dispatches both complete 0.3 Root Profile fixtures and fails closed for 0.5", async () => {
    for (const fixture of ["minimal-0-3", "technology-0-3"]) {
      const result = await validateProject(
        options(path.join(repositoryRoot, "fixtures/valid", fixture)),
      );
      expect(result.nkf_version).toBe("0.3");
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
