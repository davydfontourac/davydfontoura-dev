import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectDetail from './ProjectDetail';
import { useNotionProjects } from '../hooks/useNotionProjects';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';

vi.mock('../hooks/useNotionProjects', () => ({
  useNotionProjects: vi.fn(),
}));

// Mock useSEO
vi.mock('../hooks/useSEO', () => ({
  default: vi.fn(),
}));

describe('ProjectDetail Component', () => {
  it('should render project details', () => {
    const mockProject = {
      id: '1',
      slug: 'test-project',
      title: { pt: 'Título Teste' },
      description: { pt: 'Descrição Teste' },
      categories: ['web'],
      status: 'concluido',
      year: '2024',
      role: { pt: 'Dev' },
      links: { live: '#', github: '#' },
      images: ['img1.jpg'],
      tech: ['React'],
      fullDescription: { pt: '<p>Texto</p>' }
    };

    useNotionProjects.mockReturnValue({
      loading: false,
      getProjectBySlug: () => mockProject,
      getRelatedProjects: () => [],
    });

    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/projeto/test-project']}>
          <Routes>
            <Route path="/projeto/:slug" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
    
    expect(screen.getAllByText('Título Teste')[0]).toBeInTheDocument();
    expect(screen.getByText('Descrição Teste')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    useNotionProjects.mockReturnValue({
      loading: true,
      getProjectBySlug: () => null,
      getRelatedProjects: () => [],
    });

    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/projeto/test-project']}>
          <Routes>
            <Route path="/projeto/:slug" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
    
    // Check loading spinner via class since there's no text
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('should render not found state', () => {
    useNotionProjects.mockReturnValue({
      loading: false,
      getProjectBySlug: () => null,
      getRelatedProjects: () => [],
    });

    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/projeto/test-project']}>
          <Routes>
            <Route path="/projeto/:slug" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Projeto não encontrado')).toBeInTheDocument();
    expect(screen.getByText('Voltar para o Início')).toBeInTheDocument();
  });

  it('should handle image modal interactions', () => {
    const mockProject = {
      id: '1',
      slug: 'test-project',
      title: { pt: 'Título Teste' },
      description: { pt: 'Descrição Teste' },
      categories: ['web'],
      status: 'concluido',
      images: ['img1.jpg', 'img2.jpg'],
      links: {},
    };

    useNotionProjects.mockReturnValue({
      loading: false,
      getProjectBySlug: () => mockProject,
      getRelatedProjects: () => [],
    });

    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/projeto/test-project']}>
          <Routes>
            <Route path="/projeto/:slug" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Find and click the main image to open modal using accessible role/aria-label
    const mainImageButton = screen.getByRole('button', { name: /Ampliar imagem: img1\.jpg/i });
    fireEvent.click(mainImageButton);

    // Image modal text "1 / 2" should be active
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    // The modal uses ChevronRight icon for next, let's grab the button containing it or just fire keyboard event
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('2 / 2')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByText('1 / 2')).not.toBeInTheDocument();
  });
});
