import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, defaultValue, options) => {
      let finalKey = key;
      let finalOpts = options;
      
      if (typeof defaultValue === 'object') {
        finalOpts = defaultValue;
      } else if (typeof defaultValue === 'string') {
        finalKey = defaultValue;
      }
      
      if (finalOpts?.returnObjects) return [];
      return finalKey;
    },
    i18n: {
      changeLanguage: () => Promise.resolve(),
      language: 'pt',
      exists: () => true
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
  Trans: ({ children }) => children,
  I18nextProvider: ({ children }) => children,
}));

// Mock lucide-react
vi.mock('lucide-react', () => {
  const mockComp = (name) => () => React.createElement('span', null, name);
  return {
    MonitorSmartphone: mockComp('MonitorSmartphone'),
    Code2: mockComp('Code2'),
    Rocket: mockComp('Rocket'),
    Paintbrush: mockComp('Paintbrush'),
    Globe: mockComp('Globe'),
    Cpu: mockComp('Cpu'),
    ArrowRight: mockComp('ArrowRight'),
    Github: mockComp('Github'),
    Linkedin: mockComp('Linkedin'),
    Download: mockComp('Download'),
    Code: mockComp('Code'),
    Calendar: mockComp('Calendar'),
    Briefcase: mockComp('Briefcase'),
    GraduationCap: mockComp('GraduationCap'),
    ExternalLink: mockComp('ExternalLink'),
    Star: mockComp('Star'),
    GitFork: mockComp('GitFork'),
    Clock: mockComp('Clock'),
    Tag: mockComp('Tag'),
    CheckCircle: mockComp('CheckCircle'),
    Lightbulb: mockComp('Lightbulb'),
    X: mockComp('X'),
    ChevronLeft: mockComp('ChevronLeft'),
    ChevronRight: mockComp('ChevronRight'),
    ArrowLeft: mockComp('ArrowLeft'),
    User: mockComp('User'),
    Languages: mockComp('Languages'),
    Sun: mockComp('Sun'),
    Moon: mockComp('Moon'),
    FileText: mockComp('FileText'),
    ChevronDown: mockComp('ChevronDown'),
    Lock: mockComp('Lock'),
  };
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {
    this.observe = vi.fn();
    this.unobserve = vi.fn();
    this.disconnect = vi.fn();
  }
};

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

// Mock Canvas getContext
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
});
