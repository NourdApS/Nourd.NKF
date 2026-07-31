import { spawnSync } from "node:child_process";
import {
  appendFile,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
const {
  RELEASE_ENTRIES,
  constructReleaseManifest,
  createUstar,
  serializeReleaseManifest,
  sha256,
} = release;
import {
  repositoryRoot,
  validFixture,
  validTechnologyFixture,
} from "./helpers.js";

const adopter = path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs");
let archivePath: string;
let archiveSha256: string;

async function createProject(fixture = validFixture) {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-adopter-test-"));
  const project = path.join(parent, "project");
  await cp(fixture, project, { recursive: true });
  return project;
}

function run(
  command: string,
  project: string,
  extra: string[] = [],
) {
  return spawnSync(
    process.execPath,
    [adopter, command, "--project", project, ...extra],
    { encoding: "utf8" },
  );
}

beforeAll(async () => {
  const entries = new Map<string, Buffer>();
  for (const entry of RELEASE_ENTRIES) {
    if (entry.path === "release-manifest.json") continue;
    entries.set(
      entry.path,
      await readFile(path.join(repositoryRoot, entry.path)),
    );
  }
  const manifest = constructReleaseManifest({
    releaseCommit: "a".repeat(40),
    checkerConfirmation: {
      decision: "ADR-0065",
      path: "knowledge/decisions/0065-confirm-current-release-bound-checker.md",
      bytes: Buffer.from("# ADR 0065\n", "utf8"),
      checkerSourceCommit: "b".repeat(40),
    },
    entries,
  });
  entries.set("release-manifest.json", serializeReleaseManifest(manifest));
  const archive = createUstar(entries);
  archiveSha256 = sha256(archive);
  const directory = await mkdtemp(path.join(os.tmpdir(), "nkf-adopter-release-"));
  archivePath = path.join(
    directory,
    `nourd-nkf-sha256-${archiveSha256}.tar`,
  );
  await writeFile(archivePath, archive);
});

describe("NKF consumer adopter", () => {
  it("installs and validates a Product repository without manual assembly", async () => {
    const project = await createProject();
    const installed = run("install", project, [
      "--archive",
      archivePath,
      "--sha256",
      archiveSha256,
    ]);
    expect(installed.status, installed.stderr).toBe(0);
    expect(JSON.parse(installed.stdout).state).toBe("installed");

    const pin = JSON.parse(
      await readFile(path.join(project, ".nourd/nkf-release.json"), "utf8"),
    );
    expect(pin.archive.sha256).toBe(archiveSha256);
    expect(pin.root_profile).toBe("nkf.profile.product");
    expect(
      await readFile(
        path.join(project, ".agents/skills/nkf-authoring/SKILL.md"),
      ),
    ).toEqual(
      await readFile(
        path.join(project, ".claude/skills/nkf-authoring/SKILL.md"),
      ),
    );
    expect(
      await readFile(
        path.join(project, ".github/workflows/nkf-contracts.yml"),
        "utf8",
      ),
    ).toContain("run: npm run nkf:check");

    const check = run("check", project);
    expect(check.status, check.stderr).toBe(0);
    expect(JSON.parse(check.stdout).state).toBe("passed");

    const noUpdate = run("install", project, [
      "--archive",
      archivePath,
      "--sha256",
      archiveSha256,
    ]);
    expect(noUpdate.status, noUpdate.stderr).toBe(0);
    expect(JSON.parse(noUpdate.stdout).state).toBe("no-update");
  });

  it("installs the same pinned experience for a Technology repository", async () => {
    const project = await createProject(validTechnologyFixture);
    const result = run("install", project, [
      "--archive",
      archivePath,
      "--sha256",
      archiveSha256,
    ]);
    expect(result.status, result.stderr).toBe(0);
    expect(
      JSON.parse(
        await readFile(path.join(project, ".nourd/nkf-release.json"), "utf8"),
      ).root_profile,
    ).toBe("nkf.profile.technology");
  });

  it("fails closed on release, pin, integration, and knowledge tampering", async () => {
    const project = await createProject();
    expect(
      run("install", project, [
        "--archive",
        archivePath,
        "--sha256",
        archiveSha256,
      ]).status,
    ).toBe(0);

    const archive = await readFile(archivePath);
    const corruptedPath = path.join(path.dirname(project), "corrupted.tar");
    const corrupted = Buffer.from(archive);
    corrupted[700] = corrupted[700]! ^ 1;
    await writeFile(corruptedPath, corrupted);
    const fresh = await createProject();
    expect(
      run("install", fresh, [
        "--archive",
        corruptedPath,
        "--sha256",
        archiveSha256,
      ]).status,
    ).not.toBe(0);

    const pinPath = path.join(project, ".nourd/nkf-release.json");
    const pinOriginal = await readFile(pinPath);
    const pin = JSON.parse(pinOriginal.toString("utf8"));
    pin.checker_sha256 = "0".repeat(64);
    await writeFile(pinPath, `${JSON.stringify(pin, null, 2)}\n`);
    expect(run("status", project).status).not.toBe(0);
    await writeFile(pinPath, pinOriginal);

    const skillPath = path.join(
      project,
      ".agents/skills/nkf-authoring/SKILL.md",
    );
    const skillOriginal = await readFile(skillPath);
    await appendFile(skillPath, "\nchanged\n");
    expect(run("status", project).status).not.toBe(0);
    await writeFile(skillPath, skillOriginal);

    await appendFile(path.join(project, "knowledge/product.md"), "\nChanged.\n");
    expect(run("check", project).status).not.toBe(0);
  });

  it("preserves conflicting consumer-owned integration paths", async () => {
    const project = await createProject();
    const workflowPath = path.join(
      project,
      ".github/workflows/nkf-contracts.yml",
    );
    await mkdir(path.dirname(workflowPath), { recursive: true });
    await writeFile(workflowPath, "name: Existing Workflow\n");
    const before = await readFile(workflowPath);
    const result = run("install", project, [
      "--archive",
      archivePath,
      "--sha256",
      archiveSha256,
    ]);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("would overwrite an existing owned path");
    expect(await readFile(workflowPath)).toEqual(before);
  });
});
