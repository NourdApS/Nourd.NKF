---
title: "NKF-035: Adopt The Producer To Published NKF 0.8"
summary: Adopt this producer repository to the published NKF 0.8 release through the ordinary public Adopt operation, declaring and installing the exact recommended archive, activating the three deterministic guidance verifiers that NKF 0.8 keys to the declared version, restamping the version-bearing guidance the adoption changes, and reconciling the governed record to the adopted reality — delivered as one stacked pull request while merging remains the Human Product Owner's act.
created_at: 2026-08-19T15:00:00Z
---

# NKF-035: Adopt The Producer To Published NKF 0.8

## Human Direction

On `2026-08-19`, after NKF 0.8 was released, the Human Product Owner directed
verbatim: "release NKF 0.8 on the same branch . then open another branch and
adopt nkf to 0.8 . base the new branch on the previous one and open a new PR
ready to merge to master."

That direction explicitly creates this Task and begins its work. It mirrors the
[NKF-032](NKF-032-adopt-the-producer-to-published-nkf-0-71.md) and
[NKF-029](NKF-029-adopt-the-producer-to-published-nkf-0-7.md) pattern.

The confirmed boundaries:

1. NKF 0.8 is already published from `task/NKF-033` at the confirmed release
   commit, and the governed recommendation already selects it.
2. This Task's complete lifecycle is carried on the `task/NKF-035` branch,
   based on `task/NKF-033`, and one stacked pull request delivers the complete
   producer adoption for human review.
3. Merging both pull requests remains the Human Product Owner's act, as does
   any change of repository or release visibility.
4. The Human Product Owner remains authority for every Product boundary. The
   Claude technical reviewer is delegated to perform the adoption mechanics,
   evidence recording, reconciliations, and tests where they faithfully
   implement the confirmed direction.

## Problem

The producer repository declares and pins NKF 0.71 while recommending NKF 0.8.
That gap is deliberate and correct — publication and adoption are separate acts
— but it has one consequence this Task exists to close.

The three deterministic guidance verifiers NKF 0.8 adds are keyed to the
declared version, so a repository declaring NKF 0.71 does not run them. They are
the enforcement this release was built for: the guidance-generation check that
proves every emitted member matches its source, the version-label check that
covers a guidance file's own frontmatter self-description, and the
guidance-review check that binds the pre-cut whole-set review to the
deterministically enumerated release set with each recorded digest verified
against its member's bytes.

Until this producer adopts NKF 0.8, those checks run only inside the isolated
candidate exercise. The repository that authored the remedy is the last one
still exposed to the defect it removed.

`verify-recommended-release` states the same coupling mechanically: it requires
the recommendation's adopter digest to equal the installed pin, and it fails
while the recommendation is ahead of the pin.

## Desired Outcome

1. The producer declares NKF 0.8, pins the exact published archive
   `2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5`, and
   repeat public Adopt invocations return `current`.
2. The accepted NKF 0.8 producer chain runs in this repository's own gate,
   including all three new guidance verifiers, and the complete gate is green
   under it.
3. The two protocol roots emitted at the adopted version are restamped to
   NKF 0.8 from the same version-neutral source, and every derived surface
   agrees with the adopted reality.
4. `verify-recommended-release` passes, closing the published-but-not-adopted
   gap.
5. The governed record — front page, Realization, and Evidence — states the
   adopted reality rather than the pre-adoption one.

## Scope

1. Perform the live producer adoption through the ordinary public Adopt
   operation against the published recommendation and archive, supplying the
   completed semantic review the operation requires and never inventing it.
2. Declare the accepted NKF 0.8 host chain in `package.json` before adopting,
   because the adopter records the chain a project declares and never invents
   one.
3. Restamp the adopted-version guidance and reconcile every derived surface.
4. Record the adoption as Evidence with the verified pin, receipt, and gate
   result as separate facts.
5. Reconcile the front page and the current-system Realization.
6. Deliver one stacked pull request based on `task/NKF-033`.

## Out Of Scope

- Changing NKF 0.8 accepted meaning, contracts, or published bytes. This Task
  adopts a released version; it does not revise one.
- Merging either pull request, or changing repository or release visibility.
- The public-documentation projection's hand-authored prose, which the NKF 0.8
  guidance review recorded as outside the generator for a successor.

## Acceptance Criteria

1. The bundle declares NKF 0.8 and the installed pin names the exact published
   archive digest, verified from bytes.
2. Adopt reports `updated` on the transition and `current` on repeat, with the
   host-superset integration preserved.
3. The complete gate passes under the accepted NKF 0.8 chain, with all three
   new guidance verifiers running and green on the live repository.
4. `verify-recommended-release` passes.
5. Every emitted guidance member matches its derivation at the adopted version,
   proven by the generation check.
6. No published NKF 0.1 through 0.8 byte and no accepted immutable record
   changes.
7. The governed record states the adopted reality, with the pre-adoption
   statements corrected rather than left standing.

## Current Progress

Created on `2026-08-19` under the Human Direction above, on the `task/NKF-035`
branch based on `task/NKF-033` at the publication commit. The adoption is
performed and the record is reconciled.

## Completion Result

This producer repository is adopted to published NKF 0.8. It declares NKF 0.8,
pins the exact published archive
`2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5`, reports
`current` on repeat public Adopt, and passes the complete gate under the
accepted NKF 0.8 chain at two hundred sixty-eight of two hundred sixty-eight
tests. `verify-recommended-release` passes, closing the published-but-not-adopted
gap the release deliberately opened.

The promotion created the native NKF 0.8 Specification record from the candidate
Evidence representation on the digest-bound delta claim alone: three hundred
thirty-one judgments carried by digest identity, two performed.

The three guidance verifiers this release exists to enable now run here. The
generation check is live and proved it by failing until the two adopted-version
protocol roots were restamped. The other two skip members frozen by publication
and report nothing on NKF 0.8; they protect the next version at its cut. That
limit was recorded in advance by
[`adr-0135`](../../decisions/0135-confirm-the-nkf-0-8-release-candidate.md) and
is now demonstrated rather than predicted.

Two undocumented ordering constraints were found by performing the adoption
rather than reasoning about it, and both are recorded in the
[producer adoption Evidence](../../evidence/release/nkf-035-nkf-0-8-producer-adoption.md):
the accepted host chain must be declared before the promotion, because no
ordinary Adopt route will change an integration that no longer matches its pin;
and the adopted-version guidance must be restamped after adoption.

Merging remains the Human Product Owner's separately authorized act, as does any
change of repository or release visibility.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, and deliberate migration; this adoption is the deliberate migration of one consumer, which happens to be the producer. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority stay separate axes; adopting a version proves operational application and conformance only, and accepts no meaning. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | An enforcement-surface change requires a successor Realization; activating the three NKF 0.8 guidance verifiers on this repository changes its enforcement surface. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Adoption is separate from release, is its own deliberate procedure, and runs through the one public Adopt operation rather than a hand migration. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication freezes the released bytes permanently, and the producer's own adoption is proven rather than asserted. |
| [`adr-0134`](../../decisions/0134-accept-the-nkf-0-8-authority-set.md) | record | The accepted NKF 0.8 authority set is what this repository adopts; adoption changes none of it. |
| [`adr-0135`](../../decisions/0135-confirm-the-nkf-0-8-release-candidate.md) | record | The confirmed and published NKF 0.8 bytes stay exactly as confirmed; any change to them invalidates the confirmation and this adoption with it. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| The producer declares NKF 0.8 and pins the exact published archive digest | proven | data-validity | none |
| Adopt reports `updated` on transition and `current` on repeat with the host-superset integration preserved | proven | runtime-behaviour | none |
| The three NKF 0.8 guidance verifiers run and pass in this repository's own gate | proven | runtime-behaviour | none |
| The recommendation and the installed pin agree, so `verify-recommended-release` passes | proven | data-validity | none |
| Every emitted guidance member matches its derivation at the adopted version | proven | runtime-behaviour | none |
| No published NKF 0.1 through 0.8 byte and no accepted immutable record changes | proven | data-validity | none |

The third entry needs its scope stated, because "run and pass" is weaker than it
sounds. All three verifiers execute in the gate. Only the generation check
examines anything on a published version: it regenerates every emitted guidance
member and compares bytes, and it failed the gate during this adoption until the
two adopted-version protocol roots were restamped. The version-label and
guidance-review checks skip members frozen by publication, so on NKF 0.8 they
report zero checked. They are cut-time controls for the successor. The
capability is `proven` for activation and for the generation check, and claims
nothing beyond that.
