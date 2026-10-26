import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRightCircle,
  Video,
  TrendingUp,
  AlertTriangle,
  QrCode,
  Building2,
  ShieldAlert,
  Sliders,
  Sparkles,
  ArrowRight,
  Camera,
  Activity,
  Layers,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Briefcase,
  LayoutGrid
} from 'lucide-react';
import { Employee, AttendanceRecord, CameraConfig } from '../data/mockData.ts';
import { findIndustryById, IndustryConfig, industryRegistry } from '../data/industryRegistry.ts';
import { IndustrySearchBar, getIndustryIcon } from '../components/IndustrySearchBar.tsx';
import { PngBusinessSelectorCard } from '../components/PngBusinessSelectorCard.tsx';
import { InteractiveGeofenceMap } from '../components/InteractiveGeofenceMap.tsx';

interface IndustryAwareDashboardViewProps {
  currentIndustryId: string;
  onSelectIndustry: (industryId: string) => void;
  employees: Employee[];
  attendance: AttendanceRecord[];
  cameras: CameraConfig[];
  onNavigate: (tab: any) => void;
  tenantName?: string;
  isSwitching?: boolean;
}

export const IndustryAwareDashboardView: React.FC<IndustryAwareDashboardViewProps> = ({
  currentIndustryId,
  onSelectIndustry,
  employees,
  attendance,
  cameras,
  onNavigate,
  tenantName = 'Face Recognition Attendance System',
  isSwitching = false
}) => {
  const [selectorStyle, setSelectorStyle] = useState<'png_card' | 'compact'>('png_card');

  const industry = findIndustryById(currentIndustryId);
  const IconComponent = getIndustryIcon(industry.iconName);

  const totalEmployees = employees.length;
  const presentCount = attendance.filter((a) => a.status === 'Present').length;
  const absentCount = attendance.filter((a) => a.status === 'Absent').length;
  const lateCount = attendance.filter((a) => a.isLate).length;
  const activeCameras = cameras.filter((c) => c.status === 'Active').length;

  const dataProps = { totalEmployees, presentCount, absentCount, lateCount, activeCameras };

  return (
    <div className="space-y-6 text-left select-none">
      
      {/* Switcher Display Toggle (PNG Concept Card vs Compact Bar) */}
      <div className="flex items-center justify-between gap-3 px-1 pt-1 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
            Industry Switcher View:
          </span>
          <div className="inline-flex rounded-xl bg-white/[0.04] backdrop-blur-md p-1 border border-white/10 text-xs shadow-inner">
            <button
              type="button"
              onClick={() => setSelectorStyle('png_card')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectorStyle === 'png_card'
                  ? 'bg-white/[0.14] text-[#FACC15] shadow-[0_0_12px_rgba(250,204,21,0.25)] border border-[#FACC15]/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>PNG Concept Card (Mockup)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectorStyle('compact')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectorStyle === 'compact'
                  ? 'bg-white/[0.14] text-[#FACC15] shadow-[0_0_12px_rgba(250,204,21,0.25)] border border-[#FACC15]/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Compact Bar</span>
            </button>
          </div>
        </div>

        {isSwitching && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#FACC15] bg-white/[0.04] px-3 py-1 rounded-full border border-[#FACC15]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-ping shadow-[0_0_6px_#facc15]" />
            <span>Adapting dashboard to {industry.shortName}...</span>
          </div>
        )}
      </div>

      {/* Prominent Industry Search & Switcher */}
      {selectorStyle === 'png_card' ? (
        <PngBusinessSelectorCard
          currentIndustryId={currentIndustryId}
          onSelectIndustry={onSelectIndustry}
        />
      ) : (
        <div className="pt-1">
          <IndustrySearchBar
            currentIndustryId={currentIndustryId}
            onSelectIndustry={onSelectIndustry}
            isLoading={isSwitching}
          />
        </div>
      )}

      {/* Top Industry Header Banner with Frosted Glassmorphism */}
      <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/12 shadow-[0_16px_40px_0_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.18)] flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div
          className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: industry.accentColor }}
        />

        <div className="flex items-center gap-4 relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 shadow-lg backdrop-blur-xl"
            style={{ backgroundColor: `${industry.accentColor}25`, color: industry.accentColor }}
          >
            <IconComponent className="w-7 h-7 drop-shadow-[0_0_8px_currentColor]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-sm"
                style={{
                  backgroundColor: `${industry.accentColor}18`,
                  color: industry.accentColor,
                  borderColor: `${industry.accentColor}50`
                }}
              >
                {industry.badge} &middot; ACTIVE DASHBOARD
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                Org: {tenantName}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              <span>{industry.name} Dashboard</span>
            </h1>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              {industry.description}
            </p>
          </div>
        </div>

        {/* Quick Mode Indicator & Action with Glass Pill */}
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={() => onNavigate('live')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md shadow-yellow-500/25 cursor-pointer hover:scale-[1.02]"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Launch {industry.terminology.checkIn}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Industry-Tailored KPI Metric Cards (Glassmorphism Bento Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {industry.metrics.map((metric, idx) => {
          const isFinancialOrLast = idx === 3;
          return (
            <div
              key={metric.id || idx}
              onClick={() => onNavigate(idx === 0 ? 'employees' : idx === 1 ? 'work_policy' : idx === 2 ? 'camera_settings' : 'attendance')}
              className={`p-5 rounded-2xl transition-all cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] transform hover:-translate-y-1 border backdrop-blur-xl ${
                isFinancialOrLast
                  ? 'bg-gradient-to-br from-orange-500/15 via-white/[0.04] to-white/[0.02] border-orange-500/35 hover:border-orange-500/60 shadow-orange-500/10'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-[#FFA069]/40'
              }`}
            >
              <div className="text-[11px] font-bold text-neutral-300 truncate flex items-center justify-between">
                <span>{metric.label}</span>
                {isFinancialOrLast && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#FFA069]/20 text-[#FFA069] border border-[#FFA069]/40 font-bold">
                    PAYROLL
                  </span>
                )}
              </div>
              <div className={`text-2xl font-black font-mono mt-1 ${isFinancialOrLast ? 'text-[#FFA069] drop-shadow-[0_0_10px_rgba(255,160,105,0.4)]' : metric.color}`}>
                {metric.getValue(dataProps)}
              </div>
              <div className="text-[10px] text-neutral-400 font-mono mt-0.5 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isFinancialOrLast ? 'bg-[#FFA069] shadow-[0_0_6px_#FFA069]' : 'bg-[#C7F238] shadow-[0_0_6px_#C7F238]'}`} />
                <span>{metric.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Geofence Perimeters & Real-Time Punch Map */}
      <InteractiveGeofenceMap tenantName={tenantName} />

      {/* Industry-Specific Specialized Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Specialized Workflows & Status */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* SPECIALIZED INDUSTRY PANEL 1: Factory & Manufacturing */}
          {industry.id === 'factory' && (
            <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Activity className="w-4 h-4 text-[#E6FF00] drop-shadow-[0_0_6px_#E6FF00]" />
                  <span>Production Bay &amp; Factory Gates Real-Time Telemetry</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold backdrop-blur-md shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  LOCAL AGENT ONLINE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-mono">GATE 1 - NORTH TURNSTILE</div>
                  <div className="text-sm font-bold text-white mt-1">42 Punches / min</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Zero Queue Delay</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-mono">GATE 2 - LOGISTICS DOCK</div>
                  <div className="text-sm font-bold text-white mt-1">Contractors Active</div>
                  <div className="text-[10px] text-[#E6FF00] font-mono">OSHA PPE Checked</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-mono">PLANT SHIFT HANDOVER</div>
                  <div className="text-sm font-bold text-white mt-1">16:00 Handover Ready</div>
                  <div className="text-[10px] text-sky-400 font-mono">Supervisor Quorum Met</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-xs text-neutral-300 flex items-center justify-between">
                <span>Contractor Agency Workforce: 18 temporary operators registered today.</span>
                <button
                  onClick={() => onNavigate('employees')}
                  className="text-[#E6FF00] font-bold hover:underline cursor-pointer"
                >
                  View Agency Roster &rarr;
                </button>
              </div>
            </div>
          )}

          {/* SPECIALIZED INDUSTRY PANEL 2: Mall & Retail */}
          {industry.id === 'mall' && (
            <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <ShoppingBag className="w-4 h-4 text-sky-400 drop-shadow-[0_0_6px_#38bdf8]" />
                  <span>Tenant Outlets &amp; Retail Staffing Coverage</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 font-bold backdrop-blur-md shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                  14 / 15 STORES ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Zara Flagship Outlet (Level 1)', staff: '12 / 12 Staff Present', openStatus: 'OPEN ON SCHEDULE (10:00 AM)', color: 'text-emerald-400' },
                  { name: 'Apple Store & Genius Bar (Level 2)', staff: '18 / 18 Staff Present', openStatus: 'OPEN ON SCHEDULE (09:45 AM)', color: 'text-emerald-400' },
                  { name: 'Food Court Central Cashiers (Level 3)', staff: '24 / 26 Staff Present', openStatus: '2 RELIEF GUARDS DISPATCHED', color: 'text-amber-400' }
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-xs shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:bg-white/[0.06] transition-colors">
                    <div>
                      <div className="font-bold text-white">{s.name}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{s.staff}</div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${s.color}`}>
                      {s.openStatus}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-xs text-neutral-300 flex items-center justify-between">
                <span>Mall Security &amp; Concierge: 8 Entrance checkpoint turnstiles reporting live telemetry.</span>
                <button
                  onClick={() => onNavigate('camera_settings')}
                  className="text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  Manage Entrance Cameras &rarr;
                </button>
              </div>
            </div>
          )}

          {/* SPECIALIZED INDUSTRY PANEL 3: Hospital & Healthcare */}
          {industry.id === 'hospital' && (
            <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <HeartPulse className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_6px_#34d399]" />
                  <span>Clinical Department &amp; Ward Duty Roster</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold backdrop-blur-md shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  24/7 CLINICAL COVERAGE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-mono">EMERGENCY / TRAUMA</div>
                  <div className="text-sm font-bold text-white mt-1">4 Physicians &middot; 8 Nurses</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Shift Handover Completed</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-mono">INTENSIVE CARE UNIT (ICU)</div>
                  <div className="text-sm font-bold text-white mt-1">1:2 Dedicated Nurse Ratio</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Biometric Scrub-In Verified</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-mono">SURGERY THEATRE SUITE</div>
                  <div className="text-sm font-bold text-white mt-1">3 Surgical Teams Active</div>
                  <div className="text-[10px] text-purple-400 font-mono">Sterile Zone RFID Active</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-xs text-neutral-300 flex items-center justify-between">
                <span>Physician On-Call Standby: Trauma specialists available for emergency dispatch.</span>
                <button
                  onClick={() => onNavigate('departments')}
                  className="text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  Ward Assignments &rarr;
                </button>
              </div>
            </div>
          )}

          {/* SPECIALIZED INDUSTRY PANEL 4: Education (School / College / Coaching) */}
          {(industry.id === 'school' || industry.id === 'college' || industry.id === 'coaching') && (
            <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <GraduationCap className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_#fbbf24]" />
                  <span>Academic Faculty, Timetables &amp; Campus Perimeter</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold backdrop-blur-md shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                  CAMPUS GATES ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-mono">MORNING TIMETABLE BELL</div>
                  <div className="text-sm font-bold text-white mt-1">100% Period 1 Covered</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Zero Teacher Shortage</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-mono">CAMPUS GATE TURNS</div>
                  <div className="text-sm font-bold text-white mt-1">Safe Child Turnstiles</div>
                  <div className="text-[10px] text-[#E6FF00] font-mono">RFID Badging Online</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-mono">SUBSTITUTE ROSTER</div>
                  <div className="text-sm font-bold text-white mt-1">3 On-Call Substitutes</div>
                  <div className="text-[10px] text-sky-400 font-mono">Auto-Allocated for Leave</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-xs text-neutral-300 flex items-center justify-between">
                <span>Classroom Attendance Synchronization: Teacher check-ins verified against timetable shifts.</span>
                <button
                  onClick={() => onNavigate('work_policy')}
                  className="text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  Timetable Shift Rules &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Configurable Workflows Bar with Frosted Glass */}
          <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-4">
            <div className="text-sm font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#E6FF00] drop-shadow-[0_0_6px_#E6FF00]" />
                Specialized {industry.shortName} Operational Workflows
              </span>
              <span className="text-[11px] font-mono text-neutral-400">Integrated Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {industry.workflows.map((wf) => (
                <div
                  key={wf.id}
                  onClick={() => onNavigate(wf.targetTab)}
                  className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#FFA069]/50 hover:bg-white/[0.07] transition-all cursor-pointer group space-y-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white group-hover:text-[#FFA069] transition-colors">
                      {wf.label}
                    </div>
                    {wf.badge && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-[#FFA069] border border-orange-500/30">
                        {wf.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-2">{wf.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Live Edge CCTV & Incident Alerts */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active AI Safety Alerts for this Industry */}
          <div className="p-5 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <ShieldAlert className="w-4 h-4 text-red-400 drop-shadow-[0_0_6px_#f87171]" />
                <span>{industry.shortName} Safety Stream</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 font-bold backdrop-blur-md shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                LIVE AI
              </span>
            </div>

            <div className="space-y-2">
              {industry.sampleAlerts.map((alertText, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-xs space-y-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                    <span>EVENT #{9020 + i}</span>
                  </div>
                  <p className="text-neutral-200 font-medium">{alertText}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('ai_alerts')}
              className="w-full py-2.5 rounded-2xl text-xs font-bold glass-button hover:border-[#FFA069]/40 text-neutral-200 transition-colors cursor-pointer"
            >
              Full Security Ledger &rarr;
            </button>
          </div>

          {/* Connected Cameras Widget with Frosted Glass */}
          <div className="p-5 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Camera className="w-4 h-4 text-[#E6FF00] drop-shadow-[0_0_6px_#E6FF00]" />
                <span>Edge RTSP Nodes ({cameras.length})</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% ONLINE</span>
              </span>
            </div>

            <div className="space-y-2">
              {cameras.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="p-2.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-between text-xs shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  <div className="truncate">
                    <div className="font-bold text-white truncate">{c.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{c.location}</div>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                    25 FPS
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('multi_camera')}
              className="w-full py-2.5 rounded-2xl text-xs font-bold glass-button hover:border-[#E6FF00]/40 text-neutral-200 transition-colors cursor-pointer"
            >
              Open 6x Multi-Camera Grid &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
