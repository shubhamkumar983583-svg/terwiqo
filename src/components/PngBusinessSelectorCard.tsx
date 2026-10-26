import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  ShoppingBag,
  HeartPulse,
  Factory,
  GraduationCap,
  Building,
  Hotel,
  Boxes,
  Utensils,
  HardHat,
  Shield,
  Scissors,
  Network,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Info,
  Sliders,
  ArrowRight,
  Pill,
  Ban,
  ShieldCheck
} from 'lucide-react';
import { findIndustryById, SUPPORTED_INDUSTRIES, IndustryConfig } from '../data/industryRegistry.ts';
import {
  searchIndustriesBilingual,
  getIndustryExcludedTabs,
  getIndustryFeatureSummary
} from '../utils/industryFeatureUtils.ts';

interface PngBusinessSelectorCardProps {
  currentIndustryId: string;
  onSelectIndustry: (industryId: string) => void;
  className?: string;
}

export const PngBusinessSelectorCard: React.FC<PngBusinessSelectorCardProps> = ({
  currentIndustryId,
  onSelectIndustry,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  // Directly matches handwritten items 2-8 from user diagram (IMG_e32ba430.jpg)
  const screenshotPrimary = [
    {
      id: 'factory',
      name: '2. Factory (फैक्ट्री)',
      subtitle: 'Gates, shifts, overtime & payroll included',
      icon: Factory,
      badge: 'Shifts & Payroll'
    },
    {
      id: 'mall',
      name: '3. Mall & Retail (मॉल)',
      subtitle: 'Stores, cashiers, shifts & entrances',
      icon: ShoppingBag,
      badge: 'Retail Floor'
    },
    {
      id: 'hospital',
      name: '4. Hospital (अस्पताल)',
      subtitle: 'Wards, doctors, 24/7 clinical shifts',
      icon: HeartPulse,
      badge: 'Clinical 24/7'
    },
    {
      id: 'school',
      name: '5. School (स्कूल)',
      subtitle: 'Teachers, bell timetable • No Payroll Needed',
      icon: GraduationCap,
      badge: 'No Payroll Needed'
    },
    {
      id: 'college',
      name: '6. College & University (कॉलेज)',
      subtitle: 'Professors, faculties, labs • No Payroll Needed',
      icon: Building,
      badge: 'No Payroll Needed'
    },
    {
      id: 'construction',
      name: '7. Construction / Side (कन्स्ट्रक्शन / साइड)',
      subtitle: 'Subcontractors, hardhat safety, turnstile pods',
      icon: HardHat,
      badge: 'Safety First'
    },
    {
      id: 'medical_store',
      name: '8. Medical Store (मेडिकल स्टोर)',
      subtitle: 'Licensed pharmacists, medicine counter, cashiers',
      icon: Pill,
      badge: 'Pharma Retail'
    }
  ];

  // Extended list of additional specialized industries
  const additionalIndustries = [
    { id: 'office', name: 'Office & Corporate • ऑफिस', subtitle: 'Desks, hybrid, overtime & payroll', icon: Building, badge: 'Corporate' },
    { id: 'hotel', name: 'Hotel & Hospitality', subtitle: 'Front desk, housekeeping, shifts', icon: Hotel, badge: 'Guest Ready' },
    { id: 'warehouse', name: 'Warehouse & Logistics', subtitle: 'Loading docks, forklifts, shifts', icon: Boxes, badge: 'Logistics' },
    { id: 'restaurant', name: 'Restaurant & Food Service', subtitle: 'Kitchen, dining, split rush', icon: Utensils, badge: 'Food Safe' },
    { id: 'security', name: 'Security Agency', subtitle: 'Patrol officers, posts, handovers', icon: Shield, badge: 'Patrol Active' },
    { id: 'salon', name: 'Salon & Spa', subtitle: 'Stylists, chairs, appointments', icon: Scissors, badge: 'Appointment' },
    { id: 'enterprise', name: 'Multi-Branch Enterprise', subtitle: 'Global subsidiaries, central sync', icon: Network, badge: 'Multi-Region' },
    { id: 'custom', name: 'Custom Business Baseline', subtitle: 'Flexible shifts, custom rules', icon: Sparkles, badge: 'Configurable' }
  ];

  const allItems = [...screenshotPrimary, ...additionalIndustries];

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return showAll ? allItems : screenshotPrimary;
    }
    // Bilingual search matching Hindi keywords (फैक्ट्री, स्कूल, मॉल, अस्पताल, साइड, मेडिकल स्टोर, etc.)
    const matchedConfigs = searchIndustriesBilingual(q);
    const matchedIds = new Set(matchedConfigs.map((c) => c.id));
    return allItems.filter(
      (item) =>
        matchedIds.has(item.id) ||
        item.name.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [searchQuery, showAll]);

  const activeIndustry = findIndustryById(currentIndustryId);
  const activeFeatureSummary = getIndustryFeatureSummary(currentIndustryId);
  const activeExcluded = getIndustryExcludedTabs(currentIndustryId);

  return (
    <div className={`space-y-4 text-left ${className}`}>
      {/* Hindi & English Header Section matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Yeh Dashboard Kaise Kaam Karega?</span>
            <span className="text-xs font-normal text-neutral-400 font-mono hidden sm:inline">
              (How will this dashboard work?)
            </span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Select your industry type to instantly adapt terminology, CCTV rules, shifts, and features.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowWalkthrough(!showWalkthrough)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#121B2F] border border-blue-900/60 text-[#FACC15] hover:bg-[#1A2642] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showWalkthrough ? 'Hide Guide' : 'Dashboard Guide'}</span>
        </button>
      </div>

      {/* Interactive Explanation Box (Bilingual) */}
      {showWalkthrough && (
        <div className="p-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-xs space-y-3 animate-in fade-in duration-200 shadow-xl">
          <div className="font-bold text-[#FACC15] flex items-center gap-2">
            <span>✨ Industry-Aware Architecture Explained:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-neutral-300">
            <div className="p-3 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <div className="font-bold text-white">1. Role &amp; Terminology Adaptation</div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Factory uses &ldquo;Workers &amp; Assembly Bays&rdquo;, Hospital adapts to &ldquo;Physicians, Nurses &amp; Wards&rdquo;, School changes to &ldquo;Faculty &amp; Classes&rdquo;.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <div className="font-bold text-white">2. Specialized AI Telemetry</div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                OSHA PPE &amp; helmet verification for industrial sites, RFID turnstiles for malls/schools, sterile scrub-in tracking for medical wards.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <div className="font-bold text-white">3. Shift &amp; Overtime Rules</div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Day/Night 24/7 rotating rosters, 1.5x overtime wage multipliers, split shifts for hospitality, and bell-schedule periods for education.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Glassmorphic Navy Card matching screenshot_2026-10-19_224845_ede625de.png */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0D1322]/75 backdrop-blur-2xl border border-white/12 shadow-[0_16px_40px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.15)] relative overflow-hidden">
        {/* Ambient luminous glow behind frosted glass */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header matching screenshot */}
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2.5">
            {/* 3-stripe horizontal golden chevron logo from screenshot */}
            <div className="flex flex-col gap-[3px] w-5 shrink-0 py-0.5">
              <div className="h-[2.5px] bg-[#FACC15] rounded-full w-full shadow-[0_0_8px_#FACC15]" />
              <div className="h-[2.5px] bg-[#FACC15] rounded-full w-full shadow-[0_0_8px_#FACC15]" />
              <div className="h-[2.5px] bg-[#FACC15] rounded-full w-full shadow-[0_0_8px_#FACC15]" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              WorkPulse AI
            </h3>
          </div>
          <p className="text-sm font-medium text-slate-300 pt-1">
            What type of business do you manage?
          </p>
        </div>

        {/* Frosted Glass Search Input matching screenshot & user sketch */}
        <div className="mt-4 relative z-10">
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Company Search  Q (Factory, Mall, School, Hospital, Construction, Medical Store...)"
              className="w-full bg-white/[0.08] backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 pl-12 pr-10 py-3.5 rounded-2xl text-sm font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 focus:border-[#FACC15] focus:bg-white/[0.12] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 rounded-full cursor-pointer transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* User-Requested Feature Adaptation Banner (Direct handwritten note from IMG_e32ba430.jpg) */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 border border-orange-500/30 backdrop-blur-xl space-y-1.5 relative z-10 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-[#FFA069] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FFA069]" />
              <span>Customer Ke Kaam Ke Anusar Features (Work-Adaptive System):</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-200 border border-white/15">
              Active: {activeIndustry.name} ({activeFeatureSummary.activeModules}/21 Modules)
            </span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            &ldquo;Search bar se apni company / industry chun sakte hain — <strong className="text-white">Customer ke kaam ke anusar features shamil hon, jaise School / College mein Payroll ki zaroorat nahi hoti ya Salary ki zaroorat nahi hoti hai</strong> (automatically filtered).&rdquo;
          </p>
          {activeExcluded.length > 0 && (
            <div className="pt-1 flex items-center gap-2 text-[10px] font-mono text-[#FFA069]">
              <Ban className="w-3.5 h-3.5 shrink-0" />
              <span>
                Current Profile ({activeIndustry.shortName}): Salary &amp; Payroll modules excluded from sidebar navigation.
              </span>
            </div>
          )}
        </div>

        {/* Grid of Business Types matching screenshot */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative z-10">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isSelected =
              currentIndustryId === item.id ||
              (item.id === 'school' && (currentIndustryId === 'school' || currentIndustryId === 'college'));

            return (
              <div
                key={item.id}
                onClick={() => onSelectIndustry(item.id)}
                className={`p-4 sm:p-4.5 rounded-2xl text-left cursor-pointer transition-all border backdrop-blur-xl ${
                  isSelected
                    ? 'bg-white/[0.12] border-[#FACC15] shadow-[0_0_24px_rgba(250,204,21,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.25)] ring-1 ring-[#FACC15]/50 transform -translate-y-0.5'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]'
                }`}
              >
                <div className="flex items-start justify-between">
                  {/* Yellow Icon */}
                  <div className="text-[#FACC15] mb-2.5 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                        item.badge.includes('No Payroll')
                          ? 'bg-orange-500/15 text-[#FFA069] border-orange-500/30'
                          : 'bg-white/5 text-neutral-300 border-white/10'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/40 shadow-[0_0_8px_rgba(250,204,21,0.3)]">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                <div className="font-bold text-base text-white tracking-tight">
                  {item.name}
                </div>
                <div className="text-xs text-slate-300 mt-0.5 font-medium">
                  {item.subtitle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="mt-5 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-center space-y-2">
            <div className="text-sm text-neutral-300">
              No direct business type found for &ldquo;<span className="text-[#FACC15] font-bold">{searchQuery}</span>&rdquo;
            </div>
            <button
              type="button"
              onClick={() => onSelectIndustry('custom')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#FACC15] hover:bg-yellow-400 text-black transition-colors cursor-pointer shadow-md shadow-yellow-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Use Custom Business Baseline</span>
            </button>
          </div>
        )}

        {/* Expand / Collapse All 15 Business Types Toggle */}
        {!searchQuery && (
          <div className="mt-4 flex items-center justify-between text-xs pt-1 relative z-10">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FACC15] hover:underline cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAll ? 'Show Primary 4 Industries' : 'View All 15 Specialized Business Types'}</span>
            </button>

            <span className="text-[11px] font-mono text-slate-400">
              Current: <strong className="text-white">{activeIndustry.name}</strong>
            </span>
          </div>
        )}

        {/* Footer Note exactly matching screenshot */}
        <div className="mt-5 pt-3.5 border-t border-white/10 text-left relative z-10">
          <p className="text-[11px] sm:text-xs text-slate-400 font-normal">
            Concept preview &mdash; final UI will be integrated into your existing application.
          </p>
        </div>
      </div>
    </div>
  );
};
