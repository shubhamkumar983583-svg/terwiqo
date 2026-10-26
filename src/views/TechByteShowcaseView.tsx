import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  X,
  Check,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Camera,
  ShieldCheck,
  Cpu,
  CreditCard,
  Users,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Layers,
  Activity,
  ChevronRight,
  ChevronLeft,
  Search,
  Menu,
  ArrowUp,
  Star,
  Building2,
  Eye,
  Lock,
  Monitor,
  Radio,
  FileText,
  Globe,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import {
  TECHBYTE_PROJECTS,
  TECHBYTE_SERVICES,
  TECHBYTE_TESTIMONIALS,
  TECHBYTE_POSTS,
  filterProjectsByCategory,
  searchProjects,
  TechByteProject,
  TechBytePost
} from '../utils/techbyte.ts';

// 12 Interactive UI/UX Conversion Concept Enhancements
import { ConceptWordRotator } from '../components/concepts/ConceptWordRotator.tsx';
import { ConceptHeroReveal } from '../components/concepts/ConceptHeroReveal.tsx';
import { ConceptSalePings } from '../components/concepts/ConceptSalePings.tsx';
import { ConceptCountUpStats } from '../components/concepts/ConceptCountUpStats.tsx';
import { ConceptBentoGrid } from '../components/concepts/ConceptBentoGrid.tsx';
import { ConceptProcessDraw } from '../components/concepts/ConceptProcessDraw.tsx';
import { ConceptBeforeAfter } from '../components/concepts/ConceptBeforeAfter.tsx';
import { ConceptReviewShuffle } from '../components/concepts/ConceptReviewShuffle.tsx';
import { ConceptPriceRoll } from '../components/concepts/ConceptPriceRoll.tsx';
import { ConceptUsVsThem } from '../components/concepts/ConceptUsVsThem.tsx';
import { ConceptClickSuccess } from '../components/concepts/ConceptClickSuccess.tsx';
import { ConceptEnhancementsHeaderBar } from '../components/concepts/ConceptEnhancementsHeaderBar.tsx';
import { MorphTextShowcaseSection } from '../components/MorphTextShowcaseSection.tsx';
import { MorphText, MyHero, CustomMorph } from '@/components/ui/morph-text';
import { FreeTrialModal } from '../components/modals/FreeTrialModal.tsx';
import { BookDemoModal } from '../components/modals/BookDemoModal.tsx';

interface TechByteShowcaseViewProps {
  onLaunchApp?: () => void;
  onOpenLogin?: () => void;
  currentTenantName?: string;
}

export const TechByteShowcaseView: React.FC<TechByteShowcaseViewProps> = ({
  onLaunchApp,
  onOpenLogin,
  currentTenantName = 'Face Recognition Attendance System'
}) => {
  // Navigation & Drawer states
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Hero slider active index
  const [activeSlide, setActiveSlide] = useState(0);

  // Hero interactive MorphText mode ('standard' | 'myhero' | 'custommorph')
  const [heroMorphMode, setHeroMorphMode] = useState<'standard' | 'myhero' | 'custommorph'>('standard');

  // Projects category filter
  const [selectedCategory, setSelectedCategory] = useState<TechByteProject['category'] | 'all'>('all');
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [selectedProjectModal, setSelectedProjectModal] = useState<TechByteProject | null>(null);

  // Video modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Free trial and demo walkthrough modals
  const [isFreeTrialModalOpen, setIsFreeTrialModalOpen] = useState(false);
  const [isBookDemoModalOpen, setIsBookDemoModalOpen] = useState(false);

  // Blog modal
  const [selectedPostModal, setSelectedPostModal] = useState<TechBytePost | null>(null);

  // Pricing duration toggle
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Interactive solutions active tab
  const [activeSolutionTab, setActiveSolutionTab] = useState<'manufacturing' | 'healthcare' | 'retail' | 'enterprise'>('manufacturing');

  // Cursor follower state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  // Scroll listener for sticky header and back to top
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);
      setShowBackToTop(scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track cursor position for smooth custom cursor follower
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto slide ticker for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProjects = searchProjects(
    filterProjectsByCategory(TECHBYTE_PROJECTS, selectedCategory),
    projectSearchQuery
  );

  const heroSlides = [
    {
      badge: 'NEXT-GENERATION IT & WORKFORCE INTELLIGENCE',
      title: 'Your Workforce. One Smarter System.',
      subheadHindi: 'Attendance से HR management तक—सब कुछ एक जगह।',
      highlight: 'One Smarter System',
      description:
        'Manage employee records, shifts, leave, digital IDs and attendance workflows with a single workforce platform. Add geofencing and compatible CCTV verification where your business needs them.',
      trustBadges: '14-Day Free Trial · Transparent Pricing · No Hardware Replacement Promise',
      reassurance: 'See how it works with your team before choosing a paid plan.',
      metric1: '14ms',
      metric1Label: 'Biometric Match Latency',
      metric2: '99.8%',
      metric2Label: 'Recognition Accuracy',
      metric3: '15+ Sectors',
      metric3Label: 'Adaptive Workflows'
    },
    {
      badge: 'ENTERPRISE MULTI-TENANCY & DATA ISOLATION',
      title: 'PostgreSQL Row-Level Partitioning & Cryptographic Session Security',
      highlight: 'Row-Level Partitioning',
      description:
        'Architected for high-compliance manufacturing plants, government agencies, and multi-branch hospital chains with salted bcrypt hashing and SOC 2 / GDPR compliance.',
      metric1: '100%',
      metric1Label: 'Data Isolation',
      metric2: '0.00ms',
      metric2Label: 'Cross-Tenant Leakage',
      metric3: '24/7',
      metric3Label: 'NOC Surveillance'
    },
    {
      badge: 'AUTOMATED COMPLIANCE & PAYROLL SYNCHRONIZATION',
      title: 'One-Click Salary Slips, Overtime Premiums & Dynamic QR Access',
      highlight: 'Dynamic QR Access',
      description:
        'Eliminate manual punch fraud and badge-sharing bottlenecks with 90-second rotating HMAC-SHA256 passes and automated 1.5x overtime wage disbursement.',
      metric1: '+40%',
      metric1Label: 'Efficiency Growth',
      metric2: '1,200',
      metric2Label: 'Punches / Minute',
      metric3: '$6,110',
      metric3Label: 'Avg Verified Wage'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-neutral-100 font-sans selection:bg-[#FFA069]/30 relative overflow-x-hidden">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="fixed -top-40 -right-40 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(255,160,105,0.18)_0%,_rgba(232,113,60,0.06)_40%,_transparent_75%)] rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/3 -left-48 w-[650px] h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.12)_0%,_rgba(199,242,56,0.06)_45%,_transparent_75%)] rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed -bottom-40 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(255,160,105,0.10)_0%,_transparent_70%)] rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />

      {/* Interactive Cursor Follower (Matching .cursor-follower in screenshot) */}
      <div
        className="pointer-events-none fixed z-50 rounded-full transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 border border-[#FFA069]/60 shadow-[0_0_15px_rgba(255,160,105,0.4)] hidden md:block"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: isHoveringInteractive ? '48px' : '22px',
          height: isHoveringInteractive ? '48px' : '22px',
          backgroundColor: isHoveringInteractive ? 'rgba(255, 160, 105, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(2px)'
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 1. TOP BAR (<div class="topbar bg-theme-dark"> in screenshot)            */}
      {/* ========================================================================= */}
      <div className="topbar bg-[#060810] border-b border-white/5 py-2 px-4 sm:px-8 text-[11px] text-neutral-400 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#FFA069]" />
              <span>+1 (800) 555-TECH / +1 (800) 902-WORK</span>
            </div>
            <span className="hidden sm:inline text-white/20">&middot;</span>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#C7F238]" />
              <span>enterprise@workpulse.ai</span>
            </div>
            <span className="hidden md:inline text-white/20">&middot;</span>
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Silicon Valley HQ &middot; 450 Innovation Parkway</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Clock className="w-3 h-3 text-[#FFA069]" />
              <span>CCTV NOC 24/7 Monitoring Active</span>
            </div>
            <span className="text-white/20">&middot;</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-[10px]">
              SYSTEMS NORMAL
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STICKY HEADER (<header class="header ... sticky ..."> in screenshot) */}
      {/* ========================================================================= */}
      <header
        className={`header group/header sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090C16]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-[#070913]/70 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black/60 border border-[#C7F238] flex items-center justify-center font-black text-[#C7F238] text-xl shadow-[0_0_15px_rgba(199,242,56,0.35)]">
              &gt;
            </div>
            <div>
              <div className="font-black text-lg tracking-tight text-white flex items-center gap-2">
                TechByte
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] backdrop-blur-md text-[#FFA069] border border-[#FFA069]/40 font-bold">
                  WorkPulse AI
                </span>
              </div>
              <div className="text-[10px] text-neutral-400 font-medium">
                Enterprise CCTV &amp; Workforce Architecture
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-neutral-300">
            <a href="#hero-two-slider" className="hover:text-[#FFA069] transition-colors">
              Home
            </a>
            <a href="#morph-text-showcase" className="text-[#FFA069] hover:text-orange-300 transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FFA069]" />
              <span>MorphText</span>
            </a>
            <a href="#services" className="hover:text-[#FFA069] transition-colors">
              Services
            </a>
            <a href="#projects" className="hover:text-[#FFA069] transition-colors">
              Projects &amp; Case Studies
            </a>
            <a href="#architecture" className="hover:text-[#FFA069] transition-colors">
              Architecture
            </a>
            <a href="#pricing" className="hover:text-[#FFA069] transition-colors">
              Pricing Tiers
            </a>
            <a href="#insights" className="hover:text-[#FFA069] transition-colors">
              Tech Insights
            </a>
            <a
              href="?view=concepts"
              onClick={(e) => {
                e.preventDefault();
                const url = new URL(window.location.href);
                url.searchParams.set('view', 'concepts');
                window.location.href = url.toString();
              }}
              className="text-[#C7F238] hover:text-lime-300 transition-colors flex items-center gap-1 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C7F238]" />
              <span>12 Concepts</span>
            </a>
            <a href="#contact" className="hover:text-[#FFA069] transition-colors">
              Contact
            </a>
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFreeTrialModalOpen(true)}
              className="hidden md:inline-flex px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-md shadow-orange-500/20 hover:opacity-95 transition-all cursor-pointer items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" />
              <span>14-Day Trial</span>
            </button>

            {onOpenLogin && (
              <button
                type="button"
                onClick={onOpenLogin}
                className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-bold text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}

            {onLaunchApp && (
              <button
                type="button"
                onClick={onLaunchApp}
                className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-95 text-black shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center gap-1.5 hover:scale-[1.02]"
              >
                <span>Launch Live App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsOffcanvasOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-white cursor-pointer"
              aria-label="Open offcanvas navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. OFFCANVAS MOBILE DRAWER (#offcanvas-main in screenshot)                */}
      {/* ========================================================================= */}
      {isOffcanvasOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsOffcanvasOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Offcanvas Drawer Container */}
          <div className="relative ml-auto w-full max-w-sm bg-[#0C0F1D] text-white p-6 shadow-2xl border-l border-white/10 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-black border border-[#C7F238] flex items-center justify-center font-black text-[#C7F238] text-sm">
                    &gt;
                  </div>
                  <span className="font-extrabold text-sm text-white">TechByte Astro Navigation</span>
                </div>
                <button
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 space-y-3 text-sm font-bold">
                <a
                  href="#hero-two-slider"
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-white/[0.06] text-neutral-200 hover:text-[#FFA069]"
                >
                  Home (Hero Two Slider)
                </a>
                <a
                  href="#morph-text-showcase"
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="block px-3 py-2 rounded-xl bg-orange-500/10 border border-[#FFA069]/30 text-[#FFA069] font-bold"
                >
                  MorphText Interactive UI (MyHero &amp; CustomMorph)
                </a>
                <a
                  href="#services"
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-white/[0.06] text-neutral-200 hover:text-[#FFA069]"
                >
                  Services &amp; Capabilities
                </a>
                <a
                  href="#projects"
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-white/[0.06] text-neutral-200 hover:text-[#FFA069]"
                >
                  Projects &amp; Case Studies
                </a>
                <a
                  href="#architecture"
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-white/[0.06] text-neutral-200 hover:text-[#FFA069]"
                >
                  Multi-Tenant Architecture
                </a>
                <a
                  href="#pricing"
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-white/[0.06] text-neutral-200 hover:text-[#FFA069]"
                >
                  Pricing Tiers
                </a>
                <a
                  href="#insights"
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-white/[0.06] text-neutral-200 hover:text-[#FFA069]"
                >
                  TechByte Articles
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-white/[0.06] text-neutral-200 hover:text-[#FFA069]"
                >
                  Contact &amp; 24/7 NOC
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              {onLaunchApp && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOffcanvasOpen(false);
                    onLaunchApp();
                  }}
                  className="w-full py-3 rounded-xl font-black text-xs bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                >
                  <span>Launch Live HRMS Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {onOpenLogin && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOffcanvasOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white"
                >
                  Sign In to Enterprise Workspace
                </button>
              )}
              <div className="text-[11px] text-neutral-400 text-center font-mono pt-2">
                &copy; 2026 TechByte &middot; WorkPulse AI SaaS
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12 Interactive UI/UX Conversion Concepts Header Bar */}
      <ConceptEnhancementsHeaderBar />

      {/* ========================================================================= */}
      {/* 4. MAIN CONTENT AREA (<main> in screenshot)                               */}
      {/* ========================================================================= */}
      <main>
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION TWO (<section class="hero-section-two ...">)       */}
        {/* ========================================================================= */}
        <section
          id="hero-two-slider"
          className="hero-section-two relative z-0 overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 px-4 sm:px-8 border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto">
            {/* Slide Controller Switcher & MorphText Hero Mode */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveSlide(idx);
                      setHeroMorphMode('standard');
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      heroMorphMode === 'standard' && activeSlide === idx
                        ? 'w-10 bg-[#FFA069]'
                        : 'w-3 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Switch to hero slide ${idx + 1}`}
                  />
                ))}
                <span className="text-[10px] font-mono text-neutral-400 ml-2">
                  0{activeSlide + 1} / 03 &middot; Active Slide
                </span>
              </div>

              {/* Quick Hero Mode Toggles */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setHeroMorphMode('standard')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    heroMorphMode === 'standard'
                      ? 'bg-[#FFA069] text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Standard Hero
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMorphMode('myhero')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    heroMorphMode === 'myhero'
                      ? 'bg-[#C7F238] text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="cycles CREATE / DESIGN / DEVELOP"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>MyHero</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMorphMode('custommorph')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    heroMorphMode === 'custommorph'
                      ? 'bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="cycles INNOVATE / BUILD / SHIP (2500ms)"
                >
                  <Play className="w-3 h-3" />
                  <span>CustomMorph</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Headline & Action Triggers */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#FFA069]/30 text-[#FFA069] text-xs font-semibold shadow-[inset_0_1px_0_0_rgba(255,160,105,0.15)]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {heroMorphMode === 'myhero'
                      ? 'MORPH TEXT &middot; DEFAULT CYCLES CREATE / DESIGN / DEVELOP'
                      : heroMorphMode === 'custommorph'
                      ? 'CUSTOM MORPH &middot; 2500MS CYCLE &middot; INNOVATE / BUILD / SHIP'
                      : heroSlides[activeSlide].badge}
                  </span>
                </div>

                {heroMorphMode === 'myhero' ? (
                  <div className="p-4 sm:p-6 rounded-3xl bg-black/40 border border-[#C7F238]/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <MyHero />
                  </div>
                ) : heroMorphMode === 'custommorph' ? (
                  <div className="p-4 sm:p-6 rounded-3xl bg-black/40 border border-[#FFA069]/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <CustomMorph />
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
                          Your Workforce.{' '}
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA069] via-amber-200 to-[#C7F238]">
                            One Smarter System.
                          </span>
                        </h1>
                        <ConceptWordRotator />
                      </div>

                      {/* Bilingual Sub-headline requested by user */}
                      <div className="text-base sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFA069] via-amber-200 to-[#C7F238] tracking-tight">
                        Attendance से HR management तक—सब कुछ एक जगह।
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl font-normal">
                      Manage employee records, shifts, leave, digital IDs and attendance workflows with a single workforce platform. Add geofencing and compatible CCTV verification where your business needs them.
                    </p>

                    {/* Trust Badges: 14-Day Free Trial · Transparent Pricing · No Hardware Replacement Promise */}
                    <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3.5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-semibold text-neutral-200 backdrop-blur-md shadow-sm">
                      <span className="flex items-center gap-1.5 text-[#C7F238] font-bold">
                        <Sparkles className="w-3.5 h-3.5" /> 14-Day Free Trial
                      </span>
                      <span className="text-white/20">&middot;</span>
                      <span className="flex items-center gap-1.5 text-[#FFA069] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Transparent Pricing
                      </span>
                      <span className="text-white/20">&middot;</span>
                      <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                        <Cpu className="w-3.5 h-3.5" /> No Hardware Replacement Promise
                      </span>
                    </div>
                  </>
                )}

                {/* Call to Action Buttons: [Start Free Trial] [Book a Demo] */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFreeTrialModalOpen(true)}
                    className="px-6 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-95 text-black shadow-xl shadow-orange-500/30 flex items-center gap-2.5 transition-all cursor-pointer hover:scale-[1.02]"
                    title="Start 14-Day Free Trial"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsBookDemoModalOpen(true)}
                    className="px-5 py-3.5 rounded-2xl font-bold text-sm bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white flex items-center gap-2.5 transition-all cursor-pointer backdrop-blur-md hover:border-[#C7F238]/50 shadow-md"
                    title="Book a Live Product Demo"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C7F238] text-black flex items-center justify-center">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                    <span>Book a Demo</span>
                  </button>

                  {onLaunchApp && (
                    <button
                      type="button"
                      onClick={onLaunchApp}
                      className="px-4 py-3 rounded-2xl text-xs font-bold text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Activity className="w-3.5 h-3.5 text-[#C7F238]" />
                      <span>Live App</span>
                    </button>
                  )}
                </div>

                {/* Reassurance footnote requested by user */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 italic pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>See how it works with your team before choosing a paid plan.</span>
                </div>

                {/* Hero Metrics Row */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="text-2xl font-black text-white font-mono text-[#C7F238] drop-shadow-[0_0_8px_#c7f238]">
                      {heroSlides[activeSlide].metric1}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-medium">
                      {heroSlides[activeSlide].metric1Label}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="text-2xl font-black text-white font-mono text-[#FFA069] drop-shadow-[0_0_8px_rgba(255,160,105,0.4)]">
                      {heroSlides[activeSlide].metric2}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-medium">
                      {heroSlides[activeSlide].metric2Label}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="text-2xl font-black text-white font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                      {heroSlides[activeSlide].metric3}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-medium">
                      {heroSlides[activeSlide].metric3Label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Concept 01 Hero Reveal & Concept 07 Cursor Tour */}
              <div className="lg:col-span-5 relative">
                <ConceptHeroReveal
                  currentTenantName={currentTenantName}
                  onExploreArchitecture={() => {
                    const el = document.getElementById('services');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: 4-FEATURE CAPABILITY RIBBON (<section class="relative">)        */}
        {/* ========================================================================= */}
        <section className="relative py-10 px-4 sm:px-8 border-b border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 text-[#FFA069] flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Sub-15ms Edge AI</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  512-D cosine embedding vectors matched without sending raw photos to cloud.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">PostgreSQL Multi-Tenancy</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Row-level tenant isolation preventing cross-organization data leakage.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Automated Payroll Slips</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Real-time overtime premiums, deduction calculations, and instant pay slip exports.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Dynamic QR &amp; Geofencing</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  90-second rotating HMAC passes and Haversine perimeter bounds protection.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE UI/UX COMPONENT: MORPH TEXT SHOWCASE (MyHero & CustomMorph)   */}
        {/* ========================================================================= */}
        <MorphTextShowcaseSection />

        {/* ========================================================================= */}
        {/* SECTION 3: SERVICES & BENTO GRID (<section id="services">)                */}
        {/* ========================================================================= */}
        <section id="services" className="relative py-20 px-4 sm:px-8 border-b border-white/5">
          <div className="max-w-7xl mx-auto text-left space-y-16">
            {/* Concept 06: Bento Build Architecture Grid */}
            <ConceptBentoGrid />

            {/* Additional Modular Capabilities Catalog */}
            <div className="space-y-6 pt-10 border-t border-white/10">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#FFA069]/30 text-[#FFA069] text-xs font-bold font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>EXTENDED CAPABILITY CATALOG</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Additional Enterprise Turnstile &amp; Cloud Workflows
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TECHBYTE_SERVICES.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FFA069]/50 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between group shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-neutral-900 border border-orange-500/30 text-[#FFA069] flex items-center justify-center font-bold">
                          <Layers className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#C7F238]">
                          {srv.highlight}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#FFA069] transition-colors">
                          {srv.title}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                          {srv.description}
                        </p>
                      </div>
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        {srv.features.map((feat, fidx) => (
                          <div key={fidx} className="flex items-center gap-2 text-xs text-neutral-300">
                            <Check className="w-3.5 h-3.5 text-[#C7F238] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-6">
                      {onLaunchApp && (
                        <button
                          type="button"
                          onClick={onLaunchApp}
                          className="text-xs font-bold text-[#FFA069] group-hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <span>Inspect in Active App</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: CONCEPT 05 COUNT-UP STATS                                       */}
        {/* ========================================================================= */}
        <section className="bg-[#05070E] py-16 px-4 sm:px-8 border-b border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <ConceptCountUpStats />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: CONCEPT 08 PROCESS DRAW & CONCEPT 09 BEFORE/AFTER              */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-8 border-b border-white/5 relative bg-white/[0.005]">
          <div className="max-w-7xl mx-auto space-y-14">
            {/* Concept 08: Process Draw Pipeline */}
            <ConceptProcessDraw />

            {/* Concept 09: Before / After Comparison Slider */}
            <ConceptBeforeAfter />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: PROJECTS SHOWCASE (ProjectsSection.astro in screenshot)        */}
        {/* ========================================================================= */}
        <section id="projects" className="py-20 px-4 sm:px-8 border-b border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto text-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#FFA069]/30 text-[#FFA069] text-xs font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>PROJECTS &amp; DEPLOYMENTS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Proven Enterprise Implementations Across Critical Sectors
                </h2>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={projectSearchQuery}
                  onChange={(e) => setProjectSearchQuery(e.target.value)}
                  placeholder="Search project or tag..."
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'manufacturing', label: 'Manufacturing & Plants' },
                { id: 'healthcare', label: 'Healthcare & Hospitals' },
                { id: 'retail', label: 'Retail & Multi-Branch Malls' },
                { id: 'enterprise', label: 'Corporate Enterprise HQ' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-md shadow-orange-500/20 font-black'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-[#0B0F1C]/80 border border-white/10 overflow-hidden hover:border-[#FFA069]/40 transition-all duration-300 shadow-xl group hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#FFA069] border border-[#FFA069]/40">
                      {proj.categoryLabel}
                    </span>
                    <div className="absolute bottom-3 right-3 text-right">
                      <div className="text-lg font-black text-[#C7F238] font-mono drop-shadow-[0_0_8px_#c7f238]">
                        {proj.impactMetric}
                      </div>
                      <div className="text-[9px] text-neutral-300 font-mono">{proj.impactLabel}</div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 text-left">
                    <div className="text-[11px] text-neutral-400 font-mono flex items-center justify-between">
                      <span>Client: {proj.client}</span>
                      <span>{proj.year}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#FFA069] transition-colors leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {proj.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tags.map((t, tidx) => (
                        <span
                          key={tidx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 border border-white/5"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectModal(proj)}
                        className="text-xs font-bold text-[#FFA069] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>View Project Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {onLaunchApp && (
                        <button
                          type="button"
                          onClick={onLaunchApp}
                          className="text-[11px] font-mono text-neutral-400 hover:text-[#C7F238] transition-colors cursor-pointer"
                        >
                          Open Live View &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: VIDEO SHOWCASE BANNER (.has-video-modal in screenshot)         */}
        {/* ========================================================================= */}
        <section className="has-video-modal py-20 px-4 sm:px-8 border-b border-white/5 relative">
          <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative border border-white/15 shadow-2xl p-8 sm:p-14 text-center">
            {/* Background Image with Ambient Glow */}
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&auto=format&fit=crop&q=80"
              alt="Video Showcase Backdrop"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/80 to-[#070913]/90" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#FFA069] to-[#C7F238] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,160,105,0.6)] cursor-pointer hover:scale-110 transition-transform animate-pulse"
                aria-label="Play architecture video demo"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#FFA069] uppercase tracking-wider">
                  Interactive Video Demonstration
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Watch 14ms Biometric Edge Verification Live Across 6 CCTV Turnstiles
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  See how WorkPulse AI simultaneously ingests RTSP IP feeds, evaluates 512-D vectors, prevents badge-swapping, and calculates overtime wages.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs font-mono text-neutral-400">
                <span>RUNTIME: 2 MIN 15 SEC</span>
                <span>&middot;</span>
                <span className="text-[#C7F238]">4K ULTRA HD</span>
                <span>&middot;</span>
                <span>LIVE RTSP TELEMETRY</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8: CLIENT TESTIMONIALS (CONCEPT 04 REVIEW SHUFFLE)                */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-8 border-b border-white/5">
          <div className="max-w-7xl mx-auto text-left">
            <ConceptReviewShuffle />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 9: TRANSPARENT PRICING TIERS & CONCEPTS 10 & 11                   */}
        {/* ========================================================================= */}
        <section id="pricing" className="py-20 px-4 sm:px-8 border-b border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto text-left space-y-16">
            {/* Concept 10: Interactive Price Roll Dynamic Calculator */}
            <ConceptPriceRoll onSelectTier={() => onLaunchApp?.()} />

            {/* Concept 11: Us vs Them Matrix */}
            <ConceptUsVsThem />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10: TECHBYTE INSIGHTS / BLOG                                      */}
        {/* ========================================================================= */}
        <section id="insights" className="py-20 px-4 sm:px-8 border-b border-white/5">
          <div className="max-w-7xl mx-auto text-left">
            <div className="max-w-2xl space-y-3 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#FFA069]/30 text-[#FFA069] text-xs font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>RESEARCH &amp; INSIGHTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Engineering Notes on Computer Vision &amp; Workforce Systems
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TECHBYTE_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPostModal(post)}
                  className="rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-[#FFA069]/40 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span className="text-[#FFA069] font-bold">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#FFA069] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="text-[10px] text-neutral-500 font-mono pt-2 border-t border-white/5">
                      By {post.author} &middot; {post.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 11: PRE-FOOTER CTA (CONCEPT 12 CLICK -> SUCCESS)                  */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-8 -mb-20 z-20">
          <div className="max-w-6xl mx-auto">
            <ConceptClickSuccess onEnterSandbox={onLaunchApp} />
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 5. FOOTER (<footer class="bg-theme-dark ... pt-70"> in screenshot)       */}
      {/* ========================================================================= */}
      <footer id="contact" className="bg-[#05070D] pt-32 pb-12 px-4 sm:px-8 border-t border-white/5 relative z-10 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black border border-[#C7F238] flex items-center justify-center font-black text-[#C7F238] text-xl">
                &gt;
              </div>
              <div className="font-black text-lg tracking-tight text-white">
                TechByte &middot; WorkPulse AI
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Enterprise CCTV facial recognition, industry-aware attendance telemetry, row-level tenant security, and automated salary slip generation.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NOC Status: 100% Operational &middot; 14ms Median Latency</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#hero-two-slider" className="hover:text-white transition-colors">Hero Two Slider</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services &amp; Edge AI</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects Showcase</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing &amp; Plans</a></li>
              <li><a href="#insights" className="hover:text-white transition-colors">Tech Insights</a></li>
            </ul>
          </div>

          {/* Col 4: Compliance & Security */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Compliance
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SOC 2 Type II Certified</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> GDPR Article 17 Compliant</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> HIPAA Sterile Zone Ready</li>
              <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-[#FFA069]" /> Bcrypt &amp; JWT Signed Cookies</li>
            </ul>
          </div>

          {/* Col 5: Direct Dispatch */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              24/7 Operations
            </div>
            <div className="text-xs text-neutral-400 space-y-1">
              <div>Toll-Free: +1 (800) 555-TECH</div>
              <div>Direct: +1 (800) 902-WORK</div>
              <div>Email: ops@workpulse.ai</div>
              <div className="pt-2">
                <span className="text-[10px] text-[#C7F238] font-mono">
                  Current Tenant: {currentTenantName}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            &copy; 2026 TechByte &middot; WorkPulse AI Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                alert('Biometric Privacy: Face vectors are computed in local memory into 512-D float vectors. No raw photos are persisted without explicit consent.')
              }
              className="hover:text-neutral-300"
            >
              Privacy Policy
            </button>
            <span>&middot;</span>
            <button
              onClick={() =>
                alert('Terms of Service: Enterprise SaaS multi-tenant license with PostgreSQL tenant isolation.')
              }
              className="hover:text-neutral-300"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 6. FLOATING QUICK ACTION BUTTONS (#action-buttons in screenshot)           */}
      {/* ========================================================================= */}
      <div
        id="action-buttons"
        className="fixed right-5 bottom-6 z-40 flex flex-col items-end gap-2.5"
      >
        {onLaunchApp && (
          <button
            type="button"
            onClick={onLaunchApp}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black font-black text-xs shadow-xl shadow-orange-500/30 flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
            title="Launch HRMS App Dashboard"
          >
            <Activity className="w-4 h-4" />
            <span>Launch Live App</span>
          </button>
        )}

        {showBackToTop && (
          <button
            id="back-to-top"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg hover:border-[#FFA069]"
          >
            <ArrowUp className="w-4 h-4 text-[#FFA069]" />
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 7. MODALS: PROJECT SPECS, VIDEO ARCHITECTURE, ARTICLE MODAL               */}
      {/* ========================================================================= */}

      {/* Project Specs Modal */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#0F1322] text-white rounded-3xl border border-white/15 p-6 sm:p-8 space-y-4 shadow-2xl relative text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#FFA069] font-bold">
                  {selectedProjectModal.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {selectedProjectModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProjectModal(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden relative">
              <img
                src={selectedProjectModal.image}
                alt={selectedProjectModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-right">
                <div className="text-base font-black text-[#C7F238] font-mono">
                  {selectedProjectModal.impactMetric}
                </div>
                <div className="text-[9px] text-neutral-400 font-mono">
                  {selectedProjectModal.impactLabel}
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              {selectedProjectModal.summary}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs">
              <div>
                <span className="text-neutral-400 text-[10px]">Client Organization:</span>
                <div className="font-bold text-white">{selectedProjectModal.client}</div>
              </div>
              <div>
                <span className="text-neutral-400 text-[10px]">Deployment Year:</span>
                <div className="font-bold text-white">{selectedProjectModal.year}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProjectModal.tags.map((t, tidx) => (
                <span
                  key={tidx}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProjectModal(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white"
              >
                Close
              </button>
              {onLaunchApp && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProjectModal(null);
                    onLaunchApp();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FFA069] text-black text-xs font-black flex items-center gap-1.5"
                >
                  <span>Open Active Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Architecture Simulation Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl bg-[#0E1220] rounded-3xl border border-white/15 p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <h3 className="font-bold text-sm text-white">
                  Live Edge CCTV Telemetry &amp; Vector Matching Pipeline (Architecture Simulation)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden relative bg-black border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80"
                alt="Architecture Telemetry Feed"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>RTSP STREAM #1: 192.168.1.104 (GATE 1)</span>
                  <span>14ms VECTOR MATCH</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-[#C7F238]/40 text-center max-w-md mx-auto space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#C7F238]/20 border border-[#C7F238] text-[#C7F238] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-sm text-white">Biometric Pass Verified</div>
                  <div className="text-[11px] text-neutral-300 font-mono">
                    Probe matched Asif Khan with 0.992 cosine similarity. Physical turnstile relay pulsed.
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>Database: PostgreSQL Tenant Isolated</span>
                  <span className="text-[#FFA069]">Bcrypt Session: Valid</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
              <span>Resolution: 1080p @ 25 FPS &middot; Zero Cloud Latency</span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl bg-[#0F1322] text-white rounded-3xl border border-white/15 p-6 space-y-4 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-[#FFA069] font-bold">
                {selectedPostModal.category} &middot; {selectedPostModal.readTime}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPostModal(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-white">{selectedPostModal.title}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">{selectedPostModal.excerpt}</p>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-neutral-400">
              Published on {selectedPostModal.date} by {selectedPostModal.author}. Full research paper available in the engineering documentation center.
            </div>

            <button
              type="button"
              onClick={() => setSelectedPostModal(null)}
              className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white"
            >
              Close Article Preview
            </button>
          </div>
        </div>
      )}

      {/* 14-Day Enterprise Free Trial Modal */}
      <FreeTrialModal
        isOpen={isFreeTrialModalOpen}
        onClose={() => setIsFreeTrialModalOpen(false)}
        onLaunchApp={onLaunchApp}
        tenantName={currentTenantName}
      />

      {/* 1-on-1 Product Walkthrough & Demo Scheduler Modal */}
      <BookDemoModal
        isOpen={isBookDemoModalOpen}
        onClose={() => setIsBookDemoModalOpen(false)}
        onLaunchApp={onLaunchApp}
      />
    </div>
  );
};
