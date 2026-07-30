# NKF 0.1 Native Checker Realization Findings

- **Status:** All five findings resolved through ADRs 0034 through 0040 and
  reflected in the development checker
- **Owning Task:** NKF-003
- **Recorded:** 30 July 2026
- **Evidence source:** First independent native-checker implementation and
  positive/negative fixture execution
- **Authority effect:** Findings do not alter authority by implication; their
  accepted resolutions are governed by the cited Decisions

## Purpose

This document records conformance-critical questions exposed by implementing
the accepted NKF 0.1 authority pair. It does not let checker code, passing
tests, or reviewer preference alter NKF meaning.

The findings are separate from implementation bugs. The checker can correct
its own bugs directly when accepted meaning already determines the answer.
Each finding below instead lacks one unambiguous executable answer in the
current authority.

## Finding 1: Invalid Markdown UTF-8 Has No Stable Diagnostic

**Resolution status:** Accepted mechanically by ADR 0034, first realized
through ADRs 0036 and 0037, and retained in the current authority and schemas
through ADRs 0039 and 0040.

The normative Markdown requires every record source to be UTF-8. The stable
native registry defines `yaml.utf8.invalid` only for YAML artifacts. It has no
rule whose semantic trigger is invalid UTF-8 in a record's Markdown source.

A checker therefore cannot both:

1. fail that source as required;
2. emit only accepted stable native diagnostics; and
3. construct the required completed conformance-failure result.

The development checker currently fails closed without a completed result for
this condition. It does not reuse the YAML rule or misclassify the bytes as a
missing source.

### Proposed Resolution

Add:

| Rule | Severity | Blocking | Phase |
| --- | --- | --- | --- |
| `markdown.utf8.invalid` | error | conformance | source |

The trigger is one safely readable declared record-source artifact whose exact
bytes are not valid UTF-8. The diagnostic identifies the project-relative
artifact and record ID but never copies invalid bytes.

## Finding 2: An Unresolved Contract-Validation Target Has No Stable Diagnostic

**Resolution status:** Accepted mechanically by ADR 0034, first realized
through ADRs 0036 and 0037, and retained in the current authority and schemas
through ADRs 0039 and 0040.

The `contract` request variant requires one non-null record ID and its result
scope is the uniquely resolved requested record. The accepted registry has no
diagnostic for a syntactically valid request whose target is missing or
ambiguous in the parsed bundle.

Without such a rule, an implementation could incorrectly report contract
conformance with an empty record scope. The development checker instead fails
closed without a completed result when all earlier required phases pass but
the requested record does not resolve uniquely.

### Proposed Resolution

Add:

| Rule | Severity | Blocking | Phase |
| --- | --- | --- | --- |
| `request.record.unresolved` | error | conformance | bundle-graph |

The trigger is a `contract` request whose `record_id` does not resolve to
exactly one uniquely identified governed record. The diagnostic may carry the
requested ID as `record_id`; it has no invented artifact or record result.

## Finding 3: Product Reachability Conflicts With Core Hierarchy Participation

**Resolution status:** Accepted by the Human Product Owner through ADR 0035,
first realized through ADRs 0036 and 0037, and retained in the current
authority and schemas through ADRs 0039 and 0040.

Normative Markdown defines the structural hierarchy as:

```text
Product → Domain → Capability
```

It says another record type may participate through `part-of` only when its
body contract or a supported profile defines the meaning. No other native core
body contract currently defines that participation.

The YAML companion additionally says `every_record_reaches_product: true`.
Read literally over the `part-of` graph, the executable rule makes a
Principle, Concept, Journey, Design, Decision, Realization, or Evidence record
unable to conform: it must reach Product through `part-of`, yet native NKF
does not authorize that record type to use `part-of`.

The Markdown already binds every record to the Product through
`scope.product`. Product membership therefore does not require broadening the
structural hierarchy.

### Proposed Resolution

Keep `part-of` as the Product–Domain–Capability hierarchy. Replace the
executable `every_record_reaches_product` statement with the narrower rule
that every record participating in the structural hierarchy must reach the
Product root. Continue to require every record's `scope.product` to equal the
bundle Product root.

Under this resolution:

- Product has no parent;
- Domain has the accepted Product parent/reachability rule;
- Capability has exactly one Domain parent and reaches Product;
- another core record type neither needs nor may invent a `part-of` edge
  unless later accepted body or extension meaning permits one; and
- `hierarchy.product-unreachable` applies to records required or permitted to
  participate in that hierarchy, not to every Product-scoped record.

Broadening native `part-of` to every core body type is not recommended because
it would change the accepted structural hierarchy and introduce undefined
directional meaning.

## Finding 4: The Minimal Example Violates The Accepted Title-Case Rule

**Resolution status:** Accepted editorially by ADR 0034, first realized
through ADRs 0036 and 0037, and retained in the current authority and schemas
through ADRs 0039 and 0040.

The canonical specification's minimal Product example uses headings including
`Product definition`, `People served`, `Needs and outcomes`, and `Product
map`. The same specification requires every word in participating H1, H2, and
H3 comparison strings to be Unicode 17 Title Cased.

The conforming spellings are `Product Definition`, `People Served`, `Needs
And Outcomes`, and `Product Map`, with matching `heading_path` values.

### Proposed Resolution

Correct only the example headings and their declaration paths. This is an
editorial conformance repair, not a change to Product meaning or the accepted
Title-Case rule. Because canonical bytes are digest-bound, it still requires
the normal replacement, acceptance, promotion, and derived-schema rebind.

## Coordinated Authority Update

If all four resolutions are eventually accepted, one coordinated replacement
of the Markdown/YAML pair should:

1. add the two missing diagnostics and exact triggers;
2. reconcile Product reachability without broadening the core hierarchy;
3. repair the minimal example;
4. retain every unrelated NKF 0.1 rule byte-semantically;
5. rebind all three derived schemas; and
6. update the checker and fixture matrix from the accepted replacement.

Combining the confirmed fixes avoids a chain of intermediate canonical
digests. It does not combine their Product Owner decisions: each semantic
boundary remains separately reviewable and confirmable.

That coordinated update was accepted and promoted through ADRs 0036 and 0037.

## Finding 5: Missing Project Metadata Has No Reachable Project-Phase Result

**Resolution status:** Accepted by the Human Product Owner through ADR 0038,
realized in the current authority and schemas through ADRs 0039 and 0040, and
implemented in the development checker and fixture suite.

Native NKF fixes the manifest at `.nourd/knowledge/bundle.yaml`. The accepted
phase order evaluates `parse` before `schema` and `project`, and makes a later
phase `not-evaluated` when an earlier failure makes it unsafe or meaningless.

If project-root `.nourd` is missing:

1. the fixed manifest is necessarily missing;
2. `bundle.manifest.missing` fails the earlier `parse` phase;
3. `project` is not evaluated; and
4. the stable project-phase rule `project.nourd.missing` cannot appear in a
   completed validation result under the accepted sequencing.

For a persisted full-bundle request, the checker also cannot atomically place
the result at `.nourd/validation-result.json` without creating the missing
governance directory, which would exceed its validation-only responsibility.

This is not a checker implementation bug that code can choose silently. Rule
phase is stable contract behavior, and changing invocation preconditions,
phase evaluation, persistence, or the registry changes accepted behavior.

### Accepted Resolution

ADR 0038 accepts the recommended first choice: project-root `.nourd` is a
native-checker invocation precondition. If it is missing, unsafe, or does not
resolve to an in-project directory, the checker fails at the execution level
before validation, constructs and persists no result, and does not initialize
or repair the target. `project.nourd.missing` is retired.

ADRs 0039 and 0040 realize that exact boundary in the canonical authority pair
and source-bound schemas. The development checker implements the precondition
before contract loading and retains `bundle.manifest.missing` when `.nourd`
passes preflight but the fixed manifest is absent.

### Considered Choices

1. **Treat `.nourd` as an invocation precondition and retire
   `project.nourd.missing` — recommended.** Absence means the target is not an
   initialized NKF project. A checker may report an execution-level message
   outside `nkf.validation-result`; it does not invent or persist a native
   result.
2. **Move `project.nourd.missing` to `parse`.** This preserves a native
   diagnostic distinction but changes its stable phase and requires exact
   behavior alongside `bundle.manifest.missing`.
3. **Permit safe project preflight despite parse failure.** This requires a
   more complex partial-phase model and must define whether `project` is
   `failed` or `not-evaluated`, plus how a full-bundle result can exist without
   its required persistence directory.

The development fixture-reference matrix now covers all 115 stable native
diagnostics. Separate invocation tests cover absent, non-directory,
out-of-project, and safely contained-symlink `.nourd` paths. Package
verification and built-CLI checks pass, but those implementation results do
not themselves confirm a Realization or produce consumer conformance.
