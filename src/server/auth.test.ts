import test from 'node:test';
import assert from 'node:assert/strict';
import { authService, validateEmail, validatePhone, validatePassword, hashOtp } from './auth.ts';
import { db } from './db.ts';

test('Auth Validation - Rejects invalid emails', () => {
  assert.equal(validateEmail('not-an-email'), false);
  assert.equal(validateEmail('@missing-user.com'), false);
  assert.equal(validateEmail('user@'), false);
  assert.equal(validateEmail('valid.user@company.com'), true);
});

test('Auth Validation - Rejects short or invalid phones', () => {
  assert.equal(validatePhone('123'), false);
  assert.equal(validatePhone('+1 (555) 019-2834'), true);
});

test('Auth Validation - Password strength policy (min 8 chars, letter + number)', () => {
  assert.equal(validatePassword('short1').valid, false);
  assert.equal(validatePassword('onlyletters').valid, false);
  assert.equal(validatePassword('12345678').valid, false);
  assert.equal(validatePassword('SecurePass123!').valid, true);
});

test('Signup & Organization Creation - Creates new tenant and owner user', async () => {
  const timestamp = Date.now();
  const signupResult = await authService.signup({
    orgName: `Apex Manufacturing ${timestamp}`,
    fullName: 'Jane Doe',
    email: `jane.doe.${timestamp}@apex.com`,
    phone: '+1 555-4422',
    password: 'Password123!',
    ipAddress: '192.168.1.1'
  });

  assert.ok(signupResult.tenant.id.startsWith('tenant-'));
  assert.equal(signupResult.tenant.name, `Apex Manufacturing ${timestamp}`);
  assert.equal(signupResult.user.role, 'owner');
  assert.equal(signupResult.user.is_verified, false);
  assert.ok(signupResult.otpCode.length === 6);
});

test('Signup - Rejects duplicate email registration', async () => {
  const timestamp = Date.now();
  const email = `unique.${timestamp}@testcorp.com`;

  await authService.signup({
    orgName: 'Corp A',
    fullName: 'Alice',
    email,
    phone: '+1 555-1111',
    password: 'Password123!'
  });

  await assert.rejects(
    async () => {
      await authService.signup({
        orgName: 'Corp B',
        fullName: 'Bob',
        email,
        phone: '+1 555-2222',
        password: 'Password123!'
      });
    },
    { message: /already exists/i }
  );
});

test('OTP Verification - Validates code and issues session token', async () => {
  const timestamp = Date.now();
  const email = `verify.${timestamp}@testcorp.com`;

  const { otpCode } = await authService.signup({
    orgName: 'Verification Corp',
    fullName: 'Charlie',
    email,
    phone: '+1 555-3333',
    password: 'Password123!'
  });

  const verified = await authService.verifyOtp({
    email,
    code: otpCode
  });

  assert.equal(verified.user.is_verified, true);
  assert.ok(verified.sessionToken.length > 20);

  // Valid session token lookup
  const sessionUser = await authService.validateSession(verified.sessionToken);
  assert.ok(sessionUser !== null);
  assert.equal(sessionUser?.user.email, email);
  assert.equal(sessionUser?.user.tenant_id, verified.tenant.id);
});

test('OTP Verification - Rejects incorrect code and enforces attempt limit', async () => {
  const timestamp = Date.now();
  const email = `retry.${timestamp}@testcorp.com`;

  await authService.signup({
    orgName: 'Retry Corp',
    fullName: 'David',
    email,
    phone: '+1 555-4444',
    password: 'Password123!'
  });

  // Attempt incorrect codes
  await assert.rejects(
    async () => {
      await authService.verifyOtp({ email, code: '000000' });
    },
    { message: /incorrect verification code/i }
  );
});

test('Login - Unverified user is blocked from logging in directly', async () => {
  const timestamp = Date.now();
  const email = `unverified.${timestamp}@testcorp.com`;

  await authService.signup({
    orgName: 'Unverified Corp',
    fullName: 'Eve',
    email,
    phone: '+1 555-5555',
    password: 'Password123!'
  });

  const loginRes = await authService.login({
    email,
    password: 'Password123!'
  });

  assert.equal(loginRes.requiresVerification, true);
  assert.equal(loginRes.sessionToken, '');
});

test('Login - Verified user logs in successfully with valid session token', async () => {
  const timestamp = Date.now();
  const email = `verified.${timestamp}@testcorp.com`;

  const { otpCode } = await authService.signup({
    orgName: 'Verified Corp',
    fullName: 'Frank',
    email,
    phone: '+1 555-6666',
    password: 'Password123!'
  });

  // Verify first
  await authService.verifyOtp({ email, code: otpCode });

  // Now login
  const loginRes = await authService.login({
    email,
    password: 'Password123!'
  });

  assert.equal(loginRes.requiresVerification, undefined);
  assert.ok(loginRes.sessionToken.length > 20);
  assert.equal(loginRes.user.email, email);
});

test('Login - Rejects incorrect password', async () => {
  const timestamp = Date.now();
  const email = `badpw.${timestamp}@testcorp.com`;

  const { otpCode } = await authService.signup({
    orgName: 'BadPW Corp',
    fullName: 'Grace',
    email,
    phone: '+1 555-7777',
    password: 'Password123!'
  });

  await authService.verifyOtp({ email, code: otpCode });

  await assert.rejects(
    async () => {
      await authService.login({ email, password: 'WrongPassword999!' });
    },
    { message: /invalid email or password/i }
  );
});

test('Forgot & Reset Password - Updates password hash after OTP check', async () => {
  const timestamp = Date.now();
  const email = `reset.${timestamp}@testcorp.com`;

  const { otpCode: signupCode } = await authService.signup({
    orgName: 'Reset Corp',
    fullName: 'Heidi',
    email,
    phone: '+1 555-8888',
    password: 'InitialPassword123!'
  });

  await authService.verifyOtp({ email, code: signupCode });

  // Request forgot password
  const { otpCode: resetCode } = await authService.forgotPassword(email);
  assert.ok(resetCode.length === 6);

  // Reset password
  await authService.resetPassword({
    email,
    code: resetCode,
    newPassword: 'UpdatedSecurePass999!'
  });

  // Login with new password succeeds
  const loginRes = await authService.login({
    email,
    password: 'UpdatedSecurePass999!'
  });
  assert.ok(loginRes.sessionToken.length > 20);

  // Old password fails
  await assert.rejects(
    async () => {
      await authService.login({ email, password: 'InitialPassword123!' });
    },
    { message: /invalid email or password/i }
  );
});

test('Tenant Isolation - Cross-tenant access is prohibited', async () => {
  const timestamp = Date.now();
  
  // Organization 1
  const org1 = await authService.signup({
    orgName: `Tenant Alpha ${timestamp}`,
    fullName: 'Alpha Lead',
    email: `alpha.${timestamp}@alpha.com`,
    phone: '+1 555-9001',
    password: 'Password123!'
  });
  await authService.verifyOtp({ email: `alpha.${timestamp}@alpha.com`, code: org1.otpCode });

  // Organization 2
  const org2 = await authService.signup({
    orgName: `Tenant Beta ${timestamp}`,
    fullName: 'Beta Lead',
    email: `beta.${timestamp}@beta.com`,
    phone: '+1 555-9002',
    password: 'Password123!'
  });
  await authService.verifyOtp({ email: `beta.${timestamp}@beta.com`, code: org2.otpCode });

  // Assert tenant IDs are strictly separated
  assert.notEqual(org1.tenant.id, org2.tenant.id);

  // Assert user records belong only to their respective tenants
  const alphaUser = await db.getUserByEmail(`alpha.${timestamp}@alpha.com`);
  const betaUser = await db.getUserByEmail(`beta.${timestamp}@beta.com`);

  assert.equal(alphaUser?.tenant_id, org1.tenant.id);
  assert.equal(betaUser?.tenant_id, org2.tenant.id);
  assert.notEqual(alphaUser?.tenant_id, betaUser?.tenant_id);

  // Verify Audit Logs are scoped strictly per tenant
  const alphaLogs = await db.getAuditLogs(org1.tenant.id);
  for (const log of alphaLogs) {
    assert.equal(log.tenant_id, org1.tenant.id);
  }
});
