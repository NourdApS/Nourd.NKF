# ADR 0035: Clarify Product Scope And Structural Hierarchy

- **Status:** Accepted
- **Task:** `NKF-003`
- **Proposed:** 30 July 2026
- **Accepted:** 30 July 2026
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Confirmation Source:** Direct confirmation in the NKF-003 discussion on
  30 July 2026 after review of the exact Product-scope and `part-of`
  alternatives
- **Related Proposal:**
  [`../designs/nkf-0.1-native-checker-realization-findings.md`](../designs/nkf-0.1-native-checker-realization-findings.md)

## Context

NKF 0.1 already distinguishes:

- every record's Product membership, declared through `scope.product`; and
- structural Product hierarchy, created only by `part-of`.

Normative Markdown defines the native structural hierarchy as:

```text
Product → Domain → Capability
```

It permits another record type to participate only when its body contract or
a supported extension defines that meaning. No other native core body
contract currently does so.

The executable companion nevertheless says `every_record_reaches_product:
true`. Applied to the `part-of` graph, that statement would require every
Principle, Concept, Journey, Design, Decision, Realization, and Evidence
record to use a relationship that native NKF does not authorize for those
bodies.

## Decision

### Product Membership

Every governed record remains in exactly one Product scope:

```text
record.scope.product == bundle.product_record
```

This is the native Product-membership rule for every record type.

### Structural Hierarchy

Native `part-of` remains limited to the accepted structural hierarchy:

```text
Product → Domain → Capability
```

The exact rules are:

- the Product root has no `part-of` parent;
- every Domain has exactly one Product parent;
- every Capability has exactly one Domain parent;
- every Domain and Capability reaches the Product root through those accepted
  edges;
- the `part-of` graph is acyclic; and
- another record type neither requires nor may invent a native `part-of`
  relationship unless a later accepted body contract or supported extension
  explicitly defines its participation.

`hierarchy.product-unreachable` applies only to a record required or permitted
to participate in the structural hierarchy. It does not apply merely because
a Principle, Concept, Journey, Design, Decision, Realization, or Evidence
record is Product-scoped.

### Other Typed Relationships

Non-hierarchical records remain connected to Product meaning through their
accepted typed relationships when the Markdown establishes those
relationships. Product scope alone does not invent `part-of`, `governs`,
`applies-to`, `realizes`, `evidences`, or another semantic edge.

## Compatibility

This Decision removes an executable overreach and makes the companion match
the already accepted Markdown hierarchy. It does not:

- broaden `part-of`;
- remove Product scope from any record;
- weaken Domain or Capability hierarchy requirements;
- infer relationships from file placement, links, or record type; or
- authorize an extension by implication.

Consumers that added unsupported `part-of` edges to non-hierarchical core
records must remove them or later adopt an accepted body or extension that
defines their meaning. Consumers do not need synthetic `part-of` edges merely
to prove Product membership.

## Realization

The coordinated NKF 0.1 authority replacement will:

1. state the Product-scope and structural-hierarchy distinction explicitly in
   normative Markdown;
2. replace `every_record_reaches_product` in executable YAML with the exact
   hierarchy-participant rule;
3. retain the existing `scope.product` equality rule;
4. narrow the `hierarchy.product-unreachable` trigger accordingly;
5. rebind all three schemas; and
6. update checker behavior and fixtures.

## Non-Claims

This Decision does not:

- accept a concrete extension;
- define hierarchy participation for another body;
- confirm checker completeness, distribution, or release;
- validate or accept a consumer bundle;
- confirm semantic adequacy; or
- confirm a Realization.
