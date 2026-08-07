---
id: adr-0078
type: decision
summary: Reallocate the Decision Applicability Gate correction from NKF 0.11 to NKF 0.2 because it carries breaking changes, keep release and adoption process outside format meaning, and defer process definition to NKF-020.
created_at: 2026-08-06T23:30:03Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0078: Version The Gate Correction As NKF 0.2

## Context And Problem

ADR 0076 allocated the coordinate `0.11` to the Decision Applicability Gate
correction. Reviewing the candidate, the Human Product Owner directed on
`2026-08-06` that the shipping process does not belong in the NKF rulebook,
that a new deferred Task define how a version is released, how a repository
adopts a new version, and whether a version carries breaking changes, and
that the correction be versioned NKF `0.2` because it has breaking changes.

## Decision

1. The Decision Applicability Gate correction is versioned NKF `0.2`. This
   extends ADR 0076 by replacing its `0.11` allocation; the next minor
   coordinate communicates a breaking successor more clearly.
2. How the NKF repository releases a new version, how an adopted repository
   adopts one, and how breaking changes are classified and signaled are
   repository and governance process, not NKF format meaning. The candidate
   Specification's shipping-process section is removed; the format keeps only
   version semantics: version-per-change after first consumer adoption,
   pre-stable breaking minors with explicit migration meaning, one current
   namespace, fail-closed unsupported versions, and deliberate migration.
3. Defining the release process, the adoption process, and breaking-change
   classification and signaling is deferred to `NKF-020`, created by explicit
   direction and deferred without authorizing work.

## Scope And Applicability

This Decision governs the version coordinate, the process boundary of the
NKF 0.2 candidate authority pair, and the deferral. It does not accept the
candidate pair, define the deferred processes, implement anything, or
migrate any repository.

## Rationale

Consumers read `0.1 → 0.2` as the next pre-stable step with changed
requirements; `0.11` read as a small patch while actually breaking. Process
lives with governance and Realization knowledge so it can improve without
pretending the format changed; format meaning stays limited to what a bundle
and checker need to interpret a version coordinate.

## Alternatives Considered

Keeping `0.11` was rejected by direction as misleading for a breaking
change. Keeping the shipping steps inside the Specification was rejected
because the format would start governing internal workflow and every process
tweak would force a format version. Defining the processes immediately inside
NKF-019 was rejected to keep the gate correction the smallest coherent
change; the questions get their own deferred Task.

## Consequences And Trade-Offs

All candidate artifacts, identities, and paths move from `0.11` to `0.2`
before acceptance; ADR 0076 and ADR 0077 remain immutable with their
historical `0.11` references, corrected by this Decision. Until NKF-020 is
activated and completed, release and adoption follow the accepted governance
rules of ADR 0076 plus recorded per-release migration meaning, without a
finished step-by-step process contract.

## Non-Claims

This Decision does not:

- accept the NKF 0.2 Specification or executable companion;
- define, accept, or implement the release, adoption, or breaking-change
  processes deferred to NKF-020;
- authorize beginning NKF-020 work; and
- implement, validate, confirm, release, or migrate anything.
