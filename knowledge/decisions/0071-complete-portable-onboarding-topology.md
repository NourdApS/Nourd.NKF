---
id: adr-0071
type: decision
title: "ADR 0071: Complete Portable Onboarding Topology"
summary: Adopt one complete lifecycle-first knowledge topology for Product and Technology onboarding, with a single reconciled knowledge map, continuing conformance, and deliberate predecessor repair.
created_at: 2026-07-31T22:46:02Z
record_lifecycle: immutable
record_status: accepted
task: NKF-017
---

# ADR 0071: Complete Portable Onboarding Topology

## Context And Problem

The confirmed [NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md) and [NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md) onboarding realization creates a valid
minimum Draft bundle. Exercise against Nourd Agent SDK showed that this leaves
the knowledge tree materially smaller than the lifecycle structure people and
agents expect to navigate. When an existing `knowledge/README.md` is present,
the predecessor also allocates `README-2.md`, leaving two apparent entry
points.

The Human Product Owner directed [NKF-017](../tasks/completed/NKF-017-complete-portable-onboarding-topology.md) to establish a complete portable
topology for the currently supported Product and Technology onboarding path.
The exact proposal was independently audited, reduced to five consequential
boundaries, and adopted by the Human Product Owner on
`2026-07-31T22:46:02Z`.

## Decision

NKF adopts the direction proposed by this exact Design revision:

| Design | Accepted SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/complete-portable-onboarding-topology.md` | `5de809c5e76d5e8a6c1db7b0b6045c61867edf61ffb31d5bba6d7fad43a27afa` |

The adopted direction establishes:

1. one Common portable lifecycle topology containing the canonical knowledge
   map, Task indexes and state indexes, Design indexes and disposition
   indexes, Decision and Specification indexes, the consolidated
   current-system Realization and supporting-current index, and the Evidence
   index;
2. the same lifecycle topology for Product and Technology, with profile
   additions limited to the Draft root and the Technology profile's required
   initial Draft Specification;
3. exact required paths, native representations, lifecycle placement, and
   index completeness as continuing conformance requirements after deliberate
   adoption of the successor release;
4. `knowledge_root/README.md` as the single canonical knowledge map, using an
   exact managed navigation block and deterministic preservation or explicit
   resolution of existing project-owned content instead of suffix allocation;
   and
5. a separate receipt-bound `repair-topology` workflow for confirmed
   predecessor onboarding, with drift refusal, staged validation, rollback,
   receipt lineage, and idempotence.

Empty lifecycle areas are represented by truthful navigation files. They do
not invent semantic records, acceptance, Task state, Design disposition,
normative meaning, confirmation, Evidence, or operational state.

## Scope And Applicability

This Decision governs the successor NKF 0.1 Specification revision,
executable companion, Schemas, checker, onboarding and repair workflows,
receipts, fixtures, integrations, skills, public documentation, self-hosting
migration, compatibility guidance, and Realization knowledge required by
[NKF-017](../tasks/completed/NKF-017-complete-portable-onboarding-topology.md).

It applies to Category 1 and Category 2 Product and Technology onboarding.
Later repository categories remain deferred to [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md). It does not authorize
mutation of Nourd Agent SDK or another consumer repository.

## Rationale

A fixed lifecycle topology makes the knowledge map predictable and navigable
without pretending that empty areas contain current meaning. Navigation files
are useful to Git, humans, participating agents, and future Knowledge Engine
consumers while remaining explicitly non-authoritative.

Common owns the shared lifecycle envelope. Product and Technology should not
duplicate that structure. A single reconciled map avoids competing entry
points and preserves existing project meaning. Continuing validation makes
the topology durable rather than a generator convention that can immediately
drift.

## Alternatives Considered

The predecessor minimal scaffold was rejected because it reproduces the
observed usability gap. Empty directories and hidden placeholders were
rejected because Git cannot preserve useful lifecycle navigation through
them. Generating placeholder semantic records was rejected because it would
invent authority. Separate Product and Technology lifecycle trees were
rejected as duplicate Common meaning. Generation-only enforcement was
rejected because it would allow immediate structural drift.

Replacing an existing map or allocating `README-2.md` was rejected because
either approach can discard meaning or create a competing entry point.
Automatic repair without trustworthy receipt and byte evidence was rejected
because it could delete consumer-authored content.

## Consequences And Trade-Offs

New onboarding creates more Markdown files and native non-record entries than
the predecessor. The checker and Knowledge Engine consumers gain predictable
paths, but implementation and tests must enforce managed-block ownership,
safe link resolution, explicit state and path agreement, and Evidence
exceptions exactly.

Existing adopted repositories do not change silently. They must deliberately
move to the successor contract. Ambiguous maps, unsafe paths, symbolic links,
source drift, and untrusted predecessor state fail for human resolution.

## Compatibility

NKF retains the single `nkf_version: "0.1"` coordinate. This is a pre-stable,
accepted semantic evolution delivered through a successor release, not a
topology sub-version or a mutation of historical release meaning.

The current release and its confirmed Realization continue to describe the
snapshots they validate. A newly onboarded project uses the successor
topology. A project created by the confirmed predecessor uses the explicit
repair path or a governed migration plan; no fallback or parallel topology is
recognized inside the successor contract.

## Realization Requirements

Realization requires synchronized normative Markdown and executable meaning,
source-bound Schemas, checker diagnostics, exact topology generation,
canonical-map reconciliation, lifecycle link checking, predecessor repair,
transaction rollback, receipts, idempotence, self-hosting migration, portable
agent guidance, public documentation, fixtures, and Product and Technology
exercises.

The exact successor Realization must pass `npm run nkf:check`, then undergo the
whole-repository audit required by [NKF-017](../tasks/completed/NKF-017-complete-portable-onboarding-topology.md). A separate Decision must confirm
the audited Realization before Task completion or release.

## Non-Claims

This Decision does not:

- itself revise or accept the successor Specification;
- implement or confirm the successor Realization;
- make the current worktree conform to the proposed successor contract;
- migrate or conform a consumer repository;
- define the deferred [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) categories;
- publish or release an artifact; or
- establish remote protected-branch enforcement.
