import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const PngDepartmentsView: React.FC = () => {
  const [departments, setDepartments] = useState<string[]>([
    'IT',
    'Operations',
    'Security & Gate',
    'HR & Admin'
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [deptName, setDeptName] = useState('');
  const [editingDept, setEditingDept] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  const handleStartEdit = (dept: string) => {
    setEditingDept(dept);
    setEditedName(dept);
  };

  const handleSaveEdit = (oldName: string) => {
    if (!editedName.trim()) return;
    setDepartments(departments.map((d) => (d === oldName ? editedName.trim() : d)));
    setEditingDept(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptName) return;
    setDepartments([...departments, deptName]);
    setDeptName('');
    setIsAdding(false);
  };

  const handleDelete = (name: string) => {
    setDepartments(departments.filter((d) => d !== name));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-white select-none">
      {/* Title & Add Department Button matching screenshot 6 */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
          Departments
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Department</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="p-4 bg-[#121829] rounded-2xl border border-neutral-700 flex items-center gap-3">
          <input
            type="text"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            placeholder="Department Name"
            required
            className="px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#22C55E] text-white font-bold text-xs rounded-lg"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-3 py-2 text-xs text-neutral-400 hover:text-white"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Table with Green Header matching screenshot 6 */}
      <div className="bg-[#121829] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#48BB78] text-white text-xs font-bold tracking-wider uppercase">
              <th className="py-3 px-6 text-center">DEPARTMENT</th>
              <th className="py-3 px-6 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-neutral-800 bg-[#0C1222] text-neutral-200">
            {departments.map((dept) => (
              <tr key={dept} className="hover:bg-[#161F36] transition-colors">
                <td className="py-5 px-6 font-bold text-white text-center text-sm">
                  {editingDept === dept ? (
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="px-2.5 py-1 bg-black border border-indigo-500 rounded-md text-xs text-white"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(dept)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingDept(null)}
                        className="px-2 py-1 text-neutral-400 hover:text-white text-[11px]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    dept
                  )}
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="inline-flex items-center gap-3">
                    <button
                      onClick={() => handleStartEdit(dept)}
                      className="w-10 h-8 rounded-lg bg-[#2D3748] hover:bg-neutral-600 flex items-center justify-center text-amber-400 cursor-pointer transition-colors"
                      title="Edit Department"
                    >
                      <Edit2 className="w-4 h-4 text-amber-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(dept)}
                      className="w-10 h-8 rounded-lg bg-[#2D3748] hover:bg-red-900/60 flex items-center justify-center text-red-500 cursor-pointer transition-colors"
                      title="Delete Department"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer reference matching screenshot 6 */}
      <div className="pt-8 text-center text-xs text-neutral-500 font-mono space-y-1">
        <div>&copy; Face Recognition Attendance System | <span className="text-sky-400 cursor-pointer">Visit Website</span></div>
        <div>asifkhanhdn75@gmail.com | 09525845873</div>
        <div className="text-[11px] text-neutral-600">Version 3.0</div>
      </div>
    </div>
  );
};
