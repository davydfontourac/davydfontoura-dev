import { describe, it, expect } from 'vitest'
import { projects, getProjectBySlug } from './projects'

describe('projects data', () => {
  it('keeps dark mode friendly list styles in project descriptions', () => {
    const targetSlugs = ['klin-ecommerce', 'capodarte-moda', 'portal-de-noticias', 'confeitaria-app']

    targetSlugs.forEach((slug) => {
      const project = getProjectBySlug(slug)
      expect(project).toBeDefined()
      expect(project.fullDescription).not.toContain('color: black;')
      expect(project.fullDescription).toContain('list-style-type: disc; padding-left: 1.5em;')
    })
  })

  it('exports a non-empty projects list', () => {
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })
})
