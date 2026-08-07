---
id: adr-0080
type: decision
summary: Accept the separated NKF release and adoption processes as governed protocols in the versioned set, with the NKF repository releasing first and then adopting its own version as the first migrator.
created_at: 2026-08-07T06:49:53Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0080: Release And Adoption Process

## Context And Problem

ADR 0076 established version-per-change governance and ADR 0078 kept
release and adoption process outside format meaning, deferring definition to
NKF-020. Shipping NKF 0.2 needs the processes now, and the Human Product
Owner directed proposing them with release and adoption separated, and with
the NKF repository dogfooding each version: release first, then migrate the
NKF repository to its own release as the first adopter.

## Decision

On `2026-08-07`, the Human Product Owner accepted the proposed processes and
their documentation homes:

1. Releasing and adopting are separate processes. A release obligates no
   repository; adoption is deliberate per repository.
2. The release process is recorded as the followable
   [NKF Release Protocol](../../integrations/release/nkf-release-protocol.md):
   adopting Decisions and version allocation, Human Product Owner acceptance
   of the exact authority pair, derivation of the complete versioned set,
   the set proven against its own fixtures and verifiers, independent audit
   and separate confirmation, one verified content-addressed release archive
   and manifest, and published migration meaning.
3. The adoption process is recorded as the followable
   [NKF Adoption Protocol](../../integrations/adoption/nkf-adoption-protocol.md):
   explicit owner decision, installation of the exact released set,
   knowledge migration under the published migration meaning, removal of
   superseded in-tree version artifacts, zero-diagnostic validation with the
   version's checker, and human-reviewed migration closure.
4. Both protocols are members of the versioned set, carry the guidance
   version marker, and freeze with their release; correcting one afterward
   requires a new version.
5. The NKF repository is the first adopter of every version it releases:
   the adoption protocol runs against this repository immediately after each
   release completes, before any consumer migrates.
6. During a release build, the publishing repository keeps validating as its
   current declared version with that version's frozen checker; the new
   version's checker judges it only after adoption.

## Scope And Applicability

This Decision governs how NKF versions are released from this repository and
how repositories, including this one, adopt them, beginning with NKF 0.2.
It reduces deferred NKF-020 to breaking-change classification and signaling
and to process refinements from real release experience.

## Rationale

Separating the processes keeps a release from implying migration and keeps
migration deliberate, matching the accepted versioning semantics.
Dogfooding the adoption path in the publishing repository proves migration
meaning before consumers carry any risk. Protocol documents are the
repository's established form for followable procedure, and versioned-set
membership keeps process corrections as honest as specification
corrections.

## Alternatives Considered

Migrating the NKF repository before releasing was rejected by direction:
it would validate the new contract only against the publisher's own
knowledge and leave the adoption path unproven at release time. Keeping the
process inside the Specification was already rejected by ADR 0078. Leaving
the process as NKF-020 draft input until after NKF 0.2 was rejected because
0.2 itself must ship through a defined process.

## Consequences And Trade-Offs

There is a bounded interval after each release in which the publishing
repository still declares the predecessor version; step six keeps its
validation truthful during that interval. Each release now carries two
protocol artifacts whose drift is constrained by set membership and the
guidance marker. NKF-020 narrows rather than closes.

## Non-Claims

This Decision does not:

- accept the NKF 0.2 authority pair or any Specification revision;
- release NKF 0.2, migrate this repository, or migrate any consumer;
- confirm any Realization or claim conformance for any snapshot; and
- define breaking-change classification and signaling, which remain
  deferred to NKF-020.
