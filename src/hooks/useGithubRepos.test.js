import { renderHook, waitFor } from '@testing-library/react'
import { useGithubRepos } from './useGithubRepos'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('useGithubRepos hook', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('initially sets loading to true and repos to empty array', async () => {
    global.fetch.mockImplementation(() => new Promise(() => {}))
    const { result } = renderHook(() => useGithubRepos('testuser'))
    
    expect(result.current.loading).toBe(true)
    expect(result.current.repos).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('fetches and filters out forked repos', async () => {
    const mockData = [
      { id: 1, name: 'repo-1', fork: false },
      { id: 2, name: 'repo-2-fork', fork: true },
    ]

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    const { result } = renderHook(() => useGithubRepos('testuser'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/users/testuser/repos?sort=updated&per_page=6')
    expect(result.current.repos).toEqual([{ id: 1, name: 'repo-1', fork: false }])
    expect(result.current.error).toBeNull()
  })

  it('handles fetch error', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false
    })

    const { result } = renderHook(() => useGithubRepos('testuser'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Falha ao buscar repositórios')
    expect(result.current.repos).toEqual([])
  })

  it('handles network error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useGithubRepos('testuser'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Network error')
  })

  it('does not fetch if username is empty', () => {
    renderHook(() => useGithubRepos(''))
    expect(global.fetch).not.toHaveBeenCalled()
  })
})
