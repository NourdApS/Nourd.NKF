import { describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import { options, repositoryRoot } from "./helpers.js";

describe("NKF repository self-hosting", () => {
  it("fails closed during exact 0.6 pre-promotion and conforms after promotion", async () => {
    const result = await validateProject(options(repositoryRoot));
    expect(result.profile).toEqual({
      identity: "nkf.profile.technology",
      binding: "verified",
    });
    expect(result.records.length).toBeGreaterThan(80);
    expect(result.records.map((record) => record.record_id)).toEqual(
      expect.arrayContaining([
        "nkf",
        "nkf-0.2-specification",
        "nkf-0.1-native-realization",
        "adr-0050",
      ]),
    );

    if (result.nkf_version === "0.5") {
      expect(result.records.map((record) => record.record_id)).toContain("adr-0125");
      expect(result.conformance).toBe("failed");
      expect(result.diagnostics.length).toBeGreaterThan(0);
      expect(result.diagnostics.every((diagnostic) => diagnostic.rule_id === "artifact.digest-mismatch")).toBe(true);
      expect(result.diagnostics.map((diagnostic) => diagnostic.artifact)).toEqual(
        expect.arrayContaining([
          "scripts/adoption/nourd-nkf-adopt.mjs",
          "src/checker/checker.ts",
          "test/adopter.test.ts",
        ]),
      );
      return;
    }

    expect(result.nkf_version).toBe("0.6");
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics).toEqual([]);
  });
});
