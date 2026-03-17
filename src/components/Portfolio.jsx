import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Star, GitFork, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getImagePath } from '../utils/imagePaths'
import { useNotionProjects } from '../hooks/useNotionProjects'
import { useGithubRepos } from '../hooks/useGithubRepos'
import ScrollReveal from './ScrollReveal'

const ProjectCardImage = ({ project }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { i18n } = useTranslation();
  
  const imageUrl = project.images && project.images.length > 0 
    ? (project.images[0].startsWith('http') ? project.images[0] : getImagePath(project.images[0]))
    : null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Shimmer Placeholder */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full h-full animate-shimmer" />
        {/* Overlay colorido pulsante por cima do shimmer para dar personalidade */}
        <div className={`absolute inset-0 animate-pulse bg-gradient-to-br ${project.gradient} opacity-30`} />
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={project.title?.[i18n.language] || project.title?.pt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 filter blur-sm'
          }`}
          loading="lazy"
        />
      )}
      
      {/* Overlay gradient para manter legibilidade sempre visível após carregar */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-opacity duration-700 ${
        isLoaded ? 'opacity-60 group-hover:opacity-40' : 'opacity-0'
      }`} />
    </div>
  );
};

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const [expandedItems, setExpandedItems] = useState({})
  const { repos, loading: reposLoading, error: reposError } = useGithubRepos('davydfontourac');
  const { projects, loading: projectsLoading, error: projectsError } = useNotionProjects();

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getStatusTag = (status) => {
    const statusMap = {
      'concluido': { text: t('portfolio.status.concluido'), classes: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
      'em_producao': { text: t('portfolio.status.em_producao'), classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
      'pausado': { text: t('portfolio.status.pausado'), classes: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' }
    }
    return statusMap[status] || statusMap['em_producao']
  }

  return (
    <section 
      id="portfolio" 
      className="min-h-screen pt-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal variant="fade-down" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('portfolio.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
            <span className="block mt-2 text-blue-600 dark:text-blue-400 font-medium">
              <span className="hidden md:inline">{t('portfolio.hover_hint_desktop')}</span>
              <span className="md:hidden">{t('portfolio.hover_hint_mobile')}</span>
            </span>
          </p>
        </ScrollReveal>

        {projectsLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {projectsError && (
          <div className="text-center py-12 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p>Erro ao carregar projetos do Notion: {projectsError}</p>
          </div>
        )}

        {!projectsLoading && !projectsError && projects.length === 0 && (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <p>Nenhum projeto encontrado no Notion.</p>
          </div>
        )}

        {!projectsLoading && !projectsError && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal 
                key={project.id} 
                variant="fade-up" 
                delay={`${index * 80}ms`}
              >
                <div className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-4 flex flex-col h-full">
                  <div className={`bg-gradient-to-br ${project.gradient} h-48 rounded-lg mb-4 relative overflow-hidden shadow-lg transition-all duration-300 ring-0 group-hover:ring-4 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 shrink-0`}>
                    
                    {/* Nova implementação de imagem com carregamento suave */}
                    <ProjectCardImage project={project} />
                    
                    {/* Tag de Status */}
                    <div className="absolute top-3 right-3 z-30 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusTag(project.status).classes} shadow-sm backdrop-blur-sm`}>
                        {getStatusTag(project.status).text}
                      </span>
                    </div>
                    
                    {/* Overlay com hover melhorado - fundo completamente opaco */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-95 transition-all duration-300 flex items-center justify-center p-6 z-40">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-xl font-bold mb-4">{project.title?.[i18n.language] || project.title?.pt}</h4>
                        {/* Mostra apenas a primeira linha (shortDesc) no hover */}
                        <p className="text-sm mb-6 leading-relaxed">{project.shortDesc?.[i18n.language] || project.shortDesc?.pt}</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {project.tech && project.tech.length > 0 && project.tech.slice(0, 3).map((tech) => (
                            <span key={tech} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/30">
                              {tech}
                            </span>
                          ))}
                          {project.tech && project.tech.length > 3 && (
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/30">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Título e descrição abaixo do card */}
                  <div className="flex flex-col flex-grow space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-grow">
                        {project.title?.[i18n.language] || project.title?.pt}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusTag(project.status).classes}`}>
                        {getStatusTag(project.status).text}
                      </span>
                    </div>
                    
                    {/* Sistema de descrição com "Saiba mais" */}
                    <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">
                      {(() => {
                        const descText = project.description?.[i18n.language] || project.description?.pt || '';
                        if (!descText) return <p>Sem descrição no momento.</p>;

                        const words = descText.split(' ')
                        const firstTwoLines = words.slice(0, 15).join(' ') // Aproximadamente 2 linhas
                        const isExpanded = expandedItems[project.id]
                        const needsExpansion = words.length > 15
                        
                        if (!needsExpansion) {
                          return <p>{descText}</p>
                        }
                        
                        return (
                          <div>
                            <p className={`${isExpanded ? '' : 'line-clamp-2'}`}>
                              {isExpanded ? descText : `${firstTwoLines}...`}
                            </p>
                            <button
                              onClick={() => toggleExpanded(project.id)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs mt-1 transition-colors"
                            >
                              {isExpanded ? `↑ ${t('portfolio.show_less', 'Ver menos')}` : `↓ ${t('portfolio.read_more', 'Saiba mais')}`}
                            </button>
                          </div>
                        )
                      })()}
                    </div>
                    
                    {/* Botão Ver Projeto Completo - sempre na parte inferior */}
                    <div className="mt-auto pt-4">
                      <Link
                        to={`/projeto/${project.slug}`}
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm group/btn"
                      >
                        <span>{t('portfolio.view_project')}</span>
                        <ExternalLink size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* GitHub Repositories Section */}
        <div className="mt-24">
          <ScrollReveal variant="fade-down" className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
              <Github size={32} className="text-gray-900 dark:text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('portfolio.github_section_title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('portfolio.github_section_subtitle')}
            </p>
          </ScrollReveal>

          {reposLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {reposError && (
            <div className="text-center py-12 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p>Erro ao carregar repositórios: {reposError}</p>
            </div>
          )}

          {!reposLoading && !reposError && repos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <ScrollReveal 
                  key={repo.id} 
                  variant="fade-up" 
                  delay={`${index * 50}ms`}
                >
                  <a 
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 group flex flex-col h-full hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        <Github size={20} className="text-gray-500" />
                        {repo.name}
                      </h4>
                      <ExternalLink size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3">
                      {repo.description || "Nenhuma descrição disponível."}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                            <span>{repo.language}</span>
                          </div>
                        )}
                        {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
                          <div className="flex items-center gap-3">
                            {repo.stargazers_count > 0 && (
                              <div className="flex items-center gap-1" title={t('portfolio.github_stars')}>
                                <Star size={14} />
                                <span>{repo.stargazers_count}</span>
                              </div>
                            )}
                            {repo.forks_count > 0 && (
                              <div className="flex items-center gap-1" title={t('portfolio.github_forks')}>
                                <GitFork size={14} />
                                <span>{repo.forks_count}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Portfolio