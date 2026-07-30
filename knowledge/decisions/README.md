# Decisions

Accepted NKF decisions are immutable snapshots. Corrections, extensions,
replacements, and reversals require later decisions with explicit provenance
and compatibility.

## Index

| Decision | Status | Scope |
| --- | --- | --- |
| [ADR 0001](0001-establish-independent-nkf-authority.md) | Accepted | Independent NKF Shared Technology authority |
| [ADR 0002](0002-establish-body-responsibility-bindings.md) | Accepted, superseded in part by ADR 0009 | Core responsibility-binding mechanism and conformance boundary |
| [ADR 0003](0003-accept-product-responsibility-identifiers.md) | Accepted, superseded in part by ADR 0009 | Stable identifiers for the 69 NKF 0.1 Product responsibilities |
| [ADR 0004](0004-introduce-nkf-record-v2.md) | Accepted, superseded in part by ADR 0009 | Historical record-version boundary |
| [ADR 0005](0005-accept-record-v2-responsibility-bindings.md) | Accepted, superseded in part by ADR 0009 | Historical record-v2 binding presentation |
| [ADR 0006](0006-establish-governed-pre-stable-evolution.md) | Accepted | Governed NKF evolution before the first stable release |
| [ADR 0007](0007-establish-markdown-and-yaml-contract-authority.md) | Accepted | Normative Markdown and executable YAML authority relationship |
| [ADR 0008](0008-accept-nkf-0-1-artifact-identities.md) | Accepted, superseded in part by ADR 0009 | NKF 0.1 artifact paths and historical contract identities |
| [ADR 0009](0009-establish-single-nkf-0-1-version-namespace.md) | Accepted | Single NKF 0.1 version namespace and sole record definition |
| [ADR 0010](0010-accept-canonical-nkf-0-1-markdown.md) | Accepted | Exact canonical NKF 0.1 Markdown revision |
| [ADR 0011](0011-accept-nkf-0-1-yaml-companion.md) | Accepted | Exact digest-bound NKF 0.1 YAML executable companion |
| [ADR 0012](0012-reconcile-single-version-artifact-authority.md) | Accepted | Reconcile ADR 0007 artifact binding with the single NKF version namespace |
| [ADR 0013](0013-accept-nkf-0-1-native-record-serialization.md) | Accepted | Exact native record object shape for NKF 0.1 |
| [ADR 0014](0014-accept-nkf-0-1-section-role-vocabularies.md) | Accepted | Shared section-role meanings and allowed subsets for core NKF 0.1 bodies |
| [ADR 0015](0015-accept-nkf-0-1-semantic-topology-and-binding-vocabularies.md) | Accepted | Core semantic-entity, entity-relationship, and durable-binding vocabularies |
| [ADR 0016](0016-accept-nkf-0-1-extension-declaration-and-resolution.md) | Accepted | Extension identity, contract binding, declaration, support, and fail-closed rules |
| [ADR 0017](0017-accept-nkf-0-1-acceptance-provenance-boundary.md) | Accepted | No universal core proof field; authority verification remains distinct from conformance |
| [ADR 0018](0018-accept-nkf-0-1-project-path-and-knowledge-coverage.md) | Accepted | Fixed project-root `.nourd`, configurable knowledge entry point, and complete Markdown representation |
| [ADR 0019](0019-accept-nkf-0-1-enforcement-and-diagnostics.md) | Accepted under delegated technical authority | Deterministic enforcement layers, phases, diagnostics, and result semantics |
| [ADR 0020](0020-establish-current-presentation-guidance-boundary.md) | Accepted, explicitly revisitable through NKF-004 | No native presentation field; Markdown default; optional extension boundary |
| [ADR 0021](0021-accept-nkf-0-1-native-bundle-serialization.md) | Accepted | Closed native bundle shape and exact non-record representation |
| [ADR 0022](0022-accept-coherent-nkf-0-1-authority-pair.md) | Accepted, superseded as current authority by ADR 0027 | Historical canonical NKF 0.1 Markdown/YAML authority pair |
| [ADR 0023](0023-confirm-nkf-0-1-json-schema-realization.md) | Accepted, superseded as current realization by ADR 0028 | Historical derived bundle and record JSON Schemas |
| [ADR 0024](0024-accept-deterministic-markdown-structure-and-title-case.md) | Accepted under delegated technical authority and contingent Human Product Owner confirmation | CommonMark structure, complete heading coverage, Title Case, canonical terms, and Mermaid boundary |
| [ADR 0025](0025-accept-nkf-0-1-validation-result-contract.md) | Accepted through Human Product Owner confirmation and bounded delegated technical authority | Exact operational validation-result contract, snapshot, persistence, readiness, and freshness |
| [ADR 0026](0026-accept-deterministic-secret-pattern-registry.md) | Accepted through Human Product Owner confirmation and derived technical mechanics | Exact native secret scan scope, blocking registry, exclusions, diagnostics, and evolution |
| [ADR 0027](0027-accept-pre-checker-nkf-0-1-authority-pair.md) | Accepted, superseded as current authority by ADR 0029 | Historical canonical pre-checker NKF 0.1 Markdown/YAML authority pair |
| [ADR 0028](0028-confirm-pre-checker-nkf-0-1-json-schema-realization.md) | Accepted, superseded as current realization by ADR 0030 | Historical derived bundle, record, and validation-result JSON Schemas |
| [ADR 0029](0029-reconcile-nkf-0-1-schema-realization-status.md) | Accepted under delegated technical authority | Exact current canonical NKF 0.1 Markdown/YAML authority pair with reconciled realization status |
| [ADR 0030](0030-confirm-rebound-nkf-0-1-json-schemas.md) | Accepted under delegated technical authority | Exact current source-bound bundle, record, and validation-result JSON Schemas |
