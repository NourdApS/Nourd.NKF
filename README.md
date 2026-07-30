# Nourd Knowledge Format

Nourd Knowledge Format (**NKF**) is Company-owned **Shared Technology**
maintained by Nourd ApS. It is a human-readable, machine-verifiable format for
durable governed knowledge.

NKF is not a Product. A repository, Product, Shared Technology, Company, or
other eligible subject that uses NKF remains authoritative for its own meaning.
NKF defines format, declaration, compatibility, and conformance contracts; it
does not accept a consumer's knowledge or become authority for operational
state.

## Repository identity

| Property | Value |
| --- | --- |
| Owner | Nourd ApS |
| Classification | Shared Technology |
| Repository | `kaveh6202/Nourd.NKF` |
| Remote | `https://github.com/kaveh6202/Nourd.NKF.git` |
| Default branch | `master` |
| Local checkout | `/Users/kam/Documents/NourdApS/shared_technology/nourd_knowledge_format` |

This repository owns NKF specifications, profiles, executable contracts,
conformance tooling and fixtures, compatibility, migrations, releases,
distribution, security, and technical lifecycle.

## Current Stage

The independent authority migration is governed by Task `NKF-003`. NKF 0.1
now has one automatic non-selectable Common Specification and two selectable
Root Profiles: Product and Technology. ADR 0050 accepts the exact current
Markdown/YAML authority pair and the breaking pre-stable migration from
`product_record` and `scope.product` to `root` and `scope.root`.

This repository is an NKF Technology bundle. Its project-root
`.nourd/knowledge/bundle.yaml` selects `nkf.profile.technology`, represents
every Markdown file under `knowledge/`, and binds the executable contract,
schemas, checker source, tests, fixtures, build tooling, and project
configuration as governed artifacts. The latest full-bundle result is kept
locally at `.nourd/validation-result.json`.

Passing validation establishes current NKF conformance only. It does not
verify every historical acceptance binding, accept consumer knowledge,
confirm implementation correctness, or publish a release.

NKF remains open to evidence-driven change before its first stable release.
Real-project findings must move through governed reproduction, classification,
validation, confirmation, authoritative updates, release, and deliberate
consumer migration; pre-stable does not permit silent contract drift.
