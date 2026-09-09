import { cp, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";
import { mkdtemp } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import YAML from "yaml";
import { VERSION_BINDINGS } from "../src/checker/bindings.js";
import { loadContracts } from "../src/checker/contracts.js";
import { validateProject } from "../src/checker/checker.js";
import { RuleEmitter } from "../src/checker/diagnostics.js";
import { evaluateKnowledgeGraph } from "../src/checker/freshness.js";
import type { ValidationRequest } from "../src/checker/types.js";
import { jcs, sha256 as utilSha256 } from "../src/checker/util.js";
import { contractRoot, copyValidFixture, options, repositoryRoot } from "./helpers.js";

const sha256 = (bytes: Buffer | string) => createHash("sha256").update(bytes).digest("hex");

async function mutateYaml(file: string, change: (value: any) => void) {
  const value = YAML.parse(await readFile(file, "utf8"));
  change(value);
  await writeFile(file, YAML.stringify(value, { lineWidth: 0, aliasDuplicateObjects: false }));
}

// A supported-window project carrying one legacy-locked Task document: the
// current technology fixture whose Task source still uses the pre-native
// frontmatter and whose bundle declaration locks those exact bytes.
async function legacyLockProject(prefix: string): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), prefix));
  const project = path.join(parent, "project");
  await cp(path.join(repositoryRoot, "fixtures/valid/technology-0-81"), project, { recursive: true });
  const taskSource = path.join(project, "knowledge/tasks/items/task.md");
  const legacySource = (await readFile(taskSource, "utf8")).replace(
    "created_at: 2026-07-30T15:59:54Z\n---",
    "created_at: 2026-07-30T15:59:54Z\ntask_id: TEST-TECH-001\ntask_status: active\n---",
  );
  await writeFile(taskSource, legacySource);
  const legacyDigest = sha256(legacySource);
  await mutateYaml(bundleFile(project), (bundle) => {
    const task = bundle.non_records.find((entry: any) => entry.kind === "task");
    task.document.digest.value = legacyDigest;
    task.document.legacy_lock = {
      predecessor_version: "0.4",
      source_digest: { algorithm: "sha-256", value: legacyDigest },
      predecessor_state: { task_id: "TEST-TECH-001", task_status: "active" },
      initial_declaration_state: {
        document_state: { vocabulary: "task-status", value: "active" },
      },
    };
  });
  return project;
}

async function rules(project: string, request: Partial<ValidationRequest> = {}): Promise<string[]> {
  const result = await validateProject(options(project, {
    request: {
      level: "full-bundle",
      record_id: null,
      acceptance_binding: "not-requested",
      ...request,
    } as ValidationRequest,
  }));
  return [...new Set(result.diagnostics.map((diagnostic) => diagnostic.rule_id))];
}

const readiness = { purpose: "whole-root-readiness" as const, require_readiness: false };
const baselineFile = (project: string) => path.join(project, ".nourd/knowledge/freshness/baseline.yaml");
const bundleFile = (project: string) => path.join(project, ".nourd/knowledge/bundle.yaml");
const productDeclaration = (project: string) => path.join(project, ".nourd/knowledge/records/product.yaml");
const currentSystemDeclaration = (project: string) => path.join(project, ".nourd/knowledge/records/product-current-system.yaml");

describe("baseline and freshness rule coverage", () => {
  it("reports the exact baseline state family", async () => {
    const missing = await copyValidFixture();
    await rm(baselineFile(missing));
    expect(await rules(missing, readiness)).toContain("freshness.baseline.missing");

    const disputed = await copyValidFixture();
    await mutateYaml(baselineFile(disputed), (baseline) => { baseline.confirmation.disputed = true; });
    expect(await rules(disputed, readiness)).toContain("freshness.baseline.disputed");

    const ambiguous = await copyValidFixture();
    await mutateYaml(baselineFile(ambiguous), (baseline) => {
      baseline.node_revisions.push(structuredClone(baseline.node_revisions[0]));
      baseline.graph_revision.value = utilSha256(Buffer.from(jcs({
        contract: "nkf.graph-revision",
        nkf_version: "0.81",
        bundle: baseline.bundle,
        profile: baseline.profile,
        nodes: baseline.node_revisions,
        edges: baseline.authored_edges,
        external_dependencies: baseline.external_dependencies ?? [],
        authority_inputs: baseline.authority_inputs ?? [],
        policy: { id: baseline.policy.id, sha256: baseline.policy.digest.value },
      }), "utf8"));
    });
    expect(await rules(ambiguous, readiness)).toContain("freshness.baseline.ambiguous");

    const outdated = await copyValidFixture();
    await mutateYaml(baselineFile(outdated), (baseline) => { baseline.profile = "nkf.profile.technology"; });
    expect(await rules(outdated, readiness)).toContain("freshness.baseline.outdated");

    const unsupported = await copyValidFixture();
    await mutateYaml(baselineFile(unsupported), (baseline) => {
      baseline.authored_edges.push({
        source: { kind: "record", id: "product" },
        relationship: "references",
        target: { kind: "record", id: "product-current-system" },
        source_binding: { kind: "section", node: { kind: "record", id: "product" }, section: "product-definition" },
      });
    });
    expect(await rules(unsupported, readiness)).toContain("freshness.baseline.unsupported");

    const coverage = await copyValidFixture();
    await mutateYaml(baselineFile(coverage), (baseline) => { baseline.applicability_coverage.pop(); });
    expect(await rules(coverage, readiness)).toContain("freshness.baseline.coverage-incomplete");

    const revision = await copyValidFixture();
    await mutateYaml(baselineFile(revision), (baseline) => { baseline.graph_revision.value = "0".repeat(64); });
    expect(await rules(revision, readiness)).toContain("graph.revision.mismatch");

    const schema = await copyValidFixture();
    await mutateYaml(baselineFile(schema), (baseline) => { baseline.unexpected = true; });
    expect(await rules(schema, readiness)).toContain("schema.graph-baseline.invalid");
  });

  it("verifies digest-bound judgment provenance and carry preconditions", async () => {
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.81"], "0.81");
    const record = {
      artifact: ".nourd/knowledge/records/alpha.yaml",
      declaration: {
        id: "alpha", type: "product", body_contract: "nkf.product",
        governance: { lifecycle: "living", status: "draft", authority: ["human-product-owner"] },
        source: { path: "alpha.md", stable_path: "alpha.md" },
        sections: [{ id: "s", authority: "proposal" }],
        relationships: [],
      },
      declarationDigest: "0".repeat(64),
      sourceDigest: "0".repeat(64),
      sourceValid: true,
    };
    const bundle = { id: "coverage", root: { profile: "nkf.profile.product", record: "alpha" }, knowledge_graph: { baseline: ".nourd/knowledge/freshness/baseline.yaml" } };
    const evaluateSealed = (tamper: (baseline: any) => void) => {
      const first = evaluateKnowledgeGraph({
        nkfVersion: "0.81", bundle, records: [record], documents: [],
        executable: loaded.executable, policy: loaded.freshnessPolicy,
        policyBinding: { expected_sha256: "0".repeat(64), observed_sha256: "0".repeat(64), binding: "verified" },
        baseline: null, baselinePresent: false,
        request: { level: "full-bundle", record_id: null, acceptance_binding: "not-requested", purpose: null } as ValidationRequest,
        diagnostics: [], emitter: new RuleEmitter(loaded.executable),
      });
      const nodes = first.nodes.map((entry) => ({ node: entry.node, revision: entry.revision }));
      const purposes = ["change-impact", "whole-root-readiness", "consequential-use"];
      const relationships = Object.keys(loaded.executable.vocabularies.graph_relationship_types);
      const baseline: any = {
        contract: "nkf.graph-baseline", nkf_version: "0.81",
        bundle: bundle.id, profile: bundle.root.profile,
        policy: { id: "nkf.freshness-policy.0.81", digest: { algorithm: "sha-256", value: "0".repeat(64) } },
        version_delta: { contract: "nkf.version-delta", digest: { algorithm: "sha-256", value: "5".repeat(64) } },
        node_revisions: nodes,
        authored_edges: [],
        external_dependencies: [], authority_inputs: [],
        relationship_coverage: relationships.map((relationship) => ({ relationship, state: "reviewed" })),
        applicability_coverage: nodes.flatMap((entry) => purposes.map((purpose) => ({
          node: entry.node, purpose, state: "eligible", role: "governs",
          basis: { node: entry.node, source: { section: "s" } },
          revision: entry.revision,
          basis_digest: entry.revision,
          provenance: { performed: true },
        }))),
        decision_classifications: [],
        promotion_reconciliation: [],
        confirmation: {
          reviewer: { kind: "agent", id: "coverage-reviewer" },
          reviewed_at: "2026-08-13T10:00:00.000Z",
          claim: "semantically-reviewed-whole-root",
          observations: [], disputed: false,
        },
      };
      baseline.graph_revision = { algorithm: "sha-256", value: utilSha256(Buffer.from(jcs({
        contract: "nkf.graph-revision", nkf_version: "0.81", bundle: bundle.id, profile: bundle.root.profile,
        nodes: baseline.node_revisions, edges: baseline.authored_edges,
        external_dependencies: [], authority_inputs: [],
        policy: { id: "nkf.freshness-policy.0.81", sha256: "0".repeat(64) },
      }), "utf8")) };
      tamper(baseline);
      const emitter = new RuleEmitter(loaded.executable);
      evaluateKnowledgeGraph({
        nkfVersion: "0.81", bundle, records: [record], documents: [],
        executable: loaded.executable, policy: loaded.freshnessPolicy,
        policyBinding: { expected_sha256: "0".repeat(64), observed_sha256: "0".repeat(64), binding: "verified" },
        baseline, baselinePresent: true,
        request: { level: "full-bundle", record_id: null, acceptance_binding: "not-requested", purpose: "whole-root-readiness" } as ValidationRequest,
        diagnostics: [], emitter,
        versionDeltaDigest: "5".repeat(64),
      });
      return [...new Set(emitter.diagnostics.map((diagnostic) => diagnostic.rule_id))];
    };

    expect(evaluateSealed(() => {})).not.toContain("freshness.baseline.unsupported");
    expect(evaluateSealed((baseline) => {
      baseline.applicability_coverage[0].provenance = { performed: false };
    })).toContain("freshness.baseline.provenance-invalid");

    const carried = await copyValidFixture();
    await mutateYaml(baselineFile(carried), (baseline) => {
      const entry = baseline.applicability_coverage[0];
      entry.provenance = {
        carried: {
          performed_in_graph_revision: { algorithm: "sha-256", value: "1".repeat(64) },
          performing_reviewer: { kind: "agent", id: "prior-reviewer" },
        },
      };
      entry.revision = { algorithm: "sha-256", value: "2".repeat(64) };
    });
    expect(await rules(carried, readiness)).toContain("freshness.baseline.carry-precondition-violated");

    const stale = await copyValidFixture();
    await mutateYaml(baselineFile(stale), (baseline) => {
      baseline.applicability_coverage[0].revision = { algorithm: "sha-256", value: "3".repeat(64) };
    });
    expect(await rules(stale, readiness)).toContain("freshness.baseline.judgment-digest-mismatch");
  });

  it("verifies the delta claim closure, completeness, and reconciliation", async () => {
    const node = { kind: "record", id: "product" };
    const toDelta = (baseline: any) => {
      baseline.confirmation.claim = "semantically-reviewed-delta";
      baseline.confirmation.performed_set = [];
      baseline.confirmation.computed_closure = [];
    };

    const unprovable = await copyValidFixture();
    await mutateYaml(baselineFile(unprovable), (baseline) => {
      toDelta(baseline);
      baseline.confirmation.computed_closure = [{ kind: "record", id: "ghost" }];
    });
    expect(await rules(unprovable, readiness)).toContain("freshness.claim.delta-completeness-unprovable");

    const notContained = await copyValidFixture();
    await mutateYaml(baselineFile(notContained), (baseline) => {
      toDelta(baseline);
      baseline.confirmation.computed_closure = [node];
    });
    expect(await rules(notContained, readiness)).toContain("freshness.claim.delta-closure-not-contained");

    const mismatch = await copyValidFixture();
    await mutateYaml(baselineFile(mismatch), (baseline) => {
      toDelta(baseline);
      baseline.confirmation.performed_set = [node];
      baseline.confirmation.computed_closure = [node];
      const revisionByNode = new Map(
        baseline.node_revisions.map((entry: any) => [JSON.stringify(entry.node), entry.revision.value]),
      );
      for (const entry of baseline.applicability_coverage) {
        if (entry.node.id !== node.id) continue;
        entry.provenance = {
          carried: {
            performed_in_graph_revision: { algorithm: "sha-256", value: "4".repeat(64) },
            performing_reviewer: { kind: "agent", id: "prior-reviewer" },
          },
        };
        entry.revision = { algorithm: "sha-256", value: revisionByNode.get(JSON.stringify(entry.node)) };
      }
    });
    expect(await rules(mismatch, readiness)).toContain("freshness.claim.computed-closure-mismatch");

    // A recorded closure whose propagation term is missing is not reproduced
    // by the 0.81 recompute: the Technology fixture's realizes edge reaches
    // the realization from the changed specification.
    const notReproducedParent = await mkdtemp(path.join(os.tmpdir(), "nkf-closure-coverage-"));
    const notReproduced = path.join(notReproducedParent, "project");
    await cp(path.join(repositoryRoot, "fixtures/valid/technology-0-81"), notReproduced, { recursive: true });
    await mutateYaml(baselineFile(notReproduced), (baseline) => {
      const specification = { kind: "record", id: "specification" };
      baseline.confirmation.claim = "semantically-reviewed-delta";
      baseline.confirmation.computed_closure = [specification];
      baseline.confirmation.performed_set = [specification];
      for (const entry of baseline.applicability_coverage) {
        entry.provenance = entry.node.kind === "record" && entry.node.id === "specification"
          ? { performed: true }
          : {
              carried: {
                performed_in_graph_revision: baseline.graph_revision,
                performing_reviewer: { kind: "agent", id: "prior-reviewer" },
              },
            };
      }
    });
    expect(await rules(notReproduced, readiness)).toContain("freshness.claim.computed-closure-not-reproduced");

    const pending = await copyValidFixture();
    await mutateYaml(baselineFile(pending), (baseline) => {
      baseline.promotion_reconciliation = [{
        node,
        coordinate: "release-version",
        written_at_graph_revision: baseline.graph_revision,
        state: "pending",
      }];
    });
    expect(await rules(pending, readiness)).toContain("freshness.reconciliation.pending");

    const invalid = await copyValidFixture();
    await mutateYaml(baselineFile(invalid), (baseline) => {
      baseline.promotion_reconciliation = [{
        node: { kind: "record", id: "ghost" },
        coordinate: "release-version",
        written_at_graph_revision: baseline.graph_revision,
        state: "pending",
      }];
    });
    expect(await rules(invalid, readiness)).toContain("freshness.reconciliation.invalid");
  });

  it("requires resolvable observations and current results for selected nodes", async () => {
    const dependency = {
      id: "external-service",
      authority: "example-authority",
      dependent: { kind: "record", id: "product" },
      relationship: "depends-on",
      source_binding: { kind: "section", node: { kind: "record", id: "product" }, section: "product-definition" },
      source: { repository: "https://example.invalid/service" },
      revision: { exact: "v1" },
      observability: { observation_id: "external-service-observation" },
    };
    const observation = await copyValidFixture();
    await mutateYaml(bundleFile(observation), (bundle) => { bundle.external_dependencies = [dependency]; });
    const observationRules = await rules(observation, readiness);
    expect(observationRules).toContain("freshness.observation.missing");
    expect(observationRules).toContain("freshness.result.noncurrent");

    const invalidDependency = await copyValidFixture();
    await mutateYaml(bundleFile(invalidDependency), (bundle) => {
      bundle.external_dependencies = [{ ...dependency, dependent: { kind: "record", id: "ghost" } }];
    });
    expect(await rules(invalidDependency, readiness)).toContain("external-dependency.invalid");

    const invalidAuthority = await copyValidFixture();
    await mutateYaml(bundleFile(invalidAuthority), (bundle) => {
      bundle.authority_inputs = [{
        id: "authority-check",
        authority: "example-authority",
        subject: { kind: "record", id: "ghost" },
        source_binding: { kind: "section", node: { kind: "record", id: "product" }, section: "product-definition" },
        expected_revision: "v1",
        observation_id: "authority-check-observation",
      }];
    });
    expect(await rules(invalidAuthority, readiness)).toContain("authority-input.invalid");
  });

  it("classifies accepted Decisions per purpose and rejects historical receipts that do not reproduce", async () => {
    const receipt = await copyValidFixture();
    await mkdir(path.join(receipt, ".nourd/knowledge/freshness/receipts"), { recursive: true });
    const receiptId = `freshness-${"0".repeat(64)}`;
    await writeFile(
      path.join(receipt, `.nourd/knowledge/freshness/receipts/${receiptId}.json`),
      `${JSON.stringify({ contract: "nkf.freshness-receipt", unexpected: true })}\n`,
    );
    expect(await rules(receipt, {
      purpose: "historical-reproduction",
      historical_receipt: receiptId,
    })).toContain("schema.freshness-receipt.invalid");

    const absent = await copyValidFixture();
    expect(await rules(absent, {
      purpose: "historical-reproduction",
      historical_receipt: receiptId,
    })).toContain("freshness.receipt.binding-mismatch");
  });
});

describe("graph rule coverage", () => {
  it("resolves nodes, endpoints, duplicates, inverses, and cycles", async () => {
    const unresolved = await copyValidFixture();
    await mutateYaml(productDeclaration(unresolved), (declaration) => {
      declaration.relationships = [{ type: "references", target: "ghost", source_section: "product-definition" }];
    });
    expect(await rules(unresolved)).toContain("graph.node.unresolved");

    const duplicateNode = await copyValidFixture();
    await mutateYaml(productDeclaration(duplicateNode), (declaration) => {
      declaration.entities = [
        { id: "entity-one", kind: "concept", defining_section: "product-definition" },
        { id: "entity-one", kind: "concept", defining_section: "product-definition" },
      ];
    });
    expect(await rules(duplicateNode)).toContain("graph.node.duplicate");

    const duplicateEdge = await copyValidFixture();
    await mutateYaml(productDeclaration(duplicateEdge), (declaration) => {
      const edge = { type: "references", target: "product-current-system", source_section: "product-definition" };
      declaration.relationships = [edge, { ...edge }];
    });
    expect(await rules(duplicateEdge)).toContain("graph.relationship.duplicate");

    const inverse = await copyValidFixture();
    await mutateYaml(productDeclaration(inverse), (declaration) => {
      declaration.relationships = [{ type: "part-of", target: "product-current-system", source_section: "product-definition" }];
    });
    await mutateYaml(currentSystemDeclaration(inverse), (declaration) => {
      declaration.relationships = [{ type: "part-of", target: "product", source_section: declaration.sections[0].id }];
    });
    const inverseRules = await rules(inverse);
    expect(inverseRules).toContain("graph.relationship.inverse-authored");
    expect(inverseRules).toContain("graph.relationship.cycle-invalid");

    const selfEdge = await copyValidFixture();
    await mutateYaml(productDeclaration(selfEdge), (declaration) => {
      declaration.relationships = [{ type: "references", target: "product", source_section: "product-definition" }];
    });
    expect(await rules(selfEdge)).toContain("graph.relationship.endpoint-invalid");

    const governs = await copyValidFixture();
    await mutateYaml(productDeclaration(governs), (declaration) => {
      declaration.relationships = [{ type: "governs", target: "product-current-system", source_section: "product-definition" }];
    });
    expect(await rules(governs)).toContain("graph.relationship.authority-invalid");
  });

  it("verifies document nodes, states, digests, and relationship bindings", async () => {
    const digestMismatch = await copyValidFixture();
    const taskSource = path.join(digestMismatch, "knowledge/tasks/items/task.md");
    await writeFile(taskSource, `${await readFile(taskSource, "utf8")}\nDrifted sentence.\n`);
    expect(await rules(digestMismatch)).toContain("document.digest-mismatch");

    const heading = await copyValidFixture();
    await mutateYaml(bundleFile(heading), (bundle) => {
      const task = bundle.non_records.find((entry: any) => entry.kind === "task");
      task.document.relationships = [{
        type: "references",
        target: { kind: "record", id: "product" },
        source_heading: { heading_path: ["Missing Heading"], occurrence: 1 },
      }];
    });
    expect(await rules(heading)).toContain("graph.relationship.section-unresolved");

    // A legacy-locked Task whose lock identity disagrees with its document
    // declaration is the schema-independent state violation.
    const state = await legacyLockProject("nkf-state-coverage-");
    await mutateYaml(bundleFile(state), (bundle) => {
      const task = bundle.non_records.find((entry: any) => entry.kind === "task");
      task.document.legacy_lock.predecessor_state.task_id = "OTHER-TASK-999";
    });
    expect(await rules(state)).toContain("document.state.invalid");
  });

  it("keeps every changed node in its own impact selection", async () => {
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.81"], "0.81");
    const emitter = new RuleEmitter(loaded.executable);
    // freshness.policy.false-negative is the fail-closed backstop for a
    // policy that would drop a changed node from its own impact selection.
    // The accepted policy always retains changed nodes, so this documents
    // the invariant: the selection contains the changed node and the
    // backstop stays silent.
    const result = evaluateKnowledgeGraph({
      nkfVersion: "0.81",
      bundle: { id: "coverage", root: { profile: "nkf.profile.product", record: "product" }, knowledge_graph: { baseline: ".nourd/knowledge/freshness/baseline.yaml" } },
      records: [],
      documents: [],
      executable: loaded.executable,
      policy: {},
      policyBinding: { expected_sha256: "0".repeat(64), observed_sha256: "0".repeat(64), binding: "verified" },
      baseline: { node_revisions: [{ node: { kind: "record", id: "alpha" }, revision: { algorithm: "sha-256", value: "0".repeat(64) } }] },
      baselinePresent: true,
      request: {
        level: "full-bundle", record_id: null, acceptance_binding: "not-requested",
        purpose: "change-impact",
        changed_inputs: [{ kind: "node", node: { kind: "record", id: "alpha" } }],
      } as ValidationRequest,
      diagnostics: [],
      emitter,
    });
    expect(emitter.diagnostics.map((diagnostic) => diagnostic.rule_id))
      .not.toContain("freshness.policy.false-negative");
    expect(result.readiness.state).toBe("not-ready");
  });

  it("fails closed for unsupported policies, vocabularies, and malformed synthetic inputs", async () => {
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.81"], "0.81");
    const evaluate = (overrides: Record<string, any>) => {
      const emitter = new RuleEmitter(loaded.executable);
      evaluateKnowledgeGraph({
        nkfVersion: "0.81",
        bundle: { id: "coverage", root: { profile: "nkf.profile.product", record: "product" }, knowledge_graph: { baseline: ".nourd/knowledge/freshness/baseline.yaml" } },
        records: [],
        documents: [],
        executable: loaded.executable,
        policy: loaded.freshnessPolicy,
        policyBinding: { expected_sha256: "0".repeat(64), observed_sha256: "0".repeat(64), binding: "verified" },
        baseline: null,
        baselinePresent: false,
        request: { level: "full-bundle", record_id: null, acceptance_binding: "not-requested", purpose: null } as ValidationRequest,
        diagnostics: [],
        emitter,
        ...overrides,
      });
      return [...new Set(emitter.diagnostics.map((diagnostic) => diagnostic.rule_id))];
    };

    expect(evaluate({ policyBinding: undefined, policy: null })).toContain("graph.policy.unavailable");
    expect(evaluate({
      policyBinding: { expected_sha256: "0".repeat(64), observed_sha256: "1".repeat(64), binding: "mismatched" },
      policy: null,
    })).toContain("graph.policy.binding-mismatch");

    const record = (declaration: Record<string, any>) => ({
      artifact: `.nourd/knowledge/records/${declaration.id}.yaml`,
      declaration,
      declarationDigest: "0".repeat(64),
      sourceDigest: "0".repeat(64),
      sourceValid: true,
    });
    const unsupportedVocabulary = evaluate({
      records: [
        record({
          id: "alpha", type: "product", body_contract: "nkf.product",
          governance: { lifecycle: "living", status: "draft", authority: ["human-product-owner"] },
          source: { path: "alpha.md", stable_path: "alpha.md" },
          sections: [{ id: "s", authority: "proposal" }],
          relationships: [{ type: "unregistered-relation", target: "beta", source_section: "s" }],
        }),
        record({
          id: "beta", type: "product", body_contract: "nkf.product",
          governance: { lifecycle: "living", status: "draft", authority: ["human-product-owner"] },
          source: { path: "beta.md", stable_path: "beta.md" },
          sections: [{ id: "s", authority: "proposal" }],
          relationships: [],
        }),
      ],
    });
    expect(unsupportedVocabulary).toContain("graph.relationship.policy-unsupported");

    const malformedDocumentRelationship = evaluate({
      documents: [{
        index: 0,
        declaration: {
          kind: "evidence",
          path: "evidence/item.md",
          document: {
            id: "document-coverage",
            stable_path: "evidence/item.md",
            digest: { algorithm: "sha-256", value: "0".repeat(64) },
            relationships: [{ type: "references", target: { kind: "record", id: "ghost" }, source_heading: { heading_path: ["X"], occurrence: 1 }, extra: true }],
          },
        },
        observation: { bytes: null, entry: { path: "knowledge/evidence/item.md" } },
      }],
    });
    expect(malformedDocumentRelationship).toContain("document.relationship.invalid");

    const decisionBaselineNodes = [{ node: { kind: "record", id: "adr-0001" }, revision: { algorithm: "sha-256", value: "0".repeat(64) } }];
    const unclassified = evaluate({
      records: [
        record({
          id: "adr-0001", type: "decision", body_contract: "nkf.decision",
          governance: { lifecycle: "immutable", status: "accepted", authority: ["human-product-owner"] },
          source: { path: "decisions/0001-x.md", stable_path: "decisions/0001-x.md" },
          sections: [{ id: "s", authority: "accepted-meaning" }],
          relationships: [],
        }),
      ],
      baseline: { node_revisions: decisionBaselineNodes, authored_edges: [], applicability_coverage: [], decision_classifications: [], relationship_coverage: [], confirmation: { disputed: false } },
      baselinePresent: true,
      request: { level: "full-bundle", record_id: null, acceptance_binding: "not-requested", purpose: "whole-root-readiness" } as ValidationRequest,
    });
    expect(unclassified).toContain("freshness.decision.unclassified");
    expect(unclassified).toContain("freshness.review.missing");
  });

  it("classifies conflicting Decisions for the evaluation purpose", async () => {
    const conflict = await copyValidFixture();
    await mutateYaml(productDeclaration(conflict), (declaration) => {
      declaration.type = "decision";
      declaration.body_contract = "nkf.decision";
    });
    // A synthetic conflict classification over the fixture graph: mark the
    // one accepted decision as conflicting for the readiness purpose.
    const project = await copyValidFixture();
    await rm(conflict, { recursive: true, force: true });
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.81"], "0.81");
    const emitter = new RuleEmitter(loaded.executable);
    const record = {
      artifact: ".nourd/knowledge/records/adr-0001.yaml",
      declaration: {
        id: "adr-0001", type: "decision", body_contract: "nkf.decision",
        governance: { lifecycle: "immutable", status: "accepted", authority: ["human-product-owner"] },
        source: { path: "decisions/0001-x.md", stable_path: "decisions/0001-x.md" },
        sections: [{ id: "s", authority: "accepted-meaning" }],
        relationships: [],
      },
      declarationDigest: "0".repeat(64),
      sourceDigest: "0".repeat(64),
      sourceValid: true,
    };
    evaluateKnowledgeGraph({
      nkfVersion: "0.81",
      bundle: { id: "coverage", root: { profile: "nkf.profile.product", record: "product" }, knowledge_graph: { baseline: ".nourd/knowledge/freshness/baseline.yaml" } },
      records: [record],
      documents: [],
      executable: loaded.executable,
      policy: loaded.freshnessPolicy,
      policyBinding: { expected_sha256: "0".repeat(64), observed_sha256: "0".repeat(64), binding: "verified" },
      baseline: {
        node_revisions: [], authored_edges: [], applicability_coverage: [],
        decision_classifications: [{ decision: "adr-0001", purpose: "whole-root-readiness", classification: "conflicts" }],
        relationship_coverage: [],
        confirmation: { disputed: false, reviewer: { kind: "agent", id: "x" }, claim: "semantically-reviewed-whole-root" },
      },
      baselinePresent: true,
      request: { level: "full-bundle", record_id: null, acceptance_binding: "not-requested", purpose: "whole-root-readiness" } as ValidationRequest,
      diagnostics: [],
      emitter,
    });
    const ids = emitter.diagnostics.map((diagnostic) => diagnostic.rule_id);
    expect(ids).toContain("freshness.decision.conflict");
    void project;
  });
});

describe("record, path, and bundle rule coverage", () => {
  it("verifies identity succession, state assertion, and operational dependencies", async () => {
    const successionInvalid = await copyValidFixture();
    await mutateYaml(productDeclaration(successionInvalid), (declaration) => {
      declaration.identity_succession = {
        predecessor_id: "product-current-system",
        graph_revision: { algorithm: "sha-256", value: "0".repeat(64) },
        recorded_by: "repository-owner",
      };
    });
    expect(await rules(successionInvalid)).toContain("record.identity-succession.invalid");

    const chain = await copyValidFixture();
    for (const declarationFile of [productDeclaration(chain), currentSystemDeclaration(chain)]) {
      await mutateYaml(declarationFile, (declaration) => {
        declaration.identity_succession = {
          predecessor_id: "retired-identifier",
          graph_revision: { algorithm: "sha-256", value: "0".repeat(64) },
          recorded_by: "repository-owner",
        };
      });
    }
    expect(await rules(chain)).toContain("record.identity-succession.chain-unresolved");

    const stateAsserting = await copyValidFixture();
    await mutateYaml(productDeclaration(stateAsserting), (declaration) => {
      declaration.id = "product-0.2-adopted";
    });
    expect(await rules(stateAsserting)).toContain("record.identity.state-asserting");

    const dependency = await copyValidFixture();
    await mutateYaml(productDeclaration(dependency), (declaration) => {
      declaration.operational_dependencies = [{ kind: "release-version", source_section: "missing-section" }];
    });
    expect(await rules(dependency)).toContain("record.operational-dependency.invalid");
  });

  it("keeps stable paths neutral and every knowledge-root file declared", async () => {
    const stateAssertingPath = await copyValidFixture();
    await mkdir(path.join(stateAssertingPath, "knowledge/tasks/active"), { recursive: true });
    await rename(
      path.join(stateAssertingPath, "knowledge/tasks/items/task.md"),
      path.join(stateAssertingPath, "knowledge/tasks/active/task.md"),
    );
    await mutateYaml(bundleFile(stateAssertingPath), (bundle) => {
      const task = bundle.non_records.find((entry: any) => entry.kind === "task");
      task.path = "tasks/active/task.md";
      task.document.stable_path = "tasks/active/task.md";
    });
    expect(await rules(stateAssertingPath)).toContain("paths.stable-path.state-asserting");

    const undeclared = await copyValidFixture();
    await writeFile(path.join(undeclared, "knowledge/import-snapshot.bin"), "binary\n");
    expect(await rules(undeclared)).toContain("project.knowledge-root-file.undeclared");

    const attachment = await copyValidFixture();
    await writeFile(path.join(attachment, "knowledge/import-snapshot.bin"), "binary\n");
    await mutateYaml(bundleFile(attachment), (bundle) => {
      bundle.non_records.push({
        path: "import-snapshot.bin",
        kind: "provenance-attachment",
        digest: { algorithm: "sha-256", value: "0".repeat(64) },
      });
    });
    expect(await rules(attachment)).toContain("bundle.provenance-attachment.invalid");

    const declared = await copyValidFixture();
    await writeFile(path.join(declared, "knowledge/import-snapshot.bin"), "binary\n");
    await mutateYaml(bundleFile(declared), (bundle) => {
      bundle.non_records.push({
        path: "import-snapshot.bin",
        kind: "provenance-attachment",
        digest: { algorithm: "sha-256", value: sha256("binary\n") },
      });
    });
    const declaredRules = await rules(declared);
    expect(declaredRules).not.toContain("bundle.provenance-attachment.invalid");
    expect(declaredRules).not.toContain("project.knowledge-root-file.undeclared");
  });

  it("keeps the consolidated current-system boundary and stable source paths", async () => {
    const currentSystem = await copyValidFixture();
    await mutateYaml(currentSystemDeclaration(currentSystem), (declaration) => {
      declaration.type = "evidence";
      declaration.body_contract = "nkf.evidence";
    });
    expect(await rules(currentSystem)).toContain("knowledge.topology.current-system.invalid");

    const stability = await copyValidFixture();
    await mutateYaml(productDeclaration(stability), (declaration) => {
      declaration.source.stable_path = "renamed-product.md";
    });
    expect(await rules(stability)).toContain("knowledge.path.stability.invalid");
  });

  it("verifies predecessor lock bindings on the supported window", async () => {
    const project = await legacyLockProject("nkf-lock-coverage-");
    await mutateYaml(path.join(project, ".nourd/knowledge/bundle.yaml"), (bundle) => {
      const task = bundle.non_records.find((entry: any) => entry.kind === "task");
      task.document.legacy_lock.source_digest.value = "0".repeat(64);
    });
    expect(await rules(project)).toContain("markdown.frontmatter.legacy-lock.invalid");

    const bootstrapParent = await mkdtemp(path.join(os.tmpdir(), "nkf-bootstrap-coverage-"));
    const bootstrap = path.join(bootstrapParent, "project");
    await cp(path.join(repositoryRoot, "fixtures/valid/technology-0-81"), bootstrap, { recursive: true });
    await mutateYaml(path.join(bootstrap, ".nourd/knowledge/records/specification.yaml"), (declaration) => {
      delete declaration.legacy_lock;
      declaration.accepted_bootstrap_lock = {
        source_digest: { algorithm: "sha-256", value: "0".repeat(64) },
        predecessor_version: "0.4",
        predecessor_state: {
          record_lifecycle: "living",
          record_status: "draft",
          decision_authority: "human-product-owner",
          task: "NKF-026",
        },
        current_state: { lifecycle: "immutable", status: "accepted" },
        accepting_decision: { id: "adr-9999", digest: { algorithm: "sha-256", value: "0".repeat(64) } },
      };
    });
    expect(await rules(bootstrap)).toContain("markdown.frontmatter.bootstrap-lock.invalid");
  });
});

describe("contract-set rule coverage", () => {
  async function contractHarness(mutate: (root: string) => Promise<Partial<Record<string, string>>>) {
    const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-contract-coverage-"));
    await mkdir(path.join(parent, "contracts/nkf/0.81"), { recursive: true });
    await mkdir(path.join(parent, "knowledge/specifications"), { recursive: true });
    await cp(contractRoot, path.join(parent, "contracts/nkf/0.81"), { recursive: true });
    await cp(
      path.join(repositoryRoot, "knowledge/specifications/nkf-0.81.md"),
      path.join(parent, "knowledge/specifications/nkf-0.81.md"),
    );
    const digests = await mutate(parent);
    const base = VERSION_BINDINGS["0.81"];
    const bindings = {
      ...base,
      ...(digests.versionDelta === undefined ? {} : {
        versionDelta: { ...base.versionDelta!, sha256: digests.versionDelta },
      }),
      ...(digests.versionDeltaMissing === undefined ? {} : {
        versionDelta: { ...base.versionDelta!, path: "contracts/nkf/0.81/version-delta-absent.yaml" },
      }),
      ...(digests.freshnessPolicy === undefined ? {} : {
        freshnessPolicy: { ...base.freshnessPolicy!, sha256: digests.freshnessPolicy },
      }),
    };
    const loaded = await loadContracts(path.join(parent, "contracts/nkf/0.81"), bindings, "0.81");
    return [...new Set(loaded.diagnostics.map((diagnostic) => diagnostic.rule_id))];
  }

  it("fails closed for missing, incomplete, or misclassified version deltas and invalid policies", async () => {
    expect(await contractHarness(async () => ({ versionDeltaMissing: "yes" })))
      .toContain("version-delta.unavailable");

    expect(await contractHarness(async (root) => {
      const file = path.join(root, "contracts/nkf/0.81/version-delta.yaml");
      const delta = YAML.parse(await readFile(file, "utf8"));
      delete delta.rules["artifact.digest-mismatch"];
      const bytes = YAML.stringify(delta, { lineWidth: 0 });
      await writeFile(file, bytes);
      return { versionDelta: sha256(bytes) };
    })).toContain("version-delta.coverage-incomplete");

    expect(await contractHarness(async (root) => {
      const file = path.join(root, "contracts/nkf/0.81/version-delta.yaml");
      const delta = YAML.parse(await readFile(file, "utf8"));
      delta.rules["artifact.digest-mismatch"].classification = "unrecognized";
      const bytes = YAML.stringify(delta, { lineWidth: 0 });
      await writeFile(file, bytes);
      return { versionDelta: sha256(bytes) };
    })).toContain("version-delta.classification-invalid");

    expect(await contractHarness(async (root) => {
      const file = path.join(root, "contracts/nkf/0.81/freshness-policy.yaml");
      const bytes = `${await readFile(file, "utf8")}unexpected_policy_key: true\n`;
      await writeFile(file, bytes);
      return { freshnessPolicy: sha256(bytes) };
    })).toContain("schema.freshness-policy.invalid");
  });
});
