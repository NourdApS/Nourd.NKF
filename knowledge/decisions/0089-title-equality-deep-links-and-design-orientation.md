---
title: "ADR 0089: Title Equality, Deep Links, And Design Orientation"
id: adr-0089
type: decision
summary: Return the frontmatter title with checker-enforced heading equality, require same-bundle document references to be deep links, and move the Design proposal header bullets into optional frontmatter keys.
created_at: 2026-08-07T17:10:30Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0089: Title Equality, Deep Links, And Design Orientation

## Context And Problem

Reviewing migrated documents in a frontmatter property panel, the Human
Product Owner found the document title invisible above the panel, plain-text
references to other documents that a reader cannot follow, and Design
proposal facts still opening bodies as bullets. The Human Product Owner
directed: roll back the adoption again, fix these under 0.2, release again,
and adopt again.

## Decision

For NKF 0.2, under the continued [ADR 0084](0084-replace-the-unconsumed-0-2-release.md) unconsumed-release exception:

1. `title` returns as a required frontmatter key and MUST exactly equal the
   H1 comparison string; `markdown.frontmatter.title-mismatch` returns to
   the registry, so the panel title and the heading can never disagree.
   This reverses [ADR 0079](0079-dynamic-frontmatter-without-title.md) item one while keeping every orientation key.
2. Same-bundle document references MUST be deep links: `ADR NNNN` text,
   record-identifier code spans, and Task identifiers must be link text
   whose destination resolves to the referenced document's exact source
   path, enforced as `markdown.reference.deep-link.required` under the
   closed grammars; gate table Reference and link Exception cells become
   verified links. Self-references, headings, code fences, longer
   human-composed link texts, and Evidence stay exempt.
3. Design records gain optional `proposal_authority_effect`,
   `proposal_evidence`, and `implementation_evidence` orientation keys, and
   the identity-bullet registry gains `Adopting Decision`,
   `Proposal Authority Effect`, `Proposal Evidence`, and
   `Implementation Evidence`, so the former Design header bullets move into
   frontmatter and stay out of bodies.

## Scope And Applicability

This Decision governs the corrected 0.2 candidate pair, its derived checker,
guidance, fixtures, and this repository's repeated migration. The registry
grows to 159 rules.

## Rationale

The property panel is how the Human Product Owner reads governed documents:
the title must be there, references must be navigable, and orientation
facts must have exactly one home.

## Alternatives Considered

A viewer-side title was declined by direction. Leaving references as plain
text keeps readers searching by hand. Treating the proposal bullets as
content would leave orientation split between envelope and body.

## Consequences And Trade-Offs

Every document carries the title twice with equality machine-enforced.
Reference links must be updated when a Task moves between status
directories; the checker fails closed on stale links, forcing honest
maintenance. The migration linkifies the complete knowledge tree.

## Non-Claims

This Decision does not accept the corrected pair bytes, release, migrate,
or confirm anything.
