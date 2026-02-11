import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Season } from '../types';
import { getSeason } from '../constants';

describe('getSeason', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns SPRING for March (month 2)', () => {
    vi.setSystemTime(new Date(2025, 2, 15));
    expect(getSeason()).toBe(Season.SPRING);
  });

  it('returns SUMMER for July (month 6)', () => {
    vi.setSystemTime(new Date(2025, 6, 15));
    expect(getSeason()).toBe(Season.SUMMER);
  });

  it('returns AUTUMN for October (month 9)', () => {
    vi.setSystemTime(new Date(2025, 9, 15));
    expect(getSeason()).toBe(Season.AUTUMN);
  });

  it('returns WINTER for January (month 0)', () => {
    vi.setSystemTime(new Date(2025, 0, 15));
    expect(getSeason()).toBe(Season.WINTER);
  });

  it('returns WINTER for December (month 11)', () => {
    vi.setSystemTime(new Date(2025, 11, 15));
    expect(getSeason()).toBe(Season.WINTER);
  });
});
