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

NKF 0.4 is the current accepted, released, and recommended version. Its one
complete 136-member versioned set carries the canonical Specification,
digest-bound executable companion, four Schemas, deterministic checker and
adopter, four governed protocols, portable agent skills, host-adapter
guidance, fixtures, examples, and the 64-file public-documentation projection.
The content-addressed archive and release tag are identified by SHA-256
`a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd`.
The [GitHub release](https://github.com/kaveh6202/Nourd.NKF/releases/tag/release-sha256-a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd)
is an immutable private prerelease.

NKF 0.4 freezes every complete-set byte at publication even when no repository
has adopted it. It preserves the complete NKF 0.3 meaning, including the
Decision Applicability Gate, five validation
levels, heading-equal titles, machine-verified deep links, four-state Task
vocabulary, and deterministic governed mechanics, while resolving patched
`fast-uri` `3.1.5` and development-only `nanoid` `3.3.18`. Migration from 0.1
or 0.2 is breaking and requires explicit repository-owner approval; 0.3 to 0.4
is non-breaking without knowledge migration or breaking approval; same-version
0.4 refresh is non-breaking. NKF 0.1, 0.2, and 0.3 remain immutable supported
predecessors rather than current recommendations.

This producer repository has now adopted the same exact published 0.4
recommendation through the public subcommand-free Adopt operation. It pins the
content-addressed 0.4 archive and retains the verified host-superset
integration: the pinned release check runs first, then the preserved stronger
producer gate. Immediate repeat and a separate pristine-clone audit returned
`current` without tracked mutation, preserved the complete knowledge tree,
passed 28 test files and 210 tests, and rejected pin, archive, and integration
tampering. The evidence is recorded in the
[NKF-024 producer-adoption audit](knowledge/evidence/audits/nkf-024-nkf-0-4-producer-adoption-audit.md).

The 0.3 archive carries its complete public-documentation projection and exact
public adopter. Publication of those bytes to the separate
[NKF Public Documentation repository](https://github.com/kaveh6202/Nourd.NKF.Docs)
is a separate remote operation; this repository does not claim that mirror has
yet moved from its last independently observed 0.2 state.

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
| Read the normative format | [NKF 0.4 Specification](knowledge/specifications/nkf-0.4.md) |
| Inspect the executable companion | [NKF 0.4 YAML Contract](contracts/nkf/0.4/nkf.yaml) |
| Inspect the closed structural contracts | [NKF 0.4 Schemas](contracts/nkf/0.4/schemas/) |
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
