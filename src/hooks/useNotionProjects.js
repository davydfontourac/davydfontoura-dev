import { useState, useEffect, useCallback } from 'react';
import { getProjectsFromNotion } from '../services/notion';

const CACHE_KEY = 'notion_projects_cache';
const CACHE_TIMESTAMP_KEY = 'notion_projects_cache_timestamp';
const CACHE_TTL = 50 * 60 * 1000; // 50 minutos (Notion URLs expiram em 60 min)

export const useNotionProjects = () => {
  // Inicializa o estado com o que estiver no LocalStorage para carregamento instantâneo
  const [projects, setProjects] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    const now = Date.now();

    if (cached && timestamp && (now - parseInt(timestamp) < CACHE_TTL)) {
      return JSON.parse(cached);
    }
    return [];
  });
  
  // Se já temos dados no cache válidos, não precisamos mostrar o "loading" principal na entrada
  const [loading, setLoading] = useState(!projects.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        const now = Date.now();
        const isCacheValid = cached && timestamp && (now - parseInt(timestamp) < CACHE_TTL);

        // Se o cache é válido e já carregamos dele no useState inicial, 
        // podemos pular o fetch se quisermos economizar API, 
        // mas aqui mantemos o fetch em background para garantir dados sempre frescos
        if (!isCacheValid) {
          if (projects.length === 0) setLoading(true);
        }
        
        const data = await getProjectsFromNotion();
        setProjects(data);
        
        // Salva no LocalStorage com timestamp para a próxima visita
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      } catch (err) {
        console.error("Failed to load projects from Notion:", err);
        // Só mostra erro se não tivermos nada no cache para exibir
        if (projects.length === 0) {
          setError(err.message || 'Erro ao carregar os projetos.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter helpers based on the loaded Notion data
  const getProjectBySlug = useCallback((slug) => {
    return projects.find(project => project.slug === slug);
  }, [projects]);

  const getProjectById = useCallback((id) => {
    return projects.find(project => project.id === id); // Notion IDs are generally strings (UUID)
  }, [projects]);

  const getRelatedProjects = useCallback((currentProjectId, limit = 3) => {
    return projects
      .filter(project => project.id !== currentProjectId)
      .slice(0, limit);
  }, [projects]);

  return { 
    projects, 
    loading, 
    error,
    getProjectBySlug,
    getProjectById,
    getRelatedProjects
  };
};
