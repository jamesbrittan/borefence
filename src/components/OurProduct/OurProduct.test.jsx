import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import OurProduct from './OurProduct';
import { business } from '../../business/details';

describe('OurProduct', () => {
  it('is a section labelled "Our product" with a list of benefits', () => {
    renderWithProviders(<OurProduct />);
    const section = screen.getByRole('region', { name: 'Our product' });
    expect(within(section).getAllByRole('listitem')).toHaveLength(7);
  });

  it('takes the warranty terms from the business details', () => {
    renderWithProviders(<OurProduct />);
    expect(screen.getByText(`${business.warranty.manufacturerYears} year manufacturer warranty with ${business.warranty.manufacturer}`)).toBeInTheDocument();
  });

  it('uses the same product term as the Fencing page', () => {
    renderWithProviders(<OurProduct />);
    expect(screen.getByText(/^Colour-bonded steel/)).toBeInTheDocument();
  });
});
