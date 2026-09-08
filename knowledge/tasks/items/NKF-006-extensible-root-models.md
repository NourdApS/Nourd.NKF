---
title: "NKF-006: Define Extensible Root Knowledge Models"
summary: Determine how NKF should support additional independently governed knowledge roots without assuming that Product and Technology hierarchies, bodies, validators, profiles, or protocols are universally correct — created deferred when the Common Specification and concrete Root Profiles were accepted and still awaiting a root that neither accepted profile represents honestly.
created_at: 2026-07-30T15:59:54Z
---

# NKF-006: Define Extensible Root Knowledge Models

## Human Direction

This Task was created deferred on `2026-07-30` during
[NKF-003](NKF-003-independent-nkf-authority.md), when
[ADR 0049](../../decisions/0049-common-and-root-profiles.md) accepted one
non-selectable Common Specification and exactly one concrete Root Profile per
bundle and named this Task the governor of evidence-driven investigation of
additional concrete profiles and profile-specific hierarchies, validators,
protocols, governed inputs, and compatibility. That Decision is the governing
boundary for this Task. The same day,
[ADR 0050](../../decisions/0050-product-and-technology-profiles.md) accepted
the Product and Technology Root Profiles and directed that later root kinds
require their own evidence, accepted profile, executable realization, fixtures,
release support, and deliberate migration under this Task.

No human direction has resumed this Task. It stays deferred until the
activation evidence below exists and the Human Product Owner explicitly
directs work to begin.

This native rewrite on 2026-09-08 under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
replaced the legacy-locked NKF 0.4 source; the Task's substance, deferred
state, and creation direction are unchanged.

## Desired Outcome

Determine how NKF should support additional independently governed knowledge
roots without assuming that Product and Technology hierarchies, bodies,
validators, profiles, or protocols are universally correct.

The result should establish an evidence-backed way to add root models while
preserving one NKF authority, canonical Markdown meaning, deterministic
conformance, explicit compatibility, and consumer-controlled acceptance.

## Current State

At this Task's creation on `2026-07-30`,
[ADR 0049](../../decisions/0049-common-and-root-profiles.md) had accepted one
non-selectable Common Specification and exactly one concrete Root Profile per
bundle, and had not accepted the exact Common extraction, Product Profile
realization, Technology Profile, another concrete profile, hierarchy, validator
interface, serialization, or compatibility realization. The Task recorded
that the candidate Technology Profile should first be exercised against the
NKF repository and later Nourd Agent SDK before broader profile abstraction.

Later the same day,
[ADR 0050](../../decisions/0050-product-and-technology-profiles.md) accepted
the Product and Technology Root Profiles. Since then this repository has
self-hosted as a Technology root, which is the first exercise the creation
text called for. The live version today is NKF 0.8, with NKF 0.81 in
preparation under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
and the accepted NKF 0.8 authority defines exactly those two Root Profiles.
No third Root Profile has been proposed or accepted, and no governed root has
been recorded that neither accepted profile represents honestly. The Nourd
Agent SDK exercise is not recorded in this repository.

`Shared Technology` remains Nourd ApS organizational vocabulary and is not an
accepted NKF profile name.

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

## Deferred-State Rule

This Task preserves an intended future investigation; it does not claim that
any additional root model is specified, accepted, implemented, released,
supported, or conformant. Work begins through a recorded execution slice when
the activation evidence exists and the Human Product Owner directs it.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | A new root model is a consequential pre-stable change: it requires evidence, reproduction, compatibility classification, authority-first derivation, a versioned release, and deliberate consumer migration. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority remain separate axes; a profile realization, fixture, or passing check accepts no root meaning. |
| [`adr-0049`](../../decisions/0049-common-and-root-profiles.md) | record | The Common Specification stays non-selectable and every bundle selects exactly one concrete Root Profile; a profile cannot arise from a directory name, consumer implementation, checker behavior, or generic fallback, and adding one requires accepted normative meaning, executable contracts, validator behavior, fixtures, release support, and deliberate consumer migration. |
| [`adr-0050`](../../decisions/0050-product-and-technology-profiles.md) | record | Product and Technology share one accepted Common envelope with different semantic contracts and enforcement; a later root kind must not weaken either and requires its own evidence, accepted profile, executable realization, fixtures, release support, and deliberate migration under this Task. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Every supported root model is justified by concrete governed knowledge | unknown | none | none |
| Root classification and technical form are not conflated | unknown | none | none |
| Root-specific requirements cannot silently weaken Product or Technology meaning | unknown | none | none |
| Unsupported root meaning fails closed for consequential use | unknown | none | none |
| Hierarchy, validation, and protocol differences are explicit rather than inferred from directory names or implementations | unknown | none | none |
| Compatibility and deliberate migration are defined before release | unknown | none | none |

This gate was extracted at the native rewrite on 2026-09-08, replacing the
empty retrospective placeholder recorded at the NKF 0.2 self-migration.
