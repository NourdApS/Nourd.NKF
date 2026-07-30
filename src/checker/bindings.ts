export const CORE_BINDINGS = {
  specification: {
    path: "knowledge/specifications/nkf-0.1.md",
    sha256: "52daa84db3067e39d8868f190874bb3a75328589d00127fecd7cb299312fa4ed",
  },
  executable: {
    path: "contracts/nkf/0.1/nkf.yaml",
    sha256: "9bd57b1a3c9992ff30a50d5e90ba7f7ef55d56f5aa4a38a5a463e711e07a1136",
  },
  schemas: [
    {
      identity: "urn:nkf:0.1:schema:bundle",
      file: "bundle.schema.json",
      sha256: "b186a0435d95864b2782e4382a06c64315fb58793d42e9cf8cf0a49839bceb16",
    },
    {
      identity: "urn:nkf:0.1:schema:record",
      file: "record.schema.json",
      sha256: "94a3143ad1cf4be7cb01191d602115c783b1cfa5d11fedcbdd53b3c273c6e85f",
    },
    {
      identity: "urn:nkf:0.1:schema:validation-result",
      file: "validation-result.schema.json",
      sha256: "24a736cdf1138af6ef88603bb3ab67dea35e7b9f978e9681bb4e465f7bf2a004",
    },
  ],
} as const;
