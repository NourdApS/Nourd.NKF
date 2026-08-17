---
id: nkf-current-system
type: realization
title: NKF Current System
summary: This is the consolidated current-system Realization for the Nourd Knowledge Format repository, now reconciled to the accepted, technically confirmed, published, recommended, and ordinarily producer-adopted NKF 0.7 release under its governed identity succession.
created_at: 2026-07-30T15:59:54Z
---

# NKF Current System

## Realization Identity And Kind

This is the consolidated current-system Realization for the Nourd Knowledge
Format repository. It is the normal entry point for understanding how
accepted NKF meaning is implemented.

It consolidates architecture, topology, components, relationships,
interfaces, artifact mappings, implementation status, confirmation status,
and relevant Decision provenance. It is not a separate lifecycle layer,
normative authority, generated validation result, or copy of live operational
state.

The stable record identity is `nkf-current-system`, established by the one
governed identity succession the accepted NKF 0.7 authority declares and the
0.7 producer promotion applied: the predecessor identity
`nkf-0.1-native-realization` remains permanently resolvable as history, and
the stable source path remains `realizations/current-system.md`.

This record was an `immutable` predecessor snapshot while the producer ran
published NKF 0.4 and NKF 0.5. On `2026-08-14`, after ordinary public NKF 0.6
producer self-adoption, the Human Product Owner explicitly confirmed
converting it to `living` while retaining that stable identity, that stable
path, its `draft` status, its prior confirmation history, and its explicitly
unconfirmed scope. The conversion changes the record's governed lifecycle, not
its identity, and it does not confirm the account below. Its declared
confirmation status remains `partially-confirmed`.

## Governed Meaning Realized

The producer declares, pins, and installs published NKF 0.7, and the governed
recommendation selects the same NKF 0.7 release. The derived implementation
dispatches the accepted NKF 0.7 contract and the one live-supported NKF 0.6
predecessor for the same Product and Technology Root Profiles; NKF 0.1
through 0.5 remain immutable history reachable through their published
stepping-stone archives rather than live checker dispatch. Markdown remains
normative human authority and each executable YAML remains its
version-specific digest-bound companion.

The current exact authority set is accepted through
[ADR 0128](../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md):
normative Markdown `knowledge/specifications/nkf-0.7.md` at SHA-256
`6d1c9046...0992`, executable companion `contracts/nkf/0.7/nkf.yaml` at
SHA-256 `9175c86b...1c49`, evaluation policy
`contracts/nkf/0.7/freshness-policy.yaml` with declared judgment
dependencies, the per-rule version delta `contracts/nkf/0.7/version-delta.yaml`,
and the exact producer-promotion input. The native accepted
[NKF 0.7 Specification record](../specifications/nkf-0.7.md) was created by
the live promotion.
[ADR 0129](../decisions/0129-confirm-the-nkf-0-7-release-candidate.md) is the
mandatory audit-bound technical confirmation of the exact release candidate.
The predecessor 0.6 revision 3 set remains accepted through
[ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md):
normative Markdown `knowledge/specifications/nkf-0.6-revision-3.md` at SHA-256
`bb602be3...cb6a`, executable companion
`contracts/nkf/0.6/revision-3/nkf.yaml` at SHA-256 `7366ea12...5e4`, the
unchanged evaluation policy `contracts/nkf/0.6/freshness-policy.yaml` at
SHA-256 `a870dc03...e4a4`, and its exact producer-promotion input.
[ADR 0121](../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md)
adopts the underlying corrective and licensing Design direction.
[ADR 0123](../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md)
accepts the first conformant four-file 0.6 authority set and the ready-0.5
non-breaking classification;
[ADR 0124](../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md)
accepts the revision 2 set. Only their current-release selections are
superseded, in that order, by their exact successors. The failed acceptance
attempt at [ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md)
remains non-record Evidence and supplies no authority.

NKF 0.6 corrects the published NKF 0.5 defect in which native record
re-pinning depended on YAML key adjacency, reported success with zero record
updates, and left a changed record digest stale. Native declaration mutation
is now structural, every deterministic mutation verifies its required
postconditions, transactional rollback and idempotence are enforced, and a
zero-change result is truthful rather than a silent failure. The complete
ordinary native authoring lifecycle is now exercised against an isolated copy
of the real producer before publication rather than after it.

The immutable NKF 0.5 predecessor pair remains accepted through
[ADR 0119](../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md)
and its exact release candidate remains technically confirmed through
[ADR 0120](../decisions/0120-confirm-the-nkf-0-5-release-candidate.md). The
0.4 pair remains accepted through
[ADR 0113](../decisions/0113-accept-the-nkf-0-4-authority-pair.md) under the
bounded maintenance allocation in
[ADR 0112](../decisions/0112-allocate-nkf-0-4-security-maintenance.md) and
confirmed through
[ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md). Its
0.3 predecessor pair remains accepted through
[ADR 0110](../decisions/0110-accept-the-nkf-0-3-authority-pair.md) and
confirmed through
[ADR 0111](../decisions/0111-confirm-the-nkf-0-3-release-candidate.md).
[ADR 0104](../decisions/0104-accept-the-cancelled-state-pair.md)
and [ADR 0105](../decisions/0105-bind-the-cancelled-state-release-checker.md)
remain accepted and confirmed 0.2 predecessor provenance; ADRs 0054 through
0075 remain 0.1 predecessor provenance rather than current format authority.

The predecessor implementation baseline is
[ADR 0057](../decisions/0057-current-system-realization.md). [ADR 0059](../decisions/0059-confirm-governed-frontmatter-realization.md) confirms
the frontmatter implementation and repository migration produced by [NKF-010](../tasks/items/NKF-010-governed-frontmatter-adoption.md).
Confirmation applies only to the exact revisions and artifacts listed by
that Decision; it does not make a release current or verify external
acceptance authority.

[ADR 0060](../decisions/0060-layered-contract-enforcement.md) adopts the
repository integration direction for [NKF-011](../tasks/items/NKF-011-enforce-nkf-contracts.md) without changing normative NKF
0.1 meaning.
[ADR 0061](../decisions/0061-confirm-layered-contract-enforcement-realization.md)
confirms the exact audited local integration and current-system revisions.
[ADR 0062](../decisions/0062-confirm-remote-workflow-activation-boundary.md)
confirms the successor Realization revisions after the workflow was pushed and
observed successfully on its exact commit. It confirms remote workflow
activation, not the unavailable protected merge gate.
[ADR 0063](../decisions/0063-defer-protected-merge-gate.md) completes [NKF-011](../tasks/items/NKF-011-enforce-nkf-contracts.md)
for the delivered enforcement scope, transfers protected-gate activation and
proof to deferred [NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md), and confirms this exact successor account without
claiming that `master` is protected.

[ADR 0064](../decisions/0064-release-documentation-and-adoption.md) adopts the
separate native release, public explanation, and pinned consumer experience.
[ADR 0065](../decisions/0065-confirm-current-release-bound-checker.md)
confirms the exact current checker and release inputs.
[ADR 0066](../decisions/0066-confirm-release-documentation-and-adoption.md)
confirms the audited successor current-system account after the internal
release, public documentation, local consumer path, and remote consumer
workflow were separately observed.

[ADR 0067](../decisions/0067-initial-greenfield-onboarding.md) adopts the
AI-neutral inspect-plan-apply path for empty and small-document Product and
Technology repositories.
[ADR 0068](../decisions/0068-confirm-initial-greenfield-onboarding.md)
confirms the exact successor Realizations after the adversarial completion
audit, clean exact-commit workflows, and fresh public-byte verification were
recorded separately.

[ADR 0069](../decisions/0069-agent-led-initial-onboarding.md) supersedes the
deterministic semantic eligibility portion of [ADR 0067](../decisions/0067-initial-greenfield-onboarding.md). The current
workflow assigns repository assessment to the portable onboarding skill,
requires human confirmation for Category 2, and retains deterministic source
binding, sealing, transaction, and validation.
[ADR 0070](../decisions/0070-confirm-agent-led-initial-onboarding.md) confirms
the exact audited and published [NKF-015](../tasks/items/NKF-015-agent-led-initial-onboarding.md) successor while keeping consumer
onboarding outside the completed Task.

[ADR 0071](../decisions/0071-complete-portable-onboarding-topology.md) adopts
the complete portable Product and Technology topology. [ADR 0072](../decisions/0072-portable-topology-authority-pair.md) accepted its
initial authority pair, and
[ADR 0073](../decisions/0073-correct-portable-topology-diagnostic-registry.md)
accepts the corrected current pair after restoring the omitted topology
diagnostics to the normative Markdown registry.
[ADR 0074](../decisions/0074-separate-authoring-and-recommended-release-verification.md)
separates unreleased current-snapshot authoring validation from explicit
recommended-release verification without weakening release review.
[ADR 0075](../decisions/0075-confirm-complete-portable-onboarding-topology.md)
confirms the exact audited [NKF-017](../tasks/items/NKF-017-complete-portable-onboarding-topology.md) successor without publishing it.

Under [NKF-019](../tasks/items/NKF-019-decision-applicability-gate.md),
ADRs 0076 through 0081 adopted versioned contract evolution and the Decision
Applicability Gate, allocated the breaking correction as NKF 0.2, kept
release process outside format meaning, and accepted the first 0.2 pair.
Review-driven correction rounds under the recorded unconsumed-release
exception then added record authority and identity-bullet rules, restored
required heading-equal titles, enforced same-bundle deep links, and moved
Design orientation into frontmatter. [ADR 0103](../decisions/0103-branch-carried-task-life-and-cancelled-state.md)
later added branch-carried Task life and the official terminal `cancelled`
state; [ADR 0104](../decisions/0104-accept-the-cancelled-state-pair.md) accepts
the current pair and [ADR 0105](../decisions/0105-bind-the-cancelled-state-release-checker.md)
binds its deterministic checker.

The 159-rule 0.2 set introduced the gate, heading-equal titles, deep links,
and the four Task states, and retired 0.1 sources to Git history and immutable
release archives. A later audit found that the 0.2 archive from commit
`f39c7f9` omitted already-required adopter, host-adapter, fixture, example,
and documentation-projection members. [NKF-020](../tasks/items/NKF-020-version-release-adoption-and-compatibility-process.md) corrects that
release-tooling defect by making one 132-member pre-manifest enumeration feed
the archive builder, verifier, public-doc verifier, and adopter `set` command.
[ADR 0106](../decisions/0106-confirm-the-complete-set-release-correction.md) confirms the exact independently audited correction at commit
`3d6ea93`. The corrected archive is published and deliberately recommended at
SHA-256 `423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5`;
the [publication Evidence](../evidence/audits/nkf-020-release-publication.md) owns the remote, time-bound observations. That account remains
partially confirmed because publication does not confirm later operational
facts.

[ADR 0107](../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md)
accepts one public subcommand-free Adopt operation and the
predecessor-relative compatibility boundary. [ADR 0108](../decisions/0108-confirm-the-unified-adopt-realization.md)
confirms its independently audited technical implementation at exact commit
`7eefe7d` and candidate archive SHA-256 `015a922d...a51f`: recommendation resolution, exact target
and compatibility reporting, breaking approval before 0.1 mutation, internal
state routing, predecessor-safe verification, complete topology repair during
migration, atomic application, and the public states `onboarded`, `migrated`,
`updated`, and `current`. The accepted NKF 0.2 authority pair and checker bytes
do not change. At the confirmation checkpoint, release and public publication
still required separate operational observation. The exact archive was subsequently published,
independently re-downloaded byte-identically, strictly verified, and promoted
as the governed recommendation at SHA-256 `015a922d...a51f`; the
[publication Evidence](../evidence/audits/nkf-020-unified-adopt-publication.md)
owns those time-bound facts. Public-documentation republication remains
separate from confirmation and was subsequently observed at exact public
commit `8c61d76`; the
[public-documentation Evidence](../evidence/audits/nkf-020-unified-adopt-public-documentation.md)
owns the independent fresh-clone, example, and default Adopt observations.

[ADR 0109](../decisions/0109-publication-freeze-and-proven-self-adoption.md)
adopts the NKF 0.3 publication-triggered freeze, exact-candidate self-adoption,
producer-compatible host-superset integration, and breaking 0.1-to-0.3 plus
0.2-to-0.3 migration boundaries. [ADR 0110](../decisions/0110-accept-the-nkf-0-3-authority-pair.md)
accepts the exact NKF 0.3 normative Markdown at SHA-256
`0094bedc...8436e` and executable companion at SHA-256
`e988a596...f4d27f`. [ADR 0111](../decisions/0111-confirm-the-nkf-0-3-release-candidate.md)
confirms release source `8a06564e...`, checker `804c082c...`, adopter
`9e20219d...`, and archive `34bd7463...` after complete independent audit.

That exact archive is published and was recommended in its time. It contains
135 members across 18 closed classes, including four 0.3 Schemas, multi-version
checker dispatch, Product and Technology fixtures, one strict release set and
manifest, versioned protocols, portable guidance, host adapters, and the
63-file public projection. Ordinary public Adopt migrated this producer,
installed its content-addressed pin, preserved the stronger validation chain,
and returned `current` on repeat. The first post-action audit found that an
ignored governed build artifact was absent from pristine checkouts; corrected
producer commit `6805d6b...` tracks the exact frozen adopter mirror and passed
the complete fresh re-audit retained as
[producer-adoption Evidence](../evidence/audits/nkf-023-nkf-0-3-producer-adoption-audit.md).
That producer-only correction changes no frozen 0.3 byte.

Under [NKF-024](../tasks/items/NKF-024-release-nkf-0-4-dependency-security-maintenance.md),
the 0.4 release derives a 136-member, 18-class complete set from the accepted
maintenance pair, locks patched `fast-uri` and `nanoid` versions, retains the
single public Adopt operation, and adds an atomic non-breaking 0.3-to-0.4
version update that preserves the consumer knowledge tree and stronger host
integration. Independent fresh audit reproduced and exercised the exact
release-commit implementation and archive, which
[ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) confirms.
That exact archive is published and was ordinarily adopted by this producer in
its time. The
[publication Evidence](../evidence/audits/nkf-024-nkf-0-4-publication.md) and
[producer-adoption Evidence](../evidence/audits/nkf-024-nkf-0-4-producer-adoption-audit.md)
own the time-bound remote and installed-state observations.

Under [NKF-026](../tasks/items/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md),
[ADR 0119](../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md)
accepts the exact revision 2 Markdown, executable companion, and unchanged
freshness policy after a restarted independent clean audit. The first
accepted prepublication pair remains immutable historical provenance under
[ADR 0116](../decisions/0116-accept-the-nkf-0-5-authority-pair.md); two failed
technical acceptance attempts remain non-record Evidence and supply no
authority. The derived 0.5 implementation added closed document declarations,
stable source paths, generated lifecycle navigation, deterministic graph
revisions and impact closure, reviewed baselines, simultaneous freshness
results, immutable receipts, strict predecessor migration, and a two-stage
semantic-review boundary. Its exact release commit `777ea9a3...` and private
archive `e4677933...f99d9` were independently audited, technically confirmed by
[ADR 0120](../decisions/0120-confirm-the-nkf-0-5-release-candidate.md),
published, and byte-identically re-downloaded, as recorded in
[publication Evidence](../evidence/audits/nkf-026-nkf-0-5-publication.md).

Ordinary public NKF 0.5 producer adoption then completed and immediately
exposed the published re-pinning defect: the first required post-adoption
native record edit could not be re-pinned, because the released `repin`
implementation assumed that a native record declaration places `source.digest`
directly after `source.path` while native NKF 0.5 correctly inserts
`source.stable_path` between them. Publication had already frozen the complete
0.5 set, so the defect could not be repaired in place. That failure, not a
consumer report, is the evidence origin of NKF 0.6.

Under [NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md),
the same Task owns both the corrective successor and NKF-only preparation for
standard, unmodified Apache License 2.0 coverage of the complete repository.
The [licensing preparation assessment](../evidence/audits/nkf-027-open-source-licensing-preparation-assessment.md)
classifies repository-owned and third-party material, dependency licenses,
package metadata, private-release and authenticated-adoption assumptions, and
every historical repository-reference occurrence. The bounded
[0.5-to-0.6 compatibility Evidence](../evidence/audits/nkf-027-nkf-0-5-to-0-6-compatibility-proof.md)
records exact fixture updates, fail-closed refusal of a structurally
conformant but stale-baseline producer, a separate source-bound 0.5 review and
current-baseline seal, successful update of the ready 271-node producer,
repeat-current behavior, injected rollback, and tampered-baseline rejection.
The fresh
[authority and compatibility audit](../evidence/audits/nkf-027-nkf-0-6-authority-and-compatibility-audit.md)
reproduced every exact binding and compatibility result and returned `CLEAN`.

The accepted 0.6 authority also makes the predecessor-maintenance boundary
explicit: a missing, outdated, disputed, ambiguous, or otherwise not-ready 0.5
baseline makes automatic carry-forward ineligible, a separate governed 0.5
semantic review and seal may restore predecessor readiness, and the 0.6
updater may neither perform nor infer that work.

The exact NKF 0.6 release commit is `96652985ab7749d6f58677dbf0947af4c9ff4e63`
and its content-addressed private prerelease archive is
`b0822199c1ddb4ea9de14e4c005edf77b44f9c60a6005689505ab00436dd4c95`, published
`2026-08-14T11:05:54Z` under repository identity `NourdApS/Nourd.NKF`. The
published bytes were re-downloaded and compared byte-identically against the
independently audited candidate archive. The governed catalog at
`release/recommended.json` then deliberately promoted that release, and
ordinary public Adopt updated this producer from NKF 0.5 to NKF 0.6, returned
`updated`, and returned `current` on immediate repeat. The installed pin
records repository `NourdApS/Nourd.NKF`, checker SHA-256 `9a019c4c...b376`,
adopter SHA-256 `d552e7c2...eb50`, and the preserved host-superset
integration.

Licensing preparation is complete as repository content and remains separate
from publication, visibility, and Governing Use. The root `LICENSE` is
byte-identical to the official unmodified Apache License 2.0 text, the root
`NOTICE` is byte-identical to the exact attribution the Human Product Owner
approved and adds no restriction, `THIRD_PARTY_NOTICES.md` carries the
compatible third-party attributions reproduced from the exact bundled checker
and adopter build graphs, and package metadata declares SPDX identifier
`Apache-2.0` with the current `NourdApS/Nourd.NKF` repository URL. A governed
build-graph verifier independently reconstructs the checker and adopter
package inputs and requires their exact union to equal that notices inventory.
No trademark, governance, contribution, security-response, or community-conduct
policy is drafted or accepted here; those remain reported unresolved Product
matters for the Human Product Owner.

The accepted NKF 0.6 release protocol requires a technical-confirmation
Decision before publication. The 0.6 prepublication lock makes authoring any
governed record impossible before promotion, and adding one would have
invalidated the whole-root semantic review bound to the exact release commit.
The Human Product Owner therefore explicitly chose to publish first and record
afterwards for this release, and no separate 0.6 technical-confirmation
Decision record exists. NKF 0.6 is accepted, implemented, published,
recommended, and producer-adopted, but it is not technically confirmed by a
Decision. A successor NKF version should reconcile that ordering rather than
repeat the exception.

NKF 0.7, delivered under
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md),
reconciles exactly that ordering: the post-audit technical-confirmation
Decision is mandatory and audit-bound with no waiver, and
[ADR 0129](../decisions/0129-confirm-the-nkf-0-7-release-candidate.md) was
recorded — bound to the clean independent
[release audit](../evidence/release/nkf-028-nkf-0-7-release-audit.md) — before
any publication. The 0.7 line additionally received the Human Product
Owner-directed
[whole-line completion audit](../evidence/audits/nkf-028-nkf-0-7-whole-line-completion-audit.md)
over the complete governance chain. Under
[NKF-029](../tasks/items/NKF-029-adopt-the-producer-to-published-nkf-0-7.md),
the confirmed archive
`c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` was
published from the concluded release branch at release commit
`e5b265e87da6c12b73b4749f8d24b41b996cc77a` without merging `master` first,
re-downloaded byte-identically as recorded in the
[publication Evidence](../evidence/release/nkf-029-nkf-0-7-publication.md),
promoted as the governed recommendation, and ordinarily self-adopted by this
producer through the public Adopt of the published release with explicit
repository-owner breaking approval: the promotion applied the identity
succession and the one deliberate stable-path neutralization, created the
native accepted 0.7 Specification record, performed the deliberate last
whole-root review this lineage requires, returned `updated`, and returned
`current` on repeat with the host-superset integration preserved.

## Durable Mapping

The current repository topology is:

```text
Canonical Specification
        ↓ exact semantic derivation
Executable YAML Contract
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
        ↓ bounded by exact reviewed baseline and changed inputs
Impact Set + Simultaneous Freshness Results + Immutable Receipt

Authored Governed Source Change
        ↓ structural declaration mutation with required postconditions
Transactional Repin | Linkify | Task Transition Or Complete Rollback
        ↓ change-impact evaluation
Whole-Root Semantic Review + Resealed Reviewed Baseline

Neutral Authoring Protocol
        ↓ discovered through
Host Adapters + Portable Skill
        ↓ hands off to
npm run nkf:check
        ↓ reused by
Exact-Commit Github Workflow

Audited Checker + Exact Authority Inputs + Repository Licensing Set
        ↓ packaged as
Content-Addressed Internal Release
        ↓ verified and installed by
Public-Safe Pinned Adopter
        ↓ accompanied by
Allowlisted Public Documentation Projection

Governed Recommended Release + Supported Repository State
        ↓ resolved by one public subcommand-free operation
Adopt Preflight + Compatibility Signal + Required Human Approval
        ↓ selects internal path and validates the complete candidate
Onboarded | Migrated | Updated | Current Exact Consumer Pin

Unadopted Empty Or Tiny Knowledge Repository
        ↓ complete agent review and applicable human confirmation
Mechanical Project Capture + External Candidate Workspace
        ↓ resolved assessment and Markdown representations
Deterministically Sealed Onboarding Plan
        ↓ complete topology generation and staged check
Draft NKF Candidate Or Complete Rollback

Trusted NKF-013 Or NKF-015 Receipt
        ↓ predecessor integrity and drift checks
Rollback-Capable Topology Repair
        ↓ full-bundle validation
Complete Product Or Technology Topology
```

| Component | Durable Location | Current State | Confirmation |
| --- | --- | --- | --- |
| NKF 0.7 authority | `knowledge/specifications/nkf-0.7.md`, `contracts/nkf/0.7/nkf.yaml`, `contracts/nkf/0.7/freshness-policy.yaml`, `contracts/nkf/0.7/version-delta.yaml` | Exact accepted current authority for digest-bound reviewed baselines with computable carry-forward, per-rule version delta and fail-closed delta claims, deterministic review and record scaffolds, lifecycle-neutral identity and stable paths with governed succession, operational-fact promotion reconciliation, the current-plus-one support window, mandatory audit-bound technical confirmation, and Git transition orchestration as operational output | Accepted by [ADR 0128](../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md) after three independent audit rounds and a rehearsal-driven revision; the exact release candidate is technically confirmed by [ADR 0129](../decisions/0129-confirm-the-nkf-0-7-release-candidate.md) bound to the clean independent release audit |
| NKF 0.7 derived implementation | `contracts/nkf/0.7/schemas/`, `src/checker/`, `scripts/freshness/`, `scripts/adoption/`, `fixtures/valid/*-0-7/`, `test/` | Exact published implementation at release commit `e5b265e8...`; all two hundred thirteen accepted rules implemented with test coverage, version-dispatching 0.7 and 0.6 validation, digest-bound baseline verification, delta-claim closure computation, carried-judgment preconditions, succession and neutralization migration, promotion reconciliation, scaffolds, and tamper and symlink containment | Independently audited before confirmation and reproduced by the producer gate; acceptance, conformance, and Governing Use remain separate |
| NKF 0.7 release realization | `contracts/nkf/0.7/release-set.yaml`, `distribution/nkf/0.7/`, `public-docs/`, `scripts/release/` | Published and recommended exact 165-member private archive `c5ee783c...3df94f` including the repository licensing classes, seven 0.7 Schemas, the complete public projection, checker `64751e77...e70a`, and adopter `e565978a...b360` | Archive reproduced byte-identically from the enumerated set, confirmed by [ADR 0129](../decisions/0129-confirm-the-nkf-0-7-release-candidate.md), and re-downloaded byte-identically after publication as recorded in the [publication Evidence](../evidence/release/nkf-029-nkf-0-7-publication.md); publication and recommendation are observed operational facts, not confirmation |
| NKF 0.6 authority and distribution | `knowledge/specifications/nkf-0.6-revision-3.md`, `contracts/nkf/0.6/`, `distribution/nkf/0.6/` | Live-supported immutable predecessor under the current-plus-one window with its unchanged published 185-member archive `b0822199...dd4c95`; migration to 0.7 is breaking and requires explicit repository-owner approval | Accepted by [ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md); no separate 0.6 technical-confirmation Decision was recorded, the ordering exception 0.7 reconciles |
| Repository licensing set | `LICENSE`, `NOTICE`, `THIRD_PARTY_NOTICES.md`, `package.json` | Unmodified official Apache License 2.0, the exact approved informational NOTICE attribution, compatible third-party notices reproduced from the exact bundled checker and adopter build graphs, and SPDX identifier `Apache-2.0` with the current repository URL | Licensing preparation is repository content verified by `npm run verify:third-party-notices` and the clean licensing audit; it establishes no public visibility, no commercial or legal suitability, and no Governing Use |
| NKF 0.1 through 0.5 history | Git history and their immutable published release archives | Out-of-window immutable history: the live tooling refuses their migration fail-closed and names the exact published stepping-stone archive for the next hop | Their accepting and confirming Decisions remain immutable provenance; [ADR 0120](../decisions/0120-confirm-the-nkf-0-5-release-candidate.md) confirms the 0.5 stepping stone the 0.6 window relies on |
| Version release and adoption protocols | `integrations/release/`, `integrations/adoption/`, `distribution/nkf/0.7/integrations/` | Accepted repository process sources plus the frozen published 0.7 operational copies for candidate proof, guidance review, isolated exact-candidate exercise, independent audit, mandatory audit-bound confirmation, publication, one public Adopt operation, compatibility preflight, approval, rollback, recommendation, and post-action audit | Direction adopted by [ADR 0109](../decisions/0109-publication-freeze-and-proven-self-adoption.md), strengthened by [ADR 0121](../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md), and reordered by the accepted 0.7 authority; the historical 0.6 publication-order exception is recorded above |
| Core JSON Schemas | `contracts/nkf/0.6/schemas/`, `contracts/nkf/0.7/schemas/` | Seven closed source-bound Schemas per live-supported version | Exact digests are bound by the accepted release sets and reproduced by the build verifier |
| Checker library and CLI | `src/checker/`, `src/cli.ts`, `dist/nourd-nkf-checker.mjs` | Version-dispatching checker with exact 0.6 and 0.7 bindings; published and installed 0.7 checker SHA-256 `64751e77...e70a` | Reproduced deterministically by `npm run verify:build`, bound by [ADR 0129](../decisions/0129-confirm-the-nkf-0-7-release-candidate.md), and installed through ordinary public Adopt |
| Fixtures and tests | `fixtures/`, `test/` | Product and Technology topology, lifecycle, onboarding, delta migration, stepping-stone refusal, release membership, graph, freshness, digest-bound baselines, delta claims, scaffolds, succession, Git transition orchestration, security, recovery, structural mutation, rollback, idempotence, and tamper coverage; the current branch passes 25 test files and 228 tests | 0.7 rule-coverage and promotion exercises and predecessor Evidence; passing tests are conformance evidence only |
| Self-host declaration and release pin | `.nourd/knowledge/`, `.nourd/nkf-release.json`, `.nourd/tools/nkf/` | Adopted 0.7 Technology bundle promoted through the ordinary public Adopt of the published release, pinned to archive `c5ee783c...3df94f` under repository `NourdApS/Nourd.NKF` with the preserved host-superset integration and the native accepted 0.7 Specification record | Ordinary public Adopt returned `updated` and then `current`; this consolidated account remains partially confirmed |
| Reviewed graph baseline | `.nourd/knowledge/freshness/baseline.yaml` | Digest-bound whole-root reviewed baseline bound to evaluation policy `nkf.freshness-policy.0.7`, sealed by the live promotion's whole-root review — the deliberate last whole-root review this lineage requires | Sealing verifies conformance and exact ready graph revision; it records semantic review, and it does not confirm this Realization |
| Neutral authoring and onboarding procedures | `integrations/ai/`, `integrations/onboarding/`, portable skills | Installed 0.7 vendor-neutral protocols and portable skills | Bytes carried by the published archive; repository installation verified by the guidance verifiers |
| Agent guidance integration | `AGENTS.md`, host adapters, portable skills, registry, verifier | Twelve explicit host surfaces plus the producer-only Task-authorization policy; exact registered bindings verified at NKF 0.7 | Verified by `npm run verify:agent-guidance`; acceptance and confirmation remain separate |
| Project enforcement command | `package.json` | Canonical pinned-first `npm run nkf:check` followed by the exact preserved producer host gate | Pristine-clone runtime behavior independently verified in [0.4 producer-adoption Evidence](../evidence/audits/nkf-024-nkf-0-4-producer-adoption-audit.md) and preserved unchanged through 0.5 and 0.6 adoption |
| Exact-commit workflow | `.github/workflows/nkf-contracts.yml` | Checked-in workflow invokes the canonical command with complete Git history; its last observed success on the release branch was commit `1abddf2b...` | Github owns the time-bound run state and each later commit is observed separately; protected enforcement remains deferred to [NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) |
| Consumer adopter | `dist/nourd-nkf-adopt.mjs`, `.nourd/tools/nkf/nourd-nkf-adopt.mjs` | Published and producer-installed 0.7 adopter SHA-256 `e565978a...b360`; `scripts/adoption/nourd-nkf-adopt.mjs` remains a build input rather than a runnable command | Reproduced deterministically by `npm run verify:adopter`, bound by [ADR 0129](../decisions/0129-confirm-the-nkf-0-7-release-candidate.md); installed byte agreement verified by the pin |
| Initial onboarding | `scripts/onboarding/`, `integrations/onboarding/`, portable onboarding skills | Agent-led Empty and Tiny Knowledge Product and Technology assessment, sealing, transaction, rollback, and reviewed native 0.7 graph baselining beneath public Adopt | Exercised by the 0.7 adopter suite; consumer onboarding remains a separate operational act |
| Public documentation | `public-docs/` and versioned archives | The published 0.7 archive contains the complete public projection, conformant examples, the exact 0.7 Specification, and the public adopter | Verified by `npm run verify:public-docs`; separate docs-repository publication is not claimed |
| Consumer exercise | `.github/workflows/nkf-consumer-adoption.yml`, tests, audit Evidence | Supported native 0.6 breaking migration, native 0.7 refresh, pinned-current, and out-of-window stepping-stone refusal paths plus rollback and tamper rejection | Local and fresh-clone runtime behavior independently audited; a successor workflow run remains separate |
| Latest result | `.nourd/validation-result.json` | Persists the latest full-bundle observation for the repository's currently declared 0.7 state and may become stale after any governed input changes | Conformance observation only; authority-binding and Governing Use remain separately reported |
| Release tooling | `contracts/nkf/0.6/release-set.yaml`, `contracts/nkf/0.7/release-set.yaml`, `scripts/package-release.mjs`, `scripts/release/`, `scripts/verify-recommended-release.mjs` | Version-dispatched packaging and verification; the 0.7 set deterministically constructs the exact published 165-member archive, and the recommended-release verifier derives every expectation from the per-version Decision-bound binding registry with no hand-edited version literal | Archive reproduction and catalog verification are deterministic checks; they accept nothing |

Supporting current Realizations provide the detailed mappings:

- [Contracts And Schemas](items/contracts-and-schemas.md)
- [Checker And Validation](items/checker-and-validation.md)
- [Layered Contract Enforcement](items/layered-contract-enforcement.md)
- [NKF 0.4 Security Maintenance](items/nkf-0.4-security-maintenance.md)
- [Agent-Led Initial Onboarding](items/agent-led-initial-onboarding.md)
- [Portable Knowledge Topology](items/portable-knowledge-topology.md)
- [Release Documentation And Adoption](items/release-documentation-and-adoption.md)
- [Self-Hosting](items/self-hosting.md)
- [Release Package](items/release-package.md)

Those supporting Realizations remain bound to the NKF version current when
each was last confirmed. They are predecessor detail, and this consolidated
record is the current 0.7 account where they disagree.

The confirmed
[Initial Greenfield Onboarding](items/initial-greenfield-onboarding.md)
Realization remains immutable predecessor provenance. [ADR 0069](../decisions/0069-agent-led-initial-onboarding.md) supersedes its
deterministic semantic-eligibility behavior, so it is not current onboarding
guidance.

## Responsibilities And Ownership Boundaries

The canonical Specification owns normative meaning. The executable YAML
represents that meaning mechanically. Schemas enforce local closed shapes.
The checker owns deterministic project, source, graph, record-contract,
security, authority-binding, and result behavior assigned to it by the
accepted contract.

The `.nourd` declaration represents this repository as one Technology bundle;
it does not accept the Markdown or infer Design disposition, section meaning,
relationships, Task state, Evidence classification, or confirmation from
paths and filenames. Under native NKF 0.7 a record's Markdown frontmatter
carries only common orientation plus `id` and `type`, while lifecycle,
governance, ownership, relationships, freshness, and confirmation live in the
YAML declaration. Preserved predecessor sources may retain inert mutable keys
only through an exact `legacy_lock`, and the first native edit of such a
source must supply a valid native envelope before it may be re-pinned.

Deterministic commands own mechanics only. `repin`, `linkify`, `refs`, `set`,
`task`, and `migrate` mutate declarations, navigation, and digests, verify
their required postconditions, and roll back rather than report false success.
They supply no meaning, judge no prose, and accept nothing. The semantic acts —
truthfulness, gate classification, readiness, review, acceptance, and
confirmation — remain with their human or explicitly delegated authority.

This Realization owns a navigable implementation account. It does not compete
with the Specification, decide a Design disposition, accept knowledge, or
turn a passing check into confirmation.

The neutral authoring protocol and adapters guide capable AI surfaces without
becoming model authority. The project command and merge workflow judge exact
candidate bytes without asking an AI to decide conformance.

Apache-2.0 licensing governs the repository's copyright terms only. It
establishes no trademark permission, no public visibility, no support
commitment, and no acceptance, confirmation, or Governing Use of any NKF
meaning.

## Interfaces Dependencies Locators And Resolution

The native invocation starts at a candidate project root whose direct
`.nourd` entry must resolve safely inside that project. The bundle at
`.nourd/knowledge/bundle.yaml` selects exactly one concrete Root Profile and a
project-contained relative `knowledge_root`.

Record declarations resolve from `.nourd/knowledge/records/*.yaml` to exact
Markdown sources under `knowledge_root` through both a mutable `source.path`
and a stable `source.stable_path`. Technology bundles may additionally bind
project-contained governed artifacts. The checker dispatches trusted exact
contract sets from the accepted authority under `contracts/nkf/0.7/` and the
live-supported predecessor under `contracts/nkf/0.6/`. The producer's own
bundle and installed pin select the published 0.7 archive. NKF 0.1 through
0.5 support remains available through their frozen published stepping-stone
archives rather than through live checker dispatch or by changing an earlier
contract coordinate.

AI-assisted authoring begins from the neutral protocol. Registered host
surfaces resolve it through exact adapters or portable skills. Every handoff
uses `npm run nkf:check`, and the checked-in Github workflow invokes the same
command for the exact candidate commit.

Governed authoring mechanics are performed through the installed adopter at
`.nourd/tools/nkf/nourd-nkf-adopt.mjs`. After an authored source change,
`repin` structurally updates the affected record, document, or artifact
declaration and its digest, `linkify` rewrites plain same-bundle references
into verified deep links inside the same transaction, and `task` updates
stable Task declaration state and regenerates `tasks/by-state/*.md` without
moving canonical Task Markdown or rewriting inbound links. Change-impact
evaluation then reports the edited graph not ready until a completed
whole-root semantic review seals a replacement baseline.

Pre-adoption begins with the separate neutral onboarding protocol and external
candidate workspace. A participating agent reviews the complete repository,
records its assessment and applicable human confirmation in the plan, and then
hands exact mechanics to sealing. The public Adopt operation resolves a sealed plan into
exact knowledge, native declarations, and the same installed authoring
boundary only after a complete staged project passes.

For an adopted repository, public Adopt resolves the governed recommended
catalog at `release/recommended.json`, checks that the executing adopter and
exact archive agree with it, and observes the bundle and installed pin. The
catalog and adopter resolve the current repository identity
`NourdApS/Nourd.NKF`; the historical `kaveh6202/Nourd.NKF` identity is
retained only as a recognized legacy coordinate, so a catalog naming the
legacy repository fails closed. The derived 0.7 path classifies 0.6 migration
as breaking, requires explicit repository-owner approval and a completed
migration review with carried judgments prefilled and the computed required
fresh set left to a named reviewer, and completes transactionally on rerun.
A repository declaring NKF 0.1 through 0.5 is out of the live support window:
the tooling stops fail-closed and names the exact published stepping-stone
archive for the next hop instead of migrating silently. Same-version 0.7
refresh is non-breaking. The recommendation may move only through
reviewed NKF repository state; the consumer's content-addressed pin never
moves by implication.

Durable repository paths and digests are locators and integrity bindings.
They do not become semantic identity or live operational authority.

## External Authority And Operational State Boundaries

Git owns commits and history. Github owns remote repository and Release state.
Package registries own publication state. Consumer repositories own their
knowledge, declarations, acceptance, migrations, and operational use.

The latest validation result records one observed snapshot and may become
stale immediately after an input changes. This Realization records the durable
mechanism and current repository implementation status, not mutable workflow,
process, deployment, account, permission, health, or execution state.

The repository operationally moved from `kaveh6202/Nourd.NKF` to
`NourdApS/Nourd.NKF`. Historical references that are correct immutable
provenance are preserved unchanged; only current identity, executable
distribution and adoption behavior, and stale mutable documentation were
reconciled, each after explicit classification. The repository remains
private, and its releases remain private prereleases; no NKF version changes
visibility by implication and licensing preparation does not make the
repository public.

The workflow exists in the repository and on remote `master`. The 0.3
recommendation was human-merged through pull request 6 at `master` commit
`60a0a96`. The 0.4 recommendation and producer adoption are merged on
`master`. The 0.5 and 0.6 implementation, publication, recommendation, and
producer adoption were delivered on the single
[NKF-025](../tasks/items/NKF-025-validate-freshness-and-knowledge-graph-direction.md)/[NKF-026](../tasks/items/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)/[NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md)
branch and its single pull request by explicit Human Product Owner direction.
The complete NKF 0.7 release is delivered on the
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md)
branch and its pull request, and this publication, recommendation, and
producer adoption are delivered on the stacked
[NKF-029](../tasks/items/NKF-029-adopt-the-producer-to-published-nkf-0-7.md)
branch and its pull request; 0.7 published from the release branch by
explicit Human Product Owner authorization without merging `master` first,
and merging both pull requests remains the Human Product Owner's act. Github,
rather than this Realization, remains authoritative for time-bound workflow
state.

Github returned HTTP `403` for both branch-protection and repository-ruleset
access because the repository is private under the current plan. The required
check, review ownership, bypass controls, and blocked invalid pull-request
observation therefore remain unavailable and unconfirmed. No repository
visibility or subscription change was made.

[NKF-011](../tasks/items/NKF-011-enforce-nkf-contracts.md) is complete for its confirmed authoring guidance, deterministic local
gate, and active exact-commit workflow. Deferred [NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) owns the required
`Validate` check, one mandatory pull-request approval, bypass policy, and
blocked-invalid-candidate observation. No release, deployment, or
external-consumer migration is part of either enforcement Task.

[NKF-008](../tasks/items/NKF-008-publish-and-onboard-consumers.md) is complete for the confirmed 0.1 predecessor. Its private release,
recommendation, public repository, freshly cloned public bytes, complete
public examples, local consumer path, and Github consumer workflow were
observed separately and retained as Evidence. Those predecessor facts support
but do not replace [ADR 0066](../decisions/0066-confirm-release-documentation-and-adoption.md)'s confirmation act. NKF 0.2 remains a
separately published immutable predecessor. The governed catalog recommends
exact NKF 0.7, and recommendation alone migrates no consumer. No external
repository has adopted NKF at any version.

The 0.3 successor was independently audited, confirmed, published,
re-downloaded, selected by a human-merged catalog commit, and installed into
this producer through ordinary public Adopt. The
[publication Evidence](../evidence/audits/nkf-023-nkf-0-3-publication.md) and
[producer-adoption Evidence](../evidence/audits/nkf-023-nkf-0-3-producer-adoption-audit.md)
own those operational observations; neither substitutes for acceptance or
technical confirmation.

The 0.4 successor was subsequently independently audited, technically
confirmed, published, re-downloaded byte-identically, selected by the exact
recommendation, and installed into the producer through
ordinary public Adopt. Its
[publication Evidence](../evidence/audits/nkf-024-nkf-0-4-publication.md) also
reverified the immutable 0.3 predecessor, and the fresh
[producer-adoption Evidence](../evidence/audits/nkf-024-nkf-0-4-producer-adoption-audit.md)
verified pristine-checkout conformance, repeat `current`, exact pin agreement,
knowledge and predecessor preservation, and tamper rejection.

The 0.5 successor was independently audited, technically confirmed, published,
re-downloaded byte-identically, recommended, and ordinarily adopted by this
producer. Its post-adoption exercise exposed the published re-pinning defect
rather than clean operation. For NKF 0.6, publication, byte-identical
re-download, recommendation promotion, and ordinary producer self-adoption
were performed and observed in session by explicit Human Product Owner
direction, but no separate publication, adoption, or implementation-audit
Evidence document was authored, and no technical-confirmation Decision exists.
Those operational facts therefore rest on this record and on the authoritative
Git, Github, catalog, and installed-pin state rather than on dedicated
Evidence records.

The 0.7 successor reconciles both defects of that account: its release order
completed in full — acceptance, guidance review, proof, isolated
exact-candidate exercise, independent release audit, the mandatory
audit-bound technical confirmation
[ADR 0129](../decisions/0129-confirm-the-nkf-0-7-release-candidate.md),
publication, recommendation, and ordinary producer self-adoption — and its
publication and re-download verification are recorded in dedicated
[publication Evidence](../evidence/release/nkf-029-nkf-0-7-publication.md)
rather than resting on this record alone.

[NKF-013](../tasks/items/NKF-013-initial-greenfield-onboarding.md) is complete for the accepted initial greenfield scope. Exact-commit
contract and consumer workflows passed without annotations, the public
projection was freshly cloned and matched, the completion audit records no
unresolved material finding, and [ADR 0068](../decisions/0068-confirm-initial-greenfield-onboarding.md) separately confirms the exact
successor Realizations. These time-bound external observations remain
historical predecessor Evidence; they do not become authority merely because
this account records them.

[NKF-015](../tasks/items/NKF-015-agent-led-initial-onboarding.md) is complete for the agent-led Category 1 and Category 2 onboarding
scope. Private source commit
`53ae5217f68731d953f3bf616a578adeb033bb03` passed exact-commit run
`30655408945`. Public commit
`a14766ca1bdc67bfd8fb9e6d73355fc019017a90` matched its deterministic staging
projection in a fresh clone, and both public examples passed the confirmed
checker with no diagnostics. The publication Evidence owns those time-bound
observations; [ADR 0070](../decisions/0070-confirm-agent-led-initial-onboarding.md) separately confirms the exact successor. Consumer
onboarding is outside [NKF-015](../tasks/items/NKF-015-agent-led-initial-onboarding.md) and will be performed separately by the Human
Product Owner.

[NKF-017](../tasks/items/NKF-017-complete-portable-onboarding-topology.md) is complete for the confirmed 0.1 portable Product and Technology
topology predecessor, continuing checker enforcement, initial onboarding, and
deliberate [NKF-013](../tasks/items/NKF-013-initial-greenfield-onboarding.md) or [NKF-015](../tasks/items/NKF-015-agent-led-initial-onboarding.md) predecessor repair. Later [NKF-019](../tasks/items/NKF-019-decision-applicability-gate.md) and [NKF-020](../tasks/items/NKF-020-version-release-adoption-and-compatibility-process.md)
work supersedes its current-release and current-projection status without
rewriting its confirmation evidence. Acceptance-binding and protected-merge
work remain deferred to [NKF-016](../tasks/items/NKF-016-deliver-acceptance-binding-verification.md) and [NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md).

## Compatibility Verification And Recovery

Verification consists of strict authority-pair binding, schema compilation,
type checking, positive and negative fixtures, diagnostic coverage, unit and
integration tests, deterministic build verification, third-party notice
reproduction, explicit self-host declarations, and full-bundle validation.

The predecessor `npm run check` baseline passes type checking, 15 test files
with 102 tests, build, and deterministic build verification under [ADR 0059](../decisions/0059-confirm-governed-frontmatter-realization.md).
[NKF-011](../tasks/items/NKF-011-enforce-nkf-contracts.md) adds the adapter verifier, eighteen focused positive and negative cases,
the unified `npm run nkf:check` command, and additional governed integration
artifacts.

The confirmed predecessor self-host successor contains 99 record declarations,
57 explicit non-record sources, and 109 governed artifacts. The confirmed
[NKF-013](../tasks/items/NKF-013-initial-greenfield-onboarding.md) completion contains 103 record declarations, 60 explicit non-record
sources, and 119 governed artifacts. Focused [NKF-008](../tasks/items/NKF-008-publish-and-onboard-consumers.md) checks pass
eighteen test files with 126 tests, deterministic checker and adopter builds,
the public-documentation verifier, complete Product and Technology public
examples, Product and Technology installation, same-pin no-update, and
archive, pin, adapter, and knowledge tamper rejection. The [NKF-013](../tasks/items/NKF-013-initial-greenfield-onboarding.md) successor
passes nineteen test files with 135 tests, deterministic builds, local Product
and Technology exercises, public-byte verification, and full self-validation.

The [NKF-015](../tasks/items/NKF-015-agent-led-initial-onboarding.md) successor passes nineteen test files with 136 tests,
agent and onboarding guidance verification, deterministic checker and adopter
builds, public documentation verification, and full-bundle self-hosting. Its
first recommendation check correctly rejected the then-unpublished successor
adopter and its first exact-worktree check exposed the unbound `AGENTS.md`
policy. The Human Product Owner subsequently authorized both completion
boundaries. The successor was published and freshly verified, and its private
source commit passed the exact-commit workflow. Those observations remain
separate from [ADR 0070](../decisions/0070-confirm-agent-led-initial-onboarding.md)'s confirmation act.

The [NKF-017](../tasks/items/NKF-017-complete-portable-onboarding-topology.md) successor passes nineteen test files with 151 tests, both neutral
guidance verifiers, deterministic checker and adopter builds, the 60-file
public-documentation projection with two complete examples, and full-bundle
self-host validation with zero diagnostics. The completion audit repaired the
Markdown diagnostic-registry omission, the circular release-recommendation
gate, and loose repair-receipt integrity checks before confirmation.

The NKF 0.4 gate passed 28 test files and 210 tests, 1,034 living links,
deterministic checker and adopter reproduction, the complete 64-file public
projection, and full-bundle self-validation with zero diagnostics. The exact
published NKF 0.5 release branch passed 29 test files and 218 tests, adding
both Root Profiles, stable lifecycle-neutral document identity, exact graph
revision, reviewed-baseline sealing, freshness precedence, impact closure,
receipt persistence and historical reproduction, 0.1-through-0.4 breaking
migration, retrospective Task-gate review, whole-root semantic review,
rollback, tamper rejection, repeat-current idempotence, public projection
integrity, release-set completeness, and an isolated migration of the actual
producer host registry.

The NKF 0.6 gate passed 29 test files and 231 tests, 1,429 checked
links across 103 living files with zero dead links, deterministic checker and
adopter reproduction, third-party notice reproduction from the exact bundled
build graphs, the complete 86-file public projection, and full-bundle
self-validation with zero diagnostics. The added coverage exercises the
command-by-subject matrix: strict `refs` and exact `set`, structural record,
document, and governed-artifact repin, represented-document linkify, native
Task transition with unchanged Task source bytes, freshness evaluation,
reviewed-baseline sealing, release verification, producer promotion,
ordinary-consumer `current`, idempotence, injected rollback, tamper rejection,
and symlink containment. The isolated real-producer rehearsal additionally
rejected an edited legacy-locked Realization until it carried a valid native
0.6 envelope, then accepted the corrected native edit, its transactional
repin and linkify, its change-impact `not-ready` result, its resealed
whole-root baseline, and its `ready` recovery.

Machine-independent hang bounds were subsequently scaled so that the governed
multi-process exercises fail on genuine hangs rather than on slower hardware.
That change alters no assertion and no format meaning.

The current NKF 0.7 gate passes 25 test files and 228 tests, deterministic
checker and adopter reproduction, third-party notice reproduction, the
complete public projection, and full-bundle self-validation with zero
diagnostics, with knowledge-proportional test bounds and child-process
reaping. Its coverage additionally exercises every accepted 0.7 rule
identifier, the digest-bound baseline with forged-carry refusal, the
delta-claim closure computation with fail-closed refusals, the 0.6-to-0.7
delta migration and stepping-stone refusals, both authorized producer
promotion stages against isolated copies of this repository, the review and
record scaffolds, and the Git transition orchestration as operational
output. The live promotion that produced this account ran the ordinary
public Adopt of the published release against this repository, completed the
required whole-root review under the recorded delegation, returned
`updated` with the identity succession and path neutralization applied, and
returned `current` on repeat. That is a runtime observation of the promoted
mechanics, not confirmation of this account.

This live producer reconciliation is the first ordinary post-publication
native record conversion performed against the installed 0.6 adopter. It
converted this record from `immutable` to `living`, replaced its legacy-locked
predecessor frontmatter with a native 0.6 envelope, structurally re-pinned it,
linkified its introduced references, resealed the whole-root reviewed
baseline, and passed the complete canonical handoff. That is a runtime
observation of the corrected mechanics, not confirmation of this account.

The separate
[NKF-011 Realization Audit](../evidence/audits/nkf-011-layered-contract-enforcement-realization-audit.md)
records no unresolved material local-implementation finding. [ADR 0061](../decisions/0061-confirm-layered-contract-enforcement-realization.md)
separately confirms the exact local successor through delegated
technical-review authority. The
[remote activation Evidence](../evidence/audits/nkf-011-remote-enforcement-activation.md)
then establishes the successful remote workflow observation and protection
limit, [ADR 0062](../decisions/0062-confirm-remote-workflow-activation-boundary.md) confirms that exact successor account, and [ADR 0063](../decisions/0063-defer-protected-merge-gate.md) confirms
the later Task-allocation successor. None of these acts verifies acceptance
bindings, activates the protected gate, or makes authority-binding
verification part of native structural conformance.

The
[NKF-008 Completion Audit](../evidence/audits/nkf-008-completion-audit.md)
records no unresolved material finding inside the accepted release,
documentation, and adoption scope. [ADR 0066](../decisions/0066-confirm-release-documentation-and-adoption.md) supplies the separate successor
confirmation rather than deriving confirmation from publication or passing
checks.

The
[NKF-013 Completion Audit](../evidence/audits/nkf-013-initial-greenfield-onboarding-completion-audit.md)
records the initial-onboarding requirement matrix, three repaired material
findings, exact remote observations, public-byte verification, and the
preserved [NKF-014](../tasks/items/NKF-014-expand-brownfield-and-advanced-onboarding.md) extension seam. [ADR 0068](../decisions/0068-confirm-initial-greenfield-onboarding.md) supplies the separate exact-byte
confirmation act.

The
[NKF-015 Agent-Led Initial Onboarding Audit](../evidence/audits/nkf-015-agent-led-initial-onboarding-audit.md)
records two repaired findings, the isolated passing candidate checks, and the
original release, instruction-candidate, and consumer-operation boundaries.
Its post-audit resolution records the later authority changes. It does not
confirm the successor Realization. The separate
[NKF-015 Publication And Verification Evidence](../evidence/audits/nkf-015-publication-and-verification.md)
records the exact source and public commits, fresh-clone comparison, manifest
verification, example checks, and successful exact-source workflow. [ADR 0070](../decisions/0070-confirm-agent-led-initial-onboarding.md)
supplies confirmation rather than deriving it from either Evidence record.

The
[NKF-017 Completion Audit](../evidence/audits/nkf-017-whole-repository-completion-audit.md)
records the whole-repository requirement, authority, coherence, enforcement,
distribution, navigation, security, and recovery review. [ADR 0075](../decisions/0075-confirm-complete-portable-onboarding-topology.md) supplies the
separate exact-byte confirmation act.

Recovery uses Git history, immutable Decision and Evidence provenance,
predecessor digests, explicit successor Decisions, deterministic rebuilding,
and deliberate consumer migration. A failed validation blocks a conformance
claim; it does not revoke prior acceptance or silently change NKF meaning. A
published defect is never repaired in place: NKF 0.5 remains frozen with its
re-pinning defect, and NKF 0.6 is the deliberate accepted successor.
