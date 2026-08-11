---
title: "ADR 0110: Accept The NKF 0.3 Authority Pair"
id: adr-0110
type: decision
summary: Accept the exact independently audited NKF 0.3 normative Markdown and digest-bound executable companion as the successor authority pair.
created_at: 2026-08-10T22:38:16Z
record_lifecycle: immutable
record_status: accepted
task: NKF-023
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0110: Accept The NKF 0.3 Authority Pair

## Context And Problem

[ADR 0109](0109-publication-freeze-and-proven-self-adoption.md) adopts the
publication-triggered freeze, exact-candidate self-adoption, producer-compatible
integration, and predecessor compatibility direction for NKF 0.3, but does not
accept an exact normative authority pair. [NKF-023](../tasks/completed/NKF-023-release-nkf-0-3-with-immutable-freeze-and-proven-self-adoption.md)
requires that pair to be accepted before any Schema, checker, release-set,
adopter, protocol, fixture, example, documentation, or migration implementation
is derived.

The first independent pair audit found a release-confirmation byte cycle,
weaker executable file-mode meaning, incomplete deterministic release-set
coverage, and misplaced operational procedure. Two corrected exact-pair
audits then found and resolved remaining semantic symmetry defects. The final
independent regression audit returned `CLEAN` with no material finding.

## Decision

On `2026-08-11`, the Human Product Owner accepts these exact bytes together as
the canonical NKF 0.3 authority pair:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.3 Specification](../specifications/nkf-0.3.md) | `knowledge/specifications/nkf-0.3.md` | `0094bedce5485901c3ab6fb542e3d2785e961991cf7cc6f24e9aa3462498436e` |
| [NKF 0.3 executable companion](../../contracts/nkf/0.3/nkf.yaml) | `contracts/nkf/0.3/nkf.yaml` | `e988a596e741d48611a5f77a9236e9d539f9a7475a76f07768bc273a8bf4d27f` |

The Markdown is the normative human authority. The executable companion is
accepted only with its exact binding to the accepted Markdown digest. Together
they preserve the accepted NKF 0.2 Product and Technology contracts while
establishing the NKF 0.3 publication freeze, complete-set release contract,
and predecessor-relative compatibility meaning adopted through
[ADR 0109](0109-publication-freeze-and-proven-self-adoption.md).

## Scope And Applicability

This Decision accepts NKF 0.3 format meaning and its executable representation.
It authorizes derived implementation under [NKF-023](../tasks/completed/NKF-023-release-nkf-0-3-with-immutable-freeze-and-proven-self-adoption.md).
NKF 0.3 governs a repository only when that repository deliberately declares
`nkf_version` `0.3`. NKF 0.1 and NKF 0.2 remain immutable governing authority
for repositories that declare those versions.

## Rationale

The exact pair derives from the confirmed Product direction, preserves the
predecessor contract outside the accepted successor boundaries, and has passed
fresh independent semantic, structural, digest, link, self-reference, and
release-order review. Accepting exact bytes before implementation preserves the
authority-first boundary: derived code must conform to the pair rather than
silently defining it.

## Alternatives Considered

Leaving the pair as Draft while implementation proceeded was rejected because
implementation and passing tests cannot accept normative meaning. Accepting an
earlier audited pair was rejected because each carried material coherence or
symmetry findings. Reopening already confirmed Product boundaries was rejected
because the final corrections were technical derivation fixes within
[ADR 0109](0109-publication-freeze-and-proven-self-adoption.md).

## Consequences And Trade-Offs

NKF 0.3 implementation may now be derived and tested. Any later candidate
change to accepted pair bytes before publication requires explicit governed
re-acceptance and invalidates prior exact-byte audit claims. Authenticated
publication of the complete 0.3 set will freeze every member permanently and
make any later member change a new NKF version.

## Non-Claims

This Decision does not:

- derive or confirm NKF 0.3 Schemas, checker, release set, archive, adopter,
  protocols, fixtures, examples, documentation, or migration behavior;
- establish implementation conformance or release readiness;
- publish NKF 0.3, change the recommendation, or adopt any repository;
- change this repository's current NKF 0.2 declaration; or
- claim protected remote enforcement, acceptance-binding verification, or
  Governing Use readiness.
