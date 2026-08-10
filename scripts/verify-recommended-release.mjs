import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseStrictJson } from "./release/core.mjs";
import {
  ACCEPTED_ARTIFACT_DIGESTS,
  CHECKER_CONFIRMATION,
} from "./release/config.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function fail(message) {
  throw new Error(message);
}

function exactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an object.`);
  }
  if (
    JSON.stringify(Object.keys(value).sort()) !==
    JSON.stringify([...expected].sort())
  ) {
    fail(`${label} contains unsupported fields.`);
  }
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

const catalog = parseStrictJson(
  await readFile(path.join(repositoryRoot, "release/recommended.json")),
);
exactKeys(
  catalog,
  [
    "adopter_sha256",
    "archive",
    "authority",
    "channel",
    "compatibility",
    "checker_sha256",
    "contract",
    "nkf_version",
    "release",
    "source_commit",
    "state",
    "supported_root_profiles",
  ],
  "Recommended release",
);
exactKeys(
  catalog.archive,
  ["asset_name", "sha256", "size", "tag", "url"],
  "Recommended archive",
);
exactKeys(
  catalog.authority,
  ["executable_sha256", "markdown_sha256"],
  "Recommended authority",
);
exactKeys(
  catalog.release,
  ["prerelease", "published_at", "url", "visibility"],
  "Recommended publication",
);
if (!Array.isArray(catalog.compatibility) || catalog.compatibility.length !== 2) {
  fail("Recommended compatibility must declare exactly the supported 0.1 and 0.2 predecessors.");
}
for (const [index, entry] of catalog.compatibility.entries()) {
  exactKeys(
    entry,
    ["classification", "from_nkf_version", "migration_required", "summary"],
    `Recommended compatibility[${index}]`,
  );
}

const archiveSha256 = catalog.archive.sha256;
const assetName = `nourd-nkf-sha256-${archiveSha256}.tar`;
const tag = `release-sha256-${archiveSha256}`;
if (
  catalog.contract !== "nkf.recommended-release" ||
  catalog.nkf_version !== "0.2" ||
  catalog.state !== "recommended" ||
  catalog.channel !== "internal-private-github-prerelease" ||
  JSON.stringify(catalog.compatibility) !==
    JSON.stringify([
      {
        from_nkf_version: "0.1",
        classification: "breaking",
        migration_required: true,
        summary:
          "NKF 0.1 consumers require the governed 0.2 migration and explicit Human Product Owner approval before mutation.",
      },
      {
        from_nkf_version: "0.2",
        classification: "non-breaking",
        migration_required: false,
        summary:
          "NKF 0.2 consumers can refresh their pinned release and host integration without semantic migration.",
      },
    ]) ||
  !/^[0-9a-f]{64}$/.test(archiveSha256 ?? "") ||
  catalog.archive.asset_name !== assetName ||
  catalog.archive.tag !== tag ||
  !Number.isSafeInteger(catalog.archive.size) ||
  catalog.archive.size <= 0 ||
  catalog.archive.url !==
    `https://github.com/kaveh6202/Nourd.NKF/releases/download/${tag}/${assetName}` ||
  !/^[0-9a-f]{40}$/.test(catalog.source_commit ?? "") ||
  catalog.checker_sha256 !== CHECKER_CONFIRMATION.checkerSha256 ||
  catalog.authority.markdown_sha256 !==
    ACCEPTED_ARTIFACT_DIGESTS["knowledge/specifications/nkf-0.2.md"] ||
  catalog.authority.executable_sha256 !==
    ACCEPTED_ARTIFACT_DIGESTS["contracts/nkf/0.2/nkf.yaml"] ||
  catalog.release.url !==
    `https://github.com/kaveh6202/Nourd.NKF/releases/tag/${tag}` ||
  !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(
    catalog.release.published_at ?? "",
  ) ||
  catalog.release.prerelease !== true ||
  catalog.release.visibility !== "private" ||
  JSON.stringify(catalog.supported_root_profiles) !==
    JSON.stringify(["nkf.profile.product", "nkf.profile.technology"])
) {
  fail("The recommended release catalog is invalid or inconsistent.");
}
const adopterSha256 = sha256(
  await readFile(path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs")),
);
if (catalog.adopter_sha256 !== adopterSha256) {
  fail("The recommended release binds a different adopter build.");
}
process.stdout.write(
  `${JSON.stringify({
    contract: "nkf.recommended-release-verification",
    status: "passed",
    archive_sha256: archiveSha256,
    source_commit: catalog.source_commit,
    checker_sha256: catalog.checker_sha256,
    adopter_sha256: adopterSha256,
  })}\n`,
);
