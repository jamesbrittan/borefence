import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import FeaturesSection from './FeaturesSection';
import { sellingPoints } from '../../business/details';

describe('FeaturesSection', () => {
  it('is a labelled section with its own h2, so the cards are not nested under the previous section', () => {
    renderWithProviders(<FeaturesSection features={sellingPoints} />);
    const section = screen.getByRole('region', { name: 'Why choose BoreFence' });
    expect(within(section).getByRole('heading', { level: 2, name: 'Why choose BoreFence' })).toBeInTheDocument();
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(sellingPoints.length);
  });

  it('lists the selling points as a list', () => {
    renderWithProviders(<FeaturesSection features={sellingPoints} />);
    expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(3);
  });

  it('uses UK spelling for the licence', () => {
    renderWithProviders(<FeaturesSection features={sellingPoints} />);
    expect(screen.getByText(/Trade Waste Licence/)).toBeInTheDocument();
    expect(screen.queryByText(/License/)).not.toBeInTheDocument();
  });
});
