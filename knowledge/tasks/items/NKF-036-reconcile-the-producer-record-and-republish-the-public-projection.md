---
title: "NKF-036: Reconcile The Producer Record And Republish The Public Projection"
summary: Bring the producer's front page, consolidated current-system Realization, and specifications map into agreement with the adopted NKF 0.8 reality they already partly state, and publish the deterministic NKF 0.8 public-documentation projection to the public documentation repository that has stood at NKF 0.2 since 2026-08-10 — recording the publication as Evidence and the adoption Task's incomplete reconciliation step as a fact, without changing any accepted meaning, published byte, or repository visibility.
created_at: 2026-09-08T10:47:23Z
---

# NKF-036: Reconcile The Producer Record And Republish The Public Projection

## Human Direction

On `2026-09-08` the Human Product Owner asked whether NKF 0.8 is ready for a
clean repository to adopt, then asked for a plan to fix the stale documentation
found while answering and for a way to onboard repositories. The Claude
technical reviewer proposed three Tasks. For the first, the Human Product Owner
directed verbatim: "ok do task A first".

That direction explicitly creates this Task and begins its work. It covers only
the proposed Task A: reconcile the producer's own documentation and republish
the public projection. The onboarding-channel decision and the empty-repository
onboarding are separate proposals that this Task does not open.

The confirmed boundaries:

1. This Task's complete lifecycle is carried on the `task/NKF-036` branch from
   `master`, and one pull request delivers it for human review.
2. Merging remains the Human Product Owner's act, as does any change of
   repository or release visibility.
3. The Human Product Owner remains authority for every Product boundary. The
   Claude technical reviewer is delegated to perform the reconciliation edits,
   the deterministic public-documentation staging and publication, the
   verification, the Evidence recording, and the gate runs where they
   faithfully implement the confirmed direction.

## Problem

NKF 0.8 is accepted, technically confirmed, published, recommended, and
producer-adopted, and this repository's own record says so — in some places.
In others the same record still states the pre-adoption reality, so a reader
meets both claims in one document.

The front page's status section states that NKF 0.8 is the adopted version,
while its Start Here table still names NKF 0.71 as the format this repository
runs and links the NKF 0.71 adoption protocol as the way to adopt the released
version. The consolidated
[current-system Realization](../../realizations/current-system.md) opens by
declaring that the producer declares, pins, and installs published NKF 0.71,
states in its summary that it is reconciled to the NKF 0.71 release, and then
records the NKF 0.8 adoption further down. Its durable-mapping table still
carries NKF 0.7 checker, adopter, pin, baseline-policy, and test-count facts.
The specifications map still says the producer declares, pins, and installs
the published 0.7 release.

[NKF-035](NKF-035-adopt-the-producer-to-published-nkf-0-8.md) listed
"reconcile the front page and the current-system Realization" as its fifth
scope item and closed with that reconciliation partly done. That is a fact
about a closed Task and belongs in the record; this Task does not reopen it.

Separately, every published archive carries the complete public-documentation
projection, but publishing those bytes to the public documentation repository
is a distinct remote act. That repository was last pushed on `2026-08-10` at
NKF 0.2 content. The source under `public-docs/` has since been reviewed and
frozen at NKF 0.3, 0.4, 0.5, 0.6, 0.7, 0.71, and 0.8 without being projected.
Anyone reading the public explanation or downloading the public adopter today
receives the NKF 0.2 material. The front page states this lag honestly; this
Task closes it.

## Desired Outcome

1. The front page, the current-system Realization, and the specifications map
   state the adopted NKF 0.8 reality wherever they describe what this
   repository currently declares, pins, installs, runs, dispatches,
   recommends, or verifies, with no remaining statement that contradicts it.
2. The public documentation repository carries exactly the deterministic
   NKF 0.8 projection staged from a clean `master` commit, verified from a
   fresh clone byte-for-byte and by every manifest-bound digest.
3. The publication and the incomplete [NKF-035](NKF-035-adopt-the-producer-to-published-nkf-0-8.md) reconciliation are recorded as
   Evidence with separate facts.
4. The complete gate passes on the reconciled repository.

## Scope

1. Reconcile the front page: the Start Here rows for the running format and the
   adoption protocol, the status prose about the public mirror, and any other
   statement of current state that still names a predecessor version.
2. Reconcile the living current-system Realization: its summary, its Governed
   Meaning Realized opening, its durable-mapping rows that state current
   checker, adopter, pin, baseline, protocol, guidance, schema, distribution,
   and test facts, and its test-coverage paragraph. Historical statements about
   predecessor versions stay as history.
3. Reconcile the specifications map's statement of what the producer declares.
4. Stage the public-documentation projection deterministically from the clean
   `master` commit, publish it to the public documentation repository, verify
   it from a second fresh clone, and record the publication as Evidence.
5. Record the [NKF-035](NKF-035-adopt-the-producer-to-published-nkf-0-8.md) step-five finding as a fact in that Evidence.
6. Repin, reseal the reviewed baseline over the changed nodes, run the gate,
   and deliver one pull request.

## Out Of Scope

- Changing NKF 0.8 accepted meaning, contracts, or published bytes, including
  the frozen `public-docs/` source members and the distributed adoption and
  onboarding protocols.
- Changing repository or release visibility, or the onboarding channel. That
  is the separate proposed Task B, not opened here.
- Onboarding any repository. That is the separate proposed Task C, not opened
  here.
- Reopening or amending [NKF-035](NKF-035-adopt-the-producer-to-published-nkf-0-8.md).
  Its incomplete step is recorded as Evidence, not corrected in place.
- Confirming the current-system Realization. It remains `living`, `draft`,
  and `partially-confirmed`.
- Hand-authored public-documentation prose defects, which the NKF 0.8 guidance
  review recorded as outside the generator for a successor version.

## Acceptance Criteria

1. No statement in the front page, the current-system Realization, or the
   specifications map describes NKF 0.71 or NKF 0.7 as what this repository
   currently declares, pins, installs, runs, dispatches, or recommends.
2. The public documentation repository's `master` tip is byte-identical to the
   deterministic staging output from a clean `master` commit of this
   repository, verified from a fresh clone excluding only `.git`.
3. Every file digest in the published `reference/publication.json` equals the
   published file's bytes, the manifest binds NKF 0.8, and the published
   adopter digest equals the recommended adopter digest.
4. The publication Evidence records the staging commit, the published commit,
   the manifest digest, the verification, and the [NKF-035](NKF-035-adopt-the-producer-to-published-nkf-0-8.md) step-five finding as
   separate facts.
5. No published NKF 0.1 through 0.8 byte and no accepted immutable record
   changes.
6. The complete gate passes.

## Execution Plan

1. Open this Task on `task/NKF-036`, declare it, regenerate the state index,
   repin, and commit.
2. Edit the front page, the current-system Realization, and the
   specifications map; repin; run the gate; commit.
3. Stage the projection from the clean `master` commit into an empty
   workspace, replace the public documentation repository's tracked content
   with it, commit and push, clone fresh, and verify by `diff` and by manifest
   digests.
4. Author the publication Evidence, declare it, repin, reseal the reviewed
   baseline over the changed nodes with a completed delta review, run the
   gate, and commit.
5. Author the Completion Result, prove every mandatory capability, repin,
   reseal, and run the deterministic close.

## Current Progress

Created on `2026-09-08` under the Human Direction above, on the `task/NKF-036`
branch from `master`. The reconciliation is performed, the projection is
published and verified, the Evidence is recorded, and the record is resealed.

## Completion Result

The front page, the consolidated
[current-system Realization](../../realizations/current-system.md), and the
specifications map now state the adopted NKF 0.8 reality wherever they describe
what this repository currently declares, pins, installs, runs, dispatches,
recommends, or verifies: the running format and its adoption protocol, the
live window of exactly 0.8 plus 0.71, the 0.8 archive, checker, and adopter
digests, the 0.8 evaluation policy and version delta, the 0.8 protocol and
schema paths, twenty-nine test files and two hundred sixty-eight tests, the
last observed `master` workflow success, and the 0.71 and 0.8 delivery merges.
Predecessor statements stay as history, and the Realization stays `living`,
`draft`, and `partially-confirmed`; nothing here confirms it.

The deterministic NKF 0.8 public-documentation projection, staged from clean
`master` commit `d3f0e84f`, is published to the public documentation
repository as commit `b953e7ba` and verified from a second fresh clone:
byte-identical excluding `.git`, sixty-two manifest-bound digests recomputed
with zero mismatches, the manifest binding NKF 0.8, and the published adopter
bytes equal to the recommended adopter digest. The mirror had stood at NKF 0.2
since `2026-08-10`. Github reported during the push that the repository moved
from `kaveh6202/Nourd.NKF.Docs` to `NourdApS/Nourd.NKF.Docs`; the original
address redirects, the front page names the new location, and the immutable
[ADR 0064](../../decisions/0064-release-documentation-and-adoption.md) keeps
its historical bytes. All of this is recorded in the
[publication Evidence](../../evidence/release/nkf-036-nkf-0-8-public-documentation-publication.md),
which also records as a separate fact that
[NKF-035](NKF-035-adopt-the-producer-to-published-nkf-0-8.md) closed with its
reconciliation step partly done.

No published NKF 0.1 through 0.8 byte and no accepted immutable record
changed: the diff touches the front page, the living Realization, the
specifications map, the new Task and Evidence documents, their declarations,
and the reviewed baseline. The complete gate passes on the reconciled
repository at twenty-nine test files and two hundred sixty-eight tests with
zero diagnostics.

One tooling observation is recorded rather than acted on. The ordinary
review-and-seal recovery path the authoring protocol names has no top-level
adopter command: `review --scaffold` emits the delta review, but sealing it on
an already-current repository is reachable only through the freshness module
the adopter bundles. This Task sealed through that module with the exact
scaffolded review. Exposing the seal as a command is a candidate for a
successor version, not a change this Task makes.

Merging remains the Human Product Owner's separately authorized act, as does
any change of repository or release visibility.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, and deliberate migration; this Task changes no format meaning and needs none of those, and it must not smuggle a meaning change in as a documentation fix. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority stay separate axes; reconciling the Realization's prose does not confirm it, and publishing documentation accepts nothing. |
| [`adr-0064`](../../decisions/0064-release-documentation-and-adoption.md) | record | Reviewed source under `public-docs/` is projected to the dedicated public `kaveh6202/Nourd.NKF.Docs` repository through an allowlist; the projection carries the exact digest-bound normative Markdown mirror and stays explanatory otherwise; making the complete repository public was rejected. This Task publishes only the allowlisted projection. |
| [`adr-0066`](../../decisions/0066-confirm-release-documentation-and-adoption.md) | record | Confirmation covers the exact audited predecessor revisions only; the publication performed here is an observed operational fact and confirms nothing. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption are separate governed protocols; the release protocol makes the front page's status section part of each release. This Task repairs that section after the fact and changes neither protocol. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication freezes the released bytes permanently; the projection published here is the frozen NKF 0.8 `public-docs/` member set, unmodified. |
| [`adr-0134`](../../decisions/0134-accept-the-nkf-0-8-authority-set.md) | record | The accepted NKF 0.8 authority set stays exactly as accepted; this Task changes none of it. |
| [`adr-0135`](../../decisions/0135-confirm-the-nkf-0-8-release-candidate.md) | record | The confirmed and published NKF 0.8 bytes stay exactly as confirmed; any change to them invalidates the confirmation. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| The front page, current-system Realization, and specifications map state the adopted NKF 0.8 reality with no contradicting current-state statement | proven | data-validity | none |
| The public documentation repository tip is byte-identical to the deterministic NKF 0.8 staging from a clean `master` commit, verified from a fresh clone | proven | runtime-behaviour | none |
| Every manifest-bound published digest equals its file's bytes, the manifest binds NKF 0.8, and the published adopter digest equals the recommended adopter digest | proven | data-validity | none |
| No published NKF 0.1 through 0.8 byte and no accepted immutable record changes | proven | data-validity | none |
| The complete gate passes on the reconciled repository | proven | runtime-behaviour | none |

The first entry is proven at `data-validity` by reading the three documents
for every current-state statement, not by a checker rule: no deterministic
check reads prose for version currency, and the guidance self-description rule
covers only guidance frontmatter. The publication entries are proven by a
second fresh clone and an independent digest pass, recorded in the Evidence.
The gate entry is the observed result of one complete `npm run nkf:check` run
on the sealed tree; a later commit is observed separately.
