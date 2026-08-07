---
title: "NKF-006: Define Extensible Root Knowledge Models"
summary: Determine how NKF should support additional independently governed knowledge roots without assuming that Product and Technology hierarchies, bodies, validators, profiles, or protocols are universally correct.
created_at: 2026-07-30T15:59:54Z
task_id: NKF-006
task_status: deferred
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
---

# NKF-006: Define Extensible Root Knowledge Models

- **Governing Boundary:** [`ADR 0049`](../../decisions/0049-common-and-root-profiles.md)

## Desired Outcome

Determine how NKF should support additional independently governed knowledge
roots without assuming that Product and Technology hierarchies, bodies,
validators, profiles, or protocols are universally correct.

The result should establish an evidence-backed way to add root models while
preserving one NKF authority, canonical Markdown meaning, deterministic
conformance, explicit compatibility, and consumer-controlled acceptance.

## Current State

[ADR 0049](../../decisions/0049-common-and-root-profiles.md) accepts one non-selectable Common Specification and exactly one
concrete Root Profile per bundle. It does not accept the exact Common
extraction, Product Profile realization, Technology Profile, another concrete
profile, hierarchy, validator interface, serialization, or compatibility
realization.

`Shared Technology` remains Nourd ApS organizational vocabulary and is not an
accepted NKF profile name. The candidate Technology Profile should first be
exercised against the NKF repository and later Nourd Agent SDK before broader
profile abstraction.

## Activation Evidence

Begin this Task only when real exercise supplies:

1. at least one governed root that cannot be represented honestly as Product
   or Technology;
2. the root's authority, lifecycle, required meaning, hierarchy, and
   conformance needs;
3. a concrete failure or distortion caused by the current model;
4. evidence showing whether the difference belongs in NKF Core, a profile, an
   extension, a validator, or a separate protocol; and
5. compatibility and migration impact on existing Product and Technology
   bundles.

Company, Organization, project, program, initiative, research subject,
process, policy, asset, and other candidates remain examples rather than an
accepted enumeration.

## Future Execution Plan

1. Collect concrete Product, Technology, and non-fitting root bundles and
   classify their differences.
2. Separate repository/project containment from semantic root identity,
   organizational classification, technical form, hierarchy, and operational
   state.
3. Compare a universal root core, explicit root body contracts, profiles,
   extensions, and validator-specific rules.
4. Define how root-specific hierarchy and conformance compose without allowing
   one profile to weaken another.
5. Determine whether cross-bundle identity or a runtime knowledge protocol is
   required, keeping both outside NKF Core unless justified.
6. Analyze versioning, migration, diagnostic stability, unsupported-consumer
   behavior, and release compatibility.
7. Obtain Human Product Owner confirmation before changing accepted root
   meaning or promoting a new native model.
8. Update canonical authority before deriving schemas, checker rules,
   fixtures, releases, or consumer migrations.

## Acceptance Criteria

- Every supported root model is justified by concrete governed knowledge.
- Root classification and technical form are not conflated.
- Root-specific requirements cannot silently weaken Product or Technology
  meaning.
- Unsupported root meaning fails closed for consequential use.
- Hierarchy, validation, and protocol differences are explicit rather than
  inferred from directory names or implementations.
- Compatibility and deliberate migration are defined before release.
- Acceptance, confirmed realization, and conformance remain distinct.

## Non-Goals

- Designing a universal ontology from hypothetical nouns.
- Treating every repository, tool, component, service, or asset as an
  independent knowledge root.
- Importing Nourd ApS organizational classifications into portable NKF
  vocabulary.
- Letting a checker, schema, consumer, or Knowledge Engine define root meaning
  by implementation.
- Changing Product-and-Technology support merely because this Task exists.

## Decision Applicability

### Applicable Decisions

No accepted decision applies to this Task.

### Mandatory Capabilities

No mandatory capability is implicated by this Task.

This gate was added retrospectively during the NKF 0.2 self-migration; no
historical extraction is implied.
