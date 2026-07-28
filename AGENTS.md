# Repository identity

This directory is the independent Git repository for **Nourd Knowledge Format
(NKF)**, a Company-owned Shared Technology maintained by Nourd ApS.

| Property | Required value |
| --- | --- |
| Local workspace path | `/Users/kam/Documents/NourdApS/shared_technology/nourd_knowledge_format` |
| GitHub repository | `kaveh6202/Nourd.NKF` |
| Expected remote | `https://github.com/kaveh6202/Nourd.NKF.git` |
| Default branch | `master` |

The parent Nourd ApS repository ignores this complete directory. This
repository is not a submodule and owns its own technical knowledge, source,
contracts, tooling, history, releases, automation, compatibility, security,
and lifecycle.

# Operating rule

Do not guess or silently decide NKF scope, normative meaning, contracts,
profiles, authority, compatibility, conformance, or repository structure.
Establish each consequential decision from an authoritative source and keep
proposals distinct from accepted decisions.

Validation and conformance do not accept knowledge. A Git operation, checker
result, generated declaration, migration, or implementation cannot supply
human acceptance.

# Authority boundary

NKF owns:

- normative format and profile specifications;
- versioned bundle, record, body, extension, and compatibility contracts;
- conformance levels, deterministic checks, diagnostics, and fixtures;
- checker distribution and integrity;
- migrations between supported NKF contracts; and
- NKF releases, security, and lifecycle.

NKF does not own:

- a consumer's canonical meaning or acceptance decisions;
- Product, Shared Technology, Company, or Organization authority;
- Task, Workflow, execution, deployment, or other operational state;
- Nourd Knowledge Engine behavior beyond implementing supported NKF contracts;
- a future Nourd Knowledge Protocol runtime protocol merely because the names
  are related; or
- external systems, resources, permissions, observations, or authoritative
  data referenced by a bundle.

# Knowledge and Task work

The knowledge map begins at [`knowledge/README.md`](knowledge/README.md).

- `knowledge/tasks/` owns durable Task intent, constraints, acceptance
  criteria, and execution plans.
- `knowledge/designs/` owns evolving proposals.
- `knowledge/decisions/` owns immutable accepted decisions.
- `knowledge/specifications/` owns accepted normative NKF specifications and
  profile contracts.
- `knowledge/evidence/` owns reviewed source and migration evidence when it
  must remain part of the governed technical record.

Resolve an immutable Task identifier before Git-backed work. Record every AI
execution plan in the owning Task before executing it. Keep operational Git,
GitHub, check, package, and release state in their authoritative systems.

Accepted NKF records and decisions are immutable snapshots. A correction,
extension, replacement, or reversal requires a later governed revision with
explicit provenance and compatibility.

# Source migration

The Nourd Studio repository remains immutable provenance for the originally
accepted NKF 0.1 Product specification and its acceptance decision. Import
exact accepted sources with repository, path, commit, and digest provenance.
Do not edit or delete the originals as a shortcut.

Later NKF-002 checker work is proposal and implementation evidence until its
exact authority and compatibility are reconciled here. Do not present migrated
code as accepted normative meaning.

# Git boundary

Before any Git status inspection, branch operation, commit, push, pull, tag,
release, or workflow change, run:

```sh
git rev-parse --show-toplevel
git remote -v
```

Stop before changing Git state unless the results match the repository identity
above. Never commit or push NKF through the Nourd ApS Company repository or a
consumer repository.

# Collaboration standard

- Confirm one consequential format boundary at a time.
- Derive executable contracts from accepted normative meaning, not the other
  way around.
- Fail closed when a required contract, profile, extension, source binding, or
  compatibility rule is unsupported.
- Preserve human-readable canonical meaning, exact source binding, provenance,
  external authority, and operational-state separation.
- Challenge changes that create multiple NKF authorities, consumer-specific
  overfitting, false conformance, or silent semantic migration.
