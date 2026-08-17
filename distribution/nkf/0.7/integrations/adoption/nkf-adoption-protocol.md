# NKF Adoption Protocol

NKF Version: 0.7

This is the governed procedure by which a repository adopts the current
recommended NKF release. It is derived process, not format meaning; the
accepted NKF 0.7 Specification remains the authority when any derived
instruction conflicts. It is part of the complete versioned set it serves.

Adoption is separate from release. A release obligates no repository. Each
repository remains authoritative for its own meaning and breaking-migration
approval.

## One Public Operation

The public operation is **Adopt**, invoked without a subcommand:

```text
node nourd-nkf-adopt.mjs --project <project-root>
```

The adopter resolves `release/recommended.json` from the governed NKF default
branch, validates its closed shape, and exposes the exact target version,
archive SHA-256, source commit, checker digest, adopter digest, and applicable
compatibility signal. The mutable reviewed recommendation is only a selection
channel. The verified full archive digest and the installed consumer pin are
the immutable trust anchors.

For an approved offline release, supply both the exact reviewed recommendation
and its archive:

```text
node nourd-nkf-adopt.mjs --project <project-root> \
  --recommendation <recommended.json> \
  --archive <content-addressed-release.tar>
```

## State Resolution And The Support Window

Live support covers the current version plus one predecessor: NKF 0.7 and
NKF 0.6. Adopt observes the repository and selects one internal path:

| Repository state | Required input | Result |
| --- | --- | --- |
| Supported unadopted Empty or Tiny Knowledge repository | Reviewed sealed onboarding plan and completed whole-root review | `onboarded` |
| Adopted NKF 0.6 repository | Explicit repository-owner breaking approval and the completed computed delta review | `migrated` |
| NKF 0.7 repository without the recommended release or integration | None beyond release access | `updated` |
| NKF 0.7 repository already on the exact recommendation | None | `current` |
| Repository declaring NKF 0.1 through 0.5 | Out of window | Fails closed naming the exact stepping-stone release archive |

An out-of-window repository migrates through immutable published archives as
stepping stones, each hop using that archive's own bundled adopter with an
explicit archive and digest. The refusal names the exact next stepping-stone
release; nothing migrates silently.

Internal capture, seal, installation, refresh, and migration mechanics are not
public choices. The public outcome remains Adopt.

## Initial Adoption

Initial semantic assessment remains agent-led under the
[Pre-Adoption Onboarding Protocol](../onboarding/nkf-onboarding-protocol.md).
After complete review and candidate sealing, pass the sealed plan and a
writable review path; Adopt writes the exact whole-root review template,
stops, and completes onboarding only after a named reviewer completes it:

```text
node nourd-nkf-adopt.mjs --project <project-root> \
  --plan <sealed-plan.yaml> --review <review.yaml>
```

An unadopted repository without a sealed plan fails before mutation. Mature or
uncertain unadopted repositories remain unsupported under deferred NKF-014.
Later category support must extend Adopt rather than add a public command.

## Breaking 0.6-To-0.7 Migration

The recommendation declares compatibility from each in-window predecessor as
`breaking` or `non-breaking`, with a consistent `migration_required` value and
summary. Updating an exact conformant NKF 0.6 repository to NKF 0.7 is
`breaking` and requires explicit repository-owner approval before mutation,
even though migration preserves canonical Markdown bytes and historical
authority. The first Adopt invocation reports the exact target and stops.
After approval, rerun with a writable review path:

```text
node nourd-nkf-adopt.mjs --project <project-root> \
  --accept-breaking repository-owner --review <review.yaml>
```

The migration performs, in one rollback-capable transaction: the one
deliberate stable-path neutralization of the legacy lifecycle trees into the
neutral `items/` locations with declarations, navigation, and living-source
links rewritten mechanically; each accepted identity succession, exactly
once; classification of undeclared non-Markdown knowledge files as inert
provenance attachments; conversion of the reviewed baseline to the
digest-bound 0.7 contract with computed per-judgment carry-forward under the
accepted version-delta declaration and the evaluation policy's declared
judgment dependencies; and the integration refresh. Predecessor-locked
sources, immutable record sources, and Evidence byte sets are never
rewritten; their links resolve through the closed legacy mapping as correct
historical fact.

Mechanical migration cannot perform review. Adopt writes the exact migration
review with carried judgments prefilled and the computed required fresh set
left to a named reviewer, then stops. A delta claim is admitted only when the
performed set contains the computed closure; whole-root review remains the
recovery path. The repository-owner approval and the semantic reviewer may be
different actors; neither act accepts canonical meaning.

## Producer Promotion

The NKF producer's candidate-bound promotion is a separate, producer-only
path with two authorized stages and its own accepted serialized input and
accepting Decision. No ordinary consumer update can invoke it; a non-producer
repository supplying promotion inputs fails before mutation.

## Transaction And Verification

Every mutating route:

1. verifies the recommendation and content-addressed archive;
2. validates the predecessor with its own pinned adopter and checker where
   applicable;
3. stages the complete target outside live paths;
4. runs the target full-bundle checker on the staged candidate;
5. applies one rollback-capable transaction;
6. verifies the installed pin, integration, archive, bundle, and readiness;
   and
7. reports `onboarded`, `migrated`, `updated`, or `current` with the exact
   target and compatibility context.

After success, independently audit the pin, receipt where applicable, archive
digest, migrated topology, representative documents, and a fresh checker run.
Record findings in the owning Task and conclude through the repository's human
review.

## Boundaries

- A repository that cannot satisfy the target contract remains on its prior
  version; it never misdeclares a mixed state.
- Adopt does not rewrite accepted immutable meaning by implication. Consumer
  authority owns every semantic migration decision.
- A successful result proves the observed operational application and
  conformance only. It does not accept knowledge, confirm a Realization,
  publish a release, or prove remote enforcement.
