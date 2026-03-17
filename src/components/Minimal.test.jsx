import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';

const Simple = () => <div>Simple</div>;

describe('Simple Component', () => {
  it('should render', () => {
    render(<Simple />);
    expect(screen.getByText('Simple')).toBeInTheDocument();
  });
});
