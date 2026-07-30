---
created_at: 2026-07-30T00:27:52Z
---

# ADR 0024: Accept Deterministic Markdown Structure And Title Case

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Codex technical reviewer, acting under explicit
  delegation from and contingent confirmation by the Human Product Owner,
  Nourd ApS
- **Delegation source:** Direct Human Product Owner instruction in the
  NKF-003 discussion on 30 July 2026: “if you confirm then i confirm”
- **Reviewed proposal:**
  [`../evidence/audits/nkf-0.1-checker-realization-gaps.md`](../evidence/audits/nkf-0.1-checker-realization-gaps.md)

## Context

The accepted NKF 0.1 authority pair requires exact Markdown title and section
resolution and stable heading diagnostics, but it does not define a Markdown
grammar, visible-heading normalization, semantic-heading boundary, or
deterministic Title Case policy.

Implementing those behaviors only in checker code would make the checker a
second normative authority. The Human Product Owner also directed that
verifier-addressed structural text be coherently Title Cased, with exact
declared exceptions for canonical terms.

The final technical review found two further requirements:

- only headings at the CommonMark document root can safely define record
  structure; headings inside quotations or lists are content; and
- Unicode casing and word segmentation must be pinned so host runtimes and
  locales cannot change conformance.

## Decision

### Structural Markdown Grammar

Native NKF 0.1 uses CommonMark 0.31.2 to interpret the Markdown structures
required by NKF.

Only heading nodes that are direct children of the CommonMark document root
participate in NKF title, section, path, occurrence, and casing checks.
Headings nested in block quotes, list items, or other containers remain
content. Heading-like text inside fenced code or any construct that does not
produce a top-level heading node does not participate.

Both CommonMark ATX and setext headings count.

This structural dependency does not prohibit body syntax that NKF does not
interpret and does not make NKF responsible for presentation-specific
rendering extensions.

### Heading Comparison String

For a top-level H1, H2, or H3, the checker derives one comparison string from
the parsed inline content:

- visible text, image alternative text, and code-span text are retained;
- link destinations and raw HTML tags are omitted while visible child text is
  retained;
- parsed characters are used for Markdown escapes and character references;
- each whitespace run becomes one U+0020 space;
- leading and trailing whitespace is removed; and
- remaining Unicode code points and case are preserved without additional
  normalization.

The record `title` exactly equals the single H1 comparison string.

### Heading Coverage And Addressing

- A governed record contains exactly one top-level H1. It is the record title
  and is not a declared section.
- Every top-level H2 and H3 has exactly one section declaration.
- Every section declaration resolves exactly one top-level H2 or H3.
- Two declarations cannot resolve the same heading.
- A top-level H3 requires a preceding top-level H2.
- An H2 `heading_path` contains its comparison string.
- An H3 `heading_path` contains the nearest preceding top-level H2 comparison
  string followed by its own comparison string.
- `occurrence` is the one-based source-order index among top-level headings
  with the same complete path.
- Top-level H4 through H6 are subordinate content within their nearest mapped
  H2/H3 section and are not independently addressable. They are invalid
  before any mapped H2/H3.
- Content between H1 and the first H2 belongs to the record generally but
  cannot satisfy a section-bound body responsibility.
- Navigation or metadata that uses top-level H2/H3 is represented like every
  other such heading. Otherwise it does not use H2/H3.

This replaces the non-deterministic “semantic heading” distinction for source
coverage with an observable top-level H2/H3 boundary. It does not establish
semantic adequacy.

### Title Case

Title Case applies to the parsed top-level H1, H2, and H3 comparison strings.
Because `title` and `heading_path` match those strings exactly, the same
visible casing is required in their declarations. Body prose, filenames, IDs,
URLs, quoted or nested-container content, and inline-code contents are outside
this casing rule.

Title Case uses Unicode 17.0.0 Default Case Conversion `toTitlecase` and
Unicode 17.0.0 default word boundaries, without locale-specific tailoring.
Exact inline-code ranges and exact canonical-term ranges are protected from
conversion. Remaining text must already equal the `toTitlecase` result.
Uncased text remains unchanged.

All words, including `And`, `Of`, and `The`, follow the default conversion.
Each hyphen-separated cased component is therefore Title Cased. Acronyms and
other exceptional casing require an exact canonical term.

Canonical phrases:

- match exact code points and case at Unicode word boundaries;
- resolve overlaps longest first, then left-to-right; and
- are exact spellings, not permission for arbitrary casing.

### Canonical Terms

The initial NKF-owned canonical-term set contains exactly:

```yaml
- NKF
```

The closed `nkf.bundle` manifest gains optional `canonical_terms`. It is
omitted when empty. When present it is a non-empty, order-insensitive array of
unique strings.

Each project term:

- is non-empty;
- contains no leading or trailing whitespace;
- uses one U+0020 space between words;
- is a plain comparison string rather than Markdown markup;
- may contain multiple words; and
- retains its exact case-sensitive spelling.

A project term must not repeat or override an NKF-owned term. Comparison for
that conflict uses Unicode 17.0.0 Default Caseless Matching; an exact or
case-only overlap with an NKF-owned term is invalid.

The field is stored in `.nourd/knowledge/bundle.yaml`. It is
source-authoring conformance metadata, not presentation guidance and not a
separate configuration artifact.

### Mermaid

A `mermaid` fenced code block is governed literal Markdown content:

- its exact bytes participate in the source digest;
- it belongs to its containing mapped section;
- its internal text does not participate in heading or Title Case checks;
- native NKF does not execute, render, or validate it;
- the info string is not an NKF extension declaration; and
- an interface may render it or display its source without changing canonical
  meaning.

Essential meaning is also available through ordinary Markdown prose,
structured NKF declarations, or both, so Knowledge Engine processing does not
require Mermaid interpretation. This is a human semantic-review obligation;
deterministic conformance does not prove it.

A generated diagram derived from NKF declarations is a provenance-bearing
projection rather than canonical knowledge. Mermaid semantic validation, if
later required, belongs in a separately governed optional extension.

## Diagnostic Additions

The replacement authority pair adds these stable conformance-blocking source
or project rules:

| Rule ID | Phase | Trigger |
| --- | --- | --- |
| `record.title.case-invalid` | `source` | The parsed top-level H1 does not satisfy the accepted Title Case operation |
| `section.heading.case-invalid` | `source` | A parsed top-level H2/H3 does not satisfy the accepted Title Case operation |
| `section.heading.hierarchy-invalid` | `source` | A structural H3 lacks a preceding H2, or H4-H6 occurs before a mapped H2/H3 |
| `canonical-term.core-conflict` | `project` | A project term repeats or case-conflicts with an NKF-owned term |

Local `canonical_terms` shape, uniqueness, and lexical constraints belong in
the bundle JSON Schema. Existing heading-resolution, duplicate-mapping,
unrepresented-heading, H1-count, title-mismatch, and schema diagnostics retain
their accepted meanings.

## Authority And Realization Boundary

This Decision accepts the exact semantic boundary. It does not modify accepted
Markdown/YAML bytes in place.

The current canonical authority pair must be replaced and rebound through
ADR 0006. Its derived bundle and record schemas must then be replaced and
reconfirmed against the new source digests. Only after those steps may checker
code and fixtures claim to realize this boundary.

The unresolved `nkf.validation-result` serialization and
`security.secret-pattern` trigger remain open. Therefore this Decision does
not authorize a full checker implementation or any conformance claim.

## Compatibility

This is a pre-stable NKF 0.1 clarification and contract extension. Existing
declarations lack `canonical_terms`, which is valid because the field is
optional, but existing Markdown headings may require deliberate Title Case
reconciliation. A consumer must not silently rewrite source headings or
acceptance-bound declarations.

No NKF sub-version is introduced. Updated releases remain identified by the
single NKF `0.1` coordinate and exact artifact digests until a later governed
format-version decision.
