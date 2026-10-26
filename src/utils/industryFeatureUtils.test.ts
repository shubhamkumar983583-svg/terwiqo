import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getIndustryExcludedTabs,
  getIndustryExcludedReason,
  isTabEnabledForIndustry,
  searchIndustriesBilingual,
  getIndustryFeatureSummary
} from './industryFeatureUtils.ts';

describe('Industry Feature Adaptation & Bilingual Search Test Suite', () => {
  it('School & College: Excludes payroll and salary features as requested by user', () => {
    const schoolExcluded = getIndustryExcludedTabs('school');
    assert.ok(schoolExcluded.includes('payroll'));
    assert.ok(schoolExcluded.includes('work_wallet'));
    assert.strictEqual(isTabEnabledForIndustry('school', 'payroll'), false);
    assert.strictEqual(isTabEnabledForIndustry('school', 'work_wallet'), false);

    const collegeExcluded = getIndustryExcludedTabs('college');
    assert.ok(collegeExcluded.includes('payroll'));
    assert.ok(collegeExcluded.includes('work_wallet'));
    assert.strictEqual(isTabEnabledForIndustry('college', 'payroll'), false);

    const reason = getIndustryExcludedReason('school', 'payroll');
    assert.ok(reason && reason.includes('Payroll'));
  });

  it('Factory: Preserves payroll, shift overtime, and safety alerts', () => {
    const factoryExcluded = getIndustryExcludedTabs('factory');
    assert.strictEqual(factoryExcluded.length, 0);
    assert.strictEqual(isTabEnabledForIndustry('factory', 'payroll'), true);
    assert.strictEqual(isTabEnabledForIndustry('factory', 'ai_alerts'), true);
  });

  it('Bilingual Search: Matches Hindi keywords accurately', () => {
    // "फैक्ट्री" -> matches Factory
    const factoryResults = searchIndustriesBilingual('फैक्ट्री');
    assert.ok(factoryResults.some((i) => i.id === 'factory'));

    // "स्कूल" -> matches School
    const schoolResults = searchIndustriesBilingual('स्कूल');
    assert.ok(schoolResults.some((i) => i.id === 'school'));

    // "कॉलेज" or "collage" -> matches College
    const collegeResults = searchIndustriesBilingual('कॉलेज');
    assert.ok(collegeResults.some((i) => i.id === 'college'));
    const collageResults = searchIndustriesBilingual('collage');
    assert.ok(collageResults.some((i) => i.id === 'college'));

    // "कन्स्ट्रक्शन" or "साइड" -> matches Construction
    const constructionResults = searchIndustriesBilingual('साइड');
    assert.ok(constructionResults.some((i) => i.id === 'construction'));

    // "मेडिकल स्टोर" or "दवा दुकान" -> matches Medical Store
    const medicalResults = searchIndustriesBilingual('मेडिकल स्टोर');
    assert.ok(medicalResults.some((i) => i.id === 'medical_store'));
  });

  it('getIndustryFeatureSummary: Returns correct breakdown and user headline', () => {
    const schoolSummary = getIndustryFeatureSummary('school');
    assert.strictEqual(schoolSummary.totalModules, 21);
    assert.strictEqual(schoolSummary.excludedCount, 2);
    assert.strictEqual(schoolSummary.activeModules, 19);
    assert.ok(schoolSummary.headline.includes('Payroll & Salary excluded'));

    const factorySummary = getIndustryFeatureSummary('factory');
    assert.strictEqual(factorySummary.totalModules, 21);
    assert.strictEqual(factorySummary.excludedCount, 0);
    assert.strictEqual(factorySummary.activeModules, 21);
  });
});
