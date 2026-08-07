---
title: "NKF-008: Publish NKF, Public Documentation, And Consumer Adoption"
summary: Publish a governed internal NKF release, provide public documentation that makes NKF understandable and usable, and onboard authorized consumer repositories deliberately.
created_at: 2026-07-30T17:03:21Z
task_id: NKF-008
task_status: completed
---

# NKF-008: Publish NKF, Public Documentation, And Consumer Adoption

- **Task:** `NKF-008`
- **Status:** Completed
- **Owner:** Nourd ApS

## Purpose

Publish a governed internal NKF release, provide a public and navigable
explanation of NKF, and onboard authorized consumer repositories deliberately
after NKF establishes a coherent current Realization and truthful
self-validation baseline.

Public documentation is part of the NKF 0.1 adoption experience. A user should
not have to reconstruct NKF from the normative Specification, executable YAML,
historical Decisions, or checker source merely to understand what NKF is and
how to use it.

## Scope

- reconcile the current release package with the then-current authority pair,
  schemas, checker, fixtures, and integrity metadata;
- define internal release publication, support, and recommended-release state;
- publish only an explicitly authorized content-addressed NKF 0.1 release;
- define one low-friction adoption, diagnosis, validation, and deliberate
  update experience for authorized consumer repositories;
- publish public documentation that explains NKF without requiring access to
  the private checker distribution or internal repositories;
- migrate or onboard each consumer on its own authority and timeline; and
- preserve evidence of package identity, consumer pinning, and compatibility.

## Public Documentation Requirements

The public documentation must explain, in plain language and with concrete
examples:

1. what NKF is and is not;
2. why NKF exists and which knowledge-governance problems it addresses;
3. the NKF topology, including the project-root `.nourd`, configurable
   project-contained `knowledge_root`, Common Specification, concrete Product
   and Technology Root Profiles, records, sections, semantic entities,
   relationships, Realizations, validation, and external-authority boundary;
4. how knowledge moves through
   `Task → Design → Decision → Specification → Realization → Validation`;
5. how Markdown authority, executable declarations, Schemas, the checker,
   release manifests, consumer pins, and validation results interact;
6. the difference between acceptance, Design adoption, confirmed
   Realization, conformance, `NKF Verified`, and Governing Use Ready;
7. how a user adopts NKF in a new or existing Product or Technology
   repository;
8. the normal authoring, AI-assisted authoring, local checking, continuous
   integration, release update, migration, and recovery workflows;
9. at least one complete Product example and one complete Technology example;
   and
10. current limitations, deferred features, compatibility boundaries, and
    truthful support state.

The documentation must include diagrams for the system topology, authority
flow, lifecycle, validation flow, and release-to-consumer path wherever the
relationship is materially clearer visually.

Public documentation is explanatory and derived. The accepted normative
Markdown Specification remains authoritative when simplified documentation,
examples, generated views, or diagrams are incomplete or conflict.

## Public Documentation Publication

The documentation must be publicly readable without requiring access to the
private NKF checker release or Nourd internal repositories. The publication
surface, URL, build mechanism, update ownership, and release binding remain
Design choices for this Task.

Every published documentation revision must expose:

- the NKF format version it explains;
- whether the referenced checker release is public or internal;
- the exact release or authority revision to which procedural instructions
  apply;
- a visible pre-stable status;
- a route to the canonical normative Specification; and
- the documentation's non-authoritative explanatory role.

Public documentation must not expose private repository contents,
credentials, internal filesystem paths, personal operational data, or
consumer knowledge.

## Acceptance Criteria

- A current internal NKF 0.1 release is reproducibly built, independently
  verified, explicitly authorized, and published with its exact content
  digest.
- A consumer can adopt that release without manually assembling checker,
  contract, skill, adapter, workflow, or digest files.
- Consumer tooling stores an exact release pin and never silently follows a
  moving branch or mutable “latest” dependency.
- Public documentation is published, navigable, and covers every subject in
  the Public Documentation Requirements.
- The documentation contains concrete Product and Technology examples and
  the required topology and flow diagrams.
- Documentation clearly separates explanatory guidance from normative
  authority, implementation confirmation, conformance, and operational state.
- At least one authorized consumer repository completes adoption, local
  validation, continuous-integration execution, and deliberate update or
  no-update verification using the documented path.
- Release, documentation, and consumer state are recorded as separate facts.

## Guardrails

- Do not infer publication from a local archive, passing test, tag candidate,
  or confirmed development Realization.
- Do not make public documentation a competing NKF authority.
- Do not imply that public documentation makes the checker release, private
  repository, or consumer knowledge public.
- Do not publish sensitive internal information merely to make documentation
  self-contained.
- Do not change an external consumer without its authority.
- Do not treat consumer validation as acceptance of consumer knowledge.
- Do not begin this Task until separately activated.

## AI Execution Slice: Expand Deferred Scope

- **Recorded At:** `2026-07-31T01:18:48Z`
- **Authority:** The Human Product Owner explicitly included public
  documentation in NKF-008 and identified the minimum subjects it must explain.
- **Scope:** Update the deferred Task intent, requirements, acceptance
  criteria, navigation label, and repository status wording only.
- **Non-Activation:** This slice does not activate NKF-008, select a
  documentation platform, author or publish documentation, rebind a release,
  or onboard a consumer.

## AI Execution Slice: Complete Release And Adoption

- **Recorded At:** `2026-07-31T01:54:07Z`
- **Authority:** The Human Product Owner explicitly activated NKF-008,
  authorized work through completion and independent audit, and delegated the
  final commit and push after the technical reviewer is satisfied.
- **Scope:** Reconcile and publish the current internal release, implement the
  complete pinned consumer experience, publish public explanatory
  documentation, exercise an authorized consumer-style adoption, preserve
  operational Evidence, confirm the exact successor Realization, complete the
  Task, and push the audited result.
- **Authority Effect:** Existing accepted NKF meaning remains authoritative.
  New Design and Decision records own consequential publication and adoption
  choices. Realizations describe exact implementation. Release hosting,
  documentation hosting, Git, Github, and consumer state remain external
  operational facts supported by Evidence.

### Plan

1. Audit the current release contract, package configuration, verifier,
   archive layout, Github state, documentation options, consumer artifacts,
   and accepted compatibility boundary.
2. Define and independently review the exact internal release, public
   documentation, support, pinning, installation, update, recovery, and
   consumer-evidence Design.
3. Record the adopting Decision and update normative authority only if the
   accepted user experience exposes a genuine NKF contract gap.
4. Rebind the package to the current authority and confirmed checker, add
   portable adoption tooling and documentation, and cover them with focused
   tests.
5. Produce and independently verify a reproducible content-addressed release
   from a clean exact source commit.
6. Publish the authorized prerelease and public documentation without exposing
   private repository contents or making either a competing NKF authority.
7. Exercise the documented path in an isolated authorized consumer fixture,
   including local validation, continuous-integration configuration, and
   deliberate update or no-update verification.
8. Preserve publication and consumer Evidence separately from release
   acceptance, Realization confirmation, and snapshot conformance.
9. Perform a requirement-by-requirement adversarial completion audit, repair
   every material finding, confirm the exact successor Realization, and
   complete NKF-008.
10. Run `npm run nkf:check`, commit the coherent completion, push it to the
    verified remote, and observe the exact-commit workflow.

## Execution Checkpoint: Release And Local Consumer

- **Recorded At:** `2026-07-31T02:33:42Z`
- **Source Commit:**
  `37c0f557e0b936b1f2e56706c936ef619aacdd9d`
- **Release SHA-256:**
  `0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727`
- **State:** The exact private prerelease is published and independently
  re-downloaded and verified. The recommended-release catalog is bound. The
  isolated Product consumer installation, local check, no-update path, and
  tamper rejection pass.
- **Still Pending:** Public repository publication and remote verification,
  Github consumer-workflow execution, final cross-angle audit, successor
  Realization confirmation, and Task completion.

## Completion

- **Completed At:** `2026-07-31T02:57:30Z`
- **Confirmation Decision:** `ADR-0066`
- **Internal Release SHA-256:**
  `0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727`
- **Public Documentation:**
  `https://github.com/kaveh6202/Nourd.NKF.Docs`
- **Public Documentation Commit:**
  `002dd567522bbcba6d250b4f878c2ff3fb778026`
- **Consumer Workflow:** Github Actions run `30599982716`
- **Ordinary Contract Workflow:** Github Actions run `30599976399`
- **Final Audit:**
  `knowledge/evidence/audits/nkf-008-completion-audit.md`

The current internal release is published and independently verified. The
public documentation is published through a closed projection and includes
an exact normative Markdown mirror plus checker-conformant complete Product
and Technology examples. The public-safe adopter installs one immutable
release pin and the complete AI-neutral local and continuous-integration
experience without manual assembly.

The authorized isolated Product consumer path passes local validation,
same-pin `no-update`, remote Github execution, and archive, pin, adapter, and
governed Markdown tamper rejection. Focused tests separately pass Technology
installation and consumer-owned conflict preservation.

The final cross-angle audit records no unresolved material finding within the
accepted NKF-008 scope. ADR 0066 separately confirms the exact successor
Realizations. Completion does not claim an external Agent SDK migration,
public checker distribution, historical acceptance-binding verification,
Governing Use readiness, or the protected merge gate deferred to NKF-012.

## Origin

NKF-003 established the distribution model but intentionally did not publish
or migrate external consumers. NKF-007 transfers that remaining obligation
here so repository repair does not silently expand into release, public
documentation, or consumer work. The Human Product Owner expanded this
deferred scope on 31 July 2026 to make public explanation part of the NKF 0.1
adoption experience.
