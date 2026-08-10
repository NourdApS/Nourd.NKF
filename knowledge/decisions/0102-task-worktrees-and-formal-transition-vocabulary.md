---
title: "ADR 0102: Task Worktrees And Formal Transition Vocabulary"
id: adr-0102
type: decision
summary: Activation creates the Task's own Git working tree at a deterministic sibling path so the default-branch checkout never moves; closure releases it after pushing; the informal transition phrase in guidance becomes the formal term Git transition mechanics.
created_at: 2026-08-08T17:51:47Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0102: Task Worktrees And Formal Transition Vocabulary

## Context And Problem

The [ADR 0101](0101-deterministic-git-mechanics-in-task-transitions.md) shipment switched the repository's only checkout onto the
Task branch at activation, taking the default branch off the disk until a
manual switch back, and carried an informal conversational phrase into the
skills and release notes.

## Decision

On `2026-08-08`, the Human Product Owner approved the proposed correction:

1. Activation creates the Task's branch together with its own Git working
   tree at the deterministic sibling path
   `../<repository>-worktrees/<task_id>`, applies the transition inside
   that working tree, and leaves the default-branch checkout untouched.
2. Deferral and closure run inside the Task's working tree when one
   exists, and release it once the branch is pushed; run from the main
   checkout without a working tree, they restore the default branch after
   pushing. The working tree lives outside the repository directory so a
   second bundle copy can never pollute validation.
3. The guidance and release notes use the formal term Git transition
   mechanics; conversational shorthand does not enter governed text.

## Scope And Applicability

Tooling and guidance only: the authority pair, rules, checker, and the
[ADR 0100](0100-bind-the-decoupled-0-2-release-checker.md) binding are unchanged.

## Rationale

A transition should never cost the repository its default-branch checkout,
and governed text carries formal vocabulary because informal phrases do
not survive translation to new readers.

## Alternatives Considered

Switching branches in the single checkout was rejected as the shipped wart
this corrects. Placing working trees inside the repository was rejected
because a nested bundle copy corrupts validation scans.

## Consequences And Trade-Offs

Transitions gain a working-tree lifecycle to manage, and the unconsumed
set is re-cut once more.

## Non-Claims

This Decision does not merge branches, close [NKF-020](../tasks/completed/NKF-020-version-release-adoption-and-compatibility-process.md), confirm the
Realization, or migrate any consumer.
