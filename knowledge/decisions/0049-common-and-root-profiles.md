---
id: adr-0049
type: decision
summary: NKF 0.1 was developed as a Product-knowledge format. Its common record governance, source binding, authority, provenance, relationships, extensions, security, and validation-result mechanics may serve other knowledge roots, but its current root, scope, hierarchy, body, vocabulary, and checker rules are Product-specific.
created_at: 2026-07-30T15:59:54Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0049: Establish Common Specification And Concrete Root Profiles

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Acceptance Source:** Direct informed confirmation after the NKF
  self-hosting and root-extensibility discussion on 30 July 2026

## Context

NKF 0.1 was developed as a Product-knowledge format. Its common record
governance, source binding, authority, provenance, relationships, extensions,
security, and validation-result mechanics may serve other knowledge roots, but
its current root, scope, hierarchy, body, vocabulary, and checker rules are
Product-specific.

Applying NKF to its own repository exposed the need for a non-Product root.
An initial candidate hardcoded Product and Technology as two native root types.
That would still require NKF Core to change whenever a later root needed a
different specification, hierarchy, record model, validator, or governed input
set.

A selectable generic profile was also considered and rejected. It could become
a weak fallback, allow omitted stronger validation, make conformance ambiguous,
and silently change meaning when a more specific profile later appeared.

The repeated mechanics should be specified once, but the reusable common layer
must not itself become a selectable knowledge-root type.

## Decision

NKF has one non-selectable **Common Specification** and concrete **Root Profile
Specifications**.

Every NKF bundle declares:

1. exactly one root record; and
2. exactly one accepted concrete Root Profile.

The Common Specification applies automatically to every bundle. It cannot be
selected, declared, instantiated, or used as a fallback Root Profile.

A concrete Root Profile defines the root-specific knowledge model. Profiles
may reuse Common contracts and add requirements, but cannot remove, weaken,
override, or reinterpret Common requirements.

No bundle selects several profiles. Common-plus-profile composition produces
one effective profile-bound contract without profile ordering, precedence, or
conflict resolution.

## Common Specification Responsibility

The Common Specification owns only semantics proven identical across supported
profiles, including the applicable common:

- project and `.nourd` containment;
- canonical knowledge-root and Markdown coverage;
- record identity and declaration envelope;
- Markdown source and digest binding;
- section identity, source mapping, and responsibility-binding mechanism;
- governance, authority, acceptance separation, and provenance;
- relationship, semantic-entity, Realization-binding, and
  external-authority mechanisms;
- extension declaration, resolution, and fail-closed behavior;
- Governed Validation Inputs, security, validation-result, and currentness
  mechanisms;
- concrete-profile selection, resolution, artifact binding, and fail-closed
  support checks; and
- common conformance limits that never establish semantic adequacy,
  acceptance, truth, or confirmed Realization.

A record type or body contract belongs in Common only when its meaning and
validation are genuinely identical across every profile using it. Similar
names or structures are insufficient evidence.

## Concrete Root Profile Responsibility

Each concrete Root Profile owns:

- its root record type and body contract;
- required root meaning and lifecycle rules;
- permitted and required record and body contracts;
- profile-specific responsibilities, roles, vocabularies, and relationships;
- hierarchy and scope rules;
- additional Governed Validation Inputs;
- profile-specific deterministic validation and diagnostics;
- conformance meaning beyond Common structural conformance;
- compatibility, migration, deprecation, and retirement; and
- its exact normative specification and executable contract bindings.

The Product Profile will preserve the accepted Product meaning extracted from
the current Product-only NKF 0.1 specification. Extraction into Common and
Product Profile authority must not weaken, broaden, or silently reinterpret
that meaning.

Technology is the candidate next concrete profile for NKF and later Nourd Agent
SDK. `Shared Technology` remains Nourd ApS organizational vocabulary and is not
an NKF profile name merely because Nourd classifies those repositories that
way. The exact Technology name, root body, hierarchy, record set, validation,
and migration remain subject to separate review.

## Validation And Trust

Validation proceeds conceptually as:

1. validate the Common envelope and artifact bindings;
2. resolve the one declared concrete Root Profile;
3. verify exact supported profile specification, executable contract, schema,
   and validator bindings;
4. run profile-specific validation; and
5. produce one result that identifies both NKF Core and the selected profile.

A missing, ambiguous, unsupported, unavailable, or mismatched concrete profile
fails closed for profile-bound conformance and consequential use.

An NKF project cannot supply arbitrary executable validator code for the
checker to trust or run. Supported validator realization must come from the
trusted NKF release or a later explicitly governed trust mechanism.

## Version And Authority

`nkf_version: "0.1"` remains the only NKF version coordinate. Common and
profile identities do not create independent format-version namespaces.

Each profile requires identifiable, digest-bound normative and executable
authority. Whether profile artifacts are separate files, separately identified
sections, or packaged modules remains an unresolved realization and
distribution decision.

Markdown remains authoritative human meaning. Executable contracts, schemas,
validators, fixtures, packages, and passing checks remain derived realization
and cannot accept knowledge or profile semantics.

## Future Profiles

Task `NKF-006` governs evidence-driven investigation of additional concrete
profiles and profile-specific hierarchies, validators, protocols, governed
inputs, and compatibility.

Adding a profile requires accepted normative meaning, executable contracts,
validator behavior, fixtures, release support, and deliberate consumer
migration. A profile cannot arise from a directory name, consumer
implementation, checker behavior, or generic fallback.

## Compatibility

Extracting the current Product-only format into Common plus a Product Profile
is a breaking pre-stable authority and declaration change even when Product
meaning is preserved. Existing declarations and checker pins require
deliberate migration to a later accepted and confirmed NKF 0.1 release.

No parallel Product-only aliases, selectable Common profile, sub-versioned
record contract, or silent reinterpretation is accepted.

## Non-Claims

This Decision does not:

- accept exact serialization fields or profile identities;
- decide which current body contracts are genuinely Common;
- accept a Technology Profile, Specification body, or another concrete
  profile;
- accept profile artifact layout, schema composition, validator interface, or
  diagnostic namespace;
- change canonical Markdown/YAML, schemas, checker source, fixtures, packages,
  releases, or consumers;
- self-host the NKF repository or migrate Nourd Agent SDK; or
- establish profile conformance or confirmed realization.
