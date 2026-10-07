import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import RailingTops from './RailingTops';

describe('RailingTops', () => {
  it('is a section labelled by its heading, each style a figure named by its caption', () => {
    renderWithProviders(<RailingTops />);
    const section = screen.getByRole('region', { name: 'Available Railing Top Styles' });
    const figures = within(section).getAllByRole('figure');
    expect(figures.map((f) => f.textContent)).toEqual([
      'Ball Top', 'Bow Top', 'Fleur de Lys', 'Loop & Fleur de Lys', 'Loop & Ball', 'Flat Top',
    ]);
  });

  it('uses one spelling of Fleur de Lys (the photos say "Fleur-de-lys")', () => {
    renderWithProviders(<RailingTops />);
    expect(screen.queryByText(/fleur-de-lys/i)).not.toBeInTheDocument();
  });
});
