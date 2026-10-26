/**
 * Biometric Vector Normalization and Cosine Similarity Engine
 * Compares 512-dimension facial feature embeddings extracted by CCTV edge cameras
 */

/**
 * Calculates the cosine similarity between two normalized floating-point vectors.
 * Returns a value between -1.0 and 1.0.
 */
export function calculateCosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length || vectorA.length === 0) {
    throw new Error('Vector dimensions must match and cannot be empty.');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    const a = vectorA[i];
    const b = vectorB[i];
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return Math.round((dotProduct / denominator) * 10000) / 10000;
}

export interface BiometricMatchResult {
  isMatch: boolean;
  similarityScore: number;
  confidencePercentage: number;
  thresholdUsed: number;
}

/**
 * Validates a CCTV biometric probe against an enrolled template using an enterprise threshold (default 0.88).
 */
export function verifyBiometricProbe(
  probeVector: number[],
  enrolledTemplate: number[],
  threshold: number = 0.88
): BiometricMatchResult {
  const similarityScore = calculateCosineSimilarity(probeVector, enrolledTemplate);
  const isMatch = similarityScore >= threshold;
  // Convert similarity 0.88 - 1.0 into 90.0% - 100.0% confidence display
  const normalizedConfidence = Math.max(0, Math.min(100, Math.round(similarityScore * 1000) / 10));

  return {
    isMatch,
    similarityScore,
    confidencePercentage: normalizedConfidence,
    thresholdUsed: threshold
  };
}
