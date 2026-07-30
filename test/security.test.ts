import { describe, expect, it } from "vitest";
import { containsNativeSecret } from "../src/checker/security.js";

describe("native secret registry", () => {
  it("detects exact GitHub and OpenAI token patterns at their boundaries", () => {
    expect(containsNativeSecret(Buffer.from(`ghp_${"a".repeat(36)}`))).toBe(true);
    expect(containsNativeSecret(Buffer.from(`sk-proj-${"a".repeat(20)}`))).toBe(true);
    expect(containsNativeSecret(Buffer.from(`xghp_${"a".repeat(36)}`))).toBe(false);
    expect(containsNativeSecret(Buffer.from(`sk-${"a".repeat(19)}`))).toBe(false);
    expect(containsNativeSecret(Buffer.from(`sk-proj-${"a".repeat(17)}`))).toBe(false);
  });

  it("detects complete private-key blocks with sufficient Base64 payload", () => {
    const complete = `-----BEGIN PRIVATE KEY-----\n${"A".repeat(64)}\n-----END PRIVATE KEY-----`;
    const short = `-----BEGIN PRIVATE KEY-----\n${"A".repeat(63)}\n-----END PRIVATE KEY-----`;
    expect(containsNativeSecret(Buffer.from(complete))).toBe(true);
    expect(containsNativeSecret(Buffer.from(short))).toBe(false);
    expect(containsNativeSecret(Buffer.from(`------BEGIN PRIVATE KEY-----\n${"A".repeat(64)}\n-----END PRIVATE KEY-----`))).toBe(false);
  });

  it("does not classify accepted placeholders as native findings", () => {
    for (const placeholder of ["ghp_<REDACTED>", "sk-...", "${TOKEN}", "<SECRET>"]) {
      expect(containsNativeSecret(Buffer.from(placeholder))).toBe(false);
    }
  });
});
