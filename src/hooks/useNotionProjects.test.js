import { renderHook, waitFor } from '@testing-library/react'
import { useNotionProjects } from './useNotionProjects'
import * as notionService from '../services/notion'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

vi.mock('../services/notion', () => ({
  getProjectsFromNotion: vi.fn()
}))

describe('useNotionProjects hook', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches projects and updates state', async () => {
    const mockProjects = [
      { id: '1', slug: 'p1' },
      { id: '2', slug: 'p2' }
    ]
    notionService.getProjectsFromNotion.mockResolvedValueOnce(mockProjects)

    const { result } = renderHook(() => useNotionProjects())

    expect(result.current.loading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.projects).toEqual(mockProjects)
    expect(result.current.error).toBeNull()

    // Assert cache was saved
    expect(localStorage.getItem('notion_projects_cache')).toBe(JSON.stringify(mockProjects))
    expect(localStorage.getItem('notion_projects_cache_timestamp')).toBeTruthy()
  })

  it('loads from cache initially if valid', async () => {
    const mockProjects = [{ id: '1', slug: 'cached' }]
    localStorage.setItem('notion_projects_cache', JSON.stringify(mockProjects))
    localStorage.setItem('notion_projects_cache_timestamp', Date.now().toString())

    // It will still fetch in background
    notionService.getProjectsFromNotion.mockResolvedValueOnce([])

    const { result } = renderHook(() => useNotionProjects())

    // loading is false initially because cache has items
    expect(result.current.loading).toBe(false)
    expect(result.current.projects).toEqual(mockProjects)
  })

  it('provides helper functions correctly', async () => {
    const mockProjects = [
      { id: '1', slug: 'p1' },
      { id: '2', slug: 'p2' },
      { id: '3', slug: 'p3' }
    ]
    notionService.getProjectsFromNotion.mockResolvedValueOnce(mockProjects)

    const { result } = renderHook(() => useNotionProjects())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.getProjectBySlug('p2')).toEqual({ id: '2', slug: 'p2' })
    expect(result.current.getProjectById('1')).toEqual({ id: '1', slug: 'p1' })
    expect(result.current.getRelatedProjects('1', 1)).toEqual([{ id: '2', slug: 'p2' }])
  })

  it('sets error on fetch failure if cache is empty', async () => {
    notionService.getProjectsFromNotion.mockRejectedValueOnce(new Error('Fetch failed'))

    const { result } = renderHook(() => useNotionProjects())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Fetch failed')
    expect(result.current.projects).toEqual([])
  })
})
