---
id: adr-0060
type: decision
summary: Adopt one AI-neutral NKF authoring protocol, verified agent-host-surface adapters, portable skill representations, one deterministic project command, exact-commit continuous integration, and a separately activated protected merge gate.
created_at: 2026-07-31T00:03:54Z
record_lifecycle: immutable
record_status: accepted
task: NKF-011
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0060: Layered Contract Enforcement

- **Review Evidence:**
  `knowledge/evidence/audits/nkf-011-ai-neutral-enforcement-design-reaudit.md`

## Context And Problem

NKF already defines deterministic validation and the separation between
normative meaning, Realization, confirmation, and conformance. It did not yet
provide one coherent repository adoption path that guides AI-assisted
authoring early, checks every candidate through one command, and prevents an
invalid exact commit from entering a protected default branch.

No instruction filename or native skill location is discovered by every
present or future agent host. Natural-language instructions also cannot become
mechanical enforcement. Treating a vendor file as universal would create a
false compatibility claim.

## Decision

NKF adopts the direction proposed by this exact Design revision:

| Design | SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/layered-contract-enforcement.md` | `b8dba5836735cade5ed11425763a3541d5837d05de8472c62ee663a36b7e10e7` |

The adopted model has these boundaries:

1. one plain CommonMark protocol at
   `integrations/ai/nkf-authoring-protocol.md` owns the complete,
   vendor-neutral authoring workflow;
2. host instruction files are thin discovery adapters, recorded and verified
   per agent-host surface rather than per model or broad product family;
3. byte-identical `.agents` and `.claude` `SKILL.md` representations use only
   the shared portable subset and bootstrap the neutral protocol;
4. unknown file-capable surfaces may be directed to the neutral protocol but
   receive no automatic-discovery claim;
5. `npm run nkf:check` is the one supported authoring-handoff and
   continuous-integration command;
6. every candidate output receives the same deterministic command and
   exact-commit check regardless of authorship;
7. enforcement-surface changes require explicit human review and a successor
   Realization confirmation boundary;
8. remote branch protection and bypass controls remain separately activated
   operational state; and
9. staged-snapshot Git hooks and automatic lifecycle closure remain deferred.

## Scope And Applicability

This Decision governs the NKF repository reference implementation and the
portable adoption pattern later supplied to deliberate consumers.

Technology self-hosting declares applicable integration files as
`governed_artifacts`. Product adoption does not add those files to native
Product conformance; its adapter verifier and merge controls remain separate
repository policy.

## Rationale

One neutral protocol avoids vendor-specific meaning and duplicated workflows.
Thin adapters provide early guidance where an exact host convention is
verified. The deterministic output gate covers all candidate sources,
including unsupported or noncompliant AI surfaces, without pretending that
repository prose can force model behavior.

Keeping the workflow, project command, and merge protection as Realization
preserves NKF's authority boundary. Accepted Specifications remain the only
source of normative NKF meaning.

## Alternatives Considered

A root `AGENTS.md` as the canonical workflow was rejected because its filename
is one host convention.

Independent vendor-specific instruction bodies were rejected because they can
drift and compete.

A skill-only implementation was rejected because not every host discovers the
same skill path.

Candidate-controlled continuous integration as an independent trust anchor
was rejected because the candidate can modify its own command, verifier,
checker, or workflow.

A naïve pre-commit hook was rejected because a working-tree check is not an
exact staged-snapshot check.

## Consequences And Trade-Offs

The repository gains several small adapter files plus a registry and verifier.
Host conventions are mutable external facts and require periodic review.

The strongest universal guarantee applies to candidate outputs, not automatic
AI obedience. A supported surface may receive earlier guidance, while an
unknown surface remains subject to the same mechanical gate.

The checked-in workflow will initially be self-checking evidence. It becomes a
remote hard gate only after the workflow, required check, review controls,
bypass policy, and an intentionally blocked invalid candidate are observed in
Github.

## Compatibility

This is repository integration architecture and does not revise the NKF 0.1
Specification, executable companion, Root Profiles, version namespace, or
native conformance meaning.

A consumer adopts it deliberately with a separately verified current checker
release. The moving NKF branch is not a consumer trust anchor.

## Realization Requirements

Realization requires:

1. the neutral protocol;
2. bounded host adapters and a surface-level registry;
3. byte-identical portable skill representations;
4. deterministic adapter-integrity verification with negative tests;
5. the one project command;
6. a read-only, exact-commit Github workflow with full-SHA Action pins;
7. complete Technology governed-artifact mappings;
8. current-system and self-hosting Realization updates;
9. full tests, build verification, and self-host validation;
10. a separate final implementation audit; and
11. a later Decision before the successor Realization is called confirmed.

## Non-Claims

This Decision does not:

- force arbitrary AI software to discover or obey repository instructions;
- confirm that any proposed adapter, skill, command, workflow, or protection
  currently exists;
- make repository integration files normative NKF meaning;
- establish remote branch protection or bypass policy;
- publish a checker;
- migrate a consumer;
- close every active Task or Design automatically; or
- turn a passing check into acceptance or confirmation.
