const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Page Corporativa",
      description: "Site responsivo desenvolvido com HTML, CSS e JavaScript",
      tech: ["HTML", "CSS", "JavaScript"],
      gradient: "from-blue-400 to-blue-600",
      status: "concluido"
    },
    {
      id: 2,
      title: "Dashboard React",
      description: "Interface administrativa moderna com React e Tailwind",
      tech: ["React", "Tailwind CSS", "Vite"],
      gradient: "from-purple-400 to-purple-600",
      status: "concluido"
    },
    {
      id: 3,
      title: "E-commerce Front-end",
      description: "Interface de loja virtual com carrinho e checkout",
      tech: ["React", "CSS Modules", "JavaScript"],
      gradient: "from-green-400 to-green-600",
      status: "em-producao"
    },
    {
      id: 4,
      title: "Portfolio Freelance",
      description: "Site pessoal para cliente da área criativa",
      tech: ["HTML", "CSS", "JavaScript"],
      gradient: "from-orange-400 to-red-500",
      status: "concluido"
    },
    {
      id: 5,
      title: "Aplicação Web Responsiva",
      description: "Sistema web com design mobile-first",
      tech: ["React", "Tailwind CSS", "Python"],
      gradient: "from-indigo-400 to-indigo-600",
      status: "em-producao"
    },
    {
      id: 6,
      title: "Interface Interativa",
      description: "Projeto com animações e efeitos visuais",
      tech: ["JavaScript", "CSS3", "HTML5"],
      gradient: "from-pink-400 to-pink-600",
      status: "concluido"
    }
  ]

  // Função para obter as classes CSS da tag de status
  const getStatusTag = (status) => {
    const statusConfig = {
      'concluido': {
        text: 'Concluído',
        classes: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      },
      'em-producao': {
        text: 'Em Produção',
        classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      },
      'pausado': {
        text: 'Pausado',
        classes: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }
    }
    
    return statusConfig[status] || statusConfig['em-producao']
  }

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
                {/* Tag de Status */}
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusTag(project.status).classes} shadow-sm`}>
                    {getStatusTag(project.status).text}
                  </span>
                </div>
                
                {/* Overlay com hover melhorado */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6">
                  <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-xl font-bold mb-3">{project.title}</h4>
                    <p className="text-sm mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="bg-white/25 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Título e descrição abaixo do card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusTag(project.status).classes}`}>
                    {getStatusTag(project.status).text}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio