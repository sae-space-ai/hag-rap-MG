// HAG-RAP V.2 — UI MODULE
// Scientific/research aesthetic UI shell

import React, { useState } from 'react';

// ============================================================
// NAVIGATION STRUCTURE
// ============================================================

interface NavItem {
  id: string;
  label: string;
  status: 'ACTIVE' | 'FUTURE';
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', status: 'ACTIVE', description: 'System architecture overview' },
  { id: 'cases', label: 'Cases', status: 'ACTIVE', description: 'Research case management' },
  { id: 'evidence', label: 'Evidence', status: 'ACTIVE', description: 'Evidence tracking and provenance' },
  { id: 'authority', label: 'Authority', status: 'ACTIVE', description: 'Human governance and authority policies' },
  { id: 'audit', label: 'Audit', status: 'ACTIVE', description: 'Append-only audit trail' },
  { id: 'reasoning', label: 'Reasoning', status: 'FUTURE', description: 'NOT IMPLEMENTED / FUTURE MODULE' },
  { id: 'causal', label: 'Causal', status: 'FUTURE', description: 'NOT IMPLEMENTED / FUTURE MODULE' },
  { id: 'abstraction', label: 'Abstraction', status: 'FUTURE', description: 'NOT IMPLEMENTED / FUTURE MODULE' },
  { id: 'world-model', label: 'World Model', status: 'FUTURE', description: 'NOT IMPLEMENTED / FUTURE MODULE' },
  { id: 'planning', label: 'Planning', status: 'FUTURE', description: 'NOT IMPLEMENTED / FUTURE MODULE' },
  { id: 'assurance', label: 'Assurance', status: 'FUTURE', description: 'NOT IMPLEMENTED / FUTURE MODULE' },
  { id: 'experiments', label: 'Experiments', status: 'FUTURE', description: 'NOT IMPLEMENTED / FUTURE MODULE' },
];

// ============================================================
// OVERVIEW PANEL
// ============================================================

function OverviewPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">HAG-RAP V.2</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Human-Governed Deep Reasoning, Abstraction and Planning for Trustworthy Cognitive AI.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mt-2">
          A controlled cognitive-AI research demonstrator for deep reasoning, causal inference,
          abstraction, transferable world models, hierarchical planning, continual replanning,
          formal assurance, human governance, traceability, and scientific evaluation.
        </p>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Central Research Question</h3>
        <p className="text-sm text-slate-600 italic">
          How can a cognitive AI acquire operational criterion through evidence, reasoning,
          correction and experience while ultimate authority over objectives, constraints
          and acceptability remains human-governed?
        </p>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Architecture Status</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <StatusBadge label="Architecture" status="IMPLEMENTED" />
          <StatusBadge label="Scientific Contract" status="IMPLEMENTED" />
          <StatusBadge label="Bounded Contexts" status="DEFINED" />
          <StatusBadge label="Authority Domain" status="FIRST_CLASS" />
          <StatusBadge label="Deep Reasoning" status="NOT_IMPLEMENTED" />
          <StatusBadge label="Causal Engine" status="NOT_IMPLEMENTED" />
          <StatusBadge label="Abstraction" status="NOT_IMPLEMENTED" />
          <StatusBadge label="World Model" status="NOT_IMPLEMENTED" />
          <StatusBadge label="Planning" status="NOT_IMPLEMENTED" />
          <StatusBadge label="Formal Assurance" status="NOT_IMPLEMENTED" />
          <StatusBadge label="TRL4" status="NOT_ACHIEVED" />
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Scientific Invariants</h3>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>S1: Facts ≠ assumptions</li>
          <li>S2: Inference ≠ observation</li>
          <li>S3: Unknown ≠ false</li>
          <li>S4: Prediction ≠ observation</li>
          <li>S5: Simulation ≠ reality</li>
          <li>S6: Correlation ≠ causation</li>
          <li>S11: Capability ≠ permission</li>
          <li>S12: Permission ≠ authority to redefine permission</li>
          <li>S13: Delegation does not create authority</li>
          <li>S14: Human approval cannot be fabricated</li>
          <li>S20: Human intervention must be attributable</li>
        </ul>
      </div>
    </div>
  );
}

function StatusBadge({ label, status }: { label: string; status: string }) {
  const isImplemented = !['NOT_IMPLEMENTED', 'NOT_ACHIEVED'].includes(status);
  return (
    <div className="flex justify-between items-center py-1 px-2 rounded bg-white border border-slate-100">
      <span className="text-slate-600">{label}</span>
      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
        isImplemented ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
      }`}>
        {status}
      </span>
    </div>
  );
}

// ============================================================
// CASES PANEL (DEMO)
// ============================================================

function CasesPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Research Cases</h2>
      <p className="text-sm text-slate-600">
        ResearchCase is the aggregation boundary. Every scientific object belongs to a case.
        Case isolation is mandatory — objects from Case A never silently affect Case B.
      </p>
      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
        <div className="text-xs text-slate-500 mb-2">Case Lifecycle</div>
        <div className="flex gap-2 text-xs">
          {['DRAFT', 'ACTIVE', 'PAUSED', 'CLOSED', 'ARCHIVED'].map(s => (
            <span key={s} className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-600">{s}</span>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Lifecycle is orthogonal to scientific validity state.
        </p>
      </div>
      <div className="border border-amber-200 rounded-lg p-3 bg-amber-50">
        <p className="text-xs text-amber-700">
          Synthetic architecture demonstration available. Future modules will populate this panel.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// EVIDENCE PANEL
// ============================================================

function EvidencePanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Evidence & Epistemics</h2>
      <p className="text-sm text-slate-600">
        Every material scientific claim must be traceable to source/evidence, explicit assumption,
        or explicit inference. No unsupported material conclusion may masquerade as evidence.
      </p>
      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Epistemic Categories</h3>
        <div className="flex flex-wrap gap-1.5">
          {['OBSERVED', 'SUPPORTED_FACT', 'CLAIM', 'ASSUMPTION', 'INFERENCE',
            'HYPOTHESIS', 'PREDICTION', 'SIMULATION_RESULT', 'CONTESTED', 'SUPERSEDED', 'UNKNOWN'].map(c => (
            <span key={c} className="text-[10px] px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono">
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Key Invariants</h3>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>• UNKNOWN ≠ FALSE, UNKNOWN ≠ TRUE</li>
          <li>• ASSUMPTION ≠ FACT</li>
          <li>• INFERENCE ≠ OBSERVATION</li>
          <li>• PREDICTION ≠ OBSERVATION</li>
          <li>• SIMULATION ≠ REALITY</li>
          <li>• CONFIDENCE ≠ CORRECTNESS</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================================
// AUTHORITY PANEL
// ============================================================

function AuthorityPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Authority & Human Governance</h2>
      <p className="text-sm text-slate-600">
        Authority is a first-class domain. Human governance is computational, not decorative.
        The machine may acquire operational criterion but does not thereby acquire authority
        to redefine the conditions of acceptability.
      </p>
      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Authority Semantics</h3>
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-mono px-1.5 py-0.5 bg-red-100 text-red-700 rounded">NON_NEGOTIABLE</span>
            <span>Cannot be modified by any actor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded">HUMAN_LOCKED</span>
            <span>Only authorised human may modify</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">SYSTEM_MODIFIABLE</span>
            <span>System may modify within bounds</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono px-1.5 py-0.5 bg-green-100 text-green-700 rounded">LOCAL_DISCRETION</span>
            <span>Local autonomous operation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">ADVISORY</span>
            <span>Recommendation only</span>
          </div>
        </div>
      </div>
      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Governance Actions</h3>
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          {['INSPECT', 'CHALLENGE', 'CORRECT', 'REJECT', 'OVERRIDE', 'LOCK', 'UNLOCK',
            'STOP_EXECUTION', 'REQUEST_EVIDENCE', 'RECORD_RATIONALE'].map(a => (
            <span key={a} className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-700 font-mono">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AUDIT PANEL
// ============================================================

function AuditPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Audit Trail</h2>
      <p className="text-sm text-slate-600">
        Append-oriented audit. Not ordinary application logging.
        Audit must reconstruct the full scientific chain from input to result.
        Audit events cannot rewrite earlier audit events.
      </p>
      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Event Types</h3>
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          {['CASE_CREATED', 'EVIDENCE_ADDED', 'CLAIM_CREATED', 'REASONING_EXECUTED',
            'PLAN_CREATED', 'HUMAN_INTERVENTION', 'AUTHORITY_DECISION',
            'SIMULATION_EXECUTED', 'EXPERIMENT_RUN'].map(t => (
            <span key={t} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FUTURE MODULE PANEL
// ============================================================

function FutureModulePanel({ moduleId }: { moduleId: string }) {
  const labels: Record<string, string> = {
    'reasoning': 'Reasoning Engine',
    'causal': 'Causal Inference',
    'abstraction': 'Abstraction & Transfer',
    'world-model': 'World Model',
    'planning': 'Planning & Replanning',
    'assurance': 'Formal Assurance',
    'experiments': 'Scientific Experiments',
  };
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">{labels[moduleId] ?? moduleId}</h2>
      <div className="border border-amber-200 rounded-lg p-6 bg-amber-50 text-center">
        <div className="text-2xl mb-2">⬡</div>
        <p className="text-sm font-semibold text-amber-800">NOT IMPLEMENTED / FUTURE MODULE</p>
        <p className="text-xs text-amber-600 mt-2">
          This module's contract is defined. Implementation reserved for future work packages.
        </p>
      </div>
      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">What this module will provide</h3>
        <p className="text-xs text-slate-600">
          Contract interfaces are defined in ORDER 0. Engines will be implemented in subsequent orders
          without requiring destructive changes to foundational types.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [activePanel, setActivePanel] = useState('overview');

  const renderPanel = () => {
    switch (activePanel) {
      case 'overview': return <OverviewPanel />;
      case 'cases': return <CasesPanel />;
      case 'evidence': return <EvidencePanel />;
      case 'authority': return <AuthorityPanel />;
      case 'audit': return <AuditPanel />;
      default: return <FutureModulePanel moduleId={activePanel} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h1 className="text-sm font-bold text-slate-800 tracking-tight">HAG-RAP V.2</h1>
          <p className="text-[10px] text-slate-500 mt-0.5">ORDER 0 — Architecture</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                activePanel === item.id
                  ? 'bg-slate-800 text-white'
                  : item.status === 'FUTURE'
                    ? 'text-slate-400 hover:bg-slate-100'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="font-medium">{item.label}</span>
              {item.status === 'FUTURE' && (
                <span className="ml-1 text-[9px] opacity-60">[future]</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-200">
          <div className="text-[9px] text-slate-400 space-y-0.5">
            <div>GREENFIELD: YES</div>
            <div>ENGINES: NOT IMPLEMENTED</div>
            <div>ARCHITECTURE: IMPLEMENTED</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl">
          {renderPanel()}
        </div>
      </main>
    </div>
  );
}
