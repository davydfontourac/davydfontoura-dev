import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ParticlesBackground from './ParticlesBackground';

describe('ParticlesBackground', () => {
  it('should render correctly in light mode', () => {
    const { container } = render(<ParticlesBackground isDarkMode={false} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('should not render in dark mode', () => {
    const { container } = render(<ParticlesBackground isDarkMode={true} />);
    expect(container.querySelector('canvas')).not.toBeInTheDocument();
  });

  it('should initialize canvas after timeout', async () => {
    vi.useFakeTimers();
    const { container } = render(<ParticlesBackground isDarkMode={false} />);
    
    // Canvas exists but particles are not yet initialized
    expect(container.querySelector('canvas')).toBeInTheDocument();
    
    vi.advanceTimersByTime(1500);
    // After timeout, the effect should have started (difficult to test canvas effects directy, but we check if it didn't crash)
    vi.useRealTimers();
  });
});
