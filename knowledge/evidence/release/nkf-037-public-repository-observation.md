---
title: NKF-037 Public Repository Observation
summary: Records the observed public state of NourdApS/Nourd.NKF after the Human Product Owner's visibility change on 2026-09-08 — anonymous clone, anonymous archive download hashing to the recommended digest, anonymous catalog fetch, the branch-protection query that no longer returns 403, the branch protection then activated on master under ADR 0136, the security-feature toggles as found, and the recommendation catalog's recorded truthfulness gap — as Evidence of operational facts at one moment.
created_at: 2026-09-08T11:55:00Z
---

# NKF-037 Public Repository Observation

This records the public state of `NourdApS/Nourd.NKF` observed after the Human
Product Owner changed its visibility in Github settings, under
[NKF-037](../../tasks/items/NKF-037-make-the-nkf-repository-public.md) and the
adopting
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md). It
is Evidence of operational acts and observations at one moment. It accepts no
meaning, confirms no Realization, and changes no published byte.

## The Visibility Change

The Human Product Owner performed the change and reported it verbatim: "the
repo is public now". The Claude technical reviewer did not perform it and
verified it afterwards.

| Fact | Value |
| --- | --- |
| Repository | `NourdApS/Nourd.NKF` |
| Observed at | `2026-09-08T11:51:53Z` |
| Github `private` | `false` |
| Github `visibility` | `public` |
| Issues | enabled, as [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md) item six requires |
| `master` tip at observation | `3ebd900`, the merge of NKF-036 |

## Anonymous Verification

Each observation was made without credentials, from outside the collaborator
set, using a fresh clone directory and plain HTTPS.

| Check | Result |
| --- | --- |
| Anonymous shallow clone with credential helpers disabled | succeeded; HEAD `3ebd900` |
| Anonymous download of the catalog's archive URL | HTTP `200`, 7640064 bytes |
| SHA-256 of the downloaded archive | `2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5`, equal to the recommended archive digest |
| Anonymous fetch of `release/recommended.json` from the default branch | HTTP `200` |

Every published release tag is therefore an address that resolves without
authentication, which is the adoption need the Design stated. The released
adopters still fetch through `gh`, so a consumer needs a Github login until
NKF 0.9; collaborator access is no longer required.

## Branch Protection

Before the flip, Github returned HTTP `403` for branch protection on the private
repository. After the flip the same query returned HTTP `404`, "Branch not
protected", with no rulesets: protection had become available and was not yet
configured. The activation condition of
[NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md) was
observed true at that moment.

Under [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md)
item seven, and the Human Product Owner's confirmation to activate within this
Task, the Claude technical reviewer then applied branch protection to `master`
through the Github API and re-queried it.

| Setting | Value |
| --- | --- |
| Required status check | `Validate`, the job of the exact-commit `NKF Contracts` workflow |
| Strict, branch must be up to date before merge | `true` |
| Enforce for administrators | `true` |
| Required pull-request reviews | none configured |
| Push restrictions | none |
| Force pushes | disallowed |
| Branch deletion | disallowed |

The required approving review, bypass policy, and blocked-invalid-candidate
observation that
[NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md) also
scopes were not configured here. A single-maintainer repository cannot require
an approval without blocking its own maintainer, and that decision belongs to
the deferred Task's own revision. This Evidence records the required check as
active and the rest as open.

## Security Features As Found

At observation, Github reported Dependabot security updates, secret scanning,
push protection, non-provider patterns, and validity checks all `disabled`.
Enabling them is a repository-settings act for the Human Product Owner; this
Evidence records the state and does not change it. Private vulnerability
reporting, which `SECURITY.md` directs reporters to, is likewise a settings
act and its state was not observable through the repository endpoint used.

## The Catalog Gap

`release/recommended.json` continues to state channel
`internal-private-github-prerelease` and release visibility `private`. Both are
now false as descriptions of the repository. They remain because the released
NKF 0.8 and 0.71 adopters validate those exact literals in frozen bytes and
refuse any other value, so changing them would break every ordinary Adopt path,
including this producer's own. The archive URL, digest, and adopter validation
the catalog carries are unchanged and correct. The remedy is NKF 0.9, scoped by
the [NKF Public Repository Design](../../designs/items/nkf-public-repository.md)
and not delivered here.

## Boundary

These are observations of Github state at one moment and one settings act
performed under explicit authorization. Github owns their later state. Nothing
here accepts NKF meaning, confirms the Realization, closes
[NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md), or
changes a published byte or a catalog literal.
