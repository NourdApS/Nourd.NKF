# Update And Recover

There is no separate public update, migrate, install, or status command. Run
**Adopt** whenever you want a supported repository to reach the current
governed recommendation:

```sh
node nourd-nkf-adopt.mjs --project /absolute/path/to/project
```

An exact-current repository returns `current` only after its installed pin,
adopter, integration, archive, manifest, knowledge, and checker result pass.
An exact conformant NKF 0.8 repository takes the non-breaking reviewed-delta
upgrade to 0.81. A native 0.81 repository receives the exact integration
refresh. A repository declaring NKF 0.1 through 0.71 is outside the support
window and fails closed with the exact next stepping-stone archive named.

## Complete The 0.8-To-0.81 Upgrade Review

For a repository declaring NKF 0.8, the first run writes the exact upgrade
review template and exits without mutation. Judgments whose node revision, basis digest, and depended-on
rules are `identical` under the accepted 0.8-to-0.81 version-delta declaration
arrive prefilled as carried; the computed required fresh set is left for a
named human or agent to review with source-bound findings. Rerun the same
command with the completed review:

```text
--review /absolute/path/to/upgrade-review.yaml
```

Adopt rejects placeholder, incomplete, stale, or mismatched review coverage,
and admits the delta review claim only when the performed set contains the
computed closure and the recorded closure equals the one the checker
recomputes with the evaluation policy's impact propagation. Whole-root review remains valid at any time and is the
recovery path when completeness is missing or disputed. The upgrade performs
the contract rebind, digest-bound baseline conversion, and integration
refresh inside one validated rollback-capable transaction. Do not edit
generated paths or change the bundle version manually.

## Migrate An Out-Of-Window Version

NKF 0.71 and older versions are immutable published history, not live targets.
The 0.81 adopter refuses them and names the exact next stepping-stone release
archive; each hop uses that archive's own bundled adopter with an explicit
archive and digest:

| Declared version | Next stepping-stone archive |
| --- | --- |
| NKF 0.71 | The published NKF 0.8 archive, SHA-256 `2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5` |
| NKF 0.7 | The published NKF 0.71 archive, SHA-256 `3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13` |
| NKF 0.6 | The published NKF 0.7 archive, SHA-256 `c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` |
| NKF 0.1 through 0.5 | The published NKF 0.6 archive, SHA-256 `b0822199c1ddb4ea9de14e4c005edf77b44f9c60a6005689505ab00436dd4c95` |

Each stepping-stone hop follows that archive's own documented migration
rules, including any breaking approval and review that release requires.
Nothing migrates silently, and the current adopter never reinterprets an
older contract.

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
| Recommendation or archive unavailable | Confirm network access to `raw.githubusercontent.com`, `github.com`, and the release-asset host Github redirects to, or supply the offline catalog and archive |
| Recommendation or archive mismatch | Confirm the reviewed catalog and exact content-addressed bytes |
| Out-of-window version refused | Follow the named stepping-stone archive; do not force the current adopter |
| Upgrade review required | Complete the written template's computed fresh set with a named reviewer |
| Predecessor 0.8 baseline not ready | Restore it through a governed 0.8 knowledge-maintenance operation first |
| Initial plan required | Complete agent assessment and seal the exact candidate |
| Predecessor pin or adopter mismatch | Restore reviewed installed bytes before migration |
| Adapter conflict | Reconcile project-owned instructions without deleting unrelated policy |
| Governed Markdown digest mismatch | Review source and declaration together |
| Unsupported repository or Root Profile | Stop; do not force a supported category or version |
| CI differs from local | Compare exact commit, Node.js version, pin, workflow, and archive bytes |

Keep recommendation, publication, consumer application, validation, and
remote enforcement as separate facts throughout recovery.
