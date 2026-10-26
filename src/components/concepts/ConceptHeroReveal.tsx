import React, { useState, useEffect } from 'react';
import {
  Camera,
  Layers,
  Sparkles,
  MousePointer,
  CheckCircle2,
  Cpu,
  Shield,
  Activity,
  Maximize2,
  Radio,
  Play,
  RotateCcw
} from 'lucide-react';

interface ConceptHeroRevealProps {
  currentTenantName?: string;
  onExploreArchitecture?: () => void;
  className?: string;
}

export const ConceptHeroReveal: React.FC<ConceptHeroRevealProps> = ({
  currentTenantName = 'Face Recognition Attendance System',
  onExploreArchitecture,
  className = ''
}) => {
  // Concept 01: Hero Reveal Modes ('feed' | 'inspector')
  const [revealMode, setRevealMode] = useState<'feed' | 'inspector'>('feed');

  // Concept 07: Cursor Tour State
  const [isTourActive, setIsTourActive] = useState(false);
  const [activeTourStep, setActiveTourStep] = useState(0);

  const tourMilestones = [
    {
      id: 1,
      target: 'RTSP Stream Ingestion',
      badge: 'Step 1 · 2.4ms',
      x: '14%',
      y: '22%',
      heading: 'RTSP Video Feed Stream',
      description: 'Zero-latency H.264 stream decoded locally from existing CP Plus & Hikvision cameras over on-premise LAN.'
    },
    {
      id: 2,
      target: '512-D Cosine Embedding',
      badge: 'Step 2 · 8.1ms',
      x: '45%',
      y: '34%',
      heading: 'Neural Vector Match (<0.12 dist)',
      description: 'Mathematical face landmarks computed in-memory. Zero biometric raw images leave the facility firewall.'
    },
    {
      id: 3,
      target: 'PostgreSQL Tenant Check',
      badge: 'Step 3 · 2.1ms',
      x: '72%',
      y: '78%',
      heading: 'Row-Level PostgreSQL Auth',
      description: 'Encrypted tenant isolation policy verifies employee shift window and active biometric roster.'
    },
    {
      id: 4,
      target: 'GPIO Turnstile Relay',
      badge: 'Step 4 · 1.2ms',
      x: '78%',
      y: '25%',
      heading: 'Dry-Contact Relay Pulse',
      description: 'Dry contact relay fires 5V pulse to open tripod turnstile gate in sub-15ms guaranteed time.'
    }
  ];

  // Auto-advance tour when running
  useEffect(() => {
    if (!isTourActive) return;
    const interval = setInterval(() => {
      setActiveTourStep((prev) => (prev + 1) % tourMilestones.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isTourActive]);

  const activeMilestone = tourMilestones[activeTourStep];

  return (
    <div
      id="hero-reveal"
      className={`relative p-5 sm:p-7 rounded-3xl bg-[#0D1322]/85 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-4 text-left overflow-hidden ${className}`}
    >
      {/* Ambient glow behind card */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Concept 01 & 07 Enhancement Badges */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#FFA069]" />
          <span className="text-xs font-bold text-white">Live Edge CCTV Node #04</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            25 FPS RTSP
          </span>
        </div>

        {/* Concept 01 Toggle Controls */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => {
              setRevealMode('feed');
              setIsTourActive(false);
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              revealMode === 'feed'
                ? 'bg-[#FFA069] text-black shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Operational Feed
          </button>
          <button
            type="button"
            onClick={() => setRevealMode('inspector')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
              revealMode === 'inspector'
                ? 'bg-[#C7F238] text-black shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>01 Reveal Vector</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display (Camera Feed vs Inspector Layer) */}
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-neutral-900 border border-white/10 group">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
          alt="Industrial Turnstile Camera Feed"
          className={`w-full h-full object-cover transition-all duration-700 ${
            revealMode === 'inspector' ? 'brightness-50 contrast-125 saturate-50' : 'opacity-85'
          }`}
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

        {/* Feed HUD Bar */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[10px] font-mono text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10">
            CAM_FACTORY_GATE_01
          </span>
        </div>

        <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-md border border-white/10 flex items-center gap-1">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>MATCH: 99.88%</span>
        </div>

        {/* Simulated Biometric Facial Bounding Box */}
        <div className="absolute top-1/4 left-1/3 w-32 h-36 border-2 border-[#C7F238] rounded-xl shadow-[0_0_20px_rgba(199,242,56,0.5)] flex flex-col justify-between p-2 animate-pulse">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono bg-black/80 text-[#C7F238] px-1.5 py-0.5 rounded font-bold">
              Asif Khan (Owner)
            </span>
            <span className="text-[8px] font-mono bg-emerald-950/80 text-emerald-300 px-1 rounded">
              CONF 0.992
            </span>
          </div>

          {/* Under-the-Hood Vector Reveal (Concept 01) */}
          {revealMode === 'inspector' && (
            <div className="bg-black/90 p-1 rounded border border-[#C7F238]/40 text-[7px] font-mono text-neutral-300 space-y-0.5 animate-in fade-in zoom-in-95">
              <div className="text-[#FFA069] font-bold">512-D VECTOR PROBE:</div>
              <div className="truncate text-neutral-400">[0.142, -0.891, 0.441, ...]</div>
              <div className="text-emerald-400">COSINE DIST: 0.081 &lt; 0.12</div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono bg-emerald-950/90 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
              VERIFIED 14ms
            </span>
            <span className="text-[8px] font-mono text-neutral-400">GATE #01</span>
          </div>
        </div>

        {/* RTSP & Relay Status Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-neutral-300 bg-black/60 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
          <span>RTSP: 192.168.1.104:554</span>
          <span className="text-[#FFA069] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA069] animate-ping" />
            Turnstile Relay: UNLOCKED
          </span>
        </div>

        {/* Concept 07: Hotspot Tour Pins on Preview */}
        {tourMilestones.map((pin, idx) => {
          const isCurrent = isTourActive && activeTourStep === idx;
          return (
            <button
              key={pin.id}
              type="button"
              onClick={() => {
                setActiveTourStep(idx);
                setIsTourActive(true);
              }}
              style={{ left: pin.x, top: pin.y }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all cursor-pointer z-20 ${
                isCurrent
                  ? 'bg-[#C7F238] text-black shadow-[0_0_16px_#c7f238] scale-125 ring-4 ring-[#C7F238]/30'
                  : 'bg-black/80 hover:bg-[#FFA069] text-white hover:text-black border border-white/30 hover:scale-110'
              }`}
              title={`Hotspot Pin ${pin.id}: ${pin.target}`}
            >
              {pin.id}
            </button>
          );
        })}

        {/* Concept 07 Tour Popover Card */}
        {isTourActive && (
          <div className="absolute bottom-12 left-4 right-4 sm:left-6 sm:right-6 bg-[#0E1527]/95 backdrop-blur-xl border border-[#C7F238]/50 p-3 rounded-2xl shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#C7F238] uppercase">
                {activeMilestone.badge} &middot; {activeMilestone.heading}
              </span>
              <button
                type="button"
                onClick={() => setIsTourActive(false)}
                className="text-neutral-400 hover:text-white text-xs font-mono px-1.5 py-0.5 rounded cursor-pointer"
              >
                Close Tour &times;
              </button>
            </div>
            <p className="text-xs text-neutral-200 mt-1 leading-relaxed">
              {activeMilestone.description}
            </p>
          </div>
        )}
      </div>

      {/* Tour Trigger Controls & Real-Time Metrics */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={() => setIsTourActive(!isTourActive)}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
            isTourActive
              ? 'bg-[#C7F238]/20 text-[#C7F238] border-[#C7F238]/50 shadow-[0_0_12px_rgba(199,242,56,0.3)]'
              : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08] border-white/10'
          }`}
        >
          <MousePointer className="w-3.5 h-3.5 text-amber-400" />
          <span>{isTourActive ? 'Tour Running (Click to Stop)' : '07 Play Cursor Tour'}</span>
        </button>

        <span className="text-[10px] font-mono text-neutral-400">
          Sub-15ms Biometrics &middot; {currentTenantName}
        </span>
      </div>

      {/* Mini Stats Bar */}
      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <div className="text-neutral-400 text-[10px]">Worker Quorum Today</div>
          <div className="text-lg font-bold text-white font-mono">1,382 / 1,400</div>
          <div className="text-[9px] text-emerald-400 font-mono">98.7% Shift Filled</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <div className="text-neutral-400 text-[10px]">Overtime Disbursed</div>
          <div className="text-lg font-bold text-[#FFA069] font-mono">$6,110.00</div>
          <div className="text-[9px] text-[#C7F238] font-mono">1.5x Premium Wage</div>
        </div>
      </div>
    </div>
  );
};
