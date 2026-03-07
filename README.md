# 🌟 Portfólio Pessoal - Davyd Fontoura

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38BDF8?logo=tailwindcss&logoColor=white&style=flat-square) ![Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel&logoColor=white&style=flat-square) ![Notion](https://img.shields.io/badge/Notion-CMS-000000?logo=notion&logoColor=white&style=flat-square) ![i18n](https://img.shields.io/badge/i18n-PT%20%7C%20EN-green?style=flat-square) ![Express](https://img.shields.io/badge/Express-Proxy-000000?logo=express&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

Um portfólio de alta performance, moderno e multilíngue para desenvolvedores, integrado dinamicamente ao Notion como CMS.

## 📋 Sobre o Projeto

Este é meu portfólio profissional, reconstruído para oferecer a melhor experiência de usuário e facilidade de manutenção. Utilizo o **Notion** como painel administrativo para gerenciar projetos em tempo real sem precisar mexer no código, suportando internacionalização completa (PT/EN) e otimizações de carregamento de última geração.

### ✨ Funcionalidades Avançadas

- 🌏 **Multi-idioma (i18n)**: Suporte nativo para Português e Inglês com troca dinâmica.
- 🚀 **Notion como CMS**: Gerenciamento de projetos, imagens, categorias e detalhes técnicos via Notion API.
- 🏎️ **Alta Performance**:
  - **SWR (Stale-While-Revalidate)**: Carregamento instantâneo de projetos via LocalStorage.
  - **Server-Side Cache**: Proxy server com cache de 5 minutos para evitar latência da API do Notion.
  - **Cache Warm-up**: Sistema que "aquece" os dados assim que o servidor inicia.
- 🎨 **UI/UX Premium**:
  - **Efeito Frosted Glass**: Header de projeto fixo com desfoque translúcido.
  - **Shimmer Loading**: Skeleton screens com efeito de luz para imagens em carregamento.
  - **Transições Suaves**: Animações de fade-in e escala ao carregar projetos e imagens.
- 🌙 **Modo Escuro/Claro**: Alternância inteligente com persistência e animações.

### 🏗️ Estrutura de Seções

1. **Home** - Hero com introdução e download de currículo bilingue.
2. **Sobre** - Trajetória profissional e tecnologias.
3. **Serviços** - Soluções oferecidas em desenvolvimento web.
4. **Projetos** - Galeria dinâmica filtrada e carregada via Notion.
5. **Detalhes do Projeto** - Página dedicada com galeria de imagens, tecnologias, links externos e projetos relacionados.

## 🚀 Tecnologias Utilizadas

- **Core:** React 19, Vite, React Router DOM 7.
- **Estilização:** Tailwind CSS 3, Lucide React (Ícones).
- **Integração & i18n:** Notion API (v2.2), i18next, Express (Proxy Server).
- **Performance:** Sharp (Otimização de imagens), LocalStorage Cache.

## 📦 Instalação e Execução

### 1. Clonando o repositório
```bash
git clone https://github.com/davydfontourac/davydfontoura-dev.git

cd davydfontoura-dev
```

### 2. Configurações (.env.local)
Crie um arquivo `.env.local` na raiz com suas chaves do Notion:
```env
VITE_NOTION_API_KEY=seu_token_aqui
VITE_NOTION_DATABASE_ID=seu_id_do_banco_aqui
```

### 3. Rodando em Desenvolvimento
```bash
npm install
npm run dev
```

## 🗂️ Estrutura do Projeto

```
src/
├── components/          # Componentes principais (Navbar, Portfolio, ProjectDetail)
├── config/              # Configurações globais (i18n.js)
├── contexts/           # Contextos React (ThemeContext)
├── hooks/             # Custom Hooks (useNotionProjects, useTheme, useGithub)
├── services/          # Integração com APIs externas (notion.js)
├── utils/             # Helpers e utilitários de imagem
├── App.jsx            # Roteamento e estrutura base
└── main.jsx           # Ponto de entrada
scripts/               # Scripts de proxy, warm-up e otimização de imagens
```

## 👨‍💻 Autor

**Davyd Fontoura Camargo**

- GitHub: [@davydfontourac](https://github.com/davydfontourac)
- LinkedIn: [Davyd Camargo](https://www.linkedin.com/in/davyd-camargo-70a552261/)
- Email: davydfontoura@gmail.com

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
