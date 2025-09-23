import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const Navbar = ({ activeSection, navigateToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Fechar menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (sectionId) => {
    navigateToSection(sectionId)
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'services', label: 'Serviços' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'contact', label: 'Contato' }
  ]

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm dark:shadow-gray-800/50 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Seja Bem-Vindo(a)</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-300"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
              >
                <svg
                  className={`h-6 w-6 transform transition-transform ${isMenuOpen ? 'rotate-90' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Sidebar */}
        <div className={`fixed inset-y-0 right-0 z-[60] w-80 bg-white dark:bg-gray-900 shadow-2xl dark:shadow-gray-800/50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden border-l border-gray-200 dark:border-gray-700`}>
          
          {/* Header do Menu */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Menu</span>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Fechar menu"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Links de Navegação */}
          <div className="px-4 pt-6 pb-4 bg-gray-50 dark:bg-gray-800">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-white bg-blue-600 shadow-lg transform scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:transform hover:scale-105'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Separador */}
            <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div>
            
            {/* Theme Toggle Section */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900 dark:text-white">Tema</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Alternar modo escuro</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/90 z-[55] md:hidden transition-all duration-300"
            onClick={toggleMenu}
          ></div>
        )}
      </nav>
    </>
  )
}

export default Navbar