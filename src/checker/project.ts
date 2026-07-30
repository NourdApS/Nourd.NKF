import { realpathSync } from "node:fs";
import { lstat, readFile, readdir, realpath, stat } from "node:fs/promises";
import path from "node:path";
import type { Diagnostic, SnapshotEntry } from "./types.js";
import { isWithin, projectPath, sha256, utf16Compare } from "./util.js";

export interface Observation {
  entry: SnapshotEntry;
  bytes: Buffer | null;
  absolute: string;
  resolvedAbsolute: string | null;
  hasSymlink: boolean;
}

function fileKind(stats: Awaited<ReturnType<typeof stat>>): "regular-file" | "directory" | "other" {
  if (stats.isFile()) return "regular-file";
  if (stats.isDirectory()) return "directory";
  return "other";
}

export class SnapshotCollector {
  readonly #projectRoot: string;
  readonly #entries = new Map<string, SnapshotEntry>();

  constructor(projectRoot: string) {
    this.#projectRoot = realpathSync(path.resolve(projectRoot));
  }

  values(): SnapshotEntry[] {
    return [...this.#entries.values()];
  }

  async observe(
    logicalPath: string,
    options: { content?: boolean; knowledgeRoot?: string } = {},
  ): Promise<Observation> {
    const portable = logicalPath.split(path.sep).join("/");
    const absolute = path.resolve(this.#projectRoot, logicalPath);
    let directKind: SnapshotEntry["direct_kind"] = "missing";
    let hasSymlink = false;
    let directStats: Awaited<ReturnType<typeof lstat>> | null = null;
    try {
      directStats = await lstat(absolute);
      directKind = directStats.isSymbolicLink()
        ? "symbolic-link"
        : directStats.isFile()
          ? "regular-file"
          : directStats.isDirectory()
            ? "directory"
            : "other";
    } catch {
      directStats = null;
    }

    const relative = path.relative(this.#projectRoot, absolute);
    if (relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative)) {
      let cursor = this.#projectRoot;
      for (const segment of relative.split(path.sep)) {
        cursor = path.join(cursor, segment);
        try {
          if ((await lstat(cursor)).isSymbolicLink()) hasSymlink = true;
        } catch {
          break;
        }
      }
    }

    let resolution: SnapshotEntry["resolution"] = directStats === null ? "not-applicable" : "direct";
    let resolvedAbsolute: string | null = null;
    let resolvedPath: string | null = null;
    let finalKind: SnapshotEntry["final_kind"] = null;
    let bytes: Buffer | null = null;
    if (directStats !== null) {
      try {
        resolvedAbsolute = await realpath(absolute);
        resolvedPath = projectPath(this.#projectRoot, resolvedAbsolute);
        if (resolvedPath === null) resolution = "outside-project";
        else if (
          options.knowledgeRoot !== undefined &&
          !isWithin(path.resolve(options.knowledgeRoot), resolvedAbsolute)
        ) {
          resolution = "outside-knowledge-root";
        } else if (hasSymlink) {
          resolution = "contained";
        }
        const finalStats = await stat(absolute);
        finalKind = fileKind(finalStats);
        if (options.content === true && finalStats.isFile() && resolvedPath !== null) {
          bytes = await readFile(absolute);
        }
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        resolution = code === "ELOOP" ? "cyclic" : "broken";
      }
    }
    const entry: SnapshotEntry = {
      path: portable,
      direct_kind: directKind,
      resolution,
      resolved_path: resolvedPath,
      final_kind: finalKind,
      content_sha256: bytes === null ? null : sha256(bytes),
    };
    const previous = this.#entries.get(portable);
    if (
      previous !== undefined &&
      entry.content_sha256 === null &&
      previous.content_sha256 !== null &&
      previous.direct_kind === entry.direct_kind &&
      previous.resolution === entry.resolution &&
      previous.resolved_path === entry.resolved_path &&
      previous.final_kind === entry.final_kind
    ) {
      entry.content_sha256 = previous.content_sha256;
    }
    this.#entries.set(portable, entry);
    return { entry, bytes, absolute, resolvedAbsolute, hasSymlink };
  }
}

export function validKnowledgeRootLexical(value: unknown): value is string {
  if (typeof value !== "string" || value.length === 0) return false;
  if (path.posix.isAbsolute(value) || path.win32.isAbsolute(value) || value.includes("\\")) return false;
  if (value.startsWith("~") || value.includes("${") || value.includes("$(") || /^%[^%]+%/.test(value)) {
    return false;
  }
  const segments = value.split("/");
  return segments.every((segment) => segment !== "" && segment !== "." && segment !== "..");
}

export function validKnowledgePath(value: unknown): value is string {
  if (!validKnowledgeRootLexical(value)) return false;
  if (/^[A-Za-z]:/.test(value) || value.startsWith("//")) return false;
  for (const character of value) {
    const point = character.codePointAt(0);
    if (point === 0 || (point !== undefined && (point < 0x20 || point === 0x7f))) return false;
  }
  return true;
}

export function validProjectPath(value: unknown): value is string {
  if (!validKnowledgePath(value)) return false;
  return value !== ".nourd" && !value.startsWith(".nourd/");
}

export interface MarkdownDiscovery {
  paths: string[];
  observations: Map<string, Observation>;
  diagnostics: Diagnostic[];
}

export async function discoverMarkdown(
  projectRoot: string,
  knowledgeRootRelative: string,
  collector: SnapshotCollector,
): Promise<MarkdownDiscovery> {
  const paths: string[] = [];
  const observations = new Map<string, Observation>();
  const diagnostics: Diagnostic[] = [];
  const knowledgeRoot = path.resolve(projectRoot, knowledgeRootRelative);
  async function walk(directoryRelative: string, ancestors = new Set<string>()): Promise<void> {
    const directoryObservation = await collector.observe(directoryRelative, { knowledgeRoot });
    if (
      directoryObservation.resolvedAbsolute === null ||
      directoryObservation.entry.final_kind !== "directory" ||
      directoryObservation.entry.resolution === "outside-project" ||
      directoryObservation.entry.resolution === "outside-knowledge-root"
    ) {
      return;
    }
    if (ancestors.has(directoryObservation.resolvedAbsolute)) return;
    const nextAncestors = new Set(ancestors);
    nextAncestors.add(directoryObservation.resolvedAbsolute);
    let entries;
    try {
      entries = await readdir(directoryObservation.absolute, { withFileTypes: true });
    } catch {
      return;
    }
    entries.sort((left, right) => utf16Compare(left.name, right.name));
    for (const entry of entries) {
      const logical = path.posix.join(directoryRelative.split(path.sep).join("/"), entry.name);
      const absolute = path.resolve(projectRoot, logical);
      let observed: Observation | null = null;
      if (entry.isDirectory()) {
        await walk(logical, nextAncestors);
      } else if (entry.isSymbolicLink()) {
        observed = await collector.observe(logical, { knowledgeRoot, content: logical.endsWith(".md") });
        if (observed.entry.resolution === "contained" && observed.entry.final_kind === "directory") {
          await walk(logical, nextAncestors);
        } else if (logical.endsWith(".md")) {
          paths.push(logical.slice(knowledgeRootRelative.length + 1));
          observations.set(logical.slice(knowledgeRootRelative.length + 1), observed);
        }
      } else if (entry.name.endsWith(".md")) {
        observed = await collector.observe(logical, { knowledgeRoot, content: true });
        const relative = logical.slice(knowledgeRootRelative.length + 1);
        paths.push(relative);
        observations.set(relative, observed);
      } else {
        void absolute;
      }
    }
  }

  await walk(knowledgeRootRelative);
  paths.sort(utf16Compare);
  return { paths, observations, diagnostics };
}

export function pathDiagnostic(
  rule_id: string,
  message: string,
  artifact?: string,
  record_id?: string,
  instance_pointer?: string,
): Diagnostic {
  return {
    rule_id,
    severity: rule_id === "path.symlink.discouraged" || rule_id === "record.filename.nonconventional"
      ? "warning"
      : "error",
    blocking:
      rule_id === "path.symlink.discouraged" || rule_id === "record.filename.nonconventional"
        ? "none"
        : "conformance",
    phase:
      rule_id.startsWith("record.source.") ? "source" :
        rule_id.startsWith("record.h1") || rule_id.startsWith("record.title") ||
          rule_id.startsWith("section.heading") ? "source" : "project",
    message,
    ...(artifact === undefined ? {} : { artifact }),
    ...(record_id === undefined ? {} : { record_id }),
    ...(instance_pointer === undefined ? {} : { instance_pointer }),
  };
}

export function observationDiagnostics(
  observation: Observation,
  expectedKind: "regular-file" | "directory",
  knowledgePath: boolean,
  recordId?: string,
): Diagnostic[] {
  const result: Diagnostic[] = [];
  const artifact = observation.entry.path;
  if (
    observation.entry.resolution === "broken" ||
    observation.entry.resolution === "cyclic" ||
    observation.entry.resolution === "outside-project" ||
    (knowledgePath && observation.entry.resolution === "outside-knowledge-root")
  ) {
    result.push(pathDiagnostic("path.symlink.invalid", "A symbolic-link path is unsafe or escapes its allowed root.", artifact, recordId));
  } else if (observation.entry.resolution === "contained") {
    result.push(pathDiagnostic("path.symlink.discouraged", "A contained symbolic link reduces portability.", artifact, recordId));
  }
  if (observation.entry.final_kind !== null && observation.entry.final_kind !== expectedKind) {
    result.push(pathDiagnostic("path.file-kind.invalid", `The final path target must be a ${expectedKind}.`, artifact, recordId));
  }
  return result;
}
