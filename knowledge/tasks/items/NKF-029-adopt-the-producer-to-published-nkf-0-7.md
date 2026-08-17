---
title: "NKF-029: Adopt The Producer To Published NKF 0.7"
summary: Record the branch-published NKF 0.7 release as evidence, promote the recommendation to it, and perform the live post-publication producer promotion through the ordinary public Adopt operation, reconciling the root record, front page, and current-system Realization to the promoted reality, delivered as one stacked pull request while both merges remain the Human Product Owner's acts.
created_at: 2026-08-17T22:30:00Z
---

# NKF-029: Adopt The Producer To Published NKF 0.7

## Human Direction

On `2026-08-17`, after
[NKF-028](NKF-028-release-nkf-0-7-with-verifiable-delta-review.md) delivered
the technically confirmed NKF 0.7 candidate on pull request 10, the Human
Product Owner directed this work verbatim: "alright, i think let's make
another PR , and base it on this one and adopt NKF to 0.7 ." Asked whether
the release should be published under that authorization, the Human Product
Owner answered verbatim: "yes, but do not merge 0.7 to master.  only publish
it from the branch . can you do that ?" and selected stacking the new pull
request on pull request 10. This direction explicitly creates this Task and
begins its work.

The confirmed boundaries:

1. NKF 0.7 publishes from the `task/NKF-028` branch at the confirmed release
   commit; `master` is not merged first and carries nothing until the Human
   Product Owner merges.
2. This Task's complete lifecycle is carried on the `task/NKF-029` branch,
   based on `task/NKF-028`, and one stacked pull request delivers the
   complete producer adoption for human review.
3. Merging both pull requests remains the Human Product Owner's act, as does
   any change of repository or release visibility.
4. The Human Product Owner remains authority for every Product boundary. The
   Claude technical reviewer is delegated to perform the publication
   mechanics, evidence recording, recommendation promotion, live promotion,
   reconciliations, tests, and audits where they faithfully implement the
   confirmed boundaries. Any new or changed Product meaning returns to the
   Human Product Owner.

## Problem

NKF 0.7 is complete, technically confirmed by
[ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md),
and published, but no repository has adopted it — including this one. The
producer still declares, pins, and gates NKF 0.6; the recommendation still
selects the published 0.6 release; and the root record, front page, and
[current-system Realization](../../realizations/current-system.md) truthfully
describe the pre-promotion state. Until the live post-publication promotion
runs, the delivered 0.7 reality exists only in the confirmed archive and the
isolated exercise evidence.

## Desired Outcome

The producer is the first adopter of published NKF 0.7 through the ordinary
public Adopt operation: the publication is recorded as evidence with
re-download verification, the recommendation selects the published 0.7
release and passes the fail-closed verification, the live promotion reaches
its verified terminal state with the complete gate green, and the governed
record states the promoted reality.

## Scope

1. Record the NKF 0.7 publication as Evidence: the exact tag, target release
   commit, publication timestamp, asset size, and the re-download digest
   verification against the bytes confirmed by
   [ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md).
2. Promote `release/recommended.json` to the published 0.7 release, exactly
   matching the Decision-bound recommended-release binding registry.
3. Perform the live post-publication producer promotion via the public Adopt
   of the published release with explicit repository-owner breaking approval
   and the required review completed under the recorded delegation.
4. Reconcile the root record, front page, and current-system Realization to
   the promoted reality as governed edits.
5. Update test-harness materialization where the promoted live tree changes
   its preconditions.

## Out Of Scope

- Merging either pull request, changing repository or release visibility,
  and any recommendation beyond the published 0.7 release.
- Any change to accepted NKF 0.7 meaning, the confirmed archive, or the
  published bytes.
- External-consumer adoption.

## Execution Plan

1. Publication evidence: author the Evidence document recording the
   publication facts and the re-download verification, register it, and gate.
2. Recommendation: write the published 0.7 catalog to
   `release/recommended.json` and prove it against the registry-driven
   recommended-release verification.
3. Live promotion: run the ordinary public Adopt of the published release
   against the live tree with `--accept-breaking repository-owner`, complete
   the promotion review under the recorded delegation, rerun to the
   promoted terminal state, and verify a repeat Adopt returns `current`.
4. Reconciliations: root record, front page, Realization, and any harness
   preconditions the promoted tree changes; complete gate and full suite.
5. Close this Task, push `task/NKF-029`, and open the stacked pull request
   based on `task/NKF-028`; stop before any merge.

## Acceptance Criteria

- The published release asset re-downloads to exactly the confirmed archive
  digest, targeted at the confirmed release commit, recorded as Evidence.
- The recommendation selects published NKF 0.7 and the fail-closed
  recommended-release verification passes without any code edit.
- The live producer is promoted: the pin and bundle declare 0.7, the
  identity succession and neutral paths are applied, the promoted terminal
  state verifies, and the complete gate passes including readiness.
- A repeat public Adopt returns `current` and preserves the host-superset
  integration.
- The root record, front page, and current-system Realization state the
  promoted reality truthfully.
- The full test suite passes, the stacked pull request is ready for review,
  and `master` is untouched.

## Current Progress

On `2026-08-17`, under the Human Direction above, NKF 0.7 was published from
the `task/NKF-028` branch before this Task's branch work began: tag
`release-sha256-c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f`
at release commit `e5b265e87da6c12b73b4749f8d24b41b996cc77a`, private
prerelease, published `2026-08-17T10:30:39Z`, with the prepared release
notes as the publication body. The re-downloaded asset verified byte-exact
against the confirmed digest. This Task records that act as Evidence and
performs everything after it.

## Completion Result

NKF is adopted to published NKF 0.7. The publication from the concluded
release branch is recorded with re-download verification in the
[publication Evidence](../../evidence/release/nkf-029-nkf-0-7-publication.md):
the published asset hashes to exactly the archive digest bound by
[ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md) at
exactly the confirmed release commit, and `master` was deliberately not
merged first. The governed recommendation selects the published release and
the registry-driven recommended-release verification passes with no code
edit — the criterion delivered by the whole-line audit correction proved
itself at this publication. The live promotion ran the ordinary public Adopt
of the published release with explicit repository-owner breaking approval:
it verified the downloaded archive, applied the governed identity succession
and the one deliberate stable-path neutralization, created the native
accepted [0.7 Specification record](../../specifications/nkf-0.7.md),
performed the deliberate last whole-root review this lineage requires — two
hundred ninety-one re-affirmed roles and twelve fresh judgments under the
recorded delegation — returned `updated`, and returned `current` on repeat
with the host-superset integration preserved. The root record, front page,
and [current-system Realization](../../realizations/current-system.md) state
the promoted reality, with the root record gaining its native envelope on
its first native edit. The reconciliation's two-record graph delta was
sealed through the first ordinary live delta review: three hundred one
judgments carried by digest identity under the accepted version delta and
declared judgment dependencies, exactly two performed fresh — the delivered
0.7 headline mechanism operating on its own producer. The complete gate
passes with empty diagnostics and equal baseline and candidate graph
revisions, and the full suite passes two hundred twenty-eight tests. The
stacked pull request is ready for review; merging it and its base remains
the Human Product Owner's act.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit Human Product Owner exception. |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The published archive carries the complete versioned set; the post-action adoption state receives its own verification. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | The promotion, repin, and transition mechanics own closed mechanics only and never supply meaning; reviews and reconciliations carry the meaning. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic review and confirmed direction precede mechanics; checker success resolves no open uncertainty. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The `task/NKF-029` branch carries this Task's whole life and merges only concluded; merging stays the human review act. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | The live promotion uses the one public subcommand-free Adopt operation against the immutable published recommendation with explicit breaking-compatibility approval. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication permanently froze every complete-set member; ordinary public self-adoption is its own proof, and the producer gate remains a verified host superset. |
| [`adr-0125`](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md) | record | Exact NKF 0.6 revision 3 is the release authority this promotion migrates away from; its published archive remains the immutable stepping stone. |
| [`adr-0128`](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md) | record | The accepted NKF 0.7 authority set governs the promoted state; the promotion binds exactly its accepted digests. |
| [`adr-0129`](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md) | record | Only the exact confirmed bytes may publish and be adopted; any deviation invalidates the confirmation and requires a fresh candidate. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| The published asset re-downloads to the confirmed archive digest at the confirmed release commit | proven | data-validity | none |
| The recommendation catalog passes the fail-closed registry-driven verification | proven | runtime-behaviour | none |
| The live promotion reaches its verified terminal state with the complete gate green | proven | runtime-behaviour | none |
| A repeat public Adopt returns `current` with the host-superset integration preserved | proven | runtime-behaviour | none |
| The governed record states the promoted reality truthfully | proven | data-validity | none |
