import { describe, it, expect } from 'vitest';
import { seededRandom } from '../utils/seededRandom';

describe('seededRandom', () => {
  it('returns values between 0 and 1', () => {
    const rng = seededRandom(12345);
    for (let i = 0; i < 100; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(1);
    }
  });

  it('is deterministic — same seed produces same sequence', () => {
    const rng1 = seededRandom(42);
    const rng2 = seededRandom(42);
    for (let i = 0; i < 50; i++) {
      expect(rng1()).toBe(rng2());
    }
  });

  it('different seeds produce different sequences', () => {
    const rng1 = seededRandom(1);
    const rng2 = seededRandom(2);
    const seq1 = Array.from({ length: 10 }, () => rng1());
    const seq2 = Array.from({ length: 10 }, () => rng2());
    // At least one value should differ
    const allSame = seq1.every((v, i) => v === seq2[i]);
    expect(allSame).toBe(false);
  });
});
