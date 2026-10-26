import React, { useState } from 'react';
import { Check, Video, RefreshCw, UserCheck, Sparkles, ShieldCheck } from 'lucide-react';
import { Employee, AttendanceRecord } from '../data/mockData.ts';

interface PngLiveAttendanceViewProps {
  employees: Employee[];
  onRecordPunch: (record: AttendanceRecord) => void;
}

export const PngLiveAttendanceView: React.FC<PngLiveAttendanceViewProps> = ({
  employees,
  onRecordPunch
}) => {
  const [selectedEmp, setSelectedEmp] = useState<Employee>(employees[0]);
  const [punchState, setPunchState] = useState<'idle' | 'success' | 'already'>('idle');
  const [lastPunchTime, setLastPunchTime] = useState('12/21/2024, 11:46:37 AM');

  const handleSimulatePunch = () => {
    const now = new Date();
    const formatted = now.toLocaleString();
    setLastPunchTime(formatted);
    setPunchState('success');

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      employeeName: selectedEmp.name,
      employeeId: selectedEmp.employeeId,
      date: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Present',
      isLate: false,
      firstIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      lastOut: '-',
      totalHours: '08:00:00',
      overtime: '00:00:00'
    };

    onRecordPunch(newRecord);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-white select-none">
      {/* Title matching screenshot 5: Multiple Face Attendance System */}
      <div className="text-center pt-2">
        <h2 className="text-2xl font-black text-[#FACC15] tracking-tight">
          Multiple Face Attendance System
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Real-time Edge Camera Biometric Ingestion & Instant Ledger Punch
        </p>
      </div>

      {/* Circular video / employee face scanner crop with cyan/sky radar ring */}
      <div className="relative w-44 h-44 mx-auto rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-sky-500 to-[#E6FF00] shadow-[0_0_25px_rgba(56,189,248,0.3)] overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
          alt="Face Scanning"
          className="w-full h-full object-cover rounded-full"
        />
        <div className="absolute inset-0 border-4 border-cyan-400/70 rounded-full animate-pulse" />
        <div className="absolute bottom-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] font-mono text-[#E6FF00] font-bold border border-[#E6FF00]/40">
          MATCH 99.8%
        </div>
      </div>

      {/* Attendance Check Card - Exact match with screenshot 5 styled for PNG dark theme */}
      <div className="bg-[#101524] rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-800 text-center space-y-4">
        {/* Big Green Checkmark inside circle */}
        <div className="w-16 h-16 mx-auto rounded-full border-4 border-[#22C55E] flex items-center justify-center text-[#22C55E] shadow-sm bg-emerald-500/10">
          <Check className="w-10 h-10 stroke-[3.5]" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-white">
            {selectedEmp.name}
          </h3>
          <div className="text-xs font-semibold text-emerald-400">
            {punchState === 'idle' ? 'Already checked-in' : 'Checked In Successfully!'}
          </div>
          <div className="text-xs text-neutral-400 font-mono pt-1">
            Check-in: <span className="font-semibold text-white">{lastPunchTime}</span>
          </div>
          <div className="text-xs text-neutral-500 font-mono">
            Check-out: <span className="text-neutral-500">-</span>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
          <button
            onClick={handleSimulatePunch}
            className="w-full py-2.5 px-4 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Trigger Biometric Clock In
          </button>

          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-neutral-400">
            <span>Simulate Face:</span>
            <select
              value={selectedEmp.id}
              onChange={(e) => {
                const f = employees.find((x) => x.id === e.target.value);
                if (f) setSelectedEmp(f);
              }}
              className="px-2.5 py-1 bg-[#0B0E1B] border border-neutral-700 text-white rounded-md text-xs font-semibold cursor-pointer focus:border-[#E6FF00]"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
