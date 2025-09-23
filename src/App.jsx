import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './contexts/ThemeContext'

// Importando todos os componentes de forma centralizada
import {
  Navbar,
  Hero,
  About,
  Services,
  Portfolio,
  Contact,
  Footer,
  ProjectDetail
} from './components'

// Componente para a página principal
const MainPage = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true)
  const [hideTimeout, setHideTimeout] = useState(null)

  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId)
  }

  // Função para esconder o indicador após 4 segundos
  const resetHideTimer = () => {
    // Limpa o timeout anterior se existir
    if (hideTimeout) {
      clearTimeout(hideTimeout)
    }
    
    // Mostra o indicador
    setShowSwipeIndicator(true)
    
    // Define novo timeout para esconder após 4 segundos
    const newTimeout = setTimeout(() => {
      setShowSwipeIndicator(false)
    }, 4000)
    
    setHideTimeout(newTimeout)
  }

  // Função para detectar swipe
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    resetHideTimer() // Mostra o indicador quando toca na tela
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    const sections = ['home', 'about', 'services', 'portfolio', 'contact']
    const currentIndex = sections.indexOf(activeSection)
    
    if (isLeftSwipe && currentIndex < sections.length - 1) {
      navigateToSection(sections[currentIndex + 1])
    }
    
    if (isRightSwipe && currentIndex > 0) {
      navigateToSection(sections[currentIndex - 1])
    }
  }

  // Inicializar o timer do indicador
  useEffect(() => {
    // Define o timeout inicial para esconder após 4 segundos
    const initialTimeout = setTimeout(() => {
      setShowSwipeIndicator(false)
    }, 4000)
    
    setHideTimeout(initialTimeout)
    
    // Cleanup do timeout quando o componente for desmontado
    return () => {
      clearTimeout(initialTimeout)
    }
  }, [])

  // Navegação por teclado
  useEffect(() => {
    const handleKeyPress = (event) => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact']
      const currentIndex = sections.indexOf(activeSection)
      
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        navigateToSection(sections[currentIndex - 1])
      } else if (event.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        navigateToSection(sections[currentIndex + 1])
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [activeSection])

  // Detectar hash na URL e navegar para a seção correspondente
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove o #
      const sections = ['home', 'about', 'services', 'portfolio', 'contact']
      
      if (sections.includes(hash)) {
        setActiveSection(hash)
      }
    }

    // Verifica hash inicial
    handleHashChange()
    
    // Escuta mudanças no hash
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Função para renderizar a seção ativa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero navigateToSection={navigateToSection} />
      case 'about':
        return <About />
      case 'services':
        return <Services />
      case 'portfolio':
        return <Portfolio />
      case 'contact':
        return <Contact />
      default:
        return <Hero navigateToSection={navigateToSection} />
    }
  }

  return (
    <div 
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Navbar activeSection={activeSection} navigateToSection={navigateToSection} />
      
      {/* Indicadores de navegação lateral - ocultos no mobile */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex-col space-y-3 hidden md:flex">
        {['home', 'about', 'services', 'portfolio', 'contact'].map((sectionId) => (
          <button
            key={sectionId}
            onClick={() => navigateToSection(sectionId)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === sectionId 
                ? 'bg-blue-600 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title={sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
          />
        ))}
      </div>

      {/* Indicador de swipe para mobile */}
      <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 md:hidden transition-all duration-500 ${
        showSwipeIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-black bg-opacity-50 rounded-full px-4 py-2 flex items-center space-x-2">
          <div className="flex space-x-1">
            {['home', 'about', 'services', 'portfolio', 'contact'].map((sectionId) => (
              <div
                key={sectionId}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === sectionId 
                    ? 'bg-blue-400' 
                    : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
          <div className="text-white text-xs ml-2">
            ← Deslize →
          </div>
        </div>
      </div>
      
      {/* Container da seção ativa com animação de fade */}
      <div 
        key={activeSection}
        className="animate-fadeIn transition-opacity duration-500"
      >
        {renderActiveSection()}
      </div>
      
      {/* Footer apenas na seção de contato */}
      {activeSection === 'contact' && <Footer />}
    </div>
  )
}

// Componente para detectar mudanças de rota e ajustar scroll
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Rota principal */}
          <Route path="/" element={<MainPage />} />
          
          {/* Rota para páginas individuais de projetos */}
          <Route path="/projeto/:slug" element={<ProjectDetail />} />
          
          {/* Rota 404 - redireciona para a página principal */}
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App