---
title: "NKF-027: Correct And Release NKF 0.6 With Open-Source Licensing"
summary: Correct the published NKF 0.5 authoring defect, strengthen prepublication producer proof, prepare the complete NKF repository for standard Apache-2.0 licensing, and deliver one independently audited NKF 0.6 successor without changing repository visibility by implication.
created_at: 2026-08-13T18:48:20Z
---

# NKF-027: Correct And Release NKF 0.6 With Open-Source Licensing

## Human Direction

On `2026-08-13`, after ordinary producer adoption of NKF 0.5 exposed a
published native-record re-pinning defect, the Human Product Owner confirmed
creating and beginning a focused corrective successor Task. The initially
discussed `0.51` coordinate was then replaced by NKF `0.6` when the Human
Product Owner explicitly added complete-repository open-source licensing
preparation to the same owning Task.

The Human Product Owner confirmed that this Task owns both:

1. correction of the NKF 0.5 authoring and release-proof failure, including a
   stronger prepublication producer exercise in which ordinary native
   authoring is proven before publication; and
2. NKF-only preparation for standard, unmodified Apache License 2.0 coverage
   across the complete NKF repository.

This is an explicit confirmed scope expansion made before Task implementation.
It is not an incidental finding silently absorbed into an existing Task.

The existing `task/NKF-025` branch and pull request 9 remain the current sole
integration boundary. The Human Product Owner did not authorize another pull
request and expressly withheld authorization to commit, push, merge, publish a
release, or change Github visibility. Work may be prepared and validated in
the current worktree, but those operational acts remain separately gated.

The Human Product Owner remains authority for the confirmed licensing,
trademark, public-scope, and Product boundaries. The Codex technical reviewer
is delegated to derive exact technical contracts, compatibility,
implementation, inventories, tests, audits, and technical confirmation where
they faithfully implement those boundaries. Any new consequential licensing,
trademark, governance, contribution, security-policy, public-visibility, or
Product meaning returns to the Human Product Owner.

On `2026-08-14` the Human Product Owner separately lifted parts of that
withholding, one act at a time and only after the preceding proof was
delivered. Committing and pushing on the existing branch were authorized;
publishing the exact audited NKF 0.6 candidate as a private prerelease was
authorized; promoting the recommendation and performing ordinary public
producer self-adoption were authorized; converting the consolidated
current-system Realization from `immutable` to `living` was authorized; and
closing this Task, marking pull request 9 ready, and merging it to `master`
were authorized. The withholding of a Github visibility change was never
lifted, no second release is authorized, the published release may not be
deleted or rebound, and no NKF 0.7 work is authorized. The Human Product Owner
also explicitly directed that a separate NKF 0.6 technical-confirmation
Decision and separate audit, publication, and producer-adoption Evidence
documents be dropped as non-minimal, with that omission recorded here instead.

## Problem

The immutable published NKF 0.5 adopter assumes that a native record
declaration places `source.digest` immediately after `source.path`. Native NKF
0.5 correctly inserts `source.stable_path` between them. The released `repin`
command therefore reports success with zero record updates, leaves a changed
record digest stale, and causes the checker to fail. `linkify` and Task
transition mechanics reuse the same record-repin implementation. The first
required post-adoption current-system Realization update exposed the defect;
publication had already frozen the complete 0.5 set, so it cannot be repaired
in place.

The release process did perform exact-candidate adoption, migration,
repeat-current validation, the producer gate, archive reproduction, and
independent audit before publication. It did not exercise the complete normal
post-adoption authoring lifecycle against the adopted native candidate. The
first native record edit and repin therefore occurred only after publication.

Separately, the repository remains without a root open-source license and its
accepted distribution Decisions expressly left licensing and public
governance unresolved. The repository has moved operationally from
`kaveh6202/Nourd.NKF` to `NourdApS/Nourd.NKF`, while historical immutable
records and current executable or documentary references require different
treatment. Applying a license or replacing repository references without
classification would risk altering provenance, misstating current behavior,
or licensing material that Nourd ApS does not own.

## Desired Outcome

Deliver one immutable NKF 0.6 successor that:

- structurally updates native record declarations without relying on YAML
  adjacency or formatting;
- makes every deterministic mutation command verify its required
  postconditions and fail rather than report false success;
- exercises every shipped authoring command across each applicable governed
  subject kind after exact-candidate adoption into an isolated copy of the
  real NKF producer and before publication;
- preserves exact candidate bytes through independent audit, technical
  confirmation, and any separately authorized publication;
- treats postpublication producer adoption as distribution, recommendation,
  installation, and byte-identity proof rather than first functional
  exercise;
- deliberately and non-breakingly updates supported NKF 0.5 repositories when
  final compatibility evidence confirms that classification;
- applies the standard, unmodified Apache License 2.0 and SPDX identifier
  `Apache-2.0` to the complete NKF repository while retaining separately
  identified compatible third-party rights and required notices;
- records the exact approved NOTICE attribution without adding license
  restrictions;
- classifies historical, current-identity, executable, and stale-documentation
  repository references instead of globally replacing them;
- keeps licensing, trademark policy, repository visibility, publication,
  release, acceptance, Realization confirmation, conformance, and Governing
  Use as separate facts; and
- reconciles the consolidated current-system Realization and freshness
  baseline only through supported, proven 0.6 authoring mechanics.

## Confirmed Licensing Boundaries

1. The repository uses the standard, unmodified Apache License 2.0. No custom
   Nourd or NKF open-source license is created.
2. Apache-2.0 applies to the complete NKF repository, including
   Specifications, executable contracts and Schemas, checker and adopter,
   fixtures and tests, documentation, integrations, scripts, and tooling.
3. Clearly identified third-party material remains under its own compatible
   license and carries every required notice.
4. The current repository identity is `NourdApS/Nourd.NKF`. This Task changes
   no other Nourd repository's license or visibility.
5. The root `NOTICE` candidate uses exactly this informational attribution:

   ```text
   Nourd Knowledge Format (NKF)
   Copyright 2026 Nourd ApS

   Developed and maintained by Nourd ApS.
   Official repository: https://github.com/NourdApS/Nourd.NKF
   ```

6. A trademark policy remains separate from Apache-2.0. It may protect the
   Nourd, Nourd ApS, Nourd Knowledge Format, NKF, and associated logo names
   from false endorsement or unofficial-fork confusion, but this Task may not
   draft or accept consequential trademark terms without later Human Product
   Owner confirmation.
7. No Github visibility change, publication, release, merge, commit, or push
   is implied by licensing preparation or by this Task's active state.
8. Historical `kaveh6202/Nourd.NKF` references are preserved when they are
   correct immutable provenance. Every occurrence is classified before any
   current-identity, executable, or stale-documentation correction.

## Scope

- create a successor Design and Decision boundary that strengthens
  prepublication producer proof without mutating the adopted predecessor
  Design or accepted Decisions;
- derive one exact NKF 0.6 authority pair and complete versioned set from the
  accepted 0.5 authority plus the confirmed corrective boundaries;
- replace layout-sensitive record repinning with structural declaration
  mutation and repair every dependent command;
- define and enforce deterministic mutation postconditions, transactional
  rollback, idempotence, and truthful zero-change results;
- maintain a complete command-by-subject capability matrix covering native
  records, Task and other document nodes, governed artifacts, `repin`,
  `linkify`, Task transitions, reference export, set enumeration, migration,
  and the public Adopt operation where applicable;
- define and run the expanded exact-candidate producer rehearsal before any
  release publication;
- classify 0.5-to-0.6 compatibility and implement deliberate adoption and
  migration behavior without changing frozen 0.5 bytes;
- inventory all repository-owned and third-party content, generated outputs,
  vendored or copied material, package dependencies, notices, provenance, and
  copyright claims;
- add the exact standard Apache-2.0 root license text, approved NOTICE,
  required package metadata, and any technically necessary source-level SPDX
  treatment supported by the inventory;
- classify every `kaveh6202/Nourd.NKF` occurrence and update only current
  identity, executable distribution or adoption behavior, and stale mutable
  documentation through the correct governed successor mechanism;
- assess current private-release and authenticated-adoption assumptions,
  Github Actions, release URLs, and executable references affected by the
  organization transfer;
- assess and report the need for separate `TRADEMARKS.md`, `GOVERNANCE.md`,
  `CONTRIBUTING.md`, `SECURITY.md`, and Code of Conduct documents without
  silently drafting their consequential policies;
- update release membership, public documentation, package metadata,
  Realizations, fixtures, tests, audit Evidence, and recommendation behavior
  only where the accepted 0.6 boundary requires them; and
- independently audit the exact authority pair, implementation, licensing
  inventory, candidate archive, prepublication producer exercise, and any
  later separately authorized public adoption.

## Out Of Scope

- modifying any frozen NKF 0.1 through 0.5 release member or immutable
  accepted record;
- implementing any previously deferred Product feature, including the Task
  Scope Gate, authority freshness, acceptance-binding verification, protected
  merge enforcement, advanced onboarding, or additional root profiles;
- changing another Nourd repository's license, visibility, authority, or
  content;
- creating a custom license or adding NOTICE restrictions to Apache-2.0;
- drafting or accepting consequential trademark, governance, contribution,
  security-response, or community-conduct policy without separate Human
  Product Owner confirmation;
- changing Github visibility, publishing a release, merging, committing, or
  pushing without separate authorization;
- globally replacing historically correct repository references;
- claiming that repository licensing proves public visibility, publication,
  acceptance, conformance, confirmed Realization, or Governing Use readiness;
  and
- declaring NKF 1.0 stable.

## AI Execution Plan

1. Verify repository identity, the current 0.5 producer state, the exact
   published defect, current Task ownership, and the no-remote-mutation
   boundary.
2. Inventory repository licensing state, authored and imported content,
   dependency licenses, generated and vendored material, existing copyright
   claims, package metadata, private-release assumptions, authenticated
   adoption, workflows, release URLs, and every old repository-reference
   occurrence.
3. Record a source-grounded licensing and organization-transfer assessment
   that distinguishes verified facts, compatibility concerns, material whose
   licensability is unresolved, and policy documents requiring Human Product
   Owner decisions.
4. Draft one active successor Design covering structural governed mutation,
   required postconditions, the complete prepublication native-authoring
   rehearsal, postpublication proof limits, Apache-2.0 repository coverage,
   third-party notice treatment, and operational-state separation.
5. Obtain or record the applicable accepted successor Decision before deriving
   normative 0.6 meaning; never edit the immutable 0.5 authority or accepted
   predecessor records.
6. Derive one exact prospective NKF 0.6 Markdown and executable authority
   pair, including compatibility, release membership, licensing
   representation, and the strengthened release protocol, but do not accept
   it while any evidence prerequisite declared by the adopted Design remains
   unproven.
7. Before authority acceptance, implement a disposable evidence-only
   0.5-to-0.6 updater against those exact prospective bytes and exercise both
   exact 0.5 fixtures plus an isolated copy of the real 0.5 producer. Prove or
   reject the claimed policy equivalence, source/declaration preservation,
   predecessor-lock preservation, exact reviewed-baseline carry-forward,
   rollback, idempotence, and absence of repository-owner breaking approval.
   Record and independently audit that evidence. If any precondition or
   non-breaking claim fails, revise the prospective authority and restart its
   audit; only an unchanged technically clean candidate with clean required
   evidence may receive a later exact acceptance Decision.
8. After exact authority acceptance, implement structural repinning,
   dependent command corrections, mutation
   postconditions, transaction and rollback safety, complete command-subject
   coverage, 0.5-to-0.6 adoption, and the derived release set.
9. Add the standard Apache-2.0 root license text, exact NOTICE attribution,
   approved SPDX/package metadata, compatible third-party notices, and only
   the source headers justified by the recorded assessment.
10. Correct current repository identity and executable assumptions only after
   classifying each occurrence; preserve immutable historical provenance and
   use successor records where governance requires it.
11. Run focused checks during implementation, then run only
    `npm run nkf:check` for each coherent governed handoff.
12. Build one exact unpublished 0.6 candidate and adopt it into an isolated
    copy of the real producer. Exercise migration, repeat current, native
    record/document/artifact edits and repins, linkification, Task lifecycle,
    impact and whole-root freshness recovery, rollback, tamper rejection, and
    the complete producer gate.
13. Run a fresh independent audit against the exact candidate and publish no
    byte unless the audit is clean and publication is separately authorized.
14. If later authorized, publish only the exact passing bytes, re-download and
    compare them, deliberately promote recommendation, publicly self-adopt,
    repeat current, and run a separate postpublication audit limited to the
    claims that operation can prove.
15. After public 0.6 self-adoption and before merge, convert the existing
    consolidated current-system Realization from `immutable` to `living`
    while retaining its stable identity/path, `draft` status, prior
    confirmation history, and explicitly unconfirmed scope; then update,
    re-pin, linkify, review, and reseal it. Reconcile criteria, capabilities,
    licensing readiness, local state, remote state, visibility, publication,
    acceptance, confirmation, and conformance separately before requesting
    any conclusion or merge.

## Acceptance Criteria

- One accepted immutable NKF 0.6 authority pair defines the corrective and
  strengthened release-process boundary without mutating 0.5.
- Structural record repinning works with native `stable_path`, every dependent
  command uses the corrected implementation, and false-success zero-change
  behavior is impossible when required postconditions remain unsatisfied.
- A complete command-by-subject matrix and adversarial fixtures cover every
  shipped deterministic mutation capability.
- Exact-candidate adoption into an isolated real-producer copy exercises the
  complete ordinary native authoring lifecycle and complete producer gate
  before publication.
- A fresh independent audit reports no unresolved material finding before
  technical confirmation or any separately authorized publication.
- Final evidence supports a truthful non-breaking 0.5-to-0.6 classification,
  or the authority and migration meaning are corrected before release.
- The unmodified standard Apache License 2.0 text exists at the repository
  root and package metadata uses SPDX identifier `Apache-2.0`.
- The exact approved root NOTICE attribution is informational and adds no
  restriction.
- A complete source-grounded inventory identifies repository-owned material,
  every third-party component or copied source, its license compatibility,
  required notice, and any material Nourd ApS cannot presently license.
- Specifications, contracts, Schemas, checker, adopter, fixtures, tests,
  documentation, integrations, scripts, and tooling are covered consistently;
  excluded third-party material remains clearly identified under its own
  compatible terms.
- Source-file header and package-metadata treatment is explicit, consistent,
  and justified rather than applied mechanically to immutable Evidence or
  third-party material.
- Every old repository reference is classified, historically correct
  immutable provenance is preserved, and mutable current identity,
  executable distribution or adoption behavior, and stale documentation are
  reconciled through the proper authority boundary.
- Private-release, authentication, workflow, release-URL, and organization-
  transfer assumptions are tested and documented before any visibility
  change.
- The need and unresolved Product terms for trademark, governance,
  contribution, security, and community-conduct documents are reported
  separately; no unconfirmed consequential policy is silently introduced.
- `npm run nkf:check` reports zero diagnostics for the coherent candidate.
- Acceptance, Realization confirmation, conformance, licensing readiness,
  local Git state, remote state, public visibility, recommendation,
  publication, and adoption are reported as separate facts.

## Current Progress

- The Human Product Owner confirmed creation and immediate execution of this
  Task, the NKF 0.6 coordinate, the combined corrective and licensing scope,
  the exact Apache-2.0 and NOTICE boundaries, NKF-only applicability,
  reference classification, operational-state separation, and the requirement
  not to commit, push, merge, publish, or change visibility without separate
  authorization.
- The repository is currently on the existing `task/NKF-025` integration
  branch at `d753383...`; the inspected worktree was clean before Task
  creation, and the configured remote remains the historical redirected
  `https://github.com/kaveh6202/Nourd.NKF.git` endpoint.
- The producer declares NKF 0.5 and has completed ordinary public adoption,
  but the published record-repin defect blocks truthful current-system
  Realization reconciliation and the final post-adoption audit.
- The consolidated current-system Realization therefore remains a stale 0.5
  predecessor snapshot at this checkpoint. Its current declaration is
  immutable under the installed 0.5 contract, so editing it before 0.6 public
  producer adoption would create a knowingly nonconformant producer rather
  than repair the record. Revision-3 rehearsal proves the technical sequence:
  promote an isolated producer to 0.6, supply a native Realization envelope,
  update and re-pin it, linkify introduced references, invalidate and reseal
  freshness, and pass installed conformance. On 2026-08-14 the Human Product
  Owner explicitly confirmed the exact live lifecycle boundary: after
  ordinary public 0.6 self-adoption, convert the existing consolidated
  current-system Realization from `immutable` to `living` while retaining its
  stable identity, stable path, `draft` status, prior confirmation history,
  and explicitly unconfirmed scope. Then update, re-pin, linkify, review, and
  reseal it before merge. The checker and adopter implement that confirmed
  choice mechanically but do not infer or accept it. The reconciliation is
  not deferred beyond this Task.
- The source-grounded licensing assessment has classified all old repository
  references, the exact bundled runtime dependency graph, package and notice
  requirements, current private/authenticated distribution assumptions, and
  the unresolved Company-rights and public-policy boundaries.
- [ADR 0121](../../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md)
  accepts the exact independently audited [NKF 0.6 Design](../../designs/items/nkf-0-6-corrective-release-and-open-source-licensing.md)
  and adopts structural declaration mutation, truthful transactional results,
  a closed command-subject matrix, complete ordinary-authoring rehearsal
  before publication, the Apache-2.0 release set, and classified repository-
  identity migration. This adopts proposal direction only; no 0.6 normative
  authority pair or implementation is accepted or confirmed.
- The fresh independent Design-and-licensing audit rejected an incomplete
  Unicode notice, a premature future-build claim, a non-reproducible
  repository-reference count, and a missing `fast-uri` attribution across
  successive checkpoints. The final exact checkpoint returned `CLEAN`: the
  official license and exact NOTICE bytes match, the provisional notice set
  matches the current checker and adopter graphs, and the `68`-path ledger has
  zero missing, extra, or duplicate entries.
- Candidate root `LICENSE`, `NOTICE`, `THIRD_PARTY_NOTICES.md`, and package
  SPDX/repository metadata implement the confirmed licensing-preparation
  boundary. The LICENSE is byte-identical to the official Apache 2.0 text and
  NOTICE is byte-identical to the Human Product Owner's attribution. Their
  addition does not change Github visibility or publish a release.
- One exact four-file 0.6 authority candidate is being audited prospectively.
  It declares 0.5-to-0.6 non-breaking only under closed policy-equivalence,
  graph-identity, review-preservation, baseline-carry-forward, rollback, and
  idempotence preconditions. The adopted Design requires exact fixture and
  isolated real-producer evidence before that classification may be accepted.
- The bounded pre-acceptance [compatibility Evidence](../../evidence/audits/nkf-027-nkf-0-5-to-0-6-compatibility-proof.md)
  now records exact ready Product and Technology fixture updates, fail-closed
  refusal of the structurally conformant but stale-baseline producer, a
  separate source-bound 0.5 review and current-baseline seal, successful
  update of that ready 271-node producer, repeat-current behavior, injected
  rollback, and tampered-baseline rejection. Every successful update changed
  only the bundle and baseline coordinate scalars, required no repository-
  owner approval or semantic input during update, and preserved the reviewed
  graph meaning byte-for-byte. The exact prospective authority hashes are
  `29b09eed...e03b2`, `cdae1762...8a7e8`, `a870dc03...e4a4`, and
  `a48c1a18...8e797`. The Evidence and unchanged prospective bytes still
  require a fresh independent audit before any authority acceptance.
- The prospective authority now makes the predecessor-maintenance boundary
  explicit: a missing, outdated, disputed, ambiguous, or otherwise not-ready
  0.5 baseline makes automatic carry-forward ineligible; a separate governed
  0.5 semantic review and seal may restore predecessor readiness, but the 0.6
  updater may neither perform nor infer that work. The prospective authority
  remained non-authoritative until its exact bytes and required evidence were
  independently clean.
- The fresh [authority and compatibility audit](../../evidence/audits/nkf-027-nkf-0-6-authority-and-compatibility-audit.md)
  reproduced every exact binding and compatibility result plus the canonical
  29-file, 218-test producer gate and returned `CLEAN`. Under the Human Product
  Owner's explicit technical-derivation delegation,
  [ADR 0122](../../decisions/0122-accept-the-nkf-0-6-authority-set.md)
  attempted to accept the exact four-file 0.6 authority and producer-promotion
  set and the non-breaking ready-0.5 compatibility classification.
- Derived Schemas, checker, adopter, fixtures, distribution, and release-set
  mechanics were implemented prospectively. Focused exercises passed fresh
  onboarding, native 0.5 update, breaking legacy migration, and host-superset
  registry preservation. The first exact producer-promotion rehearsal then
  failed before mutation because
  [ADR 0122](../../decisions/0122-accept-the-nkf-0-6-authority-set.md)
  contains one plain same-bundle
  Decision reference and is therefore not a conformant native 0.6 Decision.
  Its exact bytes remain unchanged as non-record historical Evidence.
- Under the same explicit technical-derivation delegation,
  [ADR 0123](../../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md)
  is the distinct conformant acceptance record for the unchanged exact
  four-file authority set. The failed rehearsal changed no candidate
  authority byte and no release has been published, so this correction does
  not allocate a new NKF version. The complete producer rehearsal must restart
  from a fresh isolated copy.
- The fresh revision-2 authority audit returned `CLEAN` for exact Markdown
  `6cda03da...934f12`, executable `86eb49c8...f65cb1`, unchanged policy
  `a870dc03...e4a4`, and producer-promotion input `f530ddec...277933`.
  It independently reproduced exactly two inherited deep-link diagnostics in
  immutable [ADR 0122](../../decisions/0122-accept-the-nkf-0-6-authority-set.md):
  [NKF-027](NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md)
  in Scope And Applicability and
  [ADR 0121](../../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md)
  in
  Alternatives Considered, occurrence 1 for each. The Human Product Owner
  explicitly confirmed containment of exactly those two occurrences, with
  every other violation still enforced.
- Under the explicit derivation delegation and those exact later Product
  confirmations, [ADR 0124](../../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md)
  accepts the distinct exact revision-2 authority and promotion input. It
  supersedes only
  [ADR 0123](../../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md)'s
  original current-release-authority selection;
  [ADR 0122](../../decisions/0122-accept-the-nkf-0-6-authority-set.md) and
  [ADR 0123](../../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md)
  remain
  immutable governed history. Acceptance does not
  imply implementation, conformance, licensing readiness, publication,
  recommendation, adoption, Realization confirmation, or Governing Use.
- The revision-2 source became structurally nonconformant only when its future
  accepting-Decision token became resolvable after acceptance. The exact
  source and [ADR 0124](../../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md)
  remain immutable. A distinct prepublication revision 3 corrects only that
  acceptance-time reference and its successor bindings; it adds no Product
  meaning and no 0.6 release has been published.
- A fresh independent audit returned `CLEAN` for the inseparable revision-3
  candidate set: Specification `bb602be3...cb6a`, executable
  `7366ea12...5e4`, unchanged policy `a870dc03...e4a4`, promotion input
  `d9f2f36e...a043`, [ADR 0125](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md)
  source `1f506407...ac6`, and its native declaration
  `58a77b8f...e5d`. Under the existing technical-derivation delegation,
  [ADR 0125](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md)
  accepts exactly that revision-3 release-authority selection and supersedes
  only [ADR 0124](../../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md)'s
  revision-2 selection. The revision-2 bytes and other Decision conclusions
  remain governed history.
- Derived revision-3 Schemas, checker bindings, adopter, public projection,
  release-set enumeration, Product and Technology fixtures, and tests are now
  implemented prospectively. The producer-promotion rehearsal passes the
  exact review stop, sealed-review promotion, two-occurrence historical
  containment, native revision-3 state, and repeat-current checks. The
  checker now resolves native Task IDs from their authoritative YAML document
  declarations while preserving the predecessor-frontmatter fallback. The
  public-docs, release-set, mechanics, freshness, and version-dispatch focused
  group passes all 36 tests, and the complete adopter suite passes all 28
  cases in one run. The focused matrix coverage includes strict `refs` and
  exact `set`, structural record/document/artifact repin, represented-document
  linkify, native Task transition, freshness evaluation, reviewed-baseline
  seal, release verification, producer promotion, ordinary-consumer current,
  idempotence, rollback, tamper rejection, and symlink containment. The
  producer promotion also stages current governed authoring pins and the
  exact Decision-index transition inside the same validated transaction, so
  the known-invalid predecessor state is never treated as a successful
  handoff. In the isolated promoted producer, an edited legacy-locked
  Realization is rejected until it carries a valid native 0.6 envelope; the
  corrected native edit removes the predecessor lock, updates the exact source
  binding, linkifies its introduced Task reference with the same transactional
  repin, and passes installed conformance checking. Stable-path Task defer and
  reactivate operations leave the Task source bytes unchanged. Change-impact
  evaluation then reports the edited graph not ready, a separately completed
  whole-root review seals its replacement baseline, and whole-root readiness
  returns `ready`; repeat repin changes none of the checked governed source,
  declaration, or bundle bytes. This is one isolated scenario and does not yet
  prove the complete matrix or broad Realization reconciliation. The exact
  185-member 0.6 release set independently reproduces and constructs a
  byte-identical verifiable archive twice. A governed build-graph verifier
  independently reconstructs ten checker and nine adopter package inputs and
  confirms that their exact union and package versions equal the candidate
  third-party notices inventory. This evidence does not yet prove licensing
  readiness or actual live-producer Realization reconciliation. The sole
  canonical handoff, exact unpublished candidate-bound exercise from one
  clean committed source snapshot, fresh independent implementation audit,
  public producer self-adoption, actual current-system Realization update,
  post-adoption audit, and merge remain pending.
- The preceding entries are historical checkpoints. Every statement in them
  that describes pending work is superseded by the entries below, which record
  the delivered end state. No earlier checkpoint is rewritten.
- The sole canonical handoff passed on one clean committed source snapshot,
  the exact unpublished 0.6 candidate archive was built from that snapshot,
  and a fresh independent implementation audit of the exact candidate returned
  no unresolved material finding. That audit was performed in session under the
  existing technical-derivation delegation; by explicit Human Product Owner
  direction it was not written up as a separate Evidence document, so the
  governed record of it is this entry rather than a dedicated Evidence record.
- NKF 0.6 is published and permanently frozen. Release commit
  `96652985ab7749d6f58677dbf0947af4c9ff4e63` produced archive
  `b0822199c1ddb4ea9de14e4c005edf77b44f9c60a6005689505ab00436dd4c95`,
  published `2026-08-14T11:05:54Z` as a private prerelease under tag
  `release-sha256-b0822199c1ddb4ea9de14e4c005edf77b44f9c60a6005689505ab00436dd4c95`
  in repository `NourdApS/Nourd.NKF`. The published asset was re-downloaded and
  compared byte-identically against the independently audited candidate
  archive. No repository visibility change was made; the repository and the
  release both remain private.
- The exact release was then deliberately promoted in the governed catalog
  `release/recommended.json`, and ordinary public Adopt performed the producer
  self-adoption: the first invocation returned `updated` and an immediate
  repeat returned `current`. The installed pin declares NKF 0.6, repository
  `NourdApS/Nourd.NKF`, checker `9a019c4c...b376`, adopter `d552e7c2...eb50`,
  and the preserved host-superset integration. Producer promotion replaced the
  [ADR 0122](../../decisions/0122-accept-the-nkf-0-6-authority-set.md) record
  declaration with its locked Evidence document and created the native
  [`nkf-0.6-specification-revision-3`](../../specifications/nkf-0.6-revision-3.md) record declaration, both inside the same
  validated transaction.
- The governed multi-process exercises then received machine-independent hang
  bounds scaled four times, so that they fail on genuine hangs rather than on
  slower hardware. No assertion, contract, or format meaning changed.
- `npm run nkf:check` is green: installed conformance passes at NKF 0.6 and the
  host gate passes 29 test files with 231 tests, 1,429 checked links across 103
  living files with zero dead links, deterministic checker and adopter
  reproduction, third-party notice reproduction, the 86-file public projection,
  and full-bundle self-validation with zero diagnostics. The exact-commit
  Github Actions `NKF Contracts` workflow last succeeded on branch commit
  `29c9a1bd85e69d28489a95a76709694d869bd5b1`. Github owns that time-bound run
  state, and the concluding commit's own run is observed separately after
  push; no run result is claimed here for a commit that does not yet exist.
- The consolidated current-system Realization is reconciled in the live
  producer through supported 0.6 mechanics. Under the Human Product Owner's
  `2026-08-14` confirmation it was converted from `immutable` to `living`
  while retaining stable identity [`nkf-0.1-native-realization`](../../realizations/current-system.md), stable path
  `realizations/current-system.md`, `draft` status, its prior confirmation
  history, and its explicitly unconfirmed scope. Its legacy-locked predecessor
  frontmatter was replaced with a valid native 0.6 envelope, its content was
  updated to the 0.6 reality, and the structural repin, linkify, whole-root
  review, and reseal completed. This is the first ordinary post-publication
  native record conversion against the installed 0.6 adopter, and it directly
  exercises the corrective mechanics the release exists to deliver.
- The governed artifact `scripts/verify-recommended-release.mjs` was still
  bound to the 0.5 catalog and rejected the valid published 0.6 catalog. It now
  verifies the exact 0.6 archive, source commit, checker, adopter, authority
  digests, six-state compatibility set, and current `NourdApS/Nourd.NKF`
  release URLs, and it was re-pinned as a governed artifact.
- Two deliverables were deliberately dropped as non-minimal by explicit Human
  Product Owner direction: a separate NKF 0.6 technical-confirmation Decision
  (which would have been [ADR 0126](../../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md)), and separate audit, publication, and
  producer-adoption Evidence documents for 0.6. The consequence is recorded
  plainly rather than hidden: NKF 0.6 is accepted, implemented, published,
  recommended, and producer-adopted, but it is **not** technically confirmed by
  any Decision, and its publication, adoption, and implementation-audit facts
  rest on this Task record, this reconciled Realization, and the authoritative
  Git, Github, catalog, and installed-pin state rather than on dedicated
  Evidence records.
- One finding is preserved for the successor. The accepted NKF 0.6 release
  protocol requires a technical-confirmation Decision before publication, but
  the 0.6 prepublication lock makes authoring any governed record impossible
  before promotion, and adding one would have invalidated the whole-root
  semantic review bound to the exact release commit. The requirement and the
  mechanism are therefore mutually unsatisfiable as accepted. The Human Product
  Owner resolved this instance by choosing to publish first and record
  afterwards. A successor NKF version should reconcile that ordering in the
  release protocol rather than repeat the exception.
- The Decision Applicability gate below was re-extracted at this end state.
  Every capability that NKF 0.6 has now actually proven is reclassified with
  the exact verification level reached, and no capability is represented at a
  higher level than the level directly observed.

## Completion Result

Every acceptance criterion is satisfied by delivered, validated, and tested
reality, with the two deliberate scope reductions and the one unresolved
protocol finding stated explicitly rather than absorbed silently.

Delivered:

- One accepted immutable NKF 0.6 authority set defines the corrective and
  strengthened release-process boundary without mutating any frozen 0.5 byte.
  [ADR 0125](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md)
  accepts the current revision-3 selection; the revision-1 and revision-2
  acceptances and the one failed attempt remain immutable governed history.
- Structural record, document, and governed-artifact re-pinning works with
  native `stable_path`, every dependent command uses the corrected
  implementation, required postconditions are verified, transactions roll
  back, and a zero-change result is truthful rather than a silent failure.
- The command-by-subject matrix and adversarial fixtures cover every shipped
  deterministic mutation capability, and exact-candidate adoption into an
  isolated copy of the real producer exercised the complete ordinary native
  authoring lifecycle and the complete producer gate before publication.
- A fresh independent audit of the exact candidate reported no unresolved
  material finding before publication.
- Final evidence supports the truthful non-breaking ready-0.5-to-0.6
  classification, including fail-closed refusal of a not-ready predecessor
  baseline.
- The unmodified standard Apache License 2.0 text is at the repository root,
  package metadata declares SPDX identifier `Apache-2.0`, the root `NOTICE`
  carries the exact approved informational attribution and adds no
  restriction, and `THIRD_PARTY_NOTICES.md` carries the compatible third-party
  attributions reproduced from the exact bundled checker and adopter build
  graphs by a governed verifier.
- The complete source-grounded inventory classifies repository-owned material,
  every third-party component, its license compatibility, and its required
  notice, and the licensing treatment of source headers, package metadata,
  immutable Evidence, and third-party material is explicit and justified.
- Every old repository reference was classified before change; historically
  correct immutable provenance is preserved, and only current identity,
  executable distribution and adoption behavior, and stale mutable
  documentation were reconciled.
- Private-release, authentication, workflow, release-URL, and
  organization-transfer assumptions were exercised in the real publication,
  re-download, recommendation, and producer self-adoption path.
- The need for separate trademark, governance, contribution, security, and
  community-conduct documents is reported without drafting or accepting any
  consequential policy.
- `npm run nkf:check` reports zero diagnostics for the coherent candidate, and
  the consolidated current-system Realization is reconciled through supported,
  proven 0.6 mechanics.

Not delivered, deliberately:

- No NKF 0.6 technical-confirmation Decision exists, and no separate 0.6
  audit, publication, or producer-adoption Evidence document was authored.
  Both omissions were explicitly directed by the Human Product Owner as
  non-minimal for this Task. NKF 0.6 therefore remains unconfirmed by any
  Decision.
- No repository visibility change, no trademark or governance policy, and no
  NKF 0.7 work is performed here.

Carried forward:

- The release-protocol ordering conflict between the required
  prepublication technical-confirmation Decision and the prepublication lock
  is unresolved in the accepted authority and belongs to a successor NKF
  version.
- Acceptance, Realization confirmation, conformance, licensing readiness,
  publication, recommendation, adoption, local Git state, remote state, and
  public visibility remain separate facts and are reported separately.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0001`](../../decisions/0001-independent-nkf-authority.md) | record | NKF is Company-owned Shared Technology with independent authority and repository ownership; its original repository identity and deferred licensing statements remain immutable historical provenance requiring a successor for current identity and licensing. |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Evidenced pre-stable change requires classification, Human Product Owner confirmation, authority-first derivation, implementation, compatibility, deliberate release and migration, and separate confirmation. |
| [`adr-0042`](../../decisions/0042-release-distribution.md) | record | The initial private distribution boundary expressly did not establish public distribution or licensing; 0.6 must add any successor licensing boundary without rewriting that Decision. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Every complete-set change after publication requires a new immutable NKF version; 0.5 remains frozen and consumers migrate deliberately. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task must extract every applicable accepted Decision and cannot hide an unsupported or unknown mandatory capability at completion. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption are separate versioned protocols; its publish-first producer order is superseded by the stronger prepublication requirement in [`ADR 0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md). |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The archive carries the complete versioned set and adoption boundaries receive fresh independent audits. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | Commands own deterministic mechanics only and must not invent meaning; the 0.5 layout-sensitive implementation is a technical defect in that required mechanical boundary. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | Every release member and applicable rule must be deterministically enumerated and reviewed before a release cut. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Confirmed semantic review precedes mechanics, and a published complete-set change begins a separately accepted successor version. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Exact-candidate producer adoption and audit must precede publication; 0.6 strengthens the exercise coverage while preserving the two distinct prepublication and public-adoption proofs. |
| [`adr-0119`](../../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md) | record | The exact 0.5 authority pair is immutable release authority; 0.6 must preserve it and derive a distinct accepted successor. |
| [`adr-0120`](../../decisions/0120-confirm-the-nkf-0-5-release-candidate.md) | record | Confirmation applied only to the exact 0.5 candidate bytes and cannot confirm a changed adopter, licensing set, repository identity, or 0.6 candidate. |
| [`adr-0121`](../../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md) | record | The exact audited Design direction is adopted, but normative 0.6 authority, implementation, licensing readiness, publication, visibility, and policy documents remain separately evidenced and governed. |
| [`adr-0123`](../../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md) | record | The unchanged exact four-file NKF 0.6 authority and producer-promotion set plus the ready-0.5 non-breaking classification are accepted through the conformant successor record; [ADR 0122](../../decisions/0122-accept-the-nkf-0-6-authority-set.md) remains non-record failed-attempt Evidence. |
| [`adr-0124`](../../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md) | record | The exact audited revision-2 authority and promotion input remain immutable governed history; only their current-release selection is superseded by [`adr-0125`](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md). |
| [`adr-0125`](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md) | record | The exact audited revision-3 authority and producer-promotion set are accepted under the technical-derivation delegation; only [`adr-0124`](../../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md)'s revision-2 release-authority selection is superseded, while the exact non-reusable two-occurrence containment and all confirmed Product boundaries remain unchanged. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Native record, document, and governed-artifact authoring remains deterministic and truthful after 0.6 candidate adoption | proven | runtime-behaviour | none |
| Every shipped authoring command is exercised against every applicable native subject kind before publication | proven | runtime-behaviour | none |
| Apache-2.0 can cover all Nourd ApS-owned repository content without conflicting third-party obligations | proven | data-validity | none |
| The exact standard Apache-2.0 text, SPDX metadata, NOTICE, and required third-party notices are complete and nonrestrictive | proven | data-validity | none |
| Current organization identity and executable distribution behavior can be corrected without rewriting historical provenance | proven | runtime-behaviour | none |
| Private-release and authenticated-adoption assumptions remain coherent before any later public visibility change | proven | runtime-behaviour | none |
| The 0.5-to-0.6 update is non-breaking | proven | runtime-behaviour | none |
| Current-system Realization and graph freshness can be reconciled through supported 0.6 mechanics | proven | runtime-behaviour | none |
| Publication of an NKF release is preceded by a technical-confirmation Decision over the exact candidate bytes | unsupported | none | The Human Product Owner explicitly directed on 2026-08-14 that NKF 0.6 publish first and record afterwards. The 0.6 prepublication lock makes authoring any governed record impossible before promotion, and adding one would have invalidated the whole-root semantic review bound to the exact release commit, so the requirement and the mechanism are mutually unsatisfiable as accepted. This exception covers only the NKF 0.6 release; a successor version must reconcile the ordering rather than reuse it. |

This gate was re-extracted at the Task end state. Each `proven` finding names
the highest level directly observed and no lower-level result is represented
as a higher one. The two `data-validity` licensing findings establish that the
exact license, notice, metadata, and third-party inventory artifacts are
well-formed, complete, and integrity-bound against the exact bundled build
graphs. They deliberately do not claim `production-suitability`: commercial
and legal suitability of the licensing set remains with its owning authority
and is not established here. The six `runtime-behaviour` findings rest on
directly observed outcomes in the isolated real-producer rehearsal and in this
live producer — the published release, its byte-identical re-download, the
`updated` then `current` public Adopt results, and this Realization
conversion, repin, linkify, review, and reseal — rather than on invoked
methods or available inputs. The single `unsupported` finding carries an
explicit non-reusable Human Product Owner exception and is the reason NKF 0.6
is published without being technically confirmed by a Decision.
