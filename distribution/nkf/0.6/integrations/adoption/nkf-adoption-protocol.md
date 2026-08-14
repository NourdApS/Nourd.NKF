# NKF Adoption Protocol

NKF Version: 0.6

This protocol governs the one public, subcommand-free Adopt operation for the
recommended NKF release. Adoption selects, verifies, and installs released
bytes; it cannot accept a consumer's meaning or confirm its Realization.

## One Public Operation

Run the adopter without a subcommand:

```sh
node nourd-nkf-adopt.mjs --project <repository>
```

The adopter resolves the governed recommendation from the NKF default branch,
then independently verifies the selected archive digest. An explicitly
reviewed offline recommendation and matching archive may be supplied together;
neither input is trusted without exact validation.

## State Resolution

The same operation returns only:

| Repository state | Required authority | Result |
| --- | --- | --- |
| Supported unadopted repository with reviewed sealed plan | Category authority recorded by onboarding | `onboarded` |
| NKF 0.1 repository | Explicit repository-owner breaking approval | `migrated` |
| NKF 0.2 repository | Explicit repository-owner breaking approval | `migrated` |
| NKF 0.3 repository | Explicit repository-owner breaking approval | `migrated` |
| NKF 0.4 repository | Explicit repository-owner breaking approval | `migrated` |
| Native or pinned NKF 0.5 repository with a current reviewed baseline | None | `updated` |
| NKF 0.5 repository without a current reviewed baseline | No mutation; review must be refreshed first | refused |
| Native unpinned NKF 0.6 repository | None beyond release access | `updated` |
| Pinned NKF 0.6 repository on another supported release | None | `updated` |
| Exact recommended 0.6 pin and integration | None | `current` |

Compatibility is relative to the declared predecessor. Every 0.1-through-0.4
path to 0.6 is breaking and requires explicit repository-owner approval before
mutation. The exact 0.5-to-0.6 update is non-breaking only when policy equality
and a current exact predecessor baseline permit deterministic carry-forward;
0.6-to-0.6 refresh is non-breaking. Tooling enforces these accepted
classifications and never infers a different semantic result.

## Transaction

Before mutation, Adopt verifies recommendation shape, archive identity,
manifest, release set, all file digests, authority and Schema bindings,
supported profile, predecessor installation where present, candidate topology,
integration feasibility, and a separately supplied whole-root semantic-review
plan. Breaking migration constructs the exact 0.6 graph outside the repository; a named
human or agent reviews its complete node and relationship universe and the
baseline sealer binds that evidence before the candidate can be applied. The
repository-owner approval and semantic reviewer may be different actors.
The 0.5-to-0.6 path instead preserves canonical sources, declarations, nodes,
edges, and reviewed baseline meaning and changes only the authorized version,
policy, derived graph-revision, release-pin, and required integration/artifact
coordinates. A stale predecessor baseline fails before mutation.
Adopt then stages one complete transaction and
validates the resulting repository with the archive's checker before commit.
Any failure restores every replaced or removed byte and removes created paths.

The installed pin records the exact archive, source commit, checker, adopter,
Root Profile, integration revision, integration mode, and exact package-script
state. Repeat Adopt verifies all of those fields and the full installed chain
before returning `current`.

## Default And Host-Superset Integration

The default canonical `npm run nkf:check` invokes the pinned adopter's release
check. A repository may instead declare a general host-superset integration
before adoption. Adopt accepts that mode only when the declaration binds the
exact existing canonical script and the installed result is the fixed chain:

```text
npm run nkf:check:pinned && npm run nkf:check:host
```

The pinned step verifies installation and invokes the exact release checker;
the host step preserves the exact pre-adoption command. The pin and integration
registry record all three exact script strings. Missing, reordered, changed,
recursive, or conflicting state fails closed. Repository identity supplies no
bypass.

## Initial Adoption

Initial adoption still requires the pre-adoption onboarding protocol, complete
repository inspection, required Category 2 human confirmation, a reviewed
candidate workspace, and a sealed plan. Successful mutation creates Draft
knowledge only after named whole-root semantic review has sealed its exact
graph baseline; it does not accept canonical meaning.

## Candidate Binding

Release automation may bind a local reviewed candidate catalog and exact local
archive to the same adopter for the prepublication self-adoption exercise. The
binding must derive entirely from the verified archive and is never a mutable
public trust target. It adds no second public operation and cannot produce a
publication or recommendation claim.

## Post-Action Audit And Reporting

The NKF producer's first ordinary public adoption occurs only after exact
publication and atomic recommendation promotion. Immediate repeat Adopt must
return `current`, followed by a fresh independent audit of the installed pin,
archive, integration, migrated bundle, checker result, and producer gate.

Report migration approval, mutation result, conformance, acceptance,
Realization confirmation, publication, recommendation, Git state, remote
enforcement, and Governing Use readiness separately.
