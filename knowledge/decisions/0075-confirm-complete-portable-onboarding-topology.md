---
id: adr-0075
type: decision
title: "ADR 0075: Confirm Complete Portable Onboarding Topology"
summary: Confirm the exact independently audited NKF-017 successor Realizations and complete the portable Product and Technology onboarding-topology Task without claiming release, publication, consumer migration, acceptance verification, or protected merge enforcement.
created_at: 2026-08-01T15:26:13Z
record_lifecycle: immutable
record_status: accepted
task: NKF-017
---

# ADR 0075: Confirm Complete Portable Onboarding Topology

- **Status:** Accepted
- **Task:** `NKF-017`
- **Confirmation Authority:** Codex technical reviewer under the Human Product
  Owner's explicit authorization to independently audit and confirm the
  Product and Technology dynamic-root and complete-topology work
- **Predecessors:** ADR 0070, ADR 0071, ADR 0073, and ADR 0074

## Context And Problem

ADR 0071 adopts the complete portable Product and Technology topology. ADR
0073 accepts the corrected current NKF 0.1 authority pair, and ADR 0074
separates unreleased authoring validation from recommended-release review.
Those Decisions do not confirm that the derived implementation is correct.

NKF-017 can complete only after the checker, onboarding, deliberate repair,
fixtures, neutral agent guidance, public-documentation projection,
self-hosting declarations, and consolidated current-system account agree with
that accepted meaning; the complete gate passes; and an independent audit
finds no unresolved material defect.

## Decision

The authorized technical reviewer confirms these exact successor
Realizations:

| Record | Source | Confirmed SHA-256 |
| --- | --- | --- |
| `nkf-0.1-native-realization` | `knowledge/realizations/current-system.md` | `c1ce0b1bcf6cf26b38209e28f0186d16745e4a14d0f0fae47b559acb05a58437` |
| `nkf-portable-knowledge-topology` | `knowledge/realizations/current/portable-knowledge-topology.md` | `e7f753e5cfe90bb30cffb7c3f94bdec7c91902b1fe5e0621bf301fa0954ec2c2` |

The supporting independent completion audit at
`knowledge/evidence/audits/nkf-017-whole-repository-completion-audit.md` has
SHA-256
`d9df601de2c2ed6a207b6dead4523ba06345ac2a22d4f6e06045ba279726e685`.
It supports this review but cannot confirm a Realization by itself.

NKF-017 is Completed for:

1. one complete continuously required portable Common topology with Product
   and Technology profile additions;
2. canonical map reconciliation, lifecycle placement, index completeness,
   truthful frontmatter, and exact Markdown representation coverage;
3. derived checker diagnostics, Schemas, fixtures, self-hosting, and complete
   Product and Technology public examples;
4. agent-led initial onboarding that produces the complete topology for the
   already supported Empty and Tiny Knowledge categories;
5. deliberate receipt-bound repair for trusted NKF-013 and NKF-015
   predecessors, with drift protection, staged checking, rollback,
   idempotence, and tamper rejection;
6. AI-neutral onboarding guidance and public topology and recovery guidance;
   and
7. the final requirement-by-requirement whole-repository audit.

## Scope And Applicability

This confirmation applies only to the exact Realization bytes listed above
and their governed artifact mappings. It confirms local implementation
correctness within NKF-017; it does not alter the already accepted normative
pair.

New supported onboarding produces the complete topology. Existing NKF-013 and
NKF-015 consumers retain their installed predecessor until project authority
deliberately repairs or migrates them. No consumer repository is changed by
this Decision.

## Rationale

The independent audit reconciled authority, structure, implementation,
enforcement, navigation, documentation, compatibility, security, and recovery.
It repaired the missing Markdown diagnostic registry, the circular authoring
and release gate, and loose repair-receipt integrity before confirmation.

The complete gate passes nineteen test files with 151 tests, neutral guidance
verification, deterministic checker and adopter builds, the 60-file public
projection with two complete examples, and full self-host validation with zero
diagnostics. Confirmation remains a separate review act rather than a result
of those checks.

## Alternatives Considered

### Leave The Realization Unconfirmed Until Release

Rejected. Release is an external distribution act. Requiring publication to
confirm a validated local implementation would recreate the circular boundary
removed by ADR 0074.

### Confirm Only The Focused Topology Realization

Rejected. The consolidated current-system view is the normal agent and human
entry point and must describe the same exact successor.

### Treat Passing Validation As Confirmation

Rejected. Conformance observes a snapshot; it cannot supply technical review
authority.

## Consequences And Trade-Offs

- NKF-017 has no remaining active work inside its accepted scope.
- The confirmed local successor can become input to separately authorized
  release and publication work.
- Existing consumers do not change automatically.
- The recommended release and published public documentation remain the
  NKF-015 predecessor until separately updated and verified.
- The complete topology creates more initial navigation files than the
  predecessor scaffold, intentionally trading minimal file count for
  predictable human and agent navigation.

## Non-Claims

This Decision does not:

- publish, recommend, tag, commit, push, or release the successor;
- migrate or validate Agent SDK or another consumer;
- verify historical acceptance bindings or make Governing Use ready;
- activate a mandatory pull-request check or approval rule;
- extend onboarding beyond the supported Empty and Tiny Knowledge categories;
  or
- turn generated Draft knowledge, navigation indexes, validation results, or
  receipts into accepted semantic authority.
