# NKF-011 Layered Contract Enforcement Realization Audit

- Audited At: `2026-07-31T00:31:01Z`
- Audited Task:
  `knowledge/tasks/active/NKF-011-enforce-nkf-contracts.md`
- Adopted Design:
  `knowledge/designs/adopted/layered-contract-enforcement.md`
- Adopted Design SHA-256:
  `b8dba5836735cade5ed11425763a3541d5837d05de8472c62ee663a36b7e10e7`
- Adopting Decision:
  `knowledge/decisions/0060-layered-contract-enforcement.md`
- Adopting Decision SHA-256:
  `f37c94630756cc12f7fa865b71aa26b5e654f90afc8177e4e4ca64c2da69579a`
- Audit Authority: Technical review Evidence only
- Acceptance Effect: None
- Confirmation Effect: None

## Audit Question

Does the realized NKF-011 candidate implement the exact adopted local
enforcement boundary without creating a second NKF authority, making a false
all-AI discovery claim, weakening the universal output gate, or claiming
unobserved remote protection?

## Exact Implementation Reviewed

| Responsibility | Path | SHA-256 |
| --- | --- | --- |
| Neutral protocol | `integrations/ai/nkf-authoring-protocol.md` | `24fa96349093ea40cb9640989e953390efb80df42e7a43675af21ed957568a5a` |
| Host registry | `integrations/ai/agent-hosts.yaml` | `ac4f1ae0b5b1caf69cbecae2e669bd7b41c201550f9e8d678d82e0b70cfd9256` |
| Root adapter | `AGENTS.md` | `c0723a812a9aee7c8cc3111d71fb7d40a3c8ed451794eb67c04a193dae8e14c2` |
| Claude adapter | `CLAUDE.md` | `336cc4fbf19beaada7ccf9986414fa91851a8d7a07dfb3ccbe800a69eed0ab49` |
| Gemini adapter | `GEMINI.md` | `336cc4fbf19beaada7ccf9986414fa91851a8d7a07dfb3ccbe800a69eed0ab49` |
| Github Copilot adapter | `.github/copilot-instructions.md` | `c26b38ac7b1fe0e6745370c4ee28f819c183f1f4541d0bf714869a9a168404a0` |
| Portable skill | `.agents/skills/nkf-authoring/SKILL.md` | `99d98c61c7612c19ba5d967facb88c782043eb93692eb4891aec646c34146959` |
| Claude skill representation | `.claude/skills/nkf-authoring/SKILL.md` | `99d98c61c7612c19ba5d967facb88c782043eb93692eb4891aec646c34146959` |
| Integrity verifier | `scripts/verify-agent-guidance.mjs` | `8e875d1375d22c3feb2cfd888e3d71b4cf73c6246930efd4b5b013e9adf16a70` |
| Project command | `package.json` | `c45fbfeafdef966441e6bb856705de17a403e36380132673920404e063ef2ad2` |
| Locked dependencies | `package-lock.json` | `78464513708bc8a82746513fd7bfd822df900c7563d56db51d96afb27eabb069` |
| Exact-commit workflow | `.github/workflows/nkf-contracts.yml` | `b251a64e71f1c3b6d25f8f5c652837a9fbd27d1521f49340e323ce6c62759ac4` |
| Adversarial tests | `test/agent-guidance.test.ts` | `75256e4ab0297d3ba6182cb85970a6e5b69919f21573d7027a7f839fa8260107` |
| Detailed Realization | `knowledge/realizations/current/layered-contract-enforcement.md` | `5329c18779c9b330ae6dfc6608cb6e9e2cf6dc7dc10dda1dbf8b95db12bf7e63` |
| Consolidated Realization | `knowledge/realizations/current-system.md` | `8b59859f9d074d4a9785631dd43dfe2a96adfbf9e73816b71c9d51ba83f066c6` |
| Self-hosting Realization | `knowledge/realizations/current/self-hosting.md` | `f1cd78669f1cd7bfc943793e0acebe95f8c173ab554799afda69828c37274e2b` |

The final bundle and persisted validation result are closure artifacts rather
than fixed audit inputs. They must bind the exact files above and pass the
canonical command after this Evidence file is registered.

## Audit Results

### Authority And Lifecycle

Pass. The protocol, adapters, skills, registry, verifier, package scripts,
tests, workflow, and `.nourd` bindings remain derived Realization artifacts.
The accepted NKF 0.1 Specification and executable companion are unchanged.
The Task, Design, Decision, Specification, Realization, and Validation
boundaries remain distinct.

The adopted Design is immutable and linked to ADR 0060. The successor
Realizations remain draft and unconfirmed. No local check, workflow file, or
audit language performs confirmation.

### AI And Vendor Neutrality

Pass with the accepted finite-discovery boundary. The complete authoring
procedure is plain CommonMark and contains no named provider, host, model, or
model-specific tool requirement. Four thin instruction adapters and two
byte-identical skill representations direct capable hosts to that procedure
without copying it.

The registry records twelve distinct host surfaces. One surface is explicitly
`not-verified`; an unknown surface is also `not-verified`. The implementation
therefore does not represent a finite adapter set as automatic support by
every present or future AI system. Every candidate output still receives the
same deterministic gate.

### Instruction And Skill Integrity

Pass after audit repair. The first implementation detected the selected root
files and Github instruction directory but did not discover every competing
repository-owned instruction location used by the supported hosts. The
verifier was strengthened to reject unregistered nested `AGENTS.md`,
`CLAUDE.md`, and `GEMINI.md` files and unregistered Claude, Cursor, and
Windsurf rule files.

The verifier now checks every adapter path component for symbolic links,
checks vendor neutrality case-insensitively, binds exact adapter and protocol
bytes, validates the portable skill subset, checks import reachability, and
requires byte identity between the two skill representations.

Both skill representations pass the bundled skill validator. Eighteen focused
positive and negative cases pass, including nested competing instructions,
direct and parent-directory symlinks, stale bindings, lowercase vendor
leakage, command-chain changes, lifecycle wrappers, workflow control changes,
mutable Action tags, and substituted full-SHA Actions.

### Project Command And Universal Output Gate

Pass. `npm run nkf:check` is the one instruction and workflow entry point. The
verifier fixes the exact engineering-check chain, rejects npm lifecycle
wrappers around that chain, and requires the just-built full-bundle
self-validation command.

The canonical command was exercised with a temporary unrepresented Markdown
source. It exited nonzero during repository self-hosting validation. The
temporary file was then removed. Authorship is absent from the validation
input, so the result applies equally to human, AI, automation, and imported
candidate bytes.

### Workflow Safety And Exactness

Pass for the local file. The workflow runs on pull requests to `master` and
pushes to `master` without a path filter. It has one read-only job, no secret,
no privileged trigger, and no additional control surface. It installs locked
dependencies and invokes only the canonical project command.

The verifier requires the exact reviewed workflow shape and exact Action
identities at full commit SHAs. The checkout SHA is the signed `v4.2.2`
release commit and the setup-node SHA is the signed `v4.4.0` release commit.

### Self-Hosting And Traceability

Pass subject to the required closure run. All twelve applicable local
integration artifacts are mapped through `governed_artifacts` to the detailed
Layered Contract Enforcement Realization. The affected root instructions,
package manifest, and lockfile are rebound to that Realization. The adopted
Design, ADR 0060, detailed Realization, consolidated Realization, and
self-hosting Realization have explicit declarations and provenance.

After this Evidence source is added to `non_records`, the expected self-host
inventory is 91 record declarations, 50 non-record sources, and 72 governed
artifacts.

### Operational Truthfulness

Pass. The workflow is a local repository artifact only. Remote workflow
presence, a successful remote run, exact required-check context, branch
protection, review ownership, bypass policy, and a blocked intentionally
invalid pull request remain unconfirmed operational state.

Consumer activation also remains deferred until NKF-008 supplies a separately
verified current checker release. Neither boundary is hidden behind local
validation success.

## Remaining Boundaries

The following are explicit prerequisites outside this local implementation
audit, not unresolved defects in the reviewed local candidate:

1. the final closure run must pass after this Evidence file and all declaration
   digests are registered;
2. the Human Product Owner must separately confirm the exact successor
   Realization before it becomes the confirmed current implementation;
3. a commit and remote workflow activation require separate Git and Github
   work;
4. the remote hard gate requires required-check, review, and bypass controls
   plus an observed blocked invalid candidate; and
5. consumer adoption remains owned by NKF-008 and a current verified release.

## Audit Conclusion

No unresolved material local-implementation finding remains in the exact
artifacts reviewed above. The implementation realizes the adopted local
boundary without changing NKF 0.1 meaning or claiming universal automatic AI
discovery.

This conclusion is technical Evidence. It does not confirm the Realization,
establish remote protection, publish a checker, migrate a consumer, or turn a
later passing closure run into acceptance.
