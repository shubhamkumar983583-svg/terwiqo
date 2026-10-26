import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from './db.ts';

test('Biometric Logs - Default seed contains verified CCTV punch records', async () => {
  const logs = await db.getBiometricLogs('tenant-01');
  assert.ok(logs.length >= 5);

  const helenLog = logs.find((l) => l.employee_name === 'Helen Vasilovsky');
  assert.ok(helenLog);
  assert.equal(helenLog?.status, 'verified');
  assert.equal(helenLog?.relay_action, 'UNLOCKED');
  assert.ok(helenLog?.confidence_score && helenLog.confidence_score > 0.98);
  assert.ok(helenLog?.latency_ms && helenLog.latency_ms <= 15);
});

test('Biometric Logs - Filters by camera ID properly', async () => {
  const gate1Logs = await db.getBiometricLogs('tenant-01', { cameraId: 'CAM_FACTORY_GATE_01' });
  assert.ok(gate1Logs.length > 0);
  assert.ok(gate1Logs.every((l) => l.camera_id === 'CAM_FACTORY_GATE_01'));
});

test('Biometric Logs - Filters by status (verified vs anti_spoof_rejected)', async () => {
  const verifiedLogs = await db.getBiometricLogs('tenant-01', { status: 'verified' });
  assert.ok(verifiedLogs.every((l) => l.status === 'verified'));

  const spoofLogs = await db.getBiometricLogs('tenant-01', { status: 'anti_spoof_rejected' });
  assert.ok(spoofLogs.length > 0);
  assert.equal(spoofLogs[0].relay_action, 'LOCKED');
  assert.ok(spoofLogs[0].failure_reason?.includes('Liveness'));
});

test('Biometric Logs - Records new edge CCTV authentication attempt with sub-15ms latency', async () => {
  const created = await db.createBiometricLog({
    tenant_id: 'tenant-01',
    employee_id: 'EMP-099',
    employee_name: 'Vikram Singhania',
    department: 'Executive Operations',
    camera_id: 'CAM_HIGHBAY_02',
    camera_name: 'CP PLUS Gate 2 Logistics Dock',
    status: 'verified',
    confidence_score: 0.9962,
    latency_ms: 13,
    relay_action: 'UNLOCKED',
    direction: 'IN',
    device_ip: '192.168.1.105'
  });

  assert.ok(created.id.startsWith('bio-log-'));
  assert.equal(created.employee_name, 'Vikram Singhania');
  assert.equal(created.latency_ms, 13);
  assert.equal(created.relay_action, 'UNLOCKED');

  // Verify retrieval
  const searchResult = await db.getBiometricLogs('tenant-01', { search: 'Vikram' });
  assert.ok(searchResult.some((l) => l.employee_name === 'Vikram Singhania'));
});

test('Biometric Logs - Tenant Isolation blocks cross-tenant log retrieval', async () => {
  const otherTenantLogs = await db.getBiometricLogs('tenant-999-isolated');
  assert.equal(otherTenantLogs.length, 0);
});
