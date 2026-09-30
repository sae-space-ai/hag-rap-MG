// HAG-RAP V.2 — EVALUATION MODULE (CONTRACT ONLY)
// Future evaluation interfaces — NOT IMPLEMENTED in ORDER 0
// CRITICAL: Software test ≠ Scientific experiment

import type { ResearchCaseId, ExperimentId } from '../core/index.ts';

// ============================================================
// EVALUATION TYPES (FUTURE)
// ============================================================

export interface Benchmark {
  readonly name: string;
  readonly description: string;
  readonly metrics: string[];
}

export interface Baseline {
  readonly name: string;
  readonly results: Record<string, number>;
  readonly timestamp: string;
}

export interface Experiment {
  readonly id: ExperimentId;
  readonly caseId: ResearchCaseId;
  readonly name: string;
  readonly protocol: string;
  readonly benchmark: string;
  readonly baseline: string | null;
  readonly status: 'DESIGNED' | 'READY' | 'RUNNING' | 'COMPLETED' | 'FAILED';
}

export interface ExperimentRun {
  readonly experimentId: ExperimentId;
  readonly runNumber: number;
  readonly results: Record<string, number>;
  readonly timestamp: string;
  // A passing unit test cannot satisfy a scientific performance target
}

export interface Metric {
  readonly name: string;
  readonly description: string;
  readonly unit: string;
  readonly higherIsBetter: boolean;
}

export interface MetricResult {
  readonly metric: string;
  readonly value: number;
  readonly confidence: number | null;
  readonly sampleSize: number;
}

export interface Ablation {
  readonly component: string;
  readonly withComponent: MetricResult;
  readonly withoutComponent: MetricResult;
  readonly delta: number;
}

export interface Perturbation {
  readonly description: string;
  readonly originalResult: MetricResult;
  readonly perturbedResult: MetricResult;
  readonly robustness: number;
}

export interface ValidationProtocol {
  readonly name: string;
  readonly steps: string[];
  readonly successCriteria: string[];
}

export interface ValidationEvidence {
  readonly protocol: string;
  readonly passed: boolean;
  readonly evidence: string[];
  // Scientific targets require executed experimental protocols
}

// ============================================================
// EVALUATION ENGINE STATUS
// ============================================================

export const EVALUATION_ENGINE_STATUS = 'NOT_IMPLEMENTED' as const;

// ============================================================
// INVARIANT: Software test PASS ≠ Scientific validation
// ============================================================

export function assertTestNotScientificValidation(testPassed: boolean): string {
  if (testPassed) {
    return 'Software test PASS does not imply scientific target achieved';
  }
  return 'Software test FAIL — implementation issue';
}
