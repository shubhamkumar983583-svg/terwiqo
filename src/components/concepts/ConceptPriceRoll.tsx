import React, { useState } from 'react';
import { Timer, Check, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { calculatePriceRoll } from '../../utils/concepts12.ts';

interface ConceptPriceRollProps {
  onSelectTier?: (tierName: string) => void;
  className?: string;
}

export const ConceptPriceRoll: React.FC<ConceptPriceRollProps> = ({
  onSelectTier,
  className = ''
}) => {
  const [seats, setSeats] = useState<number>(120);
  const [cameras, setCameras] = useState<number>(6);
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const priceData = calculatePriceRoll(seats, cameras, isAnnual);

  return (
    <div
      id="price-roll"
      className={`p-6 sm:p-8 rounded-3xl bg-[#090D1A]/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6 text-left relative overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FFA069] text-[10px] font-mono font-bold mb-1.5">
            <Timer className="w-3 h-3 text-[#FFA069]" />
            <span>Concept 10 · Price Roll (Dynamic Dynamic Calculator)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Interactive Transparent Pricing Roll
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Slide employee headcount and active CCTV streams to calculate precise monthly investment with zero hidden fees.
          </p>
        </div>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center gap-2 bg-white/[0.04] p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              !isAnnual ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isAnnual
                ? 'bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>Annual</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/40 text-[#C7F238] text-[9px] font-bold">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider 1: Employee Seats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">Employees &middot; Registered Workers</span>
              <span className="text-lg font-black text-[#FFA069] font-mono">{seats.toLocaleString()} Seats</span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFA069]"
            />
            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <span>10 Employees</span>
              <span>Rate: ${priceData.seatRate.toFixed(2)}/seat</span>
              <span>2,000+ Enterprise</span>
            </div>
          </div>

          {/* Slider 2: CCTV Streams */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">Active CCTV RTSP Cameras</span>
              <span className="text-lg font-black text-[#C7F238] font-mono">{cameras} Streams</span>
            </div>
            <input
              type="range"
              min="1"
              max="64"
              step="1"
              value={cameras}
              onChange={(e) => setCameras(Number(e.target.value))}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C7F238]"
            />
            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <span>1 Gate Pod</span>
              <span>Rate: $29/camera</span>
              <span>64 Campus Turnstiles</span>
            </div>
          </div>

          {/* Tier Recommendation Pill */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">Dynamic Tier Match:</span>
            <span className="px-3 py-1 rounded-full bg-[#FFA069]/20 text-[#FFA069] border border-orange-500/40 font-bold">
              {priceData.tierName}
            </span>
          </div>
        </div>

        {/* Pricing Summary Card (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 shadow-2xl backdrop-blur-2xl space-y-4">
          <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
            Computed Investment:
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
              ${priceData.effectiveMonthly.toLocaleString()}
            </span>
            <span className="text-neutral-400 text-xs font-mono">/ month</span>
          </div>

          {isAnnual && priceData.discountSaved > 0 && (
            <div className="text-xs font-mono text-[#C7F238] font-bold">
              ✨ Saving ${priceData.discountSaved.toLocaleString()} annually with promo
            </div>
          )}

          <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C7F238] shrink-0" />
              <span>Full PostgreSQL Row-Level Security tenant</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C7F238] shrink-0" />
              <span>Sub-15ms facial recognition on {cameras} cameras</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C7F238] shrink-0" />
              <span>Automated Overtime &amp; Sunday Payroll Generator</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C7F238] shrink-0" />
              <span>Dry-contact turnstile GPIO relay webhooks</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectTier?.(priceData.tierName)}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-95 text-black font-black text-sm transition-all cursor-pointer shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
          >
            <span>Deploy {priceData.tierName} Live</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
