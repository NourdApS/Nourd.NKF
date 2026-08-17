import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    // These bounds guard against hangs; they do not assert performance. The
    // suite budgets scale with the governed knowledge size in the tests
    // themselves; the base timeout here stays generous rather than tight.
    testTimeout: 60_000,
    // The governed exercises load complete producer graphs per worker.
    // Unbounded fork parallelism exhausts worker heaps on hosted runners,
    // so concurrency is bounded and each worker gets explicit headroom.
    maxWorkers: 2,
    minWorkers: 1,
    pool: "forks",
    poolOptions: {
      forks: {
        execArgv: ["--max-old-space-size=4096"],
      },
    },
  },
});
