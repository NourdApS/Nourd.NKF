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

- [NKF Task Scope Gate](active/task-scope-gate.md)
- [NKF 0.7 Verifiable Delta Review](items/nkf-0-7-verifiable-delta-review.md)

## Adopted

[Adopted Design Index](by-disposition/adopted.md)

- [Acceptance Provenance](adopted/acceptance-provenance.md)
- [Agent-Led Initial Onboarding](adopted/agent-led-initial-onboarding.md)
- [Common And Root Profiles](adopted/common-and-root-profiles.md)
- [Complete Portable Onboarding Topology](adopted/complete-portable-onboarding-topology.md)
- [Decision Applicability Gate](adopted/decision-applicability-gate.md)
- [Enforcement And Diagnostics](adopted/enforcement-and-diagnostics.md)
- [Extension Declaration And Resolution](adopted/extension-declaration-and-resolution.md)
- [Governed Frontmatter](adopted/governed-frontmatter.md)
- [Initial Release Distribution](adopted/initial-release-distribution.md)
- [Initial Greenfield Onboarding](adopted/initial-greenfield-onboarding.md)
- [Knowledge Architecture](adopted/knowledge-architecture.md)
- [Layered Contract Enforcement](adopted/layered-contract-enforcement.md)
- [Native Bundle Serialization](adopted/native-bundle-serialization.md)
- [Native Record Serialization](adopted/native-record-serialization.md)
- [NKF 0.6 Corrective Release And Open-Source Licensing](items/nkf-0-6-corrective-release-and-open-source-licensing.md)
- [NKF Freshness And Deterministic Knowledge Graph](adopted/freshness-and-deterministic-knowledge-graph.md)
- [NKF 0.3 Immutable Freeze And Proven Self-Adoption](adopted/nkf-0-3-immutable-freeze-and-proven-self-adoption.md)
- [Presentation Guidance](adopted/presentation-guidance.md)
- [Product Responsibility Identifiers](adopted/product-responsibility-identifiers.md)
- [Product Technology Common Allocation](adopted/product-technology-common-allocation.md)
- [Project Path And Knowledge Coverage](adopted/project-path-and-knowledge-coverage.md)
- [Release Documentation And Adoption](adopted/release-documentation-and-adoption.md)
- [Section Role Vocabularies](adopted/section-role-vocabularies.md)
- [Semantic Topology And Bindings](adopted/semantic-topology-and-bindings.md)
- [Single-Version Artifact Authority](adopted/single-version-artifact-authority.md)
- [Technology Root Profile](adopted/technology-root-profile.md)

## Rejected

[Rejected Design Index](by-disposition/rejected.md)

No Design is currently classified as Rejected.

## Superseded

[Superseded Design Index](by-disposition/superseded.md)

- [Artifact Identities And Contract Versioning](superseded/artifact-identities-and-contract-versioning.md)
- [Initial JSON Schema Realization](superseded/initial-json-schema-realization.md)
- [Record V2 Responsibility Bindings](superseded/record-v2-responsibility-bindings.md)
- [Replacement JSON Schema Realization](superseded/replacement-json-schema-realization.md)

## Withdrawn

[Withdrawn Design Index](by-disposition/withdrawn.md)

No Design is currently classified as Withdrawn.

Historical specification revisions, schema proposals, contract candidates,
audits, and findings are retained under
[Evidence](../evidence/README.md), not classified as Designs.
