# HAG-RAP V.2 — Architecture Decision Records

## ADR-001: Greenfield V.2

**Context:** HAG-RAP V.1 existed as a prior implementation. Lessons learned from V.1 informed V.2 design, but V.2 must be designed correctly from first principles.

**Decision:** V.2 is a complete greenfield implementation. No legacy code dependency. V.1 architecture is not copied blindly.

**Consequences:** Clean architecture without inherited defects. No migration burden. All contracts designed for the full scientific chain.

**Alternatives Rejected:** Incremental refactoring of V.1 (would inherit architectural defects), hybrid approach (would create confusion about which patterns to follow).

---

## ADR-002: Bounded Contexts

**Context:** A monolithic architecture would cause later work packages to require destructive changes to earlier modules.

**Decision:** Define explicit bounded contexts for each scientific domain: CORE, CASE, EVIDENCE, EPISTEMICS, PROVENANCE, REASONING, CAUSAL, ABSTRACTION, WORLD-MODEL, PLANNING, AUTHORITY, GOVERNANCE, ASSURANCE, SIMULATION, MULTIAGENT, EVALUATION, AUDIT, SECURITY, ADAPTERS, PERSISTENCE, EXPERIMENTS.

**Consequences:** Each module can evolve independently. Contracts are stable. No god service or monolithic types file.

**Alternatives Rejected:** Single types.ts file (would create coupling), god service pattern (would prevent independent evolution).

---

## ADR-003: Canonical IDs and Case Isolation

**Context:** Using interchangeable arbitrary strings everywhere leads to accidental cross-references and makes it impossible to enforce case isolation.

**Decision:** Create branded ID types (ResearchCaseId, SourceId, EvidenceId, etc.) and enforce case isolation at the repository level. Objects from Case A cannot be accessed through Case B's repository.

**Consequences:** Type-safe references. Compile-time prevention of some cross-reference errors. Runtime enforcement of case isolation.

**Alternatives Rejected:** Plain strings everywhere (no type safety), UUID-only without case binding (no isolation enforcement).

---

## ADR-004: Epistemic Separation

**Context:** Compressing all epistemic states into one enum loses critical distinctions (UNKNOWN ≠ FALSE, ASSUMPTION ≠ FACT, etc.).

**Decision:** Define orthogonal epistemic dimensions: category, origin, confidence, contested, superseded. Each dimension is independent.

**Consequences:** Epistemic invariants can be enforced. The system can answer "what does it know vs. what does it assume?"

**Alternatives Rejected:** Single status enum (loses distinctions), boolean flags (insufficient expressiveness).

---

## ADR-005: Provenance/Versioning

**Context:** Scientific objects evolve. Without versioning and provenance, the system cannot answer "what did we believe before?"

**Decision:** All versioned objects carry: version, supersedes, supersededBy, createdAt, createdBy, changeReason. Provenance is append-only and cross-cutting.

**Consequences:** Full history is preserved. Supersession creates new versions without erasing old ones. Provenance answers who/what/when/how.

**Alternatives Rejected:** In-place mutation (loses history), event sourcing without snapshots (too complex for ORDER 0).

---

## ADR-006: Orthogonal State Machines

**Context:** V.1 compressed independent semantic dimensions (lifecycle, admissibility, authority) into one status field, making it impossible to represent valid combinations.

**Decision:** Each entity with multiple state dimensions uses separate, independent fields. For planning: lifecycle, admissibility, adaptation, authority, execution mode are all separate.

**Consequences:** All valid combinations are representable. No invalid state compression. Each dimension can transition independently.

**Alternatives Rejected:** Single status enum (V.1 approach — rejected due to defect), bitmask (hard to reason about).

---

## ADR-007: Authority as First-Class Domain

**Context:** Treating authority as a UI afterthought means the system cannot enforce authority constraints during computation.

**Decision:** Authority is a first-class domain from ORDER 0. Authority policies, boundaries, decisions, and violations are explicit domain objects.

**Consequences:** Authority can constrain modules throughout the system, not just at the UI layer. Capability ≠ permission is enforceable.

**Alternatives Rejected:** Authority as UI-only concern (cannot enforce during computation), authority as configuration (not queryable).

---

## ADR-008: Human Governance

**Context:** "Approve" buttons are insufficient. Humans must be able to inspect, challenge, correct, reject, override, lock, and record rationale.

**Decision:** Governance actions are typed domain events. Every human intervention records actor, action, target, rationale, and timestamp. AI cannot impersonate human actions.

**Consequences:** Full human governance capability. Attribution is guaranteed. Human actions create provenance.

**Alternatives Rejected:** Simple approve/reject buttons (insufficient), governance as comments (not machine-readable).

---

## ADR-009: Simulation/Reality Separation

**Context:** Without explicit separation, simulated events can silently appear as real observations.

**Decision:** ExecutionMode and SimulationDomain are explicit types. Simulation runs carry isSimulation=true. No simulated event can have REAL_OBSERVED domain. This survives persistence.

**Consequences:** Simulated and real events are always distinguishable. Export/import preserves the distinction.

**Alternatives Rejected:** Implicit separation via naming convention (fragile), no separation (dangerous).

---

## ADR-010: External AI Adapter Boundary

**Context:** Depending semantically on a specific LLM makes the system fragile and limits testability.

**Decision:** Define an adapter boundary. LLM outputs are never canonical evidence by default. All model outputs require typed ingestion and validation. Core scientific semantics remain deterministic/testable without an external model.

**Consequences:** Model-independent architecture. Testable without external dependencies. LLM outputs are properly classified as claims requiring validation.

**Alternatives Rejected:** Direct LLM dependency (fragile), no adapter boundary (no testability).

---

## ADR-011: Software Tests vs Scientific Experiments

**Context:** Confusing software test results with scientific validation leads to false claims of achievement.

**Decision:** Software tests verify implementation correctness. Scientific experiments validate performance targets. These are architecturally and semantically distinct. A passing test cannot set a scientific target to PASS.

**Consequences:** No false claims of scientific achievement. Clear separation between engineering verification and scientific validation.

**Alternatives Rejected:** Unified test/validation framework (conflates categories), no distinction (leads to false claims).

---

## ADR-012: Planning Designed Before WP5

**Context:** If planning types are designed when implementing the planner, they may conflict with foundational types.

**Decision:** Planning contracts (including orthogonal state dimensions) are defined in ORDER 0, before the planning engine is implemented.

**Consequences:** WP5 can implement the engine without changing foundational types. Planning objects reference canonical cognitive objects rather than duplicating truth.

**Alternatives Rejected:** Design planning types during WP5 (risks destructive changes), no planning types in ORDER 0 (risks architectural conflict).

---

## ADR-013: Audit vs Application Logging

**Context:** Mixing debugging logs with scientific audit evidence makes the audit trail unreliable.

**Decision:** Audit is a separate, append-only domain. Audit events are typed, structured, and immutable. Debug logging is separate and does not contribute to the scientific audit trail.

**Consequences:** Reliable audit trail. Scientific reconstruction is possible. Debug logs don't pollute the audit.

**Alternatives Rejected:** Unified logging (unreliable audit), no separate audit (no scientific traceability).

---

## ADR-014: Repository/Service Separation

**Context:** If repositories contain scientific reasoning logic, they become impossible to test independently and violate single responsibility.

**Decision:** Repositories store and retrieve. Services/engines contain logic. UI does not own domain state semantics. Storage schemas are not the source of scientific truth.

**Consequences:** Testable repositories. Clear responsibility boundaries. Domain logic is not coupled to storage.

**Alternatives Rejected:** Fat repositories (violates SRP), UI-owned state (fragile), schema-as-truth (brittle).
