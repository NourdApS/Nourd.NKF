---
title: "NKF-020: Define Version Release, Adoption, And Compatibility Process"
summary: Define the governed process for releasing a new NKF version, the process by which an adopted repository adopts a new version, and how breaking changes are classified and signaled to consumers.
created_at: 2026-08-06T23:30:03Z
task_id: NKF-020
task_status: deferred
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
- defining acceptance-binding verification, which remains [`NKF-016`](NKF-016-deliver-acceptance-binding-verification.md).

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
not authorize beginning the work.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Every contract-meaning change after first consumer adoption ships as a new immutable version. |
| [`adr-0078`](../../decisions/0078-version-gate-correction-as-nkf-0-2.md) | record | Release, adoption, and breaking-change process stay outside format meaning. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Only breaking-change classification and signaling plus process refinements remain in this Task's scope. |

### Mandatory Capabilities

No mandatory capability is implicated by this Task.

This gate was added when the Task was created before NKF 0.2 was adopted and
was normalized during the self-migration.

