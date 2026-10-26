import pg from 'pg';
import crypto from 'crypto';
import { DatabaseMigrator } from './migrator.ts';
import { serverConfig } from './config.ts';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  industry: string;
  plan_tier: string;
  created_at: Date;
}

export interface User {
  id: string;
  tenant_id: string;
  name: string;
  email: string;
  phone: string;
  password_hash: string;
  role: 'owner' | 'hr' | 'manager' | 'employee';
  job_title: string;
  department: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Session {
  id: string;
  user_id: string;
  tenant_id: string;
  expires_at: Date;
  ip_address: string;
  user_agent: string;
  created_at: Date;
}

export interface OtpRecord {
  id: string;
  user_id: string;
  code_hash: string;
  purpose: 'signup_verification' | 'password_reset';
  attempts: number;
  expires_at: Date;
  created_at: Date;
}

export interface AuditLog {
  id: string;
  tenant_id: string | null;
  user_id: string | null;
  action: string;
  status: 'SUCCESS' | 'FAILURE';
  ip_address: string;
  details: string;
  created_at: Date;
}

export interface BiometricLog {
  id: string;
  tenant_id: string;
  user_id?: string | null;
  employee_id: string;
  employee_name: string;
  department: string;
  camera_id: string;
  camera_name: string;
  status: 'verified' | 'failed' | 'anti_spoof_rejected' | 'mask_missing';
  confidence_score: number;
  latency_ms: number;
  relay_action: 'UNLOCKED' | 'LOCKED';
  direction: 'IN' | 'OUT';
  device_ip: string;
  failure_reason?: string;
  snapshot_url?: string;
  created_at: Date;
}

// In-Memory Fallback Store if PostgreSQL is not connected or in tests
class MemoryDatabase {
  tenants: Map<string, Tenant> = new Map();
  users: Map<string, User> = new Map();
  sessions: Map<string, Session> = new Map();
  otps: Map<string, OtpRecord> = new Map();
  auditLogs: AuditLog[] = [];
  biometricLogs: BiometricLog[] = [];

  constructor() {
    this.seedDefaultData();
  }

  seedDefaultData() {
    const defaultTenantId = 'tenant-01';
    this.tenants.set(defaultTenantId, {
      id: defaultTenantId,
      name: 'Face Recognition Attendance System',
      slug: 'face-recognition-attendance',
      industry: 'technology',
      plan_tier: 'enterprise',
      created_at: new Date()
    });

    // Default seeded users (password: Admin@1234)
    const defaultPasswordHash = '$2b$10$yWrF3DrTXJTVSYXTz1PJgesiMDc18HhnNUdHTmidKiZ4C7uFBlRd.';
    const adminUser: User = {
      id: 'usr-admin-01',
      tenant_id: defaultTenantId,
      name: 'Asif Khan',
      email: 'dedaatish@gmail.com',
      phone: '+1 555-0199',
      password_hash: defaultPasswordHash,
      role: 'owner',
      job_title: 'System Administrator',
      department: 'IT & Infrastructure',
      is_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    };
    this.users.set(adminUser.id, adminUser);

    const employeeUser: User = {
      id: 'usr-emp-01',
      tenant_id: defaultTenantId,
      name: 'Helen Vasilovsky',
      email: 'helen.v@workforce.ai',
      phone: '+1 555-0144',
      password_hash: defaultPasswordHash,
      role: 'employee',
      job_title: 'UX Designer',
      department: 'Product Design',
      is_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    };
    this.users.set(employeeUser.id, employeeUser);

    const managerUser: User = {
      id: 'usr-mgr-01',
      tenant_id: defaultTenantId,
      name: 'Marcus Vance',
      email: 'marcus.v@workforce.ai',
      phone: '+1 555-0188',
      password_hash: defaultPasswordHash,
      role: 'manager',
      job_title: 'Gate CCTV Supervisor',
      department: 'Facility Security',
      is_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    };
    this.users.set(managerUser.id, managerUser);

    // Initial Biometric Logs for CCTV Turnstiles matching mockData cameras
    const now = Date.now();
    this.biometricLogs = [
      {
        id: 'bio-log-001',
        tenant_id: defaultTenantId,
        user_id: employeeUser.id,
        employee_id: 'EMP-001',
        employee_name: 'Helen Vasilovsky',
        department: 'Product Design',
        camera_id: 'CAM_FACTORY_GATE_01',
        camera_name: 'CP PLUS Gate 1 North Turnstile',
        status: 'verified',
        confidence_score: 0.9924,
        latency_ms: 14,
        relay_action: 'UNLOCKED',
        direction: 'IN',
        device_ip: '192.168.1.104',
        snapshot_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        created_at: new Date(now - 8 * 60 * 1000)
      },
      {
        id: 'bio-log-002',
        tenant_id: defaultTenantId,
        user_id: adminUser.id,
        employee_id: 'EMP-002',
        employee_name: 'Asif Khan',
        department: 'IT & Infrastructure',
        camera_id: 'CAM_HIGHBAY_02',
        camera_name: 'CP PLUS Gate 2 Logistics Dock',
        status: 'verified',
        confidence_score: 0.9951,
        latency_ms: 12,
        relay_action: 'UNLOCKED',
        direction: 'IN',
        device_ip: '192.168.1.105',
        snapshot_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        created_at: new Date(now - 22 * 60 * 1000)
      },
      {
        id: 'bio-log-003',
        tenant_id: defaultTenantId,
        employee_id: 'UNKNOWN',
        employee_name: 'Unrecognized Visitor / Impostor',
        department: 'Unregistered',
        camera_id: 'CAM_HIGHBAY_02',
        camera_name: 'CP PLUS Gate 2 Logistics Dock',
        status: 'anti_spoof_rejected',
        confidence_score: 0.421,
        latency_ms: 14,
        relay_action: 'LOCKED',
        direction: 'IN',
        device_ip: '192.168.1.105',
        failure_reason: '3D Liveness Check Failed - Print Screen Attack Detected',
        created_at: new Date(now - 45 * 60 * 1000)
      },
      {
        id: 'bio-log-004',
        tenant_id: defaultTenantId,
        user_id: managerUser.id,
        employee_id: 'EMP-003',
        employee_name: 'Marcus Vance',
        department: 'Facility Security',
        camera_id: 'CAM_DOCK_03',
        camera_name: 'Hikvision Front Gate Barrier',
        status: 'verified',
        confidence_score: 0.988,
        latency_ms: 15,
        relay_action: 'UNLOCKED',
        direction: 'OUT',
        device_ip: '192.168.1.106',
        snapshot_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        created_at: new Date(now - 78 * 60 * 1000)
      },
      {
        id: 'bio-log-005',
        tenant_id: defaultTenantId,
        employee_id: 'EMP-004',
        employee_name: 'David Miller',
        department: 'Operations',
        camera_id: 'CAM_FACTORY_GATE_01',
        camera_name: 'CP PLUS Gate 1 North Turnstile',
        status: 'mask_missing',
        confidence_score: 0.892,
        latency_ms: 18,
        relay_action: 'LOCKED',
        direction: 'IN',
        device_ip: '192.168.1.104',
        failure_reason: 'OSHA PPE Quorum Not Met - Mandatory Hardhat Missing',
        created_at: new Date(now - 120 * 60 * 1000)
      },
      {
        id: 'bio-log-006',
        tenant_id: defaultTenantId,
        employee_id: 'EMP-005',
        employee_name: 'Elena Rostova',
        department: 'Quality Assurance',
        camera_id: 'CAM_FACTORY_GATE_01',
        camera_name: 'CP PLUS Gate 1 North Turnstile',
        status: 'verified',
        confidence_score: 0.994,
        latency_ms: 11,
        relay_action: 'UNLOCKED',
        direction: 'IN',
        device_ip: '192.168.1.104',
        snapshot_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        created_at: new Date(now - 165 * 60 * 1000)
      }
    ];
  }
}

export class DatabaseService {
  private pool: pg.Pool | null = null;
  private memoryDb: MemoryDatabase = new MemoryDatabase();
  public isPostgres = false;
  private migrator: DatabaseMigrator | null = null;

  constructor() {
    const connectionString = serverConfig.DATABASE_URL || serverConfig.PG_CONNECTION_STRING;
    if (connectionString) {
      try {
        this.pool = new pg.Pool({
          connectionString,
          connectionTimeoutMillis: 3000,
          idleTimeoutMillis: 5000,
          ssl: serverConfig.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        });
        this.migrator = new DatabaseMigrator(this.pool);
        // Flag remains tentative until verified by query/initSchema
        this.isPostgres = true;
      } catch (err: any) {
        console.log('[DB] Notice: PG pool initialization skipped, active in resilient store.');
        this.isPostgres = false;
      }
    }
  }

  private async safeQuery<T extends pg.QueryResultRow = any>(
    text: string,
    params?: any[]
  ): Promise<pg.QueryResult<T> | null> {
    if (!this.isPostgres || !this.pool) return null;
    try {
      return await this.pool.query<T>(text, params);
    } catch (err: any) {
      // If connection fails, wrong password, or postgres is unreachable, gracefully fall back to memory store
      const code = err?.code || err?.message || 'Offline';
      console.log(`[DB] PostgreSQL notice (${code}), operating in memory store.`);
      this.isPostgres = false;
      return null;
    }
  }

  async initSchema() {
    if (!this.pool || !this.isPostgres) {
      return;
    }

    try {
      if (this.migrator) {
        await this.migrator.runMigrations();
        console.log('[DB] Versioned migrations completed successfully.');
      }
    } catch (err: any) {
      const code = err?.code || err?.message || 'Unreachable';
      console.log(`[DB] Remote PostgreSQL notice (${code}). Seamlessly active in memory store.`);
      this.isPostgres = false;
      if (this.pool) {
        this.pool.end().catch(() => {});
        this.pool = null;
      }
    }
  }

  // --- Tenants ---
  async createTenant(name: string, industry = 'technology'): Promise<Tenant> {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `tenant-${Date.now()}`;
    const id = `tenant-${crypto.randomUUID()}`;
    const tenant: Tenant = {
      id,
      name,
      slug: `${slug}-${Math.floor(1000 + Math.random() * 9000)}`,
      industry,
      plan_tier: 'enterprise',
      created_at: new Date()
    };

    const res = await this.safeQuery<Tenant>(
      'INSERT INTO tenants (id, name, slug, industry, plan_tier, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [tenant.id, tenant.name, tenant.slug, tenant.industry, tenant.plan_tier, tenant.created_at]
    );

    if (res && res.rows[0]) {
      return res.rows[0];
    }

    this.memoryDb.tenants.set(tenant.id, tenant);
    return tenant;
  }

  async getTenant(id: string): Promise<Tenant | null> {
    const res = await this.safeQuery<Tenant>('SELECT * FROM tenants WHERE id = $1', [id]);
    if (res && res.rows[0]) {
      return res.rows[0];
    }
    return this.memoryDb.tenants.get(id) || null;
  }

  async updateTenantIndustry(tenantId: string, industry: string): Promise<Tenant | null> {
    const res = await this.safeQuery<Tenant>('UPDATE tenants SET industry = $1 WHERE id = $2 RETURNING *', [industry, tenantId]);
    if (res && res.rows[0]) {
      return res.rows[0];
    }
    const t = this.memoryDb.tenants.get(tenantId);
    if (t) {
      t.industry = industry;
      return t;
    }
    return null;
  }

  // --- Users ---
  async getUserByEmail(email: string): Promise<User | null> {
    const norm = email.trim().toLowerCase();
    const res = await this.safeQuery<User>('SELECT * FROM users WHERE LOWER(email) = $1', [norm]);
    if (res && res.rows[0]) {
      return res.rows[0];
    }

    for (const u of this.memoryDb.users.values()) {
      if (u.email.toLowerCase() === norm) {
        return u;
      }
    }
    return null;
  }

  async getUserById(id: string): Promise<User | null> {
    const res = await this.safeQuery<User>('SELECT * FROM users WHERE id = $1', [id]);
    if (res && res.rows[0]) {
      return res.rows[0];
    }
    return this.memoryDb.users.get(id) || null;
  }

  async createUser(data: {
    tenant_id: string;
    name: string;
    email: string;
    phone: string;
    password_hash: string;
    role: 'owner' | 'hr' | 'manager' | 'employee';
    job_title?: string;
    department?: string;
    is_verified?: boolean;
  }): Promise<User> {
    const user: User = {
      id: `usr-${crypto.randomUUID()}`,
      tenant_id: data.tenant_id,
      name: data.name,
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password_hash: data.password_hash,
      role: data.role,
      job_title: data.job_title || 'Staff Member',
      department: data.department || 'General',
      is_verified: data.is_verified ?? false,
      created_at: new Date(),
      updated_at: new Date()
    };

    const res = await this.safeQuery<User>(
      `INSERT INTO users (id, tenant_id, name, email, phone, password_hash, role, job_title, department, is_verified, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        user.id,
        user.tenant_id,
        user.name,
        user.email,
        user.phone,
        user.password_hash,
        user.role,
        user.job_title,
        user.department,
        user.is_verified,
        user.created_at,
        user.updated_at
      ]
    );

    if (res && res.rows[0]) {
      return res.rows[0];
    }

    this.memoryDb.users.set(user.id, user);
    return user;
  }

  async updateUserVerification(userId: string, is_verified: boolean): Promise<void> {
    const res = await this.safeQuery('UPDATE users SET is_verified = $1, updated_at = NOW() WHERE id = $2', [is_verified, userId]);
    if (res) return;

    const u = this.memoryDb.users.get(userId);
    if (u) {
      u.is_verified = is_verified;
      u.updated_at = new Date();
    }
  }

  async updateUserPassword(userId: string, newPasswordHash: string): Promise<void> {
    const res = await this.safeQuery('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [newPasswordHash, userId]);
    if (res) return;

    const u = this.memoryDb.users.get(userId);
    if (u) {
      u.password_hash = newPasswordHash;
      u.updated_at = new Date();
    }
  }

  // --- Sessions ---
  async createSession(data: {
    userId: string;
    tenantId: string;
    expiresAt: Date;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<Session> {
    const session: Session = {
      id: crypto.randomBytes(32).toString('hex'),
      user_id: data.userId,
      tenant_id: data.tenantId,
      expires_at: data.expiresAt,
      ip_address: data.ipAddress || '',
      user_agent: data.userAgent || '',
      created_at: new Date()
    };

    const res = await this.safeQuery(
      'INSERT INTO sessions (id, user_id, tenant_id, expires_at, ip_address, user_agent, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [session.id, session.user_id, session.tenant_id, session.expires_at, session.ip_address, session.user_agent, session.created_at]
    );

    if (res) return session;

    this.memoryDb.sessions.set(session.id, session);
    return session;
  }

  async getSession(sessionId: string): Promise<Session | null> {
    const res = await this.safeQuery<Session>('SELECT * FROM sessions WHERE id = $1', [sessionId]);
    if (res && res.rows[0]) {
      const s = res.rows[0];
      if (new Date(s.expires_at) < new Date()) {
        await this.deleteSession(sessionId);
        return null;
      }
      return s;
    }

    const s = this.memoryDb.sessions.get(sessionId);
    if (!s) return null;
    if (new Date(s.expires_at) < new Date()) {
      this.memoryDb.sessions.delete(sessionId);
      return null;
    }
    return s;
  }

  async deleteSession(sessionId: string): Promise<void> {
    const res = await this.safeQuery('DELETE FROM sessions WHERE id = $1', [sessionId]);
    if (res) return;
    this.memoryDb.sessions.delete(sessionId);
  }

  // --- OTPs ---
  async createOtp(userId: string, codeHash: string, purpose: 'signup_verification' | 'password_reset', expiresInMinutes = 10): Promise<OtpRecord> {
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    const otp: OtpRecord = {
      id: `otp-${crypto.randomUUID()}`,
      user_id: userId,
      code_hash: codeHash,
      purpose,
      attempts: 0,
      expires_at: expiresAt,
      created_at: new Date()
    };

    const resDelete = await this.safeQuery('DELETE FROM otps WHERE user_id = $1 AND purpose = $2', [userId, purpose]);
    if (resDelete) {
      await this.safeQuery(
        'INSERT INTO otps (id, user_id, code_hash, purpose, attempts, expires_at, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [otp.id, otp.user_id, otp.code_hash, otp.purpose, otp.attempts, otp.expires_at, otp.created_at]
      );
      return otp;
    }

    // Memory cleanup
    for (const [k, v] of this.memoryDb.otps.entries()) {
      if (v.user_id === userId && v.purpose === purpose) {
        this.memoryDb.otps.delete(k);
      }
    }
    this.memoryDb.otps.set(otp.id, otp);
    return otp;
  }

  async getLatestOtp(userId: string, purpose: 'signup_verification' | 'password_reset'): Promise<OtpRecord | null> {
    const res = await this.safeQuery<OtpRecord>(
      'SELECT * FROM otps WHERE user_id = $1 AND purpose = $2 ORDER BY created_at DESC LIMIT 1',
      [userId, purpose]
    );
    if (res && res.rows[0]) {
      return res.rows[0];
    }

    let latest: OtpRecord | null = null;
    for (const otp of this.memoryDb.otps.values()) {
      if (otp.user_id === userId && otp.purpose === purpose) {
        if (!latest || otp.created_at > latest.created_at) {
          latest = otp;
        }
      }
    }
    return latest;
  }

  async incrementOtpAttempts(otpId: string): Promise<number> {
    const res = await this.safeQuery<{ attempts: number }>(
      'UPDATE otps SET attempts = attempts + 1 WHERE id = $1 RETURNING attempts',
      [otpId]
    );
    if (res && res.rows[0]) {
      return res.rows[0].attempts;
    }

    const o = this.memoryDb.otps.get(otpId);
    if (o) {
      o.attempts += 1;
      return o.attempts;
    }
    return 0;
  }

  async deleteOtp(otpId: string): Promise<void> {
    const res = await this.safeQuery('DELETE FROM otps WHERE id = $1', [otpId]);
    if (res) return;
    this.memoryDb.otps.delete(otpId);
  }

  // --- Audit Logs ---
  async addAuditLog(data: {
    tenant_id?: string | null;
    user_id?: string | null;
    action: string;
    status: 'SUCCESS' | 'FAILURE';
    ip_address?: string;
    details?: string;
  }): Promise<void> {
    const log: AuditLog = {
      id: `audit-${crypto.randomUUID()}`,
      tenant_id: data.tenant_id || null,
      user_id: data.user_id || null,
      action: data.action,
      status: data.status,
      ip_address: data.ip_address || '',
      details: data.details || '',
      created_at: new Date()
    };

    const res = await this.safeQuery(
      'INSERT INTO audit_logs (id, tenant_id, user_id, action, status, ip_address, details, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [log.id, log.tenant_id, log.user_id, log.action, log.status, log.ip_address, log.details, log.created_at]
    );
    if (res) return;

    this.memoryDb.auditLogs.unshift(log);
    if (this.memoryDb.auditLogs.length > 500) {
      this.memoryDb.auditLogs.pop();
    }
  }

  async getAuditLogs(tenantId: string, limit = 50): Promise<AuditLog[]> {
    const res = await this.safeQuery<AuditLog>(
      'SELECT * FROM audit_logs WHERE tenant_id = $1 ORDER BY created_at DESC LIMIT $2',
      [tenantId, limit]
    );
    if (res && res.rows) {
      return res.rows;
    }
    return this.memoryDb.auditLogs.filter((l) => l.tenant_id === tenantId).slice(0, limit);
  }

  // --- Biometric Logs (CCTV Edge Telemetry) ---
  async createBiometricLog(data: Omit<BiometricLog, 'id' | 'created_at'>): Promise<BiometricLog> {
    const log: BiometricLog = {
      id: `bio-log-${crypto.randomUUID()}`,
      ...data,
      created_at: new Date()
    };

    const res = await this.safeQuery<BiometricLog>(
      `INSERT INTO biometric_logs (id, tenant_id, user_id, employee_id, employee_name, department, camera_id, camera_name, status, confidence_score, latency_ms, relay_action, direction, device_ip, failure_reason, snapshot_url, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [
        log.id,
        log.tenant_id,
        log.user_id || null,
        log.employee_id,
        log.employee_name,
        log.department,
        log.camera_id,
        log.camera_name,
        log.status,
        log.confidence_score,
        log.latency_ms,
        log.relay_action,
        log.direction,
        log.device_ip,
        log.failure_reason || null,
        log.snapshot_url || null,
        log.created_at
      ]
    );

    if (res && res.rows[0]) {
      return res.rows[0];
    }

    this.memoryDb.biometricLogs.unshift(log);
    return log;
  }

  async getBiometricLogs(
    tenantId: string,
    filters?: {
      cameraId?: string;
      status?: string;
      search?: string;
      limit?: number;
    }
  ): Promise<BiometricLog[]> {
    const limit = filters?.limit || 100;
    let query = 'SELECT * FROM biometric_logs WHERE tenant_id = $1';
    const params: any[] = [tenantId];

    if (filters?.cameraId && filters.cameraId !== 'all') {
      params.push(filters.cameraId);
      query += ` AND camera_id = $${params.length}`;
    }

    if (filters?.status && filters.status !== 'all') {
      params.push(filters.status);
      query += ` AND status = $${params.length}`;
    }

    if (filters?.search) {
      params.push(`%${filters.search.toLowerCase()}%`);
      query += ` AND (LOWER(employee_name) LIKE $${params.length} OR LOWER(employee_id) LIKE $${params.length})`;
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
    params.push(limit);

    const res = await this.safeQuery<BiometricLog>(query, params);
    if (res && res.rows) {
      return res.rows;
    }

    // Memory Store filtering
    let logs = this.memoryDb.biometricLogs.filter((l) => l.tenant_id === tenantId);
    if (filters?.cameraId && filters.cameraId !== 'all') {
      logs = logs.filter((l) => l.camera_id === filters.cameraId);
    }
    if (filters?.status && filters.status !== 'all') {
      logs = logs.filter((l) => l.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      logs = logs.filter((l) => l.employee_name.toLowerCase().includes(q) || l.employee_id.toLowerCase().includes(q));
    }
    return logs.slice(0, limit);
  }
}

export const db = new DatabaseService();
