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

NKF 0.8 is the current accepted, published, recommended, and producer-adopted
version. Its content-addressed archive and release tag are identified by SHA-256
`2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5`, published
as an immutable prerelease at the technically confirmed release commit
`1c8c3194`. This producer repository declares and pins that exact
recommendation: it self-adopted 0.8 through the ordinary public Adopt
operation, the promotion created the native accepted 0.8 Specification record
on the digest-bound delta claim alone, and repeat public invocations return
`current`.

The three deterministic guidance verifiers NKF 0.8 adds now run in this
repository's own gate. One of them — the generation check that proves every
emitted guidance member matches its version-neutral source — is live and did
real work during the adoption. The other two are cut-time controls that skip
members frozen by publication, so they protect the next version at its cut
rather than this one after it.

NKF 0.71 is the deliberately small corrective successor to NKF 0.7, its
authority accepted by
[ADR 0131](knowledge/decisions/0131-accept-the-nkf-0-71-authority-set.md)
after a two-round independent audit and its exact release candidate
confirmed by
[ADR 0132](knowledge/decisions/0132-confirm-the-nkf-0-71-release-candidate.md).
It reconciles the 0.7 Specification's topology self-contradiction in prose
and executable explicitly, corrects the copy-forward version labels, makes
the deterministic Task conclusion seal its own successor baseline through
the `mechanically-concluded` claim, and regenerates the public-documentation
projection.

NKF 0.8 is the released successor. It
derives every version-bearing guidance member from one version-neutral
authored source with the version injected instead of copying it forward,
makes a guidance file's own frontmatter self-description a checked
conformance position, and binds the pre-cut whole-set guidance review and its
independent audit to the deterministically enumerated release set. Its
authority is accepted by
[ADR 0134](knowledge/decisions/0134-accept-the-nkf-0-8-authority-set.md)
after a fresh independent audit whose nine blocking findings were repaired.
Live support slides to exactly NKF 0.8 plus NKF 0.71 — updating an exact
conformant 0.71 repository is non-breaking through the ordinary reviewed
delta update, a 0.7 repository steps through the published 0.71 archive, and
older repositories step through their published archives in turn.

Merging remains the Human Product Owner's separately authorized act, as does
any change of repository or release visibility.

Every published archive carries its complete public-documentation projection
and exact public adopter. Publication of those bytes to the separate
[NKF Public Documentation repository](https://github.com/NourdApS/Nourd.NKF.Docs)
is a separate remote operation. The NKF 0.8 projection staged from `master`
commit `d3f0e84f` was published there on `2026-09-08` and verified
byte-for-byte from a fresh clone, as recorded in the
[publication Evidence](knowledge/evidence/release/nkf-036-nkf-0-8-public-documentation-publication.md);
the repository moved from `kaveh6202/Nourd.NKF.Docs` to the NourdApS
organization and the original address redirects. Github owns its later state.

The `NKF Contracts` workflow validates every push and pull request with the
canonical command, and since `2026-09-08` its `Validate` check is required on
`master` by branch protection enforced for administrators, activated under
[ADR 0136](knowledge/decisions/0136-adopt-the-public-repository-direction.md)
and recorded in the
[public repository observation](knowledge/evidence/release/nkf-037-public-repository-observation.md).
The required approving review and bypass policy remain with
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

This repository is public since `2026-09-08` under
[ADR 0136](knowledge/decisions/0136-adopt-the-public-repository-direction.md),
which supersedes the earlier rejection of a public repository for exactly that
point. Every published release archive is downloadable by its tag without
authentication; the released adopters still fetch through `gh`, so adoption
needs a Github login until NKF 0.9. The recommendation catalog still states a
private channel because the released adopters validate that literal in frozen
bytes; the gap and its NKF 0.9 remedy are recorded in the
[public repository observation](knowledge/evidence/release/nkf-037-public-repository-observation.md).
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
| Read the normative format this repository runs | [NKF 0.8 Specification](knowledge/specifications/nkf-0.8.md) |
| Read the live-supported predecessor authority | [NKF 0.71 Specification](knowledge/specifications/nkf-0.71.md) |
| Inspect the executable companion | [NKF 0.8 YAML Contract](contracts/nkf/0.8/nkf.yaml) |
| Inspect the closed structural contracts | [NKF 0.8 Schemas](contracts/nkf/0.8/schemas/) |
| Adopt the released version | [NKF 0.8 Adoption Protocol](distribution/nkf/0.8/integrations/adoption/nkf-adoption-protocol.md) |
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
