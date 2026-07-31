# NKF-011 AI-Neutral Enforcement Design Audit

- Audited At: `2026-07-30T23:42:44Z`
- Audited Design: `knowledge/designs/active/layered-contract-enforcement.md`
- Audited SHA-256:
  `615ed3ced313e60b646a77452865a954a483bf056a15c2252a1e178657455044`
- Audit Authority: Technical review evidence only
- Acceptance Effect: None

## Audit Question

Does the active NKF-011 proposal define every instruction, skill, command, and
workflow so that NKF enforcement is independent of the AI model or agent host
that produces a change, without falsely claiming that arbitrary AI software
can be forced to discover or obey repository files?

## Method

The proposal was reviewed from these angles:

1. authority neutrality;
2. model and agent-host terminology;
3. automatic instruction discovery;
4. portable skill discovery and synchronization;
5. unknown-host behavior;
6. local-command neutrality;
7. continuous-integration neutrality;
8. enforcement-artifact tampering;
9. lifecycle-completeness claims;
10. consumer portability; and
11. truthful limits of the proposed guarantees.

Current first-party documentation for Codex, Claude Code, Gemini CLI, Github
Copilot, Cursor, and Windsurf was used only as evidence of their current
discovery conventions. Those external conventions are mutable implementation
facts and not NKF authority.

## Verified Strengths

1. The checker invocation and `npm run nkf:check` command do not depend on
   which human, model, or agent host produced the candidate bytes.
2. Exact-commit continuous integration evaluates repository bytes rather than
   asking an AI to judge conformance.
3. The proposal correctly treats skills, instruction files, workflows, and
   branch rules as derived Realizations.
4. The proposal correctly separates workflow presence from confirmed remote
   branch protection.
5. The proposal correctly defers a naïve Git hook that would inspect the
   working tree instead of the staged snapshot.
6. The `.agents` and `.claude` skill representations are required to be
   byte-identical, and documented Github Copilot precedence makes the
   `.agents` copy win when both are discovered.

## Material Findings

### Finding 1: Root AGENTS.md Is Still Both Meaning And Adapter

The proposal calls root `AGENTS.md` the canonical AI-neutral instruction
source. Its prose may be vendor-neutral, but its filename is still one
discovery convention. This conflates the portable authoring protocol with one
of its delivery adapters.

An agent host that does not discover `AGENTS.md` has no convention-independent
artifact to which its own adapter can bind. The proposed `CLAUDE.md` and
`GEMINI.md` imports consequently privilege `AGENTS.md` rather than a neutral
protocol.

Required correction: create one plain CommonMark authoring protocol at a
vendor-neutral integration path. `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`,
Copilot instructions, and both skill representations must derive from or
directly bind to that protocol.

### Finding 2: “All AI Must Follow” Cannot Be Guaranteed By Instructions

Models do not inspect repositories independently. Agent hosts decide which
files, tools, commands, and permissions a model receives. Some AI surfaces
cannot read a repository or execute a validation command at all. Natural
language instructions can also be ignored, overridden by higher authority, or
implemented incorrectly.

No repository can truthfully guarantee that every present or future AI model
or host automatically discovers and obeys its files.

Required correction: define a participating authoring-agent capability
boundary and make the universal guarantee output-based:

> Every candidate snapshot is subject to the same deterministic NKF command
> and merge gate regardless of whether it was created by a human, a supported
> agent host, an unknown agent host, an automation, or another tool.

Automatic early guidance may be claimed only for a host with verified
discovery evidence and a present adapter.

### Finding 3: The Finite Initial Registry Is Not Universal Coverage

The proposal lists six current agent hosts. That is useful verified coverage,
but it is not “all AI.” New hosts, private agents, embedded IDE assistants, API
agents, and future discovery conventions remain outside the list.

Required correction: make the registry capability-based and fail closed for
coverage claims. An unregistered host may still contribute bytes, but the
repository must report its early-guidance state as `not-verified`. The hard
checker and merge gate continue to apply.

### Finding 4: The Portable Workflow Has No Neutral Source Artifact

The proposal defines identical `SKILL.md` copies in `.agents` and `.claude`,
but it does not define a convention-independent source for agents without
native Agent Skills support. Direct root instructions contain only
invariants, while the detailed lifecycle workflow lives in discovery-specific
skill copies.

Required correction: the neutral CommonMark protocol must contain the complete
minimum authoring workflow. Skills may provide progressive-disclosure
packaging, but correctness cannot depend on native skill support.

### Finding 5: Candidate-Controlled Continuous Integration Can Be Weakened

The proposed workflow runs the candidate repository's package script, checker
source, adapter verifier, and workflow definition. A candidate that changes
those enforcement artifacts may be able to make its own required check pass
without preserving the earlier enforcement boundary.

This is not an AI-specific problem, but it prevents the proposal from claiming
an independently hard merge gate against enforcement weakening.

Required correction: distinguish:

- ordinary knowledge changes checked by the current trusted enforcement
  realization; and
- enforcement-surface changes that require explicit human review,
  successor-Realization confirmation, and a trusted bootstrap or predecessor
  check where one exists.

Until a current released checker and remote protection exist, the NKF
repository workflow is self-checking evidence, not an independently anchored
enforcement root.

### Finding 6: Adapter Integrity Is Proposed But Not Yet Part Of The Command

The proposal says the adapter verifier runs inside `npm run nkf:check`, but no
verifier, registry, adapters, skill copies, or package-script implementation
exists yet.

Required correction: Realization and confirmation must bind every adapter,
skill, neutral protocol, verifier, package script, and workflow as governed
artifacts. Passing the present checker does not prove this future
implementation exists.

### Finding 7: Lifecycle Completeness Is Broader Than Current Conformance

The proposal is motivated partly by abandoned Tasks and Designs, but the
existing full-bundle contract does not by itself prove that every active Task
should now be completed or that every active Design should now receive a
Decision. Active lifecycle states can be legitimate.

Required correction: do not claim that the checker eliminates every
“left-behind” lifecycle item. Define any repository completion policy
separately, with explicit criteria for when an active state is stale or
contradictory.

## Recommended Revised Boundary

The proposal should use four distinct concepts:

1. **Neutral Authoring Protocol** — one complete, plain CommonMark procedure
   at a vendor-neutral path;
2. **Discovery Adapters** — thin host-specific files that load or point to the
   neutral protocol;
3. **Portable Skills** — byte-identical open Agent Skills representations for
   hosts that discover `.agents/skills` or `.claude/skills`; and
4. **Universal Mechanical Gate** — one deterministic command and exact-commit
   merge check applied to all candidate bytes independent of authorship.

A participating AI authoring surface must be able to read repository files,
preserve exact bytes, make or propose scoped changes, invoke or delegate the
project check, and expose its result. A surface lacking those capabilities may
advise, but cannot claim completion of governed NKF authoring.

## Priority Order

1. Replace `AGENTS.md` as canonical meaning with a neutral authoring protocol;
   keep `AGENTS.md` as one adapter.
2. Replace universal AI-obedience language with universal output enforcement
   plus verified host-specific early guidance.
3. Make the complete minimum workflow available without native skill support.
4. Add capability-based registry and adapter synchronization checks.
5. Add the enforcement-surface human-review and bootstrap boundary.
6. Keep remote hard-gate and consumer-readiness claims unconfirmed until their
   separate prerequisites exist.
7. Do not promise automatic lifecycle closure without an accepted policy.

## Audit Conclusion

The proposal has a sound agent-independent checker and merge-gate direction,
but it does not yet satisfy the stricter “all AI” requirement. The missing
neutral protocol, finite discovery claim, candidate-controlled enforcement,
and lifecycle overreach are material. The active Design requires revision
before adoption.
