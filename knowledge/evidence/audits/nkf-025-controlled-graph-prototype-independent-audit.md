# NKF-025 Controlled Graph Prototype Independent Audit

## Audit Boundary

This Evidence records a fresh, read-only technical audit of the exact
NKF-025 experimental checkpoint
`a68254ca1ae2f6f206ad43e11737d67f05b5bc1a`. The remote branch
`task/NKF-025` resolved to that same commit before the audit began.

The audit evaluated the disposable files under `experiments/nkf-025/`, the
Draft Design, the controlled exercise Evidence, the active Task, and the exact
branch delta. It did not evaluate or accept an NKF 0.5 Specification,
executable contract, Schema, production checker, adopter, migration,
Realization, release, or consumer adoption. It supplied no Human Product Owner
acceptance and no governing authority.

## Audit Independence

The final audit started in a new temporary directory from a fresh remote clone
of the exact task branch. It did not reuse the authoring worktree, installed
dependencies, generated files, validation receipt, or conclusions from the
earlier audit attempts. The clone remained tracked-clean after all checks.

Two earlier candidate audits were deliberately rejected:

1. checkpoint `234f4e5edc...` allowed malformed policy values, incomplete node
   revisions, invalid expiry inputs, insufficient Decision coverage, and weak
   external-observation shape to evade the intended fail-closed boundary;
2. checkpoint `2358976975b43a8afff8d68d169e73707684679b` corrected those
   defects, but deeper review found that governed-artifact removal or
   reassignment and relationship-topology changes were not all guaranteed to
   enter the changed set, semantic reviews did not bind evaluator and policy
   revisions, and bidirectional `binds` propagation contradicted its own
   forbidden-cycle setting.

Both targets were abandoned rather than receiving a qualified clean result.
The final audit restarted after the corrections were committed and pushed.

## Reproduction Results

| Audit Group | Independent Result |
| --- | --- |
| Remote identity | Fresh clone root and origin matched the NKF repository; local `HEAD` and live `refs/heads/task/NKF-025` both equalled `a68254ca1ae2f6f206ad43e11737d67f05b5bc1a` |
| Dependency install | `npm ci` installed 72 packages from the lockfile; npm reported zero vulnerabilities |
| Canonical handoff gate | `npm run nkf:check` passed the pinned NKF 0.4 checker, all 28 host test files and 210 tests, deterministic build/adopter/public-documentation verification, and full self-conformance with zero diagnostics |
| Focused experiment | `node --test experiments/nkf-025/evaluator.test.mjs` passed all 25 cases |
| Deterministic measurement | Two separate measurement runs produced byte-identical output with SHA-256 `6c52bae2219d5f7459064503cf12af130fb53031997fb0bebc2fd3f1533f4961` |
| Evaluator binding | Independent SHA-256 of `evaluator.mjs` equalled the receipt identity `2d73766969661456314bac05f4d129584de60c542a65d46f867aa98b921a5c2b` |
| Scope isolation | Comparison with remote `master` showed Task, Draft Design, Evidence, declarations/navigation, and `experiments/nkf-025/` only; no frozen 0.4 authority, production source, checker, adopter, migration, public documentation, release, package, or lockfile changed |
| Repository mutation | Build and validation left the audit clone with no tracked or staged difference |

The canonical gate separately reported that authority binding was not
evaluated and governing use was not ready. Its conformance result therefore
does not become acceptance, Design adoption, semantic adequacy, or confirmed
Realization.

## Independent Adversarial Review

A separate audit script outside the repository made 23 assertions against the
exported evaluator. It independently verified that:

- malformed impact, revision, participation-role, applicability-purpose,
  artifact-owner, and impossible bidirectional-cycle inputs fail closed;
- invalid expiry inputs produce `unknown` rather than current;
- a changed accepted Decision without classification stays noncurrent;
- governed-artifact removal blocks and relationship removal enters the
  declaring source node in the changed set;
- a content-modified receipt and a receipt for another graph revision cannot
  drive virtual frontmatter;
- changing evaluation policy makes otherwise exact semantic reviews outdated;
- unconfirmed graph completeness blocks;
- conformance, governing authority, and freshness remain separate while a
  failed conformance or contradicted governing authority blocks consequential
  use; and
- the evaluator digest is the digest of the executed source bytes.

The audit also reproduced the principal known limitation: if a human or agent
incorrectly labels a semantically incomplete baseline `confirmed`, an
undeclared Task-to-Design dependency can still be omitted from the calculated
closure. The evaluator cannot prove the absence of undeclared meaning. This is
not hidden by the Evidence: the Task keeps the universal missing-edge
capability `unknown`, and the Design requires unconfirmed completeness to
block.

## Claim Reconciliation

The controlled Product and Technology oracles reproduced with zero false
positives and zero false negatives. The direct NKF projection reproduced the
single sparse-graph false negative, blocked while completeness was
unconfirmed, and matched the two-subject oracle only after the reviewed
Task-to-Design edge was supplied. Stable document nodes remained independently
evaluable without record-authority promotion; context-only handling remained
incomplete and automatic promotion still changed authority.

The measured reduction is therefore evidence about these exact controlled
oracles, not proof of a generally complete graph or production token cost.
Likewise, the 25 cases support the listed experimental behaviors but do not
resolve final YAML Schemas, graph-baseline authority, broad relationship
policy, hard-versus-review value, receipt storage, migration, cross-repository
resolution, or real-consumer usability.

## Verdict

**Clean within the declared NKF-025 evidence-only scope.** No unrecorded
material contradiction, fail-open implementation defect, production-surface
mutation, or false acceptance claim remains in the exact audited checkpoint.

The verdict supports using the prototype and Evidence to make the next
Product decisions. It does not accept the Draft Design, authorize normative
NKF 0.5 work, prove a complete consumer baseline, or make either of the Task's
remaining unknown mandatory capabilities proven.
