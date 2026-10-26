import { findIndustryById, SUPPORTED_INDUSTRIES, type IndustryConfig } from '../data/industryRegistry.ts';

export interface IndustryFeaturePolicy {
  industryId: string;
  excludedTabs: string[];
  tabNotes: Record<string, string>;
  recommendedTabs: string[];
}

/**
 * Industry-specific feature exclusion and adaptation map.
 * Specifically implements user directive:
 * "जैसे -> School/College में Payroll की जरूरत नहीं होती या Salary की जरूरत नहीं होती है"
 */
export const INDUSTRY_FEATURE_POLICIES: Record<string, IndustryFeaturePolicy> = {
  school: {
    industryId: 'school',
    excludedTabs: ['payroll', 'work_wallet'],
    tabNotes: {
      payroll: 'School में Payroll / Salary की जरूरत नहीं होती है (No Payroll Needed)',
      work_wallet: 'Academic institutions use fee ledgers instead of employee work wallets'
    },
    recommendedTabs: ['attendance', 'departments', 'work_policy', 'camera_settings']
  },
  college: {
    industryId: 'college',
    excludedTabs: ['payroll', 'work_wallet'],
    tabNotes: {
      payroll: 'College / University में Payroll की जरूरत नहीं होती है (Faculty Duty Tracking Only)',
      work_wallet: 'Work wallet disabled for campus academic faculties'
    },
    recommendedTabs: ['attendance', 'departments', 'leave', 'biometric_logs']
  },
  medical_store: {
    industryId: 'medical_store',
    excludedTabs: ['multi_camera'],
    tabNotes: {
      multi_camera: 'Small retail pharmacy operates on single-counter biometric RTSP'
    },
    recommendedTabs: ['attendance', 'employees', 'biometric_logs', 'security_audit']
  },
  factory: {
    industryId: 'factory',
    excludedTabs: [],
    tabNotes: {
      payroll: 'Mandatory: 1.5x overtime and night shift premium wage calculations',
      ai_alerts: 'Critical: OSHA hardhat & PPE safety detection active'
    },
    recommendedTabs: ['payroll', 'ai_alerts', 'camera_settings', 'biometric_logs', 'work_policy']
  },
  mall: {
    industryId: 'mall',
    excludedTabs: [],
    tabNotes: {
      departments: 'Store directory: individual tenant retail outlets and cashiers'
    },
    recommendedTabs: ['departments', 'camera_settings', 'attendance', 'security_audit']
  },
  hospital: {
    industryId: 'hospital',
    excludedTabs: [],
    tabNotes: {
      work_policy: '24/7 rotating ICU, ER, and OPD clinical shift handovers'
    },
    recommendedTabs: ['departments', 'work_policy', 'biometric_logs', 'attendance']
  },
  construction: {
    industryId: 'construction',
    excludedTabs: [],
    tabNotes: {
      ai_alerts: 'Mandatory: Hardhat and high-vis vest compliance enforcement'
    },
    recommendedTabs: ['employees', 'ai_alerts', 'attendance', 'camera_settings']
  }
};

/**
 * Returns list of tab IDs excluded for a given industry.
 */
export function getIndustryExcludedTabs(industryId: string): string[] {
  const norm = industryId.toLowerCase().trim();
  const policy = INDUSTRY_FEATURE_POLICIES[norm];
  return policy ? policy.excludedTabs : [];
}

/**
 * Returns user-facing reason why a tab is excluded (e.g. for School/College).
 */
export function getIndustryExcludedReason(industryId: string, tabId: string): string | null {
  const norm = industryId.toLowerCase().trim();
  const policy = INDUSTRY_FEATURE_POLICIES[norm];
  if (!policy) return null;
  return policy.tabNotes[tabId] || null;
}

/**
 * Checks whether a specific tab is active/enabled for the chosen industry.
 */
export function isTabEnabledForIndustry(industryId: string, tabId: string): boolean {
  const excluded = getIndustryExcludedTabs(industryId);
  return !excluded.includes(tabId);
}

/**
 * Performs bilingual search (Hindi & English) for company/industry types.
 * Directly supports handwritten terms:
 * Factory / फैक्ट्री, Mall, Hospital, School, College / Collage, Construction / Side, Medical Store, etc.
 */
export function searchIndustriesBilingual(query: string): IndustryConfig[] {
  const q = query.toLowerCase().trim();
  if (!q) return SUPPORTED_INDUSTRIES;

  // Handle common phonetic Hindi / English variations
  const mappedQuery = q
    .replace(/फैक्ट्री|कारखाना/g, 'factory')
    .replace(/मॉल/g, 'mall')
    .replace(/अस्पताल|हॉस्पिटल/g, 'hospital')
    .replace(/स्कूल|विद्यालय/g, 'school')
    .replace(/कॉलेज|collage/g, 'college')
    .replace(/कन्स्ट्रक्शन|कन्स्ट्रक्सन|साइड|site|side/g, 'construction')
    .replace(/मेडिकल स्टोर|दवा दुकान|दुकान|pharmacy/g, 'medical_store');

  return SUPPORTED_INDUSTRIES.filter((ind) => {
    if (ind.id.toLowerCase().includes(q) || ind.id.toLowerCase().includes(mappedQuery)) return true;
    if (ind.name.toLowerCase().includes(q) || ind.name.toLowerCase().includes(mappedQuery)) return true;
    if (ind.shortName.toLowerCase().includes(q) || ind.shortName.toLowerCase().includes(mappedQuery)) return true;
    if (ind.description.toLowerCase().includes(q) || ind.description.toLowerCase().includes(mappedQuery)) return true;
    return ind.searchKeywords.some(
      (kw) =>
        kw.toLowerCase().includes(q) ||
        q.includes(kw.toLowerCase()) ||
        kw.toLowerCase().includes(mappedQuery) ||
        mappedQuery.includes(kw.toLowerCase())
    );
  });
}

/**
 * Computes feature summary for the active industry.
 */
export function getIndustryFeatureSummary(industryId: string): {
  totalModules: number;
  activeModules: number;
  excludedCount: number;
  excludedTabs: string[];
  headline: string;
} {
  const excluded = getIndustryExcludedTabs(industryId);
  const ind = findIndustryById(industryId);
  const total = 21; // 21 total navigation modules
  const active = total - excluded.length;

  let headline = `All ${total} modules configured for ${ind.shortName}`;
  if (excluded.length > 0) {
    if (industryId === 'school' || industryId === 'college') {
      headline = `Tailored for ${ind.shortName}: Payroll & Salary excluded, Campus Safety active`;
    } else {
      headline = `Tailored for ${ind.shortName}: ${excluded.length} non-essential module(s) streamlined`;
    }
  }

  return {
    totalModules: total,
    activeModules: active,
    excludedCount: excluded.length,
    excludedTabs: excluded,
    headline
  };
}
