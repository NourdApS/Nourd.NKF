# NKF-023 NKF 0.3 Exact Candidate Audit

## Audit Identity

- **Audited release commit:**
  `8a06564e1c91069db19581ca5bfa22770ac95fb5`
- **Candidate archive:**
  `nourd-nkf-sha256-34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4.tar`
- **Archive SHA-256:**
  `34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4`
- **Checker SHA-256:**
  `804c082c3f1c8beebc24d044f23581cdafcf2fbac40aecbfff1ae0c75fbe807d`
- **Adopter SHA-256:**
  `9e20219d8b92a0b38086da48311f2d2bfd14f8676fa8256e9efcefaaa938afc5`
- **Audit completed:** `2026-08-11T10:43:49Z`
- **Mode:** Complete fresh read-only review from a full-history remote clone,
  independent archive parsing and reproduction, extracted tools, isolated
  supported repository states, adversarial mutations, and authenticated
  remote-state inspection

This audit is Evidence. It does not accept NKF meaning, exercise delegated
technical confirmation, publish or recommend a release, adopt the producer,
confirm a consumer Realization, establish remote enforcement, or make
Governing Use ready.

## Accepted Boundary Under Review

[ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
requires immutable release bytes, exact-candidate producer self-adoption,
independent audit before technical confirmation, a general verified
host-superset integration, and separately approved breaking 0.1-to-0.3 and
0.2-to-0.3 migrations. [ADR 0110](../../decisions/0110-accept-the-nkf-0-3-authority-pair.md)
accepts the exact NKF 0.3 normative Markdown and executable companion.

The first complete candidate audit found one release-blocking contradiction:
the accepted authority and CLI token required repository-owner approval, but
the built adopter diagnostic and two public guides named the Human Product
Owner. Candidate `ac88e0bc...` was rejected and never published. This audit
starts again from fresh state over the corrected replacement candidate; no
conclusion from the rejected candidate is carried forward by assumption.

## Independent Method And Results

1. Raw POSIX USTAR parsing verified every header checksum, safe relative path,
   regular-file type, canonical uid, gid, and mtime, exact two-block
   terminator, absence of duplicates, and exact release-set order. The archive
   contains 135 members: 134 use mode `0644`, and
   `dist/nourd-nkf-checker.mjs` is the sole `0755` member.
2. Strict release-manifest Schema validation passed. Every one of the 134
   non-manifest path, mode, and digest bindings matches the extracted bytes.
   The release set covers all 135 members, one generated manifest, all 18
   closed classes, and every declared selector result.
3. Accepted authority digests match the exact archive bytes: Markdown
   `0094bedce5485901c3ab6fb542e3d2785e961991cf7cc6f24e9aa3462498436e`
   and executable YAML
   `e988a596e741d48611a5f77a9236e9d539f9a7475a76f07768bc273a8bf4d27f`.
   All four Schema digests, checker, adopter, fixtures, examples, protocols,
   portable skills, host adapters, and public documentation bind and are
   complete. The normative and executable representations agree on version,
   publication freeze, release distribution, and predecessor-relative
   compatibility.
4. A fresh full-history remote clone proved the exact release commit exists
   and is an ancestor of `origin/task/NKF-023`. `npm ci`, two deterministic
   builds, all 202 tests, and an independent comparison of all 134
   source-derived members passed. Fresh packaging reproduced the candidate
   archive byte-for-byte at the expected SHA-256.
5. The extracted checker passed Product and Technology fixtures and both
   public examples at full-bundle level with zero diagnostics. Governing Use
   remained correctly `not-ready`.
6. Fresh Empty Product and Technology repositories completed inspect, seal,
   and Adopt as `onboarded`, passed their installed gates, and returned
   `current` on repetition. Native unpinned Product and Technology 0.3
   fixtures returned `updated`, then `current`.
7. Raw 0.1 and host-superset 0.2 repositories failed closed before approval
   while retaining byte-identical snapshots. Both migrated only with
   `--accept-breaking repository-owner`, recorded
   `approved_by: repository-owner`, passed the installed gates, and returned
   `current` on repetition.
8. The corrected built diagnostics for both predecessor paths name only
   repository-owner approval and expose the exact required CLI token. Both
   public migration guides use repository-owner or repository-authority. An
   archive-wide targeted scan found no stale Human Product Owner approval
   instruction on the breaking-migration surface.
9. The host-superset migration preserved the existing host command, exact
   CLAUDE and GEMINI imports, Copilot bootstrap, package-script chain,
   integration registry, release pin, and stronger host gate.
10. An injected post-write onboarding failure rolled back to zero project
    entries. Archive, release-pin, package-chain, and governed-knowledge
    tampering all failed closed. Repeat `current` was byte-idempotent except
    for the deliberately refreshed validation-result execution identity and
    timestamps.
11. `release/recommended.json` remained byte-identical private NKF 0.2 at
    SHA-256 `d1cc894e3ecb8f28716b7bd20b27d9e905967b2e7f32dde9f2371f1f6df57c8e`,
    and the producer bundle still declared NKF 0.2. No
    local or remote candidate tag existed, and the exact GitHub candidate
    release was absent. The candidate remained unpublished and unrecommended.
    The candidate worktree was clean when inspected.

All temporary clones, extractions, consumer repositories, and adversarial
mutations remained under
`/private/tmp/nkf-023-fresh-34bd-audit.PYVGEI`. The independent reviewer made
no repository edit, commit, tag, release, recommendation change, or
real-producer mutation.

## Findings And Boundaries

The verdict is `CLEAN`. No material candidate finding remains.

The following boundaries remain separate:

- NKF 0.3 authority is accepted by ADR 0110;
- delegated technical confirmation is a later Decision and is not supplied by
  this Evidence;
- publication, recommendation promotion, and real producer adoption have not
  occurred;
- the current-system Realization still records the 0.3 implementation as
  technically unconfirmed;
- remote merge enforcement was not established; and
- validation did not make acceptance bindings or Governing Use ready.

## Audit Conclusion

The exact implementation and private archive faithfully realize the accepted
NKF 0.3 release, compatibility, immutable-freeze, and producer-integration
boundaries. They are suitable for separate delegated technical confirmation
and exact publication. This conclusion makes neither act by itself.
