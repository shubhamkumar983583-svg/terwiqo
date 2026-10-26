import React, { useState } from 'react';
import { Plus, Umbrella, Check } from 'lucide-react';
import { HolidayRequest, INITIAL_HOLIDAYS } from '../data/mockData.ts';

export const PngHolidaysView: React.FC = () => {
  const [holidays, setHolidays] = useState<HolidayRequest[]>(INITIAL_HOLIDAYS);
  const [isCreating, setIsCreating] = useState(false);
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('Feb. 15, 2026');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!holidayName) return;
    const item: HolidayRequest = {
      id: String(Date.now()),
      name: holidayName,
      date: holidayDate,
      employees: 'All Employees',
      status: 'Approved'
    };
    setHolidays([...holidays, item]);
    setHolidayName('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-white select-none">
      {/* Title & Create Button */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide inline-flex items-center gap-2">
          <span>📅</span>
          <span>Holiday Requests</span>
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Holiday</span>
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="p-4 bg-[#121829] rounded-2xl border border-neutral-700 flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={holidayName}
            onChange={(e) => setHolidayName(e.target.value)}
            placeholder="Holiday Name (e.g. National Day)"
            required
            className="px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
          />
          <input
            type="text"
            value={holidayDate}
            onChange={(e) => setHolidayDate(e.target.value)}
            required
            className="px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#22C55E] text-white font-bold text-xs rounded-lg"
          >
            Add Holiday
          </button>
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="px-3 py-2 text-xs text-neutral-400 hover:text-white"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Table with Green Header matching screenshot 8 */}
      <div className="bg-[#121829] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#48BB78] text-white text-xs font-bold tracking-wider uppercase">
                <th className="py-3 px-4 w-12">#</th>
                <th className="py-3 px-4">HOLIDAY NAME</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4">EMPLOYEE(S)</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-neutral-800 bg-[#0C1222] text-neutral-200">
              {holidays.map((hol, index) => (
                <tr key={hol.id} className="hover:bg-[#161F36] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-neutral-400">{index + 1}</td>
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">{hol.name}</td>
                  <td className="py-3.5 px-4 font-medium text-neutral-300">{hol.date}</td>
                  <td className="py-3.5 px-4 text-neutral-300 max-w-md truncate">{hol.employees}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-3 py-0.5 rounded-md text-[11px] font-bold text-[#22C55E] border border-[#22C55E] bg-emerald-950/40">
                      {hol.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-neutral-500">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer reference matching screenshot 8 */}
      <div className="pt-8 text-center text-xs text-neutral-500 font-mono space-y-1">
        <div>&copy; Face Recognition Attendance System | <span className="text-sky-400 cursor-pointer">Visit Website</span></div>
        <div>asifkhanhdn75@gmail.com | 09525845873</div>
        <div className="text-[11px] text-neutral-600">Version 3.0</div>
      </div>
    </div>
  );
};
