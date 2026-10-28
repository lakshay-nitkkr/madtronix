import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ENGAGEMENT_MODELS, COMPANY_INFO } from '../data/capabilitiesData';
import { ConsultationForm } from '../components/ConsultationForm';
import { Layers, Zap, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

interface EngagementPageProps {
  onOpenPdf: () => void;
}

export const EngagementPage: React.FC<EngagementPageProps> = ({ onOpenPdf }) => {
  const [selectedRequirement, setSelectedRequirement] = useState<string>('new product development');

  const handleSelectModel = (modelId: string) => {
    if (modelId === 'turnkey-npi') {
      setSelectedRequirement('new product development');
    } else if (modelId === 'ondemand-rd') {
      setSelectedRequirement('pcb design/layout');
    } else if (modelId === 'design-optimization') {
      setSelectedRequirement('testing');
    }
    const formElement = document.getElementById('consultation-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
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
            <span className="text-cyan-400">Commercial Engagement</span>
          </div>

          <div className="text-xs font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
            Engagement Models & Consultation
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Flexible Commercial Collaboration
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether launching a ground-up turnkey NPI product, augmenting your internal layout team during a high-density sprint, or redesigning an active board to beat component obsolescence.
          </p>
        </div>

        {/* 3 Collaboration Cards (Slide 10) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ENGAGEMENT_MODELS.map((model, idx) => (
            <div
              key={model.id}
              className="rounded-2xl border border-blue-900/40 bg-[#0A1428] p-6 md:p-8 flex flex-col justify-between hover:border-blue-600/50 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center">
                    {idx === 0 && <Layers className="w-5 h-5 text-cyan-400" />}
                    {idx === 1 && <Zap className="w-5 h-5 text-blue-400" />}
                    {idx === 2 && <RefreshCw className="w-5 h-5 text-sky-400" />}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 px-2.5 py-1 rounded border border-cyan-800/50 font-semibold">
                    {model.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">{model.title}</h2>
                <p className="text-xs font-semibold text-blue-300 mb-3">{model.description}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{model.suitableFor}</p>

                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Scope Deliverables
                  </div>
                  {model.scope.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-blue-900/30 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Turnaround:</span>
                  <span className="text-white font-medium">{model.turnaround}</span>
                </div>

                <button
                  onClick={() => handleSelectModel(model.id)}
                  className="w-full py-2.5 px-4 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-600/25"
                >
                  <span>Select {model.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Embedded Consultation Form Section */}
        <div id="consultation-form-section" className="bg-[#0B1528] rounded-2xl border border-blue-900/50 p-6 md:p-10 shadow-2xl">
          <div className="pb-6 border-b border-blue-900/40 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Direct Engineering Inquiry
              </div>
              <h2 className="text-2xl font-bold text-white">
                Request Engineering Consultation
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Submissions are received directly at <span className="text-cyan-400 font-mono font-medium">{COMPANY_INFO.email}</span>
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-800/40 text-xs font-mono text-slate-300">
              Headquarters: Noida, India
            </div>
          </div>

          <ConsultationForm 
            initialRequirement={selectedRequirement}
            className="max-w-3xl mx-auto"
          />
        </div>

      </div>
    </div>
  );
};
