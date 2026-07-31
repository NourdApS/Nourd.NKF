---
created_at: 2026-07-28T22:01:17Z
---

# Nourd Knowledge Format

Nourd Knowledge Format (**NKF**) is Company-owned **Shared Technology**
maintained by Nourd ApS. It is a human-readable, machine-verifiable format for
durable governed knowledge.

NKF is not a Product. A repository, Product, Shared Technology, Company, or
other eligible subject that uses NKF remains authoritative for its own meaning.
NKF defines format, declaration, compatibility, and conformance contracts; it
does not accept a consumer's knowledge or become authority for operational
state.

## Repository identity

| Property | Value |
| --- | --- |
| Owner | Nourd ApS |
| Classification | Shared Technology |
| Repository | `kaveh6202/Nourd.NKF` |
| Remote | `https://github.com/kaveh6202/Nourd.NKF.git` |
| Default branch | `master` |
| Local checkout | `/Users/kam/Documents/NourdApS/shared_technology/nourd_knowledge_format` |

This repository owns NKF specifications, profiles, executable contracts,
conformance tooling and fixtures, compatibility, migrations, releases,
distribution, security, and technical lifecycle.

## Current Stage

The independent authority migration, repository-knowledge repair, and
governed-frontmatter adoption are complete under Tasks `NKF-003`, `NKF-007`,
and `NKF-010`.

NKF 0.1 has one automatic non-selectable Common Specification and two
selectable Root Profiles: Product and Technology. ADR 0058 accepts the exact
current Markdown/YAML authority pair. ADR 0059 confirms the current Schemas,
checker, fixtures, deterministic build, and Technology self-hosting
Realization. The
[Current System Realization](knowledge/realizations/current-system.md)
records what is implemented, confirmed, pending, and deferred.

This repository self-hosts as an NKF Technology bundle. Its current local
full-bundle validation passes over the complete governed snapshot. ADR 0061
confirms the audited local layered-enforcement Realization under active Task
`NKF-011`; remote workflow activation, required protection, and the blocked
invalid-merge observation remain separate operational work.

The existing checker prerelease predates the current authority and confirmed
Realization. Current publication and deliberate consumer onboarding remain
deferred to Task `NKF-008`.

Passing validation establishes conformance for one observed snapshot only. It
does not verify every historical acceptance binding, accept consumer
knowledge, confirm implementation correctness, publish a release, or migrate
a consumer.

NKF remains open to evidence-driven change before its first stable release.
Real-project findings must move through governed reproduction, classification,
validation, confirmation, authoritative updates, release, and deliberate
consumer migration; pre-stable does not permit silent contract drift.
