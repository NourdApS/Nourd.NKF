---
created_at: 2026-07-29T20:06:17Z
design_disposition: adopted
design_decisions:
  - ADR-0017
---

# NKF 0.1 Acceptance-Provenance Boundary

- **Design Disposition:** Adopted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Proposal Authority Effect:** None
- **Proposal evidence:** accepted NKF authority/conformance rules and the
  imported NKF-002 `governance.acceptance_source` Git-revision check; the
  imported field and checker are not authority

## Decision Sought

Whether native NKF 0.1 should deliberately define no universal
acceptance-event or acceptance-proof field and instead establish the exact
authority, confirmation, conformance, and extension boundary below.

## Core Governance Declaration

Native NKF 0.1 retains only the already accepted core governance shape:

```yaml
governance:
  lifecycle: living | immutable
  status: draft | accepted | superseded | retired
  authority: [<one or more acceptance-authority identifiers>]
  accepted_at: <optional ISO 8601 date>
```

These values are declarations:

- `status` states the record's claimed governance state;
- `authority` identifies who may authoritatively decide that state; and
- `accepted_at`, when present, records the claimed date of the original
  acceptance.

None proves that an acceptance event occurred or that it applied to the exact
record revision. A copied `accepted` value, authority name, date, commit, URL,
or event identifier cannot create acceptance.

Native NKF 0.1 adds no core `acceptance_source`, `acceptance_event`,
`proposal_revision`, or equivalent proof field.

## Why Proof Remains Outside Core

Acceptance authorities may operate through immutable Decision records, Git
history, signed events, databases, review systems, or other governed sources.
Those systems differ in identity, revision, immutability, verification, and
resolution semantics.

A universal core reference would either:

- overfit NKF to one authority system;
- be too weak to prove exact revision binding;
- create self-referential digest problems; or
- encourage consumers to treat a copied locator as acceptance.

NKF therefore defines the evidence required to verify acceptance, but not one
storage representation for every authority.

## Acceptance And Verification

Acceptance is an act of the declared authority in its authoritative system.
It does not occur inside a checker.

A consumer may report **acceptance binding verified** only when its
authority-specific resolver establishes all of:

1. the authoritative event or immutable Decision exists;
2. the actor exercised an authority listed by the record;
3. the outcome applies to the claimed governance status;
4. the event identifies the exact bundle and record identity;
5. the event binds the exact Markdown source digest;
6. the event binds the exact declaration revision or digest; and
7. the evidence has not been superseded, revoked, or contradicted by the same
   authority.

If verification is not performed or the authority source is unavailable, the
result is **not verified**, not rejected. If the source resolves but conflicts
with the declaration or exact revision, the result is **contradicted** and
governing use fails closed.

Verification confirms the binding of an authority decision. It does not
perform acceptance, validate semantic adequacy, or confirm a Realization.

## Independent Result Axes

Consumers must keep these results separate:

| Axis | Question answered |
| --- | --- |
| Declared governance | What status and authority does the NKF declaration state? |
| Acceptance binding verification | Did the declared authority accept this exact revision in its authoritative system? |
| NKF conformance | Does the declaration and bundle satisfy applicable NKF contracts? |
| Realization confirmation | Does separate Evidence establish that claimed implementation or operational realization exists and behaves as stated? |

One axis never supplies another. In particular:

- conformance does not prove acceptance;
- verified acceptance does not prove conformance;
- accepted Product meaning does not confirm implementation; and
- implementation or tests do not accept Product meaning.

Consequential governing use requires the applicable accepted status,
acceptance binding verified, and required NKF conformance. A superseded or
retired record is not current governing authority even when its historical
acceptance remains verified.

## Portable Authority-Specific Evidence

When a bundle must carry portable acceptance evidence or a deterministic
resolver configuration, it uses an authority-owned extension governed by
ADR 0016.

That extension must be declared `required` when governing use depends on it
and must define:

- its authoritative system and event identity;
- exact revision-binding method;
- immutability, supersession, and revocation behavior;
- verification procedure and failure modes; and
- data needed for lossless round-trip.

The extension remains authority-specific and does not become core NKF meaning.
The native NKF 0.1 supported-extension set remains empty.

## Deterministic Core Validation

Core validation may establish:

- the required governance fields and allowed values;
- at least one non-empty authority identifier;
- duplicate-free authority identifiers;
- valid date syntax when `accepted_at` is present;
- Product lifecycle `living`; and
- accepted Decision lifecycle `immutable`.

Core validation must report declared governance separately from acceptance
binding verification. Lack of a core proof field is not a structural or
contract error.

An unsupported imported `acceptance_source` or similar field is not native NKF
0.1. It must be removed during deliberate migration or carried through a
supported extension; it cannot be silently interpreted as core proof.

## Exact Confirmation Requested

> Accept that native NKF 0.1 defines no universal acceptance-event or proof
> field; retains governance status, authority, and optional acceptance date as
> non-proving declarations; requires exact authority-system verification for
> consequential governing use; keeps declared governance, acceptance-binding
> verification, NKF conformance, and Realization confirmation separate; and
> routes portable authority-specific evidence through required extensions.

Acceptance would establish the acceptance-provenance boundary only. It would
not verify any existing record's acceptance, accept an authority-specific
extension, define universal path resolution, accept replacement Markdown or
YAML bytes, implement schemas or checker behavior, or establish conformance.
