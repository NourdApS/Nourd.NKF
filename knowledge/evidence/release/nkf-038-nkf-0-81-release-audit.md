---
title: NKF-038 NKF 0.81 Release Audit
summary: Records the fresh independent release audit of the exact NKF 0.81 candidate archive and its isolated producer exercise under release-protocol step six — each round's exact subject and verdict, every finding with its repair or disposition, and what each round verified — as the Evidence the mandatory technical-confirmation Decision binds.
created_at: 2026-09-09T06:00:00Z
---

# NKF-038 NKF 0.81 Release Audit

Under
[NKF-038](../../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
the exact NKF 0.81 release candidate receives the fresh independent audit
[ADR 0094](../../decisions/0094-carry-the-set-and-audit-independently.md)
requires and that release-protocol step six defines. Each round is performed by
a separate Claude agent instance with no part in producing the candidate,
working read-only against the release commit and building only in a clean
clone, under the whole-set coverage standard: reproduce the archive, reconcile
every member and digest, verify the guidance review's coverage, execute every
new rule and refusal through the shipped checker and adopter rather than
reading it, reproduce the complete gate, and read the reconciled record for
claims the tree does not support.

## Round One — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `c7d10aa0e0ae0173197be8a5c17d7b89066e0362` (`task/NKF-038`, clean before and after) |
| Audited archive | SHA-256 `9520f1b4bd69e3be9eec8bcc9fc50be94b364561f6a9412e9f393eb26be28612`, 142 entries |
| Verdict | Not clean: two blocking findings, seven should-fix, six notes |

The auditor recomputed the archive digest and rebuilt the archive
byte-identically from a clean clone at the release commit, validated the
manifest against the shipped Schema, reconciled all one hundred forty-two
declared members with their modes and classes, confirmed the five accepted
artifacts carry exactly the
[ADR 0140](../../decisions/0140-accept-the-nkf-0-81-authority-set.md) digests
in tree and archive, derived the twelve guidance members from the release set
by class and recomputed every recorded digest, read all nine distinct byte sets
in full, checked the one hundred thirty remaining members for version literals,
compared every member of the published 0.8 archive to the tree and found the
0.8 bytes and the 0.8 catalog untouched, executed the closure recompute rule
positively and negatively through the shipped checker, exercised the
stepping-stone refusal, the historical-channel refusal, the noncanonical-URL
refusal, the complete 0.8-to-0.81 update, and the volatile registry's edge
behaviour through the shipped adopter, and reproduced the gate in the clone.

## Round One Blocking Findings And Repairs

**The complete gate did not pass at the release commit.** The commit that
rebound the strict-mode catalog Schema digest changed one line of
`scripts/release/config.mjs` without repinning its governed-artifact
declaration, so `validate:self` and the pinned check each reported one
`artifact.digest-mismatch`. The release packaging ran `npm run check`, which
does not include `validate:self`, which is why the cut succeeded. The
declaration is repinned; the candidate is re-cut because the manifest binds the
release commit.

**A shipped projection member stated the live window falsely.** The projection
README's Current Boundaries section read "NKF 0.8 and older versions are
immutable published history" one sentence after stating that live support is
NKF 0.81 plus NKF 0.8 — the hand-slide defect the guidance review had found in
two guides and missed in the third hand-authored member it claimed to have read
in full. It now reads "NKF 0.71 and older", and the
[guidance review](nkf-038-nkf-0-81-guidance-review.md) records the miss.

## Round One Should-Fix Findings And Repairs

| Finding | Repair |
| --- | --- |
| The Realization stated a typed link count that did not match the tree | The sentence states that every checked living link resolves, and no count |
| The guidance review said its enumeration is what the adopter's `set` command emits, which is true only for a repository declaring 0.81; this producer's `set` emits the 0.8 set | The review says where the list came from and what `set` emits here |
| The distributed authoring and adoption protocols stated the delta-claim condition NKF 0.8 knew and not the 0.81 recompute | The generator gained a version-gated region; both protocols state the recompute condition in their 0.81 emission while the adopted 0.8 root keeps the 0.8 sentence, and the generation suite proves the gate |
| Release packaging accepted a personal fork as the origin remote | Only `https://github.com/NourdApS/Nourd.NKF.git` is accepted |
| The checker's command-line entry named the 0.8 contract root to derive the repository root | It names the 0.81 root; dispatch by the declared version is unchanged |
| The Realization listed `migrated` among Adopt's outcomes although no 0.81 compatibility entry is breaking | The Realization states three reachable outcomes and why `migrated` is unreachable at 0.81 |
| The Task's progress said the completed adopter work was verified by the complete suite while the gate failed at the release commit | The progress records the round-one findings and the gate state at each cut |

## Round One Notes And Dispositions

- The shipped checker alone, on a 0.8 fixture, reports the 0.8 contract set
  unavailable, because the archive ships only the 0.81 set; beside the
  repository's 0.8 contracts the same bytes validate both 0.8 fixtures ready.
  The Realization now says dispatch reaches a version whose contract set is
  present and that a consumer install carries only the 0.81 set.
- The adopter's five Github CLI invocations are all in the producer's Git
  transition orchestration; none is on the adoption path, whose only network
  is Node's fetch against the default-branch catalog URL and the canonical
  release asset URL. Recorded; no change.
- The 0.8 tree is not re-derived by the generation check; the auditor verified
  the 0.8 bytes against the published archive directly, which is the control
  that applies to a frozen version. Recorded; no change.
- The release protocol's second precondition names the Human Product Owner as
  acceptor while ADR 0140 records delegated acceptance. Already recorded by the
  guidance review for the successor.
- The latest validation result is gitignored and absent from a fresh clone;
  the Realization describes it as an operational file. Recorded; no change.
- Every non-0.81 version literal in the one hundred thirty non-guidance
  members is a deliberate predecessor reference, and the guides'
  stepping-stone digests equal the adopter's constants. Recorded.

## Round One Verified And Passed

The archive digest, member count, byte-identical rebuild, manifest validity and
digests, class and mode agreement, and the five accepted digests; the
Specification mirror and the public adopter copy byte-identical to their
sources; all twelve guidance digests and every count in the guidance review;
the 0.81 and 0.8 generation checks; all one hundred forty-one members of the
published 0.8 archive identical to the tree; the unchanged 0.8 catalog and
producer pin; both 0.81 fixtures passed and ready with zero diagnostics under
the shipped checker; the closure recompute refusal naming the omitted
propagated subject and its admission with the complete closure, and the same
narrow claim admitted under a 0.8 bundle; all two hundred seventeen rule
identifiers present in the checker source and bundle; the 0.71 stepping-stone
refusal naming the published 0.8 archive; the historical-channel,
schema-invalid, and noncanonical-URL refusals before mutation; the complete
0.8-to-0.81 update to `updated` and `current` at integration revision five with
the upgraded project ready under the shipped checker; the volatile registry
tolerating rewritten, deleted, and added registered files at any depth while a
changed regular file, a directory or symbolic link with a registered name, and
a near-miss name each stale the plan; the typecheck, twenty-nine test files and
two hundred seventy-nine tests, build, adopter, public-projection, third-party,
guidance-review, version-label, and link verifiers; the absence of
`realizations/items/` and the retirement Evidence's ten digests equal to the
files' last committed bytes; and the judgment that the set realizes exactly the
seven adopted boundaries with the ten retirements and nothing else.

## Resulting State

Round one's two blocking findings and seven should-fix findings are repaired
and every note is recorded with its disposition. Because the repairs change
release-set member bytes and the manifest binds the release commit, the
candidate is re-cut from the repaired commit, re-exercised, and re-audited
before any technical-confirmation Decision. This Evidence confirms nothing; the
mandatory audit-bound confirmation is the separate Decision that follows a
clean round.
