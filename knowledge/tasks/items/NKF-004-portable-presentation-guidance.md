---
title: "NKF-004: Define Portable Presentation-Guidance Extension"
summary: Define an NKF-owned optional contract for portable presentation guidance once real consumer projects show that native NKF semantics and canonical Markdown cannot communicate consistent display intent across interfaces — created deferred under the current presentation-guidance boundary and still awaiting that activation evidence.
created_at: 2026-07-29T20:06:17Z
---

# NKF-004: Define Portable Presentation-Guidance Extension

## Human Direction

This Task was created deferred on `2026-07-29` during
[NKF-003](NKF-003-independent-nkf-authority.md), when
[ADR 0020](../../decisions/0020-presentation-guidance.md) established the
current presentation-guidance boundary and named this Task as the owner of
future evidence gathering and design of a portable presentation-guidance
extension. That Decision is the governing boundary for this Task. The Task may
propose refining, extending, or superseding the boundary; it does not change
the Decision merely by producing a design.

No human direction has resumed this Task. It stays deferred until the
activation evidence below exists and the Human Product Owner explicitly
directs work to begin.

This native rewrite on 2026-09-08 under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
replaced the legacy-locked NKF 0.4 source; the Task's substance, deferred
state, and creation direction are unchanged.

## Desired Outcome

Define an NKF-owned optional contract for portable presentation guidance when
real consumer projects demonstrate that native NKF semantics and canonical
Markdown are insufficient to communicate consistent display intent across
interfaces.

The future contract should let supporting interfaces interpret the same
durable presentation guidance without turning layout preferences into Product
meaning or requiring every NKF consumer to implement a particular interface.

## Current State

The feature is intentionally deferred and does not exist.

When this Task was created on `2026-07-29`, the live proposal was NKF 0.1. The
live version today is NKF 0.8, with NKF 0.81 in preparation under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md).
Across every accepted version in between, the boundary
[ADR 0020](../../decisions/0020-presentation-guidance.md) set has stood
unchanged: no later Decision has refined or superseded it, and the accepted
NKF 0.8 authority defines no presentation-guidance field and no presentation
extension.

Under [ADR 0020](../../decisions/0020-presentation-guidance.md):

- native NKF records contain no presentation-guidance field;
- Markdown is the default readable form;
- projects may use only a separately governed optional extension for portable
  display metadata; and
- no extension identity, payload, schema, checker behavior, or release has
  been accepted.

## Activation Evidence

Begin design work only when exercise of a real NKF project supplies:

1. the exact knowledge bundle and interfaces involved;
2. a presentation need that cannot be derived adequately from native record,
   section, hierarchy, relationship, and Markdown structure;
3. the expected portable behavior and the actual interface-specific result;
4. evidence that the need is durable guidance rather than local UI design,
   personal preference, or operational state; and
5. at least one failure or ambiguity that can become a review case or
   deterministic fixture.

## Future Execution Plan

1. Collect and classify concrete presentation cases from consumer projects.
2. Separate portable guidance from semantic meaning, interface implementation,
   accessibility behavior, and user/runtime state.
3. Propose the extension identity, authority pair, allowed application sites,
   payload, vocabulary, defaults, ordering, and failure behavior.
4. Test the proposal across representative interfaces, including a consumer
   that does not support the extension.
5. Analyze compatibility, round-trip behavior, security, and whether the
   extension remains genuinely optional.
6. Obtain Human Product Owner confirmation for consequential meaning and any
   change to [ADR 0020](../../decisions/0020-presentation-guidance.md).
7. Update accepted authority before deriving schemas, checker rules, fixtures,
   distribution metadata, and consumer migration guidance.

## Acceptance Criteria

- Concrete real-project evidence justifies every portable field.
- The extension cannot add, suppress, strengthen, or reinterpret Product
  meaning.
- An unsupported consumer can still access and understand all native governing
  knowledge.
- The extension has one digest-bound Markdown/YAML authority pair under
  [ADR 0016](../../decisions/0016-extension-resolution.md) and the single NKF
  version namespace.
- Exact positive, negative, unsupported-consumer, and round-trip fixtures
  exist.
- Checker and schema behavior derive from accepted extension meaning.
- Any refinement or supersession of
  [ADR 0020](../../decisions/0020-presentation-guidance.md) is recorded in a
  later accepted Decision.
- A release identifies exact artifacts, integrity data, compatibility, and
  deliberate consumer onboarding.

## Out Of Scope Until Activation

- choosing the extension identifier or payload shape;
- designing a particular application's interface;
- standardizing fonts, pixels, responsive layouts, or device-specific
  interaction;
- storing user preferences, current navigation, expanded panels, sessions, or
  other operational state;
- changing native `nkf.record`; and
- implementing schemas, checker code, fixtures, packaging, or migration.

## Deferred-State Rule

This Task preserves an intended future capability; it does not claim that the
capability is specified, accepted, implemented, released, supported, or
conformant. Work begins through a recorded execution slice when the activation
evidence exists and the Human Product Owner directs it.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | A presentation extension is a consequential pre-stable change: it requires evidence, reproduction, compatibility classification, authority-first derivation, a versioned release, and deliberate consumer migration. |
| [`adr-0016`](../../decisions/0016-extension-resolution.md) | record | The extension must carry a declared identity and digest-bound contract, stay visible and round-trippable to a consumer that does not support it, and never be required to understand or govern native knowledge. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority remain separate axes; presentation guidance changes none of them and accepts nothing. |
| [`adr-0020`](../../decisions/0020-presentation-guidance.md) | record | Native NKF keeps no presentation-guidance field; any portable display metadata lives in a separately governed optional extension that cannot add, suppress, strengthen, or reinterpret Product meaning, and any refinement or supersession of the boundary requires a later accepted Decision. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Every portable presentation field is justified by concrete real-project evidence | unknown | none | none |
| The extension cannot add, suppress, strengthen, or reinterpret Product meaning | unknown | none | none |
| An unsupported consumer can still access and understand all native governing knowledge | unknown | none | none |
| The extension has one digest-bound Markdown/YAML authority pair in the single NKF version namespace | unknown | none | none |
| Exact positive, negative, unsupported-consumer, and round-trip fixtures exist, and checker and schema behavior derive from the accepted extension meaning | unknown | none | none |

This gate was extracted at the native rewrite on 2026-09-08, replacing the
empty retrospective placeholder recorded at the NKF 0.2 self-migration.
