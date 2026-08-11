---
title: "ADR 0112: Allocate NKF 0.4 Security Maintenance"
id: adr-0112
type: decision
summary: Allocate a non-breaking NKF 0.4 successor for patched dependency closure while preserving frozen 0.3 and the single branch, release, adoption, and audit boundaries.
created_at: 2026-08-11T13:57:53Z
record_lifecycle: immutable
record_status: accepted
task: NKF-024
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0112: Allocate NKF 0.4 Security Maintenance

## Context And Problem

The exact NKF 0.3 complete set is published, frozen, recommended, and adopted
by this producer under [ADR 0109](0109-publication-freeze-and-proven-self-adoption.md),
[ADR 0110](0110-accept-the-nkf-0-3-authority-pair.md), and
[ADR 0111](0111-confirm-the-nkf-0-3-release-candidate.md). The later clean
dependency audit reports affected `fast-uri` and `nanoid` resolutions with
patched compatible versions available. Updating the bundled dependency closure
changes complete-set bytes and therefore cannot alter or republish NKF 0.3.

[NKF-024](../tasks/completed/NKF-024-release-nkf-0-4-dependency-security-maintenance.md)
needs an exact Product boundary before technical derivation: the new version,
compatibility with 0.3, allowed meaning delta, release scope, approval
delegation, and the explicitly directed single-branch lifecycle exception.

## Decision

On `2026-08-11`, the Human Product Owner decides:

1. allocate NKF `0.4` as the next minor pre-stable format version; the major
   version remains `0`;
2. classify `0.3` to `0.4` as `non-breaking`, with no knowledge migration and
   no repository-owner breaking approval, provided the implementation proves
   that the accepted format meaning and consumer integration are preserved;
3. retain the existing `breaking` and explicit repository-owner approval
   treatment for supported NKF `0.1` and `0.2` predecessors;
4. limit 0.4 meaning to a separately accepted immutable successor revision of
   the 0.3 contract carrying the new coordinate, predecessor compatibility,
   patched dependency closure, and exact complete-set bindings; no new format
   vocabulary, topology, authority, operation, onboarding category, or
   validation behavior is authorized;
5. leave every NKF 0.3 byte, tag, archive, manifest, authority record, and audit
   immutable and retrievable;
6. delegate exact technical derivation, audit correction, maintenance-pair
   acceptance, implementation confirmation, packaging, publication,
   recommendation, and producer adoption within this fixed boundary to the
   technical reviewer, returning only an actual normative or compatibility
   change for further Human Product Owner decision; and
7. carry [NKF-024](../tasks/completed/NKF-024-release-nkf-0-4-dependency-security-maintenance.md) from its first active commit through completion in one branch
   and one pull request, without an intermediate lifecycle or recommendation
   merge to `master`. Direct branch activation is the bounded process exception;
   completed-before-ready and human final merge remain required.

## Scope And Applicability

This Decision governs only NKF 0.4 dependency-security maintenance and its
release lifecycle. It extends [ADR 0109](0109-publication-freeze-and-proven-self-adoption.md):
the exact candidate must self-adopt and pass independent audit before technical
confirmation and publication; ordinary public self-adoption and a second
independent audit remain later required proofs.

The accepted 0.3 pair remains predecessor authority. The exact 0.4 pair must be
derived, independently compared, digest-bound, and accepted separately before
it can govern 0.4 implementation. Delegation supplies technical authority
within the fixed meaning; passing validation or an audit still accepts nothing
by implication.

## Rationale

Patched compatible dependency versions reduce known supply-chain exposure
without inventing a breaking consumer change. A new NKF coordinate is still
required because publication froze the checker, adopter, protocols, and every
other complete-set member. The narrow pair boundary prevents a security update
from becoming an opportunity for unrelated format work.

One branch and pull request preserve the branch-carried Task model while
avoiding an intermediate recommendation merge. Consumers see 0.4 only after
the completed branch merges; the producer can still prove exact candidate and
published-archive adoption inside the isolated branch before that final act.

## Alternatives Considered

Mutating or republishing 0.3 was rejected by publication freeze. Leaving known
affected versions indefinitely was rejected because compatible patches exist.
Treating 0.4 as breaking was rejected because the directed maintenance carries
no contract or migration change for 0.3 consumers. Broad dependency upgrades,
new format behavior, multiple lifecycle pull requests, and skipping either
independent audit were rejected as unnecessary scope or weakened proof.

## Consequences And Trade-Offs

Every 0.4 complete-set member receives a new version binding even when most
human meaning is unchanged. Checker and adopter bytes, dependency evidence,
fixtures, public documentation, protocols, recommendation, and producer pin
must move coherently. A discovered normative or compatibility delta stops the
delegated path and requires a new Human Product Owner decision.

The single pull request remains draft for the full release and adoption cycle,
so `master` continues recommending 0.3 until the concluded 0.4 branch receives
human merge. Publication and branch-local recommendation do not imply that
default-branch consumers have moved early.

## Non-Claims

This Decision does not:

- accept an exact future 0.4 authority pair or confirm its implementation by
  implication;
- establish that either advisory is exploitable in NKF;
- publish, recommend, or adopt NKF 0.4;
- change any frozen NKF 0.3 artifact or historical record;
- implement deferred Task scope, acceptance binding, protected-merge, or
  brownfield work; or
- establish conformance, remote enforcement, or Governing Use readiness.
