---
title: NKF-033 NKF 0.71 Guidance Review Finding
summary: Records as fact that the NKF 0.71 pre-cut guidance review did not meet the full-set standard ADR 0097 established, that the independent release audit did not detect it because release-protocol step six still named the superseded rule-diff standard, and that a stale version label shipped inside the published archive as the consequence — stating what was and was not verified, and asserting nothing about the standing of any accepted record.
created_at: 2026-08-19T02:15:00Z
---

# NKF-033 NKF 0.71 Guidance Review Finding

This Evidence records an observation about an already-published release. It
states what was and was not verified. It does not accept meaning, confirm a
Realization, supersede any record, or assert a consequence for the standing of
[ADR 0132](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md);
that judgment would require a Decision and none is made here.

## The Standard That Applied

[ADR 0095](../../decisions/0095-review-guidance-before-cutting.md) created the
mandatory pre-cut guidance review on `2026-08-07`, scoped to the version's own
rule diff.
[ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
widened it one day later, on `2026-08-08`, to every member of the versioned
set, each re-read in full against the complete current rule set, with the
enumerated member list and reviewed digests recorded for the independent
audit, and added the `set` command so review coverage starts from the
machine-readable member list rather than recollection. Neither Decision is
superseded. The widened standard was in force when NKF 0.71 was cut.

## What The NKF 0.71 Review Recorded

The
[NKF-031 guidance review](../release/nkf-031-nkf-0-71-guidance-review.md)
records a per-file narrative of what changed in the versioned set, and closes
with the completeness claim that "Every guidance file declares `NKF Version:
0.71` through the exact marker the executable companion defines."

It records no enumerated member list and no reviewed digests. Measured against
the twelve guidance members of the accepted 0.71 release set, it names none of
them by path or filename. The
[NKF-028 guidance review](../release/nkf-028-nkf-0-7-guidance-review.md) for
NKF 0.7, performed under the same standard, enumerates its member list from
`contracts/nkf/0.7/release-set.yaml`, states that each member was read in
full, binds the reviewed digests to the candidate archive manifest, and names
every member — and it caught a materially stale adoption protocol.

## Why The Audit Did Not Detect It

Release-protocol step six directed the independent audit to verify "that the
guidance review of step four was performed against the actual rule diff". That
instruction was correct under
[ADR 0095](../../decisions/0095-review-guidance-before-cutting.md) and was
never propagated when
[ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
widened step four. The audit therefore verified the review against the
superseded standard, which the review satisfied, and passed it.

Step six was itself a sentence describing a rule that was no longer the
current rule — the exact defect class step four exists to catch.

## The Consequence

The onboarding portable skill shipped inside the published NKF 0.71 archive
`3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13` with a
frontmatter description directing an agent to "prepare its NKF 0.7 candidate"
beneath a body marker declaring `NKF Version: 0.71`. The defect is present in
the release-set members `distribution/nkf/0.71/.claude/skills/nkf-onboarding/SKILL.md`
and `distribution/nkf/0.71/.agents/skills/nkf-onboarding/SKILL.md` and in the
generated `public-docs` copies, verified by extracting them from the published
archive. Publication freezes those bytes permanently, so the correction is
only reachable through a successor version.

## Scope Of What Remains Verified

The independent release audit's other verifications are unaffected by this
finding and were independently reproduced: every binding was recomputed from
bytes, the archive was rebuilt byte-identically from the bare release commit,
and the acceptance test was reproduced. The confirmed NKF 0.71 bytes are
exactly what
[ADR 0132](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md)
states they are.

The unsupported part is narrower and specific: the claim that the NKF 0.71
guidance set was reviewed to the standard in force.

## Corrections Delivered Under This Task

Step six now directs the audit to verify whole-set coverage — that the
enumerated member list is present, that each member carries a reviewed digest,
and that every correction is recorded — and states explicitly that a review
recording only the version's rule diff does not satisfy step four.
`scripts/verify-guidance-review.mjs` makes that deterministic by starting from
the same machine list ADR 0097 prescribes: every guidance member of the
reviewed version's release set must be named in the review, or the check
fails. Reviews for already-published versions are exempt, because Evidence
keeps its historical bytes and a past review can never be made compliant.
