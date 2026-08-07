import { fileURLToPath } from "node:url";
import path from "node:path";
import { validateProject } from "./checker/index.js";
import type { ConformanceLevel, ValidationRequest } from "./checker/types.js";

interface CliArguments {
  project: string;
  level: ConformanceLevel;
  record: string | null;
  acceptanceBinding: boolean;
  runner: string;
  persist: boolean;
}

function usage(): string {
  return [
    "Usage: nourd-nkf-checker [validate] [options]",
    "",
    "Options:",
    "  --project <path>             Project root (default: current directory)",
    "  --level <level>              structural | contract | full-bundle",
    "  --record <id>                Required for contract validation",
    "  --acceptance-binding         Request external acceptance verification",
    "  --runner <identity>          Portable runner identity",
    "  --no-persist                 Do not write a full-bundle receipt (development only)",
    "  --help                       Show this help",
  ].join("\n");
}

function parseArguments(argv: string[]): CliArguments {
  const values = argv[0] === "validate" ? argv.slice(1) : argv;
  const result: CliArguments = {
    project: process.cwd(),
    level: "full-bundle",
    record: null,
    acceptanceBinding: false,
    runner: "nourd-nkf-cli",
    persist: true,
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
    } else if (argument === "--no-persist") {
      result.persist = false;
    } else {
      throw new TypeError(`Unknown or incomplete argument: ${argument ?? ""}`);
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
  };
  const checkerArtifact = fileURLToPath(import.meta.url);
  const contractRoot = fileURLToPath(new URL("../contracts/nkf/0.2", import.meta.url));
  const result = await validateProject({
    projectRoot: argumentsValue.project,
    contractRoot,
    checkerArtifact,
    checkerIdentity: "nourd-nkf-checker",
    runner: argumentsValue.runner,
    request,
    persist: argumentsValue.persist,
  });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = result.conformance === "passed" ? 0 : 1;
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`nourd-nkf-checker: ${message}\n`);
  process.exitCode = 2;
});
