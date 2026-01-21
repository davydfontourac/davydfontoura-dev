const Services = () => {
  const services = [
    {
      title: 'Desenvolvimento Web',
      description: 'Sites responsivos e modernos com HTML, CSS e JavaScript',
      icon: '🌐'
    },
    {
      title: 'Interfaces React',
      description: 'Aplicações dinâmicas e interativas com React',
      icon: '⚛️'
    },
    {
      title: 'Landing Pages',
      description: 'Páginas otimizadas para conversão e performance',
      icon: '🚀'
    },
    {
      title: 'Redesign de Sites',
      description: 'Modernização de sites existentes com design atual',
      icon: '✨'
    },
    {
      title: 'Freelances',
      description: 'Projetos personalizados para suas necessidades',
      icon: '💼'
    },
    {
      title: 'Manutenção',
      description: 'Suporte e atualizações para seus projetos web',
      icon: '🔧'
    }
  ]

  return (
    <section id="services" className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Serviços</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Especialista em desenvolvimento front-end com foco em qualidade e inovação
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md dark:shadow-lg transition-all duration-300 card-hover group">
              <div className="text-3xl mb-4 animate-float">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services