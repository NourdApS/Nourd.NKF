const privateKeyLabels = [
  "PRIVATE KEY",
  "RSA PRIVATE KEY",
  "EC PRIVATE KEY",
  "DSA PRIVATE KEY",
  "OPENSSH PRIVATE KEY",
  "ENCRYPTED PRIVATE KEY",
] as const;

function asciiAlphaNumeric(value: number): boolean {
  return (
    (value >= 0x30 && value <= 0x39) ||
    (value >= 0x41 && value <= 0x5a) ||
    (value >= 0x61 && value <= 0x7a)
  );
}

function tokenMatch(
  bytes: Uint8Array,
  prefix: string,
  minimum: number,
  body: (value: number) => boolean,
  preceding: (value: number) => boolean,
  following: (value: number) => boolean,
  excludedLongerPrefixes: readonly string[] = [],
): boolean {
  const prefixBytes = Buffer.from(prefix, "ascii");
  outer: for (let index = 0; index <= bytes.length - prefixBytes.length; index += 1) {
    for (let cursor = 0; cursor < prefixBytes.length; cursor += 1) {
      if (bytes[index + cursor] !== prefixBytes[cursor]) continue outer;
    }
    for (const excluded of excludedLongerPrefixes) {
      const excludedBytes = Buffer.from(excluded, "ascii");
      if (
        excludedBytes.every((value, cursor) => bytes[index + cursor] === value)
      ) {
        continue outer;
      }
    }
    const before = bytes[index - 1];
    if (before !== undefined && preceding(before)) continue;
    let cursor = index + prefixBytes.length;
    let length = 0;
    while (cursor < bytes.length && body(bytes[cursor] ?? -1)) {
      cursor += 1;
      length += 1;
    }
    if (length < minimum) continue;
    const after = bytes[cursor];
    if (after !== undefined && following(after)) continue;
    return true;
  }
  return false;
}

function privateKeyMatch(bytes: Uint8Array): boolean {
  const source = Buffer.from(bytes).toString("latin1");
  for (const label of privateKeyLabels) {
    const header = `-----BEGIN ${label}-----`;
    const footer = `-----END ${label}-----`;
    let start = source.indexOf(header);
    while (start >= 0) {
      const end = source.indexOf(footer, start + header.length);
      if (end < 0) break;
      if (
        source[start - 1] === "-" ||
        source[start + header.length] === "-" ||
        source[end - 1] === "-" ||
        source[end + footer.length] === "-"
      ) {
        start = source.indexOf(header, start + header.length);
        continue;
      }
      const body = source.slice(start + header.length, end).replace(/[ \t\r\n]/g, "");
      if (body.length >= 64 && /^[A-Za-z0-9+/=]+$/.test(body)) return true;
      start = source.indexOf(header, start + header.length);
    }
  }
  return false;
}

export function containsNativeSecret(bytes: Uint8Array): boolean {
  if (privateKeyMatch(bytes)) return true;
  const githubBoundary = (value: number) => asciiAlphaNumeric(value) || value === 0x5f;
  for (const prefix of ["ghp_", "gho_", "ghu_", "ghs_", "ghr_"]) {
    if (
      tokenMatch(
        bytes,
        prefix,
        36,
        asciiAlphaNumeric,
        githubBoundary,
        asciiAlphaNumeric,
      )
    ) {
      return true;
    }
  }
  const openAiAlphabet = (value: number) =>
    asciiAlphaNumeric(value) || value === 0x5f || value === 0x2d;
  for (const prefix of ["sk-proj-", "sk-"]) {
    if (
      tokenMatch(
        bytes,
        prefix,
        20,
        openAiAlphabet,
        openAiAlphabet,
        openAiAlphabet,
        prefix === "sk-" ? ["sk-proj-"] : [],
      )
    ) {
      return true;
    }
  }
  return false;
}
