import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import ColourPalette from './index';

describe('ColourPalette', () => {
  it('is a section labelled by its heading, listing every colour by name', () => {
    renderWithProviders(<ColourPalette />);
    const section = screen.getByRole('region', { name: 'Available Railing Colours' });
    const names = within(section).getAllByRole('listitem').map((li) => li.textContent);
    expect(names).toEqual(['Cream', 'Green', 'Blue', 'Brown', 'Anthracite Grey', 'Matt or Gloss Black']);
  });

  it('does not put labels on plain elements (which screen readers ignore)', () => {
    const { container } = renderWithProviders(<ColourPalette />);
    expect(container.querySelectorAll('div[aria-label], [role="region"][aria-label]')).toHaveLength(0);
  });

  it('notes that on-screen colours are approximate', () => {
    renderWithProviders(<ColourPalette />);
    expect(screen.getByText(/colours on screen are a guide/i)).toBeInTheDocument();
  });
});
