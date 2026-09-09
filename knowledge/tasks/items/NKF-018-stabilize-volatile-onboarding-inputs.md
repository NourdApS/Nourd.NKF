---
title: "NKF-018: Stabilize Volatile Onboarding Inputs"
summary: Define and realize a safe onboarding snapshot boundary that remains sensitive to meaningful repository drift without repeatedly failing on volatile incidental operating-system metadata such as .DS_Store — deferred since 2026-08-01, with the closed three-name registry that answers it adopted under ADR 0138 and being delivered in NKF 0.81 under NKF-038.
created_at: 2026-08-01T18:41:40Z
---

# NKF-018: Stabilize Volatile Onboarding Inputs

## Human Direction

The Human Product Owner requires NKF to address repeated onboarding drift
caused by volatile incidental files.

This Task was created by explicit direction on `2026-08-01` after the Nourd
Agent SDK pre-release onboarding exercise exposed the problem. Creation does
not authorize Design, Decision, Specification, implementation, release, or
consumer work. Begin only after separate explicit human direction to start
[NKF-018](NKF-018-stabilize-volatile-onboarding-inputs.md).

The legacy envelope related this Task to
[NKF-013](NKF-013-initial-greenfield-onboarding.md),
[NKF-015](NKF-015-agent-led-initial-onboarding.md), and
[NKF-017](NKF-017-complete-portable-onboarding-topology.md), the completed
Tasks that delivered the onboarding snapshot this Task stabilizes; those
relations are carried here as prose. This native rewrite on 2026-09-08 under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
replaced the legacy-locked NKF 0.4 source; the Task's substance, deferred
state, and creation direction are unchanged.

## Problem

Initial onboarding deliberately captures every project entry outside
top-level `.git` metadata. Sealing binds the exact captured snapshot, and
atomic onboarding rechecks it before mutation. This correctly prevents a plan
from being applied to repository bytes it did not review. That boundary was
accepted at NKF 0.1 and stands unchanged through the live NKF 0.8.

In the Agent SDK exercise, `.DS_Store` was captured at SHA-256
`9574242bdf9479e7762669e781a2dd5f3b961e4670c30373287ee4fad3c22829`.
Finder later rewrote the same path to SHA-256
`e06333cced2a7c1c5f3ae4526d4567c37b4bdf7ef120d23d9ca438840a11f7f0`.
Preflight therefore correctly emitted `NKF-ONBOARDING-INSPECTION-DRIFT` and
stopped before atomic onboarding. Repeated fresh plans remained fragile while
Finder continued updating the file.

The file is semantically incidental, but it participates in the mechanical
snapshot like meaningful knowledge, source, and configuration. `.gitignore`
does not change that boundary because NKF inspects filesystem entries rather
than Git tracking state.

The behavior is safe but creates avoidable onboarding friction. A careless
exclusion rule could create a worse defect by allowing meaningful or malicious
changes to hide behind ignored names.

## Desired Outcome

Define and implement a deterministic, portable, and secure boundary for
volatile incidental project entries during onboarding.

Complete repository review must remain complete. Meaningful source,
knowledge, configuration, instructions, and unresolved material must still be
captured and protected against drift. Recognized volatile metadata should not
repeatedly invalidate a sealed plan when its semantic classification and safe
handling are already explicit.

## Scope

- distinguish the complete semantic-review universe from the exact resources
  that must remain byte-stable through atomic onboarding;
- determine whether volatile incidental entries are excluded, normalized,
  separately recorded, cleaned before capture, or handled through another
  explicit mechanism;
- define which authority owns the volatile-resource classification;
- decide whether NKF Core supplies a closed portable registry, a project may
  declare bounded additions, or both;
- define path, file-kind, content, timing, and platform constraints for any
  recognized volatile resource;
- preserve detection of additions, removals, moves, and byte changes for all
  meaningful or unresolved project resources;
- preserve symbolic-link, special-file, escaping-path, collision, source,
  candidate, integration, and Git-binding safety;
- reconcile inspection, plan, seal, preflight, transaction, receipt,
  diagnostics, agent guidance, public documentation, and compatibility;
- reproduce the `.DS_Store` failure and exercise relevant cross-platform
  operating-system metadata cases; and
- independently audit and confirm the exact successor before release.

## Required Design Questions

1. Must volatile entries remain visible in inspection Evidence even when their
   bytes are excluded from the atomic drift digest?
2. Which exact resource kinds are safe to recognize, and how are broad globs or
   attacker-controlled filenames prevented from becoming a bypass?
3. May project authority add exclusions, or must NKF use only a closed
   contract-owned registry?
4. Should safe cleanup occur before capture, or must onboarding never delete a
   consumer file automatically?
5. How are newly appearing volatile entries between seal and application
   treated without allowing arbitrary new content?
6. How do macOS, Windows, Linux, editors, and other tooling differ, and which
   cases belong in NKF Core rather than future extensions?
7. Does the accepted solution change the live version's normative meaning
   (NKF 0.1 when this Task was written; NKF 0.8 today), or only repair adopter
   behavior within the existing complete-review boundary?
8. What migration or receipt compatibility is required for plans and adopters
   created before the change?

## Guardrails

- Do not weaken fail-closed drift protection for meaningful or unresolved
  resources.
- Do not use `.gitignore` as NKF authority or silently equate untracked with
  incidental.
- Do not introduce an unrestricted user-supplied ignore list.
- Do not infer safety from a filename alone when the path could contain
  meaningful or attacker-controlled data.
- Do not let the adopter silently delete project-owned files.
- Do not narrow the participating agent's complete repository review.
- Do not change Governed Validation Inputs or normal post-adoption conformance
  snapshots by implication; reconcile those separately if affected.
- Do not call a successful retry acceptance, Realization confirmation,
  release, or consumer adoption of a published successor.

## Future Execution Plan

1. Reproduce and bind the exact Agent SDK `.DS_Store` drift sequence as
   Evidence.
2. Audit inspection, sealing, preflight, snapshot, transaction, receipt, and
   public-guidance behavior against the accepted authority of the live NKF
   version.
3. Compare closed volatile registries, explicit project declarations,
   normalization, separate observation sets, and pre-capture cleanup.
4. Threat-model filename abuse, hidden meaningful content, race conditions,
   symbolic links, special files, and cross-platform metadata.
5. Obtain a Human Product Owner Decision on one exact semantic and security
   boundary.
6. Update the canonical Specification and executable companion if normative
   meaning changes.
7. Derive adopter, checker, Schema, diagnostic, fixture, test, skill, protocol,
   documentation, receipt, release, and compatibility changes.
8. Exercise volatile-only drift, meaningful drift, mixed drift, appearance and
   disappearance races, rollback, idempotence, and supported platforms.
9. Run a fresh Agent SDK pre-release exercise only under separate consumer
   authority.
10. Record an independent audit and obtain exact Realization confirmation
    before release.

## Acceptance Criteria

- A Decision accepts the exact volatile-resource, authority, security, and
  compatibility boundary.
- Complete semantic review still exposes every project entry outside the
  accepted top-level metadata exclusions.
- A recognized volatile-only change no longer causes repeated unusable plans
  under the accepted handling rule.
- Any meaningful, unresolved, unrecognized, escaping, symbolic-link, special,
  source, candidate, integration, or Git-binding change still fails closed.
- A resource cannot bypass drift protection merely by using a recognized or
  ignored-looking filename.
- The solution is deterministic and portable across every platform claimed as
  supported.
- Diagnostics distinguish safe volatile change from blocking inspection drift
  without claiming that semantic safety was mechanically proven.
- Plans and receipts record enough information to audit exactly which
  resources participated in review and atomic drift protection.
- Fixtures and tests reproduce the Agent SDK failure and cover positive,
  negative, adversarial, race, rollback, and idempotence cases.
- Agent guidance and public documentation explain why `.gitignore` is not the
  authority and how volatile resources are handled.
- Existing consumers and predecessor plans receive explicit compatibility and
  migration treatment.
- Independent audit Evidence records no unresolved material finding, and a
  separate Decision confirms the exact successor Realization before release.

## Deferred-State Rule

This Task records required future work only. It selects no exclusion model
itself, classifies no operating-system file as safe, changes no onboarding
snapshot contract, authorizes no further Agent SDK retry, and claims no
implementation under its own name. The selection recorded in the Current
Progress below was made under
[ADR 0138](../../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md)
and is being delivered under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
not under this Task.

## Current Progress

Created deferred on `2026-08-01`. From creation through the live NKF 0.8 the
problem stood exactly as recorded above: onboarding on macOS failed whenever
Finder rewrote `.DS_Store` between inspection and adoption.

On `2026-09-08` the Human Product Owner confirmed, at the NKF 0.81 Design, a
fixed three-name volatile registry, and
[ADR 0138](../../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md)
item six adopts it: the 0.81 Specification defines a closed registry of
exactly three operating-system metadata basenames — `.DS_Store`, `Thumbs.db`,
`desktop.ini` — that inspection records with a `volatile` classification and
the onboarding drift digest excludes, with no globs, no project-declared
additions, no content inspection, no automatic deletion, every other entry
keeping its fail-closed protection, and `.gitignore` holding no authority for
the boundary. That settles Required Design Questions one through four in
favour of visibility, closed basenames, a contract-owned registry, and no
automatic deletion; question seven is answered as a normative change shipped
in a new version rather than an adopter-only repair.

[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
delivers that scope in the NKF 0.81 Specification, adopter, fixtures, and
guidance, and its acceptance criteria require the `.DS_Store` reproduction
recorded here to pass onboarding while a meaningful-file change between seal
and adoption still fails closed and the volatile entries remain visible in
inspection Evidence. This Task stays deferred until that release closes it or
a later governed revision changes its state; the release Task's completion,
not this rewrite, is where the outcome is proven.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | A change to the onboarding snapshot boundary is a consequential pre-stable change requiring evidence, reproduction, compatibility analysis, Human Product Owner confirmation, authority-first specification updates, derived implementation, a versioned release, and deliberate consumer migration; a successful retry cannot change NKF by implication. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority remain separate axes; a passing onboarding run accepts nothing and confirms no Realization. |
| [`adr-0069`](../../decisions/0069-agent-led-initial-onboarding.md) | record | Mechanical capture, sealing, application, rollback, and validation stay deterministic while semantic assessment stays with the agent; a volatile-resource rule must not narrow the agent's complete repository review or let the executable infer semantic safety from a filename. |
| [`adr-0071`](../../decisions/0071-complete-portable-onboarding-topology.md) | record | The complete portable onboarding topology, its continuing conformance, and its deliberate predecessor repair are the accepted baseline; any snapshot change reconciles inspection, plan, seal, preflight, transaction, receipt, and compatibility for predecessor plans and adopters. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0138`](../../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md) | record | The volatile boundary is a closed contract-owned registry of exactly `.DS_Store`, `Thumbs.db`, and `desktop.ini`, recorded visibly in inspection and excluded from the drift digest, with no globs, project additions, content inspection, or automatic deletion; any handling this Task would deliver is that adopted rule or a later governed revision of it, never an adopter-only exclusion. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Complete semantic review still exposes every project entry outside the accepted top-level metadata exclusions, volatile entries included | unknown | none | none |
| A recognized volatile-only change no longer produces repeated unusable plans | unknown | none | none |
| Every meaningful, unresolved, unrecognized, escaping, symbolic-link, special, source, candidate, integration, or Git-binding change still fails closed, and no resource bypasses drift protection by filename alone | unknown | none | none |
| Diagnostics, plans, and receipts distinguish safe volatile change from blocking drift and record exactly which resources participated in review and drift protection | unknown | none | none |
| Fixtures and tests reproduce the Agent SDK `.DS_Store` failure and cover positive, negative, adversarial, race, rollback, and idempotence cases across every supported platform | unknown | none | none |

This gate was extracted at the native rewrite on 2026-09-08, replacing the
empty retrospective placeholder recorded at the NKF 0.2 self-migration.
