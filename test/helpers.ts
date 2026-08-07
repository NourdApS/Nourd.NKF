import { cp, mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ValidateOptions } from "../src/checker/types.js";

export const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
export const contractRoot = path.join(repositoryRoot, "contracts/nkf/0.1");
export const checkerArtifact = fileURLToPath(new URL("../src/checker/checker.ts", import.meta.url));
export const validFixture = path.join(repositoryRoot, "fixtures/valid/minimal");
export const validTechnologyFixture = path.join(repositoryRoot, "fixtures/valid/technology");

export async function copyValidFixture(): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-checker-test-"));
  const project = path.join(parent, "project");
  await cp(validFixture, project, { recursive: true });
  return project;
}

export async function copyValidTechnologyFixture(): Promise<string> {
  const parent = await mkdtemp(path.join(os.tmpdir(), "nkf-technology-test-"));
  const project = path.join(parent, "project");
  await cp(validTechnologyFixture, project, { recursive: true });
  return project;
}

export function options(
  projectRoot: string,
  overrides: Partial<ValidateOptions> = {},
): ValidateOptions {
  return {
    projectRoot,
    contractRoot,
    checkerArtifact,
    runner: "nkf-test-runner",
    request: {
      level: "full-bundle",
      record_id: null,
      acceptance_binding: "not-requested",
    },
    persist: false,
    now: () => new Date("2026-07-30T00:00:00.000Z"),
    executionId: () => "00000000-0000-4000-8000-000000000001",
    ...overrides,
  };
}
