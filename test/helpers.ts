import { cp, mkdtemp } from "node:fs/promises";
import { readdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ValidateOptions } from "../src/checker/types.js";

export const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
export const contractRoot = path.join(repositoryRoot, "contracts/nkf/0.8");
export const checkerArtifact = fileURLToPath(new URL("../src/checker/checker.ts", import.meta.url));
export const validFixture = path.join(repositoryRoot, "fixtures/valid/minimal-0-8");
export const validTechnologyFixture = path.join(repositoryRoot, "fixtures/valid/technology-0-8");

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

// Knowledge-proportional test bounds: heavy suites exercise the complete
// producer knowledge graph, so their budgets scale with the governed source
// count instead of a hardware guess. NKF_TEST_TIME_SCALE still multiplies on
// top for slow hosts.
function governedSourceCount(knowledgeRootParent: string): number {
  let count = 0;
  const walk = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(path.join(directory, entry.name));
      else if (entry.name.endsWith(".md")) count += 1;
    }
  };
  try {
    walk(path.join(knowledgeRootParent, "knowledge"));
  } catch {
    count = 300;
  }
  return count;
}

export const timeoutScale = Math.max(
  1,
  Math.ceil(governedSourceCount(repositoryRoot) / 150),
) * Number(process.env.NKF_TEST_TIME_SCALE ?? "1");

export function scaledTimeout(base: number): number {
  return base * timeoutScale;
}
