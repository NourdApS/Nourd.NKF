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

NKF 0.71 is the current accepted, published, recommended, and producer-adopted version. Its
content-addressed archive and release tag are identified by SHA-256
`3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13`, published
as an immutable private prerelease at the technically confirmed release
commit. This producer repository declares and pins that exact
recommendation: the producer publicly self-adopted 0.71 through the ordinary
Adopt operation, the promotion created the native accepted 0.71
Specification record through the first live promotion proven on the
digest-bound delta claim alone, and repeat public invocations return
`current`.

NKF 0.7 makes semantic review carry-forward digest-bound and computable,
confines fresh review to a declared per-rule semantic delta with a
fail-closed delta claim, adds deterministic review and record scaffolds,
neutralizes state-baked identity and stable paths through explicit
succession, adds operational-fact promotion triggers, makes the post-audit
technical-confirmation Decision mandatory and audit-bound, performs the Git
transition orchestration the authoring guidance describes, and cuts live
support to the current version plus one predecessor. Its authority is
accepted by
[ADR 0128](knowledge/decisions/0128-accept-the-revised-nkf-0-7-authority-set.md)
and its exact release candidate is confirmed by
[ADR 0129](knowledge/decisions/0129-confirm-the-nkf-0-7-release-candidate.md)
against a clean independent release audit.

NKF 0.71 is the deliberately small corrective successor to NKF 0.7, its
authority accepted by
[ADR 0131](knowledge/decisions/0131-accept-the-nkf-0-71-authority-set.md)
after a two-round independent audit. It reconciles the 0.7 Specification's
topology self-contradiction in prose and executable explicitly, corrects
the copy-forward version labels, makes the deterministic Task conclusion
seal its own successor baseline through the `mechanically-concluded` claim,
regenerates the public-documentation projection, and slides live support to
exactly NKF 0.71 plus NKF 0.7 — updating an exact conformant 0.7 repository
is non-breaking through the ordinary reviewed delta update, a 0.6
repository steps through the published 0.7 archive, and older repositories
step through their published archives in turn. Its producer promotion is
the first in this lineage proven through the digest-bound delta claim
alone. Publication, recommendation, live promotion, and merging remain the
Human Product Owner's separately authorized acts.

Every published archive carries its complete public-documentation projection
and exact public adopter. Publication of those bytes to the separate
[NKF Public Documentation repository](https://github.com/kaveh6202/Nourd.NKF.Docs)
is a separate remote operation; this repository does not claim that mirror has
yet moved from its last independently observed 0.2 state.

The `NKF Contracts` workflow validates every push and pull request with the
canonical command. The protected merge gate remains deferred to
[Task NKF-012](knowledge/tasks/items/NKF-012-activate-protected-merge-gate.md).
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
| Read the normative format | [NKF 0.71 Specification](knowledge/specifications/nkf-0.71.md) |
| Inspect the executable companion | [NKF 0.71 YAML Contract](contracts/nkf/0.71/nkf.yaml) |
| Inspect the closed structural contracts | [NKF 0.71 Schemas](contracts/nkf/0.71/schemas/) |
| Adopt the released version | [NKF 0.71 Adoption Protocol](distribution/nkf/0.71/integrations/adoption/nkf-adoption-protocol.md) |
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
