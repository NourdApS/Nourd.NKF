---
id: adr-0007
type: decision
summary: NKF currently has accepted human-readable Product-format meaning and accepted contract decisions, but no complete canonical machine-readable specification. The imported checker snapshot contains proposed JSON Schemas and a contract set; those files remain migration evidence and cannot become authority by implementation.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0007: Establish Markdown And YAML Contract Authority

- **Acceptance source:** Direct informed confirmation in the NKF-003
  discussion on 29 July 2026

## Context

NKF currently has accepted human-readable Product-format meaning and accepted
contract decisions, but no complete canonical machine-readable specification.
The imported checker snapshot contains proposed JSON Schemas and a contract
set; those files remain migration evidence and cannot become authority by
implementation.

NKF needs one complete machine-readable contract set from which schemas,
checker tables, and fixtures can be derived. It must not compete with the
human-readable normative specification or introduce Product meaning that
human review cannot see.

## Decision

Normative Markdown owns the complete human-readable NKF meaning.

One complete YAML contract set is the accepted executable companion to that
Markdown. It owns the exact machine-readable representation of accepted
contracts, vocabularies, constraints, and deterministic conformance rules.

The YAML contract set must identify and bind:

- the exact normative Markdown source path;
- the exact accepted specification revision;
- the Markdown digest algorithm and exact-byte digest;
- the governing accepted Decisions;
- its own contract-set identity and version; and
- every supported bundle, record, body, and extension contract version.

YAML may make accepted deterministic constraints explicit. It must not add,
strengthen, weaken, reinterpret, or accept Product meaning absent from the
bound Markdown and governing Decisions.

## Conflict Handling

Markdown and YAML are a governed pair, not independent authorities.

If they conflict:

1. a checker or generator must fail closed;
2. the YAML must not override the human-readable normative meaning;
3. the mismatch must be classified under ADR 0006;
4. the intended rule must be confirmed from accepted authority; and
5. the affected specification, contract set, derived artifacts, versioning,
   and migration must be reconciled explicitly.

A passing generated schema or checker test cannot resolve the conflict.

## Derived Artifacts

JSON Schemas, checker dispatch tables, types, fixtures, documentation
projections, and packaged distributions are derived from or verified against
the accepted YAML contract set.

Every released derived artifact must identify the exact YAML contract-set
version and digest and the bound Markdown specification revision and digest.
Generated artifacts cannot become a second writable contract authority.

## Change Process

A change to normative meaning begins in accepted Markdown or a governing
Decision and is then realized in YAML.

A purely executable correction may begin from a demonstrated YAML, schema, or
checker defect, but it must be validated against the bound normative Markdown.
If accepted authority does not already determine the correction, it requires
governed normative confirmation before implementation.

All changes follow the pre-stable evolution process in ADR 0006.

## Not Decided

This Decision does not accept:

- the canonical Markdown path or filename;
- the YAML path or filename;
- the current NKF format version;
- the contract-set identifier or version;
- bundle-version or mixed-record-version policy;
- the remaining unconfirmed serialization fields; or
- any imported schema or checker implementation.
