import { useState } from 'react'

const Portfolio = () => {
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }
  const projects = [
    {
      id: 1,
      title: "Página Corporativa - Treis Tecnologia",
      description: "Desenvolvimento do site institucional da empresa TREIS – Soluções em Tecnologia, com foco em apresentar serviços, reforçar a identidade visual e garantir navegação responsiva. Fui responsável pela implementação do front-end, utilizando HTML, Tailwind CSS e JavaScript.",
      shortDesc: "Site responsivo desenvolvido com HTML, CSS e JavaScript",
      tech: ["HTML", "Tailwind CSS", "CSS Modules", "JavaScript"],
      gradient: "from-blue-400 to-blue-600",
      status: "concluido"
    },
    {
      id: 2,
      title: "Klin – Ecommerce infantil",
      description: "Atuei no desenvolvimento do sistema B2B da marca Klin, com foco em experiência do usuário e responsividade. Atuei na implementação de interfaces e adaptação de componentes para diferentes dispositivos. Tecnologias: HTML, CSS, JavaScript. Projeto realizado em parceria com a empresa TREIS – Soluções em Tecnologia.",
      shortDesc: "Desenvolvimento de páginas do sistema B2B da marca Klin",
      tech: ["HTML", "Tailwind CSS", "CSS Modules", "JavaScript"],
      gradient: "from-purple-400 to-purple-600",
      status: "concluido"
    },
    {
      id: 3,
      title: "Capodarte – Moda e estilo",
      description: "Atuei no desenvolvimento do sistema B2B da marca Capodarte, com foco em performance, usabilidade e fidelidade ao design da marca. Fui responsável pela implementação da interface front-end, utilizando Tailwind CSS, HTML e JavaScript. O projeto foi realizado em parceria com a empresa TREIS – Soluções em Tecnologia.",
      shortDesc: "Desenvolvimento de páginas do sistema B2B da marca Capodarte",
      tech: ["HTML", "Tailwind CSS", "CSS Modules", "JavaScript"],
      gradient: "from-green-400 to-green-600",
      status: "concluido"
    },
    {
      id: 4,
     title: "E-commerce Front-end",
      description: "Interface de loja virtual com carrinho e checkout",
      shortDesc: "Interface de loja virtual com carrinho e checkout",
      tech: ["React", "CSS Modules", "JavaScript"],
      gradient: "from-green-400 to-green-600",
      status: "em-producao"
    },
    {
      id: 5,
      title: "Aplicação Web Responsiva",
      description: "Sistema web com design mobile-first",
      shortDesc: "Sistema web com design mobile-first",
      tech: ["React", "Tailwind CSS", "Python"],
      gradient: "from-indigo-400 to-indigo-600",
      status: "em-producao"
    },
    {
      id: 6,
      title: "Interface Interativa",
      description: "Projeto com animações e efeitos visuais",
      shortDesc: "Projeto com animações e efeitos visuais",
      tech: ["JavaScript", "CSS3", "HTML5"],
      gradient: "from-pink-400 to-pink-600",
      status: "em-producao"
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
                <div className="absolute top-3 right-3 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusTag(project.status).classes} shadow-sm`}>
                    {getStatusTag(project.status).text}
                  </span>
                </div>
                
                {/* Overlay com hover melhorado */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6">
                  <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-xl font-bold mb-3">{project.title}</h4>
                    {/* Mostra apenas a primeira linha (shortDesc) no hover */}
                    <p className="text-sm mb-4 leading-relaxed">{project.shortDesc}</p>
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
                
                {/* Sistema de descrição com "Saiba mais" */}
                <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {(() => {
                    const words = project.description.split(' ')
                    const firstTwoLines = words.slice(0, 15).join(' ') // Aproximadamente 2 linhas
                    const isExpanded = expandedItems[project.id]
                    const needsExpansion = words.length > 15
                    
                    if (!needsExpansion) {
                      return <p>{project.description}</p>
                    }
                    
                    return (
                      <div>
                        <p className={`${isExpanded ? '' : 'line-clamp-2'}`}>
                          {isExpanded ? project.description : `${firstTwoLines}...`}
                        </p>
                        <button
                          onClick={() => toggleExpanded(project.id)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs mt-1 transition-colors"
                        >
                          {isExpanded ? '↑ Ver menos' : '↓ Saiba mais'}
                        </button>
                      </div>
                    )
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio