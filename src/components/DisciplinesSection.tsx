import React, { useState } from 'react';
import { SPECIALIZED_DISCIPLINES, Discipline } from '../data/capabilitiesData';
import { Cpu, Layers, Code, Zap, Binary, Radio, Check, ChevronRight } from 'lucide-react';

interface DisciplinesSectionProps {
  onOpenRfq: () => void;
}

export const DisciplinesSection: React.FC<DisciplinesSectionProps> = ({ onOpenRfq }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'advanced'>('all');

  const filteredDisciplines = SPECIALIZED_DISCIPLINES.filter((d) => {
    if (activeTab === 'all') return true;
    return d.category === activeTab;
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-sky-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Binary':
        return <Binary className="w-5 h-5 text-indigo-400" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="disciplines" className="py-16 md:py-24 border-b border-blue-900/30 bg-[#060D1A]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Functional Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
              Service Offerings & Advanced Specializations
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Specialized Engineering Disciplines
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Transforming complex electronic specifications into high-reliability hardware from schematic capture to sub-6 GHz RF and FPGA DSP acceleration.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional Button Elements) */}
          <div className="flex items-center gap-1 p-1 bg-[#091222] rounded-lg border border-blue-900/40 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Disciplines ({SPECIALIZED_DISCIPLINES.length})
            </button>
            <button
              onClick={() => setActiveTab('core')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'core'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Core Engineering
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'advanced'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Advanced & RF / FPGA
            </button>
          </div>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDisciplines.map((item) => (
            <div
              key={item.id}
              className="bg-[#0A1426] rounded-xl border border-blue-900/40 p-6 flex flex-col justify-between hover:border-blue-600/50 hover:bg-[#0C1930] transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    {item.category === 'core' ? 'Core Discipline' : 'Advanced Specialization'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                  {item.description}
                </p>

                {/* Toolchain strip */}
                <div className="mb-4">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Engineering Toolchain
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-900/40 text-blue-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Deliverables
                  </div>
                  {item.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-blue-900/30 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">Turnkey Milestone Delivery</span>
                <button
                  onClick={onOpenRfq}
                  className="text-xs font-semibold text-blue-400 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Inquire</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
