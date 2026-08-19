import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import {
  parseReleaseSet,
  releaseSetPathForVersion,
} from "./release-set.mjs";
import {
  FIXTURE_FILES,
  HOST_ADAPTER_FILES,
  PUBLIC_DOCUMENTATION_FILES,
} from "./set-files.mjs";

export {
  FIXTURE_FILES,
  HOST_ADAPTER_FILES,
  PUBLIC_DOCUMENTATION_FILES,
} from "./set-files.mjs";

export const REPOSITORY =
  "https://github.com/NourdApS/Nourd.NKF.git";
export const LEGACY_REPOSITORY =
  "https://github.com/kaveh6202/Nourd.NKF.git";
export const ARCHIVE_ROOT = "nourd-nkf";
const NKF_0_6_THIRD_PARTY_NOTICES_SHA256 =
  "913a3f093c2bd95aabc124ad20b1e9c113d6f341d6458e7b591615cc33bfffea";
const AUTHORITY_PATHS = Object.freeze({
  "0.5": {
    markdown: "knowledge/specifications/nkf-0.5-revision-2.md",
    executable: "contracts/nkf/0.5/revision-2/nkf.yaml",
  },
  "0.6": {
    markdown: "knowledge/specifications/nkf-0.6-revision-3.md",
    executable: "contracts/nkf/0.6/revision-3/nkf.yaml",
  },
  "0.7": {
    markdown: "knowledge/specifications/nkf-0.7.md",
    executable: "contracts/nkf/0.7/nkf.yaml",
  },
});
const LEGACY_0_1_ENTRIES = Object.freeze([
  { path: "contracts/nkf/0.1/nkf.yaml", mode: 0o644 },
  { path: "contracts/nkf/0.1/schemas/bundle.schema.json", mode: 0o644 },
  { path: "contracts/nkf/0.1/schemas/record.schema.json", mode: 0o644 },
  { path: "contracts/nkf/0.1/schemas/release-manifest.schema.json", mode: 0o644 },
  { path: "contracts/nkf/0.1/schemas/validation-result.schema.json", mode: 0o644 },
  { path: "dist/nourd-nkf-checker.mjs", mode: 0o755 },
  { path: "knowledge/specifications/nkf-0.1.md", mode: 0o644 },
  { path: "release-manifest.json", mode: 0o644 },
]);

export const RELEASE_ENTRIES = Object.freeze([
  { path: "contracts/nkf/0.2/nkf.yaml", mode: 0o644 },
  {
    path: "contracts/nkf/0.2/schemas/bundle.schema.json",
    mode: 0o644,
  },
  {
    path: "contracts/nkf/0.2/schemas/record.schema.json",
    mode: 0o644,
  },
  {
    path: "contracts/nkf/0.2/schemas/release-manifest.schema.json",
    mode: 0o644,
  },
  {
    path: "contracts/nkf/0.2/schemas/validation-result.schema.json",
    mode: 0o644,
  },
  { path: "dist/nourd-nkf-checker.mjs", mode: 0o755 },
  { path: "knowledge/specifications/nkf-0.2.md", mode: 0o644 },
  { path: "integrations/ai/nkf-authoring-protocol.md", mode: 0o644 },
  { path: "integrations/onboarding/nkf-onboarding-protocol.md", mode: 0o644 },
  { path: "integrations/release/nkf-release-protocol.md", mode: 0o644 },
  { path: "integrations/adoption/nkf-adoption-protocol.md", mode: 0o644 },
  { path: ".agents/skills/nkf-authoring/SKILL.md", mode: 0o644 },
  { path: ".claude/skills/nkf-authoring/SKILL.md", mode: 0o644 },
  { path: ".agents/skills/nkf-onboarding/SKILL.md", mode: 0o644 },
  { path: ".claude/skills/nkf-onboarding/SKILL.md", mode: 0o644 },
  { path: "dist/nourd-nkf-adopt.mjs", mode: 0o644 },
  ...HOST_ADAPTER_FILES.map((artifactPath) => ({
    path: artifactPath,
    mode: 0o644,
  })),
  ...FIXTURE_FILES.map((artifactPath) => ({
    path: artifactPath,
    mode: 0o644,
  })),
  ...PUBLIC_DOCUMENTATION_FILES.map((artifactPath) => ({
    path: `public-docs/${artifactPath}`,
    mode: 0o644,
  })),
  { path: "release-manifest.json", mode: 0o644 },
]);

const SCHEMA_BINDINGS = Object.freeze([
  {
    identity: "urn:nkf:0.2:schema:bundle",
    path: "contracts/nkf/0.2/schemas/bundle.schema.json",
  },
  {
    identity: "urn:nkf:0.2:schema:record",
    path: "contracts/nkf/0.2/schemas/record.schema.json",
  },
  {
    identity: "urn:nkf:0.2:schema:release-manifest",
    path: "contracts/nkf/0.2/schemas/release-manifest.schema.json",
  },
  {
    identity: "urn:nkf:0.2:schema:validation-result",
    path: "contracts/nkf/0.2/schemas/validation-result.schema.json",
  },
]);

function fail(message) {
  throw new Error(message);
}

function usesReleaseSet(nkfVersion) {
  return ["0.3", "0.4", "0.5", "0.6", "0.7", "0.71", "0.8"].includes(nkfVersion);
}

function schemaBindings(nkfVersion) {
  if (["0.5", "0.6", "0.7", "0.71", "0.8"].includes(nkfVersion)) {
    return [
      "bundle",
      "record",
      "graph-baseline",
      "freshness-receipt",
      "freshness-policy",
      "release-manifest",
      "validation-result",
    ].map((name) => ({
      identity: `urn:nkf:${nkfVersion}:schema:${name}`,
      path: `contracts/nkf/${nkfVersion}/schemas/${name}.schema.json`,
    }));
  }
  return SCHEMA_BINDINGS.map((schema) => ({
    identity: schema.identity.replace(":0.2:", `:${nkfVersion}:`),
    path: schema.path.replace("contracts/nkf/0.2/", `contracts/nkf/${nkfVersion}/`),
  }));
}

export function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function digest(bytes) {
  return {
    algorithm: "sha-256",
    value: sha256(bytes),
  };
}

function requireBuffer(entries, artifactPath) {
  const value = entries.get(artifactPath);
  if (!Buffer.isBuffer(value)) {
    fail(`Required release artifact is unavailable: ${artifactPath}`);
  }
  return value;
}

function bundledDependencyNames(bytes, label) {
  const source = Buffer.from(bytes).toString("utf8");
  if (!Buffer.from(source, "utf8").equals(Buffer.from(bytes))) {
    fail(`${label} is not valid UTF-8 for third-party notice verification.`);
  }
  const names = [...source.matchAll(/^\/\/ node_modules\/((?:@[^/]+\/)?[^/\n]+)\//gmu)]
    .map((match) => match[1]);
  return [...new Set(names)].sort((left, right) => left.localeCompare(right, "en"));
}

export function verifyThirdPartyNoticeCoverage(checkerBytes, adopterBytes, noticeBytes) {
  const checkerPackages = bundledDependencyNames(checkerBytes, "The release checker");
  const adopterPackages = bundledDependencyNames(adopterBytes, "The release adopter");
  if (checkerPackages.length !== 10 || adopterPackages.length !== 9) {
    fail(`Unexpected NKF 0.6 bundled dependency graph sizes: checker=${checkerPackages.length}, adopter=${adopterPackages.length}.`);
  }
  const notice = Buffer.from(noticeBytes).toString("utf8");
  if (!Buffer.from(notice, "utf8").equals(Buffer.from(noticeBytes))) {
    fail("THIRD_PARTY_NOTICES.md is not valid UTF-8.");
  }
  const declared = [...notice.matchAll(/^## `([^`]+)` ([^\n]+)$/gmu)].map((match) => match[1]);
  if (new Set(declared).size !== declared.length) {
    fail("THIRD_PARTY_NOTICES.md contains duplicate package sections.");
  }
  const expected = [...new Set([...checkerPackages, ...adopterPackages])]
    .sort((left, right) => left.localeCompare(right, "en"));
  const observed = [...declared].sort((left, right) => left.localeCompare(right, "en"));
  if (JSON.stringify(observed) !== JSON.stringify(expected)) {
    fail(`Third-party notice coverage differs from the exact bundled dependency graph: expected ${expected.join(", ")}; observed ${observed.join(", ")}.`);
  }
  if (sha256(noticeBytes) !== NKF_0_6_THIRD_PARTY_NOTICES_SHA256) {
    fail("THIRD_PARTY_NOTICES.md differs from the exact reviewed NKF 0.6 license, copyright, attribution, and disclaimer text.");
  }
  return { checker_packages: checkerPackages, adopter_packages: adopterPackages, noticed_packages: observed };
}

export function constructReleaseManifest({
  releaseCommit,
  checkerConfirmation,
  entries,
  nkfVersion = "0.2",
  releaseSet,
}) {
  if (!/^[0-9a-f]{40}$/.test(releaseCommit)) {
    fail("Release commit must be 40 lowercase hexadecimal characters.");
  }
  const authorityPaths = AUTHORITY_PATHS[nkfVersion] ?? {
    markdown: `knowledge/specifications/nkf-${nkfVersion}.md`,
    executable: `contracts/nkf/${nkfVersion}/nkf.yaml`,
  };
  const specificationPath = authorityPaths.markdown;
  const repository = ["0.6", "0.7", "0.71", "0.8"].includes(nkfVersion) ? REPOSITORY : LEGACY_REPOSITORY;
  const checker = requireBuffer(entries, "dist/nourd-nkf-checker.mjs");
  const markdown = requireBuffer(entries, specificationPath);
  const executable = requireBuffer(entries, authorityPaths.executable);
  const common = {
    contract: "nkf.release-manifest",
    nkf_version: nkfVersion,
    source: {
      repository,
      release_commit: releaseCommit,
    },
    checker: {
      identity: "nourd-nkf-checker",
      path: "dist/nourd-nkf-checker.mjs",
      digest: digest(checker),
      runtime: {
        name: "node",
        minimum_major: 22,
      },
    },
    authority: {
      precedence: "normative-markdown",
      markdown: {
        path: specificationPath,
        digest: digest(markdown),
      },
      executable: {
        path: authorityPaths.executable,
        digest: digest(executable),
      },
    },
  };
  const schemas = schemaBindings(nkfVersion).map((schema) => ({
    identity: schema.identity,
    path: schema.path,
    digest: digest(requireBuffer(entries, schema.path)),
  }));
  const manifest = ["0.5", "0.6", "0.7", "0.71", "0.8"].includes(nkfVersion)
    ? {
        ...common,
        freshness_policy: {
          identity: `nkf.freshness-policy.${nkfVersion}`,
          path: `contracts/nkf/${nkfVersion}/freshness-policy.yaml`,
          digest: digest(requireBuffer(entries, `contracts/nkf/${nkfVersion}/freshness-policy.yaml`)),
        },
        ...(["0.71", "0.8"].includes(nkfVersion)
          ? {
              version_delta: {
                contract: "nkf.version-delta",
                path: `contracts/nkf/${nkfVersion}/version-delta.yaml`,
                digest: digest(requireBuffer(entries, `contracts/nkf/${nkfVersion}/version-delta.yaml`)),
              },
            }
          : {}),
        schemas,
        ...(["0.6", "0.7", "0.71", "0.8"].includes(nkfVersion)
          ? {
              licensing: {
                spdx: "Apache-2.0",
                license: { path: "LICENSE", digest: digest(requireBuffer(entries, "LICENSE")) },
                notice: { path: "NOTICE", digest: digest(requireBuffer(entries, "NOTICE")) },
                third_party_notices: {
                  path: "THIRD_PARTY_NOTICES.md",
                  digest: digest(requireBuffer(entries, "THIRD_PARTY_NOTICES.md")),
                },
              },
            }
          : {}),
      }
    : { ...common, schemas };
  if (["0.1", "0.2"].includes(nkfVersion)) {
    manifest.source.checker_confirmation = {
      decision: checkerConfirmation.decision,
      path: checkerConfirmation.path,
      digest: digest(checkerConfirmation.bytes),
      checker_source_commit: checkerConfirmation.checkerSourceCommit,
    };
  } else if (usesReleaseSet(nkfVersion)) {
    if (releaseSet === undefined) {
      fail(`NKF ${nkfVersion} manifest construction requires the release set.`);
    }
    manifest.files = releaseSet.members
      .filter((member) => member.path !== "release-manifest.json")
      .map((member) => ({
        path: member.path,
        mode: member.mode,
        digest: digest(requireBuffer(entries, member.path)),
      }));
  } else {
    fail("Unsupported manifest version.");
  }
  return manifest;
}

export function serializeReleaseManifest(manifest) {
  return Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

class StrictJsonParser {
  constructor(source) {
    this.source = source;
    this.index = 0;
  }

  parse() {
    this.whitespace();
    const value = this.value();
    this.whitespace();
    if (this.index !== this.source.length) {
      fail(`Unexpected JSON content at byte ${this.index}.`);
    }
    return value;
  }

  whitespace() {
    while (
      this.index < this.source.length &&
      " \t\r\n".includes(this.source[this.index])
    ) {
      this.index += 1;
    }
  }

  value() {
    const character = this.source[this.index];
    if (character === "{") return this.object();
    if (character === "[") return this.array();
    if (character === "\"") return this.string();
    if (this.source.startsWith("true", this.index)) {
      this.index += 4;
      return true;
    }
    if (this.source.startsWith("false", this.index)) {
      this.index += 5;
      return false;
    }
    if (this.source.startsWith("null", this.index)) {
      this.index += 4;
      return null;
    }
    return this.number();
  }

  object() {
    this.index += 1;
    const result = {};
    const keys = new Set();
    this.whitespace();
    if (this.source[this.index] === "}") {
      this.index += 1;
      return result;
    }
    while (true) {
      if (this.source[this.index] !== "\"") {
        fail(`Expected a JSON object key at byte ${this.index}.`);
      }
      const key = this.string();
      if (keys.has(key)) {
        fail(`Duplicate JSON object key: ${key}`);
      }
      keys.add(key);
      this.whitespace();
      if (this.source[this.index] !== ":") {
        fail(`Expected ':' after JSON key at byte ${this.index}.`);
      }
      this.index += 1;
      this.whitespace();
      result[key] = this.value();
      this.whitespace();
      if (this.source[this.index] === "}") {
        this.index += 1;
        return result;
      }
      if (this.source[this.index] !== ",") {
        fail(`Expected ',' in JSON object at byte ${this.index}.`);
      }
      this.index += 1;
      this.whitespace();
    }
  }

  array() {
    this.index += 1;
    const result = [];
    this.whitespace();
    if (this.source[this.index] === "]") {
      this.index += 1;
      return result;
    }
    while (true) {
      result.push(this.value());
      this.whitespace();
      if (this.source[this.index] === "]") {
        this.index += 1;
        return result;
      }
      if (this.source[this.index] !== ",") {
        fail(`Expected ',' in JSON array at byte ${this.index}.`);
      }
      this.index += 1;
      this.whitespace();
    }
  }

  string() {
    const start = this.index;
    this.index += 1;
    while (this.index < this.source.length) {
      const character = this.source[this.index];
      if (character === "\"") {
        this.index += 1;
        return JSON.parse(this.source.slice(start, this.index));
      }
      if (character === "\\") {
        this.index += 1;
        const escape = this.source[this.index];
        if (escape === "u") {
          const hex = this.source.slice(this.index + 1, this.index + 5);
          if (!/^[0-9a-fA-F]{4}$/.test(hex)) {
            fail(`Invalid JSON Unicode escape at byte ${this.index}.`);
          }
          this.index += 5;
          continue;
        }
        if (!"\"\\/bfnrt".includes(escape ?? "")) {
          fail(`Invalid JSON escape at byte ${this.index}.`);
        }
        this.index += 1;
        continue;
      }
      if ((character?.charCodeAt(0) ?? 0) < 0x20) {
        fail(`Unescaped JSON control character at byte ${this.index}.`);
      }
      this.index += 1;
    }
    fail("Unterminated JSON string.");
  }

  number() {
    const match = this.source
      .slice(this.index)
      .match(/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/);
    if (!match) {
      fail(`Expected a JSON value at byte ${this.index}.`);
    }
    this.index += match[0].length;
    const value = Number(match[0]);
    if (!Number.isFinite(value)) {
      fail("Non-finite JSON numbers are forbidden.");
    }
    return value;
  }
}

export function parseStrictJson(bytes) {
  const source = Buffer.from(bytes).toString("utf8");
  if (Buffer.from(source, "utf8").compare(Buffer.from(bytes)) !== 0) {
    fail("Release manifest is not valid UTF-8.");
  }
  if (source.charCodeAt(0) === 0xfeff) {
    fail("Release manifest must not contain a byte-order mark.");
  }
  return new StrictJsonParser(source).parse();
}

export function validateReleaseManifest(manifest, schemaBytes) {
  const AjvConstructor = Ajv2020;
  const ajv = new AjvConstructor({
    allErrors: true,
    strict: true,
    validateFormats: true,
  });
  addFormats(ajv);
  ajv.addKeyword({
    keyword: "x-nkf-source",
    schemaType: "object",
    valid: true,
  });
  const schema = parseStrictJson(schemaBytes);
  const validate = ajv.compile(schema);
  if (!validate(manifest)) {
    fail(`Release manifest is invalid: ${ajv.errorsText(validate.errors)}`);
  }
}

function ascii(value, length, label) {
  if (!/^[\x20-\x7e]*$/.test(value)) {
    fail(`${label} must contain ASCII bytes only.`);
  }
  const bytes = Buffer.from(value, "ascii");
  if (bytes.length > length) {
    fail(`${label} does not fit its USTAR field.`);
  }
  const field = Buffer.alloc(length);
  bytes.copy(field);
  return field;
}

function octal(value, length, checksum = false) {
  if (!Number.isSafeInteger(value) || value < 0) {
    fail("USTAR numeric values must be non-negative safe integers.");
  }
  const width = checksum ? length - 2 : length - 1;
  const digits = value.toString(8).padStart(width, "0");
  if (digits.length !== width) {
    fail("USTAR numeric value exceeds its field.");
  }
  return Buffer.from(
    checksum ? `${digits}\0 ` : `${digits}\0`,
    "ascii",
  );
}

function headerFor(name, mode, size) {
  const header = Buffer.alloc(512);
  ascii(name, 100, "USTAR path").copy(header, 0);
  octal(mode, 8).copy(header, 100);
  octal(0, 8).copy(header, 108);
  octal(0, 8).copy(header, 116);
  octal(size, 12).copy(header, 124);
  octal(0, 12).copy(header, 136);
  header.fill(0x20, 148, 156);
  header[156] = 0x30;
  Buffer.from([0x75, 0x73, 0x74, 0x61, 0x72, 0]).copy(header, 257);
  ascii("00", 2, "USTAR version").copy(header, 263);
  octal(0, 8).copy(header, 329);
  octal(0, 8).copy(header, 337);
  const sum = header.reduce((total, byte) => total + byte, 0);
  octal(sum, 8, true).copy(header, 148);
  return header;
}

function zeroPadding(length) {
  const remainder = length % 512;
  return Buffer.alloc(remainder === 0 ? 0 : 512 - remainder);
}

export function createUstar(entries, memberEntries = RELEASE_ENTRIES) {
  const parts = [];
  for (const expected of memberEntries) {
    const bytes = requireBuffer(entries, expected.path);
    const name = `${ARCHIVE_ROOT}/${expected.path}`;
    parts.push(headerFor(name, expected.mode, bytes.length));
    parts.push(bytes);
    parts.push(zeroPadding(bytes.length));
  }
  parts.push(Buffer.alloc(1024));
  return Buffer.concat(parts);
}

function requireZero(field, label) {
  if (field.some((byte) => byte !== 0)) {
    fail(`${label} must be zero-filled.`);
  }
}

function requireExact(actual, expected, label) {
  if (!actual.equals(expected)) {
    fail(`${label} is not in the required canonical USTAR encoding.`);
  }
}

function readName(field) {
  const nul = field.indexOf(0);
  const end = nul === -1 ? field.length : nul;
  if (nul !== -1) requireZero(field.subarray(nul), "USTAR path tail");
  const value = field.subarray(0, end).toString("ascii");
  if (!/^[\x20-\x7e]+$/.test(value)) {
    fail("USTAR paths must use printable ASCII bytes.");
  }
  return value;
}

function parseCanonicalOctal(field, label, checksum = false) {
  const terminal = checksum ? field.subarray(-2) : field.subarray(-1);
  requireExact(
    terminal,
    checksum ? Buffer.from([0, 0x20]) : Buffer.from([0]),
    `${label} terminator`,
  );
  const digitBytes = field.subarray(0, checksum ? -2 : -1);
  const digits = digitBytes.toString("ascii");
  if (!/^[0-7]+$/.test(digits)) {
    fail(`${label} must use ASCII-octal digits.`);
  }
  const value = Number.parseInt(digits, 8);
  requireExact(field, octal(value, field.length, checksum), label);
  return value;
}

function safeArchivePath(name) {
  if (
    name.startsWith("/") ||
    name.includes("\\") ||
    name.split("/").some((part) => part === "" || part === "." || part === "..")
  ) {
    fail(`Unsafe archive path: ${name}`);
  }
}

export function releaseEntriesForVersion(nkfVersion = "0.2", releaseSet = undefined) {
  if (nkfVersion === "0.2") return RELEASE_ENTRIES;
  if (nkfVersion === "0.1") return LEGACY_0_1_ENTRIES;
  if (usesReleaseSet(nkfVersion) && releaseSet !== undefined) {
    return releaseSet.members.map((member) => ({
      path: member.path,
      mode: Number.parseInt(member.mode, 8),
    }));
  }
  fail("Unsupported release entry version.");
}

function sniffArchiveVersion(archive) {
  const versions = new Set();
  const dataEnd = archive.length - 1024;
  let offset = 0;
  while (offset < dataEnd) {
    if (offset + 512 > dataEnd) fail("USTAR header exceeds the archive boundary.");
    const header = archive.subarray(offset, offset + 512);
    const name = readName(header.subarray(0, 100));
    const match = /^nourd-nkf\/contracts\/nkf\/(0\.[0-9]+)\//.exec(name);
    if (match !== null) versions.add(match[1]);
    const size = parseCanonicalOctal(header.subarray(124, 136), "USTAR file size");
    const next = offset + 512 + Math.ceil(size / 512) * 512;
    if (next <= offset || next > dataEnd) fail("USTAR entry exceeds the archive boundary.");
    offset = next;
  }
  if (offset !== dataEnd || versions.size !== 1) {
    fail("The archive does not carry exactly one discoverable NKF contract version.");
  }
  return [...versions][0];
}

export function inspectUstar(archiveBytes) {
  const archive = Buffer.from(archiveBytes);
  if (archive.length < 1024 || archive.length % 512 !== 0) {
    fail("USTAR archive length is invalid.");
  }
  const nkfVersion = sniffArchiveVersion(archive);
  const memberEntries = usesReleaseSet(nkfVersion)
    ? null
    : releaseEntriesForVersion(nkfVersion);
  const dataEnd = archive.length - 1024;
  requireZero(archive.subarray(dataEnd), "USTAR final blocks");
  const entries = new Map();
  const seenFolded = new Set();
  let offset = 0;
  let index = 0;
  const observedMembers = [];
  while (offset < dataEnd) {
    const expected = memberEntries?.[index];
    if (memberEntries !== null && !expected) fail("USTAR contains an unexpected extra entry.");
    const header = archive.subarray(offset, offset + 512);
    if (header.length !== 512 || header.every((byte) => byte === 0)) {
      fail("USTAR contains an early zero block.");
    }
    requireExact(
      header.subarray(257, 263),
      Buffer.from([0x75, 0x73, 0x74, 0x61, 0x72, 0]),
      "USTAR magic",
    );
    requireExact(
      header.subarray(263, 265),
      Buffer.from("00", "ascii"),
      "USTAR version",
    );
    requireExact(
      header.subarray(156, 157),
      Buffer.from("0", "ascii"),
      "USTAR type flag",
    );
    requireZero(header.subarray(157, 257), "USTAR link name");
    requireZero(header.subarray(265, 329), "USTAR user and group names");
    requireZero(header.subarray(345, 500), "USTAR prefix");
    requireZero(header.subarray(500, 512), "USTAR header padding");

    const name = readName(header.subarray(0, 100));
    safeArchivePath(name);
    const expectedName = expected === undefined ? null : `${ARCHIVE_ROOT}/${expected.path}`;
    if (expectedName !== null && name !== expectedName) {
      fail(`Unexpected or out-of-order archive path: ${name}`);
    }
    const relativeName = name.startsWith(`${ARCHIVE_ROOT}/`)
      ? name.slice(ARCHIVE_ROOT.length + 1)
      : "";
    safeArchivePath(relativeName);
    if (entries.has(relativeName)) fail(`Duplicate archive path: ${name}`);
    const folded = name.toLowerCase();
    if (seenFolded.has(folded)) fail(`Case-colliding archive path: ${name}`);
    seenFolded.add(folded);

    const mode = parseCanonicalOctal(header.subarray(100, 108), "USTAR mode");
    if (expected !== undefined && mode !== expected.mode) fail(`Incorrect archive mode for ${name}.`);
    if (
      expected === undefined &&
      mode !== (relativeName === "dist/nourd-nkf-checker.mjs" ? 0o755 : 0o644)
    ) {
      fail(`Incorrect archive mode for ${name}.`);
    }
    if (parseCanonicalOctal(header.subarray(108, 116), "USTAR uid") !== 0) {
      fail("USTAR uid must be zero.");
    }
    if (parseCanonicalOctal(header.subarray(116, 124), "USTAR gid") !== 0) {
      fail("USTAR gid must be zero.");
    }
    const size = parseCanonicalOctal(
      header.subarray(124, 136),
      "USTAR size",
    );
    if (parseCanonicalOctal(header.subarray(136, 148), "USTAR mtime") !== 0) {
      fail("USTAR mtime must be zero.");
    }
    if (
      parseCanonicalOctal(header.subarray(329, 337), "USTAR device major") !==
        0 ||
      parseCanonicalOctal(header.subarray(337, 345), "USTAR device minor") !== 0
    ) {
      fail("USTAR device values must be zero.");
    }
    const storedChecksum = parseCanonicalOctal(
      header.subarray(148, 156),
      "USTAR checksum",
      true,
    );
    const checksumHeader = Buffer.from(header);
    checksumHeader.fill(0x20, 148, 156);
    const actualChecksum = checksumHeader.reduce(
      (total, byte) => total + byte,
      0,
    );
    if (storedChecksum !== actualChecksum) {
      fail(`USTAR checksum mismatch for ${name}.`);
    }

    const contentStart = offset + 512;
    const contentEnd = contentStart + size;
    const nextOffset = contentStart + Math.ceil(size / 512) * 512;
    if (contentEnd > dataEnd || nextOffset > dataEnd) {
      fail(`USTAR entry exceeds the archive boundary: ${name}`);
    }
    requireZero(
      archive.subarray(contentEnd, nextOffset),
      `USTAR content padding for ${name}`,
    );
    entries.set(relativeName, Buffer.from(archive.subarray(contentStart, contentEnd)));
    observedMembers.push({ path: relativeName, mode });
    offset = nextOffset;
    index += 1;
  }
  if (offset !== dataEnd || (memberEntries !== null && index !== memberEntries.length)) {
    fail("USTAR archive is missing one or more required files.");
  }
  if (usesReleaseSet(nkfVersion)) {
    const releaseSet = parseReleaseSet(
      requireBuffer(entries, releaseSetPathForVersion(nkfVersion)),
    );
    const expectedEntries = releaseEntriesForVersion(nkfVersion, releaseSet);
    if (JSON.stringify(observedMembers) !== JSON.stringify(expectedEntries)) {
      fail("USTAR membership, order, or modes differ from the embedded release set.");
    }
  }
  return entries;
}

function requireManifestBootstrap(manifest, nkfVersion = "0.2") {
  if (
    manifest?.contract !== "nkf.release-manifest" ||
    manifest?.nkf_version !== nkfVersion
  ) {
    fail("Release manifest bootstrap contract or NKF version is invalid.");
  }
  const schemaIndex = ["0.5", "0.6", "0.7", "0.71", "0.8"].includes(nkfVersion) ? 5 : 2;
  const schema = manifest?.schemas?.[schemaIndex];
  if (
    schema?.identity !== `urn:nkf:${nkfVersion}:schema:release-manifest` ||
    schema?.path !==
      `contracts/nkf/${nkfVersion}/schemas/release-manifest.schema.json` ||
    schema?.digest?.algorithm !== "sha-256" ||
    !/^[0-9a-f]{64}$/.test(schema?.digest?.value ?? "")
  ) {
    fail("Release manifest bootstrap schema entry is invalid.");
  }
  if (["0.1", "0.2"].includes(nkfVersion)) {
    requireDecisionPathBinding(manifest.source?.checker_confirmation);
  } else if (
    !usesReleaseSet(nkfVersion) ||
    manifest.source?.checker_confirmation !== undefined
  ) {
    fail("Release manifest source bootstrap fields are invalid for this version.");
  }
}

function requireDecisionPathBinding(confirmation) {
  if (
    !/^ADR-[0-9]{4}$/.test(confirmation?.decision ?? "") ||
    !confirmation?.path?.startsWith(
      `knowledge/decisions/${confirmation.decision.slice(4)}-`,
    )
  ) {
    fail("Checker-confirmation Decision ID and path prefix do not match.");
  }
}

function verifyArtifact(entries, artifact) {
  if (artifact?.digest?.algorithm !== "sha-256") {
    fail(`Unsupported artifact digest for ${artifact?.path ?? "unknown"}.`);
  }
  const bytes = requireBuffer(entries, artifact.path);
  if (sha256(bytes) !== artifact.digest.value) {
    fail(`Release artifact digest mismatch: ${artifact.path}`);
  }
}

export function verifySourceProvenance(sourceRoot, manifest) {
  const git = (...argumentsValue) =>
    execFileSync("git", ["-C", sourceRoot, ...argumentsValue], {
      encoding: "utf8",
    }).trim();
  const observedRemote = git("remote", "get-url", "origin");
  const acceptedRepositoryTransport =
    observedRemote === manifest.source.repository ||
    (manifest.source.repository === REPOSITORY &&
      observedRemote === LEGACY_REPOSITORY);
  if (!acceptedRepositoryTransport) {
    fail("Source repository remote does not match the release manifest.");
  }
  const releaseCommit = git("rev-parse", `${manifest.source.release_commit}^{commit}`);
  if (releaseCommit !== manifest.source.release_commit) {
    fail("Release commit is unavailable from the source repository.");
  }
  if (usesReleaseSet(manifest.nkf_version)) return;
  const confirmation = manifest.source.checker_confirmation;
  requireDecisionPathBinding(confirmation);
  const decisionBytes = Buffer.from(
    execFileSync(
      "git",
      ["-C", sourceRoot, "show", `${releaseCommit}:${confirmation.path}`],
    ),
  );
  if (sha256(decisionBytes) !== confirmation.digest.value) {
    fail("Checker-confirmation Decision digest does not match release source.");
  }
  const decision = decisionBytes.toString("utf8");
  if (
    !decision.includes(confirmation.checker_source_commit) ||
    !decision.includes(manifest.checker.digest.value)
  ) {
    fail("Checker-confirmation Decision does not bind the source and checker.");
  }
  const checkerCommit = git(
    "rev-parse",
    `${confirmation.checker_source_commit}^{commit}`,
  );
  if (checkerCommit !== confirmation.checker_source_commit) {
    fail("Confirmed checker source commit is unavailable.");
  }
}

function verifyManifestFiles(entries, manifest, releaseSet) {
  if (!Array.isArray(manifest.files)) {
    fail(`NKF ${manifest.nkf_version} manifest files must be an array.`);
  }
  const expected = releaseSet.members.filter(
    (member) => member.path !== "release-manifest.json",
  );
  if (manifest.files.length !== expected.length) {
    fail("Release manifest files differ from release-set membership.");
  }
  for (const [index, expectedMember] of expected.entries()) {
    const artifact = manifest.files[index];
    if (
      artifact === null ||
      typeof artifact !== "object" ||
      Array.isArray(artifact) ||
      JSON.stringify(Object.keys(artifact)) !== JSON.stringify(["path", "mode", "digest"]) ||
      artifact.path !== expectedMember.path ||
      artifact.mode !== expectedMember.mode
    ) {
      fail(`Release manifest file binding differs at index ${index}.`);
    }
    verifyArtifact(entries, artifact);
  }
}

export function verifyReleaseArchive(
  archiveBytes,
  expectedArchiveSha256,
  { sourceRoot } = {},
) {
  if (!/^[0-9a-f]{64}$/.test(expectedArchiveSha256)) {
    fail("Expected archive digest must be lowercase SHA-256.");
  }
  const archiveDigest = sha256(archiveBytes);
  if (archiveDigest !== expectedArchiveSha256) {
    fail("Release archive digest does not match the independent consumer pin.");
  }
  const entries = inspectUstar(archiveBytes);
  const archiveVersion = sniffArchiveVersion(Buffer.from(archiveBytes));
  const manifestBytes = requireBuffer(entries, "release-manifest.json");
  const manifest = parseStrictJson(manifestBytes);
  requireManifestBootstrap(manifest, archiveVersion);
  if (!manifestBytes.equals(serializeReleaseManifest(manifest))) {
    fail("Release manifest bytes are not in canonical contract order and format.");
  }
  const manifestSchema = manifest.schemas.find(
    (schema) => schema.identity === `urn:nkf:${archiveVersion}:schema:release-manifest`,
  );
  if (manifestSchema === undefined) fail("Release manifest omits its bootstrap schema binding.");
  verifyArtifact(entries, manifestSchema);
  validateReleaseManifest(manifest, requireBuffer(entries, manifestSchema.path));
  if (["0.6", "0.7", "0.71", "0.8"].includes(archiveVersion)) {
    if (
      manifest.licensing?.spdx !== "Apache-2.0" ||
      sha256(requireBuffer(entries, "LICENSE")) !==
        "cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30" ||
      sha256(requireBuffer(entries, "NOTICE")) !==
        "48023a31a53e68e9c51358d5ee313dc5f705df1caf4f24f2f2818b372bf5a4e6"
    ) {
      fail(`The NKF ${archiveVersion} release does not carry the exact Apache-2.0 license and informational NOTICE.`);
    }
  }

  const releaseSet = usesReleaseSet(archiveVersion)
    ? parseReleaseSet(
        requireBuffer(entries, releaseSetPathForVersion(archiveVersion)),
      )
    : undefined;
  if (releaseSet !== undefined) verifyManifestFiles(entries, manifest, releaseSet);

  const artifacts = [
    manifest.checker,
    manifest.authority.markdown,
    manifest.authority.executable,
    ...(manifest.freshness_policy === undefined ? [] : [manifest.freshness_policy]),
    ...(manifest.version_delta === undefined ? [] : [manifest.version_delta]),
    ...manifest.schemas,
    ...(manifest.licensing === undefined
      ? []
      : [manifest.licensing.license, manifest.licensing.notice, manifest.licensing.third_party_notices]),
  ];
  for (const artifact of artifacts) verifyArtifact(entries, artifact);
  if (["0.6", "0.7", "0.71", "0.8"].includes(archiveVersion)) {
    verifyThirdPartyNoticeCoverage(
      requireBuffer(entries, "dist/nourd-nkf-checker.mjs"),
      requireBuffer(entries, "dist/nourd-nkf-adopt.mjs"),
      requireBuffer(entries, "THIRD_PARTY_NOTICES.md"),
    );
  }
  if (sourceRoot !== undefined) verifySourceProvenance(sourceRoot, manifest);

  return {
    archive_sha256: archiveDigest,
    asset_name: `nourd-nkf-sha256-${archiveDigest}.tar`,
    tag: `release-sha256-${archiveDigest}`,
    release_commit: manifest.source.release_commit,
    checker_sha256: manifest.checker.digest.value,
    manifest,
    entries,
    release_entries: releaseSet === undefined
      ? releaseEntriesForVersion(archiveVersion)
      : releaseEntriesForVersion(archiveVersion, releaseSet),
  };
}

export async function invokeVerifiedChecker(
  verification,
  checkerArguments = ["--help"],
) {
  const currentNodeMajor = Number.parseInt(
    process.versions.node.split(".")[0] ?? "0",
    10,
  );
  if (
    verification.manifest.checker.runtime.name !== "node" ||
    currentNodeMajor < verification.manifest.checker.runtime.minimum_major
  ) {
    fail("The verified checker runtime requirement is not satisfied.");
  }
  const temporary = await mkdtemp(path.join(os.tmpdir(), "nourd-nkf-release-"));
  try {
    const root = path.join(temporary, ARCHIVE_ROOT);
    const memberEntries = verification.release_entries;
    for (const expected of memberEntries) {
      const target = path.join(root, expected.path);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, requireBuffer(verification.entries, expected.path));
      await chmod(target, expected.mode);
    }
    const checker = path.join(root, "dist/nourd-nkf-checker.mjs");
    const result = spawnSync(process.execPath, [checker, ...checkerArguments], {
      encoding: "utf8",
    });
    if (result.status !== 0) {
      fail(
        `Verified checker invocation failed: ${result.stderr || result.stdout}`,
      );
    }
    return {
      stdout: result.stdout,
      stderr: result.stderr,
      status: result.status,
    };
  } finally {
    await rm(temporary, { force: true, recursive: true });
  }
}

export async function readReleaseEntries(repositoryRoot, memberEntries = RELEASE_ENTRIES) {
  const entries = new Map();
  for (const expected of memberEntries) {
    if (expected.path === "release-manifest.json") continue;
    entries.set(
      expected.path,
      await readFile(path.join(repositoryRoot, expected.path)),
    );
  }
  return entries;
}
