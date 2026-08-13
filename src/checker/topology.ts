import path from "node:path";
import { parseMarkdown, type MarkdownModel } from "./markdown.js";
import type { RuleEmitter } from "./diagnostics.js";
import type { Observation } from "./project.js";

interface TopologyRecord {
  value: Record<string, any> | null;
  sourceObservation?: Observation;
}

interface TopologyNonRecord {
  declaration: Record<string, any>;
  observation: Observation;
}

interface TopologyInput {
  bundle: Record<string, any>;
  records: TopologyRecord[];
  nonRecords: TopologyNonRecord[];
  executable: Record<string, any>;
  knowledgeRoot: string;
  emitter: RuleEmitter;
}

function artifact(knowledgeRoot: string, sourcePath: string): string {
  return path.posix.join(knowledgeRoot, sourcePath);
}

function sourcePath(record: TopologyRecord): string | null {
  const value = record.value?.source?.path;
  return typeof value === "string" ? value : null;
}

function markdown(observation: Observation | undefined): MarkdownModel | null {
  if (observation?.bytes === null || observation?.bytes === undefined) return null;
  try {
    return parseMarkdown(new TextDecoder("utf-8", { fatal: true }).decode(observation.bytes));
  } catch {
    return null;
  }
}

function resolveTopologyTarget(from: string, destination: string): string | null {
  if (
    destination.length === 0 ||
    path.posix.isAbsolute(destination) ||
    destination.startsWith("//") ||
    /^[A-Za-z][A-Za-z0-9+.-]*:/.test(destination) ||
    /[?#%\\]/.test(destination)
  ) {
    return null;
  }
  for (const character of destination) {
    const point = character.codePointAt(0);
    if (point === 0 || (point !== undefined && (point < 0x20 || point === 0x7f))) return null;
  }
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(from), destination));
  if (resolved === ".." || resolved.startsWith("../") || path.posix.isAbsolute(resolved)) return null;
  return resolved.endsWith("/") ? resolved.slice(0, -1) : resolved;
}

function resolvedLinks(source: string, model: MarkdownModel | null): string[] {
  if (model === null) return [];
  return model.links
    .map((destination) => resolveTopologyTarget(source, destination))
    .filter((target): target is string => target !== null);
}

function count(values: string[], target: string): number {
  return values.filter((value) => value === target).length;
}

function parseManagedBlock(model: MarkdownModel): {
  valid: boolean;
  links: string[];
  headingCount: number;
} {
  const lines = model.body.split(/\r?\n/);
  const starts = lines.flatMap((line, index) => line === "<!-- nkf-navigation:start -->" ? [index] : []);
  const ends = lines.flatMap((line, index) => line === "<!-- nkf-navigation:end -->" ? [index] : []);
  if (starts.length !== 1 || ends.length !== 1 || starts[0] === undefined || ends[0] === undefined || starts[0] >= ends[0]) {
    return { valid: false, links: [], headingCount: 0 };
  }
  const block = parseMarkdown(lines.slice(starts[0] + 1, ends[0]).join("\n"));
  const blockHeadingCount = block.sections.filter(
    (heading) => heading.level === 2 && heading.text === "NKF Navigation",
  ).length;
  const totalHeadingCount = model.sections.filter(
    (heading) => heading.level === 2 && heading.text === "NKF Navigation",
  ).length;
  return {
    valid: blockHeadingCount === 1 && totalHeadingCount === 1,
    links: block.links,
    headingCount: blockHeadingCount,
  };
}

function emitIndexMismatch(
  emitter: RuleEmitter,
  knowledgeRoot: string,
  indexPath: string,
  target: string,
  observedCount: number,
): void {
  emitter.emit(
    "knowledge.topology.index.invalid",
    `The lifecycle index must link ${target} exactly once; observed ${observedCount}.`,
    { artifact: artifact(knowledgeRoot, indexPath) },
  );
}

export function validatePortableTopology(input: TopologyInput): void {
  const { bundle, records, nonRecords, executable, knowledgeRoot, emitter } = input;
  const contract = executable.portable_topology;
  if (contract === null || typeof contract !== "object") return;

  const recordByPath = new Map<string, TopologyRecord[]>();
  for (const record of records) {
    const candidate = sourcePath(record);
    if (candidate === null) continue;
    const group = recordByPath.get(candidate) ?? [];
    group.push(record);
    recordByPath.set(candidate, group);
  }
  const nonRecordByPath = new Map<string, TopologyNonRecord[]>();
  for (const nonRecord of nonRecords) {
    const candidate = nonRecord.declaration.path;
    if (typeof candidate !== "string") continue;
    const group = nonRecordByPath.get(candidate) ?? [];
    group.push(nonRecord);
    nonRecordByPath.set(candidate, group);
  }

  const modelByPath = new Map<string, MarkdownModel | null>();
  for (const [candidate, group] of recordByPath) {
    modelByPath.set(candidate, markdown(group[0]?.sourceObservation));
  }
  for (const [candidate, group] of nonRecordByPath) {
    modelByPath.set(candidate, markdown(group[0]?.observation));
  }

  for (const required of contract.required_paths ?? []) {
    const requiredPath = String(required.path);
    const recordsAtPath = recordByPath.get(requiredPath) ?? [];
    const nonRecordsAtPath = nonRecordByPath.get(requiredPath) ?? [];
    if (required.representation === "record") {
      if (recordsAtPath.length !== 1) {
        emitter.emit(
          requiredPath === "realizations/current-system.md"
            ? "knowledge.topology.current-system.invalid"
            : "knowledge.topology.representation.invalid",
          "The required topology record does not resolve exactly once.",
          { artifact: artifact(knowledgeRoot, requiredPath) },
        );
        continue;
      }
      const value = recordsAtPath[0]?.value;
      if (value?.type !== required.type || value?.body_contract !== required.body_contract) {
        emitter.emit(
          "knowledge.topology.current-system.invalid",
          "The consolidated current-system path must resolve to one nkf.realization record.",
          { artifact: artifact(knowledgeRoot, requiredPath), record_id: String(value?.id ?? "") },
        );
      }
      const observation = recordsAtPath[0]?.sourceObservation;
      if (observation === undefined || observation.entry.final_kind !== "regular-file") {
        emitter.emit("knowledge.topology.path.missing", "A required topology file is missing or not regular.", {
          artifact: artifact(knowledgeRoot, requiredPath),
        });
      } else if (observation.hasSymlink) {
        emitter.emit("knowledge.topology.representation.invalid", "A required topology file must not traverse a symbolic link.", {
          artifact: artifact(knowledgeRoot, requiredPath),
        });
      }
    } else {
      if (nonRecordsAtPath.length !== 1) {
        emitter.emit("knowledge.topology.representation.invalid", "The required topology non-record does not resolve exactly once.", {
          artifact: artifact(knowledgeRoot, requiredPath),
        });
        continue;
      }
      const nonRecord = nonRecordsAtPath[0];
      if (nonRecord?.declaration.kind !== required.kind) {
        emitter.emit("knowledge.topology.representation.invalid", "The required topology non-record has the wrong kind.", {
          artifact: artifact(knowledgeRoot, requiredPath),
        });
      }
      if (nonRecord?.observation.entry.final_kind !== "regular-file") {
        emitter.emit("knowledge.topology.path.missing", "A required topology file is missing or not regular.", {
          artifact: artifact(knowledgeRoot, requiredPath),
        });
      } else if (nonRecord.observation.hasSymlink) {
        emitter.emit("knowledge.topology.representation.invalid", "A required topology file must not traverse a symbolic link.", {
          artifact: artifact(knowledgeRoot, requiredPath),
        });
      }
    }
  }

  const rootRecord = records.find((record) => record.value?.id === bundle.root?.record);
  const rootSource = rootRecord === undefined ? null : sourcePath(rootRecord);
  const mapModel = modelByPath.get("README.md") ?? null;
  if (mapModel !== null) {
    const block = parseManagedBlock(mapModel);
    if (!block.valid) {
      emitter.emit("knowledge.topology.map.invalid", "The canonical map must contain exactly one valid managed NKF Navigation block.", {
        artifact: artifact(knowledgeRoot, "README.md"),
      });
    } else {
      const targets = block.links
        .map((destination) => resolveTopologyTarget("README.md", destination))
        .filter((target): target is string => target !== null);
      const requiredTargets = (contract.canonical_map?.managed_block?.required_targets ?? [])
        .map((target: unknown) => target === "profile-root-source" ? rootSource : String(target))
        .filter((target: string | null): target is string => target !== null);
      for (const target of requiredTargets) {
        const observed = count(targets, target);
        if (observed !== 1) {
          emitter.emit("knowledge.topology.map-target.invalid", `The canonical map must link ${target} exactly once; observed ${observed}.`, {
            artifact: artifact(knowledgeRoot, "README.md"),
          });
        }
        const totalObserved = count(resolvedLinks("README.md", mapModel), target);
        if (totalObserved !== observed) {
          emitter.emit("knowledge.topology.map-target.invalid", `The canonical map links required target ${target} outside the managed block.`, {
            artifact: artifact(knowledgeRoot, "README.md"),
          });
        }
      }
    }
  }

  const representedPaths = [...recordByPath.keys(), ...nonRecordByPath.keys()];
  for (const candidate of representedPaths) {
    if (/^README-[0-9]+\.md$/.test(candidate)) {
      emitter.emit("knowledge.topology.generated-map.conflict", "A competing suffixed knowledge map is represented.", {
        artifact: artifact(knowledgeRoot, candidate),
      });
    }
  }

  const indexLinks = (indexPath: string) => resolvedLinks(indexPath, modelByPath.get(indexPath) ?? null);
  const requireIndexTargets = (indexPath: string, expected: string[]) => {
    const links = indexLinks(indexPath);
    for (const target of expected) {
      const observed = count(links, target);
      if (observed !== 1) emitIndexMismatch(emitter, knowledgeRoot, indexPath, target, observed);
    }
  };

  const version = String(bundle.nkf_version ?? "0.1");
  const modernTopology = version === "0.5";
  const taskIndexPaths = modernTopology
    ? {
        active: "tasks/by-state/active.md",
        deferred: "tasks/by-state/deferred.md",
        completed: "tasks/by-state/completed.md",
        cancelled: "tasks/by-state/cancelled.md",
      }
    : {
        active: "tasks/active/README.md",
        deferred: "tasks/deferred/README.md",
        completed: "tasks/completed/README.md",
        cancelled: "tasks/cancelled/README.md",
      };
  requireIndexTargets("tasks/README.md", Object.values(taskIndexPaths));
  const tasks = nonRecords.filter((item) => item.declaration.kind === "task");
  const taskPlacements: Record<string, { prefix?: string; index: string }> = {
    active: { ...(modernTopology ? {} : { prefix: "tasks/active/" }), index: taskIndexPaths.active },
    deferred: { ...(modernTopology ? {} : { prefix: "tasks/deferred/" }), index: taskIndexPaths.deferred },
    completed: { ...(modernTopology ? {} : { prefix: "tasks/completed/" }), index: taskIndexPaths.completed },
    cancelled: { ...(modernTopology ? {} : { prefix: "tasks/cancelled/" }), index: taskIndexPaths.cancelled },
  };
  for (const task of tasks) {
    const taskPath = String(task.declaration.path);
    const status = modernTopology
      ? task.declaration.document?.state?.value
      : markdown(task.observation)?.frontMatter?.task_status;
    const placement = typeof status === "string" ? taskPlacements[status] : undefined;
    if (placement === undefined) continue;
    if (placement.prefix !== undefined && (!taskPath.startsWith(placement.prefix) || taskPath === `${placement.prefix}README.md`)) {
      emitter.emit("knowledge.topology.lifecycle-path.invalid", "The Task path does not agree with task_status.", {
        artifact: artifact(knowledgeRoot, taskPath),
      });
    }
    requireIndexTargets(placement.index, [taskPath]);
    for (const [otherStatus, otherPlacement] of Object.entries(taskPlacements)) {
      if (otherStatus !== status && count(indexLinks(otherPlacement.index), taskPath) > 0) {
        emitIndexMismatch(emitter, knowledgeRoot, otherPlacement.index, taskPath, count(indexLinks(otherPlacement.index), taskPath));
      }
    }
  }

  const designIndexPaths = modernTopology
    ? {
        active: "designs/by-disposition/active.md",
        adopted: "designs/by-disposition/adopted.md",
        rejected: "designs/by-disposition/rejected.md",
        superseded: "designs/by-disposition/superseded.md",
        withdrawn: "designs/by-disposition/withdrawn.md",
      }
    : {
        active: "designs/active/README.md",
        adopted: "designs/adopted/README.md",
        rejected: "designs/rejected/README.md",
        superseded: "designs/superseded/README.md",
        withdrawn: "designs/withdrawn/README.md",
      };
  requireIndexTargets("designs/README.md", Object.values(designIndexPaths));
  const designPlacements: Record<string, { prefix?: string; index: string }> = {
    active: { ...(modernTopology ? {} : { prefix: "designs/active/" }), index: designIndexPaths.active },
    adopted: { ...(modernTopology ? {} : { prefix: "designs/adopted/" }), index: designIndexPaths.adopted },
    rejected: { ...(modernTopology ? {} : { prefix: "designs/rejected/" }), index: designIndexPaths.rejected },
    superseded: { ...(modernTopology ? {} : { prefix: "designs/superseded/" }), index: designIndexPaths.superseded },
    withdrawn: { ...(modernTopology ? {} : { prefix: "designs/withdrawn/" }), index: designIndexPaths.withdrawn },
  };
  for (const design of records.filter((record) => record.value?.type === "design")) {
    const designPath = sourcePath(design);
    const disposition = modernTopology
      ? design.value?.design_disposition
      : markdown(design.sourceObservation)?.frontMatter?.design_disposition;
    const placement = typeof disposition === "string" ? designPlacements[disposition] : undefined;
    if (designPath === null || placement === undefined) continue;
    if (placement.prefix !== undefined && (!designPath.startsWith(placement.prefix) || designPath === `${placement.prefix}README.md`)) {
      emitter.emit("knowledge.topology.lifecycle-path.invalid", "The Design path does not agree with design_disposition.", {
        artifact: artifact(knowledgeRoot, designPath),
        record_id: String(design.value?.id),
      });
    }
    requireIndexTargets(placement.index, [designPath]);
    for (const [otherDisposition, otherPlacement] of Object.entries(designPlacements)) {
      if (otherDisposition !== disposition && count(indexLinks(otherPlacement.index), designPath) > 0) {
        emitIndexMismatch(emitter, knowledgeRoot, otherPlacement.index, designPath, count(indexLinks(otherPlacement.index), designPath));
      }
    }
  }

  const decisions = records.filter((record) => record.value?.type === "decision");
  const decisionPaths = decisions.map(sourcePath).filter((value): value is string => value !== null);
  for (const decisionPath of decisionPaths) {
    if (!decisionPath.startsWith("decisions/") || decisionPath === "decisions/README.md") {
      emitter.emit("knowledge.topology.lifecycle-path.invalid", "A Decision record is outside decisions/.", {
        artifact: artifact(knowledgeRoot, decisionPath),
      });
    }
  }
  requireIndexTargets("decisions/README.md", decisionPaths);

  const specifications = records.filter((record) => record.value?.type === "specification");
  const specificationPaths = specifications.map(sourcePath).filter((value): value is string => value !== null);
  for (const specificationPath of specificationPaths) {
    if (!specificationPath.startsWith("specifications/") || specificationPath === "specifications/README.md") {
      emitter.emit("knowledge.topology.lifecycle-path.invalid", "A Specification record is outside specifications/.", {
        artifact: artifact(knowledgeRoot, specificationPath),
      });
    }
  }
  requireIndexTargets("specifications/README.md", specificationPaths);

  requireIndexTargets("realizations/README.md", [
    "realizations/current-system.md",
    "realizations/current/README.md",
  ]);
  const supportingRealizations = records
    .filter((record) => record.value?.type === "realization")
    .map(sourcePath)
    .filter((value): value is string => value !== null && value.startsWith("realizations/current/"));
  requireIndexTargets("realizations/current/README.md", supportingRealizations);

  const evidenceAreas = new Set<string>();
  for (const record of records.filter((candidate) => candidate.value?.type === "evidence")) {
    const candidate = sourcePath(record);
    if (candidate === null || !candidate.startsWith("evidence/") || candidate === "evidence/README.md") continue;
    const segments = candidate.split("/");
    const area = segments[1];
    if (segments.length > 2 && area !== undefined) evidenceAreas.add(`evidence/${area}`);
  }
  for (const nonRecord of nonRecords.filter((candidate) => candidate.declaration.kind === "evidence")) {
    const candidate = String(nonRecord.declaration.path);
    if (!candidate.endsWith(".md") || !candidate.startsWith("evidence/") || candidate === "evidence/README.md") continue;
    const segments = candidate.split("/");
    const area = segments[1];
    if (segments.length > 2 && area !== undefined) evidenceAreas.add(`evidence/${area}`);
  }
  requireIndexTargets("evidence/README.md", [...evidenceAreas]);
}
