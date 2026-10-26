import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { db } from './src/server/db.ts';
import { authService, checkRateLimit, resetRateLimit, verifySessionToken } from './src/server/auth.ts';
import { testSupabaseConnection, SUPABASE_CONFIG } from './src/server/supabase.ts';

const app = express();
const portArgIndex = process.argv.indexOf('--port');
const cliPort = portArgIndex !== -1 ? parseInt(process.argv[portArgIndex + 1], 10) : undefined;
const envPort = process.env.PORT ? parseInt(process.env.PORT, 10) : undefined;
// Port 8080 is reserved for the NGINX frontend proxy; dev app listens on 3000
const PORT = cliPort || (envPort && envPort !== 8080 ? envPort : 3000);
const isProd = process.env.NODE_ENV === 'production';
const COOKIE_NAME = 'workpulse_session';

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Initialize PostgreSQL schema if configured
db.initSchema().catch((err: any) => {
  console.log('[DB] Schema init notice:', err?.message || err);
});

// Helper to extract IP
function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

// Authentication Middleware for Protected Routes
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies[COOKIE_NAME] || req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) {
      res.status(401).json({ error: 'Authentication required. Please sign in.' });
      return;
    }

    const sessionData = await authService.validateSession(token);
    if (!sessionData) {
      res.clearCookie(COOKIE_NAME);
      res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' });
      return;
    }

    (req as any).user = sessionData.user;
    (req as any).tenant = sessionData.tenant;
    next();
  } catch (err: any) {
    res.status(500).json({ error: 'Internal authentication error.' });
  }
}

// RBAC Middleware Helper
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ error: 'Forbidden: Insufficient privileges for this operation.' });
      return;
    }
    next();
  };
}

// ==========================================
// AUTHENTICATION API ROUTES
// ==========================================

// 1. Organization & Owner Signup
app.post('/api/auth/signup', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const rateKey = `signup:${ip}`;
  const rate = checkRateLimit(rateKey, 10, 3600); // 10 signups per hour per IP
  if (!rate.allowed) {
    res.status(429).json({ error: `Too many signup attempts. Please try again in ${rate.retryAfter} seconds.` });
    return;
  }

  try {
    const { orgName, fullName, email, phone, password } = req.body;
    const result = await authService.signup({
      orgName,
      fullName,
      email,
      phone,
      password,
      ipAddress: ip,
      userAgent: req.headers['user-agent']
    });

    res.status(201).json({
      success: true,
      message: 'Organization created successfully! Please enter the 6-digit verification code.',
      user: result.user,
      tenant: result.tenant,
      // Development/testing aid: preview OTP in response for testing
      demoOtpCode: result.otpCode
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Signup failed.' });
  }
});

// 2. Verify OTP
app.post('/api/auth/verify-otp', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const rateKey = `otp:${ip}`;
  const rate = checkRateLimit(rateKey, 15, 900); // 15 OTP attempts per 15 mins
  if (!rate.allowed) {
    res.status(429).json({ error: `Too many verification attempts. Please wait ${rate.retryAfter} seconds.` });
    return;
  }

  try {
    const { email, code, purpose } = req.body;
    if (!email || !code) {
      res.status(400).json({ error: 'Email and verification code are required.' });
      return;
    }

    const result = await authService.verifyOtp({
      email,
      code,
      purpose,
      ipAddress: ip,
      userAgent: req.headers['user-agent']
    });

    res.cookie(COOKIE_NAME, result.sessionToken, cookieOptions);
    resetRateLimit(rateKey);

    res.json({
      success: true,
      message: 'Account verified successfully!',
      user: result.user,
      tenant: result.tenant,
      token: result.sessionToken
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Verification failed.' });
  }
});

// 3. User Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const rateKey = `login:${ip}`;
  const rate = checkRateLimit(rateKey, 10, 300); // 10 attempts per 5 mins
  if (!rate.allowed) {
    res.status(429).json({ error: `Too many login attempts. Please wait ${rate.retryAfter} seconds.` });
    return;
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const result = await authService.login({
      email,
      password,
      ipAddress: ip,
      userAgent: req.headers['user-agent']
    });

    if (result.requiresVerification) {
      res.status(403).json({
        requiresVerification: true,
        message: 'Your account is not yet verified. A 6-digit verification code has been dispatched.',
        email: result.user.email
      });
      return;
    }

    res.cookie(COOKIE_NAME, result.sessionToken, cookieOptions);
    resetRateLimit(rateKey);

    res.json({
      success: true,
      message: 'Logged in successfully.',
      user: result.user,
      tenant: result.tenant,
      token: result.sessionToken
    });
  } catch (err: any) {
    res.status(401).json({ error: err.message || 'Authentication failed.' });
  }
});

// 4. Current User Session Check
app.get('/api/auth/me', async (req: Request, res: Response) => {
  const token = req.cookies[COOKIE_NAME] || req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) {
    res.json({ authenticated: false, user: null, tenant: null });
    return;
  }

  const sessionData = await authService.validateSession(token);
  if (!sessionData) {
    res.clearCookie(COOKIE_NAME);
    res.json({ authenticated: false, user: null, tenant: null });
    return;
  }

  res.json({
    authenticated: true,
    user: sessionData.user,
    tenant: sessionData.tenant
  });
});

// 5. Logout
app.post('/api/auth/logout', async (req: Request, res: Response) => {
  const token = req.cookies[COOKIE_NAME] || req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (token) {
    const payload = verifySessionToken(token);
    if (payload) {
      await authService.logout(payload.sessionId, payload.userId, payload.tenantId, getClientIp(req));
    }
  }
  res.clearCookie(COOKIE_NAME);
  res.json({ success: true, message: 'Logged out successfully.' });
});

// 6. Forgot Password Request
app.post('/api/auth/forgot-password', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const rateKey = `forgot:${ip}`;
  const rate = checkRateLimit(rateKey, 5, 900); // 5 requests per 15 mins
  if (!rate.allowed) {
    res.status(429).json({ error: `Too many password reset requests. Please wait ${rate.retryAfter} seconds.` });
    return;
  }

  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email is required.' });
      return;
    }

    const { otpCode } = await authService.forgotPassword(email, ip);
    res.json({
      success: true,
      message: 'If an active account exists, a secure one-time passkey has been generated.',
      demoOtpCode: otpCode
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to process request.' });
  }
});

// 7. Reset Password with Code
app.post('/api/auth/reset-password', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      res.status(400).json({ error: 'Email, verification code, and new password are required.' });
      return;
    }

    await authService.resetPassword({
      email,
      code,
      newPassword,
      ipAddress: ip
    });

    res.json({ success: true, message: 'Password updated successfully! You can now log in.' });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to reset password.' });
  }
});

// 8. Audit Logs (Protected, Owner & HR only, tenant isolated)
app.get('/api/admin/audit-logs', requireAuth, requireRole('owner', 'hr'), async (req: Request, res: Response) => {
  const tenant = (req as any).tenant;
  const logs = await db.getAuditLogs(tenant.id);
  res.json({ logs });
});

// 9. Organization Industry Configuration (Protected, tenant-isolated)
app.get('/api/organization/industry', requireAuth, async (req: Request, res: Response) => {
  const tenant = (req as any).tenant;
  const t = await db.getTenant(tenant.id);
  res.json({
    success: true,
    industry: t?.industry || 'factory',
    tenant: t || tenant
  });
});

app.post('/api/organization/industry', requireAuth, async (req: Request, res: Response) => {
  try {
    const tenant = (req as any).tenant;
    const user = (req as any).user;
    const { industryId } = req.body;

    const validIndustries = [
      'factory', 'mall', 'hospital', 'school', 'college',
      'coaching', 'office', 'hotel', 'warehouse', 'restaurant',
      'construction', 'security', 'salon', 'enterprise', 'custom'
    ];

    if (!industryId || !validIndustries.includes(industryId)) {
      res.status(400).json({ error: `Invalid industry ID. Supported: ${validIndustries.join(', ')}` });
      return;
    }

    const updated = await db.updateTenantIndustry(tenant.id, industryId);
    if (!updated) {
      res.status(404).json({ error: 'Tenant organization not found.' });
      return;
    }

    await db.addAuditLog({
      tenant_id: tenant.id,
      user_id: user?.id,
      action: 'INDUSTRY_CHANGED',
      status: 'SUCCESS',
      ip_address: getClientIp(req),
      details: `Switched organization industry layout to "${industryId}"`
    });

    res.json({
      success: true,
      message: `Industry configuration updated to ${industryId}`,
      industry: updated.industry,
      tenant: updated
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update organization industry.' });
  }
});

// ==========================================
// BIOMETRIC LOGS API ROUTES (CCTV Edge Telemetry)
// ==========================================

// GET /api/biometric-logs - Fetch tenant-isolated biometric verification history
app.get('/api/biometric-logs', requireAuth, async (req: Request, res: Response) => {
  try {
    const tenant = (req as any).tenant;
    const { cameraId, status, search, limit } = req.query;

    const logs = await db.getBiometricLogs(tenant.id, {
      cameraId: typeof cameraId === 'string' ? cameraId : undefined,
      status: typeof status === 'string' ? status : undefined,
      search: typeof search === 'string' ? search : undefined,
      limit: limit ? parseInt(limit as string, 10) : 100
    });

    res.json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch biometric logs.' });
  }
});

// POST /api/biometric-logs - Record real-time edge CCTV punch verification event
app.post('/api/biometric-logs', requireAuth, async (req: Request, res: Response) => {
  try {
    const tenant = (req as any).tenant;
    const user = (req as any).user;
    const {
      employee_id,
      employee_name,
      department,
      camera_id,
      camera_name,
      status,
      confidence_score,
      latency_ms,
      relay_action,
      direction,
      failure_reason,
      snapshot_url
    } = req.body;

    if (!employee_name || !camera_id || !status) {
      res.status(400).json({ error: 'Missing required biometric log fields (employee_name, camera_id, status).' });
      return;
    }

    const log = await db.createBiometricLog({
      tenant_id: tenant.id,
      user_id: user?.id || null,
      employee_id: employee_id || 'UNKNOWN',
      employee_name,
      department: department || 'General',
      camera_id,
      camera_name: camera_name || camera_id,
      status: status || 'verified',
      confidence_score: typeof confidence_score === 'number' ? confidence_score : 0.992,
      latency_ms: typeof latency_ms === 'number' ? latency_ms : 14,
      relay_action: relay_action || (status === 'verified' ? 'UNLOCKED' : 'LOCKED'),
      direction: direction || 'IN',
      device_ip: getClientIp(req),
      failure_reason,
      snapshot_url
    });

    res.status(201).json({
      success: true,
      log
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to record biometric log event.' });
  }
});

// 10. Health & System Diagnostic Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: db.isPostgres ? 'postgresql' : 'in-memory-relational',
    supabase: {
      projectId: SUPABASE_CONFIG.projectId,
      url: SUPABASE_CONFIG.url
    },
    service: 'workpulse-workforce-auth'
  });
});

// 11. Supabase Project Health & Connectivity
app.get('/api/supabase/status', async (_req: Request, res: Response) => {
  try {
    const health = await testSupabaseConnection();
    res.json(health);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to check Supabase status' });
  }
});

// ==========================================
// DEV & PRODUCTION STATIC/VITE SERVING
// ==========================================
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[WorkPulse Server] Running on http://localhost:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[Server Error]', err);
});
