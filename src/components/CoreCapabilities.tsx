import React from 'react';
import { CORE_CAPABILITIES } from '../data/capabilitiesData';
import { PcbStackupViewer } from './PcbStackupViewer';
import { Layers, Terminal, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface CoreCapabilitiesProps {
  onOpenRfq: () => void;
}

export const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({ onOpenRfq }) => {
  return (
    <section id="capabilities" className="py-16 md:py-24 border-b border-blue-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            {CORE_CAPABILITIES.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {CORE_CAPABILITIES.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            {CORE_CAPABILITIES.lead}
          </p>
        </div>

        {/* 3 Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CORE_CAPABILITIES.pillars.map((pillar, idx) => {
            const icons = [
              <Layers className="w-5 h-5 text-blue-400" key="1" />,
              <Terminal className="w-5 h-5 text-cyan-400" key="2" />,
              <Zap className="w-5 h-5 text-sky-400" key="3" />
            ];

            return (
              <div 
                key={pillar.id}
                className="bg-[#0A1324] rounded-xl border border-blue-900/40 p-6 flex flex-col justify-between hover:border-blue-700/60 transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {icons[idx]}
                    </div>
                    <span className="text-xs font-mono text-blue-400/80 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900/40">
                      Pillar 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-blue-300/90 mb-3">
                    {pillar.description}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {pillar.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-blue-900/30 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="text-cyan-400 font-semibold">{pillar.metric}</span>
                  <button 
                    onClick={onOpenRfq}
                    className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Spec</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Embedded Interactive Stackup Synthesizer Component */}
        <div className="mt-8">
          <PcbStackupViewer />
        </div>

      </div>
    </section>
  );
};
