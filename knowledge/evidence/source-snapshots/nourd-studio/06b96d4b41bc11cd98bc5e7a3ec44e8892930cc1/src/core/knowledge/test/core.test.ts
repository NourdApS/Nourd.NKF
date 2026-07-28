import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
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
  findRepositoryRoot,
  inspectKnowledge,
  reconcileKnowledge,
  sha256,
  validateKnowledge,
} from "../src/core.js";
import type { KnowledgeBundle, KnowledgeRecord } from "../src/types.js";

const thisFile = fileURLToPath(import.meta.url);
const sourceRepository = findRepositoryRoot(path.dirname(thisFile));
const temporaryRepositories: string[] = [];

function write(filePath: string, contents: string): void {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents, "utf8");
}

function descriptor(
  id: string,
  type: KnowledgeRecord["type"],
  sourcePath: string,
  title: string,
  sections: KnowledgeRecord["sections"],
): KnowledgeRecord {
  return {
    contract: "nourd.knowledge.record/v1",
    id,
    type,
    body_contract: `nourd.knowledge.${type}/v1` as KnowledgeRecord["body_contract"],
    title,
    source: {
      path: sourcePath,
      digest: {
        algorithm: "sha-256",
        value: "",
      },
    },
    governance: {
      lifecycle: type === "architecture-decision" ? "immutable" : "living",
      status: "accepted",
      authority: ["human-product-owner"],
      accepted_on: "2026-07-23",
    },
    scope: { product: "product" },
    sections,
    relationships: [],
    external_authorities: [],
    presentation: {},
  };
}

function persistDescriptor(repository: string, record: KnowledgeRecord): void {
  const source = readFileSync(path.join(repository, record.source.path));
  record.source.digest.value = sha256(source);
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

function loadDescriptor(repository: string, id: string): KnowledgeRecord {
  const file = path.join(
    repository,
    ".nourd",
    "knowledge",
    "records",
    `${id}.yaml`,
  );
  return parse(readFileSync(file, "utf8")) as KnowledgeRecord;
}

function fixture(): string {
  const repository = mkdtempSync(path.join(tmpdir(), "nourd-knowledge-"));
  temporaryRepositories.push(repository);

  const schemaSource = path.join(
    sourceRepository,
    "src",
    "contracts",
    "knowledge",
    "v1",
  );
  const schemaTarget = path.join(
    repository,
    "src",
    "contracts",
    "knowledge",
    "v1",
  );
  mkdirSync(schemaTarget, { recursive: true });
  copyFileSync(
    path.join(schemaSource, "bundle.schema.json"),
    path.join(schemaTarget, "bundle.schema.json"),
  );
  copyFileSync(
    path.join(schemaSource, "record.schema.json"),
    path.join(schemaTarget, "record.schema.json"),
  );

  const bundle: KnowledgeBundle = {
    contract: "nourd.knowledge.bundle/v1",
    id: "test-product",
    product_record: "product",
    markdown_root: "../../knowledge",
    records_root: "records",
    record_contract: "nourd.knowledge.record/v1",
    non_records: [],
  };
  write(
    path.join(repository, ".nourd", "knowledge", "bundle.yaml"),
    stringify(bundle),
  );

  write(
    path.join(repository, "knowledge", "product.md"),
    `# Product

- **Status:** Accepted
- **Accepted:** 23 July 2026

## Purpose

The accepted Product.
`,
  );
  const product = descriptor(
    "product",
    "product",
    "knowledge/product.md",
    "Product",
    [
      {
        id: "purpose",
        heading_path: ["Purpose"],
        occurrence: 1,
        authority: "accepted-meaning",
        role: "governing",
      },
    ],
  );
  persistDescriptor(repository, product);

  write(
    path.join(repository, "knowledge", "decisions", "0001-test.md"),
    `# ADR 0001: Test decision

- **Status:** Accepted
- **Accepted:** 23 July 2026

## Context

The context.

## Decision

The decision.
`,
  );
  const adr = descriptor(
    "adr-0001",
    "architecture-decision",
    "knowledge/decisions/0001-test.md",
    "ADR 0001: Test decision",
    [
      {
        id: "context",
        heading_path: ["Context"],
        occurrence: 1,
        authority: "accepted-meaning",
        role: "context",
      },
      {
        id: "decision",
        heading_path: ["Decision"],
        occurrence: 1,
        authority: "accepted-meaning",
        role: "governing",
      },
    ],
  );
  persistDescriptor(repository, adr);

  execFileSync("git", ["init", "-b", "main"], { cwd: repository });
  execFileSync("git", ["config", "user.email", "knowledge@example.invalid"], {
    cwd: repository,
  });
  execFileSync("git", ["config", "user.name", "Knowledge Test"], {
    cwd: repository,
  });
  execFileSync("git", ["add", "."], { cwd: repository });
  execFileSync("git", ["commit", "-m", "accepted base"], {
    cwd: repository,
    stdio: "ignore",
  });
  return repository;
}

afterEach(() => {
  for (const repository of temporaryRepositories.splice(0)) {
    rmSync(repository, { recursive: true, force: true });
  }
});

describe("knowledge authority gate", () => {
  it("fails closed when the accepted base ref is unavailable", () => {
    const repository = fixture();
    const result = validateKnowledge(repository, {
      baseRef: "definitely-not-a-ref",
    });

    expect(result.outcome).toBe("failed");
    expect(result.diagnostics.some(({ rule }) => rule === "authority.base-ref")).toBe(
      true,
    );
  });

  it("uses base authority when an accepted ADR is downgraded and changed", () => {
    const repository = fixture();
    const sourcePath = path.join(
      repository,
      "knowledge",
      "decisions",
      "0001-test.md",
    );
    write(
      sourcePath,
      `# ADR 0001: Test decision

- **Status:** Draft
- **Proposed:** 24 July 2026

## Context

Changed context.

## Decision

Changed decision.
`,
    );
    const record = loadDescriptor(repository, "adr-0001");
    record.governance.status = "draft";
    delete record.governance.accepted_on;
    record.governance.proposed_on = "2026-07-24";
    for (const section of record.sections) {
      section.authority = "proposal";
    }
    persistDescriptor(repository, record);

    const result = validateKnowledge(repository, { baseRef: "main" });
    expect(result.outcome).toBe("failed");
    expect(result.diagnostics.some(({ rule }) => rule === "adr.immutable")).toBe(
      true,
    );
  });

  it("detects a changed accepted ADR after its source path moves", () => {
    const repository = fixture();
    const previousPath = path.join(
      repository,
      "knowledge",
      "decisions",
      "0001-test.md",
    );
    const movedPath = path.join(
      repository,
      "knowledge",
      "decisions",
      "renamed.md",
    );
    renameSync(previousPath, movedPath);
    write(
      movedPath,
      readFileSync(movedPath, "utf8").replace("The decision.", "Changed."),
    );
    const record = loadDescriptor(repository, "adr-0001");
    record.source.path = "knowledge/decisions/renamed.md";
    persistDescriptor(repository, record);

    const result = validateKnowledge(repository, { baseRef: "main" });
    expect(result.outcome).toBe("failed");
    expect(result.diagnostics.some(({ rule }) => rule === "adr.immutable")).toBe(
      true,
    );
  });

  it("reports a valid living-record change as awaiting acceptance", () => {
    const repository = fixture();
    const sourcePath = path.join(repository, "knowledge", "product.md");
    write(
      sourcePath,
      readFileSync(sourcePath, "utf8").replace(
        "The accepted Product.",
        "The accepted Product, revised.",
      ),
    );
    const record = loadDescriptor(repository, "product");
    persistDescriptor(repository, record);

    const result = validateKnowledge(repository, { baseRef: "main" });
    expect(result.outcome, JSON.stringify(result.diagnostics, null, 2)).toBe(
      "passed",
    );
    expect(result.authority_state).toBe("proposal-awaiting-acceptance");
    expect(result.proposal_records).toContain("product");
    expect(result.proposal_digest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("rejects disagreement between Markdown and YAML governance", () => {
    const repository = fixture();
    const record = loadDescriptor(repository, "product");
    record.governance.status = "draft";
    delete record.governance.accepted_on;
    record.governance.proposed_on = "2026-07-24";
    persistDescriptor(repository, record);

    const result = validateKnowledge(repository, { baseRef: "main" });
    expect(
      result.diagnostics.some(
        ({ rule }) => rule === "governance.status-agreement",
      ),
    ).toBe(true);
  });

  it("rejects incomplete and ambiguous section mappings", () => {
    const repository = fixture();
    const sourcePath = path.join(repository, "knowledge", "product.md");
    write(
      sourcePath,
      `${readFileSync(sourcePath, "utf8")}
## Purpose

Another purpose.
`,
    );
    const record = loadDescriptor(repository, "product");
    persistDescriptor(repository, record);

    const result = validateKnowledge(repository, { baseRef: "main" });
    expect(
      result.diagnostics.some(({ rule }) => rule === "section.heading-covered"),
    ).toBe(true);
  });

  it("rejects zero-section ADR declarations", () => {
    const repository = fixture();
    const record = loadDescriptor(repository, "adr-0001");
    record.sections = [];
    persistDescriptor(repository, record);

    const result = validateKnowledge(repository, { baseRef: "main" });
    expect(
      result.diagnostics.some(
        ({ rule }) => rule === "body-contract.sections-required",
      ),
    ).toBe(true);
  });

  it("refuses inspection when the composite record is stale", () => {
    const repository = fixture();
    write(
      path.join(repository, "knowledge", "product.md"),
      `${readFileSync(path.join(repository, "knowledge", "product.md"), "utf8")}
Stale bytes.
`,
    );

    expect(() => inspectKnowledge(repository, "product", "main")).toThrow(
      /record\.source-digest/,
    );
  });

  it("reconciles a missing deterministic digest without a placeholder", () => {
    const repository = fixture();
    const record = loadDescriptor(repository, "product");
    delete record.source.digest.value;
    write(
      path.join(
        repository,
        ".nourd",
        "knowledge",
        "records",
        "product.yaml",
      ),
      stringify(record, { lineWidth: 0, sortMapEntries: false }),
    );

    expect(reconcileKnowledge(repository, "product")).toEqual(["product"]);
    expect(
      loadDescriptor(repository, "product").source.digest.value,
    ).toMatch(/^[a-f0-9]{64}$/);
  });

  it("rejects symlink escapes and unknown Markdown", () => {
    const repository = fixture();
    const outside = path.join(tmpdir(), `nourd-outside-${process.pid}.md`);
    write(
      outside,
      `# Product

- **Status:** Accepted
- **Accepted:** 23 July 2026

## Purpose

Outside.
`,
    );
    const productPath = path.join(repository, "knowledge", "product.md");
    rmSync(productPath);
    symlinkSync(outside, productPath);
    write(
      path.join(repository, "knowledge", "secret-policy.md"),
      "# Secret policy\n",
    );

    try {
      const result = validateKnowledge(repository, { baseRef: "main" });
      expect(
        result.diagnostics.some(
          ({ rule }) => rule === "record.source-path",
        ),
      ).toBe(true);
      expect(
        result.diagnostics.some(
          ({ rule }) => rule === "record.classification-required",
        ),
      ).toBe(true);
    } finally {
      rmSync(outside, { force: true });
    }
  });
});
