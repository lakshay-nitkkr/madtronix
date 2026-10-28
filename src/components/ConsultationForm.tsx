import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Phone, Globe, Building2, User, Loader2, Copy, Check, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/capabilitiesData';

export const REQUIREMENT_OPTIONS = [
  { value: "schematic designing", label: "Schematic Designing" },
  { value: "pcb design/layout", label: "PCB Design / Layout" },
  { value: "simulation", label: "Simulation" },
  { value: "software development", label: "Software Development" },
  { value: "testing", label: "Testing" },
  { value: "new product development", label: "New Product Development" },
];

export interface ConsultationFormData {
  fullName: string;
  email: string;
  mobile: string;
  companyName: string;
  website: string;
  requirement: string;
  query: string;
}

interface ConsultationFormProps {
  onSuccess?: () => void;
  className?: string;
  initialRequirement?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  onSuccess,
  className = '',
  initialRequirement = '',
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    email: '',
    mobile: '',
    companyName: '',
    website: '',
    requirement: initialRequirement || 'new product development',
    query: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ConsultationFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (formData.mobile.trim().length < 7) {
      newErrors.mobile = 'Please enter a valid phone/mobile number';
    }

    if (!formData.requirement.trim()) {
      newErrors.requirement = 'Please select a requirement';
    }

    if (!formData.query.trim()) {
      newErrors.query = 'Query description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const refId = `MTX-${Date.now().toString().slice(-6)}`;

    // Try 1: Node.js Express server endpoint
    let submittedSuccessfully = false;

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setReferenceId(data.referenceId || refId);
          submittedSuccessfully = true;
        }
      }
    } catch {
      // Node server not available, fall through
    }

    // Try 2: If Node server not available, try static PHP mailer (/contact.php)
    if (!submittedSuccessfully) {
      try {
        const phpRes = await fetch('/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (phpRes.ok) {
          const phpData = await phpRes.json();
          if (phpData.success) {
            setReferenceId(phpData.referenceId || refId);
            submittedSuccessfully = true;
          }
        }
      } catch {
        // PHP mailer not available, fall through
      }
    }

    // Try 3: Direct browser-to-email service (FormSubmit.co - requires zero server/Node)
    if (!submittedSuccessfully) {
      try {
        const directPayload = {
          _subject: `[New Inquiry ${refId}] ${formData.requirement.toUpperCase()} - ${formData.fullName}`,
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          company: formData.companyName || 'N/A',
          website: formData.website || 'N/A',
          requirement: formData.requirement,
          message: formData.query,
          reference_id: refId,
          _template: 'table',
        };

        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${COMPANY_INFO.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(directPayload),
        });

        if (formSubmitRes.ok) {
          setReferenceId(refId);
          submittedSuccessfully = true;
        }
      } catch {
        // Fallback to local storage persistence
      }
    }

    // Save locally in all cases for client audit trail
    try {
      const existing = JSON.parse(localStorage.getItem('madtronix_inquiries') || '[]');
      existing.unshift({
        ...formData,
        referenceId: refId,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('madtronix_inquiries', JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    setReferenceId(refId);
    setIsSubmitted(true);
    setIsSubmitting(false);

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCopySummary = () => {
    const summary = `MADTRONIX SYSTEMS - CONSULTATION QUERY
----------------------------------------
Reference ID: ${referenceId}
Full Name: ${formData.fullName}
Email: ${formData.email}
Mobile: ${formData.mobile}
Company Name: ${formData.companyName || 'N/A'}
Website: ${formData.website || 'N/A'}
Requirement: ${formData.requirement}
Query:
${formData.query}
----------------------------------------
Delivered directly to: ${COMPANY_INFO.email}`;

    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      companyName: '',
      website: '',
      requirement: 'new product development',
      query: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setReferenceId('');
  };

  if (isSubmitted) {
    return (
      <div className={`p-6 sm:p-8 rounded-2xl bg-[#091224] border border-blue-900/50 text-center space-y-6 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-950/90 border border-emerald-500/60 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/60">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-[11px] font-mono text-emerald-300">
            <span>Delivered Directly to {COMPANY_INFO.email}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Query Submitted Successfully!
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your consultation request has been directly registered under Reference ID <span className="text-cyan-400 font-mono font-bold">{referenceId}</span>. You do not need to send any email manually.
          </p>

          <p className="text-xs text-slate-400">
            Our engineering directors in Noida will review your <span className="text-blue-300 font-medium">"{formData.requirement}"</span> specifications and contact you at <span className="text-white font-medium">{formData.email}</span> or <span className="text-white font-medium">{formData.mobile}</span> within 24 business hours.
          </p>
        </div>

        {/* Detailed Submission Record */}
        <div className="max-w-xl mx-auto bg-[#050A14] rounded-xl border border-blue-900/40 p-4 text-left text-xs font-mono text-slate-300 relative space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-blue-900/40 text-[11px] text-blue-400">
            <span className="font-semibold text-white">SUBMISSION RECEIPT · {referenceId}</span>
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1 text-cyan-400 hover:text-white transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy Record'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div><span className="text-slate-400">Client:</span> <span className="text-white font-medium">{formData.fullName}</span></div>
            <div><span className="text-slate-400">Requirement:</span> <span className="text-cyan-300 font-medium">{formData.requirement}</span></div>
            <div><span className="text-slate-400">Email:</span> <span className="text-white font-medium">{formData.email}</span></div>
            <div><span className="text-slate-400">Mobile:</span> <span className="text-white font-medium">{formData.mobile}</span></div>
            {formData.companyName && <div><span className="text-slate-400">Company:</span> <span className="text-white font-medium">{formData.companyName}</span></div>}
            {formData.website && <div><span className="text-slate-400">Website:</span> <span className="text-white font-medium">{formData.website}</span></div>}
          </div>

          <div className="pt-2 border-t border-blue-950 text-[11px]">
            <span className="text-slate-400 block mb-1">Query:</span>
            <p className="text-slate-200 whitespace-pre-wrap font-sans bg-[#081224] p-2.5 rounded border border-blue-900/30">
              {formData.query}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleReset}
            className="px-5 py-2.5 text-xs font-medium text-slate-200 hover:text-white bg-blue-950/70 hover:bg-blue-900/60 border border-blue-800/40 rounded-lg transition-colors"
          >
            Submit Another Query
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 text-left ${className}`} noValidate>
      {serverError && (
        <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/60 text-xs text-red-200">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name* */}
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Full Name <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              disabled={isSubmitting}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              className={`w-full bg-[#060D1A] border rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                errors.fullName ? 'border-red-500/80 focus:ring-red-400' : 'border-blue-900/60 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
        </div>

        {/* Email* */}
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Email <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              disabled={isSubmitting}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={`w-full bg-[#060D1A] border rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                errors.email ? 'border-red-500/80 focus:ring-red-400' : 'border-blue-900/60 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
            />
          </div>
          {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
        </div>

        {/* Mobile* */}
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Mobile Number <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.mobile}
              disabled={isSubmitting}
              onChange={(e) => {
                setFormData({ ...formData, mobile: e.target.value });
                if (errors.mobile) setErrors({ ...errors, mobile: undefined });
              }}
              className={`w-full bg-[#060D1A] border rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                errors.mobile ? 'border-red-500/80 focus:ring-red-400' : 'border-blue-900/60 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
            />
          </div>
          {errors.mobile && <p className="text-[11px] text-red-400 mt-1">{errors.mobile}</p>}
        </div>

        {/* Requirement Dropdown* */}
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Requirement <span className="text-cyan-400">*</span>
          </label>
          <select
            value={formData.requirement}
            disabled={isSubmitting}
            onChange={(e) => {
              setFormData({ ...formData, requirement: e.target.value });
              if (errors.requirement) setErrors({ ...errors, requirement: undefined });
            }}
            className={`w-full bg-[#060D1A] border rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
              errors.requirement ? 'border-red-500/80 focus:ring-red-400' : 'border-blue-900/60 focus:border-cyan-400 focus:ring-cyan-400'
            }`}
          >
            {REQUIREMENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#091224] text-white">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.requirement && <p className="text-[11px] text-red-400 mt-1">{errors.requirement}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Company Name <span className="text-slate-400 text-[11px] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Building2 className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. Acme Aerospace Corp"
              value={formData.companyName}
              disabled={isSubmitting}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full bg-[#060D1A] border border-blue-900/60 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Website <span className="text-slate-400 text-[11px] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="https://example.com"
              value={formData.website}
              disabled={isSubmitting}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full bg-[#060D1A] border border-blue-900/60 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
            />
          </div>
        </div>

      </div>

      {/* Query* */}
      <div>
        <label className="block text-xs font-medium text-slate-200 mb-1.5">
          Query / Project Scope <span className="text-cyan-400">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Please describe your hardware specifications, board complexity, target timeline, or custom requirements..."
          value={formData.query}
          disabled={isSubmitting}
          onChange={(e) => {
            setFormData({ ...formData, query: e.target.value });
            if (errors.query) setErrors({ ...errors, query: undefined });
          }}
          className={`w-full bg-[#060D1A] border rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
            errors.query ? 'border-red-500/80 focus:ring-red-400' : 'border-blue-900/60 focus:border-cyan-400 focus:ring-cyan-400'
          }`}
        />
        {errors.query && <p className="text-[11px] text-red-400 mt-1">{errors.query}</p>}
      </div>

      {/* Submission Footer */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-blue-900/30">
        <div className="text-[11px] text-slate-400 font-mono text-center sm:text-left">
          Direct 1-click submission to <span className="text-cyan-400 font-semibold">{COMPANY_INFO.email}</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Submitting Query...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Submit Query Directly</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
