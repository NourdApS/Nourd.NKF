---
id: adr-0069
type: decision
title: "ADR 0069: Agent-Led Initial Onboarding"
summary: Adopt agent-led semantic repository assessment for the two initial onboarding categories while retaining deterministic mechanical capture, sealing, application, rollback, and validation.
created_at: 2026-07-31T14:05:30Z
record_lifecycle: immutable
record_status: accepted
task: NKF-015
---

# ADR 0069: Agent-Led Initial Onboarding

## Context And Problem

[ADR 0067](0067-initial-greenfield-onboarding.md) adopted a deterministic initial eligibility boundary based on
Markdown counts, byte limits, and lifecycle-frontmatter indicators. Exercise
against Agent SDK exposed the conceptual defect: those observations are useful
mechanical facts but cannot determine whether a repository contains useful
knowledge, meaningful source code, project configuration, incidental material,
or mature history requiring another onboarding path.

The Human Product Owner subsequently defined ten conceptual repository
starting categories, assigned only Empty Repository and Tiny Knowledge With No
Source Or Configuration to the initial path, and deferred the other categories
to [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) pending later criteria confirmation. The same authority explicitly
accepted agent-led inspection and classification, human confirmation where
required, and deterministic sealing, application, and validation.

## Decision

NKF adopts the direction proposed by this exact Design revision:

| Design | Accepted SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/agent-led-initial-onboarding.md` | `a380ecbcdb1661ecc1689fd2db948ad70339781db28cc23ed8da87d5a95f706e` |

The adopted direction establishes:

1. the existing portable `nkf-onboarding` skill as the owner of complete
   repository review, semantic assessment, evidence, recommendation, and
   uncertainty;
2. Category 1, Empty Repository, with agent-led automatic progression only
   after an explained effectively-empty finding;
3. Category 2, Tiny Knowledge With No Source Or Configuration, with mandatory
   human confirmation and an explicit negative or indeterminate override path;
4. no deterministic repository survey, maturity classifier, numeric semantic
   threshold, or selectable Generic profile;
5. the existing `inspect` command retained only as a mechanical source-capture
   and candidate-workspace operation inside the agent workflow;
6. a plan-bound assessment and confirmation record that remains operational
   candidate state rather than canonical project meaning;
7. an exact project manifest that prevents silent file omission without
   classifying the meaning of those files; and
8. deterministic seal, apply, release verification, native generation,
   transaction, rollback, idempotence, and full-bundle validation.

The executable may establish only mechanical readiness. If the agent cannot
recommend Category 1 or Category 2, it reports evidence and stops without
guessing a later category. [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) remains deferred and its Category 3 through
Category 10 criteria remain unresolved.

## Scope And Applicability

This Decision governs the derived pre-adoption protocol, portable onboarding
skill, plan envelope, adopter behavior, diagnostics, tests, public guidance,
distribution projection, and successor current-system Realization.

It supersedes [ADR 0067](0067-initial-greenfield-onboarding.md) only where [ADR 0067](0067-initial-greenfield-onboarding.md) assigns semantic eligibility or
maturity to numeric limits and deterministic content heuristics. [ADR 0067](0067-initial-greenfield-onboarding.md)'s
project-authority boundary, Product and Technology profiles, candidate
workspace, generated native declarations, release integrity, staged
full-bundle check, transaction, rollback, idempotence, and status separation
remain adopted unless this Decision explicitly refines them.

This Decision does not revise the NKF 0.1 normative Specification, executable
companion, JSON Schemas, Root Profiles, native release archive, acceptance
model, confirmation model, or conformance meaning.

## Rationale

Repository categories depend on meaning and context. A participating agent can
read heterogeneous files, distinguish useful from incidental material, explain
evidence, expose uncertainty, and ask for human confirmation. Fixed counts and
frontmatter tokens cannot do that reliably.

Instructions alone cannot prove complete coverage or exactness. The separate
mechanical source manifest, seal, staged checker, and transaction preserve the
enforceable boundary without presenting the tool as a semantic authority.

Keeping `inspect` as a mechanical command avoids an unnecessary command break.
Removing its eligibility claim makes its responsibility accurate. Binding the
assessment into the existing plan avoids creating a competing survey artifact
or contract.

## Alternatives Considered

Retaining deterministic thresholds was rejected because they turn size and
syntax into misleading semantic proxies.

A separate deterministic survey was rejected because it duplicates the
agent's reasoning and invites a mechanical result to appear authoritative.

A model-driven executable classifier was rejected because provider behavior
would become part of an allegedly deterministic contract.

Agent-only onboarding without mechanical sealing was rejected because it
cannot enforce complete coverage, exact bytes, paths, release integrity,
transaction safety, or conformance.

Mandatory human category confirmation for Empty Repository was not selected;
the agent may progress after a complete and explained effectively-empty
finding. Tiny Knowledge always retains human confirmation.

## Consequences And Trade-Offs

Initial onboarding becomes dependent on a participating agent or an equivalent
human following the complete portable procedure. The command-line tool no
longer claims it can determine initial semantic eligibility by itself.

The plan becomes slightly richer because it records assessment, evidence,
recommendation, and confirmation. Deterministic validation can verify that the
record is complete and internally consistent, but cannot prove the semantic
truth or authenticity of a human statement.

Complete project manifests improve omission and drift detection but may cost
more input/output than the former selected-surface snapshot. This is acceptable
for the deliberately narrow Empty and Tiny Knowledge starting categories.

## Compatibility

Existing adopted repositories continue using `install`, `update`, `check`,
`status`, and `integration-check`; their pins and knowledge do not move
automatically.

Unapplied [NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md) onboarding workspaces must be regenerated with the successor
adopter because they lack the assessment and complete source-manifest
semantics. Those workspaces are short-lived operational state, not canonical
knowledge or a supported migration contract.

The NKF version coordinate remains `0.1`. The plan change does not introduce a
second NKF version namespace or parallel native record contract.

## Realization Requirements

Realization requires the exact protocol, byte-identical portable skills,
mechanical manifest, assessment and confirmation validation, diagnostics,
adopter, tests, public guidance, distribution projection, and compatibility
behavior named by the adopted Design.

It also requires Category 1 and Category 2 exercises, negative and uncertain
recommendations, deliberate human override, incomplete assessment,
confirmation, manifest and Markdown coverage failures, source and candidate
drift, path and symbolic-link failures, rollback, idempotence, and an
independent completion audit before successor Realization confirmation.

## Non-Claims

This Decision does not:

- implement or confirm the successor workflow;
- prove that an agent reviewed every file semantically;
- accept or conform a consumer repository;
- define Category 3 through Category 10 criteria;
- activate [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md);
- authorize Agent SDK mutation;
- publish an adopter or release;
- establish protected branch enforcement; or
- complete [NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md).
