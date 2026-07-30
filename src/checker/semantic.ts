import type { RuleEmitter } from "./diagnostics.js";
import { asObject, jcs, values } from "./util.js";

export interface RecordUnit {
  artifact: string;
  declaration: Record<string, any>;
  declarationDigest: string;
  sourceDigest: string | null;
  sourceValid: boolean;
}

function duplicateIndexes<T>(items: T[], key: (item: T) => string | null): number[] {
  const seen = new Map<string, number>();
  const duplicates: number[] = [];
  items.forEach((item, index) => {
    const value = key(item);
    if (value === null) return;
    if (seen.has(value)) duplicates.push(index);
    else seen.set(value, index);
  });
  return duplicates;
}

function hasCycle(nodes: string[], edges: Array<[string, string]>): boolean {
  const graph = new Map<string, string[]>();
  for (const node of nodes) graph.set(node, []);
  for (const [source, target] of edges) graph.get(source)?.push(target);
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (node: string): boolean => {
    if (visiting.has(node)) return true;
    if (visited.has(node)) return false;
    visiting.add(node);
    for (const target of graph.get(node) ?? []) {
      if (visit(target)) return true;
    }
    visiting.delete(node);
    visited.add(node);
    return false;
  };
  return nodes.some(visit);
}

export function validateGraph(
  bundle: Record<string, any>,
  records: RecordUnit[],
  emitter: RuleEmitter,
): void {
  const byId = new Map(records.map((unit) => [String(unit.declaration.id), unit]));
  const productRecords = records.filter((unit) => unit.declaration.type === "product");
  if (productRecords.length === 0) emitter.emit("bundle.product.missing", "The bundle has no Product record.");
  if (productRecords.length > 1) emitter.emit("bundle.product.multiple", "The bundle has more than one Product record.");
  const root = byId.get(String(bundle.product_record));
  if (
    root === undefined ||
    root.declaration.type !== "product" ||
    root.declaration.body_contract !== "nkf.product"
  ) {
    emitter.emit("bundle.product.invalid", "The declared Product root does not resolve to the unique Product record.");
  }

  const partOf: Array<[string, string]> = [];
  for (const unit of records) {
    const record = unit.declaration;
    const id = String(record.id);
    if (record.scope?.product !== bundle.product_record) {
      emitter.emit("scope.product.mismatch", "Record scope does not match the bundle Product root.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: "/scope/product",
      });
    }
    const relationships = values<Record<string, any>>(record.relationships);
    for (const index of duplicateIndexes(relationships, (relationship) => jcs(relationship))) {
      emitter.emit("relationship.duplicate", "An exact record relationship is duplicated.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: `/relationships/${index}`,
      });
    }
    const sections = new Set(values<Record<string, any>>(record.sections).map((section) => section.id));
    relationships.forEach((relationship, index) => {
      if (!(relationship.type in (unit.declaration.__vocab_relationships ?? {}))) {
        emitter.emit("relationship.type.unsupported", "The relationship type is not supported by NKF Core.", {
          artifact: unit.artifact,
          record_id: id,
          instance_pointer: `/relationships/${index}/type`,
        });
      }
      if (!byId.has(String(relationship.target))) {
        emitter.emit("relationship.target.unresolved", "The relationship target does not resolve in this bundle.", {
          artifact: unit.artifact,
          record_id: id,
          instance_pointer: `/relationships/${index}/target`,
        });
      }
      if (!sections.has(relationship.source_section)) {
        emitter.emit("relationship.section.unresolved", "The relationship source section does not resolve.", {
          artifact: unit.artifact,
          record_id: id,
          instance_pointer: `/relationships/${index}/source_section`,
        });
      }
      if (relationship.type === "part-of") partOf.push([id, String(relationship.target)]);
    });

    const parents = partOf.filter(([source]) => source === id).map(([, target]) => target);
    if (record.type === "product" && parents.length > 0) {
      emitter.emit("hierarchy.product-parent.invalid", "The Product root cannot have a part-of parent.", {
        artifact: unit.artifact,
        record_id: id,
      });
    }
    if (
      record.type === "domain" &&
      (parents.length !== 1 || byId.get(parents[0] ?? "")?.declaration.type !== "product")
    ) {
      emitter.emit("hierarchy.domain-parent.invalid", "A Domain must have one Product parent.", {
        artifact: unit.artifact,
        record_id: id,
      });
    }
    if (
      record.type === "capability" &&
      (parents.length !== 1 || byId.get(parents[0] ?? "")?.declaration.type !== "domain")
    ) {
      emitter.emit("hierarchy.capability-parent.invalid", "A Capability must have exactly one Domain parent.", {
        artifact: unit.artifact,
        record_id: id,
      });
    }
    if (!["product", "domain", "capability"].includes(String(record.type)) && parents.length > 0) {
      emitter.emit(
        "hierarchy.participation.unsupported",
        "This core body contract does not define part-of hierarchy participation.",
        { artifact: unit.artifact, record_id: id },
      );
    }
  }

  const ids = records.map((unit) => String(unit.declaration.id));
  if (hasCycle(ids, partOf)) emitter.emit("hierarchy.part-of.cycle", "The record part-of graph contains a cycle.");
  for (const unit of records) {
    if (!["domain", "capability"].includes(String(unit.declaration.type))) continue;
    const id = String(unit.declaration.id);
    let cursor = id;
    const visited = new Set<string>();
    while (cursor !== bundle.product_record && !visited.has(cursor)) {
      visited.add(cursor);
      const parent = partOf.find(([source]) => source === cursor)?.[1];
      if (parent === undefined) break;
      cursor = parent;
    }
    if (cursor !== bundle.product_record) {
      emitter.emit("hierarchy.product-unreachable", "The record does not reach the Product root.", {
        artifact: unit.artifact,
        record_id: id,
      });
    }
  }
}

function resolveEntity(
  byId: Map<string, RecordUnit>,
  reference: unknown,
): { record: RecordUnit; entity: Record<string, any> } | null {
  const object = asObject(reference);
  if (object === null) return null;
  const record = byId.get(String(object.record));
  if (record === undefined) return null;
  const entity = values<Record<string, any>>(record.declaration.entities).find(
    (candidate) => candidate.id === object.entity,
  );
  return entity === undefined ? null : { record, entity };
}

export function validateRecordContracts(
  records: RecordUnit[],
  inScope: Set<string>,
  executable: Record<string, any>,
  emitter: RuleEmitter,
): void {
  const byId = new Map(records.map((unit) => [String(unit.declaration.id), unit]));
  const relationshipTypes = executable.vocabularies?.entity_relationship_types ?? {};
  const bindingKinds = executable.vocabularies?.binding_kinds ?? {};
  const partOfEdges: Array<[string, string]> = [];
  for (const unit of records) {
    const record = unit.declaration;
    const id = String(record.id);
    if (!inScope.has(id)) continue;
    const sections = values<Record<string, any>>(record.sections);
    const sectionIds = new Set(sections.map((section) => String(section.id)));
    for (const index of duplicateIndexes(sections, (section) => String(section.id))) {
      emitter.emit("section.id.duplicate", "A section ID is duplicated in the record.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: `/sections/${index}/id`,
      });
    }
    const body = executable.body_contracts?.[record.body_contract];
    if (body === undefined) {
      emitter.emit("body.unsupported", "The body contract is unsupported.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: "/body_contract",
      });
    } else {
      if (body.type !== record.type) {
        emitter.emit("body.type-mismatch", "The record type does not match its body contract.", {
          artifact: unit.artifact,
          record_id: id,
          instance_pointer: "/body_contract",
        });
      }
      const allowedRoles = new Set(executable.vocabularies?.section_roles?.allowed_by_body?.[record.body_contract] ?? []);
      const requiredResponsibilities = new Set<string>(body.required_responsibilities ?? []);
      const observedResponsibilities = new Set<string>();
      sections.forEach((section, index) => {
        if (!["accepted-meaning", "proposal", "unresolved", "evidence"].includes(section.authority)) {
          emitter.emit("section.authority.unsupported", "The section authority is unsupported.", {
            artifact: unit.artifact,
            record_id: id,
            instance_pointer: `/sections/${index}/authority`,
            source_section: section.id,
          });
        }
        if (!allowedRoles.has(section.role)) {
          emitter.emit("section.role.unsupported", "The section role is unsupported for this body contract.", {
            artifact: unit.artifact,
            record_id: id,
            instance_pointer: `/sections/${index}/role`,
            source_section: section.id,
          });
        }
        if (section.role === "unresolved" && section.authority !== "unresolved") {
          emitter.emit("section.unresolved.authority-mismatch", "An unresolved section role requires unresolved authority.", {
            artifact: unit.artifact,
            record_id: id,
            instance_pointer: `/sections/${index}/authority`,
            source_section: section.id,
          });
        }
        const responsibilities = values<string>(section.responsibilities);
        if (section.role === "content" && responsibilities.length > 0) {
          emitter.emit("section.content.responsibility-forbidden", "A content section cannot carry body responsibilities.", {
            artifact: unit.artifact,
            record_id: id,
            instance_pointer: `/sections/${index}/responsibilities`,
            source_section: section.id,
          });
        }
        responsibilities.forEach((responsibility, responsibilityIndex) => {
          if (!requiredResponsibilities.has(responsibility)) {
            emitter.emit("body.responsibility.unsupported", "The body responsibility is unsupported.", {
              artifact: unit.artifact,
              record_id: id,
              instance_pointer: `/sections/${index}/responsibilities/${responsibilityIndex}`,
              source_section: section.id,
            });
          } else {
            observedResponsibilities.add(responsibility);
          }
        });
      });
      for (const responsibility of requiredResponsibilities) {
        if (!observedResponsibilities.has(responsibility)) {
          emitter.emit("body.responsibility.missing", "A required body responsibility is not bound.", {
            artifact: unit.artifact,
            record_id: id,
            instance_pointer: "/sections",
          });
        }
      }
    }
    if (record.type === "product" && record.governance?.lifecycle !== "living") {
      emitter.emit("governance.product.lifecycle", "The Product root must be living.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: "/governance/lifecycle",
      });
    }
    if (
      record.type === "decision" &&
      record.governance?.status === "accepted" &&
      record.governance?.lifecycle !== "immutable"
    ) {
      emitter.emit("governance.decision.lifecycle", "An accepted Decision must be immutable.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: "/governance/lifecycle",
      });
    }

    const provenance = asObject(record.provenance);
    const sources = values<Record<string, any>>(provenance?.sources);
    for (const index of duplicateIndexes(sources, (source) => typeof source.id === "string" ? source.id : null)) {
      emitter.emit("provenance.source-id.duplicate", "A provenance source ID is duplicated.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: `/provenance/sources/${index}/id`,
      });
    }
    if (
      provenance?.primary_observation !== undefined &&
      !sectionIds.has(provenance.primary_observation.source_section)
    ) {
      emitter.emit("provenance.observation-section.unresolved", "The primary observation section does not resolve.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: "/provenance/primary_observation/source_section",
      });
    }
    if (
      record.body_contract === "nkf.evidence" &&
      sources.length === 0 &&
      provenance?.primary_observation === undefined
    ) {
      emitter.emit("evidence.provenance.missing", "An Evidence record requires a source or primary observation.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: "/provenance",
      });
    }

    const authorities = values<Record<string, any>>(record.external_authorities);
    for (const index of duplicateIndexes(authorities, (authority) => String(authority.id))) {
      emitter.emit("external-authority.id.duplicate", "An external-authority ID is duplicated.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: `/external_authorities/${index}/id`,
      });
    }
    authorities.forEach((authority, index) => {
      if (!sectionIds.has(authority.source_section)) {
        emitter.emit("external-authority.section.unresolved", "The external-authority source section does not resolve.", {
          artifact: unit.artifact,
          record_id: id,
          instance_pointer: `/external_authorities/${index}/source_section`,
        });
      }
    });

    const entities = values<Record<string, any>>(record.entities);
    for (const index of duplicateIndexes(entities, (entity) => String(entity.id))) {
      emitter.emit("entity.id.duplicate", "An entity ID is duplicated.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: `/entities/${index}/id`,
      });
    }
    entities.forEach((entity, index) => {
      const kind = executable.vocabularies?.entity_kinds?.[entity.kind];
      if (kind === undefined || !values<string>(kind.allowed_by).includes(record.body_contract)) {
        emitter.emit("entity.kind.unsupported", "The entity kind is unsupported for this body contract.", {
          artifact: unit.artifact,
          record_id: id,
          instance_pointer: `/entities/${index}/kind`,
        });
      }
      if (!sectionIds.has(entity.defining_section)) {
        emitter.emit("entity.section.unresolved", "The entity defining section does not resolve.", {
          artifact: unit.artifact,
          record_id: id,
          instance_pointer: `/entities/${index}/defining_section`,
        });
      }
    });

    const entityRelationships = values<Record<string, any>>(record.entity_relationships);
    for (const index of duplicateIndexes(entityRelationships, (relationship) => jcs(relationship))) {
      emitter.emit("entity-relationship.duplicate", "An exact entity relationship is duplicated.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: `/entity_relationships/${index}`,
      });
    }
    entityRelationships.forEach((relationship, index) => {
      const pointer = `/entity_relationships/${index}`;
      const sourceObject = asObject(relationship.source);
      const targetObject = asObject(relationship.target);
      const sourceRecord = sourceObject === null ? undefined : byId.get(String(sourceObject.record));
      const targetRecord = targetObject === null ? undefined : byId.get(String(targetObject.record));
      if (sourceRecord === undefined) emitter.emit("entity-reference.record.unresolved", "The source entity record does not resolve.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/source/record` });
      else if (resolveEntity(byId, relationship.source) === null) emitter.emit("entity-reference.entity.unresolved", "The source entity does not resolve.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/source/entity` });
      if (targetRecord === undefined) emitter.emit("entity-reference.record.unresolved", "The target entity record does not resolve.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/target/record` });
      else if (resolveEntity(byId, relationship.target) === null) emitter.emit("entity-reference.entity.unresolved", "The target entity does not resolve.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/target/entity` });
      const typeRule = relationshipTypes[relationship.type];
      if (typeRule === undefined) emitter.emit("entity-relationship.type.unsupported", "The entity relationship type is unsupported.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/type` });
      if (!sectionIds.has(relationship.source_section)) emitter.emit("entity-relationship.section.unresolved", "The entity relationship source section does not resolve.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/source_section` });
      if (sourceObject?.record !== id) emitter.emit("entity-relationship.source-owner.invalid", "The relationship source entity must belong to the declaring record.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/source/record` });
      if (jcs(relationship.source) === jcs(relationship.target)) emitter.emit("entity-relationship.self", "An entity relationship cannot target itself.", { artifact: unit.artifact, record_id: id, instance_pointer: pointer });
      if (relationship.type === "part-of" && sourceObject !== null && targetObject !== null) {
        partOfEdges.push([jcs(sourceObject), jcs(targetObject)]);
      }
      const sourceResolved = resolveEntity(byId, relationship.source);
      const targetResolved = resolveEntity(byId, relationship.target);
      if (
        typeRule !== undefined &&
        ((typeRule.source_body !== undefined && sourceRecord?.declaration.body_contract !== typeRule.source_body) ||
          (typeRule.source_kind !== undefined && sourceResolved?.entity.kind !== typeRule.source_kind) ||
          (Array.isArray(typeRule.source_kinds) && !typeRule.source_kinds.includes(sourceResolved?.entity.kind)) ||
          (Array.isArray(typeRule.target_kinds) && !typeRule.target_kinds.includes(targetResolved?.entity.kind)))
      ) {
        emitter.emit("entity-relationship.type-constraint", "The relationship violates its type constraints.", {
          artifact: unit.artifact,
          record_id: id,
          instance_pointer: pointer,
        });
      }
    });
    const bindings = values<Record<string, any>>(record.bindings);
    for (const index of duplicateIndexes(bindings, (binding) => jcs(binding))) {
      emitter.emit("binding.duplicate", "An exact realization binding is duplicated.", {
        artifact: unit.artifact,
        record_id: id,
        instance_pointer: `/bindings/${index}`,
      });
    }
    bindings.forEach((binding, index) => {
      const pointer = `/bindings/${index}`;
      if (!(binding.kind in bindingKinds)) emitter.emit("binding.kind.unsupported", "The binding kind is unsupported.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/kind` });
      if (resolveEntity(byId, binding.entity) === null) emitter.emit("binding.entity.unresolved", "The bound semantic entity does not resolve.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/entity` });
      const realization = byId.get(String(binding.realization));
      if (realization === undefined) emitter.emit("binding.realization.unresolved", "The realization record does not resolve.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/realization` });
      if (binding.realization !== id || record.body_contract !== "nkf.realization") emitter.emit("binding.realization-owner.invalid", "A binding must be owned by its declaring Realization record.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/realization` });
      if (!sectionIds.has(binding.source_section)) emitter.emit("binding.section.unresolved", "The binding source section does not resolve.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/source_section` });
      if (binding.locator === undefined && binding.resolution_rule === undefined) emitter.emit("binding.locator.missing", "A binding requires a locator or resolution rule.", { artifact: unit.artifact, record_id: id, instance_pointer: pointer });
      if (
        binding.external_authority !== undefined &&
        !authorities.some((authority) => authority.id === binding.external_authority)
      ) {
        emitter.emit("binding.external-authority.unresolved", "The binding external authority does not resolve.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/external_authority` });
      }
      if (binding.kind === "provider" && binding.external_authority === undefined) {
        emitter.emit("binding.provider-authority.missing", "A provider binding requires an external authority.", { artifact: unit.artifact, record_id: id, instance_pointer: `${pointer}/external_authority` });
      }
    });
  }
  if (hasCycle([...new Set(partOfEdges.flat())], partOfEdges)) {
    emitter.emit(
      "entity-relationship.part-of.cycle",
      "The in-scope entity part-of graph contains a cycle.",
    );
  }
}

export function attachCoreVocabularies(records: RecordUnit[], executable: Record<string, any>): void {
  for (const unit of records) {
    Object.defineProperty(unit.declaration, "__vocab_relationships", {
      value: executable.vocabularies?.record_relationship_types ?? {},
      enumerable: false,
      configurable: true,
    });
  }
}
