# ADR 0017: Accept NKF 0.1 Acceptance-Provenance Boundary

- **Status:** Accepted
- **Task:** `NKF-003`
- **Proposed:** 29 July 2026
- **Accepted:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct confirmation in the NKF-003 discussion on
  29 July 2026

## Context

Native NKF 0.1 declares governance status, acceptance authority, and an
optional acceptance date while preserving that copied metadata does not prove
acceptance. Authority systems vary across immutable Decisions, Git history,
signed events, databases, and review systems.

The imported NKF-002 checker proposes a Git-specific `acceptance_source` with
a proposal commit revision. That representation is implementation evidence,
not accepted core meaning, and cannot represent all authority systems without
overfitting or false proof.

## Decision

The exact proposal at
[`../designs/nkf-0.1-acceptance-provenance-boundary.md`](../designs/nkf-0.1-acceptance-provenance-boundary.md),
with SHA-256
`4dd82be51f4b28746252b90754f1348b21779d5c4cf6c83e77a8a40dcc7bdcce`,
is accepted for native NKF 0.1.

Native core defines no universal `acceptance_source`, `acceptance_event`,
`proposal_revision`, or equivalent proof field. Governance `status`,
`authority`, and optional `accepted_at` remain non-proving declarations.

The accepted boundary requires consumers to keep these axes separate:

- declared governance;
- verification that the declared authority accepted the exact revision;
- NKF conformance; and
- Realization confirmation through separate Evidence.

Consequential governing use requires the applicable accepted status,
authority-system verification of the exact acceptance binding, and the
required NKF conformance. No one axis supplies another.

Authority-binding verification must establish the event or immutable
Decision, exercised authority, applicable outcome, exact bundle and record
identity, exact Markdown digest, exact declaration revision or digest, and
absence of supersession, revocation, or contradiction by the same authority.

Portable authority-specific evidence or resolver configuration uses a
required extension governed by ADR 0016. It does not become core by use.

## Compatibility

The imported Git-specific `acceptance_source` field is not native NKF 0.1. A
consumer must deliberately remove it during migration or carry it through a
supported extension.

Absence of a core proof field is not a structural or contract error. If
authority verification is not performed or its source is unavailable, the
binding is not verified rather than rejected. A resolved contradiction fails
closed for governing use.

## Not Decided

This Decision does not verify any record's acceptance, accept an
authority-specific extension, define universal path resolution, accept
replacement Markdown or YAML bytes, implement schemas or checker behavior, or
establish conformance or Realization.
