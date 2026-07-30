import { access, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const artifact = new URL(
  "../dist/nourd-nkf-checker.mjs",
  import.meta.url,
);

await access(artifact);
const bytes = await readFile(artifact);
const digest = createHash("sha256").update(bytes).digest("hex");

if (!/^[0-9a-f]{64}$/.test(digest)) {
  throw new Error("Built checker digest is not a lowercase SHA-256 value.");
}

process.stdout.write(
  `${JSON.stringify({
    identity: "nourd-nkf-checker",
    digest: {
      algorithm: "sha-256",
      value: digest,
    },
  })}\n`,
);
