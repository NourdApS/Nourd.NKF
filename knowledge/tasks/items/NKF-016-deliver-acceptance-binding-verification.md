---
title: "NKF-016: Deliver Acceptance-Binding Verification"
summary: Define, implement, verify, document, and distribute at least one usable acceptance-authority resolver path under the live NKF version so acceptance binding can be verified in practice rather than existing only as a library interface — deferred since 2026-07-31, with accepted records still reported not-verified at NKF 0.8.
created_at: 2026-07-31T18:06:25Z
---

# NKF-016: Deliver Acceptance-Binding Verification

## Human Direction

The Human Product Owner requires NKF to support acceptance verification in
practice. When this Task was created on `2026-07-31` the live version was
NKF 0.1 and the direction named that version; the delivery target is the live
version at delivery time — NKF 0.1 when written, NKF 0.8 today, with 0.81 in
preparation under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
whose scope explicitly excludes this Task's acceptance-binding substance.

This Task was created by explicit direction. Creation does not authorize
Design, Decision, Specification, implementation, release, or consumer work.
Begin only after a separate explicit human direction to start
[NKF-016](NKF-016-deliver-acceptance-binding-verification.md).

The legacy envelope related this Task to
[NKF-003](NKF-003-independent-nkf-authority.md),
[NKF-005](NKF-005-validation-expiry-and-authority-freshness.md),
[NKF-008](NKF-008-publish-and-onboard-consumers.md), and
[NKF-011](NKF-011-enforce-nkf-contracts.md); those relations are carried here
as prose. This native rewrite on 2026-09-08 under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
replaced the legacy-locked NKF 0.4 source; the Task's substance, deferred
state, and creation direction are unchanged.

## Problem

Since NKF 0.1, NKF has distinguished declared governance, acceptance-binding
verification, conformance, Realization confirmation, and Governing Use. The
checker library exposes an authority-resolver interface and tests verified,
unavailable, and contradicted outcomes.

The shipped CLI does not configure or supply a concrete resolver. Requesting
`--acceptance-binding` through the normal CLI therefore cannot produce a
verified binding. Accepted records remain `not-verified`, and a normal project
command cannot demonstrate Governing Use Ready. That gap was recorded at
NKF 0.1 and remains open at NKF 0.8: the
[current-system Realization](../../realizations/current-system.md) records
acceptance-binding work as deferred to this Task.

The missing boundary is practical realization and distribution, not permission
for a checker to perform acceptance or treat copied metadata as proof.

## Existing Authority Boundary

[ADR 0017](../../decisions/0017-acceptance-provenance.md) requires
authority-system verification of:

1. an authoritative event or immutable Decision;
2. an actor exercising an authority declared by the record;
3. an outcome applicable to the claimed governance status;
4. exact bundle and record identity;
5. exact Markdown source digest;
6. exact declaration revision or digest; and
7. applicable supersession, revocation, or contradiction behavior.

[ADR 0017](../../decisions/0017-acceptance-provenance.md) deliberately defines
no universal native acceptance-event or proof field. Portable
authority-specific evidence or resolver configuration belongs in a required
accepted extension. When this Task was written the native supported-extension
set was empty; whether a later version changed that is part of the audit this
Task performs at activation, not a fact this Task asserts today.

[NKF-016](NKF-016-deliver-acceptance-binding-verification.md) must either
realize that accepted boundary or propose a governed successor Decision before
changing it. Checker or resolver implementation cannot silently reinterpret
the boundary.

## Desired Outcome

Deliver at least one secure, usable, end-to-end path under the live NKF
version by which an adopted project can deliberately request acceptance
verification and receive truthful `verified`, `not-verified`, or
`contradicted` record outcomes.

The delivered path must be supported by the distributed checker or an exact
supported companion, documented for consumers, and exercised against a real
authority model or an authoritative test system. A library callback alone does
not satisfy the outcome.

## Scope

- reconcile the current normative acceptance-provenance boundary, checker
  interface, CLI behavior, adopter integration, validation-result semantics,
  and Governing Use calculation;
- identify the authority systems and acceptance evidence that the live NKF
  version can support without creating false proof or circular
  self-acceptance;
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
   expiry or authority-freshness question deferred under
   [NKF-005](NKF-005-validation-expiry-and-authority-freshness.md)?
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
  Task without explicitly reconciling
  [NKF-005](NKF-005-validation-expiry-and-authority-freshness.md).
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
   deterministic replay, and
   [NKF-005](NKF-005-validation-expiry-and-authority-freshness.md) freshness
   boundaries.
5. Obtain a Human Product Owner Decision on one exact semantic and trust model.
6. Update the canonical Specification and executable companion when the
   accepted direction changes or completes the live version's meaning.
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
- [NKF-005](NKF-005-validation-expiry-and-authority-freshness.md) expiry and
  authority-freshness questions remain separately visible unless an explicit
  governed Decision transfers a bounded part of them.
- Release, public documentation, consumer adoption, and migration preserve the
  distinction between accepted, binding verified, conformant, confirmed,
  published, and ready.
- Independent audit Evidence and a separate confirmation Decision cover the
  exact realization before it is described as supported.

## Out Of Scope Until Activation

- selecting the first authority implementation;
- drafting or adopting an acceptance-proof extension;
- changing [ADR 0017](../../decisions/0017-acceptance-provenance.md) or the
  live NKF Specification;
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

## Current Progress

Created deferred on `2026-07-31`. No activation has been directed, and no
Design, Decision, Specification, resolver, checker, CLI, adopter, fixture,
release, or consumer change has been made under this Task. At the live
NKF 0.8 the normal command still reports accepted records `not-verified`, and
the
[current-system Realization](../../realizations/current-system.md) records the
acceptance-binding work as deferred here.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Any change to acceptance-binding meaning requires evidence, reproduction, compatibility analysis, Human Product Owner confirmation, authority-first specification updates, derived implementation, a versioned release, and deliberate consumer migration; a passing resolver test cannot change NKF by implication. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Copied governance metadata proves nothing; a resolver verifies the seven-part authority binding that Decision enumerates, authority-specific evidence belongs in a required accepted extension, and this Task must realize that boundary exactly or propose a governed successor Decision before changing it. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| At least one distributed, documented resolver path verifies exact bundle, record, Markdown, declaration, authority, and outcome binding end to end | unknown | none | none |
| The normal supported consumer workflow requests and executes that resolver without custom library code | unknown | none | none |
| Positive Evidence yields `verified`, unperformed or unavailable verification yields `not-verified`, and resolved conflict yields `contradicted` and fails governing use closed | unknown | none | none |
| One complete positive bundle truthfully reaches Governing Use `ready` while conformance stays an independent result | unknown | none | none |
| Resolver identity, configuration, trust roots, and required extension artifacts are integrity-bound and fail closed when missing, ambiguous, unsupported, or tampered | unknown | none | none |
| No credential, secret, private payload, username, hostname, or absolute local path leaks into portable results or governed knowledge | unknown | none | none |

This gate was extracted at the native rewrite on 2026-09-08, replacing the
empty retrospective placeholder recorded at the NKF 0.2 self-migration.
