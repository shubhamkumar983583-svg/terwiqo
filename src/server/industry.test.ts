import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUPPORTED_INDUSTRIES,
  industryRegistry,
  findIndustryById,
  searchIndustries
} from '../data/industryRegistry.ts';
import { db } from './db.ts';

test('Industry Registry - Dictionary export has key business types with icons and features', () => {
  assert.ok(industryRegistry.factory, 'Missing factory in registry dictionary');
  assert.equal(industryRegistry.factory.name, 'Factory & Manufacturing');
  assert.equal(industryRegistry.factory.iconName, 'Factory');
  assert.equal(industryRegistry.factory.features.multiGate, true);
  assert.equal(industryRegistry.factory.features.nightShift, true);

  assert.ok(industryRegistry.mall, 'Missing mall in registry dictionary');
  assert.equal(industryRegistry.mall.name, 'Shopping Mall & Retail');
  assert.equal(industryRegistry.mall.iconName, 'ShoppingBag');
  assert.equal(industryRegistry.mall.features.storeManagement, true);

  assert.ok(industryRegistry.hospital, 'Missing hospital in registry dictionary');
  assert.equal(industryRegistry.hospital.name, 'Hospital & Healthcare');
  assert.equal(industryRegistry.hospital.iconName, 'HeartPulse');
  assert.equal(industryRegistry.hospital.features.wardManagement, true);

  assert.ok(industryRegistry.school, 'Missing school in registry dictionary');
  assert.equal(industryRegistry.school.name, 'School');
  assert.equal(industryRegistry.school.iconName, 'GraduationCap');
  assert.equal(industryRegistry.school.features.timetableShifts, true);
});

test('Industry Registry - Contains all required business types including medical_store', () => {
  assert.equal(SUPPORTED_INDUSTRIES.length, 16);
  const ids = SUPPORTED_INDUSTRIES.map((i) => i.id);
  const required = [
    'factory',
    'mall',
    'hospital',
    'school',
    'college',
    'coaching',
    'office',
    'hotel',
    'warehouse',
    'restaurant',
    'construction',
    'medical_store',
    'security',
    'salon',
    'enterprise',
    'custom'
  ];
  for (const req of required) {
    assert.ok(ids.includes(req), `Missing expected industry: ${req}`);
  }
});

test('Industry Keyword Search - Searches for "mall" / "retail" -> Shopping Mall & Retail', () => {
  const byMall = searchIndustries('mall');
  assert.ok(byMall.length > 0);
  assert.equal(byMall[0].id, 'mall');

  const byRetail = searchIndustries('retail');
  assert.ok(byRetail.length > 0);
  assert.equal(byRetail[0].id, 'mall');

  const byShoppingCentre = searchIndustries('shopping centre');
  assert.ok(byShoppingCentre.length > 0);
  assert.equal(byShoppingCentre[0].id, 'mall');
});

test('Industry Keyword Search - Searches for "hospital" / "clinic" / "doctor" -> Hospital & Healthcare', () => {
  const byHospital = searchIndustries('hospital');
  assert.ok(byHospital.length > 0);
  assert.equal(byHospital[0].id, 'hospital');

  const byDoctor = searchIndustries('doctor');
  assert.ok(byDoctor.length > 0);
  assert.equal(byDoctor[0].id, 'hospital');

  const byClinic = searchIndustries('clinic');
  assert.ok(byClinic.length > 0);
  assert.equal(byClinic[0].id, 'hospital');
});

test('Industry Keyword Search - Searches for "school" / "teacher" -> School', () => {
  const bySchool = searchIndustries('school');
  assert.ok(bySchool.length > 0);
  assert.equal(bySchool[0].id, 'school');

  const byTeacher = searchIndustries('teacher');
  assert.ok(byTeacher.length > 0);
  assert.equal(byTeacher[0].id, 'school');
});

test('Industry Keyword Search - Searches for "college" / "university" -> College & University', () => {
  const byCollege = searchIndustries('college');
  assert.ok(byCollege.length > 0);
  assert.equal(byCollege[0].id, 'college');

  const byUniversity = searchIndustries('university');
  assert.ok(byUniversity.length > 0);
  assert.equal(byUniversity[0].id, 'college');
});

test('Industry Keyword Search - Searches for "coaching" / "tuition" -> Coaching & Training Institute', () => {
  const byCoaching = searchIndustries('coaching');
  assert.ok(byCoaching.length > 0);
  assert.equal(byCoaching[0].id, 'coaching');

  const byTuition = searchIndustries('tuition');
  assert.ok(byTuition.length > 0);
  assert.equal(byTuition[0].id, 'coaching');
});

test('Industry Keyword Search - Searches for "factory" / "manufacturing" -> Factory & Manufacturing', () => {
  const byFactory = searchIndustries('factory');
  assert.ok(byFactory.length > 0);
  assert.equal(byFactory[0].id, 'factory');

  const byPlant = searchIndustries('plant');
  assert.ok(byPlant.length > 0);
  assert.equal(byPlant[0].id, 'factory');
});

test('Industry Lookup - Fallback returns default Factory config for unknown id', () => {
  const fallback = findIndustryById('unknown_invalid_slug');
  assert.ok(fallback !== null);
  assert.equal(fallback.id, 'factory');
});

test('Database Persistence - Organization updates industry setting cleanly', async () => {
  const tenant = await db.createTenant('Test Industry Enterprise');
  assert.equal(tenant.industry, 'technology');

  // Update to mall
  const updatedMall = await db.updateTenantIndustry(tenant.id, 'mall');
  assert.equal(updatedMall?.industry, 'mall');

  // Verify fetch returns updated industry
  const fetched = await db.getTenant(tenant.id);
  assert.equal(fetched?.industry, 'mall');

  // Switch to hospital
  const updatedHospital = await db.updateTenantIndustry(tenant.id, 'hospital');
  assert.equal(updatedHospital?.industry, 'hospital');
});
