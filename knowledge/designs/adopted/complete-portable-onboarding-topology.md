---
id: design-nkf-017-complete-portable-onboarding-topology
type: design
title: NKF Complete Portable Onboarding Topology
summary: This Design proposes a complete lifecycle-first knowledge topology for every newly onboarded Product and Technology repository, including one canonical knowledge map, durable empty-area navigation, continuing enforcement, and deliberate predecessor repair.
created_at: 2026-07-31T21:50:32Z
record_lifecycle: immutable
record_status: accepted
task: NKF-017
design_disposition: adopted
design_decisions:
  - adr-0071
---

# NKF Complete Portable Onboarding Topology

## Design Kind Problem And Scope

This is a Common project-organization, onboarding, conformance, and migration
Design with additive Product and Technology scaffold behavior. It corrects
the gap demonstrated by the Nourd Agent SDK exercise without making the NKF
repository's local organization portable by implication.

Current NKF onboarding creates enough files to validate a Draft bundle but
does not establish the complete lifecycle topology expected by its Human
Product Owner. Existing `knowledge/README.md` content also causes generation
of `README-2.md`, creating two apparent knowledge maps.

The Design covers Category 1 and Category 2 Product and Technology onboarding,
continuing topology conformance, and deliberate repair of repositories created
by the confirmed [NKF-013](../../tasks/completed/NKF-013-initial-greenfield-onboarding.md) or [NKF-015](../../tasks/completed/NKF-015-agent-led-initial-onboarding.md) predecessor. It does not define the later
repository categories owned by [NKF-014](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) or authorize mutation of Agent SDK.

## Governing Inputs And Constraints

The lifecycle remains:

```text
Task → Design → Decision → Specification → Realization → Validation
```

Common already owns Task, Design, Decision, Realization, Evidence, project
entry, knowledge coverage, frontmatter, source binding, and validation
mechanics. Technology adds Specification and requires at least one such
record. Product adds its own semantic bodies and hierarchy. Directories remain
navigation and never establish Task state, Design disposition, record type,
acceptance, normative authority, or confirmation.

Every Markdown file under `knowledge_root` must still have exactly one record
declaration or explicit `non_records` representation. Generated navigation
must have truthful frontmatter with the real UTC onboarding instant. A
complete directory cannot invent a Decision, accepted Specification, adopted
Design, completed Task, confirmed Realization, or Evidence.

The project root continues to contain `.nourd`; `knowledge_root` remains an
explicit project-contained relative path. Common is inherited and remains
non-selectable. NKF retains one `nkf_version: "0.1"` coordinate and no topology
sub-version.

## Proposed Direction

NKF Common defines one durable portable lifecycle topology. Product and
Technology use the same lifecycle navigation and add only the semantic
scaffold required by their selected Root Profile.

The complete topology is a continuing contract after a repository deliberately
migrates to the successor NKF 0.1 release. It is not only a one-time generator
convention. The checker verifies exact required paths, file kinds, native
representations, and applicable navigation targets without inferring semantic
status from those paths.

### Common Portable Topology

The following paths are required under every configured `knowledge_root`:

| Path | Required Content And Meaning |
| --- | --- |
| `README.md` | The single canonical knowledge map and normal human and agent entry point |
| `tasks/README.md` | Task navigation and Task-state explanation |
| `tasks/active/README.md` | Navigation for Active Tasks; never proof that a linked Task is Active |
| `tasks/deferred/README.md` | Navigation for Deferred Tasks; never proof that a linked Task is Deferred |
| `tasks/completed/README.md` | Navigation for Completed Tasks; never proof that a linked Task is Completed |
| `designs/README.md` | Design navigation and disposition explanation |
| `designs/active/README.md` | Navigation for Active Designs; never the source of disposition |
| `designs/adopted/README.md` | Navigation for Adopted Designs; never the source of disposition |
| `designs/rejected/README.md` | Navigation for Rejected Designs; never the source of disposition |
| `designs/superseded/README.md` | Navigation for Superseded Designs; never the source of disposition |
| `designs/withdrawn/README.md` | Navigation for Withdrawn Designs; never the source of disposition |
| `decisions/README.md` | Navigation for immutable Decisions |
| `specifications/README.md` | Navigation for current and historical Specification meaning |
| `realizations/README.md` | Realization navigation beginning with the consolidated current-system view |
| `realizations/current-system.md` | One unconfirmed or confirmed consolidated current-system Realization record |
| `realizations/current/README.md` | Navigation for supporting current Realizations |
| `evidence/README.md` | Evidence index and non-authority explanation |

Each required `README.md` except `evidence/README.md` is an explicit
`navigation` non-record. It is a short, generated or reconciled CommonMark
index with the normal frontmatter envelope. `evidence/README.md` is an
`evidence` non-record and retains the Common Evidence exemption from required
frontmatter; its presence and navigation do not make Evidence authoritative.
The files make empty lifecycle areas durable in Git and visible to humans,
agents, and future Knowledge Engine consumers. An empty-area index states that
no item is currently represented; it is not an empty semantic record or
authority placeholder.

The consolidated `realizations/current-system.md` remains a Realization
record, not navigation. The active onboarding Task is created below
`tasks/active/`. No other Task, Design, Decision, Specification, Realization,
or Evidence record is invented merely to populate the topology.

Decisions remain flat by default because their immutable identifiers provide
durable order. Additional Evidence and current-Realization subdirectories may
be introduced when real material needs them, but are not part of the portable
minimum.

### Product And Technology Additions

The Product Root Profile adds:

- one Draft Product root at `product.md` when that canonical path is free;
- no invented Principle, Concept, Journey, Domain, or Capability record; and
- no additional mandatory directory inferred from the Product record
  hierarchy.

The Technology Root Profile adds:

- one Draft Technology root at `technology.md` when that canonical path is
  free; and
- one Draft Specification at
  `specifications/initial-specification.md` when that canonical path is free.

An existing safe non-canonical root or Specification path may remain when the
plan selects it deliberately. Root identity and hierarchy remain native record
meaning, not filesystem meaning. Both profiles otherwise receive the exact
Common portable topology.

### Canonical Knowledge Map Reconciliation

`knowledge_root/README.md` is the only canonical map path. The onboarding
workspace no longer allocates `README-2.md` or another suffix when it already
exists.

When no `README.md` exists, the onboarder generates it. When it exists, the
plan must classify its candidate as navigation and preserve it as the same
document identity. The candidate must contain exactly one managed block with
the literal `<!-- nkf-navigation:start -->` and
`<!-- nkf-navigation:end -->` boundaries. That block contains one
`NKF Navigation` section linking the root, current-system Realization,
lifecycle indexes, active onboarding Task, and Technology initial
Specification when applicable.

The existing CommonMark body outside that managed block remains project-owned
and byte-preserved unless project authority explicitly approves a candidate
semantic edit. When a source without frontmatter needs the required envelope,
the original body bytes remain unchanged after the new envelope; generated
navigation is appended as the managed block. Any other frontmatter
normalization or semantic edit remains an explicit candidate change bound to
predecessor and candidate digests. Source inspection and the transaction carry
the exact predecessor bytes through sealing and rollback; successful
onboarding does not silently replace the existing map or retain an undisclosed
second authority copy.

If a candidate cannot preserve the existing map identity or contains an
ambiguous competing navigation section, sealing fails for human resolution.
An arbitrary suffix is never the recovery strategy.

### Existing And Partial Topology

An existing exact required index path is reconciled as the canonical index and
must be represented as navigation. Missing indexes are generated. Conflicting
record use, unsupported file kind, symbolic link, escaping path, duplicate
physical target, or semantically ambiguous existing index fails before
project mutation.

Existing flat Tasks and Designs remain at their current paths during initial
onboarding unless the plan classifies them through explicit frontmatter and
project authority approves their exact movement. They are never moved based on
filename, prose, or directory. Indexes may link unresolved preserved sources
from an `Unclassified Preserved Knowledge` section while they remain an
`other` non-record. A move occurs only through an explicit candidate old-path
removal, new-path addition, stable identity binding, link reconciliation, and
human review.

### Lifecycle Placement And Index Completeness

For native lifecycle knowledge created or deliberately migrated under the
successor contract, frontmatter remains the state or disposition source and
the path must agree with it:

- a Task non-record is below `tasks/active/`, `tasks/deferred/`, or
  `tasks/completed/` according to its `task_status` and is linked exactly once
  from that area's index;
- a Design record is below `designs/active/`, `designs/adopted/`,
  `designs/rejected/`, `designs/superseded/`, or `designs/withdrawn/`
  according to its `design_disposition` and is linked exactly once from that
  area's index;
- a Decision record is below `decisions/` and is reachable from
  `decisions/README.md`;
- a Specification record is below `specifications/` and is reachable from
  `specifications/README.md`; and
- a supporting current Realization is below `realizations/current/` and is
  reachable from `realizations/README.md` or
  `realizations/current/README.md`.

The checker reads explicit frontmatter and declarations first, then verifies
path and index agreement. It never assigns semantic state from placement.
Unresolved preserved material may remain outside canonical placement only
while it is represented as a non-record rather than falsely promoted to a
native lifecycle record.

Evidence may contain immutable snapshots and historical layouts that cannot
be normalized or exhaustively indexed without corrupting provenance.
`evidence/README.md` must expose the Evidence areas used by the project, but
Common does not require every preserved Evidence file to be individually
linked.

### Continuing Enforcement

The checker validates the portable topology during the project phase:

1. every required path exists as a safe regular file;
2. every required index is represented exactly once as a `navigation`
   non-record;
3. `realizations/current-system.md` resolves to exactly one Realization record;
4. the required active onboarding Task resolves as one Task non-record during
   initial onboarding;
5. the canonical map contains the required exact project-relative navigation
   targets;
6. native Task and Design paths and indexes agree with their explicit state or
   disposition;
7. Decision, Specification, and current Realization sources satisfy their
   lifecycle placement and navigation rules;
8. Technology retains at least one Specification record; and
9. no competing generated `README-<number>.md` map is declared.

The checker compares explicit declarations and parsed navigation. It does not
infer Task state or Design disposition from a path, require records merely
because an index exists, or prove that navigation prose is semantically
adequate.

Topology resources participate in Governed Validation Inputs because their
presence and bytes affect conformance. Removing or changing a required index
makes the latest validation result stale and causes the next full-bundle check
to fail when the contract is no longer satisfied.

### Predecessor Repair

The adopter adds an explicit `repair-topology` workflow for a repository with
a valid [NKF-013](../../tasks/completed/NKF-013-initial-greenfield-onboarding.md) or [NKF-015](../../tasks/completed/NKF-015-agent-led-initial-onboarding.md) onboarding receipt. It does not repeat semantic
category assessment or initial adoption.

Repair inspects the current adopted project, constructs a candidate outside
the project, creates missing indexes, reconciles `README.md`, and removes a
predecessor-generated competing map only when the receipt identifies that
exact path and its current bytes match the known generated predecessor. Any
drift or consumer-authored competing content fails for human resolution.

The repair is sealed, staged, checked, and applied through the same
rollback-capable transaction as onboarding. Its receipt records predecessor
release, successor release, created, changed, removed, and preserved paths.
Repeating the exact repair returns `no-update`.

Repositories without a trustworthy predecessor receipt use a governed
migration plan rather than automatic repair. Agent SDK remains outside this
Task until its authority separately directs that consumer migration.

The NKF repository itself does not rely on the consumer repair command. As the
self-hosted Technology authority and first successor implementation, [NKF-017](../../tasks/completed/NKF-017-complete-portable-onboarding-topology.md)
must deliberately add its missing portable indexes, reconcile its navigation,
update native declarations, and validate that exact migration before the
successor can be confirmed.

## Responsibilities Interactions And Information Flows

| Participant | Responsibility | Must Not Claim |
| --- | --- | --- |
| NKF Specification | Portable paths, navigation semantics, profile additions, conformance, and migration boundary | Consumer acceptance or current operational state |
| Project authority | Root Profile, existing-map meaning, ambiguous classifications, candidate semantic edits, and migration approval | That a path creates Task state, Design disposition, or acceptance |
| Participating agent | Complete review, explicit candidate reconciliation, link repair, and uncertainty | Authority from directory names or generated structure |
| Mechanical onboarder | Exact generation, merge preconditions, sealing, staging, transaction, rollback, receipt, and idempotence | Semantic adequacy, acceptance, or confirmation |
| NKF checker | Deterministic topology, representation, record, target, and contract checks | That navigation proves lifecycle truth or current meaning |
| Knowledge Engine or interface | Consume the canonical map and declared lifecycle topology | Replace canonical Markdown or infer authority from presentation |

The Specification defines the portable topology. The onboarding plan binds
project-specific inputs and existing candidates. The onboarder derives exact
files and declarations. The checker evaluates the complete staged snapshot.
The Human Product Owner separately accepts meaning and confirms an exact
Realization after audit.

## Alternatives And Trade-Offs

### Retain The Minimal Populated-Only Scaffold

Rejected in this proposal because it reproduces the observed Agent SDK result,
leaves lifecycle navigation unpredictable, and makes the onboarding experience
depend on incidental predecessor directories.

### Create Empty Directories Without Files

Rejected because Git does not preserve empty directories and neither humans
nor agents receive an explanation of the lifecycle area's meaning.

### Use Hidden Placeholder Files

Rejected because a hidden placeholder preserves a directory but provides no
useful navigation, is not naturally governed as Markdown, and would introduce
a weaker parallel representation of topology.

### Generate Every Possible Semantic Record

Rejected because placeholder Decisions, Designs, Specifications, or Evidence
would appear to carry meaning or authority that onboarding cannot supply.

### Give Product And Technology Separate Lifecycle Trees

Rejected because Task, Design, Decision, Realization, Evidence, and their
authority boundaries are already Common. Separate trees would duplicate the
same protocol and create avoidable profile drift.

### Keep A Selectable Layout In The Plan

Rejected because a portable contract cannot guarantee predictable navigation
while allowing every repository to choose different lifecycle paths. Existing
non-canonical semantic record paths may be preserved, but the Common index
paths are fixed.

### Replace An Existing Knowledge Map

Rejected because it can discard consumer meaning and provenance. Reusing the
same canonical path with explicit candidate reconciliation avoids both silent
overwrite and competing maps.

### Make Topology Generation-Only

Rejected because a later deletion or drift would remain conformant and the
promised navigation would not be durable. Continuing enforcement adds files
and validation cost but makes the contract real.

## Failure Safety Recovery And Operations

Inspection and candidate preparation remain read-only against the project.
Every required generated or reconciled file is resolved before mutation.
Unsafe paths, symbolic links, special files, duplicate physical targets,
ambiguous existing maps, source drift, candidate drift, release mismatch,
staged checker failure, or transaction failure stops the operation.

The transaction retains predecessor bytes and restores them on failure.
Removal of a predecessor-generated duplicate map is permitted only with
receipt provenance and an exact byte match. No unrelated consumer file is
deleted or relocated automatically.

Generated indexes use only project-relative links and contain no local
machine path. The latest validation result remains operational state under
`.nourd` and does not become acceptance or history.

Pre-stable compatibility is deliberate: predecessor releases continue to
describe the snapshots they checked. A repository moves to the successor
contract only through new onboarding or explicit topology repair. There is no
parallel topology version, hidden fallback, or silent change to historical
checker meaning.

## Validation And Decision Evidence

Acceptance requires comparison against the Agent SDK exercise, current NKF
self-hosting, both Root Profiles, and the complete Task acceptance criteria.
Implementation validation must include:

- Category 1 and Category 2 Product and Technology onboarding;
- a new knowledge root and a safe non-default knowledge root;
- absent, existing, partial, and conflicting portable topology;
- an existing canonical map with and without frontmatter;
- duplicate or ambiguous navigation sections;
- preserved flat Tasks and Designs;
- safe map reconciliation and exact-link checking;
- generated index frontmatter and native representation;
- missing or misclassified required indexes;
- map, Task, Design, Specification, Realization, and Evidence non-authority;
- unsafe paths, symbolic links, drift, rollback, and idempotence;
- exact predecessor repair with a trusted receipt;
- drifted or consumer-authored competing-map refusal;
- deterministic build, public projection, installed consumer, and
  self-hosting migration; and
- an independent whole-repository audit after realization.

Validation success demonstrates only conformance of an exact snapshot. The
Human Product Owner must accept the exact Design and successor Specification.
A separate confirmation Decision must bind the audited Realization before
Task completion or release.

## Unresolved Matters

[ADR 0071](../../decisions/0071-complete-portable-onboarding-topology.md) resolves the exact Common path set, profile additions, continuing
conformance, canonical-map reconciliation, and trusted-receipt predecessor
repair boundaries. No unresolved Design matter blocks derivation of the
successor Specification and Realization.

The exact normative revision, executable companion, implementation,
Realization confirmation, consumer migration, and release retain their own
authority and validation boundaries.
