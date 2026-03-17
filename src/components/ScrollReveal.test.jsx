import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollReveal from './ScrollReveal';

// Mock do IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(function() {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('ScrollReveal', () => {
  it('should render children', () => {
    render(
      <ScrollReveal>
        <div data-testid="child">Test Child</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should have the correct variant class', () => {
    const { container } = render(
      <ScrollReveal variant="fade-up">
        <div>Child</div>
      </ScrollReveal>
    );
    const div = container.firstChild;
    expect(div).toHaveClass('variant-fade-up');
    expect(div).toHaveClass('reveal-base');
  });

  it('should apply the correct styles for delay and duration', () => {
    const { container } = render(
      <ScrollReveal delay="100ms" duration="500ms">
        <div>Child</div>
      </ScrollReveal>
    );
    const div = container.firstChild;
    expect(div.style.transitionDelay).toBe('100ms');
    expect(div.style.transitionDuration).toBe('500ms');
  });

  it('should include additional className', () => {
    const { container } = render(
      <ScrollReveal className="custom-class">
        <div>Child</div>
      </ScrollReveal>
    );
    const div = container.firstChild;
    expect(div).toHaveClass('custom-class');
  });
});
