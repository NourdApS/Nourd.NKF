---
id: design-nkf-037-public-repository
type: design
title: NKF Public Repository
summary: This Design proposes making the NKF producer repository public by the Human Product Owner's act, so that any repository can adopt a published NKF version without collaborator access and every published version has an address — while the released recommendation catalog keeps its private-channel literals until the NKF 0.81 successor can state a public channel truthfully, the frozen bytes stay frozen, and the visibility change is prepared by a history scan and followed by verification and reconciliation.
created_at: 2026-09-08T11:25:20Z
---

# NKF Public Repository

## Design Kind Problem And Scope

This is a Technology governance, distribution, and repository-operations Design
under
[NKF-037](../../tasks/items/NKF-037-make-the-nkf-repository-public.md). It
proposes one change of operational fact — the `NourdApS/Nourd.NKF` repository
becomes public — and the governed consequences that follow from it. It changes
no accepted NKF meaning, no contract, and no published byte.

The problem is adoption access. NKF 0.8 is accepted, technically confirmed,
published, recommended, and producer-adopted, and the ordinary public Adopt
operation is proven on this producer. But the released adopter resolves the
recommendation catalog through `gh api` against `NourdApS/Nourd.NKF` and
downloads the archive through `gh release download` from the same repository.
Both require the caller to have read access to a private repository. A clean
repository owned by someone outside the collaborator set cannot adopt, and no
address exists that can be handed out for the latest or for a specific
published version.

[ADR 0064](../../decisions/0064-release-documentation-and-adoption.md) rejected
making the complete repository public. Its reason was scoped to documentation:
public explanation did not require public Tasks, Evidence, checker source, or
operations, so the allowlisted projection to a separate public documentation
repository was chosen instead. That projection exists and was republished at
NKF 0.8 under
[NKF-036](../../tasks/items/NKF-036-reconcile-the-producer-record-and-republish-the-public-projection.md).
It answers the documentation need. It does not answer the adoption need,
because the adopter it carries still fetches from the private repository.

## Governing Inputs And Constraints

- [ADR 0064](../../decisions/0064-release-documentation-and-adoption.md)
  chose the private prerelease channel addressed by full archive digest, the
  allowlisted public projection, and rejected the public repository. This
  Design asks a later Decision to supersede exactly the rejection and to leave
  the digest-addressed channel and the projection standing.
- [ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
  freezes every published set permanently. The released 0.8 and 0.71 adopters
  are frozen bytes, and each validates the recommendation catalog against the
  closed literals channel `internal-private-github-prerelease` and release
  visibility `private`. Those literals are adopter implementation; they appear
  in no accepted Specification or Schema. They cannot be relaxed in place.
- [ADR 0121](../../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md)
  prepared Apache-2.0 licensing as repository content and stated that licensing
  does not by itself make the repository public. The separate visibility
  decision it anticipated is this one.
- [ADR 0080](../../decisions/0080-release-and-adoption-process.md) keeps the
  release and adoption processes in the versioned set. The adopter's fetch
  behaviour therefore changes only through a versioned release.
- [NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md) is
  deferred with an activation condition that names a visibility change.
  Github returned `403` for branch protection on the private repository under
  the current plan and states that a public repository enables it.
- [NKF-009](../../tasks/items/NKF-009-governed-artifact-secret-scanning.md) is
  deferred, so no governed secret scan has run over the history a public
  repository would expose.

## Proposed Direction

### Visibility Becomes Public By Human Act

The Human Product Owner changes the repository from private to public in Github
settings. No agent, script, or governed operation performs that act, and no
NKF version implies it. The Decision that adopts this Design authorizes the
act; the act itself remains a separately observed operational fact.

### What Becomes Visible

Everything in the repository and its history becomes readable: governed Tasks,
Designs, Decisions, Specifications, Realizations, Evidence, audits, checker and
adopter source, fixtures, workflows, and every commit. The eleven published
prereleases and their content-addressed archives become downloadable by URL
without authentication. This is deliberate: an address for the latest and for
any specific version is the stated need, and the release tags already are those
addresses.

The license already permits this. Apache-2.0 with the approved NOTICE and
third-party notices is in place and verified by the gate.

### The Catalog Stays Literal Until NKF 0.81

The successor was called "NKF 0.9" when this Design was written;
[ADR 0138](../../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md)
allocated `0.81` to it on `2026-09-08`, and this Design says 0.81 throughout.

The recommendation catalog `release/recommended.json` continues to state channel
`internal-private-github-prerelease` and release visibility `private` after the
flip, because the released 0.8 and 0.71 adopters refuse any other value. This
is a truthfulness gap and it is recorded as one, in the Decision and in
Evidence, rather than smoothed over.

The remedy is the NKF 0.81 successor, which this Design scopes but does not
deliver: the adopter fetches the catalog and the archive over plain HTTPS from
the public repository with no `gh` dependency, the channel vocabulary gains a
public value and moves from adopter code into the accepted contract, the frozen
public-documentation prose that calls the checker release private is
regenerated, and the distributed adoption protocol gains the step that tells a
consumer where to obtain the adopter. Until 0.81 ships, a consumer adopts with a
`gh` login against the now-public repository, which no longer requires
collaborator access.

### The Protected Merge Gate Becomes Activatable

A public repository makes branch protection available on the current plan. The
activation condition of
[NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md) is then
observed true. This Design proposes recording that observation as Evidence and
leaving activation to the Human Product Owner's separate direction, either
within the owning Task or by resuming that deferred Task.

### Pre-Flip Hygiene

Before the flip, the complete Git history is scanned for secrets, tokens,
private keys, and personal data, and the result is Evidence regardless of what
it finds. A finding blocks the flip until the Human Product Owner decides how
to treat it; history rewriting is not proposed and would invalidate every
commit-bound record.

The Human Product Owner also decides whether security-response, contribution,
and conduct policies exist at the flip. The current Realization records them
as unresolved Product matters. This Design proposes recording that decision
explicitly rather than drafting policy text under delegation.

### Post-Flip Verification And Reconciliation

After the flip, the public state is verified from outside the collaborator set:
an anonymous clone, an anonymous download of the catalog's archive URL whose
bytes hash to the recommended archive digest, and a branch-protection query
that no longer returns `403`. Each observation is Evidence. The front page and
the current-system Realization are then reconciled: statements that the
repository is private, that its releases are private prereleases, and that
branch protection is unavailable become history with dates, and the catalog
gap is stated with NKF 0.81 named as its remedy.

## Responsibilities Interactions And Information Flows

The Human Product Owner owns the Decision, the visibility act, the policy
questions, and every merge. The Claude technical reviewer, under the delegation
recorded in the owning Task, authors the Design and Decision text, runs the
history scan, verifies the public state, reconciles the record, and records
Evidence. Github owns the visibility setting, the release assets, the
protection capability, and their time-bound state; the record observes them
and never claims to be them. The NKF 0.81 release Task owns the adopter fetch
change, the channel vocabulary, and the regenerated public prose. Consumer
repositories own their own adoption decisions; a public repository obligates
none of them.

## Alternatives And Trade-Offs

### Publish A Separate Public Release Mirror

Keep the producer private and mirror the catalog, archives, and adopter to a
public repository. This keeps the internal record private, but the released
adopters hard-code `NourdApS/Nourd.NKF` as the only permitted repository, so a
mirror serves nobody until NKF 0.81 changes the adopter anyway. It also
duplicates the release channel, creating a second place the recommendation can
drift. Rejected: it costs a release cycle and still leaves the 0.8 path closed.

### Grant Collaborator Access Per Consumer

Add each adopting repository's owner as a collaborator. This works for
repositories the organization administers and fails for everyone else. It
produces no address anyone can publish, and it scales with administration
effort rather than with releases. Rejected as the general path; it remains the
only path for the days between now and the flip.

### Flip Visibility And Correct The Catalog Now

Make the repository public and change the catalog to a public channel value at
the same time. Every released 0.8 and 0.71 adopter validates the old literals
and would fail closed on the new ones, so every existing consumer, including
this producer, loses the ordinary Adopt path. Rejected: it trades a recorded
truthfulness gap for a broken adoption path.

### Stay Private Until NKF 0.81 Ships

Defer the flip until the successor's adopter can state a public channel. This
avoids the truthfulness gap but delays every external adoption by a release
cycle for no gain: the frozen adopters need a `gh` login either way, and the
public repository removes the collaborator requirement immediately. Rejected;
the gap is recorded instead.

## Failure Safety Recovery And Operations

A public repository cannot be made private again in any meaningful sense once
its history has been cloned. The history scan before the flip is therefore the
one control that matters, and a finding blocks the flip. The scan is recorded
whatever it finds, and history rewriting is not a recovery path because every
Decision and Evidence record binds exact commits.

Workflows on a public repository run for pull requests from forks with
restricted tokens. The two checked-in workflows must be reviewed for secret use
before the flip; the observation is Evidence, and a workflow that needs a
secret on fork pull requests is a finding, not something to work around.

Github's secret scanning and dependency alerts become available on a public
repository; enabling them is a settings act for the Human Product Owner and
their state is observed, not owned.

## Validation And Decision Evidence

The Decision that adopts this direction is validated by the Human Product
Owner's explicit confirmation of the direction and of what becomes visible. The
flip is validated by the three anonymous observations above. The reconciliation
is validated by reading the front page and the Realization for every statement
of private state, and by the complete gate. None of this accepts NKF meaning
or confirms the Realization.

## Unresolved Matters

- Whether security-response, contribution, and conduct policy files exist at
  the flip, and with what content. Human Product Owner decision.
- Whether Github issues stay enabled on the public repository. Human Product
  Owner decision.
- Whether the protected merge gate is activated within the owning Task or by
  resuming
  [NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md).
  Human Product Owner direction.
- When the NKF 0.81 release Task opens. Until then the catalog gap stands as
  recorded.
