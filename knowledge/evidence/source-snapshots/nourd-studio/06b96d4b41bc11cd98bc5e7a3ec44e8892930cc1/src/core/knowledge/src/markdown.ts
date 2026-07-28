export interface MarkdownHeading {
  level: number;
  title: string;
  path: string[];
  occurrence: number;
}

export interface MarkdownGovernance {
  status?: "draft" | "accepted" | "retired" | "superseded";
  acceptedOn?: string;
  proposedOn?: string;
}

export function normalizeHeading(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\s+#+\s*$/, "")
    .trim();
}

export function parseHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  const parents: Array<{ level: number; title: string }> = [];
  const occurrences = new Map<string, number>();
  let fenced = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      continue;
    }

    if (fenced) {
      continue;
    }

    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match?.[1] || !match[2]) {
      continue;
    }

    const level = match[1].length;
    const title = normalizeHeading(match[2]);

    if (level === 1) {
      parents.length = 0;
      const headingPath = [title];
      const key = headingPathKey(headingPath);
      const occurrence = (occurrences.get(key) ?? 0) + 1;
      occurrences.set(key, occurrence);
      headings.push({ level, title, path: headingPath, occurrence });
      continue;
    }

    while (parents.length > 0 && parents[parents.length - 1]!.level >= level) {
      parents.pop();
    }

    const headingPath = [...parents.map((parent) => parent.title), title];
    const key = headingPathKey(headingPath);
    const occurrence = (occurrences.get(key) ?? 0) + 1;
    occurrences.set(key, occurrence);
    headings.push({ level, title, path: headingPath, occurrence });
    parents.push({ level, title });
  }

  return headings;
}

export function headingPathKey(path: string[]): string {
  return path.join("\u001f");
}

function metadataValue(markdown: string, label: string): string | undefined {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(
    `^(?:-\\s*)?\\*\\*${escaped}:\\*\\*\\s*(.+?)(?:<br>)?\\s*$`,
    "im",
  ).exec(markdown);
  return match?.[1]?.trim();
}

export function parseGovernance(markdown: string): MarkdownGovernance {
  const rawStatus =
    metadataValue(markdown, "Status") ??
    metadataValue(markdown, "Journey status");
  const normalizedStatus = rawStatus?.toLowerCase();
  let status: MarkdownGovernance["status"];
  if (normalizedStatus?.startsWith("accepted")) {
    status = "accepted";
  } else if (normalizedStatus?.startsWith("boundary accepted")) {
    status = "accepted";
  } else if (normalizedStatus?.startsWith("draft")) {
    status = "draft";
  } else if (normalizedStatus?.startsWith("retired")) {
    status = "retired";
  } else if (normalizedStatus?.startsWith("superseded")) {
    status = "superseded";
  }
  const acceptedOn = metadataValue(markdown, "Accepted");
  const proposedOn = metadataValue(markdown, "Proposed");

  return {
    ...(status ? { status } : {}),
    ...(acceptedOn ? { acceptedOn } : {}),
    ...(proposedOn ? { proposedOn } : {}),
  };
}
