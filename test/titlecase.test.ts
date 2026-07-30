import { describe, expect, it } from "vitest";
import { parseMarkdown } from "../src/checker/markdown.js";
import {
  protectedCanonicalRanges,
  toUnicode17TitleCase,
  wordBoundaries,
} from "../src/checker/titlecase.js";

describe("deterministic Markdown and Unicode 17 Title Case", () => {
  it("derives only direct-root CommonMark headings and their paths", () => {
    const model = parseMarkdown(
      [
        "# Product `API`",
        "",
        "> ## Quoted Heading",
        "",
        "## Main &amp; Visible",
        "",
        "### Child [Label](https://example.invalid)",
        "",
      ].join("\n"),
    );
    expect(model.headings.map((heading) => [heading.level, heading.text, heading.path])).toEqual([
      [1, "Product API", ["Product API"]],
      [2, "Main & Visible", ["Main & Visible"]],
      [3, "Child Label", ["Main & Visible", "Child Label"]],
    ]);
    expect(model.h1[0]?.protectedRanges).toEqual([{ start: 8, end: 11 }]);
  });

  it("title-cases every word and every hyphen-separated component", () => {
    expect(toUnicode17TitleCase("Needs and outcomes")).toBe("Needs And Outcomes");
    expect(toUnicode17TitleCase("pre-stable evolution")).toBe("Pre-Stable Evolution");
  });

  it("protects exact canonical terms and inline-code ranges", () => {
    const source = "NKF and someAPI";
    const ranges = protectedCanonicalRanges(source, ["NKF"], [{ start: 8, end: 15 }]);
    expect(toUnicode17TitleCase(source, ranges)).toBe("NKF And someAPI");
  });

  it("uses Unicode word boundaries for canonical phrases", () => {
    const boundaries = wordBoundaries("XNKF NKF-ready");
    expect(boundaries.has(1)).toBe(false);
    expect(boundaries.has(5)).toBe(true);
    expect(boundaries.has(8)).toBe(true);
  });
});
