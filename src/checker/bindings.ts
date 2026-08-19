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
  "0.8": {
    specification: {
      path: "knowledge/specifications/nkf-0.8.md",
      sha256: "6a5c571d6dcc1a00c52467095e8835458d829c67e5c9e72f9363fe66cec2982e",
    },
    executable: {
      path: "contracts/nkf/0.8/nkf.yaml",
      sha256: "6d162800ecb2a41fb9b6ead544cc0d5ecd4dc119cd72298138a4d17ccd822326",
    },
    freshnessPolicy: {
      path: "contracts/nkf/0.8/freshness-policy.yaml",
      sha256: "7cfb1b40a8b6f86543cb7b6016c6e9b2c1159d2a748c1915d0e9bf51bb82afd4",
    },
    versionDelta: {
      path: "contracts/nkf/0.8/version-delta.yaml",
      sha256: "cc17f23a44afcf56b107f3e76e4d761779a4225bd2f8955c51d9781193c9c8b9",
    },
    schemas: [
      { identity: "urn:nkf:0.8:schema:bundle", file: "bundle.schema.json", sha256: "e9ad6d4150822d8e3190d09ea5104b5c94096b5f5d82213e963d49874b635837" },
      { identity: "urn:nkf:0.8:schema:record", file: "record.schema.json", sha256: "b8a96b460c7735214c27fa98f23fdc756f8cf262cd9e1c039098b2163003589c" },
      { identity: "urn:nkf:0.8:schema:graph-baseline", file: "graph-baseline.schema.json", sha256: "d06edec66beb991ad7414017a2716e7ae34c252d2b80392637cd80d67cdc7685" },
      { identity: "urn:nkf:0.8:schema:freshness-receipt", file: "freshness-receipt.schema.json", sha256: "ed49656906a325c5c72c2e2ae993321b5d785384468f6c643938bd32e988264a" },
      { identity: "urn:nkf:0.8:schema:freshness-policy", file: "freshness-policy.schema.json", sha256: "4060e0edb9de494bf971ad58d6502d1d8cc8b14d6f9b036ded9e53b2b2e15e76" },
      { identity: "urn:nkf:0.8:schema:validation-result", file: "validation-result.schema.json", sha256: "37fcde1234167449cd5dd79824296567aa8e4e74b251f9a94e66e6396e53e96d" },
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
  // NKF 0.8 checks a guidance file's own frontmatter description against the
  // version it serves. NKF 0.71 shipped the defect this catches and cannot
  // retroactively enforce it, so the capability is per-version rather than
  // assumed.
  readonly guidanceSelfDescription: boolean;
}

export const VERSION_CAPABILITIES: Record<SupportedNkfVersion, VersionCapabilities> = {
  "0.71": {
    modernEnvelope: true,
    neutralTopology: true,
    digestBoundBaseline: true,
    promotionReconciliation: true,
    conclusionClaim: true,
    guidanceSelfDescription: false,
  },
  "0.8": {
    modernEnvelope: true,
    neutralTopology: true,
    digestBoundBaseline: true,
    promotionReconciliation: true,
    conclusionClaim: true,
    guidanceSelfDescription: true,
  },
};

export function capabilitiesForVersion(version: string): VersionCapabilities | undefined {
  return (VERSION_CAPABILITIES as Record<string, VersionCapabilities | undefined>)[version];
}

export const CORE_BINDINGS: CoreBindings = VERSION_BINDINGS["0.8"];

export function unsupportedVersionBindings(version: string): CoreBindings {
  const missing = `contracts/nkf/${version}/nkf.yaml`;
  return {
    specification: { path: `${missing}.unsupported`, sha256: "0".repeat(64) },
    executable: { path: missing, sha256: "0".repeat(64) },
    schemas: [],
  };
}
