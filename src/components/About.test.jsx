import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import About from './About';
import { useGithubPackage } from '../hooks/useGithubPackage';

vi.mock('../hooks/useGithubPackage', () => ({
  useGithubPackage: vi.fn(),
}));

describe('About Component', () => {
  const mockTechs = [
    { id: 'react', name: 'React', version: '18', category: 'about.tech_categories.core', iconUrl: 'react.svg', color: '#61DAFB' },
    { id: 'node', name: 'Node.js', version: '20', category: 'about.tech_categories.backend', iconUrl: 'node.svg', color: '#339933' }
  ];

  it('should render project info and skills', () => {
    useGithubPackage.mockReturnValue({
      techs: mockTechs,
      loading: false,
      error: null,
    });

    render(<About />);
    
    expect(screen.getByText('about.title')).toBeInTheDocument();
    expect(screen.getByText('Davyd Fontoura')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('should render skeleton when loading', () => {
    useGithubPackage.mockReturnValue({
      techs: [],
      loading: true,
      error: null,
    });

    render(<About />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should toggle accordion when clicked', () => {
    useGithubPackage.mockReturnValue({
      techs: mockTechs,
      loading: false,
      error: null,
    });

    render(<About />);
    
    const accordionBtn = screen.getByText('about.courses.accordion_label').closest('button');
    expect(accordionBtn).toBeInTheDocument();

    // Accordion should be closed by default
    const accordionContent = screen.getByText('about.courses.terminal.title').closest('.overflow-hidden');
    expect(accordionContent).toHaveClass('max-h-0');

    // Click to open
    fireEvent.click(accordionBtn);
    expect(accordionContent).toHaveClass('max-h-96');

    // Click to close
    fireEvent.click(accordionBtn);
    expect(accordionContent).toHaveClass('max-h-0');
  });

  it('should open and close certificate modal from timeline', () => {
    useGithubPackage.mockReturnValue({
      techs: mockTechs,
      loading: false,
      error: null,
    });

    render(<About />);
    
    // Find a certificate button (SENAI)
    const certBtns = screen.getAllByText('about.cert_modal.view_btn');
    fireEvent.click(certBtns[0]); // Click first one (usually SENAI in timeline)

    // Modal should be open
    expect(screen.getByText('about.cert_modal.open')).toBeInTheDocument();
    
    // Close using the close button in the header
    const closeBtn = screen.getByLabelText('Fechar');
    fireEvent.click(closeBtn);
    expect(screen.queryByText('about.cert_modal.open')).not.toBeInTheDocument();
  });

  it('should open and close certificate modal using overlay', () => {
    useGithubPackage.mockReturnValue({
      techs: mockTechs,
      loading: false,
      error: null,
    });

    render(<About />);
    
    const certBtns = screen.getAllByText('about.cert_modal.view_btn');
    fireEvent.click(certBtns[0]);

    // Modal should be open
    const overlay = screen.getByLabelText('Fechar modal');
    fireEvent.click(overlay);
    expect(screen.queryByText('about.cert_modal.open')).not.toBeInTheDocument();
  });

  it('should render sensitive note for sensitive certificates', () => {
    useGithubPackage.mockReturnValue({
      techs: mockTechs,
      loading: false,
      error: null,
    });

    render(<About />);
    
    // SENAI is marked as sensitive
    const viewBtns = screen.getAllByText('about.cert_modal.view_btn');
    fireEvent.click(viewBtns[0]);

    expect(screen.getByText('about.cert_modal.sensitive_note')).toBeInTheDocument();
  });

  it('should render verifiable preview for Alura certificates', async () => {
    useGithubPackage.mockReturnValue({
      techs: mockTechs,
      loading: false,
      error: null,
    });

    render(<About />);
    
    // Open accordion to see Alura certs
    const accordionBtn = screen.getByText('about.courses.accordion_label');
    fireEvent.click(accordionBtn);

    // Get certificate button from accordion (second one in the list of "Ver certificado")
    const viewBtns = screen.getAllByText('about.cert_modal.view_btn');
    fireEvent.click(viewBtns[1]); // Assuming second one is Alura

    expect(screen.getByText('about.cert_modal.preview_verifiable')).toBeInTheDocument();
  });
});

