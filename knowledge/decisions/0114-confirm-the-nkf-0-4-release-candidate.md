---
title: "ADR 0114: Confirm The NKF 0.4 Release Candidate"
id: adr-0114
type: decision
summary: Confirm the exact independently audited NKF 0.4 maintenance implementation and private release candidate under the Human Product Owner's explicit technical delegation.
created_at: 2026-08-11T15:16:16Z
record_lifecycle: immutable
record_status: accepted
task: NKF-024
decision_authority: Codex technical reviewer under the Human Product Owner's explicit NKF 0.4 maintenance delegation
---

# ADR 0114: Confirm The NKF 0.4 Release Candidate

## Context And Problem

[ADR 0113](0113-accept-the-nkf-0-4-authority-pair.md) accepts the exact NKF
0.4 maintenance authority pair, but acceptance does not confirm derived Schema,
checker, adopter, dependency, integration, or archive bytes. [ADR 0112](0112-allocate-nkf-0-4-security-maintenance.md)
delegates technical confirmation only inside the fixed non-breaking maintenance
boundary and requires independent exact-candidate audit before publication.

The [exact-candidate audit](../evidence/audits/nkf-024-nkf-0-4-exact-candidate-audit.md)
at SHA-256
`b0e135ec5a238af9568ffeb1ef0a366453acdf3020dfee48c0d07cd1e4dc90c8`
returned `CLEAN` after independently parsing, rebuilding, reproducing, and
exercising the exact replacement candidate from a fresh remote clone. The
superseded earlier private archive was never published and supplies no fact to
this confirmation.

## Decision

The Codex technical reviewer confirms the derived NKF 0.4 implementation at
exact release commit `29880a398c26fbc126b13cdaaebe9cf5b7fe7734` and the
corresponding private candidate archive at SHA-256
`a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd`.

The confirmed checker SHA-256 is
`425286d383fa2a93461ebbae4fc986c67f987adab3b5545a927b75064c9ed123`.
The confirmed adopter SHA-256 is
`416b26e7413afebf24fdb97d47cedae613242476839c98250a330c3cdcf0cd65`.
The confirmed exact dependency lock SHA-256 is
`c2490fc325ef0d3653c0f11d133aacf60b2e0560ba5ff0fa0507acd60a8171fe`.
The archive contains 135 exact pre-manifest members and one generated manifest
across all 18 closed classes. The checker is its sole `0755` member; every
other member is `0644`.

This confirmation covers deterministic source and archive reproduction, exact
authority and four-Schema bindings, patched `fast-uri` and `nanoid` resolution,
zero known npm advisories at the audit checkpoint, Product and Technology
validation, one public Adopt operation, initial onboarding, repository-owner-
approved preserving 0.1 and 0.2 migration, non-breaking approval-free 0.3
update with byte-identical knowledge, host-registry and host-superset
preservation, producer-gate preservation, idempotence, rollback, and tamper
rejection.

The exact confirmed archive may now be published through the accepted release
transaction. No candidate byte or release-commit input may change.
Recommendation promotion and ordinary producer Adopt remain separate
post-publication operations.

## Scope And Applicability

This Decision confirms only the exact technical implementation and release
candidate that realize [ADR 0112](0112-allocate-nkf-0-4-security-maintenance.md)
and [ADR 0113](0113-accept-the-nkf-0-4-authority-pair.md). It does not change
NKF meaning, the 0.3-to-0.4 non-breaking classification, or any Product
decision. The Human Product Owner retains those authorities.

## Rationale

The fresh audit independently verified all 136 archive members, all 18 closed
classes, zero known npm advisories, two exact builds, byte-for-byte package
reproduction, 28 test files and 210 tests, extracted checker behavior, every
supported predecessor route, rollback, tamper rejection, and pristine-producer
candidate Adopt returning `updated` then `current` without changing knowledge
or weakening the producer gate. Separate technical confirmation prevents
passing code or Evidence from exercising authority by implication.

## Alternatives Considered

Publishing from the candidate's own green gate was rejected because an
independent exact-candidate audit is mandatory. Returning technical facts for
Human Product Owner confirmation was rejected because [ADR 0112](0112-allocate-nkf-0-4-security-maintenance.md) expressly
assigns them to the technical reviewer. Reusing the superseded candidate was
rejected because its producer exercise exposed a real integration defect.
Rebuilding after this Decision was rejected because any candidate-byte change
invalidates both the audit and this confirmation.

## Consequences And Trade-Offs

Publication is limited to one exact content-addressed archive and its exact
release commit. The external confirmation record avoids a manifest
self-reference and changes no frozen candidate byte. A later defect cannot be
fixed in place after publication; it requires recommendation withdrawal or
supersession and a new NKF version.

## Non-Claims

This Decision does not:

- publish, recommend, withdraw, or supersede an NKF release;
- mutate or adopt the NKF producer or another consumer repository;
- prove the time-bound remote availability of the 0.3 or 0.4 release assets;
- accept consumer knowledge or confirm a consumer Realization;
- establish remote workflow or protected-merge enforcement;
- verify historical acceptance bindings; or
- make Governing Use ready.
