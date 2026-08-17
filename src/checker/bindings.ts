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
  "0.6": {
    specification: {
      path: "knowledge/specifications/nkf-0.6-revision-3.md",
      sha256: "bb602be39dbbb5d7c4f97726ea70a46da6af41cfc5de6c25ab6bac9beddfcb6a",
    },
    executable: {
      path: "contracts/nkf/0.6/revision-3/nkf.yaml",
      sha256: "7366ea1276282990733339e5bb4464ab9d9259592d5cffb2a84b000f734fd5e4",
    },
    freshnessPolicy: {
      path: "contracts/nkf/0.6/freshness-policy.yaml",
      sha256: "a870dc037364776b927e93705655d3f4572407c65852c4e5a258aa7d5bafe4a4",
    },
    schemas: [
      { identity: "urn:nkf:0.6:schema:bundle", file: "bundle.schema.json", sha256: "f146dd0e04d4ee8aff5d013abf476620f458d03328f758684ea4019b564a9290" },
      { identity: "urn:nkf:0.6:schema:record", file: "record.schema.json", sha256: "a3e799112ff0d6af1111c2d574ebc31d783bd00a8193f10721437cc5ed40cd8a" },
      { identity: "urn:nkf:0.6:schema:graph-baseline", file: "graph-baseline.schema.json", sha256: "9edb4c488577635059c7a4545aaba8a318a625811a93078e76a8d5621f1dd77b" },
      { identity: "urn:nkf:0.6:schema:freshness-receipt", file: "freshness-receipt.schema.json", sha256: "819685c152751aca279284a0f6ce8b565f45c985af40d006b5d81463a20421fb" },
      { identity: "urn:nkf:0.6:schema:freshness-policy", file: "freshness-policy.schema.json", sha256: "a1b21747d9cbd72416599224a9a9dcb80d1fca7b8f50bc2fa9f411dc77277b2f" },
      { identity: "urn:nkf:0.6:schema:validation-result", file: "validation-result.schema.json", sha256: "8d751bb013dc87d9ebf3287b85e8589f628e7369eca67902d503b12595a6d743" },
    ],
  },
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
} as const satisfies Record<string, CoreBindings>;

export type SupportedNkfVersion = keyof typeof VERSION_BINDINGS;

export function bindingsForVersion(version: string): CoreBindings | undefined {
  return (VERSION_BINDINGS as Record<string, CoreBindings | undefined>)[version];
}

export const CORE_BINDINGS: CoreBindings = VERSION_BINDINGS["0.7"];

export function unsupportedVersionBindings(version: string): CoreBindings {
  const missing = `contracts/nkf/${version}/nkf.yaml`;
  return {
    specification: { path: `${missing}.unsupported`, sha256: "0".repeat(64) },
    executable: { path: missing, sha256: "0".repeat(64) },
    schemas: [],
  };
}
