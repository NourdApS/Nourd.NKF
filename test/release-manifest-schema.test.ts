import { readFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";
import { repositoryRoot } from "./helpers.js";

// @ts-expect-error Repository release tooling is a directly executable ESM module.
const release = await import("../scripts/release/core.mjs");
// @ts-expect-error Repository release tooling is a directly executable ESM module.
const releaseSetModule = await import("../scripts/release/release-set.mjs");

const schemaPath = path.join(repositoryRoot, "contracts/nkf/0.7/schemas/release-manifest.schema.json");

async function compiled() {
  const AjvConstructor = Ajv2020 as unknown as new (options: Record<string, unknown>) => any;
  const ajv = new AjvConstructor({ allErrors: true, strict: true, validateFormats: true });
  addFormats(ajv);
  ajv.addKeyword({ keyword: "x-nkf-source" });
  return ajv.compile(JSON.parse((await readFile(schemaPath)).toString("utf8")));
}

async function realManifest(): Promise<Record<string, any>> {
  const releaseSet = await releaseSetModule.readReleaseSet(repositoryRoot, "0.7");
  const entries = new Map<string, Buffer>();
  for (const member of releaseSet.members) {
    if (member.path === "release-manifest.json") continue;
    entries.set(member.path, await readFile(path.join(repositoryRoot, member.path)));
  }
  return release.constructReleaseManifest({
    releaseCommit: "a".repeat(40),
    entries,
    nkfVersion: "0.7",
    releaseSet,
  });
}

describe("NKF 0.7 release-manifest schema", () => {
  it("compiles strictly and accepts the exact constructed 0.7 manifest", async () => {
    const validate = await compiled();
    const manifest = await realManifest();
    expect(validate(manifest), JSON.stringify(validate.errors ?? []).slice(0, 400)).toBe(true);
  });

  it("rejects a manifest without the version-delta binding or with extra fields", async () => {
    const validate = await compiled();
    const manifest = await realManifest();
    const missingDelta = structuredClone(manifest);
    delete missingDelta.version_delta;
    expect(validate(missingDelta)).toBe(false);

    const extra = structuredClone(manifest);
    extra.unexpected = true;
    expect(validate(extra)).toBe(false);

    const wrongVersion = structuredClone(manifest);
    wrongVersion.nkf_version = "0.6";
    expect(validate(wrongVersion)).toBe(false);
  });
});
