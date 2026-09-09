---
title: "NKF-038: Release NKF 0.81 For Public Adoption And Reconcile The Record"
summary: Release NKF 0.81 as the successor that makes adoption from the now-public repository truthful and self-contained — a recommendation catalog whose channel vocabulary lives in the accepted contract with a public value, an adopter that fetches the catalog and archive over plain HTTPS with no gh dependency and tells a consumer where to obtain itself, a regenerated public-documentation projection that no longer calls the release private, and an onboarding snapshot that no longer fails on volatile operating-system metadata — and, under the same release, repair every stale document the whole-repository sweep of 2026-09-08 found, recording that the coordinate 0.81 is what ADR 0136 called the NKF 0.9 successor.
created_at: 2026-09-08T13:51:52Z
---

# NKF-038: Release NKF 0.81 For Public Adoption And Reconcile The Record

## Human Direction

On `2026-09-08`, after the repository became public under
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md) and
the protected merge gate was delivered under
[NKF-012](NKF-012-activate-protected-merge-gate.md), the Human Product Owner
stated they will onboard their first repository "once NKF is completely ready
for public use". The Claude technical reviewer defined readiness as: a
successor version that removes the private-channel catalog literal and the
`gh` dependency from adoption and regenerates the frozen public prose that
calls the release private; the volatile-metadata onboarding drift recorded in
[NKF-018](NKF-018-stabilize-volatile-onboarding-inputs.md) fixed in the same
release; the protected merge gate closed first; and the trademark and
conformance-claim policy as a later Product Task. The Human Product Owner
directed verbatim: "i agree with the proposed order . do it . but do not go
0.9 , go to 0.81".

The Claude technical reviewer then swept the whole repository for stale
documents and reported the findings. The Human Product Owner directed
verbatim: "all these stale docs must fix under 0.81".

Those two directions explicitly create this Task and begin its work. The
confirmed boundaries:

1. The version string is exactly `0.81`, chosen by the Human Product Owner.
   [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md)
   and the records written with it named the remedy "the NKF 0.9 successor";
   that Decision is immutable, and this Task records that the coordinate
   `0.81` is that successor. Every living document that names 0.9 as the
   remedy is corrected under this Task.
2. Full accepted release order, no shortcuts: adopt the direction, accept the
   authority set only after an independent audit, build and prove the set,
   guidance review across the complete set, candidate archive and isolated
   exercise, fresh independent release audit, the mandatory audit-bound
   confirmation Decision, and then publication, recommendation, live
   promotion, and every merge remain the Human Product Owner's separately
   authorized acts.
3. Every stale document the sweep found is repaired under this Task, at the
   level its lifecycle allows: living records are revised, immutable records
   are never edited and are reclassified or succeeded through governed
   revisions, and legacy-locked Tasks are rewritten natively.
4. This Task's lifecycle is carried on the `task/NKF-038` branch, stacked on
   `task/NKF-012` until that pull request merges, and one pull request
   delivers it.
5. The Human Product Owner owns every Product boundary; the Claude technical
   reviewer works under the delegation recorded here for design, derivation,
   implementation, fixtures, tests, guidance review, audits, Evidence, and
   reconciliation within the confirmed boundaries. Each consequential format
   boundary is confirmed by the Human Product Owner at the Design before the
   authority set is authored.

## Problem

NKF 0.8 is published, recommended, and producer-adopted, and the repository
is public, but an outsider still cannot adopt from the public record alone.

- The released adopter fetches the recommendation catalog with `gh api` and
  the archive with `gh release download`, so adoption requires an installed
  and authenticated Github CLI even though the repository and its release
  assets are now readable anonymously by plain HTTPS.
- The adopter validates the catalog against closed literals — channel
  `internal-private-github-prerelease`, release visibility `private` — that
  live only in adopter code. The repository is public, so the catalog now
  states a falsehood it cannot correct without breaking every released
  adopter. The gap is recorded in
  [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md)
  and the
  [public repository observation](../../evidence/release/nkf-037-public-repository-observation.md).
- The frozen NKF 0.8 public-documentation projection tells readers the checker
  release is private and available only to authorized projects, and directs
  them to an authenticated `gh` session.
- The distributed adoption protocol never says where a consumer obtains the
  adopter file; only the public documentation guide does.
- Onboarding on macOS fails whenever Finder rewrites `.DS_Store` between
  inspection and adoption, because the sealed snapshot binds every filesystem
  entry. [NKF-018](NKF-018-stabilize-volatile-onboarding-inputs.md) records the
  reproduction and the design questions and has been deferred since
  `2026-08-01`.

Separately, the whole-repository sweep of `2026-09-08` found the record stale
beneath its reconciled surface. The consolidated
[current-system Realization](../../realizations/current-system.md) still
carries a 0.7 layer: twenty-three present-tense claims of a superseded state,
twelve internal contradictions, and eight dead contract paths, concentrated in
its durable-mapping rows, its Interfaces section, and its Compatibility
section. The ten supporting Realizations under `realizations/items/` are all
immutable, all legacy-locked, and all stale, with forty-seven superseded
current-state claims and twenty-four dead paths, while the Realizations map
still lists them as "Current System". The specifications map still names 0.7
as the current authority twelve lines above naming 0.8. The Evidence map's
inventory stops at [NKF-030](NKF-030-repair-the-merged-master-gate-and-stale-navigation.md). Seven of nine deferred Tasks carry the empty
retrospective gate while their own prose names governing Decisions, and thirty
links across them point at `tasks/completed/` and `tasks/deferred/`
directories that no longer exist.

## Desired Outcome

1. NKF 0.81 is accepted, technically confirmed, and ready for the Human
   Product Owner's separately authorized publication, recommendation, and
   producer promotion, with live support exactly 0.81 plus 0.8.
2. A consumer with Node.js and network access adopts from the public
   repository with no Github CLI, no login, and no collaborator access, and
   learns from the distributed adoption protocol where to obtain the adopter.
3. The recommendation catalog states its channel and visibility truthfully
   under a closed vocabulary that the accepted contract owns.
4. The public-documentation projection describes a public release.
5. Onboarding tolerates recognized volatile operating-system metadata without
   weakening drift protection for meaningful or unresolved entries.
6. No document in the repository states a superseded state as current, no
   living document points at a path that does not exist, and every remaining
   historical statement is framed as history.

## Fixed Product Boundaries

- Accepted records and published bytes are immutable. Every correction enters
  through this governed successor version with explicit provenance and
  compatibility; nothing frozen is repaired in place.
- The executable companion never silently overrides the normative Markdown.
- Deterministic adoption is earned per version: the 0.8-to-0.81 route fails
  closed when its preconditions are unproven.
- Excluding volatile metadata from the drift digest never narrows the
  participating agent's complete repository review, never trusts `.gitignore`
  as authority, never accepts an unrestricted user-supplied ignore list, and
  never lets the adopter delete a project-owned file.
- The support-window slide keeps compatibility signaling truthful: a 0.71
  repository receives an explicit stepping-stone signal naming the published
  0.8 archive.

## Scope

1. Design: propose the 0.81 direction with its alternatives and trade-offs,
   and stop for the Human Product Owner's confirmation of each format
   boundary: the coordinate and window, the catalog vocabulary entering the
   contract, the adopter's fetch path, the adopter-obtaining step, the
   projection regeneration, and the volatile-metadata boundary.
2. Authority set: the successor Specification, its executable companion, the
   0.81 evaluation policy, and the per-rule 0.8-to-0.81 version delta, seeded
   by the deterministic registry diff and accepted only after an independent
   audit.
3. Adopter and checker: the delta-review closure computed with the evaluation
   policy's impact propagation in the seal and recomputed by the checker;
   plain-HTTPS catalog and archive fetch with digest verification and no `gh`
   dependency; the recommended-release catalog shape
   and its channel vocabulary validated from the accepted contract with a
   public value; dispatch of exactly 0.81 and 0.8; the 0.8-to-0.81 upgrade
   route; stepping-stone refusal naming the published 0.8 archive; and the
   volatile-metadata boundary in inspection, seal, preflight, and receipt.
4. Guidance: the adopter-obtaining step in the adoption protocol and every
   other guidance member regenerated from the version-neutral source at 0.81.
5. Public-documentation projection regenerated to describe a public release
   and the 0.81 format, with the projection tooling brought current.
6. Record reconciliation, every item from the sweep: the current-system
   Realization's remaining 0.7 layer; retirement of the ten immutable
   supporting Realizations to Git history with their declarations, each named
   in the adopting Decision with its last confirmed digest; the specifications
   and Evidence maps; the
   native rewrite of the eight legacy-locked deferred Tasks with real gates,
   resolving links, and stale premises restated as history; the active
   Task Scope Gate Design's dead links; and every living mention of 0.9 as
   the remedy replaced by 0.81 with the reallocation stated.
7. Fixtures, tests, guidance review across the complete set, release
   membership, one exact candidate archive from a clean release commit,
   candidate adoption into an isolated real-producer copy, the acceptance
   test that the 0.8-to-0.81 producer upgrade is proven on the digest-bound
   delta claim alone, a fresh independent release audit, and the mandatory
   audit-bound confirmation Decision.
8. Conclude this Task truthfully, mark the pull request ready, and leave the
   Human Product Owner the publication, recommendation, promotion, and merge.

## Out Of Scope

- Publication, recommendation, live producer promotion, and merging, which
  remain the Human Product Owner's separately authorized acts.
- Changing any NKF 0.8 or earlier published byte or accepted immutable
  record. Immutable supporting Realizations are reclassified, not edited.
- Trademark and conformance-claim policy, the brownfield onboarding of
  [NKF-014](NKF-014-expand-brownfield-and-advanced-onboarding.md), acceptance
  binding under [NKF-016](NKF-016-deliver-acceptance-binding-verification.md),
  the qualification mechanism of
  [NKF-034](NKF-034-qualify-accepted-records-with-later-findings.md), and
  every other deferred Task's substance. Their Task documents are rewritten
  natively here; their work is not performed.
- Onboarding any consumer repository.
- Lifting the branch lock or changing any protection setting.

## Acceptance Criteria

1. The Human Product Owner has confirmed each format boundary at the Design
   before the authority set was authored, and each confirmation is recorded
   verbatim.
2. The 0.81 authority set is accepted by a Decision after an independent
   audit, and the exact release candidate is technically confirmed by a
   Decision bound to a fresh independent release audit.
3. From a clean environment with Node.js and network access, no `gh` binary,
   and no Github credentials, the public Adopt operation resolves the
   recommendation and installs the 0.81 release into an unadopted or 0.8
   repository, verified by digest.
4. The catalog's channel and visibility values are validated from the
   accepted contract's closed vocabulary, and the catalog states a public
   channel truthfully after promotion.
5. The distributed adoption protocol states where a consumer obtains the
   adopter, and no member of the 0.81 set states that the release is private
   or requires an authenticated session.
6. The `.DS_Store` reproduction from
   [NKF-018](NKF-018-stabilize-volatile-onboarding-inputs.md) no longer fails
   onboarding, a meaningful-file change between seal and adoption still fails
   closed, and the volatile entries remain visible in inspection Evidence.
7. Every finding of the `2026-09-08` sweep is repaired or reclassified, and a
   repeat sweep of the living surfaces finds no superseded state stated as
   current and no dead path.
8. The 0.8-to-0.81 producer upgrade in the isolated exercise is proven on the
   digest-bound delta claim alone.
9. No 0.8 or earlier published byte, accepted immutable record, or 0.8 catalog
   literal changes before promotion; the complete gate passes at every
   handoff.

## Execution Plan

### Final Documentation Sweep And Merge Handoff

On `2026-09-09`, the Human Product Owner directed: "commit current work, close
the task and make sur ethe PR is ready to merge", and requested a fresh sweep
of all documentation using a less expensive model. This explicitly authorizes
committing and pushing the repaired work, completing the remaining candidate
verification and confirmation under the recorded technical delegation, and
concluding this Task for merge review. Publication, recommendation, live
producer promotion, and the merge itself remain separate acts.

1. Preserve and commit the validated audit repairs with this handoff plan.
2. Delegate a read-only documentation inventory and stale-content sweep to
   GPT-5.6 Luna, covering living knowledge, neutral guidance, generated 0.81
   guidance, and public documentation. Classify frozen and historical content
   separately and preserve its exact bytes. Review and fix actionable findings
   at their canonical source, then regenerate affected projections.
3. Re-read the complete current guidance set, record exact coverage and reviewed
   digests, build the corrected candidate from a clean commit, and exercise its
   archive against an isolated exact producer copy using delta review.
4. Obtain the independent candidate review, resolve findings, and record a new
   exact-byte technical confirmation after the reviewed candidate is clean.
5. Reconcile the living summaries and this Task's gate and Completion Result,
   run the canonical handoff validation, then conclude the Task through the
   deterministic command. Push the completed branch and verify the PR's final
   head, required CI, mergeability, and ready-for-review state on GitHub.


### Post-Review Documentation Correction

On `2026-09-09`, after the independent PR review identified the stale
Technology root, the Designs map's superseded frontmatter instruction, and
the onboarding protocol's obsolete supporting-current index, the Human
Product Owner directed: "alright, i want all of them fixed." This directs
these three corrections on this unmerged Task branch. The earlier
Completion Result records the prior handoff; this follow-up does not repeat
the Task transition or claim that the other independent review findings are
resolved.

1. Reconcile the living Technology root against the declared and pinned 0.8
   producer state and the accepted 0.81 successor, keeping publication and
   promotion distinct and preserving the root's identity and scope.
2. Correct the Designs map from the accepted native YAML disposition and
   neutral-path rules.
3. Correct the version-neutral onboarding source from the accepted
   Realization topology and regenerate only the unpublished 0.81 release
   emission, bundled adopter, and public projection.
4. Record the corrected guidance revision beside its prior review, and
   distinguish the corrected working tree from the exact older archive
   confirmed by [ADR 0141](../../decisions/0141-confirm-the-nkf-0-81-release-candidate.md).
5. Repin through the deterministic adopter, review and reseal the changed
   documentation baseline, verify the three corrections and frozen 0.8
   bytes, and run `npm run nkf:check` before handoff. Leave the corrected
   release members subject to a new candidate cut, exercise, independent
   audit, and confirmation; no publication or promotion is performed here.

### Independent Audit Repair

On `2026-09-09`, the Human Product Owner further delegated the P1 audit and
execution to the Codex technical reviewer: "i need you to audit the P1 yourself
and execute at will". This authorizes the reviewer to resolve the proposed
predecessor-binding boundary, audit and implement the repair, and record the
result without another confirmation request. It is prospective delegation for
this P1 successor revision, not retroactive acceptance of the earlier set or
authorization to publish, promote, or merge. The reviewer selects a digest-bound
historical predecessor file, complete chain verification to a whole-root or
published 0.8 anchor, exact closure equality, and independently checked carry.
The earlier deferral is resolved for this work; the Task returns to active.

The execution adds the predecessor binding to the unpublished 0.81 successor
authority, preserves the exact prior authority set as historical Evidence,
derives schemas and bindings, implements checker and seal transaction support,
and exercises both valid chains and adversarial real sealed successors. The
reviewer audits the successor against the prior authority and records a later
Decision under this explicit delegation. Published 0.8 bytes remain frozen.

On `2026-09-09`, after clarification that the checker delta-closure defect,
acceptance-provenance contradiction, and unsupported HTTPS-test claim remained
open, the Human Product Owner directed: "go on fix those too".

This reopens the previously concluded delivery for the named repairs. Its
current gate must report the unresolved authority and predecessor-proof
requirements as unknown, not preserve the old completion claim. The Task was
deferred pending the concrete predecessor-binding direction and the necessary
authority reconciliation; the later explicit delegation above resumes this work. The deterministic declaration and navigation change
is derived in an isolated copy and applied locally; it performs no GitHub
operation or new completion transition.

1. Reproduce the false-readiness defect from a real sealed predecessor and
   successor. Derive the repair from
   [ADR 0139](../../decisions/0139-adopt-the-delta-closure-propagation-repair.md):
   independently verify predecessor material, compare exact computed closure,
   and refuse missing or unprovable predecessor evidence. Preserve published
   0.8 behavior. If a new serialized contract boundary is required, prepare
   its concrete successor proposal for the Human Product Owner before
   changing accepted authority bytes.
2. Reconcile authority provenance without rewriting immutable
   [ADR 0140](../../decisions/0140-accept-the-nkf-0-81-authority-set.md) or
   inventing prior human acceptance. Prepare the exact prospective human
   acceptance or clarification required by the existing Design and release
   protocol, recording any outstanding authority act explicitly.
3. Correct the Task's local-server claim and the mocked test's name, then
   exercise native Node fetch with a controlled HTTPS redirect and digest
   refusal. State the demonstrated level and distinguish the controlled
   exercise from live public adoption.
4. Add regressions for removing the initiating node, removing a reached node,
   carrying a required review, missing or corrupt predecessor proof, and
   closure equality; verify valid whole-root and supported delta flows.
5. Update the current Realization and review Evidence, regenerate affected
   distribution, mechanically repin and reseal, and run focused tests plus
   `npm run nkf:check`. Record release and authority blockers truthfully;
   perform no publication, promotion, merge, or inferred human acceptance.

### Original Delivery Plan

The follow-up audit repair plan below extends the original delivery work; it
does not extend the prior candidate's confirmation.

1. Open this Task, declare it, regenerate the state index, repin, commit.
2. Author the Design, declare it Active, repin, commit, and stop for the
   Human Product Owner's boundary confirmations.
3. Author the adoption Decision from the confirmed direction, allocate `0.81`,
   and record the Design as adopted.
4. Author the candidate authority set, obtain the independent audit, repair
   findings, and author the acceptance Decision.
5. Implement adopter, checker, contract, guidance, projection, fixtures, and
   tests; register `0.81` at every version surface; prove the set.
6. Perform the record reconciliation in scope item six.
7. Guidance review across the complete set, candidate archive, isolated
   exercise, independent release audit, repairs, confirmation Decision.
8. Completion Result, reseal, gate, deterministic close.

## Created-State Rule

This Task's creation and active declaration record human direction, scope,
plan, constraints, and evidence only. They accept no 0.81 authority set, adopt
no Design, confirm no Realization, establish no conformance, and publish no
release. The same recorded direction that created this Task explicitly began
its work. Later records supersede only the created-state facts they explicitly
replace.

## Current Progress

Created on `2026-09-08` under the Human Direction above, on the `task/NKF-038`
branch stacked on `task/NKF-012`. The Design is authored, and on `2026-09-08`
the Human Product Owner confirmed each of its boundaries verbatim, as recorded
in the Design: `0.81` as a full successor with 0.71 dropping to stepping-stone
history; two public channel values with 0.81 published as a prerelease; plain
HTTPS with no Github CLI and no fallback; the adopter-obtaining step; the fixed
three-name volatile registry; the ten supporting Realizations retired to Git
history rather than relabelled; and, after a further defect was found while
answering — the delta review closure omits the impact propagation the accepted
Specification requires, which is how the frozen Realizations escaped
re-review — the repair of that defect, confirmed "7 - yes . go on".
[ADR 0138](../../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md)
and
[ADR 0139](../../decisions/0139-adopt-the-delta-closure-propagation-repair.md)
adopt the direction and allocate the coordinate. Every mandatory capability
reads `unknown` until the work is performed.

On `2026-09-08` and `2026-09-09` the candidate authority set was derived,
audited three times, repaired, and accepted by
[ADR 0140](../../decisions/0140-accept-the-nkf-0-81-authority-set.md); the
implementation was then derived from it. Three facts about that derivation
belong in this record rather than only in code:

- The release set is derived at cut time and is outside the accepted set. Its
  first copy carried the 0.8 fixture selectors, so the regenerated membership
  shipped the predecessor fixtures as the 0.81 set's own until the guidance
  review's enumeration caught it; the selectors now name the `*-0-81`
  fixtures and the membership is one hundred forty-two members.
- The guidance generator's check mode skips the release members of a version
  frozen by publication and says how many it skipped, because the source
  evolves for the successor and re-deriving a frozen tree from a later source
  checks the wrong thing. The frozen 0.8 tree therefore is not continuously
  re-derived; its bytes were proven at its cut and are bound by its manifest.
- The checker's closure recompute reconstructs the predecessor view from what
  the sealed baseline proves — carried judgments as unchanged nodes, performed
  judgments inside the recorded closure as seeds, performed judgments outside
  it as voluntary expansion — because the predecessor baseline is not a
  checker input under the closed governed-input set. A seal that omitted a
  changed node from both its closure and its performed set is therefore
  indistinguishable from an unchanged node without predecessor bytes; that
  remains the seal's obligation, and a seal under 0.81 computes the same
  propagated closure; this producer's own seals stay under the 0.8 policy until
  it adopts 0.81.

The adopter and seal implementation was completed by an agent instance whose
session ended before it could report; its work was verified here by rebuild,
typecheck, and the complete test suite, and two defects it left were repaired:
the generated catalog Schema failed Ajv strict mode for lack of `type: object`
on its channel clauses, and the third-party notices digest bound in the release
tooling still named the 0.8 bytes.

The first candidate was cut from commit `c7d10aa` after the guidance review
and the isolated exercise passed, and its first independent
[release audit](../../evidence/release/nkf-038-nkf-0-81-release-audit.md)
found the delivery not clean: the cut commit had changed one release-tooling
line without repinning its declaration, so the complete gate failed at the
release commit even though the packaging's own check passed, and the projection
README carried the window sentence the hand slide had corrupted in the two
guides. Both were repaired with the seven should-fix findings, among them a
version-gated region in the guidance generator so the distributed protocols can
state the 0.81 recompute condition without the adopted 0.8 root becoming false.
The candidate is re-cut, re-exercised, and re-audited from the repaired commit.

The second candidate, cut from `a7aa6d8`, was audited by three divided
instances after one instance stalled twice on long-running commands: no
blocking finding, seven should-fix findings — the adopter sealed a review left
at the template's sentinels, catalog facts about the archive were validated for
shape only, the onboarding drift refusal named no entry, the Realization stated
a reseal that had not happened, the publication manifest labelled every release
internal, the guides omitted the release-asset redirect host, and the
Realization listed a path that did not exist — all repaired, together with a
version-neutral guidance-generation check for the 0.81 chain. The third
candidate, cut from `14bcb44`, was audited by two instances: no blocking
finding, five should-fix findings — blank review values escaping the placeholder
refusal, the Realization's summary and test count stated ahead of the tree, the
guidance review describing superseded guide prose, and the onboarding guide's
overbroad staleness sentence — repaired here; the catalog channel a pin cannot
corroborate is recorded for the successor. Each cut passed the complete gate at
its commit and its isolated exercise before its audit.

The fourth candidate, cut from `a211c47`, was found clean by its independent
round — zero blocking, zero should-fix, six notes with dispositions. The commit
recording that round, `aeb95db5`, changes no release-set member byte and is
the release commit; the archive cut from it,
`e36ef44b53c88cfd0cd22093eca9507416eb54d575289a96e30d81227d5c88ea`, is technically
confirmed by
[ADR 0141](../../decisions/0141-confirm-the-nkf-0-81-release-candidate.md).
The Realization, the front page, and the Specifications map state the confirmed
state; this producer still declares, pins, and installs NKF 0.8, and the
publication, recommendation, promotion, and merge are the Human Product Owner's
acts. The closing delta review of this Task reseals the producer baseline under
the 0.8 policy.

## Completion Result

### Original Candidate Handoff

The following result records the prior exact candidate. The subsequent
documentation correction described below is outside its technical confirmation.

NKF 0.81 is accepted, implemented, and technically confirmed, and the record is
reconciled; publication, recommendation, promotion, and merge are left to the
Human Product Owner as this Task's Human Direction requires.

1. Each of the seven format boundaries was confirmed verbatim by the Human
   Product Owner at the Design on `2026-09-08` before the authority set was
   authored; the Design records the answers.
2. The five-artifact authority set is accepted by
   [ADR 0140](../../decisions/0140-accept-the-nkf-0-81-authority-set.md) after
   a three-round independent audit, and the exact candidate — archive
   `e36ef44b53c88cfd0cd22093eca9507416eb54d575289a96e30d81227d5c88ea` at release
   commit `aeb95db5` — is technically confirmed by
   [ADR 0141](../../decisions/0141-confirm-the-nkf-0-81-release-candidate.md)
   bound to the four-round
   [release audit](../../evidence/release/nkf-038-nkf-0-81-release-audit.md).
3. The shipped 0.81 adopter resolves the catalog from the public repository's
   raw default-branch URL and the archive from the canonical release asset URL
   with Node's fetch alone, refusing a digest or locator mismatch before
   mutation; the original adopter suite used a substituted fetch transport
   returning local file bytes, proving URL selection, response handling,
   digest refusal, and installation, without exercising a server, TLS, or
   native fetch. Every original audit round proved the offline path installs 0.81 into a 0.8 and
   an unadopted repository with no Github CLI on the adoption path. Adoption
   from the live public release awaits the publication this Task leaves to
   the Human Product Owner.
4. The catalog is validated against the accepted `nkf.recommended-release`
   contract's closed vocabulary; the 0.81 exercise catalog states
   `public-github-prerelease` with visibility `public`, the historical channel
   is refused on a 0.81 catalog, and the stated facts are reconciled with the
   archive. The published catalog states the public channel truthfully at the
   promotion, which is the Human Product Owner's act.
5. The distributed adoption protocol opens with the adopter-obtaining step, and
   the whole-set guidance review found no 0.81 member calling the release
   private or requiring a session; the two that did were corrected at the
   source and the projection.
6. The volatile registry lets a rewritten, added, or deleted `.DS_Store`,
   `Thumbs.db`, or `desktop.ini` regular file pass sealing and onboarding while
   a changed regular file, a directory or symbolic link with a registered name,
   and a near-miss name each stale the plan; inspection lists the volatile
   entries with their classification.
7. Every finding of the `2026-09-08` sweep is repaired under this Task — the
   current-system Realization rewritten current-first, the ten frozen
   Realizations retired to Git history, the maps brought current, the eight
   legacy-locked Tasks and the two Designs rewritten natively, every 0.9 remedy
   restated as 0.81 with the reallocation — and four audit rounds read the
   living surfaces for a superseded state stated as current or a dead path,
   repairing the sentences they found.
8. The isolated exercise proved the 0.8-to-0.81 promotion on the delta claim
   alone at every cut: three hundred twelve judgments carried by digest
   identity and thirty-four fresh judgments equal to the propagated closure,
   `updated` then `current` at integration revision five.
9. No published 0.8 or earlier byte, accepted immutable record, or 0.8 catalog
   literal changed; four audit rounds compared the published 0.8 archive to
   the tree. The complete gate passes at this handoff and passed at every cut
   except the first, whose unrepinned declaration the first audit round found
   before any handoff and the repaired cut corrected.

Recorded for the successor rather than resolved: the catalog channel a pin
cannot corroborate, the six projection members still outside the generator,
the release protocol's precondition wording that predates delegated
acceptance, and the `inspect` workspace left behind by one refused argument.

### Post-Review Documentation Correction Result

On `2026-09-09`, the Human Product Owner requested all three documentation
consistency findings be fixed. The living Technology root now distinguishes
published, recommended, and producer-adopted 0.8 from accepted successor 0.81,
with 0.71 as the current predecessor. The Design index now describes native
YAML disposition and neutral source paths with generated projections. The
neutral onboarding protocol now describes one Realization index covering the
current-system record and represented supporting items; the unpublished 0.81
protocol, bundled adopter, and public projection were regenerated.

The root README, Specification index, and current-system Realization now
distinguish the prior confirmed archive from this corrected delivery. The
[guidance review](../../evidence/release/nkf-038-nkf-0-81-guidance-review.md)
preserves the prior reviewed digest and appends the focused correction and
its new digest. A new candidate cut, exercise, independent audit, and technical
confirmation remain required before publication. This correction does not
resolve the separate checker-closure or acceptance-provenance audit findings.

The installed 0.8 repin operation does not reconcile changed governed artifact
digests. The 0.81 repin operation therefore generates and validates the derived
declarations in an isolated copy using an explicit checker; only those
declarations return to the producer, whose release pin remains 0.8. The delta
review and baseline seal use that declared 0.8 policy. Validation and local Git
state are reported separately at the authoring handoff; no publication,
recommendation, producer promotion, new acceptance, or technical confirmation
is supplied by these corrections.

### HTTPS Verification Correction

The original local-server assertion above was incorrect and is corrected to
describe the mocked transport that actually ran. On `2026-09-09`, the Codex
technical reviewer added and ran a separate controlled integration test in
`test/adopter.test.ts`. It leaves `globalThis.fetch` unchanged, routes only
the three test hosts' TLS sockets to a temporary loopback server, and trusts
the generated local certificate only in the adopter child process. It proves
native Node fetch, verified TLS, a cross-host HTTPS asset redirect, exact
archive installation, refusal of an untrusted certificate, and refusal of
tampered archive bytes before project mutation. The test explicitly does not
prove public DNS routing, GitHub availability, or adoption of a published
0.81 release. The old mock remains separately named as a mocked transport
test. The controlled test passed; the first sandboxed attempt was refused
at the local listening socket, before the test could exercise HTTPS.

### Delegated P1 Repair Result

The Codex technical reviewer reproduced the original false-ready delta from
actual source revisions and repaired it under the explicit P1 delegation.
[ADR 0142](../../decisions/0142-accept-the-bound-predecessor-repair.md) selects
the predecessor-proof semantics; [ADR 0143](../../decisions/0143-bind-the-predecessor-repair-promotion.md)
selects the final navigation and promotion bindings after the producer test
exposed their omissions. Earlier authority bytes and Decisions remain exact
historical evidence. This is prospective delegated acceptance of the repaired
set, with no retroactive acceptance or independent second-person audit claim.

The checker observes exact predecessor files, validates the reachable chain,
recomputes the mandatory closure from those inputs, and verifies carried
judgments and mechanical transitions. The sealer retains history, verifies
its successor proof, rolls back a rejected seal, and supports whole-root
recovery after history loss. The source-derived regression verifies the valid
seal, the original erased-closure exploit, forged or partial carry, malformed
closure sets, altered or missing history, symlink refusal, invalid earlier
chain links, rollback, and recovery. Separate tests retain valid voluntary
extra review and chained deterministic Task conclusions.

P1 implementation and its self-audit are complete at the local authoring
handoff. The Task remains active because a newly cut release candidate still
needs its own exact exercise, release audit, and confirmation. The published
0.8 release, producer declaration and pin, catalog recommendation, and remote
publication or enforcement state are unchanged by this repair.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, Human Product Owner confirmation, authoritative specification updates, derived implementation and fixture changes, a versioned release, and deliberate consumer migration; this Task is that full sequence for 0.81. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority stay separate axes; nothing here accepts by implication, and the reconciled Realization is confirmed only by a Decision that binds it. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | Enforcement is layered and a change to the enforcement surface requires a successor Realization and confirmation; the adopter's fetch path and catalog validation are enforcement surface. |
| [`adr-0064`](../../decisions/0064-release-documentation-and-adoption.md) | record | The digest-addressed release channel, the allowlisted public projection, and the self-contained adopter stand; the projection continues and is regenerated here, and the adopter stays public-safe and digest-verifying. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | After first consumer adoption, every contract-meaning change ships as a new immutable NKF version; the catalog vocabulary entering the contract and the adopter's fetch change ship as 0.81, never as edits to 0.8. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption are separate governed protocols in the versioned set; this Task follows the release protocol's nine steps in order and adopts nothing. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | The pre-cut guidance review re-reads every member of the versioned set, not the rule diff, with the enumerated list and digests recorded; the independent audit verifies that coverage. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | One public subcommand-free Adopt operation with predecessor-relative compatibility signals; the plain-HTTPS fetch and the adopter-obtaining step change how Adopt reaches its inputs, not the operation's shape. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication freezes released bytes permanently and the producer's own adoption is proven, not asserted; the 0.8 catalog literal stays until promotion, and the 0.8-to-0.81 producer upgrade is proven in the isolated exercise. |
| [`adr-0134`](../../decisions/0134-accept-the-nkf-0-8-authority-set.md) | record | The accepted 0.8 authority set is the exact predecessor the 0.81 version delta is computed against; it changes in nothing. |
| [`adr-0135`](../../decisions/0135-confirm-the-nkf-0-8-release-candidate.md) | record | The confirmed 0.8 bytes stay exactly as confirmed; the six limits the fifth audit declined to vouch for are inputs to the 0.81 guidance review, not repaired by implication. |
| [`adr-0136`](../../decisions/0136-adopt-the-public-repository-direction.md) | record | The repository is public and the catalog keeps its private-channel literals until a successor states a public channel truthfully; that Decision named the successor "NKF 0.9", and this Task records `0.81` as that successor without editing the Decision. |
| [`adr-0137`](../../decisions/0137-confirm-the-protected-merge-gate.md) | record | The protected merge gate account is confirmed at an exact Realization revision; the further Realization revision this Task performs is confirmed or not by its own Decision, and this Task must not represent the earlier confirmation as covering it. |
| [`adr-0138`](../../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md) | record | Reconcile living documents under the adopted 0.81 direction while preserving immutable history, published bytes, the producer's separately selected version, and the Human Product Owner's publication and promotion authority. |
| [`adr-0140`](../../decisions/0140-accept-the-nkf-0-81-authority-set.md) | record | The first five-artifact revision remains immutable history; the later delegated P1 repair selects the second revision without retroactive acceptance. |
| [`adr-0141`](../../decisions/0141-confirm-the-nkf-0-81-release-candidate.md) | record | Confirmation covers only the exact prior candidate bytes. Correcting an emitted release member requires a new cut, exercise, audit, and confirmation before publication; the old confirmation must not be applied to the corrected working tree. |

| [`adr-0142`](../../decisions/0142-accept-the-bound-predecessor-repair.md) | record | Prospective P1 delegation accepts the exact second unpublished authority revision and requires bound predecessor proof, preserved history, and a fresh candidate exercise and confirmation. |

| [`adr-0143`](../../decisions/0143-bind-the-predecessor-repair-promotion.md) | record | Final navigation and promotion bindings replace only [ADR 0142](../../decisions/0142-accept-the-bound-predecessor-repair.md)'s exact artifact selection; its P1 semantics and boundaries continue. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Each format boundary is confirmed by the Human Product Owner at the Design and recorded verbatim before the authority set is authored | proven | human-experience | none |
| Explicit P1 delegation and exact repaired authority selection are recorded in the successor Decisions | proven | human-experience | none |
| The corrected exact release candidate has a fresh audit-bound confirmation | unknown | none | none |
| Controlled native HTTPS adoption resolves the recommendation, follows an asset redirect, and installs exact 0.81 bytes with no `gh` binary or credentials; untrusted TLS and tampered bytes are refused. Live public 0.81 adoption remains a separate post-publication exercise | proven | runtime-behaviour | none |
| The catalog's channel and visibility are validated from the accepted contract's closed vocabulary with a public value | proven | runtime-behaviour | none |
| The distributed adoption protocol states where to obtain the adopter and no 0.81 member calls the release private | proven | runtime-behaviour | none |
| The `.DS_Store` reproduction passes onboarding while a meaningful-file change between seal and adoption still fails closed | proven | runtime-behaviour | none |
| Every sweep finding is repaired or reclassified and a repeat sweep of living surfaces is clean | proven | runtime-behaviour | none |
| The corrected 0.8-to-0.81 producer upgrade is proven on an independently verified digest-bound delta claim in an isolated exercise | unknown | none | none |
| No 0.8 or earlier published byte, accepted immutable record, or 0.8 catalog literal changes before promotion, and the gate passes at every handoff | proven | runtime-behaviour | none |
