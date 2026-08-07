---
id: adr-0083
type: decision
title: "ADR 0083: Bind The NKF 0.2 Release Checker"
summary: Bind the ADR 0082 confirmation to the exact released checker bytes and source commit for release packaging.
created_at: 2026-08-07T10:10:03Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0083: Bind The NKF 0.2 Release Checker

## Context And Problem

Release packaging requires the confirming Decision to bind the exact checker
realization. [ADR 0082](0082-confirm-nkf-0-2-versioned-set.md) records the delegated confirmation act without the
mechanical identifiers.

## Decision

The confirmed NKF 0.2 release checker is the deterministic build
`dist/nourd-nkf-checker.mjs` with SHA-256
`0ae56ecd378f17831ad1d474b03b00c313396b8f5b6660d4a69205863e61ae4e`
from audited source commit
`455ef7a0dd334722aa3a46f4b6e6aea4f11e302a`. This extends [ADR 0082](0082-confirm-nkf-0-2-versioned-set.md) with the
exact bindings in the [ADR 0065](0065-confirm-current-release-bound-checker.md) tradition.

## Scope And Applicability

This Decision binds release packaging inputs only.

## Rationale

The identifiers belong in an immutable Decision rather than in tooling
configuration alone.

## Alternatives Considered

Amending accepted [ADR 0082](0082-confirm-nkf-0-2-versioned-set.md) was rejected; accepted revisions are immutable.

## Consequences And Trade-Offs

Release tooling verifies these exact bytes; any checker change requires a
new binding Decision.

## Non-Claims

This Decision does not publish, migrate, or re-confirm anything.
