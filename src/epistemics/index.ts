// HAG-RAP V.2 — EPISTEMICS MODULE
// Foundational epistemic categories and invariants

// ============================================================
// EPISTEMIC CATEGORY
// ============================================================

export type EpistemicCategory =
  | 'OBSERVED'
  | 'SUPPORTED_FACT'
  | 'CLAIM'
  | 'ASSUMPTION'
  | 'INFERENCE'
  | 'HYPOTHESIS'
  | 'PREDICTION'
  | 'SIMULATION_RESULT'
  | 'CONTESTED'
  | 'SUPERSEDED'
  | 'UNKNOWN';

// ============================================================
// EPISTEMIC DIMENSIONS (orthogonal)
// ============================================================

export type EpistemicOrigin =
  | 'DIRECT_OBSERVATION'
  | 'DERIVED'
  | 'POSTULATED'
  | 'SIMULATED'
  | 'PREDICTED'
  | 'HUMAN_ASSERTED'
  | 'UNKNOWN';

export type ConfidenceLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';

// Note: Confidence ≠ Correctness. HIGH confidence does not imply TRUE.

export interface EpistemicStatus {
  readonly category: EpistemicCategory;
  readonly origin: EpistemicOrigin;
  readonly confidence: ConfidenceLevel;
  readonly contested: boolean;
  readonly superseded: boolean;
}

// ============================================================
// EPISTEMIC INVARIANTS
// ============================================================

export const EPISTEMIC_INVARIANTS = {
  UNKNOWN_IS_NOT_FALSE: 'UNKNOWN ≠ FALSE',
  UNKNOWN_IS_NOT_TRUE: 'UNKNOWN ≠ TRUE',
  MISSING_IS_NOT_NEGATIVE: 'MISSING ≠ NEGATIVE',
  ASSUMPTION_IS_NOT_FACT: 'ASSUMPTION ≠ FACT',
  INFERENCE_IS_NOT_OBSERVATION: 'INFERENCE ≠ OBSERVATION',
  PREDICTION_IS_NOT_OBSERVATION: 'PREDICTION ≠ OBSERVATION',
  SIMULATION_IS_NOT_REALITY: 'SIMULATION ≠ REALITY',
  CORRELATION_IS_NOT_CAUSATION: 'CORRELATION ≠ CAUSATION',
  CONSENSUS_IS_NOT_TRUTH: 'CONSENSUS ≠ TRUTH',
  CONFIDENCE_IS_NOT_CORRECTNESS: 'CONFIDENCE ≠ CORRECTNESS',
  HIGH_SCORE_IS_NOT_EVIDENCE: 'HIGH SCORE ≠ EVIDENCE',
} as const;

// ============================================================
// EPISTEMIC VALIDATION
// ============================================================

export function validateEpistemicCategory(category: string): category is EpistemicCategory {
  const valid: EpistemicCategory[] = [
    'OBSERVED', 'SUPPORTED_FACT', 'CLAIM', 'ASSUMPTION', 'INFERENCE',
    'HYPOTHESIS', 'PREDICTION', 'SIMULATION_RESULT', 'CONTESTED',
    'SUPERSEDED', 'UNKNOWN',
  ];
  return valid.includes(category as EpistemicCategory);
}

export function createEpistemicStatus(
  category: EpistemicCategory,
  origin: EpistemicOrigin,
  confidence: ConfidenceLevel = 'UNKNOWN'
): EpistemicStatus {
  return Object.freeze({
    category,
    origin,
    confidence,
    contested: false,
    superseded: false,
  });
}

export function markContested(status: EpistemicStatus): EpistemicStatus {
  return Object.freeze({ ...status, contested: true });
}

export function markSuperseded(status: EpistemicStatus): EpistemicStatus {
  return Object.freeze({ ...status, superseded: true, category: 'SUPERSEDED' });
}

// ============================================================
// EPISTEMIC DISTINCTION CHECKS
// ============================================================

export function isObservation(status: EpistemicStatus): boolean {
  return status.category === 'OBSERVED';
}

export function isInference(status: EpistemicStatus): boolean {
  return status.category === 'INFERENCE';
}

export function isAssumption(status: EpistemicStatus): boolean {
  return status.category === 'ASSUMPTION';
}

export function isUnknown(status: EpistemicStatus): boolean {
  return status.category === 'UNKNOWN';
}

export function isSimulationResult(status: EpistemicStatus): boolean {
  return status.category === 'SIMULATION_RESULT';
}

export function isPrediction(status: EpistemicStatus): boolean {
  return status.category === 'PREDICTION';
}
