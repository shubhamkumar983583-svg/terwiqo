import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCosineSimilarity, verifyBiometricProbe } from './biometrics.ts';

test('Biometric Vector - Identical vectors produce similarity of 1.0', () => {
  const v1 = [0.15, 0.42, -0.88, 0.23, 0.05];
  const score = calculateCosineSimilarity(v1, v1);
  assert.equal(score, 1.0);
});

test('Biometric Vector - Orthogonal vectors produce similarity of 0.0', () => {
  const v1 = [1, 0, 0];
  const v2 = [0, 1, 0];
  const score = calculateCosineSimilarity(v1, v2);
  assert.equal(score, 0.0);
});

test('Biometric Vector - Helen Vasilovsky probe matches enrolled template (>0.88)', () => {
  const template = [0.24, 0.51, 0.82, -0.15, 0.33, 0.09, -0.42, 0.65];
  // Probe with slight sensor noise
  const probe    = [0.25, 0.50, 0.81, -0.14, 0.34, 0.08, -0.41, 0.64];

  const result = verifyBiometricProbe(probe, template, 0.88);
  assert.equal(result.isMatch, true);
  assert.equal(result.similarityScore >= 0.98, true);
  assert.equal(result.confidencePercentage >= 98.0, true);
});

test('Biometric Vector - Unmatched impostor probe is rejected (<0.88)', () => {
  const template = [0.8, 0.2, 0.1, -0.5, 0.3];
  const impostor = [-0.7, 0.1, 0.4, 0.6, -0.2];

  const result = verifyBiometricProbe(impostor, template, 0.88);
  assert.equal(result.isMatch, false);
});
