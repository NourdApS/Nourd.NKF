---
summary: Extend the confirmed initial NKF onboarding path with a standalone project-local bootstrap experience, large documented brownfield migration, source-rich system reconstruction, complex recovery, and advanced already-adopted compatibility workflows.
created_at: 2026-07-31T09:51:12Z
task_id: NKF-014
task_status: deferred
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
---

# NKF-014: Expand Brownfield And Advanced Onboarding

- **Activation Condition:** `NKF-013` must remain complete as historical
  provenance, `NKF-015` must deliver and confirm its released successor
  initial-onboarding path, and the Human Product Owner must separately
  activate this expansion.

## Purpose

Extend NKF onboarding beyond the deliberately narrow first iteration to
repositories whose knowledge, implementation, history, or interrupted state
requires substantial reconstruction, migration, compatibility analysis, or
long-lived recovery. Also provide a self-contained initial-adoption entry
point for a user who has a project repository but no local NKF repository,
preinstalled NKF skill, or manually assembled integration.

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
   historical rollback;
9. advanced migration, compatibility, and recovery for already adopted
   repositories beyond the idempotent first-iteration path; and
10. a content-bound, temporary, project-local bootstrap experience that makes
    the portable onboarding workflow discoverable without cloning NKF,
    globally installing a skill, or manually copying integration files.

## Standalone Bootstrap Experience

The intended user journey begins from a project repository and one public
bootstrap command. The user does not need the NKF repository and does not
manually construct `.nourd`, native YAML, instruction adapters, skills, or
release bindings.

The bootstrap command installs a temporary project-local envelope containing:

- byte-identical `.agents` and `.claude` representations of the portable
  `nkf-onboarding` skill;
- the complete vendor-neutral pre-adoption protocol;
- the minimum thin agent-host adapters needed by the supported host registry;
  and
- a closed manifest binding every bootstrap-owned path to an exact trusted
  release and digest.

The bootstrap envelope does not create `.nourd` and does not make the project
adopted. Every bootstrap file remains visible to the complete repository
review and deterministic source snapshot. The agent may classify an exact
manifest-bound envelope as incidental onboarding tooling, but neither the
agent nor the executable may use that classification to hide other project
content or infer the onboarding category.

The installer must fail closed rather than overwrite a pre-existing path.
Bootstrap files must be regular project-contained files, never symbolic
links. Any changed, missing, additional, or digest-mismatched bootstrap path
invalidates automatic cleanup and requires explicit resolution.

After a successful atomic onboarding transaction, the exact temporary
onboarding envelope is removed or replaced by the permanent NKF authoring
protocol, authoring skills, verified host adapters, release pin, and project
validation entry point. A failed onboarding leaves the predecessor project
recoverable and must not strand a partially converted instruction topology.

The desired user-facing interaction is:

```text
Create Or Open Project Repository
        ↓
Run One Content-Bound NKF Bootstrap Command
        ↓
Ask A Supported Agent To Onboard The Repository
        ↓
Resolve Authority And Category Questions
        ↓
Review And Apply One Checked Draft Candidate
```

The exact distribution surface, command name, trust-root acquisition,
offline path, host-adapter set, manifest contract, conflict behavior, and
bootstrap-to-authoring transaction require a later Design and accepted
Decision under this Task.

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
- A user with no NKF checkout or preinstalled NKF skill can begin adoption
  through one documented public bootstrap command.
- The bootstrap envelope is project-local, provider-neutral, content-bound,
  non-overwriting, visible in the source snapshot, and removable only when its
  exact manifest and bytes verify.
- Supported native-skill and adapter-only agent hosts reach the same neutral
  onboarding protocol without acquiring different NKF obligations.
- Successful onboarding atomically replaces temporary onboarding guidance
  with permanent authoring integration; failure preserves or restores a
  coherent predecessor instruction topology.
- Exact successor Realizations are independently confirmed before completion.

## Guardrails

- Do not begin this Task merely because the agent cannot recommend either
  category supported by `NKF-015`; report the evidence, fail closed, and
  request explicit activation.
- Do not weaken the first-iteration boundary to hide unsupported brownfield
  behavior.
- Do not infer acceptance, historical Decisions, Root Profile, or Product
  meaning from source.
- Do not hash a complete source tree merely because it was inspected.
- Do not treat model-derived reconstruction as authoritative or confirmed.
- Do not require a consumer to clone the NKF authority repository as an
  onboarding dependency.
- Do not treat an ambient global skill installation or moving recommendation
  as a reproducible project dependency.
- Do not let temporary bootstrap tooling create a second onboarding protocol,
  silently overwrite consumer instructions, disappear from source capture,
  or remain after successful transition unless explicitly retained by an
  accepted later Design.
- Do not modify an external consumer without its own authority.

## Deferred Execution Plan

When the Human Product Owner activates this Task:

1. confirm the semantic criteria and authority checkpoints for each deferred
   repository category before implementing its path;
2. design the standalone bootstrap envelope, public one-command experience,
   trust-root acquisition, exact manifest, supported host adapters, conflict
   behavior, and atomic transition to permanent authoring integration;
3. reconcile that Design with the released NKF-015 assessment, candidate,
   seal, onboarding, and validation boundaries;
4. design each activated brownfield, interrupted, reconstruction, migration,
   or recovery capability without collapsing observation into authority;
5. obtain the applicable accepted Decisions before implementation;
6. implement deterministic safety, transaction, rollback, integrity,
   compatibility, and adversarial fixtures around the accepted agent-led
   workflows;
7. exercise Empty, Tiny Knowledge, brownfield, interrupted, already-adopted,
   online, offline, conflict, tamper, rollback, and cross-host cases applicable
   to the activated scope; and
8. publish public guidance and independently audit and confirm the exact
   successor Realizations before completing the Task.

## Origin

The initial `NKF-013` draft captured a complete onboarding vision. Before any
Design or implementation began, the Human Product Owner restricted the first
iteration to greenfield projects with an empty or small documentation set and
directed that all broader work be deferred. This Task preserves that broader
scope as an explicit successor rather than leaving it implicit in the active
iteration.

The Human Product Owner later identified the standalone bootstrap gap: a user
starting from an empty repository should not need a local NKF checkout or an
already installed NKF skill merely to discover and run onboarding. The
project-local, content-bound bootstrap direction is recorded here for later
Design and activation rather than being added to the current NKF-015
realization.

## Decision Applicability

### Applicable Decisions

No accepted decision applies to this Task.

### Mandatory Capabilities

No mandatory capability is implicated by this Task.

This gate was added retrospectively during the NKF 0.2 self-migration; no
historical extraction is implied.
