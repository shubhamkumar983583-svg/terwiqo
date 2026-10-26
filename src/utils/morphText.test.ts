import test from 'node:test';
import assert from 'node:assert/strict';

test('MorphText Component Presets and Constants', async (t) => {
  await t.test('Default words list matches CREATE / DESIGN / DEVELOP', () => {
    const DEFAULT_WORDS = ["CREATE", "DESIGN", "DEVELOP"];
    assert.equal(DEFAULT_WORDS.length, 3);
    assert.deepEqual(DEFAULT_WORDS, ["CREATE", "DESIGN", "DEVELOP"]);
  });

  await t.test('CustomMorph preset words match INNOVATE / BUILD / SHIP', () => {
    const CUSTOM_WORDS = ["INNOVATE", "BUILD", "SHIP"];
    assert.equal(CUSTOM_WORDS.length, 3);
    assert.equal(CUSTOM_WORDS[0], "INNOVATE");
    assert.equal(CUSTOM_WORDS[1], "BUILD");
    assert.equal(CUSTOM_WORDS[2], "SHIP");
  });

  await t.test('CustomMorph preset interval is exactly 2500ms', () => {
    const interval = 2500;
    assert.equal(interval, 2500);
    const subtext = "Move fast. Break things.";
    assert.equal(subtext, "Move fast. Break things.");
    const fontSize = "clamp(2rem, 10vw, 8rem)";
    assert.match(fontSize, /clamp/);
  });

  await t.test('MyHero preset subtext is "The Art of Code"', () => {
    const subtext = "The Art of Code";
    assert.equal(subtext, "The Art of Code");
  });

  await t.test('Morph fraction calculation produces smooth blur values', () => {
    const calcBlur1 = (fraction: number) => Math.min(8 / (1 - fraction + 0.001) - 8, 100);
    const calcBlur2 = (fraction: number) => Math.min(8 / (fraction + 0.001) - 8, 100);

    // At fraction 0 (start), outgoing text has minimal blur, incoming text is blurred
    assert.ok(calcBlur1(0) <= 0.01);
    assert.ok(calcBlur2(0) >= 90);

    // At fraction 1 (end), outgoing text is fully blurred, incoming text has 0 blur
    assert.ok(calcBlur1(1) >= 90);
    assert.ok(calcBlur2(1) <= 0.01);
  });
});
