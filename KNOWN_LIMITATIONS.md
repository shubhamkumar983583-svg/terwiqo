# Known Limitations & Technical Constraints (KNOWN_LIMITATIONS.md)
## Project: WorkPulse AI Enterprise Platform

**Document Version:** 1.0.0  
**Status:** Baseline Established  

---

## 1. Current Environment Limitations & Architectural Assumptions

### 1.1 Web Browser Hardware Constraints
- **Hardware RTSP Ingestion:** Standard web browsers cannot ingest raw UDP/TCP RTSP video streams directly due to browser sandbox security. In the web interface, live RTSP streams are represented through low-latency WebRTC transcode proxies, animated video streams, and interactive canvas renderers. A dedicated on-premise edge binary (C++/Go) is required on the physical LAN for direct RTSP frame grabs.
- **Biometric Enclave:** Mobile web browsers do not have direct access to iOS Secure Enclave or Android Titan M hardware keystores. The web PWA utilizes Web Crypto API (`SubtleCrypto` HMAC-SHA256) which is cryptographically sound in-memory but subject to browser sandbox lifecycle limitations.
- **Geolocation Precision:** Browser `navigator.geolocation` accuracy depends on GPS availability. Indoors, WiFi triangulation may yield 15–50 meter accuracy variances. The system accommodates this with a configurable `accuracyMargin` parameter.

### 1.2 External Integrations & Scope Boundaries (MVP vs Phase 2)
- **Direct Banking Rail API:** Instant earned wage transfers via automated clearing house (ACH/NACHA/SEPA Instant) are simulated with cryptographic disbursement batch receipts. Direct live banking connections (Plaid / Stripe Financial Connections) require merchant underwriting and KYC certification outside the preview sandbox.
- **Enterprise Single Sign-On (SAML 2.0 / SCIM):** Okta and Azure AD enterprise directory automated provisioning is designed in the schema and TRD; live tenant federation requires customer Okta administrator credentials.
- **Hardware Turnstile Relays:** Direct dry-contact relay triggers (e.g. Advantech ADAM-6060 relays for gate unlock) require local physical network connectivity.

---

## 2. Unfinished Features & Future Enhancements

1. **Edge Local NVR Storage:** Archiving raw 30-day continuous video alongside attendance events.
2. **Thermal & Mask Detection:** Specialized IR camera feeds for healthcare infection control.
3. **Multi-Currency Global Payroll:** Automatic multi-country FX rate conversions and international statutory tax calculations for distributed remote contractors.
