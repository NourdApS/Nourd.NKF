# NKF-017 Realization Impact Inventory

## Inventory Identity

- **Observed At:** `2026-07-31T21:59:32Z`
- **Owning Task:** `NKF-017`
- **Design Input:** `design-nkf-017-complete-portable-onboarding-topology`
- **Effect:** Read-only implementation planning Evidence; it does not adopt
  the Design or authorize a Specification or implementation change

## Scope

This inventory identifies the exact repository surfaces that must move
together if the Human Product Owner adopts the Active portable-topology
Design. It was produced before implementation so a narrow generator change
cannot appear complete while contracts, checking, distribution, self-hosting,
or migration remain stale.

## Authority And Contract Surfaces

| Surface | Current State | Required Successor Work |
| --- | --- | --- |
| `knowledge/specifications/nkf-0.1.md` | Populated-only directories are recommended; no portable topology contract | Replace that rule with the accepted topology, navigation, placement, enforcement, map, and migration semantics |
| `contracts/nkf/0.1/nkf.yaml` | No executable portable-topology module or diagnostics | Derive the exact Common path set, representation rules, profile additions, index checks, and diagnostics |
| `knowledge/decisions/` | ADR 0053 is NKF-local; ADRs 0067 and 0069 govern predecessor onboarding | Add one immutable adoption Decision binding the exact Design and authority-pair revision without rewriting predecessors |
| Core JSON Schemas | Shapes remain usable but all four Schemas bind the predecessor Markdown and executable digests | Rebind source metadata, recalculate digests, and audit whether any shape change is actually required |
| `src/checker/bindings.ts` | Pins the predecessor Markdown, executable, and three runtime Schema digests | Bind only the accepted successor authority and Schema revisions |
| Release configuration | Pins ADR 0065, predecessor checker, authority, and all four Schema digests | Remain unchanged until a separately confirmed successor checker and release are available |

No bundle field or topology sub-version is needed. The topology is derived
from Common and the selected Root Profile, so the current closed bundle shape
can remain intact unless implementation evidence proves otherwise.

## Checker Surfaces

The project phase in `src/checker/checker.ts` already resolves the knowledge
root, discovers all Markdown, resolves every record and non-record path, and
parses frontmatter. It is the correct phase for required-path, representation,
placement, and map checks.

The current Markdown model in `src/checker/markdown.ts` exposes frontmatter and
headings but not links or managed HTML-block boundaries. It must be extended
to expose exact relative link targets and the one `nkf-navigation` managed
block without treating code, raw examples, or unrelated prose as navigation.

Required new deterministic checks include:

- missing or unsafe portable paths;
- wrong non-record kind for an index;
- wrong current-system record type or multiplicity;
- Task path or index mismatch with explicit `task_status`;
- Design path or index mismatch with explicit `design_disposition`;
- Decision, Specification, and current Realization placement or navigation
  mismatch;
- missing, duplicate, malformed, or ambiguous managed map block;
- missing, duplicate, escaping, or wrong-target map links; and
- a receipt-identified predecessor map that remains a competing generated map
  after repair.

Every diagnostic must be declared first in the accepted Markdown and
executable contract. The implementation must not infer lifecycle state from
paths or make prose adequacy a deterministic claim.

## Onboarding And Migration Surfaces

`scripts/onboarding/core.mjs` currently:

- allocates `README.md` through `unusedPath`, which produces `README-2.md` on
  collision;
- makes the map, root, current-system Realization, Task, and Technology
  Specification selectable scaffold paths;
- rejects any collision between a generated scaffold path and an existing
  Markdown candidate;
- generates only five possible knowledge files; and
- declares only the map and onboarding Task as generated non-records.

The successor must fix `README.md` as the canonical map, reconcile an existing
candidate instead of treating it as a collision, generate the complete index
set, classify `evidence/README.md` as Evidence, and include every generated
index in the bundle. Root, Task, Realization, and Technology Specification
collision handling remains fail-closed or plan-resolved as accepted.

`scripts/adoption/nourd-nkf-adopt.mjs` currently recognizes only inspect,
seal, onboard, install, update, check, status, and integration-check. Its
onboarding receipt has created, changed, and preserved paths but no removed
paths or repair lineage. The successor requires an explicit topology repair
command, a sealed repair candidate, predecessor and successor release
bindings, safe removal rules, removed-path receipt data, complete staging,
rollback, and same-repair `no-update` behavior.

The built adopter, public adopter, source verifier, onboarding protocol,
portable skills, consumer integration, and command help must remain derived
and synchronized.

## Fixture And Test Surfaces

Both current valid fixtures are predecessor-minimal. They lack the portable
Task and Design state indexes, lifecycle indexes, `realizations/current/`
index, canonical managed map block, and canonical placement of their current
Task and Realization sources. The public Product and Technology examples are
rebuilt from those fixtures and therefore inherit the same gap.

Required focused coverage belongs primarily in:

- `test/project-source.test.ts` for path, representation, map, link, and
  placement diagnostics;
- `test/checker.test.ts` for frontmatter-driven Task and Design index
  agreement and non-authority boundaries;
- `test/dynamic-root.test.ts` for Product and Technology profile behavior;
- `test/adopter.test.ts` for new and existing maps, full scaffold generation,
  partial topology, repair, removal provenance, rollback, drift, and
  idempotence;
- `test/self-hosting.test.ts` for NKF's own successor topology;
- `test/public-docs.test.ts` for the full public projection and both complete
  examples;
- `test/authority.test.ts` and `test/contracts.test.ts` for the accepted
  successor authority pair and Schema bindings; and
- release tests for the later confirmed successor package.

The existing 136 tests establish predecessor behavior only. They do not cover
the proposed topology and cannot prove NKF-017 completion without expansion.

## Self-Hosting Gap

The NKF repository already has its top-level Task, Design, Decision,
Specification, Realization, and Evidence indexes. It currently lacks:

- `tasks/active/README.md`;
- `tasks/deferred/README.md`;
- `tasks/completed/README.md`;
- all five Design-disposition `README.md` files;
- `realizations/current/README.md`; and
- the proposed managed navigation block in `knowledge/README.md`.

The rejected and withdrawn Design directories do not currently exist because
Git has no file to retain there. NKF therefore needs a deliberate self-hosted
migration even though its existing organization inspired the user-visible
expectation.

The migration also has to update `.nourd/knowledge/bundle.yaml`, current
Realizations, governed-artifact digests, knowledge indexes, and the latest
validation result through the normal check. Directory creation by itself is
not sufficient Evidence.

## Public Documentation And Consumer Experience

`scripts/build-public-docs.mjs` mirrors the Specification, adopter,
pre-adoption protocol, portable skills, and both fixtures. The fixed allowlist
in `scripts/verify-public-docs.mjs` will reject the added example indexes until
it is deliberately updated.

Public documentation must explain:

- the complete created tree;
- why index presence is not semantic authority;
- how Task and Design state stays synchronized;
- how an existing `README.md` is preserved and receives one managed block;
- how predecessor repair differs from onboarding and ordinary release update;
- why Category 2 confirmation is not repeated during trusted repair; and
- why an installed predecessor remains valid under its bound release until
  deliberate migration.

The consumer exercise must cover Empty and Tiny Product and Technology
repositories, an existing map, a partial tree, and a trusted minimal-predecessor
repair. A user should not need the NKF source repository after acquiring the
published skill and adopter.

## Release And Compatibility Boundary

The current recommended release and ADR 0065-confirmed checker must not be
mutated or described as realizing NKF-017. A new checker build changes the
checker digest; an authority-pair change alters all source bindings and release
inputs. The successor therefore requires:

1. accepted Design and Specification authority;
2. derived contract, Schema, checker, adopter, fixtures, and documentation;
3. exact local validation and independent whole-project audit;
4. a separate Realization confirmation Decision binding exact revisions and
   checker digest;
5. reproducible packaging and release verification; and
6. deliberate recommendation and consumer migration.

This preserves pre-stable evolution without silently changing the meaning of
the already published content-addressed predecessor.

## Inventory Conclusion

The proposal is technically realizable with the current architecture, but it
is a repository-wide successor rather than a small scaffold patch. The
checker needs link-aware Markdown parsing, the adopter needs a distinct repair
transaction, all fixtures and public examples need the full topology, and NKF
must migrate its own self-hosted bundle.

No additional semantic decision was discovered beyond the five boundaries
already exposed by the Active Design. Implementation remains correctly gated
on Human Product Owner adoption of those semantics.
