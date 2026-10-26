import test from 'node:test';
import assert from 'node:assert/strict';
import { generateDynamicQrToken, verifyDynamicQrToken } from './cryptoQr.ts';

const SECRET = 'workpulse_super_secret_key_2026';
const TENANT_ID = 'nl-corp-uuid-001';
const EMP_ID = 'emp-48271';
const EMP_CODE = 'EMP-48271-X';

test('Dynamic QR - Generates valid token within current time window', () => {
  const now = Date.now();
  const { token, payload } = generateDynamicQrToken(TENANT_ID, EMP_ID, EMP_CODE, SECRET, now);

  assert.equal(typeof token, 'string');
  assert.equal(payload.employeeCode, EMP_CODE);
  assert.equal(payload.expiresInSeconds <= 30, true);

  const verification = verifyDynamicQrToken(token, SECRET, now);
  assert.equal(verification.isValid, true);
  assert.equal(verification.payload?.employeeId, EMP_ID);
});

test('Dynamic QR - Rejects expired token after 90 seconds', () => {
  const now = 1730000000000;
  const { token } = generateDynamicQrToken(TENANT_ID, EMP_ID, EMP_CODE, SECRET, now);

  // 90 seconds later (past tolerance window)
  const verification = verifyDynamicQrToken(token, SECRET, now + 90000);
  assert.equal(verification.isValid, false);
  assert.equal(verification.error, 'TOKEN_EXPIRED');
});

test('Dynamic QR - Rejects forged token with modified secret or payload', () => {
  const now = Date.now();
  const { token } = generateDynamicQrToken(TENANT_ID, EMP_ID, EMP_CODE, SECRET, now);

  // Attempt verification with malicious/wrong secret key
  const verification = verifyDynamicQrToken(token, 'malicious_wrong_secret', now);
  assert.equal(verification.isValid, false);
  assert.equal(verification.error, 'SIGNATURE_MISMATCH');
});
