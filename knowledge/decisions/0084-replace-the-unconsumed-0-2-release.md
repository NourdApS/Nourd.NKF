---
id: adr-0084
title: "ADR 0084: Replace The Unconsumed 0.2 Release"
type: decision
summary: Accept the corrected NKF 0.2 authority pair after self-migration exposed a forbidden legacy title line in the canonical specification, and record the explicit exception replacing the hour-old unconsumed release instead of shipping a new version.
created_at: 2026-08-07T12:00:27Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0084: Replace The Unconsumed 0.2 Release

## Context And Problem

This repository's own 0.2 adoption — the first, deliberate dogfooding step —
exposed that the canonical 0.2 specification file still carried one legacy
frontmatter `title:` line, forbidden by its own accepted envelope rule. The
released set is otherwise correct; no repository had adopted 0.2, and the
release was about one hour old.

## Decision

On `2026-08-07`, the Human Product Owner chose replacing the unconsumed
release over shipping NKF 0.3. The corrected canonical pair is accepted as
NKF 0.2: Markdown SHA-256
`761312803f043ca5ba31d83fee14f8fceb9e67a7d61547b55ae933a5ffea5283`
bound to executable SHA-256
`5c94a0004995b39fbe9513fa6a1fec0f0a10fa38de302937c6f095f5d976e8ab`.
The only Markdown change is the removal of that title line; the executable
change is the re-pinned Markdown digest. This extends ADR 0081 to the
corrected bytes and supersedes the ADR 0083 packaging binding.

## Scope And Applicability

The exception covers exactly this replacement of the never-consumed first
0.2 archive. It sets no precedent: once any repository has adopted a
version, a correction ships as a new version.

## Rationale

The frozen-release rule protects adopters; there were none. Shipping 0.3
for one legacy line would have made the version history less truthful than
recording this bounded exception.

## Alternatives Considered

Shipping NKF 0.3 for the one-line fix was declined by the Human Product
Owner as less truthful version history than a recorded bounded exception.

## Consequences And Trade-Offs

The published hour-old release and its tag are deleted and replaced by the
corrected archive; every digest that referenced the prior pair is re-pinned.
The self-migration continues against the corrected pair.

## Non-Claims

This Decision does not weaken the frozen-release rule for consumed releases,
re-confirm the set, or complete the migration.
