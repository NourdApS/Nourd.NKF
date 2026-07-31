---
id: nkf-0.1-native-realization
type: realization
title: NKF Current System
summary: This is the consolidated confirmed current-system Realization for the Nourd Knowledge Format repository, including the current internal release, public documentation, and pinned consumer adoption path.
created_at: 2026-07-30T15:59:54Z
record_lifecycle: immutable
record_status: accepted
task: NKF-008
confirmation_status: confirmed
confirmation_decisions:
  - adr-0059
  - adr-0061
  - adr-0062
  - adr-0063
  - adr-0065
  - adr-0066
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
```

| Component | Durable Location | Current State | Confirmation |
| --- | --- | --- | --- |
| Normative Specification | `knowledge/specifications/nkf-0.1.md` | Accepted current governed-frontmatter revision | ADR 0058 |
| Executable companion | `contracts/nkf/0.1/nkf.yaml` | Digest-bound executable companion | ADR 0058 |
| Core JSON Schemas | `contracts/nkf/0.1/schemas/` | Source-bound current Schemas; bundle kind vocabulary extended | ADR 0059 |
| Checker library and CLI | `src/checker/`, `src/cli.ts` | Governed frontmatter, references, and prior checker behavior implemented | ADR 0059 |
| Fixtures and tests | `fixtures/`, `test/` | 18 test files and 126 tests pass; NKF-008 adds Product and Technology adoption, complete public examples, and public-projection negative coverage | ADR 0066 |
| Build artifact | `dist/nourd-nkf-checker.mjs` | Deterministically verified local build | ADR 0059 |
| Self-host declaration | `.nourd/knowledge/` | Migrated Technology bundle with complete source and artifact bindings | ADR 0059 |
| Neutral authoring procedure | `integrations/ai/nkf-authoring-protocol.md` | Implemented vendor-neutral CommonMark protocol | ADR 0061 |
| Agent guidance integration | `AGENTS.md`, host adapters, portable skills, registry, verifier | Implemented for twelve explicit host surfaces with unknown-surface fail-closed policy | ADR 0061 |
| Project enforcement command | `package.json` | `npm run nkf:check` orchestrates guidance, engineering, build, and bundle checks | ADR 0061 |
| Exact-commit workflow | `.github/workflows/nkf-contracts.yml` | Present on remote `master`; exact-commit push run `30595019454` passed; required protection unavailable and deferred to NKF-012 | ADR 0061 local file; ADR 0062 remote activation; ADR 0063 Task allocation |
| Consumer adopter | `dist/nourd-nkf-adopt.mjs` | Deterministic self-contained Product and Technology installer and checker; exact public bytes are digest-bound | ADR 0066 |
| Public documentation | `public-docs/` | Published allowlisted CommonMark and Mermaid projection with exact Specification and adopter mirrors plus conformant complete Product and Technology examples | ADR 0066 confirmation; remote Evidence owns publication state |
| Consumer exercise | `.github/workflows/nkf-consumer-adoption.yml` | Local and Github exact-release Product exercise passes install, validation, no-update, and four tamper boundaries | ADR 0066 confirmation; remote Evidence owns run state |
| Latest result | `.nourd/validation-result.json` | Latest passing full-bundle observation | Conformance only |
| Release tooling | `scripts/package-release.mjs`, `scripts/release/` | Rebound, reproducibly built, published as the exact private prerelease, re-downloaded, and independently verified | ADR 0059 mechanism; ADR 0065 inputs; ADR 0066 successor |

Supporting current Realizations provide the detailed mappings:

- [Contracts And Schemas](current/contracts-and-schemas.md)
- [Checker And Validation](current/checker-and-validation.md)
- [Layered Contract Enforcement](current/layered-contract-enforcement.md)
- [Release Documentation And Adoption](current/release-documentation-and-adoption.md)
- [Self-Hosting](current/self-hosting.md)
- [Release Package](current/release-package.md)

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

The confirmed self-host successor contains 99 record declarations, 57 explicit
non-record sources, and 109 governed artifacts. Focused NKF-008 checks pass
eighteen test files with 126 tests, deterministic checker and adopter builds,
the public-documentation verifier, complete Product and Technology public
examples, Product and Technology installation, same-pin no-update, and
archive, pin, adapter, and knowledge tamper rejection. The final canonical
self-validation passes after all successor mappings are synchronized.

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

Recovery uses Git history, immutable Decision and Evidence provenance,
predecessor digests, explicit successor Decisions, deterministic rebuilding,
and deliberate consumer migration. A failed validation blocks a conformance
claim; it does not revoke prior acceptance or silently change NKF meaning.
