# DevOps, Deployment & Infrastructure Specification (DEPLOYMENT.md)
## Project: WorkPulse AI Enterprise Platform

**Document Version:** 1.0.0  
**Target Environments:** AI Studio Preview, Cloud Run Container, Edge Micro-appliances (Linux/ARM64).

---

## 1. Environment Configurations

```
+----------------------------------------------------------------------------------------------------+
|  Variable Key             | Type    | Preview / Staging Value        | Production Hardening        |
+---------------------------+---------+--------------------------------+-----------------------------+
|  PORT                     | number  | 3000                           | 8080 (Cloud Run container)  |
|  NODE_ENV                 | string  | development                    | production                  |
|  GEMINI_API_KEY           | secret  | Process injected via AI Studio | Secret Manager / KMS        |
|  APP_URL                  | string  | https://ais-pre-...run.app     | https://app.workpulse.ai    |
|  JWT_SECRET               | secret  | In-memory dev key              | Rotated ed25519 keypair     |
|  EDGE_SYNC_INTERVAL_SEC   | number  | 10                             | 5                           |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Containerization & Build Pipeline

### 2.1 Build Command Sequence
```bash
# 1. Dependency Resolution
npm install

# 2. Automated Test Run
node --test

# 3. Production Vite Bundle
npm run build

# 4. Server Execution
node server.ts
```

---

## 3. Database Migrations & Seed Strategy

1. **Schema Upgrades:** Drizzle ORM / Prisma migrations execute during pre-start hook with forward-only schema alterations.
2. **Deterministic Seed Data:** Initial deployment seeds realistic multi-tenant data:
   - Tenant: `NL Corp` (`nl-corp`)
   - Departments: Product Design, Frontend Engineering, Plant Operations, Security
   - Executive Employee: `Helen Vasilovsky` (UX Designer, $6,110 salary, 500 days tenure, 98% onboarding)
   - Branches: Munich HQ (lat: 48.137154, lng: 11.576124, radius: 150m)
   - Active Cameras: `CAM-GATE-01` (Turnstile East, 1080p60, online)

---

## 4. Disaster Recovery, Backups & Rollback

- **Point-in-Time Recovery (PITR):** Transaction logs backed up continuously with 30-day retention.
- **Rollback Procedure:** Cloud Run instant revision traffic splitting: revert to prior healthy image tag within <10 seconds upon anomalous health check or elevated 5xx error spikes.
- **Circuit Breakers:** If edge CCTV ingestion is interrupted, biometric fallback seamlessly allows dynamic QR and mobile GPS clock-ins without data loss.

---

## 5. Automated CI/CD Pipeline (.github/workflows/ci.yml)
```yaml
name: WorkPulse Enterprise CI/CD
on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test-and-verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - name: Install Dependencies
        run: npm ci
      - name: TypeScript Static Lint
        run: npm run lint
      - name: Execute Native Unit Tests (Node 22)
        run: node --test
      - name: OpenAPI Contract Validation
        run: npx @redocly/cli lint openapi.yaml
      - name: Build Production Assets
        run: npm run build

  deploy-container:
    needs: test-and-verify
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Build & Push Multi-Arch Images
        run: |
          docker compose -f docker-compose.yml build
```

