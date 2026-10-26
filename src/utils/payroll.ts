/**
 * Gross-to-Net Payroll Computation Engine
 */

export interface PayrollInput {
  baseMonthlySalary: number;
  regularHoursWorked: number;
  standardMonthlyHours?: number; // default 160
  overtimeHoursWorked: number;
  overtimeMultiplier?: number;   // default 1.5
  bonusPay?: number;
  pensionRate?: number;          // default 0.05 (5%)
  healthInsuranceRate?: number;  // default 0.04 (4%)
}

export interface PayrollResult {
  basePay: number;
  hourlyRate: number;
  overtimePay: number;
  bonusPay: number;
  grossPay: number;
  incomeTax: number;
  pensionDeduction: number;
  healthInsuranceDeduction: number;
  totalDeductions: number;
  netPay: number;
  effectiveTaxRate: number;
}

export function calculateGrossToNet(input: PayrollInput): PayrollResult {
  const standardHours = input.standardMonthlyHours ?? 160;
  const overtimeMult = input.overtimeMultiplier ?? 1.5;
  const pensionRate = input.pensionRate ?? 0.05;
  const healthRate = input.healthInsuranceRate ?? 0.04;
  const bonus = input.bonusPay ?? 0;

  // Hourly base rate derived from standard contracted monthly hours
  const hourlyRate = Math.round((input.baseMonthlySalary / standardHours) * 100) / 100;
  
  // Base pay proportioned to regular hours
  const basePay = Math.round(hourlyRate * Math.min(input.regularHoursWorked, standardHours) * 100) / 100;
  
  // Overtime pay with 1.5x multiplier
  const overtimePay = Math.round(hourlyRate * overtimeMult * input.overtimeHoursWorked * 100) / 100;

  // Gross pay
  const grossPay = Math.round((basePay + overtimePay + bonus) * 100) / 100;

  // Progressive Tax Bracket computation (Annualized monthly brackets)
  // 0 - $1,500: 5%
  // $1,501 - $4,000: 12%
  // $4,001 - $8,000: 22%
  // $8,001+: 32%
  let incomeTax = 0;
  if (grossPay <= 1500) {
    incomeTax = grossPay * 0.05;
  } else if (grossPay <= 4000) {
    incomeTax = (1500 * 0.05) + ((grossPay - 1500) * 0.12);
  } else if (grossPay <= 8000) {
    incomeTax = (1500 * 0.05) + (2500 * 0.12) + ((grossPay - 4000) * 0.22);
  } else {
    incomeTax = (1500 * 0.05) + (2500 * 0.12) + (4000 * 0.22) + ((grossPay - 8000) * 0.32);
  }
  incomeTax = Math.round(incomeTax * 100) / 100;

  // Statutory social security / pension
  const pensionDeduction = Math.round(grossPay * pensionRate * 100) / 100;

  // Statutory health insurance
  const healthInsuranceDeduction = Math.round(grossPay * healthRate * 100) / 100;

  // Total deductions
  const totalDeductions = Math.round((incomeTax + pensionDeduction + healthInsuranceDeduction) * 100) / 100;

  // Net pay with exact zero-drift balance
  const netPay = Math.round((grossPay - totalDeductions) * 100) / 100;
  const effectiveTaxRate = grossPay > 0 ? Math.round((incomeTax / grossPay) * 1000) / 10 : 0;

  return {
    basePay,
    hourlyRate,
    overtimePay,
    bonusPay: bonus,
    grossPay,
    incomeTax,
    pensionDeduction,
    healthInsuranceDeduction,
    totalDeductions,
    netPay,
    effectiveTaxRate
  };
}
