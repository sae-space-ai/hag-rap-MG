// HAG-RAP V.2 — ADAPTERS MODULE
// External AI / LLM adapter boundary

import type { ResearchCaseId } from '../core/index.ts';
import type { EpistemicCategory } from '../epistemics/index.ts';

// ============================================================
// LLM OUTPUT TYPES
// ============================================================

export interface LLMOutput {
  readonly model: string;
  readonly prompt: string;
  readonly rawOutput: string;
  readonly timestamp: string;
  // An LLM output is NOT automatically canonical evidence or truth
}

// ============================================================
// TYPED INGESTION
// ============================================================

export interface TypedIngestion {
  readonly source: LLMOutput;
  readonly proposedCategory: EpistemicCategory;
  readonly caseId: ResearchCaseId;
  readonly validated: boolean;
  readonly validatedBy: string | null;
  // All model outputs require typed ingestion and validation
}

// ============================================================
// ADAPTER INTERFACE
// ============================================================

export interface AIAdapter {
  readonly name: string;
  readonly capabilities: string[];
  // HAG-RAP V.2 must not depend semantically on a specific LLM
  propose(input: string): Promise<LLMOutput>;
  // Core scientific semantics must remain deterministic/testable
  // without an external model
}

// ============================================================
// ADAPTER INVARIANTS
// ============================================================

export function assertLLMOutputNotCanonical(output: LLMOutput): TypedIngestion {
  // LLM output is never canonical by default
  return Object.freeze({
    source: output,
    proposedCategory: 'CLAIM', // Default — must be validated
    caseId: '' as ResearchCaseId, // Must be set by caller
    validated: false,
    validatedBy: null,
  });
}

export const ADAPTER_STATUS = 'BOUNDARY_DEFINED' as const;
