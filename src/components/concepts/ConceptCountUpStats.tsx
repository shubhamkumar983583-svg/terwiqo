import React, { useState, useEffect } from 'react';
import { BarChart3, RotateCcw, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface ConceptCountUpStatsProps {
  className?: string;
}

export const ConceptCountUpStats: React.FC<ConceptCountUpStatsProps> = ({ className = '' }) => {
  const [latency, setLatency] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [days, setDays] = useState(0);
  const [payroll, setPayroll] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startCountUp = () => {
    setIsRunning(true);
    setLatency(0);
    setAccuracy(0);
    setDays(0);
    setPayroll(0);

    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setLatency(Math.round(ease * 14));
      setAccuracy(Number((ease * 99.88).toFixed(2)));
      setDays(Math.round(ease * 500));
      setPayroll(Math.round(ease * 6110));

      if (step >= steps) {
        clearInterval(timer);
        setLatency(14);
        setAccuracy(99.88);
        setDays(500);
        setPayroll(6110);
        setIsRunning(false);
      }
    }, intervalTime);
  };

  useEffect(() => {
    startCountUp();
  }, []);

  return (
    <div
      id="count-up"
      className={`p-6 sm:p-8 rounded-3xl bg-[#0B0F1D]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 text-left relative overflow-hidden ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FFA069] text-[10px] font-mono font-bold mb-1.5">
            <BarChart3 className="w-3 h-3 text-[#FFA069]" />
            <span>Concept 05 · Count-Up Stats (UI/UX Conversion Enhancement)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Measurable Enterprise Telemetry in Real-Time
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Dynamic easing counters showing verified turnstile speed and database isolation guarantees.
          </p>
        </div>

        <button
          type="button"
          onClick={startCountUp}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 hover:text-white border border-white/15 transition-all cursor-pointer shadow-md disabled:opacity-50 self-start sm:self-auto"
        >
          <RotateCcw className={`w-3.5 h-3.5 text-[#C7F238] ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Counting Up...' : 'Replay Animation'}</span>
        </button>
      </div>

      {/* Grid of 4 Count-Up Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: 14ms Latency */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-[#FFA069]/40 transition-colors">
          <div className="text-xs text-neutral-400 font-mono mb-1 flex items-center justify-between">
            <span>Latency</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA069]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#FFA069] to-amber-200">
            {latency}ms
          </div>
          <div className="text-[11px] text-neutral-300 font-medium mt-1">
            Sub-15ms Biometric Match
          </div>
          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
            Median RTSP turnstile pass
          </div>
        </div>

        {/* Metric 2: 99.88% Accuracy */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-[#C7F238]/40 transition-colors">
          <div className="text-xs text-neutral-400 font-mono mb-1 flex items-center justify-between">
            <span>Accuracy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7F238]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#C7F238] to-emerald-200">
            {accuracy.toFixed(2)}%
          </div>
          <div className="text-[11px] text-neutral-300 font-medium mt-1">
            Cosine Vector Precision
          </div>
          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
            Zero buddy punching
          </div>
        </div>

        {/* Metric 3: 500+ Days Active */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-cyan-400/40 transition-colors">
          <div className="text-xs text-neutral-400 font-mono mb-1 flex items-center justify-between">
            <span>Continuous Uptime</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-200">
            {days}+
          </div>
          <div className="text-[11px] text-neutral-300 font-medium mt-1">
            Zero-Downtime Operations
          </div>
          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
            PostgreSQL HA clusters
          </div>
        </div>

        {/* Metric 4: $6,110 Automated Payroll */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-yellow-400/40 transition-colors">
          <div className="text-xs text-neutral-400 font-mono mb-1 flex items-center justify-between">
            <span>Weekly Disbursed</span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">
            ${payroll.toLocaleString()}
          </div>
          <div className="text-[11px] text-neutral-300 font-medium mt-1">
            Automated Overtime Sync
          </div>
          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
            1.5x shift multipliers applied
          </div>
        </div>
      </div>
    </div>
  );
};
