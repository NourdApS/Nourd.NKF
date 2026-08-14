---
id: design-nkf-028-verifiable-delta-review
type: design
title: NKF 0.7 Verifiable Delta Review
summary: This Design proposes one NKF 0.7 successor that binds every semantic review judgment to digests, computes carry-forward and required re-review deterministically, confines fresh review to a declared per-rule semantic delta, neutralizes state-baked identity and paths, reconciles the release-confirmation ordering, and cuts the live support window to the current version plus one predecessor.
created_at: 2026-08-14T21:20:00Z
---

# NKF 0.7 Verifiable Delta Review

## Design Kind Problem And Scope

This is a Technology contract, review, authoring, release, compatibility, and
distribution Design under
[NKF-028](../../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md).
It proposes one NKF 0.7 successor to the immutable published NKF 0.6 set.

Every producer promotion currently requires a fresh whole-root semantic
review whose size grows monotonically: the sealed 0.6 baseline carries 287
node revisions, roughly 861 applicability judgments, and 366 Decision
classifications, and each release adds nodes and Decisions that are all
re-judged. The
[source-grounded assessment](../../evidence/audits/nkf-028-nkf-0-7-source-grounded-assessment.md)
proves the failure mode is already real: the current sealed baseline is a
delta re-affirmation forced to claim a whole-root review because no delta
claim exists, and the bundle root record still asserted NKF 0.4 as current
authority through three successive whole-root reviews that sealed it unread.
Judgment bases carry no digests, so a carried judgment and a performed
judgment are indistinguishable, and the format cannot detect a nominal
review.

The same assessment grounds the connected repairs this Design carries: the
live checker implements five predecessor versions for consumers that do not
exist, one living record and thirty-five stable paths bake version or state
into identity, the accepted release protocol demands a confirmation Decision
the prepublication lock forbids authoring, and the 0.6 release left three
test-harness defects.

This Design does not add large-monolith onboarding, does not declare NKF 1.0,
does not change repository visibility, and does not touch the protected merge
gate owned by
[NKF-012](../../tasks/deferred/NKF-012-activate-protected-merge-gate.md).

## Governing Inputs And Constraints

[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
adopts the freshness and deterministic knowledge-graph direction this Design
extends: the canonical graph stays authored durable input, projections and
freshness stay derived, and semantic review is never deterministic proof.
[ADR 0096](../../decisions/0096-deterministic-governed-mechanics.md) and
[ADR 0098](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md)
fix the boundary this Design must not cross: deterministic commands own
closed mechanics and never supply meaning, and semantic gates precede
mechanics. [ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
freezes published sets and requires exact-candidate proof and independent
audit; [ADR 0121](../../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md)
strengthened that proof to cover ordinary authoring before publication, and
0.7 preserves it. [ADR 0125](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md)
accepts the immutable 0.6 predecessor authority this Design measures every
change against.

The Human Product Owner confirmed the governing boundaries in the [NKF-028](../../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md)
planning conversation, recorded in the owning Task: deterministic adoption is
earned per version and fails closed; reviews, acceptances, and confirmations
carry forward by digest identity or not at all; the per-rule delta
declaration is accepted authority, not tool behavior; 0.7 takes one last
whole-root review at its own promotion; the support window becomes current
plus one predecessor conditional on zero external adopters; 0.6-to-0.7 may
be breaking; and the delta machinery is format meaning for every adopted
repository, with the producer as proof obligation only.

## Proposed Direction

### Digest-Bound Review Baselines And Computed Carry-Forward

Every judgment in a reviewed baseline — each node applicability judgment,
each Decision classification, and each observation — binds the digest of the
judged node revision and the digest of the exact basis content it cites, in
addition to the basis locator it carries today. Decision classifications key
on the Decision's record digest and purpose. A successor baseline may carry a
prior judgment only when the judged node revision, the basis digest, and
every rule the judgment depends on are unchanged; the carrying is computed by
the tool and recorded as carried, never asserted by a reviewer. A carried
judgment names the baseline it was performed in, so provenance survives any
number of carries.

### Per-Rule Version-Delta Declaration

Each new authority version declares, for every rule in its registry, whether
the rule is `identical` to its predecessor, `mechanically-transformable` with
a stated transformation and proof obligation, or `semantically-new`. The
declaration is part of the accepted authority pair and is itself
digest-bound. A deterministic diff of the two rule registries seeds the
table — the 0.6 registry carries 503 rules — and rule renames require an
explicit identity mapping; the named reviewer judges only the non-identical
remainder, and the acceptance of the authority pair accepts the declaration
with it. The updater derives what it may do mechanically from this
declaration and refuses to act where the declaration is absent, ambiguous,
or unsupported.

### Delta Review Claim And Fail-Closed Closure

A new claim, `semantically-reviewed-delta`, joins the existing whole-root
claim. For a delta claim the checker computes the required re-review closure
deterministically from the digest deltas, the authored graph, the evaluation
policy, and the semantically-new rule closure, and accepts the claim only
when the freshly reviewed set contains the computed closure. A claimed delta
smaller than the computed closure is refused with the missing set named.
Whole-root review remains valid and is the recovery path whenever
completeness is missing, disputed, or unprovable. The claim records both the
computed closure and the freshly reviewed set, so an auditor can verify the
bound without recomputing it.

### Deterministic Scaffolds

A `review --scaffold` subcommand emits the exact review universe for the
pending claim — carried judgments prefilled and marked carried, the required
fresh set emitted with empty judgments — leaving state, role, classification,
finding, and dispute values to the named reviewer. A record-declaration
scaffold emits the exact declaration skeleton for a new governed record or
document from its Markdown source, closing the gap that today forces
hand-authoring the declarations the protocol says commands should perform.
Both scaffolds are mechanics: they supply structure and never a judgment.

### Identity Succession And Lifecycle-Neutral Paths

An identity-succession rule lets a living record's stable identifier be
renamed in one governed act that records the predecessor identifier, the
succession provenance, and the effective baseline; prior baselines, receipts,
and immutable records keep the old identifier as correct historical fact,
and the checker resolves the succession chain when verifying carried
judgments. Under that rule the consolidated current-system record's
version-baked identifier is renamed to the Human-Product-Owner-confirmed
version-free identifier `nkf-current-system`. One deliberate
governed migration moves the thirty-five state- and currency-baked stable
paths — the legacy `tasks/active`, `tasks/completed`, `tasks/deferred`,
`tasks/cancelled`, `designs/active`, and `realizations/current` trees — to
the confirmed lifecycle-neutral locations extending the existing
`tasks/items` pattern: `designs/items` and `realizations/items`. The
migration rewrites declarations, navigation, and links
mechanically while leaving immutable record meaning untouched. New living
identifiers and new stable paths must not assert version, lifecycle state,
disposition, or currency; immutable version-scoped snapshots keep their
version-bearing identifiers. Obsolete legacy locks whose predecessor
migration completed, including the bundle root record's, are removed in the
same pass.

### Operational-Fact Triggers

A node whose meaning states an operational release fact — the current
version, the recommended release, the installed pin — declares that
dependency explicitly. A version promotion mechanically invalidates every
declaring node into a post-promotion reconciliation set that blocks
readiness until each node is reconciled and re-reviewed. The trigger fires
after promotion and never demands pre-promotion authoring, so the
prepublication lock is never asked to admit governed edits. The bundle root
record is the first declared subject and its reconciliation to 0.7 is part
of the 0.7 producer promotion.

### Release-Confirmation Ordering

The release protocol is reordered to use the boundary the accepted 0.6
authority already states: governance records created after an exact
candidate is audited may bind its release commit and digests while remaining
outside the archive. The technical-confirmation Decision becomes exactly
such a post-audit, outside-the-archive record with a defined slot between
the clean independent audit and publication, authored on the release branch
without invalidating the review bound to the release commit, because review
binding excludes the post-audit governance records by contract. The Human
Product Owner resolved on `2026-08-14` that this confirmation Decision is
mandatory for every future release with no waiver, and that it must bind the
fresh independent audit of the exact candidate: a confirmation without its
audit evidence is invalid, and publication without the confirmation Decision
is a protocol violation rather than an exception. The 0.6 publication-order
exception is thereby made unnecessary rather than repeated.

### Support Window And Stepping-Stone Migration

The live checker and adopter implement the current version plus one
predecessor — for 0.7, exactly 0.7 and 0.6. Live 0.2 through 0.5 contract
sets, Schemas, fixtures, dispatch, migration code, and distribution trees
are removed from the working tree; every published archive remains the
immutable, self-contained authority for its version. An older repository
migrates by stepping through published archives, each hop using that
archive's own adopter with an explicit archive and digest, and the Adopt
compatibility preflight names the exact stepping-stone archive instead of
refusing unexplained. The window policy is recorded in the authority as
conditional on the standing fact that no external repository has adopted any
NKF release. The Human Product Owner resolved the widening question on
`2026-08-14`: until further explicit Human Product Owner notice, the window
remains the current version plus one predecessor even after the first
external adoption, with stepping-stone migration through published archives
as the permanent path for everything older. No adoption event widens the
window by implication.

### Consumer Applicability And Fixtures

The delta machinery is format meaning for every adopted repository: a
consumer's version upgrade re-reviews only the declared semantic delta
closure over its own knowledge, and a consumer's ordinary authoring reseal
covers the computed impact closure of the edit instead of nominally
re-affirming the whole root. Product-profile and Technology-profile fixtures
prove carry-forward, closure computation, and refusal behavior on
consumer-shaped bundles, not only on the NKF producer, so the closure rules
are not overfitted to the producer's topology.

### Harness Provenance And Predecessor Conclusions

Repository-scaled test exercises derive their hang bounds from knowledge
size while fixture-bound tests keep the static default; a timed-out exercise
reaps its adopter child process so no orphan poisons later runs; and the
recommended-release verifier reads the version and compatibility table from
the release inputs instead of hand-edited literals, generalizing the
per-version script accumulation. The undeclared non-Markdown provenance
files under the knowledge root are classified explicitly as a closed
provenance-attachment class visible to the graph as inert attachments. The
stale [NKF-025](../../tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md)
and [NKF-026](../../tasks/active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
conclusions are performed under the owning Task with the corrected
mechanics, the explicit Human Product Owner exception for the
never-performed 0.5 post-adoption audit, and the historical pull-request
ordering violation recorded as fact.

### Compatibility And Versioning

NKF 0.7 is classified against immutable 0.6 explicitly and may be breaking
where breaking is cleaner; the baseline contract, claim vocabulary, and path
migration are expected to make it breaking. The 0.7 producer promotion
performs one last whole-root semantic review and seals the first fully
digest-bound baseline; by construction the promotion away from 0.7 is the
first that must be provable on delta review alone. Published 0.1 through 0.6
bytes change under no circumstance.

## Responsibilities Interactions And Information Flows

The accepted authority pair owns the baseline contract, claim vocabulary,
per-rule delta declaration, identity-succession rule, operational-fact
trigger meaning, window policy, and reordered release protocol. The checker
owns deterministic closure computation, carried-judgment verification, delta
claim admission, and refusal diagnostics. The adopter owns scaffolds, the
identity and path migration, promotion reconciliation mechanics, and
stepping-stone signaling. The named reviewer owns every fresh judgment; the
Human Product Owner owns adoption, acceptance, exceptions, and the widening
choice. Baselines flow from review through seal to checker verification;
promotions flow from recommendation through Adopt to the reconciliation set;
nothing in that flow converts a computation into acceptance or confirmation.

## Alternatives And Trade-Offs

### Prove Carry-Forward On 0.7 Itself

Declaring 0.7's own rule delta and carrying the 0.6 judgments through a
declared transform would deliver the criterion one release earlier and test
the design on its hardest case. Rejected by the Human Product Owner for
safety: the mechanism would be proving itself with itself on its first
outing. 0.7 takes one last whole-root review; fixtures and the isolated
producer rehearsal prove the machinery instead.

### Ship The Machinery But Keep Whole-Root Review Mandatory

Shipping digests and scaffolds while keeping the whole-root claim mandatory
until a later release flips the switch splits one idea across two releases
and delays the payoff without reducing risk that fixtures cannot already
cover. Rejected.

### Trust The Reviewer's Delta Statement

Adding a delta claim that records the reviewer's asserted coverage without a
computed closure is the cheapest change and exactly reproduces the current
failure: an unverifiable assertion, now with official vocabulary. Rejected
as minting the false conformance this Design exists to prevent.

### Keep Every Version Live

Retaining live 0.2 through 0.5 support preserves a checker, fixture, test,
and audit surface that protects no one — no external repository has ever
adopted any release — and the surface grows with every version. Rejected;
published archives already carry each version completely and permanently.

### Alias The Stale Identifier Instead Of Succeeding It

Keeping [`nkf-0.1-native-realization`](../../realizations/current-system.md) and adding a display name would leave
every future baseline, receipt, and reference keyed to an identifier that
asserts a false version forever, and would set the precedent that identity
hygiene is cosmetic. Rejected in favor of explicit governed succession with
preserved history.

### Author The Confirmation Decision Before Promotion

Admitting a pre-promotion authoring exception for the confirmation Decision
would re-open the prepublication lock that protects the reviewed release
commit and would invalidate the whole-root review it is bound to — the exact
contradiction 0.6 recorded. Rejected in favor of the post-audit
outside-the-archive slot the accepted 0.6 text already permits.

## Failure Safety Recovery And Operations

Every new mechanism fails closed: an absent, ambiguous, or unsupported delta
declaration blocks the updater; a delta claim smaller than the computed
closure is refused with the missing set named; an unresolvable succession
chain, an unreconciled operational-fact node, or a missing stepping-stone
archive blocks readiness; and whole-root review remains the universal
recovery path. The identity and path migration is transactional with
complete rollback, and its failure leaves the predecessor tree untouched.
Removal of live predecessor support cannot strand a repository: every
published archive remains available, self-contained, and content-addressed.
Test-harness reaping guarantees a timed-out exercise cannot corrupt the
evidence of a later one.

## Validation And Decision Evidence

The [source-grounded assessment](../../evidence/audits/nkf-028-nkf-0-7-source-grounded-assessment.md)
grounds every problem claim with exact files and lines: the measured
baseline blocks, the forced whole-root claim over an actual delta review,
the stale bundle root record sealed by three reviews, the thirty-five
state-baked paths, the 54 undeclared provenance files, the
catalog-independent migrate path that makes stepping stones viable, the
503-rule declaration scale, the exact protocol clauses in contradiction, and
the harness defect locations. Pre-acceptance evidence must prove digest
carry-forward, closure computation, and refusal behavior on exact Product
and Technology fixtures and on an isolated copy of the real producer before
the authority pair is accepted; the exact-candidate exercise and fresh
independent audit then prove the complete release before the reconciled
confirmation ordering and any separately authorized publication.

## Unresolved Matters

No matter remains unresolved. The four matters this Design originally
reserved were each resolved by the Human Product Owner on `2026-08-14`
before adoption, and the resolutions are recorded in the sections above:
the support window stays current plus one predecessor until further explicit
Human Product Owner notice, with no widening by adoption event; the
consolidated current-system record's successor identifier is
`nkf-current-system`; the neutral directories extend the `tasks/items`
pattern as `designs/items` and `realizations/items`; and the post-audit
technical-confirmation Decision is mandatory for every future release, with
no waiver, and is invalid without the bound fresh independent audit of the
exact candidate.
