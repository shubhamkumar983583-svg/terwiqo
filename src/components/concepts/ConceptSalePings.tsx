import React, { useState, useEffect } from 'react';
import { Bell, X, Pause, Play, CheckCircle2, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import { INITIAL_SALE_PINGS, SalePingItem } from '../../utils/concepts12.ts';

interface ConceptSalePingsProps {
  className?: string;
}

export const ConceptSalePings: React.FC<ConceptSalePingsProps> = ({ className = '' }) => {
  const [pings, setPings] = useState<SalePingItem[]>(INITIAL_SALE_PINGS.slice(0, 1));
  const [isAutoActive, setIsAutoActive] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Auto-generate activity pings every 7 seconds
  useEffect(() => {
    if (!isAutoActive || isDismissed) return;
    const interval = setInterval(() => {
      const template = INITIAL_SALE_PINGS[Math.floor(Math.random() * INITIAL_SALE_PINGS.length)];
      const nextPing: SalePingItem = {
        ...template,
        id: `ping-${Date.now()}`,
        timeAgo: 'Just now'
      };
      setPings((prev) => [nextPing, ...prev.slice(0, 1)]);
    }, 7500);

    return () => clearInterval(interval);
  }, [isAutoActive, isDismissed]);

  const addSimulatedPing = () => {
    setIsDismissed(false);
    const template = INITIAL_SALE_PINGS[Math.floor(Math.random() * INITIAL_SALE_PINGS.length)];
    const newPing: SalePingItem = {
      ...template,
      id: `ping-${Date.now()}`,
      timeAgo: 'Just now'
    };
    setPings([newPing]);
  };

  if (isDismissed) {
    return (
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={addSimulatedPing}
          className="px-3 py-1.5 rounded-full bg-[#0E1322]/90 hover:bg-[#1A2238] border border-orange-500/30 text-[11px] font-mono text-[#FFA069] flex items-center gap-1.5 shadow-xl backdrop-blur-md cursor-pointer transition-all"
          title="Restore Concept 03: Live Activity Pings"
        >
          <Bell className="w-3.5 h-3.5 text-[#FFA069] animate-bounce" />
          <span>03 Live Activity Ticker</span>
        </button>
      </div>
    );
  }

  const latestPing = pings[0];
  if (!latestPing) return null;

  return (
    <div
      id="sale-pings"
      className={`fixed bottom-6 left-4 sm:left-6 z-40 max-w-sm w-full transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${className}`}
    >
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0B0F1D]/90 backdrop-blur-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-2 text-left relative overflow-hidden group">
        {/* Subtle accent side border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFA069] via-amber-400 to-[#C7F238]" />

        {/* Header Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono pl-1 text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-white uppercase tracking-wider">Concept 03 · Verified Social Proof</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsAutoActive(!isAutoActive)}
              className="p-1 hover:text-white rounded cursor-pointer"
              title={isAutoActive ? 'Pause auto-ticker' : 'Resume auto-ticker'}
            >
              {isAutoActive ? <Pause className="w-3 h-3 text-neutral-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
            </button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1 hover:text-white rounded cursor-pointer"
              title="Dismiss ping"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Client & Event Content */}
        <div className="flex items-start gap-3 pl-1">
          <img
            src={latestPing.avatar}
            alt={latestPing.client}
            className="w-9 h-9 rounded-xl object-cover border border-white/20 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-xs text-white truncate">{latestPing.client}</span>
              <span className="text-[10px] font-mono text-[#C7F238] shrink-0 font-bold">{latestPing.amount}</span>
            </div>
            <p className="text-[11px] text-neutral-300 truncate mt-0.5">{latestPing.event}</p>
            <div className="flex items-center gap-2 mt-1.5 text-[9px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-200 border border-white/10">
                {latestPing.badge}
              </span>
              <span className="text-neutral-400">{latestPing.timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
