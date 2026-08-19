---
title: NKF-035 NKF 0.8 Producer Adoption
summary: Records the live post-publication producer self-adoption of NKF 0.8 through the ordinary public Adopt operation — the verified pin, the promotion proven on the digest-bound delta claim, the activated verifier chain, and the honest finding that two of the three activated verifiers are cut-time controls that report nothing once the version they check is published.
created_at: 2026-08-19T16:30:00Z
---

# NKF-035 NKF 0.8 Producer Adoption

This records the live producer self-adoption of published NKF 0.8 under
[NKF-035](../../tasks/items/NKF-035-adopt-the-producer-to-published-nkf-0-8.md).
It is Evidence of an operational act. It accepts no meaning and confirms no
Realization.

## The Adopted State

| Fact | Value |
| --- | --- |
| Declared version | NKF 0.8 |
| Pinned archive | `2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5` |
| Pinned adopter | `5e3288081d75e7ab9914f56498c3157e85be7ede7f89477f111fd09007d58d85` |
| Pinned checker | `52d491cc25da898444bf33568e92b058fca4559fd1863902ad48504899d5985a` |
| Integration | `host-superset`, accepted revision four |
| First Adopt | `updated` |
| Repeat Adopt | `current` |
| Complete gate | passed, two hundred sixty-eight of two hundred sixty-eight tests, no diagnostic |
| `verify-recommended-release` | passed |

The promotion created the native NKF 0.8 Specification record from the candidate
Evidence representation, which the bundle no longer carries. The post-promotion
delta review carried three hundred thirty-one judgments by digest identity and
performed two: the NKF-035 Task as context, and the promoted Specification as
governing. A live producer promotion proven on the digest-bound delta claim
alone is what the accepted 0.71-to-0.8 delta predicted.

## What Adoption Actually Activated

The purpose of this Task was to make the three NKF 0.8 guidance verifiers run
in this repository's own gate rather than only inside the isolated candidate
exercise. They now run. What each one checks is not the same, and the
difference is recorded rather than smoothed over.

**The guidance-generation check is live and load-bearing.** It regenerates every
emitted guidance member from the version-neutral source and compares bytes. It
did real work during this adoption: it failed the gate because the two protocol
roots emitted at the adopted version still carried NKF 0.71, and it passed only
after they were restamped. That is the check working on the live repository, on
the first day it was able to.

**The version-label and guidance-review checks report zero.** Both skip members
frozen by publication, and publishing NKF 0.8 froze every 0.8 member, so the
version-label check reports thirty-three files skipped and none checked, and the
review check reports three published versions skipped and none checked. They are
cut-time controls: they protect the *next* version at its cut, not this one
after its publication.

That is correct by design and it is also a real limit on what this adoption
proves. [ADR 0135](../../decisions/0135-confirm-the-nkf-0-8-release-candidate.md)
recorded it in advance as one of the six things the final audit declined to
vouch for, and adopting the version has now demonstrated it rather than
predicted it.

## Two Ordering Constraints Found By Doing This

Neither is a defect in the published release, and both are undocumented
consequences that the next producer adoption should not have to rediscover.

**The declared host chain must be in place before the promotion, not after.**
A repository declaring a chain that differs from its installed pin fails
`integration-check`, and every ordinary Adopt route validates the installed
state before it will change anything. So a version whose accepted chain differs
from its predecessor's can only have that chain recorded by the run that
installs it. Declaring the NKF 0.8 chain after the promotion left the pin
holding the predecessor's chain with no ordinary route to update it; reverting
and declaring first recorded it correctly in one act.

**The adopted-version guidance must be restamped after adoption.** The two
protocol roots nothing installs are emitted at the version the repository
declares, so adopting changes what they should say. The isolated candidate
exercise already performed this step, and the live adoption needed it for the
same reason.

## Boundary

This Evidence records an operational act observed at one moment. It establishes
that the exact published NKF 0.8 bytes install into this producer, that the
promotion is admissible on the digest-bound delta claim, and that the complete
gate passes under the accepted NKF 0.8 chain. It establishes nothing about
NKF 0.8's meaning, which
[ADR 0134](../../decisions/0134-accept-the-nkf-0-8-authority-set.md) accepted,
and it does not confirm a Realization.
