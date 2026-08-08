---
title: "ADR 0096: Deterministic Governed Mechanics"
id: adr-0096
type: decision
summary: Ship deterministic commands for the mechanical governed operations — task status transitions, digest re-pinning, reference export, deep-link rewriting, and consumer migration — while prose and acceptance stay with humans and agents.
created_at: 2026-08-07T19:13:58Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0096: Deterministic Governed Mechanics

## Context And Problem

Governed mechanics were performed by agents editing files per instructions,
with the checker as the only deterministic layer. The lived [NKF-019](../tasks/completed/NKF-019-decision-applicability-gate.md) rounds
show that this is token-expensive and error-prone even though every miss is
caught, and the Human Product Owner directed mechanizing what can be
mechanized.

## Decision

On `2026-08-07`, the Human Product Owner directed shipping deterministic
commands in the 0.2 set, under the continued
[ADR 0084](0084-replace-the-unconsumed-0-2-release.md) exception:

1. `task close`, `task defer`, and `task activate`: verified status
   transitions that move the file, rewrite lifecycle indexes and every
   inbound deep link, insert agent-supplied result prose, re-pin digests,
   and commit only through staged validation with rollback.
2. `repin`: recompute record-source and governed-artifact digests for
   edited files.
3. `refs`: export the same-bundle identifier-to-path reference map.
4. `linkify`: rewrite same-bundle references into verified deep links under
   exactly the checker's closed grammars.
5. `migrate`: execute the documented 0.1-to-0.2 consumer migration —
   version declaration, retrospective gates with disclosure, deep links,
   re-pins — ending in full validation.

The command surface is closed. Prose, gate truthfulness, acceptance,
confirmation, and review remain human and agent acts; the checker remains
the only judge. Record scaffolding, Design disposition transitions, and a
release publication wrapper are recorded as parked candidates for the
deferred process work.

## Scope And Applicability

Tooling only: the authority pair, rules, and checker binding are unchanged;
the commands join the versioned set.

## Rationale

Deterministic mechanics with agent-supplied semantics is cheaper and more
accurate than agent-performed mechanics, and the checker already proves
the outcome either way.

## Alternatives Considered

A generic governed-document editing API was rejected as an authority
bypass. Leaving mechanics to agents already works but wastes tokens on
work a transaction does better.

## Consequences And Trade-Offs

The adopter grows a closed command family with tests; the unconsumed
archive is replaced once more.

## Non-Claims

This Decision does not change format meaning, accept records, or confirm
the Realization.
