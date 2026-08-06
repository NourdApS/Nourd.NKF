---
created_at: 2026-07-28T22:01:17Z
---

# Nourd Knowledge Format

Nourd Knowledge Format (**NKF**) is Company-owned **Shared Technology**
maintained by Nourd ApS. It is a human-readable, machine-verifiable format for
durable governed knowledge.

NKF defines format, declaration, compatibility, and conformance contracts. A
repository or other eligible subject that adopts NKF remains authoritative for
its own meaning, acceptance decisions, and operational state.

## Repository Identity

| Property | Value |
| --- | --- |
| Owner | Nourd ApS |
| Classification | Shared Technology |
| Repository | `kaveh6202/Nourd.NKF` |
| Remote | `https://github.com/kaveh6202/Nourd.NKF.git` |
| Default branch | `master` |

This repository owns NKF specifications, profiles, executable contracts,
conformance tooling and fixtures, compatibility, migrations, releases,
distribution, security, and technical lifecycle.

## Current Status

NKF 0.1 consists of one automatic Common Specification and one selected Root
Profile. The currently defined Root Profiles are Product and Technology. The
repository self-hosts as an NKF Technology bundle.

ADR 0073 accepts the corrected current Markdown/YAML authority pair for the
complete portable Product and Technology topology. ADR 0075 confirms its
derived Schemas, checker, onboarding and repair tooling, fixtures,
self-hosting migration, and public-documentation projection. The successor is
confirmed locally but is not released or published.

The currently recommended internal private prerelease remains the confirmed
NKF-015 predecessor. Authorized consumers pin its full archive SHA-256 through
the public-safe adopter and never follow a moving branch or mutable latest
release. They do not receive NKF-017 topology behavior until a deliberate
successor release and migration.

The published
[NKF Public Documentation](https://github.com/kaveh6202/Nourd.NKF.Docs)
describes the confirmed predecessor experience. Updated topology, onboarding,
recovery, and complete Product and Technology examples are staged locally
under NKF-017 but are not claimed as published. Task `NKF-008` remains complete
for its predecessor internal release and adoption scope.

The `NKF Contracts` and explicitly dispatched `NKF Consumer Adoption`
workflows have passed on observed exact commits. The protected merge gate
remains unavailable under the observed private-repository plan. Task
`NKF-011` is complete for the delivered enforcement scope; activation and
proof of the protected gate are deferred to
[Task NKF-012](knowledge/tasks/deferred/NKF-012-activate-protected-merge-gate.md).
The
[Current System Realization](knowledge/realizations/current-system.md) records
the exact implementation, confirmation, and enforcement boundaries.

Passing validation establishes conformance for one observed snapshot only. It
does not verify every historical acceptance binding, accept consumer
knowledge, confirm implementation correctness, publish a release, or migrate
a consumer.

## Start Here

| Need | Location |
| --- | --- |
| Understand the current implementation | [Current System Realization](knowledge/realizations/current-system.md) |
| Read the public explanation and adoption guide | [NKF Public Documentation](https://github.com/kaveh6202/Nourd.NKF.Docs) |
| Read the normative format | [NKF 0.1 Specification](knowledge/specifications/nkf-0.1.md) |
| Inspect the executable companion | [NKF 0.1 YAML Contract](contracts/nkf/0.1/nkf.yaml) |
| Inspect the closed structural contracts | [NKF 0.1 Schemas](contracts/nkf/0.1/schemas/) |
| Navigate governed knowledge | [Knowledge Map](knowledge/README.md) |
| Review active and deferred work | [Task Map](knowledge/tasks/README.md) |

Agents and contributors must also follow [AGENTS.md](AGENTS.md) and the
repository's neutral
[NKF Authoring Protocol](integrations/ai/nkf-authoring-protocol.md).

## Validate This Repository

Use Node.js 22 or later and install the pinned dependencies:

```sh
npm ci
npm run nkf:check
```

The canonical command verifies agent guidance, type-checks and tests the
checker, verifies deterministic checker and adopter builds, verifies the
public documentation and complete examples, and validates the complete
self-hosted NKF bundle. The checked-in Github workflow runs the same command
against its exact candidate commit. A successful workflow run is not a
protected merge gate unless Github repository rules require that check.

Release review separately runs `npm run verify:recommended-release` to verify
the published recommendation. It is not part of authoring validation for an
unreleased successor.

## Pre-Stable Evolution

NKF remains open to evidence-driven change before its first stable release.
Real-project findings must move through governed reproduction, classification,
validation, confirmation, authoritative updates, release, and deliberate
consumer migration; pre-stable does not permit silent contract drift.
