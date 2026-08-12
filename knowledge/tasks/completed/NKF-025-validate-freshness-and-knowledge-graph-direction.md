---
title: "NKF-025: Validate Freshness And Deterministic Knowledge-Graph Direction"
summary: Test the confirmed NKF 0.5 freshness and knowledge-graph direction against controlled Product and Technology evidence before accepting or implementing normative format meaning.
created_at: 2026-08-12T16:49:56Z
task_id: NKF-025
task_status: completed
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
related_tasks:
  - NKF-005
  - NKF-019
  - NKF-021
  - NKF-024
---

# NKF-025: Validate Freshness And Deterministic Knowledge-Graph Direction

## Human Direction

On `2026-08-12`, after reviewing why NKF's consolidated
[current-system Realization](../../realizations/current-system.md) could become
stale, the Human Product Owner directed NKF to address document staleness for
both NKF itself and the Product and Technology repositories it governs.

Through the subsequent knowledge-graph review, the Human Product Owner
confirmed the product boundaries recorded below, required the conservative
safety rule to remain explicit, and directed that uncertain graph-policy
details be tested in practice rather than accepted by speculation. The Human
Product Owner then explicitly confirmed creating this Task and beginning the
work.

This Task is the evidence and Design boundary for the proposed NKF `0.5`
direction. It does not accept a Specification, executable companion, exact
graph vocabulary, migration contract, checker behavior, Realization, or
release by implication. A later normative and implementation Task may begin
only from reviewed evidence and an adopted direction.

## Problem

NKF 0.4 validates declared structure, links, source digests, artifact bindings,
and snapshot conformance. It cannot establish that living knowledge remains
semantically current after related knowledge, governed artifacts, accepted
decisions, declared external authorities, or time-bounded evidence change.
The same gap exists in adopting Product and Technology repositories.

Reviewing every document after every change would be conservative but would
not scale: it spends AI context on unrelated knowledge and makes the useful
review boundary indistinguishable from the whole repository. A narrowly
computed impact set is cheaper, but an incomplete graph or unsound propagation
policy could silently omit a document and create false confidence.

The immediate failure class is broader than a stale timestamp. It includes a
Realization that no longer maps current accepted meaning, a Decision that
conflicts with applicable predecessor authority, an invalidated external
binding, a superseded record still treated as governing, a missing material
relationship, and a historical receipt reused after its inputs changed.

## Desired Outcome

Produce evidence that determines whether one declared local knowledge graph,
versioned evaluation policy, and deterministic freshness evaluation can:

- find the complete conservative review set for a bounded change without
  repeatedly scanning unrelated knowledge;
- distinguish lifecycle, applicability, participation role, governing
  authority, freshness, and conformance instead of collapsing them;
- explain every inclusion, exclusion, and blocking unknown through
  reproducible reason paths and revision-bound receipts;
- preserve durable human meaning and history without rewriting Markdown when
  lifecycle or computed freshness changes; and
- work coherently for both Product and Technology profiles, including NKF's
  own repository.

The result is a reviewed Draft Design, controlled prototype, measurements,
failure evidence, and explicit remaining product decisions. It is not a
production NKF 0.5 implementation.

## Confirmed Product Boundaries

The following direction is fixed for this investigation. Prototype results may
show that a later Product decision should revise it, but implementation may not
silently redefine it.

1. Markdown owns durable human meaning. YAML owns declared lifecycle,
   governance, freshness policy, typed graph relationships, invalidation
   triggers, successors, and other machine-evaluable declarations.
2. Currentness is computed operationally; no document declares itself
   `current`. Candidate results are `current`, `stale`, `expired`,
   `invalidated`, and `unknown`, separate from lifecycle and authority status.
3. Stable canonical paths and Markdown meaning remain unchanged when lifecycle
   or computed freshness changes. Read-only virtual frontmatter and generated
   lifecycle navigation may project declared and computed state.
4. Every governed record is one graph node. Independently addressable semantic
   concepts may be entity nodes in the same logical graph. Headings, sections,
   and ordinary Markdown links are not automatically nodes or relationships.
5. Stable identifiers define node identity; paths are locators. A content
   revision binds canonical Markdown bytes and meaning-bearing YAML, excluding
   generated views, navigation, computed results, and receipts.
6. Each relationship fact is authored once in one canonical direction. The
   closed relationship vocabulary defines permitted endpoint kinds, semantic
   direction, impact behavior, cycle rules, and freshness consequence.
   Inverses and backlinks are generated.
7. Semantic direction and impact propagation are distinct. For example,
   `A depends-on B` is authored from `A` to `B`, while a change to `B` may
   propagate review impact to `A`.
8. Authored edges cite the exact stable Markdown section that supplies their
   durable meaning. Mechanical resolution does not prove the semantic claim;
   missing or ambiguous meaning yields `unknown` and fails closed.
9. The canonical graph is durable declared input. Applicability, impact
   closure, freshness, inverse edges, navigation, and receipts are derived
   operational results outside the graph revision.
10. Evaluation uses three projections: the full graph preserves accepted
    history and successor chains; the applicable graph contains every node
    relevant to an explicit evaluation context even when noncurrent; and the
    current graph is the current subset of that applicable graph. Impact and
    final readiness obligations run on the applicable graph, never only the
    current graph.
11. Applicability is contextual and derived against explicit revision-bound
    inputs. Applicability, participation role, authority eligibility and
    binding, and freshness remain separate axes.
12. Mandatory closure starts from every changed node, traverses only declared
    impact-carrying relationships to a deterministic fixed point, is cycle
    safe, and records at least one reason path. Context and historical
    provenance remain discoverable but do not independently expand mandatory
    review.
13. A missing or ambiguous material relationship yields `unknown`, blocks the
    relevant completion or consequential-use claim, and may expand but never
    silently shrink the review set.
14. Accepted Decisions relevant to the evaluation are classified with a basis
    as compatible, extends, supersedes, conflicts, or not applicable. An
    unresolved applicable conflict blocks acceptance and Task completion.
15. Evaluation receipts record exact inputs, evaluation purpose, policy and
    version, axis results, reason paths, and evaluation identity. A changed
    input outdates the receipt rather than rewriting its historical result.
16. The initial closed evaluation-purpose vocabulary is `change-impact`,
    `whole-root-readiness`, `consequential-use`, and
    `historical-reproduction`.
17. External dependencies require an explicit NKF contract with repository or
    bundle identity, target node, exact revision, and an observable revision,
    invalidation trigger, resolver, or freshness policy. A URL alone is
    navigation, and unobservable external change remains `unknown`.
18. Deterministic impact mapping is deliberately conservative and must be
    refined through governed, versioned evidence from NKF and consumer
    adoption. It must not be presented as permanently optimal or be silently
    redefined by per-repository overrides.
19. On `2026-08-12`, after reviewing the prototype and its independent audit,
    the Human Product Owner confirmed that every governed non-record requiring
    an individual freshness result receives a stable Common `document` node.
    This identity enables independent tracking only: the document remains a
    non-record and gains no record or governing authority by implication.
20. On `2026-08-12`, the Human Product Owner confirmed that incremental
    freshness evaluation may claim readiness only after a named human or agent
    has semantically reviewed and confirmed the exact graph baseline. The
    confirmation is bound to the exact graph revision and identifies its
    reviewer. When that confirmation is absent, outdated, or disputed, NKF
    reports `unknown`, blocks readiness, and requires whole-root semantic
    review as the recovery path. A checker cannot infer semantic completeness
    from the absence of detected omissions.
21. On `2026-08-12`, the Human Product Owner confirmed that the normative
    freshness result preserves every simultaneously applicable noncurrent
    result and its reasons. A renderer may choose a primary label or display
    order, but presentation cannot discard, replace, or alter the underlying
    result set.
22. On `2026-08-12`, the Human Product Owner confirmed that an exact revision
    or governed-artifact binding mismatch is a deterministic hard blocker.
    NKF must not standardize a broader `hard` versus `review` distinction until
    real consumer evidence demonstrates useful, different, and safe behavior.
    Until then, uncertain non-context and non-historical relationships default
    to review, and AI-assessed importance cannot create a hard blocker.
23. On `2026-08-12`, the Human Product Owner clarified that NKF itself must
    adopt every new NKF version. The implementation and release Task must prove
    two separate stages. Before publication, the exact candidate archive must
    run the candidate-bound Adopt operation in a fresh isolated clone, return
    `current` on repeat, pass the complete producer gate, and receive a fresh
    independent audit. This is an Adopt exercise of exact candidate bytes, not
    completed ordinary repository adoption of a published version. After
    immutable publication, the producer branch must perform ordinary public
    self-adoption of that exact release, return `current` on repeat, receive a
    post-adoption independent audit, and merge only afterward.

## Provisional And Unresolved Boundaries

- Exact policy serialization and the evidence threshold for any future,
  versioned expansion beyond exact-binding hard blockers remain technical
  derivation. The confirmed conservative default may not be weakened by those
  mechanics.
- Semantic relationship meaning and endpoint constraints are global format
  vocabulary, while exact impact traversal is expected to be a separately
  versioned evaluation policy. The exercise must test whether this separation
  remains coherent.
- `unknown` must block inside a declared bounded candidate universe; it must
  not imply that the evaluator can discover every undeclared relationship in
  the world. The prototype must make that universe and limitation explicit.
- The first implementation is local-root only. Cross-repository traversal,
  polling, public registries, and live external authority resolution remain
  deferred until the local model is proven.
- The exact declaration, evidence, invalidation, and receipt mechanics for a
  named reviewer's revision-bound baseline confirmation remain technical
  derivation. The confirmed Product behavior is fail-closed and may not be
  weakened by those mechanics.
- The precise conservative policy is expected to produce false positives.
  Evidence must quantify them, identify any false negative, and propose later
  refinement rather than optimizing prematurely.

These are research questions with a fail-closed experimental default, not
unanswered activation requirements and not delegated authority to accept new
format meaning.

## Scope

- reconcile the confirmed direction with current accepted NKF Decisions,
  deferred [NKF-005](../deferred/NKF-005-validation-expiry-and-authority-freshness.md),
  current 0.4 authority, and the consolidated Realization;
- inventory every NKF knowledge and declaration surface that can currently
  become stale, invalidated, contradictory, superseded, or unverifiable;
- draft one Design that cleanly separates durable graph declarations,
  versioned evaluation policy, derived operational results, and human semantic
  review;
- build a disposable local prototype and fixtures without changing accepted
  NKF 0.4 authority or production checker behavior;
- exercise the prototype against NKF's Technology bundle and minimal Product
  and Technology cases, including stale Realization, supersession,
  contradiction, broken exact binding, missing edge, cycle, external unknown,
  and historical-reproduction scenarios;
- compare deterministic closure with a whole-root semantic review, record false
  positives, false negatives, omitted-edge behavior, review-set size, reason
  quality, and approximate review cost;
- test one-time graph baselining and changed-input receipt invalidation;
- refine the Draft Design only from recorded evidence and keep unproven
  boundaries explicit; and
- perform a fresh independent audit of the evidence, prototype, measurements,
  Decision reconciliation, and Design claims before returning remaining
  Product decisions.

## Out Of Scope

- accepting, publishing, recommending, or adopting NKF 0.5;
- editing the immutable NKF 0.4 authority pair or any frozen 0.4 release member;
- changing the production checker, adopter, migration, schemas, release set,
  public guidance, or consumer repositories;
- treating AI semantic review as deterministic proof or letting validation
  accept knowledge;
- implementing deferred
  [NKF-021](../deferred/NKF-021-task-scope-gate.md) or absorbing its scope into this Task;
- replacing the authority-freshness investigation owned by
  [NKF-005](../deferred/NKF-005-validation-expiry-and-authority-freshness.md); and
- automatic cross-repository discovery, external polling, or a public graph
  registry.

## Execution Plan

1. Establish and activate this Task through the normal branch-carried Task
   workflow, preserving this exact direction, plan, gate, and scope before any
   prototype work.
2. Produce a current-system freshness and contradiction threat inventory,
   mapping each failure class to existing authority, current deterministic
   coverage, and the missing declaration or review boundary.
3. Draft one active Design that consolidates the confirmed product boundaries,
   separates normative candidates from experimental defaults, and names every
   unresolved product question.
4. Define a versioned prototype graph and evaluation-policy fixture format
   outside the frozen 0.4 set, then implement a disposable evaluator that emits
   deterministic closures, axis results, reasons, unknowns, and receipts.
5. Build controlled Product and Technology fixtures and a truthful NKF
   baseline; exercise changed-node, Decision conflict, stale Realization,
   successor, invalidation, external-unknown, missing-edge, cycle, exact
   binding, and historical-reproduction cases.
6. Perform whole-root semantic review for the same scenarios and compare it
   with the computed review sets. Record every miss, unnecessary inclusion,
   unexplained result, policy ambiguity, and review-cost observation.
7. Refine the Design and prototype only where evidence supports the change.
   Keep the conservative default and explicit future-improvement requirement
   wherever the evidence remains insufficient.
8. Run `npm run nkf:check` for every governed handoff and retain acceptance,
   Design disposition, Realization confirmation, prototype behavior,
   conformance, and Git state as separate facts.
9. Conduct a fresh independent audit from clean inputs, including adversarial
   missing and conflicting declarations, receipt replay, deterministic
   reproduction, and comparison against the whole-root review.
10. Reconcile every acceptance criterion and mandatory capability, record an
    evidence-bounded conclusion, and present only the remaining consequential
    product choices. Normative NKF 0.5 implementation and release require a
    later explicitly authorized Task.
11. Derive one exact Design-adoption Decision candidate solely from the
    already confirmed Product boundaries and audited evidence. Reconcile the
    Design disposition and executable record mechanically, run the canonical
    gate, obtain a fresh independent audit of the exact candidate, and present
    its precise adopted meaning before any acceptance or Task conclusion. Any
    new or changed Product boundary returns to the Human Product Owner rather
    than entering the candidate by implication.

## Acceptance Criteria

- One reviewed inventory identifies how NKF and its Product and Technology
  adopters can produce stale, expired, invalidated, conflicting, superseded,
  unknown, or unreviewed knowledge under the current 0.4 contract.
- One Draft Design preserves every confirmed Product boundary, clearly marks
  experimental defaults, separates semantic relationship vocabulary from
  versioned impact policy, and names remaining decisions without claiming
  adoption.
- A disposable prototype deterministically derives full, applicable, and
  current projections, conservative change closure, freshness axes, Decision
  reconciliation, reason paths, and revision-bound receipts from declared
  local inputs.
- Product and Technology exercises include positive, negative, missing-edge,
  contradictory, cyclic, external-unknown, stale-Realization, supersession,
  exact-binding, baseline, and historical-reproduction cases.
- Comparison with whole-root review records review-set size, false positives,
  every false negative, unexplained result, and reproducibility. Any false
  negative or silent shrinkage remains a blocking finding rather than being
  normalized.
- The prototype demonstrates that lifecycle or computed freshness changes do
  not require rewriting canonical Markdown meaning or moving stable document
  paths.
- The investigation neither edits frozen NKF 0.4 authority nor changes a live
  consumer repository, production checker, adopter, migration, or release.
- A fresh independent audit re-runs the evaluator from clean inputs, verifies
  receipts and reason paths, injects missing and conflicting declarations,
  checks deterministic reproduction, and reconciles Design claims with the
  collected evidence.
- `npm run nkf:check` reports zero diagnostics for each governed Task, Design,
  Evidence, and conclusion handoff.
- The conclusion distinguishes proven capabilities, unsupported direction,
  unresolved unknowns, and exact remaining Human Product Owner decisions. It
  does not authorize normative NKF 0.5 implementation by implication.

## Current Progress

- Human direction and the confirmed product boundaries are now allocated to
  this Task.
- The normal deterministic Task transition created `task/NKF-025`, moved this
  Task to active, validated and committed the transition, pushed the branch,
  and opened draft pull request 9 while `master` remained concluded.
- The initial
  [NKF 0.4 freshness and graph-gap inventory](../../evidence/audits/nkf-025-nkf-0-4-freshness-and-graph-gap-inventory.md)
  reviews the current authority and repository declarations. It finds strong
  exact-byte and structural controls but no deterministic semantic-freshness,
  impact-policy, relationship-completeness, external-observability, or
  targeted-review contract.
- The adopted
  [NKF Freshness And Deterministic Knowledge Graph](../../designs/adopted/freshness-and-deterministic-knowledge-graph.md)
  Design consolidates the confirmed direction. Exact serialization,
  relationship-policy mapping, baseline-confirmation mechanics and evidence,
  receipt operations and storage, migration, and broader consumer proof remain
  technical derivation or later evidence questions.
- The
  [controlled graph prototype exercise](../../evidence/audits/nkf-025-controlled-graph-prototype-exercise.md)
  implements a disposable versioned evaluator and passes 25 Product,
  Technology, direct-NKF, adversarial, receipt, lifecycle, and non-record
  cases. Controlled Product and Technology closures match whole-root semantic
  oracles with no miss.
- The direct NKF comparison found one material pre-baseline false negative:
  current 0.4 relationships do not carry the active Task when its owned Draft
  Design changes. Because graph completeness is unconfirmed, the evaluator
  blocks rather than calling the sparse result current. A controlled reviewed
  Task-to-Design edge corrects that exact closure without whole-root expansion.
- Stable document nodes are the only tested non-record strategy that preserves
  independent freshness without changing record authority. Exact
  serialization, full baseline policy, broad hard/review value, relationship
  mapping, receipt operations, and consumer evidence remain unresolved; the
  confirmed default limits hard blocking to exact-binding mismatches meanwhile.
- The
  [fresh independent audit](../../evidence/audits/nkf-025-controlled-graph-prototype-independent-audit.md)
  rejected two earlier targets with material fail-closed defects. From a new
  remote clone of corrected exact checkpoint `a68254c`, it reproduced the
  complete gate, all 25 focused cases, byte-identical measurements, 23
  independent adversarial assertions, clean scope isolation, and the known
  incomplete-baseline limitation without finding a further material defect.
- The
  [pre-release NKF self-consumer worktree exercise](../../evidence/audits/nkf-025-pre-release-self-consumer-worktree-exercise.md)
  ran exact checkpoint `1628e2c` in a separate detached worktree. The sparse
  actual NKF projection blocked, whole-root review exposed the missing
  Task-to-Design relationship, and the reviewed two-subject closure matched
  the oracle with zero false positives or false negatives. All 25 focused
  tests and the 28-file, 210-test canonical producer gate passed, repeated
  measurements were byte-identical, and the detached worktree stayed clean.
- No Specification, executable companion, production checker, adopter,
  migration, Realization, release, or consumer repository has changed under
  this Task.

## Investigation Conclusion

The tested direction is technically sound enough to continue, but it is not
yet safe to turn into normative NKF 0.5 meaning. The evidence proves that a
declared local graph can calculate small reproducible review closures, preserve
separate lifecycle/applicability/role/authority/freshness/conformance axes,
bind receipts to exact revisions, and block unconfirmed completeness. It also
proves that stable document nodes cover Task and Evidence non-records without
promoting them to governing records.

The experiment does not prove that software can discover every omitted
semantic relationship. A one-time semantic baseline review remains necessary,
and an incorrectly confirmed incomplete baseline can still hide impact. The
safe contract is therefore: unconfirmed completeness is `unknown` and blocks;
confirmation is a revision-bound human or agent semantic act whose authority
and evidence must be explicit, not a checker inference.

The evidence supports these Product recommendations, confirmed one at a time:

1. adopt a Common stable `document` node for independently freshness-evaluable
   governed non-records, explicitly carrying no record or governing authority;
2. keep exact revision and artifact mismatches as deterministic hard blockers,
   but do not standardize a broader `hard` versus `review` distinction until a
   real consumer exercise demonstrates useful different behavior;
3. make the normative result a set of simultaneous noncurrent reasons rather
   than the prototype's single display precedence; a renderer may choose a
   presentation order without changing contract meaning; and
4. require a revision-bound reviewed baseline before incremental impact
   evaluation can claim readiness, while preserving whole-root review as the
   recovery path when completeness is absent or disputed.

The Human Product Owner confirmed recommendations 1 through 4 on `2026-08-12`
and clarified the required producer self-adoption boundary. No Product
recommendation from this investigation remains unconfirmed.
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
adopts the exact Design revision without accepting NKF 0.5 authority or
authorizing implementation. Exact Schema, policy mapping,
baseline-confirmation and receipt operations, migration, implementation,
publication, and actual self-adoption remain later work, not Product decisions
silently delegated to this investigation.

## Completion Result

NKF-025 completed the bounded evidence and Design investigation it was
directed to perform. The governed inventory, disposable evaluator, controlled
Product and Technology cases, actual NKF Technology exercise, whole-root
comparisons, receipt and invalidation exercises, and adversarial audits
satisfied every acceptance criterion and mandatory capability within their
explicitly recorded experimental scope. The known risk remains visible: an
incorrectly confirmed incomplete semantic baseline can hide an undeclared
relationship, so unconfirmed or outdated completeness yields `unknown`, blocks
readiness, and requires whole-root semantic review.

[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
records Codex technical-reviewer confirmation under the Human Product Owner's
explicit delegation. The confirmation was checked clause by clause against
all 23 individually Human-Product-Owner-confirmed Product boundaries; the
Human Product Owner remains their source authority, and the consolidating
record adds no Product meaning. The exact adopted
[Design](../../designs/adopted/freshness-and-deterministic-knowledge-graph.md)
therefore establishes the evidence-bounded direction only.

A fresh independent audit of exact remote commit
`9fc2a7c72057e567fefd51a916142a15d3138a0f` returned CLEAN. It reproduced the
25 focused evaluator tests, verified the lifecycle indexes and exact
Markdown/YAML digests, reconciled the Task and Evidence claims, and ran the
canonical producer gate at 28 test files and 210 tests, 1,093 checked links,
zero dead links, full-bundle conformance, and zero diagnostics. The disposable
audit checkout remained tracked-clean and the remote branch remained bound to
the exact audited commit.

This conclusion does not establish an NKF 0.5 Specification, executable
companion, Schema, checker, adopter, migration, release set, production
Realization, publication, recommendation, consumer adoption, or readiness.
Exact serialization, policy mapping, baseline-confirmation evidence and
mechanics, receipt operations, migration, implementation, release, and broader
consumer proof remain future work. Opening or beginning that work requires a
separately human-directed Task. The two distinct self-adoption obligations
also remain unchanged: exact-candidate Adopt and audit before publication,
then ordinary public self-adoption and audit of the immutable published
release before merge.

Acceptance and state remain separate:
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
accepts the exact Decision record under the delegated confirmation; the Design
disposition is adopted;
no production Realization is implemented or confirmed; the audited snapshot
is conformant; acceptance-binding verification was not requested; Governing
Use remains not-ready; and no remote workflow or protected-branch enforcement
claim is made.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change proceeds through evidence, reproduction, classification, Human Product Owner direction, authority-first derivation, versioned release, and deliberate consumer migration; this Task stops before normative implementation. |
| [`adr-0007`](../../decisions/0007-markdown-yaml-authority.md) | record | Markdown remains normative human meaning; executable YAML supports deterministic validation and cannot silently override or accept it. |
| [`adr-0015`](../../decisions/0015-semantic-topology-and-bindings.md) | record | Current NKF already owns typed relationships, semantic entities, and Realization bindings; the experiment must preserve their authority and identity limits rather than create a competing graph. |
| [`adr-0016`](../../decisions/0016-extension-resolution.md) | record | Required unsupported graph or freshness extensions fail closed, optional unsupported meaning remains visible and non-consequential, and exact contract identity remains digest-bound. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, exact acceptance verification, conformance, Realization confirmation, and external authority remain separate axes; graph evaluation may not collapse or invent them. |
| [`adr-0019`](../../decisions/0019-validation-enforcement-and-diagnostics.md) | record | Schema, bundle checking, external resolution, and human semantic review retain separate responsibilities; deterministic results cannot establish truth, adequacy, acceptance, or confirmed Realization. |
| [`adr-0049`](../../decisions/0049-common-and-root-profiles.md) | record | Semantics proven identical across Product and Technology belong in Common; profile-specific meaning remains owned by the selected concrete Root Profile. |
| [`adr-0050`](../../decisions/0050-product-and-technology-profiles.md) | record | NKF supports one Product or Technology profile per bundle with a shared Common layer; the evidence must exercise both profiles without inventing a generic fallback or multi-profile composition. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Any accepted graph or freshness contract change ships as a new immutable NKF version with explicit compatibility and deliberate migration; the publication-freeze condition is prospectively strengthened by [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md). |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | Every Task extracts applicable accepted decisions and mandatory capabilities; an unresolved applicable conflict or unproven required capability cannot be hidden by deterministic conformance. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | Deterministic commands own closed mechanics only; prose meaning, acceptance, confirmation, and semantic review remain human and agent acts. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic review and confirmed direction precede deterministic mechanics; Task execution preserves open uncertainties explicitly instead of treating checker success as resolution. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The normal Task branch carries this Task's active life and merges only after a truthful conclusion, leaving review state in Git. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Frozen 0.4 complete-set bytes cannot change; any later accepted complete-set change requires a new version and exact-candidate proof before publication. |
| [`adr-0113`](../../decisions/0113-accept-the-nkf-0-4-authority-pair.md) | record | Exact NKF 0.4 is immutable predecessor authority; a real vocabulary, topology, authority, validation, onboarding-category, or compatibility change requires a new Human Product Owner Decision. |
| [`adr-0115`](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md) | record | The exact evidence-bounded Design direction is adopted, while NKF 0.5 authority, technical derivation, implementation, publication, and adoption remain unestablished and require separately directed later work. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Declared local graph inputs derive a deterministic conservative affected-document closure with reproducible reason paths | proven | runtime-behaviour | none |
| Product and Technology evaluations keep lifecycle, applicability, role, authority, freshness, and conformance separate | proven | runtime-behaviour | none |
| Simultaneous applicable noncurrent results and their reasons remain complete independently of display precedence | proven | runtime-behaviour | none |
| Exact revision and governed-artifact binding mismatches block deterministically without treating AI-assessed importance as hard | proven | runtime-behaviour | none |
| Within a declared candidate universe, detected missing or ambiguous material relationships fail closed without making every document universally mandatory | proven | runtime-behaviour | none |
| Relevant accepted Decisions are reconciled without silently losing conditions, supersessions, conflicts, or unknowns | proven | runtime-behaviour | none |
| Stable paths and durable Markdown meaning survive lifecycle and computed-freshness changes | proven | runtime-behaviour | none |
| Governed non-records requiring individual freshness receive stable Common document-node identity without record or governing-authority promotion | proven | runtime-behaviour | none |
| Revision-bound receipts reproduce historical evaluation and become unusable when an input changes | proven | runtime-behaviour | none |
| The controlled Product profile and actual NKF Technology repository can establish the evidence-bounded incremental baseline required by this investigation | proven | runtime-behaviour | none |
| Whole-root comparison exposes every false negative and quantifies conservative false positives and review cost | proven | runtime-behaviour | none |
| Fresh independent audit can reproduce the prototype and verify its evidence-bounded claims | proven | runtime-behaviour | none |

The proven findings are limited to the 25 controlled experimental cases, their
versioned semantic oracles, and the exact detached NKF self-consumer exercise
at `1628e2c`. Production behavior, broad consumer topologies, migration,
receipt operations, actual NKF 0.5 adoption, and universal graph completeness
are not thereby proven. An incorrectly confirmed incomplete semantic baseline
can still hide an undeclared relationship; proof here is the bounded behavior
that detected omissions and unconfirmed completeness block while a reviewed
edge avoids whole-root mandatory review. The Decision classifications are
inputs supplied by semantic review, not truths established by the evaluator.
