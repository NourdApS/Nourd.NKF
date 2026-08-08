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
      sha256: "6af631cb20571570a6d688caf0fd814531f809f8229517ddce10ac7f30141aec",
    },
    executable: {
      path: "contracts/nkf/0.2/nkf.yaml",
      sha256: "da5525398523e2f19f49509a60007624f0e529f2dd15a686ea00dd82847b92d2",
    },
    schemas: [
      {
        identity: "urn:nkf:0.2:schema:bundle",
        file: "bundle.schema.json",
        sha256: "c07dc17b6aacbd77e28252924e1bb2e9ffba036a92c630721f2bbfc29211d618",
      },
      {
        identity: "urn:nkf:0.2:schema:record",
        file: "record.schema.json",
        sha256: "767b572320e2e1ff54d3ed6b30ebf5e2d1a594e6d1174d965d238834abf0db46",
      },
      {
        identity: "urn:nkf:0.2:schema:validation-result",
        file: "validation-result.schema.json",
        sha256: "484bcf2b4aa102c5e75a30cf4c52439b56e384b92792191b50345f09b3dd54e4",
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
