import profileImage from '../assets/profile.jpg'

const About = () => {
  const skills = ['JavaScript', 'HTML', 'CSS', 'React', 'Vite', 'Tailwind CSS', 'Python']

  return (
    <section id="about" className="min-h-screen xl:w-[220vh] xl:mx-auto pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Sobre Mim</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Conheça um pouco mais sobre minha trajetória e paixão por tecnologia
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg h-96 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-56 h-56 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={profileImage} 
                    alt="Davyd Fontoura" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="text-xl font-semibold">Davyd Fontoura</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Minha História</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
              Sou um profissional formado pelo SENAI em Programação Front-End e atualmente estou 
              cursando Análise e Desenvolvimento de Sistemas. Com paixão por criar interfaces 
              modernas e funcionais, venho desenvolvendo projetos pessoais e realizando freelances na área.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
              Minha especialidade é criação de páginas web utilizando principalmente HTML, CSS e JavaScript, 
              sempre focando em entregar soluções que combinam design atrativo com funcionalidade excepcional.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
              Acredito que a tecnologia deve ser acessível e que cada projeto é uma oportunidade 
              de criar experiências digitais que realmente façam a diferença na vida das pessoas.
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About