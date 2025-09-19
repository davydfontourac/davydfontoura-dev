import { useTheme } from '../hooks/useTheme'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  const handleClick = () => {
    console.log('Current theme:', theme)
    toggleTheme()
    console.log('Theme after toggle:', theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={handleClick}
      className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
      aria-label="Toggle theme"
    >
      {/* Animação circle blur */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400 dark:from-blue-600 dark:to-purple-600 rounded-full transition-all duration-500 ease-in-out ${
          theme === 'dark' 
            ? 'scale-100 opacity-100' 
            : 'scale-0 opacity-0'
        }`}
        style={{
          transformOrigin: 'top right',
          filter: theme === 'dark' ? 'blur(0px)' : 'blur(20px)'
        }}
      />
      
      {/* Ícones */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
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