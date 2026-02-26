import { useState, useEffect, useCallback } from 'react';
import { getProjectsFromNotion } from '../services/notion';

const CACHE_KEY = 'notion_projects_cache';

export const useNotionProjects = () => {
  // Inicializa o estado com o que estiver no LocalStorage para carregamento instantâneo
  const [projects, setProjects] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  });
  
  // Se já temos dados no cache, não precisamos mostrar o "loading" principal na entrada
  const [loading, setLoading] = useState(!projects.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Se não temos nada, liga o loading. Se temos cache, buscamos em background.
        if (projects.length === 0) setLoading(true);
        
        const data = await getProjectsFromNotion();
        setProjects(data);
        
        // Salva no LocalStorage para a próxima visita
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
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
