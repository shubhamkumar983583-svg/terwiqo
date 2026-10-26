# Implementation Plan - Secure HRMS Signup, Login & PostgreSQL Integration

Implement a complete, production-grade authentication and authorization lifecycle with PostgreSQL persistence, tenant isolation, role-based access control (Owner, HR, Manager, Employee), and secure session management for WorkPulse AI HRMS.

---

## 1. Repository Audit & Baseline Architecture

### 1.1 Current Stack
- **Frontend**: React 19 SPA running on Vite with Tailwind CSS. `LoginView.tsx` currently provides visual authentication UI with mock state bypasses.
- **Backend**: Express `^4.21.2`, `dotenv`, and `tsx` are installed, but the full-stack `server.ts` entry point is not yet initialized. The app currently launches via `vite --port=3000 --host=0.0.0.0`.
- **Database Status**: PostgreSQL is not yet connected. An RPC eligibility check confirmed project `wired-brook-vbwbv` is fully eligible for **Cloud SQL Developer Edition (PostgreSQL)**. Detailed entity definitions exist in `DATABASE.md`.
- **Packaging & Tests**: 14 unit tests pass for biometric vectors, dynamic QR, geofencing, and payroll algorithms.

### 1.2 Architectural Strategy
1. **Full-Stack Entry Point**: Introduce `server.ts` using Express with `vite.middlewares` mounted in development (`"dev": "tsx server.ts"`), satisfying port 3000 constraints.
2. **Database Layer**: Use Drizzle ORM with `pg` / `postgres` connection pooling. Provide an automated schema bootstrap that runs safe `CREATE TABLE IF NOT EXISTS` migrations without data loss or dropping tables.
3. **Multi-Tenancy**: Every user, session, and audit record is strictly partitioned by `tenant_id` foreign keys, preventing cross-tenant data access.
4. **Security & Hashing**: Secure password hashing with salt (bcrypt/argon2), HttpOnly SameSite secure cookie sessions, CSRF token verification, and in-memory rate limiting to thwart brute-force attempts.

---

## 2. Proposed Changes & Work Breakdown

### Phase 1: Database Layer & Schemas (`src/db/`)
- **Dependencies**: Add `drizzle-orm`, `pg`, `@types/pg`, `bcryptjs`, `@types/bcryptjs`, `cookie-parser`, `@types/cookie-parser`, `jsonwebtoken`, `@types/jsonwebtoken`, `cors`.
- **Files to Create**:
  - `src/db/schema.ts`: Drizzle schema defining:
    - `tenants`: `id` (UUID), `name`, `slug`, `plan_tier`, `industry`, `created_at`
    - `users`: `id` (UUID), `tenant_id` (FK), `name`, `email` (unique index on lower(email)), `phone`, `password_hash`, `role` (`owner`, `hr`, `manager`, `employee`), `job_title`, `department`, `is_verified`, `created_at`, `updated_at`
    - `sessions`: `id` (UUID token), `user_id` (FK), `tenant_id` (FK), `expires_at`, `ip_address`, `user_agent`, `created_at`
    - `otps`: `id` (UUID), `user_id` (FK), `code_hash`, `purpose` (`signup_verification`, `password_reset`), `attempts`, `expires_at`, `created_at`
    - `audit_logs`: `id` (UUID), `tenant_id`, `user_id`, `action`, `status`, `ip_address`, `metadata`, `created_at`
  - `src/db/client.ts`: Connection pool with automatic fallback to persistent PostgreSQL connection string or local database instance.
  - `src/db/migrate.ts`: Safe migration runner creating tables, composite indexes (`tenant_id` + `role`, `tenant_id` + `email`), and default seeds if empty.

### Phase 2: Backend Authentication API (`server.ts` & `src/server/`)
- **Rate Limiting & Security Middlewares**:
  - `rateLimiter.ts`: Sliding-window limiter on `/api/auth/login`, `/api/auth/signup`, and `/api/auth/verify-otp`.
  - `authMiddleware.ts`: Session validation, role-based access checks (`requireRole('owner', 'hr')`), and strict tenant injection into `req.tenantId` and `req.userId`.
  - `auditService.ts`: Centralized asynchronous audit logging.
- **API Endpoints**:
  - `POST /api/auth/signup`:
    - Validates inputs: Organization name, user full name, normalized work email, phone, secure password (minimum 8 characters, special character).
    - Creates tenant record and assigns user as `owner` within that tenant only (prevents global superadmin escalation).
    - Generates 6-digit cryptographic verification OTP (expires in 10 minutes, max 5 attempts).
  - `POST /api/auth/verify-otp`:
    - Verifies OTP code, marks user as verified, sets secure HttpOnly session cookie, and writes to audit log.
  - `POST /api/auth/login`:
    - Validates credentials against password hash.
    - Rejects unverified accounts with an OTP prompt.
    - Issues rotating session token and sets `SameSite=Lax, HttpOnly, Secure` session cookie.
  - `POST /api/auth/logout`:
    - Invalidates session token in DB and clears cookie.
  - `POST /api/auth/forgot-password`:
    - Dispatches secure reset OTP/token with rate limits.
  - `POST /api/auth/reset-password`:
    - Validates reset OTP and updates password hash.
  - `GET /api/auth/me`:
    - Returns authenticated user profile, organization details, and permissions for the frontend session state.

### Phase 3: Frontend Integration & Polish (`src/views/LoginView.tsx` & Components)
- **Tabs & Modals**:
  - Add seamless tab switcher between **Sign In** and **Create Organization (Signup)**.
  - Add Signup Form fields: Company Name, Full Name, Work Email, Phone Number, Password, Role/Department.
  - Add interactive OTP verification modal with resend countdown and 6-digit pin input.
  - Connect `ForgotPasswordModal.tsx` to `/api/auth/forgot-password` and `/api/auth/reset-password`.
- **UI & Experience**:
  - Replace mock timeouts with real `fetch('/api/auth/...')` calls with error handling, loading spinners, and field-level validation messages.
  - Keep the matching dark navy (`#0A0D17`, `#101524`) and electric yellow (`#E6FF00`) aesthetic with live CCTV biometric telemetry panel.
  - Support instant preset demo login buttons for testing.

### Phase 4: Automated Verification & Testing
- Unit & integration tests using `node --test`:
  - `auth.test.ts`:
    - `test_signup_success`: Successful organization and owner creation.
    - `test_duplicate_signup`: Reject existing email.
    - `test_incorrect_password`: Reject bad credentials.
    - `test_unverified_login`: Prevent access before OTP verification.
    - `test_expired_otp`: Reject OTP after expiry or exceeded attempts.
    - `test_rbac_isolation`: Verify `employee` cannot access admin endpoints.
    - `test_tenant_isolation`: Verify User from Tenant A cannot read or mutate data from Tenant B.
- Browser test via `playwright-cli`:
  - Verify complete end-to-end signup flow -> OTP verification -> dashboard redirect -> logout -> login.

---

## 3. User Review Required

> [!IMPORTANT]
> **Database Provisioning**: The plan implements PostgreSQL support using standard `pg` and Drizzle schema migrations. If you wish to provision a Google Cloud SQL instance directly in your project, we can trigger the Cloud SQL UI flow, or connect via `DATABASE_URL` in `.env`.
> 
> Please review the plan and click **Proceed** or provide feedback to begin implementation.
