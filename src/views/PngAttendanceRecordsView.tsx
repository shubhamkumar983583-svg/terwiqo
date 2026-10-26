import React, { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { AttendanceRecord } from '../data/mockData.ts';

interface PngAttendanceRecordsViewProps {
  records: AttendanceRecord[];
}

export const PngAttendanceRecordsView: React.FC<PngAttendanceRecordsViewProps> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchId, setSearchId] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // Filter records
  const filtered = records.filter((r) => {
    const matchesName = !searchTerm || r.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesId = !searchId || r.employeeId.includes(searchId);
    const matchesStatus = statusFilter === 'All' || statusFilter === 'Status' || r.status === statusFilter;
    return matchesName && matchesId && matchesStatus;
  });

  const exportCsv = () => {
    const headers = 'Name,Employee ID,Date,Status,First In,Last Out,Total Hours,Overtime\n';
    const rows = filtered
      .map(
        (r) =>
          `"${r.employeeName}","${r.employeeId}","${r.date}","${r.status}","${r.firstIn}","${r.lastOut}","${r.totalHours}","${r.overtime}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_records_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none">
      {/* Top Title: Student Attendance Records / Employee Attendance Records */}
      <div className="text-center pt-2">
        <h2 className="text-3xl font-extrabold text-sky-600 tracking-tight">
          Employee Attendance Records
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Total Attendance Records: <span className="font-bold text-white font-mono">{filtered.length}</span>
        </p>
      </div>

      {/* Filter and Search Bar matching screenshot 7 */}
      <div className="p-4 bg-white rounded-2xl shadow-xl border border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-neutral-900">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search by Name */}
          <div className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for employees..."
              className="px-3 py-2 text-xs border border-neutral-300 rounded-l-lg focus:outline-none focus:border-sky-500 w-44"
            />
            <button className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-r-lg text-xs font-semibold flex items-center gap-1 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>

          {/* Search by ID */}
          <div className="flex items-center">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Search by Emp ID"
              className="px-3 py-2 text-xs border border-neutral-300 rounded-l-lg focus:outline-none focus:border-sky-500 w-36"
            />
            <button className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-r-lg text-xs font-semibold flex items-center gap-1 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Emp ID</span>
            </button>
          </div>

          {/* Status Dropdown matching screenshot 7 */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-800 font-semibold focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="All">Select Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
            <option value="Holiday">Holiday</option>
          </select>

          {/* Date Picker */}
          <div className="flex items-center">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-2.5 py-2 text-xs border border-neutral-300 rounded-l-lg bg-neutral-50 text-neutral-800 focus:outline-none"
            />
            <button className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-r-lg text-xs font-semibold flex items-center gap-1 transition-colors">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* CSV Export Button & Total count matching screenshot 7 */}
        <div className="flex items-center gap-4">
          <button
            onClick={exportCsv}
            className="px-4 py-2 bg-[#22C55E] hover:bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          <div className="text-xs font-black text-neutral-800 font-mono">
            Total: {filtered.length}
          </div>
        </div>
      </div>

      {/* Attendance Table matching screenshot 7 */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-600 text-white text-xs font-bold tracking-wider uppercase">
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">EMPLOYEE ID</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">FIRST IN</th>
                <th className="py-3 px-4">LAST OUT</th>
                <th className="py-3 px-4">TOTAL HOURS</th>
                <th className="py-3 px-4">OVERTIME</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-neutral-200 bg-white text-neutral-800">
              {filtered.map((rec) => (
                <tr key={rec.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-neutral-900 whitespace-nowrap">
                    {rec.employeeName}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-neutral-600">
                    {rec.employeeId}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-neutral-700">
                    {rec.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-2xs ${
                          rec.status === 'Present'
                            ? 'bg-[#22C55E]'
                            : rec.status === 'Absent'
                            ? 'bg-red-500'
                            : 'bg-neutral-400'
                        }`}
                      >
                        {rec.status}
                      </span>
                      {rec.isLate && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                          Late
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-600">{rec.firstIn}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-600">{rec.lastOut}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-700">{rec.totalHours}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-500">{rec.overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
