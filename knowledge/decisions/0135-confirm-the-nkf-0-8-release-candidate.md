---
id: adr-0135
type: decision
title: "ADR 0135: Confirm The NKF 0.8 Release Candidate"
summary: Technically confirm the exact NKF 0.8 release candidate — the content-addressed archive at its clean release commit with its checker and adopter digests — bound to five independent release audit rounds whose fifth found the delivery clean and to the passed isolated exact-candidate exercise, and recording verbatim the limits the final audit declined to vouch for, authored as the mandatory post-audit outside-the-archive record before any separately authorized publication.
created_at: 2026-08-19T07:45:00Z
---

# ADR 0135: Confirm The NKF 0.8 Release Candidate

## Context And Problem

The accepted release order requires one technical-confirmation Decision as a
post-audit, outside-the-archive governance record between the independent audit
of the exact candidate and any separately authorized publication. The NKF 0.8
candidate delivered under
[NKF-033](../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md)
has passed its isolated exact-candidate exercise and has been audited
independently five times.

The audit history is unusual and is part of what this Decision confirms. Rounds
one through four each returned findings, and in rounds two, three, and four the
findings were largely defects created by the previous round's repairs. The fifth
round, deliberately weighted toward the delivery, returned the delivery **clean
with zero blocking defects** after rebuilding the archive byte-identically in a
clean clone, reconciling all one hundred forty-one members and every binding
digest, re-reading all twelve guidance members in full, and executing every
command capability claim rather than reading it. Its single blocking finding was
a false count in this Task's own Evidence, which was repaired.

Every round's findings, repairs, and dispositions are recorded in the
[release audit Evidence](../evidence/release/nkf-033-nkf-0-8-release-audit.md).

## Decision

Technically confirm the exact NKF 0.8 release candidate:

| Binding | Value |
| --- | --- |
| Release commit | `1c8c31948d73e6d79ee36c1b13985ca6db031e5b` |
| Archive SHA-256 | `2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5` |
| Release tag | `release-sha256-2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5` |
| Checker SHA-256 | `52d491cc25da898444bf33568e92b058fca4559fd1863902ad48504899d5985a` |
| Release set | 141 members, 140 source members reproduced |
| Live window | NKF 0.8 plus NKF 0.71 |

The candidate passed its isolated exact-candidate exercise: first Adopt
`updated`, repeat Adopt `current`, host-superset integration preserved, the
complete producer gate green inside the promoted copy at two hundred sixty-eight
of two hundred sixty-eight tests, and every source member reproduced. The
producer promotion is proven through the digest-bound delta claim alone — three
hundred seventeen judgments carried by digest identity under the accepted
0.71-to-0.8 version-delta declaration, and exactly fourteen fresh judgments
equal to the computed closure and to the knowledge nodes this Task authored.

## Scope And Applicability

This confirmation applies to the exact bytes named above and to nothing else.
It governs the technical readiness of that candidate for a separately
authorized publication decision. It does not reach the meaning NKF 0.8
expresses, which
[ADR 0134](0134-accept-the-nkf-0-8-authority-set.md) accepted, and it does not
reach any consumer's adoption decision.

## Rationale

Five independent audit rounds is more than any predecessor release required, and
the reason is worth recording rather than smoothing over. The delivery was
correct early and stayed correct; the hand-written record around it was not, and
each round's repairs introduced defects the next round found. Confirming on the
fifth round is justified because that round audited the delivery specifically —
rebuilding the archive, reconciling every member, and executing every capability
claim instead of reading it — and found it clean, while its one blocking finding
was a count in this Task's own Evidence that has since been repaired and
mechanised.

Confirming despite an imperfect record is the right call because the record's
defects were disclosed, are recorded in full, and do not change what the
software does. Withholding confirmation until a round is clean in both delivery
and record would have required the record to describe its own correction without
error, which four rounds demonstrated is not reliably achievable by the reviewer
who wrote it.

## Alternatives Considered

**Continue auditing until a round returns clean in both delivery and record.**
Rejected. Each repair to Evidence changes a governed digest, which re-cuts the
archive and invalidates the audit that prompted the repair, so a clean round
followed by any repair produces a candidate with no clean audit. The loop cannot
close itself.

**Confirm without recording the limits.** Rejected. The audits stated precisely
what they would not vouch for, and a confirmation that omits that is worth less
than one that carries it.

**Abandon NKF 0.8 and correct the guidance without a version.** Rejected on the
established ground that the installed pin byte-locks the producer's guidance and
verification chain, so neither half of the remedy is reachable without a
successor version.

## Consequences And Trade-Offs

This Decision confirms the exact candidate technically. It does not publish,
recommend, promote, or adopt anything. Publication, recommendation, live
producer promotion, the separate producer adoption of NKF 0.8, and merging
remain separately authorized Human Product Owner acts.

The confirmation binds the exact bytes above. Any change to a candidate source,
authority, implementation, licensing, release-set, or archive byte invalidates
this confirmation and requires a re-cut, a re-run exercise, a fresh audit, and a
later Decision.

One durable lesson is recorded for successors rather than left in the audit
Evidence. The delivered mechanism converged on the first attempt and never
regressed across five independent rounds; the hand-written record around it did
not converge, and every count in it that a script could produce is now produced
by one. The generated distribution ends stale version labels. It does not end
stale claims, and no part of this release should be read as claiming otherwise.

The trade-off accepted here is explicit: NKF 0.8 is confirmed with a record that
took five rounds to stabilise and whose remaining self-descriptive claims were
not all re-derived. In exchange, the delivered mechanism is verified more
thoroughly than any predecessor — every capability claim executed rather than
read — and the limits are enumerated below rather than discovered later.

## Non-Claims

The fifth audit stated what it would not vouch for even having found the
delivery clean. It is recorded here verbatim in substance rather than
paraphrased away, because a confirmation that hides its own limits is worth
less than one that states them.

1. **Prose truth beyond the members actually re-read.** Twelve guidance members
   were re-read in full and the remaining members were machine-scanned for
   version literals only. A stale *claim* carrying no version literal elsewhere
   in the set would have survived. Stale claims of exactly that kind survived
   the earlier audit rounds.
2. **The record's remaining self-descriptive counts.** The fifth round verified
   the version-surface inventory's three counts and found one false. It did not
   re-derive every count in the guidance review or the Task's gate narrative.
   Two earlier rounds found their blocking defects in that material.
3. **The three new guidance verifiers do not run in the producer's own gate at
   this commit.** They are gated on the declared version and this producer
   declares NKF 0.71. They are machine-gated only inside the isolated exercise
   until the separate producer adoption lands.
4. **The new rule's contractual blind spot.** `guidance.self-description.version-mismatch`
   is scoped to the frontmatter `description` by contract. Body prose, files
   without frontmatter, and the documentation projection remain reachable only
   by human re-read, and this release does not change that.
5. **The out-of-window stepping-stone refusal was verified by source and table
   agreement, not by end-to-end execution.** The in-window refusal was executed.
6. **Publication-time behaviour is unproven.** The recommendation still selects
   NKF 0.71, the consumer-adoption exercise is red until publication, and the
   version-label and guidance-review verifiers become no-ops for 0.8 once it is
   published and therefore frozen.
