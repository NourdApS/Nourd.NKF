# NKF Adoption Protocol

NKF Version: 0.7

This is the governed procedure by which a repository adopts the current
recommended NKF release. It is process accepted through [ADR 0107](../../knowledge/decisions/0107-unified-adopt-operation-and-compatibility-signaling.md),
not NKF 0.2 format meaning. It is part of the complete versioned set it serves.

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

## State Resolution

Adopt observes the repository and selects one internal path:

| Repository state | Required input | Result |
| --- | --- | --- |
| Supported unadopted Empty or Tiny Knowledge repository | Reviewed sealed onboarding plan | `onboarded` |
| Adopted NKF 0.1 repository | Explicit approval after breaking preflight | `migrated` |
| NKF 0.2 repository without the recommended release or integration | None beyond release access | `updated` |
| NKF 0.2 repository already on the exact recommendation | None | `current` |

Internal capture, seal, topology-repair, installation, refresh, and migration
mechanics are not public choices. The public outcome remains Adopt.

## Initial Adoption

Initial semantic assessment remains agent-led under the
[Pre-Adoption Onboarding Protocol](../onboarding/nkf-onboarding-protocol.md).
After complete review and candidate sealing, pass the sealed plan:

```text
node nourd-nkf-adopt.mjs --project <project-root> --plan <sealed-plan.yaml>
```

An unadopted repository without a sealed plan fails before mutation. Mature or
uncertain unadopted repositories remain unsupported under deferred NKF-014.
Later category support must extend Adopt rather than add a public command.

## Breaking Migration

The recommendation declares compatibility relative to each supported
predecessor as `breaking` or `non-breaking`, with a consistent
`migration_required` value and summary. The Human Product Owner makes that
semantic judgement; tooling checks the declaration but does not infer it.

NKF 0.2 is breaking from NKF 0.1. The first Adopt invocation reports the exact
target and stops before mutation. After the repository's Human Product Owner
approves that displayed migration, rerun:

```text
node nourd-nkf-adopt.mjs --project <project-root> \
  --accept-breaking human-product-owner
```

The migration updates the bundle declaration, completes known portable
topology gaps, adds the cancelled Task index, adds the Decision Applicability
gate retrospectively where required, linkifies same-bundle references, repins
changed record sources, refreshes the integration, and validates the complete
candidate before applying it.

## Transaction And Verification

Every mutating route:

1. verifies the recommendation and content-addressed archive;
2. validates the predecessor with its own pinned adopter and checker where
   applicable;
3. stages the complete target outside live paths;
4. runs the target full-bundle checker;
5. applies one rollback-capable transaction;
6. verifies the installed pin, integration, archive, and bundle; and
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
