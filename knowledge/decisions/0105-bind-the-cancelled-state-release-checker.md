---
title: "ADR 0105: Bind The Cancelled-State Release Checker"
id: adr-0105
type: decision
summary: Bind the release checker realization rebuilt for the cancelled-state pair accepted through ADR 0104, superseding the ADR 0100 binding.
created_at: 2026-08-08T19:03:26Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0105: Bind The Cancelled-State Release Checker

## Context And Problem

[ADR 0104](0104-accept-the-cancelled-state-pair.md) accepts the cancelled-state pair, and the checker embeds the pair
and schema digests and enforces the new state, so the release checker
realization changes and needs its own binding.

## Decision

On `2026-08-08`, under the recorded delegated confirmation practice, the
release checker realization for the cancelled-state 0.2 set is the
deterministic build from source commit
`153ec0f2ac5e3f7bc1766d3c9dc7dc702bd64bf5` with SHA-256
`f96d8b818bc2bcac64fe65cfc46a4ff9bfdd0c31a6783b72cec05484f10403c6`. This
supersedes the [ADR 0100](0100-bind-the-decoupled-0-2-release-checker.md) binding.

## Scope And Applicability

Release packaging and verification for the corrected 0.2 set; diagnostics
identities are unchanged from the [ADR 0100](0100-bind-the-decoupled-0-2-release-checker.md) realization, with the state
enum, placement, and topology extended for `cancelled`.

## Rationale

Packaging fails closed unless an accepted Decision binds the exact checker
bytes and source commit it ships.

## Alternatives Considered

Reusing the [ADR 0100](0100-bind-the-decoupled-0-2-release-checker.md) binding was rejected because its digest no longer
matches the rebuilt checker.

## Consequences And Trade-Offs

One more binding Decision in the pre-consumption correction chain.

## Non-Claims

This binding does not release, adopt, accept knowledge, or confirm the
Realization.
