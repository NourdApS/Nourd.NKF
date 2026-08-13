import { createHash } from "node:crypto";
import { appendFile, cp, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import YAML from "yaml";
import { beforeAll, describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
// @ts-expect-error Repository migration tooling is a directly executable ESM module.
import { migrateProjectTo0_5 } from "../scripts/migration/0-5-core.mjs";
// @ts-expect-error Repository freshness tooling is a directly executable ESM module.
import { sealBaseline0_5, writeReviewTemplate0_5 } from "../scripts/freshness/seal-baseline-0-5.mjs";
import { repositoryRoot } from "./helpers.js";

const fixture = path.join(repositoryRoot, "fixtures/valid/minimal-0-4");
const checker = path.join(repositoryRoot, "dist/nourd-nkf-checker.mjs");
const contractRoot = path.join(repositoryRoot, "contracts/nkf/0.2");
const relationships = [
  "part-of", "defines", "governs", "applies-to", "depends-on", "extends", "supersedes",
  "rationale-for", "realizes", "evidences", "references", "flows-to", "transitions-to", "observes",
];

async function project() {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-0-5-freshness-"));
  const projectRoot = path.join(parent, "project");
  await cp(fixture, projectRoot, { recursive: true });
  await migrateProjectTo0_5(projectRoot);
  return { parent, projectRoot };
}

const request = (purpose: "whole-root-readiness" | "change-impact" | null = "whole-root-readiness", changed_inputs: unknown[] = []) => ({
  level: "full-bundle" as const,
  record_id: null,
  acceptance_binding: "not-requested" as const,
  purpose,
  require_readiness: purpose !== null,
  changed_inputs,
  targets: [],
  observations: [],
  evaluation_time: null,
  historical_receipt: null,
});

async function validate(projectRoot: string, value = request()) {
  return validateProject({ projectRoot, contractRoot, checkerArtifact: checker, request: value, persist: false });
}

function basis(node: Record<string, unknown>) {
  return node.kind === "record"
    ? { node, source: { section: "product-definition" } }
    : { node, source: { heading: { heading_path: ["Fixture"], occurrence: 1 } } };
}

async function reviewFile(parent: string, nodes: Array<{ node: Record<string, unknown> }>) {
  const review = {
    contract: "nkf.semantic-review-input",
    nkf_version: "0.5",
    stage: "whole-root",
    reviewer: { kind: "agent", id: "fixture-semantic-reviewer" },
    reviewed_at: "2026-08-13T09:00:00.000Z",
    claim: "semantically-reviewed-whole-root",
    disputed: false,
    nodes: nodes.map(({ node }) => ({
      node,
      state: "eligible",
      role: node.kind === "record" ? "governs" : node.kind === "document" && node.id === "TEST-001" ? "context" : "evidences",
      basis: basis(node),
    })),
    relationships: relationships.map((relationship) => ({
      relationship,
      state: "inapplicable",
      basis: basis({ kind: "record", id: "product" }),
    })),
    decision_classifications: [],
    observations: [{
      id: "fixture-review",
      subject: { kind: "record", id: "product" },
      basis: basis({ kind: "record", id: "product" }),
      finding: "The controlled fixture graph and declared absence of authored edges were reviewed for this exact candidate.",
    }],
    limitations: ["controlled-fixture-only"],
  };
  const target = path.join(parent, "review.yaml");
  await writeFile(target, YAML.stringify(review, { lineWidth: 0, aliasDuplicateObjects: false }));
  return target;
}

async function seal(parent: string, projectRoot: string) {
  const measured = await validate(projectRoot, request(null));
  const review = await reviewFile(parent, measured.nodes as Array<{ node: Record<string, unknown> }>);
  await sealBaseline0_5({ projectRoot, checker, reviewPath: review });
}

beforeAll(async () => {
  // The source-level tests use the same built executable the public sealer invokes.
  await readFile(checker);
});

describe("NKF 0.5 deterministic freshness", () => {
  it("gives a represented non-Markdown document a resolvable review basis", async () => {
    const { parent, projectRoot } = await project();
    const evidencePath = path.join(projectRoot, "knowledge/evidence.yaml");
    const evidenceBytes = Buffer.from("contract: controlled-evidence\nvalue: exact\n", "utf8");
    await writeFile(evidencePath, evidenceBytes);
    const bundlePath = path.join(projectRoot, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundlePath, "utf8"));
    bundle.non_records.push({
      path: "evidence.yaml",
      kind: "evidence",
      reason: "Controlled non-Markdown evidence exercises document review-basis generation.",
      document: {
        id: "document-non-markdown-evidence",
        stable_path: "evidence.yaml",
        digest: {
          algorithm: "sha-256",
          value: createHash("sha256").update(evidenceBytes).digest("hex"),
        },
        relationships: [],
      },
    });
    await writeFile(bundlePath, YAML.stringify(bundle, { lineWidth: 0, aliasDuplicateObjects: false }));
    const reviewPath = path.join(parent, "generated-review.yaml");
    await writeReviewTemplate0_5({ projectRoot, checker, reviewPath });
    const review = YAML.parse(await readFile(reviewPath, "utf8"));
    const entry = review.nodes.find((item: { node: { id?: string } }) => item.node.id === "document-non-markdown-evidence");
    expect(entry.basis).toEqual({
      node: { kind: "record", id: "product" },
      source: { section: "product-definition" },
    });
    expect(review.relationships.every((item: { basis: unknown }) => JSON.stringify(item.basis) === JSON.stringify(entry.basis))).toBe(true);
  });

  it("migrates without rewriting canonical Markdown and separates conformance from readiness", async () => {
    const { projectRoot } = await project();
    const before = await readFile(path.join(fixture, "knowledge/product.md"));
    const after = await readFile(path.join(projectRoot, "knowledge/product.md"));
    expect(after.equals(before)).toBe(true);
    const result = await validate(projectRoot);
    expect(result.conformance).toBe("passed");
    expect(result.readiness?.state).toBe("not-ready");
    expect(result.diagnostics.map((item) => item.rule_id)).toEqual(["freshness.baseline.missing"]);
  });

  it("seals one exact reviewed baseline and reaches whole-root readiness", async () => {
    const { parent, projectRoot } = await project();
    await seal(parent, projectRoot);
    const first = await validate(projectRoot);
    const second = await validate(projectRoot);
    expect(first.conformance).toBe("passed");
    expect(first.readiness?.state).toBe("ready");
    expect(first.diagnostics).toEqual([]);
    expect(second.knowledge_graph).toEqual(first.knowledge_graph);
    expect(second.nodes).toEqual(first.nodes);
  });

  it("detects a canonical source change as conformance failure and baseline drift", async () => {
    const { parent, projectRoot } = await project();
    await seal(parent, projectRoot);
    await appendFile(path.join(projectRoot, "knowledge/product.md"), "\nChanged after review.\n");
    const result = await validate(projectRoot);
    expect(result.conformance).toBe("failed");
    expect(result.diagnostics.map((item) => item.rule_id)).toContain("record.source.digest-mismatch");
    expect(result.diagnostics.map((item) => item.rule_id)).toContain("markdown.frontmatter.legacy-lock.invalid");
  });

  it("limits change-impact applicability to the exact deterministic closure", async () => {
    const { parent, projectRoot } = await project();
    await seal(parent, projectRoot);
    const result = await validate(projectRoot, request("change-impact", [{ kind: "node", node: { kind: "record", id: "product" } }]));
    const applicable = (result.nodes ?? []).filter((node) => node.applicability === "applicable");
    expect(applicable.map((node) => node.node)).toEqual([{ kind: "record", id: "product" }]);
    expect(applicable[0]?.reason_paths).toEqual([{
      initial_change: { kind: "node", node: { kind: "record", id: "product" } },
      target: { kind: "record", id: "product" },
      nodes: [{ kind: "record", id: "product" }],
      relationships: [],
    }]);
    expect(result.readiness?.state).toBe("ready");
  });

  it("persists an immutable receipt and reproduces it only against exact current inputs", async () => {
    const { parent, projectRoot } = await project();
    await seal(parent, projectRoot);
    const result = await validateProject({
      projectRoot,
      contractRoot,
      checkerArtifact: checker,
      request: request("change-impact", [{ kind: "node", node: { kind: "record", id: "product" } }]),
      persist: true,
    });
    expect(result.readiness?.state).toBe("ready");
    const directory = path.join(projectRoot, ".nourd/knowledge/freshness/receipts");
    const receipts = await readdir(directory);
    expect(receipts).toHaveLength(1);
    const receipt = JSON.parse(await readFile(path.join(directory, receipts[0]!), "utf8"));
    expect(receipt.id).toBe(receipts[0]!.replace(/\.json$/u, ""));
    const historical = await validateProject({
      projectRoot,
      contractRoot,
      checkerArtifact: checker,
      request: {
        ...request(null),
        purpose: "historical-reproduction",
        require_readiness: true,
        historical_receipt: receipt.id,
      },
      persist: false,
    });
    expect(historical.readiness?.state).toBe("ready");
    await appendFile(path.join(projectRoot, "knowledge/product.md"), "\nChanged after receipt.\n");
    const changed = await validateProject({
      projectRoot,
      contractRoot,
      checkerArtifact: checker,
      request: {
        ...request(null),
        purpose: "historical-reproduction",
        require_readiness: true,
        historical_receipt: receipt.id,
      },
      persist: false,
    });
    expect(changed.readiness?.state).toBe("not-ready");
    expect(changed.diagnostics.map((item) => item.rule_id)).toContain("freshness.receipt.binding-mismatch");
  });
});
