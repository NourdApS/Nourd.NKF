import { lstat, readFile, readdir } from "node:fs/promises";
import { realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const LIVING_ROOTS = ["README.md", "AGENTS.md", "knowledge"];
const EXEMPT_KNOWLEDGE = new Set(["decisions", "evidence"]);

function fail(message) {
  throw new Error(message);
}

async function markdownFiles(root, relative = "") {
  const absolute = path.join(root, ...relative.split("/").filter(Boolean));
  const stat = await lstat(absolute);
  if (stat.isFile()) return relative.endsWith(".md") ? [relative] : [];
  if (!stat.isDirectory()) return [];
  const collected = [];
  for (const entry of (await readdir(absolute)).sort()) {
    const child = relative === "" ? entry : `${relative}/${entry}`;
    collected.push(...(await markdownFiles(root, child)));
  }
  return collected;
}

function relativeDestinations(text) {
  const destinations = [];
  let fenced = false;
  for (const line of text.split("\n")) {
    if (line.trim().startsWith("```")) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    for (const match of line.matchAll(/\]\(([^()\s]+)\)/g)) {
      const destination = match[1];
      if (destination === undefined) continue;
      if (/^[a-z][a-z0-9+.-]*:/i.test(destination) || destination.startsWith("#")) continue;
      destinations.push(destination);
    }
  }
  return destinations;
}

const LEGACY_STABLE_PATH_SEGMENTS = [
  ["tasks/active/", "tasks/items/"],
  ["tasks/completed/", "tasks/items/"],
  ["tasks/deferred/", "tasks/items/"],
  ["tasks/cancelled/", "tasks/items/"],
  ["designs/active/", "designs/items/"],
  ["designs/adopted/", "designs/items/"],
  ["designs/rejected/", "designs/items/"],
  ["designs/superseded/", "designs/items/"],
  ["designs/withdrawn/", "designs/items/"],
  ["realizations/current/", "realizations/items/"],
];

function legacyStablePathResolution(resolved) {
  const normalized = resolved.split(path.sep).join("/");
  for (const [from, to] of LEGACY_STABLE_PATH_SEGMENTS) {
    const index = normalized.indexOf(`/${from}`);
    if (index >= 0) {
      return path.join(
        ...`${normalized.slice(0, index + 1)}${to}${normalized.slice(index + 1 + from.length)}`.split("/"),
      ).replace(/^([A-Za-z]:)?/, resolved.startsWith(path.sep) ? path.sep : "$1");
    }
  }
  return resolved;
}

async function checkFiles(projectRoot, files) {
  let checked = 0;
  const dead = [];
  for (const relative of files) {
    const absolute = path.join(projectRoot, ...relative.split("/"));
    const text = await readFile(absolute, "utf8");
    for (const destination of relativeDestinations(text)) {
      checked += 1;
      const target = destination.split("#")[0];
      if (target === undefined || target === "") continue;
      const resolved = path.resolve(path.dirname(absolute), ...target.split("/"));
      const inside = path.relative(projectRoot, resolved);
      if (inside.startsWith("..") || path.isAbsolute(inside)) {
        dead.push({ file: relative, destination });
        continue;
      }
      let stat = await lstat(resolved).catch(() => null);
      if (stat === null) {
        // Historical resolution: byte-frozen sources (predecessor-locked,
        // immutable, Evidence) and out-of-bundle front-page files keep links
        // to the legacy state-baked trees; the accepted 0.7 neutralization
        // resolves them through its closed mapping.
        const mapped = legacyStablePathResolution(resolved);
        if (mapped !== resolved) stat = await lstat(mapped).catch(() => null);
      }
      if (stat === null) dead.push({ file: relative, destination });
    }
  }
  return { checked, dead };
}

export async function verifyLinks(projectRootInput) {
  const projectRoot = path.resolve(projectRootInput);
  const living = [];
  const exempt = [];
  for (const root of LIVING_ROOTS) {
    const stat = await lstat(path.join(projectRoot, root)).catch(() => null);
    if (stat === null) fail(`A required living surface is missing: ${root}`);
    for (const relative of await markdownFiles(projectRoot, root)) {
      const segments = relative.split("/");
      if (segments[0] === "knowledge" && EXEMPT_KNOWLEDGE.has(segments[1] ?? "")) {
        exempt.push(relative);
      } else {
        living.push(relative);
      }
    }
  }
  const livingResult = await checkFiles(projectRoot, living);
  const exemptResult = await checkFiles(projectRoot, exempt);
  return {
    contract: "nkf.link-verification",
    status: livingResult.dead.length === 0 ? "passed" : "failed",
    living_files: living.length,
    links_checked: livingResult.checked,
    dead: livingResult.dead,
    exempt_dead_links: exemptResult.dead.length,
  };
}

function parseArguments(argv) {
  let project = process.cwd();
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--project" && argv[index + 1] !== undefined) {
      project = argv[index + 1];
      index += 1;
    } else {
      fail(`Unknown or incomplete argument: ${argv[index] ?? ""}.`);
    }
  }
  return { project };
}
// Resolve both sides to a real path before comparing. On macOS a temporary
// directory is reached through a symlink, so the raw argv path and the module
// URL disagree and the guard silently skips the whole script with exit 0 — a
// no-op that reads as success. The NKF 0.8 candidate exercise hit exactly
// that: a generation step appeared to run and changed nothing.
function invokedDirectlyAs(moduleUrl) {
  const entry = process.argv[1];
  if (entry === undefined) return false;
  const real = (value) => { try { return realpathSync(value); } catch { return path.resolve(value); } };
  return real(entry) === real(fileURLToPath(moduleUrl));
}


if (invokedDirectlyAs(import.meta.url)) {
  try {
    const result = await verifyLinks(parseArguments(process.argv.slice(2)).project);
    process.stdout.write(`${JSON.stringify(result)}\n`);
    if (result.status !== "passed") process.exitCode = 1;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`verify-links: ${message}\n`);
    process.exitCode = 1;
  }
}
