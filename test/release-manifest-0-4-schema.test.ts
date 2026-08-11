import { readFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";
import { repositoryRoot } from "./helpers.js";

const schema = JSON.parse(
  await readFile(
    path.join(repositoryRoot, "contracts/nkf/0.4/schemas/release-manifest.schema.json"),
    "utf8",
  ),
);
const AjvConstructor = Ajv2020 as unknown as new (options: Record<string, unknown>) => any;
const ajv = new AjvConstructor({ strict: true, allErrors: true });
const addFormatSupport = addFormats as unknown as (instance: any) => void;
addFormatSupport(ajv);
ajv.addKeyword({ keyword: "x-nkf-source", schemaType: "object" });
const validate = ajv.compile(schema);
const digest = () => ({ algorithm: "sha-256", value: "a".repeat(64) });

function manifest() {
  return {
    contract: "nkf.release-manifest",
    nkf_version: "0.4",
    source: {
      repository: "https://github.com/kaveh6202/Nourd.NKF.git",
      release_commit: "b".repeat(40),
    },
    checker: {
      identity: "nourd-nkf-checker",
      path: "dist/nourd-nkf-checker.mjs",
      digest: digest(),
      runtime: { name: "node", minimum_major: 22 },
    },
    authority: {
      precedence: "normative-markdown",
      markdown: { path: "knowledge/specifications/nkf-0.4.md", digest: digest() },
      executable: { path: "contracts/nkf/0.4/nkf.yaml", digest: digest() },
    },
    schemas: [
      ["bundle", "bundle.schema.json"],
      ["record", "record.schema.json"],
      ["release-manifest", "release-manifest.schema.json"],
      ["validation-result", "validation-result.schema.json"],
    ].map(([identity, file]) => ({
      identity: `urn:nkf:0.4:schema:${identity}`,
      path: `contracts/nkf/0.4/schemas/${file}`,
      digest: digest(),
    })),
    files: [
      {
        path: "contracts/nkf/0.4/nkf.yaml",
        mode: "0644",
        digest: digest(),
      },
    ],
  };
}

describe("NKF 0.4 release-manifest Schema", () => {
  it("requires the seven-field post-cycle manifest and rejects old confirmation metadata", () => {
    const valid = manifest();
    expect(validate(valid), JSON.stringify(validate.errors)).toBe(true);

    const withoutFiles: any = structuredClone(valid);
    delete withoutFiles.files;
    expect(validate(withoutFiles)).toBe(false);

    const withConfirmation: any = structuredClone(valid);
    withConfirmation.source.checker_confirmation = {};
    expect(validate(withConfirmation)).toBe(false);

    const extra: any = structuredClone(valid);
    extra.audit = "clean";
    expect(validate(extra)).toBe(false);
  });

  it("reserves executable mode for the checker and requires that mode for the checker", () => {
    const nonCheckerExecutable: any = manifest();
    nonCheckerExecutable.files[0].mode = "0755";
    expect(validate(nonCheckerExecutable)).toBe(false);

    const checkerNotExecutable: any = manifest();
    checkerNotExecutable.files[0].path = "dist/nourd-nkf-checker.mjs";
    expect(validate(checkerNotExecutable)).toBe(false);

    const checkerExecutable: any = manifest();
    checkerExecutable.files[0].path = "dist/nourd-nkf-checker.mjs";
    checkerExecutable.files[0].mode = "0755";
    expect(validate(checkerExecutable), JSON.stringify(validate.errors)).toBe(true);
  });
});
