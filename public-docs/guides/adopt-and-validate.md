# Adopt And Validate

NKF has one public operation: **Adopt**. The same invocation brings a supported
repository to the current governed recommended release whether it is new to
NKF, already on NKF 0.1 through 0.5, missing integration, behind within NKF
0.6, or already current.

NKF 0.6 is pre-stable. The checker and release archive are private to
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
| `onboarded` | A reviewed sealed initial plan and whole-root graph review became a ready NKF 0.6 project |
| `migrated` | A supported 0.1-through-0.4 predecessor was deliberately migrated to NKF 0.6 with a reviewed baseline |
| `updated` | Existing native 0.5 was safely carried forward, or native 0.6 received the recommended exact release and integration |
| `current` | The exact recommended release and integration already validate |

Every result names the target archive, source commit, checker, adopter, and
applicable compatibility signal. The consumer pin under
`.nourd/nkf-release.json` makes the exact successful release permanent; a
later recommendation change does not alter the repository automatically.

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

If the `--review` file does not exist, Adopt builds the complete isolated 0.6
candidate, writes a candidate-specific review template there, and stops before
project mutation. A named human or agent must review the actual graph, replace
every `REVIEW_REQUIRED` value and placeholder with source-bound findings, then
rerun the exact same Adopt command. Adopt never fills semantic roles,
relationship completeness, or Decision compatibility by itself. Missing,
stale, incomplete, or unsupported plans or reviews stop without mutation.

## Breaking NKF 0.1 Through 0.4 Migrations

NKF 0.6 is declared breaking from NKF 0.1, 0.2, 0.3, and 0.4. For any such
predecessor, Adopt first
reports the exact predecessor-relative target and migration requirement, then
stops before changing the repository. After the repository owner approves that
displayed migration, rerun:

```sh
node nourd-nkf-adopt.mjs \
  --project /absolute/path/to/project \
  --review /absolute/path/to/whole-root-review.yaml \
  --accept-breaking repository-owner
```

The approval argument is valid only for a declared breaking path. Tooling does
not manufacture the human approval or infer compatibility. An absent review
path follows the same template-and-rerun workflow described above.

## Non-Breaking NKF 0.5 Update

NKF 0.5 to 0.6 needs no repository-owner breaking approval and no new semantic
review during the update. Adopt first proves that the exact 0.5 policy and
reviewed baseline are current, then preserves canonical source bytes,
declarations, nodes, edges, and review meaning while updating only authorized
version, policy, graph-revision, release-pin, integration, and derived artifact
coordinates. If the 0.5 baseline is stale or not ready, Adopt refuses before
mutation; refresh and review the 0.5 baseline first.

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
