export interface CoreBindings {
  readonly specification: { readonly path: string; readonly sha256: string };
  readonly executable: { readonly path: string; readonly sha256: string };
  readonly schemas: readonly {
    readonly identity: string;
    readonly file: string;
    readonly sha256: string;
  }[];
}

export const VERSION_BINDINGS = {
  "0.1": {
    specification: {
      path: "knowledge/specifications/nkf-0.1.md",
      sha256: "df0235ee01ba951fe5beea50990213e4d1063b2e7014f460657de6904d5fabc0",
    },
    executable: {
      path: "contracts/nkf/0.1/nkf.yaml",
      sha256: "3cd00712ecf5fc4d4ae6faa275fd04373d28802eb1de80f6c47f6f039026f0aa",
    },
    schemas: [
      {
        identity: "urn:nkf:0.1:schema:bundle",
        file: "bundle.schema.json",
        sha256: "0a0a0da242da6ace71da45e4f48f871484a04c6a58d3e1a4c44efb6e6d745eaa",
      },
      {
        identity: "urn:nkf:0.1:schema:record",
        file: "record.schema.json",
        sha256: "84d710cef9a70aee40f75fc6fe21c42c17fe7173638a3f4b96697fe93e43f8c2",
      },
      {
        identity: "urn:nkf:0.1:schema:validation-result",
        file: "validation-result.schema.json",
        sha256: "af2318881ce461b023ec216ab07b9e5ce71ef51943b6f66cb5af68ea0e596560",
      },
    ],
  },
  "0.2": {
    specification: {
      path: "knowledge/specifications/nkf-0.2.md",
      sha256: "df2e457e5e3824004268efebdead93be56df36c3754cf563b2701cee0474c26f",
    },
    executable: {
      path: "contracts/nkf/0.2/nkf.yaml",
      sha256: "087934ec88de7f6c25b64e9706599403876d28cbc1f0accd50bc9bfbdd419b27",
    },
    schemas: [
      {
        identity: "urn:nkf:0.2:schema:bundle",
        file: "bundle.schema.json",
        sha256: "8b51435b1981af6e64d085210e3f06abdd1dccf2f66574f55a5e70b9e5416300",
      },
      {
        identity: "urn:nkf:0.2:schema:record",
        file: "record.schema.json",
        sha256: "8b7031c9ef0296b5b9b1f771f49879478e8d2834b17941c597b69206dfaa9b3a",
      },
      {
        identity: "urn:nkf:0.2:schema:validation-result",
        file: "validation-result.schema.json",
        sha256: "4c97d4795d7a8cf633d96f3f352aa276cf58417424ea907132be52adb6bc657f",
      },
    ],
  },
} as const satisfies Record<string, CoreBindings>;

export type SupportedNkfVersion = keyof typeof VERSION_BINDINGS;

export function bindingsForVersion(version: string): CoreBindings | undefined {
  return (VERSION_BINDINGS as Record<string, CoreBindings | undefined>)[version];
}

export const CORE_BINDINGS: CoreBindings = VERSION_BINDINGS["0.1"];

export function unsupportedVersionBindings(version: string): CoreBindings {
  const missing = `contracts/nkf/${version}/nkf.yaml`;
  return {
    specification: { path: `${missing}.unsupported`, sha256: "0".repeat(64) },
    executable: { path: missing, sha256: "0".repeat(64) },
    schemas: [],
  };
}
