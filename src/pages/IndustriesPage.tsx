import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INDUSTRIES_SERVED } from '../data/capabilitiesData';
import { Shield, BatteryCharging, Plane, Wifi, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

interface IndustriesPageProps {
  onOpenRfq: () => void;
  onOpenPdf: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onOpenRfq, onOpenPdf }) => {
  const [activeSectorId, setActiveSectorId] = useState<string>(INDUSTRIES_SERVED[0].id);

  const activeSector = INDUSTRIES_SERVED.find(s => s.id === activeSectorId) || INDUSTRIES_SERVED[0];

  const getSectorIcon = (name: string, active: boolean) => {
    const cls = `w-6 h-6 ${active ? 'text-cyan-400' : 'text-blue-400'}`;
    switch (name) {
      case 'Shield': return <Shield className={cls} />;
      case 'BatteryCharging': return <BatteryCharging className={cls} />;
      case 'Plane': return <Plane className={cls} />;
      case 'Wifi': return <Wifi className={cls} />;
      default: return <Shield className={cls} />;
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
            <Link to="/" className="hover:text-blue-300">Home</Link>
            <span>/</span>
            <span className="text-cyan-400">Industries Served</span>
          </div>

          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            Sector Applications & Operational Profiles
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Mission-Critical Hardware Across Key Sectors
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Deploying rugged, high-density electronic designs across defense communications, electric mobility, autonomous aerial robotics, and low-power telemetry networks.
          </p>
        </div>

        {/* 4 Interactive Sectors Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {INDUSTRIES_SERVED.map((sec) => {
            const isSelected = activeSectorId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectorId(sec.id)}
                className={`text-left p-6 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0E1A34] border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400'
                    : 'bg-[#0A1324] border-blue-900/40 hover:border-blue-700/60 hover:bg-[#0C172C]'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${
                    isSelected ? 'bg-cyan-950/80 border-cyan-600/50' : 'bg-blue-950 border-blue-800/40'
                  }`}>
                    {getSectorIcon(sec.iconName, isSelected)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{sec.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{sec.description}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-blue-900/30 flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-cyan-400 font-semibold' : 'text-slate-400'}>
                    {isSelected ? 'Active Sector' : 'Explore Architecture'}
                  </span>
                  <span className="text-slate-400">→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Sector Blueprint Panel */}
        <div className="bg-[#0B1528] rounded-2xl border border-blue-900/50 p-6 md:p-10 shadow-2xl mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-blue-900/40 mb-8">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Sector Deployment Profile · {activeSector.title}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {activeSector.description}
              </h2>
              <p className="text-sm text-slate-300">
                Custom electronic sub-assemblies, ruggedization coatings, and production test fixtures engineered for {activeSector.title} field operations.
              </p>
            </div>

            <button
              onClick={onOpenRfq}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-lg shadow-blue-600/25"
            >
              <span>Build for {activeSector.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-4">
                Subsystems & Hardware Implementations
              </h3>
              <div className="space-y-3">
                {activeSector.applications.map((app, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-lg bg-blue-950/30 border border-blue-900/30 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium text-slate-100">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-4">
                Compliance, Environmental & EMC Directives
              </h3>
              <div className="space-y-3">
                {activeSector.standards.map((std, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-lg bg-[#070D18] border border-blue-900/40 text-xs">
                    <span className="font-semibold text-white">{std}</span>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/40">
                      Pre-Compliance Ready
                    </span>
                  </div>
                ))}

                <div className="mt-6 p-4 rounded-xl bg-blue-900/15 border border-blue-800/40 text-xs text-slate-300 space-y-2">
                  <span className="font-semibold text-white">Full Design IP Ownership:</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    All schematics, Altium/Allegro databases, BOM cost models, and firmware source repositories are transferred 100% unencumbered to the client upon milestone completion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Sectors Detailed Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INDUSTRIES_SERVED.map((sec) => (
            <div key={sec.id} className="p-6 rounded-xl bg-[#0A1324] border border-blue-900/40 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{sec.title}</h3>
                <span className="text-[11px] font-mono text-cyan-400">{sec.standards[0]}</span>
              </div>
              <p className="text-xs text-slate-300">{sec.description}</p>
              <div className="space-y-1.5 pt-2">
                {sec.applications.slice(0, 3).map((a, idx) => (
                  <div key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
