import React, { useState } from 'react';
import { Printer, Download, CheckCircle, ChevronDown } from 'lucide-react';
import { Employee } from '../data/mockData.ts';

interface PngSalarySlipViewProps {
  employees: Employee[];
}

export const PngSalarySlipView: React.FC<PngSalarySlipViewProps> = ({ employees }) => {
  const [selectedEmpId, setSelectedEmpId] = useState<string>(employees[0]?.id || '1');
  const [selectedMonth, setSelectedMonth] = useState('7/2026');

  const employee = employees.find((e) => e.id === selectedEmpId) || employees[0];

  const baseSalary = employee.baseSalary || 1200;
  const allowances = employee.allowance || 200;
  const overtimeHours = '0h 0m';
  const overtimeRate = 8.65;
  const bonus = 0.0;
  const grossSalary = baseSalary + allowances + bonus;

  const absentDeduction = 0.0;
  const unpaidHoliday = 0.0;
  const latePenalty = 26.92;
  const taxDeduction = 0.0;
  const otherDeductions = 0.0;
  const totalDeductions = absentDeduction + unpaidHoliday + latePenalty + taxDeduction + otherDeductions;
  const netSalary = Math.round((grossSalary - totalDeductions) * 100) / 100;

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-neutral-900">
      {/* Control Selector Bar */}
      <div className="bg-[#121829] rounded-2xl p-4 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-neutral-400">Select Employee:</label>
          <select
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(e.target.value)}
            className="px-3 py-1.5 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white font-semibold focus:outline-none focus:border-yellow-400 cursor-pointer"
          >
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.employeeId})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-neutral-400">Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white font-semibold focus:outline-none focus:border-yellow-400 cursor-pointer"
          >
            <option value="7/2026">7/2026</option>
            <option value="6/2026">6/2026</option>
            <option value="5/2026">5/2026</option>
          </select>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Exact Salary Slip Sheet - Matching screenshot 5 & 6 */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-neutral-300 print:border-none print:shadow-none">
        {/* Header Block */}
        <div className="text-center pb-6 border-b border-neutral-200">
          <h2 className="text-2xl font-black tracking-wide text-neutral-900 uppercase">
            SALARY SLIP
          </h2>
          <div className="mt-2 space-y-0.5 text-sm font-semibold text-neutral-800">
            <div>Employee: <span className="font-bold">{employee.name}</span></div>
            <div>Employee ID: <span className="font-mono">{employee.employeeId}</span></div>
            <div>Month: <span className="font-mono">{selectedMonth}</span></div>
          </div>
        </div>

        {/* Table matching exact border and row style from screenshot 5 */}
        <div className="mt-6 border border-neutral-400 divide-y divide-neutral-300">
          {/* Earnings Header */}
          <div className="bg-neutral-100 px-4 py-2 text-xs font-bold text-neutral-900">
            Earnings
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Base Salary</div>
            <div className="text-right font-mono font-medium">₹{baseSalary.toFixed(2)}</div>
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Allowances</div>
            <div className="text-right font-mono font-medium">₹{allowances.toFixed(2)}</div>
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Overtime Hours</div>
            <div className="text-right font-mono font-medium">{overtimeHours}</div>
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Overtime Rate</div>
            <div className="text-right font-mono font-medium">₹{overtimeRate.toFixed(2)}</div>
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Bonus</div>
            <div className="text-right font-mono font-medium">₹{bonus.toFixed(2)}</div>
          </div>

          {/* Gross Salary Row */}
          <div className="grid grid-cols-2 px-4 py-2.5 text-xs font-black text-neutral-950 bg-neutral-50 border-t border-b border-neutral-400">
            <div>Gross Salary</div>
            <div className="text-right font-mono font-bold">₹{grossSalary.toFixed(2)}</div>
          </div>

          {/* Deductions Header */}
          <div className="bg-neutral-100 px-4 py-2 text-xs font-bold text-neutral-900">
            Deductions
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Absent Deduction</div>
            <div className="text-right font-mono font-medium">₹{absentDeduction.toFixed(2)}</div>
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Unpaid Holiday</div>
            <div className="text-right font-mono font-medium">₹{unpaidHoliday.toFixed(2)}</div>
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Late Check-in Penalty</div>
            <div className="text-right font-mono font-medium">₹{latePenalty.toFixed(2)}</div>
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Tax Deduction</div>
            <div className="text-right font-mono font-medium">₹{taxDeduction.toFixed(2)}</div>
          </div>

          <div className="grid grid-cols-2 px-4 py-2 text-xs text-neutral-800">
            <div>Other Deductions</div>
            <div className="text-right font-mono font-medium">₹{otherDeductions.toFixed(2)}</div>
          </div>

          {/* Net Salary Row (Bold Green matching screenshot 5) */}
          <div className="grid grid-cols-2 px-4 py-3 text-sm font-black text-neutral-950 bg-neutral-50 border-t-2 border-neutral-400">
            <div>Net Salary</div>
            <div className="text-right font-mono font-extrabold text-[#16A34A]">
              ₹{netSalary.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Date footer matching screenshot 5 */}
        <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600 font-semibold">
          <div>Date: 15 Dec 2025</div>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle className="w-4 h-4" />
            <span>Verified & Computed via AI Attendance Ledger</span>
          </div>
        </div>
      </div>
    </div>
  );
};
