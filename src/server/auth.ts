import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { db, type User, type Tenant, type Session } from './db.ts';
import { serverConfig } from './config.ts';

const JWT_SECRET = serverConfig.JWT_SECRET;
const SESSION_EXPIRY_DAYS = serverConfig.SESSION_EXPIRY_DAYS || 30;

// Rate limiter state: key -> { count: number, resetAt: number }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, maxAttempts: number, windowSeconds: number): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true };
  }

  if (entry.count >= maxAttempts) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count += 1;
  return { allowed: true };
}

// Reset limit on success
export function resetRateLimit(key: string) {
  rateLimitMap.delete(key);
}

// Validation helpers
export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return typeof email === 'string' && re.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  if (typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (typeof password !== 'string' || password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one letter and one number.' };
  }
  return { valid: true };
}

export function hashOtp(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex');
}

export interface AuthTokenPayload {
  userId: string;
  tenantId: string;
  role: string;
  sessionId: string;
}

export function signSessionToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${SESSION_EXPIRY_DAYS}d` });
}

export function verifySessionToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch {
    return null;
  }
}

export class AuthService {
  // --- 1. Signup Flow: Organization + Owner ---
  async signup(data: {
    orgName: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<{ user: Omit<User, 'password_hash'>; tenant: Tenant; otpCode: string }> {
    // 1. Validations
    if (!data.orgName || data.orgName.trim().length < 2) {
      throw new Error('Organization name must be at least 2 characters.');
    }
    if (!data.fullName || data.fullName.trim().length < 2) {
      throw new Error('Full name must be at least 2 characters.');
    }
    if (!validateEmail(data.email)) {
      throw new Error('Invalid email address format.');
    }
    if (!validatePhone(data.phone)) {
      throw new Error('Invalid phone number (minimum 7 digits required).');
    }
    const pwdCheck = validatePassword(data.password);
    if (!pwdCheck.valid) {
      throw new Error(pwdCheck.message || 'Invalid password.');
    }

    const normEmail = data.email.trim().toLowerCase();

    // Check duplicate email
    const existing = await db.getUserByEmail(normEmail);
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    // 2. Create Tenant (New Organization)
    const tenant = await db.createTenant(data.orgName.trim());

    // 3. Hash Password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // 4. Create User as 'owner' of this tenant only
    const user = await db.createUser({
      tenant_id: tenant.id,
      name: data.fullName.trim(),
      email: normEmail,
      phone: data.phone.trim(),
      password_hash: passwordHash,
      role: 'owner', // Highest role within tenant; never grants global system SuperAdmin
      job_title: 'Organization Owner / Admin',
      department: 'Executive Management',
      is_verified: false
    });

    // 5. Generate 6-digit OTP for Email/Phone verification
    const rawOtp = crypto.randomInt(100000, 999999).toString();
    const codeHash = hashOtp(rawOtp);
    await db.createOtp(user.id, codeHash, 'signup_verification', 15);

    // 6. Audit Log
    await db.addAuditLog({
      tenant_id: tenant.id,
      user_id: user.id,
      action: 'ORGANIZATION_SIGNUP',
      status: 'SUCCESS',
      ip_address: data.ipAddress,
      details: `Registered organization "${tenant.name}" with owner ${user.email}`
    });

    const { password_hash, ...safeUser } = user;
    return { user: safeUser, tenant, otpCode: rawOtp };
  }

  // --- 2. Verify OTP ---
  async verifyOtp(data: {
    email: string;
    code: string;
    purpose?: 'signup_verification' | 'password_reset';
    ipAddress?: string;
    userAgent?: string;
  }): Promise<{ user: Omit<User, 'password_hash'>; tenant: Tenant; sessionToken: string }> {
    const normEmail = data.email.trim().toLowerCase();
    const user = await db.getUserByEmail(normEmail);
    if (!user) {
      throw new Error('User not found.');
    }

    const purpose = data.purpose || 'signup_verification';
    const otp = await db.getLatestOtp(user.id, purpose);
    if (!otp) {
      throw new Error('No pending verification code found. Please request a new one.');
    }

    // Check expiration
    if (new Date() > new Date(otp.expires_at)) {
      await db.deleteOtp(otp.id);
      throw new Error('Verification code has expired. Please request a new one.');
    }

    // Check attempts limit
    if (otp.attempts >= 5) {
      await db.deleteOtp(otp.id);
      throw new Error('Too many invalid attempts. This verification code has been revoked.');
    }

    // Verify hash
    const submittedHash = hashOtp(data.code.trim());
    if (submittedHash !== otp.code_hash) {
      await db.incrementOtpAttempts(otp.id);
      throw new Error('Incorrect verification code. Please check your email or phone.');
    }

    // Verification successful
    await db.deleteOtp(otp.id);
    await db.updateUserVerification(user.id, true);

    const tenant = await db.getTenant(user.tenant_id);
    if (!tenant) {
      throw new Error('Associated tenant organization not found.');
    }

    // Create session
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const session = await db.createSession({
      userId: user.id,
      tenantId: user.tenant_id,
      expiresAt,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent
    });

    const sessionToken = signSessionToken({
      userId: user.id,
      tenantId: user.tenant_id,
      role: user.role,
      sessionId: session.id
    });

    await db.addAuditLog({
      tenant_id: user.tenant_id,
      user_id: user.id,
      action: 'OTP_VERIFICATION',
      status: 'SUCCESS',
      ip_address: data.ipAddress,
      details: `Account verified successfully for ${user.email}`
    });

    const { password_hash, ...safeUser } = user;
    safeUser.is_verified = true;

    return { user: safeUser, tenant, sessionToken };
  }

  // --- 3. Login Flow ---
  async login(data: {
    email: string;
    password: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<{ user: Omit<User, 'password_hash'>; tenant: Tenant; sessionToken: string; requiresVerification?: boolean }> {
    const normEmail = data.email.trim().toLowerCase();
    const user = await db.getUserByEmail(normEmail);

    if (!user) {
      // Intentionally generic error message to prevent user enumeration
      throw new Error('Invalid email or password.');
    }

    // Verify password hash
    const match = await bcrypt.compare(data.password, user.password_hash);
    if (!match) {
      await db.addAuditLog({
        tenant_id: user.tenant_id,
        user_id: user.id,
        action: 'LOGIN_ATTEMPT',
        status: 'FAILURE',
        ip_address: data.ipAddress,
        details: 'Incorrect password entered'
      });
      throw new Error('Invalid email or password.');
    }

    // Check verification status
    if (!user.is_verified) {
      // Generate fresh OTP for verification
      const rawOtp = crypto.randomInt(100000, 999999).toString();
      await db.createOtp(user.id, hashOtp(rawOtp), 'signup_verification', 15);

      await db.addAuditLog({
        tenant_id: user.tenant_id,
        user_id: user.id,
        action: 'UNVERIFIED_LOGIN_ATTEMPT',
        status: 'FAILURE',
        ip_address: data.ipAddress,
        details: 'Dispatched fresh verification code'
      });

      const tenant = await db.getTenant(user.tenant_id);
      const { password_hash, ...safeUser } = user;
      return {
        user: safeUser,
        tenant: tenant || { id: user.tenant_id, name: 'Default', slug: 'default', industry: 'tech', plan_tier: 'standard', created_at: new Date() },
        sessionToken: '',
        requiresVerification: true
      };
    }

    const tenant = await db.getTenant(user.tenant_id);
    if (!tenant) {
      throw new Error('Organization tenant account not found.');
    }

    // Create Session
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const session = await db.createSession({
      userId: user.id,
      tenantId: user.tenant_id,
      expiresAt,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent
    });

    const sessionToken = signSessionToken({
      userId: user.id,
      tenantId: user.tenant_id,
      role: user.role,
      sessionId: session.id
    });

    await db.addAuditLog({
      tenant_id: user.tenant_id,
      user_id: user.id,
      action: 'LOGIN_SUCCESS',
      status: 'SUCCESS',
      ip_address: data.ipAddress,
      details: `User ${user.email} logged in (${user.role})`
    });

    const { password_hash, ...safeUser } = user;
    return { user: safeUser, tenant, sessionToken };
  }

  // --- 4. Forgot Password Flow ---
  async forgotPassword(email: string, ipAddress?: string): Promise<{ otpCode: string }> {
    const normEmail = email.trim().toLowerCase();
    const user = await db.getUserByEmail(normEmail);

    if (!user) {
      // Constant-time dummy delay to prevent timing attacks / enumeration
      await new Promise((r) => setTimeout(r, 200));
      return { otpCode: '000000' };
    }

    const rawOtp = crypto.randomInt(100000, 999999).toString();
    await db.createOtp(user.id, hashOtp(rawOtp), 'password_reset', 10);

    await db.addAuditLog({
      tenant_id: user.tenant_id,
      user_id: user.id,
      action: 'FORGOT_PASSWORD_REQUEST',
      status: 'SUCCESS',
      ip_address: ipAddress,
      details: `Password reset passkey generated for ${user.email}`
    });

    return { otpCode: rawOtp };
  }

  // --- 5. Reset Password Flow ---
  async resetPassword(data: {
    email: string;
    code: string;
    newPassword: string;
    ipAddress?: string;
  }): Promise<void> {
    const pwdCheck = validatePassword(data.newPassword);
    if (!pwdCheck.valid) {
      throw new Error(pwdCheck.message || 'Invalid new password.');
    }

    const normEmail = data.email.trim().toLowerCase();
    const user = await db.getUserByEmail(normEmail);
    if (!user) {
      throw new Error('User not found.');
    }

    const otp = await db.getLatestOtp(user.id, 'password_reset');
    if (!otp) {
      throw new Error('No active reset passkey found. Please request a new one.');
    }

    if (new Date() > new Date(otp.expires_at)) {
      await db.deleteOtp(otp.id);
      throw new Error('Reset passkey has expired.');
    }

    if (otp.attempts >= 5) {
      await db.deleteOtp(otp.id);
      throw new Error('Too many invalid attempts. Please request a new reset code.');
    }

    const submittedHash = hashOtp(data.code.trim());
    if (submittedHash !== otp.code_hash) {
      await db.incrementOtpAttempts(otp.id);
      throw new Error('Invalid verification code.');
    }

    await db.deleteOtp(otp.id);

    const newHash = await bcrypt.hash(data.newPassword, 10);
    await db.updateUserPassword(user.id, newHash);

    await db.addAuditLog({
      tenant_id: user.tenant_id,
      user_id: user.id,
      action: 'PASSWORD_RESET_SUCCESS',
      status: 'SUCCESS',
      ip_address: data.ipAddress,
      details: `Password successfully updated for ${user.email}`
    });
  }

  // --- 6. Logout ---
  async logout(sessionId: string, userId?: string, tenantId?: string, ipAddress?: string): Promise<void> {
    if (sessionId) {
      await db.deleteSession(sessionId);
    }
    if (userId) {
      await db.addAuditLog({
        tenant_id: tenantId,
        user_id: userId,
        action: 'LOGOUT',
        status: 'SUCCESS',
        ip_address: ipAddress,
        details: 'User session closed'
      });
    }
  }

  // --- 7. Validate Session from Token ---
  async validateSession(token: string): Promise<{ user: Omit<User, 'password_hash'>; tenant: Tenant } | null> {
    const payload = verifySessionToken(token);
    if (!payload) return null;

    const session = await db.getSession(payload.sessionId);
    if (!session) return null;

    const user = await db.getUserById(session.user_id);
    if (!user) return null;

    // Strict Tenant Isolation verification: token tenant must match user tenant
    if (user.tenant_id !== session.tenant_id) {
      return null;
    }

    const tenant = await db.getTenant(user.tenant_id);
    if (!tenant) return null;

    const { password_hash, ...safeUser } = user;
    return { user: safeUser, tenant };
  }
}

export const authService = new AuthService();
