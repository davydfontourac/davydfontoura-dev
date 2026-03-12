import { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useScrollSpy } from "./hooks/useScrollSpy";

// Importando todos os componentes de forma centralizada
import {
  Navbar,
  Hero,
  About,
  Services,
  Contact,
  Footer,
  ProjectDetail,
} from "./components";

const Portfolio = lazy(() => import('./components/Portfolio'));

// Componente para a página principal
const MainPage = () => {
  const { i18n } = useTranslation();
  const activeSection = useScrollSpy(['home', 'about', 'services', 'portfolio', 'contact']);

  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Efeito para lidar com deep link ao carregar a página inicialmente
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        activeSection={activeSection}
        navigateToSection={navigateToSection}
      />

      <main>
        <Hero navigateToSection={navigateToSection} />
        <About />
        <Services />
        <Suspense fallback={
          <div className="min-h-screen pt-20 bg-white dark:bg-gray-900 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <Portfolio />
        </Suspense>
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

// Componente para detectar mudanças de rota e ajustar scroll
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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
  );
}

export default App;
