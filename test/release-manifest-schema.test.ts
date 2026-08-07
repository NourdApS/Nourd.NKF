import { readFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";
import { sha256 } from "../src/checker/util.js";
import { repositoryRoot } from "./helpers.js";

const schemaPath = path.join(
  repositoryRoot,
  "contracts/nkf/0.2/schemas/release-manifest.schema.json",
);
const proposalPath = path.join(
  repositoryRoot,
  "knowledge/evidence/decision-inputs/adr-0043-0046/nkf-0.1-release-contract-release-manifest-schema-proposal.json",
);

function digest(): { algorithm: "sha-256"; value: string } {
  return { algorithm: "sha-256", value: "a".repeat(64) };
}

function validManifest(): Record<string, any> {
  return {
    contract: "nkf.release-manifest",
    nkf_version: "0.2",
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
        path: "knowledge/specifications/nkf-0.2.md",
        digest: digest(),
      },
      executable: {
        path: "contracts/nkf/0.2/nkf.yaml",
        digest: digest(),
      },
    },
    schemas: [
      {
        identity: "urn:nkf:0.2:schema:bundle",
        path: "contracts/nkf/0.2/schemas/bundle.schema.json",
        digest: digest(),
      },
      {
        identity: "urn:nkf:0.2:schema:record",
        path: "contracts/nkf/0.2/schemas/record.schema.json",
        digest: digest(),
      },
      {
        identity: "urn:nkf:0.2:schema:release-manifest",
        path: "contracts/nkf/0.2/schemas/release-manifest.schema.json",
        digest: digest(),
      },
      {
        identity: "urn:nkf:0.2:schema:validation-result",
        path: "contracts/nkf/0.2/schemas/validation-result.schema.json",
        digest: digest(),
      },
    ],
  };
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

describe("NKF 0.2 release-manifest schema", () => {
  it("preserves the reviewed assertion graph while rebinding to the accepted pair", async () => {
    const [canonical, proposal] = await Promise.all([
      readFile(schemaPath),
      readFile(proposalPath),
    ]);
    const canonicalValue = JSON.parse(canonical.toString("utf8"));
    const proposalValue = JSON.parse(proposal.toString("utf8"));
    const { "x-nkf-source": canonicalSource, ...canonicalAssertions } = canonicalValue;
    const { "x-nkf-source": _proposalSource, ...proposalAssertions } = proposalValue;
    const rebound = JSON.parse(
      JSON.stringify(proposalAssertions)
        .replaceAll("contracts/nkf/0.1/", "contracts/nkf/0.2/")
        .replaceAll("knowledge/specifications/nkf-0.1.md", "knowledge/specifications/nkf-0.2.md")
        .replaceAll("urn:nkf:0.1:", "urn:nkf:0.2:")
        .replaceAll("NKF 0.1 release manifest", "NKF 0.2 release manifest")
        .replaceAll('"const":"0.1"', '"const":"0.2"')
        .replaceAll('"const": "0.1"', '"const": "0.2"'),
    );
    expect(canonicalAssertions).toEqual(rebound);
    expect(sha256(canonical)).toBe(
      "5c73b00619ccd5cbb32ad77be5e73c41d61be3c0169a1c913539ac96aebeb459",
    );
    expect(canonicalSource).toMatchObject({
      nkf_version: "0.2",
      markdown_digest: {
        algorithm: "sha-256",
        value: "df2e457e5e3824004268efebdead93be56df36c3754cf563b2701cee0474c26f",
      },
      executable_digest: {
        algorithm: "sha-256",
        value: "087934ec88de7f6c25b64e9706599403876d28cbc1f0accd50bc9bfbdd419b27",
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
      (value) => (value.nkf_version = "0.1"),
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
      (value) => (value.schemas[0].identity = "urn:nkf:0.2:schema:record"),
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
