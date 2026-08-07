import { describe, expect, it } from "vitest";
import { validateDecisionApplicabilityGate } from "../src/checker/applicability.js";
import { RuleEmitter } from "../src/checker/diagnostics.js";
import { parseMarkdown } from "../src/checker/markdown.js";

const RULES = Object.fromEntries(
  [
    "task.applicability.missing",
    "task.applicability.structure.invalid",
    "task.applicability.value.unsupported",
    "task.applicability.reference.unresolved",
    "task.applicability.completion.blocked",
  ].map((rule) => [rule, { severity: "error", blocking: "conformance", phase: "source" }]),
);

function run(body: string, taskStatus: string, acceptedDecisionIds: string[] = ["adr-0008"]) {
  const emitter = new RuleEmitter({ diagnostics: { rules: RULES } });
  validateDecisionApplicabilityGate({
    artifact: "knowledge/tasks/active/T-001-example.md",
    model: parseMarkdown(body),
    taskStatus,
    acceptedDecisionIds: new Set(acceptedDecisionIds),
    acceptedDecisionPaths: new Map(acceptedDecisionIds.map((id) => [id, `decisions/${id}.md`])),
    selfPath: "tasks/active/T-001-example.md",
    emitter,
  });
  return emitter.diagnostics.map((diagnostic) => diagnostic.rule_id);
}

const heading = "# T-001: Example\n\n## Decision Applicability\n\n";
const emptyGate =
  "### Applicable Decisions\n\nNo accepted decision applies to this Task.\n\n" +
  "### Mandatory Capabilities\n\nNo mandatory capability is implicated by this Task.\n";

describe("decision applicability gate", () => {
  it("accepts canonical empty gates", () => {
    expect(run(heading + emptyGate, "active")).toEqual([]);
  });

  it("fails a missing gate section closed", () => {
    expect(run("# T-001: Example\n\n## Purpose\n\nText.\n", "active")).toEqual([
      "task.applicability.missing",
    ]);
  });

  it("rejects duplicate gate sections", () => {
    expect(run(heading + emptyGate + "\n## Decision Applicability\n\nText.\n", "active")).toEqual([
      "task.applicability.structure.invalid",
    ]);
  });

  it("rejects missing or misordered subsections", () => {
    expect(
      run(heading + "### Mandatory Capabilities\n\nNo mandatory capability is implicated by this Task.\n", "active"),
    ).toEqual(["task.applicability.structure.invalid"]);
  });

  it("accepts a complete valid gate", () => {
    const body =
      heading +
      "### Applicable Decisions\n\n" +
      "| Reference | Kind | Carried Constraint |\n| --- | --- | --- |\n" +
      "| [`adr-0008`](../../decisions/adr-0008.md) | record | Mapbox only if custom terrain is proved. |\n" +
      "| Wonderer pilot record | external | Renderer remains replaceable. |\n\n" +
      "Added retrospectively during NKF 0.2 migration.\n\n" +
      "### Mandatory Capabilities\n\n" +
      "| Capability | Finding | Verification | Exception |\n| --- | --- | --- | --- |\n" +
      "| Custom LiDAR 3D terrain | proven | runtime-behaviour | none |\n";
    expect(run(body, "completed")).toEqual([]);
  });

  it("rejects unsupported vocabulary values", () => {
    const body =
      heading +
      "### Applicable Decisions\n\n" +
      "| Reference | Kind | Carried Constraint |\n| --- | --- | --- |\n" +
      "| `adr-0008` | inherited | Condition. |\n\n" +
      "### Mandatory Capabilities\n\n" +
      "| Capability | Finding | Verification | Exception |\n| --- | --- | --- | --- |\n" +
      "| Terrain | assumed | none | none |\n" +
      "| Navigation | proven | screenshots | none |\n" +
      "| Offline packs | unknown | runtime-behaviour | Accepted by the Human Product Owner. |\n";
    expect(run(body, "active")).toEqual([
      "task.applicability.value.unsupported",
      "task.applicability.value.unsupported",
      "task.applicability.value.unsupported",
      "task.applicability.value.unsupported",
    ]);
  });

  it("rejects unresolved decision references", () => {
    const body =
      heading +
      "### Applicable Decisions\n\n" +
      "| Reference | Kind | Carried Constraint |\n| --- | --- | --- |\n" +
      "| `adr-9999` | record | Condition. |\n\n" +
      "### Mandatory Capabilities\n\n" +
      "| Capability | Finding | Verification | Exception |\n| --- | --- | --- | --- |\n" +
      "| Terrain | unknown | none | [`adr-9999`](../../decisions/adr-9999.md) |\n";
    expect(run(body, "active")).toEqual([
      "task.applicability.reference.unresolved",
      "task.applicability.reference.unresolved",
    ]);
  });

  it("blocks completed tasks with unexcepted findings and allows exceptions", () => {
    const table =
      "### Applicable Decisions\n\nNo accepted decision applies to this Task.\n\n" +
      "### Mandatory Capabilities\n\n" +
      "| Capability | Finding | Verification | Exception |\n| --- | --- | --- | --- |\n";
    const blocked = table + "| Terrain | unsupported | none | none |\n";
    const excepted =
      table + "| Terrain | unsupported | none | Human Product Owner exception of 2026-08-07. |\n";
    expect(run(heading + blocked, "completed")).toEqual(["task.applicability.completion.blocked"]);
    expect(run(heading + blocked, "active")).toEqual([]);
    expect(run(heading + excepted, "completed")).toEqual([]);
  });

  it("rejects malformed first blocks and empty or escaped cells", () => {
    const prose =
      heading +
      "### Applicable Decisions\n\nSome prose instead of the contract.\n\n" +
      "### Mandatory Capabilities\n\nNo mandatory capability is implicated by this Task.\n";
    const escaped =
      heading +
      "### Applicable Decisions\n\nNo accepted decision applies to this Task.\n\n" +
      "### Mandatory Capabilities\n\n" +
      "| Capability | Finding | Verification | Exception |\n| --- | --- | --- | --- |\n" +
      "| Terrain \\| navigation | proven | data-validity | none |\n";
    expect(run(prose, "active")).toEqual(["task.applicability.structure.invalid"]);
    expect(run(escaped, "active")).toEqual(["task.applicability.structure.invalid"]);
  });
});

import { findIdentityBulletLabels, findUnlinkedReferences } from "../src/checker/markdown.js";

describe("identity bullet duplication", () => {
  it("finds closed identity labels only at the document root", () => {
    const body = [
      "# Doc",
      "",
      "- **Task:** `NKF-003`",
      "- **Design Disposition:** Adopted",
      "- **Proposal Authority Effect:** None",
      "- **Implementation evidence:** imported schema",
      "- **Adopting Decision:** ADR-0013",
      "- **Authority Boundary:** stays allowed",
      "",
      "> - **Status:** quoted, not top-level",
      "",
      "```",
      "- **Owner:** fenced example",
      "```",
    ].join("\n");
    expect(findIdentityBulletLabels(body).map((found) => found.label.toLowerCase())).toEqual([
      "task",
      "design disposition",
      "proposal authority effect",
      "implementation evidence",
      "adopting decision",
    ]);
  });
});

describe("deep link references", () => {
  const maps = {
    decisionsByNumber: new Map([["0073", "decisions/0073-x.md"]]),
    recordIdToPath: new Map([["adr-0073", "decisions/0073-x.md"]]),
    taskIdToPath: new Map([["NKF-017", "tasks/completed/NKF-017-x.md"]]),
    selfPath: "designs/adopted/example.md",
  };
  it("flags unlinked and mistargeted references and accepts correct links", () => {
    const body = [
      "# NKF-017 Style Doc",
      "",
      "Adopted through ADR 0073 during NKF-017.",
      "",
      "The record `adr-0073` applies.",
      "",
      "Linked [ADR 0073](../../decisions/0073-x.md) is fine.",
      "",
      "Mistargeted [ADR 0073](../../decisions/wrong.md) is not.",
      "",
      "A longer [NKF-017 completion audit](../../evidence/audit.md) link is exempt.",
      "",
      "```",
      "ADR 0073 in a fence stays free.",
      "```",
    ].join("\n");
    const found = findUnlinkedReferences(body, maps);
    expect(found.map((violation) => [violation.token, violation.reason])).toEqual([
      ["ADR 0073", "unlinked"],
      ["NKF-017", "unlinked"],
      ["adr-0073", "unlinked"],
      ["ADR 0073", "mistargeted"],
    ]);
  });
  it("never flags the document itself", () => {
    const self = { ...maps, selfPath: "decisions/0073-x.md" };
    expect(findUnlinkedReferences("# ADR 0073\n\nADR 0073 self mention.\n", self)).toEqual([]);
  });
});
