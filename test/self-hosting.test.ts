import { describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import { options, repositoryRoot } from "./helpers.js";

describe("NKF repository self-hosting", () => {
  it("conforms as a Technology bundle with complete governed knowledge coverage", async () => {
    const result = await validateProject(options(repositoryRoot));
    expect(result.conformance).toBe("passed");
    expect(result.profile).toEqual({
      identity: "nkf.profile.technology",
      binding: "verified",
    });
    expect(result.diagnostics).toEqual([]);
    expect(result.records.length).toBeGreaterThan(80);
    expect(result.records.map((record) => record.record_id)).toEqual(
      expect.arrayContaining([
        "nkf",
        "nkf-0.1-specification",
        "nkf-0.1-native-realization",
        "adr-0050",
      ]),
    );
  });
});
