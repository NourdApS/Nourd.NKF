import { cp, mkdir, mkdtemp, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { VERSION_BINDINGS } from "../src/checker/bindings.js";
import { loadContracts } from "../src/checker/contracts.js";
import { contractRoot, repositoryRoot } from "./helpers.js";

async function copyAuthority(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "nkf-contract-test-"));
  await mkdir(path.join(root, "knowledge/specifications"), { recursive: true });
  await mkdir(path.join(root, "contracts/nkf"), { recursive: true });
  await cp(
    path.join(repositoryRoot, "knowledge/specifications/nkf-0.2.md"),
    path.join(root, "knowledge/specifications/nkf-0.2.md"),
  );
  await cp(
    path.join(repositoryRoot, "contracts/nkf/0.6"),
    path.join(root, "contracts/nkf/0.6"),
    { recursive: true },
  );
  return path.join(root, "contracts/nkf/0.6");
}

describe("prospective NKF 0.7 contract realization", () => {
  it("strictly loads the exact candidate authority and schema bindings", async () => {
    const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.7"], "0.7");
    expect(loaded.diagnostics).toEqual([]);
    expect(loaded.executable.contract).toBe("nkf.contract-set");
    expect(loaded.executable.nkf_version).toBe("0.7");
    expect(loaded.artifacts.core.specification.binding).toBe("verified");
    expect(loaded.artifacts.core.executable.binding).toBe("verified");
    expect(loaded.artifacts.core.version_delta?.binding).toBe("verified");
    expect(loaded.artifacts.core.schemas.map((schema) => schema.binding)).toEqual([
      "verified",
      "verified",
      "verified",
      "verified",
      "verified",
      "verified",
    ]);
    expect(loaded.artifacts.core.executable.expected_sha256).toBe(
      VERSION_BINDINGS["0.7"].executable.sha256,
    );
  });

  it("distinguishes unavailable and mismatched authority pairs", async () => {
    const unavailableRoot = await copyAuthority();
    await unlink(
      path.resolve(unavailableRoot, "../../../knowledge/specifications/nkf-0.2.md"),
    );
    expect(
      (await loadContracts(unavailableRoot, VERSION_BINDINGS["0.6"], "0.2")).diagnostics.map(
        (diagnostic) => diagnostic.rule_id,
      ),
    ).toContain("contract-set.unavailable");

    const mismatchedRoot = await copyAuthority();
    await writeFile(
      path.resolve(mismatchedRoot, "../../../knowledge/specifications/nkf-0.2.md"),
      "# Changed\n",
      "utf8",
    );
    expect(
      (await loadContracts(mismatchedRoot, VERSION_BINDINGS["0.6"], "0.2")).diagnostics.map(
        (diagnostic) => diagnostic.rule_id,
      ),
    ).toContain("contract-set.binding-mismatch");
  });

  it("distinguishes unavailable and mismatched schemas", async () => {
    const unavailableRoot = await copyAuthority();
    await unlink(path.join(unavailableRoot, "schemas/bundle.schema.json"));
    expect(
      (await loadContracts(unavailableRoot, VERSION_BINDINGS["0.6"], "0.2")).diagnostics.map(
        (diagnostic) => diagnostic.rule_id,
      ),
    ).toContain("schema.unavailable");

    const mismatchedRoot = await copyAuthority();
    await writeFile(
      path.join(mismatchedRoot, "schemas/record.schema.json"),
      "{}\n",
      "utf8",
    );
    expect(
      (await loadContracts(mismatchedRoot, VERSION_BINDINGS["0.6"], "0.2")).diagnostics.map(
        (diagnostic) => diagnostic.rule_id,
      ),
    ).toContain("schema.binding-mismatch");
  });
});
