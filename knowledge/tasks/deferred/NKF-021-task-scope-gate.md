---
title: "NKF-021: Establish The Task Scope Gate"
summary: Prevent an active Task from silently absorbing discovered work that is not necessary to satisfy an existing acceptance criterion, while preserving explicit Human Product Owner scope amendments as the bounded exception.
created_at: 2026-08-09T11:53:35Z
task_id: NKF-021
task_status: deferred
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
related_tasks:
  - NKF-019
  - NKF-020
---

# NKF-021: Establish The Task Scope Gate

## Human Direction

On `2026-08-09`, after reviewing the expansion of
[NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md),
the Human Product Owner directed creating this separate Task and beginning
work on a Task Scope Gate. The confirmed core rule is:

> New work may remain in an active Task only when it is necessary to satisfy
> an existing acceptance criterion. Otherwise it transfers to another
> confirmed Task before implementation. An explicit Human Product Owner
> scope amendment is the exception.

The gate must require newly discovered work to be classified, preserve the
receiving Task or exception provenance, and keep semantic truth with human
review. Deterministic validation may enforce structure and closed vocabulary;
it must not pretend to determine whether work is genuinely necessary.

The Human Product Owner also directed including the gate in the final NKF 0.2
set, leaving [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md)
open while this Task is developed, and returning to [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md)
afterward to finish the release, adoption, compatibility, CI, and packaging
work that it owns.

For this recovery only, `task/NKF-021` is the single exceptional branch for
the remaining NKF 0.2 work. NKF-021 and
[NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md)
retain separate scope, plans, acceptance criteria, provenance, and commits.
The exception changes only Git branch topology, ends after the final corrected
NKF 0.2 release and merge, and does not weaken acceptance, confirmation,
conformance, validation, audit, or review boundaries. The deterministic Task
command may still require a later ordinary `task/NKF-020` branch solely to
record [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md)'s
formal conclusion.

The Human Product Owner explicitly required an independent audit after
implementation. This direction authorizes creating and working on this Task;
it does not accept a Design, Decision, Specification revision, executable
contract, Realization, or release.

On `2026-08-09`, after the accepted version-sealing conflict was presented
separately, the Human Product Owner confirmed the exact one-time exception:
NKF-021 and the remaining [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md) recovery work may make one final correction
of NKF 0.2 despite this repository's self-adoption; no external NKF 0.2
adoption is known; the exception creates no precedent and ends when the final
corrected NKF 0.2 release is published and merged; every later
contract-meaning change requires a new NKF version.

Later on `2026-08-09`, before any Design adoption, Decision acceptance,
Specification revision, executable-contract change, or scope-gate
implementation, the Human Product Owner changed the release direction. This
Task is to be deferred, its Draft Design preserved for a successor NKF version,
and [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md)
resumed solely to complete and independently audit the already accepted NKF
0.2 release obligations without adding new normative meaning. The earlier
one-time 0.2 exception remains historical authorization; no normative change
was made under it.

## Problem

An active Task can currently absorb a newly discovered improvement, dependency,
or normative change merely because the finding occurred during its execution.
The Decision Applicability Gate prevents accepted constraints from being lost,
but it does not protect the Task's own scope. The result can be an overgrown
Task whose completion criteria, provenance, review boundary, and release
responsibility no longer describe one coherent job.

The history of [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md)
is the immediate evidence: work on Git transition mechanics and the cancelled
state was delivered there even though its original remaining scope was
breaking-change classification, signaling, and release-process refinement.
This Task does not rewrite that history. It establishes the safeguard for
current and future work.

## Desired Outcome

A successor NKF version can require one minimal Task Scope Gate in every Task
non-record after the Design direction and exact authority pair are separately
reviewed and accepted. The gate records each newly discovered unit of work,
classifies its relationship to the Task, and records whether it remains,
transfers to another confirmed Task, or is admitted by an explicit Human
Product Owner scope amendment.

The existing Scope and Acceptance Criteria remain the semantic authority for
the Task. The new gate is a provenance-bearing control around changes to that
boundary, not a duplicate scope description and not an automated judge of
meaning.

## Scope

- define the smallest closed classification and disposition model that
  enforces the confirmed core rule;
- compare a compact finding ledger with heavier alternatives and reject
  duplicate scope or workflow state;
- define how an empty gate, a transferred finding, and a Human Product Owner
  scope amendment are represented;
- define retrospective migration for existing Tasks without fabricating that
  the gate existed historically;
- obtain Human Product Owner adoption and exact-revision acceptance before any
  successor-version normative change;
- derive the executable companion, Schemas, checker behavior, diagnostics,
  fixtures, examples, onboarding, migration, authoring guidance, tests, and
  documentation from accepted meaning;
- migrate this repository's Task set and keep every finding owned by either
  this Task or [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md);
- validate the exact candidate with `npm run nkf:check`; and
- perform the directed independent audit against any later implementation and
  distributable set before claiming completion.

## Out Of Scope

- completing the release, adoption, breaking-change classification, archive,
  recommendation, or CI work owned by
  [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md);
- changing the general one-Task-one-branch model beyond the recorded recovery
  exception;
- making NKF, the checker, or an agent authoritative for Task meaning;
- automatically deciding whether prose truthfully matches an acceptance
  criterion; and
- silently editing an accepted immutable record or treating validation as
  acceptance or Realization confirmation.

## Execution Plan

1. Preserve the Draft Design and the [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md)
   expansion evidence without adopting or implementing the proposal.
2. Remove the Draft Design's claim that the Task Scope Gate targets NKF 0.2;
   express it as successor-version proposal knowledge instead.
3. Run exactly `npm run nkf:check` on the coherent deferral candidate and keep
   acceptance, confirmation, local Git state, remote enforcement, release,
   and recommendation as separate facts.
4. Defer this Task through the deterministic transition and preserve the merge
   as the repository's Human Product Owner review act.
5. Resume [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md)
   only after the deferred conclusion is incorporated, limiting that work to
   existing NKF 0.2 release integrity and independent audit.
6. Reactivate this Task only under later explicit Human Product Owner direction
   for a successor NKF version.

## Acceptance Criteria

- A Human Product Owner Decision adopts the exact Task Scope Gate boundary for
  a successor NKF version.
- The accepted successor authority pair requires exactly one minimal Task
  Scope Gate in every Task non-record without duplicating the Task's Scope or
  Acceptance Criteria.
- Newly discovered work has a closed classification and disposition; remaining
  work is tied to an existing acceptance criterion, transferred work resolves
  to another confirmed Task, and a scope amendment names the Human Product
  Owner act that authorized it.
- The checker enforces structure, vocabulary, placement, references, and
  mechanically decidable combinations while making no claim that the
  classification is semantically true.
- Existing Tasks and the predecessor-to-successor migration receive truthful
  retrospective gates without fabricated historical decisions.
- Schemas, fixtures, examples, onboarding, migration, portable guidance,
  public documentation, and tests agree with the accepted rule.
- `npm run nkf:check` reports zero diagnostics for the exact candidate.
- Independent audit Evidence records fresh verification of the implementation,
  migration, complete set, final archive, and extracted checker, including all
  findings rather than only passing results.
- The successor release contains the accepted scope-gate set, while
  [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md)
  retains ownership of existing NKF 0.2 release and compatibility work.

## Current Progress

- The Human Product Owner confirmed the separate Task approach, the core
  scope rule, the single recovery-branch exception, inclusion in the final
  NKF 0.2 set, the exact one-time version-sealing exception, and the
  requirement for an independent audit.
- Task creation is the only governed change performed so far. No Design,
  Decision, Specification, executable contract, checker, fixture, migration,
  Realization, or release bytes have been changed under this Task.
- Activation requirements are semantically resolved: the core gate rule,
  authority boundary, migration obligation, branch exception, version
  exception, independent-audit requirement, execution plan, and acceptance
  criteria are understood and explicitly confirmed. Exact Design and
  authority-pair bytes remain later review and acceptance boundaries rather
  than activation uncertainties.
- Deterministic activation exposed a pre-existing worktree defect: the command
  validates the candidate successfully in the populated default checkout,
  creates the clean Task worktree, and then fails the transaction because the
  untracked generated `dist/nourd-nkf-adopt.mjs` governed artifact is absent
  from that new worktree. The transition rolled back without changing Task
  state. The defect is classified as a blocking dependency transferred to
  [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md),
  which owns the remaining Task-transition process refinements; it is not
  silently added to this Task's implementation scope.
- Activation was recovered under the confirmed Git-topology exception: the
  exact deterministic `task` transition ran against a Git-free copy of commit
  `786b2ac`, using the exact built checker, and reported `active` with two
  rewritten documents. Those transition results were applied on
  `task/NKF-021`; invalid self-links created by preserving the old Task path
  were removed rather than carried into the active document. Git commit,
  push, and draft-request state remain separate operational steps.
- The Active [NKF Task Scope Gate Design](../../designs/active/task-scope-gate.md)
  now proposes the minimal finding ledger, four classifications, four
  dispositions, deterministic combination and reference checks, the separate
  Human Product Owner amendment boundary, and truthful retrospective migration.
  It remains Draft proposal knowledge pending exact boundary confirmation.
- Before any proposal adoption or implementation, the Human Product Owner
  directed deferral to a successor NKF version and return to
  [NKF-020](../active/NKF-020-version-release-adoption-and-compatibility-process.md) for
  existing 0.2 release work only. The Draft Design is preserved, and no
  normative, executable, checker, fixture, migration, or release change was
  made under NKF-021.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable changes require evidence, classification, Human Product Owner confirmation, authority-first updates, derived implementation, release, and deliberate migration. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | After first consumer adoption, every contract-meaning change ships as a new immutable NKF version and no accepted version is mutated in place. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Releasing and adopting are separate, and this repository is the first adopter of every NKF version it releases. |
| [`adr-0084`](../../decisions/0084-replace-the-unconsumed-0-2-release.md) | record | The recorded 0.2 replacement exception covers exactly the then-unconsumed release, sets no precedent, and ends once any repository adopts the version. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | Deterministic commands own mechanics only; prose truth, acceptance, confirmation, and review remain human and agent acts. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | Pre-cut review covers every deterministically enumerated versioned-set member against the complete rule set. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Every governed command follows a confirmed semantic review, and Task activation requires all requirements and open uncertainties to be resolved first. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | A Task branch ordinarily carries that Task's whole life and merges only concluded; the recorded recovery branch is an explicit Git-topology-only exception. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| A minimal scope gate prevents unclassified discovered work from remaining silently inside a Task | unknown | none | none |
| Existing Task history can migrate without fabricating retrospective scope decisions | unknown | none | none |
| The corrected complete NKF 0.2 set is internally consistent and independently verifiable | unknown | none | none |
