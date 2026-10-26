import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileCheck,
  CreditCard,
  Video,
  Camera,
  CalendarCheck,
  Clock,
  Calendar,
  DollarSign,
  Wallet,
  Building2,
  ShieldAlert,
  Bell,
  Cpu,
  Receipt,
  ShieldCheck,
  Settings,
  LogOut,
  Search,
  Sparkles,
  Globe,
  Activity,
  Filter,
  Eye,
  EyeOff,
  Ban
} from 'lucide-react';
import {
  getIndustryExcludedTabs,
  getIndustryExcludedReason,
  getIndustryFeatureSummary
} from '../utils/industryFeatureUtils.ts';
import { findIndustryById } from '../data/industryRegistry.ts';

export type ActiveTab =
  | 'dashboard'
  | 'employees'
  | 'ai_onboarding'
  | 'digital_id'
  | 'live'
  | 'camera_settings'
  | 'biometric_logs'
  | 'attendance'
  | 'work_policy'
  | 'leave'
  | 'payroll'
  | 'work_wallet'
  | 'departments'
  | 'ai_alerts'
  | 'notifications'
  | 'integrations'
  | 'billing'
  | 'security_audit'
  | 'org_settings'
  | 'techbyte'
  | 'ui_concepts'
  // Backward compatibility sub-tabs
  | 'breaks'
  | 'holidays'
  | 'face_enrollment'
  | 'mark_attendance'
  | 'checkin_policy'
  | 'checkout_policy'
  | 'roi_settings'
  | 'multi_camera'
  | 'email_settings'
  | 'not_found';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onLogout?: () => void;
  currentIndustryId?: string;
}

interface NavSection {
  number: string;
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  category: string;
}

export const PngSidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onLogout,
  currentIndustryId = 'factory'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByIndustry, setFilterByIndustry] = useState(true);

  const activeIndustry = findIndustryById(currentIndustryId);
  const excludedTabs = getIndustryExcludedTabs(currentIndustryId);
  const featureSummary = getIndustryFeatureSummary(currentIndustryId);

  const SECTIONS: NavSection[] = [
    {
      number: '01',
      id: 'dashboard',
      label: 'Dashboard & Analytics',
      icon: LayoutDashboard,
      category: 'CORE OPERATIONS'
    },
    {
      number: '02',
      id: 'employees',
      label: 'Employee Registration & CRM',
      icon: Users,
      badge: '6 Active',
      category: 'WORKFORCE & IDENTITY'
    },
    {
      number: '03',
      id: 'ai_onboarding',
      label: 'AI Document Onboarding',
      icon: FileCheck,
      badge: 'OCR',
      badgeColor: 'bg-[#E6FF00]/10 text-[#E6FF00] border-[#E6FF00]/30',
      category: 'WORKFORCE & IDENTITY'
    },
    {
      number: '04',
      id: 'digital_id',
      label: 'Digital ID Card Studio',
      icon: CreditCard,
      badge: 'NFC',
      category: 'WORKFORCE & IDENTITY'
    },
    {
      number: '05',
      id: 'live',
      label: 'Attendance & Verification Engine',
      icon: Video,
      badge: 'Live',
      badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/30',
      category: 'ATTENDANCE & SURVEILLANCE'
    },
    {
      number: '06',
      id: 'camera_settings',
      label: 'Live CCTV & Camera Config',
      icon: Camera,
      badge: '6 Cams',
      category: 'ATTENDANCE & SURVEILLANCE'
    },
    {
      number: '07',
      id: 'biometric_logs',
      label: 'Biometric Logs',
      icon: Activity,
      badge: 'CCTV AUDIT',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      category: 'ATTENDANCE & SURVEILLANCE'
    },
    {
      number: '08',
      id: 'attendance',
      label: 'Attendance Records & Reports',
      icon: CalendarCheck,
      category: 'ATTENDANCE & SURVEILLANCE'
    },
    {
      number: '09',
      id: 'work_policy',
      label: 'Shift & Check-in Policies',
      icon: Clock,
      category: 'HR POLICIES'
    },
    {
      number: '10',
      id: 'leave',
      label: 'Leave, Holidays & Breaks',
      icon: Calendar,
      category: 'HR POLICIES'
    },
    {
      number: '11',
      id: 'payroll',
      label: 'Salary, Payroll & Payslips',
      icon: DollarSign,
      category: 'FINANCIAL & REWARDS'
    },
    {
      number: '12',
      id: 'work_wallet',
      label: 'Employee Work Wallet',
      icon: Wallet,
      badge: 'Self-Service',
      category: 'FINANCIAL & REWARDS'
    },
    {
      number: '13',
      id: 'departments',
      label: 'Departments & Branches',
      icon: Building2,
      category: 'ORGANIZATION'
    },
    {
      number: '14',
      id: 'ai_alerts',
      label: 'AI Safety Alerts & Incidents',
      icon: ShieldAlert,
      badge: '4 Alert',
      badgeColor: 'bg-red-950 text-red-400 border-red-500/40',
      category: 'INTELLIGENCE & AUDIT'
    },
    {
      number: '15',
      id: 'notifications',
      label: 'Notifications & Email',
      icon: Bell,
      category: 'INTELLIGENCE & AUDIT'
    },
    {
      number: '16',
      id: 'integrations',
      label: 'Integrations & API',
      icon: Cpu,
      badge: 'REST',
      category: 'ENTERPRISE & SYSTEM'
    },
    {
      number: '17',
      id: 'billing',
      label: 'Subscription & Billing',
      icon: Receipt,
      category: 'ENTERPRISE & SYSTEM'
    },
    {
      number: '18',
      id: 'security_audit',
      label: 'Security, Roles & Audit Logs',
      icon: ShieldCheck,
      category: 'ENTERPRISE & SYSTEM'
    },
    {
      number: '19',
      id: 'org_settings',
      label: 'Organization Settings',
      icon: Settings,
      category: 'ENTERPRISE & SYSTEM'
    },
    {
      number: '20',
      id: 'techbyte',
      label: 'TechByte Website & Astro Template',
      icon: Globe,
      badge: 'LIVE SITE',
      badgeColor: 'text-[#FFA069] bg-orange-500/10 border-orange-500/30',
      category: 'ENTERPRISE & SYSTEM'
    },
    {
      number: '21',
      id: 'ui_concepts',
      label: '12 UI/UX Concepts Suite',
      icon: Sparkles,
      badge: 'MADE TO SCALE',
      badgeColor: 'text-[#C7F238] bg-lime-500/10 border-lime-500/30',
      category: 'ENTERPRISE & SYSTEM'
    }
  ];

  // Filter sections based on search AND active industry configuration
  // Direct fulfillment of user sketch: School/College में Payroll की जरूरत नहीं होती
  const filteredSections = SECTIONS.filter((s) => {
    if (filterByIndustry && excludedTabs.includes(s.id)) {
      return false;
    }
    if (searchQuery.trim()) {
      return (
        s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.number.includes(searchQuery)
      );
    }
    return true;
  });

  // Group sections by category
  const categories = Array.from(new Set(filteredSections.map((s) => s.category)));

  return (
    <aside className="w-68 bg-[#090C16]/75 backdrop-blur-2xl text-white shrink-0 min-h-screen flex flex-col justify-between border-r border-white/10 select-none z-20 shadow-[8px_0_32px_rgba(0,0,0,0.4)]">
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-thin scrollbar-thumb-white/10 space-y-4">
        {/* Brand / Logo */}
        <div
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group pb-2"
        >
          <div className="w-9 h-9 rounded-xl bg-black/60 border border-[#C7F238]/80 flex items-center justify-center font-black text-[#C7F238] text-lg shadow-[0_0_16px_rgba(199,242,56,0.35)] group-hover:scale-105 transition-transform">
            &gt;
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              <span>Workforce AI</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] backdrop-blur-md text-[#FFA069] border border-[#FFA069]/40 font-bold shadow-[0_0_8px_rgba(255,160,105,0.2)]">
                {filterByIndustry && excludedTabs.length > 0 ? `${featureSummary.activeModules} MODULES` : '21 MODULES'}
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 font-medium truncate max-w-[150px]">
              {activeIndustry.shortName} Workspace
            </div>
          </div>
        </div>

        {/* Quick Filter Search with Frosted Glass Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${filterByIndustry && excludedTabs.length > 0 ? featureSummary.activeModules : 21} sections...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-400 focus:outline-none"
          />
        </div>

        {/* Industry Feature Filter Banner (School/College Payroll Exclusion) */}
        {excludedTabs.length > 0 && (
          <div className="p-2.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-orange-500/30 text-[10px] space-y-1 shadow-[inset_0_1px_0_0_rgba(255,160,105,0.15)]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#FFA069] flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#FFA069]" />
                <span>{activeIndustry.shortName} Mode</span>
              </span>
              <button
                type="button"
                onClick={() => setFilterByIndustry(!filterByIndustry)}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                title="Toggle payroll visibility"
              >
                {filterByIndustry ? (
                  <>
                    <EyeOff className="w-2.5 h-2.5 text-[#FFA069]" />
                    <span>Payroll Excluded</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-2.5 h-2.5 text-neutral-400" />
                    <span>Show All 21</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-neutral-400 text-[9px] leading-tight">
              {filterByIndustry
                ? `जैसे School/College में Payroll/Salary की जरूरत नहीं होती`
                : `Showing all modules (${excludedTabs.length} non-essential marked)`}
            </div>
          </div>
        )}

        {/* Categorized Navigation List */}
        <div className="space-y-4 text-left">
          {categories.map((cat) => (
            <div key={cat} className="space-y-1">
              <div className="text-[10px] font-bold font-mono tracking-wider text-neutral-400 uppercase px-2">
                {cat}
              </div>

              <nav className="space-y-1">
                {filteredSections
                  .filter((s) => s.category === cat)
                  .map((section) => {
                    const Icon = section.icon;
                    const isActive = activeTab === section.id;

                    return (
                      <button
                        key={section.id}
                        onClick={() => onSelectTab(section.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                          isActive
                            ? 'bg-white/[0.09] backdrop-blur-md text-[#FFA069] border border-[#FFA069]/40 shadow-[0_4px_16px_rgba(255,160,105,0.15)] shadow-inner'
                            : 'text-neutral-300 hover:bg-white/[0.04] hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className={`font-mono text-[10px] w-4 text-right shrink-0 ${
                              isActive ? 'text-[#C7F238] font-black drop-shadow-[0_0_6px_#c7f238]' : 'text-neutral-500'
                            }`}
                          >
                            {section.number}
                          </span>
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#FFA069]' : 'text-neutral-400'}`} />
                          <span className="truncate">{section.label}</span>
                        </div>

                        {section.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded backdrop-blur-md shrink-0 border ${
                              section.badgeColor || 'bg-white/[0.05] text-neutral-300 border-white/10'
                            }`}
                          >
                            {section.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User / Logout Strip with Frosted Glass */}
      <div className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-neutral-300 hover:text-white glass-button hover:border-[#E6FF00]/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-[#E6FF00]" />
            <span>Sign Out Session</span>
          </button>
        )}
      </div>
    </aside>
  );
};
