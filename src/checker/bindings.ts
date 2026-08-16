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
      sha256: "5fb91a603982de9741400a95809d359b79aa2883d08d7b4e36d150c9ff204ef0",
    },
    executable: {
      path: "contracts/nkf/0.7/nkf.yaml",
      sha256: "936c1795fe2facc83cb4c80c82d37fa6622293b24b4e10a70174baf56f86fe9a",
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
      { identity: "urn:nkf:0.7:schema:bundle", file: "bundle.schema.json", sha256: "c3e813a63dd043a6db9230edfd4eafb5ceeb45288e97231abebcca1417261f2e" },
      { identity: "urn:nkf:0.7:schema:record", file: "record.schema.json", sha256: "9607f86ba78c30ebf1497495193f8b58a17cfa4de82f91e4b0230d3eecf905e5" },
      { identity: "urn:nkf:0.7:schema:graph-baseline", file: "graph-baseline.schema.json", sha256: "498bee4afc9b0c7ba4a9b5bddb2d325d47a9f36fb209060f095fb3369867522a" },
      { identity: "urn:nkf:0.7:schema:freshness-receipt", file: "freshness-receipt.schema.json", sha256: "ca9303427d8308b06bbc90d2cbe35ee64b4136be16293e7944aa2861fc521e17" },
      { identity: "urn:nkf:0.7:schema:freshness-policy", file: "freshness-policy.schema.json", sha256: "9560857e403683dea29c86b0e70aa16013f35ab8ed57c6b59a3487bdcb1d644e" },
      { identity: "urn:nkf:0.7:schema:validation-result", file: "validation-result.schema.json", sha256: "e31721e3aceba1b8761e29813f9d18163230b4e4d442b695f78dafb3497cfbf3" },
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
