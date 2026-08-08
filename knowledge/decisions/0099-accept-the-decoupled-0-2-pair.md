---
title: "ADR 0099: Accept The Decoupled 0.2 Pair"
id: adr-0099
type: decision
summary: Accept the revised NKF 0.2 authority pair whose specification carries timeless scope statements instead of Task-file links and states the sealed-pair versioning rule.
created_at: 2026-08-08T16:25:08Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0099: Accept The Decoupled 0.2 Pair

## Context And Problem

[ADR 0098](0098-semantic-gates-around-deterministic-mechanics.md) directs decoupling the specification from Task lifecycle and
recording the sealed-pair versioning rule. The revision changes accepted
pair bytes, which only a new acceptance can carry.

## Decision

On `2026-08-08`, under the delegated confirmation practice recorded in
[ADR 0082](0082-confirm-nkf-0-2-versioned-set.md) and the per-change plain-language confirmations recorded in the
owning Task, the Human Product Owner accepts the revised NKF 0.2 authority
pair: the canonical Markdown revision with SHA-256
`6af631cb20571570a6d688caf0fd814531f809f8229517ddce10ac7f30141aec` and its
digest-bound executable companion with SHA-256
`da5525398523e2f19f49509a60007624f0e529f2dd15a686ea00dd82847b92d2`. The
content changes are exactly: six Task-file references reworded as timeless
scope statements, and the sealed-pair versioning paragraph. This
supersedes the pair digests accepted through [ADR 0092](0092-accept-the-final-pair.md).

## Scope And Applicability

The authority pair, with the derived schemas re-pinning only their embedded
pair-source metadata; the rule registry and diagnostics are unchanged.

## Rationale

The pair must not name locations that move with operational state; scope
statements are timeless while the Task map owns lifecycle.

## Alternatives Considered

A rule exemption letting pair documents carry plain-text Task identifiers
was rejected as a special text class inside the deep-link contract.

## Consequences And Trade-Offs

Every pair-digest pin — executable companion, checker bindings, release
configuration, and manifest — moves to the new values in one coherent
cascade.

## Non-Claims

This acceptance does not release, adopt, confirm the Realization, or claim
consumer migration.
