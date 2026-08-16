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
      sha256: "03f55c160a13aefe6738880541847f1f89cd2f8883fe2989ad5e1e721321d841",
    },
    executable: {
      path: "contracts/nkf/0.7/nkf.yaml",
      sha256: "123c14973f983243cfda23bd2ce2ae78cc6d10978beb0a1d1329fbf1293a5a7e",
    },
    freshnessPolicy: {
      path: "contracts/nkf/0.7/freshness-policy.yaml",
      sha256: "9d7ff664a0a0ce788a096f32e1cd74197c10a48523286ea58f04c4c9496077d4",
    },
    versionDelta: {
      path: "contracts/nkf/0.7/version-delta.yaml",
      sha256: "595afe8d5517f005644807e4cfa2cca9c45ceca0cc895b3de10bd0e333af9eab",
    },
    schemas: [
      { identity: "urn:nkf:0.7:schema:bundle", file: "bundle.schema.json", sha256: "04f35bd99dd0a200a0cecc768d6f04154fec9f06769b22b5849f7dcbb4488f32" },
      { identity: "urn:nkf:0.7:schema:record", file: "record.schema.json", sha256: "9d05cbe407582a84d61095a0ec4a9fdd61de430620aab5b73488776050e68b02" },
      { identity: "urn:nkf:0.7:schema:graph-baseline", file: "graph-baseline.schema.json", sha256: "105736998d4169879cdd3ad5b302a443b9995f2eac599eaad5be825f0a597a02" },
      { identity: "urn:nkf:0.7:schema:freshness-receipt", file: "freshness-receipt.schema.json", sha256: "63b8360f1264a501209a2b5d8c56b0f16626c85faf27e1eeff47a82a80599180" },
      { identity: "urn:nkf:0.7:schema:freshness-policy", file: "freshness-policy.schema.json", sha256: "595bfbb3509429f2c7d05eaa1fda2571756a3989597c4c9a2384c16f8a1b3388" },
      { identity: "urn:nkf:0.7:schema:validation-result", file: "validation-result.schema.json", sha256: "006e5bff9682abecd48677cbd197506be8df66a5b8a43edba53e8f4053d250e7" },
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
