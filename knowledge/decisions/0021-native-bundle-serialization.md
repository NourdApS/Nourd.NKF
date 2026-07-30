---
id: adr-0021
type: decision
title: "ADR 0021: Accept NKF 0.1 Native Bundle Serialization"
summary: ADR 0018 established the fixed manifest path, knowledge_root, declaration directory, Markdown coverage, and path rules. Replacement-pair reconciliation exposed that the exact bundle object, non_records entry shape and kinds, and unknown-field behavior remained undefined.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0021: Accept NKF 0.1 Native Bundle Serialization

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct confirmation of the summarized exact bundle
  structure in the NKF-003 discussion on 29 July 2026

## Context

ADR 0018 established the fixed manifest path, `knowledge_root`, declaration
directory, Markdown coverage, and path rules. Replacement-pair reconciliation
exposed that the exact bundle object, `non_records` entry shape and kinds, and
unknown-field behavior remained undefined.

## Decision

The exact proposal at
[`../designs/adopted/native-bundle-serialization.md`](../designs/adopted/native-bundle-serialization.md),
with SHA-256
`3021c44d98e0b0ca2984bbbe3406beffea9925503a3dfe5c0ba7d2d65b0adc50`,
is accepted as the native NKF 0.1 bundle serialization.

The accepted boundary includes:

- required `nkf_version`, `contract`, `id`, `product_record`,
  `knowledge_root`, and `non_records` fields;
- optional `extension_contracts` and `extensions` fields using ADR 0016;
- closed handling of unknown top-level and non-record-entry fields;
- removal of `record_contract`, `markdown_root`, `records_root`,
  `required_extensions`, and free-form top-level extension fields;
- required non-record `path` and `kind`, with optional `reason`;
- exact kinds `navigation`, `generated`, `redirect`, and `other`;
- required non-empty `reason` for kind `other`;
- path existence, containment, uniqueness, representation-conflict, and
  order-insensitivity rules;
- optional enumeration of non-Markdown assets; and
- the stated bundle-wide Product-root, knowledge-coverage, and empty-list
  rules.

This Decision introduces no new identifier grammar.

## Not Established

This Decision does not accept replacement Markdown or YAML bytes, schemas,
checker code, fixtures, a distribution, release, conformance result, or
consumer migration.

The accepted canonical authority pair remains an immutable historical
snapshot. ADR 0021 is realized through a later accepted replacement pair.
