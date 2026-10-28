import React from 'react';
import { Link } from 'react-router-dom';
import { QUALITY_STANDARDS, LABORATORY_CAPABILITIES, DEFENSE_AEROSPACE } from '../data/capabilitiesData';
import { OscilloscopeBench } from '../components/OscilloscopeBench';
import { ShieldCheck, Activity, Zap, Thermometer, Shield, Navigation, ThermometerSnowflake, CheckCircle2, ArrowRight } from 'lucide-react';

interface LaboratoryPageProps {
  onOpenRfq: () => void;
  onOpenPdf: () => void;
}

export const LaboratoryPage: React.FC<LaboratoryPageProps> = ({ onOpenRfq, onOpenPdf }) => {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
            <Link to="/" className="hover:text-blue-300">Home</Link>
            <span>/</span>
            <span className="text-cyan-400">Laboratory & Standards</span>
          </div>

          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            Testing, Verification & Prototyping Standards
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            In-House Laboratory & Defense Standards
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Catching signal flaws, power anomalies, and thermal stress well before pilot manufacturing commits through precision laboratory equipment and IPC/MIL-STD compliance.
          </p>
        </div>

        {/* In-House Laboratory Capabilities (Slide 6) with interactive Oscilloscope Bench */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-7">
              <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
                {LABORATORY_CAPABILITIES.tag}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {LABORATORY_CAPABILITIES.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mb-6">
                {LABORATORY_CAPABILITIES.lead}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {LABORATORY_CAPABILITIES.instruments.map((inst, idx) => (
                  <div key={inst.id} className="p-4 rounded-xl bg-[#0A1324] border border-blue-900/40">
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      {idx === 0 && <Activity className="w-4 h-4" />}
                      {idx === 1 && <Zap className="w-4 h-4" />}
                      {idx === 2 && <Thermometer className="w-4 h-4" />}
                      <h3 className="text-xs font-bold text-white">{inst.title}</h3>
                    </div>
                    <p className="text-[11px] text-blue-300 font-medium mb-1">{inst.description}</p>
                    <p className="text-[11px] text-slate-400">{inst.subtext}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-blue-800/40 shadow-2xl relative aspect-[16/10] bg-[#070D18]">
                <img
                  src="/assets/lab-testing-probe.jpg"
                  alt="Laboratory active probing bench"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/extracted/img_6.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-black/20" />
                <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded bg-black/80 backdrop-blur border border-blue-900/50 text-[11px] font-mono text-cyan-300 flex items-center justify-between">
                  <span>HIGH-BANDWIDTH DIFFERENTIAL SCOPE</span>
                  <span>4GHz CAPTURE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Oscilloscope Bench */}
          <OscilloscopeBench />
        </div>

        {/* Hardware Quality & SMT Precision (Slide 5) */}
        <div className="pt-12 border-t border-blue-900/30 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-blue-800/40 shadow-2xl relative aspect-[4/3] bg-[#070D18]">
                <img
                  src="/extracted/img_5.jpg"
                  alt="Assembled PCB board"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/pcb-industry-cover.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-black/20" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0A1324]/90 backdrop-blur border border-blue-700/50 text-xs font-mono text-cyan-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>IPC Class 2 & 3 Compliance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
                  {QUALITY_STANDARDS.tag}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {QUALITY_STANDARDS.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {QUALITY_STANDARDS.lead}
                </p>
              </div>

              <div className="space-y-4">
                {QUALITY_STANDARDS.features.map((feat, idx) => (
                  <div key={feat.id} className="p-4 rounded-xl bg-[#0A1324] border border-blue-900/40">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-mono font-bold text-cyan-400">0{idx + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{feat.title}</h3>
                        <p className="text-xs font-semibold text-blue-300 mb-1">{feat.description}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{feat.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Defense & Aerospace Engineering (Slide 7) */}
        <div className="pt-12 border-t border-blue-900/30">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
              {DEFENSE_AEROSPACE.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {DEFENSE_AEROSPACE.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {DEFENSE_AEROSPACE.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {DEFENSE_AEROSPACE.cards.map((card, idx) => (
              <div key={card.id} className="p-6 rounded-xl bg-[#0A1428] border border-blue-900/40 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center mb-4">
                    {idx === 0 && <Shield className="w-5 h-5 text-cyan-400" />}
                    {idx === 1 && <Navigation className="w-5 h-5 text-blue-400" />}
                    {idx === 2 && <ThermometerSnowflake className="w-5 h-5 text-sky-400" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-xs font-semibold text-blue-300 mb-2">{card.description}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.details}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-blue-900/30 text-[11px] font-mono text-cyan-400">
                  {idx === 0 ? 'MIL-STD-810H & Shock Tested' : idx === 1 ? 'Flight Telemetry & Actuation' : 'Passive Conduction Cooling'}
                </div>
              </div>
            ))}
          </div>

          {/* Consultation CTA */}
          <div className="bg-[#0A1324] rounded-2xl border border-blue-900/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Schedule Laboratory or Environmental Testing</h3>
              <p className="text-xs text-slate-300">Submit your hardware unit or layout files for pre-compliance screening and signal analysis.</p>
            </div>
            <button
              onClick={onOpenRfq}
              className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md whitespace-nowrap shrink-0"
            >
              Request Lab Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
