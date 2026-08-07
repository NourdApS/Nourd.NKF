import type { RuleEmitter } from "./diagnostics.js";
import type {
  ContractArtifacts,
  ExtensionResolver,
} from "./types.js";
import { asObject, sha256, utf16Compare, values } from "./util.js";
import type { RecordUnit } from "./semantic.js";
import { parseNativeYaml } from "./yaml.js";

function duplicateUseIndexes(uses: Record<string, any>[]): number[] {
  const seen = new Set<string>();
  const duplicates: number[] = [];
  uses.forEach((use, index) => {
    const id = String(use.contract);
    if (seen.has(id)) duplicates.push(index);
    else seen.add(id);
  });
  return duplicates;
}

function artifactBinding(expected: string, observed: string | null) {
  return {
    expected_sha256: expected,
    observed_sha256: observed,
    binding: observed === null ? "unavailable" as const : observed === expected ? "verified" as const : "mismatched" as const,
  };
}

export async function validateExtensions(
  bundle: Record<string, any>,
  records: RecordUnit[],
  inScope: Set<string>,
  executable: Record<string, any>,
  resolver: ExtensionResolver | undefined,
  emitter: RuleEmitter,
  artifacts: ContractArtifacts,
  nkfVersion: string = "0.1",
): Promise<void> {
  const catalog = values<Record<string, any>>(bundle.extension_contracts);
  const catalogById = new Map<string, Record<string, any>>();
  const ambiguousCatalogIds = new Set<string>();
  catalog.forEach((entry, index) => {
    const id = String(entry.id);
    if (catalogById.has(id)) {
      ambiguousCatalogIds.add(id);
      emitter.emit("extension.catalog-id.duplicate", "An extension catalog ID is duplicated.", {
        artifact: ".nourd/knowledge/bundle.yaml",
        instance_pointer: `/extension_contracts/${index}/id`,
      });
    } else {
      catalogById.set(id, entry);
    }
  });

  const sites: Array<{
    artifact: string;
    recordId?: string;
    site: "bundle" | "record";
    uses: Record<string, any>[];
    pointer: string;
  }> = [
    {
      artifact: ".nourd/knowledge/bundle.yaml",
      site: "bundle",
      uses: values(bundle.extensions),
      pointer: "/extensions",
    },
    ...records
      .filter((record) => inScope.has(String(record.declaration.id)))
      .map((record) => ({
        artifact: record.artifact,
        recordId: String(record.declaration.id),
        site: "record" as const,
        uses: values<Record<string, any>>(record.declaration.extensions),
        pointer: "/extensions",
      })),
  ];
  for (const site of sites) {
    for (const index of duplicateUseIndexes(site.uses)) {
      emitter.emit("extension.use-id.duplicate", "An extension use ID is duplicated at one application site.", {
        artifact: site.artifact,
        ...(site.recordId === undefined ? {} : { record_id: site.recordId }),
        instance_pointer: `${site.pointer}/${index}/contract`,
      });
    }
  }

  const usesById = new Map<string, typeof sites>();
  for (const site of sites) {
    for (const use of site.uses) {
      const id = String(use.contract);
      const list = usesById.get(id) ?? [];
      if (!list.includes(site)) list.push(site);
      usesById.set(id, list);
    }
  }

  const extensionArtifacts: ContractArtifacts["extensions"] = [];
  for (const id of [...usesById.keys()].sort(utf16Compare)) {
    const entry = ambiguousCatalogIds.has(id) ? undefined : catalogById.get(id);
    const siteList = usesById.get(id) ?? [];
    const relevantUses = siteList.flatMap((site) =>
      site.uses.filter((use) => use.contract === id).map((use) => ({ site, use })),
    );
    if (entry === undefined) {
      for (const { site, use } of relevantUses) {
        emitter.emit(
          use.requirement === "required"
            ? "extension.required.contract-unresolved"
            : "extension.optional.unvalidated",
          "The extension use does not resolve uniquely through the bundle catalog.",
          {
            artifact: site.artifact,
            ...(site.recordId === undefined ? {} : { record_id: site.recordId }),
          },
        );
      }
      continue;
    }
    const specificationExpected = String(entry.specification?.digest?.value ?? "");
    const executableExpected = String(entry.executable?.digest?.value ?? "");
    let resolved = null;
    if (resolver !== undefined) {
      try {
        resolved = await resolver.resolve(entry);
      } catch {
        resolved = null;
      }
    }
    const specificationObserved = resolved === null ? null : sha256(resolved.specification);
    const executableObserved = resolved === null ? null : sha256(resolved.executable);
    extensionArtifacts.push({
      id,
      specification: artifactBinding(specificationExpected, specificationObserved),
      executable: artifactBinding(executableExpected, executableObserved),
    });

    if (resolved === null) {
      for (const { site, use } of relevantUses) {
        emitter.emit(
          use.requirement === "required"
            ? "extension.required.contract-unresolved"
            : "extension.optional.unvalidated",
          "The exact extension authority pair could not be resolved safely.",
          {
            artifact: site.artifact,
            ...(site.recordId === undefined ? {} : { record_id: site.recordId }),
          },
        );
      }
      continue;
    }
    if (specificationObserved !== specificationExpected || executableObserved !== executableExpected) {
      for (const { site, use } of relevantUses) {
        if (use.requirement === "required") {
          emitter.emit("extension.required.contract-digest-mismatch", "The extension artifact digest does not match the catalog.", {
            artifact: site.artifact,
            ...(site.recordId === undefined ? {} : { record_id: site.recordId }),
          });
        } else {
          emitter.emit("extension.optional.unvalidated", "The optional extension artifact digest is not validated.", {
            artifact: site.artifact,
            ...(site.recordId === undefined ? {} : { record_id: site.recordId }),
          });
        }
      }
      continue;
    }
    const extensionValue = parseNativeYaml(
      resolved.executable,
      `extension:${id}:executable`,
    ).value;
    if (
      resolved.id !== id ||
      extensionValue?.contract !== "nkf.extension" ||
      extensionValue?.id !== id ||
      extensionValue?.nkf_version !== nkfVersion
    ) {
      for (const { site, use } of relevantUses) {
        if (use.requirement === "required") {
          emitter.emit("extension.required.contract-identity-mismatch", "The extension executable identity is inconsistent.", {
            artifact: site.artifact,
            ...(site.recordId === undefined ? {} : { record_id: site.recordId }),
          });
        } else {
          emitter.emit("extension.optional.unvalidated", "The optional extension identity is not validated.", {
            artifact: site.artifact,
            ...(site.recordId === undefined ? {} : { record_id: site.recordId }),
          });
        }
      }
      continue;
    }
    const coreNames = new Set([
      ...Object.keys(executable.vocabularies?.section_roles?.meanings ?? {}),
      ...Object.keys(executable.vocabularies?.entity_kinds ?? {}),
      ...Object.keys(executable.vocabularies?.entity_relationship_types ?? {}),
      ...Object.keys(executable.vocabularies?.binding_kinds ?? {}),
      ...Object.keys(executable.vocabularies?.record_relationship_types ?? {}),
      ...Object.keys(executable.body_contracts ?? {}),
    ]);
    const extensionNames = Object.values(asObject(extensionValue?.vocabularies) ?? {})
      .flatMap((vocabulary) => Object.keys(asObject(vocabulary) ?? {}));
    if (extensionNames.some((name) => coreNames.has(name))) {
      emitter.emit("extension.core-conflict", "The extension attempts to repeat or override an NKF Core term.");
    }

    for (const { site, use } of relevantUses) {
      if (!resolved.supported) {
        emitter.emit(
          use.requirement === "required"
            ? "extension.required.unsupported"
            : "extension.optional.unvalidated",
          use.requirement === "required"
            ? "The required extension is not supported by this checker."
            : "The optional extension is preserved but not validated.",
          {
            artifact: site.artifact,
            ...(site.recordId === undefined ? {} : { record_id: site.recordId }),
          },
        );
      } else if (resolved.validatePayload !== undefined) {
        let payloadValid = false;
        try {
          payloadValid = await resolved.validatePayload(use.payload, site.site, site.recordId);
        } catch {
          payloadValid = false;
        }
        if (!payloadValid) {
          emitter.emit("extension.payload.invalid", "The extension payload is invalid.", {
            artifact: site.artifact,
            ...(site.recordId === undefined ? {} : { record_id: site.recordId }),
            instance_pointer: `${site.pointer}/${site.uses.indexOf(use)}/payload`,
          });
        }
      }
    }
  }
  artifacts.extensions = extensionArtifacts;
}
