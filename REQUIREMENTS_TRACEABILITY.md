# Requirements Traceability Matrix (REQUIREMENTS_TRACEABILITY.md)
## Project: WorkPulse AI Enterprise Platform

**Document Version:** 1.0.0  
**Status:** Baseline Established  

---

## 1. Traceability Matrix

| Requirement ID | Requirement Description | Design Reference / Asset | Component / Implementation File | Verification Test Case |
| :--- | :--- | :--- | :--- | :--- |
| **FR-1.1** | Public landing page with warm sunset aesthetic | `landing page.jpg` (Salad warm glow) | `src/views/LandingView.tsx` | E2E Paint & Responsive layout check |
| **FR-1.2** | 3-tier pricing with monthly/annual toggle | `pricing pages.webp` (Individuals, Teams, Enterprise) | `src/views/PricingView.tsx` | Billing toggle & feature verification |
| **FR-2.1** | Organization onboarding & tenant setup | PRD Module 2 | `src/views/OnboardingWizardView.tsx` | Tenant isolation validation |
| **FR-3.1** | Employee CRM Bento dashboard | `onbording.webp` (NL Corp / Helen Vasilovsky) | `src/views/DashboardView.tsx` | User Journey 1: Helen Vasilovsky Bento card check |
| **FR-3.2** | Interactive onboarding task checklist & progress | `onbording.webp` (98% progress, task list) | `src/components/OnboardingTasksCard.tsx` | `IT-TASK-01` & interactive toggle check |
| **FR-4.1** | AI Document OCR via Gemini vision API | PRD Module 4 | `src/views/DocumentOcrView.tsx` | `IT-OCR-01` OCR structured extraction |
| **FR-5.1** | Digital employee ID card & dynamic HMAC QR | PRD Module 5 | `src/views/DigitalIdView.tsx` | `UT-QR-01` to `UT-QR-04` HMAC expiration test |
| **FR-5.2** | Security station QR scanner | PRD Module 5 | `src/views/QrScannerView.tsx` | QR scan verification & ledger write |
| **FR-6.1** | Real-time attendance ledger with filters | PRD Module 6 | `src/views/AttendanceLedgerView.tsx` | `IT-ATT-01` ledger query & filtering |
| **FR-6.2** | Mobile geofencing clock-in | PRD Module 6 | `src/views/GeofenceView.tsx` | `UT-GEO-01` to `UT-GEO-04` Haversine distance |
| **FR-7.1** | Camera management & health monitoring | PRD Module 7 | `src/views/CameraManagementView.tsx` | Camera stream heartbeat verification |
| **FR-7.2** | Region of Interest (ROI) polygon tool | PRD Module 7 | `src/components/RoiCanvasEditor.tsx` | Polygon coordinate transformation |
| **FR-7.3** | Biometric face scan HUD with telemetry | `ai.jpg` (Cyan face wireframe & HUD) | `src/views/CctvAiScannerView.tsx` | `UT-BIO-01` to `UT-BIO-03` vector match |
| **FR-8.1** | Shifts, policies & February 2025 timeline | `onbording.webp` (Timeline schedule) | `src/components/TimelineScheduleCard.tsx` | Schedule conflict & shift allocation |
| **FR-8.2** | Leave request & balance accrual | PRD Module 8 | `src/views/LeaveManagementView.tsx` | Balance deduction verification |
| **FR-9.1** | Automated gross-to-net payroll engine | PRD Module 9 | `src/utils/payroll.ts`, `src/views/PayrollView.tsx` | `UT-PAY-01` to `UT-PAY-05` zero-drift math |
| **FR-9.2** | Cryptographic digital payslips | PRD Module 9 | `src/components/PayslipModal.tsx` | Payslip SHA-256 integrity check |
| **FR-9.3** | Employee Work Wallet & EWA balance | PRD Module 9 | `src/views/WorkWalletView.tsx` | Real-time earned wage calculation |
| **FR-10.1**| AI workforce insights & anomaly report | PRD Module 10 | `src/views/AiInsightsView.tsx` | Gemini insights generation |
| **FR-10.2**| Tamper-evident audit log ledger | PRD Module 10 | `src/views/AuditLogView.tsx` | Chained hash audit validation |
