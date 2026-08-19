---
title: Designs
summary: A Design is governed proposal knowledge. It presents a direction, alternatives, and trade-offs so a Decision can adopt, reject, or supersede that direction.
created_at: 2026-07-28T22:01:17Z
---

# Designs

A Design is governed proposal knowledge. It presents a direction,
alternatives, and trade-offs so a Decision can adopt, reject, or supersede
that direction.

Acceptance and adoption are different:

- `accepted` is the native authority state of an exact Design record revision;
- `adopted` is the Design disposition established when a Decision selects the
  direction proposed by that Design; and
- neither an accepted Design record nor an Adopted disposition makes the
  Design current normative authority.

When the subject is the proposed direction, use `propose`, `adopt`, `reject`,
`supersede`, or `withdraw`. Reserve `accept` for an authority accepting an
exact record revision.

Current normative meaning belongs to Specifications. Current implementation
knowledge belongs to Realizations.

## Dispositions

Every Design declares exactly one `design_disposition` in front matter:

| Disposition | Meaning |
| --- | --- |
| Active | The proposed direction remains under consideration |
| Adopted | A Decision adopted the proposed direction |
| Rejected | A Decision rejected the proposed direction |
| Superseded | A later Design or Decision replaced the proposed direction |
| Withdrawn | The owner explicitly stopped consideration without a merits Decision |

`resolved` is only a derived grouping for non-Active Designs. It is not a
disposition. Directory placement reflects the declared disposition and never
establishes it.

## Active

[Active Design Index](by-disposition/active.md)

- [NKF Task Scope Gate](items/task-scope-gate.md)

## Adopted

[Adopted Design Index](by-disposition/adopted.md)

- [Acceptance Provenance](items/acceptance-provenance.md)
- [Agent-Led Initial Onboarding](items/agent-led-initial-onboarding.md)
- [Common And Root Profiles](items/common-and-root-profiles.md)
- [Complete Portable Onboarding Topology](items/complete-portable-onboarding-topology.md)
- [Decision Applicability Gate](items/decision-applicability-gate.md)
- [Enforcement And Diagnostics](items/enforcement-and-diagnostics.md)
- [Extension Declaration And Resolution](items/extension-declaration-and-resolution.md)
- [Governed Frontmatter](items/governed-frontmatter.md)
- [Initial Release Distribution](items/initial-release-distribution.md)
- [Initial Greenfield Onboarding](items/initial-greenfield-onboarding.md)
- [Knowledge Architecture](items/knowledge-architecture.md)
- [Layered Contract Enforcement](items/layered-contract-enforcement.md)
- [Native Bundle Serialization](items/native-bundle-serialization.md)
- [Native Record Serialization](items/native-record-serialization.md)
- [NKF 0.6 Corrective Release And Open-Source Licensing](items/nkf-0-6-corrective-release-and-open-source-licensing.md)
- [NKF 0.7 Verifiable Delta Review](items/nkf-0-7-verifiable-delta-review.md)
- [NKF 0.71 Corrective Successor](items/nkf-0-71-corrective-successor.md)
- [NKF 0.8 Generated Distribution](items/nkf-0-8-generated-distribution.md)
- [NKF Freshness And Deterministic Knowledge Graph](items/freshness-and-deterministic-knowledge-graph.md)
- [NKF 0.3 Immutable Freeze And Proven Self-Adoption](items/nkf-0-3-immutable-freeze-and-proven-self-adoption.md)
- [Presentation Guidance](items/presentation-guidance.md)
- [Product Responsibility Identifiers](items/product-responsibility-identifiers.md)
- [Product Technology Common Allocation](items/product-technology-common-allocation.md)
- [Project Path And Knowledge Coverage](items/project-path-and-knowledge-coverage.md)
- [Release Documentation And Adoption](items/release-documentation-and-adoption.md)
- [Section Role Vocabularies](items/section-role-vocabularies.md)
- [Semantic Topology And Bindings](items/semantic-topology-and-bindings.md)
- [Single-Version Artifact Authority](items/single-version-artifact-authority.md)
- [Technology Root Profile](items/technology-root-profile.md)

## Rejected

[Rejected Design Index](by-disposition/rejected.md)

No Design is currently classified as Rejected.

## Superseded

[Superseded Design Index](by-disposition/superseded.md)

- [Artifact Identities And Contract Versioning](items/artifact-identities-and-contract-versioning.md)
- [Initial JSON Schema Realization](items/initial-json-schema-realization.md)
- [Record V2 Responsibility Bindings](items/record-v2-responsibility-bindings.md)
- [Replacement JSON Schema Realization](items/replacement-json-schema-realization.md)

## Withdrawn

[Withdrawn Design Index](by-disposition/withdrawn.md)

No Design is currently classified as Withdrawn.

Historical specification revisions, schema proposals, contract candidates,
audits, and findings are retained under
[Evidence](../evidence/README.md), not classified as Designs.
