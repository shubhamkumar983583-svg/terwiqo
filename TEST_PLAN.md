# Quality Assurance & Test Strategy (TEST_PLAN.md)
## Project: WorkPulse AI Enterprise Platform

**Document Version:** 1.0.0  
**Test Harness:** Native Node.js Test Runner (`node:test`, `node:assert/strict`), Playwright E2E browser automation.

---

## 1. Test Levels & Strategy Overview

```
               [ E2E / Browser Tests ]
             (User Journeys via Playwright)
                      /          \
           [ Integration & API Tests ]
        (Multi-tenant auth, OCR proxy, Ledger)
                 /                    \
       [ Unit Tests (Pure Logic) ]
   (Payroll math, Haversine, HMAC, Vectors)
```

---

## 2. Unit Test Suites (Pure Logic via `node:test`)

### 2.1 Payroll Gross-to-Net Engine (`src/utils/payroll.test.ts`)
- **UT-PAY-01:** Correct calculation of regular base pay from monthly salary.
- **UT-PAY-02:** Overtime pay calculation with $1.5\times$ base rate multiplier.
- **UT-PAY-03:** Multi-tier progressive tax withholding bracket computation.
- **UT-PAY-04:** Statutory pension/social security deduction and healthcare deduction clamping.
- **UT-PAY-05:** Zero-drift summation: $\text{Gross} - \text{Deductions} \equiv \text{Net}$.

### 2.2 Geofence Haversine Calculations (`src/utils/geofence.test.ts`)
- **UT-GEO-01:** Returns distance $0\text{m}$ when coordinates are identical.
- **UT-GEO-02:** Accurately evaluates known coordinate pairs (e.g. Munich Marienplatz to Munich Airport $\approx 28.5\text{km}$).
- **UT-GEO-03:** Correctly verifies whether a point lies within a $150\text{m}$ threshold including device GPS accuracy margin.
- **UT-GEO-04:** Rejects invalid latitude/longitude inputs gracefully.

### 2.3 Dynamic QR HMAC Token Generation (`src/utils/cryptoQr.test.ts`)
- **UT-QR-01:** Generates deterministic HMAC-SHA256 signature for given secret and payload.
- **UT-QR-02:** Validates authentic token when evaluated within the 30-second window.
- **UT-QR-03:** Rejects expired token when evaluated at $t + 35\text{s}$.
- **UT-QR-04:** Rejects tampered payload or forged signature.

### 2.4 Biometric Vector Cosine Similarity (`src/utils/biometrics.test.ts`)
- **UT-BIO-01:** Evaluates similarity $= 1.0$ for identical normalized vectors.
- **UT-BIO-02:** Evaluates similarity $\approx 0.0$ for orthogonal feature vectors.
- **UT-BIO-03:** Accurately flags matches when similarity $\ge 0.88$ ($99.2\%$ confidence).

---

## 3. Integration & API Test Plan
- **IT-AUTH-01:** Multi-tenant scoping prevents Tenant A from retrieving Tenant B's employees.
- **IT-ATT-01:** Clock-in creation updates the employee's live attendance status and writes an immutable audit record.
- **IT-TASK-01:** Toggling an onboarding task updates the employee's aggregate progress percentage and persists to storage.
- **IT-OCR-01:** AI OCR proxy returns normalized structured JSON conforming to ID extraction schema.

---

## 4. End-to-End User Journeys (Playwright & Visual Verification)

### Journey 1: Employee Onboarding & Task Completion (Desktop)
1. Navigate to `/app/dashboard`.
2. Verify greeting "Hello Olivia", employee card "Helen Vasilovsky", working format chart, and February 2025 timeline.
3. Locate "Onboarding tasks" list showing 98%. Click on unchecked task "Team Meeting".
4. *Expected State:* Checkmark fills, progress bar recalculates to 100%, and persistence event fires.

### Journey 2: CCTV Biometric AI Live HUD
1. Navigate to `/app/cctv-ai`.
2. Verify deep space navy canvas with glowing cyan face wireframe.
3. Observe live telemetry metrics: `FEATURE EXTRACTION: 99.8%`, `GEOMETRIC MATCH: 98.6%`, `LATENCY: 14ms`.
4. Trigger manual face punch simulation.
5. *Expected State:* Authentication green pulse, attendance ledger item logged with source `cctv_ai`.

### Journey 3: Multi-Tier Pricing & Plan Selection
1. Navigate to `/pricing`.
2. Verify 3 plan cards: Individuals ($0), Teams ($12), Enterprise ($15k).
3. Toggle between Monthly and Annual billing.
4. *Expected State:* Numbers update with tabular alignment; "30 days free trial" badge remains anchored.

---

## 5. Security & Penetration Testing
- Rate limiting verification: exceed 60 requests/minute to trigger HTTP 429.
- Header injection & XSS testing on employee profile fields.
- Biometric replay protection with timestamped token nonces.
