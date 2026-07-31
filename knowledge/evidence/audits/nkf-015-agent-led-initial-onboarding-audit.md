# NKF-015 Agent-Led Initial Onboarding Audit

## Audit Identity

- **Task:** `NKF-015`
- **Audit Time:** `2026-07-31T14:26:48Z`
- **Reviewer:** Codex Technical Reviewer
- **Mode:** Independent-minded implementation, authority, compatibility,
  safety, validation, and release-boundary review
- **Scope:** Exact local NKF-015 candidate plus an isolated copy excluding the
  unrelated pre-existing unbound `AGENTS.md` working-tree addition

This audit is Evidence. It does not accept knowledge, confirm a Realization,
publish an adopter, or establish conformance by itself.

## Verified Facts

1. ADR 0069 adopts the agent-led semantic assessment and deterministic final
   enforcement boundary without revising native NKF 0.1 meaning.
2. The existing `nkf-onboarding` skill remains the only portable onboarding
   skill. Its `.agents/skills` and `.claude/skills` copies are byte-identical at
   SHA-256 `dfc9c7fd90ab2315e535d4c3a96cb0865938998a82aa082ea208848ff4dc702c`.
3. The neutral protocol requires a complete repository review, evidence-backed
   Category 1 or Category 2 assessment, Category 2 human confirmation, and an
   explicit negative or indeterminate override path.
4. Executable inspection no longer uses Markdown counts, byte limits,
   lifecycle-frontmatter vocabulary, or inferred maturity to determine
   semantic eligibility.
5. Mechanical capture now records all project directories and regular files
   outside top-level version-control implementation metadata. Regular files
   bind path, byte count, and SHA-256; symbolic links and special files fail
   closed.
6. The plan records category, agent identity and time, recommendation, summary,
   evidence, and applicable confirmation. Category 2 confirmation must match
   project authority, follow the assessment time, and expose deliberate
   override state.
7. Sealing now rejects unresolved assessment, missing evidence for a non-empty
   snapshot, missing or inconsistent confirmation, incomplete Markdown
   representations, stale source bytes, unsafe paths, and candidate drift
   before writing a sealed plan.
8. Onboarding repeats source and candidate checks and retains verified release
   acquisition, native generation, isolated full-bundle validation,
   rollback-capable application, receipt, and same-plan idempotence.
9. The handoff reports the plan-supplied category separately and explicitly
   marks it as not mechanically proven.
10. Public documentation explains the agent-led workflow, plan examples,
    override boundary, mechanical capture, seal, and handoff without numeric
    semantic thresholds.

## Acceptance-Criteria Reconciliation

| NKF-015 Criterion | Result | Evidence |
| --- | --- | --- |
| Complete agent review before candidate preparation | Implemented | Neutral protocol sections **Review The Complete Repository** and **Recommend The Supported Category**; portable skill |
| Knowledge, source, configuration, incidental, and unresolved distinctions | Implemented | Protocol vocabulary; plan evidence classification validation |
| Category 1 automatic and Category 2 confirmed paths | Implemented | Core assessment validator; empty Product and Technology tests; Tiny Knowledge tests |
| Negative or uncertain recommendation without guessed later category | Implemented | Protocol stop boundary; retained negative recommendation and override test |
| No deterministic semantic survey or classifier | Implemented | Removed numeric and lifecycle heuristic code; guidance verifier prohibits predecessor threshold text |
| Final complete source coverage and exact bytes | Implemented | Complete project-entry manifest; source and candidate drift tests |
| NKF-013 compatibility and provenance | Implemented | ADR 0069 compatibility; predecessor Design, Decisions, Realization, and audit remain intact |
| AI-neutral byte-identical discovery | Implemented | Guidance verifier passed with two identical skill representations and no vendor-specific protocol term |
| Public explanation without native YAML burden | Implemented | Public initial-onboarding guide and README; public-doc verifier passed |
| Local tests and NKF validation | Partially verified | Isolated suite: 19 files and 136 tests passed; build, adopter, and public-doc verification passed. Final recommended-release and actual-working-tree checks remain blocked as described below |
| Independent audit before confirmation | Implemented by this Evidence | This audit; two material defects repaired before conclusion |
| Agent SDK consumer exercise | Outstanding | Requires exact successor publication and separate Agent SDK authority |

## Findings Repaired During Audit

### Assessment Evidence And Confirmation Integrity

The first implementation required an assessment summary but permitted a
non-empty Category 2 plan with no evidence and did not verify confirmation
authority or chronology. The core now requires evidence for every non-empty
snapshot, requires Category 2 confirmation authority to match project
authority, and rejects confirmation predating assessment. Focused tests cover
all three cases.

### Design Section Role

The new Design declaration assigned `mapping` to **Complete Mechanical Source
Manifest**, but `nkf.design` does not allow that role. The declaration now uses
the supported `interface` role. Isolated full-bundle self-hosting validation
then passed.

## Validation Evidence

In `/tmp/nkf-015-audit-real.VLtctO`, a complete repository copy was created
with real dependency bytes. Only the unrelated uncommitted `AGENTS.md`
addition was removed so its predecessor governed digest matched. The exact
NKF-015 candidate then produced:

- agent-guidance verification: passed, 4 adapters, 12 surfaces, 2 skill
  representations;
- onboarding-guidance verification: passed;
- TypeScript checking: passed;
- test suite: 19 files, 136 tests, all passed;
- deterministic checker build: passed;
- deterministic adopter build: passed;
- public documentation verification: passed, 27 files and 2 examples;
- self-hosting full-bundle validation: passed; and
- recommended-release verification: correctly failed because the published
  recommendation binds the predecessor adopter rather than candidate adopter
  SHA-256 `c33766982d3354a01558bf1f0903314eb98537e38c50585c9cd94c7c24aae387`.

The first isolated run used a symlinked dependency directory and caused the
bundler to expose that symlink's absolute source path. That was a test-fixture
artifact. Repeating with real dependency bytes removed it and the public-doc
verification passed.

## Open Blockers

### Successor Publication

`release/recommended.json` truthfully binds the previously published adopter.
Updating it before an actual successor publication would create a false
publication claim. Publication, trusted digest update, fresh download or clone
verification, and the final repository check require an explicitly authorized
release operation.

### Unrelated AGENTS.md Candidate

The actual working tree contains a pre-existing `AGENTS.md` addition whose
SHA-256 is `30300f3be6f25d55d56137f9d7308999a97851bac38b0f1a20a84d4ad8e3a9f5`,
while the current governed artifact binding retains predecessor SHA-256
`c0723a812a9aee7c8cc3111d71fb7d40a3c8ed451794eb67c04a193dae8e14c2`.
It concerns Task-creation authorization and is outside NKF-015. The actual
workspace therefore correctly fails agent-guidance integrity and self-hosting
before the final handoff. This audit does not absorb, revert, accept, rebind,
or confirm that separate change.

### Consumer Exercise

Agent SDK onboarding remains a later operation. It requires the successor
adopter to be published and independently trusted, followed by explicit Agent
SDK authority for the exact consumer mutation.

## Audit Conclusion

The NKF-015 implementation candidate coherently realizes the accepted
agent-led semantic assessment and deterministic final enforcement boundary.
No unresolved material defect remains inside the reviewed code, protocol,
skill, tests, or public-documentation candidate.

NKF-015 is not complete, the successor Realization is not confirmed, the
candidate is not published, and the actual repository snapshot is not
conformant. Completion requires resolution of the unrelated `AGENTS.md`
candidate, an explicitly authorized successor release and recommendation
update, a passing exact-worktree `npm run nkf:check`, and the separately
authorized Agent SDK exercise or an explicit Task deferral of that exercise.

## Post-Audit Authority Resolution

On 2026-07-31, after reviewing this audit, the Human Product Owner:

1. authorized the repository-specific `AGENTS.md` Task-authorization policy to
   be bound and committed as NKF-015 completion cleanup while remaining
   outside portable NKF protocol meaning;
2. removed the Agent SDK onboarding exercise from NKF-015 and retained that
   consumer operation for separate manual execution; and
3. authorized commit, push, successor adopter and public-documentation
   publication, recommendation update, independent verification, exact-byte
   technical confirmation, and Task closure.

This addendum preserves the audit's original observed facts and findings. It
records later authority resolution only; completion, publication,
confirmation, and conformance still require their own subsequent Evidence and
acts.

## Completion Candidate Re-Audit

At `2026-07-31T18:26:41Z`, the authorized completion candidate received a
fresh independent code, knowledge, integration, distribution, and
exact-worktree review.

The re-audit verified:

- the repository-only Task-authorization policy is bound through the root
  adapter registry and governed artifact digest while the neutral authoring
  protocol and portable authoring skills remain byte-unchanged;
- all four onboarding skill copies are byte-identical, both onboarding
  protocol copies are byte-identical at SHA-256
  `ca8b0bbd6ab2bdcdde67ef608dc06ffc94ad928da32ed062f1e6520db25f77ac`,
  and the public adopter is byte-identical to the built adopter at SHA-256
  `c33766982d3354a01558bf1f0903314eb98537e38c50585c9cd94c7c24aae387`;
- the accepted Markdown, executable companion, and confirmed checker remain
  byte-unchanged;
- the deliberate recommendation binds the successor adopter while retaining
  the unchanged content-addressed native archive, accepted authority pair,
  and confirmed checker;
- the initial audit's Task-creation and consumer-exercise blockers were
  resolved by explicit Human Product Owner direction without making either
  one portable NKF meaning;
- superseded NKF-013 deterministic eligibility is visibly predecessor
  provenance, and deferred NKF-014 now refers to inability to recommend an
  NKF-015 category rather than an obsolete numeric boundary; and
- the offline dependency audit reports zero known vulnerabilities in the
  available local advisory data.

The exact `npm run nkf:check` passed four adapter bindings, twelve registered
host surfaces, two authoring-skill representations, two onboarding-skill
representations, type checking, all 136 tests across nineteen files,
deterministic checker and adopter builds, the 27-file public documentation
source with two conformant examples and nine Mermaid diagrams, the deliberate
release recommendation, and full self-hosting validation. The validated
snapshot SHA-256 was
`c826b5b1c72220de10c7d062ef58b8a8396e0e8cc46b1ed2d0d2fb7577caa875`
over 451 entries, with conformance `passed`, acceptance binding
`not-requested`, and Governing Use `not-ready`.

No unresolved material local-candidate finding remains. This re-audit makes
the candidate ready for the separately authorized source commit and public
projection operation; it does not claim those external acts have occurred or
confirm the successor Realizations.
