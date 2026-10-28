import React from 'react';
import { LABORATORY_CAPABILITIES } from '../data/capabilitiesData';
import { OscilloscopeBench } from './OscilloscopeBench';
import { Activity, Zap, Thermometer, ShieldCheck } from 'lucide-react';

export const LaboratorySection: React.FC = () => {
  return (
    <section id="laboratory" className="py-16 md:py-24 border-b border-blue-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Laboratory Photo Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7">
            <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
              {LABORATORY_CAPABILITIES.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              {LABORATORY_CAPABILITIES.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              {LABORATORY_CAPABILITIES.lead}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {LABORATORY_CAPABILITIES.instruments.map((inst, idx) => (
                <div key={inst.id} className="p-4 rounded-xl bg-[#0A1324] border border-blue-900/40">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    {idx === 0 && <Activity className="w-4 h-4" />}
                    {idx === 1 && <Zap className="w-4 h-4" />}
                    {idx === 2 && <Thermometer className="w-4 h-4" />}
                    <h3 className="text-sm font-bold text-white">{inst.title}</h3>
                  </div>
                  <p className="text-xs text-blue-300 font-medium mb-1.5">{inst.description}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{inst.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-900/40 to-blue-950 p-1 border border-blue-800/40 shadow-2xl">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#070D18]">
                <img
                  src="/assets/lab-testing-probe.jpg"
                  alt="Laboratory engineer testing hardware with mixed-signal oscilloscope active probe"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/extracted/img_6.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-black/20" />
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded bg-[#0A1324]/85 backdrop-blur border border-blue-900/40 text-[11px] font-mono text-cyan-300 flex items-center justify-between">
                  <span>ACTIVE DIFFERENTIAL PROBING</span>
                  <span>4GHz STORAGE SCOPE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Oscilloscope Bench */}
        <div className="mt-8">
          <OscilloscopeBench />
        </div>

      </div>
    </section>
  );
};
