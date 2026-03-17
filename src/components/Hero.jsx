import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import { Github, Linkedin, Download } from 'lucide-react'
import ParticlesBackground from './ParticlesBackground'
import BlurText from './BlurText'

const Hero = ({ navigateToSection }) => {
  const { theme } = useContext(ThemeContext)
  const { t } = useTranslation()
  
  return (
    <section 
      id="home" 
      className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 w-full transition-colors duration-300 relative overflow-hidden"
    >
      {/* Partículas apenas no modo claro */}
      <ParticlesBackground isDarkMode={theme === 'dark'} />
      
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300 flex flex-wrap justify-center">
            <BlurText
              text={t('hero.greeting')}
              delay={100}
              animateBy="words"
              direction="top"
              className="inline-block"
            />
            <BlurText
              text=" Davyd Fontoura"
              delay={150}
              animateBy="words"
              direction="top"
              className="inline-block"
              itemClassName="shine-text"
            />
          </h1>
          <BlurText
            text={t('hero.description')}
            delay={50}
            animateBy="words"
            direction="bottom"
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:flex-wrap mb-8">
            <a 
              href={t('hero.cv_file')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              <Download size={20} />
              {t('hero.cta_cv')}
            </a>
            <button 
              onClick={() => navigateToSection('portfolio')}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {t('hero.cta_projects')}
            </button>
            <button 
              onClick={() => navigateToSection('contact')}
              className="hidden sm:block border-2 border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {t('hero.cta_contact')}
            </button>
          </div>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/davydfontourac" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all shadow-sm" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/davyd-camargo-70a552261/" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all shadow-sm" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero