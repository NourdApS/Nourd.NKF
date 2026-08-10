---
title: "ADR 0108: Confirm The Unified Adopt Realization"
id: adr-0108
type: decision
summary: Confirm the exact independently audited technical implementation and release candidate that realize the Human Product Owner-accepted unified Adopt and compatibility-signaling boundary.
created_at: 2026-08-10T11:31:00Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Codex technical reviewer under the Human Product Owner's explicit assignment of technical confirmation to the reviewer and authorization to record and publish it
---

# ADR 0108: Confirm The Unified Adopt Realization

## Context And Problem

[ADR 0107](0107-unified-adopt-operation-and-compatibility-signaling.md)
records the Human Product Owner's accepted Product and process boundary but
does not confirm derived tooling, guidance, tests, or release bytes. The
[independent audit](../evidence/audits/nkf-020-unified-adopt-release-audit.md)
reviews exact implementation commit
`7eefe7d624fa8412e307c44a779c2e5e0afa497a` and candidate archive SHA-256
`015a922d17a6c29895af1df199485bde209f1ca165bc2bcbfe39f7a9b0b4a51f`.

On `2026-08-10`, after receiving the clean audit, the Human Product Owner
explicitly stated that they confirm only Product decisions and assigned the
technical confirmation to the technical reviewer. The Human Product Owner
then explicitly authorized recording that technical confirmation, publishing
the exact candidate, promoting it as recommended NKF 0.2, and finishing
[NKF-020](../tasks/active/NKF-020-version-release-adoption-and-compatibility-process.md).
This Decision exercises that technical authority without asking the
Human Product Owner to attest to implementation facts.

## Decision

The Codex technical reviewer confirms the unified Adopt implementation at
exact commit `7eefe7d624fa8412e307c44a779c2e5e0afa497a` and its corresponding
candidate archive.

The confirmed implementation exposes one public no-subcommand operation,
binds its running adopter to the governed recommendation and exact archive,
routes supported repository states internally, and returns only `onboarded`,
`migrated`, `updated`, or `current`. It fails closed before initial adoption
without a reviewed sealed plan and before the breaking 0.1-to-0.2 migration
without explicit repository-authority approval.

The candidate archive contains 132 exact pre-manifest members and one generated
manifest. The checker digest remains
`f96d8b818bc2bcac64fe65cfc46a4ff9bfdd0c31a6783b72cec05484f10403c6`;
the adopter digest is
`e109fbeaf99d7576b56e0fdf1411092b235379a6eba7a58b99db719391c344d0`.

This confirmation authorizes publication of the exact audited candidate under
the existing unconsumed-release exception. Recommendation and public-document
facts may be updated only after authenticated publication observations.

## Scope And Applicability

This Decision confirms the exact derived implementation, consumer routing,
guidance, validation coverage, and candidate release bytes that realize
[ADR 0107](0107-unified-adopt-operation-and-compatibility-signaling.md). It
does not change NKF 0.2 format meaning or its accepted authority pair.
The Human Product Owner retains authority over Product decisions, including
the public operation and compatibility judgement already accepted in
[ADR 0107](0107-unified-adopt-operation-and-compatibility-signaling.md).

## Rationale

The audit independently exercised initial Product and Technology adoption,
native 0.2 refresh and current state, real 0.1 breaking preflight and approved
migration, tamper rejection, extracted tools, exact membership, source bytes,
and archive reproducibility. Separate technical confirmation keeps those
observations from supplying Product authority by implication while respecting
the Human Product Owner's explicit responsibility boundary.

## Alternatives Considered

Publishing from passing tests alone was rejected because the release protocol
requires independent post-action audit and separate confirmation. Asking the
Human Product Owner to confirm technical implementation was rejected because
they explicitly retained Product decisions and assigned technical confirmation
to the reviewer. Treating compatibility as tool-inferred was rejected because
it is semantic judgement already supplied by the Human Product Owner.

## Consequences And Trade-Offs

Supported repositories receive one stable public operation and an immutable
target pin. Breaking migration requires a visible extra approval step. New
predecessors require an explicit compatibility declaration before they can be
recommended; tooling cannot silently guess compatibility.

## Non-Claims

This Decision does not:

- publish the release, recommendation, or public documentation;
- migrate an external consumer or accept its knowledge;
- make validation confirm a consumer Realization;
- verify historical acceptance bindings or make Governing Use ready;
- establish protected merge enforcement; or
- merge or conclude [NKF-020](../tasks/active/NKF-020-version-release-adoption-and-compatibility-process.md) by itself.
