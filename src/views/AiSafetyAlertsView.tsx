import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Camera,
  CheckCircle2,
  Filter,
  Eye,
  Download,
  Search,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface SecurityAlert {
  id: string;
  type: 'TAILGATING' | 'UNRECOGNIZED_FACE' | 'PPE_VIOLATION' | 'RESTRICTED_ZONE' | 'AFTER_HOURS_BREACH';
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  cameraName: string;
  location: string;
  timestamp: string;
  confidence: number;
  status: 'PENDING_REVIEW' | 'CONFIRMED' | 'DISMISSED';
  details: string;
}

export const AiSafetyAlertsView: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [alerts, setAlerts] = useState<SecurityAlert[]>([
    {
      id: 'ALT-9041',
      type: 'TAILGATING',
      severity: 'CRITICAL',
      cameraName: 'Gate 1 Turnstile Overhead (Cam-01)',
      location: 'Main North Gate',
      timestamp: 'Just now (10:48:12)',
      confidence: 96.4,
      status: 'PENDING_REVIEW',
      details: 'Two individuals detected passing turnstile pod on single QR badge scan.'
    },
    {
      id: 'ALT-9040',
      type: 'UNRECOGNIZED_FACE',
      severity: 'HIGH',
      cameraName: 'R&D Pod Entrance (Cam-03)',
      location: 'Building B - Level 2',
      timestamp: '4 mins ago (10:44:02)',
      confidence: 91.2,
      status: 'PENDING_REVIEW',
      details: 'Impostor probe vector similarity below threshold (0.64 vs required 0.88).'
    },
    {
      id: 'ALT-9039',
      type: 'PPE_VIOLATION',
      severity: 'MEDIUM',
      cameraName: 'Assembly Bay High-Bay (Cam-04)',
      location: 'Plant 4 Floor',
      timestamp: '18 mins ago (10:30:15)',
      confidence: 98.7,
      status: 'CONFIRMED',
      details: 'Worker detected in high-risk zone without mandatory hardhat and safety vest.'
    },
    {
      id: 'ALT-9038',
      type: 'RESTRICTED_ZONE',
      severity: 'HIGH',
      cameraName: 'Server Facility Corridors (Cam-06)',
      location: 'Basement Vault',
      timestamp: '1 hr ago (09:42:19)',
      confidence: 94.0,
      status: 'DISMISSED',
      details: 'Off-hours loitering flagged by edge motion bounding box.'
    }
  ]);

  const handleResolveAlert = (id: string, action: 'CONFIRMED' | 'DISMISSED') => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: action } : a))
    );
  };

  const filteredAlerts = filterType === 'ALL'
    ? alerts
    : alerts.filter((a) => a.type === filterType);

  return (
    <div className="p-6 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/30 font-bold">
              SECTION 13
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              AI Safety Alerts &amp; Detection Incident Ledger
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time computer vision threat detection: anti-tailgating, unrecognized face probes, PPE compliance, and perimeter breach surveillance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting full security incident audit report (CSV)...')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Incident Log (CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#101524] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase font-bold">Active Incidents</div>
          <div className="text-xl font-black text-white font-mono mt-1">
            {alerts.filter((a) => a.status === 'PENDING_REVIEW').length}
          </div>
          <div className="text-[10px] text-red-400 font-mono mt-0.5">Requires Dispatch</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#101524] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase font-bold">Vision AI Nodes</div>
          <div className="text-xl font-black text-white font-mono mt-1">6 Active</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Edge RTSP Connected</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#101524] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase font-bold">Detection Precision</div>
          <div className="text-xl font-black text-[#E6FF00] font-mono mt-1">98.2%</div>
          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">&gt;0.88 Cosine Metric</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#101524] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase font-bold">Average Latency</div>
          <div className="text-xl font-black text-white font-mono mt-1">16.4 ms</div>
          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">NVIDIA TensorRT Edge</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['ALL', 'TAILGATING', 'UNRECOGNIZED_FACE', 'PPE_VIOLATION', 'RESTRICTED_ZONE'].map((ft) => (
          <button
            key={ft}
            onClick={() => setFilterType(ft)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterType === ft
                ? 'bg-neutral-800 text-[#E6FF00] border border-neutral-700'
                : 'bg-[#101524] text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {ft.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Incident Cards */}
      <div className="space-y-3">
        {filteredAlerts.map((alertItem) => (
          <div
            key={alertItem.id}
            className="p-5 rounded-2xl bg-[#101524] border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    alertItem.severity === 'CRITICAL'
                      ? 'bg-red-950 text-red-400 border border-red-500/40 animate-pulse'
                      : alertItem.severity === 'HIGH'
                      ? 'bg-orange-950 text-orange-400 border border-orange-500/40'
                      : 'bg-yellow-950 text-yellow-400 border border-yellow-500/40'
                  }`}
                >
                  {alertItem.severity}
                </span>

                <span className="font-mono text-xs text-[#E6FF00] font-bold">{alertItem.id}</span>
                <span className="text-xs font-bold text-white">{alertItem.type.replace('_', ' ')}</span>
                <span className="text-[11px] text-neutral-500 font-mono">&middot; {alertItem.timestamp}</span>
              </div>

              <p className="text-xs text-neutral-300 max-w-2xl">{alertItem.details}</p>

              <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#E6FF00]" />
                  {alertItem.cameraName} ({alertItem.location})
                </span>
                <span>Confidence: {alertItem.confidence}%</span>
              </div>
            </div>

            {/* Status / Resolution buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {alertItem.status === 'PENDING_REVIEW' ? (
                <>
                  <button
                    onClick={() => handleResolveAlert(alertItem.id, 'CONFIRMED')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors cursor-pointer"
                  >
                    Confirm Violation
                  </button>
                  <button
                    onClick={() => handleResolveAlert(alertItem.id, 'DISMISSED')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                  >
                    Dismiss False Positive
                  </button>
                </>
              ) : (
                <span
                  className={`text-xs font-mono px-3 py-1.5 rounded-xl font-bold ${
                    alertItem.status === 'CONFIRMED'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                  }`}
                >
                  {alertItem.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
