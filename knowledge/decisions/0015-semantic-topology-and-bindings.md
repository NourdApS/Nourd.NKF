---
id: adr-0015
type: decision
title: "ADR 0015: Accept NKF 0.1 Semantic-Topology And Binding Vocabularies"
summary: The accepted NKF 0.1 record serialization permits semantic entities, entity relationships, and durable Realization bindings. The accepted specification requires their controlled vocabularies to be supplied by body contracts or supported profiles, but the current authority pair does not define complete values, meanings, ownership, or deterministic constraints.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0015: Accept NKF 0.1 Semantic-Topology And Binding Vocabularies

- **Acceptance source:** Direct informed confirmation to proceed in the
  [NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md) discussion on 29 July 2026

## Context

The accepted NKF 0.1 record serialization permits semantic entities,
entity relationships, and durable Realization bindings. The accepted
specification requires their controlled vocabularies to be supplied by body
contracts or supported profiles, but the current authority pair does not
define complete values, meanings, ownership, or deterministic constraints.

The later NKF-002 checker supplies global value lists only. Those lists are
implementation evidence, not semantic authority.

## Decision

The exact proposal at
[`../designs/adopted/semantic-topology-and-bindings.md`](../designs/adopted/semantic-topology-and-bindings.md),
with SHA-256
`67bb38b6d329f786adbfcc6b3b9a850805ad8143559c5ea4afb12ee0470bda3f`,
is accepted for native NKF 0.1.

The accepted boundary includes:

- 27 core entity kinds, their exact meanings, and allowed defining body
  contracts;
- same-bundle entity-reference resolution and canonical relationship
  ownership;
- ten directional entity-relationship types and their stated graph and
  source-type constraints;
- eleven durable binding kinds and their exact mapping-target meanings;
- Realization-record ownership of bindings;
- binding resolution, external-authority, uniqueness, and ordering rules; and
- the prohibition against using entities, locators, or bindings as identity,
  secrets, live operational state, or current observations.

The accepted `observes` relationship is an intentional addition to the
imported checker vocabulary. It preserves the accepted distinction between
recording an observation about an entity and supplying evidence for a claim.

## Compatibility

These vocabularies belong to the sole NKF 0.1 version namespace. Imported
global checker lists and `/v1` contract identities remain evidence only.

A supported profile may add namespaced vocabulary only through a separately
accepted extension boundary. Unknown required meaning fails closed.

Changing a value's meaning, removing a value, changing body ownership, or
weakening a constraint is an NKF format change governed by [ADR 0006](0006-pre-stable-evolution.md).

## Not Decided

This Decision does not accept replacement Markdown or YAML bytes, extension
contracts, acceptance proof, path resolution, schemas, checker behavior,
fixtures, distribution, a release, conformance, or consumer migration.
