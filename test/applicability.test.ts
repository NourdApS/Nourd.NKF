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
      "| `adr-0008` | record | Mapbox only if custom terrain is proved. |\n" +
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
      "| Terrain | unknown | none | `adr-9999` |\n";
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
