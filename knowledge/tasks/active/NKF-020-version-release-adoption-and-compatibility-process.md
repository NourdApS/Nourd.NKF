---
title: "NKF-020: Define Version Release, Adoption, And Compatibility Process"
summary: Define the governed process for releasing a new NKF version, the process by which an adopted repository adopts a new version, and how breaking changes are classified and signaled to consumers.
created_at: 2026-08-06T23:30:03Z
task_id: NKF-020
task_status: active
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
related_tasks:
  - NKF-016
  - NKF-018
  - NKF-019
---

# NKF-020: Define Version Release, Adoption, And Compatibility Process

## Human Direction

On `2026-08-06`, while reviewing the NKF 0.2 candidate under [`NKF-019`](../completed/NKF-019-decision-applicability-gate.md), the
Human Product Owner directed that the shipping process be removed from the
NKF rulebook and that this Task be created and deferred. The directed scope
is to define how a new NKF version is released, how a repository adopts a
new version, and whether a new version has breaking changes, including how
that is determined and communicated.

Creation does not authorize Design, Decision, Specification, implementation,
release, or consumer work. Begin only after a separate explicit human
direction to start `NKF-020`.

On `2026-08-08`, the Human Product Owner explicitly directed activating this
Task and beginning work, with this recorded execution plan for the first
round: replace the released version's compressed release notes with a
reader-first version and require named human-readable sections in the
release protocol; add a front-page refresh step to the release protocol and
refresh this repository's outdated front page to the released 0.2 state;
add a deterministic dead-link verification for living surfaces to the
canonical command, with immutable decisions and Evidence exempt; decouple
the accepted Specification from Task lifecycle by rewording its six
Task-file references as timeless scope statements, after the first
activation attempt proved that a lifecycle transition would otherwise
change accepted pair bytes and correctly failed closed; correct the task
command to rebase a moved Task's own outbound links; and re-release the
corrected set under the continued exception with the revised pair
re-accepted and the release checker re-bound. Timeless wording was chosen
so that no future Task lifecycle transition can require a release.

Later on `2026-08-08`, the Human Product Owner directed embedding the usual
Git actions deterministically in the Task transitions: activation requires
a clean work tree on the up-to-date default branch and creates the Task's
own branch before starting; closing commits the transition on that branch,
pushes it, and opens the merge request that carries the Completion Result,
with the merge itself remaining the repository's human review act. The
transition flows in the guidance and the `task` command carry these
mechanics; this round ships them and re-releases the set, and the branch
flow governs transitions from that release onward.

## Scope Reduction

On `2026-08-07`, [ADR 0080](../../decisions/0080-release-and-adoption-process.md) under [`NKF-019`](../completed/NKF-019-decision-applicability-gate.md) accepted the separated release and
adoption processes and their followable protocols, consuming most of this
Task's directed scope ahead of activation. The remaining deferred scope is
breaking-change classification and signaling, plus process refinements from
real release and adoption experience.

## Problem

[ADR 0076](../../decisions/0076-versioned-contract-evolution.md) establishes that every contract-meaning change after first consumer
adoption ships as a new immutable NKF version, and [ADR 0078](../../decisions/0078-version-gate-correction-as-nkf-0-2.md) keeps release
and adoption process outside format meaning. No governed process yet defines
the exact release steps, the consumer adoption and migration procedure, or
how breaking and non-breaking versions are classified and signaled. Until
that exists, each release relies on the accepted governance rules plus
per-release migration notes.

## Draft Process Input

The following release outline was drafted inside the NKF 0.2 candidate and
removed by [ADR 0078](../../decisions/0078-version-gate-correction-as-nkf-0-2.md). It is unaccepted draft input for this Task, not
established process:

1. an immutable Decision adopting the change and allocating the version;
2. Human Product Owner acceptance of the exact new Specification revision
   and its digest-bound executable companion;
3. Schemas, checker, diagnostics, fixtures, tests, onboarding, guidance, and
   documentation derived from the accepted meaning;
4. a passing complete authoring gate on the exact successor snapshot,
   including the publishing repository's own migration;
5. independent audit Evidence and a separate confirmation Decision;
6. one content-addressed versioned release archive and manifest; and
7. explicit migration meaning for consumers, who migrate deliberately.

## Desired Outcome

One governed process definition covering:

- the release process for a new NKF version, from adopting Decision through
  verified versioned release and published migration meaning;
- the adoption process for a consumer repository moving to a new version,
  including validation, Task-gate migration obligations, receipts or other
  integrity evidence, and rollback boundaries;
- breaking-change classification: how it is determined whether a version
  carries breaking changes, where that classification is declared, and how
  consumers observe it before migrating; and
- the authority boundaries that keep release, adoption, acceptance,
  conformance, confirmation, and publication separate facts.

## Scope

- reconcile [ADR 0076](../../decisions/0076-versioned-contract-evolution.md), [ADR 0078](../../decisions/0078-version-gate-correction-as-nkf-0-2.md), the accepted version semantics, release
  tooling, adopter behavior, and existing migration precedent;
- compare candidate homes for the process: governed process knowledge,
  Realization knowledge, release tooling contracts, or an NKF extension;
- define breaking-change classification criteria and their declaration,
  including whether the release manifest or another artifact carries them;
- define the consumer adoption procedure for version migration, including
  gating previously completed Tasks where a version requires it;
- obtain Human Product Owner decisions on the consequential boundaries; and
- derive any required tooling, fixtures, documentation, and guidance from
  the accepted process meaning.

## Out Of Scope Until Activation

- accepting or changing any NKF Specification revision;
- implementing release or adoption tooling changes;
- publishing a release or migrating any consumer;
- changing NKF 0.1 or NKF 0.2 meaning; and
- defining acceptance-binding verification, which remains [`NKF-016`](../deferred/NKF-016-deliver-acceptance-binding-verification.md).

## Future Execution Plan

1. Collect the release and migration precedent from completed NKF Tasks and
   the NKF 0.2 shipment as evidence.
2. Draft a Design comparing process homes, breaking-change classification
   models, and adoption procedures with alternatives and trade-offs.
3. Resolve the consequential boundaries with the Human Product Owner and
   record them in immutable Decisions.
4. Realize the accepted process in the appropriate governed locations and
   tooling, with fixtures and tests where deterministic.
5. Validate with exactly `npm run nkf:check` and present the successor for
   separate audit and confirmation.

## Current Progress

- [ADR 0098](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) records the combination principle and this round's direction. The
  authoring protocol and skill carry the explicit open and close
  procedures, and this Task's own activation was their first execution:
  semantic review, gate re-extraction, and recorded confirmations first,
  the deterministic transition second.
- The specification decoupled from Task lifecycle and states the
  sealed-pair versioning rule. [ADR 0099](../../decisions/0099-accept-the-decoupled-0-2-pair.md) accepts the revised pair, every
  digest pin moved in one cascade, and [ADR 0100](../../decisions/0100-bind-the-decoupled-0-2-release-checker.md) binds the rebuilt checker.
- The release protocol requires human-readable notes and a front-page
  refresh, the front page was refreshed to the released 0.2 state, and the
  deterministic link verification joined the canonical command: 799 living
  links checked with zero dead, immutable decisions and Evidence exempt.
- The task command rebases a moved Task's own outbound links with a
  regression test, after the first activation attempt failed closed on the
  specification's Task links.
- The widened pre-cut review ran from the deterministic set enumeration:
  every guidance member was re-read against the complete rule set
  including the new sealed-pair rule; the corrections were the
  release-protocol immutability boundary and the members this round
  changed, and the remaining members carry no stale statement.
- The corrected release is tag
  `release-sha256-4c67df321f2482fa4356478011fd1b85bc56d277942b41ab61b5e179b24113f9`
  from commit `adbe2a5`, verified by independent re-download; the archive's
  own extracted checker validates this bundle with zero diagnostics; the
  superseded unconsumed release was deleted under the recorded exception.
- [ADR 0101](../../decisions/0101-deterministic-git-mechanics-in-task-transitions.md) embeds the Git actions in the task command: activation requires a
  clean work tree on the up-to-date default branch and creates the
  `task/<task_id>` branch; deferral and closure commit, push, and open the
  merge request carrying the Completion Result; merging stays the human
  review act. Three regression tests prove the dirty-tree refusal, the
  branch-commit-push deferral, and the clean-default-branch activation.
  The set was re-cut as tag
  `release-sha256-5b6acbb4b1bb9cde46ebe78ddb505d0672956feb82f2e3b422cb674fc91cffa0`
  from commit `60dfd4c` with the checker binding unchanged, verified by
  independent re-download, and the archive's extracted checker validates
  this bundle with zero diagnostics; the branch flow governs transitions
  from this release onward.
- The remaining scope is breaking-change classification and signaling, the
  deterministic successor-pair scaffold, and process refinements from
  further release and adoption experience.

## Acceptance Criteria

- A Human Product Owner Decision accepts the exact release, adoption, and
  breaking-change process boundary.
- The release process, adoption process, and classification rules are
  recorded in their accepted governed home with clear authority boundaries.
- Breaking-change classification is observable to a consumer before
  migration.
- Deterministic parts are enforced by tooling with fixtures and tests;
  judgement parts name their human authority.
- Release, adoption, acceptance, conformance, confirmation, and publication
  remain separate facts throughout.

## Deferred-State Rule

This Task records required future work only. It does not claim that any
process has been selected, accepted, implemented, or followed, and it does
not authorize beginning the work. The recorded Human Direction of
`2026-08-08` supersedes this deferred-state fact: activation and the first
round follow it.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Every contract-meaning change after first consumer adoption ships as a new immutable version. |
| [`adr-0078`](../../decisions/0078-version-gate-correction-as-nkf-0-2.md) | record | Release, adoption, and breaking-change process stay outside format meaning. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Only breaking-change classification and signaling plus process refinements remain in this Task's scope. |
| [`adr-0084`](../../decisions/0084-replace-the-unconsumed-0-2-release.md) | record | Replacement corrections stay within the unconsumed-release exception until first consumer adoption. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | The deterministic command surface is closed; prose, judgment, and acceptance stay human. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | The pre-cut review covers every set member against the complete rule set from the deterministic enumeration. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Every Task transition pairs a confirmed semantic review with deterministic execution. |
| [`adr-0099`](../../decisions/0099-accept-the-decoupled-0-2-pair.md) | record | The revised pair digests are the accepted 0.2 authority; schemas and rules are unchanged. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Living-surface links resolve deterministically in the canonical command | proven | runtime-behaviour | none |
| Task transitions fail closed before altering accepted pair bytes | proven | runtime-behaviour | none |

This gate was added when the Task was created before NKF 0.2 was adopted,
was normalized during the self-migration, and was re-extracted on the
`2026-08-08` activation.

