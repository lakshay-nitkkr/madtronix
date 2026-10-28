import React, { useState } from 'react';
import { LIFECYCLE_STEPS } from '../data/capabilitiesData';
import { CheckCircle2, ArrowRight, FileCheck, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface LifecycleSectionProps {
  onOpenRfq: () => void;
}

export const LifecycleSection: React.FC<LifecycleSectionProps> = ({ onOpenRfq }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = LIFECYCLE_STEPS[activeStepIndex];

  return (
    <section id="lifecycle" className="py-16 md:py-24 border-b border-blue-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            Workflow & Engineering Governance
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            End-to-End Development Lifecycle
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A disciplined four-stage hardware engineering process designed to eliminate respins, identify signal flaws early, and ensure production readiness.
          </p>
        </div>

        {/* 4 Interactive Step Tabs / Horizontal Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {LIFECYCLE_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 relative ${
                  isActive
                    ? 'bg-[#0E1A33] border-blue-500 shadow-lg shadow-blue-900/30 ring-1 ring-blue-500'
                    : 'bg-[#0A1324] border-blue-900/40 hover:border-blue-700/60 hover:bg-[#0C172C]'
                }`}
              >
                {/* Clean Top Indicator bar */}
                <div 
                  className={`h-1 w-full rounded-full mb-4 ${
                    isActive ? 'bg-gradient-to-r from-blue-400 to-cyan-400' : 'bg-blue-900/40'
                  }`} 
                />

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-blue-500'}`}>
                    {step.step}
                  </span>
                  <span className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded ${
                    isActive ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-950 text-slate-400'
                  }`}>
                    Phase 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">
                  {step.title}
                </h3>
                
                <p className="text-xs text-slate-300 line-clamp-2">
                  {step.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Panel for Selected Stage */}
        <div className="bg-[#0B1528] rounded-2xl border border-blue-900/50 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-blue-900/40 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>Phase {currentStep.step} Deep Dive</span>
                <span>·</span>
                <span className="text-white font-semibold">{currentStep.title}</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                {currentStep.summary}
              </h4>
              <p className="text-sm text-slate-300 max-w-3xl">
                {currentStep.focus}
              </p>
            </div>

            <button
              onClick={onOpenRfq}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Initiate Phase {currentStep.step}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Activities list */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Engineering Activities & Rigor</span>
              </h5>
              <div className="space-y-3">
                {currentStep.activities.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-blue-950/30 border border-blue-900/20 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tangible Deliverables */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <span>Client Handover Deliverables</span>
              </h5>
              <div className="space-y-3">
                {currentStep.outputs.map((out, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#070D18] border border-blue-900/30 text-xs">
                    <span className="font-semibold text-white">{out}</span>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      Verified
                    </span>
                  </div>
                ))}

                <div className="mt-4 p-4 rounded-xl bg-blue-900/10 border border-blue-800/30 text-xs text-slate-300">
                  <span className="font-semibold text-blue-300">Phase Gate Assurance:</span> No schematic or layout proceeds to fabrication without formal DRC/ERC review, return-path continuity confirmation, and supply chain BOM verification.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
