import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from './Hero';
import { ThemeContext } from '../contexts/ThemeContext';

describe('Hero Component', () => {
  const mockNavigateToSection = vi.fn();

  it('should render the greeting and name', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light' }}>
        <Hero navigateToSection={mockNavigateToSection} />
      </ThemeContext.Provider>
    );
    
    expect(screen.getByText('hero.greeting')).toBeInTheDocument();
    expect(screen.getByText('Davyd Fontoura')).toBeInTheDocument();
  });

  it('should call navigateToSection when projects button is clicked', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light' }}>
        <Hero navigateToSection={mockNavigateToSection} />
      </ThemeContext.Provider>
    );
    
    const projectsButton = screen.getByText('hero.cta_projects');
    fireEvent.click(projectsButton);
    
    expect(mockNavigateToSection).toHaveBeenCalledWith('portfolio');
  });

  it('should call navigateToSection when scroll button is clicked', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light' }}>
        <Hero navigateToSection={mockNavigateToSection} />
      </ThemeContext.Provider>
    );
    
    const scrollButton = screen.getByLabelText('Scroll to About section');
    fireEvent.click(scrollButton);
    
    expect(mockNavigateToSection).toHaveBeenCalledWith('about');
  });
});
