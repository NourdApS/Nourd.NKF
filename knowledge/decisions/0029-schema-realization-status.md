---
id: adr-0029
type: decision
title: "ADR 0029: Reconcile NKF 0.1 Schema Realization Status"
summary: ADR 0027 accepted the current pre-checker NKF 0.1 Markdown/YAML authority pair. ADR 0028 then confirmed and promoted the exact bundle, record, and validation-result JSON Schemas derived from that pair.
created_at: 2026-07-30T00:27:52Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Codex technical reviewer, acting under the Human Product Owner's direct authorization to approve exact revisions after independent review
---

# ADR 0029: Reconcile NKF 0.1 Schema Realization Status

- **Authorization Source:** Earlier direct [NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md) instruction granting the
  reviewer permission to accept an exact revision if approved, together with
  the 30 July 2026 direction to complete all remaining work before checker
  implementation
- **Normative Markdown Proposal:**
  [`../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-specification-proposal.md`](../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-specification-proposal.md)
- **Executable YAML Proposal:**
  [`../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-contract-proposal.yaml`](../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-contract-proposal.yaml)

## Context

[ADR 0027](0027-validation-authority-pair.md) accepted the current pre-checker NKF 0.1 Markdown/YAML authority pair.
[ADR 0028](0028-validation-json-schemas.md) then confirmed and promoted the exact bundle, record, and
validation-result JSON Schemas derived from that pair.

The canonical Markdown still listed "exact schema/checker bytes" together as
an unresolved matter and still described [ADR 0010](0010-nkf-0-1-markdown-authority.md) as its current independent
canonical revision. Those realization-status statements became false after
ADRs 0027 and 0028. Leaving them unchanged would make the accepted authority
internally inconsistent even though the normative format rules themselves are
unchanged.

Because correcting canonical Markdown changes its digest, [ADR 0006](0006-pre-stable-evolution.md) requires a
reviewed replacement Markdown/YAML pair and exact downstream source rebinding.

## Review

The reviewer compared the proposals byte-for-byte with the [ADR 0027](0027-validation-authority-pair.md) pair and
verified that the only Markdown changes are:

- proposal and acceptance metadata advance from [ADR 0027](0027-validation-authority-pair.md) to ADR 0029;
- the accepted canonical baseline digest becomes the [ADR 0027](0027-validation-authority-pair.md) Markdown digest;
- the normative-status and provenance text correctly identifies [ADR 0027](0027-validation-authority-pair.md) as
  the accepted current baseline and [ADR 0028](0028-validation-json-schemas.md) as the schema confirmation;
- the unresolved-matters list removes confirmed schema bytes while retaining
  checker implementation bytes, schema/checker packaging, and public
  distribution as unresolved.

The YAML changes are limited to:

- the replacement Markdown digest;
- the [ADR 0027](0027-validation-authority-pair.md) Markdown/YAML pair as the accepted baseline; and
- ADRs 0028 and 0029 in the governing-decision sequence.

The final pair audit verified:

- exact Markdown-to-YAML SHA-256 binding;
- one safely parsed YAML mapping document;
- no duplicate YAML keys, aliases, anchors, or custom tags;
- exact parity for all 114 stable native diagnostic rules;
- unchanged participating headings;
- valid local Markdown links; and
- no native secret-registry self-trigger.

## Decision

The exact reviewed pair is accepted as the current canonical NKF 0.1
authority:

| Authority | Canonical Artifact | SHA-256 |
| --- | --- | --- |
| Normative human meaning | [`../specifications/nkf-0.1.md`](../specifications/nkf-0.1.md) | `b83ab1ca6c93a1fed5a344a47a3d21d7691d93e141926f05e3d1c00ba8fe4e8c` |
| Complete executable companion | [`../../contracts/nkf/0.1/nkf.yaml`](../../contracts/nkf/0.1/nkf.yaml) | `e9cc92676d8f61855e1dea47ccc7eaa926c43003596158e15c7550ea14e6da41` |

Promotion copies the reviewed proposal bytes unchanged. Markdown remains the
authority for human meaning. YAML remains its complete digest-bound executable
companion and cannot replace, extend, or reinterpret the Markdown.

This is a realization-status reconciliation. It changes no NKF 0.1 format
rule, diagnostic trigger, conformance meaning, contract shape, schema
assertion, checker behavior, or consumer obligation.

## Supersession And Rebinding

This exact pair replaces the [ADR 0027](0027-validation-authority-pair.md) pair as current canonical authority.
[ADR 0027](0027-validation-authority-pair.md) and its exact artifacts remain an immutable accepted historical
snapshot.

The [ADR 0028](0028-validation-json-schemas.md) schemas remain confirmed derivations of the [ADR 0027](0027-validation-authority-pair.md) pair, but
their embedded source digests no longer identify current authority after this
Decision. They require exact metadata rebinding and renewed confirmation
before they can again claim current NKF 0.1 schema realization.

## Non-Claims

This Decision does not:

- confirm rebound schema bytes;
- implement or confirm checker code or fixtures;
- establish checker identity, packaging, distribution, release, support, or
  continuous-integration gates;
- validate a consumer project;
- verify an acceptance binding;
- accept knowledge or confirm semantic adequacy;
- confirm a Realization;
- produce an NKF conformance result; or
- authorize consumer migration.
