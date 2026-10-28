import React from 'react';
import { QUALITY_STANDARDS } from '../data/capabilitiesData';
import { ShieldCheck, Layers, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const QualityAndStandards: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-b border-blue-900/30 bg-[#060D1A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image showcase with technical annotations */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-900/30 to-blue-950/60 p-1 border border-blue-800/40 shadow-2xl">
              <div className="relative rounded-xl overflow-hidden bg-[#070D18]">
                
                {/* PCB Image from Page 5 */}
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <img
                    src="/extracted/img_5.jpg"
                    alt="Precision assembled high-density PCB prototype board with SMT components"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // fallback to pcb-industry-cover if needed
                      (e.target as HTMLImageElement).src = '/assets/pcb-industry-cover.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-black/20" />
                  
                  {/* Floating inspection callout tag */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#0A1324]/90 backdrop-blur border border-blue-700/50 text-xs font-mono text-cyan-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>AOI 100% Optical Inspection Passed</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#0A1324]/90 backdrop-blur border border-blue-900/40 text-xs text-slate-300">
                    <span className="font-semibold text-white">IPC Class 2 & 3 Compliance:</span> Solder fillets inspected for voiding, wetting angles, and micro-crack resistance.
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillars from PDF */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
                {QUALITY_STANDARDS.tag}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                {QUALITY_STANDARDS.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {QUALITY_STANDARDS.lead}
              </p>
            </div>

            <div className="space-y-5">
              {QUALITY_STANDARDS.features.map((feature, idx) => (
                <div 
                  key={feature.id}
                  className="p-5 rounded-xl bg-[#0A1324] border border-blue-900/40 hover:border-blue-700/60 transition-colors shadow-md"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-mono font-bold text-cyan-400">0{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs font-semibold text-blue-300 mb-2">
                        {feature.description}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {feature.details}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
