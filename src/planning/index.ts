// HAG-RAP V.2 — PLANNING MODULE (CONTRACT ONLY)
// Future planning interfaces — NOT IMPLEMENTED in ORDER 0
// CRITICAL: Orthogonal state dimensions per V.2 lesson

import type {
  ResearchCaseId, PlanId, PlanVersionId, GoalId, ConstraintId
} from '../core/index.ts';

// ============================================================
// ORTHOGONAL STATE DIMENSIONS (V.2 LESSON)
// These are NOT interchangeable. Each is independent.
// ============================================================

// Dimension 1: PLAN LIFECYCLE
export type PlanLifecycle =
  | 'DRAFT'
  | 'EVALUATED'
  | 'SELECTED'
  | 'EXECUTING'
  | 'COMPLETED'
  | 'FAILED'
  | 'ABANDONED';

// Dimension 2: PLAN ADMISSIBILITY
export type PlanAdmissibility =
  | 'NOT_EVALUATED'
  | 'ADMISSIBLE'
  | 'INADMISSIBLE'
  | 'UNKNOWN';

// Dimension 3: PLAN ADAPTATION / REPLANNING
export type PlanAdaptation =
  | 'STABLE'
  | 'DEVIATED'
  | 'REPAIRING'
  | 'REPLANNING';

// Dimension 4: PLAN AUTHORITY
export type PlanAuthority =
  | 'WITHIN_AUTHORITY'
  | 'HUMAN_REVIEW_REQUIRED'
  | 'AUTHORITY_BLOCKED';

// Dimension 5: PLAN EXECUTION MODE
export type PlanExecutionMode =
  | 'NOT_EXECUTED'
  | 'SIMULATED'
  | 'REAL';

// ============================================================
// PLANNING TYPES (FUTURE)
// ============================================================

export interface PlanningGoal {
  readonly id: GoalId;
  readonly caseId: ResearchCaseId;
  readonly description: string;
  readonly priority: number;
  readonly constraints: ConstraintId[];
}

export interface PlanningConstraint {
  readonly id: ConstraintId;
  readonly caseId: ResearchCaseId;
  readonly description: string;
  readonly type: 'HARD' | 'SOFT' | 'PREFERENCE';
  readonly negotiable: boolean;
}

export interface PlanningOperator {
  readonly name: string;
  readonly preconditions: string[];
  readonly effects: string[];
  readonly cost: number | null;
}

export interface PlanStep {
  readonly id: string;
  readonly operator: string;
  readonly parameters: Record<string, unknown>;
  readonly dependencies: string[]; // step ids
  readonly order: number;
}

export interface PlanHierarchy {
  readonly planId: PlanId;
  readonly parentPlanId: PlanId | null;
  readonly subPlanIds: PlanId[];
  readonly level: number;
}

export interface PlanDependency {
  readonly planId: PlanId;
  readonly dependsOn: PlanId;
  readonly type: 'REQUIRES' | 'EXCLUDES' | 'ALTERNATIVE_TO';
}

export interface PlanAlternative {
  readonly planId: PlanId;
  readonly alternativeIds: PlanId[];
}

export interface PlanBranch {
  readonly planId: PlanId;
  readonly branchPoint: string; // step id
  readonly branches: PlanId[];
}

export interface PlanEvaluation {
  readonly planId: PlanId;
  readonly score: number | null;
  readonly criteria: Record<string, number | null>;
  readonly admissibility: PlanAdmissibility;
  readonly evaluatedAt: string;
}

export interface PlanDeviation {
  readonly planId: PlanId;
  readonly expectedStep: string;
  readonly actualOutcome: string;
  readonly severity: 'MINOR' | 'MAJOR' | 'CRITICAL';
  readonly detectedAt: string;
}

export interface PlanRepair {
  readonly planId: PlanId;
  readonly deviationId: string;
  readonly repairStrategy: string;
  readonly repairedSteps: string[];
}

export interface PlanRevision {
  readonly planId: PlanId;
  readonly newVersionId: PlanVersionId;
  readonly reason: string;
  readonly changes: string[];
}

export interface SafeStop {
  readonly planId: PlanId;
  readonly reason: string;
  readonly stoppedAt: string;
  readonly safe: boolean;
}

export interface InformationGatheringAction {
  readonly planId: PlanId;
  readonly question: string;
  readonly method: string;
  readonly result: string | null;
}

// ============================================================
// PLAN (with orthogonal states)
// ============================================================

export interface Plan {
  readonly id: PlanId;
  readonly caseId: ResearchCaseId;
  readonly description: string;
  readonly goals: GoalId[];
  readonly steps: PlanStep[];
  // ORTHOGONAL STATE DIMENSIONS:
  readonly lifecycle: PlanLifecycle;
  readonly admissibility: PlanAdmissibility;
  readonly adaptation: PlanAdaptation;
  readonly authority: PlanAuthority;
  readonly executionMode: PlanExecutionMode;
  readonly version: number;
  readonly createdAt: string;
}

// ============================================================
// PLANNING ENGINE INTERFACE (NOT IMPLEMENTED)
// ============================================================

export interface PlanningEngine {
  generatePlan(goals: PlanningGoal[], constraints: PlanningConstraint[]): Promise<Plan>;
  evaluatePlan(plan: Plan): Promise<PlanEvaluation>;
  detectDeviation(plan: Plan, actualState: unknown): Promise<PlanDeviation | null>;
  repairPlan(plan: Plan, deviation: PlanDeviation): Promise<PlanRepair>;
  revisePlan(plan: Plan, reason: string): Promise<PlanRevision>;
  safeStop(plan: Plan, reason: string): Promise<SafeStop>;
}

export const PLANNING_ENGINE_STATUS = 'NOT_IMPLEMENTED' as const;

// ============================================================
// ORTHOGONAL STATE VALIDATION
// ============================================================

export function validateOrthogonalStates(plan: {
  lifecycle: PlanLifecycle;
  admissibility: PlanAdmissibility;
  adaptation: PlanAdaptation;
  authority: PlanAuthority;
  executionMode: PlanExecutionMode;
}): void {
  // These dimensions are independent — no cross-validation required
  // but we verify they are all present and valid
  const validLifecycles: PlanLifecycle[] = ['DRAFT', 'EVALUATED', 'SELECTED', 'EXECUTING', 'COMPLETED', 'FAILED', 'ABANDONED'];
  const validAdmissibility: PlanAdmissibility[] = ['NOT_EVALUATED', 'ADMISSIBLE', 'INADMISSIBLE', 'UNKNOWN'];
  const validAdaptation: PlanAdaptation[] = ['STABLE', 'DEVIATED', 'REPAIRING', 'REPLANNING'];
  const validAuthority: PlanAuthority[] = ['WITHIN_AUTHORITY', 'HUMAN_REVIEW_REQUIRED', 'AUTHORITY_BLOCKED'];
  const validExecutionMode: PlanExecutionMode[] = ['NOT_EXECUTED', 'SIMULATED', 'REAL'];

  if (!validLifecycles.includes(plan.lifecycle)) throw new Error(`Invalid plan lifecycle: ${plan.lifecycle}`);
  if (!validAdmissibility.includes(plan.admissibility)) throw new Error(`Invalid plan admissibility: ${plan.admissibility}`);
  if (!validAdaptation.includes(plan.adaptation)) throw new Error(`Invalid plan adaptation: ${plan.adaptation}`);
  if (!validAuthority.includes(plan.authority)) throw new Error(`Invalid plan authority: ${plan.authority}`);
  if (!validExecutionMode.includes(plan.executionMode)) throw new Error(`Invalid plan execution mode: ${plan.executionMode}`);
}
