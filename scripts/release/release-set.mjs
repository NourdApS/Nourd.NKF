import { lstat, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

export const CURRENT_RELEASE_VERSION = "0.7";
export function releaseSetPathForVersion(nkfVersion) {
  if (!["0.6", "0.7"].includes(nkfVersion)) {
    fail(`NKF ${nkfVersion} does not use the complete release-set contract.`);
  }
  return `contracts/nkf/${nkfVersion}/release-set.yaml`;
}
export const RELEASE_SET_PATH = releaseSetPathForVersion(CURRENT_RELEASE_VERSION);
export const RELEASE_CLASSES = Object.freeze([
  "normative-specification",
  "executable-companion",
  "evaluation-policy",
  "version-delta-declaration",
  "repository-license",
  "repository-notice",
  "third-party-notices",
  "release-set-contract",
  "release-manifest",
  "derived-schema",
  "checker",
  "adopter",
  "authoring-protocol",
  "onboarding-protocol",
  "release-protocol",
  "adoption-protocol",
  "portable-skill",
  "host-adapter-instruction",
  "product-fixture",
  "technology-fixture",
  "product-public-example",
  "technology-public-example",
  "public-documentation",
]);

export function releaseClassesForVersion(nkfVersion) {
  if (nkfVersion === "0.7") return RELEASE_CLASSES;
  // The 0.6 predecessor set stays readable for its immutable archive.
  return RELEASE_CLASSES.filter((className) => className !== "version-delta-declaration");
}

const SELECTIONS = new Set([
  "exact-file",
  "recursive-regular-files",
  "generated-release-manifest",
]);

function fail(message) {
  throw new Error(message);
}

function compareAscii(left, right) {
  return Buffer.compare(Buffer.from(left, "ascii"), Buffer.from(right, "ascii"));
}

function exactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be a mapping.`);
  }
  if (
    JSON.stringify(Object.keys(value).sort()) !==
    JSON.stringify([...expected].sort())
  ) {
    fail(`${label} contains unsupported or missing fields.`);
  }
}

export function safeReleasePath(value, label = "Release path") {
  if (
    typeof value !== "string" ||
    value === "" ||
    value.trim() !== value ||
    !/^[\x21-\x7e]+$/.test(value) ||
    value.startsWith("/") ||
    value.includes("\\") ||
    value.split("/").some((part) => part === "" || part === "." || part === "..")
  ) {
    fail(`${label} must be a safe printable-ASCII relative path.`);
  }
  return value;
}

function selectorMatches(selector, memberPath) {
  if (selector.selection === "recursive-regular-files") {
    return memberPath.startsWith(`${selector.path}/`);
  }
  return memberPath === selector.path;
}

function selectorsOverlap(left, right) {
  if (left.path === right.path) return true;
  if (
    left.selection === "recursive-regular-files" &&
    right.path.startsWith(`${left.path}/`)
  ) return true;
  if (
    right.selection === "recursive-regular-files" &&
    left.path.startsWith(`${right.path}/`)
  ) return true;
  return false;
}

function parseYaml(bytes) {
  const source = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  if (source.charCodeAt(0) === 0xfeff) fail("Release set must not contain a byte-order mark.");
  if (/(^|[\s[{,])[&*][A-Za-z0-9_-]+/.test(source)) {
    fail("Release set aliases and anchors are forbidden.");
  }
  const documents = YAML.parseAllDocuments(source, {
    uniqueKeys: true,
    merge: false,
    schema: "core",
  });
  if (documents.length !== 1 || documents[0].errors.length > 0) {
    fail(`Release set must be one strict YAML document: ${documents[0]?.errors[0]?.message ?? "document count"}`);
  }
  return documents[0].toJS({ maxAliasCount: 0 });
}

export function validateReleaseSet(value) {
  exactKeys(value, ["contract", "nkf_version", "coverage", "members"], "Release set");
  if (
    value.contract !== "nkf.release-set" ||
    !["0.6", "0.7"].includes(value.nkf_version) ||
    !Array.isArray(value.coverage) ||
    value.coverage.length === 0 ||
    !Array.isArray(value.members) ||
    value.members.length === 0
  ) {
    fail("Release set identity, version, coverage, or members are invalid.");
  }

  const releaseClasses = releaseClassesForVersion(value.nkf_version);
  const selectors = value.coverage.map((selector, index) => {
    exactKeys(selector, ["class", "selection", "path"], `Coverage selector ${index}`);
    const classIndex = releaseClasses.indexOf(selector.class);
    if (classIndex === -1 || !SELECTIONS.has(selector.selection)) {
      fail(`Coverage selector ${index} uses an unsupported class or selection.`);
    }
    safeReleasePath(selector.path, `Coverage selector ${index} path`);
    if (
      (selector.selection === "generated-release-manifest") !==
        (selector.path === "release-manifest.json")
    ) {
      fail("The generated selector must be solely release-manifest.json.");
    }
    return { ...selector, classIndex };
  });
  for (let index = 1; index < selectors.length; index += 1) {
    const prior = selectors[index - 1];
    const current = selectors[index];
    if (
      prior.classIndex > current.classIndex ||
      (prior.classIndex === current.classIndex && compareAscii(prior.path, current.path) >= 0)
    ) {
      fail("Coverage selectors are not ordered by exact class then ASCII path.");
    }
  }
  if (new Set(selectors.map((selector) => selector.path)).size !== selectors.length) {
    fail("Coverage selector paths must be unique.");
  }
  for (let left = 0; left < selectors.length; left += 1) {
    for (let right = left + 1; right < selectors.length; right += 1) {
      if (selectorsOverlap(selectors[left], selectors[right])) {
        fail(`Coverage selectors overlap: ${selectors[left].path} and ${selectors[right].path}.`);
      }
    }
  }
  for (const className of releaseClasses) {
    if (!selectors.some((selector) => selector.class === className)) {
      fail(`Coverage omits required class: ${className}.`);
    }
  }

  const seen = new Set();
  const folded = new Set();
  const classCounts = new Map();
  for (const [index, member] of value.members.entries()) {
    exactKeys(member, ["path", "class", "mode"], `Release member ${index}`);
    safeReleasePath(member.path, `Release member ${index} path`);
    if (!releaseClasses.includes(member.class)) {
      fail(`Release member ${index} uses an unsupported class.`);
    }
    const expectedMode = member.path === "dist/nourd-nkf-checker.mjs" ? "0755" : "0644";
    if (member.mode !== expectedMode) fail(`Release member has an invalid mode: ${member.path}.`);
    if (seen.has(member.path)) fail(`Duplicate release member: ${member.path}.`);
    const lower = member.path.toLowerCase();
    if (folded.has(lower)) fail(`Case-colliding release member: ${member.path}.`);
    seen.add(member.path);
    folded.add(lower);
    if (index > 0 && compareAscii(value.members[index - 1].path, member.path) >= 0) {
      fail("Release members are not in exact ASCII path order.");
    }
    const matches = selectors.filter((selector) => selectorMatches(selector, member.path));
    if (matches.length !== 1 || matches[0].class !== member.class) {
      fail(`Release member does not match exactly one same-class selector: ${member.path}.`);
    }
    classCounts.set(member.class, (classCounts.get(member.class) ?? 0) + 1);
  }
  for (const selector of selectors) {
    if (!value.members.some((member) => selectorMatches(selector, member.path))) {
      fail(`Coverage selector is empty: ${selector.path}.`);
    }
  }
  for (const className of releaseClasses) {
    if ((classCounts.get(className) ?? 0) < 1) fail(`Members omit required class: ${className}.`);
  }
  if (
    !seen.has(releaseSetPathForVersion(value.nkf_version)) ||
    !seen.has("release-manifest.json")
  ) {
    fail("Release members must include the release set and release manifest.");
  }
  return value;
}

export function parseReleaseSet(bytes) {
  return validateReleaseSet(parseYaml(bytes));
}

async function containedRegular(root, relative, expectDirectory = false) {
  let cursor = root;
  for (const segment of relative.split("/")) {
    cursor = path.join(cursor, segment);
    const stat = await lstat(cursor).catch(() => null);
    if (stat === null || stat.isSymbolicLink()) fail(`Coverage path is missing or symbolic: ${relative}.`);
  }
  const stat = await lstat(cursor);
  if (expectDirectory ? !stat.isDirectory() : !stat.isFile()) {
    fail(`Coverage path has the wrong kind: ${relative}.`);
  }
  return cursor;
}

async function recursiveFiles(root, relative) {
  const start = await containedRegular(root, relative, true);
  const files = [];
  async function visit(directory, prefix) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => compareAscii(left.name, right.name));
    for (const entry of entries) {
      const child = path.join(directory, entry.name);
      const childRelative = `${prefix}/${entry.name}`;
      const stat = await lstat(child);
      if (stat.isSymbolicLink()) fail(`Coverage contains a symbolic link: ${childRelative}.`);
      if (stat.isDirectory()) await visit(child, childRelative);
      else if (stat.isFile()) files.push(childRelative);
      else fail(`Coverage contains an unsupported file kind: ${childRelative}.`);
    }
  }
  await visit(start, relative);
  if (files.length === 0) fail(`Recursive coverage is empty: ${relative}.`);
  return files;
}

export async function reproduceReleaseMembers(repositoryRoot, releaseSet) {
  validateReleaseSet(releaseSet);
  if (releaseSet.nkf_version !== CURRENT_RELEASE_VERSION) {
    for (const member of releaseSet.members) {
      if (member.path === "release-manifest.json") continue;
      await containedRegular(repositoryRoot, member.path, false);
    }
    return releaseSet.members;
  }
  const discovered = [];
  for (const selector of releaseSet.coverage) {
    let paths;
    if (selector.selection === "generated-release-manifest") {
      paths = [selector.path];
    } else if (selector.selection === "exact-file") {
      await containedRegular(repositoryRoot, selector.path, false);
      paths = [selector.path];
    } else {
      paths = await recursiveFiles(repositoryRoot, selector.path);
    }
    for (const memberPath of paths) {
      discovered.push({
        path: memberPath,
        class: selector.class,
        mode: memberPath === "dist/nourd-nkf-checker.mjs" ? "0755" : "0644",
      });
    }
  }
  discovered.sort((left, right) => compareAscii(left.path, right.path));
  if (JSON.stringify(discovered) !== JSON.stringify(releaseSet.members)) {
    fail("Release-set members differ from the exact deterministic coverage union.");
  }
  return discovered;
}

export async function readReleaseSet(repositoryRoot, nkfVersion = CURRENT_RELEASE_VERSION) {
  return parseReleaseSet(
    await readFile(path.join(repositoryRoot, releaseSetPathForVersion(nkfVersion))),
  );
}

export async function regenerateReleaseMembers(
  repositoryRoot,
  nkfVersion = CURRENT_RELEASE_VERSION,
) {
  const releaseSetPath = releaseSetPathForVersion(nkfVersion);
  const target = path.join(repositoryRoot, releaseSetPath);
  const value = parseYaml(await readFile(target));
  exactKeys(value, ["contract", "nkf_version", "coverage", "members"], "Release set");
  value.members = [];
  const selectors = value.coverage;
  const discovered = [];
  for (const selector of selectors) {
    let paths;
    if (selector.selection === "generated-release-manifest") paths = [selector.path];
    else if (selector.selection === "exact-file") {
      await containedRegular(repositoryRoot, selector.path, false);
      paths = [selector.path];
    } else paths = await recursiveFiles(repositoryRoot, selector.path);
    for (const memberPath of paths) {
      discovered.push({
        path: memberPath,
        class: selector.class,
        mode: memberPath === "dist/nourd-nkf-checker.mjs" ? "0755" : "0644",
      });
    }
  }
  discovered.sort((left, right) => compareAscii(left.path, right.path));
  value.members = discovered;
  const bytes = YAML.stringify(value, { lineWidth: 0, sortMapEntries: false });
  await writeFile(target, bytes);
  return parseReleaseSet(Buffer.from(bytes));
}
