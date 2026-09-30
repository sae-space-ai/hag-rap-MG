# HAG-RAP V.2 — Scientific Contract

## Immutable Foundational Principles

These principles are invariant. No implementation, future work package, or system state may violate them.

### Epistemic Principles

**S1: Facts ≠ Assumptions**
A supported fact is grounded in evidence. An assumption is postulated without full grounding. The system must never conflate them.

**S2: Inference ≠ Observation**
An inference is derived from premises. An observation is directly recorded. The system must never present an inference as if it were observed.

**S3: Unknown ≠ False**
Absence of knowledge is not negation. The system must preserve UNKNOWN as a distinct epistemic state. UNKNOWN must never silently become FALSE.

**S4: Prediction ≠ Observation**
A prediction is a forward projection. An observation is a recorded fact. The system must never treat a prediction as if it were observed data.

**S5: Simulation ≠ Reality**
A simulated event exists only within the simulation boundary. The system must never allow a simulated event to appear as a real-world observation. This invariant must survive persistence, export, and import.

### Causal & Structural Principles

**S6: Correlation ≠ Causation**
Statistical correlation does not establish causal relationship. The system must not automatically create causal relations from correlated observations.

### Abstraction Principles

**S7: Candidate Abstraction ≠ Validated Abstraction**
A candidate concept or abstraction is not yet validated. The system must distinguish candidates from validated abstractions.

**S8: Similarity ≠ Valid Analogy**
Surface similarity does not constitute a valid analogical mapping. The system must assess structural correspondence before claiming analogy.

### Planning Principles

**S9: Candidate Plan ≠ Admissible Plan**
A generated plan is not automatically admissible. Admissibility requires evaluation against constraints and authority boundaries.

**S10: Admissible Plan ≠ Human-Approved Plan**
Even an admissible plan may require human approval before execution. Admissibility is necessary but not sufficient for execution authority.

### Authority Principles

**S11: Capability ≠ Permission**
The system may technically be capable of an operation without having permission to perform it. Capability declarations do not grant permissions.

**S12: Permission ≠ Authority to Redefine Permission**
Having permission to operate within bounds does not grant authority to redefine those bounds. Only authorised humans may modify authority policies.

**S13: Delegation Does Not Create Authority**
Agent A cannot gain permission merely by asking Agent B to perform something Agent A was not authorised to cause. Delegation cannot expand authority.

**S14: Human Approval Cannot Be Fabricated**
The system must never create, simulate, or infer human approval. Human decisions must be explicitly recorded with actor identity and provenance.

### Historical Principles

**S15: History Cannot Be Silently Rewritten**
When scientific objects evolve, previous versions must be preserved. Supersession creates new versions; it does not erase old ones. The system must answer: what did we believe before? What changed? Why?

### Validation Principles

**S16: Scientific Validation Requires Experiment**
Scientific targets require executed experimental protocols with defined success criteria. Implementation alone does not constitute validation.

**S17: Software PASS ≠ Scientific Success**
A passing unit test verifies implementation correctness. It does not satisfy a scientific performance target. These are fundamentally different categories.

### Evidence Principles

**S18: Unsupported Conclusion Must Remain Unsupported**
No material conclusion may masquerade as evidence. Every claim must trace to evidence, explicit assumption, or explicit inference.

**S19: Critical Uncertainty May Require Abstention**
When uncertainty is too great, the correct scientific response is abstention, not forced conclusion. The system must support abstention as a valid outcome.

### Governance Principles

**S20: Human Intervention Must Be Attributable**
Every human action in the system must record: who acted, what they did, when, and why. AI actions must never impersonate human actions.

## Absolute Principles

- BUILD THE CONTRACT BEFORE THE COGNITION.
- DO NOT BUILD A MONOLITH.
- DO NOT DUPLICATE TRUTH.
- DO NOT CONFUSE STATE DIMENSIONS.
- DO NOT CONFUSE EVIDENCE WITH INFERENCE.
- DO NOT CONFUSE SIMULATION WITH REALITY.
- DO NOT CONFUSE CAPABILITY WITH PERMISSION.
- DO NOT CONFUSE PERMISSION WITH AUTHORITY.
- DO NOT CONFUSE SOFTWARE VERIFICATION WITH SCIENTIFIC VALIDATION.
- HUMAN GOVERNANCE IS COMPUTATIONAL, NOT DECORATIVE.
- THE MACHINE MAY ACQUIRE OPERATIONAL CRITERION. IT DOES NOT THEREBY ACQUIRE AUTHORITY TO REDEFINE THE CONDITIONS OF ACCEPTABILITY.
- NO PASS WITHOUT EXECUTION.
- NO VERIFIED WITHOUT EVIDENCE.
- NO SCIENTIFIC CLAIM WITHOUT EXPERIMENT.
