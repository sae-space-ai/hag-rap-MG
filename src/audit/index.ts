// HAG-RAP V.2 — AUDIT MODULE
// Append-oriented audit — not ordinary application logging

import type { AuditEventId, ResearchCaseId } from '../core/index.ts';

// ============================================================
// AUDIT EVENT
// ============================================================

export type AuditEventType =
  | 'CASE_CREATED'
  | 'CASE_TRANSITIONED'
  | 'EVIDENCE_ADDED'
  | 'CLAIM_CREATED'
  | 'CLAIM_SUPERSEDED'
  | 'REASONING_EXECUTED'
  | 'CAUSAL_QUERY'
  | 'ABSTRACTION_PERFORMED'
  | 'WORLD_MODEL_UPDATED'
  | 'PLAN_CREATED'
  | 'PLAN_EVALUATED'
  | 'PLAN_DEVIATED'
  | 'PLAN_REPAIRED'
  | 'PLAN_REVISED'
  | 'HUMAN_INTERVENTION'
  | 'AUTHORITY_DECISION'
  | 'AUTHORITY_VIOLATION'
  | 'SIMULATION_EXECUTED'
  | 'EXPERIMENT_RUN'
  | 'IMPORT'
  | 'EXPORT'
  | 'SECURITY_EVENT';

export interface AuditEvent {
  readonly id: AuditEventId;
  readonly caseId: ResearchCaseId;
  readonly eventType: AuditEventType;
  readonly actor: string;
  readonly actorType: 'HUMAN' | 'AI' | 'SYSTEM';
  readonly timestamp: string;
  readonly details: Record<string, unknown>;
  readonly inputSnapshot: Record<string, unknown> | null;
  readonly outputSnapshot: Record<string, unknown> | null;
  readonly supersedes: AuditEventId | null; // null for new events
  readonly appendOnly: true; // IMMUTABLE
}

// ============================================================
// AUDIT FACTORY
// ============================================================

export function createAuditEvent(
  id: AuditEventId,
  caseId: ResearchCaseId,
  eventType: AuditEventType,
  actor: string,
  actorType: 'HUMAN' | 'AI' | 'SYSTEM',
  clock: { now(): string },
  details: Record<string, unknown> = {},
  inputSnapshot: Record<string, unknown> | null = null,
  outputSnapshot: Record<string, unknown> | null = null
): AuditEvent {
  return Object.freeze({
    id,
    caseId,
    eventType,
    actor,
    actorType,
    timestamp: clock.now(),
    details,
    inputSnapshot,
    outputSnapshot,
    supersedes: null,
    appendOnly: true,
  });
}

// ============================================================
// AUDIT REPOSITORY (APPEND-ONLY)
// ============================================================

export interface AuditRepository {
  append(event: AuditEvent): void;
  findByCase(caseId: ResearchCaseId): AuditEvent[];
  findByType(caseId: ResearchCaseId, eventType: AuditEventType): AuditEvent[];
  // NO UPDATE. NO DELETE. Append-only.
  // Audit event cannot rewrite earlier audit event
}

// ============================================================
// AUDIT INVARIANTS
// ============================================================

export function assertAuditAppendOnly(): void {
  // The audit repository interface only exposes append.
  // There is no update or delete method.
  // This is enforced by the interface contract.
}

export function validateAuditEvent(event: Record<string, unknown>): boolean {
  if (typeof event !== 'object' || event === null) return false;
  if (typeof event.id !== 'string') return false;
  if (typeof event.caseId !== 'string') return false;
  if (typeof event.eventType !== 'string') return false;
  if (typeof event.actor !== 'string') return false;
  if (typeof event.actorType !== 'string') return false;
  if (typeof event.timestamp !== 'string') return false;
  return true;
}
