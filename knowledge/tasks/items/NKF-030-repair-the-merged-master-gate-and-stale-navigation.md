---
title: "NKF-030: Repair The Merged Master Gate And Stale Navigation"
summary: Repair the repository-side findings of the whole-NKF master audit — the merge-state-dependent producer-rehearsal test, the one-step-stale sealed baseline, and the stale navigation and currency prose — restoring a green gate on the merged default branch, while the accepted-specification findings remain explicitly deferred to the NKF 0.71 successor.
created_at: 2026-08-17T23:50:00Z
---

# NKF-030: Repair The Merged Master Gate And Stale Navigation

## Human Direction

On `2026-08-17`, after merging the NKF 0.7 release and adoption pull
requests, the Human Product Owner directed a fresh independent audit of the
whole repository at `master`, including a fitness review of the accepted
NKF 0.7 Specification. After receiving the audit's findings and a staged
repair proposal, the Human Product Owner directed verbatim: "the next
version would be 0.71 . first give me a prompt for version 0.71 ( to start
in a new chat session ) and after that i want you to take care of Stage 1 .
i will wait for Stage 1 to finish before starting the 0.71". This Task is
that Stage 1; its creation and work are directly authorized by that
direction.

The confirmed boundaries:

1. This Task repairs only repository-side findings. Every finding inside
   the accepted NKF 0.7 Specification or the frozen published bytes — the
   topology self-contradiction, the version-label errors, the close-and-seal
   ordering design gap, and the predecessor-era public-documentation
   projection — is explicitly deferred to the separately directed NKF 0.71
   successor version.
2. This Task's lifecycle is carried on the `task/NKF-030` branch from
   `master`, delivered as one pull request; merging remains the Human
   Product Owner's act.
3. The Human Product Owner remains authority for every Product boundary.
   The Claude technical reviewer is delegated to record the audit as
   Evidence and perform the repairs, reconciliations, reviews, and tests
   where they faithfully implement the confirmed boundaries.

## Problem

The whole-NKF master audit found the merged default branch failing its own
canonical gate and carrying stale prose the reviews had nominally covered:

- The producer-rehearsal test materializes "the live NKF 0.6 producer"
  from the merge base of `master` and `HEAD`, which after the merges is the
  promoted 0.7 producer itself, so the rehearsal's premise self-invalidates
  and `npm run nkf:check`, the full suite, and the `NKF Contracts` workflow
  are red on `master`.
- The deterministic close of
  [NKF-029](NKF-029-adopt-the-producer-to-published-nkf-0-7.md) changed the
  knowledge graph after that Task's final seal, so the sealed baseline is
  one mechanical step behind
  `master`'s graph and readiness cannot be `ready`.
- The front page's Start Here section routes readers to the predecessor
  Specification and the frozen NKF 0.2 adoption protocol; the
  specifications index asserts superseded producer states in the present
  tense; the Tasks front page lists the completed adoption Task as active;
  the current-system Realization presents the frozen 0.2 process roots as
  current process sources; and the Evidence index stops before the 0.7
  release evidence.

## Desired Outcome

The merged default branch passes its complete gate, suite, and workflow;
the sealed baseline binds `master`'s exact graph; every navigation and
currency claim states the promoted reality; and the audit that found these
defects is preserved as governed Evidence.

## Scope

1. Record the whole-NKF master audit — its subject, scope, verdicts,
   findings, and specification-fitness judgment — as governed Evidence.
2. Repair the producer-rehearsal test to materialize the exact 0.6
   producer from a merge-state-independent coordinate, mirroring the
   proven pinned-release-commit materialization the promotion rehearsal
   already uses.
3. Reseal the baseline over the close delta through the ordinary
   digest-bound delta review.
4. Reconcile the stale surfaces: the front page Start Here section, the
   specifications index, the Tasks front page, the current-system
   Realization's process-source row, and the Evidence index.
5. Conclude with the complete gate and full suite green, and deliver one
   pull request; because the deterministic close itself moves the graph, a
   final mechanical reseal commit follows the close on the same branch so
   the delivered tip carries equal baseline and candidate graph revisions.

## Out Of Scope

- Any change to accepted NKF meaning, the frozen 0.7 Specification, the
  confirmed archive, or the published bytes — all deferred to NKF 0.71.
- Removing the frozen predecessor process sources or predecessor
  distribution trees from the working tree — deferred to NKF 0.71 with its
  release-tooling review.
- Merging, publication, recommendation, and visibility changes.

## Acceptance Criteria

- The audit Evidence exists, is registered, and states the findings and
  their disposition truthfully.
- `npm run nkf:check` and the full test suite pass on the delivered branch
  tip, and the producer-rehearsal test passes regardless of merge state.
- The delivered branch tip's sealed baseline graph revision equals its
  candidate graph revision.
- No navigation or currency surface asserts a superseded producer state:
  Start Here names the 0.7 authority and the 0.7 adoption protocol, the
  specifications index states the promoted reality, the Tasks front page
  agrees with the declared Task states, the Realization names the frozen
  0.2 process roots as history, and the Evidence index covers the 0.7
  release evidence.
- One pull request delivers the Task; `master` is untouched until the
  Human Product Owner merges.

## Current Progress

Created and begun on `2026-08-17` under the Human Direction above,
immediately after the audit report was received.

## Completion Result

The merged default branch's defects are repaired and the audit that found
them is preserved as the
[whole-NKF master audit Evidence](../../evidence/audits/nkf-030-whole-nkf-master-audit.md).
The producer-rehearsal test materializes the exact ordinary 0.6 producer
from an immutable historical commit — never the merge base and never the
candidate-carrying pre-promotion tree — so it passes identically on task
branches and on the merged default branch, and the complete gate and full
suite of two hundred twenty-eight tests pass. The baseline is resealed over
the [NKF-029](NKF-029-adopt-the-producer-to-published-nkf-0-7.md) close
delta and over this Task's own authoring through ordinary digest-bound
delta reviews, and the delivered tip carries equal baseline and candidate
graph revisions, restored after the deterministic close by the final
mechanical reseal commit this Task's scope declares. Every audited
navigation and currency surface states the promoted reality: Start Here
names the 0.7 authority and the shipped 0.7 adoption protocol, the
specifications index records 0.7 as the current adopted authority and its
predecessors as history, the Tasks front page agrees with the declared
states, the Evidence index covers the complete 0.7 release evidence, and
the current-system Realization names the frozen 0.2 process roots as
history. The corrected adoption-Task close carries its correction
paragraph. The accepted-specification findings — the topology self-contradiction, the version-label
errors, the close-and-seal ordering gap, and the predecessor-era public
documentation projection — remain explicitly deferred to the separately
directed NKF 0.71 successor. One pull request delivers this Task; merging
remains the Human Product Owner's act.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit Human Product Owner exception. |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The post-adoption state received its fresh independent audit; this Task records that audit as Evidence and repairs its repository-side findings. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | Repin, review scaffolding, sealing, and the Task transition own closed mechanics only; the reviews and reconciliations carry the meaning. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic review and confirmed direction precede mechanics; checker success resolves no open uncertainty. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The `task/NKF-030` branch carries this Task's whole life and merges only concluded; merging stays the human review act. |
| [`adr-0128`](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md) | record | The accepted 0.7 authority governs every repair; no accepted byte changes, and the specification findings defer to the governed 0.71 successor. |
| [`adr-0129`](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md) | record | The confirmed and published bytes stay untouched; repairs live outside the frozen release set. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| The producer-rehearsal test passes on the merged default branch and on task branches | proven | runtime-behaviour | none |
| The delivered tip's baseline graph revision equals its candidate graph revision | proven | runtime-behaviour | none |
| The complete gate and full suite pass on the delivered tip | proven | runtime-behaviour | none |
| No navigation or currency surface asserts a superseded producer state | proven | data-validity | none |
