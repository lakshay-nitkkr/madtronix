import React from 'react';
import { DEFENSE_AEROSPACE } from '../data/capabilitiesData';
import { Shield, Navigation, ThermometerSnowflake, CheckCircle2, ArrowRight } from 'lucide-react';

interface DefenseAerospaceProps {
  onOpenRfq: () => void;
}

export const DefenseAerospace: React.FC<DefenseAerospaceProps> = ({ onOpenRfq }) => {
  return (
    <section className="py-16 md:py-24 border-b border-blue-900/30 bg-[#060D1A]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            {DEFENSE_AEROSPACE.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {DEFENSE_AEROSPACE.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            {DEFENSE_AEROSPACE.lead}
          </p>
        </div>

        {/* 3 Mission-Critical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEFENSE_AEROSPACE.cards.map((card, idx) => {
            const icons = [
              <Shield className="w-6 h-6 text-cyan-400" key="1" />,
              <Navigation className="w-6 h-6 text-blue-400" key="2" />,
              <ThermometerSnowflake className="w-6 h-6 text-sky-400" key="3" />
            ];

            return (
              <div
                key={card.id}
                className="bg-[#0A1428] rounded-xl border border-blue-900/40 p-6 flex flex-col justify-between hover:border-blue-500/60 transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/40 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    {icons[idx]}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm font-semibold text-blue-300/90 mb-3">
                    {card.description}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {card.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-blue-900/30 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase">
                    {idx === 0 ? 'MIL-STD-810H' : idx === 1 ? 'DO-254 / ARINC' : '-40°C to +125°C'}
                  </span>
                  <button
                    onClick={onOpenRfq}
                    className="text-xs font-semibold text-blue-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Engage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
