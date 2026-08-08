---
title: "ADR 0097: Full-Set Guidance Review And Enumeration"
id: adr-0097
type: decision
summary: Repair the stale authoring protocol, widen the pre-cut guidance review from the version's rule diff to the complete member set, and add a deterministic set-enumeration command to the closed command family.
created_at: 2026-08-08T09:10:29Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0097: Full-Set Guidance Review And Enumeration

## Context And Problem

The close review for [NKF-019](../tasks/active/NKF-019-decision-applicability-gate.md) found the neutral authoring protocol still
describing the removed-title rule: it was last corrected before
[ADR 0089](0089-title-equality-deep-links-and-design-orientation.md) reversed the title removal, and the
[ADR 0095](0095-review-guidance-before-cutting.md) review examines only each release's own rule diff, so
guidance made stale before that step existed was never re-read. Digest pins
and version stamps carried the wrong prose faithfully. Propagation had
started from session memory instead of from the machine-readable member
list.

## Decision

On `2026-08-08`, the Human Product Owner directed, under the continued
[ADR 0084](0084-replace-the-unconsumed-0-2-release.md) exception:

1. The authoring protocol is repaired to state the current 0.2 contract:
   the required title equal to the H1, the twelve closed identity labels,
   the Design orientation keys, the deep-link requirement, and the
   deterministic mechanics commands.
2. The release protocol's pre-cut review widens from the version's rule
   diff to every member of the versioned set, each re-read in full against
   the complete current rule set, with the enumerated member list and
   reviewed digests recorded for the independent audit.
3. The closed command family recorded in
   [ADR 0096](0096-deterministic-governed-mechanics.md) is extended with one member: `set`
   deterministically enumerates the versioned-set members with digests and
   version stamps, so review coverage starts from the machine list rather
   than recollection.

## Scope And Applicability

Guidance content, release process, and tooling only: the authority pair,
checker rules, and checker binding are unchanged.

## Rationale

The drift survived because propagation relied on memory and review scope
excluded pre-existing text. Deterministic enumeration removes the memory
dependency; full-set review removes the scope hole. Judging prose meaning
stays a human and agent act.

## Alternatives Considered

Machine-checking guidance prose against the contract was rejected as false
confidence. Keeping the diff-scoped review was rejected because it
structurally never revisits older text.

## Consequences And Trade-Offs

Pre-cut review cost grows with the set size, and the unconsumed archive is
replaced once more.

## Non-Claims

This Decision does not change format meaning, accept records, or confirm
the Realization.
