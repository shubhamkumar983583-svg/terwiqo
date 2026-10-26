import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, Shield, Check } from 'lucide-react';
import { getUsVsThemMatrix, ComparisonRow } from '../../utils/concepts12.ts';

interface ConceptUsVsThemProps {
  className?: string;
}

export const ConceptUsVsThem: React.FC<ConceptUsVsThemProps> = ({ className = '' }) => {
  const rows = getUsVsThemMatrix();
  const [highlightIdx, setHighlightIdx] = useState<number | null>(0);

  return (
    <div
      id="us-vs-them"
      className={`p-6 sm:p-8 rounded-3xl bg-[#090D1A]/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6 text-left relative overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FFA069] text-[10px] font-mono font-bold mb-1.5">
            <CheckCircle2 className="w-3 h-3 text-[#FFA069]" />
            <span>Concept 11 · Us vs Them (Interactive Competitive Matrix)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            WorkPulse AI vs. Legacy Biometrics
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Why modern operations are replacing dirty fingerprint readers and easily-shared RFID badges.
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 font-mono text-[11px] text-neutral-400">
              <th className="py-3 px-4">Evaluation Dimension</th>
              <th className="py-3 px-4 text-[#FFA069] font-bold">
                WorkPulse AI (CCTV)
              </th>
              <th className="py-3 px-4">Fingerprint Terminals</th>
              <th className="py-3 px-4">RFID Cards</th>
              <th className="py-3 px-4 text-[#C7F238]">WorkPulse Advantage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {rows.map((r, idx) => {
              const isHovered = highlightIdx === idx;
              return (
                <tr
                  key={r.dimension}
                  onMouseEnter={() => setHighlightIdx(idx)}
                  className={`transition-all duration-150 cursor-pointer ${
                    isHovered ? 'bg-white/[0.06]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {r.dimension}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white font-mono bg-orange-500/[0.04]">
                    <div className="flex items-center gap-1.5 text-[#FFA069]">
                      <Check className="w-4 h-4 text-[#C7F238] shrink-0" />
                      <span>{r.workpulse}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{r.fingerprint}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{r.legacyCard}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#C7F238]">
                    <span className="px-2 py-0.5 rounded-full bg-[#C7F238]/15 border border-[#C7F238]/30 text-[10px]">
                      {r.advantage}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
