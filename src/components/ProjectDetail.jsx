import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Clock,
  Tag,
  CheckCircle,
  Lightbulb,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo } from "react";
import { useNotionProjects } from '../hooks/useNotionProjects';
import { useTranslation } from 'react-i18next';
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import useSEO from "../hooks/useSEO";
import { getImagePath, getBaseUrl } from "../utils/imagePaths";
import ScrollReveal from "./ScrollReveal";

const ProjectDetail = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [thumbnailErrors, setThumbnailErrors] = useState({});
  const [relatedProjectImageErrors, setRelatedProjectImageErrors] = useState(
    {},
  );
  
  const mainImageRef = useRef(null);
  const loadingTimeoutRef = useRef(null);

  const { loading: projectsLoading, getProjectBySlug, getRelatedProjects } = useNotionProjects();

  const prevSlugRef = useRef(slug);

  useEffect(() => {
    if (projectsLoading) return; // Aguardar o carregamento

    const foundProject = getProjectBySlug(slug);
    if (foundProject) {
      setProject(foundProject);
      setRelatedProjects(getRelatedProjects(foundProject.id));
      // Reset para a primeira imagem ao trocar de projeto
      setCurrentImageIndex(0);
      // Reset do estado de carregamento da imagem
      setImageLoaded(false);
      setImageError(false);
      setIsTransitioning(false);
      // Reset do estado de carregamento das miniaturas
      setThumbnailErrors({});
      // Reset do estado de carregamento das imagens dos projetos relacionados
      setRelatedProjectImageErrors({});
      
      // SÓ rolar suavemente para o topo se o slug mudou (navegação entre projetos relacionados)
      // Se for a primeira carga vindo de fora, o App.jsx já cuida do scroll instantâneo
      if (prevSlugRef.current !== slug) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        prevSlugRef.current = slug;
      }
    } else {
      // Redirecionar para 404 ou página principal se projeto não encontrado
      navigate("/");
    }
  }, [slug, navigate, projectsLoading, getProjectBySlug, getRelatedProjects]);

  // SEO Configuration
  const currentUrl = window.location.href;
  const baseUrl = getBaseUrl();

  const structuredDataObj = useMemo(() => {
    return project
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title?.[i18n.language] || project.title?.pt,
          description: project.description?.[i18n.language] || project.description?.pt,
          author: {
            "@type": "Person",
            name: "Davyd Fontoura",
            jobTitle: "Desenvolvedor Front-End",
          },
          creator: {
            "@type": "Person",
            name: "Davyd Fontoura",
          },
          dateCreated: project.year,
          inLanguage: "pt-BR",
          keywords: project.categories.join(", "),
          image: project.images?.[0]
            ? `${baseUrl}${getImagePath(project.images[0])}`
            : undefined,
          url: currentUrl,
          workExample: {
            "@type": "WebSite",
            name: project.title?.[i18n.language] || project.title?.pt,
            description: project.description?.[i18n.language] || project.description?.pt,
            url: project.links?.live || currentUrl,
          },
        }
      : null;
  }, [project, i18n.language, baseUrl, currentUrl]);

  useSEO({
    title:
      project?.seo?.title || `${project?.title?.[i18n.language] || project?.title?.pt} - Davyd Fontoura | Portfolio`,
    description: project?.seo?.description || project?.description?.[i18n.language] || project?.description?.pt,
    keywords:
      project?.seo?.keywords ||
      `${project?.title?.[i18n.language] || project?.title?.pt}, desenvolvimento web, davyd fontoura, front-end developer`,
    ogTitle: project?.seo?.title || `${project?.title?.[i18n.language] || project?.title?.pt} - Davyd Fontoura`,
    ogDescription: project?.seo?.description || project?.description?.[i18n.language] || project?.description?.pt,
    ogImage: project?.seo?.ogImage
      ? `${baseUrl}${getImagePath(project.seo.ogImage)}`
      : project?.images?.[0]
        ? `${baseUrl}${getImagePath(project.images[0])}`
        : `${baseUrl}/og-image.jpg`,
    ogUrl: currentUrl,
    canonical: currentUrl,
    structuredData: structuredDataObj,
  });

  // Reset imageLoaded quando trocar de imagem
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);

    // Se a imagem já estiver no cache do navegador, o evento onLoad pode não disparar em alguns casos
    // ou disparar instantaneamente. Verificamos se já está completa.
    const checkImageStatus = () => {
      if (mainImageRef.current && mainImageRef.current.complete) {
        if (mainImageRef.current.naturalWidth > 0) {
          setImageLoaded(true);
        } else {
          setImageError(true);
        }
      }
    };

    // Pequeno delay para garantir que o src foi atualizado no DOM
    const rafId = requestAnimationFrame(checkImageStatus);

    // Safety timeout: se não carregar em 10 segundos, mostra erro/fallback
    // para evitar o shimmer infinito
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = setTimeout(() => {
      if (!imageLoaded && !imageError) {
        console.warn("Image load timeout reached");
        setImageError(true);
      }
    }, 10000);

    return () => {
      cancelAnimationFrame(rafId);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex, project?.images]);

  // Animação suave ao carregar imagem
  useEffect(() => {
    if (imageLoaded) {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      setIsTransitioning(false);
    }
  }, [imageLoaded]);

  // Fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isImageModalOpen) {
        setIsImageModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageModalOpen]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setImageError(false); // Reset do erro da imagem ao abrir o modal
    setIsImageModalOpen(true);
  };

  const handleBackToPortfolio = () => {
    // Usa hash para navegar diretamente para a seção portfólio
    window.location.href = "/#portfolio";
  };

  const handleThumbnailClick = (index) => {
    if (index !== currentImageIndex) {
      setIsTransitioning(true);

      // Pequeno delay para a animação de fade out
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    if (!project?.images || project.images.length <= 1) return;
    const nextIndex = (currentImageIndex + 1) % project.images.length;
    handleThumbnailClick(nextIndex);
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    if (!project?.images || project.images.length <= 1) return;
    const prevIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
    handleThumbnailClick(prevIndex);
  };

  if (projectsLoading || !project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            {t('loading', 'Carregando...')}
          </p>
        </div>
      </div>
    );
  }

  const getStatusTag = (status) => {
    const statusConfig = {
      concluido: {
        text: t('projectDetail.status.completed', 'Concluído'),
        classes:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        icon: CheckCircle,
      },
      "em-producao": {
        text: t('projectDetail.status.inProgress', 'Em Produção'),
        classes:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        icon: Clock,
      },
      pausado: {
        text: t('projectDetail.status.paused', 'Pausado'),
        classes: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        icon: Tag,
      },
    };

    return statusConfig[status] || statusConfig["em-producao"];
  };

  const StatusIcon = getStatusTag(project.status).icon;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header com botão voltar - FIXO com Blur moderno */}
      <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 shadow-sm border-b border-gray-200 dark:border-gray-700 backdrop-blur-md z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => handleBackToPortfolio()}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium text-sm md:text-base">{t('projectDetail.backToPortfolio', 'Voltar ao portfólio')}</span>
            </button>

            {/* Breadcrumb e Theme Toggle */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Breadcrumb - Oculto em telas muito pequenas para dar espaço */}
              <nav className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <button
                  onClick={() => handleBackToPortfolio()}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t('projectDetail.portfolio', 'Portfólio')}
                </button>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-medium truncate max-w-[120px] md:max-w-xs">
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
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {t('projectDetail.statusLabel', 'Status')}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusTag(project.status).classes}`}
                    >
                      <StatusIcon size={12} className="mr-1" />
                      {getStatusTag(project.status).text}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {t('projectDetail.year', 'Ano')}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white font-medium">
                      {project.year}
                    </span>
                  </div>
                  {project.duration && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Clock size={16} className="inline mr-2" />
                        {t('projectDetail.duration', 'Duração')}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white font-medium">
                        {typeof project.duration === 'object' ? (project.duration?.[i18n.language] || project.duration?.pt) : project.duration}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
                      <User size={14} className="mr-1" />
                      {t('projectDetail.role', 'Função')}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white font-medium">
                      {project.role?.[i18n.language] || project.role?.pt}
                    </span>
                  </div>

                  {project.client && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {t('projectDetail.client', 'Cliente')}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white font-medium">
                        {typeof project.client === 'object' ? (project.client?.[i18n.language] || project.client?.pt) : project.client}
                      </span>
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
                  aria-label={`Ampliar imagem: ${project.images[currentImageIndex]
                    ?.split("/")
                    .pop()
                    .replace(/\.(jpg|png|jpeg|webp)$/i, "")
                    .replace("-", " ")}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleImageClick(currentImageIndex);
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center z-10">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full p-2">
                      <ExternalLink size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Shimmer Placeholder */}
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 animate-shimmer z-0" />
                  )}

                  {/* Imagem real ou placeholder */}
                  {!imageError ? (
                    <img
                      key={`main-image-${currentImageIndex}`}
                      ref={mainImageRef}
                      src={getImagePath(project.images[currentImageIndex])}
                      alt={`${project.title?.[i18n.language] || project.title?.pt} - ${project.images[currentImageIndex]
                        .split("/")
                        .pop()
                        .replace(/\.(jpg|png|jpeg|webp)$/i, "")
                        .replace("-", " ")}`}
                      className={`w-full h-auto max-h-[32rem] object-contain transition-all duration-700 ease-in-out z-0 ${
                        imageLoaded && !isTransitioning ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      onLoad={() => {
                        if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
                        setImageLoaded(true);
                      }}
                      onError={() => {
                        if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
                        setImageError(true);
                        setImageLoaded(false);
                      }}
                    />
                  ) : (
                    /* Placeholder para quando a imagem não carrega */
                    <div
                      className={`w-full min-h-[24rem] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg transition-all duration-300 ease-in-out ${
                        isTransitioning ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mb-3 mx-auto flex items-center justify-center">
                          <Lightbulb
                            size={24}
                            className="text-gray-500 dark:text-gray-400"
                          />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {project.images[currentImageIndex]
                            .split("/")
                            .pop()
                            .replace(/\.(jpg|png|jpeg|webp)$/i, "")
                            .replace("-", " ")}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Controles de Navegação da Galeria (se houver mais de 1 imagem) */}
                  {project.images?.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Miniaturas */}
              {project.images && project.images.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 min-h-[6rem] max-h-[8rem] h-auto flex items-center justify-center ${
                        index === currentImageIndex
                          ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                          : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                      onClick={() => handleThumbnailClick(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Selecionar imagem ${index + 1}: ${image
                        .split("/")
                        .pop()
                        .replace(/\.(jpg|png|jpeg|webp)$/i, "")
                        .replace("-", " ")}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleThumbnailClick(index);
                        }
                      }}
                    >
                      {/* Imagem miniatura real ou placeholder */}
                      {!thumbnailErrors[index] ? (
                        <img
                          src={image.startsWith('http') ? image : getImagePath(image)}
                          alt={`${project.title?.[i18n.language] || project.title?.pt} - ${image
                            .split("/")
                            .pop()
                            .replace(/\.(jpg|png|jpeg|webp)$/i, "")
                            .replace("-", " ")}`}
                          className="w-full h-auto max-h-[8rem] object-contain"
                          onError={() => {
                            setThumbnailErrors((prev) => ({
                              ...prev,
                              [index]: true,
                            }));
                          }}
                        />
                      ) : (
                        /* Placeholder para quando a imagem não carrega */
                        <div className="w-full min-h-[6rem] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                          <p className="text-gray-500 dark:text-gray-400 text-xs text-center px-1">
                            {image
                              .split("/")
                              .pop()
                              .replace(/\.(jpg|png|jpeg|webp)$/i, "")
                              .replace("-", " ")}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Descrição detalhada */}
        <ScrollReveal variant="fade-up" className="mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="w-1 h-8 bg-blue-600 mr-4 rounded-full"></div>
              {t('projectDetail.aboutProject', 'Sobre o Projeto')}
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <div
                className="prose prose-lg max-w-none prose-blue"
                style={{
                  colorScheme: "light dark",
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
                  dangerouslySetInnerHTML={{ __html: project.fullDescription?.[i18n.language] || project.fullDescription?.pt }}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Tecnologias utilizadas */}
        <ScrollReveal variant="fade-up" className="mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="w-1 h-8 bg-green-600 mr-4 rounded-full"></div>
              {t('projectDetail.techUsed', 'Tecnologias Utilizadas')}
            </h2>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-4">
                {project.tech.map((tech, index) => (
                  <ScrollReveal key={index} variant="zoom" delay={`${index * 50}ms`}>
                    <span
                      className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm"
                    >
                      {tech}
                    </span>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Características principais */}
        {(project.features?.[i18n.language]?.length > 0 || project.features?.pt?.length > 0) && (
          <ScrollReveal variant="fade-up" className="mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <div className="w-1 h-8 bg-purple-600 mr-4 rounded-full"></div>
                {t('projectDetail.features', 'Características Principais')}
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(project.features?.[i18n.language] || project.features?.pt || []).map((feature, index) => (
                    <ScrollReveal key={index} variant="fade-right" delay={`${index * 100}ms`}>
                      <div
                        className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircle size={18} className="text-green-500" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm font-medium">
                          {feature}
                        </span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Projetos relacionados */}
        {relatedProjects.length > 0 && (
          <ScrollReveal variant="fade-up" className="mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <div className="w-1 h-8 bg-pink-600 mr-4 rounded-full"></div>
                {t('projectDetail.relatedProjects', 'Projetos Relacionados')}
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProjects.map((relatedProject, index) => (
                    <ScrollReveal key={relatedProject.id} variant="fade-up" delay={`${index * 100}ms`}>
                      <Link
                        to={`/projeto/${relatedProject.slug}`}
                        className="group cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-600 h-full flex flex-col"
                      >
                        <div
                          className={`h-36 relative overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0`}
                        >
                          {/* Imagem de fundo */}
                          {relatedProject.images &&
                            relatedProject.images.length > 0 &&
                            !relatedProjectImageErrors[relatedProject.id] && (
                              <img
                                src={relatedProject.images[0].startsWith('http') ? relatedProject.images[0] : getImagePath(relatedProject.images[0])}
                                alt={`${relatedProject.title?.[i18n.language] || relatedProject.title?.pt} - Hero`}
                                className="absolute inset-0 w-full h-full object-contain"
                                onError={() => {
                                  setRelatedProjectImageErrors((prev) => ({
                                    ...prev,
                                    [relatedProject.id]: true,
                                  }));
                                }}
                              />
                            )}
                          {/* Gradiente overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${relatedProject.gradient} ${!relatedProjectImageErrors[relatedProject.id] && relatedProject.images && relatedProject.images.length > 0 ? "opacity-60" : "opacity-100"}`}
                          ></div>
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-medium text-sm text-center px-2">
                              {t('portfolio.view_project', 'Ver Projeto Completo')}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 flex-grow">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                            {relatedProject.title?.[i18n.language] || relatedProject.title?.pt}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {relatedProject.shortDesc?.[i18n.language] || relatedProject.shortDesc?.pt}
                          </p>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Modal de imagem (se necessário) */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-2"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative w-full h-full max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-70 rounded-full p-3 transition-colors"
              title="Fechar (ESC)"
              aria-label="Fechar modal de imagem"
            >
              <X size={28} />
            </button>

            {/* Conteúdo do modal */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {!imageError ? (
                <img
                  src={project.images[currentImageIndex].startsWith('http') ? project.images[currentImageIndex] : getImagePath(project.images[currentImageIndex])}
                  alt={`${project.title?.[i18n.language] || project.title?.pt} - ${project.images[currentImageIndex]
                    .split("/")
                    .pop()
                    .replace(/\.(jpg|png|jpeg|webp)$/i, "")
                    .replace("-", " ")}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  onError={() => setImageError(true)}
                />
              ) : (
                /* Placeholder apenas se a imagem falhar */
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center max-w-md">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto flex items-center justify-center mb-4">
                      <Lightbulb
                        size={24}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Erro ao carregar imagem
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.images[currentImageIndex]
                        .split("/")
                        .pop()
                        .replace(/\.(jpg|png|jpeg|webp)$/i, "")
                        .replace("-", " ")}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Não foi possível carregar a imagem. Para fechar, clique no
                      X ou pressione ESC.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Controles de Navegação do Modal (se houver mais de 1 imagem) */}
              {project.images?.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all duration-300 z-50 flex items-center justify-center"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all duration-300 z-50 flex items-center justify-center"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
