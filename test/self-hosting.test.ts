import { describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import { options, repositoryRoot } from "./helpers.js";

describe("NKF repository self-hosting", () => {
  it("conforms as the live 0.6 producer and as the promoted 0.7 producer", async () => {
    const result = await validateProject(options(repositoryRoot));
    expect(result.profile).toEqual({
      identity: "nkf.profile.technology",
      binding: "verified",
    });
    expect(result.records.length).toBeGreaterThan(80);
    expect(result.records.map((record) => record.record_id)).toEqual(
      expect.arrayContaining(["nkf", "nkf-0.2-specification", "adr-0050"]),
    );

    if (result.nkf_version === "0.7") {
      // The promoted producer: native accepted 0.7 Specification and the
      // succeeded version-free current-system identity.
      expect(result.records.map((record) => record.record_id)).toEqual(
        expect.arrayContaining(["nkf-0.7-specification", "nkf-current-system"]),
      );
      expect(result.conformance).toBe("passed");
      expect(result.diagnostics).toEqual([]);
      return;
    }

    expect(result.nkf_version).toBe("0.6");
    expect(result.records.map((record) => record.record_id)).toContain(
      "nkf-0.1-native-realization",
    );
    expect(result.conformance).toBe("passed");
    expect(result.diagnostics).toEqual([]);
  });
});
