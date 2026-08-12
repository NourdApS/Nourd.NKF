---
id: design-nkf-025-freshness-and-deterministic-knowledge-graph
type: design
title: NKF Freshness And Deterministic Knowledge Graph
summary: This Design proposes a declared local knowledge graph, separate versioned evaluation policy, computed freshness, contextual applicability, conservative change closure, and revision-bound receipts for evidence-led NKF 0.5 consideration.
created_at: 2026-08-12T17:06:00Z
record_lifecycle: living
record_status: draft
task: NKF-025
design_disposition: active
decision_authority: Human Product Owner, Nourd ApS
proposal_authority_effect: None; the direction remains a Draft Design until a later Decision adopts an exact revision, and normative NKF 0.5 meaning requires separate exact authority-pair acceptance.
proposal_evidence: NKF-025 NKF 0.4 freshness and graph-gap inventory plus the controlled prototype and whole-root comparison still to be produced.
implementation_evidence: None; the planned evaluator is disposable Task evidence and cannot establish production Realization.
---

# NKF Freshness And Deterministic Knowledge Graph

## Design Kind Problem And Scope

This is a Common knowledge-governance and deterministic-evaluation Design
under
[NKF-025](../../tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md).
It proposes how a later NKF version could calculate which governed knowledge
requires semantic review after a bounded change and prevent stale, expired,
invalidated, unknown, or unreviewed knowledge from being represented as
current for a declared purpose.

The initiating
[NKF 0.4 freshness and graph-gap inventory](../../evidence/audits/nkf-025-nkf-0-4-freshness-and-graph-gap-inventory.md)
finds that NKF already has source-bound typed relationships, exact source and
artifact digests, lifecycle metadata, optional acceptance-binding resolution,
and validation snapshots. It also finds no impact policy, graph-completeness
boundary, semantic-review receipt, universal document-freshness result, or
targeted review mechanism.

This Design covers Product and Technology bundles through Common semantics. It
does not define another Root Profile, make Product and Technology meaning
identical, infer external truth, turn AI review into deterministic proof,
replace [NKF-005](../../tasks/deferred/NKF-005-validation-expiry-and-authority-freshness.md),
or authorize production implementation. Exact serialization and evaluation
behavior remain subject to the controlled exercise and later Decision.

## Governing Inputs And Constraints

[ADR 0007](../../decisions/0007-markdown-yaml-authority.md) keeps canonical
Markdown as human normative meaning and executable YAML as its deterministic
companion. [ADR 0015](../../decisions/0015-semantic-topology-and-bindings.md)
already defines source-bound record relationships, semantic entities,
Realization bindings, external authorities, and the prohibition against
inferring graph meaning from links, layout, similarity, or runtime state.

[ADR 0017](../../decisions/0017-acceptance-provenance.md) and
[ADR 0019](../../decisions/0019-validation-enforcement-and-diagnostics.md)
require declared governance, exact acceptance binding, conformance,
Realization confirmation, external authority, and human semantic adequacy to
remain distinct. [ADR 0077](../../decisions/0077-decision-applicability-gate.md)
requires Tasks to carry applicable accepted Decisions and honest verification
levels but explicitly rejects mechanical semantic-contradiction detection as
proof.

[ADR 0049](../../decisions/0049-common-and-root-profiles.md) permits Common to
own only genuinely identical Product and Technology mechanics. The selected
profile continues to own its root-specific bodies, topology, applicability,
relationships, and additional governed inputs. A Common graph cannot become a
generic fallback profile or weaken profile validation.

[ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
and [ADR 0113](../../decisions/0113-accept-the-nkf-0-4-authority-pair.md)
freeze every published 0.4 member. Any accepted vocabulary, topology,
validation, migration, or compatibility change requires a new version, Human
Product Owner Decision, exact authority pair, derived implementation,
candidate exercise, independent audit, and deliberate adoption.

The core safety boundary is epistemic: NKF can evaluate declared and
observable inputs. It cannot guarantee that an undeclared relationship or
unobservable external event does not exist. A safe result therefore binds an
explicit candidate universe and reports missing observability as `unknown`
rather than claiming universal truth.

## Proposed Direction

### Durable Meaning And Declared State

Canonical Markdown owns durable human meaning. The `.nourd` YAML declaration
owns machine-evaluable lifecycle, governance, source binding, freshness
policy, invalidation triggers, successor relationships, and graph edges.
Meaning-bearing YAML remains bound to exact Markdown sections where it makes a
semantic claim.

Computed applicability, freshness, impact closure, inverse edges, navigation,
and evaluation receipts are operational projections. They are not written
back into canonical Markdown and are excluded from the document's content
revision. A renderer may expose declared and computed state as read-only
virtual frontmatter, but that projection cannot become a second authority.

Lifecycle, freshness, and authority are independent. An immutable historical
Decision may be valid history while non-applicable to a new change. A living
Realization may be declared accepted while stale. An expired Evidence record
remains Evidence. A conformant document may still be `unknown` for
consequential use.

### Nodes Identity And Revision

Every governed record is one record node identified by its stable record ID.
An independently addressable semantic entity may be an entity node identified
by its stable record-scoped entity ID. Both participate in one logical graph;
headings, sections, ordinary links, code paths, and model-extracted concepts do
not become nodes automatically.

Paths are locators, not identity. A node revision is content-addressed from the
exact canonical Markdown bytes plus meaning-bearing YAML for that node.
Generated frontmatter, indexes, backlinks, computed states, receipts, and
validation results are excluded so evaluating a revision cannot change the
revision being evaluated.

The current contract also carries semantically important Task and Evidence
non-records. Whether a later contract gives every governed semantic non-record
a stable document-node identity, promotes selected non-records, or keeps them
as evaluation-context inputs is deliberately unresolved. The prototype must
compare these options because excluding them would fail the stated all-document
freshness goal, while promoting them by implication would change NKF authority
and Task meaning.

### Typed Relationships And Evaluation Policy

Each semantic relationship fact is authored once in its canonical direction
and cites the exact Markdown section that supplies its durable meaning.
Duplicate inverse facts are rejected. The evaluator derives inverse edges and
backlinks.

The globally versioned semantic vocabulary defines for each relationship:

- its directional meaning;
- allowed source and target node kinds;
- whether self-edges or cycles are meaningful;
- the source-section authority required; and
- the class of freshness consequence it may carry.

Semantic direction is not impact direction. `A depends-on B` means `A` points
to `B`; a change to `B` may propagate impact in reverse to `A`.

Exact traversal behavior belongs to a separate, versioned evaluation policy
bound by identity and digest. It maps a semantic relationship and endpoint
context to one of the experimental impact classes `hard`, `review`, `context`,
or `historical`. Per-repository overrides and implementation heuristics may
not silently redefine that mapping.

The prototype begins with current NKF 0.4 relationship meaning and treats any
uncertain non-context, non-historical relationship as `review`. Only an exact
revision or artifact binding may qualify as `hard`; AI-assessed importance is
never hard. This hard/review distinction is experimental and must be retained
only if exercises show that it changes useful behavior without hiding impact.

### Evaluation Context And Purpose

Every evaluation binds an explicit context containing at least:

- bundle identity, selected Root Profile, and candidate universe;
- baseline and candidate bundle revisions;
- exact evaluator and evaluation-policy identity and digest;
- one closed purpose;
- initial changed nodes, governed resources, and external observations;
- explicit evaluation time only when a declared expiry rule requires it;
- available authority and external-resolution observations; and
- the baseline-completeness state and any known unresolved declarations.

The initial purpose vocabulary is:

| Purpose | Question |
| --- | --- |
| `change-impact` | What declared knowledge must be reviewed because these exact inputs changed? |
| `whole-root-readiness` | Does every applicable knowledge subject have a current revision-bound review result for this candidate root? |
| `consequential-use` | May the identified knowledge be used for this exact governing or operational consequence? |
| `historical-reproduction` | Can the exact earlier evaluation be reproduced against its original inputs and policy? |

Purpose is not a display label. It changes applicability and can change the
correct freshness result for the same immutable node.

### Applicability Role Authority And Freshness

The evaluator reports separate axes:

| Axis | Question |
| --- | --- |
| Applicability | Is this node relevant to the exact context and purpose? |
| Participation role | Does it govern, propose, realize, evidence, provide context, or preserve history in this evaluation? |
| Authority eligibility and binding | May it govern, and is the exact authority act verified? |
| Freshness | Are its declared dependencies, policy, observations, and required semantic review current for this purpose? |
| Conformance | Does the represented bundle satisfy the applicable NKF contract? |

An Evidence or proposal node may be applicable without being eligible to
govern. An accepted Decision may be authority-eligible but non-applicable. A
conformant Realization may be stale. No single status substitutes for the
others.

### Freshness Results

The candidate result vocabulary is:

| Result | Candidate Meaning |
| --- | --- |
| `current` | Every required observable dependency, policy, binding, and semantic-review obligation is satisfied for the exact node revision, context, and purpose. |
| `stale` | A declared dependency, governed meaning, revision, or required review changed after the last applicable review. |
| `expired` | An explicit deterministic time or validity boundary supplied by the declared policy and evaluation input has passed. |
| `invalidated` | A declared invalidation event or condition was observed and applies to this node and purpose. |
| `unknown` | Required declaration, baseline completeness, observability, resolution, or semantic review is missing or ambiguous. |

Every noncurrent result blocks the corresponding readiness or consequential-use
claim. The evaluator records every reason even if it also emits one display
result. Exact precedence when several results apply is experimental; the
prototype will test `invalidated`, then `expired`, then `stale`, then `unknown`
as a deterministic display order without discarding any coexisting reason.

No document declares itself `current`. A declared expiry or invalidation
policy describes how to evaluate; it does not store the evaluation result.
Wall-clock access is not implicit. A time-dependent evaluation binds its exact
time input and clock policy so historical reproduction remains possible.

### Full Applicable And Current Projections

One canonical declared graph produces three projections:

1. **Full graph** — all declared nodes and edges needed to preserve accepted
   history, revisions, lifecycle events, successor chains, context, and
   provenance.
2. **Applicable graph** — every node and edge relevant to the explicit context
   and purpose, including stale, expired, invalidated, and unknown nodes.
3. **Current graph** — the subset of the applicable graph whose freshness
   result is current.

Impact calculation and final readiness run on the applicable graph. Running
them only on the current graph would hide the very noncurrent knowledge that
must be reviewed or block use.

### Change Closure And Review

The initial changed set comes from exact baseline/candidate node-revision
differences plus explicitly changed governed artifacts and external
observations. No canonical edit is assumed semantically harmless merely
because it looks like formatting.

The evaluator traverses only policy-selected `hard` and `review` propagation
directions to a deterministic, cycle-safe fixed point. Every included node
records at least one reason path back to an initial change. `context` and
`historical` relationships remain queryable but do not independently expand
mandatory review.

During an authoring session, AI or a human semantically reviews only the
deterministically calculated mandatory closure plus any voluntarily expanded
context. The review act records its exact inputs, observations, Decision
classifications, limitations, and reviewer identity. Deterministic validation
can verify the receipt's shape and revision binding; it cannot prove the
review's semantic quality.

At Task completion, consequential use, and release preparation,
`whole-root-readiness` walks every applicable subject mechanically. Existing
current revision-bound review receipts are reused. Only missing, stale,
expired, invalidated, or unknown subjects require semantic attention. This is
how final checking can cover the whole root without repeatedly sending every
unchanged document to AI.

### Decision Reconciliation

Every applicable accepted Decision is classified with an exact basis as:

| Classification | Meaning |
| --- | --- |
| `compatible` | The candidate satisfies the Decision without changing its scope or conditions. |
| `extends` | The candidate adds meaning while retaining the Decision's governing requirements. |
| `supersedes` | A separately authoritative successor replaces the Decision for an explicit scope. |
| `conflicts` | The candidate cannot satisfy both applicable meanings in the declared scope. |
| `not-applicable` | The Decision was considered but does not govern this exact context, with a recorded basis. |

An applicable unresolved conflict blocks acceptance and Task completion. A
historical superseded Decision remains in the full graph and historical
reproduction. The evaluator may calculate candidate relevance and verify that
classifications cover it; semantic truth and the authority to supersede remain
human acts.

### Receipts And Virtual Views

An evaluation receipt binds:

- exact context, purpose, candidate universe, baseline and candidate revisions;
- policy and evaluator identity and digest;
- node and edge inputs, external observations, and evaluation time where used;
- applicability, role, authority, freshness, and conformance axes;
- change closure, reasons, unknowns, cycles, and Decision classifications;
- semantic-review coverage and reviewer provenance without claiming that the
  checker performed the review; and
- a deterministic evaluation identity over canonical receipt inputs and
  outputs.

Receipts are operational state outside the canonical knowledge graph revision.
A changed bound input makes a receipt outdated; it never rewrites the
historical receipt. Selected receipts may later be captured as governed
Evidence, but operational storage is not itself canonical knowledge.

Generated lifecycle indexes, backlinks, impact views, and read-only virtual
frontmatter consume declarations and current receipts. They are replaceable
projections and must identify their source revisions. A generated display may
show `unknown`; it may never turn missing data into `current`.

### Completeness And Unknown

The graph cannot prove that no undeclared fact exists. It can enforce a
bounded completeness contract over the declared candidate universe. The
prototype must compare at least:

- every governed record represented as a record node;
- every independently addressable entity referenced by an edge or binding
  represented exactly once;
- every mandatory body/profile relationship category either declared or
  explicitly inapplicable;
- every changed governed artifact connected to its owning Realization;
- every applicable non-record knowledge subject represented or explicitly
  handled by the selected non-record strategy; and
- every required external dependency carrying observable identity or an
  `unknown` result.

Missing, ambiguous, duplicate, or unsupported material declarations yield
`unknown`, block the applicable claim, and may expand but never silently
shrink review. Open-world uncertainty is bounded to the declared candidate
universe; NKF does not claim global completeness.

### External Resolution Boundary

Local edges resolve by stable ID within the declared repository and bundle
scope. A URL is navigation, not graph identity. An external dependency must
declare repository or bundle identity, target node identity, exact revision or
revision rule, relationship, and an observable source revision, invalidation
trigger, authority resolver, or freshness policy.

If an evaluation cannot observe the required external state, the dependent
result is `unknown`. The initial prototype never crawls repositories, follows
links, polls authorities, requires network access, or handles credentials.
Cross-repository traversal and live resolver operation remain later evidence
work after the local model is proven.

### Stable Paths Lifecycle And Migration

Lifecycle state changes in YAML. Canonical document identity and source path
remain stable; generated navigation groups active, adopted, superseded,
completed, cancelled, expired, invalidated, or other applicable views without
moving or rewriting canonical meaning.

This direction would replace NKF 0.4's path-carried Task and Design navigation
mechanics in a later contract. The prototype must demonstrate link stability,
generated-index determinism, and no loss of branch-carried Task truth before a
normative migration is considered.

Existing repositories require a one-time baseline. Migration may derive
mechanical candidates from current typed relationships, section bindings,
frontmatter, Tasks, and links, but an agent or human must review semantic edges
and completeness. Historical documents are not backfilled with fabricated
past freshness. Until baseline coverage is confirmed, readiness is `unknown`.

## Responsibilities Interactions And Information Flows

The future Specification would own node kinds, durable relationship meaning,
freshness results, purpose vocabulary, axis separation, completeness limits,
claim rules, and human-review boundaries. The executable companion would
represent those exact semantics mechanically. Schemas would validate closed
shapes. A separately bound evaluation policy would own exact traversal mapping
and deterministic precedence.

The checker would validate declarations, revisions, graph resolution, policy
binding, closure reproduction, receipt binding, generated-view agreement, and
whole-root mechanical readiness. It would not infer missing world knowledge,
judge prose truth, classify Decision compatibility authoritatively, perform
acceptance, confirm a Realization, or make AI review true.

Authors declare meaning once in Markdown and machine-evaluable relationships
once in YAML. Reviewers inspect the calculated impact set and record semantic
findings. External systems retain authority for their own data and expose only
declared observations. Consumers choose an explicit evaluation purpose.

Information flows from baseline and candidate revisions into changed nodes,
through the versioned impact policy into a reasoned applicable closure, through
semantic review and deterministic freshness calculation into a revision-bound
receipt, and from that receipt into generated views and readiness checks.

## Alternatives And Trade-Offs

### Full Semantic Scan For Every Change

Review every knowledge document after each edit. This minimizes graph omission
risk but makes cost grow with the whole repository, repeatedly spends context
on unchanged knowledge, and provides no precise reason path. It remains the
comparison oracle during
[this Task](../../tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md)
but is not the proposed authoring workflow.

### Computed State In Canonical Markdown

Write currentness, expiry, invalidation, or lifecycle moves into Markdown.
Rejected as the direction: evaluation would alter the revision being
evaluated, receipts would invalidate themselves, historical meaning would be
rewritten, and state would duplicate YAML and operational results.

### Infer The Graph From Links Or AI

Treat Markdown links, embeddings, file layout, or model judgments as graph
authority. Rejected as the direction: results would be nondeterministic,
ordinary navigation would acquire unintended semantics, and missing or changed
model behavior could silently shrink impact. AI may propose edges for human
review but cannot create them by inference.

### Put Impact Behavior On Every Edge

Let each repository label its edges hard, review, or context. Rejected as the
default: repositories could weaken propagation, equivalent semantic edges
would behave differently, and historical evaluation could not reproduce
without preserving ad hoc policy. Global relationship meaning plus a separately
versioned evaluation policy keeps refinement governed.

### One Intrinsic Document State

Give each document one absolute current or stale flag. Rejected as the
direction: applicability and freshness depend on purpose, context, authority,
revision, and observations. The same historical Evidence can be current for
reproduction and expired for a new consequential claim.

### Trust Determinism Without Whole-Root Comparison

Accept the evaluator once it produces stable output. Rejected: a deterministic
algorithm can be consistently incomplete.
[This Task](../../tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md)
requires whole-root semantic comparison, missing-edge injection, and
false-negative accounting before the policy is considered safe.

## Failure Safety Recovery And Operations

A structurally valid graph can still omit a semantically material edge. The
bounded completeness contract, conservative review default, whole-root
comparison, and blocking `unknown` reduce this risk but do not eliminate human
error. A later audit compares actual changed files, Decisions, artifacts, and
external observations with declared initial changes and closure.

Cycles terminate at a fixed point and remain visible. Conflicting duplicate
edges fail validation. Unsupported node or relationship types fail closed.
Missing exact revision, policy, receipt input, evaluation time, or external
observation produces `unknown`. A failed evaluation never overwrites the last
historical receipt or canonical knowledge.

Expiry cannot depend on an unstated wall clock. External lookup failures do not
become revocation or currentness. Credentials, raw external payloads, and live
operational state remain outside canonical knowledge and follow existing
security and authority boundaries.

If the prototype finds any false negative against the full-review oracle, the
affected policy is unsupported until the cause is classified and corrected.
The correction restarts the relevant exercise; it is not normalized as an
acceptable trade-off. False positives are retained and measured until evidence
supports a governed refinement.

## Validation And Decision Evidence

An informed later Decision requires:

- strict prototype schemas for graph, evaluation policy, context, observation,
  semantic review, and receipt inputs;
- deterministic evaluator output from repeated clean runs and permuted input
  order;
- minimal Product and Technology fixtures plus a truthful NKF Technology
  baseline;
- positive and adversarial cases for stale Realization, expiry, invalidation,
  external unknown, Decision conflict, scoped supersession, missing edge,
  ambiguous edge, cycle, exact binding, receipt replay, stable path, and
  historical reproduction;
- whole-root semantic review of every controlled fixture and quantitative
  comparison of mandatory set size, false positives, false negatives, and
  review cost;
- explicit testing of the non-record strategy, hard/review usefulness,
  semantic-policy separation, result precedence, and baseline completeness;
- final whole-root readiness proving that unchanged current receipts avoid
  unnecessary semantic rereading while every noncurrent or unknown subject is
  surfaced;
- `npm run nkf:check` with zero diagnostics for every governed handoff; and
- a fresh independent audit that rebuilds the evaluator from clean source,
  reproduces receipts, injects omissions and conflicts, and reconciles every
  Design claim with collected Evidence.

No prototype pass accepts this Design, and no accepted Design would itself
accept NKF 0.5 authority or confirm a production Realization.

## Unresolved Matters

- Whether Task and Evidence non-records become stable document nodes or remain
  context subjects without creating a second graph authority.
- The exact YAML serialization for freshness policies, invalidation triggers,
  external observations, node revisions, evaluation policies, and receipts.
- Whether the `hard` versus `review` distinction creates useful safe behavior
  beyond exact binding failure or should collapse into one mandatory-review
  class.
- The exact policy mapping for current relationship types, especially
  `extends`, `supersedes`, `realizes`, `evidences`, Product `part-of`, and
  profile-specific relationships.
- Whether one display-result precedence is helpful or the contract should
  expose a set of simultaneous noncurrent reasons only.
- The minimum enforceable baseline-completeness declaration that detects
  omission without making every document mandatory for every change.
- The operational receipt path, retention, privacy, signing, and optional
  promotion into governed Evidence.
- The migration boundary from path-carried 0.4 Task and Design navigation to
  stable paths and generated lifecycle views.
- Which external freshness cases, if any, remain solely with
  [NKF-005](../../tasks/deferred/NKF-005-validation-expiry-and-authority-freshness.md)
  or require a later coordinated Decision.

These are prototype questions. This Draft records no implicit answer and
grants no authority to production implementation.
