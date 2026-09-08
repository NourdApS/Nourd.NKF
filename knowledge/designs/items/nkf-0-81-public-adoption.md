---
id: design-nkf-038-public-adoption
type: design
title: NKF 0.81 Public Adoption
summary: This Design proposes NKF 0.81, the successor to the published NKF 0.8 that makes adoption from the now-public repository truthful and self-contained — the recommendation catalog's channel vocabulary moves from adopter code into the accepted contract with a public value, the adopter fetches the catalog and archive over plain HTTPS with digest verification and no Github CLI, the adoption protocol tells a consumer where to obtain the adopter, the public-documentation projection stops calling the release private, and onboarding stops failing on recognized volatile operating-system metadata under a closed contract-owned registry — with live support sliding to exactly 0.81 plus 0.8, and the whole-repository stale-record repair delivered under the same release.
created_at: 2026-09-08T13:51:52Z
---

# NKF 0.81 Public Adoption

## Design Kind Problem And Scope

This is a Technology specification, contract, tooling, release, and
distribution Design under
[NKF-038](../../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md).
It proposes NKF 0.81, the successor to the immutable published NKF 0.8 set,
scoped to one question the Human Product Owner posed and one direction they
gave: what must be true before a clean repository can adopt NKF from the public
record alone, and that every stale document found on `2026-09-08` is repaired
under this release.

The repository became public on `2026-09-08` under
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md).
Four things still stand between an outsider and a completed adoption, and each
is frozen in published 0.8 bytes.

- **The adopter needs the Github CLI.** It resolves the recommendation catalog
  with `gh api` and downloads the archive with `gh release download`. Both
  work anonymously over plain HTTPS now, but the adopter cannot use that path.
- **The catalog lies and cannot be corrected.** The adopter validates
  `release/recommended.json` against closed literals — channel
  `internal-private-github-prerelease`, release visibility `private` — that
  appear in no accepted Specification, contract, or Schema. Only the adopter
  code knows them. Changing the catalog breaks every released adopter, so it
  states a false visibility by design until a successor exists.
- **The public prose says private.** The frozen projection tells readers the
  checker release "is internal to authorized" projects and directs them to an
  authenticated `gh` session in four places.
- **Nothing tells a consumer where the adopter comes from.** The distributed
  adoption protocol begins at `node nourd-nkf-adopt.mjs --project`; only the
  public documentation guide says the file is at `tools/nourd-nkf-adopt.mjs`
  in the projection and verified through `reference/publication.json`.

A fifth defect is unrelated to visibility and equally blocking for a first
adopter on macOS.
[NKF-018](../../tasks/items/NKF-018-stabilize-volatile-onboarding-inputs.md)
records that the onboarding snapshot binds every filesystem entry outside
top-level `.git`, so Finder rewriting `.DS_Store` between inspection and
adoption fails the plan with `NKF-ONBOARDING-INSPECTION-DRIFT`. The behaviour
is safe and the friction is real.

## Governing Inputs And Constraints

- [ADR 0076](../../decisions/0076-versioned-contract-evolution.md): after
  first consumer adoption, every contract-meaning change ships as a new
  immutable NKF version. The catalog vocabulary entering the contract and the
  volatile-metadata registry are contract meaning; they ship as 0.81.
- [ADR 0107](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md):
  one public subcommand-free Adopt operation with predecessor-relative
  compatibility signals. This Design changes how Adopt reaches its inputs, not
  the operation.
- [ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md):
  published bytes are frozen and the producer's own adoption is proven in the
  isolated exercise. The 0.8 catalog literal stays until promotion.
- [ADR 0134](../../decisions/0134-accept-the-nkf-0-8-authority-set.md) and
  [ADR 0135](../../decisions/0135-confirm-the-nkf-0-8-release-candidate.md):
  the exact predecessor the 0.81 version delta is computed against, and the
  six limits its final audit declined to vouch for.
- [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md):
  the repository is public and the catalog gap is recorded with "the NKF 0.9
  successor" as remedy. The Human Product Owner has since chosen `0.81`.
- [ADR 0064](../../decisions/0064-release-documentation-and-adoption.md): the
  allowlisted public projection and the public-safe digest-verifying adopter
  continue.
- The accepted NKF 0.8 Specification defines neither the recommended-release
  catalog shape, nor any Github CLI dependency, nor the onboarding capture
  rule. All three are adopter implementation and derived protocol text today.
  That is precisely why two of them could go false without any accepted
  meaning changing.
- The release protocol's nine steps, the full-set guidance review of
  [ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md),
  and the generated-distribution rule of 0.8 apply in full: every guidance
  member is emitted from `guidance-source/` with the version injected.

## Proposed Direction

### Version Coordinate And Window

The version string is exactly `0.81`, chosen by the Human Product Owner. Under
the major-minor coordinate model it is minor eighty-one, a full successor
version to 0.8, exactly as 0.71 was to 0.7. Live support becomes exactly 0.81
plus 0.8 under the standing current-plus-one policy; NKF 0.71 drops to
stepping-stone history and a 0.71 repository receives a fail-closed signal
naming the published 0.8 archive. The 0.8-to-0.81 compatibility is classified
non-breaking: no path, identity, or declaration-shape migration, an ordinary
reviewed delta update with a mechanical contract rebind, and a producer
promotion proven on the digest-bound delta claim alone.

[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md)
called this successor "NKF 0.9". That Decision is immutable and is not edited.
The adopting Decision for this Design allocates `0.81` and states that it is
the successor [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md) named; every living document that says 0.9 is corrected
to 0.81 with that reallocation stated once.

### The Catalog Vocabulary Enters The Contract

The recommended-release catalog becomes an accepted contract: the successor
Specification defines `nkf.recommended-release` with its fields, and a derived
JSON Schema closes its shape, exactly as the release manifest and the release
pin already are. The channel vocabulary is closed and owned there:
`internal-exact-candidate` for the isolated exercise, and one public value —
proposed `public-github-prerelease` — with release visibility `public`. The
old private value remains in the vocabulary as history a 0.8 catalog may
state, so the 0.81 adopter can read a 0.8 catalog during the upgrade window
and refuse nothing truthful.

After promotion the live catalog states the public channel and visibility. The
0.81 adopter validates the catalog against the contract's Schema and
vocabulary, not against literals in its own code, so the next visibility or
channel change is a contract revision with provenance rather than a hidden
adopter constant.

### Fetching Without The Github Command Line

The adopter resolves the catalog from the raw default-branch URL of
`NourdApS/Nourd.NKF` and downloads the archive from the release asset URL the
catalog carries, both over plain HTTPS using Node's own `fetch`, with no
`gh` binary, no token, and no credentials. Trust stays where it already is:
the full archive SHA-256 in the catalog and the installed pin. A download
whose digest differs is refused; a catalog whose archive URL does not match the
contract's canonical form for the repository is refused. The repository
locator stays `NourdApS/Nourd.NKF` and is still the only permitted source.

The offline path — explicit `--recommendation` and `--archive` — is unchanged
and remains the route for an approved release without network access. The
Git transition mechanics that already use `gh` to open and ready pull requests
are unaffected by this Design; they are producer-side operational output and
degrade truthfully when `gh` is absent, as they do today.

### The Adopter Tells You Where To Get It

The adoption protocol gains one step before its first command: obtain
`tools/nourd-nkf-adopt.mjs` from the public documentation repository at its
published commit, verify its SHA-256 against `reference/publication.json` and
against the recommended `adopter_sha256`, and only then run it. The step is
authored once in `guidance-source/integrations/adoption/` and emitted into the
distributed protocol and the projection, so the two cannot disagree.

### The Projection Describes A Public Release

The four hand-authored statements that call the release private or require an
authenticated session are corrected in the `public-docs/` source, the
generated members are regenerated, and the projection is republished after
release under the same publication Evidence pattern as
[NKF-036](../../tasks/items/NKF-036-reconcile-the-producer-record-and-republish-the-public-projection.md).
The statement that NKF is pre-stable stays.

### A Closed Volatile-Metadata Registry

The successor Specification adds one closed registry of volatile
operating-system metadata entries that the onboarding drift digest excludes
while the inspection still records them: exact basenames only, no globs, no
project-declared additions, no content inspection, no automatic deletion.
The proposed initial registry is `.DS_Store`, `Thumbs.db`, `desktop.ini`,
and `.DS_Store` variants Finder writes, each justified as a file whose content
is generated by the operating system and carries no project meaning. The
inspection manifest lists them with a `volatile` classification so the
participating agent still sees every entry; the sealed snapshot digest omits
their bytes; and preflight still fails closed on any other addition, removal,
move, or byte change. The registry lives in the contract, not in the adopter,
for the same reason the channel vocabulary does: a safety boundary that
exists only in code cannot be reviewed as meaning.

This answers the design questions
[NKF-018](../../tasks/items/NKF-018-stabilize-volatile-onboarding-inputs.md)
posed: visible yes, closed registry yes, project additions no, cleanup never,
new volatile entries between seal and application tolerated only for the
registered basenames, cross-platform names in Core, and the change is
Specification meaning delivered as a successor version, not a quiet adopter
repair.

### Stale Record Repair Under The Same Release

Every finding of the `2026-09-08` sweep is repaired at the level its lifecycle
allows, in this release's reconciliation step rather than a separate Task, as
the Human Product Owner directed.

- The living
  [current-system Realization](../../realizations/current-system.md) loses its
  0.7 layer: the durable-mapping rows, the Interfaces section, the
  Compatibility section, and the undated present-tense history are rewritten
  to 0.81 or framed as dated history.
- The ten immutable supporting Realizations under `realizations/items/` are
  not edited. The Realizations map regroups them as confirmed predecessor
  provenance, each with the version it was last confirmed at, and the
  current-system record remains the one current account.
- The specifications and Evidence maps are brought current.
- The eight legacy-locked deferred Tasks are rewritten natively as
  [NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md) was:
  native envelope, resolving deep links, a real extracted gate, and stale
  premises restated as dated history, with their substance untouched and their
  state still deferred.
- The active Task Scope Gate Design's dead links are corrected, which is a
  living-record revision.
- Every living mention of 0.9 as the remedy becomes 0.81.

### Fail-Closed Version Registration

`0.81` is registered at every version surface the 0.71 and 0.8 releases
identified — the checker bindings and dispatch tables, the freshness and
topology version sets, the adopter's supported window and upgrade route, the
release configuration and digest binding script, the version-delta seed, the
release set, fixtures, the guidance generator's target list, the candidate
exercise, and the self-hosting test — and an unregistered version keeps
failing closed rather than inheriting predecessor semantics.

## Responsibilities Interactions And Information Flows

The Human Product Owner confirms each format boundary in this Design, accepts
the authority set after its independent audit, and separately authorizes
publication, recommendation, promotion, and every merge. The Claude technical
reviewer, under the delegation recorded in the owning Task, derives and
implements the set, performs the guidance review, requests the independent
audits, records Evidence, and performs the record reconciliation. The
accepted Specification owns the catalog shape, the channel vocabulary, and the
volatile registry; the adopter implements them and owns nothing. Github owns
the public repository's state and the release assets; the catalog observes
them. Consumer repositories own their adoption decisions; a release obligates
none of them.

## Alternatives And Trade-Offs

### Keep The Catalog Shape In The Adopter And Change The Literal

Ship a 0.81 adopter with new hard-coded literals and no contract. Cheapest,
and it recreates the defect exactly: the next change again needs a version
with no reviewable meaning behind it. Rejected.

### Keep The Github Command Line As An Optional Path

Fetch over HTTPS by default and fall back to `gh` when present. Two code paths
to one artifact doubles the surface an audit must cover and gives a consumer
two ways to be wrong about why a fetch failed. The offline `--archive` path
already covers the case where HTTPS is unavailable. Rejected.

### Fix Volatile Metadata In The Adopter Only

Exclude `.DS_Store` in inspection code without touching the Specification.
Faster, and it puts a security boundary — what may change unnoticed between
seal and adoption — in a place no accepted meaning governs. The [NKF-018](../../tasks/items/NKF-018-stabilize-volatile-onboarding-inputs.md)
guardrails were written against exactly this. Rejected.

### Let Projects Declare Their Own Volatile Entries

Allow a project-declared ignore list. Turns an attacker-controlled filename
into a bypass and reintroduces `.gitignore`-as-authority through another door.
Rejected; the registry is closed and contract-owned.

### Separate The Record Repair Into Its Own Task

Land the stale-record fixes before or after 0.81 as their own pull request.
The Human Product Owner directed that they fix under 0.81; a separate Task
would also leave the current-system record describing a 0.8 producer while
the release that changes it is in flight. Rejected by direction.

### Edit The Immutable Supporting Realizations

Correct the ten stale items in place. Forbidden by their immutable lifecycle
and legacy locks, and it would erase the provenance of what was confirmed when.
Rejected; they are reclassified as predecessor provenance.

### Allocate 0.9 As The Earlier Decision Wrote

Keep the coordinate [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md) named. The Human Product Owner chose `0.81`, and
under the coordinate model both are full successors; the choice is theirs. The
reallocation is stated once in the adopting Decision. Rejected by direction.

## Failure Safety Recovery And Operations

Every new mechanism fails closed. An HTTPS fetch that returns anything but the
expected status, a body whose digest differs from the catalog, a catalog that
fails the Schema or names a channel outside the vocabulary, a catalog URL that
does not match the canonical form, or an unregistered version each refuse
before mutation with the offline path as recovery. The volatile registry
excludes bytes from the drift digest only for exact registered basenames;
every other entry keeps today's protection, and a registered basename that is
a symbolic link, directory, or special file is still refused. The upgrade
path is the ordinary reviewed delta update with rollback covering every
project-owned mutation. The record repair is validated by the checker for
links, digests, and gates, and by a repeat sweep for prose.

## Validation And Decision Evidence

The adopting Decision is validated by the Human Product Owner's verbatim
confirmation of each boundary below. The authority set is validated by an
independent audit before acceptance. The implementation is validated by the
full suite over 0.81 and 0.8 fixtures, deterministic builds, the guidance and
documentation verifiers, an isolated candidate adoption of a real producer
copy proving the 0.8-to-0.81 upgrade on the delta claim alone, an adoption
from a clean environment with no `gh` binary and no credentials, the [NKF-018](../../tasks/items/NKF-018-stabilize-volatile-onboarding-inputs.md)
`.DS_Store` reproduction passing while a meaningful-file drift still fails,
and a fresh independent release audit before the confirmation Decision.

The boundaries the Human Product Owner confirms before the authority set is
authored:

1. `0.81` as a full successor with live support exactly 0.81 plus 0.8 and 0.71
   as stepping-stone history.
2. The recommended-release catalog and its channel vocabulary become accepted
   contract meaning with the public value `public-github-prerelease`.
3. The adopter fetches over plain HTTPS with no Github CLI and no fallback.
4. The adoption protocol gains the adopter-obtaining step.
5. The volatile-metadata registry is closed, contract-owned, initially
   `.DS_Store`, `Thumbs.db`, and `desktop.ini`, visible in inspection and
   excluded from the drift digest.
6. The ten immutable supporting Realizations are reclassified as predecessor
   provenance rather than succeeded by ten new records.

## Unresolved Matters

- The exact public channel value name; `public-github-prerelease` is proposed.
- Whether the catalog should additionally carry a signature or a second
  independent digest source once the repository is public. Not proposed here;
  the archive digest and installed pin remain the trust anchors.
- Whether the stepping-stone archives of 0.1 through 0.71 should be mirrored
  anywhere other than Github releases. Not proposed here.
- The trademark and conformance-claim policy, which the public repository
  makes real and which is a Product Task after this release.
