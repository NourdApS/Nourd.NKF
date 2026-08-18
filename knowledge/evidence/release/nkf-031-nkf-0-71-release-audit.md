---
title: NKF-031 NKF 0.71 Release Audit
summary: Records the fresh independent audit of the exact NKF 0.71 release candidate — every binding recomputed from bytes, the archive rebuilt byte-identically from the bare release commit, the release set and order verified, and the delta-only producer upgrade acceptance test independently reproduced — returning clean with three non-blocking findings and their dispositions.
created_at: 2026-08-18T02:40:00Z
---

# NKF-031 NKF 0.71 Release Audit

Under [NKF-031](../../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md),
the exact NKF 0.71 release candidate received the fresh independent audit
the accepted release order requires between the isolated exact-candidate
exercise and the mandatory technical-confirmation Decision. A fresh
independent reviewer agent with no part in producing 0.71 performed it in
isolated copies, never mutating the candidate. This Evidence records its
exact subject, verification, findings, and verdict.

## Exact Subject

| Binding | Value |
| --- | --- |
| Release commit | `8727ac6ebedc61482bf8f90c546f9bf179d9f463` (`task/NKF-031`, clean tree) |
| Candidate archive SHA-256 | `3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13` |
| Checker SHA-256 | `7f84501e47072f12e48c0f0222425f9027cdb9a4387b77f53c40f7a71cfde4a6` |
| Adopter SHA-256 | `fe8945e2edfc5492f4f1cbbc4c2ca6ec8bc02626ea86a92d311edfd0d10e243d` |
| Verdict | Clean — ready for the technical-confirmation Decision |

## Mechanical Verification The Auditor Performed

Every digest bound by
[ADR 0131](../../decisions/0131-accept-the-nkf-0-71-authority-set.md), every
candidate Evidence registration, and the checker's pinned schema bindings
were recomputed from bytes and matched. The candidate archive was rebuilt
byte-identically from a bare clone of the release commit through the release
packager, including the deterministic double checker build and the accepted
0.71 artifact-digest validation; the archive is deliberately gitignored
working-tree output whose reproducibility from the bare commit is the
binding proof. The 0.71 release set's one hundred forty-one members equal
the archive contents exactly with the licensing classes present and no
predecessor contract tree shipped. The complete release order was verified
in commit order with every step's registered Evidence, and the guidance
review's claims were verified against the shipped distribution bytes. The
complete gate ran at exit zero and the full suite passed two hundred
forty-three tests across twenty-six files, three times.

## The Acceptance Test, Independently Reproduced

The Human Product Owner's hard constraint — the 0.7-to-0.71 producer
upgrade must be provable through the digest-bound delta claim alone, with
no whole-root review — was reproduced end to end: the shipped adopter,
rerun by the auditor against a fresh isolated copy, emitted a delta-stage
promotion review template with three hundred thirteen carried node
judgments and a required fresh set of exactly one — the promotion-created
native Specification record; the completed review differs from the machine
template only in the reviewer-supplied fields; and the full exercise rerun
returned `passed` with first Adopt `updated`, repeat `current`, the
host-superset integration preserved, the producer gate green inside the
promoted copy, and every source member reproduced. No waiver language
exists anywhere in the 0.71 surfaces.

## Findings And Disposition

| Finding | Severity | Disposition |
| --- | --- | --- |
| The living Realization's derived-implementation row still led with the published 0.7 release-commit clause while binding the 0.71-candidate implementation paths | should-fix | Repaired in the same post-audit governance act as the confirmation Decision; repository prose outside the archive and the accepted authority |
| The accepted Specification's operational-fact section states the promotion mechanically writes one pending reconciliation entry per declaring node, while the shipped adopter fails closed when any declaring node exists and never writes entries — inherited verbatim from accepted NKF 0.7 and vacuous while zero nodes declare operational dependencies | note | Recorded here with the S1 label note as accepted-byte findings for the next governed revision; the fail-closed behavior is the stricter of the two readings |
| The Realization's 0.7 release-realization row bound `public-docs/` as a durable location while the working tree now carries the 0.71 projection | note | Clarified in the same governance act: the frozen archive fact keeps its meaning, the tree location binding names the current projection |

The previously disclosed items were verified recorded with their
dispositions: the predecessor-era "migrated declarations" prose note and
the checker revision divergence for non-Markdown evidence documents in the
[authority audit](../audits/nkf-031-nkf-0-71-independent-authority-audit.md),
the revision-invisibility observation in the sealed repair review, and the
retained NKF 0.2 process roots rationale in the owning Task and the
Realization.

This Evidence records audit facts and dispositions. It does not itself
confirm, publish, or promote anything; confirmation is the separate act of
[ADR 0132](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md).
