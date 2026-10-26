/**
 * WorkPulse AI Design Tokens
 * Reconciled from uploaded design assets:
 * 1. landing page.jpg -> "Warm Sunset Brand Glow" (Salad style)
 * 2. onbording.webp    -> "Executive Oatmeal & Dark Slate Bento" (NL Corp / Helen Vasilovsky)
 * 3. pricing pages.webp -> "Multi-Tier Microgrid Pricing"
 * 4. ai.jpg            -> "Cyan Vector Biometric CCTV HUD"
 */

export const DESIGN_TOKENS = {
  // Brand & Marketing (from landing page.jpg)
  brand: {
    heroGradient: 'radial-gradient(ellipse at 85% 30%, #FFE9D6 0%, #FFB685 35%, #E8713C 80%, #B8471B 100%)',
    sunsetLight: '#FFE9D6',
    sunsetMid: '#FFB685',
    sunsetDeep: '#E8713C',
    sunsetDark: '#B8471B',
    brandDark: '#101113',
    brandSurface: '#FFF8F3',
    brandBorder: '#FCEEE3',
  },

  // Executive Bento Dashboard (from onbording.webp)
  bento: {
    sidebarBg: '#0F1113',
    sidebarText: '#8E9297',
    sidebarHover: '#181B1F',
    sidebarActive: '#1F242A',
    limeAccent: '#C7F238',
    limeHover: '#D4FF3F',
    canvasBg: '#F4F1EA',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(0, 0, 0, 0.06)',
    cardMutedBg: '#EFECE5',
    cardMutedText: '#6B7280',
    titleDark: '#111827',
    
    // Donut chart segments (Working format: 500 days)
    donutOffice: '#06B6D4',   // 50% Office (Cyan)
    donutHybrid: '#84CC16',   // 30% Hybrid (Lime)
    donutRemote: '#F43F5E',   // 20% Remote (Rose Coral)
    
    // Gradient mesh for financial card ($6,110 / +40% salary)
    salaryMesh: 'linear-gradient(135deg, rgba(230, 222, 212, 0.8) 0%, rgba(206, 214, 224, 0.7) 100%)',
  },

  // Pricing Tiers (from pricing pages.webp)
  pricing: {
    canvasBg: '#F9FAFB',
    gridColor: 'rgba(0, 0, 0, 0.04)',
    tier1PeachTop: 'linear-gradient(180deg, rgba(254, 215, 170, 0.45) 0%, rgba(255, 255, 255, 0) 100%)',
    tier2IndigoTop: 'linear-gradient(180deg, rgba(224, 231, 255, 0.7) 0%, rgba(255, 255, 255, 0) 100%)',
    tier3TealTop: 'linear-gradient(180deg, rgba(204, 251, 241, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
    trialBadgeBg: '#0F172A',
    trialBadgeText: '#F8FAFC',
    primaryButtonBg: '#4F46E5',
    primaryButtonHover: '#4338CA',
  },

  // Biometric CCTV HUD (from ai.jpg)
  biometricHud: {
    voidBg: '#030712',
    spaceNavy: '#070D18',
    hudBorder: 'rgba(6, 182, 212, 0.25)',
    electricCyan: '#00F2FE',
    cyanGlow: '0 0 16px rgba(0, 242, 254, 0.45)',
    laserLine: '#38BDF8',
    telemetryText: '#22D3EE',
    telemetryGreen: '#34D399',
    reticleBracket: '#00E5FF',
    biometricId: '48271-X',
    featureMatch: '99.8%',
    geometricMatch: '98.6%',
    latency: '14ms',
  },

  // PNG Dashboard Theme Palette (Dark Navy, Black & Electric Yellow)
  pngDashboard: {
    bgVoid: '#0A0D17',
    bgHeader: '#0B0E1B',
    bgCard: '#101524',
    bgPill: '#121829',
    bgPillHover: '#161F36',
    borderDark: '#1E293B',
    borderMuted: '#172033',
    neonYellow: '#E6FF00',
    warmYellow: '#FACC15',
    amberAccent: '#EAB308',
    textWhite: '#FFFFFF',
    textMuted: '#94A3B8',
    cyanAccent: '#38BDF8',
    emeraldAccent: '#10B981',
  },

  // Elevation and Spacing math
  geometry: {
    containerRadius: '1.25rem',    // 20px
    cardRadius: '1rem',           // 16px
    innerElementRadius: '0.625rem',// 10px
    buttonRadius: '0.5rem',        // 8px
  }
} as const;
