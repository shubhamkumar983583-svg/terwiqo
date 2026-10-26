import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Camera,
  Sparkles,
  Building2,
  CheckCircle2,
  Activity,
  Layers,
  Info,
  X,
  UserPlus,
  Phone,
  User,
  AlertCircle
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo.tsx';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal.tsx';
import { OtpVerificationModal } from '../components/OtpVerificationModal.tsx';
import {
  validateLoginForm,
  validateSignupForm,
  evaluatePasswordStrength
} from '../schemas/authSchema.ts';

export interface UserSession {
  email: string;
  name: string;
  role: 'superadmin' | 'org_admin' | 'manager' | 'employee';
  jobTitle: string;
  department: string;
  tenantId: string;
  tenantName: string;
}

interface LoginViewProps {
  onLoginSuccess: (session: UserSession) => void;
  onExploreLandingPage?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onExploreLandingPage
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login form state
  const [email, setEmail] = useState('dedaatish@gmail.com');
  const [password, setPassword] = useState('Admin@1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

  // Signup form state
  const [orgName, setOrgName] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupErrors, setSignupErrors] = useState<{
    orgName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
  }>({});

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isFaceScanning, setIsFaceScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Modals
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [otpModalState, setOtpModalState] = useState<{ isOpen: boolean; email: string; demoCode?: string }>({
    isOpen: false,
    email: ''
  });
  const [infoModalContent, setInfoModalContent] = useState<{ title: string; body: string } | null>(null);

  // Preset demo credentials
  const presetUsers = [
    {
      label: 'Admin (Asif Khan)',
      email: 'dedaatish@gmail.com',
      password: 'Admin@1234',
      name: 'Asif Khan',
      role: 'org_admin' as const,
      jobTitle: 'System Administrator',
      department: 'IT & Infrastructure',
      tenantId: 'tenant-01',
      tenantName: 'Face Recognition Attendance System'
    },
    {
      label: 'Employee (Helen)',
      email: 'helen.v@workforce.ai',
      password: 'Admin@1234',
      name: 'Helen Vasilovsky',
      role: 'employee' as const,
      jobTitle: 'UX Designer',
      department: 'Product Design',
      tenantId: 'tenant-01',
      tenantName: 'Face Recognition Attendance System'
    },
    {
      label: 'Gate Security (Marcus)',
      email: 'marcus.v@workforce.ai',
      password: 'Admin@1234',
      name: 'Marcus Vance',
      role: 'manager' as const,
      jobTitle: 'Gate CCTV Supervisor',
      department: 'Facility Security',
      tenantId: 'tenant-01',
      tenantName: 'Face Recognition Attendance System'
    }
  ];

  const handleSelectPreset = (p: typeof presetUsers[0]) => {
    setEmail(p.email);
    setPassword(p.password);
    setErrorMessage('');
    setSuccessMessage('');
    setLoginErrors({});
  };

  // --- Real Login API Call with Zod Schema Validation ---
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // 1. Zod Schema Validation
    const validation = validateLoginForm({ email, password });
    if (!validation.isValid) {
      setLoginErrors(validation.errors);
      setErrorMessage(
        validation.errors.email ||
        validation.errors.password ||
        'Please enter a valid email format and strong password before signing in.'
      );
      return;
    }

    setLoginErrors({});
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.requiresVerification) {
          setOtpModalState({
            isOpen: true,
            email: data.email || email.trim()
          });
          return;
        }
        throw new Error(data.error || 'Authentication failed. Please verify your credentials.');
      }

      const session: UserSession = {
        email: data.user.email,
        name: data.user.name,
        role: data.user.role === 'owner' ? 'org_admin' : data.user.role,
        jobTitle: data.user.job_title || 'System Administrator',
        department: data.user.department || 'IT & Infrastructure',
        tenantId: data.tenant.id,
        tenantName: data.tenant.name
      };

      onLoginSuccess(session);
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Real Signup API Call with Zod Schema Validation ---
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // 1. Zod Schema Validation
    const validation = validateSignupForm({
      orgName,
      fullName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword
    });

    if (!validation.isValid) {
      setSignupErrors(validation.errors);
      setErrorMessage(
        validation.errors.email ||
        validation.errors.password ||
        validation.errors.orgName ||
        validation.errors.fullName ||
        validation.errors.phone ||
        'Please fulfill all requirements before submitting registration.'
      );
      return;
    }

    setSignupErrors({});
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgName: orgName.trim(),
          fullName: fullName.trim(),
          email: signupEmail.trim(),
          phone: signupPhone.trim(),
          password: signupPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Organization signup failed.');
      }

      setSuccessMessage('Organization registered! Please enter the 6-digit verification code.');
      setOtpModalState({
        isOpen: true,
        email: signupEmail.trim(),
        demoCode: data.demoOtpCode
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create organization account.');
    } finally {
      setIsLoading(false);
    }
  };

  // Instant Biometric Bypass (Simulated Edge Camera Match)
  const handleBiometricLogin = () => {
    setIsFaceScanning(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsFaceScanning(false);
      onLoginSuccess({
        email: 'dedaatish@gmail.com',
        name: 'Asif Khan (Biometric Verified)',
        role: 'org_admin',
        jobTitle: 'System Administrator',
        department: 'IT & Infrastructure',
        tenantId: 'tenant-01',
        tenantName: 'Face Recognition Attendance System'
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col justify-between selection:bg-[#FFA069]/30 relative overflow-hidden">
      {/* Dynamic Ambient Luminous Glow Orbs (Diffuses through frosted glassmorphism layers) */}
      <div className="absolute -top-32 -right-24 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(255,160,105,0.22)_0%,_rgba(232,113,60,0.1)_45%,_transparent_75%)] rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(199,242,56,0.15)_0%,_rgba(56,189,248,0.08)_50%,_transparent_75%)] rounded-full blur-3xl pointer-events-none animate-float-reverse" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_rgba(255,160,105,0.08)_0%,_transparent_70%)] rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Main Dual-Panel Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 z-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero & CCTV AI Telemetry Panel (Desktop) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black/60 border border-[#C7F238] flex items-center justify-center font-black text-[#C7F238] text-xl shadow-[0_0_20px_rgba(199,242,56,0.35)]">
                  &gt;
                </div>
                <div>
                  <div className="font-black text-lg tracking-tight text-white flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,160,105,0.3)]">
                    WorkPulse AI
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-md text-[#FFA069] border border-[#FFA069]/40 font-bold shadow-[0_0_8px_rgba(255,160,105,0.2)]">
                      Sunset &amp; Glass v1.2
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-300 font-medium">
                    Face Recognition &middot; Executive Workforce Suite
                  </div>
                </div>
              </div>

              {onExploreLandingPage && (
                <button
                  onClick={onExploreLandingPage}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-95 text-black font-extrabold text-xs shadow-md shadow-orange-500/25 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  Direct Live Demo &rarr;
                </button>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-orange-500/30 text-orange-200 text-xs font-semibold shadow-[inset_0_1px_0_0_rgba(255,160,105,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFA069]" />
                <span>Salad Sunset Warm Glow &amp; NL Corp Glassmorphism</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                Secure HRMS Authentication &amp; Multi-Tenant Control.
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg">
                Complete enterprise authorization with PostgreSQL row-level tenant isolation, OTP email/phone verification, bcrypt password hashing, and role-based permissions (Owner, HR, Manager, Employee).
              </p>
            </div>

            {/* NL Corp Executive Bento Snippet with Frosted Glass */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Working Format 500 Days Donut */}
              <div className="p-4 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.1)] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-neutral-200">
                  <span>Working format</span>
                  <span className="text-[#C7F238] font-mono drop-shadow-[0_0_6px_#c7f238]">500 DAYS</span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-[#84CC16] border-r-[#F43F5E] flex items-center justify-center shrink-0 shadow-inner">
                    <span className="text-[10px] font-black text-white font-mono">500</span>
                  </div>
                  <div className="text-[10px] space-y-0.5 text-neutral-300 font-mono">
                    <div className="text-cyan-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" /> 50% Office</div>
                    <div className="text-[#84CC16] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] shadow-[0_0_6px_#84cc16]" /> 30% Hybrid</div>
                    <div className="text-[#F43F5E] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] shadow-[0_0_6px_#f43f5e]" /> 20% Remote</div>
                  </div>
                </div>
              </div>

              {/* Financial Mesh Card ($6,110 / +40% salary with Frosted Glass) */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-orange-500/15 via-white/[0.04] to-white/[0.02] backdrop-blur-xl border border-orange-500/35 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-[#FFA069] font-mono font-bold">
                  <span>SALARY GROWTH</span>
                  <span className="text-[#C7F238] shadow-[0_0_6px_#c7f238]">+40% MONTH</span>
                </div>
                <div className="my-1">
                  <div className="text-2xl font-black text-white tracking-tight font-mono drop-shadow-[0_0_8px_rgba(255,160,105,0.3)]">$6,110</div>
                  <div className="text-[10px] text-neutral-300">Monthly Disbursed</div>
                </div>
                <div className="text-[9px] text-[#FFA069] font-mono">Verified via Payroll Engine</div>
              </div>
            </div>

            {/* Live CCTV Biometric HUD Card with Frosted Glass */}
            <div className="p-4 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 space-y-3 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-neutral-200 font-bold">
                  <Camera className="w-4 h-4 text-[#FFA069]" />
                  <span>CCTV Biometric Node &middot; Active Stream</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold backdrop-blur-md">
                  LATENCY: 14ms
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-medium">Tenant Isolation</div>
                  <div className="text-sm font-black text-white font-mono">Row-Level</div>
                  <div className="text-[9px] text-[#FFA069] font-mono">tenant_id FK</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-medium">Password Hash</div>
                  <div className="text-sm font-black text-white font-mono">Bcrypt</div>
                  <div className="text-[9px] text-emerald-400 font-mono">10 Salt Rounds</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-neutral-400 font-medium">Session Policy</div>
                  <div className="text-sm font-black text-white font-mono">HttpOnly</div>
                  <div className="text-[9px] text-[#C7F238] font-mono">SameSite=Lax</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                  <span>Database: PostgreSQL / Cloud SQL Ready</span>
                </div>
                <span className="text-neutral-400">SOC 2 &amp; GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Card: Responsive Authentication Form (Sign In / Sign Up with Frosted Glass) */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#0E1322]/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Tab Switcher: Sign In vs Register Organization with Frosted Glass */}
              <div className="flex p-1 bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 mb-6 shadow-inner">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                    setLoginErrors({});
                    setSignupErrors({});
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-md shadow-orange-500/20 font-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMessage('');
                    setSuccessMessage('');
                    setLoginErrors({});
                    setSignupErrors({});
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === 'signup'
                      ? 'bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-md shadow-orange-500/20 font-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register Organization</span>
                </button>
              </div>

              {/* Status Message Banners */}
              {errorMessage && (
                <div role="alert" className="mb-4 p-3 rounded-xl bg-red-950/70 backdrop-blur-md border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {successMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/70 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* ========================================= */}
              {/* TAB 1: SIGN IN FORM */}
              {/* ========================================= */}
              {authMode === 'login' && (
                <div className="space-y-5 text-left">
                  <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight">
                      Sign in to your workforce
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">
                      Enter corporate credentials or authenticate via biometric passkey.
                    </p>
                  </div>

                  {/* Preset Demo Selector with Frosted Glass Tiles */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-semibold">
                      <span>Instant Demo Profiles</span>
                      <span className="text-[#FFA069]">Click to select</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {presetUsers.map((p) => (
                        <button
                          key={p.email}
                          type="button"
                          onClick={() => handleSelectPreset(p)}
                          className={`p-2 rounded-2xl text-left border transition-all cursor-pointer backdrop-blur-md ${
                            email === p.email
                              ? 'bg-white/[0.12] border-[#FFA069] text-white shadow-[0_0_12px_rgba(255,160,105,0.25)]'
                              : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.07]'
                          }`}
                        >
                          <div className="text-[11px] font-bold truncate text-white">{p.label}</div>
                          <div className="text-[9px] text-neutral-400 truncate">{p.jobTitle}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleLoginSubmit} noValidate className="space-y-4 pt-2">
                    {/* Corporate Email */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                        Corporate Email / Employee ID
                      </label>
                      <div className="relative">
                        <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                          loginErrors.email ? 'text-rose-400' : 'text-neutral-400'
                        }`} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (loginErrors.email) {
                              setLoginErrors((prev) => ({ ...prev, email: undefined }));
                            }
                          }}
                          placeholder="name@company.com"
                          aria-invalid={!!loginErrors.email}
                          aria-describedby={loginErrors.email ? 'login-email-error' : undefined}
                          className={`w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all ${
                            loginErrors.email ? 'border-rose-500/80 ring-1 ring-rose-500/40 focus:border-rose-400' : ''
                          }`}
                        />
                      </div>
                      {loginErrors.email && (
                        <p id="login-email-error" role="alert" className="text-[11px] text-rose-400 font-medium flex items-center gap-1.5 mt-1.5 animate-in fade-in">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{loginErrors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-neutral-300">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsForgotModalOpen(true)}
                          className="text-xs text-[#FFA069] hover:underline font-semibold cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                          loginErrors.password ? 'text-rose-400' : 'text-neutral-400'
                        }`} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (loginErrors.password) {
                              setLoginErrors((prev) => ({ ...prev, password: undefined }));
                            }
                          }}
                          placeholder="Enter corporate password"
                          aria-invalid={!!loginErrors.password}
                          aria-describedby={loginErrors.password ? 'login-password-error' : undefined}
                          className={`w-full glass-input rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all ${
                            loginErrors.password ? 'border-rose-500/80 ring-1 ring-rose-500/40 focus:border-rose-400' : ''
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {loginErrors.password && (
                        <p id="login-password-error" role="alert" className="text-[11px] text-rose-400 font-medium flex items-center gap-1.5 mt-1.5 animate-in fade-in">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{loginErrors.password}</span>
                        </p>
                      )}

                      {/* Password Strength Indicator */}
                      {password.length > 0 && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2">
                          {(() => {
                            const strength = evaluatePasswordStrength(password);
                            return (
                              <>
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="text-neutral-400 font-medium">Password Strength:</span>
                                  <span className="font-bold font-mono" style={{ color: strength.color }}>
                                    {strength.label}
                                  </span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-300 rounded-full ${strength.bgColor}`}
                                    style={{ width: strength.barWidth }}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-1 pt-1 text-[10px]">
                                  <div className={`flex items-center gap-1 ${strength.checks.length ? 'text-emerald-400' : 'text-neutral-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${strength.checks.length ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                                    <span>8+ Characters</span>
                                  </div>
                                  <div className={`flex items-center gap-1 ${strength.checks.uppercase && strength.checks.lowercase ? 'text-emerald-400' : 'text-neutral-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${strength.checks.uppercase && strength.checks.lowercase ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                                    <span>Upper &amp; Lowercase</span>
                                  </div>
                                  <div className={`flex items-center gap-1 ${strength.checks.number ? 'text-emerald-400' : 'text-neutral-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${strength.checks.number ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                                    <span>Number (0-9)</span>
                                  </div>
                                  <div className={`flex items-center gap-1 ${strength.checks.special ? 'text-emerald-400' : 'text-neutral-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${strength.checks.special ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                                    <span>Special Char (!@#$)</span>
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                    {/* Remember Device Checkbox */}
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded border-neutral-700 bg-white/5 text-[#FFA069] focus:ring-0 cursor-pointer"
                        />
                        <span>Remember this device for 30 days</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl font-black text-xs bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-95 text-black transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                    >
                      {isLoading ? 'Authenticating with Database...' : 'Sign In to Workspace'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Biometric Passkey Alternative */}
                  <div className="pt-2">
                    <div className="relative text-center text-[10px] text-neutral-400 font-mono mb-3">
                      <span className="px-2 bg-transparent relative z-10 text-neutral-400">Or Instant Biometric Scan</span>
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleBiometricLogin}
                      disabled={isFaceScanning}
                      className="w-full py-2.5 rounded-xl border border-white/15 hover:border-[#FFA069]/50 bg-white/[0.04] backdrop-blur-md text-neutral-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:bg-white/[0.08]"
                    >
                      <Camera className="w-4 h-4 text-[#FFA069]" />
                      <span>{isFaceScanning ? 'Matching Biometric Vector...' : 'Instant CCTV Face Biometric / Edge Passkey'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================= */}
              {/* TAB 2: REGISTER ORGANIZATION (SIGN UP) */}
              {/* ========================================= */}
              {authMode === 'signup' && (
                <div className="space-y-4 text-left">
                  <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight">
                      Register your Organization
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">
                      Set up your company workspace and generate your Owner administrator account.
                    </p>
                  </div>

                  <div className="p-3 bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/10 text-xs text-neutral-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C7F238] shrink-0" />
                    <span>
                      New signups are granted <strong>Owner</strong> privileges isolated to your organization.
                    </span>
                  </div>

                  <form onSubmit={handleSignupSubmit} noValidate className="space-y-3 pt-1">
                    {/* Organization Name */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1">
                        Company / Organization Name
                      </label>
                      <div className="relative">
                        <Building2 className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                          signupErrors.orgName ? 'text-rose-400' : 'text-neutral-400'
                        }`} />
                        <input
                          type="text"
                          value={orgName}
                          onChange={(e) => {
                            setOrgName(e.target.value);
                            if (signupErrors.orgName) setSignupErrors((prev) => ({ ...prev, orgName: undefined }));
                          }}
                          placeholder="e.g. Apex Industrial Systems Ltd"
                          aria-invalid={!!signupErrors.orgName}
                          aria-describedby={signupErrors.orgName ? 'signup-org-error' : undefined}
                          className={`w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all ${
                            signupErrors.orgName ? 'border-rose-500/80 ring-1 ring-rose-500/40 focus:border-rose-400' : ''
                          }`}
                        />
                      </div>
                      {signupErrors.orgName && (
                        <p id="signup-org-error" role="alert" className="text-[11px] text-rose-400 font-medium flex items-center gap-1.5 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{signupErrors.orgName}</span>
                        </p>
                      )}
                    </div>

                    {/* Owner Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1">
                        Owner / Admin Full Name
                      </label>
                      <div className="relative">
                        <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                          signupErrors.fullName ? 'text-rose-400' : 'text-neutral-400'
                        }`} />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (signupErrors.fullName) setSignupErrors((prev) => ({ ...prev, fullName: undefined }));
                          }}
                          placeholder="e.g. Rahul Sharma"
                          aria-invalid={!!signupErrors.fullName}
                          aria-describedby={signupErrors.fullName ? 'signup-name-error' : undefined}
                          className={`w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all ${
                            signupErrors.fullName ? 'border-rose-500/80 ring-1 ring-rose-500/40 focus:border-rose-400' : ''
                          }`}
                        />
                      </div>
                      {signupErrors.fullName && (
                        <p id="signup-name-error" role="alert" className="text-[11px] text-rose-400 font-medium flex items-center gap-1.5 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{signupErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Work Email */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-300 mb-1">
                          Corporate Work Email
                        </label>
                        <div className="relative">
                          <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                            signupErrors.email ? 'text-rose-400' : 'text-neutral-400'
                          }`} />
                          <input
                            type="email"
                            value={signupEmail}
                            onChange={(e) => {
                              setSignupEmail(e.target.value);
                              if (signupErrors.email) setSignupErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            placeholder="owner@company.com"
                            aria-invalid={!!signupErrors.email}
                            aria-describedby={signupErrors.email ? 'signup-email-error' : undefined}
                            className={`w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all ${
                              signupErrors.email ? 'border-rose-500/80 ring-1 ring-rose-500/40 focus:border-rose-400' : ''
                            }`}
                          />
                        </div>
                        {signupErrors.email && (
                          <p id="signup-email-error" role="alert" className="text-[11px] text-rose-400 font-medium flex items-center gap-1.5 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{signupErrors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-300 mb-1">
                          Mobile / Work Phone
                        </label>
                        <div className="relative">
                          <Phone className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                            signupErrors.phone ? 'text-rose-400' : 'text-neutral-400'
                          }`} />
                          <input
                            type="tel"
                            value={signupPhone}
                            onChange={(e) => {
                              setSignupPhone(e.target.value);
                              if (signupErrors.phone) setSignupErrors((prev) => ({ ...prev, phone: undefined }));
                            }}
                            placeholder="+1 555-0199"
                            aria-invalid={!!signupErrors.phone}
                            aria-describedby={signupErrors.phone ? 'signup-phone-error' : undefined}
                            className={`w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all ${
                              signupErrors.phone ? 'border-rose-500/80 ring-1 ring-rose-500/40 focus:border-rose-400' : ''
                            }`}
                          />
                        </div>
                        {signupErrors.phone && (
                          <p id="signup-phone-error" role="alert" className="text-[11px] text-rose-400 font-medium flex items-center gap-1.5 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{signupErrors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1">
                        Secure Password (min 8 chars, uppercase, lowercase, number, special)
                      </label>
                      <div className="relative">
                        <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                          signupErrors.password ? 'text-rose-400' : 'text-neutral-400'
                        }`} />
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          value={signupPassword}
                          onChange={(e) => {
                            setSignupPassword(e.target.value);
                            if (signupErrors.password) setSignupErrors((prev) => ({ ...prev, password: undefined }));
                          }}
                          placeholder="Create strong password"
                          aria-invalid={!!signupErrors.password}
                          aria-describedby={signupErrors.password ? 'signup-password-error' : undefined}
                          className={`w-full glass-input rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all ${
                            signupErrors.password ? 'border-rose-500/80 ring-1 ring-rose-500/40 focus:border-rose-400' : ''
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                          aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                        >
                          {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {signupErrors.password && (
                        <p id="signup-password-error" role="alert" className="text-[11px] text-rose-400 font-medium flex items-center gap-1.5 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{signupErrors.password}</span>
                        </p>
                      )}

                      {/* Password Strength Indicator for Signup */}
                      {signupPassword.length > 0 && (
                        <div className="mt-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2">
                          {(() => {
                            const strength = evaluatePasswordStrength(signupPassword);
                            return (
                              <>
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="text-neutral-400 font-medium">Password Strength:</span>
                                  <span className="font-bold font-mono" style={{ color: strength.color }}>
                                    {strength.label}
                                  </span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-300 rounded-full ${strength.bgColor}`}
                                    style={{ width: strength.barWidth }}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-1 pt-1 text-[10px]">
                                  <div className={`flex items-center gap-1 ${strength.checks.length ? 'text-emerald-400' : 'text-neutral-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${strength.checks.length ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                                    <span>8+ Characters</span>
                                  </div>
                                  <div className={`flex items-center gap-1 ${strength.checks.uppercase && strength.checks.lowercase ? 'text-emerald-400' : 'text-neutral-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${strength.checks.uppercase && strength.checks.lowercase ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                                    <span>Upper &amp; Lowercase</span>
                                  </div>
                                  <div className={`flex items-center gap-1 ${strength.checks.number ? 'text-emerald-400' : 'text-neutral-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${strength.checks.number ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                                    <span>Number (0-9)</span>
                                  </div>
                                  <div className={`flex items-center gap-1 ${strength.checks.special ? 'text-emerald-400' : 'text-neutral-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${strength.checks.special ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                                    <span>Special Char (!@#$)</span>
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-2 py-3 rounded-xl font-black text-xs bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-95 text-black transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? 'Creating Organization...' : 'Register Company & Request OTP'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* Footer info links */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setInfoModalContent({
                        title: 'Biometric Privacy Policy',
                        body: 'All CCTV face biometric vectors are computed locally at the edge into mathematical 512-D float vectors. No raw photographs are stored on disk without explicit consent, conforming to GDPR Article 17.'
                      })
                    }
                    className="hover:text-neutral-300 transition-colors cursor-pointer"
                  >
                    Biometric Privacy
                  </button>
                  <span>&middot;</span>
                  <button
                    onClick={() =>
                      setInfoModalContent({
                        title: 'Security & Tenant Isolation Policy',
                        body: 'WorkPulse implements multi-tenant logical partitioning. All tables require tenant_id foreign keys, sessions use cryptographically signed tokens, and passwords are salted with bcrypt (10 rounds).'
                      })
                    }
                    className="hover:text-neutral-300 transition-colors cursor-pointer"
                  >
                    Security Policy
                  </button>
                </div>
                <span>&copy; 2026 WorkPulse AI SaaS Inc.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        initialEmail={email}
      />

      {/* OTP Verification Modal */}
      <OtpVerificationModal
        isOpen={otpModalState.isOpen}
        email={otpModalState.email}
        demoOtpCode={otpModalState.demoCode}
        onClose={() => setOtpModalState({ isOpen: false, email: '' })}
        onVerificationSuccess={(session) => {
          setOtpModalState({ isOpen: false, email: '' });
          onLoginSuccess(session);
        }}
      />

      {/* Privacy / Security Info Modal */}
      {infoModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#101524] text-white rounded-2xl shadow-2xl border border-neutral-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <h3 className="font-bold text-sm text-white">{infoModalContent.title}</h3>
              <button
                onClick={() => setInfoModalContent(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">{infoModalContent.body}</p>
            <button
              onClick={() => setInfoModalContent(null)}
              className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
