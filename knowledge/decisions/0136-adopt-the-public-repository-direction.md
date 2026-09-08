---
id: adr-0136
type: decision
title: "ADR 0136: Adopt The Public Repository Direction"
summary: Adopt the NKF Public Repository Design direction — the NourdApS/Nourd.NKF repository becomes public by the Human Product Owner's act so that any repository can adopt a published NKF version without collaborator access and every published version has an address — superseding ADR 0064 exactly where it rejected a public repository, keeping the digest-addressed release channel and the public documentation projection, recording that the released recommendation catalog keeps its private-channel literals until NKF 0.9, and settling the community-policy, issues, and protected-merge-gate questions the Design left to the Human Product Owner.
created_at: 2026-09-08T11:35:03Z
---

# ADR 0136: Adopt The Public Repository Direction

## Context And Problem

NKF 0.8 is accepted, technically confirmed, published, recommended, and
producer-adopted, and the ordinary public Adopt operation is proven on this
producer. A clean repository outside this organization's collaborator set still
cannot adopt it. The released adopter resolves the recommendation catalog with
`gh api` against `NourdApS/Nourd.NKF` and downloads the archive with
`gh release download` from the same repository, and that repository is
private. No address exists for the latest or for any specific published
version.

[ADR 0064](0064-release-documentation-and-adoption.md) rejected making the
complete repository public because documentation did not require public Tasks,
Evidence, checker source, or operations, and chose the allowlisted projection to
a separate public documentation repository. That projection exists and was
republished at NKF 0.8 under
[NKF-036](../tasks/items/NKF-036-reconcile-the-producer-record-and-republish-the-public-projection.md).
It serves the documentation need the earlier Decision reasoned about. It does
not serve adoption, because the adopter it carries fetches from the private
repository.

The [NKF Public Repository Design](../designs/items/nkf-public-repository.md)
under [NKF-037](../tasks/items/NKF-037-make-the-nkf-repository-public.md)
proposes the change of operational fact and its governed consequences. The
Human Product Owner directed the direction verbatim — "yes let's open source
the repo" — reviewed the Design and its four open questions, and confirmed all
of them on `2026-09-08`.

## Decision

Adopt the exact direction proposed by the
[NKF Public Repository Design](../designs/items/nkf-public-repository.md):

1. The `NourdApS/Nourd.NKF` repository becomes public. The Human Product Owner
   performs the visibility change in Github repository settings. No agent,
   script, governed operation, or NKF version performs or implies it, and the
   change is recorded afterwards as an observed operational fact.
2. Everything in the repository and its history becomes readable, and the
   published prereleases and their content-addressed archives become
   downloadable by URL without authentication. This is deliberate: the release
   tags are the addresses the adoption need requires.
3. This Decision supersedes [ADR 0064](0064-release-documentation-and-adoption.md)
   only where that Decision rejected making the complete repository public. Its
   private-prerelease channel addressed by full archive digest, its allowlisted
   public documentation projection, its self-contained adopter, and every other
   point stand unchanged. The projection continues; a public producer does not
   replace it.
4. The recommendation catalog `release/recommended.json` keeps channel
   `internal-private-github-prerelease` and release visibility `private` after
   the flip. The released NKF 0.8 and 0.71 adopters validate those literals in
   frozen bytes and refuse any other value, so a truthful public channel value
   requires the NKF 0.9 successor. The gap is recorded here and in Evidence
   rather than smoothed over, and NKF 0.9 is named as its remedy.
5. Security-response, contribution, and conduct policy files exist at the flip.
   Their text is authored under the recorded delegation as repository content
   and is accepted by the Human Product Owner through the ordinary review and
   merge of the owning Task's pull request.
6. Github issues stay enabled on the public repository.
7. Branch protection on `master` is activated within
   [NKF-037](../tasks/items/NKF-037-make-the-nkf-repository-public.md)
   immediately after the flip, requiring the exact-commit `NKF Contracts`
   check. The scope deferred to
   [NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) that
   this activation satisfies is recorded there by a later governed revision;
   this Decision does not close that Task.
8. Before the flip, the complete Git history is scanned for secrets and
   personal data and the result is Evidence, whatever it finds. History
   rewriting is not a remedy under this Decision.

## Scope And Applicability

This Decision governs the visibility of the `NourdApS/Nourd.NKF` repository,
the supersession of one point of
[ADR 0064](0064-release-documentation-and-adoption.md), the recorded
catalog-truthfulness gap, and the community-policy, issues, and protection
questions named above. It applies to the work owned by
[NKF-037](../tasks/items/NKF-037-make-the-nkf-repository-public.md).

It does not govern the NKF 0.9 successor: the adopter's plain-HTTPS fetch, the
channel vocabulary moving from adopter code into the accepted contract, the
regenerated public-documentation prose, and the adoption protocol's
adopter-obtaining step are scoped by the Design and delivered by a separate
release Task under the release protocol. It does not govern the separate public
documentation repository, whose projection continues under
[ADR 0064](0064-release-documentation-and-adoption.md).

## Rationale

The adoption need is real and the projection cannot meet it. Every consumer
path the released adopters offer terminates in the private repository, and the
adopters hard-code that repository as the only permitted source. A public
producer is the one change that opens the 0.8 path immediately, without a
release cycle and without breaking any existing consumer.

The earlier rejection was correct for its question and is not overturned for
its question. Documentation still does not require a public producer; adoption
does. Superseding exactly the rejection, and nothing else, keeps the record
honest about why the earlier Decision was made and why it no longer decides
this point.

Recording the catalog gap is preferable to either alternative. Correcting the
literals now breaks every released adopter, including this producer's own
ordinary Adopt path. Deferring the flip until 0.9 delays every external
adoption by a release cycle to avoid a gap that is fully described and dated.
A recorded, dated, remedied gap is the pre-stable posture
[ADR 0006](0006-pre-stable-evolution.md) already accepts.

The policy files exist because a public repository with an open issue tracker
will receive reports and contributions, and a reporter deserves a stated route
on day one. Their text is repository content, not NKF meaning, and the
Human Product Owner accepts it by merging.

Branch protection is activated now because its only blocker was visibility,
because the exact-commit `NKF Contracts` workflow already exists and passes on
every push, and because a public repository that accepts pull requests should
not admit an unvalidated candidate into `master`.

## Alternatives Considered

The Design's four alternatives are rejected for the reasons it states. A
separate public release mirror serves nobody until NKF 0.9 changes the adopter
and duplicates the release channel. Per-consumer collaborator access does not
scale and produces no address. Correcting the catalog at the flip breaks every
released adopter. Staying private until 0.9 ships delays adoption for no gain.

Two further alternatives were considered for the questions the Design left
open. Deferring the policy files was rejected because the repository will be
public and reachable before any later Task delivers them. Leaving branch
protection to a resumed
[NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) was
rejected because the activation is one settings act whose precondition this
Task creates.

## Consequences And Trade-Offs

Every governed Task, Design, Decision, Specification, Realization, Evidence
record, audit, fixture, and source file becomes public, including candid
audit findings and the Human Product Owner's personal address on twelve early
commits. The history scan found no credential and no third-party personal
data. The repository cannot be made private again in any meaningful sense once
cloned; this Decision accepts that.

The catalog states a false visibility until NKF 0.9. A consumer reading it
learns that the channel is private when it is not; the adoption mechanics are
unaffected because the archive URL, digest, and adopter validation are exactly
what they were. The front page and the Realization state the gap and its
remedy.

Until NKF 0.9, adoption still requires a `gh` login, because the released
adopters fetch through `gh`. What changes is that any Github user's login now
suffices; collaborator access is no longer required.

Branch protection changes how this repository merges: the `NKF Contracts` check
becomes required on `master`. Pull requests from forks run the workflow with a
restricted token, which the workflows already tolerate because they use no
secrets.

## Non-Claims

This Decision changes no accepted NKF meaning, contract, Schema, checker,
adopter, fixture, or published byte, and it does not change the recommendation
catalog. It does not perform the visibility change, does not confirm any
Realization, does not establish conformance, and does not close
[NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) or
[NKF-009](../tasks/items/NKF-009-governed-artifact-secret-scanning.md). It
does not accept the policy files' text; the Human Product Owner accepts that by
merging. It authorizes no NKF 0.9 work; that requires its own Task under the
release protocol.
