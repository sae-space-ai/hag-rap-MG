// HAG-RAP V.2 — CAUSAL MODULE (CONTRACT ONLY)
// Future causal inference interfaces — NOT IMPLEMENTED in ORDER 0

import type { ResearchCaseId, CausalModelId } from '../core/index.ts';

// ============================================================
// CAUSAL TYPES (FUTURE)
// ============================================================

export interface CausalVariable {
  readonly name: string;
  readonly type: 'OBSERVED' | 'LATENT' | 'INTERVENTION' | 'OUTCOME';
  readonly description: string;
}

export interface CausalRelation {
  readonly from: string; // variable name
  readonly to: string; // variable name
  readonly type: 'DIRECT' | 'INDIRECT' | 'CONFOUNDED' | 'UNKNOWN';
  readonly strength: number | null; // null = unknown
  // Correlation does NOT automatically create causal relation
}

export interface CausalModel {
  readonly id: CausalModelId;
  readonly caseId: ResearchCaseId;
  readonly variables: CausalVariable[];
  readonly relations: CausalRelation[];
  readonly assumptions: string[];
  readonly createdAt: string;
}

export interface Intervention {
  readonly variable: string;
  readonly value: unknown;
  readonly description: string;
}

export interface CounterfactualQuery {
  readonly modelId: CausalModelId;
  readonly intervention: Intervention;
  readonly outcomeVariable: string;
  readonly givenObservations: Record<string, unknown>;
}

export interface CounterfactualResult {
  readonly queryId: string;
  readonly outcome: unknown;
  readonly confidence: number | null;
  readonly assumptions: string[];
  // Counterfactual result must remain distinguishable from observation
  readonly isCounterfactual: true;
}

// ============================================================
// CAUSAL ENGINE INTERFACE (NOT IMPLEMENTED)
// ============================================================

export interface CausalEngine {
  executeQuery(query: CounterfactualQuery): Promise<CounterfactualResult>;
  validateModel(model: CausalModel): Promise<boolean>;
}

export const CAUSAL_ENGINE_STATUS = 'NOT_IMPLEMENTED' as const;
