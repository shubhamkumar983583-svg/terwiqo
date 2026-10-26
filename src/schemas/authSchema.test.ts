import test from 'node:test';
import assert from 'node:assert/strict';
import {
  emailSchema,
  passwordStrengthSchema,
  loginSchema,
  signupSchema,
  evaluatePasswordStrength,
  validateLoginForm,
  validateSignupForm
} from './authSchema.ts';

// ----------------------------------------------------
// 1. Email Format Validation Tests
// ----------------------------------------------------
test('emailSchema - Valid corporate email passes validation', () => {
  const result = emailSchema.safeParse('dedaatish@gmail.com');
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data, 'dedaatish@gmail.com');
  }
});

test('emailSchema - Email with leading/trailing spaces is trimmed and valid', () => {
  const result = emailSchema.safeParse('  helen.v@workforce.ai  ');
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data, 'helen.v@workforce.ai');
  }
});

test('emailSchema - Empty or missing email fails validation', () => {
  const emptyResult = emailSchema.safeParse('');
  assert.equal(emptyResult.success, false);

  const spacesOnly = emailSchema.safeParse('    ');
  assert.equal(spacesOnly.success, false);
});

test('emailSchema - Invalid email formats fail with informative error message', () => {
  const invalidEmails = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@missing-username.com',
    'missing-at-sign.net',
    'user@.com.my'
  ];

  for (const bad of invalidEmails) {
    const res = emailSchema.safeParse(bad);
    assert.equal(res.success, false, `Expected "${bad}" to fail validation`);
  }
});

// ----------------------------------------------------
// 2. Password Strength Validation Tests
// ----------------------------------------------------
test('passwordStrengthSchema - Valid strong password (Admin@1234) passes', () => {
  const result = passwordStrengthSchema.safeParse('Admin@1234');
  assert.equal(result.success, true);
});

test('passwordStrengthSchema - Rejects password shorter than 8 characters', () => {
  const result = passwordStrengthSchema.safeParse('Adm@1');
  assert.equal(result.success, false);
  if (!result.success) {
    const hasMinLengthError = result.error.issues.some((i) => i.message.includes('8 characters'));
    assert.equal(hasMinLengthError, true);
  }
});

test('passwordStrengthSchema - Rejects password lacking uppercase letters', () => {
  const result = passwordStrengthSchema.safeParse('admin@1234');
  assert.equal(result.success, false);
  if (!result.success) {
    const hasUppercaseError = result.error.issues.some((i) => i.message.includes('uppercase'));
    assert.equal(hasUppercaseError, true);
  }
});

test('passwordStrengthSchema - Rejects password lacking lowercase letters', () => {
  const result = passwordStrengthSchema.safeParse('ADMIN@1234');
  assert.equal(result.success, false);
  if (!result.success) {
    const hasLowercaseError = result.error.issues.some((i) => i.message.includes('lowercase'));
    assert.equal(hasLowercaseError, true);
  }
});

test('passwordStrengthSchema - Rejects password lacking numbers', () => {
  const result = passwordStrengthSchema.safeParse('Admin@Secret');
  assert.equal(result.success, false);
  if (!result.success) {
    const hasNumberError = result.error.issues.some((i) => i.message.includes('number'));
    assert.equal(hasNumberError, true);
  }
});

test('passwordStrengthSchema - Rejects password lacking special characters', () => {
  const result = passwordStrengthSchema.safeParse('Admin12345');
  assert.equal(result.success, false);
  if (!result.success) {
    const hasSpecialError = result.error.issues.some((i) => i.message.includes('special character'));
    assert.equal(hasSpecialError, true);
  }
});

// ----------------------------------------------------
// 3. Login Schema & Helper Function Tests
// ----------------------------------------------------
test('validateLoginForm - Valid credentials pass without errors', () => {
  const outcome = validateLoginForm({
    email: 'dedaatish@gmail.com',
    password: 'Admin@1234'
  });
  assert.equal(outcome.isValid, true);
  assert.equal(Object.keys(outcome.errors).length, 0);
});

test('validateLoginForm - Catches both email and password errors simultaneously', () => {
  const outcome = validateLoginForm({
    email: 'invalid-email',
    password: '123'
  });
  assert.equal(outcome.isValid, false);
  assert.equal(typeof outcome.errors.email, 'string');
  assert.equal(typeof outcome.errors.password, 'string');
});

// ----------------------------------------------------
// 4. evaluatePasswordStrength Helper Tests
// ----------------------------------------------------
test('evaluatePasswordStrength - Accurately categorizes password score and checklist', () => {
  const weak = evaluatePasswordStrength('abc');
  assert.equal(weak.score, 1);
  assert.equal(weak.checks.length, false);
  assert.equal(weak.checks.lowercase, true);
  assert.equal(weak.checks.uppercase, false);

  const strong = evaluatePasswordStrength('Admin@1234');
  assert.equal(strong.score, 4);
  assert.equal(strong.label, 'Optimal');
  assert.equal(strong.checks.length, true);
  assert.equal(strong.checks.uppercase, true);
  assert.equal(strong.checks.lowercase, true);
  assert.equal(strong.checks.number, true);
  assert.equal(strong.checks.special, true);
});

// ----------------------------------------------------
// 5. Signup Schema & Helper Function Tests
// ----------------------------------------------------
test('validateSignupForm - Valid organization registration payload passes', () => {
  const outcome = validateSignupForm({
    orgName: 'Apex Technologies Inc',
    fullName: 'Rahul Sharma',
    email: 'rahul@apextech.io',
    phone: '+1 555-0199',
    password: 'Secure#Pass99'
  });
  assert.equal(outcome.isValid, true);
  assert.equal(Object.keys(outcome.errors).length, 0);
});

test('validateSignupForm - Detects invalid phone and short org name', () => {
  const outcome = validateSignupForm({
    orgName: 'A',
    fullName: 'R',
    email: 'bad-email',
    phone: '12',
    password: 'short'
  });
  assert.equal(outcome.isValid, false);
  assert.equal(typeof outcome.errors.orgName, 'string');
  assert.equal(typeof outcome.errors.fullName, 'string');
  assert.equal(typeof outcome.errors.email, 'string');
  assert.equal(typeof outcome.errors.phone, 'string');
  assert.equal(typeof outcome.errors.password, 'string');
});
