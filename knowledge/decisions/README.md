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
