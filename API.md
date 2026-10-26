# REST API Specification (API.md)
## Project: WorkPulse AI Enterprise Platform

**Document Version:** 1.0.0  
**Base URL:** `/api/v1`  
**Content-Type:** `application/json`  
**Authentication:** Bearer Token (JWT) + `X-Tenant-ID` header validation

---

## 1. Authentication & Tenant Routing Headers
All authenticated calls require:
```http
Authorization: Bearer <JWT_ACCESS_TOKEN>
X-Tenant-ID: <TENANT_UUID>
```

---

## 2. API Endpoints

### 2.1 Public & Authentication
- `POST /api/v1/auth/login`
  - **Body:** `{ email: string, password: string }`
  - **Returns:** `{ token: string, user: EmployeeProfile, tenant: TenantConfig }`
- `POST /api/v1/auth/register-org`
  - **Body:** `{ companyName: string, adminEmail: string, industry: string, planTier: string }`
  - **Returns:** `{ tenantId: string, setupComplete: boolean }`

### 2.2 Employee CRM & Onboarding
- `GET /api/v1/employees`
  - **Query:** `department?`, `search?`, `workFormat?`, `page`, `limit`
  - **Returns:** `{ items: Employee[], total: number }`
- `GET /api/v1/employees/:id`
  - **Returns:** Full employee record with salary, onboarding tasks, projects, tenure, and biometric enrollment state.
- `PATCH /api/v1/employees/:id/onboarding-tasks`
  - **Body:** `{ taskId: string, completed: boolean }`
  - **Returns:** `{ employeeId: string, updatedProgress: number, tasks: OnboardingTask[] }`

### 2.3 AI Document OCR
- `POST /api/v1/ai/document-ocr`
  - **Form Data:** `file: Blob` (image/pdf)
  - **Processing:** Server sends base64 image bytes to Gemini 2.5 Flash with structured schema extraction prompt.
  - **Returns:**
    ```json
    {
      "extracted": {
        "fullName": "Helen Vasilovsky",
        "documentType": "National_ID",
        "documentNumber": "AB-892147",
        "dateOfBirth": "1994-06-12",
        "expiryDate": "2032-06-11",
        "issuingCountry": "DE",
        "confidence": 0.994
      }
    }
    ```

### 2.4 Dynamic QR & Digital ID
- `GET /api/v1/employees/:id/digital-id`
  - **Returns:** Employee badge credentials, corporate seal signature, and dynamic HMAC token valid for 30 seconds.
- `POST /api/v1/attendance/verify-qr`
  - **Body:** `{ token: string, stationCameraId?: string }`
  - **Returns:** `{ verified: boolean, employee: CompactEmployee, punchEvent: AttendanceEvent }`

### 2.5 CCTV Edge Agent & Biometric Punch
- `POST /api/v1/attendance/cctv-punch`
  - **Body:**
    ```json
    {
      "cameraId": "CAM-GATE-01",
      "biometricVector": [0.041, -0.012, ...],
      "featureMatchConfidence": 0.986,
      "detectedRoi": { "x": 120, "y": 80, "w": 240, "h": 310 },
      "timestamp": "2026-10-18T09:30:00Z"
    }
    ```
  - **Returns:**
    ```json
    {
      "matched": true,
      "employeeId": "emp-uuid-48271",
      "name": "Helen Vasilovsky",
      "status": "verified_on_time",
      "latencyMs": 14
    }
    ```

### 2.6 Mobile Geofenced Punch
- `POST /api/v1/attendance/mobile-punch`
  - **Body:**
    ```json
    {
      "employeeId": "emp-uuid-48271",
      "punchType": "check_in",
      "latitude": 48.137154,
      "longitude": 11.576124,
      "accuracy": 12
    }
    ```
  - **Validation:** Haversine equation confirms distance within branch radius (e.g. 150m).
  - **Returns:** `{ success: boolean, distanceMeters: 42, branchName: "Munich HQ", status: "verified" }`

### 2.7 Camera Feeds & ROI Management
- `GET /api/v1/cameras`
  - **Returns:** List of active cameras, RTSP status (`online`, `degraded`, `offline`), FPS, stream latency, and current ROI vertices.
- `PUT /api/v1/cameras/:id/roi`
  - **Body:** `{ roiPolygon: [{x: number, y: number}] }`
  - **Returns:** `{ success: boolean, updatedRoi: RoiPolygon }`

### 2.8 Payroll & Work Wallet
- `POST /api/v1/payroll/calculate-run`
  - **Body:** `{ periodStart: "2025-02-01", periodEnd: "2025-02-28", departmentId?: string }`
  - **Returns:** Summary of gross wages, overtime, statutory deductions, net payouts, and itemized payslip previews.
- `POST /api/v1/payroll/approve-and-disburse`
  - **Body:** `{ runId: string }`
  - **Returns:** Batch disbursement receipt with SHA-256 integrity hash.
- `GET /api/v1/wallet/balance/:employeeId`
  - **Returns:** `{ availableEarnedWages: number, projectedMonthly: number, lastDisbursement: object }`

### 2.9 AI Workforce Insights
- `GET /api/v1/ai/workforce-insights`
  - **Returns:** Gemini-analyzed absenteeism trends, roster bottleneck alerts, and shift efficiency recommendations.

---

## 3. Standard Error Envelope
```json
{
  "error": {
    "code": "OUT_OF_GEOFENCE_BOUNDS",
    "message": "Current GPS location (48.189, 11.612) is 5,420 meters from Munich HQ (limit: 150m)",
    "timestamp": "2026-10-18T09:30:00Z",
    "tenantId": "nl-corp-uuid"
  }
}
```
