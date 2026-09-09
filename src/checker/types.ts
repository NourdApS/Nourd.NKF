export const PHASES = [
  "contracts",
  "parse",
  "schema",
  "project",
  "source",
  "extension-resolution",
  "bundle-graph",
  "knowledge-graph",
  "record-contract",
  "freshness",
  "security",
  "authority-binding",
  "result",
] as const;

export type Phase = (typeof PHASES)[number];
export type PhaseState = "passed" | "failed" | "not-evaluated";
export type ConformanceLevel = "structural" | "contract" | "full-bundle";

export interface ValidationRequest {
  level: ConformanceLevel;
  record_id: string | null;
  acceptance_binding: "requested" | "not-requested";
  purpose?: "change-impact" | "whole-root-readiness" | "consequential-use" | "historical-reproduction" | null;
  require_readiness?: boolean;
  changed_inputs?: unknown[];
  targets?: unknown[];
  observations?: unknown[];
  evaluation_time?: string | null;
  historical_receipt?: string | null;
}

export interface Diagnostic {
  rule_id: string;
  severity: "error" | "warning";
  blocking: "conformance" | "readiness" | "governing-use" | "none";
  phase: Phase;
  message: string;
  artifact?: string;
  record_id?: string;
  node_id?: string;
  instance_pointer?: string;
  source_section?: string;
  remediation?: string;
}

export interface ArtifactBinding {
  expected_sha256: string;
  observed_sha256: string | null;
  binding: "verified" | "unavailable" | "mismatched";
}

export interface SchemaBinding extends ArtifactBinding {
  identity: string;
}

export interface ContractArtifacts {
  core: {
    specification: ArtifactBinding;
    executable: ArtifactBinding;
    freshness_policy?: ArtifactBinding;
    version_delta?: ArtifactBinding;
    schemas: SchemaBinding[];
  };
  extensions: Array<{
    id: string;
    specification: ArtifactBinding;
    executable: ArtifactBinding;
  }>;
}

export interface SnapshotEntry {
  path: string;
  direct_kind: "missing" | "regular-file" | "directory" | "symbolic-link" | "other";
  resolution:
    | "direct"
    | "contained"
    | "broken"
    | "cyclic"
    | "outside-project"
    | "outside-knowledge-root"
    | "not-applicable";
  resolved_path: string | null;
  final_kind: "regular-file" | "directory" | "other" | null;
  content_sha256: string | null;
}

export interface AuthorityBindingRequest {
  recordId: string;
  declaration: Record<string, unknown>;
  declarationDigest: string;
  sourceDigest: string;
}

export type AuthorityBindingOutcome = "verified" | "contradicted" | "unavailable";

export interface AuthorityResolver {
  verify(request: AuthorityBindingRequest): Promise<AuthorityBindingOutcome>;
}

export interface ResolvedExtension {
  id: string;
  specification: Uint8Array;
  executable: Uint8Array;
  supported: boolean;
  validatePayload?: (
    payload: unknown,
    applicationSite: "bundle" | "record",
    recordId?: string,
  ) => boolean | Promise<boolean>;
}

export interface ExtensionResolver {
  resolve(catalogEntry: Record<string, unknown>): Promise<ResolvedExtension | null>;
}

export interface ValidateOptions {
  projectRoot: string;
  contractRoot: string;
  checkerArtifact: string;
  checkerIdentity?: string;
  runner?: string;
  request: ValidationRequest;
  authorityResolver?: AuthorityResolver;
  extensionResolver?: ExtensionResolver;
  persist?: boolean;
  now?: () => Date;
  executionId?: () => string;
  evaluationObserver?: (result: {
    state: "evaluated" | "evaluated-current";
    receipt: { id: string; path: string };
  }) => void;
}

export interface ValidationResult {
  contract: "nkf.validation-result";
  nkf_version: "0.1" | "0.2" | "0.3" | "0.4" | "0.5" | "0.6" | "0.7" | "0.71" | "0.8" | "0.81";
  execution: {
    id: string;
    runner: string;
    started_at: string;
    completed_at: string;
  };
  checker: {
    identity: string;
    digest: {
      algorithm: "sha-256";
      value: string;
    };
  };
  contract_artifacts: ContractArtifacts;
  request: ValidationRequest;
  bundle_id: string | null;
  profile: {
    identity: string | null;
    binding: "verified" | "unsupported" | "not-evaluated";
  };
  validated_snapshot: {
    algorithm: "sha-256";
    canonicalization: "rfc8785-jcs";
    value: string;
    entry_count: number;
  };
  phases: Array<{ id: Phase; state: PhaseState }>;
  conformance: "passed" | "failed";
  knowledge_graph?: Record<string, unknown>;
  nodes?: Array<Record<string, unknown>>;
  records: Array<{
    record_id: string;
    declared_governance: Record<string, unknown> | null;
    conformance: "passed" | "failed" | "not-evaluated";
    acceptance_binding: "not-applicable" | "not-verified" | "verified" | "contradicted";
    governing_use: "ready" | "not-ready" | "not-evaluated";
  }>;
  governing_use: "ready" | "not-ready" | "not-evaluated";
  readiness?: Record<string, unknown>;
  diagnostics: Diagnostic[];
}

export interface LoadedContracts {
  executable: Record<string, any>;
  freshnessPolicy: Record<string, any> | null;
  // The accepted version-delta declaration, parsed only when its binding is
  // verified; the delta-claim closure recompute reads rule classifications
  // from it.
  versionDelta: Record<string, any> | null;
  schemas: {
    bundle: Record<string, unknown>;
    record: Record<string, unknown>;
    baseline: Record<string, unknown>;
    receipt: Record<string, unknown>;
    policy: Record<string, unknown>;
    result: Record<string, unknown>;
  };
  artifacts: ContractArtifacts;
  diagnostics: Diagnostic[];
  validators: {
    bundle: (value: unknown) => boolean;
    record: (value: unknown) => boolean;
    baseline: (value: unknown) => boolean;
    receipt: (value: unknown) => boolean;
    policy: (value: unknown) => boolean;
    result: (value: unknown) => boolean;
    bundleErrors: () => readonly unknown[] | null | undefined;
    recordErrors: () => readonly unknown[] | null | undefined;
    baselineErrors: () => readonly unknown[] | null | undefined;
    receiptErrors: () => readonly unknown[] | null | undefined;
    policyErrors: () => readonly unknown[] | null | undefined;
    resultErrors: () => readonly unknown[] | null | undefined;
  };
}
