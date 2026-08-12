# NKF-025 Pre-Release NKF Self-Consumer Worktree Exercise

## Evidence Boundary

This Evidence supports
[NKF-025](../../tasks/active/NKF-025-validate-freshness-and-knowledge-graph-direction.md)
and the active
[NKF Freshness And Deterministic Knowledge Graph](../../designs/active/freshness-and-deterministic-knowledge-graph.md)
Design. It records a pre-release self-consumer exercise against the actual NKF
Technology repository at exact commit
`1628e2c3d1273c04a81b343a113d540d6606092f`.

The exercise used a separate temporary detached Git worktree. It did not
create or accept an NKF 0.5 authority pair, change the frozen NKF 0.4 set,
publish a release, run the public Adopt operation for 0.5, confirm a
Realization, or make the Draft Design adopted. It tests the disposable
NKF-025 evaluator as a pre-release candidate only. Actual NKF 0.5 adoption is
possible only after an immutable 0.5 release exists.

## Exact Procedure

The authoring worktree and remote both identified the independent NKF
repository before the detached worktree was created. The temporary worktree
was detached at the exact commit above, then exercised as follows:

1. `npm ci` installed the exact lockfile closure: 72 packages.
2. `node --test experiments/nkf-025/evaluator.test.mjs` ran the focused
   prototype suite.
3. `node experiments/nkf-025/measure.mjs` projected the actual detached NKF
   knowledge root, compared the sparse and reviewed-baseline cases with the
   whole-root oracle, and measured the review set.
4. Two independent measurement invocations were hashed.
5. `npm run nkf:check` ran the pinned NKF 0.4 check followed by the complete
   producer-host gate.
6. Git status verified that the detached worktree remained tracked-clean.
7. The temporary worktree was removed after the results were captured.

## Results

| Exercise Surface | Exact Result |
| --- | --- |
| Focused prototype | 25 tests passed, zero failed |
| Measurement reproduction | Both outputs had SHA-256 `9f5388607b974a07409a0fac4f32623267e5c76e40a21a7eaf5a1cae88829a7b` |
| Actual NKF projection | 161 record nodes, 112 stable document nodes, 273 total knowledge subjects, 162 governed artifacts, and 70 declared relationships |
| Sparse baseline | Completeness remained `unconfirmed`; readiness blocked and the Task document was the one false negative against the exact Design-change oracle |
| Reviewed baseline simulation | The Design and its owning Task formed the exact two-subject closure with zero false positives and zero false negatives |
| Controlled Product profile | Three of five subjects were mandatory, with zero false positives and zero false negatives |
| Controlled Technology profile | Two of four subjects were mandatory, with zero false positives and zero false negatives |
| NKF whole-root comparison | Two of 273 subjects were mandatory for the exact Design-change case after the reviewed edge was supplied |
| Approximate review reduction | 99.27 percent by subject count and 98.31 percent by source bytes for that exact scenario |
| Canonical handoff gate | Pinned 0.4 check passed; 28 host test files and 210 tests passed; full self-conformance reported zero diagnostics |
| Post-exercise Git state | Detached `HEAD` remained tracked-clean at the exact source commit |

The canonical gate separately reported authority binding as not evaluated and
governing use as not ready. Those states do not become acceptance, Design
adoption, confirmed Realization, or NKF 0.5 readiness.

## Capability Reconciliation

The exercise resolves the Task findings only within the investigation's
declared boundary:

1. The actual NKF sparse graph did not silently claim readiness. Unconfirmed
   completeness blocked, whole-root semantic comparison exposed the missing
   Task-to-Design relationship, and supplying that reviewed relationship
   produced the exact two-subject closure without making all 273 subjects
   mandatory. This proves the bounded fail-closed behavior exercised by this
   Task.
2. The actual NKF repository is the required Technology-shaped producer
   self-consumer. Combined with the controlled Product profile, it proves the
   Product and Technology behavior required by this validation Task without
   pretending that an unpublished version was adopted.
3. A later NKF 0.5 implementation and release Task must still audit and
   publish the immutable candidate, self-adopt that published release in its
   branch, and merge only after the adopted producer state passes its gate.
   Real Product-repository adoption is later evidence, not a prerequisite that
   can be fabricated before publication.

The known semantic limit remains: a human or agent can incorrectly confirm an
incomplete baseline. Software cannot prove the absence of undeclared meaning.
The confirmed contract direction therefore requires a named revision-bound
reviewer, treats absent, outdated, or disputed confirmation as `unknown`, and
uses whole-root semantic review as recovery. This exercise does not claim
universal graph completeness.

## Verdict

**Clean within the pre-release self-consumer boundary.** The detached NKF
Technology repository reproduced the intended fail-closed baseline behavior,
the corrected targeted closure, deterministic measurements, full NKF 0.4
conformance, and a clean tracked state. The result supports concluding the
evidence-only investigation after a fresh final audit. It does not authorize
NKF 0.5 implementation, publication, or adoption.
