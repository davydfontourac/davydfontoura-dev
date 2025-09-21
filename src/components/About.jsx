import profileImage from '../assets/profile.jpg'

const About = () => {
  const skills = ['JavaScript', 'HTML', 'CSS', 'React', 'Vite', 'Tailwind CSS', 'Python']

  // Ícones de código como SVGs
  const CodeIcon = ({ className, children }) => (
    <div className={`bg-white/10 backdrop-blur-sm rounded-lg p-3 ${className}`}>
      {children}
    </div>
  )

  const BrowserIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v2h16V5H4zm0 4v10h16V9H4zm2 2h2v2H6v-2zm4 0h2v2h-2v-2z"/>
    </svg>
  )

  const CodeBracesIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 3C7.44772 3 7 3.44772 7 4C7 4.55228 7.44772 5 8 5C8.55228 5 9 4.55228 9 4C9 3.44772 8.55228 3 8 3ZM16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5C16.5523 5 17 4.55228 17 4C17 3.44772 16.5523 3 16 3ZM7 8V16H9V8H7ZM15 8V16H17V8H15ZM3 7C3 6.44772 3.44772 6 4 6C4.55228 6 5 6.44772 5 7V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V7ZM19 7C19 6.44772 19.4477 6 20 6C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18C19.4477 18 19 17.5523 19 17V7Z"/>
    </svg>
  )

  const DatabaseIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C16.418 2 20 3.79086 20 6V18C20 20.2091 16.418 22 12 22C7.58172 22 4 20.2091 4 18V6C4 3.79086 7.58172 2 12 2ZM12 4C8.68629 4 6 5.34315 6 6C6 6.65685 8.68629 8 12 8C15.3137 8 18 6.65685 18 6C18 5.34315 15.3137 4 12 4ZM6 8.48528V12C6 12.6569 8.68629 14 12 14C15.3137 14 18 12.6569 18 12V8.48528C16.7 9.42805 14.4853 10 12 10C9.51472 10 7.3 9.42805 6 8.48528ZM6 14.4853V18C6 18.6569 8.68629 20 12 20C15.3137 20 18 18.6569 18 18V14.4853C16.7 15.428 14.4853 16 12 16C9.51472 16 7.3 15.428 6 14.4853Z"/>
    </svg>
  )

  const MonitorIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2 3h20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-7v2h3v2H6v-2h3v-2H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v10h18V5H3z"/>
    </svg>
  )

  const SettingsIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
    </svg>
  )

  return (
    <section id="about" className="min-h-screen xl:w-[220vh] xl:mx-auto pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Sobre Mim</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Conheça um pouco mais sobre minha trajetória e paixão por tecnologia
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700 rounded-lg h-96 relative overflow-hidden">
              {/* Padrão de pontos de fundo */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 gap-4 p-8 h-full">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-white rounded-full animate-pulse"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Ícones espalhados */}
              <div className="absolute inset-0 p-4 md:p-8">
                {/* Estilos CSS para animação float */}
                <style jsx>{`
                  @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                  }
                  .float-animation {
                    animation: float 3s ease-in-out infinite;
                  }
                `}</style>
                
                {/* Ícones nos cantos - visíveis apenas em telas médias e grandes */}
                <CodeIcon className="absolute top-2 left-2 md:top-4 md:left-4 float-animation hover:scale-110 transition-transform duration-300 hidden md:block" style={{ animationDelay: '0s' }}>
                  <BrowserIcon />
                </CodeIcon>
                <CodeIcon className="absolute top-2 right-2 md:top-4 md:right-4 float-animation hover:scale-110 transition-transform duration-300 hidden md:block" style={{ animationDelay: '0.5s' }}>
                  <CodeBracesIcon />
                </CodeIcon>
                <CodeIcon className="absolute top-12 left-16 md:top-16 md:left-20 float-animation hover:scale-110 transition-transform duration-300 hidden lg:block" style={{ animationDelay: '1s' }}>
                  <DatabaseIcon />
                </CodeIcon>
                <CodeIcon className="absolute top-12 right-16 md:top-16 md:right-20 float-animation hover:scale-110 transition-transform duration-300 hidden lg:block" style={{ animationDelay: '1.5s' }}>
                  <MonitorIcon />
                </CodeIcon>
                <CodeIcon className="absolute bottom-2 left-2 md:bottom-4 md:left-4 float-animation hover:scale-110 transition-transform duration-300 hidden md:block" style={{ animationDelay: '2s' }}>
                  <SettingsIcon />
                </CodeIcon>
                <CodeIcon className="absolute bottom-2 right-2 md:bottom-4 md:right-4 float-animation hover:scale-110 transition-transform duration-300 hidden md:block" style={{ animationDelay: '2.5s' }}>
                  <CodeBracesIcon />
                </CodeIcon>
                <CodeIcon className="absolute bottom-12 left-16 md:bottom-16 md:left-20 float-animation hover:scale-110 transition-transform duration-300 hidden lg:block" style={{ animationDelay: '3s' }}>
                  <BrowserIcon />
                </CodeIcon>
                <CodeIcon className="absolute bottom-12 right-16 md:bottom-16 md:right-20 float-animation hover:scale-110 transition-transform duration-300 hidden lg:block" style={{ animationDelay: '3.5s' }}>
                  <DatabaseIcon />
                </CodeIcon>

                {/* Ícones para mobile - posicionados de forma a não conflitar com a foto */}
                <CodeIcon className="absolute top-4 left-1/2 transform -translate-x-1/2 float-animation hover:scale-110 transition-transform duration-300 md:hidden" style={{ animationDelay: '0s' }}>
                  <BrowserIcon />
                </CodeIcon>
                <CodeIcon className="absolute bottom-4 left-1/2 transform -translate-x-1/2 float-animation hover:scale-110 transition-transform duration-300 md:hidden" style={{ animationDelay: '1s' }}>
                  <CodeBracesIcon />
                </CodeIcon>
                <CodeIcon className="absolute top-1/2 left-4 transform -translate-y-1/2 float-animation hover:scale-110 transition-transform duration-300 md:hidden" style={{ animationDelay: '2s' }}>
                  <DatabaseIcon />
                </CodeIcon>
                <CodeIcon className="absolute top-1/2 right-4 transform -translate-y-1/2 float-animation hover:scale-110 transition-transform duration-300 md:hidden" style={{ animationDelay: '3s' }}>
                  <SettingsIcon />
                </CodeIcon>
              </div>
              
              {/* Conteúdo central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center z-10">
                  <div className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-white/30 overflow-hidden">
                    <img 
                      src={profileImage} 
                      alt="Davyd Fontoura" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-lg md:text-xl font-semibold drop-shadow-lg">Davyd Fontoura</p>
                  <p className="text-xs md:text-sm opacity-90 drop-shadow">Desenvolvedor Front-End</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Minha História</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
              Sou um profissional formado pelo SENAI em Programação Front-End e atualmente estou 
              cursando Análise e Desenvolvimento de Sistemas. Com paixão por criar interfaces 
              modernas e funcionais, venho desenvolvendo projetos pessoais e realizando freelances na área.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
              Minha especialidade é criação de páginas web utilizando principalmente HTML, CSS e JavaScript, 
              sempre focando em entregar soluções que combinam design atrativo com funcionalidade excepcional.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
              Acredito que a tecnologia deve ser acessível e que cada projeto é uma oportunidade 
              de criar experiências digitais que realmente façam a diferença na vida das pessoas.
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About