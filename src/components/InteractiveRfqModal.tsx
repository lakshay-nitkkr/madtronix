import React, { useState } from 'react';
import { ENGAGEMENT_MODELS, COMPANY_INFO } from '../data/capabilitiesData';
import { X, CheckCircle2, Cpu, Sliders, Calendar, ArrowRight, ShieldCheck, Download, Copy, Check } from 'lucide-react';

interface InteractiveRfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialModelId?: string;
}

export const InteractiveRfqModal: React.FC<InteractiveRfqModalProps> = ({
  isOpen,
  onClose,
  initialModelId,
}) => {
  const [modelId, setModelId] = useState<string>(initialModelId || 'turnkey-npi');
  const [layerCount, setLayerCount] = useState<number>(6);
  const [hasHighSpeed, setHasHighSpeed] = useState<boolean>(true);
  const [hasRf, setHasRf] = useState<boolean>(false);
  const [hasFpga, setHasFpga] = useState<boolean>(false);
  const [targetStandard, setTargetStandard] = useState<'ipc2' | 'ipc3' | 'mil'>('ipc2');
  const [firmwareType, setFirmwareType] = useState<'bare-metal' | 'rtos' | 'zephyr'>('rtos');
  const [volume, setVolume] = useState<'proto' | 'pilot' | 'mass'>('proto');

  // Contact form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Calculate estimated turnaround based on complexity
  let weeksMin = 6;
  let weeksMax = 10;
  if (modelId === 'ondemand-rd') {
    weeksMin = 2;
    weeksMax = 4;
  } else if (modelId === 'design-optimization') {
    weeksMin = 4;
    weeksMax = 6;
  } else {
    // Turnkey NPI
    if (layerCount >= 8) { weeksMin += 2; weeksMax += 3; }
    if (hasFpga) { weeksMin += 2; weeksMax += 3; }
    if (hasRf) { weeksMin += 1; weeksMax += 2; }
    if (targetStandard === 'mil') { weeksMin += 2; weeksMax += 3; }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid corporate email is required';
    if (!company.trim()) errs.company = 'Company name is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  const selectedModel = ENGAGEMENT_MODELS.find(m => m.id === modelId) || ENGAGEMENT_MODELS[0];

  const specSummary = `MADTRONIX SYSTEMS — PROJECT SPECIFICATION SUMMARY
--------------------------------------------------
Engagement Model: ${selectedModel.title}
PCB Stackup: ${layerCount} Layers (Controlled Impedance ±5%)
RF Routing (Sub-6 GHz): ${hasRf ? 'Enabled (Rogers / Matched Waveguides)' : 'Standard'}
FPGA DSP Acceleration: ${hasFpga ? 'AMD Xilinx / Intel SoC' : 'Not required'}
Target Reliability: ${targetStandard === 'mil' ? 'MIL-STD-810H & MIL-STD-461G' : targetStandard === 'ipc3' ? 'IPC Class 3 Aerospace / Mission-Critical' : 'IPC Class 2 Commercial'}
Firmware Environment: ${firmwareType === 'rtos' ? 'FreeRTOS Deterministic Multi-Tasking' : firmwareType === 'zephyr' ? 'Zephyr OS with BLE/Cellular Stacks' : 'Bare-Metal Low-Latency HAL'}
Target Run: ${volume === 'proto' ? 'Rapid Bring-Up (1-5 units)' : volume === 'pilot' ? 'Pilot Batch (10-50 units)' : 'Volume Mass Production Prep'}
Estimated Turnaround: ${weeksMin}-${weeksMax} Weeks
Client: ${fullName} (${email}), ${company}
Project Notes: ${projectBrief || 'None provided'}
--------------------------------------------------
Generated via madtronixsystems.com`;

  const copySpec = () => {
    navigator.clipboard.writeText(specSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#091224] border border-blue-800/60 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-8 relative max-h-[90vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/50 bg-[#060D1A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center text-blue-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Project Scope & Engineering Consultation</h3>
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

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {isSubmitted ? (
            /* Success confirmation state */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h4 className="text-2xl font-bold text-white">Engineering Request Received</h4>
                <p className="text-sm text-slate-300">
                  Thank you, <span className="font-semibold text-white">{fullName}</span>. An engineering director from Madtronix Systems will review your specification profile and reply to <span className="font-semibold text-cyan-400">{email}</span> within 24 business hours.
                </p>
              </div>

              {/* Spec Brief Box */}
              <div className="max-w-xl mx-auto bg-[#060D1A] rounded-xl border border-blue-900/40 p-4 text-left font-mono text-xs text-slate-300 relative">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-900/40 text-[11px] text-blue-400">
                  <span>SYSTEM SPECIFICATION PROFILE</span>
                  <button
                    onClick={copySpec}
                    className="flex items-center gap-1 text-cyan-400 hover:text-white"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Spec'}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed text-[11px] text-slate-300">{specSummary}</pre>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Spec Builder Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Engagement Model Choice */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
                  1. Select Commercial Collaboration Model
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ENGAGEMENT_MODELS.map((model) => (
                    <button
                      type="button"
                      key={model.id}
                      onClick={() => setModelId(model.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all text-xs ${
                        modelId === model.id
                          ? 'bg-blue-950/80 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400'
                          : 'bg-[#060D1A] border-blue-900/40 text-slate-300 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="font-bold text-white mb-1">{model.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2">{model.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Hardware Architecture Parameters */}
              <div className="p-4 rounded-xl bg-[#060D1A] border border-blue-900/40 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>2. Hardware & PCB Layer Parameters</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Layer Count */}
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-medium">
                      PCB Layer Count: <span className="font-bold text-cyan-400 font-mono">{layerCount} Layers</span>
                    </label>
                    <select
                      value={layerCount}
                      onChange={(e) => setLayerCount(parseInt(e.target.value))}
                      className="w-full bg-[#0A1324] border border-blue-900/60 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value={2}>2 Layers (Simple I/O & Sensors)</option>
                      <option value={4}>4 Layers (Standard Microcontroller / BLE)</option>
                      <option value={6}>6 Layers (High-Density / DDR3 / RF)</option>
                      <option value={8}>8 Layers (DDR4 / High-Speed SerDes / FPGA)</option>
                      <option value={12}>12 Layers (Complex Multiprocessor / Avionics)</option>
                      <option value={16}>16+ Layers (Ultra-High-Density Defense / Radar)</option>
                    </select>
                  </div>

                  {/* Standards */}
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-medium">Reliability Standard</label>
                    <select
                      value={targetStandard}
                      onChange={(e) => setTargetStandard(e.target.value as any)}
                      className="w-full bg-[#0A1324] border border-blue-900/60 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="ipc2">IPC Class 2 (Standard Commercial / IoT)</option>
                      <option value="ipc3">IPC Class 3 (High-Reliability Aerospace)</option>
                      <option value="mil">MIL-STD-810 & MIL-STD-461 Defense</option>
                    </select>
                  </div>

                  {/* Firmware */}
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-medium">Firmware Architecture</label>
                    <select
                      value={firmwareType}
                      onChange={(e) => setFirmwareType(e.target.value as any)}
                      className="w-full bg-[#0A1324] border border-blue-900/60 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="bare-metal">Bare-Metal HAL (Low Latency / DSP)</option>
                      <option value="rtos">FreeRTOS (Deterministic Telemetry)</option>
                      <option value="zephyr">Zephyr OS (Connected Cellular / BLE)</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes for specialized modules */}
                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-blue-900/30 text-xs">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasHighSpeed}
                      onChange={(e) => setHasHighSpeed(e.target.checked)}
                      className="accent-cyan-400 rounded"
                    />
                    <span>Controlled Impedance 50Ω/100Ω</span>
                  </label>

                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRf}
                      onChange={(e) => setHasRf(e.target.checked)}
                      className="accent-cyan-400 rounded"
                    />
                    <span>Sub-6 GHz RF / Rogers Substrate</span>
                  </label>

                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasFpga}
                      onChange={(e) => setHasFpga(e.target.checked)}
                      className="accent-cyan-400 rounded"
                    />
                    <span>AMD Xilinx / Intel FPGA DSP Pipeline</span>
                  </label>
                </div>
              </div>

              {/* Dynamic Milestone Projection Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-[#0A162B] border border-blue-800/40 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block mb-0.5">ESTIMATED PROTOTYPE TIMELINE:</span>
                  <span className="text-lg font-bold text-cyan-400">{weeksMin} to {weeksMax} Weeks</span>
                  <span className="text-slate-400 ml-2">(Architecture Freeze to Board Bring-Up)</span>
                </div>
                <div className="px-3 py-1.5 rounded bg-blue-900/30 border border-blue-700/40 text-blue-200">
                  Includes 100% In-House Laboratory Verification
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-blue-400">
                  3. Contact & Organization Details
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#060D1A] border border-blue-900/60 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Corporate Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#060D1A] border border-blue-900/60 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Company / Organization *"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#060D1A] border border-blue-900/60 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    {errors.company && <p className="text-[11px] text-red-400 mt-1">{errors.company}</p>}
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Brief description of project requirements, form-factor, or target application..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    className="w-full bg-[#060D1A] border border-blue-900/60 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Direct inquiry to {COMPANY_INFO.email}
                </span>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <span>Submit Engineering Specification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
