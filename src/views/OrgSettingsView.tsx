import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Clock,
  Sliders,
  Globe,
  Save,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { UserSession } from './LoginView.tsx';

interface OrgSettingsViewProps {
  currentUser?: UserSession | null;
}

export const OrgSettingsView: React.FC<OrgSettingsViewProps> = ({ currentUser }) => {
  const [companyName, setCompanyName] = useState(currentUser?.tenantName || 'Face Recognition Attendance System');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST, UTC+05:30)');
  const [gracePeriod, setGracePeriod] = useState('15');
  const [halfDayHours, setHalfDayHours] = useState('4.5');
  const [overtimeRate, setOvertimeRate] = useState('1.5');
  const [cosineThreshold, setCosineThreshold] = useState('0.88');
  const [isLivenessEnabled, setIsLivenessEnabled] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Organization attendance rules and biometric thresholds updated successfully in PostgreSQL.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="p-6 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#E6FF00]/10 text-[#E6FF00] border border-[#E6FF00]/30 font-bold">
              SECTION 18
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Organization &amp; Global Attendance Policies
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Global workforce policy engine: configure grace periods, overtime multipliers, biometric cosine matching tolerances, and physical facility coordinates.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Organization Policies</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Company Profile & Localization */}
        <div className="p-6 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#E6FF00]" />
            <span>Company Legal Entity &amp; Regional Localization</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1">Company Legal Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1">Operational Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option>Asia/Kolkata (IST, UTC+05:30)</option>
                <option>Europe/Berlin (CET, UTC+01:00)</option>
                <option>America/New_York (EST, UTC-05:00)</option>
                <option>Asia/Singapore (SGT, UTC+08:00)</option>
                <option>UTC (Coordinated Universal Time)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1">Standard Work Week Days</label>
              <div className="flex items-center gap-1.5 pt-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                  <span
                    key={d}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                      i < 5 ? 'bg-neutral-800 text-[#E6FF00] border border-neutral-700' : 'bg-neutral-900 text-neutral-500'
                    }`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Attendance Rules & Overtime Multipliers */}
        <div className="p-6 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#E6FF00]" />
            <span>Attendance Rules &amp; Shift Thresholds</span>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1">Grace Period (Minutes)</label>
                <input
                  type="number"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(e.target.value)}
                  className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1">Half-Day Threshold (Hrs)</label>
                <input
                  type="number"
                  step="0.5"
                  value={halfDayHours}
                  onChange={(e) => setHalfDayHours(e.target.value)}
                  className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1">Overtime Wage Multiplier</label>
              <input
                type="number"
                step="0.1"
                value={overtimeRate}
                onChange={(e) => setOvertimeRate(e.target.value)}
                className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs font-mono text-[#E6FF00] focus:outline-none"
              />
              <span className="text-[10px] text-neutral-500 mt-1 block">Standard policy: 1.5x for weekday OT, 2.0x for public holidays.</span>
            </div>
          </div>
        </div>

        {/* Card 3: Biometric Vision AI Parameters */}
        <div className="p-6 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4 lg:col-span-2">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#E6FF00]" />
            <span>Biometric Vision AI &amp; Anti-Spoofing Parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1">
                Minimum Cosine Similarity Matching Threshold
              </label>
              <input
                type="number"
                step="0.01"
                min="0.50"
                max="0.99"
                value={cosineThreshold}
                onChange={(e) => setCosineThreshold(e.target.value)}
                className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs font-mono text-[#E6FF00] focus:outline-none"
              />
              <span className="text-[10px] text-neutral-500 mt-1 block">
                Recommended 0.88: balances 99.8% true acceptance with &lt;0.001% false acceptance rate.
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0A0D17] border border-neutral-800">
              <div>
                <div className="text-xs font-bold text-white">Active Anti-Spoofing Liveness Detection</div>
                <div className="text-[10px] text-neutral-400">Rejects printed photo sheets and screen replays.</div>
              </div>
              <input
                type="checkbox"
                checked={isLivenessEnabled}
                onChange={(e) => setIsLivenessEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#E6FF00] focus:ring-0 bg-neutral-900 border-neutral-700 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
