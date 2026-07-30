---
created_at: 2026-07-29T20:06:17Z
design_disposition: superseded
superseded_by:
  - ADR-0013
  - ADR-0014
  - ADR-0015
  - ADR-0016
  - ADR-0017
  - ADR-0018
---

# NKF 0.1 JSON Schema Realization

- **Design Disposition:** Superseded
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Accepted inputs:** canonical NKF 0.1 Markdown (ADR 0010) and executable
  YAML companion (ADR 0011)
- **Proposal Authority Effect:** None

This proposal is superseded by ADRs 0013 through 0018 and
[`enforcement-and-diagnostics.md`](../adopted/enforcement-and-diagnostics.md).
It retains the earlier `markdown_root` and `records_root` model and omits later
accepted serialization and vocabulary boundaries. It must not guide current
schema realization.

## Decision Sought

Whether NKF should realize the accepted executable YAML companion as JSON
Schema files at the proposed paths below, using the stated structural mapping.

## Proposed Derived Artifact Layout

```text
contracts/nkf/0.1/
  nkf.yaml                         # accepted executable companion
  schemas/
    bundle.schema.json              # proposed derived artifact
    record.schema.json              # proposed derived artifact
```

The schemas would identify the bound YAML digest and Markdown digest in
non-normative `x-nkf-source` metadata. They would be derived artifacts, not a
second writable authority.

## Accepted Constraints Represented

The proposed `bundle.schema.json` would represent the accepted fields
`nkf_version`, `contract`, `id`, `product_record`, `markdown_root`,
`records_root`, and `non_records`, with `contract: nkf.bundle` and
`nkf_version: "0.1"`.

The proposed `record.schema.json` would represent the accepted record fields,
require `contract: nkf.record`, bind sections to the accepted
`responsibilities` field rules, and restrict `body_contract` and its
responsibility vocabulary to the ten NKF 0.1 body definitions in the accepted
YAML. A schema can prove structure, identifier support, and duplicate-free
lists; it cannot prove Markdown semantic adequacy, acceptance, or confirmed
realization.

## Concrete Choices Requiring Confirmation

The accepted pair does not yet choose all of these representation details:

- JSON Schema draft dialect and `$id` URI policy;
- exact JSON object shape for source digest, governance, scope, relationships,
  provenance, external authority, entities, and bindings;
- whether body-specific restrictions use one discriminated schema or separate
  generated schemas; and
- diagnostic vocabulary, checker behavior, fixture layout, package layout, and
  distribution.

The proposal therefore recommends first accepting the two-file schema layout
and a JSON Schema 2020-12 dialect, then presenting the exact schema bytes for
separate review. No schema bytes are created by this proposal.

Two preliminary schema files were subsequently created at the proposed paths.
They retain this proposal's stale open-field and root-path assumptions and are
therefore superseded realization evidence, not current NKF schemas.

## Exact Confirmation Requested

> Author JSON Schema 2020-12 proposals at
> `contracts/nkf/0.1/schemas/bundle.schema.json` and
> `contracts/nkf/0.1/schemas/record.schema.json`, derived from the accepted
> NKF 0.1 Markdown/YAML pair. Their source metadata must bind the exact
> accepted Markdown and YAML digests. They remain derived proposals until their
> exact bytes are reviewed; they do not create checker, fixture, distribution,
> or conformance authority.
