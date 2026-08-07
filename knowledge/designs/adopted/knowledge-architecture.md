---
id: design-nkf-007-knowledge-architecture
type: design
summary: This repository-architecture Design addresses the NKF-007 knowledge organization, current-system navigation, filename, front-matter, date, Design-disposition, Task-transfer, Realization, migration, and self-adoption problems.
created_at: 2026-07-30T16:27:13Z
record_lifecycle: immutable
record_status: accepted
task: NKF-007
design_disposition: adopted
design_decisions:
  - adr-0053
decision_authority: Human Product Owner, Nourd ApS
---

# NKF-007 Knowledge Architecture

- **Adopting Decision:** `ADR-0053`
- **Authority Boundary:** The Design remains proposal knowledge. ADR 0053
  adopts its direction; current normative meaning belongs to Specifications.

## Design Kind Problem And Scope

This repository-architecture Design addresses the NKF-007 knowledge
organization, current-system navigation, filename, front-matter, date,
Design-disposition, Task-transfer, Realization, migration, and self-adoption
problems.

It does not change Product or Technology profile meaning, add another NKF
root, broadly enforce repository-specific metadata in external consumers,
publish a release, deploy anything, or migrate an external consumer. It does
include the minimal NKF source-envelope and parser correction required to keep
front matter from becoming false CommonMark meaning.

The present structure is history-first. Current meaning is discoverable only
by walking a long Decision narrative, current implementation is summarized by
one incomplete Realization, Design outcomes are inconsistent, and proposal
artifacts are mixed with findings and historical authority revisions.

## Governing Inputs And Constraints

This Design follows the Human Product Owner's required lifecycle:

```text
Task → Design → Decision → Specification → Realization → Validation
```

The following boundaries govern the proposal:

- Tasks own intent, constraints, acceptance criteria, and execution plans.
- Designs are proposals containing alternatives and trade-offs.
- Decisions record why directions were adopted, rejected, or superseded.
- Specifications own current normative meaning.
- Realizations describe current implementation.
- Validation evaluates a particular snapshot.
- The Current System Model is a consolidated Realization view, not another
  layer or authority.
- Agents begin from the current-system Realization and follow Decisions or
  Designs selectively for provenance and reasoning.
- Every non-Evidence Markdown file has human-readable front matter containing
  an evidence-backed UTC `created_at` timestamp.
- Evidence remains byte-preserving and exempt from front-matter and date
  normalization.
- Accepted Decisions and other immutable records require a governed successor
  migration rather than silent mutation.
- `.nourd` remains directly at project root and selects `knowledge/` through
  its project-contained relative entry point.
- Every Markdown file under `knowledge/` has exactly one record declaration or
  explicit non-record representation.
- Markdown remains canonical human meaning. `.nourd` declarations are
  executable representations and must not infer acceptance or semantic
  mappings.

## Proposed Direction

This section records the direction proposed by this Design and adopted through
ADR 0053. Adoption does not make the Design itself current normative meaning.
The Decision records why the direction was adopted, Specifications define
current normative meaning, and Realizations describe current implementation.

### Target Knowledge Topology

```text
knowledge/
├── README.md
├── nkf.md
├── tasks/
│   ├── README.md
│   ├── active/
│   ├── deferred/
│   └── completed/
├── designs/
│   ├── README.md
│   ├── active/
│   ├── adopted/
│   ├── rejected/
│   ├── superseded/
│   └── withdrawn/
├── decisions/
│   ├── README.md
│   └── <four-digit-id>-<decision-subject>.md
├── specifications/
│   ├── README.md
│   └── nkf-0.1.md
├── realizations/
│   ├── README.md
│   ├── current-system.md
│   └── current/
│       ├── contracts-and-schemas.md
│       ├── checker-and-validation.md
│       ├── self-hosting.md
│       └── release-package.md
└── evidence/
    ├── README.md
    ├── audits/
    ├── migrations/
    ├── decision-inputs/
    └── source-snapshots/
```

The lifecycle locations remain the primary organization. A second topic tree
is not imposed because many NKF changes cross authority, format, validation,
implementation, and release concerns. Curated indexes provide topic views
without duplicating files or making one subjective topic the path identity.

There is no `knowledge/validations/` directory in the native structure. The
latest operational validation result remains
`.nourd/validation-result.json`. Durable audit or migration evidence belongs
under Evidence. This prevents a snapshot result from becoming current
normative or Realization authority.

### Entry-Point Navigation

`knowledge/README.md` becomes a short lifecycle map and links first to:

1. `knowledge/realizations/current-system.md` for the implemented system;
2. `knowledge/specifications/nkf-0.1.md` for current normative meaning;
3. the active Task index for current work; and
4. thematic Decision and disposition-based Design indexes for selective
   provenance.

It must not narrate the current system by replaying every ADR.

The current-system Realization provides the normal agent and human starting
point. It consolidates architecture, topology, components, relationships,
interfaces, artifact mappings, implementation status, confirmation status,
and relevant Decision provenance. Supporting current Realizations provide
detail without competing with the canonical Specification.

### Task Organization

Tasks move according to their explicit Task state:

- NKF-007 moves to `tasks/active/`.
- NKF-004, NKF-005, and NKF-006 move to `tasks/deferred/`.
- NKF-003 moves to `tasks/completed/` only after its incomplete obligations
  are explicitly transferred.
- A deferred NKF-008 owns future publication and external-consumer onboarding,
  which remain outside NKF-007.

Task status is authoritative in the Task body. Directory placement is a
human-navigation projection that must agree with it and must never be used to
infer status.

### Design Disposition

Every Design declares one canonical `design_disposition` in front matter:

| Disposition | Meaning | Required provenance |
| --- | --- | --- |
| `active` | Proposal remains under consideration | Owning Task |
| `adopted` | A Decision adopted the proposed direction | Governing Decision |
| `rejected` | A Decision rejected the proposed direction | Governing Decision |
| `superseded` | A later Design or Decision replaced the proposed direction | Replacement and relevant Decision |
| `withdrawn` | Owner or governing Task explicitly stopped consideration without deciding its merits | Explicit withdrawal source |

`resolved` is a derived navigation grouping for every non-active disposition;
it is not stored as a disposition. `accepted` remains a native record
authority state for an exact record revision and is not a Design disposition.
Historical `abandoned` wording maps to `withdrawn` only when explicit
withdrawal provenance exists.

The migration must reclassify documents that are actually audits, findings,
examples, or migration inputs out of Designs before applying a disposition.
Directory location must reflect, never establish, the canonical front-matter
value.

### Design Disposition And Record Governance

Design disposition and native record governance describe different axes:

- disposition states what happened to the direction proposed by the Design;
- record governance states what the authority claims about the exact Design
  record revision; and
- neither axis determines the other.

An Active Design is normally a living Draft. A terminal disposition normally
uses an immutable record revision so the reviewed proposal and its disposition
provenance cannot drift. Its authority state MUST come from exact acceptance,
supersession, or retirement provenance and MUST NOT be inferred from
`design_disposition`. In particular, rejecting a proposed direction does not
prevent the authority from accepting the exact Design revision as the
authoritative record of the proposal it reviewed.

The executable NKF 0.1 contract does not gain a Design-disposition field in
this migration. Front matter and repository indexes own the human-navigation
projection until separate evidence justifies a portable NKF rule and
enforcement.

### Filename Convention

All active filenames use lowercase kebab case and identify subject rather than
workflow action.

Decision filenames use:

```text
<four-digit-id>-<decision-subject>.md
```

The four-digit prefix is retained because current release and confirmation
provenance depends on it. Procedural verbs such as `accept`, `establish`,
`confirm`, `reconcile`, `correct`, `clarify`, `introduce`, and `govern` are
removed from the filename. The Decision heading may retain a complete
decision statement.

Design filenames use:

```text
<design-subject>.md
```

Disposition, proposal stage, and temporary process phrases do not appear in
the filename. `nkf-0.1` remains only when the Design is genuinely bound to
that format version. Historical exact authority revisions may include their
governing ADR identifier to distinguish otherwise identical subjects.

Task filenames use:

```text
<task-id>-<task-subject>.md
```

Realization filenames use concise implementation subjects. Evidence keeps
source-preserving names where renaming would weaken provenance.

Stable NKF record IDs do not change merely because paths become clearer.

### Front Matter And Time

Every non-Evidence Markdown file begins with:

```yaml
---
created_at: 2026-07-30T16:27:13Z
---
```

The value is an RFC 3339 UTC timestamp using `Z`. Existing files use their
earliest exact Git-introduction timestamp, converted to UTC. This records the
first evidenced repository appearance; it does not claim the original
authoring, proposal, acceptance, or implementation time.

Designs additionally declare `design_disposition` and the provenance required
by their disposition. Exact field shapes are:

```yaml
---
created_at: <UTC timestamp>
design_disposition: active
---
```

or:

```yaml
---
created_at: <UTC timestamp>
design_disposition: adopted
design_decisions:
  - ADR-0013
---
```

`design_decisions`, `superseded_by`, or `withdrawal_source` is used only when
required by the disposition.

Unsupported date-only structured metadata such as `Prepared`, `Recorded`,
`Proposed`, `Accepted`, or `Revised` is not converted to midnight or to a Git
timestamp that falsely claims the semantic event time. It is removed from the
current document, replaced by exact provenance when available, or left only
in preserved Evidence and Git history.

New structured dates use full UTC timestamps. Existing prose may describe
historical date precision naturally when the precision itself matters.

### Front-Matter Parsing Boundary

Independent review proved that CommonMark 0.31.2 interprets standard YAML
front matter as ordinary Markdown and can turn it into a false Setext heading.
The native source model must therefore separate source envelope from Markdown
body.

The proposed minimum boundary is:

- a front-matter envelope is recognized only when the source begins at byte
  zero with `---` followed by a line ending;
- exactly one later delimiter line `---` closes the envelope;
- the enclosed bytes must parse as one strict YAML mapping with no duplicate
  keys;
- the complete source bytes, including the envelope, remain covered by the
  record source digest and secret scan;
- CommonMark H1, heading, Title Case, and section-map processing receives only
  the body bytes after the closing delimiter;
- front-matter keys do not become record declaration fields, section meaning,
  acceptance proof, or operational state by implication; and
- malformed or unclosed front matter fails source parsing rather than falling
  through as misleading Markdown.

NKF-007 must add this minimum source-envelope meaning to the canonical
Markdown/YAML authority pair and derive the parser correction and focused
fixtures before the repository can validate with front matter.

The repository-specific requirements for `created_at`,
`design_disposition`, and disposition provenance remain repository governance
in this Task. Making those keys mandatory portable NKF fields for every
consumer, or adding broad metadata policy enforcement, remains deferred.

### Decision And Immutable-Record Migration

ADR 0053 accepts the exact repository-architecture model and governs the
mechanical migration of earlier immutable records. A later authority-pair
Decision accepts the exact canonical Markdown/YAML revision that realizes the
front-matter source envelope. Realization confirmation remains separate.

The ADR 0053 migration:

- preserves stable record IDs;
- records every old and new path;
- records predecessor and successor SHA-256 values;
- limits content changes to front matter, unsupported structured-date
  removal, filename/path references, and link repair unless a separately
  reviewed semantic correction is required;
- preserves original bytes in Git history and existing Evidence;
- does not rewrite immutable source snapshots;
- keeps acceptance, Realization confirmation, and conformance distinct; and
- creates a post-migration audit proving that changed semantic prose is either
  absent or explicitly governed.

### NKF-003 Closure And Work Transfer

NKF-003 is completed only after recording:

- independent repository authority, the NKF 0.1 authority pair, schemas,
  checker, local release package, Product and Technology profiles, and the
  initial self-hosting realization as completed outcomes;
- the unresolved source-provenance limitations as preserved Evidence;
- NKF-007 as owner of repository-structure, Realization, and self-adoption
  remediation;
- NKF-004, NKF-005, and NKF-006 as owners of their existing deferred
  investigations; and
- deferred NKF-008 as owner of publication, external-consumer pinning,
  onboarding, migration, and handover that were not completed by NKF-003.

Closing NKF-003 does not claim those transferred obligations are complete.

### Current Realization Set

The migrated repository creates:

- `realizations/current-system.md` — consolidated entry point and complete
  architecture, topology, component, interface, status, artifact, and
  provenance map;
- `realizations/current/contracts-and-schemas.md` — canonical Markdown/YAML
  pair, derived schemas, identities, paths, bindings, and confirmation;
- `realizations/current/checker-and-validation.md` — checker architecture,
  phases, supported behavior, fixtures, tests, limitations, and validation
  boundary;
- `realizations/current/self-hosting.md` — project layout, Technology root,
  declarations, governed inputs, snapshot behavior, and manual semantic
  review status; and
- `realizations/current/release-package.md` — confirmed local package,
  manifest, verifier, distribution boundary, and explicit unpublished state.

Every supporting document uses the native `nkf.realization` body
responsibilities. The current-system document links them and records their
confirmation status without copying live operational state.

### Non-Inferential Self-Adoption

The existing self-host generator is not used for the migration because it
infers Design/Decision state and semantic responsibility mappings.

The migration rebuilds `.nourd` from an explicit reviewed path map and
human-reviewed record declarations:

- existing stable record IDs are preserved;
- source paths and digests are updated mechanically;
- section responsibility bindings and relationships are reviewed rather than
  keyword-generated;
- acceptance states come only from Decisions and exact provenance;
- every Markdown file is represented exactly once;
- moved non-record indexes and Tasks remain explicit non-records unless their
  meaning is separately promoted to a native record; and
- the unsafe generator and one-time heading normalizer leave the active
  realization after their historical role is preserved.

The checker validates the completed snapshot. Passing validation does not
retroactively accept declarations or prove semantic adequacy.

### Preserved Audit Findings

NKF-007 closes or transfers every material pre-remediation audit finding:

| Finding | NKF-007 treatment |
| --- | --- |
| Keyword-generated semantic bindings | Replace generated declarations with explicit human-reviewed bindings and relationships |
| Filename-inferred Decision and root acceptance | Derive declaration state only from exact Decision provenance; accept the migrated Technology root revision explicitly |
| Governed-artifact secret-scan coverage | Preserve as deferred enforcement work under NKF-009 because the Human Product Owner excludes rule-enforcement expansion from this migration |
| Dynamic-root durability | Preserve the committed checkpoint; later commit the completed migration without publishing or deploying it |
| History-first authority map | Replace with the consolidated current-system Realization and short lifecycle indexes |
| Root `README.md` and `AGENTS.md` outside the validated snapshot | Bind them as Technology governed artifacts because they own repository identity and operating rules |
| Historical non-Markdown Design artifacts | Move byte-for-byte to Evidence decision inputs; they need not become general knowledge-root inputs merely because they are preserved |
| One-time heading normalizer remains active | Remove it from active tooling after preserving its accepted role through Decision and Git provenance |
| Unsafe generator lacks an equality gate | Remove it from the current Realization rather than certifying unsafe inference |
| Partial source-snapshot links | Preserve unchanged as explicit Evidence limitations |
| Product-only published prerelease | Transfer updated publication and consumer onboarding to deferred NKF-008 |

NKF-009 records rather than silently drops the secret-scan finding. Deferral
does not claim the coverage gap is repaired.

## Responsibilities Interactions And Information Flows

The Human Product Owner supplies repository direction and acceptance
authority. NKF-007 owns the execution plan and migration acceptance criteria.
The Design provides alternatives and the proposed target. A Decision accepts
or rejects the exact architecture and migration boundary. Specifications
remain unchanged unless independent semantic review proves a normative change
is required. Realizations describe the migrated implementation. The checker
evaluates the final snapshot.

The normal navigation flow becomes:

```text
knowledge/README.md
        ↓
realizations/current-system.md
        ├── specifications/nkf-0.1.md
        ├── realizations/current/*
        ├── relevant decisions/*
        └── relevant designs/<disposition>/*
```

The migration flow becomes:

```text
inventory Evidence
        ↓
reviewed Design
        ↓
accepted migration Decision
        ↓
path and metadata migration
        ↓
current Realizations
        ↓
explicit .nourd declarations
        ↓
independent audit and validation
```

## Alternatives And Trade-Offs

### Keep Every Lifecycle Directory Flat

This minimizes path changes but retains the current Design ambiguity and Task
status scanning. Indexes alone cannot prevent active and historical proposal
material from becoming mixed again.

Rejected.

### Organize Everything By Topic

A topic tree such as authority, contracts, validation, release, and security
looks intuitive but many NKF records span several topics. Selecting one path
would create arbitrary ownership, duplicate indexes, and unstable moves when
scope evolves.

Rejected as the primary topology. Thematic index sections remain useful
projections.

### Put Current Meaning In A Separate Current-System Layer

This gives a short entry point but creates another authority between Decisions
and Realizations and competes with Specifications.

Rejected. The consolidated view belongs inside Realization.

### Treat Resolved As A Design Disposition

This reduces the vocabulary but hides whether a proposal was adopted,
rejected, superseded, or withdrawn.

Rejected. `resolved` remains a derived grouping only.

### Use Accepted As A Design Disposition

This matches colloquial wording but conflicts with the native record authority
state `accepted` and obscures whether a Decision adopted the proposed
direction.

Rejected. `adopted` names the Design disposition.

### Convert Date-Only Metadata To Midnight UTC

This is mechanically easy but fabricates event precision.

Rejected. Only evidenced timestamps are recorded.

### Treat Front Matter As Ordinary CommonMark

This avoids a parser change but CommonMark turns the metadata into false
headings and makes section declarations dishonest.

Rejected. The source envelope and CommonMark body require an explicit
boundary.

### Regenerate Declarations From Filenames And Headings

This is fast and previously produced mechanically conforming files, but the
audit proved it inferred acceptance and created incorrect semantic bindings.

Rejected. Migration is explicit and reviewed.

## Failure Safety Recovery And Operations

The migration is performed in bounded stages with an audit after each stage:

1. accepted target map;
2. Task transfer and Design classification;
3. front matter and filenames;
4. Realization creation;
5. declaration rebuild; and
6. final validation.

Each move preserves Git rename detection where practical. A machine-readable
migration manifest records old path, new path, stable record ID when
applicable, predecessor digest, successor digest, and change classification.

No Evidence source snapshot is rewritten. No external repository, release,
tag, deployment, or consumer is changed. Recovery uses the checkpoint commit,
the migration manifest, and Git history without destructive reset.

Validation results are generated only after declarations and governed inputs
match the intended snapshot. Intermediate failures are expected migration
state and are not presented as conformance.

## Validation And Decision Evidence

Acceptance requires an independent review proving:

- the target topology implements the agreed lifecycle without a new authority
  layer;
- every current document has exactly one intended target;
- every Design is either correctly classified or reclassified as non-Design;
- every terminal Design disposition has required provenance;
- all Decision filenames preserve four-digit identity and use concise subject
  names;
- every non-Evidence Markdown file receives a non-fabricated UTC
  `created_at`;
- the front-matter envelope parses separately while source digests and secret
  scanning continue to cover its exact bytes;
- CommonMark heading and section processing excludes the envelope;
- malformed or unclosed front matter fails with focused diagnostic coverage;
- unsupported date-only structured fields are not assigned invented times;
- immutable Evidence remains unchanged;
- NKF-003 remaining work is explicitly transferred;
- the Realization set covers the complete current system;
- every moved link resolves;
- every Markdown file has exactly one `.nourd` representation;
- every governed artifact digest matches;
- semantic bindings and relationships are manually reviewed;
- type checking, tests, build verification, CommonMark links, and full-bundle
  self-validation pass; and
- the final report distinguishes accepted architecture, confirmed
  Realization, conformance, and deferred work.

## Unresolved Matters

The exact per-file migration map, Design classification, concise filename map,
predecessor and successor digests, and `.nourd` declaration revisions remain
to be produced and audited before migration acceptance.

The minimal front-matter envelope and CommonMark-body boundary must become
native NKF 0.1 meaning so the repository can self-validate honestly. The
repository-specific keys and their broader portable enforcement are not
proposed as NKF Core metadata semantics in this Task.

Publication, deployment, CI enforcement, external-consumer migration,
presentation guidance, validation expiry, authority freshness, and additional
root profiles remain outside this Design.
