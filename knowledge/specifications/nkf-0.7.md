---
id: nkf-0.7-specification
title: NKF 0.7 — Product And Technology Knowledge Format
type: specification
summary: NKF 0.7 makes semantic review carry-forward digest-bound and computable, confines fresh review to a declared per-rule semantic delta with a fail-closed delta claim, adds deterministic review and record scaffolds, neutralizes state-baked identity and stable paths through explicit succession, adds operational-fact promotion triggers, makes the post-audit technical-confirmation Decision mandatory and audit-bound, and cuts live support to the current version plus one predecessor.
created_at: 2026-08-14T22:00:00Z
---

# NKF 0.7 — Product And Technology Knowledge Format

- **Predecessor canonical baseline:** `knowledge/specifications/nkf-0.6-revision-3.md`
- **Predecessor canonical digest:** `bb602be39dbbb5d7c4f97726ea70a46da6af41cfc5de6c25ab6bac9beddfcb6a`
- **Predecessor executable baseline:** `contracts/nkf/0.6/revision-3/nkf.yaml`
- **Predecessor executable digest:** `7366ea1276282990733339e5bb4464ab9d9259592d5cffb2a84b000f734fd5e4`
- **Predecessor evaluation policy:** `contracts/nkf/0.6/freshness-policy.yaml`
- **Predecessor evaluation-policy digest:** `a870dc037364776b927e93705655d3f4572407c65852c4e5a258aa7d5bafe4a4`
- **Canonical destination:** `knowledge/specifications/nkf-0.7.md`
- **Executable companion destination:** `contracts/nkf/0.7/nkf.yaml`
- **Evaluation-policy destination:** `contracts/nkf/0.7/freshness-policy.yaml`
- **Version-delta declaration destination:** `contracts/nkf/0.7/version-delta.yaml`
- **Governing successor direction:** [ADR 0126](../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md)
- **Independent governing inputs:** the exact NKF 0.6 revision 3 authority set
  accepted by
  [ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md),
  the verifiable delta review direction adopted by
  [ADR 0126](../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md)
  with every originally reserved matter resolved by the Human Product Owner,
  the freshness and deterministic knowledge-graph direction adopted by
  [ADR 0115](../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md),
  and immutable publication and self-adoption boundaries from
  [ADR 0109](../decisions/0109-publication-freeze-and-proven-self-adoption.md)
- **Interoperability baseline:** Open Knowledge Format 0.2

> This exact revision is the canonical NKF 0.7 specification when accepted
> together with its digest-bound executable companion, evaluation policy, and
> version-delta declaration by the technical reviewer under the Human Product
> Owner's explicit derivation delegation. It realizes only the predecessor
> meaning and the direction adopted by
> [ADR 0126](../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md);
> governs repositories that deliberately declare NKF 0.7, and does not alter
> the immutable authority of NKF 0.1 through NKF 0.6.

The published NKF 0.6 complete set remains immutable at its exact archive,
authority, checker, adopter, and repository coordinates. Every producer
promotion before this version required a fresh whole-root semantic review
whose size grows monotonically, and the sealed predecessor baselines prove
that oversized reviews are performed nominally: carried judgments are
indistinguishable from performed ones, and a delta review must claim the
whole root because no delta claim exists. This successor binds every review
judgment to digests, computes carry-forward and the required fresh-review
closure deterministically, confines fresh review to the declared semantic
delta, neutralizes state-baked identity and stable paths, adds
operational-fact promotion triggers, makes the post-audit
technical-confirmation Decision mandatory and audit-bound, and cuts live
support to the current version plus one predecessor. It adds no deferred
Product capability and does not rewrite any published 0.6 member.

## Purpose

The **Nourd Knowledge Format (NKF)** is a human-readable, machine-verifiable
format for durable governed knowledge. NKF 0.7 supports Product and Technology
knowledge through two concrete Root Profiles.

The automatically applicable **Common Specification**, also called General in
architectural discussion, owns only the mechanics and semantic contracts
shared by both profiles. It is not a selectable profile. Every bundle selects
exactly one of:

- `nkf.profile.product`; or
- `nkf.profile.technology`.

The Product Profile governs whole-Product meaning. The Technology Profile
governs a durable technical subject that supplies technical capabilities,
contracts, or both to consumers and evolves independently of any one
consumer. `Shared Technology` remains organizational vocabulary rather than
an NKF profile name.

NKF remains a **format**. A possible future interaction, synchronization, or
acceptance protocol is reserved under the name **Nourd Knowledge Protocol
(NKP)**. The Nourd Knowledge Engine is an implementation that may consume NKF;
it does not define the format.

## Normative Status

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**,
and **MAY** express normative requirements in this specification.

NKF 0.7 is a pre-stable format version produced under the versioned contract
evolution accepted by [ADR 0076](../decisions/0076-versioned-contract-evolution.md).
The complete accepted NKF 0.6 revision 3 authority set and lineage remain the
predecessor meaning, including both Root Profiles, stable document nodes,
declared lifecycle, the deterministic graph, contextual freshness,
conservative impact review, revision-bound readiness, structural governed
mutation with truthful results, complete prepublication ordinary authoring
proof, the Apache-2.0 release membership, the Decision Applicability Gate,
deep-link and title rules, four-state Task vocabulary, immutable release set,
and public Adopt workflow.
[ADR 0126](../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md)
adopts only the verifiable delta review, identity and path neutrality,
operational-fact trigger, confirmation-ordering, support-window, scaffold,
provenance-classification, and test-harness direction.
Publication still freezes the exact complete set and a published release is
never replaced in place. Exact-candidate Adopt, complete ordinary producer
authoring rehearsal, and audit precede publication; the mandatory audit-bound
technical-confirmation Decision precedes publication; ordinary public producer
self-adoption and audit still precede merge. This revision governs a
repository only after it is accepted and that repository deliberately declares
`nkf_version` `0.7`; earlier NKF versions remain immutable authority for
repositories that declare them.

The `0.x` version communicates that public governance and compatibility are not
yet stable. A validator result, Git commit, merge, file status, or tool output
cannot accept a later revision. Only the applicable Human Product Owner or
another explicitly authorized acceptance authority can accept changed
governed meaning.

Conformance and acceptance are different:

- **conformance** means that a bundle satisfies the structural and semantic
  declaration requirements of a supported NKF contract; and
- **acceptance** means that an authorized actor has accepted an exact proposed
  revision as governing meaning.

A conformant Draft remains a proposal. An accepted record that becomes
structurally invalid is still part of accepted history, but a consumer MUST
surface the defect and MUST NOT silently reinterpret it.

## Source Drafting Provenance

This candidate Specification is authored while the producer repository still
declares NKF 0.6, as required by the prepublication sequence. Its frontmatter
is therefore the exact stable native 0.6 source envelope. Before candidate
Adopt it is represented as non-authoritative candidate Evidence at the exact
future canonical source path rather than a 0.6 Specification record, and the
candidate executable companion, evaluation policy, and version-delta
declaration are carried only as non-authoritative prospective artifacts. A
later accepted Decision may bind these exact Markdown, executable-companion,
policy, and version-delta bytes plus one exact producer-only promotion input
at `knowledge/evidence/release/nkf-0.7-producer-promotion.yaml`. That input is
a strict non-authoritative Evidence YAML artifact; it contains the exact four
authority bindings and the complete future native Specification record
declaration plus the exact destination
`.nourd/knowledge/records/nkf-0.7-specification.yaml`, including the
prospective `immutable`/`accepted` governance state and accepting-authority
identifier that candidate Adopt may apply only after the separate acceptance
Decision resolves. It contains no accepting-Decision digest and neither its
declared future state nor its validation proves or performs acceptance. The
accepting Decision separately binds the exact promotion-input digest,
avoiding a self-reference cycle.

At both authorized producer stages, 0.7 Adopt verifies the exact accepted
four-file set, the exact accepted promotion input, and the accepting
Decision, preserves the Markdown byte for byte, removes exactly that
candidate Evidence document representation, and creates the native 0.7
Specification declaration at the exact supplied declaration destination,
lifecycle `immutable`, status `accepted`, bound to the exact accepting
Decision, source digest,
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md),
and the complete exact section and relationship declaration supplied by the
accepted promotion input. The same promotion applies the accepted identity
succession and stable-path migration declared by this revision, exactly once,
transactionally, with complete rollback. A separate reviewer-completed
`nkf.semantic-review-input` for the exact post-promotion candidate is
required at execution time and produces the native 0.7 confirmed baseline.
That review is the deliberate last whole-root review this lineage requires by
construction: it seals the first fully digest-bound baseline, and every later
promotion in this lineage MUST be provable through the delta claim defined by
this revision, with whole-root review remaining the recovery path. No
ordinary consumer update can invoke this producer-only promotion. Validation,
migration, declaration generation, or the promotion input cannot supply
acceptance or derive the semantic section map.

The first authorized stage is candidate-bound Adopt into an isolated exact
producer copy before publication. It never mutates the live producer. The
second is ordinary public self-Adopt by the exact live NKF producer after the
immutable published archive has been acquired through the exact promoted
recommendation. Both stages use the same accepted promotion bytes, accepting
Decision, declaration destination, transactional postconditions, and rollback
rules; each uses a separately completed whole-root review for its exact
post-promotion candidate graph. After successful public promotion, a repeat
Adopt returns `current` only after it re-verifies the exact native 0.7
declaration, absence of the candidate Evidence representation, the applied
identity succession and path migration, generated integration, candidate
graph, and confirmed baseline. It performs no promotion mutation again. Any
non-producer repository, missing or extra candidate Evidence representation,
pre-existing conflicting declaration, or stage outside those two exact
producer cases fails before mutation.

The locked historical Evidence document for the superseded first NKF 0.6
acceptance attempt retains its exact
`historical_acceptance_attempt_lock` unchanged: it remains digest-bound,
graph-visible accepted history under the closed lock this lineage carries,
is not current release authority, and is not a reusable Evidence exemption.
Existing 0.5 records carrying the historical `accepted_bootstrap_lock` or
`prepublication_supersession_lock` retain those exact predecessor-only
declaration exceptions. Their exact source bytes, identities, locks, and
predecessor meaning remain immutable, and the exceptions are unavailable to
new 0.7-native records.

The original accepted Nourd Studio source established NKF 0.1 for Product
knowledge. The independent NKF repository later established the single
version namespace, Markdown-plus-YAML authority pair, deterministic
declarations, body responsibilities, validation, release, security, and
pre-stable evolution rules.
[ADR 0049](../decisions/0049-common-and-root-profiles.md) and the
Technology-first NKF self-hosting exercise establish the Common, Product, and
Technology division.
[ADR 0076](../decisions/0076-versioned-contract-evolution.md) established
versioned contract evolution after first consumer adoption. NKF 0.2 realized
the Decision Applicability Gate and later accepted corrections. NKF 0.3
established immutable publication, exact complete-set binding, and proven
self-adoption through
[ADR 0109](../decisions/0109-publication-freeze-and-proven-self-adoption.md).
NKF 0.4 shipped the separately frozen dependency-security maintenance set
through [ADR 0113](../decisions/0113-accept-the-nkf-0-4-authority-pair.md).
NKF 0.5 shipped stable document nodes, stable source paths across lifecycle
changes, one declared graph, contextual freshness, conservative impact
closure, baseline confirmation, and revision-bound receipts and readiness
through [ADR 0119](../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md).
NKF 0.6 corrected native governed mutation, made mutation results truthful,
moved complete ordinary producer authoring proof before publication, and
carried the Apache-2.0 licensing set through
[ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md).
This NKF 0.7 revision preserves that complete predecessor meaning and adds
only the verifiable delta review, identity and path neutrality,
operational-fact trigger, confirmation-ordering, support-window, scaffold,
provenance-classification, and test-harness direction adopted by
[ADR 0126](../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md).
Earlier versions remain immutable authority for repositories that declare
them, and consumers update deliberately.

## Scope

NKF 0.7 defines Common contracts and two concrete Root Profiles: Product and
Technology. Company, Organization, and other root knowledge remain unsupported
until their requirements are understood and accepted.

NKF 0.7 defines:

- a project-contained knowledge bundle with fixed `.nourd` metadata and a
  configurable canonical knowledge root;
- one canonical Markdown source and one YAML declaration per governed record;
- stable bundle, record, section, and semantic-entity identity;
- Common record types and their minimum body contracts;
- Product and Technology root-specific record types, bodies, vocabularies,
  hierarchy, and validation;
- lifecycle, authority, provenance, and acceptance semantics;
- stable record, entity, and document nodes whose identity does not depend on
  source path;
- one canonical declared graph, source-section-bound relationship facts, and
  separately versioned evaluation policy;
- contextual applicability, freshness, impact closure, Decision
  reconciliation, reviewed baseline confirmation, operational receipts, and
  whole-root readiness;
- a required Decision Applicability Gate for Task non-records, with closed
  verification-level and capability-finding vocabularies;
- digest-bound review baselines whose judgments bind node-revision and basis
  digests, with computed carry-forward and performing-baseline provenance;
- a per-rule version-delta declaration in each accepted authority, with the
  closed classifications `identical`, `mechanically-transformable`, and
  `semantically-new`;
- a `semantically-reviewed-delta` claim admitted only when the freshly
  reviewed set contains the deterministically computed re-review closure;
- persisted Decision classifications keyed on Decision record digest and
  purpose;
- deterministic review and record-declaration scaffolds that supply structure
  and never a judgment;
- explicit identity succession for living records and lifecycle-neutral
  stable-path rules;
- operational-fact dependency declarations and post-promotion reconciliation
  that blocks readiness until reconciled;
- a mandatory post-audit, audit-bound technical-confirmation Decision before
  publication;
- a live support window of the current version plus one predecessor, with
  stepping-stone migration through immutable published archives;
- a closed provenance-attachment class for non-Markdown evidence inputs under
  the knowledge root;
- typed record and semantic-entity relationships;
- Realization and external-authority bindings;
- the boundary between knowledge and operational instances;
- one native project layout;
- one content-addressed checker release package and manifest, including exact
  Apache-2.0, informational NOTICE, and third-party-notice bindings; and
- a deliberate export mapping to OKF 0.2.

NKF 0.7 does not define:

- Task execution or a business workflow; the closed Task-state vocabulary is
  declared knowledge metadata, not operational scheduling authority;
- Workflow Runs, Steps, sessions, deployments, current availability,
  synchronization state, or live observations;
- one storage engine, graph database, API, user interface, validator,
  acceptance workflow, or enforcement mechanism;
- a runtime wire protocol;
- cross-bundle semantic relationships;
- Company or Organization knowledge contracts;
- legal title or rights proof, trademark permission, public governance,
  registry hosting, repository visibility, or public-access policy; or
- cross-repository graph traversal, network crawling, or live external-state
  authority;
- an intrinsic context-free document status; or
- universal validation expiry or authority freshness outside the contextual
  document-freshness contract.

## Core Model

NKF separates four layers:

```text
Semantic entity → Realization → Operational instance → Observation
```

A **Knowledge Bundle** is a distributable set of governed knowledge with one
stable identity, exactly one root record, and exactly one concrete Root
Profile.

The Common Specification applies automatically. `nkf.common` cannot be
selected, instantiated, used as a fallback, or accepted as `root.profile`.

A **Record** is a governed unit of knowledge. It is a composite of:

1. one Markdown source that owns the human meaning; and
2. one YAML declaration that identifies, binds, classifies, and relates that
   meaning.

A **Semantic entity** is an independently addressable meaning defined by an
exact record section. Records are governance and reading units; entities are
semantic topology units. A record may define zero, one, or several entities.

An earlier Nourd-specific Knowledge semantic-model draft was an input to this
model. Acceptance of NKF 0.1 supersedes that standalone draft for overlapping
scope rather than leaving two semantic-model authorities.

A **Realization** is a durable mapping from governed meaning to a Source,
system, service, process, agreement, asset, integration, or implementation.
It may define how real instances are found or governed, but it does not own
their live state.

An **Operational instance** is a concrete running, stored, connected, or
externally managed instance. An **Observation** is a time-bound fact about an
instance or event. NKF may contain durable definitions, bindings, and reviewed
Evidence about these layers; it MUST NOT become the authoritative store for
their live state merely by describing them.

Every datum MUST have one writable authority. Canonical Markdown, declarations,
generated projections, operational stores, and connected systems MUST NOT
compete for the same authority.

## Versioning

NKF format versions use `<major>.<minor>`.

- Publication of an exact content-addressed NKF release archive and manifest
  under its release tag freezes that version's complete set. Every later
  change to any member ships as a new version with its own immutable accepted
  Specification revision, digest-bound executable companion, derived Schemas,
  and versioned release, even when no repository adopted the prior release.
- Before NKF `1.0`, a minor version MAY include breaking changes when it
  ships with explicit migration meaning. This supersedes the earlier NKF 0.1
  rule that a minor version only adds backward-compatible vocabulary.
- A major version MAY make breaking changes.
- NKF `1.0` is reserved for the first public stable release.
- NKF keeps one current version namespace at a time. A checker that does not
  support a bundle's declared `nkf_version` MUST fail closed rather than
  validate against another version's meaning. A repository that declares an
  earlier supported version remains valid against that version's immutable
  meaning; nothing migrates by implication.

Before publication, exact candidate bytes MAY change coherently under their
governed Task. Any exact-byte claim about an earlier candidate ceases to apply
when those bytes change. After publication, a change never edits, replaces,
deletes, or rebinds the frozen version in place: it begins the next version's
candidate set, derived and accepted separately, while every published version
remains retrievable and validatable.
A defective release MAY stop being recommended or be marked withdrawn or
superseded operationally without changing its frozen bytes. Task lifecycle,
audit Evidence, recommendation state, and other records outside the complete
set do not independently allocate a format version.

An NKF version identifies one complete frozen set: the normative
Specification revision, its digest-bound executable companion, the derived
Schemas, release-set contract, release manifest, checker, adopter, authoring,
onboarding, release, and adoption protocols, portable skills and host-adapter
instruction content, fixtures, examples, and documentation projection. Every
artifact in the set declares the version it serves, the version's release
archive carries the exact set, and nothing in a released set changes
afterward: a guidance or checker correction is a new version exactly like a
specification correction. Superseded versions are not kept in the working
tree; they remain retrievable from version-control history and their immutable
release archives.

Installed portable guidance MUST declare the NKF version it serves through
the exact marker defined by the executable companion. When a governed
project contains a guidance file at a native guidance path, a missing marker
or a declared version different from the bundle's `nkf_version` emits
`guidance.version.mismatch`. Absent guidance files are not themselves a
conformance failure.

How the NKF repository exercises a candidate and how an adopted repository
Adopts a published version are governed process, not consumer knowledge-format
meaning. Their protocols remain members of the complete versioned set and
therefore freeze at publication.

NKF 0.7 live-implements exactly the current version plus one predecessor:
the 0.7 checker and adopter dispatch NKF 0.7 and NKF 0.6 and no earlier
contract. This support window is standing publishing policy: until further
explicit Human Product Owner notice it remains the current version plus one
predecessor even after the first external adoption, and no adoption event
widens it by implication. A repository declaring a version older than the
window migrates through immutable published archives as stepping stones,
each hop using that archive's own bundled adopter with an explicit archive
and digest. A 0.7 tool encountering an out-of-window version MUST fail
closed and MUST name the exact next stepping-stone release archive rather
than refusing unexplained.

This Specification defines the format-visible predecessor compatibility:
updating an exact conformant NKF 0.6 repository to NKF 0.7 is `breaking` and
requires repository-owner approval before mutation, even though migration
preserves canonical Markdown bytes and historical authority. The break
allocates the identity succession and lifecycle-neutral stable-path
migration defined by this revision, converts the reviewed baseline to the
digest-bound 0.7 baseline contract, and classifies non-Markdown provenance
attachments. Baseline conversion computes carry-forward per judgment: a
judgment carries only when the judged node revision, its basis digest, and
every rule it depends on are `identical` under the accepted 0.6-to-0.7
version-delta declaration; everything else enters the required fresh-review
set of the promotion review. The updater never invents, discards, or
reinterprets semantic review; a repository whose 0.6 baseline is missing,
outdated, disputed, ambiguous, or otherwise not ready is ineligible for
migration until a separate governed 0.6 knowledge-maintenance operation
restores it. An exact NKF 0.7-to-0.7 refresh is `non-breaking`, requires no
migration, and requires no repository-owner approval because the governing
format version does not change.

NKF has one version namespace: the NKF format version. A bundle MUST declare
`nkf_version`. NKF 0.7 uses the unversioned canonical identities `nkf.bundle`,
`nkf.record`, `nkf.contract-set`, `nkf.release-manifest`, `nkf.common`,
`nkf.profile.product`, `nkf.profile.technology`, and the supported body
identities. They are all governed by the one NKF version coordinate, `0.7`.
Profile identity is not an independent version coordinate.

The sole NKF 0.7 record definition includes explicit responsibility bindings.
Older external record structures are legacy-consumer formats, not supported
parallel NKF contracts. They may be retained as provenance and deliberately
migrated by their consumers, but MUST NOT be reported as native NKF 0.7
conformance or automatically converted.

A repository or distribution MUST pin the exact specification revision it
uses through immutable distribution metadata or version control. The human
version `0.7` alone does not identify editorial changes to a draft.

NKF 0.7 uses OKF 0.2 as its interoperability baseline. A later OKF release
does not automatically change NKF. Each rebase MUST be reviewed deliberately,
document compatibility effects, update the mapping, and produce a new NKF
revision when needed.

Existing `nourd.knowledge.*` contracts remain the Nourd Studio bootstrap
contracts. NKF 0.7 does not silently rename or reinterpret them. A controlled
migration or verified profile mapping is required before a repository using
those identifiers can claim native NKF contract conformance.

## Bundle Contract

The native checker is invoked with a candidate project-root directory. Before
validation begins, its direct `.nourd/` entry MUST already exist and safely
resolve to a directory inside that candidate project root. When this
precondition is not met, the checker MUST report an execution-level failure
outside the native diagnostic contract, MUST NOT construct or persist an
`nkf.validation-result`, MUST NOT create, replace, or repair `.nourd/`, and
MUST NOT follow an unsafe `.nourd/` path.

After the invocation precondition passes, the project root is the directory
that directly contains `.nourd/`. Native NKF 0.7 fixes:

```text
<project-root>/
├── .nourd/
│   └── knowledge/
│       ├── bundle.yaml
│       ├── records/
│       └── freshness/
│           └── baseline.yaml
└── <configured-knowledge-directory>/
```

The manifest is `.nourd/knowledge/bundle.yaml`. Record declarations are UTF-8
`.yaml` files in the flat `.nourd/knowledge/records/` directory.
When the invocation precondition passes but the fixed manifest is absent,
`bundle.manifest.missing` remains the native parse diagnostic.

The manifest is a closed object with these required fields:

| Field | Responsibility |
| --- | --- |
| `nkf_version` | Constant NKF version `"0.7"` |
| `contract` | Constant bundle identity `nkf.bundle` |
| `id` | Non-empty stable bundle identity |
| `root` | Closed object selecting one root record and one concrete Root Profile |
| `knowledge_root` | Canonical knowledge directory relative to the project root |
| `non_records` | Explicit non-governing file declarations; present and possibly empty |
| `knowledge_graph` | Exact evaluation-policy selection and reviewed-baseline location |

It may additionally contain only `canonical_terms`, `governed_artifacts`,
`external_dependencies`, `authority_inputs`, `extension_contracts`, and `extensions` under the
contracts below. Unknown
top-level fields fail closed. Native NKF 0.7 has no `product_record`,
`record_contract`, `markdown_root`, `records_root`, `required_extensions`, or
free-form top-level extension field.

`root` contains exactly:

```yaml
root:
  record: <root record ID>
  profile: nkf.profile.product | nkf.profile.technology
```

`nkf.common` applies automatically and MUST NOT appear as `root.profile`.
Unknown, missing, unavailable, or unsupported profiles fail closed. The root
record resolves uniquely, has the type and body required by the selected
profile, and is the only record of that root type.

`knowledge_root` is a non-empty project-root-relative directory path. It is
not relative to the manifest, must resolve inside the project root and outside
`.nourd`, and must not be absolute; contain an empty, `.` or `..` segment; use
environment-variable or `~` expansion; or escape after symlink resolution.

Record `source.path` and `non_records[].path` are relative to
`knowledge_root`. Stored paths use `/`, are interpreted literally, and have no
leading slash, Windows drive or UNC prefix, NUL, ASCII control character,
empty segment, `.` segment, or `..` segment. Path spelling and case are exact.
NKF core adds no Windows-reserved-name or Unicode case-folding rule.

Each `non_records` entry is closed and contains:

```yaml
path: README.md
kind: navigation
reason: <optional non-empty explanation>
document: <optional stable document-node declaration>
```

`kind` is exactly `navigation`, `task`, `evidence`, `generated`, `redirect`,
`provenance-attachment`, or `other`.
`reason` is required and non-empty for `other`, and optional otherwise. The
path resolves to an existing regular file. Resolved paths are unique and
cannot also be record sources. List order carries no meaning.

`provenance-attachment` classifies a non-Markdown provenance input preserved
under the knowledge root — an imported source snapshot, decision input, or
similar exact historical byte set. It is inert: it carries no document node,
no graph participation, and no authority; its declaration binds only `path`
and, when declared, an exact digest. Every regular file under the knowledge
root MUST be exactly one of a record source, a declared non-record document,
or a declared provenance attachment; an undeclared file under the knowledge
root fails closed. A `provenance-attachment` selector MAY declare one
directory subtree through `path` plus `selection: recursive-regular-files`,
covering every regular file beneath it.

`document` is required for `task` and `evidence`, forbidden for `generated`,
`redirect`, and `provenance-attachment`, and optional for `navigation` and
`other`. When present it is
a stable Common document node:

```yaml
document:
  id: <bundle-unique stable document-node ID>
  stable_path: <initial path retained across lifecycle changes>
  digest: {algorithm: sha-256, value: <exact Markdown digest>}
  state: <optional declared lifecycle state>
  relationships: []
  freshness: <optional expiry and invalidation declarations>
  historical_acceptance_attempt_lock: <exact closed historical containment>
```

`stable_path` MUST equal the enclosing `non_records[].path`; after onboarding
or migration neither changes for any lifecycle, freshness, or ordinary
governed-content change. An explicit successor document receives a new stable
identity and path instead of moving the predecessor. The node adds independent
identity, revision, graph participation, and
freshness evaluation only. It does not promote the non-record to a record,
make it governing, prove authority, or change the meaning of `kind`. The node
ID and stable path remain unchanged after allocation and are unique against
record IDs and other document-node IDs. An existing Task's exact `task_id`
becomes its document-node ID during migration. A new 0.7 Task is created with
one explicit stable Task ID, which is also its document-node ID. Every other
migration-generated document ID is `document-` followed by the lowercase
SHA-256 of the UTF-8 bundle ID, one NUL byte, and the initial
knowledge-relative path. An existing Task ID that is absent, unsafe, or
collides with any record or document ID blocks migration for governed
resolution; it is never silently renamed. After any ID is persisted the path
never participates in identity again.

`state`, when present, contains exactly `vocabulary`, `value`, and optional
`basis`. Native Common vocabularies are `task-status` with `active`,
`deferred`, `completed`, and `cancelled`, and `design-disposition` with
`active`, `adopted`, `rejected`, `superseded`, and `withdrawn`. A Task document
requires `task-status`; a Design record requires `design-disposition` in its
record declaration. `basis` is an order-insensitive, duplicate-free list of
same-bundle Task or record references that identifies the recorded state
source without making the reference an acceptance act.

`relationships` is present and possibly empty. Each fact is authored once in
its canonical semantic direction, targets one stable record, document, or
entity node reference, and binds the exact source heading that supplies its
meaning. Duplicate inverse facts are forbidden and generated inverses do not
become declarations. `freshness`, when present, may declare a fixed UTC expiry
instant and closed invalidation triggers. Every trigger has a stable ID, one
closed kind, an exact resolvable subject for that kind, and a source binding to
the record section or document heading that declares it. `source-changed`
subjects are exact node-reference JCS strings; `artifact-changed` subjects are
governed-artifact IDs; external and authority subjects are their declared
observation IDs; and `manual` names an exact request observation. A freshness
declaration describes evaluation inputs and never declares a computed result.
`historical_acceptance_attempt_lock` is forbidden except on the one exact
Evidence document and with the one exact closed value defined under Source
Drafting Provenance. It is neither a lifecycle state nor a reusable exemption.

`knowledge_graph` is a closed object containing exactly:

```yaml
knowledge_graph:
  policy: nkf.freshness-policy.0.7
  baseline: .nourd/knowledge/freshness/baseline.yaml
```

The policy identity resolves to the exact digest-bound policy distributed by
the adopted NKF release. The baseline path is project-root-relative, fixed for
NKF 0.7, outside canonical Markdown, and governed by the baseline contract
below. A checker MUST bind the exact installed policy bytes and MUST fail
closed on a missing, unsupported, or mismatched policy.

Every Markdown file recursively under `knowledge_root` has exactly one
representation: one record declaration or one `non_records` entry.
Non-Markdown assets need not be listed; listed assets follow the same
existence, containment, uniqueness, and classification rules.

The Technology Profile may additionally declare `governed_artifacts`. Each
entry is a closed object containing:

```yaml
- id: <bundle-unique artifact ID>
  kind: executable-contract | schema | checker-source | test | fixture | build-tool | project-configuration
  path: <project-root-relative regular-file path>
  digest:
    algorithm: sha-256
    value: <64 lowercase hexadecimal characters>
  record: <Technology Realization record ID>
  source_section: <section ID in that Realization>
```

Artifact IDs, lexical paths, resolved physical files, and exact entries are
unique. The path remains inside the project, is not inside `.nourd`, resolves
to a regular file, and follows the same unsafe and generally prohibited
symlink rules. `record` resolves to an `nkf.realization`, and
`source_section` resolves there.

Every declared governed artifact is a Governed Validation Input and
contributes its structural state and exact bytes to the validated snapshot.
Existence and digest validation establish binding integrity only. They do not
establish semantic adequacy, implementation correctness, acceptance, or
confirmed Realization. Product bundles MUST omit `governed_artifacts`.

`external_dependencies`, when present, is a non-empty order-insensitive array
with unique IDs. Each closed entry contains:

```yaml
- id: <bundle-unique dependency ID>
  authority: <external authority identity>
  dependent: <local record, document, or entity node reference>
  relationship: depends-on
  source_binding:
    kind: section
    node: {kind: record, id: <same local record ID>}
    section: <declaring record section ID>
  source:
    repository: <optional durable repository identity>
    bundle: <optional durable external bundle identity>
  revision:
    exact: <exact external revision>
  observability:
    observation_id: <request observation identity>
```

`source_binding` binds the exact dependent record/entity section or document
heading and its node MUST equal `dependent`. `source` contains at least one of
`repository` or `bundle`. `revision` contains exactly one non-empty `exact`
string. `observability` contains exactly one non-empty `observation_id`. A
native 0.7 checker matches a supplied external observation by that exact ID
and compares its `observed_revision` to the declared exact revision; absence
yields `unknown` and mismatch yields `stale`. Native network resolution and
free-form revision rules are unsupported. `dependent` resolves locally and
`relationship` is exactly
`depends-on`: the local node requires the externally authoritative source.
The declaration is not a cross-bundle graph edge and does not invent an
external NKF node. Its exact normalized entry participates in graph revision;
a declaration or observed-revision change selects the dependent as an initial
change. This records dependency meaning and the observation boundary without
copying external state into NKF authority.

`authority_inputs`, when present, is a non-empty order-insensitive array of
closed entries with unique `id` and observation identity. Each entry binds an
external authority string, one local `subject` node, the exact local
record-section or document-heading source binding that declares the reliance,
one non-empty `expected_revision`, and one supplied `observation_id`. The
source-binding node MUST equal the subject. The checker matches an authority
observation by that ID and compares its observed revision to the expected
revision; absence yields `unknown` and mismatch yields `stale`. It performs no
network resolution and grants no authority. The exact entry participates in
graph revision, and a declaration or observation change selects its subject as
an initial change.

`canonical_terms` is omitted when empty. When present it is a non-empty,
order-insensitive array of unique, non-empty comparison strings. A term has no
leading or trailing whitespace, uses one U+0020 space between words, contains
no Markdown markup, and retains its exact case-sensitive spelling.

The NKF-owned canonical-term set contains exactly `NKF`. A project term cannot
repeat or override an NKF-owned term. Exact and case-only conflicts use Unicode
17.0.0 Default Caseless Matching and fail conformance.

One governed Markdown file has exactly one record declaration. A declaration
may map many sections, responsibilities, entities, entity relationships, and
bindings, but several declarations cannot divide one Markdown source by
section. Duplicate record IDs, duplicate source paths, or different paths
resolving to the same source file are invalid.

The declaration filename SHOULD be `<record-id>.yaml`. A mismatch produces a
navigation warning but does not change identity or conformance.

Symlinks are generally prohibited. A broken, cyclic, or project-escaping
symlink fails structural conformance. A symlink whose complete target remains
inside the project may be read but produces a portability warning; a knowledge
path target must also remain inside resolved `knowledge_root`. The final target
must have the required file kind and duplicate-physical-file rules still
apply.

### Portable Knowledge Topology

Every Product and Technology bundle using this successor NKF 0.7 revision
MUST contain the following Common portable topology under its configured
`knowledge_root`:

| Path | Required Native Representation |
| --- | --- |
| `README.md` | One `navigation` non-record; the single canonical knowledge map |
| `tasks/README.md` | One `navigation` non-record linking the four Task-state indexes |
| `tasks/by-state/active.md` | One generated projection indexing Active Tasks |
| `tasks/by-state/deferred.md` | One generated projection indexing Deferred Tasks |
| `tasks/by-state/completed.md` | One generated projection indexing Completed Tasks |
| `tasks/by-state/cancelled.md` | One generated projection indexing Cancelled Tasks |
| `designs/README.md` | One `navigation` non-record linking the five Design-disposition indexes |
| `designs/by-disposition/active.md` | One generated projection indexing Active Designs |
| `designs/by-disposition/adopted.md` | One generated projection indexing Adopted Designs |
| `designs/by-disposition/rejected.md` | One generated projection indexing Rejected Designs |
| `designs/by-disposition/superseded.md` | One generated projection indexing Superseded Designs |
| `designs/by-disposition/withdrawn.md` | One generated projection indexing Withdrawn Designs |
| `decisions/README.md` | One `navigation` non-record indexing Decisions |
| `specifications/README.md` | One `navigation` non-record indexing Specifications permitted by the selected profile |
| `realizations/README.md` | One `navigation` non-record linking the current-system Realization and supporting-current index |
| `realizations/current-system.md` | Exactly one Realization record with body `nkf.realization` |
| `realizations/current/README.md` | One `navigation` non-record indexing supporting current Realizations |
| `evidence/README.md` | One `evidence` non-record exposing the Evidence areas used by the project |

Every required path resolves to one safe regular file. Generated lifecycle
projections are declared as `kind: generated`, carry no document node or
governed frontmatter, and derive entirely from YAML state. Every required path
MUST NOT be a
symbolic link, special file, duplicate physical target, record and non-record
conflict, or multiple representation. Required `navigation` files use the
normal Markdown source envelope; generated projections do not.
`evidence/README.md` retains the Common
Evidence frontmatter exemption. Empty indexes state that no applicable item is
currently represented; their existence does not create a semantic record,
Task state, Design disposition, Decision, Specification, Realization
confirmation, Evidence, acceptance, or operational state.

`README.md` contains exactly one managed navigation block delimited by the
literal lines:

```text
<!-- nkf-navigation:start -->
<!-- nkf-navigation:end -->
```

The block contains exactly one direct-child level-two heading named
`NKF Navigation`. It links exactly once to the root record source,
`tasks/README.md`, `designs/README.md`, `decisions/README.md`,
`specifications/README.md`, `realizations/README.md`,
`realizations/current-system.md`, and `evidence/README.md`. Targets are
project-relative from `README.md`, use exact case, remain inside
`knowledge_root`, and resolve to the declared native source. Link labels and
prose do not create semantic status.

A participating topology link is a CommonMark link node, other than an image
or autolink, that satisfies a required managed-map or lifecycle-index target.
Its resolved destination has no URI scheme, authority, query, fragment,
percent escape, backslash, NUL, or ASCII control character. The checker
resolves `/`-separated path segments lexically from the containing Markdown
file's directory, permits `..` only while the normalized result remains inside
`knowledge_root`, and compares the final exact-cased knowledge-relative path.
Required targets occur exactly once. Other links do not participate in
topology validation and cannot alter the required target set or lifecycle
truth.

The CommonMark body outside the managed block is project-owned. Native
validation MUST NOT rewrite or reinterpret it. An onboarder or migration tool
MUST preserve its exact bytes unless project authority approves an explicit
candidate change. Missing frontmatter may be added through an explicit
candidate while preserving the predecessor body bytes. Another direct-child
`NKF Navigation` heading outside the block, a missing, duplicated, reversed,
nested, or otherwise ambiguous marker pair, a competing generated
`README-<number>.md` map, an unresolved required target, or a required target
outside the managed block fails conformance.

Lifecycle navigation uses explicit native YAML state as its sole current
source of truth:

- every Task document node declares `task-status` and is linked exactly once
  from the matching generated state index;
- every Design record declares `design-disposition` and is linked exactly
  once from the matching generated disposition index;
- every Decision record is below `decisions/` and is linked exactly once from
  `decisions/README.md`;
- every Specification record is below `specifications/` and is linked exactly
  once from `specifications/README.md`;
- `realizations/current-system.md` is the sole consolidated current-system
  Realization; and
- every supporting current Realization below `realizations/current/` is
  linked exactly once from `realizations/current/README.md`.

The parent Task, Design, and Realization indexes link their required child
indexes and current-system source exactly once. Lifecycle indexes are
deterministic replaceable generated projections over declaration state; their link
targets may live at any safe stable knowledge-relative path. Directory
placement, Markdown frontmatter, and links never assign type, state,
disposition, acceptance, normative authority, or confirmation.
Historical Evidence need not be exhaustively linked because immutable source
snapshots may preserve historical layouts. `evidence/README.md` MUST link each
safe direct child directory of `evidence/` that contains a represented
Evidence Markdown file at any depth. It need not link every Evidence file.

The 0.7 migration performs one deliberate lifecycle-neutralization of stable
paths: every Task, Design, and Realization source whose stable path contains
a lifecycle, disposition, or currency segment — the legacy `tasks/active`,
`tasks/completed`, `tasks/deferred`, `tasks/cancelled`, `designs/active`,
`designs/adopted`, `designs/rejected`, `designs/superseded`,
`designs/withdrawn`, and `realizations/current` trees — moves exactly once to
the corresponding neutral `tasks/items/`, `designs/items/`, or
`realizations/items/` path, with declarations, navigation, and same-bundle
links rewritten mechanically in the same transaction and immutable record
meaning untouched. Sources carrying a predecessor-only lock are moved without
any byte rewrite — their locks bind exact predecessor bytes — and their
historical links resolve through the closed legacy mapping defined by this
neutralization instead of being retargeted. This is a deliberate governed migration act, not a
lifecycle transition. After it, stable paths never move again: a lifecycle
transition changes only the declaration state and generated navigation and
MUST NOT move or rewrite the canonical Markdown source. New Task, Design, and
Realization sources use the neutral `tasks/items/`, `designs/items/`, and
`realizations/items/` paths, and a new stable path or new living-record
identifier MUST NOT assert a version, lifecycle state, disposition, or
currency; immutable version-scoped snapshots keep their version-bearing
identifiers. Unresolved pre-NKF Markdown may remain at a non-canonical path
while represented appropriately. Once a project adopts this successor
revision, the complete topology, stable-path rule, and generated navigation
agreement are continuing conformance requirements.

### Portable Topology Onboarding And Migration

Initial Category 1 and Category 2 onboarding creates the complete Common
topology, neutral `tasks/items/` and `designs/items/` source directories, and
generated lifecycle navigation at `tasks/by-state/*.md` and
`designs/by-disposition/*.md`. Those generated files contain no governed
frontmatter and are not document nodes. The Product Profile additionally creates one
Draft Product root at
`product.md` when that canonical path is free. The Technology Profile creates
one Draft Technology root at `technology.md` and one Draft Specification at
`specifications/initial-specification.md` when those canonical paths are free.
An inspected, safe existing root or Specification path may remain when the
candidate plan selects it explicitly. Filesystem location does not replace
native record identity or profile meaning.

The generated managed navigation block additionally links the active
onboarding Task and, for Technology, the initial Specification. The onboarding
Task is created below `tasks/items/`. Those onboarding-only targets are
verified during candidate sealing and initial application. After lifecycle
change, continuing conformance is established through generated Task and
Specification indexes rather than a permanent special onboarding role.

When `README.md` is absent, onboarding generates it. When it exists, onboarding
reuses that path and document identity, adds or reconciles the single managed
block, and preserves project-owned bytes as defined above. It MUST NOT allocate
`README-2.md` or another suffixed authority copy. An existing required index is
reconciled in place when its meaning and representation are unambiguous.
Conflicting record use, unsupported file kind, unsafe path, symbolic link,
duplicate physical target, or semantic ambiguity stops before project
mutation.

A project created by one of the two confirmed predecessor onboarding
generations may use an
explicit `repair-topology` workflow only when a trustworthy onboarding receipt
identifies the predecessor release and exact generated paths. The workflow
constructs and seals a candidate outside the project, creates missing indexes,
reconciles `README.md`, and removes a predecessor-generated competing map only
when the receipt identifies the exact path and its current bytes match the
known generated predecessor. Drift, consumer-authored content, or missing
receipt lineage fails for human resolution.

Repair uses the onboarding transaction, staged full-bundle validation,
rollback, and idempotence boundary. Its receipt records predecessor and
successor releases plus created, changed, removed, and preserved paths.
Repeating the exact successful repair returns `no-update`. A repository without
trustworthy predecessor evidence requires a governed migration plan. No
historical release changes meaning, no topology sub-version is introduced, and
no consumer migrates silently.

Live migration into NKF 0.7 exists only from NKF 0.6, per the support
window. The breaking 0.6-to-0.7 migration preserves every canonical Markdown
byte, performs the one deliberate stable-path neutralization defined above,
applies each accepted identity succession, upgrades declarations to the 0.7
shapes, classifies non-Markdown provenance attachments, converts the reviewed
baseline to the digest-bound 0.7 baseline contract with computed per-judgment
carry-forward under the accepted 0.6-to-0.7 version-delta declaration, and
regenerates navigation. Preserved predecessor-only `legacy_lock`,
`accepted_bootstrap_lock`, `prepublication_supersession_lock`, and
`historical_acceptance_attempt_lock` objects remain byte-exact where their
subjects remain; a lock whose predecessor migration is complete and whose
subject is rewritten to the native envelope is removed in the same governed
act. Repositories declaring NKF 0.1 through NKF 0.5 are out of window: the
0.7 tool fails closed and names the exact published stepping-stone archive
whose bundled adopter performs the next hop.

Mechanical migration cannot confirm semantic-edge completeness or perform
review. Before the migrated candidate may be sealed or applied, the required
fresh-review set computed by the delta rules — or the whole root, when
completeness is missing or disputed — is reviewed by a named human or agent
who supplies exact review evidence, and the baseline is sealed from it.
Missing, outdated, disputed, or ambiguous baseline evidence produces
`unknown` and blocks adoption. The repository-owner breaking approval and the
semantic reviewer may be different actors; neither act implies acceptance of
canonical Product or Technology meaning. The updater never invents, carries,
or discards a judgment outside the computed rules.

The NKF producer's candidate-bound promotion is a separate, producer-only
path: it consumes the accepted serialized promotion input, removes the exact
prospective Evidence representation, creates the native 0.7 Specification
declaration at the supplied destination, applies the accepted succession and
path migration exactly once, and seals the exact post-promotion graph from a
separate completed whole-root review — the deliberate last whole-root review
this lineage requires. The predecessor-only locks are forbidden on that new
0.7 record.

## Record Contract

Every governed record MUST have exactly one canonical Markdown source and one
YAML declaration.

The Markdown source:

- MUST be UTF-8 Markdown;
- MUST contain exactly one level-one title;
- MUST own all human meaning asserted by the record;
- MUST use headings to make semantic sections addressable; and
- MUST NOT require the declaration to complete an otherwise absent semantic
  claim.

A safely readable declared record source whose exact bytes are not valid UTF-8
emits `markdown.utf8.invalid`. The diagnostic identifies its project-relative
artifact and record ID but does not copy invalid bytes, decoded replacements,
or surrounding content.

The YAML declaration:

- MUST identify and bind the exact Markdown bytes;
- MUST classify every semantic level-two and level-three section;
- MUST declare relationships only when the source establishes them;
- MUST NOT contain native presentation settings; and
- MUST NOT introduce, strengthen, accept, or reinterpret meaning absent from
  the Markdown source.

Every record's `source` additionally carries `stable_path`, equal to
`source.path`. After onboarding or migration neither field changes for any
lifecycle, disposition, freshness, or ordinary governed-content change. A
successor record receives its own stable identity and path. Paths remain
locators rather than identity, but stable canonical locators preserve durable
links and revision-independent addressability.

### Markdown Source Envelope

The complete governed Markdown source is the exact UTF-8 byte sequence bound
by the record digest. It consists of an optional front-matter envelope
followed by one CommonMark body.

The optional envelope exists only when the first source line is exactly
`---`. The first later line that is exactly `---` closes it. The content
between those delimiter lines MUST parse as exactly one safe YAML mapping
using the native YAML 1.2 Core data model:

- mapping keys are unique strings;
- values use the JSON-compatible data model;
- anchors, aliases, merge keys, and custom tags are forbidden; and
- an empty, unclosed, non-mapping, or otherwise invalid envelope is invalid.

When an envelope is present, the CommonMark body begins immediately after the
closing delimiter and its line ending. The delimiter lines and enclosed YAML
are not CommonMark content and cannot supply the H1, semantic sections,
record responsibilities, acceptance, or other canonical human meaning. When
the first line is not exactly `---`, the complete decoded source is the
CommonMark body.

Complete source bytes, including any envelope, participate in the record
source digest, validated snapshot, and applicable security scanning. Markdown
heading, section, path, occurrence, Title Case, and Mermaid behavior operate
only on the CommonMark body.

NKF Core assigns portable document-orientation meaning to the governed
frontmatter keys defined below. The vocabulary is closed by applicable
document class. Additional keys require an accepted Root Profile or extension
allocation; an unsupported native key fails closed.

Every represented Markdown file other than explicitly classified Evidence
MUST contain frontmatter. Evidence exemption is declared rather than inferred:

- a record whose declaration has `type: evidence` is exempt;
- a non-record whose bundle entry has `kind: evidence` is exempt; and
- a directory name or path segment such as `evidence/` does not itself create
  an exemption.

Evidence MAY omit frontmatter. If Evidence begins with an exact opening
delimiter, the envelope MUST still satisfy the safe-YAML parsing boundary, but
NKF does not require or interpret the current orientation keys. This preserves
source bytes without allowing malformed source-envelope syntax.

Every applicable Markdown document requires exactly these common keys:

```yaml
---
title: "Human-Readable Document Title"
summary: "A concise orientation summary."
created_at: 2026-07-30T19:47:30Z
---
```

`title` and `summary` MUST be non-empty, trimmed, single-line strings. The
document MUST have exactly one top-level H1, and `title` MUST exactly equal
its comparison string, so the envelope and the body can never disagree about
the document title; disagreement emits `markdown.frontmatter.title-mismatch`.
For a record, the declaration `title` MUST also exactly equal it. `summary`
helps a person or agent orient to the document; its presence and shape do
not prove semantic correctness, completeness, or acceptance.

`created_at` MUST be a real calendar instant serialized exactly as
`YYYY-MM-DDTHH:mm:ssZ`. It records the first evidenced repository appearance
or authoritative creation instant claimed by the source. It does not claim
acceptance, implementation, modification, review, or operational time. NKF
does not define a generic `updated_at`.

Native 0.7 frontmatter is deliberately stable orientation. Mutable lifecycle,
governance, authority-binding, disposition, confirmation, successor, and graph
state live only in YAML declarations. A renderer MAY show those values as
read-only virtual frontmatter bound to the declaration and evaluation
revision, but it MUST clearly identify the projection and MUST NOT persist it
into canonical Markdown.

Every applicable record source additionally requires:

```yaml
id: record-identity
type: decision
```

The frontmatter `id`, `type`, and `title` MUST exactly equal declaration `id`,
`type`, and `title`. A mismatch fails conformance; the checker does not select
a winner or rewrite either representation. Native 0.7 frontmatter MUST NOT
contain `record_lifecycle`, `record_status`, `decision_authority`,
`design_disposition`, `design_decisions`, `superseded_by`,
`withdrawal_source`, `confirmation_status`, `confirmation_decisions`,
`unconfirmed_scope`, `task_status`, or another mutable declaration-state key.

Design, Decision, Specification, and Realization declarations additionally
require one non-empty `task` value resolving to one same-bundle Task document
node. Resolution establishes internal traceability only. It does not make a
Task an NKF record, prove its operational state, satisfy its acceptance
criteria, or establish acceptance or confirmation.

A Design declaration additionally requires `design_disposition`, independently
of record lifecycle and record authority status. Supported values are
`active`, `adopted`, `rejected`, `superseded`, and `withdrawn`.

- Adopted and Rejected require a non-empty unique `design_decisions` list of
  same-bundle Decision record IDs.
- Superseded requires a non-empty unique `superseded_by` list of same-bundle
  record IDs and MAY retain earlier `design_decisions`.
- Withdrawn requires `withdrawal_source`, a closed `kind: task | record` and
  `id` mapping that resolves according to its kind.
- Provenance fields that do not apply to the selected disposition are
  forbidden.

An Active Design remains proposal knowledge under consideration. Adopted
means a Decision selected its proposed direction; Rejected means a Decision
declined it; Superseded means later governed knowledge replaced it; and
Withdrawn means its owner or governing Task stopped consideration without a
Decision deciding its merits. None of those values makes the Design current
normative authority.

A Realization declaration additionally requires `confirmation_status`. Supported
values are `unconfirmed`, `partially-confirmed`, and `confirmed`.

- Confirmed requires a non-empty unique `confirmation_decisions` list of exact
  same-bundle Decision record IDs.
- Unconfirmed forbids `confirmation_decisions` and `unconfirmed_scope`.
- Partially Confirmed requires both a non-empty unique
  `confirmation_decisions` list and a non-empty, trimmed, single-line
  `unconfirmed_scope`.

These fields expose the claimed confirmation boundary. Their presence and
reference resolution do not verify authority or prove the claimed
implementation. Acceptance-binding or other authority verification remains a
separate operation.

NKF adds `task` and `evidence` to `non_records[].kind`. A Task non-record
requires a document node with `state.vocabulary: task-status`, a stable ID,
and a state value of `active`, `deferred`, `completed`, or `cancelled`. Its
document declaration MAY additionally carry `owner`, `decision_authority`, and
`related_tasks`; related Task IDs resolve to other Task document nodes. The
project supplies operational Task behavior; NKF validates its declared shape,
stable identity, state projection, and reference graph but does not execute,
schedule, complete, or become authoritative for the Task. NKF Core does not
infer Task state from directory names or frontmatter. Every Task body MUST
carry the Decision Applicability Gate defined in its own section.

Record references in `design_decisions`, `superseded_by`, and
`confirmation_decisions` use exact native record IDs. Task references use
exact `task_id` values. `withdrawal_source` selects the applicable namespace
explicitly. Every governed reference MUST resolve exactly once.

The allowed keys are:

| Applicable document | Required keys | Conditional keys |
| --- | --- | --- |
| Non-Evidence Markdown | `title`, `summary`, `created_at` | None |
| Record source | Common plus `id`, `type` | None |
| Design, Decision, Specification, or Realization source | Record | None; lifecycle and provenance live in declarations |
| Task non-record | Common | Identity, state, ownership, and relationships live in its document declaration |
| Evidence record or non-record | Exempt | Safe syntax only when an envelope is present |

Key order, quoting style, comments, and whitespace are non-semantic. A
`summary` is canonical orientation metadata within the Markdown source but is
not a substitute for substantive meaning in the CommonMark body.

A migrated predecessor source MAY instead be `legacy-locked`: its exact
frontmatter remains valid only when the adopter records its predecessor
version, exact source digest, a closed `predecessor_state` projection of every
present legacy mutable-state key, and the corresponding closed
`initial_declaration_state` projection in the declaration. The predecessor projection MUST equal the exact source frontmatter;
the initial projection MUST equal the exact post-migration YAML fields.
Conversion is exact: record lifecycle/status become governance lifecycle/status,
record `decision_authority` requires an `authority_mapping` in the lock that
binds the exact legacy string to one or more stable governance authority IDs
approved by the repository owner,
Task ID/status become document ID and `task-status`, and every other legacy key
maps to its same-named record or document field. If a value cannot be converted
exactly, its authority mapping is absent, or a target field is missing,
migration fails before mutation. For a predecessor Task normalized by the
retrospective gate rule, `source_digest` binds the exact post-normalization
source while a closed `source_transformation` binds kind
`retrospective-task-gate`, the exact original predecessor source digest, exact
appended gate-block digest, reviewer kind and identity, and exact review
instant. While it still has the original bytes, migration MUST construct and
verify the post-normalization bytes as the original bytes followed by the
exact `\n\n` suffix and reviewed gate bytes before mutation. Continuing
validation binds the preserved transformation record and exact current source;
it does not claim that a digest alone re-proves unavailable historical bytes.
`predecessor_state` continues to bind the unchanged
predecessor frontmatter. The mapping is required exactly when a
record predecessor carries `decision_authority`; its authority-ID array MUST
equal the initial declaration's `governance.authority`. A Task/document
predecessor instead preserves that string exactly as
`document.decision_authority` and forbids the record authority mapping. The mapping records conversion intent and
does not prove authority. Legacy
lifecycle keys are thereafter inert historical bytes. Any later source-byte change removes
the exemption and requires the native 0.7 envelope. This narrow rule preserves
accepted immutable records without leaving two current lifecycle authorities.

For exact predecessor compatibility, the canonical NKF 0.5 revision 2
Specification MAY retain the `accepted_bootstrap_lock` defined by its accepted
0.5 authority. The lock remains restricted to record ID
[`nkf-0.5-specification-revision-2`](nkf-0.5-revision-2.md), predecessor
version `0.4`, the exact locked source and acceptance Decision, predecessor
state `living`/`draft`,
[NKF-026](../tasks/active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md),
and current state
`immutable`/`accepted`. It cannot be allocated to a 0.6-native record.

The exact prepublication predecessor Specification accepted by
[ADR 0116](../decisions/0116-accept-the-nkf-0-5-authority-pair.md) MAY likewise
retain its closed `prepublication_supersession_lock`. That lock remains
restricted to record ID [`nkf-0.5-specification`](nkf-0.5.md), source SHA-256
`d93e8da4e3abeb7d047d15351f2003d2d242596790fb7db94be994b7e88499dc`,
the exact accepted executable predecessor at `contracts/nkf/0.5/nkf.yaml`
with SHA-256
`73d9cf683a799729fba6fb64e59aefef0477601827f8f0045aec7d95955d3fd2`,
[ADR 0116](../decisions/0116-accept-the-nkf-0-5-authority-pair.md) at SHA-256
`777ecabcbab3c106f2889661125a923ce0f331a759a4bd2b6b0d18e7ed542ee8`,
and its exact later correction Decision. Its state remains
`immutable`/`superseded` with
`superseded_by: [nkf-0.5-specification-revision-2]`. Neither predecessor-only
lock accepts, rewrites, or changes either pair, and neither is a reusable
0.6-era migration mechanism preserved as immutable history.

An opening delimiter without a valid closing delimiter, unsafe or malformed
YAML, multiple YAML documents, a non-mapping root, or a forbidden YAML feature
emits `markdown.frontmatter.invalid`. A source intended to begin with a
CommonMark thematic break MUST use a form other than an exact opening `---`
line.

A missing required envelope emits `markdown.frontmatter.required`. A missing
key emits `markdown.frontmatter.key.missing`; an unsupported key, including
`updated_at`, emits `markdown.frontmatter.key.unsupported`; and an invalid
value or conditional shape emits `markdown.frontmatter.value.invalid`.
Invalid `created_at` emits `markdown.frontmatter.created-at.invalid`. Record
identity disagreement emits `markdown.frontmatter.record-mismatch`. A mutable
state key in native 0.7 source emits
`markdown.frontmatter.mutable-state-forbidden`; an invalid predecessor
exemption emits `markdown.frontmatter.legacy-lock.invalid`; and an unresolved
or ambiguous governed declaration reference emits the applicable declaration
or graph diagnostic.

### Deterministic Markdown Structure

Frontmatter owns stable document orientation and YAML owns declared state, so
a non-Evidence body MUST NOT restate either as identity bullet lines. A
top-level body line that
begins with `- **<Label>:**` or `- **<Label>**`, where the
whitespace-trimmed label case-insensitively equals one of the closed
identity labels `Task`, `Status`, `Owner`, `Decision Authority`,
`Design Disposition`, `Repository`, `Related Tasks`, `Version`,
`Adopting Decision`, `Proposal Authority Effect`, `Proposal Evidence`, or
`Implementation Evidence`, emits
`markdown.body.identity-duplication`. Only these exact bulleted forms are
detected; restated identity in free prose remains a human-review concern,
and Evidence bytes are never scanned.

Same-bundle document references MUST be deep links. Inside a non-Evidence
body, outside headings, code fences, and existing links, a reference that
matches one of the closed reference grammars MUST be the visible text of a
CommonMark link whose destination resolves to the referenced document's
exact source path: the text form `ADR NNNN` naming a same-bundle Decision
record `adr-NNNN`; a code span holding a same-bundle record identifier; or
a text or code-span token equal to a same-bundle Task identifier. A
document never links to itself, and an unlinked or mistargeted reference
emits `markdown.reference.deep-link.required`. Only these grammars are
detected; other prose mentions remain a human-review concern.

A source carrying a predecessor-only lock keeps its exact predecessor bytes
through the 0.7 stable-path neutralization, so its links are never rewritten.
Inside such a source, a link destination that resolves to the referenced
document's exact source path after applying the closed legacy stable-path
mapping of the 0.7 neutralization is not mistargeted; the reference remains
correct historical fact. This historical resolution applies only to sources
whose lock the checker has verified and is unavailable to new 0.7-native
sources, which never carry these locks.

Evidence bodies remain exempt from ordinary identity and deep-link scanning
except that the one document carrying the exact
`historical_acceptance_attempt_lock` MUST be scanned for the locked diagnostic
grammar. The checker contains only the exact two bound occurrences after verifying
the complete lock and accepting-Decision binding; every other detected
occurrence in that source and every violation in every other governed source
remains reportable.

Native NKF 0.7 interprets the Markdown source body using CommonMark 0.31.2.
Only heading nodes that are direct children of the CommonMark document root
participate in NKF title, section, path, occurrence, and casing checks.
Headings inside block quotes, lists, or other containers remain content. Both
ATX and setext headings count.

For every participating heading, the checker derives one comparison string:

- visible text, image alternative text, and code-span text are retained;
- link destinations and raw HTML tags are omitted while visible child text is
  retained;
- Markdown escapes and character references contribute their parsed
  characters;
- each whitespace run becomes one U+0020 space;
- leading and trailing whitespace is removed; and
- remaining Unicode code points and case receive no additional normalization.

A governed record has exactly one top-level H1. The declaration `title`
exactly equals its comparison string. Every top-level H2 and H3 has exactly
one section declaration, every declaration resolves exactly one H2 or H3, and
two declarations cannot resolve the same heading.

A top-level H3 requires a preceding top-level H2. An H2 `heading_path`
contains its own comparison string. An H3 path contains the nearest preceding
H2 comparison string followed by its own. `occurrence` is the one-based source
order among headings with the same complete path.

Top-level H4 through H6 are subordinate content within the nearest mapped
H2/H3 and are invalid before any mapped H2/H3. Content between H1 and the
first H2 belongs to the record generally but cannot satisfy a section-bound
body responsibility.

The comparison strings of top-level H1, H2, and H3 MUST already be Title
Cased. Title Case uses Unicode 17.0.0 Default Case Conversion `toTitlecase` and
default word boundaries without locale tailoring. Inline-code ranges,
NKF-owned canonical-term ranges, and exact project `canonical_terms` ranges
are protected; all other text must equal the default conversion. Every word,
including `And`, `Of`, and `The`, is converted. Each hyphen-separated cased
component is Title Cased. Uncased text remains unchanged.

Canonical phrases match exact code points and case at Unicode word boundaries.
Overlaps resolve longest first, then left-to-right. A canonical term is an
exact spelling, not permission for arbitrary casing.

A `mermaid` fenced code block is literal Markdown content. Its exact bytes
participate in the source digest and its containing mapped section, but NKF
does not execute, render, or validate the diagram. Its internal text does not
participate in heading or Title Case checks. Essential meaning MUST remain
available through ordinary Markdown prose, structured NKF declarations, or
both. A generated diagram is a provenance-bearing projection rather than
canonical knowledge.

A record declaration MUST contain these logical responsibilities:

| Responsibility | Required content |
| --- | --- |
| Contract | NKF record identity (`nkf.record`) |
| Identity | Stable bundle-scoped `id` |
| Type | One core or profile-defined record type |
| Body contract | NKF body identity for the Markdown body's responsibilities |
| Title | Title agreeing with the Markdown level-one title |
| Source binding | Source path, digest algorithm, and digest of the exact Markdown bytes |
| Governance | Lifecycle, authority state, and acceptance authority |
| Scope | Declared root and optional narrower subjects |
| Sections | Complete semantic section map with explicit body-responsibility bindings |
| Relationships | Source-bound typed record relationships |

A declaration MAY contain these responsibilities when real:

- provenance producers, verifiers, and sources;
- external-authority boundaries;
- semantic entities, entity relationships, and bindings; and
- separately governed extensions.

Governance lifecycle MUST be `living` or `immutable`. Authority state MUST be
`draft`, `accepted`, `superseded`, or `retired`. The declaration MUST identify
at least one acceptance authority. An acceptance date MAY be recorded for an
accepted revision, but the authoritative acceptance event and exact revision
binding remain outside a copied status field.

Every root MUST be living. An accepted Decision MUST be immutable. An accepted
version-specific Specification MUST be immutable. Other body contracts MAY
support living or immutable records according to the meaning they contain.

Empty optional structures SHOULD be omitted by a native NKF serializer.
Profiles MAY require explicit empty collections for compatibility, but those
collections carry no meaning.

### Native Record Serialization

The native declaration is closed to unknown top-level fields except for the
accepted `extensions` field. It requires:

```yaml
contract: nkf.record
id: <non-empty record ID>
type: <supported record type>
body_contract: <corresponding supported body identity>
title: <Markdown H1>
source:
  path: <knowledge-root-relative Markdown path>
  digest:
    algorithm: sha-256
    value: <64 lowercase hexadecimal characters>
governance:
  lifecycle: living | immutable
  status: draft | accepted | superseded | retired
  authority: [<one or more acceptance-authority identifiers>]
  accepted_at: <optional ISO 8601 date>
scope:
  root: <root record ID>
  subjects: [<optional narrower subject IDs>]
sections:
  - id: <record-scoped section ID>
    heading_path: [<one or more exact heading strings>]
    occurrence: <integer, minimum 1>
    authority: accepted-meaning | proposal | unresolved | evidence
    role: <body-contract-controlled role>
    responsibilities: [<optional supported responsibility IDs>]
relationships:
  - type: <supported record relationship type>
    target: <record ID>
    source_section: <declared section ID>
```

`relationships` is required and is empty when none exist. `scope.root` equals
`bundle.root.record`. Optional `scope.subjects` is omitted when empty. The
`type` and `body_contract` pair
must correspond exactly. Every required body responsibility occurs in at least
one section.

Optional source-bound structures have these exact minimum shapes:

- `provenance.producers[]` and `provenance.verifiers[]` require `actor`, with
  optional `at` and `method`;
- `provenance.sources[]` requires `locator`, with optional `id`, `title`,
  `author`, `observed_at`, `revision`, `last_modified_at`, and digest;
- `provenance.primary_observation` requires `method` and `source_section`, with
  optional `observed_at`;
- `external_authorities[]` requires `id`, `authority`, `relationship`, and
  `source_section`, plus at least one of `locator` or `resolution_rule`;
- `entities[]` requires `id`, controlled `kind`, and `defining_section`, with
  optional non-identifying `address`;
- `entity_relationships[]` requires controlled `type`, entity-reference
  `source`, entity-reference `target`, and `source_section`; and
- `bindings[]` requires entity reference `entity`, record ID `realization`,
  controlled `kind`, and `source_section`, plus at least one of `locator` or
  `resolution_rule` and optional `external_authority`.

An entity reference contains `record` and `entity`.

Two further optional closed structures are native to NKF 0.7:

- `identity_succession` records that this living record's stable identifier
  succeeded a predecessor identifier in one governed act. It requires exactly
  `predecessor_id`, the exact `graph_revision` at which the succession took
  effect, and `recorded_by` naming the governed act's authority. The
  predecessor identifier remains permanently resolvable through this chain:
  a checker verifying a carried judgment, historical baseline, or receipt
  resolves the predecessor identifier to this record. A succession never
  applies to an immutable record, never reuses a live identifier, and never
  forms a cycle; new living-record identifiers and new stable paths MUST NOT
  assert a version, lifecycle state, disposition, or currency.
- `operational_dependencies[]` declares that this record's meaning states an
  operational release fact. Each entry requires exactly `kind` — one of the
  closed coordinates `release-version`, `recommendation`, or `installed-pin` —
  and `source_section` binding the dependent statement. Promotion
  reconciliation, defined by the freshness contract, operates on these
  declarations. A document-node declaration carries the same structure with a
  `source_heading` binding instead of `source_section`.

Except for `governance.accepted_at`, whose ISO 8601 date shape is explicit
above, NKF 0.7 does not impose a narrower lexical format on the optional
factual-time strings in these structures. A later format revision may
standardize them through the governed change process.

Array order carries no meaning except `heading_path`. Native serialization
emits responsibility IDs in body-contract order for deterministic review.
Optional empty structures are omitted.

Native NKF 0.7 defines no presentation-guidance field. Markdown is the default
readable form. Portable display metadata uses a separately governed optional
extension and remains subject to [ADR 0020](../decisions/0020-presentation-guidance.md) and future governed
reconsideration.

Common defines these record types:

- `design`
- `decision`
- `realization`
- `evidence`

The Product Profile additionally defines:

- `product`
- `principle`
- `concept`
- `journey`
- `domain`
- `capability`

The Technology Profile additionally defines:

- `technology`
- `specification`

A Product bundle permits the six Product types plus the four Common types. A
Technology bundle permits the two Technology types plus the four Common types.
A record type or body unsupported by the selected profile fails closed even
when another profile supports it.

The Technology Profile requires at least one Specification record. It defines
no mandatory record-level hierarchy and prohibits record-level `part-of`.

A Product vision is not a separate core type. Durable direction belongs in
the Product record; exploratory visions and investigations belong in Concept
and Evidence records until a Decision, Capability, Design, or Realization is
justified.

Only an accepted extension may introduce a namespaced type or body contract.
Unknown extensions MUST remain visible and round-trippable, but a consumer
that does not understand a required extension MUST NOT claim complete
semantic validation or perform a consequential governing action from it.

## Identity

A bundle has one stable `bundle_id`. Each record has one stable,
bundle-scoped `record_id`. Each semantic section has one stable,
record-scoped `section_id`.

The durable identity of a record is the pair:

```text
(bundle_id, record_id)
```

The durable identity of a section is:

```text
(bundle_id, record_id, section_id)
```

The durable identity of a semantic entity is:

```text
(bundle_id, record_id, entity_id)
```

Titles, filenames, paths, headings, record types, display labels, canonical
addresses, and external locators are not identity. They MAY change through a
governed revision without changing the referenced meaning.

An identity MUST NOT be reused for materially different meaning. Moving a
canonical definition owner MUST preserve the stable identity, provenance,
incoming relationships, and accepted history through a governed migration.

A bundle MUST have exactly one root of the type required by its selected
profile. Every governed record MUST resolve to that root through
`scope.root`. Scope membership does not itself create a semantic relationship.

Cross-bundle identity and typed relationships are deferred in NKF 0.7.
External material and authority are addressed through provenance locators and
external-authority bindings instead.

## Root Profiles

The Common Specification has identity `nkf.common`. It applies automatically
to every bundle, owns shared declaration and semantic mechanics, and is not a
Root Profile.

The Product Root Profile has identity `nkf.profile.product`. It requires:

- root type `product` with body `nkf.product`;
- permitted bodies `nkf.product`, `nkf.principle`, `nkf.concept`,
  `nkf.journey`, `nkf.domain`, `nkf.capability`, `nkf.design`,
  `nkf.decision`, `nkf.realization`, and `nkf.evidence`;
- the Product–Domain–Capability record hierarchy; and
- omission of `governed_artifacts`.

The Technology Root Profile has identity `nkf.profile.technology`. It requires:

- root type `technology` with body `nkf.technology`;
- at least one `specification` record with body `nkf.specification`;
- permitted bodies `nkf.technology`, `nkf.specification`, `nkf.design`,
  `nkf.decision`, `nkf.realization`, and `nkf.evidence`;
- no record-level `part-of` relationship; and
- the governed-artifact rules when non-Markdown technical artifacts
  participate in validation.

A profile can add requirements to Common but cannot remove, weaken, override,
or reinterpret Common. A bundle cannot select several profiles. There is no
profile ordering, fallback, implicit default, `general`, or `generic` root.

The Common, Product, and Technology modules are separately identified within
this one normative Markdown and executable YAML authority pair. Their module
identities do not create independent artifacts or version namespaces.

## Section Authority

Every semantic Markdown section MUST be classified as exactly one of:

| Authority class | Meaning |
| --- | --- |
| `accepted-meaning` | Governing meaning when its exact record revision has been accepted |
| `proposal` | Candidate meaning that does not govern |
| `unresolved` | An explicit question, ambiguity, conflict, or undecided matter |
| `evidence` | Observation, source-grounded analysis, or factual support that does not itself govern intent |

Section authority and section role are separate. A section may, for example,
have the role `boundary` while its authority remains `proposal`.

Accepting a record revision MUST NOT promote `proposal`, `unresolved`, or
`evidence` sections into accepted meaning. A Draft record may contain
sections prepared as `accepted-meaning`, but they do not govern until the
exact revision is accepted.

The declaration MUST map every semantic heading that contributes meaning.
Introductory metadata, a title, and generated navigation are not automatically
semantic sections. A profile MAY require a more complete heading map, but it
MUST NOT leave governing prose outside declared source authority.

Each declared section MAY bind one or more controlled `responsibilities`
defined by its declared body contract. A native declaration MUST bind every
required body responsibility to at least one exact source section. A section
MAY satisfy several responsibilities, and one responsibility MAY be
established across several sections.

`responsibilities` is optional for a section, but when present it MUST be a
non-empty duplicate-free sequence of identifiers supported by the declared
body contract. Binding order carries no meaning. Sections that do not fulfill a
controlled body responsibility omit the field.

Deterministic validation may establish supported identifiers, exact source
section resolution, duplicate-free lists, and complete required coverage. It
does not prove the semantic adequacy, truth, safety, or acceptance of the
bound Markdown.

Responsibility identity is scoped by `body_contract`; it is not inferred from
heading text, section ID, section role, filesystem path, or model
classification. Section role remains a separate controlled classification and
does not by itself prove body-contract coverage. A consumer that does not
understand a declared responsibility or cannot prove complete required
coverage MUST fail closed for contract conformance.

### Section-Role Vocabulary

Every declared section has exactly one role from its body contract's allowed
subset. Repeated role names have one meaning across contracts. The role
classifies the section's principal function; it does not determine section
authority, satisfy a responsibility, or prove semantic adequacy, truth,
safety, acceptance, or conformance.

| Role | Exact classification meaning |
| --- | --- |
| `actor` | A person, role, group, system, or external participant involved in or served by the subject. |
| `alternative` | A materially relevant option other than the proposed or selected approach. |
| `applicability` | The subjects, contexts, conditions, or scope in which the stated meaning applies. |
| `behaviour` | Required, permitted, or prohibited conduct implied by a principle or constraint. |
| `boundary` | An inclusion, exclusion, limit, non-goal, ownership boundary, or authority boundary. |
| `catalogue` | An organized inventory, classification, portfolio, or map of related items. |
| `condition` | A prerequisite, input state, or condition required for a capability or outcome. |
| `consequence` | An effect or implication resulting from a decision or chosen direction. |
| `content` | Source meaning for which no narrower allowed role accurately describes the principal function. |
| `context` | Background, circumstances, problem, or operating situation needed to understand the subject. |
| `definition` | Meaning that states what the subject is and distinguishes it from other subjects. |
| `dependency` | A required reliance on other meaning, capability, system, actor, or external authority. |
| `evidence` | Supporting material used to substantiate, assess, or validate a claim, choice, or design. |
| `evolution` | Intended maturity, change, migration, compatibility, deprecation, or retirement direction. |
| `finding` | A conclusion directly supported by stated sources, observations, and method. |
| `governing` | A constraint, accepted input, policy, rule, or authority that governs the subject. |
| `identity` | The stable identity, kind, or identifying characteristics of a durable realization. |
| `interface` | An interaction, exchange, contract boundary, or point of connection with another subject. |
| `interpretation` | Reasoned meaning drawn from observations or findings, kept distinct from the observations themselves. |
| `limitation` | A known uncertainty, caveat, evidence gap, method constraint, or applicability limit. |
| `mapping` | A durable correspondence between governed meaning and a realization. |
| `measure` | A criterion or indicator for success, failure, effectiveness, health, or progress. |
| `method` | The procedure used to observe, collect, analyze, compare, or verify evidence. |
| `obligation` | A duty, requirement, compliance constraint, or commitment borne by the subject or an actor. |
| `observation` | A directly observed or source-reported fact kept distinct from interpretation. |
| `outcome` | A desired, expected, achieved, failed, or recovered result. |
| `principle` | The concise normative statement of a Product principle. |
| `rationale` | The reason why a principle, decision, design, or direction exists or was chosen. |
| `recovery` | Failure handling, rollback, interruption response, restoration, or safe recovery. |
| `relevance` | How evidence bears on governed knowledge, a claim, a decision, or a governed question. |
| `responsibility` | An assignment or boundary of responsibility, ownership, or accountability. |
| `risk` | A material uncertainty, exposure, hazard, or failure mode and its possible impact. |
| `source` | Material, data, testimony, or another origin from which evidence is derived. |
| `trade-off` | A tension, cost, benefit, or compromise between relevant choices or qualities. |
| `transition` | A meaningful stage, decision point, state change, or movement through a journey. |
| `trigger` | An event or circumstance that initiates a journey or consequential transition. |
| `unresolved` | An explicit open question, ambiguity, conflict, missing decision, or unsettled matter. |
| `validation` | The approach, criteria, or required proof for evaluating a proposed direction or informing a Decision. |

The core body-specific subsets are:

| Body contract | Allowed roles |
| --- | --- |
| `nkf.technology` | `definition`, `context`, `actor`, `governing`, `boundary`, `catalogue`, `evolution`, `interface`, `obligation`, `risk`, `measure`, `unresolved`, `content` |
| `nkf.specification` | `definition`, `governing`, `applicability`, `boundary`, `interface`, `validation`, `evolution`, `obligation`, `risk`, `unresolved`, `content` |
| `nkf.product` | `definition`, `governing`, `boundary`, `catalogue`, `evolution`, `interface`, `obligation`, `measure`, `unresolved`, `content` |
| `nkf.principle` | `principle`, `rationale`, `applicability`, `behaviour`, `boundary`, `trade-off`, `evidence`, `unresolved`, `content` |
| `nkf.concept` | `definition`, `governing`, `boundary`, `catalogue`, `evolution`, `evidence`, `unresolved`, `content` |
| `nkf.journey` | `governing`, `actor`, `trigger`, `boundary`, `transition`, `obligation`, `outcome`, `interface`, `measure`, `evidence`, `risk`, `unresolved`, `content` |
| `nkf.domain` | `governing`, `boundary`, `catalogue`, `interface`, `obligation`, `risk`, `measure`, `evolution`, `unresolved`, `content` |
| `nkf.capability` | `governing`, `actor`, `condition`, `outcome`, `boundary`, `obligation`, `dependency`, `measure`, `evidence`, `risk`, `unresolved`, `content` |
| `nkf.design` | `context`, `boundary`, `governing`, `responsibility`, `interface`, `alternative`, `trade-off`, `risk`, `recovery`, `validation`, `evidence`, `unresolved`, `content` |
| `nkf.decision` | `context`, `governing`, `applicability`, `rationale`, `alternative`, `consequence`, `trade-off`, `evidence`, `recovery`, `unresolved`, `content` |
| `nkf.realization` | `identity`, `mapping`, `responsibility`, `boundary`, `interface`, `dependency`, `obligation`, `evidence`, `recovery`, `unresolved`, `content` |
| `nkf.evidence` | `context`, `source`, `method`, `observation`, `finding`, `interpretation`, `limitation`, `boundary`, `relevance`, `evidence`, `unresolved`, `content` |

Unknown or body-unsupported roles fail closed. Role `unresolved` requires
section authority `unresolved`. Role `evidence` remains distinct from
authority class `evidence`. Role `content` is a last resort and cannot declare
responsibilities. Human review determines whether the chosen role accurately
classifies the source.

## Relationships

NKF 0.7 defines these record relationship types:

| Type | Directional meaning |
| --- | --- |
| `part-of` | Source is a governed part of target |
| `defines` | Source canonically defines meaning used by target |
| `governs` | Source constrains target |
| `applies-to` | Source is applicable to target |
| `depends-on` | Source requires target meaning |
| `extends` | Source adds compatible meaning to target |
| `supersedes` | Source replaces target for its declared scope |
| `rationale-for` | Source explains why target exists or was chosen |
| `realizes` | Source maps target meaning to a durable realization |
| `evidences` | Source supplies evidence relevant to target |
| `references` | Source deliberately points to target without asserting a stronger core relation |

Every typed relationship MUST declare its source section. A consumer MUST be
able to trace the relationship to exact Markdown meaning. When a stronger
known relationship applies, `references` SHOULD NOT be used as a substitute.

Record-level `part-of` is controlled by the selected profile.

The Product Profile hierarchy is:

```text
Product → Domain → Capability
```

For Product, `part-of` MUST be acyclic. The Product root has no parent. A
Domain has exactly
one Product parent, and a Capability has exactly one Domain parent. Every
Domain and Capability reaches the Product through those accepted edges.

For Technology, no record type may declare `part-of`. Technology topology uses
the other typed relationships and semantic entities without converting
repository or package layout into record hierarchy.

Every record remains a member of its bundle through
`record.scope.root == bundle.root.record`. Root scope does not create a
`part-of` edge. Another type neither requires nor may invent a native
`part-of` relationship unless its selected profile or a supported extension
defines the meaning. `hierarchy.root-unreachable` therefore applies only to a
record required or permitted to participate in structural hierarchy.

Filesystem placement, ordinary Markdown links, generated backlinks,
similarity, tags, model classifications, and runtime correlations do not
create typed relationships. Backlinks and graph projections are derived.

## Deterministic Knowledge Graph And Freshness

### Node Kinds And References

One canonical declared graph contains every represented record node, every
declared document node, and every independently addressable entity node.
Record nodes use the record ID. Document nodes use `document.id`. Entity nodes
use their existing record-scoped identity. A node reference is exactly one of:

```yaml
{kind: record, id: <record-id>}
{kind: document, id: <document-id>}
{kind: entity, record: <record-id>, entity: <entity-id>}
```

Every reference resolves exactly once in the same bundle. Paths, headings,
ordinary links, tags, similarities, generated concepts, external URLs, and
runtime objects are not node identity. A local graph edge cannot target an
undeclared or ambiguous node. Cross-bundle node references are unsupported in
0.7 and fail closed.

Existing record and entity relationships participate in this graph. Their
source node is their declaring record or entity and their source section is
the exact declared record section. A document relationship uses the document
as source and binds `source_heading`, a closed object containing a non-empty
CommonMark `heading_path` and one-based `occurrence`. That heading resolves by
the same comparison-string algorithm as record sections. The Markdown meaning
at the bound section must support the relationship; validation establishes
resolution, not semantic truth.

Each relationship is authored once in the vocabulary's canonical direction.
Exact duplicates, self-edges where forbidden, conflicting duplicates, and an
authored inverse of an already authored fact fail closed. Backlinks and
permitted inverse edges are generated and record their originating fact.
Every relationship vocabulary entry fixes its allowed source and target node
kinds, self-edge and cycle behavior, and allowed source authority. A record or
entity relationship inherits the exact `authority` of its bound record
section. A document relationship has the non-governing source authority
`document-meaning`; that classification never promotes the document or makes
its statement accepted Product or Technology meaning. `governs` requires an
accepted record section, `evidences` and `observes` require evidence, and an
`unresolved` record section cannot support any authored relationship. A
source whose authority is not allowed by the selected relationship entry is
invalid.

### Node And Graph Revisions

All canonical hashes below are lowercase SHA-256 over RFC 8785 JSON
Canonicalization Scheme bytes of the specified JSON-compatible object.

A record-node revision binds `kind: record`, its stable ID, exact source
digest, type, body contract, governance, scope, sections, relationships,
provenance, external authorities, entities, entity relationships, bindings,
record lifecycle state, and extensions. It excludes declaration file path,
`source.path`, source locator, generated views, results, receipts, and
validation output. The record's source digest still binds every canonical
Markdown byte.

A document-node revision binds `kind: document`, stable ID, exact Markdown
digest, non-record kind, declared state, relationships, freshness declaration,
and document-node governance fields. It excludes `non_records[].path`,
`reason`, generated views, results, receipts, and validation output. An entity
node revision binds its owning record-node revision plus the exact entity
declaration. Therefore a lifecycle, relationship, freshness-policy input, or
canonical content change changes the relevant node revision. Initial path
allocation and predecessor-path preservation do not participate in revision;
after onboarding or migration the stable canonical path cannot change.

The exact JCS input shapes are:

```json
{"kind":"record","id":"<id>","source_sha256":"<hex>","declaration":<record-revision-projection>}
{"kind":"document","id":"<id>","source_sha256":"<hex>","declaration":<document-revision-projection>}
{"kind":"entity","record":"<record-id>","entity":"<entity-id>","record_revision":"<hex>","declaration":<exact-entity-declaration>}
```

The record projection is a closed object containing the declaration fields
`type`, `body_contract`, `title`, `governance`, `scope`, `sections`,
`relationships`, `provenance`, `external_authorities`, `entities`,
`entity_relationships`, `bindings`, `task`, `design_disposition`,
`design_decisions`, `superseded_by`, `withdrawal_source`,
`proposal_authority_effect`, `proposal_evidence`, `implementation_evidence`,
`confirmation_status`, `confirmation_decisions`, `unconfirmed_scope`,
`freshness`, and `extensions` when each field exists. It omits `contract`,
`id`, `source`, and `legacy_lock`; the outer object supplies identity and
source digest, while legacy migration evidence cannot change current meaning.

The document projection contains exactly `kind`, `state`, `relationships`,
`freshness`, `owner`, `decision_authority`, and `related_tasks` when each
exists. It omits path, stable path, digest, reason, and `legacy_lock` for the
same reasons. Omitted optional fields remain omitted rather than null.

Before JCS serialization, arrays with semantic sequence preserve declared
order: section order, `heading_path`, provenance source order, and any
body-contract sequence explicitly declared ordered. Every other array in the
two projections is a set and is sorted by the RFC 8785 unsigned UTF-16
comparison of each item's own JCS serialization after exact-duplicate
rejection. Mapping member order never matters. Strings receive no Unicode,
case, or whitespace normalization beyond the field's existing contract.

The graph revision binds bundle ID, selected profile, the sorted complete node
identity and revision set, the sorted normalized authored-edge set, the
sorted complete external-dependency and authority-input declaration sets, and exact evaluation-
policy identity and digest. Array order and declaration-file order
do not affect it. The baseline, receipts, generated navigation, backlinks,
virtual frontmatter, and validation results are excluded so measuring the
graph cannot change the graph being measured.

Its exact JCS input is:

```json
{"contract":"nkf.graph-revision","nkf_version":"0.7","bundle":"<bundle-id>","profile":"<profile-id>","nodes":[{"node":<node-reference>,"revision":"<hex>"}],"edges":[<normalized-authored-edge>],"external_dependencies":[<normalized-external-dependency>],"authority_inputs":[<normalized-authority-input>],"policy":{"id":"nkf.freshness-policy.0.7","sha256":"<hex>"}}
```

`nodes` sorts by node-reference JCS bytes. `edges` contains the exact source
node reference, relationship type, target node reference, and normalized
source section or source heading, then sorts by whole-entry JCS bytes. Entity
relationships are converted to the same edge shape. No generated inverse is
included. `external_dependencies` and `authority_inputs` contain every exact
closed entry of their respective kind and sort by whole-entry JCS bytes. These rules leave one byte sequence for
every conforming revision implementation.

The reviewed baseline preserves the complete sorted normalized authored-edge
external-dependency, and authority-input sets in addition to node revisions. This is the exact
predecessor material required to determine whether an edge or dependency
declaration changed and which local nodes enter the impact set; an evaluator
never attempts to infer that difference from two graph digests.

### Evaluation Policy

NKF 0.6 distributes exactly one immutable policy named
`nkf.freshness-policy.0.7` at
`contracts/nkf/0.7/freshness-policy.yaml`. Its release manifest binds the exact
bytes. The policy maps every supported relationship type, source/target node
kind combination, direction, and purpose to one of:

| Class | Evaluation effect |
| --- | --- |
| `hard` | A mechanically proven exact revision or governed-artifact binding mismatch blocks without semantic discretion. |
| `review` | Change propagates to the selected endpoint and requires semantic review. |
| `context` | The relationship remains queryable but does not independently expand mandatory review. |
| `historical` | The relationship participates only in historical discovery and reproduction. |

Only exact revision and governed-artifact binding mismatches are `hard` in
0.6. Every supported non-context, non-historical relationship consequence is
`review`. An unknown mapping, unsupported relationship, repository override,
or implementation heuristic fails closed. The policy is separately versioned
within the frozen NKF set so semantic vocabulary and traversal behavior remain
distinct without creating another consumer-selectable version coordinate.

The exact initial propagation map is:

| Relationship | Propagation from a changed endpoint | Class |
| --- | --- | --- |
| `part-of` | both directions | `review` |
| `defines`, `governs`, `applies-to`, `rationale-for` | source to target | `review` |
| `depends-on`, `realizes` | target to source | `review` |
| `extends`, `supersedes`, `flows-to`, `transitions-to` | both directions | `review` |
| `evidences`, `observes` | source to target | `review` |
| `references` | no mandatory expansion | `context` |

Every mapping applies to `change-impact`, `whole-root-readiness`, and
`consequential-use`; `supersedes`, `evidences`, `observes`, and `references`
also participate in `historical-reproduction`. Historical reproduction keeps
all authored relationships discoverable but does not use that projection to
expand a current impact set.

### Evaluation Context And Purposes

Every evaluation binds bundle and Root Profile identity; exact baseline and
candidate graph revisions; evaluator and policy identities and digests; one
purpose; the complete candidate universe; exact initial changed nodes,
authored edges, governed artifacts, external-dependency and authority-input declarations,
external observations, and authority observations; an
exact sorted target-node set when the purpose requires a target;
explicit UTC millisecond evaluation time only when a declared expiry needs it;
and baseline-completeness state.

The closed purpose vocabulary is:

| Purpose | Required question |
| --- | --- |
| `change-impact` | Which declared subjects require review because these exact inputs changed? |
| `whole-root-readiness` | Does every applicable subject have a current revision-bound semantic-review result for this candidate root? |
| `consequential-use` | May the identified knowledge support this exact declared consequence? |
| `historical-reproduction` | Can an earlier result be reproduced from its exact preserved inputs and policy? |

Purpose changes applicability and may change freshness for the same immutable
node. It is not a presentation label.

The reviewed baseline classifies every node for each non-historical purpose as
`eligible` or `inapplicable`, with an exact source-bound basis and participation
role. This is accountable semantic review evidence, not an intrinsic document
flag. `whole-root-readiness` begins with every eligible node.
`change-impact` begins with exact changed inputs and traverses eligible nodes
under the policy. `consequential-use` requires one or more exact target nodes
and calculates their policy closure. `historical-reproduction` ignores the
current baseline classification and uses the exact universe preserved by the
selected historical receipt. Missing or ambiguous classification is
`unknown`; inference from record type, path, link popularity, or AI similarity
is forbidden.

### Applicability Axes And Projections

Every applicable node result keeps five separate axes: applicability;
participation role; authority eligibility and exact authority binding;
freshness; and conformance. None implies another. The participation roles are
`governs`, `proposes`, `realizes`, `evidences`, `context`, and `history`.

One declaration produces three deterministic projections:

1. the **full graph**, containing current and historical declared nodes and
   relationships;
2. the **applicable graph**, containing every current and noncurrent subject
   relevant to the exact context and purpose; and
3. the **current graph**, containing only current nodes from the applicable
   graph.

Impact and readiness run over the applicable graph. Running either over the
current graph is invalid because it would hide the noncurrent subject that
must be reviewed or block use.

### Impact Closure And Decision Reconciliation

Initial change consists of exact baseline/candidate node-revision differences
plus explicitly changed authored edges, external-dependency and authority-input declarations,
governed artifacts, external observations, and authority observations. An
edge change selects both endpoints; an external-dependency or matching
external-observation change selects its local dependent; an authority input
or matching authority observation selects its local subject; an artifact change
selects its realizing record; and an authority observation selects its exact
locally declared subject. An unresolved mapping produces `unknown` and blocks
readiness. No canonical edit is assumed harmless from syntax or
appearance. The evaluator traverses only policy-selected `hard` and `review`
directions to a deterministic, cycle-safe fixed point. Every included node
contains at least one lexically minimal reason path to an initial change;
additional equal-length paths are sorted and retained. Cycles terminate and
remain visible.

Every applicable accepted Decision is semantically classified by the named
reviewer, with an exact section-bound basis, as `compatible`, `extends`,
`supersedes`, `conflicts`, or `not-applicable`. The evaluator verifies complete
coverage and bindings but cannot decide semantic truth or grant supersession
authority. An unresolved applicable conflict blocks acceptance, Task
completion, release, and consequential use.

During authoring, a human or AI reviewer semantically reviews the deterministic
mandatory closure plus any voluntarily expanded context. At Task completion,
release preparation, or other declared consequential use,
`whole-root-readiness` mechanically visits every applicable node and reuses
unchanged current revision-bound review evidence. Only missing or noncurrent
subjects require new semantic attention.

### Freshness Results And Claim Rules

The result set uses:

| Result | Meaning |
| --- | --- |
| `current` | Every required observable dependency, binding, policy input, and semantic-review obligation is satisfied for the exact revision, context, and purpose. |
| `stale` | A declared dependency, governed meaning, revision, or required review changed after the bound review. |
| `expired` | An explicit declared deterministic validity boundary has passed under the bound time input. |
| `invalidated` | An observed declared invalidation trigger applies to this node and purpose. |
| `unknown` | Required declaration, baseline completeness, observability, resolution, classification, or semantic review is missing, disputed, unsupported, or ambiguous. |

Every simultaneously applicable noncurrent result and every reason are
preserved. Presentation may order or emphasize them but cannot discard or
replace them. `current` appears only when no noncurrent result applies. No
document declares itself current. Missing evaluation time cannot expire a
document; it yields `unknown` when time is required. Missing external
observability also yields `unknown`, never current or revoked by inference.

An exact source, node-revision, evaluation-policy, or governed-artifact digest
mismatch observed after safe checker invocation is an `invalidated` hard
blocker. An archive, consumer pin, checker, or adopter distribution-integrity
mismatch is instead an execution-level verification failure: it forbids
checker invocation and produces no project freshness result. Other uncertain
supported semantic relationships default to `review`. A detected
false negative makes the affected policy unsupported until corrected and
re-exercised; it is never normalized as an acceptable trade-off.

Conformance and readiness remain different. A full-bundle validation can be
structurally conformant while readiness is `not-ready`. A command that claims
Task completion, candidate sealing, release, adoption, or consequential use
MUST explicitly require the applicable readiness purpose and fail when any
applicable node is noncurrent or the baseline is not confirmed.

### Reviewed Baseline

`.nourd/knowledge/freshness/baseline.yaml` is one committed, durable,
JSON-compatible YAML mapping with contract `nkf.graph-baseline` and version
`0.7`. It binds bundle identity, selected profile, graph revision, policy
identity and digest, the accepted version-delta declaration digest, a sorted
complete node-revision map, relationship-category coverage, purpose-specific
applicability coverage and participation roles, applicable Decision
classifications, any pending promotion reconciliation, and one confirmation.

Every applicability judgment, Decision classification, and observation binds,
in addition to its source-bound basis locator, the exact SHA-256 revision of
the judged node at judgment time and the exact SHA-256 digest of the cited
basis content. A Decision classification is keyed on the Decision record's
declaration digest and the purpose. Each judgment is either `performed` —
fresh in this baseline — or `carried`, and a carried judgment binds the exact
graph revision of the baseline in which it was last performed and the
reviewer identity that performed it, so provenance survives any number of
carries. Carrying is computed: a judgment MAY be carried only when the judged
node revision is unchanged, its basis digest is unchanged, every rule the
judgment depends on is `identical` under the accepted version-delta
declaration, and, for a Decision classification, the Decision record's
declaration digest is unchanged. A tool MUST NOT emit, and a checker MUST
refuse, a carried judgment whose preconditions do not hold. A reviewer MUST
NOT assert carrying; a reviewer only performs judgments.

The confirmation contains reviewer kind `human` or `agent`, a non-empty
stable reviewer identity, an exact UTC millisecond review instant, exactly
one of the literal claims `semantically-reviewed-whole-root` or
`semantically-reviewed-delta`, a non-empty set of exact source-bound review
observations, known limitations, and `disputed: false`. Under the whole-root
claim every judgment is `performed`. Under the delta claim the confirmation
additionally binds the exact computed required-review closure and the exact
performed set, and the checker admits the claim only when the performed set
contains the computed closure. Every graph relationship category required by
the selected profile is marked `reviewed` or `inapplicable` with a
source-bound basis. Empty or generic assertions do not satisfy review
evidence.

A checker validates shape, resolution, exact revisions, digests, carry
preconditions, closure containment, coverage, and binding; it does not
establish semantic completeness or reviewer authority. A missing, outdated,
disputed, ambiguous, coverage-incomplete, or unsupported baseline yields
`unknown` and blocks readiness; incomplete judgment or classification
coverage reports the distinct `coverage-incomplete` state. Recovery is a new whole-root semantic review. Updating the
baseline never rewrites canonical Markdown or the historical predecessor
baseline.

### Version-Delta Declaration

Each accepted NKF 0.7-or-later authority carries one digest-bound
version-delta declaration, contract `nkf.version-delta`, at the destination
its Specification names — for this revision,
`contracts/nkf/0.7/version-delta.yaml`. It binds the current and predecessor
version coordinates, the exact predecessor executable-companion digest, and
one closed classification for every rule identifier in the union of the
predecessor and current rule registries:

- `identical` — the rule's semantic meaning is unchanged; judgments depending
  only on identical rules remain carriable;
- `mechanically-transformable` — the rule's judgments map to the current
  version through the exact named transformation, whose proof obligation the
  authority acceptance covers; or
- `semantically-new` — the rule's meaning is new or changed; every judgment
  depending on it enters the required fresh-review closure. A rule present in
  only one registry is `semantically-new` unless an explicit `renamed_from`
  identity mapping binds it to a predecessor rule.

A deterministic registry diff MAY seed the declaration; the named reviewer
judges every non-identical classification, and acceptance of the authority
pair accepts the declaration with it. The updater derives what it may do
mechanically from this declaration alone and MUST refuse to act where the
declaration is absent, incomplete, ambiguous, or unsupported. The declaration
never classifies knowledge semantics; it classifies rules.

### Delta Review Claim And Computed Closure

For a `semantically-reviewed-delta` claim the checker computes the required
review closure deterministically from: every node whose revision differs from
the predecessor baseline; every judgment whose basis digest differs; every
node absent from the predecessor baseline; every judgment depending on a rule
classified `semantically-new`; every Decision classification whose Decision
declaration digest differs or whose Decision is new; every node reached from
those inputs by the evaluation policy's impact propagation; and every pending
promotion-reconciliation subject. The closure computation is reproducible
from the baseline, the predecessor baseline, the policy, and the accepted
version-delta declaration; the confirmation records it exactly so an auditor
verifies containment without recomputing.

A delta claim whose performed set does not contain the computed closure is
refused with the exact missing subjects named. A delta claim over a graph
whose completeness is missing, disputed, or unprovable — a missing or
disputed predecessor baseline, an unresolved succession chain, an unsupported
policy or declaration, or any condition this Specification already maps to
`unknown` — is refused, and whole-root review is the recovery path. The
whole-root claim remains valid at any time.

### Operational-Fact Dependencies And Promotion Reconciliation

A node whose meaning states an operational release fact declares that
dependency in its declaration through the closed `operational_dependencies`
list. Each entry names exactly one closed coordinate kind —
`release-version`, `recommendation`, or `installed-pin` — and one source
binding into the declaring node. A version promotion — candidate-bound or
public — mechanically writes one pending reconciliation entry for every
declaring node into the baseline's promotion-reconciliation set. While any
entry is pending, readiness fails closed and every pending subject is part of
any delta claim's computed closure. An entry is resolved only by a governed
edit of the declaring node followed by a performed judgment covering it; the
tool never resolves an entry by implication. The trigger fires only at and
after promotion; it never requires pre-promotion authoring, and the
prepublication lock is never asked to admit governed edits.

### Operational Receipts

Freshness receipts use contract `nkf.freshness-receipt`, version `0.7`, and are
stored below `.nourd/knowledge/freshness/receipts/` as operational state. They
bind exact context, purpose, graph and policy revisions, initial changes,
observations, projections, axes, complete noncurrent result sets, impact
closure and reason paths, cycles, Decision classifications, semantic-review
coverage, reviewer provenance, unknowns, and deterministic receipt identity.

Receipt identity is SHA-256 over the RFC 8785 canonical JSON of every receipt
field except `id`; `id` equals `freshness-` plus that digest. Historical
receipts are append-only. A changed input makes a receipt noncurrent and never
rewrites it. Receipt storage is ignored operational state, excluded from graph
revision and conformance enumeration, and MUST NOT contain credentials, raw
external payloads, or secrets. A selected receipt may later be captured as
governed Evidence through an explicit knowledge change; that does not make the
operational store canonical knowledge.

### Completeness And External Boundary

The checker mechanically requires one node for every record, every Task and
Evidence non-record, every non-record selected for independent evaluation, and
every referenced entity; every changed governed artifact connected to its
owning Realization; complete relationship-category review for the selected
profile; and an observable identity or `unknown` for every required external
dependency. Duplicate, ambiguous, unsupported, or missing declarations yield
`unknown` and may expand but never shrink review.

Software cannot prove that no undeclared semantic relationship exists. The
named whole-root confirmation is therefore an accountable semantic claim over
an exact graph revision, not machine proof. An incorrectly confirmed
incomplete baseline can still hide a relationship; later detected omission
invalidates readiness and requires whole-root recovery.

External systems retain authority for their data. A URL is navigation, not
graph identity. An external dependency declares repository or bundle identity,
one local dependent, one exact expected revision, and one exact supplied
observation identity. An authority input similarly declares one local subject,
the external authority, one exact expected revision, one source binding, and
one exact supplied observation identity. NKF 0.7 supports no free-form
revision rule or resolver and never crawls a
repository, follows links, polls an authority, or handles credentials during
native validation. Unavailable required external state yields `unknown`.

## Provenance And Roles

NKF separates four roles:

| Role | Responsibility |
| --- | --- |
| **Producer** | Created or materially changed the record content |
| **Verifier** | Checked the content against its sources, method, or referenced reality |
| **Acceptance authority** | May accept the exact proposed revision as governing meaning |
| **External authority** | Owns external accounts, data, permissions, resources, or operations |

Producing and verifying content do not accept it. Human verification is not a
substitute for acceptance unless the same actor separately exercises
an explicitly granted acceptance role.

### Acceptance Provenance

Core governance values are declarations, not proof. `status` states the
claimed state; `authority` names who may decide it; and optional `accepted_at`
states the claimed original acceptance date. Native NKF 0.7 has no universal
`acceptance_source`, `acceptance_event`, `proposal_revision`, or equivalent
proof field.

Acceptance occurs in the declared authority's authoritative system, never
inside a checker. A consumer may report `acceptance binding verified` only
when an authority-specific resolver establishes that:

1. the authoritative event or immutable Decision exists;
2. the actor exercised an authority listed by the record;
3. the outcome matches the claimed status;
4. the event identifies the exact bundle and record;
5. it binds the exact Markdown digest;
6. it binds the exact declaration revision or digest; and
7. it has not been superseded, revoked, or contradicted by that authority.

Unavailable or unperformed verification is `not verified`, not rejection. A
resolved conflict is `contradicted` and blocks governing use. Verification
does not perform acceptance, judge semantic adequacy, or confirm a
Realization.

Consumers keep four axes separate:

| Axis | Question |
| --- | --- |
| Declared governance | What status and authority does the declaration claim? |
| Acceptance-binding verification | Did that authority accept this exact revision? |
| NKF conformance | Does the bundle satisfy applicable NKF contracts? |
| Realization confirmation | Does separate Evidence establish the claimed implementation or behavior? |

Consequential governing use requires applicable accepted status, verified
acceptance binding, required conformance, and no governing-use blocker. When
portable authority evidence or resolver configuration is needed, it uses an
authority-owned extension. That extension is required when governing use
depends on it and defines exact event identity, revision binding,
supersession/revocation behavior, verification, failures, and round-trip data.

Provenance sources use the OKF 0.2 `sources` semantics. A source entry MUST
have a locator and SHOULD have a stable local source ID when the Markdown
attributes a claim to it. It MAY include title, author, observed time,
source revision, source last-modified time, and digest.

Claim-level attribution SHOULD use Markdown footnotes whose labels match
stable source IDs. Reordering a sources list MUST NOT change attribution.

An Evidence record MUST declare at least one provenance source or describe a
primary observation method sufficiently for another reviewer to understand
where the evidence came from.

Provenance answers “what was this derived from?” External authority answers
“who or what owns the external datum, permission, resource, or operation?”
They MUST be represented separately. Citing an external source does not
transfer its authority to NKF, and recording an external authority does not
make that authority a Producer, Verifier, or acceptance authority.

An external-authority declaration MUST identify the authority, its
relationship to the record, a durable locator or resolution rule, and the
source section that establishes the boundary.

NKF MAY record factual production, verification, observation, and
last-modified times. Those facts affect contextual document freshness only
through an explicit 0.7 freshness declaration, policy, purpose, and bound
evaluation input. NKF does not define a universal context-free expiry.

## Semantic Entities And Bindings

A record MAY define semantic entities when independently addressable meaning
is needed for relationships, navigation, architecture, or Realization
bindings.

Each entity declaration MUST include:

- a stable record-scoped entity ID;
- a controlled entity kind supplied by the body contract or supported
  profile; and
- the exact defining section.

It MAY include a canonical semantic or architectural address. An address is
not identity.

Core entity kinds and allowed defining bodies are:

| Kind | Exact meaning | Allowed defining body contracts |
| --- | --- | --- |
| `product` | The Product as independently addressable governed meaning. | `nkf.product` |
| `technology` | The Technology as independently addressable governed meaning. | `nkf.technology` |
| `specification` | An independently addressable normative technical specification. | `nkf.specification` |
| `contract` | A governed technical contract or contract family. | `nkf.technology`, `nkf.specification` |
| `rule` | A governed normative rule. | `nkf.specification`, `nkf.decision` |
| `diagnostic` | A stable diagnostic meaning. | `nkf.specification` |
| `principle` | A specific normative Product principle. | `nkf.principle` |
| `concept` | A named Product concept not more accurately classified by a narrower kind. | `nkf.concept` |
| `actor` | A person, role, group, system, or external participant that acts in the governed context. | `nkf.product`, `nkf.concept`, `nkf.journey`, `nkf.domain`, `nkf.capability`, `nkf.technology`, `nkf.specification` |
| `beneficiary` | A person, group, or other subject intended to receive a Product outcome or value. | `nkf.product`, `nkf.concept`, `nkf.journey`, `nkf.domain`, `nkf.capability` |
| `stage` | A meaningful segment of a journey. | `nkf.journey` |
| `decision-point` | A point in a journey where an actor or governing rule selects among consequential paths. | `nkf.journey` |
| `transition` | A meaningful movement between journey stages or conditions. | `nkf.journey` |
| `outcome` | A desired, achieved, failed, or recovered Product result. | `nkf.product`, `nkf.journey`, `nkf.capability` |
| `domain-concept` | A concept whose canonical meaning is owned within a Product domain. | `nkf.concept`, `nkf.domain` |
| `domain-entity` | A domain-owned semantic subject with stable identity relevant to domain responsibilities. | `nkf.concept`, `nkf.domain` |
| `capability-input` | Information, material, permission, or condition consumed by a capability. | `nkf.capability` |
| `capability-outcome` | A result produced or enabled by a capability. | `nkf.capability` |
| `component` | A design-level constituent with a defined responsibility or interaction. | `nkf.design` |
| `interface` | A defined semantic boundary through which subjects interact or exchange information. | `nkf.domain`, `nkf.capability`, `nkf.technology`, `nkf.specification`, `nkf.design`, `nkf.realization` |
| `information-flow` | A design-level movement of information between defined subjects. | `nkf.design` |
| `state` | A meaningful design or concept state, not the current state of an operational instance. | `nkf.concept`, `nkf.design` |
| `policy` | A defined rule set governing behavior, applicability, or decisions. | `nkf.principle`, `nkf.domain`, `nkf.technology`, `nkf.specification`, `nkf.design`, `nkf.decision` |
| `decision-scope` | The independently addressable scope to which a Decision applies. | `nkf.decision` |
| `system` | A durable system or service definition, not a live system instance. | `nkf.design`, `nkf.realization` |
| `source` | A durable source definition, distinct from a provenance citation and from current source state. | `nkf.realization`, `nkf.evidence` |
| `process` | A durable organizational or technical process definition. | `nkf.design`, `nkf.realization` |
| `asset` | A durable governed asset definition not more accurately classified by another core kind. | `nkf.realization` |
| `agreement` | A durable agreement, contract, or commitment represented by a Realization. | `nkf.realization` |
| `implementation` | A durable implementation or configuration definition. | `nkf.realization` |
| `claim` | A source-bound proposition examined or supported by Evidence. | `nkf.evidence` |
| `observation` | A reviewed, time-bounded observation represented as Evidence, not live operational state. | `nkf.evidence` |

Unknown or body-unsupported kinds fail closed. A record need not declare a
record-root entity merely because the record exists.

Each semantic entity has exactly one canonical definition owner. Another
record MAY reference, constrain, realize, evidence, bind, or observe the
entity, but MUST NOT redefine its identity, kind, or core meaning.

A record MAY declare source-bound `entity_relationships`. Each relationship
MUST include a controlled type, source entity, target entity, and source
section. The applicable body contract or supported profile controls entity
kinds and entity-relationship types; free-form labels cannot silently extend
them.

Entity references contain `record` and `entity`, both resolving inside the
same bundle. The source endpoint is canonically defined by the record declaring
the relationship; the target may belong to that or another same-bundle record.

Core entity-relationship types are:

| Type | Directional meaning |
| --- | --- |
| `part-of` | Source entity is a governed constituent of target entity. |
| `defines` | Source entity supplies canonical defining meaning used by target entity without transferring or duplicating target ownership. |
| `depends-on` | Source entity requires target entity's meaning or availability. |
| `governs` | Source entity constrains target entity. |
| `flows-to` | Information, value, material, or control moves from source entity to target entity. |
| `transitions-to` | Source stage or state may move to target stage or state. |
| `realizes` | Source entity in a Realization record maps target governed meaning to a durable realization. |
| `evidences` | Source entity in an Evidence record supplies support relevant to target entity. |
| `observes` | Source `observation` entity in an Evidence record records an observation about target entity. |
| `references` | Source entity deliberately points to target entity without asserting a stronger core relationship. |

Relationships are directional, source-bound, duplicate-free, and not
self-referential. Entity `part-of` is acyclic. `flows-to` and
`transitions-to` may cycle when the source establishes it. `transitions-to`
requires both endpoints to be `stage`, `transition`, or `state`. `realizes`
requires a source owned by `nkf.realization`; `evidences` requires a source
owned by `nkf.evidence`; and `observes` requires source kind `observation`
owned by `nkf.evidence`.

A record MAY declare durable `bindings`. Each binding MUST include:

- the semantic entity;
- the Realization record;
- a controlled binding kind;
- the source section; and
- at least one durable locator or resolution rule.

A binding MAY identify an applicable external authority. A locator, rule,
provider identifier, Source path, deployment name, or namespace address is not
semantic identity.

Bindings are declared only by `nkf.realization`. The `realization` value equals
the declaring record ID, `source_section` resolves there, and the entity
reference resolves in the same bundle. A present `external_authority` resolves
to that record's declaration. At least one non-empty `locator` or
`resolution_rule` is required.

Common binding kinds are:

| Kind | Exact mapping target |
| --- | --- |
| `source` | A source-controlled repository, path, artifact, or equivalent durable source location. |
| `system` | A system, service, application, or platform. |
| `process` | An organizational or technical process. |
| `asset` | A durable asset not more accurately classified by another binding kind. |
| `implementation` | Code, configuration, infrastructure definition, or another implementation artifact. |
| `provider` | A provider-owned capability, registration, tenant, or resource boundary; an applicable `external_authority` is required. |
| `namespace` | A durable namespace or resolution domain. |
| `data` | A dataset, schema, data store, or durable data-access surface, not copied live data. |
| `interface` | An API, event, integration, UI, or other durable interaction surface. |

The Product Profile additionally permits:

| Kind | Exact mapping target |
| --- | --- |
| `agreement` | An agreement, contract, service commitment, or equivalent governed instrument. |
| `deployment` | A durable deployment target, class, or address, not current deployment state. |

Unknown or profile-unsupported binding kinds fail closed. Bindings are
order-insensitive and exact duplicate objects are invalid. Multiple distinct
mappings may target the same entity through the same Realization when their
kind, locator, or resolution rule differs.

NKF owns semantic entities, Realizations, durable binding definitions,
resolution rules, locators, and authority boundaries. Nourd Studio or another
operational system owns resolution, instance state, and observations. NKF
MUST NOT enumerate live users, resorts, activities, devices, sessions,
deployments, accounts, or provider resources as canonical knowledge merely
because a binding can resolve them.

## Body Contracts

Every record MUST declare a `body_contract`. A body contract
defines required semantic responsibilities, allowed section roles, valid
authority classes, and minimum structural rules for that record type.

Each body contract MUST assign a stable machine-readable identifier to every
required responsibility. Those identifiers are governed by the NKF format
version. Renaming, splitting, combining, adding, or removing a required
responsibility requires a later NKF format-version compatibility change rather
than a heading convention.

A supported body contract MAY allow additional declared and classified
sections. A consumer MAY display an unsupported body contract generically,
but MUST NOT claim complete validation or use it for a consequential governing
action.

**Technology — `nkf.technology`**

Required responsibilities:

1. `technology-definition` — Name, stable identity, maintainer or owner, and
   the kind of Technology.
2. `purpose-and-problem` — Why the Technology exists and the technical problem
   or class of problems it addresses.
3. `consumers-and-use-contexts` — Intended consumers, integration contexts,
   and the circumstances in which they rely on it.
4. `capabilities-and-contracts` — The technical abilities, guarantees,
   interfaces, or contracts the Technology supplies.
5. `scope-authority-and-boundaries` — What meaning and behavior the Technology
   owns, what it does not own, and its external-authority and
   operational-state boundaries.
6. `technology-map` — Links to governing Specifications, Decisions, Designs,
   Realizations, Evidence, interfaces, and other material Technology
   knowledge.
7. `versioning-compatibility-and-migration` — Version coordinates,
   compatibility policy, supported transitions, and deliberate consumer
   migration.
8. `distribution-support-and-security` — Distribution and integrity
   boundaries, support expectations, and security and privacy obligations.
9. `evolution-and-retirement` — Change, deprecation, and retirement.

Optional responsibilities include licensing, contribution governance,
portability, adoption Evidence, known risks, measures, and unresolved matters.

A Technology record MUST be unique and living. It describes the whole
Technology, not merely its repository, package, executable, deployment, or
current implementation. Detailed architecture belongs in Design records and
is linked through the Technology map.

**Specification — `nkf.specification`**

Required responsibilities:

1. `specification-definition` — Specification identity, subject, purpose, and
   the technical contract or behavior it defines.
2. `authority-and-normative-status` — Normative authority, acceptance state,
   precedence, and the distinction between normative and explanatory content.
3. `scope-and-applicability` — Included and excluded subjects, supported
   contexts, assumptions, and applicability boundaries.
4. `model-vocabulary-and-semantics` — Normative model, vocabulary, identities,
   and semantic rules.
5. `requirements-constraints-and-interfaces` — Required, permitted, and
   prohibited behavior, structural constraints, and interfaces.
6. `validation-and-conformance` — Deterministic checks, semantic-review
   boundaries, diagnostics, conformance meaning, and what validation cannot
   prove.
7. `versioning-compatibility-and-migration` — Version meaning, compatibility,
   deprecation, replacement, and migration.
8. `security-authority-and-operational-boundaries` — Security, privacy,
   external-authority, and operational-state boundaries.
9. `unresolved-and-deferred-matters` — Known omissions, deferred decisions,
   unsupported cases, and their visible consequences.

Optional responsibilities include examples, counterexamples, rationale,
interoperability, clearly non-normative implementation guidance, test and
fixture traceability, change history, and unresolved questions.

An accepted Specification for an exact Technology version MUST be immutable.
A later correction, extension, replacement, or reversal requires a governed
revision with explicit provenance and compatibility. A Specification states
normative meaning; it does not prove a Realization or consumer conforms.

**Product — `nkf.product`**

Required responsibilities:

1. `product-definition` — Product definition: name, ownership, and what kind
   of Product it is.
2. `purpose` — Purpose: why the Product exists.
3. `vision` — Vision: the durable future it seeks to create.
4. `people-served` — People served: who receives value.
5. `needs-and-outcomes` — Needs and outcomes: what becomes possible or
   improves.
6. `boundaries` — Boundaries: what belongs to the Product and what does not.
7. `product-map` — Product map: links to Domains, Capabilities, and other
   governing knowledge.

Optional responsibilities include a vision portfolio; offering and commercial
model; operating and support model; external-authority boundaries; risks and
obligations; Product measures; evolution and retirement; and unresolved
matters.

A Product record MUST be unique and living. It describes the whole Product,
not only its software. It SHOULD link to narrower records instead of
duplicating them. Implementation and runtime state belong in Realizations and
operational systems. Exploratory visions remain proposals; accepted direction
uses accepted-meaning sections.

**Principle — `nkf.principle`**

Required responsibilities:

1. `principle-statement` — Principle statement.
2. `rationale` — Rationale.
3. `applicability` — Applicability.
4. `required-behaviour` — Required behaviour.
5. `boundaries` — Boundaries.
6. `decision-and-trade-off-implications` — Implications for decisions and
   trade-offs.

Optional responsibilities include examples, counterexamples, supporting
Evidence, tensions with other Principles, known exceptions, and unresolved
questions.

A Principle is normative guidance, not a slogan. It says what should remain
true; a Decision records a particular choice. It MUST be concrete enough to
evaluate a Decision, Design, or Realization. Principles are normally living.
A material exception MUST be explicit and supported by a Decision. Compliance
requires Design, Realization, and Evidence rather than assertion by the
Principle itself.

**Concept — `nkf.concept`**

Required responsibilities:

1. `definition` — Definition.
2. `purpose-and-product-relevance` — Purpose and Product relevance.
3. `distinguishing-characteristics` — Distinguishing characteristics.
4. `inclusion-exclusion-and-ambiguity-boundaries` — Inclusion, exclusion, and
   ambiguity boundaries.
5. `product-and-knowledge-relationships` — Relationships to the Product and
   other meaning.
6. `current-maturity` — Current maturity: accepted, proposed, and unresolved
   meaning.

Optional responsibilities include alternative names, examples, scenarios,
competing interpretations, supporting Evidence, possible evolution, and open
questions.

A Concept defines shared Product meaning; it is not automatically a feature
commitment. Exploratory visions MAY begin as proposal sections. Accepted
direction and speculation MUST remain distinct. A Concept MUST NOT claim to be
a Design, Realization, or operational instance. Concepts are normally living.

**Journey — `nkf.journey`**

Required responsibilities:

1. `purpose-and-desired-outcome` — Purpose and desired human or system
   outcome.
2. `actors-and-beneficiaries` — Actors and beneficiaries.
3. `trigger-and-operating-context` — Trigger and operating context.
4. `start-end-and-scope-boundaries` — Start, end, and scope boundaries.
5. `meaningful-stages-decisions-and-transitions` — Meaningful stages,
   decisions, or transitions.
6. `needs-expectations-and-consequential-moments` — Needs, expectations, and
   consequential moments.
7. `success-failure-interruption-and-recovery` — Success, failure,
   interruption, and recovery conditions.
8. `related-domains-and-capabilities` — Related Domains and Capabilities.

Optional responsibilities include variants, channels, accessibility needs,
support paths, Evidence, measures, risks, and unresolved questions.

A Journey describes a bounded experience or reason for interaction. It is not
a Task lifecycle, Workflow Run, screen flow, or implementation script. It MAY
cross Domains and Capabilities. A Journey SHOULD preserve the intended
outcome while allowing several Designs and Realizations.

**Domain — `nkf.domain`**

Required responsibilities:

1. `responsibility-and-product-purpose` — Responsibility and Product purpose.
2. `value-and-people-served` — Value and people served.
3. `scope-and-boundaries` — Scope and explicit boundaries.
4. `owned-concepts-and-semantic-entities` — Concepts and semantic entities
   owned.
5. `capability-map` — Capability map.
6. `dependencies-interfaces-and-external-authority` — Dependencies,
   interfaces, and external-authority boundaries.
7. `obligations-risks-and-measures` — Obligations, risks, and measures
   relevant to the responsibility.

Optional responsibilities include commercial, operational, support, policy,
data, evolution, retirement, and unresolved concerns.

A Domain is a durable area of Product responsibility, not a department,
repository, service, screen, or temporary initiative. It MUST be `part-of`
the Product. Its boundaries SHOULD reduce competing ownership while allowing
explicit relationships with other Domains.

**Capability — `nkf.capability`**

Required responsibilities:

1. `ability-statement` — Ability statement.
2. `people-actors-and-outcomes` — People, actors, and outcomes served.
3. `conditions-inputs-and-resulting-outcome` — Conditions, inputs, and
   resulting outcome.
4. `scope-and-non-capability-boundaries` — Scope and non-capability
   boundaries.
5. `governing-constraints-and-authority` — Governing constraints and
   authority.
6. `dependencies-and-related-journeys` — Dependencies and related Journeys.
7. `success-and-failure-conditions` — Success and failure conditions.

Optional responsibilities include variants, policies, measures, Evidence,
risks, Designs, Realizations, and unresolved questions.

A Capability states what the Product can enable, not a feature backlog or how
it is implemented. It MUST be `part-of` one Domain. Current availability,
authorization, health, and use are operational state. An accepted Capability
does not claim that a complete Realization exists.

**Design — `nkf.design`**

Required responsibilities:

1. `design-kind-problem-and-scope` — Design kind, problem, and scope.
2. `governing-inputs-and-constraints` — Governing inputs and constraints.
3. `proposed-direction` — Direction proposed for a Decision to adopt, reject,
   or supersede.
4. `responsibilities-interactions-and-information-flows` — Responsibilities,
   interactions, and information flows.
5. `alternatives-and-trade-offs` — Alternatives and trade-offs.
6. `failure-safety-recovery-and-operations` — Failure, safety, recovery, and
   operational considerations.
7. `validation-and-decision-evidence` — Validation approach and evidence
   required for an informed Decision.
8. `unresolved-matters` — Explicit unresolved matters.

Optional responsibilities include experience states, diagrams, contracts,
data treatment, accessibility, security, privacy, commercial implications,
migration, rollout, and retirement.

A Design MAY describe experience, business, service, operating, policy, or
technical realization. A Design remains proposal knowledge in every
disposition. A Decision adopts, rejects, or supersedes the proposed direction;
acceptance governs an exact record revision and is not a Design disposition.
A Design MUST distinguish Product requirements from chosen solutions in a
Product bundle and Technology requirements from chosen solutions in a
Technology bundle. It MUST NOT claim implementation or conformance without a
Realization and Evidence. A material choice that must remain historically
stable SHOULD be captured by a Decision.

**Decision — `nkf.decision`**

Required responsibilities:

1. `context-and-problem` — Context and problem.
2. `decision` — Decision.
3. `scope-and-applicability` — Scope and applicability.
4. `rationale` — Rationale.
5. `alternatives-considered` — Alternatives considered.
6. `consequences-and-trade-offs` — Consequences and trade-offs.

Optional responsibilities include evidence, compatibility, migration,
recovery, supersession, and matters deliberately not decided.

A Decision governs its declared root scope and is not limited to architecture.
The Product Profile additionally requires Product Decisions to apply across
the whole Product. An accepted Decision MUST be immutable. Correction,
extension, replacement, or reversal requires a later Decision with a typed
relationship, normally `supersedes` or `extends`. A draft Decision may evolve
until its exact revision is accepted. Rejection remains review, Task, and Git
history; it does not create an alternate governing record.

**Realization — `nkf.realization`**

Required responsibilities:

1. `realization-identity-and-kind` — Realization identity and kind.
2. `governed-meaning-realized` — Product or Technology meaning, entities,
   Designs, Decisions, or Specifications realized.
3. `durable-mapping` — Durable Source, system, process, asset, agreement, or
   implementation mapping.
4. `responsibilities-and-ownership-boundaries` — Responsibilities and
   ownership boundaries.
5. `interfaces-dependencies-locators-and-resolution` — Interfaces,
   dependencies, locators, and resolution rules.
6. `external-authority-and-operational-state-boundaries` —
   External-authority and operational-state boundaries.
7. `compatibility-verification-and-recovery` — Compatibility, verification,
   and recovery obligations.

Optional responsibilities include environments, configuration classes,
migration, deployment model, support model, security, privacy, retention,
retirement, and unresolved questions.

A Realization maps intent to reality without redefining the governed meaning.
It MAY declare durable bindings but MUST NOT store live instance state,
current health, current deployment, or observations as canonical fields.
Implementation presence does not prove conformance; Evidence is required.

**Evidence — `nkf.evidence`**

Required responsibilities:

1. `question-claim-or-decision-context` — Question, claim, or decision
   context.
2. `sources-or-primary-observation-method` — Sources or primary observation
   method.
3. `observations-and-findings` — Observations and findings.
4. `interpretation` — Interpretation.
5. `limitations-and-uncertainty` — Limitations and uncertainty.
6. `applicability-and-boundaries` — Applicability and boundaries.
7. `relevance-to-governed-knowledge` — Relevance to governed knowledge.

Optional responsibilities include methodology detail, samples, competing
evidence, confidence, reproducibility, ethical or privacy constraints,
recommended investigation, and unresolved questions.

Evidence carries evidence authority; it does not become governing intent,
a Specification, Design, or Decision by being convincing. It MUST distinguish
observation from interpretation and MUST NOT overstate applicability. A fixed
study or review MAY be immutable; a maintained synthesis MAY be living. Raw
runtime events and current status remain in their authoritative operational
stores.

## Decision Applicability Gate

Accepted decisions carry conditions, negative findings, rejected
capabilities, supersessions, and unresolved unknowns. Successor work loses
them when nothing forces extraction. The Decision Applicability Gate is the
required, deterministic structure through which every Task non-record carries
the accepted decisions that apply to it and classifies the mandatory
capabilities its outcome depends on. The gate records extraction. It confers
no acceptance, adoption, confirmation, conformance, or readiness, and NKF
still does not execute, schedule, complete, or own the Task.

### Gate Structure

Every Task non-record MUST contain exactly one top-level H2 whose comparison
string is `Decision Applicability`. That section MUST contain exactly two
top-level H3 subsections, in order: `Applicable Decisions` and `Mandatory
Capabilities`. No other top-level H3 may appear inside the section.

A gate table is a sequence of consecutive source lines that each begin with
`|`: one header line, one delimiter line, and one or more data lines. Cells
are split on unescaped `|` and trimmed of surrounding whitespace; a data cell
MUST NOT contain a backslash-escaped pipe or be empty, and every data line
MUST contain exactly the header's cell count. A reference cell consists
solely of one backtick-delimited record identifier. A canonical sentence is
one paragraph whose whitespace-normalized text, derived exactly like a
heading comparison string, equals the required sentence.

The first block of `Applicable Decisions` MUST be exactly one of:

- the canonical sentence `No accepted decision applies to this Task.`; or
- one gate table with the exact header `| Reference | Kind | Carried
  Constraint |`.

Each data row declares one applicable decision constraint:

- `Kind` MUST be exactly `record` or `external`.
- For kind `record`, `Reference` MUST be one CommonMark link whose visible
  text is a reference cell identifier resolving to exactly one same-bundle
  Decision record whose declared governance status is `accepted`, and whose
  destination resolves to that record's exact source path.
- For kind `external`, `Reference` MUST be non-empty prose naming the
  external authority and record; native validation does not resolve it.
- `Carried Constraint` MUST be non-empty prose carrying the applicable
  condition, negative finding, rejected capability, supersession, or
  unresolved unknown. A genuinely unconditional decision states
  `Unconditional.` explicitly.

The first block of `Mandatory Capabilities` MUST be exactly one of:

- the canonical sentence
  `No mandatory capability is implicated by this Task.`; or
- one gate table with the exact header
  `| Capability | Finding | Verification | Exception |`.

Each data row declares one mandatory capability:

- `Capability` MUST be non-empty prose naming one capability that a governing
  requirement makes mandatory for the Task's outcome.
- `Finding` MUST be a capability-finding vocabulary value.
- For finding `proven`, `Verification` MUST be exactly one
  verification-level vocabulary value naming the highest level at which the
  capability was directly verified. For findings `unsupported` and `unknown`,
  `Verification` MUST be exactly `none`.
- `Exception` MUST be exactly `none`, or an explicit Human Product Owner
  exception: either a link whose visible text is a reference cell
  identifier resolving to an accepted same-bundle Decision record with the
  record's source path as destination, or non-empty prose identifying the
  recorded human exception act.

Additional explanatory blocks MAY follow the required first block in each
subsection. A gate added to a pre-existing Task after the fact MUST state in
an explanatory block that it was added retrospectively rather than implying a
historical extraction.

### Gate Vocabularies

`verification_levels` is the ordered closed vocabulary for the level a
verification claim actually reached:

| Level | Meaning |
| --- | --- |
| `data-validity` | Governed inputs or artifacts are well-formed and integrity-bound |
| `adapter-compatibility` | A consumer, adapter, or interface can load and address the data through its declared contract |
| `runtime-behaviour` | The required runtime outcome itself was directly observed in the executing system |
| `human-experience` | The applicable human authority directly reviewed the experienced result |
| `production-suitability` | Production, commercial, and legal suitability established by its owning authority |

`capability_findings` is the closed vocabulary for mandatory capabilities:
`proven`, `unsupported`, and `unknown`.

These vocabularies classify claims about capabilities and outcomes. They are
distinct from conformance levels, section authority classes, and validation
result axes, and none of those may substitute for them.

### Gate Presence And Completion

| Task declaration `state.value` | Gate | Completion rule |
| --- | --- | --- |
| `active` | Required | Not applicable |
| `deferred` | Required | Not applicable |
| `completed` | Required | No data row may combine finding `unsupported` or `unknown` with exception `none` |
| `cancelled` | Required | Not applicable |

A cancelled Task concludes without delivery: it records its cancellation
rationale, the completion rule does not apply because nothing is claimed
delivered, and `cancelled` is terminal. A Task is never cancelled from
`completed`; reversing delivered work is a later Task with its own
provenance.

A completed Task whose gate carries an unexcepted `unsupported` or `unknown`
mandatory capability fails closed. A repository gates its complete Task
history when it migrates to this version; retrospective gates are truthful,
declare themselves retrospective, and never fabricate a historical
extraction.

### Gate Claim Rules

1. A verification claim in governed knowledge MUST name the verification
   level it reached, and a claim at one level MUST NOT be represented as
   success at a higher level.
2. A claim at `runtime-behaviour` or higher requires direct observation of
   the required outcome itself. Available input data, invoked methods,
   differing screenshots, simulated or sent gestures, and process survival
   are not sufficient evidence that the outcome occurred.
3. A restatement of an accepted decision that carries conditions, negative
   findings, or unresolved unknowns MUST carry them or reference the exact
   record; it MUST NOT be summarized as an unconditional choice.
4. A change to the renderer, provider, platform, data format, architecture,
   verification harness, or a mandatory requirement invalidates the affected
   extraction; the gate MUST be re-evaluated before dependent claims are
   made.
5. Gate content and validation results remain distinct from acceptance,
   adoption, Realization confirmation, conformance, Git state, and remote
   enforcement.

### Gate Conformance Boundary

Native validation enforces gate presence and uniqueness
(`task.applicability.missing`), the structural grammar
(`task.applicability.structure.invalid`), closed vocabulary agreement
including `Verification` consistency with `Finding`
(`task.applicability.value.unsupported`), reference resolution to accepted
same-bundle Decision records (`task.applicability.reference.unresolved`),
and the completion rule (`task.applicability.completion.blocked`).

Deterministic validation proves structure, vocabulary, resolution, and the
fail-closed states. It does not prove that an extraction is complete, that
prose is truthful, that a summary elsewhere carries a condition, or that a
claimed observation occurred. Those remain authoring-procedure obligations
under human review and audit.

## Extension Contract

An extension may add namespaced types, body contracts, vocabularies,
declaration payloads, deterministic constraints, or interoperability data for
an explicitly governed scope. It cannot change or weaken core fields or rules;
introduce source-absent semantic claims; make metadata or conformance prove
acceptance; create another NKF version coordinate; hide operational state or
secrets; or claim core support from one consumer's implementation.

An extension ID is lowercase, owner-namespaced, and matches:

```text
^[a-z][a-z0-9]*(?:\.[a-z](?:[a-z0-9-]*[a-z0-9])?){2,}$
```

The first namespace [`nkf`](../nkf.md) is reserved for extensions owned and accepted by
NKF. Other namespaces belong to their stated authority. Namespace text is an
ownership claim, not proof. Extension IDs have no independent version;
`nkf_version: "0.7"` is the only version coordinate and artifact digests bind
exact revisions.

Every used extension has a digest-bound authority pair:

1. normative Markdown owning its complete human-readable meaning; and
2. executable YAML with identity `nkf.extension`, `nkf_version: "0.7"`, the
   extension ID, application sites, payload shape, vocabularies, constraints,
   and deterministic validation.

When any extension is used, the bundle contains a non-empty,
duplicate-ID-free catalog:

```yaml
extension_contracts:
  - id: com.example.profile
    specification:
      locator: <durable locator>
      digest:
        algorithm: sha-256
        value: <64 lowercase hexadecimal characters>
    executable:
      locator: <durable locator>
      digest:
        algorithm: sha-256
        value: <64 lowercase hexadecimal characters>
```

Both locators resolve to the exact bytes. The executable declares matching
extension ID and `nkf_version`. The catalog is bundle-local resolution
metadata, not a public registry.

The bundle and records may contain:

```yaml
extensions:
  - contract: com.example.profile
    requirement: required
    payload: {}
```

`contract` resolves uniquely through the catalog. `requirement` is `required`
or `optional`. `payload` is required and may contain any JSON-compatible YAML
value permitted by the extension. IDs are unique within each use list, order
carries no meaning, and empty catalog/use lists are omitted. There is no
separate `required_extensions` field.

Meaning necessary to interpret a type, body contract, authority,
responsibility, relationship, governing statement, or consequential use is
`required`. An optional extension supplies only nonessential display,
discovery, interoperability, or advisory data. A namespaced type or body
contract requires its owning extension.

A consumer supports an extension use only when it:

1. resolves both authority artifacts;
2. verifies both exact digests;
3. verifies matching extension ID and `nkf_version`;
4. recognizes the exact executable digest; and
5. implements all required deterministic and semantic-review boundaries.

The native core supported-extension set is empty. Similar identity, parseable
payload, or support for another digest is not support.

| Condition | Required behavior |
| --- | --- |
| Required extension unsupported, unresolved, or digest-mismatched | Applicable contract conformance and consequential governing use fail closed |
| Required payload missing or invalid | Applicable contract conformance fails |
| Optional extension unsupported | Preserve and expose it; core validation may continue and reports semantics unvalidated |
| Supported optional payload invalid | Applicable contract conformance fails |
| Extension conflicts with core | Fail closed regardless of requirement |

Unsupported extension catalog, use metadata, and payload remain visible and
round-trip without JSON-data-model loss. Comments, anchors, aliases, scalar
style, whitespace, and key order need not survive. A consumer unable to
preserve unsupported payload operates read-only or fails instead of dropping
it.

Native NKF 0.7 accepts no concrete extension. Portable presentation guidance
is deliberately outside the native record; future NKF-owned presentation work
remains separate governed work outside this version.

## Native Project Organization

The fixed `.nourd` layout in the bundle contract is native NKF 0.7, not a
separate Nourd repository profile. The configured `knowledge_root` may be
named `knowledge` or another project-contained path.

Directories inside `knowledge_root` are navigation, not semantic authority,
and SHOULD exist only when real material needs them. A Markdown README or
index is not exempt by filename: it has one record declaration or one
`non_records` entry.

Generated projections and operational state remain outside the record
declaration tree. Existing `nourd.knowledge.*` bootstrap consumers require
deliberate migration and do not become native merely because their logical
model is similar.

## Okf 0.2 Interoperability

OKF 0.2 is an intentionally permissive directory of Markdown documents with
YAML frontmatter. It requires only a `type`, treats paths as concept identity,
uses ordinary untyped Markdown links, and makes provenance, production,
verification, lifecycle, freshness, and attestation optional.

NKF is stricter because it must represent governing meaning, stable
identity independent of path, typed and source-bound relationships,
section-level authority, explicit acceptance, Realizations, and external
authority.

An OKF export is a derived projection of an NKF bundle. It MUST NOT become a
competing canonical authority.

The minimum mapping is:

| NKF | OKF 0.2 export |
| --- | --- |
| Record type | `type` |
| Title | `title` |
| Markdown meaning | OKF Markdown body |
| Provenance sources | `sources` |
| Producer | `generated` |
| Verifier | `verified` |
| Draft authority state | `status: draft` |
| Accepted current record | `status: stable` |
| Superseded or retired record | `status: deprecated` |
| Record links | Markdown links, with typed NKF relationships retained only in a clearly identified extension |
| NKF stable identity and governance | Preserved in an NKF extension because OKF path identity and `verified` cannot represent them |

NKF acceptance MUST NOT map to OKF `verified`; verification and acceptance
remain different roles. Contextual NKF freshness does not map to OKF's
intrinsic `stale_after`; an exporter omits it and preserves graph, policy,
baseline, and receipt meaning only in a clearly identified NKF extension.

OKF's Attested Computation does not automatically become a new NKF core record
type. A durable sanctioned computation may be represented through a supported
Design or Realization profile, while receipts and per-run attestation remain
operational Evidence. An exporter MUST NOT invent that mapping without a
declared profile.

NKF 0.7 is based on the official
[OKF 0.2 specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
and the
[Google Cloud 0.2 release explanation](https://cloud.google.com/blog/products/data-analytics/okf-v0-2-adds-trust-signals/).
OKF 0.2 supersedes `timestamp` with `generated.at` and the body
`# Citations` convention with `sources`; NKF exporters MUST use the 0.2 forms.

## Conformance

### Yaml Parse Boundary

Native NKF YAML is UTF-8 and uses the YAML 1.2 JSON-compatible data model.
Each manifest, record declaration, or executable contract file contains
exactly one document with one mapping root and string keys. Values are only
null, boolean, finite number, string, array, or mapping. Duplicate keys,
custom tags, merge keys, anchors, and aliases are invalid.

Comments and presentation whitespace carry no meaning. Parsing cannot execute
constructors, interpolate environment variables, or resolve external content.

### Enforcement Layers

| Layer | Deterministic responsibility | Cannot establish |
| --- | --- | --- |
| JSON Schema 2020-12 | Local closed shapes, required fields, primitives, constants, enums, cardinality, duplicate-free scalar arrays, conditions, lexical formats | Files, containment, source bytes, headings, graph resolution, authority verification, semantic adequacy |
| Bundle-aware checker | Project layout, paths, sources, Markdown coverage, root-profile resolution, declared graph resolution, revisions, deterministic closure, baseline and receipt binding, responsibilities, hierarchy, governed artifacts, extension-use consistency, resolver outcomes, bundle conformance and readiness calculation | Acceptance, truth, design quality, semantic completeness, reviewer authority, confirmed Realization |
| Artifact and authority resolver | Exact extension artifacts and optional acceptance-authority binding | Core acceptance, unsafe automatic dereference |
| Human semantic review | Adequacy and acceptability of meaning, classification, evidence, boundaries, and decisions | Deterministic conformance merely from judgment |

Each rule has one primary layer. Later layers may consume earlier results but
cannot maintain competing normative meaning.

Derived schemas use:

```text
contracts/nkf/0.7/schemas/
  bundle.schema.json   # urn:nkf:0.7:schema:bundle
  record.schema.json   # urn:nkf:0.7:schema:record
  validation-result.schema.json
                       # urn:nkf:0.7:schema:validation-result
  graph-baseline.schema.json
                       # urn:nkf:0.7:schema:graph-baseline
  freshness-receipt.schema.json
                       # urn:nkf:0.7:schema:freshness-receipt
  freshness-policy.schema.json
                       # urn:nkf:0.7:schema:freshness-policy
```

The `0.7` component is the one NKF version coordinate. Each schema carries
non-normative source metadata for `nkf_version`, exact Markdown path/digest,
and exact YAML path/digest. Release metadata carries the schema's own digest.
Exact schema bytes remain derived realization.

Release-package enforcement separately uses:

```text
contracts/nkf/0.7/schemas/release-manifest.schema.json
                       # urn:nkf:0.7:schema:release-manifest
```

That schema validates release metadata only. It is not a project declaration
schema, does not expand project Governed Validation Inputs, and is not
included in `validation_result.contract_artifacts.schemas`.

### Validation Phases

The project-root `.nourd/` invocation precondition is evaluated before
validation and is not a validation phase or conformance diagnostic. Only
after it passes, the checker executes:

1. `contracts` — verify exact Markdown/YAML/schema bindings;
2. `parse` — locate and safely parse manifest and declaration YAML;
3. `schema` — validate local bundle and record shapes;
4. `project` — validate `.nourd`, `knowledge_root`, paths, symlinks, files,
   declarations, and Markdown coverage;
5. `source` — verify Markdown bytes, digests, H1, title, and headings;
6. `extension-resolution` — validate catalogs/uses, safely resolve exact
   artifacts, verify identity/digests/support, and validate supported payloads;
7. `bundle-graph` — resolve Common and the selected concrete Root Profile,
   root identity, scope, permitted bodies, hierarchy, references, cycles, and
   bundle constraints;
8. `knowledge-graph` — resolve the complete record, document, and entity node
   universe, exact node and graph revisions, authored relationships, policy
   binding, generated inverses, stable paths, and completeness mechanics;
9. `record-contract` — validate body, role, responsibility, governance,
   provenance, entity, relationship, binding, and extension rules;
10. `freshness` — validate baseline and receipt bindings, calculate the
    requested purpose, impact closure, axes, complete result sets, Decision
    coverage, and readiness without treating semantic review as machine proof;
11. `security` — report high-confidence prohibited-material findings;
12. `authority-binding` — when requested and supported, verify declared
    governance against its acceptance authority without changing conformance;
    and
13. `result` — calculate conformance, knowledge readiness, and governing-use
    readiness and emit a
    deterministic report.

When an earlier failure makes a later phase unsafe or meaningless, the later
phase is `not-evaluated`, never `passed`. A required failed or not-evaluated
phase prevents the requested conformance level from passing.
`authority-binding` is optional; when absent it does not fail conformance but
prevents `governing-use: ready` when verified acceptance is required.

### Conformance Levels

- `structural` requires `contracts`, `parse`, `schema`, `project`, `source`,
  `bundle-graph`, `knowledge-graph`, `security`, and `extension-resolution` for the catalog,
  bundle uses, and any record extension needed to interpret structural fields.
- `contract` additionally requires `record-contract` and
  `extension-resolution` for every extension use on the requested record.
- `full-bundle` requires structural conformance plus `record-contract`,
  `freshness`, and `extension-resolution` for every governed record and
  document node. A valid noncurrent freshness result does not itself fail
  conformance; an explicitly requested readiness claim fails separately.

A high-confidence prohibited-secret finding fails the result; a passing scan
does not prove that no secret exists. Warnings do not fail native conformance.
A profile that makes a warning condition consequential defines a separate
profile error rule rather than changing native severity silently.

Consumers MUST fail closed for governing or consequential use when required
meaning cannot be understood, may provide clearly incomplete best-effort
display, identify incomplete validation, distinguish reconciliation from
semantic authoring, and never report acceptance from conformance.

Reconciliation may update deterministic values such as a source digest. It
cannot invent or change roles, authority, relationships, scope, entities,
bindings, external authority, or presentation meaning.

### Diagnostic Contract

Each diagnostic contains:

```yaml
rule_id: <stable identifier>
severity: error | warning
blocking: conformance | readiness | governing-use | none
phase: <validation phase>
message: <human-readable explanation>
artifact: <optional project-relative path>
record_id: <optional record ID>
node_id: <optional record, document, or entity node identity>
instance_pointer: <optional JSON Pointer>
source_section: <optional section ID>
remediation: <optional non-authoritative guidance>
```

Rule ID, severity, blocking effect, and semantic trigger are stable contract
behavior. Message and remediation text are not machine contracts.
Conformance-blocking errors fail applicable conformance; governing-use errors
block consequential use without changing conformance; readiness errors make
the requested readiness result `not-ready` and fail a command only when
`request.require_readiness` is true, without changing conformance; warnings are
non-blocking.

Optional fields are omitted rather than null. Artifact paths are exact
project-relative paths using `/`. Diagnostics sort by accepted phase, then
optional artifact, record ID, node ID, instance pointer, source section, and rule ID.
Absent optional values sort first; strings use the RFC 8785 unsigned UTF-16
comparator without normalization or case folding. Complete diagnostic
identities are unique. Diagnostics never imply acceptance and never contain a
secret or copied operational payload.

### Stable Native Rule Registry

Unless a table says otherwise, every listed error blocks conformance and every
warning is non-blocking.

| Contract, parse, and schema rule | Severity |
| --- | --- |
| `contract-set.unavailable` | error |
| `contract-set.binding-mismatch` | error |
| `schema.unavailable` | error |
| `schema.binding-mismatch` | error |
| `bundle.manifest.missing` | error |
| `yaml.utf8.invalid` | error |
| `yaml.document-count.invalid` | error |
| `yaml.root.invalid` | error |
| `yaml.key.duplicate` | error |
| `yaml.key.non-string` | error |
| `yaml.value.non-json` | error |
| `yaml.tag.unsupported` | error |
| `yaml.merge-key.unsupported` | error |
| `yaml.anchor.unsupported` | error |
| `yaml.alias.unsupported` | error |
| `yaml.parse.invalid` | error |
| `schema.bundle.invalid` | error |
| `schema.record.invalid` | error |
| `schema.graph-baseline.invalid` | error |
| `schema.freshness-receipt.invalid` | error |
| `schema.freshness-policy.invalid` | error |

| Project, path, source, and representation rule | Severity |
| --- | --- |
| `project.records-directory.missing` | error |
| `project.records-directory.invalid` | error |
| `knowledge.root.missing` | error |
| `knowledge.root.invalid` | error |
| `knowledge.root.outside-project` | error |
| `knowledge.root.inside-nourd` | error |
| `knowledge.topology.path.missing` | error |
| `knowledge.topology.representation.invalid` | error |
| `knowledge.topology.map.invalid` | error |
| `guidance.version.mismatch` | error |
| `knowledge.topology.map-target.invalid` | error |
| `knowledge.topology.lifecycle-index.invalid` | error |
| `knowledge.path.stability.invalid` | error |
| `knowledge.topology.index.invalid` | error |
| `knowledge.topology.generated-map.conflict` | error |
| `knowledge.topology.current-system.invalid` | error |
| `path.invalid` | error |
| `path.outside-root` | error |
| `path.file-kind.invalid` | error |
| `path.symlink.invalid` | error |
| `path.symlink.discouraged` | warning |
| `record.declaration.non-yaml` | error |
| `record.id.duplicate` | error |
| `record.source.missing` | error |
| `record.source.non-markdown` | error |
| `record.source.duplicate` | error |
| `record.source.digest-mismatch` | error |
| `markdown.utf8.invalid` | error |
| `markdown.frontmatter.invalid` | error |
| `markdown.frontmatter.required` | error |
| `markdown.frontmatter.key.missing` | error |
| `markdown.frontmatter.key.unsupported` | error |
| `markdown.frontmatter.value.invalid` | error |
| `markdown.frontmatter.created-at.invalid` | error |
| `markdown.frontmatter.record-mismatch` | error |
| `markdown.frontmatter.title-mismatch` | error |
| `markdown.body.identity-duplication` | error |
| `markdown.reference.deep-link.required` | error |
| `markdown.frontmatter.mutable-state-forbidden` | error |
| `markdown.frontmatter.legacy-lock.invalid` | error |
| `markdown.frontmatter.bootstrap-lock.invalid` | error |
| `task.applicability.missing` | error |
| `task.applicability.structure.invalid` | error |
| `task.applicability.value.unsupported` | error |
| `task.applicability.reference.unresolved` | error |
| `task.applicability.completion.blocked` | error |
| `markdown.frontmatter.reference.unresolved` | error |
| `markdown.h1-count.invalid` | error |
| `record.h1-count.invalid` | error |
| `record.title.mismatch` | error |
| `record.title.case-invalid` | error |
| `record.filename.nonconventional` | warning |
| `knowledge.markdown.unrepresented` | error |
| `knowledge.markdown.multiple-representations` | error |
| `non-record.missing` | error |
| `non-record.duplicate` | error |
| `non-record.conflict` | error |
| `artifact.id.duplicate` | error |
| `artifact.path.duplicate` | error |
| `artifact.path.invalid` | error |
| `artifact.missing` | error |
| `artifact.file-kind.invalid` | error |
| `artifact.digest-mismatch` | error |
| `artifact.record.unresolved` | error |
| `artifact.record.invalid` | error |
| `artifact.section.unresolved` | error |
| `artifact.profile.unsupported` | error |

| Knowledge graph and freshness rule | Severity | Blocking |
| --- | --- | --- |
| `document.id.duplicate` | error | conformance |
| `document.digest-mismatch` | error | conformance |
| `document.state.invalid` | error | conformance |
| `document.relationship.invalid` | error | conformance |
| `graph.node.unresolved` | error | conformance |
| `graph.node.duplicate` | error | conformance |
| `graph.relationship.duplicate` | error | conformance |
| `graph.relationship.inverse-authored` | error | conformance |
| `graph.relationship.section-unresolved` | error | conformance |
| `graph.relationship.authority-invalid` | error | conformance |
| `graph.relationship.endpoint-invalid` | error | conformance |
| `graph.relationship.cycle-invalid` | error | conformance |
| `graph.relationship.policy-unsupported` | error | conformance |
| `graph.policy.unavailable` | error | conformance |
| `graph.policy.binding-mismatch` | error | conformance |
| `graph.revision.mismatch` | error | conformance |
| `external-dependency.invalid` | error | conformance |
| `authority-input.invalid` | error | conformance |
| `freshness.baseline.missing` | error | readiness |
| `freshness.baseline.outdated` | error | readiness |
| `freshness.baseline.disputed` | error | readiness |
| `freshness.baseline.ambiguous` | error | readiness |
| `freshness.baseline.unsupported` | error | readiness |
| `freshness.baseline.coverage-incomplete` | error | readiness |
| `freshness.baseline.carry-precondition-violated` | error | conformance |
| `freshness.baseline.judgment-digest-mismatch` | error | conformance |
| `freshness.baseline.provenance-invalid` | error | conformance |
| `freshness.claim.delta-closure-not-contained` | error | readiness |
| `freshness.claim.delta-completeness-unprovable` | error | readiness |
| `freshness.claim.computed-closure-mismatch` | error | conformance |
| `freshness.reconciliation.pending` | error | readiness |
| `freshness.reconciliation.invalid` | error | conformance |
| `version-delta.unavailable` | error | conformance |
| `version-delta.binding-mismatch` | error | conformance |
| `version-delta.coverage-incomplete` | error | conformance |
| `version-delta.classification-invalid` | error | conformance |
| `record.identity-succession.invalid` | error | conformance |
| `record.identity-succession.chain-unresolved` | error | conformance |
| `record.identity.state-asserting` | error | conformance |
| `record.operational-dependency.invalid` | error | conformance |
| `paths.stable-path.state-asserting` | error | conformance |
| `project.knowledge-root-file.undeclared` | error | conformance |
| `bundle.provenance-attachment.invalid` | error | conformance |
| `freshness.observation.missing` | error | readiness |
| `freshness.decision.unclassified` | error | readiness |
| `freshness.decision.conflict` | error | readiness |
| `freshness.review.missing` | error | readiness |
| `freshness.receipt.binding-mismatch` | error | readiness |
| `freshness.result.noncurrent` | error | readiness |
| `freshness.policy.false-negative` | error | readiness |

| Sections, bodies, and governance rule | Severity |
| --- | --- |
| `section.id.duplicate` | error |
| `section.heading.unresolved` | error |
| `section.heading.duplicate-mapping` | error |
| `section.heading.unrepresented` | error |
| `section.heading.case-invalid` | error |
| `section.heading.hierarchy-invalid` | error |
| `canonical-term.core-conflict` | error |
| `section.authority.unsupported` | error |
| `section.role.unsupported` | error |
| `section.unresolved.authority-mismatch` | error |
| `section.content.responsibility-forbidden` | error |
| `body.unsupported` | error |
| `body.type-mismatch` | error |
| `body.responsibility.unsupported` | error |
| `body.responsibility.missing` | error |
| `governance.root.lifecycle` | error |
| `governance.decision.lifecycle` | error |
| `governance.specification.lifecycle` | error |
| `provenance.source-id.duplicate` | error |
| `provenance.observation-section.unresolved` | error |
| `evidence.provenance.missing` | error |
| `external-authority.id.duplicate` | error |
| `external-authority.section.unresolved` | error |

| Record relationship and bundle-graph rule | Severity |
| --- | --- |
| `relationship.type.unsupported` | error |
| `relationship.target.unresolved` | error |
| `relationship.section.unresolved` | error |
| `relationship.duplicate` | error |
| `profile.unsupported` | error |
| `profile.common.not-selectable` | error |
| `profile.record.unsupported` | error |
| `profile.specification.missing` | error |
| `bundle.root.missing` | error |
| `bundle.root.multiple` | error |
| `bundle.root.invalid` | error |
| `request.record.unresolved` | error |
| `scope.root.mismatch` | error |
| `hierarchy.product-parent.invalid` | error |
| `hierarchy.domain-parent.invalid` | error |
| `hierarchy.capability-parent.invalid` | error |
| `hierarchy.part-of.cycle` | error |
| `hierarchy.root-unreachable` | error |
| `hierarchy.participation.unsupported` | error |

| Entity and binding rule | Severity |
| --- | --- |
| `entity.id.duplicate` | error |
| `entity.kind.unsupported` | error |
| `entity.section.unresolved` | error |
| `entity-reference.record.unresolved` | error |
| `entity-reference.entity.unresolved` | error |
| `entity-relationship.type.unsupported` | error |
| `entity-relationship.section.unresolved` | error |
| `entity-relationship.source-owner.invalid` | error |
| `entity-relationship.self` | error |
| `entity-relationship.duplicate` | error |
| `entity-relationship.part-of.cycle` | error |
| `entity-relationship.type-constraint` | error |
| `binding.kind.unsupported` | error |
| `binding.entity.unresolved` | error |
| `binding.realization.unresolved` | error |
| `binding.realization-owner.invalid` | error |
| `binding.section.unresolved` | error |
| `binding.external-authority.unresolved` | error |
| `binding.locator.missing` | error |
| `binding.duplicate` | error |
| `binding.provider-authority.missing` | error |

| Extension, security, and authority rule | Severity | Blocking |
| --- | --- | --- |
| `extension.catalog-id.duplicate` | error | conformance |
| `extension.use-id.duplicate` | error | conformance |
| `extension.required.contract-unresolved` | error | conformance |
| `extension.required.contract-digest-mismatch` | error | conformance |
| `extension.required.contract-identity-mismatch` | error | conformance |
| `extension.required.unsupported` | error | conformance |
| `extension.payload.invalid` | error | conformance when supported |
| `extension.core-conflict` | error | conformance |
| `extension.optional.unvalidated` | warning | none |
| `security.secret-pattern` | error | conformance |
| `authority.binding.unavailable` | warning | none |
| `authority.binding.contradicted` | error | governing-use |

An unsupported optional extension emits only
`extension.optional.unvalidated` and remains visible, round-trippable, and
excluded from consequential interpretation.

### Validation Result

Failure of the project-root `.nourd/` invocation precondition produces no
validation result. After that precondition passes, the checker emits one
closed UTF-8 JSON `nkf.validation-result` object with `nkf_version: "0.7"`.
Unknown fields, comments, duplicate keys, byte-order marks, and non-JSON
values are invalid. Member order and insignificant whitespace carry no
meaning.

The object contains exactly seventeen required fields:

```text
contract, nkf_version, execution, checker, contract_artifacts, request,
bundle_id, profile, validated_snapshot, phases, conformance, knowledge_graph,
nodes, records, readiness, governing_use, diagnostics
```

`execution` contains a lowercase UUID, portable runner identity, and
fixed-millisecond UTC RFC 3339 start and completion times. Completion cannot
precede start. `checker` contains a portable artifact identity and SHA-256
digest.

`contract_artifacts` binds expected and observed SHA-256 digests for the
canonical Markdown, executable YAML, exact freshness policy, and exactly the
bundle, record, graph-baseline, freshness-receipt, freshness-policy, and
validation-result schemas in that order. Every involved extension contributes
its Markdown and executable artifact bindings in exact extension-ID order.
Binding is `verified`, `unavailable`, or `mismatched`; no artifact content or
absolute location is copied into the result.

The request object contains:

```json
{
  "level": "full-bundle",
  "record_id": null,
  "acceptance_binding": "requested",
  "purpose": "whole-root-readiness",
  "require_readiness": true,
  "changed_inputs": [],
  "targets": [],
  "observations": [],
  "evaluation_time": null,
  "historical_receipt": null
}
```

`structural` requires a null record and no acceptance-binding request.
`contract` requires one record ID. `full-bundle` requires a null record.
`purpose` is null or one closed freshness purpose. `require_readiness` may be
true only with a purpose and makes non-ready status fail the command without
changing conformance. `changed_inputs` is sorted and duplicate-free and may
name a node, normalized authored edge, governed artifact,
external-dependency or authority-input declaration, external observation, or authority
observation. It is required and non-empty for `change-impact`; otherwise it is
present and may be empty. `targets` is a
sorted duplicate-free node-reference list, required and non-empty for
`consequential-use`, optional and empty for the other current purposes, and
replaced by the selected receipt universe for `historical-reproduction`.
The request additionally carries `observations`, a sorted duplicate-free list
of closed external or authority observations; nullable `evaluation_time`; and
nullable `historical_receipt`. An observation contains exact ID, kind,
subject, observed revision, and fixed-millisecond UTC observation time.
`evaluation_time` is non-null exactly when an applicable expiry needs it.
`historical_receipt` is non-null exactly for `historical-reproduction` and
selects one immutable receipt by ID. Missing required values yield `unknown`;
an unexpected value makes the request invalid.
A structurally valid `contract` request whose record ID does not resolve to
exactly one uniquely identified governed record emits
`request.record.unresolved`, fails conformance, and contributes no invented
record result or artifact.
Structural and contract results are transient. Only a completed full-bundle
result atomically replaces `.nourd/validation-result.json`, whether it passes
or fails. NKF Core stores no local result history.

`profile` contains nullable `identity` and `binding`. A uniquely resolved
supported Product or Technology profile reports its exact identity and
`verified`. A syntactically available but unsupported or non-selectable
identity reports that identity and `unsupported`. A missing, ambiguous, or
unevaluated profile reports null and `not-evaluated`. Profile binding reports
only resolution against the exact executable companion already represented by
`contract_artifacts`; it does not duplicate artifacts or imply acceptance.

**Governed Validation Inputs** are the exact project resources whose observed
state participates in the requested validation. NKF Core defines the initial
set; accepted extensions may add resource kinds. A checker cannot add inputs
ad hoc. Each input contributes only structural facts, exact bytes, or both as
required by applicable accepted rules.

NKF Core inputs are the fixed `.nourd` path observations, manifest and direct
record-declaration candidates, every recursively discovered Markdown file
under `knowledge_root`, every explicitly listed `non_records` file, and every
Technology `governed_artifacts` file. The graph baseline and every receipt or
observation explicitly selected by the request also participate. Required accepted extension artifacts
and resources governed by a supported extension also participate. Unlisted
non-Markdown knowledge assets do not participate unless an accepted rule or
extension makes them governed inputs.

The checker represents those inputs internally as closed
`nkf.validation-snapshot` JSON with `nkf_version: "0.7"` and one entry per
logical project path. Each entry contains exact project-relative `path`,
`direct_kind`, `resolution`, nullable `resolved_path`, nullable `final_kind`,
and nullable `content_sha256`. Multiple selectors merge. Entries sort by exact
path using the RFC 8785 unsigned UTF-16 comparator without normalization or
case folding. RFC 8785 JCS canonicalizes the UTF-8 inventory, and SHA-256
produces the stored snapshot value. The result stores only algorithm,
`rfc8785-jcs`, digest, and entry count—not the inventory.

All thirteen accepted phases appear exactly once in accepted order with
`passed`, `failed`, or `not-evaluated`. An emitted valid result always has a
passed `result` phase. Failure to construct a valid result produces no
completed result; a completed conformance failure still produces a valid
result.

`knowledge_graph` contains the exact policy binding, nullable candidate graph
revision, nullable baseline graph revision, baseline state `confirmed`, `missing`,
`outdated`, `disputed`, `ambiguous`, `unsupported`, or `not-evaluated`, node
and authored-edge counts, and
projection counts. It contains no canonical Markdown or review prose.

When an earlier failed phase prevents knowledge-graph evaluation, the
candidate and baseline graph revisions are null, baseline state is
`not-evaluated`, all three counts and all three projection counts are zero,
`nodes` is empty, and top-level readiness is `not-evaluated` with both graph
revisions null and empty blocker arrays. The policy identity, digest, and
observed binding are still reported from the already evaluated contract
artifacts. This is a valid completed conformance failure; it does not invent an
empty graph or claim that graph evaluation passed.

Each graph node appears once in stable node-reference order in `nodes`. Its
closed result contains node identity, exact node revision, applicability,
participation role, authority eligibility and binding, complete freshness
result set and reasons, conformance, impact-selection flag, and sorted reason
paths. Entity ordering is by record ID then entity ID; other kinds sort by
kind then ID using the RFC 8785 comparator. A conformant non-applicable node
uses an empty freshness result set rather than inventing currentness.

Each in-scope record appears once in exact record-ID order with its nullable
valid declared governance, level-relative conformance, acceptance binding, and
governing-use state. Acceptance binding is `not-applicable`, `not-verified`,
`verified`, or `contradicted`. Governing use is `ready`, `not-ready`, or
`not-evaluated`.

The records array contains every uniquely identified in-scope record for
`structural`, only the uniquely resolved requested record for `contract`, and
every uniquely identified governed record for `full-bundle`. An ambiguous or
duplicate identity contributes no invented or merged record result.

Draft, superseded, and retired records are not applicable and not ready.
Accepted records without verified binding are not verified and not evaluated.
A contradicted record or any conformance/governing-use blocker is not ready.
Only an accepted, binding-verified, conforming, unblocked record is ready. A
full bundle is ready only when every applicable record is ready; any
not-ready record makes it not ready, otherwise an unevaluated record makes it
not evaluated.

Top-level `readiness` contains the requested nullable purpose, state `ready`,
`not-ready`, or `not-evaluated`, exact baseline and candidate graph revisions,
complete sorted blocking node references, and complete sorted blocking rule
IDs. It is `ready` only when the baseline is confirmed for the candidate graph
revision, every applicable node is current, every applicable Decision is
reconciled without unresolved conflict, and every required observation and
review is bound. For `historical-reproduction`, `ready` instead requires the
selected historical receipt, policy, evaluator, universe, and every preserved
input to bind and reproduce exactly; it does not require a current confirmed
baseline. Readiness never implies acceptance, conformance, authority
binding, or confirmed Realization.

Top-level Governing Use Ready is always `not-evaluated` for `structural`; is
the unique target record's result for `contract`, or `not-ready` when that
target is missing or ambiguous; and is the aggregate above for `full-bundle`.

Diagnostics use the accepted closed shape and deterministic order. Optional
fields are omitted rather than null. Complete diagnostic identities are
unique. Message and remediation wording are non-contractual.

`NKF Verified` means current full-bundle conformance only. `NKF Ready` means
the separately reported requested knowledge-readiness purpose is ready. A
passing receipt
remains current only while its Governed Validation Inputs still produce the
snapshot, its core artifact bindings match the current accepted NKF 0.7
revision, its recorded profile identity still matches the bundle-selected
supported profile, and its checker remains recognized and supported for that
revision. Otherwise it is historical evidence with status **verification
outdated**.

Normal acceptance changes alter governed inputs through the governed change
process. NKF 0.7 does not infer a hidden acceptance change, poll an authority,
or impose context-free universal expiry. Separate authority freshness remains
future governed work outside this version.

The result is operational state outside `knowledge_root`, excluded from its
own snapshot, and ordinarily uncommitted. It excludes usernames, hostnames,
absolute paths, credentials, secrets, and copied operational payloads.
Conformance, knowledge readiness, acceptance binding, Governing Use Ready,
semantic adequacy, and confirmed Realization remain distinct.

No deterministic layer establishes semantic role accuracy, adequate or true
Markdown, evidence support, deserved acceptance, current external authority,
Design quality, or Realization existence and behavior. Those require human
review and, where applicable, external Evidence.

## Deterministic Governed Mechanics And Prepublication Proof

Deterministic mechanics may implement accepted meaning but never invent it.
Every mutating NKF command MUST operate on an owned staged project snapshot,
MUST resolve every requested subject before changing the live project, MUST
validate its exact postconditions, and MUST replace live targets only after the
complete transaction succeeds. Failure restores the full pre-operation owned
snapshot and reports the actual completed and incomplete stages. A successful
filesystem write does not prove semantic truth, acceptance, Realization,
release readiness, licensing rights, or external authority.

For native YAML declarations, a scalar mutation MUST:

1. strict-parse the exact UTF-8 YAML 1.2 source and retain concrete source
   ranges for every mapping key and scalar value;
2. resolve one exact closed contract path and reject an absent, duplicate,
   aliased, tagged, merged, non-scalar, or ambiguously represented target;
3. serialize the replacement as one plain or quoted YAML scalar whose parsed
   value is exactly the requested value;
4. replace only the target scalar's exact byte range, preserving every other
   byte, key order, comment, quote choice, and line ending;
5. reparse the result, prove the target's exact new value and the byte identity
   of all content outside the replacement range, then run every applicable
   declaration and project postcondition before commit; and
6. fail without mutation when any proof is unavailable.

Regex adjacency, textual key-order assumptions, and whole-document YAML
reserialization are forbidden for governed scalar mutation. A command MAY
return a truthful no-change result only when every requested target already
matched its required observed value before staging. If any target was stale,
success requires an exact positive changed-subject count and current
postcondition for that same subject. A command MUST NOT turn a failed match or
unsupported subject into a successful zero count.

The native command-and-subject matrix is closed. For each entry the executable
companion fixes the mutation owner, required semantic input, complete subject
set, postconditions, success and no-change results, and failure result:

| Operation | Required Subjects And Postconditions |
| --- | --- |
| `repin` | Every selected record source, represented document source, and governed artifact; each stale digest becomes the SHA-256 of the exact current bytes and every unchanged digest was already current. |
| `linkify` | Selected mutable record or document Markdown plus every declaration digest affected by the exact changed Markdown; immutable sources are rejected and all introduced same-bundle links resolve. |
| Task transition | One exact Task document, its declared state, required Completion or Cancellation Result, generated state navigation, affected source digests, and governed references; dirty or unsupported Git orchestration remains a separate truthful operational result. |
| `refs` | The exact declared node and relationship universe; output is read-only, complete for the selected bundle, deterministic, and never mutates declarations. |
| `set` | The exact versioned release-set coverage and members; output is read-only and byte-identical to the accepted release-set authority. |
| `review --scaffold` | The exact pending claim, candidate graph, predecessor baseline, policy, and accepted version-delta declaration; output is one review-input skeleton whose carried judgments are prefilled and marked with exact provenance and whose computed required set is emitted with empty judgment fields; it never supplies a state, role, classification, finding, claim, or dispute value and never mutates the project. |
| `record --scaffold` | One exact Markdown source; output is one declaration skeleton with exact digests, section heading paths, and empty semantic fields; it never supplies governance, relationships, authority, or lifecycle values and never mutates the project. |
| Identity succession | One exact living record, its accepted successor identifier, and every affected declaration, baseline, navigation, and link binding; the predecessor identifier remains resolvable history, the succession is recorded with provenance, and immutable record bytes never change. |
| Freshness evaluation | The exact evaluation request, candidate graph, reviewed baseline, policy, purpose, targets, changed inputs, observations, receipt, and validation result; persistence follows the accepted receipt and result transaction and never invents semantic review. |
| Reviewed baseline seal | One exact reviewer-completed whole-root or delta input and matching candidate graph; a delta input additionally proves computed-closure containment and exact carry preconditions per judgment; it replaces only the graph baseline after exact coverage, basis and node digests, Decision reconciliation, observation, limitation, and dispute validation. |
| `Adopt` | Ordinary modes cover the version declaration, release pin, installed checker and adopter, host integration, migrated declarations, graph and baseline inputs, and complete producer or consumer gate. Breaking 0.6-to-0.7 migration additionally consumes repository-owner approval, applies the one deliberate stable-path neutralization and each accepted identity succession exactly once, classifies provenance attachments, converts the baseline with computed per-judgment carry-forward under the accepted version-delta declaration, and consumes the exact completed review of the computed required set. An out-of-window predecessor fails closed naming the exact stepping-stone archive. The producer-promotion mode additionally consumes the exact accepted promotion input and accepting Decision, removes the exact candidate Evidence representation, creates the exact supplied native declaration, regenerates navigation, writes the promotion-reconciliation entries, and seals the exact post-promotion graph from the separately completed whole-root review at either authorized producer stage. Rollback covers every project-owned mutation; repeat after promotion returns `current`. |
| Release verification | The archive, manifest, release set, authority, policy, Schemas, checker, adopter, license, NOTICE, third-party notices, and optional source provenance; it is read-only and invokes the checker only after the complete distribution verifies. |

Ordinary authoring also includes editing and re-pinning the current-system
Realization, adding and removing represented records and documents through the
accepted topology, changing governed-artifact bytes and pins, exercising
freshness invalidation and resealing, and injecting failures after staged
writes. The matrix test suite MUST permute valid sibling-key order around every
mutated scalar and MUST cover idempotence, rollback, unsupported kinds,
missing targets, mismatched preconditions, archive tampering, pin tampering,
and stale-digest reporting.

Before technical confirmation or publication, the exact candidate archive
MUST Adopt into an isolated copy of the exact candidate source repository.
That candidate-bound Adopt is not an ordinary published adoption. It MUST be
repeated to prove `current`, after which the adopted isolated producer MUST
complete every applicable ordinary-authoring matrix cell above, the complete
producer gate, two byte-identical builds, two byte-identical archives, exact
release-set and notice verification, rollback and tamper exercises, and a
fresh independent audit. The exercise MUST bind the exact source commit,
authority bytes, policy, Schemas, release set, checker, adopter, archive,
license, NOTICE, third-party notices, and resulting project snapshot.

Any candidate source, authority, implementation, license, notice, release-set,
or archive byte change invalidates the prior exercise, audit, and technical
confirmation. After the clean fresh independent audit and before publication,
one technical-confirmation Decision MUST be authored as a post-audit,
outside-the-archive governance record that binds the exact release commit,
archive digest, checker and adopter digests, and the exact audit evidence.
This Decision is mandatory for every release, is invalid without its bound
audit, and — because review binding excludes post-audit governance records by
contract — its authoring invalidates neither the sealed review nor the exact
candidate bytes. Publication without it is a protocol violation, not an
exception. A separately authorized publication may publish only the exact
audited and confirmed candidate bytes. Ordinary producer Adopt after publication remains
required to prove public recommendation, acquisition, immutable byte identity,
and installed current state before merge, but it MUST NOT be the first
functional exercise of the release.

## Release Distribution

NKF 0.7 uses one content-addressed archive attached to a Github Release in
`NourdApS/Nourd.NKF` as its native checker distribution. The archive
is release metadata and tooling, not governed knowledge, a project declaration,
an acceptance record, or a conformance result.

The release, tag, asset name, source commit, archive digest, checker digest,
and schema digests are distribution, provenance, or integrity identities.
They are not NKF versions. `nkf_version: "0.7"` remains the only format
version.

### Release Manifest

The archive contains exactly one UTF-8 JSON `release-manifest.json` and one
UTF-8 YAML `contracts/nkf/0.7/release-set.yaml`. The release manifest has
contract identity `nkf.release-manifest` and `nkf_version: "0.7"`; the release
set has contract identity `nkf.release-set` and the same version.

The manifest is one closed JSON object with exactly ten required top-level
fields in this logical shape:

```text
contract, nkf_version, source, checker, authority, freshness_policy, version_delta, schemas, licensing, files
```

`source` contains exactly the NKF repository and the
40-lowercase-hexadecimal Git commit from whose clean checkout the release is
built. The checker is built reproducibly from that same commit.

`checker` contains identity `nourd-nkf-checker`, exact relative path
`dist/nourd-nkf-checker.mjs`, its SHA-256 digest, and runtime name `node` with
minimum major version `22`.

`authority` fixes precedence to `normative-markdown` and binds:

- `knowledge/specifications/nkf-0.7.md`; and
- `contracts/nkf/0.7/nkf.yaml`.

`freshness_policy` binds identity `nkf.freshness-policy.0.7`, exact path
`contracts/nkf/0.7/freshness-policy.yaml`, and its SHA-256 digest.

`version_delta` binds contract `nkf.version-delta`, exact path
`contracts/nkf/0.7/version-delta.yaml`, and its SHA-256 digest.

`schemas` contains exactly seven entries in exact identity order:

1. `urn:nkf:0.7:schema:bundle`;
2. `urn:nkf:0.7:schema:record`;
3. `urn:nkf:0.7:schema:graph-baseline`;
4. `urn:nkf:0.7:schema:freshness-receipt`;
5. `urn:nkf:0.7:schema:freshness-policy`;
6. `urn:nkf:0.7:schema:release-manifest`; and
7. `urn:nkf:0.7:schema:validation-result`.

`licensing` is one closed object with exactly `spdx`, `license`, `notice`, and
`third_party_notices`. `spdx` is `Apache-2.0`. Each artifact entry contains
its fixed release-root path and exact SHA-256 digest. `license` binds
`LICENSE`, whose bytes MUST equal the standard unmodified Apache License 2.0
text. `notice` binds `NOTICE`, whose bytes MUST equal the exact
Human-Product-Owner-confirmed informational attribution and MUST add no
restriction. `third_party_notices` binds `THIRD_PARTY_NOTICES.md`, regenerated
from and verified against the exact checker and adopter build-input graphs.
Every bundled third-party code or data component MUST retain its applicable
copyright, permission, attribution, and disclaimer terms. The licensing object
reports distribution artifacts; it cannot prove Company title or change a
third party's license.

`files` contains every archive member except `release-manifest.json`, in the
exact order declared by `release-set.yaml`. Each closed entry contains its
exact relative `path`, string `mode` (`0644` or `0755`), and SHA-256 `digest`.
The manifest's checker, authority, freshness-policy, version-delta, schemas,
and licensing bindings repeat identities for their special roles but MUST
resolve to the same path and digest in `files`.
All manifest objects are closed and all their fields are required.

The manifest uses two-space indentation, LF line endings, one final LF, no
byte-order mark, no trailing whitespace, top-level and nested object members
in contract order, and schema entries in exact identity order. Member order
does not change its logical meaning but is fixed for reproducible release
bytes.

The manifest omits its own digest, the containing archive digest, asset name,
tag, release URL, publication time, latest status, mutable Github state, audit
Evidence, technical confirmation, and publication authorization. The archive
digest binds the manifest; the manifest binds every other distributed file,
including the exact release-set enumeration. Governance records created after
an exact candidate is audited MAY bind its release commit, archive digest, and
checker digest, but they remain outside the archive and cannot change its
bytes. This avoids both a digest cycle and a post-audit confirmation cycle.

### Release Set

`contracts/nkf/0.7/release-set.yaml` is the sole exact coverage, membership,
class, and mode enumeration for the NKF 0.7 complete set. It is a closed YAML
object with exactly `contract`, `nkf_version`, `coverage`, and `members`.

`coverage` is a non-empty array of closed selectors containing exactly
`class`, `selection`, and `path`, ordered first by the exact closed class order
stated below and then by exact ASCII `path` within each class. `selection` is `exact-file`,
`recursive-regular-files`, or `generated-release-manifest`. Selector paths are
unique, safe relative paths and MUST NOT overlap. An `exact-file` selects one
existing regular file from the clean built source. A
`recursive-regular-files` selector selects every regular file recursively
beneath one existing non-empty source directory, without selecting the
directory itself. The sole generated selector is fixed to
`release-manifest.json`. Links, devices, unsafe paths, empty recursive
selections, and a file matched by multiple selectors are forbidden.

The closed class vocabulary requires exactly: normative Specification,
executable companion, evaluation policy, version-delta declaration,
repository license, repository
NOTICE, third-party notices, release-set contract, release manifest, derived
Schemas, checker, adopter, authoring protocol, onboarding protocol, release
protocol, adoption protocol, portable skills, registered host-adapter
instruction content, valid Product fixtures, valid Technology fixtures,
public Product examples, public Technology examples, and public documentation
projection.
Every required class has at least one selector and one resulting member.

`members` is a non-empty array containing exactly the union produced by
`coverage` after deterministic builds. Each closed entry contains exactly its
`path`, `class`, and string `mode`. Entries are ordered by exact ASCII path and
have unique, safe relative paths, including `release-set.yaml` itself and
`release-manifest.json`. Mode is `0755` only for
`dist/nourd-nkf-checker.mjs`; every other member is `0644`. Construction and
source-provenance verification MUST reproduce the exact coverage union from
the clean release commit. Extraction-only verification treats the
content-addressed `release-set.yaml` as the exact membership authority and
still verifies class presence, modes, archive membership, and manifest
bindings. A release omitting a required class or a source-selected member is
invalid even when the remaining archive is internally consistent.

Archive construction, manifest construction, release verification, the
internal exact-candidate Adopt path, public Adopt, the deterministic `set`
operation, and public-documentation verification MUST all consume the same
exact `release-set.yaml`. Its coverage selectors are deterministic discovery
rules, not a second membership list; `members` is the sole exact member
enumeration. No consumer may carry another hand-maintained membership list.
The manifest `files` entries provide exact digest bindings for every
pre-manifest member; `release-manifest.json` is the sole member omitted from
its own `files` array.

### Release Manifest Schema

Release package enforcement uses:

```text
contracts/nkf/0.7/schemas/release-manifest.schema.json
  # urn:nkf:0.7:schema:release-manifest
```

The schema is derived from this Markdown and the executable YAML companion.
Its own digest is carried by the release manifest.

The release-manifest schema validates release metadata only. It is not a
project declaration schema, does not expand project Governed Validation
Inputs, and is not included in
`validation_result.contract_artifacts.schemas`. The project checker continues
to bind exactly the six project schemas enumerated by the Validation Result
contract in that result.

### Deterministic Archive

The Github Release contains exactly one uploaded NKF distribution asset whose
name matches:

```text
^nourd-nkf-sha256-[0-9a-f]{64}\.tar$
```

The embedded digest equals the SHA-256 of the exact archive bytes. A trusted
consumer pin stores that full digest independently from the downloaded
filename or release locator. Github-generated source archives are not NKF
distribution assets or supported consumer coordinates.

The archive uses uncompressed USTAR and contains exactly the regular-file
members and modes declared by `contracts/nkf/0.7/release-set.yaml` under stable
root `nourd-nkf/`, in that contract's exact ASCII-byte path order. Every
archive path is relative to `nourd-nkf/`. There are no explicit directory
entries. Symlinks, hard links, devices, absolute paths, traversal, duplicate
paths, case-colliding paths, missing members, and unexpected members are
forbidden.

USTAR paths use the name field only and an empty prefix field. Headers use
magic bytes `75 73 74 61 72 00`, version bytes `30 30`, standard zero-padded
ASCII-octal numeric encoding,
modification time `0`, numeric user and group `0`, empty user, group, and link
names, mode `0755` for the checker, and mode `0644` for every other file.
Every entry uses the regular-file type flag, zero device major and minor
values, exact derived file size and header checksum, and zero-filled content
padding. The archive ends immediately after two final zero blocks. Base-256
numbers, PAX extensions, and trailing bytes are forbidden. The archive is not
compressed, avoiding compressor-version variance in its content address.

An archive is valid only when it is constructed from the manifest's clean
`release_commit`, every accepted artifact digest matches, the checker built
twice from that commit is byte-identical, the official license and exact
NOTICE bytes match, the third-party notice set exactly covers the checker and
adopter build-input graphs, the manifest is valid, and two independent archive
assemblies have identical SHA-256 digests. Any mismatch, missing attribution,
or unexpected entry invalidates the archive.

### Consumer Pin And Verification

A consumer stores the exact repository and expected full archive SHA-256 in
its dependency or tooling configuration. The tag and asset name are derived
from that digest. A cached durable locator is transport metadata and not an
additional trust anchor. The pin is not a `bundle.yaml` field because checker
selection and installation are operational dependency state. A completed NKF
validation result separately records the exact checker identity and digest
that actually performed validation.

Before invoking the checker, consumer tooling:

1. verifies the downloaded archive against the independently stored full
   SHA-256;
2. rejects an unsafe format, path, link, entry, mode, or metadata value;
3. strictly parses the fixed-path manifest and verifies its bootstrap
   contract, version, and release-manifest-schema entry;
4. verifies the fixed-path release-manifest schema digest;
5. compiles that schema and validates the closed release manifest;
6. verifies `release-set.yaml`, exact archive membership and modes, and every
   manifest `files` path and digest;
7. verifies the manifest licensing bindings, exact license and NOTICE bytes,
   and exact third-party notice artifact digest;
8. verifies that `release_commit` exists in the declared repository and
   reproducibly yields the manifest-bound checker when source provenance is
   evaluated;
9. rejects any missing or unexpected archive file; and
10. invokes the checker only from the verified distribution root.

Release verification failure is an execution-level tooling failure. It
produces no project conformance result and cannot be reported as NKF Verified.

### Github Release

The tag matches:

```text
^release-sha256-[0-9a-f]{64}$
```

Its digest component equals the archive SHA-256, and the tag targets the
manifest's exact `release_commit`. It is a lightweight tag; an annotated tag
and its additional tag-object metadata are not used. The tag, release name,
asset URL, and Github user interface remain locators; the independently stored
full archive digest is the consumer trust anchor.

The release is prepared as a draft and published as a prerelease because NKF
0.7 is pre-stable. Before publication, release automation downloads the
uploaded asset and repeats the archive, manifest, artifact, licensing,
third-party notice, checker-help, and source-commit checks. Immutable Github
Releases SHOULD be used when supported.
Artifact attestations MAY add provenance but do not replace the archive
digest.

Public distribution remains unresolved. Repository visibility or access
control does not alter the NKF 0.7 format.

## Security And Privacy

NKF bundles are durable, reviewable governed knowledge and may be distributed.
A bundle MUST NOT contain live credentials, access tokens, private keys, or
secrets.

Sensitive governed knowledge MAY require a restricted bundle or access policy,
but NKF 0.7 does not define that policy. A consumer MUST NOT hide missing
governing knowledge and then present the remaining view as complete.

Provenance, Producers, Verifiers, acceptance authorities, external
authorities, locators, observations, and Evidence may contain personal or
commercially sensitive information. Profiles and implementations MUST apply
applicable minimization, access, retention, and disclosure requirements
without changing the canonical authority model.

A locator MUST NOT be dereferenced automatically when doing so could disclose
information, trigger an operation, incur cost, or cross an authorization
boundary.

### Native Secret Pattern Registry

The security phase scans the exact safely readable UTF-8 bytes of
`.nourd/knowledge/bundle.yaml`, every direct `.yaml` declaration candidate,
and every recursively discovered Markdown file under `knowledge_root`. These
bytes are Governed Validation Inputs. Unsafe paths are never followed.

Native matching is case-sensitive over ASCII bytes and contains exactly:

1. a complete private-key block with the same exact header/footer label from
   `PRIVATE KEY`, `RSA PRIVATE KEY`, `EC PRIVATE KEY`, `DSA PRIVATE KEY`,
   `OPENSSH PRIVATE KEY`, or `ENCRYPTED PRIVATE KEY`, and at least 64
   Base64-alphabet bytes between them after removing ASCII space, tab, carriage
   return, and line feed;
2. `ghp_`, `gho_`, `ghu_`, `ghs_`, or `ghr_` followed by at least 36 ASCII
   alphanumeric bytes at a boundary outside ASCII alphanumeric plus `_`; and
3. longest-prefix-first `sk-proj-` or `sk-` followed by at least 20 ASCII
   alphanumeric, `_`, or `-` bytes at a boundary outside that same alphabet.

There is no contextual exemption for code, comments, examples, fixtures, or
quoted text, and no inline waiver or allowlist. Nonmatching placeholders such
as `ghp_<REDACTED>`, `sk-...`, `${TOKEN}`, and `<SECRET>` remain safe. An AWS
access-key identifier alone, generic password-looking text, JWT, hash, digest,
Base64 string, entropy finding, or provider token outside the registry does
not trigger native conformance.

One or more matches emit exactly one `security.secret-pattern` error per
logical artifact. The diagnostic never contains the match, surrounding
source, or copied payload. Any finding fails conformance. A pass means only
that the exact registry found no match.

Supplemental scanners remain outside native results and conformance unless an
accepted extension defines namespaced behavior. Any change to the native scan
scope, registry, contexts, exclusions, cardinality, or blocking effect follows
the governed pre-stable change process and requires updated authority,
fixtures, checker behavior, release, and consumer migration.

## Unresolved Matters

The following remain deliberately unresolved in NKF 0.7:

- universal context-free validation expiry and separate authority freshness;
- cross-repository graph traversal, resolver operation, and credentials;
- receipt signing, remote attestation, long-term retention, and privacy policy;
- policy refinement that safely distinguishes more `hard` consequences from
  conservative `review` propagation using governed consumer evidence;
- required repository and continuous-integration gates;
- migration from current `nourd.knowledge.*` bootstrap contracts;
- cross-bundle semantic identity and relationships;
- Company and Organization knowledge contracts;
- additional Root Profiles beyond Product and Technology;
- public governance, contribution process, trademark position, Company-side
  rights evidence, and public distribution policy;
- an NKF extension registry and compatibility policy;
- a future NKP runtime protocol;
- standardized acceptance-event storage; and
- attested-computation profiles;
- the future optional presentation-guidance extension.

These omissions MUST be visible to consumers. A profile MAY resolve one for
its own scope, but MUST identify the extension and MUST NOT claim that the
profile decision is part of NKF 0.7 core.

## Minimal Example

A logical NKF 0.7 manifest:

```yaml
nkf_version: "0.7"
contract: nkf.bundle
id: example-product
root:
  record: product
  profile: nkf.profile.product
knowledge_root: knowledge
knowledge_graph:
  policy: nkf.freshness-policy.0.7
  baseline: .nourd/knowledge/freshness/baseline.yaml
non_records:
  - path: README.md
    kind: navigation
```

A minimal Product Markdown source:

```markdown
---
title: Example Product
summary: A minimal Draft Product used to demonstrate the native source envelope.
created_at: 2026-08-13T10:00:00Z
id: product
type: product
---

# Example Product

## Product Definition

Example Product is a Product of Example Company.

## Purpose

It helps its people achieve a clearly defined outcome.

## Vision

The Product becomes their durable companion for that outcome.

## People Served

It serves the people who experience the stated need.

## Needs And Outcomes

It improves the decisions and results within its boundary.

## Boundaries

It does not own external accounts, permissions, or operations.

## Product Map

Its Domains and Capabilities are defined by related NKF records.
```

Its declaration:

```yaml
contract: nkf.record
id: product
type: product
body_contract: nkf.product
title: Example Product
source:
  path: product.md
  stable_path: product.md
  digest:
    algorithm: sha-256
    value: <digest-of-exact-markdown-bytes>
governance:
  lifecycle: living
  status: draft
  authority:
    - human-product-owner
scope:
  root: product
sections:
  - id: product-definition
    heading_path: [Product Definition]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities: [product-definition]
  - id: purpose
    heading_path: [Purpose]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities: [purpose]
  - id: vision
    heading_path: [Vision]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities: [vision]
  - id: people-served
    heading_path: [People Served]
    occurrence: 1
    authority: proposal
    role: boundary
    responsibilities: [people-served]
  - id: needs-and-outcomes
    heading_path: [Needs And Outcomes]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities: [needs-and-outcomes]
  - id: boundaries
    heading_path: [Boundaries]
    occurrence: 1
    authority: proposal
    role: boundary
    responsibilities: [boundaries]
  - id: product-map
    heading_path: [Product Map]
    occurrence: 1
    authority: proposal
    role: catalogue
    responsibilities: [product-map]
relationships: []
```

The omitted portable topology entries and the baseline file remain required in
a conformant project. The baseline cannot be fabricated from this example: a
named reviewer must semantically review the complete actual candidate graph
and bind its exact computed revision.

Derived schemas enforce the exact native serialization. They cannot add
fields, responsibilities, or meaning. A supported extension supplies its own
separately governed executable contract.

## Pre-Mortem

| Failure mode | Consequence | Required response |
| --- | --- | --- |
| NKF attempts to model every kind of knowledge immediately | The version becomes unusable and untestable | Keep 0.7 limited to evidence-backed Product and Technology profiles and add later roots from real needs |
| Metadata becomes more authoritative than Markdown | Human review no longer sees complete governed meaning | Reject declarations that assert meaning without exact source sections |
| Stable identity follows paths or provider resources | Moves and integration changes break history | Preserve bundle, record, section, and entity identity independently |
| Real instances are copied into Markdown | Operational truth becomes stale and conflicts with its owner | Keep durable bindings in NKF and resolve live state from authoritative systems |
| Permissive interoperability weakens governance | Consumers treat OKF verification as Product acceptance | Keep the OKF export derived and preserve NKF authority extensions |
| A green validator is presented as acceptance | Unreviewed proposals silently govern | Report conformance and proposal status separately |
