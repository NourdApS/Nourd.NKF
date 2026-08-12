# NKF-025 NKF 0.4 Freshness And Graph-Gap Inventory

## Evidence Boundary

This Evidence supports
[NKF-025](../../tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md).
It reviews the complete accepted NKF 0.4 Common, Product, and Technology
meaning together with this repository's current declarations and consolidated
[current-system Realization](../../realizations/current-system.md). It records
what NKF 0.4 can detect, where governed knowledge may become noncurrent, and
which gaps a disposable successor prototype must test.

The review does not accept a graph vocabulary, freshness policy, Design,
Specification, executable contract, implementation, or release. It does not
claim that every absent relationship is a defect. It does establish that the
currently declared graph is insufficient to derive a complete semantic impact
set for this repository.

## Sources And Method

The review inspected:

- the complete accepted
  [NKF 0.4 Specification](../../specifications/nkf-0.4.md) and exact executable
  companion at `contracts/nkf/0.4/nkf.yaml`;
- accepted Decisions governing Markdown/YAML authority, semantic topology,
  external authority, enforcement, Product and Technology profiles, Decision
  applicability, deterministic mechanics, publication freeze, and exact 0.4
  authority;
- the complete `.nourd/knowledge/bundle.yaml` and all 160 record declarations
  under `.nourd/knowledge/records/`;
- the current consolidated and supporting Realizations, Task and Design
  lifecycle surfaces, Evidence corpus, governed-artifact registry, and latest
  validation-result behavior; and
- the canonical `npm run nkf:check` handoff after Task allocation.

The declaration inventory was computed directly from strict-parsed YAML. It
counted record and non-record surfaces, relationship vocabulary actually in
use, semantic entities, external authorities, bindings, and governed
artifacts. The semantic review then compared each knowledge kind and
consequential-use axis against 0.4's existing deterministic controls.

## Current Deterministic Strengths

NKF 0.4 already prevents several forms of silent drift:

| Existing Control | What It Detects | What It Does Not Establish |
| --- | --- | --- |
| Markdown source digest in each record declaration | The canonical Markdown bytes changed without a matching declaration update | Whether unchanged prose remains true or applicable after another subject changed |
| Strict YAML and Schema validation | Invalid shapes, unsupported fields, and malformed governed declarations | Semantic truth, completeness, or a missing but undeclared relationship |
| Source-bound sections and typed relationships | Relationship endpoints and cited source sections resolve under the closed 0.4 vocabulary | Whether the relationship claim is true, whether every material edge was declared, or how change propagates |
| Design, Task, and placement rules | Declared lifecycle state agrees with required path and navigation | Whether a still-active proposal or Task remains semantically current |
| Decision Applicability Gate | Each Task visibly records accepted Decisions and mandatory capabilities in a mechanically valid form | Whether extraction is complete or an applicable older Decision was omitted |
| Governed-artifact digests | Bound implementation bytes changed | Whether unchanged bytes still realize newer accepted meaning or behave correctly |
| Realization confirmation metadata | The record distinguishes confirmed and unconfirmed scope | Automatic invalidation when realized meaning, dependencies, or external systems change |
| Full-bundle validation snapshot | Any declared Governed Validation Input changes and the old result becomes verification-outdated | Which subset needs semantic review or whether an unchanged external fact became stale |
| Optional acceptance-binding resolution | A configured authority can verify, contradict, revoke, or supersede an exact acceptance event | Universal authority freshness, required polling, offline unavailability policy, or hidden authority changes |
| Provenance source metadata | A source may record revision, observation time, last-modified time, and digest | `stale_after`, expiry, invalidation consequences, or a universal freshness rule |
| Publication freeze | Published complete-set bytes cannot be silently replaced under one NKF version | Whether living repository knowledge and operational recommendation remain semantically aligned afterward |

These controls are necessary foundations. None can be honestly renamed a
universal document-freshness or deterministic impact mechanism.

## Declared-Graph Baseline

The active repository declares:

| Surface | Count |
| --- | ---: |
| Governed record declarations | 160 |
| Governed non-record declarations | 109 |
| Governed artifacts | 162 |
| Records declaring at least one record relationship | 53 |
| Declared record-relationship edges | 68 |
| Records declaring semantic entities | 0 |
| Records declaring entity relationships | 0 |
| Records declaring external authorities | 0 |
| Realizations declaring durable bindings | 0 |

The 68 record edges use only six of the eleven native 0.4 relationship types:

| Relationship | Edge Count |
| --- | ---: |
| `extends` | 42 |
| `realizes` | 10 |
| `rationale-for` | 6 |
| `supersedes` | 6 |
| `governs` | 3 |
| `references` | 1 |

No record currently declares `depends-on`, `defines`, `applies-to`,
`evidences`, or record-level `part-of`. The absence of Product hierarchy is
expected because this repository is a Technology bundle; the other absences
show that the current declarations do not encode the dependencies needed for
change propagation.

Seventy accepted Decisions, all 30 Designs, six Realizations, and the one
Evidence record declare no record relationship. Many are valid standalone
historical records, so absence alone is not nonconformance. It does mean an
evaluator cannot derive complete relevance or impact from the existing graph
without a truthful baseline and a declared completeness boundary. Ordinary
Markdown links and Task-gate links cannot be promoted automatically because
NKF 0.4 correctly states that links, similarity, directory layout, and model
classifications do not create typed semantic relationships.

## Freshness And Staleness Failure Inventory

### Living Root And Product Or Technology Meaning

A living Product or Technology root can remain byte-identical while accepted
Decisions, Specifications, capabilities, risks, or external facts change its
accurate current description. The full-bundle snapshot detects only changed
governed inputs; it does not prove that the root was reviewed against them.
Required successor behavior is an impact path to the root, an applicability
evaluation, and a review receipt or blocking `unknown`.

### Active Designs

An active Design can become stale when governing requirements, rejected
alternatives, dependencies, or predecessor Decisions change. Placement still
truthfully says the proposal is active, but does not say it was reconsidered
against current authority. An omitted applicable conflict remains invisible
to deterministic validation.

### Accepted Decisions

An immutable Decision does not become historically false merely because a
successor exists. It can become non-applicable, superseded for a scope,
contradicted by its authority, or unsafe to use in a new context. NKF 0.4
preserves explicit `extends` and `supersedes` edges but has no contextual
Decision reconciliation result outside the manually authored Task gate.

### Tasks And Plans

A Task's intent, plan, and applicability gate may become stale after an
accepted Decision, architecture, provider, format, validation harness, or
mandatory requirement changes. The authoring protocol requires semantic
re-evaluation, but the checker cannot deterministically calculate the relevant
Decision set or detect an omitted Decision.

### Realizations

A Realization can become stale in at least four ways:

1. accepted meaning changes while its mapping prose and bound bytes do not;
2. governed artifact bytes change and a digest correctly fails;
3. implementation behavior changes through an unbound dependency,
   configuration, external service, or operational system while local bytes
   remain stable; or
4. confirmation Evidence no longer covers the current revision or context.

NKF 0.4 detects the second case. It records confirmation status and boundaries
for the others but does not derive invalidation. The consolidated
current-system Realization is therefore a particularly important successor
exercise: it must become review-required whenever any accepted or realized
surface it summarizes changes, without requiring a whole-root scan.

### Evidence

Fixed Evidence remains valid as a historical observation but may be expired
for a new claim, invalidated by a method defect, contradicted by later
Evidence, or outside a new applicability context. Observation time, source
revision, and last-modified time are optional provenance only. NKF 0.4 defines
no time policy, invalidation trigger, or evidence-suitability result.

### Specifications And Frozen Releases

An accepted versioned Specification and published release remain immutable
authority for their exact coordinate. They should not be rewritten as stale.
What can become noncurrent is their selection for a new evaluation,
recommendation, compatibility claim, public orientation copy, or consumer
pin. Version identity and historical reproduction must therefore remain
separate from present applicability and current recommendation.

### Navigation And Consolidated Orientation

Indexes and maps can be structurally complete yet semantically misleading.
The checker verifies lifecycle placement and exact navigation membership, but
not whether prose such as “current system,” “recommended,” or “supports” was
updated after a related change. Generated lifecycle navigation can eliminate
one drift class; consolidated human orientation still needs declared
dependencies and freshness review.

### Acceptance Binding And External Authority

An exact acceptance binding can be current when checked and later be revoked,
superseded, contradicted, or unavailable in its authoritative system without a
local byte changing. NKF cannot detect an unobservable event. A later contract
may require an observable revision, invalidation trigger, resolver result, or
freshness policy for consequential use; otherwise the honest result is
`unknown`, not `current`.

Universal validation-result expiry and authority-specific binding freshness
remain separately owned by
[NKF-005](../../tasks/deferred/NKF-005-validation-expiry-and-authority-freshness.md).
This inventory supplies relevant evidence but does not activate or absorb that
Task.

### Extensions And Resolvers

Extension support is bound to exact artifacts, but a registry decision,
resolver trust root, or externally hosted authority source may change outside
the bundle. Required unsupported extensions already fail closed. Freshness of
a once-supported external resolution still needs explicit observable state and
unavailability behavior.

### Cross-Repository Knowledge

NKF 0.4 deliberately defers cross-bundle identity and relationships. A local
repository cannot calculate impact from another repository unless the
dependency is represented by an exact external identity and observable
revision or invalidation contract. Automatic crawling or URL following would
be nondeterministic, authority-confusing, and unsafe.

### Semantic Entities And Bindings

NKF 0.4 supports independently addressable entities and Realization bindings,
but this repository declares none. Automatically converting headings or code
paths into entities would invent semantic identity. A successor baseline must
add only deliberately addressable nodes and source-bound relationships, then
derive inverse navigation without duplicate authored edges.

### Validation And Conformance Results

The latest `nkf.validation-result` is correctly operational and becomes
verification-outdated when a Governed Validation Input changes. That is
snapshot freshness, not document semantic freshness. It performs a complete
bundle check and provides no targeted semantic review set, applicability
projection, reason path, or historical evaluation receipt for a particular
change.

## Threat Classes For The Prototype

The prototype must reproduce at least these distinct cases:

| Threat | Expected Safe Behavior |
| --- | --- |
| Exact dependency revision changes | Every dependent node enters mandatory closure with a reason path |
| Realization remains byte-identical after governed meaning changes | Realization becomes review-required or stale until reconciled |
| Applicable accepted Decisions conflict | Conflict is explicit and blocks acceptance or Task completion |
| An accepted Decision is superseded only for a narrower scope | Historical Decision remains in the full graph; contextual applicability resolves without deletion |
| A bound artifact digest changes | Exact binding fails deterministically and propagates to its Realization and dependents |
| A material relationship is missing or ambiguous within the declared candidate universe | Result becomes `unknown`; the mandatory review set never silently shrinks |
| A context or historical-provenance edge changes | Edge remains discoverable but does not independently expand mandatory review |
| A dependency cycle exists | Closure terminates deterministically at a fixed point and records cycle-safe reasons |
| External authority has no observable revision or resolver result | Consequential freshness is `unknown`; no hidden network inference occurs |
| Time-bounded Evidence crosses declared expiry | Evidence is `expired` for the evaluated purpose while remaining historical Evidence |
| An explicit invalidation trigger fires | Affected node is `invalidated` without rewriting its canonical Markdown |
| A prior receipt is replayed after any bound input changes | Receipt is outdated or rejected; historical reproduction still verifies against original inputs |
| A stable path participates in lifecycle or freshness change | Canonical Markdown path and durable meaning remain unchanged; projections and receipts change |
| Existing repository lacks a complete baseline | Evaluation fails closed or expands conservatively; it never assumes undeclared edges are absent truth |

## Safety Findings

1. **“No document will ever become stale” is not a technically honest
   guarantee.** Semantic and external changes may be unobservable. NKF can
   instead guarantee that a bounded consequential-use evaluation never calls
   a document current when a declared dependency, policy, invalidation, or
   required review is unresolved; missing observability becomes `unknown`.
2. **Graph completeness must be bounded.** The evaluator can validate declared
   local candidates and required categories, but cannot prove that no
   relationship exists anywhere. The exact candidate universe and baseline
   status belong in every evaluation receipt.
3. **Impact policy must not hide inside relationship names.** Durable semantic
   meaning and versioned traversal behavior need separate authority so policy
   refinement does not silently redefine historical edges.
4. **The conservative default must prefer review over omission.** An uncertain
   non-context relationship begins as review-impacting. False positives are a
   measurable cost; a false negative is a blocking safety failure.
5. **Applicability is purpose-bound.** The same immutable Evidence or Decision
   can be current for historical reproduction and noncurrent for
   consequential use. Freshness cannot be one intrinsic lifecycle flag.
6. **Canonical Markdown cannot carry computed currentness.** Rewriting it on
   each evaluation would alter the content revision, create receipt cycles,
   and destroy stable historical meaning.
7. **A whole-root review remains the comparison oracle during development.**
   The impact evaluator is not trusted merely because its output is
   deterministic; controlled exercises must compare every closure with an
   independent semantic review of the full fixture.

## Initial Classification

This is a **Specification and contract gap**, not a checker bug or current
consumer nonconformance. NKF 0.4 explicitly leaves universal freshness,
staleness policy, and cross-bundle relationships unresolved, and its current
checker behaves consistently with that accepted boundary.

The existing semantic graph and validation snapshot are valid foundations but
are insufficient for the requested successor outcome. Any accepted addition
would change vocabulary, topology, validation semantics, migration, and
consequential-use behavior; under
[ADR 0113](../../decisions/0113-accept-the-nkf-0-4-authority-pair.md) it requires
a new Human Product Owner Decision and a later NKF version. This Task remains
evidence and Design work only.

## Limitations And Next Evidence

This inventory is a static authority and declaration review. It has not yet:

- implemented or run the disposable evaluator;
- established a truthful entity and relationship baseline for all 160 records;
- measured false positives, false negatives, review-set size, or token cost;
- tested Product-profile fixtures, external unavailability, expiry, or receipt
  replay; or
- independently audited the eventual prototype and Design claims.

Those are the remaining execution slices of
[NKF-025](../../tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md).
