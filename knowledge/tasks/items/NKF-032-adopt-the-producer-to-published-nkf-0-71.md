---
title: "NKF-032: Adopt The Producer To Published NKF 0.71"
summary: Publish the technically confirmed NKF 0.71 release from the concluded release branch, record the publication as evidence with re-download verification, promote the governed recommendation to it, perform the live post-publication producer promotion through the ordinary public Adopt — the first live promotion proven through the digest-bound delta claim alone — and reconcile the governed record to the promoted reality, delivered as one stacked pull request while both merges remain the Human Product Owner's acts.
created_at: 2026-08-18T03:20:00Z
---

# NKF-032: Adopt The Producer To Published NKF 0.71

## Human Direction

On `2026-08-17`, during the
[NKF-031](NKF-031-release-the-corrective-nkf-0-71.md) planning session, the
Human Product Owner directed verbatim: "after finishing with NKF 0.71 and
auditing it separately, you are authorized to adopt NKF itself to 0.71 in a
separate PR which is based on the NKF 0.71 PR ." Both stated conditions are
satisfied on the record: NKF 0.71 is finished — delivered, exercised, and
technically confirmed by
[ADR 0132](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md)
— and it was audited separately twice, by the two-round
[independent authority audit](../../evidence/audits/nkf-031-nkf-0-71-independent-authority-audit.md)
and the clean independent
[release audit](../../evidence/release/nkf-031-nkf-0-71-release-audit.md).
This standing direction explicitly creates this Task and begins its work,
mirroring the
[NKF-029](NKF-029-adopt-the-producer-to-published-nkf-0-7.md) pattern the
direction references.

The confirmed boundaries:

1. NKF 0.71 publishes from this branch at the confirmed release commit;
   `master` carries nothing until the Human Product Owner merges.
2. This Task's complete lifecycle is carried on the `task/NKF-032` branch,
   based on `task/NKF-031`, and one stacked pull request delivers the
   complete producer adoption for human review.
3. Merging both pull requests remains the Human Product Owner's act, as
   does any change of repository or release visibility.
4. The Human Product Owner remains authority for every Product boundary.
   The Claude technical reviewer is delegated to perform the publication
   mechanics, evidence recording, recommendation promotion, live promotion,
   reconciliations, and tests where they faithfully implement the confirmed
   boundaries. Any new or changed Product meaning returns to the Human
   Product Owner.

## Problem

NKF 0.71 is complete, technically confirmed by
[ADR 0132](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md),
and unpublished; no repository has adopted it, including this one. The
producer still declares, pins, and gates NKF 0.7; the recommendation still
selects the published 0.7 release; and the root record, front page, and
[current-system Realization](../../realizations/current-system.md) describe
the pre-promotion state. Until the live post-publication promotion runs,
the delivered 0.71 reality exists only in the confirmed archive and the
isolated exercise evidence.

## Desired Outcome

The producer is the first adopter of published NKF 0.71 through the
ordinary public Adopt operation: the publication is recorded as evidence
with re-download verification, the recommendation selects the published
0.71 release and passes the fail-closed registry-driven verification, the
live promotion reaches its verified terminal state through the first live
delta-claim-proven promotion with the complete gate green, and the governed
record states the promoted reality.

## Scope

1. Publish the exact confirmed archive from this branch: the
   content-addressed release tag, the verified asset, and the prepared
   release-notes body; record the publication as Evidence with the
   re-download digest verification against the bytes confirmed by
   [ADR 0132](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md).
2. Promote `release/recommended.json` to the published 0.71 release,
   exactly matching the Decision-bound recommended-release binding
   registry.
3. Perform the live post-publication producer promotion via the public
   Adopt of the published release, completing the required delta-stage
   review under the recorded delegation — the first live promotion in this
   lineage proven through the digest-bound delta claim alone.
4. Reconcile the root record, front page, and current-system Realization to
   the promoted reality as governed edits, updating test-harness
   materialization where the promoted live tree changes its preconditions.
5. Conclude this Task through the deterministic close under the newly
   installed 0.71 adopter — the first live seal-completing conclusion, with
   no post-close reseal — and deliver the stacked pull request.

## Out Of Scope

- Merging either pull request, changing repository or release visibility,
  and any recommendation beyond the published 0.71 release.
- Any change to accepted NKF 0.71 meaning, the confirmed archive, or the
  published bytes.
- External-consumer adoption.

## Execution Plan

1. Create this Task on the `task/NKF-032` branch with its gate and recorded
   delegation, register it, seal the delta, validate, and commit.
2. Publish the confirmed archive from the branch and record the publication
   Evidence with re-download verification; promote the recommendation and
   prove it against the registry-driven verification.
3. Run the ordinary public Adopt of the published release against the live
   tree, complete the delta-stage promotion review under the recorded
   delegation, rerun to the promoted terminal state, and verify a repeat
   Adopt returns `current`.
4. Reconcile the root record, front page, Realization, and any harness
   preconditions the promoted tree changes; complete gate and full suite.
5. Close this Task under the installed 0.71 adopter, verify the concluded
   tip carries equal baseline and candidate graph revisions with no
   post-close act, push `task/NKF-032`, and deliver the stacked pull
   request; stop before any merge.

## Acceptance Criteria

- The published release asset re-downloads to exactly the confirmed archive
  digest, targeted at the confirmed release commit, recorded as Evidence.
- The recommendation selects published NKF 0.71 and the fail-closed
  registry-driven verification passes without any code edit.
- The live producer is promoted: the pin and bundle declare 0.71, the
  native accepted 0.71 Specification record exists, the promoted terminal
  state verifies, and the complete gate passes including readiness — with
  the promotion review performed on the delta stage.
- A repeat public Adopt returns `current` and preserves the host-superset
  integration.
- The root record, front page, and current-system Realization state the
  promoted reality truthfully.
- This Task's deterministic close under the 0.71 adopter seals the
  mechanically-concluded successor baseline in the same transaction, and
  the delivered tip carries equal baseline and candidate graph revisions
  with no hand-orchestrated post-close act.
- The full test suite passes, the stacked pull request is ready for review,
  and `master` is untouched.

## Current Progress

Created and begun on `2026-08-18` under the standing Human Direction above,
immediately after
[NKF-031](NKF-031-release-the-corrective-nkf-0-71.md) concluded with its
pull request ready.

## Completion Result

The producer is the first adopter of published NKF 0.71. The publication
from the release branch is recorded with byte-exact re-download verification
in the [publication Evidence](../../evidence/release/nkf-032-nkf-0-71-publication.md):
the published asset hashes to exactly the archive digest bound by
[ADR 0132](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md)
at exactly the confirmed release commit, and `master` was deliberately not
merged first. The governed recommendation selects the published release and
the registry-driven verification passes with zero code edits. The live
promotion ran the ordinary public Adopt of the published release: it
verified the archive, created the native accepted
[0.71 Specification record](../../specifications/nkf-0.71.md), refreshed the
host-superset integration and the live guidance to 0.71, and sealed the
post-promotion baseline from the completed delta-stage review — the first
live promotion in this lineage proven through the digest-bound delta claim
alone, with three hundred seventeen judgments carried by digest identity and
exactly one performed fresh, discharging the bootstrap promise on the live
producer. A repeat public Adopt returns `current`. One transaction rollback
during the first promotion attempt proved the fail-closed design live: the
predecessor baseline was one node stale because the publication Evidence had
been registered without a reseal, the promotion refused before mutation, and
the ordinary review-and-seal path recovered exactly as specified. The root
record, front page, and
[current-system Realization](../../realizations/current-system.md) state the
promoted reality, and the complete gate passes green on the promoted
producer. This Task's deterministic close under the installed 0.71 adopter
is the first live seal-completing conclusion; the stacked pull request
delivers the adoption, and merging it and its base remains the Human Product
Owner's act.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit Human Product Owner exception. |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The published archive carries the complete versioned set; the post-action adoption state receives its own verification. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | The promotion, repin, and transition mechanics own closed mechanics only and never supply meaning; reviews and reconciliations carry the meaning. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic review and confirmed direction precede mechanics; checker success resolves no open uncertainty. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The `task/NKF-032` branch carries this Task's whole life and merges only concluded; merging stays the human review act. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | The live promotion uses the one public subcommand-free Adopt operation against the immutable published recommendation with truthful compatibility signaling. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication permanently freezes every complete-set member; ordinary public self-adoption is its own proof, and the producer gate remains a verified host superset. |
| [`adr-0128`](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md) | record | Exact NKF 0.7 is the release authority this promotion migrates away from; its release-authority selection is superseded at this publication and promotion exactly as [ADR 0131](../../decisions/0131-accept-the-nkf-0-71-authority-set.md) states. |
| [`adr-0131`](../../decisions/0131-accept-the-nkf-0-71-authority-set.md) | record | The accepted NKF 0.71 authority set governs the promoted state; the promotion binds exactly its accepted digests and input. |
| [`adr-0132`](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md) | record | Only the exact confirmed bytes may publish and be adopted; any deviation invalidates the confirmation and requires a fresh candidate. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| The published asset re-downloads to the confirmed archive digest at the confirmed release commit | proven | data-validity | none |
| The recommendation catalog passes the fail-closed registry-driven verification without code edits | proven | runtime-behaviour | none |
| The live promotion reaches its verified terminal state through the delta-stage review with the complete gate green | proven | runtime-behaviour | none |
| A repeat public Adopt returns `current` with the host-superset integration preserved | proven | runtime-behaviour | none |
| The governed record states the promoted reality truthfully | proven | data-validity | none |
| The deterministic close under the 0.71 adopter seals the concluded tip with equal graph revisions and no post-close act | proven | runtime-behaviour | none |
