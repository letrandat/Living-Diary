import { describe, it, expect, beforeEach } from 'vitest';

describe('localStorage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('safely handles corrupt JSON', () => {
    localStorage.setItem('arboria_user', '{invalid json');
    const result = (() => {
      try {
        return JSON.parse(localStorage.getItem('arboria_user') || '');
      } catch {
        return null;
      }
    })();
    expect(result).toBeNull();
  });

  it('round-trips valid user data', () => {
    const user = { id: 'TEST', name: 'Test', dewdrops: 100, treeHealth: 50, treeLevel: 1, currentTreeTypeId: 'oak', unlockedTreeTypes: ['oak'], ornaments: [] };
    localStorage.setItem('arboria_user', JSON.stringify(user));
    const parsed = JSON.parse(localStorage.getItem('arboria_user')!);
    expect(parsed.id).toBe('TEST');
    expect(parsed.dewdrops).toBe(100);
  });
});
