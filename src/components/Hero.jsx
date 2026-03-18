import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { Github, Linkedin, Download } from "lucide-react";
import ParticlesBackground from "./ParticlesBackground";

const Hero = ({ navigateToSection }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-900 w-full transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative background elements - hidden in dark mode for a cleaner look */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400/20 dark:hidden rounded-full blur-2xl animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-400/20 dark:hidden rounded-full blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-400/10 dark:hidden rounded-full blur-2xl animate-blob animation-delay-4000"></div>

      {/* Partículas apenas no modo claro */}
      <ParticlesBackground isDarkMode={theme === "dark"} />

      <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300 flex flex-wrap justify-center reveal-base reveal-visible variant-fade-down">
            {t("hero.greeting")}&nbsp;
            <span className="shine-text">Davyd Fontoura</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300 reveal-base reveal-visible variant-fade-up">
            {t("hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:flex-wrap mb-8">
            <a
              href={t("hero.cv_file")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              <Download size={20} />
              {t("hero.cta_cv")}
            </a>
            <button
              onClick={() => navigateToSection("portfolio")}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {t("hero.cta_projects")}
            </button>
            <button
              onClick={() => navigateToSection("contact")}
              className="hidden sm:block border-2 border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {t("hero.cta_contact")}
            </button>
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/davydfontourac"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 glass rounded-full transition-all shadow-sm hover:scale-110 active:scale-95"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/davyd-camargo-70a552261/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 glass rounded-full transition-all shadow-sm hover:scale-110 active:scale-95"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce opacity-50 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2"
        onClick={() => navigateToSection("about")}
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">
          Scroll
        </span>
        <div className="w-5 h-8 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-scroll"></div>
        </div>
      </button>
    </section>
  );
};

export default Hero;
