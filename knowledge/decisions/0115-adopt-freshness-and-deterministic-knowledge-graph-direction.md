---
title: "ADR 0115: Adopt Freshness And Deterministic Knowledge Graph Direction"
id: adr-0115
type: decision
summary: Adopt the evidence-bounded Product direction for declared knowledge graphs, contextual freshness, conservative impact review, stable document nodes, and revision-bound readiness without accepting or implementing NKF 0.5.
created_at: 2026-08-12T20:07:31Z
record_lifecycle: immutable
record_status: accepted
task: NKF-025
decision_authority: Codex technical reviewer under the Human Product Owner's explicit delegation to confirm exact alignment with the already-confirmed Product boundaries
---

# ADR 0115: Adopt Freshness And Deterministic Knowledge Graph Direction

## Context And Problem

NKF 0.4 binds exact sources, artifacts, typed relationships, lifecycle
metadata, validation snapshots, acceptance provenance, and Realization
confirmation, but it does not determine which governed knowledge needs
semantic review after a change or whether every applicable subject remains
current for one declared purpose.

[NKF-025](../tasks/completed/NKF-025-validate-freshness-and-knowledge-graph-direction.md)
inventoried the resulting staleness and contradiction risks, tested a
disposable evaluator against controlled Product and Technology fixtures, and
exercised the actual NKF Technology repository in a separate detached
worktree. Two independent audit rounds rejected defective intermediate
targets, and the corrected exact checkpoint passed the focused evaluator and
canonical producer gate without claiming production readiness.

The Human Product Owner confirmed the Product boundaries individually on
`2026-08-12`, then explicitly delegated confirmation of the exact consolidating
record to the Codex technical reviewer. The Decision must preserve those
boundaries exactly while keeping unresolved serialization, policy, migration,
implementation, and release work outside this evidence-only Task.

## Decision

On `2026-08-12`, the Codex technical reviewer, acting under the Human Product
Owner's explicit delegation, confirms that this exact Design revision
faithfully consolidates the already-confirmed Product boundaries and records
their adopted direction:

| Design | Accepted SHA-256 |
| --- | --- |
| [NKF Freshness And Deterministic Knowledge Graph](../designs/adopted/freshness-and-deterministic-knowledge-graph.md) | `b1f47ce3e3ffbfb74c453696989358e3020269a7f6ee22b5caf55fd01fa00d8a` |

The Human Product Owner remains the source authority for every substantive
Product boundary. This delegated exact-record confirmation adds no new Product
meaning.

The adopted direction establishes:

1. canonical Markdown owns durable human meaning; meaning-bearing YAML owns
   declared lifecycle, governance, source binding, freshness policy,
   invalidation triggers, successors, and typed graph relationships;
   applicability, freshness, impact closure, navigation, and receipts remain
   derived operational projections rather than a second authority;
2. stable identifiers, not paths, define node identity; records and
   independently addressable entities participate in one declared graph, and
   every governed non-record requiring an individual freshness result receives
   a stable Common `document` node without becoming a record or gaining
   governing authority;
3. relationship facts are authored once in a canonical semantic direction and
   bind the exact Markdown section supplying their meaning; semantic
   vocabulary remains distinct from a separately versioned evaluation policy,
   while inverse edges and backlinks are generated;
4. every evaluation binds an explicit candidate universe, purpose, revisions,
   policy, changed inputs, external observations, authority observations, and
   baseline-completeness state; the initial purposes are `change-impact`,
   `whole-root-readiness`, `consequential-use`, and
   `historical-reproduction`;
5. applicability, participation role, authority eligibility and exact
   binding, freshness, and conformance remain separate axes; one full graph
   preserves history, one applicable graph carries every relevant current and
   noncurrent subject, and one current graph is only the current subset;
6. impact review starts from exact changed inputs and traverses only
   policy-selected propagation directions to a deterministic, cycle-safe fixed
   point with reason paths; context and historical relationships stay
   discoverable but do not independently expand mandatory review;
7. relevant accepted Decisions are classified with an explicit basis as
   `compatible`, `extends`, `supersedes`, `conflicts`, or `not-applicable`, and
   an unresolved applicable conflict blocks acceptance and Task completion;
8. freshness results are `current`, `stale`, `expired`, `invalidated`, and
   `unknown`; every simultaneously applicable noncurrent result and its reasons
   are preserved, presentation may not discard them, and `current` applies
   only when no noncurrent result applies;
9. readiness requires a named human or agent to semantically review and
   confirm the exact graph baseline with revision-bound evidence; missing,
   outdated, disputed, ambiguous, unsupported, or unobservable required input
   produces `unknown`, blocks the relevant claim, and uses whole-root semantic
   review as recovery;
10. exact revision and governed-artifact binding mismatches are deterministic
    hard blockers; uncertain non-context and non-historical relationships
    default to review, and NKF does not standardize broader hard-versus-review
    behavior until governed, versioned consumer evidence supports it;
11. lifecycle changes occur in declarations while stable identity and durable
    Markdown meaning remain unchanged; generated lifecycle navigation and
    read-only virtual frontmatter may project state without becoming
    authority; and
12. NKF itself must adopt every new NKF version through two audited stages:
    exact-candidate Adopt in a fresh isolated clone before publication, then
    ordinary public self-adoption of the immutable published release before
    the producer branch merges.

## Scope And Applicability

This Decision adopts a Common Product direction for Product and Technology
repositories. The selected Root Profile continues to own profile-specific
meaning, topology, applicability, and additional governed inputs. This
direction does not create another Root Profile or a generic fallback.

Deriving an exact NKF 0.5 authority-pair candidate remains work for a future
Task that must itself receive separate human direction before it is opened or
begun. That later work must resolve and audit the exact YAML shapes, node
revisions, relationship-policy mapping, baseline-confirmation evidence,
receipt storage and privacy, generated navigation, migration, compatibility,
checker, adopter, and release mechanics. It may not weaken the confirmed
fail-closed defaults by treating technical derivation as new Product
authority.

[NKF-005](../tasks/deferred/NKF-005-validation-expiry-and-authority-freshness.md)
continues to own any universal validation-expiry or separate authority-
freshness question not resolved by the contextual document-freshness
direction. External systems retain authority for their own data; a URL alone
never becomes graph identity or proof of current external state.

## Rationale

The controlled Product and Technology oracles demonstrate that a declared
graph and versioned policy can calculate small reproducible review closures
without rereading unchanged knowledge. The actual NKF exercise demonstrates
the corresponding safety condition: its sparse declared graph omitted the
active Task from a Draft Design change closure, so unconfirmed completeness
blocked rather than silently returning a false current result. Supplying the
reviewed relationship produced the exact two-subject closure without making
the whole root mandatory.

Stable `document` nodes preserve independent Task and Evidence freshness
without promoting non-records into governing records. Separate axes prevent a
conformant but stale Realization, an applicable but non-governing Evidence
record, or a historical but non-applicable Decision from collapsing into one
misleading state. Revision-bound receipts make unchanged review reusable while
making changed inputs invalidate reuse deterministically.

The bounded model is intentionally honest about its epistemic limit: software
cannot prove that an undeclared semantic relationship does not exist. Named
baseline review, blocking `unknown`, conservative propagation, whole-root
recovery, and explicit reason paths preserve that uncertainty instead of
turning determinism into a false completeness claim.

## Alternatives Considered

Reviewing every document semantically after every change was retained as the
recovery oracle but rejected as the normal workflow because cost scales with
the whole root and unchanged knowledge is repeatedly reread. Writing computed
state into canonical Markdown was rejected because evaluation would mutate the
revision it evaluates. Inferring authoritative edges from links, layout,
embeddings, or AI was rejected because impact could change nondeterministically
or silently shrink.

Per-repository impact labels were rejected as the default because a repository
could weaken equivalent semantic relationships. A single intrinsic document
state was rejected because applicability and freshness depend on purpose,
context, authority, revision, and observations. Deterministic output without a
whole-root oracle was rejected because a deterministic algorithm can remain
consistently incomplete.

## Consequences And Trade-Offs

NKF 0.5 derivation now has a fixed safety boundary but substantial technical
work remains. Initial adoption requires a semantic graph-baseline review, and
an incorrectly confirmed incomplete baseline can still hide an undeclared
relationship. False positives are therefore retained until evidence supports
a governed policy refinement, while any detected false negative blocks the
affected policy.

Authors gain stable durable documents and targeted semantic review, but they
must declare relationship meaning and preserve reviewer provenance. Checkers
can validate declarations, bindings, closure reproduction, receipts, and
mechanical whole-root coverage; they cannot establish semantic truth,
acceptance, Realization confirmation, or universal completeness.

Adoption of this direction changes no NKF 0.4 byte. Any implementation belongs
to a separately accepted NKF 0.5 authority pair and must complete exact-
candidate self-adoption, independent audit, immutable publication, ordinary
producer self-adoption, and post-adoption audit before merge.

## Non-Claims

This Decision does not:

- accept an NKF 0.5 Specification or executable companion;
- define exact Schemas, policy serialization, relationship mapping, receipt
  operations, migration, compatibility, checker, adopter, or release bytes;
- confirm a production Realization or make the experimental evaluator one;
- establish that the current NKF repository has a complete confirmed graph
  baseline;
- publish, recommend, or adopt NKF 0.5 in any repository;
- accept consumer knowledge or external-system observations;
- implement deferred [NKF-021](../tasks/deferred/NKF-021-task-scope-gate.md);
- establish acceptance-binding verification, remote protection, or Governing
  Use readiness; or
- make passing validation, deterministic output, or independent audit an
  acceptance act.
