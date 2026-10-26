import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateGrossToNet } from './payroll.ts';

test('Payroll calculation - Standard month for Helen Vasilovsky ($6,110 base)', () => {
  const result = calculateGrossToNet({
    baseMonthlySalary: 6110,
    regularHoursWorked: 160,
    overtimeHoursWorked: 10,
    bonusPay: 250
  });

  assert.equal(result.basePay > 0, true);
  assert.equal(result.overtimePay > 0, true);
  assert.equal(result.bonusPay, 250);
  assert.equal(result.grossPay, Math.round((result.basePay + result.overtimePay + 250) * 100) / 100);
  assert.equal(result.netPay, Math.round((result.grossPay - result.totalDeductions) * 100) / 100);
  assert.equal(result.effectiveTaxRate > 0, true);
});

test('Payroll calculation - Zero hours worked results in zero wage and zero deduction', () => {
  const result = calculateGrossToNet({
    baseMonthlySalary: 5000,
    regularHoursWorked: 0,
    overtimeHoursWorked: 0
  });

  assert.equal(result.grossPay, 0);
  assert.equal(result.incomeTax, 0);
  assert.equal(result.totalDeductions, 0);
  assert.equal(result.netPay, 0);
});

test('Payroll calculation - Overtime calculates at 1.5x hourly rate', () => {
  const result = calculateGrossToNet({
    baseMonthlySalary: 3200, // $20/hr at 160 hours
    regularHoursWorked: 160,
    overtimeHoursWorked: 10
  });

  assert.equal(result.hourlyRate, 20);
  // 10 hours * ($20 * 1.5) = $300
  assert.equal(result.overtimePay, 300);
  assert.equal(result.grossPay, 3500);
});
