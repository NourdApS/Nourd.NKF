# NKF 0.1 Checker-Realization Gaps

- **Status:** Authority gaps resolved; subsequent checker findings governed
  through ADRs 0034 through 0040
- **Task:** `NKF-003`
- **Prepared:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Authority effect:** None
- **Accepted authority inspected:**
  [`../specifications/nkf-0.1.md`](../specifications/nkf-0.1.md),
  [`../../contracts/nkf/0.1/nkf.yaml`](../../contracts/nkf/0.1/nkf.yaml),
  and the JSON Schemas confirmed by ADR 0030
- **Implementation evidence inspected:** the imported NKF-002 package,
  Markdown parser, checker, and tests under
  `knowledge/evidence/source-snapshots/nourd-studio/`

## Purpose

Identify accepted NKF 0.1 requirements that are not yet deterministic enough
to implement without making checker code a second source of normative
behavior.

This proposal does not change NKF 0.1. It classifies the findings through
ADR 0006 and establishes a review order before checker implementation.

## Verified Implementation Boundary

The accepted authority already determines:

- the Markdown-over-YAML authority relationship;
- native bundle and record serialization;
- the JSON Schema/checker/human-review enforcement partition;
- ordered validation phases and conformance levels;
- stable diagnostic identifiers, severities, blocking effects, and semantic
  triggers;
- required validation-result content at a logical level; and
- the fact that checker results do not accept knowledge or confirm a
  Realization.

The confirmed JSON Schemas enforce local object shapes. The remaining
bundle-aware rules require checker code and fixtures.

The imported NKF-002 checker cannot be promoted as that implementation. It
uses superseded record-contract versions, `markdown_root`, `records_root`, and
older declaration and diagnostic behavior. Its Markdown parser is technical
evidence only and cannot resolve a current authority gap.

## Gap 1: Markdown Heading Interpretation And Coverage

### Accepted Requirement

Each source is UTF-8 Markdown with exactly one H1. Declarations use exact
`heading_path` strings and an occurrence number. Every semantic H2/H3 heading
that contributes meaning must be represented, while introductory metadata, a
title, and generated navigation are not automatically semantic sections.

The stable source diagnostics include:

- `record.h1-count.invalid`;
- `record.title.mismatch`;
- `section.heading.unresolved`;
- `section.heading.duplicate-mapping`; and
- `section.heading.unrepresented`.

### Missing Deterministic Behavior

The authority does not yet define:

- the Markdown grammar used to recognize headings;
- whether setext headings count alongside ATX headings;
- how inline emphasis, code spans, links, entities, escapes, HTML, and
  whitespace produce an “exact heading string”;
- how a nested H2/H3 `heading_path` and its occurrence are calculated; or
- how a checker distinguishes a semantic H2/H3 from a non-semantic one.

Without those rules, two conforming checker implementations can produce
different source diagnostics for the same bytes.

### Concrete Example

Given:

```markdown
# Project A

## **Purpose**

## [Purpose](https://example.invalid)

Purpose
-------

## Contents
```

the current authority does not determine whether all three visible “Purpose”
headings resolve from `heading_path: [Purpose]`, which occurrence each one
has, or whether `Contents` must be represented.

### Resolution Choices

1. **CommonMark interpretation plus complete H2/H3 coverage — recommended.**
   Pin one CommonMark revision for parsing, define exact visible-text
   normalization and path/occurrence calculation, and require every H2/H3 to
   have exactly one section mapping. A heading used only for navigation or
   metadata must not be H2/H3 unless it is intentionally represented.
2. **CommonMark interpretation plus explicit exclusions.** Add a closed,
   reason-bearing declaration structure for non-semantic H2/H3 headings. This
   is more expressive but expands the record contract and schemas.
3. **Human-classified semantic coverage.** Keep source resolution
   deterministic but remove unrepresented-heading completeness from
   conformance. This preserves author freedom but weakens the accepted
   machine-checkable source-authority boundary.
4. **Restricted NKF Markdown subset.** Permit only plain-text ATX H1-H3
   headings. This is simplest to implement but unnecessarily rejects valid
   Markdown and creates a stronger authoring restriction.

The recommended choice makes the checker deterministic without adding another
declaration field. It treats every H2/H3 as an addressable semantic section;
the document title remains the single H1 and ordinary pre-heading text remains
outside the section map.

### Exact Reviewed Boundary

1. Native NKF 0.1 source parsing uses
   [CommonMark 0.31.2](https://spec.commonmark.org/0.31.2/). Heading-like text
   that CommonMark does not parse as a heading is not a heading for NKF.
2. Both ATX and setext headings count, but only when the heading node is a
   direct child of the CommonMark document root. A heading nested in a block
   quote, list item, or other container is content, not an NKF structural
   heading. Headings inside code blocks or other CommonMark constructs that
   do not produce heading nodes do not count.
3. H1, H2, and H3 comparison strings are derived from parsed inline content:
   visible text, image alternative text, and code-span text are retained; link
   destinations and raw HTML tags are omitted while their visible child text
   is retained; character references and Markdown escapes use their parsed
   characters; whitespace runs become one U+0020 space; leading and trailing
   whitespace is removed; and remaining Unicode code points and case are
   preserved without additional normalization.
4. The record `title` must exactly equal the single H1 comparison string.
5. An H2 path is its comparison string. An H3 path is the comparison string of
   its nearest preceding top-level H2 followed by its own comparison string.
   A top-level H3 before any top-level H2 is invalid.
6. `occurrence` is the one-based source-order index among headings with the
   same complete path.
7. Every H2 and H3 must resolve to exactly one declared section, every declared
   section must resolve to exactly one H2 or H3, and two declarations cannot
   resolve to the same heading.
8. H4 through H6 do not create separately addressable NKF sections; their
   content remains within the nearest declared H2/H3 section.
9. Introductory metadata, generated navigation, or other material is exempt
   from separate section mapping only when it is not expressed as H2 or H3. If
   it uses H2 or H3, it is represented like every other such section.
10. Content between H1 and the first H2 belongs to the record generally but
    cannot satisfy a section-bound body responsibility.

### Confirmed Casing Direction

During review on 29 July 2026, the Human Product Owner confirmed the following
direction for the exact gap resolution:

- verifier-addressed structural text uses Title Case;
- casing enforcement covers parsed H1, H2, and H3 comparison strings, record
  `title`, and every `heading_path` component, not Markdown body prose,
  filenames, IDs, URLs, or quoted external text;
- inline code is exempt because it preserves exact technical syntax;
- an explicitly listed canonical term or phrase is valid only in its exact
  declared spelling;
- all text outside an exact canonical-term match must satisfy the mechanical
  Title Case rule;
- NKF-owned canonical terms are governed by the NKF contract;
- project-specific canonical terms are declared in the root `.nourd` bundle
  configuration.

For example, declaring `NKF` permits `NKF Validation Result` and makes `Nkf
Validation Result` invalid. Canonical exceptions are exact spellings, not
permission to use arbitrary casing.

The exact mechanical word/token rule, the initial NKF-owned canonical-term
set, and the bundle field serialization remain to be completed before the
whole Markdown boundary can be accepted and realized.

On 29 July 2026, the Human Product Owner then confirmed this mechanical rule:

1. Each cased word outside a canonical match starts with an uppercase letter
   and continues with lowercase letters.
2. Every word follows that rule, including `And`, `Of`, and `The`; NKF does
   not use a language-specific minor-word dictionary.
3. Each cased component separated by a hyphen follows the rule, so
   `Pre-Stable` is valid and `Pre-stable` is invalid.
4. Numbers, punctuation, and scripts without letter case are neutral.
5. Acronyms and other exceptional casing are valid only through an exact
   canonical-term declaration.
6. When canonical phrases overlap, the longest exact phrase match takes
   precedence.
7. Inline-code content is excluded from casing enforcement.

This makes `Product Strategy And Architecture` and `Pre-Stable Evolution`
valid ordinary Title Case. `NKF Validation Result` is valid when `NKF` is
canonical; `Nkf Validation Result` then conflicts with that canonical
spelling.

The Human Product Owner confirmed the remaining casing decisions on 29 July
2026:

- the initial NKF-owned canonical-term set contains exactly `NKF`;
- the closed `nkf.bundle` manifest gains optional `canonical_terms`;
- the field is omitted when empty;
- when present, it is a non-empty, order-insensitive array of unique,
  non-empty, exact case-sensitive strings;
- entries may contain multiple words;
- exact longest-match behavior applies;
- a project term cannot override an NKF-owned term with different casing; and
- these terms govern source-authoring conformance, not presentation.

For example:

```yaml
canonical_terms:
  - Nourd ApS
  - JSON
  - API
```

The accepted serialization belongs in `.nourd/knowledge/bundle.yaml`; it does
not create another configuration file.

The delegated final technical review pins the mechanical operation to Unicode
17.0.0:

- visible comparison text uses the Unicode 17.0.0 Default Case Conversion
  `toTitlecase` operation and Unicode 17.0.0 default word boundaries;
- exact inline-code ranges and exact canonical-term ranges are protected from
  that conversion;
- canonical phrases match only at Unicode word boundaries;
- overlapping matches resolve longest first, then left-to-right;
- the unprotected text must already equal the result of `toTitlecase`;
- uncased text remains unchanged; and
- no locale-specific casing or word-boundary tailoring is applied.

The checker therefore tests a pinned transformation rather than relying on
host-language or locale casing behavior.

### Confirmed Markdown Grammar And Mermaid Boundary

On 29 July 2026, the Human Product Owner confirmed CommonMark 0.31.2 for the
structural Markdown interpretation used by native NKF 0.1:

- both CommonMark ATX and setext headings count;
- only headings that are direct children of the parsed document root define
  NKF structure; nested headings in quotations, lists, or other containers
  remain content;
- heading-like text inside code or another non-heading construct does not
  count;
- visible heading comparison text retains parsed text and code-span content,
  ignores link destinations and raw HTML tags, uses decoded escapes and
  character references, collapses whitespace, trims its edges, and otherwise
  preserves exact code points and case; and
- record `title` exactly matches the single H1 comparison string.

This structural grammar does not prohibit body syntax that NKF does not
interpret. NKF does not claim responsibility for rendering every Markdown
dialect feature merely because such syntax appears in governed source.

Mermaid fenced code is permitted with this boundary:

- CommonMark and the NKF checker treat it as literal fenced-code content;
- its exact bytes belong to the governed Markdown source and its digest;
- it belongs to its containing mapped section;
- heading-like text and casing inside the fence do not participate in heading
  resolution or Title Case checks;
- native NKF does not execute, render, or validate Mermaid and does not treat
  the info string as an extension declaration;
- an interface may render it or display its source without changing canonical
  meaning;
- essential meaning is also available through ordinary Markdown prose,
  structured NKF declarations, or both, so the Knowledge Engine does not need
  Mermaid interpretation to understand the record; and
- generated diagrams derived from NKF declarations are provenance-bearing
  projections rather than canonical additions.

Mermaid-specific semantic validation remains eligible for a separately
governed optional extension. Renderer version, styling, layout, and
interaction remain presentation concerns.

### Confirmed Coverage And Addressing

On 30 July 2026, the Human Product Owner delegated final confirmation to the
Codex technical reviewer and confirmed the boundary contingent on that
reviewer's approval. The reviewer approves the exact reviewed boundary with
the top-level-heading and Unicode clarifications above.

The resulting coverage behavior is:

- the single top-level H1 is the record title and is not a declared section;
- every top-level H2 and H3 has exactly one section declaration;
- every section declaration resolves exactly one top-level H2 or H3;
- two declarations cannot resolve the same heading;
- a top-level H3 requires a preceding top-level H2;
- H2 paths contain the H2 comparison string;
- H3 paths contain the nearest preceding H2 comparison string followed by the
  H3 comparison string;
- repeated complete paths use one-based source-order `occurrence`;
- H4 through H6 are subordinate content inside their nearest mapped H2/H3
  section and are not independently addressable;
- content before the first H2 belongs to the record generally and cannot
  satisfy a section-bound responsibility; and
- generated navigation or metadata avoids H2/H3 unless it is intentionally
  represented.

This replaces the ambiguous “semantic heading” distinction for deterministic
coverage with the directly observable top-level H2/H3 boundary. It does not
claim that the checker can judge the adequacy or correctness of a section's
meaning.

The accepted semantic boundary is recorded in ADR 0024. The canonical
Markdown/YAML pair, derived schemas, checker, and fixtures have not yet been
updated to realize it.

This resolution changes normative interpretation. ADR 0024 records its
delegated technical acceptance and contingent Human Product Owner
confirmation. A governed replacement of the accepted Markdown/YAML pair
remains required before checker implementation.

## Gap 2: Security.secret-Pattern Trigger

### Accepted Requirement

Live credentials, access tokens, private keys, and secrets are prohibited. A
high-confidence prohibited-material finding emits
`security.secret-pattern` and fails conformance. A passing scan does not prove
that no secret exists.

### Missing Deterministic Behavior

The authority does not define:

- which byte sources and declaration values are scanned;
- the minimum stable pattern or detector registry;
- placeholder, redacted, fixture, example, and digest handling;
- confidence thresholds; or
- whether an evolving provider-specific detector can change conformance
  without an NKF authority revision.

Because rule trigger is stable contract behavior, a checker-specific detector
set would silently change NKF conformance.

### Accepted Resolution

On 30 July 2026, the Human Product Owner confirmed a small exact native
registry rather than removing security from conformance or delegating native
conformance to an external scanner.

The security phase scans the exact safely readable UTF-8 source bytes of the
bundle manifest, every direct `.yaml` declaration candidate, and every
recursive Markdown file under `knowledge_root`. These bytes are Governed
Validation Inputs. No contextual exemption applies to examples, code,
comments, or quoted text.

The exact blocking registry contains:

1. a complete matching PEM/OpenSSH private-key block using one accepted label
   and at least 64 Base64-alphabet bytes between matching header and footer;
2. `ghp_`, `gho_`, `ghu_`, `ghs_`, or `ghr_` followed by at least 36 ASCII
   alphanumeric bytes at the accepted token boundaries; and
3. `sk-proj-` or `sk-` followed by at least 20 ASCII alphanumeric, `_`, or `-`
   bytes at the accepted token boundaries.

Safe placeholders do not match. An AWS access-key identifier alone, generic
password-looking text, JWTs, hashes, digests, Base64, entropy, and provider
tokens outside the exact registry do not fail native conformance.

At most one `security.secret-pattern` error is emitted per logical artifact,
and it never contains the match or surrounding payload. Supplemental scanners
remain outside native results and conformance unless an accepted extension or
later governed NKF revision defines them.

The immutable accepted boundary and complete byte-level mechanics are recorded
in
[`ADR 0026`](../decisions/0026-accept-deterministic-secret-pattern-registry.md).
The canonical Markdown/YAML pair and checker fixtures have not yet been
updated to realize it.

## Gap 3: Nkf.validation-Result Serialization

### Accepted Requirement

The checker emits operational `nkf.validation-result` for NKF `0.1` containing
execution and runner identity, times, checker identity/digest, Markdown/YAML
and schema digests, requested conformance level, every phase state, overall
conformance, declared governance, acceptance-binding verification,
governing-use readiness, and ordered diagnostics. It excludes absolute
project paths, credentials, secrets, and copied operational payloads.

### Missing Deterministic Behavior

The authority names the logical content but does not define:

- JSON/YAML encoding;
- exact field names and nesting;
- value types and required/optional fields;
- closed-object behavior;
- timestamp format;
- single-record versus full-bundle result shape;
- representation of unavailable acceptance binding; or
- a schema identity and canonical artifact path.

Different implementations can therefore emit incompatible results while each
claims to include the named content.

### Recommended Resolution

Define one closed JSON-compatible serialization and derive a third JSON Schema
at:

```text
contracts/nkf/0.1/schemas/validation-result.schema.json
```

The result should identify its requested target explicitly, contain all eleven
phase states in fixed phase order, embed diagnostics using the accepted
diagnostic contract, and remain operational evidence rather than governed
knowledge.

The exact object shape requires separate review before the schema or emitter
is implemented.

### Bounded Technical-Review Delegation

On 30 July 2026, after confirming the consequential storage, verification,
governing-use, request, execution, artifact-binding, phase, diagnostic, and
snapshot boundaries below, the Human Product Owner delegated the remaining
trivial structural serialization choices to the Codex technical reviewer:
“i will let you do through this trivial structural stuff on your own and
confirm them on your own”.

The delegation covers closed JSON grouping, field names, null-versus-omission
behavior, array ordering, schema mechanics, and consequences mechanically
derived from the already confirmed semantics. It does not authorize the
reviewer to change NKF meaning, authority, conformance levels, acceptance
semantics, compatibility, extension power, security policy, or the
Markdown-over-YAML authority model. Any such issue returns to the Human
Product Owner.

### Confirmed Current-Result Storage Boundary

On 30 July 2026, the Human Product Owner confirmed and subsequently refined
the storage boundary:

- native NKF stores exactly one current full-bundle operational result at
  `.nourd/validation-result.json`;
- every completed validation requested at `full-bundle` level atomically
  replaces the previous stored result, including a failed full-bundle
  validation replacing a prior passing result;
- `structural` and single-record `contract` validations return operational
  results to their callers but do not write or replace
  `.nourd/validation-result.json`;
- NKF defines no local result-history structure;
- external CI, observability, or other operational authorities may retain
  history independently;
- the result is not governed knowledge, remains outside `knowledge_root`, and
  requires no record or `non_records` representation;
- the result file is excluded from the validation inputs used to produce its
  own snapshot;
- source-control retention is not required by NKF and the operational file
  should ordinarily remain uncommitted; and
- a result is current only when its `validated_snapshot` digest matches the
  current checker-relevant project snapshot.

For the stored full-bundle receipt, the Knowledge Interface distinguishes:

```text
matching snapshot     current result
different snapshot    stale result
missing result        not yet verified
```

A stale passing result must never be presented as current verification.
Snapshot construction must cover the exact project inputs actually validated,
remain independent of the result file, and be specified deterministically
before checker realization.

### Confirmed Verification Meaning

On 30 July 2026, the Human Product Owner confirmed:

- **NKF Verified** means that the latest stored `full-bundle` result passed NKF
  0.1 conformance, its `validated_snapshot` matches the current Governed
  Validation Inputs, its core specification/YAML/schema bindings match the
  currently accepted NKF 0.1 artifact revision, and its checker artifact
  remains recognized and supported for that revision;
- a missing, stale, or failed stored result is not NKF Verified;
- a stored passing result with a matching project snapshot but obsolete core
  artifact bindings or an unsupported checker is **verification outdated**,
  remains historical operational evidence, and requires a new full-bundle
  validation;
- NKF Verified does not mean that knowledge is accepted, semantically
  adequate or correct, supported by sufficient evidence, Governing Use Ready,
  or realized;
- Draft knowledge may be NKF Verified when it conforms; and
- **Governing Use Ready** remains a separate result requiring applicable
  accepted status, verified acceptance binding, required conformance, and no
  governing-use blocker.

A single-record `contract` result may report that its requested contract
validation passed, but it cannot establish or replace project-level NKF
Verified status.

### Confirmed Governing-Use Aggregation

On 30 July 2026, the Human Product Owner confirmed:

- the stored full-bundle result reports Governing Use Ready for the project and
  separately for every identified governed record;
- project-level `ready` requires every applicable record to be individually
  ready;
- one Draft, contradicted, superseded, retired, conformance-blocked, or
  otherwise governing-use-blocked record makes the project `not-ready`;
- when required acceptance-binding verification was not performed or could
  not be completed, project readiness is `not-evaluated`; and
- a project-level `not-ready` or `not-evaluated` result does not erase an
  individual `ready` result for records whose own requirements are satisfied.

Aggregation uses this strict precedence:

```text
any not-ready       → project not-ready
else any not-evaluated → project not-evaluated
else                → project ready
```

Therefore a known governing-use blocker takes precedence over incomplete
verification elsewhere in the bundle.

Per-record acceptance-binding state is exactly:

```text
not-applicable
not-verified
verified
contradicted
```

Per-record readiness is determined as follows:

| Record condition | Acceptance binding | Governing use |
| --- | --- | --- |
| Declared `draft`, `superseded`, or `retired` | `not-applicable` | `not-ready` |
| Declared `accepted`, but verification unavailable or not performed | `not-verified` | `not-evaluated` |
| Declared `accepted`, but its authority contradicts the claim | `contradicted` | `not-ready` |
| Declared `accepted`, binding verified, conformance passed, and no blocker | `verified` | `ready` |
| Any conformance or governing-use blocker | As observed | `not-ready` |

Within one record, a known blocker therefore takes precedence over
`not-evaluated`, and only the complete satisfied condition produces `ready`.

### Confirmed Validation Request Model

Every result contains this closed request object:

```json
{
  "level": "full-bundle",
  "record_id": null,
  "acceptance_binding": "requested"
}
```

All three fields are required:

- `level` is `structural`, `contract`, or `full-bundle`;
- `record_id` is a non-empty record identifier only for `contract` and is
  otherwise `null`; and
- `acceptance_binding` is `requested` or `not-requested`.

The combinations are closed:

| Level | Target | Acceptance binding | Stored project receipt |
| --- | --- | --- | --- |
| `structural` | Whole project; `record_id: null` | Exactly `not-requested` | Never |
| `contract` | Exactly one required `record_id` | `requested` or `not-requested` | Never |
| `full-bundle` | Whole project; `record_id: null` | `requested` or `not-requested` | Yes |

When acceptance binding is `not-requested`, an accepted record reports
`not-verified` and its Governing Use Ready result is `not-evaluated`.

### Confirmed Execution And Checker Identity

Every result contains these closed objects:

```json
{
  "execution": {
    "id": "3f51dcab-7e3a-4ea8-9668-627a1989f885",
    "runner": "nourd-knowledge-engine",
    "started_at": "2026-07-30T14:30:00.000Z",
    "completed_at": "2026-07-30T14:30:02.417Z"
  },
  "checker": {
    "identity": "nourd-nkf-checker",
    "digest": {
      "algorithm": "sha-256",
      "value": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    }
  }
}
```

`execution.id` is a unique lowercase UUID. `runner` is a non-empty portable
identity for the system that initiated the run, not a username, hostname,
absolute path, credential, or copied operational payload. `started_at` and
`completed_at` use fixed UTC RFC 3339 form with milliseconds:
`YYYY-MM-DDTHH:mm:ss.sssZ`. Completion cannot precede start.

`checker.identity` is a non-empty portable checker identity. `checker.digest`
uses exactly `sha-256` and a 64-character lowercase hexadecimal value binding
the exact checker artifact used. Runner and checker remain separate because
different runners may invoke the same checker artifact.

The checker development/package identity and the exact released artifact whose
bytes supply this digest remain part of later checker distribution design.
They cannot be inferred from this accepted result shape.

### Confirmed Contract-Artifact Binding

Every result identifies the exact rule artifacts against which validation ran:

- the canonical NKF Markdown specification;
- the executable NKF YAML companion;
- the bundle, record, and validation-result JSON Schemas; and
- both authority artifacts for every extension contract involved in the
  requested validation.

Artifacts are represented by bindings, not copied content or filesystem paths:

```json
{
  "expected_sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  "observed_sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  "binding": "verified"
}
```

All three fields are required. `expected_sha256` is the required
64-character lowercase hexadecimal digest. `observed_sha256` is the
64-character lowercase hexadecimal digest actually resolved, or `null` when
unavailable. `binding` is exactly `verified`, `unavailable`, or `mismatched`.
`verified` requires equal expected and observed values; `unavailable` requires
a null observed value; and `mismatched` requires a non-null observed value
different from expected.

The result never embeds specification, executable, schema, or extension
content and never records their absolute filesystem locations.

Artifact bindings use this closed grouping:

```json
{
  "contract_artifacts": {
    "core": {
      "specification": {},
      "executable": {},
      "schemas": [
        {
          "identity": "urn:nkf:0.1:schema:bundle"
        },
        {
          "identity": "urn:nkf:0.1:schema:record"
        },
        {
          "identity": "urn:nkf:0.1:schema:validation-result"
        }
      ]
    },
    "extensions": []
  }
}
```

Each displayed empty object additionally contains its applicable binding
fields defined above. The three schema entries are present exactly once in the
fixed order shown. Each schema entry is closed and contains its exact
`identity`, `expected_sha256`, `observed_sha256`, and `binding`.

`extensions` contains one closed entry for every uniquely identified extension
contract involved in the requested validation. Each entry contains `id`,
`specification`, and `executable`; both nested artifacts use the accepted
binding shape. Entries sort by exact extension ID. No involved extension
produces an empty array. Ambiguous or invalid declarations fail through
diagnostics; the checker does not invent an extension identity or binding.

### Confirmed Phase Serialization

Every result contains all eleven phases exactly once in this fixed array order:

```json
[
  {"id": "contracts", "state": "passed"},
  {"id": "parse", "state": "passed"},
  {"id": "schema", "state": "passed"},
  {"id": "project", "state": "passed"},
  {"id": "source", "state": "passed"},
  {"id": "extension-resolution", "state": "passed"},
  {"id": "bundle-graph", "state": "passed"},
  {"id": "record-contract", "state": "passed"},
  {"id": "security", "state": "passed"},
  {"id": "authority-binding", "state": "not-evaluated"},
  {"id": "result", "state": "passed"}
]
```

Each entry is closed with required `id` and `state`. State is exactly
`passed`, `failed`, or `not-evaluated`:

- `passed` means the phase's required work completed successfully;
- `failed` means it ran but did not satisfy its obligation; and
- `not-evaluated` means it was not requested or applicable, or an earlier
  failure prevented safe or meaningful evaluation.

Authority binding is `not-evaluated` when not requested. A failed
authority-binding phase can block Governing Use Ready without failing NKF
conformance because it is not a conformance-required phase.

In every conforming emitted validation result, the `result` phase is
`passed`: it means the receipt was successfully constructed and validated in
memory. Failure to produce a valid receipt means no completed validation
result exists. It is distinct from a completed full-bundle validation whose
conformance failed; that failure still produces and atomically stores a valid
receipt with earlier failed phases and a passed `result` phase.

### Confirmed Diagnostic Serialization

Every result contains a `diagnostics` array. An error-free result uses an empty
array. Each diagnostic is a closed object with required `rule_id`, `severity`,
`blocking`, `phase`, and `message`, plus only these optional fields when known:
`artifact`, `record_id`, `instance_pointer`, `source_section`, and
`remediation`. Unknown optional values are omitted rather than serialized as
`null`.

`artifact` is an exact project-root-relative logical path using `/`; absolute
paths are forbidden. Diagnostic content excludes credentials, secrets, and
copied operational payloads.

Diagnostics use the accepted order:

1. phase in fixed validation-phase order;
2. artifact;
3. record ID;
4. instance pointer;
5. source section; and
6. rule ID.

For optional sort fields, absence sorts before presence. Present strings sort
using the RFC 8785 unsigned UTF-16 comparator without Unicode normalization or
case folding. Two diagnostics cannot have the same phase, artifact, record ID,
instance pointer, source section, and rule ID tuple; duplicate diagnostic
identity is prohibited.

Rule ID, severity, blocking behavior, and semantic trigger remain contractual.
Human-readable `message` and optional `remediation` do not participate in
ordering and may improve between checker releases.

### Reviewer-Confirmed Record Summaries

Under the bounded technical-review delegation, the reviewer confirms that
every result contains a `records` array of closed objects:

```json
{
  "record_id": "product",
  "declared_governance": {
    "lifecycle": "living",
    "status": "accepted",
    "authority": ["human-product-owner"],
    "accepted_at": "2026-07-30"
  },
  "conformance": "passed",
  "acceptance_binding": "verified",
  "governing_use": "ready"
}
```

All five fields are required. `declared_governance` is the exact locally valid
governance object from the declaration, preserving declared authority order
and omitting `accepted_at` when absent. It is `null` when governance cannot be
safely represented as a valid NKF governance object; diagnostics preserve the
failure, acceptance binding is `not-verified`, and governing use is
`not-ready`.

Per-record `conformance` is `passed`, `failed`, or `not-evaluated` for the
requested conformance level, not an acceptance statement. A globally
conformance-blocking failure attributable to all in-scope records fails each
record; an earlier failure that prevents safe record evaluation produces
`not-evaluated`.

The array contains:

- every uniquely identified in-scope record for `structural`;
- only the uniquely resolved requested record for `contract`; and
- every uniquely identified governed record for `full-bundle`.

An ambiguous or duplicate record identity contributes no invented or merged
record result. Diagnostics report the failure. Records sort by exact
`record_id` using the RFC 8785 unsigned UTF-16 comparator without
normalization or case folding.

### Reviewer-Confirmed Result Container And Encoding

Every validation result is one UTF-8 JSON document containing exactly one
closed object. A byte-order mark, comments, duplicate member names, additional
top-level fields, and non-JSON values are forbidden. JSON member order and
insignificant whitespace carry no meaning; array orders defined by NKF remain
contractual.

The top-level object has exactly these thirteen required fields:

```json
{
  "contract": "nkf.validation-result",
  "nkf_version": "0.1",
  "execution": {},
  "checker": {},
  "contract_artifacts": {},
  "request": {},
  "bundle_id": null,
  "validated_snapshot": {},
  "phases": [],
  "conformance": "failed",
  "records": [],
  "governing_use": "not-ready",
  "diagnostics": []
}
```

`contract` is exactly `nkf.validation-result` and has no independent version.
`nkf_version: "0.1"` is the only NKF version coordinate. `bundle_id` is the
valid parsed bundle identifier or `null` when unavailable. The request already
identifies a single-record target, so no competing `resolved_target` object is
introduced.

`validated_snapshot` is closed and contains:

```json
{
  "algorithm": "sha-256",
  "canonicalization": "rfc8785-jcs",
  "value": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  "entry_count": 47
}
```

All four fields are required. `entry_count` is a non-negative integer equal to
the internal inventory length.

Top-level `conformance` is `passed` only when every phase required by the
requested conformance level passed; otherwise it is `failed`.
Authority-binding state does not change conformance.

Top-level Governing Use Ready is:

- always `not-evaluated` for `structural`;
- the uniquely resolved target record's result for `contract`, or `not-ready`
  when the target is missing or ambiguous; and
- the confirmed per-record aggregate for `full-bundle`.

No `current`, `verified`, `accepted`, `stored`, or Realization field is
serialized. Current project-level NKF Verified status is derived from the
stored full-bundle result rather than frozen inside it.

The derived JSON Schema uses JSON Schema 2020-12 at:

```text
contracts/nkf/0.1/schemas/validation-result.schema.json
```

with identity `urn:nkf:0.1:schema:validation-result`. The current review
artifact remains non-authoritative at
[`nkf-0.1-validation-result-schema-proposal.json`](nkf-0.1-validation-result-schema-proposal.json)
until the canonical Markdown/YAML pair is revised and rebound.

This aggregation does not change NKF conformance. A bundle containing Draft
knowledge can be NKF Verified while remaining not ready for governing use as a
whole.

### Confirmed Snapshot Input Boundary

On 30 July 2026, the Human Product Owner defined **Governed Validation
Inputs** as the set of project resources that participate in NKF validation.
NKF Core defines the initial set. An accepted extension may add resource kinds
through its governed extension contract. A checker implementation cannot add
inputs by discretion.

The validated snapshot is calculated solely from the exact observed state of
the Governed Validation Inputs. A resource contributes only the aspects that
the applicable validation rule examines: path or structural facts, exact
bytes, or both.

The Human Product Owner confirmed the initial input boundary:

- the `.nourd` contribution covers all checker-relevant configuration,
  declarations, paths, and exact file content, except
  `.nourd/validation-result.json` itself;
- exact file-content hashing under `knowledge_root` always covers the
  recursive Markdown file set: each Markdown file's project-relative path and
  exact file content;
- adding, removing, renaming, or editing one of those Markdown files changes
  the snapshot;
- a non-Markdown file, file type, path fact, or exact content is additionally
  included only when an accepted NKF Core rule or accepted extension contract
  makes it an input whose change can alter the requested validation result;
- this additional inclusion is contract-determined and cannot be chosen ad
  hoc by a checker implementation;
- an unreferenced non-Markdown asset with no applicable validation rule is
  excluded;
- a non-Markdown path explicitly listed in `non_records` contributes the
  existence, file-kind, containment, uniqueness, and classification facts that
  NKF validates, but its bytes are included only if an applicable accepted
  rule validates those bytes; and
- independently governed symlink checks still apply and cannot be bypassed by
  the snapshot input selection.

Under the bounded technical-review delegation, NKF Core's initial Governed
Validation Inputs are mechanically enumerated as:

1. the fixed `.nourd`, `.nourd/knowledge`,
   `.nourd/knowledge/bundle.yaml`, and
   `.nourd/knowledge/records` paths and the structural facts NKF examines;
2. the exact bundle bytes when safely readable;
3. every direct filesystem entry in the flat declaration directory, with
   exact bytes for every safely readable `.yaml` declaration candidate and
   structural facts only for entries whose bytes NKF does not inspect;
4. the safely resolved `knowledge_root` directory and every recursively
   discovered Markdown logical path and exact Markdown bytes;
5. every safely interpretable declared record-source and `non_records` path,
   including a missing-path observation when the declared logical path is
   valid but absent;
6. every path component and symlink-resolution fact examined to establish
   kind, containment, uniqueness, and safe resolution for another Governed
   Validation Input; and
7. project-contained resources added deterministically by an involved,
   resolved, supported extension contract.

Discovery follows validation-phase safety. An earlier parse or schema failure
may limit the set to resources that can be identified safely; the checker
never traverses an invalid or unsafe path to enlarge the snapshot. The result
file itself, unrelated `.nourd` content, unreferenced non-Markdown assets, and
external authority or operational resources are excluded unless an accepted
rule explicitly makes a project-contained resource a Governed Validation
Input.

This confirmation settles which project content contributes to freshness. It
does not permit a checker to widen or narrow that content by implementation
choice.

### Confirmed Snapshot Calculation Model

On 30 July 2026, the Human Product Owner confirmed:

1. Represent the Governed Validation Inputs in one internal JSON inventory.
2. Let the applicable accepted rule determine selection and which aspects
   participate, then represent the resulting input through its logical path,
   structural state, and a SHA-256 content digest when exact bytes
   participate.
3. Sort inventory entries deterministically.
4. Canonicalize the inventory as UTF-8 JSON using the JSON Canonicalization
   Scheme defined by RFC 8785.
5. Calculate the validated snapshot value by applying SHA-256 to those
   canonical UTF-8 bytes.
6. Store the final digest and inventory entry count in
   `.nourd/validation-result.json`, but do not store the internal inventory.

### Confirmed Closed Snapshot Inventory

On 30 July 2026, the Human Product Owner confirmed this internal inventory
shape:

```json
{
  "contract": "nkf.validation-snapshot",
  "nkf_version": "0.1",
  "inputs": [
    {
      "path": "knowledge/product.md",
      "direct_kind": "regular-file",
      "resolution": "direct",
      "resolved_path": "knowledge/product.md",
      "final_kind": "regular-file",
      "content_sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    }
  ]
}
```

The internal object is closed. `contract` is exactly
`nkf.validation-snapshot`; it has no independent version.
`nkf_version: "0.1"` is the sole NKF version coordinate.

Every input entry is closed and contains all six fields:

- `path` is the exact project-root-relative logical path using `/`;
- `direct_kind` is `missing`, `regular-file`, `directory`,
  `symbolic-link`, or `other`;
- `resolution` is `direct`, `contained`, `broken`, `cyclic`,
  `outside-project`, `outside-knowledge-root`, or `not-applicable`;
- `resolved_path` is the exact project-relative final path when a final path
  exists inside the project, and is otherwise `null`;
- `final_kind` is `regular-file`, `directory`, or `other` when safely
  resolved, and is otherwise `null`; and
- `content_sha256` is the 64-character lowercase hexadecimal SHA-256 of the
  exact final file bytes when any applicable accepted rule validates those
  bytes, and is otherwise `null`.

There is one entry per logical project path. When several applicable rules
select the same path, they merge into that entry; content participates when
any one of those rules validates exact bytes.

Entries sort in ascending exact `path` order using the unsigned UTF-16
code-unit comparator defined for strings by RFC 8785. Path strings receive no
Unicode normalization or case folding. The resulting unique logical paths
make a secondary sort key unnecessary. JSON object members are canonicalized
by RFC 8785 JCS, array order remains the required path order, and
`entry_count` is the length of `inputs`.

The internal inventory is used only to calculate the snapshot value and is
not written into the validation result. This closes the snapshot algorithm.

### Consequential Freshness Review

The structural review found two semantic freshness questions outside the
technical delegation.

The Human Product Owner confirmed the first:

- project snapshot equality alone is insufficient for current NKF Verified
  status;
- the stored core specification, executable YAML, and schema bindings must
  match the currently accepted NKF 0.1 artifact revision;
- the stored checker artifact must remain recognized and supported for that
  revision; and
- otherwise the receipt remains historical evidence but status is
  **verification outdated** until a new full-bundle validation completes.

The Human Product Owner clarified the second question:

- a normal change to acceptance follows the governed change process;
- its changed decision, declaration, provenance, or other governed resource
  changes the applicable Governed Validation Inputs and therefore invalidates
  snapshot equality;
- when no governed input changes, NKF does not infer a hidden acceptance
  change or independently poll an authority; and
- an external change made without its required governed representation is not
  observable by current NKF verification.

This resolves the question for the current validation-result boundary. NKF
0.1 does not currently impose a universal expiry or a separate
authority-freshness mechanism. Whether real consumer evidence later justifies
either mechanism is deferred to
[`NKF-005`](../tasks/NKF-005-investigate-validation-expiry-and-authority-freshness.md)
and does not block the current result contract.

The complete validation-result meaning and exact structural serialization are
accepted by
[`ADR 0025`](../decisions/0025-accept-nkf-0-1-validation-result-contract.md).
[`ADR 0039`](../decisions/0039-accept-invocation-precondition-authority-pair.md)
accepts the current normative Markdown and strict-YAML executable companion.
[`ADR 0040`](../decisions/0040-confirm-invocation-precondition-json-schema-bindings.md)
confirms the exact current source-bound validation-result schema together with
the bundle and record schemas.

## Non-Blocking Extension Boundary

NKF 0.1 defines extension declaration and resolver behavior but supports no
concrete core extension. The checker can therefore accept an explicitly
injected resolver interface:

- a required extension that is unresolved, digest-mismatched,
  identity-mismatched, or unsupported fails closed;
- an optional unsupported extension emits the accepted warning; and
- the checker does not invent a universal locator syntax or perform unsafe
  automatic dereferencing.

This boundary does not prevent native core checker implementation once the
three gaps above are resolved.

## Repository-Realization Boundary

The accepted authority does not determine a checker language, package name,
source directory, CLI, fixture directory, or distribution mechanism.

A Node.js 22, TypeScript ESM implementation using strict YAML parsing, Ajv
2020-12, and Vitest would be consistent with the imported evidence and the
confirmed schemas, but that is still a realization proposal. Repository
layout and development package identity should be confirmed after the
conformance-critical behavior is settled. Release and public distribution
remain later work.

## Decision And Implementation Order

Completed pre-checker authority work:

1. ADR 0024 confirms Markdown parsing, heading normalization,
   path/occurrence, complete H2/H3 coverage, Title Case, canonical terms, and
   Mermaid.
2. ADR 0025 confirms exact validation-result meaning and serialization.
3. ADR 0026 confirms the native security trigger and detector governance.
4. ADR 0027 replaces and rebinds the accepted Markdown/YAML authority pair.
5. ADR 0028 confirms all three source-bound derived schemas.
6. ADR 0029 reconciles the specification's schema-realization status.
7. ADR 0030 rebinds and confirms all three schemas without changing their
   assertion graphs.
8. ADR 0032 corrects three invalid YAML flow scalars without changing their
   parsed meaning.
9. ADR 0033 rebinds and reconfirms all three schemas.
10. ADR 0031 establishes the checker development layout and artifact identity.
11. ADRs 0034 through 0040 govern all five findings exposed by native checker
    implementation and establish the current authority and schema bindings.

Remaining realization order:

1. bind the implemented checker and complete 115-rule fixture-reference matrix
   to an immutable source checkpoint;
2. independently confirm that exact development Realization without claiming
   release readiness or consumer conformance; and
3. separately establish distribution, integrity, release, support, and
   deliberate consumer migration.

## Current Conclusion

All three conformance-critical authority gaps found by this review are now
resolved. ADRs 0039 and 0040 establish the current canonical pair and exact
derived schemas.

The native checker and its complete 115-rule fixture-reference matrix now
exist as locally verified, unconfirmed development-Realization evidence. The
next boundary is an immutable source checkpoint and separate technical
confirmation. Distribution, release, consumer migration, and consumer
conformance remain later work.
