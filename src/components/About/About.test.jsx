import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import About from './About';

describe('About', () => {
  it('is a section labelled by its heading', () => {
    renderWithProviders(<About />);
    expect(screen.getByRole('region', { name: 'About BoreFence' })).toBeInTheDocument();
  });

  it('uses the product names and punctuation consistently', () => {
    renderWithProviders(<About />);
    const text = screen.getByText(/Our team are based in/).textContent;
    expect(text).toContain('ColourFence and ColourRail');
    expect(text).not.toMatch(/Colourfence/);
    expect(text).toContain('Newport – we have been trading');
    expect(text.trim().endsWith('.')).toBe(true);
  });
});
