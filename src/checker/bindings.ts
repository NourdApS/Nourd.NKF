export const CORE_BINDINGS = {
  specification: {
    path: "knowledge/specifications/nkf-0.1.md",
    sha256: "67beed2a380e719573175d3dfd70b05c59cbe51274c9975f863a58f7083ddba4",
  },
  executable: {
    path: "contracts/nkf/0.1/nkf.yaml",
    sha256: "7a2489c3b81ef87e38913629c65f71b8b39e815d9b72efe81939c4500db3510b",
  },
  schemas: [
    {
      identity: "urn:nkf:0.1:schema:bundle",
      file: "bundle.schema.json",
      sha256: "73459c032933eb140b7c62d5dc551ea8103e1e5c3c72ba6d7823c73757cf9fbc",
    },
    {
      identity: "urn:nkf:0.1:schema:record",
      file: "record.schema.json",
      sha256: "aad9bac1c7dd40bef536010da9b3493f5c08f89d46d044a62b141e9cda3d46a7",
    },
    {
      identity: "urn:nkf:0.1:schema:validation-result",
      file: "validation-result.schema.json",
      sha256: "f901f78d3c11e9360f55d322713296879d8e2971059b83a8bb1b33ddbf6b30a1",
    },
  ],
} as const;
