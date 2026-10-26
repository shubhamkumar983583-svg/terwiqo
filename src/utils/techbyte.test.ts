import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjectsByCategory,
  searchProjects,
  formatMetricCount,
  TECHBYTE_PROJECTS
} from './techbyte.ts';

test('filterProjectsByCategory - "all" returns complete project catalog', () => {
  const result = filterProjectsByCategory(TECHBYTE_PROJECTS, 'all');
  assert.equal(result.length, TECHBYTE_PROJECTS.length);
});

test('filterProjectsByCategory - filters manufacturing projects specifically', () => {
  const result = filterProjectsByCategory(TECHBYTE_PROJECTS, 'manufacturing');
  assert.equal(result.length > 0, true);
  for (const item of result) {
    assert.equal(item.category, 'manufacturing');
  }
});

test('filterProjectsByCategory - filters healthcare projects specifically', () => {
  const result = filterProjectsByCategory(TECHBYTE_PROJECTS, 'healthcare');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'proj-02');
  assert.equal(result[0].client, 'St. Jude Metropolitan Hospital');
});

test('searchProjects - matches title and tag queries', () => {
  const tagResult = searchProjects(TECHBYTE_PROJECTS, 'RTSP');
  assert.equal(tagResult.length > 0, true);
  assert.equal(tagResult.some((p) => p.tags.includes('RTSP Streams')), true);

  const clientResult = searchProjects(TECHBYTE_PROJECTS, 'OmniCorp');
  assert.equal(clientResult.length, 1);
  assert.equal(clientResult[0].id, 'proj-04');
});

test('formatMetricCount - accurately formats thousands and millions', () => {
  assert.equal(formatMetricCount(500), '500');
  assert.equal(formatMetricCount(1500), '2K+');
  assert.equal(formatMetricCount(10000), '10K+');
  assert.equal(formatMetricCount(2500000), '2.5M+');
});

test('Workforce Value Proposition - Verifies user headline and bilingual copy', () => {
  const headline = 'Your Workforce. One Smarter System.';
  const hindiSubhead = 'Attendance से HR management तक—सब कुछ एक जगह।';
  const bodyCopy =
    'Manage employee records, shifts, leave, digital IDs and attendance workflows with a single workforce platform. Add geofencing and compatible CCTV verification where your business needs them.';
  const trustBadges =
    '14-Day Free Trial · Transparent Pricing · No Hardware Replacement Promise';
  const reassurance =
    'See how it works with your team before choosing a paid plan.';

  assert.equal(headline, 'Your Workforce. One Smarter System.');
  assert.match(hindiSubhead, /Attendance.*HR management.*सब कुछ एक जगह/);
  assert.match(bodyCopy, /geofencing and compatible CCTV verification/);
  assert.match(trustBadges, /14-Day Free Trial/);
  assert.match(trustBadges, /Transparent Pricing/);
  assert.match(trustBadges, /No Hardware Replacement Promise/);
  assert.match(reassurance, /See how it works with your team/);
});
