import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { CORE_CAPABILITIES, LIFECYCLE_STEPS, INDUSTRIES_SERVED, ENGAGEMENT_MODELS } from '../data/capabilitiesData';
import { ArrowRight, Layers, Terminal, Zap, ShieldCheck, Activity, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onOpenRfq: () => void;
  onOpenPdf: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRfq, onOpenPdf }) => {
  return (
    <div>
      {/* Hero Section */}
      <Hero onOpenRfq={onOpenRfq} onOpenPdf={onOpenPdf} />

      {/* Quick Navigation Cards Bar */}
      <section className="py-12 border-b border-blue-900/30 bg-[#060D1A]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Capabilities', path: '/capabilities', icon: <Layers className="w-4 h-4 text-cyan-400" />, desc: 'PCB, Firmware, RF' },
              { label: 'Lifecycle', path: '/lifecycle', icon: <Activity className="w-4 h-4 text-blue-400" />, desc: '4-Phase Process' },
              { label: 'Laboratory', path: '/laboratory', icon: <Activity className="w-4 h-4 text-sky-400" />, desc: 'Scope & SMT Lab' },
              { label: 'Defense', path: '/laboratory', icon: <ShieldCheck className="w-4 h-4 text-indigo-400" />, desc: 'MIL-STD Avionics' },
              { label: 'Industries', path: '/industries', icon: <Cpu className="w-4 h-4 text-teal-400" />, desc: 'EV, Drones, IoT' },
              { label: 'Engagement', path: '/engagement', icon: <Zap className="w-4 h-4 text-blue-300" />, desc: 'Turnkey NPI' },
            ].map((nav, idx) => (
              <Link
                key={idx}
                to={nav.path}
                className="p-3.5 rounded-xl bg-[#0A1324] border border-blue-900/40 hover:border-blue-600/60 hover:bg-[#0E1A33] transition-all group flex flex-col justify-between"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-950/80 border border-blue-800/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  {nav.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{nav.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                  <div className="text-[11px] text-slate-400">{nav.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities Snapshot */}
      <section className="py-16 md:py-24 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
                {CORE_CAPABILITIES.tag}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
                {CORE_CAPABILITIES.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                {CORE_CAPABILITIES.lead}
              </p>
            </div>

            <Link
              to="/capabilities"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-blue-300 hover:text-white bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/50 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore All Capabilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {CORE_CAPABILITIES.pillars.map((pillar, idx) => (
              <div 
                key={pillar.id}
                className="bg-[#0A1324] rounded-xl border border-blue-900/40 p-6 flex flex-col justify-between hover:border-blue-700/60 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">Pillar 0{idx + 1}</span>
                    <span className="text-[11px] font-mono text-slate-400">{pillar.metric}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-medium text-blue-300/90 mb-2">
                    {pillar.description}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.details}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-blue-900/30">
                  <Link
                    to="/capabilities"
                    className="text-xs font-semibold text-blue-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        
        </div>
      </section>

      {/* Development Lifecycle Snapshot */}
      <section className="py-16 md:py-24 border-b border-blue-900/30 bg-[#060D1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
                Proven Methodology
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
                End-to-End Development Lifecycle
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                A structured four-phase engineering journey from architecture freeze to pilot manufacturing validation.
              </p>
            </div>

            <Link
              to="/lifecycle"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-blue-300 hover:text-white bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/50 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Inspect All Phases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LIFECYCLE_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="bg-[#0A1324] rounded-xl border border-blue-900/40 p-5 flex flex-col justify-between hover:border-blue-600/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-mono font-bold text-cyan-400">{step.step}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase bg-blue-950 px-2 py-0.5 rounded">
                      Phase 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-xs text-blue-300/80 mb-2">{step.summary}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.focus}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-blue-900/30">
                  <span className="text-[11px] font-mono text-cyan-400">
                    {step.outputs[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Engagement Models Callout */}
      <section className="py-16 md:py-20 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-950 via-[#0C1833] to-[#0A1428] rounded-2xl border border-blue-800/50 p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Engagement Models
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Ready to Bring Up Your Next Hardware Architecture?
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Choose between Turnkey Product NPI, On-Demand R&D Burst, or Design Optimization. Backed by IPC Class 2 & 3 compliance, MIL-STD design, and in-house laboratory testing.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Turnkey Concept-to-Gerber
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Controlled Impedance ±5%
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  -40°C to +125°C Conduction
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={onOpenRfq}
                className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-600/30 text-center"
              >
                Configure Project RFQ
              </button>
              <Link
                to="/engagement"
                className="px-6 py-3 text-xs font-medium text-blue-200 hover:text-white bg-blue-900/30 hover:bg-blue-900/60 border border-blue-700/50 rounded-lg transition-colors text-center"
              >
                Compare Engagement Models
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
