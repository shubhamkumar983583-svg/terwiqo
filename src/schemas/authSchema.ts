import { z } from 'zod';

/**
 * Validation rules for corporate & workforce email addresses.
 */
export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Corporate email is required')
  .email('Please enter a valid corporate email format (e.g. name@company.com)');

/**
 * Enterprise password strength requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one numeric digit (0-9)
 * - At least one special symbol (!@#$%^&* etc.)
 */
export const passwordStrengthSchema = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must include at least one uppercase letter (A-Z)')
  .regex(/[a-z]/, 'Password must include at least one lowercase letter (a-z)')
  .regex(/[0-9]/, 'Password must include at least one number (0-9)')
  .regex(/[^A-Za-z0-9]/, 'Password must include at least one special character (e.g. !@#$%^&*)');

/**
 * Authentication schema for Login form.
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordStrengthSchema
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Registration schema for Organization Owner Sign Up.
 */
export const signupSchema = z.object({
  orgName: z
    .string()
    .trim()
    .min(2, 'Organization name must be at least 2 characters'),
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters'),
  email: emailSchema,
  phone: z
    .string()
    .trim()
    .min(7, 'Phone number must be at least 7 digits')
    .max(20, 'Phone number cannot exceed 20 characters')
    .regex(/^[+\d\s\-()]+$/, 'Phone number must contain only numbers and standard phone formatting'),
  password: passwordStrengthSchema
});

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Password strength breakdown interface.
 */
export interface PasswordStrengthResult {
  score: number; // 0 to 4
  label: 'Weak' | 'Fair' | 'Moderate' | 'Strong' | 'Optimal';
  color: string;
  bgColor: string;
  barWidth: string;
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

/**
 * Pure helper function to assess password strength and criterion breakdown.
 */
export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const p = password || '';
  const checks = {
    length: p.length >= 8,
    uppercase: /[A-Z]/.test(p),
    lowercase: /[a-z]/.test(p),
    number: /[0-9]/.test(p),
    special: /[^A-Za-z0-9]/.test(p)
  };

  const satisfiedCount = Object.values(checks).filter(Boolean).length;

  let score = 0;
  let label: PasswordStrengthResult['label'] = 'Weak';
  let color = '#f87171'; // red
  let bgColor = 'bg-rose-500/20';
  let barWidth = '20%';

  if (!p) {
    return {
      score: 0,
      label: 'Weak',
      color: '#71717a',
      bgColor: 'bg-neutral-800',
      barWidth: '0%',
      checks
    };
  }

  if (satisfiedCount <= 2) {
    score = 1;
    label = 'Weak';
    color = '#f87171';
    bgColor = 'bg-rose-500';
    barWidth = '25%';
  } else if (satisfiedCount === 3) {
    score = 2;
    label = 'Fair';
    color = '#fb923c';
    bgColor = 'bg-orange-500';
    barWidth = '50%';
  } else if (satisfiedCount === 4) {
    score = 3;
    label = 'Strong';
    color = '#facc15';
    bgColor = 'bg-amber-400';
    barWidth = '75%';
  } else if (satisfiedCount === 5) {
    score = 4;
    label = 'Optimal';
    color = '#4ade80';
    bgColor = 'bg-emerald-500';
    barWidth = '100%';
  }

  return {
    score,
    label,
    color,
    bgColor,
    barWidth,
    checks
  };
}

/**
 * Validates Login inputs against loginSchema.
 * Returns boolean flag and map of field-level error messages.
 */
export function validateLoginForm(data: { email: string; password: string }): {
  isValid: boolean;
  errors: { email?: string; password?: string };
} {
  const result = loginSchema.safeParse(data);
  if (result.success) {
    return { isValid: true, errors: {} };
  }

  const errors: { email?: string; password?: string } = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as 'email' | 'password';
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { isValid: false, errors };
}

/**
 * Validates Signup inputs against signupSchema.
 * Returns boolean flag and map of field-level error messages.
 */
export function validateSignupForm(data: {
  orgName: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}): {
  isValid: boolean;
  errors: {
    orgName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
  };
} {
  const result = signupSchema.safeParse(data);
  if (result.success) {
    return { isValid: true, errors: {} };
  }

  const errors: {
    orgName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
  } = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0] as 'orgName' | 'fullName' | 'email' | 'phone' | 'password';
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { isValid: false, errors };
}
