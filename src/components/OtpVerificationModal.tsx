import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, ArrowRight, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import { UserSession } from '../views/LoginView.tsx';

interface OtpVerificationModalProps {
  isOpen: boolean;
  email: string;
  demoOtpCode?: string;
  onClose: () => void;
  onVerificationSuccess: (session: UserSession) => void;
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  email,
  demoOtpCode,
  onClose,
  onVerificationSuccess
}) => {
  const [code, setCode] = useState(demoOtpCode || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!code || code.length !== 6) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: code.trim(), purpose: 'signup_verification' })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      const session: UserSession = {
        email: data.user.email,
        name: data.user.name,
        role: data.user.role === 'owner' ? 'org_admin' : data.user.role,
        jobTitle: data.user.job_title || 'Owner / Administrator',
        department: data.user.department || 'Executive Management',
        tenantId: data.tenant.id,
        tenantName: data.tenant.name
      };

      onVerificationSuccess(session);
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed. Please check the code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setErrorMessage('');
    setResendStatus('Resending verification code...');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'dummy-resend-trigger' })
      });
      setResendStatus('A fresh verification code has been dispatched.');
    } catch {
      setResendStatus('Code dispatched.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-[#101524] text-white rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="otp-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0B0E1B]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E6FF00] shadow-[0_0_8px_#E6FF00]" />
            <h2 id="otp-title" className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Verify Corporate Identity</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800/60 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 text-xs text-neutral-300">
            <ShieldCheck className="w-5 h-5 text-[#E6FF00] shrink-0" />
            <div>
              Enter the 6-digit verification code dispatched to <span className="font-bold text-white">{email}</span>.
              {demoOtpCode && (
                <div className="mt-1 font-mono text-[11px] text-[#E6FF00]">
                  Instant Test Code: <span className="font-black underline">{demoOtpCode}</span>
                </div>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {resendStatus && (
            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs">
              {resendStatus}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                6-Digit Security PIN
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  required
                  autoFocus
                  className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl pl-10 pr-4 py-3 text-lg font-mono tracking-widest text-center text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
              <span>Didn't receive the passkey?</span>
              <button
                type="button"
                onClick={handleResend}
                className="text-[#E6FF00] hover:underline font-semibold cursor-pointer"
              >
                Resend Passkey
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || code.length !== 6}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'Verifying...' : 'Confirm & Authenticate'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
