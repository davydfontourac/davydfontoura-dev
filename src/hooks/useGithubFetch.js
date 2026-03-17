import { useState, useEffect } from 'react';

/**
 * Hook genérico para buscar dados da API do GitHub.
 * Centraliza o padrão useState/useEffect/fetch para evitar duplicação de código
 * entre useGithubRepos e useGithubPackage.
 *
 * @param {string} url - URL completa da API do GitHub.
 * @param {function} transformData - Função que transforma os dados da resposta antes de setar no state.
 * @param {object} options - Opções extras.
 * @param {string} options.cacheKey - Chave de localStorage para cache (opcional).
 * @param {boolean} options.enabled - Se false, não executa o fetch (default: true).
 */
export const useGithubFetch = (url, transformData, options = {}) => {
  const { cacheKey, enabled = true } = options;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !url) return;

    const fetchData = async () => {
      // Tentar cache
      if (cacheKey) {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          try {
            setData(JSON.parse(cached));
            setLoading(false);
          } catch (e) {
            console.error('Erro ao ler cache', e);
          }
        }
      }

      setLoading(true);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 403) throw new Error('Rate limit excedido da API do Github');
          throw new Error('Falha ao buscar dados do GitHub');
        }

        const rawData = await response.json();
        const transformed = transformData ? transformData(rawData) : rawData;

        setData(transformed);
        setError(null);

        if (cacheKey) {
          localStorage.setItem(cacheKey, JSON.stringify(transformed));
        }
      } catch (err) {
        console.error('Erro na API do GitHub:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, cacheKey, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
};
