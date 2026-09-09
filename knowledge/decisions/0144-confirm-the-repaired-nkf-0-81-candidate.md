---
id: adr-0144
type: decision
title: "ADR 0144: Confirm The Repaired NKF 0.81 Candidate"
summary: Technically confirm the exact repaired NKF 0.81 candidate after independent archive and documentation review and a successful isolated producer exercise, under the recorded technical delegation, while preserving separate publication, recommendation, live promotion, and merge authority.
created_at: 2026-09-09T18:02:37Z
---

# ADR 0144: Confirm The Repaired NKF 0.81 Candidate

## Context And Problem

The Human Product Owner directed the Codex technical reviewer to audit P1
and execute at will, then explicitly directed committing the repairs, closing
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
and making its pull request ready for merge. The Task records the technical
delegation and final handoff plan. The repaired predecessor-proof meaning is
accepted prospectively by
[ADR 0142](0142-accept-the-bound-predecessor-repair.md), with the final exact
artifact and promotion selection established by
[ADR 0143](0143-bind-the-predecessor-repair-promotion.md).

The previous confirmation in
[ADR 0141](0141-confirm-the-nkf-0-81-release-candidate.md) applies only to its
original archive. It cannot confirm the later predecessor-proof, guidance,
HTTPS evidence, and diagnostic corrections. A new independent audit and exact
producer exercise have now completed, recorded in the
[release audit Evidence](../evidence/release/nkf-038-nkf-0-81-release-audit.md)
and the complete
[guidance review Evidence](../evidence/release/nkf-038-nkf-0-81-guidance-review.md).

## Decision

Under the recorded technical delegation, confirm that the exact corrected
implementation below realizes the accepted repaired 0.81 authority selection.
This is a prospective technical confirmation by the Codex technical reviewer;
it does not assert that the Human Product Owner personally inspected the bytes.

| Binding | Exact value |
| --- | --- |
| Release commit | `fa0efa056db17f5336a3b7a93142d58f41110cf7` |
| Archive SHA-256 | `a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3` |
| Release tag | `release-sha256-a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3` |
| Checker SHA-256 | `1a268c93d9f484389885c02336ebd8464718967249036e79de03ddf7cd775008` |
| Adopter SHA-256 | `12272609c5d0ca7bcc6d5bc67b919f86f1dfee1a1d53409f10549e419c32ffa5` |
| Complete set | 142 members, including the manifest; 141 source members reproduced |
| Authority selection | Final five-artifact revision selected by [ADR 0143](0143-bind-the-predecessor-repair-promotion.md) |

The release commit records the independent audit of archive
`070d3222af5274cbec51153fb2c9eac6f2befc336470e3f7de2792cbd16a6851`.
Independent comparison established that all 141 source-member bytes are
identical; only the manifest's source-commit binding changed. The exact final
archive was then exercised again successfully before this confirmation.

## Scope And Applicability

This confirmation applies only to the exact release bytes and source commit
above. It succeeds the prior candidate confirmation for the current repaired
candidate, while preserving the prior Decision as immutable history. It
neither changes accepted format meaning nor retroactively repairs the original
acceptance provenance. Any later release-member change requires a fresh cut,
exercise, audit, and confirmation.

It confirms the release implementation against the accepted authority pair.
It does not confirm the entire living current-system Realization revision;
that record retains its explicitly partial confirmation status.

## Rationale

The independent GPT-5.6 Luna reviewer checked the complete documentation
inventory, all twelve fully re-read guidance members, the final authority
bindings, the predecessor-proof implementation and adversarial regressions,
archive integrity, and the 24 preserved version-specific 0.8 members. The
remaining stale onboarding-plan diagnostic was corrected before the final cut.
Release packaging passed all 281 tests in 29 files and deterministic build,
projection, and notices checks. The native HTTPS test uses real TLS and an
allowlisted redirect and refuses untrusted TLS and altered bytes.

Both corrected archive cuts passed isolated exact-producer adoption: first
`updated`, repeat `current`, host-superset preserved, and the full producer
gate passed. The final promotion uses a digest-bound delta with exactly one
fresh eligible, governing native Specification judgment and 358 carried
judgments. The shipped checker independently verifies predecessor history,
carried provenance, exact closure, and readiness. Source reproduction rebuilt
all 141 source members from a clean clone of the final release commit.

## Alternatives Considered

Reusing the old candidate confirmation was rejected because its bytes differ.
Closing the Task with the exercise and confirmation gates unknown was rejected.
Changing published 0.8 bytes or advancing the producer pin to make version
labels uniform was rejected because the producer has not adopted 0.81.
The final manifest is bound to the audit-recording commit, preserving the
established release order without modifying any audited source member.

## Consequences And Trade-Offs

The repaired candidate is technically ready for the separately authorized
publication stage and the completed Task may be presented for merge review.
The producer remains declared, pinned, and installed at 0.8, and the catalog
continues recommending 0.8. The live window remains 0.8 plus 0.71 until the
separate publication and promotion work establishes the successor state.
Bound predecessor proof verifies structural and digest consistency; semantic
review truth and external authority remain outside that mechanical proof.

## Non-Claims

This Decision publishes no release, changes no recommendation, promotes no
live producer, merges no branch, and itself concludes no Task. It accepts no
consumer knowledge and makes no live public 0.81 adoption claim. The controlled
HTTPS experiment and isolated candidate exercise remain scoped as such.
