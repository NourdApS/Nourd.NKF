---
id: adr-0086
title: "ADR 0086: Record Authority And Identity Bullet Rule"
type: decision
summary: Correct NKF 0.2 after the first adoption review by giving records an optional decision-authority orientation key and adding the machine-checked identity-bullet duplication rule, replacing the still-unconsumed release under the extended exception.
created_at: 2026-08-07T15:05:28Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0086: Record Authority And Identity Bullet Rule

## Context And Problem

Reviewing a migrated Design after the first adoption, the Human Product
Owner found identity facts still duplicated between frontmatter and body
bullet blocks, no frontmatter home for record decision authority, and no
machine check for either. The investigation attributed this to an
incomplete migration and two rule gaps, and the Human Product Owner
directed: roll back only the adoption, fix the 0.2 rules, validations, and
skills, release again, and adopt again — losing no document or Decision.

## Decision

For NKF 0.2, extending ADRs 0079 and 0081:

1. Any record source MAY declare `decision_authority` as a non-empty,
   trimmed, single-line orientation string. It orients readers and does not
   replace the declaration's `governance.authority`.
2. A non-Evidence body MUST NOT restate orientation identity as top-level
   bullet lines. The closed, case-insensitive label registry is Task,
   Status, Owner, Decision Authority, Design Disposition, Repository,
   Related Tasks, and Version; violations emit the new
   `markdown.body.identity-duplication` rule. Only these exact bulleted
   forms are machine-detected; prose restatement stays with human review,
   and Evidence bytes are never scanned.
3. The adoption rollback and this correction stay under the [ADR 0084](0084-replace-the-unconsumed-0-2-release.md)
   exception: the replaced release was never consumed, so the correction
   ships as NKF 0.2 again rather than a new version.

## Scope And Applicability

This Decision governs the corrected 0.2 candidate pair, its derived checker,
guidance, and this repository's repeated migration. Once any repository has
adopted a 0.2 release, further corrections ship as new versions.

## Rationale

The gaps defeated the purpose of the frontmatter change: orientation facts
must have exactly one writable home, and rules that only live in a Decision
cannot stop an incomplete migration.

## Alternatives Considered

Leaving the duplication rule as authoring guidance was rejected because the
first migration proved unguarded prose rules get missed. Making
`decision_authority` required on records was rejected as portable burden.

## Consequences And Trade-Offs

The 0.2 registry grows to 157 rules, migrated repositories lose the
duplicated bullet blocks in every non-Evidence document, and the second
migration must also clean Designs, Decisions, and the Specification header
that the first migration missed.

## Non-Claims

This Decision does not accept the corrected pair bytes, release, migrate,
or confirm anything.
