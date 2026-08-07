---
title: "ADR 0095: Review Guidance Before Cutting"
id: adr-0095
type: decision
summary: Add the mandatory pre-cut guidance review step to the release protocol so every shipped protocol and skill is re-read against the version's exact rule diff before the archive is produced.
created_at: 2026-08-07T18:53:24Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0095: Review Guidance Before Cutting

## Context And Problem

The audited stale adoption-protocol sentence shipped in two releases
because guidance prose is not machine-checkable and rule changes were
propagated from memory instead of by systematic review. The root cause
review identified a missing procedural defense.

## Decision

On `2026-08-07`, the Human Product Owner directed adding the defense: the
release protocol gains mandatory step four — before the archive is cut,
every shipped protocol and portable skill is re-read against the exact rule
diff between this version's accepted pair and its predecessor, stale
sentences are corrected, rule reversals require searching every guidance
member, and the reviewed diff is recorded so the independent audit can
verify the review happened. This ships under the continued
[ADR 0084](0084-replace-the-unconsumed-0-2-release.md) exception.

## Scope And Applicability

This corrects the release protocol only; the authority pair and the
[ADR 0093](0093-bind-the-adopted-0-2-release-checker.md) checker binding
are unchanged.

## Rationale

Prose truth is a declared human-review boundary, so the defense must be a
mandatory process step that cannot be skipped silently.

## Alternatives Considered

Keyword tripwires in the checker were rejected as fragile theater; leaving
the review implicit already failed twice.

## Consequences And Trade-Offs

Each release costs minutes of review proportional to how much changed; the
unconsumed archive is replaced once more.

## Non-Claims

This Decision does not release, migrate any consumer, or confirm the
Realization.
