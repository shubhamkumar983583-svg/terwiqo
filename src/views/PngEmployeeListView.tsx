import React, { useState } from 'react';
import { User, Check, X, Eye, Plus, Upload, UserPlus } from 'lucide-react';
import { Employee } from '../data/mockData.ts';

interface PngEmployeeListViewProps {
  employees: Employee[];
  onAddEmployee: (emp: Employee) => void;
  onUpdateEmployee: (emp: Employee) => void;
}

export const PngEmployeeListView: React.FC<PngEmployeeListViewProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Registration Form State (Screenshot 3)
  const [formData, setFormData] = useState({
    username: 'Demo',
    password: '••••••',
    fullName: 'Demo',
    email: 'asifkhanhdn75@gmail.com',
    phone: '09693127717',
    employeeId: '5474114',
    department: 'IT',
    address: 'Haidarnagar Bhai bigha paithan toli Near Government urdu sc',
    baseSalary: '1200',
    allowance: '200',
    dob: '1995-05-12',
    joinDate: '2024-01-10'
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp: Employee = {
      id: String(Date.now()),
      name: formData.fullName || formData.username,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      authorized: true,
      employeeId: formData.employeeId,
      baseSalary: Number(formData.baseSalary) || 1200,
      allowance: Number(formData.allowance) || 200,
      joinDate: formData.joinDate,
      address: formData.address
    };

    onAddEmployee(newEmp);
    setIsAddModalOpen(false);
  };

  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden text-neutral-900">
      {statusBanner && (
        <div className="p-3 bg-sky-50 border-b border-sky-200 text-sky-800 text-xs font-semibold flex items-center justify-between">
          <span>{statusBanner}</span>
          <button onClick={() => setStatusBanner(null)} className="text-sky-600 hover:text-sky-950 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Top action bar matching screenshot 2: Add New | Bulk Register */}
      <div className="p-4 sm:p-6 pb-2 flex items-center justify-between border-b border-neutral-100">
        <div className="flex items-center gap-4 text-xs font-bold text-sky-600">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="hover:text-sky-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New</span>
          </button>
          <span>|</span>
          <button
            onClick={() => setStatusBanner('Bulk CSV template loaded: Ready for 50+ employee roster import with biometric embedding hash.')}
            className="hover:text-sky-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Bulk Register</span>
          </button>
        </div>
        <div className="text-xs text-neutral-500 font-medium">
          Total Registered: <span className="font-bold text-neutral-900">{employees.length}</span>
        </div>
      </div>

      {/* Header title: Employe List (matching screenshot 2 exact title) */}
      <div className="text-center py-6 bg-white">
        <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Employe List
        </h2>
      </div>

      {/* Table with distinctive Green Header (matching screenshot 2 & 5) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#48BB78] text-white text-xs font-bold tracking-wider uppercase">
              <th className="py-3 px-4">NAME</th>
              <th className="py-3 px-4">EMAIL</th>
              <th className="py-3 px-4">PHONE NUMBER</th>
              <th className="py-3 px-4">DEPARTMENT</th>
              <th className="py-3 px-4">AUTHORIZED</th>
              <th className="py-3 px-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-neutral-800 bg-[#1A202C] text-neutral-200">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-[#2D3748] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">{emp.name}</td>
                <td className="py-3.5 px-4 text-neutral-300 font-mono">{emp.email}</td>
                <td className="py-3.5 px-4 text-neutral-300 font-mono">{emp.phone}</td>
                <td className="py-3.5 px-4 font-semibold text-neutral-200">{emp.department}</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1 font-bold ${emp.authorized ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {emp.authorized ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => setSelectedEmployee(emp)}
                    className="px-3.5 py-1 text-xs font-semibold rounded-md border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition-all shadow-xs cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: Authorize Employee Modal (Screenshot 2 bottom) */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center text-neutral-900 border border-neutral-200 animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold text-sky-600 mb-4">
              Authorize Employe
            </h3>

            {/* Circular avatar with blue border */}
            <div className="w-24 h-24 mx-auto rounded-full bg-sky-100 border-2 border-sky-400 flex items-center justify-center mb-4 overflow-hidden">
              <User className="w-14 h-14 text-sky-600" />
            </div>

            <div className="space-y-1 mb-5">
              <div className="text-sm font-bold text-neutral-900">
                Name: {selectedEmployee.name}
              </div>
              <div className="text-xs text-neutral-600 font-medium">
                Authorized: <span className="font-bold text-neutral-900">{selectedEmployee.authorized ? 'Yes' : 'No'}</span>
              </div>
              <div className="text-xs text-neutral-500 font-mono">
                ID: {selectedEmployee.employeeId} · Dept: {selectedEmployee.department}
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => {
                  const updated = { ...selectedEmployee, authorized: !selectedEmployee.authorized };
                  setSelectedEmployee(updated);
                  onUpdateEmployee(updated);
                }}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  selectedEmployee.authorized ? 'bg-sky-600' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    selectedEmployee.authorized ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Action buttons matching screenshot 2 */}
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  onUpdateEmployee(selectedEmployee);
                  setSelectedEmployee(null);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-xs cursor-pointer"
              >
                Update Authorization
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="py-2 px-3 rounded-full text-xs font-semibold text-sky-600 border border-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                >
                  Back To List
                </button>
                <button
                  onClick={() => setShowDetailsModal(true)}
                  className="py-2 px-3 rounded-full text-xs font-semibold text-sky-600 border border-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>

              {showDetailsModal && (
                <div className="mt-4 p-4 rounded-xl bg-neutral-900 text-white text-left space-y-2 border border-neutral-700 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <span className="text-xs font-bold text-[#E6FF00]">Employee Dossier</span>
                    <button onClick={() => setShowDetailsModal(false)} className="text-xs text-neutral-400 hover:text-white">✕</button>
                  </div>
                  <div className="text-xs space-y-1 font-mono">
                    <div><span className="text-neutral-400">Full Name:</span> {selectedEmployee.name}</div>
                    <div><span className="text-neutral-400">Email:</span> {selectedEmployee.email}</div>
                    <div><span className="text-neutral-400">Base Salary:</span> ₹{selectedEmployee.baseSalary.toLocaleString()}</div>
                    <div><span className="text-neutral-400">Allowances:</span> ₹{selectedEmployee.allowance.toLocaleString()}</div>
                    <div><span className="text-neutral-400">Department:</span> {selectedEmployee.department}</div>
                    <div><span className="text-neutral-400">Address:</span> {selectedEmployee.address}</div>
                    <div><span className="text-neutral-400">Biometric Status:</span> Enrolled (512-D SHA-256)</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Employee Registration Form (Screenshot 3) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#1A1110] text-neutral-100 rounded-2xl shadow-2xl p-6 sm:p-8 border border-neutral-800 my-8">
            <div className="flex items-center gap-2 mb-6">
              <UserPlus className="w-5 h-5 text-yellow-400" />
              <h3 className="text-xl font-bold text-yellow-400">
                Employee Registration
              </h3>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Username */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs bg-sky-50 text-neutral-900 border border-neutral-300 rounded-lg focus:outline-none font-medium"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs bg-sky-50 text-neutral-900 border border-neutral-300 rounded-lg focus:outline-none font-medium"
                  />
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Department Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-yellow-400/70 rounded-lg text-white focus:outline-none cursor-pointer"
                  >
                    <option value="IT">IT</option>
                    <option value="Operations">Operations</option>
                    <option value="Security">Security</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Base Salary */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Base Salary</label>
                  <input
                    type="number"
                    value={formData.baseSalary}
                    onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Allowance */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Allowance</label>
                  <input
                    type="number"
                    value={formData.allowance}
                    onChange={(e) => setFormData({ ...formData, allowance: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                {/* Joining Date */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Joining Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-neutral-950 bg-yellow-400 hover:bg-yellow-300 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Register Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
