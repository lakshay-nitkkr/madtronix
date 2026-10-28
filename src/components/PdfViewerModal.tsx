import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/capabilitiesData';
import { X, Download, ChevronLeft, ChevronRight, FileText, ExternalLink, Maximize2 } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SLIDE_PAGES = [
  { num: 1, title: "Capability Overview — Madtronix Systems", src: "/extracted/img_1.jpg" },
  { num: 2, title: "Corporate Profile — Engineering Core Capabilities", src: "/extracted/img_2.jpg" },
  { num: 3, title: "Service Offerings — Specialized Engineering Disciplines", src: "/extracted/img_3.jpg" },
  { num: 4, title: "Workflow — End-to-End Development Lifecycle", src: "/extracted/img_4.jpg" },
  { num: 5, title: "Prototyping Standards — Hardware Quality & SMT Precision", src: "/extracted/img_5.jpg" },
  { num: 6, title: "Testing & Verification — In-House Laboratory Capabilities", src: "/extracted/img_6.jpg" },
  { num: 7, title: "Mission-Critical Electronics — Defense & Aerospace Engineering", src: "/extracted/img_7.jpg" },
  { num: 8, title: "Advanced Specializations — EMI/EMC, FPGA & RF Engineering", src: "/extracted/img_8.jpg" },
  { num: 9, title: "Sector Applications — Industries Served", src: "/extracted/img_9.jpg" },
  { num: 10, title: "Engagement Models — Flexible Commercial Collaboration", src: "/extracted/img_10.jpg" },
  { num: 11, title: "Image Sources & References", src: "/extracted/img_11.jpg" },
];

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slides' | 'pdf'>('slides');

  if (!isOpen) return null;

  const current = SLIDE_PAGES[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <div className="bg-[#091224] border border-blue-800/60 rounded-2xl max-w-5xl w-full h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-blue-900/50 bg-[#060D1A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Madtronix Systems — Capabilities Overview</h3>
              <p className="text-[11px] text-blue-300 font-mono">
                {viewMode === 'slides' ? `Slide ${current.num} of ${SLIDE_PAGES.length} · ${current.title}` : 'Native PDF Reader View'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-0.5 bg-[#0A162B] rounded-lg border border-blue-900/50 text-xs">
              <button
                onClick={() => setViewMode('slides')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewMode === 'slides' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                Slide View
              </button>
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewMode === 'pdf' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                Direct PDF
              </button>
            </div>

            {/* Download PDF button */}
            <a
              href={COMPANY_INFO.pdfPath}
              download="Madtronix_Systems_Capabilities.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
              target="_blank"
              rel="noreferrer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 bg-[#040812] relative overflow-hidden flex flex-col justify-center items-center">
          {viewMode === 'slides' ? (
            <div className="w-full h-full flex flex-col justify-between p-4">
              
              {/* Slide Preview container */}
              <div className="flex-1 flex items-center justify-center overflow-hidden relative">
                <img
                  src={current.src}
                  alt={current.title}
                  className="max-h-full max-w-full object-contain rounded-lg border border-blue-900/40 shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Left/Right overlay arrows */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : SLIDE_PAGES.length - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-blue-800/40 backdrop-blur transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev < SLIDE_PAGES.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-blue-800/40 backdrop-blur transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Carousel Thumbnail Strip */}
              <div className="pt-3 overflow-x-auto flex items-center justify-center gap-2 pb-1 scrollbar-thin">
                {SLIDE_PAGES.map((s, idx) => (
                  <button
                    key={s.num}
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative rounded-md overflow-hidden border transition-all shrink-0 w-16 h-10 ${
                      currentSlide === idx
                        ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-105'
                        : 'border-blue-900/40 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={s.src} alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0.5 right-0.5 bg-black/80 px-1 text-[9px] font-mono text-white rounded">
                      {s.num}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* Native iframe PDF embed */
            <iframe
              src={COMPANY_INFO.pdfPath}
              title="Madtronix Systems Capabilities PDF"
              className="w-full h-full border-none"
            />
          )}
        </div>

      </div>
    </div>
  );
};
