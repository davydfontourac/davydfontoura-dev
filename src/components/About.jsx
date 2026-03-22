import { useState } from 'react'
import { Code, Calendar, Briefcase, GraduationCap, ExternalLink, FileText, X, ChevronDown, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import profileImage from '../assets/profile.webp'
import { useGithubPackage } from '../hooks/useGithubPackage'
import ScrollReveal from './ScrollReveal'

// Dados dos certificados — atualize os links conforme necessário
const CERTIFICATES = {
  senai: {
    titleKey: 'about.education.degree2.title',
    subKey:   'about.education.degree2.school',
    sensitive: true,
    link: 'https://drive.google.com/file/d/1mh9PB2rEvflPGvFutq72v9bOHtxljueW/view',
  },
  terminal: {
    titleKey: 'about.courses.terminal.title',
    subKey:   'about.courses.terminal.school',
    sensitive: false,
    link: 'https://cursos.alura.com.br/certificate/6680d9e1-fe05-4138-ac0e-4683e585712c?lang',
  },
  redes: {
    titleKey: 'about.courses.redes.title',
    subKey:   'about.courses.redes.school',
    sensitive: false,
    link: 'https://cursos.alura.com.br/certificate/fb61dfb0-7f90-4a05-9d96-31de6bbd08a4?lang',
  },
  chatgpt: {
    titleKey: 'about.courses.chatgpt.title',
    subKey:   'about.courses.chatgpt.school',
    sensitive: false,
    link: 'https://cursos.alura.com.br/certificate/3cdd3d21-9be6-4c8d-b2fb-9acad8dfb269?lang',
  },
}

// Modal de certificado
const CertificateModal = ({ certId, onClose, t }) => {
  const cert = CERTIFICATES[certId]
  if (!cert) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay - Botão para fechar ao clicar fora */}
      <button
        className="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Fechar modal"
        title="Fechar modal"
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-100 dark:border-gray-700 shadow-2xl z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h5 className="font-bold text-gray-900 dark:text-white text-base leading-snug">
              {t(cert.titleKey)}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t(cert.subKey)}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-5 mb-4 border border-gray-100 dark:border-gray-700">
          {cert.sensitive ? (
            <>
              {/* Simulação visual do certificado com dados ocultados */}
              <div className="flex flex-col items-center gap-3 mb-3">
                {/* Logo bar */}
                <div className="w-20 h-3 bg-green-200 dark:bg-green-900/50 rounded-full" />
                {/* Título certificado */}
                <div className="w-32 h-5 bg-gray-300 dark:bg-gray-600 rounded-md" />
                {/* Texto institucional */}
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
                {/* Nome */}
                <div className="w-3/4 h-3 bg-gray-400 dark:bg-gray-500 rounded-full" />
                {/* Linha com dado sensível (RG) */}
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="w-24 h-4 bg-amber-200 dark:bg-amber-900/60 rounded border border-dashed border-amber-400 dark:border-amber-600" />
                </div>
                {/* Linha com dado sensível (CPF) */}
                <div className="flex items-center gap-2 w-full">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="w-28 h-4 bg-amber-200 dark:bg-amber-900/60 rounded border border-dashed border-amber-400 dark:border-amber-600" />
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
                {/* Curso */}
                <div className="w-2/3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
                {/* Assinatura */}
                <div className="w-16 h-8 border-b-2 border-gray-300 dark:border-gray-600 mt-1" />
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800 w-fit mx-auto">
                <Lock className="w-3 h-3" />
                {t('about.cert_modal.sensitive_note')}
              </div>
            </>
          ) : (
            <>
              {/* Simulação visual do certificado Alura */}
              <div className="flex flex-col items-center gap-3 mb-3">
                <div className="w-20 h-3 bg-blue-200 dark:bg-blue-900/50 rounded-full" />
                <div className="w-32 h-5 bg-gray-300 dark:bg-gray-600 rounded-md" />
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="w-3/4 h-3 bg-gray-400 dark:bg-gray-500 rounded-full" />
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="w-2/3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <div className="w-16 h-8 border-b-2 border-gray-300 dark:border-gray-600 mt-1" />
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 w-fit mx-auto">
                <FileText className="w-3 h-3" />
                {t('about.cert_modal.preview_verifiable')}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {t('about.cert_modal.open')}
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {t('about.cert_modal.close')}
          </button>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  const { t } = useTranslation()
  const { techs, loading: techsLoading } = useGithubPackage()
  const [modalCert, setModalCert] = useState(null)
  const [accordionOpen, setAccordionOpen] = useState(false)

  const additionalSkills = [
    { id: 'html',       name: 'HTML5',      category: 'about.tech_categories.core',    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',           color: '#E34F26', version: '5' },
    { id: 'css',        name: 'CSS3',       category: 'about.tech_categories.styling', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',             color: '#1572B6', version: '3' },
    { id: 'js',         name: 'JavaScript', category: 'about.tech_categories.core',    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', color: '#F7DF1E', version: 'ES6+' },
    { id: 'supabase',   name: 'Supabase',   category: 'about.tech_categories.backend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',     color: '#3ECF8E', version: 'BaaS' },
    { id: 'wordpress',  name: 'WordPress',  category: 'about.tech_categories.cms',     iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg',   color: '#21759B', version: '6.x' },
    { id: 'express',    name: 'Express',    category: 'about.tech_categories.core',    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',       color: '#000000', version: '4.x' },
    { id: 'git',        name: 'Git',        category: 'about.tech_categories.tools',   iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',               color: '#F05032', version: 'CLI' },
    { id: 'github_tool',name: 'GitHub',     category: 'about.tech_categories.tools',   iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',         color: '#181717', version: 'Web' },
    { id: 'vercel',     name: 'Vercel',     category: 'about.tech_categories.tools',   iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',         color: '#000000', version: 'Cloud' },
    { id: 'node',       name: 'Node.js',    category: 'about.tech_categories.backend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',         color: '#339933', version: 'v20+' },
    { id: 'next',       name: 'Next.js',    category: 'about.tech_categories.core',    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',         color: '#000000', version: 'v14+' },
  ]

  const allSkills = [...techs, ...additionalSkills.filter(s => !techs.some(tech => tech.name === s.name))]
    .sort((a, b) => a.name.localeCompare(b.name))

  const skeletonArray = Array(12).fill(0)

  // TimelineItem agora suporta prop opcional certId para exibir botão de certificado
  const TimelineItem = ({ title, subtitle, date, description, dotColor = 'blue', certId }) => {
    const dotClasses = dotColor === 'blue'
      ? 'border-blue-500 dark:border-blue-400 group-hover:bg-blue-500'
      : 'border-green-500 dark:border-green-400 group-hover:bg-green-500'
    const badgeClasses = dotColor === 'blue'
      ? 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40'
      : 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40'

    return (
      <div className="relative pl-8 group">
        <span className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-2 ${dotClasses} group-hover:scale-125 transition-all duration-300`}></span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <h5 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h5>
          {date && (
            <span className={`flex items-center text-xs font-bold ${badgeClasses} px-3 py-1 rounded-full w-fit`}>
              <Calendar className="w-3.5 h-3.5 mr-1" /> {date}
            </span>
          )}
        </div>
        {subtitle && (
          <div className="flex flex-col mb-2">
            <span className={`${dotColor === 'blue' ? 'text-blue-700 dark:text-blue-400' : 'text-green-700 dark:text-green-400'} font-medium`}>
              {subtitle}
            </span>
          </div>
        )}
        {description && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{description}</p>
        )}
        {certId && (
          <button
            onClick={() => setModalCert(certId)}
            className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 px-3 py-1.5 rounded-lg transition-colors bg-transparent"
          >
            <FileText className="w-3.5 h-3.5" />
            {t('about.cert_modal.view_btn')}
          </button>
        )}
      </div>
    )
  }

  // Item compacto usado dentro do accordion
  const CourseItem = ({ titleKey, schoolKey, tags, certId }) => (
    <div className="py-3 border-b border-gray-100 dark:border-gray-700/60 last:border-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{t(titleKey)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t(schoolKey)}</p>
          {tags && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {certId && (
          <button
            onClick={() => setModalCert(certId)}
            className="shrink-0 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 px-2.5 py-1 rounded-lg transition-colors bg-transparent"
          >
            <FileText className="w-3 h-3" />
            {t('about.cert_modal.view_btn')}
          </button>
        )}
      </div>
    </div>
  )

  return (
    <section
      id="about"
      className="min-h-screen pt-32 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Modal */}
      {modalCert && (
        <CertificateModal certId={modalCert} onClose={() => setModalCert(null)} t={t} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-48">
        {/* Header */}
        <ScrollReveal variant="fade-down" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            {t('about.subtitle')}
          </p>
        </ScrollReveal>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-12 mb-16">
          {/* Left Column: Profile */}
          <ScrollReveal variant="fade-right" className="w-full xl:w-4/12">
            <div className="glass rounded-3xl p-8 text-center shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden group h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply dark:mix-blend-normal blur-2xl animate-blob"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-normal blur-2xl animate-blob animation-delay-2000"></div>
              <div className="relative mb-6 z-10 block">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl ring-4 ring-blue-50 dark:ring-gray-800 transition-transform duration-500 group-hover:scale-105">
                  <img src={profileImage} alt="Davyd Fontoura" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-lg animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">Davyd Fontoura</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4 relative z-10">{t('hero.role')}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative z-10">{t('about.profile_desc')}</p>
            </div>
          </ScrollReveal>

          {/* Right Column: Story */}
          <ScrollReveal variant="fade-left" className="w-full xl:w-8/12">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700 shadow-sm h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-5 dark:opacity-10 pointer-events-none text-blue-500">
                <Code className="w-64 h-64" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 relative z-10">{t('about.story_title')}</h3>
              <div className="prose prose-lg dark:prose-invert max-w-none relative z-10">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">{t('about.desc1')}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{t('about.desc2')}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Middle Section: Timeline (Experience & Education) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Experience */}
          <ScrollReveal variant="fade-right" className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm backdrop-blur-sm">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              {t('about.experience_title')}
            </h4>
            <div className="relative border-l-2 border-blue-200 dark:border-gray-700 ml-4 space-y-10">
              <TimelineItem
                title={t('about.experience.freelance.title')}
                date={t('about.experience.freelance.date')}
                description={t('about.experience.freelance.desc')}
                dotColor="blue"
              />
            </div>
          </ScrollReveal>

          {/* Education */}
          <ScrollReveal variant="fade-left" className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm backdrop-blur-sm">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              {t('about.education_title')}
            </h4>
            <div className="relative border-l-2 border-green-200 dark:border-gray-700 ml-4 space-y-10">
              {/* UNISINOS */}
              <TimelineItem
                title={t('about.education.degree1.title')}
                subtitle={t('about.education.degree1.school')}
                dotColor="green"
              />

              {/* SENAI com botão de certificado */}
              <TimelineItem
                title={t('about.education.degree2.title')}
                subtitle={t('about.education.degree2.school')}
                description={t('about.education.degree2.desc')}
                dotColor="green"
                certId="senai"
              />

              {/* Accordion: Cursos complementares */}
              <div className="relative pl-8">
                <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-green-400"></span>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  {t('about.courses.section_label')}
                </p>

                {/* Trigger */}
                <button
                  onClick={() => setAccordionOpen(o => !o)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors text-left"
                >
                  <FileText className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">{t('about.courses.accordion_label')}</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">3</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${accordionOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Body */}
                <div className={`overflow-hidden transition-all duration-300 ${accordionOpen ? 'max-h-96 mt-2' : 'max-h-0'}`}>
                  <div className="bg-white dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700 px-4 py-1">
                    <CourseItem
                      titleKey="about.courses.terminal.title"
                      schoolKey="about.courses.terminal.school"
                      tags={t('about.courses.terminal.tags', { returnObjects: true })}
                      certId="terminal"
                    />
                    <CourseItem
                      titleKey="about.courses.redes.title"
                      schoolKey="about.courses.redes.school"
                      tags={t('about.courses.redes.tags', { returnObjects: true })}
                      certId="redes"
                    />
                    <CourseItem
                      titleKey="about.courses.chatgpt.title"
                      schoolKey="about.courses.chatgpt.school"
                      tags={t('about.courses.chatgpt.tags', { returnObjects: true })}
                      certId="chatgpt"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Section: Dynamic Skills Grid */}
        <ScrollReveal variant="fade-up" className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('about.skills_title')}</h4>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">{t('about.skills_subtitle')}</p>
            </div>
            <a
              href="https://github.com/davydfontourac/davydfontoura-dev/blob/main/package.json"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-fit font-medium"
            >
              package.json <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
            {techsLoading ? (
              skeletonArray.map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-32 border border-gray-200 dark:border-gray-700"></div>
              ))
            ) : (
              allSkills.map((tech, idx) => (
                <ScrollReveal key={tech.id} variant="zoom" delay={`${idx * 50}ms`}>
                  <div className="group relative bg-gray-50 dark:bg-gray-800/80 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center gap-4 text-center overflow-hidden h-full">
                    <div className="absolute -top-4 opacity-0 group-hover:opacity-100 group-hover:top-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-lg transition-all duration-300 z-10 pointer-events-none">
                      v{tech.version}
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <img src={tech.iconUrl} alt={tech.name} className="max-w-full max-h-full object-contain filter drop-shadow-sm" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{tech.name}</h5>
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mt-1 block">
                        {t(tech.category)}
                      </span>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 h-1 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-80"
                      style={{ backgroundColor: tech.color }}
                    ></div>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default About
