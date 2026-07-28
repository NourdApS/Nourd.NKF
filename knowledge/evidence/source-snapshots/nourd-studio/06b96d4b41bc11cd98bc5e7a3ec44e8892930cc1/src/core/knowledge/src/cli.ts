#!/usr/bin/env node

import path from "node:path";

import {
  defaultRepositoryRoot,
  inspectKnowledge,
  reconcileKnowledge,
  validateKnowledge,
} from "./core.js";
import type { KnowledgeDiagnostic, ValidationResult } from "./types.js";

type Command = "validate" | "reconcile" | "inspect";

interface CliOptions {
  baseRef?: string;
  format: "human" | "json";
  recordId?: string;
  repository?: string;
  manifest?: string;
  all: boolean;
}

const valueOptions = new Set([
  "--base",
  "--format",
  "--record",
  "--repository",
  "--manifest",
]);
const flagOptions = new Set(["--all"]);

function parseOptions(command: Command, arguments_: string[]): CliOptions {
  const values = new Map<string, string>();
  const flags = new Set<string>();

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index]!;
    if (flagOptions.has(argument)) {
      if (flags.has(argument)) {
        throw new Error(`Duplicate option: ${argument}`);
      }
      flags.add(argument);
      continue;
    }
    if (!valueOptions.has(argument)) {
      throw new Error(`Unknown option: ${argument}`);
    }
    if (values.has(argument)) {
      throw new Error(`Duplicate option: ${argument}`);
    }
    const value = arguments_[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`${argument} requires a value`);
    }
    values.set(argument, value);
    index += 1;
  }

  const allowed = new Set(
    command === "validate"
      ? ["--base", "--format", "--repository", "--manifest"]
      : command === "reconcile"
        ? [
            "--base",
            "--format",
            "--record",
            "--all",
            "--repository",
            "--manifest",
          ]
        : [
            "--base",
            "--format",
            "--record",
            "--repository",
            "--manifest",
          ],
  );
  for (const option of [...values.keys(), ...flags]) {
    if (!allowed.has(option)) {
      throw new Error(`${option} is not valid for ${command}`);
    }
  }

  const format = values.get("--format") ?? "human";
  if (format !== "human" && format !== "json") {
    throw new Error("--format must be human or json");
  }

  const recordId = values.get("--record");
  const all = flags.has("--all");
  if (command === "reconcile" && Boolean(recordId) === all) {
    throw new Error("reconcile requires exactly one of --record <id> or --all");
  }
  if (command === "inspect" && !recordId) {
    throw new Error("inspect requires --record <id>");
  }
  const baseRef = values.get("--base") ?? process.env.KNOWLEDGE_BASE_REF;
  const repository = values.get("--repository");
  const manifest = values.get("--manifest");

  return {
    ...(baseRef ? { baseRef } : {}),
    format,
    ...(recordId ? { recordId } : {}),
    ...(repository ? { repository } : {}),
    ...(manifest ? { manifest } : {}),
    all,
  };
}

function diagnosticLine(diagnostic: KnowledgeDiagnostic): string {
  const location = [diagnostic.record_id, diagnostic.source_path]
    .filter(Boolean)
    .join(" · ");
  return `${diagnostic.severity.toUpperCase()} ${diagnostic.rule}${location ? ` · ${location}` : ""}\n  ${diagnostic.message}`;
}

function printResult(
  result: ValidationResult,
  format: CliOptions["format"],
): void {
  if (format === "json") {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  const errors = result.diagnostics.filter(
    (diagnostic) => diagnostic.severity === "error",
  );
  const warnings = result.diagnostics.filter(
    (diagnostic) => diagnostic.severity === "warning",
  );
  process.stdout.write(
    `Knowledge validation ${result.outcome}: ${result.affected_records.length} records, ${errors.length} errors, ${warnings.length} warnings.\nAuthority: ${result.authority_state}.${result.proposal_digest ? ` Proposal ${result.proposal_digest}.` : ""}\n`,
  );
  if (result.conformance?.format === "nkf") {
    process.stdout.write(
      `NKF ${result.conformance.nkf_version ?? "unknown"} conformance: structural ${result.conformance.structural}, contracts ${result.conformance.contracts}, full bundle ${result.conformance.full_bundle}, Nourd profile ${result.conformance.profile ?? "not-requested"}.\nSpecification: ${result.conformance.specification_digest ?? "unresolved"} (${result.conformance.specification_authority ?? "unresolved"}).\n`,
    );
  } else if (result.conformance?.format === "legacy") {
    process.stdout.write(
      "Contract family: legacy Nourd bootstrap. This result is not NKF conformance.\n",
    );
  }
  if (result.diagnostics.length > 0) {
    process.stdout.write(
      `${result.diagnostics.map(diagnosticLine).join("\n")}\n`,
    );
  }
}

function commandFrom(value: string | undefined): Command {
  if (value === "validate" || value === "reconcile" || value === "inspect") {
    return value;
  }
  throw new Error(
    "Usage: knowledge <validate|reconcile|inspect> [--record <id>|--all] [--repository <path>] [--manifest <path>] [--base <git-ref>] [--format human|json]",
  );
}

function main(): void {
  const [, , rawCommand, ...arguments_] = process.argv;
  const command = commandFrom(rawCommand);
  const options = parseOptions(command, arguments_);
  const repositoryRoot = options.repository
    ? path.resolve(options.repository)
    : defaultRepositoryRoot();

  if (command === "validate") {
    const result = validateKnowledge(repositoryRoot, {
      ...(options.baseRef ? { baseRef: options.baseRef } : {}),
      ...(options.manifest ? { manifestPath: options.manifest } : {}),
    });
    printResult(result, options.format);
    process.exitCode = result.outcome === "passed" ? 0 : 1;
    return;
  }

  if (command === "reconcile") {
    const changed = reconcileKnowledge(repositoryRoot, options.recordId, {
      ...(options.manifest ? { manifestPath: options.manifest } : {}),
    });
    const validation = validateKnowledge(repositoryRoot, {
      ...(options.baseRef ? { baseRef: options.baseRef } : {}),
      ...(options.manifest ? { manifestPath: options.manifest } : {}),
    });
    if (options.format === "json") {
      process.stdout.write(
        `${JSON.stringify(
          {
            reconciliation: { changed_records: changed },
            validation,
          },
          null,
          2,
        )}\n`,
      );
    } else {
      process.stdout.write(
        changed.length > 0
          ? `Reconciled ${changed.length} record digests: ${changed.join(", ")}.\n`
          : "All selected record digests were already current.\n",
      );
      printResult(validation, options.format);
    }
    process.exitCode = validation.outcome === "passed" ? 0 : 1;
    return;
  }

  const inspected = inspectKnowledge(
    repositoryRoot,
    options.recordId!,
    options.baseRef,
    {
      ...(options.manifest ? { manifestPath: options.manifest } : {}),
    },
  );
  if (options.format === "json") {
    process.stdout.write(`${JSON.stringify(inspected, null, 2)}\n`);
  } else {
    process.stdout.write(
      `${inspected.record.id} · ${inspected.record.type} · ${inspected.validation.authority_state}\n${inspected.record.source.path}\n\n${inspected.markdown}`,
    );
  }
}

try {
  main();
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
}
