import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import YAML from "yaml";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contractRoot = path.join(repositoryRoot, "contracts/nkf/0.81");
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
const fixture = path.join(repositoryRoot, "fixtures/valid/minimal-0-81");
const technologyFixture = path.join(repositoryRoot, "fixtures/valid/technology-0-81");
const cleanups: string[] = [];

afterEach(async () => {
  while (cleanups.length > 0) await rm(cleanups.pop() as string, { recursive: true, force: true });
});

async function copyFixture(source: string): Promise<string> {
  const project = await mkdtemp(path.join(tmpdir(), "nkf-0-81-"));
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

type Node = { kind: string; id: string };
const sameNode = (left: Node, right: Node) => left.kind === right.kind && left.id === right.id;

// Rewrites the confirmed whole-root fixture baseline into the delta-claim
// shape a 0.81 seal produces: the recorded closure and performed set are
// bound, every performed node's judgments carry `performed` provenance, and
// every other judgment is carried from the (reconstructed) predecessor.
function deltaClaim(baseline: Record<string, any>, closure: Node[], performed: Node[]): void {
  baseline.confirmation.claim = "semantically-reviewed-delta";
  baseline.confirmation.computed_closure = closure;
  baseline.confirmation.performed_set = performed;
  for (const entry of baseline.applicability_coverage) {
    entry.provenance = performed.some((node) => sameNode(node, entry.node)) ? { performed: true } : carried(baseline);
  }
  for (const entry of baseline.decision_classifications ?? []) {
    entry.provenance = carried(baseline);
  }
}

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

const specification = { kind: "record", id: "specification" };
const realization = { kind: "record", id: "realization" };
const technology = { kind: "record", id: "technology" };
const ruleIds = (result: { diagnostics: { rule_id: string }[] }) =>
  [...new Set(result.diagnostics.map((item) => item.rule_id))];

describe("NKF 0.81 digest-bound freshness", () => {
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
    expect(ruleIds(result)).toContain("version-delta.binding-mismatch");
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
    expect(ruleIds(result)).toContain("freshness.claim.delta-closure-not-contained");
  });

  it("refuses a delta claim whose recorded closure omits the propagated subject", async () => {
    // The Technology fixture authors realization --realizes--> specification,
    // and the policy propagates `realizes` target-to-source. A closure that
    // names the changed specification but not the realization it reaches is
    // exactly the closure the 0.7-through-0.8 tooling recorded (ADR 0139);
    // under 0.81 the checker recomputes it and refuses, naming the subject.
    const project = await copyFixture(technologyFixture);
    await editBaseline(project, (baseline) => {
      deltaClaim(baseline, [specification], [specification]);
    });
    const result = await validate(project);
    expect(result.conformance).toBe("failed");
    expect(result.readiness?.state).not.toBe("ready");
    expect(ruleIds(result)).toContain("freshness.claim.computed-closure-not-reproduced");
    expect(ruleIds(result)).not.toContain("freshness.claim.delta-closure-not-contained");
    const diagnostic = result.diagnostics.find((item) => item.rule_id === "freshness.claim.computed-closure-not-reproduced");
    expect(diagnostic?.message).toContain('"id":"realization"');
    expect(diagnostic?.blocking).toBe("conformance");
  });

  it("admits a delta claim whose recorded closure reproduces the propagated closure", async () => {
    const project = await copyFixture(technologyFixture);
    await editBaseline(project, (baseline) => {
      deltaClaim(baseline, [specification, realization], [specification, realization]);
    });
    const result = await validate(project);
    expect(result.conformance).toBe("passed");
    expect(result.readiness?.state).toBe("ready");
    expect(ruleIds(result)).not.toContain("freshness.claim.computed-closure-not-reproduced");
  });

  it("does not refuse a performed set that voluntarily expands beyond the closure", async () => {
    // The Specification admits a performed set that contains the closure; a
    // reviewer who also re-performed an unchanged node is not refused, and
    // the voluntarily reviewed node seeds no propagation of its own.
    const project = await copyFixture(technologyFixture);
    await editBaseline(project, (baseline) => {
      deltaClaim(baseline, [specification, realization], [specification, realization, technology]);
    });
    const result = await validate(project);
    expect(result.conformance).toBe("passed");
    expect(result.readiness?.state).toBe("ready");
  });

  it("requires every pending promotion-reconciliation subject in the recorded closure", async () => {
    const project = await copyFixture(technologyFixture);
    await editBaseline(project, (baseline) => {
      deltaClaim(baseline, [specification, realization], [specification, realization, technology]);
      baseline.promotion_reconciliation = [
        {
          node: technology,
          coordinate: "release-version",
          written_at_graph_revision: { algorithm: "sha-256", value: baseline.graph_revision.value },
          state: "pending",
        },
      ];
    });
    const result = await validate(project);
    expect(result.readiness?.state).not.toBe("ready");
    expect(ruleIds(result)).toContain("freshness.claim.computed-closure-not-reproduced");
    const diagnostic = result.diagnostics.find((item) => item.rule_id === "freshness.claim.computed-closure-not-reproduced");
    expect(diagnostic?.message).toContain('"id":"technology"');
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
    expect(ruleIds(result)).toContain("freshness.reconciliation.pending");
  });

  it("reports stale judgment digests when a judged node changes", async () => {
    const project = await copyFixture(fixture);
    await editBaseline(project, (baseline) => {
      baseline.applicability_coverage[0].revision.value = "1".repeat(64);
    });
    const result = await validate(project);
    expect(result.readiness?.state).not.toBe("ready");
    expect(ruleIds(result)).toContain("freshness.baseline.judgment-digest-mismatch");
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
    expect(ruleIds(performedResult)).toContain("freshness.baseline.conclusion.delta-exceeded");

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
    expect(ruleIds(markedResult)).toContain("freshness.baseline.conclusion.delta-exceeded");
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
    expect(ruleIds(mismatchedResult)).toContain("freshness.baseline.conclusion.carry-invalid");

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
    expect(ruleIds(unmarkedResult)).toContain("freshness.baseline.conclusion.carry-invalid");
  });
});
