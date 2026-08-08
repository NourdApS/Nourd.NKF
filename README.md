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

NKF 0.2 is the current released version: one complete versioned set — the
canonical Specification, its digest-bound executable companion, derived
Schemas, the deterministic checker, four governed protocols, and four
portable agent skills — published as a single content-addressed archive
whose tag is its SHA-256. The
[GitHub Releases page](https://github.com/kaveh6202/Nourd.NKF/releases)
carries the current archive and its human-readable migration meaning.

NKF 0.2 requires a Decision Applicability Gate on every Task, separates five
validation levels with direct-outcome evidence rules, requires heading-equal
titles and machine-verified deep links, and ships deterministic governed
mechanics in the adopter. Acceptance and the correction chain are recorded
in [the Decisions](knowledge/decisions/README.md).

This repository has adopted NKF 0.2 as its own first adopter. The
recommended consumer catalog still pins the confirmed NKF 0.1 predecessor
release; consumer migration to 0.2 is deliberate, separate work under the
[NKF Adoption Protocol](integrations/adoption/nkf-adoption-protocol.md). The
published
[NKF Public Documentation](https://github.com/kaveh6202/Nourd.NKF.Docs)
still describes the predecessor experience until it is deliberately
republished.

The `NKF Contracts` workflow validates every push and pull request with the
canonical command. The protected merge gate remains deferred to
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
| Read the normative format | [NKF 0.2 Specification](knowledge/specifications/nkf-0.2.md) |
| Inspect the executable companion | [NKF 0.2 YAML Contract](contracts/nkf/0.2/nkf.yaml) |
| Inspect the closed structural contracts | [NKF 0.2 Schemas](contracts/nkf/0.2/schemas/) |
| Adopt a released version | [NKF Adoption Protocol](integrations/adoption/nkf-adoption-protocol.md) |
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
