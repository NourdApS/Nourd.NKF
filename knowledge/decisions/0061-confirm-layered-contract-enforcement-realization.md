---
id: adr-0061
type: decision
title: "ADR 0061: Confirm Layered Contract Enforcement Realization"
summary: Confirm the exact independently audited NKF-011 local Realization revisions that implement ADR 0060 through a neutral authoring protocol, explicit host adapters, portable skills, deterministic project command, integrity verification, tests, governed bindings, and a local exact-commit workflow.
created_at: 2026-07-31T00:37:28Z
record_lifecycle: immutable
record_status: accepted
task: NKF-011
---

# ADR 0061: Confirm Layered Contract Enforcement Realization

- **Confirmation Authority:** Codex technical reviewer under the Human Product
  Owner's explicit instruction to confirm the exact local Realization through
  independent audit judgment
- **Candidate Audit:**
  `knowledge/evidence/audits/nkf-011-layered-contract-enforcement-realization-audit.md`

## Context And Problem

[ADR 0060](0060-layered-contract-enforcement.md) adopted the Layered Contract Enforcement Design without confirming
that its protocol, adapters, skills, registry, verifier, command, tests,
workflow, bindings, or Realizations existed.

[NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md) produced the local reference implementation and a separate
implementation audit. That audit found incomplete competing-instruction
discovery and weaknesses in path, command, and workflow integrity checks. The
candidate was repaired, retested, rebound, and reaudited until no unresolved
material local-implementation finding remained.

The Human Product Owner has now explicitly delegated the exact confirmation
act to the technical reviewer. Passing validation remains supporting Evidence
and does not supply that authority.

## Decision

The authorized technical reviewer independently confirms the following exact
candidate revisions as an accurate current account of the local [NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md)
implementation:

| Record | Source | Confirmed Candidate SHA-256 |
| --- | --- | --- |
| [`nkf-layered-contract-enforcement`](../realizations/current/layered-contract-enforcement.md) | `knowledge/realizations/current/layered-contract-enforcement.md` | `5329c18779c9b330ae6dfc6608cb6e9e2cf6dc7dc10dda1dbf8b95db12bf7e63` |
| [`nkf-0.1-native-realization`](../realizations/current-system.md) | `knowledge/realizations/current-system.md` | `8b59859f9d074d4a9785631dd43dfe2a96adfbf9e73816b71c9d51ba83f066c6` |
| [`nkf-self-hosting`](../realizations/current/self-hosting.md) | `knowledge/realizations/current/self-hosting.md` | `f1cd78669f1cd7bfc943793e0acebe95f8c173ab554799afda69828c37274e2b` |

This confirmation covers the neutral protocol, four instruction adapters, two
byte-identical portable skill representations, twelve-surface registry,
deterministic integrity verifier, unified project command, eighteen focused
integrity cases, exact-commit workflow file, Technology governed-artifact
bindings, and current-system and self-hosting accounts described by those
revisions.

## Scope And Applicability

Confirmation applies only to the local NKF repository implementation and the
exact candidate revisions listed above. It confirms that those revisions
accurately describe the implemented local boundary adopted by [ADR 0060](0060-layered-contract-enforcement.md).

The workflow is confirmed as a local file with the documented read-only,
exact-commit behavior. Remote workflow presence, a successful remote run,
required-check context, branch protection, review ownership, bypass controls,
and an observed blocked invalid pull request remain unconfirmed Github
operational state.

The Task remains Active for those later Git and Github steps. Consumer
activation remains deferred to [NKF-008](../tasks/completed/NKF-008-publish-and-onboard-consumers.md) and a separately verified current
checker release.

## Rationale

The final implementation audit independently reviewed the authority boundary,
AI neutrality, host discovery, instruction and skill integrity, universal
output gate, workflow safety, self-host traceability, lifecycle state, and
remote non-claims. Its exact SHA-256 is
`5ca92a717af6f442dc5e0e654ab2d3692a8ca5a5083d8dcc5c49528d650a588c`.

Before this Decision, the reviewer rechecked every implementation and
Realization digest against that audit. The latest `npm run nkf:check`
observation passed sixteen test files with 120 tests, deterministic build
verification, and full-bundle conformance over 360 snapshot entries with zero
diagnostics. A separate temporary invalid Markdown candidate made the same
canonical command exit nonzero.

These mechanical results support the reviewer judgment. They do not replace
it.

## Alternatives Considered

Leaving the exact local Realizations unconfirmed was rejected because the
independent audit found and repaired the material implementation gaps and the
rechecked candidate now accurately describes the local system.

Treating the prior passing validation result as confirmation was rejected
because conformance cannot exercise delegated confirmation authority.

Confirming the remote hard gate was rejected because no commit, push, remote
workflow observation, protection rule, bypass review, or invalid
pull-request-blocking observation has occurred.

## Consequences And Trade-Offs

The three Realizations may now expose `confirmation_status: confirmed` and
name `adr-0061` as confirmation provenance. Their confirmation-closure
revisions become accepted immutable snapshots.

Later changes to the confirmed local enforcement artifacts require an owning
Task, predecessor comparison, proportional audit Evidence, a successor
Realization, and a later confirmation Decision. A candidate-controlled green
check cannot silently confirm its own weakening.

Adding this Decision creates the ninety-second explicit record in the
self-host bundle. [NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md) remains Active until its separately authorized
remote enforcement work and evidence are complete.

## Non-Claims

This Decision does not:

- change the NKF 0.1 Specification, executable companion, Root Profiles,
  version namespace, or conformance meaning;
- claim that every present or future AI host automatically discovers or obeys
  repository instructions;
- make the protocol, skill, verifier, workflow, or checker an acceptance
  authority;
- establish remote branch protection, required-check identity, review
  ownership, or bypass policy;
- commit, push, publish, release, or deploy any artifact;
- confirm a current consumer distribution or migrate a consumer; or
- confirm later Realization bytes by implication.
