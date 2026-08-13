import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  appendFile,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  unlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const verifier = path.join(repositoryRoot, "scripts/verify-agent-guidance.mjs");
const created: string[] = [];
const projectFiles = [
  ".nourd/knowledge/bundle.yaml",
  ".agents/skills/nkf-authoring/SKILL.md",
  ".claude/skills/nkf-authoring/SKILL.md",
  ".github/copilot-instructions.md",
  ".github/workflows/nkf-contracts.yml",
  "AGENTS.md",
  "CLAUDE.md",
  "GEMINI.md",
  "integrations/ai/agent-hosts.yaml",
  "integrations/ai/nkf-authoring-protocol.md",
  "package.json",
];

async function copyProject(): Promise<string> {
  const project = await mkdtemp(path.join(os.tmpdir(), "nkf-agent-guidance-"));
  created.push(project);
  for (const relative of projectFiles) {
    const target = path.join(project, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(path.join(repositoryRoot, relative), target);
  }
  return project;
}

function run(project: string) {
  return spawnSync(process.execPath, [verifier, "--project", project], {
    encoding: "utf8",
  });
}

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

async function writeWorkflowAndUpdateDigest(project: string, workflow: string): Promise<void> {
  const workflowPath = path.join(project, ".github/workflows/nkf-contracts.yml");
  const registryPath = path.join(project, "integrations/ai/agent-hosts.yaml");
  const previousWorkflow = await readFile(workflowPath);
  await writeFile(workflowPath, workflow);
  const registry = await readFile(registryPath, "utf8");
  await writeFile(
    registryPath,
    registry.replace(sha256(previousWorkflow), sha256(Buffer.from(workflow))),
  );
}

async function writeProtocolAndUpdateDigest(project: string, protocol: string): Promise<void> {
  const protocolPath = path.join(project, "integrations/ai/nkf-authoring-protocol.md");
  const registryPath = path.join(project, "integrations/ai/agent-hosts.yaml");
  const previousProtocol = await readFile(protocolPath);
  await writeFile(protocolPath, protocol);
  const registry = await readFile(registryPath, "utf8");
  await writeFile(
    registryPath,
    registry.replace(sha256(previousProtocol), sha256(Buffer.from(protocol))),
  );
}

afterEach(async () => {
  await Promise.all(created.splice(0).map((directory) => rm(directory, { force: true, recursive: true })));
});

describe("agent guidance integrity verifier", () => {
  it("accepts the exact registered guidance set", async () => {
    const result = run(await copyProject());

    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toMatchObject({
      adapters: 4,
      skill_representations: 2,
      status: "passed",
      surfaces: 12,
    });
  });

  it("accepts the exact 0.5 bundle and portable skill version", async () => {
    const project = await copyProject();
    const bundlePath = path.join(project, ".nourd/knowledge/bundle.yaml");
    await writeFile(
      bundlePath,
      (await readFile(bundlePath, "utf8")).replace('nkf_version: "0.4"', 'nkf_version: "0.5"'),
    );

    const registryPath = path.join(project, "integrations/ai/agent-hosts.yaml");
    let previousSkill: Buffer | null = null;
    let currentSkill: Buffer | null = null;
    for (const relative of [
      ".agents/skills/nkf-authoring/SKILL.md",
      ".claude/skills/nkf-authoring/SKILL.md",
    ]) {
      const skillPath = path.join(project, relative);
      const bytes = await readFile(skillPath);
      previousSkill ??= bytes;
      const changed = Buffer.from(
        bytes.toString("utf8").replace("NKF Version: 0.4", "NKF Version: 0.5"),
      );
      currentSkill ??= changed;
      await writeFile(skillPath, changed);
    }
    await writeFile(
      registryPath,
      (await readFile(registryPath, "utf8")).replace(
        sha256(previousSkill!),
        sha256(currentSkill!),
      ),
    );

    const result = run(project);

    expect(result.status, result.stderr).toBe(0);
  });

  it("rejects divergent portable skill bytes", async () => {
    const project = await copyProject();
    await appendFile(path.join(project, ".claude/skills/nkf-authoring/SKILL.md"), "\n");

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Skill digest mismatch");
  });

  it("rejects a missing registered adapter", async () => {
    const project = await copyProject();
    await unlink(path.join(project, "GEMINI.md"));

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("adapter gemini-cli is missing");
  });

  it("rejects a changed neutral protocol", async () => {
    const project = await copyProject();
    await appendFile(path.join(project, "integrations/ai/nkf-authoring-protocol.md"), "\nChanged.\n");

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("neutral protocol digest does not match");
  });

  it("rejects vendor-specific neutral-protocol text after a digest update", async () => {
    const project = await copyProject();
    const protocolPath = path.join(project, "integrations/ai/nkf-authoring-protocol.md");
    const protocol = `${await readFile(protocolPath, "utf8")}\nUse codex for this step.\n`;
    await writeProtocolAndUpdateDigest(project, protocol);

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("vendor-specific term: Codex");
  });

  it("rejects an unregistered instruction adapter", async () => {
    const project = await copyProject();
    const target = path.join(project, ".github/instructions/rogue.instructions.md");
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, "# Rogue Instructions\n");

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("instruction-adapter paths do not match");
  });

  it.each([
    ["nested AGENTS.md", "knowledge/AGENTS.md"],
    ["alternate Claude project instructions", ".claude/CLAUDE.md"],
    ["Claude project rule", ".claude/rules/nkf.md"],
    ["Cursor project rule", ".cursor/rules/nkf.mdc"],
    ["Windsurf project rule", ".windsurf/rules/nkf.md"],
  ])("rejects an unregistered %s adapter", async (_label, relative) => {
    const project = await copyProject();
    const target = path.join(project, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, "# Competing NKF Instructions\n");

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("instruction-adapter paths do not match");
  });

  it("rejects a mutable Action tag even when its registry digest is updated", async () => {
    const project = await copyProject();
    const workflowPath = path.join(project, ".github/workflows/nkf-contracts.yml");
    const originalWorkflow = await readFile(workflowPath, "utf8");
    const changedWorkflow = originalWorkflow.replace(
      "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
      "actions/checkout@v4",
    );
    await writeWorkflowAndUpdateDigest(project, changedWorkflow);

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("exact reviewed Action");
  });

  it("rejects a different full-SHA Action even when its registry digest is updated", async () => {
    const project = await copyProject();
    const workflowPath = path.join(project, ".github/workflows/nkf-contracts.yml");
    const originalWorkflow = await readFile(workflowPath, "utf8");
    const changedWorkflow = originalWorkflow.replace(
      "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
      "example/checkout@0000000000000000000000000000000000000000",
    );
    await writeWorkflowAndUpdateDigest(project, changedWorkflow);

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("exact reviewed Action");
  });

  it("rejects a shallow workflow checkout even when its registry digest is updated", async () => {
    const project = await copyProject();
    const workflowPath = path.join(project, ".github/workflows/nkf-contracts.yml");
    const originalWorkflow = await readFile(workflowPath, "utf8");
    const changedWorkflow = originalWorkflow.replace("fetch-depth: 0", "fetch-depth: 1");
    await writeWorkflowAndUpdateDigest(project, changedWorkflow);

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("exact reviewed Action");
  });

  it("rejects workflow control fields outside the reviewed shape", async () => {
    const project = await copyProject();
    const workflowPath = path.join(project, ".github/workflows/nkf-contracts.yml");
    const originalWorkflow = await readFile(workflowPath, "utf8");
    const changedWorkflow = originalWorkflow.replace(
      "      - name: Validate NKF Contracts\n        run: npm run nkf:check",
      "      - name: Validate NKF Contracts\n        continue-on-error: true\n        run: npm run nkf:check",
    );
    await writeWorkflowAndUpdateDigest(project, changedWorkflow);

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("workflow validation step keys");
  });

  it("rejects a changed engineering-check chain", async () => {
    const project = await copyProject();
    const packagePath = path.join(project, "package.json");
    const manifest = JSON.parse(await readFile(packagePath, "utf8"));
    manifest.scripts.check = "npm run typecheck";
    await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("script check does not match");
  });

  it("accepts the exact installed host-superset chain", async () => {
    const project = await copyProject();
    const packagePath = path.join(project, "package.json");
    const manifest = JSON.parse(await readFile(packagePath, "utf8"));
    const producerCheck =
      manifest.scripts["nkf:check:host"] ?? manifest.scripts["nkf:check"];
    manifest.nkf = {
      integration: {
        mode: "host-superset",
        host_script: producerCheck,
      },
    };
    manifest.scripts["nkf:check"] =
      "npm run nkf:check:pinned && npm run nkf:check:host";
    manifest.scripts["nkf:check:pinned"] =
      "node .nourd/tools/nkf/nourd-nkf-adopt.mjs check --project .";
    manifest.scripts["nkf:check:host"] = producerCheck;
    await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);

    const result = run(project);

    expect(result.status, result.stderr).toBe(0);
  });

  it("rejects host-superset drift from the accepted producer check", async () => {
    const project = await copyProject();
    const packagePath = path.join(project, "package.json");
    const manifest = JSON.parse(await readFile(packagePath, "utf8"));
    manifest.nkf = {
      integration: {
        mode: "host-superset",
        host_script: "npm run check",
      },
    };
    manifest.scripts["nkf:check"] =
      "npm run nkf:check:pinned && npm run nkf:check:host";
    manifest.scripts["nkf:check:pinned"] =
      "node .nourd/tools/nkf/nourd-nkf-adopt.mjs check --project .";
    manifest.scripts["nkf:check:host"] = "npm run check";
    await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("does not preserve the accepted producer check");
  });

  it("rejects lifecycle scripts around the validation path", async () => {
    const project = await copyProject();
    const packagePath = path.join(project, "package.json");
    const manifest = JSON.parse(await readFile(packagePath, "utf8"));
    manifest.scripts["prenkf:check"] = "node prepare-check.mjs";
    await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("lifecycle script prenkf:check");
  });

  it("rejects a symlinked skill representation", async () => {
    const project = await copyProject();
    const claudeSkill = path.join(project, ".claude/skills/nkf-authoring/SKILL.md");
    await unlink(claudeSkill);
    await symlink(
      "../../../.agents/skills/nkf-authoring/SKILL.md",
      claudeSkill,
    );

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("must not contain a symbolic link");
  });

  it("rejects a skill reached through a symlinked parent directory", async () => {
    const project = await copyProject();
    const skillDirectory = path.join(project, ".claude/skills");
    await rm(skillDirectory, { force: true, recursive: true });
    await symlink("../.agents/skills", skillDirectory, "dir");

    const result = run(project);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("must not contain a symbolic link");
  });
});
