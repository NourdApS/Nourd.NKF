export const CORE_BINDINGS = {
  specification: {
    path: "knowledge/specifications/nkf-0.1.md",
    sha256: "428bcc1b2fbda43052582663630fe808b536e5b424caba0afdabbf298d87c6be",
  },
  executable: {
    path: "contracts/nkf/0.1/nkf.yaml",
    sha256: "b05d4e7d34d5f2b8472045feed547ae44ff4a0a57299da0630b3a538dc6ab2fd",
  },
  schemas: [
    {
      identity: "urn:nkf:0.1:schema:bundle",
      file: "bundle.schema.json",
      sha256: "05f9303d799f8e07a64dc2fb571317ca3d28491dd02d5ed0a446b77065468a1f",
    },
    {
      identity: "urn:nkf:0.1:schema:record",
      file: "record.schema.json",
      sha256: "397f83707112022b16f7860882e3b48afb83b9c46c62cc82043483e7a727859b",
    },
    {
      identity: "urn:nkf:0.1:schema:validation-result",
      file: "validation-result.schema.json",
      sha256: "155f94a6c3ff7c86a57c58590fa9d3a6a2afc609a5ab6a9a6191a9c9e9708248",
    },
  ],
} as const;
