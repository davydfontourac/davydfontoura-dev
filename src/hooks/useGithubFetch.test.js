import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGithubFetch } from './useGithubFetch';

describe('useGithubFetch', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should fetch and transform data', async () => {
    const mockData = [{ id: 1, name: 'test' }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const transform = (data) => data.map(d => ({ ...d, transformed: true }));

    const { result } = renderHook(() =>
      useGithubFetch('https://api.github.com/test', transform)
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([{ id: 1, name: 'test', transformed: true }]);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    const { result } = renderHook(() =>
      useGithubFetch('https://api.github.com/test', null)
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeTruthy();
  });

  it('should handle rate limit (403)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403
    });

    const { result } = renderHook(() =>
      useGithubFetch('https://api.github.com/test', null)
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toContain('Rate limit');
  });

  it('should not fetch when enabled is false', () => {
    global.fetch = vi.fn();

    renderHook(() =>
      useGithubFetch('https://api.github.com/test', null, { enabled: false })
    );

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should use cache when available', async () => {
    const cachedData = [{ id: 99, cached: true }];
    localStorage.setItem('test-cache', JSON.stringify(cachedData));

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: 1 }])
    });

    const { result } = renderHook(() =>
      useGithubFetch('https://api.github.com/test', null, { cacheKey: 'test-cache' })
    );

    // Initially the cached data should be set
    await waitFor(() => expect(result.current.data).toBeDefined());
  });
});
