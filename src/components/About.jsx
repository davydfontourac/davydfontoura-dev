import { Code, Palette, Rocket, Users, Award, TrendingUp, Calendar, Briefcase, GraduationCap, ChevronRight, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import profileImage from '../assets/profile.webp'
import { useGithubPackage } from '../hooks/useGithubPackage'
import ScrollReveal from './ScrollReveal'

const About = () => {
  const { t } = useTranslation();
  const { techs, loading: techsLoading } = useGithubPackage();
  
  const additionalSkills = [
    { id: 'html', name: 'HTML5', category: 'about.tech_categories.core', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', color: '#E34F26', version: '5' },
    { id: 'css', name: 'CSS3', category: 'about.tech_categories.styling', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', color: '#1572B6', version: '3' },
    { id: 'js', name: 'JavaScript', category: 'about.tech_categories.core', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', color: '#F7DF1E', version: 'ES6+' },
    { id: 'python', name: 'Python', category: 'about.tech_categories.core', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color: '#3776AB', version: '3.x' },
    { id: 'git', name: 'Git', category: 'about.tech_categories.tools', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', color: '#F05032', version: 'CLI' },
    { id: 'github_tool', name: 'GitHub', category: 'about.tech_categories.tools', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', color: '#181717', version: 'Web' },
    { id: 'excel', name: 'Excel', category: 'about.tech_categories.tools', iconUrl: 'https://cdn.worldvectorlogo.com/logos/excel-4.svg', color: '#217346', version: 'Advanced' }
  ];

  const allSkills = [...techs, ...additionalSkills.filter(s => !techs.find(t => t.name === s.name))];

  // Array provisório para simular skeleton
  const skeletonArray = Array(12).fill(0);

  const stats = [
    { icon: Code, label: t('about.stats.projects'), value: '15+' },
    { icon: Users, label: t('about.stats.clients'), value: '8+' },
    { icon: Award, label: t('about.stats.experience'), value: '2+' },
    { icon: TrendingUp, label: t('about.stats.tech'), value: '10+' }
  ]

  const highlights = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: t('about.highlights.design.title'),
      description: t('about.highlights.design.desc')
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: t('about.highlights.code.title'),
      description: t('about.highlights.code.desc')
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: t('about.highlights.performance.title'),
      description: t('about.highlights.performance.desc')
    }
  ]

  return (
    <section 
      id="about" 
      className="min-h-screen pt-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group h-full flex flex-col justify-center">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 dark:opacity-40 animate-blob"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 dark:opacity-40 animate-blob animation-delay-2000"></div>

              <div className="relative mb-6 z-10 block">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl ring-4 ring-blue-50 dark:ring-gray-800 transition-transform duration-500 group-hover:scale-105">
                  <img 
                    src={profileImage} 
                    alt="Davyd Fontoura" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-lg animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">
                Davyd Fontoura
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4 relative z-10">
                {t('hero.role')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative z-10">
                {t('about.profile_desc')}
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column: Story Text */}
          <ScrollReveal variant="fade-left" className="w-full xl:w-8/12">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700 shadow-sm h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-5 dark:opacity-10 pointer-events-none text-blue-500">
                 <Code className="w-64 h-64" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 relative z-10">
                {t('about.story_title')}
              </h3>
              
              <div className="prose prose-lg dark:prose-invert max-w-none relative z-10">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                  {t('about.desc1')}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {t('about.desc2')}
                </p>
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
                 {/* Timeline Item 1 */}
                 <div className="relative pl-8 group">
                    <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 group-hover:scale-125 group-hover:bg-blue-500 transition-all duration-300"></span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                       <h5 className="text-lg font-bold text-gray-900 dark:text-white">{t('about.experience.freelance.title')}</h5>
                       <span className="flex items-center text-xs text-blue-700 dark:text-blue-300 font-bold bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full w-fit">
                          <Calendar className="w-3.5 h-3.5 mr-1" /> {t('about.experience.freelance.date')}
                       </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                       {t('about.experience.freelance.desc')}
                    </p>
                 </div>
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
                 {/* Timeline Item 1 (University) */}
                 <div className="relative pl-8 group">
                    <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-green-400 group-hover:scale-125 group-hover:bg-green-500 transition-all duration-300"></span>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                       <h5 className="text-lg font-bold text-gray-900 dark:text-white">{t('about.education.degree1.title')}</h5>
                    </div>
                    <div className="flex flex-col mb-2">
                       <span className="text-green-700 dark:text-green-400 font-medium">{t('about.education.degree1.school')}</span>
                    </div>
                 </div>

                 {/* Timeline Item 2 (SENAI) */}
                 <div className="relative pl-8 group">
                    <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-green-400 group-hover:scale-125 group-hover:bg-green-500 transition-all duration-300"></span>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                       <h5 className="text-lg font-bold text-gray-900 dark:text-white">{t('about.education.degree2.title')}</h5>
                    </div>
                    <div className="flex flex-col mb-2">
                       <span className="text-green-700 dark:text-green-400 font-medium">{t('about.education.degree2.school')}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                       {t('about.education.degree2.desc')}
                    </p>
                 </div>
              </div>
           </ScrollReveal>
        </div>

        {/* Bottom Section: Dynamic Skills Grid */}
        <ScrollReveal variant="fade-up" className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm mb-16">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                 <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('about.skills_title')}
                 </h4>
                 <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    {t('about.skills_subtitle')}
                 </p>
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
                    <ScrollReveal 
                      key={tech.id} 
                      variant="zoom" 
                      delay={`${idx * 50}ms`}
                    >
                      <div className="group relative bg-gray-50 dark:bg-gray-800/80 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center gap-4 text-center overflow-hidden h-full">
                         {/* Versão Tooltip */}
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
                         
                         {/* Decorative bottom line */}
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

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} variant="fade-up" delay={`${index * 100}ms`}>
              <div className="text-center h-full">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <ScrollReveal key={index} variant="fade-up" delay={`${index * 150}ms`}>
              <div className="group h-full">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 h-full">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {highlight.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About