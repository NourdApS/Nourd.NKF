---
summary: Define and realize a safe onboarding snapshot boundary that remains sensitive to meaningful repository drift without repeatedly failing on volatile incidental operating-system metadata such as .DS_Store.
created_at: 2026-08-01T18:41:40Z
task_id: NKF-018
task_status: deferred
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
related_tasks:
  - NKF-013
  - NKF-015
  - NKF-017
---

# NKF-018: Stabilize Volatile Onboarding Inputs

## Human Direction

The Human Product Owner requires NKF to address repeated onboarding drift
caused by volatile incidental files.

This Task was created by explicit direction after the Nourd Agent SDK
pre-release onboarding exercise exposed the problem. Creation does not
authorize Design, Decision, Specification, implementation, release, or
consumer work. Begin only after separate explicit human direction to start
`NKF-018`.

## Problem

Initial onboarding deliberately captures every project entry outside
top-level `.git` metadata. Sealing binds the exact captured snapshot, and
atomic onboarding rechecks it before mutation. This correctly prevents a plan
from being applied to repository bytes it did not review.

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

The current behavior is safe but creates avoidable onboarding friction. A
careless exclusion rule could create a worse defect by allowing meaningful or
malicious changes to hide behind ignored names.

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
7. Does the accepted solution change NKF 0.1 normative meaning, or only repair
   adopter behavior within the existing complete-review boundary?
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
   public-guidance behavior against accepted NKF 0.1 authority.
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

This Task records required future work only. It does not select an exclusion
model, classify every operating-system file as safe, change the current
onboarding snapshot contract, authorize another Agent SDK retry, or claim that
implementation has begun.

## Decision Applicability

### Applicable Decisions

No accepted decision applies to this Task.

### Mandatory Capabilities

No mandatory capability is implicated by this Task.

This gate was added retrospectively during the NKF 0.2 self-migration; no
historical extraction is implied.
