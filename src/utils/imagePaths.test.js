import { describe, it, expect, beforeEach } from 'vitest'
import { getImagePath, getBaseUrl } from './imagePaths'

describe('imagePaths util', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'localhost',
        protocol: 'http:',
        host: 'localhost:3000'
      },
      writable: true
    })
  })

  describe('getImagePath', () => {
    it('returns empty string if path is falsy', () => {
      expect(getImagePath(null)).toBe('')
      expect(getImagePath('')).toBe('')
    })

    it('returns path directly if it starts with http, https or data', () => {
      expect(getImagePath('http://example.com/image.png')).toBe('http://example.com/image.png')
      expect(getImagePath('https://example.com/image.png')).toBe('https://example.com/image.png')
      expect(getImagePath('data:image/png;base64,iVBORw0KGgo')).toBe('data:image/png;base64,iVBORw0KGgo')
    })

    it('returns formatted path for local environment', () => {
      expect(getImagePath('projects/img.png')).toBe('/projects/img.png')
      expect(getImagePath('/davydfontoura-dev/projects/img.png')).toBe('/projects/img.png')
    })
    
    it('returns formatted path for vercel environment', () => {
      window.location.hostname = 'test.vercel.app'
      expect(getImagePath('projects/img.png')).toBe('/projects/img.png')
    })

    it('returns formatted path for github pages environment', () => {
      window.location.hostname = 'test.github.io'
      expect(getImagePath('projects/img.png')).toBe('/davydfontoura-dev/projects/img.png')
    })
  })

  describe('getBaseUrl', () => {
    it('returns local environment host', () => {
      expect(getBaseUrl()).toBe('http://localhost:3000')
    })

    it('returns vercel environment host', () => {
      window.location.hostname = 'test.vercel.app'
      expect(getBaseUrl()).toBe('https://test.vercel.app')
    })

    it('returns github pages environment host', () => {
      window.location.hostname = 'test.github.io'
      expect(getBaseUrl()).toBe('https://davydfontourac.github.io/davydfontoura-dev')
    })
  })
})
