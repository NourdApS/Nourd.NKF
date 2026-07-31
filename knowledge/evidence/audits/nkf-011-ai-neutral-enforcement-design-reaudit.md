# NKF-011 AI-Neutral Enforcement Design Reaudit

- Audited At: `2026-07-30T23:54:53Z`
- Audited Task:
  `knowledge/tasks/active/NKF-011-enforce-nkf-contracts.md`
- Audited Task SHA-256:
  `3a4de7c4ad2fcf774019a3e64f2a9b02aea0ac81bd7536091c284f488125db74`
- Audited Design:
  `knowledge/designs/active/layered-contract-enforcement.md`
- Audited Design SHA-256:
  `80b9f4ef047568789243e5b22f961bd56fc20d71803b47eb31b3073f29d9f4bc`
- Audit Authority: Technical review Evidence only
- Acceptance Effect: None

## Audit Question

Does the revised NKF-011 proposal define instructions, skills, commands, and
workflows so that:

1. their meaning is independent of any AI vendor, model, or model version;
2. supported agent-host surfaces receive explicit, verified discovery
   adapters;
3. an unknown AI surface can still use the complete portable workflow when
   explicitly directed to it; and
4. every candidate output is subject to the same deterministic enforcement
   regardless of its author?

The audit does not ask whether natural-language repository instructions can
force every present or future AI model to obey them. No repository can supply
that guarantee. It asks whether the proposal makes early guidance as portable
and explicit as possible while making the output gate universal.

## Reviewed Evidence

The audit compared the exact proposal with:

- accepted NKF 0.1 authority, especially profile allocation, Governed
  Validation Inputs, Technology `governed_artifacts`, Product omission of
  `governed_artifacts`, authority separation, and validation-result meaning;
- the first NKF-011 adversarial audit;
- current first-party discovery documentation for
  [Codex skills](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills),
  [Claude Code instructions](https://code.claude.com/docs/en/memory),
  [Claude Code skills](https://code.claude.com/docs/en/slash-commands),
  [Gemini CLI instructions](https://geminicli.com/docs/cli/gemini-md/),
  [Gemini CLI skills](https://geminicli.com/docs/cli/using-agent-skills/),
  [Github Copilot skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills),
  [Github Copilot CLI instructions](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference),
  [Cursor rules](https://docs.cursor.com/context/rules-for-ai), and
  [Windsurf AGENTS.md](https://docs.windsurf.com/zh/windsurf/cascade/agents-md);
  and
- the current unimplemented repository state, so proposed behavior was not
  mistaken for confirmed Realization.

External documentation establishes mutable host behavior only. It is not NKF
authority.

## Closure Of Prior Findings

### Finding 1 Closed At Proposal Level

The complete workflow now has one vendor-neutral CommonMark source at
`integrations/ai/nkf-authoring-protocol.md`. Root `AGENTS.md` is explicitly an
adapter rather than the workflow authority. `CLAUDE.md`, `GEMINI.md`, Copilot
instructions, and portable skills are also adapters.

### Finding 2 Closed With An Enforceable Boundary

The proposal no longer claims that arbitrary AI software automatically obeys
repository instructions. It defines a participating-agent capability boundary
and applies one deterministic command and exact-commit merge gate to every
candidate snapshot, independent of authorship.

### Finding 3 Closed With Surface-Level Coverage

Coverage is recorded per agent-host surface rather than by model or broad
product-family name. The registry fails closed: an unregistered surface has
`not-verified` early-guidance coverage but cannot bypass output validation.

### Finding 4 Closed At Proposal Level

The full minimum workflow is plain CommonMark and does not require native skill
support. The two `SKILL.md` files use the portable cross-host subset, contain
only a bootstrap to the neutral protocol, and must be byte-identical regular
files. They cannot become competing workflow copies.

### Finding 5 Closed At Proposal Level

Enforcement-surface changes require explicit human review, predecessor
comparison when applicable, successor-Realization mapping and confirmation,
and remote protection review. Candidate-controlled continuous integration is
explicitly insufficient to confirm its own enforcement changes.

### Finding 6 Remains A Realization Prerequisite

The registry, adapters, skills, verifier, package command, and workflow do not
yet exist. The proposal now requires all applicable Technology integration
files to be declared as `governed_artifacts` and mapped to a current
Realization before confirmation. This is pending implementation, not a
remaining contradiction in the Design.

### Finding 7 Closed

The proposal no longer claims that conformance automatically closes every
active Task or Design. A separate accepted lifecycle-completion policy would
be required to distinguish legitimate active work from a stale item.

## Cross-Angle Results

### Authority

Pass at proposal level. The Specification and executable YAML remain the NKF
authority pair. Instructions, skills, verifiers, package scripts, workflows,
checks, and branch rules remain derived Realizations. No automated result
accepts or confirms knowledge.

### AI And Vendor Neutrality

Pass at proposal level. The canonical procedure names capabilities and project
artifacts rather than vendor tools, prompts, models, or model versions. The
local command and continuous-integration workflow contain no AI inference.

### Discovery Portability

Pass with an explicit finite-coverage limit. Known host surfaces receive thin
adapters based on documented behavior. Unknown file-capable surfaces can be
manually bootstrapped from the neutral protocol. The proposal does not call a
finite registry universal automatic discovery.

### Skill Portability

Pass at proposal level. Both discovery paths use byte-identical `SKILL.md`
files limited to the shared `name`, `description`, and CommonMark subset.
Vendor-specific metadata, tool syntax, and symlink synchronization are
excluded. Duplicate discovery order therefore cannot change the workflow.

### Instruction Integrity

Pass at proposal level. Adapters do not copy the full procedure. The proposed
verifier checks paths, regular-file status, import graphs, protocol binding,
merged-view conflicts, skill identity, registry coverage, and command
consistency. Instruction-looking text inside governed content, Evidence,
fixtures, or examples is not elevated into agent authority.

### Universal Output Enforcement

Pass at proposal level. Human, registered-agent, unregistered-agent,
automation, imported-patch, and other-tool outputs receive the same
deterministic project command and exact-commit merge check.

### Enforcement Tamper Resistance

Pass as a defined boundary, pending Realization. Ordinary changes use the
current enforcement surface. Changes to that surface cannot rely solely on
their own green check. Independent released-checker pinning for consumers and
remote protection activation remain separate prerequisites.

### Profile Compatibility

Pass. Technology self-hosting uses permitted `governed_artifacts`, making the
applicable integration files Governed Validation Inputs. Product adoption does
not silently add those files to native Product conformance; its adapter check
and repository protection remain a separate project policy. This preserves
the accepted Product Profile.

### Lifecycle Completeness

Pass. The proposal enforces representational and contract coherence but does
not invent a rule that every active Task or Design is stale. Lifecycle closure
remains subject to explicit accepted policy and human authority.

### Operational Truthfulness

Pass. Local files do not imply remote branch protection. The workflow,
required-check context, bypass policy, negative-gate test, and consumer release
must be separately implemented and observed before their guarantees are
claimed.

## Remaining Preconditions

These are not unresolved semantic defects in the audited proposal:

1. The Human Product Owner has not yet adopted the exact revised Design.
2. The proposed neutral protocol, adapters, registry, skills, verifier,
   package command, workflow, bindings, and successor Realization are not yet
   implemented or confirmed.
3. Agent-host discovery evidence is mutable and must be verified per exact
   surface during implementation and periodically thereafter.
4. NKF-008 still owns publication of a current independently pinned checker
   for consumer adoption.
5. Remote Github workflow activation, required-check protection, bypass
   policy, and the negative merge-gate test remain unconfirmed operational
   state.

## Audit Conclusion

No material contradiction remains in the exact audited proposal.

The strongest truthful cross-AI guarantee is now:

> Every capable AI surface can be directed to one vendor-neutral workflow;
> verified host surfaces receive explicit discovery adapters; and every
> resulting candidate is subject to the same deterministic enforcement gate.

The proposal deliberately does not claim that repository text can force every
present or future AI model to read or obey it. That limitation is closed by
the universal output gate, not hidden through a false compatibility claim.

The exact revised Design is technically ready for Human Product Owner review.
This audit does not adopt it, confirm a Realization, establish conformance, or
authorize remote activation.
