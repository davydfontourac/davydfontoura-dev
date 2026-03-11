import { renderHook, act } from '@testing-library/react'
import { ThemeProvider } from '../contexts/ThemeContext'
import { useTheme } from './useTheme'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('useTheme hook', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
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
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('throws error when used outside ThemeProvider', () => {
    const originalError = console.error
    console.error = vi.fn()
    try {
      expect(() => renderHook(() => useTheme())).toThrow('useTheme must be used within a ThemeProvider')
    } finally {
      console.error = originalError
    }
  })

  it('returns default theme when used within ThemeProvider', () => {
    const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('light')
  })

  it('toggles theme correctly', () => {
    const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>
    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
