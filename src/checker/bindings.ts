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
      sha256: "336876774b4f2ee02a0a74b29616bdaf35df412edd8046ae3cd1cb18fc1b2a02",
    },
    executable: {
      path: "contracts/nkf/0.2/nkf.yaml",
      sha256: "df4e62f9f8e98bee2018cecdc205f92cdc191a8788e6a0ee8e2bb2378b86be07",
    },
    schemas: [
      {
        identity: "urn:nkf:0.2:schema:bundle",
        file: "bundle.schema.json",
        sha256: "200f34e9f4d1f17f39c97778882c85dbf6e095b42d36b086ae9e5bd1c76ce43f",
      },
      {
        identity: "urn:nkf:0.2:schema:record",
        file: "record.schema.json",
        sha256: "4ca328826f791be6aa76d49681e0217130c5facf02cc175fe18d98cf6edee0a0",
      },
      {
        identity: "urn:nkf:0.2:schema:validation-result",
        file: "validation-result.schema.json",
        sha256: "a593c5bbbd36ab6849fc88ade1c1abcc801e1a6e566f1ef77f8c62f21e60d011",
      },
    ],
  },
  "0.3": {
    specification: {
      path: "knowledge/specifications/nkf-0.3.md",
      sha256: "0094bedce5485901c3ab6fb542e3d2785e961991cf7cc6f24e9aa3462498436e",
    },
    executable: {
      path: "contracts/nkf/0.3/nkf.yaml",
      sha256: "e988a596e741d48611a5f77a9236e9d539f9a7475a76f07768bc273a8bf4d27f",
    },
    schemas: [
      {
        identity: "urn:nkf:0.3:schema:bundle",
        file: "bundle.schema.json",
        sha256: "df475558146d6a8fe70ef9d159f10cd6fc29f97f32b87e2990d579ad927bf9f2",
      },
      {
        identity: "urn:nkf:0.3:schema:record",
        file: "record.schema.json",
        sha256: "c0be79ede0765487ccfdca77c086e51c1263b0b814afa1249df8ee2ffa6cf0bb",
      },
      {
        identity: "urn:nkf:0.3:schema:validation-result",
        file: "validation-result.schema.json",
        sha256: "15e56ee6542865f97b48087078c28b285bc40b3385e8ff74d608711e2ddbc9b1",
      },
    ],
  },
  "0.4": {
    specification: {
      path: "knowledge/specifications/nkf-0.4.md",
      sha256: "7298d1a55dcd74d4cc96368648aadbd6a70b5cf4c62d2a1c7f528e7c9181bab1",
    },
    executable: {
      path: "contracts/nkf/0.4/nkf.yaml",
      sha256: "a84fcc1e99567b6716e3281efedbbc87c978ffa465cd4cb5d8cac1d46ad0d217",
    },
    schemas: [
      {
        identity: "urn:nkf:0.4:schema:bundle",
        file: "bundle.schema.json",
        sha256: "79fabd552bcc8233894ee8d3e096a52ea9b3e82e263ec59d3320d8bfed8076f4",
      },
      {
        identity: "urn:nkf:0.4:schema:record",
        file: "record.schema.json",
        sha256: "2478e1b3f528cce5daf342ed240e8efd51f05c10f5374fc553a755f863196b0c",
      },
      {
        identity: "urn:nkf:0.4:schema:validation-result",
        file: "validation-result.schema.json",
        sha256: "6ed75b295b9ac9dff758c9d654cc76bd22b0385fb9bc9ea01353cb7b6add5fda",
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
