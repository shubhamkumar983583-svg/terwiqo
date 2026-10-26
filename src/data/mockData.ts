export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  authorized: boolean;
  role?: string;
  avatar?: string;
  employeeId: string;
  baseSalary: number;
  allowance: number;
  joinDate: string;
  address: string;
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Leave' | 'Holiday' | 'Half Day';
  isLate: boolean;
  firstIn: string;
  lastOut: string;
  totalHours: string;
  overtime: string;
}

export interface CameraConfig {
  id: string;
  name: string;
  location: string;
  source: string;
  status: 'Active' | 'Failed' | 'No Source';
  fps: number;
  roiSaved: boolean;
  model: string;
  alertEnabled: boolean;
}

export interface WorkPolicy {
  id: string;
  employee: string;
  workingDays: number;
  hours: number;
  presentHours: number;
  halfDay: number;
  weeklyOff: string;
  absentPolicy: string;
  latePolicy: string;
  grace: string;
  allowedLate: number;
}

export interface HolidayRequest {
  id: string;
  name: string;
  date: string;
  employees: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Asif Khan',
    email: 'dedaatish@gmail.com',
    phone: '09525845873',
    department: 'IT',
    authorized: true,
    employeeId: '15200',
    baseSalary: 1200,
    allowance: 200,
    joinDate: '2024-01-15',
    address: 'Haidarnagar Bhai bigha paithan toli Near Government urdu sc'
  },
  {
    id: '2',
    name: 'Nargish',
    email: 'asifkhanhdn75@gmail.com',
    phone: '09525845873',
    department: 'IT',
    authorized: true,
    employeeId: '5474114',
    baseSalary: 1100,
    allowance: 150,
    joinDate: '2024-02-01',
    address: 'Main Road Sector 4, Commercial Complex'
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@gmail.com',
    phone: '9876543210',
    department: 'IT',
    authorized: true,
    employeeId: '10024',
    baseSalary: 1400,
    allowance: 250,
    joinDate: '2023-11-10',
    address: 'Building 12, Tech Park Avenue'
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane@gmail.com',
    phone: '9123456780',
    department: 'IT',
    authorized: true,
    employeeId: 'EMP002',
    baseSalary: 1350,
    allowance: 200,
    joinDate: '2023-08-20',
    address: 'Greenwood Residency, Flat 402'
  },
  {
    id: '5',
    name: 'Rahul Verma',
    email: 'rahul@gmail.com',
    phone: '9988776655',
    department: 'IT',
    authorized: true,
    employeeId: '10089',
    baseSalary: 1150,
    allowance: 150,
    joinDate: '2024-03-05',
    address: 'Station Road, Old City Area'
  },
  {
    id: '6',
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    phone: '9090909090',
    department: 'IT',
    authorized: true,
    employeeId: '10095',
    baseSalary: 1250,
    allowance: 180,
    joinDate: '2024-01-10',
    address: 'Sunshine Enclave, Tower B'
  }
];

export const INITIAL_CAMERAS: CameraConfig[] = [
  {
    id: 'cam-1',
    name: 'CP PLUS',
    location: 'Gate 1',
    source: 'rtsp://192.168.0.11:554/stream0',
    status: 'Active',
    fps: 33,
    roiSaved: true,
    model: 'Default Model',
    alertEnabled: true
  },
  {
    id: 'cam-2',
    name: 'CP PLUS',
    location: 'Gate 2',
    source: 'rtsp://192.168.0.11:554/stream1',
    status: 'Active',
    fps: 30,
    roiSaved: true,
    model: 'Default Model',
    alertEnabled: true
  },
  {
    id: 'cam-3',
    name: 'Hikvision Dome',
    location: 'Front Gate',
    source: 'rtsp://192.168.0.12:554/live',
    status: 'Active',
    fps: 25,
    roiSaved: false,
    model: 'Safety PPE Model',
    alertEnabled: true
  },
  {
    id: 'cam-4',
    name: 'Dahua Bullet',
    location: 'Gate 4',
    source: 'rtsp://192.168.0.14:554/stream0',
    status: 'Active',
    fps: 30,
    roiSaved: true,
    model: 'Default Model',
    alertEnabled: true
  },
  {
    id: 'cam-5',
    name: 'Industrial PTZ',
    location: 'Gate 5',
    source: 'rtsp://192.168.0.15:554/stream0',
    status: 'Active',
    fps: 28,
    roiSaved: false,
    model: 'Default Model',
    alertEnabled: false
  },
  {
    id: 'cam-6',
    name: 'Turnstile AI',
    location: 'Gate 6',
    source: 'rtsp://192.168.0.16:554/stream0',
    status: 'Active',
    fps: 30,
    roiSaved: true,
    model: 'Default Model',
    alertEnabled: true
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    employeeName: 'Asif Khan',
    employeeId: '15200',
    date: 'July 24, 2026',
    status: 'Present',
    isLate: true,
    firstIn: '04:22:33 PM',
    lastOut: '08:52:33 PM',
    totalHours: '04:29:59',
    overtime: '00:00:00'
  },
  {
    id: 'att-2',
    employeeName: 'Jane Smith',
    employeeId: 'EMP002',
    date: 'July 24, 2026',
    status: 'Present',
    isLate: true,
    firstIn: '04:29:16 PM',
    lastOut: '09:49:54 PM',
    totalHours: '00:36:25',
    overtime: '00:00:00'
  },
  {
    id: 'att-3',
    employeeName: 'Demo',
    employeeId: '5474114',
    date: 'July 24, 2026',
    status: 'Present',
    isLate: false,
    firstIn: '09:49:43 PM',
    lastOut: '09:50:43 PM',
    totalHours: '00:01:00',
    overtime: '00:00:00'
  },
  {
    id: 'att-4',
    employeeName: 'Nargish',
    employeeId: '5474114',
    date: 'July 24, 2026',
    status: 'Absent',
    isLate: false,
    firstIn: '-',
    lastOut: '-',
    totalHours: '00:00:00',
    overtime: '00:00:00'
  },
  {
    id: 'att-5',
    employeeName: 'Rahul Verma',
    employeeId: '10089',
    date: 'July 24, 2026',
    status: 'Present',
    isLate: false,
    firstIn: '09:00:15 AM',
    lastOut: '06:05:22 PM',
    totalHours: '09:05:07',
    overtime: '01:05:07'
  },
  {
    id: 'att-6',
    employeeName: 'Priya Sharma',
    employeeId: '10095',
    date: 'July 24, 2026',
    status: 'Leave',
    isLate: false,
    firstIn: '-',
    lastOut: '-',
    totalHours: '00:00:00',
    overtime: '00:00:00'
  }
];

export const INITIAL_POLICIES: WorkPolicy[] = [
  {
    id: 'pol-1',
    employee: 'Asif Khan',
    workingDays: 26,
    hours: 8.0,
    presentHours: 8.0,
    halfDay: 1.0,
    weeklyOff: '—',
    absentPolicy: '1.00 Day Salary',
    latePolicy: '0.50 Day Salary',
    grace: '10 Min',
    allowedLate: 0
  },
  {
    id: 'pol-2',
    employee: 'Nargish',
    workingDays: 26,
    hours: 8.0,
    presentHours: 8.0,
    halfDay: 4.0,
    weeklyOff: '—',
    absentPolicy: '1.00 Day Salary',
    latePolicy: '₹ 0.00',
    grace: '10 Min',
    allowedLate: 0
  }
];

export const INITIAL_HOLIDAYS: HolidayRequest[] = [
  {
    id: 'hol-1',
    name: 'Default Camera',
    date: 'Feb. 10, 2026',
    employees: 'Asif Khan  Nargish  John Doe  Jane Smith  Rahul Verma  Priya Sharma',
    status: 'Approved'
  },
  {
    id: 'hol-2',
    name: 'Eid',
    date: 'Feb. 10, 2026',
    employees: 'John Doe',
    status: 'Approved'
  }
];

export interface QrAuditRecord {
  id: string;
  scanId: string;
  employeeId: string;
  employeeName: string;
  department: string;
  timestamp: string;
  rawTimestampMs: number;
  location: string;
  gateDevice: string;
  status: 'Verified' | 'Expired' | 'Tampered' | 'Out-of-Bounds' | 'Geofence Breach' | 'Signature Mismatch';
  actionType: string;
  tokenNonce: string;
  signaturePreview: string;
  latencyMs: number;
  ipAddress: string;
  failureReason?: string;
  gpsCoords?: { lat: number; lng: number };
}

export const INITIAL_QR_AUDIT_LOGS: QrAuditRecord[] = [
  {
    id: 'qr-log-01',
    scanId: 'QR-SCN-9021',
    employeeId: '15200',
    employeeName: 'Asif Khan',
    department: 'IT',
    timestamp: '2026-10-18 10:45:12 AM',
    rawTimestampMs: 1730000000000,
    location: 'Gate 1 - Main Turnstile',
    gateDevice: 'Turnstile-Kiosk-A1 (Honeywell HF680)',
    status: 'Verified',
    actionType: 'Check-In',
    tokenNonce: '8f3a9e1c',
    signaturePreview: '811c9dc5e82937af...4e912',
    latencyMs: 14,
    ipAddress: '192.168.1.101',
    gpsCoords: { lat: 28.6139, lng: 77.209 }
  },
  {
    id: 'qr-log-02',
    scanId: 'QR-SCN-9022',
    employeeId: '5474114',
    employeeName: 'Nargish',
    department: 'IT',
    timestamp: '2026-10-18 10:42:08 AM',
    rawTimestampMs: 1729999800000,
    location: 'Gate 2 - East Wing',
    gateDevice: 'Turnstile-Kiosk-B2 (ZKTeco ProCapture)',
    status: 'Verified',
    actionType: 'Check-In',
    tokenNonce: '4d19bb20',
    signaturePreview: 'b624f1092a1147cc...8910d',
    latencyMs: 16,
    ipAddress: '192.168.1.102',
    gpsCoords: { lat: 28.6141, lng: 77.2095 }
  },
  {
    id: 'qr-log-03',
    scanId: 'QR-SCN-9023',
    employeeId: '10024',
    employeeName: 'John Doe',
    department: 'IT',
    timestamp: '2026-10-18 10:38:50 AM',
    rawTimestampMs: 1729999600000,
    location: 'Server Room Access Pod',
    gateDevice: 'Scanner-Security-Pod-1 (Hikvision DS-K1T)',
    status: 'Verified',
    actionType: 'Secure Zone Access',
    tokenNonce: 'aa72ce90',
    signaturePreview: 'f72a912e841203aa...93bc1',
    latencyMs: 19,
    ipAddress: '192.168.2.55',
    gpsCoords: { lat: 28.6138, lng: 77.2088 }
  },
  {
    id: 'qr-log-04',
    scanId: 'QR-SCN-9024',
    employeeId: '10055',
    employeeName: 'Jane Smith',
    department: 'HR',
    timestamp: '2026-10-18 10:31:22 AM',
    rawTimestampMs: 1729999200000,
    location: 'HQ Lobby Pedestrian Gate',
    gateDevice: 'iPad Pro Kiosk #1 (WorkPulse Agent)',
    status: 'Expired',
    actionType: 'Check-In',
    tokenNonce: 'c01e9a71',
    signaturePreview: '992b11ef842910cc...12fa9',
    latencyMs: 12,
    ipAddress: '192.168.1.14',
    failureReason: 'Token TTL window expired (>30s rotation skew)'
  },
  {
    id: 'qr-log-05',
    scanId: 'QR-SCN-9025',
    employeeId: '10089',
    employeeName: 'Rahul Verma',
    department: 'Operations',
    timestamp: '2026-10-18 10:15:40 AM',
    rawTimestampMs: 1729998200000,
    location: 'South Warehouse Loading Bay',
    gateDevice: 'Rugged Scanner WH-4 (Zebra DS3678)',
    status: 'Verified',
    actionType: 'Check-In',
    tokenNonce: '2398df12',
    signaturePreview: '11fe89ca349120ff...ddee1',
    latencyMs: 24,
    ipAddress: '192.168.3.40',
    gpsCoords: { lat: 28.6145, lng: 77.211 }
  },
  {
    id: 'qr-log-06',
    scanId: 'QR-SCN-9026',
    employeeId: '10095',
    employeeName: 'Priya Sharma',
    department: 'Marketing',
    timestamp: '2026-10-18 09:58:14 AM',
    rawTimestampMs: 1729997200000,
    location: 'Remote Kiosk - West Hub',
    gateDevice: 'Mobile App Geofence (iOS v2.4.1)',
    status: 'Geofence Breach',
    actionType: 'Check-In',
    tokenNonce: '66fa33c1',
    signaturePreview: '55bc2990aa2101bb...34567',
    latencyMs: 31,
    ipAddress: '172.56.21.90',
    failureReason: 'GPS location (3.4 km outside 150m geofence perimeter)'
  },
  {
    id: 'qr-log-07',
    scanId: 'QR-SCN-9027',
    employeeId: 'UNKNOWN-99',
    employeeName: 'Unregistered Tag / Impostor',
    department: 'External',
    timestamp: '2026-10-18 09:44:02 AM',
    rawTimestampMs: 1729996400000,
    location: 'Gate 1 - Main Turnstile',
    gateDevice: 'Turnstile-Kiosk-A1 (Honeywell HF680)',
    status: 'Signature Mismatch',
    actionType: 'Turnstile Pass',
    tokenNonce: '00ffeedd',
    signaturePreview: 'ffffffff00000000...00000',
    latencyMs: 8,
    ipAddress: '192.168.1.101',
    failureReason: 'Cryptographic HMAC-SHA256 checksum invalid (possible cloned QR photo)'
  },
  {
    id: 'qr-log-08',
    scanId: 'QR-SCN-9028',
    employeeId: '15200',
    employeeName: 'Asif Khan',
    department: 'IT',
    timestamp: '2026-10-18 09:15:33 AM',
    rawTimestampMs: 1729994700000,
    location: 'Cafeteria Access Kiosk',
    gateDevice: 'Scanner Kiosk-C3 (Sunmi D2)',
    status: 'Verified',
    actionType: 'Turnstile Pass',
    tokenNonce: '77bb4411',
    signaturePreview: '43890bbfe1928301...12345',
    latencyMs: 15,
    ipAddress: '192.168.1.150'
  },
  {
    id: 'qr-log-09',
    scanId: 'QR-SCN-9029',
    employeeId: '5474114',
    employeeName: 'Nargish',
    department: 'IT',
    timestamp: '2026-10-18 08:55:10 AM',
    rawTimestampMs: 1729993500000,
    location: 'Gate 1 - Main Turnstile',
    gateDevice: 'Turnstile-Kiosk-A1 (Honeywell HF680)',
    status: 'Verified',
    actionType: 'Check-In',
    tokenNonce: '11ee22aa',
    signaturePreview: '11ee22aa33bb44cc...55dd6',
    latencyMs: 13,
    ipAddress: '192.168.1.101'
  },
  {
    id: 'qr-log-10',
    scanId: 'QR-SCN-9030',
    employeeId: '10024',
    employeeName: 'John Doe',
    department: 'IT',
    timestamp: '2026-10-18 08:48:00 AM',
    rawTimestampMs: 1729993100000,
    location: 'Gate 2 - East Wing',
    gateDevice: 'Turnstile-Kiosk-B2 (ZKTeco ProCapture)',
    status: 'Verified',
    actionType: 'Check-In',
    tokenNonce: '9922ff11',
    signaturePreview: '9922ff118833ee22...7744d',
    latencyMs: 17,
    ipAddress: '192.168.1.102'
  }
];

