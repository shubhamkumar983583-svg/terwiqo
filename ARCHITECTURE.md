# System Architecture Document (ARCHITECTURE.md)
## Project: WorkPulse AI Enterprise Platform

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  

---

## 1. High-Level Architectural Diagram

```
+=========================================================================================================+
|                                        TIER 1: PRESENTATION & CLIENT LAYER                              |
+=========================================================================================================+
|  [Public Marketing & Pricing]    [Executive HR Bento Dashboard]    [Flutter Mobile Native App / PWA]   |
|   - Peach Sunrise Theme           - Next.js / React 19 + TypeScript - Dart/Flutter Cross-Platform       |
|   - Interactive Pricing           - NL Corp / Helen Vasilovsky      - Dynamic HMAC QR & Biometric Encl. |
|                                                                                                         |
|  [CCTV Biometric AI HUD]         [Security Guard Station App]      [Super Admin Platform Console]      |
|   - Cyan Face Mesh Vector Canvas  - Rapid Tablet QR Scanner         - Multi-tenant Health & Billing     |
|   - Real-time Telemetry Overlay   - Turnstile / Gate Controller     - System Audit Ledger               |
+=========================================================================================================+
                                                     | HTTPS (REST / WebSockets / SSE) + OpenAPI Contract
                                                     v
+=========================================================================================================+
|                                    TIER 2: NESTJS / TS APPLICATION & API GATEWAY                        |
+=========================================================================================================+
|  - NestJS Modular Architecture: Modules, Controllers, Services, Guards, Interceptors                   |
|  - Tenant Scoping & Multi-Tenancy Guard Middleware (Row-Level Security Injector)                       |
|  - Authentication & Role-Based Access Control (RBAC) Guard (JWT Bearer Token)                           |
|  - Redis BullMQ Dispatcher: Asynchronous Payroll Processing & Push Notification Streams                |
|  - S3 / MinIO Object Storage Adapter: Pre-signed Uploads for OCR Documents & Encrypted Payslips         |
+---------------------------------------------------------------------------------------------------------+
                                                     | Internal Service Bus
             +--------------------+------------------+-------------------+------------------+
             |                    |                  |                   |                  |
             v                    v                  v                   v                  v
+------------------------+ +----------------+ +------------------+ +---------------+ +---------------+
|  Biometric & Edge Hub  | | Payroll Engine | | Attendance Core  | | AI Vision OCR | | Notification  |
|  - RTSP Ingestion Hub  | | - Gross-to-Net | | - Geofence Check | | - Gemini 2.5  | | - Email Alert |
|  - Vector Sim Engine   | | - Tax Brackets | | - Shift Policies | | - Doc Parser  | | - In-App Push |
|  - Camera Health Agent | | - Payslip PDF  | | - Leave Accrual  | | - Insights LLM| | - SMS Dispatch|
+------------------------+ +----------------+ +------------------+ +---------------+ +---------------+
                                                     | Persistence Interface
                                                     v
+=========================================================================================================+
|                                   TIER 3: DATA PERSISTENCE & AUDIT LEDGER                               |
+=========================================================================================================+
|  - Multi-Tenant Schema Isolation (`tenant_id` Foreign Key partitioned)                                 |
|  - Tables: Organizations, Branches, Cameras, Employees, Shifts, Attendance, Leaves, Payroll, Audits    |
|  - Biometric Embedding Registry (512-dimension normalized Float32 arrays)                              |
|  - Cryptographic Audit Log (Chained sha256 hash digests for tamper evidence)                           |
+=========================================================================================================+
```

---

## 2. Core Subsystems & Detailed Interactions

### 2.1 CCTV Edge Agent & Biometric Processing Pipeline
1. **Camera Feed Acquisition:** Edge worker ingests RTSP video stream from on-premise IP cameras (H.264 / H.265).
2. **Region of Interest (ROI) Filtering:** Frame coordinates outside the administrator's drawn polygon are zeroed out to prevent processing passersby on sidewalks.
3. **Face Detection & Landmark Extraction:** Detected faces generate a 68-point landmark mesh and 512-float biometric vector embedding.
4. **Local Match & Liveness Probe:** Embedding is compared against the branch's pre-downloaded authorized employee feature store using Cosine Distance.
5. **Event Ingestion:** If $S \ge 0.88$ and liveness is verified, an encrypted event packet (`{cameraId, employeeId, confidence, timestamp, frameSnapshot}`) is posted to `/api/attendance/cctv-punch`.
6. **Live Telemetry Broadcast:** HUD displays 14ms match latency, geometric coordinates, and verification state matching `ai.jpg`.

### 2.2 Geofence Validation Pipeline
1. Remote/mobile employee initiates clock-in on mobile browser.
2. Web Geolocation API retrieves browser coordinates $(\text{lat}, \text{lng})$ and horizontal accuracy $\epsilon$.
3. Backend retrieves configured office branch coordinates and perimeter radius $R$.
4. Haversine equation evaluates geodesic distance $d$. If $d \le R + \epsilon$, status is marked `Verified In-Bounds`; otherwise, punch is rejected or marked `Out-of-Bounds Flagged` according to tenant policy.

### 2.3 Automated Payroll Gross-to-Net Pipeline
```
[Shift & Attendance Ledger]
           |
           v
[Attendance Aggregator] ---> Calculates: Regular Hours, Overtime Hours, Night Shift Hours, Unpaid Leaves
           |
           v
[Tax & Benefit Policy Matrix] ---> Applies: Country/State Tax brackets, Social Security, 401k/EPF, Health
           |
           v
[Gross-to-Net Compute Engine] ---> Produces: Gross Salary, Itemized Deductions, Net Pay, Employer Taxes
           |
           +---> [Digital Payslip Generator] (Generates signed downloadable records)
           +---> [Work Wallet Ledger] (Credits employee on-demand earned wage access)
           +---> [Bank Batch Exporter] (ACH/NACHA/SEPA format output)
```

### 2.4 Multi-Tenant Data Isolation Strategy
- All data access functions require a validated `TenantContext`.
- Row-level tenant discrimination is enforced across all repository queries (`WHERE tenant_id = :tenantId`).
- Cross-tenant data leaks are structurally prevented at both the middleware and repository boundary.
