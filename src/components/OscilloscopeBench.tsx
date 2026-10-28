import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, Zap, Thermometer, Radio, Cpu, RefreshCw } from 'lucide-react';

type ChannelType = 'spi' | 'power' | 'rf' | 'thermal';

interface ChannelConfig {
  id: ChannelType;
  title: string;
  tagline: string;
  unit: string;
  color: string;
  yMin: number;
  yMax: number;
  notes: string;
}

const CHANNELS: Record<ChannelType, ChannelConfig> = {
  spi: {
    id: 'spi',
    title: 'High-Bandwidth Signal Integrity (SPI/I2C Clock)',
    tagline: 'Mixed-domain oscilloscope 4GHz sampling with 85ps rise-time capture',
    unit: 'Volts (V)',
    color: '#38BDF8', // Cyan-400
    yMin: -0.2,
    yMax: 3.6,
    notes: 'Jitter < 1.2ps RMS · Rise time 140ps · Zero ringing / reflection',
  },
  power: {
    id: 'power',
    title: 'Dynamic Power Profiling (Telemetry Current)',
    tagline: 'Microamp-level telemetry power audits from sleep to TX burst',
    unit: 'Current (mA / µA)',
    color: '#60A5FA', // Blue-400
    yMin: 0,
    yMax: 120,
    notes: 'Deep Sleep 1.8µA · MCU Active 14mA · RF TX Burst 95mA peak',
  },
  rf: {
    id: 'rf',
    title: 'Sub-6 GHz RF Transmission & Eye Diagram',
    tagline: 'S-parameter reflection & coplanar waveguide transmission stability',
    unit: 'Normalized Amplitude',
    color: '#818CF8', // Indigo-400
    yMin: -1.2,
    yMax: 1.2,
    notes: 'Wide open eye mask · EVM < -34dB · Insertion Loss < 0.45dB/in',
  },
  thermal: {
    id: 'thermal',
    title: 'Conduction Thermal Load Audit (-40°C to +125°C)',
    tagline: 'Infrared calibrated radiometric continuous load temperature logging',
    unit: 'Temperature (°C)',
    color: '#38BDF8', // Amber/Cyan
    yMin: 20,
    yMax: 105,
    notes: 'Max junction temp 68.4°C @ full load · Thermal via conduction ΔT 14°C',
  },
};

export const OscilloscopeBench: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<ChannelType>('spi');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [timeScale, setTimeScale] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  const channel = CHANNELS[activeChannel];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      if (isRunning) {
        phaseRef.current += 0.05 * timeScale;
      }
      const phase = phaseRef.current;

      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark CRT phosphor background
      ctx.fillStyle = '#060C18';
      ctx.fillRect(0, 0, width, height);

      // Draw Oscilloscope Grid Lines (10x8 divisions)
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(30, 64, 175, 0.25)';

      const numCols = 10;
      const numRows = 8;
      const colStep = width / numCols;
      const rowStep = height / numRows;

      // Vertical grid lines
      for (let i = 0; i <= numCols; i++) {
        const x = i * colStep;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let j = 0; j <= numRows; j++) {
        const y = j * rowStep;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center crosshair ticks
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Render Active Waveform
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = channel.color;
      ctx.shadowColor = channel.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const t = (x / width) * 10 + phase;
        let yNorm = 0.5; // 0 (top) to 1 (bottom)

        if (activeChannel === 'spi') {
          // Digital square wave with slight RC curve and harmonic ripple
          const sq = Math.sin(t * 3);
          const val = Math.tanh(sq * 8) * 0.45;
          const noise = Math.sin(t * 30) * 0.02;
          yNorm = 0.5 - val + noise;
        } else if (activeChannel === 'power') {
          // Microamp sleep baseline with periodic burst transmit spikes
          const burstCycle = (t % 6);
          let pVal = 0.05; // sleep level
          if (burstCycle > 2 && burstCycle < 2.8) {
            pVal = 0.85 + Math.sin(t * 20) * 0.08; // transmit burst
          } else if (burstCycle > 2.8 && burstCycle < 3.5) {
            pVal = 0.25; // MCU processing
          }
          yNorm = 0.9 - pVal * 0.8;
        } else if (activeChannel === 'rf') {
          // High-frequency carrier modulated
          const carrier = Math.sin(t * 12) * Math.cos(t * 1.5) * 0.4;
          const secondHarmonic = Math.sin(t * 24 + phase) * 0.08;
          yNorm = 0.5 - (carrier + secondHarmonic);
        } else if (activeChannel === 'thermal') {
          // Smooth thermal step rise and steady-state equilibrium
          const ramp = 0.55 + Math.sin(t * 0.4) * 0.22 + Math.cos(t * 0.1) * 0.08;
          yNorm = 0.85 - ramp * 0.7;
        }

        const yPx = yNorm * height;
        if (x === 0) {
          ctx.moveTo(x, yPx);
        } else {
          ctx.lineTo(x, yPx);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeChannel, isRunning, timeScale, channel.color]);

  return (
    <div className="bg-[#0A1324] rounded-xl border border-blue-900/50 p-5 md:p-6 shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-blue-900/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800/40 flex items-center justify-center text-blue-400">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Mixed-Domain Laboratory Oscilloscope</h4>
            <p className="text-xs text-blue-300/70 font-mono">CALIBRATED IN-HOUSE TELEMETRY SUITE</p>
          </div>
        </div>

        {/* Channel Selection Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#060D1A] rounded-lg border border-blue-950">
          <button
            onClick={() => setActiveChannel('spi')}
            className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
              activeChannel === 'spi'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CH1: Signal Integrity
          </button>
          <button
            onClick={() => setActiveChannel('power')}
            className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
              activeChannel === 'power'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CH2: Power Profiling
          </button>
          <button
            onClick={() => setActiveChannel('rf')}
            className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
              activeChannel === 'rf'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CH3: RF Sub-6GHz
          </button>
          <button
            onClick={() => setActiveChannel('thermal')}
            className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
              activeChannel === 'thermal'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CH4: Thermal Audit
          </button>
        </div>
      </div>

      {/* Main Bench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-4">
        
        {/* Canvas Screen */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="relative rounded-lg overflow-hidden border border-blue-900/60 shadow-inner bg-[#060C18]">
            <canvas
              ref={canvasRef}
              width={720}
              height={360}
              className="w-full h-auto block"
            />

            {/* Live readout overlay badge */}
            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur border border-blue-800/40 text-[11px] font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: channel.color }} />
              <span className="text-white font-semibold">{channel.title.split('(')[0].trim()}</span>
              <span className="text-slate-400">|</span>
              <span className="text-cyan-300 font-bold tabular-nums">LIVE ACQUISITION</span>
            </div>

            {/* Transport controls bottom right */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-2.5 py-1 text-[11px] font-mono bg-blue-950/80 hover:bg-blue-900 border border-blue-700/50 text-blue-200 rounded flex items-center gap-1.5 backdrop-blur transition-colors"
              >
                {isRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isRunning ? 'FREEZE' : 'RUN'}</span>
              </button>

              <button
                onClick={() => setTimeScale(timeScale === 1 ? 2 : 1)}
                className="px-2.5 py-1 text-[11px] font-mono bg-blue-950/80 hover:bg-blue-900 border border-blue-700/50 text-blue-200 rounded flex items-center gap-1.5 backdrop-blur transition-colors"
              >
                <RefreshCw className="w-3 h-3 text-blue-400" />
                <span>{timeScale}X TIMEBASE</span>
              </button>
            </div>
          </div>

          {/* Under-screen telemetry diagnostics */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-blue-950/20 rounded-lg border border-blue-900/30 font-mono text-xs text-slate-300">
            <span className="text-blue-300 font-semibold">{channel.notes}</span>
            <span className="text-slate-400 text-[11px]">Bandwidth: 4.0 GHz · 20 GSa/s Real-Time</span>
          </div>
        </div>

        {/* Right Bench Instrument Details */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-[#081222] p-4 rounded-lg border border-blue-900/40">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-1">Laboratory Protocol</div>
            <h5 className="text-base font-semibold text-white mb-2">{channel.title}</h5>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{channel.tagline}</p>

            <div className="space-y-3 border-t border-blue-900/30 pt-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Signal Domain:</span>
                <span className="font-mono text-cyan-300 font-medium">Mixed-Signal High Speed</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Measurement Resolution:</span>
                <span className="font-mono text-white font-medium">12-bit ADC / 500µV Div</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Compliance Standard:</span>
                <span className="font-mono text-blue-300 font-medium">MIL-STD-461 & CISPR 32</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Automated Audit:</span>
                <span className="font-mono text-emerald-400 font-medium">Pass / Margin Verification</span>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded bg-blue-950/40 border border-blue-800/30 text-xs">
            <div className="text-[11px] font-mono text-blue-300 uppercase tracking-wider mb-1">Laboratory Guarantee</div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Every prototype batch undergoes 100% board bring-up validation and rail impedance profiling prior to client shipment.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
