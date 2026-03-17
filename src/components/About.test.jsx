import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import About from './About';
import { useGithubPackage } from '../hooks/useGithubPackage';

vi.mock('../hooks/useGithubPackage', () => ({
  useGithubPackage: vi.fn(),
}));

describe('About Component', () => {
  it('should render project info and skills', () => {
    useGithubPackage.mockReturnValue({
      techs: [{ id: 'react', name: 'React', version: '18', category: 'core', iconUrl: '', color: '#000' }],
      loading: false,
      error: null,
    });

    render(<About />);
    
    expect(screen.getByText('about.title')).toBeInTheDocument();
    expect(screen.getByText('Davyd Fontoura')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('should render skeleton when loading', () => {
    useGithubPackage.mockReturnValue({
      techs: [],
      loading: true,
      error: null,
    });

    render(<About />);
    // Check if skeletons are rendered
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
