import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LIFECYCLE_STEPS } from '../data/capabilitiesData';
import { CheckCircle2, ArrowRight, FileCheck, Layers, Cpu, ShieldCheck, Sparkles, Terminal, FileText } from 'lucide-react';

interface LifecyclePageProps {
  onOpenRfq: () => void;
  onOpenPdf: () => void;
}

export const LifecyclePage: React.FC<LifecyclePageProps> = ({ onOpenRfq, onOpenPdf }) => {
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number>(0);
  const current = LIFECYCLE_STEPS[selectedPhaseIdx];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
            <Link to="/" className="hover:text-blue-300">Home</Link>
            <span>/</span>
            <span className="text-cyan-400">Development Lifecycle</span>
          </div>

          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            Engineering Workflow & Gating
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            End-to-End Development Lifecycle
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Our structured, multi-gate hardware design methodology eliminates silicon respins, verifies thermal and signal integrity early, and ensures seamless transition to factory SMT assembly.
          </p>
        </div>

        {/* 4 Phases Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {LIFECYCLE_STEPS.map((step, idx) => {
            const isSelected = selectedPhaseIdx === idx;
            return (
              <button
                key={step.step}
                onClick={() => setSelectedPhaseIdx(idx)}
                className={`text-left p-6 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'bg-[#0E1A34] border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400'
                    : 'bg-[#0A1324] border-blue-900/40 hover:border-blue-700/60 hover:bg-[#0C172C]'
                }`}
              >
                <div className={`h-1 w-full rounded-full mb-4 ${
                  isSelected ? 'bg-gradient-to-r from-blue-400 to-cyan-400' : 'bg-blue-900/40'
                }`} />

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-3xl font-mono font-bold ${isSelected ? 'text-cyan-400' : 'text-blue-500'}`}>
                    {step.step}
                  </span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                    isSelected ? 'bg-cyan-950 text-cyan-200 border border-cyan-800' : 'bg-blue-950 text-slate-400'
                  }`}>
                    Phase 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-xs text-blue-300/80 mb-2">{step.summary}</p>
                <p className="text-xs text-slate-400 line-clamp-2">{step.focus}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Showcase */}
        <div className="bg-[#0B1528] rounded-2xl border border-blue-900/50 p-6 md:p-10 shadow-2xl mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-blue-900/40 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1.5">
                <span className="font-bold">Phase {current.step} Milestone Deep Dive</span>
                <span>·</span>
                <span className="text-white">{current.title}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {current.summary}
              </h2>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                {current.focus}
              </p>
            </div>

            <button
              onClick={onOpenRfq}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-lg shadow-blue-600/25"
            >
              <span>Engage on Phase {current.step}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Rigorous Activities */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Engineering Activities & Gating Audits</span>
              </h3>
              <div className="space-y-3">
                {current.activities.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-blue-950/30 border border-blue-900/30 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tangible Handover Deliverables */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>Verified Client Deliverables</span>
              </h3>
              <div className="space-y-3">
                {current.outputs.map((out, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-lg bg-[#070D18] border border-blue-900/40 text-xs">
                    <span className="font-semibold text-white">{out}</span>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/50">
                      Phase Gate Signoff
                    </span>
                  </div>
                ))}

                <div className="mt-6 p-4 rounded-xl bg-blue-900/15 border border-blue-800/40 text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Madtronix Zero-Respin Quality Gate</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Prior to releasing CAD Gerber packages to the board house, our layout leads perform automated DFM/DFA clearance audits, signal return plane verification, and thermal dissipation simulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Summary Table */}
        <div className="bg-[#0A1324] rounded-xl border border-blue-900/40 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-4">Lifecycle Milestones Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-blue-900/50 text-blue-400 font-mono uppercase">
                <tr>
                  <th className="py-3 px-4">Phase</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Primary Objective</th>
                  <th className="py-3 px-4">Key Verification Output</th>
                  <th className="py-3 px-4">Gate Signoff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30">
                {LIFECYCLE_STEPS.map((step) => (
                  <tr key={step.step} className="hover:bg-blue-950/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{step.step}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{step.title}</td>
                    <td className="py-3.5 px-4 text-slate-300">{step.summary}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-blue-300">{step.outputs[0]}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Formal Review
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
