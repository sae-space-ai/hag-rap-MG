// HAG-RAP V.2 — REASONING MODULE (CONTRACT ONLY)
// Future reasoning interfaces — NOT IMPLEMENTED in ORDER 0

import type { ResearchCaseId, ReasoningRunId, InferenceId, ClaimId, EvidenceId, AssumptionId } from '../core/index.ts';
import type { EpistemicStatus } from '../epistemics/index.ts';

// ============================================================
// INFERENCE FAMILY
// ============================================================

export type InferenceFamily = 'DEDUCTIVE' | 'INDUCTIVE' | 'ABDUCTIVE' | 'DEFEASIBLE' | 'CAUSAL';

// ============================================================
// REASONING RUN (FUTURE)
// ============================================================

export interface ReasoningRun {
  readonly id: ReasoningRunId;
  readonly caseId: ResearchCaseId;
  readonly family: InferenceFamily;
  readonly premises: string[]; // EvidenceId or ClaimId references
  readonly assumptions: AssumptionId[];
  readonly conclusion: ClaimId | null;
  readonly epistemicStatus: EpistemicStatus;
  readonly counterevidence: EvidenceId[];
  readonly justificationTrace: string[];
  readonly failureState: string | null;
  readonly humanReviewRequired: boolean;
  readonly humanReviewed: boolean;
  readonly createdAt: string;
}

// ============================================================
// REASONING ENGINE INTERFACE (NOT IMPLEMENTED)
// ============================================================

export interface ReasoningEngine {
  // NOT IMPLEMENTED in ORDER 0
  execute(run: ReasoningRun): Promise<ReasoningRun>;
  evaluate(run: ReasoningRun): Promise<EpistemicStatus>;
}

// ============================================================
// STATUS
// ============================================================

export const REASONING_ENGINE_STATUS = 'NOT_IMPLEMENTED' as const;
