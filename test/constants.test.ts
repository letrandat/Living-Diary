import { describe, it, expect } from 'vitest';
import { getSeason, SEASON_COLORS } from '../constants';
import { Season } from '../types';

describe('getSeason', () => {
  it('returns a valid Season enum value', () => {
    const season = getSeason();
    expect(Object.values(Season)).toContain(season);
  });
});

describe('SEASON_COLORS', () => {
  it('has dark and light colors for all seasons', () => {
    for (const season of Object.values(Season)) {
      expect(SEASON_COLORS[season]).toBeDefined();
      for (const mode of ['dark', 'light'] as const) {
        expect(SEASON_COLORS[season][mode].leaves).toBeDefined();
        expect(SEASON_COLORS[season][mode].sky).toBeDefined();
        expect(SEASON_COLORS[season][mode].accent).toBeDefined();
      }
    }
  });
});
