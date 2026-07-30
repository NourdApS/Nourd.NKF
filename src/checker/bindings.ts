export const CORE_BINDINGS = {
  specification: {
    path: "knowledge/specifications/nkf-0.1.md",
    sha256: "8fa484035c2fccf401cb966cf39ae57e17d214178c0153ad43d53790d7832e50",
  },
  executable: {
    path: "contracts/nkf/0.1/nkf.yaml",
    sha256: "fd60ad052ff5b58a20b285fec03aede560cd84d18221f7b2d88b7db7fdf67dbd",
  },
  schemas: [
    {
      identity: "urn:nkf:0.1:schema:bundle",
      file: "bundle.schema.json",
      sha256: "7d923662563b1b298bb79cacf95f1ad4e836f7322295508b14491a646cd297d8",
    },
    {
      identity: "urn:nkf:0.1:schema:record",
      file: "record.schema.json",
      sha256: "e92f7ba4b87ab21042f768b1b0f78bcbd0050911c229233e3073a80e487b75d4",
    },
    {
      identity: "urn:nkf:0.1:schema:validation-result",
      file: "validation-result.schema.json",
      sha256: "d544485bf693d7e23d6c34ec87d4ac484d6bba40360f8d2a8b8c4466b26a017a",
    },
  ],
} as const;
