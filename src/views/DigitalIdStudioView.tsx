import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Sparkles,
  Download,
  Share2,
  RefreshCw,
  Shield,
  CheckCircle2,
  AlertOctagon,
  Palette,
  Sliders,
  Check
} from 'lucide-react';

export const DigitalIdStudioView: React.FC = () => {
  const [template, setTemplate] = useState<'cyber' | 'minimal' | 'executive'>('cyber');
  const [employeeName, setEmployeeName] = useState('Asif Khan');
  const [employeeRole, setEmployeeRole] = useState('System Administrator');
  const [employeeId, setEmployeeId] = useState('EMP-89021');
  const [department, setDepartment] = useState('IT & Infrastructure');
  const [cardStatus, setCardStatus] = useState<'ACTIVE' | 'EXPIRED' | 'REVOKED'>('ACTIVE');
  const [cardExpiry, setCardExpiry] = useState('OCT 2029');
  const [nfcUid, setNfcUid] = useState('04:A2:3F:89:1B:40');

  const handleRevoke = () => {
    setCardStatus('REVOKED');
  };

  const handleRenew = () => {
    setCardStatus('ACTIVE');
    setCardExpiry('OCT 2031');
  };

  return (
    <div className="p-6 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#E6FF00]/10 text-[#E6FF00] border border-[#E6FF00]/30 font-bold">
              SECTION 04
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Digital ID Card Studio &amp; RFID Badging
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Enterprise identity badge designer: dynamic rotating QR tokens, NFC chip virtualization, biometric watermarks, and instant credential issuance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting high-resolution 300DPI badge for physical Zebra thermal printer!')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Thermal Print Badge (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Card Customizer Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#E6FF00]" />
              <span>Identity Template &amp; Styling</span>
            </div>

            {/* Template Selector */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'cyber', label: 'Dark Cyber' },
                { id: 'executive', label: 'Executive Navy' },
                { id: 'minimal', label: 'Minimal Monochrome' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id as any)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    template === t.id
                      ? 'bg-neutral-800 border-[#E6FF00] text-[#E6FF00]'
                      : 'bg-[#0A0D17] border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Editable Fields */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">Employee Full Name</label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Corporate ID</label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs font-mono text-[#E6FF00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">Designation</label>
                <input
                  type="text"
                  value={employeeRole}
                  onChange={(e) => setEmployeeRole(e.target.value)}
                  className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Lifecycle Controls */}
            <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-3">
              <button
                onClick={handleRenew}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
              >
                Renew Credential
              </button>
              <button
                onClick={handleRevoke}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-red-950/70 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors cursor-pointer"
              >
                Revoke Badge
              </button>
            </div>
          </div>
        </div>

        {/* Right: Interactive Digital Badge Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0B0E1B] border border-neutral-800">
          
          {/* Physical Badge Mockup with Lanyard Slot */}
          <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-neutral-700 bg-gradient-to-b from-[#101524] via-[#0A0D17] to-black relative">
            
            {/* Lanyard Hole Clip */}
            <div className="w-16 h-3 bg-neutral-900 rounded-full mx-auto mt-3 border border-neutral-700" />

            <div className="p-6 space-y-5">
              {/* Top Card Bar: Corporate Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-black border border-[#E6FF00] flex items-center justify-center text-[#E6FF00] font-black text-xs">
                    &gt;
                  </div>
                  <div>
                    <div className="text-xs font-black tracking-tight text-white">WorkPulse AI</div>
                    <div className="text-[9px] font-mono text-neutral-400">GLOBAL ACCESS</div>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    cardStatus === 'ACTIVE'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-950 text-red-400 border border-red-500/30'
                  }`}
                >
                  {cardStatus}
                </span>
              </div>

              {/* Photo & Holographic Security Foil */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-24 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-inner overflow-hidden border-2 border-neutral-600">
                    {employeeName.charAt(0)}
                  </div>
                  {/* Hologram Stamp */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-[#E6FF00] to-teal-400 opacity-80 flex items-center justify-center text-[8px] font-black text-black">
                    ✓
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <div className="text-base font-black text-white leading-tight">{employeeName}</div>
                  <div className="text-xs font-semibold text-[#E6FF00]">{employeeRole}</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{department}</div>
                  <div className="text-[10px] text-neutral-500 font-mono pt-1">ID: {employeeId}</div>
                </div>
              </div>

              {/* Dynamic QR & RFID Chip Virtualizer */}
              <div className="p-3 rounded-2xl bg-[#0A0D17] border border-neutral-800 flex items-center justify-between">
                <div className="space-y-1 text-left">
                  <div className="text-[9px] text-neutral-500 uppercase font-bold tracking-wider">
                    Edge NFC Chip UID
                  </div>
                  <div className="font-mono text-xs text-white">{nfcUid}</div>
                  <div className="text-[9px] text-neutral-400">Valid Through: {cardExpiry}</div>
                </div>

                {/* Simulated QR Box */}
                <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                  <QrCode className="w-full h-full text-black" />
                </div>
              </div>

              {/* Bottom Security Strip */}
              <div className="text-[9px] font-mono text-neutral-500 flex items-center justify-between border-t border-neutral-800/80 pt-3">
                <span>MIL-STD-810H NFC RFID</span>
                <span className="text-[#E6FF00]">ANTI-TAMPER CHIP ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
