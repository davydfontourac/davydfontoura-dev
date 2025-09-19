const Hero = ({ navigateToSection }) => {
  return (
    <section id="home" className="min-h-screen xl:w-[220vh] xl:mx-auto pt-16 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Olá, eu sou
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Davyd Fontoura</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Desenvolvedor Front-End apaixonado por criar experiências digitais modernas e funcionais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateToSection('portfolio')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Portfólio
            </button>
            <button 
              onClick={() => navigateToSection('contact')}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors"
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