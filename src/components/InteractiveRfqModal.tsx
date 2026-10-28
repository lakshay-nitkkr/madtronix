import React from 'react';
import { X, Cpu } from 'lucide-react';
import { COMPANY_INFO } from '../data/capabilitiesData';
import { ConsultationForm } from './ConsultationForm';

interface InteractiveRfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRequirement?: string;
  initialModelId?: string;
}

export const InteractiveRfqModal: React.FC<InteractiveRfqModalProps> = ({
  isOpen,
  onClose,
  initialRequirement,
  initialModelId,
}) => {
  if (!isOpen) return null;

  let resolvedRequirement = initialRequirement;
  if (!resolvedRequirement && initialModelId) {
    if (initialModelId === 'turnkey-npi') resolvedRequirement = 'new product development';
    else if (initialModelId === 'ondemand-rd') resolvedRequirement = 'pcb design/layout';
    else if (initialModelId === 'design-optimization') resolvedRequirement = 'testing';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#091224] border border-blue-800/60 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-6 relative max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/50 bg-[#060D1A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Request Engineering Consultation</h3>
              <p className="text-xs text-blue-300/80 font-mono">Madtronix Systems Private Limited · Noida, India</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Clean Consultation Form */}
        <div className="overflow-y-auto p-6 sm:p-7 flex-1">
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Please share your contact details and engineering scope. Our hardware design leads will review your inquiry and connect with you directly.
          </p>

          <ConsultationForm 
            initialRequirement={resolvedRequirement}
            className="bg-transparent"
          />
        </div>

      </div>
    </div>
  );
};
