# Update And Recover

There is no separate public update, migrate, install, or status command. Run
**Adopt** whenever you want a supported repository to reach the current
governed recommendation:

```sh
node nourd-nkf-adopt.mjs --project /absolute/path/to/project
```

An exact-current repository returns `current` only after its installed pin,
adopter, integration, archive, manifest, knowledge, and checker result pass.
A behind NKF 0.3 repository receives the non-breaking integration refresh and
returns `updated`.

## Review A Breaking Migration

For NKF 0.1 or NKF 0.2, the first run shows the exact 0.3 target, declares the
predecessor-relative path breaking and migration-required, and exits without
mutation. Review that target and the consumer repository's migration
implications. After explicit repository-owner approval, rerun with:

```text
--accept-breaking repository-owner
```

Adopt performs the known topology repair and version migration inside one
validated rollback-capable transaction. Do not edit generated repair paths or
change the bundle version manually.

## Offline And Exact Recovery

The reviewed recommendation selects the intended archive; the archive digest
is the trust anchor. To use an exact offline target:

```sh
node nourd-nkf-adopt.mjs \
  --project /absolute/path/to/project \
  --recommendation /absolute/path/to/recommended.json \
  --archive /absolute/path/to/content-addressed-release.tar
```

Automatic transaction rollback restores predecessor bytes after a handled
failure. A deliberate return to a retained earlier release requires its exact
reviewed recommendation and archive and remains subject to that release's
compatibility and migration rules; there is no moving rollback label.

## Diagnose Failures

| Failure | First Check |
| --- | --- |
| Recommendation unavailable | Confirm `gh auth status` and private repository authorization |
| Recommendation or archive mismatch | Confirm the reviewed catalog and exact content-addressed bytes |
| Breaking approval required | Review the displayed target and obtain real repository-authority approval |
| Initial plan required | Complete agent assessment and seal the exact candidate |
| Predecessor pin or adopter mismatch | Restore reviewed installed bytes before migration |
| Adapter conflict | Reconcile project-owned instructions without deleting unrelated policy |
| Governed Markdown digest mismatch | Review source and declaration together |
| Unsupported repository or Root Profile | Stop; do not force a supported category or version |
| CI differs from local | Compare exact commit, Node.js version, pin, workflow, and archive bytes |

Keep recommendation, publication, consumer application, validation, and
remote enforcement as separate facts throughout recovery.
