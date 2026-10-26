import React, { useState } from 'react';
import { Camera, AlertTriangle, Play, Square, Activity } from 'lucide-react';

export const PngCameraHealthView: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-white select-none">
      {/* Top Banner matching screenshot 6 */}
      <div className="text-center pt-2 space-y-3">
        <p className="text-xs sm:text-sm font-semibold text-[#FACC15] max-w-2xl mx-auto leading-relaxed">
          Seamlessly mark attendance using web or IP cameras. Choose your preferred option and let AI handle the rest &mdash; fast, secure, and touch-free.
        </p>

        <div>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-2.5 rounded-xl border border-red-500/80 bg-red-950/60 hover:bg-red-900/60 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg cursor-pointer transition-all"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>{isRunning ? 'Stop Cameras' : 'Start Cameras'}</span>
          </button>
        </div>

        <div className="text-xs font-semibold text-neutral-300">
          {isRunning ? 'Cameras checked and started.' : 'Cameras stopped.'}
        </div>
      </div>

      {/* Yellow Outlined Camera Status Pill Buttons matching screenshot 6 */}
      <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto pt-2">
        <button className="px-6 py-3 rounded-2xl border-2 border-yellow-400 bg-neutral-900/90 text-xs font-bold text-neutral-200 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
          Camera 1 <span className="text-rose-500 font-extrabold">(Failed)</span>
        </button>

        <button className="px-6 py-3 rounded-2xl border-2 border-yellow-400 bg-neutral-900/90 text-xs font-bold text-neutral-200 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
          Camera 0 <span className="text-emerald-400 font-extrabold">(Running)</span>
        </button>

        <button className="px-6 py-3 rounded-2xl border-2 border-yellow-400 bg-neutral-900/90 text-xs font-bold text-neutral-200 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
          Camera 2 <span className="text-rose-500 font-extrabold">(Failed)</span>
        </button>

        <button className="px-6 py-3 rounded-2xl border-2 border-yellow-400 bg-neutral-900/90 text-xs font-bold text-neutral-200">
          Camera <span className="text-neutral-400 font-bold">(No Source)</span>
        </button>

        <button className="px-6 py-3 rounded-2xl border-2 border-yellow-400 bg-neutral-900/90 text-xs font-bold text-neutral-200">
          Camera <span className="text-neutral-400 font-bold">(No Source)</span>
        </button>
      </div>

      {/* Analytics Card matching screenshot 9 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-2xl bg-[#121829] border border-neutral-800 text-center space-y-1">
          <div className="text-xs text-neutral-400">Total Violations</div>
          <div className="text-3xl font-extrabold text-white font-mono">190</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#121829] border border-neutral-800 text-center space-y-1">
          <div className="text-xs text-neutral-400">Frequent Alert Type</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">No Apron (54)</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#121829] border border-neutral-800 text-center space-y-1">
          <div className="text-xs text-neutral-400">Top Alert Zone</div>
          <div className="text-2xl font-extrabold text-sky-400 font-mono">Front Gate (134)</div>
        </div>
      </div>

      {/* Footer reference matching screenshot 6 */}
      <div className="pt-8 text-center text-xs text-neutral-500 font-mono space-y-1">
        <div>Developed by <span className="text-cyan-400">ApyCoder</span> | <span className="text-cyan-400 cursor-pointer">Visit Our Website</span></div>
        <div className="text-[11px] text-neutral-600">Version 2.0</div>
      </div>
    </div>
  );
};
