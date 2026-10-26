import { calculateHaversineDistance, isWithinGeofence, type GeoCoordinate } from './geofence.ts';

export interface GeofencePerimeter {
  id: string;
  name: string;
  center: GeoCoordinate;
  radiusMeters: number;
  color: string;
  description: string;
}

export interface EmployeePunchLocation {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  avatar?: string;
  coordinate: GeoCoordinate;
  timestamp: string;
  status: 'verified_inside' | 'violation_outside' | 'contractor_gate';
  source: 'CCTV_EDGE_NODE' | 'MOBILE_GEOFENCE_GPS' | 'NFC_TURNSTILE';
  matchedPerimeterId?: string;
  distanceFromCenterMeters: number;
  notes?: string;
}

export const DEFAULT_CAMPUS_CENTER: GeoCoordinate = {
  latitude: 37.7749,
  longitude: -122.4194
};

export const DEFAULT_PERIMETERS: GeofencePerimeter[] = [
  {
    id: 'perim-main-plant',
    name: 'Main Plant & Manufacturing Bay',
    center: { latitude: 37.7749, longitude: -122.4194 },
    radiusMeters: 250,
    color: '#FFA069',
    description: 'Primary industrial manufacturing floor & assembly lines'
  },
  {
    id: 'perim-logistics-dock',
    name: 'Logistics Dock & Turnstile Gates',
    center: { latitude: 37.7762, longitude: -122.4182 },
    radiusMeters: 120,
    color: '#C7F238',
    description: 'Heavy vehicle bays, container gates & high-speed turnstiles'
  },
  {
    id: 'perim-engineering-annex',
    name: 'Engineering & R&D Annex',
    center: { latitude: 37.7735, longitude: -122.4210 },
    radiusMeters: 160,
    color: '#38BDF8',
    description: 'Hardware lab, clean room & executive design offices'
  }
];

export const INITIAL_PUNCH_LOCATIONS: EmployeePunchLocation[] = [
  {
    id: 'punch-01',
    employeeId: 'EMP-001',
    employeeName: 'Helen Vasilovsky',
    department: 'Product Design',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    coordinate: { latitude: 37.7747, longitude: -122.4192 },
    timestamp: '08:58:12 AM',
    status: 'verified_inside',
    source: 'CCTV_EDGE_NODE',
    matchedPerimeterId: 'perim-main-plant',
    distanceFromCenterMeters: 28,
    notes: 'CP PLUS Gate 1 North Turnstile Face Match'
  },
  {
    id: 'punch-02',
    employeeId: 'EMP-002',
    employeeName: 'Asif Khan',
    department: 'IT & Infrastructure',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    coordinate: { latitude: 37.7761, longitude: -122.4183 },
    timestamp: '09:02:45 AM',
    status: 'verified_inside',
    source: 'CCTV_EDGE_NODE',
    matchedPerimeterId: 'perim-logistics-dock',
    distanceFromCenterMeters: 14,
    notes: 'Gate 2 Logistics Dock CCTV 12ms Verification'
  },
  {
    id: 'punch-03',
    employeeId: 'EMP-003',
    employeeName: 'Marcus Vance',
    department: 'Facility Security',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    coordinate: { latitude: 37.7736, longitude: -122.4208 },
    timestamp: '08:45:00 AM',
    status: 'verified_inside',
    source: 'NFC_TURNSTILE',
    matchedPerimeterId: 'perim-engineering-annex',
    distanceFromCenterMeters: 22,
    notes: 'R&D Annex Turnstile Badge + Biometric Pass'
  },
  {
    id: 'punch-04',
    employeeId: 'EMP-004',
    employeeName: 'David Miller',
    department: 'Operations & Machining',
    coordinate: { latitude: 37.7785, longitude: -122.4150 },
    timestamp: '09:15:30 AM',
    status: 'violation_outside',
    source: 'MOBILE_GEOFENCE_GPS',
    distanceFromCenterMeters: 540,
    notes: 'Clock-in attempted 540m outside authorized factory perimeter'
  },
  {
    id: 'punch-05',
    employeeId: 'EMP-005',
    employeeName: 'Elena Rostova',
    department: 'Quality Assurance',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    coordinate: { latitude: 37.7752, longitude: -122.4197 },
    timestamp: '08:52:19 AM',
    status: 'verified_inside',
    source: 'CCTV_EDGE_NODE',
    matchedPerimeterId: 'perim-main-plant',
    distanceFromCenterMeters: 45,
    notes: 'Quality Assurance Entrance CCTV'
  }
];

export function filterPunchLocations(
  punches: EmployeePunchLocation[],
  filter: 'all' | 'verified_inside' | 'violation_outside' | 'contractor_gate'
): EmployeePunchLocation[] {
  if (filter === 'all') return punches;
  return punches.filter((p) => p.status === filter);
}

export function calculateGeofenceSummary(
  punches: EmployeePunchLocation[],
  perimeters: GeofencePerimeter[]
): {
  totalPunches: number;
  inBoundsCount: number;
  outOfBoundsCount: number;
  complianceRate: number;
  activePerimetersCount: number;
} {
  const total = punches.length;
  const inBounds = punches.filter((p) => p.status === 'verified_inside').length;
  const outOfBounds = punches.filter((p) => p.status === 'violation_outside').length;
  const compliance = total > 0 ? Math.round((inBounds / total) * 1000) / 10 : 100;

  return {
    totalPunches: total,
    inBoundsCount: inBounds,
    outOfBoundsCount: outOfBounds,
    complianceRate: compliance,
    activePerimetersCount: perimeters.length
  };
}

export function generateSimulatedPunch(
  center: GeoCoordinate = DEFAULT_CAMPUS_CENTER,
  forceViolation: boolean = false
): EmployeePunchLocation {
  const staff = [
    { name: 'Sarah Jenkins', id: 'EMP-012', dept: 'HR & Payroll' },
    { name: 'Michael Chen', id: 'EMP-015', dept: 'Robotics Engineering' },
    { name: 'Jessica Taylor', id: 'EMP-019', dept: 'Logistics' },
    { name: 'Robert Fox', id: 'EMP-022', dept: 'Assembly Line' }
  ];
  const picked = staff[Math.floor(Math.random() * staff.length)];

  // If force violation, distance > 300m, otherwise distance < 180m
  const distance = forceViolation ? 320 + Math.random() * 250 : 20 + Math.random() * 140;
  const angle = Math.random() * 2 * Math.PI;

  // Approximate lat/lon delta: 1 deg lat ~ 111,000m
  const deltaLat = (distance * Math.cos(angle)) / 111000;
  const deltaLon = (distance * Math.sin(angle)) / (111000 * Math.cos((center.latitude * Math.PI) / 180));

  const coordinate: GeoCoordinate = {
    latitude: Number((center.latitude + deltaLat).toFixed(6)),
    longitude: Number((center.longitude + deltaLon).toFixed(6))
  };

  const actualDistance = calculateHaversineDistance(coordinate, center);
  const isInside = actualDistance <= 250;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return {
    id: `punch-sim-${Date.now()}`,
    employeeId: picked.id,
    employeeName: picked.name,
    department: picked.dept,
    coordinate,
    timestamp: timeStr,
    status: isInside ? 'verified_inside' : 'violation_outside',
    source: 'MOBILE_GEOFENCE_GPS',
    matchedPerimeterId: isInside ? 'perim-main-plant' : undefined,
    distanceFromCenterMeters: actualDistance,
    notes: isInside
      ? `Mobile Pass GPS Verified within plant bounds (${actualDistance}m)`
      : `Geofence Violation: Clock-in rejected (${actualDistance}m outside threshold)`
  };
}
