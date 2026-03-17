import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Portfolio from './Portfolio';
import { useNotionProjects } from '../hooks/useNotionProjects';
import { useGithubRepos } from '../hooks/useGithubRepos';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../hooks/useNotionProjects', () => ({
  useNotionProjects: vi.fn(),
}));

vi.mock('../hooks/useGithubRepos', () => ({
  useGithubRepos: vi.fn(),
}));

describe('Portfolio Component', () => {
  it('should render projects and repos', () => {
    useNotionProjects.mockReturnValue({
      projects: [{ 
        id: '1', 
        slug: 'test', 
        title: { pt: 'Projeto Teste' }, 
        gradient: 'from-blue-500', 
        status: 'concluido',
        tech: ['React']
      }],
      loading: false,
      error: null,
    });

    useGithubRepos.mockReturnValue({
      repos: [{ id: '1', name: 'repo-test', html_url: '#', description: 'desc', language: 'JS' }],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
    
    expect(screen.getByText('portfolio.title')).toBeInTheDocument();
    expect(screen.getAllByText('Projeto Teste')[0]).toBeInTheDocument();
    expect(screen.getByText('repo-test')).toBeInTheDocument();
  });
});
