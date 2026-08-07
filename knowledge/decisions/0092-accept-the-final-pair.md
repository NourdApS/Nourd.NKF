---
title: "ADR 0092: Accept The Final Pair"
id: adr-0092
type: decision
summary: Accept the final corrected 0.2 pair after linkifying its own acceptance reference, extending ADR 0090.
created_at: 2026-08-07T17:25:26Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0092: Accept The Final Pair

## Context And Problem

Deep-linking the Specification's own references necessarily linkifies the
mention of its acceptance Decision, so the bytes accepted by
[ADR 0090](0090-accept-the-title-and-deep-link-pair.md) changed by exactly
that one link after acceptance. The rule cannot exempt the mention, and the
just-published archive was unconsumed.

## Decision

Extending [ADR 0090](0090-accept-the-title-and-deep-link-pair.md) under the
same exception, the final corrected canonical NKF 0.2 pair is accepted:
Markdown SHA-256
`75273f8350e98c516e95ce25dca3fb7174586749060945838faa2e55492f4374`
bound to executable SHA-256
`0d437ffbed00549360a90012e576067fef103b38055697b427631c42635a62e2`.

## Scope And Applicability

Acceptance covers exactly these bytes as canonical NKF 0.2; the packaging
binding follows separately.

## Rationale

The acceptance reference is part of the accepted bytes; accepting the
linkified form once ends the recursion because no further byte change is
required.

## Alternatives Considered

Exempting acceptance references from the deep-link rule was rejected as a
rule carve-out serving only the publisher.

## Consequences And Trade-Offs

The archive published minutes earlier is deleted and replaced once more.

## Non-Claims

This Decision does not release, migrate any consumer, or confirm the
Realization.
