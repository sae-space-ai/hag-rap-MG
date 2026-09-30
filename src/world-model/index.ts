// HAG-RAP V.2 — WORLD MODEL MODULE (CONTRACT ONLY)
// Future world model interfaces — NOT IMPLEMENTED in ORDER 0

import type { ResearchCaseId, WorldModelId, WorldStateId } from '../core/index.ts';

// ============================================================
// WORLD MODEL TYPES (FUTURE)
// ============================================================

export interface WorldModel {
  readonly id: WorldModelId;
  readonly caseId: ResearchCaseId;
  readonly entities: Entity[];
  readonly relations: Relation[];
  readonly createdAt: string;
}

export interface Entity {
  readonly id: string;
  readonly type: string;
  readonly properties: Record<string, unknown>;
}

export interface Relation {
  readonly from: string; // entity id
  readonly to: string; // entity id
  readonly type: string;
  readonly properties: Record<string, unknown>;
}

export interface WorldState {
  readonly id: WorldStateId;
  readonly modelId: WorldModelId;
  readonly caseId: ResearchCaseId;
  readonly entities: Entity[];
  readonly timestamp: string;
  // World model state must not become evidence merely because a model predicted it
}

export interface Prediction {
  readonly modelId: WorldModelId;
  readonly fromState: WorldStateId;
  readonly predictedState: WorldState;
  readonly confidence: number | null;
  readonly isPrediction: true; // Distinguish from observation
}

export interface ModelDisagreement {
  readonly modelA: WorldModelId;
  readonly modelB: WorldModelId;
  readonly nature: string;
  readonly resolution: string | null;
}

export interface OODAssessment {
  readonly modelId: WorldModelId;
  readonly input: unknown;
  readonly isOOD: boolean;
  readonly confidence: number | null;
}

// ============================================================
// WORLD MODEL ENGINE INTERFACE (NOT IMPLEMENTED)
// ============================================================

export interface WorldModelEngine {
  buildModel(entities: Entity[], relations: Relation[]): Promise<WorldModel>;
  predict(model: WorldModel, state: WorldState): Promise<Prediction>;
  assessOOD(model: WorldModel, input: unknown): Promise<OODAssessment>;
}

export const WORLD_MODEL_ENGINE_STATUS = 'NOT_IMPLEMENTED' as const;
