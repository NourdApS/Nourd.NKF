---
id: adr-0004
type: decision
title: "ADR 0004: Introduce NKF Record V2"
summary: ADRs 0002 and 0003 establish explicit section-to-responsibility bindings and the stable identifiers for the 69 accepted NKF 0.1 Product responsibilities.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0004: Introduce NKF Record V2

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed confirmation in the NKF-003
  discussion on 29 July 2026

## Context

ADRs 0002 and 0003 establish explicit section-to-responsibility bindings and
the stable identifiers for the 69 accepted NKF 0.1 Product responsibilities.

Existing `nkf.record/v1` declarations do not contain those bindings. Requiring
them under the same record-contract identity would make `nkf.record/v1` mean
two different things and would make existing declarations fail a newly added
rule without an explicit contract migration.

The ten Product body contracts retain their accepted responsibilities and now
have stable identifiers. Their Product meaning has not changed.

## Decision

NKF introduces `nkf.record/v2` as the record declaration contract that carries
and requires explicit responsibility bindings.

`nkf.record/v1` remains unchanged. A consumer must dispatch the two record
contracts by exact identifier and must not apply v2 binding requirements to a
v1 declaration.

The ten accepted Product body contracts remain:

- `nkf.product/v1`;
- `nkf.principle/v1`;
- `nkf.concept/v1`;
- `nkf.journey/v1`;
- `nkf.domain/v1`;
- `nkf.capability/v1`;
- `nkf.design/v1`;
- `nkf.decision/v1`;
- `nkf.realization/v1`; and
- `nkf.evidence/v1`.

Their required responsibility meaning remains unchanged. ADR 0003 supplies
stable identifiers for those existing responsibilities.

## Compatibility And Migration

`nkf.record/v2` is a breaking record-contract revision relative to
`nkf.record/v1` because v2 requires reviewed responsibility bindings that v1
does not contain.

Migration from v1 to v2 must:

1. preserve the exact canonical Markdown;
2. preserve existing identity, authority, provenance, scope, and
   relationships;
3. add only responsibility bindings supported by the declared body contract;
4. receive semantic review that the bound sections actually address the
   responsibilities; and
5. change the record contract to `nkf.record/v2` only after the declaration
   satisfies the accepted v2 rules.

Deterministic reconciliation may not invent responsibility bindings or perform
the contract upgrade automatically.

## Not Decided

This Decision does not accept:

- the exact YAML or JSON representation of responsibility bindings;
- whether a bundle may mix v1 and v2 record declarations;
- the bundle-contract version;
- the NKF format version;
- executable schemas or checker code;
- package or distribution layout; or
- migration of any consumer.
