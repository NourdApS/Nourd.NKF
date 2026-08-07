---
title: "NKF-016: Deliver Acceptance-Binding Verification"
summary: Define, implement, verify, document, and distribute at least one usable NKF 0.1 acceptance-authority resolver path so acceptance binding can be verified in practice rather than existing only as a library interface.
created_at: 2026-07-31T18:06:25Z
task_id: NKF-016
task_status: deferred
---

# NKF-016: Deliver Acceptance-Binding Verification

- **Task:** `NKF-016`
- **Status:** Deferred
- **Owner:** Nourd ApS
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Repository:** `kaveh6202/Nourd.NKF`
- **Related Tasks:** `NKF-003`, `NKF-005`, `NKF-008`, `NKF-011`

## Human Direction

The Human Product Owner requires NKF 0.1 to support acceptance verification in
practice.

This Task is created by explicit direction. Creation does not authorize Design,
Decision, Specification, implementation, release, or consumer work. Begin only
after a separate explicit human direction to start `NKF-016`.

## Problem

NKF 0.1 already distinguishes declared governance, acceptance-binding
verification, conformance, Realization confirmation, and Governing Use. The
checker library exposes an authority-resolver interface and tests verified,
unavailable, and contradicted outcomes.

The shipped CLI does not configure or supply a concrete resolver. Requesting
`--acceptance-binding` through the normal CLI therefore cannot produce a
verified binding. Accepted records remain `not-verified`, and a normal project
command cannot demonstrate Governing Use Ready.

The missing boundary is practical realization and distribution, not permission
for a checker to perform acceptance or treat copied metadata as proof.

## Existing Authority Boundary

ADR 0017 currently requires authority-system verification of:

1. an authoritative event or immutable Decision;
2. an actor exercising an authority declared by the record;
3. an outcome applicable to the claimed governance status;
4. exact bundle and record identity;
5. exact Markdown source digest;
6. exact declaration revision or digest; and
7. applicable supersession, revocation, or contradiction behavior.

ADR 0017 deliberately defines no universal native acceptance-event or proof
field. Portable authority-specific evidence or resolver configuration currently
belongs in a required accepted extension. The native supported-extension set is
empty.

NKF-016 must either realize that accepted boundary or propose a governed
successor Decision before changing it. Checker or resolver implementation
cannot silently reinterpret the boundary.

## Desired Outcome

Deliver at least one secure, usable, end-to-end NKF 0.1 path by which an adopted
project can deliberately request acceptance verification and receive truthful
`verified`, `not-verified`, or `contradicted` record outcomes.

The delivered path must be supported by the distributed checker or an exact
supported companion, documented for consumers, and exercised against a real
authority model or an authoritative test system. A library callback alone does
not satisfy the outcome.

## Scope

- reconcile the current normative acceptance-provenance boundary, checker
  interface, CLI behavior, adopter integration, validation-result semantics,
  and Governing Use calculation;
- identify the authority systems and acceptance evidence that NKF 0.1 can
  support without creating false proof or circular self-acceptance;
- compare a required authority-specific extension, resolver configuration,
  separately trusted resolver package, repository-local authority material,
  and other viable approaches;
- define resolver identity, trust roots, exact revision binding, configuration,
  discovery, credentials, network access, offline behavior, and failure modes;
- define how a project deliberately requests verification and how unsupported,
  unavailable, ambiguous, tampered, superseded, or contradictory evidence is
  reported;
- make a positive full-bundle fixture capable of producing acceptance binding
  `verified` and Governing Use `ready` without changing the meaning of
  conformance;
- derive any necessary Specification, executable companion, extension,
  Schema, checker, CLI, adopter, fixture, documentation, release, and migration
  changes from accepted authority; and
- independently audit and confirm the exact realized boundary before release.

## Required Design Questions

1. Which authoritative acceptance source is supported first, and why is it
   sufficient to prove the exact accepted revision?
2. What is the non-circular trust root for verifying NKF's own accepted
   records?
3. Does support belong in NKF Core, one required accepted extension, a shipped
   resolver adapter, or a composition of those boundaries?
4. How is resolver configuration itself authenticated, bound, and prevented
   from becoming copied proof?
5. Which fields may enter a validation result without exposing credentials,
   private evidence, local paths, or authority-owned payloads?
6. What happens when verification is not requested, unsupported, unavailable,
   ambiguous, contradicted, or only partially available across a bundle?
7. How do offline validation, deterministic replay, historical Evidence, and
   network-dependent authority systems coexist?
8. What belongs to acceptance verification now, and what remains the separate
   expiry or authority-freshness question deferred under NKF-005?
9. How do consumers migrate deliberately without making previous
   `not-verified` results appear rejected or invalid?

## Guardrails

- A resolver verifies an authority act; it never performs acceptance.
- Conformance, acceptance binding, Realization confirmation, and Governing Use
  remain separate result axes.
- A copied status, authority identifier, timestamp, URL, commit, event ID, or
  signature is not proof without the accepted verification procedure and trust
  root.
- Do not choose Git, Github, a database, a conversation system, or another
  authority implementation merely because it is convenient for NKF's own
  repository.
- Do not make network access, credentials, background polling, or hidden
  mutable state an undeclared requirement.
- Do not copy secret or authority-owned operational payloads into governed
  knowledge or validation results.
- Do not absorb universal expiry or continuing authority freshness into this
  Task without explicitly reconciling NKF-005.
- Unsupported required authority machinery fails closed for consequential
  governing use.
- A passing resolver test cannot accept the resolver's own normative meaning or
  confirm its Realization.

## Future Execution Plan

1. Audit the exact accepted acceptance-provenance and validation-result meaning
   against the current checker, CLI, adopter, release, and public documentation.
2. Inventory realistic Nourd authority sources and select bounded candidate
   examples without treating any example as accepted architecture.
3. Produce a Design comparing at least the extension, shipped adapter, trusted
   repository material, offline proof, and external resolver alternatives.
4. Resolve circular trust, authority ownership, security, privacy, availability,
   deterministic replay, and NKF-005 freshness boundaries.
5. Obtain a Human Product Owner Decision on one exact semantic and trust model.
6. Update the canonical Specification and executable companion when the
   accepted direction changes or completes NKF 0.1 meaning.
7. Derive the required extension contract, Schemas, resolver, checker, CLI,
   adopter, fixtures, diagnostics, documentation, release, and migration work.
8. Exercise verified, unavailable, contradicted, tampered, unsupported,
   partially resolved, offline, and recovery cases.
9. Demonstrate one real or authoritative test bundle whose accepted records can
   truthfully reach Governing Use Ready.
10. Run an independent whole-boundary audit, record Evidence, and obtain
    separate Realization confirmation before publication.

## Acceptance Criteria

- A Human Product Owner Decision accepts the exact authority, trust,
  configuration, resolver, and compatibility boundary.
- The canonical Markdown remains authoritative, and every executable change is
  digest-bound to its accepted revision.
- At least one distributed, documented resolver path verifies exact bundle,
  record, Markdown, declaration, authority, and outcome binding end to end.
- The normal supported consumer workflow can deliberately request and execute
  that resolver without custom library code.
- Positive Evidence produces `verified`; unavailable or unperformed
  verification produces `not-verified`; resolved conflict produces
  `contradicted` and fails governing use closed.
- One complete positive bundle can truthfully reach Governing Use `ready` while
  conformance remains an independent result.
- Resolver identity, configuration, trust roots, authority locators, and any
  required extension artifacts are integrity-bound and fail closed when
  missing, ambiguous, unsupported, or tampered.
- Credentials, secrets, private payloads, usernames, hostnames, and absolute
  local paths do not leak into portable results or governed knowledge.
- Offline, unavailable-authority, historical-replay, partial-bundle, and
  recovery behavior are explicit and tested.
- NKF-005 expiry and authority-freshness questions remain separately visible
  unless an explicit governed Decision transfers a bounded part of them.
- Release, public documentation, consumer adoption, and migration preserve the
  distinction between accepted, binding verified, conformant, confirmed,
  published, and ready.
- Independent audit Evidence and a separate confirmation Decision cover the
  exact realization before it is described as supported.

## Out Of Scope Until Activation

- selecting the first authority implementation;
- drafting or adopting an acceptance-proof extension;
- changing ADR 0017 or the NKF 0.1 Specification;
- implementing resolver, checker, CLI, adopter, Schema, fixture, or release
  changes;
- rebinding any existing record as acceptance verified;
- changing an external system's acceptance process;
- implementing universal expiry, background polling, or continuous authority
  monitoring; and
- releasing or migrating consumers.

## Deferred-State Rule

This Task records required future work only. It does not claim that a resolver
design has been selected, that any authority source is supported, that any
record's acceptance is verified, that Governing Use is Ready, or that the work
has begun.
