// HAG-RAP V.2 — CORE MODULE
// Canonical IDs, branded types, domain errors, deterministic clock

// ============================================================
// BRANDED ID TYPES
// ============================================================

declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

export type ResearchCaseId = Brand<string, 'ResearchCaseId'>;
export type SourceId = Brand<string, 'SourceId'>;
export type EvidenceId = Brand<string, 'EvidenceId'>;
export type ClaimId = Brand<string, 'ClaimId'>;
export type AssumptionId = Brand<string, 'AssumptionId'>;
export type UncertaintyId = Brand<string, 'UncertaintyId'>;
export type ContradictionId = Brand<string, 'ContradictionId'>;
export type InferenceId = Brand<string, 'InferenceId'>;
export type ReasoningRunId = Brand<string, 'ReasoningRunId'>;
export type CausalModelId = Brand<string, 'CausalModelId'>;
export type ConceptId = Brand<string, 'ConceptId'>;
export type AbstractionId = Brand<string, 'AbstractionId'>;
export type WorldModelId = Brand<string, 'WorldModelId'>;
export type WorldStateId = Brand<string, 'WorldStateId'>;
export type GoalId = Brand<string, 'GoalId'>;
export type ConstraintId = Brand<string, 'ConstraintId'>;
export type PlanId = Brand<string, 'PlanId'>;
export type PlanVersionId = Brand<string, 'PlanVersionId'>;
export type HumanDecisionId = Brand<string, 'HumanDecisionId'>;
export type AuthorityPolicyId = Brand<string, 'AuthorityPolicyId'>;
export type SimulationRunId = Brand<string, 'SimulationRunId'>;
export type ExperimentId = Brand<string, 'ExperimentId'>;
export type AuditEventId = Brand<string, 'AuditEventId'>;
export type ProvenanceId = Brand<string, 'ProvenanceId'>;
export type AgentId = Brand<string, 'AgentId'>;
export type SecurityFindingId = Brand<string, 'SecurityFindingId'>;

// ============================================================
// ID FACTORY — deterministic for testing
// ============================================================

export interface IdGenerator {
  nextResearchCaseId(): ResearchCaseId;
  nextSourceId(): SourceId;
  nextEvidenceId(): EvidenceId;
  nextClaimId(): ClaimId;
  nextAssumptionId(): AssumptionId;
  nextUncertaintyId(): UncertaintyId;
  nextContradictionId(): ContradictionId;
  nextInferenceId(): InferenceId;
  nextReasoningRunId(): ReasoningRunId;
  nextCausalModelId(): CausalModelId;
  nextConceptId(): ConceptId;
  nextAbstractionId(): AbstractionId;
  nextWorldModelId(): WorldModelId;
  nextWorldStateId(): WorldStateId;
  nextGoalId(): GoalId;
  nextConstraintId(): ConstraintId;
  nextPlanId(): PlanId;
  nextPlanVersionId(): PlanVersionId;
  nextHumanDecisionId(): HumanDecisionId;
  nextAuthorityPolicyId(): AuthorityPolicyId;
  nextSimulationRunId(): SimulationRunId;
  nextExperimentId(): ExperimentId;
  nextAuditEventId(): AuditEventId;
  nextProvenanceId(): ProvenanceId;
  nextAgentId(): AgentId;
  nextSecurityFindingId(): SecurityFindingId;
}

let counter = 0;

function makeId<T>(prefix: string): T {
  counter++;
  return `${prefix}-${counter}` as unknown as T;
}

export function createIdGenerator(): IdGenerator {
  return {
    nextResearchCaseId: () => makeId<ResearchCaseId>('RC'),
    nextSourceId: () => makeId<SourceId>('SRC'),
    nextEvidenceId: () => makeId<EvidenceId>('EVD'),
    nextClaimId: () => makeId<ClaimId>('CLM'),
    nextAssumptionId: () => makeId<AssumptionId>('ASM'),
    nextUncertaintyId: () => makeId<UncertaintyId>('UNC'),
    nextContradictionId: () => makeId<ContradictionId>('CTR'),
    nextInferenceId: () => makeId<InferenceId>('INF'),
    nextReasoningRunId: () => makeId<ReasoningRunId>('RR'),
    nextCausalModelId: () => makeId<CausalModelId>('CM'),
    nextConceptId: () => makeId<ConceptId>('CON'),
    nextAbstractionId: () => makeId<AbstractionId>('ABS'),
    nextWorldModelId: () => makeId<WorldModelId>('WM'),
    nextWorldStateId: () => makeId<WorldStateId>('WS'),
    nextGoalId: () => makeId<GoalId>('G'),
    nextConstraintId: () => makeId<ConstraintId>('CST'),
    nextPlanId: () => makeId<PlanId>('PL'),
    nextPlanVersionId: () => makeId<PlanVersionId>('PV'),
    nextHumanDecisionId: () => makeId<HumanDecisionId>('HD'),
    nextAuthorityPolicyId: () => makeId<AuthorityPolicyId>('AP'),
    nextSimulationRunId: () => makeId<SimulationRunId>('SR'),
    nextExperimentId: () => makeId<ExperimentId>('EXP'),
    nextAuditEventId: () => makeId<AuditEventId>('AE'),
    nextProvenanceId: () => makeId<ProvenanceId>('PRV'),
    nextAgentId: () => makeId<AgentId>('AGT'),
    nextSecurityFindingId: () => makeId<SecurityFindingId>('SF'),
  };
}

export function resetIdCounter(): void {
  counter = 0;
}

// ============================================================
// DETERMINISTIC CLOCK
// ============================================================

export interface Clock {
  now(): string; // ISO string
  advance(ms: number): void;
  set(iso: string): void;
}

export function createDeterministicClock(initialIso: string = '2026-01-01T00:00:00.000Z'): Clock {
  let current = new Date(initialIso);
  return {
    now: () => current.toISOString(),
    advance: (ms: number) => {
      current = new Date(current.getTime() + ms);
    },
    set: (iso: string) => {
      current = new Date(iso);
    },
  };
}

// ============================================================
// DOMAIN ERRORS
// ============================================================

export class DomainError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
  }
}

export class NotFoundError extends DomainError {
  constructor(entityType: string, id: string) {
    super('NOT_FOUND', `${entityType} not found: ${id}`);
    this.name = 'NotFoundError';
  }
}

export class InvalidReferenceError extends DomainError {
  constructor(message: string) {
    super('INVALID_REFERENCE', message);
    this.name = 'InvalidReferenceError';
  }
}

export class CaseIsolationViolationError extends DomainError {
  constructor(message: string) {
    super('CASE_ISOLATION_VIOLATION', message);
    this.name = 'CaseIsolationViolationError';
  }
}

export class AuthorityViolationError extends DomainError {
  constructor(message: string) {
    super('AUTHORITY_VIOLATION', message);
    this.name = 'AuthorityViolationError';
  }
}

export class InvariantViolationError extends DomainError {
  constructor(message: string) {
    super('INVARIANT_VIOLATION', message);
    this.name = 'InvariantViolationError';
  }
}

export class InvalidTransitionError extends DomainError {
  constructor(entityType: string, from: string, to: string) {
    super('INVALID_TRANSITION', `Invalid transition for ${entityType}: ${from} → ${to}`);
    this.name = 'InvalidTransitionError';
  }
}

export class InsufficientEvidenceError extends DomainError {
  constructor(message: string) {
    super('INSUFFICIENT_EVIDENCE', message);
    this.name = 'InsufficientEvidenceError';
  }
}

export class UnsupportedOperationError extends DomainError {
  constructor(message: string) {
    super('UNSUPPORTED_OPERATION', message);
    this.name = 'UnsupportedOperationError';
  }
}

export class ImportValidationError extends DomainError {
  constructor(message: string) {
    super('IMPORT_VALIDATION_ERROR', message);
    this.name = 'ImportValidationError';
  }
}

// ============================================================
// SCIENTIFIC STATUS
// ============================================================

export type ImplementationStatus =
  | 'IMPLEMENTED'
  | 'EXECUTED'
  | 'TESTED'
  | 'VERIFIED'
  | 'SCIENTIFICALLY_EVALUATED'
  | 'NOT_IMPLEMENTED'
  | 'NOT_EXECUTED'
  | 'NOT_VERIFIED'
  | 'TARGET_NOT_YET_EXECUTED'
  | 'UNKNOWN';

// ============================================================
// EXECUTION MODE
// ============================================================

export type ExecutionMode = 'REAL' | 'SIMULATED' | 'COUNTERFACTUAL' | 'PREDICTED' | 'NOT_EXECUTED';

// ============================================================
// VERSIONING
// ============================================================

export interface Versioned {
  readonly version: number;
  readonly supersedes: string | null; // ID of superseded version
  readonly supersededBy: string | null; // ID of superseding version
  readonly createdAt: string; // ISO
  readonly createdBy: string; // actor identifier
  readonly changeReason: string | null;
}

// ============================================================
// EXPORT / IMPORT CONTRACT
// ============================================================

export interface Serializable {
  toJSON(): Record<string, unknown>;
}

export interface Deserializable<T> {
  fromJSON(json: Record<string, unknown>): T;
}
