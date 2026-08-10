---
title: "ADR 0101: Deterministic Git Mechanics In Task Transitions"
id: adr-0101
type: decision
summary: The task command owns the surrounding Git actions deterministically — clean up-to-date default branch and a new task branch at activation; commit, push, and merge-request creation at deferral and closure — while merging stays the human review act.
created_at: 2026-08-08T17:03:04Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0101: Deterministic Git Mechanics In Task Transitions

## Context And Problem

The transition procedures accepted through [ADR 0098](0098-semantic-gates-around-deterministic-mechanics.md) covered the semantic
gate and the file mechanics but left the surrounding Git actions — branch
discipline, commits, pushes, and merge requests — to session habit, the
same unwritten-practice gap this Task keeps closing.

## Decision

On `2026-08-08`, the Human Product Owner directed embedding the usual Git
actions deterministically in the `task` command and its guidance:

1. Activation requires a clean work tree on the up-to-date default branch
   and creates the Task's own `task/<task_id>` branch before any write.
2. Deferral and closure require a clean work tree, run on that branch —
   creating it when absent — commit the transition, push it, and open the
   merge request carrying the Completion Result where the remote supports
   one, reporting the exact outcome otherwise.
3. Merging into the default branch is the repository's human review act;
   the command never merges.
4. A project without a Git repository is reported as such, and every Git
   step's outcome is a separate field of the transition report.

## Scope And Applicability

Tooling and guidance only: the authority pair, rules, checker, and the
[ADR 0100](0100-bind-the-decoupled-0-2-release-checker.md) binding are unchanged. The branch flow governs transitions from
the release that carries it onward.

## Rationale

Repository state around a transition is machine-checkable, so leaving it
to habit invites exactly the drift this Task exists to remove.

## Alternatives Considered

Instructing agents to perform the Git steps manually was rejected: every
mechanical instruction eventually drifts, while a command either performs
the step or reports that it could not.

## Consequences And Trade-Offs

Transitions now fail closed on dirty trees, stale default branches, and
existing task branches, and the unconsumed set is re-cut once more.

## Non-Claims

This Decision does not close [NKF-020](../tasks/deferred/NKF-020-version-release-adoption-and-compatibility-process.md), merge any branch, confirm the
Realization, or migrate any consumer.
