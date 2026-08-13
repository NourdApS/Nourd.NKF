import path from "node:path";
import { sealBaseline0_5 } from "./freshness/seal-baseline-0-5.mjs";

const option = (name) => {
  const index = process.argv.indexOf(name);
  return index < 0 ? undefined : process.argv[index + 1];
};
const project = option("--project");
const checker = option("--checker");
const review = option("--review");
if (project === undefined || checker === undefined || review === undefined) {
  throw new TypeError("Usage: node scripts/seal-baseline-0-5.mjs --project <path> --checker <path> --review <yaml>");
}
const result = await sealBaseline0_5({ projectRoot: path.resolve(project), checker: path.resolve(checker), reviewPath: path.resolve(review) });
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
