# Security Architecture & Threat Model (SECURITY.md)
## Project: WorkPulse AI Enterprise Platform

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Standard:** OWASP Top 10 (2025), GDPR / CCPA Biometric Privacy Standards, SOC 2 Type II controls.

---

## 1. Authentication & Multi-Tenant Authorization Guard

### 1.1 Role-Based Access Control (RBAC) Matrix
| Permission / Resource | Super Admin | Org Admin (HR) | Dept Manager | Payroll Officer | Employee | Edge CCTV Node |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Global Tenants & Billing | **CRUD** | No Access | No Access | No Access | No Access | No Access |
| Org Policy & Branches | Read | **CRUD** | Read | Read | No Access | No Access |
| Employee CRM & Profiles | Read (Masked) | **CRUD** | Read (Dept) | Read | Read (Self) | No Access |
| AI Document OCR & Upload | No Access | **Execute** | No Access | No Access | Upload (Self)| No Access |
| Camera RTSP & ROI Config | Read | **CRUD** | Read (Branch)| No Access | No Access | Heartbeat Only |
| Attendance Ledger View | Audit | **All** | **Dept Only** | Read | **Self Only** | Post Punch |
| Manual Punch Override | No Access | **Execute** | Request Only | No Access | No Access | No Access |
| Payroll Run & Disburse | No Access | Read | No Access | **CRUD** | View Payslip | No Access |
| Work Wallet Withdrawal | No Access | No Access | No Access | Approve | **Request** | No Access |
| Audit Trail Ledger | **Read All**| **Read Org**| Read Dept | Read Fin | No Access | Log Event |

---

## 2. Biometric Privacy, Template Protection & GDPR/CCPA Compliance

### 2.1 Irreversible Vector Representation
1. **Raw Video Discard:** Camera frames are strictly processed in-memory. Raw video feeds are never written to permanent disk storage or cloud databases unless an explicit local NVR retention policy is configured on-premise.
2. **Mathematical Template Storage:** Faces are converted to non-reconstructible 512-dimensional float arrays (normalized facial embeddings). It is mathematically impossible to reconstruct the human face image from this feature vector.
3. **Data Subject Rights:** Employees can request biometric enrollment deletion at any time via the "Right to Erasure" (GDPR Article 17), reverting their clock-in mechanism to dynamic QR or geofenced PIN.

---

## 3. Secret Management & Credential Isolation
- **Rule:** Never embed API keys, database credentials, camera passwords, or HMAC shared secrets in client-side bundles or source code.
- **Server Environment:** Keys (`GEMINI_API_KEY`, `JWT_SECRET`, `ENCRYPTION_KEY`) reside exclusively in server-side process environments (`process.env`).
- **Encrypted Camera RTSP:** RTSP connection strings containing camera usernames and passwords are encrypted using AES-256-GCM before storage, and decrypted only within the isolated edge bridge runtime.

---

## 4. Threat Model & Mitigations (STRIDE Matrix)

| Threat Category | Potential Attack Vector | Applied Mitigation |
| :--- | :--- | :--- |
| **Spoofing** | Presentation attacks on camera (holding up an employee photo or video on a tablet) | Multi-frame dynamic liveness detection (micro-blink detection, specular reflection check, 3D surface depth gradient). |
| **Tampering** | Intercepting and altering attendance ledger timestamps or salary amounts | Chained SHA-256 integrity hashes on ledger rows and immutable audit logs; database foreign key cascading restrictions. |
| **Repudiation** | An employee claims an attendance punch was fabricated by a manager | Dual cryptographic record: edge camera frame cryptographic hash + authenticated token signature. |
| **Information Disclosure** | Cross-tenant data leakage via URL parameter tampering (`/api/v1/employees?tenant_id=...`) | Middleware derives `tenantId` exclusively from verified JWT session claims, ignoring client URL tampering. |
| **Denial of Service** | Flooding biometric punch endpoint with continuous video frame vectors | IP and device token rate limiting (token bucket algorithm: max 10 requests/second per camera node). |
| **Elevation of Privilege** | Normal employee modifying `/onboarding-tasks` or payroll approvals | Strict RBAC route guards verifying user roles before business engine execution. |

---

## 5. Security Audit Logging
Every sensitive action logs an immutable event:
```json
{
  "timestamp": "2026-10-18T09:30:15Z",
  "actorId": "usr-882194",
  "actorEmail": "admin@nlcorp.com",
  "actorRole": "org_admin",
  "action": "PAYROLL_RUN_APPROVED",
  "resourceType": "payroll_run",
  "resourceId": "pr-feb-2025",
  "clientIp": "192.168.1.104",
  "userAgent": "Mozilla/5.0 ...",
  "diff": { "status": { "from": "calculated", "to": "approved" } }
}
```
