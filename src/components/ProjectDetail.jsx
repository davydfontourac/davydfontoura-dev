import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Github, 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Clock, 
  User, 
  CheckCircle,
  X
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNotionProjects } from '../hooks/useNotionProjects'
import { getImagePath } from '../utils/imagePaths'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import ScrollReveal from './ScrollReveal'
import useSEO from '../hooks/useSEO'
import ProjectStatRow from './ProjectStatRow'

const ProjectDetail = () => {

  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const { getProjectBySlug, getRelatedProjects, loading } = useNotionProjects()
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const project = useMemo(() => getProjectBySlug(slug), [getProjectBySlug, slug])
  const relatedProjects = useMemo(() => getRelatedProjects(project), [getRelatedProjects, project])

  // SEO
  useSEO({
    title: project ? `${project.title?.[i18n.language] || project.title?.pt} | Davyd Fontoura` : t('projectDetail.loading'),
    description: project ? (project.shortDesc?.[i18n.language] || project.shortDesc?.pt) : '',
    keywords: project?.tech?.join(', '),
    image: project?.images?.[0] ? getImagePath(project.images[0]) : undefined,
    url: window.location.href,
    type: 'article'
  });

  const handleNextImage = useCallback((e) => {
    if (e) e.stopPropagation()
    setImageLoaded(false)
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }, [project?.images?.length])

  const handlePrevImage = useCallback((e) => {
    if (e) e.stopPropagation()
    setImageLoaded(false)
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }, [project?.images?.length])

  const handleKeyDown = useCallback((e) => {
    if (!isModalOpen) return
    if (e.key === 'ArrowRight') handleNextImage()
    if (e.key === 'ArrowLeft') handlePrevImage()
    if (e.key === 'Escape') setIsModalOpen(false)
  }, [isModalOpen, handleNextImage, handlePrevImage])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white dark:bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 bg-white dark:bg-gray-900 flex flex-col justify-center items-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('projectDetail.notFound', 'Projeto não encontrado')}
        </h2>
        <Link 
          to="/" 
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          {t('projectDetail.backToHome', 'Voltar para o Início')}
        </Link>
      </div>
    )
  }

  const getStatusTag = (status) => {
    const statusMap = {
      'concluido': { 
        text: t('projectDetail.status.completed', 'Concluído'), 
        classes: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        icon: CheckCircle
      },
      'em_producao': { 
        text: t('projectDetail.status.inProgress', 'Em Produção'), 
        classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        icon: Clock
      },
      'pausado': { 
        text: t('projectDetail.status.paused', 'Pausado'), 
        classes: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        icon: X
      }
    }
    return statusMap[status] || statusMap['em_producao']
  }

  const StatusIcon = getStatusTag(project.status).icon;

  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header Fixo / Barra de Navegação */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                <ArrowLeft size={20} />
              </div>
              <span className="ml-2 font-medium hidden sm:inline">
                {t('projectDetail.backToHome', 'Voltar para o Início')}
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">Home</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white px-2 py-1">
                  {project.title?.[i18n.language] || project.title?.pt}
                </span>
              </nav>

              {/* Toggles */}
              <div className="flex items-center space-x-1 md:space-x-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Espaçador para compensar o header fixo */}
      <div className="h-[72px]"></div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header do projeto */}
        <ScrollReveal variant="fade-up">
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {project.title?.[i18n.language] || project.title?.pt}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {project.description?.[i18n.language] || project.description?.pt}
                </p>

                {/* Tags de categorias */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.categories.map((category) => (
                    <span
                      key={category}
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
                  <ProjectStatRow 
                    label={t('projectDetail.statusLabel', 'Status')}
                    customValue={
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusTag(project.status).classes}`}>
                        <StatusIcon size={12} className="mr-1" />
                        {getStatusTag(project.status).text}
                      </span>
                    }
                  />

                  <ProjectStatRow 
                    label={t('projectDetail.year', 'Ano')}
                    value={project.year}
                    icon={Calendar}
                  />

                  {project.duration && (
                    <ProjectStatRow 
                      label={t('projectDetail.duration', 'Duração')}
                      value={typeof project.duration === 'object' ? (project.duration?.[i18n.language] || project.duration?.pt) : project.duration}
                      icon={Clock}
                    />
                  )}

                  <ProjectStatRow 
                    label={t('projectDetail.role', 'Função')}
                    value={project.role?.[i18n.language] || project.role?.pt}
                    icon={User}
                  />

                  {project.client && (
                    <ProjectStatRow 
                      label={t('projectDetail.client', 'Cliente')}
                      value={typeof project.client === 'object' ? (project.client?.[i18n.language] || project.client?.pt) : project.client}
                    />
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
                          {t('projectDetail.liveSite', 'Ver projeto online')}
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
                          {t('projectDetail.githubCode', 'Ver código')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Galeria de imagens */}
        {project.images && project.images.length > 0 && (
          <ScrollReveal variant="fade-up" className="mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <div className="w-1 h-8 bg-orange-600 mr-4 rounded-full"></div>
                {t('projectDetail.projectGallery', 'Galeria do Projeto')}
              </h2>

              {/* Imagem principal */}
              <div className="mb-6">
                <div
                  className="relative rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 ease-in-out min-h-[24rem] max-h-[32rem] h-auto flex items-center justify-center"
                  onClick={() => handleImageClick(currentImageIndex)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ampliar imagem: ${project.images[currentImageIndex]}`}
                >
                  <img
                    src={getImagePath(project.images[currentImageIndex])}
                    alt={`${project.title?.[i18n.language] || project.title?.pt} - ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </div>
              </div>

              {/* Thumbnails */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {project.images.map((img, index) => (
                    <div
                      key={img}
                      className={`relative rounded-md overflow-hidden cursor-pointer transition-all aspect-video ${
                        currentImageIndex === index
                          ? 'ring-2 ring-blue-600 opacity-100'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={getImagePath(img)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Descrição detalhada / Sobre o projeto */}
        {project.fullDescription && (
          <ScrollReveal variant="fade-up" className="mb-16">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <div className="w-1 h-8 bg-blue-600 mr-4 rounded-full"></div>
                {t('projectDetail.aboutProject', 'Sobre o Projeto')}
              </h2>
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: project.fullDescription[i18n.language] || project.fullDescription.pt }}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Tecnologias utilizadas */}
        {project.tech && project.tech.length > 0 && (
          <ScrollReveal variant="fade-up" className="mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <div className="w-1 h-8 bg-purple-600 mr-4 rounded-full"></div>
                {t('projectDetail.technologies', 'Tecnologias Utilizadas')}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Desafios e soluções (se existirem na Notion property futuramente) */}
        {project.challenges && (
          <ScrollReveal variant="fade-up" className="mb-16">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-orange-50 dark:bg-orange-900/10 p-8 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                   <h3 className="text-xl font-bold text-orange-900 dark:text-orange-400 mb-4 flex items-center">
                      <X className="mr-2" size={20} />
                      {t('projectDetail.challenges', 'Desafios')}
                   </h3>
                   <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: project.challenges[i18n.language] || project.challenges.pt }} />
                </div>
                <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-2xl border border-green-100 dark:border-green-900/30">
                   <h3 className="text-xl font-bold text-green-900 dark:text-green-400 mb-4 flex items-center">
                      <CheckCircle className="mr-2" size={20} />
                      {t('projectDetail.solutions', 'Soluções')}
                   </h3>
                   <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: project.solutions[i18n.language] || project.solutions.pt }} />
                </div>
             </div>
          </ScrollReveal>
        )}

        {/* Projetos Relacionados */}
        {relatedProjects.length > 0 && (
          <ScrollReveal variant="fade-up" className="mb-16 pt-16 border-t border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {t('projectDetail.relatedProjects', 'Outros Projetos')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/projeto/${p.slug}`}
                    className="group bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={p.images?.[0] ? getImagePath(p.images[0]) : ''}
                        alt={p.title?.[i18n.language] || p.title?.pt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {p.title?.[i18n.language] || p.title?.pt}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {p.shortDesc?.[i18n.language] || p.shortDesc?.pt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Modal de imagem (LightBox) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Botão fechar */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-[110]"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={32} />
          </button>
          
          {/* Botão anterior */}
          {project.images.length > 1 && (
            <button 
              className="absolute left-6 text-white/70 hover:text-white p-2 z-[110] bg-white/10 rounded-full hidden md:block"
              onClick={handlePrevImage}
            >
              <ChevronLeft size={48} />
            </button>
          )}
          
          {/* Botão próximo */}
          {project.images.length > 1 && (
            <button 
              className="absolute right-6 text-white/70 hover:text-white p-2 z-[110] bg-white/10 rounded-full hidden md:block"
              onClick={handleNextImage}
            >
              <ChevronRight size={48} />
            </button>
          )}

          <div 
            className="relative max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            <img
              src={getImagePath(project.images[currentImageIndex])}
              alt="Project View"
              onLoad={() => setImageLoaded(true)}
              className={`max-w-full max-h-[90vh] object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white text-sm font-medium">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
