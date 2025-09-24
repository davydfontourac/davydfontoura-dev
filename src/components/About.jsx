import { Code, Palette, Rocket, Users, Award, TrendingUp } from 'lucide-react'
import profileImage from '../assets/profile.jpg'

const About = () => {
  const skills = ['JavaScript', 'HTML', 'CSS', 'React', 'Vite', 'Tailwind CSS', 'Python', 'Git', 'GitHub', 'Excel']

  const stats = [
    { icon: Code, label: 'Projetos Concluídos', value: '15+' },
    { icon: Users, label: 'Clientes Satisfeitos', value: '8+' },
    { icon: Award, label: 'Anos de Experiência', value: '2+' },
    { icon: TrendingUp, label: 'Tecnologias Dominadas', value: '10+' }
  ]

  const highlights = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Design Moderno",
      description: "Interfaces atrativas e funcionais com foco na experiência do usuário"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Código Limpo",
      description: "Desenvolvimento seguindo as melhores práticas e padrões da indústria"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Performance",
      description: "Sites otimizados para carregamento rápido e boa experiência"
    }
  ]

  return (
    <section id="about" className="min-h-screen xl:w-[220vh] xl:mx-auto pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Sobre Mim
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Conheça um pouco mais sobre minha trajetória e paixão por tecnologia
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-46 h-46  mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-600 shadow-lg">
                  <img 
                    src={profileImage} 
                    alt="Davyd Fontoura" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Davyd Fontoura
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Desenvolvedor Front-End
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Especialista em criar experiências digitais modernas e funcionais
              </p>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Minha História
              </h3>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Sou um profissional formado pelo SENAI em Programação Front-End e atualmente curso Análise e Desenvolvimento de Sistemas, o que me permite unir uma base sólida em fundamentos da tecnologia com a prática constante de desenvolvimento. Tenho grande paixão por criar interfaces modernas, funcionais e acessíveis, sempre buscando alinhar estética, usabilidade e performance.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Nos últimos anos, venho me dedicando a projetos pessoais e freelances que me proporcionaram experiência prática no desenvolvimento de sites e aplicações, do planejamento até a entrega final. Minha principal especialidade é a construção de páginas web utilizando HTML, CSS e JavaScript, além de frameworks e ferramentas que potencializam o resultado, como React e Tailwind CSS.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Acredito que a tecnologia deve ser uma ponte para aproximar pessoas e simplificar processos. Por isso, encaro cada projeto como uma oportunidade de criar experiências digitais que tragam impacto real para usuários e empresas. Tenho como objetivo evoluir constantemente, aprender novas tecnologias e colaborar em equipes que compartilhem essa visão de inovação e crescimento.
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tecnologias que domino
                </h4>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
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
          ))}
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tecnologias & Ferramentas
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Principais tecnologias que utilizo no desenvolvimento de projetos modernos e eficientes
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {/* JavaScript */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#F7DF1E">
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">JavaScript</h4>
              </div>
            </div>

            {/* React */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#61DAFB">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.422.789-.606 1.188-.18-.398-.348-.797-.512-1.207-.16-.394-.312-.773-.45-1.141.572-.07 1.168-.128 1.792-.154.18-.02.368-.032.558-.046zm6.553.001c.195.016.38.032.555.047.635.025 1.235.086 1.81.152-.138.36-.89.747-.45 1.137-.18.418-.33.849-.51 1.207-.18-.397-.37-.797-.605-1.183-.225-.395-.455-.788-.713-1.16zm2.448 2.69c.18.25.346.5.486.748.14.25.272.5.382.75.114.25.214.498.302.747.018.05.032.098.05.147-.906.17-1.855.31-2.837.413-.18-.32-.338-.647-.472-.98.15-.292.302-.583.466-.869.18-.292.35-.594.537-.895.18-.298.35-.6.537-.9zm-9.77.02c.2.31.404.634.617.966.22.338.4.677.6 1.01-.12.334-.26.661-.41.984-.906-.097-1.858-.23-2.76-.398.18-.57.404-1.2.658-1.62.08-.14.162-.28.244-.42.185-.317.377-.635.588-.952.185-.303.366-.606.573-.906zm9.77 0c.18.295.346.6.486.906.14.305.272.61.382.906.114.295.214.59.302.894.018.058.032.117.05.175-.906.202-1.855.367-2.837.49-.18-.38-.338-.77-.472-1.167.15-.347.302-.694.466-1.03.18-.347.35-.704.537-1.06.18-.354.35-.714.537-1.07zm-9.94.88c.2.37.404.754.617 1.15.22.402.4.806.6 1.2-.12.397-.26.786-.41 1.17-.906-.115-1.858-.273-2.76-.473.18-.678.404-1.425.658-1.925.08-.166.162-.333.244-.5.185-.377.377-.754.588-1.13.185-.36.366-.72.573-1.078zm9.94 0c.18.35.346.714.486 1.078.14.363.272.726.382 1.078.114.35.214.7.302 1.063.018.069.032.139.05.208-.906.24-1.855.436-2.837.582-.18-.45-.338-.914-.472-1.39.15-.413.302-.826.466-1.226.18-.413.35-.838.537-1.26.18-.422.35-.85.537-1.26z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">React</h4>
              </div>
            </div>

            {/* HTML */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#E34F26">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">HTML5</h4>
              </div>
            </div>

            {/* CSS */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#1572B6">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CSS3</h4>
              </div>
            </div>

            {/* Tailwind CSS */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#06B6D4">
                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Tailwind</h4>
              </div>
            </div>

            {/* Python */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#3776AB">
                    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Python</h4>
              </div>
            </div>

            {/* Vite */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="viteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#41D1FF" />
                        <stop offset="100%" stopColor="#BD34FE" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#viteGradient)" d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14.294.294 0 0 1-.26-.16L9.038 12.22a.294.294 0 0 1 .253-.439l2.595-.3a.294.294 0 0 0 .238-.49L8.572 6.354a.294.294 0 0 1 .178-.524l2.845-.456a.294.294 0 0 0 .24-.491L8.286 10.578Z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Vite</h4>
              </div>
            </div>

            {/* Git */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#F05032">
                    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Git</h4>
              </div>
            </div>

            {/* GitHub */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#181717">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">GitHub</h4>
              </div>
            </div>

            {/* Excel */}
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#217346">
                    <path d="M21.231 0H2.769C1.24 0 0 1.24 0 2.769v18.462C0 22.76 1.24 24 2.769 24h18.462C22.76 24 24 22.76 24 21.231V2.769C24 1.24 22.76 0 21.231 0zM11.057 17.846H8.731l-1.6-4.923-1.569 4.923H3.23l2.769-8.308h2.4l2.658 8.308zm6.092-.354h-1.877V14.03h1.846v-1.4h-1.846v-2.77h1.877V8.492h-3.523v9H17.15v-1.4zm4.308-8.215c-.662 0-1.2.538-1.2 1.2s.538 1.2 1.2 1.2 1.2-.538 1.2-1.2-.538-1.2-1.2-1.2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Excel</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default About