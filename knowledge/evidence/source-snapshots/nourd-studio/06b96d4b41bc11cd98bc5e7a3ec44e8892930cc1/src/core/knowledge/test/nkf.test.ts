import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it } from "vitest";
import { parse, stringify } from "yaml";

import {
  reconcileNkfKnowledge,
  validateNkfKnowledge,
} from "../src/nkf.js";
import type {
  NkfBundle,
  NkfContractSet,
  NkfRecord,
} from "../src/nkf-types.js";

const thisFile = fileURLToPath(import.meta.url);
const packageRoot = path.resolve(path.dirname(thisFile), "..");
const contractSet = JSON.parse(
  readFileSync(
    path.join(
      packageRoot,
      "contracts",
      "nkf",
      "0.1",
      "contract-set.json",
    ),
    "utf8",
  ),
) as NkfContractSet;
const temporaryRepositories: string[] = [];

function write(filePath: string, contents: string | Buffer): void {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents);
}

function digest(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function heading(value: string): string {
  const words = value.replaceAll("-", " ");
  return `${words[0]!.toUpperCase()}${words.slice(1)}`;
}

function recordId(type: string): string {
  return type === "product" ? "product" : `${type}-one`;
}

function sourcePath(id: string): string {
  return `knowledge/${id}.md`;
}

function persistRecord(repository: string, record: NkfRecord): void {
  const source = readFileSync(path.join(repository, record.source.path));
  record.source.digest.value = digest(source);
  write(
    path.join(
      repository,
      ".nourd",
      "knowledge",
      "records",
      `${record.id}.yaml`,
    ),
    stringify(record, { lineWidth: 0, sortMapEntries: false }),
  );
}

function loadRecord(repository: string, id: string): NkfRecord {
  return parse(
    readFileSync(
      path.join(
        repository,
        ".nourd",
        "knowledge",
        "records",
        `${id}.yaml`,
      ),
      "utf8",
    ),
  ) as NkfRecord;
}

function mutateRecord(
  repository: string,
  id: string,
  mutate: (record: NkfRecord) => void,
): void {
  const record = loadRecord(repository, id);
  mutate(record);
  persistRecord(repository, record);
}

function fixture(): string {
  const repository = mkdtempSync(path.join(tmpdir(), "nkf-knowledge-"));
  temporaryRepositories.push(repository);

  const bundle: NkfBundle = {
    nkf_version: "0.1",
    contract: "nkf.bundle/v1",
    id: "test-product",
    product_record: "product",
    markdown_root: "../../knowledge",
    records_root: "records",
    record_contract: "nkf.record/v1",
    non_records: [{ path: "knowledge/README.md", kind: "navigation" }],
  };
  write(
    path.join(repository, ".nourd", "knowledge", "bundle.yaml"),
    stringify(bundle),
  );
  write(path.join(repository, "knowledge", "README.md"), "# Navigation\n");

  for (const [bodyContract, definition] of Object.entries(
    contractSet.body_contracts,
  )) {
    const id = recordId(definition.type);
    const title = `Test ${heading(definition.type)}`;
    const markdown = [
      `# ${title}`,
      "",
      ...definition.required_responsibilities.flatMap((responsibility) => [
        `## ${heading(responsibility)}`,
        "",
        `Content for ${responsibility}.`,
        "",
      ]),
    ].join("\n");
    write(path.join(repository, sourcePath(id)), markdown);
    const firstSection = definition.required_responsibilities[0]!;
    const record: NkfRecord = {
      contract: "nkf.record/v1",
      id,
      type: definition.type,
      body_contract: bodyContract,
      title,
      source: {
        path: sourcePath(id),
        digest: { algorithm: "sha-256", value: "" },
      },
      governance: {
        lifecycle: "living",
        status: "draft",
        authority: ["human-product-owner"],
      },
      scope: { product: "product" },
      sections: definition.required_responsibilities.map((responsibility) => ({
        id: responsibility,
        heading_path: [heading(responsibility)],
        occurrence: 1,
        authority: "proposal",
        role: definition.allowed_roles[0]!,
        responsibilities: [responsibility],
      })),
      relationships:
        definition.type === "domain"
          ? [
              {
                type: "part-of",
                target: "product",
                source_section: firstSection,
              },
            ]
          : definition.type === "capability"
            ? [
                {
                  type: "part-of",
                  target: "domain-one",
                  source_section: firstSection,
                },
              ]
            : [],
      ...(definition.type === "evidence"
        ? {
            provenance: {
              sources: [
                {
                  id: "fixture-source",
                  locator: "urn:nkf:test-fixture",
                },
              ],
            },
          }
        : {}),
    };
    persistRecord(repository, record);
  }

  execFileSync("git", ["init", "-b", "main"], { cwd: repository });
  execFileSync("git", ["config", "user.email", "nkf@example.invalid"], {
    cwd: repository,
  });
  execFileSync("git", ["config", "user.name", "NKF Test"], {
    cwd: repository,
  });
  execFileSync("git", ["add", "."], { cwd: repository });
  execFileSync("git", ["commit", "-m", "fixture base"], {
    cwd: repository,
    stdio: "ignore",
  });
  return repository;
}

function expectRule(repository: string, rule: string): void {
  const result = validateNkfKnowledge(repository);
  expect(result.outcome).toBe("failed");
  expect(
    result.diagnostics.some((diagnostic) => diagnostic.rule === rule),
    JSON.stringify(result.diagnostics, null, 2),
  ).toBe(true);
}

afterEach(() => {
  for (const repository of temporaryRepositories.splice(0)) {
    rmSync(repository, { recursive: true, force: true });
  }
});

describe("NKF 0.1 complete conformance", () => {
  it("validates one complete bundle containing all ten core body contracts", () => {
    const repository = fixture();
    const result = validateNkfKnowledge(repository);

    expect(result.outcome, JSON.stringify(result.diagnostics, null, 2)).toBe(
      "passed",
    );
    expect(result.affected_records).toHaveLength(10);
    expect(result.authority_state).toBe("conformance-only");
    expect(result.conformance).toMatchObject({
      format: "nkf",
      nkf_version: "0.1",
      structural: "passed",
      contracts: "passed",
      full_bundle: "passed",
      profile: "not-requested",
    });
  });

  it("fails every body contract when one required responsibility is unbound", () => {
    for (const definition of Object.values(contractSet.body_contracts)) {
      const repository = fixture();
      const id = recordId(definition.type);
      mutateRecord(repository, id, (record) => {
        delete record.sections[0]!.responsibilities;
      });
      const result = validateNkfKnowledge(repository);
      expect(
        result.diagnostics.some(
          ({ rule, record_id }) =>
            rule === "body-contract.responsibility-required" &&
            record_id === id,
        ),
        `${definition.type}: ${JSON.stringify(result.diagnostics, null, 2)}`,
      ).toBe(true);
    }
  });

  it("rejects an unsupported responsibility and role", () => {
    const repository = fixture();
    mutateRecord(repository, "product", (record) => {
      record.sections[0]!.responsibilities = ["invented-responsibility"];
      record.sections[0]!.role = "invented-role";
    });

    expectRule(repository, "body-contract.responsibility-supported");
    expectRule(repository, "section.role-supported");
  });

  it("requires exact UTF-8, H1, title, digest, and complete section mapping", () => {
    const repository = fixture();
    write(path.join(repository, "knowledge", "concept-one.md"), Buffer.from([0xff]));
    expectRule(repository, "record.source-utf8");

    const repositoryTwo = fixture();
    write(
      path.join(repositoryTwo, "knowledge", "principle-one.md"),
      `${readFileSync(
        path.join(repositoryTwo, "knowledge", "principle-one.md"),
        "utf8",
      )}\n## Unmapped\n\nMeaning.\n`,
    );
    mutateRecord(repositoryTwo, "principle-one", () => {});
    expectRule(repositoryTwo, "section.heading-covered");

    const repositoryThree = fixture();
    mutateRecord(repositoryThree, "concept-one", (record) => {
      record.title = "Wrong title";
    });
    expectRule(repositoryThree, "record.title");
  });

  it("requires exactly one living Product root and root-aligned scope", () => {
    const repository = fixture();
    mutateRecord(repository, "product", (record) => {
      record.governance.lifecycle = "immutable";
    });
    expectRule(repository, "governance.product-living");

    const repositoryTwo = fixture();
    mutateRecord(repositoryTwo, "concept-one", (record) => {
      record.scope.product = "concept-one";
    });
    expectRule(repositoryTwo, "scope.product-root");
  });

  it("requires relationship targets and exact source-section traceability", () => {
    const repository = fixture();
    mutateRecord(repository, "concept-one", (record) => {
      record.relationships.push({
        type: "references",
        target: "missing-record",
        source_section: record.sections[0]!.id,
      });
    });
    expectRule(repository, "relationship.target-resolves");

    const repositoryTwo = fixture();
    mutateRecord(repositoryTwo, "concept-one", (record) => {
      record.relationships.push({
        type: "references",
        target: "product",
        source_section: "missing-section",
      });
    });
    expectRule(repositoryTwo, "relationship.section-resolves");
  });

  it("enforces the acyclic Product-Domain-Capability hierarchy", () => {
    const repository = fixture();
    mutateRecord(repository, "domain-one", (record) => {
      record.relationships[0]!.target = "domain-one";
    });
    expectRule(repository, "hierarchy.part-of-cycle");
    expectRule(repository, "hierarchy.product-reachability");

    const repositoryTwo = fixture();
    mutateRecord(repositoryTwo, "capability-one", (record) => {
      record.relationships = [];
    });
    expectRule(repositoryTwo, "hierarchy.capability-parent");
  });

  it("requires Evidence provenance or a source-bound primary observation", () => {
    const repository = fixture();
    mutateRecord(repository, "evidence-one", (record) => {
      delete record.provenance;
    });
    expectRule(repository, "evidence.provenance-required");

    const repositoryTwo = fixture();
    mutateRecord(repositoryTwo, "evidence-one", (record) => {
      record.provenance = {
        primary_observation: {
          method: "Direct observation",
          source_section: record.sections[0]!.id,
        },
      };
    });
    const result = validateNkfKnowledge(repositoryTwo);
    expect(result.outcome, JSON.stringify(result.diagnostics, null, 2)).toBe(
      "passed",
    );
  });

  it("resolves semantic entities, entity relationships, bindings, and external authorities", () => {
    const repository = fixture();
    mutateRecord(repository, "concept-one", (record) => {
      const section = record.sections[0]!.id;
      record.entities = [
        { id: "shared-concept", kind: "concept", defining_section: section },
      ];
      record.external_authorities = [
        {
          id: "external-system",
          authority: "Example operator",
          relationship: "controls-operation",
          source_section: section,
          locator: "urn:example:operator",
        },
      ];
      record.entity_relationships = [
        {
          type: "references",
          source: { record: "concept-one", entity: "shared-concept" },
          target: { record: "concept-one", entity: "shared-concept" },
          source_section: section,
        },
      ];
      record.bindings = [
        {
          entity: { record: "concept-one", entity: "shared-concept" },
          realization: "realization-one",
          kind: "implementation",
          source_section: section,
          locator: "src/example.ts",
          external_authority: "external-system",
        },
      ];
    });
    const result = validateNkfKnowledge(repository);
    expect(result.outcome, JSON.stringify(result.diagnostics, null, 2)).toBe(
      "passed",
    );

    mutateRecord(repository, "concept-one", (record) => {
      record.bindings![0]!.entity.entity = "missing";
    });
    expectRule(repository, "binding.entity-resolves");
  });

  it("fails closed for unsupported required extensions", () => {
    const repository = fixture();
    const bundlePath = path.join(
      repository,
      ".nourd",
      "knowledge",
      "bundle.yaml",
    );
    const bundle = parse(readFileSync(bundlePath, "utf8")) as NkfBundle;
    bundle.required_extensions = ["example.required/v1"];
    bundle.extensions = { "example.required/v1": { enabled: true } };
    write(bundlePath, stringify(bundle));
    expectRule(repository, "extension.required-unsupported");
  });

  it("rejects unclassified material, path escapes, and high-confidence secret material", () => {
    const repository = fixture();
    write(path.join(repository, "knowledge", "unclassified.txt"), "data");
    expectRule(repository, "record.classification-required");

    const repositoryTwo = fixture();
    const outside = path.join(repositoryTwo, "..", `${path.basename(repositoryTwo)}-outside.md`);
    write(outside, "# Outside\n");
    symlinkSync(
      outside,
      path.join(repositoryTwo, "knowledge", "outside-link.md"),
    );
    expectRule(repositoryTwo, "bundle.markdown-symlink");
    rmSync(outside, { force: true });

    const repositoryThree = fixture();
    const productPath = path.join(repositoryThree, "knowledge", "product.md");
    write(
      productPath,
      `${readFileSync(productPath, "utf8")}\n-----BEGIN PRIVATE KEY-----\n`,
    );
    mutateRecord(repositoryThree, "product", () => {});
    expectRule(repositoryThree, "security.secret-material");
  });

  it("requires immutable lifecycle for an accepted Decision", () => {
    const repository = fixture();
    mutateRecord(repository, "decision-one", (record) => {
      record.governance.status = "accepted";
    });
    expectRule(repository, "governance.accepted-decision-immutable");
  });

  it("reconciles only the exact deterministic source digest", () => {
    const repository = fixture();
    const source = path.join(repository, "knowledge", "journey-one.md");
    write(
      source,
      readFileSync(source, "utf8").replace(
        "Content for purpose",
        "Revised content for purpose",
      ),
    );
    expectRule(repository, "record.source-digest");

    expect(reconcileNkfKnowledge(repository, "journey-one")).toEqual([
      "journey-one",
    ]);
    const result = validateNkfKnowledge(repository);
    expect(result.outcome, JSON.stringify(result.diagnostics, null, 2)).toBe(
      "passed",
    );
  });

  it("fails closed on an unavailable accepted base and preserves proposal authority", () => {
    const repository = fixture();
    const missing = validateNkfKnowledge(repository, {
      baseRef: "definitely-not-a-ref",
    });
    expect(missing.outcome).toBe("failed");
    expect(
      missing.diagnostics.some(({ rule }) => rule === "profile.base-ref"),
    ).toBe(true);

    const productPath = path.join(repository, "knowledge", "product.md");
    write(
      productPath,
      readFileSync(productPath, "utf8").replace(
        "Content for purpose.",
        "Revised content for purpose.",
      ),
    );
    reconcileNkfKnowledge(repository, "product");
    const proposal = validateNkfKnowledge(repository, { baseRef: "main" });
    expect(proposal.outcome, JSON.stringify(proposal.diagnostics, null, 2)).toBe(
      "passed",
    );
    expect(proposal.authority_state).toBe("proposal-awaiting-acceptance");
    expect(proposal.proposal_records).toContain("product");
    expect(proposal.proposal_digest).toMatch(/^[a-f0-9]{64}$/);
  });
});
