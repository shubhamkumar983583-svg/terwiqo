import React, { useState } from 'react';
import { PenTool, Play, CheckCircle2, Zap, ArrowRight, Activity, Clock } from 'lucide-react';
import { getProcessDrawSteps, ProcessDrawStep } from '../../utils/concepts12.ts';

interface ConceptProcessDrawProps {
  className?: string;
}

export const ConceptProcessDraw: React.FC<ConceptProcessDrawProps> = ({ className = '' }) => {
  const steps = getProcessDrawSteps();
  const [activeStep, setActiveStep] = useState<number>(3); // All complete by default
  const [isSimulating, setIsSimulating] = useState(false);
  const [pulseProgress, setPulseProgress] = useState(100);

  const runSimulation = () => {
    setIsSimulating(true);
    setPulseProgress(0);
    setActiveStep(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      setPulseProgress(progress);

      if (progress < 25) setActiveStep(0);
      else if (progress < 50) setActiveStep(1);
      else if (progress < 75) setActiveStep(2);
      else setActiveStep(3);

      if (progress >= 100) {
        clearInterval(interval);
        setIsSimulating(false);
        setPulseProgress(100);
      }
    }, 45);
  };

  return (
    <div
      id="process-draw"
      className={`p-6 sm:p-8 rounded-3xl bg-[#090D1A]/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6 text-left relative overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FFA069] text-[10px] font-mono font-bold mb-1.5">
            <PenTool className="w-3 h-3 text-[#FFA069]" />
            <span>Concept 08 · Process Draw (Interactive Pipeline Beam)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How Sub-15ms Biometric Walkthrough Works
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Watch the live execution path from raw camera video frame to dry contact physical gate relay.
          </p>
        </div>

        <button
          type="button"
          onClick={runSimulation}
          disabled={isSimulating}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-90 text-black transition-all cursor-pointer shadow-lg shadow-orange-500/20 disabled:opacity-50 self-start sm:self-auto"
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-pulse' : ''}`} />
          <span>{isSimulating ? 'Simulating 13.8ms Pulse...' : 'Simulate 14ms Pass'}</span>
        </button>
      </div>

      {/* Interactive Progress Bar & Latency Tally */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">Total Measured Execution Latency:</span>
          <span className="text-[#C7F238] font-bold">13.8ms (Sub-15ms Guaranteed)</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden relative border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#FFA069] via-amber-400 to-[#C7F238] transition-all duration-75 relative"
            style={{ width: `${pulseProgress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white shadow-[0_0_10px_#fff]" />
          </div>
        </div>
      </div>

      {/* 4 Pipeline Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {steps.map((st, idx) => {
          const isReached = pulseProgress >= st.pathPercentage;
          const isCurrent = activeStep === idx;

          return (
            <div
              key={st.step}
              className={`p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 relative ${
                isCurrent
                  ? 'bg-white/[0.1] border-[#C7F238] shadow-[0_0_20px_rgba(199,242,56,0.3)] ring-1 ring-[#C7F238]/40'
                  : isReached
                  ? 'bg-white/[0.04] border-white/15'
                  : 'bg-white/[0.02] border-white/5 opacity-60'
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-3">
                <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                  isReached ? 'bg-[#C7F238] text-black' : 'bg-white/10 text-neutral-400'
                }`}>
                  0{st.step}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#FFA069] border border-orange-500/30">
                  {st.latency}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white tracking-tight">{st.title}</h4>
              <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">{st.desc}</p>
              <div className="text-[10px] text-neutral-400 font-mono mt-3 pt-2 border-t border-white/5">
                {st.detail}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
