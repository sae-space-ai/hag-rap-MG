// HAG-RAP V.2 — EXPERIMENTS MODULE
// Experiment framework (distinct from software tests)

import type { ResearchCaseId, ExperimentId } from '../core/index.ts';

// ============================================================
// EXPERIMENT TYPES
// ============================================================

export interface ExperimentDesign {
  readonly id: ExperimentId;
  readonly caseId: ResearchCaseId;
  readonly name: string;
  readonly hypothesis: string;
  readonly protocol: string;
  readonly successCriteria: string[];
  readonly status: 'DESIGNED' | 'APPROVED' | 'RUNNING' | 'COMPLETED' | 'FAILED';
}

export interface ExperimentResult {
  readonly experimentId: ExperimentId;
  readonly metrics: Record<string, number>;
  readonly passed: boolean;
  readonly notes: string;
  readonly executedAt: string;
  // Software test PASS ≠ Scientific experiment success
}

// ============================================================
// INVARIANT
// ============================================================

export function assertExperimentNotSoftwareTest(result: ExperimentResult): string {
  return `Experiment ${result.experimentId}: Software test semantics do not apply to scientific experiments`;
}
