---
id: nkf-layered-contract-enforcement
type: realization
summary: This Realization maps the NKF-015 successor enforcement command, including adopted-repository and pre-adoption guidance verification, the bounded repository-specific Task-authorization policy, and the preserved protected-gate boundary.
created_at: 2026-07-31T00:03:54Z
record_lifecycle: immutable
record_status: accepted
task: NKF-015
confirmation_status: confirmed
confirmation_decisions:
  - adr-0068
  - adr-0070
---

# NKF Layered Contract Enforcement

## Realization Identity And Kind

This Realization maps the repository implementation of the direction adopted
by ADR 0060. It describes durable integration artifacts and their current
implementation status. It is not normative NKF meaning, an acceptance act, a
confirmation act, or live Github state.

## Governed Meaning Realized

ADR 0060 adopts one vendor-neutral CommonMark authoring protocol, thin
agent-host-surface adapters, byte-identical portable skill representations,
one deterministic project command, exact-commit continuous integration, and a
separately activated protected merge gate.

The implementation applies accepted NKF 0.1 meaning without revising the
Specification, executable YAML companion, Root Profiles, or conformance
definition.

ADR 0063 completes NKF-011 for the implemented and confirmed authoring,
local-validation, and exact-commit workflow scope. It transfers activation
and proof of the separately governed protected merge gate to deferred
NKF-012.

NKF-008 preserves the exact `npm run nkf:check` interface and adds
deterministic adopter-build and public-documentation verification inside that
command. It also adds a separately dispatched consumer-adoption exercise
workflow. ADR 0066 confirms the successor package and workflow account after
the final audit and successful exact-release remote exercise.

NKF-013 adds a separate provider-neutral pre-adoption protocol, portable skill,
and integrity verifier before the existing authoring procedure. The canonical
command now verifies both guidance boundaries. ADR 0068 confirms the exact
audited successor after separate remote workflow and public-projection
observations were recorded.

NKF-015 replaces deterministic semantic onboarding eligibility with the
agent-led workflow adopted by ADR 0069 while retaining the same deterministic
output gate. The NKF repository additionally requires explicit human
direction before an agent creates, opens, or begins a Task. That instruction
is bounded repository policy in `AGENTS.md`; it is not portable NKF protocol
meaning and is not copied into the neutral protocol or portable skills.

## Durable Mapping

| Responsibility | Durable Artifact | Current Implementation |
| --- | --- | --- |
| Complete neutral procedure | `integrations/ai/nkf-authoring-protocol.md` | Plain CommonMark, vendor- and model-neutral |
| Surface registry | `integrations/ai/agent-hosts.yaml` | Twelve explicit surface entries and one unknown-surface policy |
| Root adapter | `AGENTS.md` | Bounded NKF adapter plus an authorized NKF-repository-only Task-creation policy; the repository policy is outside portable NKF meaning |
| Claude Code adapter | `CLAUDE.md` | Exact import of the root adapter |
| Gemini CLI adapter | `GEMINI.md` | Exact import of the root adapter |
| Github Copilot adapter | `.github/copilot-instructions.md` | Exact neutral-protocol bootstrap |
| Portable skill | `.agents/skills/nkf-authoring/SKILL.md` | Shared open-format representation |
| Claude skill path | `.claude/skills/nkf-authoring/SKILL.md` | Byte-identical shared representation |
| Integrity verifier | `scripts/verify-agent-guidance.mjs` | Closed registry, digest, path, import, skill, workflow, and command checks |
| Pre-adoption procedure | `integrations/onboarding/nkf-onboarding-protocol.md` | Complete vendor-neutral candidate-workspace and authority handoff |
| Pre-adoption skills | `.agents/skills/nkf-onboarding/SKILL.md` and `.claude/skills/nkf-onboarding/SKILL.md` | Byte-identical portable discovery routes |
| Pre-adoption verifier | `scripts/verify-onboarding-guidance.mjs` | Exact skill equality, required procedure, and provider-neutrality checks |
| Local command | `package.json` | `npm run nkf:check`, now verifying authoring guidance, onboarding guidance, engineering, builds, public projection, release catalog, and full bundle |
| Exact-commit workflow | `.github/workflows/nkf-contracts.yml` | Present on remote `master`; exact-commit push run passed; required protection unavailable and deferred to NKF-012 |
| Consumer exercise workflow | `.github/workflows/nkf-consumer-adoption.yml` | Separately dispatched exact-release exercise; successor run `30628889305` passed on exact commit `b50493ddb42c87ed426eeb3bb11d3568652d8130` without annotations |
| Negative verification | `test/agent-guidance.test.ts` | Eighteen focused cases covering missing, divergent, unregistered, nested, symlinked, stale, vendor-specific, lifecycle-wrapper, and workflow-weakening failures |
| Pre-adoption verification | `test/onboarding-guidance.test.ts` and `test/adopter.test.ts` | Two guidance-integrity cases plus eleven initial-onboarding, transaction, path, surface-drift, compatibility, and tamper cases |

The registry records host surfaces rather than model names. Its finite verified
set is not represented as universal automatic discovery. Unknown surfaces
remain `not-verified` and retain the neutral-protocol bootstrap plus universal
output gate.

## Responsibilities And Ownership Boundaries

The neutral protocol owns the complete derived authoring procedure. Adapters
only make that procedure discoverable. The skill provides progressive
discovery without copying the full workflow.

The root adapter may also contain bounded repository policy. The explicit
human-direction requirement for creating, opening, or beginning a Task
governs work in this repository only. Its registration and artifact digest
make changed instruction bytes visible to validation; they do not elevate the
policy into an NKF contract for consumers.

The verifier checks structural integrity and exact reviewed bytes. It does not
judge semantic adequacy, accept knowledge, confirm a Realization, or prove
that a model obeyed natural-language instructions.

The NKF checker continues to own native conformance. The project command
orchestrates adapter verification, repository engineering checks, a
deterministic build, and full-bundle validation without making those layers
normative authority.

## Interfaces Dependencies Locators And Resolution

The supported handoff interface is:

```text
npm run nkf:check
```

It invokes the agent-guidance verifier, onboarding-guidance verifier, type
checking, all tests, deterministic build verification, and full-bundle
self-validation in that order.

The verifier resolves every registered artifact as a project-contained regular
file, rejects symlinks in every path component, checks exact SHA-256 bindings,
validates the portable skill subset, checks adapter import reachability,
rejects unregistered instruction files across the supported host conventions,
requires the exact reviewed full-SHA Actions and workflow shape, and verifies
the complete project-command chain without lifecycle wrappers.

## External Authority And Operational State Boundaries

The workflow is present on remote `master`. Github Actions run `30595019454`
completed successfully for exact commit
`143f6f49d9f42b2e4e8e5073ed119a1c3d092d88`, with check run `Validate`.
The
[remote activation Evidence](../../evidence/audits/nkf-011-remote-enforcement-activation.md)
owns the exact time-bound operational observations.

Github returned HTTP `403` for branch-protection and repository-ruleset access
because the repository is private under the current plan. Required-check
protection, review ownership, bypass policy, and a blocked intentionally
invalid candidate therefore remain unavailable and unconfirmed. Completing
the protected gate requires Github Pro or a separately governed change to
public repository visibility. Deferred NKF-012 requires the exact `Validate`
check, at least one approving pull-request review, an explicit bypass policy,
and an observed blocked invalid candidate when that capability becomes
available.

The current workflow is self-checking evidence because a candidate can alter
its own verifier, command, checker, or workflow. Enforcement-surface changes
therefore require explicit human review and later successor-Realization
confirmation even when candidate continuous integration passes.

The predecessor consumer-adoption path is active for deliberately authorized
Product and Technology repositories through the separately verified private
release owned by NKF-008. The workflow observation is retained in
[consumer workflow Evidence](../../evidence/audits/nkf-008-consumer-workflow-execution.md).
The NKF-013 successor extends that exercise to initial Product and Technology
onboarding. Consumer run `30628889305` and contract run `30628878063` both
passed on exact commit `b50493ddb42c87ed426eeb3bb11d3568652d8130`
with empty annotation sets. The governed workflow pins use current immutable
Github Action release commits rather than the deprecated Node 20 action
runtime observed and repaired during audit.

## Compatibility Verification And Recovery

Both skill representations pass the bundled skill validator and are
byte-identical. The repository verifier passes with four adapters, two skill
representations, and twelve explicitly registered surfaces. Its eighteen
focused cases reject representative instruction, path, command, and workflow
integrity failures.

The canonical command also exited nonzero when exercised against a temporary
unrepresented Markdown source, demonstrating that the author identity does
not alter the output gate. The NKF-008 successor passes `npm run nkf:check`,
eighteen test files with 126 tests, deterministic checker and adopter build
verification, two checker-conformant complete public examples, and
full-bundle self-validation.

The NKF-013 successor passes nineteen test files with 135 tests,
the separate onboarding-guidance verifier, a local unborn-Git Product and
Technology exercise through the installed package command, deterministic
adopter verification, and full-bundle self-validation. The exact-commit
contract and consumer workflows separately passed without annotations.

The NKF-015 successor keeps the four-adapter and twelve-surface authoring
shape, rebinds the authorized bounded root instruction, and verifies the
agent-led onboarding procedure separately. Its final test, publication, and
exact-worktree observations are recorded by the NKF-015 completion Evidence.
ADR 0070 confirms this exact successor separately; the observations do not
confirm it by themselves.

The separate
[NKF-011 Realization Audit](../../evidence/audits/nkf-011-layered-contract-enforcement-realization-audit.md)
records no unresolved material local-implementation finding. These results
establish conformance Evidence only. ADR 0061 independently confirms the
local implementation through delegated technical-review authority. ADR 0062
confirms this exact successor account of the observed remote workflow and
protection limit. ADR 0063 confirms this later Task-allocation successor and
completes NKF-011 without claiming the protected gate. The protected remote
hard gate remains unconfirmed under deferred NKF-012. ADR 0066 confirms only
the NKF-008 successor command and consumer-workflow account.

Recovery restores reviewed artifact bytes and registry digests from Git,
reruns `npm run nkf:check`, and uses a later governed successor when accepted
behavior must change. A green candidate check cannot confirm its own
enforcement-surface revision.

The
[NKF-013 Completion Audit](../../evidence/audits/nkf-013-initial-greenfield-onboarding-completion-audit.md)
records the workflow-runtime finding, exact pin repair, and successor remote
observations. ADR 0068 separately confirms this exact revision rather than
deriving confirmation from the green runs.
