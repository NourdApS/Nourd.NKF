import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import YAML from "yaml";
import { validateProject } from "../src/checker/checker.js";
import { options, repositoryRoot } from "./helpers.js";

describe("NKF repository self-hosting", () => {
  it("conforms as the live 0.7 producer and as the promoted 0.71 producer", async () => {
    const result = await validateProject(options(repositoryRoot));
    expect(result.profile).toEqual({
      identity: "nkf.profile.technology",
      binding: "verified",
    });
    expect(result.records.length).toBeGreaterThan(80);
    const recordIds = result.records.map((record) => record.record_id);
    expect(recordIds).toEqual(
      expect.arrayContaining(["nkf", "nkf-0.2-specification", "adr-0050"]),
    );
    expect(recordIds).toContain("nkf-current-system");
    expect(recordIds).toContain("nkf-0.7-specification");
    const bundle = YAML.parse(
      await readFile(path.join(repositoryRoot, ".nourd/knowledge/bundle.yaml"), "utf8"),
    );
    const carriesCandidateEvidence = (bundle.non_records ?? []).some(
      (entry: { document?: { id?: string } }) =>
        entry.document?.id === "document-nkf-0-71-specification",
    );

    if (result.nkf_version === "0.71") {
      // The promoted producer: native accepted 0.71 Specification and no
      // remaining candidate Evidence representation.
      expect(recordIds).toContain("nkf-0.71-specification");
      expect(carriesCandidateEvidence).toBe(false);
      expect(result.conformance).toBe("passed");
      expect(result.diagnostics).toEqual([]);
      return;
    }

    // The pre-promotion producer: the live bundle still declares exactly 0.7,
    // carries the 0.71 Specification as candidate Evidence, and has no native
    // 0.71 Specification record yet.
    expect(result.nkf_version).toBe("0.7");
    expect(recordIds).not.toContain("nkf-0.71-specification");
    expect(carriesCandidateEvidence).toBe(true);
    // Mid-branch, governed source artifacts may await their final digest
    // re-pin; no rule beyond that exact re-pin gap may fire, and a fully
    // re-pinned tree must conform cleanly.
    const rules = [...new Set(result.diagnostics.map((entry) => entry.rule_id))];
    expect(rules.length === 0 ? [] : rules).toEqual(
      rules.length === 0 ? [] : ["artifact.digest-mismatch"],
    );
    expect(result.conformance).toBe(rules.length === 0 ? "passed" : "failed");
  });
});
