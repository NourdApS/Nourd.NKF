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
| Repository | `NourdApS/Nourd.NKF` |
| Remote | `https://github.com/NourdApS/Nourd.NKF.git` |
| Default branch | `master` |

This repository owns NKF specifications, profiles, executable contracts,
conformance tooling and fixtures, compatibility, migrations, releases,
distribution, security, and technical lifecycle.

## Current Status

NKF 0.6 revision 3 is the current accepted, released, and recommended
version. Its content-addressed archive and release tag are identified by
SHA-256
`b0822199c1ddb4ea9de14e4c005edf77b44f9c60a6005689505ab00436dd4c95`, published
as an immutable private prerelease. This producer repository declares and
pins that exact recommendation: the producer publicly self-adopted 0.6, the
promotion created the native accepted 0.6 Specification record, and repeat
public invocations return `current`.

NKF 0.7 is the accepted successor prepared on the release branch: it makes
semantic review carry-forward digest-bound and computable, confines fresh
review to a declared per-rule semantic delta with a fail-closed delta claim,
adds deterministic review and record scaffolds, neutralizes state-baked
identity and stable paths through explicit succession, adds operational-fact
promotion triggers, makes the post-audit technical-confirmation Decision
mandatory and audit-bound, performs the Git transition orchestration the
authoring guidance describes, and cuts live support to the current version
plus one predecessor. Its authority is accepted by
[ADR 0128](knowledge/decisions/0128-accept-the-revised-nkf-0-7-authority-set.md)
after three independent audit rounds and a rehearsal-driven revision, and its
complete producer promotion is proven at both authorized stages against
isolated copies of this repository. Migration from NKF 0.6 is breaking and
requires explicit repository-owner approval with a computed delta review;
repositories declaring NKF 0.1 through 0.5 migrate through their immutable
published archives as stepping stones. Publication, recommendation, and the
live producer promotion of 0.7 remain separately authorized Human Product
Owner acts; until they complete, this repository remains on NKF 0.6.

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

## License

Nourd ApS makes its NKF repository work available under the standard
[Apache License 2.0](LICENSE), with the informational attribution in
[NOTICE](NOTICE). Code and data identified in
[Third-Party Notices](THIRD_PARTY_NOTICES.md) remain under their own compatible
licenses.

Licensing does not by itself make this private repository public, publish a
release, accept governed knowledge, confirm a Realization, or establish
conformance. Trademark, contribution, governance, security-response, and
community-conduct policies remain separate matters.

## Start Here

| Need | Location |
| --- | --- |
| Understand the current implementation | [Current System Realization](knowledge/realizations/current-system.md) |
| Read the public explanation and adoption guide | [NKF Public Documentation](https://github.com/kaveh6202/Nourd.NKF.Docs) |
| Read the normative format | [NKF 0.6 Specification](knowledge/specifications/nkf-0.6-revision-3.md) |
| Inspect the executable companion | [NKF 0.6 YAML Contract](contracts/nkf/0.6/revision-3/nkf.yaml) |
| Inspect the closed structural contracts | [NKF 0.6 Schemas](contracts/nkf/0.6/schemas/) |
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
