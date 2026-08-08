---
title: "ADR 0103: Branch-Carried Task Life And Cancelled State"
id: adr-0103
type: decision
summary: A Task branch carries the Task's whole life and merges only concluded, activation opens a draft merge request, the pending view reads review state from version control, and cancelled joins the Task state vocabulary with its own index.
created_at: 2026-08-08T18:57:04Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0103: Branch-Carried Task Life And Cancelled State

## Context And Problem

Opening a merge request made concluding a Task asynchronous: the merge is a
human act outside NKF's hands, and the knowledge must not misstate reality
on either side of it. Encoding review state into Task states would create a
second source of truth beside version control, and the vocabulary had no
honest conclusion for work that will not be delivered.

## Decision

On `2026-08-08`, the Human Product Owner confirmed the proposed model:

1. A Task branch carries the Task's whole life: activation is its first
   commit, the conclusion its last, and the branch merges only concluded.
   The default branch therefore only ever rests in `deferred`,
   `completed`, or `cancelled`; `active` is a branch-only state.
2. Activation pushes the Task branch and opens a draft merge request;
   conclusion marks it ready carrying the Completion or Cancellation
   Result; merging is the repository's human review act. Documents are
   complete and the full bundle validated before any commit or request.
3. Review state lives only in version control: the task command without a
   transition reports each Task's resting state with any in-flight branch
   and merge request, and no new state encodes review progress.
4. `cancelled` joins the Task state vocabulary as an official NKF 0.2
   state with the `tasks/cancelled/` directory and index: reachable from
   `active` and `deferred`, never from `completed`, terminal, requiring a
   recorded Cancellation Result, and exempt from the gate's completion
   rule because nothing is claimed delivered.
5. The Git report never over-claims: activation reports the draft opened,
   conclusion reports the proposal awaiting merge, and a Git step failing
   after the applied transition reports the error on the successful
   transition without rolling it back.

## Scope And Applicability

Format meaning for the state vocabulary and topology, accepted as the
revised pair through [ADR 0104](0104-accept-the-cancelled-state-pair.md); process and tooling for the branch
model. The completion rule and gate vocabularies are otherwise unchanged.

## Rationale

Master as a ledger of conclusions never lies about work in flight, review
state stays in the system that owns it, and cancellation gets an honest
terminal record instead of a misused deferral or completion.

## Alternatives Considered

A `closing` or `in-review` state was rejected as a duplicate of version
control state that would drift. Concluding cancellations as deferrals was
rejected as dishonest about work that will not resume.

## Consequences And Trade-Offs

The pair, schemas, checker, onboarding topology, migration, tooling, and
guidance all move in one cascade, and the unconsumed set is re-cut.

## Non-Claims

This Decision does not merge branches, close [NKF-020](../tasks/active/NKF-020-version-release-adoption-and-compatibility-process.md), confirm the
Realization, or migrate any consumer.
