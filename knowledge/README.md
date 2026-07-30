# NKF knowledge

This directory is the authority entry point for Nourd Knowledge Format.

## Authority map

| Location | Authority |
| --- | --- |
| [`tasks/`](tasks/) | Durable Task intent, constraints, acceptance criteria, and execution plans |
| [`designs/`](designs/) | Evolving proposals; never accepted merely because they validate |
| [`decisions/`](decisions/) | Immutable accepted NKF decisions |
| [`specifications/`](specifications/) | Accepted normative NKF format and profile specifications |
| [`evidence/`](evidence/) | Governed evidence and migration provenance |

The root [`README.md`](../README.md) owns repository identity and scope.
[`AGENTS.md`](../AGENTS.md) owns working rules.

## Current authority state

[ADR 0001](decisions/0001-establish-independent-nkf-authority.md) establishes
this independent repository as the NKF Shared Technology authority.
[ADR 0002](decisions/0002-establish-body-responsibility-bindings.md)
establishes source-bound responsibility declarations and their deterministic
conformance limit. [ADR 0003](decisions/0003-accept-product-responsibility-identifiers.md)
accepts the stable identifiers for all 69 required NKF 0.1 Product
responsibilities. The historical record-version framing in ADRs 0002–0005 is
superseded in part by [ADR 0009](decisions/0009-establish-single-nkf-0-1-version-namespace.md),
which makes the binding structure the sole NKF 0.1 record definition.
[ADR 0006](decisions/0006-establish-governed-pre-stable-evolution.md)
establishes the evidence-driven change process before the first stable
release. [ADR 0007](decisions/0007-establish-markdown-and-yaml-contract-authority.md)
establishes normative Markdown and its complete executable YAML companion as a
digest-bound governed pair. [ADR 0008](decisions/0008-accept-nkf-0-1-artifact-identities.md)
accepts the NKF 0.1 artifact paths; ADR 0009 supersedes its versioned
contract-set identity. [ADR 0012](decisions/0012-reconcile-single-version-artifact-authority.md)
preserves ADR 0007's Markdown/YAML authority model while superseding its
remaining independent contract-version requirements.
[ADR 0013](decisions/0013-accept-nkf-0-1-native-record-serialization.md)
accepts the exact native record object shape while leaving its controlled
vocabularies and other listed semantic boundaries for separate decisions.
[ADR 0014](decisions/0014-accept-nkf-0-1-section-role-vocabularies.md)
accepts the shared section-role meanings and body-specific allowed subsets for
the ten core NKF 0.1 Product bodies.
[ADR 0015](decisions/0015-accept-nkf-0-1-semantic-topology-and-binding-vocabularies.md)
accepts the core semantic-entity, entity-relationship, and durable-binding
vocabularies and their semantic-layer guardrails.
[ADR 0016](decisions/0016-accept-nkf-0-1-extension-declaration-and-resolution.md)
accepts the native extension identity, digest binding, declaration, support,
round-trip, and fail-closed rules without accepting any concrete extension.
[ADR 0017](decisions/0017-accept-nkf-0-1-acceptance-provenance-boundary.md)
keeps acceptance proof outside native core and separates declared governance,
authority-binding verification, NKF conformance, and Realization confirmation.
[ADR 0018](decisions/0018-accept-nkf-0-1-project-path-and-knowledge-coverage.md)
fixes `.nourd` at the project root, makes the knowledge entry point
configurable inside the project, and requires one `.nourd` representation for
every Markdown file under it.
[ADR 0019](decisions/0019-accept-nkf-0-1-enforcement-and-diagnostics.md)
accepts the deterministic enforcement layers, validation phases, stable
diagnostics, and result semantics under explicitly delegated technical
authority without claiming line-by-line Human Product Owner review.
[ADR 0020](decisions/0020-establish-current-presentation-guidance-boundary.md)
keeps presentation settings outside native NKF, uses Markdown as the default
readable form, and permits a separately governed optional extension. The
boundary is explicitly revisitable through
[`NKF-004`](tasks/NKF-004-define-portable-presentation-guidance-extension.md)
without allowing Task work to change accepted meaning by implication.
[ADR 0021](decisions/0021-accept-nkf-0-1-native-bundle-serialization.md)
accepts the closed native bundle object, its extension fields, and exact
non-record representation.
[ADR 0022](decisions/0022-accept-coherent-nkf-0-1-authority-pair.md)
accepts and promotes an exact historical coherent Markdown/YAML pair under
explicitly delegated technical authority. The earlier ADR 0010/0011 revisions
also remain historical accepted snapshots.
[ADR 0023](decisions/0023-confirm-nkf-0-1-json-schema-realization.md)
confirms the exact historical bundle and record JSON Schema realization of
that pair under separately delegated technical authority.
[ADR 0024](decisions/0024-accept-deterministic-markdown-structure-and-title-case.md)
accepts CommonMark structural parsing, complete top-level heading coverage,
Title Case with governed canonical terms, and the Mermaid boundary under
delegated technical authority and contingent Human Product Owner
confirmation. Replacement authority-pair and schema realization was
subsequently completed.
[ADR 0025](decisions/0025-accept-nkf-0-1-validation-result-contract.md)
accepts the exact operational validation-result contract, persistence rule,
Governed Validation Inputs snapshot, readiness, diagnostics, and currentness
boundary through Human Product Owner confirmation and bounded delegated
technical authority.
[ADR 0026](decisions/0026-accept-deterministic-secret-pattern-registry.md)
accepts the exact native secret scan scope, minimum blocking registry,
exclusions, diagnostic behavior, and governed evolution rule without claiming
comprehensive secret detection.
[ADR 0027](decisions/0027-accept-pre-checker-nkf-0-1-authority-pair.md)
accepts and promotes the exact coherent pre-checker Markdown/YAML replacement
as an accepted historical NKF 0.1 authority pair. The schemas confirmed by ADR
0023 became historical realization of the prior pair.
[ADR 0028](decisions/0028-confirm-pre-checker-nkf-0-1-json-schema-realization.md)
confirms the exact historical source-bound bundle, record, and
validation-result JSON Schemas for the ADR 0027 pair.
[ADR 0029](decisions/0029-reconcile-nkf-0-1-schema-realization-status.md)
accepts and promotes the exact current Markdown/YAML authority pair after
reconciling its schema-realization status without changing NKF 0.1 format
meaning.
[ADR 0030](decisions/0030-confirm-rebound-nkf-0-1-json-schemas.md)
confirms the exact current source-bound bundle, record, and validation-result
JSON Schemas without changing their assertion graphs or claiming checker or
conformance realization.
[ADR 0031](decisions/0031-establish-checker-development-layout-and-identity.md)
accepts the root private Node.js 22 TypeScript ESM checker package,
validation-only responsibility, and stable `nourd-nkf-checker` portable
artifact identity without claiming implementation or distribution.
[ADR 0032](decisions/0032-correct-nkf-0-1-yaml-flow-scalar-grammar.md)
corrects three invalid standalone hyphen scalars in the executable companion
without changing normative or parsed meaning.
[ADR 0033](decisions/0033-confirm-yaml-grammar-corrected-json-schema-bindings.md)
confirms the three exact source-metadata-only schema rebindings after that
grammar correction.
[ADR 0034](decisions/0034-accept-checker-derived-mechanical-completions.md)
accepts the mechanically missing Markdown UTF-8 and contract-target
diagnostics plus the editorial minimal-example casing repair, with canonical
realization pending the separate hierarchy decision.
[ADR 0035](decisions/0035-clarify-product-scope-and-structural-hierarchy.md)
keeps every record Product-scoped while limiting native `part-of` to the
Product–Domain–Capability structural hierarchy.
[ADR 0036](decisions/0036-accept-checker-findings-resolved-authority-pair.md)
accepts and promotes the historical Markdown/YAML pair realizing ADRs 0034
and 0035 without claiming schema or checker confirmation.
[ADR 0037](decisions/0037-confirm-checker-findings-resolved-json-schema-bindings.md)
confirms the historical source-bound bundle, record, and validation-result
JSON Schemas for the ADR 0036 pair without changing their assertion graphs or
claiming checker completeness.
[ADR 0038](decisions/0038-establish-nourd-invocation-precondition.md)
establishes project-root `.nourd` as a native-checker invocation precondition
and retires the unreachable `project.nourd.missing` diagnostic.
[ADR 0039](decisions/0039-accept-invocation-precondition-authority-pair.md)
accepts and promotes the exact current Markdown/YAML pair realizing ADR 0038
without claiming schema or checker confirmation.
[ADR 0040](decisions/0040-confirm-invocation-precondition-json-schema-bindings.md)
confirms the exact current source-bound bundle, record, and validation-result
JSON Schemas for the ADR 0039 pair without changing their assertion graphs or
claiming checker completeness.
[ADR 0041](decisions/0041-confirm-native-checker-development-realization.md)
confirms the exact native checker development Realization at source checkpoint
`f06ebb5c514f9549b0dfb34a910dbdb3d4349edd` without establishing
distribution, release, consumer migration, or consumer conformance.
[ADR 0042](decisions/0042-establish-initial-release-distribution-boundary.md)
through
[ADR 0045](decisions/0045-accept-release-contract-authority-pair.md)
accept the content-addressed initial distribution boundary, release-manifest
contract, deterministic archive contract, and exact current authority pair.
[ADR 0046](decisions/0046-confirm-release-contract-json-schema-bindings.md)
confirms four release-package schemas while keeping project validation bound
to exactly three.
[ADR 0047](decisions/0047-confirm-release-bound-checker-realization.md)
confirms the release-bound checker source and portable bytes.
[ADR 0048](decisions/0048-confirm-initial-release-package-realization.md)
confirms the reproducible release package and bootstrap verifier without
claiming a tag, upload, Github Release, consumer migration, or conformance.

Task [`NKF-003`](tasks/NKF-003-establish-independent-nkf-authority.md) governs
the source migration. Until its acceptance criteria are satisfied, every
imported source must expose whether it is an exact accepted snapshot, a
proposal, implementation evidence, or a new unconfirmed realization.

Deferred Task
[`NKF-004`](tasks/NKF-004-define-portable-presentation-guidance-extension.md)
preserves the intended future NKF-owned portable presentation-guidance
extension and its evidence threshold without claiming current support.

Deferred Task
[`NKF-005`](tasks/NKF-005-investigate-validation-expiry-and-authority-freshness.md)
preserves the future investigation of universal validation expiry and
authority-specific freshness without adding a current NKF 0.1 expiry, polling,
or external-authority requirement.
