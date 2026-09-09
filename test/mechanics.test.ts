import { cp, lstat, mkdir, mkdtemp, readFile, readdir, rename, rm, symlink, writeFile } from "node:fs/promises";
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import YAML from "yaml";
import { repositoryRoot, scaledTimeout } from "./helpers.js";

// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
const { sha256, releaseEntriesForVersion } = release;
// @ts-expect-error Repository release-set tooling is directly executable ESM.
const releaseSetTooling = await import("../scripts/release/release-set.mjs");
const { readReleaseSet } = releaseSetTooling;
// @ts-expect-error The digest-bound review and seal module is directly executable ESM.
const sealTooling = await import("../scripts/freshness/seal-baseline-0-7.mjs");
const { sealBaseline0_7, writeReviewTemplate0_7 } = sealTooling;

const adopter = path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs");
const checker = path.join(repositoryRoot, "dist/nourd-nkf-checker.mjs");

function run(command: string, project: string, extra: string[] = []) {
  const result = spawnSync(process.execPath, [adopter, command, "--project", project, ...extra], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    timeout: scaledTimeout(120_000),
    killSignal: "SIGKILL",
  });
  return { ...result, json: result.stdout ? JSON.parse(result.stdout) : null };
}

function check(project: string) {
  const result = spawnSync(
    process.execPath,
    [checker, "--project", project, "--level", "full-bundle", "--no-persist"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  return JSON.parse(result.stdout);
}

async function copyFixture(): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-mechanics-"));
  const project = path.join(parent, "project");
  await cp(path.join(repositoryRoot, "fixtures/valid/minimal-0-81"), project, { recursive: true });
  return project;
}

async function copyTechnologyFixture(): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-mechanics-technology-"));
  const project = path.join(parent, "project");
  await cp(path.join(repositoryRoot, "fixtures/valid/technology-0-81"), project, { recursive: true });
  return project;
}

// A supported-window project carrying one legacy-locked Task document: the
// technology fixture whose Task source still uses the pre-native frontmatter
// and whose bundle declaration locks those exact bytes.
async function legacyLockFixture(): Promise<string> {
  const project = await copyTechnologyFixture();
  const taskPath = path.join(project, "knowledge/tasks/items/task.md");
  const legacySource = (await readFile(taskPath, "utf8")).replace(
    "created_at: 2026-07-30T15:59:54Z\n---",
    "created_at: 2026-07-30T15:59:54Z\ntask_id: TEST-TECH-001\ntask_status: active\n---",
  );
  await writeFile(taskPath, legacySource);
  const legacyDigest = sha256(Buffer.from(legacySource, "utf8"));
  const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
  const bundleText = await readFile(bundlePath, "utf8");
  const priorDigest = YAML.parse(bundleText).non_records.find(
    (item: any) => item.kind === "task",
  ).document.digest.value;
  const locked = bundleText
    .replace(priorDigest, legacyDigest)
    .replace(
      "\n  - path: tasks/by-state/active.md",
      [
        "",
        "      legacy_lock:",
        '        predecessor_version: "0.4"',
        "        source_digest:",
        "          algorithm: sha-256",
        `          value: ${legacyDigest}`,
        "        predecessor_state:",
        "          task_id: TEST-TECH-001",
        "          task_status: active",
        "        initial_declaration_state:",
        "          document_state:",
        "            vocabulary: task-status",
        "            value: active",
        "  - path: tasks/by-state/active.md",
      ].join("\n"),
    );
  expect(locked).not.toBe(bundleText);
  await writeFile(bundlePath, locked);
  return project;
}

// Authors the transition-result section the native transition requires in the
// stable Task source, then re-pins the represented document digest.
async function authorTaskResult(project: string, heading: string, body: string) {
  const source = path.join(project, "knowledge/tasks/items/task.md");
  await writeFile(source, (await readFile(source, "utf8")).replace(
    "\n## Decision Applicability\n",
    `\n${heading}\n\n${body}\n\n## Decision Applicability\n`,
  ));
  const repin = run("repin", project, ["--checker", checker]);
  expect(repin.status, repin.stderr).toBe(0);
}

async function taskState(project: string): Promise<string> {
  const bundle = YAML.parse(
    await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"),
  );
  const task = bundle.non_records.find((item: any) => item.kind === "task");
  return task.document.state.value;
}

async function snapshotTree(root: string) {
  const result = new Map<string, Buffer>();
  const visit = async (directory: string, prefix = "") => {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const relative = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(absolute, relative);
      else if (entry.isFile()) result.set(relative, await readFile(absolute));
    }
  };
  await visit(root);
  return result;
}

async function gitFixture() {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-git-mechanics-"));
  const project = path.join(parent, "project");
  await cp(path.join(repositoryRoot, "fixtures/valid/technology-0-8"), project, { recursive: true });
  const taskId = "TEST-TECH-001";
  const g = (args: string[]) => spawnSync("git", ["-C", project, ...args], { encoding: "utf8" });
  const generatedPath = path.join(project, "dist/generated-adopter.mjs");
  const generatedBytes = Buffer.from("export const generated = true;\n", "utf8");
  await mkdir(path.dirname(generatedPath), { recursive: true });
  await writeFile(generatedPath, generatedBytes);
  await writeFile(path.join(project, ".gitignore"), "dist/\n");
  const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
  const bundle = YAML.parse(await readFile(bundlePath, "utf8"));
  bundle.governed_artifacts.push({
    id: "generated-adopter",
    kind: "build-tool",
    path: "dist/generated-adopter.mjs",
    digest: { algorithm: "sha-256", value: sha256(generatedBytes) },
    record: "realization",
    source_section: "durable-mapping",
  });
  await writeFile(bundlePath, YAML.stringify(bundle, { lineWidth: 0 }));
  g(["init", "-b", "master"]);
  g(["config", "user.email", "fixture@example.com"]);
  g(["config", "user.name", "Fixture"]);
  g(["add", "-A"]);
  g(["commit", "-m", "init"]);
  const bare = path.join(parent, "origin.git");
  spawnSync("git", ["init", "--bare", "-b", "master", bare], { encoding: "utf8" });
  g(["remote", "add", "origin", bare]);
  g(["push", "-u", "origin", "master"]);
  g(["remote", "set-head", "origin", "master"]);
  return { project, taskId, g, bare };
}

describe("deterministic governed mechanics", () => {
  it("exports the reference maps", async () => {
    const project = await copyFixture();
    const productDeclarationPath = path.join(project, ".nourd/knowledge/records/product.yaml");
    const productDeclaration = YAML.parse(await readFile(productDeclarationPath, "utf8"));
    productDeclaration.entities = [
      { id: "source-entity", kind: "concept", defining_section: "product-definition" },
      { id: "target-entity", kind: "concept", defining_section: "product-definition" },
    ];
    productDeclaration.entity_relationships = [{
      type: "depends-on",
      source: { record: "product", entity: "source-entity" },
      target: { record: "product", entity: "target-entity" },
      source_section: "product-definition",
    }];
    await writeFile(productDeclarationPath, YAML.stringify(productDeclaration, { lineWidth: 0 }));
    const result = run("refs", project);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.state).toBe("exported");
    expect(result.json.records.product).toBe("product.md");
    expect(result.json.documents["TEST-001"]).toBe("tasks/items/task.md");
    expect(result.json.tasks["TEST-001"]).toBe("tasks/items/task.md");
    expect(result.json.relationships).toEqual([{
      source: { kind: "entity", record: "product", entity: "source-entity" },
      relationship: "depends-on",
      target: { kind: "entity", record: "product", entity: "target-entity" },
      source_binding: {
        kind: "section",
        node: { kind: "entity", record: "product", entity: "source-entity" },
        section: "product-definition",
      },
    }]);
  });

  it("fails closed instead of collapsing duplicate represented document identities", async () => {
    const project = await copyFixture();
    const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
    const bundle = YAML.parse(await readFile(bundlePath, "utf8"));
    const represented = bundle.non_records.find((item: any) => item.document?.id !== undefined);
    bundle.non_records.push(structuredClone(represented));
    await writeFile(bundlePath, YAML.stringify(bundle, { lineWidth: 0 }));
    const result = run("refs", project);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(`Duplicate governed document identity: ${represented.document.id}`);
  });

  it("fails closed instead of omitting malformed authored relationships", async () => {
    const nonArrayProject = await copyFixture();
    const nonArrayPath = path.join(nonArrayProject, ".nourd/knowledge/records/product.yaml");
    const nonArray = YAML.parse(await readFile(nonArrayPath, "utf8"));
    nonArray.relationships = {};
    await writeFile(nonArrayPath, YAML.stringify(nonArray, { lineWidth: 0 }));
    const omitted = run("refs", nonArrayProject);
    expect(omitted.status).toBe(1);
    expect(omitted.stderr).toContain("non-array relationship or entity field");

    const malformedProject = await copyFixture();
    const malformedPath = path.join(malformedProject, ".nourd/knowledge/records/product.yaml");
    const malformed = YAML.parse(await readFile(malformedPath, "utf8"));
    malformed.relationships = [{ type: "depends-on", source_section: "product-definition" }];
    await writeFile(malformedPath, YAML.stringify(malformed, { lineWidth: 0 }));
    const invalid = run("refs", malformedProject);
    expect(invalid.status).toBe(1);
    expect(invalid.stderr).toContain("unsupported fields");
  });

  it("exports the exact accepted release-set membership", async () => {
    const result = run("set", repositoryRoot);
    const bundle = await readFile(
      path.join(repositoryRoot, ".nourd/knowledge/bundle.yaml"),
      "utf8",
    );
    const declared = /^nkf_version: "([^"]+)"$/m.exec(bundle)?.[1] ?? "0.7";
    const releaseSet = await readReleaseSet(repositoryRoot, declared);
    const expectedEntries = releaseEntriesForVersion(declared, releaseSet);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.state).toBe("enumerated");
    expect(result.json.nkf_version).toBe(declared);
    const expectedPaths = expectedEntries.map((entry: { path: string }) => entry.path);
    expect(result.json.members.map((member: { path: string }) => member.path)).toEqual(
      expectedPaths,
    );
    expect(result.json.members).toEqual(releaseSet.members);
    const classPaths = (classes: string[]) =>
      releaseSet.members
        .filter((member: { class: string }) => classes.includes(member.class))
        .map((member: { path: string }) => member.path);
    expect(expectedPaths).toContain("dist/nourd-nkf-adopt.mjs");
    for (const classes of [
      ["host-adapter-instruction"],
      ["product-fixture", "technology-fixture"],
      ["public-documentation"],
    ]) {
      const expected = classPaths(classes);
      expect(expected.length).toBeGreaterThan(0);
      expect(
        expectedPaths.filter((member: string) => expected.includes(member)),
      ).toHaveLength(expected.length);
    }
    const guidancePaths = classPaths([
      "authoring-protocol",
      "onboarding-protocol",
      "release-protocol",
      "adoption-protocol",
      "portable-skill",
    ]);
    const guidance = result.json.members.filter((member: { path: string }) =>
      guidancePaths.includes(member.path),
    );
    expect(guidance).toHaveLength(guidancePaths.length);
    for (const member of guidance) expect(member.mode, member.path).toBe("0644");

    const representationProject = path.join(
      await mkdtemp(path.join(os.tmpdir(), "nkf-set-representation-")),
      "project",
    );
    await mkdir(path.join(representationProject, ".nourd/knowledge"), { recursive: true });
    await mkdir(path.join(representationProject, "knowledge"), { recursive: true });
    await mkdir(path.join(representationProject, "contracts/nkf/0.8"), { recursive: true });
    await writeFile(
      path.join(representationProject, ".nourd/knowledge/bundle.yaml"),
      [
        "contract: nkf.bundle",
        "root:",
        "  profile: nkf.profile.technology",
        "  record: representation-fixture",
        "knowledge_root: knowledge",
        "nkf_version: '0.8'",
        "id: representation-fixture",
        "non_records: []",
        "",
      ].join("\n"),
    );
    await cp(
      path.join(repositoryRoot, "contracts/nkf/0.8/release-set.yaml"),
      path.join(representationProject, "contracts/nkf/0.8/release-set.yaml"),
    );
    const representedSet = run("set", representationProject);
    expect(representedSet.status, representedSet.stderr).toBe(0);
    expect(representedSet.json).toMatchObject({ state: "enumerated", nkf_version: "0.8" });
    expect(representedSet.json.members).toHaveLength(141);
  });

  it("re-pins record digests after an edit", async () => {
    const project = await copyFixture();
    const doc = path.join(project, "knowledge/product.md");
    await writeFile(doc, `${await readFile(doc, "utf8")}\nAppended sentence.\n`);
    const result = run("repin", project, ["--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.records).toBe(1);
    expect(check(project).conformance).toBe("passed");
  });

  it("computes the 0.81 delta closure with the policy's impact propagation and refuses a narrower claim", async () => {
    // The Product record applies-to the current-system Realization
    // (source-to-target propagation) and depends-on it (target-to-source), so
    // a change to either endpoint reaches the other. Both authorities are
    // permitted for proposal sections; `supersedes` requires accepted meaning
    // the draft fixture does not carry.
    const project = await copyFixture();
    const declarationPath = path.join(project, ".nourd/knowledge/records/product.yaml");
    const declaration = YAML.parse(await readFile(declarationPath, "utf8"));
    declaration.relationships = [
      { type: "applies-to", target: "product-current-system", source_section: "product-definition" },
    ];
    await writeFile(declarationPath, YAML.stringify(declaration, { lineWidth: 0 }));
    const repin = run("repin", project, ["--checker", checker]);
    expect(repin.status, repin.stderr).toBe(0);
    const complete = (reviewPath: string) => {
      const review = YAML.parse(readFileSync(reviewPath, "utf8"));
      review.reviewer = { kind: "agent", id: "nkf-mechanics-test-reviewer" };
      review.reviewed_at = "2026-09-08T12:00:00.000Z";
      for (const entry of review.nodes) {
        if (entry.provenance?.carried !== undefined) continue;
        entry.state = "eligible";
        entry.role = entry.node.kind === "record" && String(entry.node.id).includes("current-system") ? "realizes" : "governs";
      }
      for (const entry of review.relationships) {
        if (entry.state === "REVIEW_REQUIRED") entry.state = "reviewed";
      }
      for (const entry of review.decision_classifications) {
        if (entry.classification === "REVIEW_REQUIRED") entry.classification = "compatible";
      }
      review.observations[0].finding = "The mechanics test reviewer read every required subject.";
      review.limitations = ["Test review; no semantic authority claimed."];
      writeFileSync(reviewPath, YAML.stringify(review, { lineWidth: 0, aliasDuplicateObjects: false }));
      return review;
    };
    const versionDeltaDigest = sha256(await readFile(path.join(repositoryRoot, "contracts/nkf/0.81/version-delta.yaml")));
    // Establish a confirmed predecessor baseline that already knows the edge.
    const wholeRoot = path.join(project, "..", "whole-root-review.yaml");
    await writeReviewTemplate0_7({ projectRoot: project, checker, reviewPath: wholeRoot, stage: "whole-root" });
    complete(wholeRoot);
    await sealBaseline0_7({ projectRoot: project, checker, reviewPath: wholeRoot, versionDeltaDigest });
    expect(check(project).conformance).toBe("passed");

    // Change the source: the unchanged target enters the closure by
    // propagation and is marked for fresh review, not carried.
    const doc = path.join(project, "knowledge/product.md");
    await writeFile(doc, `${await readFile(doc, "utf8")}\nPropagated change.\n`);
    expect(run("repin", project, ["--checker", checker]).status).toBe(0);
    const deltaReview = path.join(project, "..", "delta-review.yaml");
    const template = await writeReviewTemplate0_7({ projectRoot: project, checker, reviewPath: deltaReview, stage: "delta" });
    const generated = YAML.parse(readFileSync(deltaReview, "utf8"));
    const closure = generated.computed_closure.map((node: unknown) => JSON.stringify(node));
    expect(closure).toContain(JSON.stringify({ kind: "record", id: "product" }));
    expect(closure).toContain(JSON.stringify({ kind: "record", id: "product-current-system" }));
    expect(closure).not.toContain(JSON.stringify({ kind: "document", id: "TEST-001" }));
    expect(template.fresh).toBe(2);
    const target = generated.nodes.find((entry: any) => entry.node.id === "product-current-system");
    expect(target.provenance).toEqual({ performed: true });
    expect(target.state).toBe("REVIEW_REQUIRED");
    const untouched = generated.nodes.find((entry: any) => entry.node.id === "TEST-001");
    expect(untouched.provenance.carried).toBeDefined();

    // A claim whose recorded closure omits the propagated target is refused,
    // and so is one that carries the target instead of performing it.
    complete(deltaReview);
    const narrowed = YAML.parse(readFileSync(deltaReview, "utf8"));
    narrowed.computed_closure = narrowed.computed_closure.filter((node: any) => node.id !== "product-current-system");
    const narrowedPath = path.join(project, "..", "narrowed-review.yaml");
    writeFileSync(narrowedPath, YAML.stringify(narrowed, { lineWidth: 0, aliasDuplicateObjects: false }));
    await expect(sealBaseline0_7({ projectRoot: project, checker, reviewPath: narrowedPath, versionDeltaDigest }))
      .rejects.toThrow(/exact recomputed required-review closure.*product-current-system/);
    const carried = YAML.parse(readFileSync(deltaReview, "utf8"));
    const carriedTarget = carried.nodes.find((entry: any) => entry.node.id === "product-current-system");
    carriedTarget.provenance = {
      carried: { performed_in_graph_revision: { algorithm: "sha-256", value: "0".repeat(64) }, performing_reviewer: { kind: "agent", id: "tamperer" } },
    };
    const carriedPath = path.join(project, "..", "carried-review.yaml");
    writeFileSync(carriedPath, YAML.stringify(carried, { lineWidth: 0, aliasDuplicateObjects: false }));
    await expect(sealBaseline0_7({ projectRoot: project, checker, reviewPath: carriedPath, versionDeltaDigest }))
      .rejects.toThrow(/performed set does not contain the computed closure/);

    // The exact template closure seals, and the checker accepts the claim.
    const sealed = await sealBaseline0_7({ projectRoot: project, checker, reviewPath: deltaReview, versionDeltaDigest });
    expect(sealed).toMatchObject({ state: "sealed", stage: "delta", performed: 2 });
    const baseline = YAML.parse(await readFile(path.join(project, ".nourd/knowledge/freshness/baseline.yaml"), "utf8"));
    expect(baseline.confirmation.computed_closure).toHaveLength(2);
    const validated = check(project);
    expect(validated.diagnostics, JSON.stringify(validated.diagnostics)).toEqual([]);
    expect(validated.conformance).toBe("passed");

    // Audit P1: both seals above were produced from real source revisions.
    // Readiness must depend on the retained predecessor, never on the claim
    // being verified. Keep voluntary extra review separate from changed seeds.
    const baselinePath = path.join(project, ".nourd/knowledge/freshness/baseline.yaml");
    const validBytes = await readFile(baselinePath);
    const historyPath = path.join(project, baseline.predecessor.path);
    const priorBytes = await readFile(historyPath);
    expect(sha256(priorBytes)).toBe(baseline.predecessor.digest.value);
    const prior = YAML.parse(priorBytes.toString("utf8"));
    const readiness = () => {
      const result = spawnSync(process.execPath, [checker, "--project", project,
        "--level", "full-bundle", "--purpose", "whole-root-readiness",
        "--require-readiness", "--no-persist"], {encoding:"utf8", maxBuffer:64*1024*1024});
      return JSON.parse(result.stdout);
    };
    expect(readiness().readiness.state).toBe("ready");
    const carry = {carried:{performed_in_graph_revision:prior.graph_revision,performing_reviewer:prior.confirmation.reviewer}};
    const mutations: Array<[string, (b: any) => void]> = [
      ["erased closure including initiating node", b => { b.confirmation.computed_closure=[]; }],
      ["required reached judgment carried", b => {
        b.confirmation.computed_closure=[];
        b.confirmation.performed_set=b.confirmation.performed_set.filter((n:any)=>n.id!=="product-current-system");
        for(const e of b.applicability_coverage) if(e.node.id==="product-current-system") e.provenance=carry;
      }],
      ["changed initiating judgment carried", b => {
        b.confirmation.computed_closure=[]; b.confirmation.performed_set=[];
        for(const e of b.applicability_coverage) e.provenance=carry;
      }],
      ["required purpose judgment carried", b => { b.applicability_coverage.find((e:any)=>e.node.id==="product-current-system").provenance=carry; }],
      ["missing predecessor", b => { delete b.predecessor; }],
      ["extra closure node", b => { b.confirmation.computed_closure.push({kind:"document",id:"TEST-001"}); }],
      ["duplicate closure node", b => { b.confirmation.computed_closure.push(b.confirmation.computed_closure[0]); }],
      ["forged performing reviewer", b => { for(const e of b.applicability_coverage) if(e.provenance.carried) e.provenance.carried.performing_reviewer.id="forged"; }],
      ["relabeled whole-root carrying judgments", b => { b.confirmation.claim="semantically-reviewed-whole-root"; delete b.predecessor; delete b.confirmation.computed_closure; delete b.confirmation.performed_set; }],
    ];
    for(const [label, mutate] of mutations) {
      const changed=structuredClone(baseline); mutate(changed);
      await writeFile(baselinePath,YAML.stringify(changed,{lineWidth:0,aliasDuplicateObjects:false}));
      expect(readiness().readiness.state,label).not.toBe("ready");
    }
    for (const [label, mutate] of [
      ["foreign bundle", (p:any)=>{p.bundle="foreign";}],
      ["wrong policy identity", (p:any)=>{p.policy.id="unaccepted-policy";}],
      ["unreproducible historical graph", (p:any)=>{p.graph_revision.value="0".repeat(64);}],
      ["incomplete historical coverage", (p:any)=>{p.applicability_coverage.pop();}],
      ["unsupported predecessor shape", (p:any)=>{p.unsupported=true;}],
    ] as Array<[string,(p:any)=>void]>) {
      const changedPrior=structuredClone(prior); mutate(changedPrior);
      const changedBytes=Buffer.from(YAML.stringify(changedPrior,{lineWidth:0,aliasDuplicateObjects:false}));
      const digest=sha256(changedBytes);
      const changed=structuredClone(baseline);
      changed.predecessor={path:`.nourd/knowledge/freshness/history/sha256-${digest}.yaml`,digest:{algorithm:"sha-256",value:digest}};
      await writeFile(path.join(project,changed.predecessor.path),changedBytes);
      await writeFile(baselinePath,YAML.stringify(changed,{lineWidth:0,aliasDuplicateObjects:false}));
      expect(readiness().readiness.state,label).not.toBe("ready");
    }
    await writeFile(baselinePath,validBytes);
    await writeFile(historyPath,Buffer.concat([priorBytes,Buffer.from("# tampered\n")]));
    expect(readiness().readiness.state).not.toBe("ready");
    await rm(historyPath);
    expect(readiness().readiness.state).not.toBe("ready");
    await writeFile(historyPath,priorBytes);
    const historyDirectory=path.dirname(historyPath);
    await rename(historyDirectory,`${historyDirectory}-actual`);
    await symlink(`${historyDirectory}-actual`,historyDirectory,"dir");
    expect(readiness().readiness.state).not.toBe("ready");
    await rm(historyDirectory); await rename(`${historyDirectory}-actual`,historyDirectory);
    expect(readiness().readiness.state).toBe("ready");

    // A later no-change delta still verifies the earlier delta's proof.
    const secondReview=path.join(project,"..","second-review.yaml");
    await writeReviewTemplate0_7({projectRoot:project,checker,reviewPath:secondReview,stage:"delta"});
    complete(secondReview);
    await sealBaseline0_7({projectRoot:project,checker,reviewPath:secondReview,versionDeltaDigest});
    expect(readiness().readiness.state).toBe("ready");
    const second=YAML.parse(await readFile(baselinePath,"utf8"));
    const forged=structuredClone(baseline); forged.confirmation.computed_closure=[];
    const forgedBytes=Buffer.from(YAML.stringify(forged,{lineWidth:0,aliasDuplicateObjects:false}));
    const forgedHash=sha256(forgedBytes);
    second.predecessor={path:`.nourd/knowledge/freshness/history/sha256-${forgedHash}.yaml`,digest:{algorithm:"sha-256",value:forgedHash}};
    await writeFile(path.join(project,second.predecessor.path),forgedBytes);
    await writeFile(baselinePath,YAML.stringify(second,{lineWidth:0,aliasDuplicateObjects:false}));
    expect(readiness().readiness.state).not.toBe("ready");
    const rejectedBytes = await readFile(baselinePath);
    const previousHistory = (await readdir(historyDirectory)).sort();
    const rejectedReview = path.join(project,"..","rejected-chain-review.yaml");
    await writeReviewTemplate0_7({projectRoot:project,checker,reviewPath:rejectedReview,stage:"delta"});
    complete(rejectedReview);
    await expect(sealBaseline0_7({projectRoot:project,checker,reviewPath:rejectedReview,versionDeltaDigest}))
      .rejects.toThrow(/sealed predecessor proof was refused/);
    expect(await readFile(baselinePath)).toEqual(rejectedBytes);
    expect((await readdir(historyDirectory)).sort()).toEqual(previousHistory);

    // Loss of history requires fresh whole-root review, which must remain a
    // usable recovery path and must not invent any predecessor bytes.
    await rm(path.join(project,second.predecessor.path));
    const recoveryReview=path.join(project,"..","recovery-review.yaml");
    await writeReviewTemplate0_7({projectRoot:project,checker,reviewPath:recoveryReview,stage:"whole-root"});
    complete(recoveryReview);
    await sealBaseline0_7({projectRoot:project,checker,reviewPath:recoveryReview,versionDeltaDigest});
    expect(readiness().readiness.state).toBe("ready");
    expect(YAML.parse(await readFile(baselinePath,"utf8")).predecessor).toBeUndefined();

    // Direction matters: depends-on propagates target-to-source only, so a
    // changed target pulls its dependent source while a changed source
    // pulls nothing through that edge.
    const directional = await copyFixture();
    const directionalDeclarationPath = path.join(directional, ".nourd/knowledge/records/product.yaml");
    const directionalDeclaration = YAML.parse(await readFile(directionalDeclarationPath, "utf8"));
    directionalDeclaration.relationships = [
      { type: "depends-on", target: "product-current-system", source_section: "product-definition" },
    ];
    await writeFile(directionalDeclarationPath, YAML.stringify(directionalDeclaration, { lineWidth: 0 }));
    expect(run("repin", directional, ["--checker", checker]).status).toBe(0);
    const directionalWholeRoot = path.join(directional, "..", "whole-root-review.yaml");
    await writeReviewTemplate0_7({ projectRoot: directional, checker, reviewPath: directionalWholeRoot, stage: "whole-root" });
    complete(directionalWholeRoot);
    await sealBaseline0_7({ projectRoot: directional, checker, reviewPath: directionalWholeRoot, versionDeltaDigest });
    const directionalDoc = path.join(directional, "knowledge/product.md");
    await writeFile(directionalDoc, `${await readFile(directionalDoc, "utf8")}\nSource-only change.\n`);
    expect(run("repin", directional, ["--checker", checker]).status).toBe(0);
    const directionalReview = path.join(directional, "..", "delta-review.yaml");
    await writeReviewTemplate0_7({ projectRoot: directional, checker, reviewPath: directionalReview, stage: "delta" });
    const directionalClosure = YAML.parse(readFileSync(directionalReview, "utf8")).computed_closure
      .map((node: any) => node.id);
    expect(directionalClosure).toEqual(["product"]);
  });

  it("re-pins a governed artifact independent of sibling order without rewriting other bundle bytes", async () => {
    const project = await copyTechnologyFixture();
    const artifactPath = path.join(project, "src/example.ts");
    const changedArtifact = Buffer.from("export const value = 2;\n", "utf8");
    await writeFile(artifactPath, changedArtifact);
    const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
    const original = await readFile(bundlePath, "utf8");
    const priorDigest = YAML.parse(original).governed_artifacts[0].digest.value;
    const reordered = original.replace(
      "    path: src/example.ts\n    digest:\n      algorithm: sha-256\n      value:",
      "    # preserved artifact sibling comment\n    digest:\n      algorithm: sha-256\n      value:",
    ).replace(
      "    record: realization",
      "    path: src/example.ts\n    record: realization",
    );
    expect(reordered).not.toBe(original);
    await writeFile(bundlePath, reordered);
    const result = run("repin", project, ["--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.artifacts).toBe(1);
    expect(await readFile(bundlePath, "utf8")).toBe(
      reordered.replace(priorDigest, `"${sha256(changedArtifact)}"`),
    );
  });

  it("rejects anchored, tagged, aliased, and merged scalar mutation targets before writing", async () => {
    for (const representation of ["anchored", "tagged", "aliased", "merged"] as const) {
      const project = await copyTechnologyFixture();
      const artifactPath = path.join(project, "src/example.ts");
      await writeFile(artifactPath, "export const value = 3;\n");
      const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
      const original = await readFile(bundlePath, "utf8");
      const priorDigest = YAML.parse(original).governed_artifacts[0].digest.value;
      let unsupported = original;
      if (representation === "anchored") {
        unsupported = original.replace(`value: ${priorDigest}`, `value: &bound ${priorDigest}`);
      } else if (representation === "tagged") {
        unsupported = original.replace(`value: ${priorDigest}`, `value: !!str ${priorDigest}`);
      } else if (representation === "aliased") {
        unsupported = original
          .replace("algorithm: sha-256", "algorithm: &bound sha-256")
          .replace(`value: ${priorDigest}`, "value: *bound");
      } else {
        unsupported = original.replace(
          `    digest:\n      algorithm: sha-256\n      value: ${priorDigest}`,
          `    digest:\n      <<: &inherited-digest\n        algorithm: sha-256\n        value: ${priorDigest}\n      algorithm: sha-256\n      value: ${priorDigest}`,
        );
      }
      expect(unsupported, representation).not.toBe(original);
      await writeFile(bundlePath, unsupported);
      const result = run("repin", project, ["--checker", checker]);
      expect(result.status, `${representation}: ${result.stderr}`).toBe(1);
      expect(result.stderr).toMatch(/anchored|tagged|aliased|merged|unique scalar/i);
      expect(await readFile(bundlePath, "utf8")).toBe(unsupported);
    }
  });

  it("converts one changed legacy-locked Task document to its native envelope transactionally", async () => {
    const project = await legacyLockFixture();
    const sourcePath = path.join(project, "knowledge/tasks/items/task.md");
    const originalSource = await readFile(sourcePath, "utf8");
    const nativeSource = originalSource
      .replace(/^task_id: .*\n/m, "")
      .replace(/^task_status: .*\n/m, "")
      .replace("\n## Decision Applicability\n", "\nNative predecessor Task edit.\n\n## Decision Applicability\n");
    await writeFile(sourcePath, nativeSource);
    const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
    const originalBundle = await readFile(bundlePath, "utf8");
    const commentedBundle = originalBundle.replace(
      "      legacy_lock:\n",
      "      # preserved Task sibling comment\n      legacy_lock:\n",
    );
    await writeFile(bundlePath, commentedBundle);
    const result = run("repin", project, ["--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.documents).toBe(1);
    const repinnedText = await readFile(bundlePath, "utf8");
    const repinned = YAML.parse(repinnedText);
    const task = repinned.non_records.find((item: any) => item.kind === "task");
    expect(task.document.legacy_lock).toBeUndefined();
    expect(task.document.digest.value).toBe(sha256(Buffer.from(nativeSource, "utf8")));
    expect(repinnedText).toContain("# preserved Task sibling comment");
    const repeated = run("repin", project, ["--checker", checker]);
    expect(repeated.status, repeated.stderr).toBe(0);
    expect(repeated.json).toMatchObject({ records: 0, documents: 0, artifacts: 0 });
    expect(await readFile(bundlePath, "utf8")).toBe(repinnedText);
  });

  it("linkifies same-bundle references idempotently", async () => {
    const project = await copyFixture();
    const map = path.join(project, "knowledge/README.md");
    await writeFile(map, `${(await readFile(map, "utf8")).trimEnd()}\n\nSee TEST-001 for the active work.\n`);
    const first = run("linkify", project, ["--checker", checker]);
    expect(first.status, first.stderr).toBe(0);
    expect(first.json.changed).toBe(1);
    expect(await readFile(map, "utf8")).toContain("[TEST-001](tasks/items/task.md)");
    const second = run("linkify", project, ["--checker", checker]);
    expect(second.json.changed).toBe(0);
  });

  it("linkifies and natively re-pins a represented legacy Task document", async () => {
    const project = await legacyLockFixture();
    const taskPath = path.join(project, "knowledge/tasks/items/task.md");
    const nativeTask = (await readFile(taskPath, "utf8"))
      .replace(/^task_id: .*\n/m, "")
      .replace(/^task_status: .*\n/m, "")
      .replace(
        "\n## Decision Applicability\n",
        "\nSee `realization` for the realized system.\n\n## Decision Applicability\n",
      );
    await writeFile(taskPath, nativeTask);
    const first = run("linkify", project, ["--checker", checker]);
    expect(first.status, first.stderr).toBe(0);
    expect(first.json).toMatchObject({ changed: 1, repinned_documents: 1 });
    expect(await readFile(taskPath, "utf8")).toContain(
      "See [`realization`](../../realizations/current-system.md) for the realized system.",
    );
    const bundle = YAML.parse(
      await readFile(path.join(project, ".nourd/knowledge/bundle.yaml"), "utf8"),
    );
    const task = bundle.non_records.find((item: any) => item.kind === "task");
    expect(task.document.legacy_lock).toBeUndefined();
    expect(task.document.digest.value).toBe(sha256(await readFile(taskPath)));
    const second = run("linkify", project, ["--checker", checker]);
    expect(second.status, second.stderr).toBe(0);
    expect(second.json).toMatchObject({ changed: 0, repinned_documents: 0 });
  });

  it("transitions a native 0.81 Task and seals the mechanically-concluded baseline in the same transaction", async () => {
    const project = await copyFixture();
    await authorTaskResult(
      project,
      "## Completion Result",
      "The fixture work completed with all criteria satisfied.",
    );
    const source = path.join(project, "knowledge/tasks/items/task.md");
    const sourceBytes = await readFile(source);

    const result = run("task", project, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json).toMatchObject({
      state: "transitioned",
      task: "TEST-001",
      prior_task_status: "active",
      task_status: "completed",
      generated_navigation: 4,
      baseline_conclusion: {
        state: "concluded",
        claim: "mechanically-concluded",
        task: "TEST-001",
        from_state: "active",
        to_state: "completed",
        performed: 0,
      },
    });
    expect(result.json.changed_subjects).toEqual([
      ".nourd/knowledge/bundle.yaml",
      ".nourd/knowledge/freshness/baseline.yaml",
      expect.stringMatching(/^\.nourd\/knowledge\/freshness\/history\/sha256-[0-9a-f]{64}\.yaml$/),
      "knowledge/tasks/by-state/active.md",
      "knowledge/tasks/by-state/cancelled.md",
      "knowledge/tasks/by-state/completed.md",
      "knowledge/tasks/by-state/deferred.md",
    ]);
    expect(await readFile(source)).toEqual(sourceBytes);
    await expect(lstat(path.join(project, "knowledge/tasks/completed/task.md"))).rejects.toThrow();
    expect(await taskState(project)).toBe("completed");
    expect(await readFile(path.join(project, "knowledge/tasks/by-state/active.md"), "utf8")).not.toContain("TEST-001");
    expect(await readFile(path.join(project, "knowledge/tasks/by-state/completed.md"), "utf8")).toContain("[TEST-001](../items/task.md)");

    // The sealed successor baseline carries every judgment, binds the exact
    // transition, performs zero judgments, and matches the exact candidate
    // graph revision.
    const baseline = YAML.parse(
      await readFile(path.join(project, ".nourd/knowledge/freshness/baseline.yaml"), "utf8"),
    );
    expect(baseline.nkf_version).toBe("0.81");
    expect(baseline.confirmation.claim).toBe("mechanically-concluded");
    expect(baseline.confirmation.transition).toMatchObject({
      task: "TEST-001",
      from_state: "active",
      to_state: "completed",
    });
    expect(baseline.confirmation.transition.predecessor_graph_revision.value).toBe(
      result.json.baseline_conclusion.predecessor_graph_revision,
    );
    expect(baseline.graph_revision.value).toBe(result.json.baseline_conclusion.graph_revision);
    for (const entry of baseline.applicability_coverage) {
      expect(entry.provenance.performed).toBeUndefined();
      expect(entry.provenance.carried).toBeDefined();
      const taskNode = entry.node.kind === "document" && entry.node.id === "TEST-001";
      if (taskNode) {
        expect(entry.provenance.transition).toEqual({
          task: "TEST-001",
          from_state: "active",
          to_state: "completed",
        });
      } else {
        expect(entry.provenance.transition).toBeUndefined();
      }
    }
    const validated = check(project);
    expect(validated.conformance).toBe("passed");
    expect(validated.diagnostics).toEqual([]);
    expect(validated.knowledge_graph.candidate_graph_revision.value).toBe(
      validated.knowledge_graph.baseline_graph_revision.value,
    );
    expect(validated.knowledge_graph.baseline_graph_revision.value).toBe(
      result.json.baseline_conclusion.graph_revision,
    );

    const current = run("task", project, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(current.status, current.stderr).toBe(0);
    expect(current.json).toEqual({
      state: "current",
      task: "TEST-001",
      prior_task_status: "completed",
      task_status: "completed",
      generated_navigation: 0,
      changed_subjects: [],
    });
  });

  it("refuses a 0.81 transition whose staged graph delta exceeds the closed transition vocabulary", async () => {
    const project = await copyFixture();
    await authorTaskResult(
      project,
      "## Completion Result",
      "The fixture work completed with all criteria satisfied.",
    );
    // An excess change beyond the Task state: a governed record moved without
    // a fresh semantic review, staged through an ordinary repin.
    const doc = path.join(project, "knowledge/product.md");
    await writeFile(doc, `${await readFile(doc, "utf8")}\nExcess governed change.\n`);
    const repin = run("repin", project, ["--checker", checker]);
    expect(repin.status, repin.stderr).toBe(0);
    const before = await snapshotTree(project);

    const refused = run("task", project, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(refused.status).toBe(1);
    expect(refused.stderr).toContain(
      "refuses a graph delta beyond the closed transition vocabulary",
    );
    expect(refused.stderr).toContain("changed node");

    // Nothing mutated: the refusal happened before any project write.
    const after = await snapshotTree(project);
    expect([...after.keys()]).toEqual([...before.keys()]);
    for (const [key, bytes] of before) expect(after.get(key), key).toEqual(bytes);
    expect(await taskState(project)).toBe("active");
  });

  it("requires the authored Completion Result and rejects --result-file", async () => {
    const missingResult = await copyFixture();
    const blocked = run("task", missingResult, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(blocked.status).toBe(1);
    expect(blocked.stderr).toContain("## Completion Result");

    const rejectedFlag = await copyFixture();
    await authorTaskResult(
      rejectedFlag,
      "## Completion Result",
      "The fixture work completed with all criteria satisfied.",
    );
    const resultFile = path.join(rejectedFlag, "..", "result.md");
    await writeFile(resultFile, "External result text.\n");
    const rejected = run("task", rejectedFlag, [
      "--task", "TEST-001", "--to", "close", "--result-file", resultFile, "--checker", checker,
    ]);
    expect(rejected.status).toBe(1);
    expect(rejected.stderr).toContain("do not accept --result-file");
  });

  it("blocks closing when the gate carries unexcepted findings", async () => {
    const project = await copyFixture();
    const task = path.join(project, "knowledge/tasks/items/task.md");
    await writeFile(task, (await readFile(task, "utf8")).replace(
      "No mandatory capability is implicated by this Task.",
      [
        "| Capability | Finding | Verification | Exception |",
        "| --- | --- | --- | --- |",
        "| Custom terrain | unsupported | none | none |",
      ].join("\n"),
    ).replace(
      "\n## Decision Applicability\n",
      "\n## Completion Result\n\nCompletion attempted despite the unexcepted finding.\n\n## Decision Applicability\n",
    ));
    run("repin", project, ["--checker", checker]);
    const result = run("task", project, ["--task", "TEST-001", "--to", "close", "--checker", checker]);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("gate blocks completion");
    expect(await taskState(project)).toBe("active");
  });

  it("defers and reactivates a 0.81 task through chained mechanical conclusions", async () => {
    const project = await copyFixture();
    const deferred = run("task", project, ["--task", "TEST-001", "--to", "defer", "--checker", checker]);
    expect(deferred.status, deferred.stderr).toBe(0);
    expect(deferred.json.baseline_conclusion).toMatchObject({
      claim: "mechanically-concluded",
      from_state: "active",
      to_state: "deferred",
      performed: 0,
    });
    expect(await taskState(project)).toBe("deferred");
    const activated = run("task", project, ["--task", "TEST-001", "--to", "activate", "--checker", checker]);
    expect(activated.status, activated.stderr).toBe(0);
    expect(activated.json.baseline_conclusion).toMatchObject({
      claim: "mechanically-concluded",
      from_state: "deferred",
      to_state: "active",
      performed: 0,
    });
    expect(await taskState(project)).toBe("active");
    const validated = check(project);
    expect(validated.conformance).toBe("passed");
    expect(validated.knowledge_graph.candidate_graph_revision.value).toBe(
      validated.knowledge_graph.baseline_graph_revision.value,
    );
  });

  it("cancels a task with a recorded rationale and no completion gate", async () => {
    const project = await copyFixture();
    const task = path.join(project, "knowledge/tasks/items/task.md");
    await writeFile(task, (await readFile(task, "utf8")).replace(
      "No mandatory capability is implicated by this Task.",
      [
        "| Capability | Finding | Verification | Exception |",
        "| --- | --- | --- | --- |",
        "| Custom terrain | unsupported | none | none |",
      ].join("\n"),
    ));
    run("repin", project, ["--checker", checker]);
    const noRationale = run("task", project, ["--task", "TEST-001", "--to", "cancel", "--checker", checker]);
    expect(noRationale.status).toBe(1);
    expect(noRationale.stderr).toContain("## Cancellation Result");
    await authorTaskResult(
      project,
      "## Cancellation Result",
      "Cancelled: the capability is unsupported and the work will not be done.",
    );
    const result = run("task", project, ["--task", "TEST-001", "--to", "cancel", "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(await taskState(project)).toBe("cancelled");
    const terminal = run("task", project, ["--task", "TEST-001", "--to", "activate", "--checker", checker]);
    expect(terminal.status).toBe(1);
    expect(terminal.stderr).toContain("terminal");
  });

  it("refuses a git transition on a dirty work tree", async () => {
    const { project, taskId } = await gitFixture();
    await writeFile(path.join(project, "dirty.txt"), "x\n");
    const result = run("task", project, ["--task", taskId, "--to", "defer", "--checker", checker]);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("work tree must be clean");
  });

  it("defers on a task branch, commits, pushes, and restores the default branch", async () => {
    const { project, taskId, g, bare } = await gitFixture();
    const result = run("task", project, ["--task", taskId, "--to", "defer", "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    // A pinned NKF 0.8 predecessor keeps its exact prior behavior: no
    // mechanical conclusion baseline accompanies the transition.
    expect(result.json.baseline_conclusion).toBeUndefined();
    expect(result.json.changed_subjects).not.toContain(
      ".nourd/knowledge/freshness/baseline.yaml",
    );
    expect(result.json.git.branch).toBe(`task/${taskId}`);
    expect(result.json.git.pushed).toBe(true);
    expect(result.json.git.pull_request).toBe("unsupported-remote");
    expect(result.json.git.restored_branch).toBe("master");
    expect(g(["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim()).toBe("master");
    expect(g(["status", "--porcelain"]).stdout.trim()).toBe("");
    const remoteBranches = spawnSync("git", ["--git-dir", bare, "branch"], { encoding: "utf8" }).stdout;
    expect(remoteBranches).toContain(`task/${taskId}`);
    // The knowledge change lives only on the task branch; master is untouched.
    expect(await taskState(project)).toBe("active");
    g(["checkout", `task/${taskId}`]);
    expect(await taskState(project)).toBe("deferred");
    g(["checkout", "master"]);
  });

  it("activates into a task worktree and closes from it, releasing the worktree", async () => {
    const { project, taskId, g } = await gitFixture();
    const deferred = run("task", project, ["--task", taskId, "--to", "defer", "--checker", checker]);
    expect(deferred.status, deferred.stderr).toBe(0);
    g(["merge", "--ff-only", `task/${taskId}`]);
    g(["push", "origin", "master"]);
    g(["branch", "-D", `task/${taskId}`]);
    g(["push", "origin", "--delete", `task/${taskId}`]);
    const activated = run("task", project, ["--task", taskId, "--to", "activate", "--checker", checker]);
    expect(activated.status, activated.stderr).toBe(0);
    expect(activated.json.git.mode).toBe("worktree");
    const worktree = activated.json.git.worktree as string;
    expect(worktree).toContain(`project-worktrees/${taskId}`);
    expect(activated.json.git.state).toBe("draft-opened");
    expect(activated.json.git.pushed).toBe(true);
    expect(activated.json.git.pull_request).toBe("unsupported-remote");
    expect(activated.json.git.materialized_artifacts).toEqual(["dist/generated-adopter.mjs"]);
    expect(g(["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim()).toBe("master");
    expect(await readFile(path.join(worktree, "dist/generated-adopter.mjs"), "utf8")).toBe(
      "export const generated = true;\n",
    );
    expect(await taskState(worktree)).toBe("active");
    expect(await taskState(project)).toBe("deferred");

    const worktreeTask = path.join(worktree, "knowledge/tasks/items/task.md");
    await writeFile(worktreeTask, (await readFile(worktreeTask, "utf8")).replace(
      "\n## Decision Applicability\n",
      "\n## Completion Result\n\nCompleted inside the task worktree.\n\n## Decision Applicability\n",
    ));
    const repin = run("repin", worktree, ["--checker", checker]);
    expect(repin.status, repin.stderr).toBe(0);
    spawnSync("git", ["-C", worktree, "add", "-A"], { encoding: "utf8" });
    spawnSync("git", ["-C", worktree, "commit", "-m", "author completion result"], { encoding: "utf8" });
    const closed = run("task", worktree, ["--task", taskId, "--to", "close", "--checker", checker]);
    expect(closed.status, closed.stderr).toBe(0);
    expect(closed.json.git.mode).toBe("worktree-resident");
    expect(closed.json.git.state).toBe("conclusion-proposed");
    expect(closed.json.git.pushed).toBe(true);
    expect(closed.json.git.worktree_state).toBe("removed");
    expect(await lstat(worktree).catch(() => null)).toBeNull();
    expect(g(["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim()).toBe("master");
  });

  it("reports an incomplete git step on a successful transition instead of failing", async () => {
    const { project, taskId, g } = await gitFixture();
    g(["remote", "set-url", "origin", path.join(project, "..", "missing-origin.git")]);
    const result = run("task", project, ["--task", taskId, "--to", "defer", "--checker", checker]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.json.state).toBe("transitioned");
    expect(result.json.git.state).toBe("incomplete");
    expect(result.json.git.commit).toMatch(/^[0-9a-f]{40}$/);
    expect(result.json.git.pushed).toBe(false);
    expect(result.json.git.git_error).toContain("git");
    expect(await taskState(project)).toBe("deferred");
  });
});
