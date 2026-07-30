# NKF-007 Front-Matter Parser Finding

- **Task:** `NKF-007`
- **Status:** Evidence
- **Recorded At:** `2026-07-30T16:36:17Z`
- **Reviewer:** Codex
- **Authority Effect:** None

## Purpose

This Evidence preserves a failure found during independent review of the
active NKF-007 knowledge-architecture proposal. It does not accept a solution.

## Reproduction

The active Design began with standard YAML front matter:

```yaml
---
created_at: 2026-07-30T16:27:13Z
design_disposition: active
---
```

The repository's current Markdown parser passed the complete source directly
to CommonMark 0.31.2. CommonMark does not define YAML front matter. It
interpreted the opening delimiter and metadata as a Setext level-two heading.

The resulting heading text was:

```text
created_at: 2026-07-30T16:27:13Zdesign_disposition: active
```

## Consequence

Adding the required front matter to every non-Evidence Markdown file without
changing the parsing boundary would:

- create false semantic headings;
- break H1 and section-map expectations;
- trigger Title Case and unrepresented-heading diagnostics;
- make declarations bind metadata as if it were knowledge meaning; and
- prevent honest NKF self-validation.

Front matter therefore cannot remain only a repository-writing convention
while the native checker treats the complete bytes as CommonMark body content.

## Required Design Correction

The reviewed solution must distinguish:

1. the exact source bytes, which include front matter and remain covered by
   the source digest and secret scan;
2. a bounded front-matter envelope, which is parsed separately; and
3. the CommonMark body, whose headings and sections carry semantic Markdown
   meaning.

The minimal format and checker support required for that separation is in
scope for NKF-007 self-adoption. Making repository-specific fields such as
`created_at` or `design_disposition` portable NKF Core fields, and broadly
enforcing their semantics in other consumers, remains a separate decision.
