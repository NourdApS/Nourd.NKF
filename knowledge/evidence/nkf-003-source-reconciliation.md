# NKF-003 source authority and compatibility reconciliation

- **Task:** `NKF-003`
- **Status:** Evidence
- **Reviewed:** 29 July 2026
- **Reviewer:** AI assistant; not an acceptance authority
- **Authority effect:** None

## Purpose

This record establishes the evidence basis for migrating NKF from Nourd
Studio into its independent Shared Technology authority. It distinguishes
accepted source meaning from later proposals, implementation choices,
consumer evidence, and unresolved gaps.

This record does not accept, reject, amend, or supersede NKF meaning. Checker
code, schemas, tests, Git state, and this reconciliation cannot provide Human
Product Owner acceptance.

## Source sets

| Source set | Declared source | Local contents | Authority classification |
| --- | --- | --- | --- |
| Accepted NKF 0.1 | `kaveh6202/Nourd.Studio@13a82fbc1b72c1350e9765f59d1538c375f3fa69` | Accepted specification, ADR 0012, and their governed declarations | Immutable accepted Product-format provenance |
| NKF-002 checker | `kaveh6202/Nourd.Studio@06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1` | Task plan, amended specification proposal, declarations, schemas, TypeScript implementation, tests, and package integration | Immutable proposal and implementation evidence |

## Provenance verification

### Accepted snapshot

All four files declared by the accepted snapshot manifest are present. Their
current SHA-256 digests exactly match the manifest:

| Source-relative path | Verified SHA-256 |
| --- | --- |
| `knowledge/designs/nkf-0.1.md` | `77869d6f6cfe2ba8086e4eeba28fc5e545aa2c1896b9a28488b6d53b1b03bc5a` |
| `knowledge/decisions/0012-initial-knowledge-declaration-contracts.md` | `7855c4c9ff603ab658e19f0f0d47e27d7d882ba0be057ed9b2e76d310895a60b` |
| `.nourd/knowledge/records/design-nkf-0-1.yaml` | `0d4a465f29ee13888bed61cb22c96e64bd826e2b5152593511b4ac3ede4c020d` |
| `.nourd/knowledge/records/adr-0012.yaml` | `a60c9de20bfe373d5a53645254290c821fa0ebeee5e3ebf8801897c59564cf04` |

### Checker snapshot

The checker snapshot contains exactly the 22 source-relative files declared
by its manifest, excluding the local snapshot `README.md`. Its amended
specification digest is
`1719d2521057c9b0b44b059ea9cd7fb3c1588fe102d6097de2c9360636a87989`.
Its governed declaration binds that exact digest.

The manifest records one source archive digest,
`d0685b80f7ac8d846948ff5a7b51e0ac44d14fd0797587d1a036d918cf6eb069`,
but does not preserve that archive or per-file source digests. The local
22-file set is internally complete; the recorded archive digest cannot be
reproduced from the current evidence alone.

### External source reachability

On 29 July 2026, GitHub access to the declared private repository
`kaveh6202/Nourd.Studio` succeeded, but the following source identities were
not reachable through the repository's commit API:

- accepted commit `13a82fbc1b72c1350e9765f59d1538c375f3fa69`;
- checker commit `06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1`; and
- checker parent `7dafdb08095c4b2570fcbe6fe48d1f11c80c0486`.

The repository currently exposes a different reachable history headed by
commit `abd1c6553ecd0edf3324f946c32b08094f678184`. Therefore:

- local byte integrity for the accepted four-file snapshot is verified;
- local completeness of the declared checker file set is verified;
- source-repository commit provenance is recorded but not independently
  verified from the current remote; and
- the checker archive digest remains unverified.

This does not invalidate the preserved bytes, but it prevents claiming that
the current GitHub repository independently proves their original commit
membership. Before final authority handover, NKF-003 requires either reachable
source objects, a preserved source archive matching the recorded digest, or a
Human Product Owner decision accepting the limited provenance basis.

## Accepted baseline

The exact accepted NKF 0.1 source defines a Product-only format. Its accepted
meaning includes:

- Markdown as canonical human Product meaning and YAML as its exact,
  source-bound declaration;
- stable bundle, record, section, and semantic-entity identity;
- complete semantic section mapping and separate section authority and role;
- ten Product record types and their prose body responsibilities;
- typed relationships, provenance roles, external-authority separation,
  semantic entities, durable Realization bindings, and operational-state
  separation;
- exact contract dispatch, fail-closed required-extension handling, and
  structural, contract, and full-bundle conformance;
- a Nourd repository profile; and
- a strict separation between conformance and human acceptance.

The accepted specification does not yet define Shared Technology meaning.
It also deliberately leaves some realization details open, including exact
acceptance-provenance fields and a universal distribution boundary.

## Exact specification delta

The later NKF-002 specification changes the accepted Markdown in one material
area only:

1. body-contract responsibilities receive stable machine-readable
   identifiers;
2. declaration sections may bind to one or more identifiers through a
   `responsibilities` collection;
3. every required responsibility must be bound by at least one source
   section;
4. identifiers are owned and versioned by the body contract rather than
   inferred from headings, section IDs, roles, paths, or model
   classification; and
5. the minimal Product example receives the seven corresponding bindings.

The accepted declaration's source digest is changed only because of that
specification amendment. Its governance status remains `accepted`, but this
copied status cannot accept the later bytes. The exact amendment is therefore
a proposal awaiting explicit acceptance in this repository.

## Checker-work classification

| Material | Classification | Migration disposition |
| --- | --- | --- |
| Accepted NKF 0.1 bytes | Accepted Product-format baseline | Preserve exactly; derive future normative records only through governed decisions |
| Stable responsibility IDs and section bindings | Later specification proposal | Present as a separate format boundary for Human Product Owner confirmation |
| `nkf.bundle/v1`, `nkf.record/v1`, and ten body-contract schemas | Executable contract proposal | Reconcile against accepted meaning after the responsibility boundary is decided |
| Exact legacy-versus-NKF dispatch | Authorized implementation direction; not normative acceptance | Retain as evidence and reassess package placement |
| Parsing, hashing, Markdown resolution, containment, reconciliation, and diagnostics | Reusable implementation mechanics | May be reused without treating their current API or layout as normative |
| Git-backed accepted-base comparison | Nourd repository-profile implementation proposal | Keep outside universal core unless separately accepted |
| `required_extensions` field and extension dispatch | Gap-filling implementation proposal | Requires an explicit contract-ownership and version-resolution decision |
| Acceptance provenance field shapes | Consumer and implementation proposal | Do not standardize from Studio or Shredwise by implication |
| Secret scanning and security diagnostics | Checker policy proposal | Distinguish format conformance from distribution or repository policy |
| TypeScript package layout and portable build | Temporary distribution implementation | Does not determine canonical NKF package or release architecture |
| Shredwise validation and its reported 92 missing-responsibility errors | Consumer-specific operational evidence | Does not accept NKF contracts or alter Shredwise meaning |
| Passing typecheck and 26-test claim | Imported implementation-result claim | Not reproduced in this reconciliation slice |

## Material unresolved boundaries

The source reconciliation leaves these decisions open:

1. how deterministic conformance reports binding completeness without falsely
   claiming that a checker proved semantic adequacy of the bound Markdown;
2. the exact Product contract realization under the independent NKF
   authority;
3. the universal distribution boundary and path-resolution base;
4. required-extension declaration, ownership, version resolution, and
   unsupported-result semantics;
5. exact acceptance-provenance fields and their contract ownership;
6. checker package ownership, integrity, release, and compatibility policy;
7. Nourd Agent SDK conformance and consumer pinning; and
8. the final treatment of source commits that are not reachable from the
    declared remote.

## First decision boundary

The first consequential boundary should be the responsibility mechanism,
because the proposed executable body contracts depend on it.

A precise option for informed confirmation is:

> NKF core defines the generic ability for a versioned body contract to own
> stable responsibility identifiers and for a declaration section to bind to
> them. Each body contract owns its responsibility vocabulary and required
> set. Deterministic conformance may verify that identifiers are supported,
> bindings resolve to declared source sections, and every required identifier
> is bound. It must not claim that this alone proves the semantic adequacy,
> truth, or acceptance of the Markdown.

The Human Product Owner accepted this boundary on 29 July 2026. It is recorded
as
[`ADR 0002`](../decisions/0002-establish-body-responsibility-bindings.md).
That Decision accepts the generic mechanism and its conformance limit, not the
exact Product responsibility vocabularies, serialization, or checker
implementation.

## Checker snapshot file digests

These digests identify the locally preserved 22-file checker evidence set.
They do not replace the unverified source archive digest.

| Source-relative path | Local SHA-256 |
| --- | --- |
| `.nourd/knowledge/records/design-nkf-0-1.yaml` | `01bad61a35c8f15dac956a719e55f1febe0f987f543ac88dd93ee0ee8ee1e022` |
| `.nourd/knowledge/records/design-nkf-002-nkf-0-1-conformance-checker.yaml` | `b5224b509702987decef484c8aca9707c343877fc09d0e6ad2e533eb9b5564ea` |
| `knowledge/designs/nkf-0.1.md` | `1719d2521057c9b0b44b059ea9cd7fb3c1588fe102d6097de2c9360636a87989` |
| `knowledge/designs/plans/nkf-002-nkf-0-1-conformance-checker.md` | `c49a9ff4c336aa9aeac1ab61dca8942b6673f21f0fe1a1ef5647b475da2e12c6` |
| `package-lock.json` | `1dc5db2ba11648c96e449c3bbe59b3623c256a4fe3cd6835eb4d8b1559f2e11e` |
| `package.json` | `758bdb2406e46f6c9084e4152214f33c48826ca1df11b88124e0f7749b6b9f31` |
| `src/core/knowledge/README.md` | `3e3d6281459a0991cdc0452604a945bc00378c3c7eec7e289bbe47beeb50db39` |
| `src/core/knowledge/contracts/nkf/0.1/bundle.schema.json` | `7a373d57d102fd0f73fa6def28af7d2beee9fc08e94a4be2b8c0eeb95b54fda7` |
| `src/core/knowledge/contracts/nkf/0.1/contract-set.json` | `34ef9a6dc78ea66958dedb7b281b2a92a005f2ad2731178969be909e0fa3b9f8` |
| `src/core/knowledge/contracts/nkf/0.1/record.schema.json` | `827007301a192f00d7225959fb92492f8cd1b0edf1ac992679d61dc8869e9d2e` |
| `src/core/knowledge/package.json` | `0ff61f6725327d8228e71c02b07a8644c9e0bf8ea10be15e0b49992df6485458` |
| `src/core/knowledge/scripts/build-portable.mjs` | `46f8a80f6d832f81c953739fc61239cd26bd9a1aaea55c1d2de30128b0d8b7db` |
| `src/core/knowledge/src/cli.ts` | `3970ce13aa8f696462ee5f1fd271947f60db1f57ed8600c8844d6cac9afa0346` |
| `src/core/knowledge/src/core.ts` | `c31ebfc42213dd71c954bfc8dc88d947039951bbd88f80890bdbbf8ba99f85c8` |
| `src/core/knowledge/src/markdown.ts` | `807c248674b26696e711c03cb9ec6793be7880d028c9618cc6c94c11141c8dcd` |
| `src/core/knowledge/src/nkf-types.ts` | `ba33d0cd5691644265446581a8e3dc5c18e04d3e58f04dae5e8c986e8231b061` |
| `src/core/knowledge/src/nkf.ts` | `fdea8744003a5cb16a07c8c9614015d674c78b4c55fc4119050b3042aecc547d` |
| `src/core/knowledge/src/types.ts` | `c7fa8dd100928bc59335d0cccbe8db78d5ad94d11681b5706d8ba47da29ca694` |
| `src/core/knowledge/test/core.test.ts` | `45b70e545972fd09707211aaf68ea395a126e22fef22a3516127081b2afb991d` |
| `src/core/knowledge/test/markdown.test.ts` | `78e34d32b5cbf106a32e0a1095738497f63f6140a86c49d8c8c96594aaf1e93b` |
| `src/core/knowledge/test/nkf.test.ts` | `2ed189f4fa0ba9d3b0ed98bb854be2b6bd911c3340f4e89f02bb0e5087c2c429` |
| `src/core/knowledge/tsconfig.json` | `5888d1386759a9dee35b8f86e140647a524c73772e13fd0b2d126b90e2b4f733` |
