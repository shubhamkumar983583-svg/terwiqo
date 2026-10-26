import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, XCircle, AlertTriangle, Sparkles, TrendingUp } from 'lucide-react';
import { getBeforeAfterMetrics } from '../../utils/concepts12.ts';

interface ConceptBeforeAfterProps {
  className?: string;
}

export const ConceptBeforeAfter: React.FC<ConceptBeforeAfterProps> = ({ className = '' }) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const metrics = getBeforeAfterMetrics();

  return (
    <div
      id="before-after"
      className={`p-6 sm:p-8 rounded-3xl bg-[#090D1A]/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6 text-left relative overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FFA069] text-[10px] font-mono font-bold mb-1.5">
            <ArrowLeftRight className="w-3 h-3 text-[#FFA069]" />
            <span>Concept 09 · Before / After (Interactive Comparison Slider)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Before WorkPulse AI vs. After WorkPulse AI
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Drag the comparison slider or use presets to see the measurable operational shift across facilities.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          {[
            { label: 'Legacy Chaos', val: 0 },
            { label: 'Split 50/50', val: 50 },
            { label: 'WorkPulse AI', val: 100 }
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setSliderPos(preset.val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                sliderPos === preset.val
                  ? 'bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Slider Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-rose-400 font-bold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Legacy Fingerprint &amp; Card Terminals</span>
          </span>
          <span className="text-neutral-400">Position: {sliderPos}%</span>
          <span className="text-[#C7F238] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>WorkPulse AI CCTV Turnstiles</span>
          </span>
        </div>

        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-ew-resize accent-[#FFA069]"
          />
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE CARD */}
        <div
          className={`p-5 rounded-2xl border transition-all duration-300 space-y-4 ${
            sliderPos <= 50
              ? 'bg-rose-950/20 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
              : 'bg-white/[0.02] border-white/5 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Before (Legacy Methods)</h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              High Friction
            </span>
          </div>

          <div className="space-y-3">
            {metrics.map((m) => (
              <div key={m.metric} className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-neutral-400 font-mono">{m.metric}</div>
                <div className="text-sm font-bold text-rose-300 font-mono">{m.before.value}</div>
                <div className="text-[11px] text-neutral-400">{m.before.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AFTER CARD */}
        <div
          className={`p-5 rounded-2xl border transition-all duration-300 space-y-4 ${
            sliderPos >= 50
              ? 'bg-emerald-950/20 border-[#C7F238]/40 shadow-[0_0_20px_rgba(199,242,56,0.15)] ring-1 ring-[#C7F238]/30'
              : 'bg-white/[0.02] border-white/5 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C7F238] animate-ping" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">After (WorkPulse AI)</h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C7F238]/20 text-[#C7F238] border border-[#C7F238]/40 font-bold">
              Sub-15ms AI
            </span>
          </div>

          <div className="space-y-3">
            {metrics.map((m) => (
              <div key={m.metric} className="p-2.5 rounded-xl bg-black/40 border border-[#C7F238]/20 space-y-0.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-neutral-400">{m.metric}</span>
                  <span className="text-[#C7F238] font-bold">{m.gain}</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{m.after.value}</div>
                <div className="text-[11px] text-neutral-300">{m.after.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
