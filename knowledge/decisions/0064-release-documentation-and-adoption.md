---
id: adr-0064
type: decision
title: "ADR 0064: Release Documentation And Adoption"
summary: Adopt the exact NKF-008 direction for a fixed native release archive, separate public documentation projection, self-contained pinned adopter, and authorized self-host consumer exercise.
created_at: 2026-07-31T02:08:43Z
record_lifecycle: immutable
record_status: accepted
task: NKF-008
---

# ADR 0064: Release Documentation And Adoption

- **Status:** Accepted
- **Task:** `NKF-008`
- **Decision Authority:** Codex technical reviewer under the Human Product
  Owner's explicit delegation to complete and independently audit NKF-008
- **Review Evidence:**
  `knowledge/evidence/audits/nkf-008-release-documentation-and-adoption-design-audit.md`

## Context And Problem

NKF 0.1 has an accepted native release contract and a confirmed current
checker. The published private prerelease is stale, however. A consumer has no
one-operation installation path, and a user without private repository access
has no complete public explanation.

NKF-008 requires a current internal publication, an immutable consumer pin,
public documentation, Product and Technology examples, and an authorized
consumer exercise without allowing those derived surfaces to compete with
normative authority.

## Decision

NKF adopts the direction proposed by this exact Design revision:

| Design | SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/release-documentation-and-adoption.md` | `2ce1dc49a3439fd52200eb07cf9169d1094fbc08d888f191a931db31434dda59` |

The adopted boundaries are:

1. the native content-addressed release archive retains exactly its accepted
   eight files;
2. the current internal release is a private Github prerelease addressed and
   trusted by its full archive SHA-256;
3. `release/recommended.json` records one deliberate recommendation but does
   not become a moving consumer dependency;
4. reviewed source under `public-docs/` is projected to the dedicated public
   `kaveh6202/Nourd.NKF.Docs` repository through an allowlist;
5. public documentation includes an exact digest-bound normative Markdown
   mirror but remains explanatory except for those unaltered mirrored bytes;
6. a public-safe bundled adopter verifies the private release and installs the
   pin, AI-neutral authoring guidance, portable skills, host adapters,
   integration verifier, local command, and continuous-integration workflow
   in one deliberate operation;
7. consumers select Product or Technology through their existing concrete
   Root Profile and cannot select General;
8. install, no-update, update, rollback, and every check require explicit full
   digests and never follow a moving branch or `latest`;
9. the NKF repository exercises the complete path as the already authorized
   first governed consumer using only synthetic consumer knowledge; and
10. protected merge enforcement remains deferred to NKF-012.

## Scope And Applicability

This Decision governs NKF's release, documentation, and adoption
Realizations. It applies to the current internal-use boundary and to
deliberately authorized Nourd Product and Technology repositories.

It does not revise the NKF 0.1 Specification, executable YAML, Schemas,
release-manifest identity, archive layout, conformance meaning, or authority
hierarchy.

## Rationale

Separating the native archive, public explanation, and consumer integration
preserves three different responsibilities:

- the archive distributes the exact accepted and confirmed NKF contract and
  checker;
- public documentation explains that contract without exposing the private
  development repository; and
- the adopter installs a verified release and mutable repository conventions
  without making those conventions native format meaning.

A full content digest provides the immutable trust anchor. An allowlisted
projection minimizes the public information surface. A self-contained adopter
removes manual assembly while fail-closed conflict handling preserves each
consumer's authority.

## Alternatives Considered

Adding installer files to the native archive was rejected because it would
silently change the accepted exact archive contract.

Making the complete NKF repository public was rejected because documentation
does not require public internal Tasks, Evidence, checker source, or
operations.

Publishing only simplified guides was rejected because public users need an
exact normative conflict-resolution route.

Using a moving release, branch, or mutable latest locator was rejected because
it would change consumer dependencies without deliberate migration.

An NPM package and a generated documentation website were deferred because
they add registries, deployment systems, and provenance surfaces that the
current internal-use scope does not require.

## Consequences And Trade-Offs

NKF gains a release catalog, adopter, public-doc source and verifier,
publication tooling, consumer exercise, and a separate public repository.

The public repository is deliberately a projection. Updates require a private
source commit, a generated publication binding, a public commit, and remote
verification. That is more work than directly editing public pages, but it
prevents public prose from drifting into an independent authority.

Existing consumer instructions are preserved. Conflicts may require a human
to reconcile an installation rather than allowing the adopter to overwrite
project policy.

The synthetic self-host exercise proves the distributed path but is not an
external Agent SDK migration.

## Compatibility

The adopter supports native NKF 0.1 Product and Technology bundles under
Node.js 22 or later. Historical external structures are migration inputs, not
parallel supported contracts.

Every later release or adopter change is deliberate and content-addressed.
An existing consumer remains pinned until its authority approves and executes
an update.

## Realization Requirements

Realization requires:

1. a separately confirmed current release-bound checker;
2. current release configuration and deterministic build verification;
3. the tested self-contained adopter and all integration templates;
4. complete public documentation and deterministic publication verification;
5. an independently verified and published private prerelease;
6. a published and remotely verified public documentation repository;
7. a local and Github consumer exercise with negative cases and no-update
   proof;
8. separate Evidence for release, documentation, consumer, and workflow state;
9. complete current Realization mappings and governed-artifact bindings;
10. a final adversarial NKF-008 completion audit; and
11. a later Decision confirming the exact successor Realization and Task
   completion.

## Non-Claims

This Decision does not:

- confirm that any proposed artifact or remote publication exists;
- publish a release or public repository;
- make the private checker publicly available;
- accept or conform consumer knowledge;
- migrate Agent SDK or any external repository;
- activate a required check, pull-request approval, bypass policy, or
  protected merge gate;
- make explanatory documentation normative;
- make a release recommendation a mutable consumer dependency; or
- complete NKF-008.
