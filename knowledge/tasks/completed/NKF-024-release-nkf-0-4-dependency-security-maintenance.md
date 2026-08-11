---
title: "NKF-024: Release NKF 0.4 Dependency Security Maintenance"
summary: Ship a narrowly scoped non-breaking NKF 0.4 release that replaces the vulnerable fast-uri and nanoid dependency versions without changing NKF 0.3 meaning or any frozen 0.3 byte.
created_at: 2026-08-11T13:52:19Z
task_id: NKF-024
task_status: completed
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
related_tasks:
  - NKF-020
  - NKF-023
---

# NKF-024: Release NKF 0.4 Dependency Security Maintenance

## Human Direction

On `2026-08-11`, after [NKF-023](NKF-023-release-nkf-0-3-with-immutable-freeze-and-proven-self-adoption.md)
completed and its sole final pull request merged, the Human Product Owner
directed creating and beginning this Task to release NKF `0.4` and fix the two
current dependency advisories reported for `fast-uri` and `nanoid`.

The Human Product Owner confirmed that `0.4` is a minor, non-breaking successor
to frozen NKF `0.3`, not a major version. The work is technical maintenance:
technical design, exact derivation, review, correction, and confirmation are
delegated to the technical reviewer without further Human Product Owner
approval unless investigation exposes an actual normative or compatibility
change. This direction fixes the Product boundaries but does not make passing
checks, derived bytes, an audit, publication, recommendation, or adoption an
acceptance or confirmation act by implication.

The Human Product Owner also directed one branch and one pull request for the
whole Task. No intermediate Task lifecycle or recommendation pull request may
merge to `master`; the branch must carry implementation, candidate release,
publication, recommendation, producer adoption, audits, reconciliation, and
Task completion before the sole pull request becomes ready for human merge.

## Process Exception

The installed deterministic activation command requires the Task to exist as
deferred on the default branch before it can create the active branch. That
would require the extra master lifecycle update and pull request expressly
excluded by Human direction. Therefore this Task is established directly as
`active` in the first commit of `task/NKF-024`, and the sole draft pull request
is opened from that branch. The remaining branch-carried lifecycle boundary is
unchanged: `master` never rests with this Task active, all work stays on the
same branch, completion is recorded before readiness, and merge remains the
Human Product Owner's final review act.

## Problem

The frozen NKF 0.3 source lock resolves `fast-uri` `3.1.4` transitively through
the production `ajv` dependency and `nanoid` `3.3.16` transitively through the
development test stack. The current npm advisory database reports both as
high-severity affected versions:

- `fast-uri` versions `3.0.0` through `3.1.4` may interpret backslash authority
  introducers differently from Node's WHATWG URL implementation, enabling
  host-policy confusion when an application validates a host with the first
  parser and dereferences the same input with the second; version `3.1.5` is
  patched; and
- `nanoid` before `3.3.17` can loop indefinitely when its custom generators
  receive size zero; version `3.3.17` is patched.

NKF does not currently expose either advisory's described application path:
release acquisition derives one exact content-addressed Github release and
uses `gh release download`, and `nanoid` is not a distributed runtime
dependency. That bounded exposure assessment does not justify retaining known
affected components when patched compatible versions exist. Updating
`fast-uri` changes frozen derived checker and adopter bytes, so
[ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
requires a new NKF version rather than an in-place 0.3 correction.

## Desired Outcome

NKF 0.4 preserves the complete accepted NKF 0.3 meaning and public Adopt
workflow while carrying patched dependency versions, reproducibly rebuilt
artifacts, targeted regression evidence, and explicit non-breaking
`0.3`-to-`0.4` compatibility. The exact 0.4 candidate self-adopts and returns
`current` before publication, passes an independent exact-candidate audit,
publishes unchanged audited bytes, becomes the recommendation on the same
branch, self-adopts through ordinary public Adopt, and passes a second fresh
post-adoption audit before this Task concludes.

## Scope

- preserve every published NKF 0.3 byte, tag, archive, manifest, source
  binding, Decision, audit, and recommendation-history entry;
- update `fast-uri` to at least `3.1.5` and `nanoid` to at least `3.3.17`
  through the locked dependency graph without unrelated dependency drift;
- add focused regression coverage for backslash-authority URL handling and
  zero-size custom-generator exposure at the exact boundary NKF uses;
- allocate NKF `0.4` and derive one exact maintenance authority pair,
  executable contracts, Schemas, release-set contract, checker, adopter,
  protocols, skills, host adapters, fixtures, examples, and public projection;
- preserve one subcommand-free public Adopt operation and the exact producer
  host-superset validation integration;
- classify `0.3` to `0.4` as `non-breaking`, requiring no migration and no
  repository-owner breaking approval, while retaining the existing breaking
  treatment for supported `0.1` and `0.2` predecessors;
- prove a current 0.3 consumer updates to 0.4 without knowledge loss,
  migration, integration weakening, or approval prompt;
- independently audit the exact candidate before delegated technical
  confirmation and independently audit ordinary producer adoption after
  publication; and
- keep acceptance, delegated technical confirmation, conformance,
  publication, recommendation, producer adoption, Git state, remote workflow
  state, and Governing Use readiness separate.

## Out Of Scope

- changing, replacing, deleting, republishing, or rebinding any frozen NKF
  0.3 complete-set member under the `0.3` coordinate;
- introducing new format vocabulary, topology, authority meaning, validation
  semantics, public operations, onboarding categories, or Root Profiles;
- implementing deferred [NKF-021](../deferred/NKF-021-task-scope-gate.md),
  acceptance-binding verification, protected-branch enforcement, or any other
  deferred Task;
- broad dependency modernization unrelated to the two advisories;
- claiming that an advisory severity alone proves an exploitable NKF path;
- changing consumer canonical meaning or accepting it on the consumer's
  behalf; and
- declaring NKF `1.0` stable or claiming Governing Use readiness.

## Execution Plan

1. Establish this Task directly on its sole branch under the recorded process
   exception, validate its complete Decision Applicability Gate, commit it as
   the branch's first change, push, and open the only draft pull request.
2. Reproduce the exact advisory and dependency graph from a clean 0.3 source,
   establish the reachable NKF boundary, and retain reviewed security Evidence.
3. Derive the minimal 0.4 authority pair from accepted 0.3 by changing only the
   version allocation, predecessor-relative compatibility, and maintenance
   statements required by the patched complete set. Independently compare the
   pair against 0.3 and correct every unintended semantic difference.
4. Record the delegated technical acceptance and derivation boundary, then
   derive all 0.4 contracts, Schemas, release membership, tooling, protocols,
   guidance, fixtures, examples, public documentation, and migrations from
   that exact pair.
5. Update only the vulnerable dependency resolutions, rebuild deterministically,
   add focused security and compatibility tests, and prove the 0.3 release and
   repository remain reproducible and unchanged.
6. Build one exact 0.4 candidate archive from a clean release commit. In fresh
   isolated checkouts, exercise checker and adopter fixtures, update a pinned
   0.3 consumer without approval or migration, self-adopt the producer while
   preserving its stronger gate, and require repeat candidate Adopt to return
   `current`.
7. Audit the exact candidate independently from fresh source and extraction,
   including complete membership, byte and mode bindings, deterministic
   reproduction, dependency closure, advisory absence, supported predecessor
   routing, idempotence, rollback, tamper rejection, and producer integration.
8. Exercise delegated technical confirmation only after the candidate audit
   is clean, publish exactly the confirmed archive, and change the branch's
   recommendation to exactly that published 0.4 release.
9. Run ordinary no-override public Adopt against this producer on the same
   branch, require repeat `current`, and independently audit the complete
   installed and recommended state in a fresh checkout.
10. Reconcile every acceptance criterion and mandatory capability, update the
    current-system Realization without overstating confirmation, close the Task
    through deterministic mechanics, and mark the same pull request ready for
    the Human Product Owner's single final merge.

## Acceptance Criteria

- The exact published NKF 0.3 release remains retrievable and byte-unchanged;
  no 0.3 asset, tag, manifest, accepted authority, or recommendation-history
  evidence is overwritten or rebound.
- The clean locked 0.4 source resolves neither an affected `fast-uri` nor an
  affected `nanoid`, and `npm audit` reports zero known vulnerabilities.
- Targeted regression tests prove NKF does not accept a backslash-authority
  policy/use confusion path and cannot exercise the vulnerable zero-size
  `nanoid` generator through its shipped runtime.
- The exact maintenance authority pair preserves accepted NKF 0.3 meaning
  except for the 0.4 coordinate, explicit predecessor compatibility, and
  statements required to bind the new complete set.
- One complete 0.4 release-set enumeration carries every exact member across
  archive construction, verification, public documentation, and Adopt.
- `0.3` to `0.4` is implemented and exercised as non-breaking: ordinary Adopt
  requires no migration and no breaking approval, preserves project knowledge
  and integration, passes the installed gate, and returns `current` on repeat.
- Existing `0.1` and `0.2` predecessor routes remain explicit, fail closed
  without repository-owner approval, and preserve their tested migration
  behavior when approved.
- The exact candidate self-adopts into a pristine producer clone, preserves the
  pinned-first host-superset chain, passes the complete producer gate, and
  returns `current` before publication.
- Independent exact-candidate audit Evidence verifies source, archive,
  complete membership, dependency closure, Schemas, checker, adopter,
  migrations, integration, rollback, tamper rejection, reproducibility, and
  advisory absence before delegated technical confirmation.
- The unchanged audited archive is published and recommended; ordinary public
  Adopt self-pins this producer, repeat Adopt returns `current`, and a fresh
  independent post-adoption audit verifies the exact installed state.
- `npm run nkf:check` passes every handoff and the final exact source snapshot
  with zero diagnostics.
- The sole pull request carries this Task's first active commit through its
  completed result; `master` receives no intermediate lifecycle state.

## Current Progress

- The first direct active branch snapshot was committed as `1b1cd51` and
  opened the sole draft pull request 8. Its installed NKF 0.3 producer gate
  passed 25 test files, 202 tests, 988 living links, deterministic builds, and
  full-bundle validation with zero diagnostics.
- The exact merged 0.3 lock and code-path baseline is retained in
  [dependency-security Evidence](../../evidence/audits/nkf-024-dependency-security-baseline.md).
  It reproduces two npm advisories while distinguishing their general package
  severity from the exact shipped NKF reachability boundary.
- [ADR 0112](../../decisions/0112-allocate-nkf-0-4-security-maintenance.md)
  records the confirmed 0.4 coordinate, non-breaking 0.3 compatibility,
  immutable 0.3 predecessor boundary, delegated technical maintenance scope,
  and single-branch lifecycle exception.
- The fresh [0.4 authority-pair audit](../../evidence/audits/nkf-024-nkf-0-4-authority-pair-audit.md)
  found and corrected an accidental CommonMark substring replacement, then
  returned `CLEAN` for the exact maintenance-only pair accepted by
  [ADR 0113](../../decisions/0113-accept-the-nkf-0-4-authority-pair.md).
- The lock now resolves `fast-uri` `3.1.5` and development-only `nanoid`
  `3.3.18` with no unrelated dependency movement, and `npm audit` reports zero
  known vulnerabilities. Focused regression tests reject literal-backslash
  URI authorities through the shipped Ajv format boundary and verify that
  `nanoid` is absent from both distributed runtimes.
- The derived 136-member release set, multi-version checker, and one public
  Adopt implementation pass focused contract, release, security, and runtime
  tests. Ordinary 0.3-to-0.4 Adopt preserves the complete knowledge tree and
  returns `current` on repeat; 0.1 and 0.2 remain approval-gated and preserving.
- The successor
  [NKF 0.4 Security Maintenance Realization](../../realizations/current/nkf-0.4-security-maintenance.md)
  records the implementation mapping and is exactly confirmed by the later
  delegated confirmation Decision after clean candidate audit.
- The first private archive was superseded before publication after its
  exercise exposed a stale 0.3 compatibility expectation and then a missing
  producer host-registry rebind. Both defects were corrected in source and
  regression coverage. The replacement release commit is `29880a3`, with
  checker SHA-256 `425286d3...d123`, adopter SHA-256 `416b26e7...cd65`, and
  archive SHA-256 `a7912b92...79ecd`.
- The fresh
  [exact-candidate audit](../../evidence/audits/nkf-024-nkf-0-4-exact-candidate-audit.md)
  returned `CLEAN`: 136 bound archive members across 18 closed classes, zero
  npm advisories, two byte-identical builds, exact archive reproduction, 28
  test files and 210 tests, extracted-checker conformance, frozen 0.3 source
  preservation, and pristine-producer Adopt returning `updated` then
  `current` with its stronger host gate preserved.
- [ADR 0114](../../decisions/0114-confirm-the-nkf-0-4-release-candidate.md)
  exercises the delegated technical-confirmation authority only after that
  clean audit and binds exact release commit `29880a3`, archive
  `a7912b92...79ecd`, checker `425286d3...d123`, adopter `416b26e7...cd65`,
  and dependency lock `c2490fc3...71fe`. Publication, recommendation, and
  ordinary producer adoption remain separate pending facts.
- The exact confirmed tag now resolves remotely to release commit `29880a3`.
  Github prerelease `368669248` publishes exactly one 4,164,608-byte asset at
  SHA-256 `a7912b92...79ecd`; authenticated draft and published downloads were
  byte-identical. The
  [publication Evidence](../../evidence/audits/nkf-024-nkf-0-4-publication.md)
  also independently re-downloaded the frozen 0.3 predecessor at its original
  tag, source commit, size, and SHA-256.
- The branch recommendation selects that exact published 0.4 release and
  declares four supported predecessor/current states. Ordinary public Adopt
  then updated this producer from 0.3 without migration, approval, integration
  weakening, or knowledge change; immediate repeat returned `current`.
- The fresh
  [producer-adoption audit](../../evidence/audits/nkf-024-nkf-0-4-producer-adoption-audit.md)
  returned `CLEAN` for exact producer commit `c5ed385`: pristine `npm ci`, zero
  advisories, the pinned-first canonical gate with 28 test files and 210 tests,
  authenticated release re-download, exact recommendation/pin agreement,
  frozen 0.3 and knowledge preservation, repeat `current` with no tracked-byte
  change, and fail-closed pin, archive, and integration tampering.

## Completion Result

NKF 0.4 is the accepted, technically confirmed, published, recommended, and
producer-adopted non-breaking dependency-security successor to immutable NKF
0.3. The exact release source is
`29880a398c26fbc126b13cdaaebe9cf5b7fe7734`; the published archive has SHA-256
`a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd`,
checker SHA-256 `425286d3...d123`, and adopter SHA-256
`416b26e7...cd65`.

The locked graph advances only the affected dependency resolutions to
`fast-uri` `3.1.5` and development-only `nanoid` `3.3.18`. `npm audit` reports
zero known vulnerabilities, focused tests cover both advisory boundaries, and
every frozen NKF 0.3 release and source surface remains unchanged.

The delivered release carries one exact 136-member, 18-class set with the
accepted 0.4 authority pair, four Schemas, deterministic checker and adopter,
protocols, portable guidance, host adapters, fixtures, examples, and 64-file
public projection. The 0.3-to-0.4 route is non-breaking and requires no
knowledge migration or breaking approval; 0.1 and 0.2 remain explicitly
approval-gated.

Ordinary public Adopt updated the producer from 0.3, preserved the complete
knowledge tree and pinned-first host-superset validation chain, and returned
`current` on immediate repeat. The recommendation and installed pin resolve
the same exact published archive.

Both required independent audits are `CLEAN`. The exact-candidate audit
preceded [ADR 0114](../../decisions/0114-confirm-the-nkf-0-4-release-candidate.md)
technical confirmation and reproduced the source, archive, release bindings,
dependency closure, supported compatibility routes, idempotence, rollback,
and tamper rejection. The post-publication audit started
from fresh remote producer commit `c5ed385...`, passed pristine installation
and the canonical gate, re-downloaded the authenticated release byte-for-byte,
returned `current` without tracked mutation, preserved project knowledge and
frozen 0.3 paths, and rejected pin, archive, and integration tampering.

Every acceptance criterion and mandatory capability is satisfied and proven.
The final reconciled source snapshot passed `npm run nkf:check`: 28 test files
and 210 tests, 1,038 verified links, deterministic checker, adopter, and
64-file public-projection builds, and full-bundle conformance with zero
diagnostics.

State remains deliberately separate.
[ADR 0113](../../decisions/0113-accept-the-nkf-0-4-authority-pair.md) accepts
the exact 0.4 authority pair;
[ADR 0114](../../decisions/0114-confirm-the-nkf-0-4-release-candidate.md)
records delegated technical confirmation of the exact audited candidate;
Github owns the observed release; this branch owns the current recommendation
and audited producer adoption until merge; authority binding was not
evaluated; and Governing Use remains not-ready. No successful remote workflow
run or protected-default-branch enforcement is claimed. The sole pull request
still requires the Human Product Owner's final merge.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires Evidence, classification, authority-first derivation, a versioned release, and deliberate consumer update; Human direction already fixes this Task's non-breaking maintenance boundary and delegates technical execution. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | Changing bundled validation dependencies changes the enforcement surface and requires predecessor comparison, independent review, a successor Realization, and separate technical confirmation. |
| [`adr-0074`](../../decisions/0074-separate-authoring-and-recommended-release-verification.md) | record | Current-snapshot authoring validation and exact recommended-release verification remain separate checks. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | A complete-set change ships as a later NKF version; its earlier consumer-triggered freeze condition is prospectively superseded by publication freeze. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption remain separate and both protocols freeze in the complete set; the publish-before-self-adopt ordering is prospectively superseded by exact-candidate proof under [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md). |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The release archive carries the complete versioned set and both candidate and post-action adoption require fresh independent audits. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | Pre-cut review covers every deterministically enumerated member against the complete applicable rule set. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic truth and delegated review precede deterministic mechanics; validation does not accept or confirm knowledge. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The branch carries the whole active Task and merges only concluded. Human direction explicitly replaces the command's deferred-on-master activation precondition with a direct first active branch commit, but does not waive branch-carried life, completed-before-ready, or human merge. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | One public subcommand-free Adopt operation resolves an immutable recommendation and applies predecessor-relative compatibility, migration, and approval semantics. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication permanently freezes the complete set; candidate and ordinary public self-adoption are separate proofs; the producer gate remains a verified host superset; any changed 0.3 member requires 0.4. |
| [`adr-0110`](../../decisions/0110-accept-the-nkf-0-3-authority-pair.md) | record | The exact 0.3 pair is immutable governing predecessor authority and cannot be edited; the 0.4 maintenance pair must be a separately derived successor. |
| [`adr-0111`](../../decisions/0111-confirm-the-nkf-0-3-release-candidate.md) | record | Technical confirmation binds only the exact audited 0.3 candidate; 0.4 requires its own clean audit and separate delegated confirmation. |
| [`adr-0112`](../../decisions/0112-allocate-nkf-0-4-security-maintenance.md) | record | NKF 0.4 is the non-breaking dependency-security successor; 0.3 stays frozen, no new normative behavior is authorized, technical execution is delegated inside the fixed boundary, and this Task uses one branch and one final pull request. |
| [`adr-0113`](../../decisions/0113-accept-the-nkf-0-4-authority-pair.md) | record | The exact 0.4 Markdown and executable companion are accepted together as the maintenance-only successor; every derived surface must bind those bytes and preserve 0.3 behavior. |
| [`adr-0114`](../../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) | record | The exact audited 0.4 release commit, archive, checker, adopter, and lock are technically confirmed; only those unchanged bytes may be published. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Published NKF 0.3 remains exact immutable predecessor evidence | proven | data-validity | none |
| The locked 0.4 dependency graph contains patched `fast-uri` and `nanoid` versions and no known npm advisory | proven | data-validity | none |
| The two advisory application paths are absent or fail closed at NKF's exact shipped boundaries | proven | runtime-behaviour | none |
| The 0.4 authority pair is a semantically bounded maintenance successor to accepted 0.3 | proven | data-validity | none |
| Every complete-set surface consumes one exact 0.4 release enumeration | proven | data-validity | none |
| Ordinary 0.3-to-0.4 Adopt is non-breaking, migration-free, approval-free, preserving, and idempotent | proven | runtime-behaviour | none |
| Supported 0.1 and 0.2 predecessor migrations remain approval-gated and preserving | proven | runtime-behaviour | none |
| Exact-candidate producer self-adoption preserves the stronger host gate and returns `current` | proven | runtime-behaviour | none |
| Independent candidate and post-publication audits return clean before their dependent actions | proven | runtime-behaviour | none |
| The published recommendation and producer pin resolve the same immutable 0.4 archive | proven | data-validity | none |
