---
id: design-nkf-0-1-section-role-vocabularies
type: design
title: NKF 0.1 Section-Role Vocabularies
summary: Whether the following shared role meanings and body-specific allowed subsets are the complete controlled section-role vocabulary for the ten core NKF 0.1 Product body contracts.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0014
proposal_evidence: imported NKF-002 checker contract set at `knowledge/evidence/source-snapshots/nourd-studio/06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1/src/core/knowledge/contracts/nkf/0.1/contract-set.json`, SHA-256 `34ef9a6dc78ea66958dedb7b281b2a92a005f2ad2731178969be909e0fa3b9f8
proposal_authority_effect: None
decision_authority: Human Product Owner, Nourd ApS
---

# NKF 0.1 Section-Role Vocabularies

## Decision Sought

Whether the following shared role meanings and body-specific allowed subsets
are the complete controlled section-role vocabulary for the ten core NKF 0.1
Product body contracts.

The imported checker supplied the role names and subsets but not authoritative
role meanings. This proposal does not infer acceptance from that checker.

## Role Model

Every declared section has exactly one lowercase role from the allowed subset
of its declared body contract. A repeated role name has one meaning across all
body contracts; body contracts select allowed roles rather than redefining
them.

The role classifies the section's principal semantic function. When several
functions are inseparable, the narrowest accurate principal role is used and
the section's responsibility bindings express its contract coverage. When
separate source sections can express the functions honestly, they should be
split rather than hidden under a generic role.

Role classification:

- does not determine section authority;
- does not create or satisfy a body responsibility;
- does not prove semantic adequacy, truth, safety, acceptance, or conformance;
- is not inferred from heading text; and
- remains source-bound to the declared section.

## Shared Role Meanings

| Role | Exact classification meaning |
| --- | --- |
| `actor` | A person, role, group, system, or external participant involved in or served by the subject. |
| `alternative` | A materially relevant option other than the proposed or selected approach. |
| `applicability` | The subjects, contexts, conditions, or scope in which the stated meaning applies. |
| `behaviour` | Required, permitted, or prohibited conduct implied by a principle or constraint. |
| `boundary` | An inclusion, exclusion, limit, non-goal, ownership boundary, or authority boundary. |
| `catalogue` | An organized inventory, classification, portfolio, or map of related items. |
| `condition` | A prerequisite, input state, or condition required for a capability or outcome. |
| `consequence` | An effect or implication resulting from a decision or chosen direction. |
| `content` | Source meaning for which no narrower allowed role accurately describes the principal function. |
| `context` | Background, circumstances, problem, or operating situation needed to understand the subject. |
| `definition` | Meaning that states what the subject is and distinguishes it from other subjects. |
| `dependency` | A required reliance on other meaning, capability, system, actor, or external authority. |
| `evidence` | Supporting material used to substantiate, assess, or validate a claim, choice, or design. |
| `evolution` | Intended maturity, change, migration, compatibility, deprecation, or retirement direction. |
| `finding` | A conclusion directly supported by stated sources, observations, and method. |
| `governing` | A constraint, accepted input, policy, rule, or authority that governs the subject. |
| `identity` | The stable identity, kind, or identifying characteristics of a durable realization. |
| `interface` | An interaction, exchange, contract boundary, or point of connection with another subject. |
| `interpretation` | Reasoned meaning drawn from observations or findings, kept distinct from the observations themselves. |
| `limitation` | A known uncertainty, caveat, evidence gap, method constraint, or applicability limit. |
| `mapping` | A durable correspondence between Product meaning and a realization. |
| `measure` | A criterion or indicator for success, failure, effectiveness, health, or progress. |
| `method` | The procedure used to observe, collect, analyze, compare, or verify evidence. |
| `obligation` | A duty, requirement, compliance constraint, or commitment borne by the subject or an actor. |
| `observation` | A directly observed or source-reported fact kept distinct from interpretation. |
| `outcome` | A desired, expected, achieved, failed, or recovered result. |
| `principle` | The concise normative statement of a Product principle. |
| `rationale` | The reason why a principle, decision, design, or direction exists or was chosen. |
| `recovery` | Failure handling, rollback, interruption response, restoration, or safe recovery. |
| `relevance` | How evidence bears on Product knowledge, a claim, a decision, or a governed question. |
| `responsibility` | An assignment or boundary of responsibility, ownership, or accountability. |
| `risk` | A material uncertainty, exposure, hazard, or failure mode and its possible impact. |
| `source` | Material, data, testimony, or another origin from which evidence is derived. |
| `trade-off` | A tension, cost, benefit, or compromise between relevant choices or qualities. |
| `transition` | A meaningful stage, decision point, state change, or movement through a journey. |
| `trigger` | An event or circumstance that initiates a journey or consequential transition. |
| `unresolved` | An explicit open question, ambiguity, conflict, missing decision, or unsettled matter. |
| `validation` | The approach, criteria, or required proof for validating a design or its acceptance conditions. |

## Allowed Roles By Core Body Contract

Order is editorial only and carries no semantic meaning.

| Body contract | Allowed roles |
| --- | --- |
| `nkf.product` | `definition`, `governing`, `boundary`, `catalogue`, `evolution`, `interface`, `obligation`, `measure`, `unresolved`, `content` |
| `nkf.principle` | `principle`, `rationale`, `applicability`, `behaviour`, `boundary`, `trade-off`, `evidence`, `unresolved`, `content` |
| `nkf.concept` | `definition`, `governing`, `boundary`, `catalogue`, `evolution`, `evidence`, `unresolved`, `content` |
| `nkf.journey` | `governing`, `actor`, `trigger`, `boundary`, `transition`, `obligation`, `outcome`, `interface`, `measure`, `evidence`, `risk`, `unresolved`, `content` |
| `nkf.domain` | `governing`, `boundary`, `catalogue`, `interface`, `obligation`, `risk`, `measure`, `evolution`, `unresolved`, `content` |
| `nkf.capability` | `governing`, `actor`, `condition`, `outcome`, `boundary`, `obligation`, `dependency`, `measure`, `evidence`, `risk`, `unresolved`, `content` |
| `nkf.design` | `context`, `boundary`, `governing`, `responsibility`, `interface`, `alternative`, `trade-off`, `risk`, `recovery`, `validation`, `evidence`, `unresolved`, `content` |
| `nkf.decision` | `context`, `governing`, `applicability`, `rationale`, `alternative`, `consequence`, `trade-off`, `evidence`, `recovery`, `unresolved`, `content` |
| `nkf.realization` | `identity`, `mapping`, `responsibility`, `boundary`, `interface`, `dependency`, `obligation`, `evidence`, `recovery`, `unresolved`, `content` |
| `nkf.evidence` | `context`, `source`, `method`, `observation`, `finding`, `interpretation`, `limitation`, `boundary`, `relevance`, `evidence`, `unresolved`, `content` |

## Fail-Closed And Semantic Guardrails

- A role outside the allowed subset for the declared body contract is invalid.
- An unknown role is invalid for native NKF 0.1.
- A profile-defined namespaced body contract requires its own separately
  accepted role vocabulary; the core list does not authorize it by analogy.
- A section with role `unresolved` must have section authority `unresolved`.
  Other roles do not determine section authority.
- `evidence` as a role is distinct from `evidence` as a section-authority
  class. The role classifies function; the authority class states how the
  section governs.
- `content` is a last-resort classification, not a default. A `content`
  section cannot declare `responsibilities`; if it fulfills a required
  responsibility, the author must select an accurate narrower role or raise a
  vocabulary gap for governed resolution.
- Deterministic validation can check the declared value, body-specific
  allowance, the `unresolved` authority rule, and the `content` responsibility
  restriction. Human review remains required to judge whether the chosen role
  accurately classifies the source meaning.

## Compatibility

These values belong to the sole NKF 0.1 version namespace and use the
unversioned body identities accepted by [ADR 0009](../../decisions/0009-nkf-0-1-version-namespace.md). They do not preserve the
imported checker's `/v1` body identities as current support.

Changing a role's meaning, removing a role, changing an allowed subset, or
weakening a guardrail is an NKF format change. It requires the pre-stable
change process in [ADR 0006](../../decisions/0006-pre-stable-evolution.md), an accepted replacement authority pair, compatible
derived artifacts, and deliberate consumer migration.

## Exact Confirmation Requested

> Accept the 38 shared section-role meanings, the ten body-specific allowed
> subsets, and the fail-closed and semantic guardrails exactly as stated above
> for native NKF 0.1.

Acceptance would establish the role vocabulary only. It would not accept
replacement Markdown or YAML bytes, entity or binding vocabularies,
extensions, acceptance proof, path resolution, schemas, checker behavior,
fixtures, distribution, a release, conformance, or consumer migration.
