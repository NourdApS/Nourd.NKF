import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { validateProject } from "../src/checker/checker.js";
import { copyValidFixture, options } from "./helpers.js";

describe("validation result persistence and snapshot", () => {
  it("atomically keeps only the latest full-bundle result and excludes it from its own snapshot", async () => {
    const project = await copyValidFixture();
    const first = await validateProject(options(project, { persist: true }));
    const receipt = path.join(project, ".nourd/validation-result.json");
    expect(JSON.parse(await readFile(receipt, "utf8"))).toMatchObject({
      contract: "nkf.validation-result",
      conformance: "passed",
    });
    const second = await validateProject(
      options(project, {
        persist: true,
        executionId: () => "00000000-0000-4000-8000-000000000002",
      }),
    );
    expect(second.validated_snapshot).toEqual(first.validated_snapshot);

    await writeFile(path.join(project, "knowledge/product.md"), "\nChanged.\n", { flag: "a" });
    const failed = await validateProject(
      options(project, {
        persist: true,
        executionId: () => "00000000-0000-4000-8000-000000000003",
      }),
    );
    expect(failed.conformance).toBe("failed");
    expect(JSON.parse(await readFile(receipt, "utf8")).conformance).toBe("failed");
  });

  it("never persists structural validation", async () => {
    const project = await copyValidFixture();
    await validateProject(
      options(project, {
        persist: true,
        request: {
          level: "structural",
          record_id: null,
          acceptance_binding: "not-requested",
        },
      }),
    );
    await expect(readFile(path.join(project, ".nourd/validation-result.json"))).rejects.toThrow();
  });

  it("is deterministic for identical governed inputs and execution metadata", async () => {
    const project = await copyValidFixture();
    const first = await validateProject(options(project));
    const second = await validateProject(options(project));
    expect(second).toEqual(first);
  });

  it("ignores unrelated non-Markdown assets but changes with governed Markdown", async () => {
    const project = await copyValidFixture();
    const baseline = await validateProject(options(project));
    await writeFile(
      path.join(project, "knowledge/unreferenced.bin"),
      Buffer.from([0x00, 0x01, 0x02]),
    );
    const unrelated = await validateProject(options(project));
    expect(unrelated.validated_snapshot).toEqual(baseline.validated_snapshot);

    await writeFile(
      path.join(project, "knowledge/unrepresented.md"),
      "# Unrepresented\n",
      "utf8",
    );
    const markdown = await validateProject(options(project));
    expect(markdown.validated_snapshot.value).not.toBe(
      baseline.validated_snapshot.value,
    );
    expect(markdown.validated_snapshot.entry_count).toBeGreaterThan(
      baseline.validated_snapshot.entry_count,
    );
  });
});
