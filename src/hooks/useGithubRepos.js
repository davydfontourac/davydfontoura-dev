import { useGithubFetch } from './useGithubFetch';

export const useGithubRepos = (username) => {
  const url = username
    ? `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    : null;

  const transformData = (data) => data.filter(repo => !repo.fork);

  const { data: repos, loading, error } = useGithubFetch(url, transformData, {
    enabled: !!username
  });

  return { repos, loading, error };
};
