// HAG-RAP V.2 — PROVENANCE MODULE
// Cross-cutting, append-oriented provenance tracking

import type { ProvenanceId, ResearchCaseId } from '../core/index.ts';

// ============================================================
// PROVENANCE RECORD
// ============================================================

export interface ProvenanceRecord {
  readonly id: ProvenanceId;
  readonly caseId: ResearchCaseId;
  readonly entityType: string;
  readonly entityId: string;
  readonly producedBy: string; // WHO/WHAT produced this
  readonly producedAt: string; // WHEN (ISO)
  readonly fromInputs: string[]; // FROM WHICH INPUTS
  readonly method: string; // USING WHICH METHOD
  readonly version: string; // UNDER WHICH VERSION
  readonly assumptions: string[]; // UNDER WHICH ASSUMPTIONS
  readonly humanIntervention: string | null; // WITH WHICH HUMAN INTERVENTION
  readonly supersedes: string | null; // WHAT DID IT SUPERSEDE
  readonly changeReason: string | null; // WHY DID IT CHANGE
  readonly appendOnly: true; // IMMUTABLE
}

// ============================================================
// PROVENANCE FACTORY
// ============================================================

export interface CreateProvenanceInput {
  caseId: ResearchCaseId;
  entityType: string;
  entityId: string;
  producedBy: string;
  fromInputs: string[];
  method: string;
  version: string;
  assumptions: string[];
  humanIntervention: string | null;
  supersedes: string | null;
  changeReason: string | null;
}

export function createProvenanceRecord(
  id: ProvenanceId,
  input: CreateProvenanceInput,
  clock: { now(): string }
): ProvenanceRecord {
  if (!input.producedBy || input.producedBy.trim().length === 0) {
    throw new Error('Provenance requires a producer');
  }
  if (!input.method || input.method.trim().length === 0) {
    throw new Error('Provenance requires a method');
  }
  return Object.freeze({
    id,
    caseId: input.caseId,
    entityType: input.entityType,
    entityId: input.entityId,
    producedBy: input.producedBy,
    producedAt: clock.now(),
    fromInputs: [...input.fromInputs],
    method: input.method,
    version: input.version,
    assumptions: [...input.assumptions],
    humanIntervention: input.humanIntervention,
    supersedes: input.supersedes,
    changeReason: input.changeReason,
    appendOnly: true,
  });
}

// ============================================================
// PROVENANCE REPOSITORY (APPEND-ONLY)
// ============================================================

export interface ProvenanceRepository {
  append(record: ProvenanceRecord): void;
  findByEntity(entityType: string, entityId: string, caseId: ResearchCaseId): ProvenanceRecord[];
  findByCase(caseId: ResearchCaseId): ProvenanceRecord[];
  // NO UPDATE. NO DELETE. Append-only.
}

// ============================================================
// PROVENANCE VALIDATION
// ============================================================

export function validateProvenanceRecord(record: Record<string, unknown>): boolean {
  if (typeof record !== 'object' || record === null) return false;
  if (typeof record.id !== 'string') return false;
  if (typeof record.caseId !== 'string') return false;
  if (typeof record.entityType !== 'string') return false;
  if (typeof record.entityId !== 'string') return false;
  if (typeof record.producedBy !== 'string' || (record.producedBy as string).trim().length === 0) return false;
  if (typeof record.method !== 'string' || (record.method as string).trim().length === 0) return false;
  if (!Array.isArray(record.fromInputs)) return false;
  if (!Array.isArray(record.assumptions)) return false;
  return true;
}
