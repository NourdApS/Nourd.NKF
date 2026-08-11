---
title: "ADR 0113: Accept The NKF 0.4 Authority Pair"
id: adr-0113
type: decision
summary: Accept the exact independently reviewed NKF 0.4 normative Markdown and digest-bound executable companion as the non-breaking dependency-security successor pair.
created_at: 2026-08-11T14:24:04Z
record_lifecycle: immutable
record_status: accepted
task: NKF-024
decision_authority: Codex technical reviewer under the Human Product Owner's explicit NKF 0.4 maintenance delegation
---

# ADR 0113: Accept The NKF 0.4 Authority Pair

## Context And Problem

[ADR 0112](0112-allocate-nkf-0-4-security-maintenance.md) allocates NKF 0.4 as
a non-breaking dependency-security successor, fixes the allowed meaning delta,
preserves NKF 0.3 immutably, and explicitly delegates exact maintenance-pair
acceptance to the technical reviewer. [NKF-024](../tasks/completed/NKF-024-release-nkf-0-4-dependency-security-maintenance.md)
requires an exact accepted pair before the 0.4 Schemas, checker, adopter,
release set, fixtures, documentation, and package can claim derived authority.

The fresh [authority-pair audit](../evidence/audits/nkf-024-nkf-0-4-authority-pair-audit.md)
caught and corrected one accidental CommonMark version substitution, restarted
from the corrected bytes, and returned `CLEAN` with no normative or
compatibility expansion.

## Decision

On `2026-08-11`, the Codex technical reviewer, acting under the explicit
delegation in [ADR 0112](0112-allocate-nkf-0-4-security-maintenance.md), accepts
these exact bytes together as the canonical NKF 0.4 authority pair:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.4 Specification](../specifications/nkf-0.4.md) | `knowledge/specifications/nkf-0.4.md` | `7298d1a55dcd74d4cc96368648aadbd6a70b5cf4c62d2a1c7f528e7c9181bab1` |
| [NKF 0.4 executable companion](../../contracts/nkf/0.4/nkf.yaml) | `contracts/nkf/0.4/nkf.yaml` | `a84fcc1e99567b6716e3281efedbbc87c978ffa465cd4cb5d8cac1d46ad0d217` |

The Markdown remains the normative human authority. The executable companion
is accepted only with its exact binding to that Markdown digest. Together they
preserve the complete accepted NKF 0.3 meaning while changing only the 0.4
coordinate, exact predecessor and release bindings, and explicit compatibility:
0.1 and 0.2 remain breaking and repository-owner approval-gated; 0.3 to 0.4 is
non-breaking with no knowledge migration or breaking approval; 0.4 refresh is
non-breaking.

## Scope And Applicability

This Decision accepts exact NKF 0.4 format meaning and its executable
representation. It authorizes derived implementation under
[NKF-024](../tasks/completed/NKF-024-release-nkf-0-4-dependency-security-maintenance.md).
NKF 0.4 governs a repository only when it deliberately declares
`nkf_version` `0.4`. NKF 0.1, NKF 0.2, and NKF 0.3 remain immutable governing
authority for repositories that declare those versions.

The delegation is exhausted by the fixed technical maintenance boundary. An
actual vocabulary, topology, authority, validation, onboarding-category, or
compatibility change still requires a new Human Product Owner decision.

## Rationale

The exact pair is a byte-bound successor of the independently accepted 0.3
pair. Complete comparison found no format behavior delta after the mechanical
CommonMark error was corrected. Explicit pair acceptance keeps implementation
and passing tests from defining meaning by implication while respecting the
assigned Product-versus-technical boundary.

## Alternatives Considered

Editing or republishing 0.3 was rejected by its publication freeze. Reusing the
0.3 pair under a new package label was rejected because NKF versions bind every
complete-set member. Accepting the initial mechanically replaced pair was
rejected because it falsely changed the CommonMark version. Returning the
corrected exact technical pair for another Product approval was rejected
because [ADR 0112](0112-allocate-nkf-0-4-security-maintenance.md) explicitly
delegates this decision and no Product delta remains.

## Consequences And Trade-Offs

All derived 0.4 artifacts must bind these exact pair digests and preserve the
accepted 0.3 behavior. Any later pair-byte change before publication requires
a new exact audit and governed re-acceptance. Publication freezes the entire
0.4 set permanently; a later correction becomes NKF 0.5 or another separately
allocated version.

## Non-Claims

This Decision does not:

- derive or confirm Schemas, checker, adopter, release-set, fixture,
  documentation, integration, or archive bytes;
- establish dependency-audit closure, implementation conformance, or release
  readiness;
- publish, recommend, or adopt NKF 0.4;
- alter any NKF 0.3 byte, release, audit, or authority record;
- accept consumer knowledge or confirm a consumer Realization; or
- establish remote enforcement, acceptance-binding verification, or Governing
  Use readiness.
