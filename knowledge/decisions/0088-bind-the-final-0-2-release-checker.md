---
id: adr-0088
title: "ADR 0088: Bind The Final 0.2 Release Checker"
type: decision
summary: Bind the corrected 0.2 release packaging to the exact re-adopted checker bytes and source commit.
created_at: 2026-08-07T15:14:39Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0088: Bind The Final 0.2 Release Checker

## Context And Problem

Release packaging requires an immutable Decision binding the exact checker
realization for the corrected pair.

## Decision

The corrected NKF 0.2 release checker is the deterministic build
`dist/nourd-nkf-checker.mjs` with SHA-256
`c4fa53db760673c32ac611dfabf48b0dc0fccd360796a9481af18abc981bd435`
from adopted source commit
`717b3d2df2afb3a067fcbd8b09c21bf04aeef69f`. This supersedes the [ADR 0085](0085-bind-the-corrected-0-2-release-checker.md)
binding.

## Scope And Applicability

This Decision binds release packaging inputs only.

## Rationale

The identifiers belong in an immutable Decision, matching ADRs 0065, 0083,
and 0085.

## Alternatives Considered

Reusing the [ADR 0085](0085-bind-the-corrected-0-2-release-checker.md) binding was impossible: the corrected pair and rules
changed the checker bytes.

## Consequences And Trade-Offs

Any further checker change requires a new binding Decision.

## Non-Claims

This Decision does not publish, re-confirm, or complete the migration.
