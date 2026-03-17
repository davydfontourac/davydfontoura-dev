import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SectionTransition from './SectionTransition';

describe('SectionTransition', () => {
  it('should render correctly with default props', () => {
    const { container } = render(<SectionTransition />);
    const div = container.firstChild;
    expect(div).toHaveClass('to-white');
    expect(div).toHaveClass('dark:to-gray-900');
    expect(div).toHaveClass('h-32');
  });

  it('should apply custom height and colors', () => {
    const { container } = render(
      <SectionTransition 
        toColor="to-blue-500" 
        darkToColor="dark:to-blue-900" 
        height="h-64" 
        via="blue-200"
        darkVia="blue-800"
      />
    );
    const div = container.firstChild;
    expect(div).toHaveClass('to-blue-500');
    expect(div).toHaveClass('dark:to-blue-900');
    expect(div).toHaveClass('h-64');
    expect(div).toHaveClass('via-blue-200');
    expect(div).toHaveClass('dark:via-blue-800');
  });

  it('should include additional className', () => {
    const { container } = render(<SectionTransition className="custom-test-class" />);
    const div = container.firstChild;
    expect(div).toHaveClass('custom-test-class');
  });

  it('should handle via without darkVia correctly', () => {
    const { container } = render(<SectionTransition via="red-200" />);
    const div = container.firstChild;
    expect(div).toHaveClass('via-red-200');
    expect(div).toHaveClass('dark:via-transparent');
  });
});
