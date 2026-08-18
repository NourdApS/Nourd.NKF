---
id: adr-0132
type: decision
title: "ADR 0132: Confirm The NKF 0.71 Release Candidate"
summary: Technically confirm the exact audited NKF 0.71 release candidate — the content-addressed archive at its clean release commit with its checker and adopter digests — bound to the fresh independent release audit and the passed isolated exact-candidate exercise whose promotion was proven through the digest-bound delta claim alone, authored as the mandatory post-audit outside-the-archive record before any separately authorized publication.
created_at: 2026-08-18T02:45:00Z
---

# ADR 0132: Confirm The NKF 0.71 Release Candidate

## Context And Problem

The accepted release order requires one technical-confirmation Decision as
a post-audit, outside-the-archive governance record between the clean fresh
independent audit of the exact candidate and any separately authorized
publication. The NKF 0.71 candidate delivered under
[NKF-031](../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md) passed
its isolated exact-candidate exercise — first Adopt `updated`, repeat
`current`, host-superset integration preserved, the complete producer gate
green inside the promoted copy, and every source member reproduced — with
the producer promotion proven through the digest-bound delta claim alone:
the delta-stage review carried every judgment by digest identity and
performed exactly one fresh judgment, the promotion-created native
Specification record. The fresh independent release audit is recorded in
the
[release audit Evidence](../evidence/release/nkf-031-nkf-0-71-release-audit.md):
clean, with every binding recomputed from bytes, the archive rebuilt
byte-identically from the bare release commit, and the acceptance test
independently reproduced, and with three non-blocking repository-prose
and recording findings dispositioned in the same Evidence.

## Decision

On `2026-08-18`, the Claude technical reviewer, acting under the recorded
delegation in
[NKF-031](../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md),
technically confirms the exact audited NKF 0.71 release candidate:

| Binding | Value |
| --- | --- |
| Release commit | `8727ac6ebedc61482bf8f90c546f9bf179d9f463` |
| Archive SHA-256 | `3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13` |
| Checker SHA-256 | `7f84501e47072f12e48c0f0222425f9027cdb9a4387b77f53c40f7a71cfde4a6` |
| Adopter SHA-256 | `fe8945e2edfc5492f4f1cbbc4c2ca6ec8bc02626ea86a92d311edfd0d10e243d` |
| Bound release audit | [NKF-031 NKF 0.71 release audit](../evidence/release/nkf-031-nkf-0-71-release-audit.md) |

Only these exact bytes may be published as NKF 0.71. Any candidate source,
authority, implementation, license, notice, release-set, or archive byte
change invalidates this confirmation and requires a fresh candidate,
exercise, and audit. This confirmation is invalid without its bound audit
Evidence.

## Scope And Applicability

This Decision is the mandatory audit-bound technical confirmation the
accepted release order requires. It applies to the exact bindings above for
the separately authorized publication, recommendation, and live producer
promotion, and to nothing else.

## Rationale

The reconciled confirmation ordering exists so the record that authorizes
exact bytes always postdates the audit of those exact bytes and never
perturbs them: this record lives outside the archive, and review binding
excludes post-audit governance records by contract, so authoring it
invalidates neither the sealed reviews nor the candidate. The exercise and
audit together prove the candidate the only way the format accepts — by
running it — and the delta-proven promotion discharges the bootstrap
promise the predecessor recorded.

## Alternatives Considered

Publishing on the exercise result without the fresh independent audit was
rejected: the accepted order makes the audit-bound confirmation mandatory
with no waiver. Confirming before the audit completed was rejected for the
same reason.

## Consequences And Trade-Offs

Publication, recommendation, and live promotion remain separately
authorized Human Product Owner acts over exactly these bytes; the
recommended-release binding registry carries this confirmation's bindings
so publication requires no code edit. A later repair of any confirmed byte
is a new candidate.

## Non-Claims

This Decision does not publish, recommend, adopt, promote the live
producer, merge, or change visibility; accepts no new authority; confirms
no Realization; establishes no Governing Use; and concludes no Task.
