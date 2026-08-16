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
      sha256: "f8ce1a512103ee387b204bd899be700d9b83dcf717ec6c57e4659998bb98821b",
    },
    executable: {
      path: "contracts/nkf/0.7/nkf.yaml",
      sha256: "1b7816b807887ce4071788e7efb65e30f4c6dd23fb3ba649822ec5aaad92fb15",
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
      { identity: "urn:nkf:0.7:schema:bundle", file: "bundle.schema.json", sha256: "9056a3f70776bb7c11eb180b176fa270e8a425ae3da16d97c6e5c62932533f12" },
      { identity: "urn:nkf:0.7:schema:record", file: "record.schema.json", sha256: "88eba421bfa891f270bd339ca6200253047a2d1a2496711718aa3c8e0a675781" },
      { identity: "urn:nkf:0.7:schema:graph-baseline", file: "graph-baseline.schema.json", sha256: "a75e0d9464481fe39869971268c28bca5a5c6bbe849be80d52fe93b2380a1649" },
      { identity: "urn:nkf:0.7:schema:freshness-receipt", file: "freshness-receipt.schema.json", sha256: "da61e5af139a31bc951e007dd6cdedc0725812f3b835566ea5397c6a88b9527d" },
      { identity: "urn:nkf:0.7:schema:freshness-policy", file: "freshness-policy.schema.json", sha256: "94280db4141b5d7fc26b9c614202d334151894a434cf966c92b01dd0c2c60e36" },
      { identity: "urn:nkf:0.7:schema:validation-result", file: "validation-result.schema.json", sha256: "242d0dcc363a76444e32041fd77e3d5b700988d71c60a0ce8920393b6414a258" },
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
