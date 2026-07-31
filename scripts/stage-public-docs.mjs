import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  cp,
  mkdir,
  readFile,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PUBLIC_FILES,
  verifyPublicDocs,
} from "./verify-public-docs.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

const output = process.argv[2];
if (output === undefined) {
  throw new Error("Usage: node scripts/stage-public-docs.mjs <empty-output-directory>");
}
const outputRoot = path.resolve(output);
const status = execFileSync("git", ["status", "--porcelain"], {
  cwd: repositoryRoot,
  encoding: "utf8",
}).trim();
if (status !== "") {
  throw new Error("Public documentation staging requires a clean source tree.");
}
const sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], {
  cwd: repositoryRoot,
  encoding: "utf8",
}).trim();
await verifyPublicDocs(repositoryRoot);
const recommended = JSON.parse(
  await readFile(path.join(repositoryRoot, "release/recommended.json"), "utf8"),
);
await mkdir(outputRoot, { recursive: false });
const published = [];
for (const relative of PUBLIC_FILES) {
  const source = path.join(repositoryRoot, "public-docs", ...relative.split("/"));
  const target = path.join(outputRoot, ...relative.split("/"));
  await mkdir(path.dirname(target), { recursive: true });
  await cp(source, target, { recursive: false, errorOnExist: true });
  const bytes = await readFile(source);
  published.push({ path: relative, sha256: sha256(bytes) });
}
const publication = {
  contract: "nkf.public-documentation-publication",
  nkf_version: "0.1",
  status: "pre-stable",
  role: "explanatory-with-exact-normative-markdown-mirror",
  source_commit: sourceCommit,
  normative_markdown_sha256: recommended.authority.markdown_sha256,
  release: {
    availability: "internal",
    archive_sha256: recommended.archive.sha256,
    source_commit: recommended.source_commit,
    checker_sha256: recommended.checker_sha256,
  },
  adopter: {
    availability: "public",
    sha256: recommended.adopter_sha256,
  },
  files: published,
};
const manifestPath = path.join(outputRoot, "reference/publication.json");
await writeFile(
  manifestPath,
  `${JSON.stringify(publication, null, 2)}\n`,
  { flag: "wx" },
);
process.stdout.write(
  `${JSON.stringify({
    output: outputRoot,
    source_commit: sourceCommit,
    files: published.length + 1,
    publication_sha256: sha256(await readFile(manifestPath)),
  })}\n`,
);
