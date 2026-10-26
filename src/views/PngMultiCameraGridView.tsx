import React, { useState } from 'react';
import { ShieldAlert, Video, Eye, AlertOctagon } from 'lucide-react';

export const PngMultiCameraGridView: React.FC = () => {
  const [selectedCam, setSelectedCam] = useState<number>(6);

  const cameras = [
    { id: 1, name: 'Ip camera 1', gate: 'Gate 1', alert: 'No Glasses 74%' },
    { id: 2, name: 'Ip camera 2', gate: 'Gate 2', alert: 'No Apron 37%' },
    { id: 3, name: 'Ip camera 3', gate: 'Gate 3', alert: 'Safety OK' },
    { id: 4, name: 'Ip camera 4', gate: 'Gate 4', alert: 'No Apron 39%' },
    { id: 5, name: 'Ip camera 5', gate: 'Gate 5', alert: 'No Apron 35%' },
    { id: 6, name: 'Ip camera 6', gate: 'Gate 6', alert: 'Inspection Lock' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-white select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#FACC15] tracking-wide inline-flex items-center gap-2">
            <Video className="w-6 h-6 text-[#FACC15]" />
            <span>Industrial CCTV 6-Channel AI Surveillance Grid</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time multi-stream PPE compliance, face verification & turnstile monitoring
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold font-mono">
            Critical Alert: violation detected!
          </span>
        </div>
      </div>

      {/* 6-Camera Grid - Exact match with screenshot 10 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map((cam) => {
          const isSelected = selectedCam === cam.id;
          return (
            <div
              key={cam.id}
              onClick={() => setSelectedCam(cam.id)}
              className={`rounded-2xl overflow-hidden bg-neutral-900 border-2 transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.3)] ring-2 ring-[#22C55E]/40'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Top camera status bar */}
              <div className="p-2.5 bg-black/80 flex items-center justify-between border-b border-neutral-800">
                <span className="text-xs font-bold text-neutral-200">{cam.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-600 text-white font-bold">
                  {cam.gate}
                </span>
              </div>

              {/* Video Tile with Worker & Hardhat Detection Bounding Boxes */}
              <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
                  alt="Industrial Worker"
                  className="w-full h-full object-cover opacity-85"
                />

                {/* Simulated Hardhat Detection Box (Green) */}
                <div className="absolute top-3 left-1/3 w-28 h-14 border-2 border-emerald-400 bg-emerald-400/10">
                  <div className="text-[9px] font-mono font-bold text-white bg-emerald-600 px-1 py-0.2 inline-block">
                    HELMET 98%
                  </div>
                </div>

                {/* Simulated Violation Box (Red) */}
                <div className="absolute top-16 left-1/4 w-36 h-28 border-2 border-red-500 bg-red-500/10">
                  <div className="text-[9px] font-mono font-bold text-white bg-red-600 px-1 py-0.2 inline-block">
                    {cam.alert}
                  </div>
                </div>

                {/* Camera metadata watermark matching screenshot */}
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-neutral-400 bg-black/60 px-1.5 py-0.5 rounded-xs">
                  DS-2CD2T83G2-2I(AY2148280)
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer reference matching screenshot 10 */}
      <div className="pt-4 border-t border-neutral-800 text-center text-xs text-neutral-500 font-mono">
        &copy; 2026 AITrackify Vision Systems | Industrial Surveillance
      </div>
    </div>
  );
};
