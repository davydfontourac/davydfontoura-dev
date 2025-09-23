import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Clock, Tag, CheckCircle, Lightbulb, X } from 'lucide-react'
import { getProjectBySlug, getRelatedProjects } from '../data/projects'

const ProjectDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [relatedProjects, setRelatedProjects] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [thumbnailErrors, setThumbnailErrors] = useState({})

  useEffect(() => {
    const foundProject = getProjectBySlug(slug)
    if (foundProject) {
      setProject(foundProject)
      setRelatedProjects(getRelatedProjects(foundProject.id))
      // Reset para a primeira imagem ao trocar de projeto
      setCurrentImageIndex(0)
      // Reset do estado de carregamento da imagem
      setImageLoaded(false)
      setImageError(false)
      setIsTransitioning(false)
      // Reset do estado de carregamento das miniaturas
      setThumbnailErrors({})
    } else {
      // Redirecionar para 404 ou página principal se projeto não encontrado
      navigate('/')
    }
  }, [slug, navigate])

  // Reset imageLoaded quando trocar de imagem
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [currentImageIndex])

  // Animação suave ao carregar imagem
  useEffect(() => {
    if (imageLoaded) {
      setIsTransitioning(false)
    }
  }, [imageLoaded])

  // Fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isImageModalOpen) {
        setIsImageModalOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isImageModalOpen])

  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setIsImageModalOpen(true)
  }

  const handleBackToPortfolio = () => {
    // Usa hash para navegar diretamente para a seção portfólio
    window.location.href = '/#portfolio'
  }

  const handleThumbnailClick = (index) => {
    if (index !== currentImageIndex) {
      setIsTransitioning(true)
      
      // Pequeno delay para a animação de fade out
      setTimeout(() => {
        setCurrentImageIndex(index)
        setIsTransitioning(false)
      }, 150)
    }
  }



  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando projeto...</p>
        </div>
      </div>
    )
  }

  const getStatusTag = (status) => {
    const statusConfig = {
      'concluido': {
        text: 'Concluído',
        classes: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        icon: CheckCircle
      },
      'em-producao': {
        text: 'Em Produção',
        classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        icon: Clock
      },
      'pausado': {
        text: 'Pausado',
        classes: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        icon: Tag
      }
    }
    
    return statusConfig[status] || statusConfig['em-producao']
  }

  const StatusIcon = getStatusTag(project.status).icon

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header com botão voltar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => handleBackToPortfolio()}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Voltar ao portfólio</span>
            </button>
            
            {/* Breadcrumb */}
            <nav className="hidden md:flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <button 
                onClick={() => handleBackToPortfolio()}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                Portfólio
              </button>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">{project.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header do projeto */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>
              
              {/* Tags de categorias */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.categories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    <Tag size={12} className="mr-1" />
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Informações do projeto */}
            <div className="lg:w-80 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusTag(project.status).classes}`}>
                    <StatusIcon size={12} className="mr-1" />
                    {getStatusTag(project.status).text}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Ano
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white font-medium">{project.year}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
                    <Clock size={14} className="mr-1" />
                    Duração
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white font-medium">{project.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
                    <User size={14} className="mr-1" />
                    Função
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white font-medium">{project.role}</span>
                </div>
                
                {project.client && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Cliente</span>
                    <span className="text-sm text-gray-900 dark:text-white font-medium">{project.client}</span>
                  </div>
                )}
                
                {/* Links do projeto */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <ExternalLink size={14} className="mr-2" />
                        Ver projeto online
                      </a>
                    )}
                    
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Github size={14} className="mr-2" />
                        Ver código
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Galeria de imagens */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="w-1 h-8 bg-orange-600 mr-4 rounded-full"></div>
              Galeria do Projeto
            </h2>
            
            {/* Imagem principal */}
            <div className="mb-6">
              <div 
                className="relative rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 ease-in-out min-h-[24rem] max-h-[32rem] h-auto flex items-center justify-center"
                onClick={() => handleImageClick(currentImageIndex)}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full p-2">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                </div>
                {/* Imagem real ou placeholder */}
                {!imageError ? (
                  <img 
                    key={`main-image-${currentImageIndex}`}
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} - ${project.images[currentImageIndex].split('/').pop().replace(/\.(jpg|png|jpeg)/, '').replace('-', ' ')}`}
                    className={`w-full h-auto max-h-[32rem] object-contain transition-all duration-300 ease-in-out ${
                      isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      setImageError(true)
                      setImageLoaded(false)
                    }}
                  />
                ) : (
                  /* Placeholder para quando a imagem não carrega */
                  <div className={`w-full min-h-[24rem] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg transition-all duration-300 ease-in-out ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mb-3 mx-auto flex items-center justify-center">
                        <Lightbulb size={24} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {project.images[currentImageIndex].split('/').pop().replace(/\.(jpg|png|jpeg)/, '').replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Miniaturas */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 min-h-[6rem] max-h-[8rem] h-auto flex items-center justify-center ${
                      index === currentImageIndex 
                        ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' 
                        : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    {/* Imagem miniatura real ou placeholder */}
                    {!thumbnailErrors[index] ? (
                      <img 
                        src={image}
                        alt={`${project.title} - ${image.split('/').pop().replace(/\.(jpg|png|jpeg)/, '').replace('-', ' ')}`}
                        className="w-full h-auto max-h-[8rem] object-contain"
                        onError={() => {
                          setThumbnailErrors(prev => ({ ...prev, [index]: true }))
                        }}
                      />
                    ) : (
                      /* Placeholder para quando a imagem não carrega */
                      <div className="w-full min-h-[6rem] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400 text-xs text-center px-1">
                          {image.split('/').pop().replace(/\.(jpg|png|jpeg)/, '').replace('-', ' ')}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Descrição detalhada */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <div className="w-1 h-8 bg-blue-600 mr-4 rounded-full"></div>
            Sobre o Projeto
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div 
              className="prose prose-lg max-w-none prose-blue"
              style={{
                colorScheme: 'light dark'
              }}
            >
              <style>{`
                .dark .project-content * {
                  color: rgb(209 213 219) !important; /* gray-300 */
                }
                .dark .project-content h3 {
                  color: rgb(96 165 250) !important; /* blue-400 */
                }
                .project-content * {
                  color: rgb(55 65 81) !important; /* gray-700 */
                }
                .project-content h3 {
                  color: rgb(37 99 235) !important; /* blue-600 */
                  font-weight: bold;
                  font-size: 1.25rem;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                .project-content p {
                  margin-bottom: 1rem;
                  line-height: 1.7;
                }
                .project-content ul {
                  margin: 1rem 0;
                  padding-left: 1.5rem;
                }
                .project-content li {
                  margin-bottom: 0.5rem;
                  line-height: 1.6;
                }
              `}</style>
              <div 
                className="project-content"
                dangerouslySetInnerHTML={{ __html: project.fullDescription }}
              />
            </div>
          </div>
        </div>

        {/* Tecnologias utilizadas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <div className="w-1 h-8 bg-green-600 mr-4 rounded-full"></div>
            Tecnologias Utilizadas
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Características principais */}
        {project.features && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="w-1 h-8 bg-purple-600 mr-4 rounded-full"></div>
              Características Principais
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow duration-300">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckCircle size={18} className="text-green-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projetos relacionados */}
        {relatedProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="w-1 h-8 bg-pink-600 mr-4 rounded-full"></div>
              Projetos Relacionados
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    to={`/projeto/${relatedProject.slug}`}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-600"
                  >
                    <div className={`bg-gradient-to-br ${relatedProject.gradient} h-32 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">Ver projeto</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {relatedProject.shortDesc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de imagem (se necessário) */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
              title="Fechar (ESC)"
            >
              <X size={24} />
            </button>
            
            {/* Conteúdo do modal */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center max-w-2xl">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto flex items-center justify-center mb-4">
                  <Lightbulb size={24} className="text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Visualização da Imagem
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.images[currentImageIndex].split('/').pop().replace('.jpg', '').replace('-', ' ')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Aqui seria exibida a imagem real do projeto. Para fechar, clique no X ou pressione ESC.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail