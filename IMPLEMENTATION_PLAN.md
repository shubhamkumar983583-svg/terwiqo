# Implementation Plan & Milestone Roadmap (IMPLEMENTATION_PLAN.md)
## Project: WorkPulse AI Enterprise Platform

**Document Version:** 1.0.0  
**Status:** Approved for Phased Rollout  

---

## 1. Dependency Graph & Phase Sequencing

```
+-------------------------------------------------------------+
| Phase 0: Design Tokens & Pure Logic Engines (Foundational)   |
| - Design token constants (4 uploaded image palettes)        |
| - Pure utility engines: Payroll, Haversine, HMAC QR, Vector |
| - Native Node.js Unit Tests (node --test)                   |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| Phase 1: Visual Theme, Navigation Shell & Shared Components  |
| - Modern App shell (Dark sidebar, warm oatmeal canvas)      |
| - Top Bar Contract & Role Switcher (Admin, Manager, Worker) |
| - Reusable Bento Card wrappers, Donut Charts, Stat Strips   |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| Phase 2: Core Visual References Implementation               |
| - Landing Page with Warm Sunset Glow (landing page.jpg)     |
| - Pricing Grid with Micro-Patterns (pricing pages.webp)     |
| - Executive Onboarding Bento Dashboard (onbording.webp)     |
| - Biometric CCTV AI Face Scan HUD (ai.jpg)                  |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| Phase 3: Operational Modules & Workflows                     |
| - Real-time Attendance Ledger & Source Filters              |
| - Mobile Geofencing Clock-in Simulator                      |
| - AI Document OCR (Gemini API integration)                  |
| - Dynamic QR Verification & Security Station Mode           |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| Phase 4: Financial & Administrative Capabilities             |
| - Automated Gross-to-Net Payroll Run Engine                 |
| - Downloadable Verifiable Digital Payslips                  |
| - Employee Work Wallet & Earned Wage Access (EWA)           |
| - Shift Management, Leave Accrual & Immutable Audit Logs    |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| Phase 5: Verification, Playwright Testing & Hardening        |
| - Desktop & Mobile Viewport E2E Verification                |
| - Strict Critique Loop & Polish Pass                        |
+-------------------------------------------------------------+
```

---

## 2. Milestone Work Breakdown Structure (WBS)

### Milestone 1: Core Pure Logic Modules & Unit Tests
- Create `src/utils/payroll.ts` (gross-to-net, overtime, progressive tax brackets).
- Create `src/utils/geofence.ts` (Haversine geodesic distance, perimeter verification).
- Create `src/utils/cryptoQr.ts` (Dynamic HMAC token generation & validation).
- Create `src/utils/biometrics.ts` (Vector normalization, cosine distance matching).
- Create corresponding unit test files and execute `node --test` to verify 100% pass rate.

### Milestone 2: UI Design Token System
- Create `src/theme/designTokens.ts` specifying exact hex codes, gradients, shadows, and dimensions from:
  - `landing page.jpg` (Warm peach/sunset glow, Obsidian contrast)
  - `onbording.webp` (Dark slate sidebar `#0F1113`, Oatmeal canvas `#F4F1EA`, cyan/lime/rose rings)
  - `pricing pages.webp` (Peach, Indigo, and Teal header meshes with free trial badge)
  - `ai.jpg` (Electric cyan `#00F2FE` wireframe HUD, telemetry indicators)

### Milestone 3: Complete Screen Implementations & Interactivity
- Build Public Landing Page with warm brand glow.
- Build 3-Tier Pricing view with interactive monthly/annual toggles.
- Build Executive Onboarding Dashboard matching `onbording.webp` pixel-for-pixel (Helen Vasilovsky, Working Format donut chart, 98% Onboarding tasks checklist, February 2025 timeline, Salary card, Personal Data card).
- Build CCTV AI Scanning HUD matching `ai.jpg` with interactive canvas, biometric targeting reticles, real-time telemetry, and manual simulation triggers.
- Build Attendance Ledger with multi-source filtering (CCTV, Geofence, QR, Mobile).
- Build Geofencing map viewer with draggable pin and distance circle simulator.
- Build AI Document OCR scanner with image upload and structured Gemini parsing.
- Build Digital ID with 30s rotating cryptographic QR code.
- Build Payroll Run console with gross-to-net breakdown and printable payslips.
- Build Employee Work Wallet with real-time accrued wage calculation.

### Milestone 4: Verification & Browser Testing
- Execute `node --test`.
- Run `compile_applet` and start development server.
- Capture desktop (1440x900) and mobile (390x844) screenshots.
- Execute user journeys: task completion, live CCTV face punch, pricing toggle, and payroll run.
