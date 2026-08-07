---
id: adr-0027
type: decision
summary: ADR 0022 accepted the current coherent NKF 0.1 Markdown/YAML pair. ADR 0024 subsequently accepted deterministic CommonMark interpretation, complete top-level heading coverage, Title Case, canonical terms, and the Mermaid boundary. ADR 0025 accepted the exact operational validation-result contract, and ADR 0026 accepted the deterministic native secret-pattern registry.
created_at: 2026-07-30T00:27:52Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0027: Accept Pre-Checker NKF 0.1 Authority Pair

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Codex technical reviewer, acting under the Human
  Product Owner's direct authorization to approve exact revisions after
  independent review
- **Authorization Source:** Earlier direct NKF-003 instruction granting the
  reviewer permission to accept an exact revision if approved, together with
  the 30 July 2026 direction to complete all remaining work before checker
  implementation
- **Normative Markdown Proposal:**
  [`../evidence/decision-inputs/adr-0027-0028/nkf-0.1-pre-checker-specification-proposal.md`](../evidence/decision-inputs/adr-0027-0028/nkf-0.1-pre-checker-specification-proposal.md)
- **Executable YAML Proposal:**
  [`../evidence/decision-inputs/adr-0027-0028/nkf-0.1-pre-checker-contract-proposal.yaml`](../evidence/decision-inputs/adr-0027-0028/nkf-0.1-pre-checker-contract-proposal.yaml)

## Context

ADR 0022 accepted the current coherent NKF 0.1 Markdown/YAML pair. ADR 0024
subsequently accepted deterministic CommonMark interpretation, complete
top-level heading coverage, Title Case, canonical terms, and the Mermaid
boundary. ADR 0025 accepted the exact operational validation-result contract,
and ADR 0026 accepted the deterministic native secret-pattern registry.

Those later Decisions change normative meaning and cannot be realized only in
checker code. ADR 0006 requires a reviewed replacement authority pair before
derived schemas or checker implementation.

The replacement proposals preserve the sole NKF `0.1` version coordinate and
the Markdown-over-YAML authority model. They incorporate the accepted changes
without adding an independent result, registry, schema, or checker version.

## Review

The final independent review verified:

- exact preservation of the accepted canonical pair as the stated baseline;
- exact Markdown-to-YAML SHA-256 binding;
- one safely parsed YAML mapping document with no duplicate keys or aliases;
- JSON-compatible contract values and closed native object declarations;
- all 35 participating specification headings at the accepted Title Case
  boundary;
- exact Markdown/YAML parity for 114 stable native diagnostic rules;
- the thirteen validation-result fields, eleven ordered phases, three ordered
  schema identities, Governed Validation Inputs, snapshot, persistence,
  readiness, and currentness rules;
- the canonical-term manifest field and all CommonMark, heading, Title Case,
  and Mermaid mechanics;
- the three exact secret detector classes, scope, thresholds, exclusions,
  one-per-artifact diagnostic behavior, and governed evolution rule;
- valid local Markdown links;
- no placeholder digest; and
- no native secret-registry self-trigger in either authority artifact.

No unexplained semantic addition, omission, conflict, parallel version
coordinate, consumer-specific profile, or checker-created rule remained.

## Decision

The exact reviewed pair is accepted as the current canonical NKF 0.1
authority:

| Authority | Canonical Artifact | SHA-256 |
| --- | --- | --- |
| Normative human meaning | [`../specifications/nkf-0.1.md`](../specifications/nkf-0.1.md) | `5b0aa9c6851217f0c88a97de03f8d7fce0c495053d6e411a317946fda749092e` |
| Complete executable companion | [`../../contracts/nkf/0.1/nkf.yaml`](../../contracts/nkf/0.1/nkf.yaml) | `8ef4ff36f6d2ab1eb8e58704d8d16929e1c07a2b6f617a626dbce1769c52ac66` |

Promotion copies the reviewed proposal bytes unchanged to those canonical
paths. Markdown remains authoritative human meaning. YAML is its complete
digest-bound executable companion and cannot replace, extend, or reinterpret
the Markdown. Conflict fails closed.

The accepted pair incorporates ADRs 0024, 0025, and 0026. It also records
NKF-005 as the deferred investigation path for universal expiry or separate
authority freshness without introducing either feature now.

## Supersession And Compatibility

This exact pair replaces the ADR 0022 revisions as the current canonical
authority. ADR 0022 and its exact artifacts remain immutable historical
accepted snapshots.

The bundle and record schemas confirmed by ADR 0023 remain historical
confirmed realizations of the ADR 0022 source pair. Their source bindings no
longer match current authority, so they cannot claim current NKF 0.1 schema or
conformance realization after this Decision.

This is a governed pre-stable NKF 0.1 replacement. It introduces no
sub-version. Consumers must deliberately migrate to an exact release carrying
this pair and its subsequently confirmed schemas and checker.

## Non-Claims

This Decision does not:

- derive or confirm replacement bundle, record, or validation-result schemas;
- implement or confirm checker code or fixtures;
- establish checker identity, packaging, distribution, release, support, or
  CI;
- validate a consumer project;
- verify an acceptance binding;
- accept consumer knowledge or confirm semantic adequacy;
- confirm a Realization;
- produce an NKF conformance result; or
- authorize consumer migration.
