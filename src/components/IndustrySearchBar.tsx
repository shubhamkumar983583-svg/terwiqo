import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Building2,
  Factory,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Building,
  BookOpen,
  Briefcase,
  Hotel,
  Boxes,
  Utensils,
  HardHat,
  Shield,
  Scissors,
  Network,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Sliders,
  ChevronDown,
  Layers,
  ChevronRight,
  Pill,
  Ban,
  ShieldCheck
} from 'lucide-react';
import {
  type IndustryConfig,
  SUPPORTED_INDUSTRIES,
  findIndustryById
} from '../data/industryRegistry.ts';
import {
  searchIndustriesBilingual,
  getIndustryExcludedTabs,
  getIndustryExcludedReason,
  getIndustryFeatureSummary
} from '../utils/industryFeatureUtils.ts';

// Helper to map icon name to Lucide React component
export function getIndustryIcon(iconName: string): React.ComponentType<{ className?: string }> {
  switch (iconName) {
    case 'Factory':
      return Factory;
    case 'ShoppingBag':
      return ShoppingBag;
    case 'HeartPulse':
      return HeartPulse;
    case 'GraduationCap':
      return GraduationCap;
    case 'Building':
      return Building;
    case 'BookOpen':
      return BookOpen;
    case 'Briefcase':
      return Briefcase;
    case 'Hotel':
      return Hotel;
    case 'Boxes':
      return Boxes;
    case 'Utensils':
      return Utensils;
    case 'HardHat':
      return HardHat;
    case 'Shield':
      return Shield;
    case 'Scissors':
      return Scissors;
    case 'Network':
      return Network;
    case 'Pill':
      return Pill;
    case 'Sparkles':
    default:
      return Sparkles;
  }
}

interface IndustrySearchBarProps {
  currentIndustryId: string;
  onSelectIndustry: (industryId: string) => void;
  isLoading?: boolean;
}

export const IndustrySearchBar: React.FC<IndustrySearchBarProps> = ({
  currentIndustryId,
  onSelectIndustry,
  isLoading = false
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [previewIndustry, setPreviewIndustry] = useState<IndustryConfig | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentConfig = findIndustryById(currentIndustryId);
  const filteredIndustries = searchIndustriesBilingual(query);

  // Matches handwritten items 2-8 from user sketch (IMG_e32ba430.jpg)
  const popularIndustries = [
    'factory',
    'mall',
    'hospital',
    'school',
    'college',
    'construction',
    'medical_store'
  ];

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredIndustries.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredIndustries.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredIndustries.length) {
        handleChooseIndustry(filteredIndustries[selectedIndex]);
      } else if (filteredIndustries.length > 0) {
        handleChooseIndustry(filteredIndustries[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleChooseIndustry = (ind: IndustryConfig) => {
    setPreviewIndustry(ind);
    setIsOpen(false);
  };

  const handleConfirmSwitch = (ind: IndustryConfig) => {
    onSelectIndustry(ind.id);
    setPreviewIndustry(null);
    setQuery('');
  };

  const CurrentIcon = getIndustryIcon(currentConfig.iconName);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto z-30 select-none">
      {/* Prominent Frosted Glass Search Bar Container */}
      <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-[#0F1424]/75 backdrop-blur-2xl border border-white/12 hover:border-white/20 focus-within:border-[#FFA069]/70 focus-within:shadow-[0_0_24px_rgba(255,160,105,0.2)] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.15)] transition-all">
        
        {/* Active Industry Badge Trigger */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            inputRef.current?.focus();
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border border-white/10 text-xs text-white shrink-0 cursor-pointer transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
          title="Click to change active industry"
        >
          <div
            className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
            style={{ backgroundColor: `${currentConfig.accentColor}25`, color: currentConfig.accentColor }}
          >
            <CurrentIcon className="w-3.5 h-3.5" />
          </div>
          <div className="text-left hidden md:block">
            <div className="text-[10px] text-neutral-400 uppercase font-mono font-bold leading-none">
              Active Dashboard
            </div>
            <div className="font-bold text-white text-xs truncate max-w-[130px] leading-tight mt-0.5">
              {currentConfig.shortName}
            </div>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Search Input Field */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Company Search  Q (Factory, Mall, School, Hospital, Construction, Medical Store...)"
            className="w-full bg-transparent pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Switch Action Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shrink-0 cursor-pointer shadow-md shadow-yellow-500/20 disabled:opacity-50"
          disabled={isLoading}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Switch Industry</span>
        </button>
      </div>

      {/* Popular Industry Quick Filter Chips matching user sketch (Items 2-8) */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2 px-1 text-xs no-scrollbar">
        <span className="text-[10px] text-neutral-400 uppercase font-mono font-bold shrink-0">Company Search:</span>
        {popularIndustries.map((indId) => {
          const ind = findIndustryById(indId);
          const Icon = getIndustryIcon(ind.iconName);
          const isSelected = currentIndustryId === ind.id;
          const isSchoolLike = ind.id === 'school' || ind.id === 'college';

          return (
            <button
              key={ind.id}
              onClick={() => handleChooseIndustry(ind)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all shrink-0 cursor-pointer backdrop-blur-md border ${
                isSelected
                  ? 'bg-white/[0.14] text-[#E6FF00] border-[#E6FF00]/60 shadow-[0_0_12px_rgba(230,255,0,0.2)]'
                  : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08] border-white/10 hover:border-white/20'
              }`}
            >
              <Icon className="w-3 h-3 text-inherit" />
              <span>{ind.shortName}</span>
              {isSchoolLike && (
                <span className="text-[9px] text-[#FFA069] font-mono font-normal">
                  (No Payroll)
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Real-time Search Suggestions Dropdown with Frosted Glass */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0D1322]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="p-3 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>
              {filteredIndustries.length} of {SUPPORTED_INDUSTRIES.length} Supported Business Types
            </span>
            <span className="text-neutral-400 hidden sm:inline">Use ↑↓ arrows to navigate, Enter to preview</span>
          </div>

          <div className="max-h-80 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-neutral-800">
            {filteredIndustries.length === 0 ? (
              <div className="p-6 text-center space-y-3">
                <div className="text-xs text-neutral-400">
                  No matching business type found for &ldquo;<span className="text-white font-bold">{query}</span>&rdquo;
                </div>
                <button
                  type="button"
                  onClick={() => handleChooseIndustry(findIndustryById('custom'))}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-[#E6FF00] border border-neutral-700 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Choose Custom Business Baseline</span>
                </button>
              </div>
            ) : (
              filteredIndustries.map((ind, index) => {
                const Icon = getIndustryIcon(ind.iconName);
                const isSelected = index === selectedIndex;
                const isCurrent = currentIndustryId === ind.id;
                const isSchoolOrCollege = ind.id === 'school' || ind.id === 'college';

                return (
                  <div
                    key={ind.id}
                    onClick={() => handleChooseIndustry(ind)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-neutral-800 text-white'
                        : 'hover:bg-neutral-900/60 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-neutral-700/50"
                        style={{ backgroundColor: `${ind.accentColor}15`, color: ind.accentColor }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-xs text-white flex items-center gap-2 flex-wrap">
                          <span>{ind.name}</span>
                          {isCurrent && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                              CURRENT ACTIVE
                            </span>
                          )}
                          {isSchoolOrCollege && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-orange-950/60 text-[#FFA069] border border-orange-500/30">
                              No Payroll Needed
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-400 line-clamp-1">{ind.description}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0D17] border border-neutral-800 text-neutral-400">
                        {ind.badge}
                      </span>
                      <ChevronRight className="w-4 h-4 text-neutral-500" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Step 4: Short Industry Preview Modal with Glassmorphism */}
      {previewIndustry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg bg-[#0F1424]/85 backdrop-blur-2xl text-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(255,160,105,0.1)] border border-white/15 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-full shadow-[0_0_10px]"
                  style={{ backgroundColor: previewIndustry.accentColor, color: previewIndustry.accentColor }}
                />
                <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Industry Preview &middot; {previewIndustry.name}</span>
                </h2>
              </div>
              <button
                onClick={() => setPreviewIndustry(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-left">
              <div className="flex items-start gap-4">
                {(() => {
                  const PreviewIcon = getIndustryIcon(previewIndustry.iconName);
                  return (
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/15 shadow-lg backdrop-blur-md"
                      style={{ backgroundColor: `${previewIndustry.accentColor}25`, color: previewIndustry.accentColor }}
                    >
                      <PreviewIcon className="w-6 h-6 drop-shadow-[0_0_8px_currentColor]" />
                    </div>
                  );
                })()}
                <div>
                  <div className="text-base font-extrabold text-white tracking-tight">{previewIndustry.name}</div>
                  <div className="text-xs text-neutral-300 mt-1 leading-relaxed">{previewIndustry.description}</div>
                </div>
              </div>

              {/* Key Specialized Modules */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono">
                  Specialized Modules &amp; Workflows
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {previewIndustry.keyModules.map((mod) => (
                    <div
                      key={mod}
                      className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs text-neutral-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E6FF00] shrink-0 drop-shadow-[0_0_4px_#E6FF00]" />
                      <span className="truncate">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminology Adaptation Preview */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 space-y-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                <div className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                  Terminology Adaptation
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Staff Role:</span>
                    <span className="font-semibold text-white">{previewIndustry.terminology.employee}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Work Location:</span>
                    <span className="font-semibold text-white">{previewIndustry.terminology.worksite}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Attendance:</span>
                    <span className="font-semibold text-white">{previewIndustry.terminology.checkIn}</span>
                  </div>
                </div>
              </div>

              {/* Customer-Specific Feature Adaptation Callout (जैसे School/College में Payroll की जरूरत नहीं होती) */}
              {(() => {
                const summary = getIndustryFeatureSummary(previewIndustry.id);
                const excluded = getIndustryExcludedTabs(previewIndustry.id);
                return (
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#FFA069] uppercase font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#FFA069]" />
                        <span>Customer Work-Based Features ({summary.activeModules}/21 Active)</span>
                      </span>
                      {excluded.length > 0 && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-orange-950/60 text-[#FFA069] border border-orange-500/30">
                          {excluded.length} Non-Essential Excluded
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300">
                      {summary.headline}
                    </p>
                    {excluded.length > 0 && (
                      <div className="text-[11px] text-orange-200/90 bg-orange-950/30 p-2.5 rounded-xl border border-orange-500/20 space-y-1">
                        <div className="font-semibold flex items-center gap-1.5 text-[#FFA069]">
                          <Ban className="w-3.5 h-3.5 shrink-0" />
                          <span>जैसे School/College में Payroll की जरूरत नहीं होती:</span>
                        </div>
                        <div className="text-[10px] text-neutral-300 pl-5">
                          Module &ldquo;Salary, Payroll &amp; Payslips&rdquo; is automatically hidden from navigation to keep your workspace clean and relevant to your operations.
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPreviewIndustry(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white glass-button transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmSwitch(previewIndustry)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md shadow-yellow-500/25 cursor-pointer"
                >
                  <span>Open {previewIndustry.shortName} Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
