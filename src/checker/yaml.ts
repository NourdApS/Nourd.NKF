import {
  isAlias,
  isMap,
  isPair,
  isScalar,
  isSeq,
  parseAllDocuments,
  type Document,
  type Node,
} from "yaml";
import type { Diagnostic } from "./types.js";
import { asObject } from "./util.js";

export interface ParsedYaml {
  value: Record<string, any> | null;
  text: string | null;
  diagnostics: Diagnostic[];
}

function parseDiagnostic(rule_id: string, message: string, artifact: string): Diagnostic {
  return {
    rule_id,
    severity: "error",
    blocking: "conformance",
    phase: "parse",
    message,
    artifact,
  };
}

function walkNode(
  node: Node | null | undefined,
  state: { anchor: boolean; alias: boolean; tag: boolean; merge: boolean; nonString: boolean },
): void {
  if (node === null || node === undefined) return;
  if ("anchor" in node && typeof node.anchor === "string") state.anchor = true;
  if (isAlias(node)) {
    state.alias = true;
    return;
  }
  if ("tag" in node && typeof node.tag === "string" && !node.tag.startsWith("tag:yaml.org,2002:")) {
    state.tag = true;
  }
  if (isMap(node)) {
    for (const item of node.items) {
      if (!isPair(item)) continue;
      if (!isScalar(item.key) || typeof item.key.value !== "string") state.nonString = true;
      if (isScalar(item.key) && item.key.value === "<<") state.merge = true;
      walkNode(item.key as Node, state);
      walkNode(item.value as Node | null, state);
    }
  } else if (isSeq(node)) {
    for (const item of node.items) walkNode(item as Node | null, state);
  }
}

function isJsonValue(value: unknown, seen = new Set<object>()): boolean {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return true;
  }
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "object") return false;
  if (seen.has(value)) return false;
  seen.add(value);
  if (Array.isArray(value)) return value.every((item) => isJsonValue(item, seen));
  if (Object.getPrototypeOf(value) !== Object.prototype) return false;
  return Object.entries(value as Record<string, unknown>).every(
    ([key, item]) => typeof key === "string" && isJsonValue(item, seen),
  );
}

function documentValue(document: Document.Parsed): unknown {
  try {
    return document.toJS({ mapAsMap: false, maxAliasCount: 0 });
  } catch {
    return undefined;
  }
}

export function parseNativeYaml(bytes: Uint8Array, artifact: string): ParsedYaml {
  const diagnostics: Diagnostic[] = [];
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return {
      value: null,
      text: null,
      diagnostics: [parseDiagnostic("yaml.utf8.invalid", "The YAML artifact is not valid UTF-8.", artifact)],
    };
  }

  let documents: Document.Parsed[];
  try {
    documents = parseAllDocuments(text, {
      schema: "core",
      strict: true,
      uniqueKeys: true,
      prettyErrors: false,
    });
  } catch {
    return {
      value: null,
      text,
      diagnostics: [parseDiagnostic("yaml.parse.invalid", "The YAML artifact cannot be parsed safely.", artifact)],
    };
  }

  if (documents.length !== 1) {
    diagnostics.push(
      parseDiagnostic(
        "yaml.document-count.invalid",
        "Native NKF YAML contains exactly one document.",
        artifact,
      ),
    );
  }
  const document = documents[0];
  if (document === undefined) return { value: null, text, diagnostics };

  const state = { anchor: false, alias: false, tag: false, merge: false, nonString: false };
  walkNode(document.contents as Node | null, state);
  if (state.anchor) {
    diagnostics.push(parseDiagnostic("yaml.anchor.unsupported", "YAML anchors are not supported.", artifact));
  }
  if (state.alias) {
    diagnostics.push(parseDiagnostic("yaml.alias.unsupported", "YAML aliases are not supported.", artifact));
  }
  if (state.tag) {
    diagnostics.push(parseDiagnostic("yaml.tag.unsupported", "Custom YAML tags are not supported.", artifact));
  }
  if (state.merge) {
    diagnostics.push(
      parseDiagnostic("yaml.merge-key.unsupported", "YAML merge keys are not supported.", artifact),
    );
  }
  if (state.nonString) {
    diagnostics.push(
      parseDiagnostic("yaml.key.non-string", "Native NKF mapping keys must be strings.", artifact),
    );
  }

  let recognizedParserError = false;
  for (const error of document.errors) {
    if (error.code === "DUPLICATE_KEY") {
      recognizedParserError = true;
      diagnostics.push(parseDiagnostic("yaml.key.duplicate", "Duplicate YAML mapping keys are invalid.", artifact));
    } else {
      diagnostics.push(parseDiagnostic("yaml.parse.invalid", "The YAML artifact is invalid.", artifact));
    }
  }
  if (document.errors.length > 0 && !recognizedParserError && diagnostics.length === 0) {
    diagnostics.push(parseDiagnostic("yaml.parse.invalid", "The YAML artifact is invalid.", artifact));
  }

  if (!isMap(document.contents)) {
    diagnostics.push(
      parseDiagnostic("yaml.root.invalid", "Native NKF YAML has one mapping root.", artifact),
    );
  }

  const rawValue = documentValue(document);
  if (rawValue !== undefined && !isJsonValue(rawValue)) {
    diagnostics.push(
      parseDiagnostic(
        "yaml.value.non-json",
        "Native NKF YAML values must use the JSON-compatible data model.",
        artifact,
      ),
    );
  }
  const value = asObject(rawValue);
  const invalid = diagnostics.some((diagnostic) => diagnostic.severity === "error");
  return { value: invalid ? null : value, text, diagnostics };
}
