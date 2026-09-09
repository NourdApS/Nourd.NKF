import { describe, expect, it } from "vitest";
import { VERSION_BINDINGS } from "../src/checker/bindings.js";
import { loadContracts } from "../src/checker/contracts.js";
import { RuleEmitter } from "../src/checker/diagnostics.js";
import { validateExtensions } from "../src/checker/extensions.js";
import type { ExtensionResolver, ResolvedExtension } from "../src/checker/types.js";
import { sha256 } from "../src/checker/util.js";
import { contractRoot } from "./helpers.js";

const extensionId = "com.example.feature";
const specification = Buffer.from("# Example Extension\n", "utf8");

function executable(
  id = extensionId,
  vocabularies: Record<string, unknown> = {},
): Buffer {
  return Buffer.from(
    [
      "contract: nkf.extension",
      'nkf_version: "0.1"',
      `id: ${id}`,
      "application_sites: [bundle, record]",
      "payload_shape: {}",
      `vocabularies: ${JSON.stringify(vocabularies)}`,
      "constraints: {}",
      "deterministic_validation: {}",
      "",
    ].join("\n"),
    "utf8",
  );
}

function bundle(
  requirement: "required" | "optional" = "required",
  executableBytes = executable(),
): Record<string, unknown> {
  return {
    extension_contracts: [{
      id: extensionId,
      specification: {
        locator: "urn:example:specification",
        digest: { algorithm: "sha-256", value: sha256(specification) },
      },
      executable: {
        locator: "urn:example:executable",
        digest: { algorithm: "sha-256", value: sha256(executableBytes) },
      },
    }],
    extensions: [{ contract: extensionId, requirement, payload: {} }],
  };
}

function resolver(
  overrides: Partial<ResolvedExtension> = {},
  executableBytes = executable(),
): ExtensionResolver {
  return {
    resolve: async () => ({
      id: extensionId,
      specification,
      executable: executableBytes,
      supported: true,
      validatePayload: async () => true,
      ...overrides,
    }),
  };
}

async function rules(
  bundleValue: Record<string, unknown>,
  extensionResolver: ExtensionResolver | undefined,
): Promise<string[]> {
  const loaded = await loadContracts(contractRoot, VERSION_BINDINGS["0.81"], "0.81");
  const emitter = new RuleEmitter(loaded.executable);
  const artifacts = structuredClone(loaded.artifacts);
  await validateExtensions(
    bundleValue,
    [],
    new Set(),
    loaded.executable,
    extensionResolver,
    emitter,
    artifacts,
  );
  return emitter.diagnostics.map((diagnostic) => diagnostic.rule_id);
}

describe("extension resolution boundary", () => {
  it("treats duplicate catalog identities and duplicate uses as ambiguous", async () => {
    const value = bundle();
    const catalog = value.extension_contracts as Array<Record<string, unknown>>;
    const catalogEntry = catalog[0];
    if (catalogEntry === undefined) throw new Error("Missing test catalog entry.");
    catalog.push(structuredClone(catalogEntry));
    const uses = value.extensions as Array<Record<string, unknown>>;
    const extensionUse = uses[0];
    if (extensionUse === undefined) throw new Error("Missing test extension use.");
    uses.push(structuredClone(extensionUse));
    expect(await rules(value, resolver())).toEqual(
      expect.arrayContaining([
        "extension.catalog-id.duplicate",
        "extension.use-id.duplicate",
        "extension.required.contract-unresolved",
      ]),
    );
  });

  it("maps resolver absence and failure to governed unresolved diagnostics", async () => {
    expect(await rules(bundle(), undefined)).toContain(
      "extension.required.contract-unresolved",
    );
    expect(
      await rules(bundle(), {
        resolve: async () => {
          throw new Error("offline");
        },
      }),
    ).toContain("extension.required.contract-unresolved");
  });

  it("checks both exact artifact digests", async () => {
    expect(
      await rules(
        bundle(),
        resolver({ specification: Buffer.from("different", "utf8") }),
      ),
    ).toContain("extension.required.contract-digest-mismatch");
  });

  it("parses and checks identity from the exact executable bytes", async () => {
    const wrongBytes = executable("com.example.other");
    expect(
      await rules(
        bundle("required", wrongBytes),
        resolver({ id: extensionId }, wrongBytes),
      ),
    ).toContain("extension.required.contract-identity-mismatch");
  });

  it("fails closed when a required exact extension is unsupported", async () => {
    expect(await rules(bundle(), resolver({ supported: false }))).toContain(
      "extension.required.unsupported",
    );
  });

  it("maps false and thrown supported-payload validation to payload invalid", async () => {
    expect(
      await rules(bundle(), resolver({ validatePayload: async () => false })),
    ).toContain("extension.payload.invalid");
    expect(
      await rules(
        bundle(),
        resolver({
          validatePayload: async () => {
            throw new Error("validator failure");
          },
        }),
      ),
    ).toContain("extension.payload.invalid");
  });

  it("rejects an extension vocabulary that conflicts with Core", async () => {
    const conflictingBytes = executable(extensionId, {
      section_roles: { governing: "replacement" },
    });
    expect(
      await rules(
        bundle("required", conflictingBytes),
        resolver({}, conflictingBytes),
      ),
    ).toContain("extension.core-conflict");
  });

  it("preserves an unsupported optional extension as unvalidated", async () => {
    expect(
      await rules(bundle("optional"), resolver({ supported: false })),
    ).toContain("extension.optional.unvalidated");
  });
});
