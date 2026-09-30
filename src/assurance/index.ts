// HAG-RAP V.2 — ASSURANCE MODULE (CONTRACT ONLY)
// Future assurance interfaces — NOT IMPLEMENTED in ORDER 0

import type { ResearchCaseId } from '../core/index.ts';

// ============================================================
// ASSURANCE TYPES (FUTURE)
// ============================================================

export interface AssuranceProperty {
  readonly name: string;
  readonly description: string;
  readonly caseId: ResearchCaseId;
  readonly verified: boolean;
}

export interface Invariant {
  readonly name: string;
  readonly expression: string;
  readonly caseId: ResearchCaseId;
  readonly holds: boolean | null; // null = not yet checked
}

export interface ConstraintCheck {
  readonly constraintId: string;
  readonly satisfied: boolean;
  readonly evidence: string[];
  readonly checkedAt: string;
}

export interface RuntimeMonitor {
  readonly name: string;
  readonly condition: string;
  readonly status: 'OK' | 'VIOLATED' | 'UNKNOWN';
  readonly lastChecked: string;
}

export interface Hazard {
  readonly id: string;
  readonly description: string;
  readonly severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  readonly controls: string[];
  readonly residualRisk: string;
}

export interface Control {
  readonly id: string;
  readonly hazardId: string;
  readonly description: string;
  readonly effectiveness: 'EFFECTIVE' | 'PARTIAL' | 'INEFFECTIVE' | 'UNKNOWN';
}

export interface AssuranceEvidence {
  readonly property: string;
  readonly evidence: string[];
  readonly verified: boolean;
  // ORDER 0 must not falsely claim formal verification
}

export interface VerificationResult {
  readonly property: string;
  readonly result: 'VERIFIED' | 'NOT_VERIFIED' | 'UNKNOWN';
  readonly method: string;
  readonly evidence: string[];
}

// ============================================================
// ASSURANCE ENGINE STATUS
// ============================================================

export const ASSURANCE_ENGINE_STATUS = 'NOT_IMPLEMENTED' as const;
