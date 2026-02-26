import { useState, useEffect } from 'react';

export const useGithubRepos = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
          throw new Error('Falha ao buscar repositórios');
        }
        
        const data = await response.json();
        
        // Remove forks para mostrar apenas projetos originais
        const originalRepos = data.filter(repo => !repo.fork);
        
        setRepos(originalRepos);
        setError(null);
      } catch (err) {
        console.error('Erro na API do GitHub:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username]);

  return { repos, loading, error };
};
