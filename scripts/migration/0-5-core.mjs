import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const digest = (value) => ({ algorithm: "sha-256", value });
const serializeYaml = (value) => YAML.stringify(value, {
  lineWidth: 0,
  aliasDuplicateObjects: false,
});
const POSIX = path.posix;
const STATE_KEYS = [
  "record_lifecycle", "record_status", "decision_authority", "task", "design_disposition",
  "design_decisions", "superseded_by", "withdrawal_source", "proposal_authority_effect",
  "proposal_evidence", "implementation_evidence", "confirmation_status", "confirmation_decisions",
  "unconfirmed_scope", "task_id", "task_status", "owner", "related_tasks",
];

function fail(message) {
  throw new Error(message);
}

function parseFrontmatter(bytes, label) {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  const lines = text.split(/\r?\n/u);
  if (lines[0] !== "---") return {};
  const close = lines.indexOf("---", 1);
  if (close < 0) fail(`${label} has unclosed YAML frontmatter.`);
  const value = YAML.parse(lines.slice(1, close).join("\n"), { schema: "core", strict: true, uniqueKeys: true });
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} frontmatter is not one mapping.`);
  return value;
}

function predecessorState(frontmatter) {
  return Object.fromEntries(STATE_KEYS.filter((key) => Object.hasOwn(frontmatter, key)).map((key) => [key, frontmatter[key]]));
}

function recordInitialState(record) {
  const keys = [
    "task", "design_disposition", "design_decisions", "superseded_by", "withdrawal_source",
    "proposal_authority_effect", "proposal_evidence", "implementation_evidence", "confirmation_status",
    "confirmation_decisions", "unconfirmed_scope",
  ];
  return structuredClone({
    governance: record.governance,
    ...Object.fromEntries(keys.filter((key) => Object.hasOwn(record, key)).map((key) => [key, record[key]])),
  });
}

function applyRecordState(record, frontmatter) {
  const mappings = [
    "task", "design_disposition", "design_decisions", "superseded_by", "withdrawal_source",
    "proposal_authority_effect", "proposal_evidence", "implementation_evidence", "confirmation_status",
    "confirmation_decisions", "unconfirmed_scope",
  ];
  for (const key of mappings) {
    if (Object.hasOwn(frontmatter, key)) record[key] = frontmatter[key];
  }
}

function documentInitialState(document) {
  return structuredClone(Object.fromEntries(
    ["state", "owner", "decision_authority", "related_tasks"]
      .filter((key) => Object.hasOwn(document, key))
      .map((key) => [key === "state" ? "document_state" : key, document[key]]),
  ));
}

function documentId(bundleId, item, frontmatter) {
  if (item.kind === "task") {
    if (typeof frontmatter.task_id !== "string" || frontmatter.task_id === "") {
      fail(`${item.path} has no stable Task identity for NKF 0.5 migration.`);
    }
    return frontmatter.task_id;
  }
  return `document-${sha256(Buffer.from(`${bundleId}\0${item.path}`, "utf8"))}`;
}

function relativeLink(from, to) {
  const value = POSIX.relative(POSIX.dirname(from), to);
  return value === "" ? POSIX.basename(to) : value;
}

function generatedIndex(title, items, indexPath) {
  const body = items.length === 0
    ? "No applicable item is currently represented."
    : items.map((item) => `- [${item.label}](${relativeLink(indexPath, item.path)})`).join("\n");
  return `# ${title}\n\n${body}\n`;
}

function sectionId(pathParts) {
  return pathParts.join("-").toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "");
}

function semanticSections(sourceBytes, responsibilities = new Map()) {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(sourceBytes);
  const lines = text.split(/\r?\n/u);
  const occurrences = new Map();
  let currentH2 = null;
  let fence = null;
  const sections = [];
  for (const line of lines) {
    const fenceMatch = /^\s*(`{3,}|~{3,})/u.exec(line);
    if (fenceMatch !== null) {
      const marker = fenceMatch[1][0];
      if (fence === null) fence = marker;
      else if (fence === marker) fence = null;
      continue;
    }
    if (fence !== null) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/u.exec(line);
    if (match === null) continue;
    const level = match[1].length;
    const heading = match[2].replace(/\s+#+\s*$/u, "").trim();
    const headingPath = level === 2 ? [heading] : [currentH2 ?? heading, heading];
    if (level === 2) currentH2 = heading;
    const key = JSON.stringify(headingPath);
    const occurrence = (occurrences.get(key) ?? 0) + 1;
    occurrences.set(key, occurrence);
    const configured = responsibilities.get(key);
    sections.push({
      id: sectionId(headingPath),
      heading_path: headingPath,
      occurrence,
      authority: heading === "Unresolved Matters" ? "unresolved" : "accepted-meaning",
      role: heading === "Unresolved Matters" ? "unresolved" : configured?.role ?? "governing",
      ...(configured?.responsibilities === undefined ? {} : { responsibilities: configured.responsibilities }),
    });
  }
  return sections;
}

const SPECIFICATION_RESPONSIBILITIES = new Map([
  [JSON.stringify(["Purpose"]), { role: "governing", responsibilities: ["specification-definition", "requirements-constraints-and-interfaces"] }],
  [JSON.stringify(["Normative Status"]), { role: "governing", responsibilities: ["authority-and-normative-status"] }],
  [JSON.stringify(["Scope"]), { role: "applicability", responsibilities: ["scope-and-applicability"] }],
  [JSON.stringify(["Core Model"]), { role: "definition", responsibilities: ["model-vocabulary-and-semantics"] }],
  [JSON.stringify(["Versioning"]), { role: "evolution", responsibilities: ["versioning-compatibility-and-migration"] }],
  [JSON.stringify(["Section Authority"]), { role: "boundary", responsibilities: ["security-authority-and-operational-boundaries"] }],
  [JSON.stringify(["Conformance"]), { role: "validation", responsibilities: ["validation-and-conformance"] }],
  [JSON.stringify(["Unresolved Matters"]), { role: "unresolved", responsibilities: ["unresolved-and-deferred-matters"] }],
]);

function producerAuthorityRecords(bundle, knowledgeRoot, migratedRecords, migratedNonRecords) {
  if (bundle.id !== "nourd-knowledge-format") return null;
  const predecessor = migratedNonRecords.find((entry) => entry.path === "specifications/nkf-0.5.md" && entry.kind === "evidence");
  const successor = migratedNonRecords.find((entry) => entry.path === "specifications/nkf-0.5-revision-2.md" && entry.kind === "evidence");
  if (predecessor === undefined || successor === undefined) return null;
  return { predecessor, successor };
}

function replaceAllLinks(text, replacements) {
  let result = text;
  for (const [from, to] of replacements) {
    result = result.replaceAll(`](${from})`, `](${to})`);
  }
  return result;
}

function legacyLock(predecessorVersion, sourceDigest, predecessor, initial, governanceAuthority, document = false) {
  if (Object.keys(predecessor).length === 0) return undefined;
  const lock = {
    predecessor_version: predecessorVersion,
    source_digest: digest(sourceDigest),
    predecessor_state: predecessor,
    initial_declaration_state: initial,
  };
  if (!document && typeof predecessor.decision_authority === "string") {
    if (!Array.isArray(governanceAuthority) || governanceAuthority.length === 0) {
      fail("A migrated record decision_authority requires an explicit non-empty governance authority mapping.");
    }
    lock.authority_mapping = {
      source_value: predecessor.decision_authority,
      authority_ids: [...governanceAuthority],
      approved_by: "repository-owner",
    };
  }
  return lock;
}

export async function migrateProjectTo0_5(projectRoot, options = {}) {
  const root = path.resolve(projectRoot);
  const bundlePath = path.join(root, ".nourd/knowledge/bundle.yaml");
  const bundle = YAML.parse(await readFile(bundlePath, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
  if (!["0.1", "0.2", "0.3", "0.4"].includes(bundle?.nkf_version) || bundle?.contract !== "nkf.bundle") {
    fail("NKF 0.5 migration requires one supported 0.1-0.4 bundle predecessor.");
  }
  const predecessorVersion = bundle.nkf_version;
  const knowledgeRoot = path.join(root, bundle.knowledge_root);
  const recordsRoot = path.join(root, ".nourd/knowledge/records");
  const recordNames = (await readdir(recordsRoot)).filter((name) => name.endsWith(".yaml")).sort();
  const migratedRecords = [];
  for (const name of recordNames) {
    const declarationPath = path.join(recordsRoot, name);
    const record = YAML.parse(await readFile(declarationPath, "utf8"), { schema: "core", strict: true, uniqueKeys: true });
    const sourcePath = path.join(knowledgeRoot, record.source.path);
    const sourceBytes = await readFile(sourcePath);
    const sourceDigest = sha256(sourceBytes);
    if (record.source?.digest?.value !== sourceDigest) fail(`${record.source.path} does not match its predecessor source digest.`);
    const frontmatter = parseFrontmatter(sourceBytes, record.source.path);
    const migrated = {
      ...record,
      source: { path: record.source.path, stable_path: record.source.path, digest: record.source.digest },
    };
    applyRecordState(migrated, frontmatter);
    const lock = legacyLock(
      predecessorVersion,
      sourceDigest,
      predecessorState(frontmatter),
      recordInitialState(migrated),
      migrated.governance?.authority,
    );
    if (lock !== undefined) migrated.legacy_lock = lock;
    await writeFile(declarationPath, serializeYaml(migrated));
    migratedRecords.push(migrated);
  }

  const migratedNonRecords = [];
  for (const item of bundle.non_records ?? []) {
    if (!["task", "evidence"].includes(item.kind)) {
      migratedNonRecords.push(item);
      continue;
    }
    const sourceBytes = await readFile(path.join(knowledgeRoot, item.path));
    const frontmatter = parseFrontmatter(sourceBytes, item.path);
    const gate = item.kind === "task" ? options.retrospectiveGates?.get(frontmatter.task_id) : undefined;
    if (gate !== undefined) {
      const expected = Buffer.concat([gate.bytes, Buffer.from("\n\n", "utf8"), gate.gate_bytes]);
      if (!sourceBytes.equals(expected)) fail(`${item.path} does not equal its exact reviewed retrospective gate transformation.`);
    }
    const id = documentId(bundle.id, item, frontmatter);
    const document = {
      id,
      stable_path: item.path,
      digest: digest(sha256(sourceBytes)),
      ...(item.kind === "task" ? {
        state: { vocabulary: "task-status", value: frontmatter.task_status },
        ...(typeof frontmatter.owner === "string" ? { owner: frontmatter.owner } : {}),
        ...(typeof frontmatter.decision_authority === "string" ? { decision_authority: frontmatter.decision_authority } : {}),
        ...(Array.isArray(frontmatter.related_tasks) ? { related_tasks: frontmatter.related_tasks } : {}),
      } : {}),
      relationships: [],
    };
    if (item.kind === "task") {
      const lock = legacyLock(
        predecessorVersion,
        document.digest.value,
        predecessorState(frontmatter),
        documentInitialState(document),
        undefined,
        true,
      );
      if (lock !== undefined) document.legacy_lock = lock;
      if (lock !== undefined && gate !== undefined) {
        lock.source_transformation = {
          kind: "retrospective-task-gate",
          predecessor_source_digest: digest(sha256(gate.bytes)),
          appended_gate_digest: digest(sha256(gate.gate_bytes)),
          reviewer: structuredClone(gate.reviewer),
          reviewed_at: gate.reviewed_at,
        };
      }
    }
    migratedNonRecords.push({ ...item, document });
  }
  const producerPair = producerAuthorityRecords(bundle, knowledgeRoot, migratedRecords, migratedNonRecords);
  if (producerPair !== null) {
    const predecessorBytes = await readFile(path.join(knowledgeRoot, producerPair.predecessor.path));
    const successorBytes = await readFile(path.join(knowledgeRoot, producerPair.successor.path));
    if (sha256(predecessorBytes) !== "d93e8da4e3abeb7d047d15351f2003d2d242596790fb7db94be994b7e88499dc") {
      fail("The NKF producer prepublication predecessor Specification does not match ADR 0116.");
    }
    if (sha256(successorBytes) !== "0f3b7c085eba4fa92655e20916fccb7013169b5560dd50c241fb4726df31287c") {
      fail("The NKF producer revision 2 Specification does not match ADR 0118.");
    }
    const base = {
      contract: "nkf.record",
      type: "specification",
      body_contract: "nkf.specification",
      scope: { root: bundle.root.record },
      task: "NKF-026",
    };
    const predecessorFrontmatter = parseFrontmatter(predecessorBytes, producerPair.predecessor.path);
    const successorFrontmatter = parseFrontmatter(successorBytes, producerPair.successor.path);
    const predecessorRecord = {
      ...base,
      id: "nkf-0.5-specification",
      title: predecessorFrontmatter.title,
      source: { path: producerPair.predecessor.path, stable_path: producerPair.predecessor.path, digest: digest(sha256(predecessorBytes)) },
      governance: { lifecycle: "immutable", status: "superseded", authority: ["codex-technical-reviewer"] },
      sections: semanticSections(predecessorBytes, SPECIFICATION_RESPONSIBILITIES),
      relationships: [],
      superseded_by: ["nkf-0.5-specification-revision-2"],
      prepublication_supersession_lock: {
        source: { id: "nkf-0.5-specification", path: "knowledge/specifications/nkf-0.5.md", digest: digest(sha256(predecessorBytes)) },
        accepted_executable: { path: "contracts/nkf/0.5/nkf.yaml", digest: digest("73d9cf683a799729fba6fb64e59aefef0477601827f8f0045aec7d95955d3fd2") },
        acceptance_decision: { id: "adr-0116", digest: digest("777ecabcbab3c106f2889661125a923ce0f331a759a4bd2b6b0d18e7ed542ee8") },
        correction_decision: { id: "adr-0119", digest: digest("142802158a2f874d8d2d626428a07e172e7769bc1a918bf65a954067c596641c") },
        current_state: { lifecycle: "immutable", status: "superseded" },
        superseded_by: ["nkf-0.5-specification-revision-2"],
      },
    };
    const successorRecord = {
      ...base,
      id: "nkf-0.5-specification-revision-2",
      title: successorFrontmatter.title,
      source: { path: producerPair.successor.path, stable_path: producerPair.successor.path, digest: digest(sha256(successorBytes)) },
      governance: { lifecycle: "immutable", status: "accepted", authority: ["codex-technical-reviewer"] },
      sections: semanticSections(successorBytes, SPECIFICATION_RESPONSIBILITIES),
      relationships: [{ type: "governs", target: bundle.root.record, source_section: "scope" }],
      accepted_bootstrap_lock: {
        predecessor_version: "0.4",
        source_digest: digest(sha256(successorBytes)),
        accepting_decision: { id: "adr-0119", digest: digest("142802158a2f874d8d2d626428a07e172e7769bc1a918bf65a954067c596641c") },
        predecessor_state: {
          record_lifecycle: successorFrontmatter.record_lifecycle,
          record_status: successorFrontmatter.record_status,
          decision_authority: successorFrontmatter.decision_authority,
          task: successorFrontmatter.task,
        },
        current_state: { lifecycle: "immutable", status: "accepted" },
      },
    };
    for (const record of [predecessorRecord, successorRecord]) {
      await writeFile(path.join(recordsRoot, `${record.id}.yaml`), serializeYaml(record));
      migratedRecords.push(record);
    }
    for (const selected of [producerPair.predecessor, producerPair.successor]) {
      migratedNonRecords.splice(migratedNonRecords.indexOf(selected), 1);
    }
  }
  const migratedBundle = {
    ...bundle,
    nkf_version: "0.5",
    non_records: migratedNonRecords,
    knowledge_graph: {
      policy: "nkf.freshness-policy.0.5",
      baseline: ".nourd/knowledge/freshness/baseline.yaml",
    },
  };
  const taskStates = ["active", "deferred", "completed", "cancelled"];
  const designStates = ["active", "adopted", "rejected", "superseded", "withdrawn"];
  const generatedNonRecords = [];
  for (const state of taskStates) {
    const indexPath = `tasks/by-state/${state}.md`;
    const items = migratedNonRecords
      .filter((item) => item.kind === "task" && item.document?.state?.value === state)
      .map((item) => ({ path: item.path, label: item.document.id }))
      .sort((left, right) => left.path.localeCompare(right.path, "en"));
    await mkdir(path.dirname(path.join(knowledgeRoot, indexPath)), { recursive: true });
    await writeFile(path.join(knowledgeRoot, indexPath), generatedIndex(`${state[0].toUpperCase()}${state.slice(1)} Tasks`, items, indexPath));
    generatedNonRecords.push({ path: indexPath, kind: "generated" });
  }
  for (const state of designStates) {
    const indexPath = `designs/by-disposition/${state}.md`;
    const items = migratedRecords
      .filter((record) => record.type === "design" && record.design_disposition === state)
      .map((record) => ({ path: record.source.path, label: record.title }))
      .sort((left, right) => left.path.localeCompare(right.path, "en"));
    await mkdir(path.dirname(path.join(knowledgeRoot, indexPath)), { recursive: true });
    await writeFile(path.join(knowledgeRoot, indexPath), generatedIndex(`${state[0].toUpperCase()}${state.slice(1)} Designs`, items, indexPath));
    generatedNonRecords.push({ path: indexPath, kind: "generated" });
  }
  const taskReplacements = taskStates.map((state) => [`${state}/README.md`, `by-state/${state}.md`]);
  const designReplacements = designStates.map((state) => [`${state}/README.md`, `by-disposition/${state}.md`]);
  const taskIndex = path.join(knowledgeRoot, "tasks/README.md");
  const designIndex = path.join(knowledgeRoot, "designs/README.md");
  await writeFile(taskIndex, replaceAllLinks(await readFile(taskIndex, "utf8"), taskReplacements));
  await writeFile(designIndex, replaceAllLinks(await readFile(designIndex, "utf8"), designReplacements));
  migratedBundle.non_records = [
    ...migratedBundle.non_records,
    ...generatedNonRecords,
  ].sort((left, right) => String(left.path).localeCompare(String(right.path), "en"));
  await writeFile(bundlePath, serializeYaml(migratedBundle));
  return {
    predecessor_version: predecessorVersion,
    nkf_version: "0.5",
    records: migratedRecords.length,
    documents: migratedNonRecords.filter((item) => item.document !== undefined).length,
  };
}
