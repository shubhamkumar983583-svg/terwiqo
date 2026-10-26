/**
 * Pure utilities and data structures for TechByte Enterprise Showcase & Template
 */

export interface TechByteProject {
  id: string;
  title: string;
  category: 'all' | 'manufacturing' | 'healthcare' | 'retail' | 'enterprise';
  categoryLabel: string;
  image: string;
  summary: string;
  impactMetric: string;
  impactLabel: string;
  tags: string[];
  client: string;
  year: string;
}

export interface TechByteService {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  highlight: string;
}

export interface TechByteTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  industry: string;
}

export interface TechBytePost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
}

export const TECHBYTE_PROJECTS: TechByteProject[] = [
  {
    id: 'proj-01',
    title: 'Automated 12-Gate Edge Biometric Turnstiles',
    category: 'manufacturing',
    categoryLabel: 'Manufacturing & Heavy Industry',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    summary: 'High-throughput 24/7 worker face recognition pipeline with sub-15ms vector match and turnstile PLC integration.',
    impactMetric: '14ms',
    impactLabel: 'Match Latency',
    tags: ['Edge AI', 'RTSP Streams', 'PLC Turnstiles', 'Overtime Sync'],
    client: 'Apex Industrial Fab Inc.',
    year: '2026'
  },
  {
    id: 'proj-02',
    title: 'Sterile Zone Mask & Face Identity Node',
    category: 'healthcare',
    categoryLabel: 'Healthcare & Hospitals',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    summary: 'Infrared thermal and mask-tolerant biometric recognition safeguarding operating theaters and doctor shift handovers.',
    impactMetric: '99.9%',
    impactLabel: 'Mask Compliance',
    tags: ['Thermal CCTV', 'HIPAA Ready', 'Surgeon Roster'],
    client: 'St. Jude Metropolitan Hospital',
    year: '2026'
  },
  {
    id: 'proj-03',
    title: 'Retail Store Shift Handover & Quorum AI',
    category: 'retail',
    categoryLabel: 'Retail & Multi-Branch Malls',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop&q=80',
    summary: 'Dynamic attendance tracking and counter staffing telemetry across 140 luxury stores with live POS cross-checking.',
    impactMetric: '+42%',
    impactLabel: 'Shift Accuracy',
    tags: ['Mall CCTV', 'Cashier Telemetry', 'Multi-Tenant'],
    client: 'Vanguard Retail Parks',
    year: '2026'
  },
  {
    id: 'proj-04',
    title: 'Global Tech Headquarters Access & Payroll Engine',
    category: 'enterprise',
    categoryLabel: 'Corporate Enterprise HQ',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    summary: 'Cloud SQL backed multi-tenant workforce management automating payroll, overtime wage computation, and dynamic QR passes.',
    impactMetric: '$6,110/mo',
    impactLabel: 'Avg Verified Wage',
    tags: ['PostgreSQL', 'Bcrypt Auth', 'SOC 2 & GDPR'],
    client: 'OmniCorp Global Holdings',
    year: '2026'
  },
  {
    id: 'proj-05',
    title: 'Contractor Safety & Helmet Detection CCTV Bay',
    category: 'manufacturing',
    categoryLabel: 'Manufacturing & Heavy Industry',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    summary: 'Automated OSHA PPE compliance alerts with high-resolution edge vision inspecting hardhats, vests, and safety harnesses.',
    impactMetric: 'Zero',
    impactLabel: 'PPE Infractions',
    tags: ['Computer Vision', 'Safety Alerts', 'OSHA Compliance'],
    client: 'Titan Steel & Energy',
    year: '2026'
  },
  {
    id: 'proj-06',
    title: 'Campus Geofence & Digital ID Attendance Studio',
    category: 'enterprise',
    categoryLabel: 'Corporate Enterprise HQ',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    summary: 'Encrypted mobile NFC wallet pass and high-precision GPS geofencing with anti-spoof biometric enrollment.',
    impactMetric: '150m',
    impactLabel: 'Precision Geofence',
    tags: ['Haversine Bounds', 'NFC Wallet', 'Digital ID Studio'],
    client: 'Nexar Innovation Campus',
    year: '2026'
  }
];

export const TECHBYTE_SERVICES: TechByteService[] = [
  {
    id: 'srv-01',
    icon: 'Camera',
    title: 'Edge CCTV Face Biometrics',
    description: 'Transform existing IP/RTSP camera feeds into sub-15ms facial recognition nodes without costly proprietary hardware.',
    features: ['512-D local cosine embeddings', 'Multi-camera RTSP ingestion', 'Spoof & print attack defense'],
    highlight: 'Sub-15ms Latency'
  },
  {
    id: 'srv-02',
    icon: 'LayoutDashboard',
    title: 'Industry-Aware HRMS Dashboard',
    description: 'Instantly adapt telemetry, safety rules, and shift handovers across 15+ specialized business sectors.',
    features: ['Adaptive terminology', 'Live attendance quorum', 'Night & rotational shifts'],
    highlight: '15+ Sectors'
  },
  {
    id: 'srv-03',
    icon: 'CreditCard',
    title: 'Automated Payroll & Overtime Engine',
    description: 'Mathematically precise overtime computation, deduction schedules, and instant PDF/PNG salary slip generation.',
    features: ['1.5x/2.0x overtime rates', 'One-click pay slip export', 'Tax & compliance tracking'],
    highlight: 'Zero Errors'
  },
  {
    id: 'srv-04',
    icon: 'ShieldCheck',
    title: 'Multi-Tenant Row-Level Security',
    description: 'Strict PostgreSQL tenant isolation with cryptographic session tokens, bcrypt password hashing, and role permissions.',
    features: ['Role-based access (Owner, HR, Manager)', 'Audit trail logging', 'SOC 2 & GDPR Article 17'],
    highlight: 'Enterprise Grade'
  },
  {
    id: 'srv-05',
    icon: 'Smartphone',
    title: 'Employee Work Wallet & Digital ID',
    description: 'Provide staff with time-synced dynamic QR passes, NFC digital cards, and geofence mobile check-ins.',
    features: ['90-second expiring dynamic QR', 'Anti-forgery HMAC tokens', 'Haversine boundary guard'],
    highlight: 'Mobile First'
  },
  {
    id: 'srv-06',
    icon: 'Cpu',
    title: 'IoT & Turnstile Hardware APIs',
    description: 'Direct webhook integration with physical turnstiles, biometric gates, relay controllers, and alarm buzzers.',
    features: ['Hardware relay pulse API', 'WebSocket broadcast', 'Fallback offline mode'],
    highlight: 'Instant Trigger'
  }
];

export const TECHBYTE_TESTIMONIALS: TechByteTestimonial[] = [
  {
    id: 'test-01',
    name: 'Marcus Vance',
    role: 'Chief Security Officer',
    company: 'Apex Industrial Systems',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    quote: 'TechByte replaced our tedious badge punch lines with flawless sub-second facial recognition. 1,400 factory workers now enter across 6 turnstiles with zero bottlenecks.',
    rating: 5,
    industry: 'Manufacturing'
  },
  {
    id: 'test-02',
    name: 'Dr. Helen Vasilovsky',
    role: 'VP of Hospital Administration',
    company: 'St. Jude Healthcare',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    quote: 'The contactless face detection works flawlessly even when our surgical staff are wearing medical masks. Shift handover auditing has never been this accurate.',
    rating: 5,
    industry: 'Healthcare'
  },
  {
    id: 'test-03',
    name: 'Rajiv Mehra',
    role: 'VP of Technology & Payroll',
    company: 'Vanguard Retail Global',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    quote: 'Automating our multi-branch salary slips and overtime calculations saved our HR finance team over 80 hours every month. The Glassmorphic dashboard is exceptional.',
    rating: 5,
    industry: 'Retail'
  }
];

export const TECHBYTE_POSTS: TechBytePost[] = [
  {
    id: 'post-01',
    title: 'How Sub-15ms Edge AI Vision Eliminates Factory Shift Bottlenecks',
    excerpt: 'Deploying mathematical cosine embeddings on RTSP CCTV feeds to verify 1,200 worker turnstiles in under 3 minutes.',
    category: 'Computer Vision',
    readTime: '4 min read',
    date: 'October 20, 2026',
    author: 'Asif Khan',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'post-02',
    title: 'Designing Multi-Tenant Row-Level Isolation with PostgreSQL & Bcrypt',
    excerpt: 'Architectural breakdown of zero-leak enterprise data segregation, JWT cryptographic cookies, and rate limiting.',
    category: 'Cyber Security',
    readTime: '6 min read',
    date: 'October 18, 2026',
    author: 'Engineering Team',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'post-03',
    title: 'Dynamic Time-Synced QR Passes: Preventing Badge-Sharing Fraud',
    excerpt: 'How 90-second rotating HMAC-SHA256 tokens protect industrial perimeter gates without internet dependency.',
    category: 'Workforce Tech',
    readTime: '5 min read',
    date: 'October 15, 2026',
    author: 'Marcus Vance',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
  }
];

/**
 * Filter projects by category with 'all' fallback.
 */
export function filterProjectsByCategory(
  projects: TechByteProject[],
  category: TechByteProject['category'] | 'all'
): TechByteProject[] {
  if (!category || category === 'all') {
    return projects;
  }
  return projects.filter((p) => p.category === category);
}

/**
 * Search projects by keyword in title, summary, or tags.
 */
export function searchProjects(projects: TechByteProject[], query: string): TechByteProject[] {
  const q = query.trim().toLowerCase();
  if (!q) return projects;
  return projects.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

/**
 * Format large metric numbers.
 */
export function formatMetricCount(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M+`;
  if (val >= 1000) return `${(val / 1000).toFixed(0)}K+`;
  return String(val);
}
