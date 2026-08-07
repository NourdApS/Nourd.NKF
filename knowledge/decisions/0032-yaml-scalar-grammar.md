---
id: adr-0032
type: decision
title: "ADR 0032: Correct NKF 0.1 Yaml Flow Scalar Grammar"
summary: "The accepted executable companion uses three flow sequences to describe the OpenAI-prefixed-token detector's body and boundary alphabets. Each sequence contains a standalone unquoted -:"
created_at: 2026-07-30T07:53:41Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Codex technical reviewer, acting under the Human Product Owner's authorization to approve exact technical corrections after independent review
---

# ADR 0032: Correct NKF 0.1 Yaml Flow Scalar Grammar

- **Discovery Context:** Native checker realization under [ADR 0031](0031-checker-layout-and-identity.md)
- **Executable YAML Proposal:**
  [`../evidence/decision-inputs/adr-0032-0033/nkf-0.1-yaml-grammar-corrected-contract-proposal.yaml`](../evidence/decision-inputs/adr-0032-0033/nkf-0.1-yaml-grammar-corrected-contract-proposal.yaml)

## Context

The accepted executable companion uses three flow sequences to describe the
OpenAI-prefixed-token detector's body and boundary alphabets. Each sequence
contains a standalone unquoted `-`:

```yaml
body_alphabet: [A-Z, a-z, 0-9, _, -]
```

In YAML 1.2, a standalone hyphen is a block-sequence indicator and is not a
valid plain scalar in that flow-collection position. Strict parsing with
`yaml` `2.9.0`, YAML core schema, strict mode, and unique-key enforcement
rejects all three occurrences. The earlier Psych-based structural audit did
not expose this grammar incompatibility.

This prevents a conforming checker from loading the accepted executable
contract set. The intended alphabet is unambiguous because [ADR 0026](0026-deterministic-secret-pattern-registry.md) and the
normative Markdown both define the character as the literal ASCII hyphen.

## Classification

This is an executable-contract syntax defect. It is not:

- a normative specification change;
- a checker bug;
- a migration issue; or
- consumer nonconformance.

## Decision

The exact proposal is accepted as the current executable YAML companion. It:

- preserves the accepted canonical Markdown bytes and SHA-256
  `b83ab1ca6c93a1fed5a344a47a3d21d7691d93e141926f05e3d1c00ba8fe4e8c`;
- quotes exactly the three standalone hyphen scalars as `"-"`;
- advances the accepted baseline to the [ADR 0029](0029-schema-realization-status.md) pair;
- adds ADR 0032 to the governing-decision sequence; and
- changes no parsed value or normative meaning.

The current executable artifact is:

| Artifact | Canonical Path | SHA-256 |
| --- | --- | --- |
| Executable companion | [`../../contracts/nkf/0.1/nkf.yaml`](../../contracts/nkf/0.1/nkf.yaml) | `763fb7cb86f6d2a5f71672593a9f14262790c0ae3d8e9fbebf7c90cab20ea53b` |

Promotion copies the reviewed proposal bytes unchanged. The promoted artifact
must parse as exactly one YAML 1.2 core-schema document with strict syntax,
unique keys, and no parser warnings.

## Rebinding

The schemas confirmed by [ADR 0030](0030-source-bound-json-schemas.md) retain unchanged assertion meaning but their
embedded executable-companion digest becomes historical after this Decision.
They require exact source-metadata rebinding and renewed confirmation before
claiming current realization.

## Non-Claims

This Decision does not:

- change the native secret registry;
- change any NKF 0.1 format rule or diagnostic trigger;
- confirm rebound schema bytes;
- confirm checker code, fixtures, distribution, release, or conformance;
- accept consumer knowledge; or
- authorize consumer migration.
