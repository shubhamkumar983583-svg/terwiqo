# Product Requirements Document (PRD)
## Project: WorkPulse AI — Enterprise AI Workforce HRMS, Smart Attendance, CCTV AI & Automated Payroll SaaS

**Document Version:** 1.0.0  
**Status:** Approved for Implementation Planning  
**Target Market:** Small Businesses, Schools & Universities, Manufacturing Plants & Factories, Hospitals & Healthcare Networks, Retail Chains, and Multi-location Enterprises.

---

## 1. Product Executive Summary & Goals

### 1.1 Executive Summary
WorkPulse AI is an enterprise-grade, multi-tenant Human Resource Management System (HRMS) and Workforce Operations platform designed to eliminate payroll fraud, buddy-punching, ghost workers, and manual attendance reconciliation. By combining edge-capable CCTV biometric face verification, GPS geofencing, QR digital ID cards, AI-driven document OCR, dynamic shift and break compliance, and automated gross-to-net payroll engines, WorkPulse AI delivers single-pane-of-glass workforce management with bank-level multi-tenant isolation.

### 1.2 Core Business Goals
1. **Zero-Touch Attendance Verification:** Achieve >99.2% automated face-recognition verification accuracy from existing RTSP/ONVIF security cameras and mobile check-ins with sub-100ms edge inference matching.
2. **Elimination of Payroll Leakage:** Prevent buddy punching, phantom shifts, unapproved overtime, and missed break penalties through cryptographic QR codes, liveness verification, and biometric audit trails.
3. **Frictionless Onboarding:** Reduce employee onboarding cycle time from 3 days to under 5 minutes through automated Gemini-powered AI document OCR (passports, national IDs, licenses, tax certifications).
4. **Autonomous Payroll Processing:** Calculate statutory deductions, overtime multipliers, shift differentials, and benefits in seconds, generating verifiable cryptographically signed digital payslips and Work Wallet disbursement tokens.
5. **Multi-Industry Adaptability:** Support diverse vertical operational requirements:
   - *Factories:* Multiple rotational shifts, hazard compliance, union break mandates, gate CCTV integration.
   - *Hospitals:* 24/7 on-call rosters, credential expiry tracking, ward geofencing.
   - *Schools:* Faculty vs. staff timecards, campus perimeter geofencing, visitor verification.
   - *Retail:* Multi-store roaming shifts, tip pooling, cashier drawer handoffs.
   - *Enterprises:* Multi-subsidiary organizational hierarchies, SSO, custom approval hierarchies.

---

## 2. User Personas & Target Audiences

| Persona | Role | Key Jobs to be Done | Pain Points Addressed |
| :--- | :--- | :--- | :--- |
| **Super Admin** | Platform Owner / SaaS Operator | Manage tenants, enforce subscription limits, monitor global camera inference nodes, review platform audit logs. | Lack of cross-tenant visibility, billing leakage, rogue edge agent tracking. |
| **Org Admin / HR Director** | Enterprise Customer Lead | Configure organization hierarchy, policies, compensation bands, shifts, geofences, and camera RTSP feeds. | Spreadsheet sprawl, disparate systems, manual regulatory compliance checks. |
| **Department Manager / Supervisor** | Shift / Plant Lead | Monitor live CCTV clock-ins, approve leaves, manage shift swaps, review camera health & ROI (Region of Interest) triggers. | Unreported absences, buddy punching at gates, schedule conflicts. |
| **Payroll Officer** | Finance & Compensation | Execute automated payroll runs, audit tax withholdings, preview payslips, verify bank disbursement batches. | Manual overtime calculation errors, compliance penalties, late salary disbursements. |
| **Employee / Worker** | End User / Onsite Staff | Clock in via mobile face scan or gate camera, view digital ID & dynamic QR, submit leave, access Work Wallet & payslips. | Lost plastic badges, slow leave approvals, opaque salary breakdown. |
| **Local Edge Agent / Camera** | Automated Machine Actor | Stream RTSP/ONVIF video frames, detect faces in configured ROI, extract 512-d embeddings, transmit cryptographically signed check-in events. | Unstable network, low light / harsh angles, false alarms. |

---

## 3. High-Level Use Cases

1. **UC-01: Self-Service Tenant Onboarding:** HR Admin signs up, selects tier (Individuals, Teams, Enterprise), configures locations, invites department heads, and sets operational rules.
2. **UC-02: Rapid AI Employee Onboarding & OCR:** HR uploads identity documents (ID/Passport); Gemini AI extracts names, document IDs, birth dates, and tax codes into structured profiles, creating digital credentials.
3. **UC-03: Edge CCTV Biometric Clock-In:** Employee walks past the reception or factory gate camera; edge agent identifies the face in the configured ROI, verifies liveness, and posts an authenticated attendance record with <50ms local latency.
4. **UC-04: Mobile Geofence & Dynamic QR Punch:** Remote or roaming employees open the mobile web app; GPS coordinates are validated against site polygons, face liveness is confirmed, or dynamic rotating QR is scanned by a station tablet.
5. **UC-05: Dynamic Shift & Break Policy Engine:** System tracks grace periods, half-days, meal breaks, and hazardous overtime, auto-flagging anomalies for supervisor review.
6. **UC-06: 1-Click Automated Gross-to-Net Payroll:** Payroll admin clicks "Run Payroll"; system aggregates attendance ledger, calculates base pay, overtime, statutory taxes, deductions, and bonuses, generating downloadable PDF payslips and Work Wallet balances.
7. **UC-07: AI Workforce Intelligence & Predictive Anomaly Detection:** Executive dashboard predicts shift absenteeism, identifies burnout risks, and suggests roster optimizations based on historical patterns.

---

## 4. Functional Requirements & Acceptance Criteria

### Module 1: Public Marketing & Pricing
- **FR-1.1:** Deliver a high-conversion landing page matching the warm peach/sunset luxury brand aesthetic (`landing page.jpg`).
  - *Acceptance Criteria:* Renders responsive navigation, hero value proposition, live interactive product demonstration, proof metrics, and zero layout overflow at 1440px and 390px.
- **FR-1.2:** Deliver interactive multi-tier pricing cards matching `pricing pages.webp` (Individuals $0, Teams $12/user/mo with 30-day trial badge, Enterprise $15k/yr).
  - *Acceptance Criteria:* Billing toggle (monthly vs. annual) updates pricing math; tier comparison breakdown displays exact feature matrices; CTA routes to respective onboarding or demo inquiry workflows.

### Module 2: Organization Onboarding & Multi-Tenant Setup
- **FR-2.1:** Support self-service organization profile registration with industry vertical selection (Factory, Hospital, School, Retail, Enterprise).
  - *Acceptance Criteria:* Organization record created with isolated tenant ID, default shift schedules, and pre-seeded industry holiday calendars.
- **FR-2.2:** Multi-branch and department tree configuration with geographic location bounds.
  - *Acceptance Criteria:* Branches can define multiple geofences (latitude, longitude, radius in meters) and IP allowlists.

### Module 3: Employee CRM & Lifecycle Management
- **FR-3.1:** Rich Employee Bento Directory matching `onbording.webp` (Helen Vasilovsky executive layout, dark slate sidebar, sand canvas, donut charts, task lists).
  - *Acceptance Criteria:* Displays employee photo, title, department, employment format (Office/Hybrid/Remote ring breakdown), tenure counter, completed projects, and compensation card with role-based access control.
- **FR-3.2:** Task-based onboarding tracker with percentage progress bar and interactive checklist.
  - *Acceptance Criteria:* Updating onboarding task state updates the aggregate progress indicator (e.g. 98%) in real time and updates the database record.

### Module 4: AI Document OCR & Verification
- **FR-4.1:** Client/Server file upload for identification documents (National ID, Passport, Driver's License) with client preview.
  - *Acceptance Criteria:* Server routes document to Gemini multimodal vision API, extracting: Full Name, Document Number, Date of Birth, Expiry Date, and Issuing Authority with >98% field precision.

### Module 5: Digital ID Card & Dynamic QR Verification
- **FR-5.1:** Render cryptographic digital employee ID card with photo, company seal, barcode/QR, and employee badge code.
  - *Acceptance Criteria:* Dynamic QR code regenerates with HMAC-SHA256 timestamped payload every 30 seconds to prevent replay attacks and screen photography pass-arounds.
- **FR-5.2:** Station QR verification scanner mode for security desk tablets.
  - *Acceptance Criteria:* Decodes and validates signature, displaying instant green verification status, photo match, and auto-logging entry ledger event.

### Module 6: Attendance Ledger & Smart Clock-In
- **FR-6.1:** Real-time ledger recording timestamps, verification source (CCTV, Mobile Face, QR, Geofence, Manual), coordinates, confidence score, and status (On-Time, Late, Early Departure, Half-Day).
  - *Acceptance Criteria:* Ledger rows display with tabular numerals, source pill indicators, filterable by date range, department, and status.
- **FR-6.2:** Mobile Geofencing Clock-In with client GPS validation against branch polygon/radius.
  - *Acceptance Criteria:* Clock-in rejected if client distance exceeds configured threshold with clear user feedback indicating distance from fence.

### Module 7: CCTV Edge Agent, Camera Health & Biometric Face Verification
- **FR-7.1:** CCTV Stream & Camera Management panel monitoring RTSP/WebRTC streams, camera online/offline heartbeat, FPS, and dropped frames.
  - *Acceptance Criteria:* Status indicator displays camera health (online, degraded, offline), IP address, resolution (e.g., 1080p60), and edge node identifier.
- **FR-7.2:** Region of Interest (ROI) interactive canvas configurator.
  - *Acceptance Criteria:* Admins can draw polygonal or rectangular bounding boxes over camera streams to restrict facial recognition triggers to turnstiles/doorways.
- **FR-7.3:** Futuristic Biometric Face Scan HUD matching `ai.jpg` (cyan wireframe face mesh, coordinate formulas, feature extraction 99.8%, geometric match telemetry, 14ms latency indicator).
  - *Acceptance Criteria:* Visual scanning animation overlays face landmarks, extracts biometric vectors, matches against enrolled employee templates, and logs verified attendance.

### Module 8: Shifts, Policies, Leave, Holidays & Breaks
- **FR-8.1:** Shift roster builder supporting fixed, rotational, night, and flexible shifts with grace periods and overtime rules.
  - *Acceptance Criteria:* Visual calendar schedule matching `onbording.webp` (Feb 2025 timeline with attendee avatars).
- **FR-8.2:** Leave application and approval workflow with balance accrual (Casual, Sick, Annual, Maternity/Paternity).
  - *Acceptance Criteria:* Balance automatically decremented upon supervisor approval; calendar sync reflects approved absence on shift rosters.

### Module 9: Payroll Engine, Payslips & Work Wallet
- **FR-9.1:** Automated gross-to-net payroll engine calculating base pay, hourly overtime, shift differentials, tax withholding, pension/provident fund, and health insurance deductions.
  - *Acceptance Criteria:* Generates payroll batch with total gross, total deductions, and net disbursements with zero rounding drift across multiple employees.
- **FR-9.2:** Cryptographically verifiable digital payslips with itemized earnings, deductions, and downloadable print format.
  - *Acceptance Criteria:* Employee can view and export payslips with watermark and employer verification hash.
- **FR-9.3:** Employee "Work Wallet" interface displaying accrued earned wage access (EWA), projected monthly earnings, and historical disbursement receipts.
  - *Acceptance Criteria:* Displays real-time accrued balance based on validated attendance days worked in current cycle.

### Module 10: Reports, AI Insights & Audit Logs
- **FR-10.1:** AI Workforce Insights generating executive narratives on absenteeism trends, overtime costs, and turnover indicators using Gemini API.
  - *Acceptance Criteria:* Natural language summary accompanied by actionable recommendations and exportable CSV/PDF reports.
- **FR-10.2:** Immutable audit log tracking all administrative changes, salary adjustments, camera configuration edits, and manual attendance overrides.
  - *Acceptance Criteria:* Every audit record records actor ID, IP address, timestamp, affected resource, previous state, and new state.

---

## 5. Scope Separation: MVP vs. Phase 2 vs. Enterprise

```
+---------------------------------------------------------------------------------------+
| MVP (Current Milestone)                                                               |
| - High-Fidelity Landing Page & Pricing (matching jpg/webp design tokens)              |
| - Executive Onboarding & Employee CRM Bento Dashboard (NL Corp / Helen Vasilovsky)    |
| - Biometric CCTV Face Recognition Simulation & Real-Time Scanning HUD (matching ai.jpg)|
| - Live Attendance Ledger with Geofencing, Shifts, Leave & Break Tracking              |
| - Automated Gross-to-Net Payroll Engine, Digital Payslips & Work Wallet               |
| - AI Document OCR (Gemini API integration) & Dynamic QR Verification                  |
| - Multi-tenant data structures, role switching (Admin, Manager, Employee, Super Admin) |
+---------------------------------------------------------------------------------------+
| Phase 2                                                                               |
| - Real RTSP edge daemon binary (Go/Python compiled for Raspberry Pi / Jetson Nano)    |
| - Native iOS/Android biometric wrapper with hardware Secure Enclave attestation       |
| - Direct SEPA/ACH banking wire automated clearing house integrations                  |
| - Multi-language localization (Spanish, Arabic, Hindi, Mandarin, German)              |
+---------------------------------------------------------------------------------------+
| Enterprise Tier                                                                       |
| - SAML 2.0 / Okta / Azure AD Enterprise SSO                                           |
| - Dedicated VPC & On-Premise Edge CCTV appliances                                     |
| - Custom union collective bargaining agreement (CBA) rule engines                    |
+---------------------------------------------------------------------------------------+
```
