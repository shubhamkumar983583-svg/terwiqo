import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ArrowRight, Shield, KeyRound, Lock, AlertCircle } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  initialEmail = ''
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [step, setStep] = useState<'request' | 'reset' | 'success'>('request');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [demoCodeHint, setDemoCodeHint] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid corporate work email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch reset request.');
      }

      if (data.demoOtpCode && data.demoOtpCode !== '000000') {
        setDemoCodeHint(data.demoOtpCode);
        setResetCode(data.demoOtpCode);
      }
      setStep('reset');
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error requesting password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!resetCode || resetCode.length !== 6) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }
    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          code: resetCode.trim(),
          newPassword
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Password reset failed.');
      }
      setStep('success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('request');
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setDemoCodeHint(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-[#0F1424]/85 backdrop-blur-2xl text-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(255,160,105,0.12)] border border-white/15 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
      >
        {/* Header bar matching PNG dashboard */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E6FF00] shadow-[0_0_8px_#E6FF00]" />
            <h2 id="forgot-password-title" className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Reset Corporate Credentials</span>
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/70 backdrop-blur-md border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {step === 'request' && (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 text-xs text-neutral-300">
                <Shield className="w-4 h-4 text-[#E6FF00] shrink-0" />
                <span>
                  Enter your registered corporate email. An encrypted 6-digit recovery passkey will be issued.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  Corporate Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md disabled:opacity-50"
                >
                  {isLoading ? 'Dispatching...' : 'Send Recovery Passkey'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleConfirmReset} className="space-y-4">
              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-xs text-emerald-300">
                Recovery passkey sent to <span className="font-bold text-white">{email}</span>.
                {demoCodeHint && (
                  <span className="block mt-1 font-mono text-[11px] text-[#E6FF00]">
                    (Demo Code: {demoCodeHint})
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    required
                    className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono tracking-widest text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  New Password (min 8 chars, letter + number)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('request')}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md disabled:opacity-50"
                >
                  {isLoading ? 'Resetting...' : 'Update Password'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Password Updated Successfully</h3>
                <p className="text-xs text-neutral-400">
                  Your credentials have been securely updated. You may now sign in to your corporate workspace.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all"
              >
                Return to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
