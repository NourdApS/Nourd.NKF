---
title: "NKF-008: Publish NKF, Public Documentation, And Consumer Adoption"
summary: Publish a governed internal NKF release, provide public documentation that makes NKF understandable and usable, and onboard authorized consumer repositories deliberately.
created_at: 2026-07-30T17:03:21Z
task_id: NKF-008
task_status: deferred
---

# NKF-008: Publish NKF, Public Documentation, And Consumer Adoption

- **Task:** `NKF-008`
- **Status:** Deferred
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

## Origin

NKF-003 established the distribution model but intentionally did not publish
or migrate external consumers. NKF-007 transfers that remaining obligation
here so repository repair does not silently expand into release, public
documentation, or consumer work. The Human Product Owner expanded this
deferred scope on 31 July 2026 to make public explanation part of the NKF 0.1
adoption experience.
