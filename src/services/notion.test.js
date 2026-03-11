import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getProjectsFromNotion } from './notion'

describe('getProjectsFromNotion service', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('handles fetch error', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 })
    const result = await getProjectsFromNotion()
    expect(result).toEqual([])
  })

  it('parses notion response correctly', async () => {
    const mockNotionResponse = [
      {
        id: '123',
        properties: {
          Slug: { rich_text: [{ plain_text: 'my-project' }] },
          Title: { title: [{ plain_text: 'My Project' }] },
          TechStack: { multi_select: [{ name: 'React' }, { name: 'Vite' }] },
          HeroImage: { files: [{ type: 'external', external: { url: 'http://img.com/a.png' } }] }
        }
      }
    ]

    // Fetch call 1: API
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockNotionResponse
    })

    // Fetch call 2: manifest.json (fallback)
    global.fetch.mockResolvedValueOnce({
      ok: false
    })

    const result = await getProjectsFromNotion()
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('my-project')
    expect(result[0].title.pt).toBe('My Project')
    expect(result[0].tech).toEqual(['React', 'Vite'])
    expect(result[0].images).toEqual(['http://img.com/a.png'])
  })

  it('uses local cache manifest if available', async () => {
    const mockNotionResponse = [
      {
        id: '123',
        properties: {
          Slug: { rich_text: [{ plain_text: 'my-project' }] },
          Title: { title: [{ plain_text: 'My Project' }] }
        }
      }
    ]

    const mockManifest = {
      projects: {
        'my-project': {
          images: ['local.webp']
        }
      }
    }

    // Fetch call 1: API
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockNotionResponse
    })

    // Fetch call 2: manifest.json
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockManifest
    })

    const result = await getProjectsFromNotion()
    expect(result[0].images).toEqual(['/images/projects/my-project/local.webp'])
  })
})
