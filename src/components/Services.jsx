import { MonitorSmartphone, Code2, Rocket, Paintbrush, Globe, Cpu, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ScrollReveal from './ScrollReveal'
import SectionTransition from './SectionTransition'

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      id: 'web_dev',
      icon: <Globe className="w-8 h-8" />,
      color: 'blue',
      badge: t('services.featured_badge'),
      items: t('services.web_dev.items', { returnObjects: true })
    },
    {
      id: 'react',
      icon: <Code2 className="w-8 h-8" />,
      color: 'sky',
      items: t('services.react.items', { returnObjects: true })
    },
    {
      id: 'landing',
      icon: <Rocket className="w-8 h-8" />,
      color: 'purple',
      badge: t('services.new_badge'),
      items: t('services.landing.items', { returnObjects: true })
    },
    {
      id: 'ui_ux',
      icon: <Paintbrush className="w-8 h-8" />,
      color: 'pink',
      items: t('services.ui_ux.items', { returnObjects: true })
    },
    {
      id: 'opt',
      icon: <Cpu className="w-8 h-8" />,
      color: 'emerald',
      items: t('services.opt.items', { returnObjects: true })
    },
    {
      id: 'resp',
      icon: <MonitorSmartphone className="w-8 h-8" />,
      color: 'orange',
      items: t('services.resp.items', { returnObjects: true })
    }
  ]

  // Mapa de cores para as classes do Tailwind (border, bg, text) dinâmicos
  const colorMap = {
     blue: 'border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white',
     sky: 'border-sky-500 text-sky-500 bg-sky-50 dark:bg-sky-500/10 group-hover:bg-sky-500 group-hover:text-white',
     purple: 'border-purple-500 text-purple-500 bg-purple-50 dark:bg-purple-500/10 group-hover:bg-purple-500 group-hover:text-white',
     pink: 'border-pink-500 text-pink-500 bg-pink-50 dark:bg-pink-500/10 group-hover:bg-pink-500 group-hover:text-white',
     emerald: 'border-emerald-500 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white',
     orange: 'border-orange-500 text-orange-500 bg-orange-50 dark:bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white',
  }

  const borderTopMap = {
     blue: 'before:bg-blue-500',
     sky: 'before:bg-sky-500',
     purple: 'before:bg-purple-500',
     pink: 'before:bg-pink-500',
     emerald: 'before:bg-emerald-500',
     orange: 'before:bg-orange-500',
  }

  return (
    <section 
      id="services" 
      className="min-h-screen pt-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-48 relative z-10">
        <ScrollReveal variant="fade-down" className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-6 pb-2">
             {t('services.title')}
          </h2>
          <div className="h-1 w-24 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            {t('services.subtitle')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {services.map((service, index) => (
            <ScrollReveal 
              key={service.id} 
              variant="fade-up" 
              delay={`${index * 100}ms`}
            >
              <div 
                 className={`relative glass p-8 flex flex-col h-full rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:content-[''] before:transition-all before:duration-300 ${borderTopMap[service.color]}`}
              >
                {/* Número Fantasma Decorativo */}
                <div className="absolute -right-4 -top-6 text-9xl font-black text-gray-50 dark:text-gray-800/30 select-none z-0 transform group-hover:scale-110 group-hover:-translate-x-2 transition-transform duration-500">
                   0{index + 1}
                </div>

                <div className="relative z-10 flex flex-col flex-grow">
                   {/* Topo do Card (Icone e Badge) */}
                   <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-xl transition-colors duration-300 ${colorMap[service.color]}`}>
                         {service.icon}
                      </div>
                      {service.badge && (
                         <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {service.badge}
                         </span>
                      )}
                   </div>

                   {/* Título e Descrição */}
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {t(`services.${service.id}.title`)}
                   </h3>
                   <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow">
                      {t(`services.${service.id}.desc`)}
                   </p>

                   {/* Lista de Entregáveis */}
                   <ul className="space-y-3 mb-8">
                      {Array.isArray(service.items) && service.items.map((item) => (
                         <li key={item} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                            <svg className={`w-5 h-5 mr-3 flex-shrink-0 text-${service.color}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                         </li>
                      ))}
                   </ul>

                   {/* CTA */}
                   <a 
                      href="#contact" 
                      className="inline-flex items-center text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-auto w-fit group/btn"
                   >
                      {t('services.cta')}
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                   </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <SectionTransition via="gray-50/50" toColor="to-white" height="h-48" className="z-20" />
      </div>
    </section>
  )
}

export default Services