import { useTheme } from '../hooks/useTheme'
import { Sun, Moon } from 'lucide-react'
import { useCallback } from 'react'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  const handleClick = useCallback(() => {
    console.log('Current theme:', theme)
    
    // Inject circle-blur animation styles
    const styleId = `theme-transition-${Date.now()}`
    const style = document.createElement('style')
    style.id = styleId
    
    // Circle blur animation CSS - diagonal from top-right
    const css = `
      @supports (view-transition-name: root) {
        ::view-transition-old(root) { 
          animation: none;
        }
        ::view-transition-new(root) {
          animation: circle-blur-expand 0.6s ease-out;
          transform-origin: top right;
          filter: blur(0);
        }
        @keyframes circle-blur-expand {
          from {
            clip-path: circle(0% at 85% 15%);
            filter: blur(6px);
          }
          to {
            clip-path: circle(150% at 85% 15%);
            filter: blur(0);
          }
        }
      }
    `
    
    style.textContent = css
    document.head.appendChild(style)
    
    // Clean up animation styles after transition
    setTimeout(() => {
      const styleEl = document.getElementById(styleId)
      if (styleEl) {
        styleEl.remove()
      }
    }, 3000)
    
    // Execute theme change with View Transition API if available
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        toggleTheme()
      })
    } else {
      // Fallback for browsers without View Transitions
      toggleTheme()
    }
    
    console.log('Theme after toggle:', theme === 'light' ? 'dark' : 'light')
  }, [theme, toggleTheme])

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
      aria-label="Toggle theme"
    >
      {/* Ícones */}
      <div className="relative flex items-center justify-center w-5 h-5">
        <Sun 
          className={`absolute w-5 h-5 text-yellow-600 transition-all duration-300 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-75'
          }`}
        />
        <Moon 
          className={`absolute w-5 h-5 text-blue-200 transition-all duration-300 ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-75'
          }`}
        />
      </div>
    </button>
  )
}

export default ThemeToggle