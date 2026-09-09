---
id: nkf-current-system
type: realization
title: NKF Current System
summary: This is the consolidated current-system Realization for the Nourd Knowledge Format repository. The NKF 0.81 direction is adopted, its repaired authority revision is accepted under explicit P1 delegation, and its corrected exact archive is independently audited, technically confirmed, and publicly released with anonymous re-download verification. The producer declares, pins, and installs the recommended published NKF 0.81 archive, and the public documentation carries the same version.
created_at: 2026-07-30T15:59:54Z
---

# NKF Current System

## Realization Identity And Kind

This is the consolidated current-system Realization for the Nourd Knowledge
Format repository. It is the normal entry point for understanding how
accepted NKF meaning is implemented today.

It consolidates architecture, topology, components, relationships,
interfaces, artifact mappings, implementation status, confirmation status,
and relevant Decision provenance. It is not a separate lifecycle layer,
normative authority, generated validation result, or copy of live operational
state.

The stable record identity is `nkf-current-system`, established by the one
governed identity succession the accepted NKF 0.7 authority declared and the
0.7 producer promotion applied on `2026-08-17`; the predecessor identity
`nkf-0.1-native-realization` remains permanently resolvable as history, and
the stable source path remains `realizations/current-system.md`. The record
was an `immutable` predecessor snapshot while the producer ran published
NKF 0.4 and NKF 0.5; on `2026-08-14` the Human Product Owner explicitly
confirmed converting it to `living` with that identity, path, `draft` status,
prior confirmation history, and explicitly unconfirmed scope retained. Its
declared confirmation status remains `partially-confirmed`.

This record is the one current account. Ten frozen supporting Realizations
that once carried per-area detail were retired from the working tree to Git
history on `2026-09-08` under
[ADR 0138](../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md),
each having described a state that no longer existed; their exact bytes,
confirming Decisions, and removal are recorded in the
[retirement Evidence](../evidence/release/nkf-038-supporting-realizations-retirement.md).
This account is rewritten in place whenever the implementation changes. What
no longer describes the working tree is stated as dated lineage, and the
Decisions and Evidence named there own its detail.

## Governed Meaning Realized

### Current Release State

The producer declares, pins, and installs published NKF 0.81 archive
`a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3`. The catalog selects the same
archive with public prerelease channel and visibility. Under the standing
Human Product Owner direction in
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
release completion includes recommendation, producer adoption, and publication
of the matching public documentation. The ordinary published-adopter promotion
returned `updated`, repeat Adopt returned `current`, and the exact delta
performed one native Specification judgment while carrying 359 unchanged
judgments. The [completion Evidence](../evidence/release/nkf-038-nkf-0-81-release-audit.md#recommendation-producer-adoption-and-public-documentation-completion)
records verification and the public documentation publication.

NKF 0.81 is the adopted successor direction, delivered under
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md).
Its direction is adopted by
[ADR 0138](../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md)
and
[ADR 0139](../decisions/0139-adopt-the-delta-closure-propagation-repair.md)
after the Human Product Owner confirmed each of seven format boundaries
verbatim on `2026-09-08`; its five-artifact authority set has declared acceptance in
[ADR 0140](../decisions/0140-accept-the-nkf-0-81-authority-set.md) after the
three-round
[independent authority audit](../evidence/audits/nkf-038-nkf-0-81-independent-authority-audit.md);
and its prior exact release candidate — archive
`e36ef44b53c88cfd0cd22093eca9507416eb54d575289a96e30d81227d5c88ea` at release commit
`aeb95db5`, checker `f2fe7063...3c59c`, adopter `1ffcf550...e625f` — is
technically confirmed by
[ADR 0141](../decisions/0141-confirm-the-nkf-0-81-release-candidate.md), bound
to the four-round independent
[release audit](../evidence/release/nkf-038-nkf-0-81-release-audit.md) whose
fourth round found that delivery clean.

The subsequent PR audit reproduced a false-ready closure claim and found
missing human acceptance provenance in the first authority revision. The
Human Product Owner then explicitly directed the Codex technical reviewer to
self-audit P1 and execute at will. [ADR 0142](../decisions/0142-accept-the-bound-predecessor-repair.md), with final navigation bindings selected by [ADR 0143](../decisions/0143-bind-the-predecessor-repair-promotion.md),
adopts and accepts the repaired authority revision under that
prospective delegation. The first five artifacts are retained byte-for-byte
under `knowledge/evidence/release/nkf-0.81-authority-revision-1/`; neither the
new Decision nor passing validation retroactively accepts
[ADR 0140](../decisions/0140-accept-the-nkf-0-81-authority-set.md).

The P1 implementation loads exact content-addressed predecessor baselines,
observes them in the validation snapshot, verifies their chain, recomputes the
closure from actual predecessor revisions and judgment bases, and checks exact
carried judgments. Missing or altered history, an erased initiating subject,
extra closure entries, and a relabeled whole-root claim with carried judgments
cannot establish readiness. Sealing retains history through review and Task
transition application. Published 0.8 bytes and behavior remain frozen.

The corrected exact release candidate is archive
`a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3` at release commit
`fa0efa056db17f5336a3b7a93142d58f41110cf7`, with checker `1a268c93d9f484389885c02336ebd8464718967249036e79de03ddf7cd775008`
and adopter `12272609c5d0ca7bcc6d5bc67b919f86f1dfee1a1d53409f10549e419c32ffa5`.
[ADR 0144](../decisions/0144-confirm-the-repaired-nkf-0-81-candidate.md) technically
confirms those bytes after an independent full-set audit and successful
isolated exact-producer exercise. Its 141 source members are byte-identical
to the audited cut; only the manifest binds the later audit-recording commit.
Both cuts returned `updated` then `current`, preserved host-superset
integration, and passed the full producer gate. The final delta review
performs one native Specification judgment and carries 358 unchanged judgments.
The full guidance reread and final diagnostic correction are recorded in the
[guidance review](../evidence/release/nkf-038-nkf-0-81-guidance-review.md).
The earlier confirmation above remains historical and does not cover these
corrected bytes. The living Realization remains partially confirmed; exact
release-byte confirmation does not confirm its entire current revision.
The implementation has merged to `master`; the exact confirmed archive was
published as a public prerelease on `2026-09-09` and re-downloaded anonymously
with its digest verified, as recorded in the [publication Evidence](../evidence/release/nkf-038-nkf-0-81-release-audit.md#authorized-public-publication-and-re-download).
Recommendation and producer promotion are complete under the standing release-completion direction. The
live window is now exactly NKF 0.81 plus NKF 0.8; NKF 0.71 is stepping-stone
history whose next hop is the published 0.8 archive.

The working tree carries the complete implementation of the declared 0.81 state: the accepted companion, evaluation policy, and version
delta under `contracts/nkf/0.81/` with the derived release set and eight
Schemas, the generated `distribution/nkf/0.81/` tree, the `*-0-81` fixtures,
a checker and adopter dispatching exactly 0.81 and 0.8 where a version's
contract set is present — a consumer install carries only the 0.81 set — and
the public projection teaching 0.81. The 0.71 contract and distribution copies left the
working tree with this release; the published 0.71 archive
`3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13` remains the
complete authority for repositories that declare it.

### What NKF 0.81 Adds

The following describes the adopted direction and released implementation. The P1 repair replaces reconstruction from the claimed closure
with independently bound predecessor history and exact closure verification.
Its regression and exact producer exercise are proven, and the corrected
release bytes are technically confirmed and publicly published.

NKF 0.81 is a full successor to 0.8 under the major-minor coordinate model,
exactly as 0.71 was to 0.7, and the 0.8-to-0.81 upgrade is non-breaking. The
per-rule version delta declares two hundred fifteen identical rules and two
semantically-new rules, neither in a judgment-dependency list, so every existing review
judgment carries by digest identity and the producer promotion is provable on
the delta claim alone. The version realizes the seven confirmed boundaries:

1. The recommended-release catalog is the closed contract
   `nkf.recommended-release` with its own Schema, validating the catalog only
   and excluded from project schemas. Its channel vocabulary is
   `internal-exact-candidate`, the historical
   `internal-private-github-prerelease` that a catalog through 0.8 may state
   and a 0.81 catalog may not, `public-github-prerelease`, and
   `public-github-release`; the two public values carry release visibility
   `public`, and NKF 0.81 publishes as a prerelease.
2. The adopter resolves the catalog from the raw default-branch URL of
   `NourdApS/Nourd.NKF` and the archive from the release asset URL the catalog
   carries, over plain HTTPS with Node's own fetch, refusing any digest or
   canonical-URL mismatch before mutation. No Github CLI is invoked and no
   fallback exists; the offline path with an explicit recommendation and
   archive is unchanged.
3. The adoption protocol states, before its first command, where a consumer
   obtains `tools/nourd-nkf-adopt.mjs` and how its digest is verified against
   the publication manifest and the recommended adopter digest.
4. The public projection describes a public release, corrected at its
   version-neutral source and regenerated.
5. The Specification owns a closed registry of exactly three volatile
   operating-system basenames — `.DS_Store`, `Thumbs.db`, `desktop.ini` — that
   onboarding inspection records with a `volatile` classification and the
   sealed drift digest excludes, at any depth, for regular files only, with no
   globs, no project-declared additions, and no deletion. `.gitignore` is not
   an authority for that boundary.
6. The ten frozen supporting Realizations retired to Git history, as stated
   above.
7. The checker recomputes the delta-review closure with the evaluation
   policy's impact propagation and refuses a claim whose recorded closure
   differs, through the one added registry rule
   `freshness.claim.computed-closure-not-reproduced`. The seal computes the
   same propagated closure, so the seal and the checker cannot drift apart
   again; the missing propagation is how eight versions of frozen Realizations
   escaped re-review, as
   [ADR 0139](../decisions/0139-adopt-the-delta-closure-propagation-repair.md)
   records.

### What The Live Implementation Realizes

Markdown is normative human authority. Each executable YAML companion is its
version's digest-bound mechanical representation, each Schema a closed
structural derivation, and the checker dispatches trusted exact contract sets
per declared version behind one exhaustive per-version capability table that
fails closed for any unsupported version, profile, extension, or source
binding.

A native record's Markdown frontmatter carries only common orientation plus
`id` and `type`; lifecycle, governance, ownership, relationships, freshness,
and confirmation live in the record's YAML declaration. Preserved predecessor
sources may retain inert mutable keys only through an exact `legacy_lock`, and
the first native edit of such a source must supply a valid native envelope
before it may be re-pinned. Every record and common document has a stable
lifecycle-neutral identity and a stable source path beside its mutable path.

Deterministic commands own mechanics only. `repin`, `linkify`, `refs`, `set`,
`task`, `migrate`, and the `record` and `review` scaffolds mutate declarations,
navigation, and digests structurally, verify their required postconditions,
report a zero-change result truthfully, and roll back rather than report false
success. They supply no meaning, judge no prose, and accept nothing.

Knowledge freshness is a deterministic graph: stable nodes with typed authored
edges are normalized into an exact graph revision; a digest-bound reviewed
baseline bound to the evaluation policy and the version delta records what a
whole-root or delta semantic review judged; change-impact evaluation reports
the edited graph not ready until a completed review seals a replacement
baseline; delta reviews close over the changed inputs and their propagated
impact; every seal writes an immutable receipt. Carried judgments are
prefilled from the predecessor by digest identity and the computed required
fresh set is left to a named reviewer.

Every version-bearing guidance member — protocols, portable skills, host
adapters — is derived by `scripts/generate-guidance.mjs` from the one
version-neutral source under `guidance-source/`, with the version injected and
no emitted member an input to producing another. The generator rejects any bare
version literal in the source, refuses to write into a published tree, and in
check mode compares the adopted roots and unpublished release trees while
reporting the frozen members it does not re-derive. A guidance file's own
frontmatter description is a checked conformance position, the pre-cut
whole-set guidance review is bound to the enumerated release set with each
recorded digest equal to the reviewed bytes, and the version-label verifier
checks the self-description across the live and distributed trees.

One public subcommand-free Adopt operation resolves the governed recommended
catalog, verifies the executing adopter and exact archive against it, observes
the bundle and installed pin, classifies the compatibility boundary relative
to the declared predecessor, requires explicit repository-owner approval for a
breaking migration, applies transactionally, and returns exactly one of
`onboarded`, `updated`, or `current`; the `migrated` outcome exists for a
breaking in-window predecessor and is unreachable while every in-window
compatibility is non-breaking, as it is at 0.81. A repository outside the live
window stops fail-closed and is told the exact published stepping-stone archive
for its next hop.

Initial onboarding is agent-led: a participating agent reviews the complete
repository, records its assessment and applicable human confirmation in the
plan, sealing binds exact mechanics including the volatile registry, and the
public Adopt resolves the sealed plan into exact knowledge, native
declarations, and the installed authoring boundary only after a complete
staged project passes, with complete rollback otherwise.

Enforcement is layered. `npm run nkf:check` runs the installed pinned adopter's
check first and then the exact preserved producer host gate; the checked-in
exact-commit Github workflow invokes the same command; and `master` is
protected as
[ADR 0137](../decisions/0137-confirm-the-protected-merge-gate.md) confirms.
Validation and conformance accept nothing.

Apache-2.0 licensing covers the complete repository: the root `LICENSE` is the
unmodified official text, the root `NOTICE` the exact approved attribution,
`THIRD_PARTY_NOTICES.md` the compatible attributions reproduced from the exact
bundled checker and adopter build graphs, and package metadata declares SPDX
identifier `Apache-2.0` with the `NourdApS/Nourd.NKF` repository URL. The
repository has been public since `2026-09-08` under
[ADR 0136](../decisions/0136-adopt-the-public-repository-direction.md).

### Lineage

| Version | Owning Tasks | Authority accepted by | Candidate confirmed by | Published archive SHA-256 | Standing today |
| --- | --- | --- | --- | --- | --- |
| 0.1 | [NKF-008](../tasks/items/NKF-008-publish-and-onboard-consumers.md), [NKF-010](../tasks/items/NKF-010-governed-frontmatter-adoption.md), [NKF-011](../tasks/items/NKF-011-enforce-nkf-contracts.md), [NKF-013](../tasks/items/NKF-013-initial-greenfield-onboarding.md), [NKF-015](../tasks/items/NKF-015-agent-led-initial-onboarding.md), [NKF-017](../tasks/items/NKF-017-complete-portable-onboarding-topology.md) | [ADR 0057](../decisions/0057-current-system-realization.md) and the imported Nourd Studio acceptance | [ADR 0059](../decisions/0059-confirm-governed-frontmatter-realization.md), [ADR 0061](../decisions/0061-confirm-layered-contract-enforcement-realization.md), [ADR 0066](../decisions/0066-confirm-release-documentation-and-adoption.md), [ADR 0068](../decisions/0068-confirm-initial-greenfield-onboarding.md), [ADR 0070](../decisions/0070-confirm-agent-led-initial-onboarding.md), [ADR 0075](../decisions/0075-confirm-complete-portable-onboarding-topology.md) | Git history and the 0.1 release archives | Out-of-window immutable history; sources retired from the tree |
| 0.2 | [NKF-019](../tasks/items/NKF-019-decision-applicability-gate.md), [NKF-020](../tasks/items/NKF-020-version-release-adoption-and-compatibility-process.md) | [ADR 0081](../decisions/0081-accept-nkf-0-2-authority-pair.md), [ADR 0104](../decisions/0104-accept-the-cancelled-state-pair.md) | [ADR 0105](../decisions/0105-bind-the-cancelled-state-release-checker.md), [ADR 0106](../decisions/0106-confirm-the-complete-set-release-correction.md), [ADR 0108](../decisions/0108-confirm-the-unified-adopt-realization.md) | `423b56fd...8198d5`, then `015a922d...a51f` | Out-of-window immutable history |
| 0.3 | [NKF-023](../tasks/items/NKF-023-release-nkf-0-3-with-immutable-freeze-and-proven-self-adoption.md) | [ADR 0110](../decisions/0110-accept-the-nkf-0-3-authority-pair.md) | [ADR 0111](../decisions/0111-confirm-the-nkf-0-3-release-candidate.md) | `34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4` | Out-of-window immutable history |
| 0.4 | [NKF-024](../tasks/items/NKF-024-release-nkf-0-4-dependency-security-maintenance.md) | [ADR 0113](../decisions/0113-accept-the-nkf-0-4-authority-pair.md) under [ADR 0112](../decisions/0112-allocate-nkf-0-4-security-maintenance.md) | [ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) | `a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd` | Out-of-window immutable history |
| 0.5 | [NKF-026](../tasks/items/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md) | [ADR 0119](../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md) | [ADR 0120](../decisions/0120-confirm-the-nkf-0-5-release-candidate.md) | `e46779333951c1bbfe262d73b45b2c2fa4dd1f0d97ca50c9cc5f60a7b79f99d9` | Out-of-window immutable history; frozen with its record re-pinning defect |
| 0.6 | [NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md) | [ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md) | None; the recorded ordering exception | `b0822199c1ddb4ea9de14e4c005edf77b44f9c60a6005689505ab00436dd4c95` | Out-of-window immutable history; a 0.6 repository steps through the 0.7 archive |
| 0.7 | [NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md), [NKF-029](../tasks/items/NKF-029-adopt-the-producer-to-published-nkf-0-7.md) | [ADR 0128](../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md) | [ADR 0129](../decisions/0129-confirm-the-nkf-0-7-release-candidate.md) | `c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` | Out-of-window immutable history; a 0.7 repository steps through the 0.71 archive |
| 0.71 | [NKF-031](../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md), [NKF-032](../tasks/items/NKF-032-adopt-the-producer-to-published-nkf-0-71.md) | [ADR 0131](../decisions/0131-accept-the-nkf-0-71-authority-set.md) | [ADR 0132](../decisions/0132-confirm-the-nkf-0-71-release-candidate.md) | `3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13` | Stepping-stone history through the published 0.8 archive |
| 0.8 | [NKF-033](../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md), [NKF-035](../tasks/items/NKF-035-adopt-the-producer-to-published-nkf-0-8.md) | [ADR 0134](../decisions/0134-accept-the-nkf-0-8-authority-set.md) | [ADR 0135](../decisions/0135-confirm-the-nkf-0-8-release-candidate.md) | `2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5` | Live-supported predecessor; previous producer adoption retained as history |
| 0.81 | [NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md) | [ADR 0142](../decisions/0142-accept-the-bound-predecessor-repair.md), final artifact selection [ADR 0143](../decisions/0143-bind-the-predecessor-repair-promotion.md) | [ADR 0144](../decisions/0144-confirm-the-repaired-nkf-0-81-candidate.md) | `a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3`, confirmed and publicly published | Published, recommended, and producer-adopted; anonymous archive re-download verified |

Each version's acceptance and confirmation Decisions remain immutable
provenance; a successor supersedes only the predecessor's current-release
selection, never its bytes or its other conclusions. ADRs 0054 through 0075
remain 0.1 predecessor provenance rather than current format authority, and the
failed or superseded acceptance attempts recorded as Evidence or as superseded
Decisions supply no authority. The publication, adoption, and audit Evidence
named by each Task owns the time-bound observations.

The lineage carries four lessons the current implementation embodies. The
published 0.5 `repin` assumed key adjacency, reported success with zero record
updates, and left a changed digest stale; because publication had frozen the
set, 0.6 was the corrective successor, and structural mutation with verified
postconditions has been the rule since. NKF 0.6 was published before any
technical-confirmation Decision existed, by explicit Human Product Owner
choice, because its prepublication lock made recording one impossible; 0.7
made the audit-bound confirmation Decision mandatory before publication and no
successor has waived it. The 0.7 promotion applied this record's identity
succession and the one deliberate stable-path neutralization, and 0.71 was the
small corrective successor that stated the reconciled realizations topology
explicitly and corrected its version labels. NKF 0.8 moved every
version-bearing guidance member behind one generator and made a guidance file's
self-description a checked position, because the 0.71 guidance review had
passed with a stale description; the three verifiers it added join the
producer chain at 0.8 and no earlier version because the installed pin
byte-locks that chain. NKF 0.81 exists because the repository became public
while its adopters still validated a private channel literal in frozen bytes,
and because a delta review whose closure omitted impact propagation let frozen
records read as current.

## Durable Mapping

The current repository topology is:

```text
Canonical Specification
        ↓ exact semantic derivation
Executable YAML Contract + Evaluation Policy + Version Delta
        ↓ closed structural derivation
JSON Schemas
        ↓ loaded by
Native Checker And CLI
        ↓ validates
Project-Root .nourd Bundle + Knowledge Sources + Governed Artifacts
        ↓ emits
Latest Validation Result

Stable Record And Common Document Nodes
        ↓ normalized with typed authored edges and policy
Deterministic Knowledge Graph Revision
        ↓ bounded by exact baseline, changed inputs, and propagated impact
Impact Set + Simultaneous Freshness Results + Immutable Receipt

Authored Governed Source Change
        ↓ structural declaration mutation with required postconditions
Transactional Repin | Linkify | Task Transition Or Complete Rollback
        ↓ change-impact evaluation
Delta Or Whole-Root Semantic Review + Resealed Reviewed Baseline

Version-Neutral Guidance Source
        ↓ generated per version with the version injected
Neutral Protocols + Portable Skills + Host Adapters
        ↓ hands off to
npm run nkf:check
        ↓ reused by
Exact-Commit Github Workflow + Protected master

Audited Checker + Exact Authority Inputs + Repository Licensing Set
        ↓ packaged from the derived release set as
Content-Addressed Release Archive
        ↓ named by the governed catalog and fetched over plain HTTPS by
Public-Safe Pinned Adopter
        ↓ accompanied by
Allowlisted Public Documentation Projection

Governed Recommended Release + Supported Repository State
        ↓ resolved by one public subcommand-free operation
Adopt Preflight + Compatibility Signal + Required Human Approval
        ↓ selects internal path and validates the complete candidate
Onboarded | Updated | Current Exact Consumer Pin

Unadopted Empty Or Tiny Knowledge Repository
        ↓ complete agent review and applicable human confirmation
Mechanical Project Capture + External Candidate Workspace
        ↓ resolved assessment, volatile registry, and Markdown representations
Deterministically Sealed Onboarding Plan
        ↓ complete topology generation and staged check
Draft NKF Candidate Or Complete Rollback
```

| Component | Durable Location | Current State | Confirmation |
| --- | --- | --- | --- |
| NKF 0.81 authority (adopted current version) | `knowledge/specifications/nkf-0.81.md`, `contracts/nkf/0.81/nkf.yaml`, `contracts/nkf/0.81/freshness-policy.yaml`, `contracts/nkf/0.81/version-delta.yaml`, `knowledge/evidence/release/nkf-0.81-producer-promotion.yaml` | Exact accepted five-artifact set: the recommended-release catalog contract and channel vocabulary, the volatile-metadata registry, the checker's closure recompute obligation, the window slide, and the 0.8-to-0.81 delta of two hundred fifteen identical rules and two semantically-new rules; the producer promotion has created the native accepted Specification record | Predecessor-proof semantics accepted by [ADR 0142](../decisions/0142-accept-the-bound-predecessor-repair.md), with final artifact bindings selected by [ADR 0143](../decisions/0143-bind-the-predecessor-repair-promotion.md); the corrected implementation is confirmed by [ADR 0144](../decisions/0144-confirm-the-repaired-nkf-0-81-candidate.md) |
| NKF 0.8 authority (supported predecessor) | `knowledge/specifications/nkf-0.8.md`, `contracts/nkf/0.8/nkf.yaml`, `contracts/nkf/0.8/freshness-policy.yaml`, `contracts/nkf/0.8/version-delta.yaml` | Exact accepted predecessor authority retained beside the adopted 0.81 contract | Accepted by [ADR 0134](../decisions/0134-accept-the-nkf-0-8-authority-set.md), confirmed by [ADR 0135](../decisions/0135-confirm-the-nkf-0-8-release-candidate.md) |
| Derived implementation | `contracts/nkf/0.81/schemas/`, `contracts/nkf/0.8/schemas/`, `src/checker/`, `src/cli.ts`, `scripts/freshness/`, `scripts/adoption/`, `scripts/onboarding/`, `fixtures/`, `test/` | All 217 accepted 0.81 rules with test coverage, exact 0.81 and 0.8 bindings, eight derived Schemas, bound predecessor history and independently reproduced closure, native HTTPS acquisition, volatile-metadata handling, and host integration at revision five | Exact corrected release implementation confirmed at `fa0efa05` by [ADR 0144](../decisions/0144-confirm-the-repaired-nkf-0-81-candidate.md); acceptance remains with the authority set |
| NKF 0.81 release realization | `contracts/nkf/0.81/release-set.yaml`, `distribution/nkf/0.81/`, `scripts/release/`, `public-docs/` | Complete 142-member set, fully reviewed guidance, public projection, and exact archive `a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3`; 141 source members reproduced from `fa0efa05` and isolated producer adoption proven | Exact bytes confirmed by [ADR 0144](../decisions/0144-confirm-the-repaired-nkf-0-81-candidate.md); publication and anonymous re-download verified; recommendation and live producer promotion completed |
| NKF 0.8 release realization | Git history, `distribution/nkf/0.8/`, and the published archive | Published historical exact 141-member archive `2714fb48...699d5` with checker `52d491cc...5985a` and adopter `5e328808...d58d85`; its frozen distribution tree stays in the working tree as the live-supported predecessor's process copies | Confirmed by [ADR 0135](../decisions/0135-confirm-the-nkf-0-8-release-candidate.md); publication and adoption recorded in [producer adoption Evidence](../evidence/release/nkf-035-nkf-0-8-producer-adoption.md) |
| NKF 0.71 and earlier | Git history and their immutable published archives | The released 0.81 tooling treats these versions as stepping-stone history and names the exact next archive. The frozen published 0.8 tooling still dispatches 0.71 under its own historical compatibility contract; that does not change the published 0.81-plus-0.8 support window. Their working-tree contract and distribution copies were removed by the governed predecessor cleanups, 0.71's with this candidate | Their accepting and confirming Decisions in the lineage table remain immutable provenance |
| Recommended-release catalog | `release/recommended.json` | Selects the published 0.81 archive and states `public-github-prerelease` with visibility `public` and is validated against the accepted catalog Schema | Promotion is a governed human act; the verifier derives every expectation from the accepted release set and catalog contract |
| Repository licensing set | `LICENSE`, `NOTICE`, `THIRD_PARTY_NOTICES.md`, `package.json` | Unmodified official Apache License 2.0, the exact approved informational NOTICE, third-party notices reproduced from the exact bundled build graphs, SPDX identifier `Apache-2.0` | Verified by the governed build-graph verifier; licensing is repository content and grants no trademark, support, acceptance, or Governing Use |
| Checker library and CLI | `src/checker/`, `src/cli.ts`, `dist/nourd-nkf-checker.mjs` | Exact 0.81 and 0.8 bindings; installed and confirmed 0.81 checker `1a268c93d9f484389885c02336ebd8464718967249036e79de03ddf7cd775008` | Reproduced deterministically by `npm run verify:build` |
| Consumer adopter | `dist/nourd-nkf-adopt.mjs`, `.nourd/tools/nkf/nourd-nkf-adopt.mjs` | Installed and confirmed 0.81 adopter `12272609c5d0ca7bcc6d5bc67b919f86f1dfee1a1d53409f10549e419c32ffa5` uses native HTTPS, validates catalog and archive bindings, preserves predecessor history, and routes the non-breaking upgrade | Reproduced deterministically by `npm run verify:adopter`; installed bytes match the published archive and confirmation |
| Guidance source and emitted guidance | `guidance-source/`, `integrations/`, `.claude/`, `.agents/`, `distribution/nkf/0.81/`, `distribution/nkf/0.8/` | One version-neutral source; the adopted roots emitted at the declared 0.81 version, the 0.81 release tree emitted at 0.81 with the adopter-obtaining step and public-release statements, the 0.8 tree frozen by publication and skipped by the generation check with a note | Verified by `npm run verify:guidance-generation`, `verify:agent-guidance`, `verify:onboarding-guidance`, `verify:guidance-review`, and `verify:version-labels` |
| Agent guidance integration | `AGENTS.md`, host adapters, portable skills, registry, verifier | Twelve explicit host surfaces plus the producer-only Task-authorization policy; exact registered bindings verified at the declared version | Verified by `npm run verify:agent-guidance`; acceptance and confirmation remain separate |
| Self-host declaration and release pin | `.nourd/knowledge/`, `.nourd/nkf-release.json`, `.nourd/tools/nkf/` | Adopted 0.81 Technology bundle pinned to archive `a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3` under `NourdApS/Nourd.NKF` with host-superset integration at revision five; repeat Adopt reports current | Pinned state is observed by `npm run nkf:check:pinned`; exact published pin and recommendation verified |
| Reviewed graph baseline | `.nourd/knowledge/freshness/baseline.yaml` | Digest-bound reviewed baseline under `nkf.freshness-policy.0.81` and the accepted 0.8-to-0.81 delta, with exact predecessor history, verified carry, and independently reproduced propagated closure | Sealing verifies conformance and exact ready graph revision; it records review, not acceptance |
| Project enforcement command and workflow | `package.json`, `.github/workflows/nkf-contracts.yml` | Canonical pinned-first `npm run nkf:check` followed by the exact producer host gate; the workflow invokes the same command with complete Git history | Runtime behavior observed per commit; Github owns run state |
| Protected merge gate | Github branch protection on `master` | Required strict exact-commit `Validate` check enforced for administrators, pushes restricted to the Human Product Owner, force pushes and deletion disallowed | Confirmed at its exact revision by [ADR 0137](../decisions/0137-confirm-the-protected-merge-gate.md) from Github's report |
| Initial onboarding | `scripts/onboarding/`, `integrations/onboarding/`, portable onboarding skills | Agent-led Empty and Tiny Knowledge assessment, sealing with the three-name volatile registry, transaction, rollback, and reviewed native graph baselining beneath public Adopt | Exercised by the adopter suite; no consumer has been onboarded |
| Public documentation | `public-docs/`, `scripts/build-public-docs.mjs`, `scripts/verify-public-docs.mjs` | The sixty-two-file projection teaching exactly NKF 0.81: the Specification mirror, the public adopter, two complete conformant examples, and guides describing a public release adopted over HTTPS | Verified by `npm run verify:public-docs`; exact public docs projection published and independently verified |
| Consumer exercise | `.github/workflows/nkf-consumer-adoption.yml`, tests, audit Evidence | Non-breaking 0.8-to-0.81 update proven on the delta claim alone against an isolated real-producer copy, pinned-current, stepping-stone refusal, rollback, and tamper rejection | Local runtime behavior audited; a successor workflow run remains separate |
| Latest result | `.nourd/validation-result.json` | Persists the latest full-bundle observation for the declared 0.81 state and may become stale after any governed input changes | Conformance observation only |

## Responsibilities And Ownership Boundaries

The canonical Specification owns normative meaning. The executable YAML
represents that meaning mechanically. Schemas enforce local closed shapes.
The checker owns deterministic project, source, graph, record-contract,
security, authority-binding, closure, and result behavior assigned to it by
the accepted contract.

The `.nourd` declaration represents this repository as one Technology bundle;
it does not accept the Markdown or infer Design disposition, section meaning,
relationships, Task state, Evidence classification, or confirmation from
paths and filenames.

Deterministic commands own mechanics only. The semantic acts — truthfulness,
gate classification, readiness, review, acceptance, and confirmation — remain
with their human or explicitly delegated authority. The Human Product Owner
owns every Product boundary, publication, recommendation, promotion, and the
merge to `master`; the Claude technical reviewer acts under the delegation each
Task records.

This Realization owns a navigable implementation account. It does not compete
with the Specification, decide a Design disposition, accept knowledge, or
turn a passing check into confirmation.

The neutral authoring protocol and adapters guide capable AI surfaces without
becoming model authority. The project command and merge workflow judge exact
candidate bytes without asking an AI to decide conformance.

Apache-2.0 licensing governs the repository's copyright terms only. It
establishes no trademark permission, no support commitment, and no acceptance,
confirmation, or Governing Use of any NKF meaning. Public visibility was a
separate Decision and human act.

## Interfaces Dependencies Locators And Resolution

The native invocation starts at a candidate project root whose direct
`.nourd` entry must resolve safely inside that project. The bundle at
`.nourd/knowledge/bundle.yaml` selects exactly one concrete Root Profile and a
project-contained relative `knowledge_root`.

Record declarations resolve from `.nourd/knowledge/records/*.yaml` to exact
Markdown sources under `knowledge_root` through both a mutable `source.path`
and a stable `source.stable_path`. Technology bundles may additionally bind
project-contained governed artifacts. The checker dispatches trusted exact
contract sets from the accepted authority under `contracts/nkf/0.81/` and the
predecessor under `contracts/nkf/0.8/`. The producer's own bundle and installed
pin select the published 0.81 archive. The installed 0.81
checker does not dispatch 0.71 or earlier; their exact published archives
provide stepping stones. The frozen 0.8 archive retains its historical 0.71 dispatch contract. No earlier contract coordinate changes.

AI-assisted authoring begins from the neutral protocol. Registered host
surfaces resolve it through exact adapters or portable skills. Every handoff
uses `npm run nkf:check`, and the checked-in Github workflow invokes the same
command for the exact candidate commit.

Governed authoring mechanics are performed through the installed adopter at
`.nourd/tools/nkf/nourd-nkf-adopt.mjs`. After an authored source change,
`repin` structurally updates the affected declaration and its digest,
`linkify` rewrites plain same-bundle references into verified deep links inside
the same transaction, and `task` updates stable Task declaration state and
regenerates `tasks/by-state/*.md` without moving canonical Task Markdown.
Change-impact evaluation then reports the edited graph not ready until a
completed delta or whole-root semantic review seals a replacement baseline
whose closure the checker recomputes with the policy's propagation.

Pre-adoption begins with the separate neutral onboarding protocol and external
candidate workspace, and the adoption protocol states first where the adopter
is obtained: `tools/nourd-nkf-adopt.mjs` from the public documentation
repository, verified against the publication manifest and the recommended
adopter digest.

For an adopted repository, public Adopt resolves the governed catalog from the
raw default-branch URL of `NourdApS/Nourd.NKF`, validates it against the
accepted catalog Schema, fetches the archive from the canonical release asset
URL the catalog carries with Node's own fetch, refuses any digest or
canonical-URL mismatch before mutation, and observes the bundle and installed
pin. The historical `kaveh6202/Nourd.NKF` identity is retained only as a
recognized legacy coordinate, so a catalog naming it fails closed. An explicit
recommendation and archive supplied offline bypass the network and nothing
else. The 0.8-to-0.81 update is non-breaking and completes through the
ordinary reviewed delta update; a repository declaring NKF 0.71 or earlier is
outside the live window and is told the exact published
stepping-stone archive for its next hop. The recommendation may move only
through reviewed NKF repository state; the consumer's content-addressed pin
never moves by implication.

Durable repository paths and digests are locators and integrity bindings.
They do not become semantic identity or live operational authority.

## External Authority And Operational State Boundaries

Git owns commits and history. Github owns remote repository, protection, and
Release state. Consumer repositories own their knowledge, declarations,
acceptance, migrations, and operational use. The latest validation result
records one observed snapshot and may become stale immediately after an input
changes. This Realization records the durable mechanism and current repository
implementation status, not mutable workflow, process, deployment, account,
permission, health, or execution state.

The repository moved operationally from `kaveh6202/Nourd.NKF` to
`NourdApS/Nourd.NKF`, preserving correct historical references unchanged. It
was private until `2026-09-08`, when the Human Product Owner made it public
under
[ADR 0136](../decisions/0136-adopt-the-public-repository-direction.md); its
releases are prereleases whose archives download by tag without
authentication, as the
[public repository observation](../evidence/release/nkf-037-public-repository-observation.md)
records. Branch protection on `master` was activated the same day and is
confirmed by
[ADR 0137](../decisions/0137-confirm-the-protected-merge-gate.md) from the
[protected merge gate observation](../evidence/release/nkf-012-protected-merge-gate-observation.md).
Protection is claimed from Github's report, not from the workflow file.

Every release through 0.8 was delivered on its Task branch and merged to
`master` by the Human Product Owner; 0.7 published from its release branch by
explicit authorization before the merge. The 0.81 implementation was merged
by the Human Product Owner and its archive was then published. Their standing
release-completion direction now authorizes the associated recommendation,
producer adoption, public documentation, and required release-completion Git
updates through normal checks. GitHub remains authoritative for their live state.



[NKF-011](../tasks/items/NKF-011-enforce-nkf-contracts.md) and
[NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) are
complete for the deterministic local gate, the exact-commit workflow, and the
protected merge gate.
[NKF-008](../tasks/items/NKF-008-publish-and-onboard-consumers.md),
[NKF-013](../tasks/items/NKF-013-initial-greenfield-onboarding.md),
[NKF-015](../tasks/items/NKF-015-agent-led-initial-onboarding.md), and
[NKF-017](../tasks/items/NKF-017-complete-portable-onboarding-topology.md)
are complete for their confirmed 0.1 predecessor scopes, whose release,
documentation, onboarding, and topology mechanisms the current implementation
carries forward at the live versions; their Evidence owns the time-bound
observations. Acceptance-binding verification remains deferred to
[NKF-016](../tasks/items/NKF-016-deliver-acceptance-binding-verification.md).
The governed catalog recommends exact NKF 0.81, recommendation alone migrates
no consumer, and no external repository has adopted NKF at any version; the
Human Product Owner intends to onboard the first once NKF is ready for public
use.

## Compatibility Verification And Recovery

Verification consists of strict authority-set binding, schema compilation,
type checking, positive and negative fixtures, diagnostic coverage for every
accepted rule identifier, unit and integration tests, deterministic checker
and adopter reproduction, third-party notice reproduction from the exact
bundled build graphs, the five guidance verifiers, the public-projection
verifier, the version-surface inventory, and full-bundle self-validation.

The prior candidate's gate passed every test file of the suite — the release audit
records the exact counts at each cut — with every checked living link
resolving and zero dead links, deterministic checker and adopter
reproduction,
third-party notice reproduction, the complete 62-file public projection,
and full-bundle
self-validation with zero diagnostics, with knowledge-proportional test bounds
and child-process reaping. Its coverage exercises every accepted 0.81 rule
identifier including the closure recompute rule, the seal's propagated closure
and the checker's refusal of a recorded closure that differs, the catalog
contract with every channel value and the refusal of the historical channel
on a 0.81 catalog, HTTPS resolution with digest and canonical-URL mismatch
refusal and no Github CLI on the path, the volatile registry at depth with
non-registry entries still protected, guidance generation from the
version-neutral source with the frozen-tree skip, the digest-bound baseline
with forged-carry refusal, the non-breaking 0.8-to-0.81 upgrade from the exact
published 0.8 archive proven on the delta claim alone, stepping-stone refusals
naming the exact next archives, both producer promotion stages against
isolated copies of this repository, the review and record scaffolds, and the
Git transition orchestration as operational output. The isolated exercise of
the exact 0.81 candidate against a copy of this producer is recorded in the
[release audit](../evidence/release/nkf-038-nkf-0-81-release-audit.md); it is
a runtime observation, not confirmation of this account. Those tests did not
detect the later reproduced closure defect, and their passing result does not
resolve it. The added source-derived P1 regression seals an actual changed
Product and propagated Realization, then checks tampered closures, carried
judgments, history files, and a later chain link.

The original HTTPS test supplied local files through a substituted fetch
function. The subsequent controlled test leaves native fetch unchanged,
routes the three test hosts' TLS sockets to loopback, verifies the local
certificate and hostnames, follows a cross-host asset redirect, and proves
installation plus certificate and archive-digest refusals before mutation.
This is controlled runtime evidence, not a live public 0.81 adoption claim.
The [follow-up audit Evidence](../evidence/release/nkf-038-nkf-0-81-release-audit.md)
records that distinction and the subsequent delegated P1 repair.

Historical gate results — from the 15-file predecessor baseline under
[ADR 0059](../decisions/0059-confirm-governed-frontmatter-realization.md)
through the 29-file, 268-test NKF 0.8 gate — are owned by the completion
audits, release audits, and publication Evidence each Task names; none of them
describes the current tree.

Recovery uses Git history, immutable Decision and Evidence provenance,
predecessor digests, explicit successor Decisions, deterministic rebuilding,
and deliberate consumer migration. A failed validation blocks a conformance
claim; it does not revoke prior acceptance or silently change NKF meaning. A
published defect is never repaired in place: NKF 0.5 remains frozen with its
re-pinning defect and 0.6 is its accepted successor; the historical 0.8 catalog retains its private literal in history, while
the current 0.81 recommendation states the accepted public channel.
