import React from 'react';
import { ENGAGEMENT_MODELS, EngagementModel } from '../data/capabilitiesData';
import { Layers, Zap, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

interface EngagementSectionProps {
  onOpenRfq: (modelId?: string) => void;
}

export const EngagementSection: React.FC<EngagementSectionProps> = ({ onOpenRfq }) => {
  return (
    <section id="engagement" className="py-16 md:py-24 border-b border-blue-900/30 bg-[#060D1A]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            Engagement Models
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Flexible Commercial Collaboration
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Tailored engineering contracts engineered around your internal team's bandwidth, time-to-market priorities, and compliance requirements.
          </p>
        </div>

        {/* 3 Collaboration Cards from PDF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENGAGEMENT_MODELS.map((model, idx) => {
            const icons = [
              <Layers className="w-5 h-5 text-cyan-400" key="1" />,
              <Zap className="w-5 h-5 text-blue-400" key="2" />,
              <RefreshCw className="w-5 h-5 text-sky-400" key="3" />
            ];

            return (
              <div
                key={model.id}
                className="bg-[#0A1428] rounded-xl border border-blue-900/40 p-6 md:p-7 flex flex-col justify-between hover:border-blue-500/60 hover:bg-[#0C1932] transition-all duration-300 shadow-xl group relative overflow-hidden"
              >
                {/* Top Subtle Pill Badge matching PDF design */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-950/90 border border-blue-800/40 flex items-center justify-center">
                      {icons[idx]}
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40 font-semibold">
                      {model.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {model.title}
                  </h3>

                  <p className="text-sm font-semibold text-blue-300 mb-3 leading-relaxed">
                    {model.description}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {model.suitableFor}
                  </p>

                  {/* Scope details */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Scope of Engagement
                    </div>
                    {model.scope.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-blue-900/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Turnaround Time:</span>
                    <span className="text-white font-medium">{model.turnaround}</span>
                  </div>

                  <button
                    onClick={() => onOpenRfq(model.id)}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                  >
                    <span>Initiate {model.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
