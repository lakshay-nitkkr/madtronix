import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/capabilitiesData';
import { Cpu, FileText, MapPin, Mail, Globe, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenRfq: () => void;
  onOpenPdf: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRfq, onOpenPdf }) => {
  return (
    <footer className="bg-[#050A14] border-t border-blue-900/40 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-blue-900/30">
          
          {/* Brand & Corporate Overview */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                MADTRONIX SYSTEMS
              </span>
            </Link>

            <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-sm">
              {COMPANY_INFO.name}
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              High-Speed Hardware Engineering, Embedded Firmware & Turnkey Prototyping. Transforming complex specifications into production-grade electronic systems.
            </p>

            <div className="space-y-1.5 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Headquarters: {COMPANY_INFO.headquarters}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-cyan-300 transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a 
                  href={`https://${COMPANY_INFO.website}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-300 transition-colors"
                >
                  {COMPANY_INFO.website}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Mirrors */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Engineering Pages
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/capabilities" className="hover:text-cyan-300 transition-colors">
                  Core Capabilities & Stackups
                </Link>
              </li>
              <li>
                <Link to="/capabilities" className="hover:text-cyan-300 transition-colors">
                  Specialized Disciplines (RF & FPGA)
                </Link>
              </li>
              <li>
                <Link to="/lifecycle" className="hover:text-cyan-300 transition-colors">
                  Development Lifecycle & DFM
                </Link>
              </li>
              <li>
                <Link to="/laboratory" className="hover:text-cyan-300 transition-colors">
                  Laboratory Testing & SMT Standards
                </Link>
              </li>
              <li>
                <Link to="/laboratory" className="hover:text-cyan-300 transition-colors">
                  Defense & Aerospace Engineering
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Sectors & Models
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/industries" className="hover:text-cyan-300 transition-colors">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link to="/engagement" className="hover:text-cyan-300 transition-colors">
                  Turnkey Product NPI
                </Link>
              </li>
              <li>
                <Link to="/engagement" className="hover:text-cyan-300 transition-colors">
                  On-Demand R&D Burst
                </Link>
              </li>
              <li>
                <Link to="/engagement" className="hover:text-cyan-300 transition-colors">
                  Design Optimization
                </Link>
              </li>
              <li>
                <Link to="/deck" className="hover:text-cyan-300 transition-colors">
                  Full Capabilities Deck (11 Slides)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Documentation
            </div>
            <div className="space-y-2.5">
              <Link
                to="/deck"
                className="flex items-center gap-1.5 text-xs text-blue-300 hover:text-white font-medium transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Capabilities Deck</span>
              </Link>

              <button
                onClick={onOpenRfq}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Consultation RFQ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>IPC Class 2 & 3 Compliance</span>
            <span aria-hidden="true">·</span>
            <span>MIL-STD-810 / 461 Certified Designs</span>
            <span aria-hidden="true">·</span>
            <span>Noida, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
