import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PRE_STABLE_PUBLICATION,
  RECOMMENDED_RELEASE_BINDINGS,
  RELEASE_REPOSITORY,
} from "./release/config.mjs";
import { parseStrictJson } from "./release/core.mjs";

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

// Every expectation below derives from the accepted per-version binding
// registry; an unregistered version fails closed instead of guessing.
const binding = RECOMMENDED_RELEASE_BINDINGS[catalog.nkf_version];
if (binding === undefined) {
  fail(
    `No accepted recommended-release binding is registered for NKF version ${JSON.stringify(catalog.nkf_version)}.`,
  );
}

const archiveSha256 = catalog.archive.sha256;
const assetName = `nourd-nkf-sha256-${archiveSha256}.tar`;
const tag = `release-sha256-${archiveSha256}`;
if (
  catalog.contract !== "nkf.recommended-release" ||
  catalog.state !== "recommended" ||
  catalog.channel !== PRE_STABLE_PUBLICATION.channel ||
  JSON.stringify(catalog.compatibility) !==
    JSON.stringify(binding.compatibility) ||
  !/^[0-9a-f]{64}$/.test(archiveSha256 ?? "") ||
  archiveSha256 !== binding.archiveSha256 ||
  catalog.archive.asset_name !== assetName ||
  catalog.archive.tag !== tag ||
  !Number.isSafeInteger(catalog.archive.size) ||
  catalog.archive.size <= 0 ||
  catalog.archive.url !==
    `https://github.com/${RELEASE_REPOSITORY}/releases/download/${tag}/${assetName}` ||
  catalog.source_commit !== binding.sourceCommit ||
  catalog.checker_sha256 !== binding.checkerSha256 ||
  catalog.authority.markdown_sha256 !== binding.authorityMarkdownSha256 ||
  catalog.authority.executable_sha256 !== binding.authorityExecutableSha256 ||
  catalog.release.url !==
    `https://github.com/${RELEASE_REPOSITORY}/releases/tag/${tag}` ||
  !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(
    catalog.release.published_at ?? "",
  ) ||
  catalog.release.prerelease !== PRE_STABLE_PUBLICATION.prerelease ||
  catalog.release.visibility !== PRE_STABLE_PUBLICATION.visibility ||
  JSON.stringify(catalog.supported_root_profiles) !==
    JSON.stringify(["nkf.profile.product", "nkf.profile.technology"])
) {
  fail("The recommended release catalog is invalid or inconsistent.");
}
// The recommendation binds the published adopter; the installed pinned copy
// is its local artifact. The working-tree dist may legitimately hold a
// successor build during successor development, so the pin is the anchor.
const adopterSha256 = sha256(
  await readFile(path.join(repositoryRoot, ".nourd/tools/nkf/nourd-nkf-adopt.mjs")),
);
if (
  catalog.adopter_sha256 !== binding.adopterSha256 ||
  catalog.adopter_sha256 !== adopterSha256
) {
  fail("The recommended release binds a different adopter build.");
}
process.stdout.write(
  `${JSON.stringify({
    contract: "nkf.recommended-release-verification",
    status: "passed",
    nkf_version: catalog.nkf_version,
    archive_sha256: archiveSha256,
    source_commit: catalog.source_commit,
    checker_sha256: catalog.checker_sha256,
    adopter_sha256: adopterSha256,
  })}\n`,
);
