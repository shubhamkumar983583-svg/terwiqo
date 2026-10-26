import React from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRightCircle,
  ArrowLeftCircle,
  Video,
  TrendingUp,
  AlertTriangle,
  QrCode
} from 'lucide-react';
import { Employee, AttendanceRecord, CameraConfig } from '../data/mockData.ts';

interface PngDashboardViewProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
  cameras: CameraConfig[];
  onNavigate: (tab: any) => void;
}

export const PngDashboardView: React.FC<PngDashboardViewProps> = ({
  employees,
  attendance,
  cameras,
  onNavigate
}) => {
  const totalEmployees = employees.length;
  const presentCount = attendance.filter((a) => a.status === 'Present').length;
  const absentCount = attendance.filter((a) => a.status === 'Absent').length;
  const lateCount = attendance.filter((a) => a.isLate).length;
  const activeCameras = cameras.filter((c) => c.status === 'Active').length;

  return (
    <div className="space-y-8 select-none">
      {/* Top Banner Header: Yellow title matching PNG 1 & 4 */}
      <div className="text-center pt-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FACC15] tracking-wide inline-flex items-center gap-3">
          <span>Face Recognition Attendance System</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Automated Biometric CCTV Edge Surveillance & Workforce Attendance Ledger
        </p>
      </div>

      {/* Pill Stat Cards Grid - Exact match with screenshot 1 & 4 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {/* Card 1: Total Employees */}
        <div
          onClick={() => onNavigate('employees')}
          className="bg-[#121829]/90 hover:bg-[#161F36] border border-neutral-800/80 rounded-full px-5 py-3 flex items-center justify-center gap-3 shadow-lg cursor-pointer transition-all transform hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 text-[#FACC15] flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div className="text-center">
            <div className="text-[11px] font-bold text-neutral-300">Total Employees</div>
            <div className="text-xl font-black text-white font-mono">{totalEmployees}</div>
          </div>
        </div>

        {/* Card 2: Present */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-[#121829]/90 hover:bg-[#161F36] border border-neutral-800/80 rounded-full px-5 py-3 flex items-center justify-center gap-3 shadow-lg cursor-pointer transition-all transform hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 text-[#FACC15] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div className="text-center">
            <div className="text-[11px] font-bold text-neutral-300">Present</div>
            <div className="text-xl font-black text-white font-mono">{presentCount}</div>
          </div>
        </div>

        {/* Card 3: Absent */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-[#121829]/90 hover:bg-[#161F36] border border-neutral-800/80 rounded-full px-5 py-3 flex items-center justify-center gap-3 shadow-lg cursor-pointer transition-all transform hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 text-[#FACC15] flex items-center justify-center shrink-0">
            <XCircle className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div className="text-center">
            <div className="text-[11px] font-bold text-neutral-300">Absent</div>
            <div className="text-xl font-black text-white font-mono">{absentCount}</div>
          </div>
        </div>

        {/* Card 4: Late Check-Ins */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-[#121829]/90 hover:bg-[#161F36] border border-neutral-800/80 rounded-full px-5 py-3 flex items-center justify-center gap-3 shadow-lg cursor-pointer transition-all transform hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 text-[#FACC15] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div className="text-center">
            <div className="text-[11px] font-bold text-neutral-300">Late Check-Ins</div>
            <div className="text-xl font-black text-white font-mono">{lateCount}</div>
          </div>
        </div>

        {/* Card 5: Check-Ins */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-[#121829]/90 hover:bg-[#161F36] border border-neutral-800/80 rounded-full px-5 py-3 flex items-center justify-center gap-3 shadow-lg cursor-pointer transition-all transform hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 text-[#FACC15] flex items-center justify-center shrink-0">
            <ArrowRightCircle className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div className="text-center">
            <div className="text-[11px] font-bold text-neutral-300">Check-Ins</div>
            <div className="text-xl font-black text-white font-mono">7</div>
          </div>
        </div>

        {/* Card 6: Check-Outs */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-[#121829]/90 hover:bg-[#161F36] border border-neutral-800/80 rounded-full px-5 py-3 flex items-center justify-center gap-3 shadow-lg cursor-pointer transition-all transform hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 text-[#FACC15] flex items-center justify-center shrink-0">
            <ArrowLeftCircle className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div className="text-center">
            <div className="text-[11px] font-bold text-neutral-300">Check-Outs</div>
            <div className="text-xl font-black text-white font-mono">5</div>
          </div>
        </div>

        {/* Card 7: Cameras */}
        <div
          onClick={() => onNavigate('camera_settings')}
          className="col-span-2 bg-[#121829]/90 hover:bg-[#161F36] border border-neutral-800/80 rounded-full px-5 py-3 flex items-center justify-center gap-3 shadow-lg cursor-pointer transition-all transform hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 text-[#FACC15] flex items-center justify-center shrink-0">
            <Video className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div className="text-center">
            <div className="text-[11px] font-bold text-neutral-300">Active Cameras</div>
            <div className="text-xl font-black text-white font-mono">{activeCameras}</div>
          </div>
        </div>
      </div>

      {/* Charts Section: Exact match with screenshot 1 & 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto pt-4">
        {/* Left: Bar Chart - Attendance Metrics (Counts) */}
        <div className="bg-[#101524] rounded-2xl p-5 border border-neutral-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-300 tracking-wide">
              Bar Chart - Attendance Metrics (Counts)
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="w-3 h-3 bg-[#38BDF8] rounded-xs inline-block" />
              <span>Total Count</span>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-56 w-full flex items-end justify-around pt-6 pb-2 border-b border-neutral-800">
            {/* Bar 1: Employees */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">6</span>
              <div className="w-12 bg-[#38BDF8] rounded-t-md h-5/6 transition-all duration-300 hover:brightness-110" />
              <span className="text-[10px] text-neutral-400">Total</span>
            </div>

            {/* Bar 2: Present */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">1</span>
              <div className="w-12 bg-[#38BDF8]/60 rounded-t-md h-1/6 transition-all duration-300 hover:brightness-110" />
              <span className="text-[10px] text-neutral-400">Present</span>
            </div>

            {/* Bar 3: Check-Ins */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">7</span>
              <div className="w-12 bg-neutral-300 rounded-t-md h-full transition-all duration-300 hover:brightness-110" />
              <span className="text-[10px] text-neutral-400">Check-Ins</span>
            </div>

            {/* Bar 4: Check-Outs */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">5</span>
              <div className="w-12 bg-neutral-400 rounded-t-md h-4/6 transition-all duration-300 hover:brightness-110" />
              <span className="text-[10px] text-neutral-400">Check-Outs</span>
            </div>

            {/* Bar 5: Late */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">2</span>
              <div className="w-12 bg-amber-400/80 rounded-t-md h-2/6 transition-all duration-300 hover:brightness-110" />
              <span className="text-[10px] text-neutral-400">Late</span>
            </div>
          </div>
        </div>

        {/* Right: Line Chart - Attendance Percent Trend */}
        <div className="bg-[#101524] rounded-2xl p-5 border border-neutral-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-300 tracking-wide">
              Line Chart - Attendance Percent Trend
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="w-3 h-1 bg-[#3B82F6] rounded-xs inline-block" />
              <span>Percentage (%)</span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="h-56 w-full relative flex items-center justify-center">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[9px] font-mono text-neutral-600 pointer-events-none">
              <div className="border-b border-neutral-800/60 pb-0.5">100%</div>
              <div className="border-b border-neutral-800/60 pb-0.5">90%</div>
              <div className="border-b border-neutral-800/60 pb-0.5">80%</div>
              <div className="border-b border-neutral-800/60 pb-0.5">70%</div>
              <div>60%</div>
            </div>

            {/* Simulated Trend Polyline */}
            <svg className="w-full h-full relative z-10 pt-4" viewBox="0 0 300 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 10 70 Q 60 20 110 50 T 210 30 T 290 40 L 290 120 L 10 120 Z"
                fill="url(#trendGradient)"
              />
              <path
                d="M 10 70 Q 60 20 110 50 T 210 30 T 290 40"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="10" cy="70" r="4" fill="#60A5FA" />
              <circle cx="110" cy="50" r="4" fill="#60A5FA" />
              <circle cx="210" cy="30" r="4" fill="#60A5FA" />
              <circle cx="290" cy="40" r="4" fill="#60A5FA" />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Launch Bottom Bar matching screenshot 6 */}
      <div className="max-w-6xl mx-auto p-4 bg-[#101524] rounded-2xl border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-neutral-300">
            System Live: Seamlessly mark attendance using web or IP cameras.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('live')}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-[#E6FF00] text-black hover:bg-yellow-300 transition-colors shadow-xs cursor-pointer"
          >
            Start Face Attendance
          </button>
          <button
            onClick={() => onNavigate('qr_audit')}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-[#121829] border border-neutral-700 text-white hover:bg-[#161F36] hover:border-[#E6FF00] hover:text-[#E6FF00] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Audit Log</span>
          </button>
          <button
            onClick={() => onNavigate('roi_settings')}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            Configure Camera ROI
          </button>
        </div>
      </div>
    </div>
  );
};
