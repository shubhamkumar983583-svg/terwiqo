# Database Architecture & Entity Specifications (DATABASE.md)
## Project: WorkPulse AI Enterprise Platform

**Document Version:** 1.0.0  
**Storage Paradigms:** Relational Schema (PostgreSQL / SQLite / Cloud SQL compatible) & Document Schema (Firestore parity)  
**Tenant Partitioning:** Strict Row-Level `tenant_id` Foreign Key Isolation

---

## 1. Entity-Relationship Model (ERD)

```
 [Tenant / Organization] (1)
         |
         +----< (N) [Branch / Location] (1)
         |               |
         |               +----< (N) [Camera / CCTV Node]
         |               |
         |               +----< (N) [Geofence Boundary]
         |
         +----< (N) [Department] (1)
         |               |
         |               +----< (N) [Shift Policy]
         |
         +----< (N) [User / Employee] (1)
         |               |
         |               +----< (N) [Biometric Face Profile]
         |               |
         |               +----< (N) [Attendance Event Ledger]
         |               |
         |               +----< (N) [Leave Request]
         |               |
         |               +----< (N) [Payroll Record / Payslip]
         |               |
         |               +----< (1) [Work Wallet Account]
         |
         +----< (N) [Audit Log Ledger]
```

---

## 2. Table Schemas & Data Dictionaries

### 2.1 `tenants` (Organizations)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | PRIMARY KEY | Unique tenant identifier (UUIDv4) |
| `name` | `VARCHAR(128)` | NOT NULL | Company legal name (e.g., "NL Corp") |
| `slug` | `VARCHAR(64)` | UNIQUE, NOT NULL | URL-safe identifier (`nl-corp`) |
| `industry` | `VARCHAR(32)` | NOT NULL | `factory`, `hospital`, `school`, `retail`, `enterprise` |
| `plan_tier` | `VARCHAR(32)` | NOT NULL | `individuals`, `teams`, `enterprise` |
| `settings` | `JSONB` | NOT NULL | Overtime rules, grace periods, biometric thresholds |
| `created_at` | `TIMESTAMP` | NOT NULL | Registration timestamp |

### 2.2 `branches` (Physical Sites & Facilities)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | PRIMARY KEY | Unique location ID |
| `tenant_id` | `VARCHAR(36)` | NOT NULL, FK(`tenants.id`) | Tenant discriminator |
| `name` | `VARCHAR(128)` | NOT NULL | Site name (e.g., "Munich Assembly Plant 4") |
| `latitude` | `DECIMAL(10, 8)` | NOT NULL | Center latitude coordinate |
| `longitude` | `DECIMAL(11, 8)` | NOT NULL | Center longitude coordinate |
| `geofence_radius_meters` | `INTEGER` | NOT NULL DEFAULT 150 | Geofence radius tolerance |
| `ip_allowlist` | `TEXT[]` | NULL | Authorized WiFi IP networks |

### 2.3 `cameras` (CCTV Edge Devices)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | PRIMARY KEY | Camera ID (e.g., `CAM-GATE-01`) |
| `tenant_id` | `VARCHAR(36)` | NOT NULL, FK(`tenants.id`) | Tenant discriminator |
| `branch_id` | `VARCHAR(36)` | NOT NULL, FK(`branches.id`) | Branch assignment |
| `name` | `VARCHAR(128)` | NOT NULL | Friendly label ("Turnstile East Entrance") |
| `rtsp_url_encrypted` | `TEXT` | NOT NULL | AES-GCM encrypted RTSP streaming string |
| `status` | `VARCHAR(16)` | NOT NULL | `online`, `degraded`, `offline` |
| `roi_coordinates` | `JSONB` | NOT NULL | Normalized polygon vertices `[{x: 0.2, y: 0.3}, ...]` |
| `fps` | `INTEGER` | NOT NULL DEFAULT 30 | Active ingestion FPS |
| `last_heartbeat` | `TIMESTAMP` | NOT NULL | Last edge worker ping |

### 2.4 `employees` (Staff & User CRM)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | PRIMARY KEY | Employee ID (UUIDv4) |
| `tenant_id` | `VARCHAR(36)` | NOT NULL, FK(`tenants.id`) | Tenant discriminator |
| `employee_code` | `VARCHAR(32)` | NOT NULL | Badge code (e.g. `EMP-48271-X`) |
| `first_name` | `VARCHAR(64)` | NOT NULL | Given name |
| `last_name` | `VARCHAR(64)` | NOT NULL | Family name (e.g., "Helen Vasilovsky") |
| `email` | `VARCHAR(128)` | NOT NULL | Corporate email |
| `role` | `VARCHAR(32)` | NOT NULL | `superadmin`, `org_admin`, `manager`, `employee` |
| `department` | `VARCHAR(64)` | NOT NULL | Department label (e.g., "Product Design") |
| `job_title` | `VARCHAR(64)` | NOT NULL | Job title (e.g., "UX Designer") |
| `work_format` | `VARCHAR(16)` | NOT NULL | `office`, `hybrid`, `remote` |
| `avatar_url` | `TEXT` | NULL | Secure profile avatar URL |
| `hourly_rate` | `DECIMAL(10, 2)` | NOT NULL | Standard hourly rate |
| `monthly_salary`| `DECIMAL(10, 2)` | NOT NULL | Base monthly salary (e.g. 6110.00) |
| `tenure_days` | `INTEGER` | NOT NULL DEFAULT 0 | Total days with company (e.g. 500) |
| `onboarding_progress` | `INTEGER` | NOT NULL DEFAULT 0 | Percentage completed (0-100) |
| `biometric_enrolled` | `BOOLEAN` | NOT NULL DEFAULT FALSE| Whether facial vector is enrolled |

### 2.5 `attendance_ledger` (Immutable Clock In / Out Records)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | PRIMARY KEY | Ledger entry UUID |
| `tenant_id` | `VARCHAR(36)` | NOT NULL, FK(`tenants.id`) | Tenant discriminator |
| `employee_id` | `VARCHAR(36)` | NOT NULL, FK(`employees.id`)| Employee foreign key |
| `timestamp` | `TIMESTAMP` | NOT NULL | Event UTC timestamp |
| `punch_type` | `VARCHAR(16)` | NOT NULL | `check_in`, `check_out`, `break_start`, `break_end` |
| `source` | `VARCHAR(16)` | NOT NULL | `cctv_ai`, `mobile_face`, `qr_scan`, `geofence`, `manual` |
| `confidence` | `DECIMAL(5, 4)` | NULL | Biometric confidence score (e.g. `0.9860`) |
| `latitude` | `DECIMAL(10, 8)` | NULL | GPS latitude if mobile |
| `longitude` | `DECIMAL(11, 8)` | NULL | GPS longitude if mobile |
| `camera_id` | `VARCHAR(36)` | NULL | Triggering camera ID |
| `status` | `VARCHAR(24)` | NOT NULL | `verified`, `late_flagged`, `early_departure`, `unauthorized` |
| `device_metadata` | `JSONB` | NULL | User-agent, IP address, firmware version |

### 2.6 `payroll_runs` & `payslips`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | PRIMARY KEY | Payroll run UUID |
| `tenant_id` | `VARCHAR(36)` | NOT NULL, FK(`tenants.id`) | Tenant discriminator |
| `period_start` | `DATE` | NOT NULL | Start of payroll cycle |
| `period_end` | `DATE` | NOT NULL | End of payroll cycle |
| `employee_id` | `VARCHAR(36)` | NOT NULL, FK(`employees.id`)| Employee reference |
| `base_pay` | `DECIMAL(12, 2)`| NOT NULL | Base monthly rate |
| `overtime_pay` | `DECIMAL(12, 2)`| NOT NULL | Total overtime accrual |
| `bonus_pay` | `DECIMAL(12, 2)`| NOT NULL DEFAULT 0 | Performance incentives |
| `tax_deduction` | `DECIMAL(12, 2)`| NOT NULL | Total income tax withholding |
| `social_security` | `DECIMAL(12, 2)`| NOT NULL | Pension & social security deduction |
| `net_pay` | `DECIMAL(12, 2)`| NOT NULL | Final net disbursement amount |
| `verification_hash`| `VARCHAR(64)`| NOT NULL | SHA-256 integrity digest of payslip payload |
| `status` | `VARCHAR(16)` | NOT NULL | `draft`, `calculated`, `approved`, `disbursed` |

---

## 3. Mandatory Indexes for High-Velocity Attendance
```sql
CREATE INDEX idx_attendance_tenant_time ON attendance_ledger (tenant_id, timestamp DESC);
CREATE INDEX idx_attendance_employee ON attendance_ledger (tenant_id, employee_id, timestamp DESC);
CREATE INDEX idx_employees_tenant_code ON employees (tenant_id, employee_code);
CREATE INDEX idx_cameras_tenant_branch ON cameras (tenant_id, branch_id);
CREATE INDEX idx_payroll_tenant_period ON payroll_runs (tenant_id, period_start, period_end);
```

---

## 4. PostgreSQL Row-Level Security (RLS) Policies
To guarantee multi-tenant cryptographic isolation directly inside PostgreSQL:

```sql
-- Enable RLS across tenant-partitioned tables
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cameras ENABLE ROW LEVEL SECURITY;

-- Dynamic session variable set by NestJS middleware upon JWT verification
-- SET LOCAL app.current_tenant_id = 'nl-corp-uuid';

CREATE POLICY tenant_isolation_policy_employees ON employees
    FOR ALL
    USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::VARCHAR);

CREATE POLICY tenant_isolation_policy_attendance ON attendance_ledger
    FOR ALL
    USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::VARCHAR);

CREATE POLICY tenant_isolation_policy_payroll ON payroll_runs
    FOR ALL
    USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::VARCHAR);
```

---

## 5. Redis Cache & BullMQ Queue Schema
When justified by workload, Redis 7.2 handles high-velocity transient states:

| Key Pattern | Data Structure | TTL | Purpose |
| :--- | :--- | :--- | :--- |
| `qr:token:{tenantId}:{employeeId}` | `STRING` | 35 seconds | Prevents replay of dynamic 30s HMAC-SHA256 QR codes |
| `rate:camera:{cameraId}` | `STRING` (INCR) | 1 second | Rate-limits edge CCTV probe spikes (max 10 probes/sec) |
| `geo:branch:{branchId}` | `GEO` | 24 hours | Redis Geospatial cache for instant branch perimeter queries |
| `queue:payroll:batch` | BullMQ Stream | Persistent | Asynchronous gross-to-net payroll computation workers |
| `queue:notifications:push`| BullMQ Stream | Persistent | Outbound alerts for unapproved overtime & missed clock-ins |
| `s3:upload:ticket:{uploadId}` | `HASH` | 15 minutes | Presigned S3 document OCR upload verification |

