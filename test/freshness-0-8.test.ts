import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import YAML from "yaml";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contractRoot = path.join(repositoryRoot, "contracts/nkf/0.8");
const checker = path.join(repositoryRoot, "dist/nourd-nkf-checker.mjs");
const request = () => ({
  level: "full-bundle" as const,
  record_id: null,
  acceptance_binding: "not-requested" as const,
  purpose: "whole-root-readiness" as const,
  require_readiness: true,
  changed_inputs: [],
  targets: [],
  observations: [],
  evaluation_time: null,
  historical_receipt: null,
});
const validate = (projectRoot: string) =>
  validateProject({ projectRoot, contractRoot, checkerArtifact: checker, request: request(), persist: false });
const fixture = path.join(repositoryRoot, "fixtures/valid/minimal-0-8");
const technologyFixture = path.join(repositoryRoot, "fixtures/valid/technology-0-8");
const cleanups: string[] = [];

afterEach(async () => {
  while (cleanups.length > 0) await rm(cleanups.pop() as string, { recursive: true, force: true });
});

async function copyFixture(source: string): Promise<string> {
  const project = await mkdtemp(path.join(tmpdir(), "nkf-0-8-"));
  cleanups.push(project);
  await cp(source, project, { recursive: true });
  return project;
}

async function editBaseline(project: string, change: (baseline: Record<string, any>) => void): Promise<void> {
  const target = path.join(project, ".nourd/knowledge/freshness/baseline.yaml");
  const baseline = YAML.parse(await readFile(target, "utf8"));
  change(baseline);
  await writeFile(target, YAML.stringify(baseline, { lineWidth: 0, aliasDuplicateObjects: false }));
}

const carried = (baseline: Record<string, any>) => ({
  carried: {
    performed_in_graph_revision: { algorithm: "sha-256", value: baseline.graph_revision.value },
    performing_reviewer: { kind: "agent", id: "fixture-reviewer" },
  },
});

describe("NKF 0.8 digest-bound freshness", () => {
  it("passes conformance and readiness for the digest-bound Product fixture", async () => {
    const result = await validate(fixture);
    expect(result.conformance).toBe("passed");
    expect(result.readiness?.state).toBe("ready");
  });

  it("passes conformance and readiness for the digest-bound Technology fixture", async () => {
    const result = await validate(technologyFixture);
    expect(result.conformance).toBe("passed");
    expect(result.readiness?.state).toBe("ready");
  });

  it("rejects a baseline that does not bind the accepted version-delta declaration", async () => {
    const project = await copyFixture(fixture);
    await editBaseline(project, (baseline) => {
      baseline.version_delta.digest.value = "0".repeat(64);
    });
    const result = await validate(project);
    expect(result.readiness?.state).not.toBe("ready");
    expect(result.diagnostics.some((item) => item.rule_id === "version-delta.binding-mismatch")).toBe(true);
  });

  it("refuses a delta claim whose performed set does not contain the computed closure", async () => {
    const project = await copyFixture(fixture);
    await editBaseline(project, (baseline) => {
      const nodes = baseline.node_revisions.map((entry: Record<string, any>) => entry.node);
      baseline.confirmation.claim = "semantically-reviewed-delta";
      baseline.confirmation.computed_closure = nodes;
      baseline.confirmation.performed_set = [];
      for (const entry of baseline.applicability_coverage) {
        entry.provenance = carried(baseline);
      }
    });
    const result = await validate(project);
    expect(result.readiness?.state).not.toBe("ready");
    expect(result.diagnostics.some((item) => item.rule_id === "freshness.claim.delta-closure-not-contained")).toBe(true);
  });

  it("admits a 0.8 delta claim recorded without the propagation term", async () => {
    // Tooling published under NKF 0.7 through 0.8 recorded closures without
    // impact propagation; baselines sealed under those versions stand as
    // sealed (ADR 0139), so the 0.8 checker trusts the recorded closure and
    // the recompute capability is held to 0.81 only.
    const project = await copyFixture(technologyFixture);
    await editBaseline(project, (baseline) => {
      const specification = { kind: "record", id: "specification" };
      baseline.confirmation.claim = "semantically-reviewed-delta";
      baseline.confirmation.computed_closure = [specification];
      baseline.confirmation.performed_set = [specification];
      for (const entry of baseline.applicability_coverage) {
        entry.provenance = entry.node.kind === "record" && entry.node.id === "specification"
          ? { performed: true }
          : carried(baseline);
      }
    });
    const result = await validate(project);
    expect(result.conformance).toBe("passed");
    expect(result.readiness?.state).toBe("ready");
    expect(result.diagnostics.some((item) => item.rule_id === "freshness.claim.computed-closure-not-reproduced")).toBe(false);
  });

  it("blocks readiness while a promotion-reconciliation entry is pending", async () => {
    const project = await copyFixture(fixture);
    await editBaseline(project, (baseline) => {
      baseline.promotion_reconciliation = [
        {
          node: baseline.node_revisions[0].node,
          coordinate: "release-version",
          written_at_graph_revision: { algorithm: "sha-256", value: baseline.graph_revision.value },
          state: "pending",
        },
      ];
    });
    const result = await validate(project);
    expect(result.readiness?.state).not.toBe("ready");
    expect(result.diagnostics.some((item) => item.rule_id === "freshness.reconciliation.pending")).toBe(true);
  });

  it("reports stale judgment digests when a judged node changes", async () => {
    const project = await copyFixture(fixture);
    await editBaseline(project, (baseline) => {
      baseline.applicability_coverage[0].revision.value = "1".repeat(64);
    });
    const result = await validate(project);
    expect(result.readiness?.state).not.toBe("ready");
    expect(result.diagnostics.some((item) => item.rule_id === "freshness.baseline.judgment-digest-mismatch")).toBe(true);
  });
});
