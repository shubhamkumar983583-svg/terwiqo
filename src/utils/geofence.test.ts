import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateHaversineDistance, isWithinGeofence } from './geofence.ts';

test('Haversine distance - identical points return 0 meters', () => {
  const coord = { latitude: 48.137154, longitude: 11.576124 };
  const distance = calculateHaversineDistance(coord, coord);
  assert.equal(distance, 0);
});

test('Haversine distance - Munich Marienplatz to Munich Airport (~28.5km)', () => {
  const marienplatz = { latitude: 48.137154, longitude: 11.576124 };
  const airport = { latitude: 48.353662, longitude: 11.775028 };
  const distance = calculateHaversineDistance(marienplatz, airport);

  // Expected distance ~28,500m (allow +/- 500m)
  assert.equal(distance > 28000, true);
  assert.equal(distance < 29000, true);
});

test('isWithinGeofence - In-bounds employee clock-in accepted', () => {
  const branchHQ = { latitude: 48.137154, longitude: 11.576124 };
  // 50 meters away
  const employeePhone = { latitude: 48.1375, longitude: 11.5763 };
  
  const result = isWithinGeofence(employeePhone, branchHQ, 150, 20);
  assert.equal(result.isWithinBounds, true);
  assert.equal(result.distanceMeters < 100, true);
});

test('isWithinGeofence - Out-of-bounds clock-in rejected', () => {
  const branchHQ = { latitude: 48.137154, longitude: 11.576124 };
  // Remote user 10km away
  const remoteUser = { latitude: 48.20, longitude: 11.60 };

  const result = isWithinGeofence(remoteUser, branchHQ, 150, 20);
  assert.equal(result.isWithinBounds, false);
  assert.equal(result.distanceMeters > 5000, true);
});
