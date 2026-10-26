import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePriceRoll,
  getNextRotatedWord,
  shuffleReviewDeck,
  getProcessDrawSteps,
  getUsVsThemMatrix,
  getBeforeAfterMetrics,
  REVIEW_CARDS,
  ROTATING_WORDS
} from './concepts12.ts';

describe('12 Concepts Pure Utilities Test Suite', () => {
  it('02 Word Rotator - Advances through list cyclically', () => {
    const step0 = getNextRotatedWord(0, ROTATING_WORDS);
    assert.strictEqual(step0.nextIndex, 1);
    assert.strictEqual(step0.word, ROTATING_WORDS[1]);

    const stepLast = getNextRotatedWord(ROTATING_WORDS.length - 1, ROTATING_WORDS);
    assert.strictEqual(stepLast.nextIndex, 0);
    assert.strictEqual(stepLast.word, ROTATING_WORDS[0]);
  });

  it('10 Price Roll - Computes monthly subtotal and annual 20% discount correctly', () => {
    // 100 seats at $5.0 = $500, 4 cameras at $29 = $116 => $616 / mo
    const monthlyResult = calculatePriceRoll(100, 4, false);
    assert.strictEqual(monthlyResult.seats, 100);
    assert.strictEqual(monthlyResult.cameras, 4);
    assert.strictEqual(monthlyResult.isAnnual, false);
    assert.strictEqual(monthlyResult.monthlySubtotal, 536); // 100 * 4.2 ($420) + 4 * 29 ($116) = $536
    assert.strictEqual(monthlyResult.effectiveMonthly, 536);
    assert.strictEqual(monthlyResult.discountSaved, 0);
    assert.strictEqual(monthlyResult.tierName, 'Business Pro');

    // Annual plan with 20% discount
    const annualResult = calculatePriceRoll(100, 4, true);
    assert.strictEqual(annualResult.isAnnual, true);
    // 536 * 0.8 = 428.8 => rounded to 429
    assert.strictEqual(annualResult.effectiveMonthly, 429);
    assert.strictEqual(annualResult.annualTotal, 429 * 12);
    assert.ok(annualResult.discountSaved > 1000);
  });

  it('10 Price Roll - Scales tier name to Enterprise Scale for large fleets', () => {
    const enterprise = calculatePriceRoll(600, 20, false);
    assert.strictEqual(enterprise.tierName, 'Enterprise Scale');
    assert.strictEqual(enterprise.seatRate, 3.5);
  });

  it('04 Review Shuffle - Rotates deck without losing items', () => {
    const initial = [...REVIEW_CARDS];
    const shuffled = shuffleReviewDeck(initial);
    assert.strictEqual(shuffled.length, initial.length);
    assert.strictEqual(shuffled[0].id, initial[1].id);
    assert.strictEqual(shuffled[shuffled.length - 1].id, initial[0].id);
  });

  it('08 Process Draw - Returns 4 sequential pipeline steps ending at 100%', () => {
    const steps = getProcessDrawSteps();
    assert.strictEqual(steps.length, 4);
    assert.strictEqual(steps[0].step, 1);
    assert.strictEqual(steps[3].step, 4);
    assert.strictEqual(steps[3].pathPercentage, 100);
  });

  it('11 Us vs Them - Returns verified matrix with 6 enterprise comparison points', () => {
    const matrix = getUsVsThemMatrix();
    assert.strictEqual(matrix.length, 6);
    const speed = matrix.find((m) => m.dimension.includes('Speed'));
    assert.ok(speed);
    assert.ok(typeof speed?.workpulse === 'string' && speed.workpulse.includes('14ms'));
  });

  it('09 Before / After - Accurately models measurable operational metrics', () => {
    const metrics = getBeforeAfterMetrics();
    assert.strictEqual(metrics.length, 4);
    const queue = metrics.find((m) => m.metric.includes('Shift Gate Clearance'));
    assert.ok(queue);
    assert.strictEqual(queue?.before.value, '45 mins');
    assert.strictEqual(queue?.after.value, '3.2 mins');
  });
});
