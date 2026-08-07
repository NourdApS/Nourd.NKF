---
id: nkf-0.2-specification
type: specification
title: NKF 0.2 — Product And Technology Knowledge Format
summary: The Nourd Knowledge Format (NKF) is a human-readable, machine-verifiable format for durable governed knowledge. NKF 0.2 supports Product and Technology knowledge and adds the required Decision Applicability Gate for Task non-records.
created_at: 2026-08-06T22:24:00Z
record_lifecycle: immutable
record_status: draft
task: NKF-019
---

# NKF 0.2 — Product And Technology Knowledge Format

- **Status:** Draft candidate pending acceptance
- **Task:** `NKF-019`
- **Version:** `0.2`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Accepted source baseline:** `kaveh6202/Nourd.Studio@13a82fbc1b72c1350e9765f59d1538c375f3fa69`
- **Accepted source digest:** `77869d6f6cfe2ba8086e4eeba28fc5e545aa2c1896b9a28488b6d53b1b03bc5a`
- **Source acceptance:** [Nourd Studio ADR 0012](../evidence/source-snapshots/nourd-studio/13a82fbc1b72c1350e9765f59d1538c375f3fa69/knowledge/decisions/0012-initial-knowledge-declaration-contracts.md)
- **Predecessor canonical baseline:** `knowledge/specifications/nkf-0.1.md`
- **Predecessor canonical digest:** `df0235ee01ba951fe5beea50990213e4d1063b2e7014f460657de6904d5fabc0`
- **Canonical destination:** `knowledge/specifications/nkf-0.2.md`
- **Executable companion destination:** `contracts/nkf/0.2/nkf.yaml`
- **Acceptance Decisions:** ADR 0076, ADR 0077, ADR 0078, ADR 0079, and the
  reserved pair acceptance ADR 0080
- **Independent governing inputs:** ADRs 0001 through 0079
- **Interoperability baseline:** Open Knowledge Format 0.2

> This exact revision is the candidate canonical NKF 0.2 specification. It
> governs only when ADR 0080 accepts it with its executable companion. It
> is not the public stable NKF 1.0 release.

## Purpose

The **Nourd Knowledge Format (NKF)** is a human-readable, machine-verifiable
format for durable governed knowledge. NKF 0.2 supports Product and Technology
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

NKF 0.2 is a pre-stable format version produced under the versioned
contract evolution accepted by ADR 0076. ADRs 0045 through 0073 remain the
acceptance lineage of the immutable NKF 0.1 predecessor, including the
Product and Technology profile division and the complete portable topology.
ADR 0077 adopts the Decision Applicability Gate direction realized by this
revision. ADR 0078 allocates the version coordinate `0.2` to the correction
because it carries breaking changes, and keeps release, adoption, and
breaking-change process definition outside format meaning. ADR 0079 removes
the frontmatter title and adds the Task orientation keys. This exact
candidate pair governs as NKF 0.2 only when ADR 0080 accepts it.

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

The original accepted Nourd Studio source established NKF 0.1 for Product
knowledge. The independent NKF repository later established the single
version namespace, Markdown-plus-YAML authority pair, deterministic
declarations, body responsibilities, validation, release, security, and
pre-stable evolution rules.

ADR 0049 and the Technology-first NKF self-hosting exercise establish the
Common, Product, and Technology division. ADR 0058 establishes the governed
frontmatter successor revision under the Human Product Owner's accepted
orientation boundary and explicit authorization for coherent NKF 0.1
adoption. That authority does not accept a future profile, extension,
consumer meaning, or unrelated format change.

ADR 0071 adopts the complete portable onboarding topology after exercise of
the confirmed predecessor against Nourd Agent SDK. ADR 0072 accepted the
initial successor authority pair. ADR 0073 corrects that pair's Markdown
diagnostic registry omission without changing the adopted topology behavior.
The change adds a durable Common lifecycle envelope, one canonical reconciled
knowledge map, lifecycle placement and index completeness, profile-specific
initial scaffolds, and deliberate predecessor repair without adding another
Root Profile or version namespace.

Earlier Product-only revisions remain immutable provenance. The topology
replacement did not rewrite their historical meaning; it deliberately
migrated the then-current NKF 0.1 authority and required consumers to migrate
to the new root declaration.

ADR 0076 establishes versioned contract evolution after first consumer
adoption. ADR 0077 adopts the Decision Applicability Gate direction from the
evidenced Nourd Tiles failure, in which a conditional renderer decision lost
its conditions in successor Tasks and proxy evidence was represented as
outcome success. This NKF 0.2 revision realizes that adopted direction as a
versioned successor: NKF 0.1 remains immutable authority for repositories
that declare it, and consumers migrate deliberately.

## Scope

NKF 0.2 defines Common contracts and two concrete Root Profiles: Product and
Technology. Company, Organization, and other root knowledge remain unsupported
until their requirements are understood and accepted.

NKF 0.2 defines:

- a project-contained knowledge bundle with fixed `.nourd` metadata and a
  configurable canonical knowledge root;
- one canonical Markdown source and one YAML declaration per governed record;
- stable bundle, record, section, and semantic-entity identity;
- Common record types and their minimum body contracts;
- Product and Technology root-specific record types, bodies, vocabularies,
  hierarchy, and validation;
- lifecycle, authority, provenance, and acceptance semantics;
- a required Decision Applicability Gate for Task non-records, with closed
  verification-level and capability-finding vocabularies;
- typed record and semantic-entity relationships;
- Realization and external-authority bindings;
- the boundary between knowledge and operational instances;
- one native project layout;
- one content-addressed initial checker release package and manifest; and
- a deliberate export mapping to OKF 0.2.

NKF 0.2 does not define:

- a Task or business lifecycle;
- Task state, Workflow Runs, Steps, sessions, checks, deployments, current
  availability, synchronization state, or live observations;
- one storage engine, graph, database, API, user interface, validator,
  acceptance workflow, or enforcement mechanism;
- a runtime wire protocol;
- cross-bundle semantic relationships;
- Company or Organization knowledge contracts;
- public governance, registry hosting, or licensing; or
- a universal freshness policy.

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

- After the first consumer adoption of a version, every change to NKF
  contract meaning ships as a new version with its own immutable accepted
  Specification revision, digest-bound executable companion, derived Schemas,
  and versioned release. Accepted versions are never mutated in place.
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

An NKF version identifies one complete frozen set: the normative
Specification revision, its digest-bound executable companion, the derived
Schemas, the checker, the authoring and onboarding protocols, the portable
skills and host-adapter instruction content, and the fixtures, examples, and
documentation projection. Every artifact in the set declares the version it
serves, the version's release archive carries the exact set, and nothing in
a released set changes afterward: a guidance or checker correction is a new
version exactly like a specification correction. Superseded versions are not
kept in the working tree; they remain retrievable from version-control
history and their immutable release archives.

Installed portable guidance MUST declare the NKF version it serves through
the exact marker defined by the executable companion. When a governed
project contains a guidance file at a native guidance path, a missing marker
or a declared version different from the bundle's `nkf_version` emits
`guidance.version.mismatch`. Absent guidance files are not themselves a
conformance failure.

How the NKF repository releases a new version, how an adopted repository
adopts one, and how breaking changes are classified and signaled are
repository and governance process, not format meaning. They are deliberately
deferred to their own governed process definition and remain listed under
Unresolved Matters. Each version's changes and required migration meaning are
still recorded with its release.

NKF has one version namespace: the NKF format version. A bundle MUST declare
`nkf_version`. NKF 0.2 uses the unversioned canonical identities `nkf.bundle`,
`nkf.record`, `nkf.contract-set`, `nkf.release-manifest`, `nkf.common`,
`nkf.profile.product`, `nkf.profile.technology`, and the supported body
identities. They are all governed by the one NKF version coordinate, `0.2`.
Profile identity is not an independent version coordinate.

The sole NKF 0.2 record definition includes explicit responsibility bindings.
Older external record structures are legacy-consumer formats, not supported
parallel NKF contracts. They may be retained as provenance and deliberately
migrated by their consumers, but MUST NOT be reported as native NKF 0.2
conformance or automatically converted.

A repository or distribution MUST pin the exact specification revision it
uses through immutable distribution metadata or version control. The human
version `0.2` alone does not identify editorial changes to a draft.

NKF 0.2 uses OKF 0.2 as its interoperability baseline. A later OKF release
does not automatically change NKF. Each rebase MUST be reviewed deliberately,
document compatibility effects, update the mapping, and produce a new NKF
revision when needed.

Existing `nourd.knowledge.*` contracts remain the Nourd Studio bootstrap
contracts. NKF 0.2 does not silently rename or reinterpret them. A controlled
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
that directly contains `.nourd/`. Native NKF 0.2 fixes:

```text
<project-root>/
├── .nourd/
│   └── knowledge/
│       ├── bundle.yaml
│       └── records/
└── <configured-knowledge-directory>/
```

The manifest is `.nourd/knowledge/bundle.yaml`. Record declarations are UTF-8
`.yaml` files in the flat `.nourd/knowledge/records/` directory.
When the invocation precondition passes but the fixed manifest is absent,
`bundle.manifest.missing` remains the native parse diagnostic.

The manifest is a closed object with these required fields:

| Field | Responsibility |
| --- | --- |
| `nkf_version` | Constant NKF version `"0.2"` |
| `contract` | Constant bundle identity `nkf.bundle` |
| `id` | Non-empty stable bundle identity |
| `root` | Closed object selecting one root record and one concrete Root Profile |
| `knowledge_root` | Canonical knowledge directory relative to the project root |
| `non_records` | Explicit non-governing file declarations; present and possibly empty |

It may additionally contain only `canonical_terms`, `governed_artifacts`,
`extension_contracts`, and `extensions` under the contracts below. Unknown
top-level fields fail closed. Native NKF 0.2 has no `product_record`,
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
```

`kind` is exactly `navigation`, `generated`, `redirect`, or `other`.
`reason` is required and non-empty for `other`, and optional otherwise. The
path resolves to an existing regular file. Resolved paths are unique and
cannot also be record sources. List order carries no meaning.

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

Every Product and Technology bundle using this successor NKF 0.2 revision
MUST contain the following Common portable topology under its configured
`knowledge_root`:

| Path | Required Native Representation |
| --- | --- |
| `README.md` | One `navigation` non-record; the single canonical knowledge map |
| `tasks/README.md` | One `navigation` non-record linking the three Task-state indexes |
| `tasks/active/README.md` | One `navigation` non-record indexing Active Tasks |
| `tasks/deferred/README.md` | One `navigation` non-record indexing Deferred Tasks |
| `tasks/completed/README.md` | One `navigation` non-record indexing Completed Tasks |
| `designs/README.md` | One `navigation` non-record linking the five Design-disposition indexes |
| `designs/active/README.md` | One `navigation` non-record indexing Active Designs |
| `designs/adopted/README.md` | One `navigation` non-record indexing Adopted Designs |
| `designs/rejected/README.md` | One `navigation` non-record indexing Rejected Designs |
| `designs/superseded/README.md` | One `navigation` non-record indexing Superseded Designs |
| `designs/withdrawn/README.md` | One `navigation` non-record indexing Withdrawn Designs |
| `decisions/README.md` | One `navigation` non-record indexing Decisions |
| `specifications/README.md` | One `navigation` non-record indexing Specifications permitted by the selected profile |
| `realizations/README.md` | One `navigation` non-record linking the current-system Realization and supporting-current index |
| `realizations/current-system.md` | Exactly one Realization record with body `nkf.realization` |
| `realizations/current/README.md` | One `navigation` non-record indexing supporting current Realizations |
| `evidence/README.md` | One `evidence` non-record exposing the Evidence areas used by the project |

Every required path resolves to one safe regular file. It MUST NOT be a
symbolic link, special file, duplicate physical target, record and non-record
conflict, or multiple representation. The required navigation files use the
normal Markdown source envelope. `evidence/README.md` retains the Common
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

Lifecycle placement and navigation use explicit native metadata as the source
of truth:

- every Task non-record is below `tasks/active/`, `tasks/deferred/`, or
  `tasks/completed/` according to its `task_status` and is linked exactly once
  from the matching state index;
- every Design record is below `designs/active/`, `designs/adopted/`,
  `designs/rejected/`, `designs/superseded/`, or `designs/withdrawn/`
  according to `design_disposition` and is linked exactly once from the
  matching disposition index;
- every Decision record is below `decisions/` and is linked exactly once from
  `decisions/README.md`;
- every Specification record is below `specifications/` and is linked exactly
  once from `specifications/README.md`;
- `realizations/current-system.md` is the sole consolidated current-system
  Realization; and
- every supporting current Realization below `realizations/current/` is
  linked exactly once from `realizations/current/README.md`.

The parent Task, Design, and Realization indexes link their required child
indexes and current-system source exactly once. Directory placement and links
are verified against declarations and frontmatter; they never assign type,
state, disposition, acceptance, normative authority, or confirmation.
Historical Evidence need not be exhaustively linked because immutable source
snapshots may preserve historical layouts. `evidence/README.md` MUST link each
safe direct child directory of `evidence/` that contains a represented
Evidence Markdown file at any depth. It need not link every Evidence file.

Unresolved pre-NKF Markdown may remain at a non-canonical path only while it
is represented as an appropriate non-record. Deliberately promoted native
lifecycle knowledge MUST satisfy the canonical placement and index rules.
Once a project adopts this successor revision, the complete topology is a
continuing conformance requirement rather than a one-time generator output.

### Portable Topology Onboarding And Migration

Initial Category 1 and Category 2 onboarding creates the complete Common
topology. The Product Profile additionally creates one Draft Product root at
`product.md` when that canonical path is free. The Technology Profile creates
one Draft Technology root at `technology.md` and one Draft Specification at
`specifications/initial-specification.md` when those canonical paths are free.
An inspected, safe existing root or Specification path may remain when the
candidate plan selects it explicitly. Filesystem location does not replace
native record identity or profile meaning.

The generated managed navigation block additionally links the active
onboarding Task and, for Technology, the initial Specification. Those
onboarding-only targets are verified during candidate sealing and initial
application. After lifecycle movement, continuing conformance is established
through the canonical Task and Specification indexes rather than a permanent
special onboarding role.

When `README.md` is absent, onboarding generates it. When it exists, onboarding
reuses that path and document identity, adds or reconciles the single managed
block, and preserves project-owned bytes as defined above. It MUST NOT allocate
`README-2.md` or another suffixed authority copy. An existing required index is
reconciled in place when its meaning and representation are unambiguous.
Conflicting record use, unsupported file kind, unsafe path, symbolic link,
duplicate physical target, or semantic ambiguity stops before project
mutation.

A project created by the confirmed NKF-013 or NKF-015 predecessor may use an
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
summary: "A concise orientation summary."
created_at: 2026-07-30T19:47:30Z
---
```

Frontmatter carries no `title` key. The document MUST have exactly one
top-level H1, and that H1's comparison string is the document title. For a
record, the declaration `title` MUST exactly equal it; repeating the title in
frontmatter is unsupported duplication and fails closed as an unsupported
key. `summary` MUST be a non-empty, trimmed, single-line string. It helps a
person or agent orient to the document; its presence and shape do not prove
semantic correctness, completeness, or acceptance.

`created_at` MUST be a real calendar instant serialized exactly as
`YYYY-MM-DDTHH:mm:ssZ`. It records the first evidenced repository appearance
or authoritative creation instant claimed by the source. It does not claim
acceptance, implementation, modification, review, or operational time. NKF
does not define a generic `updated_at`.

Every applicable record source additionally requires:

```yaml
id: record-identity
type: decision
record_lifecycle: immutable
record_status: accepted
```

The frontmatter `id`, `type`, `record_lifecycle`, and `record_status` MUST
exactly equal declaration `id`, `type`, `governance.lifecycle`, and
`governance.status`, respectively. A mismatch fails conformance; the checker
does not select a winner or rewrite either representation.

Design, Decision, Specification, and Realization record sources additionally
require one non-empty `task` value. It MUST exactly resolve to one Task
non-record `task_id` in the same bundle. Resolution establishes internal
traceability only. It does not make a Task an NKF record, prove its operational
state, satisfy its acceptance criteria, or establish acceptance or
confirmation.

A Design source additionally requires `design_disposition`, independently of
record lifecycle and record authority status. Supported values are `active`,
`adopted`, `rejected`, `superseded`, and `withdrawn`.

- Every Design requires `task`.
- Adopted and Rejected require a non-empty unique `design_decisions` list.
  Every value is an exact same-bundle Decision record ID.
- Superseded requires a non-empty unique `superseded_by` list. Every value is
  an exact same-bundle record ID. It MAY retain `design_decisions` governing
  an earlier disposition.
- Withdrawn requires `withdrawal_source`, a closed mapping containing
  `kind: task | record` and one non-empty `id` that resolves according to its
  kind.
- Provenance keys that do not apply to the selected disposition are
  forbidden.

An Active Design remains proposal knowledge under consideration. Adopted
means a Decision selected its proposed direction; Rejected means a Decision
declined it; Superseded means later governed knowledge replaced it; and
Withdrawn means its owner or governing Task stopped consideration without a
Decision deciding its merits. None of those values makes the Design current
normative authority.

A Realization source additionally requires `confirmation_status`. Supported
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
requires a unique, non-empty `task_id` and a `task_status` of `active`,
`deferred`, or `completed`. It MAY additionally declare `owner` and
`decision_authority` as non-empty, trimmed, single-line strings, and
`related_tasks` as a non-empty duplicate-free sequence of `task_id` values,
each resolving to exactly one other same-bundle Task non-record. These
orientation keys replace repeating the same identity facts at the top of the
body. Repository identity belongs to the bundle and its root record; NKF
defines no per-document repository key. The project supplies that operational
projection; NKF validates its declared shape and reference graph but does not
execute, schedule, complete, or become authoritative for the Task. NKF Core
does not infer Task state from directory names. Every Task non-record body
MUST carry the Decision Applicability Gate defined in its own section of this
specification.

Record references in `design_decisions`, `superseded_by`, and
`confirmation_decisions` use exact native record IDs. Task references use
exact `task_id` values. `withdrawal_source` selects the applicable namespace
explicitly. Every governed reference MUST resolve exactly once.

The allowed keys are:

| Applicable document | Required keys | Conditional keys |
| --- | --- | --- |
| Non-Evidence Markdown | `summary`, `created_at` | None |
| Record source | Common plus `id`, `type`, `record_lifecycle`, `record_status` | Type profile |
| Design record | Record plus `task`, `design_disposition` | `design_decisions`, `superseded_by`, `withdrawal_source` |
| Decision or Specification record | Record plus `task` | None |
| Realization record | Record plus `task`, `confirmation_status` | `confirmation_decisions`, `unconfirmed_scope` |
| Task non-record | Common plus `task_id`, `task_status` | `owner`, `decision_authority`, `related_tasks` |
| Evidence record or non-record | Exempt | Safe syntax only when an envelope is present |

Key order, quoting style, comments, and whitespace are non-semantic. A
`summary` is canonical orientation metadata within the Markdown source but is
not a substitute for substantive meaning in the CommonMark body.

An opening delimiter without a valid closing delimiter, unsafe or malformed
YAML, multiple YAML documents, a non-mapping root, or a forbidden YAML feature
emits `markdown.frontmatter.invalid`. A source intended to begin with a
CommonMark thematic break MUST use a form other than an exact opening `---`
line.

A missing required envelope emits `markdown.frontmatter.required`. A missing
key emits `markdown.frontmatter.key.missing`; an unsupported key, including a
`title` key, emits `markdown.frontmatter.key.unsupported`; and an invalid
value or conditional shape emits `markdown.frontmatter.value.invalid`.
Invalid `created_at` emits `markdown.frontmatter.created-at.invalid`. Record
identity or declared-governance disagreement emits
`markdown.frontmatter.record-mismatch`. Invalid Design
disposition provenance emits `markdown.frontmatter.design.invalid`; invalid
Realization confirmation provenance emits
`markdown.frontmatter.confirmation.invalid`; invalid Task identity or status
emits `markdown.frontmatter.task.invalid`; and an unresolved or ambiguous
governed reference emits `markdown.frontmatter.reference.unresolved`.

### Deterministic Markdown Structure

Native NKF 0.2 interprets the Markdown source body using CommonMark 0.31.2.
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

Except for `governance.accepted_at`, whose ISO 8601 date shape is explicit
above, NKF 0.2 does not impose a narrower lexical format on the optional
factual-time strings in these structures. A later format revision may
standardize them through the governed change process.

Array order carries no meaning except `heading_path`. Native serialization
emits responsibility IDs in body-contract order for deterministic review.
Optional empty structures are omitted.

Native NKF 0.2 defines no presentation-guidance field. Markdown is the default
readable form. Portable display metadata uses a separately governed optional
extension and remains subject to ADR 0020 and future governed reconsideration
through NKF-004.

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

Cross-bundle identity and typed relationships are deferred in NKF 0.2.
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

NKF 0.2 defines these record relationship types:

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
states the claimed original acceptance date. Native NKF 0.2 has no universal
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
last-modified times. NKF 0.2 does not define `stale_after` or a universal
freshness policy.

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
- For kind `record`, `Reference` MUST be a reference cell whose identifier
  resolves to exactly one same-bundle Decision record whose declared
  governance status is `accepted`.
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
  exception: either a reference cell resolving to an accepted same-bundle
  Decision record or non-empty prose identifying the recorded human
  exception act.

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

| `task_status` | Gate | Completion rule |
| --- | --- | --- |
| `active` | Required | Not applicable |
| `deferred` | Required | Not applicable |
| `completed` | Required | No data row may combine finding `unsupported` or `unknown` with exception `none` |

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

The first namespace `nkf` is reserved for extensions owned and accepted by
NKF. Other namespaces belong to their stated authority. Namespace text is an
ownership claim, not proof. Extension IDs have no independent version;
`nkf_version: "0.2"` is the only version coordinate and artifact digests bind
exact revisions.

Every used extension has a digest-bound authority pair:

1. normative Markdown owning its complete human-readable meaning; and
2. executable YAML with identity `nkf.extension`, `nkf_version: "0.2"`, the
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

Native NKF 0.2 accepts no concrete extension. Portable presentation guidance
is deliberately outside the native record; future NKF-owned presentation work
is deferred under NKF-004.

## Native Project Organization

The fixed `.nourd` layout in the bundle contract is native NKF 0.2, not a
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
remain different roles. `stale_after` is omitted unless a later NKF freshness
policy or explicit supported profile governs it.

OKF's Attested Computation does not automatically become a new NKF core record
type. A durable sanctioned computation may be represented through a supported
Design or Realization profile, while receipts and per-run attestation remain
operational Evidence. An exporter MUST NOT invent that mapping without a
declared profile.

NKF 0.2 is based on the official
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
| JSON Schema 2020-12 | Local closed shapes, required fields, primitives, constants, enums, cardinality, duplicate-free scalar arrays, conditions, lexical formats | Files, containment, source bytes, headings, graphs, authority verification, semantic adequacy |
| Bundle-aware checker | Project layout, paths, sources, Markdown coverage, root-profile resolution, cross-record resolution, responsibilities, hierarchy, governed artifacts, extension-use consistency, resolver outcomes, bundle conformance | Acceptance, truth, design quality, semantic completeness, confirmed Realization |
| Artifact and authority resolver | Exact extension artifacts and optional acceptance-authority binding | Core acceptance, unsafe automatic dereference |
| Human semantic review | Adequacy and acceptability of meaning, classification, evidence, boundaries, and decisions | Deterministic conformance merely from judgment |

Each rule has one primary layer. Later layers may consume earlier results but
cannot maintain competing normative meaning.

Derived schemas use:

```text
contracts/nkf/0.2/schemas/
  bundle.schema.json   # urn:nkf:0.2:schema:bundle
  record.schema.json   # urn:nkf:0.2:schema:record
  validation-result.schema.json
                       # urn:nkf:0.2:schema:validation-result
```

The `0.2` component is the one NKF version coordinate. Each schema carries
non-normative source metadata for `nkf_version`, exact Markdown path/digest,
and exact YAML path/digest. Release metadata carries the schema's own digest.
Exact schema bytes remain derived realization.

Release-package enforcement separately uses:

```text
contracts/nkf/0.2/schemas/release-manifest.schema.json
                       # urn:nkf:0.2:schema:release-manifest
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
8. `record-contract` — validate body, role, responsibility, governance,
   provenance, entity, relationship, binding, and extension rules;
9. `security` — report high-confidence prohibited-material findings;
10. `authority-binding` — when requested and supported, verify declared
    governance against its acceptance authority without changing conformance;
    and
11. `result` — calculate conformance and governing-use readiness and emit a
    deterministic report.

When an earlier failure makes a later phase unsafe or meaningless, the later
phase is `not-evaluated`, never `passed`. A required failed or not-evaluated
phase prevents the requested conformance level from passing.
`authority-binding` is optional; when absent it does not fail conformance but
prevents `governing-use: ready` when verified acceptance is required.

### Conformance Levels

- `structural` requires `contracts`, `parse`, `schema`, `project`, `source`,
  `bundle-graph`, `security`, and `extension-resolution` for the catalog,
  bundle uses, and any record extension needed to interpret structural fields.
- `contract` additionally requires `record-contract` and
  `extension-resolution` for every extension use on the requested record.
- `full-bundle` requires structural conformance plus `record-contract` and
  `extension-resolution` for every governed record.

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
blocking: conformance | governing-use | none
phase: <validation phase>
message: <human-readable explanation>
artifact: <optional project-relative path>
record_id: <optional record ID>
instance_pointer: <optional JSON Pointer>
source_section: <optional section ID>
remediation: <optional non-authoritative guidance>
```

Rule ID, severity, blocking effect, and semantic trigger are stable contract
behavior. Message and remediation text are not machine contracts.
Conformance-blocking errors fail applicable conformance; governing-use errors
block consequential use without changing conformance; warnings are
non-blocking.

Optional fields are omitted rather than null. Artifact paths are exact
project-relative paths using `/`. Diagnostics sort by accepted phase, then
optional artifact, record ID, instance pointer, source section, and rule ID.
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
| `knowledge.topology.lifecycle-path.invalid` | error |
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
| `markdown.frontmatter.design.invalid` | error |
| `markdown.frontmatter.confirmation.invalid` | error |
| `markdown.frontmatter.task.invalid` | error |
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
closed UTF-8 JSON `nkf.validation-result` object with `nkf_version: "0.2"`.
Unknown fields, comments, duplicate keys, byte-order marks, and non-JSON
values are invalid. Member order and insignificant whitespace carry no
meaning.

The object contains exactly fourteen required fields:

```text
contract, nkf_version, execution, checker, contract_artifacts, request,
bundle_id, profile, validated_snapshot, phases, conformance, records,
governing_use, diagnostics
```

`execution` contains a lowercase UUID, portable runner identity, and
fixed-millisecond UTC RFC 3339 start and completion times. Completion cannot
precede start. `checker` contains a portable artifact identity and SHA-256
digest.

`contract_artifacts` binds expected and observed SHA-256 digests for the
canonical Markdown, executable YAML, and exactly the bundle, record, and
validation-result schemas in that order. Every involved extension contributes
its Markdown and executable artifact bindings in exact extension-ID order.
Binding is `verified`, `unavailable`, or `mismatched`; no artifact content or
absolute location is copied into the result.

The request object contains:

```json
{
  "level": "full-bundle",
  "record_id": null,
  "acceptance_binding": "requested"
}
```

`structural` requires a null record and no acceptance-binding request.
`contract` requires one record ID. `full-bundle` requires a null record.
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
Technology `governed_artifacts` file. Required accepted extension artifacts
and resources governed by a supported extension also participate. Unlisted
non-Markdown knowledge assets do not participate unless an accepted rule or
extension makes them governed inputs.

The checker represents those inputs internally as closed
`nkf.validation-snapshot` JSON with `nkf_version: "0.2"` and one entry per
logical project path. Each entry contains exact project-relative `path`,
`direct_kind`, `resolution`, nullable `resolved_path`, nullable `final_kind`,
and nullable `content_sha256`. Multiple selectors merge. Entries sort by exact
path using the RFC 8785 unsigned UTF-16 comparator without normalization or
case folding. RFC 8785 JCS canonicalizes the UTF-8 inventory, and SHA-256
produces the stored snapshot value. The result stores only algorithm,
`rfc8785-jcs`, digest, and entry count—not the inventory.

All eleven accepted phases appear exactly once in accepted order with
`passed`, `failed`, or `not-evaluated`. An emitted valid result always has a
passed `result` phase. Failure to construct a valid result produces no
completed result; a completed conformance failure still produces a valid
result.

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

Top-level Governing Use Ready is always `not-evaluated` for `structural`; is
the unique target record's result for `contract`, or `not-ready` when that
target is missing or ambiguous; and is the aggregate above for `full-bundle`.

Diagnostics use the accepted closed shape and deterministic order. Optional
fields are omitted rather than null. Complete diagnostic identities are
unique. Message and remediation wording are non-contractual.

`NKF Verified` means current full-bundle conformance only. A passing receipt
remains current only while its Governed Validation Inputs still produce the
snapshot, its core artifact bindings match the current accepted NKF 0.2
revision, its recorded profile identity still matches the bundle-selected
supported profile, and its checker remains recognized and supported for that
revision. Otherwise it is historical evidence with status **verification
outdated**.

Normal acceptance changes alter governed inputs through the governed change
process. NKF 0.2 does not infer a hidden acceptance change, poll an authority,
or impose universal expiry. Universal expiry or separate authority freshness
remains deferred under NKF-005.

The result is operational state outside `knowledge_root`, excluded from its
own snapshot, and ordinarily uncommitted. It excludes usernames, hostnames,
absolute paths, credentials, secrets, and copied operational payloads.
Conformance, acceptance binding, Governing Use Ready, semantic adequacy, and
confirmed Realization remain distinct.

No deterministic layer establishes semantic role accuracy, adequate or true
Markdown, evidence support, deserved acceptance, current external authority,
Design quality, or Realization existence and behavior. Those require human
review and, where applicable, external Evidence.

## Release Distribution

NKF 0.2 uses one content-addressed archive attached to a Github Release in
`kaveh6202/Nourd.NKF` as its initial native checker distribution. The archive
is release metadata and tooling, not governed knowledge, a project declaration,
an acceptance record, or a conformance result.

The release, tag, asset name, source commit, archive digest, checker digest,
and schema digests are distribution, provenance, or integrity identities.
They are not NKF versions. `nkf_version: "0.2"` remains the only format
version.

### Release Manifest

The archive contains exactly one UTF-8 JSON `release-manifest.json` at its
distribution root. It has contract identity `nkf.release-manifest` and
`nkf_version: "0.2"`.

The manifest is one closed JSON object with exactly six required top-level
fields in this logical shape:

```text
contract, nkf_version, source, checker, authority, schemas
```

`source` contains the exact NKF repository, the 40-lowercase-hexadecimal Git
commit from whose clean checkout the release is built, and the accepted
checker-confirmation Decision with its exact repository path and SHA-256 in
that release commit, plus the exact 40-lowercase-hexadecimal checker source
checkpoint the Decision confirms. The Decision ID and four-digit path prefix
must match.

`checker` contains identity `nourd-nkf-checker`, exact relative path
`dist/nourd-nkf-checker.mjs`, its SHA-256 digest, and runtime name `node` with
minimum major version `22`.

`authority` fixes precedence to `normative-markdown` and binds:

- `knowledge/specifications/nkf-0.2.md`; and
- `contracts/nkf/0.2/nkf.yaml`.

`schemas` contains exactly four entries in exact identity order:

1. `urn:nkf:0.2:schema:bundle`;
2. `urn:nkf:0.2:schema:record`;
3. `urn:nkf:0.2:schema:release-manifest`; and
4. `urn:nkf:0.2:schema:validation-result`.

Every checker, authority, and schema artifact has its exact fixed relative
path and one digest object whose algorithm is `sha-256` and whose value is 64
lowercase hexadecimal characters. All manifest objects are closed and all
their fields are required.

The manifest uses two-space indentation, LF line endings, one final LF, no
byte-order mark, no trailing whitespace, top-level and nested object members
in contract order, and schema entries in exact identity order. Member order
does not change its logical meaning but is fixed for reproducible release
bytes.

The manifest omits its own digest, the containing archive digest, asset name,
tag, release URL, publication time, latest status, and mutable Github state.
The archive digest binds the manifest; the manifest binds every other
distributed file. This avoids a digest cycle.

### Release Manifest Schema

Release package enforcement uses:

```text
contracts/nkf/0.2/schemas/release-manifest.schema.json
  # urn:nkf:0.2:schema:release-manifest
```

The schema is derived from this Markdown and the executable YAML companion.
Its own digest is carried by the release manifest.

The release-manifest schema validates release metadata only. It is not a
project declaration schema, does not expand project Governed Validation
Inputs, and is not included in
`validation_result.contract_artifacts.schemas`. The project checker continues
to bind exactly the bundle, record, and validation-result schemas in that
result.

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

The archive uses uncompressed USTAR and contains exactly eight regular files
under stable root `nourd-nkf/`, in exact ASCII-byte path order:

```text
contracts/nkf/0.2/nkf.yaml
contracts/nkf/0.2/schemas/bundle.schema.json
contracts/nkf/0.2/schemas/record.schema.json
contracts/nkf/0.2/schemas/release-manifest.schema.json
contracts/nkf/0.2/schemas/validation-result.schema.json
dist/nourd-nkf-checker.mjs
knowledge/specifications/nkf-0.2.md
release-manifest.json
```

Every archive path is relative to `nourd-nkf/`. There are no explicit
directory entries. Symlinks, hard links, devices, absolute paths, traversal,
duplicate paths, case-colliding paths, and any ninth entry are forbidden.

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

The packager operates only from the manifest's clean `release_commit`. It
runs the complete accepted development checks, builds the checker twice,
verifies the checker-confirmation Decision and every accepted artifact digest,
constructs and validates the manifest, assembles the archive twice, and
requires identical checker and archive SHA-256 results. Any mismatch or
unexpected entry fails packaging.

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
6. verifies every other manifest-bound file path and digest;
7. verifies the checker-confirmation Decision path and digest in
   `release_commit` and its binding to `checker_source_commit` when source
   provenance is evaluated;
8. rejects any missing or unexpected archive file; and
9. invokes the checker only from the verified distribution root.

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
0.2 is pre-stable. Before publication, release automation downloads the
uploaded asset and repeats the archive, manifest, artifact, checker-help, and
source-commit checks. Immutable Github Releases SHOULD be used when supported.
Artifact attestations MAY add provenance but do not replace the archive
digest.

Public distribution remains unresolved. Repository visibility or access
control does not alter the NKF 0.2 format.

## Security And Privacy

NKF bundles are durable, reviewable governed knowledge and may be distributed.
A bundle MUST NOT contain live credentials, access tokens, private keys, or
secrets.

Sensitive governed knowledge MAY require a restricted bundle or access policy,
but NKF 0.2 does not define that policy. A consumer MUST NOT hide missing
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

The following remain deliberately unresolved in NKF 0.2:

- universal freshness and staleness policy;
- required repository and continuous-integration gates;
- public checker distribution, installation UX, and support policy;
- migration from current `nourd.knowledge.*` bootstrap contracts;
- cross-bundle semantic identity and relationships;
- Company and Organization knowledge contracts;
- additional Root Profiles beyond Product and Technology;
- public governance, contribution process, trademark position, and license;
- an NKF extension registry and compatibility policy;
- a future NKP runtime protocol;
- standardized acceptance-event storage; and
- attested-computation profiles;
- the future optional presentation-guidance extension under NKF-004; and
- the version release process, the consumer version-adoption process, and
  breaking-change classification and signaling, deferred to NKF-020.

These omissions MUST be visible to consumers. A profile MAY resolve one for
its own scope, but MUST identify the extension and MUST NOT claim that the
profile decision is part of NKF 0.2 core.

## Minimal Example

A logical NKF 0.2 manifest:

```yaml
nkf_version: "0.2"
contract: nkf.bundle
id: example-product
root:
  record: product
  profile: nkf.profile.product
knowledge_root: knowledge
non_records:
  - path: README.md
    kind: navigation
```

A minimal Product Markdown source:

```markdown
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

Derived schemas enforce the exact native serialization. They cannot add
fields, responsibilities, or meaning. A supported extension supplies its own
separately governed executable contract.

## Pre-Mortem

| Failure mode | Consequence | Required response |
| --- | --- | --- |
| NKF attempts to model every kind of knowledge immediately | The first version becomes unusable and untestable | Keep 0.2 limited to evidence-backed Product and Technology profiles and add later roots from real needs |
| Metadata becomes more authoritative than Markdown | Human review no longer sees complete governed meaning | Reject declarations that assert meaning without exact source sections |
| Stable identity follows paths or provider resources | Moves and integration changes break history | Preserve bundle, record, section, and entity identity independently |
| Real instances are copied into Markdown | Operational truth becomes stale and conflicts with its owner | Keep durable bindings in NKF and resolve live state from authoritative systems |
| Permissive interoperability weakens governance | Consumers treat OKF verification as Product acceptance | Keep the OKF export derived and preserve NKF authority extensions |
| A green validator is presented as acceptance | Unreviewed proposals silently govern | Report conformance and proposal status separately |
