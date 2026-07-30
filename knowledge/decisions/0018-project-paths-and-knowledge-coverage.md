---
created_at: 2026-07-29T20:06:17Z
---

# ADR 0018: Accept NKF 0.1 Project Path And Knowledge Coverage

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed confirmation of the exact fixed
  `.nourd` and configurable knowledge-root interpretation in the NKF-003
  discussion on 29 July 2026

## Context

The accepted NKF 0.1 specification describes a location-independent bundle
with manifest-relative `markdown_root` and `records_root` values. Review of
actual Nourd project organization established a different intended boundary:
`.nourd` is always at the project root, declarations have one fixed location,
and only the canonical knowledge entry point is configurable.

The Human Product Owner also clarified that every Markdown file in the
configured knowledge directory must have a `.nourd` representation, while one
record declaration may represent many semantic sections in its single source.

## Decision

The exact proposal at
[`../designs/adopted/project-path-and-knowledge-coverage.md`](../designs/adopted/project-path-and-knowledge-coverage.md),
with SHA-256
`e6c255755c8b9ecefebf2ebf3166084e7f36bc6f5f976aeabba350e65cf12031`,
is accepted for native NKF 0.1.

The accepted boundary includes:

- `.nourd/` fixed directly under the project root;
- manifest path `.nourd/knowledge/bundle.yaml`;
- flat declaration directory `.nourd/knowledge/records/`;
- project-root-relative manifest field `knowledge_root`;
- replacement of `markdown_root` by `knowledge_root`;
- removal of redundant `records_root`;
- knowledge-root-relative record source and `non_records` paths;
- containment inside the project root and outside `.nourd`;
- exactly one record declaration or `non_records` entry for every Markdown
  file recursively under `knowledge_root`;
- no enumeration requirement for non-Markdown assets;
- one record declaration per governed Markdown file, with many section
  mappings inside that declaration;
- unique record/source representation and declaration-file rules; and
- symlinks generally prohibited, with contained links producing a portability
  warning and broken, cyclic, or escaping links failing structural
  conformance.

## Supersession And Preservation

This Decision supersedes the conflicting location-independent path rules in
the accepted NKF 0.1 specification and the earlier `markdown_root` and
`records_root` manifest responsibilities.

It preserves:

- stable bundle, record, section, and entity identity independent of path;
- the single canonical Markdown source and declaration per record;
- complete semantic section mapping;
- explicit `non_records` classification;
- source digest binding; and
- the separation of external locators from NKF identity and authority.

The accepted Markdown and YAML artifacts remain immutable historical
snapshots. This Decision requires later replacement revisions; it does not
change those bytes in place.

## Not Decided

This Decision does not define universal local or external locator syntax,
accept replacement Markdown or YAML bytes, implement schemas or checker
behavior, package a distribution, migrate a consumer, or establish
conformance.
