/**
 * Geofencing & Haversine Distance Engine
 */

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface GeofenceCheckResult {
  isWithinBounds: boolean;
  distanceMeters: number;
  thresholdRadiusMeters: number;
  effectiveMarginMeters: number;
}

const EARTH_RADIUS_METERS = 6371000;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Calculates geodesic distance between two latitude/longitude points in meters using Haversine formula.
 */
export function calculateHaversineDistance(pointA: GeoCoordinate, pointB: GeoCoordinate): number {
  if (pointA.latitude === pointB.latitude && pointA.longitude === pointB.longitude) {
    return 0;
  }

  const phi1 = toRadians(pointA.latitude);
  const phi2 = toRadians(pointB.latitude);
  const deltaPhi = toRadians(pointB.latitude - pointA.latitude);
  const deltaLambda = toRadians(pointB.longitude - pointA.longitude);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(EARTH_RADIUS_METERS * c * 10) / 10;
}

/**
 * Validates whether a device's current GPS location falls within an allowed branch geofence radius.
 */
export function isWithinGeofence(
  deviceLocation: GeoCoordinate,
  branchLocation: GeoCoordinate,
  radiusMeters: number,
  accuracyMarginMeters: number = 20
): GeofenceCheckResult {
  const distanceMeters = calculateHaversineDistance(deviceLocation, branchLocation);
  const allowedLimit = radiusMeters + accuracyMarginMeters;
  const isWithinBounds = distanceMeters <= allowedLimit;

  return {
    isWithinBounds,
    distanceMeters,
    thresholdRadiusMeters: radiusMeters,
    effectiveMarginMeters: accuracyMarginMeters
  };
}
