import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      navbar: {
        home: "Início",
        about: "Sobre",
        services: "Serviços",
        portfolio: "Projetos",
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
        experience_title: "Experiência Profissional",
        education_title: "Formação Acadêmica e Certificações",
        education: {
          degree1: {
            title: "Análise e Desenvolvimento de Sistemas",
            school: "Unisinos (Universidade do Vale do Rio dos Sinos) • Em andamento"
          },
          degree2: {
            title: "Programador Front-End",
            school: "SENAI • dez 2023 • 348h",
            desc: "Qualificação profissional em desenvolvimento de interfaces web client-side: planejamento, codificação, integração com serviços server-side e testes de qualidade."
          }
        },
        experience: {
          freelance: {
            title: "Desenvolvedor Front-end Freelancer",
            date: "2023 - Presente",
            desc: "Desenvolvimento de interfaces modernas, landing pages focadas em conversão e sistemas administrativos utilizando React, Vite e Tailwind CSS. Foco em performance web e arquitetura escalável associada a práticas de UI/UX fluídas."
          }
        },
        courses: {
          section_label: "Cursos complementares",
          accordion_label: "Alura — certificados verificáveis",
          terminal: {
            title: "Terminal: aprenda comandos para executar tarefas",
            school: "Alura • mai 2025",
            tags: ["Linux", "CLI", "Máquinas virtuais"]
          },
          redes: {
            title: "Redes: dos conceitos iniciais à criação de uma intranet",
            school: "Alura • mai 2025",
            tags: ["Roteamento", "Monitoramento", "Intranet"]
          },
          chatgpt: {
            title: "ChatGPT: desvendando a IA em conversas e suas aplicações",
            school: "Alura • jun 2025",
            tags: ["IA generativa", "Prompts"]
          }
        },
        cert_modal: {
          view_btn: "Ver certificado",
          open: "Abrir certificado original",
          close: "Fechar",
          preview_sensitive: "Prévia disponível — dados pessoais ocultados nesta visualização.",
          sensitive_note: "Dados pessoais ocultados",
          preview_verifiable: "Certificado verificável. Clique para abrir o original."
        },
        download_cv: "Download CV",
        stats: {
          projects: "Projetos Concluídos",
          clients: "Clientes Satisfeitos",
          experience: "Anos de Experiência",
          tech: "Tecnologias Dominadas"
        },
        tools_title: "Tecnologias & Ferramentas",
        tools_subtitle: "Stacks e bibliotecas monitoradas diretamente do package.json deste portfólio via GitHub API.",
        skills_subtitle: "As principais tecnologias que utilizo diariamente para construir soluções completas, além daquelas monitoradas ativamente do repositório via API.",
        tech_categories: {
          core: "Core",
          routing: "Roteamento",
          i18n: "Internacionalização",
          styling: "Estilização",
          build: "Build Tool",
          icons: "Ícones",
          tools: "Ferramentas",
          backend: "Backend",
          cms: "CMS"
        },
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
        subtitle: "Soluções digitais premium para necessidades reais",
        web_dev: {
          title: "Desenvolvimento Web",
          desc: "Criação de sites e aplicações web responsivas de alta performance.",
          items: ["Sites Institucionais", "Sistemas Web", "Arquitetura Escalável", "Código Otimizado"]
        },
        react: {
          title: "Interfaces React",
          desc: "Aplicações dinâmicas e interativas com ecossistema React.",
          items: ["Single Page Applications", "Gerenciamento de Estado", "Integração de APIs", "Componentes Reutilizáveis"]
        },
        landing: {
          title: "Landing Pages",
          desc: "Páginas otimizadas desenvolvidas com foco total na conversão.",
          items: ["Design para Conversão", "Alta Velocidade", "Copy Integrada", "Análise de Métricas"]
        },
        ui_ux: {
          title: "Design UI/UX",
          desc: "Prototipagem de interfaces focadas na usabilidade e fluidez.",
          items: ["User Research", "Wireframes", "Prototipagem Alta Fidelidade", "Testes de Usabilidade"]
        },
        opt: {
          title: "Setup Completo",
          desc: "Configuração de domínio, deploy contínuo (CI/CD) e hospedagem.",
          items: ["Deploy Automatizado", "Hospedagem em Nuvem", "Integração Contínua", "Gestão de Domínios"]
        },
        resp: {
          title: "Consultoria Tech",
          desc: "Análise técnica, auditoria de performance e orientação arquitetural.",
          items: ["Auditoria de Código", "Performance Web", "Acessibilidade", "Estratégia Tech"]
        },
        cta: "Vamos Conversar",
        featured_badge: "Mais Procurado",
        new_badge: "Novo"
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
        read_more: "Saiba mais",
        show_less: "Ver menos",
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
      },
      loading: "Carregando...",
      projectDetail: {
        backToPortfolio: "Voltar ao portfólio",
        portfolio: "Projetos",
        statusLabel: "Status",
        year: "Ano",
        duration: "Duração",
        role: "Função",
        client: "Cliente",
        liveSite: "Ver projeto online",
        githubCode: "Ver código",
        aboutProject: "Sobre o Projeto",
        techUsed: "Tecnologias Utilizadas",
        features: "Características Principais",
        relatedProjects: "Projetos Relacionados",
        projectGallery: "Galeria do Projeto",
        status: {
          completed: "Concluído",
          inProgress: "Em Produção",
          paused: "Pausado"
        }
      }
    }
  },
  en: {
    translation: {
      navbar: {
        home: "Home",
        about: "About",
        services: "Services",
        portfolio: "Projects",
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
        experience_title: "Professional Experience",
        education_title: "Education & Certifications",
        education: {
          degree1: {
            title: "Systems Analysis and Development",
            school: "Unisinos (Universidade do Vale do Rio dos Sinos) • In progress"
          },
          degree2: {
            title: "Front-End Programmer",
            school: "SENAI • Dec 2023 • 348h",
            desc: "Professional qualification in web client-side interface development: planning, coding, integration with server-side services and quality testing."
          }
        },
        experience: {
          freelance: {
            title: "Front-end Freelance Developer",
            date: "2023 - Present",
            desc: "Development of modern interfaces, conversion-focused landing pages and administrative systems using React, Vite and Tailwind CSS. Focus on web performance and scalable architecture combined with fluid UI/UX practices."
          }
        },
        courses: {
          section_label: "Additional courses",
          accordion_label: "Alura — verifiable certificates",
          terminal: {
            title: "Terminal: learn commands to run tasks",
            school: "Alura • May 2025",
            tags: ["Linux", "CLI", "Virtual machines"]
          },
          redes: {
            title: "Networks: from concepts to creating an intranet",
            school: "Alura • May 2025",
            tags: ["Routing", "Monitoring", "Intranet"]
          },
          chatgpt: {
            title: "ChatGPT: exploring AI in conversations and applications",
            school: "Alura • Jun 2025",
            tags: ["Generative AI", "Prompts"]
          }
        },
        cert_modal: {
          view_btn: "View certificate",
          open: "Open original certificate",
          close: "Close",
          preview_sensitive: "Preview available — personal data hidden in this view.",
          sensitive_note: "Personal data hidden",
          preview_verifiable: "Verifiable certificate. Click to open the original."
        },
        download_cv: "Download Resume",
        stats: {
          projects: "Completed Projects",
          clients: "Satisfied Clients",
          experience: "Years of Experience",
          tech: "Technologies Mastered"
        },
        tools_title: "Technologies & Tools",
        tools_subtitle: "Stacks and libraries monitored straight from this portfolio's package.json via GitHub API.",
        skills_subtitle: "The main technologies I use daily to build complete solutions, in addition to those actively monitored from the repository via API.",
        tech_categories: {
          core: "Core",
          routing: "Routing",
          i18n: "Internationalization",
          styling: "Styling",
          build: "Build Tool",
          icons: "Icons",
          tools: "Tools",
          backend: "Backend",
          cms: "CMS"
        },
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
        subtitle: "Premium digital solutions for real needs",
        web_dev: {
          title: "Web Development",
          desc: "Building high-performance responsive websites and web applications.",
          items: ["Corporate Websites", "Web Systems", "Scalable Architecture", "Optimized Code"]
        },
        react: {
          title: "React Interfaces",
          desc: "Dynamic and interactive applications built with the React ecosystem.",
          items: ["Single Page Applications", "State Management", "API Integrations", "Reusable Components"]
        },
        landing: {
          title: "Landing Pages",
          desc: "Optimized pages developed with total focus on conversion.",
          items: ["Design for Conversion", "High Speed", "Integrated Copy", "Metrics Analysis"]
        },
        ui_ux: {
          title: "UI/UX Design",
          desc: "Prototyping interfaces focused on best usability and fluidity.",
          items: ["User Research", "Wireframes", "High-Fidelity Prototypes", "Usability Testing"]
        },
        opt: {
          title: "Full Setup & Deploy",
          desc: "Domain configuration, continuous deployment (CI/CD) and hosting.",
          items: ["Automated Deploy", "Cloud Hosting", "Continuous Integration", "Domain Management"]
        },
        resp: {
          title: "Tech Consulting",
          desc: "Technical analysis, performance audits, and architectural guidance.",
          items: ["Code Audit", "Web Performance", "Accessibility", "Tech Strategy"]
        },
        cta: "Let's Talk",
        featured_badge: "Most Wanted",
        new_badge: "New"
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
        read_more: "Learn more",
        show_less: "Show less",
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
      },
      loading: "Loading...",
      projectDetail: {
        backToPortfolio: "Back to portfolio",
        portfolio: "Projects",
        statusLabel: "Status",
        year: "Year",
        duration: "Duration",
        role: "Role",
        client: "Client",
        liveSite: "View live project",
        githubCode: "View code",
        aboutProject: "About the Project",
        techUsed: "Technologies Used",
        features: "Key Features",
        relatedProjects: "Related Projects",
        projectGallery: "Project Gallery",
        status: {
          completed: "Completed",
          inProgress: "In Progress",
          paused: "Paused"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'pt',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
