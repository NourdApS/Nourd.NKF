---
title: "ADR 0104: Accept The Cancelled-State Pair"
id: adr-0104
type: decision
summary: Accept the revised NKF 0.2 authority pair that adds the cancelled Task state and its topology.
created_at: 2026-08-08T18:57:04Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0104: Accept The Cancelled-State Pair

## Context And Problem

[ADR 0103](0103-branch-carried-task-life-and-cancelled-state.md) adds `cancelled` to the Task state vocabulary with its own
directory and index, which changes accepted pair bytes.

## Decision

On `2026-08-08`, under the recorded delegated confirmation practice and the
explicit direction in the owning Task, the Human Product Owner accepts the
revised NKF 0.2 authority pair: the canonical Markdown revision with
SHA-256 `336876774b4f2ee02a0a74b29616bdaf35df412edd8046ae3cd1cb18fc1b2a02`
and its digest-bound executable companion with SHA-256
`df4e62f9f8e98bee2018cecdc205f92cdc191a8788e6a0ee8e2bb2378b86be07`. The
content changes are exactly: the `cancelled` state in the Task vocabulary,
its placement, index, and parent-target topology, its gate table row with
the terminal cancellation semantics, and the derived schemas re-pinning
their embedded pair-source metadata. This supersedes the pair digests
accepted through [ADR 0099](0099-accept-the-decoupled-0-2-pair.md).

## Scope And Applicability

The authority pair and derived schemas; diagnostics identities are
unchanged, and the completion rule still applies only to `completed`.

## Rationale

Work that will not be delivered needs an honest terminal record inside the
accepted contract, not a convention beside it.

## Alternatives Considered

Guidance-only cancellation without contract support was rejected: an
unvalidated state is exactly the silent drift NKF exists to prevent.

## Consequences And Trade-Offs

Every pair-digest pin moves in one coherent cascade, and the release
checker is rebuilt and rebound.

## Non-Claims

This acceptance does not release, adopt, confirm the Realization, or
migrate any consumer.
