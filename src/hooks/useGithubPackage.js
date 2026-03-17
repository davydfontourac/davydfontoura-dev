import { useGithubFetch } from './useGithubFetch';

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

const transformPackageData = (rawData) => {
  const contentDecoded = atob(rawData.content);
  const pkg = JSON.parse(contentDecoded);

  const allDependencies = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {})
  };

  return Object.keys(allDependencies)
    .filter(dep => TECH_ALLOWLIST.includes(dep))
    .map(dep => {
      const meta = TECH_META[dep] || { name: dep, category: 'about.tech_categories.tools', iconUrl: '', color: '#CCC' };
      return {
        id: dep,
        name: meta.name,
        version: allDependencies[dep].replace(/[\^~]/, ''),
        category: meta.category,
        iconUrl: meta.iconUrl,
        color: meta.color
      };
    });
};

export const useGithubPackage = (repoPath = 'davydfontourac/davydfontoura-dev') => {
  const url = `https://api.github.com/repos/${repoPath}/contents/package.json`;

  const { data: techs, loading, error } = useGithubFetch(url, transformPackageData, {
    cacheKey: `gh_pkg_v8_${repoPath}`
  });

  return { techs, loading, error };
};
