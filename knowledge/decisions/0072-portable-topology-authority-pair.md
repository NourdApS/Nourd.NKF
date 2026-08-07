---
id: adr-0072
type: decision
summary: Accept the exact successor NKF 0.1 Markdown and executable YAML authority pair that defines the complete portable Product and Technology knowledge topology adopted by ADR 0071.
created_at: 2026-08-01T08:40:15Z
record_lifecycle: immutable
record_status: accepted
task: NKF-017
---

# ADR 0072: Portable Topology Authority Pair

## Context And Problem

ADR 0071 adopted the complete portable onboarding topology, but explicitly did
not revise the canonical NKF 0.1 Specification or executable companion. NKF
requires the exact normative Markdown revision to be accepted separately and
the executable YAML to bind that Markdown without becoming a competing
authority.

The successor pair was drafted outside the canonical locations, compared with
the confirmed predecessor, parsed mechanically, and independently audited.
The Human Product Owner accepted the exact audited pair on
`2026-08-01T08:40:15Z`.

## Decision

NKF accepts and promotes these exact bytes unchanged:

| Authority Artifact | Accepted SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `3da17ce0b16be89f3aae8be9d2245a8df161a8e9cc9c4b9afff9c706983e694b` |
| `contracts/nkf/0.1/nkf.yaml` | `d2af4ecc0137793f0eafeb55def02956fe6883e035e71bafa2ca4abdccf74a01` |

Markdown remains the authoritative human meaning. The YAML contract set is
its complete executable companion. If the pair conflicts, validation fails
closed and Markdown precedence does not license a checker to guess an
executable correction.

The successor adds the complete Common portable topology, one managed
canonical map, deterministic lifecycle placement and index completeness,
profile-specific initial scaffolds, continuing topology conformance, and
receipt-bound predecessor repair exactly as adopted by ADR 0071.

## Scope And Applicability

This Decision governs native Product and Technology bundles that deliberately
pin the successor NKF 0.1 release. It governs the derived bundle Schema,
record and validation-result source metadata, checker behavior, diagnostics,
onboarding and repair tooling, receipts, fixtures, integrations, public
documentation, self-hosting migration, and Realization mapping.

It does not activate NKF-014, migrate Nourd Agent SDK, or change the meaning of
a historical release or consumer snapshot.

## Rationale

Binding the exact pair prevents Design prose, implementation, fixtures, or a
passing checker from silently defining the format. Keeping the single `0.1`
coordinate preserves the accepted pre-stable evolution model while exact
digests and successor release metadata make migration deliberate.

The executable companion exposes every mechanical topology boundary needed by
Schemas and the checker without replacing the canonical Markdown explanation
or its authority distinctions.

## Alternatives Considered

Implementing directly from ADR 0071 was rejected because a Design and Decision
direction are not the normative format. Treating the YAML as independently
authoritative was rejected because it would create two semantic authorities.
Introducing a topology sub-version was rejected because NKF has one version
namespace. Mutating the predecessor release was rejected because it would
silently change the meaning of earlier conformance results.

## Consequences And Trade-Offs

The current checker, Schemas, fixtures, release projection, self-hosted bundle,
and adopter become predecessor implementations until they are coherently
rebound and verified. The accepted pair therefore does not by itself establish
a usable successor release.

Every newly adopted successor bundle carries more navigation files and stricter
placement and index checks. Existing consumers must use the explicit migration
or receipt-bound repair path.

## Compatibility

The NKF version remains `0.1`. The accepted pair is a pre-stable successor
revision identified by exact artifact and release digests. Historical releases
remain valid descriptions of the snapshots they supported and do not gain the
new topology by implication.

Unapplied predecessor onboarding workspaces are regenerated. Successfully
onboarded NKF-013 or NKF-015 repositories may use the trusted-receipt repair
workflow. Other existing repositories require a governed migration plan.

## Realization Requirements

The successor requires source-bound Schemas, checker bindings, link-aware
topology validation, onboarding generation, repair transaction and receipts,
rollback and idempotence, portable skills and protocol guidance, Product and
Technology fixtures, public documentation, release inputs, and complete NKF
self-hosting migration.

After implementation, `npm run nkf:check` must pass against the exact
self-hosted snapshot. NKF-017 then requires a whole-repository audit and a
separate confirmation Decision binding the exact successor Realizations before
Task completion or release.

## Non-Claims

This Decision does not:

- implement or confirm the successor Realization;
- prove the current checker enforces the accepted topology;
- make the current worktree conform to the successor contract before derived
  artifacts and self-hosting are synchronized;
- verify acceptance bindings;
- migrate or conform a consumer repository;
- publish a release; or
- establish remote protected-branch enforcement.
