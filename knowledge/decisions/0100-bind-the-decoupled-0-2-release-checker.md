---
title: "ADR 0100: Bind The Decoupled 0.2 Release Checker"
id: adr-0100
type: decision
summary: Bind the release checker realization rebuilt for the decoupled pair accepted through ADR 0099, superseding the ADR 0093 binding.
created_at: 2026-08-08T16:32:52Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0100: Bind The Decoupled 0.2 Release Checker

## Context And Problem

[ADR 0099](0099-accept-the-decoupled-0-2-pair.md) accepts the decoupled pair, and the checker embeds the pair and
schema digests in its version bindings, so the release checker realization
changes and needs its own binding.

## Decision

On `2026-08-08`, under the recorded delegated confirmation practice, the
release checker realization for the decoupled 0.2 set is the deterministic
build from source commit `3ab74d606ad28b65d2a4caf143df6a5be1480c18` with
SHA-256 `cf9c0d5039947520dfea577459abf51a002b49c3e78fa8312d6e2feb04a09ef2`.
This supersedes the [ADR 0093](0093-bind-the-adopted-0-2-release-checker.md) binding.

## Scope And Applicability

Release packaging and verification for the corrected 0.2 set; rules and
diagnostics are unchanged from the [ADR 0093](0093-bind-the-adopted-0-2-release-checker.md) realization apart from the
embedded pair and schema digests.

## Rationale

Packaging fails closed unless an accepted Decision binds the exact checker
bytes and source commit it ships.

## Alternatives Considered

Reusing the [ADR 0093](0093-bind-the-adopted-0-2-release-checker.md) binding was rejected because its digest no longer
matches the rebuilt checker.

## Consequences And Trade-Offs

One more binding Decision in the pre-consumption correction chain.

## Non-Claims

This binding does not release, adopt, accept knowledge, or confirm the
Realization.
