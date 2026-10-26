/**
 * Pure Utility Logic for the 12 Interactive UI/UX Concepts:
 * 01 Hero reveal
 * 02 Word rotator
 * 03 Sale pings
 * 04 Review shuffle
 * 05 Count-up stats
 * 06 Bento build
 * 07 Cursor tour
 * 08 Process draw
 * 09 Before / after
 * 10 Price roll
 * 11 Us vs them
 * 12 Click -> success
 */

export interface PriceRollResult {
  seats: number;
  cameras: number;
  isAnnual: boolean;
  seatRate: number;
  cameraRate: number;
  monthlySubtotal: number;
  effectiveMonthly: number;
  annualTotal: number;
  discountSaved: number;
  tierName: string;
}

export interface SalePingItem {
  id: string;
  client: string;
  event: string;
  timeAgo: string;
  badge: string;
  amount?: string;
  avatar: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  metric: string;
}

export interface ComparisonRow {
  dimension: string;
  workpulse: string | boolean;
  fingerprint: string | boolean;
  legacyCard: string | boolean;
  advantage: string;
}

export interface ProcessDrawStep {
  step: number;
  title: string;
  latency: string;
  desc: string;
  detail: string;
  pathPercentage: number;
}

// 02 Word Rotator Pure Logic
export const ROTATING_WORDS = [
  'Sub-15ms Biometrics',
  'PostgreSQL Multi-Tenancy',
  'Automated Overtime Sync',
  'Zero-Hardware Turnstiles',
  'Predictive Shift Quorum',
  'Instant Payslip Generation'
];

export function getNextRotatedWord(currentIndex: number, wordList: string[] = ROTATING_WORDS): { nextIndex: number; word: string } {
  if (wordList.length === 0) return { nextIndex: 0, word: '' };
  const nextIndex = (currentIndex + 1) % wordList.length;
  return { nextIndex, word: wordList[nextIndex] };
}

// 10 Price Roll Pure Logic
export function calculatePriceRoll(seats: number, cameras: number, isAnnual: boolean): PriceRollResult {
  const safeSeats = Math.max(1, Math.round(seats));
  const safeCameras = Math.max(1, Math.round(cameras));

  // Base pricing
  const seatRate = safeSeats >= 500 ? 3.5 : safeSeats >= 100 ? 4.2 : 5.0;
  const cameraRate = 29.0;

  const monthlySubtotal = (safeSeats * seatRate) + (safeCameras * cameraRate);
  const annualDiscountRate = 0.20; // 20% discount on annual plan

  const effectiveMonthly = isAnnual ? Math.round(monthlySubtotal * (1 - annualDiscountRate)) : Math.round(monthlySubtotal);
  const annualTotal = effectiveMonthly * 12;
  const discountSaved = isAnnual ? (monthlySubtotal * 12) - annualTotal : 0;

  let tierName = 'Starter Fleet';
  if (safeSeats >= 500 || safeCameras >= 16) {
    tierName = 'Enterprise Scale';
  } else if (safeSeats >= 50 || safeCameras >= 4) {
    tierName = 'Business Pro';
  }

  return {
    seats: safeSeats,
    cameras: safeCameras,
    isAnnual,
    seatRate,
    cameraRate,
    monthlySubtotal: Math.round(monthlySubtotal),
    effectiveMonthly: Math.round(effectiveMonthly),
    annualTotal: Math.round(annualTotal),
    discountSaved: Math.round(discountSaved),
    tierName
  };
}

// 03 Sale & Telemetry Pings
export const INITIAL_SALE_PINGS: SalePingItem[] = [
  {
    id: 'ping-1',
    client: 'Apex Industrial Fab',
    event: 'Activated 12 RTSP Turnstiles',
    timeAgo: 'Just now',
    badge: 'Enterprise Plan',
    amount: '$1,999/mo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'ping-2',
    client: 'St. Jude Metropolitan',
    event: 'Biometric Quorum Reached (98.4%)',
    timeAgo: '2m ago',
    badge: 'Hospital Suite',
    amount: '$2,450/mo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'ping-3',
    client: 'Vanguard Retail Parks',
    event: '140 Stores Live Attendance Synced',
    timeAgo: '4m ago',
    badge: 'Multi-Store',
    amount: '$1,200/mo',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'ping-4',
    client: 'Helix Global Logistics',
    event: 'Gate 4 PPE Check Passed 100%',
    timeAgo: '7m ago',
    badge: 'OSHA Safety',
    amount: '$890/mo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  }
];

// 04 Review Shuffle Pool
export const REVIEW_CARDS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Vikram Singhania',
    role: 'VP Operations',
    company: 'Apex Industrial Fab Inc.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Eliminated our 45-minute shift changeover bottleneck completely. 600 workers walk through the gates without stopping at 14ms per face match.',
    metric: 'Zero Shift Bottleneck'
  },
  {
    id: 'rev-2',
    author: 'Dr. Evelyn Ward',
    role: 'Chief Medical Officer',
    company: 'St. Jude Metropolitan Hospital',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Touchless sterile zone recognition verified our surgical rosters and masked staff without anyone having to remove gloves or sanitize readers.',
    metric: '99.9% Mask Accuracy'
  },
  {
    id: 'rev-3',
    author: 'Marcus Vance',
    role: 'Facility Security Supervisor',
    company: 'Nordic Logistics Terminals',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Connecting our existing CP Plus and Hikvision RTSP streams took less than 15 minutes. We saved over $80,000 on proprietary card readers.',
    metric: '$80k Hardware Saved'
  },
  {
    id: 'rev-4',
    author: 'Sarah Jenkins',
    role: 'Director of Human Resources',
    company: 'Omni Retail Group',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Payroll computation that used to take 4 full days now runs automatically every Sunday night with 1.5x overtime and tax deductions verified.',
    metric: '4 Days Saved / Month'
  }
];

export function shuffleReviewDeck(deck: ReviewItem[]): ReviewItem[] {
  if (deck.length <= 1) return [...deck];
  const [first, ...rest] = deck;
  return [...rest, first];
}

// 08 Process Draw Steps
export function getProcessDrawSteps(): ProcessDrawStep[] {
  return [
    {
      step: 1,
      title: 'RTSP Video Frame Ingestion',
      latency: '2.4ms',
      desc: 'Edge node grabs raw 1080p stream frame from CCTV IP cameras over local LAN.',
      detail: 'Hikvision / CP PLUS / Dahua RTSP feed decoder',
      pathPercentage: 25
    },
    {
      step: 2,
      title: '512-D Cosine Embedding Extraction',
      latency: '8.1ms',
      desc: 'Local neural network computes facial landmarks and mathematical vector embedding.',
      detail: 'Zero raw images leave customer network perimeter',
      pathPercentage: 50
    },
    {
      step: 3,
      title: 'Tenant Row & Shift Quorum Check',
      latency: '2.1ms',
      desc: 'PostgreSQL row-level policy confirms employee shift window and active roster.',
      detail: 'Anti-buddy punching cosine distance verified (<0.12)',
      pathPercentage: 75
    },
    {
      step: 4,
      title: 'Hardware Turnstile Relay Pulse',
      latency: '1.2ms',
      desc: 'Dry-contact GPIO/HTTP webhook fires to swing turnstile gate barrier open.',
      detail: 'Total End-to-End Latency: 13.8ms (Sub-15ms guaranteed)',
      pathPercentage: 100
    }
  ];
}

// 11 Us vs Them Matrix Data
export function getUsVsThemMatrix(): ComparisonRow[] {
  return [
    {
      dimension: 'Verification Speed & Throughput',
      workpulse: '14ms instant walkthrough',
      fingerprint: '3 - 8s queue pause per person',
      legacyCard: '2 - 5s tap delay & forgotten cards',
      advantage: '300x faster line clearance'
    },
    {
      dimension: 'Hardware Investment & Upfront Cost',
      workpulse: '$0 (Uses existing RTSP CCTV cameras)',
      fingerprint: '$1,200 - $3,500 per turnstile reader',
      legacyCard: '$500 reader + $8/RFID card recurring',
      advantage: '100% hardware savings'
    },
    {
      dimension: 'Hygiene & Sterile Touchless Operation',
      workpulse: '100% touchless, works with masks',
      fingerprint: 'Physical contact required (infection risk)',
      legacyCard: 'Physical badge handling required',
      advantage: 'Hospital & sterile room approved'
    },
    {
      dimension: 'Buddy Punching & Fraud Defense',
      workpulse: 'Zero fraud (3D live anti-spoof AI)',
      fingerprint: 'Silicone mold & finger spoofable',
      legacyCard: 'Massive fraud (friends swipe cards)',
      advantage: 'Guaranteed payroll integrity'
    },
    {
      dimension: 'Database Architecture & Isolation',
      workpulse: 'PostgreSQL Row-Level Tenant Isolation',
      fingerprint: 'Proprietary desktop binary databases',
      legacyCard: 'Flat unencrypted CSV/MDB logs',
      advantage: 'SOC 2 & GDPR compliant'
    },
    {
      dimension: 'Automated Payroll & Overtime Engine',
      workpulse: 'Built-in 1.5x/2.0x overtime & instant slips',
      fingerprint: 'Manual export to Excel required',
      legacyCard: 'Manual batch upload required',
      advantage: 'Instant Sunday night auto-payroll'
    }
  ];
}

// 09 Before / After Comparison Data
export interface BeforeAfterScenario {
  metric: string;
  before: { value: string; label: string };
  after: { value: string; label: string };
  gain: string;
}

export function getBeforeAfterMetrics(): BeforeAfterScenario[] {
  return [
    {
      metric: 'Shift Gate Clearance Time (500 Workers)',
      before: { value: '45 mins', label: 'Long congested line at RFID reader' },
      after: { value: '3.2 mins', label: 'Continuous walking throughput' },
      gain: '93% Queue Reduction'
    },
    {
      metric: 'Monthly Time-Theft & Buddy Punching',
      before: { value: '$4,280 / mo', label: 'Coworkers tapping badges for absentees' },
      after: { value: '$0 / mo', label: 'Biometric facial cosine proof' },
      gain: '100% Fraud Elimination'
    },
    {
      metric: 'Hardware Maintenance Overhead',
      before: { value: '$650 / reader / yr', label: 'Dirty fingerprint glass & card wear' },
      after: { value: '$0 / yr', label: 'Contactless IP cameras over RTSP' },
      gain: 'Zero Reader Wear & Tear'
    },
    {
      metric: 'Payroll Disbursal Turnaround',
      before: { value: '4 Working Days', label: 'HR manually reconciling discrepancies' },
      after: { value: 'Instant (1 click)', label: 'Automated calculation with verified slips' },
      gain: '100% Automated Workflow'
    }
  ];
}
