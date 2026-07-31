import { cp, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

// @ts-expect-error Repository verification tooling is directly executable ESM.
const guidance = await import("../scripts/verify-onboarding-guidance.mjs");
const { verifyOnboardingGuidance } = guidance;
const repositoryRoot = path.resolve(import.meta.dirname, "..");

async function copyGuidance() {
  const project = await mkdtemp(path.join(os.tmpdir(), "nkf-onboarding-guidance-"));
  for (const relative of [
    "integrations/onboarding/nkf-onboarding-protocol.md",
    ".agents/skills/nkf-onboarding/SKILL.md",
    ".claude/skills/nkf-onboarding/SKILL.md",
  ]) {
    const target = path.join(project, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(path.join(repositoryRoot, relative), target, { recursive: true });
  }
  return project;
}

describe("NKF pre-adoption guidance", () => {
  it("verifies the exact AI-neutral protocol and portable skill", async () => {
    await expect(verifyOnboardingGuidance(repositoryRoot)).resolves.toMatchObject({
      contract: "nkf.onboarding-guidance-verification",
      status: "passed",
      skill_representations: 2,
    });
  });

  it("rejects divergent skills and provider-specific protocol ownership", async () => {
    const divergent = await copyGuidance();
    await writeFile(
      path.join(divergent, ".claude/skills/nkf-onboarding/SKILL.md"),
      "changed\n",
    );
    await expect(verifyOnboardingGuidance(divergent)).rejects.toThrow(/representations differ/);

    const providerSpecific = await copyGuidance();
    await writeFile(
      path.join(providerSpecific, "integrations/onboarding/nkf-onboarding-protocol.md"),
      `${await readFile(
        path.join(providerSpecific, "integrations/onboarding/nkf-onboarding-protocol.md"),
        "utf8",
      )}\nUse OpenAI for onboarding.\n`,
    );
    await expect(verifyOnboardingGuidance(providerSpecific)).rejects.toThrow(
      /vendor-specific term: OpenAI/,
    );
  });
});
