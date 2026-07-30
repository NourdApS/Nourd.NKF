---
created_at: 2026-07-30T07:53:41Z
---

# ADR 0036: Accept Checker-Findings-Resolved Authority Pair

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Codex technical reviewer, acting within delegated
  authority to compose and approve exact technical artifacts from the Human
  Product Owner boundary accepted in ADR 0035 and the mechanical completions
  accepted in ADR 0034
- **Normative Markdown Proposal:**
  [`../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-specification-proposal.md`](../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-specification-proposal.md)
- **Executable YAML Proposal:**
  [`../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-contract-proposal.yaml`](../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-contract-proposal.yaml)

## Context

ADRs 0034 and 0035 resolve all four authority findings exposed by the first
native checker implementation:

1. invalid Markdown UTF-8 requires a stable native diagnostic;
2. an unresolved contract-validation target requires a stable native
   diagnostic;
3. Product membership and structural `part-of` hierarchy require an explicit
   distinction; and
4. the minimal example must follow the already accepted Title-Case rule.

Those Decisions accept the exact semantics. They do not replace the canonical
Markdown/YAML bytes by implication. One reviewed composite is required before
the checker may implement the new rules.

## Decision

The exact proposed pair is accepted and promoted unchanged as the current NKF
0.1 authority:

| Artifact | Canonical Path | SHA-256 |
| --- | --- | --- |
| Normative Markdown | [`../specifications/nkf-0.1.md`](../specifications/nkf-0.1.md) | `099fe3cbda9c99708e630b30fdec9d0a8335cca70b34f022d85101ce71cf379d` |
| Executable YAML | [`../../contracts/nkf/0.1/nkf.yaml`](../../contracts/nkf/0.1/nkf.yaml) | `8e6ffdfdbe70915b8d0baf07da7aa0464327ef7ccb9857383a96d380bdfec1bc` |

The replacement:

- adds `markdown.utf8.invalid` as a source-phase conformance error;
- adds `request.record.unresolved` as a bundle-graph conformance error;
- keeps every record Product-scoped through `scope.product`;
- limits required native `part-of` reachability to Domain and Capability;
- does not create hierarchy from Product scope;
- corrects four minimal-example headings and their declaration paths;
- advances the accepted baseline to the prior ADR 0029/0032 pair;
- records ADRs 0034 through 0036 in executable provenance; and
- changes no unrelated NKF 0.1 rule.

Normative Markdown remains authoritative human meaning. YAML remains its
digest-bound executable companion and cannot override it.

## Verification

Before acceptance, the exact pair was verified as:

- one strict YAML 1.2 core-schema document;
- zero YAML errors, warnings, anchors, or aliases;
- exact YAML binding to the proposed Markdown SHA-256;
- 116 stable diagnostic identities in both artifacts with exact severity
  parity;
- 35 participating H1/H2/H3 headings with zero Title-Case failures;
- zero broken local Markdown links;
- zero native secret-pattern findings in either artifact; and
- diffs limited to provenance and the four accepted resolutions.

This verification supports exact artifact acceptance. It does not prove
semantic adequacy or checker conformance.

## Schema Effect

The three schemas confirmed by ADR 0033 retain their assertion meaning but
their `x-nkf-source` Markdown and executable digests are now historical. Exact
source-metadata-only rebindings require independent compilation and probe
confirmation before becoming current realization.

## Compatibility

This is a pre-stable NKF 0.1 replacement under the governed change process.
The two new diagnostics make existing failure obligations executable. The
hierarchy correction removes an impossible requirement for non-hierarchical
core bodies without weakening Product scope, Domain hierarchy, or Capability
hierarchy.

Consumers migrate deliberately. A prior receipt remains historical evidence
and is verification-outdated against this authority pair.

## Non-Claims

This Decision does not:

- confirm rebound schema bytes;
- confirm checker completeness or final implementation bytes;
- establish public distribution, release, support, or CI;
- migrate or validate a consumer project;
- accept consumer knowledge;
- confirm semantic adequacy; or
- confirm a Realization.
