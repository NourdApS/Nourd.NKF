# ADR 0003: Accept Product responsibility identifiers

- **Status:** Accepted
- **Task:** `NKF-003`
- **Proposed:** 29 July 2026
- **Accepted:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed confirmation in the NKF-003
  discussion on 29 July 2026

## Context

ADR 0002 requires stable, body-contract-scoped identifiers for required
responsibilities. The accepted NKF 0.1 Product specification contains ten
body contracts and 69 required responsibilities, but it states them only in
prose.

The later NKF-002 proposal supplied identifiers for all 69 responsibilities.
Comparison with the accepted specification found no missing identifiers,
contract-scoped duplicates, or invalid identifier forms.

NKF-002 did capitalize `evidence` in Design responsibility 7. That could imply
the specific Evidence record type rather than evidence in the general sense.
This Decision preserves the exact accepted lowercase wording.

## Decision

The following lowercase kebab-case identifiers are the stable,
body-contract-scoped labels for the corresponding required responsibilities
in the exact accepted NKF 0.1 Product specification:

| Body contract | Required responsibility identifiers in accepted order |
| --- | --- |
| `nkf.product/v1` | `product-definition`, `purpose`, `vision`, `people-served`, `needs-and-outcomes`, `boundaries`, `product-map` |
| `nkf.principle/v1` | `principle-statement`, `rationale`, `applicability`, `required-behaviour`, `boundaries`, `decision-and-trade-off-implications` |
| `nkf.concept/v1` | `definition`, `purpose-and-product-relevance`, `distinguishing-characteristics`, `inclusion-exclusion-and-ambiguity-boundaries`, `product-and-knowledge-relationships`, `current-maturity` |
| `nkf.journey/v1` | `purpose-and-desired-outcome`, `actors-and-beneficiaries`, `trigger-and-operating-context`, `start-end-and-scope-boundaries`, `meaningful-stages-decisions-and-transitions`, `needs-expectations-and-consequential-moments`, `success-failure-interruption-and-recovery`, `related-domains-and-capabilities` |
| `nkf.domain/v1` | `responsibility-and-product-purpose`, `value-and-people-served`, `scope-and-boundaries`, `owned-concepts-and-semantic-entities`, `capability-map`, `dependencies-interfaces-and-external-authority`, `obligations-risks-and-measures` |
| `nkf.capability/v1` | `ability-statement`, `people-actors-and-outcomes`, `conditions-inputs-and-resulting-outcome`, `scope-and-non-capability-boundaries`, `governing-constraints-and-authority`, `dependencies-and-related-journeys`, `success-and-failure-conditions` |
| `nkf.design/v1` | `design-kind-problem-and-scope`, `governing-inputs-and-constraints`, `proposed-or-accepted-design`, `responsibilities-interactions-and-information-flows`, `alternatives-and-trade-offs`, `failure-safety-recovery-and-operations`, `validation-and-acceptance-evidence`, `unresolved-matters` |
| `nkf.decision/v1` | `context-and-problem`, `decision`, `scope-and-applicability`, `rationale`, `alternatives-considered`, `consequences-and-trade-offs` |
| `nkf.realization/v1` | `realization-identity-and-kind`, `product-meaning-realized`, `durable-mapping`, `responsibilities-and-ownership-boundaries`, `interfaces-dependencies-locators-and-resolution`, `external-authority-and-operational-state-boundaries`, `compatibility-verification-and-recovery` |
| `nkf.evidence/v1` | `question-claim-or-decision-context`, `sources-or-primary-observation-method`, `observations-and-findings`, `interpretation`, `limitations-and-uncertainty`, `applicability-and-boundaries`, `relevance-to-product-knowledge` |

Each identifier maps by position to the unchanged accepted responsibility
sentence. In particular, `validation-and-acceptance-evidence` maps to:

> Validation approach and acceptance evidence required.

An identifier does not replace, abbreviate, or change that accepted meaning.

## Compatibility

Responsibility identifiers are scoped by their exact body contract. Repeating
an identifier in another body contract does not create shared identity.

Changing an identifier or its mapping requires a later governed
body-contract compatibility decision. Existing accepted NKF 0.1 declarations
predate these identifiers and require explicit migration before claiming
conformance with the amended contract realization.

## Not decided

This Decision does not accept:

- a YAML or JSON serialization field;
- an amended normative specification file;
- executable schemas or checker code;
- a version change or compatibility category;
- package or distribution layout; or
- consumer migration.
