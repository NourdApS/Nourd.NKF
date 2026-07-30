import { readFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";
import { sha256 } from "../src/checker/util.js";
import { repositoryRoot } from "./helpers.js";

const schemaPath = path.join(
  repositoryRoot,
  "contracts/nkf/0.1/schemas/release-manifest.schema.json",
);
const proposalPath = path.join(
  repositoryRoot,
  "knowledge/designs/nkf-0.1-release-contract-release-manifest-schema-proposal.json",
);

function digest(): { algorithm: "sha-256"; value: string } {
  return { algorithm: "sha-256", value: "a".repeat(64) };
}

function validManifest(): Record<string, any> {
  return {
    contract: "nkf.release-manifest",
    nkf_version: "0.1",
    source: {
      repository: "https://github.com/kaveh6202/Nourd.NKF.git",
      release_commit: "b".repeat(40),
      checker_confirmation: {
        decision: "ADR-0047",
        path: "knowledge/decisions/0047-confirm-release-checker.md",
        digest: digest(),
        checker_source_commit: "c".repeat(40),
      },
    },
    checker: {
      identity: "nourd-nkf-checker",
      path: "dist/nourd-nkf-checker.mjs",
      digest: digest(),
      runtime: {
        name: "node",
        minimum_major: 22,
      },
    },
    authority: {
      precedence: "normative-markdown",
      markdown: {
        path: "knowledge/specifications/nkf-0.1.md",
        digest: digest(),
      },
      executable: {
        path: "contracts/nkf/0.1/nkf.yaml",
        digest: digest(),
      },
    },
    schemas: [
      {
        identity: "urn:nkf:0.1:schema:bundle",
        path: "contracts/nkf/0.1/schemas/bundle.schema.json",
        digest: digest(),
      },
      {
        identity: "urn:nkf:0.1:schema:record",
        path: "contracts/nkf/0.1/schemas/record.schema.json",
        digest: digest(),
      },
      {
        identity: "urn:nkf:0.1:schema:release-manifest",
        path: "contracts/nkf/0.1/schemas/release-manifest.schema.json",
        digest: digest(),
      },
      {
        identity: "urn:nkf:0.1:schema:validation-result",
        path: "contracts/nkf/0.1/schemas/validation-result.schema.json",
        digest: digest(),
      },
    ],
  };
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

describe("NKF 0.1 release-manifest schema", () => {
  it("is byte-identical to its reviewed proposal and source-bound to the accepted pair", async () => {
    const [canonical, proposal] = await Promise.all([
      readFile(schemaPath),
      readFile(proposalPath),
    ]);
    expect(canonical).toEqual(proposal);
    expect(sha256(canonical)).toBe(
      "8ee2ede58717387c418e956f2b1e45f4d6edb21a7d024c8fd855e0d006ab0e34",
    );
    const schema = JSON.parse(canonical.toString("utf8"));
    expect(schema["x-nkf-source"]).toMatchObject({
      nkf_version: "0.1",
      markdown_digest: {
        algorithm: "sha-256",
        value: "67beed2a380e719573175d3dfd70b05c59cbe51274c9975f863a58f7083ddba4",
      },
      executable_digest: {
        algorithm: "sha-256",
        value: "7a2489c3b81ef87e38913629c65f71b8b39e815d9b72efe81939c4500db3510b",
      },
    });
  });

  it("compiles strictly and accepts only the exact closed manifest structure", async () => {
    const AjvConstructor = Ajv2020 as unknown as new (
      options: Record<string, unknown>,
    ) => any;
    const ajv = new AjvConstructor({
      allErrors: true,
      strict: true,
      validateFormats: true,
    });
    const addFormatSupport = addFormats as unknown as (instance: any) => void;
    addFormatSupport(ajv);
    ajv.addKeyword({
      keyword: "x-nkf-source",
      schemaType: "object",
      valid: true,
    });
    const validate = ajv.compile(JSON.parse(await readFile(schemaPath, "utf8")));
    expect(validate(validManifest())).toBe(true);

    const mutations: Array<(manifest: Record<string, any>) => void> = [
      (value) => delete value.contract,
      (value) => (value.contract = "nkf.release-manifest/v1"),
      (value) => (value.extra = true),
      (value) => delete value.nkf_version,
      (value) => (value.nkf_version = "0.2"),
      (value) => delete value.source.repository,
      (value) => (value.source.repository = "https://example.com/NKF.git"),
      (value) => (value.source.release_commit = "A".repeat(40)),
      (value) => (value.source.extra = true),
      (value) => (value.source.checker_confirmation.decision = "0047"),
      (value) => (value.source.checker_confirmation.path = "../decision.md"),
      (value) => (value.source.checker_confirmation.digest.value = "x"),
      (value) => (value.source.checker_confirmation.checker_source_commit = "c"),
      (value) => (value.checker.identity = "other"),
      (value) => (value.checker.path = "./checker.mjs"),
      (value) => (value.checker.digest.algorithm = "sha256"),
      (value) => (value.checker.runtime.name = "deno"),
      (value) => (value.checker.runtime.minimum_major = 21),
      (value) => (value.checker.runtime.extra = true),
      (value) => (value.authority.precedence = "executable-yaml"),
      (value) => (value.authority.markdown.path = "README.md"),
      (value) => (value.authority.executable.path = "nkf.yaml"),
      (value) => (value.authority.extra = true),
      (value) => value.schemas.pop(),
      (value) => value.schemas.push(clone(value.schemas[0])),
      (value) => value.schemas.reverse(),
      (value) => (value.schemas[0].identity = "urn:nkf:0.1:schema:record"),
      (value) => (value.schemas[2].path = "release-manifest.schema.json"),
      (value) => (value.schemas[3].extra = true),
    ];

    expect(mutations).toHaveLength(29);
    for (const mutate of mutations) {
      const manifest = validManifest();
      mutate(manifest);
      expect(validate(manifest)).toBe(false);
    }
  });
});
