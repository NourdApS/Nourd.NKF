---
title: "NKF-014: Expand Brownfield And Advanced Onboarding"
summary: Extend the confirmed initial NKF onboarding path with a standalone project-local bootstrap experience, large documented brownfield migration, source-rich system reconstruction, complex recovery, and advanced already-adopted compatibility workflows — deferred since 2026-07-31 as the explicit successor to the deliberately narrow first onboarding iteration, awaiting the Human Product Owner's separate activation.
created_at: 2026-07-31T09:51:12Z
---

# NKF-014: Expand Brownfield And Advanced Onboarding

## Human Direction

This Task was created deferred on `2026-07-31` when the Human Product Owner
restricted the first onboarding iteration to greenfield projects with an empty
or small documentation set and directed that all broader onboarding work be
preserved as an explicit successor rather than left implicit. Its activation
condition, as written then, had three parts:
[NKF-013](NKF-013-initial-greenfield-onboarding.md) must remain complete as
historical provenance; [NKF-015](NKF-015-agent-led-initial-onboarding.md) must
deliver and confirm its released successor initial-onboarding path; and the
Human Product Owner must separately activate this expansion.

The first two parts now hold. [NKF-013](NKF-013-initial-greenfield-onboarding.md)
is completed, and [NKF-015](NKF-015-agent-led-initial-onboarding.md) is
completed with its Realization confirmed under
[ADR 0070](../../decisions/0070-confirm-agent-led-initial-onboarding.md). The
third part has not been given: no direction has activated this Task, and
creation alone authorizes no Design, Decision, Specification, implementation,
release, or consumer work.

The live NKF version is 0.8, with 0.81 in preparation under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
whose scope explicitly excludes this Task's brownfield onboarding substance.
This native rewrite on 2026-09-08 under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
replaced the legacy-locked NKF 0.4 source; the Task's substance, deferred
state, and creation direction are unchanged.

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
Decision under this Task. When this Task was written the repository was
private and the release channel required collaborator access; since
`2026-09-08` the `NourdApS/Nourd.NKF` repository is public under
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md),
which removes one obstacle to a public bootstrap command without deciding any
of the boundaries listed above.

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
  category supported by
  [NKF-015](NKF-015-agent-led-initial-onboarding.md); report the evidence,
  fail closed, and request explicit activation.
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
3. reconcile that Design with the released
   [NKF-015](NKF-015-agent-led-initial-onboarding.md) assessment, candidate,
   seal, onboarding, and validation boundaries as they stand in the live NKF
   version at activation;
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

The initial [NKF-013](NKF-013-initial-greenfield-onboarding.md) draft captured
a complete onboarding vision. Before any Design or implementation began, the
Human Product Owner restricted the first iteration to greenfield projects with
an empty or small documentation set and directed that all broader work be
deferred. This Task preserves that broader scope as an explicit successor
rather than leaving it implicit in the active iteration.

The Human Product Owner later identified the standalone bootstrap gap: a user
starting from an empty repository should not need a local NKF checkout or an
already installed NKF skill merely to discover and run onboarding. The
project-local, content-bound bootstrap direction is recorded here for later
Design and activation rather than being added to the
[NKF-015](NKF-015-agent-led-initial-onboarding.md) Realization that was then
current. That supporting Realization was confirmed under
[ADR 0070](../../decisions/0070-confirm-agent-led-initial-onboarding.md) and
[ADR 0075](../../decisions/0075-confirm-complete-portable-onboarding-topology.md)
and retired to Git history on `2026-09-08`, as recorded in the
[supporting Realizations retirement](../../evidence/release/nkf-038-supporting-realizations-retirement.md);
the one current Realization is the
[current-system Realization](../../realizations/current-system.md).

## Current Progress

Created deferred on `2026-07-31`. No activation has been directed, and no
Design, Decision, Specification, implementation, fixture, release, or consumer
change has been made under this Task. The initial onboarding path this Task
extends has since been delivered and confirmed through
[NKF-015](NKF-015-agent-led-initial-onboarding.md) and
[NKF-017](NKF-017-complete-portable-onboarding-topology.md) and carried
forward through every release to the live NKF 0.8; the two delivery-side
parts of the activation condition are therefore met, and only the Human
Product Owner's separate activation remains outstanding.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Every consequential brownfield, bootstrap, or recovery change requires evidence, reproduction, compatibility analysis, Human Product Owner confirmation, authority-first specification updates, derived implementation, a versioned release, and deliberate consumer migration; passing fixtures and exercised consumers cannot change NKF by implication. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, acceptance binding, conformance, Realization confirmation, and external authority remain separate axes; source-grounded reconstruction may propose but never accepts, and a generated Realization is unconfirmed until a Decision confirms it. |
| [`adr-0067`](../../decisions/0067-initial-greenfield-onboarding.md) | record | The first onboarding iteration is bounded to empty and small-document repositories with a stable expansion boundary reserved for this Task; every category beyond that boundary fails closed with an explicit deferral rather than being absorbed into the first iteration. |
| [`adr-0069`](../../decisions/0069-agent-led-initial-onboarding.md) | record | Agent-led semantic assessment supplies category recommendations and Draft meaning only, while mechanical capture, sealing, application, rollback, and validation stay deterministic; an expanded path keeps that division and never lets the agent or executable hide project content. |
| [`adr-0071`](../../decisions/0071-complete-portable-onboarding-topology.md) | record | Product and Technology onboarding produce one lifecycle-first knowledge topology with a single reconciled knowledge map and continuing conformance; brownfield migration preserves existing topology by default and treats every move, split, merge, or reclassification with exact provenance. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Large documented corpora migrate through an explicit, complete, reviewable source-to-candidate map with no unexplained loss | unknown | none | none |
| Source-rich reconstruction separates direct observation, source-grounded interpretation, accepted meaning, and unresolved matters and never presents a generated Realization as confirmed | unknown | none | none |
| Complex interrupted onboarding state resumes or rolls back deterministically without a false adoption claim | unknown | none | none |
| Already adopted repositories migrate deliberately between supported contracts and releases without following moving recommendations | unknown | none | none |
| A user with no NKF checkout or preinstalled skill begins adoption through one documented public bootstrap command whose envelope is project-local, content-bound, non-overwriting, snapshot-visible, and removable only when its manifest and bytes verify | unknown | none | none |
| Successful onboarding atomically replaces temporary bootstrap guidance with permanent authoring integration, and failure preserves or restores a coherent predecessor instruction topology | unknown | none | none |

This gate was extracted at the native rewrite on 2026-09-08, replacing the
empty retrospective placeholder recorded at the NKF 0.2 self-migration.
