import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dicionários de Tradução diretamente no arquivo de configuração
const resources = {
  pt: {
    translation: {
      navbar: {
        home: "Início",
        about: "Sobre",
        services: "Serviços",
        portfolio: "Portfólio",
        contact: "Contato",
        welcome: "Seja Bem-Vindo(a)",
        menu: "Menu",
        theme: "Tema",
        toggle_theme: "Alternar modo escuro",
        language: "Idioma",
        toggle_language: "Mudar idioma",
        download_cv: "Download CV"
      },
      hero: {
        greeting: "Olá, eu sou",
        role: "Desenvolvedor Front-end",
        description: "Transformando ideias em experiências digitais memoráveis e interativas através de código limpo e design moderno.",
        cta_projects: "Ver Projetos",
        cta_contact: "Fale Comigo",
        cta_cv: "Baixar Currículo",
        cv_file: "/Curriculo_Davyd_Fontoura_PT.pdf"
      },
      about: {
        title: "Sobre Mim",
        subtitle: "Conheça um pouco mais sobre minha trajetória e paixão por tecnologia",
        profile_desc: "Especialista em criar experiências digitais modernas e funcionais",
        story_title: "Minha História",
        desc1: "Sou um profissional formado pelo SENAI em Programação Front-End e atualmente curso Análise e Desenvolvimento de Sistemas, o que me permite unir uma base sólida em fundamentos da tecnologia com a prática constante de desenvolvimento. Tenho grande paixão por criar interfaces modernas, funcionais e acessíveis, sempre buscando alinhar estética, usabilidade e performance.",
        desc2: "Nos últimos anos, venho me dedicando a projetos pessoais e freelances que me proporcionaram experiência prática no desenvolvimento de sites e aplicações, do planejamento até a entrega final. Minha principal especialidade é a construção de páginas web utilizando HTML, CSS e JavaScript, além de frameworks e ferramentas que potencializam o resultado, como React e Tailwind CSS.\n\nAcredito que a tecnologia deve ser uma ponte para aproximar pessoas e simplificar processos. Por isso, encaro cada projeto como uma oportunidade de criar experiências digitais que tragam impacto real para usuários e empresas. Tenho como objetivo evoluir constantemente, aprender novas tecnologias e colaborar em equipes que compartilhem essa visão de inovação e crescimento.",
        skills_title: "Tecnologias que domino",
        experience_title: "Experiência e Formação",
        education_title: "Formação Acadêmica e Certificações",
        education: {
          degree1: {
            title: "Análise e Desenvolvimento de Sistemas",
            school: "Unisinos (Universidade do Vale do Rio dos Sinos) • Em andamento"
          },
          degree2: {
            title: "Programação Front-End",
            school: "SENAI • Concluído"
          }
        },
        download_cv: "Download CV",
        stats: {
          projects: "Projetos Concluídos",
          clients: "Clientes Satisfeitos",
          experience: "Anos de Experiência",
          tech: "Tecnologias Dominadas"
        },
        tools_title: "Tecnologias & Ferramentas",
        tools_subtitle: "Principais tecnologias que utilizo no desenvolvimento de projetos modernos e eficientes",
        highlights: {
          design: {
            title: "Design Moderno",
            desc: "Interfaces atrativas e funcionais com foco na experiência do usuário"
          },
          code: {
            title: "Código Limpo",
            desc: "Desenvolvimento seguindo as melhores práticas e padrões da indústria"
          },
          performance: {
            title: "Performance",
            desc: "Sites otimizados para carregamento rápido e boa experiência"
          }
        }
      },
      services: {
        title: "Meus Serviços",
        subtitle: "Soluções completas para suas necessidades digitais",
        web_dev: {
          title: "Desenvolvimento Web",
          desc: "Criação de sites e aplicações web responsivas usando as tecnologias mais modernas do mercado."
        },
        react: {
          title: "Interfaces React",
          desc: "Aplicações dinâmicas e interativas com React"
        },
        landing: {
          title: "Landing Pages",
          desc: "Páginas otimizadas para conversão e performance"
        },
        ui_ux: {
          title: "Design UI/UX",
          desc: "Prototipagem e design de interfaces focadas na melhor experiência e usabilidade para o usuário final."
        },
        opt: {
          title: "Otimização (SEO)",
          desc: "Melhoria de performance e ranqueamento em motores de busca para maior visibilidade online."
        },
        resp: {
          title: "Design Responsivo",
          desc: "Interfaces que se adaptam perfeitamente a qualquer tamanho de tela, do mobile ao desktop."
        }
      },
      portfolio: {
        title: "Portfólio",
        subtitle: "Projetos desenvolvidos com foco em qualidade e experiência do usuário.",
        hover_hint_desktop: "✨ Passe o mouse nos cards para mais detalhes",
        hover_hint_mobile: "📱 Toque nos cards para mais detalhes",
        view_project: "Ver Projeto Completo",
        github_section_title: "Repositórios do GitHub",
        github_section_subtitle: "Outros projetos e experimentações open-source direto do meu GitHub.",
        github_view_repo: "Ver Repositório",
        github_stars: "Estrelas",
        github_forks: "Forks",
        status: {
          concluido: "Concluído",
          em_producao: "Em Produção",
          pausado: "Pausado"
        }
      },
      contact: {
        title: "Entre em Contato",
        subtitle: "Vamos conversar sobre o seu próximo projeto?",
        info_title: "Informações de Contato",
        send_title: "Envie uma Mensagem",
        location_title: "Localização",
        location: "Brasil",
        email_title: "E-mail",
        social_title: "Redes Sociais",
        form: {
          name: "Seu Nome",
          email: "Seu E-mail",
          message: "Sua Mensagem",
          send: "Enviar Mensagem",
          sending: "Enviando...",
          success: "Mensagem enviada com sucesso!",
          error: "Ocorreu um erro ao enviar. Tente novamente."
        }
      },
      footer: {
        rights: "Todos os direitos reservados.",
        made_with: "Feito com",
        by: "por"
      }
    }
  },
  en: {
    translation: {
      navbar: {
        home: "Home",
        about: "About",
        services: "Services",
        portfolio: "Portfolio",
        contact: "Contact",
        welcome: "Welcome",
        menu: "Menu",
        theme: "Theme",
        toggle_theme: "Toggle dark mode",
        language: "Language",
        toggle_language: "Change language",
        download_cv: "Resume"
      },
      hero: {
        greeting: "Hi, I am",
        role: "Front-end Developer",
        description: "Bridging the gap between ideas and digital reality through modern design and clean code.",
        cta_projects: "View Projects",
        cta_contact: "Contact Me",
        cta_cv: "Download Resume",
        cv_file: "/Resume_Davyd_Fontoura_EN.pdf"
      },
      about: {
        title: "About Me",
        subtitle: "Get to know more about my journey and passion for technology",
        profile_desc: "Specialist in creating modern and functional digital experiences",
        story_title: "My Story",
        desc1: "I'm a professional who graduated from SENAI in Front-End Programming and I'm currently studying Systems Analysis and Development, which allows me to combine a solid foundation in technology fundamentals with constant development practice. I have a great passion for creating modern, functional, and accessible interfaces, always seeking to align aesthetics, usability, and performance.",
        desc2: "In recent years, I have been dedicating myself to personal projects and freelance work that have provided me with practical experience in developing websites and applications, from planning to final delivery. My main specialty is building web pages using HTML, CSS, and JavaScript, as well as frameworks and tools that enhance the result, such as React and Tailwind CSS.\n\nI believe that technology should be a bridge to bring people closer and simplify processes. Therefore, I view each project as an opportunity to create digital experiences that bring real impact to users and companies. My goal is to constantly evolve, learn new technologies, and collaborate in teams that share this vision of innovation and growth.",
        skills_title: "Technologies I master",
        experience_title: "Experience & Education",
        education_title: "Education & Certifications",
        education: {
          degree1: {
            title: "Systems Analysis and Development",
            school: "Unisinos (Universidade do Vale do Rio dos Sinos) • In progress"
          },
          degree2: {
            title: "Front-End Programming",
            school: "SENAI • Completed"
          }
        },
        download_cv: "Download Resume",
        stats: {
          projects: "Completed Projects",
          clients: "Satisfied Clients",
          experience: "Years of Experience",
          tech: "Technologies Mastered"
        },
        tools_title: "Technologies & Tools",
        tools_subtitle: "Main technologies I use to build modern and efficient projects",
        highlights: {
          design: {
            title: "Modern Design",
            desc: "Attractive and functional interfaces focused on user experience"
          },
          code: {
            title: "Clean Code",
            desc: "Development following best practices and industry standards"
          },
          performance: {
            title: "Performance",
            desc: "Optimized sites for fast loading and great experience"
          }
        }
      },
      services: {
        title: "My Services",
        subtitle: "Complete solutions for your digital needs",
        web_dev: {
          title: "Web Development",
          desc: "Building responsive websites and web applications using top-tier modern technologies."
        },
        react: {
          title: "React Interfaces",
          desc: "Dynamic and interactive applications built with React"
        },
        landing: {
          title: "Landing Pages",
          desc: "Optimized pages for conversion and performance"
        },
        ui_ux: {
          title: "UI/UX Design",
          desc: "Prototyping and designing interfaces focused on the best experience and usability for the end user."
        },
        opt: {
          title: "Optimization (SEO)",
          desc: "Improving performance and search engine ranking to increase your online visibility."
        },
        resp: {
          title: "Responsive Design",
          desc: "Interfaces that perfectly adapt to any screen size, from mobile devices to desktop monitors."
        }
      },
      portfolio: {
        title: "Portfolio",
        subtitle: "Projects developed with a focus on quality and user experience.",
        hover_hint_desktop: "✨ Hover over the cards for more details",
        hover_hint_mobile: "📱 Tap the cards for more details",
        view_project: "View Full Project",
        github_section_title: "GitHub Repositories",
        github_section_subtitle: "Other projects and open-source experiments straight from my GitHub.",
        github_view_repo: "View Repository",
        github_stars: "Stars",
        github_forks: "Forks",
        status: {
          concluido: "Completed",
          em_producao: "In Progress",
          pausado: "Paused"
        }
      },
      contact: {
        title: "Get In Touch",
        subtitle: "Let's talk about your next project?",
        info_title: "Contact Information",
        send_title: "Send a Message",
        location_title: "Location",
        location: "Brazil",
        email_title: "Email",
        social_title: "Social Media",
        form: {
          name: "Your Name",
          email: "Your Email",
          message: "Your Message",
          send: "Send Message",
          sending: "Sending...",
          success: "Message sent successfully!",
          error: "An error occurred. Please try again."
        }
      },
      footer: {
        rights: "All rights reserved.",
        made_with: "Made with",
        by: "by"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // Idioma padrão 
    fallbackLng: 'en', // Se não encontrar no idioma atual, usa inglês
    interpolation: {
      escapeValue: false // O React já faz o escape seguro por padrão
    }
  });

export default i18n;
