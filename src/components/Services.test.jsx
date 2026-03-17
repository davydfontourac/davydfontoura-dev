import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Services from './Services';

// Keep global mock, but override t to return something for returnObjects
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key, options) => {
        if (options && options.returnObjects) {
          return [`${key}.item1`, `${key}.item2`];
        }
        return key;
      },
      i18n: { language: 'pt', changeLanguage: vi.fn(), exists: () => true }
    })
  };
});

vi.mock('./SectionTransition', () => ({
  default: () => <div data-testid="section-transition" />
}));

describe('Services Component', () => {
  it('should render all services and their items', () => {
    render(<Services />);
    
    expect(screen.getByText('services.title')).toBeInTheDocument();
    expect(screen.getByText('services.subtitle')).toBeInTheDocument();
    
    // Check for some service titles (keys)
    expect(screen.getByText('services.web_dev.title')).toBeInTheDocument();
    
    // Check items via options.returnObjects
    expect(screen.getByText('services.web_dev.items.item1')).toBeInTheDocument();
    expect(screen.getByText('services.react.items.item2')).toBeInTheDocument();
    
    // Ensure all 6 items render their description
    expect(screen.getByText('services.ui_ux.desc')).toBeInTheDocument();
  });
});
