import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Comp = () => {
  const { t } = useTranslation();
  return <div>{t('test.key')}</div>;
};

describe('I18n Component', () => {
  it('should render translated key', () => {
    render(<Comp />);
    expect(screen.getByText('test.key')).toBeInTheDocument();
  });
});
