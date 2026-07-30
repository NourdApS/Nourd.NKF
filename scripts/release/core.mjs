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

export const REPOSITORY =
  "https://github.com/kaveh6202/Nourd.NKF.git";
export const ARCHIVE_ROOT = "nourd-nkf";
export const RELEASE_ENTRIES = Object.freeze([
  { path: "contracts/nkf/0.1/nkf.yaml", mode: 0o644 },
  {
    path: "contracts/nkf/0.1/schemas/bundle.schema.json",
    mode: 0o644,
  },
  {
    path: "contracts/nkf/0.1/schemas/record.schema.json",
    mode: 0o644,
  },
  {
    path: "contracts/nkf/0.1/schemas/release-manifest.schema.json",
    mode: 0o644,
  },
  {
    path: "contracts/nkf/0.1/schemas/validation-result.schema.json",
    mode: 0o644,
  },
  { path: "dist/nourd-nkf-checker.mjs", mode: 0o755 },
  { path: "knowledge/specifications/nkf-0.1.md", mode: 0o644 },
  { path: "release-manifest.json", mode: 0o644 },
]);

const SCHEMA_BINDINGS = Object.freeze([
  {
    identity: "urn:nkf:0.1:schema:bundle",
    path: "contracts/nkf/0.1/schemas/bundle.schema.json",
  },
  {
    identity: "urn:nkf:0.1:schema:record",
    path: "contracts/nkf/0.1/schemas/record.schema.json",
  },
  {
    identity: "urn:nkf:0.1:schema:release-manifest",
    path: "contracts/nkf/0.1/schemas/release-manifest.schema.json",
  },
  {
    identity: "urn:nkf:0.1:schema:validation-result",
    path: "contracts/nkf/0.1/schemas/validation-result.schema.json",
  },
]);

function fail(message) {
  throw new Error(message);
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

export function constructReleaseManifest({
  releaseCommit,
  checkerConfirmation,
  entries,
}) {
  if (!/^[0-9a-f]{40}$/.test(releaseCommit)) {
    fail("Release commit must be 40 lowercase hexadecimal characters.");
  }
  const checker = requireBuffer(entries, "dist/nourd-nkf-checker.mjs");
  const markdown = requireBuffer(
    entries,
    "knowledge/specifications/nkf-0.1.md",
  );
  const executable = requireBuffer(entries, "contracts/nkf/0.1/nkf.yaml");
  return {
    contract: "nkf.release-manifest",
    nkf_version: "0.1",
    source: {
      repository: REPOSITORY,
      release_commit: releaseCommit,
      checker_confirmation: {
        decision: checkerConfirmation.decision,
        path: checkerConfirmation.path,
        digest: digest(checkerConfirmation.bytes),
        checker_source_commit: checkerConfirmation.checkerSourceCommit,
      },
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
        path: "knowledge/specifications/nkf-0.1.md",
        digest: digest(markdown),
      },
      executable: {
        path: "contracts/nkf/0.1/nkf.yaml",
        digest: digest(executable),
      },
    },
    schemas: SCHEMA_BINDINGS.map((schema) => ({
      identity: schema.identity,
      path: schema.path,
      digest: digest(requireBuffer(entries, schema.path)),
    })),
  };
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

export function createUstar(entries) {
  const parts = [];
  for (const expected of RELEASE_ENTRIES) {
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

export function inspectUstar(archiveBytes) {
  const archive = Buffer.from(archiveBytes);
  if (archive.length < 1024 || archive.length % 512 !== 0) {
    fail("USTAR archive length is invalid.");
  }
  const dataEnd = archive.length - 1024;
  requireZero(archive.subarray(dataEnd), "USTAR final blocks");
  const entries = new Map();
  const seenFolded = new Set();
  let offset = 0;
  let index = 0;
  while (offset < dataEnd) {
    const expected = RELEASE_ENTRIES[index];
    if (!expected) fail("USTAR contains an unexpected ninth entry.");
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
    const expectedName = `${ARCHIVE_ROOT}/${expected.path}`;
    if (name !== expectedName) {
      fail(`Unexpected or out-of-order archive path: ${name}`);
    }
    if (entries.has(expected.path)) fail(`Duplicate archive path: ${name}`);
    const folded = name.toLowerCase();
    if (seenFolded.has(folded)) fail(`Case-colliding archive path: ${name}`);
    seenFolded.add(folded);

    const mode = parseCanonicalOctal(header.subarray(100, 108), "USTAR mode");
    if (mode !== expected.mode) fail(`Incorrect archive mode for ${name}.`);
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
    entries.set(expected.path, Buffer.from(archive.subarray(contentStart, contentEnd)));
    offset = nextOffset;
    index += 1;
  }
  if (offset !== dataEnd || index !== RELEASE_ENTRIES.length) {
    fail("USTAR archive is missing one or more required files.");
  }
  return entries;
}

function requireManifestBootstrap(manifest) {
  if (
    manifest?.contract !== "nkf.release-manifest" ||
    manifest?.nkf_version !== "0.1"
  ) {
    fail("Release manifest bootstrap contract or NKF version is invalid.");
  }
  const schema = manifest?.schemas?.[2];
  if (
    schema?.identity !== "urn:nkf:0.1:schema:release-manifest" ||
    schema?.path !==
      "contracts/nkf/0.1/schemas/release-manifest.schema.json" ||
    schema?.digest?.algorithm !== "sha-256" ||
    !/^[0-9a-f]{64}$/.test(schema?.digest?.value ?? "")
  ) {
    fail("Release manifest bootstrap schema entry is invalid.");
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
  if (git("remote", "get-url", "origin") !== manifest.source.repository) {
    fail("Source repository remote does not match the release manifest.");
  }
  const releaseCommit = git("rev-parse", `${manifest.source.release_commit}^{commit}`);
  if (releaseCommit !== manifest.source.release_commit) {
    fail("Release commit is unavailable from the source repository.");
  }
  const confirmation = manifest.source.checker_confirmation;
  const prefix = confirmation.decision.slice(4);
  if (!confirmation.path.startsWith(`knowledge/decisions/${prefix}-`)) {
    fail("Checker-confirmation Decision ID and path prefix do not match.");
  }
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
  const manifestBytes = requireBuffer(entries, "release-manifest.json");
  const manifest = parseStrictJson(manifestBytes);
  requireManifestBootstrap(manifest);
  if (!manifestBytes.equals(serializeReleaseManifest(manifest))) {
    fail("Release manifest bytes are not in canonical contract order and format.");
  }
  const manifestSchema = manifest.schemas[2];
  verifyArtifact(entries, manifestSchema);
  validateReleaseManifest(manifest, requireBuffer(entries, manifestSchema.path));

  const artifacts = [
    manifest.checker,
    manifest.authority.markdown,
    manifest.authority.executable,
    ...manifest.schemas,
  ];
  for (const artifact of artifacts) verifyArtifact(entries, artifact);
  if (sourceRoot !== undefined) verifySourceProvenance(sourceRoot, manifest);

  return {
    archive_sha256: archiveDigest,
    asset_name: `nourd-nkf-sha256-${archiveDigest}.tar`,
    tag: `release-sha256-${archiveDigest}`,
    release_commit: manifest.source.release_commit,
    checker_sha256: manifest.checker.digest.value,
    manifest,
    entries,
  };
}

export async function invokeVerifiedChecker(
  verification,
  checkerArguments = ["--help"],
) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), "nourd-nkf-release-"));
  try {
    const root = path.join(temporary, ARCHIVE_ROOT);
    for (const expected of RELEASE_ENTRIES) {
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

export async function readReleaseEntries(repositoryRoot) {
  const entries = new Map();
  for (const expected of RELEASE_ENTRIES) {
    if (expected.path === "release-manifest.json") continue;
    entries.set(
      expected.path,
      await readFile(path.join(repositoryRoot, expected.path)),
    );
  }
  return entries;
}
