---
id: adr-0143
type: decision
title: "ADR 0143: Bind The Predecessor Repair Promotion"
summary: Accept the exact navigation and promotion bindings for the previously accepted P1 predecessor repair, preserving the preceding authority revisions and their Decisions.
created_at: 2026-09-09T13:43:00Z
---

# ADR 0143: Bind The Predecessor Repair Promotion

## Context And Problem

The producer-upgrade test of the P1 repair accepted by
[ADR 0142](0142-accept-the-bound-predecessor-repair.md) found an omitted
promotion declaration for its new Specification heading and one unlinked
same-bundle Task reference. The checker correctly refused that promoted
candidate. Repairing those navigation bindings changes exact accepted
artifact bytes and therefore requires a later selection.

## Decision

Under the same explicit Human Product Owner P1 self-audit and execution
delegation recorded in [NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
accept this final five-artifact revision. It replaces only the exact artifact
selection in [ADR 0142](0142-accept-the-bound-predecessor-repair.md). Its predecessor-proof semantics, compatibility
classification, and boundaries continue unchanged.

| Canonical Artifact | Accepted SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.81.md` | `4a5d2bd6289b0157edbbab0de8f51e38bb0b55ccecc80e6d94b0e14ab42cf8a8` |
| `contracts/nkf/0.81/nkf.yaml` | `517b91442b6be5a31bc7b9a03845787494f4b9720f1d6d90b976ebcfc92b0347` |
| `contracts/nkf/0.81/freshness-policy.yaml` | `742f72d81531e48b3af2453affb3548faa85064f0dcca7e39b8e3962a7a25de4` |
| `contracts/nkf/0.81/version-delta.yaml` | `0a319702b967477ab6dbc183bedaef3c256e123d5424b1c77d56e96b7fb120bb` |
| `knowledge/evidence/release/nkf-0.81-producer-promotion.yaml` | `b9228327ce04afdfaced16259aaf428975989a4fd1759c704bcc9643c097ce95` |

## Scope And Applicability

This is the third unpublished artifact revision of NKF 0.81. The second
revision's five exact files remain under
`knowledge/evidence/release/nkf-0.81-authority-revision-2/`; the first revision
and [ADR 0140](0140-accept-the-nkf-0-81-authority-set.md) also remain unchanged. No published 0.8 byte changes.

## Rationale

The Specification now links its Task reference, and the producer-promotion
input represents the added Bound Predecessor Baselines heading. Derived
bindings and schemas follow those exact source digests. These are navigation
and realization-binding corrections, with no new normative requirement or
judgment-dependency change beyond [ADR 0142](0142-accept-the-bound-predecessor-repair.md).

## Alternatives Considered

Editing an earlier accepted Decision or skipping the promotion conformance
failure would obscure the exact acceptance boundary. Preserving that revision
and accepting these corrected bindings keeps the record reproducible.

## Consequences And Trade-Offs

The final authority has its own exact selection. The P1 delegated self-audit
continues through implementation and regression verification, while release
candidate confirmation remains a separate act at the rebuilt candidate bytes.
Earlier confirmation by [ADR 0141](0141-confirm-the-nkf-0-81-release-candidate.md) does not cover the repaired delivery.

## Non-Claims

This Decision grants no retroactive human acceptance, independent second-person
audit, implementation confirmation, publication, recommendation, producer
promotion, merge, or Task completion. The authority remains scoped to the
explicit P1 repair delegation.
