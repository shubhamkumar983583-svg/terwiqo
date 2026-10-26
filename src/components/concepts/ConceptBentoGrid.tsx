import React, { useState } from 'react';
import {
  LayoutGrid,
  Camera,
  Cpu,
  Shield,
  CreditCard,
  Sliders,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Lock,
  ArrowRight
} from 'lucide-react';

interface ConceptBentoGridProps {
  className?: string;
  onExploreFeature?: (featureId: string) => void;
}

export const ConceptBentoGrid: React.FC<ConceptBentoGridProps> = ({
  className = '',
  onExploreFeature
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'edge' | 'security' | 'payroll'>('all');

  // Interactive micro-states inside bento cards
  const [rtspFps, setRtspFps] = useState(25);
  const [antiSpoofLevel, setAntiSpoofLevel] = useState<'Standard' | 'Liveness 3D'>('Liveness 3D');
  const [relayPulsing, setRelayPulsing] = useState(false);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState(1.5);

  const triggerTestRelay = () => {
    setRelayPulsing(true);
    setTimeout(() => setRelayPulsing(false), 900);
  };

  return (
    <div id="bento-build" className={`space-y-6 text-left ${className}`}>
      {/* Concept 06 Header & Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FFA069] text-[10px] font-mono font-bold mb-1.5">
            <LayoutGrid className="w-3 h-3 text-[#FFA069]" />
            <span>Concept 06 · Bento Build (Interactive Architecture Grid)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            High-Performance Modular Bento Architecture
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Live interactive modules connecting edge camera networks, zero-leak PostgreSQL isolation, and autonomous payroll pipelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-2xl border border-white/10 self-start sm:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Architecture' },
            { id: 'edge', label: 'Edge AI & CCTV' },
            { id: 'security', label: 'PostgreSQL Security' },
            { id: 'payroll', label: 'Payroll & HRMS' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Bento Tile 1: Edge RTSP Ingestion (Large - 7 cols) */}
        {(activeFilter === 'all' || activeFilter === 'edge') && (
          <div className="md:col-span-7 p-6 rounded-3xl bg-[#0D1322]/80 backdrop-blur-xl border border-white/10 hover:border-[#FFA069]/40 transition-all shadow-xl space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[#FFA069]">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Universal RTSP Camera Ingestion</h4>
                  <span className="text-[10px] text-neutral-400 font-mono">Any IP Camera &middot; Zero Proprietary Readers</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                {rtspFps} FPS Streaming
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Connect existing CP Plus, Dahua, Hikvision, or Axis camera feeds in minutes over standard RTSP URLs. No expensive proprietary badge terminals required.
            </p>

            {/* Interactive Control Widget */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-neutral-400 font-mono text-[11px]">Stream FPS Preset:</span>
              <div className="flex items-center gap-1.5">
                {[15, 25, 30].map((fps) => (
                  <button
                    key={fps}
                    type="button"
                    onClick={() => setRtspFps(fps)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-all ${
                      rtspFps === fps
                        ? 'bg-[#FFA069] text-black font-bold'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {fps} FPS
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bento Tile 2: 512-D Cosine Neural Engine (5 cols) */}
        {(activeFilter === 'all' || activeFilter === 'edge') && (
          <div className="md:col-span-5 p-6 rounded-3xl bg-[#0D1322]/80 backdrop-blur-xl border border-white/10 hover:border-[#C7F238]/40 transition-all shadow-xl space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center text-[#C7F238]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Sub-15ms Neural Match</h4>
                  <span className="text-[10px] text-neutral-400 font-mono">512-D Cosine Embeddings</span>
                </div>
              </div>
              <span className="text-xs font-mono text-[#C7F238] font-bold">14ms Median</span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Mathematical face vectors matched in-memory against local tenant indices. Zero raw worker portraits ever leave your internal firewall.
            </p>

            {/* Interactive Liveness Toggle */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-mono text-[11px]">Anti-Spoofing:</span>
              <button
                type="button"
                onClick={() => setAntiSpoofLevel(antiSpoofLevel === 'Standard' ? 'Liveness 3D' : 'Standard')}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[#C7F238]/20 text-[#C7F238] border border-[#C7F238]/40 font-bold cursor-pointer"
              >
                {antiSpoofLevel} (Active)
              </button>
            </div>
          </div>
        )}

        {/* Bento Tile 3: Row-Level PostgreSQL Security (4 cols) */}
        {(activeFilter === 'all' || activeFilter === 'security') && (
          <div className="md:col-span-4 p-6 rounded-3xl bg-[#0D1322]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all shadow-xl space-y-4 group">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">PostgreSQL RLS Multi-Tenancy</h4>
                <span className="text-[10px] text-neutral-400 font-mono">Row-Level Security</span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Strict database-enforced row isolation ensures no branch or company ever accesses another tenant&apos;s attendance records or employee vectors.
            </p>

            <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>tenant_id FK &middot; SOC 2 &amp; GDPR Article 17 Compliant</span>
            </div>
          </div>
        )}

        {/* Bento Tile 4: Hardware Turnstile Relay (4 cols) */}
        {(activeFilter === 'all' || activeFilter === 'edge') && (
          <div className="md:col-span-4 p-6 rounded-3xl bg-[#0D1322]/80 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-all shadow-xl space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Tripod Turnstile Webhooks</h4>
                  <span className="text-[10px] text-neutral-400 font-mono">1.2ms Dry-Contact Relay</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Standard dry contact GPIO relays or HTTP webhooks to swing open speed gates, magnetic glass doors, and factory revolving turnstiles.
            </p>

            {/* Interactive Relay Pulse Button */}
            <button
              type="button"
              onClick={triggerTestRelay}
              className={`w-full py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                relayPulsing
                  ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_#fbbf24]'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 border-amber-500/30'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${relayPulsing ? 'animate-bounce' : ''}`} />
              <span>{relayPulsing ? 'Relay Triggered: Barrier Open!' : 'Test Hardware Relay Signal'}</span>
            </button>
          </div>
        )}

        {/* Bento Tile 5: Autonomous Overtime & Payroll Sync (4 cols) */}
        {(activeFilter === 'all' || activeFilter === 'payroll') && (
          <div className="md:col-span-4 p-6 rounded-3xl bg-[#0D1322]/80 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition-all shadow-xl space-y-4 group">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Autonomous Payroll Sync</h4>
                <span className="text-[10px] text-neutral-400 font-mono">Sunday 1-Click Disbursal</span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Real-time overtime calculation with automated shift rule enforcement (1.5x/2.0x rates) and PDF pay slip generation with zero spreadsheet work.
            </p>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-300 pt-1">
              <span>Overtime Multiplier:</span>
              <button
                type="button"
                onClick={() => setOvertimeMultiplier(overtimeMultiplier === 1.5 ? 2.0 : 1.5)}
                className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold cursor-pointer"
              >
                {overtimeMultiplier}x Wage Tier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
