import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPunchLocations,
  calculateGeofenceSummary,
  generateSimulatedPunch,
  INITIAL_PUNCH_LOCATIONS,
  DEFAULT_PERIMETERS,
  DEFAULT_CAMPUS_CENTER
} from './geofenceMapUtils.ts';

describe('Geofence Map Pure Utils Test Suite', () => {
  it('filterPunchLocations - Returns all when filter is all', () => {
    const all = filterPunchLocations(INITIAL_PUNCH_LOCATIONS, 'all');
    assert.strictEqual(all.length, INITIAL_PUNCH_LOCATIONS.length);
  });

  it('filterPunchLocations - Filters verified vs violations correctly', () => {
    const verified = filterPunchLocations(INITIAL_PUNCH_LOCATIONS, 'verified_inside');
    assert.ok(verified.length > 0);
    assert.ok(verified.every((p) => p.status === 'verified_inside'));

    const violations = filterPunchLocations(INITIAL_PUNCH_LOCATIONS, 'violation_outside');
    assert.ok(violations.length > 0);
    assert.ok(violations.every((p) => p.status === 'violation_outside'));
  });

  it('calculateGeofenceSummary - Accurately computes totals and compliance percentage', () => {
    const summary = calculateGeofenceSummary(INITIAL_PUNCH_LOCATIONS, DEFAULT_PERIMETERS);
    assert.strictEqual(summary.totalPunches, 5);
    assert.strictEqual(summary.inBoundsCount, 4);
    assert.strictEqual(summary.outOfBoundsCount, 1);
    assert.strictEqual(summary.complianceRate, 80);
    assert.strictEqual(summary.activePerimetersCount, 3);
  });

  it('generateSimulatedPunch - Correctly flags within bounds vs outside bounds', () => {
    const insidePunch = generateSimulatedPunch(DEFAULT_CAMPUS_CENTER, false);
    assert.ok(insidePunch.distanceFromCenterMeters <= 250);
    assert.strictEqual(insidePunch.status, 'verified_inside');

    const outsidePunch = generateSimulatedPunch(DEFAULT_CAMPUS_CENTER, true);
    assert.ok(outsidePunch.distanceFromCenterMeters > 250);
    assert.strictEqual(outsidePunch.status, 'violation_outside');
  });
});
