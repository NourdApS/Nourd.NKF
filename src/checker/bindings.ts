export const CORE_BINDINGS = {
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
} as const;
