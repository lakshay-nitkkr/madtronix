import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/capabilitiesData';
import { Download, ChevronLeft, ChevronRight, FileText, Maximize2, ExternalLink } from 'lucide-react';

const SLIDE_PAGES = [
  { num: 1, title: "Capability Overview — Madtronix Systems Private Limited", src: "/extracted/img_1.jpg", tag: "Slide 1 / 11" },
  { num: 2, title: "Corporate Profile — Engineering Core Capabilities", src: "/extracted/img_2.jpg", tag: "Slide 2 / 11" },
  { num: 3, title: "Service Offerings — Specialized Engineering Disciplines", src: "/extracted/img_3.jpg", tag: "Slide 3 / 11" },
  { num: 4, title: "Workflow — End-to-End Development Lifecycle", src: "/extracted/img_4.jpg", tag: "Slide 4 / 11" },
  { num: 5, title: "Prototyping Standards — Hardware Quality and SMT Precision", src: "/extracted/img_5.jpg", tag: "Slide 5 / 11" },
  { num: 6, title: "Testing & Verification — In-House Laboratory Capabilities", src: "/extracted/img_6.jpg", tag: "Slide 6 / 11" },
  { num: 7, title: "Mission-Critical Electronics — Defense & Aerospace Engineering", src: "/extracted/img_7.jpg", tag: "Slide 7 / 11" },
  { num: 8, title: "Advanced Specializations — EMI/EMC, FPGA & RF Engineering", src: "/extracted/img_8.jpg", tag: "Slide 8 / 11" },
  { num: 9, title: "Sector Applications — Industries Served", src: "/extracted/img_9.jpg", tag: "Slide 9 / 11" },
  { num: 10, title: "Engagement Models — Flexible Commercial Collaboration", src: "/extracted/img_10.jpg", tag: "Slide 10 / 11" },
  { num: 11, title: "Reference & Image Sources", src: "/extracted/img_11.jpg", tag: "Slide 11 / 11" },
];

export const CapabilitiesDeckPage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [viewFormat, setViewFormat] = useState<'slides' | 'pdf'>('slides');

  const current = SLIDE_PAGES[activeSlide];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
              <Link to="/" className="hover:text-blue-300">Home</Link>
              <span>/</span>
              <span className="text-cyan-400">Capabilities PDF Deck</span>
            </div>

            <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-1">
              Official Capabilities Deck
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Madtronix Systems Presentation
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-mono">
              11-Slide Executive Overview & Architecture Specifications
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 p-1 bg-[#091222] rounded-lg border border-blue-900/50 text-xs font-medium">
              <button
                onClick={() => setViewFormat('slides')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  viewFormat === 'slides' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Slide View
              </button>
              <button
                onClick={() => setViewFormat('pdf')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  viewFormat === 'pdf' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Full PDF Viewer
              </button>
            </div>

            <a
              href={COMPANY_INFO.pdfPath}
              download="Madtronix_Systems_Capabilities.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-md"
              target="_blank"
              rel="noreferrer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Viewer Box */}
        <div className="bg-[#0A1324] rounded-2xl border border-blue-900/50 overflow-hidden shadow-2xl mb-12">
          {viewFormat === 'slides' ? (
            <div className="p-4 sm:p-6 flex flex-col space-y-6">
              
              {/* Top metadata row */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 pb-3 border-b border-blue-900/40">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800/40 text-cyan-400">
                    {current.tag}
                  </span>
                  <span className="font-semibold text-white">{current.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSlide(prev => (prev > 0 ? prev - 1 : SLIDE_PAGES.length - 1))}
                    className="p-1 rounded bg-blue-950 hover:bg-blue-900 text-white border border-blue-800/40"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-slate-400">{activeSlide + 1} / {SLIDE_PAGES.length}</span>
                  <button
                    onClick={() => setActiveSlide(prev => (prev < SLIDE_PAGES.length - 1 ? prev + 1 : 0))}
                    className="p-1 rounded bg-blue-950 hover:bg-blue-900 text-white border border-blue-800/40"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Slide Screen */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-[#050A14] flex items-center justify-center border border-blue-900/60 shadow-inner group">
                <img
                  src={current.src}
                  alt={current.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />

                <button
                  onClick={() => setActiveSlide(prev => (prev > 0 ? prev - 1 : SLIDE_PAGES.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-blue-800/40 backdrop-blur transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setActiveSlide(prev => (prev < SLIDE_PAGES.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-blue-800/40 backdrop-blur transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="pt-2 overflow-x-auto flex items-center gap-3 pb-2 scrollbar-thin">
                {SLIDE_PAGES.map((s, idx) => (
                  <button
                    key={s.num}
                    onClick={() => setActiveSlide(idx)}
                    className={`relative rounded-lg overflow-hidden border transition-all shrink-0 w-24 h-14 ${
                      activeSlide === idx
                        ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-105'
                        : 'border-blue-900/40 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={s.src} alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.2 text-[9px] font-mono text-white rounded">
                      {s.num}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          ) : (
            <div className="h-[750px] w-full">
              <iframe
                src={COMPANY_INFO.pdfPath}
                title="Madtronix Systems Capabilities Document"
                className="w-full h-full border-none"
              />
            </div>
          )}
        </div>

        {/* Page 11 Citations and Sources Box */}
        <div className="bg-[#0A1324] rounded-xl border border-blue-900/40 p-6 text-xs text-slate-300 space-y-3">
          <div className="font-mono text-blue-400 uppercase tracking-wider font-semibold">
            Slide 11 Documentation & References
          </div>
          <p className="text-slate-400 leading-relaxed">
            The capability overview was compiled by Madtronix Systems Private Limited (Noida, India). All technical specifications conform to IPC Class 2/3, MIL-STD-810, MIL-STD-461, and CISPR 32 standards.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
            <span>Corporate Website: {COMPANY_INFO.website}</span>
            <span>·</span>
            <span>Headquarters: {COMPANY_INFO.headquarters}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
