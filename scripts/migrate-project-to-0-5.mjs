import path from "node:path";
import { migrateProjectTo0_5 } from "./migration/0-5-core.mjs";

const projectIndex = process.argv.indexOf("--project");
if (projectIndex < 0 || process.argv[projectIndex + 1] === undefined) {
  throw new TypeError("Usage: node scripts/migrate-project-to-0-5.mjs --project <path>");
}
const result = await migrateProjectTo0_5(path.resolve(process.argv[projectIndex + 1]));
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
