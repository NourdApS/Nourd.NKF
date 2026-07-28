import { createHash, randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import {
  Ajv2020,
  type ErrorObject,
  type ValidateFunction,
} from "ajv/dist/2020.js";
import { parse, stringify } from "yaml";

import {
  headingPathKey,
  normalizeHeading,
  parseGovernance,
  parseHeadings,
} from "./markdown.js";
import {
  inspectNkfKnowledge,
  reconcileNkfKnowledge,
  validateNkfKnowledge,
} from "./nkf.js";
import type {
  BodyContract,
  KnowledgeBundle,
  KnowledgeDiagnostic,
  KnowledgeRecord,
  LoadedKnowledgeRecord,
  RecordType,
  ValidationResult,
} from "./types.js";

const bundleRelativePath = path.join(".nourd", "knowledge", "bundle.yaml");

const bodyContractByType: Record<RecordType, BodyContract> = {
  product: "nourd.knowledge.product/v1",
  principle: "nourd.knowledge.principle/v1",
  concept: "nourd.knowledge.concept/v1",
  journey: "nourd.knowledge.journey/v1",
  domain: "nourd.knowledge.domain/v1",
  capability: "nourd.knowledge.capability/v1",
  design: "nourd.knowledge.design/v1",
  "architecture-decision": "nourd.knowledge.architecture-decision/v1",
  realization: "nourd.knowledge.realization/v1",
  evidence: "nourd.knowledge.evidence/v1",
};

interface LoadResult {
  repositoryRoot: string;
  bundlePath: string;
  bundle?: KnowledgeBundle;
  records: LoadedKnowledgeRecord[];
  diagnostics: KnowledgeDiagnostic[];
}

interface ValidateOptions {
  baseRef?: string;
  runner?: ValidationResult["runner"];
  manifestPath?: string;
}

interface BaseMarkdown {
  path: string;
  bytes: Buffer;
  title?: string;
  status?: "draft" | "accepted" | "retired" | "superseded";
}

interface BaseDescriptor {
  path: string;
  bytes: Buffer;
  record: KnowledgeRecord;
}

interface BaseSnapshot {
  revision: string;
  recordsById: Map<string, BaseDescriptor>;
  markdown: BaseMarkdown[];
  markdownByPath: Map<string, BaseMarkdown>;
}

interface ResolvedBase {
  descriptor?: BaseDescriptor;
  markdown?: BaseMarkdown;
}

export function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function repositoryRevision(repositoryRoot: string): string | undefined {
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

export function findRepositoryRoot(start: string): string {
  let candidate = path.resolve(start);

  while (true) {
    if (existsSync(path.join(candidate, bundleRelativePath))) {
      return candidate;
    }

    const parent = path.dirname(candidate);
    if (parent === candidate) {
      throw new Error(
        `Could not find ${bundleRelativePath} from ${path.resolve(start)}`,
      );
    }
    candidate = parent;
  }
}

function addDiagnostic(
  diagnostics: KnowledgeDiagnostic[],
  diagnostic: KnowledgeDiagnostic,
): void {
  diagnostics.push(diagnostic);
}

function repositoryPath(repositoryRoot: string, absolutePath: string): string {
  const lexicalRoot = path.resolve(repositoryRoot);
  const lexicalCandidate = path.resolve(absolutePath);
  let relative: string;
  if (isWithin(lexicalRoot, lexicalCandidate)) {
    relative = path.relative(lexicalRoot, lexicalCandidate);
  } else {
    const realRoot = realpathSync.native(repositoryRoot);
    const realCandidate = existsSync(absolutePath)
      ? realpathSync.native(absolutePath)
      : lexicalCandidate;
    relative = path.relative(realRoot, realCandidate);
  }
  return path
    .normalize(relative)
    .split(path.sep)
    .join("/");
}

function isWithin(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function resolveExistingPath(
  repositoryRoot: string,
  relativePath: string,
  diagnostics: KnowledgeDiagnostic[],
  rule: string,
  allowedRoot = repositoryRoot,
): string | undefined {
  const lexical = path.resolve(repositoryRoot, relativePath);
  if (!isWithin(path.resolve(repositoryRoot), lexical)) {
    addDiagnostic(diagnostics, {
      rule,
      severity: "error",
      message: `Path escapes the repository: ${relativePath}`,
      source_path: relativePath,
    });
    return undefined;
  }

  if (!existsSync(lexical)) {
    return lexical;
  }

  try {
    const realRepositoryRoot = realpathSync.native(repositoryRoot);
    const realAllowedRoot = realpathSync.native(allowedRoot);
    const realCandidate = realpathSync.native(lexical);
    if (
      !isWithin(realRepositoryRoot, realCandidate) ||
      !isWithin(realAllowedRoot, realCandidate)
    ) {
      addDiagnostic(diagnostics, {
        rule,
        severity: "error",
        message: `Resolved path escapes its allowed root: ${relativePath}`,
        source_path: relativePath,
      });
      return undefined;
    }
    return realCandidate;
  } catch (error) {
    addDiagnostic(diagnostics, {
      rule,
      severity: "error",
      message: `Cannot resolve path ${relativePath}: ${String(error)}`,
      source_path: relativePath,
    });
    return undefined;
  }
}

function schemaDirectory(repositoryRoot: string): string {
  return path.join(repositoryRoot, "src", "contracts", "knowledge", "v1");
}

function schemaValidator(repositoryRoot: string): {
  validateBundle: ValidateFunction;
  validateRecord: ValidateFunction;
} {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  ajv.addFormat("date", /^\d{4}-\d{2}-\d{2}$/);
  const schemas = schemaDirectory(repositoryRoot);
  const bundleSchema = JSON.parse(
    readFileSync(path.join(schemas, "bundle.schema.json"), "utf8"),
  ) as object;
  const recordSchema = JSON.parse(
    readFileSync(path.join(schemas, "record.schema.json"), "utf8"),
  ) as object;

  return {
    validateBundle: ajv.compile(bundleSchema),
    validateRecord: ajv.compile(recordSchema),
  };
}

function schemaErrors(
  prefix: string,
  errors: ErrorObject[] | null | undefined,
): string {
  return (errors ?? [])
    .map((error) => `${prefix}${error.instancePath || "/"} ${error.message}`)
    .join("; ");
}

function loadKnowledge(repositoryRoot: string): LoadResult {
  const diagnostics: KnowledgeDiagnostic[] = [];
  const bundlePath = path.join(repositoryRoot, bundleRelativePath);
  const records: LoadedKnowledgeRecord[] = [];

  let validators: ReturnType<typeof schemaValidator>;
  try {
    validators = schemaValidator(repositoryRoot);
  } catch (error) {
    addDiagnostic(diagnostics, {
      rule: "contract.load",
      severity: "error",
      message: `Cannot load knowledge contracts: ${String(error)}`,
      source_path: repositoryPath(repositoryRoot, schemaDirectory(repositoryRoot)),
    });
    return { repositoryRoot, bundlePath, records, diagnostics };
  }

  let rawBundle: unknown;
  try {
    rawBundle = parse(readFileSync(bundlePath, "utf8"));
  } catch (error) {
    addDiagnostic(diagnostics, {
      rule: "bundle.parse",
      severity: "error",
      message: `Cannot parse bundle declaration: ${String(error)}`,
      source_path: repositoryPath(repositoryRoot, bundlePath),
    });
    return { repositoryRoot, bundlePath, records, diagnostics };
  }

  if (!validators.validateBundle(rawBundle)) {
    addDiagnostic(diagnostics, {
      rule: "bundle.contract",
      severity: "error",
      message: schemaErrors("Bundle ", validators.validateBundle.errors),
      source_path: repositoryPath(repositoryRoot, bundlePath),
    });
    return { repositoryRoot, bundlePath, records, diagnostics };
  }

  const bundle = rawBundle as KnowledgeBundle;
  const bundleDirectory = path.dirname(bundlePath);
  const recordsAbsolute = path.resolve(bundleDirectory, bundle.records_root);
  const recordsRoot = resolveExistingPath(
    repositoryRoot,
    repositoryPath(repositoryRoot, recordsAbsolute),
    diagnostics,
    "bundle.records-root",
  );

  if (
    !recordsRoot ||
    !existsSync(recordsRoot) ||
    !lstatSync(recordsRoot).isDirectory()
  ) {
    addDiagnostic(diagnostics, {
      rule: "bundle.records-root",
      severity: "error",
      message: `Records directory does not exist: ${bundle.records_root}`,
      source_path: repositoryPath(repositoryRoot, bundlePath),
    });
    return { repositoryRoot, bundlePath, bundle, records, diagnostics };
  }

  for (const filename of readdirSync(recordsRoot).sort()) {
    if (!filename.endsWith(".yaml")) {
      addDiagnostic(diagnostics, {
        rule: "record.extension",
        severity: "error",
        message: `Unexpected file in records directory: ${filename}`,
        source_path: repositoryPath(
          repositoryRoot,
          path.join(recordsRoot, filename),
        ),
      });
      continue;
    }

    const descriptorPath = path.join(recordsRoot, filename);
    if (!lstatSync(descriptorPath).isFile()) {
      addDiagnostic(diagnostics, {
        rule: "record.descriptor-file",
        severity: "error",
        message: `Record descriptor must be a regular file: ${filename}`,
        source_path: repositoryPath(repositoryRoot, descriptorPath),
      });
      continue;
    }

    let rawRecord: unknown;
    try {
      rawRecord = parse(readFileSync(descriptorPath, "utf8"));
    } catch (error) {
      addDiagnostic(diagnostics, {
        rule: "record.parse",
        severity: "error",
        message: `Cannot parse record descriptor: ${String(error)}`,
        source_path: repositoryPath(repositoryRoot, descriptorPath),
      });
      continue;
    }

    if (!validators.validateRecord(rawRecord)) {
      addDiagnostic(diagnostics, {
        rule: "record.contract",
        severity: "error",
        message: schemaErrors(`${filename} `, validators.validateRecord.errors),
        source_path: repositoryPath(repositoryRoot, descriptorPath),
      });
      continue;
    }

    records.push({
      descriptorPath,
      record: rawRecord as KnowledgeRecord,
    });
  }

  return { repositoryRoot, bundlePath, bundle, records, diagnostics };
}

function walkMarkdown(
  directory: string,
  repositoryRoot: string,
  diagnostics: KnowledgeDiagnostic[],
): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  const results: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMarkdown(current, repositoryRoot, diagnostics));
      continue;
    }

    if (entry.isSymbolicLink()) {
      const resolved = resolveExistingPath(
        repositoryRoot,
        repositoryPath(repositoryRoot, current),
        diagnostics,
        "markdown.symlink-containment",
        directory,
      );
      if (!resolved) {
        continue;
      }
      if (lstatSync(resolved).isDirectory()) {
        addDiagnostic(diagnostics, {
          rule: "markdown.symlink-directory",
          severity: "error",
          message: `Markdown discovery does not follow directory symlinks: ${repositoryPath(repositoryRoot, current)}`,
          source_path: repositoryPath(repositoryRoot, current),
        });
        continue;
      }
    }

    if ((entry.isFile() || entry.isSymbolicLink()) && entry.name.endsWith(".md")) {
      results.push(current);
    }
  }
  return results;
}

function gitFile(
  repositoryRoot: string,
  revision: string,
  filePath: string,
): Buffer | undefined {
  try {
    return execFileSync("git", ["show", `${revision}:${filePath}`], {
      cwd: repositoryRoot,
      encoding: "buffer",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return undefined;
  }
}

function gitPaths(
  repositoryRoot: string,
  revision: string,
  prefix: string,
): string[] {
  const output = execFileSync(
    "git",
    ["ls-tree", "-r", "--name-only", revision, "--", prefix],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    },
  );
  return output
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function loadBaseSnapshot(
  repositoryRoot: string,
  baseRef: string,
  diagnostics: KnowledgeDiagnostic[],
): BaseSnapshot | undefined {
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
    addDiagnostic(diagnostics, {
      rule: "authority.base-ref",
      severity: "error",
      message: `Accepted base cannot be resolved: ${baseRef}`,
      remediation: "Provide an available accepted Git commit or ref.",
    });
    return undefined;
  }

  const recordsById = new Map<string, BaseDescriptor>();
  try {
    for (const descriptorPath of gitPaths(
      repositoryRoot,
      revision,
      ".nourd/knowledge/records",
    )) {
      if (!descriptorPath.endsWith(".yaml")) {
        continue;
      }
      const bytes = gitFile(repositoryRoot, revision, descriptorPath);
      if (!bytes) {
        continue;
      }
      let record: KnowledgeRecord;
      try {
        record = parse(bytes.toString("utf8")) as KnowledgeRecord;
      } catch (error) {
        addDiagnostic(diagnostics, {
          rule: "authority.base-descriptor",
          severity: "error",
          message: `Cannot parse accepted-base descriptor ${descriptorPath}: ${String(error)}`,
          source_path: descriptorPath,
        });
        continue;
      }
      if (!record?.id || !record.source?.path || !record.governance?.status) {
        addDiagnostic(diagnostics, {
          rule: "authority.base-descriptor",
          severity: "error",
          message: `Accepted-base descriptor is incomplete: ${descriptorPath}`,
          source_path: descriptorPath,
        });
        continue;
      }
      recordsById.set(record.id, { path: descriptorPath, bytes, record });
    }
  } catch (error) {
    addDiagnostic(diagnostics, {
      rule: "authority.base-tree",
      severity: "error",
      message: `Cannot inspect accepted-base descriptors: ${String(error)}`,
    });
    return undefined;
  }

  const markdown: BaseMarkdown[] = [];
  try {
    for (const markdownPath of gitPaths(
      repositoryRoot,
      revision,
      "knowledge",
    )) {
      if (!markdownPath.endsWith(".md")) {
        continue;
      }
      const bytes = gitFile(repositoryRoot, revision, markdownPath);
      if (!bytes) {
        continue;
      }
      const source = bytes.toString("utf8");
      const title = parseHeadings(source).find(
        (heading) => heading.level === 1,
      )?.title;
      markdown.push({
        path: markdownPath,
        bytes,
        ...(title ? { title } : {}),
        ...(parseGovernance(source).status
          ? { status: parseGovernance(source).status }
          : {}),
      });
    }
  } catch (error) {
    addDiagnostic(diagnostics, {
      rule: "authority.base-tree",
      severity: "error",
      message: `Cannot inspect accepted-base Markdown: ${String(error)}`,
    });
    return undefined;
  }

  return {
    revision,
    recordsById,
    markdown,
    markdownByPath: new Map(markdown.map((entry) => [entry.path, entry])),
  };
}

function stableTitlePrefix(recordId: string): string | undefined {
  const adr = /^adr-(\d{4})$/.exec(recordId);
  if (adr?.[1]) {
    return `ADR ${adr[1]}:`;
  }
  const journey = /^uj-(\d{3})(?:-|$)/.exec(recordId);
  if (journey?.[1]) {
    return `UJ-${journey[1]}:`;
  }
  return undefined;
}

function oneBaseCandidate(
  candidates: BaseMarkdown[],
  record: KnowledgeRecord,
  diagnostics: KnowledgeDiagnostic[],
  reason: string,
): BaseMarkdown | undefined {
  if (candidates.length > 1) {
    addDiagnostic(diagnostics, {
      rule: "authority.base-identity-ambiguous",
      severity: "error",
      message: `Accepted base has multiple ${reason} matches for ${record.id}: ${candidates.map(({ path: candidatePath }) => candidatePath).join(", ")}`,
      record_id: record.id,
      source_path: record.source.path,
    });
    return undefined;
  }
  return candidates[0];
}

function resolveBase(
  snapshot: BaseSnapshot,
  loaded: LoadedKnowledgeRecord,
  diagnostics: KnowledgeDiagnostic[],
): ResolvedBase {
  const descriptor = snapshot.recordsById.get(loaded.record.id);
  if (descriptor) {
    const markdown = snapshot.markdownByPath.get(descriptor.record.source.path);
    return {
      descriptor,
      ...(markdown ? { markdown } : {}),
    };
  }

  const prefix = stableTitlePrefix(loaded.record.id);
  if (prefix) {
    const candidate = oneBaseCandidate(
      snapshot.markdown.filter(({ title }) => title?.startsWith(prefix)),
      loaded.record,
      diagnostics,
      "stable-title",
    );
    if (candidate) {
      return { markdown: candidate };
    }
  }

  const titleCandidate = oneBaseCandidate(
    snapshot.markdown.filter(({ title }) => title === normalizeHeading(loaded.record.title)),
    loaded.record,
    diagnostics,
    "title",
  );
  if (titleCandidate) {
    return { markdown: titleCandidate };
  }

  const pathCandidate = snapshot.markdownByPath.get(loaded.record.source.path);
  if (pathCandidate) {
    return { markdown: pathCandidate };
  }

  if (loaded.sourceBytes) {
    const digest = sha256(loaded.sourceBytes);
    const digestCandidate = oneBaseCandidate(
      snapshot.markdown.filter(({ bytes }) => sha256(bytes) === digest),
      loaded.record,
      diagnostics,
      "content-digest",
    );
    if (digestCandidate) {
      return { markdown: digestCandidate };
    }
  }

  return {};
}

function normalizeDate(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  const match = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(value.trim());
  if (!match?.[1] || !match[2] || !match[3]) {
    return undefined;
  }
  const months: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };
  const month = months[match[2].toLowerCase()];
  if (!month) {
    return undefined;
  }
  return `${match[3]}-${month}-${match[1].padStart(2, "0")}`;
}

function validateBodyContract(
  record: KnowledgeRecord,
  diagnostics: KnowledgeDiagnostic[],
): void {
  if (record.body_contract !== bodyContractByType[record.type]) {
    addDiagnostic(diagnostics, {
      rule: "body-contract.type",
      severity: "error",
      message: `Body contract ${record.body_contract} does not match record type ${record.type}`,
      record_id: record.id,
      source_path: record.source.path,
    });
  }

  const roles = new Set(record.sections.map(({ role }) => role));
  if (record.sections.length === 0) {
    addDiagnostic(diagnostics, {
      rule: "body-contract.sections-required",
      severity: "error",
      message: `${record.body_contract} requires semantic sections`,
      record_id: record.id,
      source_path: record.source.path,
    });
  }

  if (record.type === "architecture-decision") {
    if (!roles.has("context")) {
      addDiagnostic(diagnostics, {
        rule: "body-contract.adr-context",
        severity: "error",
        message: "Architecture Decisions require a context section.",
        record_id: record.id,
        source_path: record.source.path,
      });
    }
    if (!roles.has("governing")) {
      addDiagnostic(diagnostics, {
        rule: "body-contract.adr-decision",
        severity: "error",
        message: "Architecture Decisions require governing decision content.",
        record_id: record.id,
        source_path: record.source.path,
      });
    }
  }

  if (record.type === "journey") {
    if (!record.sections.some(({ id }) => id === "purpose")) {
      addDiagnostic(diagnostics, {
        rule: "body-contract.journey-purpose",
        severity: "error",
        message: "User Journeys require a purpose section.",
        record_id: record.id,
        source_path: record.source.path,
      });
    }
    if (!roles.has("boundary")) {
      addDiagnostic(diagnostics, {
        rule: "body-contract.journey-boundary",
        severity: "error",
        message: "User Journeys require an explicit boundary section.",
        record_id: record.id,
        source_path: record.source.path,
      });
    }
  }

  if (
    ["product", "principle", "concept"].includes(record.type) &&
    ![...roles].some((role) =>
      ["governing", "principle", "boundary"].includes(role),
    )
  ) {
    addDiagnostic(diagnostics, {
      rule: "body-contract.governing-content",
      severity: "error",
      message: `${record.body_contract} requires governing content`,
      record_id: record.id,
      source_path: record.source.path,
    });
  }
}

function validateGovernanceAgreement(
  record: KnowledgeRecord,
  markdown: string,
  diagnostics: KnowledgeDiagnostic[],
): void {
  const declared = parseGovernance(markdown);
  if (!declared.status) {
    addDiagnostic(diagnostics, {
      rule: "governance.markdown-status",
      severity: "error",
      message: "Canonical Markdown must declare its status.",
      record_id: record.id,
      source_path: record.source.path,
    });
  } else if (declared.status !== record.governance.status) {
    addDiagnostic(diagnostics, {
      rule: "governance.status-agreement",
      severity: "error",
      message: `Markdown status ${declared.status} does not match YAML status ${record.governance.status}`,
      record_id: record.id,
      source_path: record.source.path,
    });
  }

  if (record.governance.accepted_on && record.governance.proposed_on) {
    addDiagnostic(diagnostics, {
      rule: "governance.date-exclusive",
      severity: "error",
      message: "A record cannot declare both accepted_on and proposed_on.",
      record_id: record.id,
      source_path: record.source.path,
    });
  }

  if (record.governance.status === "accepted") {
    if (!record.governance.accepted_on) {
      addDiagnostic(diagnostics, {
        rule: "governance.accepted-on",
        severity: "error",
        message: "Accepted records require accepted_on.",
        record_id: record.id,
        source_path: record.source.path,
      });
    }
    const markdownDate = normalizeDate(declared.acceptedOn);
    if (!markdownDate) {
      addDiagnostic(diagnostics, {
        rule: "governance.markdown-accepted-on",
        severity: "error",
        message: "Accepted Markdown requires an Accepted date.",
        record_id: record.id,
        source_path: record.source.path,
      });
    } else if (
      record.governance.accepted_on &&
      markdownDate !== record.governance.accepted_on
    ) {
      addDiagnostic(diagnostics, {
        rule: "governance.accepted-date-agreement",
        severity: "error",
        message: `Markdown Accepted date ${markdownDate} does not match YAML accepted_on ${record.governance.accepted_on}`,
        record_id: record.id,
        source_path: record.source.path,
      });
    }
  }

  if (record.governance.status === "draft") {
    if (!record.governance.proposed_on) {
      addDiagnostic(diagnostics, {
        rule: "governance.proposed-on",
        severity: "error",
        message: "Draft records require proposed_on.",
        record_id: record.id,
        source_path: record.source.path,
      });
    }
    const markdownDate = normalizeDate(declared.proposedOn);
    if (!markdownDate) {
      addDiagnostic(diagnostics, {
        rule: "governance.markdown-proposed-on",
        severity: "error",
        message: "Draft Markdown requires a Proposed date.",
        record_id: record.id,
        source_path: record.source.path,
      });
    } else if (
      record.governance.proposed_on &&
      markdownDate !== record.governance.proposed_on
    ) {
      addDiagnostic(diagnostics, {
        rule: "governance.proposed-date-agreement",
        severity: "error",
        message: `Markdown Proposed date ${markdownDate} does not match YAML proposed_on ${record.governance.proposed_on}`,
        record_id: record.id,
        source_path: record.source.path,
      });
    }
  }
}

function descriptorChanged(
  current: LoadedKnowledgeRecord,
  base: BaseDescriptor,
): boolean {
  return !readFileSync(current.descriptorPath).equals(base.bytes);
}

function proposalDigest(
  repositoryRoot: string,
  baseRevision: string,
  records: LoadedKnowledgeRecord[],
): string {
  const composite = records
    .map((loaded) => ({
      descriptor: repositoryPath(
        repositoryRoot,
        loaded.descriptorPath,
      ),
      descriptor_digest: sha256(readFileSync(loaded.descriptorPath)),
      id: loaded.record.id,
      source_digest: loaded.sourceBytes ? sha256(loaded.sourceBytes) : null,
      source_path: loaded.record.source.path,
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
  return sha256(
    Buffer.from(
      JSON.stringify({ base_revision: baseRevision, records: composite }),
      "utf8",
    ),
  );
}

function validateLegacyKnowledge(
  repositoryRoot: string,
  options: ValidateOptions = {},
): ValidationResult {
  const startedAt = new Date().toISOString();
  const loaded = loadKnowledge(repositoryRoot);
  const diagnostics = [...loaded.diagnostics];
  const recordsById = new Map<string, LoadedKnowledgeRecord>();
  const recordsBySource = new Map<string, LoadedKnowledgeRecord>();
  const proposalRecords = new Set<string>();
  const matchedBaseMarkdown = new Set<string>();
  let baseSnapshot: BaseSnapshot | undefined;

  if (!options.baseRef) {
    addDiagnostic(diagnostics, {
      rule: "authority.base-required",
      severity: "error",
      message: "Governance validation requires an accepted base ref.",
      remediation: "Run validation with --base <accepted-ref>.",
    });
  } else {
    baseSnapshot = loadBaseSnapshot(
      repositoryRoot,
      options.baseRef,
      diagnostics,
    );
  }

  if (loaded.bundle) {
    const bundleDirectory = path.dirname(loaded.bundlePath);
    const markdownAbsolute = path.resolve(
      bundleDirectory,
      loaded.bundle.markdown_root,
    );
    const markdownRoot = resolveExistingPath(
      repositoryRoot,
      repositoryPath(repositoryRoot, markdownAbsolute),
      diagnostics,
      "bundle.markdown-root",
    );

    for (const loadedRecord of loaded.records) {
      const { record, descriptorPath } = loadedRecord;
      const descriptorFilename = path.basename(descriptorPath, ".yaml");

      if (descriptorFilename !== record.id) {
        addDiagnostic(diagnostics, {
          rule: "record.filename",
          severity: "error",
          message: `Descriptor filename ${descriptorFilename} does not match record id ${record.id}`,
          record_id: record.id,
          source_path: repositoryPath(repositoryRoot, descriptorPath),
        });
      }

      if (recordsById.has(record.id)) {
        addDiagnostic(diagnostics, {
          rule: "record.identity-unique",
          severity: "error",
          message: `Duplicate record identity: ${record.id}`,
          record_id: record.id,
        });
      } else {
        recordsById.set(record.id, loadedRecord);
      }

      if (recordsBySource.has(record.source.path)) {
        addDiagnostic(diagnostics, {
          rule: "record.source-unique",
          severity: "error",
          message: `Multiple descriptors bind source: ${record.source.path}`,
          record_id: record.id,
          source_path: record.source.path,
        });
      } else {
        recordsBySource.set(record.source.path, loadedRecord);
      }

      const sourcePath = resolveExistingPath(
        repositoryRoot,
        record.source.path,
        diagnostics,
        "record.source-path",
        markdownRoot ?? repositoryRoot,
      );
      if (
        !sourcePath ||
        !existsSync(sourcePath) ||
        !lstatSync(sourcePath).isFile()
      ) {
        addDiagnostic(diagnostics, {
          rule: "record.source-exists",
          severity: "error",
          message: `Canonical Markdown source does not exist: ${record.source.path}`,
          record_id: record.id,
          source_path: record.source.path,
        });
        continue;
      }

      const sourceBytes = readFileSync(sourcePath);
      loadedRecord.sourceBytes = sourceBytes;
      const actualDigest = sha256(sourceBytes);
      if (!record.source.digest.value) {
        addDiagnostic(diagnostics, {
          rule: "record.source-digest-required",
          severity: "error",
          message: "Source digest is missing.",
          record_id: record.id,
          source_path: record.source.path,
          remediation: `Run knowledge reconcile --record ${record.id}.`,
        });
      } else if (actualDigest !== record.source.digest.value) {
        addDiagnostic(diagnostics, {
          rule: "record.source-digest",
          severity: "error",
          message: `Source digest mismatch; expected ${record.source.digest.value}, calculated ${actualDigest}`,
          record_id: record.id,
          source_path: record.source.path,
          remediation: `Run knowledge reconcile --record ${record.id}.`,
        });
      }

      const markdown = sourceBytes.toString("utf8");
      const headings = parseHeadings(markdown);
      const titles = headings.filter((heading) => heading.level === 1);
      const documentTitle = titles[0]?.title;
      if (titles.length !== 1) {
        addDiagnostic(diagnostics, {
          rule: "record.h1-count",
          severity: "error",
          message: `Canonical Markdown requires exactly one H1; found ${titles.length}`,
          record_id: record.id,
          source_path: record.source.path,
        });
      }
      if (!documentTitle || documentTitle !== normalizeHeading(record.title)) {
        addDiagnostic(diagnostics, {
          rule: "record.title",
          severity: "error",
          message: `Descriptor title does not match the Markdown H1: ${documentTitle ?? "missing H1"}`,
          record_id: record.id,
          source_path: record.source.path,
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
      for (const section of record.sections) {
        if (sectionIds.has(section.id)) {
          addDiagnostic(diagnostics, {
            rule: "section.identity-unique",
            severity: "error",
            message: `Duplicate section identity: ${section.id}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
        sectionIds.add(section.id);

        const key = `${headingPathKey(section.heading_path)}\u001e${section.occurrence}`;
        if (!headingKeys.has(key)) {
          addDiagnostic(diagnostics, {
            rule: "section.heading-resolves",
            severity: "error",
            message: `Section ${section.id} does not resolve heading occurrence ${section.occurrence}: ${section.heading_path.join(" > ")}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
        if (mappedHeadingKeys.has(key)) {
          addDiagnostic(diagnostics, {
            rule: "section.heading-unique",
            severity: "error",
            message: `Heading occurrence is mapped more than once: ${section.heading_path.join(" > ")} #${section.occurrence}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
        mappedHeadingKeys.add(key);

        if (
          section.role === "unresolved" &&
          section.authority !== "unresolved"
        ) {
          addDiagnostic(diagnostics, {
            rule: "section.unresolved-authority",
            severity: "error",
            message: `Unresolved section ${section.id} must use unresolved authority.`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
      }

      for (const heading of semanticHeadings) {
        const key = `${headingPathKey(heading.path)}\u001e${heading.occurrence}`;
        if (!mappedHeadingKeys.has(key)) {
          addDiagnostic(diagnostics, {
            rule: "section.heading-covered",
            severity: "error",
            message: `Markdown heading is not mapped: ${heading.path.join(" > ")} #${heading.occurrence}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
      }

      if (
        record.type === "architecture-decision" &&
        record.governance.lifecycle !== "immutable"
      ) {
        addDiagnostic(diagnostics, {
          rule: "adr.lifecycle",
          severity: "error",
          message: "Architecture Decision Records must use the immutable lifecycle.",
          record_id: record.id,
          source_path: record.source.path,
        });
      }

      validateBodyContract(record, diagnostics);
      validateGovernanceAgreement(record, markdown, diagnostics);

      const presentationSections = [
        record.presentation.entry_section,
        ...(record.presentation.featured_sections ?? []),
      ].filter((value): value is string => Boolean(value));
      for (const sectionId of presentationSections) {
        if (!sectionIds.has(sectionId)) {
          addDiagnostic(diagnostics, {
            rule: "presentation.section-resolves",
            severity: "error",
            message: `Presentation references unknown section: ${sectionId}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
      }
      if (record.governance.status === "accepted") {
        const sectionsById = new Map(
          record.sections.map((section) => [section.id, section]),
        );
        for (const sectionId of presentationSections) {
          if (sectionsById.get(sectionId)?.authority === "proposal") {
            addDiagnostic(diagnostics, {
              rule: "presentation.proposal-featured",
              severity: "error",
              message: `Accepted record presentation cannot feature proposal section: ${sectionId}`,
              record_id: record.id,
              source_path: record.source.path,
            });
          }
        }
      }
    }

    for (const loadedRecord of loaded.records) {
      const { record } = loadedRecord;
      const sectionIds = new Set(record.sections.map((section) => section.id));
      if (!recordsById.has(record.scope.product)) {
        addDiagnostic(diagnostics, {
          rule: "scope.product-resolves",
          severity: "error",
          message: `Product scope does not resolve: ${record.scope.product}`,
          record_id: record.id,
          source_path: record.source.path,
        });
      }

      for (const relationship of record.relationships) {
        if (!recordsById.has(relationship.target)) {
          addDiagnostic(diagnostics, {
            rule: "relationship.target-resolves",
            severity: "error",
            message: `Relationship target does not resolve: ${relationship.target}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
        if (
          relationship.source_section &&
          !sectionIds.has(relationship.source_section)
        ) {
          addDiagnostic(diagnostics, {
            rule: "relationship.section-resolves",
            severity: "error",
            message: `Relationship source section does not resolve: ${relationship.source_section}`,
            record_id: record.id,
            source_path: record.source.path,
          });
        }
      }
    }

    const rootProduct = recordsById.get(loaded.bundle.product_record)?.record;
    if (!rootProduct || rootProduct.type !== "product") {
      addDiagnostic(diagnostics, {
        rule: "bundle.product-record",
        severity: "error",
        message: `Root Product record does not resolve to type product: ${loaded.bundle.product_record}`,
        source_path: repositoryPath(repositoryRoot, loaded.bundlePath),
      });
    }

    if (markdownRoot) {
      const markdownPaths = walkMarkdown(
        markdownRoot,
        repositoryRoot,
        diagnostics,
      )
        .map((file) => repositoryPath(repositoryRoot, file))
        .sort();
      const nonRecordPaths = new Set<string>();
      for (const nonRecord of loaded.bundle.non_records) {
        if (nonRecordPaths.has(nonRecord.path)) {
          addDiagnostic(diagnostics, {
            rule: "bundle.non-record-unique",
            severity: "error",
            message: `Non-record path is declared more than once: ${nonRecord.path}`,
            source_path: nonRecord.path,
          });
        }
        nonRecordPaths.add(nonRecord.path);
        const resolved = resolveExistingPath(
          repositoryRoot,
          nonRecord.path,
          diagnostics,
          "bundle.non-record-path",
          markdownRoot,
        );
        if (!resolved || !existsSync(resolved) || !lstatSync(resolved).isFile()) {
          addDiagnostic(diagnostics, {
            rule: "bundle.non-record-exists",
            severity: "error",
            message: `Declared non-record does not exist: ${nonRecord.path}`,
            source_path: nonRecord.path,
          });
        }
        if (recordsBySource.has(nonRecord.path)) {
          addDiagnostic(diagnostics, {
            rule: "bundle.non-record-conflict",
            severity: "error",
            message: `Path cannot be both a governed record and non-record: ${nonRecord.path}`,
            source_path: nonRecord.path,
          });
        }
      }

      for (const markdownPath of markdownPaths) {
        if (
          !recordsBySource.has(markdownPath) &&
          !nonRecordPaths.has(markdownPath)
        ) {
          addDiagnostic(diagnostics, {
            rule: "record.classification-required",
            severity: "error",
            message: `Markdown is neither a governed record nor a declared non-record: ${markdownPath}`,
            source_path: markdownPath,
          });
        }
      }

      for (const [sourcePath, loadedRecord] of recordsBySource) {
        if (!markdownPaths.includes(sourcePath)) {
          addDiagnostic(diagnostics, {
            rule: "record.source-governed",
            severity: "error",
            message: `Descriptor source is outside the declared Markdown root: ${sourcePath}`,
            record_id: loadedRecord.record.id,
            source_path: sourcePath,
          });
        }
      }
    }

    if (baseSnapshot) {
      for (const loadedRecord of loaded.records) {
        const base = resolveBase(baseSnapshot, loadedRecord, diagnostics);
        const baseRecord = base.descriptor?.record;
        if (base.markdown) {
          matchedBaseMarkdown.add(base.markdown.path);
        }
        const baseAccepted =
          baseRecord?.governance.status === "accepted" ||
          base.markdown?.status === "accepted";
        const baseImmutable =
          (baseRecord?.type === "architecture-decision" &&
            baseRecord.governance.lifecycle === "immutable" &&
            baseRecord.governance.status === "accepted") ||
          (base.markdown?.title?.startsWith("ADR ") === true &&
            base.markdown.status === "accepted");

        if (baseImmutable) {
          if (
            loadedRecord.record.type !== "architecture-decision" ||
            loadedRecord.record.governance.lifecycle !== "immutable"
          ) {
            addDiagnostic(diagnostics, {
              rule: "adr.base-authority",
              severity: "error",
              message: "Proposed metadata cannot weaken the accepted base ADR authority.",
              record_id: loadedRecord.record.id,
              source_path: loadedRecord.record.source.path,
            });
          }
          if (
            !loadedRecord.sourceBytes ||
            !base.markdown?.bytes.equals(loadedRecord.sourceBytes)
          ) {
            addDiagnostic(diagnostics, {
              rule: "adr.immutable",
              severity: "error",
              message: `Accepted Architecture Decision differs from base ${options.baseRef}`,
              record_id: loadedRecord.record.id,
              source_path: loadedRecord.record.source.path,
              remediation: "Record a later ADR instead of editing the accepted ADR.",
            });
          }
        }

        if (!base.descriptor) {
          proposalRecords.add(loadedRecord.record.id);
          if (!base.markdown && loadedRecord.record.governance.status === "accepted") {
            addDiagnostic(diagnostics, {
              rule: "authority.new-record-accepted",
              severity: "error",
              message: "A new record cannot declare accepted authority without deliberate acceptance evidence.",
              record_id: loadedRecord.record.id,
              source_path: loadedRecord.record.source.path,
            });
          }
          continue;
        }

        if (
          descriptorChanged(loadedRecord, base.descriptor) ||
          !loadedRecord.sourceBytes ||
          !base.markdown?.bytes.equals(loadedRecord.sourceBytes)
        ) {
          proposalRecords.add(loadedRecord.record.id);
        } else if (!baseAccepted && loadedRecord.record.governance.status === "accepted") {
          addDiagnostic(diagnostics, {
            rule: "authority.unaccepted-promotion",
            severity: "error",
            message: "Accepted status is not supported by the accepted base.",
            record_id: loadedRecord.record.id,
            source_path: loadedRecord.record.source.path,
          });
        }
      }

      for (const [recordId, baseDescriptor] of baseSnapshot.recordsById) {
        if (
          baseDescriptor.record.governance.status === "accepted" &&
          !recordsById.has(recordId)
        ) {
          addDiagnostic(diagnostics, {
            rule: "authority.accepted-record-removed",
            severity: "error",
            message: `Accepted-base record is missing from the proposal: ${recordId}`,
            record_id: recordId,
            source_path: baseDescriptor.record.source.path,
          });
        }
      }

      if (baseSnapshot.recordsById.size === 0) {
        for (const baseMarkdown of baseSnapshot.markdown) {
          if (
            baseMarkdown.status === "accepted" &&
            path.basename(baseMarkdown.path) !== "README.md" &&
            !matchedBaseMarkdown.has(baseMarkdown.path)
          ) {
            addDiagnostic(diagnostics, {
              rule: "authority.accepted-markdown-unmapped",
              severity: "error",
              message: `Accepted-base Markdown is not represented by the proposed record set: ${baseMarkdown.path}`,
              source_path: baseMarkdown.path,
            });
          }
        }
      }
    }
  }

  diagnostics.sort((left, right) =>
    [
      left.severity,
      left.rule,
      left.record_id ?? "",
      left.source_path ?? "",
      left.message,
    ]
      .join("\u001f")
      .localeCompare(
        [
          right.severity,
          right.rule,
          right.record_id ?? "",
          right.source_path ?? "",
          right.message,
        ].join("\u001f"),
      ),
  );

  const completedAt = new Date().toISOString();
  const affectedRecords = loaded.records.map(({ record }) => record.id).sort();
  const contracts: string[] = [];
  if (loaded.bundle) {
    contracts.push(loaded.bundle.contract, loaded.bundle.record_contract);
  }

  const revision = repositoryRevision(repositoryRoot);
  const failed = diagnostics.some(
    (diagnostic) => diagnostic.severity === "error",
  );
  const proposalRecordList = [...proposalRecords].sort();
  return {
    execution_id: randomUUID(),
    repository: repositoryRoot,
    ...(revision ? { revision } : {}),
    ...(baseSnapshot ? { base_revision: baseSnapshot.revision } : {}),
    runner:
      options.runner ??
      (process.env.GITHUB_ACTIONS === "true" ? "github-actions" : "local"),
    ...(loaded.bundle ? { bundle: loaded.bundle.id } : {}),
    contracts,
    started_at: startedAt,
    completed_at: completedAt,
    outcome: failed ? "failed" : "passed",
    authority_state: failed
      ? "unresolved"
      : proposalRecordList.length > 0
        ? "proposal-awaiting-acceptance"
        : "accepted-baseline",
    affected_records: affectedRecords,
    proposal_records: proposalRecordList,
    ...(!failed && baseSnapshot && proposalRecordList.length > 0
      ? {
          proposal_digest: proposalDigest(
            repositoryRoot,
            baseSnapshot.revision,
            loaded.records,
          ),
        }
      : {}),
    conformance: {
      format: "legacy",
      structural: failed ? "failed" : "passed",
      contracts: failed ? "failed" : "passed",
      full_bundle: failed ? "failed" : "passed",
      profile: failed ? "failed" : "passed",
    },
    diagnostics,
  };
}

function atomicWrite(filePath: string, contents: string): void {
  const temporary = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
  try {
    writeFileSync(temporary, contents, { encoding: "utf8", flag: "wx" });
    renameSync(temporary, filePath);
  } catch (error) {
    if (existsSync(temporary)) {
      unlinkSync(temporary);
    }
    throw error;
  }
}

function reconcileLegacyKnowledge(
  repositoryRoot: string,
  recordId?: string,
): string[] {
  const loaded = loadKnowledge(repositoryRoot);
  if (loaded.diagnostics.some((diagnostic) => diagnostic.severity === "error")) {
    throw new Error(
      loaded.diagnostics.map((diagnostic) => diagnostic.message).join("\n"),
    );
  }

  const changed: string[] = [];
  let matched = false;
  for (const loadedRecord of loaded.records) {
    const { record, descriptorPath } = loadedRecord;
    if (recordId && record.id !== recordId) {
      continue;
    }
    matched = true;
    const diagnostics: KnowledgeDiagnostic[] = [];
    const sourcePath = resolveExistingPath(
      repositoryRoot,
      record.source.path,
      diagnostics,
      "record.source-path",
    );
    if (!sourcePath || diagnostics.length > 0 || !existsSync(sourcePath)) {
      throw new Error(
        diagnostics.map((diagnostic) => diagnostic.message).join("\n") ||
          `Canonical Markdown source does not exist: ${record.source.path}`,
      );
    }
    const digest = sha256(readFileSync(sourcePath));
    if (record.source.digest.value === digest) {
      continue;
    }

    record.source.digest.value = digest;
    atomicWrite(
      descriptorPath,
      stringify(record, { lineWidth: 0, sortMapEntries: false }),
    );
    changed.push(record.id);
  }

  if (recordId && !matched) {
    throw new Error(`Unknown knowledge record: ${recordId}`);
  }

  return changed;
}

function inspectLegacyKnowledge(
  repositoryRoot: string,
  recordId: string,
  baseRef: string,
): {
  record: KnowledgeRecord;
  markdown: string;
  validation: ValidationResult;
} {
  const validation = validateLegacyKnowledge(repositoryRoot, { baseRef });
  if (validation.outcome === "failed") {
    const relevant = validation.diagnostics.filter(
      ({ record_id }) => !record_id || record_id === recordId,
    );
    throw new Error(
      `Cannot inspect invalid or stale knowledge:\n${relevant
        .map(({ rule, message }) => `${rule}: ${message}`)
        .join("\n")}`,
    );
  }

  const loaded = loadKnowledge(repositoryRoot);
  const loadedRecord = loaded.records.find(
    ({ record }) => record.id === recordId,
  );
  if (!loadedRecord) {
    throw new Error(`Unknown knowledge record: ${recordId}`);
  }

  return {
    record: loadedRecord.record,
    markdown: readFileSync(
      path.resolve(repositoryRoot, loadedRecord.record.source.path),
      "utf8",
    ),
    validation,
  };
}

function manifestContract(
  repositoryRoot: string,
  manifestPath = bundleRelativePath,
): string | undefined {
  const absolute = path.resolve(repositoryRoot, manifestPath);
  try {
    const source = readFileSync(absolute, "utf8");
    try {
      const manifest = parse(source) as { contract?: unknown };
      return typeof manifest?.contract === "string"
        ? manifest.contract
        : undefined;
    } catch {
      return /^\s*contract:\s*nkf\.bundle\/v1\s*$/m.test(source)
        ? "nkf.bundle/v1"
        : undefined;
    }
  } catch {
    return undefined;
  }
}

function unsupportedContractResult(
  repositoryRoot: string,
  contract: string | undefined,
  runner: ValidationResult["runner"],
): ValidationResult {
  const now = new Date().toISOString();
  const revision = repositoryRevision(repositoryRoot);
  return {
    execution_id: randomUUID(),
    repository: repositoryRoot,
    ...(revision ? { revision } : {}),
    runner,
    contracts: contract ? [contract] : [],
    started_at: now,
    completed_at: now,
    outcome: "failed",
    authority_state: "unresolved",
    affected_records: [],
    proposal_records: [],
    conformance: {
      format: contract?.startsWith("nkf.") ? "nkf" : "legacy",
      structural: "failed",
      contracts: "not-evaluated",
      full_bundle: "failed",
      profile: "not-requested",
    },
    diagnostics: [
      {
        rule: "contract.unsupported",
        severity: "error",
        category: "contract",
        message: contract
          ? `Unsupported bundle contract: ${contract}`
          : "The bundle contract cannot be identified.",
        source_path: bundleRelativePath,
      },
    ],
  };
}

export function validateKnowledge(
  repositoryRoot: string,
  options: ValidateOptions = {},
): ValidationResult {
  const manifestPath = options.manifestPath ?? bundleRelativePath;
  const contract = manifestContract(repositoryRoot, manifestPath);
  if (contract === "nkf.bundle/v1") {
    return validateNkfKnowledge(repositoryRoot, {
      ...(options.baseRef ? { baseRef: options.baseRef } : {}),
      ...(options.runner ? { runner: options.runner } : {}),
      manifestPath,
    });
  }
  if (contract === "nourd.knowledge.bundle/v1") {
    return validateLegacyKnowledge(repositoryRoot, {
      baseRef: options.baseRef ?? "main",
      ...(options.runner ? { runner: options.runner } : {}),
    });
  }
  return unsupportedContractResult(
    repositoryRoot,
    contract,
    options.runner ?? "local",
  );
}

export function reconcileKnowledge(
  repositoryRoot: string,
  recordId?: string,
  options: { manifestPath?: string } = {},
): string[] {
  const manifestPath = options.manifestPath ?? bundleRelativePath;
  const contract = manifestContract(repositoryRoot, manifestPath);
  if (contract === "nkf.bundle/v1") {
    return reconcileNkfKnowledge(repositoryRoot, recordId, manifestPath);
  }
  if (contract === "nourd.knowledge.bundle/v1") {
    return reconcileLegacyKnowledge(repositoryRoot, recordId);
  }
  throw new Error(
    contract
      ? `Unsupported bundle contract: ${contract}`
      : "The bundle contract cannot be identified.",
  );
}

export function inspectKnowledge(
  repositoryRoot: string,
  recordId: string,
  baseRef?: string,
  options: { manifestPath?: string } = {},
) {
  const manifestPath = options.manifestPath ?? bundleRelativePath;
  const contract = manifestContract(repositoryRoot, manifestPath);
  if (contract === "nkf.bundle/v1") {
    return inspectNkfKnowledge(repositoryRoot, recordId, {
      ...(baseRef ? { baseRef } : {}),
      manifestPath,
    });
  }
  if (contract === "nourd.knowledge.bundle/v1") {
    return inspectLegacyKnowledge(repositoryRoot, recordId, baseRef ?? "main");
  }
  throw new Error(
    contract
      ? `Unsupported bundle contract: ${contract}`
      : "The bundle contract cannot be identified.",
  );
}

export function defaultRepositoryRoot(): string {
  return findRepositoryRoot(process.cwd());
}
