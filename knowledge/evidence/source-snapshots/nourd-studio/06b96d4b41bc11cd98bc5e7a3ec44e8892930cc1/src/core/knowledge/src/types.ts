export type RecordType =
  | "product"
  | "principle"
  | "concept"
  | "journey"
  | "domain"
  | "capability"
  | "design"
  | "architecture-decision"
  | "realization"
  | "evidence";

export type BodyContract =
  | "nourd.knowledge.product/v1"
  | "nourd.knowledge.principle/v1"
  | "nourd.knowledge.concept/v1"
  | "nourd.knowledge.journey/v1"
  | "nourd.knowledge.domain/v1"
  | "nourd.knowledge.capability/v1"
  | "nourd.knowledge.design/v1"
  | "nourd.knowledge.architecture-decision/v1"
  | "nourd.knowledge.realization/v1"
  | "nourd.knowledge.evidence/v1";

export type SectionAuthority =
  | "accepted-meaning"
  | "proposal"
  | "unresolved"
  | "evidence";

export type SectionRole =
  | "context"
  | "governing"
  | "principle"
  | "boundary"
  | "journey-design"
  | "catalogue"
  | "rationale"
  | "guidance"
  | "consequence"
  | "evidence"
  | "unresolved"
  | "content";

export interface KnowledgeBundle {
  contract: "nourd.knowledge.bundle/v1";
  id: string;
  product_record: string;
  markdown_root: string;
  records_root: string;
  record_contract: "nourd.knowledge.record/v1";
  non_records: Array<{
    path: string;
    kind: "navigation" | "projection" | "compatibility-redirect";
  }>;
}

export interface KnowledgeSection {
  id: string;
  heading_path: string[];
  occurrence: number;
  authority: SectionAuthority;
  role: SectionRole;
}

export interface KnowledgeRelationship {
  type:
    | "references"
    | "defines"
    | "governs"
    | "depends-on"
    | "extends"
    | "supersedes"
    | "realizes"
    | "evidences"
    | "applies-to";
  target: string;
  source_section?: string;
}

export interface ExternalAuthority {
  authority: string;
  locator: string;
  relationship: "references" | "governed-by" | "evidence-from";
}

export interface KnowledgeRecord {
  contract: "nourd.knowledge.record/v1";
  id: string;
  type: RecordType;
  body_contract: BodyContract;
  title: string;
  source: {
    path: string;
    digest: {
      algorithm: "sha-256";
      value?: string;
    };
  };
  governance: {
    lifecycle: "living" | "immutable";
    status: "draft" | "accepted" | "retired" | "superseded";
    authority: string[];
    accepted_on?: string;
    proposed_on?: string;
  };
  scope: {
    product: string;
    subjects?: string[];
  };
  sections: KnowledgeSection[];
  relationships: KnowledgeRelationship[];
  external_authorities: ExternalAuthority[];
  presentation: {
    short_label?: string;
    entry_section?: string;
    featured_sections?: string[];
    initial_depth?: "overview" | "standard" | "full";
  };
}

export type DiagnosticSeverity = "error" | "warning";

export interface KnowledgeDiagnostic {
  rule: string;
  severity: DiagnosticSeverity;
  category?: "structural" | "contract" | "profile" | "security";
  message: string;
  record_id?: string;
  source_path?: string;
  remediation?: string;
}

export interface ValidationResult {
  execution_id: string;
  repository: string;
  revision?: string;
  base_revision?: string;
  runner: "local" | "github-actions" | "studio" | "agent";
  bundle?: string;
  contracts: string[];
  started_at: string;
  completed_at: string;
  outcome: "passed" | "failed";
  authority_state:
    | "accepted-baseline"
    | "proposal-awaiting-acceptance"
    | "conformance-only"
    | "unresolved";
  affected_records: string[];
  proposal_records: string[];
  proposal_digest?: string;
  conformance?: {
    format: "legacy" | "nkf";
    nkf_version?: string;
    specification_digest?: string;
    specification_authority?: "accepted" | "proposal-awaiting-acceptance";
    structural: "passed" | "failed";
    contracts: "passed" | "failed" | "not-evaluated";
    full_bundle: "passed" | "failed";
    profile?: "passed" | "failed" | "not-requested";
  };
  diagnostics: KnowledgeDiagnostic[];
}

export interface LoadedKnowledgeRecord {
  descriptorPath: string;
  record: KnowledgeRecord;
  sourceBytes?: Buffer;
}
