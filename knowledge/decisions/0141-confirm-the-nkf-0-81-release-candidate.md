---
id: adr-0141
type: decision
title: "ADR 0141: Confirm The NKF 0.81 Release Candidate"
summary: Technically confirm the exact NKF 0.81 release candidate — the content-addressed archive at its clean release commit with its checker and adopter digests — bound to four independent release audit rounds whose fourth found the delivery clean, after its isolated exact-producer exercise proved the non-breaking 0.8-to-0.81 promotion on the digest-bound delta claim alone, without authorizing publication, recommendation, promotion, or the merge.
created_at: 2026-09-09T11:05:00Z
---

# ADR 0141: Confirm The NKF 0.81 Release Candidate

## Context And Problem

The accepted release order requires one technical-confirmation Decision as a
post-audit, outside-the-archive governance record between the independent audit
of the exact candidate and any separately authorized publication. The NKF 0.81
candidate delivered under
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
derives from the authority set
[ADR 0140](0140-accept-the-nkf-0-81-authority-set.md) accepted, realizes the
seven boundaries
[ADR 0138](0138-adopt-the-nkf-0-81-public-adoption-direction.md) and
[ADR 0139](0139-adopt-the-delta-closure-propagation-repair.md) adopted, has
passed its isolated exact-candidate exercise at every cut, and has been audited
independently four times.

The audit history is part of what this Decision confirms. Round one found the
cut commit failing its own gate on an unrepinned declaration and a shipped
projection member stating the window falsely. Round two, performed by three
divided instances, found no blocking defect and seven should-fix findings, three
of them in shipped mechanics no rule had reached: a review left at its template
placeholders sealed, catalog facts about the archive were never reconciled with
it, and the onboarding drift refusal named nothing. Round three found no
blocking defect and five should-fix findings, one of them the blank-value gap
left by the placeholder repair. Round four found the delivery **clean with zero
blocking and zero should-fix findings** after exercising every repair through
the archive's own adopter, rebuilding the archive byte-identically, and reading
the record. Every round's findings, repairs, and dispositions are recorded in
the
[release audit Evidence](../evidence/release/nkf-038-nkf-0-81-release-audit.md);
the whole-set guidance review it verified is the
[guidance review Evidence](../evidence/release/nkf-038-nkf-0-81-guidance-review.md).

## Decision

Technically confirm the exact NKF 0.81 release candidate:

| Binding | Value |
| --- | --- |
| Release commit | `aeb95db5fc52b7fd916eb528fa0ce49f8fa3ad80` |
| Archive SHA-256 | `e36ef44b53c88cfd0cd22093eca9507416eb54d575289a96e30d81227d5c88ea` |
| Release tag | `release-sha256-e36ef44b53c88cfd0cd22093eca9507416eb54d575289a96e30d81227d5c88ea` |
| Checker SHA-256 | `f2fe706353ebba7737f2d280cb65f60ec1ea0feb9eef1456644668b41d03c59c` |
| Adopter SHA-256 | `1ffcf550e05b27bb49584616e455f188c660888c12b464afc214a439220e625f` |
| Release set | 142 members, 141 source members reproduced |
| Live window at publication | NKF 0.81 plus NKF 0.8 |

The release commit records the clean fourth round and changes no release-set
member byte, so the confirmed archive differs from the fourth round's audited
archive `2e617fcf...be97f` only in the release commit its manifest names — the
same relation NKF 0.8's confirmed archive had to its final audited round.

The candidate passed its isolated exact-candidate exercise at every cut: first
Adopt `updated`, repeat Adopt `current`, host-superset integration preserved at
revision five, the complete producer gate green inside the promoted copy, and
every source member reproduced. The producer promotion is proven through the
digest-bound delta claim alone — three hundred twelve judgments carried by
digest identity under the accepted 0.8-to-0.81 version-delta declaration, and
exactly thirty-four fresh judgments equal to the closure the evaluation
policy's impact propagation computes: the knowledge this Task authored, the
Evidence it produced, and the accepted Decisions its rewritten Realization
realizes.

## Scope And Applicability

This confirmation applies to the exact bytes named above and to nothing else.
It governs the technical readiness of that candidate for a separately
authorized publication decision. It does not reach the meaning NKF 0.81
governs, any consumer's knowledge, or any later commit; a change to any release
member re-cuts, re-exercises, and re-audits the candidate before a new
confirmation.

## Rationale

The release protocol has made the audit-bound confirmation mandatory before
publication, with no waiver, since NKF 0.7. Four rounds reproduced the archive
byte-identically from clean clones, reconciled every declared member and binding
digest, verified that the guidance review covered the whole set with each
recorded digest equal to the reviewed bytes, executed the closure recompute,
the catalog refusals, the plain-HTTPS path, the volatile registry, and the
0.8-to-0.81 update through the shipped checker and adopter rather than reading
them, and reproduced the complete gate. The exercise proved the promotion path
this release exists for.

The findings after round one were in the hand-maintained record, in the
projection members the generator does not own, and in mechanics no rule
reached, and each was closed by a mechanism rather than a sentence: the seal
refuses placeholders and blank values, every acquired archive is reconciled
against the catalog that selected it, the drift refusal names its entries, the
generator gates a sentence by version and checks every emitted tree, and the
release packaging accepts one origin. Confirming after the fourth round rather
than the second is the cost of finding those in audit instead of in a consumer.

## Alternatives Considered

Confirming without an independent audit was rejected as the protocol forbids
it. Confirming the audited archive of round four rather than the archive cut
from the commit that records that round was rejected: the manifest binds the
release commit, and the confirmed bytes must be reproducible from a commit
whose tree contains the audit that clears them, as for NKF 0.8. Publishing
first and recording the confirmation afterwards, the NKF 0.6 exception, was
rejected; the 0.7 order is the order.

## Consequences And Trade-Offs

The exact NKF 0.81 candidate is technically confirmed and may be published as a
public prerelease by the Human Product Owner under the accepted channel
`public-github-prerelease`. Until that act the catalog keeps recommending
NKF 0.8 with its historical channel literal, this producer keeps declaring 0.8,
and live support stays 0.8 plus 0.71. Publication freezes the set permanently;
a defect found after any consumer adopts it is fixed in a new version. The
matters recorded for a successor — a channel the pin cannot corroborate, a
projection still edited by hand, a release-protocol precondition that predates
delegated acceptance — remain recorded, not resolved.

## Non-Claims

This Decision confirms bytes, not meaning. It accepts no knowledge, confirms
no Realization, establishes no consumer's conformance, publishes nothing,
recommends nothing, promotes no producer, merges no branch, and concludes no
Task. The Human Product Owner's publication, recommendation, promotion, and
merge remain separate acts recorded separately when performed.
