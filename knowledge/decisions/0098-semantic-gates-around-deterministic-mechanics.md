---
title: "ADR 0098: Semantic Gates Around Deterministic Mechanics"
id: adr-0098
type: decision
summary: Every governed command pairs a confirmed semantic review with deterministic execution; task transitions gain explicit open and close procedures, releases communicate for human readers, living links verify deterministically, and the specification decouples from Task lifecycle.
created_at: 2026-08-08T16:25:08Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0098: Semantic Gates Around Deterministic Mechanics

## Context And Problem

The published 0.2 release notes were an unreadable compressed summary, the
repository front page still described the pre-0.2 state with dead links, no
guidance instructed a semantic review around Task transitions, and the
first activation attempt for [NKF-020](../tasks/completed/NKF-020-version-release-adoption-and-compatibility-process.md) proved that a lifecycle transition
would edit accepted pair bytes through the specification's Task-file links
— and correctly failed closed.

## Decision

On `2026-08-08`, the Human Product Owner directed, under the continued
[ADR 0084](0084-replace-the-unconsumed-0-2-release.md) exception:

1. Every governed operation combines a non-deterministic semantic act —
   judged by the agent and confirmed by the Human Product Owner or by the
   agent under an explicitly recorded delegation — with deterministic
   mechanics that follow it. The authoring protocol and skill state the
   general principle and the explicit procedures: before activation, every
   requirement and open uncertainty is resolved and confirmed; before
   close, soundness, coherence, completion, testing, and confirmation are
   established. Only then does the deterministic transition run.
2. The release protocol requires human-readable release notes with named
   sections and a front-page refresh with every release; the outdated
   front page is refreshed to the released 0.2 state.
3. The canonical command gains a deterministic dead-link verification over
   living surfaces; immutable decisions and Evidence stay exempt as
   historical records.
4. The specification decouples from Task lifecycle: its six Task-file
   references become timeless scope statements, and the versioning section
   now states that a consumed version's pair is sealed, later meaning
   changes begin the next version's candidate pair, and Task lifecycle
   never determines versioning. A deterministic successor-pair scaffold
   remains parked in [NKF-020](../tasks/completed/NKF-020-version-release-adoption-and-compatibility-process.md).
5. The task command rebases a moved Task's own outbound links, correcting
   the defect the failed activation exposed, with a regression test.

## Scope And Applicability

Process, guidance, and tooling; the one pair revision is accepted
separately through [ADR 0099](0099-accept-the-decoupled-0-2-pair.md). The rule registry and diagnostics are
unchanged.

## Rationale

Deterministic code cannot judge truth, and unconfirmed judgment cannot be
trusted alone. Naming the combination in the versioned guidance makes the
boundary followable instead of habitual.

## Alternatives Considered

Machine-enforcing semantic completeness was rejected as false confidence.
Leaving the open and close procedures unwritten was rejected after twice
finding correct behavior living only in session practice.

## Consequences And Trade-Offs

The unconsumed set is re-cut once more, and the checker digest changes with
the pair binding.

## Non-Claims

This Decision does not close [NKF-020](../tasks/completed/NKF-020-version-release-adoption-and-compatibility-process.md), confirm the Realization, or migrate
any consumer.
