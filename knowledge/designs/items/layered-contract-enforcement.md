---
id: design-nkf-011-layered-contract-enforcement
type: design
title: NKF Layered Contract Enforcement
summary: This Design proposes one derived enforcement path from AI-assisted authoring through exact-commit continuous integration without making automation an NKF authority.
created_at: 2026-07-30T23:11:00Z
record_lifecycle: immutable
record_status: accepted
task: NKF-011
design_disposition: adopted
design_decisions:
  - adr-0060
proposal_authority_effect: ADR 0060 adopts this direction without making it normative NKF 0.1 meaning.
decision_authority: Human Product Owner, Nourd ApS
---

# NKF Layered Contract Enforcement

- **Authority Boundary:** This Design proposes how repositories apply the
  accepted NKF 0.1 contract. [ADR 0060](../../decisions/0060-layered-contract-enforcement.md) adopts that proposal. Neither the Design
  nor its adoption changes the format, confirms an implementation, establishes
  conformance, publishes a checker, or activates remote repository protection.

## Design Kind Problem And Scope

NKF already defines deterministic conformance, diagnostics, and the boundary
between normative authority and derived enforcement. The missing piece is a
coherent adoption path that applies those contracts while knowledge is being
authored and before a candidate commit can merge.

Without that path, a repository may have a capable checker but still depend on
an agent remembering every obligation, use different local and continuous
integration commands, or merge a snapshot that was never checked.

This Design covers:

- repository-scoped agent guidance;
- a discoverable NKF authoring skill;
- one project-local validation command;
- exact-commit continuous integration;
- the remote merge-gate activation boundary; and
- the deliberate deferral of commit hooks until staged-snapshot validation
  exists.

The NKF repository is the first reference implementation. The resulting
pattern is intended for later deliberate adoption by consumer repositories,
including Agent SDK, after a current checker release is available.

This Design does not define editor presentation, replace human review, require
all temporary commits on every branch to conform, publish a checker, migrate a
consumer, make Github part of the NKF format, guarantee that arbitrary AI
software obeys natural-language instructions, or automatically decide when a
legitimate active Task or Design has become stale.

## Governing Inputs And Constraints

- Normative Markdown and its digest-bound executable YAML companion remain the
  NKF authority pair.
- Schemas, checker code, skills, `AGENTS.md`, package scripts, workflow files,
  checks, and branch rules are derived Realizations.
- Only the owning human authority can accept knowledge or adopt a Design.
- Only an explicit confirmation Decision can confirm a Realization.
- A passing result establishes conformance for one observed snapshot only.
- The checker validates a project root and may replace only the latest
  `.nourd/validation-result.json`.
- The current checker requires Node.js 22 or later.
- The current release package is stale relative to the accepted authority pair;
  publication and consumer onboarding remain deferred to [NKF-008](../../tasks/completed/NKF-008-publish-and-onboard-consumers.md).
- Models do not discover repository files by themselves. Agent hosts and
  coding tools define discovery conventions, and the same model may behave
  differently in different hosts.
- One plain CommonMark authoring protocol at a vendor-neutral integration path
  owns the complete minimum AI-assisted workflow.
- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, Copilot instructions, and skill
  discovery locations are adapters to that neutral protocol rather than
  competing instruction authorities.
- Agent hosts that do not load root `AGENTS.md` directly require a separate,
  officially documented discovery adapter.
- The reusable workflow uses the open `SKILL.md` Agent Skills format. Host
  discovery paths are adapters around that portable skill content.
- A working tree may differ from the staged Git index. A check of the working
  tree therefore cannot truthfully claim staged-snapshot enforcement.
- Remote workflow presence, workflow execution, required-check configuration,
  branch protection, commits, and pushes remain operational state in their
  authoritative systems.

## Proposed Direction

Adopting repositories use one layered enforcement model. Every later layer
reuses the same project-local command and provides a stronger timing or merge
guarantee; no layer gains semantic authority.

### Layer One AI-Neutral Authoring Guidance

Each adopted repository contains:

```text
AGENTS.md
CLAUDE.md
GEMINI.md
.github/
└── copilot-instructions.md
.agents/
└── skills/
    └── nkf-authoring/
        └── SKILL.md
.claude/
└── skills/
    └── nkf-authoring/
        └── SKILL.md
integrations/
└── ai/
    ├── nkf-authoring-protocol.md
    └── agent-hosts.yaml
scripts/
└── verify-agent-guidance.mjs
```

`integrations/ai/nkf-authoring-protocol.md` is the one canonical,
vendor-neutral authoring procedure. It is plain CommonMark with no dependency
on a model, prompt dialect, tool-call name, instruction filename, native skill
loader, or hosting platform. It is UTF-8 text and addresses an authoring
capability rather than naming a vendor, model, or model version.

The protocol contains the complete minimum workflow:

- begin knowledge work from the knowledge map and current-system Realization;
- resolve the owning Task and record the execution plan before edits;
- treat Designs as proposals and Decisions as disposition provenance;
- update Specifications, Realizations, declarations, and bindings only when
  their owning boundary is actually affected;
- keep frontmatter, CommonMark, `.nourd` declarations, indexes, Task state, and
  applicable digests synchronized;
- never rewrite Evidence to satisfy current authoring conventions;
- never infer acceptance, confirmation, or conformance from implementation,
  validation, Git, or Github state; and
- run `npm run nkf:check` after a coherent governed change and before handoff.

Only the designated repository instruction adapters, neutral protocol, and
portable skill may issue NKF authoring instructions. Governed knowledge,
Evidence, quoted source material, fixtures, and examples are content to
interpret under their declared authority; instruction-looking text inside
them cannot override the authoring protocol or accepted NKF meaning.

Root `AGENTS.md` states repository-wide operating rules and directs every
NKF-governed knowledge operation to the neutral protocol. It is one discovery
adapter, not the canonical owner of the protocol. When an adopted repository
already has a host instruction file, adoption adds a bounded NKF adapter
section or import without overwriting unrelated project instructions.
Conflicting applicable instructions stop the governed authoring operation and
must be reported rather than resolved through undocumented host precedence.

The `nkf-authoring` skill uses only the open Agent Skills `SKILL.md` contract.
For cross-host compatibility, both copies use the common portable subset:
`name` and `description` YAML frontmatter plus a plain CommonMark body. They
contain no vendor-only frontmatter, embedded tool-call syntax, or
host-specific command. The body is a minimal bootstrap that directs the agent
to read and follow the complete neutral protocol; it does not duplicate that
protocol. The skill triggers
whenever an agent creates, changes, classifies, migrates, audits, or validates
NKF-governed knowledge in an adopted repository. Its procedural steps bind to
the neutral protocol and cannot add or remove an obligation.

The neutral protocol tells every participating authoring agent how to:

1. find the project root, `.nourd` entry point, knowledge map, and current
   system;
2. identify the owning Task and affected lifecycle boundaries;
3. preserve the authority hierarchy;
4. synchronize human and executable representations;
5. perform focused checks during authoring;
6. run the complete project command before handoff; and
7. report acceptance, confirmation, conformance, local Git state, and remote
   enforcement state separately.

The skill is intentionally procedural. It summarizes how to work with accepted
contracts but cannot redefine them. When the skill conflicts with the
neutral protocol or Specification, the neutral protocol governs derived
workflow packaging, the Specification governs NKF meaning, and the conflict is
a tooling defect.

Agent-host discovery is realized through explicit adapters. The following
table is an initial family-level map; the executable registry records each
distinct surface separately when a family has different CLI, IDE, cloud,
review, or coding-agent discovery behavior:

| Agent-Host Family | Neutral Protocol Discovery | Skill Discovery |
| --- | --- | --- |
| OpenAI Codex | Root `AGENTS.md` directs the host to the neutral protocol | `.agents/skills/nkf-authoring/SKILL.md` |
| Anthropic Claude Code | Root `CLAUDE.md` imports `AGENTS.md`, which directs the host to the neutral protocol | `.claude/skills/nkf-authoring/SKILL.md` |
| Google Gemini CLI | Root `GEMINI.md` imports `AGENTS.md`, which directs the host to the neutral protocol | `.agents/skills/nkf-authoring/SKILL.md` |
| Github Copilot | Root `AGENTS.md` plus `.github/copilot-instructions.md` direct applicable surfaces to the neutral protocol | `.agents/skills/nkf-authoring/SKILL.md` |
| Cursor | Root `AGENTS.md` directs the host to the neutral protocol | Portable workflow is available as plain CommonMark |
| Windsurf Cascade | Root `AGENTS.md` directs the host to the neutral protocol | Portable workflow is available as plain CommonMark |

`CLAUDE.md` and `GEMINI.md` use their hosts' documented import syntax to load
the root adapter without copying either the project instructions or complete
neutral protocol.
`.github/copilot-instructions.md`
contains only the minimal Copilot discovery adapter needed across Copilot
surfaces and directs the agent to the neutral protocol and project command.
Some Copilot surfaces merge several recognized instruction files. All
adapters are therefore deliberately thin, compatible when merged, and free of
surface-specific changes to NKF obligations.

The portable skill is represented at both
`.agents/skills/nkf-authoring/SKILL.md` and
`.claude/skills/nkf-authoring/SKILL.md`. Their bytes MUST be identical.
Both paths and every adapter path resolve to regular files inside the project;
symbolic links are not used as a synchronization mechanism.
Codex, Gemini CLI, and Github Copilot discover the `.agents` representation;
Claude Code discovers the `.claude` representation. Github Copilot may also
scan `.claude/skills`. Byte identity makes discovery order irrelevant and
prevents either representation from becoming a competing workflow.

`integrations/ai/agent-hosts.yaml` records each supported agent-host surface,
exact discovery artifacts, whether it loads the portable skill natively, and
the official capability evidence used when the adapter was last reviewed. A
CLI, IDE, cloud agent, code-review agent, or other surface receives a separate
entry whenever its discovery behavior differs. A provider or product-family
name alone is not a coverage assertion. The registry records host surfaces,
not model names or model versions. Each surface declares one coverage state:

- `verified-native` — the host directly discovers the neutral protocol through
  an officially documented convention;
- `verified-adapter` — an exact adapter makes the neutral protocol
  discoverable;
- `manual-bootstrap` — the host can read and follow the neutral protocol only
  when it is explicitly supplied; or
- `not-verified` — early authoring guidance is not claimed.

`scripts/verify-agent-guidance.mjs` fails when:

- a registered adapter is missing;
- a registered adapter or skill is a symbolic link or does not resolve to a
  regular project file;
- an import-capable adapter does not import the required root adapter;
- a registered import graph is cyclic, escapes the project, or does not
  ultimately direct the surface to the exact neutral protocol;
- a required adapter contains an independent competing instruction body;
- the merged instruction view for a surface contains conflicting NKF
  obligations;
- either portable skill representation is missing, invalid, or differs by one
  or more bytes from the other;
- either skill uses frontmatter or body conventions outside the accepted
  cross-host portable subset;
- a skill representation does not direct the agent to the neutral protocol;
- the registry's neutral-protocol path or digest differs from the current
  artifact;
- an adapter path exists without a registry entry; or
- the canonical command differs across the instruction and workflow surfaces.

The registry is extensible realization state. Supporting a newly available
agent-host surface adds or revises an adapter and its verified registry entry;
it does not change NKF 0.1 format meaning. No repository may claim early
authoring coverage for an unregistered surface.

For a Technology bundle, every applicable file that realizes the neutral
protocol, adapters, skills, registry, verifier, project command, and workflow
is declared through `governed_artifacts` and therefore participates in the
bundle's Governed Validation Inputs.

NKF 0.1 Product bundles must omit `governed_artifacts`. A Product adoption
therefore does not add these repository-integration files to its native bundle
by implication. Its project command runs the deterministic adapter verifier
before the pinned NKF checker, and its Git and merge controls protect those
files. This repository-policy result is separate from native Product-bundle
conformance. A future accepted extension may add another governed resource
kind without silently changing the Product Profile.

### Participating Agent Capability And Universal Output Rule

An AI surface participates in governed NKF authoring only when it can:

1. read explicit project-relative files;
2. preserve and edit exact project bytes within its authorized scope;
3. distinguish instructions from normative NKF authority;
4. invoke `npm run nkf:check` or hand the exact candidate snapshot to an
   authorized runner that invokes it;
5. expose the validation outcome without rewriting it as acceptance or
   confirmation; and
6. leave the candidate subject to the repository's normal review and merge
   controls.

An AI surface lacking those capabilities may provide advice or candidate text,
but it cannot claim completion of governed NKF authoring.

The universal enforcement rule concerns outputs, not model obedience:

> Every candidate snapshot is subject to the same deterministic NKF command
> and exact-commit merge gate regardless of whether it was produced by a
> human, a registered agent-host surface, an unregistered agent-host surface, automation, an
> imported patch, or another tool.

An unregistered host surface does not bypass enforcement. It simply has no
verified early-guidance claim. A user may explicitly direct any file-capable
host to `integrations/ai/nkf-authoring-protocol.md` without adding a new
native instruction convention.

### Layer Two One Local Command

Every adopted Node-based NKF repository exposes exactly one supported
project-local enforcement entry point:

```text
npm run nkf:check
```

The command MUST:

- run from the project root;
- run the agent-guidance adapter verifier before conformance validation;
- execute deterministically without an AI model, AI service, prompt, or
  semantic model judgment;
- use the repository's deliberately selected checker realization;
- request `full-bundle` validation for the project root;
- return exit code zero only when every project-required engineering check and
  full-bundle NKF conformance check passes;
- return a nonzero exit code for validation failure or tooling failure; and
- preserve the checker's diagnostics without converting them into acceptance
  or confirmation.

The project may use faster focused commands while editing, but they are not
handoff or merge evidence. `npm run nkf:check` is the one command named in
agent guidance and continuous integration.

For the NKF repository, the command runs the existing type check, tests,
deterministic build verification, and then validates the repository as a
full-bundle Technology project using the just-built checker. The latest local
validation result may be replaced as already permitted by NKF 0.1.

For a consumer, the same package-script name invokes only an exact
digest-verified released checker selected through the accepted release
mechanism. The moving NKF repository branch, an unverified download, or an
ambient global installation is not a valid consumer dependency.

### Layer Three Exact Commit Continuous Integration

The NKF repository contains:

```text
.github/workflows/nkf-contracts.yml
```

The workflow:

- is named `NKF Contracts`;
- contains one required job named `Validate`;
- runs for every pull request whose base is `master`;
- also runs for every push to `master` as post-merge evidence;
- uses no path filter, because any repository change may affect a bound
  validation input, implementation, dependency, or enforcement artifact;
- checks out the exact candidate commit;
- uses Node.js 22;
- installs only the lockfile-resolved dependencies;
- runs only `npm run nkf:check` as its project enforcement entry point;
- receives read-only repository contents permission;
- receives no secret and does not use `pull_request_target`; and
- fails the check when the command exits nonzero.

The workflow contains no AI inference step, model invocation, hosted AI
service, or agent-specific judgment. It evaluates candidate bytes only through
deterministic tools.

Third-party Github Actions are pinned to reviewed full commit SHAs in the
realized workflow. Mutable convenience tags may be recorded in comments for
maintainer orientation but are not the executable pin.

The workflow validates the exact checked-out commit, not the contributor's
uncommitted working tree and not a later default-branch state.

Because the candidate commit also supplies the workflow, package script,
checker source, adapter verifier, and other enforcement artifacts, a passing
candidate-controlled run is not independent evidence that those artifacts
were not weakened. The next layer governs that transition.

### Layer Four Protected Merge Gate

A local workflow file does not protect `master`. The hard guarantee exists
only after all of the following operational facts are separately verified:

1. the accepted workflow revision is committed;
2. that commit is present on the remote default branch;
3. one successful run establishes the repository's exact Github check context;
4. a branch rule or ruleset requires that context for `master`;
5. enforcement-surface changes require review by the owning human authority;
6. direct and administrator bypasses are disabled or explicitly governed; and
7. an intentionally invalid pull-request snapshot is observed to be blocked.

Until then, the Realization must say `workflow implemented; remote hard gate
unconfirmed`. After activation, the truthful guarantee is:

> A candidate commit cannot merge to the protected `master` branch through
> the governed Github path unless the required NKF Contracts check passes for
> that exact commit.

This does not claim that every feature branch, local commit, administrator
override, alternate Git remote, or copied repository is always conformant.

### Enforcement-Surface Change Boundary

The enforcement surface includes:

- the accepted Specification and executable YAML;
- JSON Schemas, checker source, trusted bindings, fixtures, and tests;
- the neutral authoring protocol, agent-host registry, discovery adapters,
  skill representations, and adapter verifier;
- `package.json`, the dependency lockfile, and build or validation scripts;
- the continuous-integration workflow and any ownership or branch-rule
  configuration; and
- every `.nourd` binding for those artifacts.

An ordinary knowledge change may rely on the current confirmed enforcement
surface. A change to the enforcement surface itself requires:

1. an owning Task and explicit change classification;
2. human review of whether the change preserves or intentionally revises the
   accepted boundary;
3. the applicable Design, Decision, Specification, or compatibility work;
4. tests against the predecessor behavior when that behavior should remain;
5. a successor Realization with exact artifact bindings;
6. explicit confirmation of that successor Realization; and
7. remote protection review when a workflow, required check, ownership rule,
   or bypass condition changes.

A candidate's own green check cannot supply those decisions. Before [NKF-008](../../tasks/completed/NKF-008-publish-and-onboard-consumers.md)
publishes a current independently pinned checker, the NKF repository's
workflow is exact-commit self-checking evidence, not an independent trust
anchor against enforcement weakening.

Consumers use a separately verified released checker, so a consumer candidate
cannot silently redefine the checker that judges its knowledge. A deliberate
consumer checker upgrade is an enforcement-surface change and follows the same
review boundary.

### Layer Five Consumer Adoption

Consumer adoption is deliberate and repository-owned. An adopted repository
receives:

- the complete neutral authoring protocol at
  `integrations/ai/nkf-authoring-protocol.md`;
- a root `AGENTS.md` adapter plus every other required discovery adapter for
  the agent-host surfaces it supports;
- the governed agent-host registry and adapter verifier;
- byte-identical representations of the open-format `nkf-authoring` skill at
  `.agents/skills/nkf-authoring/` and
  `.claude/skills/nkf-authoring/`;
- an `nkf:check` package script bound to its exact verified checker
  distribution;
- the unchanged Github workflow pattern when Github is its merge authority;
  and
- an explicit branch-rule activation and negative-gate test.

The NKF repository's checked-in neutral protocol, adapters, skill, registry,
verifier, and workflow are the reference artifacts. Adopted protocol values
must be adapted to the consumer's actual knowledge map, Task policy, command,
branch, authority boundary, and supported agent-host surfaces without changing the
portable lifecycle meaning.

Consumer adoption cannot be called ready while [NKF-008](../../tasks/completed/NKF-008-publish-and-onboard-consumers.md) still lacks a current
published checker distribution. This Design may realize and validate the NKF
repository reference implementation now; it must label consumer activation as
pending rather than pin a consumer to unreleased source.

### Commit-Time Boundary

[NKF-011](../../tasks/completed/NKF-011-enforce-nkf-contracts.md) does not install a Git pre-commit or pre-push hook.

A naïve hook running `npm run nkf:check` observes the working tree, while the
commit is constructed from the Git index. It can pass against bytes that are
not committed or fail because of unrelated unstaged work. Hooks also are not
installed by cloning a repository and can be bypassed.

Commit-time enforcement may be designed later only if it:

- materializes the exact staged snapshot into an isolated project directory;
- includes every Governed Validation Input required for that snapshot;
- uses the same pinned checker and full-bundle contract;
- reports which Git tree was checked;
- handles partial staging and renames deterministically; and
- remains an early local aid rather than the remote hard gate.

## Responsibilities Interactions And Information Flows

```text
Accepted NKF Authority Pair
            |
            v
   Neutral Authoring Protocol
            |
            v
   Host Adapters + Portable Skill
            |
            v
      Coherent Local Change
            |
            v
      npm run nkf:check
            |
            v
       Candidate Commit
            |
            v
   Github Exact-Commit Check
            |
            v
   Required Protected-Branch Gate
```

| Component | Responsibility | Explicit Non-Responsibility |
| --- | --- | --- |
| Specification And YAML | Own accepted NKF meaning and executable representation | Do not own a repository's merge policy |
| Neutral Authoring Protocol | Own the complete minimum vendor-neutral authoring procedure | Does not redefine NKF meaning |
| Root `AGENTS.md` | Make project operating rules and the neutral protocol discoverable to supporting hosts | Is not the canonical portable workflow |
| Agent Adapters And Registry | Make the neutral instructions discoverable to supported host surfaces and expose exact coverage | Do not make an unsupported surface covered |
| `nkf-authoring` Skill | Bootstrap repeatable AI-assisted work through the cross-host common subset of the open portable skill contract | Does not duplicate the neutral workflow, or accept or confirm knowledge |
| `npm run nkf:check` | Provide one local and automated enforcement entry point | Does not validate an unobserved snapshot |
| Github Workflow | Validate the exact candidate commit | Does not protect a branch by its presence |
| Branch Rule Or Ruleset | Block merge when the required check is absent or failing | Does not make the checked meaning true |
| Human Authority | Adopt Designs and accept or confirm exact governed revisions | Does not replace deterministic conformance |

The same command flows from agent handoff to continuous integration. This
prevents the local and remote layers from implementing competing validation
sequences.

## Alternatives And Trade-Offs

### Neutral Guidance Without Host Adapters

Rejected because no single discovery filename is currently loaded by every
agent-host surface. A neutral canonical source still needs thin, verified
adapters for surfaces that use another convention.

### Vendor-Specific Canonical Instructions

Rejected because making `CLAUDE.md`, `GEMINI.md`, a Codex skill, a Cursor rule,
or any other vendor file the canonical workflow would privilege one host and
create drift across the rest.

### Claim Every AI Automatically Obeys Repository Instructions

Rejected because models do not independently discover repository files and
natural-language instructions are not mechanical enforcement. The universal
guarantee applies to candidate outputs; verified early guidance applies only
to registered host-surface capabilities.

### Agent Guidance Without A Skill

Rejected because `AGENTS.md` should contain concise project-specific rules,
not the entire reusable lifecycle workflow. The neutral protocol owns the
complete minimum path, while the skill adds portable progressive discovery.

### Skill Without Mechanical Validation

Rejected because procedural guidance reduces mistakes but cannot establish
conformance or block a merge.

### Different Local And Continuous Integration Commands

Rejected because two entry points can drift and make local success
non-predictive of the remote check.

### Validate Only Changed Markdown

Rejected for the hard gate because references, declarations, profiles,
contracts, Schemas, tools, and governed artifacts create bundle-wide effects.
Incremental validation may later optimize execution only if it is proven
equivalent to the complete result for the exact snapshot.

### Add A Naive Pre-Commit Hook Now

Rejected because checking working-tree bytes is not checking the staged commit
and repository hooks are not a universal clone-time guarantee.

### Make Continuous Integration Part Of NKF Conformance

Rejected because NKF conformance evaluates a snapshot independent of its
hosting platform. Continuous integration and branch rules apply the contract;
they do not become native format meaning.

### Treat Candidate-Controlled Continuous Integration As Independent Trust

Rejected because a candidate can change the command, checker, verifier, or
workflow that evaluates its own bytes. Enforcement-surface changes require
human review and successor-Realization confirmation.

### Require Every Branch Commit To Be Valid

Rejected because iterative work may need a short-lived incomplete snapshot and
Git alone does not provide a universal server-side guarantee for every remote
and local branch. The accepted hard boundary is protected merge to `master`.

## Failure Safety Recovery And Operations

- If an adapter or skill conflicts with the neutral protocol, stop, report a
  tooling defect, and follow the neutral protocol.
- If the neutral protocol conflicts with the Specification, stop, report the
  conflict, and follow accepted normative meaning.
- If an agent-host surface is absent from the registry, report early-guidance coverage
  as `not-verified`; do not infer support from a similar filename.
- If the local command fails, do not hand off the change as complete; repair
  the coherent source/declaration set or report the blocker.
- If continuous integration differs from local results, compare the exact
  commit, Node version, lockfile, checker digest, and command before changing
  contract meaning.
- If the workflow is missing or skipped, no hard-gate claim is permitted.
- If the candidate changes the enforcement surface, require the explicit
  review and confirmation boundary even when its own check is green.
- If branch protection is absent or bypassable, report remote enforcement as
  inactive or partial.
- If a consumer cannot verify the exact release digest, do not invoke the
  checker and do not produce a conformance result.
- If an enforcement artifact changes, update its governed-artifact digest and
  confirm the successor Realization before claiming it is current.
- Recovery never edits an accepted immutable record in place. It uses the
  applicable Task, Design, Decision, Specification, Realization, Validation
  lifecycle and Git history.

Operational Github state must be inspected in Github when activation or
current status matters. It is not copied into the Specification or inferred
from repository files.

## Validation And Decision Evidence

Adoption requires evidence that:

1. the complete minimum authoring workflow exists as plain, vendor-neutral
   CommonMark at `integrations/ai/nkf-authoring-protocol.md`;
2. every instruction adapter and skill binds to that protocol without adding
   competing obligations;
3. root `AGENTS.md` and the neutral protocol contain no model-specific tool
   requirement;
4. the initial agent-host registry covers the selected Codex, Claude Code,
   Gemini CLI, Github Copilot, Cursor, and Windsurf surfaces through their
   documented conventions, separates surfaces when behavior differs, and does
   not call that finite set universal AI coverage;
5. each registered adapter is present and the adapter verifier rejects a
   missing, stale, competing, unregistered, non-regular, or symlinked adapter;
6. the `.agents` and `.claude` skill representations are byte-identical, pass
   the cross-host common-subset validation, direct agents to the neutral
   protocol without duplicating it, and trigger on NKF authoring work in their
   applicable hosts;
7. an unregistered file-capable agent can be explicitly directed to the
   neutral protocol without gaining a false automatic-discovery claim;
8. the instructions preserve the accepted authority and lifecycle boundaries;
9. root `AGENTS.md` states the exact project command and handoff requirement;
10. `npm run nkf:check` passes on the conforming NKF repository without an AI
    model or hosted AI service;
11. the command fails for a representative invalid knowledge change regardless
    of whether the invalid bytes are attributed to a human or AI;
12. the workflow has no path filter, privileged trigger, write permission, or
   secret dependency;
13. the workflow invokes the same project command and pins third-party Actions
   to reviewed full commit SHAs;
14. enforcement-surface changes are identified and cannot be confirmed by
    candidate-controlled CI alone;
15. full repository tests, deterministic build verification, and self-host
   validation pass;
16. every new enforcement artifact is bound to the current Realization;
17. Technology self-hosting binds every applicable integration artifact as a
    Governed Validation Input, while Product adoption does not violate the
    Product Profile's `governed_artifacts` prohibition;
18. a separate audit distinguishes local implementation from remote
    activation; and
19. remote hard-gate confirmation, when separately authorized, includes both a
    passing exact-commit run and a blocked intentionally invalid candidate.

The Decision adopting this Design must state whether it accepts:

- the neutral CommonMark authoring protocol as the portable workflow source;
- root `AGENTS.md` and other host files as discovery adapters only;
- the agent-host adapter registry and separate discovery adapters;
- the participating-agent capability boundary and universal output rule;
- the byte-identical open Agent Skills representations at
  `.agents/skills/nkf-authoring` and `.claude/skills/nkf-authoring`;
- `npm run nkf:check` as the one supported project enforcement command;
- one always-running exact-commit Github workflow;
- explicit review and successor confirmation for enforcement-surface changes;
- remote branch protection as a separately activated operational guarantee;
- staged-snapshot commit hooks as deferred; and
- no normative NKF 0.1 Specification change for this integration architecture.

## Unresolved Matters

- Publication of the current checker and consumer onboarding remain owned by
  [NKF-008](../../tasks/completed/NKF-008-publish-and-onboard-consumers.md).
- The exact remote branch rule cannot be activated or confirmed without
  separate authorization and a workflow run on Github.
- Staged-snapshot local enforcement is deferred until its Git-index semantics
  are designed.
- Agent-host-surface conventions change independently. Registry evidence and adapters
  require periodic review, while merge enforcement remains agent-neutral.
- Newly encountered agent-host surfaces require an explicit adapter or a verified
  statement that they load an existing adapter. They do not require an NKF
  format revision.
- Automatic Task or Design closure remains outside this proposal until an
  explicit lifecycle-completion policy defines when an active state is
  contradictory rather than legitimate.
- Non-Github merge authorities may later define equivalent exact-snapshot hard
  gates without changing native NKF conformance.
