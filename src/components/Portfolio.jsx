const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Landing Page Corporativa",
      description: "Site responsivo desenvolvido com HTML, CSS e JavaScript",
      tech: ["HTML", "CSS", "JavaScript"],
      gradient: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      title: "Dashboard React",
      description: "Interface administrativa moderna com React e Tailwind",
      tech: ["React", "Tailwind CSS", "Vite"],
      gradient: "from-purple-400 to-purple-600"
    },
    {
      id: 3,
      title: "E-commerce Front-end",
      description: "Interface de loja virtual com carrinho e checkout",
      tech: ["React", "CSS Modules", "JavaScript"],
      gradient: "from-green-400 to-green-600"
    },
    {
      id: 4,
      title: "Portfolio Freelance",
      description: "Site pessoal para cliente da área criativa",
      tech: ["HTML", "CSS", "JavaScript"],
      gradient: "from-orange-400 to-red-500"
    },
    {
      id: 5,
      title: "Aplicação Web Responsiva",
      description: "Sistema web com design mobile-first",
      tech: ["React", "Tailwind CSS", "Python"],
      gradient: "from-indigo-400 to-indigo-600"
    },
    {
      id: 6,
      title: "Interface Interativa",
      description: "Projeto com animações e efeitos visuais",
      tech: ["JavaScript", "CSS3", "HTML5"],
      gradient: "from-pink-400 to-pink-600"
    }
  ]

  return (
    <section id="portfolio" className="min-h-screen xl:w-[220vh] xl:mx-auto pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Portfólio</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Projetos desenvolvidos com foco em qualidade e experiência do usuário
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer card-hover">
              <div className={`bg-gradient-to-br ${project.gradient} h-48 rounded-lg mb-4 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                    <p className="text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="bg-white/20 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio