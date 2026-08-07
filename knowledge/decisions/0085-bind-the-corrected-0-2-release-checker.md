---
id: adr-0085
type: decision
summary: Bind the corrected NKF 0.2 release packaging to the exact adopted checker bytes and source commit.
created_at: 2026-08-07T12:17:51Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0085: Bind The Corrected 0.2 Release Checker

## Context And Problem

ADR 0084 accepted the corrected 0.2 pair and authorized replacing the
unconsumed release. Packaging requires an immutable Decision binding the
exact checker realization.

## Decision

The corrected NKF 0.2 release checker is the deterministic build
`dist/nourd-nkf-checker.mjs` with SHA-256
`6915021cc0fa139a7915b6ec4adad5fc6bb72cec417e3b5c15b699b5f6ead5af`
from adopted source commit
`7438b436d6e8eb1d4c6ed6466a6509ed9a283d95`. This supersedes the ADR 0083
binding.

## Scope And Applicability

This Decision binds release packaging inputs only.

## Rationale

The identifiers belong in an immutable Decision, matching ADR 0065 and ADR
0083.

## Alternatives Considered

Reusing the ADR 0083 binding was impossible: the corrected pair and the
adoption changed the checker bytes.

## Consequences And Trade-Offs

Any further checker change requires a new binding Decision.

## Non-Claims

This Decision does not publish, re-confirm, or complete the migration.
