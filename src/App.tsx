import React, { useState, useEffect } from 'react';
import { PngSidebar, ActiveTab } from './components/PngSidebar.tsx';
import { PngDashboardView } from './views/PngDashboardView.tsx';
import { PngEmployeeListView } from './views/PngEmployeeListView.tsx';
import { PngSalarySlipView } from './views/PngSalarySlipView.tsx';
import { PngCameraConfigView } from './views/PngCameraConfigView.tsx';
import { PngRoiConfigView } from './views/PngRoiConfigView.tsx';
import { PngLiveAttendanceView } from './views/PngLiveAttendanceView.tsx';
import { PngMultiCameraGridView } from './views/PngMultiCameraGridView.tsx';
import { PngAttendanceRecordsView } from './views/PngAttendanceRecordsView.tsx';
import { PngWorkPoliciesView } from './views/PngWorkPoliciesView.tsx';
import { PngHolidaysView } from './views/PngHolidaysView.tsx';
import { PngDepartmentsView } from './views/PngDepartmentsView.tsx';
import { PngCameraHealthView } from './views/PngCameraHealthView.tsx';
import { AiDocumentOnboardingView } from './views/AiDocumentOnboardingView.tsx';
import { DigitalIdStudioView } from './views/DigitalIdStudioView.tsx';
import { EmployeeWorkWalletView } from './views/EmployeeWorkWalletView.tsx';
import { AiSafetyAlertsView } from './views/AiSafetyAlertsView.tsx';
import { IntegrationsApiView } from './views/IntegrationsApiView.tsx';
import { SubscriptionBillingView } from './views/SubscriptionBillingView.tsx';
import { SecurityAuditView } from './views/SecurityAuditView.tsx';
import { OrgSettingsView } from './views/OrgSettingsView.tsx';
import { IndustryAwareDashboardView } from './views/IndustryAwareDashboardView.tsx';
import { findIndustryById } from './data/industryRegistry.ts';
import { LoginView, UserSession } from './views/LoginView.tsx';
import { TechByteShowcaseView } from './views/TechByteShowcaseView.tsx';
import { TwelveConceptsPlaygroundView } from './views/TwelveConceptsPlaygroundView.tsx';
import { BiometricLogsView } from './views/BiometricLogsView.tsx';
import { NotFound } from './components/ui/not-found-2.tsx';
import {
  INITIAL_EMPLOYEES,
  INITIAL_CAMERAS,
  INITIAL_ATTENDANCE,
  Employee,
  CameraConfig,
  AttendanceRecord
} from './data/mockData.ts';
import {
  Bell,
  Moon,
  Sun,
  User,
  AlertCircle,
  LogOut,
  Shield,
  Sparkles,
  Search
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (params?.get('view') === 'login') return null;
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('workpulse_active_user') : null;
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (params?.get('view') === 'concepts' || params?.get('view') === '12concepts') return 'ui_concepts';
    if (params?.get('view') === 'techbyte' || params?.get('view') === 'website') return 'techbyte';
    return 'dashboard';
  });
  const [isViewingLanding, setIsViewingLanding] = useState(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (params?.get('view') === 'login') return false;
    if (params?.get('view') === 'dashboard') return false;
    return true; // Default to showcase website on root "/" so MorphText & UI/UX are immediately visible
  });
  const [isViewingConcepts, setIsViewingConcepts] = useState(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    return params?.get('view') === 'concepts' || params?.get('view') === '12concepts';
  });
  const [currentIndustryId, setCurrentIndustryId] = useState<string>(() => {
    return localStorage.getItem('workpulse_active_industry') || 'factory';
  });
  const [isSwitchingIndustry, setIsSwitchingIndustry] = useState(false);

  // Application Data States
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [cameras, setCameras] = useState<CameraConfig[]>(INITIAL_CAMERAS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);

  // Restore authenticated session from backend cookie
  useEffect(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (params?.get('view') === 'login') {
      setCurrentUser(null);
      return;
    }

    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated && data.user && data.tenant) {
          const session: UserSession = {
            email: data.user.email,
            name: data.user.name,
            role: data.user.role === 'owner' ? 'org_admin' : data.user.role,
            jobTitle: data.user.job_title || 'Administrator',
            department: data.user.department || 'Executive',
            tenantId: data.tenant.id,
            tenantName: data.tenant.name
          };
          setCurrentUser(session);
          localStorage.setItem('workpulse_active_user', JSON.stringify(session));

          if (data.tenant.industry) {
            setCurrentIndustryId(data.tenant.industry);
            localStorage.setItem('workpulse_active_industry', data.tenant.industry);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Fetch organization industry preference
  useEffect(() => {
    if (currentUser?.tenantId) {
      fetch('/api/organization/industry')
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.industry) {
            setCurrentIndustryId(data.industry);
            localStorage.setItem('workpulse_active_industry', data.industry);
          }
        })
        .catch(() => {});
    }
  }, [currentUser?.tenantId]);

  const handleSelectIndustry = async (newIndustryId: string) => {
    setCurrentIndustryId(newIndustryId);
    localStorage.setItem('workpulse_active_industry', newIndustryId);
    setIsSwitchingIndustry(true);
    try {
      const res = await fetch('/api/organization/industry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industryId: newIndustryId })
      });
      const data = await res.json();
      if (data.success && data.tenant) {
        if (currentUser) {
          setCurrentUser({ ...currentUser, tenantName: data.tenant.name });
        }
      }
    } catch (err) {
      console.warn('Industry persistence notice:', err);
    } finally {
      setIsSwitchingIndustry(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    localStorage.removeItem('workpulse_active_user');
    setCurrentUser(null);
  };

  // Handlers
  const handleAddEmployee = (emp: Employee) => {
    setEmployees([emp, ...employees]);
  };

  const handleUpdateEmployee = (emp: Employee) => {
    setEmployees(employees.map((e) => (e.id === emp.id ? emp : e)));
  };

  const handleSaveCamera = (cam: CameraConfig) => {
    const exists = cameras.some((c) => c.id === cam.id);
    if (exists) {
      setCameras(cameras.map((c) => (c.id === cam.id ? cam : c)));
    } else {
      setCameras([...cameras, cam]);
    }
  };

  const handleDeleteCamera = (id: string) => {
    setCameras(cameras.filter((c) => c.id !== id));
  };

  const handleRecordPunch = (record: AttendanceRecord) => {
    setAttendance([record, ...attendance]);
  };

  // If user signed out or viewing showcase, allow exploring TechByte landing page or 12 Concepts
  if (!currentUser) {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (isViewingConcepts || params?.get('view') === 'concepts' || params?.get('view') === '12concepts') {
      return (
        <TwelveConceptsPlaygroundView
          onBackToDashboard={() => {
            setIsViewingConcepts(false);
            const demoSession: UserSession = {
              email: 'dedaatish@gmail.com',
              name: 'Asif Khan',
              role: 'org_admin',
              jobTitle: 'System Administrator',
              department: 'IT & Infrastructure',
              tenantId: 'tenant-01',
              tenantName: 'Face Recognition Attendance System'
            };
            localStorage.setItem('workpulse_active_user', JSON.stringify(demoSession));
            setCurrentUser(demoSession);
          }}
          onOpenTechByte={() => {
            setIsViewingConcepts(false);
            setIsViewingLanding(true);
          }}
        />
      );
    }

    if (isViewingLanding || params?.get('view') === 'techbyte' || params?.get('view') === 'website') {
      return (
        <TechByteShowcaseView
          onLaunchApp={() => {
            setIsViewingLanding(false);
            const demoSession: UserSession = {
              email: 'dedaatish@gmail.com',
              name: 'Asif Khan',
              role: 'org_admin',
              jobTitle: 'System Administrator',
              department: 'IT & Infrastructure',
              tenantId: 'tenant-01',
              tenantName: 'Face Recognition Attendance System'
            };
            localStorage.setItem('workpulse_active_user', JSON.stringify(demoSession));
            setCurrentUser(demoSession);
          }}
          onOpenLogin={() => {
            setIsViewingLanding(false);
            const url = new URL(window.location.href);
            url.searchParams.delete('view');
            window.history.replaceState({}, '', url.toString());
          }}
          currentTenantName="Face Recognition Attendance System"
        />
      );
    }

    return (
      <LoginView
        onLoginSuccess={(session) => {
          localStorage.setItem('workpulse_active_user', JSON.stringify(session));
          setCurrentUser(session);
        }}
        onExploreLandingPage={() => setIsViewingLanding(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#070913] text-white flex font-sans selection:bg-[#FFA069]/30 relative overflow-hidden">
      {/* Dynamic Ambient Luminous Glow Orbs (Diffuses through frosted glassmorphism layers) */}
      <div className="fixed -top-40 -right-40 w-[680px] h-[680px] bg-[radial-gradient(ellipse_at_center,_rgba(255,160,105,0.18)_0%,_rgba(232,113,60,0.08)_40%,_transparent_70%)] rounded-full blur-3xl pointer-events-none z-0 animate-float-slow" />
      <div className="fixed top-1/3 -left-48 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.12)_0%,_rgba(99,102,241,0.06)_45%,_transparent_70%)] rounded-full blur-3xl pointer-events-none z-0 animate-float-reverse" />
      <div className="fixed -bottom-40 right-1/4 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(199,242,56,0.10)_0%,_rgba(16,185,129,0.05)_40%,_transparent_70%)] rounded-full blur-3xl pointer-events-none z-0 animate-float-slow" />
      <div className="fixed top-2/3 right-10 w-[420px] h-[420px] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.08)_0%,_transparent_65%)] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Subtle Dot Grid for Depth behind frosted glass */}
      <div className="fixed inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />

      {/* Frosted Glass Sidebar with Yellow/Lime Chevron Logo */}
      <PngSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onLogout={handleLogout}
        currentIndustryId={currentIndustryId}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden bg-gradient-to-b from-transparent via-[#090C16]/60 to-[#070912]/80 relative z-10">
        {/* Frosted Glass Top Navbar */}
        <header className="h-14 px-6 glass-header sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#FFA069] font-black text-lg tracking-tight flex items-center gap-1.5 drop-shadow-[0_0_12px_rgba(255,160,105,0.4)]">
              Workforce AI
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7F238] animate-pulse shadow-[0_0_8px_#C7F238]" />
            </span>
            <span className="text-white/20">/</span>
            <span className="text-xs font-bold text-neutral-200 capitalize tracking-wide">
              {activeTab.replace('_', ' ')}
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-[10px] text-neutral-300 font-mono shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7F238] shadow-[0_0_6px_#C7F238]" />
              <span>Org: {currentUser.tenantName}</span>
            </span>

            {/* Active Industry Pill with Direct Switcher access */}
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border border-white/12 text-[10px] text-white font-mono cursor-pointer transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] hover:border-[#FFA069]/40"
              title="Click to open industry switcher"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]"
                style={{ backgroundColor: findIndustryById(currentIndustryId).accentColor }}
              />
              <span className="text-neutral-400">Industry:</span>
              <span className="font-bold text-[#FFA069]">{findIndustryById(currentIndustryId).shortName}</span>
            </button>

            {/* Dedicated Company Search Button matching user sketch (IMG_e32ba430.jpg) */}
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/15 to-yellow-500/15 hover:from-orange-500/30 hover:to-yellow-500/30 backdrop-blur-md border border-[#FFA069]/50 text-[11px] text-white font-mono cursor-pointer transition-all shadow-[0_0_12px_rgba(255,160,105,0.2)] hover:scale-[1.02]"
              title="Company Search Q: Search Industry & Adapt Features"
            >
              <Search className="w-3.5 h-3.5 text-[#FFA069]" />
              <span className="font-bold text-white">Company Search</span>
              <span className="w-4 h-4 rounded-full bg-[#FFA069] text-black text-[10px] font-black flex items-center justify-center">
                Q
              </span>
            </button>

            {/* Glassmorphic Palette Indicator */}
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-orange-500/25 text-[10px] font-mono text-[#FFA069] shadow-[inset_0_1px_0_0_rgba(255,160,105,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFA069] shadow-[0_0_6px_#FFA069]" />
              <span>Glassmorphism &amp; NL Bento Active</span>
            </span>

            {/* Direct Switch to TechByte Website Template */}
            <button
              type="button"
              onClick={() => setActiveTab('techbyte')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/35 hover:to-amber-500/35 backdrop-blur-md border border-orange-500/40 text-[10px] text-[#FFA069] font-mono cursor-pointer transition-all shadow-[0_0_10px_rgba(255,160,105,0.2)] hover:scale-[1.03]"
              title="Inspect TechByte Astro Template Real-Code Converted View"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFA069] animate-pulse" />
              <span className="font-bold">TechByte Website &rarr;</span>
            </button>

            {/* Direct Switch to Website with 12 Concepts Integrated */}
            <button
              type="button"
              onClick={() => setActiveTab('techbyte')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-lime-500/20 to-emerald-500/20 hover:from-lime-500/35 hover:to-emerald-500/35 backdrop-blur-md border border-lime-500/40 text-[10px] text-[#C7F238] font-mono cursor-pointer transition-all shadow-[0_0_10px_rgba(199,242,56,0.2)] hover:scale-[1.03]"
              title="Inspect 12 Interactive UI/UX Conversion Concepts Applied on Website"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C7F238] animate-pulse" />
              <span className="font-bold">12 Concepts on Website ✨</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Critical Alert Badge matching screenshot 9 */}
            <div
              onClick={() => setActiveTab('multi_camera')}
              className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 hover:bg-red-900/60 backdrop-blur-md border border-red-500/40 text-red-300 text-xs font-bold font-mono cursor-pointer transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shadow-[0_0_8px_#ef4444]" />
              <span>Critical Alert: violation detected!</span>
            </div>

            {/* Notification Bell with Badge */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white relative cursor-pointer transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center shadow-[0_0_8px_rgba(220,38,38,0.6)]">
                45
              </span>
            </button>

            {/* User Profile & Sign Out */}
            <div className="flex items-center gap-3 pl-2 border-l border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-sky-500/20 border border-white/20">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden md:block text-left text-xs">
                  <div className="font-bold text-neutral-200">{currentUser.name}</div>
                  <div className="text-[10px] text-neutral-400 font-mono capitalize">
                    {currentUser.role.replace('_', ' ')} &middot; {currentUser.department}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#E6FF00] bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-md border border-white/10 transition-all cursor-pointer shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:border-[#E6FF00]/40"
                title="Sign out of current session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* View Routing Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <IndustryAwareDashboardView
              currentIndustryId={currentIndustryId}
              onSelectIndustry={handleSelectIndustry}
              employees={employees}
              attendance={attendance}
              cameras={cameras}
              onNavigate={(tab) => setActiveTab(tab)}
              tenantName={currentUser.tenantName}
              isSwitching={isSwitchingIndustry}
            />
          )}

          {activeTab === 'employees' && (
            <PngEmployeeListView
              employees={employees}
              onAddEmployee={handleAddEmployee}
              onUpdateEmployee={handleUpdateEmployee}
            />
          )}

          {activeTab === 'ai_onboarding' && (
            <AiDocumentOnboardingView onEmployeeEnrolled={handleAddEmployee} />
          )}

          {activeTab === 'digital_id' && <DigitalIdStudioView />}

          {activeTab === 'departments' && <PngDepartmentsView />}

          {activeTab === 'payroll' && <PngSalarySlipView employees={employees} />}

          {activeTab === 'work_wallet' && (
            <EmployeeWorkWalletView currentUser={currentUser} />
          )}

          {activeTab === 'leave' && <PngHolidaysView />}

          {activeTab === 'breaks' && <PngWorkPoliciesView />}

          {activeTab === 'holidays' && <PngHolidaysView />}

          {activeTab === 'live' && (
            <PngLiveAttendanceView
              employees={employees}
              onRecordPunch={handleRecordPunch}
            />
          )}

          {activeTab === 'attendance' && (
            <PngAttendanceRecordsView records={attendance} />
          )}

          {activeTab === 'biometric_logs' && (
            <BiometricLogsView
              cameras={cameras}
              tenantName={currentUser.tenantName}
              onNavigateToLiveFeed={() => setActiveTab('live')}
            />
          )}

          {activeTab === 'face_enrollment' && <PngRoiConfigView />}

          {activeTab === 'mark_attendance' && (
            <PngLiveAttendanceView
              employees={employees}
              onRecordPunch={handleRecordPunch}
            />
          )}

          {activeTab === 'multi_camera' && <PngMultiCameraGridView />}

          {activeTab === 'ai_alerts' && <AiSafetyAlertsView />}

          {activeTab === 'work_policy' && <PngWorkPoliciesView />}

          {activeTab === 'checkin_policy' && <PngWorkPoliciesView />}

          {activeTab === 'checkout_policy' && <PngWorkPoliciesView />}

          {activeTab === 'camera_settings' && (
            <PngCameraConfigView
              cameras={cameras}
              onSaveCamera={handleSaveCamera}
              onDeleteCamera={handleDeleteCamera}
              onBackToHome={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'roi_settings' && <PngRoiConfigView />}

          {activeTab === 'notifications' && <PngCameraHealthView />}

          {activeTab === 'email_settings' && <PngCameraHealthView />}

          {activeTab === 'integrations' && <IntegrationsApiView />}

          {activeTab === 'billing' && <SubscriptionBillingView />}

          {activeTab === 'security_audit' && <SecurityAuditView />}

          {activeTab === 'org_settings' && (
            <OrgSettingsView currentUser={currentUser} />
          )}

          {activeTab === 'techbyte' && (
            <TechByteShowcaseView
              onLaunchApp={() => setActiveTab('dashboard')}
              onOpenLogin={handleLogout}
              currentTenantName={currentUser.tenantName}
            />
          )}

          {activeTab === 'ui_concepts' && (
            <TwelveConceptsPlaygroundView
              onBackToDashboard={() => setActiveTab('dashboard')}
              onOpenTechByte={() => setActiveTab('techbyte')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
