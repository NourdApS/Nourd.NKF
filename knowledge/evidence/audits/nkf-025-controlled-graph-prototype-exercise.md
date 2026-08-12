# NKF-025 Controlled Graph Prototype Exercise

## Evidence Boundary

This Evidence supports
[NKF-025](../../tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md)
and the active
[NKF Freshness And Deterministic Knowledge Graph](../../designs/active/freshness-and-deterministic-knowledge-graph.md)
Design. It records a disposable local evaluator, controlled Product and
Technology fixtures, a direct NKF repository projection, adversarial cases,
whole-root semantic oracles, and deterministic measurements.

The prototype files under `experiments/nkf-025/` are Task evidence. They are
not an NKF contract, production checker, adopted Design, confirmed
Realization, migration, release member, or consumer implementation. The
semantic oracles have no acceptance authority. A test pass establishes only
the exact experimental behavior described here.

## Exact Experimental Inputs

The exercise uses these versioned experimental contracts:

| Input Or Output | Experimental Identity | Purpose |
| --- | --- | --- |
| Graph | `nkf.graph-experiment/0` | Stable nodes, revisions, candidate universe, typed edges, governed-artifact observations, and completeness assertion |
| Evaluation policy | `nkf.graph-evaluation-policy-experiment/0` | Relationship endpoint kinds, impact class, propagation direction, and cycle rule |
| Receipt | `nkf.graph-evaluation-receipt-experiment/0` | Bound evaluator source, policy, context, observations, review inputs, projections, closure, reason paths, axis results, blockers, and deterministic identity |
| Semantic oracle | `nkf.graph-semantic-oracle-experiment/0` | Whole-root reviewer expectation used only to detect false positives and false negatives |
| Measurements | `nkf.graph-experiment-measurements/0` | Reproducible comparison and cost report emitted by the measurement script |

The evaluator strict-parses YAML with duplicate-key and alias rejection. It
requires closed experimental contract identities, unique node and artifact
IDs, one explicit candidate universe, known relationship policy, resolved
endpoints, source-section identifiers, allowed endpoint kinds, and
content-addressed candidate and policy inputs. The exact schemas and final
serialization remain unresolved; the executable shape is intentionally not a
candidate NKF 0.5 authority pair.

The evaluator has no network, clock, repository mutation, Markdown rewrite,
AI call, acceptance, or external resolver. Time and external observations
must be supplied explicitly. It produces the same receipt for reordered
set-like node, edge, artifact, universe, and review sequences.

## Controlled Exercise Results

The command `node --test experiments/nkf-025/evaluator.test.mjs` passed all 25
cases:

| Case | Result |
| --- | --- |
| Product Decision revision | The mandatory closure was the changed Decision, extending Design, and realizing Realization; exact reason paths were emitted and a revision-bound review made the set current |
| Change-closure Decision coverage | A changed accepted Decision without an explicit classification became noncurrent and blocked |
| Technology Specification revision | The closure was the Specification and its Realization; a contextual Technology reference did not expand mandatory review |
| Whole-root readiness | Every applicable node required a current revision-bound review, and every applicable accepted Decision required an explicit classification |
| Decision conflict | The classification remained separate from freshness and conformance, emitted a Decision blocker, and blocked consequential readiness |
| Missing required relationship | The affected Realization carried the missing-relationship unknown reason; the concurrent topology change made its display result stale and readiness blocked |
| Forbidden impact cycle | Evaluation terminated, listed both cycle members, attached the cycle unknown reason, and blocked readiness even where a stale display result had higher precedence |
| Invalid endpoint and duplicate fact | Both produced stable blocking findings rather than an inferred relationship |
| Malformed policy and graph inputs | Unsupported impact, participation-role, applicability-purpose, node-revision, duplicate-universe, and impossible bidirectional-cycle combinations failed before evaluation instead of shrinking or contradicting propagation |
| Exact artifact-binding mismatch | The owning Realization entered the changed set, carried an exact-binding reason, and was noncurrent |
| Artifact removal or reassignment | Removal blocked and attached an unknown-removal reason to the stale prior owner; reassignment entered both the prior and new owners in the changed set |
| Relationship-topology revision | Added and removed edges entered their declaring source nodes in the initial change set even when a producer supplied unchanged node revisions |
| Missing external observation | The dependent Evidence became unknown; a mismatched observed revision made it stale |
| Expiry and invalidation | Explicit time and event inputs produced both reasons; the experimental display precedence selected invalidated without discarding expiry |
| Invalid expiry input | An invalid explicit evaluation time or expiry boundary became unknown instead of current |
| Consequential-use axes | Failed conformance and contradicted governing authority blocked use while remaining separate from a current freshness result |
| Supersession | The predecessor remained in the full graph, left the ordinary applicable graph, and returned for historical reproduction |
| Receipt replay | Exact repeated inputs reproduced the receipt and evaluation ID; a one-second input change produced a different ID |
| Review-input binding | A changed evaluation-policy revision or evaluator digest made every otherwise exact review outdated and blocked readiness |
| Input permutation | Reordered set-like sequences produced byte-equivalent canonical receipt content and the same evaluation ID |
| Lifecycle projection | A status change altered generated navigation and read-only virtual frontmatter without changing the stable source path or causing evaluator mutation; a content-modified receipt was rejected |
| NKF representation | Every current record, non-record, and governed artifact was projected without promoting non-records to records |
| NKF whole-root simulation | With an explicitly asserted reviewed baseline, exact reviews were reusable and every applicable accepted Decision was classified |
| Sparse NKF baseline | The current declared graph missed the active Task when the Draft Design changed; unconfirmed completeness blocked the result |
| Non-record alternatives | Context-only handling could not independently evaluate all documents; auto-promotion changed authority; stable document nodes avoided both defects |

The evaluator also separates full, applicable, and current projections;
applicability, participation role, authority, freshness, and conformance axes;
and simultaneous reasons from the single experimental display result.

## Whole-Root Comparison

The versioned semantic oracle reviewed every controlled fixture subject, not
only the calculated closure.

| Scenario | Whole-Root Subjects | Calculated Review Subjects | False Positives | False Negatives |
| --- | ---: | ---: | ---: | ---: |
| Product Decision change | 5 | 3 | 0 | 0 |
| Technology Specification change | 4 | 2 | 0 | 0 |
| NKF Draft Design change on current sparse declarations | 271 | 1 | 0 | 1 |
| Same NKF change after the reviewed Task-to-Design baseline edge | 271 | 2 | 0 | 0 |

The NKF false negative is
`document:tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md`.
The active Task owns the Design work and must be reviewed when the Design
revision changes, but NKF 0.4 represents the Task as a non-record and has no
semantic Task-to-Design edge. Ordinary Markdown links cannot supply that
authority.

The prototype does not normalize the miss. The current NKF candidate universe
is `unconfirmed`, so the sparse result is blocked and every applicable subject
carries a blocking unknown-completeness reason even when another display
result has higher precedence. A controlled one-time baseline then adds one source-bound
`depends-on` edge from the Task document node to the Design record and marks
that exact experimental universe confirmed. The recomputed closure contains
both oracle subjects with reason paths and no miss.

This proves two separate points:

1. stable node coverage is not semantic graph completeness; and
2. a reviewed baseline can correct a known omission without making every
   document mandatory for each change.

It does not prove that the one added edge makes the entire NKF graph complete.
The `confirmed` baseline in that case is a controlled simulation, not a claim
about the live 0.4 declarations.

## NKF Baseline And Review Cost

The direct repository projection at the Draft Design checkpoint `7f154af`,
before this Evidence joined the candidate universe, contained:

| Surface | Count |
| --- | ---: |
| Record nodes | 161 |
| Stable non-record document nodes | 110 |
| Total knowledge subjects | 271 |
| Governed artifacts | 162 |
| Declared record relationships | 70 |

The 70 relationships were 43 `extends`, 10 `realizes`, 6 `rationale-for`, 6
`supersedes`, 3 `governs`, 1 `references`, and 1 `depends-on`. The new Design
declaration accounts for one `extends` and the existing `depends-on`; the
active Task still has no relationship under 0.4.

For the NKF Design-change oracle, reading every represented knowledge subject
would consume 3,509,328 UTF-8 bytes. The two-subject corrected closure consumes
49,791 bytes. At the explicitly rough four-bytes-per-token estimate, that is
about 877,332 tokens versus 12,448 tokens: a 99.26 percent subject reduction
and 98.58 percent byte reduction. This is a cost indicator, not a model billing
or semantic-quality claim.

## Non-Record Strategy Evidence

The current repository has 110 declared non-records, including navigation,
Evidence, and Tasks. Three strategies were exercised:

| Strategy | Independently Freshness-Evaluable | Authority Mutation | Finding |
| --- | --- | --- | --- |
| Stable document nodes | yes | no | Preserves record authority while giving every governed document a stable identity and revision |
| Context-only aggregate | no | no | Cannot identify which Task or Evidence item is noncurrent and leaves the all-document goal incomplete |
| Promote every non-record to record | yes | yes | Changes Task, Evidence, and navigation authority by implication and is therefore unsafe without a separate Product decision |

The evidence favors stable document nodes as the successor candidate. It does
not accept that node kind or its exact serialization. A stable document node
must remain non-record authority, and completeness must still be established
separately from representation.

## Supported And Unsupported Direction

The exercise supports, within controlled local evidence:

- one logical graph with distinct record and stable document nodes;
- Markdown meaning plus YAML declarations without computed-state writeback;
- contextual freshness distinct from lifecycle, applicability, authority, and
  conformance;
- deterministic reverse impact for dependency-like relationships;
- explicit reason paths, full/applicable/current projections, and
  revision-bound semantic-review provenance;
- blocking unknown for unconfirmed completeness, missing material declarations,
  external unobservability, and cycles;
- Decision classifications that remain human inputs; and
- generated lifecycle navigation and virtual frontmatter over stable paths.

The exercise does not yet support:

- claiming the current NKF graph or any consumer graph is semantically
  complete;
- the exact final relationship-to-impact mapping beyond the exercised cases;
- a useful general distinction between `hard` and `review` propagation—the
  only proven hard behavior is exact binding failure;
- a normative display-result precedence rather than a set of simultaneous
  reasons;
- exact schemas, compatibility, migration, receipt storage, signing, privacy,
  or retention;
- cross-repository traversal, polling, credentials, or live external
  authority resolution; or
- production correctness, performance, or usability in a real consumer
  repository.

## Finding Classification

1. **Specification and contract gap:** NKF 0.4 cannot derive complete semantic
   impact or freshness and has no truthful baseline-completeness state.
2. **Prototype policy finding:** representation completeness and semantic-edge
   completeness must be separate; otherwise a fully enumerated sparse graph
   can produce a false-current claim.
3. **Prototype topology finding:** stable non-record document nodes are the
   only tested strategy that supports all-document freshness without changing
   current record authority.
4. **Migration finding:** a one-time human or agent-reviewed graph baseline is
   unavoidable. Mechanical extraction may propose candidates but cannot mark
   semantic completeness.
5. **Unsupported policy:** the hard/review distinction and most relationship
   mappings need broader consumer evidence and must remain explicitly
   refinable.

There is no current checker bug or consumer nonconformance in these findings:
NKF 0.4 never claimed this capability. Any normative correction is a new NKF
version and a later explicitly authorized implementation Task.

## Reproduction

From the NKF-025 Task worktree with exact repository dependencies installed:

```sh
node --test experiments/nkf-025/evaluator.test.mjs
node experiments/nkf-025/measure.mjs
npm run nkf:check
```

The first command must report 25 passing tests. The second must report the
policy digest, zero controlled-fixture misses, the blocked current sparse NKF
comparison, the single named pre-baseline false negative, and the corrected
two-subject closure. Repository counts and whole-root byte cost naturally grow
as this Task adds Evidence; the exact figures above are the historical
`7f154af` comparison, not a self-updating claim. The third command is the only
supported NKF authoring-handoff gate and remains separate from prototype
behavior.
