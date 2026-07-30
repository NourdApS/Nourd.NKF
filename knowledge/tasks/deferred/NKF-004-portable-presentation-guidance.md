---
title: "NKF-004: Define portable presentation-guidance extension"
summary: Define an NKF-owned optional contract for portable presentation guidance when real consumer projects demonstrate that native NKF semantics and canonical Markdown are insufficient to communicate consistent display intent across interfaces.
created_at: 2026-07-29T20:06:17Z
task_id: NKF-004
task_status: deferred
---

# NKF-004: Define portable presentation-guidance extension

- **Task:** `NKF-004`
- **Status:** Deferred
- **Owner:** Nourd ApS
- **Decision authority:** Human Product Owner, Nourd ApS
- **Repository:** `kaveh6202/Nourd.NKF`
- **Governing boundary:** `ADR 0020`

## Desired outcome

Define an NKF-owned optional contract for portable presentation guidance when
real consumer projects demonstrate that native NKF semantics and canonical
Markdown are insufficient to communicate consistent display intent across
interfaces.

The future contract should let supporting interfaces interpret the same
durable presentation guidance without turning layout preferences into Product
meaning or requiring every NKF consumer to implement a particular interface.

## Current state

The feature is intentionally deferred and does not exist today.

Under ADR 0020:

- native NKF records contain no presentation-guidance field;
- Markdown is the default readable form;
- projects may use only a separately governed optional extension for portable
  display metadata; and
- no extension identity, payload, schema, checker behavior, or release has
  been accepted.

## Activation evidence

Begin design work only when exercise of a real NKF project supplies:

1. the exact knowledge bundle and interfaces involved;
2. a presentation need that cannot be derived adequately from native record,
   section, hierarchy, relationship, and Markdown structure;
3. the expected portable behavior and the actual interface-specific result;
4. evidence that the need is durable guidance rather than local UI design,
   personal preference, or operational state; and
5. at least one failure or ambiguity that can become a review case or
   deterministic fixture.

## Future execution plan

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
   change to ADR 0020.
7. Update accepted authority before deriving schemas, checker rules, fixtures,
   distribution metadata, and consumer migration guidance.

## Acceptance criteria

- Concrete real-project evidence justifies every portable field.
- The extension cannot add, suppress, strengthen, or reinterpret Product
  meaning.
- An unsupported consumer can still access and understand all native governing
  knowledge.
- The extension has one digest-bound Markdown/YAML authority pair under ADR
  0016 and the single NKF version namespace.
- Exact positive, negative, unsupported-consumer, and round-trip fixtures
  exist.
- Checker and schema behavior derive from accepted extension meaning.
- Any refinement or supersession of ADR 0020 is recorded in a later accepted
  Decision.
- A release identifies exact artifacts, integrity data, compatibility, and
  deliberate consumer onboarding.

## Out of scope until activation

- choosing the extension identifier or payload shape;
- designing a particular application's interface;
- standardizing fonts, pixels, responsive layouts, or device-specific
  interaction;
- storing user preferences, current navigation, expanded panels, sessions, or
  other operational state;
- changing native `nkf.record`; and
- implementing schemas, checker code, fixtures, packaging, or migration.

## Deferred-state rule

This Task preserves an intended future capability; it does not claim that the
capability is specified, accepted, implemented, released, supported, or
conformant. Work begins through a recorded execution slice when the activation
evidence exists.
