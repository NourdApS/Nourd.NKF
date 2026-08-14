import { regenerateReleaseMembers } from "./release/release-set.mjs";

const releaseSet = await regenerateReleaseMembers(process.cwd(), "0.6");
process.stdout.write(`${JSON.stringify({ members: releaseSet.members.length })}\n`);
