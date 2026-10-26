import React, { useState } from 'react';
import { Camera, Check, RefreshCw, Trash2, Save, Plus, Target } from 'lucide-react';

export const PngRoiConfigView: React.FC = () => {
  const [fps, setFps] = useState(33);
  const [roiSaved, setRoiSaved] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [roiBox, setRoiBox] = useState({
    x: 65,
    y: 8,
    width: 25,
    height: 80,
    label: 'DS-2CD2T83G2-2I(AY2148280)'
  });

  const handleSave = () => {
    setRoiSaved(true);
  };

  const handleClear = () => {
    setRoiBox({ x: 0, y: 0, width: 0, height: 0, label: '' });
    setRoiSaved(false);
  };

  const handleResetDefault = () => {
    setRoiBox({
      x: 65,
      y: 8,
      width: 25,
      height: 80,
      label: 'DS-2CD2T83G2-2I(AY2148280)'
    });
    setRoiSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white select-none">
      <div className="text-center pt-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#FACC15] tracking-wide inline-flex items-center gap-2">
          <Target className="w-6 h-6 text-[#FACC15]" />
          <span>CCTV Region of Interest (ROI) Configuration</span>
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Restrict facial recognition triggers to entry turnstiles and safety perimeter boundaries.
        </p>
      </div>

      {/* Main Video Frame & Canvas - Exact match with screenshot 9 */}
      <div className="bg-black rounded-3xl p-4 sm:p-6 border border-neutral-800 shadow-2xl space-y-4">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center">
          {/* Simulated Industrial CCTV Video Frame */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80)'
            }}
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* FPS Counter in Neon Green at Top-Left (matching screenshot 9) */}
          <div className="absolute top-4 left-5 text-[#22C55E] font-mono font-black text-sm tracking-widest drop-shadow-md">
            FPS: {fps}
          </div>

          {/* Interactive Green ROI Polygon Bounding Box over doorway / entrance */}
          {roiBox.width > 0 && (
            <div
              style={{
                left: `${roiBox.x}%`,
                top: `${roiBox.y}%`,
                width: `${roiBox.width}%`,
                height: `${roiBox.height}%`
              }}
              className="absolute border-2 border-[#22C55E] bg-[#22C55E]/20 backdrop-blur-[0.5px] rounded-xs shadow-[0_0_15px_rgba(34,197,94,0.3)] flex flex-col justify-end p-2 cursor-move"
            >
              <div className="text-[10px] font-mono font-bold text-white bg-black/80 px-2 py-0.5 rounded-xs truncate border border-[#22C55E]/40">
                {roiBox.label}
              </div>
            </div>
          )}

          {/* Crosshair cursor indicator */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Action Controls Bar matching screenshot 9 */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleResetDefault}
            className="px-4 py-2 text-xs font-bold rounded-lg border border-sky-500 text-sky-400 hover:bg-sky-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add ROI</span>
          </button>

          <button
            onClick={handleClear}
            className="px-4 py-2 text-xs font-bold rounded-lg border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>✏️ Clear Current</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-bold rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>💾 Save ROIs</span>
          </button>

          <button
            onClick={handleClear}
            className="px-4 py-2 text-xs font-bold rounded-lg border border-red-500 text-red-400 hover:bg-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete All</span>
          </button>
        </div>

        {/* Green Success Message Banner matching screenshot 9 */}
        {roiSaved && (
          <div className="text-center py-2 flex items-center justify-center gap-2 text-xs font-bold text-[#22C55E]">
            <Check className="w-4 h-4" />
            <span>All ROIs saved successfully.</span>
          </div>
        )}

        <div className="text-center text-[11px] text-neutral-500 font-mono">
          Click to draw ROI points. Minimum 3 points required.
        </div>
      </div>
    </div>
  );
};
