---
id: design-nkf-0-1-governed-frontmatter
type: design
summary: This Design addresses the missing human-orientation and synchronization contract for NKF Markdown frontmatter.
created_at: 2026-07-30T19:47:30Z
record_lifecycle: immutable
record_status: accepted
task: NKF-010
design_disposition: adopted
design_decisions:
  - adr-0058
---

# NKF 0.1 Governed Frontmatter

- **Task:** `NKF-010`
- **Design Disposition:** Adopted
- **Adopting Decision:** `ADR-0058`
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Authority Boundary:** This Design proposes the exact realization of the
  accepted frontmatter direction. ADR 0058 adopts it, while current normative
  meaning belongs to the NKF 0.1 Specification.

## Design Kind Problem And Scope

This Design addresses the missing human-orientation and synchronization
contract for NKF Markdown frontmatter.

NKF 0.1 currently defines a safe optional YAML envelope but gives arbitrary
frontmatter keys no portable meaning. The NKF repository consequently exposes
only `created_at` in most current documents, while Design disposition remains
a repository convention. A person or agent opening a source must inspect body
metadata, infer document kind from its location, and consult `.nourd` before
basic identity and lifecycle state are clear.

The accepted direction requires every non-Evidence Markdown document to expose
basic orientation at the top and requires deterministic agreement between
frontmatter, the CommonMark H1, and any `.nourd` record declaration.

This Design does not make frontmatter a replacement for substantive Markdown
meaning, make a summary proof of semantic adequacy, make Tasks native NKF
records, add `updated_at`, create another version namespace, rewrite Evidence,
or let validation establish acceptance or Realization confirmation.

## Governing Inputs And Constraints

- Markdown remains the canonical human-readable authority.
- The CommonMark body continues to own substantive canonical human meaning.
- The frontmatter envelope owns governed document-orientation metadata.
- `.nourd` remains the executable representation and project-control surface.
- Record identity and declared governance already exist in `.nourd` and can be
  compared deterministically.
- Task execution and operational state remain outside NKF authority.
- Design disposition and record authority are independent axes.
- Realization confirmation and conformance remain independent.
- Every governed frontmatter date uses a full RFC 3339 UTC timestamp with
  `Z`.
- Evidence must remain byte-preserving and exempt from current authoring
  conventions.
- NKF has one version coordinate, currently `0.1`.

## Proposed Direction

NKF 0.1 defines one governed source-envelope model. The model applies to every
Markdown file represented by an NKF bundle except an explicitly classified
Evidence record or Evidence non-record.

### Common Orientation Fields

Every applicable Markdown source requires:

```yaml
---
title: "Human-Readable Document Title"
summary: "A concise orientation summary."
created_at: 2026-07-30T19:47:30Z
---
```

The requirements are:

- `title` is a non-empty, trimmed, single-line string and exactly equals the
  visible text of the document's one top-level H1;
- `summary` is a non-empty, trimmed, single-line string that orients a reader
  but does not prove semantic completeness or correctness;
- `created_at` is a real calendar instant serialized exactly as
  `YYYY-MM-DDTHH:mm:ssZ`;
- each field occurs exactly once because safe frontmatter already forbids
  duplicate YAML keys; and
- YAML key order, quoting style, and whitespace are non-semantic.

The checker validates presence, type, shape, and exact deterministic
equalities. Semantic review remains responsible for whether `summary`
accurately represents the document.

### Record Orientation Fields

Every applicable NKF record source additionally requires:

```yaml
id: record-identity
type: decision
record_lifecycle: immutable
record_status: accepted
```

Each value exactly equals the corresponding `.nourd` record declaration:

| Frontmatter | Record declaration |
| --- | --- |
| `id` | `id` |
| `type` | `type` |
| `record_lifecycle` | `governance.lifecycle` |
| `record_status` | `governance.status` |
| `title` | `title` |

The existing declaration-to-H1 equality remains required. Frontmatter
therefore exposes identity and declared authority state to the reader without
creating a second authority. A mismatch fails conformance; the checker does
not choose a winner or rewrite either source.

### Design Orientation Fields

A record with `type: design` additionally requires its independent proposal
disposition:

```yaml
design_disposition: adopted
design_decisions:
  - adr-0058
```

The supported dispositions remain `active`, `adopted`, `rejected`,
`superseded`, and `withdrawn`.

- Every Design requires `task`; the reference identifies the Task that owns
  the exact proposal work without making the Task an NKF record.
- Adopted and Rejected require one or more `design_decisions`.
- Superseded requires one or more `superseded_by` references and may retain
  the Decisions that governed its earlier disposition.
- Withdrawn requires `withdrawal_source`.
- Provenance keys that do not apply to the selected disposition are forbidden.

These fields describe the direction proposed by the Design. They do not
determine `record_lifecycle` or `record_status`.

### Realization Orientation Fields

A record with `type: realization` additionally requires:

```yaml
task: NKF-010
confirmation_status: confirmed
confirmation_decisions:
  - adr-0060
```

`confirmation_status` is `unconfirmed`, `partially-confirmed`, or `confirmed`.
Confirmed requires one or more `confirmation_decisions`; Unconfirmed forbids
them; Partially Confirmed requires them and requires the CommonMark body to
state the unconfirmed boundary. Partially Confirmed also requires a non-empty
`unconfirmed_scope` orientation string so the boundary is visible at the top.

The checker validates field and provenance shape. It does not prove that the
referenced authority actually confirmed the claim unless authority-binding
verification is separately requested and supported.

### Task Provenance For Lifecycle Records

Design, Decision, Specification, and Realization records additionally require
one non-empty `task` identifier. It identifies the Task that owns production
of the exact record revision.

The reference must resolve to exactly one Task non-record in the same bundle.
Resolution proves only internal traceability. It does not prove that the Task
state is operationally true, that its acceptance criteria were met, or that
the record was accepted or confirmed.

Specification currency is not represented through a separate
`specification_status`. Its exact record authority state, accepted governing
Decisions, successor provenance, and bundle context already own that meaning.
Adding another state would create an inadequately scoped competing axis.

### Task Non-Record Orientation Fields

NKF adds `task` to the bundle `non_records[].kind` vocabulary. A Task remains
an operational non-record and additionally requires:

```yaml
task_id: NKF-010
task_status: active
```

`task_id` is a non-empty string unique across Task non-records. The allowed
`task_status` values are `active`, `deferred`, and `completed`. The containing
project supplies the state; NKF validates the declared projection and
reference graph. It does not execute, schedule, close, or become authoritative
for the Task.

NKF Core does not infer Task state from directory names. A Root Profile,
extension, or repository policy may separately require a navigation
projection such as `tasks/active/`, `tasks/deferred/`, and
`tasks/completed/`.

### Evidence Classification And Exemption

Evidence exclusion must be declared, not guessed from a path.

- A record with `type: evidence` is exempt.
- NKF adds `evidence` to the bundle `non_records[].kind` vocabulary; an
  Evidence non-record is exempt.
- An Evidence source may omit frontmatter entirely.
- If its bytes begin with an exact frontmatter delimiter, the safe-envelope
  parser still rejects malformed or unsafe YAML, but NKF does not require or
  interpret current orientation fields.
- A path beginning with `evidence/` does not itself create the exemption.

This preserves exact evidence bytes and prevents consumers from gaining an
unrecorded exemption through folder naming.

### Optional Provenance References

The following orientation references are recognized when applicable:

- `task`: one non-empty Task identifier;
- `task_id`: one non-empty Task identity on a Task non-record;
- `design_decisions`: a non-empty unique list of Decision identifiers;
- `superseded_by`: a non-empty unique list of replacement identifiers;
- `withdrawal_source`: one closed mapping containing `kind: task | record` and
  one non-empty `id`; and
- `confirmation_decisions`: a non-empty unique list of Decision identifiers.

Record references use exact NKF record IDs and resolve to exactly one record
of the applicable type. Task references use exact `task_id` values and resolve
to exactly one Task non-record. They are document-orientation references. They
do not replace NKF record relationships, authoritative acceptance bindings,
or substantive provenance in the body.

### Closed Core Key Vocabulary

For applicable native NKF sources, keys defined by this contract are closed by
document class. A key is allowed only when the common, record, record-type, or
non-record-kind profile permits it.

Additional keys require an accepted Root Profile or extension allocation. An
unknown native key fails closed rather than being silently interpreted or
ignored. Evidence remains exempt from current key interpretation.

### Diagnostics

NKF introduces stable source diagnostics for:

- required frontmatter missing;
- a required key missing;
- an unsupported key;
- an invalid value or value shape;
- a title-to-H1 mismatch;
- a record-identity or governance mismatch;
- invalid `created_at`;
- invalid Design disposition or provenance;
- invalid Realization confirmation provenance;
- invalid Task identity, status, or reference resolution.

Existing `markdown.frontmatter.invalid` remains the diagnostic for unsafe,
malformed, empty, multi-document, or unclosed envelopes.

### Migration And Compatibility

This is a breaking successor serialization revision within pre-stable NKF
0.1. A previously conforming non-Evidence Markdown source containing only
`created_at` no longer conforms after the accepted revision.

NKF does not retain the older envelope as a parallel native contract. Consumer
projects migrate deliberately by updating sources, declarations, checker
distribution, and validation evidence together.

The NKF repository migration:

1. leaves all Evidence bytes unchanged;
2. adds common orientation to every other Markdown file;
3. adds declaration-bound fields to every non-Evidence record source;
4. adds applicable Design, Realization, Specification, and Task fields;
5. changes Evidence non-record entries to `kind: evidence`;
6. changes Task non-record entries to `kind: task`;
7. recalculates source and governed-artifact digests;
8. updates the authority pair, Schemas, checker, fixtures, tests, and current
   Realizations; and
9. records exact successor acceptance and Realization confirmation.

## Responsibilities Interactions And Information Flows

```text
Human Or Agent Author
        │
        ▼
Markdown Frontmatter ── exact equality ── CommonMark H1
        │
        ├── record identity and governance ── exact equality ── .nourd record
        │
        └── orientation and lifecycle projection ── semantic review
                                      │
                                      ▼
                               NKF Checker
                                      │
                                      ▼
                          Conformance Observation
```

The author supplies orientation. The checker validates deterministic
properties. Human authority accepts meaning and separately confirms
Realization. Git, CI, and validation provide evidence but do not perform those
authority acts.

## Alternatives And Trade-Offs

### Keep Only Created At

Rejected because it preserves source provenance but does not expose identity,
purpose, authority state, or lifecycle orientation.

### Put All Orientation Only In Nourd

Rejected because a reader should not need to resolve an executable declaration
before knowing what a Markdown source is. It would also weaken Markdown as the
canonical human-readable form.

### Copy Every Declaration And Relationship Into Frontmatter

Rejected because it would create a large competing serialization and
unnecessary synchronization surface. Only basic identity, declared governance,
and applicable lifecycle orientation are duplicated.

### Use One Generic Status

Rejected because record authority, Task state, Design disposition,
Specification currency, and Realization confirmation answer different
questions and must remain independent.

### Require Updated At

Rejected because Git already records changes, mechanical edits create
meaningless timestamp churn, and modification time does not prove semantic
review. A future authority-freshness or review-time feature remains separate.

### Infer Evidence From Its Directory

Rejected because `knowledge_root` and internal knowledge topology are
configurable. Exemption must be explicit and machine-verifiable.

### Treat Summary As Verified Meaning

Rejected because deterministic validation cannot prove that a short summary
semantically represents the complete body. The summary is governed
orientation, and its adequacy remains a review responsibility.

## Consequences And Trade-Offs

The positive consequences are immediate human orientation, better agent
routing, deterministic source-to-declaration synchronization, explicit
lifecycle vocabulary, and an enforceable foundation for early authoring
feedback.

The costs are a repository-wide successor migration, changed immutable source
digests, additional checker and fixture complexity, and a continuing semantic
review obligation for summaries and provenance claims.

The closed field vocabulary reduces accidental metadata drift but requires an
accepted profile or extension change before a new portable key can be used.

## Risks And Failure Modes

- Generic summaries may satisfy shape checks while remaining unhelpful.
- A checker may wrongly treat directory location as authority instead of a
  consistency projection.
- A migration may alter Evidence or lose predecessor exact revision
  provenance.
- Frontmatter may become a second substantive specification if too much body
  meaning is copied into it.
- Task linkage may be mistaken for Task operational authority or completion
  proof.
- Record acceptance and Design disposition may be collapsed accidentally.
- Realization confirmation may be claimed merely because a Decision
  identifier is present.
- A consumer may update sources without updating the checker and declarations
  atomically.

Each risk requires explicit tests, audit evidence, or authority separation in
the final realization.

## Acceptance Criteria

- The exact field vocabulary and applicability matrix is unambiguous.
- Evidence exemption is explicit and path-independent.
- Every deterministic equality and lifecycle shape has a stable diagnostic.
- The model preserves Markdown authority, Task operational separation, Design
  disposition independence, Realization confirmation independence, and the
  single NKF version namespace.
- The NKF repository can migrate without editing Evidence.
- An independent review finds no material contradiction before adoption.
