import React, { useState } from 'react';
import { INDUSTRIES_SERVED, IndustrySector } from '../data/capabilitiesData';
import { Shield, BatteryCharging, Plane, Wifi, CheckCircle2, ArrowRight } from 'lucide-react';

interface IndustriesSectionProps {
  onOpenRfq: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenRfq }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(INDUSTRIES_SERVED[0].id);

  const activeSector = INDUSTRIES_SERVED.find(s => s.id === selectedIndustry) || INDUSTRIES_SERVED[0];

  const getSectorIcon = (name: string, isSelected: boolean) => {
    const cls = `w-6 h-6 ${isSelected ? 'text-cyan-400' : 'text-blue-400'}`;
    switch (name) {
      case 'Shield':
        return <Shield className={cls} />;
      case 'BatteryCharging':
        return <BatteryCharging className={cls} />;
      case 'Plane':
        return <Plane className={cls} />;
      case 'Wifi':
        return <Wifi className={cls} />;
      default:
        return <Shield className={cls} />;
    }
  };

  return (
    <section id="industries" className="py-16 md:py-24 border-b border-blue-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            Sector Applications
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Industries Served
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Deploying rugged, high-density hardware across demanding mission profiles — from avionics telemetry and high-voltage automotive to ultra-low-power industrial edge networks.
          </p>
        </div>

        {/* 4 Sector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {INDUSTRIES_SERVED.map((sector) => {
            const isSelected = selectedIndustry === sector.id;

            return (
              <button
                key={sector.id}
                onClick={() => setSelectedIndustry(sector.id)}
                className={`text-left p-6 rounded-xl border transition-all duration-200 group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0E1A34] border-cyan-500 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/50'
                    : 'bg-[#0A1324] border-blue-900/40 hover:border-blue-700/60 hover:bg-[#0C172C]'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 transition-transform group-hover:scale-105 ${
                    isSelected ? 'bg-cyan-950/80 border-cyan-700/50' : 'bg-blue-950 border-blue-800/40'
                  }`}>
                    {getSectorIcon(sector.iconName, isSelected)}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {sector.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sector.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-blue-900/30 flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-cyan-400 font-semibold' : 'text-slate-400'}>
                    {isSelected ? 'Active Profile' : 'Inspect Scope'}
                  </span>
                  <span className="text-slate-400">→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Hardware Architecture Breakdown */}
        <div className="bg-[#0B1528] rounded-xl border border-blue-900/50 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-blue-900/40 mb-6">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Field Deployment Blueprint · {activeSector.title}
              </div>
              <h4 className="text-xl font-bold text-white">
                {activeSector.description}
              </h4>
            </div>

            <button
              onClick={onOpenRfq}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Build for {activeSector.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
                Key Hardware Implementations & Subsystems
              </h5>
              <div className="space-y-2.5">
                {activeSector.applications.map((app, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-blue-950/30 border border-blue-900/30 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
                Target Compliance & Environmental Standards
              </h5>
              <div className="space-y-2.5">
                {activeSector.standards.map((std, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#070D18] border border-blue-900/30 text-xs">
                    <span className="font-semibold text-white">{std}</span>
                    <span className="text-[11px] font-mono text-blue-300">Certified Protocol</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-xl bg-blue-900/10 border border-blue-800/30 text-xs text-slate-300 leading-relaxed">
                Madtronix provides turnkey testing dossiers, complete design files (Gerbers, Schematics, Altium databases), and factory production programming fixtures for {activeSector.title} rollouts.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
