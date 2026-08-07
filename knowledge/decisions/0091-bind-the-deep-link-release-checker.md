---
title: "ADR 0091: Bind The Deep Link Release Checker"
id: adr-0091
type: decision
summary: Bind the corrected 0.2 release packaging to the exact checker bytes and source commit of the title and deep link round.
created_at: 2026-08-07T17:19:30Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0091: Bind The Deep Link Release Checker

## Context And Problem

Release packaging requires an immutable Decision binding the exact checker
realization for the corrected pair.

## Decision

The corrected NKF 0.2 release checker is the deterministic build
`dist/nourd-nkf-checker.mjs` with SHA-256
`ee3db0d4f803e19618a10b2337f2148f1f6251b9f0c7a67be0840ad7ff37b394`
from source commit
`63ac3fc39e9ff66683ce43fd0b7a8371b5ba9dd2`. This supersedes the [ADR 0088](0088-bind-the-final-0-2-release-checker.md)
binding.

## Scope And Applicability

This Decision binds release packaging inputs only.

## Rationale

The identifiers belong in an immutable Decision, matching ADRs 0065, 0083,
0085, and 0088.

## Alternatives Considered

Reusing the [ADR 0088](0088-bind-the-final-0-2-release-checker.md) binding was impossible: the corrected pair and rules
changed the checker bytes.

## Consequences And Trade-Offs

Any further checker change requires a new binding Decision.

## Non-Claims

This Decision does not publish, re-confirm, or complete the migration.
