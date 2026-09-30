// HAG-RAP V.2 — MULTIAGENT MODULE (CONTRACT ONLY)
// Future multiagent interfaces — controlled, no uncontrolled autonomy

import type { ResearchCaseId, AgentId } from '../core/index.ts';

// ============================================================
// AGENT DECLARATION
// ============================================================

export interface AgentDeclaration {
  readonly id: AgentId;
  readonly name: string;
  readonly capabilities: string[];
  readonly limitations: string[];
  readonly confidenceStatus: string;
  readonly dependencies: AgentId[];
  readonly commitments: string[];
  readonly evidenceReferences: string[];
  readonly authorityScope: string[];
  // DELEGATION DOES NOT CREATE AUTHORITY
}

// ============================================================
// AGENT REQUEST / COMMITMENT
// ============================================================

export interface AgentRequest {
  readonly fromAgent: AgentId;
  readonly toAgent: AgentId;
  readonly operation: string;
  readonly caseId: ResearchCaseId;
  // Request does not grant authority
}

export interface AgentCommitment {
  readonly agentId: AgentId;
  readonly operation: string;
  readonly caseId: ResearchCaseId;
  readonly authorityVerified: boolean;
  // Commitment requires verified authority
}

// ============================================================
// DELEGATION INVARIANT
// ============================================================

export function assertDelegationDoesNotCreateAuthority(
  delegator: AgentDeclaration,
  delegatee: AgentDeclaration,
  requestedOperation: string
): boolean {
  // Agent A cannot gain permission merely by asking Agent B
  // to perform something Agent A was not authorised to cause
  const delegatorHasAuthority = delegator.authorityScope.includes(requestedOperation);
  if (!delegatorHasAuthority) {
    return false; // Cannot delegate what you don't have authority for
  }
  void delegatee;
  return true;
}

// ============================================================
// MULTIAGENT ENGINE STATUS
// ============================================================

export const MULTIAGENT_ENGINE_STATUS = 'NOT_IMPLEMENTED' as const;
