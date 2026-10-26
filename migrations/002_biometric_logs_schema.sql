-- Migration 002: Biometric Logs Schema (CCTV Edge Ingestion, Verification Telemetry & Turnstile Relays)
-- Up Migration

CREATE TABLE IF NOT EXISTS biometric_logs (
  id VARCHAR(36) PRIMARY KEY,
  tenant_id VARCHAR(36) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
  employee_id VARCHAR(36) NOT NULL,
  employee_name VARCHAR(128) NOT NULL,
  department VARCHAR(64) NOT NULL DEFAULT 'Operations',
  camera_id VARCHAR(64) NOT NULL,
  camera_name VARCHAR(128) NOT NULL,
  status VARCHAR(32) NOT NULL, -- 'verified' | 'failed' | 'anti_spoof_rejected' | 'mask_missing'
  confidence_score NUMERIC(5, 4) NOT NULL, -- e.g. 0.9924 (cosine similarity)
  latency_ms INT NOT NULL, -- e.g. 14 (sub-15ms edge matching)
  relay_action VARCHAR(32) NOT NULL, -- 'UNLOCKED' | 'LOCKED'
  direction VARCHAR(16) NOT NULL DEFAULT 'IN', -- 'IN' | 'OUT'
  device_ip VARCHAR(45) NOT NULL DEFAULT '192.168.1.104',
  failure_reason VARCHAR(128),
  snapshot_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_biometric_logs_tenant_created ON biometric_logs (tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_biometric_logs_status ON biometric_logs (status);
CREATE INDEX IF NOT EXISTS idx_biometric_logs_camera ON biometric_logs (camera_id);
CREATE INDEX IF NOT EXISTS idx_biometric_logs_employee ON biometric_logs (employee_id);
