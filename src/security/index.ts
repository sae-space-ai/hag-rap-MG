// HAG-RAP V.2 — SECURITY MODULE
// Security boundary — no fake enterprise security

import type { SecurityFindingId, ResearchCaseId } from '../core/index.ts';

// ============================================================
// SECURITY FINDING
// ============================================================

export interface SecurityFinding {
  readonly id: SecurityFindingId;
  readonly caseId: ResearchCaseId;
  readonly type: 'VULNERABILITY' | 'MISCONFIGURATION' | 'POLICY_VIOLATION' | 'DEPENDENCY_RISK';
  readonly severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  readonly description: string;
  readonly detectedAt: string;
  readonly resolved: boolean;
}

// ============================================================
// SECURITY INVARIANTS
// ============================================================

// No unrestricted autonomous external action
// No secret credentials in repository
// No eval/new Function/dynamic executable imported content

export function validateImportData(data: unknown): { valid: boolean; reason?: string } {
  if (data === null || data === undefined) {
    return { valid: false, reason: 'Null or undefined import data' };
  }
  if (typeof data !== 'object') {
    return { valid: false, reason: 'Import data must be an object' };
  }
  // Check for prototype pollution attempts
  const dataStr = JSON.stringify(data);
  if (dataStr.includes('__proto__') || dataStr.includes('constructor') && dataStr.includes('prototype')) {
    return { valid: false, reason: 'Potential prototype pollution detected' };
  }
  // Check for executable content
  if (dataStr.includes('eval(') || dataStr.includes('new Function(') || dataStr.includes('Function(')) {
    return { valid: false, reason: 'Executable content detected in import' };
  }
  return { valid: true };
}

export function assertNoCredentialInData(data: Record<string, unknown>): boolean {
  const suspiciousKeys = ['password', 'secret', 'apiKey', 'api_key', 'token', 'credential'];
  const dataStr = JSON.stringify(data).toLowerCase();
  for (const key of suspiciousKeys) {
    if (dataStr.includes(key)) {
      return false; // Credentials should not be in repository data
    }
  }
  return true;
}

// ============================================================
// SECURITY REPOSITORY
// ============================================================

export interface SecurityRepository {
  recordFinding(finding: SecurityFinding): void;
  getFindings(caseId: ResearchCaseId): SecurityFinding[];
  getUnresolvedFindings(caseId: ResearchCaseId): SecurityFinding[];
}
