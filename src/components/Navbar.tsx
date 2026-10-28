import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/capabilitiesData';
import { Cpu, FileText, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenRfq: () => void;
  onOpenPdf: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRfq, onOpenPdf }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors whitespace-nowrap shrink-0 hover:text-blue-400 py-1 ${
      isActive
        ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
        : 'text-slate-300'
    }`;

  const mobileNavItemClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-900/60 text-cyan-300 font-semibold'
        : 'text-slate-300 hover:bg-blue-950/60 hover:text-blue-300'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070D18]/95 backdrop-blur-md border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <Link 
            to="/" 
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 shadow-md shadow-blue-900/40">
              <div className="w-full h-full bg-[#091224] rounded-[6px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                MADTRONIX SYSTEMS
              </span>
              <span className="text-[10px] font-mono tracking-widest text-blue-400/80 uppercase">
                Hardware Engineering
              </span>
            </div>
          </Link>

          {/* Zone 2: 5–6 Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <NavLink to="/capabilities" className={navItemClass}>
              Capabilities
            </NavLink>
            <NavLink to="/lifecycle" className={navItemClass}>
              Lifecycle
            </NavLink>
            <NavLink to="/laboratory" className={navItemClass}>
              Laboratory & Testing
            </NavLink>
            <NavLink to="/industries" className={navItemClass}>
              Industries
            </NavLink>
            <NavLink to="/engagement" className={navItemClass}>
              Engagement
            </NavLink>
            <NavLink to="/deck" className={navItemClass}>
              PDF Deck
            </NavLink>
          </nav>

          {/* Zone 3: 1 Primary Action + Quick PDF Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPdf}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-300 hover:text-white bg-blue-950/50 hover:bg-blue-900/50 border border-blue-800/40 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Quick preview original PDF"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Preview PDF</span>
            </button>

            <button
              onClick={onOpenRfq}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-600/20 whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>Request Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenRfq}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1324] border-b border-blue-900/50 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1.5 text-sm font-medium">
            <NavLink 
              to="/" 
              end
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              Home Overview
            </NavLink>
            <NavLink 
              to="/capabilities" 
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              Engineering Capabilities
            </NavLink>
            <NavLink 
              to="/lifecycle" 
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              Development Lifecycle
            </NavLink>
            <NavLink 
              to="/laboratory" 
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              Laboratory & Testing
            </NavLink>
            <NavLink 
              to="/industries" 
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              Industries Served
            </NavLink>
            <NavLink 
              to="/engagement" 
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              Commercial Engagement
            </NavLink>
            <NavLink 
              to="/deck" 
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavItemClass}
            >
              Capabilities PDF Deck
            </NavLink>
          </div>

          <div className="pt-3 border-t border-blue-900/30 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPdf();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-blue-300 bg-blue-950/60 border border-blue-800/40 rounded-lg"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Quick Preview PDF</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md"
            >
              <span>Request Engineering Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
