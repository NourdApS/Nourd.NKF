import { fileURLToPath } from "node:url";
import path from "node:path";
import { validateProject } from "./checker/index.js";
import type { ConformanceLevel, ValidationRequest } from "./checker/types.js";

interface CliArguments {
  operation: "validate" | "evaluate";
  project: string;
  level: ConformanceLevel;
  record: string | null;
  acceptanceBinding: boolean;
  runner: string;
  persist: boolean;
  purpose: NonNullable<ValidationRequest["purpose"]> | null;
  requireReadiness: boolean;
  changedInputs: unknown[];
  targets: unknown[];
  observations: unknown[];
  evaluationTime: string | null;
  historicalReceipt: string | null;
}

function usage(): string {
  return [
    "Usage: nourd-nkf-checker [validate|evaluate] [options]",
    "",
    "Options:",
    "  --project <path>             Project root (default: current directory)",
    "  --level <level>              structural | contract | full-bundle",
    "  --record <id>                Required for contract validation",
    "  --acceptance-binding         Request external acceptance verification",
    "  --runner <identity>          Portable runner identity",
    "  --purpose <purpose>          change-impact | whole-root-readiness | consequential-use | historical-reproduction",
    "  --require-readiness          Fail the command unless requested readiness is ready",
    "  --changed-input <json>       Repeatable closed changed-input JSON object",
    "  --target <json>              Repeatable closed target node-reference JSON object",
    "  --observation <json>         Repeatable closed observation JSON object",
    "  --evaluation-time <utc>      Exact fixed-millisecond UTC evaluation time",
    "  --historical-receipt <id>    Historical freshness receipt identity",
    "  --no-persist                 Do not write a full-bundle receipt (development only)",
    "  --help                       Show this help",
  ].join("\n");
}

function parseArguments(argv: string[]): CliArguments {
  const operation = argv[0] === "validate" || argv[0] === "evaluate" ? argv[0] : "validate";
  const values = argv[0] === "validate" || argv[0] === "evaluate" ? argv.slice(1) : argv;
  const result: CliArguments = {
    operation,
    project: process.cwd(),
    level: "full-bundle",
    record: null,
    acceptanceBinding: false,
    runner: "nourd-nkf-cli",
    persist: true,
    purpose: null,
    requireReadiness: false,
    changedInputs: [],
    targets: [],
    observations: [],
    evaluationTime: null,
    historicalReceipt: null,
  };
  for (let index = 0; index < values.length; index += 1) {
    const argument = values[index];
    const next = values[index + 1];
    if (argument === "--help" || argument === "-h") {
      process.stdout.write(`${usage()}\n`);
      process.exit(0);
    } else if (argument === "--project" && next !== undefined) {
      result.project = path.resolve(next);
      index += 1;
    } else if (argument === "--level" && next !== undefined) {
      if (!["structural", "contract", "full-bundle"].includes(next)) {
        throw new TypeError(`Unknown conformance level: ${next}`);
      }
      result.level = next as ConformanceLevel;
      index += 1;
    } else if (argument === "--record" && next !== undefined) {
      result.record = next;
      index += 1;
    } else if (argument === "--acceptance-binding") {
      result.acceptanceBinding = true;
    } else if (argument === "--runner" && next !== undefined) {
      result.runner = next;
      index += 1;
    } else if (argument === "--purpose" && next !== undefined) {
      if (!["change-impact", "whole-root-readiness", "consequential-use", "historical-reproduction"].includes(next)) {
        throw new TypeError(`Unknown readiness purpose: ${next}`);
      }
      result.purpose = next as NonNullable<ValidationRequest["purpose"]>;
      index += 1;
    } else if (argument === "--require-readiness") {
      result.requireReadiness = true;
    } else if (["--changed-input", "--target", "--observation"].includes(argument ?? "") && next !== undefined) {
      let value: unknown;
      try { value = JSON.parse(next); } catch { throw new TypeError(`${argument} requires one JSON object.`); }
      if (value === null || typeof value !== "object" || Array.isArray(value)) {
        throw new TypeError(`${argument} requires one JSON object.`);
      }
      if (argument === "--changed-input") result.changedInputs.push(value);
      else if (argument === "--target") result.targets.push(value);
      else result.observations.push(value);
      index += 1;
    } else if (argument === "--evaluation-time" && next !== undefined) {
      result.evaluationTime = next;
      index += 1;
    } else if (argument === "--historical-receipt" && next !== undefined) {
      result.historicalReceipt = next;
      index += 1;
    } else if (argument === "--no-persist") {
      result.persist = false;
    } else {
      throw new TypeError(`Unknown or incomplete argument: ${argument ?? ""}`);
    }
  }
  if (result.operation === "evaluate") {
    if (result.level !== "full-bundle" || result.purpose === null || !result.persist) {
      throw new TypeError("evaluate requires persisted full-bundle validation with one explicit purpose.");
    }
  }
  return result;
}

async function main(): Promise<void> {
  const argumentsValue = parseArguments(process.argv.slice(2));
  const request: ValidationRequest = {
    level: argumentsValue.level,
    record_id: argumentsValue.level === "contract" ? argumentsValue.record : null,
    acceptance_binding: argumentsValue.acceptanceBinding ? "requested" : "not-requested",
    ...(argumentsValue.purpose === null &&
    !argumentsValue.requireReadiness &&
    argumentsValue.changedInputs.length === 0 &&
    argumentsValue.targets.length === 0 &&
    argumentsValue.observations.length === 0 &&
    argumentsValue.evaluationTime === null &&
    argumentsValue.historicalReceipt === null
      ? {}
      : {
          purpose: argumentsValue.purpose,
          require_readiness: argumentsValue.requireReadiness,
          changed_inputs: argumentsValue.changedInputs,
          targets: argumentsValue.targets,
          observations: argumentsValue.observations,
          evaluation_time: argumentsValue.evaluationTime,
          historical_receipt: argumentsValue.historicalReceipt,
        }),
  };
  const checkerArtifact = fileURLToPath(import.meta.url);
  const contractRoot = fileURLToPath(new URL("../contracts/nkf/0.8", import.meta.url));
  let evaluation: { state: "evaluated" | "evaluated-current"; receipt: { id: string; path: string } } | undefined;
  const result = await validateProject({
    projectRoot: argumentsValue.project,
    contractRoot,
    checkerArtifact,
    checkerIdentity: "nourd-nkf-checker",
    runner: argumentsValue.runner,
    request,
    persist: argumentsValue.persist,
    evaluationObserver(value) { evaluation = value; },
  });
  const output = argumentsValue.operation === "evaluate"
    ? {
        state: evaluation?.state,
        candidate_graph_revision: result.knowledge_graph?.candidate_graph_revision,
        policy: result.knowledge_graph?.policy,
        purpose: result.request.purpose,
        receipt: evaluation?.receipt,
        freshness_results: result.nodes,
        readiness: result.readiness,
      }
    : result;
  if (argumentsValue.operation === "evaluate" && evaluation === undefined) {
    throw new TypeError("evaluate did not persist one exact freshness receipt transaction.");
  }
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  process.exitCode =
    result.conformance === "passed" &&
    (!argumentsValue.requireReadiness || result.readiness?.state === "ready")
      ? 0
      : 1;
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`nourd-nkf-checker: ${message}\n`);
  process.exitCode = 2;
});
