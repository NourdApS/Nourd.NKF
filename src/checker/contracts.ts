import { readFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import YAML from "yaml";
import { CORE_BINDINGS, type CoreBindings } from "./bindings.js";
import type {
  ArtifactBinding,
  ContractArtifacts,
  Diagnostic,
  LoadedContracts,
  SchemaBinding,
} from "./types.js";
import { asObject, sha256 } from "./util.js";

interface ReadArtifact {
  bytes: Buffer | null;
  observed: string | null;
}

async function readArtifact(file: string): Promise<ReadArtifact> {
  try {
    const bytes = await readFile(file);
    return { bytes, observed: sha256(bytes) };
  } catch {
    return { bytes: null, observed: null };
  }
}

function binding(expected: string, observed: string | null): ArtifactBinding {
  return {
    expected_sha256: expected,
    observed_sha256: observed,
    binding: observed === null ? "unavailable" : observed === expected ? "verified" : "mismatched",
  };
}

function contractDiagnostic(
  rule_id: string,
  message: string,
  artifact?: string,
): Diagnostic {
  return {
    rule_id,
    severity: "error",
    blocking: "conformance",
    phase: "contracts",
    message,
    ...(artifact === undefined ? {} : { artifact }),
  };
}

function strictJson(bytes: Buffer): Record<string, unknown> | null {
  try {
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return asObject(JSON.parse(decoded));
  } catch {
    return null;
  }
}

export async function loadContracts(
  contractRoot: string,
  bindings: CoreBindings = CORE_BINDINGS,
  nkfVersion = "0.1",
): Promise<LoadedContracts> {
  const diagnostics: Diagnostic[] = [];
  const repositoryRoot = path.resolve(contractRoot, "../../..");
  const specificationPath = path.join(repositoryRoot, bindings.specification.path);
  const executablePath = path.join(repositoryRoot, bindings.executable.path);
  const schemaRoot = path.join(contractRoot, "schemas");

  const specificationRead = await readArtifact(specificationPath);
  const executableRead = await readArtifact(executablePath);
  const specificationBinding = binding(
    bindings.specification.sha256,
    specificationRead.observed,
  );
  const executableBinding = binding(bindings.executable.sha256, executableRead.observed);

  if (specificationBinding.binding !== "verified" || executableBinding.binding !== "verified") {
    const unavailable =
      specificationBinding.binding === "unavailable" || executableBinding.binding === "unavailable";
    diagnostics.push(
      contractDiagnostic(
        unavailable ? "contract-set.unavailable" : "contract-set.binding-mismatch",
        unavailable
          ? `The accepted NKF ${nkfVersion} authority pair is unavailable.`
          : `The observed NKF ${nkfVersion} authority pair does not match its accepted digests.`,
      ),
    );
  }

  const schemaReads = await Promise.all(
    bindings.schemas.map(async (schema) => ({
      ...schema,
      ...(await readArtifact(path.join(schemaRoot, schema.file))),
    })),
  );
  const schemaBindings: SchemaBinding[] = schemaReads.map((schema) => ({
    identity: schema.identity,
    ...binding(schema.sha256, schema.observed),
  }));
  for (const [index, schema] of schemaBindings.entries()) {
    if (schema.binding !== "verified") {
      const source = bindings.schemas[index];
      if (source === undefined) continue;
      diagnostics.push(
        contractDiagnostic(
          schema.binding === "unavailable" ? "schema.unavailable" : "schema.binding-mismatch",
          schema.binding === "unavailable"
            ? `Required schema ${schema.identity} is unavailable.`
            : `Schema ${schema.identity} does not match its accepted digest.`,
          `${bindings.executable.path.slice(0, -"nkf.yaml".length)}schemas/${source.file}`,
        ),
      );
    }
  }

  let executable: Record<string, any> = {};
  if (executableBinding.binding === "verified" && executableRead.bytes !== null) {
    try {
      const documents = YAML.parseAllDocuments(
        new TextDecoder("utf-8", { fatal: true }).decode(executableRead.bytes),
        { schema: "core", strict: true, uniqueKeys: true },
      );
      const document = documents.length === 1 ? documents[0] : undefined;
      if (document !== undefined && document.errors.length === 0) {
        executable = asObject(document.toJS({ maxAliasCount: 0 })) ?? {};
      }
    } catch {
      executable = {};
    }
    if (
      executable.contract !== "nkf.contract-set" ||
      executable.nkf_version !== nkfVersion ||
      executable.authority?.markdown_digest?.value !== bindings.specification.sha256
    ) {
      diagnostics.push(
        contractDiagnostic(
          "contract-set.binding-mismatch",
          "The executable contract identity or Markdown binding is inconsistent.",
        ),
      );
    }
  }

  const parsedSchemas = schemaReads.map((schema) =>
    schema.bytes !== null && schema.observed === schema.sha256 ? strictJson(schema.bytes) : null,
  );
  for (const [index, parsed] of parsedSchemas.entries()) {
    const accepted = bindings.schemas[index];
    const source = parsed?.["x-nkf-source"] as Record<string, any> | undefined;
    if (
      accepted !== undefined &&
      parsed !== null &&
      (parsed.$id !== accepted.identity ||
        source?.nkf_version !== nkfVersion ||
        source?.markdown_digest?.value !== bindings.specification.sha256 ||
        source?.executable_digest?.value !== bindings.executable.sha256)
    ) {
      diagnostics.push(
        contractDiagnostic(
          "schema.binding-mismatch",
          `Schema ${accepted.identity} has inconsistent source metadata.`,
          `${bindings.executable.path.slice(0, -"nkf.yaml".length)}schemas/${accepted.file}`,
        ),
      );
    }
  }

  const bundleSchema = parsedSchemas[0] ?? {};
  const recordSchema = parsedSchemas[1] ?? {};
  const resultSchema = parsedSchemas[2] ?? {};
  const AjvConstructor = Ajv2020 as unknown as new (options: Record<string, unknown>) => any;
  const addFormatSupport = addFormats as unknown as (instance: any) => void;
  const ajv = new AjvConstructor({ allErrors: true, strict: true, validateFormats: true });
  addFormatSupport(ajv);
  ajv.addKeyword({
    keyword: "x-nkf-source",
    schemaType: "object",
    valid: true,
  });
  const compile = (schema: Record<string, unknown>) => {
    try {
      return ajv.compile(schema);
    } catch {
      return Object.assign(() => false, { errors: [{ keyword: "compile" }] });
    }
  };
  const validateBundle = compile(bundleSchema);
  const validateRecord = compile(recordSchema);
  const validateResult = compile(resultSchema);

  const artifacts: ContractArtifacts = {
    core: {
      specification: specificationBinding,
      executable: executableBinding,
      schemas: schemaBindings,
    },
    extensions: [],
  };

  return {
    executable,
    schemas: { bundle: bundleSchema, record: recordSchema, result: resultSchema },
    artifacts,
    diagnostics,
    validators: {
      bundle: (value) => validateBundle(value),
      record: (value) => validateRecord(value),
      result: (value) => validateResult(value),
      bundleErrors: () => validateBundle.errors,
      recordErrors: () => validateRecord.errors,
      resultErrors: () => validateResult.errors,
    },
  };
}
