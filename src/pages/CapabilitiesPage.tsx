import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CORE_CAPABILITIES, SPECIALIZED_DISCIPLINES, COMPANY_INFO } from '../data/capabilitiesData';
import { Layers, Terminal, Zap, Cpu, Code, Binary, Radio, ArrowRight, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

interface CapabilitiesPageProps {
  onOpenRfq: () => void;
  onOpenPdf: () => void;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({ onOpenRfq, onOpenPdf }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'advanced'>('all');

  const filteredDisciplines = SPECIALIZED_DISCIPLINES.filter(d => {
    if (activeCategory === 'all') return true;
    return d.category === activeCategory;
  });

  const getDisciplineIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Code': return <Code className="w-5 h-5 text-sky-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Binary': return <Binary className="w-5 h-5 text-indigo-400" />;
      case 'Radio': return <Radio className="w-5 h-5 text-emerald-400" />;
      default: return <Cpu className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
            <Link to="/" className="hover:text-blue-300">Home</Link>
            <span>/</span>
            <span className="text-cyan-400">Capabilities & Disciplines</span>
          </div>

          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            Engineering Core Capabilities & Disciplines
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Hardware Architecture & High-Speed Electronic Design
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {CORE_CAPABILITIES.lead}
          </p>
        </div>

        {/* Core Pillars (Slide 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CORE_CAPABILITIES.pillars.map((pillar, idx) => (
            <div 
              key={pillar.id}
              className="bg-[#0A1324] rounded-xl border border-blue-900/40 p-6 flex flex-col justify-between hover:border-blue-700/60 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center">
                    {idx === 0 && <Layers className="w-5 h-5 text-cyan-400" />}
                    {idx === 1 && <Terminal className="w-5 h-5 text-blue-400" />}
                    {idx === 2 && <Zap className="w-5 h-5 text-sky-400" />}
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    Pillar 0{idx + 1}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">{pillar.title}</h2>
                <p className="text-sm font-semibold text-blue-300 mb-3">{pillar.description}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{pillar.details}</p>
              </div>

              <div className="pt-4 border-t border-blue-900/30 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="text-cyan-400 font-semibold">{pillar.metric}</span>
              </div>
            </div>
          ))}
        </div>


        {/* Specialized Disciplines & Advanced Specializations (Slides 3 & 8) */}
        <div className="pt-6 border-t border-blue-900/30 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-1">
                Disciplines & Toolchains
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Specialized Engineering Disciplines & Specializations
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-[#091222] rounded-lg border border-blue-900/40 shrink-0">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeCategory === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Disciplines ({SPECIALIZED_DISCIPLINES.length})
              </button>
              <button
                onClick={() => setActiveCategory('core')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeCategory === 'core' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Core Disciplines
              </button>
              <button
                onClick={() => setActiveCategory('advanced')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeCategory === 'advanced' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Advanced RF & FPGA
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDisciplines.map((item) => (
              <div
                key={item.id}
                className="bg-[#0A1428] rounded-xl border border-blue-900/40 p-6 flex flex-col justify-between hover:border-blue-600/50 hover:bg-[#0C1932] transition-all group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/40 flex items-center justify-center">
                      {getDisciplineIcon(item.iconName)}
                    </div>
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      {item.category === 'core' ? 'Core Service' : 'Specialization'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mb-4">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Tools & Frameworks
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.map((t) => (
                        <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-900/40 text-blue-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Deliverables
                    </div>
                    {item.deliverables.map((deliv, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-900/30 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Verified Output</span>
                  <button
                    onClick={onOpenRfq}
                    className="text-xs font-semibold text-blue-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Request Spec</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#0A1324] rounded-2xl border border-blue-900/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Need a custom hardware architecture?</h3>
            <p className="text-xs text-slate-300">Consult with our engineering directors in Noida, India on your schematics and layer stackup.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPdf}
              className="px-4 py-2.5 text-xs font-medium text-blue-200 bg-blue-950 border border-blue-800/40 rounded-lg hover:text-white"
            >
              PDF Deck
            </button>
            <button
              onClick={onOpenRfq}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md"
            >
              Request Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
