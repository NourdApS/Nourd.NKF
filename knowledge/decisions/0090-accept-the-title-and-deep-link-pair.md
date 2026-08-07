---
title: "ADR 0090: Accept The Title And Deep Link Pair"
id: adr-0090
type: decision
summary: Accept the corrected NKF 0.2 authority pair carrying the returned title equality, the deep-link reference rule, and the Design orientation keys, with the release-before-adoption order restored.
created_at: 2026-08-07T17:16:45Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0090: Accept The Title And Deep Link Pair

## Context And Problem

ADR 0089 adopted the round-three corrections under the continued
unconsumed-release exception. The corrected canonical bytes must be
accepted exactly.

## Decision

Under the Human Product Owner authority delegated for these corrections,
the corrected canonical NKF 0.2 pair is accepted: Markdown SHA-256
`535d47e735b1de3440f91b3dacc9a168c818674e13a843938ca8f77a4f5794d5`
bound to executable SHA-256
`1c47ce78326c0ee11a521cc7953038c9d11c9ea326c2b49061441686f74d9d98`.
This extends ADRs 0081, 0084, and 0087. Because the required title makes
the canonical record valid under both the retired 0.1 envelope and its own
rules, the accepted release-before-adoption order is restored for this cut.

## Scope And Applicability

Acceptance covers exactly these bytes as canonical NKF 0.2. The 159-rule
registry, the deep-link grammars, and the Design orientation keys are part
of the accepted pair.

## Rationale

One corrected pair carries the complete round-three review findings.

## Alternatives Considered

Accepting the rules without linkifying the Specification's own references
would have shipped a rulebook violating its own contract at adoption.

## Consequences And Trade-Offs

Every digest referencing the prior pair is re-pinned; the replaced archive
is deleted and re-published.

## Non-Claims

This Decision does not release, migrate any consumer, or confirm the
Realization.
