import { describe, it, expect } from 'vitest';
import { Season } from '../types';

describe('Season enum', () => {
  it('has 4 seasons', () => {
    expect(Object.keys(Season)).toHaveLength(4);
  });

  it('has correct values', () => {
    expect(Season.SPRING).toBe('SPRING');
    expect(Season.SUMMER).toBe('SUMMER');
    expect(Season.AUTUMN).toBe('AUTUMN');
    expect(Season.WINTER).toBe('WINTER');
  });
});
