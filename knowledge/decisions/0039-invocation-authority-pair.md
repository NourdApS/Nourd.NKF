---
id: adr-0039
type: decision
title: "ADR 0039: Accept Invocation-Precondition Authority Pair"
summary: ADR 0038 establishes project-root .nourd as a native-checker invocation precondition and retires project.nourd.missing from the stable native diagnostic registry. That Decision accepts the exact semantics but does not replace the canonical Markdown/YAML bytes by implication.
created_at: 2026-07-30T07:53:41Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Codex technical reviewer, acting within delegated authority to compose and approve exact technical artifacts from the Human Product Owner boundary accepted in ADR 0038
---

# ADR 0039: Accept Invocation-Precondition Authority Pair

- **Normative Markdown Proposal:**
  [`../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-specification-proposal.md`](../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-specification-proposal.md)
- **Executable YAML Proposal:**
  [`../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-contract-proposal.yaml`](../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-contract-proposal.yaml)

## Context

[ADR 0038](0038-nourd-invocation-precondition.md) establishes project-root `.nourd` as a native-checker invocation
precondition and retires `project.nourd.missing` from the stable native
diagnostic registry. That Decision accepts the exact semantics but does not
replace the canonical Markdown/YAML bytes by implication.

One reviewed composite is required before schemas or checker behavior may bind
to the accepted boundary.

## Decision

The exact proposed pair is accepted and promoted unchanged as the current NKF
0.1 authority:

| Artifact | Canonical Path | SHA-256 |
| --- | --- | --- |
| Normative Markdown | [`../specifications/nkf-0.1.md`](../specifications/nkf-0.1.md) | `2274d569d147eadd658de8e8f00a790630be1f30a5303f3c608b085fac020f48` |
| Executable YAML | [`../../contracts/nkf/0.1/nkf.yaml`](../../contracts/nkf/0.1/nkf.yaml) | `7fc193f8622f8068c56a24fc5f4cfbe11ea2787f3bba3bb612f9a39d49f8e413` |

The replacement:

- requires project-root `.nourd` to exist and safely resolve to an in-project
  directory before native validation begins;
- classifies a failed precondition as an execution-level failure outside the
  native diagnostic contract;
- forbids result construction, result persistence, checker initialization,
  repair, replacement, or unsafe path following after a failed precondition;
- retains `bundle.manifest.missing` after the invocation precondition passes
  but the fixed manifest is absent;
- retires `project.nourd.missing`, leaving 115 stable native diagnostics;
- advances the accepted baseline to the [ADR 0036](0036-checker-ready-authority-pair.md) pair;
- records ADRs 0038 and 0039 in executable provenance; and
- changes no unrelated NKF 0.1 rule.

Normative Markdown remains authoritative human meaning. YAML remains its
digest-bound executable companion and cannot override it.

## Verification

Before acceptance, the exact pair was verified as:

- one strict YAML 1.2 core-schema document;
- zero YAML errors, warnings, anchors, or aliases;
- exact YAML binding to the proposed Markdown SHA-256;
- 115 stable diagnostic identities in both artifacts with exact severity
  parity;
- 35 participating H1/H2/H3 headings with zero Title-Case failures;
- zero broken local Markdown links;
- zero native secret-pattern findings in either artifact; and
- a semantic diff limited to provenance and the boundary accepted by ADR
  0038.

This verification supports exact artifact acceptance. It does not prove
checker completeness or consumer conformance.

## Schema Effect

The three schemas confirmed by [ADR 0037](0037-checker-ready-json-schemas.md) retain their assertion meaning but
their `x-nkf-source` Markdown and executable digests are now historical. Exact
source-metadata-only rebindings require independent compilation and probe
confirmation before becoming current realization.

## Compatibility

This is a governed pre-stable NKF 0.1 correction. The retired diagnostic was
unreachable in a completed result under the accepted phase and persistence
model. A failed invocation now has explicit no-result and no-mutation
behavior.

Consumers must bind to the exact revised authority and checker artifact. A
prior receipt remains historical evidence and is verification-outdated
against this authority pair.

## Non-Claims

This Decision does not:

- confirm rebound schema bytes;
- confirm checker or fixture completeness;
- establish public distribution, release, support, or CI;
- migrate or validate a consumer project;
- produce a consumer conformance result;
- accept consumer knowledge; or
- confirm a Realization.
