# NKF-002: Implement the NKF 0.1 conformance checker

- **Status:** Draft
- **Task:** `NKF-002`
- **Proposed:** 28 July 2026
- **Execution authorized:** 28 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Scope:** Shared NKF 0.1 conformance implementation and Shredwise pilot

> The Human Product Owner authorized implementation of a complete checker and
> explicitly accepted that current knowledge may fail. The checker must expose
> work to fix rather than produce false-positive conformance.

## Objective

Implement one shared, reproducible checker for the accepted NKF 0.1
conformance rules. It must validate complete bundles and all ten core record
contracts, fail closed when required meaning or structure cannot be
understood, and give Shredwise a pinned validation path before its first
Journey proposal is accepted.

## Accepted requirement

The checker is specification-first. Existing accepted records receive no
exemption from structural or contract requirements. Unsupported contracts,
unknown required extensions, missing authority, invalid relationships,
incomplete hierarchy, unsafe paths, stale source bindings, and incomplete body
contracts fail validation.

A failing result is useful diagnostic evidence. Rules must not be weakened,
silently reinterpreted, or downgraded merely to make an existing repository
green. If implementation exposes an ambiguity or contradiction in NKF 0.1, the
checker must report the unsupported case and the specification must be
clarified through governed NKF work.

A green result proves conformance only. It does not provide semantic review,
accept Product meaning, prove a Realization, or establish current operational
health.

## Authority and current state

[ADR 0011](../../decisions/0011-one-knowledge-validation-and-reconciliation-core.md)
requires one shared validation and reconciliation core across local, agent,
Nourd Studio, and continuous-integration runners.

The accepted [NKF 0.1 specification](../nkf-0.1.md) defines structural,
contract, and full-bundle conformance. It deliberately does not select the
validator implementation, gate, or enforcement policy.

[ADR 0013](../../decisions/0013-portable-knowledge-toolchain-and-gates.md)
remains a draft proposal. The existing private TypeScript core under
`src/core/knowledge/` implements the earlier `nourd.knowledge.*` bootstrap
contracts. It is useful implementation evidence but is not an accepted
implementation design and cannot report NKF 0.1 conformance for `nkf.*`
bundles.

The temporary Shredwise audit script is non-authoritative, incomplete, and not
a deliverable of this Task.

## Conformance scope

The checker must implement:

1. every NKF 0.1 structural-conformance requirement;
2. the minimum body responsibilities for Product, Principle, Concept, Journey,
   Domain, Capability, Design, Decision, Realization, and Evidence;
3. stable bundle, record, section, and semantic-entity identity rules;
4. exact Markdown source, title, digest, section, occurrence, and authority
   bindings;
5. controlled lifecycle, status, section-authority, role, relationship,
   provenance, and external-authority vocabulary;
6. relationship target resolution and source-section traceability;
7. acyclic `part-of` validation and the Product–Domain–Capability hierarchy;
8. Evidence provenance or primary-observation requirements;
9. complete non-record classification;
10. real-path and symlink containment for the distribution, Markdown root,
    records root, sources, and classified material;
11. fail-closed contract and required-extension dispatch; and
12. Nourd repository-profile validation, including accepted-base and proposal
    lineage where the profile requires Git-backed acceptance.

The checker can validate declared structure and contract coverage. It cannot
automatically decide whether prose is wise, truthful, commercially viable,
safe, or semantically accepted.

## First increment

Produce a rule-by-rule gap matrix comparing:

- accepted NKF 0.1 requirements;
- accepted Nourd knowledge-governance Decisions;
- the draft ADR 0013 implementation proposal;
- the existing contract schemas and shared core;
- current Nourd Studio fixtures and tests; and
- the Shredwise NKF bundle, including its draft Journey record.

The gap matrix must distinguish missing implementation, legacy-only behavior,
contradiction, under-validation, overreach, and unresolved implementation
choice. Present the resulting implementation recommendation before materially
changing the shared core or contract schemas.

## Work sequence

1. Resolve and pin the exact accepted NKF 0.1 specification revision.
2. Complete the first-increment conformance gap matrix.
3. Propose the smallest implementation design that preserves the one-core
   decision and supports portable Shredwise validation.
4. Obtain Human Product Owner acceptance for material implementation choices
   not already governed by accepted Decisions.
5. Implement versioned executable contracts and deterministic validation for
   all ten NKF record types.
6. Add valid fixtures plus deliberately invalid fixtures for every rule and
   failure boundary.
7. Expose stable human-readable and machine-readable local commands.
8. Validate the Nourd Studio repository under its explicitly identified
   legacy or migration contract without misreporting it as NKF 0.1.
9. Validate Shredwise with the exact same core and pinned NKF contract.
10. Report Shredwise failures as repair work; do not automatically rewrite
    semantic knowledge.

## Deliverables

Expected deliverables are:

- the accepted-base conformance matrix and implementation proposal;
- versioned NKF executable contract schemas;
- the upgraded shared validation core;
- contract and core tests with positive and negative fixtures;
- a stable repository command and structured diagnostic output;
- explicit legacy-contract and NKF-contract dispatch;
- a pinned Shredwise invocation or thin adapter; and
- verification evidence for both repositories.

The exact file paths, package boundary, language, parser, schema library, and
distribution mechanism remain implementation choices until the first
increment establishes what can be reused safely.

## Failure and repair policy

The checker must produce stable, actionable diagnostics and a non-zero result
for nonconformance. It must preserve the distinction between:

- invalid structure or unsupported contract;
- a valid proposal awaiting acceptance;
- accepted knowledge;
- legacy material that was not validated as NKF;
- semantic questions requiring human judgment; and
- operational status outside canonical knowledge.

Deterministic reconciliation may propose exact digest or mechanically derived
updates where the applicable contract allows it. It must not invent or change
record type, scope, semantic roles, relationships, authority, provenance,
external bindings, or Product meaning.

Knowledge repairs follow normal governed proposal and acceptance rules. An
accepted status field does not waive a conformance failure.

## Migration and compatibility boundary

The existing `nourd.knowledge.*` bootstrap contracts and accepted `nkf.*`
contracts must not be conflated. If both are supported during migration, the
checker must dispatch them explicitly, apply the correct rule set, and label
the result accurately.

This Task does not silently migrate current Nourd Studio declarations or
Shredwise records. It does not claim that compatibility exists merely because
both formats use Markdown and YAML.

The shared core must remain the one validation authority. Shredwise receives a
pinned consumer path or thin adapter rather than an independently evolving
validator.

## Validation and review

The Task must run type checks, all contract and core tests, positive and
negative conformance fixtures, current-repository validation, and Shredwise
validation. Each rule must have a stable diagnostic identifier and at least
one failing test where practical.

The exact implementation proposal must be preserved and reviewed before
material unaccepted design choices become governing. The exact completed
checker revision and its known limitations must be presented before it becomes
the validation basis for accepting Shredwise Journey records.

## Exclusions

This Task does not accept or repair the Shredwise Journey proposal, rewrite
Product knowledge merely to obtain a green result, refactor Shredwise Product
Sources, operationally onboard Shredwise to Nourd Studio, configure branch
protection, publish NKF publicly, establish an extension registry, implement a
runtime protocol, or make a validator result an acceptance authority.

CI enforcement, public package ownership, long-term registry hosting, and
future NKF-version migration policy remain separate decisions unless an
accepted authority already determines them.

## Pre-mortem

| Failure mode | Consequence | Required response |
| --- | --- | --- |
| The implementation is shaped around current green records | Missing rules produce false-positive conformance | Start from the accepted specification and require negative fixtures |
| Legacy and NKF contracts are guessed as compatible | Repositories receive misleading results | Dispatch exact contract identifiers and label legacy validation separately |
| The checker embeds a second schema vocabulary | Core code and contracts drift | Keep one executable contract source and test every dispatched version |
| Body validation only counts headings | Structurally shallow records appear complete | Test every required responsibility and source-bound section contract |
| Semantic judgment is automated | Generated interpretation silently becomes Product authority | Limit automation to deterministic conformance and expose human decisions |
| Shredwise failures are hidden or mass-rewritten | The pilot loses its diagnostic value | Preserve failures and repair governed records one class at a time |
| A local-only tool cannot move with NKF | The first pilot becomes a dead-end implementation | Preserve the one-core boundary and define a pinned consumer interface |

## First-increment audit

The exact accepted NKF 0.1 specification is the file revision introduced by
acceptance commit
`13a82fbc1b72c1350e9765f59d1538c375f3fa69`. Its current exact-byte SHA-256
digest is
`77869d6f6cfe2ba8086e4eeba28fc5e545aa2c1896b9a28488b6d53b1b03bc5a`;
the current file is unchanged from that accepted revision. The proposal source
is commit `5082a75d6dad1f6889bd19c1b4ef97a6b36a1769`.

The existing shared core contains useful deterministic machinery, but it
cannot validate an NKF bundle. Its schemas, TypeScript types, body-contract
dispatch, governance fields, and tests implement only the earlier
`nourd.knowledge.*` bootstrap contracts.

| NKF 0.1 rule area | Existing shared core and tests | Shredwise pilot evidence | Gap classification | Required checker behaviour |
| --- | --- | --- | --- | --- |
| Exact NKF and contract revision pin | No NKF version or specification-revision input is loaded | The bundle declares `nkf_version: "0.1"` but no immutable specification pin | Missing implementation | Resolve an exact supported NKF revision from trusted validator distribution metadata and report it in every result |
| Exact contract-family dispatch | Only `nourd.knowledge.bundle/v1`, `nourd.knowledge.record/v1`, and `nourd.knowledge.*` body contracts are supported | The bundle and all 13 records use `nkf.*` identifiers | Legacy-only behaviour | Dispatch by exact bundle, record, and body-contract identifiers; never fall back or relabel legacy validation as NKF |
| Bundle responsibilities | The legacy bundle schema has no `nkf_version` and accepts only its own fixed contract | All logical NKF bundle fields are present | Legacy-only behaviour | Validate every NKF manifest responsibility and reject missing, unknown-required, or incompatible values |
| Distribution and path containment | Real-path and symlink containment are strong and reusable, but paths are assumed to live under the repository and schemas are loaded from the target repository | Shredwise uses the Nourd repository profile and repository-relative source paths | Under-validation and unresolved choice | Keep lexical and real-path containment; define the invocation distribution boundary and path bases explicitly; load trusted contracts from the checker rather than the consumer |
| Complete non-record classification | Only Markdown files are discovered; the legacy schema restricts kinds to three old values | Twenty Markdown files are classified; Task plans use `task-execution-plan` | Under-validation | Classify every file required by the NKF roots, reject missing and duplicate entries, and preserve explicitly supported profile kinds |
| Exactly one living Product root | The named root is checked for type `product`, but additional Product records and Product lifecycle are not rejected | One living Product record exists | Under-validation | Require exactly one Product record, require it to match `product_record`, and require its lifecycle to be `living` |
| One declaration and one canonical Markdown source | Descriptor-to-source and source uniqueness checks are reusable; Markdown classification catches unowned Markdown | Each of the 13 records has one declaration and source | Partial implementation | Retain bidirectional uniqueness and reject orphan, duplicate, non-file, or out-of-root declarations and sources |
| UTF-8 and Markdown title contract | H1 count and title matching exist; invalid UTF-8 bytes are silently decoded by Node | Current sources appear readable as UTF-8 | Under-validation | Decode UTF-8 fatally, require exactly one H1, and compare the declared title to the normalized H1 |
| Stable bundle, record, section, and entity identity | Record and section uniqueness exist; semantic entities are unsupported | Shredwise declares record and section IDs but no entities | Under-validation | Validate scope-specific uniqueness for bundle, record, section, and entity identities without treating paths or titles as identity |
| Exact-byte source digest | SHA-256 calculation, mismatch detection, and deterministic reconciliation are strong and reusable | All current declarations contain digests | Implemented for legacy; reusable | Apply the same exact-byte binding to NKF and keep digest repair separate from semantic reconciliation |
| Complete section mapping | H2 and H3 headings are all required to map and resolve exactly | Current records map their semantic headings | Partial implementation and overreach | Require every semantic section to map exactly once while avoiding the unsupported assumption that every H2 or H3 is necessarily semantic |
| Section authority | The four authority values and one unresolved-role check exist | Accepted records deliberately contain accepted, proposal, and unresolved sections | Partial implementation | Validate the four authority classes and preserve section authority independently from record acceptance; do not promote proposal or unresolved sections |
| Section roles and body responsibilities | A small legacy role enum exists, and most body checks merely count broad roles | Shredwise uses additional roles such as `interface`, `obligation`, `measure`, `method`, `observation`, `finding`, `interpretation`, `identity`, and `mapping` | Contradiction and unresolved choice | Use an accepted executable responsibility vocabulary; do not infer responsibility coverage from headings or accept free-form roles as contract proof |
| Relationship vocabulary | Target resolution exists, but `part-of` and `rationale-for` are absent and `source_section` is optional | All 63 current relationships have source sections; Domains use `part-of` | Legacy-only behaviour | Support exactly the NKF relationship vocabulary, require a resolvable source section, and fail closed on unsupported relationship types |
| Product–Domain–Capability hierarchy | No graph or cycle validation exists | Nine Domains are directly `part-of` Product; no Capability records exist yet | Missing implementation | Prove an acyclic graph, require every Domain to reach Product, require every Capability to have exactly one Domain parent, and reject unsupported hierarchy participation |
| Scope resolution | The scoped Product ID is only checked for existence, not identity with the unique root | All records scope to `product` | Under-validation | Require every record scope to resolve to the unique Product root and validate supported narrower subjects without treating them as identity |
| Governance vocabulary and invariants | Legacy lifecycle/status values exist, but the core requires legacy `accepted_on` or `proposed_on` and duplicate Markdown status/date metadata | Shredwise uses optional `accepted_at` plus `acceptance_source`; draft records do not require dates | Legacy-only behaviour and overreach | Validate NKF lifecycle, status, and acceptance authority; enforce living Product and immutable accepted Decision; keep copied dates optional and do not require duplicate Markdown governance metadata |
| Git-backed accepted base and proposal authority | Base resolution, immutable accepted-ADR protection, accepted-record removal detection, proposal state, and proposal digest are useful | Shredwise uses `master` as its accepted branch and records proposal revisions for accepted records | Partial profile implementation | Retain fail-closed exact-base comparison as a Nourd profile rule, parameterize the base ref, and never infer acceptance from current metadata or branch presence |
| Provenance sources and Producer/Verifier roles | Not represented by the legacy schema or core | Evidence and Realization records declare a source; Producer and Verifier roles are absent | Missing implementation | Validate optional provenance structures, stable source IDs when referenced, locators, and distinct Producer, Verifier, acceptance-authority, and external-authority roles |
| Evidence provenance or primary observation | No Evidence-specific provenance rule exists | The current Evidence record declares a repository source and an observation-method section | Missing implementation | Require at least one valid provenance source or an explicitly source-bound primary-observation method |
| External-authority boundaries | A required legacy array uses a different shape and has no source-section or resolution-rule binding | Shredwise expresses boundaries in Markdown but declares no structured external-authority objects | Legacy-only behaviour | Keep the structure optional, but when declared require authority, relationship, source section, and durable locator or resolution rule; keep it separate from provenance |
| Semantic entities and entity relationships | Unsupported | No current Shredwise entities are declared | Missing implementation | Validate stable entity identity, controlled kinds, definition ownership, source-bound entity relationships, and all referenced sections and entities |
| Durable bindings | Unsupported | No current Shredwise bindings are declared | Missing implementation | Require entity, Realization record, controlled kind, source section, and locator or resolution rule; reject unresolved references and live-state fields |
| Product body contract | Only one broad governing role is required | The Product source has all seven required responsibility headings | Under-validation | Prove all seven accepted Product responsibilities through explicit contract mappings and require the unique Product to be living |
| Principle and Concept body contracts | Each only needs one broad governing, principle, or boundary role | Shredwise has no records of these types yet | Under-validation | Validate every required responsibility with positive and negative fixtures even when the pilot has no current instance |
| Journey body contract | Only a section ID exactly equal to `purpose` and one boundary role are required | The draft Journey has headings for all eight required responsibilities, but its purpose section ID differs | Under-validation and contradiction | Validate all eight responsibilities through explicit mappings; do not standardize record-local section IDs by accident |
| Domain and Capability body contracts | No responsibility validation exists | Domain sources cover all seven Domain responsibilities; no Capability records exist | Missing implementation | Validate every responsibility and enforce their hierarchy rules independently from filesystem placement |
| Design and Decision body contracts | Design has no responsibility checks; Decision is represented only as legacy `architecture-decision` with context and governing roles | Shredwise has neither type yet | Legacy-only behaviour | Support general `decision` and all required responsibilities; require immutable lifecycle only when a Decision is accepted |
| Realization and Evidence body contracts | No responsibility validation exists | Current sources appear to cover all required responsibilities | Missing implementation | Validate every responsibility, keep Realization separate from operational state, and require Evidence provenance without judging truth |
| Required extensions and incomplete validation | Rigid legacy schemas reject unknown fields but there is no extension declaration, dispatch, or incomplete-conformance result | Shredwise uses profile-specific acceptance provenance and non-record kinds | Missing implementation and unresolved choice | Make required extensions explicit, dispatch only supported versions, round-trip visible unknown optional material, and fail closed with an incomplete-validation result |
| Diagnostic and result model | Stable rule strings and structured output exist, but results expose only pass/fail plus governance state | The temporary Shredwise script reports a structural pass despite omitting most NKF rules | Under-validation | Report structural, contract, and full-bundle conformance separately, include every exact contract revision used, and distinguish unsupported from nonconformant |
| Rule fixtures | Twelve tests cover selected legacy path, source, section, base, governance, and ADR cases | There are no authoritative NKF fixtures | Missing implementation | Add a minimal valid bundle plus at least one focused negative fixture for every normative rule and all ten body contracts |

Four accepted requirements cannot yet be implemented honestly without a
governed clarification or profile choice:

1. NKF 0.1 describes body responsibilities in prose but defines neither
   stable responsibility identifiers nor a declaration field that binds a
   section to those responsibilities. Heading text, section IDs, and broad
   roles are not a safe substitute.
2. The general NKF distribution boundary and the base from which source and
   non-record paths resolve are not encoded in the manifest. The Nourd
   repository profile can use the repository root, but that profile choice is
   not universal NKF core.
3. NKF requires fail-closed handling of required extensions but does not
   define how a bundle declares an extension as required, which contract owns
   it, or how its version is resolved.
4. Accepted Nourd Decisions require revision-specific acceptance, while the
   exact declaration fields for acceptance provenance remain deliberately
   undecided. Shredwise's `accepted_at` and `acceptance_source` fields are
   useful pilot evidence, not yet an accepted universal NKF shape.

These are specification or profile gaps. Treating current Shredwise field
names as the standard would overfit NKF to its first pilot. Treating the
legacy Nourd Studio fields as equivalent would silently contradict the
accepted format.

## Implementation recommendation

The smallest credible implementation keeps the accepted one-core boundary and
reuses only the proven mechanics of the current TypeScript core: parsing,
exact-byte hashing, Markdown heading resolution, real-path containment,
Git-base comparison, deterministic reconciliation, diagnostics, and structured
results.

The recommended design is:

1. retain the existing private TypeScript/Node package as the shared
   implementation for this Task without accepting the wider draft ADR 0013;
2. move legacy executable schemas behind an explicitly labelled legacy
   contract-family adapter;
3. add separately versioned NKF 0.1 bundle, record, and ten body-contract
   schemas owned and distributed by the checker;
4. add an exact contract dispatcher with no fallback between legacy and NKF;
5. add an explicit, versioned `responsibilities` binding from each declared
   section to controlled responsibility IDs owned by its body contract;
6. add independent validators for graph hierarchy, provenance, roles,
   external authority, semantic entities, bindings, extensions, and Nourd
   Git-backed acceptance;
7. add `--repository` so one installed checker can validate Nourd Studio or
   Shredwise without loading executable contracts from the consumer
   repository;
8. keep `--base` explicit so Nourd Studio can use `main` and Shredwise can use
   `master`; and
9. produce a versioned packed artifact from the one core for the Shredwise
   pilot, pin its integrity in Shredwise, and invoke it through a thin local
   command. The packed artifact is a distribution of the shared core, not a
   second implementation or authority.

This recommendation deliberately does not configure CI, publish a public
package, migrate Nourd Studio to NKF, accept the Shredwise Journey, or repair
any Shredwise failure.

The material choice that must be accepted before core or schema changes is:
use the existing private TypeScript core as the NKF 0.1 implementation base,
introduce explicit machine-readable body-responsibility bindings, keep legacy
and NKF contract families separate, and use an integrity-pinned packed
artifact as the temporary cross-repository distribution for Shredwise.

On 28 July 2026, the Human Product Owner instructed implementation of the
complete checker to proceed after the explicit body-responsibility binding was
presented as the prerequisite. This authorizes the implementation direction.
The exact amended specification and executable contracts remain a composite
proposal until their reviewed revision is deliberately accepted.

## Implementation result

The authorized implementation is complete on the Task branch. It adds:

1. exact, fail-closed dispatch between the legacy `nourd.knowledge.*`
   contracts and NKF `0.1`;
2. checker-owned executable bundle, record, and all-ten-body contract
   definitions;
3. deterministic structural, body-responsibility, hierarchy, provenance,
   external-authority, entity, binding, extension, path, security, and Nourd
   Git-profile validation;
4. structured structural, contract, full-bundle, and profile conformance
   levels;
5. deterministic source-digest reconciliation that does not rewrite semantic
   knowledge; and
6. an integrity-manifested portable build for a pinned consumer copy.

The verified package typecheck and 26-test suite pass. The suite includes one
complete ten-contract bundle, a missing-responsibility failure for every body
contract, and focused negative boundaries for source binding, hierarchy,
provenance, entities, bindings, extensions, containment, secret material,
Decision governance, reconciliation, and Git-backed base validation.

The same portable core validates the current Shredwise Task checkout with
structural conformance passed and the Nourd repository profile passed. Contract
and full-bundle conformance fail with 92
`body-contract.responsibility-required` errors across the 13 records. This is
the intended diagnostic result: Shredwise's Markdown has not been rewritten,
its declarations have not been repaired, and its Journey has not been
accepted.

The exact amended NKF specification and executable contract set are still a
proposal awaiting Human Product Owner acceptance. A passing checker result is
conformance evidence only and cannot provide that acceptance.
