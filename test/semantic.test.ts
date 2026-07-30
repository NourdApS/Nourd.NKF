import { beforeAll, describe, expect, it } from "vitest";
import { loadContracts } from "../src/checker/contracts.js";
import { RuleEmitter } from "../src/checker/diagnostics.js";
import {
  attachCoreVocabularies,
  validateGraph,
  validateRecordContracts,
  type RecordUnit,
} from "../src/checker/semantic.js";
import { contractRoot } from "./helpers.js";

let executable: Record<string, any>;

beforeAll(async () => {
  executable = (await loadContracts(contractRoot)).executable;
});

function unit(
  id: string,
  type: string,
  bodyContract: string,
  overrides: Record<string, unknown> = {},
): RecordUnit {
  return {
    artifact: `.nourd/knowledge/records/${id}.yaml`,
    declaration: {
      contract: "nkf.record",
      id,
      type,
      body_contract: bodyContract,
      governance: {
        lifecycle: "living",
        status: "draft",
        authority: ["human-product-owner"],
      },
      scope: { product: "product" },
      sections: [{
        id: "section",
        authority: "proposal",
        role: "governing",
        responsibilities: [],
      }],
      relationships: [],
      ...overrides,
    },
    declarationDigest: "a".repeat(64),
    sourceDigest: "b".repeat(64),
    sourceValid: true,
  };
}

function graphRules(
  bundle: Record<string, unknown>,
  records: RecordUnit[],
): string[] {
  const emitter = new RuleEmitter(executable);
  attachCoreVocabularies(records, executable);
  validateGraph(bundle, records, emitter);
  return emitter.diagnostics.map((diagnostic) => diagnostic.rule_id);
}

function contractRules(records: RecordUnit[]): string[] {
  const emitter = new RuleEmitter(executable);
  validateRecordContracts(
    records,
    new Set(records.map((record) => String(record.declaration.id))),
    executable,
    emitter,
  );
  return emitter.diagnostics.map((diagnostic) => diagnostic.rule_id);
}

describe("bundle graph semantics", () => {
  it("reports missing, multiple, and invalid Product roots", () => {
    expect(graphRules({ product_record: "product" }, [])).toEqual(
      expect.arrayContaining(["bundle.product.missing", "bundle.product.invalid"]),
    );
    const first = unit("product", "product", "nkf.product");
    const second = unit("other-product", "product", "nkf.product");
    expect(
      graphRules({ product_record: "product" }, [first, second]),
    ).toContain("bundle.product.multiple");
    expect(
      graphRules({ product_record: "missing" }, [first]),
    ).toContain("bundle.product.invalid");
  });

  it("checks record relationships, scope, and exact duplicates", () => {
    const product = unit("product", "product", "nkf.product", {
      scope: { product: "other" },
      relationships: [
        { type: "unknown", target: "missing", source_section: "missing" },
        { type: "unknown", target: "missing", source_section: "missing" },
      ],
    });
    expect(graphRules({ product_record: "product" }, [product])).toEqual(
      expect.arrayContaining([
        "scope.product.mismatch",
        "relationship.type.unsupported",
        "relationship.target.unresolved",
        "relationship.section.unresolved",
        "relationship.duplicate",
      ]),
    );
  });

  it("enforces only the Product-Domain-Capability structural hierarchy", () => {
    const product = unit("product", "product", "nkf.product", {
      relationships: [
        { type: "part-of", target: "product", source_section: "section" },
      ],
    });
    const domain = unit("domain", "domain", "nkf.domain");
    const capability = unit("capability", "capability", "nkf.capability", {
      relationships: [
        { type: "part-of", target: "product", source_section: "section" },
      ],
    });
    const principle = unit("principle", "principle", "nkf.principle", {
      relationships: [
        { type: "part-of", target: "product", source_section: "section" },
      ],
    });
    const rules = graphRules(
      { product_record: "product" },
      [product, domain, capability, principle],
    );
    expect(rules).toEqual(
      expect.arrayContaining([
        "hierarchy.product-parent.invalid",
        "hierarchy.domain-parent.invalid",
        "hierarchy.capability-parent.invalid",
        "hierarchy.product-unreachable",
        "hierarchy.participation.unsupported",
      ]),
    );
  });

  it("detects a record part-of cycle", () => {
    const product = unit("product", "product", "nkf.product");
    const domain = unit("domain", "domain", "nkf.domain", {
      relationships: [
        { type: "part-of", target: "capability", source_section: "section" },
      ],
    });
    const capability = unit("capability", "capability", "nkf.capability", {
      relationships: [
        { type: "part-of", target: "domain", source_section: "section" },
      ],
    });
    expect(
      graphRules(
        { product_record: "product" },
        [product, domain, capability],
      ),
    ).toContain("hierarchy.part-of.cycle");
  });
});

describe("record contract semantics", () => {
  it("checks section, body, responsibility, and governance rules", () => {
    const product = unit("product", "product", "nkf.product", {
      governance: {
        lifecycle: "immutable",
        status: "draft",
        authority: ["human-product-owner"],
      },
      sections: [
        {
          id: "duplicate",
          authority: "unsupported",
          role: "unsupported",
          responsibilities: ["unsupported-responsibility"],
        },
        {
          id: "duplicate",
          authority: "proposal",
          role: "unresolved",
          responsibilities: [],
        },
        {
          id: "content",
          authority: "proposal",
          role: "content",
          responsibilities: ["purpose"],
        },
      ],
    });
    const mismatch = unit("mismatch", "principle", "nkf.product");
    const unsupported = unit("unsupported", "principle", "com.example.body");
    const decision = unit("decision", "decision", "nkf.decision", {
      governance: {
        lifecycle: "living",
        status: "accepted",
        authority: ["human-product-owner"],
        accepted_at: "2026-07-30",
      },
    });
    expect(contractRules([product, mismatch, unsupported, decision])).toEqual(
      expect.arrayContaining([
        "section.id.duplicate",
        "section.authority.unsupported",
        "section.role.unsupported",
        "section.unresolved.authority-mismatch",
        "section.content.responsibility-forbidden",
        "body.unsupported",
        "body.type-mismatch",
        "body.responsibility.unsupported",
        "body.responsibility.missing",
        "governance.product.lifecycle",
        "governance.decision.lifecycle",
      ]),
    );
  });

  it("checks provenance, external authority, entities, relationships, and bindings", () => {
    const product = unit("product", "product", "nkf.product", {
      provenance: {
        sources: [
          { id: "source", locator: "urn:one" },
          { id: "source", locator: "urn:two" },
        ],
        primary_observation: {
          method: "inspection",
          source_section: "missing",
        },
      },
      external_authorities: [
        {
          id: "authority",
          authority: "Example",
          relationship: "owns",
          locator: "urn:one",
          source_section: "missing",
        },
        {
          id: "authority",
          authority: "Example",
          relationship: "owns",
          locator: "urn:two",
          source_section: "missing",
        },
      ],
      entities: [
        { id: "one", kind: "system", defining_section: "missing" },
        { id: "one", kind: "system", defining_section: "missing" },
        { id: "two", kind: "actor", defining_section: "section" },
      ],
      entity_relationships: [
        {
          type: "unknown",
          source: { record: "product", entity: "one" },
          target: { record: "product", entity: "one" },
          source_section: "missing",
        },
        {
          type: "unknown",
          source: { record: "product", entity: "one" },
          target: { record: "product", entity: "one" },
          source_section: "missing",
        },
        {
          type: "observes",
          source: { record: "missing", entity: "missing" },
          target: { record: "product", entity: "missing" },
          source_section: "section",
        },
      ],
      bindings: [
        {
          entity: { record: "missing", entity: "missing" },
          realization: "missing",
          kind: "unknown",
          source_section: "missing",
          external_authority: "missing",
        },
        {
          entity: { record: "missing", entity: "missing" },
          realization: "missing",
          kind: "unknown",
          source_section: "missing",
          external_authority: "missing",
        },
        {
          entity: { record: "product", entity: "two" },
          realization: "product",
          kind: "provider",
          source_section: "section",
          locator: "urn:provider",
        },
      ],
    });
    expect(contractRules([product])).toEqual(
      expect.arrayContaining([
        "provenance.source-id.duplicate",
        "provenance.observation-section.unresolved",
        "external-authority.id.duplicate",
        "external-authority.section.unresolved",
        "entity.id.duplicate",
        "entity.kind.unsupported",
        "entity.section.unresolved",
        "entity-reference.record.unresolved",
        "entity-reference.entity.unresolved",
        "entity-relationship.type.unsupported",
        "entity-relationship.section.unresolved",
        "entity-relationship.source-owner.invalid",
        "entity-relationship.self",
        "entity-relationship.duplicate",
        "entity-relationship.type-constraint",
        "binding.kind.unsupported",
        "binding.entity.unresolved",
        "binding.realization.unresolved",
        "binding.realization-owner.invalid",
        "binding.section.unresolved",
        "binding.external-authority.unresolved",
        "binding.locator.missing",
        "binding.duplicate",
        "binding.provider-authority.missing",
      ]),
    );
  });

  it("requires Evidence provenance", () => {
    expect(
      contractRules([unit("evidence", "evidence", "nkf.evidence")]),
    ).toContain("evidence.provenance.missing");
  });

  it("detects entity part-of cycles across record boundaries", () => {
    const first = unit("first", "concept", "nkf.concept", {
      entities: [
        { id: "entity", kind: "domain-entity", defining_section: "section" },
      ],
      entity_relationships: [{
        type: "part-of",
        source: { record: "first", entity: "entity" },
        target: { record: "second", entity: "entity" },
        source_section: "section",
      }],
    });
    const second = unit("second", "concept", "nkf.concept", {
      entities: [
        { id: "entity", kind: "domain-entity", defining_section: "section" },
      ],
      entity_relationships: [{
        type: "part-of",
        source: { record: "second", entity: "entity" },
        target: { record: "first", entity: "entity" },
        source_section: "section",
      }],
    });
    expect(contractRules([first, second])).toContain(
      "entity-relationship.part-of.cycle",
    );
  });
});
