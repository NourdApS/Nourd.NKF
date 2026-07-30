import type { Diagnostic, Phase } from "./types.js";

export class RuleEmitter {
  readonly diagnostics: Diagnostic[] = [];
  readonly #rules: Record<string, { severity: "error" | "warning"; blocking: Diagnostic["blocking"]; phase: Phase }>;

  constructor(executable: Record<string, any>) {
    this.#rules = executable.diagnostics?.rules ?? {};
  }

  emit(
    ruleId: string,
    message: string,
    fields: Partial<
      Pick<Diagnostic, "artifact" | "record_id" | "instance_pointer" | "source_section" | "remediation">
    > = {},
  ): void {
    const rule = this.#rules[ruleId];
    if (rule === undefined) throw new Error(`Unknown native rule ${ruleId}.`);
    this.diagnostics.push({
      rule_id: ruleId,
      severity: rule.severity,
      blocking: rule.blocking,
      phase: rule.phase,
      message,
      ...fields,
    });
  }
}
