---
id: adr-0001
type: decision
title: "ADR 0001: Establish Independent NKF Shared Technology Authority"
summary: NKF 0.1 was accepted inside the Nourd Studio Product repository as the initial Product knowledge format. Subsequent NKF checker work also began there, with a portable consumer path proposed for Shredwise.
created_at: 2026-07-28T22:01:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0001: Establish Independent NKF Shared Technology Authority

- **Acceptance source:** Direct informed confirmation in the Nourd Agent SDK
  design discussion on 28 July 2026

## Context

NKF 0.1 was accepted inside the Nourd Studio Product repository as the initial
Product knowledge format. Subsequent NKF checker work also began there, with a
portable consumer path proposed for Shredwise.

NKF is intended to serve multiple Products and Shared Technologies and to own
its own specifications, profiles, compatibility, conformance, and releases.
Leaving that authority inside Nourd Studio would make one Product the
technical owner of a cross-Product standard. Moving NKF into Nourd Agent SDK
would instead couple the format to one of its consumers.

The accepted Company structure defines substantial, independently versioned
cross-Product technical foundations as Shared Technology and requires each
Shared Technology to own an independent repository.

## Decision

Nourd Knowledge Format is Company-owned Shared Technology maintained by Nourd
ApS.

Its independent repository identity is:

| Property | Value |
| --- | --- |
| Local path | `/Users/kam/Documents/NourdApS/shared_technology/nourd_knowledge_format` |
| GitHub repository | `kaveh6202/Nourd.NKF` |
| Expected remote | `https://github.com/kaveh6202/Nourd.NKF.git` |
| Default branch | `master` |

This repository owns NKF normative specifications, profiles, executable
contracts, conformance tooling and fixtures, compatibility, migration,
distribution, releases, security, and technical lifecycle.

Nourd Studio, Shredwise, Nourd Agent SDK, and later eligible consumers select
and pin NKF releases. Consumption does not transfer ownership or allow a
consumer to redefine shared contracts.

NKF remains a format and conformance authority. It does not own or accept a
consumer's canonical meaning, operational state, external systems, or
consequential actions. Nourd Knowledge Engine and a possible future Nourd
Knowledge Protocol remain distinct concerns.

## Migration Boundary

The accepted Nourd Studio ADR and exact NKF 0.1 Product specification remain
immutable source provenance. They must be imported or referenced with exact
repository, path, commit, and digest identity.

Future normative NKF changes occur here. Nourd Studio requires a later
governed Decision recording the authority handover and its pinned consumer
relationship; its accepted historical Decision must not be rewritten.

The current NKF-002 checker work must be reconciled as proposal and
implementation evidence. Repository movement alone does not accept its
amendments, implementation choices, or conformance claims.

## Consequences

- NKF gains one neutral technical owner outside every consumer.
- Product and Shared Technology profiles can share a core without collapsing
  their distinct meaning.
- Consumers require explicit version pins and non-atomic migration.
- Existing Studio source remains traceable while future authority moves here.
- Checker packaging, compatibility, releases, security, and public governance
  become NKF repository responsibilities.
- Company and consumer knowledge must later point to this repository without
  duplicating its technical authority.

## Deferred

This Decision does not accept the exact shared core, Shared Technology profile,
schema revisions, checker implementation, package registry, license, public
governance, stable 1.0 release, NKP, or Knowledge Engine topology.
