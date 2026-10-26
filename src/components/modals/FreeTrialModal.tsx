import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Building2,
  Mail,
  User,
  Phone,
  Users
} from 'lucide-react';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp?: () => void;
  tenantName?: string;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({
  isOpen,
  onClose,
  onLaunchApp,
  tenantName = 'Face Recognition Attendance System'
}) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [teamSize, setTeamSize] = useState('51-200');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'cctv',
    'shifts',
    'geofence',
    'payroll'
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0C1022] rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 text-left relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[radial-gradient(circle,_rgba(255,160,105,0.25)_0%,_transparent_70%)] rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-[#FFA069]/30 text-[#FFA069] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>14-DAY ENTERPRISE FREE TRIAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Start Your Free 14-Day Trial
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Attendance से HR management तक—सब कुछ एक जगह। Full access without commitment.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close free trial modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-5 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-[#C7F238]/20 border border-emerald-500/40 text-[#C7F238] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(199,242,56,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                Your 14-Day Enterprise Workspace is Ready!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-md mx-auto">
                Welcome <span className="text-white font-bold">{fullName || 'Team'}</span>. We have provisioned your dedicated tenant for <span className="text-[#FFA069] font-bold">{companyName || 'your organization'}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-left font-mono space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between text-neutral-400">
                <span>Account Status:</span>
                <span className="text-[#C7F238] font-bold">14-Day Active Trial</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Hardware Compatibility:</span>
                <span className="text-white">Existing IP/RTSP/CCTV Cameras</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Credit Card:</span>
                <span className="text-emerald-400">Not Required ($0.00)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              {onLaunchApp && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLaunchApp();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black font-black text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  <span>Launch Live Workspace Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Return to Overview
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Value guarantee bar */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-300">
              <span className="flex items-center gap-1.5 text-[#C7F238] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 14-Day Free Trial
              </span>
              <span className="text-white/20">&middot;</span>
              <span className="flex items-center gap-1.5 text-[#FFA069] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> Transparent Pricing
              </span>
              <span className="text-white/20">&middot;</span>
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Cpu className="w-3.5 h-3.5" /> No Hardware Replacement
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FFA069]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Asif Khan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-[#FFA069]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C7F238]" />
                  <span>Work Email *</span>
                </label>
                <input
                  type="email"
                  required
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-[#C7F238]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#FFA069]" />
                  <span>Company / Organization *</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Precision Manufacturing"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-[#FFA069]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Team Size</span>
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="1-25">1 - 25 Employees</option>
                  <option value="26-50">26 - 50 Employees</option>
                  <option value="51-200">51 - 200 Employees</option>
                  <option value="201-1000">201 - 1,000 Employees</option>
                  <option value="1000+">1,000+ Enterprise Scale</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>Contact Phone</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210 / +1 (555) 019-2834"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
              />
            </div>

            {/* Selectable Modules */}
            <div>
              <div className="text-[11px] font-mono text-neutral-400 mb-1.5">
                Included Enterprise Modules:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'cctv', label: 'CCTV Biometrics' },
                  { id: 'shifts', label: 'Shifts & Leave' },
                  { id: 'geofence', label: 'Mobile Geofence' },
                  { id: 'payroll', label: 'Auto Payroll' }
                ].map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className={`p-2 rounded-xl border text-[11px] font-medium transition-all text-center cursor-pointer ${
                      selectedModules.includes(mod.id)
                        ? 'bg-[#FFA069]/15 border-[#FFA069] text-white'
                        : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reassurance text */}
            <p className="text-[11px] text-neutral-400 italic pt-1">
              * See how it works with your team before choosing a paid plan. No automatic credit card charges.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black font-black text-xs flex items-center gap-2 hover:opacity-95 shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
