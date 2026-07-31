import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { buildAdopter, repositoryRoot } from "./build-adopter.mjs";

const temporary = await mkdtemp(path.join(os.tmpdir(), "nkf-adopter-build-"));
try {
  const first = path.join(temporary, "first.mjs");
  const second = path.join(temporary, "second.mjs");
  await buildAdopter(first);
  await buildAdopter(second);
  const [firstBytes, secondBytes, committedBytes] = await Promise.all([
    readFile(first),
    readFile(second),
    readFile(path.join(repositoryRoot, "dist/nourd-nkf-adopt.mjs")),
  ]);
  if (!firstBytes.equals(secondBytes)) {
    throw new Error("Two adopter builds produced different bytes.");
  }
  if (!firstBytes.equals(committedBytes)) {
    throw new Error("The committed adopter differs from a clean build.");
  }
  process.stdout.write(
    `${JSON.stringify({
      contract: "nkf.adopter-build-verification",
      status: "passed",
      bytes: firstBytes.length,
    })}\n`,
  );
} finally {
  await rm(temporary, { recursive: true, force: true });
}
