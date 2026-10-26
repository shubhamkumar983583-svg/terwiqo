export interface IndustryMetric {
  id: string;
  label: string;
  getValue: (data: { totalEmployees: number; presentCount: number; absentCount: number; lateCount: number; activeCameras: number }) => string | number;
  subtext: string;
  color: string;
}

export interface IndustryWorkflow {
  id: string;
  label: string;
  description: string;
  targetTab: string;
  badge?: string;
}

export interface IndustryConfig {
  id: string;
  name: string;
  shortName: string;
  iconName: string;
  badge: string;
  accentColor: string;
  description: string;
  searchKeywords: string[];
  keyModules: string[];
  terminology: {
    employee: string;
    employees: string;
    worksite: string;
    checkIn: string;
    shift: string;
    device: string;
    department: string;
  };
  metrics: IndustryMetric[];
  workflows: IndustryWorkflow[];
  sampleAlerts: string[];
  features: {
    nightShift: boolean;
    multiGate: boolean;
    contractorTracking: boolean;
    storeManagement: boolean;
    wardManagement: boolean;
    timetableShifts: boolean;
    geofencing: boolean;
  };
}

export const SUPPORTED_INDUSTRIES: IndustryConfig[] = [
  {
    id: 'factory',
    name: 'Factory & Manufacturing',
    shortName: 'Factory',
    iconName: 'Factory',
    badge: 'Industrial Grade',
    accentColor: '#FACC15',
    description: 'Optimized for high-throughput production lines, day & night rotational shifts, multi-gate turnstiles, and contractor tracking.',
    searchKeywords: ['factory', 'plant', 'manufacturing', 'assembly', 'production', 'industrial', 'shopfloor', 'contractor', 'फैक्ट्री', 'कारखाना', 'उद्योग'],
    keyModules: [
      'Day & Night Shift Rotations',
      'Multi-Gate Factory Turnstiles',
      'Assembly Line Attendance Tracking',
      'CCTV Edge AI Safety Monitoring',
      'Shift Handover & Overtime (1.5x/2.0x)',
      'Contractor & Temporary Labor Tracking'
    ],
    terminology: {
      employee: 'Plant Worker / Operator',
      employees: 'Workers & Operators',
      worksite: 'Assembly Plant / Line',
      checkIn: 'Gate Punch',
      shift: 'Day / Night Shift',
      device: 'Factory Turnstile Node',
      department: 'Production Bay'
    },
    metrics: [
      { id: 'm1', label: 'Plant Workers Present', getValue: (d) => `${d.presentCount} / ${d.totalEmployees}`, subtext: '94% Floor Coverage', color: 'text-emerald-400' },
      { id: 'm2', label: 'Day / Night Shift Split', getValue: (d) => `${Math.ceil(d.presentCount * 0.7)} Day / ${Math.floor(d.presentCount * 0.3)} Night`, subtext: 'Rotational Schedule', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Active Factory Gates', getValue: (d) => `${d.activeCameras} Gates`, subtext: 'Edge RTSP Online', color: 'text-sky-400' },
      { id: 'm4', label: 'Overtime & Handover', getValue: (d) => `${d.lateCount * 2.5} hrs`, subtext: '1.5x Premium Wage', color: 'text-purple-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Shift Handover Roster', description: 'Inspect transition between morning and night shifts', targetTab: 'work_policy', badge: 'Active' },
      { id: 'w2', label: 'Gate Turnstiles Status', description: 'Monitor high-speed barcode and biometric turnstiles', targetTab: 'camera_settings' },
      { id: 'w3', label: 'Contractor Worker Ledger', description: 'Audit temporary agency workforce records and safety', targetTab: 'employees' }
    ],
    sampleAlerts: [
      'Gate 2: Unauthorized shift handover pass detected',
      'Plant 4 High-Bay: Worker missing mandatory hardhat/PPE',
      'Night shift attendance quorum reached at 98.4%'
    ],
    features: {
      nightShift: true,
      multiGate: true,
      contractorTracking: true,
      storeManagement: false,
      wardManagement: false,
      timetableShifts: false,
      geofencing: true
    }
  },
  {
    id: 'mall',
    name: 'Shopping Mall & Retail',
    shortName: 'Mall & Retail',
    iconName: 'ShoppingBag',
    badge: 'Multi-Store',
    accentColor: '#38BDF8',
    description: 'Designed for commercial retail centers, individual store tenant staff, security guard posts, and multi-entrance checkpoints.',
    searchKeywords: ['mall', 'shopping centre', 'shopping center', 'retail', 'store', 'outlet', 'supermarket', 'boutique', 'cashier', 'मॉल', 'शॉपिंग मॉल', 'दुकान'],
    keyModules: [
      'Store & Retail Outlet Management',
      'Retail Staff Attendance by Store',
      'Multiple Mall Entrances & Loading Bays',
      'Security Guard & Supervisor Allocation',
      'Branch-Wise Staffing Reports',
      'Tenant Store Compliance Audits'
    ],
    terminology: {
      employee: 'Retail Associate / Staff',
      employees: 'Store Staff & Supervisors',
      worksite: 'Outlet / Retail Floor',
      checkIn: 'Store Clock-in',
      shift: 'Store Opening / Closing Shift',
      device: 'Entrance Checkpoint Kiosk',
      department: 'Store Brand / Outlet'
    },
    metrics: [
      { id: 'm1', label: 'Retail Associates On Duty', getValue: (d) => `${d.presentCount} Staff`, subtext: 'Across 14 Tenant Outlets', color: 'text-emerald-400' },
      { id: 'm2', label: 'Store Outlets Open', getValue: () => '14 / 15 Stores', subtext: '93% Tenant Compliance', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Entrances & Checkpoints', getValue: (d) => `${d.activeCameras} Entry Nodes`, subtext: 'Turnstiles & Bollards', color: 'text-sky-400' },
      { id: 'm4', label: 'Late Store Openings', getValue: (d) => `${d.lateCount} Delayed`, subtext: 'Within Grace Window', color: 'text-orange-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Store Outlets Directory', description: 'Review tenant staffing by retail brand outlet', targetTab: 'departments', badge: '14 Stores' },
      { id: 'w2', label: 'Mall Entrances Security', description: 'Inspect CCTV biometric scanners at North & South Atriums', targetTab: 'camera_settings' },
      { id: 'w3', label: 'Retail Shift Coverage', description: 'Ensure adequate cashier and supervisor coverage', targetTab: 'work_policy' }
    ],
    sampleAlerts: [
      'North Atrium: Store 104 staff arrival logged after 10:00 AM',
      'Main Loading Dock: Retail inventory staff verified via QR pass',
      'South Mall Entrance: Security guard post rotation completed'
    ],
    features: {
      nightShift: false,
      multiGate: true,
      contractorTracking: true,
      storeManagement: true,
      wardManagement: false,
      timetableShifts: false,
      geofencing: true
    }
  },
  {
    id: 'hospital',
    name: 'Hospital & Healthcare',
    shortName: 'Healthcare',
    iconName: 'HeartPulse',
    badge: 'Clinical 24/7',
    accentColor: '#34D399',
    description: 'Tailored for healthcare systems with doctor, nurse, and resident ward assignments, 24/7 rotating shifts, and emergency handover.',
    searchKeywords: ['hospital', 'clinic', 'healthcare', 'doctor', 'nurse', 'medical', 'ward', 'patient', 'icu', 'surgeon', 'अस्पताल', 'हॉस्पिटल', 'चिकित्सालय'],
    keyModules: [
      'Doctor, Nurse & Paramedic Roster',
      'Department & Ward Assignments (ICU, ER, OPD)',
      '24/7 Day/Night Rotating Clinical Shifts',
      'Emergency Duty & On-Call Dispatch',
      'Clinical Handover & Scrub-In Logs',
      'Compliance & Healthcare Licensure Tracking'
    ],
    terminology: {
      employee: 'Clinician / Medical Staff',
      employees: 'Doctors, Nurses & Paramedics',
      worksite: 'Hospital Ward / Clinic',
      checkIn: 'Duty Clock-in',
      shift: 'Clinical Rotation',
      device: 'Sanitized Biometric Terminal',
      department: 'Clinical Ward / Specialty'
    },
    metrics: [
      { id: 'm1', label: 'Clinical Staff On-Duty', getValue: (d) => `${d.presentCount} Active`, subtext: 'Doctors & Nursing Roster', color: 'text-emerald-400' },
      { id: 'm2', label: 'ICU / ER Staffing Ratio', getValue: () => '1:2 Patient Ratio', subtext: 'Exceeds Safety Standards', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Clinical Pods Monitored', getValue: (d) => `${d.activeCameras} Stations`, subtext: 'Sanitized CCTV Scanners', color: 'text-sky-400' },
      { id: 'm4', label: 'On-Call Emergencies', getValue: () => '2 Standby', subtext: 'Trauma Team Ready', color: 'text-purple-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Ward Assignment Board', description: 'Assign physicians and nurses across ICU, ER, and Surgery', targetTab: 'departments', badge: '24/7' },
      { id: 'w2', label: 'Clinical Shift Handover', description: 'Review patient care handover between morning and night teams', targetTab: 'work_policy' },
      { id: 'w3', label: 'On-Call Emergency Roster', description: 'Check specialist physician standby availability', targetTab: 'employees' }
    ],
    sampleAlerts: [
      'Emergency Ward: Trauma surgeon clocked in via edge CCTV',
      'ICU Floor 3: Night shift nursing handover verified',
      'Pharmacy Vault: Authorized access logged for Chief Pharmacist'
    ],
    features: {
      nightShift: true,
      multiGate: true,
      contractorTracking: false,
      storeManagement: false,
      wardManagement: true,
      timetableShifts: false,
      geofencing: true
    }
  },
  {
    id: 'school',
    name: 'School',
    shortName: 'K-12 School',
    iconName: 'GraduationCap',
    badge: 'Campus Safe',
    accentColor: '#F59E0B',
    description: 'Designed for primary & secondary schools with teacher timetables, administrative staff attendance, and child-safe campus gates.',
    searchKeywords: ['school', 'teacher', 'student', 'k-12', 'classroom', 'principal', 'education', 'staff', 'स्कूल', 'विद्यालय', 'पाठशाला'],
    keyModules: [
      'Teacher & Non-Teaching Staff Attendance',
      'Campus Gate & Bus Depot Safety',
      'Timetable & Subject Period Shifts',
      'Substitute Teacher Allocation',
      'Staff Leave & Assembly Clock-ins',
      'Parent/Visitor Verification Logs'
    ],
    terminology: {
      employee: 'Teacher / Staff Member',
      employees: 'Teaching & Admin Staff',
      worksite: 'Classroom / Campus Wing',
      checkIn: 'Morning Bell Punch',
      shift: 'School Timetable Period',
      device: 'Campus Gate Terminal',
      department: 'Academic Department'
    },
    metrics: [
      { id: 'm1', label: 'Faculty & Staff Present', getValue: (d) => `${d.presentCount} / ${d.totalEmployees}`, subtext: '100% Homeroom Coverage', color: 'text-emerald-400' },
      { id: 'm2', label: 'Academic Departments', getValue: () => '8 Departments', subtext: 'Science, Arts, Athletics', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'School Gates Active', getValue: (d) => `${d.activeCameras} Campus Gates`, subtext: 'Child-Safe Monitoring', color: 'text-sky-400' },
      { id: 'm4', label: 'Late Bell Arrivals', getValue: (d) => `${d.lateCount} Staff`, subtext: 'Covered by Substitutes', color: 'text-orange-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Academic Staff Roster', description: 'Review teachers assigned per grade and department', targetTab: 'employees', badge: 'Active' },
      { id: 'w2', label: 'Campus Perimeter Security', description: 'Inspect Main Gate, Bus Gate, and Sports Field CCTV', targetTab: 'camera_settings' },
      { id: 'w3', label: 'Staff Timetable Schedule', description: 'Configure school day bell timings and break periods', targetTab: 'work_policy' }
    ],
    sampleAlerts: [
      'Gate 1 (Main Entrance): All homeroom teachers verified before 08:00 AM',
      'Science Wing: Lab technician check-in confirmed',
      'Sports Complex: Physical education staff attendance registered'
    ],
    features: {
      nightShift: false,
      multiGate: true,
      contractorTracking: false,
      storeManagement: false,
      wardManagement: false,
      timetableShifts: true,
      geofencing: true
    }
  },
  {
    id: 'college',
    name: 'College & University',
    shortName: 'University',
    iconName: 'Building',
    badge: 'Multi-Campus',
    accentColor: '#818CF8',
    description: 'Built for universities with multiple campus locations, academic faculties, research labs, and departmental lecture blocks.',
    searchKeywords: ['college', 'university', 'campus', 'faculty', 'professor', 'lecturer', 'higher education', 'institute', 'collage', 'कॉलेज', 'महाविद्यालय'],
    keyModules: [
      'Faculty, Dean & Research Staff Profiles',
      'Multi-Campus Location Sync',
      'Lecture Block & Lab Access Control',
      'Flexible Academic Shifts & Sabbaticals',
      'Departmental Payroll & Research Grants',
      'Campus Turnstile Integration'
    ],
    terminology: {
      employee: 'Professor / Faculty Member',
      employees: 'Professors & Campus Staff',
      worksite: 'Faculty Hall / Research Lab',
      checkIn: 'Campus Access Punch',
      shift: 'Lecture Block Schedule',
      device: 'Faculty Biometric Turnstile',
      department: 'Academic Faculty / School'
    },
    metrics: [
      { id: 'm1', label: 'Professors & Faculty', getValue: (d) => `${d.presentCount} Present`, subtext: 'Across 6 Campuses', color: 'text-emerald-400' },
      { id: 'm2', label: 'Academic Faculties', getValue: () => '12 Faculties', subtext: 'Engineering, Medicine, Law', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Campus Turnstiles', getValue: (d) => `${d.activeCameras} Gates`, subtext: 'High-Throughput RFID', color: 'text-sky-400' },
      { id: 'm4', label: 'Research Lab Sessions', getValue: () => '24 Active', subtext: 'Secure Biometric Access', color: 'text-purple-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Faculty & Deans Roster', description: 'Review academic departments and course instructors', targetTab: 'employees' },
      { id: 'w2', label: 'Multi-Campus Terminals', description: 'Audit biometric gates across North and South campuses', targetTab: 'camera_settings' },
      { id: 'w3', label: 'Academic Sabbatical & Leave', description: 'Manage conference, sabbatical, and research leave', targetTab: 'leave' }
    ],
    sampleAlerts: [
      'Engineering Block A: Faculty Dean logged in at Research Hall',
      'Biotech Center: Restricted cleanroom biometric entry verified',
      'South Campus Library: Administrative staff check-in recorded'
    ],
    features: {
      nightShift: false,
      multiGate: true,
      contractorTracking: true,
      storeManagement: false,
      wardManagement: false,
      timetableShifts: true,
      geofencing: true
    }
  },
  {
    id: 'coaching',
    name: 'Coaching & Training Institute',
    shortName: 'Coaching',
    iconName: 'BookOpen',
    badge: 'Batch Based',
    accentColor: '#EC4899',
    description: 'Designed for test-prep academies, coaching centers, and skill training institutes with batch-timed shifts and multi-branch attendance.',
    searchKeywords: ['coaching', 'tuition', 'training centre', 'training center', 'academy', 'batch', 'test prep', 'institute'],
    keyModules: [
      'Instructors & Teaching Assistant Attendance',
      'Morning / Evening Batch Rosters',
      'Branch-Wise Institute Centers',
      'Doubt Counter & Lab Staff Tracking',
      'Hourly Wage & Session-Based Payroll',
      'QR Entry Kiosks for Students & Faculty'
    ],
    terminology: {
      employee: 'Tutor / Faculty Instructor',
      employees: 'Instructors & Mentors',
      worksite: 'Coaching Branch / Lecture Hall',
      checkIn: 'Batch Punch',
      shift: 'Batch Session (Morning/Evening)',
      device: 'Classroom Scanner Kiosk',
      department: 'Subject Department'
    },
    metrics: [
      { id: 'm1', label: 'Instructors On-Site', getValue: (d) => `${d.presentCount} / ${d.totalEmployees}`, subtext: '100% Batch Coverage', color: 'text-emerald-400' },
      { id: 'm2', label: 'Active Study Batches', getValue: () => '8 Batches', subtext: 'Morning & Evening Sessions', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Branch Kiosks', getValue: (d) => `${d.activeCameras} Kiosks`, subtext: 'QR & Face Enabled', color: 'text-sky-400' },
      { id: 'm4', label: 'Doubt Clearing Sessions', getValue: () => '14 Scheduled', subtext: 'Full Mentor Allocation', color: 'text-pink-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Batch Schedule & Shift Timing', description: 'Inspect batch-based faculty timings', targetTab: 'work_policy' },
      { id: 'w2', label: 'Branch Center Management', description: 'Monitor satellite tuition centers and staff distribution', targetTab: 'departments' },
      { id: 'w3', label: 'Hourly Lecture Compensation', description: 'Compute hourly lecture payouts and incentives', targetTab: 'payroll' }
    ],
    sampleAlerts: [
      'Main Branch: JEE Physics senior faculty arrived for Morning Batch A',
      'East Center: Doubt mentor check-in logged via mobile QR',
      'Weekend intensive session instructors verified at 100%'
    ],
    features: {
      nightShift: false,
      multiGate: false,
      contractorTracking: false,
      storeManagement: false,
      wardManagement: false,
      timetableShifts: true,
      geofencing: true
    }
  },
  {
    id: 'office',
    name: 'Office & Corporate',
    shortName: 'Corporate',
    iconName: 'Briefcase',
    badge: 'Enterprise HQ',
    accentColor: '#3B82F6',
    description: 'Corporate headquarters and tech company setup with hybrid work policies, department teams, and turnstile badge integrations.',
    searchKeywords: ['office', 'corporate', 'company', 'startup', 'tech', 'desk', 'headquarters', 'hq', 'finance', 'agency'],
    keyModules: [
      'Hybrid & Office-Based Work Tracking',
      'Corporate Turnstiles & Floor Badging',
      'Department Rosters & Org Hierarchy',
      'Salary Slips, Overtime & Leave Ledger',
      'Geofenced Mobile Punching',
      'Visitor Badge Management'
    ],
    terminology: {
      employee: 'Corporate Associate',
      employees: 'Team Members',
      worksite: 'Corporate Office / Floor',
      checkIn: 'Turnstile Swipe',
      shift: 'Standard Business Hours',
      device: 'Turnstile Biometric Pod',
      department: 'Corporate Department'
    },
    metrics: [
      { id: 'm1', label: 'In-Office Attendance', getValue: (d) => `${d.presentCount} / ${d.totalEmployees}`, subtext: '88% Attendance Ratio', color: 'text-emerald-400' },
      { id: 'm2', label: 'Hybrid Remote Staff', getValue: () => '2 Remote', subtext: 'Logged via Geofence App', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'HQ Turnstiles', getValue: (d) => `${d.activeCameras} Pods`, subtext: 'Lobby & Floor Access', color: 'text-sky-400' },
      { id: 'm4', label: 'Punctuality Score', getValue: (d) => `${Math.round(((d.presentCount - d.lateCount) / Math.max(d.presentCount, 1)) * 100)}%`, subtext: 'Within 15m Grace Period', color: 'text-indigo-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Department Teams', description: 'Manage engineering, design, sales, and executive teams', targetTab: 'departments' },
      { id: 'w2', label: 'Flexible Work Policy', description: 'Configure 9-to-6 core hours and grace periods', targetTab: 'work_policy' },
      { id: 'w3', label: 'Monthly Corporate Payroll', description: 'Review base salary, bonus, and deduction slips', targetTab: 'payroll' }
    ],
    sampleAlerts: [
      'Main Lobby: System Administrator verified via RFID pass',
      'Floor 4 Design Studio: Product design team checked in at 09:30 AM',
      'Server Room: Two-factor biometric verification confirmed'
    ],
    features: {
      nightShift: false,
      multiGate: true,
      contractorTracking: false,
      storeManagement: false,
      wardManagement: false,
      timetableShifts: false,
      geofencing: true
    }
  },
  {
    id: 'hotel',
    name: 'Hotel & Hospitality',
    shortName: 'Hospitality',
    iconName: 'Hotel',
    badge: 'Guest Ready',
    accentColor: '#F43F5E',
    description: 'Front-desk, housekeeping, concierge, kitchen, and banquet teams operating 24/7 guest service shifts with service staff tracking.',
    searchKeywords: ['hotel', 'resort', 'hospitality', 'concierge', 'housekeeping', 'front desk', 'banquet', 'guest'],
    keyModules: [
      'Front Desk & Concierge Shift Rosters',
      'Housekeeping Floor Cleaning Attendance',
      'Banquet & Event Surge Staffing',
      'Kitchen & Dining Service Tracking',
      'Service Gratuity & Overtime Payroll'
    ],
    terminology: {
      employee: 'Hospitality Associate',
      employees: 'Service Crew & Concierge',
      worksite: 'Hotel Floor / Banquet Hall',
      checkIn: 'Service Clock-in',
      shift: 'Guest Service Shift',
      device: 'Staff Entry Scanner',
      department: 'Hospitality Department'
    },
    metrics: [
      { id: 'm1', label: 'Crew On Service Duty', getValue: (d) => `${d.presentCount} Staff`, subtext: '100% Guest Coverage', color: 'text-emerald-400' },
      { id: 'm2', label: 'Housekeeping Assigned', getValue: () => '8 Floors', subtext: 'Rooms Cleaned On Schedule', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Staff Entry Points', getValue: (d) => `${d.activeCameras} Nodes`, subtext: 'Back of House Active', color: 'text-sky-400' },
      { id: 'm4', label: 'Banquet Surge Hours', getValue: () => '16.5 Hrs', subtext: 'Weekend Event Active', color: 'text-rose-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Guest Service Shifts', description: 'Schedule morning, afternoon, and night desk staff', targetTab: 'work_policy' },
      { id: 'w2', label: 'Housekeeping Allocations', description: 'Assign attendants per floor and wing', targetTab: 'departments' }
    ],
    sampleAlerts: ['Back of House: Morning kitchen brigade check-in verified', 'Banquet Hall: Weekend surge staff clocked in'],
    features: { nightShift: true, multiGate: true, contractorTracking: true, storeManagement: false, wardManagement: false, timetableShifts: false, geofencing: true }
  },
  {
    id: 'warehouse',
    name: 'Warehouse & Logistics',
    shortName: 'Logistics',
    iconName: 'Boxes',
    badge: 'Supply Chain',
    accentColor: '#FB923C',
    description: 'Logistics hubs, fulfillment centers, forklift drivers, dispatchers, loading bay gates, and cargo handler attendance.',
    searchKeywords: ['warehouse', 'logistics', 'depot', 'fulfillment', 'freight', 'cargo', 'dock', 'distribution', 'supply chain'],
    keyModules: [
      'Forklift & Heavy Equipment Operator Verification',
      'Loading Bay & Dock Gate Tracking',
      'Shift Turnaround & Night Dispatch Roster',
      'Hazard Zone PPE AI Detection'
    ],
    terminology: {
      employee: 'Warehouse Associate / Driver',
      employees: 'Handlers & Drivers',
      worksite: 'Fulfillment Hub / Dock',
      checkIn: 'Dock Punch',
      shift: 'Dispatch Shift',
      device: 'Bay Entry Biometric Gate',
      department: 'Logistics Zone'
    },
    metrics: [
      { id: 'm1', label: 'Dock Operators Present', getValue: (d) => `${d.presentCount} Active`, subtext: 'All 6 Bays Staffed', color: 'text-emerald-400' },
      { id: 'm2', label: 'Loading Bays Operating', getValue: () => '6 / 6 Bays', subtext: 'Zero Cargo Bottlenecks', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Perimeter CCTV Nodes', getValue: (d) => `${d.activeCameras} Cameras`, subtext: 'Forklift Zone AI', color: 'text-sky-400' },
      { id: 'm4', label: 'Overtime Hours Logged', getValue: (d) => `${d.lateCount * 3} Hrs`, subtext: 'High-Demand Peak', color: 'text-amber-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Bay Operator Roster', description: 'Manage cargo handlers across docks 1-6', targetTab: 'departments' },
      { id: 'w2', label: 'Hazard Zone Surveillance', description: 'Monitor forklift pathway clearance and safety', targetTab: 'camera_settings' }
    ],
    sampleAlerts: ['Loading Bay 3: Forklift operator clocked in with valid license', 'Perimeter Gate: Night dispatch shift underway'],
    features: { nightShift: true, multiGate: true, contractorTracking: true, storeManagement: false, wardManagement: false, timetableShifts: false, geofencing: true }
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Food Service',
    shortName: 'Restaurant',
    iconName: 'Utensils',
    badge: 'Food Safe',
    accentColor: '#E11D48',
    description: 'Head chefs, line cooks, servers, and bartenders with lunch/dinner split shifts, tip tracking, and kitchen hygiene compliance.',
    searchKeywords: ['restaurant', 'cafe', 'dining', 'kitchen', 'food service', 'chef', 'waiter', 'bartender', 'hospitality'],
    keyModules: [
      'Kitchen Brigade & Dining Server Roster',
      'Split Shifts (Lunch & Dinner Rush)',
      'Hygiene & Kitchen Hairnet AI Verification',
      'Hourly Wage & Tip Share Calculation'
    ],
    terminology: {
      employee: 'Kitchen / Dining Associate',
      employees: 'Chefs & Servers',
      worksite: 'Kitchen / Dining Room',
      checkIn: 'Shift Punch',
      shift: 'Lunch / Dinner Shift',
      device: 'Service Clock Terminal',
      department: 'Service Station'
    },
    metrics: [
      { id: 'm1', label: 'Chefs & Servers On Duty', getValue: (d) => `${d.presentCount} Crew`, subtext: 'Full Dining Room Ready', color: 'text-emerald-400' },
      { id: 'm2', label: 'Kitchen Brigade Status', getValue: () => 'Executive Chef Active', subtext: 'Food Safety Verified', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Station Scanners', getValue: (d) => `${d.activeCameras} Stations`, subtext: 'Contactless Verification', color: 'text-sky-400' },
      { id: 'm4', label: 'Dinner Shift Transition', getValue: () => '16:30 PM', subtext: 'Line Cook Handover', color: 'text-rose-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Kitchen Brigade Roster', description: 'Manage prep cooks, line chefs, and dishwashers', targetTab: 'employees' },
      { id: 'w2', label: 'Lunch / Dinner Split Shift', description: 'Configure split shifts with break windows', targetTab: 'work_policy' }
    ],
    sampleAlerts: ['Main Kitchen: Line cook hygiene check verified via edge scanner', 'Dining Room: Evening service staff clocked in'],
    features: { nightShift: false, multiGate: false, contractorTracking: false, storeManagement: false, wardManagement: false, timetableShifts: true, geofencing: true }
  },
  {
    id: 'construction',
    name: 'Construction Site / निर्माण साइट',
    shortName: 'Construction',
    iconName: 'HardHat',
    badge: 'Safety First',
    accentColor: '#EA580C',
    description: 'Heavy civil projects, subcontractors, crane operators, turnstile container pods, and OSHA/PPE safety helmet detection.',
    searchKeywords: [
      'construction',
      'builder',
      'site',
      'civil',
      'contractor',
      'engineer',
      'scaffolding',
      'osha',
      'safety',
      'side',
      'कन्स्ट्रक्शन',
      'कन्स्ट्रक्सन',
      'साइड',
      'निर्माण'
    ],
    keyModules: [
      'Subcontractor & Day-Labor Verification',
      'Turnstile Shipping Container Site Gates',
      'Automated Hardhat & High-Vis Vest AI Checks',
      'Inclement Weather Shift Cancellations'
    ],
    terminology: {
      employee: 'Site Operative / Subcontractor',
      employees: 'Trades & Laborers',
      worksite: 'Construction Jobsite',
      checkIn: 'Turnstile Badge In',
      shift: 'Day Shift (07:00 - 16:00)',
      device: 'Ruggedized Container Pod',
      department: 'Trade / Subcontractor'
    },
    metrics: [
      { id: 'm1', label: 'Site Tradesmen Present', getValue: (d) => `${d.presentCount} On Site`, subtext: 'Civil, Electrical, Steel', color: 'text-emerald-400' },
      { id: 'm2', label: 'PPE Compliance Score', getValue: () => '99.4%', subtext: 'Hardhats & Vests Enforced', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Container Turnstiles', getValue: (d) => `${d.activeCameras} Pods`, subtext: 'Weather-Proof Active', color: 'text-sky-400' },
      { id: 'm4', label: 'Subcontractor Count', getValue: () => '4 Subcontractors', subtext: 'All Insurances Verified', color: 'text-orange-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Subcontractor Trade Audit', description: 'Verify daily labor numbers per contractor', targetTab: 'employees' },
      { id: 'w2', label: 'Site Gate Security', description: 'Audit ruggedized biometric gates at site perimeter', targetTab: 'camera_settings' }
    ],
    sampleAlerts: ['Perimeter Pod 1: Subcontractor crew of 12 logged in', 'Zone C High-Rise: All workers verified with PPE equipment'],
    features: { nightShift: false, multiGate: true, contractorTracking: true, storeManagement: false, wardManagement: false, timetableShifts: false, geofencing: true }
  },
  {
    id: 'medical_store',
    name: 'Medical Store & Pharmacy / मेडिकल स्टोर',
    shortName: 'Medical Store',
    iconName: 'Pill',
    badge: 'Pharma Retail',
    accentColor: '#10B981',
    description: 'Designed for retail pharmacies, chemist shops, and medical stores with licensed pharmacist attendance, shift handovers, and medicine counter biometrics.',
    searchKeywords: [
      'medical store',
      'medical',
      'pharmacy',
      'chemist',
      'chemist shop',
      'medicine',
      'pharmacist',
      'दवा दुकान',
      'मेडिकल स्टोर',
      'मेडिकल',
      'दवा'
    ],
    keyModules: [
      'Licensed Pharmacist Counter Attendance',
      'Medicine Dispensing & Cashier Shifts',
      'High-Value Medicine Cabinet Biometric Lock',
      'Single/Dual CCTV RTSP Counter Monitoring',
      'Daily Store Opening/Closing Compliance',
      'Drug Inspector Regulatory Audit Trail'
    ],
    terminology: {
      employee: 'Pharmacist / Store Associate',
      employees: 'Pharmacists & Counter Staff',
      worksite: 'Pharmacy Counter / Store Floor',
      checkIn: 'Counter Clock-in',
      shift: 'Store Shift (Morning/Evening)',
      device: 'Counter Biometric Terminal',
      department: 'Pharmacy Counter'
    },
    metrics: [
      { id: 'm1', label: 'Pharmacists On Duty', getValue: (d) => `${d.presentCount} Active`, subtext: 'Registered License On-Site', color: 'text-emerald-400' },
      { id: 'm2', label: 'Counter Opening Status', getValue: () => 'Open 08:00 - 23:00', subtext: '100% Shift Coverage', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Counter CCTV Node', getValue: (d) => `${d.activeCameras} RTSP Cam`, subtext: 'Cash & Medicine Bay Active', color: 'text-sky-400' },
      { id: 'm4', label: 'Regulatory Compliance', getValue: () => '100% Verified', subtext: 'License Valid', color: 'text-teal-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Pharmacist License Registry', description: 'Audit state pharmacy council license registrations', targetTab: 'employees', badge: 'Certified' },
      { id: 'w2', label: 'Store Opening Schedule', description: 'Configure pharmacist morning and evening counter shifts', targetTab: 'work_policy' },
      { id: 'w3', label: 'Biometric Access Ledger', description: 'Inspect CCTV passkey authentication logs at cashier', targetTab: 'biometric_logs' }
    ],
    sampleAlerts: [
      'Main Counter: Registered Chief Pharmacist clocked in with license verification',
      'Dispensing Bay: CCTV edge node active with zero unauthorized access'
    ],
    features: {
      nightShift: false,
      multiGate: false,
      contractorTracking: false,
      storeManagement: true,
      wardManagement: false,
      timetableShifts: true,
      geofencing: true
    }
  },
  {
    id: 'security',
    name: 'Security Agency',
    shortName: 'Security Agency',
    iconName: 'Shield',
    badge: 'Patrol Active',
    accentColor: '#10B981',
    description: 'Private security firms managing guards, patrol officers, perimeter sentinels, client post assignments, and shift handovers.',
    searchKeywords: ['security', 'guard', 'patrol', 'sentinel', 'surveillance', 'checkpoint', 'officer', 'bouncer', 'defense'],
    keyModules: [
      'Guard Roster & Client Post Allocation',
      'Perimeter Patrol RFID Checkpoint Scans',
      'Armed / Unarmed Guard Certifications',
      'Guard Shift Handover & Incident Logs'
    ],
    terminology: {
      employee: 'Security Officer / Guard',
      employees: 'Guards & Supervisors',
      worksite: 'Client Post / Sentinel Station',
      checkIn: 'Post Clock-in',
      shift: 'Patrol Rotation (12h)',
      device: 'Field Patrol Scanner',
      department: 'Client Contract / Zone'
    },
    metrics: [
      { id: 'm1', label: 'Officers On Active Post', getValue: (d) => `${d.presentCount} Guards`, subtext: '100% Client Coverage', color: 'text-emerald-400' },
      { id: 'm2', label: 'Patrol Checkpoints Scanned', getValue: () => '142 / 150', subtext: 'RFID Tag Verification', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Surveillance Nodes', getValue: (d) => `${d.activeCameras} CCTV Feeds`, subtext: 'Live Perimeter Streams', color: 'text-sky-400' },
      { id: 'm4', label: 'Incident Reports Today', getValue: () => '0 Breach', subtext: 'All Perimeters Clear', color: 'text-emerald-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Guard Post Allocations', description: 'Assign guards to commercial client sites', targetTab: 'departments' },
      { id: 'w2', label: 'Patrol Beat Schedule', description: 'Schedule 12-hour rotating sentinel shifts', targetTab: 'work_policy' }
    ],
    sampleAlerts: ['Post Alpha: Night guard handover completed with zero anomalies', 'Client Post 4: Guard arrived on duty at 18:00 sharp'],
    features: { nightShift: true, multiGate: true, contractorTracking: true, storeManagement: false, wardManagement: false, timetableShifts: false, geofencing: true }
  },
  {
    id: 'salon',
    name: 'Salon & Beauty Business',
    shortName: 'Salon & Spa',
    iconName: 'Scissors',
    badge: 'Appointment',
    accentColor: '#A855F7',
    description: 'Hair salons, luxury spas, nail studios, and wellness clinics with stylist stations, appointment commission, and attendance.',
    searchKeywords: ['salon', 'spa', 'beauty', 'stylist', 'grooming', 'wellness', 'barber', 'cosmetic', 'esthetician'],
    keyModules: [
      'Stylist & Esthetician Chair Attendance',
      'Commission & Gratuity Calculation',
      'Appointment Scheduling Shift Sync',
      'Booth Rental / Staff Tier Tracking'
    ],
    terminology: {
      employee: 'Stylist / Specialist',
      employees: 'Stylists & Therapists',
      worksite: 'Salon Studio / Station',
      checkIn: 'Chair Clock-in',
      shift: 'Salon Day Shift',
      device: 'Tablet Reception Terminal',
      department: 'Styling Department'
    },
    metrics: [
      { id: 'm1', label: 'Stylists At Stations', getValue: (d) => `${d.presentCount} Active`, subtext: 'All Stations Operational', color: 'text-emerald-400' },
      { id: 'm2', label: 'Booked Appointments', getValue: () => '38 Clients', subtext: 'Day At Full Capacity', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Reception Terminals', getValue: (d) => `${d.activeCameras} Kiosks`, subtext: 'Staff & Guest Check-in', color: 'text-sky-400' },
      { id: 'm4', label: 'Commission Tier', getValue: () => 'Tier 1 (45%)', subtext: 'Weekly Target Met', color: 'text-purple-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Stylist Stations Roster', description: 'Manage master stylists, colorists, and assistants', targetTab: 'employees' },
      { id: 'w2', label: 'Service Commission Payouts', description: 'Review weekly services and commission splits', targetTab: 'payroll' }
    ],
    sampleAlerts: ['Station 1: Master Colorist clocked in at 09:15 AM', 'Studio Reception: Daily staff attendance 100% verified'],
    features: { nightShift: false, multiGate: false, contractorTracking: false, storeManagement: false, wardManagement: false, timetableShifts: true, geofencing: true }
  },
  {
    id: 'enterprise',
    name: 'Multi-Branch Enterprise',
    shortName: 'Enterprise',
    iconName: 'Network',
    badge: 'Multi-Region',
    accentColor: '#6366F1',
    description: 'Conglomerates and multi-region organizations with dozens of subsidiaries, regional branches, and centralized executive analytics.',
    searchKeywords: ['enterprise', 'multi-branch', 'conglomerate', 'subsidiary', 'regional', 'multinational', 'hq', 'branches'],
    keyModules: [
      'Centralized Global Workforce Analytics',
      'Multi-Branch Tenant Partitioning',
      'Cross-Site Roaming Employee Clock-ins',
      'Consolidated Enterprise Payroll Engine',
      'Enterprise API & Active Directory Sync'
    ],
    terminology: {
      employee: 'Enterprise Associate',
      employees: 'Global Workforce',
      worksite: 'Regional Branch / Facility',
      checkIn: 'Unified SSO Swipe',
      shift: 'Enterprise Global Shift',
      device: 'Centralized Edge Hub',
      department: 'Business Unit / Division'
    },
    metrics: [
      { id: 'm1', label: 'Global Workforce', getValue: (d) => `${d.presentCount} / ${d.totalEmployees}`, subtext: 'Across 8 Operating Branches', color: 'text-emerald-400' },
      { id: 'm2', label: 'Active Subsidiaries', getValue: () => '4 Entities', subtext: 'Automotive, Tech, Energy', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Enterprise CCTV Mesh', getValue: (d) => `${d.activeCameras} Nodes`, subtext: 'Federated Edge AI', color: 'text-sky-400' },
      { id: 'm4', label: 'Enterprise Compliance', getValue: () => '99.9% SLA', subtext: 'SOC 2 & GDPR Verified', color: 'text-indigo-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Branch Locations Directory', description: 'Audit all regional facilities and branches', targetTab: 'departments' },
      { id: 'w2', label: 'Consolidated Payroll Ledger', description: 'Review multi-currency and cross-branch payroll', targetTab: 'payroll' },
      { id: 'w3', label: 'Enterprise API & Active Directory', description: 'Manage federated OAuth and enterprise SSO', targetTab: 'integrations' }
    ],
    sampleAlerts: ['Branch 01 (Munich HQ): Executive team check-in confirmed', 'Branch 04 (Singapore Hub): Edge CCTV synchronization active'],
    features: { nightShift: true, multiGate: true, contractorTracking: true, storeManagement: true, wardManagement: false, timetableShifts: true, geofencing: true }
  },
  {
    id: 'custom',
    name: 'Custom Business',
    shortName: 'Custom',
    iconName: 'Sparkles',
    badge: 'Configurable',
    accentColor: '#E6FF00',
    description: 'Fully customizable baseline for specialized businesses with custom department definitions, flexible shift rules, and custom camera setups.',
    searchKeywords: ['custom', 'other', 'general', 'flexible', 'specialized', 'business', 'studio', 'custom business'],
    keyModules: [
      'Custom Department & Role Builder',
      'Configurable Grace Periods & Overtime',
      'Universal CCTV RTSP Camera Link',
      'Full-Stack PostgreSQL Data Persistence'
    ],
    terminology: {
      employee: 'Team Member',
      employees: 'Staff Members',
      worksite: 'Workplace / Site',
      checkIn: 'Attendance Punch',
      shift: 'Scheduled Shift',
      device: 'Biometric Attendance Device',
      department: 'Department / Unit'
    },
    metrics: [
      { id: 'm1', label: 'Staff Present Today', getValue: (d) => `${d.presentCount} / ${d.totalEmployees}`, subtext: 'Active Attendance', color: 'text-emerald-400' },
      { id: 'm2', label: 'Attendance Ratio', getValue: (d) => `${Math.round((d.presentCount / Math.max(d.totalEmployees, 1)) * 100)}%`, subtext: 'Daily Attendance', color: 'text-[#E6FF00]' },
      { id: 'm3', label: 'Connected Cameras', getValue: (d) => `${d.activeCameras} Active`, subtext: 'RTSP Stream Online', color: 'text-sky-400' },
      { id: 'm4', label: 'Late Punch Count', getValue: (d) => `${d.lateCount}`, subtext: 'Over Grace Period', color: 'text-orange-400' }
    ],
    workflows: [
      { id: 'w1', label: 'Custom Attendance Policy', description: 'Tailor grace periods and overtime multipliers', targetTab: 'work_policy' },
      { id: 'w2', label: 'Camera & Device Registry', description: 'Configure custom RTSP IP cameras and ROI zones', targetTab: 'camera_settings' }
    ],
    sampleAlerts: ['Edge Scanner: Staff member attendance punched successfully', 'System Health: Database synchronization active'],
    features: { nightShift: true, multiGate: true, contractorTracking: true, storeManagement: false, wardManagement: false, timetableShifts: false, geofencing: true }
  }
];

/**
 * Direct lookup dictionary of industry configurations by id (e.g. industryRegistry.factory)
 */
export const industryRegistry: Record<string, IndustryConfig> = SUPPORTED_INDUSTRIES.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<string, IndustryConfig>
);

export function findIndustryById(id: string): IndustryConfig {
  const norm = id.toLowerCase().trim();
  const match = industryRegistry[norm] || SUPPORTED_INDUSTRIES.find((i) => i.id === norm);
  return match || SUPPORTED_INDUSTRIES[0]; // Default to Factory
}

export function searchIndustries(query: string): IndustryConfig[] {
  const q = query.toLowerCase().trim();
  if (!q) return SUPPORTED_INDUSTRIES;

  return SUPPORTED_INDUSTRIES.filter((ind) => {
    if (ind.name.toLowerCase().includes(q)) return true;
    if (ind.shortName.toLowerCase().includes(q)) return true;
    if (ind.description.toLowerCase().includes(q)) return true;
    return ind.searchKeywords.some((kw) => kw.toLowerCase().includes(q) || q.includes(kw.toLowerCase()));
  });
}

export default industryRegistry;
