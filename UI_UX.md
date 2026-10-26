# UI / UX Design System & Component Architecture (UI_UX.md)
## Project: WorkPulse AI — Enterprise AI Workforce HRMS, Smart Attendance, CCTV AI & Payroll SaaS

**Document Version:** 1.0.0  
**Design Constitution:** Zero-pill metadata discipline, anti-slop visual restraint, 60-30-10 color balance, single-elevation depth, tabular numerals for all metrics.

---

## 1. Visual Design Token Architecture (Derived from Uploaded Design References)

Our design system reconciles four distinct visual surfaces into a cohesive, high-end enterprise platform:

### 1.1 Palette 1: "Warm Sunset Radiant Glow" (Source: `landing page.jpg`)
*Primary Usage:* Public Landing Page, Brand Identity, Marketing Hero, High-Conversion CTA sections.
- **Brand Hero Gradient:**
  `radial-gradient(ellipse at 85% 30%, #FFE9D6 0%, #FFB685 35%, #E8713C 80%, #B8471B 100%)`
- **Brand Text / Dark Contrast:** `#101113` (Deep Obsidian Ink)
- **Peach Tinted Surfaces:** `#FFF8F3` (Subtle off-white background), `#FCEEE3` (Soft border hairline)
- **Accent Glow Warmth:** `#FF7A30` to `#FF9E6C`

### 1.2 Palette 2: "Executive Oatmeal & Dark Slate Bento" (Source: `onbording.webp`)
*Primary Usage:* HR Admin Console, Employee CRM, Onboarding Workspace (`NL CORP.` style), Profile & Roster Views.
- **Deep Slate Sidebar Background:** `#0F1113` (Primary dark sidebar)
- **Sidebar Hover / Active Item:** `#181B1F` with active neon-lime indicator (`#C7F238` / `#D4FF3F`)
- **Main Canvas Neutral:** `#F4F1EA` (Warm Oatmeal Sand, 60% canvas allocation)
- **Primary Bento Card Surface:** `#FFFFFF` with `1px solid rgba(0, 0, 0, 0.06)` border and subtle $4\text{px}$ elevation
- **Muted Bento Card Surface:** `#EFECE5` / `#E8E4DB` (e.g., Onboarding task list background)
- **Donut Chart & Working Format Rings:**
  - Office (50%): Cyan Accent (`#06B6D4` / `#22D3EE`)
  - Hybrid (30%): Chartreuse / Lime Accent (`#84CC16` / `#A3E635`)
  - Remote (20%): Rose Coral Accent (`#F43F5E` / `#FB7185`)
- **Metric Card Blur Mesh:**
  `linear-gradient(135deg, rgba(230, 220, 210, 0.6) 0%, rgba(200, 210, 220, 0.4) 100%)` (for Salary `$6,110` card)

### 1.3 Palette 3: "Multi-Tier Microgrid Pricing" (Source: `pricing pages.webp`)
*Primary Usage:* Subscription Management, Pricing Calculator, Plan Upgrade Modals.
- **Neutral Canvas:** `#F8F9FA` with subtle background SVG square grid pattern (`rgba(0, 0, 0, 0.03)`)
- **Tier 1 (Individuals - $0):** Soft apricot-peach top gradient highlight (`linear-gradient(180deg, rgba(255,237,213,0.5) 0%, rgba(255,255,255,0) 100%)`)
- **Tier 2 (Teams - $12/user/mo):** Soft periwinkle-indigo top gradient highlight (`linear-gradient(180deg, rgba(224,231,255,0.7) 0%, rgba(255,255,255,0) 100%)`) with floating pill badge (`30 days free trial` in `#1E1B4B`) and primary solid CTA button (`#4F46E5` / `#4338CA`)
- **Tier 3 (Enterprise - $15k/yr):** Geometric cyan-teal fine line matrix pattern with clean dark outline CTA button (`border border-slate-900 text-slate-900`)

### 1.4 Palette 4: "Cyan Vector Biometric HUD" (Source: `ai.jpg`)
*Primary Usage:* CCTV AI Camera Monitoring, Region-of-Interest (ROI) Configurator, Edge Face Recognition Scanner.
- **HUD Deep Space Background:** `#030712` (Void Black) to `#0B132B` (Deep Navy)
- **Vector Scan Lines & Face Mesh:** `#00F2FE` (Electric Cyan) & `#38BDF8` (Sky 400)
- **Scanning Reticle Brackets:** Corner brackets `rgb(0, 242, 254)` with glowing drop-shadow
- **Telemetry Readout Text:** Monospace green/cyan (`#22D3EE`, `#34D399`) with tabular alignment
- **HUD Labels:**
  - `SCANNING...`
  - `FEATURE EXTRACTION: 99.8%`
  - `GEOMETRIC MATCH: 98.6%`
  - `BIOMETRIC ID: 48271-X`
  - `AUTHENTICATION INITIATED`
  - `LATENCY: 14ms`

---

## 2. Global Typography Hierarchy

```
+----------------------------------------------------------------------------------------------------+
|  Role                 | Font Family                       | Size / Weight    | Tracking & Case     |
+-----------------------+-----------------------------------+------------------+---------------------+
|  Display / Brand Hero | Plus Jakarta Sans / Outfit        | 36px-48px (700)  | -0.025em tight      |
|  Section Headings     | Plus Jakarta Sans                 | 20px-24px (600)  | -0.015em tight      |
|  Body Prose           | Plus Jakarta Sans / Public Sans   | 14px-15px (400)  | normal line-h 1.6   |
|  Tabular Numerics     | JetBrains Mono / IBM Plex Mono    | 12px-22px (500)  | tabular-nums        |
|  CCTV HUD Telemetry   | JetBrains Mono                    | 11px-13px (600)  | uppercase +0.05em   |
+----------------------------------------------------------------------------------------------------+
```

---

## 3. Application Route Matrix & Viewport Blueprints

| Route | Layout Type | Core Components Rendered |
| :--- | :--- | :--- |
| `/` (Landing) | Public 1-Column | Top Bar Contract, Sunset Hero Banner, Interactive Live Demo, Feature Trio, Pricing Grid, FAQ, Footer. |
| `/pricing` | Public 1-Column | 3-Card Grid (`pricing pages.webp`), Monthly/Annual Billing Toggle, Feature Comparison Matrix. |
| `/app/dashboard` | Executive Bento | Dark Sidebar (`NL CORP.`), Top Greeting ("Hello Olivia"), Employee Hero Card, Working Format Donut, Onboarding Task Progress (98%), February 2025 Timeline Schedule, 3 KPI Stat Cards, Salary Card, Personal Data Preview. |
| `/app/cctv-ai` | Cyber Biometric HUD | Video Frame Stream Canvas, ROI Polygon Drawing Tool, 3D Cyan Wireframe Face Mesh (`ai.jpg`), Telemetry Stats (Latency: 14ms, Geometric Match: 98.6%), Camera Health Card. |
| `/app/attendance` | Dense Data Table | Smart Ledger, Date Range Picker, Source Filter (CCTV, Geofence, QR, Mobile), Real-time Event Feed. |
| `/app/geofencing` | Map & Radius View | Interactive Branch Map, Lat/Lng Coordinates, Radius Slider (meters), Live Device Distance Simulator. |
| `/app/payroll` | Financial Console | Gross-to-Net Run Calculator, Tax Breakdown, Overtime Summary, One-Click Disburse, Downloadable Payslips. |
| `/app/work-wallet`| Mobile PWA Card | Earned Wage Access Counter, Real-time Accrued Balance, Withdrawal Request, Transfer History. |
| `/app/digital-id` | Cryptographic Card | Employee Photo, Company Seal, Rotating Dynamic HMAC QR Code (30s refresh countdown). |
| `/app/ocr-verify` | AI Scanner Tool | Document Dropzone, Image Canvas, Gemini Structured OCR Output Form, One-Click Profile Creation. |

---

## 4. Key Interactive Micro-interactions

1. **Working Format Donut Hover:** Hovering over Office (50%), Hybrid (30%), or Remote (20%) segments highlights corresponding employee cards and smoothly transitions inner ring metrics.
2. **Onboarding Task Toggle:** Clicking any task item (e.g. `Team Meeting`) immediately toggles the check state, recalibrates the aggregate progress bar (e.g., from 98% to 100%), and fires an event without page reload.
3. **ROI Polygon Drawer:** Clicking and dragging on the CCTV video canvas creates interactive bounding nodes, instantly updating the camera's active detection area.
4. **Biometric Face Scan Telemetry:** The scanning laser oscillates across the biometric face mesh while telemetry counters stream real-time coordinate updates at 60 FPS.
5. **Pricing Billing Toggle:** Switching between Monthly and Annual toggles price calculations (`$12/mo` vs `$10/mo billed annually`) with smooth tabular number transitions.
