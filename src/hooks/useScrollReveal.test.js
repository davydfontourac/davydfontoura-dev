import { renderHook } from '@testing-library/react';
import { useScrollReveal } from './useScrollReveal';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useScrollReveal', () => {
  beforeEach(() => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation(function() {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
    });
  });

  it('should initially be not visible', () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.isVisible).toBe(false);
  });

  it('should be visible if prefers-reduced-motion is true', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
    }));
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.isVisible).toBe(true);
  });

  it('should be visible if IntersectionObserver is not supported', () => {
    const originalIntersectionObserver = global.IntersectionObserver;
    delete global.IntersectionObserver;
    
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.isVisible).toBe(true);
    
    global.IntersectionObserver = originalIntersectionObserver;
  });
});
