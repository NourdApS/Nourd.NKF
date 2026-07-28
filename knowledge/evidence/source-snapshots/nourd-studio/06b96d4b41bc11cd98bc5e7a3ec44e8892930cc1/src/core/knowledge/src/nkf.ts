import { execFileSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";
import { fileURLToPath } from "node:url";

import {
  Ajv2020,
  type ErrorObject,
  type ValidateFunction,
} from "ajv/dist/2020.js";
import { parse, stringify } from "yaml";

import {
  headingPathKey,
  normalizeHeading,
  parseHeadings,
} from "./markdown.js";
import type {
  LoadedNkfRecord,
  NkfBundle,
  NkfContractSet,
  NkfEntityReference,
  NkfLoadResult,
  NkfRecord,
  NkfValidationOptions,
} from "./nkf-types.js";
import type {
  KnowledgeDiagnostic,
  ValidationResult,
} from "./types.js";

const defaultManifestPath = path.join(".nourd", "knowledge", "bundle.yaml");
const utf8Decoder = new TextDecoder("utf-8", { fatal: true });

interface NkfValidators {
  validateBundle: ValidateFunction;
  validateRecord: ValidateFunction;
}

interface NkfRuntimeContracts {
  directory: string;
  contractSet: NkfContractSet;
  validators: NkfValidators;
}

interface BaseNkfRecord {
  descriptorPath: string;
  descriptorBytes: Buffer;
  record: NkfRecord;
  sourceBytes?: Buffer;
}

interface BaseNkfSnapshot {
  revision: string;
  recordsById: Map<string, BaseNkfRecord>;
}

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function add(
  diagnostics: KnowledgeDiagnostic[],
  diagnostic: KnowledgeDiagnostic,
): void {
  diagnostics.push(diagnostic);
}

function isWithin(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return (
    relative === "" ||
    (!relative.startsWith("..") && !path.isAbsolute(relative))
  );
}

function repositoryPath(repositoryRoot: string, absolutePath: string): string {
  const root = existsSync(repositoryRoot)
    ? realpathSync.native(repositoryRoot)
    : path.resolve(repositoryRoot);
  const candidate = existsSync(absolutePath)
    ? realpathSync.native(absolutePath)
    : path.resolve(absolutePath);
  return path
    .relative(root, candidate)
    .split(path.sep)
    .join("/");
}

function normalizeRepositoryPath(value: string): string {
  return path.posix.normalize(value.replaceAll("\\", "/")).replace(/^\.\//, "");
}

function decodeUtf8(
  bytes: Buffer,
  diagnostics: KnowledgeDiagnostic[],
  rule: string,
  sourcePath: string,
  recordId?: string,
): string | undefined {
  try {
    return utf8Decoder.decode(bytes);
  } catch {
    add(diagnostics, {
      rule,
      severity: "error",
      category: "structural",
      message: "Content is not valid UTF-8.",
      ...(recordId ? { record_id: recordId } : {}),
      source_path: sourcePath,
    });
    return undefined;
  }
}

function resolveContainedPath(
  repositoryRoot: string,
  baseDirectory: string,
  relativePath: string,
  diagnostics: KnowledgeDiagnostic[],
  rule: string,
  allowedRoot = repositoryRoot,
): string | undefined {
  const repository = existsSync(repositoryRoot)
    ? realpathSync.native(repositoryRoot)
    : path.resolve(repositoryRoot);
  const allowed = existsSync(allowedRoot)
    ? realpathSync.native(allowedRoot)
    : path.resolve(allowedRoot);
  const base = existsSync(baseDirectory)
    ? realpathSync.native(baseDirectory)
    : path.resolve(baseDirectory);
  const lexical = path.resolve(base, relativePath);

  if (!isWithin(repository, lexical) || !isWithin(allowed, lexical)) {
    add(diagnostics, {
      rule,
      severity: "error",
      category: "structural",
      message: `Path escapes its declared distribution boundary: ${relativePath}`,
      source_path: relativePath,
    });
    return undefined;
  }

  if (!existsSync(lexical)) {
    return lexical;
  }

  try {
    const realRepository = realpathSync.native(repository);
    const realAllowed = realpathSync.native(allowed);
    const realCandidate = realpathSync.native(lexical);
    if (
      !isWithin(realRepository, realCandidate) ||
      !isWithin(realAllowed, realCandidate)
    ) {
      add(diagnostics, {
        rule,
        severity: "error",
        category: "structural",
        message: `Resolved path escapes its declared distribution boundary: ${relativePath}`,
        source_path: relativePath,
      });
      return undefined;
    }
    return realCandidate;
  } catch (error) {
    add(diagnostics, {
      rule,
      severity: "error",
      category: "structural",
      message: `Cannot resolve path ${relativePath}: ${String(error)}`,
      source_path: relativePath,
    });
    return undefined;
  }
}

function runtimeContractDirectory(): string {
  const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.join(currentDirectory, "contracts", "nkf", "0.1"),
    path.join(currentDirectory, "..", "contracts", "nkf", "0.1"),
  ];
  const directory = candidates.find((candidate) =>
    existsSync(path.join(candidate, "contract-set.json")),
  );
  if (!directory) {
    throw new Error(
      `Cannot locate packaged NKF 0.1 contracts from ${currentDirectory}`,
    );
  }
  return directory;
}

function schemaErrors(
  prefix: string,
  errors: ErrorObject[] | null | undefined,
): string {
  return (errors ?? [])
    .map((error) => `${prefix}${error.instancePath || "/"} ${error.message}`)
    .join("; ");
}

function loadRuntimeContracts(): NkfRuntimeContracts {
  const directory = runtimeContractDirectory();
  const contractSet = JSON.parse(
    readFileSync(path.join(directory, "contract-set.json"), "utf8"),
  ) as NkfContractSet;
  const bundleSchema = JSON.parse(
    readFileSync(path.join(directory, "bundle.schema.json"), "utf8"),
  ) as object;
  const recordSchema = JSON.parse(
    readFileSync(path.join(directory, "record.schema.json"), "utf8"),
  ) as object;
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  ajv.addFormat("date", /^\d{4}-\d{2}-\d{2}$/);
  ajv.addFormat(
    "date-time",
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
  );
  return {
    directory,
    contractSet,
    validators: {
      validateBundle: ajv.compile(bundleSchema),
      validateRecord: ajv.compile(recordSchema),
    },
  };
}

function parseYamlBytes(
  bytes: Buffer,
  diagnostics: KnowledgeDiagnostic[],
  parseRule: string,
  utf8Rule: string,
  sourcePath: string,
): unknown {
  const text = decodeUtf8(bytes, diagnostics, utf8Rule, sourcePath);
  if (text === undefined) {
    return undefined;
  }
  try {
    return parse(text);
  } catch (error) {
    add(diagnostics, {
      rule: parseRule,
      severity: "error",
      category: "structural",
      message: `Cannot parse YAML: ${String(error)}`,
      source_path: sourcePath,
    });
    return undefined;
  }
}

function walkFiles(
  root: string,
  repositoryRoot: string,
  diagnostics: KnowledgeDiagnostic[],
  symlinkRule: string,
): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const candidate = path.join(root, entry.name);
    if (entry.isSymbolicLink()) {
      const resolved = resolveContainedPath(
        repositoryRoot,
        path.dirname(candidate),
        entry.name,
        diagnostics,
        symlinkRule,
        root,
      );
      if (!resolved) {
        continue;
      }
      const resolvedStat = statSync(resolved);
      if (resolvedStat.isDirectory()) {
        add(diagnostics, {
          rule: symlinkRule,
          severity: "error",
          category: "structural",
          message: `Directory symlinks are not traversed: ${repositoryPath(repositoryRoot, candidate)}`,
          source_path: repositoryPath(repositoryRoot, candidate),
        });
      } else if (resolvedStat.isFile()) {
        files.push(candidate);
      }
      continue;
    }
    if (entry.isDirectory()) {
      files.push(...walkFiles(candidate, repositoryRoot, diagnostics, symlinkRule));
    } else if (entry.isFile()) {
      files.push(candidate);
    }
  }
  return files;
}

function scanSecretMaterial(
  text: string,
  diagnostics: KnowledgeDiagnostic[],
  sourcePath: string,
  recordId?: string,
): void {
  const patterns = [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /\bAKIA[0-9A-Z]{16}\b/,
    /\bgh[pousr]_[A-Za-z0-9]{36,}\b/,
    /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/,
  ];
  if (patterns.some((pattern) => pattern.test(text))) {
    add(diagnostics, {
      rule: "security.secret-material",
      severity: "error",
      category: "security",
      message:
        "The bundle contains material matching a high-confidence credential or private-key pattern.",
      ...(recordId ? { record_id: recordId } : {}),
      source_path: sourcePath,
      remediation:
        "Remove the secret from the bundle, rotate it when applicable, and retain only a safe authority locator.",
    });
  }
}

function validateRequiredExtensions(
  required: string[] | undefined,
  extensions: Record<string, unknown> | undefined,
  supported: Set<string>,
  diagnostics: KnowledgeDiagnostic[],
  sourcePath: string,
  recordId?: string,
): void {
  for (const contract of required ?? []) {
    if (!supported.has(contract)) {
      add(diagnostics, {
        rule: "extension.required-unsupported",
        severity: "error",
        category: "contract",
        message: `Required extension is unsupported: ${contract}`,
        ...(recordId ? { record_id: recordId } : {}),
        source_path: sourcePath,
      });
      continue;
    }
    if (!Object.hasOwn(extensions ?? {}, contract)) {
      add(diagnostics, {
        rule: "extension.required-missing",
        severity: "error",
        category: "contract",
        message: `Required extension has no declaration payload: ${contract}`,
        ...(recordId ? { record_id: recordId } : {}),
        source_path: sourcePath,
      });
    }
  }
}

function loadNkfKnowledge(
  repositoryRoot: string,
  options: NkfValidationOptions,
): NkfLoadResult {
  const diagnostics: KnowledgeDiagnostic[] = [];
  const manifestRelative = normalizeRepositoryPath(
    options.manifestPath ?? defaultManifestPath,
  );
  const manifestPath =
    resolveContainedPath(
      repositoryRoot,
      repositoryRoot,
      manifestRelative,
      diagnostics,
      "bundle.manifest-path",
    ) ?? path.resolve(repositoryRoot, manifestRelative);
  const result: NkfLoadResult = {
    repositoryRoot,
    manifestPath,
    records: [],
    diagnostics,
  };

  let runtime: NkfRuntimeContracts;
  try {
    runtime = loadRuntimeContracts();
    result.contractSet = runtime.contractSet;
  } catch (error) {
    add(diagnostics, {
      rule: "contract.load",
      severity: "error",
      category: "contract",
      message: `Cannot load packaged NKF contracts: ${String(error)}`,
    });
    return result;
  }

  if (!existsSync(manifestPath) || !lstatSync(manifestPath).isFile()) {
    add(diagnostics, {
      rule: "bundle.manifest-exists",
      severity: "error",
      category: "structural",
      message: `Bundle manifest does not exist: ${manifestRelative}`,
      source_path: manifestRelative,
    });
    return result;
  }

  const manifestBytes = readFileSync(manifestPath);
  const manifestText = decodeUtf8(
    manifestBytes,
    diagnostics,
    "bundle.utf8",
    manifestRelative,
  );
  if (manifestText) {
    scanSecretMaterial(manifestText, diagnostics, manifestRelative);
  }
  const rawBundle = parseYamlBytes(
    manifestBytes,
    diagnostics,
    "bundle.parse",
    "bundle.utf8",
    manifestRelative,
  );
  if (rawBundle === undefined) {
    return result;
  }
  if (!runtime.validators.validateBundle(rawBundle)) {
    add(diagnostics, {
      rule: "bundle.contract",
      severity: "error",
      category: "structural",
      message: schemaErrors("Bundle ", runtime.validators.validateBundle.errors),
      source_path: manifestRelative,
    });
    return result;
  }

  const bundle = rawBundle as NkfBundle;
  result.bundle = bundle;
  const manifestDirectory = path.dirname(manifestPath);
  const markdownRoot = resolveContainedPath(
    repositoryRoot,
    manifestDirectory,
    bundle.markdown_root,
    diagnostics,
    "bundle.markdown-root",
  );
  const recordsRoot = resolveContainedPath(
    repositoryRoot,
    manifestDirectory,
    bundle.records_root,
    diagnostics,
    "bundle.records-root",
  );
  if (
    !markdownRoot ||
    !existsSync(markdownRoot) ||
    !statSync(markdownRoot).isDirectory()
  ) {
    add(diagnostics, {
      rule: "bundle.markdown-root",
      severity: "error",
      category: "structural",
      message: `Markdown root is not a directory: ${bundle.markdown_root}`,
      source_path: manifestRelative,
    });
  } else {
    result.markdownRoot = markdownRoot;
  }
  if (
    !recordsRoot ||
    !existsSync(recordsRoot) ||
    !statSync(recordsRoot).isDirectory()
  ) {
    add(diagnostics, {
      rule: "bundle.records-root",
      severity: "error",
      category: "structural",
      message: `Records root is not a directory: ${bundle.records_root}`,
      source_path: manifestRelative,
    });
    return result;
  }
  result.recordsRoot = recordsRoot;

  for (const descriptorPath of walkFiles(
    recordsRoot,
    repositoryRoot,
    diagnostics,
    "record.descriptor-symlink",
  ).sort()) {
    const descriptorRelative = repositoryPath(repositoryRoot, descriptorPath);
    if (!/\.ya?ml$/i.test(descriptorPath)) {
      add(diagnostics, {
        rule: "record.descriptor-extension",
        severity: "error",
        category: "structural",
        message: "Every file in the records root must be a YAML declaration.",
        source_path: descriptorRelative,
      });
      continue;
    }
    const descriptorBytes = readFileSync(descriptorPath);
    const descriptorText = decodeUtf8(
      descriptorBytes,
      diagnostics,
      "record.descriptor-utf8",
      descriptorRelative,
    );
    if (descriptorText) {
      scanSecretMaterial(descriptorText, diagnostics, descriptorRelative);
    }
    const rawRecord = parseYamlBytes(
      descriptorBytes,
      diagnostics,
      "record.parse",
      "record.descriptor-utf8",
      descriptorRelative,
    );
    if (rawRecord === undefined) {
      continue;
    }
    if (!runtime.validators.validateRecord(rawRecord)) {
      add(diagnostics, {
        rule: "record.contract",
        severity: "error",
        category: "structural",
        message: schemaErrors(
          `${path.basename(descriptorPath)} `,
          runtime.validators.validateRecord.errors,
        ),
        source_path: descriptorRelative,
      });
      continue;
    }
    result.records.push({
      descriptorPath,
      descriptorBytes,
      record: rawRecord as NkfRecord,
    });
  }

  return result;
}

function entityKey(reference: NkfEntityReference): string {
  return `${reference.record}\u001e${reference.entity}`;
}

function validateHierarchy(
  recordsById: Map<string, LoadedNkfRecord>,
  diagnostics: KnowledgeDiagnostic[],
  productId: string,
): void {
  const parents = new Map<string, string[]>();
  for (const { record } of recordsById.values()) {
    parents.set(
      record.id,
      record.relationships
        .filter(({ type }) => type === "part-of")
        .map(({ target }) => target),
    );
  }

  for (const { record } of recordsById.values()) {
    const recordParents = parents.get(record.id) ?? [];
    if (record.type === "product" && recordParents.length > 0) {
      add(diagnostics, {
        rule: "hierarchy.product-parent",
        severity: "error",
        category: "structural",
        message: "The Product root cannot be part of another record.",
        record_id: record.id,
        source_path: record.source.path,
      });
    } else if (record.type === "domain") {
      if (recordParents.length !== 1) {
        add(diagnostics, {
          rule: "hierarchy.domain-parent",
          severity: "error",
          category: "structural",
          message: `A Domain requires exactly one part-of parent; found ${recordParents.length}.`,
          record_id: record.id,
          source_path: record.source.path,
        });
      } else {
        const parent = recordsById.get(recordParents[0]!)?.record;
        if (!parent || !["product", "domain"].includes(parent.type)) {
          add(diagnostics, {
            rule: "hierarchy.domain-parent-type",
            severity: "error",
            category: "structural",
            message: "A Domain parent must be the Product or another Domain.",
            record_id: record.id,
            source_path: record.source.path,
          });
        }
      }
    } else if (record.type === "capability") {
      if (recordParents.length !== 1) {
        add(diagnostics, {
          rule: "hierarchy.capability-parent",
          severity: "error",
          category: "structural",
          message: `A Capability requires exactly one Domain parent; found ${recordParents.length}.`,
          record_id: record.id,
          source_path: record.source.path,
        });
      } else if (recordsById.get(recordParents[0]!)?.record.type !== "domain") {
        add(diagnostics, {
          rule: "hierarchy.capability-parent-type",
          severity: "error",
          category: "structural",
          message: "A Capability part-of target must be a Domain.",
          record_id: record.id,
          source_path: record.source.path,
        });
      }
    } else if (recordParents.length > 0) {
      add(diagnostics, {
        rule: "hierarchy.unsupported-participation",
        severity: "error",
        category: "structural",
        message: `${record.type} is not defined as a part-of hierarchy participant by its NKF 0.1 body contract.`,
        record_id: record.id,
        source_path: record.source.path,
      });
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const reachesProduct = new Map<string, boolean>();
  const visit = (recordId: string): boolean => {
    if (reachesProduct.has(recordId)) {
      return reachesProduct.get(recordId)!;
    }
    if (visiting.has(recordId)) {
      add(diagnostics, {
        rule: "hierarchy.part-of-cycle",
        severity: "error",
        category: "structural",
        message: `part-of cycle includes ${recordId}.`,
        record_id: recordId,
      });
      return false;
    }
    if (recordId === productId) {
      reachesProduct.set(recordId, true);
      return true;
    }
    visiting.add(recordId);
    const result = (parents.get(recordId) ?? []).some((parent) => visit(parent));
    visiting.delete(recordId);
    visited.add(recordId);
    reachesProduct.set(recordId, result);
    return result;
  };

  for (const { record } of recordsById.values()) {
    if (["domain", "capability"].includes(record.type) && !visit(record.id)) {
      add(diagnostics, {
        rule: "hierarchy.product-reachability",
        severity: "error",
        category: "structural",
        message: `${record.type} does not reach the unique Product root through part-of.`,
        record_id: record.id,
        source_path: record.source.path,
      });
    }
  }
  void visited;
}

function gitRevision(repositoryRoot: string): string | undefined {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: repositoryRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return undefined;
  }
}

function gitFile(
  repositoryRoot: string,
  revision: string,
  repositoryRelativePath: string,
): Buffer {
  return execFileSync(
    "git",
    ["show", `${revision}:${normalizeRepositoryPath(repositoryRelativePath)}`],
    {
      cwd: repositoryRoot,
      encoding: "buffer",
      maxBuffer: 32 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    },
  );
}

function gitPaths(
  repositoryRoot: string,
  revision: string,
  repositoryRelativeRoot: string,
): string[] {
  const output = execFileSync(
    "git",
    [
      "ls-tree",
      "-r",
      "--name-only",
      revision,
      "--",
      normalizeRepositoryPath(repositoryRelativeRoot),
    ],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    },
  );
  return output
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
}

function loadBaseSnapshot(
  repositoryRoot: string,
  baseRef: string,
  manifestRelative: string,
  diagnostics: KnowledgeDiagnostic[],
): BaseNkfSnapshot | undefined {
  let revision: string;
  try {
    revision = execFileSync(
      "git",
      ["rev-parse", "--verify", `${baseRef}^{commit}`],
      {
        cwd: repositoryRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
  } catch {
    add(diagnostics, {
      rule: "profile.base-ref",
      severity: "error",
      category: "profile",
      message: `Accepted base cannot be resolved: ${baseRef}`,
      remediation: "Provide an exact available accepted Git ref.",
    });
    return undefined;
  }

  try {
    const manifestBytes = gitFile(repositoryRoot, revision, manifestRelative);
    const rawBundle = parse(utf8Decoder.decode(manifestBytes)) as NkfBundle;
    const recordsRoot = path.posix.normalize(
      path.posix.join(
        path.posix.dirname(manifestRelative),
        rawBundle.records_root,
      ),
    );
    if (recordsRoot.startsWith("../") || path.posix.isAbsolute(recordsRoot)) {
      throw new Error("accepted-base records_root escapes the repository");
    }
    const recordsById = new Map<string, BaseNkfRecord>();
    for (const descriptorPath of gitPaths(
      repositoryRoot,
      revision,
      recordsRoot,
    ).filter((candidate) => /\.ya?ml$/i.test(candidate))) {
      const descriptorBytes = gitFile(
        repositoryRoot,
        revision,
        descriptorPath,
      );
      const record = parse(utf8Decoder.decode(descriptorBytes)) as NkfRecord;
      if (!record.id || !record.source?.path || !record.governance?.status) {
        throw new Error(`incomplete accepted-base record ${descriptorPath}`);
      }
      let sourceBytes: Buffer | undefined;
      try {
        sourceBytes = gitFile(repositoryRoot, revision, record.source.path);
      } catch {
        sourceBytes = undefined;
      }
      recordsById.set(record.id, {
        descriptorPath,
        descriptorBytes,
        record,
        ...(sourceBytes ? { sourceBytes } : {}),
      });
    }
    return { revision, recordsById };
  } catch (error) {
    add(diagnostics, {
      rule: "profile.base-load",
      severity: "error",
      category: "profile",
      message: `Cannot load accepted NKF base ${baseRef}: ${String(error)}`,
    });
    return undefined;
  }
}

function validateAcceptanceSource(
  repositoryRoot: string,
  record: NkfRecord,
  diagnostics: KnowledgeDiagnostic[],
): void {
  if (record.governance.status !== "accepted") {
    return;
  }
  const acceptanceSource = record.governance.acceptance_source;
  if (!acceptanceSource) {
    add(diagnostics, {
      rule: "profile.acceptance-source-required",
      severity: "error",
      category: "profile",
      message:
        "The Nourd repository profile requires accepted records to identify their proposal revision.",
      record_id: record.id,
      source_path: record.source.path,
    });
    return;
  }
  try {
    execFileSync(
      "git",
      [
        "rev-parse",
        "--verify",
        `${acceptanceSource.proposal_revision}^{commit}`,
      ],
      {
        cwd: repositoryRoot,
        stdio: ["ignore", "ignore", "ignore"],
      },
    );
  } catch {
    add(diagnostics, {
      rule: "profile.acceptance-source-resolves",
      severity: "error",
      category: "profile",
      message: `Acceptance proposal revision does not resolve: ${acceptanceSource.proposal_revision}`,
      record_id: record.id,
      source_path: record.source.path,
    });
  }
}

function applyBaseAuthority(
  repositoryRoot: string,
  baseSnapshot: BaseNkfSnapshot,
  records: LoadedNkfRecord[],
  diagnostics: KnowledgeDiagnostic[],
): Set<string> {
  const proposalRecords = new Set<string>();
  const currentById = new Map(records.map((record) => [record.record.id, record]));

  for (const loaded of records) {
    const current = loaded.record;
    const base = baseSnapshot.recordsById.get(current.id);
    validateAcceptanceSource(repositoryRoot, current, diagnostics);
    if (!base) {
      if (current.governance.status === "accepted") {
        add(diagnostics, {
          rule: "profile.new-record-accepted",
          severity: "error",
          category: "profile",
          message:
            "A new record cannot inherit accepted authority without an accepted-base revision.",
          record_id: current.id,
          source_path: current.source.path,
        });
      } else {
        proposalRecords.add(current.id);
      }
      continue;
    }

    const changed =
      !loaded.descriptorBytes.equals(base.descriptorBytes) ||
      !loaded.sourceBytes?.equals(base.sourceBytes ?? Buffer.alloc(0));
    const baseAccepted = base.record.governance.status === "accepted";
    if (
      baseAccepted &&
      base.record.type === "decision" &&
      base.record.governance.lifecycle === "immutable" &&
      changed
    ) {
      add(diagnostics, {
        rule: "profile.decision-immutable",
        severity: "error",
        category: "profile",
        message: `Accepted Decision differs from base ${baseSnapshot.revision}.`,
        record_id: current.id,
        source_path: current.source.path,
      });
    } else if (baseAccepted && changed) {
      proposalRecords.add(current.id);
    } else if (!baseAccepted && current.governance.status === "accepted") {
      add(diagnostics, {
        rule: "profile.unaccepted-promotion",
        severity: "error",
        category: "profile",
        message:
          "Accepted status is not supported by the accepted Git base.",
        record_id: current.id,
        source_path: current.source.path,
      });
    } else if (changed) {
      proposalRecords.add(current.id);
    }
  }

  for (const [recordId, base] of baseSnapshot.recordsById) {
    if (
      base.record.governance.status === "accepted" &&
      !currentById.has(recordId)
    ) {
      add(diagnostics, {
        rule: "profile.accepted-record-removed",
        severity: "error",
        category: "profile",
        message: `Accepted-base record is missing: ${recordId}`,
        record_id: recordId,
        source_path: base.record.source.path,
      });
    }
  }

  return proposalRecords;
}

function proposalDigest(
  baseRevision: string,
  records: LoadedNkfRecord[],
  proposalRecords: Set<string>,
): string {
  const content = records
    .filter(({ record }) => proposalRecords.has(record.id))
    .map((loaded) => ({
      id: loaded.record.id,
      descriptor_digest: sha256(loaded.descriptorBytes),
      source_digest: loaded.sourceBytes ? sha256(loaded.sourceBytes) : null,
      source_path: loaded.record.source.path,
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
  return sha256(
    Buffer.from(
      JSON.stringify({ base_revision: baseRevision, records: content }),
      "utf8",
    ),
  );
}

export function validateNkfKnowledge(
  repositoryRoot: string,
  options: NkfValidationOptions = {},
): ValidationResult {
  const startedAt = new Date().toISOString();
  const loaded = loadNkfKnowledge(repositoryRoot, options);
  const diagnostics = loaded.diagnostics;
  const recordsById = new Map<string, LoadedNkfRecord>();
  const recordsBySource = new Map<string, LoadedNkfRecord>();
  const entityDefinitions = new Map<string, { recordId: string; sourcePath: string }>();
  const supportedExtensions = new Set(
    loaded.contractSet?.supported_extensions ?? [],
  );

  if (loaded.bundle && loaded.contractSet) {
    validateRequiredExtensions(
      loaded.bundle.required_extensions,
      loaded.bundle.extensions,
      supportedExtensions,
      diagnostics,
      repositoryPath(repositoryRoot, loaded.manifestPath),
    );
  }

  for (const loadedRecord of loaded.records) {
    const { record, descriptorPath } = loadedRecord;
    const descriptorRelative = repositoryPath(repositoryRoot, descriptorPath);
    const filename = path.basename(descriptorPath).replace(/\.ya?ml$/i, "");
    if (filename !== record.id) {
      add(diagnostics, {
        rule: "record.filename-convention",
        severity: "warning",
        category: "structural",
        message: `Declaration filename ${filename} does not follow the recommended record ID convention ${record.id}.`,
        record_id: record.id,
        source_path: descriptorRelative,
      });
    }
    if (recordsById.has(record.id)) {
      add(diagnostics, {
        rule: "record.identity-unique",
        severity: "error",
        category: "structural",
        message: `Duplicate record identity: ${record.id}`,
        record_id: record.id,
        source_path: descriptorRelative,
      });
    } else {
      recordsById.set(record.id, loadedRecord);
    }
    const normalizedSource = normalizeRepositoryPath(record.source.path);
    if (recordsBySource.has(normalizedSource)) {
      add(diagnostics, {
        rule: "record.source-unique",
        severity: "error",
        category: "structural",
        message: `Multiple declarations bind the same Markdown source: ${normalizedSource}`,
        record_id: record.id,
        source_path: normalizedSource,
      });
    } else {
      recordsBySource.set(normalizedSource, loadedRecord);
    }

    const sourcePath =
      loaded.markdownRoot &&
      resolveContainedPath(
        repositoryRoot,
        repositoryRoot,
        normalizedSource,
        diagnostics,
        "record.source-path",
        loaded.markdownRoot,
      );
    if (
      !sourcePath ||
      !existsSync(sourcePath) ||
      !statSync(sourcePath).isFile()
    ) {
      add(diagnostics, {
        rule: "record.source-exists",
        severity: "error",
        category: "structural",
        message: `Canonical Markdown source does not exist: ${normalizedSource}`,
        record_id: record.id,
        source_path: normalizedSource,
      });
      continue;
    }
    if (path.extname(sourcePath).toLowerCase() !== ".md") {
      add(diagnostics, {
        rule: "record.source-markdown",
        severity: "error",
        category: "structural",
        message: "Canonical record sources must be Markdown files.",
        record_id: record.id,
        source_path: normalizedSource,
      });
    }
    const sourceBytes = readFileSync(sourcePath);
    loadedRecord.sourceBytes = sourceBytes;
    const markdown = decodeUtf8(
      sourceBytes,
      diagnostics,
      "record.source-utf8",
      normalizedSource,
      record.id,
    );
    if (markdown === undefined) {
      continue;
    }
    scanSecretMaterial(markdown, diagnostics, normalizedSource, record.id);
    const actualDigest = sha256(sourceBytes);
    if (actualDigest !== record.source.digest.value) {
      add(diagnostics, {
        rule: "record.source-digest",
        severity: "error",
        category: "structural",
        message: `Source digest mismatch; expected ${record.source.digest.value}, calculated ${actualDigest}.`,
        record_id: record.id,
        source_path: normalizedSource,
        remediation: `Run knowledge reconcile --record ${record.id}.`,
      });
    }

    const headings = parseHeadings(markdown);
    const titles = headings.filter(({ level }) => level === 1);
    if (titles.length !== 1) {
      add(diagnostics, {
        rule: "record.h1-count",
        severity: "error",
        category: "structural",
        message: `Canonical Markdown requires exactly one H1; found ${titles.length}.`,
        record_id: record.id,
        source_path: normalizedSource,
      });
    }
    if (
      !titles[0]?.title ||
      titles[0].title !== normalizeHeading(record.title)
    ) {
      add(diagnostics, {
        rule: "record.title",
        severity: "error",
        category: "structural",
        message: `Declared title does not match the Markdown H1: ${titles[0]?.title ?? "missing H1"}.`,
        record_id: record.id,
        source_path: normalizedSource,
      });
    }

    const semanticHeadings = headings.filter(
      ({ level }) => level === 2 || level === 3,
    );
    const headingKeys = new Set(
      semanticHeadings.map(
        ({ path: headingPath, occurrence }) =>
          `${headingPathKey(headingPath)}\u001e${occurrence}`,
      ),
    );
    const mappedHeadingKeys = new Set<string>();
    const sectionIds = new Set<string>();
    const responsibilityCoverage = new Set<string>();
    const bodyContract = loaded.contractSet?.body_contracts[record.body_contract];

    if (!bodyContract) {
      add(diagnostics, {
        rule: "body-contract.unsupported",
        severity: "error",
        category: "contract",
        message: `Unsupported body contract: ${record.body_contract}`,
        record_id: record.id,
        source_path: normalizedSource,
      });
    } else if (bodyContract.type !== record.type) {
      add(diagnostics, {
        rule: "body-contract.type",
        severity: "error",
        category: "contract",
        message: `Body contract ${record.body_contract} belongs to ${bodyContract.type}, not ${record.type}.`,
        record_id: record.id,
        source_path: normalizedSource,
      });
    }

    const allowedResponsibilities = new Set([
      ...(bodyContract?.required_responsibilities ?? []),
      ...(bodyContract?.optional_responsibilities ?? []),
    ]);
    const allowedRoles = new Set(bodyContract?.allowed_roles ?? []);
    const sectionAuthorities = new Set(
      loaded.contractSet?.section_authorities ?? [],
    );

    for (const section of record.sections) {
      if (sectionIds.has(section.id)) {
        add(diagnostics, {
          rule: "section.identity-unique",
          severity: "error",
          category: "structural",
          message: `Duplicate section identity: ${section.id}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      sectionIds.add(section.id);
      const key = `${headingPathKey(section.heading_path)}\u001e${section.occurrence}`;
      if (!headingKeys.has(key)) {
        add(diagnostics, {
          rule: "section.heading-resolves",
          severity: "error",
          category: "structural",
          message: `Section ${section.id} does not resolve ${section.heading_path.join(" > ")} occurrence ${section.occurrence}.`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      if (mappedHeadingKeys.has(key)) {
        add(diagnostics, {
          rule: "section.heading-unique",
          severity: "error",
          category: "structural",
          message: `Heading occurrence is mapped more than once: ${section.heading_path.join(" > ")} #${section.occurrence}.`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      mappedHeadingKeys.add(key);
      if (!sectionAuthorities.has(section.authority)) {
        add(diagnostics, {
          rule: "section.authority-supported",
          severity: "error",
          category: "contract",
          message: `Unsupported section authority: ${section.authority}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      if (!allowedRoles.has(section.role)) {
        add(diagnostics, {
          rule: "section.role-supported",
          severity: "error",
          category: "contract",
          message: `Role ${section.role} is unsupported by ${record.body_contract}.`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      if (section.role === "unresolved" && section.authority !== "unresolved") {
        add(diagnostics, {
          rule: "section.unresolved-authority",
          severity: "error",
          category: "contract",
          message: `Unresolved section ${section.id} must use unresolved authority.`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      for (const responsibility of section.responsibilities ?? []) {
        if (!allowedResponsibilities.has(responsibility)) {
          add(diagnostics, {
            rule: "body-contract.responsibility-supported",
            severity: "error",
            category: "contract",
            message: `Responsibility ${responsibility} is unsupported by ${record.body_contract}.`,
            record_id: record.id,
            source_path: normalizedSource,
          });
        }
        responsibilityCoverage.add(responsibility);
      }
    }

    for (const heading of semanticHeadings) {
      const key = `${headingPathKey(heading.path)}\u001e${heading.occurrence}`;
      if (!mappedHeadingKeys.has(key)) {
        add(diagnostics, {
          rule: "section.heading-covered",
          severity: "error",
          category: "structural",
          message: `Semantic Markdown heading is not mapped: ${heading.path.join(" > ")} #${heading.occurrence}.`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
    }
    for (const responsibility of bodyContract?.required_responsibilities ?? []) {
      if (!responsibilityCoverage.has(responsibility)) {
        add(diagnostics, {
          rule: "body-contract.responsibility-required",
          severity: "error",
          category: "contract",
          message: `${record.body_contract} is missing required responsibility ${responsibility}.`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
    }

    if (record.type === "product" && record.governance.lifecycle !== "living") {
      add(diagnostics, {
        rule: "governance.product-living",
        severity: "error",
        category: "contract",
        message: "The Product root must use the living lifecycle.",
        record_id: record.id,
        source_path: normalizedSource,
      });
    }
    if (
      record.type === "decision" &&
      record.governance.status === "accepted" &&
      record.governance.lifecycle !== "immutable"
    ) {
      add(diagnostics, {
        rule: "governance.accepted-decision-immutable",
        severity: "error",
        category: "contract",
        message: "An accepted Decision must use the immutable lifecycle.",
        record_id: record.id,
        source_path: normalizedSource,
      });
    }

    validateRequiredExtensions(
      record.required_extensions,
      record.extensions,
      supportedExtensions,
      diagnostics,
      normalizedSource,
      record.id,
    );

    const provenanceSourceIds = new Set<string>();
    for (const source of record.provenance?.sources ?? []) {
      if (!source.id) {
        continue;
      }
      if (provenanceSourceIds.has(source.id)) {
        add(diagnostics, {
          rule: "provenance.source-identity-unique",
          severity: "error",
          category: "structural",
          message: `Duplicate provenance source identity: ${source.id}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      provenanceSourceIds.add(source.id);
    }
    const primaryObservation = record.provenance?.primary_observation;
    if (
      primaryObservation &&
      !sectionIds.has(primaryObservation.source_section)
    ) {
      add(diagnostics, {
        rule: "provenance.observation-section-resolves",
        severity: "error",
        category: "structural",
        message: `Primary observation section does not resolve: ${primaryObservation.source_section}`,
        record_id: record.id,
        source_path: normalizedSource,
      });
    }
    if (
      record.type === "evidence" &&
      (record.provenance?.sources?.length ?? 0) === 0 &&
      !primaryObservation
    ) {
      add(diagnostics, {
        rule: "evidence.provenance-required",
        severity: "error",
        category: "contract",
        message:
          "Evidence requires at least one provenance source or a source-bound primary observation method.",
        record_id: record.id,
        source_path: normalizedSource,
      });
    }

    const externalAuthorityIds = new Set<string>();
    for (const authority of record.external_authorities ?? []) {
      if (externalAuthorityIds.has(authority.id)) {
        add(diagnostics, {
          rule: "external-authority.identity-unique",
          severity: "error",
          category: "structural",
          message: `Duplicate external-authority identity: ${authority.id}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      externalAuthorityIds.add(authority.id);
      if (!sectionIds.has(authority.source_section)) {
        add(diagnostics, {
          rule: "external-authority.section-resolves",
          severity: "error",
          category: "structural",
          message: `External-authority source section does not resolve: ${authority.source_section}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
    }

    const entityIds = new Set<string>();
    for (const entity of record.entities ?? []) {
      if (entityIds.has(entity.id)) {
        add(diagnostics, {
          rule: "entity.identity-unique",
          severity: "error",
          category: "structural",
          message: `Duplicate entity identity: ${entity.id}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      entityIds.add(entity.id);
      if (!loaded.contractSet?.entity_kinds.includes(entity.kind)) {
        add(diagnostics, {
          rule: "entity.kind-supported",
          severity: "error",
          category: "contract",
          message: `Unsupported entity kind: ${entity.kind}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      if (!sectionIds.has(entity.defining_section)) {
        add(diagnostics, {
          rule: "entity.section-resolves",
          severity: "error",
          category: "structural",
          message: `Entity defining section does not resolve: ${entity.defining_section}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      entityDefinitions.set(entityKey({ record: record.id, entity: entity.id }), {
        recordId: record.id,
        sourcePath: normalizedSource,
      });
    }

    for (const relationship of record.relationships) {
      if (!loaded.contractSet?.relationship_types.includes(relationship.type)) {
        add(diagnostics, {
          rule: "relationship.type-supported",
          severity: "error",
          category: "contract",
          message: `Unsupported relationship type: ${relationship.type}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      if (!sectionIds.has(relationship.source_section)) {
        add(diagnostics, {
          rule: "relationship.section-resolves",
          severity: "error",
          category: "structural",
          message: `Relationship source section does not resolve: ${relationship.source_section}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
    }

    for (const entityRelationship of record.entity_relationships ?? []) {
      if (
        !loaded.contractSet?.entity_relationship_types.includes(
          entityRelationship.type,
        )
      ) {
        add(diagnostics, {
          rule: "entity-relationship.type-supported",
          severity: "error",
          category: "contract",
          message: `Unsupported entity relationship type: ${entityRelationship.type}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      if (!sectionIds.has(entityRelationship.source_section)) {
        add(diagnostics, {
          rule: "entity-relationship.section-resolves",
          severity: "error",
          category: "structural",
          message: `Entity relationship source section does not resolve: ${entityRelationship.source_section}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
    }

    for (const binding of record.bindings ?? []) {
      if (!loaded.contractSet?.binding_kinds.includes(binding.kind)) {
        add(diagnostics, {
          rule: "binding.kind-supported",
          severity: "error",
          category: "contract",
          message: `Unsupported binding kind: ${binding.kind}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      if (!sectionIds.has(binding.source_section)) {
        add(diagnostics, {
          rule: "binding.section-resolves",
          severity: "error",
          category: "structural",
          message: `Binding source section does not resolve: ${binding.source_section}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
      if (
        binding.external_authority &&
        !externalAuthorityIds.has(binding.external_authority)
      ) {
        add(diagnostics, {
          rule: "binding.external-authority-resolves",
          severity: "error",
          category: "structural",
          message: `Binding external authority does not resolve: ${binding.external_authority}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
    }

    const presentationSections = [
      record.presentation?.entry_section,
      ...(record.presentation?.featured_sections ?? []),
    ].filter((value): value is string => Boolean(value));
    for (const sectionId of presentationSections) {
      if (!sectionIds.has(sectionId)) {
        add(diagnostics, {
          rule: "presentation.section-resolves",
          severity: "error",
          category: "structural",
          message: `Presentation section does not resolve: ${sectionId}`,
          record_id: record.id,
          source_path: normalizedSource,
        });
      }
    }
  }

  if (loaded.bundle) {
    const products = [...recordsById.values()].filter(
      ({ record }) => record.type === "product",
    );
    if (products.length !== 1) {
      add(diagnostics, {
        rule: "bundle.product-unique",
        severity: "error",
        category: "structural",
        message: `A bundle requires exactly one Product record; found ${products.length}.`,
        source_path: repositoryPath(repositoryRoot, loaded.manifestPath),
      });
    }
    if (
      products.length === 1 &&
      products[0]!.record.id !== loaded.bundle.product_record
    ) {
      add(diagnostics, {
        rule: "bundle.product-record",
        severity: "error",
        category: "structural",
        message: `product_record ${loaded.bundle.product_record} does not identify the unique Product ${products[0]!.record.id}.`,
        source_path: repositoryPath(repositoryRoot, loaded.manifestPath),
      });
    }

    for (const { record } of recordsById.values()) {
      if (record.scope.product !== loaded.bundle.product_record) {
        add(diagnostics, {
          rule: "scope.product-root",
          severity: "error",
          category: "structural",
          message: `Record scope ${record.scope.product} does not resolve to the unique Product root ${loaded.bundle.product_record}.`,
          record_id: record.id,
          source_path: record.source.path,
        });
      }
      const relationshipKeys = new Set<string>();
      for (const relationship of record.relationships) {
        if (!recordsById.has(relationship.target)) {
          add(diagnostics, {
            rule: "relationship.target-resolves",
            severity: "error",
            category: "structural",
            message: `Relationship target does not resolve: ${relationship.target}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
        const key = `${relationship.type}\u001e${relationship.target}\u001e${relationship.source_section}`;
        if (relationshipKeys.has(key)) {
          add(diagnostics, {
            rule: "relationship.unique",
            severity: "error",
            category: "structural",
            message: `Duplicate relationship: ${relationship.type} ${relationship.target} from ${relationship.source_section}.`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
        relationshipKeys.add(key);
      }
    }

    validateHierarchy(recordsById, diagnostics, loaded.bundle.product_record);

    for (const { record } of recordsById.values()) {
      for (const relationship of record.entity_relationships ?? []) {
        for (const [label, reference] of [
          ["source", relationship.source],
          ["target", relationship.target],
        ] as const) {
          if (!recordsById.has(reference.record)) {
            add(diagnostics, {
              rule: "entity-relationship.record-resolves",
              severity: "error",
              category: "structural",
              message: `Entity relationship ${label} record does not resolve: ${reference.record}`,
              record_id: record.id,
              source_path: record.source.path,
            });
          } else if (!entityDefinitions.has(entityKey(reference))) {
            add(diagnostics, {
              rule: "entity-relationship.entity-resolves",
              severity: "error",
              category: "structural",
              message: `Entity relationship ${label} entity does not resolve: ${reference.record}/${reference.entity}`,
              record_id: record.id,
              source_path: record.source.path,
            });
          }
        }
      }
      for (const binding of record.bindings ?? []) {
        if (!entityDefinitions.has(entityKey(binding.entity))) {
          add(diagnostics, {
            rule: "binding.entity-resolves",
            severity: "error",
            category: "structural",
            message: `Binding entity does not resolve: ${binding.entity.record}/${binding.entity.entity}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
        const realization = recordsById.get(binding.realization)?.record;
        if (!realization || realization.type !== "realization") {
          add(diagnostics, {
            rule: "binding.realization-resolves",
            severity: "error",
            category: "structural",
            message: `Binding realization does not resolve to a Realization record: ${binding.realization}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
      }
    }

    if (loaded.markdownRoot) {
      const classifiedRecordPaths = new Set(recordsBySource.keys());
      const nonRecordPaths = new Set<string>();
      for (const nonRecord of loaded.bundle.non_records) {
        const normalized = normalizeRepositoryPath(nonRecord.path);
        if (nonRecordPaths.has(normalized)) {
          add(diagnostics, {
            rule: "bundle.non-record-unique",
            severity: "error",
            category: "structural",
            message: `Non-record path is declared more than once: ${normalized}`,
            source_path: normalized,
          });
        }
        nonRecordPaths.add(normalized);
        const resolved = resolveContainedPath(
          repositoryRoot,
          repositoryRoot,
          normalized,
          diagnostics,
          "bundle.non-record-path",
          loaded.markdownRoot,
        );
        if (!resolved || !existsSync(resolved) || !statSync(resolved).isFile()) {
          add(diagnostics, {
            rule: "bundle.non-record-exists",
            severity: "error",
            category: "structural",
            message: `Declared non-record does not exist: ${normalized}`,
            source_path: normalized,
          });
        }
        if (classifiedRecordPaths.has(normalized)) {
          add(diagnostics, {
            rule: "bundle.non-record-conflict",
            severity: "error",
            category: "structural",
            message: `Path cannot be both a record and non-record: ${normalized}`,
            source_path: normalized,
          });
        }
      }
      for (const file of walkFiles(
        loaded.markdownRoot,
        repositoryRoot,
        diagnostics,
        "bundle.markdown-symlink",
      )) {
        const relative = repositoryPath(repositoryRoot, file);
        if (
          !classifiedRecordPaths.has(relative) &&
          !nonRecordPaths.has(relative)
        ) {
          add(diagnostics, {
            rule: "record.classification-required",
            severity: "error",
            category: "structural",
            message: `File is neither a governed record nor a declared non-record: ${relative}`,
            source_path: relative,
          });
        }
      }
    }
  }

  let baseSnapshot: BaseNkfSnapshot | undefined;
  let proposalRecords = new Set<string>();
  const manifestRelative = normalizeRepositoryPath(
    options.manifestPath ?? defaultManifestPath,
  );
  if (options.baseRef) {
    baseSnapshot = loadBaseSnapshot(
      repositoryRoot,
      options.baseRef,
      manifestRelative,
      diagnostics,
    );
    if (baseSnapshot) {
      proposalRecords = applyBaseAuthority(
        repositoryRoot,
        baseSnapshot,
        loaded.records,
        diagnostics,
      );
    }
  }

  const completedAt = new Date().toISOString();
  const failed = diagnostics.some(
    ({ severity }) => severity === "error",
  );
  const structuralFailed = diagnostics.some(
    ({ severity, category }) =>
      severity === "error" &&
      (category === "structural" || category === "security"),
  );
  const contractFailed = diagnostics.some(
    ({ severity, category }) =>
      severity === "error" && category === "contract",
  );
  const profileFailed = diagnostics.some(
    ({ severity, category }) =>
      severity === "error" && category === "profile",
  );
  const proposalRecordList = [...proposalRecords].sort();
  const contracts = [
    ...(loaded.bundle
      ? [loaded.bundle.contract, loaded.bundle.record_contract]
      : []),
    ...new Set(loaded.records.map(({ record }) => record.body_contract)),
  ].sort();
  const revision = gitRevision(repositoryRoot);

  return {
    execution_id: randomUUID(),
    repository: repositoryRoot,
    ...(revision ? { revision } : {}),
    ...(baseSnapshot ? { base_revision: baseSnapshot.revision } : {}),
    runner: options.runner ?? "local",
    ...(loaded.bundle ? { bundle: loaded.bundle.id } : {}),
    contracts,
    started_at: startedAt,
    completed_at: completedAt,
    outcome: failed ? "failed" : "passed",
    authority_state: failed
      ? "unresolved"
      : baseSnapshot && proposalRecordList.length > 0
        ? "proposal-awaiting-acceptance"
        : baseSnapshot
          ? "accepted-baseline"
          : "conformance-only",
    affected_records: loaded.records.map(({ record }) => record.id).sort(),
    proposal_records: proposalRecordList,
    ...(!failed && baseSnapshot && proposalRecordList.length > 0
      ? {
          proposal_digest: proposalDigest(
            baseSnapshot.revision,
            loaded.records,
            proposalRecords,
          ),
        }
      : {}),
    conformance: {
      format: "nkf",
      nkf_version: loaded.contractSet?.nkf_version ?? "0.1",
      ...(loaded.contractSet
        ? {
            specification_digest:
              loaded.contractSet.specification.source_digest,
            specification_authority:
              loaded.contractSet.specification.authority_state,
          }
        : {}),
      structural: structuralFailed ? "failed" : "passed",
      contracts:
        loaded.records.length === 0 && structuralFailed
          ? "not-evaluated"
          : contractFailed
            ? "failed"
            : "passed",
      full_bundle:
        structuralFailed || contractFailed ? "failed" : "passed",
      profile: options.baseRef
        ? profileFailed
          ? "failed"
          : "passed"
        : "not-requested",
    },
    diagnostics,
  };
}

function atomicWrite(filePath: string, contents: string): void {
  const temporary = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
  try {
    writeFileSync(temporary, contents, "utf8");
    renameSync(temporary, filePath);
  } finally {
    if (existsSync(temporary)) {
      unlinkSync(temporary);
    }
  }
}

export function reconcileNkfKnowledge(
  repositoryRoot: string,
  recordId?: string,
  manifestPath = defaultManifestPath,
): string[] {
  const diagnostics: KnowledgeDiagnostic[] = [];
  const manifestRelative = normalizeRepositoryPath(manifestPath);
  const manifestAbsolute = resolveContainedPath(
    repositoryRoot,
    repositoryRoot,
    manifestRelative,
    diagnostics,
    "bundle.manifest-path",
  );
  if (!manifestAbsolute || diagnostics.length > 0) {
    throw new Error(
      diagnostics.map(({ message }) => message).join("; ") ||
        "Cannot resolve NKF manifest.",
    );
  }
  const bundle = parse(
    utf8Decoder.decode(readFileSync(manifestAbsolute)),
  ) as NkfBundle;
  const recordsRoot = resolveContainedPath(
    repositoryRoot,
    path.dirname(manifestAbsolute),
    bundle.records_root,
    diagnostics,
    "bundle.records-root",
  );
  const markdownRoot = resolveContainedPath(
    repositoryRoot,
    path.dirname(manifestAbsolute),
    bundle.markdown_root,
    diagnostics,
    "bundle.markdown-root",
  );
  if (!recordsRoot || !markdownRoot || diagnostics.length > 0) {
    throw new Error(diagnostics.map(({ message }) => message).join("; "));
  }

  const changed: string[] = [];
  let selected = false;
  for (const descriptorPath of walkFiles(
    recordsRoot,
    repositoryRoot,
    diagnostics,
    "record.descriptor-symlink",
  ).filter((candidate) => /\.ya?ml$/i.test(candidate))) {
    const raw = parse(
      utf8Decoder.decode(readFileSync(descriptorPath)),
    ) as Record<string, unknown>;
    const id = raw.id;
    if (typeof id !== "string" || (recordId && id !== recordId)) {
      continue;
    }
    selected = true;
    const source = raw.source as
      | {
          path?: unknown;
          digest?: { algorithm?: unknown; value?: unknown };
        }
      | undefined;
    if (
      typeof source?.path !== "string" ||
      source.digest?.algorithm !== "sha-256"
    ) {
      throw new Error(
        `Cannot reconcile ${id}: source path and sha-256 algorithm are required.`,
      );
    }
    const sourcePath = resolveContainedPath(
      repositoryRoot,
      repositoryRoot,
      source.path,
      diagnostics,
      "record.source-path",
      markdownRoot,
    );
    if (!sourcePath || !existsSync(sourcePath) || !statSync(sourcePath).isFile()) {
      throw new Error(`Cannot reconcile ${id}: source does not resolve.`);
    }
    const digest = sha256(readFileSync(sourcePath));
    if (source.digest.value !== digest) {
      source.digest.value = digest;
      atomicWrite(
        descriptorPath,
        stringify(raw, { lineWidth: 0, sortMapEntries: false }),
      );
      changed.push(id);
    }
  }
  if (recordId && !selected) {
    throw new Error(`Unknown knowledge record: ${recordId}`);
  }
  if (diagnostics.some(({ severity }) => severity === "error")) {
    throw new Error(diagnostics.map(({ message }) => message).join("; "));
  }
  return changed.sort();
}

export function inspectNkfKnowledge(
  repositoryRoot: string,
  recordId: string,
  options: NkfValidationOptions = {},
): {
  record: NkfRecord;
  markdown: string;
  validation: ValidationResult;
} {
  const validation = validateNkfKnowledge(repositoryRoot, options);
  if (validation.outcome === "failed") {
    const relevant = validation.diagnostics.filter(
      ({ record_id: diagnosticRecord }) =>
        !diagnosticRecord || diagnosticRecord === recordId,
    );
    throw new Error(
      relevant.map(({ rule, message }) => `${rule}: ${message}`).join("\n"),
    );
  }
  const loaded = loadNkfKnowledge(repositoryRoot, options);
  const record = loaded.records.find(({ record: item }) => item.id === recordId)
    ?.record;
  if (!record) {
    throw new Error(`Unknown knowledge record: ${recordId}`);
  }
  const sourcePath = path.resolve(repositoryRoot, record.source.path);
  return {
    record,
    markdown: utf8Decoder.decode(readFileSync(sourcePath)),
    validation,
  };
}
