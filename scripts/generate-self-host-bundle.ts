import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { parseMarkdown } from "../src/checker/markdown.js";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const knowledgeRoot = path.join(repositoryRoot, "knowledge");
const controlRoot = path.join(repositoryRoot, ".nourd", "knowledge");
const recordsRoot = path.join(controlRoot, "records");
const realizationId = "nkf-0.1-native-realization";

const canonicalTerms = [
  "ADR", "AI", "API", "CI", "CLI", "CommonMark", "GVI", "H1", "H2", "H3",
  "JCS", "JSON", "NKF", "NKP", "Node.js", "OKF", "RFC", "SDK", "SHA-256",
  "TypeScript", "UI", "URI", "URL", "UTF-8", "UUID", "YAML",
];

const responsibilities: Record<string, string[]> = {
  "nkf.technology": [
    "technology-definition", "purpose-and-problem", "consumers-and-use-contexts",
    "capabilities-and-contracts", "scope-authority-and-boundaries", "technology-map",
    "versioning-compatibility-and-migration", "distribution-support-and-security",
    "evolution-and-retirement",
  ],
  "nkf.specification": [
    "specification-definition", "authority-and-normative-status",
    "scope-and-applicability", "model-vocabulary-and-semantics",
    "requirements-constraints-and-interfaces", "validation-and-conformance",
    "versioning-compatibility-and-migration",
    "security-authority-and-operational-boundaries", "unresolved-and-deferred-matters",
  ],
  "nkf.design": [
    "design-kind-problem-and-scope", "governing-inputs-and-constraints",
    "proposed-or-accepted-design", "responsibilities-interactions-and-information-flows",
    "alternatives-and-trade-offs", "failure-safety-recovery-and-operations",
    "validation-and-acceptance-evidence", "unresolved-matters",
  ],
  "nkf.decision": [
    "context-and-problem", "decision", "scope-and-applicability", "rationale",
    "alternatives-considered", "consequences-and-trade-offs",
  ],
  "nkf.realization": [
    "realization-identity-and-kind", "governed-meaning-realized", "durable-mapping",
    "responsibilities-and-ownership-boundaries",
    "interfaces-dependencies-locators-and-resolution",
    "external-authority-and-operational-state-boundaries",
    "compatibility-verification-and-recovery",
  ],
  "nkf.evidence": [
    "question-claim-or-decision-context", "sources-or-primary-observation-method",
    "observations-and-findings", "interpretation", "limitations-and-uncertainty",
    "applicability-and-boundaries", "relevance-to-governed-knowledge",
  ],
};

const preference: Record<string, string[]> = {
  "context-and-problem": ["context", "problem", "purpose"],
  "decision": ["decision"],
  "scope-and-applicability": ["scope", "applicability", "boundary"],
  "rationale": ["rationale", "reason"],
  "alternatives-considered": ["alternative", "considered", "context"],
  "consequences-and-trade-offs": ["consequence", "trade-off", "compatibility"],
  "design-kind-problem-and-scope": ["context", "purpose", "problem", "scope", "status"],
  "governing-inputs-and-constraints": ["governing", "authority", "constraint", "requirement", "boundary"],
  "proposed-or-accepted-design": ["proposal", "design", "model", "contract", "decision", "direction"],
  "responsibilities-interactions-and-information-flows": ["responsibilit", "interaction", "flow", "structure", "serialization", "interface"],
  "alternatives-and-trade-offs": ["alternative", "trade-off", "rationale"],
  "failure-safety-recovery-and-operations": ["failure", "safety", "recovery", "risk", "security", "operation"],
  "validation-and-acceptance-evidence": ["validation", "acceptance", "evidence", "test", "check", "conformance"],
  "unresolved-matters": ["unresolved", "open", "deferred", "next"],
  "question-claim-or-decision-context": ["context", "question", "purpose", "claim"],
  "sources-or-primary-observation-method": ["source", "method", "provenance", "observation"],
  "observations-and-findings": ["observation", "finding", "result"],
  "interpretation": ["interpretation", "analysis", "assessment"],
  "limitations-and-uncertainty": ["limitation", "uncertainty", "gap", "boundary"],
  "applicability-and-boundaries": ["applicability", "boundary", "scope"],
  "relevance-to-governed-knowledge": ["relevance", "result", "conclusion"],
};

function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function slug(value: string): string {
  const result = value.toLowerCase()
    .replace(/[`_*[\]().,:;!?'"\\/]+/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return result || "section";
}

async function markdownFiles(directory: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await markdownFiles(absolute));
    else if (entry.name.endsWith(".md")) result.push(absolute);
  }
  return result.sort();
}

function classification(relative: string): {
  id: string;
  type: string;
  body: string;
  status: "accepted" | "draft";
  lifecycle: "living" | "immutable";
} | null {
  if (relative === "nkf.md") {
    return { id: "nkf", type: "technology", body: "nkf.technology", status: "accepted", lifecycle: "living" };
  }
  if (relative === "specifications/nkf-0.1.md") {
    return { id: "nkf-0.1-specification", type: "specification", body: "nkf.specification", status: "accepted", lifecycle: "immutable" };
  }
  if (relative === "realizations/nkf-0.1-native-realization.md") {
    return { id: realizationId, type: "realization", body: "nkf.realization", status: "draft", lifecycle: "living" };
  }
  if (relative === "evidence/nkf-003-source-reconciliation.md") {
    return { id: "nkf-003-source-reconciliation", type: "evidence", body: "nkf.evidence", status: "draft", lifecycle: "living" };
  }
  const decision = relative.match(/^decisions\/([0-9]{4})-.+\.md$/);
  if (decision !== null) {
    return { id: `adr-${decision[1]}`, type: "decision", body: "nkf.decision", status: "accepted", lifecycle: "immutable" };
  }
  if (/^designs\/.+\.md$/.test(relative) && relative !== "designs/README.md") {
    return { id: `design-${slug(path.posix.basename(relative, ".md"))}`, type: "design", body: "nkf.design", status: "draft", lifecycle: "living" };
  }
  return null;
}

function role(body: string, heading: string): string {
  const value = heading.toLowerCase();
  if (/(unresolved|open question|deferred)/.test(value)) return "unresolved";
  if (body === "nkf.technology") {
    if (/definition/.test(value)) return "definition";
    if (/consumer|people|actor/.test(value)) return "actor";
    if (/purpose|problem|context/.test(value)) return "context";
    if (/scope|boundar|non-claim/.test(value)) return "boundary";
    if (/map|capabilit|contract/.test(value)) return "catalogue";
    if (/version|migration|evolution|retirement/.test(value)) return "evolution";
    if (/distribution|security|support/.test(value)) return "obligation";
    return "governing";
  }
  if (body === "nkf.specification") {
    if (/definition|model|vocabular|semantic/.test(value)) return "definition";
    if (/scope|applicability/.test(value)) return "applicability";
    if (/security|authority|boundar/.test(value)) return "boundary";
    if (/validation|conformance|test|check/.test(value)) return "validation";
    if (/version|compatibility|migration/.test(value)) return "evolution";
    if (/interface/.test(value)) return "interface";
    return "governing";
  }
  if (body === "nkf.decision") {
    if (/context|problem/.test(value)) return "context";
    if (/scope|applicability/.test(value)) return "applicability";
    if (/rationale|reason/.test(value)) return "rationale";
    if (/alternative/.test(value)) return "alternative";
    if (/consequence/.test(value)) return "consequence";
    if (/trade-off/.test(value)) return "trade-off";
    if (/evidence/.test(value)) return "evidence";
    if (/recovery|rollback/.test(value)) return "recovery";
    return "governing";
  }
  if (body === "nkf.design") {
    if (/scope|boundar|non-claim/.test(value)) return "boundary";
    if (/authority|governing|constraint|requirement/.test(value)) return "governing";
    if (/responsibilit|ownership/.test(value)) return "responsibility";
    if (/interface|flow|structure|serialization/.test(value)) return "interface";
    if (/alternative/.test(value)) return "alternative";
    if (/trade-off/.test(value)) return "trade-off";
    if (/risk|failure|safety|security|privacy/.test(value)) return "risk";
    if (/recovery|rollback/.test(value)) return "recovery";
    if (/validation|acceptance|test|check|conformance/.test(value)) return "validation";
    if (/evidence|result|finding/.test(value)) return "evidence";
    return "context";
  }
  if (body === "nkf.realization") {
    if (/identity|kind/.test(value)) return "identity";
    if (/mapping|realized/.test(value)) return "mapping";
    if (/responsibilit|ownership/.test(value)) return "responsibility";
    if (/boundar|authority|state/.test(value)) return "boundary";
    if (/interface|locator|resolution/.test(value)) return "interface";
    if (/dependency/.test(value)) return "dependency";
    if (/compatibility|recovery|verification/.test(value)) return "recovery";
    return "mapping";
  }
  if (body === "nkf.evidence") {
    if (/source|provenance/.test(value)) return "source";
    if (/method/.test(value)) return "method";
    if (/observation/.test(value)) return "observation";
    if (/finding|result/.test(value)) return "finding";
    if (/interpretation|analysis|assessment/.test(value)) return "interpretation";
    if (/limitation|uncertainty|gap/.test(value)) return "limitation";
    if (/scope|applicability|boundar/.test(value)) return "boundary";
    if (/relevance|conclusion/.test(value)) return "relevance";
    return "context";
  }
  return "content";
}

function assignResponsibilities(body: string, sections: Array<Record<string, any>>): void {
  for (const responsibility of responsibilities[body] ?? []) {
    const preferred = preference[responsibility] ?? responsibility.split("-").filter((word) => word.length > 3);
    let best = 0;
    let bestScore = -1;
    sections.forEach((section, index) => {
      const heading = String(section.heading_path.at(-1)).toLowerCase();
      const score = preferred.filter((term) => heading.includes(term)).length;
      if (score > bestScore) {
        best = index;
        bestScore = score;
      }
    });
    const section = sections[best];
    if (section === undefined) throw new Error(`No section can bind ${body}.${responsibility}`);
    section.responsibilities ??= [];
    section.responsibilities.push(responsibility);
  }
}

function sectionIdByHeading(sections: Array<Record<string, any>>, text: string): string {
  return String(sections.find((section) =>
    String(section.heading_path.at(-1)).toLowerCase().includes(text.toLowerCase())
  )?.id ?? sections[0]?.id);
}

async function declaration(
  relative: string,
  record: NonNullable<ReturnType<typeof classification>>,
): Promise<Record<string, any>> {
  const bytes = await readFile(path.join(knowledgeRoot, relative));
  const model = parseMarkdown(new TextDecoder().decode(bytes));
  if (model.h1.length !== 1 || model.sections.length === 0) {
    throw new Error(`${relative} is not a record-shaped Markdown source`);
  }
  const sections = model.sections.map((heading) => {
    const sectionRole = role(record.body, heading.text);
    return {
      id: `${slug(heading.path.join("-"))}${heading.occurrence === 1 ? "" : `-${heading.occurrence}`}`,
      heading_path: heading.path,
      occurrence: heading.occurrence,
      authority:
        sectionRole === "unresolved"
          ? "unresolved"
          : record.body === "nkf.evidence"
            ? "evidence"
            : record.status === "accepted"
              ? "accepted-meaning"
              : "proposal",
      role: sectionRole,
    };
  });
  assignResponsibilities(record.body, sections);
  const relationships: Array<Record<string, string>> = [];
  if (record.id === "nkf") {
    const sourceSection = sectionIdByHeading(sections, "Technology Map");
    relationships.push(
      { type: "references", target: "nkf-0.1-specification", source_section: sourceSection },
      { type: "references", target: realizationId, source_section: sourceSection },
    );
  } else if (record.id === "nkf-0.1-specification") {
    relationships.push({
      type: "governs",
      target: "nkf",
      source_section: sectionIdByHeading(sections, "Scope"),
    });
  } else if (record.id === realizationId) {
    relationships.push({
      type: "realizes",
      target: "nkf-0.1-specification",
      source_section: sectionIdByHeading(sections, "Governed Meaning Realized"),
    });
  }
  const result: Record<string, any> = {
    contract: "nkf.record",
    id: record.id,
    type: record.type,
    body_contract: record.body,
    title: model.h1[0]?.text,
    source: {
      path: relative,
      digest: { algorithm: "sha-256", value: sha256(bytes) },
    },
    governance: {
      lifecycle: record.lifecycle,
      status: record.status,
      authority: ["human-product-owner"],
    },
    scope: { root: "nkf" },
    sections,
    relationships,
  };
  if (record.body === "nkf.evidence") {
    result.provenance = {
      sources: [{
        id: "nourd-studio-source-baseline",
        locator: "knowledge/evidence/source-snapshots/",
        title: "Nourd Studio NKF Source Snapshots",
      }],
    };
  }
  return result;
}

async function artifactFiles(): Promise<Array<{ path: string; kind: string }>> {
  const result: Array<{ path: string; kind: string }> = [];
  const walk = async (relativeDirectory: string, kind: string): Promise<void> => {
    for (const entry of await readdir(path.join(repositoryRoot, relativeDirectory), { withFileTypes: true })) {
      const relative = path.posix.join(relativeDirectory, entry.name);
      if (entry.isDirectory()) await walk(relative, kind);
      else result.push({ path: relative, kind });
    }
  };
  result.push({ path: "contracts/nkf/0.1/nkf.yaml", kind: "executable-contract" });
  await walk("contracts/nkf/0.1/schemas", "schema");
  await walk("src", "checker-source");
  await walk("test", "test");
  await walk("fixtures", "fixture");
  await walk("scripts", "build-tool");
  result.push(
    { path: "package.json", kind: "project-configuration" },
    { path: "package-lock.json", kind: "project-configuration" },
    { path: "tsconfig.json", kind: "project-configuration" },
    { path: "vitest.config.ts", kind: "project-configuration" },
  );
  return result.sort((left, right) => left.path.localeCompare(right.path));
}

await rm(recordsRoot, { recursive: true, force: true });
await mkdir(recordsRoot, { recursive: true });

const nonRecords: Array<Record<string, string>> = [];
for (const absolute of await markdownFiles(knowledgeRoot)) {
  const relative = path.relative(knowledgeRoot, absolute).split(path.sep).join("/");
  const record = classification(relative);
  if (record === null) {
    nonRecords.push(
      relative.endsWith("README.md")
        ? { path: relative, kind: "navigation" }
        : {
            path: relative,
            kind: "other",
            reason: relative.startsWith("tasks/")
              ? "Operational Task knowledge is outside the current Technology Profile record set"
              : "Byte-preserved provenance source is represented by the governed reconciliation Evidence",
          },
    );
    continue;
  }
  await writeFile(
    path.join(recordsRoot, `${record.id}.yaml`),
    YAML.stringify(await declaration(relative, record)),
    "utf8",
  );
}

const artifacts = [];
for (const item of await artifactFiles()) {
  const bytes = await readFile(path.join(repositoryRoot, item.path));
  artifacts.push({
    id: `artifact-${slug(item.path)}`,
    kind: item.kind,
    path: item.path,
    digest: { algorithm: "sha-256", value: sha256(bytes) },
    record: realizationId,
    source_section: "durable-mapping",
  });
}

const bundle = {
  nkf_version: "0.1",
  contract: "nkf.bundle",
  id: "nourd-knowledge-format",
  root: {
    record: "nkf",
    profile: "nkf.profile.technology",
  },
  knowledge_root: "knowledge",
  non_records: nonRecords.sort((left, right) => left.path.localeCompare(right.path)),
  canonical_terms: canonicalTerms.filter((term) => term !== "NKF"),
  governed_artifacts: artifacts,
};

await writeFile(path.join(controlRoot, "bundle.yaml"), YAML.stringify(bundle), "utf8");
