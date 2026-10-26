import React, { useState } from 'react';
import { Plus, ShieldAlert, FileText, Check } from 'lucide-react';
import { WorkPolicy, INITIAL_POLICIES } from '../data/mockData.ts';

export const PngWorkPoliciesView: React.FC = () => {
  const [policies, setPolicies] = useState<WorkPolicy[]>(INITIAL_POLICIES);
  const [isAdding, setIsAdding] = useState(false);
  const [newEmployee, setNewEmployee] = useState('');

  const handleAddPolicy = () => {
    if (!newEmployee) return;
    const added: WorkPolicy = {
      id: `pol-${Date.now()}`,
      employee: newEmployee,
      workingDays: 26,
      hours: 8.0,
      presentHours: 8.0,
      halfDay: 1.0,
      weeklyOff: '—',
      absentPolicy: '1.00 Day Salary',
      latePolicy: '0.50 Day Salary',
      grace: '10 Min',
      allowedLate: 0
    };
    setPolicies([...policies, added]);
    setNewEmployee('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-white select-none">
      {/* Title matching screenshot 7 */}
      <div className="text-center pt-2">
        <h2 className="text-3xl font-black text-white tracking-wide">
          Employee Work Policies
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Configure working days, grace period tolerances, and salary deduction rules.
        </p>
      </div>

      {/* Add Policy Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsAdding(true)}
          className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Policy</span>
        </button>
      </div>

      {/* Add Policy Drawer/Input */}
      {isAdding && (
        <div className="p-4 bg-[#121829] rounded-2xl border border-neutral-700 flex items-center gap-3">
          <input
            type="text"
            value={newEmployee}
            onChange={(e) => setNewEmployee(e.target.value)}
            placeholder="Employee Name (e.g. John Doe)"
            className="px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
          />
          <button
            onClick={handleAddPolicy}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg"
          >
            Save Policy
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="px-3 py-2 text-xs text-neutral-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Table matching screenshot 7 */}
      <div className="bg-[#121829] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#101D38] text-sky-400 text-xs font-bold tracking-wider uppercase border-b border-neutral-800">
                <th className="py-3.5 px-4">EMPLOYEE</th>
                <th className="py-3.5 px-4">WORKING DAYS</th>
                <th className="py-3.5 px-4">HOURS</th>
                <th className="py-3.5 px-4">PRESENT HOURS</th>
                <th className="py-3.5 px-4">HALF DAY</th>
                <th className="py-3.5 px-4">WEEKLY OFF</th>
                <th className="py-3.5 px-4">ABSENT POLICY</th>
                <th className="py-3.5 px-4">LATE POLICY</th>
                <th className="py-3.5 px-4">GRACE</th>
                <th className="py-3.5 px-4">ALLOWED LATE</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-neutral-800/80 bg-[#0C1222] text-neutral-200">
              {policies.map((pol) => (
                <tr key={pol.id} className="hover:bg-[#161F36] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">{pol.employee}</td>
                  <td className="py-3.5 px-4 font-mono">{pol.workingDays}</td>
                  <td className="py-3.5 px-4 font-mono">{pol.hours.toFixed(2)}</td>
                  <td className="py-3.5 px-4 font-mono">{pol.presentHours.toFixed(2)}</td>
                  <td className="py-3.5 px-4 font-mono">{pol.halfDay.toFixed(2)}</td>
                  <td className="py-3.5 px-4 text-neutral-400">{pol.weeklyOff}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#7F1D1D] text-red-200 border border-red-800">
                      {pol.absentPolicy}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        pol.latePolicy.includes('Day')
                          ? 'bg-[#7F1D1D] text-red-200 border border-red-800'
                          : 'bg-amber-900/60 text-amber-200 border border-amber-700'
                      }`}
                    >
                      {pol.latePolicy}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-300">{pol.grace}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-300">{pol.allowedLate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer reference matching screenshot 7 */}
      <div className="pt-8 text-center text-xs text-neutral-500 font-mono space-y-1">
        <div>&copy; Face Recognition Attendance System | <span className="text-sky-400 cursor-pointer">Visit Website</span></div>
        <div>asifkhanhdn75@gmail.com | 09525845873</div>
        <div className="text-[11px] text-neutral-600">Version 3.0</div>
      </div>
    </div>
  );
};
