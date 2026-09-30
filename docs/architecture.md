# HAG-RAP V.2 — Architecture Document

## System Purpose

HAG-RAP V.2 (Human-Governed Deep Reasoning, Abstraction and Planning for Trustworthy Cognitive AI) is a controlled cognitive-AI research demonstrator. It is NOT a chatbot, consultancy dashboard, compliance tool, autonomous decision system, or unrestricted agent.

### Central Research Question

How can a cognitive AI acquire operational criterion through evidence, reasoning, correction and experience while ultimate authority over objectives, constraints and acceptability remains human-governed?

## Bounded Context Map

```
┌─────────────────────────────────────────────────────────────────┐
│                        HAG-RAP V.2                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐   ┌──────────┐   ┌──────────────┐               │
│  │   CORE   │──▶│   CASE   │──▶│   EVIDENCE   │               │
│  └──────────┘   └──────────┘   └──────────────┘               │
│       │              │                  │                       │
│       │              ▼                  ▼                       │
│       │       ┌───────────┐   ┌──────────────┐                │
│       │       │EPISTEMICS │   │  PROVENANCE   │                │
│       │       └───────────┘   └──────────────┘                │
│       │              │                                         │
│       │              ▼                                         │
│       │       ┌──────────────┐   ┌──────────────┐             │
│       │       │  REASONING   │   │    CAUSAL     │             │
│       │       │  (future)    │   │   (future)    │             │
│       │       └──────────────┘   └──────────────┘             │
│       │              │                                         │
│       │              ▼                                         │
│       │       ┌──────────────┐   ┌──────────────┐             │
│       │       │ ABSTRACTION  │   │ WORLD MODEL   │             │
│       │       │  (future)    │   │   (future)    │             │
│       │       └──────────────┘   └──────────────┘             │
│       │              │                                         │
│       │              ▼                                         │
│       │       ┌──────────────┐                                 │
│       │       │   PLANNING   │                                 │
│       │       │  (future)    │                                 │
│       │       └──────────────┘                                 │
│       │              │                                         │
│       │              ▼                                         │
│       │       ┌──────────────┐                                 │
│       └──────▶│  SIMULATION  │                                 │
│               └──────────────┘                                 │
│                                                                 │
│  ═══════════════ CROSS-CUTTING ═══════════════                 │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │AUTHORITY │ │GOVERNANCE│ │  AUDIT   │ │ SECURITY │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ASSURANCE │ │EVALUATION│ │MULTIAGENT│ │ ADAPTERS │          │
│  │ (future) │ │ (future) │ │ (future) │ │          │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
│  ┌──────────────────────────────────────────────────┐          │
│  │              PERSISTENCE / ADAPTERS               │          │
│  └──────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Dependency Graph

```
CORE
 ↓
CASE
 ↓
EVIDENCE / EPISTEMICS / PROVENANCE
 ↓
REASONING / CAUSAL
 ↓
ABSTRACTION / WORLD MODEL
 ↓
PLANNING
 ↓
SIMULATION

Cross-cutting (can reference any layer):
  AUTHORITY
  HUMAN GOVERNANCE
  AUDIT
  SECURITY
  EVALUATION
```

## Scientific Data Flow

```
PROBLEM → SOURCES → EVIDENCE → CLAIMS → FACTS/ASSUMPTIONS/
UNCERTAINTIES/CONTRADICTIONS → REASONING → CAUSAL STRUCTURE →
ABSTRACTION → WORLD MODEL → GOALS → CONSTRAINTS → ALTERNATIVE
PLANS → COUNTERFACTUAL EVALUATION → HUMAN GOVERNANCE →
CONTROLLED SIMULATION → NEW EVIDENCE → REVISION/REPLANNING →
RESULT → AUDITABLE TRACE
```

## Authority Flow

```
HUMAN DEFINES → AUTHORITY POLICY → SYSTEM OPERATES WITHIN BOUNDS
                                         ↓
                              HUMAN REVIEWS / OVERRIDES
                                         ↓
                              SYSTEM CANNOT REDEFINE BOUNDS
```

## Provenance Flow

Every scientific object carries provenance:
- WHO/WHAT produced it
- WHEN
- FROM WHICH INPUTS
- USING WHICH METHOD
- UNDER WHICH VERSION
- UNDER WHICH ASSUMPTIONS
- WITH WHICH HUMAN INTERVENTION
- WHAT DID IT SUPERSEDE
- WHY DID IT CHANGE

## Future WP Mapping

| WP | Module | Status |
|----|--------|--------|
| WP2 | Scientific foundations / evidence / governance contracts | ARCHITECTURE_DEFINED |
| WP3 | Reasoning + causal inference | CONTRACT_DEFINED |
| WP4 | Abstraction + transferable world models | CONTRACT_DEFINED |
| WP5 | Planning + continual replanning | CONTRACT_DEFINED |
| WP6 | Integration + formal assurance + human oversight | CONTRACT_DEFINED |
| WP7 | Benchmarking + validation + TRL4 | CONTRACT_DEFINED |

## Forbidden Dependency Patterns

1. UI → internal repository implementation coupling
2. Planning → mutation of evidence internals
3. Evaluation → modification of experiment results
4. Adapter → silent canonical mutation
5. Audit → destructive update
6. Cross-case access without explicit case ID
7. Circular domain dependencies
8. LLM output → canonical evidence without validation
