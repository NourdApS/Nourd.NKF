export const CORE_BINDINGS = {
  specification: {
    path: "knowledge/specifications/nkf-0.1.md",
    sha256: "2274d569d147eadd658de8e8f00a790630be1f30a5303f3c608b085fac020f48",
  },
  executable: {
    path: "contracts/nkf/0.1/nkf.yaml",
    sha256: "7fc193f8622f8068c56a24fc5f4cfbe11ea2787f3bba3bb612f9a39d49f8e413",
  },
  schemas: [
    {
      identity: "urn:nkf:0.1:schema:bundle",
      file: "bundle.schema.json",
      sha256: "7718ad7ffdc5cf8884b68b163edef58cb3b080eec6316ec4edc7e79de52208b4",
    },
    {
      identity: "urn:nkf:0.1:schema:record",
      file: "record.schema.json",
      sha256: "3e28f6549e1139a813102f4786b491a02af2c5e0c92eedf06290d59a79206273",
    },
    {
      identity: "urn:nkf:0.1:schema:validation-result",
      file: "validation-result.schema.json",
      sha256: "33386af81143415adbb48a365d6b00571cfed31fa3072c1e30ecd9d306802e12",
    },
  ],
} as const;
