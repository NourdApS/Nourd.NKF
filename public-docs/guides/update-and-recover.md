# Update And Recover

NKF consumers never follow a moving branch or mutable latest release. Every
installation remains pinned until the consumer deliberately changes its full
archive SHA-256.

## Check Current State

```sh
node .nourd/tools/nkf/nourd-nkf-adopt.mjs status --project .
```

Status verifies the installed adopter, integration, pin, archive, manifest,
source commit, and checker digest without changing knowledge.

## Confirm No Update

Re-running installation with the same adopter and exact release digest:

```sh
node nourd-nkf-adopt.mjs install \
  --project /absolute/path/to/project \
  --archive /absolute/path/to/the-pinned-release.tar \
  --sha256 <CURRENT_FULL_RELEASE_SHA256>
```

returns `no-update` only after the current installation and project check
pass. It does not resolve a mutable recommendation.

## Deliberate Update

Before updating:

1. review the new recommendation and compatibility statement;
2. classify any change as a Specification or contract change, checker or
   distribution fix, migration, or consumer nonconformance;
3. approve the migration in the consumer's own authority;
4. obtain the exact new archive and full SHA-256; and
5. preserve or commit the current consumer state so recovery is possible.

Then run:

```sh
node nourd-nkf-adopt.mjs update \
  --project /absolute/path/to/project \
  --archive /absolute/path/to/new-release.tar \
  --sha256 <NEW_FULL_RELEASE_SHA256>
```

The adopter verifies the existing installation before change, stages all new
bytes, preserves predecessor bytes needed for interruption recovery, keeps
the prior content-addressed archive, installs the new pin, and runs the new
checker.

## Roll Back

Rollback is another explicit update using a retained prior archive and its
full prior digest. There is no moving rollback label.

If the new installation cannot validate the project, correct a genuine
consumer nonconformance or deliberately restore the prior pin. Do not weaken a
Specification, Schema, checker, adapter, or workflow simply to obtain a pass.

## Diagnose Failures

| Failure | First Check |
| --- | --- |
| Archive digest mismatch | Confirm the exact expected SHA-256 and archive bytes |
| Private release unavailable | Confirm `gh auth status` and repository authorization |
| Pin or adopter mismatch | Restore the reviewed installed bytes or reinstall deliberately |
| Adapter conflict | Reconcile project-owned instructions without deleting unrelated policy |
| Governed Markdown digest mismatch | Review the source change and declaration together |
| Unsupported Root Profile | Select Product or Technology through governed migration |
| CI differs from local | Compare the exact commit, Node.js version, pin, and workflow bytes |

Keep release publication, public documentation, consumer installation,
validation, and remote CI observations as separate facts during diagnosis.
