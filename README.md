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

**New to NKF?** Visit the [Start Here website](https://nourdaps.github.io/Nourd.NKF/)
for visual introductions to the problem, audience, fit, and workflow, or explore
[the mechanics](https://nourdaps.github.io/Nourd.NKF/start-here/mechanics/).

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

NKF 0.81 is the current published version, available as a [public prerelease](https://github.com/NourdApS/Nourd.NKF/releases/tag/release-sha256-a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3) since `2026-09-09`.
Its archive was re-downloaded anonymously and verified against the exact
confirmed digest, as recorded in the [publication Evidence](knowledge/evidence/release/nkf-038-nkf-0-81-release-audit.md#authorized-public-publication-and-re-download).
The recommendation catalog and this producer select that same NKF 0.81 release,
archive `a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3`. The producer adopted the
published archive through the reviewed non-breaking update; repeat Adopt returns
`current`. The public documentation and downloadable adopter now teach and
install 0.81. The standing [release-completion rule](AGENTS.md#producer-release-completion)
requires future releases to advance recommendation, producer adoption, and
public documentation together. NKF 0.8 remains the supported predecessor.

NKF 0.81 is the adopted successor direction, delivered under
[Task NKF-038](knowledge/tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
as the first version released from the public repository. Its direction is
adopted by
[ADR 0138](knowledge/decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md)
and
[ADR 0139](knowledge/decisions/0139-adopt-the-delta-closure-propagation-repair.md),
and its repaired five-artifact authority revision is accepted by
[ADR 0142](knowledge/decisions/0142-accept-the-bound-predecessor-repair.md), with final navigation bindings selected by [ADR 0143](knowledge/decisions/0143-bind-the-predecessor-repair-promotion.md),
under the Human Product Owner's explicit P1 self-audit and execution delegation.
It repairs the reproduced false-ready closure result by binding exact
predecessor baselines and verifying their history, closure, and carried
judgments. The first authority revision and
[ADR 0140](knowledge/decisions/0140-accept-the-nkf-0-81-authority-set.md)
remain immutable history; the new delegation does not retroactively establish
that Decision's acceptance provenance. It moves the recommended-release
catalog into the accepted contract with public channel values, makes the
adopter fetch the catalog and archive over plain HTTPS with no Github CLI,
states where a consumer obtains the adopter, defines the closed three-name
volatile-metadata registry for onboarding, and makes the checker recompute the
delta-review closure with the evaluation policy's impact propagation. The
0.8-to-0.81 upgrade is non-breaking: two hundred fifteen identical rules and
two semantically-new rules, neither in a judgment-dependency list. The complete implementation,
fixtures, generated distribution, public projection, and
[release notes](knowledge/evidence/release/nkf-0.81-release-notes.md) are on
this branch, the whole-set
[guidance review](knowledge/evidence/release/nkf-038-nkf-0-81-guidance-review.md)
is recorded. The corrected exact candidate — archive
`a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3` at release commit
`fa0efa05` — is technically confirmed by
[ADR 0144](knowledge/decisions/0144-confirm-the-repaired-nkf-0-81-candidate.md)
after independent archive, guidance, and predecessor-proof review and a passed
isolated producer exercise. All 281 tests pass; first adoption returned
`updated`, repeat adoption `current`, with the full producer gate passed and
141 source members reproduced. The previous confirmation remains historical
and applies only to its earlier exact candidate.
The implementation has merged to `master`, and the confirmed archive is
published under the accepted public prerelease channel. The catalog and producer now select that exact release under the standing
Human Product Owner direction. Live support
is now exactly NKF 0.81 plus NKF 0.8, with a 0.71 repository stepping through
the published 0.8 archive.

The ten frozen supporting Realizations that once sat beside the current-system
record were retired to Git history under ADR 0138, and the
[Current System Realization](knowledge/realizations/current-system.md) is the
one current account, rewritten current-first with the version lineage as a
table.

Every published archive carries its complete public-documentation projection
and exact public adopter. Publication of those bytes to the separate
[NKF Public Documentation repository](https://github.com/NourdApS/Nourd.NKF.Docs)
is a separately verified remote operation within release completion. The exact
0.81 projection, including its public adopter and release-bound manifest, is
published there and verified from a fresh clone. The
[release Evidence](knowledge/evidence/release/nkf-038-nkf-0-81-release-audit.md#recommendation-producer-adoption-and-public-documentation-completion)
records its source and published commits and digest verification. GitHub owns
its later state.

The `NKF Contracts` workflow validates every push and pull request with the
canonical command, and since `2026-09-08` its `Validate` check is required on
`master` by branch protection enforced for administrators, with pushes
restricted to the Human Product Owner and force pushes and deletion disallowed,
activated under
[ADR 0136](knowledge/decisions/0136-adopt-the-public-repository-direction.md)
and confirmed as configured at that time by
[ADR 0137](knowledge/decisions/0137-confirm-the-protected-merge-gate.md)
from Github's own report, including the blocked invalid-candidate exercise
recorded under
[Task NKF-012](knowledge/tasks/items/NKF-012-activate-protected-merge-gate.md).
The Human Product Owner has since lifted the branch lock and set the required
approving-review count to zero with their bypass allowance retained; Github,
not this page, is authoritative for the protection in force at any moment.

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

This repository is public since `2026-09-08` under
[ADR 0136](knowledge/decisions/0136-adopt-the-public-repository-direction.md),
which supersedes the earlier rejection of a public repository for exactly that
point. Every published release archive is downloadable by its tag without
authentication. The released 0.8 and 0.71 adopters still fetch through `gh`,
so adopting them needs a Github login; the accepted NKF 0.81 successor — the
version
[ADR 0136](knowledge/decisions/0136-adopt-the-public-repository-direction.md)
called 0.9 and
[ADR 0138](knowledge/decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md)
allocated as 0.81 — fetches over plain HTTPS. The recommendation now selects 0.81 with the accepted
`public-github-prerelease` channel and `public` visibility. Historical 0.8
catalog and adopter bytes remain retrievable from their immutable release.

Licensing and visibility do not publish a release, accept governed knowledge,
confirm a Realization, or establish conformance. Security-response,
contribution, and conduct policies are stated in [SECURITY.md](SECURITY.md),
[CONTRIBUTING.md](CONTRIBUTING.md), and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md);
trademark and conformance-claim policy remain separate matters.

## Start Here

| Need | Location |
| --- | --- |
| Understand the current implementation | [Current System Realization](knowledge/realizations/current-system.md) |
| Read the public explanation and adoption guide | [NKF Public Documentation](https://github.com/NourdApS/Nourd.NKF.Docs) |
| Read the normative format this repository runs | [NKF 0.81 Specification](knowledge/specifications/nkf-0.81.md) |
| Read the supported predecessor | [NKF 0.8 Specification](knowledge/specifications/nkf-0.8.md) |
| Read the historical 0.71 stepping-stone authority | [NKF 0.71 Specification](knowledge/specifications/nkf-0.71.md) |
| Inspect the executable companions | [NKF 0.8 YAML Contract](contracts/nkf/0.8/nkf.yaml), [NKF 0.81 YAML Contract](contracts/nkf/0.81/nkf.yaml) |
| Inspect the closed structural contracts | [NKF 0.8 Schemas](contracts/nkf/0.8/schemas/), [NKF 0.81 Schemas](contracts/nkf/0.81/schemas/) |
| Adopt the recommended version | [NKF 0.81 Adoption Protocol](distribution/nkf/0.81/integrations/adoption/nkf-adoption-protocol.md) |
| Read the NKF 0.81 adoption protocol | [NKF 0.81 Adoption Protocol](distribution/nkf/0.81/integrations/adoption/nkf-adoption-protocol.md) |
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
against its exact candidate commit, and branch protection on `master`
requires its `Validate` check.

Release review separately runs `npm run verify:recommended-release` to verify
the published recommendation. It is not part of authoring validation for an
unreleased successor.

## Pre-Stable Evolution

NKF remains open to evidence-driven change before its first stable release.
Real-project findings must move through governed reproduction, classification,
validation, confirmation, authoritative updates, release, and deliberate
consumer migration; pre-stable does not permit silent contract drift.
