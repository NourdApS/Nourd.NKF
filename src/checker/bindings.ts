export interface CoreBindings {
  readonly specification: { readonly path: string; readonly sha256: string };
  readonly executable: { readonly path: string; readonly sha256: string };
  readonly freshnessPolicy?: { readonly path: string; readonly sha256: string };
  readonly versionDelta?: { readonly path: string; readonly sha256: string };
  readonly schemas: readonly {
    readonly identity: string;
    readonly file: string;
    readonly sha256: string;
  }[];
}

export const VERSION_BINDINGS = {
  "0.7": {
    specification: {
      path: "knowledge/specifications/nkf-0.7.md",
      sha256: "6d1c904608f57446939f9442d46aa3b735e34fce75ddfba24fabbea8416f0992",
    },
    executable: {
      path: "contracts/nkf/0.7/nkf.yaml",
      sha256: "9175c86b82100b84e983afbc06f89ff79c666bd8cd0626ee7892688e6551cc49",
    },
    freshnessPolicy: {
      path: "contracts/nkf/0.7/freshness-policy.yaml",
      sha256: "7bee48aac0fef1b1cc968efa25f2a6fb2205c77a0ec3fcf6c82ec17cdd5eeee0",
    },
    versionDelta: {
      path: "contracts/nkf/0.7/version-delta.yaml",
      sha256: "dcc65c82512c73a204223a3bac990c951f44e995d5859426479042dbef8fcb37",
    },
    schemas: [
      { identity: "urn:nkf:0.7:schema:bundle", file: "bundle.schema.json", sha256: "5431dc2bc9ffc4e7c0ce0734fb3e893c912026b0d21907840cec097c832c367f" },
      { identity: "urn:nkf:0.7:schema:record", file: "record.schema.json", sha256: "dadc06d895192ed6a316d528bb03a6a27aa2b6e0d5d9059d4ffa9200ad53bbbf" },
      { identity: "urn:nkf:0.7:schema:graph-baseline", file: "graph-baseline.schema.json", sha256: "6f20041380e2a051ea6016ed8308d6e94c920df6622715a11ad23a987c21d176" },
      { identity: "urn:nkf:0.7:schema:freshness-receipt", file: "freshness-receipt.schema.json", sha256: "17909559b4bbf3e2185572eae08be1412f0e8f2f2bd02b06f334424934768397" },
      { identity: "urn:nkf:0.7:schema:freshness-policy", file: "freshness-policy.schema.json", sha256: "6b8d1743706f7eeee9107946154f96e7e0fcd4975bb2941d7a279639f3a5c809" },
      { identity: "urn:nkf:0.7:schema:validation-result", file: "validation-result.schema.json", sha256: "d58aa9f0755e06d27de5b0ea79108855503df1b109106a21254ac5f8258bde4e" },
    ],
  },
  "0.71": {
    specification: {
      path: "knowledge/specifications/nkf-0.71.md",
      sha256: "ec6d7fd733a989eb86580bd3a9d77405d3c02d5402429190ad8d171c4414ae98",
    },
    executable: {
      path: "contracts/nkf/0.71/nkf.yaml",
      sha256: "65b5bec3dd16cd1872216b2dc17acbe77f1a363e76112f675a271e337cf6ec1a",
    },
    freshnessPolicy: {
      path: "contracts/nkf/0.71/freshness-policy.yaml",
      sha256: "20c7b5f4e34f88da6c8365a59cee913020263c2c4ab36796602a2a7cb0ab1ae4",
    },
    versionDelta: {
      path: "contracts/nkf/0.71/version-delta.yaml",
      sha256: "21089afc8155a98410960e2fa7cf19344e1e5ca010095a0f7975dc783d730c01",
    },
    schemas: [
      { identity: "urn:nkf:0.71:schema:bundle", file: "bundle.schema.json", sha256: "30370bcfadd8c77dbf1b31ccd5a6d91d30c2df20115690a7ddac5c0ebcd1e0f4" },
      { identity: "urn:nkf:0.71:schema:record", file: "record.schema.json", sha256: "bbb6f49efb345a1999a37b673974728c3b083d3d9172ccd34e3eb13c59b5bf8a" },
      { identity: "urn:nkf:0.71:schema:graph-baseline", file: "graph-baseline.schema.json", sha256: "6c9f77452153d90fd49d17140675ac7d7b78ba05ee48854a3c42fd297aeab220" },
      { identity: "urn:nkf:0.71:schema:freshness-receipt", file: "freshness-receipt.schema.json", sha256: "02e67f321dd8570812e7ed6fd372bcc7e7c8dbe357f5aa4cbe54bf36ecdcd99f" },
      { identity: "urn:nkf:0.71:schema:freshness-policy", file: "freshness-policy.schema.json", sha256: "b2b0a8940da40cf4e3408a36c62bd624277f76ebfd49a853c24b268c6beb8db6" },
      { identity: "urn:nkf:0.71:schema:validation-result", file: "validation-result.schema.json", sha256: "61e0f57ec073f42eca91e1037603c0d6e71eb5af543a58599b6f93b7c5fc194a" },
    ],
  },
} as const satisfies Record<string, CoreBindings>;

export type SupportedNkfVersion = keyof typeof VERSION_BINDINGS;

export function bindingsForVersion(version: string): CoreBindings | undefined {
  return (VERSION_BINDINGS as Record<string, CoreBindings | undefined>)[version];
}

// Closed per-version capability table. Every version-conditional checker
// behavior dispatches through these exhaustive fields so an unregistered
// version is a compile-time hole, never a silent fall-through to
// predecessor semantics.
export interface VersionCapabilities {
  readonly modernEnvelope: true;
  readonly neutralTopology: true;
  readonly digestBoundBaseline: true;
  readonly promotionReconciliation: true;
  readonly conclusionClaim: boolean;
}

export const VERSION_CAPABILITIES: Record<SupportedNkfVersion, VersionCapabilities> = {
  "0.7": {
    modernEnvelope: true,
    neutralTopology: true,
    digestBoundBaseline: true,
    promotionReconciliation: true,
    conclusionClaim: false,
  },
  "0.71": {
    modernEnvelope: true,
    neutralTopology: true,
    digestBoundBaseline: true,
    promotionReconciliation: true,
    conclusionClaim: true,
  },
};

export function capabilitiesForVersion(version: string): VersionCapabilities | undefined {
  return (VERSION_CAPABILITIES as Record<string, VersionCapabilities | undefined>)[version];
}

export const CORE_BINDINGS: CoreBindings = VERSION_BINDINGS["0.71"];

export function unsupportedVersionBindings(version: string): CoreBindings {
  const missing = `contracts/nkf/${version}/nkf.yaml`;
  return {
    specification: { path: `${missing}.unsupported`, sha256: "0".repeat(64) },
    executable: { path: missing, sha256: "0".repeat(64) },
    schemas: [],
  };
}
