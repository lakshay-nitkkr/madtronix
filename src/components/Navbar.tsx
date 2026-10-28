import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/capabilitiesData';
import { Cpu, FileText, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenRfq: () => void;
  onOpenPdf: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRfq, onOpenPdf }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070D18]/90 backdrop-blur-md border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element with clean glyph) */}
          <a 
            href="#" 
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 shadow-md shadow-blue-900/30">
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
          </a>

          {/* Zone 2: 5 Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a 
              href="#capabilities" 
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-blue-500/50"
            >
              Capabilities
            </a>
            <a 
              href="#disciplines" 
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-blue-500/50"
            >
              Disciplines
            </a>
            <a 
              href="#lifecycle" 
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-blue-500/50"
            >
              Lifecycle
            </a>
            <a 
              href="#laboratory" 
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-blue-500/50"
            >
              Testing & Standards
            </a>
            <a 
              href="#industries" 
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-blue-500/50"
            >
              Industries
            </a>
            <a 
              href="#engagement" 
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-blue-500/50"
            >
              Engagement
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + PDF Viewer Trigger */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-blue-300 hover:text-white bg-blue-950/50 hover:bg-blue-900/50 border border-blue-800/40 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
              title="View original Capabilities PDF"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Capabilities PDF</span>
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
        <div className="lg:hidden bg-[#0A1324] border-b border-blue-900/40 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <a 
              href="#capabilities" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-950/60 hover:text-blue-300"
            >
              Capabilities
            </a>
            <a 
              href="#disciplines" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-950/60 hover:text-blue-300"
            >
              Disciplines
            </a>
            <a 
              href="#lifecycle" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-950/60 hover:text-blue-300"
            >
              Development Lifecycle
            </a>
            <a 
              href="#laboratory" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-950/60 hover:text-blue-300"
            >
              Laboratory & Quality Standards
            </a>
            <a 
              href="#industries" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-950/60 hover:text-blue-300"
            >
              Industries Served
            </a>
            <a 
              href="#engagement" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-blue-950/60 hover:text-blue-300"
            >
              Engagement Models
            </a>
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
              <span>View Original Capabilities PDF</span>
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
