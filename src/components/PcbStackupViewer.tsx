import React, { useState } from 'react';
import { Layers, Activity, Gauge, Sliders, CheckCircle2 } from 'lucide-react';

interface LayerInfo {
  name: string;
  type: 'signal' | 'plane' | 'dielectric';
  thickness: string;
  material: string;
  description: string;
  role: string;
}

const STACKUP_LAYERS: LayerInfo[] = [
  { name: "L1: Top Layer", type: 'signal', thickness: "35µm (1 oz Cu)", material: "Copper + ENIG Finish", role: "High-speed RF / DDR differential pairs", description: "Controlled 50Ω single-ended & 100Ω diff microstrip routing" },
  { name: "Dielectric 1-2", type: 'dielectric', thickness: "100µm (0.1mm)", material: "Isola 370HR / FR4 (Dk 4.2)", role: "High-frequency low-loss prepreg", description: "Tight dielectric tolerance ±0.01mm for strict impedance control" },
  { name: "L2: Ground Plane", type: 'plane', thickness: "35µm (1 oz Cu)", material: "Solid Copper Reference", role: "Continuous RF Return Path", description: "Zero ground plane splits underneath high-speed differential traces" },
  { name: "Dielectric 2-3", type: 'dielectric', thickness: "200µm (0.2mm)", material: "Core Substrate (Tg 180°C)", role: "Structural isolation core", description: "High thermal stability across -40°C to +125°C defense requirements" },
  { name: "L3: Stripline Signal", type: 'signal', thickness: "35µm (1 oz Cu)", material: "Copper Stripline", role: "PCIe Gen 3/4 & Gigabit SerDes", description: "Dual-ground shielded stripline routing minimizing EMI radiation" },
  { name: "Dielectric 3-4", type: 'dielectric', thickness: "100µm (0.1mm)", material: "Prepreg 2116", role: "Symmetrical core coupling", description: "Low loss tangent (Df 0.015) for high-bandwidth telemetry" },
  { name: "L4: Power Plane", type: 'plane', thickness: "70µm (2 oz Cu)", material: "Multi-Island Copper Pour", role: "3.3V, 1.8V, 1.2V Core Rails", description: "Decoupling capacitor loop inductance <0.5nH with heavy copper" },
  { name: "L5: Ground Plane 2", type: 'plane', thickness: "35µm (1 oz Cu)", material: "Solid Ground Plane", role: "Secondary Return Reference", description: "Return current isolation for noisy digital switching" },
  { name: "L6: Bottom Layer", type: 'signal', thickness: "35µm (1 oz Cu)", material: "Copper + ENIG Finish", role: "Test points & Auxiliary I/O", description: "Diagnostic JTAG, UART test points and secondary SMD pads" },
];

export const PcbStackupViewer: React.FC = () => {
  const [traceWidth, setTraceWidth] = useState<number>(6.5); // mils
  const [dielectricHeight, setDielectricHeight] = useState<number>(4.0); // mils
  const [dk, setDk] = useState<number>(4.2); // FR4 Dk
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  // Microstrip impedance approximation: Z0 = (87 / sqrt(dk + 1.41)) * ln(5.98*H / (0.8*W + T))
  // T approx 1.4 mils (1 oz copper)
  const copperThickness = 1.4;
  const z0 = Math.round(
    (87 / Math.sqrt(dk + 1.41)) *
    Math.log((5.98 * dielectricHeight) / (0.8 * traceWidth + copperThickness))
  );

  // Differential impedance approximation: Zdiff = 2 * Z0 * (1 - 0.48 * exp(-0.96 * S / H))
  const diffSpacing = 7.0; // mils
  const zDiff = Math.round(2 * z0 * (1 - 0.48 * Math.exp((-0.96 * diffSpacing) / dielectricHeight)));

  const activeLayer = STACKUP_LAYERS[selectedLayerIndex];

  return (
    <div className="bg-[#0B1528] rounded-xl border border-blue-900/40 p-5 md:p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative subtle header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-blue-900/40">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800/40 text-blue-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Controlled Impedance Stackup Synthesizer</h4>
            <p className="text-xs text-blue-300/70">Interactive multilayer substrate & signal routing simulator</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-2.5 py-1 rounded bg-blue-900/20 border border-blue-800/30 text-blue-300">
            Target Single-Ended: <span className="font-bold text-white tabular-nums">50Ω ±5%</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-cyan-900/20 border border-cyan-800/30 text-cyan-300">
            Target Differential: <span className="font-bold text-white tabular-nums">100Ω ±5%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        
        {/* Left Column: Stackup Physical Visualization */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-1.5 mb-4">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 pb-1">
              <span>PHYSICAL LAYER CROSS-SECTION</span>
              <span>8-LAYER RIGID FR4/HIGH-TG</span>
            </div>

            <div className="space-y-1 bg-[#060B14] p-3 rounded-lg border border-blue-950">
              {STACKUP_LAYERS.map((layer, idx) => {
                const isSelected = selectedLayerIndex === idx;
                const isSignal = layer.type === 'signal';
                const isPlane = layer.type === 'plane';

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={`w-full text-left transition-all rounded px-3 py-1.5 flex items-center justify-between text-xs font-mono group ${
                      isSelected 
                        ? 'bg-blue-600/20 border border-blue-500/60 text-white shadow-sm' 
                        : 'hover:bg-slate-800/50 border border-transparent text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        isSignal 
                          ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
                          : isPlane 
                            ? 'bg-blue-500' 
                            : 'bg-slate-600'
                      }`} />
                      <span className="font-semibold text-slate-200">{layer.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[11px] text-slate-400 hidden sm:inline">{layer.material}</span>
                      <span className={`text-[11px] px-1.5 py-0.5 rounded ${
                        isSignal 
                          ? 'bg-cyan-950 text-cyan-300' 
                          : isPlane 
                            ? 'bg-blue-950 text-blue-300' 
                            : 'bg-slate-900 text-slate-400'
                      }`}>
                        {layer.thickness}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Layer Details Card */}
          <div className="p-3.5 bg-blue-950/30 rounded-lg border border-blue-900/30 text-xs space-y-1">
            <div className="flex items-center justify-between text-blue-300 font-semibold">
              <span>{activeLayer.name} — {activeLayer.role}</span>
              <span className="text-slate-400 font-mono">{activeLayer.thickness}</span>
            </div>
            <p className="text-slate-300 text-[12px] leading-relaxed">{activeLayer.description}</p>
          </div>

        </div>

        {/* Right Column: Live Impedance Tuning Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#081120] p-4 rounded-lg border border-blue-900/30">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/20 mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                <span>Microstrip Parameter Tuning</span>
              </div>
              <span className="text-[11px] text-blue-400 font-mono">Live IPC-2141</span>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Trace Width (W)</span>
                  <span className="font-mono text-cyan-400 font-semibold tabular-nums">{traceWidth.toFixed(1)} mils ({Math.round(traceWidth * 25.4)} µm)</span>
                </div>
                <input 
                  type="range" 
                  min="3.0" 
                  max="12.0" 
                  step="0.1" 
                  value={traceWidth} 
                  onChange={(e) => setTraceWidth(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Dielectric Height (H)</span>
                  <span className="font-mono text-cyan-400 font-semibold tabular-nums">{dielectricHeight.toFixed(1)} mils ({Math.round(dielectricHeight * 25.4)} µm)</span>
                </div>
                <input 
                  type="range" 
                  min="2.5" 
                  max="8.0" 
                  step="0.1" 
                  value={dielectricHeight} 
                  onChange={(e) => setDielectricHeight(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Dielectric Constant (εr / Dk)</span>
                  <span className="font-mono text-cyan-400 font-semibold tabular-nums">{dk.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "FR4 (4.2)", val: 4.2 },
                    { label: "Isola (3.7)", val: 3.7 },
                    { label: "Rogers (3.48)", val: 3.48 }
                  ].map((sub) => (
                    <button
                      key={sub.label}
                      onClick={() => setDk(sub.val)}
                      className={`py-1 text-[11px] font-mono rounded border transition-colors ${
                        dk === sub.val 
                          ? 'bg-blue-600/30 border-blue-400 text-white font-bold' 
                          : 'bg-slate-900 border-slate-700/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calculated Output Display */}
          <div className="mt-5 pt-4 border-t border-blue-900/30 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#060D1A] rounded-lg border border-blue-800/40 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Single-Ended (Z₀)</span>
                <span className="text-2xl font-mono font-bold text-cyan-400 tabular-nums my-0.5">
                  {z0} <span className="text-sm font-normal text-slate-400">Ω</span>
                </span>
                <span className={`text-[10px] flex items-center gap-1 font-mono ${Math.abs(z0 - 50) <= 3 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {Math.abs(z0 - 50) <= 3 ? <CheckCircle2 className="w-3 h-3" /> : null}
                  {Math.abs(z0 - 50) <= 3 ? 'Within 50Ω ±5%' : `Δ ${Math.abs(z0 - 50)}Ω from 50Ω`}
                </span>
              </div>

              <div className="p-3 bg-[#060D1A] rounded-lg border border-cyan-800/40 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Differential (Z_diff)</span>
                <span className="text-2xl font-mono font-bold text-blue-400 tabular-nums my-0.5">
                  {zDiff} <span className="text-sm font-normal text-slate-400">Ω</span>
                </span>
                <span className={`text-[10px] flex items-center gap-1 font-mono ${Math.abs(zDiff - 100) <= 6 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {Math.abs(zDiff - 100) <= 6 ? <CheckCircle2 className="w-3 h-3" /> : null}
                  {Math.abs(zDiff - 100) <= 6 ? 'Within 100Ω ±5%' : `Δ ${Math.abs(zDiff - 100)}Ω from 100Ω`}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Madtronix conducts 100% TDR coupon coupons on manufactured panels to certify controlled impedance before SMT assembly.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
