# NKF Whole-Repository Development-Support Audit

## Audit Identity

- **Audit Time:** `2026-07-31T16:34:34Z`
- **Reviewer:** Codex Technical Reviewer
- **Mode:** Independent-minded whole-repository coherence, completeness,
  enforcement, usability, and use-case audit
- **Repository:** `kaveh6202/Nourd.NKF`
- **Local Head:** `fd636ff9d7321dd0413370faaf069b83e60ed560`
- **Working Boundary:** The exact local worktree, including the uncommitted
  NKF-015 successor candidate, the deferred NKF-014 bootstrap addition, and a
  separate unbound `AGENTS.md` change
- **Authority Effect:** None

This audit is Evidence. It does not accept meaning, adopt a Design, confirm a
Realization, establish conformance, modify a release, or authorize remediation.

## Executive Assessment

NKF fundamentally supports disciplined software development knowledge for a
Product or Technology repository. Its strongest contribution is not document
formatting by itself; it is the combination of canonical human-readable
Markdown, explicit lifecycle and authority boundaries, machine-readable
declarations, stable identities, exact source bindings, deterministic
validation, current-system navigation, and repository-local agent guidance.

That foundation is real and useful now. It is particularly strong for:

- orienting an agent or person from current accepted meaning and current
  implementation instead of replaying all history;
- preserving Task, Design, Decision, Specification, Realization, and
  Validation distinctions;
- detecting structural drift among Markdown, declarations, contracts,
  schemas, implementation artifacts, tests, guidance, and release inputs;
- governing a Technology repository such as NKF itself; and
- supplying structured source material that a later Knowledge Engine can
  ingest without replacing Markdown authority.

NKF is not yet a complete software-knowledge platform. The most important
limitations are native Product-versus-Technology exclusivity, missing
cross-bundle identity, Product-profile exclusion of Specification records and
governed source artifacts, no portable presentation or query contract, no
realized acceptance resolver, incomplete merge prevention, incomplete
governed-artifact secret coverage, and minimal real exercise of semantic
entities, entity relationships, and bindings.

The exact local repository is also not currently conformant or releasable. An
unbound `AGENTS.md` change invalidates the self-host artifact binding and the
NKF-015 adopter differs from the published recommended release. Those are
current-state blockers, not evidence that the underlying model is unsound.

## Audit Method And Coverage

The audit reconciled:

- repository identity, Git boundary, worktree state, remote workflow and
  release observations;
- the canonical NKF 0.1 Markdown Specification and executable YAML companion;
- all JSON Schemas, checker phases, diagnostic registry, CLI behavior,
  fixtures, tests, build and release tooling;
- all governed Markdown representation and `.nourd` declaration coverage;
- Tasks, Design dispositions, Decisions, Specifications, Realizations,
  Evidence navigation, provenance, confirmation, and current-system claims;
- agent-host adapters, portable skills, neutral protocols, unknown-surface
  behavior, and CI integration;
- public documentation, onboarding, adoption, update, rollback, and release
  boundaries;
- Product and Technology Root Profiles; and
- four practical views: NKF repository development, agent-guided development,
  human consumption through a Knowledge Engine and Knowledge Interface, and a
  monolithic application repository.

Mechanical checks were used as evidence only. Passing tests were not treated
as semantic acceptance or confirmation.

## Verified Repository Facts

At the audited boundary:

- the bundle selects `nkf.profile.technology` and one project-contained
  `knowledge_root`;
- all 168 Markdown files under `knowledge/` have exactly one representation:
  106 record sources and 62 non-record entries;
- the 106 records comprise 69 Decisions, 25 Designs, nine Realizations, one
  Specification, one Technology root, and one Evidence record;
- record governance comprises 100 Accepted, four Superseded, and two Draft
  declarations, with 103 Immutable and three Living lifecycles;
- 872 Markdown sections have explicit declaration mappings;
- 119 non-Markdown governed artifacts bind contracts, Schemas, checker source,
  tests, fixtures, build tooling, guidance, workflows, and project
  configuration to Realizations;
- the corpus declares only 12 record relationships and declares no semantic
  entities, entity relationships, or Realization bindings;
- the four JSON Schemas are closed objects, and the checker binds the accepted
  Markdown, executable companion, and Schemas by exact SHA-256;
- the executable contract registers 143 stable diagnostics, and the repository
  contains 136 tests across nineteen test files;
- TypeScript checking passed;
- 119 of 136 tests passed in the exact worktree; all seventeen failures reduce
  to the unbound root `AGENTS.md` baseline preventing self-hosting and
  agent-guidance fixtures from reaching their intended assertions;
- deterministic checker-build verification, adopter-build verification, and
  public-documentation verification passed;
- public-documentation verification covered 27 files, two conformant example
  projects, and nine Mermaid diagrams;
- recommended-release verification correctly failed because the local
  NKF-015 adopter SHA-256 differs from the published predecessor adopter;
- the persisted latest full-bundle result failed only on
  `artifact.digest-mismatch` for `AGENTS.md`, with Governing Use `not-ready`;
- the offline dependency audit reported no known vulnerability in its local
  advisory data;
- the remote exact-commit contract workflow exists and its latest five
  observed runs succeeded, including the current committed Head;
- the private-repository branch-protection API returned that the current
  account plan cannot enable the feature; and
- the recommended private prerelease exists with the recorded content-addressed
  tag, asset name, size, and SHA-256.

## Coherence And Authority Assessment

The authority model is internally coherent. Canonical Markdown owns human
meaning; the digest-bound YAML companion owns executable representation;
Schemas constrain serialization; the checker evaluates deterministic rules;
and a validation result describes only one observed snapshot. Acceptance,
Design adoption, Realization confirmation, conformance, publication, and
remote protection remain distinct.

The single NKF version namespace is clear: native contracts use
`nkf_version: "0.1"` without record-contract sub-versioning. Pre-stable change
requires governed evidence, Decisions, exact authority revisions, derived
implementation, release, and deliberate consumer migration.

The lifecycle vocabulary is also conceptually coherent:

```text
Task → Design → Decision → Specification → Realization → Validation
```

The Current System Realization is correctly placed inside Realization
knowledge rather than inserted as another authority layer. The main knowledge
map tells agents and humans to start there and inspect historical Decisions or
Designs selectively.

No current-authority or active-navigation local link was found broken. A broad
CommonMark link scan found 25 missing local targets concentrated in preserved
historical Evidence and one exact public mirror of the private normative
Specification. Those links reduce historical convenience but do not break the
current knowledge entry path.

## Development Of The NKF Repository

### What Works

The Technology Profile fits NKF itself well. It requires a Technology root and
at least one Specification, permits Designs, Decisions, Realizations, and
Evidence, and can bind implementation artifacts. That lets the repository
govern both its human meaning and the code, Schema, test, workflow, and release
files that realize it.

The consolidated current-system view, thematic Decision index, disposition
grouping for Designs, Task status navigation, and separate detailed
Realizations make a large knowledge corpus substantially more navigable than a
flat Markdown directory. The 119 artifact bindings make changes to important
implementation files visible to validation. The current `AGENTS.md` mismatch
is a useful demonstration: the repository did not silently treat changed
working instructions as still realized by the accepted mapping.

The checker and tests cover path safety, UTF-8, safe YAML, closed Schemas,
frontmatter, Title Case, section coverage, record and entity graph rules,
profile selection, governed artifacts, extensions, source digests, secret
patterns, validation results, release archives, public projection, adoption,
transactional onboarding, rollback, and agent-guidance integrity.

### Current Defects

The current-system table calls `.nourd/validation-result.json` the latest
passing full-bundle observation, while the actual latest result is failed.
Because the current-system document also says it must not duplicate live
operational state, the durable account should describe the mechanism and
boundary rather than retain a stale pass/fail assertion.

Both `Initial Greenfield Onboarding` and its superseding `Agent-Led Initial
Onboarding` appear under **Current System**. The predecessor still calls itself
the current implementation and documents deterministic eligibility behavior
that ADR 0069 supersedes. The consolidated view explains the provenance, but
the detailed current index can still send an agent or human to contradictory
operational guidance.

The exact worktree cannot currently produce a green authoritative handoff:
`AGENTS.md` is outside its declared artifact digest, and the local adopter and
public guide candidate are not the published recommended release. The
repository correctly exposes both conditions, but current-system consumers
must understand confirmed predecessor, accepted direction, unconfirmed local
successor, and published release as four different states.

## Agent-Guided Development

### What Works

The agent integration is unusually explicit and vendor-neutral in its core.
One neutral protocol is discovered through bounded or minimal adapters and two
byte-identical portable-skill locations. The registry records known host
surfaces, official capability evidence, coverage state, and an unknown-surface
policy. Every produced candidate is intended to reach the same
`npm run nkf:check` output gate.

The protocol gives an agent a sound working order: resolve the project root and
profile, begin with the knowledge map and current Realization, resolve the
owning Task, preserve lifecycle and authority distinctions, synchronize all
affected representations, and report acceptance, confirmation, conformance,
Git, remote, and release facts separately.

### Limits

The repository can verify adapter bytes and test documented discovery paths;
it cannot prove that every AI host actually loaded, understood, or obeyed the
instructions. `verified-adapter` therefore means verified integration shape,
not verified model behavior. Unknown and changed hosts are correctly marked
not verified, but universal AI compliance is not achievable through repository
files alone.

Early enforcement still depends on a human or agent invoking the command.
There is no native editor watcher or local commit hook. The remote workflow
runs on pull requests and pushes, but `master` is not protected, so a bad
snapshot can still be pushed or merged and merely fail afterward. The same
change can also modify the verifier, workflow, registry, tests, and governed
bindings; the protocol requires human review for that boundary, but the remote
repository does not mechanically require the review.

The checker enforces explicit Task status, Design disposition, Decision and
Task reference resolution, Realization confirmation shape, and complete
Markdown representation. It cannot determine that a Task should now be
closed, that an Active Design has become abandoned, that a Design deserves its
disposition, or that a Realization is truthful and current. “No task or
proposal left behind” therefore remains a semantic review obligation rather
than a fully enforceable NKF guarantee.

## Humans, Knowledge Engine, And Knowledge Interface

### What Works

NKF is a strong ingestion format for a Knowledge Engine. Stable bundle,
record, section, and entity identities; explicit roles and responsibilities;
typed relationships; provenance and external-authority locators; exact source
digests; frontmatter summaries and creation times; and a deterministic
validation result provide a useful structured envelope around canonical
Markdown.

Humans are not forced to read YAML to understand meaning. The public
documentation explains what NKF is, why it exists, topology, lifecycle,
authority, onboarding, validation, updates, and recovery, with Product and
Technology examples. The repository's current-system-first navigation also
provides a practical human reading path.

The Specification correctly keeps live operational state outside governed
knowledge and prevents a Knowledge Engine or Interface from becoming a second
authority merely by ingesting or presenting records.

### Limits

NKF defines the knowledge source and validation envelope, not an engine-facing
query, indexing, event, synchronization, or graph-export protocol. A Knowledge
Engine must currently implement its own ingestion, materialization, search,
cross-repository indexing, cache invalidation, access control, and update
observation around the NKF artifacts.

Native NKF 0.1 intentionally contains no presentation metadata. Markdown is
the only portable default presentation, while diagrams remain ordinary
Markdown code blocks. A Knowledge Interface may render them, but it receives
no governed layout, navigation, view, audience, or display contract. NKF-004
retains that future extension direction.

Cross-bundle identities and relationships are deferred. A Knowledge Engine
can index several bundles, but any relationship or identity unification across
projects is presently engine-owned interpretation rather than NKF 0.1 native
meaning.

The self-hosting corpus exercises 872 section mappings but no semantic
entities, entity relationships, or Realization bindings. The checker has
focused tests for those structures, but a realistic engine/interface pipeline
has not demonstrated their authoring, ingestion, querying, navigation, or
evolution at repository scale. The model is structurally available; its main
machine-semantic value is not yet empirically proven.

No concrete acceptance-authority resolver is supplied by the CLI. The library
defines the interface and tests verified, unavailable, and contradicted
outcomes, but `--acceptance-binding` cannot become verified through the shipped
CLI without an external integration. Consequently the self-host repository's
100 Accepted declarations remain `not-verified`, and Governing Use cannot
become Ready through the normal command alone.

## Monolithic Application Repository

### Supported Shape

NKF can fundamentally organize a monolithic application's knowledge when the
repository can honestly choose one root meaning:

- a Product bundle can represent Product purpose, principles, concepts,
  journeys, Domains, Capabilities, Designs, Decisions, Realizations, Evidence,
  and the Product–Domain–Capability hierarchy; or
- a Technology bundle can represent a technical system through a Technology
  root, Specifications, Designs, Decisions, Realizations, Evidence, semantic
  entities, relationships, and governed implementation artifacts.

One Markdown source can map many semantic sections, so a monolith does not
need one file per concept. Current architecture can live in consolidated and
detailed Realizations, while Designs retain alternatives and Decisions retain
rationale. A Technology monolith can include selected source, Schema, test,
configuration, and build files in the validated snapshot.

### Fundamental Limitation

A normal product application repository often owns both Product meaning and a
substantial technical implementation. NKF 0.1 requires exactly one Product or
Technology Root Profile and has no profile composition or native cross-bundle
relationships. Choosing Product excludes `nkf.specification` and forbids
`governed_artifacts`; choosing Technology excludes Product, Journey, Domain,
Capability, Principle, and Concept records.

Therefore one NKF 0.1 bundle cannot currently express the full Product and
technical-contract views of a typical monolithic application with equal native
authority. A Product bundle may still describe architecture in Designs and
Realizations and use non-governed locators, but exact source-code and executable
contract freshness do not participate as governed artifacts. A Technology
bundle may govern code and technical Specifications but cannot use the native
Product hierarchy.

This is a real scope boundary, not proof that the format fails. A monolith that
fits one profile is supported; a combined Product-and-Technology monolith is
only partially supported until profile composition, an additional root model,
accepted extensions, or cross-bundle semantics are governed.

Brownfield monolith onboarding is also deferred. The current onboarder handles
Empty Repository, Tiny Knowledge with no source or configuration, and already
structured NKF projects. It does not yet provide the resumable, source-grounded
migration needed for a mature code-heavy monolith.

## Enforcement And Security Assessment

The deterministic enforcement surface is broad and appropriately fail-closed
for supported contracts. Closed JSON Schemas, strict YAML parsing, complete
Markdown coverage, exact digests, fixed paths, phase gating, stable diagnostics,
reproducible builds, content-addressed releases, transactional adoption, and
exact-commit CI are material strengths.

Its boundaries must remain visible:

- the checker validates declared structure and source binding, not truth,
  adequacy, architecture quality, completeness of meaning, or correct
  implementation behavior;
- manual or agent-maintained declarations can be structurally valid while
  omitting relationships or assigning semantically weak roles;
- lifecycle timeliness and deserved acceptance remain human judgments;
- the native secret registry scans governed Markdown and native declarations
  but not Technology governed-artifact bytes, so the security phase can pass
  while a bound source artifact contains a secret pattern; NKF-009 explicitly
  defers the wider rule;
- authority freshness and universal expiry are deferred under NKF-005;
- remote required-review and required-check merge protection are deferred under
  NKF-012 and currently unavailable on the private repository's account plan;
  and
- offline dependency-audit success reflects available local advisory data, not
  a permanent supply-chain guarantee.

## Completeness Matrix

| Area | Assessment | Consequence |
| --- | --- | --- |
| Canonical human meaning | Strong | Markdown authority and precedence are clear |
| Executable contract and Schemas | Strong | Closed, digest-bound, and thoroughly tested |
| Deterministic checker | Strong within declared scope | Broad structural enforcement; no semantic truth claim |
| Knowledge navigation | Strong with two current defects | Current-system-first path works; onboarding predecessor and stale result wording can mislead |
| Lifecycle governance | Structurally strong, semantically dependent | Status and references are checked; timeliness and deserved disposition require review |
| Agent guidance | Strong integration architecture | Cannot guarantee host discovery or obedience; output gate remains essential |
| Local early enforcement | Partial | No automatic watcher or commit hook |
| Remote merge enforcement | Incomplete | Workflow reports failure but cannot prevent merge or direct push |
| Release and adoption | Strong confirmed predecessor | Local NKF-015 successor is unconfirmed and unpublished |
| Initial onboarding | Useful narrow scope | Empty, Tiny Knowledge, and already structured paths only |
| Brownfield onboarding | Deferred | Mature source-heavy repositories lack a seamless path |
| Knowledge Engine ingestion | Fundamentally compatible | Engine query, synchronization, graph export, and access behavior are undefined |
| Knowledge Interface presentation | Basic Markdown only | Portable presentation guidance is deferred |
| Product monolith | Partial | Product semantics are strong; native technical Specification and artifact binding are absent |
| Technology monolith | Partial to strong | Technical contracts and artifacts work; native Product hierarchy is absent |
| Cross-repository knowledge | Incomplete | Cross-bundle identity and typed relationships are deferred |
| Acceptance verification | Interface only | No shipped resolver can make the normal CLI verify acceptance |
| Secret scanning | Narrow by design | Governed artifact bytes are outside current scan coverage |

## Prioritized Recommendations

These are audit recommendations only; this audit performs none of them.

1. Restore one truthful exact repository baseline: resolve the separate
   `AGENTS.md` candidate, remove stale pass/fail language from the durable
   current-system account, and make the superseded/current onboarding boundary
   unambiguous.
2. Decide the intended monolithic Product-and-Technology model before treating
   NKF as complete for application repositories. Explicitly test whether one
   profile, profile composition, accepted extensions, or linked bundles own
   technical Specifications and source freshness.
3. Exercise semantic entities, relationships, and Realization bindings in a
   real repository and through a minimal Knowledge Engine ingestion/query
   path. Do not infer practical usefulness only from unit tests.
4. Define the smallest engine-facing consumption contract needed for stable
   ingestion and change detection while preserving the boundary that NKF is a
   format, not the Knowledge Engine.
5. Complete or deliberately retain the presentation-extension boundary before
   claiming portable Knowledge Interface behavior beyond Markdown.
6. Add a concrete authority-resolver integration if Governing Use Ready is a
   required operational claim; otherwise document that normal NKF validation
   establishes conformance only.
7. Extend security coverage to Technology governed artifacts through NKF-009,
   with explicit performance, false-positive, privacy, fixture, release, and
   migration treatment.
8. Establish a real merge-prevention alternative for private repositories if
   the account plan still cannot provide branch protection. A reporting
   workflow alone does not satisfy “bad knowledge never reaches master.”
9. Complete NKF-015 publication and recommendation only after the exact
   candidate is confirmed and released; keep the predecessor recommendation
   truthful until then.
10. Use NKF-014 for brownfield and standalone-bootstrap experience rather than
    weakening the initial onboarding safety boundary.

## Final Conclusion

NKF is fundamentally capable of supporting software development knowledge in
the NKF repository and in repositories that fit one current Root Profile. It
already provides a credible governance, traceability, navigation, validation,
agent-guidance, and release foundation.

It should be described as a governed knowledge format and enforcement
foundation, not yet as a complete Knowledge Engine contract, Knowledge
Interface presentation standard, universal AI-control mechanism, or complete
monolithic-application model. The largest architectural question is not
Markdown formatting; it is how one repository will govern Product meaning,
technical Specifications, and implementation artifacts together without
creating competing authorities.

The current local snapshot is useful audit material but is not conformant,
confirmed as the NKF-015 successor, or ready for a successor release.

