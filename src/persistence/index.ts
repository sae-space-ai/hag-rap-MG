// HAG-RAP V.2 — PERSISTENCE MODULE
// Repository interfaces + deterministic in-memory adapters

import type { ResearchCaseId, SourceId, EvidenceId, ClaimId, ProvenanceId, AuditEventId, AuthorityPolicyId, HumanDecisionId, SimulationRunId } from '../core/index.ts';
import type { CaseRepository, ResearchCase } from '../case/index.ts';
import type { EvidenceRepository, Source, EvidenceItem, Claim, EvidenceLink, EvidenceSupport, EvidenceConflict } from '../evidence/index.ts';
import type { ProvenanceRepository, ProvenanceRecord } from '../provenance/index.ts';
import type { AuditRepository, AuditEvent } from '../audit/index.ts';
import type { AuthorityRepository, AuthorityPolicy, AuthorityDecision, AuthorityViolation } from '../authority/index.ts';
import type { SimulationRepository, SimulationRun } from '../simulation/index.ts';
import { ImportValidationError, CaseIsolationViolationError } from '../core/index.ts';
import { validateImportData } from '../security/index.ts';

// ============================================================
// IN-MEMORY CASE REPOSITORY
// ============================================================

export class InMemoryCaseRepository implements CaseRepository {
  private cases: Map<string, ResearchCase> = new Map();

  save(case_: ResearchCase): void {
    this.cases.set(case_.id, case_);
  }

  findById(id: ResearchCaseId): ResearchCase | null {
    return this.cases.get(id) ?? null;
  }

  findAll(): ResearchCase[] {
    return Array.from(this.cases.values());
  }

  updateLifecycle(id: ResearchCaseId, lifecycle: ResearchCase['lifecycle'], updatedAt: string): void {
    const existing = this.cases.get(id);
    if (!existing) return;
    const updated: ResearchCase = { ...existing, lifecycle, updatedAt };
    this.cases.set(id, updated);
  }
}

// ============================================================
// IN-MEMORY EVIDENCE REPOSITORY (with case isolation)
// ============================================================

export class InMemoryEvidenceRepository implements EvidenceRepository {
  private sources: Map<string, Source> = new Map();
  private evidence: Map<string, EvidenceItem> = new Map();
  private claims: Map<string, Claim> = new Map();
  private links: EvidenceLink[] = [];
  private conflicts: EvidenceConflict[] = [];

  private compositeKey(id: string, caseId: ResearchCaseId): string {
    return `${caseId}:${id}`;
  }

  saveSource(source: Source): void {
    this.sources.set(this.compositeKey(source.id, source.caseId), source);
  }

  findSourceById(id: SourceId, caseId: ResearchCaseId): Source | null {
    return this.sources.get(this.compositeKey(id, caseId)) ?? null;
  }

  saveEvidence(evidence: EvidenceItem): void {
    this.evidence.set(this.compositeKey(evidence.id, evidence.caseId), evidence);
  }

  findEvidenceById(id: EvidenceId, caseId: ResearchCaseId): EvidenceItem | null {
    return this.evidence.get(this.compositeKey(id, caseId)) ?? null;
  }

  saveClaim(claim: Claim): void {
    this.claims.set(this.compositeKey(claim.id, claim.caseId), claim);
  }

  findClaimById(id: ClaimId, caseId: ResearchCaseId): Claim | null {
    return this.claims.get(this.compositeKey(id, caseId)) ?? null;
  }

  addLink(link: EvidenceLink): void {
    this.links.push(link);
  }

  getSupport(claimId: ClaimId, caseId: ResearchCaseId): EvidenceSupport {
    const relevantLinks = this.links.filter(l => l.claimId === claimId && l.caseId === caseId);
    return {
      claimId,
      caseId,
      supportingEvidence: relevantLinks.filter(l => l.linkType === 'SUPPORTS').map(l => l.evidenceId),
      contradictingEvidence: relevantLinks.filter(l => l.linkType === 'CONTRADICTS').map(l => l.evidenceId),
    };
  }

  recordConflict(conflict: EvidenceConflict): void {
    this.conflicts.push(conflict);
  }
}

// ============================================================
// IN-MEMORY PROVENANCE REPOSITORY (APPEND-ONLY)
// ============================================================

export class InMemoryProvenanceRepository implements ProvenanceRepository {
  private records: ProvenanceRecord[] = [];

  append(record: ProvenanceRecord): void {
    this.records.push(record);
  }

  findByEntity(entityType: string, entityId: string, caseId: ResearchCaseId): ProvenanceRecord[] {
    return this.records.filter(r =>
      r.entityType === entityType && r.entityId === entityId && r.caseId === caseId
    );
  }

  findByCase(caseId: ResearchCaseId): ProvenanceRecord[] {
    return this.records.filter(r => r.caseId === caseId);
  }
}

// ============================================================
// IN-MEMORY AUDIT REPOSITORY (APPEND-ONLY)
// ============================================================

export class InMemoryAuditRepository implements AuditRepository {
  private events: AuditEvent[] = [];

  append(event: AuditEvent): void {
    // Verify append-only: no event with same ID exists
    if (this.events.some(e => e.id === event.id)) {
      throw new Error('Audit event with this ID already exists — append-only violation');
    }
    this.events.push(event);
  }

  findByCase(caseId: ResearchCaseId): AuditEvent[] {
    return this.events.filter(e => e.caseId === caseId);
  }

  findByType(caseId: ResearchCaseId, eventType: AuditEvent['eventType']): AuditEvent[] {
    return this.events.filter(e => e.caseId === caseId && e.eventType === eventType);
  }
}

// ============================================================
// IN-MEMORY AUTHORITY REPOSITORY
// ============================================================

export class InMemoryAuthorityRepository implements AuthorityRepository {
  private policies: Map<string, AuthorityPolicy> = new Map();
  private decisions: AuthorityDecision[] = [];
  private violations: AuthorityViolation[] = [];

  private compositeKey(id: string, caseId: ResearchCaseId): string {
    return `${caseId}:${id}`;
  }

  savePolicy(policy: AuthorityPolicy): void {
    this.policies.set(this.compositeKey(policy.id, policy.caseId), policy);
  }

  findPolicyById(id: AuthorityPolicyId, caseId: ResearchCaseId): AuthorityPolicy | null {
    return this.policies.get(this.compositeKey(id, caseId)) ?? null;
  }

  recordDecision(decision: AuthorityDecision): void {
    this.decisions.push(decision);
  }

  recordViolation(violation: AuthorityViolation): void {
    this.violations.push(violation);
  }

  getDecisions(policyId: AuthorityPolicyId, caseId: ResearchCaseId): AuthorityDecision[] {
    return this.decisions.filter(d => d.policyId === policyId && d.caseId === caseId);
  }

  getViolations(caseId: ResearchCaseId): AuthorityViolation[] {
    return this.violations.filter(v => v.caseId === caseId);
  }
}

// ============================================================
// IN-MEMORY SIMULATION REPOSITORY
// ============================================================

export class InMemorySimulationRepository implements SimulationRepository {
  private runs: Map<string, SimulationRun> = new Map();

  private compositeKey(id: string, caseId: ResearchCaseId): string {
    return `${caseId}:${id}`;
  }

  save(run: SimulationRun): void {
    this.runs.set(this.compositeKey(run.id, run.caseId), run);
  }

  findById(id: SimulationRunId, caseId: ResearchCaseId): SimulationRun | null {
    return this.runs.get(this.compositeKey(id, caseId)) ?? null;
  }

  findByCase(caseId: ResearchCaseId): SimulationRun[] {
    return Array.from(this.runs.values()).filter(r => r.caseId === caseId);
  }
}

// ============================================================
// EXPORT / IMPORT (ROUND-TRIP)
// ============================================================

export interface ExportData {
  version: string;
  exportedAt: string;
  cases: ResearchCase[];
  provenance: ProvenanceRecord[];
  audit: AuditEvent[];
}

export function validateExportImport(data: unknown): data is ExportData {
  const validation = validateImportData(data);
  if (!validation.valid) {
    throw new ImportValidationError(validation.reason ?? 'Invalid import data');
  }
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  if (typeof d.version !== 'string') return false;
  if (!Array.isArray(d.cases)) return false;
  if (!Array.isArray(d.provenance)) return false;
  if (!Array.isArray(d.audit)) return false;
  return true;
}

// ============================================================
// CASE ISOLATION CHECK
// ============================================================

export function assertCaseIsolation(objectCaseId: ResearchCaseId, requestedCaseId: ResearchCaseId): void {
  if (objectCaseId !== requestedCaseId) {
    throw new CaseIsolationViolationError(
      `Object belongs to case ${objectCaseId} but was requested from case ${requestedCaseId}`
    );
  }
}
