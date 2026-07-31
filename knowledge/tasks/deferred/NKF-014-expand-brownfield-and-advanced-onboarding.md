---
title: "NKF-014: Expand Brownfield And Advanced Onboarding"
summary: Extend the confirmed initial NKF onboarding path to large documented brownfield migration, source-rich system reconstruction, complex recovery, and advanced already-adopted compatibility workflows.
created_at: 2026-07-31T09:51:12Z
task_id: NKF-014
task_status: deferred
---

# NKF-014: Expand Brownfield And Advanced Onboarding

- **Task:** `NKF-014`
- **Status:** Deferred
- **Owner:** Nourd ApS
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Activation Condition:** `NKF-013` must deliver and confirm the released
  initial greenfield and small-documentation onboarding path, and the Human
  Product Owner must separately activate this expansion.

## Purpose

Extend NKF onboarding beyond the deliberately narrow first iteration to
repositories whose knowledge, implementation, history, or interrupted state
requires substantial reconstruction, migration, compatibility analysis, or
long-lived recovery.

## Deferred Scope

This Task owns:

1. migration of large or structurally complex existing knowledge corpora;
2. source-rich, knowledge-poor brownfield system reconstruction;
3. source-grounded current-system Realization generation;
4. proposal generation for missing Specifications, Designs, Tasks, and
   unresolved matters without inventing acceptance;
5. large-scale provenance recovery, lifecycle reconciliation, document moves,
   splits, merges, and semantic reclassification;
6. selective Technology governed-artifact binding derived from explicit
   validity claims rather than whole-repository hashing;
7. complex partial or interrupted onboarding repair;
8. long-lived resumable onboarding sessions and explicit user-directed
   historical rollback; and
9. advanced migration, compatibility, and recovery for already adopted
   repositories beyond the idempotent first-iteration path.

## Brownfield Reconstruction Boundary

Future source-rich onboarding may inspect source code, tests, schemas, package
and build configuration, API descriptions, continuous integration, deployment
configuration, and other durable artifacts. It must classify derived claims
as direct observation, source-grounded interpretation, authority-supplied
meaning, or unresolved matter.

Code can demonstrate what appears to exist. It cannot establish why the
system exists, whether observed behavior is intended, or whether meaning is
accepted. Comments, tests, TODOs, configuration, and implementation cannot
silently create accepted Decisions, Specifications, Tasks, Product meaning,
or confirmed Realizations.

The Product or Technology Root Profile remains a project-authority choice and
is never inferred from source. Product purpose, people served, needs, promise,
and authority remain Draft or unresolved until supplied by Product authority.
Only selected Technology artifacts that participate in a declared validity
claim may enter Governed Validation Inputs.

## Future Acceptance Criteria

- Large documented corpora migrate through an explicit, reviewable, complete
  source-to-candidate map with no unexplained loss.
- Existing topology is preserved by default and every move, split, merge, or
  reclassification has exact provenance and authority treatment.
- Source-rich reconstruction separates observation, interpretation, accepted
  meaning, and unresolved matters.
- The consolidated current-system Realization is navigable, source-traceable,
  and never presented as confirmed without confirmation provenance.
- Complex interrupted state can resume or roll back deterministically without
  false adoption claims.
- Already adopted repositories migrate deliberately between supported
  contracts and releases without following moving recommendations.
- Product and Technology positive, negative, compatibility, interruption,
  recovery, and adversarial fixtures cover the accepted expansion.
- Public documentation explains each activated brownfield and recovery path.
- Exact successor Realizations are independently confirmed before completion.

## Guardrails

- Do not begin this Task merely because a candidate exceeds the `NKF-013`
  boundary; fail closed and request explicit activation.
- Do not weaken the first-iteration boundary to hide unsupported brownfield
  behavior.
- Do not infer acceptance, historical Decisions, Root Profile, or Product
  meaning from source.
- Do not hash a complete source tree merely because it was inspected.
- Do not treat model-derived reconstruction as authoritative or confirmed.
- Do not modify an external consumer without its own authority.

## Origin

The initial `NKF-013` draft captured a complete onboarding vision. Before any
Design or implementation began, the Human Product Owner restricted the first
iteration to greenfield projects with an empty or small documentation set and
directed that all broader work be deferred. This Task preserves that broader
scope as an explicit successor rather than leaving it implicit in the active
iteration.
