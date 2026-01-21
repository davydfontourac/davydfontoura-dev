import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import ParticlesBackground from './ParticlesBackground'

const Hero = ({ navigateToSection }) => {
  const { theme } = useContext(ThemeContext)
  
  return (
    <section id="home" className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 w-full transition-colors duration-300 relative overflow-hidden">
      {/* Partículas apenas no modo claro */}
      <ParticlesBackground isDarkMode={theme === 'dark'} />
      
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Olá, eu sou
            <span className="shine-text"> Davyd Fontoura</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
            Desenvolvedor Front-End apaixonado por criar experiências digitais modernas e funcionais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateToSection('portfolio')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Portfólio
            </button>
            <button 
              onClick={() => navigateToSection('contact')}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Entre em Contato
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero