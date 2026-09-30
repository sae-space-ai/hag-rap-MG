// HAG-RAP V.2 — CASE MODULE
// ResearchCase as aggregation boundary

import type { ResearchCaseId } from '../core/index.ts';

// ============================================================
// CASE LIFECYCLE (orthogonal to scientific state)
// ============================================================

export type CaseLifecycle = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'CLOSED' | 'ARCHIVED';

// ============================================================
// RESEARCH CASE
// ============================================================

export interface ResearchCase {
  readonly id: ResearchCaseId;
  readonly title: string;
  readonly description: string;
  readonly lifecycle: CaseLifecycle;
  readonly createdAt: string;
  readonly createdBy: string;
  readonly updatedAt: string;
}

// ============================================================
// CASE CREATION
// ============================================================

export interface CreateCaseInput {
  title: string;
  description: string;
  createdBy: string;
}

export function createResearchCase(
  id: ResearchCaseId,
  input: CreateCaseInput,
  clock: { now(): string }
): ResearchCase {
  if (!input.title || input.title.trim().length === 0) {
    throw new Error('Case title is required');
  }
  return Object.freeze({
    id,
    title: input.title.trim(),
    description: input.description,
    lifecycle: 'DRAFT' as CaseLifecycle,
    createdAt: clock.now(),
    createdBy: input.createdBy,
    updatedAt: clock.now(),
  });
}

// ============================================================
// CASE LIFECYCLE TRANSITIONS
// ============================================================

const VALID_TRANSITIONS: Record<CaseLifecycle, CaseLifecycle[]> = {
  DRAFT: ['ACTIVE', 'ARCHIVED'],
  ACTIVE: ['PAUSED', 'CLOSED'],
  PAUSED: ['ACTIVE', 'CLOSED'],
  CLOSED: ['ARCHIVED'],
  ARCHIVED: [],
};

export function transitionCaseLifecycle(
  currentLifecycle: CaseLifecycle,
  targetLifecycle: CaseLifecycle
): CaseLifecycle {
  const allowed = VALID_TRANSITIONS[currentLifecycle];
  if (!allowed.includes(targetLifecycle)) {
    throw new Error(
      `Invalid case lifecycle transition: ${currentLifecycle} → ${targetLifecycle}`
    );
  }
  return targetLifecycle;
}

// ============================================================
// CASE REPOSITORY INTERFACE
// ============================================================

export interface CaseRepository {
  save(case_: ResearchCase): void;
  findById(id: ResearchCaseId): ResearchCase | null;
  findAll(): ResearchCase[];
  updateLifecycle(id: ResearchCaseId, lifecycle: CaseLifecycle, updatedAt: string): void;
}
