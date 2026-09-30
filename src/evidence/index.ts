// HAG-RAP V.2 — EVIDENCE MODULE
// Canonical evidence structures

import type { ResearchCaseId, SourceId, EvidenceId, ClaimId } from '../core/index.ts';
import type { EpistemicStatus } from '../epistemics/index.ts';
import type { Versioned } from '../core/index.ts';

// ============================================================
// SOURCE
// ============================================================

export interface Source {
  readonly id: SourceId;
  readonly caseId: ResearchCaseId;
  readonly name: string;
  readonly type: 'DOCUMENT' | 'DATA' | 'OBSERVATION' | 'EXPERT' | 'MODEL_OUTPUT' | 'OTHER';
  readonly description: string;
  readonly createdAt: string;
}

// ============================================================
// EVIDENCE ITEM
// ============================================================

export interface EvidenceItem {
  readonly id: EvidenceId;
  readonly caseId: ResearchCaseId;
  readonly sourceId: SourceId;
  readonly description: string;
  readonly epistemicStatus: EpistemicStatus;
  readonly version: number;
  readonly createdAt: string;
  readonly createdBy: string;
}

// ============================================================
// CLAIM
// ============================================================

export interface Claim {
  readonly id: ClaimId;
  readonly caseId: ResearchCaseId;
  readonly content: string;
  readonly epistemicStatus: EpistemicStatus;
  readonly version: number;
  readonly supersedes: ClaimId | null;
  readonly supersededBy: ClaimId | null;
  readonly createdAt: string;
  readonly createdBy: string;
  readonly changeReason: string | null;
}

// ============================================================
// EVIDENCE LINK / SUPPORT / CONFLICT
// ============================================================

export type EvidenceLinkType = 'SUPPORTS' | 'CONTRADICTS' | 'WEAKENS' | 'CONTEXTUALIZES';

export interface EvidenceLink {
  readonly evidenceId: EvidenceId;
  readonly claimId: ClaimId;
  readonly linkType: EvidenceLinkType;
  readonly caseId: ResearchCaseId;
}

export interface EvidenceSupport {
  readonly claimId: ClaimId;
  readonly supportingEvidence: EvidenceId[];
  readonly contradictingEvidence: EvidenceId[];
  readonly caseId: ResearchCaseId;
}

export interface EvidenceConflict {
  readonly claimId: ClaimId;
  readonly evidenceA: EvidenceId;
  readonly evidenceB: EvidenceId;
  readonly nature: string;
  readonly caseId: ResearchCaseId;
  readonly recordedAt: string;
}

// ============================================================
// EVIDENCE QUALITY / SCOPE / STATUS
// ============================================================

export type EvidenceQuality = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
export type EvidenceScope = 'LOCAL' | 'DOMAIN' | 'GENERAL' | 'UNKNOWN';
export type EvidenceStatus = 'ACCEPTED' | 'CONTESTED' | 'RETRACTED' | 'PENDING_REVIEW' | 'UNKNOWN';

// ============================================================
// EVIDENCE REPOSITORY INTERFACE
// ============================================================

export interface EvidenceRepository {
  saveSource(source: Source): void;
  findSourceById(id: SourceId, caseId: ResearchCaseId): Source | null;
  saveEvidence(evidence: EvidenceItem): void;
  findEvidenceById(id: EvidenceId, caseId: ResearchCaseId): EvidenceItem | null;
  saveClaim(claim: Claim): void;
  findClaimById(id: ClaimId, caseId: ResearchCaseId): Claim | null;
  addLink(link: EvidenceLink): void;
  getSupport(claimId: ClaimId, caseId: ResearchCaseId): EvidenceSupport;
  recordConflict(conflict: EvidenceConflict): void;
}

// ============================================================
// EVIDENCE FACTORY
// ============================================================

export function createSource(
  id: SourceId,
  caseId: ResearchCaseId,
  name: string,
  type: Source['type'],
  description: string,
  clock: { now(): string }
): Source {
  return Object.freeze({ id, caseId, name, type, description, createdAt: clock.now() });
}

export function createEvidenceItem(
  id: EvidenceId,
  caseId: ResearchCaseId,
  sourceId: SourceId,
  description: string,
  epistemicStatus: EpistemicStatus,
  clock: { now(): string },
  createdBy: string
): EvidenceItem {
  return Object.freeze({
    id, caseId, sourceId, description, epistemicStatus,
    version: 1, createdAt: clock.now(), createdBy,
  });
}

export function createClaim(
  id: ClaimId,
  caseId: ResearchCaseId,
  content: string,
  epistemicStatus: EpistemicStatus,
  clock: { now(): string },
  createdBy: string,
  supersedes: ClaimId | null = null
): Claim {
  return Object.freeze({
    id, caseId, content, epistemicStatus,
    version: 1, supersedes, supersededBy: null,
    createdAt: clock.now(), createdBy, changeReason: null,
  });
}

// Versioned claim creation (supersession)
export function createNewVersionClaim(
  id: ClaimId,
  previousClaim: Claim,
  newContent: string,
  newEpistemicStatus: EpistemicStatus,
  clock: { now(): string },
  createdBy: string,
  changeReason: string
): Claim {
  return Object.freeze({
    id,
    caseId: previousClaim.caseId,
    content: newContent,
    epistemicStatus: newEpistemicStatus,
    version: previousClaim.version + 1,
    supersedes: previousClaim.id,
    supersededBy: null,
    createdAt: clock.now(),
    createdBy,
    changeReason,
  });
}
