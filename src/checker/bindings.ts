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
  "0.81": {
    specification: {
      path: "knowledge/specifications/nkf-0.81.md",
      sha256: "b6a3991cde1121a87842e2464e16145346e72c7ee82b2040621bad851bb1da45",
    },
    executable: {
      path: "contracts/nkf/0.81/nkf.yaml",
      sha256: "004969c10d74191274f74a4dce0b9aebb983d52a70ee3351e05e18086dc78cb4",
    },
    freshnessPolicy: {
      path: "contracts/nkf/0.81/freshness-policy.yaml",
      sha256: "742f72d81531e48b3af2453affb3548faa85064f0dcca7e39b8e3962a7a25de4",
    },
    versionDelta: {
      path: "contracts/nkf/0.81/version-delta.yaml",
      sha256: "9908a65fbd31e1c7e5c6ce9f70769d54142a57e0a446643b0abea51c07ccdf42",
    },
    schemas: [
      { identity: "urn:nkf:0.81:schema:bundle", file: "bundle.schema.json", sha256: "56e0ff6bbfcd1bbd5175933e0190b7abae2c57490fcaac9d15f1626881d5506c" },
      { identity: "urn:nkf:0.81:schema:record", file: "record.schema.json", sha256: "d96c48742af39c2ea62d5f07614f0144fc9ded8836f3dfe0e835b10b55708f06" },
      { identity: "urn:nkf:0.81:schema:graph-baseline", file: "graph-baseline.schema.json", sha256: "5526662aca6028945d0b1938ffa27061b2111c3488e9b7c22f1cc6935f750be2" },
      { identity: "urn:nkf:0.81:schema:freshness-receipt", file: "freshness-receipt.schema.json", sha256: "ce4c23f76ed9375848336b9fd27121d2592e5ab540de46ee4feccb340ef22dfa" },
      { identity: "urn:nkf:0.81:schema:freshness-policy", file: "freshness-policy.schema.json", sha256: "7adc387e83ca55f004308ac2f299dd158caf13a66d909010c11f17a6d8baddeb" },
      { identity: "urn:nkf:0.81:schema:validation-result", file: "validation-result.schema.json", sha256: "cab70f511e73472acc2df8e68f102e31e2dc5feb6ae055c20a824b354fd370f2" },
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
  // NKF 0.81 recomputes the delta-review closure with impact propagation
  // instead of trusting the recorded one; 0.8 tooling recorded closures
  // without propagation and cannot be held to it retroactively (ADR 0139).
  readonly closureRecompute: boolean;
}

export const VERSION_CAPABILITIES: Record<SupportedNkfVersion, VersionCapabilities> = {
  "0.8": {
    modernEnvelope: true,
    neutralTopology: true,
    digestBoundBaseline: true,
    promotionReconciliation: true,
    conclusionClaim: true,
    guidanceSelfDescription: true,
    closureRecompute: false,
  },
  "0.81": {
    modernEnvelope: true,
    neutralTopology: true,
    digestBoundBaseline: true,
    promotionReconciliation: true,
    conclusionClaim: true,
    guidanceSelfDescription: true,
    closureRecompute: true,
  },
};

export function capabilitiesForVersion(version: string): VersionCapabilities | undefined {
  return (VERSION_CAPABILITIES as Record<string, VersionCapabilities | undefined>)[version];
}

export const CORE_BINDINGS: CoreBindings = VERSION_BINDINGS["0.81"];

export function unsupportedVersionBindings(version: string): CoreBindings {
  const missing = `contracts/nkf/${version}/nkf.yaml`;
  return {
    specification: { path: `${missing}.unsupported`, sha256: "0".repeat(64) },
    executable: { path: missing, sha256: "0".repeat(64) },
    schemas: [],
  };
}
