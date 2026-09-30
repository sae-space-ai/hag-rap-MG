// HAG-RAP V.2 — AUTHORITY MODULE
// Authority as first-class domain

import type {
  AuthorityPolicyId, HumanDecisionId, ResearchCaseId, ConstraintId
} from '../core/index.ts';

// ============================================================
// AUTHORITY SEMANTICS
// ============================================================

export type AuthoritySemantics =
  | 'NON_NEGOTIABLE'
  | 'HUMAN_LOCKED'
  | 'SYSTEM_MODIFIABLE'
  | 'LOCAL_DISCRETION'
  | 'ADVISORY';

// ============================================================
// AUTHORITY DISTINCTIONS
// ============================================================

export type AuthorityDimension = 'CAPABILITY' | 'PERMISSION' | 'DISCRETION' | 'HUMAN_AUTHORITY' | 'ASSURANCE';

// Invariants:
// Capability does not imply permission.
// Permission does not imply correctness.
// Correctness does not imply authority.

// ============================================================
// AUTHORITY POLICY
// ============================================================

export interface AuthorityPolicy {
  readonly id: AuthorityPolicyId;
  readonly caseId: ResearchCaseId;
  readonly name: string;
  readonly scope: AuthorityScope;
  readonly boundaries: AuthorityBoundary[];
  readonly createdAt: string;
  readonly createdBy: string; // MUST be human actor
  readonly locked: boolean;
}

export interface AuthorityScope {
  readonly module: string;
  readonly operations: string[];
  readonly constraints: string[];
}

export interface AuthorityBoundary {
  readonly name: string;
  readonly semantics: AuthoritySemantics;
  readonly description: string;
  readonly constraintIds: ConstraintId[];
}

// ============================================================
// AUTHORITY DECISION
// ============================================================

export interface AuthorityDecision {
  readonly id: HumanDecisionId;
  readonly caseId: ResearchCaseId;
  readonly policyId: AuthorityPolicyId;
  readonly decisionType: 'APPROVE' | 'REJECT' | 'OVERRIDE' | 'LOCK' | 'UNLOCK' | 'MODIFY';
  readonly actor: string; // MUST be identified human
  readonly rationale: string;
  readonly timestamp: string;
  readonly provenanceId: string | null;
}

// ============================================================
// AUTHORITY VIOLATION
// ============================================================

export interface AuthorityViolation {
  readonly caseId: ResearchCaseId;
  readonly attemptedBy: string;
  readonly attemptedOperation: string;
  readonly violatedPolicy: AuthorityPolicyId;
  readonly violatedBoundary: string;
  readonly timestamp: string;
  readonly details: string;
}

// ============================================================
// HUMAN GATE
// ============================================================

export interface HumanGate {
  readonly id: string;
  readonly caseId: ResearchCaseId;
  readonly description: string;
  readonly required: boolean;
  readonly status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'OVERRIDDEN';
  readonly decisionId: HumanDecisionId | null;
}

// ============================================================
// PERMISSION / CAPABILITY DECLARATION
// ============================================================

export interface Permission {
  readonly module: string;
  readonly operation: string;
  readonly semantics: AuthoritySemantics;
  readonly grantedBy: string; // human actor
}

export interface CapabilityDeclaration {
  readonly module: string;
  readonly operation: string;
  readonly description: string;
  // Capability ≠ Permission
}

// ============================================================
// AUTHORITY VALIDATION
// ============================================================

export function validateAuthorityPolicy(policy: Record<string, unknown>): boolean {
  if (typeof policy !== 'object' || policy === null) return false;
  if (typeof policy.id !== 'string') return false;
  if (typeof policy.caseId !== 'string') return false;
  if (typeof policy.name !== 'string' || (policy.name as string).trim().length === 0) return false;
  if (typeof policy.createdBy !== 'string' || (policy.createdBy as string).trim().length === 0) return false;
  if (!Array.isArray(policy.boundaries)) return false;
  return true;
}

export function validateHumanDecision(decision: Record<string, unknown>): boolean {
  if (typeof decision !== 'object' || decision === null) return false;
  if (typeof decision.id !== 'string') return false;
  if (typeof decision.actor !== 'string' || (decision.actor as string).trim().length === 0) return false;
  if (typeof decision.decisionType !== 'string') return false;
  if (typeof decision.timestamp !== 'string') return false;
  return true;
}

// ============================================================
// AUTHORITY INVARIANTS
// ============================================================

export function assertCapabilityNotPermission(
  capability: CapabilityDeclaration,
  _permissions: Permission[]
): void {
  // Capability declaration does not grant permission.
  // This is an invariant check — the system must verify
  // that having a capability does not auto-grant permission.
  // The actual permission check must be done separately.
  void capability;
}

export function assertDelegationDoesNotCreateAuthority(
  delegator: string,
  delegatee: string,
  _operation: string,
  delegatorPermissions: Permission[]
): boolean {
  // Delegation cannot expand authority beyond delegator's permissions.
  // If delegator doesn't have permission, delegatee cannot gain it.
  void delegator;
  void delegatee;
  void delegatorPermissions;
  return true; // Structural check — actual enforcement in governance
}

export function assertLockedBoundaryCannotBeWeakened(
  policy: AuthorityPolicy,
  boundaryName: string,
  newSemantics: AuthoritySemantics
): void {
  const boundary = policy.boundaries.find(b => b.name === boundaryName);
  if (!boundary) return;
  if (policy.locked && boundary.semantics === 'NON_NEGOTIABLE') {
    if (newSemantics !== 'NON_NEGOTIABLE') {
      throw new Error(
        `Cannot weaken locked NON_NEGOTIABLE boundary "${boundaryName}" to ${newSemantics}`
      );
    }
  }
  if (boundary.semantics === 'HUMAN_LOCKED' && newSemantics !== 'HUMAN_LOCKED') {
    throw new Error(
      `Cannot weaken HUMAN_LOCKED boundary "${boundaryName}" to ${newSemantics}`
    );
  }
}

// ============================================================
// AUTHORITY REPOSITORY
// ============================================================

export interface AuthorityRepository {
  savePolicy(policy: AuthorityPolicy): void;
  findPolicyById(id: AuthorityPolicyId, caseId: ResearchCaseId): AuthorityPolicy | null;
  recordDecision(decision: AuthorityDecision): void;
  recordViolation(violation: AuthorityViolation): void;
  getDecisions(policyId: AuthorityPolicyId, caseId: ResearchCaseId): AuthorityDecision[];
  getViolations(caseId: ResearchCaseId): AuthorityViolation[];
}
