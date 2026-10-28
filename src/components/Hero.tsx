import React from 'react';
import { COMPANY_INFO } from '../data/capabilitiesData';
import { ArrowRight, FileText, CheckCircle2, Shield, Cpu, Activity, MapPin, Globe } from 'lucide-react';

interface HeroProps {
  onOpenRfq: () => void;
  onOpenPdf: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRfq, onOpenPdf }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-blue-900/30">
      {/* Background technical grid and blue glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-75 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Eyebrow with quiet metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-blue-400 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950/80 border border-blue-800/40 text-blue-300 font-semibold tracking-wider uppercase">
            Capability Overview
          </span>
          <span className="text-slate-500" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            Headquarters: {COMPANY_INFO.headquarters}
          </span>
          <span className="text-slate-500" aria-hidden="true">·</span>
          <a 
            href={`https://${COMPANY_INFO.website}`} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-1 text-blue-300 hover:text-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            {COMPANY_INFO.website}
          </a>
        </div>

        {/* Hero Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Madtronix Systems <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200">
                Private Limited
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl text-balance">
              {COMPANY_INFO.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Delivering comprehensive electronic design services, transforming complex system specifications into production-grade hardware architectures. From high-speed multilayer PCB design to bare-metal RTOS firmware and quick-turn laboratory verification.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenRfq}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-lg shadow-blue-600/25 focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>Request Engineering Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPdf}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-blue-200 hover:text-white bg-[#0A162B] hover:bg-blue-950/80 border border-blue-800/50 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Download Capabilities PDF</span>
              </button>
            </div>

            {/* Trust Markers Strip */}
            <div className="pt-6 border-t border-blue-900/30 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>IPC Class 2 & 3 Precision</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>MIL-STD-810 / 461 Design</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>-40°C to +125°C Conduction</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Hardware Presentation Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-blue-950/60 to-[#0A1222] p-1 border border-blue-800/40 shadow-2xl">
              <div className="relative rounded-xl overflow-hidden bg-[#060D1A]">
                
                {/* SMT Automated PCB Manufacturing image from page 2 */}
                <div className="relative aspect-[16/10] overflow-hidden group">
                  <img
                    src="/assets/pcb-industry-cover.jpg"
                    alt="Precision automated electronic SMT assembly and PCB manufacturing"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gracefully if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-transparent to-black/30" />
                  
                  {/* Subtle technical HUD overlay */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#0A162B]/85 backdrop-blur border border-blue-700/40 text-[10px] font-mono text-cyan-300">
                    SMT PLACEMENT PRECISION 0201 / BGA 0.4MM
                  </div>
                </div>

                {/* Technical Metric Cards within container */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-blue-900/40">
                    <span className="font-semibold text-white">Full-Stack Electronics Delivery</span>
                    <span className="font-mono text-blue-400">TURNKEY PROTOTYPING</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/30">
                      <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                        <Cpu className="w-3.5 h-3.5" />
                        <span className="font-semibold text-slate-200">Multilayer PCB</span>
                      </div>
                      <p className="text-[11px] text-slate-400">High-speed signal routing with controlled impedance.</p>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/30">
                      <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                        <Activity className="w-3.5 h-3.5" />
                        <span className="font-semibold text-slate-200">Bare-Metal Firmware</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Deterministic drivers & RTOS telemetry integration.</p>
                    </div>
                  </div>

                  {/* Fast Action Quote teaser */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-400 font-mono">Turnaround: 7-10 Days Bring-Up</span>
                    <button
                      onClick={onOpenRfq}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 flex items-center gap-1"
                    >
                      Configure Board Spec
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
