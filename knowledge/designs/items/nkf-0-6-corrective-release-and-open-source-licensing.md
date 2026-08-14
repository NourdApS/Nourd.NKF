---
id: design-nkf-027-corrective-release-and-open-source-licensing
type: design
title: NKF 0.6 Corrective Release And Open-Source Licensing
summary: This Design proposes one NKF 0.6 successor that corrects native authoring mutations, proves ordinary producer authoring before publication, and prepares the complete NKF repository for standard Apache-2.0 licensing without changing public visibility by implication.
created_at: 2026-08-13T19:06:57Z
---

# NKF 0.6 Corrective Release And Open-Source Licensing

## Design Kind Problem And Scope

This is a Technology contract, authoring, release, compatibility, distribution,
and repository-licensing Design under
[NKF-027](../../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md).
It proposes one NKF 0.6 successor to the immutable published NKF 0.5 set.

The published 0.5 adopter cannot re-pin a normally serialized native record
whose `source` mapping contains the required `stable_path` between `path` and
`digest`. The command reports `repinned` with zero updates while the record
remains invalid. `linkify` and Task transitions depend on the same mutation
mechanic. The defect was found only when the NKF producer performed its first
ordinary post-adoption record edit. The existing prepublication exercise had
proven migration, repeat-current behavior, archive integrity, and the producer
gate, but not the complete ordinary authoring lifecycle after candidate-bound
adoption.

The repository also lacks an open-source license and distributes bundled
third-party code without a release-carried license or notice set. Its live
repository identity has moved to `NourdApS/Nourd.NKF`, while frozen authority,
historical provenance, current executable behavior, and mutable documentation
do not all permit the same reference treatment.

This Design addresses those connected 0.6 release-readiness failures. It does
not add deferred NKF Product capabilities, change another Nourd repository,
make the repository public, or define trademark or community policy.

## Governing Inputs And Constraints

[ADR 0096](../../decisions/0096-deterministic-governed-mechanics.md) requires
closed deterministic mechanics without transferring semantic authority to a
command. [ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
freezes every published version set and requires exact-candidate adoption and
independent audit before publication. The new evidence shows that the required
prepublication proof must cover ordinary authoring behavior, not only the
initial adoption transaction and final gate.

[ADR 0042](../../decisions/0042-release-distribution.md) establishes one
content-addressed release integrity unit and keeps repository state distinct
from NKF meaning. The Human Product Owner has now confirmed the standard,
unmodified Apache License 2.0, SPDX identifier `Apache-2.0`, complete NKF
repository coverage, the exact informational NOTICE attribution, third-party
rights preservation, and the current `NourdApS/Nourd.NKF` identity. The same
direction explicitly separates licensing, visibility, publication, release,
acceptance, Realization confirmation, conformance, and Governing Use.

The source-grounded
[licensing assessment](../../evidence/audits/nkf-027-open-source-licensing-preparation-assessment.md)
finds only permissively licensed locked dependencies, but it also finds that
the built checker and adopter strip legal comments and the current archives
carry no license or third-party notices. It identifies no external Git author,
submodule, tracked vendor tree, or unexplained third-party source snapshot.
Repository history alone still cannot prove Company-side employment,
assignment, or imported-source rights; that legal authority remains an
external Company fact rather than something NKF validation can manufacture.

Accepted records, frozen Schemas and contracts, historical Evidence, and
published archives remain immutable. Current behavior must be expressed by
successor authority, implementation, and Realization records. The existing
single Task branch and pull request remain the only integration boundary, and
no commit, push, merge, release publication, recommendation promotion, or
visibility change is authorized by this Design.

## Proposed Direction

NKF 0.6 is one complete successor version combining four inseparable release
readiness corrections:

1. structural, verified mutation of native declarations;
2. complete ordinary-authoring rehearsal before publication;
3. standard Apache-2.0 repository and release preparation with compatible
   third-party notices; and
4. current repository-identity and distribution behavior that preserves
   historically correct predecessor references.

The 0.6 normative Markdown and executable companion define the exact rules.
Derived Schemas, checker, adopter, fixtures, tests, integrations, public docs,
license artifacts, notices, and release metadata implement that authority and
join the complete versioned set where the release contract allocates them.

### Structural Governed Mutation

Every command that updates a native YAML declaration parses the complete safe
YAML document and resolves the target through the accepted closed declaration
shape. It must not locate a value through adjacency-sensitive regular
expressions, key order, indentation, or surrounding formatting assumptions.

For a scalar digest update, the implementation identifies exactly one
semantically valid target field, replaces only that scalar token or its exact
source range, and preserves every unrelated source byte. A missing, duplicate,
ambiguous, aliased, tagged, structurally invalid, or unsupported target fails
before mutation. Whole-document reserialization is forbidden for an ordinary
re-pin because it would create unrelated canonical-source changes.

The structural rule applies consistently to records, document declarations,
governed artifacts, pins, and every command that delegates to those mutation
functions. Adding a later permitted sibling key cannot make a conforming
declaration invisible to the mutator.

### Truthful Mutation Results And Transactions

Every deterministic mutation declares exact preconditions, owned targets,
expected changes, postconditions, rollback scope, and result vocabulary. A
success result means every required target now has the exact intended value
and the applicable validation chain passes. Process completion alone is not
success.

`repinned` with zero changed subjects is valid only when the inspected initial
state already had no applicable digest mismatch. If an applicable mismatch
exists and zero targets change, the command fails. If a command changes some
targets but any required postcondition or validation fails, it restores the
complete owned pre-mutation snapshot and reports the actual failed stage.

Repeat execution after a successful transaction returns the command's exact
current or no-change state and changes no governed byte. Injected write,
validation, or Git-step failures prove rollback independently. Commands do not
claim acceptance, semantic correctness, release readiness, or Task truth.

### Command And Subject Coverage

The authority pair carries one closed command-by-subject capability matrix.
For each supported command it identifies every applicable record, Task,
document, artifact, pin, index, receipt, baseline, and generated-view subject;
the mutation owner; the required semantic input; the postcondition; and the
failure or no-change result.

At minimum the matrix covers `repin`, `linkify`, Task lifecycle transitions,
reference export, set enumeration, migration, onboarding and update through
the public Adopt operation, freshness impact and whole-root evaluation, and
license-set verification. A shipped command cannot rely on an unlisted subject
mutation. A subject outside the matrix is unsupported and fails closed rather
than being edited heuristically.

### Prepublication Producer Rehearsal

Before any 0.6 archive can be technically confirmed or published, the exact
candidate archive is adopted into an isolated fresh copy of the exact
candidate source repository. That candidate-bound operation is not ordinary
public adoption and does not change the live producer.

The isolated adopted producer must then prove, against the exact archive and
candidate source commit:

1. migration from every supported predecessor and repeat `current` behavior;
2. the complete host producer gate from clean dependencies;
3. native record, Task/document, governed-artifact, pin, and generated-view
   edits followed by their supported re-pin or regeneration command;
4. `linkify`, every Task lifecycle transition, reference export, and complete
   set enumeration;
5. current-system Realization editing and re-pinning;
6. deterministic impact evaluation, review receipt, whole-root recovery, and
   freshness-baseline replacement where applicable;
7. no-change idempotence, injected rollback, incompatible input, and tamper
   rejection; and
8. byte-identical rebuild and archive reproduction.

Every temporary semantic input must be explicit and reviewable. The exercise
may use disposable source changes, but it must restore or discard the isolated
copy and cannot change candidate bytes. A fresh independent audit repeats or
independently verifies the high-risk claims. Any candidate or archive byte
change invalidates all earlier exercise, audit, and technical-confirmation
evidence.

Only after that proof and audit may a separately authorized act publish the
exact passing bytes. Postpublication producer adoption then proves public
distribution, recommendation, acquisition, installed byte identity, repeat
current behavior, and live integration. It is never the first functional test
of a shipped authoring command.

### Apache-2.0 Repository And Release Preparation

The repository root carries the standard, unmodified Apache License 2.0 text
in `LICENSE` and the exact Human-Product-Owner-approved informational text in
`NOTICE`. The NOTICE adds no restriction and remains separate from third-party
license material.

One deterministic `THIRD_PARTY_NOTICES.md` inventories every package and data
source actually copied into the distributed checker or adopter, including
applicable MIT, BSD, ISC, and Unicode-derived-data terms. It preserves each
component's own copyright, permission, attribution, and disclaimer text.
Candidate verification derives the actual bundle input graph and fails if the
notice inventory is incomplete, stale, or claims a component not present.

Package metadata declares `Apache-2.0` and the current repository, homepage,
and issue locations while retaining `private: true` until package-registry
publication is separately authorized. Root license, NOTICE, third-party
notices, and their exact source bindings are complete-set release members.
Earlier archives are not rewritten.

No blanket source-header insertion occurs. It would mutate immutable records,
strict data, generated artifacts, and exact historical evidence. Any later
prospective header policy must define eligible mutable Nourd-owned,
comment-capable source classes and exclusions separately. Apache licensing of
the repository does not relicense identified third-party material.

### Repository Identity And Distribution Compatibility

Every `kaveh6202/Nourd.NKF` occurrence is classified as immutable historical
provenance, frozen-version behavior, current repository identity, current
executable distribution or adoption behavior, or stale mutable documentation.
The first two classes retain their exact bytes. New 0.6 source, manifests,
workflows, tests, public guidance, package metadata, release URLs, and adopter
behavior use `NourdApS/Nourd.NKF` when they describe the current repository.
An immutable confirmed Realization that names the predecessor repository is
preserved and superseded by a new current Realization rather than edited.

The 0.6 adopter accepts the current repository identity and treats the
supported predecessor identity only through explicit versioned compatibility
or redirect evidence; it never silently rewrites unrelated repository
authorities. Private authenticated acquisition at the current organization is
tested because that is the present release channel. Public unauthenticated
acquisition, token removal, Github visibility, npm publication, and licensing
of the separate public-docs repository remain separate future decisions.

### Compatibility And Versioning

NKF 0.6 is a full version because it changes the complete release set and
contracted release procedure after 0.5 publication. It is intended as a
non-breaking successor for conforming 0.5 consumers: it repairs implementation
mechanics, strengthens producer proof, adds licensing artifacts and metadata,
and updates current repository locators without changing canonical governed
meaning. That classification is not final until exact fixtures and real-host
migrations prove that a valid 0.5 repository can Adopt 0.6 without human
semantic conversion or knowledge loss.

If evidence shows a required consumer declaration, authority, meaning, or
manual approval change, the compatibility class must change before acceptance
and publication. The adopter reports and enforces the final class explicitly.
No 0.5 byte is replaced in place.

### Separate Public-Project Policies

Apache-2.0 does not decide trademark permission, contribution governance,
security response, project governance, or community conduct. `TRADEMARKS.md`
is recommended before public forks and must receive Human Product Owner
confirmation for its exact nominative-use, logo, fork-naming, compatibility,
enforcement, and contact terms. It remains separate from the Apache license.

`SECURITY.md` is strongly recommended before public visibility;
`CONTRIBUTING.md` is recommended before external contributions;
`GOVERNANCE.md` is needed before claiming community governance; and a Code of
Conduct is recommended when community interaction is enabled. Their exact
reporting channels, authority, process, DCO or CLA choice, scope, and
enforcement terms are not decided here. Their absence is reported separately
and may not be hidden by a generic open-source-readiness claim.

## Responsibilities Interactions And Information Flows

The Specification owns mutation semantics, compatibility, complete-set
membership, release-proof ordering, licensing representation, and claim
boundaries. The executable companion closes every shape and procedure. Derived
Schemas validate declarations and results. The checker validates conformance,
license-set completeness, source bindings, and reported postconditions. The
adopter owns verified acquisition, migration, structural mutations,
transactions, rollback, and truthful command results.

The source repository supplies Nourd-authored files and immutable provenance.
Package locks and the exact esbuild graph supply third-party component facts.
Third-party licenses remain authoritative for their own material. Nourd ApS
owns its Company rights and licensing authorization; NKF can record an
assertion or external observation but cannot prove employment, assignment, or
legal title.

The release builder consumes only accepted authority, derived implementation,
complete licensing artifacts, exact source bytes, and clean proof inputs. The
candidate exercise consumes but cannot change the archive. Independent audit
supplies technical evidence but not Product acceptance. A technical Decision
may accept or confirm exact derived bytes only under the recorded delegation.
Github owns visibility, release objects, authentication, redirects, and asset
delivery as external operational state.

## Alternatives And Trade-Offs

### Patch The Published 0.5 Adopter

Rejected. Publication froze the complete 0.5 set. Replacing the adopter under
the same version or archive identity would destroy content-addressed trust and
contradict [ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md).

### Keep Regex Repinning And Add Stable Path

Rejected. One broader regular expression would repair the observed layout but
retain the root defect: a semantic YAML update would still depend on key order
and formatting. Structural parsing with exact source-range replacement is the
bounded durable correction.

### Rely On The Final Producer Gate

Rejected. The 0.5 producer gate passed while ordinary post-adoption authoring
was never exercised. A validator proves the state it receives; it does not
prove that every command can create or maintain that state.

### Publish Then Self-Adopt And Withdraw If Broken

Rejected. Withdrawal protects later recommendations but cannot unpublish or
repair frozen defective bytes. Functional producer rehearsal belongs before
publication; postpublication adoption proves distribution facts.

### Use A Custom NKF License Or Put Restrictions In Notice

Rejected by Human direction. The repository uses unmodified Apache-2.0.
Trademark and false-endorsement controls belong in a separate confirmed policy
and cannot alter the open-source grant through NOTICE wording.

### Add Headers To Every File

Rejected for this version. It would rewrite immutable authority and Evidence,
break strict or generated formats, and create unnecessary review churn. Root
license and notice artifacts plus exact package metadata establish the
repository-wide grant while preserving history and third-party terms.

### Globally Replace The Old Repository Name

Rejected. Many occurrences are exact historical provenance or frozen-version
behavior. Classification plus successor records preserves truth while current
0.6 behavior moves to the organization identity.

## Failure Safety Recovery And Operations

All mutations stage into a temporary owned copy, validate exact postconditions,
and replace live targets only after success. Failure restores the complete
owned snapshot. The tooling never infers semantic content, acceptance,
licensing rights, repository authority, or lifecycle meaning from a successful
write.

An incomplete third-party inventory, unbound license byte, missing exact
NOTICE, stale component list, unresolved source right, incorrect repository
locator, failed private acquisition, unexercised matrix cell, candidate drift,
or non-reproducible archive blocks technical confirmation. It does not trigger
automatic visibility, publication, recommendation, or rollback of historical
releases.

The last known good recommendation remains available until a deliberate
promotion transaction. A bad published version remains immutable and can be
marked no longer recommended or superseded; it is never overwritten. Local
worktree, remote branch, Github visibility, publication, licensing readiness,
acceptance, Realization confirmation, conformance, readiness, and Governing
Use are reported independently.

## Validation And Decision Evidence

An informed adoption Decision requires:

- an exact 0.6 Markdown, executable companion, policy, and derived-Schema
  audit with source-digest symmetry and no new Product meaning;
- a complete command-by-subject matrix and focused unit, integration,
  adversarial, rollback, and idempotence coverage;
- proof that the structural mutator handles required and permuted sibling keys
  while preserving unrelated bytes;
- exact 0.5 fixture and real-host compatibility results;
- a re-run licensing and authorship inventory against the final source and
  bundle graphs;
- exact comparison of root `LICENSE` with the standard Apache 2.0 text, exact
  comparison of `NOTICE` with the confirmed attribution, and complete
  third-party notice verification;
- classification of every old-repository occurrence and proof that preserved
  immutable bytes did not change;
- two byte-identical builds and archives from fresh dependencies;
- the complete isolated producer rehearsal against the exact candidate;
- a fresh independent audit with no unresolved material finding; and
- separate reporting of legal-rights evidence, licensing readiness,
  acceptance, Realization confirmation, conformance, local and remote state,
  visibility, release publication, recommendation, and adoption.

Passing validation cannot accept this Design or authority pair. The Human
Product Owner remains source authority for the Product, licensing, trademark,
visibility, and community-policy boundaries. The delegated technical reviewer
may accept an exact technical derivation and later confirm exact implementation
only when it adds no Product meaning and all required evidence is clean.

## Unresolved Matters

The following remain deliberately unresolved outside the confirmed 0.6
technical direction:

- the external legal document or Company record, if any, used to evidence
  Nourd ApS ownership or licensing authority beyond the Human Product Owner's
  repository direction;
- exact future `TRADEMARKS.md`, `SECURITY.md`, `CONTRIBUTING.md`,
  `GOVERNANCE.md`, and Code of Conduct terms;
- whether and when Github visibility becomes public;
- public unauthenticated distribution and package-registry publication;
- licensing or transfer of the separate public-documentation repository;
- any prospective per-file SPDX-header policy; and
- every deferred NKF Product capability outside the corrective 0.6 scope.

These matters cannot silently enter implementation. A material change to the
confirmed boundary requires Human Product Owner direction and its own governed
record before work begins.
