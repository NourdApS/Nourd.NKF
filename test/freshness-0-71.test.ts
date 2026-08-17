import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import YAML from "yaml";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contractRoot = path.join(repositoryRoot, "contracts/nkf/0.71");
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
const fixture = path.join(repositoryRoot, "fixtures/valid/minimal-0-71");
const technologyFixture = path.join(repositoryRoot, "fixtures/valid/technology-0-71");
const cleanups: string[] = [];

afterEach(async () => {
  while (cleanups.length > 0) await rm(cleanups.pop() as string, { recursive: true, force: true });
});

async function copyFixture(source: string): Promise<string> {
  const project = await mkdtemp(path.join(tmpdir(), "nkf-0-71-"));
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

// Rewrites the confirmed whole-root fixture baseline into the mechanically-
// concluded shape: every judgment carried, the exact transition bound, and
// the transitioned Task judgments marked. Individual tests then break one
// admission precondition at a time.
function concludeBaseline(
  baseline: Record<string, any>,
  transition: { task: string; from_state: string; to_state: string },
): void {
  baseline.confirmation.claim = "mechanically-concluded";
  baseline.confirmation.transition = {
    ...transition,
    predecessor_graph_revision: { algorithm: "sha-256", value: baseline.graph_revision.value },
  };
  for (const entry of baseline.applicability_coverage) {
    entry.provenance = {
      ...carried(baseline),
      ...(entry.node.kind === "document" && entry.node.id === transition.task
        ? { transition: { ...transition } }
        : {}),
    };
  }
  for (const entry of baseline.decision_classifications ?? []) {
    entry.provenance = carried(baseline);
  }
}

describe("NKF 0.71 digest-bound freshness", () => {
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

  it("refuses a mechanical conclusion whose delta exceeds the closed transition vocabulary", async () => {
    // A conclusion carrying a performed judgment claims fresh review it never
    // received.
    const performedProject = await copyFixture(fixture);
    await editBaseline(performedProject, (baseline) => {
      concludeBaseline(baseline, { task: "TEST-001", from_state: "deferred", to_state: "active" });
      baseline.applicability_coverage[0].provenance = { performed: true };
    });
    const performedResult = await validate(performedProject);
    expect(performedResult.readiness?.state).not.toBe("ready");
    expect(
      performedResult.diagnostics.some((item) => item.rule_id === "freshness.baseline.conclusion.delta-exceeded"),
    ).toBe(true);

    // A transition mark on a node other than the transitioned Task claims a
    // wider delta than the closed transition vocabulary.
    const markedProject = await copyFixture(fixture);
    await editBaseline(markedProject, (baseline) => {
      concludeBaseline(baseline, { task: "TEST-001", from_state: "deferred", to_state: "active" });
      const nonTask = baseline.applicability_coverage.find(
        (entry: Record<string, any>) => entry.node.kind === "record",
      );
      nonTask.provenance.transition = { task: "TEST-001", from_state: "deferred", to_state: "active" };
    });
    const markedResult = await validate(markedProject);
    expect(markedResult.readiness?.state).not.toBe("ready");
    expect(
      markedResult.diagnostics.some((item) => item.rule_id === "freshness.baseline.conclusion.delta-exceeded"),
    ).toBe(true);
  });

  it("refuses a mechanical conclusion whose carry does not bind the exact transition", async () => {
    // The transition binding must land on the declared Task state.
    const mismatchedProject = await copyFixture(fixture);
    await editBaseline(mismatchedProject, (baseline) => {
      // The fixture Task is declared active; a conclusion into completed
      // contradicts the declared state.
      concludeBaseline(baseline, { task: "TEST-001", from_state: "active", to_state: "completed" });
    });
    const mismatchedResult = await validate(mismatchedProject);
    expect(mismatchedResult.readiness?.state).not.toBe("ready");
    expect(
      mismatchedResult.diagnostics.some((item) => item.rule_id === "freshness.baseline.conclusion.carry-invalid"),
    ).toBe(true);

    // The transitioned Task's judgments must carry the exact transition mark.
    const unmarkedProject = await copyFixture(fixture);
    await editBaseline(unmarkedProject, (baseline) => {
      concludeBaseline(baseline, { task: "TEST-001", from_state: "deferred", to_state: "active" });
      for (const entry of baseline.applicability_coverage) {
        entry.provenance = carried(baseline);
      }
    });
    const unmarkedResult = await validate(unmarkedProject);
    expect(unmarkedResult.readiness?.state).not.toBe("ready");
    expect(
      unmarkedResult.diagnostics.some((item) => item.rule_id === "freshness.baseline.conclusion.carry-invalid"),
    ).toBe(true);
  });
});
