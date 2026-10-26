import React, { useState } from 'react';
import { Rocket, CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Key, Copy, Check } from 'lucide-react';

interface ConceptClickSuccessProps {
  onEnterSandbox?: () => void;
  className?: string;
}

export const ConceptClickSuccess: React.FC<ConceptClickSuccessProps> = ({
  onEnterSandbox,
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'provisioning' | 'success'>('idle');
  const [progressMsg, setProgressMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;

    setStatus('provisioning');
    setProgressMsg('Allocating RTSP stream worker node...');

    setTimeout(() => {
      setProgressMsg('Generating PostgreSQL Row-Level Security keys...');
    }, 600);

    setTimeout(() => {
      setProgressMsg('Calibrating 512-D cosine vector index...');
    }, 1200);

    setTimeout(() => {
      setStatus('success');
      setProgressMsg('Sandbox Successfully Provisioned!');
    }, 1800);
  };

  const copyLicenseKey = () => {
    navigator.clipboard.writeText('WP-ENTERPRISE-PROVISION-2026');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div
      id="click-success"
      className={`p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0E1528] to-[#070A14] border border-orange-500/30 shadow-[0_25px_60px_rgba(255,160,105,0.15)] space-y-6 text-left relative overflow-hidden ${className}`}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-[#FFA069] text-[10px] font-mono font-bold mb-2">
          <Rocket className="w-3 h-3 text-[#FFA069]" />
          <span>Concept 12 · Click &rarr; Success (Zero-Friction Instant Conversion)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Deploy Your Dedicated Edge Biometric Sandbox
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl leading-relaxed">
          Test sub-15ms face recognition attendance, PostgreSQL row-level isolation, and dynamic payroll calculations on your own live tenant in 2 seconds.
        </p>
      </div>

      {status === 'idle' && (
        <form onSubmit={handleDeploy} className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter corporate work email (e.g. ops@company.com)"
            className="flex-1 px-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/20 text-white placeholder-neutral-400 text-sm font-medium focus:outline-none focus:border-[#FFA069] focus:ring-2 focus:ring-orange-500/30"
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-95 text-black font-black text-sm transition-all cursor-pointer shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Instant Sandbox</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {status === 'provisioning' && (
        <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 animate-in fade-in max-w-lg">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFA069]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFA069] animate-ping" />
            <span>{progressMsg}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FFA069] to-[#C7F238] animate-pulse w-3/4" />
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="p-6 sm:p-7 rounded-2xl bg-emerald-950/30 border border-[#C7F238]/40 space-y-4 animate-in fade-in zoom-in-95 max-w-xl shadow-2xl">
          <div className="flex items-center gap-2 text-sm font-bold text-[#C7F238]">
            <CheckCircle2 className="w-5 h-5" />
            <span>Dedicated Multi-Tenant Sandbox Provisioned!</span>
          </div>

          <p className="text-xs text-neutral-200 leading-relaxed">
            Your environment has been provisioned with PostgreSQL Row-Level Security, 6 RTSP camera streams, and sample payroll rules.
          </p>

          <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-2 truncate">
              <Key className="w-3.5 h-3.5 text-[#FFA069]" />
              <span className="truncate">Key: WP-ENTERPRISE-PROVISION-2026</span>
            </div>
            <button
              type="button"
              onClick={copyLicenseKey}
              className="text-[10px] text-[#FFA069] hover:text-white flex items-center gap-1 cursor-pointer pl-2 shrink-0"
            >
              {copiedKey ? <Check className="w-3 h-3 text-[#C7F238]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {onEnterSandbox && (
              <button
                type="button"
                onClick={onEnterSandbox}
                className="px-5 py-2.5 rounded-xl bg-[#C7F238] hover:bg-[#b8e22c] text-black font-black text-xs transition-all cursor-pointer shadow-lg shadow-lime-500/20 flex items-center gap-1.5"
              >
                <span>Launch Live Workspace Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setEmail('');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono cursor-pointer"
            >
              Deploy Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
