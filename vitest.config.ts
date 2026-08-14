import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    // These bounds guard against hangs; they do not assert performance. The
    // governed exercises drive real adopter processes over the whole
    // repository, so their cost tracks machine speed: hosted CI runners
    // measured about 2.6 times slower than the development machine and timed
    // out ten otherwise passing exercises. The bounds are therefore generous
    // rather than tight. Making them proportional to knowledge size is
    // deliberately deferred to a later NKF version.
    testTimeout: 60_000,
  },
});
