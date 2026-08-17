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
  const freshnessPolicyPath = bindings.freshnessPolicy === undefined
    ? null
    : path.join(repositoryRoot, bindings.freshnessPolicy.path);
  const schemaRoot = path.join(contractRoot, "schemas");

  const specificationRead = await readArtifact(specificationPath);
  const executableRead = await readArtifact(executablePath);
  const freshnessPolicyRead = freshnessPolicyPath === null
    ? null
    : await readArtifact(freshnessPolicyPath);
  const specificationBinding = binding(
    bindings.specification.sha256,
    specificationRead.observed,
  );
  const executableBinding = binding(bindings.executable.sha256, executableRead.observed);
  const freshnessPolicyBinding = bindings.freshnessPolicy === undefined
    ? undefined
    : binding(bindings.freshnessPolicy.sha256, freshnessPolicyRead?.observed ?? null);
  const versionDeltaPath = bindings.versionDelta === undefined
    ? null
    : path.join(repositoryRoot, bindings.versionDelta.path);
  const versionDeltaRead = versionDeltaPath === null ? null : await readArtifact(versionDeltaPath);
  const versionDeltaBinding = bindings.versionDelta === undefined
    ? undefined
    : binding(bindings.versionDelta.sha256, versionDeltaRead?.observed ?? null);

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
  if (versionDeltaBinding !== undefined && versionDeltaBinding.binding !== "verified") {
    diagnostics.push(
      contractDiagnostic(
        versionDeltaBinding.binding === "unavailable" ? "version-delta.unavailable" : "version-delta.binding-mismatch",
        versionDeltaBinding.binding === "unavailable"
          ? "The accepted version-delta declaration is unavailable."
          : "The version-delta declaration does not match its accepted digest.",
        bindings.versionDelta?.path,
      ),
    );
  }
  if (freshnessPolicyBinding !== undefined && freshnessPolicyBinding.binding !== "verified") {
    diagnostics.push(
      contractDiagnostic(
        freshnessPolicyBinding.binding === "unavailable"
          ? "contract-set.unavailable"
          : "contract-set.binding-mismatch",
        `The NKF ${nkfVersion} freshness policy is not bound to its accepted digest.`,
        bindings.freshnessPolicy?.path,
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
  let freshnessPolicy: Record<string, any> | null = null;
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
  if (
    freshnessPolicyBinding?.binding === "verified" &&
    freshnessPolicyRead?.bytes !== null &&
    freshnessPolicyRead?.bytes !== undefined
  ) {
    try {
      const documents = YAML.parseAllDocuments(
        new TextDecoder("utf-8", { fatal: true }).decode(freshnessPolicyRead.bytes),
        { schema: "core", strict: true, uniqueKeys: true },
      );
      const document = documents.length === 1 ? documents[0] : undefined;
      if (document !== undefined && document.errors.length === 0) {
        freshnessPolicy = asObject(document.toJS({ maxAliasCount: 0 }));
      }
    } catch {
      freshnessPolicy = null;
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

  const schemaByIdentity = (identity: string) => {
    const index = bindings.schemas.findIndex((schema) => schema.identity === identity);
    return index < 0 ? {} : parsedSchemas[index] ?? {};
  };
  const bundleSchema = schemaByIdentity(`urn:nkf:${nkfVersion}:schema:bundle`);
  const recordSchema = schemaByIdentity(`urn:nkf:${nkfVersion}:schema:record`);
  const baselineSchema = schemaByIdentity(`urn:nkf:${nkfVersion}:schema:graph-baseline`);
  const receiptSchema = schemaByIdentity(`urn:nkf:${nkfVersion}:schema:freshness-receipt`);
  const policySchema = schemaByIdentity(`urn:nkf:${nkfVersion}:schema:freshness-policy`);
  const resultSchema = schemaByIdentity(`urn:nkf:${nkfVersion}:schema:validation-result`);
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
  const validateBaseline = compile(baselineSchema);
  const validateReceipt = compile(receiptSchema);
  const validatePolicy = compile(policySchema);
  const validateResult = compile(resultSchema);
  if (freshnessPolicy !== null && !validatePolicy(freshnessPolicy)) {
    diagnostics.push({
      rule_id: "schema.freshness-policy.invalid",
      severity: "error",
      blocking: "conformance",
      phase: "schema",
      message: "The accepted freshness policy violates its derived Schema.",
      ...(bindings.freshnessPolicy?.path === undefined ? {} : { artifact: bindings.freshnessPolicy.path }),
    });
  }

  // The accepted per-rule version delta must classify the complete current
  // registry with the closed classification vocabulary.
  if (
    bindings.versionDelta !== undefined &&
    versionDeltaBinding?.binding === "verified" &&
    versionDeltaRead?.bytes !== null &&
    versionDeltaRead?.bytes !== undefined
  ) {
    let versionDelta: Record<string, any> | null = null;
    try {
      versionDelta = asObject(YAML.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(versionDeltaRead.bytes),
        { schema: "core", strict: true, uniqueKeys: true },
      ));
    } catch {
      versionDelta = null;
    }
    const declaredRules = asObject(versionDelta?.rules) ?? {};
    const classifications = new Set(["identical", "mechanically-transformable", "semantically-new"]);
    const registryIds = executableBinding.binding === "verified"
      ? Object.keys(asObject(executable.diagnostics)?.rules ?? {})
      : [];
    for (const [ruleId, entry] of registryIds.length === 0 ? [] : Object.entries(declaredRules)) {
      const classification = asObject(entry)?.classification;
      if (typeof classification !== "string" || !classifications.has(classification) || !registryIds.includes(ruleId)) {
        diagnostics.push({
          rule_id: "version-delta.classification-invalid",
          severity: "error",
          blocking: "conformance",
          phase: "contracts",
          message: `The version-delta classification for ${ruleId} is not one closed classification of one accepted rule.`,
          ...(bindings.versionDelta?.path === undefined ? {} : { artifact: bindings.versionDelta.path }),
        });
      }
    }
    const missingRules = registryIds.filter((ruleId) => declaredRules[ruleId] === undefined);
    if (registryIds.length > 0 && missingRules.length > 0) {
      diagnostics.push({
        rule_id: "version-delta.coverage-incomplete",
        severity: "error",
        blocking: "conformance",
        phase: "contracts",
        message: `The version-delta declaration does not classify every accepted rule: ${missingRules.slice(0, 5).join(", ")}${missingRules.length > 5 ? ", …" : ""}.`,
        ...(bindings.versionDelta?.path === undefined ? {} : { artifact: bindings.versionDelta.path }),
      });
    }
  }

  const artifacts: ContractArtifacts = {
    core: {
      specification: specificationBinding,
      executable: executableBinding,
      ...(freshnessPolicyBinding === undefined ? {} : { freshness_policy: freshnessPolicyBinding }),
      ...(versionDeltaBinding === undefined ? {} : { version_delta: versionDeltaBinding }),
      schemas: schemaBindings,
    },
    extensions: [],
  };

  return {
    executable,
    freshnessPolicy,
    schemas: {
      bundle: bundleSchema,
      record: recordSchema,
      baseline: baselineSchema,
      receipt: receiptSchema,
      policy: policySchema,
      result: resultSchema,
    },
    artifacts,
    diagnostics,
    validators: {
      bundle: (value) => validateBundle(value),
      record: (value) => validateRecord(value),
      baseline: (value) => validateBaseline(value),
      receipt: (value) => validateReceipt(value),
      policy: (value) => validatePolicy(value),
      result: (value) => validateResult(value),
      bundleErrors: () => validateBundle.errors,
      recordErrors: () => validateRecord.errors,
      baselineErrors: () => validateBaseline.errors,
      receiptErrors: () => validateReceipt.errors,
      policyErrors: () => validatePolicy.errors,
      resultErrors: () => validateResult.errors,
    },
  };
}
