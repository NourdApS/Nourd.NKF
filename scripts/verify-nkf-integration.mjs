import { spawnSync } from "node:child_process";
import path from "node:path";

const project = path.resolve(process.argv[2] ?? ".");
const result = spawnSync(
  process.execPath,
  [
    path.join(project, ".nourd/tools/nkf/nourd-nkf-adopt.mjs"),
    "integration-check",
    "--project",
    project,
  ],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
