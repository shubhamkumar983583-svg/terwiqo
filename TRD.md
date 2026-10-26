# Technical Requirements Document (TRD)
## Project: WorkPulse AI — Technical Standards & System Engineering

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Runtime Environment:** Node.js 22 LTS, Vite 8, React 19, TypeScript 5.8+, Express backend middleware, Tailwind CSS v4.

---

## 1. System Engineering Principles & Standards

### 1.1 Architectural Tenets
1. **Zero Client Secrets:** All AI operations (Gemini API), cryptographic verification keys, and administrative endpoints execute on secure server boundaries (`/api/*`).
2. **Tenant Isolation by Construction:** Every database record, in-memory cache key, and event pipeline payload enforces mandatory `tenantId` qualification with strict authorization middleware checks.
3. **Decoupled Logic & Deterministic Testing:** Pure mathematical and business engines (payroll gross-to-net calculations, geofence Haversine distance, QR HMAC verification, biometric euclidean distance matching) reside in isolated, side-effect-free TypeScript modules covered by Node's native `node:test` runner.
4. **Resilient Edge-First Biometrics:** CCTV and attendance systems operate asynchronously; network dropouts queue event envelopes locally with timestamp watermarks, synchronized once upstream connectivity resumes.
5. **Anti-Slop Visual Fidelity:** Strictly adhere to the provided visual mockups (`landing page.jpg`, `onbording.webp`, `pricing pages.webp`, `ai.jpg`), avoiding AI cliches (no comment headers, no fake scoreboard gauges, zero static pill tags, strict tabular numerals).

---

## 2. Technology Stack & Framework Justifications

| Layer | Selected Technology | Version | Rationale & Enterprise Standards |
| :--- | :--- | :--- | :--- |
| **Web Dashboard** | Next.js / React 19 + TypeScript | v15 / React 19 | Responsive web app and executive dashboard with SSR/CSR hydration, strict TypeScript. |
| **Employee Mobile App** | Flutter / Dart (Native) + PWA | Flutter 3.24+ | Cross-platform native mobile app (iOS/Android) with offline local SQLite sync and hardware camera biometric integration; Web PWA client parity. |
| **Backend API** | NestJS / Express TypeScript | NestJS 10 / Node 22 | Modular enterprise architecture: Controllers, Services, Dependency Injection, Guards, Interceptors, and DTO validation. |
| **Main Database** | PostgreSQL | PostgreSQL 16+ | ACID transactional integrity, JSONB support for ROI coordinates/audit diffs, row-level security (RLS) for tenant isolation. |
| **Cache & Queues** | Redis / BullMQ | Redis 7.2 | Fast in-memory caching for dynamic 30s HMAC tokens, rate-limiting counters, and background queues for payroll batch computation and notification dispatch. |
| **File Storage** | S3-Compatible Object Storage | AWS S3 / MinIO | Pre-signed upload URLs for encrypted employee document OCR uploads, profile portraits, and payslip PDF archives. |
| **CCTV Processing** | Separate Local Edge Agent | Go / Python Edge Daemon | Dedicated on-premise local micro-service processing RTSP/ONVIF streams, extracting 512-d embeddings, and publishing authenticated events via gRPC / HTTPS. |
| **AI Processing** | Independent Provider Adapters | Gemini 2.5 Flash / Vision | Modular provider adapters (`AiVisionAdapter`, `AiInsightsAdapter`) isolating external LLM APIs behind clean interfaces. |
| **API Contract** | OpenAPI 3.0 (OAS) | OpenAPI 3.0.3 | Single source of truth in `openapi.yaml` generating client SDKs, Swagger UI documentation, and backend DTO schema validation. |
| **Testing** | Unit + Integration + E2E | Node native `node:test`, Playwright | Deterministic unit tests for pure algorithms (payroll, Haversine, HMAC, vectors) and end-to-end browser user journey validation. |
| **Deployment** | Docker, CI/CD, Managed Cloud | Docker & Compose | Multi-stage Dockerfile, automated lint/test CI workflows, and Cloud Run / Kubernetes deployment manifests. |

---

## 3. Data Flow & Service Integration Standards

```
+----------------------------------------------------------------------------------------------------+
|                                         CLIENT BROWSER / PWA                                       |
|  [Public Website]   [Executive Dashboard Bento]   [Employee Work Wallet]   [Biometric HUD Scanner] |
+--------------------------------------------------+-------------------------------------------------+
                                                   | HTTP/REST + Server Sent Events (SSE)
                                                   v
+----------------------------------------------------------------------------------------------------+
|                                    EXPRESS SERVER RUNTIME (/api/*)                                 |
|  - Tenant Security Middleware (Authorization & Tenant Scoping)                                     |
|  - Rate Limiter & Audit Logger                                                                     |
+--------------------------------------------------+-------------------------------------------------+
          |                                        |                                        |
          v                                        v                                        v
+----------------------+        +-----------------------------------+       +----------------------+
| AI Processing Proxy  |        | Business Engine Subsystems        |       | Persistence Engine   |
| - Gemini 2.5 Flash   |        | - Payroll Gross-to-Net Engine     |       | - Multi-tenant Store |
| - Document OCR       |        | - Geofence Haversine Validator    |       | - Attendance Ledger  |
| - Shift Insights     |        | - Dynamic HMAC QR Token Generator |       | - Employee Profiles  |
+----------------------+        | - Biometric Vector Matcher        |       | - Audit Logs         |
                                +-----------------------------------+       +----------------------+
```

---

## 4. Key Algorithmic Implementations

### 4.1 Geofence Distance Calculation (Haversine Formula)
To validate mobile punches within radius $R$ of branch coordinates $(\phi_1, \lambda_1)$ from user GPS $(\phi_2, \lambda_2)$:
$$d = 2r \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta\lambda}{2}\right)}\right)$$
Where $r = 6371000\text{ m}$. Punch is valid if $d \le R_{\text{allowed}} + \text{accuracyMargin}$.

### 4.2 Biometric Face Vector Distance (Cosine Similarity & Euclidean Norm)
$$S_{\cos}(A, B) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\|_2 \|\mathbf{B}\|_2}$$
Threshold for authentic match: $S_{\cos} \ge 0.88$ (corresponding to $99.2\%$ confidence).

### 4.3 Dynamic QR HMAC Signature
Dynamic employee QR string payload:
$$\text{Payload} = \text{tenantId} : \text{employeeId} : \text{timestamp} : \text{nonce}$$
$$\text{Token} = \text{HMAC-SHA256}(\text{Payload}, K_{\text{tenant}})$$
Tokens expire after $T = 30\text{ seconds}$. Security station scanner rejects tokens where $|t_{\text{current}} - t_{\text{token}}| > 30\text{s}$.

### 4.4 Gross-to-Net Payroll Formula
$$\text{Gross Pay} = \text{Base Salary} + (\text{Regular Hours} \times R_h) + (\text{Overtime Hours} \times 1.5 \times R_h) + \text{Allowances}$$
$$\text{Statutory Deductions} = \text{Income Tax (bracketed)} + \text{Social Security/Pension} + \text{Health Insurance}$$
$$\text{Net Pay} = \text{Gross Pay} - \text{Statutory Deductions} - \text{Voluntary Withholdings}$$

---

## 5. Non-Functional Requirements & Performance SLAs

- **API Response Latency:** P95 $< 120\text{ms}$ for ledger entries, queries, and shift allocations.
- **Biometric Edge HUD Render Time:** 60 FPS canvas telemetry with $\le 16\text{ms}$ frame jitter.
- **AI OCR Processing Time:** Sub-3 seconds for complete document text and parameter extraction via Gemini 2.5 Flash.
- **Client Bundle Size:** $< 350\text{KB}$ gzipped core bundle.
- **Browser Compatibility:** Chromium 110+, Safari 16+, Firefox 115+, Edge 110+.
- **Accessibility:** WCAG 2.1 AA compliant, visible focus rings, high contrast ratios ($\ge 4.5:1$).
