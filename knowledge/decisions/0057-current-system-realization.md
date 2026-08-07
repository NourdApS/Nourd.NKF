---
id: adr-0057
type: decision
title: "ADR 0057: Current System Realization"
summary: ADRs 0053 through 0056 establish the repaired knowledge architecture, front-matter boundary, and Design vocabulary. The repository now has a consolidated current-system Realization, explicit supporting Realizations, reviewed declarations, current derived Schemas, checker support, and a complete Technology self-host bundle.
created_at: 2026-07-30T17:44:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-007
decision_authority: Codex technical reviewer under the Human Product Owner's explicit delegated approval and confirmation authority
---

# ADR 0057: Current System Realization

- **Review Evidence:** `knowledge/evidence/audits/nkf-007-final-repository-audit.md`

## Context And Problem

ADRs 0053 through 0056 establish the repaired knowledge architecture,
front-matter boundary, and Design vocabulary. The repository now has a
consolidated current-system Realization, explicit supporting Realizations,
reviewed declarations, current derived Schemas, checker support, and a
complete Technology self-host bundle.

Those artifacts require exact Realization confirmation. Passing tests or
validation cannot provide that confirmation by implication.

## Decision

The authority accepts the exact Realization record revisions listed below and
separately confirms that they accurately describe the current NKF repository
implementation within their stated boundaries.

The authority also confirms the exact current core Schemas and checker build
listed below as derived implementation of the NKF 0.1 authority pair accepted
by [ADR 0056](0056-design-direction-and-record-authority.md).

The Release Package Realization is confirmed as an accurate account of the
implemented release mechanism and its current stale-publication boundary. It
does not confirm a current distribution package or published release.

## Scope And Applicability

Confirmation covers this repository’s current contracts, core Schemas,
checker source and deterministic build, fixtures, tests, knowledge topology,
explicit self-host declarations, governed-artifact bindings, and Realization
documentation.

It applies to the exact revisions and candidate state reviewed by the
[NKF-007](../tasks/completed/NKF-007-knowledge-structure-and-confirmation.md) final audit. A later change requires new Evidence and a governed
successor confirmation.

## Rationale

The complete check suite, independent structural audit, exact digest review,
and passing non-persisting full-bundle validation support confirmation. The
consolidated Realization view makes the confirmed system navigable without
turning historical Designs or Decisions into a required reconstruction path.

## Alternatives Considered

Leaving the new Realizations in Draft was rejected because the exact
implementation has now been reviewed and verified.

Treating passing validation as confirmation was rejected because conformance
cannot accept knowledge or establish implementation truth.

Confirming the release as current was rejected because release configuration
still binds the predecessor release baseline and publication is deferred to
[NKF-008](../tasks/completed/NKF-008-publish-and-onboard-consumers.md).

## Consequences And Trade-Offs

The accepted Realization revisions become immutable snapshots. Later
implementation changes require deliberate successor revisions and
confirmation rather than silent edits.

Repository reviews can begin with `knowledge/realizations/current-system.md`
and follow Decisions or Designs selectively. The cost is maintaining exact
current-state documentation and provenance whenever implementation changes.

## Confirmed Realization Revisions

| Realization Record | SHA-256 |
| --- | --- |
| `knowledge/realizations/current-system.md` | `09852847e2a767833cdd515acbdaf7f737ac9be8f58201443d192ca44e514905` |
| `knowledge/realizations/current/contracts-and-schemas.md` | `23b339224758869fd5532b2e9e59d76d82ab31a49466c73e721a8a5c7d92bb90` |
| `knowledge/realizations/current/checker-and-validation.md` | `0a2d50f6174c9b8bf4a443fea396164a65c306d91a8503b62256bc7cc2d11116` |
| `knowledge/realizations/current/self-hosting.md` | `26f0f76ec47ed83b56476283fe775291d1cc65b2ae93f9c1360f704823c60974` |
| `knowledge/realizations/current/release-package.md` | `f8854d7abd9446ecad8ba8809cbf6f4296bc43ac36da4287d6f5a45a719098d6` |

## Confirmed Derived Artifacts

| Artifact | SHA-256 |
| --- | --- |
| `contracts/nkf/0.1/schemas/bundle.schema.json` | `b186a0435d95864b2782e4382a06c64315fb58793d42e9cf8cf0a49839bceb16` |
| `contracts/nkf/0.1/schemas/record.schema.json` | `94a3143ad1cf4be7cb01191d602115c783b1cfa5d11fedcbdd53b3c273c6e85f` |
| `contracts/nkf/0.1/schemas/validation-result.schema.json` | `24a736cdf1138af6ef88603bb3ab67dea35e7b9f978e9681bb4e465f7bf2a004` |
| `dist/nourd-nkf-checker.mjs` | `2d32d43b43788d3d874c7ffef4e01fa370d6467d93fc5c6f62fb088b269e4bc3` |

The confirmed build is derived from the exact source and dependency artifacts
bound by the self-host bundle. Build output remains uncommitted derived
output under repository policy.

## Verification Evidence

The final repository audit has SHA-256
`4b772281b26d623da1deac7f1753c2c0103d1b5ffa8615eb77eede3e586e159a`.

Before this Decision:

- `npm run check` passed type checking, 15 test files, 93 tests, build, and
  deterministic build verification;
- every record source and all 60 governed artifacts matched their declared
  digest;
- every Markdown file under `knowledge/` had exactly one representation;
- no prohibited symlink was present; and
- a non-persisting full-bundle validation passed with zero diagnostics.

The final post-Decision validation remains a separate conformance observation.
It cannot supply or expand this confirmation.

## Recovery And Supersession

Recovery uses the exact accepted revisions, predecessor Decisions, preserved
Evidence, Git history, and deterministic rebuild. A later correction must
identify whether it changes normative meaning, derived implementation,
declarations, migration, or consumer conformance and follow the applicable
governed path.

This Decision supersedes [ADR 0052](0052-dynamic-root-self-hosting.md) only as the current repository
implementation confirmation. [ADR 0052](0052-dynamic-root-self-hosting.md) remains immutable predecessor
provenance.

## Non-Claims

This Decision does not alter the NKF 0.1 authority pair, verify acceptance
authority binding, publish or confirm a release, select a package registry,
push Git state, migrate an external consumer, establish live operational
state, or claim that conformance proves semantic adequacy.
