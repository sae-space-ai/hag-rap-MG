// HAG-RAP V.2 — GOVERNANCE MODULE
// Human governance — computational, not decorative

import type { ResearchCaseId, HumanDecisionId } from '../core/index.ts';

// ============================================================
// HUMAN GOVERNANCE ACTIONS
// ============================================================

export type GovernanceAction =
  | 'INSPECT'
  | 'CHALLENGE'
  | 'CORRECT'
  | 'REJECT'
  | 'OVERRIDE'
  | 'LOCK'
  | 'UNLOCK'
  | 'CHANGE_PRIORITY'
  | 'REQUEST_ALTERNATIVES'
  | 'REQUEST_EVIDENCE'
  | 'REQUEST_COUNTERFACTUALS'
  | 'STOP_EXECUTION'
  | 'RESUME_EXECUTION'
  | 'RECORD_RATIONALE';

// ============================================================
// HUMAN INTERVENTION
// ============================================================

export interface HumanIntervention {
  readonly id: HumanDecisionId;
  readonly caseId: ResearchCaseId;
  readonly actor: string; // MUST be identified human
  readonly action: GovernanceAction;
  readonly target: string; // entity being acted upon
  readonly targetType: string;
  readonly rationale: string;
  readonly timestamp: string;
  readonly provenanceId: string | null;
  // Human actions must create provenance
  // AI actions must never impersonate human actions
}

// ============================================================
// GOVERNANCE INVARIANTS
// ============================================================

export function validateHumanIntervention(intervention: Record<string, unknown>): boolean {
  if (typeof intervention !== 'object' || intervention === null) return false;
  if (typeof intervention.actor !== 'string' || (intervention.actor as string).trim().length === 0) return false;
  if (typeof intervention.action !== 'string') return false;
  if (typeof intervention.rationale !== 'string') return false;
  if (typeof intervention.timestamp !== 'string') return false;
  return true;
}

export function assertAICannotImpersonateHuman(
  actor: string,
  actorType: 'HUMAN' | 'AI' | 'SYSTEM'
): void {
  if (actorType !== 'HUMAN') {
    throw new Error('AI/System actors cannot create human interventions');
  }
  void actor;
}

// ============================================================
// GOVERNANCE REPOSITORY
// ============================================================

export interface GovernanceRepository {
  recordIntervention(intervention: HumanIntervention): void;
  getInterventions(caseId: ResearchCaseId): HumanIntervention[];
  getInterventionsByActor(actor: string, caseId: ResearchCaseId): HumanIntervention[];
}
