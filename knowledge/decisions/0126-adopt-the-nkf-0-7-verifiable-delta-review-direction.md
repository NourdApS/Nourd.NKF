---
id: adr-0126
type: decision
title: "ADR 0126: Adopt The NKF 0.7 Verifiable Delta Review Direction"
summary: Adopt the NKF 0.7 Design direction that makes semantic review carry-forward digest-bound and computable, confines fresh review to a declared per-rule semantic delta, neutralizes state-baked identity and paths, reconciles the release-confirmation ordering with a mandatory audit-bound confirmation Decision, and cuts the live support window to current plus one predecessor until further notice, without accepting an authority pair or authorizing publication.
created_at: 2026-08-14T21:40:00Z
---

# ADR 0126: Adopt The NKF 0.7 Verifiable Delta Review Direction

## Context And Problem

Every producer promotion requires a fresh whole-root semantic review whose
size grows monotonically by construction. The
[source-grounded assessment](../evidence/audits/nkf-028-nkf-0-7-source-grounded-assessment.md)
under [NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md)
proves the failure is already real: the current sealed baseline is a delta
re-affirmation forced to claim a whole-root review because no delta claim
exists, judgment bases carry no digests so carried and performed judgments
are indistinguishable, and the bundle root record asserted NKF 0.4 as
current authority through three successive whole-root reviews that sealed it
unread. Connected repairs share the same evidence: five predecessor versions
are live-implemented for consumers that do not exist, one living record and
thirty-five stable paths bake version or state into identity, the accepted
release protocol demands a confirmation Decision the prepublication lock
forbids authoring, and the 0.6 release left three test-harness defects.

The [NKF 0.7 Verifiable Delta Review Design](../designs/items/nkf-0-7-verifiable-delta-review.md)
proposes one NKF 0.7 successor addressing all of it, with every originally
reserved matter resolved by the Human Product Owner before this adoption.

## Decision

Adopt the exact direction proposed by the
[NKF 0.7 Verifiable Delta Review Design](../designs/items/nkf-0-7-verifiable-delta-review.md):

1. Digest-bound review baselines: every judgment binds the judged node
   revision digest and its basis digest; carry-forward is computed from
   digest identity, recorded as carried with performing-baseline provenance,
   and never asserted by a reviewer.
2. A per-rule version-delta declaration in each new accepted authority,
   classifying every rule as identical, mechanically transformable with a
   stated proof obligation, or semantically new, seeded by a deterministic
   registry diff and judged by the named reviewer.
3. A `semantically-reviewed-delta` claim admitted only when the freshly
   reviewed set contains the deterministically computed re-review closure,
   refused otherwise with the missing set named, with whole-root review as
   the recovery path.
4. Persisted Decision classifications keyed on Decision record digest and
   purpose.
5. Deterministic review and record-declaration scaffolds that supply
   structure and never a judgment.
6. Identity succession and lifecycle-neutral paths: the consolidated
   current-system record is renamed to `nkf-current-system` under an
   explicit succession rule; the thirty-five state-baked stable paths
   migrate to `tasks/items`, `designs/items`, and `realizations/items`; new
   living identifiers and stable paths must not assert version, state,
   disposition, or currency.
7. Operational-fact triggers: nodes declaring release-coordinate facts are
   mechanically invalidated by a version promotion into a post-promotion
   reconciliation set that blocks readiness, never demanding pre-promotion
   authoring.
8. Reconciled release-confirmation ordering: the technical-confirmation
   Decision is a post-audit, outside-the-archive record with a defined slot
   between the clean independent audit and publication. It is mandatory for
   every future release, with no waiver, and is invalid without the bound
   fresh independent audit of the exact candidate.
9. The live support window is the current version plus one predecessor.
   Until further explicit Human Product Owner notice this policy holds even
   after the first external adoption; older repositories migrate through
   their own immutable published archives as stepping stones, and the Adopt
   preflight names the exact stepping-stone archive.
10. The delta machinery is format meaning for every adopted repository;
    consumer-shaped Product and Technology fixtures must prove carry-forward,
    closure, and refusal behavior.
11. Test-harness corrections: knowledge-proportional bounds for
    repository-scaled exercises, child-process reaping on timeout, and a
    generalized recommended-release verifier.
12. The undeclared non-Markdown provenance files are classified as a closed
    provenance-attachment class.
13. Bootstrap by deliberate choice: NKF 0.7 performs one last whole-root
    review at its own producer promotion and seals the first fully
    digest-bound baseline; the promotion away from 0.7 is the first that
    must be provable on delta review alone. NKF 0.6-to-0.7 may be breaking;
    published 0.1 through 0.6 bytes change under no circumstance.

## Scope And Applicability

This Decision adopts the Design direction for the NKF 0.7 work owned by
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md).
It governs derivation of the exact NKF 0.7 authority pair and its
implementation, fixtures, migration, release process, and producer
promotion. Large-monolith onboarding, NKF 1.0, repository visibility,
trademark and community policy, and the protected merge gate owned by
[NKF-012](../tasks/deferred/NKF-012-activate-protected-merge-gate.md) remain
outside it.

## Rationale

Whole-root review at the current size is performed nominally and the format
cannot detect the difference, so the review that protects semantic currency
is itself unverifiable — the assessment's stale-root-record finding
demonstrates the consequence. Binding judgments to digests makes the review
economics honest in both directions: unchanged knowledge mechanically keeps
its review, and everything a version actually touches provably gets fresh
eyes. Placing the per-rule delta declaration in accepted authority rather
than tool behavior keeps semantic classification with its authority and
prevents the updater from minting false conformance. The window cut removes
a growing surface that protects no one while published archives already
carry every version permanently. The mandatory audit-bound confirmation
Decision converts the 0.6 ordering exception into a satisfiable rule.

## Alternatives Considered

The Design records the rejected alternatives with reasons: proving
carry-forward on 0.7 itself (rejected for safety by the Human Product
Owner), shipping the machinery with whole-root review still mandatory,
trusting the reviewer's delta statement without a computed closure, keeping
every version live, aliasing the stale identifier instead of succeeding it,
and authoring the confirmation Decision before promotion.

## Consequences And Trade-Offs

NKF 0.7 becomes a larger, likely breaking release: baseline contract, claim
vocabulary, identity succession, path migration, window cut, and protocol
reorder land together. The compensations are that breaking is cheap while
the producer is the only adopter, that the one deliberate migration also
carries the [NKF-025](../tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md)
and [NKF-026](../tasks/active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
conclusions, and that every later release
inherits a bounded, verifiable review obligation instead of an unbounded
nominal one. Removing live predecessor support makes stepping-stone
migration the only path for pre-0.6 repositories, which the direction
accepts and signals explicitly.

## Non-Claims

This Decision accepts no NKF 0.7 authority pair, no schema, checker,
adopter, or fixture bytes, and no migration. It confirms no Realization,
establishes no conformance, authorizes no publication, recommendation,
producer promotion, or visibility change, and concludes no Task. The Design
remains proposal knowledge with an adopted disposition; normative NKF 0.7
meaning requires the separately accepted authority pair and the mandatory
audit-bound confirmation Decision this direction itself defines.
