---
title: "ADR 0093: Bind The Adopted 0.2 Release Checker"
id: adr-0093
type: decision
summary: Bind the corrected 0.2 release packaging to the exact adopted checker bytes and source commit, superseding the ADR 0091 binding.
created_at: 2026-08-07T17:37:47Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0093: Bind The Adopted 0.2 Release Checker

## Context And Problem

Release packaging requires an immutable Decision binding the exact checker
realization for the final pair accepted by
[ADR 0092](0092-accept-the-final-pair.md).

## Decision

The final NKF 0.2 release checker is the deterministic build
`dist/nourd-nkf-checker.mjs` with SHA-256
`5c28209d8c1b2a40f58cf80c49a983381ea9fcccfbd3b36351591567b140d164`
from adopted source commit
`dd36a1133894ed8a90f06b62701952472f5d5d7f`. This supersedes the
[ADR 0091](0091-bind-the-deep-link-release-checker.md) binding.

## Scope And Applicability

This Decision binds release packaging inputs only.

## Rationale

The identifiers belong in an immutable Decision, matching the earlier
binding Decisions.

## Alternatives Considered

Folding the binding into [ADR 0092](0092-accept-the-final-pair.md) failed:
the binding must cite the commit that carries the accepted bytes.

## Consequences And Trade-Offs

Any further checker change requires a new binding Decision.

## Non-Claims

This Decision does not publish, re-confirm, or complete the migration.
