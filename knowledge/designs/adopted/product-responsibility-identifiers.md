---
id: design-nkf-0-1-product-responsibility-identifiers
type: design
summary: Whether to accept the 69 contract-scoped identifiers proposed by NKF-002 as stable labels for the already accepted NKF 0.1 Product body responsibilities.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0003
---

# NKF 0.1 Product Responsibility Identifiers

- **Design Disposition:** Adopted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Accepted meaning changed:** None

## Decision Sought

Whether to accept the 69 contract-scoped identifiers proposed by NKF-002 as
stable labels for the already accepted NKF 0.1 Product body responsibilities.

This proposal does not alter the responsibility wording, order, required
status, or body-contract membership.

## Verification

The accepted NKF 0.1 Product specification and later NKF-002 proposal contain
the same ten body contracts and 69 required responsibilities.

Automated comparison found:

- 69 proposed identifiers;
- no duplicate identifier within a body contract;
- no identifier outside lowercase kebab-case;
- 68 exact responsibility-wording matches; and
- one capitalization change in the proposed Design contract.

The accepted Design responsibility is:

> Validation approach and acceptance evidence required.

NKF-002 changed `evidence` to `Evidence`. Capitalization could imply that a
specific Evidence record is required rather than evidence in the general
sense. This proposal rejects that silent change and retains the exact accepted
lowercase wording.

## Proposed Identifiers

Identifiers are scoped by their body contract. Repeating an identifier such
as `boundaries` or `rationale` in another contract does not create shared
identity.

| Body contract | Required responsibility identifiers in accepted order |
| --- | --- |
| `nkf.product/v1` | `product-definition`, `purpose`, `vision`, `people-served`, `needs-and-outcomes`, `boundaries`, `product-map` |
| `nkf.principle/v1` | `principle-statement`, `rationale`, `applicability`, `required-behaviour`, `boundaries`, `decision-and-trade-off-implications` |
| `nkf.concept/v1` | `definition`, `purpose-and-product-relevance`, `distinguishing-characteristics`, `inclusion-exclusion-and-ambiguity-boundaries`, `product-and-knowledge-relationships`, `current-maturity` |
| `nkf.journey/v1` | `purpose-and-desired-outcome`, `actors-and-beneficiaries`, `trigger-and-operating-context`, `start-end-and-scope-boundaries`, `meaningful-stages-decisions-and-transitions`, `needs-expectations-and-consequential-moments`, `success-failure-interruption-and-recovery`, `related-domains-and-capabilities` |
| `nkf.domain/v1` | `responsibility-and-product-purpose`, `value-and-people-served`, `scope-and-boundaries`, `owned-concepts-and-semantic-entities`, `capability-map`, `dependencies-interfaces-and-external-authority`, `obligations-risks-and-measures` |
| `nkf.capability/v1` | `ability-statement`, `people-actors-and-outcomes`, `conditions-inputs-and-resulting-outcome`, `scope-and-non-capability-boundaries`, `governing-constraints-and-authority`, `dependencies-and-related-journeys`, `success-and-failure-conditions` |
| `nkf.design` | `design-kind-problem-and-scope`, `governing-inputs-and-constraints`, `proposed-direction`, `responsibilities-interactions-and-information-flows`, `alternatives-and-trade-offs`, `failure-safety-recovery-and-operations`, `validation-and-decision-evidence`, `unresolved-matters` |
| `nkf.decision/v1` | `context-and-problem`, `decision`, `scope-and-applicability`, `rationale`, `alternatives-considered`, `consequences-and-trade-offs` |
| `nkf.realization/v1` | `realization-identity-and-kind`, `product-meaning-realized`, `durable-mapping`, `responsibilities-and-ownership-boundaries`, `interfaces-dependencies-locators-and-resolution`, `external-authority-and-operational-state-boundaries`, `compatibility-verification-and-recovery` |
| `nkf.evidence/v1` | `question-claim-or-decision-context`, `sources-or-primary-observation-method`, `observations-and-findings`, `interpretation`, `limitations-and-uncertainty`, `applicability-and-boundaries`, `relevance-to-product-knowledge` |

## Meaning And Authority

Each identifier labels its same-position responsibility in the exact accepted
NKF 0.1 Product specification. The accepted prose remains authoritative.

An identifier:

- does not replace or abbreviate the accepted responsibility meaning;
- does not make a declaration semantically adequate merely because it is
  present;
- cannot be redefined within the same body-contract version; and
- does not imply a serialization field or checker implementation.

## Compatibility

If accepted, changing an identifier or its mapping later requires a governed
body-contract compatibility decision. Existing accepted NKF 0.1 declarations
do not contain these identifiers and require an explicit migration before
claiming conformance with the amended contract realization.

## Exact Confirmation Requested

> Accept the 69 identifiers listed above as stable, contract-scoped labels for
> the corresponding required responsibilities in the exact accepted NKF 0.1
> Product specification. Preserve every accepted responsibility sentence
> unchanged, including lowercase “acceptance evidence” in Design
> responsibility 7.

Acceptance would not approve a YAML field, JSON Schema, checker
implementation, version change, package layout, or consumer migration.

## Decision Outcome

The Human Product Owner accepted the exact identifier set on 29 July 2026.
The immutable result is
[`ADR 0003`](../../decisions/0003-product-responsibility-identifiers.md).
