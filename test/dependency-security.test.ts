import { readFile } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { customRandom } from "nanoid";
import { describe, expect, it } from "vitest";
import { repositoryRoot } from "./helpers.js";

describe("NKF 0.4 dependency security maintenance", () => {
  it("rejects literal-backslash URI authorities through the shipped AJV format boundary", () => {
    const AjvConstructor = Ajv2020 as unknown as new (options: Record<string, unknown>) => any;
    const ajv = new AjvConstructor({ strict: true });
    const addFormatSupport = addFormats as unknown as (instance: any) => void;
    addFormatSupport(ajv);
    const validateUri = ajv.compile({ type: "string", format: "uri" });

    expect(validateUri("https://expected.example/path")).toBe(true);
    expect(validateUri("https://expected.example\\@attacker.example/path")).toBe(false);
    expect(validateUri("https://expected.example\\attacker.example/path")).toBe(false);
  });

  it("locks patched dependency versions and excludes nanoid from shipped runtimes", async () => {
    const lock = JSON.parse(
      await readFile(path.join(repositoryRoot, "package-lock.json"), "utf8"),
    );
    expect(lock.packages["node_modules/fast-uri"]).toMatchObject({
      version: "3.1.5",
    });
    expect(lock.packages["node_modules/nanoid"]).toMatchObject({
      version: "3.3.18",
      dev: true,
    });

    const deterministicRandom = customRandom("abc", 0, (size) => new Uint8Array(size));
    expect(deterministicRandom()).toBe("");

    for (const artifact of ["dist/nourd-nkf-checker.mjs", "dist/nourd-nkf-adopt.mjs"]) {
      const bytes = await readFile(path.join(repositoryRoot, artifact), "utf8");
      expect(bytes).not.toContain("node_modules/nanoid");
    }
  });
});
