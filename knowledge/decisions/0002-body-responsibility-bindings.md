---
id: adr-0002
type: decision
title: "ADR 0002: Establish Body-Responsibility Bindings"
summary: The accepted NKF 0.1 Product specification defines required body responsibilities in prose, but it does not give those responsibilities stable machine-readable identifiers or define how a declaration binds an exact Markdown section to them.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0002: Establish Body-Responsibility Bindings

- **Acceptance source:** Direct informed confirmation in the [NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md)
  discussion on 29 July 2026

## Context

The accepted NKF 0.1 Product specification defines required body
responsibilities in prose, but it does not give those responsibilities stable
machine-readable identifiers or define how a declaration binds an exact
Markdown section to them.

Heading text, section IDs, paths, broad section roles, and model
classification are unsafe substitutes:

- headings and paths are presentation and location, not stable identity;
- record-local section IDs do not establish cross-record contract meaning;
- one role may serve several responsibilities and one responsibility may span
  several sections; and
- model interpretation cannot silently become normative format authority.

The later NKF-002 checker work proposed stable responsibility identifiers and
explicit section bindings. That proposal also showed a risk: a deterministic
checker can verify the declared bindings, but it cannot prove that the bound
Markdown is semantically adequate, true, or accepted.

## Decision

NKF core defines a generic body-responsibility binding mechanism.

A versioned body contract owns stable machine-readable responsibility
identifiers. A declaration section may bind to one or more responsibility
identifiers defined by its declared body contract. One responsibility may be
bound across several declared sections.

Each versioned body contract owns its responsibility vocabulary and required
set. Another contract or consumer cannot redefine its responsibility
identifiers or silently assign new meaning to an existing version.

Markdown remains the canonical human meaning. A responsibility binding
classifies where a declaration asserts that the Markdown addresses a
contract responsibility; it does not introduce missing meaning or become a
second semantic authority.

## Deterministic Conformance Boundary

For a supported body contract, deterministic conformance may verify that:

1. every declared responsibility identifier is defined by that exact body
   contract;
2. every binding resolves to an exact declared source section;
3. every responsibility required by that body contract has at least one
   binding; and
4. unsupported required body contracts or responsibility meaning fail closed.

That result establishes responsibility-binding completeness only. It does not
prove:

- that the bound Markdown semantically fulfills the responsibility;
- that the Markdown is correct, sufficient, safe, or true;
- that an Evidence claim has been verified;
- that Product or Shared Technology meaning has been accepted; or
- that a consumer may perform a consequential action.

Checker diagnostics and conformance results must preserve this distinction
and must not describe binding completeness as proof of semantic adequacy.

## Compatibility

Responsibility identity is scoped by its versioned body contract. Renaming,
splitting, combining, adding, removing, or changing the meaning or required
status of a responsibility cannot silently change an already supported
contract version. The exact compatibility classification and versioning rules
remain subject to the later NKF compatibility decision.

The accepted Nourd Studio NKF 0.1 bytes remain immutable Product-format
provenance. Because they predate explicit bindings, this Decision does not
retroactively make those declarations conform to a later executable contract.
A governed specification revision and consumer migration are required.

## Consequences

- Body responsibility coverage no longer depends on heading wording or
  record-local conventions.
- One checker can validate the generic mechanism across supported body
  contracts without becoming authority for their body meaning.
- Declarations gain explicit, reviewable assertions without replacing
  Markdown authority.
- False or superficial bindings remain possible semantic defects and require
  review beyond deterministic conformance.
- The exact Product responsibility vocabularies remain unaccepted until
  confirmed separately.

## Not Decided

This Decision does not accept:

- the exact responsibility identifiers proposed by NKF-002;
- the exact body-contract vocabularies or required responsibility sets;
- an exact YAML or JSON serialization shape;
- an NKF version, bundle contract, or record contract revision;
- extension, acceptance-provenance, package, release, or migration contracts;
  or
- the imported checker implementation as the canonical NKF checker.
