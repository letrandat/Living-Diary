import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 42));
    expect(result.current[0]).toBe(42);
  });

  it('returns stored value when localStorage has valid data', () => {
    localStorage.setItem('test-key', JSON.stringify('hello'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('hello');
  });

  it('falls back to default on corrupt JSON', () => {
    localStorage.setItem('test-key', '{not valid json!!!');
    const { result } = renderHook(() => useLocalStorage('test-key', 99));
    expect(result.current[0]).toBe(99);
  });

  it('persists value to localStorage on update', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current[1](5);
    });

    expect(result.current[0]).toBe(5);
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe(5);
  });

  it('handles functional updater: setValue(prev => prev + 1)', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 10));

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(11);
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe(11);
  });
});
