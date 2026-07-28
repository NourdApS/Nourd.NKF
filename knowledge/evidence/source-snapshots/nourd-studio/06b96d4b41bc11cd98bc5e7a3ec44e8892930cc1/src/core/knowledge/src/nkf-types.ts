import type { KnowledgeDiagnostic, ValidationResult } from "./types.js";

export type NkfCoreRecordType =
  | "product"
  | "principle"
  | "concept"
  | "journey"
  | "domain"
  | "capability"
  | "design"
  | "decision"
  | "realization"
  | "evidence";

export interface NkfContractSet {
  contract: "nkf.checker.contract-set/v1";
  nkf_version: "0.1";
  specification: {
    accepted_base_revision: string;
    source_digest_algorithm: "sha-256";
    source_digest: string;
    amendment_task: string;
    authority_state: "proposal-awaiting-acceptance" | "accepted";
  };
  bundle_contract: "nkf.bundle/v1";
  record_contract: "nkf.record/v1";
  relationship_types: string[];
  section_authorities: string[];
  entity_kinds: string[];
  entity_relationship_types: string[];
  binding_kinds: string[];
  supported_extensions: string[];
  body_contracts: Record<
    string,
    {
      type: NkfCoreRecordType;
      required_responsibilities: string[];
      optional_responsibilities: string[];
      allowed_roles: string[];
    }
  >;
}

export interface NkfBundle {
  nkf_version: "0.1";
  contract: "nkf.bundle/v1";
  id: string;
  product_record: string;
  markdown_root: string;
  records_root: string;
  record_contract: "nkf.record/v1";
  required_extensions?: string[];
  extensions?: Record<string, unknown>;
  non_records: Array<{
    path: string;
    kind: string;
  }>;
}

export interface NkfSection {
  id: string;
  heading_path: string[];
  occurrence: number;
  authority: string;
  role: string;
  responsibilities?: string[];
}

export interface NkfRelationship {
  type: string;
  target: string;
  source_section: string;
}

export interface NkfEntityReference {
  record: string;
  entity: string;
}

export interface NkfRecord {
  contract: "nkf.record/v1";
  id: string;
  type: string;
  body_contract: string;
  title: string;
  source: {
    path: string;
    digest: {
      algorithm: "sha-256";
      value: string;
    };
  };
  governance: {
    lifecycle: "living" | "immutable";
    status: "draft" | "accepted" | "superseded" | "retired";
    authority: string[];
    accepted_at?: string;
    acceptance_source?: {
      kind: string;
      proposal_revision: string;
    };
  };
  scope: {
    product: string;
    subjects?: string[];
  };
  sections: NkfSection[];
  relationships: NkfRelationship[];
  provenance?: {
    producers?: Array<{
      actor: string;
      at?: string;
      method?: string;
    }>;
    verifiers?: Array<{
      actor: string;
      at?: string;
      method?: string;
    }>;
    sources?: Array<{
      id?: string;
      locator: string;
      title?: string;
      author?: string;
      observed_at?: string;
      revision?: string;
      last_modified_at?: string;
      digest?: {
        algorithm: string;
        value: string;
      };
    }>;
    primary_observation?: {
      method: string;
      source_section: string;
      observed_at?: string;
    };
  };
  external_authorities?: Array<{
    id: string;
    authority: string;
    relationship: string;
    source_section: string;
    locator?: string;
    resolution_rule?: string;
  }>;
  entities?: Array<{
    id: string;
    kind: string;
    defining_section: string;
    address?: string;
  }>;
  entity_relationships?: Array<{
    type: string;
    source: NkfEntityReference;
    target: NkfEntityReference;
    source_section: string;
  }>;
  bindings?: Array<{
    entity: NkfEntityReference;
    realization: string;
    kind: string;
    source_section: string;
    locator?: string;
    resolution_rule?: string;
    external_authority?: string;
  }>;
  required_extensions?: string[];
  extensions?: Record<string, unknown>;
  presentation?: {
    short_label?: string;
    entry_section?: string;
    featured_sections?: string[];
    initial_depth?: "overview" | "standard" | "full";
  };
}

export interface LoadedNkfRecord {
  descriptorPath: string;
  descriptorBytes: Buffer;
  record: NkfRecord;
  sourceBytes?: Buffer;
}

export interface NkfValidationOptions {
  baseRef?: string;
  runner?: ValidationResult["runner"];
  manifestPath?: string;
}

export interface NkfLoadResult {
  repositoryRoot: string;
  manifestPath: string;
  contractSet?: NkfContractSet;
  bundle?: NkfBundle;
  markdownRoot?: string;
  recordsRoot?: string;
  records: LoadedNkfRecord[];
  diagnostics: KnowledgeDiagnostic[];
}
