import React, { useState } from 'react';
import {
  Wallet,
  CreditCard,
  QrCode,
  DollarSign,
  Calendar,
  Clock,
  Download,
  ArrowUpRight,
  ShieldCheck,
  Send,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserSession } from './LoginView.tsx';

interface EmployeeWorkWalletViewProps {
  currentUser?: UserSession | null;
}

export const EmployeeWorkWalletView: React.FC<EmployeeWorkWalletViewProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gatepass' | 'advances' | 'payslips'>('overview');
  const [gatePassReason, setGatePassReason] = useState('Client Site Visit');
  const [gatePassTime, setGatePassTime] = useState('14:30');
  const [gatePassStatus, setGatePassStatus] = useState<string | null>(null);

  const [advanceAmount, setAdvanceAmount] = useState('500');
  const [advanceStatus, setAdvanceStatus] = useState<string | null>(null);

  const handleRequestGatePass = (e: React.FormEvent) => {
    e.preventDefault();
    setGatePassStatus('Gate pass #GP-9014 approved automatically by CCTV Security Bot. Valid for Gate 1 & 2 exit.');
  };

  const handleRequestAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    setAdvanceStatus(`Advance request for $${advanceAmount} submitted to HR. Auto-deduction scheduled for next payroll cycle.`);
  };

  return (
    <div className="p-6 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#E6FF00]/10 text-[#E6FF00] border border-[#E6FF00]/30 font-bold">
              SECTION 11
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Employee Self-Service Work Wallet
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Personal workforce portal: digital ID, dynamic pass, compensation ledger, leave balance, and instant gate pass issuance.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#101524] rounded-xl border border-neutral-800 text-xs font-bold">
          {(['overview', 'gatepass', 'advances', 'payslips'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                activeTab === t
                  ? 'bg-neutral-800 text-[#E6FF00]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Virtual Pass Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#101524] to-[#0A0D17] border border-neutral-800 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-neutral-400">ACTIVE WORK WALLET</div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                EDGE VERIFIED
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-600 flex items-center justify-center text-white text-xl font-black shadow-md">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <div className="text-base font-black text-white">{currentUser?.name || 'Asif Khan'}</div>
                <div className="text-xs text-[#E6FF00] font-semibold">{currentUser?.jobTitle || 'System Administrator'}</div>
                <div className="text-[10px] text-neutral-400 font-mono">{currentUser?.department || 'IT'}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/50 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-neutral-500 font-medium">ORGANIZATION</div>
                <div className="text-xs font-bold text-white truncate max-w-[200px]">
                  {currentUser?.tenantName || 'Face Recognition Attendance System'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-neutral-500 font-medium">EMPLOYEE ID</div>
                <div className="text-xs font-mono font-bold text-[#E6FF00]">EMP-15200</div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-[#0A0D17] border border-neutral-800">
                <div className="text-[10px] text-neutral-500">Punctuality</div>
                <div className="text-sm font-black text-emerald-400 font-mono">98.5%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A0D17] border border-neutral-800">
                <div className="text-[10px] text-neutral-500">Leave Left</div>
                <div className="text-sm font-black text-white font-mono">18 Days</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A0D17] border border-neutral-800">
                <div className="text-[10px] text-neutral-500">Overtime</div>
                <div className="text-sm font-black text-[#E6FF00] font-mono">14.5 Hrs</div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Salary Slip */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
              <div className="text-sm font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#E6FF00]" />
                  Latest Compensation Statement (October 2026)
                </span>
                <button
                  onClick={() => alert('Generating encrypted payslip PDF...')}
                  className="text-xs text-[#E6FF00] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3 rounded-xl bg-[#0A0D17] border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">Base Salary</div>
                  <div className="text-sm font-black text-white font-mono">$6,110.00</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0D17] border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">Overtime (14h)</div>
                  <div className="text-sm font-black text-emerald-400 font-mono">+$534.62</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0D17] border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">Deductions</div>
                  <div className="text-sm font-black text-red-400 font-mono">-$320.00</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0D17] border border-[#E6FF00]/40">
                  <div className="text-[10px] text-[#E6FF00]">Net Payout</div>
                  <div className="text-sm font-black text-white font-mono">$6,324.62</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Direct Bank Wire Scheduled: Oct 30, 2026</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">ACH / SEPA Direct Debit</span>
              </div>
            </div>

            {/* Quick Gate Pass Request Widget */}
            <div className="p-5 rounded-2xl bg-[#101524] border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Need an Instant Gate Pass?</div>
                <div className="text-[11px] text-neutral-400">Request temporary exit with automatic turnstile clearance.</div>
              </div>
              <button
                onClick={() => setActiveTab('gatepass')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all cursor-pointer"
              >
                Request Pass &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gate Pass Sub-View */}
      {activeTab === 'gatepass' && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#E6FF00]" />
            <span>Digital Gate Pass Request (CCTV Turnstile Integration)</span>
          </div>

          {gatePassStatus && (
            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{gatePassStatus}</span>
            </div>
          )}

          <form onSubmit={handleRequestGatePass} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1">Exit Purpose / Destination</label>
              <input
                type="text"
                value={gatePassReason}
                onChange={(e) => setGatePassReason(e.target.value)}
                required
                className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1">Expected Exit Time</label>
                <input
                  type="time"
                  value={gatePassTime}
                  onChange={(e) => setGatePassTime(e.target.value)}
                  className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1">Authorized Gate</label>
                <select className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                  <option>Gate 1 - Main North Turnstile</option>
                  <option>Gate 2 - East Employee Barrier</option>
                  <option>Gate 3 - Logistics Loading Dock</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all cursor-pointer"
            >
              Generate Turnstile QR Pass
            </button>
          </form>
        </div>
      )}

      {/* Salary Advance Sub-View */}
      {activeTab === 'advances' && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#E6FF00]" />
            <span>Salary Advance &amp; Emergency Micro-Credit</span>
          </div>

          {advanceStatus && (
            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{advanceStatus}</span>
            </div>
          )}

          <form onSubmit={handleRequestAdvance} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1">Requested Amount ($ USD)</label>
              <input
                type="number"
                min="50"
                max="2000"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
              />
              <span className="text-[10px] text-neutral-500 mt-1 block">Maximum allowed advance: $2,000.00 (based on earned wages).</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all cursor-pointer"
            >
              Submit Advance Request
            </button>
          </form>
        </div>
      )}

      {/* Payslips Sub-View */}
      {activeTab === 'payslips' && (
        <div className="p-6 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#E6FF00]" />
            <span>Historical Salary Slips &amp; Tax Documents</span>
          </div>

          <div className="space-y-2">
            {[
              { month: 'September 2026', gross: '$6,450.00', net: '$6,110.00', status: 'Disbursed' },
              { month: 'August 2026', gross: '$6,300.00', net: '$5,980.00', status: 'Disbursed' },
              { month: 'July 2026', gross: '$6,110.00', net: '$5,820.00', status: 'Disbursed' }
            ].map((p) => (
              <div
                key={p.month}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0A0D17] border border-neutral-800 text-xs"
              >
                <div>
                  <div className="font-bold text-white">{p.month}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Gross: {p.gross} &middot; Net: {p.net}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                    {p.status}
                  </span>
                  <button
                    onClick={() => alert(`Downloading payslip for ${p.month}`)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[#E6FF00] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
