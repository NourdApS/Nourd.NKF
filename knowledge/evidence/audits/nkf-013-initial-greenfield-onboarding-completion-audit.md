# NKF-013 Initial Greenfield Onboarding Completion Audit

- Observed Through: `2026-07-31T11:59:13Z`
- Audit Authority: Codex technical reviewer under the Human Product Owner's
  explicit delegation to implement, independently audit, confirm, commit, and
  push `NKF-013`
- Audit Effect: Evidence only; this document does not accept meaning, confirm
  a Realization, establish consumer authority, or supply conformance by itself

## Scope And Method

This audit independently reconciles the complete `NKF-013` Task, adopted
Design, ADR 0067, implementation, tests, generated adopter, public projection,
self-host declarations, local consumer exercise, exact-commit Github runs,
and deferred `NKF-014` boundary.

The review did not treat a green checker as semantic acceptance. It inspected
the code paths and failure boundaries, introduced adversarial cases, exercised
both Root Profiles, compared exact repository trees after failure, verified
all changed non-knowledge artifacts against the native governed-artifact set,
and obtained fresh remote and public observations.

## Material Findings And Repairs

The first conformant candidate was not accepted as complete. The audit found
and repaired three material issues:

1. **Incomplete inspection snapshot.** Markdown was digest-bound, but existing
   instruction, package, workflow, integration-target, and Git-branch inputs
   that the later operation merges or generates were not. The final inspection
   inventories those relevant surfaces, binds their exact bytes and policies,
   extracts package script names, binds the default branch, rejects a nested
   Git project root, and fails stale plans before mutation.
2. **Intermediate knowledge-root symbolic link.** A symbolic link at the final
   root component was rejected, but an intermediate component could resolve
   outside the project. The final traversal checks every component. Tests now
   cover both final-file and intermediate-root links. The mature-lifecycle
   frontmatter gate also recognizes CommonMark CRLF line endings.
3. **Deprecated Github Actions runtime.** The first successful remote consumer
   run on candidate `1cd29adadc0da0cdcc3e0415885da2526b3850f3`
   emitted a Node 20 action-runtime deprecation annotation. Official current
   releases were resolved to immutable pins:
   `actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1`
   (`v7.0.1`) and
   `actions/setup-node@820762786026740c76f36085b0efc47a31fe5020`
   (`v7.0.0`). Generated and repository workflows, registry, verifier, tests,
   adopter, public output, recommendation, and native artifact digests were
   synchronized. The successor runs have empty annotation sets.

No material finding remains unresolved.

## Task Validation Matrix

| Requirement | Verified Outcome |
| --- | --- |
| Empty Product | `inspect`, `seal`, `onboard`, full-bundle check, package command, and same-plan `no-update` pass |
| Empty Technology | The same path passes and generates the required Draft initial Specification |
| Small-document Product And Technology | Both profiles preserve a nested early Markdown source and represent it explicitly |
| Consumer topology differs from NKF | Nested `knowledge/notes/overview.md` remains in place; no NKF repository topology is imposed |
| Unborn Git | The exercise harness supplies both roots as `master` repositories without commits; onboarding preserves that state and generates an executable exact-branch workflow without initializing or committing Git |
| Existing conventions | Package scripts, instruction content, unrelated source bytes, lockfile boundary, and non-owned workflow inputs are preserved or deliberately merged |
| Ambiguous classification | Unresolved entries block onboarding before mutation |
| Initial-scope excess | File-count and mature-lifecycle inputs return the explicit `NKF-014` deferral boundary |
| Symbolic link, escape, duplicate, and owned conflict | Final and intermediate links, escaping candidate paths, duplicate document paths, and existing owned workflow bytes all fail closed |
| Transactional failure | An injected post-write failure restores the exact predecessor tree and removes transaction-created paths |
| Idempotence | Repeating the exact successful plan verifies the installed candidate and returns `no-update` |
| Byte preservation | Existing Markdown and unrelated source bytes remain exact unless the sealed candidate names a new digest; rollback tree comparison reports no loss |
| Honest status | Results separately report Draft root status, resolved classification, unresolved substantive meaning, unconfirmed Realization, passed conformance, not-ready Governing Use, and Git or remote non-claims |
| Local And Exact-Commit Execution | Local package-command exercise and both final exact-commit Github workflows pass |
| Agent SDK condition | The restored snapshot is qualitatively ineligible because it contains mature Task, Design, Decision, and acceptance history; it is correctly deferred to `NKF-014` and remains unmodified |

## Acceptance-Criteria Reconciliation

The public adopter takes supported unadopted Product and Technology projects
to complete checked candidates without manual native YAML or integration-file
assembly. The accepted numeric and qualitative boundaries are deterministic.
Common remains inherited rather than selectable. Every source Markdown entry
must be resolved exactly once before application.

Both generated profile scaffolds are mechanically conformant while remaining
Draft and unconfirmed. Existing and generated bytes are validated in an
isolated whole-project mirror before replacement. Handled failure rollback and
same-plan idempotence are proven. The executable, protocol, byte-identical
skills, supported adapters, guide, tests, checker integration, recommendation,
and public mirrors are exact and mutually verified.

The public guide explicitly enumerates the empty Product, empty Technology,
small-document Product, and small-document Technology starts. The executable
test suite exercises all four profile-and-corpus combinations.

## Local Verification

The final pre-confirmation candidate passes:

- `npm run nkf:check`;
- nineteen test files with 135 tests;
- eleven adopter tests;
- two onboarding-guidance tests;
- two public-documentation tests;
- deterministic checker and adopter builds;
- the 27-file governed public-source allowlist with nine Mermaid diagrams;
- the unchanged exact native release and new adopter recommendation binding;
- a local unborn-Git Product and Technology consumer exercise through
  generated `npm ci` and `npm run nkf:check`; and
- full self-host validation with no diagnostics.

The pre-confirmation self-host candidate contains 102 record declarations, 59
explicit non-record sources, and 119 governed artifacts. The completion
Decision adds one record and this Evidence adds one non-record source.

## Exact Remote Workflow Evidence

The repaired exact candidate is:

```text
b50493ddb42c87ed426eeb3bb11d3568652d8130
```

Github observed:

| Workflow | Run | Job | Result | Annotations |
| --- | --- | --- | --- | --- |
| NKF Consumer Adoption | `30628889305` | `91150431199` | Success | None |
| NKF Contracts | `30628878063` | `91150390985` | Success | None |

The consumer job checked out the exact commit, installed locked dependencies,
built and verified the adopter, downloaded the exact private release, and
completed the Product and Technology exercise. The contract job ran the full
canonical repository gate on the same commit.

## Public Projection Evidence

Clean source commit `b50493ddb42c87ed426eeb3bb11d3568652d8130`
staged 28 public files: 27 allowlisted source files plus the generated
non-circular publication manifest. The manifest SHA-256 is:

```text
93fed08d03ed6ef8a8c1f90d2496f295478f394a94c8749baea287383601af68
```

The exact public commit is:

```text
772d57370a094269ee1d9287ae871b0b3c7f64de
```

A second fresh clone was byte-identical to the staged projection before any
checker run. All 27 manifest-bound digests matched, the source-commit binding
matched, and the public adopter SHA-256 was
`7533a029053beaccd8f6fec939c2198c5909fd8b5a37a4ba9b5bc0c205bbc7c8`.
The Product and Technology example projects each passed the exact checker with
zero diagnostics.

## NKF-014 Extension Assessment

The delivered boundary minimizes later redesign. `NKF-014` may add
large-corpus analyzers, source-grounded candidate generation, provenance
graphs, checkpoint stores, resumability, and advanced recovery before the
same resolved-plan application boundary. The final apply path still requires
an exact eligible inspection, one complete resolved representation set,
candidate digests, native generation, verified release, isolated full-bundle
validation, and rollback-capable replacement.

The initial operation does not interpret source code, reconstruct historical
authority, infer acceptance, or repair arbitrary interrupted states. These
are explicit successor responsibilities rather than hidden incompleteness in
the initial contract.

## Residual Boundaries And Conclusion

The native NKF 0.1 archive remains unchanged because its normative authority,
Schemas, and checker bytes did not change. The separately digest-bound adopter
and public projection are the successor distribution surfaces.

Protected merge enforcement remains deferred to `NKF-012`. Brownfield,
source-derived reconstruction, and advanced recovery remain deferred to
`NKF-014`. Agent SDK is not onboarded through an inapplicable greenfield path.
No consumer meaning is accepted, no consumer Realization is confirmed, and no
Governing Use readiness is claimed.

Within the exact `NKF-013` scope, the implementation is complete, coherent,
recoverable for handled failures, AI-neutral at the protocol boundary,
publicly documented, locally and remotely exercised, and ready for a separate
exact-byte Realization confirmation.
