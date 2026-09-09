---
id: adr-0138
type: decision
title: "ADR 0138: Adopt The NKF 0.81 Public Adoption Direction"
summary: Adopt the NKF 0.81 Design direction and allocate the version coordinate 0.81 as the successor ADR 0136 named "NKF 0.9" — the recommendation catalog and its channel vocabulary enter the accepted contract with two public values, the adopter fetches over plain HTTPS with no Github CLI, the adoption protocol states where to obtain the adopter, the projection describes a public release, a closed contract-owned registry of three volatile operating-system files ends the onboarding drift, live support slides to 0.81 plus 0.8, the ten frozen supporting Realizations retire to Git history, and every stale document from the 2026-09-08 sweep is repaired under the same release — without accepting an authority set or authorizing publication.
created_at: 2026-09-08T18:51:27Z
---

# ADR 0138: Adopt The NKF 0.81 Public Adoption Direction

## Context And Problem

The `NourdApS/Nourd.NKF` repository became public on `2026-09-08` under
[ADR 0136](0136-adopt-the-public-repository-direction.md), and that Decision
recorded a gap it could not close: the released 0.8 and 0.71 adopters validate
the recommendation catalog against private-channel literals frozen in their
own code, so the catalog states a false visibility until a successor version
can state a public one. The same adopters fetch through the Github CLI, the
frozen public projection calls the release private, and the adoption protocol
never says where the adopter comes from. A first adopter on macOS additionally
meets the onboarding drift
[NKF-018](../tasks/items/NKF-018-stabilize-volatile-onboarding-inputs.md)
recorded on `2026-08-01`.

The Human Product Owner stated they will onboard their first repository once
NKF is completely ready for public use, agreed the proposed order, and
directed the coordinate: "do not go 0.9 , go to 0.81". A whole-repository
sweep the same day found the record stale beneath its reconciled surface, and
the Human Product Owner directed: "all these stale docs must fix under 0.81".

The [NKF 0.81 Public Adoption Design](../designs/items/nkf-0-81-public-adoption.md)
under
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
proposes the successor with six format boundaries stated for confirmation. The
Human Product Owner confirmed each on `2026-09-08`; the verbatim answers are
recorded in the Design's Validation And Decision Evidence section.

## Decision

Adopt the exact direction proposed by the
[NKF 0.81 Public Adoption Design](../designs/items/nkf-0-81-public-adoption.md),
and allocate the version coordinate `0.81` to it:

1. **Coordinate and window.** `0.81` is a full successor version to 0.8 under
   the major-minor coordinate model, exactly as 0.71 was to 0.7. It is the
   successor [ADR 0136](0136-adopt-the-public-repository-direction.md) named
   "the NKF 0.9 successor"; that Decision is immutable and this sentence is the
   reallocation. Live support becomes exactly 0.81 plus 0.8. NKF 0.71 drops to
   stepping-stone history with a fail-closed signal naming the published 0.8
   archive. The 0.8-to-0.81 compatibility is non-breaking.
2. **The catalog enters the contract.** The recommended-release catalog becomes
   an accepted contract, `nkf.recommended-release`, with a derived JSON Schema.
   Its channel vocabulary is closed and owned by the Specification:
   `internal-exact-candidate`, `public-github-prerelease`, and
   `public-github-release`, the two public values with release visibility
   `public`, and the historical private value a 0.8 catalog may state. NKF 0.81
   is published as a prerelease. Later versions choose a value, and new values
   enter by Specification revision.
3. **Plain HTTPS, no Github CLI, no fallback.** The adopter resolves the
   catalog from the raw default-branch URL of `NourdApS/Nourd.NKF` and the
   archive from the release asset URL the catalog carries, using Node's own
   fetch, refusing any digest or canonical-URL mismatch before mutation. The
   offline path with an explicit recommendation and archive is unchanged.
4. **The adopter-obtaining step.** The adoption protocol gains one step before
   its first command, authored once in the version-neutral guidance source and
   emitted into the distributed protocol and the projection: obtain
   `tools/nourd-nkf-adopt.mjs` from the public documentation repository and
   verify its digest against the publication manifest and the recommended
   adopter digest.
5. **The projection describes a public release.** The statements that call the
   release private or require an authenticated session are corrected at their
   source and the projection is regenerated and republished after release.
6. **A closed volatile-metadata registry.** The Specification defines a closed
   registry of exactly three operating-system metadata basenames — `.DS_Store`,
   `Thumbs.db`, `desktop.ini` — that inspection records with a `volatile`
   classification and the onboarding drift digest excludes. No globs, no
   project-declared additions, no content inspection, no automatic deletion,
   and every other entry keeps its fail-closed protection. `.gitignore` is not
   an authority for this boundary.
7. **The ten supporting Realizations retire.** The ten frozen records under
   `realizations/items/`, each confirmed at a version now out of the live
   window, leave the working tree together with their record declarations, the
   way the NKF 0.1 Specification source was retired. Their accepted bytes stay
   in Git history and in the release archives, and the Decisions that
   confirmed them keep binding those bytes by digest. The Realizations map
   lists the current-system record alone. The retired files, their last
   digests, and their confirming Decisions are:

   | Retired source | Last SHA-256 of the file | Confirmed by |
   | --- | --- | --- |
   | `knowledge/realizations/items/agent-led-initial-onboarding.md` | recorded in `.nourd/knowledge/records/` at retirement | [ADR 0070](0070-confirm-agent-led-initial-onboarding.md), [ADR 0075](0075-confirm-complete-portable-onboarding-topology.md) |
   | `knowledge/realizations/items/checker-and-validation.md` | recorded at retirement | [ADR 0059](0059-confirm-governed-frontmatter-realization.md) |
   | `knowledge/realizations/items/contracts-and-schemas.md` | recorded at retirement | [ADR 0059](0059-confirm-governed-frontmatter-realization.md) |
   | `knowledge/realizations/items/initial-greenfield-onboarding.md` | recorded at retirement | [ADR 0068](0068-confirm-initial-greenfield-onboarding.md) |
   | `knowledge/realizations/items/layered-contract-enforcement.md` | recorded at retirement | [ADR 0061](0061-confirm-layered-contract-enforcement-realization.md), [ADR 0062](0062-confirm-remote-workflow-activation-boundary.md), [ADR 0063](0063-defer-protected-merge-gate.md) |
   | `knowledge/realizations/items/nkf-0.4-security-maintenance.md` | recorded at retirement | [ADR 0114](0114-confirm-the-nkf-0-4-release-candidate.md) |
   | `knowledge/realizations/items/portable-knowledge-topology.md` | recorded at retirement | [ADR 0075](0075-confirm-complete-portable-onboarding-topology.md) |
   | `knowledge/realizations/items/release-documentation-and-adoption.md` | recorded at retirement | [ADR 0066](0066-confirm-release-documentation-and-adoption.md), [ADR 0070](0070-confirm-agent-led-initial-onboarding.md) |
   | `knowledge/realizations/items/release-package.md` | recorded at retirement | [ADR 0059](0059-confirm-governed-frontmatter-realization.md), [ADR 0066](0066-confirm-release-documentation-and-adoption.md) |
   | `knowledge/realizations/items/self-hosting.md` | recorded at retirement | [ADR 0061](0061-confirm-layered-contract-enforcement-realization.md), [ADR 0068](0068-confirm-initial-greenfield-onboarding.md) |

   The exact digest of each file at retirement is recorded in the retirement
   Evidence the owning Task produces when the files leave the tree, because the
   digests are facts of that act, not of this Decision.
8. **Every stale document repairs under this release**, at the level its
   lifecycle allows: the living current-system Realization is rewritten where
   its 0.7 layer shows; the specifications and Evidence maps are brought
   current; the eight legacy-locked deferred Tasks are rewritten natively with
   real gates, resolving links, and stale premises restated as dated history;
   the active Task Scope Gate Design's dead links are corrected; and every
   living mention of 0.9 as the remedy becomes 0.81.

## Scope And Applicability

This Decision adopts the Design direction for the work owned by
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
and allocates the coordinate. It governs derivation of the exact NKF 0.81
authority set and its implementation, fixtures, guidance, projection, release
process, and the record reconciliation. The delta-closure propagation defect
recorded in the Design's Unresolved Matters is not adopted here; it awaits the
Human Product Owner's separate confirmation as a seventh boundary. Publication,
recommendation, producer promotion, onboarding of any consumer, the trademark
and conformance-claim policy, and the substance of every deferred Task remain
outside it.

## Rationale

Adoption from the public record must not depend on a private assumption
frozen in code. Moving the catalog shape and its vocabulary into the accepted
contract turns the next visibility or channel change into a reviewed revision
with provenance; two public values now, rather than one, because the Human
Product Owner wants prerelease and release distinguished and room for later
kinds. Plain HTTPS removes the last tool a consumer needs beyond Node, and the
digest in the catalog and the installed pin already carry the trust; a `gh`
fallback would double the audited surface for no gain.

The volatile registry lives in the Specification for the same reason: what may
change unnoticed between a sealed plan and the write is a safety boundary, and
a boundary only code knows cannot be reviewed as meaning. `.gitignore` is
written by the project being onboarded, so honoring it would let that project,
or anyone editing that file, hide content from the reviewer; a fixed list of
three names the operating system writes gives the relief without the
delegation.

The ten Realizations retire because, in the Human Product Owner's words, the
whole point of NKF is an updated and live documentation system, and nothing is
kept for the sake of a digest. Their provenance is preserved by Git and by the
Decisions that bound their bytes; their presence beside the current record is
what let eight versions of staleness be read as current.

## Alternatives Considered

The Design's alternatives are rejected for the reasons it states: keeping the
catalog shape in the adopter, keeping the Github CLI as a fallback, fixing
volatile metadata in the adopter only, project-declared ignore lists, a
separate record-repair Task, editing the immutable Realizations, keeping them
as labelled history, and allocating 0.9 as
[ADR 0136](0136-adopt-the-public-repository-direction.md) wrote. Honoring
`.gitignore` as the volatile boundary, raised by the Human Product Owner and
answered in the Design's terms, is rejected with the registry chosen instead.

## Consequences And Trade-Offs

A consumer adopts NKF 0.81 with Node and network access alone. The catalog
states a public prerelease channel truthfully after promotion, and until then
the 0.8 catalog keeps its recorded literal. A 0.71 repository takes two
ordinary updates instead of one. The Specification grows by one contract and
one registry, both small and both reviewable. Ten files leave the tree and ten
confirming Decisions now point at history; the link verifier already treats
such links as history. The record reconciliation is large and lands in one
release, which is the direction given and the reason this Task is not small.

## Non-Claims

This Decision accepts no NKF 0.81 authority set, no Schema, checker, adopter,
generator, or fixture bytes, and no migration. It confirms no Realization,
establishes no conformance, authorizes no publication, recommendation,
producer promotion, or consumer onboarding, and concludes no Task. It does not
edit [ADR 0136](0136-adopt-the-public-repository-direction.md) or any other
immutable record. The Design remains proposal knowledge with an adopted
disposition; normative NKF 0.81 meaning requires the separately accepted
authority set after its independent audit and the mandatory audit-bound
confirmation Decision.
