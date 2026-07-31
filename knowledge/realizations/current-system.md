---
id: nkf-0.1-native-realization
type: realization
title: NKF Current System
summary: This is the consolidated current-system Realization for the Nourd Knowledge Format repository, including the unconfirmed NKF-015 agent-led initial-onboarding successor and its deferred NKF-014 extension boundary.
created_at: 2026-07-30T15:59:54Z
record_lifecycle: immutable
record_status: accepted
task: NKF-015
confirmation_status: partially-confirmed
confirmation_decisions:
  - adr-0068
unconfirmed_scope: The NKF-015 agent-led initial-onboarding successor remains unconfirmed pending its complete audit and confirmation Decision.
---

# NKF Current System

## Realization Identity And Kind

This is the consolidated current-system Realization for the Nourd Knowledge
Format repository. It is the normal entry point for understanding how
accepted NKF meaning is implemented.

It consolidates architecture, topology, components, relationships,
interfaces, artifact mappings, implementation status, confirmation status,
and relevant Decision provenance. It is not a separate lifecycle layer,
normative authority, generated validation result, or copy of live operational
state.

The stable record identity remains `nkf-0.1-native-realization`.

## Governed Meaning Realized

The implementation targets the accepted NKF 0.1 Common Specification and its
Product and Technology Root Profiles. Markdown remains the normative human
authority and the executable YAML remains its digest-bound companion.

The current exact authority pair is accepted through
[ADR 0058](../decisions/0058-governed-frontmatter.md). It makes the safe YAML
frontmatter envelope introduced through ADR 0054 a governed
document-orientation surface while keeping substantive canonical meaning in
the CommonMark body. ADRs 0055 and 0056 remain predecessor provenance for the
native Design responsibility vocabulary.

The predecessor implementation baseline is
[ADR 0057](../decisions/0057-current-system-realization.md). ADR 0059 confirms
the frontmatter implementation and repository migration produced by NKF-010.
Confirmation applies only to the exact revisions and artifacts listed by
that Decision; it does not make a release current or verify external
acceptance authority.

[ADR 0060](../decisions/0060-layered-contract-enforcement.md) adopts the
repository integration direction for NKF-011 without changing normative NKF
0.1 meaning.
[ADR 0061](../decisions/0061-confirm-layered-contract-enforcement-realization.md)
confirms the exact audited local integration and current-system revisions.
[ADR 0062](../decisions/0062-confirm-remote-workflow-activation-boundary.md)
confirms the successor Realization revisions after the workflow was pushed and
observed successfully on its exact commit. It confirms remote workflow
activation, not the unavailable protected merge gate.
[ADR 0063](../decisions/0063-defer-protected-merge-gate.md) completes NKF-011
for the delivered enforcement scope, transfers protected-gate activation and
proof to deferred NKF-012, and confirms this exact successor account without
claiming that `master` is protected.

[ADR 0064](../decisions/0064-release-documentation-and-adoption.md) adopts the
separate native release, public explanation, and pinned consumer experience.
[ADR 0065](../decisions/0065-confirm-current-release-bound-checker.md)
confirms the exact current checker and release inputs.
[ADR 0066](../decisions/0066-confirm-release-documentation-and-adoption.md)
confirms the audited successor current-system account after the internal
release, public documentation, local consumer path, and remote consumer
workflow were separately observed.

[ADR 0067](../decisions/0067-initial-greenfield-onboarding.md) adopts the
AI-neutral inspect-plan-apply path for empty and small-document Product and
Technology repositories.
[ADR 0068](../decisions/0068-confirm-initial-greenfield-onboarding.md)
confirms the exact successor Realizations after the adversarial completion
audit, clean exact-commit workflows, and fresh public-byte verification were
recorded separately.

[ADR 0069](../decisions/0069-agent-led-initial-onboarding.md) supersedes the
deterministic semantic eligibility portion of ADR 0067. The current candidate
workflow assigns repository assessment to the portable onboarding skill,
requires human confirmation for Category 2, and retains deterministic source
binding, sealing, transaction, and validation. Its exact successor Realization
remains unconfirmed while NKF-015 is active.

## Durable Mapping

The current repository topology is:

```text
Canonical Specification
        ↓ exact semantic derivation
Executable YAML Contract
        ↓ closed structural derivation
JSON Schemas
        ↓ loaded by
Native Checker And CLI
        ↓ validates
Project-Root .nourd Bundle + Knowledge Sources + Governed Artifacts
        ↓ emits
Latest Validation Result

Neutral Authoring Protocol
        ↓ discovered through
Host Adapters + Portable Skill
        ↓ hands off to
npm run nkf:check
        ↓ reused by
Exact-Commit Github Workflow

Confirmed Checker + Exact Authority Inputs
        ↓ packaged as
Content-Addressed Internal Release
        ↓ verified and installed by
Public-Safe Pinned Adopter
        ↓ accompanied by
Allowlisted Public Documentation Projection

Unadopted Empty Or Tiny Knowledge Repository
        ↓ complete agent review and applicable human confirmation
Mechanical Project Capture + External Candidate Workspace
        ↓ resolved assessment and Markdown representations
Deterministically Sealed Onboarding Plan
        ↓ deterministic generation and staged check
Draft NKF Candidate Or Complete Rollback
```

| Component | Durable Location | Current State | Confirmation |
| --- | --- | --- | --- |
| Normative Specification | `knowledge/specifications/nkf-0.1.md` | Accepted current governed-frontmatter revision | ADR 0058 |
| Executable companion | `contracts/nkf/0.1/nkf.yaml` | Digest-bound executable companion | ADR 0058 |
| Core JSON Schemas | `contracts/nkf/0.1/schemas/` | Source-bound current Schemas; bundle kind vocabulary extended | ADR 0059 |
| Checker library and CLI | `src/checker/`, `src/cli.ts` | Governed frontmatter, references, and prior checker behavior implemented | ADR 0059 |
| Fixtures and tests | `fixtures/`, `test/` | NKF-015 adds Category 1 and Category 2 assessment, mandatory confirmation, negative override, numeric and frontmatter neutrality, complete project-source drift, and revised guidance coverage over the confirmed NKF-013 suite | NKF-015 successor remains unconfirmed over ADR 0068 |
| Build artifact | `dist/nourd-nkf-checker.mjs` | Deterministically verified local build | ADR 0059 |
| Self-host declaration | `.nourd/knowledge/` | Migrated Technology bundle with complete source and artifact bindings | ADR 0059 |
| Neutral authoring procedure | `integrations/ai/nkf-authoring-protocol.md` | Implemented vendor-neutral CommonMark protocol | ADR 0061 |
| Agent guidance integration | `AGENTS.md`, host adapters, portable skills, registry, verifier | Implemented for twelve explicit host surfaces with unknown-surface fail-closed policy; the root adapter also contains an NKF-repository-only Task-authorization policy outside portable NKF meaning | ADR 0061 predecessor; NKF-015 successor remains unconfirmed |
| Project enforcement command | `package.json` | `npm run nkf:check` orchestrates adopted-repository guidance, pre-adoption guidance verification, engineering, build, and bundle checks | ADR 0068 successor over ADR 0061 |
| Exact-commit workflow | `.github/workflows/nkf-contracts.yml` | Present on remote `master`; NKF-013 successor run `30628878063` passed on exact commit `b50493ddb42c87ed426eeb3bb11d3568652d8130` without annotations; required protection remains deferred to NKF-012 | ADR 0068 successor over ADRs 0061–0063; run remains external Evidence |
| Consumer adopter | `dist/nourd-nkf-adopt.mjs` | Retains inspect, seal, onboard, staged validation, rollback, and receipt commands; NKF-015 removes semantic eligibility claims, adds complete mechanical capture and plan-bound assessment reporting | NKF-015 successor remains unconfirmed over ADR 0068 and ADR 0066 |
| Initial onboarding | `scripts/onboarding/`, `integrations/onboarding/`, portable onboarding skills | Agent-led Empty and Tiny Knowledge assessment, Category 2 human confirmation, complete mechanical source manifest, native generation, whole-project transaction, and NKF-014 semantic handoff implemented | NKF-015 successor remains unconfirmed; ADR 0068 confirms the predecessor |
| Public documentation | `public-docs/` | Local candidate projection explains the agent-led workflow and mechanical enforcement boundary; the previously published NKF-013 projection remains the latest externally observed publication | NKF-015 successor unconfirmed and unpublished; ADR 0068 covers predecessor publication Evidence |
| Consumer exercise | `.github/workflows/nkf-consumer-adoption.yml` | Unborn-Git Product and Technology onboarding, generated package command, existing install, no-update, and tamper rejection passed locally and in run `30628889305` on exact commit `b50493ddb42c87ed426eeb3bb11d3568652d8130` | ADR 0068; run remains external Evidence |
| Latest result | `.nourd/validation-result.json` | Persists the latest full-bundle observation for its exact validated snapshot; the result may become stale immediately when a Governed Validation Input changes | Conformance observation only |
| Release tooling | `scripts/package-release.mjs`, `scripts/release/` | Rebound, reproducibly built, published as the exact private prerelease, re-downloaded, and independently verified | ADR 0059 mechanism; ADR 0065 inputs; ADR 0066 successor |

Supporting current Realizations provide the detailed mappings:

- [Contracts And Schemas](current/contracts-and-schemas.md)
- [Checker And Validation](current/checker-and-validation.md)
- [Layered Contract Enforcement](current/layered-contract-enforcement.md)
- [Agent-Led Initial Onboarding](current/agent-led-initial-onboarding.md)
- [Release Documentation And Adoption](current/release-documentation-and-adoption.md)
- [Self-Hosting](current/self-hosting.md)
- [Release Package](current/release-package.md)

The confirmed
[Initial Greenfield Onboarding](current/initial-greenfield-onboarding.md)
Realization remains immutable predecessor provenance. ADR 0069 supersedes its
deterministic semantic-eligibility behavior, so it is not current onboarding
guidance.

## Responsibilities And Ownership Boundaries

The canonical Specification owns normative meaning. The executable YAML
represents that meaning mechanically. Schemas enforce local closed shapes.
The checker owns deterministic project, source, graph, record-contract,
security, authority-binding, and result behavior assigned to it by the
accepted contract.

The `.nourd` declaration represents this repository as one Technology bundle;
it does not accept the Markdown or infer Design disposition, section meaning,
relationships, Task state, Evidence classification, or confirmation from
paths and filenames. Applicable frontmatter exposes orientation and must agree
with its declaration, but it does not replace either substantive CommonMark
meaning or the executable declaration.

This Realization owns a navigable implementation account. It does not compete
with the Specification, decide a Design disposition, accept knowledge, or
turn a passing check into confirmation.

The neutral authoring protocol and adapters guide capable AI surfaces without
becoming model authority. The project command and merge workflow judge exact
candidate bytes without asking an AI to decide conformance.

## Interfaces Dependencies Locators And Resolution

The native invocation starts at a candidate project root whose direct
`.nourd` entry must resolve safely inside that project. The bundle at
`.nourd/knowledge/bundle.yaml` selects exactly one concrete Root Profile and a
project-contained relative `knowledge_root`.

Record declarations resolve from `.nourd/knowledge/records/*.yaml` to exact
Markdown sources under `knowledge_root`. Technology bundles may additionally
bind project-contained governed artifacts. The checker loads its trusted
contract set from `contracts/nkf/0.1/` and uses Node.js with pinned package
dependencies.

AI-assisted authoring begins from the neutral protocol. Registered host
surfaces resolve it through exact adapters or portable skills. Every handoff
uses `npm run nkf:check`, and the checked-in Github workflow invokes the same
command for the exact candidate commit.

Pre-adoption begins with the separate neutral onboarding protocol and external
candidate workspace. A participating agent reviews the complete repository,
records its assessment and applicable human confirmation in the plan, and then
hands exact mechanics to sealing. The onboarder resolves a sealed plan into
exact knowledge, native declarations, and the same installed authoring
boundary only after a complete staged project passes.

Durable repository paths and digests are locators and integrity bindings.
They do not become semantic identity or live operational authority.

## External Authority And Operational State Boundaries

Git owns commits and history. Github owns remote repository and Release state.
Package registries own publication state. Consumer repositories own their
knowledge, declarations, acceptance, migrations, and operational use.

The latest validation result records one observed snapshot and may become
stale immediately after an input changes. This Realization records the durable
mechanism and current repository implementation status, not mutable workflow,
process, deployment, account, permission, health, or execution state.

The workflow exists in the repository and on remote `master`. Github Actions
run `30595019454` passed for exact commit
`143f6f49d9f42b2e4e8e5073ed119a1c3d092d88`, exposing check run `Validate`.
The linked remote Evidence, rather than this Realization, is the source for
that time-bound observation.

Github returned HTTP `403` for both branch-protection and repository-ruleset
access because the repository is private under the current plan. The required
check, review ownership, bypass controls, and blocked invalid pull-request
observation therefore remain unavailable and unconfirmed. No repository
visibility or subscription change was made.

NKF-011 is complete for its confirmed authoring guidance, deterministic local
gate, and active exact-commit workflow. Deferred NKF-012 owns the required
`Validate` check, one mandatory pull-request approval, bypass policy, and
blocked-invalid-candidate observation. No release, deployment, or
external-consumer migration is part of either enforcement Task.

NKF-008 is complete. The private release, recommendation, public repository,
freshly cloned public bytes, complete public examples, local consumer path,
and Github consumer workflow were observed separately and retained as
Evidence. Those external facts support but do not replace ADR 0066's
confirmation act.

NKF-013 is complete for the accepted initial greenfield scope. Exact-commit
contract and consumer workflows passed without annotations, the public
projection was freshly cloned and matched, the completion audit records no
unresolved material finding, and ADR 0068 separately confirms the exact
successor Realizations. These time-bound external observations remain
historical predecessor Evidence; they do not become authority merely because
this account records them. NKF-015 now owns the unconfirmed agent-led
successor. No successor public projection is claimed by the current
candidate. Consumer onboarding is outside NKF-015 and will be performed
separately by the Human Product Owner.

## Compatibility Verification And Recovery

Verification consists of strict authority-pair binding, schema compilation,
type checking, positive and negative fixtures, diagnostic coverage, unit and
integration tests, deterministic build verification, explicit self-host
declarations, and full-bundle validation.

The predecessor `npm run check` baseline passes type checking, 15 test files
with 102 tests, build, and deterministic build verification under ADR 0059.
NKF-011 adds the adapter verifier, eighteen focused positive and negative cases,
the unified `npm run nkf:check` command, and additional governed integration
artifacts.

The confirmed predecessor self-host successor contains 99 record declarations,
57 explicit non-record sources, and 109 governed artifacts. The confirmed
NKF-013 completion contains 103 record declarations, 60 explicit non-record
sources, and 119 governed artifacts. Focused NKF-008 checks pass
eighteen test files with 126 tests, deterministic checker and adopter builds,
the public-documentation verifier, complete Product and Technology public
examples, Product and Technology installation, same-pin no-update, and
archive, pin, adapter, and knowledge tamper rejection. The NKF-013 successor
passes nineteen test files with 135 tests, deterministic builds, local Product
and Technology exercises, public-byte verification, and full self-validation.

The isolated NKF-015 candidate passes nineteen test files with 136 tests,
agent and onboarding guidance verification, deterministic checker and adopter
builds, public documentation verification, and full-bundle self-hosting. Its
first recommendation check correctly rejected the then-unpublished successor
adopter and its first exact-worktree check exposed the unbound `AGENTS.md`
policy. The Human Product Owner subsequently authorized both completion
boundaries. Publication, remote verification, and confirmation remain separate
later acts at this interim revision.

The separate
[NKF-011 Realization Audit](../evidence/audits/nkf-011-layered-contract-enforcement-realization-audit.md)
records no unresolved material local-implementation finding. ADR 0061
separately confirms the exact local successor through delegated
technical-review authority. The
[remote activation Evidence](../evidence/audits/nkf-011-remote-enforcement-activation.md)
then establishes the successful remote workflow observation and protection
limit, ADR 0062 confirms that exact successor account, and ADR 0063 confirms
the later Task-allocation successor. None of these acts verifies acceptance
bindings, activates the protected gate, or makes authority-binding
verification part of native structural conformance.

The
[NKF-008 Completion Audit](../evidence/audits/nkf-008-completion-audit.md)
records no unresolved material finding inside the accepted release,
documentation, and adoption scope. ADR 0066 supplies the separate successor
confirmation rather than deriving confirmation from publication or passing
checks.

The
[NKF-013 Completion Audit](../evidence/audits/nkf-013-initial-greenfield-onboarding-completion-audit.md)
records the initial-onboarding requirement matrix, three repaired material
findings, exact remote observations, public-byte verification, and the
preserved NKF-014 extension seam. ADR 0068 supplies the separate exact-byte
confirmation act.

The
[NKF-015 Agent-Led Initial Onboarding Audit](../evidence/audits/nkf-015-agent-led-initial-onboarding-audit.md)
records two repaired findings, the isolated passing candidate checks, and the
original release, instruction-candidate, and consumer-operation boundaries.
Its post-audit resolution records the later authority changes. It does not
confirm the successor Realization.

Recovery uses Git history, immutable Decision and Evidence provenance,
predecessor digests, explicit successor Decisions, deterministic rebuilding,
and deliberate consumer migration. A failed validation blocks a conformance
claim; it does not revoke prior acceptance or silently change NKF meaning.
