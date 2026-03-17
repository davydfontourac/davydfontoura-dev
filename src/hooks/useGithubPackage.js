import { useState, useEffect } from 'react';

// Constantes estáticas das tecnologias permitidas e seus meta-dados.
export const TECH_ALLOWLIST = [
  'eslint', 'i18next', 'lucide-react', 'next', 'postcss', 'react', 'tailwindcss', 'vite'
];

export const TECH_META = {
  'eslint': {
    name: 'ESLint',
    category: 'about.tech_categories.tools',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
    color: '#4B32C3'
  },
  'i18next': {
    name: 'i18next',
    category: 'about.tech_categories.i18n',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons/icons/i18next.svg',
    color: '#009688'
  },
  'lucide-react': {
    name: 'Lucide Icons',
    category: 'about.tech_categories.icons',
    iconUrl: 'https://lucide.dev/logo.light.svg',
    color: '#F05032' 
  },
  'next': {
    name: 'Next.js',
    category: 'about.tech_categories.core',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    color: '#000000'
  },
  'postcss': {
    name: 'PostCSS',
    category: 'about.tech_categories.styling',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postcss/postcss-original.svg',
    color: '#DD3A0A'
  },
  'react': {
    name: 'React',
    category: 'about.tech_categories.core',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB'
  },
  'tailwindcss': {
    name: 'Tailwind CSS',
    category: 'about.tech_categories.styling',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06B6D4'
  },
  'vite': {
    name: 'Vite',
    category: 'about.tech_categories.build',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    color: '#646CFF'
  }
};

export const useGithubPackage = (repoPath = 'davydfontourac/davydfontoura-dev') => {
  // Correção via desestruturação
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageJson = async () => {
      // 1. Tentar pegar do LocalStorage como cache simples (válido por 24h ex: simplificado)
      const cached = localStorage.getItem(`gh_pkg_v8_${repoPath}`);
      if (cached) {
        try {
          const parsedCache = JSON.parse(cached);
          // Opcional: checar validade do cache se necessário, aqui usaremos para sempre (ou overwrite no fetch)
          setTechs(parsedCache);
          setLoading(false);
        } catch (e) {
          console.error("Erro ao ler cache", e);
        }
      }

      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/repos/${repoPath}/contents/package.json`);
        
        if (!response.ok) {
           if(response.status === 403) throw new Error("Rate limit excedido da API do Github");
           throw new Error('Falha ao buscar package.json');
        }

        const data = await response.json();
        
        // O conteúdo vem em Base64
        const contentDecoded = atob(data.content);
        const pkg = JSON.parse(contentDecoded);
        
        const allDependencies = {
          ...(pkg.dependencies || {}),
          ...(pkg.devDependencies || {})
        };

        const filteredTechs = Object.keys(allDependencies)
          .filter(dep => TECH_ALLOWLIST.includes(dep))
          .map(dep => {
             const meta = TECH_META[dep] || { name: dep, category: 'about.tech_categories.tools', iconUrl: '', color: '#CCC' };
             return {
                id: dep,
                name: meta.name,
                version: allDependencies[dep].replace(/[\^~]/, ''), // Limpa char especial
                category: meta.category,
                iconUrl: meta.iconUrl,
                color: meta.color
             };
          });
        
        setTechs(filteredTechs);
        setError(null);
        
        // Atualiza Cache
        localStorage.setItem(`gh_pkg_v8_${repoPath}`, JSON.stringify(filteredTechs));

      } catch (err) {
        console.error('Erro na API do GitHub para package.json:', err);
        setError(err.message);
        // Se falhou mas tinha cache, usaremos o cache sem sobrescrever error totalmente p/ debug
      } finally {
        setLoading(false);
      }
    };

    fetchPackageJson();
  }, [repoPath]);

  return { techs, loading, error };
};
