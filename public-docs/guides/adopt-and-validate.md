# Adopt And Validate

NKF has one public operation: **Adopt**. The same invocation brings a supported
repository to the current governed recommended release whether it is new to
NKF, on the supported predecessor NKF 0.71, missing integration, behind within
NKF 0.8, or already current.

NKF 0.8 is pre-stable. The checker and release archive are private to
authorized Nourd projects; this public adopter contains no checker or private
credential.

## Before You Run Adopt

Use Node.js 22 or later. For the default authenticated path, install `gh` and
log in to an account authorized for `NourdApS/Nourd.NKF`. Download
`tools/nourd-nkf-adopt.mjs` and verify its SHA-256 against
`reference/publication.json`.

The repository's authority approves adoption. The command cannot accept
project meaning or confirm a Realization.

## Run The One Operation

```sh
node nourd-nkf-adopt.mjs --project /absolute/path/to/project
```

The adopter obtains the reviewed `release/recommended.json` from NKF's default
branch, shows the exact target, verifies the full content-addressed archive,
and selects the valid internal path from repository state. It never follows a
Github `latest` label.

For an approved offline release:

```sh
node nourd-nkf-adopt.mjs \
  --project /absolute/path/to/project \
  --recommendation /absolute/path/to/recommended.json \
  --archive /absolute/path/to/nourd-nkf-sha256-<digest>.tar
```

The recommendation must name that exact archive digest. A mismatch stops
before archive use.

## What The Result Means

| State | Meaning |
| --- | --- |
| `onboarded` | A reviewed sealed initial plan and whole-root graph review became a ready NKF 0.8 project |
| `updated` | An exact conformant NKF 0.71 repository completed the non-breaking upgrade with its reviewed delta, or a native 0.8 repository received the recommended exact release and integration |
| `current` | The exact recommended release and integration already validate |
| Failed closed | A repository declaring NKF 0.1 through 0.7 is outside the support window; the refusal names the exact next stepping-stone release archive |

Every result names the target archive, source commit, checker, adopter, and
applicable compatibility signal. The consumer pin under
`.nourd/nkf-release.json` makes the exact successful release permanent; a
later recommendation change does not alter the repository automatically.

## The Support Window

Live support covers exactly the current version plus one predecessor:
NKF 0.8 and NKF 0.71. A repository declaring an older version migrates
through immutable published archives as stepping stones — each hop uses that
archive's own bundled adopter with an explicit archive and digest. See
[Update And Recover](update-and-recover.md) for the exact stepping-stone
targets. Nothing migrates silently, and no adoption event widens the window
by implication.

## Initial Repositories

An unadopted repository first needs a complete agent review and sealed plan.
Follow [Initial Onboarding](initial-onboarding.md), then run the same Adopt
operation with the plan:

```sh
node nourd-nkf-adopt.mjs \
  --project /absolute/path/to/project \
  --plan /absolute/path/to/onboarding-workspace/plan.yaml \
  --review /absolute/path/to/whole-root-review.yaml
```

If the `--review` file does not exist, Adopt builds the complete isolated 0.8
candidate, writes a candidate-specific review template there, and stops before
project mutation. A named human or agent must review the actual graph, replace
every `REVIEW_REQUIRED` value and placeholder with source-bound findings, then
rerun the exact same Adopt command. Adopt never fills semantic roles,
relationship completeness, or Decision compatibility by itself. Missing,
stale, incomplete, or unsupported plans or reviews stop without mutation.

## Non-Breaking NKF 0.71 Upgrade

Updating an exact conformant NKF 0.71 repository to NKF 0.8 is `non-breaking`
and requires no repository-owner approval: no stable path moves, no identity
succeeds, no declaration changes shape, and canonical Markdown bytes are
preserved. The upgrade still never invents review. The first Adopt invocation
writes the exact upgrade review template — carried judgments prefilled by
digest identity under the accepted 0.71-to-0.8 version-delta declaration, the
computed required fresh set left to a named reviewer — and stops. Rerun with
the completed review:

```sh
node nourd-nkf-adopt.mjs \
  --project /absolute/path/to/project \
  --review /absolute/path/to/upgrade-review.yaml
```

In one rollback-capable transaction the upgrade rebinds the contract set to
0.8, converts the reviewed baseline to the digest-bound 0.8 contract with
computed per-judgment carry-forward, and refreshes the integration. A delta
review claim is admitted only when the performed set contains the computed
closure;
whole-root review remains the recovery path. A repository whose 0.71 baseline
is missing, outdated, disputed, or otherwise not ready is ineligible until a
governed 0.71 knowledge-maintenance operation restores it. The semantic
reviewer's act does not accept canonical Product or Technology meaning.

## What Adopt Installs

After complete isolated validation, the transaction installs or refreshes:

- the exact content-addressed release archive and consumer pin;
- the pinned self-contained adopter;
- the neutral authoring protocol and portable skills;
- bounded host instruction adapters;
- the integration registry and verifier;
- `npm run nkf:check`; and
- an exact-commit Github workflow.

Conflicting owned paths, symbolic links, digest drift, invalid knowledge, or a
handled write failure fail closed or roll back. Existing unrelated instruction
content is preserved.

## Validate Normal Work

Run exactly:

```sh
npm run nkf:check
```

The installed adopter verifies its pin, integration, archive, and embedded
manifest before invoking the pinned full-bundle checker. A pass establishes
conformance for one snapshot. It is not acceptance, Realization confirmation,
publication, or protected-merge proof.

Repositories with an explicitly declared stronger gate retain its exact prior
command as the host step in a verified pinned-check plus host-check chain.
Adopt records and verifies that chain before it can return `current`; repository
identity never bypasses the check.

The installed Github workflow provides continuous integration by running the
same command against the exact candidate commit. Workflow presence and a green
run do not by themselves prove branch protection.

Between releases, a deterministic Task state transition reseals its own
successor baseline through the `mechanically-concluded` claim, so a concluded
repository never lands one step stale. The conclusion performs zero semantic
judgments; a transition whose graph delta exceeds the closed vocabulary fails
before mutation with the ordinary review-and-seal path as recovery.
