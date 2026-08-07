---
id: adr-0087
title: "ADR 0087: Accept The Corrected 0.2 Pair"
type: decision
summary: Accept the corrected NKF 0.2 authority pair carrying the record decision-authority key, the identity-bullet duplication rule, and the title-free canonical bytes.
created_at: 2026-08-07T15:05:28Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0087: Accept The Corrected 0.2 Pair

## Context And Problem

[ADR 0086](0086-record-authority-and-identity-bullet-rule.md) adopted the record decision-authority key and the identity-bullet
duplication rule for NKF 0.2 under the extended unconsumed-release
exception. The corrected canonical bytes must be accepted exactly.

## Decision

Under the Human Product Owner authority delegated for this correction, the
corrected canonical NKF 0.2 pair is accepted: Markdown SHA-256
`df2e457e5e3824004268efebdead93be56df36c3754cf563b2701cee0474c26f`
bound to executable SHA-256
`087934ec88de7f6c25b64e9706599403876d28cbc1f0accd50bc9bfbdd419b27`.
This extends ADRs 0081 and 0084. Because the title-free canonical record
cannot also satisfy the retired 0.1 envelope, this repository's repeated
migration and the release cut land on the same snapshot; the exception
covers both, and the pattern ends with the first consumer adoption.

## Scope And Applicability

Acceptance covers exactly these bytes as canonical NKF 0.2.

## Rationale

One corrected pair carries the complete review findings instead of a second
partial fix.

## Alternatives Considered

Accepting the rules without the byte-level header cleanup would have left
the Specification violating its own contract again.

## Consequences And Trade-Offs

Every digest referencing the prior pair is re-pinned; the replaced archive
is deleted and re-published.

## Non-Claims

This Decision does not release, migrate any consumer, or confirm the
Realization.
