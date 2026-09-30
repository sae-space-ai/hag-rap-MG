// HAG-RAP V.2 — SIMULATION MODULE
// Simulation/reality boundary

import type { ResearchCaseId, SimulationRunId } from '../core/index.ts';
import type { ExecutionMode } from '../core/index.ts';

// ============================================================
// EXECUTION BOUNDARY
// ============================================================

export type SimulationDomain = 'REAL_OBSERVED' | 'PREDICTED' | 'COUNTERFACTUAL' | 'SIMULATED' | 'REQUESTED' | 'NOT_EXECUTED';

// Invariant: No simulated event may silently become an observed event.
// No simulated action may appear as real-world execution.
// This must survive persistence/export/import.

// ============================================================
// SIMULATION RUN
// ============================================================

export interface SimulationRun {
  readonly id: SimulationRunId;
  readonly caseId: ResearchCaseId;
  readonly description: string;
  readonly domain: SimulationDomain;
  readonly executionMode: ExecutionMode;
  readonly inputs: Record<string, unknown>;
  readonly outputs: Record<string, unknown>;
  readonly isSimulation: true; // Always true — never confused with real
  readonly createdAt: string;
  readonly createdBy: string;
}

// ============================================================
// SIMULATION FACTORY
// ============================================================

export function createSimulationRun(
  id: SimulationRunId,
  caseId: ResearchCaseId,
  description: string,
  domain: SimulationDomain,
  inputs: Record<string, unknown>,
  clock: { now(): string },
  createdBy: string
): SimulationRun {
  if (domain === 'REAL_OBSERVED') {
    throw new Error('Simulation run cannot have REAL_OBSERVED domain');
  }
  return Object.freeze({
    id,
    caseId,
    description,
    domain,
    executionMode: domain === 'SIMULATED' ? 'SIMULATED' as const : domain === 'COUNTERFACTUAL' ? 'COUNTERFACTUAL' as const : 'PREDICTED' as const,
    inputs,
    outputs: {},
    isSimulation: true,
    createdAt: clock.now(),
    createdBy,
  });
}

// ============================================================
// SIMULATION/REALITY VALIDATION
// ============================================================

export function assertSimulationNotReal(run: SimulationRun): void {
  if (run.domain === 'REAL_OBSERVED') {
    throw new Error('Invariant violation: simulation cannot be REAL_OBSERVED');
  }
  if (run.executionMode === 'REAL') {
    throw new Error('Invariant violation: simulation run cannot have REAL execution mode');
  }
}

export function assertRealNotSimulation(executionMode: ExecutionMode): void {
  if (executionMode === 'SIMULATED' || executionMode === 'COUNTERFACTUAL') {
    throw new Error('Cannot treat simulated/counterfactual execution as real');
  }
}

// ============================================================
// SIMULATION REPOSITORY
// ============================================================

export interface SimulationRepository {
  save(run: SimulationRun): void;
  findById(id: SimulationRunId, caseId: ResearchCaseId): SimulationRun | null;
  findByCase(caseId: ResearchCaseId): SimulationRun[];
}
