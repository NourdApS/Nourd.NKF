---
title: "ADR 0109: Publication Freeze And Proven Self-Adoption"
id: adr-0109
type: decision
summary: Adopt publication-triggered immutable versioning, exact-candidate self-adoption, producer-compatible integration, and breaking predecessor migrations for NKF 0.3.
created_at: 2026-08-10T21:31:02Z
record_lifecycle: immutable
record_status: accepted
task: NKF-023
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0109: Publication Freeze And Proven Self-Adoption

## Context And Problem

[ADR 0076](0076-versioned-contract-evolution.md) freezes accepted NKF meaning
after first consumer adoption, and [ADR 0084](0084-replace-the-unconsumed-0-2-release.md)
records one explicit replacement of a published but unconsumed 0.2 release.
The later [NKF-022 self-adoption Evidence](../evidence/audits/nkf-022-self-adopt-preflight-failure.md)
showed that a published release can still fail against the NKF producer before
any consumer exists. Adoption count therefore cannot be the boundary that
protects immutable published authority.

[ADR 0080](0080-release-and-adoption-process.md) also placed producer
self-adoption after publication. That order discovered a producer-integration
failure only after the release bytes already existed. [NKF-023](../tasks/active/NKF-023-release-nkf-0-3-with-immutable-freeze-and-proven-self-adoption.md)
requires a successor boundary that preserves one public Adopt operation and
the stronger producer gate while proving the exact candidate before it can be
published.

## Decision

On `2026-08-10`, the Human Product Owner adopts the direction proposed by this
exact Design revision:

| Design | Accepted SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/nkf-0-3-immutable-freeze-and-proven-self-adoption.md` | `1b8f1153890d20524092aebe651502ac8989aaf6c979713c00c5a076e3aa8dde` |

The adopted direction establishes:

1. publication of an exact content-addressed NKF archive and manifest under
   its release tag freezes every member of that version's complete set,
   regardless of consumer adoption count;
2. any later complete-set change requires a new NKF version, while a bad
   release may stop being recommended or be marked withdrawn or superseded
   without deleting, overwriting, or rebinding its immutable publication;
3. candidate bytes remain mutable until publication, and operational records
   outside the enumerated complete set do not independently allocate a format
   version;
4. before publication, the exact candidate archive must Adopt into an isolated
   fresh clone of the candidate source, preserve its stronger producer gate,
   pass the full producer validation chain, and return `current` on repeat;
5. a general verified host-superset integration may preserve a stronger
   canonical `npm run nkf:check` only when its exact pinned release invocation
   and additional fail-closed checks are explicitly represented and verified;
   repository identity never supplies a bypass;
6. exact-candidate self-adoption before publication and ordinary public
   self-adoption after publication are separate required proofs, each followed
   by independent audit at its stated boundary;
7. the private 0.2 recommendation remains byte-unchanged during 0.3
   development, no repository is onboarded to it, and promotion replaces it
   atomically only with the exact verified 0.3 release; and
8. migration from NKF 0.1 to 0.3 and from NKF 0.2 to 0.3 is `breaking` and
   requires explicit repository-owner approval before mutation. The
   classification signals governed change; it does not claim knowledge loss
   or destructive migration.

## Scope And Applicability

This Decision governs NKF version freeze, release ordering, producer-compatible
Adopt integration, recommendation promotion, and predecessor compatibility
beginning with NKF 0.3. It prospectively supersedes the consumer-triggered
freeze condition in [ADR 0076](0076-versioned-contract-evolution.md), the
unconsumed-release replacement exception in
[ADR 0084](0084-replace-the-unconsumed-0-2-release.md), and the
publish-before-self-adopt order in [ADR 0080](0080-release-and-adoption-process.md)
where those Decisions conflict.

The historical Decisions and every published 0.1 and 0.2 byte remain immutable
evidence. This Decision does not itself accept the NKF 0.3 Specification or
executable companion, confirm implementation, publish a release, change the
recommendation, or adopt any repository.

## Rationale

Publication creates externally referenceable authority even when NKF has no
known adopter: bytes may already be downloaded, cached, audited, or cited.
Immutability must therefore begin at publication. Exercising the exact
candidate through the real integration boundary before publication catches
producer incompatibility while correction remains honest candidate work.

The host-superset integration preserves one public operation without weakening
the producer gate or adding an NKF-identity exception. Explicit approval for
both supported predecessor migrations preserves repository authority over
governed mutation while allowing the migrations themselves to be
preservation-oriented.

## Alternatives Considered

Keeping consumer-triggered freeze, deleting and reissuing an unconsumed
release, weakening the producer gate, special-casing the NKF repository, and
testing self-adoption only after publication were rejected for the reasons in
the adopted Design. Restoring 0.1 during development was rejected because the
frozen public 0.2 adopter cannot consume a target-0.1 recommendation. Pausing
public Adopt was a valid interim alternative but was not selected.

## Consequences And Trade-Offs

Every published defect now costs a successor version even with zero known
adopters. Release work becomes stricter: one exact candidate must pass
producer self-adoption, idempotence, the complete gate, and independent audit
before technical confirmation and publication. Recommendation promotion and
ordinary post-publication self-adoption remain later operational acts.

Adopt gains a formally pinned host-superset mode and predecessor-relative 0.3
compatibility entries. Exact fields and algorithms are derived technical work
subject to the accepted authority-first, validation, audit, and delegated
technical-confirmation boundaries.

## Non-Claims

This Decision does not:

- change any frozen NKF 0.1 or 0.2 byte;
- accept the exact NKF 0.3 authority pair or derive implementation by itself;
- make a passing check, candidate exercise, or audit an acceptance act;
- implement the deferred
  [NKF-021 Task Scope Gate](../tasks/deferred/NKF-021-task-scope-gate.md) or
  unsupported brownfield onboarding;
- accept or migrate a consumer repository's canonical meaning; or
- establish protected branch enforcement or Governing Use readiness.
