import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Building2,
  Mail,
  User,
  Phone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Video
} from 'lucide-react';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp?: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({
  isOpen,
  onClose,
  onLaunchApp
}) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('manufacturing');
  const [teamSize, setTeamSize] = useState('100-500');
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0C1022] rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 text-left relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[radial-gradient(circle,_rgba(199,242,56,0.18)_0%,_transparent_70%)] rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-[#C7F238]/30 text-[#C7F238] text-xs font-semibold mb-2">
              <Video className="w-3.5 h-3.5" />
              <span>1-ON-1 PRODUCT WALKTHROUGH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Book a Live Demo with an Architect
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Attendance से HR management तक—सब कुछ एक जगह। See how it works with your team before choosing a paid plan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close demo modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isBooked ? (
          <div className="py-6 text-center space-y-5 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#C7F238]/20 to-emerald-500/20 border border-[#C7F238]/40 text-[#C7F238] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(199,242,56,0.3)]">
              <Calendar className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                Demo Walkthrough Scheduled!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-md mx-auto">
                Thank you <span className="text-white font-bold">{fullName}</span>. An invite for <span className="text-[#FFA069] font-bold">{preferredDate} at {preferredTime}</span> has been simulated for <span className="text-[#C7F238] font-bold">{workEmail}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-left font-mono space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between text-neutral-400">
                <span>Walkthrough Type:</span>
                <span className="text-white font-bold">CCTV &amp; Multi-Tenant HRMS Demo</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Hardware Compatibility:</span>
                <span className="text-[#C7F238]">Zero Hardware Replacement Guarantee</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Pilot Period:</span>
                <span className="text-cyan-300">14-Day Free Evaluation Included</span>
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
                  <span>Explore Live Interactive App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FFA069]" />
                  <span>Your Name *</span>
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
                  <span>Corporate Email *</span>
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
                  <span>Company Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Precision Engineering Ltd"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-[#FFA069]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Direct Contact Phone</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Primary Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none"
                >
                  <option value="manufacturing">Manufacturing &amp; Factory</option>
                  <option value="corporate">IT &amp; Corporate Office</option>
                  <option value="school">School &amp; College (No Salary Mode)</option>
                  <option value="hospital">Hospital &amp; Healthcare</option>
                  <option value="retail">Multi-Outlet Retail / Logistics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Team Headcount
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none"
                >
                  <option value="1-50">1 - 50 Employees</option>
                  <option value="51-200">51 - 200 Employees</option>
                  <option value="201-1000">201 - 1,000 Employees</option>
                  <option value="1000+">1,000+ Multi-Branch</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FFA069]" />
                  <span>Preferred Day</span>
                </label>
                <select
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none"
                >
                  <option value="Today (Urgent)">Today (Earliest available)</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="In 2 Business Days">In 2 Business Days</option>
                  <option value="Next Week">Next Week</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C7F238]" />
                  <span>Time Slot</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none"
                >
                  <option value="10:00 AM IST / EST">10:00 AM</option>
                  <option value="11:30 AM IST / EST">11:30 AM</option>
                  <option value="02:00 PM IST / EST">02:00 PM</option>
                  <option value="04:30 PM IST / EST">04:30 PM</option>
                  <option value="06:00 PM IST / EST">06:00 PM</option>
                </select>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 italic pt-1">
              * See how it works with your team before choosing a paid plan. Includes live RTSP camera benchmark.
            </p>

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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C7F238] to-[#9BC915] text-black font-black text-xs flex items-center gap-2 hover:opacity-95 shadow-lg shadow-lime-500/25 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Demo Booking</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
