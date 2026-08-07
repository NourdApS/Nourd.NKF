---
id: nkf-portable-knowledge-topology
type: realization
title: NKF Portable Knowledge Topology
summary: This Realization maps the accepted complete portable Product and Technology knowledge topology to checker, onboarding, repair, fixture, guidance, documentation, and self-hosting artifacts.
created_at: 2026-08-01T09:26:20Z
record_lifecycle: immutable
record_status: accepted
task: NKF-017
confirmation_status: confirmed
confirmation_decisions:
  - adr-0075
---

# NKF Portable Knowledge Topology

## Realization Identity And Kind

This is the confirmed implementation Realization for the portable topology
meaning adopted through [ADR 0071](../../decisions/0071-complete-portable-onboarding-topology.md) and bound to the corrected canonical NKF 0.1
Markdown and executable companion by [ADR 0073](../../decisions/0073-correct-portable-topology-diagnostic-registry.md). [ADR 0075](../../decisions/0075-confirm-complete-portable-onboarding-topology.md) confirms this exact
revision after the [NKF-017](../../tasks/completed/NKF-017-complete-portable-onboarding-topology.md) completion audit.

This record does not publish a release, migrate a consumer, or make generated
Draft knowledge accepted.

## Governed Meaning Realized

The implementation realizes one mandatory, continuing topology for supported
Product and Technology bundles. It establishes one canonical
`knowledge/README.md`, the complete shared lifecycle directory and navigation
set, one current-system Realization, and the profile-required initial semantic
records. Every required Markdown file is represented by one native declaration.

The canonical knowledge map contains one managed `NKF Navigation` block. The
onboarder may reconcile that block without changing bytes outside it. Required
lifecycle records must be placed in the directory matching their declared Task
status or Design disposition and linked exactly once from the corresponding
index. These are continuing conformance requirements rather than generator-only
conventions.

## Durable Mapping

The implementation topology is:

```text
Accepted NKF 0.1 Topology Meaning
        ↓ executable assertions and diagnostics
Checker + Schemas + Source Bindings
        ↓ generation and reconciliation
Agent-Led Initial Onboarding
        ↓ trusted predecessor receipt
Deliberate Topology Repair
        ↓ continuing verification
Product And Technology Fixtures + Self-Hosted NKF Bundle
```

| Component | Durable Location | Implemented Boundary |
| --- | --- | --- |
| Normative authority | `knowledge/specifications/nkf-0.1.md` | Human-readable topology, navigation, placement, reconciliation, and repair meaning |
| Executable companion | `contracts/nkf/0.1/nkf.yaml` | Exact path, map, index, placement, diagnostic, and repair assertions bound to the Markdown digest |
| Schema source bindings | `contracts/nkf/0.1/schemas/` | Source metadata bound to the accepted Markdown and executable companion |
| Checker | `src/checker/topology.ts`, `src/checker/markdown.ts`, and `src/checker/checker.ts` | Required paths, canonical map, links, lifecycle placement, index completeness, Evidence-area shape, and symbolic-link rejection |
| Onboarding core | `scripts/onboarding/core.mjs` | Complete topology generation, existing-map reconciliation, profile additions, native declarations, sealing, and candidate construction |
| Public adopter | `scripts/adoption/nourd-nkf-adopt.mjs` and built mirrors | Initial onboarding plus receipt-bound `repair-topology` orchestration |
| Product and Technology fixtures | `fixtures/valid/minimal/` and `fixtures/valid/technology/` | Conforming complete topology examples used by checker and adopter tests |
| Focused verification | `test/checker.test.ts`, `test/project-source.test.ts`, `test/dynamic-root.test.ts`, and `test/adopter.test.ts` | Missing and misclassified paths, duplicate maps, managed-block violations, all lifecycle placements and indexes, symlinks, non-default knowledge roots, existing Draft root and Specification reuse, byte-preserving reconciliation, rollback, idempotence, and exact [NKF-013](../../tasks/completed/NKF-013-initial-greenfield-onboarding.md) and [NKF-015](../../tasks/completed/NKF-015-agent-led-initial-onboarding.md) predecessor repair |
| Neutral agent integration | `integrations/onboarding/nkf-onboarding-protocol.md`, `.agents/skills/nkf-onboarding/SKILL.md`, and `.claude/skills/nkf-onboarding/SKILL.md` | AI-neutral preparation and handoff instructions for complete topology and deliberate repair |
| Authoring validation | `package.json` and `scripts/verify-agent-guidance.mjs` | Current-snapshot authoring validation separated from the mandatory release-recommendation verifier under [ADR 0074](../../decisions/0074-separate-authoring-and-recommended-release-verification.md) |
| Public guidance | `public-docs/` | User-facing topology explanation, onboarding, recovery, reference, and complete Product and Technology examples |
| Self-hosted bundle | `knowledge/` and `.nourd/knowledge/` | NKF repository exercise of the same required topology and declaration boundary |

## Responsibilities And Ownership Boundaries

The accepted Markdown owns human-readable normative meaning. Its digest-bound
YAML companion owns executable rule declarations; Schemas and checker code
derive from that pair. The checker reports conformance of a concrete snapshot
but does not accept knowledge or confirm this Realization.

The onboarding agent owns semantic assessment and human-confirmation handoff.
The adopter owns deterministic generation, preservation, staging, rollback,
receipt, and idempotence. Project authority owns Root Profile selection,
document meaning, lifecycle changes, and acceptance. A complete directory tree
does not create empty semantic records or authority placeholders.

## Interfaces Dependencies Locators And Resolution

The supported initial workflow remains `inspect`, plan resolution, `seal`, and
`onboard`. Candidate construction now always resolves the fixed canonical map,
required navigation indexes, current-system Realization, profile-specific root
record, and Technology initial Specification before staged full-bundle checking.
When complete semantic review establishes that an inspected source already is
the safe Draft root or initial Technology Specification, the plan may select
that exact path and matching Draft declaration. Candidate construction then
preserves its exact bytes and source identity instead of generating a duplicate.
The executable does not infer this selection from a filename.

`repair-topology` is a separate transaction. It resolves the installed
predecessor archive and adopter from a trusted [NKF-013](../../tasks/completed/NKF-013-initial-greenfield-onboarding.md) or [NKF-015](../../tasks/completed/NKF-015-agent-led-initial-onboarding.md) receipt,
verifies their published digests, reconstructs the predecessor-generated map
bytes, rejects consumer drift, stages a complete successor candidate, checks
it, and only then applies a rollback-capable replacement. It does not repeat
semantic category assessment.

## External Authority And Operational State Boundaries

Receipts, release recommendations, Git history, workflow runs, branch
protection, publication state, installed integration pins, and validation
results remain operational facts in their owning systems. This Realization
records durable artifact mappings but does not make those external facts
current by assertion.

No Nourd Agent SDK files are modified by [NKF-017](../../tasks/completed/NKF-017-complete-portable-onboarding-topology.md). Existing consumers retain
their installed predecessor until project authority deliberately invokes an
eligible repair or later onboarding path.

## Compatibility Verification And Recovery

The topology is accepted pre-stable evolution within the single NKF `0.1`
version namespace. It introduces no record sub-version, selectable layout, or
parallel minimal contract. New onboarding produces the complete topology;
already adopted repositories do not migrate silently.

Ordinary initial onboarding preserves existing bytes outside the managed map
block and never allocates `README-2.md`. Ambiguous collisions or unsupported
existing lifecycle placement fail before mutation. Repair requires exact
predecessor evidence and fails closed on archive, adopter, pin, map, source, or
candidate drift. Both onboarding and repair use staged validation, transaction
rollback, and idempotent repeated execution.

Product and Technology fixtures and focused negative tests exercise the
derived behavior. The complete authoring gate passes nineteen test files with
151 tests, deterministic checker and adopter builds, public-documentation
verification, and full self-host validation with zero diagnostics. Receipt
tamper tests cover predecessor profile and successor archive, source, checker,
and adopter bindings. [ADR 0074](../../decisions/0074-separate-authoring-and-recommended-release-verification.md) separates current-snapshot authoring validation
from the explicit recommended-release verifier. The independent completion
audit records no unresolved material finding and [ADR 0075](../../decisions/0075-confirm-complete-portable-onboarding-topology.md) separately confirms
this exact Realization. The predecessor recommendation remains unchanged;
release and publication remain separate future boundaries.
