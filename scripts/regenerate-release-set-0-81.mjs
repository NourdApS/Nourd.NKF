import { regenerateReleaseMembers } from "./release/release-set.mjs";

// Version-specific by construction: the regenerated membership is the exact
// NKF 0.81 coverage union, and a later version's set is a different membership
// with its own delta rather than this one re-run.
const releaseSet = await regenerateReleaseMembers(process.cwd(), "0.81");
process.stdout.write(`${JSON.stringify({ members: releaseSet.members.length })}\n`);
