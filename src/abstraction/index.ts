// HAG-RAP V.2 — ABSTRACTION MODULE (CONTRACT ONLY)
// Future abstraction interfaces — NOT IMPLEMENTED in ORDER 0

import type { ResearchCaseId, AbstractionId, ConceptId } from '../core/index.ts';

// ============================================================
// ABSTRACTION TYPES (FUTURE)
// ============================================================

export interface Concept {
  readonly id: ConceptId;
  readonly caseId: ResearchCaseId;
  readonly name: string;
  readonly definition: string;
  readonly validated: boolean; // Candidate ≠ validated
  readonly evidence: string[];
  readonly counterexamples: string[];
}

export interface ConceptCandidate {
  readonly name: string;
  readonly supportingEvidence: string[];
  readonly confidence: number | null;
  // Candidate concept ≠ validated concept
}

export interface Abstraction {
  readonly id: AbstractionId;
  readonly caseId: ResearchCaseId;
  readonly concept: ConceptId;
  readonly level: number;
  readonly applicabilityEnvelope: string;
  readonly validated: boolean;
}

export interface AbstractionLevel {
  readonly level: number;
  readonly description: string;
  readonly abstractions: AbstractionId[];
}

export interface Analogy {
  readonly source: ConceptId;
  readonly target: ConceptId;
  readonly mapping: AnalogicalMapping;
  readonly transferAssessment: TransferAssessment;
  // Similarity ≠ analogy. Analogy ≠ valid transfer.
}

export interface AnalogicalMapping {
  readonly sourceElements: string[];
  readonly targetElements: string[];
  readonly structuralCorrespondences: string[];
}

export interface TransferAssessment {
  readonly valid: boolean;
  readonly confidence: number | null;
  readonly limitations: string[];
  readonly conditions: string[];
}

// ============================================================
// ABSTRACTION ENGINE INTERFACE (NOT IMPLEMENTED)
// ============================================================

export interface AbstractionEngine {
  identifyConcepts(evidence: string[]): Promise<ConceptCandidate[]>;
  validateConcept(candidate: ConceptCandidate): Promise<Concept>;
  buildAbstraction(concept: Concept): Promise<Abstraction>;
  assessAnalogy(source: Concept, target: Concept): Promise<Analogy>;
}

export const ABSTRACTION_ENGINE_STATUS = 'NOT_IMPLEMENTED' as const;
