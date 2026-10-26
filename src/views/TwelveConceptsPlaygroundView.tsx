import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Zap,
  Bell,
  Star,
  BarChart3,
  LayoutGrid,
  MousePointer,
  PenTool,
  ArrowLeftRight,
  Timer,
  CheckCircle2,
  Rocket,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  ArrowRight,
  Check,
  X,
  Sliders,
  TrendingUp,
  Cpu,
  Eye,
  Camera
} from 'lucide-react';
import {
  calculatePriceRoll,
  getNextRotatedWord,
  shuffleReviewDeck,
  getProcessDrawSteps,
  getUsVsThemMatrix,
  getBeforeAfterMetrics,
  REVIEW_CARDS,
  ROTATING_WORDS,
  INITIAL_SALE_PINGS,
  SalePingItem,
  ReviewItem
} from '../utils/concepts12.ts';

interface TwelveConceptsPlaygroundViewProps {
  onBackToDashboard?: () => void;
  onOpenTechByte?: () => void;
}

export function TwelveConceptsPlaygroundView({
  onBackToDashboard,
  onOpenTechByte
}: TwelveConceptsPlaygroundViewProps) {
  const [selectedConcept, setSelectedConcept] = useState<number>(1);
  const [promptText, setPromptText] = useState('Make a hero where every word arrives on cue, then a revenue card slides up...');

  // -------------------------------------------------------------
  // CONCEPT 01: Hero Reveal State & Trigger
  // -------------------------------------------------------------
  const [heroRevealedWords, setHeroRevealedWords] = useState<number>(0);
  const [isHeroCardVisible, setIsHeroCardVisible] = useState(false);
  const heroWords = ['Enterprise', 'Face', 'Biometrics', 'Engineered', 'For', 'Zero-Latency', 'Attendance.'];

  const triggerHeroReveal = () => {
    setHeroRevealedWords(0);
    setIsHeroCardVisible(false);
    heroWords.forEach((_, idx) => {
      setTimeout(() => {
        setHeroRevealedWords((prev) => Math.max(prev, idx + 1));
      }, (idx + 1) * 160);
    });
    setTimeout(() => {
      setIsHeroCardVisible(true);
    }, (heroWords.length + 1) * 160 + 200);
  };

  useEffect(() => {
    if (selectedConcept === 1) {
      triggerHeroReveal();
    }
  }, [selectedConcept]);

  // -------------------------------------------------------------
  // CONCEPT 02: Word Rotator State
  // -------------------------------------------------------------
  const [rotatorIdx, setRotatorIdx] = useState(0);
  const [rotatorSpeed, setRotatorSpeed] = useState<number>(2400);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatorIdx((prev) => getNextRotatedWord(prev).nextIndex);
    }, rotatorSpeed);
    return () => clearInterval(timer);
  }, [rotatorSpeed]);

  // -------------------------------------------------------------
  // CONCEPT 03: Sale Pings State
  // -------------------------------------------------------------
  const [pings, setPings] = useState<SalePingItem[]>(INITIAL_SALE_PINGS.slice(0, 2));
  const [isAutoPingActive, setIsAutoPingActive] = useState(true);

  const addManualPing = () => {
    const nextItem = INITIAL_SALE_PINGS[Math.floor(Math.random() * INITIAL_SALE_PINGS.length)];
    const newPing: SalePingItem = {
      ...nextItem,
      id: `ping-${Date.now()}`,
      timeAgo: 'Just now'
    };
    setPings((prev) => [newPing, ...prev.slice(0, 3)]);
  };

  useEffect(() => {
    if (!isAutoPingActive) return;
    const interval = setInterval(() => {
      addManualPing();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPingActive]);

  // -------------------------------------------------------------
  // CONCEPT 04: Review Shuffle State
  // -------------------------------------------------------------
  const [reviewDeck, setReviewDeck] = useState<ReviewItem[]>(REVIEW_CARDS);
  const handleShuffleReviews = () => {
    setReviewDeck((prev) => shuffleReviewDeck(prev));
  };

  // -------------------------------------------------------------
  // CONCEPT 05: Count-Up Stats State
  // -------------------------------------------------------------
  const [countLatency, setCountLatency] = useState(0);
  const [countQuorum, setCountQuorum] = useState(0);
  const [countPayroll, setCountPayroll] = useState(0);
  const [countDays, setCountDays] = useState(0);

  const runCountUp = () => {
    setCountLatency(0);
    setCountQuorum(0);
    setCountPayroll(0);
    setCountDays(0);

    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setCountLatency(Math.round(ease * 14));
      setCountQuorum(Number((ease * 99.88).toFixed(2)));
      setCountPayroll(Math.round(ease * 6110));
      setCountDays(Math.round(ease * 500));

      if (step >= steps) {
        clearInterval(timer);
        setCountLatency(14);
        setCountQuorum(99.88);
        setCountPayroll(6110);
        setCountDays(500);
      }
    }, intervalTime);
  };

  useEffect(() => {
    if (selectedConcept === 5) {
      runCountUp();
    }
  }, [selectedConcept]);

  // -------------------------------------------------------------
  // CONCEPT 06: Bento Build State
  // -------------------------------------------------------------
  const [bentoLayout, setBentoLayout] = useState<{ [key: string]: boolean }>({
    telemetry: true,
    turnstiles: true,
    donuts: true,
    cameraStream: true,
    speedGauge: true
  });

  const toggleBentoTile = (tile: string) => {
    setBentoLayout((prev) => ({ ...prev, [tile]: !prev[tile] }));
  };

  // -------------------------------------------------------------
  // CONCEPT 07: Cursor Tour State
  // -------------------------------------------------------------
  const [tourStep, setTourStep] = useState(0);
  const [isTourRunning, setIsTourRunning] = useState(false);

  const tourMilestones = [
    { target: 'Camera RTSP Node', x: '18%', y: '30%', text: 'Inspect Live 25 FPS RTSP Stream at Factory Gate 1' },
    { target: 'Cosine Vector Match', x: '52%', y: '26%', text: 'Local 512-D neural cosine match executed in 14ms' },
    { target: 'Turnstile GPIO Relay', x: '82%', y: '65%', text: 'Micro-second dry contact pulse opens barrier' },
    { target: 'Instant Payroll Sync', x: '45%', y: '75%', text: 'Verified punch recorded with 1.5x overtime multiplier' }
  ];

  useEffect(() => {
    if (!isTourRunning) return;
    const timer = setInterval(() => {
      setTourStep((prev) => (prev + 1) % tourMilestones.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isTourRunning]);

  // -------------------------------------------------------------
  // CONCEPT 08: Process Draw State
  // -------------------------------------------------------------
  const [processDrawProgress, setProcessDrawProgress] = useState(100);
  const [isDrawing, setIsDrawing] = useState(false);
  const processSteps = getProcessDrawSteps();

  const startProcessDraw = () => {
    setIsDrawing(true);
    setProcessDrawProgress(0);
    let current = 0;
    const timer = setInterval(() => {
      current += 2;
      setProcessDrawProgress(current);
      if (current >= 100) {
        clearInterval(timer);
        setIsDrawing(false);
      }
    }, 40);
  };

  // -------------------------------------------------------------
  // CONCEPT 09: Before / After Slider
  // -------------------------------------------------------------
  const [beforeAfterPos, setBeforeAfterPos] = useState(50);
  const beforeAfterMetrics = getBeforeAfterMetrics();

  // -------------------------------------------------------------
  // CONCEPT 10: Price Roll State
  // -------------------------------------------------------------
  const [rollSeats, setRollSeats] = useState(120);
  const [rollCameras, setRollCameras] = useState(6);
  const [isAnnualRoll, setIsAnnualRoll] = useState(true);
  const priceRollData = calculatePriceRoll(rollSeats, rollCameras, isAnnualRoll);

  // -------------------------------------------------------------
  // CONCEPT 11: Us vs Them Matrix
  // -------------------------------------------------------------
  const [highlightRow, setHighlightRow] = useState<number | null>(null);
  const usVsThemRows = getUsVsThemMatrix();

  // -------------------------------------------------------------
  // CONCEPT 12: Click -> Success State
  // -------------------------------------------------------------
  const [clickStatus, setClickStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; x: number; y: number; color: string; deg: number }>>([]);

  const handleClickSuccess = () => {
    if (clickStatus !== 'idle') return;
    setClickStatus('loading');
    setTimeout(() => {
      setClickStatus('success');
      // Generate celebratory particles
      const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 260,
        y: -(Math.random() * 180 + 40),
        color: ['#FFA069', '#C7F238', '#38BDF8', '#F43F5E', '#A855F7'][i % 5],
        deg: Math.random() * 360
      }));
      setConfettiPieces(particles);
      setTimeout(() => {
        setClickStatus('idle');
        setConfettiPieces([]);
      }, 3500);
    }, 900);
  };

  // Metadata list for the 12 concept cards matching the exact screenshot layout
  const CONCEPTS_METADATA = [
    { id: 1, num: '01', title: 'Hero reveal', icon: Sparkles, color: 'text-[#FFA069]' },
    { id: 2, num: '02', title: 'Word rotator', icon: Zap, color: 'text-amber-400' },
    { id: 3, num: '03', title: 'Sale pings', icon: Bell, color: 'text-[#FFA069]' },
    { id: 4, num: '04', title: 'Review shuffle', icon: Star, color: 'text-yellow-400' },
    { id: 5, num: '05', title: 'Count-up stats', icon: BarChart3, color: 'text-orange-400' },
    { id: 6, num: '06', title: 'Bento build', icon: LayoutGrid, color: 'text-[#FFA069]' },
    { id: 7, num: '07', title: 'Cursor tour', icon: MousePointer, color: 'text-orange-400' },
    { id: 8, num: '08', title: 'Process draw', icon: PenTool, color: 'text-orange-400' },
    { id: 9, num: '09', title: 'Before / after', icon: ArrowLeftRight, color: 'text-amber-500' },
    { id: 10, num: '10', title: 'Price roll', icon: Timer, color: 'text-orange-400' },
    { id: 11, num: '11', title: 'Us vs them', icon: CheckCircle2, color: 'text-[#FFA069]' },
    { id: 12, num: '12', title: 'Click → success', icon: Rocket, color: 'text-[#FFA069]' }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-white p-4 sm:p-8 relative overflow-hidden font-sans select-none">
      {/* Background Ambient Warm Glows matching MadeToScale Aesthetic */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#FFA069]/12 via-orange-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-10 w-[500px] h-[500px] bg-[#C7F238]/6 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* ========================================================= */}
        {/* TOP BRAND HEADER (Matching MadeToScale & Hero 03 / 15)   */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFA069] to-[#E8713C] p-0.5 shadow-lg shadow-orange-500/25 flex items-center justify-center">
              <div className="w-full h-full bg-black/60 rounded-[14px] flex items-center justify-center font-black text-white text-lg tracking-tighter">
                M
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">MadeToScale</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-orange-200 border border-white/15">
                  12 CONCEPTS SUITE
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Applied to WorkPulse AI • Biometric CCTV &amp; Enterprise HRMS Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs font-mono text-neutral-300">
              HERO • <span className="text-[#FFA069] font-bold">03</span> / 15
            </div>

            {onOpenTechByte && (
              <button
                type="button"
                onClick={onOpenTechByte}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 border border-orange-500/40 text-xs font-bold text-[#FFA069] transition-all cursor-pointer flex items-center gap-1.5 hover:scale-[1.02]"
              >
                <span>Inspect in Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {onBackToDashboard && (
              <button
                type="button"
                onClick={onBackToDashboard}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Central Badge: Built with Claude / AI Studio */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-xs font-semibold text-neutral-200">
            <Sparkles className="w-3.5 h-3.5 text-[#FFA069]" />
            <span>Built with Claude &amp; AI Studio Build Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            12 Interactive UI/UX Conversion Concepts
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Click any concept card below to launch its live interactive sandbox, or explore the integrated preview modules.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 12 CONCEPTS GRID (Exact reproduction of uploaded image)  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {CONCEPTS_METADATA.map((c) => {
            const Icon = c.icon;
            const isSelected = selectedConcept === c.id;

            return (
              <div
                key={c.id}
                onClick={() => setSelectedConcept(c.id)}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-200 text-left relative overflow-hidden group ${
                  isSelected
                    ? 'bg-white/[0.09] border-2 border-[#FFA069] shadow-[0_10px_30px_rgba(255,160,105,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] scale-[1.02]'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Active Indicator Top Glow */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFA069] to-[#C7F238]" />
                )}

                <div className="flex items-center justify-between pb-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-neutral-400 group-hover:text-white transition-colors">
                    {c.num}
                  </span>
                  <div className={`p-1.5 rounded-xl bg-white/[0.04] border border-white/10 ${c.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="font-bold text-sm sm:text-base text-white tracking-tight">
                  {c.title}
                </div>

                <div className="text-[10px] text-neutral-400 pt-1 flex items-center justify-between">
                  <span>{isSelected ? 'Active Preview' : 'Click to inspect'}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FFA069] animate-pulse" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Prompt Input Bar (Faithful Reproduction of Screenshot bottom bar) */}
        <div className="max-w-4xl mx-auto p-2 sm:p-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 flex items-center gap-3 shadow-xl">
          <div className="p-2 rounded-xl bg-orange-500/15 border border-orange-500/30 text-[#FFA069]">
            <Sparkles className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              triggerHeroReveal();
              setSelectedConcept(1);
            }}
            className="p-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-90 text-black font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-orange-500/20"
          >
            <span>Execute</span>
            <Rocket className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hindi Caption from user image */}
        <div className="text-center">
          <span className="text-lg sm:text-xl font-black text-neutral-300">
            सिर्फ <span className="px-2 py-0.5 rounded-lg bg-white/10 border border-white/20 text-white font-mono">एक prompt</span> से।
          </span>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE PLAYGROUND DISPLAY FOR THE SELECTED CONCEPT   */}
        {/* ========================================================= */}
        <div className="bg-[#0E1322]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#FFA069]/20 text-[#FFA069] font-bold border border-[#FFA069]/30">
                  CONCEPT #{CONCEPTS_METADATA[selectedConcept - 1]?.num}
                </span>
                <h3 className="text-xl font-black text-white">
                  {CONCEPTS_METADATA[selectedConcept - 1]?.title}
                </h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Live interactive demonstration tailored for WorkPulse AI biometric attendance &amp; payroll.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedConcept((prev) => (prev % 12) + 1)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Next Concept</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* DYNAMIC CONCEPT PREVIEWS */}
          <div className="pt-6">
            {/* ----------------------------------------------------- */}
            {/* 01: HERO REVEAL                                       */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 1 && (
              <div className="space-y-6 text-center py-6">
                <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 pb-2">
                  <span>Words arrive on cue, followed by a sliding revenue card:</span>
                  <button
                    type="button"
                    onClick={triggerHeroReveal}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-orange-200 flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Replay Cue</span>
                  </button>
                </div>

                {/* Staggered Words */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl mx-auto min-h-[90px]">
                  {heroWords.map((word, idx) => {
                    const isVisible = idx < heroRevealedWords;
                    return (
                      <span
                        key={idx}
                        className={`text-2xl sm:text-4xl font-black tracking-tight transition-all duration-300 ${
                          isVisible
                            ? 'opacity-100 translate-y-0 scale-100 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
                            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                        } ${idx === 0 || idx === 5 ? 'text-[#FFA069]' : ''}`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>

                {/* Sliding Revenue / Telemetry Card */}
                <div
                  className={`max-w-md mx-auto transition-all duration-500 transform ${
                    isHeroCardVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-white/[0.04] to-emerald-500/15 border border-[#FFA069]/30 backdrop-blur-xl shadow-2xl flex items-center justify-between text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#FFA069] flex items-center justify-center font-bold">
                        $
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 font-mono">AUTOMATED PAYROLL DISBURSED</div>
                        <div className="text-xl font-black text-white font-mono">$6,110.00</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C7F238]/20 text-[#C7F238] font-bold font-mono">
                        +40% MONTH
                      </span>
                      <div className="text-[9px] text-neutral-400 mt-0.5">500 Days Verified</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 02: WORD ROTATOR                                      */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 2 && (
              <div className="space-y-6 text-center py-6">
                <div className="text-xs text-neutral-400">
                  Dynamic rotating headlines with smooth fade &amp; scale transition:
                </div>

                <div className="text-xl sm:text-3xl font-extrabold text-white">
                  Next-Gen Workforce Security with{' '}
                  <span className="inline-block px-3 py-1 rounded-xl bg-orange-500/15 border border-orange-500/30 text-[#FFA069] font-mono transition-all duration-300">
                    {ROTATING_WORDS[rotatorIdx]}
                  </span>
                </div>

                {/* Rotator Controls */}
                <div className="flex items-center justify-center gap-3 pt-4">
                  <span className="text-xs text-neutral-400">Rotation Speed:</span>
                  {[1500, 2400, 4000].map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => setRotatorSpeed(speed)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                        rotatorSpeed === speed
                          ? 'bg-[#FFA069] text-black font-bold'
                          : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                      }`}
                    >
                      {speed}ms
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 03: SALE PINGS                                        */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 3 && (
              <div className="space-y-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-neutral-400">
                    Live enterprise telemetry &amp; upgrade pings sliding in:
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAutoPingActive(!isAutoPingActive)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                        isAutoPingActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-neutral-400'
                      }`}
                    >
                      {isAutoPingActive ? 'Auto Ping: ON' : 'Auto Ping: PAUSED'}
                    </button>
                    <button
                      type="button"
                      onClick={addManualPing}
                      className="px-3 py-1 rounded-lg bg-[#FFA069] text-black font-bold text-xs cursor-pointer"
                    >
                      + Trigger Ping
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pings.map((ping) => (
                    <div
                      key={ping.id}
                      className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={ping.avatar}
                          alt={ping.client}
                          className="w-10 h-10 rounded-xl object-cover border border-white/15"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{ping.client}</div>
                          <div className="text-[11px] text-neutral-400">{ping.event}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/15 text-[#FFA069] border border-orange-500/30">
                          {ping.badge}
                        </span>
                        <div className="text-[10px] text-neutral-500 font-mono mt-0.5">{ping.timeAgo}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 04: REVIEW SHUFFLE                                    */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 4 && (
              <div className="space-y-6 py-4 text-center">
                <div className="flex items-center justify-between max-w-xl mx-auto">
                  <div className="text-xs text-neutral-400">
                    Shuffle enterprise testimonials deck with client metrics:
                  </div>
                  <button
                    type="button"
                    onClick={handleShuffleReviews}
                    className="px-3 py-1 rounded-lg bg-[#FFA069] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>Shuffle Deck</span>
                  </button>
                </div>

                {/* Primary Spotlight Card */}
                <div className="max-w-xl mx-auto p-6 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-xl shadow-2xl space-y-4 text-left transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={reviewDeck[0].avatar}
                        alt={reviewDeck[0].author}
                        className="w-12 h-12 rounded-2xl object-cover border border-white/20"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">{reviewDeck[0].author}</div>
                        <div className="text-xs text-neutral-400">
                          {reviewDeck[0].role} • {reviewDeck[0].company}
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-xl bg-orange-500/15 border border-orange-500/30 text-xs font-mono font-bold text-[#FFA069]">
                      {reviewDeck[0].metric}
                    </div>
                  </div>

                  <p className="text-sm text-neutral-200 leading-relaxed italic">
                    "{reviewDeck[0].quote}"
                  </p>

                  <div className="flex items-center gap-1 text-yellow-400 pt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs font-mono text-neutral-400 ml-2">Verified Enterprise Deployment</span>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 05: COUNT-UP STATS                                    */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 5 && (
              <div className="space-y-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                  <span>Smooth ease-out numerical counter animations:</span>
                  <button
                    type="button"
                    onClick={runCountUp}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-orange-200 flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Re-run Count-up</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="text-3xl font-black text-[#FFA069] font-mono">
                      {countLatency}<span className="text-sm">ms</span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Vector Match Latency</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="text-3xl font-black text-[#C7F238] font-mono">
                      {countQuorum}<span className="text-sm">%</span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Shift Quorum Accuracy</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="text-3xl font-black text-cyan-400 font-mono">
                      ${countPayroll.toLocaleString()}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Monthly Disbursed</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="text-3xl font-black text-purple-400 font-mono">
                      {countDays}<span className="text-sm">+</span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Working Days Logged</div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 06: BENTO BUILD                                       */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 6 && (
              <div className="space-y-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-neutral-400">
                    Toggle and build your modular Bento dashboard layout:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(bentoLayout).map((tile) => (
                      <button
                        key={tile}
                        type="button"
                        onClick={() => toggleBentoTile(tile)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                          bentoLayout[tile]
                            ? 'bg-[#FFA069]/20 text-[#FFA069] border border-[#FFA069]/40'
                            : 'bg-white/5 text-neutral-500 border border-white/5'
                        }`}
                      >
                        {tile}: {bentoLayout[tile] ? 'ON' : 'OFF'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {bentoLayout.telemetry && (
                    <div className="md:col-span-2 p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-3">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span className="font-bold text-white">Live Edge CCTV Node Stream</span>
                        <span className="text-emerald-400 font-mono">25 FPS • HD</span>
                      </div>
                      <div className="aspect-video rounded-xl bg-black/60 relative overflow-hidden border border-white/10 flex items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
                          alt="Factory Stream"
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute top-3 left-3 bg-red-500/80 px-2 py-0.5 rounded text-[10px] font-mono font-bold animate-pulse">
                          LIVE RTSP
                        </div>
                        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-mono text-[#C7F238]">
                          Match: 0.992 • Asif Khan
                        </div>
                      </div>
                    </div>
                  )}

                  {bentoLayout.turnstiles && (
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 backdrop-blur-md flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#FFA069] font-mono">GATE TURNSTILES</div>
                        <div className="text-2xl font-black text-white mt-1">6 Gates Active</div>
                        <p className="text-xs text-neutral-400 mt-2">
                          100% online with micro-second hardware dry contact relay pulse.
                        </p>
                      </div>
                      <div className="mt-4 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                        Avg Clearance: 1.4s / worker
                      </div>
                    </div>
                  )}

                  {bentoLayout.donuts && (
                    <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full border-4 border-cyan-400 border-t-[#C7F238] border-r-orange-500 flex items-center justify-center shrink-0">
                        <span className="font-mono font-bold text-xs">500</span>
                      </div>
                      <div className="text-xs space-y-1 font-mono">
                        <div className="text-cyan-400">50% Factory Office</div>
                        <div className="text-[#C7F238]">30% Assembly Line</div>
                        <div className="text-orange-400">20% Shift Rotation</div>
                      </div>
                    </div>
                  )}

                  {bentoLayout.speedGauge && (
                    <div className="md:col-span-2 p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center justify-between">
                      <div>
                        <div className="text-xs text-neutral-400 font-mono">LATENCY PERFORMANCE SCORE</div>
                        <div className="text-xl font-black text-white mt-0.5">Sub-15ms Guarantee Met</div>
                      </div>
                      <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 text-emerald-400 font-mono font-bold text-sm border border-emerald-500/40">
                        14ms PASS
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 07: CURSOR TOUR                                       */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 7 && (
              <div className="space-y-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-neutral-400">
                    Interactive guided cursor walkthrough simulating user inspection:
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsTourRunning(!isTourRunning)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      isTourRunning
                        ? 'bg-orange-500 text-black'
                        : 'bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    {isTourRunning ? 'Stop Cursor Tour' : 'Start Cursor Tour'}
                  </button>
                </div>

                <div className="relative h-64 rounded-3xl bg-black/40 border border-white/10 overflow-hidden p-6 flex flex-col justify-between">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    {tourMilestones.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border transition-all duration-300 ${
                          tourStep === idx
                            ? 'bg-[#FFA069]/20 border-[#FFA069] scale-105 shadow-lg shadow-orange-500/20'
                            : 'bg-white/[0.02] border-white/10'
                        }`}
                      >
                        <div className="text-[10px] font-mono text-neutral-400">STEP 0{idx + 1}</div>
                        <div className="text-xs font-bold text-white mt-1">{m.target}</div>
                      </div>
                    ))}
                  </div>

                  {/* Simulated Moving Cursor */}
                  <div
                    className="absolute transition-all duration-700 ease-out pointer-events-none flex items-start gap-2"
                    style={{
                      left: tourMilestones[tourStep].x,
                      top: tourMilestones[tourStep].y
                    }}
                  >
                    <MousePointer className="w-6 h-6 text-[#FFA069] drop-shadow-[0_2px_8px_rgba(255,160,105,0.8)] fill-[#FFA069]" />
                    <div className="px-3 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-[#FFA069]/60 text-xs font-semibold text-white shadow-2xl max-w-xs animate-in fade-in">
                      {tourMilestones[tourStep].text}
                    </div>
                  </div>

                  <div className="text-center text-[11px] text-neutral-500 font-mono">
                    Cursor tracks milestone coordinates automatically across UI elements.
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 08: PROCESS DRAW                                      */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 8 && (
              <div className="space-y-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-neutral-400">
                    Animated SVG stroke draw tracing the biometric recognition pipeline:
                  </div>
                  <button
                    type="button"
                    onClick={startProcessDraw}
                    disabled={isDrawing}
                    className="px-3 py-1 rounded-lg bg-[#FFA069] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>{isDrawing ? 'Drawing Pipeline...' : 'Redraw Pipeline'}</span>
                  </button>
                </div>

                {/* SVG Animated Connector Line */}
                <div className="relative py-4">
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFA069] via-amber-400 to-[#C7F238] transition-all duration-100 ease-linear shadow-[0_0_12px_#FFA069]"
                      style={{ width: `${processDrawProgress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {processSteps.map((step) => {
                    const isPassed = processDrawProgress >= step.pathPercentage;
                    return (
                      <div
                        key={step.step}
                        className={`p-4 rounded-2xl border transition-all duration-300 text-left ${
                          isPassed
                            ? 'bg-white/[0.05] border-[#FFA069]/50 shadow-md shadow-orange-500/10'
                            : 'bg-white/[0.01] border-white/5 opacity-50'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-[#FFA069]">0{step.step}</span>
                          <span className="text-neutral-400">{step.latency}</span>
                        </div>
                        <div className="text-xs font-bold text-white mt-1.5">{step.title}</div>
                        <div className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                          {step.desc}
                        </div>
                        <div className="text-[9px] font-mono text-neutral-500 mt-2">
                          {step.detail}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 09: BEFORE / AFTER                                    */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 9 && (
              <div className="space-y-6 py-4">
                <div className="text-xs text-neutral-400 text-center">
                  Drag the interactive split slider to compare Legacy Punch Cards vs WorkPulse AI Turnstiles:
                </div>

                {/* Slider Input */}
                <div className="max-w-md mx-auto">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={beforeAfterPos}
                    onChange={(e) => setBeforeAfterPos(Number(e.target.value))}
                    className="w-full accent-[#FFA069] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-neutral-400 pt-1">
                    <span>100% Legacy RFID</span>
                    <span className="text-[#FFA069] font-bold">{beforeAfterPos}%</span>
                    <span>100% AI Biometrics</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="p-5 rounded-3xl bg-red-500/[0.04] border border-red-500/20 text-left space-y-3 transition-opacity"
                    style={{ opacity: (100 - beforeAfterPos / 1.5) / 100 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-red-400 font-bold uppercase">BEFORE • Legacy System</span>
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="space-y-2 text-xs text-neutral-300">
                      <div>• 45 mins shift change congestion queue</div>
                      <div>• $4,280/mo buddy punching payroll loss</div>
                      <div>• Physical badge replacement overhead</div>
                      <div>• 4 working days to disburse monthly salary</div>
                    </div>
                  </div>

                  <div
                    className="p-5 rounded-3xl bg-emerald-500/[0.06] border border-emerald-500/30 text-left space-y-3 transition-opacity"
                    style={{ opacity: (beforeAfterPos + 30) / 100 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400 font-bold uppercase">AFTER • WorkPulse AI</span>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="space-y-2 text-xs text-neutral-300">
                      <div>• 14ms walkthrough (Zero line bottleneck)</div>
                      <div>• 100% biometric proof (Zero buddy punching)</div>
                      <div>• Zero proprietary reader hardware needed</div>
                      <div>• Instant 1-click Sunday payroll computation</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 10: PRICE ROLL                                        */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 10 && (
              <div className="space-y-6 py-4">
                <div className="text-xs text-neutral-400 text-center">
                  Live rolling price calculation based on employee count and CCTV stream nodes:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Controls */}
                  <div className="space-y-5 p-5 rounded-3xl bg-white/[0.03] border border-white/10 text-left">
                    {/* Annual Toggle */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs font-bold text-white">Billing Cycle</span>
                      <div className="flex p-0.5 rounded-xl bg-white/5 border border-white/10">
                        <button
                          type="button"
                          onClick={() => setIsAnnualRoll(false)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                            !isAnnualRoll ? 'bg-[#FFA069] text-black font-bold' : 'text-neutral-400'
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAnnualRoll(true)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                            isAnnualRoll ? 'bg-[#FFA069] text-black font-bold' : 'text-neutral-400'
                          }`}
                        >
                          Annual (20% OFF)
                        </button>
                      </div>
                    </div>

                    {/* Seats Slider */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-neutral-300">Active Workforce Seats:</span>
                        <span className="font-mono font-bold text-[#FFA069]">{rollSeats} Employees</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={rollSeats}
                        onChange={(e) => setRollSeats(Number(e.target.value))}
                        className="w-full accent-[#FFA069] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                        <span>10</span>
                        <span>Tier: ${priceRollData.seatRate}/seat</span>
                        <span>1,000+</span>
                      </div>
                    </div>

                    {/* Cameras Slider */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-neutral-300">RTSP CCTV Camera Nodes:</span>
                        <span className="font-mono font-bold text-[#C7F238]">{rollCameras} Cameras</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="32"
                        value={rollCameras}
                        onChange={(e) => setRollCameras(Number(e.target.value))}
                        className="w-full accent-[#C7F238] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                        <span>1 Node</span>
                        <span>$29/cam node/mo</span>
                        <span>32 Nodes</span>
                      </div>
                    </div>
                  </div>

                  {/* Rolling Price Display */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500/15 via-white/[0.04] to-transparent border border-[#FFA069]/40 flex flex-col justify-between text-left shadow-2xl">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFA069]/20 text-[#FFA069] font-bold border border-[#FFA069]/30">
                        {priceRollData.tierName}
                      </span>
                      <div className="mt-3">
                        <div className="text-4xl font-black text-white font-mono tracking-tight">
                          ${priceRollData.effectiveMonthly}
                          <span className="text-xs text-neutral-400 font-sans font-normal ml-1">/ month</span>
                        </div>
                        {isAnnualRoll && (
                          <div className="text-xs text-[#C7F238] font-mono mt-1">
                            Billed annually at ${priceRollData.annualTotal.toLocaleString()}/yr (Saved ${priceRollData.discountSaved.toLocaleString()})
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs text-neutral-300">
                      <div className="flex justify-between">
                        <span>Seat Allocation:</span>
                        <span className="font-mono text-white">{rollSeats} × ${priceRollData.seatRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CCTV Edge Nodes:</span>
                        <span className="font-mono text-white">{rollCameras} × $29</span>
                      </div>
                      <div className="flex justify-between font-bold text-white pt-1 border-t border-white/5">
                        <span>Instant Deployment:</span>
                        <span className="text-emerald-400 font-mono">Included ($0 setup)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 11: US VS THEM                                        */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 11 && (
              <div className="space-y-4 py-4 overflow-x-auto text-left">
                <div className="text-xs text-neutral-400 pb-2">
                  Comprehensive architectural comparison between WorkPulse AI and legacy competitors:
                </div>

                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-neutral-400 font-mono">
                      <th className="py-2.5 px-3 text-left">EVALUATION METRIC</th>
                      <th className="py-2.5 px-3 text-left text-[#FFA069] bg-orange-500/10 font-bold">WORKPULSE AI (US)</th>
                      <th className="py-2.5 px-3 text-left">FINGERPRINT BIOMETRICS</th>
                      <th className="py-2.5 px-3 text-left">RFID / PUNCH CARDS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usVsThemRows.map((row, idx) => (
                      <tr
                        key={idx}
                        onMouseEnter={() => setHighlightRow(idx)}
                        onMouseLeave={() => setHighlightRow(null)}
                        className={`border-b border-white/5 transition-colors ${
                          highlightRow === idx ? 'bg-white/[0.04]' : ''
                        }`}
                      >
                        <td className="py-3 px-3 font-semibold text-white">{row.dimension}</td>
                        <td className="py-3 px-3 text-[#FFA069] bg-orange-500/5 font-mono font-bold">
                          ✓ {row.workpulse}
                        </td>
                        <td className="py-3 px-3 text-neutral-400">{row.fingerprint}</td>
                        <td className="py-3 px-3 text-neutral-400">{row.legacyCard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 12: CLICK -> SUCCESS                                  */}
            {/* ----------------------------------------------------- */}
            {selectedConcept === 12 && (
              <div className="space-y-6 py-6 text-center">
                <div className="text-xs text-neutral-400">
                  Micro-interaction button with state transitions and particle confetti explosion:
                </div>

                <div className="relative inline-block py-6">
                  {/* Floating Particles */}
                  {confettiPieces.map((p) => (
                    <div
                      key={p.id}
                      className="absolute w-2 h-2 rounded-full pointer-events-none transition-all duration-1000 ease-out"
                      style={{
                        transform: `translate(${p.x}px, ${p.y}px) rotate(${p.deg}deg)`,
                        backgroundColor: p.color
                      }}
                    />
                  ))}

                  <button
                    type="button"
                    onClick={handleClickSuccess}
                    disabled={clickStatus !== 'idle'}
                    className={`px-8 py-3.5 rounded-2xl text-sm font-black transition-all cursor-pointer flex items-center gap-2 shadow-2xl ${
                      clickStatus === 'idle'
                        ? 'bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black hover:scale-105 shadow-orange-500/30'
                        : clickStatus === 'loading'
                        ? 'bg-orange-500/50 text-white cursor-wait scale-95'
                        : 'bg-emerald-500 text-black shadow-emerald-500/30 scale-105'
                    }`}
                  >
                    {clickStatus === 'idle' && (
                      <>
                        <Rocket className="w-4 h-4" />
                        <span>Launch Biometric Turnstiles Now</span>
                      </>
                    )}
                    {clickStatus === 'loading' && (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Verifying Turnstile Relays...</span>
                      </>
                    )}
                    {clickStatus === 'success' && (
                      <>
                        <Check className="w-5 h-5 font-black" />
                        <span>Turnstiles Activated! 14ms Online</span>
                      </>
                    )}
                  </button>
                </div>

                {clickStatus === 'success' && (
                  <div className="text-xs font-mono text-emerald-400 animate-in fade-in">
                    All 6 turnstiles synchronized • PostgreSQL tenant isolation confirmed • Live stream 25 FPS
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
