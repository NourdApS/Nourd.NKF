---
id: nkf-0.1-native-realization
type: realization
title: NKF Current System
summary: This is the consolidated current-system Realization for the Nourd Knowledge Format repository, including accepted, confirmed, published, recommended, and producer-adopted NKF 0.4 plus immutable predecessors.
created_at: 2026-07-30T15:59:54Z
record_lifecycle: immutable
record_status: draft
task: NKF-024
confirmation_status: partially-confirmed
confirmation_decisions:
  - adr-0068
  - adr-0070
  - adr-0075
  - adr-0082
  - adr-0106
  - adr-0108
  - adr-0111
  - adr-0114
unconfirmed_scope: ADR 0114 confirms the exact NKF 0.4 maintenance implementation and candidate archive. Publication, branch-local recommendation, ordinary producer adoption, and its clean post-action audit are separately observed. This consolidated successor account remains unconfirmed. ADR 0111 retains exact NKF 0.3 predecessor confirmation.
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

The stable record identity remains `nkf-0.1-native-realization`.

## Governed Meaning Realized

The version-dispatching implementation supports current accepted NKF 0.4 and
the immutable NKF 0.2 and 0.3 predecessors for the same Product and Technology
Root Profiles. After publication and deliberate ordinary Adopt, this producer
repository declares 0.4 and pins the exact published 0.4 archive while
retaining its stronger host-superset integration. Markdown remains normative
human authority and each executable YAML remains its version-specific digest-
bound companion.

The current exact authority pair is accepted through
[ADR 0113](../decisions/0113-accept-the-nkf-0-4-authority-pair.md) under the
bounded maintenance allocation in
[ADR 0112](../decisions/0112-allocate-nkf-0-4-security-maintenance.md). It
preserves the complete accepted 0.3 meaning while allocating separately frozen
0.4 bytes and classifying 0.3-to-0.4 adoption as non-breaking without knowledge
migration or breaking approval. The exact 0.4 implementation, checker, adopter,
lock, and private archive are confirmed through
[ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md). Its 0.3 predecessor pair remains accepted through
[ADR 0110](../decisions/0110-accept-the-nkf-0-3-authority-pair.md), and that
release-candidate implementation, checker, adopter, and archive remain
confirmed through
[ADR 0111](../decisions/0111-confirm-the-nkf-0-3-release-candidate.md).
[ADR 0104](../decisions/0104-accept-the-cancelled-state-pair.md)
and [ADR 0105](../decisions/0105-bind-the-cancelled-state-release-checker.md)
remain accepted and confirmed 0.2 predecessor provenance; ADRs 0054 through
0075 remain 0.1 predecessor provenance rather than current format authority.

The predecessor implementation baseline is
[ADR 0057](../decisions/0057-current-system-realization.md). [ADR 0059](../decisions/0059-confirm-governed-frontmatter-realization.md) confirms
the frontmatter implementation and repository migration produced by [NKF-010](../tasks/completed/NKF-010-governed-frontmatter-adoption.md).
Confirmation applies only to the exact revisions and artifacts listed by
that Decision; it does not make a release current or verify external
acceptance authority.

[ADR 0060](../decisions/0060-layered-contract-enforcement.md) adopts the
repository integration direction for [NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md) without changing normative NKF
0.1 meaning.
[ADR 0061](../decisions/0061-confirm-layered-contract-enforcement-realization.md)
confirms the exact audited local integration and current-system revisions.
[ADR 0062](../decisions/0062-confirm-remote-workflow-activation-boundary.md)
confirms the successor Realization revisions after the workflow was pushed and
observed successfully on its exact commit. It confirms remote workflow
activation, not the unavailable protected merge gate.
[ADR 0063](../decisions/0063-defer-protected-merge-gate.md) completes [NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md)
for the delivered enforcement scope, transfers protected-gate activation and
proof to deferred [NKF-012](../tasks/deferred/NKF-012-activate-protected-merge-gate.md), and confirms this exact successor account without
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
the exact audited and published [NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md) successor while keeping consumer
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
confirms the exact audited [NKF-017](../tasks/completed/NKF-017-complete-portable-onboarding-topology.md) successor without publishing it.

Under [NKF-019](../tasks/completed/NKF-019-decision-applicability-gate.md),
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

This repository has adopted that 159-rule 0.2 set: the bundle declares 0.2,
every Task carries its gate, titles equal headings, references are deep links,
the four Task states are enforced, and the retired 0.1 sources remain in Git
history and immutable release archives. A later audit found that the 0.2
archive from commit `f39c7f9` omitted already-required adopter, host-adapter,
fixture, example, and documentation-projection members. [NKF-020](../tasks/completed/NKF-020-version-release-adoption-and-compatibility-process.md) corrects that
release-tooling defect by making one 132-member pre-manifest enumeration feed
the archive builder, verifier, public-doc verifier, and adopter `set` command.
[ADR 0106](../decisions/0106-confirm-the-complete-set-release-correction.md) confirms the exact independently audited correction at commit
`3d6ea93`. The corrected archive is published and deliberately recommended at
SHA-256 `423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5`;
the [publication Evidence](../evidence/audits/nkf-020-release-publication.md) owns the remote, time-bound observations. This successor account remains
partially confirmed because publication does not confirm later operational
facts.

[ADR 0107](../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md)
now accepts one public subcommand-free Adopt operation and the
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

That exact archive is published and recommended. It contains 135 members
across 18 closed classes, including four 0.3 Schemas, multi-version checker
dispatch, Product and Technology fixtures, one strict release set and
manifest, versioned protocols, portable guidance, host adapters, and the
63-file public projection. Ordinary public Adopt migrated this producer,
installed its content-addressed pin, preserved the stronger validation chain,
and returned `current` on repeat. The first post-action audit found that an
ignored governed build artifact was absent from pristine checkouts; corrected
producer commit `6805d6b...` tracks the exact frozen adopter mirror and passed
the complete fresh re-audit retained as
[producer-adoption Evidence](../evidence/audits/nkf-023-nkf-0-3-producer-adoption-audit.md).
That producer-only correction changes no frozen 0.3 byte.

Under [NKF-024](../tasks/active/NKF-024-release-nkf-0-4-dependency-security-maintenance.md),
the 0.4 release derives a 136-member, 18-class complete set from the accepted
maintenance pair, locks patched `fast-uri` and `nanoid` versions, retains the
single public Adopt operation, and adds an atomic non-breaking 0.3-to-0.4
version update that preserves the consumer knowledge tree and stronger host
integration. Independent fresh audit reproduced and exercised the exact
release-commit implementation and archive, which
[ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) confirms.
That exact archive is published, selected by the branch-local recommendation,
and ordinarily adopted by this producer. The
[publication Evidence](../evidence/audits/nkf-024-nkf-0-4-publication.md) and
[producer-adoption Evidence](../evidence/audits/nkf-024-nkf-0-4-producer-adoption-audit.md)
own the time-bound remote and installed-state observations.

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

Neutral Authoring Protocol
        ↓ discovered through
Host Adapters + Portable Skill
        ↓ hands off to
npm run nkf:check
        ↓ reused by
Exact-Commit Github Workflow

Confirmed Checker + Exact Authority Inputs
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
| NKF 0.4 Specification and executable companion | `knowledge/specifications/nkf-0.4.md`, `contracts/nkf/0.4/nkf.yaml` | Current exact non-breaking maintenance authority pair | Accepted by [ADR 0113](../decisions/0113-accept-the-nkf-0-4-authority-pair.md); exact derived candidate confirmed by [ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) |
| NKF 0.4 distribution | `contracts/nkf/0.4/`, `distribution/nkf/0.4/`, `fixtures/valid/*-0-4/`, `public-docs/`, `scripts/release/`, `scripts/adoption/` | Published, branch-recommended, and producer-adopted exact 136-member archive with one 18-class release set, patched dependency closure, checker, adopter, guidance, fixtures, examples, and public projection | Exact release commit and archive independently audited and confirmed by [ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md); publication and producer adoption observed separately in audit Evidence |
| NKF 0.3 authority and distribution | `knowledge/specifications/nkf-0.3.md`, `contracts/nkf/0.3/`, `distribution/nkf/0.3/`, `fixtures/valid/*-0-3/` | Published immutable predecessor with its unchanged 135-member archive | Accepted by [ADR 0110](../decisions/0110-accept-the-nkf-0-3-authority-pair.md); exact implementation confirmed by [ADR 0111](../decisions/0111-confirm-the-nkf-0-3-release-candidate.md); publication observed in [publication Evidence](../evidence/audits/nkf-023-nkf-0-3-publication.md) |
| NKF 0.2 authority pair | `knowledge/specifications/nkf-0.2.md`, `contracts/nkf/0.2/nkf.yaml` | Supported immutable predecessor with the 159-rule registry | Accepted by [ADR 0104](../decisions/0104-accept-the-cancelled-state-pair.md) and checker-bound by [ADR 0105](../decisions/0105-bind-the-cancelled-state-release-checker.md) |
| Retired NKF 0.1 authority | Git history and immutable 0.1 release archives | Supported immutable predecessor, absent from the current working authority tree | [ADR 0073](../decisions/0073-correct-portable-topology-diagnostic-registry.md) and [ADR 0075](../decisions/0075-confirm-complete-portable-onboarding-topology.md) |
| Version release and adoption protocols | `integrations/release/`, `integrations/adoption/`, `distribution/nkf/0.4/integrations/` | Accepted repository process sources plus the frozen 0.4 operational copies for candidate proof, publication, one public Adopt operation, compatibility preflight, approval, rollback, recommendation, and post-action audit | Direction adopted by [ADR 0109](../decisions/0109-publication-freeze-and-proven-self-adoption.md); exact 0.4 release copies confirmed by [ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) |
| Core JSON Schemas | `contracts/nkf/0.2/schemas/`, `contracts/nkf/0.3/schemas/`, `contracts/nkf/0.4/schemas/` | Source-bound predecessor Schemas and four closed current 0.4 Schemas | 0.4 exact digests confirmed by [ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) |
| Checker library and CLI | `src/checker/`, `src/cli.ts`, `dist/nourd-nkf-checker.mjs` | Version-dispatching checker with exact 0.2, 0.3, and 0.4 bindings; release checker SHA-256 `425286d3...` | 0.4 exact build confirmed by [ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) |
| Fixtures and tests | `fixtures/`, `test/` | Product and Technology topology, lifecycle, onboarding, migration, release membership, security, recovery, and tamper coverage; current gate passes 28 files and 210 tests | 0.4 [candidate audit](../evidence/audits/nkf-024-nkf-0-4-exact-candidate-audit.md) and 0.3 [producer-adoption Evidence](../evidence/audits/nkf-023-nkf-0-3-producer-adoption-audit.md); passing tests are conformance evidence only |
| Self-host declaration and release pin | `.nourd/knowledge/`, `.nourd/nkf-release.json`, `.nourd/tools/nkf/` | Adopted 0.4 Technology bundle pinned to archive `a7912b92...` with exact installed archive and adopter | Producer adoption independently verified; this consolidated account remains partially confirmed |
| Neutral authoring and onboarding procedures | `integrations/ai/`, `integrations/onboarding/`, portable skills | Installed 0.4 vendor-neutral protocols and portable skills | Bytes carried by the confirmed archive; repository installation independently audited |
| Agent guidance integration | `AGENTS.md`, host adapters, portable skills, registry, verifier | Twelve explicit host surfaces plus the producer-only Task-authorization policy; exact registered bindings verified | Producer installation independently audited; acceptance and confirmation remain separate |
| Project enforcement command | `package.json` | Canonical pinned-first `npm run nkf:check` followed by the exact preserved producer host gate | Pristine-clone runtime behavior independently verified in [0.4 producer-adoption Evidence](../evidence/audits/nkf-024-nkf-0-4-producer-adoption-audit.md) |
| Exact-commit workflow | `.github/workflows/nkf-contracts.yml` | Checked-in workflow invokes the canonical command with complete Git history | No run for corrected Task head was observed; protected enforcement remains deferred to [NKF-012](../tasks/deferred/NKF-012-activate-protected-merge-gate.md) |
| Consumer adopter | `dist/nourd-nkf-adopt.mjs`, `.nourd/tools/nkf/nourd-nkf-adopt.mjs` | Public subcommand-free 0.4 Adopt resolver and exact installed copy, both SHA-256 `416b26e7...`; tracked build mirror makes pristine producer checks bootstrap-safe | Exact release byte confirmed by [ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md); installed state independently audited |
| Initial onboarding | `scripts/onboarding/`, `integrations/onboarding/`, portable onboarding skills | Agent-led Empty and Tiny Knowledge Product and Technology assessment, sealing, transaction, and rollback beneath public Adopt | 0.4 implementation confirmed by [ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) |
| Public documentation | `public-docs/` and the 0.4 archive | Complete 64-file 0.4 projection with two conformant examples and exact public adopter | Archive bytes confirmed and published; separate public mirror is not claimed current |
| Consumer exercise | `.github/workflows/nkf-consumer-adoption.yml`, tests, audit Evidence | Supported unadopted, 0.1, 0.2, native 0.3, native 0.4, and pinned-current paths plus rollback and tamper rejection | Local and fresh-clone runtime behavior independently audited; a successor workflow run remains separate |
| Latest result | `.nourd/validation-result.json` | Persists the latest full-bundle 0.4 observation and may become stale after any governed input changes | Conformance observation only; authority-binding not evaluated and Governing Use not-ready |
| Release tooling | `contracts/nkf/0.4/release-set.yaml`, `scripts/package-release.mjs`, `scripts/release/` | Sole 136-member, 18-class enumeration drives packaging, verification, manifest construction, Adopt, and public-documentation checks | Exact archive `a7912b92...` confirmed by [ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) and published byte-identically |

Supporting current Realizations provide the detailed mappings:

- [Contracts And Schemas](current/contracts-and-schemas.md)
- [Checker And Validation](current/checker-and-validation.md)
- [Layered Contract Enforcement](current/layered-contract-enforcement.md)
- [NKF 0.4 Security Maintenance](current/nkf-0.4-security-maintenance.md)
- [Agent-Led Initial Onboarding](current/agent-led-initial-onboarding.md)
- [Portable Knowledge Topology](current/portable-knowledge-topology.md)
- [Release Documentation And Adoption](current/release-documentation-and-adoption.md)
- [Self-Hosting](current/self-hosting.md)
- [Release Package](current/release-package.md)

The confirmed
[Initial Greenfield Onboarding](current/initial-greenfield-onboarding.md)
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
paths and filenames. Applicable frontmatter exposes orientation and must agree
with its declaration, but it does not replace either substantive CommonMark
meaning or the executable declaration.

This Realization owns a navigable implementation account. It does not compete
with the Specification, decide a Design disposition, accept knowledge, or
turn a passing check into confirmation.

The neutral authoring protocol and adapters guide capable AI surfaces without
becoming model authority. The project command and merge workflow judge exact
candidate bytes without asking an AI to decide conformance.

## Interfaces Dependencies Locators And Resolution

The native invocation starts at a candidate project root whose direct
`.nourd` entry must resolve safely inside that project. The bundle at
`.nourd/knowledge/bundle.yaml` selects exactly one concrete Root Profile and a
project-contained relative `knowledge_root`.

Record declarations resolve from `.nourd/knowledge/records/*.yaml` to exact
Markdown sources under `knowledge_root`. Technology bundles may additionally
bind project-contained governed artifacts. The checker dispatches trusted
exact contract sets from `contracts/nkf/0.2/`, `contracts/nkf/0.3/`, and
`contracts/nkf/0.4/` and uses Node.js with pinned package dependencies. The
producer's own bundle and installed pin now select the immutable published 0.4
archive. Immutable predecessor support remains available through frozen
authority, releases, and migration tooling rather than by changing an earlier
contract coordinate.

AI-assisted authoring begins from the neutral protocol. Registered host
surfaces resolve it through exact adapters or portable skills. Every handoff
uses `npm run nkf:check`, and the checked-in Github workflow invokes the same
command for the exact candidate commit.

Pre-adoption begins with the separate neutral onboarding protocol and external
candidate workspace. A participating agent reviews the complete repository,
records its assessment and applicable human confirmation in the plan, and then
hands exact mechanics to sealing. The public Adopt operation resolves a sealed plan into
exact knowledge, native declarations, and the same installed authoring
boundary only after a complete staged project passes.

For an adopted repository, public Adopt resolves the governed recommended
catalog, checks that the executing adopter and exact archive agree with it,
and observes the bundle and installed pin. An NKF 0.1 or NKF 0.2 predecessor
stops with the exact breaking signal until repository-owner approval is
supplied. Each installed predecessor is verified through its own pinned
adopter before migration. NKF 0.3 advances to 0.4 non-breakingly without
knowledge migration or breaking approval; same-version 0.4 refresh is also
non-breaking. The recommendation may move only through reviewed NKF
repository state; the consumer's content-addressed pin never moves by
implication.

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

The workflow exists in the repository and on remote `master`. The 0.3
recommendation was human-merged through pull request 6 at `master` commit
`60a0a96`. The current 0.4 recommendation and producer adoption remain on the
single [NKF-024](../tasks/active/NKF-024-release-nkf-0-4-dependency-security-maintenance.md) Task branch pending final human merge. Exact producer commit
`c5ed385...` passed local and independent fresh-clone validation, but no Github
Actions run for that exact head was established. Github, rather than this
Realization, remains authoritative for time-bound workflow state.

Github returned HTTP `403` for both branch-protection and repository-ruleset
access because the repository is private under the current plan. The required
check, review ownership, bypass controls, and blocked invalid pull-request
observation therefore remain unavailable and unconfirmed. No repository
visibility or subscription change was made.

[NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md) is complete for its confirmed authoring guidance, deterministic local
gate, and active exact-commit workflow. Deferred [NKF-012](../tasks/deferred/NKF-012-activate-protected-merge-gate.md) owns the required
`Validate` check, one mandatory pull-request approval, bypass policy, and
blocked-invalid-candidate observation. No release, deployment, or
external-consumer migration is part of either enforcement Task.

[NKF-008](../tasks/completed/NKF-008-publish-and-onboard-consumers.md) is complete for the confirmed 0.1 predecessor. Its private release,
recommendation, public repository, freshly cloned public bytes, complete
public examples, local consumer path, and Github consumer workflow were
observed separately and retained as Evidence. Those predecessor facts support
but do not replace [ADR 0066](../decisions/0066-confirm-release-documentation-and-adoption.md)'s confirmation act. NKF 0.2 remains a
separately published immutable predecessor. The governed catalog now
recommends exact NKF 0.4 on this Task branch, and recommendation alone migrates
no consumer.

The 0.3 successor was independently audited, confirmed, published,
re-downloaded, selected by a human-merged catalog commit, and installed into
this producer through ordinary public Adopt. The
[publication Evidence](../evidence/audits/nkf-023-nkf-0-3-publication.md) and
[producer-adoption Evidence](../evidence/audits/nkf-023-nkf-0-3-producer-adoption-audit.md)
own those operational observations; neither substitutes for acceptance or
technical confirmation.

The 0.4 successor was subsequently independently audited, technically
confirmed, published, re-downloaded byte-identically, selected by this Task
branch's exact recommendation, and installed into the producer through
ordinary public Adopt. Its
[publication Evidence](../evidence/audits/nkf-024-nkf-0-4-publication.md) also
reverified the immutable 0.3 predecessor, and the fresh
[producer-adoption Evidence](../evidence/audits/nkf-024-nkf-0-4-producer-adoption-audit.md)
verified pristine-checkout conformance, repeat `current`, exact pin agreement,
knowledge and predecessor preservation, and tamper rejection.

[NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md) is complete for the accepted initial greenfield scope. Exact-commit
contract and consumer workflows passed without annotations, the public
projection was freshly cloned and matched, the completion audit records no
unresolved material finding, and [ADR 0068](../decisions/0068-confirm-initial-greenfield-onboarding.md) separately confirms the exact
successor Realizations. These time-bound external observations remain
historical predecessor Evidence; they do not become authority merely because
this account records them.

[NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md) is complete for the agent-led Category 1 and Category 2 onboarding
scope. Private source commit
`53ae5217f68731d953f3bf616a578adeb033bb03` passed exact-commit run
`30655408945`. Public commit
`a14766ca1bdc67bfd8fb9e6d73355fc019017a90` matched its deterministic staging
projection in a fresh clone, and both public examples passed the confirmed
checker with no diagnostics. The publication Evidence owns those time-bound
observations; [ADR 0070](../decisions/0070-confirm-agent-led-initial-onboarding.md) separately confirms the exact successor. Consumer
onboarding is outside [NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md) and will be performed separately by the Human
Product Owner.

[NKF-017](../tasks/completed/NKF-017-complete-portable-onboarding-topology.md) is complete for the confirmed 0.1 portable Product and Technology
topology predecessor, continuing checker enforcement, initial onboarding, and
deliberate [NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md) or [NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md) predecessor repair. Later [NKF-019](../tasks/completed/NKF-019-decision-applicability-gate.md) and [NKF-020](../tasks/completed/NKF-020-version-release-adoption-and-compatibility-process.md)
work supersedes its current-release and current-projection status without
rewriting its confirmation evidence. Acceptance-binding and protected-merge
work remain deferred to [NKF-016](../tasks/deferred/NKF-016-deliver-acceptance-binding-verification.md) and [NKF-012](../tasks/deferred/NKF-012-activate-protected-merge-gate.md).

## Compatibility Verification And Recovery

Verification consists of strict authority-pair binding, schema compilation,
type checking, positive and negative fixtures, diagnostic coverage, unit and
integration tests, deterministic build verification, explicit self-host
declarations, and full-bundle validation.

The predecessor `npm run check` baseline passes type checking, 15 test files
with 102 tests, build, and deterministic build verification under [ADR 0059](../decisions/0059-confirm-governed-frontmatter-realization.md).
[NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md) adds the adapter verifier, eighteen focused positive and negative cases,
the unified `npm run nkf:check` command, and additional governed integration
artifacts.

The confirmed predecessor self-host successor contains 99 record declarations,
57 explicit non-record sources, and 109 governed artifacts. The confirmed
[NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md) completion contains 103 record declarations, 60 explicit non-record
sources, and 119 governed artifacts. Focused [NKF-008](../tasks/completed/NKF-008-publish-and-onboard-consumers.md) checks pass
eighteen test files with 126 tests, deterministic checker and adopter builds,
the public-documentation verifier, complete Product and Technology public
examples, Product and Technology installation, same-pin no-update, and
archive, pin, adapter, and knowledge tamper rejection. The [NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md) successor
passes nineteen test files with 135 tests, deterministic builds, local Product
and Technology exercises, public-byte verification, and full self-validation.

The [NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md) successor passes nineteen test files with 136 tests,
agent and onboarding guidance verification, deterministic checker and adopter
builds, public documentation verification, and full-bundle self-hosting. Its
first recommendation check correctly rejected the then-unpublished successor
adopter and its first exact-worktree check exposed the unbound `AGENTS.md`
policy. The Human Product Owner subsequently authorized both completion
boundaries. The successor was published and freshly verified, and its private
source commit passed the exact-commit workflow. Those observations remain
separate from [ADR 0070](../decisions/0070-confirm-agent-led-initial-onboarding.md)'s confirmation act.

The [NKF-017](../tasks/completed/NKF-017-complete-portable-onboarding-topology.md) successor passes nineteen test files with 151 tests, both neutral
guidance verifiers, deterministic checker and adopter builds, the 60-file
public-documentation projection with two complete examples, and full-bundle
self-host validation with zero diagnostics. The completion audit repaired the
Markdown diagnostic-registry omission, the circular release-recommendation
gate, and loose repair-receipt integrity checks before confirmation.

The current NKF 0.4 gate passes 28 test files and 210 tests, 1,034 living links,
deterministic checker and adopter reproduction, the complete 64-file public
projection, and full-bundle self-validation with zero diagnostics. Candidate
audit reproduced every archive member and supported state path before
[ADR 0114](../decisions/0114-confirm-the-nkf-0-4-release-candidate.md). The
post-publication audit then reproduced the release, recommendation, pristine-
checkout producer conformance, repeat `current`, exact tracked-byte
idempotence, and fail-closed pin, archive, and integration tampering.

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
preserved [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) extension seam. [ADR 0068](../decisions/0068-confirm-initial-greenfield-onboarding.md) supplies the separate exact-byte
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
claim; it does not revoke prior acceptance or silently change NKF meaning.
