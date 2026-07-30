import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Diagnostic, Phase, SnapshotEntry } from "./types.js";

export function sha256(bytes: Uint8Array | string): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export async function sha256File(file: string): Promise<string | null> {
  try {
    return sha256(await readFile(file));
  } catch {
    return null;
  }
}

export function utf16Compare(left: string, right: string): number {
  const length = Math.min(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    const difference = left.charCodeAt(index) - right.charCodeAt(index);
    if (difference !== 0) return difference;
  }
  return left.length - right.length;
}

export function compareNullable(left: string | undefined, right: string | undefined): number {
  if (left === undefined) return right === undefined ? 0 : -1;
  if (right === undefined) return 1;
  return utf16Compare(left, right);
}

export function jcs(value: unknown): string {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("JCS cannot encode a non-finite number.");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`;
  if (typeof value === "object") {
    const object = value as Record<string, unknown>;
    const members = Object.keys(object)
      .sort(utf16Compare)
      .map((key) => `${JSON.stringify(key)}:${jcs(object[key])}`);
    return `{${members.join(",")}}`;
  }
  throw new TypeError(`JCS cannot encode ${typeof value}.`);
}

export function snapshot(entries: Iterable<SnapshotEntry>): {
  algorithm: "sha-256";
  canonicalization: "rfc8785-jcs";
  value: string;
  entry_count: number;
} {
  const inputs = [...entries].sort((left, right) => utf16Compare(left.path, right.path));
  const inventory = { contract: "nkf.validation-snapshot", nkf_version: "0.1", inputs };
  return {
    algorithm: "sha-256",
    canonicalization: "rfc8785-jcs",
    value: sha256(Buffer.from(jcs(inventory), "utf8")),
    entry_count: inputs.length,
  };
}

export function projectPath(root: string, absolute: string): string | null {
  const relative = path.relative(root, absolute);
  if (relative === "") return ".";
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return null;
  return relative.split(path.sep).join("/");
}

export function isWithin(parent: string, child: string): boolean {
  const relative = path.relative(parent, child);
  return relative === "" || (!path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`));
}

export function escapePointer(value: string): string {
  return value.replaceAll("~", "~0").replaceAll("/", "~1");
}

export function diagnosticComparator(phases: readonly Phase[]) {
  const phaseOrder = new Map(phases.map((phase, index) => [phase, index]));
  return (left: Diagnostic, right: Diagnostic): number =>
    (phaseOrder.get(left.phase) ?? phases.length) - (phaseOrder.get(right.phase) ?? phases.length) ||
    compareNullable(left.artifact, right.artifact) ||
    compareNullable(left.record_id, right.record_id) ||
    compareNullable(left.instance_pointer, right.instance_pointer) ||
    compareNullable(left.source_section, right.source_section) ||
    utf16Compare(left.rule_id, right.rule_id);
}

export function exactDiagnosticIdentity(diagnostic: Diagnostic): string {
  return jcs({
    rule_id: diagnostic.rule_id,
    severity: diagnostic.severity,
    blocking: diagnostic.blocking,
    phase: diagnostic.phase,
    artifact: diagnostic.artifact ?? null,
    record_id: diagnostic.record_id ?? null,
    instance_pointer: diagnostic.instance_pointer ?? null,
    source_section: diagnostic.source_section ?? null,
  });
}

export function uniqueDiagnostics(
  diagnostics: Diagnostic[],
  phases: readonly Phase[],
): Diagnostic[] {
  const seen = new Set<string>();
  return diagnostics
    .filter((diagnostic) => {
      const identity = exactDiagnosticIdentity(diagnostic);
      if (seen.has(identity)) return false;
      seen.add(identity);
      return true;
    })
    .sort(diagnosticComparator(phases));
}

export function fixedUtc(date: Date): string {
  return date.toISOString();
}

export function asObject(value: unknown): Record<string, any> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, any>)
    : null;
}

export function values<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}
