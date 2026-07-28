import { describe, expect, it } from "vitest";

import { parseHeadings } from "../src/markdown.js";
import { sha256 } from "../src/core.js";

describe("knowledge primitives", () => {
  it("calculates the exact-byte SHA-256 digest", () => {
    expect(sha256(Buffer.from("Nourd\n", "utf8"))).toBe(
      "8cf4cc03461bb7be4c27eaaa556aedc37cdf9bed731f6eb4154c09833393128c",
    );
  });

  it("maps nested Markdown heading paths outside fenced code", () => {
    const headings = parseHeadings(`# Record

## Decision

### One \`Core\`

\`\`\`text
## Not a heading
\`\`\`

## Consequences
`);

    expect(headings.map((heading) => heading.path)).toEqual([
      ["Record"],
      ["Decision"],
      ["Decision", "One Core"],
      ["Consequences"],
    ]);
  });
});
