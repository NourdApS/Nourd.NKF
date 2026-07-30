# NKF 0.1 Native Realization

## Realization Identity And Kind

The NKF 0.1 Native Realization is the repository-owned executable realization
of the accepted NKF 0.1 Specification. It consists of the executable contract,
derived schemas, checker source, tests, fixtures, build tooling, and project
configuration bound by the Technology bundle.

## Governed Meaning Realized

This Realization implements the accepted Common Specification and the Product
and Technology Root Profiles. The canonical Markdown Specification remains
authoritative when a derived artifact conflicts with it.

## Durable Mapping

The project-root `.nourd/knowledge/bundle.yaml` enumerates each technical file
whose exact bytes participate in NKF self-validation. Every entry carries a
SHA-256 digest and binds to this section.

## Responsibilities And Ownership Boundaries

The NKF repository owns the executable companion, schemas, checker, fixtures,
tests, and build configuration. Consumer projects own their declarations,
canonical meaning, acceptance, migrations, and operational use.

## Interfaces Dependencies Locators And Resolution

The native command-line checker reads a project-root `.nourd` declaration,
resolves the selected supported Root Profile from its trusted contract set,
and emits `nkf.validation-result`. Node.js and pinned package dependencies are
implementation dependencies, not NKF semantic authorities.

## External Authority And Operational State Boundaries

Git, Github Releases, package registries, consumer repositories, and runtime
systems remain authoritative for their own operational state. NKF records
durable locators and integrity bindings without copying live deployment,
account, permission, health, or execution state into canonical knowledge.

## Compatibility Verification And Recovery

Type checking, unit tests, positive and negative fixtures, build verification,
and self-host validation provide implementation evidence. They do not accept
meaning or prove semantic adequacy. Git history and governed replacement
Decisions preserve recovery, while consumers migrate deliberately.
