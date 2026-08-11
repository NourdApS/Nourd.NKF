---
title: "ADR 0111: Confirm The NKF 0.3 Release Candidate"
id: adr-0111
type: decision
summary: Confirm the exact independently audited NKF 0.3 implementation and private release candidate under the Human Product Owner's explicit assignment of technical confirmation to the reviewer.
created_at: 2026-08-11T10:43:49Z
record_lifecycle: immutable
record_status: accepted
task: NKF-023
decision_authority: Codex technical reviewer under the Human Product Owner's explicit assignment of technical confirmation to the reviewer
---

# ADR 0111: Confirm The NKF 0.3 Release Candidate

## Context And Problem

[ADR 0110](0110-accept-the-nkf-0-3-authority-pair.md) accepts the exact NKF
0.3 normative Markdown and executable companion, but acceptance does not
confirm their derived implementation or release bytes. [ADR 0109](0109-publication-freeze-and-proven-self-adoption.md)
requires the exact candidate to pass producer-compatible self-adoption and a
fresh independent audit before separate delegated technical confirmation.

The [exact-candidate audit](../evidence/audits/nkf-023-nkf-0-3-exact-candidate-audit.md)
returned `CLEAN` after independently reproducing the complete candidate from
fresh source, exercising all supported repository states, and rejecting the
adversarial cases. [NKF-023](../tasks/completed/NKF-023-release-nkf-0-3-with-immutable-freeze-and-proven-self-adoption.md)
records the Human Product Owner's boundary that Product decisions stay with
the Human Product Owner while implementation review and technical
confirmation are delegated to the technical reviewer.

## Decision

The Codex technical reviewer confirms the derived NKF 0.3 implementation at
exact release commit `8a06564e1c91069db19581ca5bfa22770ac95fb5` and the
corresponding private candidate archive at SHA-256
`34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4`.

The confirmed checker SHA-256 is
`804c082c3f1c8beebc24d044f23581cdafcf2fbac40aecbfff1ae0c75fbe807d`.
The confirmed adopter SHA-256 is
`9e20219d8b92a0b38086da48311f2d2bfd14f8676fa8256e9efcefaaa938afc5`.
The archive contains 134 exact pre-manifest members and one generated
manifest across all 18 required classes. The checker is its sole `0755`
member; all other members are `0644`.

This confirmation covers deterministic reproduction, exact authority and
Schema bindings, Product and Technology validation, one public Adopt
operation, initial onboarding, 0.1 and 0.2 repository-owner-approved breaking
migration, non-breaking 0.3 refresh, host-superset preservation, producer-gate
preservation, idempotence, rollback, and tamper rejection.

The exact confirmed archive may now enter the draft-prerelease publication
transaction defined by the accepted 0.3 release protocol. No candidate byte
may change. Recommendation promotion and ordinary producer Adopt remain
separate post-publication operations.

## Scope And Applicability

This Decision confirms the exact derived technical implementation and release
candidate that realize [ADR 0109](0109-publication-freeze-and-proven-self-adoption.md)
and [ADR 0110](0110-accept-the-nkf-0-3-authority-pair.md). It does not change
NKF 0.3 format meaning, compatibility classification, or any Product decision.
The Human Product Owner retains those authorities.

## Rationale

The complete fresh audit reproduced the archive byte-for-byte from the exact
remote commit, verified every release-set and manifest binding, rebuilt twice,
passed all 202 tests, exercised every supported adoption path, and proved
rollback and tamper rejection. Separate technical confirmation prevents tests
or Evidence from exercising authority by implication while respecting the
explicit Product-versus-technical responsibility boundary.

## Alternatives Considered

Publishing from the implementation's own passing gate was rejected because
independent exact-candidate audit is mandatory. Asking the Human Product Owner
to confirm technical facts was rejected because technical confirmation was
explicitly assigned to the reviewer. Rebuilding after this Decision was
rejected because confirmation is external to the archive and any changed
candidate byte would invalidate both audit and confirmation.

## Consequences And Trade-Offs

Publication is limited to one exact content-addressed archive. The external
Decision preserves review provenance without creating a manifest
self-reference or changing frozen release bytes. A later defect cannot be
fixed in place; it requires recommendation withdrawal or supersession and a
new NKF version.

## Non-Claims

This Decision does not:

- publish, recommend, withdraw, or supersede any NKF release;
- mutate or adopt the NKF producer or another consumer repository;
- accept a consumer's knowledge or confirm its Realization;
- establish remote workflow or protected-merge enforcement;
- verify historical acceptance bindings; or
- make Governing Use ready.
